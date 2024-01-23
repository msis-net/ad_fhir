<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin  from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data: function() {
    console.log("init")//起動時の処理
    return {
      calendarOptions: {
        
        plugins: [
          dayGridPlugin,
          listPlugin,
          timeGridPlugin,
          interactionPlugin
        ],
        initialView: 'dayGridMonth',
        weekends: true,
        locale: 'ja',
        dayCellContent: function(arg){
          return arg.date.getDate();
        },
        
        timeZone: "Asia/Tokyo",
        events: [
          { title: 'Meeting', start: new Date() },
          
        ],
        //slotDuration:'00:15:00',//時間間隔
        //snapDuration: '00:15:00',//クリック時の選択範囲
        headerToolbar: {
          start: 'prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,today'
        },
        buttonText: {
          today: '現在',
          month: '月',
          week:'週',
          day: '日',
          list: 'リスト',
        },
        allDayText:"終日",
        allDaySlot:true,
        navLinks: true,
        navLinkWeekClick:(weekStart, jsEvent)=> {
          console.log('week start', weekStart.toISOString());
          console.log('coords', jsEvent.pageX, jsEvent.pageY);
        },
        dateClick:(info) =>{
          console.log('events:'+info)
        },
        eventClick:(info) => {
          console.log('eventClick:'+info)
        },
        
      }
    }
  }
}
</script>

<template>
  <FullCalendar :options='calendarOptions' />
</template>