/* eslint-disable no-undef */
/* eslint-disable vue/no-reserved-component-names */
import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.vue';
import router from './router';
import makeUsersService from './services/users.service';
// import { Field, Form, configure, defineRule, localize } from 'vee-validate';

// Import the rules you need
// import { required, email } from '@vee-validate/rules';

// Install the rules
// defineRule('required', required);
// defineRule('email', email);

const app = createApp(App);
// Provide the users service to the entire application
const usersService = makeUsersService();

// Provide the users service to the entire application
app.config.globalProperties.$usersService = usersService;
app.use(router);
app.mount('#app');

// app.component('Form', Form);
// app.component('Field', Field);

// // Configure VeeValidate
// configure({
//   generateMessage: localize('en')
// });
