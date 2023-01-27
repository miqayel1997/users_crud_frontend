<template>
    <div>
        <div class="mb-5 flex items-center justify-between">
            <h1 class="text-3xl">Users</h1>

            <router-link
                class="bg-blue-700 px-4 py-1 text-center text-white"
                :to="{ name: 'user_create' }"
            >
                Create
            </router-link>
        </div>

        <div>
            <div class="flex gap-5 py-2 px-5">
                <div class="w-1/12">ID</div>
                <div class="w-3/12">Email</div>
                <div class="w-3/12">Name</div>
                <div class="w-3/12">Phone</div>
                <div class="w-2/12">Actions</div>
            </div>

            <div
                v-for="user in users"
                :key="user.id"
                class="flex gap-5 border-t py-2 px-5"
            >
                <div class="w-1/12 overflow-hidden text-ellipsis">
                    {{ user.id }}
                </div>

                <div class="w-3/12 overflow-hidden text-ellipsis">
                    {{ user.email }}
                </div>

                <div class="w-3/12 overflow-hidden text-ellipsis">
                    {{ user.name }}
                </div>

                <div class="w-3/12 overflow-hidden text-ellipsis">
                    {{ user.phone }}
                </div>

                <div class="flex w-2/12 gap-2">
                    <router-link
                        class="bg-blue-700 px-4 py-1 text-center text-white"
                        :to="{ name: 'user_edit', params: { id: user.id } }"
                    >
                        Edit
                    </router-link>

                    <button
                        class="bg-red-700 px-4 py-1 text-center text-white"
                        @click="deleteUser(user.id)"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import UserService from '@/services/UserService';

export default {
    name: 'Users',
    setup() {
        const toast = useToast();

        return { toast };
    },
    data() {
        return {
            users: []
        };
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            const { data } = await UserService.getUsers();

            this.users = [...data.data];
        },
        async deleteUser(id) {
            if (!confirm('Are you sure you want to delete this user?')) {
                return;
            }

            await UserService.deleteUser(id);

            this.users = this.users.filter((user) => user.id !== id);

            this.toast.success('The user has been successfully deleted');
        }
    }
};
</script>
