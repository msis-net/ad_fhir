<script setup>
import { ref } from 'vue';
const props = defineProps({
  price: Number,
});
const price = ref(props.price);

price.value++

</script>

<template>
  <h2>初めてのコンポーネント{{ price }}</h2>
  <p>{{ props.price + 100 }}</p>
</template>