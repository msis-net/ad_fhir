


<template>
    <div>
      <nav>
        <button role="button" @click="fetchTEST()">
            fetchData
        </button>
      </nav>
    </div>
  </template>
  
<script setup lang="ts" client:load>
  const fetchTEST = () => {
    const csvfile = "./utf_all.csv";
    fetch(csvfile) //読込
    .then(response => response.text())
    .then(csvdata  => {　//事後処理
      console.log('csvdata:'+csvdata)

    });
  }

</script>