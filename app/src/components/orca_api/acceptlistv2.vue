<script setup lang="ts">
import { ref  } from 'vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';

const props = defineProps({
  date: String,
  name: String
})
 
DataTable.use(DataTablesCore);
 
const data = ref([
  [13, 14],
]);


//reactiveサンプル
const push = () => {
  data.value.push( [5,6] );
  console.log(data)
}

const initialize = () => {
  console.log("on load..")
  data.value.push( [1,2] );
};
initialize();
</script>
 
<template>
   <button role="button" @click="push()">
    {{props.name}}
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