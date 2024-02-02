<script setup lang="ts">
import { ref, onMounted, onUpdated, watch  } from 'vue';

//コンポーネント間で共有する日付データ
import { useStore } from '@nanostores/vue';
import { currentDate, valData } from '@store/userStore' 
const date = ref(useStore(currentDate))
const values = useStore(valData)

import dayjs from "dayjs";
dayjs.locale("ja");

import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
DataTable.use(DataTablesCore);
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-responsive';
import 'datatables.net-select';

const data = ref([]);
const env = ref([values.value]);
const srynaiyo = ref([]);
const counter = ref({
  now : 0,
  today : 0 ,
  endof: 0
})

//初回読み込み時はsrynaiyo値一覧の読込が必要な為、sessionStrage.jsonを先に読み込んでからget_dataを実行
async function app_init() {
  const envfile = `./orca/env/sessionStrage.json`
  await fetch(envfile)
    .then(response => response.json())
    .then(result => {
      env.value = result
      srynaiyo.value = result.vSrynaiyo
      //console.log(JSON.stringify(values.value))
      valData.set(result)
      //console.log("datepicker:set_value",values)
    });
  get_data("")
}

//受付リスト読みこみ
async function get_data(type:string) {
  //引数バリデーション
  if(type===null)
    type = ""
  counter.value={now:0, today:0, endof:0}
  data.value = []
  const yyyy = dayjs(date.value).format('YYYY')
  const yyyymmdd = dayjs(date.value).format('YYYYMMDD')
  const jsonfile = `./orca/acceptlstv2/${yyyy}/acceptlstv2_${yyyymmdd}.json`;
  //console.log(jsonfile, yyyy, yyyymmdd)
  await fetch(jsonfile) //読込
    .then(response => response.json())
    .then(result => {
      //console.log(result)
      
      try{
        const temp = result.Acceptlst_Information; //変数化
        counter.value.today = Object.keys(temp).length
        let Account_Time = 0
        
        //統計処理
        for ( let i in temp){
          //console.log("type",temp[i])
          if(temp[i].Account_Time){
            Account_Time ++
          }
        }
        counter.value.endof = Account_Time
        counter.value.now = counter.value.today - counter.value.endof
        //console.log("type",type,type.length)
        if( type.length === 0 ){//現在外来：降順ソート：未会計患者のみ
          //フィルタを使って未会計のレコードだけに絞る
          const temp2 = temp.filter((item:any) => item.hasOwnProperty("Account_Time") === false );
          //console.log("temp2",temp2)

          temp2.sort((a: any, b: any) => {
            return (a.Acceptance_Time > b.Acceptance_Time) ? -1 : 1;  //オブジェクトの降順ート
          });
          data.value = temp2
        }else if ( type === "endof"){//本日外来：昇順ソート：全レコード
          const temp2 = temp.filter((item:any) => item.hasOwnProperty("Account_Time") );
          //console.log("temp2",temp2)

          temp2.sort((a: any, b: any) => {
            return (a.Acceptance_Time < b.Acceptance_Time) ? -1 : 1;  //オブジェクトの昇順ソート
          });
          data.value = temp2
        }else if ( type === "today"){//本日外来：昇順ソート：全レコード
          //console.log("本日")
          temp.sort((a: any, b: any) => {
            return (a.Acceptance_Time < b.Acceptance_Time) ? -1 : 1;  //オブジェクトの昇順ソート
          });
          data.value = temp
        } 
      }catch(e){
        //error handringが必要な場合はここに記録
      }
    });
}

const columns = [
  { data: function (row: any, _type: any, _val: any, _meta: any) { 
      return Number(row.Acceptance_Id) +' <i class="bi bi-heart-pulse"></i>'
    } 
  },
  { data: 'Acceptance_Time' },
  { data: 'Patient_Information.Patient_ID'},
  { data: function (row: any, _type: any, _val: any, _meta: any) {
      //return '<a href="./ehr/ehr_index?id='+`${+row.Patient_Information.Patient_ID}`+'"><i class="bi bi-play-btn-fill"></i></a> '+row.Patient_Information.WholeName
      return '<a href="./ehr/ehr_index?id='+`${+row.Patient_Information.Patient_ID}`+'"><i class="bi bi-play-btn-fill"></i></a> '+row.Patient_Information.WholeName
    }
  },
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
      const Age = calcAge(row.Patient_Information.BirthDate, date.value)
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
  /*dom: 'Bfrtip',
        buttons: [
            {
                text: 'My button',
                action: function ( e, dt, node, config ) {
                    console.log(e)
                    console.log(dt)
                    console.log(node)
                    console.log(config)
                }
            }
        ],*/
  responsive: true,
  select: true,
  searching: true,
  ordering: false,
  lengthMenu: [10,20 ,50, 100],
};

onMounted(() => {
  //console.log("onMounted")
  app_init()
})
onUpdated(() => {
  //console.log("onUpdated")
  //get_data("")
})

//日付に変更が発生した場合リスト更新
watch(() => date.value, () => {
  console.log("watch:date", date.value)
  get_data("")
})
//年齢計算
function calcAge(birthday: string, tgtday: any): number {
  const today = dayjs(tgtday)
  const birthDate = dayjs(birthday)
  const baseAge = today.year() - birthDate.year()
  const thisBirthday = dayjs(`${today.year()}-${birthDate.month() + 1}-${birthDate.date()}`)
  return today.isBefore(thisBirthday) ? baseAge - 1 : baseAge
}

const onselect = (event: any, chartContext: any, config: any) => {
  console.log("event", event)
  console.log("chartContext", chartContext)
  console.log("config", config)
 
}
</script>

<template>
  <div class="row">
    <div class="col-12 col-sm-6 col-md-3">
      <div class="info-box">
        <span class="info-box-icon text-bg-primary shadow-sm" @click='get_data("today")'>
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
        <span class="info-box-icon text-bg-success shadow-sm" @click='get_data("")'>
          <i class="bi bi-people"></i>
        </span>
        <div class="info-box-content">
          <span class="info-box-text">現在</span>
          <span class="info-box-number">{{ counter.now.toLocaleString('ja-JP') }}</span>
        </div> <!-- /.info-box-content -->
      </div> <!-- /.info-box -->
    </div> <!-- /.col --> 
    
    <div class="col-12 col-sm-6 col-md-3">
      <div class="info-box">
        <span class="info-box-icon text-bg-warning shadow-sm" @click='get_data("endof")'>
          <i class="bi bi-person-check-fill"></i>
        </span>
        <div class="info-box-content">
          <span class="info-box-text">会計済み</span>
          <span class="info-box-number">{{ counter.endof.toLocaleString('ja-JP') }}</span>
        </div> <!-- /.info-box-content -->
      </div> <!-- /.info-box -->
    </div> <!-- /.col -->

    <div class="col-12 col-sm-6 col-md-3">
      <div class="info-box">
        <span class="info-box-icon text-bg-danger shadow-sm" @click='get_data("endof")'>
          <i class="bi bi-person-check-fill"></i>
        </span>
        <div class="info-box-content">
          <span class="info-box-text">その他</span>
          <span class="info-box-number">0</span>
        </div> <!-- /.info-box-content -->
      </div> <!-- /.info-box -->
    </div> <!-- /.col -->
  </div>
  <!--<div>{{ date }}</div> /.確認用 -->
  <div class="row">
    <DataTable
      :columns="columns"
      :options="options"
      :data="data"
      @click = "onselect"
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

/*対象データ無い時は表示を消す*/
.dataTables_empty {
  display: none;
}
</style>
