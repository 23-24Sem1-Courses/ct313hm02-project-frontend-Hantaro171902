/* eslint-disable no-undef */
/* eslint-disable vue/no-reserved-component-names */
import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.vue';
import router from './router';
import makeDrinksService from './services/drinks.service';
import makeUsersService from './services/users.service';

const app = createApp(App);
// Provide the users service to the entire application
const usersService = makeUsersService();
const drinksService = makeDrinksService();

// Provide the users service to the entire application
app.config.globalProperties.$usersService = usersService;
app.config.globalProperties.$drinksService = drinksService;
app.provide('$usersService', usersService);
app.provide('$drinksService', drinksService);

app.use(router);
app.mount('#app');
