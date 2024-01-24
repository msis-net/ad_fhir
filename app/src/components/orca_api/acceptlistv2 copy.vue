<script lang="ts">
import { ref  } from 'vue';



import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
DataTable.use(DataTablesCore);



const jsonfile = "/tmp/data.json";

const data = ref([])
export default {
  props: {
    date: String,
    name: String
  },
  setup(props) {
    // setup() は第 1 引数に props を受け取ります。
    console.log("date",props.date)

    const jsonfile = "/tmp/data.json";
    
    }
  }


const chgdata = () => {
    //const jsonfile = "/orca/acceptlstv2/2024/acceptlstv2_20240124.json";
    const jsonfile = "/tmp/data.json";
    
    data = [
      [1, 2],
      [5, 4],
    ];
    return data
  }

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
    {{ date }}
    </button>
    <button role="button" @click="chgdata()">
      {{ name }}
    </button>
    <div>
    <h1>Simple table</h1>
    <h2>DataTables + Vue3 example</h2>
    <p>
      This example demonstrates the <code>datatables.net-vue3</code> package
      being used to display an interactive DataTable in a Vue application.
    </p>
    <!--
    <DataTable :data="data" class="display" width="100%">
      <thead>
        <tr>
          <th>A</th>
          <th>B</th>
        </tr>
      </thead>
    </DataTable>
    -->
  </div>
</template>

<style>
@import 'datatables.net-dt';
</style>