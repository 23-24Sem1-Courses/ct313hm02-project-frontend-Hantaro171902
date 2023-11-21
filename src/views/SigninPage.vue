<template>
  <div class="page">
    <Signin :initial-user="user" @submit:user="onAdd" />
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import Signin from '@/components/Signin.vue';
import makeUsersService from '@/services/users.service';
import { useRouter } from 'vue-router';

const usersService = makeUsersService();
const message = ref('');
const router = useRouter();

async function onAdd(user) {
  console.log('Starting onAdd function');
  console.log('Received user:', user);

  try {
    console.log('Calling usersService.signinUser');
    await usersService.signinUser(user);
    console.log('Sign up successful!');
    message.value = 'Sign up successfully!';
    setTimeout(() => {
      // You can use router.push to navigate to another page
      router.push('/login');
    }, 1000);
  } catch (error) {
    console.error('Error during sign up:', error);
    // Redirect to NotFound page and keep URL intact
  }
}
</script>
