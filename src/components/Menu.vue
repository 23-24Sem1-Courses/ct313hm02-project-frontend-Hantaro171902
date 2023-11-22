<!-- eslint-disable no-undef -->
<script setup>
defineProps(['drinks', 'selectedIndex']);
const $emit = defineEmits(['update:selectedIndex']);
const getDrinkImage = (imageName) => {
  // Construct the path to the image
  const imagePath = `src/assets/picture/products/${imageName}`;
  console.log('Image Path:', imagePath);

  // Return the image path
  return imagePath;
};

// Add data for category filters
// const categories = Array.from(new Set(drinks.map((drink) => drink.cate_name)));
// const selectedCategory = ref(null);

// const filterDrinks = () => {
//   if (selectedCategory.value) {
//     return drinks.filter((drink) => drink.cate_name === selectedCategory.value);
//   }
//   return drinks;
// };
</script>

<template>
  <div class="container">
    <ul class="list-group">
      <li
        class="list-group-item px-3"
        v-for="(drink, index) in drinks"
        :class="{ active: index === selectedIndex }"
        :key="drink.dr_id"
        @click="$emit('update:selectedIndex', index)"
      >
        {{ drink.dr_name }}
      </li>
    </ul>

    <!-- Move details block inside the loop -->
    <div class="drink-cards" v-if="selectedIndex !== -1">
      <div class="card">
        <div class="card-body">
          <img
            class="drink-img ms-3 img-fuild"
            :src="getDrinkImage(drinks[selectedIndex].dr_img)"
            alt=""
          />
        </div>
        <div class="card-title"><strong>Title:</strong> {{ drinks[selectedIndex].dr_name }}</div>
        <div class="card-text"><strong>Price:</strong> {{ drinks[selectedIndex].dr_price }}</div>
        <div class="card-text">
          <strong>Category:</strong> {{ drinks[selectedIndex].cate_name }}
        </div>
      </div>
    </div>
  </div>

  <!-- Drink Cards
    <div class="drink-cards">
      <div class="card" v-for="(drink, cardIndex) in filterDrinks()" :key="drink.dr_id">
        <div class="card-body">
          <img class="img-fluid" :src="getDrinkImage(drink.dr_img)" alt="" />
          <h5 class="card-title">{{ drink.dr_name }}</h5>
          <p class="card-text">Price: {{ drink.dr_price }}</p>
          <p class="card-text">Category: {{ drink.cate_name }}</p>
        </div>
      </div>
    </div> -->

  <!-- Navigation Buttons -->
  <!-- <div class="navigation-buttons">
      <button @click="navigate(-1)" :disabled="selectedIndex === 0">Previous</button>
      <button @click="navigate(1)" :disabled="selectedIndex === filterDrinks().length - 1">
        Next
      </button>
    </div> -->
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.category-filters {
  margin-bottom: 20px;
}

.category-filters button {
  margin-right: 10px;
}

.active-filter {
  font-weight: bold;
}

.drink-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.drink-img {
  width: 100px;
  height: 100px;
}

.card {
  width: 300px;
  margin: 10px;
}

.navigation-buttons {
  margin-top: 20px;
}

.navigation-buttons button {
  margin-right: 10px;
}
</style>
