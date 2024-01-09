<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';

DataTable.use(DataTablesCore);

const columns = [
  { data: 'name' },
  { data: 'position' },
  { data: 'office' },
  { data: 'extn' },
  { data: 'start_date' },
  { data: 'salary' },
];
</script>

<template>
  <div>
    <h1>Ajax data source table</h1>
    <h2>DataTables + Vue3 example</h2>
    <p>
      In this example the <code>datatables.net-vue3</code> package is used to
      load JSON data and display it in an interactive table. In this case we use
      object based row data, rather than arrays, so the
      <code>columns</code> option is specified to tell DataTables which property
      to read from the objects for each column.
    </p>

    <DataTable
      :columns="columns"
      ajax="data.json"
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
  </div>
</template>

<style>
@import 'datatables.net-dt';
</style>
