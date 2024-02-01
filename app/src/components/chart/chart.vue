

<script setup lang="ts">
import { ref, reactive,onMounted  } from 'vue'
import VueApexCharts from "vue3-apexcharts";

import { useStore } from '@nanostores/vue'
import { currentDate, valData } from '@store/userStore' 
const date = ref(useStore(currentDate))
const values = useStore(valData)

import dayjs from "dayjs";
dayjs.locale("ja");

const env = ref(values);
let srynaiyo:string[] = []
const seriesitem:any = []
async function app_init() {
  const envfile = `./orca/env/sessionStrage.json`
  await fetch(envfile)
    .then(response => response.json())
    .then(result => {
      env.value = result
      srynaiyo = result.vSrynaiyo
      console.log(JSON.stringify(srynaiyo))
      valData.set(result)
      //console.log("datepicker:set_value",values)
    })
    .then(() =>{
      for(var i in srynaiyo){
        console.log(srynaiyo[i])
        const tmpdata:number[] = []
        const tmpitem = {
          name : "["+i+"]"+srynaiyo[i],
          data : tmpdata
        }
        seriesitem.push(tmpitem) 
        console.log("series",seriesitem)
      }
    })    
}
app_init()

const categories:string[] = []

const type = ref("bar")

let chartOptions= reactive({
        chart: {
          id: "vuechart-example",
        },
        stacked: true,
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          },
        xaxis: {
          categories: categories,
        },
      })

const series= reactive(seriesitem)


const updateChart = () =>{
  series[0].data=[3, 4, 5, 5, 49, 60, 70, 81]
  //const result = getAllDays(date.value)
  //const dlist:string[] = result[1]
  //chartOptions.xaxis.categories = dlist

  chartOptions.xaxis.categories = []
  const month = dayjs(date.value).format('MM')
  let tmpdate = dayjs(date.value).startOf('month')// 最初の日付
  while (dayjs(tmpdate).format('MM') === month) {// 次月になるまでループさせる
    chartOptions.xaxis.categories.push(dayjs(date.value).format('DD'))// 配列に追加
    
    let yyyy = dayjs(tmpdate).format('YYYY')
    let yyyymmdd = dayjs(tmpdate).format('YYYYMMDD')
    const jsonfile = `./orca/acceptlstv2/${yyyy}/acceptlstv2_${yyyymmdd}.json`;
    
    
    tmpdate = tmpdate.add(1,'day')// +1
  }
}

async function get_data() {
  const list = getAllDays(date.value)
  console.log("list",list)
  for ( var i in list ){
    let datestr = dayjs(list[i]).format('YYYY-MM-DD')
    let yyyy = dayjs(datestr).format('YYYY')
    let yyyymmdd = dayjs(datestr).format('YYYYMMDD')
    const jsonfile = `./orca/acceptlstv2/${yyyy}/acceptlstv2_${yyyymmdd}.json`;
    //console.log(jsonfile)
    //エラーハンドリングできない：ファイルの存在が無い場合は404エラーとなる
    await fetch(jsonfile) //読込
    .then(response => response.json())
    .then(result => {
      console.log(jsonfile)
      try{
        const temp = result.Acceptlst_Information; //変数化
        
        const counter = Object.keys(temp).length
        console.log('temp',counter,temp)
        
        //統計処理
        for ( let i in temp){
          const srykbn_code = temp[i].Medical_Information
          const srykbn_name = srynaiyo.value[temp[i].Medical_Information]
          console.log("type",srykbn_code, srykbn_name)
          
        }

      }catch(e){
        //error handringが必要な場合はここに記録
      }
    })
    .catch(error => {//Loopを回す為にこのエラーハンドリングは必要
      console.error(error);
    });
  }
  
  
  //series.value.push({ name: 'PRODUCT E',data: [41, 27, 85, 53, 42, 8] })

}

function getAllDays(datestr:any) {
  const month = dayjs(datestr).format('MM')
  let date = dayjs(datestr).startOf('month')// 最初の日付
  const dates = [];
  while (dayjs(date).format('MM') === month) {// 次月になるまでループさせる
      dates.push(date)// 配列に追加
      date = date.add(1,'day')// +1
  }
  return dates
}


onMounted(() => {
  //tgtDate = sessionStorage.getItem( "currentDate")
  //updateChart()
  get_data()
})

</script>

<template>
  <div>
    <VueApexCharts
      :type="type"
      width="550"
      :options="chartOptions"
      :series="series"
    ></VueApexCharts>
    <button @click="updateChart">Update!</button>
  </div>
</template>
