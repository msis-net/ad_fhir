
  
<script setup lang="ts">
import { useStore } from '@nanostores/vue';

import { statusStore } from '@store/loginStore';

const status = useStore(statusStore);
console.log(status.value)

const toggleLogin = () => {
    console.log('toggleLogin:')
	  statusStore.set(status.value === 'loggedIn' ? 'Other' : 'loggedIn');
  }

</script>

<template>
    <div>
      <nav>
        <button role="button" @click="toggleLogin()">
          {{status}}
        </button>
      </nav>
    </div>
  </template>