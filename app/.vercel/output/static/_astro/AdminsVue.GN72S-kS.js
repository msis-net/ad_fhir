import{a as c,b as d}from"./admin.XDB4pbtT.js";import{i as m,d as f,c as C}from"./counter.aPE_trjJ.js";import{_}from"./_plugin-vue_export-helper.x3n3nnut.js";import{u as a}from"./index.vYr-zy7v.js";import{o,c as s,a as n,F as p,r as k,b as l,t as u}from"./runtime-core.esm-bundler.0gmOEVEH.js";import"./index.rS7vpNfE.js";import"./index.f-_o0X6U.js";const b={setup(){const i=a(d),r=a(C);return{list:i,count:r,increaseCounter:m,decreaseCounter:f,addUser:c}}},g=n("h3",null,"Vue",-1),v=["onClick"],x=n("hr",null,null,-1);function A(i,r,V,e,h,y){return o(),s("div",null,[g,n("ul",null,[(o(!0),s(p,null,k(e.list,t=>(o(),s("li",{key:t.id},[l(u(JSON.stringify(t,null,2)),1),n("button",{onClick:B=>e.addUser({id:t.id+3,name:"Another Admin",age:46,isAdmin:!0})},"+",8,v)]))),128))]),n("div",null,[l(" Counter:"+u(e.count.value)+" ",1),n("button",{onClick:r[0]||(r[0]=(...t)=>e.decreaseCounter&&e.decreaseCounter(...t))},"-1"),n("button",{onClick:r[1]||(r[1]=(...t)=>e.increaseCounter&&e.increaseCounter(...t))},"+1")]),x])}const L=_(b,[["render",A]]);export{L as default};