<template>
    <div class="border-b py-4">
        <div class="mx-auto flex max-w-5xl items-center justify-between">
            <router-link class="text-xl font-bold" :to="{ name: 'admin' }">
                Admin Panel
            </router-link>

            <div class="flex justify-center gap-12">
                <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
                <router-link :to="{ name: 'users' }">Users</router-link>
                <a href="#" @click.prevent="logout">Logout</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$router.push({ name: 'login' });
        }
    }
};
</script>
