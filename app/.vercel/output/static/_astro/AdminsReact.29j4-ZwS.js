import{j as t}from"./jsx-runtime.9YwcPWTT.js";import{r as c}from"./index.LFf77hJu.js";import{b as u}from"./admin.XDB4pbtT.js";import{d as a,i as d,c as m}from"./counter.aPE_trjJ.js";import"./index.rS7vpNfE.js";import"./index.f-_o0X6U.js";function x(e,n,r){let s=new Set([...n,void 0]);return e.listen((i,l)=>{s.has(l)&&r(i,l)})}function o(e,n={}){let r=c.useCallback(i=>n.keys?x(e,n.keys,i):e.listen(i),[n.keys,e]),s=e.get.bind(e);return c.useSyncExternalStore(r,s,s)}const y=()=>{const e=o(u),n=o(m);return t.jsxs(t.Fragment,{children:[t.jsx("h3",{children:"React"}),t.jsx("ul",{children:e.map(r=>t.jsx("li",{children:JSON.stringify(r,null,2)},r.id))}),t.jsxs("div",{children:["Counter:",n.value,t.jsx("button",{onClick:a,children:"-1"}),t.jsx("button",{onClick:d,children:"+1"})]}),t.jsx("br",{})]})};export{y as default};