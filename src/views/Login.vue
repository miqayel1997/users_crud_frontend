<template>
    <div class="mx-auto max-w-xl py-10">
        <h1 class="mb-5 text-center text-3xl">Login</h1>

        <form class="flex flex-col gap-5" @submit.prevent="login">
            <div class="flex-1">
                <label class="mb-1 block">Email</label>

                <input
                    v-model="form.email"
                    class="w-full border px-4 py-2 outline-none"
                    name="email"
                    required=""
                    type="email"
                />
            </div>

            <div class="flex-1">
                <label class="mb-1 block">Password</label>

                <input
                    v-model="form.password"
                    class="w-full border px-4 py-2 outline-none"
                    name="name"
                    required=""
                    type="password"
                />
            </div>

            <button
                class="bg-blue-700 px-4 py-2 text-center text-xl text-white"
                type="submit"
            >
                Login
            </button>
        </form>
    </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import AuthService from '@/services/AuthService';

export default {
    name: 'Login',
    setup() {
        const toast = useToast();

        return { toast };
    },
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        };
    },
    methods: {
        async login() {
            try {
                const { data } = await AuthService.login(
                    this.form.email,
                    this.form.password
                );

                localStorage.setItem('token', data.access_token);

                this.$router.push({ name: 'admin' });
            } catch (error) {
                this.toast.error('Wrong credentials');
            }
        }
    }
};
</script>
