

<script setup lang="ts">
import { ref, reactive, onMounted, watch   } from 'vue'
import VueApexCharts from "vue3-apexcharts";

import { useStore } from '@nanostores/vue'
import { currentDate, valData } from '@store/userStore' 
const date = ref(useStore(currentDate))
const values = useStore(valData)

import dayjs from "dayjs";
dayjs.locale("ja");

const env = ref(values);
let srynaiyo:string[] = []



const categories:string[] = []



let chartOptions= reactive({
        chart: {
          id: "vuechart-example",
          type: 'bar',
          stacked: true,//縦重なり
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



const data:number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
const series:any = reactive([])

async function get_data() {

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
        const tmpitem = {
          id : i ,
          name : srynaiyo[i],
          data : data
        }
        series.push(tmpitem) 
      }
    })  
    console.log("series",series)
  const list = getAllDays(date.value)
  console.log("list",list)
  const countlist:number[] = []
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
        //const count = Object.keys(temp).length
        //countlist.push(count)

        //統計処理
        for ( let j in temp){
          const Medical_Information = temp[j].Medical_Information
          console.log("type",Medical_Information)
         series.find((item:any) => {
            if( item.id === Medical_Information ){
              
              item.data[i]++
              console.log("type",item)
            }
          })

        }
      }catch(e){
        //error handringが必要な場合はここに記録
        countlist.push(0)
      }
    })
    .catch(error => {//Loopを回す為にこのエラーハンドリングは必要
      console.error(error);
      //countlist.push(0)
      
    });
  }
  console.log('countlist',countlist)
  //series[0].data=countlist
  console.log('series',series)
}

const updateChart = () =>{
  chartOptions.xaxis.categories = []
  const month = dayjs(date.value).format('MM')
  let tmpdate = dayjs(date.value).startOf('month')// 最初の日付
  while (dayjs(tmpdate).format('MM') === month) {// 次月になるまでループさせる
    chartOptions.xaxis.categories.push(dayjs(tmpdate).format('DD'))// 配列に追加
    tmpdate = tmpdate.add(1,'day')// +1
  }
  
  get_data()
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
  
  updateChart()
})
//日付に変更が発生した場合リスト更新
watch(() => date.value, () => {
  console.log("watch:date", date.value)
  updateChart()
})
</script>

<template>
  <div>
    <VueApexCharts
      width="550"
      height="250"
      :options="chartOptions"
      :series="series"
    ></VueApexCharts>
    <!--
    <button @click="updateChart">Update!</button>
    -->
  </div>
</template>
