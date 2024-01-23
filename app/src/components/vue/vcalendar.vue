<script>
import { ref } from 'vue'
import { setupCalendar,Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

const date = ref(new Date())
export default {
  components: {
    setupCalendar,
    Calendar,
    DatePicker,
  },
  data() {
    return {
      date: date,
    };
  },
}

</script>

<template>
    <!-- Calendar transparent borderless /-->
    <Calendar v-model="date"/>
</template>

<style>
.my-calendar .vc-weekday-1{/*class指定したカレンダのみ*/
  color: #ff0000;
} 
.vc-container .vc-weekday-7 {/*全カレンダ共通*/
  color: #0000ff;
}
</style>