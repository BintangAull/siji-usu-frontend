import axios from '../utils/axios.js';

export const login = async (identifier, password) => {
    try {
        const response = await axios.post('/auth/login', {
            identifier,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// Tambahkan fungsi auth lainnya di sini jika diperlukan
export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};