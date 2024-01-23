<script setup lang="ts">
import { ref, computed, provide } from 'vue';
import Input from '@components/tutorial_v/Input.vue'
import Hello from '@components/tutorial_v/Hello.vue'

import Tokyo from '@components/tutorial_v/tokyo.vue'
import Kyoto from '@components/tutorial_v/kyoto.vue'

import CompA from '@components/tutorial_v/compA.vue';

const name = ref('John Doe');
const address = ref('');

const city = ref('tokyo');
const tabs:any = {
  tokyo: Tokyo,
  kyoto: Kyoto,
};
const tab = computed(() => tabs[city.value]);

const message = ref('Provide/Injectでデータ渡し');

provide('message', message);

const CallPerformScript = () => {
  try{
        let result = {
          post : "sss1580083",
          address : "東京都世田谷区奥沢６丁目",
          addresskana : "トウキョウトセタガヤクオクザワ６チョウメ"
        }
        Dummy(result)
        eval('FileMaker.PerformScript ("AlertAddress", JSON.stringify(result))')
        
      }catch(e){
        console.log('Not Claris FileMaker Platform！')
      }
}



 function Dummy(val:any){
    console.log(val)
    return val
 }
</script>

<template>
  <h1>Vue 3 入門</h1>
  <div>
    <a href="https://reffect.co.jp/vue/vue-js-components" target="_blank" rel="noopener noreferrer">
      参考サイト
    </a>
  </div>
  <button role="button" @click="CallPerformScript()">
          Call PerformScript
        </button>
  <p>name:{{ name }}</p>
  <p>address:{{ address }}</p>
  <Input v-model="name" @update:model-value="name = $event" style="padding: 1em; border-radius: 1em; margin: 0.5em"/>
  <Input v-model="address" @update:model-value="address = $event" style="padding: 1em; border-radius: 1em; margin: 0.5em"/>
  <Hello :name="name"/>
  <hr>
  <ul>
  </ul>
  <hr>
  <div>
    <button @click="city = 'tokyo'">東京</button>
    <button @click="city = 'kyoto'">京都</button>
  </div>
  <keep-alive>
    <component v-bind:is="tab"></component>
  </keep-alive>
  <hr>
  <CompA message="propsでデータ渡し" />
</template>
