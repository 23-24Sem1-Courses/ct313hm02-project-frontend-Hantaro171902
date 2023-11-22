<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Menu from '@/components/Menu.vue';
import makeDrinksService from '@/services/drinks.service';
const props = defineProps({
  contactId: { type: String, required: true }
});
const $router = useRouter();
const $route = useRoute();
const contact = ref(null);
const message = ref('');

const drinksService = makeDrinksService();

async function getDrink(id) {
  try {
    contact.value = await drinksService.getDrink(id);
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
    await drinksService.updateContact(editedDrink.id, editedDrink);
    message.value = 'Update successfully !';
  } catch (error) {
    console.log(error);
  }
}
async function onDeleteDrink(id) {
  if (confirm('Do you want to delete this product?')) {
    try {
      await drinksService.deleteDrink(id);
      $router.push({ name: 'contactbook' });
    } catch (error) {
      console.log(error);
    }
  }
}
getDrink(props.contactId);
</script>
<template>
  <div v-if="contact" class="page">
    <h4>Edit drink</h4>
    <Menu
      :initial-contact="contact"
      @submit:contact="onUpdateDrink"
      @delete:contact="onDeleteDrink"
    />
    <p>{{ message }}</p>
  </div>
</template>
