import axios from '../utils/axios';

export const getUserProfile = async () => {
    try {
        const response = await axios.get('/admins/users');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};