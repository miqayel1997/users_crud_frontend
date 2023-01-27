<template>
    <div>
        <Header />

        <div class="mx-auto max-w-5xl py-6">
            <router-view />
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
    name: 'Admin',
    components: { Header }
};
</script>
