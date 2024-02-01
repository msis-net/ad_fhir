/*sesionStrage*/
//登録（キー、値）
function sessionSet( key , value ) {
  sessionStorage.setItem( key , value )
  //console.log("setItem:",key)
  return sessionStorage;
}
//取得（対象キー）
function sessionGetItem( key ) {
  let result = sessionStorage.getItem( key);
  if( !result ){
    //console.log("getItem:",result, '!no data')
  }else{
    //console.log("getItem:",result, Object.keys(result).length)
  }
  return result;
}
//削除（対象キー）
function sessionRemove( key ) {
  sessionStorage.removeItem( key);
  //console.log("removeItem",key)
  return sessionStorage;
}
//全て削除
function sessionClear( key , value ) {
  sessionStorage.clear();
  //console.log("clear:",key)
  return sessionStorage;
}