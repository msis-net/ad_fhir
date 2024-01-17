<template>
  <div>
    <button role="button" @click="startWS()">
          start WebSocket
    </button>
  </div>
</template>

<script setup lang="ts" is:inline>

// WebSocket接続先のURL（wss:// を使用することでセキュアな接続）
const socketUrl = "wss://demo-weborca.cloud.orcamo.jp/ws";
const apiServer = "demo-weborca.cloud.orcamo.jp";
// ユーザーアカウント情報
const username = "ormaster";
const password = "03b53f8cbb9904ba537c24e84d07f21cebaa381053aadc5e1a13f6c6e157734d";

// ルート証明書、中間証明書、サーバー証明書のファイルパス
const rootCertificatePath = "./root.crt";
const certificatePath  = "./002739__JP_u00000218_client1349.crt";
const keyFilePath = "/002739__JP_u00000218_client1349.pem";

//WebScoketオブジェクト
let socket;

const startWS = () => {
  console.log('Starting...')
  //ルート証明書
  fetch(rootCertificatePath)
    .then(response => response.text())
    .then(rootCertificate  => {
      //TLS証明書
      fetch(certificatePath)
        .then(response => response.text())
        .then(certificate  => {
          //秘密鍵
          fetch(keyFilePath)
            .then(response => response.text())
            .then(keyFile  => {
              
              //console.log('[rootCertificate]\n'+rootCertificate)
              //console.log('[certificate]\n'+certificate)
              //console.log('[keyFile]\n'+keyFile)
              
              let options = {
                ca_cert : rootCertificate,     // ルート証明書
                cert : certificate,     // サーバー証明書を指定
                cert_key : keyFile,        // 秘密鍵を指定
                passphrase : 'OMZoDP7hN0', // 又は、pfxの指定
                api_user : username,
                api_key : password,
                api_server : apiServer,
                api_port : 443,
                use_ssl : true,
                use_weborca : true
              }
              
              socket = new WebSocket(socketUrl, JSON.stringify(options));


              // WebSocket接続時の処理
              socket.onopen = event => {
                console.log("WebSocket connection opened:", event);
              };

              
            })
        })
    })
    /*.then((response) => {
      
        if (!response.ok) {
            throw new Error();
        }else{
          console.log(response.text())
        }
        
    })*/
}
      
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>