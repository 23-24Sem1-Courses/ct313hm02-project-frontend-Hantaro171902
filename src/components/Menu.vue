<!-- eslint-disable no-undef -->
<script setup>
defineProps(['drinks', 'selectedIndex']);
const $emit = defineEmits(['update:selectedIndex']);
</script>

<template>
  <div>
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
    <div v-if="selectedIndex !== -1">
      <div class="p-1"><strong>Title:</strong> {{ drinks[selectedIndex].dr_name }}</div>
      <div class="p-1"><strong>Price:</strong> {{ drinks[selectedIndex].dr_price }}</div>
      <div class="p-1"><strong>Category:</strong> {{ drinks[selectedIndex].cate_name }}</div>
    </div>
  </div>
</template>
