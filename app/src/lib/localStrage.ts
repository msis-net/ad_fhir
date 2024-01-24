
export async function localSet( key: string , value:any ) {
  console.log(key,value)
  return localStorage;
}
export async function localClear( key: string , value:any ) {
  console.log(key,value)
  localStorage.clear();
  return localStorage;
}