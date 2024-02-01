<script setup lang="ts">
import { ref, onMounted  } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';

const props = defineProps({
  date: String,
  name: String
})
 
DataTable.use(DataTablesCore);
 
const data = ref([]);

async function get_data() {
  const jsonfile = "./tmp/data.json";
  console.log(jsonfile)
  await fetch(jsonfile) //読込
    .then(response => response.text())
    .then(result  => { 
      const res = JSON.parse(result)
      console.log(res)
      data.value = res.data
    });
}

onMounted(() => {
  get_data()
})

const columns = [
  { data: 'name' },
  { data: 'position' },
  { data: 'office' },
  { data: 'extn' },
  { data: 'start_date' },
  { data: 'salary' },
];

//get_data();
</script>
 
<template>
   <button role="button" @click="get_data()">
    {{props.name}}
    </button>
    <DataTable
      :columns="columns"
      :data="data"
      class="display"
      width="100%"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Extn.</th>
          <th>Start date</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>Extn.</th>
          <th>Start date</th>
          <th>Salary</th>
        </tr>
      </tfoot>
    </DataTable>
</template>

<style>
@import 'datatables.net-dt';
</style>
