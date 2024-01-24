<script setup >
import { reactive } from 'vue';

const props = defineProps({
    date: String,
    name: String
})

import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
DataTable.use(DataTablesCore);

console.log('props.date',props.date)

const columns = [
  { data: 'name' },
  { data: 'position' },
  { data: 'office' },
  { data: 'extn' },
  { data: 'start_date' },
  { data: 'salary' },
];

const data = () =>{
  const jsonfile = "/tmp/data.json";
  fetch(jsonfile) //読込
  .then(response => response.text())
    .then(data  => { //事後処理
      console.log('data:'+data)
      data
    });
};

const getAcceptList = () => {
    //const jsonfile = "/orca/acceptlstv2/2024/acceptlstv2_20240124.json";
    const jsonfile = "/tmp/data.json";
    
    fetch(jsonfile) //読込
    .then(response => response.text())
    .then(data  => { //事後処理
      console.log('data:'+data)
      //alert(Object.keys(data).length)
      this.data = data
      return data
    });
  }


</script>


<template>
    <button role="button" @click="getAcceptList()">
    {{ props.date }}
    </button>
    <DataTable :data="data" class="display">
        <thead>
            <tr>
                <th>A</th>
                <th>B</th>
            </tr>
        </thead>
    </DataTable>
</template>