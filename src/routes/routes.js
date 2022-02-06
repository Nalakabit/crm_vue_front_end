import CustomerList from '../components/CustomerList.vue';
import AddCustomer from '../components/AddCustomer.vue';
import EditCustomer from '../components/EditCustomer.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name:'CustomerList',
        path:'/',
        component: CustomerList
    },
    {
        name:'AddCustomer',
        path:'/add_customer',
        component: AddCustomer
    },
    {
        name:'EditCustomer',
        path:'/customer/edit/:id?',
        component: EditCustomer
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;