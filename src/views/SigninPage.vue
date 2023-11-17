<script setup>
import { ref } from 'vue';

import Signin from '@/components/Signin.vue';
import makeUsersService from '@/services/users.service';

const usersService = makeUsersService();
const message = ref('');

async function onAdd(user) {
  try {
    await usersService.signinUser(user);
    message.value = 'Sign up successfully!';
  } catch (error) {
    console.log(error);
    // Redirect to NotFound page and keep URL intact
  }
}
</script>
<template>
  <div class="page">
    <Signin :initial-user="user" @submit:user="onAdd" />
    <p>{{ message }}</p>
  </div>
</template>
