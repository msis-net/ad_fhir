<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import VueApexCharts from "vue3-apexcharts";

import { useStore } from '@nanostores/vue'
import { currentDate, valData } from '@store/userStore'
const date = ref(useStore(currentDate))
const values = useStore(valData)

import dayjs from "dayjs";
dayjs.locale("ja");

let env = reactive(values);
let srynaiyo: any = reactive([]);
console.log("env", env)

const dateCategories: string[] = reactive([])
const dateOptions = reactive({
  chart: {
    id: "dayly-chart",
  },
  toolbar: {
    show: true
  },
  plotOptions: {
    bar: {
      barHeight: '100%',
      distributed: true,
      horizontal: true,
      dataLabels: {
        position: 'bottom'
      },
    }
  },
  dataLabels: {
    enabled: true
  },
  xaxis: {
    categories: dateCategories,
  },
})

const dateData: number[] = [1,2,3,4,5,6,7,8,9]
const dateSeries = reactive([
  {
    data: dateData
  },
])

async function app_init() {
  const envfile = `./orca/env/sessionStrage.json`
  await fetch(envfile)
    .then(response => response.json())
    .then(result => {
      valData.set(result)
      env = result
      srynaiyo = result.vSrynaiyo
      console.log("srynaiyo2", JSON.stringify(srynaiyo))
      const tmpSet = Object.keys(srynaiyo).sort();
      console.log("tmpSet", tmpSet)
      for (var i in tmpSet) {
        console.log("tmpSet", tmpSet[i], srynaiyo[tmpSet[i]])
        var catStr = "[" + tmpSet[i] + "]" + srynaiyo[tmpSet[i]]
        dateCategories.push(catStr)
      }
      console.log("dateCategories", dateCategories)
    });
}
app_init()


const monthCategories: string[] = []
const monthlyOptions = reactive({
  chart: {
    id: "monthly-chart",
  },
  stacked: true,
  toolbar: {
    show: true
  },
  zoom: {
    enabled: true
  },
  xaxis: {
    categories: monthCategories,
  },
})

const monthData: number[] = []
const monthlySeries = reactive([
  {
    name: "来院患者",
    data: monthData
  },
])

async function get_data() {
  const list = getAllDays(date.value)
  console.log("list", list)
  const countlist: number[] = []
  for (var i in list) {
    let datestr = dayjs(list[i]).format('YYYY-MM-DD')
    let yyyy = dayjs(datestr).format('YYYY')
    let yyyymmdd = dayjs(datestr).format('YYYYMMDD')
    const jsonfile = `./orca/acceptlstv2/${yyyy}/acceptlstv2_${yyyymmdd}.json`
    //console.log(jsonfile)
    //エラーハンドリングできない：ファイルの存在が無い場合は404エラーとなる
    await fetch(jsonfile) //読込
      .then(response => response.json())
      .then(result => {
        console.log(jsonfile)
        try {
          const temp = result.Acceptlst_Information; //変数化

          const count = Object.keys(temp).length

          countlist.push(count)
        } catch (e) {
          //error handringが必要な場合はここに記録
          countlist.push(0)
        }
      })
      .catch(error => {//Loopを回す為にこのエラーハンドリングは必要
        console.error(error);
        countlist.push(0)
      });
  }
  console.log('countlist', countlist)
  monthlySeries[0].data = countlist
}

const updateChart = () => {
  monthlyOptions.xaxis.categories = []
  const month = dayjs(date.value).format('MM')
  let tmpdate = dayjs(date.value).startOf('month')// 最初の日付
  while (dayjs(tmpdate).format('MM') === month) {// 次月になるまでループさせる
    monthlyOptions.xaxis.categories.push(dayjs(tmpdate).format('DD'))// 配列に追加
    tmpdate = tmpdate.add(1, 'day')// +1
  }
  get_data()
}

function getAllDays(datestr: any) {
  const month = dayjs(datestr).format('MM')
  let date = dayjs(datestr).startOf('month')// 最初の日付
  const dates = [];
  while (dayjs(date).format('MM') === month) {// 次月になるまでループさせる
    dates.push(date)// 配列に追加
    date = date.add(1, 'day')// +1
  }
  return dates
}

onMounted(() => {
  updateChart()
})
//日付に変更が発生した場合リスト更新
watch(() => date.value, () => {
  console.log("watch:date", date.value)
  updateChart()
})

async function get_detail(ymd: any) {
  const tgtdate = dayjs(ymd).format('YYYY-MM-DD')

  const yyyy = dayjs(tgtdate).format('YYYY')
  const yyyymmdd = dayjs(tgtdate).format('YYYYMMDD')
  const jsonfile = `./orca/acceptlstv2/${yyyy}/acceptlstv2_${yyyymmdd}.json`
  console.log("tgtdate", tgtdate, jsonfile, dateCategories)
  await fetch(jsonfile) //読込
    .then(response => response.json())
    .then(result => {
      console.log(result)
      try {
        const temp = result.Acceptlst_Information; //変数化
        for (let i in temp) {
          console.log("type", temp[i])

        }


      } catch (e) {
        //error handringが必要な場合はここに記録
      }
    })
    .catch(error => {//Loopを回す為にこのエラーハンドリングは必要
      console.error(error);
    });
  console.log("srynaiyo", JSON.stringify(srynaiyo))
}


const clickBar = (event: any, chartContext: any, config: any) => {
  console.log("event", event)
  console.log("chartContext", chartContext)
  console.log("config", config)
  console.log(config.dataPointIndex, config.config.xaxis.categories);
  var i = config.dataPointIndex //クリック位置
  var v = config.config.xaxis.categories[i] //ラベルの位置(=日付)
  let tmpdate = dayjs(date.value).format('YYYY-MM')
  console.log("date", tmpdate + "-" + v)
  get_detail(tmpdate + "-" + v)

}
</script>

<template>
  <div class="col-sm-6">
    <VueApexCharts 
      type="bar" 
      height="250" 
      :options="monthlyOptions" 
      :series="monthlySeries"
      @click="clickBar">
    </VueApexCharts>
    <!--
    <button @click="updateChart">Update!</button>
    -->
    </div>
    
    <div class="col-sm-6">
    <VueApexCharts type="bar" height="250" :options="dateOptions" :series="dateSeries"></VueApexCharts>
    </div>

</template>
