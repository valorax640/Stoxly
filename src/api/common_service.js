import axios from 'axios';
import { BASE_URL } from '../utils/URL';

const apiClient = axios.create({
    baseURL: BASE_URL,
    //   headers: { 'Content-Type': 'application/json' },
    headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
    },
});

export const getData = async (endpoint, params = {}) => {
    try {
        const response = await apiClient.get(endpoint, { params });
        console.log('GET API Response:', response.data);
        return response.data;
    } catch (error) {
        console.log('GET API Error:', error);
        throw error.response?.data || { message: 'Something went wrong' };
    }
};

export const postData = async (endpoint, data = {}) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('POST API Error:', error);
        throw error.response?.data || { message: 'Something went wrong' };
    }
};
