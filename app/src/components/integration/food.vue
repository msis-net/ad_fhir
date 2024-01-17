<script setup lang="ts">
import { ref } from 'vue';
const food = ["Pizza", "French fries", "Spaghetti"];
const props = defineProps({
  name: String,
});

const name = ref(props.name);
</script>

<template>
   <p>Hello {{ props.name }}</p>
  <div>
    <ul>
      <li v-for="item in food">
        {{ item }}
      </li>
    </ul>
  </div>
</template>