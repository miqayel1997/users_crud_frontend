<template>
    <div>
        <h1 class="mb-5 text-center text-3xl">Create user</h1>

        <form class="flex flex-col items-end gap-4" @submit.prevent="save">
            <div class="flex gap-5 self-stretch">
                <div class="flex-1">
                    <label class="mb-1 block">Email</label>

                    <input
                        v-model="form.email"
                        class="w-full border px-4 py-2 outline-none"
                        name="email"
                        required=""
                        type="email"
                        @input="delete errors.email"
                    />

                    <span class="mt-1 block text-xs text-red-600">
                        {{ errors.email }}
                    </span>
                </div>

                <div class="flex-1">
                    <label class="mb-1 block">Name</label>

                    <input
                        v-model="form.name"
                        class="w-full border px-4 py-2 outline-none"
                        maxlength="20"
                        name="name"
                        required=""
                        type="text"
                        @input="delete errors.name"
                    />

                    <span class="mt-1 block text-xs text-red-600">
                        {{ errors.name }}
                    </span>
                </div>

                <div class="flex-1">
                    <label class="mb-1 block">Phone</label>

                    <input
                        v-model="form.phone"
                        class="w-full border px-4 py-2 outline-none"
                        maxlength="20"
                        name="phone"
                        required=""
                        type="text"
                        @input="delete errors.phone"
                    />

                    <span class="mt-1 block text-xs text-red-600">
                        {{ errors.phone }}
                    </span>
                </div>
            </div>

            <button
                class="bg-blue-700 px-4 py-1 text-center text-white"
                type="submit"
            >
                Create
            </button>
        </form>
    </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import UserService from '@/services/UserService';

export default {
    name: 'CreateUser',
    setup() {
        const toast = useToast();

        return { toast };
    },
    data() {
        return {
            form: {},
            errors: {}
        };
    },
    methods: {
        async save() {
            try {
                await UserService.createUser(this.form);

                this.toast.success('The user successfully created');

                this.$router.push({ name: 'users' });
            } catch (error) {
                this.toast.error(
                    'Something went wrong, please review the form and try again'
                );

                const errors = { ...error.response.data.errors };
                for (const key in errors) {
                    errors[key] = errors[key][0];
                }
                this.errors = { ...errors };
            }
        }
    }
};
</script>
