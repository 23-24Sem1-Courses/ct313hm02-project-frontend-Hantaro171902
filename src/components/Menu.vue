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
    <div class="infor_drink">
      <div v-if="selectedIndex !== -1">
        <div class="p-1">
          <img class="img-fuild" :src="getDrinkImage(drinks[selectedIndex].dr_img)" alt="" />
        </div>
        <div class="p-1"><strong>Title:</strong> {{ drinks[selectedIndex].dr_name }}</div>
        <div class="p-1"><strong>Price:</strong> {{ drinks[selectedIndex].dr_price }}</div>
        <div class="p-1"><strong>Category:</strong> {{ drinks[selectedIndex].cate_name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
.infor_drink{
  position: fixed;
  right: 400px;
  top: 150px;
}
.infor_drink img{
  width: 200px;
  height: 200px;
}
</style>
