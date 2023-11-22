<script setup>
import { ref } from 'vue';

import Menu from '@/components/Menu.vue';
import makeDrinksService from '@/services/drinks.service';

const message = ref('');
const drinksService = makeDrinksService();

async function onAdd(drink) {
  try {
    await drinksService.createDrink(drink);
    message.value = 'New product added successfully';
  } catch (error) {
    console.log(error);
    // Redirect to NotFound page and keep URL intact
  }
}
</script>
<template>
  <div class="page">
    <h4>Add Drink</h4>
    <Menu :initial-drink="drink" @submit:drink="onAdd" />
    <p>{{ message }}</p>
  </div>
</template>
