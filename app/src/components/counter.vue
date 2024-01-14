<script setup>
import { ref } from 'vue';
const count = ref(0);
const heading = 'Astro with Vue 3 Counter APP';
</script>
<template>
  <div class="flex flex-col items-center">
    <div class="text-xl font-bold text-purple-600">{{ heading }}</div>
    <p>Count is: {{ count }}</p>
    <button
      @click="count++"
      class="px-4 py-2 rounded"
    >
      Increment(+)
    </button>
    
    <button
      @click="count--"
      class="px-4 py-2 rounded"
    >
      Decrement(-)
    </button>
  </div>
</template>