<script setup>
import CompB from '@components/tutorial_v/compB.vue';
const { message } = defineProps(['message']);
</script>
<template>
  <h3>CompAコンポーネント: {{ message }}</h3>
  <CompB :message="message"/>
</template>