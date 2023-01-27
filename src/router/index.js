import { createRouter, createWebHistory } from 'vue-router';
import Admin from '../layouts/Admin.vue';
import CreateUser from '../views/CreateUser.vue';
import Dashboard from '../views/Dashboard.vue';
import EditUser from '../views/EditUser.vue';
import Login from '../views/Login.vue';
import Users from '../views/Users.vue';
import auth from '@/middlewares/auth';

const routes = [
    {
        path: '/',
        name: 'admin',
        component: Admin,
        beforeEnter: [auth],
        redirect: {
            name: 'dashboard'
        },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: 'users',
                name: 'users',
                component: Users
            },
            {
                path: 'users/create',
                name: 'user_create',
                component: CreateUser
            },
            {
                path: 'users/:id',
                name: 'user_edit',
                component: EditUser
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
