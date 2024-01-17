<script setup lang="ts">
const props = defineProps({
    message: String,
    name: String
})
</script>

<template>
   <div>message:{{ props.message }} name:{{ props.name }}</div>
</template>