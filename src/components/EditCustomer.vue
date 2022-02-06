<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">

                <div class="alert alert-danger mt-4" v-if="errors.length">
                    <ul class="mb-0">
                        <li v-for="(error, index) in errors" :key="index">
                            {{error}}
                        </li>

                    </ul>

                </div>
                <form @submit.prevent="updateCustomer" novalidate>
                    <fieldset>
                        <div class="form-group">
                            <label class="form-label mt-4">First Name</label>
                            <input type="text" class="form-control" v-model="customer.fname" placeholder="Enter First Name">
                        </div>
                        <div class="form-group">
                            <label class="form-label mt-4">Last Name</label>
                            <input type="text" class="form-control" v-model="customer.lname" placeholder="Enter Last Name">
                        </div>
                        <div class="form-group">
                            <label class="form-label mt-4">Email</label>
                            <input type="email" class="form-control" v-model="customer.email" placeholder="Enter Email">
                        </div>
                        <div class="form-group">
                            <label class="form-label mt-4">Contact No</label>
                            <input type="text" class="form-control" v-model="customer.contact_no" placeholder="Enter Contact Number">
                        </div>

                        <button class="btn btn-primary mt-4">Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'EditCustomer',
    data() {
        return {
            customer: {},
            fname: '',
            lname: '',
            email: '',
            contact_no: '',
            errors: []
        }

    },
    created() {
        
        this.getCustomerById();

    },
    methods: {

        async getCustomerById(){
            let url = `http://127.0.0.1:8000/api/get_customer/${this.$route.params.id}`
            await axios.get(url).then(response => {
                console.log(response);
                this.customer = response.data;
            });
        },
              async updateCustomer() {
            this.errors = [];
            if(!this.customer.fname) {
                this.errors.push("First Name is required")
            }

            if(!this.customer.lname) {
                this.errors.push("Last Name is required")
            }

            if(!this.customer.email) {
                this.errors.push("Email is required")
            }

            if(!this.customer.contact_no) {
                this.errors.push("Contact Number is required")
            }

            if(!this.errors.length) {
                let formData = new formData();
                formData.append('fname', this.customer.fname);
                formData.append('lname', this.customer.lname);
                formData.append('email', this.customer.email);
                formData.append('contact_no', this.customer.contact_no);
                let url = `http://127.0.0.1:8000/api/update_customer/${this.$route.params.id}`;
                await axios.post(url, formData).then((response) => {
                    console.log(response);
                    if(response.status == 200) {
                        
                        alert(response.data.message);
                    } else {
                        console.log('error');
                    }
                }).catch(error => {
                    this.errors.push(error.response);
            });
        }

    }
       
    },
    mounted: function() {
        console.log('Edit Component From Component LOaded....');
    }
}
</script>