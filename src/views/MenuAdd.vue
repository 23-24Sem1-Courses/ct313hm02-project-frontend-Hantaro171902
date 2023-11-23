<template>
  <div class="page">
    <ProductAdd :initial-drink="drink" @submit:drink="onAdd" />
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import ProductAdd from '@/components/ProductAdd.vue';
import makeDrinksService from '@/services/drinks.service';
import { useRouter } from 'vue-router';

const drinksService = makeDrinksService();
const message = ref('');
const router = useRouter();

async function onAdd(drink) {
  console.log('Starting onAdd function');
  console.log('Received drink:', drink);

  try {
    console.log('Calling drinksService.createDrink');
    await drinksService.createDrink(drink);
    console.log('Sign up successful!');
    message.value = 'Sign up successfully!';
    setTimeout(() => {
      // You can use router.push to navigate to another page
      router.push('/menu');
    }, 1000);
  } catch (error) {
    console.error('Error during sign up:', error);
    // Redirect to NotFound page and keep URL intact
  }
}
</script>
