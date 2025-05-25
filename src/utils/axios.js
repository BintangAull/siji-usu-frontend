import axios from 'axios';

const baseURL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    },
    withCredentials: true // Tambahkan ini jika backend menggunakan credentials
});

// Sisanya tetap sama...

// Interceptor untuk menambahkan token ke setiap request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk handle refresh token
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Jika error bukan 401 atau request sudah mencoba refresh
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            // Jika sedang refresh, tambahkan request ke queue
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axiosInstance(originalRequest);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            // Request untuk refresh token
            const response = await axios.post(`${baseURL}/auth/refresh`, {
                refresh_token: refreshToken
            });

            const { access_token, new_refresh_token } = response.data;

            // Simpan token baru
            localStorage.setItem('access_token', access_token);
            if (new_refresh_token) {
                localStorage.setItem('refresh_token', new_refresh_token);
            }

            // Update header untuk request yang gagal
            originalRequest.headers.Authorization = `Bearer ${access_token}`;

            // Proses queue request yang tertunda
            processQueue(null, access_token);

            return axiosInstance(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);

            // Hapus token dan redirect ke login
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default axiosInstance;