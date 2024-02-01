<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-responsive';
import 'datatables.net-select';

import datepicker from '@components/vue/datepicker.vue';
import dayjs from "dayjs";
dayjs.locale("ja");

DataTable.use(DataTablesCore);

const data = ref([]);
const tgtDate = ref(dayjs())
//console.log("tgtDate", tgtDate.value)
const env = ref([]);
const srynaiyo = ref([]);
const counter = ref({
  now : 0,
  today : 0 ,
  other: 0
})


//初回読み込み時はsrynaiyo値一覧の読込が必要な為、sessionStrage.jsonを先に読み込んでからget_dataを実行
async function set_value() {
  const envfile = `./orca/env/sessionStrage.json`
  await fetch(envfile)
    .then(response => response.json())
    .then(result => {
      env.value = result
      srynaiyo.value = result.vSrynaiyo
      //console.log(JSON.stringify(env.value))
    });
  get_data()
}

//受付リスト読みこみ
async function get_data() {
  counter.value={now:0, today:0, other:0}
  const yyyy = dayjs(tgtDate.value).format('YYYY')
  const yyyymmdd = dayjs(tgtDate.value).format('YYYYMMDD')
  const jsonfile = `./orca/acceptlstv2/${yyyy}/acceptlstv2_${yyyymmdd}.json`;
  console.log(jsonfile, yyyy, yyyymmdd)
  await fetch(jsonfile) //読込
    .then(response => response.json())
    .then(result => {
      //console.log(result)
      
      try{
        const temp = result.Acceptlst_Information; //変数化
        counter.value.today = Object.keys(temp).length
        //console.log(temp)
        temp.sort((a: any, b: any) => {
          //console.log(a.Acceptance_Time , b.Acceptance_Time)
          //return (a.Acceptance_Time < b.Acceptance_Time) ? -1 : 1;  //オブジェクトの昇順ソート
          return (a.Acceptance_Time > b.Acceptance_Time) ? -1 : 1;  //オブジェクトの降順ート
        });
        data.value = temp
      }catch(e){
      }
    });
}

const columns = [
  { data: 'Acceptance_Id' },
  { data: 'Acceptance_Time' },
  { data: 'Patient_Information.Patient_ID' },
  { data: 'Patient_Information.WholeName' },
  {
    data: function (row: any, _type: any, _val: any, _meta: any) {
      if (row.Patient_Information.Sex === "1") {
        return "男"
      } else if (row.Patient_Information.Sex === "2") {
        return "女"
      } else {
        return "不明"
      }
    }
  },
  {
    data: function (row: any, _type: any, _val: any, _meta: any) {
      //console.log("Age",calcAge('1966/03/29','2024/01/25'))
      const Age = calcAge(row.Patient_Information.BirthDate, tgtDate.value)
      return Age
    }
  },
  { data: 'Department_WholeName' },
  { data: 'Physician_WholeName' },
  {
    data: function (row: any, _type: any, _val: any, _meta: any) {
      return srynaiyo.value[row.Medical_Information]
    }
  },
  {
    data: function (row: any, _type: any, _val: any, _meta: any) {
      const HI_info = []
      HI_info.push(row.HealthInsurance_Information.Insurance_Combination_Number)
      HI_info.push(row.HealthInsurance_Information.InsuranceProvider_WholeName)

      for (var i in row.PublicInsurance_Information)
        HI_info.push(row.PublicInsurance_Information[i].PublicInsurance_Name)

      return HI_info.join(" ")
    }
  }
]

const options = {
  //dom: 'Bfrtip',
  //buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
  responsive: true,
  select: true,
  searching: true,
  ordering: false,
  lengthMenu: [5, 10, 50, 100],
};

onMounted(() => {
  set_value()
})

//年齢計算
function calcAge(birthday: string, tgtday: any): number {
  const today = dayjs(tgtday)
  const birthDate = dayjs(birthday)
  const baseAge = today.year() - birthDate.year()
  const thisBirthday = dayjs(`${today.year()}-${birthDate.month() + 1}-${birthDate.date()}`)
  return today.isBefore(thisBirthday) ? baseAge - 1 : baseAge
}

const changeDate = (modelData: any) => {
  //console.log("tgtDate",tgtDate.value)
  //console.log("changeDate",modelData)
  tgtDate.value = modelData
  data.value = []
  get_data()
}
</script>

<template>
  <div class="row">
    <div class="col-12 col-sm-6 col-md-3">
      <datepicker @changeDate="changeDate" />
    </div> <!-- /.col -->
    <div class="col-12 col-sm-6 col-md-3">
      <div class="info-box"> 
        <span class="info-box-icon text-bg-primary shadow-sm">
          <i class="bi bi-people"></i>
        </span>
        <div class="info-box-content">
          <span class="info-box-text">現在</span>
          <span class="info-box-number">{{ counter.now.toLocaleString('ja-JP') }}</span>
        </div> <!-- /.info-box-content -->
      </div> <!-- /.info-box -->
    </div> <!-- /.col --> 
    <div class="col-12 col-sm-6 col-md-3">
      <div class="info-box"> <span class="info-box-icon text-bg-success shadow-sm">
        <i class="bi bi-people-fill"></i>
        </span>
        <div class="info-box-content">
          <span class="info-box-text">本日</span>
          <span class="info-box-number">{{ counter.today.toLocaleString('ja-JP') }}</span>
        </div> <!-- /.info-box-content -->
      </div> <!-- /.info-box -->
    </div> <!-- /.col -->
    <div class="col-12 col-sm-6 col-md-3">
      <div class="info-box">
        <span class="info-box-icon text-bg-warning shadow-sm"> 
          <i class="bi bi-person-check-fill"></i>
        </span>
        <div class="info-box-content">
          <span class="info-box-text">その他</span>
          <span class="info-box-number">{{ counter.other.toLocaleString('ja-JP') }}</span>
        </div> <!-- /.info-box-content -->
      </div> <!-- /.info-box -->
    </div> <!-- /.col -->
  </div>
  <div class="row">
    <DataTable
      :columns="columns"
      :options="options"
      :data="data"
      class="display nowrap"
      width="100%"
    >
    <thead>
      <tr>
        <th>番号</th>
        <th>受付時刻</th>
        <th>患者番号</th>
        <th>患者氏名</th>
        <th>性</th>
        <th>年齢</th>
        <th>診療科</th>
        <th>ドクター</th>
        <th>診察内容</th>
        <th>保険組合せ</th>
      </tr>
    </thead>

    </DataTable>
  </div>
</template>

<style>
@import 'datatables.net-dt';
@import 'datatables.net-buttons-dt';
@import 'datatables.net-responsive-dt';
@import 'datatables.net-select-dt';
</style>
