import{B as R,C as T,D as V,E as H,g as I,d as X,e as b,G as B,H as Y,f as z,o as q,c as F,t as M,I as J}from"./runtime-core.esm-bundler.0gmOEVEH.js";import{_ as K}from"./_plugin-vue_export-helper.x3n3nnut.js";function N(e){return I()?(X(e),!0):!1}function l(e){return typeof e=="function"?e():R(e)}const k=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const Q=Object.prototype.toString,U=e=>Q.call(e)==="[object Object]",Z=()=>{};function j(e,o={}){if(!T(e))return V(e);const r=Array.isArray(e.value)?Array.from({length:e.value.length}):{};for(const n in e.value)r[n]=H(()=>({get(){return e.value[n]},set(a){var i;if((i=l(o.replaceRef))!=null?i:!0)if(Array.isArray(e.value)){const c=[...e.value];c[n]=a,e.value=c}else{const c={...e.value,[n]:a};Object.setPrototypeOf(c,Object.getPrototypeOf(e.value)),e.value=c}else e.value[n]=a}}));return r}function ee(e){var o;const r=l(e);return(o=r?.$el)!=null?o:r}const P=k?window:void 0;function C(...e){let o,r,n,a;if(typeof e[0]=="string"||Array.isArray(e[0])?([r,n,a]=e,o=P):[o,r,n,a]=e,!o)return Z;Array.isArray(r)||(r=[r]),Array.isArray(n)||(n=[n]);const i=[],f=()=>{i.forEach(u=>u()),i.length=0},c=(u,d,p,g)=>(u.addEventListener(d,p,g),()=>u.removeEventListener(d,p,g)),S=Y(()=>[ee(o),l(a)],([u,d])=>{if(f(),!u)return;const p=U(d)?{...d}:d;i.push(...r.flatMap(g=>n.map(A=>c(u,g,A,p))))},{immediate:!0,flush:"post"}),_=()=>{S(),f()};return N(_),_}function te(e,o={}){var r,n;const{pointerTypes:a,preventDefault:i,stopPropagation:f,exact:c,onMove:S,onEnd:_,onStart:u,initialValue:d,axis:p="both",draggingElement:g=P,containerElement:A,handle:$=e}=o,v=b((r=l(d))!=null?r:{x:0,y:0}),y=b(),w=t=>a?a.includes(t.pointerType):!0,O=t=>{l(i)&&t.preventDefault(),l(f)&&t.stopPropagation()},W=t=>{var x;if(!w(t)||l(c)&&t.target!==l(e))return;const s=l(A),E=(x=s?.getBoundingClientRect)==null?void 0:x.call(s),m=l(e).getBoundingClientRect(),h={x:t.clientX-(s?m.left-E.left:m.left),y:t.clientY-(s?m.top-E.top:m.top)};u?.(h,t)!==!1&&(y.value=h,O(t))},G=t=>{var x;if(!w(t)||!y.value)return;const s=l(A),E=(x=s?.getBoundingClientRect)==null?void 0:x.call(s),m=l(e).getBoundingClientRect();let{x:h,y:D}=v.value;(p==="x"||p==="both")&&(h=t.clientX-y.value.x,s&&(h=Math.min(Math.max(0,h),E.width-m.width))),(p==="y"||p==="both")&&(D=t.clientY-y.value.y,s&&(D=Math.min(Math.max(0,D),E.height-m.height))),v.value={x:h,y:D},S?.(v.value,t),O(t)},L=t=>{w(t)&&y.value&&(y.value=void 0,_?.(v.value,t),O(t))};if(k){const t={capture:(n=o.capture)!=null?n:!0};C($,"pointerdown",W,t),C(g,"pointermove",G,t),C(g,"pointerup",L,t)}return{...j(v),position:v,isDragging:B(()=>!!y.value),style:B(()=>`left:${v.value.x}px;top:${v.value.y}px;`)}}const ne=z({__name:"draggable",setup(e,{expose:o}){o();const r=b(null),{x:n,y:a,style:i}=te(r,{initialValue:{x:660,y:100}}),f={el:r,x:n,y:a,style:i};return Object.defineProperty(f,"__isScriptSetup",{enumerable:!1,value:!0}),f}});function re(e,o,r,n,a,i){return q(),F("div",{ref:"el",style:J([n.style,{position:"fixed"}])}," Drag me! I am at "+M(n.x)+", "+M(n.y),5)}const le=K(ne,[["render",re]]);export{le as default};