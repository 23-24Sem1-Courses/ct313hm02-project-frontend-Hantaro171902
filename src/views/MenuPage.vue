<script setup>
import { ref, computed, onMounted, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import drinksService from '@/services/drinks.service';
import Pagination from '@/components/Pagination.vue';
import InputSearch from '@/components/InputSearch.vue';
import Navbar from '@/components/Navbar.vue';

const $router = useRouter();
const totalPages = ref(1);
const currentPage = ref(1);
const drinks = ref([]);
const selectedIndex = ref(-1);
const searchText = ref('');

const searchableDrinks = computed(() =>
  drinks.value.map((drink) => {
    const { dr_img, dr_name, dr_price, cate_id } = drink;
    return [dr_img, dr_name, dr_price, cate_id].join('');
  })
);

const filteredDrinks = computed(() => {
  if (!searchText.value) return drinks.value;
  return drinks.value.filter((drink, index) =>
    searchableDrinks.value[index].includes(searchText.value)
  );
});

const selectedDrink = computed(() => {
  if (selectedIndex.value < 0) return null;
  return filteredDrinks.value[selectedIndex.value];
});

async function retrieveDrinks(page) {
  try {
    const chunk = await drinksService.getDrinks(page);
    totalPages.value = chunk.metadata.lastPage ?? 1;
    drinks.value = chunk.drinks.sort((current, next) =>
      current.dr_name.localeCompare(next.dr_name)
    );
    selectedIndex.value = -1;
  } catch (error) {
    console.log(error);
  }
}

async function onDeleteDrinks() {
  if (confirm('Do you want to delete all drinks?')) {
    try {
      await drinksService.deleteAllContacts();
      totalPages.value = 1;
      currentPage.value = 1;
      drinks.value = [];
      selectedIndex.value = -1;
    } catch (error) {
      console.log(error);
    }
  }
}

function goToAddDrink() {
  $router.push({ name: 'drink.add' });
}

onMounted(() => retrieveDrinks(1));

watch(searchText, () => (selectedIndex.value = -1));

watchEffect(() => retrieveDrinks(currentPage.value));
</script>

<template>
  <Navbar />
  <div class="page row mb-5">
    <div class="mt-3 col-md-6">
      <h4>
        Menu
        <i class="fas fa-address-book"></i>
      </h4>
      <div class="my-3">
        <InputSearch v-model="searchText" />
      </div>
      <Menu
        v-if="filteredDrinks.length > 0"
        :drinks="filteredDrinks"
        v-model:selectedIndex="selectedIndex"
      />
      <p v-else>Không có liên hệ nào.</p>
      <div class="mt-3 d-flex justify-content-center align-items-center">
        <Pagination :totalPages="totalPages" v-model:currentPage="currentPage" />
      </div>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="retrieveDrinks(currentPage)">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddDrink">
          <i class="fas fa-plus"></i> Thêm mới
          <router-link
            :to="{
              name: 'drink.add'
            }"
          >
          </router-link>
        </button>
        <button class="btn btn-sm btn-danger" @click="onDeleteDrinks">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="selectedDrink">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
        <Menu :drink="selectedDrink" />
        <router-link
          :to="{
            name: 'drink.edit',
            params: { id: selectedDrink.id }
          }"
        >
          <span class="mt-2 badge badge-warning"> <i class="fas fa-edit"></i> Hiệu chỉnh</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/components/css/Menu.css';
</style>
