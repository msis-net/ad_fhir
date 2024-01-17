<script setup>
const props = defineProps({
  modelValue: String,
});
</script>
<template>
  <input
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  
</template>