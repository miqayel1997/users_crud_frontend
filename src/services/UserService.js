import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${process.env.VUE_APP_API_BASE_URL}/api`,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

export default {
    getUsers() {
        return apiClient.get('/users');
    },
    getUser(id) {
        return apiClient.get(`/users/${id}`);
    },
    createUser(data) {
        return apiClient.post(`/users`, data);
    },
    updateUser(id, data) {
        return apiClient.patch(`/users/${id}`, data);
    },
    deleteUser(id) {
        return apiClient.delete(`/users/${id}`);
    },
    getPayments(userId) {
        return apiClient.get(`/users/${userId}/payments`);
    }
};
