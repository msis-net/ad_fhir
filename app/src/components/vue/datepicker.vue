<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { useStore } from '@nanostores/vue';
import { currentDate, valData } from '@store/userStore' 
const date = ref(useStore(currentDate))
const values = useStore(valData)
import dayjs from "dayjs";
dayjs.locale("ja");

onMounted(() => {
  //sessionStorage.isLogginから初回ログインかどうかを判定し
  if(sessionStorage.isLoggin){
    //console.log("datepicker:keep",date.value)
    
  }else{
    const ymd:any = dayjs().format('YYYY-MM-DD')
    //console.log("datepicker:ymd",currentDate )
    currentDate.set(ymd)
    sessionStorage.setItem( "isLoggin" , String(new Date()) )
  }
})
//console.log("datepicker:currentDate",currentDate )
const changeDate = (event:any) => {
  const ymd:any = dayjs(event.target.value).format('YYYY-MM-DD')
  currentDate.set(ymd)
  //console.log("index:currentDate",currentDate )
}

async function app_init() {
  const envfile = `/orca/env/sessionStrage.json`
  await fetch(envfile)
    .then(response => response.json())
    .then(result => {
      valData.set(result)
      console.log("datepicker:set_value",values)
    });
}

onMounted(() => {
  //console.log("onMounted")
  app_init()
})
</script>

<template>
  <div class="mt-3">
    <input type="date" id="setDate" :value="date" @change="changeDate">
  </div>
</template>

<style>
input  {
  border-radius: var(--dp-border-radius, 1px);
  line-height: 2.15rem;
  border: 0;
  font-size: 1.6em;
}
</style>
