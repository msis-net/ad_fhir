<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
DataTable.use(DataTablesCore);

//パラメタを受け取る
const props = defineProps({
    date: String,
    name: String
})
/*
const Acceptlst_Information = [
  { data: 'Acceptance_Id' },
  { data: 'Acceptance_Time' },
  { data: 'Department_Code' },
  { data: 'Department_WholeName' },
  { data: 'Physician_Code' },
  { data: 'Physician_WholeName' },
  { data: 'Patient_ID' },
  { data: 'WholeName' },
  { data: 'WholeName_inKana' },
  { data: 'BirthDate' },
  { data: 'Sex' },
];
*/
console.log('props.date',props.date)

const datafile = "./utf_all.csv";
console.log(datafile)
</script>