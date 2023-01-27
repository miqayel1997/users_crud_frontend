import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    login(email, password) {
        return apiClient.post('/oauth/token', {
            client_id: process.env.VUE_APP_PASSPORT_CLIENT_ID,
            client_secret: process.env.VUE_APP_PASSPORT_CLIENT_SECRET,
            grant_type: 'password',
            username: email,
            password: password
        });
    },
    me(token) {
        return apiClient.get('/api/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
};
