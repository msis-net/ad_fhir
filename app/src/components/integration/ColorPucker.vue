
<script setup>
import { ref } from "vue";
const color = ref("green")
</script>

<template>
    <div>
        Color pickeer
        <input type="text" v-model="color" />
        <p>{{ color }}</p>
    </div>
</template>

<style lang="scss" scoped>

</style>