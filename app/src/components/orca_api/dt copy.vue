<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-responsive';
import 'datatables.net-select';

DataTable.use(DataTablesCore);

const columns = [
  { data: 'name' },
  { data: 'position' },
  { data: 'office' },
  { data: 'extn' },
  { data: 'start_date' },
  { data: 'salary' },
];

const options = {
  dom: 'Bftip',
  responsive: true,
  select: true,
};
</script>

<template>
  <div>
    <h1>DataTables extensions</h1>
    <h2>DataTables + Vue3 example</h2>
    <p>
      This example demonstrates how DataTables' extensions can be used with
      Vue3. The key is to import and then register them with the
      <code>DataTable.use()</code> method. They can then be used as a regular
      DataTable extension. In this example I demonstrate Select and Buttons
      being loaded in.
    </p>

    <DataTable
      :columns="columns"
      :options="options"
      ajax="/tmp/data.json"
      class="display nowrap"
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
  </div>
</template>

<style>
@import 'datatables.net-dt';
@import 'datatables.net-buttons-dt';
@import 'datatables.net-responsive-dt';
@import 'datatables.net-select-dt';
</style>
