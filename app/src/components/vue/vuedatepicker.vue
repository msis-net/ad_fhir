
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';

import '@vuepic/vue-datepicker/dist/main.css'
  
import { useStore } from '@nanostores/vue';
import { currentDate, valData } from '@store/userStore'
import dayjs from "dayjs";
//const date = ref(useStore(currentDate))
const date = useStore(currentDate)
const values = useStore(valData)
console.log("values",values.value)


//カレンダー開始日（１月前）
//const startDate = ref(new Date(2023, 0,31));
let stymd = dayjs(date.value).add(-1,"month").format("YYYY-MM-DD")
const startDate = ref(new Date(stymd));
console.log("startDate",startDate.value,stymd)
//const period = dayjs(date).add(-1,"month")

dayjs.locale("ja");

const highlightedDate:any[]=[]


onMounted(() => {
  console.log("date",date)
  highlightedDate.push("2024-01-25")
  highlightedDate.push("2024-01-28")
})

const handleDate = (modelData:any) => {
    console.log("click",modelData)
    const ymd:any = dayjs(modelData).format('YYYY-MM-DD')
    currentDate.set(ymd)
    console.log("datepicker:ymd",currentDate.value )
}
//日付に変更が発生した場合リスト更新
watch(() => date.value, () => {
  console.log("watch:date", date.value)
  console.log("watch:startDate", startDate.value)
})


</script>

<template>
    <VueDatePicker 
    :enable-time-picker="false"
    :start-date="startDate"
    :highlight="highlightedDate"
    focus-start-date
    v-model="date"
    multi-calendars="3"
    year
    inline
    auto-apply 
    locale="jp"
    position="right" 
    menu-class-name="dp-custom-menu"
    calendar-class-name="dp-custom-calendar"
    calendar-cell-class-name="dp-custom-cell"
    @update:model-value="handleDate"
    >
    <template #year="{ value }"> {{ value }}年 </template>
    </VueDatePicker>
</template>
<!--

    hide-offset-dates : カレンダー内の該当月以外の日付（グレー表示）を消す
    :start-date="startDate"
    focus-start-date ←を付けたす事でstartDateが有効になる
-->
<style>

:root {
    --dp-common-transition: all 0.1s ease-in;
    --dp-menu-padding: 6px 8px;
    --dp-animation-duration: 0.1s;
    --dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1);
    --dp-transition-timing: ease-out;
    --dp-action-row-transtion: all 0.2s ease-in;
    --dp-font-family: -apple-system, blinkmacsystemfont, "Segoe UI", roboto, oxygen, ubuntu, cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    --dp-border-radius: 4px;
    --dp-cell-border-radius: 4px;
    --dp-transition-length: 22px;
    --dp-transition-timing-general: 0.1s;
    --dp-button-height: 20px;/*月、年選択ボタンの横幅（デフォルト: 35px）*/
    --dp-month-year-row-height: 20px;/*月、年選択ボタンの高さ横幅（デフォルト: 35px）*/
    --dp-month-year-row-button-size: 20px;/*左右切替アイコン横幅（デフォルト: 35px）*/
    --dp-button-icon-height: 20px;/*左右切替アイコン高さ（デフォルト: 35px）*/
    --dp-calendar-wrap-padding: 0 5px;
    --dp-cell-size: 20px;/*全体の横幅（デフォルト: 35px）*/
    --dp-cell-padding: 5px;
    --dp-common-padding: 10px;
    --dp-input-icon-padding: 35px;
    --dp-input-padding: 6px 30px 6px 12px;
    --dp-menu-min-width: 260px;
    --dp-action-buttons-padding: 1px 6px;
    --dp-row-margin: 1px 0px;/*行の高さ（デフォルト: 5px 0px）*/
    --dp-calendar-header-cell-padding: 0.5rem;
    --dp-multi-calendars-spacing: 10px;
    --dp-overlay-col-padding: 3px;
    --dp-time-inc-dec-button-size: 32px;
    --dp-font-size: 0.8rem;/*フォントサイズ（デフォルト：1rem）*/
    --dp-preview-font-size: 0.8rem;
    --dp-time-font-size: 2rem;
    --dp-action-button-height: 22px;
    --dp-action-row-padding: 8px
}


.dp-custom-cell {
  border-radius: 50%;/*選択位置の形*/
}
</style>
  