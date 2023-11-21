<script setup>
defineProps({
  drinks: { type: Array, default: () => [] },
  selectedIndex: { type: Number, default: -1 }
});

const $emit = defineEmits(['update:selectedIndex']);
</script>

<template>
  <div>
    <div class="p-1"><strong>Title:</strong> {{ drinks[selectedIndex].dr_name }}</div>
    <div class="p-1"><strong>Price:</strong> {{ drinks[selectedIndex].dr_price }}</div>
    <div class="p-1"><strong>Category:</strong> {{ drinks[selectedIndex].cate_name }}</div>
  </div>
  <ul class="list-group">
    <li
      class="list-group-item px-3"
      v-for="(drink, index) in drinks"
      :class="{ active: index === selectedIndex }"
      :key="drink.id"
      @click="$emit('update:selectedIndex', index)"
    >
      {{ drink.dr_name }}
    </li>
  </ul>
</template>
