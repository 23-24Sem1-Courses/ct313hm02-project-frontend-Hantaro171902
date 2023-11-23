<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Menu from '@/components/Menu.vue';
import makeDrinksService from '@/services/drinks.service';

const props = defineProps({
  drinkId: { type: String, required: true }
});

const $router = useRouter();
const $route = useRoute();
const drink = ref(null);
const message = ref('');

const drinksService = makeDrinksService();

async function getDrink(id) {
  try {
    drink.value = await drinksService.getDrink(id);
  } catch (error) {
    console.log(error);
    // Redirect to NotFound page and keep URL intact
    $router.push({
      name: 'notfound',
      params: { pathMatch: $route.path.split('/').slice(1) },
      query: $route.query,
      hash: $route.hash
    });
  }
}
async function onUpdateDrink(editedDrink) {
  try {
    await drinksService.updateDrink(editedDrink.id, editedDrink);
    message.value = 'Update successfully !';
  } catch (error) {
    console.log(error);
  }
}
async function onDeleteDrink(id) {
  if (confirm('Do you want to delete this product?')) {
    try {
      await drinksService.deleteDrink(id);
      $router.push({ name: 'menu' });
    } catch (error) {
      console.log(error);
    }
  }
}

getDrink(props.drinkId);
</script>

<template>
  <div v-if="drink" class="page">
    <h4>Edit drink</h4>
    <Menu :initial-drink="drink" @submit:drink="onUpdateDrink" @delete:drink="onDeleteDrink" />
    <p>{{ message }}</p>
  </div>
</template>
