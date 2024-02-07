<script setup>
import { ref,reactive, onMounted } from 'vue';
import { Qualendar, DatePicker } from "qalendar";
//コンポーネント間で共有する日付データ
import { useStore } from '@nanostores/vue';
import { currentDate, valData } from '@store/userStore' 
import dayjs from "dayjs";
dayjs.locale("ja");
const date = ref(useStore(currentDate))
const values = useStore(valData)

const props = defineProps({
    tgtval: Number ,
    name: String
})


date.value = dayjs().add(3,"month")
console.log(date.value)
const defaultDate =  new Date(date.value)
console.log("defaultDate",defaultDate)
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
        firstDayOfWeek="monday"
        :selected-date="new Date(2024, 0, 8)"
        :default-date="new Date(date)"
        @updated="handleUpdate" 
    />
</template>
 

<style>
@import "qalendar/dist/style.css";
</style>