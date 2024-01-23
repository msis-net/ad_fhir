<template>
    <div>
      <nav>
        <button role="button" @click="xhrTEST()">
          xhrTEST
        </button>
        <button role="button" @click="fetchTEST()">
          fetch CSV
        </button>
        <button role="button" @click="CallPerformScript()">
          Call PerformScript
        </button>

        <button role="button" @click="getAcceptList()">
          getAcceptList
        </button>
      </nav>
    </div>
  </template>
  
  <script setup lang="ts" client:load>

const getAcceptList = () => {
      console.log('yyyymmdd:')
      let xhr = new XMLHttpRequest()
      xhr.open('GET', '/orca/acceptlstv2/2024/acceptlstv2_20240122.json', true)
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('xhr.status',xhr.responseText )
            
          } else {
            console.log('Error!')
          }
        } else {
          console.log('Connecting...')
        }
      }
        xhr.send(null)
  }
const CallPerformScript = () => {
  try{
        let result = {
          post : "sss1580083",
          address : "東京都世田谷区奥沢６丁目",
          addresskana : "トウキョウトセタガヤクオクザワ６チョウメ"
        }
        Dummy(result)
        eval('FileMaker.PerformScript ("AlertAddress", JSON.stringify(result))')
        
      }catch(e){
        console.log('Not Claris FileMaker Platform！')
      }
}

 function Dummy(val:any){
    console.log(val)
    return val
 }

  
  const xhrTEST = () => {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', 'utf_all.csv', true)
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            //console.log('xhr.status',xhr.responseText )
            let KEN_All:any = []
            KEN_All = SetData( xhr.responseText )
            console.log(KEN_All )
            alert(Object.keys(KEN_All).length)
          } else {
            console.log('Error!')
          }
        } else {
          console.log('Connecting...')
        }
      }
        xhr.send(null)
  }

  const fetchTEST = () => {
    const csvfile = "./utf_all.csv";
    fetch(csvfile) //読込
    .then(response => response.text())
    .then(csvdata  => {　//事後処理
      console.log('csvdata:'+csvdata)
      let KEN_All:any = []
      KEN_All = SetData( csvdata )
      //console.log(KEN_All )
      alert(Object.keys(KEN_All).length)
    });
  }

  function SetData( basedata:any ){
    let array =[]
    let data = basedata.split(/\r\n|\n/)
    console.log(basedata.length,data.length )
    for (let i in data){
      let line = data[i].replace(/\"/g, '')
      let tmp = line.split(',')
      let item = {
        id : i,
        localcd : tmp[0],
        post5 : tmp[1],
        post : tmp[2],
        prefkana : tmp[3],
        citykana : tmp[4],
        townkana : tmp[5],
        prefname : tmp[6],
        cityname : tmp[7],
        townname : tmp[8],
        flg1 : tmp[9],
        flg2 : tmp[10],
        flg3 : tmp[11],
        flg4 : tmp[12],
        flg5 : tmp[13],
        flg6 : tmp[14],
        kencd : tmp[0].substr(0,2),
      }
      array.push(item)
    }
    return array
  } 
  </script>