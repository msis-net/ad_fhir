<script setup>
import { ref, onMounted } from 'vue';
import { DatePicker } from "qalendar";
//コンポーネント間で共有する日付データ
import { useStore } from '@nanostores/vue';
import { currentDate, valData } from '@store/userStore' 
import dayjs from "dayjs";
dayjs.locale("ja");
const date = ref(useStore(currentDate))
const values = useStore(valData)

console.log(date.value)
console.log(currentDate)
const disableDates= {
                before: new Date(2022, 5, 1),
                after: new Date(2022, 5, 31),
            }

/*
export default {
    components: { DatePicker },

    data() {
        return {
            // Disables the user from selecting dates other than in June 2022
            disableDates: {
                before: new Date(2022, 5, 1),
                after: new Date(2022, 5, 31),
            },
        };
    },

    methods: {
        handleUpdate(payload) {
            const { year, month, date } = payload;
        },
    },
};*/

const handleUpdate = (payload) =>{
    console.log(payload)
} 
</script>


<template>
    <DatePicker 
        locale="ja-JP" 
        firstDayOfWeek="sunday" 
       
        :default-date="new Date(date)"
        @updated="handleUpdate" 
    />
</template>
 

<style>
@import "qalendar/dist/style.css";
</style>