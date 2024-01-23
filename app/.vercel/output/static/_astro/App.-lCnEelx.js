import{_ as _export_sfc}from"./_plugin-vue_export-helper.x3n3nnut.js";import{o as openBlock,c as createElementBlock,e as ref,a as createBaseVNode,t as toDisplayString,T as withDirectives,F as Fragment,U as inject,Q as createVNode,f as defineComponent,V as createBlock,W as resolveDynamicComponent,X as KeepAlive,G as computed,Y as provide}from"./runtime-core.esm-bundler.0gmOEVEH.js";import{v as vModelText}from"./runtime-dom.esm-bundler.z-iYaq4q.js";const _sfc_main$6={__name:"Input",props:{modelValue:String},setup(o,{expose:t}){t();const e={props:o};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}},_hoisted_1$5=["value"];function _sfc_render$6(o,t,n,e,s,a){return openBlock(),createElementBlock("input",{value:e.props.modelValue,onInput:t[0]||(t[0]=r=>o.$emit("update:modelValue",r.target.value))},null,40,_hoisted_1$5)}const Input=_export_sfc(_sfc_main$6,[["render",_sfc_render$6]]),_sfc_main$5={__name:"Hello",props:{name:String},emits:{changeNameEvent:o=>(console.log(o),!!o)},setup(o,{expose:t,emit:n}){t();const e=o,s=ref(e.name),a=n,l={props:e,name:s,emit:a,changeName:()=>{a("changeNameEvent",s.value)},ref};return Object.defineProperty(l,"__isScriptSetup",{enumerable:!1,value:!0}),l}},_hoisted_1$4=createBaseVNode("h2",null,"子コンポーネント",-1);function _sfc_render$5(o,t,n,e,s,a){return openBlock(),createElementBlock(Fragment,null,[_hoisted_1$4,createBaseVNode("p",null,"Hello "+toDisplayString(e.props.name),1),withDirectives(createBaseVNode("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=r=>e.name=r),onInput:e.changeName},null,544),[[vModelText,e.name]])],64)}const Hello=_export_sfc(_sfc_main$5,[["render",_sfc_render$5]]),_sfc_main$4={__name:"tokyo",setup(o,{expose:t}){t();const e={count:ref(0),ref};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}},_hoisted_1$3=createBaseVNode("h2",null,"東京",-1),_hoisted_2$2=createBaseVNode("p",null,"日本の首都です。",-1);function _sfc_render$4(o,t,n,e,s,a){return openBlock(),createElementBlock(Fragment,null,[_hoisted_1$3,_hoisted_2$2,createBaseVNode("p",null,toDisplayString(e.count),1),createBaseVNode("button",{onClick:t[0]||(t[0]=r=>e.count++)},"Add Count")],64)}const Tokyo=_export_sfc(_sfc_main$4,[["render",_sfc_render$4]]),_sfc_main$3={},_hoisted_1$2=createBaseVNode("h2",null,"京都",-1),_hoisted_2$1=createBaseVNode("p",null,"日本の古都です。",-1);function _sfc_render$3(o,t){return openBlock(),createElementBlock(Fragment,null,[_hoisted_1$2,_hoisted_2$1],64)}const Kyoto=_export_sfc(_sfc_main$3,[["render",_sfc_render$3]]),_sfc_main$2={__name:"compB",props:["message"],setup(o,{expose:t}){t();const e={message2:inject("message"),inject};return Object.defineProperty(e,"__isScriptSetup",{enumerable:!1,value:!0}),e}},_hoisted_1$1=createBaseVNode("h3",null,"CompBコンポーネント",-1);function _sfc_render$2(o,t,n,e,s,a){return openBlock(),createElementBlock(Fragment,null,[_hoisted_1$1,createBaseVNode("p",null,toDisplayString(n.message),1),createBaseVNode("p",null,toDisplayString(e.message2),1)],64)}const CompB=_export_sfc(_sfc_main$2,[["render",_sfc_render$2]]),_sfc_main$1={__name:"compA",props:["message"],setup(o,{expose:t}){t();const n={CompB};return Object.defineProperty(n,"__isScriptSetup",{enumerable:!1,value:!0}),n}};function _sfc_render$1(o,t,n,e,s,a){return openBlock(),createElementBlock(Fragment,null,[createBaseVNode("h3",null,"CompAコンポーネント: "+toDisplayString(n.message),1),createVNode(e.CompB,{message:n.message},null,8,["message"])],64)}const CompA=_export_sfc(_sfc_main$1,[["render",_sfc_render$1]]),_sfc_main=defineComponent({__name:"App",setup(__props,{expose:__expose}){__expose();const name=ref("John Doe"),address=ref(""),city=ref("tokyo"),tabs={tokyo:Tokyo,kyoto:Kyoto},tab=computed(()=>tabs[city.value]),message=ref("Provide/Injectでデータ渡し");provide("message",message);const CallPerformScript=()=>{try{let result={post:"sss1580083",address:"東京都世田谷区奥沢６丁目",addresskana:"トウキョウトセタガヤクオクザワ６チョウメ"};Dummy(result),eval('FileMaker.PerformScript ("AlertAddress", JSON.stringify(result))')}catch(o){console.log("Not Claris FileMaker Platform！")}};function Dummy(o){return console.log(o),o}const __returned__={name,address,city,tabs,tab,message,CallPerformScript,Dummy,Input,Hello,CompA};return Object.defineProperty(__returned__,"__isScriptSetup",{enumerable:!1,value:!0}),__returned__}}),_hoisted_1=createBaseVNode("h1",null,"Vue 3 入門",-1),_hoisted_2=createBaseVNode("div",null,[createBaseVNode("a",{href:"https://reffect.co.jp/vue/vue-js-components",target:"_blank",rel:"noopener noreferrer"}," 参考サイト ")],-1),_hoisted_3=createBaseVNode("hr",null,null,-1),_hoisted_4=createBaseVNode("ul",null,null,-1),_hoisted_5=createBaseVNode("hr",null,null,-1),_hoisted_6=createBaseVNode("hr",null,null,-1);function _sfc_render(o,t,n,e,s,a){return openBlock(),createElementBlock(Fragment,null,[_hoisted_1,_hoisted_2,createBaseVNode("button",{role:"button",onClick:t[0]||(t[0]=r=>e.CallPerformScript())}," Call PerformScript "),createBaseVNode("p",null,"name:"+toDisplayString(e.name),1),createBaseVNode("p",null,"address:"+toDisplayString(e.address),1),createVNode(e.Input,{modelValue:e.name,"onUpdate:modelValue":[t[1]||(t[1]=r=>e.name=r),t[2]||(t[2]=r=>e.name=r)],style:{padding:"1em","border-radius":"1em",margin:"0.5em"}},null,8,["modelValue"]),createVNode(e.Input,{modelValue:e.address,"onUpdate:modelValue":[t[3]||(t[3]=r=>e.address=r),t[4]||(t[4]=r=>e.address=r)],style:{padding:"1em","border-radius":"1em",margin:"0.5em"}},null,8,["modelValue"]),createVNode(e.Hello,{name:e.name},null,8,["name"]),_hoisted_3,_hoisted_4,_hoisted_5,createBaseVNode("div",null,[createBaseVNode("button",{onClick:t[5]||(t[5]=r=>e.city="tokyo")},"東京"),createBaseVNode("button",{onClick:t[6]||(t[6]=r=>e.city="kyoto")},"京都")]),(openBlock(),createBlock(KeepAlive,null,[(openBlock(),createBlock(resolveDynamicComponent(e.tab)))],1024)),_hoisted_6,createVNode(e.CompA,{message:"propsでデータ渡し"})],64)}const App=_export_sfc(_sfc_main,[["render",_sfc_render]]);export{App as default};