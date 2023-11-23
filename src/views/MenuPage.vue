<script setup>
import { ref, computed, onMounted, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import makeDrinksService from '@/services/drinks.service';
import Pagination from '@/components/Pagination.vue';
import InputSearch from '@/components/InputSearch.vue';
import Navbar from '@/components/Navbar.vue';
import Menu from '@/components/Menu.vue';
// import ProductForm from '@/components/ProductForm.vue';

const $router = useRouter();
const totalPages = ref(1);
const currentPage = ref(1);
const drinks = ref([]);
const selectedIndex = ref(-1);
const searchText = ref('');

const drinksService = makeDrinksService();

const searchableDrinks = computed(() =>
  drinks.value.map((drink) => {
    const { dr_img, dr_name, dr_price, cate_id } = drink;
    return [dr_img, dr_name, dr_price, cate_id].join('');
  })
);

const filteredDrinks = computed(() => {
  if (!searchText.value) return drinks.value;
  const filtered = drinks.value.filter((drink, index) =>
    searchableDrinks.value[index].includes(searchText.value)
  );
  console.log('Filtered Drinks:', filtered);
  return filtered;
});

const selectedDrink = computed(() => {
  if (selectedIndex.value < 0) return null;
  return filteredDrinks.value[selectedIndex.value];
});

async function retrieveDrinks(page) {
  console.log('Retrieving drinks...');
  try {
    const response = await drinksService.getDrinks(page);
    const chunk = response?.drink || []; // Use an empty array if drinks is undefined

    console.log('API Response:', response); // Log the response to the console

    totalPages.value = response?.metadata?.lastPage ?? 1;
    drinks.value = chunk.sort((current, next) => current.dr_name.localeCompare(next.dr_name));
    selectedIndex.value = -1;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function onDeleteDrinks() {
  if (confirm('Do you want to delete all drinks?')) {
    try {
      await drinksService.deleteAllDrinks();
      totalPages.value = 1;
      currentPage.value = 1;
      drinks.value = [];
      selectedIndex.value = -1;
    } catch (error) {
      console.log(error);
    }
  }
}

// Add drink function
function goToAddDrink() {
  $router.push({ name: 'menuadd' });
}

onMounted(() => {
  retrieveDrinks(1);
  console.log('Component Drinks:', drinks.value); // Log the component drinks array
});

watch(searchText, () => (selectedIndex.value = -1));

watchEffect(() => retrieveDrinks(currentPage.value));
</script>

<template>
  <Navbar />
  <div class="page row mb-5">
    <div class="mt-3 col-md-6">
      <h4>Menu</h4>
      <div class="my-3">
        <InputSearch v-model="searchText" />
      </div>
      <Menu
        v-if="drinks && drinks.length > 0"
        :drinks="filteredDrinks"
        v-model:selectedIndex="selectedIndex"
      />
      <p v-else>No drinks.</p>
      <div class="mt-3 d-flex justify-content-center align-items-center">
        <Pagination :totalPages="totalPages" v-model:currentPage="currentPage" />
      </div>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="retrieveDrinks(currentPage)">
          <i class="fas fa-redo"></i> Reload
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddDrink">
          <i class="fas fa-plus"></i> Add new
          <router-link
            :to="{
              name: 'menuadd'
            }"
          >
          </router-link>
        </button>
        <button class="btn btn-sm btn-danger" @click="onDeleteDrinks">
          <i class="fas fa-trash"></i> Delete All
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="selectedDrink">
        <h4>
          Details
          <i class="fas fa-address-card"></i>
        </h4>
        <Menu :drink="selectedDrink" />
        <router-link
          :to="{
            name: 'menuedit',
            params: { id: selectedDrink.id }
          }"
        >
          <span class="mt-2 badge badge-warning"> <i class="fas fa-edit"></i> Update</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/components/css/Menu.css';
</style>
