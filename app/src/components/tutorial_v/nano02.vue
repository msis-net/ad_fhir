<script setup>
import { useStore } from '@nanostores/vue'
import { count } from '@store/profile'

const props = defineProps(['postId'])

const $count = useStore(count)


</script>

<template>
  <div>postId: {{ props.postId }}</div>
  <div>count:{{ $count }}</div>
</template>