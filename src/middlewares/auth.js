import AuthService from '@/services/AuthService';

export default async function auth() {
    const token = localStorage.getItem('token');

    if (!token) {
        return { name: 'login' };
    }

    try {
        await AuthService.me(token);
    } catch (error) {
        return { name: 'login' };
    }
}
