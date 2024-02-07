<script setup>
/*
https://vue3datepicker.com/
*/
import { ref, reactive, onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { currentDate, valData } from '@store/userStore' 
import dayjs from "dayjs";
dayjs.locale("ja");

const date = ref(useStore(currentDate))
const values = useStore(valData)

let calHtml = ref("<div>ESD</div>")

const weeks = ['日', '月', '火', '水', '木', '金', '土']
let year = dayjs(date.value).format('YYYY')
let month = dayjs(date.value).format('MM')
const config = {
    show: 3,
}

calHtml = "<div>SSS</div>"
const showCalendar = (year, month) => {
    console.log("showCalendar",year,month)
    
    
    console.log("calHtml",calHtml)
}




function createCalendar(year, month) {
    
    const startDate = new Date(year, month - 1, 1) // 月の最初の日を取得
    const endDate = new Date(year, month,  0) // 月の最後の日を取得
    const endDayCount = endDate.getDate() // 月の末日
    const lastMonthEndDate = new Date(year, month - 1, 0) // 前月の最後の日の情報
    const lastMonthendDayCount = lastMonthEndDate.getDate() // 前月の末日
    const startDay = startDate.getDay() // 月の最初の日の曜日を取得
    let dayCount = 1 // 日にちのカウント
    let calendarHtml = '' // HTMLを組み立てる変数

    calendarHtml += '<h1>' + year  + '/' + month + '</h1>'
    calendarHtml += '<table>'

    // 曜日の行を作成
    for (let i = 0; i < weeks.length; i++) {
        calendarHtml += '<td>' + weeks[i] + '</td>'
    }

    for (let w = 0; w < 6; w++) {
        calendarHtml += '<tr>'

        for (let d = 0; d < 7; d++) {
            if (w == 0 && d < startDay) {
                // 1行目で1日の曜日の前
                let num = lastMonthendDayCount - startDay + d + 1
                calendarHtml += '<td class="is-disabled">' + num + '</td>'
            } else if (dayCount > endDayCount) {
                // 末尾の日数を超えた
                let num = dayCount - endDayCount
                calendarHtml += '<td class="is-disabled">' + num + '</td>'
                dayCount++
            } else {
                calendarHtml += '<td>' + dayCount + '</td>'
                dayCount++
            }
        }
        calendarHtml += '</tr>'
    }
    calendarHtml += '</table>'
    //console.log('calendarHtml'+calendarHtml)
    return calendarHtml
}

function moveCalendar(e) {
    document.querySelector('#calendar').innerHTML = ''

    if (e.target.id === 'prev') {
        month--

        if (month < 1) {
            year--
            month = 12
        }
    }

    if (e.target.id === 'next') {
        month++

        if (month > 12) {
            year++
            month = 1
        }
    }

    //showCalendar(year, month)
}

//document.querySelector('#prev').addEventListener('click', moveCalendar)
//document.querySelector('#next').addEventListener('click', moveCalendar)


onMounted(() => {
  console.log("onMounted",year, month)
  showCalendar(year, month)
})
</script>


<template>
    <button id="prev" type="button">前の月</button>
    <button id="next" type="button">次の月</button>
    <div v-html="calHtml"></div>
</template>
 

<style>
#calendar {
    display: flex;
    flex-wrap: wrap;
}

section {
    margin: 10px;
}

h1 {
    font-size: 18px;
}

table {
    border-spacing: 0;
    border-collapse: collapse;
}

td {
    border: 0px solid #ddd;
    padding: 5px;
    text-align: center;
}

td:first-child {
    color: red;
}

td:last-child {
    color: royalblue;
}

td.is-disabled {
    color: #ccc;
}
</style>