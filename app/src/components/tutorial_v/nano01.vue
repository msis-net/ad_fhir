<script setup>
import { useStore } from '@nanostores/vue'
import { count } from '@store/profile'

const props = defineProps(['postId'])

const $count = useStore(count)
const getAcceptList = () => {
      console.log('count:',$count.value)
      count.set(count.value+1)
      console.log('count:',$count.value)
}

</script>

<template>
  <div>postId: {{ props.postId }}</div>
  <div>count:{{ $count }}</div>

  <button role="button" @click="getAcceptList()">
    Increment(+)
  </button>

</template>