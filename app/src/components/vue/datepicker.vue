<script setup>
import { ref } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref(new Date())

/*
こちらのフォーマットを使う場合は「v-bind:format」とする
:format="format"
format ="YYYY/MM/DD(EEE)"
*/
const format = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const week = date.getDay()
  const weekday = date.toLocaleDateString('ja', {weekday: 'short'});
  return `${year}/${month}/${day}(${weekday})`
}


</script>

<template>
  <Datepicker 
    v-model="date"
    :format="format"
    :enable-time-picker="false"
    :show-now-button="true"
    locale="ja"
    ></Datepicker>
</template>