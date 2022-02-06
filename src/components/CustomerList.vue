<template>
    <div class="container">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact No</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
                    <tbody v-for="customer in customers" :key="customer.id">
                        <tr class="table-secondary">
                            <th scope="row">{{customer.id}}</th>
                            <th scope="row">{{customer.fname}}</th>
                            <th scope="row">{{customer.lname}}</th>
                            <th scope="row">{{customer.email}}</th>
                            <th scope="row">{{customer.contact_no}}</th>
                            <th scope="row"><router-link :to="{ name:'EditCustomer', params: { id: customer.id}}" class="btn btn-primary btn-sm" >Edit</router-link></th>
                            <th scope="row"><button class="btn btn-danger btn-sm" @click.prevent="deleteCustomer(customer.id)">Delete</button></th>

                        </tr>
                    </tbody>

        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'CustomerList',
    data(){
        return {
            customers:Array

        }
    },
    created() {
         this.getCustomersAll
    },
    methods: {
        async getCustomersAll() {
            let url = 'http://127.0.0.1:8000/api/customers';
            await axios.get(url).then(response => {
               this.customers = response.data.customers;
               console.log(this.customers);
            }).catch(error => {
                console.log(error);
            });
        },
        async deleteCustomer(id){
            let url = `http://127.0.0.1:8000/api/delete_customer/${id}`;
            await axios.delete(url).then(response => {
                if(response.data.code == 200) {
                    alert(response.data.message);
                    this.getCustomers();
                }
            }).catch(error => {
               console.log(error);
            });
        }
    },
    mounted() {
        console.log('Customer List Component mounted');
    }
}
</script>