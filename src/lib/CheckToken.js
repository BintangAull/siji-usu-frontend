
import { jwtDecode } from 'jwt-decode';
import { userNewToken } from './api/UserApi.jsx';

export default async function checkAndRefreshToken(token, refresh_token) {
    try {
        const decodedToken = jwtDecode(token);

        // Cek access token expired
        if (decodedToken.exp * 1000 < Date.now()) {
            // Cek refresh token expired
            const decodedRefreshToken = jwtDecode(refresh_token);
            if (decodedRefreshToken.exp * 1000 < Date.now()) {
                return {
                    isValid: false,
                    needsLogin: true,
                    token: null
                };
            }

            // GetToken baru
            const newToken = await userNewToken({refresh_token});
            if (newToken.status === 200) {
                const responseBody = await newToken.json();
                return {
                    isValid: true,
                    needsLogin: false,
                    token: responseBody.access_token
                };
            }
        }

        // Token masih valid
        return {
            isValid: true,
            needsLogin: false,
            token: token
        };
    } catch (error) {
        console.error('Token check error:', error);
        return {
            isValid: false,
            needsLogin: true,
            token: null
        };
    }
}
