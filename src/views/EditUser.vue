<template>
    <div>
        <h1 class="mb-5 text-center text-3xl">{{ user?.name }}</h1>

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
                Save
            </button>
        </form>

        <h2 class="mt-10 mb-5 text-center text-2xl">Payments</h2>

        <div>
            <div class="flex gap-5 py-2 px-5">
                <div class="w-2/12">ID</div>
                <div class="w-7/12">Amount</div>
                <div class="w-3/12">Date</div>
            </div>

            <div
                v-for="payment in payments"
                :key="payment.id"
                class="flex gap-5 border-t py-2 px-5"
            >
                <div class="w-2/12 overflow-hidden text-ellipsis">
                    {{ payment.id }}
                </div>

                <div class="w-7/12 overflow-hidden text-ellipsis">
                    ${{ payment.amount.toLocaleString() }}
                </div>

                <div class="w-3/12 overflow-hidden text-ellipsis">
                    {{ $moment(payment.date).format('YYYY-MM-DD HH:mm:ss') }}
                </div>
            </div>

            <form class="mt-4 flex gap-2" @submit.prevent="addPayment">
                <input
                    v-model="addPaymentAmount"
                    class="border px-4 py-2 outline-none"
                    maxlength="20"
                    name="amount"
                    placeholder="Amount"
                    required=""
                    type="number"
                />

                <button
                    class="bg-blue-700 px-4 py-1 text-center text-white"
                    type="submit"
                >
                    Add
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import UserService from '@/services/UserService';

export default {
    name: 'EditUser',
    setup() {
        const toast = useToast();

        return { toast };
    },
    data() {
        return {
            user: null,
            form: {},
            errors: {},
            payments: [],
            addPaymentAmount: ''
        };
    },
    mounted() {
        this.fetchUser();
        this.fetchPayments();
    },
    methods: {
        async fetchUser() {
            const { data } = await UserService.getUser(this.$route.params.id);

            this.user = { ...data };

            this.form = {
                email: data.email,
                name: data.name,
                phone: data.phone
            };
        },
        async save() {
            try {
                await UserService.updateUser(this.$route.params.id, this.form);

                this.user = {
                    ...this.user,
                    email: this.form.email,
                    name: this.form.name,
                    phone: this.form.phone
                };

                this.toast.success('Successfully saved');
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
        },
        async fetchPayments() {
            const { data } = await UserService.getPayments(
                this.$route.params.id
            );

            this.payments = { ...data.data };
        },
        async addPayment() {
            try {
                await UserService.addPayment(
                    this.$route.params.id,
                    this.addPaymentAmount
                );

                this.addPaymentAmount = '';

                this.fetchPayments();
            } catch (error) {
                //
            }
        }
    }
};
</script>
