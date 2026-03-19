import{C as hn,V as P,M as Ye,T as Ve,Q as Io,S as Do,a as k,R as mn,P as fn,b as Pt,c as se,O as ma,B as De,F as Ot,d as oe,U as it,W as _t,H as wt,N as pn,e as gn,f as O,A as $,g as Ke,I as fa,h as to,i as qe,j as pa,k as uo,l as ga,m as St,n as xt,o as st,L as vn,p as va,G as ho,q as Ee,r as Et,s as mo,t as fo,u as ya,v as Fe,w as yn,x as bn,y as oo,D as ba,z as _n,E as Ne,J as po,K as wn,X as go,Y as Ro,Z as Po,_ as _a,$ as dt,a0 as Sn,a1 as xn,a2 as En,a3 as wa,a4 as Mn,a5 as Cn,a6 as An,a7 as rt,a8 as Tn,a9 as vo,aa as Qe,ab as Ln,ac as Sa,ad as In}from"./three-C_ueH2ui.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();const xa=new WeakMap;function Dn(t,{onSubmit:e,tabComplete:o}={}){const a=new AbortController,{signal:n}=a,i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s={abortController:a,history:[],historyIndex:-1,partialInput:"",reducedMotion:i};xa.set(t,s);const l=t.querySelector(".s9-terminal__input");l&&l.addEventListener("keydown",c=>{Pn(t,c,{onSubmit:e,tabComplete:o})},{signal:n})}function D(t,e,o){const a=t.querySelector(".s9-terminal__output");if(!a)return;const n=document.createElement("span");n.className=`s9-terminal__line s9-terminal__line--${o}`,n.textContent=e,a.appendChild(n);const i=200,s=a.querySelectorAll(".s9-terminal__line");s.length>i&&s[0].remove(),On(a)}function Rn(t){const e=t.querySelector(".s9-terminal__output");e&&(e.querySelectorAll(".s9-terminal__line").forEach(o=>o.remove()),t.dispatchEvent(new CustomEvent("s9:terminal-clear",{bubbles:!0})))}function Pn(t,e,{onSubmit:o,tabComplete:a}){const n=xa.get(t);if(!n)return;const i=t.querySelector(".s9-terminal__input");if(i)switch(e.key){case"Enter":{const s=i.value;if(!s)return;D(t,s,"cmd"),typeof o=="function"&&o(s),t.dispatchEvent(new CustomEvent("s9:terminal-submit",{bubbles:!0,detail:{command:s,timestamp:new Date().toISOString()}})),n.history.unshift(s),n.historyIndex=-1,n.partialInput="",i.value="";break}case"ArrowUp":{if(e.preventDefault(),n.history.length===0)return;n.historyIndex===-1&&(n.partialInput=i.value);const s=n.historyIndex+1;if(s<n.history.length){n.historyIndex=s,i.value=n.history[n.historyIndex];const l=i.value.length;i.setSelectionRange(l,l)}break}case"ArrowDown":{if(e.preventDefault(),n.historyIndex===-1)return;if(n.historyIndex>0){n.historyIndex-=1,i.value=n.history[n.historyIndex];const s=i.value.length;i.setSelectionRange(s,s)}else{n.historyIndex=-1,i.value=n.partialInput;const s=i.value.length;i.setSelectionRange(s,s)}break}case"Tab":{if(e.preventDefault(),typeof a=="function"){const s=a(i.value);s!=null&&(i.value=s)}break}default:{if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!n.reducedMotion&&Math.random()<.01){const s=t.querySelector(".s9-terminal__output");if(s){const c=Array.from(s.querySelectorAll(".s9-terminal__line")).slice(-8);if(c.length>0){const d=c[Math.floor(Math.random()*c.length)];d.classList.add("glitch-enter"),d.addEventListener("animationend",h=>{h.animationName==="glitch"&&d.classList.remove("glitch-enter")},{once:!0})}}}break}}}function On(t){t.scrollTop=t.scrollHeight}const Ea=new WeakMap;function Bn(t){const e=new AbortController,{signal:o}=e,a={ac:e,paused:!1,filter:null};Ea.set(t,a);const n=t.querySelector(".s9-stream__body");n&&(n.addEventListener("mouseenter",()=>{a.paused=!0,n.dataset.paused="true"},{signal:o}),n.addEventListener("mouseleave",()=>{a.paused=!1,n.dataset.paused="false",Ma(n)},{signal:o}),n.addEventListener("click",i=>{const s=i.target.closest(".s9-stream__row");if(!s)return;const l=s.classList.contains("s9-stream__row--pinned");s.classList.toggle("s9-stream__row--pinned",!l),t.dispatchEvent(new CustomEvent("s9:stream-row-pinned",{bubbles:!0,detail:{row:s,pinned:!l}}))},{signal:o}))}function yo(t,{timestamp:e,source:o,message:a,alert:n=!1}){const i=t.querySelector(".s9-stream__body");if(!i)return;const s=Ea.get(t),l=(s==null?void 0:s.filter)??null,c=document.createElement("div");c.className="s9-stream__row",n&&c.classList.add("s9-stream__row--alert"),l&&o!==l&&(c.hidden=!0),c.innerHTML=`<span class="s9-stream__timestamp">${zt(e)}</span><span class="s9-stream__source">${zt(o)}</span><span class="s9-stream__message">${zt(a)}</span>`,c.classList.add("glitch-enter"),c.addEventListener("animationend",()=>c.classList.remove("glitch-enter"),{once:!0}),i.appendChild(c),i.children.length>100&&i.removeChild(i.firstChild),s!=null&&s.paused||Ma(i)}function Ma(t){t.scrollTop=t.scrollHeight}function zt(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Fn(t,e){e(),t.classList.remove("glitch-enter"),t.offsetWidth,t.classList.add("glitch-enter"),t.addEventListener("animationend",()=>t.classList.remove("glitch-enter"),{once:!0})}const Wt=.37;function Oo(t){return t>.08&&t<.18?Math.sin((t-.08)/.1*Math.PI)*.18:t>.28&&t<.32?-((t-.28)/.04)*.38:t>.32&&t<.37?-.38+(t-.32)/.05*1.38:t>.37&&t<.43?1-(t-.37)/.06*1.28:t>.43&&t<.49?-.28+(t-.43)/.06*.28:t>.52&&t<.68?Math.sin((t-.52)/.16*Math.PI)*.3:0}function kn(t,e){if(!t)return console.warn("initEkg: canvas element not found"),{setBpm(){},destroy(){}};let o=62,a=0,n=0,i=0,s=0;function l(){e&&(e.classList.remove("beat"),e.offsetWidth,e.classList.add("beat"))}function c(){const u=t.getContext("2d"),m=t.width,f=t.height,g=f/2,y=f*.44,v=o/60/80;u.clearRect(0,0,m,f);const x=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";u.beginPath();for(let w=0;w<m;w++){const _=((a-(m-1-w)*v)%1+1)%1,b=g-Oo(_)*y;w===0?u.moveTo(w,b):u.lineTo(w,b)}u.strokeStyle=x,u.lineWidth=1,u.shadowColor=x,u.shadowBlur=5,u.stroke();const p=g-Oo(a)*y;u.beginPath(),u.arc(m-1,p,1.8,0,Math.PI*2),u.fillStyle=x,u.shadowBlur=10,u.fill()}function d(){const u=t.clientWidth;u&&t.width!==u&&(t.width=u)}d();const h=new ResizeObserver(d);h.observe(t);function r(u){s=requestAnimationFrame(r);const m=i?u-i:16;i=u,n=a,a=(a+o/60*(m/1e3))%1,(n<Wt&&a>=Wt||n>a&&a>=Wt)&&l(),c()}return s=requestAnimationFrame(r),{setBpm(u){o=u},destroy(){cancelAnimationFrame(s),h.disconnect()}}}let je=98.4;function Ca(t,e,o,a,n,i){je=Math.max(85,Math.min(100,je+(Math.random()-.45)*1.2));const s=je.toFixed(1),l=Math.round(58+(100-je)/15*12);return n.textContent=l,i.setBpm(l),Fn(t,()=>{e.textContent=s,o.textContent=`${s}%`,a.textContent=`${Math.round(je)}%`}),je}const Bo=new WeakMap;function ut(t,e){const o=Math.max(0,Math.min(100,e)),a=t.querySelector(".s9-telemetry__bar-fill");if(a){a.style.width=`${o}%`;const l=["s9-telemetry__bar-fill--ok","s9-telemetry__bar-fill--warning","s9-telemetry__bar-fill--critical"];a.classList.remove(...l),o<=60?a.classList.add("s9-telemetry__bar-fill--ok"):o<=85?a.classList.add("s9-telemetry__bar-fill--warning"):a.classList.add("s9-telemetry__bar-fill--critical")}const n=t.querySelector(".s9-telemetry__value");n&&(n.textContent=Math.round(o).toString());const i=Bo.get(t)??!1,s=o>85;s&&!i&&t.dispatchEvent(new CustomEvent("s9:telemetry-threshold",{bubbles:!0,detail:{value:o}})),Bo.set(t,s)}const Nn=8e3;function Un(t,{level:e="critical",code:o,message:a,persistent:n=!1}){const i=document.createElement("div");i.className=`s9-alert s9-alert--${e}`,n&&(i.dataset.persistent="true");const s=e==="critical"?"⬡":"⚠",l=new Date().toISOString().replace("T"," ").substring(0,19)+" UTC";return i.innerHTML=`<span class="s9-alert__icon" aria-hidden="true">${s}</span><div class="s9-alert__body"><span class="s9-alert__code">${$t(o)}</span><span class="s9-alert__message">${$t(a)}</span></div><span class="s9-alert__timestamp">${$t(l)}</span><button class="s9-alert__dismiss" aria-label="Dismiss alert">✕</button>`,i.classList.add("glitch-enter"),i.addEventListener("animationend",()=>i.classList.remove("glitch-enter"),{once:!0}),i.querySelector(".s9-alert__dismiss").addEventListener("click",()=>{Fo(i)}),t.appendChild(i),n||setTimeout(()=>{i.isConnected&&Fo(i)},Nn),i}function Fo(t){var o;if(!t.isConnected)return;const e=((o=t.querySelector(".s9-alert__code"))==null?void 0:o.textContent)??"";t.classList.add("s9-alert--dismissing"),t.addEventListener("transitionend",()=>{t.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:e}})),t.remove()},{once:!0}),setTimeout(()=>{t.isConnected&&(t.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:e}})),t.remove())},400)}function $t(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const re="http://www.w3.org/2000/svg",ze=new WeakMap;function Gn(t,{nodes:e=[],edges:o=[]}={}){const a=new AbortController,{signal:n}=a,i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s={abortController:a,nodeMap:new Map,edgeMap:new Map,activeNodeId:null,reducedMotion:i};ze.set(t,s);const l=document.createElementNS(re,"svg");l.setAttribute("class","s9-matrix__canvas"),l.setAttribute("viewBox","0 0 100 100"),l.setAttribute("preserveAspectRatio","xMidYMid meet"),l.setAttribute("role","img"),l.setAttribute("aria-label","Network topology matrix");const c=document.createElementNS(re,"defs"),d=document.createElementNS(re,"g");d.setAttribute("class","s9-matrix__edges");const h=document.createElementNS(re,"g");h.setAttribute("class","s9-matrix__nodes"),l.appendChild(c),l.appendChild(d),l.appendChild(h),t.appendChild(l),e.forEach(r=>zn(t,r)),o.forEach(r=>Wn(t,r)),o.forEach(r=>{r.active&&Aa(t,r.id)}),l.addEventListener("click",r=>{const u=r.target.closest("[data-node-id]");u?Mt(t,u.dataset.nodeId):s.activeNodeId!==null&&Mt(t,null)},{signal:n}),l.addEventListener("keydown",r=>{if(r.key==="Enter"||r.key===" "){const u=r.target.closest("[data-node-id]");u&&(r.preventDefault(),Mt(t,u.dataset.nodeId))}},{signal:n})}function Hn(t,e){const o=ze.get(t);if(!o)return;const a=o.nodeMap.get(e);if(!a||a.classList.contains("s9-matrix__node--active"))return;a.classList.add("s9-matrix__node--pulsing");const n=a.querySelector(".s9-matrix__node-ring");n&&n.addEventListener("animationend",i=>{i.animationName==="matrix-ring-pulse"&&a.classList.remove("s9-matrix__node--pulsing")},{once:!0})}function Aa(t,e,o=null){const a=ze.get(t);if(!a)return;if(e===null){for(const[g]of a.edgeMap)Ta(t,g);return}const n=a.edgeMap.get(e);if(!n||n.active)return;const i=t.querySelector(".s9-matrix__canvas");if(!i)return;const s=i.querySelector(".s9-matrix__edges");if(!s)return;const{line:l,x1:c,y1:d,x2:h,y2:r}=n;l&&l.parentNode&&l.parentNode.removeChild(l);const u=`s9-edge-${e}`,m=document.createElementNS(re,"path");m.setAttribute("class","s9-matrix__edge s9-matrix__edge--active"),m.setAttribute("id",u),m.setAttribute("data-edge-id",e),m.setAttribute("d",`M ${c} ${d} L ${h} ${r}`),s.appendChild(m);let f=null;if(!a.reducedMotion){f=document.createElementNS(re,"circle"),f.setAttribute("class","s9-matrix__edge-dot"),f.setAttribute("r","1.2"),o&&(f.style.fill=o,f.style.filter=`drop-shadow(0 0 2px ${o})`);const g=document.createElementNS(re,"animateMotion");g.setAttribute("dur","2s"),g.setAttribute("repeatCount","indefinite");const y=document.createElementNS(re,"mpath");y.setAttributeNS("http://www.w3.org/1999/xlink","href",`#${u}`),g.appendChild(y),f.appendChild(g),s.appendChild(f)}n.line=m,n.dot=f,n.active=!0}function Ta(t,e){const o=ze.get(t);if(!o)return;const a=o.edgeMap.get(e);if(!a||!a.active)return;const n=t.querySelector(".s9-matrix__canvas");if(!n)return;const i=n.querySelector(".s9-matrix__edges");if(!i)return;const{line:s,dot:l,x1:c,y1:d,x2:h,y2:r}=a;l&&l.parentNode&&l.parentNode.removeChild(l),s&&s.parentNode&&s.parentNode.removeChild(s);const u=document.createElementNS(re,"line");u.setAttribute("class","s9-matrix__edge"),u.setAttribute("data-edge-id",e),u.setAttribute("x1",c),u.setAttribute("y1",d),u.setAttribute("x2",h),u.setAttribute("y2",r),i.appendChild(u),a.line=u,a.dot=null,a.active=!1}function Mt(t,e){const o=ze.get(t);if(!o)return;if(o.activeNodeId!==null){const n=o.nodeMap.get(o.activeNodeId);n&&(n.classList.remove("s9-matrix__node--active"),n.setAttribute("aria-pressed","false")),t.dispatchEvent(new CustomEvent("s9:matrix-node-deselect",{bubbles:!0,detail:{nodeId:o.activeNodeId}})),o.activeNodeId=null}if(e===null)return;const a=o.nodeMap.get(e);a&&(a.classList.add("s9-matrix__node--active"),a.setAttribute("aria-pressed","true"),o.activeNodeId=e,t.dispatchEvent(new CustomEvent("s9:matrix-node-click",{bubbles:!0,detail:{nodeId:e,label:a.getAttribute("aria-label")??e}})))}function zn(t,{id:e,x:o,y:a,label:n,root:i=!1}){const s=ze.get(t);if(!s)return;const l=t.querySelector(".s9-matrix__canvas");if(!l)return;const c=l.querySelector(".s9-matrix__nodes");if(!c)return;const d=document.createElementNS(re,"g");d.setAttribute("class",`s9-matrix__node${i?" s9-matrix__node--root":""}`),d.setAttribute("data-node-id",e),d.setAttribute("tabindex","0"),d.setAttribute("role","button"),d.setAttribute("aria-label",n),d.setAttribute("aria-pressed","false");const h=document.createElementNS(re,"circle");h.setAttribute("class","s9-matrix__node-ring"),h.setAttribute("cx",o),h.setAttribute("cy",a),h.setAttribute("r","4");const r=document.createElementNS(re,"circle");r.setAttribute("class","s9-matrix__node-core"),r.setAttribute("cx",o),r.setAttribute("cy",a),r.setAttribute("r","2.5");const u=document.createElementNS(re,"text");u.setAttribute("class","s9-matrix__node-label"),u.setAttribute("x",o),u.setAttribute("y",a+3.5),u.textContent=n,d.appendChild(h),d.appendChild(r),d.appendChild(u),c.appendChild(d),s.nodeMap.set(e,d)}function Wn(t,{id:e,from:o,to:a}){const n=ze.get(t);if(!n)return;const i=t.querySelector(".s9-matrix__canvas");if(!i)return;const s=i.querySelector(".s9-matrix__edges");if(!s)return;const l=n.nodeMap.get(o),c=n.nodeMap.get(a),d=l?parseFloat(l.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,h=l?parseFloat(l.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,r=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,u=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,m=document.createElementNS(re,"line");m.setAttribute("class","s9-matrix__edge"),m.setAttribute("data-edge-id",e),m.setAttribute("x1",d),m.setAttribute("y1",h),m.setAttribute("x2",r),m.setAttribute("y2",u),s.appendChild(m),n.edgeMap.set(e,{line:m,dot:null,active:!1,from:o,to:a,x1:d,y1:h,x2:r,y2:u})}const ko={type:"change"},bo={type:"start"},La={type:"end"},ht=new mn,No=new fn,$n=Math.cos(70*Pt.DEG2RAD),V=new P,ne=2*Math.PI,N={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},jt=1e-6;class jn extends hn{constructor(e,o=null){super(e,o),this.state=N.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ye.ROTATE,MIDDLE:Ye.DOLLY,RIGHT:Ye.PAN},this.touches={ONE:Ve.ROTATE,TWO:Ve.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new Io,this._lastTargetPosition=new P,this._quat=new Io().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Do,this._sphericalDelta=new Do,this._scale=1,this._panOffset=new P,this._rotateStart=new k,this._rotateEnd=new k,this._rotateDelta=new k,this._panStart=new k,this._panEnd=new k,this._panDelta=new k,this._dollyStart=new k,this._dollyEnd=new k,this._dollyDelta=new k,this._dollyDirection=new P,this._mouse=new k,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=qn.bind(this),this._onPointerDown=Vn.bind(this),this._onPointerUp=Yn.bind(this),this._onContextMenu=ti.bind(this),this._onMouseWheel=Zn.bind(this),this._onKeyDown=Qn.bind(this),this._onTouchStart=Jn.bind(this),this._onTouchMove=ei.bind(this),this._onMouseDown=Kn.bind(this),this._onMouseMove=Xn.bind(this),this._interceptControlDown=oi.bind(this),this._interceptControlUp=ai.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ko),this.update(),this.state=N.NONE}pan(e,o){this._pan(e,o),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const o=this.object.position;V.copy(o).sub(this.target),V.applyQuaternion(this._quat),this._spherical.setFromVector3(V),this.autoRotate&&this.state===N.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let a=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(a)&&isFinite(n)&&(a<-Math.PI?a+=ne:a>Math.PI&&(a-=ne),n<-Math.PI?n+=ne:n>Math.PI&&(n-=ne),a<=n?this._spherical.theta=Math.max(a,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(a+n)/2?Math.max(a,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const s=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=s!=this._spherical.radius}if(V.setFromSpherical(this._spherical),V.applyQuaternion(this._quatInverse),o.copy(this.target).add(V),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let s=null;if(this.object.isPerspectiveCamera){const l=V.length();s=this._clampDistance(l*this._scale);const c=l-s;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),i=!!c}else if(this.object.isOrthographicCamera){const l=new P(this._mouse.x,this._mouse.y,0);l.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=c!==this.object.zoom;const d=new P(this._mouse.x,this._mouse.y,0);d.unproject(this.object),this.object.position.sub(d).add(l),this.object.updateMatrixWorld(),s=V.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;s!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position):(ht.origin.copy(this.object.position),ht.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ht.direction))<$n?this.object.lookAt(this.target):(No.setFromNormalAndCoplanarPoint(this.object.up,this.target),ht.intersectPlane(No,this.target))))}else if(this.object.isOrthographicCamera){const s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),s!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>jt||8*(1-this._lastQuaternion.dot(this.object.quaternion))>jt||this._lastTargetPosition.distanceToSquared(this.target)>jt?(this.dispatchEvent(ko),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ne/60*this.autoRotateSpeed*e:ne/60/60*this.autoRotateSpeed}_getZoomScale(e){const o=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*o)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,o){V.setFromMatrixColumn(o,0),V.multiplyScalar(-e),this._panOffset.add(V)}_panUp(e,o){this.screenSpacePanning===!0?V.setFromMatrixColumn(o,1):(V.setFromMatrixColumn(o,0),V.crossVectors(this.object.up,V)),V.multiplyScalar(e),this._panOffset.add(V)}_pan(e,o){const a=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;V.copy(n).sub(this.target);let i=V.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/a.clientHeight,this.object.matrix),this._panUp(2*o*i/a.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/a.clientWidth,this.object.matrix),this._panUp(o*(this.object.top-this.object.bottom)/this.object.zoom/a.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,o){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const a=this.domElement.getBoundingClientRect(),n=e-a.left,i=o-a.top,s=a.width,l=a.height;this._mouse.x=n/s*2-1,this._mouse.y=-(i/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const o=this.domElement;this._rotateLeft(ne*this._rotateDelta.x/o.clientHeight),this._rotateUp(ne*this._rotateDelta.y/o.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let o=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ne*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),o=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ne*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),o=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ne*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),o=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ne*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),o=!0;break}o&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),a=.5*(e.pageX+o.x),n=.5*(e.pageY+o.y);this._rotateStart.set(a,n)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),a=.5*(e.pageX+o.x),n=.5*(e.pageY+o.y);this._panStart.set(a,n)}}_handleTouchStartDolly(e){const o=this._getSecondPointerPosition(e),a=e.pageX-o.x,n=e.pageY-o.y,i=Math.sqrt(a*a+n*n);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const a=this._getSecondPointerPosition(e),n=.5*(e.pageX+a.x),i=.5*(e.pageY+a.y);this._rotateEnd.set(n,i)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const o=this.domElement;this._rotateLeft(ne*this._rotateDelta.x/o.clientHeight),this._rotateUp(ne*this._rotateDelta.y/o.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),a=.5*(e.pageX+o.x),n=.5*(e.pageY+o.y);this._panEnd.set(a,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const o=this._getSecondPointerPosition(e),a=e.pageX-o.x,n=e.pageY-o.y,i=Math.sqrt(a*a+n*n);this._dollyEnd.set(0,i),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const s=(e.pageX+o.x)*.5,l=(e.pageY+o.y)*.5;this._updateZoomParameters(s,l)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let o=0;o<this._pointers.length;o++)if(this._pointers[o]==e.pointerId){this._pointers.splice(o,1);return}}_isTrackingPointer(e){for(let o=0;o<this._pointers.length;o++)if(this._pointers[o]==e.pointerId)return!0;return!1}_trackPointer(e){let o=this._pointerPositions[e.pointerId];o===void 0&&(o=new k,this._pointerPositions[e.pointerId]=o),o.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const o=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[o]}_customWheelEvent(e){const o=e.deltaMode,a={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(o){case 1:a.deltaY*=16;break;case 2:a.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(a.deltaY*=10),a}}function Vn(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function qn(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function Yn(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(La),this.state=N.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],o=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:o.x,pageY:o.y});break}}function Kn(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ye.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=N.DOLLY;break;case Ye.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=N.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=N.ROTATE}break;case Ye.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=N.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=N.PAN}break;default:this.state=N.NONE}this.state!==N.NONE&&this.dispatchEvent(bo)}function Xn(t){switch(this.state){case N.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case N.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case N.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function Zn(t){this.enabled===!1||this.enableZoom===!1||this.state!==N.NONE||(t.preventDefault(),this.dispatchEvent(bo),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(La))}function Qn(t){this.enabled!==!1&&this._handleKeyDown(t)}function Jn(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case Ve.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=N.TOUCH_ROTATE;break;case Ve.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=N.TOUCH_PAN;break;default:this.state=N.NONE}break;case 2:switch(this.touches.TWO){case Ve.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=N.TOUCH_DOLLY_PAN;break;case Ve.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=N.TOUCH_DOLLY_ROTATE;break;default:this.state=N.NONE}break;default:this.state=N.NONE}this.state!==N.NONE&&this.dispatchEvent(bo)}function ei(t){switch(this._trackPointer(t),this.state){case N.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case N.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case N.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case N.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=N.NONE}}function ti(t){this.enabled!==!1&&t.preventDefault()}function oi(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ai(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ct={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class lt{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ni=new ma(-1,1,1,-1,0,1);class ii extends De{constructor(){super(),this.setAttribute("position",new Ot([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ot([0,2,0,0,2,0],2))}}const si=new ii;class Ia{constructor(e){this._mesh=new se(si,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ni)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class _e extends lt{constructor(e,o="tDiffuse"){super(),this.textureID=o,this.uniforms=null,this.material=null,e instanceof oe?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=it.clone(e.uniforms),this.material=new oe({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ia(this.material)}render(e,o,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(o),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Uo extends lt{constructor(e,o){super(),this.scene=e,this.camera=o,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,o,a){const n=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let s,l;this.inverse?(s=0,l=1):(s=1,l=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),i.buffers.stencil.setFunc(n.ALWAYS,s,4294967295),i.buffers.stencil.setClear(l),i.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(o),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(n.EQUAL,1,4294967295),i.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),i.buffers.stencil.setLocked(!0)}}class ri extends lt{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class _o{constructor(e,o){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),o===void 0){const a=e.getSize(new k);this._width=a.width,this._height=a.height,o=new _t(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:wt}),o.texture.name="EffectComposer.rt1"}else this._width=o.width,this._height=o.height;this.renderTarget1=o,this.renderTarget2=o.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new _e(Ct),this.copyPass.material.blending=pn,this.timer=new gn}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,o){this.passes.splice(o,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const o=this.passes.indexOf(e);o!==-1&&this.passes.splice(o,1)}isLastEnabledPass(e){for(let o=e+1;o<this.passes.length;o++)if(this.passes[o].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const o=this.renderer.getRenderTarget();let a=!1;for(let n=0,i=this.passes.length;n<i;n++){const s=this.passes[n];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),s.needsSwap){if(a){const l=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}Uo!==void 0&&(s instanceof Uo?a=!0:s instanceof ri&&(a=!1))}}this.renderer.setRenderTarget(o)}reset(e){if(e===void 0){const o=this.renderer.getSize(new k);this._pixelRatio=this.renderer.getPixelRatio(),this._width=o.width,this._height=o.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,o){this._width=e,this._height=o;const a=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(a,n),this.renderTarget2.setSize(a,n);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(a,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class wo extends lt{constructor(e,o,a=null,n=null,i=null){super(),this.scene=e,this.camera=o,this.overrideMaterial=a,this.clearColor=n,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new O}render(e,o,a){const n=e.autoClear;e.autoClear=!1;let i,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=n}}const li={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new O(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Re extends lt{constructor(e,o=1,a,n){super(),this.strength=o,this.radius=a,this.threshold=n,this.resolution=e!==void 0?new k(e.x,e.y):new k(256,256),this.clearColor=new O(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new _t(i,s,{type:wt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const r=new _t(i,s,{type:wt});r.texture.name="UnrealBloomPass.h"+h,r.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(r);const u=new _t(i,s,{type:wt});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),i=Math.round(i/2),s=Math.round(s/2)}const l=li;this.highPassUniforms=it.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new oe({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];i=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new k(1/i,1/s),i=Math.round(i/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=o,this.compositeMaterial.uniforms.bloomRadius.value=.1;const d=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=d,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=it.clone(Ct.uniforms),this.blendMaterial=new oe({uniforms:this.copyUniforms,vertexShader:Ct.vertexShader,fragmentShader:Ct.fragmentShader,premultipliedAlpha:!0,blending:$,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new O,this._oldClearAlpha=1,this._basic=new Ke,this._fsQuad=new Ia(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,o){let a=Math.round(e/2),n=Math.round(o/2);this.renderTargetBright.setSize(a,n);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(a,n),this.renderTargetsVertical[i].setSize(a,n),this.separableBlurMaterials[i].uniforms.invSize.value=new k(1/a,1/n),a=Math.round(a/2),n=Math.round(n/2)}render(e,o,a,n,i){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=a.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let l=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=l.texture,this.separableBlurMaterials[c].uniforms.direction.value=Re.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Re.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),l=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=s}_getSeparableBlurMaterial(e){const o=[],a=e/3;for(let n=0;n<e;n++)o.push(.39894*Math.exp(-.5*n*n/(a*a))/a);return new oe({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new k(.5,.5)},direction:{value:new k(.5,.5)},gaussianCoefficients:{value:o}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new oe({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}Re.BlurDirectionX=new k(1,0);Re.BlurDirectionY=new k(0,1);const Go=new uo,mt=new P;class ct extends fa{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],o=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],a=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(a),this.setAttribute("position",new Ot(e,3)),this.setAttribute("uv",new Ot(o,2))}applyMatrix4(e){const o=this.attributes.instanceStart,a=this.attributes.instanceEnd;return o!==void 0&&(o.applyMatrix4(e),a.applyMatrix4(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const a=new to(o,6,1);return this.setAttribute("instanceStart",new qe(a,3,0)),this.setAttribute("instanceEnd",new qe(a,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const a=new to(o,6,1);return this.setAttribute("instanceColorStart",new qe(a,3,0)),this.setAttribute("instanceColorEnd",new qe(a,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new pa(e.geometry)),this}fromLineSegments(e){const o=e.geometry;return this.setPositions(o.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new uo);const e=this.attributes.instanceStart,o=this.attributes.instanceEnd;e!==void 0&&o!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Go.setFromBufferAttribute(o),this.boundingBox.union(Go))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ga),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,o=this.attributes.instanceEnd;if(e!==void 0&&o!==void 0){const a=this.boundingSphere.center;this.boundingBox.getCenter(a);let n=0;for(let i=0,s=e.count;i<s;i++)mt.fromBufferAttribute(e,i),n=Math.max(n,a.distanceToSquared(mt)),mt.fromBufferAttribute(o,i),n=Math.max(n,a.distanceToSquared(mt));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}xt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new k(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};St.line={uniforms:it.merge([xt.common,xt.fog,xt.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class pe extends oe{constructor(e){super({type:"LineMaterial",uniforms:it.clone(St.line.uniforms),vertexShader:St.line.vertexShader,fragmentShader:St.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Vt=new st,Ho=new P,zo=new P,q=new st,Y=new st,ve=new st,qt=new P,Yt=new va,X=new vn,Wo=new P,ft=new uo,pt=new ga,ye=new st;let xe,Ue;function $o(t,e,o){return ye.set(0,0,-e,1).applyMatrix4(t.projectionMatrix),ye.multiplyScalar(1/ye.w),ye.x=Ue/o.width,ye.y=Ue/o.height,ye.applyMatrix4(t.projectionMatrixInverse),ye.multiplyScalar(1/ye.w),Math.abs(Math.max(ye.x,ye.y))}function ci(t,e){const o=t.matrixWorld,a=t.geometry,n=a.attributes.instanceStart,i=a.attributes.instanceEnd,s=Math.min(a.instanceCount,n.count);for(let l=0,c=s;l<c;l++){X.start.fromBufferAttribute(n,l),X.end.fromBufferAttribute(i,l),X.applyMatrix4(o);const d=new P,h=new P;xe.distanceSqToSegment(X.start,X.end,h,d),h.distanceTo(d)<Ue*.5&&e.push({point:h,pointOnLine:d,distance:xe.origin.distanceTo(h),object:t,face:null,faceIndex:l,uv:null,uv1:null})}}function di(t,e,o){const a=e.projectionMatrix,i=t.material.resolution,s=t.matrixWorld,l=t.geometry,c=l.attributes.instanceStart,d=l.attributes.instanceEnd,h=Math.min(l.instanceCount,c.count),r=-e.near;xe.at(1,ve),ve.w=1,ve.applyMatrix4(e.matrixWorldInverse),ve.applyMatrix4(a),ve.multiplyScalar(1/ve.w),ve.x*=i.x/2,ve.y*=i.y/2,ve.z=0,qt.copy(ve),Yt.multiplyMatrices(e.matrixWorldInverse,s);for(let u=0,m=h;u<m;u++){if(q.fromBufferAttribute(c,u),Y.fromBufferAttribute(d,u),q.w=1,Y.w=1,q.applyMatrix4(Yt),Y.applyMatrix4(Yt),q.z>r&&Y.z>r)continue;if(q.z>r){const p=q.z-Y.z,w=(q.z-r)/p;q.lerp(Y,w)}else if(Y.z>r){const p=Y.z-q.z,w=(Y.z-r)/p;Y.lerp(q,w)}q.applyMatrix4(a),Y.applyMatrix4(a),q.multiplyScalar(1/q.w),Y.multiplyScalar(1/Y.w),q.x*=i.x/2,q.y*=i.y/2,Y.x*=i.x/2,Y.y*=i.y/2,X.start.copy(q),X.start.z=0,X.end.copy(Y),X.end.z=0;const g=X.closestPointToPointParameter(qt,!0);X.at(g,Wo);const y=Pt.lerp(q.z,Y.z,g),v=y>=-1&&y<=1,x=qt.distanceTo(Wo)<Ue*.5;if(v&&x){X.start.fromBufferAttribute(c,u),X.end.fromBufferAttribute(d,u),X.start.applyMatrix4(s),X.end.applyMatrix4(s);const p=new P,w=new P;xe.distanceSqToSegment(X.start,X.end,w,p),o.push({point:w,pointOnLine:p,distance:xe.origin.distanceTo(w),object:t,face:null,faceIndex:u,uv:null,uv1:null})}}}class J extends se{constructor(e=new ct,o=new pe({color:Math.random()*16777215})){super(e,o),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,o=e.attributes.instanceStart,a=e.attributes.instanceEnd,n=new Float32Array(2*o.count);for(let s=0,l=0,c=o.count;s<c;s++,l+=2)Ho.fromBufferAttribute(o,s),zo.fromBufferAttribute(a,s),n[l]=l===0?0:n[l-1],n[l+1]=n[l]+Ho.distanceTo(zo);const i=new to(n,2,1);return e.setAttribute("instanceDistanceStart",new qe(i,1,0)),e.setAttribute("instanceDistanceEnd",new qe(i,1,1)),this}raycast(e,o){const a=this.material.worldUnits,n=e.camera;n===null&&!a&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const i=e.params.Line2!==void 0&&e.params.Line2.threshold||0;xe=e.ray;const s=this.matrixWorld,l=this.geometry,c=this.material;Ue=c.linewidth+i,l.boundingSphere===null&&l.computeBoundingSphere(),pt.copy(l.boundingSphere).applyMatrix4(s);let d;if(a)d=Ue*.5;else{const r=Math.max(n.near,pt.distanceToPoint(xe.origin));d=$o(n,r,c.resolution)}if(pt.radius+=d,xe.intersectsSphere(pt)===!1)return;l.boundingBox===null&&l.computeBoundingBox(),ft.copy(l.boundingBox).applyMatrix4(s);let h;if(a)h=Ue*.5;else{const r=Math.max(n.near,ft.distanceToPoint(xe.origin));h=$o(n,r,c.resolution)}ft.expandByScalar(h),xe.intersectsBox(ft)!==!1&&(a?ci(this,o):di(this,n,o))}onBeforeRender(e){const o=this.material.uniforms;o&&o.resolution&&(e.getViewport(Vt),this.material.uniforms.resolution.value.set(Vt.z,Vt.w))}}const ui=40,hi=70,ke=1,G=new WeakMap;let Da=null;function mi(){return Da}function Ra(t){Da=t}function ao(t,e,o=1.03){const a=(90-t)*(Math.PI/180),n=(e+180)*(Math.PI/180);return new P(-o*Math.sin(a)*Math.cos(n),o*Math.cos(a),o*Math.sin(a)*Math.sin(n))}let gt=null,jo=0;function We(t=!1){const e=Date.now();if(!t&&gt&&e-jo<500)return gt;const o=getComputedStyle(document.documentElement);return gt={neonCyan:o.getPropertyValue("--neon-cyan").trim(),neonGreen:o.getPropertyValue("--neon-green").trim(),neonWarn:o.getPropertyValue("--neon-warn").trim(),neonAlert:o.getPropertyValue("--neon-alert").trim(),neonSelect:o.getPropertyValue("--neon-select").trim()||"#00ffff"},jo=e,gt}function Ge(t,e){return t<=ui?e.neonGreen:t<=hi?e.neonWarn:e.neonAlert}function at(t,e,o,a){return[(e+180)/360*o,(90-t)/180*a]}const fi={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.5},scanlineOpacity:{value:.035},aberrationAmt:{value:.0022}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float     time;
    uniform float     vignetteStrength;
    uniform float     scanlineOpacity;
    uniform float     aberrationAmt;
    varying vec2      vUv;

    void main() {
      // Edge-weighted chromatic aberration — stronger at corners, zero at center
      vec2  ctr    = vUv - 0.5;
      float edgeSq = dot(ctr, ctr) * 4.0;   // 0 at center → 1 at corners
      float s      = aberrationAmt * edgeSq;

      vec2 uvR = clamp(vUv + ctr * s,       0.001, 0.999);
      vec2 uvB = clamp(vUv - ctr * s,       0.001, 0.999);

      float r = texture2D(tDiffuse, uvR).r;
      float g = texture2D(tDiffuse, vUv ).g;
      float b = texture2D(tDiffuse, uvB ).b;

      vec3 col = vec3(r, g, b);

      // Scanlines — thin horizontal bands, very low opacity
      float scan = sin(vUv.y * 640.0) * 0.5 + 0.5;
      col *= 1.0 - scanlineOpacity * (1.0 - scan);

      // Radial vignette
      float vig = 1.0 - edgeSq * vignetteStrength;
      col *= vig;

      // Preserve original alpha — critical for alpha:true renderer transparent canvas
      gl_FragColor = vec4(col, texture2D(tDiffuse, vUv).a);
    }
  `};function pi(t){return t}function gi(t){if(t==null)return pi;var e,o,a=t.scale[0],n=t.scale[1],i=t.translate[0],s=t.translate[1];return function(l,c){c||(e=o=0);var d=2,h=l.length,r=new Array(h);for(r[0]=(e+=l[0])*a+i,r[1]=(o+=l[1])*n+s;d<h;)r[d]=l[d],++d;return r}}function vi(t,e){for(var o,a=t.length,n=a-e;n<--a;)o=t[n],t[n++]=t[a],t[a]=o}function yi(t,e){return typeof e=="string"&&(e=t.objects[e]),e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(o){return Vo(t,o)})}:Vo(t,e)}function Vo(t,e){var o=e.id,a=e.bbox,n=e.properties==null?{}:e.properties,i=Pa(t,e);return o==null&&a==null?{type:"Feature",properties:n,geometry:i}:a==null?{type:"Feature",id:o,properties:n,geometry:i}:{type:"Feature",id:o,bbox:a,properties:n,geometry:i}}function Pa(t,e){var o=gi(t.transform),a=t.arcs;function n(h,r){r.length&&r.pop();for(var u=a[h<0?~h:h],m=0,f=u.length;m<f;++m)r.push(o(u[m],m));h<0&&vi(r,f)}function i(h){return o(h)}function s(h){for(var r=[],u=0,m=h.length;u<m;++u)n(h[u],r);return r.length<2&&r.push(r[0]),r}function l(h){for(var r=s(h);r.length<4;)r.push(r[0]);return r}function c(h){return h.map(l)}function d(h){var r=h.type,u;switch(r){case"GeometryCollection":return{type:r,geometries:h.geometries.map(d)};case"Point":u=i(h.coordinates);break;case"MultiPoint":u=h.coordinates.map(i);break;case"LineString":u=s(h.arcs);break;case"MultiLineString":u=h.arcs.map(s);break;case"Polygon":u=c(h.arcs);break;case"MultiPolygon":u=h.arcs.map(c);break;default:return null}return{type:r,coordinates:u}}return d(e)}function bi(t,e){var o={},a={},n={},i=[],s=-1;e.forEach(function(d,h){var r=t.arcs[d<0?~d:d],u;r.length<3&&!r[1][0]&&!r[1][1]&&(u=e[++s],e[s]=d,e[h]=u)}),e.forEach(function(d){var h=l(d),r=h[0],u=h[1],m,f;if(m=n[r])if(delete n[m.end],m.push(d),m.end=u,f=a[u]){delete a[f.start];var g=f===m?m:m.concat(f);a[g.start=m.start]=n[g.end=f.end]=g}else a[m.start]=n[m.end]=m;else if(m=a[u])if(delete a[m.start],m.unshift(d),m.start=r,f=n[r]){delete n[f.end];var y=f===m?m:f.concat(m);a[y.start=f.start]=n[y.end=m.end]=y}else a[m.start]=n[m.end]=m;else m=[d],a[m.start=r]=n[m.end=u]=m});function l(d){var h=t.arcs[d<0?~d:d],r=h[0],u;return t.transform?(u=[0,0],h.forEach(function(m){u[0]+=m[0],u[1]+=m[1]})):u=h[h.length-1],d<0?[u,r]:[r,u]}function c(d,h){for(var r in d){var u=d[r];delete h[u.start],delete u.start,delete u.end,u.forEach(function(m){o[m<0?~m:m]=1}),i.push(u)}}return c(n,a),c(a,n),e.forEach(function(d){o[d<0?~d:d]||i.push([d])}),i}function qo(t){return Pa(t,_i.apply(this,arguments))}function _i(t,e,o){var a,n,i;if(arguments.length>1)a=wi(t,e,o);else for(n=0,a=new Array(i=t.arcs.length);n<i;++n)a[n]=n;return{type:"MultiLineString",arcs:bi(t,a)}}function wi(t,e,o){var a=[],n=[],i;function s(r){var u=r<0?~r:r;(n[u]||(n[u]=[])).push({i:r,g:i})}function l(r){r.forEach(s)}function c(r){r.forEach(l)}function d(r){r.forEach(c)}function h(r){switch(i=r,r.type){case"GeometryCollection":r.geometries.forEach(h);break;case"LineString":l(r.arcs);break;case"MultiLineString":case"Polygon":c(r.arcs);break;case"MultiPolygon":d(r.arcs);break}}return h(e),n.forEach(o==null?function(r){a.push(r[0].i)}:function(r){o(r[0].g,r[r.length-1].g)&&a.push(r[0].i)}),a}function Je(t,e){const o=[];for(const n of t)for(let i=0;i<n.length-1;i++){const[s,l]=n[i],[c,d]=n[i+1],h=ao(l,s,e),r=ao(d,c,e);o.push(h.x,h.y,h.z,r.x,r.y,r.z)}const a=new ct;return a.setPositions(new Float32Array(o)),a}async function Si(t){const e=G.get(t);if(!e)return;let o;try{const w=await fetch("/data/countries-110m.json",{signal:e.abortController.signal});if(!w.ok)throw new Error(`HTTP ${w.status}`);o=await w.json(),Ra(o)}catch(w){if(w.name==="AbortError")return;console.warn("[s9-threatmap] geo lines: failed to load /data/countries-110m.json",w);return}const a=G.get(t);if(!a)return;const n=t.clientWidth||800,i=t.clientHeight||600,s=new ho,l=a.cyanColor,c=qo(o,o.objects.land),d=new pe({color:l,linewidth:1,transparent:!0,opacity:1,depthWrite:!0});d.resolution.set(n,i);const h=new pe({color:l,linewidth:1,transparent:!0,opacity:1,blending:$,depthWrite:!0});h.resolution.set(n,i);const r=new pe({color:l,linewidth:1.5,transparent:!0,opacity:.7,blending:$,depthWrite:!1});r.resolution.set(n,i);const u=new J(Je(c.coordinates,1.002),d),m=new J(Je(c.coordinates,1.006),h),f=new J(Je(c.coordinates,1.011),r);u.userData.geoType=m.userData.geoType=f.userData.geoType="coast",s.add(f,m,u);const g=qo(o,o.objects.countries,(w,_)=>w!==_),y=new pe({color:l,linewidth:1,transparent:!0,opacity:.55,depthWrite:!0});y.resolution.set(n,i);const v=new pe({color:l,linewidth:1,transparent:!0,opacity:.3,blending:$,depthWrite:!1});v.resolution.set(n,i);const x=new J(Je(g.coordinates,1.012),y),p=new J(Je(g.coordinates,1.022),v);x.userData.geoType=p.userData.geoType="border",s.add(p,x),a.scene.add(s),a.satelliteMode&&(s.visible=!1),a.geoGroup=s,a.geoLineMats=[d,h,r,y,v]}const K={NODE_FLASH_DUR:80,NODE_SETTLE_DUR:140,NODE_SCALE_PEAK:1.9,NODE_SCALE_DUR:220,NODE_SCALE_RISE:.35,CROSSHAIR_IN_DELAY:40,LABEL_CHAR_RATE:38,LABEL_CURSOR_BLINK:530,LABEL_START_DELAY:250,COORD_SCRAMBLE_DUR:320,COORD_SCRAMBLE_DELAY:80,DESELECT_LABEL_DUR:100,DESELECT_CROSSHAIR_DELAY:80,DESELECT_NODE_DELAY:120,DESELECT_NODE_DUR:180,NODE_DESELECT_SCALE_TROUGH:.65};function Yo(t){return 1-Math.pow(1-t,3)}function Ko(t){return t*t*t}function Xo(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}function xi(t){const e=G.get(t);if(!e)return;e.nodeTween&&e.nodeTween.mesh.scale.setScalar(1),e.deselectTween&&e.deselectTween.mesh.scale.setScalar(1),e.nodeTween=null,e.deselectTween=null,e.tweenGeneration++;for(const a of e.pendingTimers)clearTimeout(a);e.pendingTimers=[],e.labelTypewriter&&(e.labelTypewriter.cancel(),e.labelTypewriter=null),e.coordScrambleLat&&(e.coordScrambleLat.cancel(),e.coordScrambleLat=null),e.coordScrambleLng&&(e.coordScrambleLng.cancel(),e.coordScrambleLng=null);const o=t.querySelector(".s9-threatmap__crosshair");o&&(o.classList.remove("s9-threatmap__crosshair--animating-in","s9-threatmap__crosshair--animating-out"),o.offsetWidth)}function Ei(t,e,o,a,n){if(e.length===0)return t.textContent="",{cancel:()=>{}};let i=0,s=!0,l=null,c=null,d=!1;function h(){d=!0,clearTimeout(c),clearInterval(l)}function r(){t.textContent=e.slice(0,i)+(s?"_":" ")}r(),l=setInterval(()=>{d||(s=!s,r())},a);function u(){d||(i++,r(),i<e.length?c=setTimeout(u,o):c=setTimeout(()=>{d||(clearInterval(l),t.textContent=e)},a))}return c=setTimeout(u,o),{cancel:h}}function Zo(t,e,o,a,n,i){const s=Date.now(),l=Math.abs(o),c=Math.max(1,Math.floor(Math.log10(l||1))+1);let d=null,h=!1;function r(){h=!0,clearTimeout(d)}function u(){if(h)return;if(Date.now()-s>=n){t.textContent=`${e}${o.toFixed(a)}°`;return}const f=(Math.random()*Math.pow(10,c)).toFixed(a),g=o<0?"-":"";t.textContent=`${e}${g}${f}°`,d=setTimeout(u,40)}return u(),{cancel:r}}function He(t,e){const o=G.get(t);if(!o)return;xi(t);const a=We(),n=o.activeNodeId;if(n!==null){o.activeNodeId=null,t.removeAttribute("data-active-node"),t.dispatchEvent(new CustomEvent("s9:threatmap-node-deselect",{bubbles:!0,detail:{nodeId:n}}));const r=o.nodeMap.get(n);if(e===null){if(r){r.mesh.material.color.set(a.neonSelect||"#00ffff");const y=new O(a.neonSelect||"#00ffff"),v=new O(Ge(r.level,a)),x=t.querySelector(".s9-threatmap__crosshair-label");x&&x.classList.add("s9-threatmap__crosshair-label--fading");const p=setTimeout(()=>{x&&(x.textContent="",x.classList.remove("s9-threatmap__crosshair-label--fading"))},K.DESELECT_LABEL_DUR);o.pendingTimers.push(p);const w=setTimeout(()=>{const b=t.querySelector(".s9-threatmap__crosshair");b&&(b.classList.remove("s9-threatmap__crosshair--animating-in","s9-threatmap__crosshair--visible"),b.offsetWidth,b.classList.add("s9-threatmap__crosshair--animating-out"))},K.DESELECT_CROSSHAIR_DELAY);o.pendingTimers.push(w);const _=setTimeout(()=>{o.deselectTween={generation:o.tweenGeneration,t0:Date.now(),dur:K.DESELECT_NODE_DUR,troughScale:K.NODE_DESELECT_SCALE_TROUGH,selectColor:y,levelColor:v,mesh:r.mesh,element:t}},K.DESELECT_NODE_DELAY);o.pendingTimers.push(_)}else{const y=t.querySelector(".s9-threatmap__crosshair");y&&y.classList.remove("s9-threatmap__crosshair--visible");const v=t.querySelector(".s9-threatmap__crosshair-label");v&&(v.textContent="")}const f=t.querySelector(".s9-threatmap__coords-lat"),g=t.querySelector(".s9-threatmap__coords-lng");f&&(f.textContent="LAT: --.-°"),g&&(g.textContent="LNG: --.-°");return}r&&(r.mesh.scale.setScalar(1),r.mesh.material.color.set(Ge(r.level,a)));const u=t.querySelector(".s9-threatmap__crosshair");u&&u.classList.remove("s9-threatmap__crosshair--visible");const m=t.querySelector(".s9-threatmap__crosshair-label");m&&(m.textContent="")}if(e===null)return;const i=o.nodeMap.get(e);if(!i)return;if(o.activeNodeId=e,t.setAttribute("data-active-node",e),t.dispatchEvent(new CustomEvent("s9:threatmap-node-select",{bubbles:!0,detail:{nodeId:e,label:i.label,lat:i.lat,lng:i.lng,level:i.level}})),o.reducedMotion){i.mesh.material.color.set(a.neonSelect||"#00ffff"),i.mesh.scale.setScalar(1);const r=t.querySelector(".s9-threatmap__crosshair");r&&r.classList.add("s9-threatmap__crosshair--visible");const u=t.querySelector(".s9-threatmap__crosshair-label");u&&(u.textContent=i.label);const m=t.querySelector(".s9-threatmap__coords-lat"),f=t.querySelector(".s9-threatmap__coords-lng");m&&(m.textContent=`LAT: ${i.lat.toFixed(2)}°`),f&&(f.textContent=`LNG: ${i.lng.toFixed(2)}°`);return}const s=new O("#ffffff"),l=new O(a.neonSelect||"#00ffff");i.mesh.material.color.copy(s),i.mesh.scale.setScalar(1),o.nodeTween={generation:o.tweenGeneration,t0:Date.now(),dur:K.NODE_SCALE_DUR,riseFrac:K.NODE_SCALE_RISE,peakScale:K.NODE_SCALE_PEAK,flashDur:K.NODE_FLASH_DUR,settleDur:K.NODE_SETTLE_DUR,flashColor:s,selectColor:l,mesh:i.mesh};const c=setTimeout(()=>{const r=t.querySelector(".s9-threatmap__crosshair");r&&r.classList.add("s9-threatmap__crosshair--visible","s9-threatmap__crosshair--animating-in")},K.CROSSHAIR_IN_DELAY);o.pendingTimers.push(c);const d=setTimeout(()=>{const r=t.querySelector(".s9-threatmap__coords-lat"),u=t.querySelector(".s9-threatmap__coords-lng");r&&(o.coordScrambleLat=Zo(r,"LAT: ",i.lat,2,K.COORD_SCRAMBLE_DUR)),u&&(o.coordScrambleLng=Zo(u,"LNG: ",i.lng,2,K.COORD_SCRAMBLE_DUR))},K.COORD_SCRAMBLE_DELAY);o.pendingTimers.push(d);const h=setTimeout(()=>{const r=t.querySelector(".s9-threatmap__crosshair-label");r&&(o.labelTypewriter=Ei(r,i.label,K.LABEL_CHAR_RATE,K.LABEL_CURSOR_BLINK))},K.LABEL_START_DELAY);o.pendingTimers.push(h)}function Bt(t,e){if(!G.get(t))return;const a=Math.max(0,Math.min(100,e));t.setAttribute("data-threat-level",a)}function So(t,e,o){const a=G.get(t);if(!a)return;const n=a.nodeMap.get(e);if(!n)return;const i=n.level;if(n.level=o,n.mesh.userData.level=o,a.activeNodeId!==e){const s=We();n.mesh.material.color.set(Ge(o,s))}return i}function Ft(t,e){const o=G.get(t);if(!o)return;const a=o.nodeMap.get(e);if(!a||Date.now()-o.lastOrbitInteraction<3e3)return;const n=o.camera.position.length();o.cameraLerpTarget=a.mesh.position.clone().normalize().multiplyScalar(n),o.controls.autoRotate=!1,o.resumeTimer!==null&&(clearTimeout(o.resumeTimer),o.resumeTimer=null)}const Mi=t=>t,Oa=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,Ba=t=>t>=1?1:1-Math.pow(2,-10*t),Ci=t=>{const o=2.5949095;return t<.5?Math.pow(2*t,2)*((o+1)*2*t-o)/2:(Math.pow(2*t-2,2)*((o+1)*(2*t-2)+o)+2)/2};function Pe({radius:t,numRings:e,samplesPerRing:o,latitudeMin:a,latitudeMax:n,upAxis:i,mode:s="latitude"}){const l=e*o,c=new Float32Array(l*6),d=new Float32Array(l),h=new Float32Array(l);let r=0,u=0;if(s==="longitude"){const f=Math.sin(a),g=Math.sin(n);for(let y=0;y<e;y++){const v=f+y/e*(g-f),x=Math.sqrt(Math.max(0,1-v*v));for(let p=0;p<o;p++){const w=p/o*2*Math.PI,_=(p+1)/o*2*Math.PI;c[r++]=t*v,c[r++]=t*x*Math.cos(w),c[r++]=t*x*Math.sin(w),c[r++]=t*v,c[r++]=t*x*Math.cos(_),c[r++]=t*x*Math.sin(_),d[u]=y,h[u]=p/o,u++}}}else{const f=Math.sin(a),g=Math.sin(n);for(let y=0;y<e;y++){const v=f+y/e*(g-f),x=Math.sqrt(Math.max(0,1-v*v));for(let p=0;p<o;p++){const w=p/o*2*Math.PI,_=(p+1)/o*2*Math.PI;c[r++]=t*x*Math.cos(w),c[r++]=t*v,c[r++]=t*x*Math.sin(w),c[r++]=t*x*Math.cos(_),c[r++]=t*v,c[r++]=t*x*Math.sin(_),d[u]=y,h[u]=p/o,u++}}}const m=new ct;return m.setPositions(c),m.setAttribute("ringIndex",new Ee(d,1)),m.setAttribute("arcPosition",new Ee(h,1)),i==="z"&&m.applyMatrix4(new va().makeRotationX(-Math.PI/2)),m}const Ai=`
uniform float uProgress;
uniform float uNumRings;
uniform float uStagger;
uniform float uRingFade;
uniform float uInvert;
uniform int   uDirection;
uniform float uWarpAmount;
uniform vec3  uColor;
uniform vec3  uColorB;
uniform float uColorSpread;
uniform float uBrightSpread;
uniform float uFlickerAmp;
uniform float uFlickerSpeed;
uniform float uTime;
uniform float uArcColorSpread;
uniform float uScrollSpeed;
uniform int   uScrollAxis;
uniform int   uGradientMode;
uniform float uJitter;
`,Ti=`
float _hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }

vec3 _hue2rgb(float h) {
  return clamp(abs(fract(h + vec3(1.0, 2.0/3.0, 1.0/3.0)) * 6.0 - 3.0) - 1.0, 0.0, 1.0);
}

vec3 _hsl2rgb(float h, float s, float l) {
  return l + s * (_hue2rgb(h) - 0.5) * (1.0 - abs(2.0 * l - 1.0));
}

vec3 _rgb2hsl(vec3 c) {
  float cmax = max(c.r, max(c.g, c.b));
  float cmin = min(c.r, min(c.g, c.b));
  float d    = cmax - cmin;
  float l    = (cmax + cmin) * 0.5;
  float s    = d < 1e-4 ? 0.0 : d / (1.0 - abs(2.0 * l - 1.0));
  float h;
  if (d < 1e-4) {
    h = 0.0;
  } else if (c.r >= cmax) {
    h = fract((c.g - c.b) / d / 6.0);
  } else if (c.g >= cmax) {
    h = fract(((c.b - c.r) / d + 2.0) / 6.0);
  } else {
    h = fract(((c.r - c.g) / d + 4.0) / 6.0);
  }
  return vec3(h, s, l);
}

/**
 * Interpolate two colours using the selected gradient mode.
 * Modes: 0=RGB linear, 1=HSL short arc, 2=HSL long arc, 3=HSL CW, 4=HSL CCW
 */
vec3 _gradientColor(vec3 ca, vec3 cb, float t, int mode) {
  if (mode == 0) {
    return mix(ca, cb, t);
  }
  vec3 ha = _rgb2hsl(ca);
  vec3 hb = _rgb2hsl(cb);
  float dh = hb.x - ha.x;
  if (mode == 1) {
    if (dh >  0.5) dh -= 1.0;
    if (dh < -0.5) dh += 1.0;
  } else if (mode == 2) {
    if (dh >= 0.0 && dh < 0.5) dh -= 1.0;
    if (dh <  0.0 && dh > -0.5) dh += 1.0;
  } else if (mode == 3) {
    if (dh < 0.0) dh += 1.0;
  } else {
    if (dh > 0.0) dh -= 1.0;
  }
  return _hsl2rgb(fract(ha.x + dh * t), mix(ha.y, hb.y, t), mix(ha.z, hb.z, t));
}
`,Li=`
  // ── reveal — onset uses stable per-ring index so scroll can't flip a ring
  //    back to hidden mid-reveal. Direction applied to normalised index order.
  float stableNorm = ringIndex / uNumRings;
  float normRing;
  if (uDirection == 0) {
    normRing = stableNorm;
  } else if (uDirection == 1) {
    normRing = 1.0 - stableNorm;
  } else {
    normRing = abs(stableNorm - 0.5) * 2.0;
  }
  float maxOnset     = (1.0 - uRingFade) * (1.0 - uStagger);
  float baseOnset    = normRing * maxOnset;
  float jitterOffset = (_hash(ringIndex + 53.7) - 0.5) * uJitter * ((1.0 - uRingFade) / uNumRings);
  float onset  = clamp(baseOnset + jitterOffset, 0.0, 1.0 - uRingFade);
  float localT  = clamp((uProgress - onset) / uRingFade, 0.0, 1.0);
  float fadeIn  = smoothstep(0.0, 1.0, localT);
  vAlpha = mix(fadeIn, 1.0 - fadeIn, uInvert);

  // ── warp ──────────────────────────────────────────────────────────────────
  float c1 = 1.70158;
  float c3 = c1 + 1.0;
  float easeOutBack = 1.0 + c3 * pow(localT - 1.0, 3.0) + c1 * pow(localT - 1.0, 2.0);
  float warpScale = 1.0 - uWarpAmount * (1.0 - easeOutBack);

  // ── per-ring colour variation — uses index for stable per-ring identity ────
  float rng1 = _hash(ringIndex);
  float rng2 = _hash(ringIndex + 71.3);
  float rng3 = _hash(ringIndex + 37.9);
  vec3 gradientBase = _gradientColor(uColor, uColorB, ringIndex / uNumRings, uGradientMode);
  vec3 hsl = _rgb2hsl(gradientBase);
  hsl.x = fract(hsl.x + (rng1 - 0.5) * uColorSpread);
  hsl.z = clamp(hsl.z + (rng2 - 0.5) * uBrightSpread, 0.02, 0.98);
  hsl.x = fract(hsl.x + arcPosition * uArcColorSpread);
  vRingColor = _hsl2rgb(hsl.x, hsl.y, hsl.z);

  // ── per-ring flicker ───────────────────────────────────────────────────────
  vFlickerMult = 1.0 + uFlickerAmp * sin(uTime * uFlickerSpeed + rng3 * 6.2832);
`;function Ii(t){return t==="north-to-south"?1:t==="equator-out"?2:0}function Di({lineColor:t,lineColorB:e,opacity:o,emissiveIntensity:a,numRings:n,stagger:i,ringFade:s,invert:l,warpAmount:c,direction:d,colorSpread:h,brightSpread:r,flickerAmp:u,flickerSpeed:m,arcColorSpread:f,scrollSpeed:g,scrollAxis:y,gradientMode:v,jitter:x}){return{uProgress:{value:0},uNumRings:{value:n},uStagger:{value:i},uRingFade:{value:s},uInvert:{value:l??0},uOpacity:{value:o},uEmissiveIntensity:{value:a},uColor:{value:new O(t)},uColorB:{value:new O(e??t)},uDirection:{value:Ii(d)},uWarpAmount:{value:c},uColorSpread:{value:h},uBrightSpread:{value:r},uFlickerAmp:{value:u},uFlickerSpeed:{value:m},uTime:{value:0},uArcColorSpread:{value:f??0},uScrollSpeed:{value:g??0},uScrollAxis:{value:y??0},uGradientMode:{value:v??0},uJitter:{value:x??0}}}function Ri(t){t.vertexShader.includes("vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 )")||console.warn("[RingReveal] LineMaterial vertex shader injection point changed — warp may be misaligned. Check Three.js version."),t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
attribute float ringIndex;
attribute float arcPosition;
varying float vAlpha;
varying vec3  vRingColor;
varying float vFlickerMult;
${Ai}
${Ti}`),t.vertexShader=t.vertexShader.replace("vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );",`float _scrollOff = uTime * uScrollSpeed;
    float _R = length(instanceStart);
    float _normPos;
    if (uScrollAxis == 1) {
      _normPos = mod(instanceStart.y / _R + _scrollOff + 1.0, 2.0) / 2.0;
    } else {
      _normPos = mod(instanceStart.x / _R + _scrollOff + 1.0, 2.0) / 2.0;
    }
    ${Li}
    vec3 _rStart, _rEnd;
    if (uScrollAxis == 1) {
      // Latitude: translate rings up/down — all verts on a ring share the same Y
      float _sy = instanceStart.y / _R;
      float _sc = sqrt(max(1e-6, 1.0 - _sy*_sy));
      float _ny = mod(_sy + _scrollOff + 1.0, 2.0) - 1.0;
      float _ys = sqrt(max(1e-6, 1.0 - _ny*_ny)) / _sc;
      _rStart = vec3(instanceStart.x * _ys, _ny * _R, instanceStart.z * _ys);
      _rEnd   = vec3(instanceEnd.x   * _ys, _ny * _R, instanceEnd.z   * _ys);
    } else {
      // Longitude: translate parallel vertical rings left/right — all verts share the same X
      float _sx = instanceStart.x / _R;
      float _sc = sqrt(max(1e-6, 1.0 - _sx*_sx));
      float _nx = mod(_sx + _scrollOff + 1.0, 2.0) - 1.0;
      float _xs = sqrt(max(1e-6, 1.0 - _nx*_nx)) / _sc;
      _rStart = vec3(_nx * _R, instanceStart.y * _xs, instanceStart.z * _xs);
      _rEnd   = vec3(_nx * _R, instanceEnd.y   * _xs, instanceEnd.z   * _xs);
    }
    vec4 start = modelViewMatrix * vec4( _rStart * warpScale, 1.0 );`),t.vertexShader=t.vertexShader.replace("vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );","vec4 end = modelViewMatrix * vec4( _rEnd * warpScale, 1.0 );"),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
varying float vAlpha;
varying vec3  vRingColor;
varying float vFlickerMult;
uniform float uOpacity;
uniform float uEmissiveIntensity;`),t.fragmentShader=t.fragmentShader.replace("gl_FragColor = vec4( diffuseColor.rgb, alpha );",`if (vAlpha < 0.001) discard;
  gl_FragColor = vec4(vRingColor * uEmissiveIntensity * max(vFlickerMult, 0.0), vAlpha * uOpacity);`)}function Oe(t){const{lineWidth:e,blending:o,resolution:a}=t,n=new pe({color:16777215,linewidth:e,transparent:!0,depthWrite:!1,blending:o,worldUnits:!1,resolution:a??new k(typeof window<"u"?window.innerWidth:1920,typeof window<"u"?window.innerHeight:1080)});return Object.assign(n.uniforms,Di(t)),n.onBeforeCompile=i=>{Object.assign(i.uniforms,n.uniforms),Ri(i)},n}const vt=new O,yt=new O;function et(t){return t==="latitude"?1:0}const Pi={radius:1,numRings:48,samplesPerRing:256,latitudeMin:-Math.PI/2,latitudeMax:Math.PI/2,durationMs:1800,easingFn:Oa,direction:"south-to-north",stagger:.4,ringFade:.35,lineColor:65484,lineColorB:65484,lineWidth:1,opacity:.7,glowColor:65484,glowColorB:65484,glowOpacity:.25,glowRadius:1.008,glowLayers:3,glowLayerRadiusStep:.004,glowLayerOpacityFalloff:.5,emissiveIntensity:1.5,warpAmount:.12,morphDurationMs:800,upAxis:"y",mode:"latitude",scrollSpeed:0,colorSpread:0,brightSpread:0,flickerAmp:0,flickerSpeed:2,arcColorSpread:0,gradientMode:0,jitter:0,invert:!1};class Oi{constructor(e,o={}){this._scene=e,this._options={...Pi,...o},this._options.ringFade=Math.max(.001,this._options.ringFade),this._options.numRings=Math.max(2,this._options.numRings),this._options.samplesPerRing=Math.max(3,this._options.samplesPerRing),this._options.stagger=Math.max(0,Math.min(1,this._options.stagger)),this._options.radius=Math.max(Number.EPSILON,this._options.radius),this._options.glowRadius=Math.max(Number.EPSILON,this._options.glowRadius),this._options.glowLayers=Math.max(1,Math.round(this._options.glowLayers)),this._playing=!1,this._reversed=!1,this._elapsed=0,this._progress=0,this._onComplete=null,this._morph=null,this._time=0,this._resolution=new k(typeof window<"u"?window.innerWidth:1920,typeof window<"u"?window.innerHeight:1080),this._build()}get isPlaying(){return this._playing}get progress(){return this._progress}get baseRings(){return this._baseRings}get glowRings(){return this._glowLayers[0]}get glowLayers(){return this._glowLayers}play(e){this._reversed=!1,this._playing=!0,this._onComplete=e??null}reverse(e){this._reversed=!0,this._playing=!0,this._onComplete=e??null;const o=1-this._progress;let a=0,n=1;for(let i=0;i<24;i++){const s=(a+n)*.5;this._options.easingFn(s)<o?a=s:n=s}this._elapsed=a*this._options.durationMs}stop(){this._playing=!1}reset(){this._playing=!1,this._reversed=!1,this._elapsed=0,this._progress=0,this._onComplete=null,this._disposeCrossFade(),this._morph=null,this._setProgress(0)}tick(e){var a;this._time+=e/1e3,this._baseRings.material.uniforms.uTime.value=this._time,this._glowLayers.forEach(n=>{n.material.uniforms.uTime.value=this._time});const o=(a=this._morph)==null?void 0:a.crossFade;if(o&&(o.oldBase.material.uniforms.uTime.value=this._time,o.oldGlowLayers.forEach(n=>{n.material.uniforms.uTime.value=this._time})),this._playing){this._elapsed+=e;const n=Math.min(this._elapsed/this._options.durationMs,1),i=this._options.easingFn(n);if(this._progress=this._reversed?1-i:i,this._setProgress(this._progress),this._reversed?this._progress<=0:this._progress>=1){this._playing=!1;const l=this._onComplete;this._onComplete=null,l==null||l()}}if(this._morph){this._morph.elapsed+=e;const n=Math.min(this._morph.elapsed/this._morph.durationMs,1);this._applyMorphT(n),n>=1&&(this._morph=null)}}setColors(e,o){this._baseRings.material.uniforms.uColor.value.set(e),this._glowLayers.forEach(a=>a.material.uniforms.uColor.value.set(o)),this._options.lineColor=e,this._options.glowColor=o}setOpacity(e,o){this._baseRings.material.uniforms.uOpacity.value=e,this._options.opacity=e,o!==void 0&&(this._glowLayers.forEach((a,n)=>{a.material.uniforms.uOpacity.value=o*Math.pow(this._options.glowLayerOpacityFalloff,n)}),this._options.glowOpacity=o)}setScrollSpeed(e){this._options.scrollSpeed=e,this._allMaterials().forEach(o=>{o.uniforms.uScrollSpeed.value=e})}setGradientMode(e){this._options.gradientMode=e,this._allMaterials().forEach(o=>{o.uniforms.uGradientMode.value=e})}setJitter(e){this._options.jitter=e,this._allMaterials().forEach(o=>{o.uniforms.uJitter.value=e})}setInvert(e){this._options.invert=e,this._allMaterials().forEach(o=>{o.uniforms.uInvert.value=e?1:0})}setMode(e){if(e===this._options.mode)return;this._options.mode=e;const o=et(e);this._allMaterials().forEach(a=>{a.uniforms.uScrollAxis.value=o}),this._rebuildGeometry()}setResolution(e,o){this._resolution.set(e,o),this._allMaterials().forEach(a=>{var n;return(n=a.resolution)==null?void 0:n.set(e,o)})}morphTo(e,o){var y;const a=o??this._options.morphDurationMs,n=this._options,i=this._baseRings.material,s=this._glowLayers[0].material;e.durationMs!==void 0&&(n.durationMs=e.durationMs),e.easingFn!==void 0&&(n.easingFn=e.easingFn),e.direction!==void 0&&(n.direction=e.direction),e.morphDurationMs!==void 0&&(n.morphDurationMs=e.morphDurationMs),e.upAxis!==void 0&&(n.upAxis=e.upAxis),e.latitudeMin!==void 0&&(n.latitudeMin=e.latitudeMin),e.latitudeMax!==void 0&&(n.latitudeMax=e.latitudeMax),e.scrollSpeed!==void 0&&this.setScrollSpeed(e.scrollSpeed),e.mode!==void 0&&e.mode!==n.mode&&(n.mode=e.mode),e.lineWidth!==void 0&&(n.lineWidth=e.lineWidth,this._allMaterials().forEach(v=>{v.linewidth=e.lineWidth})),e.glowLayerOpacityFalloff!==void 0&&e.glowLayerOpacityFalloff!==n.glowLayerOpacityFalloff&&(n.glowLayerOpacityFalloff=e.glowLayerOpacityFalloff,this._glowLayers.forEach((v,x)=>{v.material.uniforms.uOpacity.value=n.glowOpacity*Math.pow(n.glowLayerOpacityFalloff,x)}));const l=e.glowLayers!==void 0&&e.glowLayers!==n.glowLayers,c=e.glowLayerRadiusStep!==void 0&&e.glowLayerRadiusStep!==n.glowLayerRadiusStep;l&&(n.glowLayers=Math.max(1,Math.round(e.glowLayers))),c&&(n.glowLayerRadiusStep=e.glowLayerRadiusStep),(l||c)&&this._rebuildGlowLayers();const d=n.radius,h=e.radius??n.radius,r=e.numRings!==void 0&&e.numRings!==n.numRings,u=e.samplesPerRing!==void 0&&e.samplesPerRing!==n.samplesPerRing,m=e.mode!==void 0&&e.mode!==n.mode;let f=null;if(r||u||m){const v=this._baseRings,x=this._glowLayers.slice(),p=i.uniforms.uOpacity.value,w=x.map(E=>E.material.uniforms.uOpacity.value);r&&(n.numRings=e.numRings),u&&(n.samplesPerRing=e.samplesPerRing),m&&(n.mode=e.mode);const _={radius:n.radius,numRings:n.numRings,samplesPerRing:n.samplesPerRing,latitudeMin:n.latitudeMin,latitudeMax:n.latitudeMax,upAxis:n.upAxis,mode:n.mode},b={lineWidth:n.lineWidth,numRings:n.numRings,stagger:i.uniforms.uStagger.value,ringFade:i.uniforms.uRingFade.value,warpAmount:i.uniforms.uWarpAmount.value,emissiveIntensity:i.uniforms.uEmissiveIntensity.value,direction:n.direction,colorSpread:i.uniforms.uColorSpread.value,brightSpread:i.uniforms.uBrightSpread.value,flickerAmp:i.uniforms.uFlickerAmp.value,flickerSpeed:i.uniforms.uFlickerSpeed.value,arcColorSpread:i.uniforms.uArcColorSpread.value,scrollSpeed:n.scrollSpeed,scrollAxis:et(n.mode),gradientMode:n.gradientMode,jitter:n.jitter,invert:n.invert?1:0,resolution:this._resolution},S=Oe({...b,lineColor:i.uniforms.uColor.value.getHex(),lineColorB:i.uniforms.uColorB.value.getHex(),opacity:0,blending:Et});this._baseRings=new J(Pe(_),S),this._baseRings.renderOrder=v.renderOrder,this._scene.add(this._baseRings),this._glowLayers=[];for(let E=0;E<n.glowLayers;E++){const C=n.radius*n.glowRadius*(1+E*n.glowLayerRadiusStep),A=Oe({...b,lineColor:s.uniforms.uColor.value.getHex(),lineColorB:s.uniforms.uColorB.value.getHex(),opacity:0,blending:$}),B=new J(Pe({..._,radius:C}),A);B.renderOrder=((y=x[0])==null?void 0:y.renderOrder)??0,this._scene.add(B),this._glowLayers.push(B)}this._setProgress(this._progress),this._baseRings.material.uniforms.uTime.value=this._time,this._glowLayers.forEach(E=>{E.material.uniforms.uTime.value=this._time}),f={oldBase:v,oldGlowLayers:x,oldBaseOpacity:p,oldGlowLayerOpacities:w}}const g=this._glowLayers[0].material;this._morph={elapsed:0,durationMs:Math.max(a,0),crossFade:f,from:{lineColor:i.uniforms.uColor.value.clone(),lineColorB:i.uniforms.uColorB.value.clone(),glowColor:s.uniforms.uColor.value.clone(),glowColorB:s.uniforms.uColorB.value.clone(),opacity:f?0:i.uniforms.uOpacity.value,glowOpacity:f?0:s.uniforms.uOpacity.value,emissiveIntensity:i.uniforms.uEmissiveIntensity.value,stagger:i.uniforms.uStagger.value,warpAmount:i.uniforms.uWarpAmount.value,ringFade:i.uniforms.uRingFade.value,colorSpread:i.uniforms.uColorSpread.value,brightSpread:i.uniforms.uBrightSpread.value,flickerAmp:i.uniforms.uFlickerAmp.value,flickerSpeed:i.uniforms.uFlickerSpeed.value,arcColorSpread:i.uniforms.uArcColorSpread.value,jitter:i.uniforms.uJitter.value,radius:d},to:{lineColor:e.lineColor!==void 0?new O(e.lineColor):i.uniforms.uColor.value.clone(),lineColorB:e.lineColorB!==void 0?new O(e.lineColorB):i.uniforms.uColorB.value.clone(),glowColor:e.glowColor!==void 0?new O(e.glowColor):g.uniforms.uColor.value.clone(),glowColorB:e.glowColorB!==void 0?new O(e.glowColorB):g.uniforms.uColorB.value.clone(),opacity:e.opacity??i.uniforms.uOpacity.value,glowOpacity:e.glowOpacity??g.uniforms.uOpacity.value,emissiveIntensity:e.emissiveIntensity??i.uniforms.uEmissiveIntensity.value,stagger:e.stagger??i.uniforms.uStagger.value,warpAmount:e.warpAmount??i.uniforms.uWarpAmount.value,ringFade:e.ringFade??i.uniforms.uRingFade.value,colorSpread:e.colorSpread??i.uniforms.uColorSpread.value,brightSpread:e.brightSpread??i.uniforms.uBrightSpread.value,flickerAmp:e.flickerAmp??i.uniforms.uFlickerAmp.value,flickerSpeed:e.flickerSpeed??i.uniforms.uFlickerSpeed.value,arcColorSpread:e.arcColorSpread??i.uniforms.uArcColorSpread.value,jitter:e.jitter??i.uniforms.uJitter.value,radius:h}},a<=0&&(this._applyMorphT(1),this._morph=null)}dispose(){this._disposeCrossFade(),this._scene.remove(this._baseRings),this._baseRings.geometry.dispose(),this._baseRings.material.dispose(),this._glowLayers.forEach(e=>{this._scene.remove(e),e.geometry.dispose(),e.material.dispose()})}_allMaterials(){return[this._baseRings.material,...this._glowLayers.map(e=>e.material)]}_disposeCrossFade(){var o;const e=(o=this._morph)==null?void 0:o.crossFade;e&&(this._scene.remove(e.oldBase),e.oldBase.geometry.dispose(),e.oldBase.material.dispose(),e.oldGlowLayers.forEach(a=>{this._scene.remove(a),a.geometry.dispose(),a.material.dispose()}))}_build(){const e=this._options,o={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},a={lineWidth:e.lineWidth,emissiveIntensity:e.emissiveIntensity,numRings:e.numRings,stagger:e.stagger,ringFade:e.ringFade,warpAmount:e.warpAmount,direction:e.direction,colorSpread:e.colorSpread,brightSpread:e.brightSpread,flickerAmp:e.flickerAmp,flickerSpeed:e.flickerSpeed,arcColorSpread:e.arcColorSpread,scrollSpeed:e.scrollSpeed,scrollAxis:et(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,invert:e.invert?1:0,resolution:this._resolution},n=Oe({...a,lineColor:e.lineColor,lineColorB:e.lineColorB,opacity:e.opacity,blending:Et});this._baseRings=new J(Pe(o),n),this._scene.add(this._baseRings),this._glowLayers=[];for(let i=0;i<e.glowLayers;i++){const s=e.radius*e.glowRadius*(1+i*e.glowLayerRadiusStep),l=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,i),c=Oe({...a,lineColor:e.glowColor,lineColorB:e.glowColorB,opacity:l,blending:$}),d=new J(Pe({...o,radius:s}),c);this._scene.add(d),this._glowLayers.push(d)}}_rebuildGlowLayers(){var d,h;const e=this._options,o=(d=this._glowLayers[0])==null?void 0:d.material,a=o?o.uniforms.uColor.value.getHex():e.glowColor,n=o?o.uniforms.uColorB.value.getHex():e.glowColorB,i=((h=this._glowLayers[0])==null?void 0:h.renderOrder)??0;this._glowLayers.forEach(r=>{this._scene.remove(r),r.geometry.dispose(),r.material.dispose()});const s=this._baseRings.material,l={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},c={lineWidth:e.lineWidth,numRings:e.numRings,stagger:s.uniforms.uStagger.value,ringFade:s.uniforms.uRingFade.value,warpAmount:s.uniforms.uWarpAmount.value,emissiveIntensity:s.uniforms.uEmissiveIntensity.value,direction:e.direction,colorSpread:s.uniforms.uColorSpread.value,brightSpread:s.uniforms.uBrightSpread.value,flickerAmp:s.uniforms.uFlickerAmp.value,flickerSpeed:s.uniforms.uFlickerSpeed.value,scrollSpeed:e.scrollSpeed,scrollAxis:et(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,resolution:this._resolution};this._glowLayers=[];for(let r=0;r<e.glowLayers;r++){const u=e.radius*e.glowRadius*(1+r*e.glowLayerRadiusStep),m=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,r),f=Oe({...c,lineColor:a,lineColorB:n,opacity:m,blending:$}),g=new J(Pe({...l,radius:u}),f);g.renderOrder=i,g.material.uniforms.uProgress.value=this._progress,g.material.uniforms.uTime.value=this._time,this._scene.add(g),this._glowLayers.push(g)}}_rebuildGeometry(){var d,h,r;const e=this._options,o=this._baseRings,a=this._glowLayers.slice(),n=o.material,i={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},s={lineWidth:e.lineWidth,numRings:e.numRings,stagger:n.uniforms.uStagger.value,ringFade:n.uniforms.uRingFade.value,warpAmount:n.uniforms.uWarpAmount.value,emissiveIntensity:n.uniforms.uEmissiveIntensity.value,direction:e.direction,colorSpread:n.uniforms.uColorSpread.value,brightSpread:n.uniforms.uBrightSpread.value,flickerAmp:n.uniforms.uFlickerAmp.value,flickerSpeed:n.uniforms.uFlickerSpeed.value,arcColorSpread:((d=n.uniforms.uArcColorSpread)==null?void 0:d.value)??0,scrollSpeed:e.scrollSpeed,scrollAxis:et(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,resolution:this._resolution},l=Oe({...s,lineColor:n.uniforms.uColor.value.getHex(),lineColorB:n.uniforms.uColorB.value.getHex(),opacity:n.uniforms.uOpacity.value,blending:Et});this._baseRings=new J(Pe(i),l),this._baseRings.renderOrder=o.renderOrder,this._baseRings.material.uniforms.uProgress.value=this._progress,this._baseRings.material.uniforms.uTime.value=this._time,this._scene.add(this._baseRings);const c=(h=a[0])==null?void 0:h.material;this._glowLayers=[];for(let u=0;u<e.glowLayers;u++){const m=e.radius*e.glowRadius*(1+u*e.glowLayerRadiusStep),f=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,u),g=Oe({...s,lineColor:(c==null?void 0:c.uniforms.uColor.value.getHex())??e.glowColor,lineColorB:(c==null?void 0:c.uniforms.uColorB.value.getHex())??e.glowColorB,opacity:f,blending:$}),y=new J(Pe({...i,radius:m}),g);y.renderOrder=((r=a[0])==null?void 0:r.renderOrder)??0,y.material.uniforms.uProgress.value=this._progress,y.material.uniforms.uTime.value=this._time,this._scene.add(y),this._glowLayers.push(y)}this._scene.remove(o),o.geometry.dispose(),o.material.dispose(),a.forEach(u=>{this._scene.remove(u),u.geometry.dispose(),u.material.dispose()})}_setProgress(e){this._baseRings.material.uniforms.uProgress.value=e,this._glowLayers.forEach(o=>{o.material.uniforms.uProgress.value=e})}_applyMorphT(e){const{from:o,to:a}=this._morph,n=this._baseRings.material,i=(d,h)=>d+(h-d)*e;vt.lerpColors(o.lineColor,a.lineColor,e),n.uniforms.uColor.value.copy(vt),yt.lerpColors(o.lineColorB,a.lineColorB,e),n.uniforms.uColorB.value.copy(yt),n.uniforms.uOpacity.value=i(o.opacity,a.opacity),n.uniforms.uEmissiveIntensity.value=i(o.emissiveIntensity,a.emissiveIntensity),n.uniforms.uStagger.value=i(o.stagger,a.stagger),n.uniforms.uWarpAmount.value=i(o.warpAmount,a.warpAmount),n.uniforms.uRingFade.value=i(o.ringFade,a.ringFade),n.uniforms.uColorSpread.value=i(o.colorSpread,a.colorSpread),n.uniforms.uBrightSpread.value=i(o.brightSpread,a.brightSpread),n.uniforms.uFlickerAmp.value=i(o.flickerAmp,a.flickerAmp),n.uniforms.uFlickerSpeed.value=i(o.flickerSpeed,a.flickerSpeed),n.uniforms.uArcColorSpread.value=i(o.arcColorSpread,a.arcColorSpread),n.uniforms.uJitter.value=i(o.jitter,a.jitter),vt.lerpColors(o.glowColor,a.glowColor,e),yt.lerpColors(o.glowColorB,a.glowColorB,e);const s=i(o.glowOpacity,a.glowOpacity),l=this._options.glowLayerOpacityFalloff;this._glowLayers.forEach((d,h)=>{const r=d.material;r.uniforms.uColor.value.copy(vt),r.uniforms.uColorB.value.copy(yt),r.uniforms.uOpacity.value=s*Math.pow(l,h),r.uniforms.uEmissiveIntensity.value=i(o.emissiveIntensity,a.emissiveIntensity),r.uniforms.uStagger.value=i(o.stagger,a.stagger),r.uniforms.uWarpAmount.value=i(o.warpAmount,a.warpAmount),r.uniforms.uRingFade.value=i(o.ringFade,a.ringFade),r.uniforms.uColorSpread.value=i(o.colorSpread,a.colorSpread),r.uniforms.uBrightSpread.value=i(o.brightSpread,a.brightSpread),r.uniforms.uFlickerAmp.value=i(o.flickerAmp,a.flickerAmp),r.uniforms.uFlickerSpeed.value=i(o.flickerSpeed,a.flickerSpeed),r.uniforms.uArcColorSpread.value=i(o.arcColorSpread,a.arcColorSpread),r.uniforms.uJitter.value=i(o.jitter,a.jitter)});const c=i(o.radius,a.radius)/this._options.radius;if(this._baseRings.scale.setScalar(c),this._glowLayers.forEach(d=>d.scale.setScalar(c)),this._morph.crossFade){const{oldBase:d,oldGlowLayers:h,oldBaseOpacity:r,oldGlowLayerOpacities:u}=this._morph.crossFade;d.material.uniforms.uOpacity.value=r*(1-e),d.material.uniforms.uProgress.value=this._progress,h.forEach((m,f)=>{m.material.uniforms.uOpacity.value=u[f]*(1-e),m.material.uniforms.uProgress.value=this._progress}),e>=1&&(this._scene.remove(d),d.geometry.dispose(),d.material.dispose(),h.forEach(m=>{this._scene.remove(m),m.geometry.dispose(),m.material.dispose()}))}if(e>=1){const d=this._options;d.opacity=a.opacity,d.glowOpacity=a.glowOpacity,d.emissiveIntensity=a.emissiveIntensity,d.stagger=a.stagger,d.warpAmount=a.warpAmount,d.ringFade=a.ringFade,d.colorSpread=a.colorSpread,d.brightSpread=a.brightSpread,d.flickerAmp=a.flickerAmp,d.flickerSpeed=a.flickerSpeed,d.arcColorSpread=a.arcColorSpread,d.jitter=a.jitter,d.lineColor=a.lineColor.getHex(),d.lineColorB=a.lineColorB.getHex(),d.glowColor=a.glowColor.getHex(),d.glowColorB=a.glowColorB.getHex(),d.radius=a.radius}}}function Bi(t){return t==="bracket"?`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-bracket" aria-hidden="true">
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tr"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--bl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--br"></span>
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`:t==="diamond"?`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-diamond" aria-hidden="true">
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`:`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-box" aria-hidden="true">
    <span class="s9-threatmap__crosshair-label"></span>
  </div>`}function Fa(t,{autoRotate:e=!0,bloomStrength:o=1.7,crosshairShape:a="box"}={}){const n=new AbortController,{signal:i}=n,s=window.matchMedia("(prefers-reduced-motion: reduce)").matches,l=We(),c=new mo({antialias:!0,alpha:!0});c.setPixelRatio(window.devicePixelRatio),c.setSize(t.clientWidth||800,t.clientHeight||600),c.domElement.classList.add("s9-threatmap__canvas"),t.appendChild(c.domElement);const d=new fo,h=new ya(45,(t.clientWidth||800)/(t.clientHeight||600),.1,100);h.position.set(0,0,3);const r=new Fe(ke,48,48),u=new Fe(ke*.98,48,48),m=new O(l.neonCyan||"#00d4b0"),f=new pa(r).getAttribute("position").array,g=new ct;g.setPositions(f);const y=t.clientWidth||800,v=t.clientHeight||600,x=new pe({color:m,linewidth:1,transparent:!0,opacity:.014,depthTest:!0,depthWrite:!1});x.resolution.set(y,v);const p=new J(g,x);p.renderOrder=0,d.add(p);const w=new Ke({colorWrite:!1,depthWrite:!0,depthTest:!0,depthFunc:bn,side:yn}),_=new se(u,w);_.renderOrder=1,d.add(_);const b=new Ke({colorWrite:!1,depthWrite:!0,depthTest:!0,side:oo}),S=new se(r,b);S.renderOrder=1,d.add(S);const E=new Ke({color:new O("#010e0b"),transparent:!0,opacity:.72,depthTest:!0,depthWrite:!0,side:ba}),C=new se(r,E);C.renderOrder=1,d.add(C);const A=new pe({color:m,linewidth:1,transparent:!0,opacity:.05,depthTest:!0,depthWrite:!1});A.resolution.set(y,v);const B=new J(g,A);B.renderOrder=2,d.add(B);const U=new pe({color:m,linewidth:1,transparent:!0,opacity:.03,blending:$,depthTest:!0,depthWrite:!1});U.resolution.set(y,v);const j=new J(g,U);j.renderOrder=3,d.add(j);const Me=new Fe(ke,48,48),Ce=new oe({uniforms:{uColor:{value:new P(m.r,m.g,m.b)}},vertexShader:`
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vNormal  = normalize(normalMatrix * normal);
        vec4 mv  = modelViewMatrix * vec4(position, 1.0);
        vViewDir = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float rim   = 1.0 - max(dot(vNormal, vViewDir), 0.0);
        float alpha = pow(rim, 3.5) * 0.75;
        gl_FragColor = vec4(uColor * alpha, alpha);
      }
    `,transparent:!0,blending:$,depthWrite:!1,side:oo}),F=new se(Me,Ce);F.renderOrder=4,d.add(F);const R=new jn(h,c.domElement);R.enableDamping=!0,R.dampingFactor=.05,R.autoRotate=e&&!s,R.autoRotateSpeed=.4,R.enablePan=!1,R.minDistance=1.5,R.maxDistance=5,R.minPolarAngle=Math.PI/2-42.5*Math.PI/180,R.maxPolarAngle=Math.PI/2+42.5*Math.PI/180;const le=new _o(c),ce=new wo(d,h);le.addPass(ce);const de=new Re(new k(t.clientWidth||800,t.clientHeight||600),o*2,.4,.3);le.addPass(de);const Xe=new _e(fi);le.addPass(Xe);const $e=document.createElement("div");$e.className="s9-threatmap__overlay",$e.innerHTML=`
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tr" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--bl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--br" aria-hidden="true"></div>
    ${Bi(a)}
    <div class="s9-threatmap__coords" aria-live="polite">
      <span class="s9-threatmap__coords-lat">LAT: --.-°</span>
      <span class="s9-threatmap__coords-lng">LNG: --.-°</span>
    </div>
    <div class="s9-threatmap__node-count">NODES: 0</div>
  `,t.appendChild($e);let Ze=null;R.addEventListener("start",()=>{R.autoRotate=!1,Ze!==null&&(clearTimeout(Ze),Ze=null);const T=G.get(t);T&&(T.cameraLerpTarget=null,T.lastOrbitInteraction=Date.now())}),R.addEventListener("end",()=>{!s&&e&&(Ze=setTimeout(()=>{R.autoRotate=!0,Ze=null},6e3))});const Mo=new ResizeObserver(()=>{const T=t.clientWidth,Q=t.clientHeight;if(!T||!Q)return;h.aspect=T/Q,h.updateProjectionMatrix(),c.setSize(T,Q),le.setSize(T,Q),de.resolution.set(T,Q);const ue=G.get(t);if(ue){ue.globeBackMat.resolution.set(T,Q),ue.globeFrontMat.resolution.set(T,Q),ue.globeGlowMat.resolution.set(T,Q);for(const L of ue.geoLineMats)L.resolution.set(T,Q)}});Mo.observe(t);const Co=new _n;c.domElement.addEventListener("click",T=>{const Q=G.get(t);if(!Q)return;const ue=c.domElement.getBoundingClientRect(),L=ue.width,W=ue.height,H=(T.clientX-ue.left)/L*2-1,te=-((T.clientY-ue.top)/W)*2+1;Co.setFromCamera(new k(H,te),h);const Ae=Array.from(Q.nodeMap.values()).map(fe=>fe.mesh),ge=Co.intersectObjects(Ae,!1);if(ge.length>0){const fe=ge[0].object;He(t,fe.userData.nodeId)}else Q.activeNodeId!==null&&He(t,null)},{signal:i}),G.set(t,{animFrameId:null,renderer:c,composer:le,bloomPass:de,controls:R,scene:d,camera:h,resizeObserver:Mo,nodeMap:new Map,edgeMap:new Map,abortController:n,resumeTimer:null,reducedMotion:s,activeNodeId:null,colors:l,cyanColor:m,globeGeo:r,occluderGeo:u,globeBack:p,globeBackMat:x,occluder:_,frontOccluder:S,globeSurface:C,globeFront:B,globeFrontMat:A,globeGlow:j,globeGlowMat:U,rimGeo:Me,rimMesh:F,geoGroup:null,geoLineMats:[],cameraLerpTarget:null,lastOrbitInteraction:0,arcs:[],satelliteMode:!1,sunAngle:Math.random()*Math.PI*2,satelliteGroup:null,holoPass:Xe,nodeGeo:new Fe(.02,8,8),nodeTween:null,deselectTween:null,labelTypewriter:null,coordScrambleLat:null,coordScrambleLng:null,pendingTimers:[],tweenGeneration:0,crosshairShape:a});const Ao=G.get(t);let To=performance.now();function Lo(){const T=G.get(t);if(!T)return;T.animFrameId=requestAnimationFrame(Lo);const Q=performance.now(),ue=Q-To;To=Q,T.revealAnim&&T.revealAnim.tick(ue),T.cameraLerpTarget&&Date.now()-T.lastOrbitInteraction>=3e3&&(T.camera.position.lerp(T.cameraLerpTarget,.06),T.camera.position.distanceTo(T.cameraLerpTarget)<.04&&(T.camera.position.copy(T.cameraLerpTarget),T.cameraLerpTarget=null)),T.controls.update();for(let L=T.arcs.length-1;L>=0;L--){const W=T.arcs[L],H=Math.min(1,(Date.now()-W.t0)/W.dur);if(W.particle.position.copy(W.curve.getPoint(H)),H>.75){const te=1-(H-.75)/.25;W.ptMat.opacity=.9*te,W.lineMat.opacity=.1*te}H>=1&&(T.scene.remove(W.line),T.scene.remove(W.particle),W.lineGeo.dispose(),W.lineMat.dispose(),W.ptGeo.dispose(),W.ptMat.dispose(),T.arcs.splice(L,1))}if(T.satelliteMode&&T.satMat){T.sunAngle+=15e-5;const L=performance.now()*.001;T.satMat.uniforms.sunDir.value.set(Math.cos(T.sunAngle),.22,Math.sin(T.sunAngle)).normalize(),T.satMat.uniforms.time.value=L,T.atmMat&&(T.atmMat.uniforms.time.value=L)}if(T.holoPass&&(T.holoPass.uniforms.time.value=performance.now()*.001),T.activeNodeId!==null){const L=T.nodeMap.get(T.activeNodeId),W=t.querySelector(".s9-threatmap__crosshair");if(L&&W){const H=t.clientWidth,te=t.clientHeight,Ae=L.mesh.position.clone().project(T.camera),ge=(Ae.x*.5+.5)*H,fe=(-Ae.y*.5+.5)*te;W.style.left=`${ge}px`,W.style.top=`${fe}px`}}if(T.nodeTween){const L=T.nodeTween,W=Date.now()-L.t0,H=Math.min(1,W/L.dur),te=H<L.riseFrac?Yo(H/L.riseFrac):Ko((H-L.riseFrac)/(1-L.riseFrac)),Ae=H<L.riseFrac?1+(L.peakScale-1)*te:L.peakScale-(L.peakScale-1)*te;L.mesh.scale.setScalar(Ae);const ge=L.flashDur/L.dur,fe=L.settleDur/L.dur;if(H<ge)L.mesh.material.color.copy(L.flashColor);else if(H<ge+fe){const un=(H-ge)/fe;L.mesh.material.color.lerpColors(L.flashColor,L.selectColor,Xo(un))}else L.mesh.material.color.copy(L.selectColor);H>=1&&(L.mesh.scale.setScalar(1),L.mesh.material.color.copy(L.selectColor),T.nodeTween=null)}if(T.deselectTween){const L=T.deselectTween,W=Date.now()-L.t0,H=Math.min(1,W/L.dur),te=.4,Ae=H<te?Ko(H/te):Yo((H-te)/(1-te)),ge=H<te?1-(1-L.troughScale)*Ae:L.troughScale+(1-L.troughScale)*Ae;if(L.mesh.scale.setScalar(ge),L.mesh.material.color.lerpColors(L.selectColor,L.levelColor,Xo(H)),H>=1){L.mesh.scale.setScalar(1),L.mesh.material.color.copy(L.levelColor);const fe=L.element.querySelector(".s9-threatmap__crosshair");fe&&fe.classList.remove("s9-threatmap__crosshair--animating-out"),T.deselectTween=null}}T.composer.render()}const Ht=new Oi(d,{radius:ke*1.003,numRings:56,durationMs:2e3,easingFn:Ba,direction:"south-to-north",stagger:.55,lineColor:65484,glowColor:65484,emissiveIntensity:2,opacity:0,glowOpacity:0});Ht.baseRings.renderOrder=4,Ht.glowRings.renderOrder=4,Ao.revealAnim=Ht,Ao.animFrameId=requestAnimationFrame(Lo),Si(t)}function Fi(t){var e;return((e=G.get(t))==null?void 0:e.camera)??null}function ki(t){var e;return((e=G.get(t))==null?void 0:e.revealAnim)??null}function Ni(t){var e;return((e=G.get(t))==null?void 0:e.scene)??null}function Ui(t,e){const o=G.get(t);if(!o)return;const a=o.edgeMap.get(e);a&&(a.line.geometry.dispose(),a.line.material.dispose(),o.scene.remove(a.line),o.edgeMap.delete(e))}function ka(t){const e=G.get(t);if(!e)return;const o=t.querySelector(".s9-threatmap__node-count");o&&(o.textContent=`NODES: ${e.nodeMap.size}`)}function Na(t,{id:e,lat:o,lng:a,label:n,level:i}){const s=G.get(t);if(!s)return;if(o<-90||o>90||a<-180||a>180){console.warn(`[s9-threatmap] addNode: invalid coordinates for "${e}": lat=${o}, lng=${a}`);return}if(s.nodeMap.has(e)){console.warn(`[s9-threatmap] addNode: node "${e}" already exists.`);return}const l=We(),c=Ge(i,l),d=new Ke({color:new O(c)}),h=new se(s.nodeGeo,d);h.renderOrder=5;const r=ao(o,a);h.position.copy(r),h.userData.nodeId=e,h.userData.label=n,h.userData.lat=o,h.userData.lng=a,h.userData.level=i,s.scene.add(h),s.nodeMap.set(e,{mesh:h,lat:o,lng:a,label:n,level:i}),ka(t)}function Ua(t,e){const o=G.get(t);if(!o)return;const a=o.nodeMap.get(e);if(!a){console.warn(`[s9-threatmap] removeNode: node "${e}" not found.`);return}o.activeNodeId===e&&He(t,null);for(const[n,i]of o.edgeMap)(i.from===e||i.to===e)&&Ui(t,n);a.mesh.material.dispose(),o.scene.remove(a.mesh),o.nodeMap.delete(e),ka(t)}function Gi(t,e){const o=G.get(t);if(!o||o.reducedMotion)return;const a=o.nodeMap.get(e);if(!a)return;const n=We(),i=Ge(a.level,n),s=20,l=.035,c=[];for(let y=0;y<=s;y++){const v=y/s*Math.PI*2;c.push(new P(Math.cos(v)*l,Math.sin(v)*l,0))}const d=new De().setFromPoints(c),h=new Ne({color:new O(i),transparent:!0,opacity:.8,depthWrite:!1}),r=new po(d,h);r.renderOrder=5,r.position.copy(a.mesh.position);const u=a.mesh.position.clone().normalize();r.quaternion.setFromUnitVectors(new P(0,0,1),u),o.scene.add(r);const m=performance.now(),f=700;let g;(function y(v){if(!G.get(t)){cancelAnimationFrame(g),o.scene.remove(r),d.dispose(),h.dispose();return}const x=Math.min(1,(v-m)/f);r.scale.setScalar(1+x*6),h.opacity=.85*(1-x),x<1?g=requestAnimationFrame(y):(o.scene.remove(r),d.dispose(),h.dispose())})(performance.now())}function Hi(t,e,o){const a=G.get(t);if(!a||a.reducedMotion)return;const n=a.nodeMap.get(e),i=a.nodeMap.get(o);if(!n||!i)return;const s=We(),l=Ge(i.level,s),c=n.mesh.position.clone(),d=i.mesh.position.clone(),h=c.clone().add(d).multiplyScalar(.5),r=.2+h.length()*.25,u=h.clone().normalize().multiplyScalar(ke+r),m=new wn(c,u,d),f=new De().setFromPoints(m.getPoints(48)),g=new Ne({color:new O(l),transparent:!0,opacity:.1,depthWrite:!1}),y=new go(f,g);y.renderOrder=2;const v=new Fe(.009,4,4),x=new Ke({color:new O(l),transparent:!0,opacity:.9}),p=new se(v,x);p.renderOrder=3,p.position.copy(c),a.scene.add(y),a.scene.add(p),a.arcs.push({curve:m,line:y,lineGeo:f,lineMat:g,particle:p,ptGeo:v,ptMat:x,t0:Date.now(),dur:1e3+Math.random()*700})}function zi(t=null){const a=document.createElement("canvas");a.width=2048,a.height=1024;const n=a.getContext("2d"),i=n.createLinearGradient(0,0,0,1024);if(i.addColorStop(0,"#071a2e"),i.addColorStop(.15,"#082035"),i.addColorStop(.5,"#0a2a46"),i.addColorStop(.85,"#082035"),i.addColorStop(1,"#071a2e"),n.fillStyle=i,n.fillRect(0,0,2048,1024),t){const s=yi(t,t.objects.land),c=(s.type==="FeatureCollection"?s.features:[s]).flatMap(r=>{const u=r.geometry;return u?u.type==="Polygon"?[u.coordinates]:u.coordinates:[]}),d=n.createLinearGradient(0,0,0,1024);d.addColorStop(0,"#dce8dc"),d.addColorStop(.06,"#8a9c7a"),d.addColorStop(.16,"#527848"),d.addColorStop(.28,"#4e7040"),d.addColorStop(.4,"#4a6c34"),d.addColorStop(.5,"#3a5c24"),d.addColorStop(.6,"#4a6c34"),d.addColorStop(.72,"#4e7040"),d.addColorStop(.84,"#7a8c6a"),d.addColorStop(.92,"#ccd8c4"),d.addColorStop(1,"#eaf0ea");for(const r of c)for(let u=0;u<r.length;u++){const m=r[u];n.beginPath();for(let f=0;f<m.length;f++){const[g,y]=m[f],v=(g+180)/360*2048,x=(90-y)/180*1024;f===0?n.moveTo(v,x):n.lineTo(v,x)}n.closePath(),n.fillStyle=u===0?d:"#0a2a46",n.fill()}const h=[[22,15,16,28,"rgba(172,142, 88,0.72)"],[23,44,8,12,"rgba(178,148, 96,0.68)"],[27,70,5,9,"rgba(182,158,112,0.52)"],[42,100,6,16,"rgba(152,128, 86,0.58)"],[-25,132,10,17,"rgba(168,134, 82,0.58)"],[-22,-68,4,6,"rgba(142,118, 76,0.48)"],[35,-114,5,8,"rgba(158,128, 82,0.42)"],[40,58,5,8,"rgba(158,134, 88,0.45)"]];for(const[r,u,m,f,g]of h){const[y,v]=at(r,u,2048,1024),x=f/360*2048,p=m/180*1024,w=n.createRadialGradient(y,v,0,y,v,Math.max(x,p)),_=g.replace(/[\d.]+\)$/,"0)");w.addColorStop(0,g),w.addColorStop(.55,g),w.addColorStop(.88,g.replace(/[\d.]+\)$/,"0.08)")),w.addColorStop(1,_),n.fillStyle=w,n.beginPath(),n.ellipse(y,v,x,p,0,0,Math.PI*2),n.fill()}n.strokeStyle="rgba(120,175,210,0.22)",n.lineWidth=.8;for(const r of c){const u=r[0];n.beginPath();for(let m=0;m<u.length;m++){const[f,g]=u[m],y=(f+180)/360*2048,v=(90-g)/180*1024;m===0?n.moveTo(y,v):n.lineTo(y,v)}n.closePath(),n.stroke()}}n.strokeStyle="rgba(100,150,200,0.04)",n.lineWidth=.5;for(let s=-80;s<=80;s+=30){const l=at(s,0,2048,1024)[1];n.beginPath(),n.moveTo(0,l),n.lineTo(2048,l),n.stroke()}for(let s=-180;s<=180;s+=30){const l=at(0,s,2048,1024)[0];n.beginPath(),n.moveTo(l,0),n.lineTo(l,1024),n.stroke()}return a}function Wi(){const o=document.createElement("canvas");o.width=1024,o.height=512;const a=o.getContext("2d");a.fillStyle="#000810",a.fillRect(0,0,1024,512);const n=[[40.7,-74,4],[34,-118.2,3.5],[41.9,-87.6,3],[29.8,-95.4,2.5],[19.4,-99.1,3],[43.7,-79.4,3],[45.5,-73.6,2.5],[49.3,-123.1,2],[38.9,-77,2.5],[42.4,-71.1,2.5],[32.8,-96.8,2.5],[33.7,-84.4,2],[37.8,-122.4,2.5],[47.6,-122.3,2],[39.7,-105,2],[33.4,-112.1,2],[36.2,-115.1,2],[29.4,-98.5,2],[32.7,-97.1,2],[30.3,-81.7,1.5],[51,-114.1,2],[53.5,-113.5,2],[49.9,-97.1,2],[14.1,-87.2,1.5],[13.7,-89.2,1.5],[-23.5,-46.6,4],[-22.9,-43.2,3.5],[-34.6,-58.4,3.5],[-12,-77,2],[4.7,-74.1,2],[10.5,-66.9,2],[-33.5,-70.7,2.5],[-3.7,-38.5,2],[-8.1,-34.9,2],[-19.9,-43.9,2.5],[-30,-51.2,2],[-15.8,-47.9,2],[51.5,-.1,4],[48.9,2.3,4],[52.5,13.4,3.5],[55.8,37.6,4],[41,28.9,3.5],[59.9,10.8,2],[59.3,18.1,2],[60.2,25,2],[52.2,21,2.5],[50.1,14.4,2.5],[47.5,19,2.5],[48.2,16.4,2.5],[47.4,8.5,2.5],[48.1,11.6,3],[52.4,4.9,3],[40.4,-3.7,3],[41.4,2.2,3],[45.5,9.2,3],[41.9,12.5,3],[37.9,23.7,2.5],[50,8.7,2.5],[51,13.7,2],[51.2,6.8,2.5],[50.9,4.3,2.5],[53.5,-2.2,2],[55.7,12.6,2],[50.5,30.5,2.5],[59.5,30.3,2.5],[48,37.8,2],[46.5,30.7,2],[49.8,24,2],[50.4,30.5,2],[45.4,28,2],[44.4,26.1,2],[42.7,23.3,2],[37.1,-8.6,2],[30.1,31.3,3.5],[25.2,55.3,2.5],[33.3,44.4,2.5],[35.7,51.4,3],[24.7,46.7,2.5],[31.8,35.2,2],[33.9,35.5,2],[36.8,10.2,2],[32.9,13.2,2],[30.7,29.7,2],[6.5,3.4,2.5],[-26.2,28,3],[-33.9,18.4,2],[-1.3,36.8,2],[5.3,-4,2],[14.7,17.4,1.5],[9.1,7.4,2],[4.4,18.6,1.5],[-4.3,15.3,1.5],[-11.7,43.3,1.5],[-18.9,47.5,1.5],[28.6,77.2,4],[19.1,72.9,3.5],[12.9,77.6,3],[23.7,90.4,3],[24.9,67,2.5],[31.6,74.3,2.5],[33.7,73.1,2],[17.4,78.5,2.5],[22.6,88.4,2.5],[13.1,80.3,2.5],[23,72.6,2],[22.3,70.8,2],[26.9,75.8,2],[21.2,81.4,2],[27.7,85.3,2],[41.3,69.2,2],[43.3,76.9,2],[51.2,71.5,1.5],[53.9,27.6,2],[54.7,55.9,2],[56.8,60.6,2],[55,73.4,2],[56,92.9,2],[52.3,104.3,2],[53.7,87.1,2],[62,129.7,1.5],[43.1,131.9,2],[61.8,34.4,2],[35.7,139.7,5],[37.5,127,4],[39.9,116.4,4.5],[31.2,121.5,4.5],[23.1,113.3,4],[22.3,114.2,3.5],[30.6,104.1,3.5],[32.1,118.8,3.5],[30.3,120.2,3],[36.7,117,2.5],[34.3,108.9,2.5],[26,119.3,2.5],[41.8,123.4,2.5],[45.8,126.5,2.5],[34.6,135.5,3.5],[33.6,130.4,3],[1.3,103.8,3.5],[13.7,100.5,2.5],[10.8,106.7,2.5],[14.6,121,2.5],[3.1,101.7,2.5],[6.2,106.8,3],[21,105.8,2],[-6.2,106.8,2.5],[-33.9,151.2,2.5],[-37.8,144.9,2],[-27.5,153,2],[-31.9,115.9,2],[-43.5,172.6,1.5]];for(const[i,s,l]of n){const[c,d]=at(i,s,1024,512),h=l*2.2,r=a.createRadialGradient(c,d,0,c,d,h);r.addColorStop(0,"rgba(255,210,120,0.22)"),r.addColorStop(.5,"rgba(255,170,60,0.08)"),r.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=r,a.beginPath(),a.arc(c,d,h,0,Math.PI*2),a.fill()}a.globalCompositeOperation="lighter";for(const[i,s,l]of n){const[c,d]=at(i,s,1024,512),h=Math.max(1,l*.9),r=a.createRadialGradient(c,d,0,c,d,h);r.addColorStop(0,`rgba(255,245,200,${Math.min(.9,.5+l*.1)})`),r.addColorStop(.6,"rgba(255,200,100,0.15)"),r.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=r,a.beginPath(),a.arc(c,d,h,0,Math.PI*2),a.fill()}return a.globalCompositeOperation="source-over",o}function Qo(t){return new Promise((e,o)=>{new _a().load(t,e,void 0,o)})}async function $i(t){const e=G.get(t);if(!e||e.satelliteGroup)return;let o,a,n=1;try{[o,a]=await Promise.all([Qo("/textures/earth_day.jpg"),Qo("/textures/earth_night.jpg")]),o.colorSpace=Ro,a.colorSpace=Ro}catch(u){console.warn("[s9-threatmap] satellite textures not found, using procedural fallback",u);let m=mi();if(!m)try{const f=await fetch("/data/countries-110m.json");f.ok&&(m=await f.json(),Ra(m))}catch{}o=new Po(zi(m)),a=new Po(Wi()),n=0}const i=new oe({uniforms:{dayMap:{value:o},nightMap:{value:a},sunDir:{value:new P(Math.cos(e.sunAngle),.22,Math.sin(e.sunAngle)).normalize()},realTex:{value:n},time:{value:0}},vertexShader:`
      varying vec2  vUv;
      varying vec3  vWorldNormal;
      varying vec3  vWorldPos;
      void main() {
        vUv          = uv;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        vWorldPos    = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform sampler2D dayMap;
      uniform sampler2D nightMap;
      uniform vec3      sunDir;
      uniform float     realTex;
      uniform float     time;
      varying vec2      vUv;
      varying vec3      vWorldNormal;
      varying vec3      vWorldPos;

      void main() {
        vec3  N    = normalize(vWorldNormal);
        vec3  V    = normalize(cameraPosition - vWorldPos);
        vec3  S    = normalize(sunDir);

        float d     = dot(N, S);
        float blend = smoothstep(-0.18, 0.22, d);

        vec4  day   = texture2D(dayMap,   vUv);
        vec4  night = texture2D(nightMap, vUv);

        // Terminator fringe — suppressed for real satellite textures
        float term   = smoothstep(-0.06, 0.0, d) * (1.0 - smoothstep(0.0, 0.07, d));
        vec3  fringe = mix(vec3(0.0), vec3(1.0, 0.65, 0.2), term * 0.28 * (1.0 - realTex));
        vec3  base   = mix(night.rgb * 1.2, day.rgb, blend) + fringe;

        // Lift shadows, compress highlights
        vec3  lifted = base * 0.82 + vec3(0.08);

        // Fresnel — view-angle rim factor
        float fresnel = pow(1.0 - max(0.0, dot(N, V)), 3.5);

        // Specular highlight from sun
        vec3  R    = reflect(-S, N);
        float spec = pow(max(0.0, dot(R, V)), 32.0) * 0.14 * blend;

        // Holographic chromatic tint — strongest at edges and on night side
        float holoFactor = fresnel * 0.5 + (1.0 - blend) * 0.10;
        vec3  holoTint   = vec3(0.55, 1.05, 1.45);
        vec3  col        = mix(lifted, lifted * holoTint, holoFactor);

        // Subtle scan lines
        float scan    = sin(vUv.y * 520.0 - time * 0.35) * 0.5 + 0.5;
        col          *= 1.0 - scan * 0.038;

        // Faint animated interference shimmer
        float shimmer = sin(time * 1.1 + vUv.x * 38.0 + vUv.y * 27.0) * 0.010 + 1.0;
        col          *= shimmer;

        gl_FragColor = vec4(col + spec, 1.0);
      }
    `}),s=new Fe(ke,128,64),l=new se(s,i);l.renderOrder=0;const c=new Fe(ke*1.055,64,32),d=new oe({uniforms:{glowCol:{value:new O(51455)},sunDir:{value:i.uniforms.sunDir.value},time:{value:0}},vertexShader:`
      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec3 vWorldNormal;
      void main() {
        vNormal      = normalize(normalMatrix * normal);
        vViewDir     = normalize(-( modelViewMatrix * vec4(position,1.0) ).xyz);
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position  = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,fragmentShader:`
      uniform vec3  glowCol;
      uniform vec3  sunDir;
      uniform float time;
      varying vec3  vNormal;
      varying vec3  vViewDir;
      varying vec3  vWorldNormal;
      void main() {
        float rim   = 1.0 - abs(dot(vNormal, vViewDir));

        // Outer wide haze
        float outer = pow(rim, 2.0) * 0.42;
        // Inner sharp limb
        float inner = pow(rim, 5.5) * 1.15;
        float intensity = outer + inner;

        // Sun-side terminates with a warm scatter tint
        float sunFace = dot(normalize(vWorldNormal), normalize(sunDir)) * 0.5 + 0.5;
        vec3  scatter = mix(glowCol, vec3(0.45, 0.72, 1.0), sunFace * 0.40);

        // Subtle breathing pulse
        float pulse = sin(time * 0.55) * 0.05 + 1.0;
        intensity  *= pulse;

        gl_FragColor = vec4(scatter * intensity, intensity * 0.68);
      }
    `,side:oo,blending:$,transparent:!0,depthWrite:!1}),h=new se(c,d);h.renderOrder=1;const r=new ho;r.add(l),r.add(h),r.visible=!1,e.scene.add(r),Object.assign(e,{satelliteGroup:r,satGeo:s,satMat:i,atmGeo:c,atmMat:d,dayTex:o,nightTex:a})}async function ji(t,e){const o=G.get(t);o&&(e?(o.globeBack&&(o.globeBack.visible=!1),o.occluder&&(o.occluder.visible=!1),o.frontOccluder&&(o.frontOccluder.visible=!1),o.globeFront&&(o.globeFront.visible=!1),o.globeSurface&&(o.globeSurface.visible=!1),o.globeGlow&&(o.globeGlow.visible=!1),o.rimMesh&&(o.rimMesh.visible=!1),o.geoGroup&&(o.geoGroup.visible=!1),o.bloomPass&&(o._bloomPrev={strength:o.bloomPass.strength,threshold:o.bloomPass.threshold,radius:o.bloomPass.radius},o.bloomPass.strength=.32,o.bloomPass.threshold=.85,o.bloomPass.radius=.35),o.satelliteMode=!0,await $i(t),o.satelliteGroup&&(o.satelliteGroup.visible=!0)):(o.satelliteGroup&&(o.satelliteGroup.visible=!1),o.globeBack&&(o.globeBack.visible=!0),o.occluder&&(o.occluder.visible=!0),o.frontOccluder&&(o.frontOccluder.visible=!0),o.globeFront&&(o.globeFront.visible=!0),o.globeSurface&&(o.globeSurface.visible=!0),o.globeGlow&&(o.globeGlow.visible=!0),o.rimMesh&&(o.rimMesh.visible=!0),o.geoGroup&&(o.geoGroup.visible=!0),o.bloomPass&&o._bloomPrev&&(o.bloomPass.strength=o._bloomPrev.strength,o.bloomPass.threshold=o._bloomPrev.threshold,o.bloomPass.radius=o._bloomPrev.radius),o.satelliteMode=!1))}function Jo(t){const e=G.get(t);if(!e)return;const o=We(!0);e.colors=o;const a=o.neonCyan||"#00d48ddf";if(e.globeBack&&e.globeBack.material.color.set(a),e.globeFront&&e.globeFront.material.color.set(a),e.geoLineMats){const n=o.neonCyan||"#008410D0";for(const i of e.geoLineMats)i.color.set(n)}for(const n of e.nodeMap.values()){const i=Ge(n.level,o);n.mesh.material.color.set(i),n.mesh.material.emissive.set(i)}}const Vi=new WeakMap;function qi(t){const e=new AbortController;Vi.set(t,e),t.classList.add("s9-panel--booting"),t.addEventListener("animationend",o=>{o.animationName==="crt-flicker"&&(t.classList.remove("s9-panel--booting"),t.dispatchEvent(new CustomEvent("s9:panel-mount",{bubbles:!0,detail:{id:t.dataset.s9Id??null}})))},{signal:e.signal,once:!0})}const Kt=["complete","active","failed","pending"];function Yi(t,e){if(!Kt.includes(e)){console.warn(`[s9-sequence] Unknown state: "${e}". Expected one of: ${Kt.join(", ")}.`);return}Kt.forEach(o=>t.classList.remove(`s9-sequence__entry--${o}`)),e==="failed"?(t.classList.add("s9-sequence__entry--fail-flash"),t.addEventListener("animationend",()=>{t.classList.remove("s9-sequence__entry--fail-flash"),t.classList.add("s9-sequence__entry--failed"),ea(t,e)},{once:!0})):(t.classList.add(`s9-sequence__entry--${e}`),ea(t,e))}function ea(t,e){t.dispatchEvent(new CustomEvent("s9:sequence-step-change",{bubbles:!0,detail:{state:e}}))}const Ki={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new k(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;

			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {

				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );

		}`},Ga=`
// Stable hash — keeps inputs small with fract() to avoid GPU sin() precision issues
float h2(vec2 v) {
  vec2 s = fract(v * vec2(0.1031, 0.1030));
  s += dot(s, s.yx + 33.33);
  return fract((s.x + s.y) * s.x);
}
`,Xi={uniforms:{tDiffuse:{value:null},tPrev:{value:null},decay:{value:.88}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform sampler2D tPrev;
    uniform float     decay;
    varying vec2      vUv;
    void main() {
      vec4 current = texture2D(tDiffuse, vUv);
      vec4 prev    = texture2D(tPrev, vUv) * decay;
      // max prevents double-brightening where current overlaps previous trails
      gl_FragColor = max(current, prev);
    }
  `},Zi={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.42},scanlineOpacity:{value:.045},aberrationAmt:{value:.0025}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float     time;
    uniform float     vignetteStrength;
    uniform float     scanlineOpacity;
    uniform float     aberrationAmt;
    varying vec2      vUv;
    void main() {
      vec2  ctr    = vUv - 0.5;
      float edgeSq = dot(ctr, ctr) * 4.0;
      float s      = aberrationAmt * edgeSq;
      vec2 uvR = clamp(vUv + ctr * s, 0.001, 0.999);
      vec2 uvB = clamp(vUv - ctr * s, 0.001, 0.999);
      float r = texture2D(tDiffuse, uvR).r;
      float g = texture2D(tDiffuse, vUv ).g;
      float b = texture2D(tDiffuse, uvB ).b;
      vec3 col = vec3(r, g, b);
      // Scrolling scanlines — slow drift adds subtle life
      float scan = sin(vUv.y * 640.0 + time * 0.5) * 0.5 + 0.5;
      col *= 1.0 - scanlineOpacity * (1.0 - scan);
      float vig = 1.0 - edgeSq * vignetteStrength;
      col *= vig;
      // Preserve alpha from render target — transparent background stays transparent
      // so mix-blend-mode:screen on the canvas correctly composites over the globe.
      gl_FragColor = vec4(col, texture2D(tDiffuse, vUv).a);
    }
  `},Qi={uniforms:{tDiffuse:{value:null},uTime:{value:0},uHeatAmt:{value:.004},uHeatFreq:{value:60},uHeatSpeed:{value:3.5}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float     uTime;
    uniform float     uHeatAmt;
    uniform float     uHeatFreq;
    uniform float     uHeatSpeed;
    varying vec2      vUv;
    void main() {
      vec4 original = texture2D(tDiffuse, vUv);
      float bright = dot(original.rgb, vec3(0.2126, 0.7152, 0.0722));
      float warpU = sin(vUv.y * uHeatFreq       + uTime * uHeatSpeed)       * bright * uHeatAmt;
      float warpV = sin(vUv.x * uHeatFreq * 1.3 + uTime * uHeatSpeed * 0.7) * bright * uHeatAmt * 0.5;
      vec2 warpedUv = clamp(vUv + vec2(warpU, warpV), 0.001, 0.999);
      vec4 warped = texture2D(tDiffuse, warpedUv);
      // Protect bright bloom peaks from being warped to darker neighbors:
      // bright pixels keep original, dim surroundings get full shimmer distortion
      float protect = smoothstep(0.3, 0.8, bright);
      gl_FragColor = mix(warped, original, protect);
    }
  `},Ji={uniforms:{tDiffuse:{value:null},uTime:{value:0},uStreakAmt:{value:.055},uAspect:{value:1.78}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float     uTime;
    uniform float     uStreakAmt;
    uniform float     uAspect;
    varying vec2      vUv;

    float streakX(int i)     { return fract(float(i) * 0.3183 + 0.17); }
    float streakSpeed(int i) { return 0.004 + float(i) * 0.003; }
    float streakWidth(int i) { return (0.0018 + float(i) * 0.0007) / uAspect; }
    float streakAlpha(int i) { return 0.4 + float(i) * 0.2; }

    void main() {
      vec4 col = texture2D(tDiffuse, vUv);
      float streakAdd = 0.0;
      for (int i = 0; i < 3; i++) {
        float cx    = fract(streakX(i) + uTime * streakSpeed(i));
        float dist  = min(abs(vUv.x - cx), 1.0 - abs(vUv.x - cx));
        float streak = exp(-dist * dist / (2.0 * streakWidth(i) * streakWidth(i)));
        float vertFade = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
        float shimmer = 0.7 + 0.3 * sin(vUv.y * 120.0 + uTime * 2.5 + float(i) * 2.094);
        streakAdd += streak * vertFade * shimmer * streakAlpha(i);
      }
      col.rgb += vec3(0.55, 1.0, 0.65) * streakAdd * uStreakAmt;
      col.rgb  = min(col.rgb, vec3(3.0));
      gl_FragColor = col;
    }
  `},es={uniforms:{tDiffuse:{value:null},uBlurStrength:{value:.006}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float     uBlurStrength;
    varying vec2      vUv;
    void main() {
      vec2  ctr  = vUv - 0.5;
      float edge = dot(ctr, ctr) * 4.0;
      float r    = uBlurStrength * edge;
      vec4 col   = texture2D(tDiffuse, vUv);
      float origAlpha = col.a;
      col += texture2D(tDiffuse, clamp(vUv + vec2( r,  r * 0.5), 0.001, 0.999));
      col += texture2D(tDiffuse, clamp(vUv + vec2(-r,  r * 0.5), 0.001, 0.999));
      col += texture2D(tDiffuse, clamp(vUv + vec2(0.0,      -r), 0.001, 0.999));
      col *= 0.25;
      col.a = origAlpha;  // preserve original alpha — prevent bleed into transparent background
      gl_FragColor = col;
    }
  `},ts=`
precision highp float;

attribute float aColIdx;
attribute float aRowIdx;
attribute vec4  aColA;   // wx, wz, speed, seed
attribute vec4  aColB;   // yOff, scale, alpha, trail

uniform float uTime;
uniform float uCellW;
uniform float uCellH;
uniform float uWorldH;
uniform float uNRows;

varying vec2  vUv;
varying float vDist;
varying float vColIdx;
varying float vRowIdx;
varying float vAlpha;
varying float vTrail;
varying float vDepthDim;
varying vec3  vOutward;
varying vec3  vWorldPos;
varying float vBurst;
varying float vBootFade;
varying float vDeathFade;
varying float vGlobeProx;

${Ga}

void main() {
  // Initialize varyings before any early return (GLSL requires writes on all paths)
  vDeathFade = 1.0;
  vGlobeProx = 0.0;

  // Unpack per-column attributes
  float aWX    = aColA.x;
  float aWZ    = aColA.y;
  float aSpeed = aColA.z;
  float aSeed  = aColA.w;
  float aYOff  = aColB.x;
  float aScale = aColB.y;
  float aAlpha = aColB.z;
  float aTrail = aColB.w;

  // ── Startup cascade — columns boot up over 2.5s ──────────
  float bootDelay = h2(vec2(aColIdx * 0.31, 0.77)) * 2.5;
  vBootFade = smoothstep(bootDelay, bootDelay + 0.3, uTime);
  if (vBootFade < 0.001) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }

  vBurst  = 0.0;  // default — overwritten by burst block below
  vUv     = uv;
  vColIdx = aColIdx;
  vRowIdx = aRowIdx;
  vTrail  = aTrail;

  // Step must exceed rendered quad height (uCellH * aScale * 2.2) to prevent overlap.
  // 2.5–2.9× gives a small gap between glyphs; per-column variation keeps it organic.
  float spacingFactor = 1.85 + 0.10 * h2(vec2(aColIdx * 0.61, 0.29));
  float cellStep = uCellH * aScale * spacingFactor;

  // Per-glyph Y jitter
  float yJitter = h2(vec2(aColIdx * 0.43, aRowIdx * 0.89)) * 0.16 * cellStep;

  // Per-glyph alpha variation: ±12%
  float alphaJitter = 1.0 + (h2(vec2(aColIdx * 0.67, aRowIdx * 0.31)) - 0.5) * 0.24;
  vAlpha = aAlpha * alphaJitter;

  // Static world-Y of this cell
  float cellY = aYOff + uWorldH * 0.5 - aRowIdx * cellStep + yJitter;

  // ── Column burst ──────────────────────────────────────────
  float burstCycle  = 4.0;
  float burstBucket = floor(uTime / burstCycle);
  float burstH      = h2(vec2(aColIdx * 0.41, burstBucket * 0.19));
  float burstActive = step(0.995, burstH);
  float burstPhase  = fract(uTime / burstCycle);
  float burstFrac   = smoothstep(0.0, 0.1, burstPhase)
                    * (1.0 - smoothstep(0.25, 0.35, burstPhase));
  float speedMul    = 1.0 + burstActive * burstFrac * 2.0;
  vBurst = burstActive * burstFrac;

  // Illumination head sweeps down
  float cycleH    = uWorldH + uNRows * cellStep;
  float cyclePos  = mod(uTime * aSpeed * speedMul + aSeed * cycleH, cycleH);
  float cyclePhase = cyclePos / cycleH;

  // ── Column death fade — smooth fade in last 12% of cycle before wrap ──
  float deathRamp = smoothstep(0.88, 1.0, cyclePhase);
  vDeathFade = 1.0 - deathRamp;

  float headY = aYOff + uWorldH * 0.5 - cyclePos;
  vDist = (cellY - headY) / cellStep;

  // ── Rain-globe proximity pulse ──────────────────────────────
  float headGlobeDist = abs(length(vec3(aWX, headY, aWZ)) - 1.0);
  float globeProxRaw  = 1.0 - smoothstep(0.0, 0.4, headGlobeDist);
  vGlobeProx = globeProxRaw * smoothstep(3.0, 0.0, max(vDist, 0.0));

  // Tighter culling using per-column trail decay rate:
  // fragment discards when exp(-vDist * trail) < 0.012 → vDist > 4.42 / trail
  float maxVisible = min(4.42 / aTrail, uNRows * 1.2);
  if (vDist < -0.5 || vDist > maxVisible) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }

  // ── 3D world-space glyph placement ──────────────────────────
  // All columns face toward a convergence point 5 units behind the camera
  // (0, 0, -2) with ±5° per-column jitter for subtle parallax.
  vec3 colCenter = vec3(aWX, cellY, aWZ);
  vec2  toTarget    = vec2(-aWX, -2.0 - aWZ); // camera at z=3, target at z=-2
  float targetAngle = atan(toTarget.x, toTarget.y);
  float facingAngle = targetAngle + (h2(vec2(aColIdx * 0.73, 0.51)) - 0.5) * 0.1745; // ±5°
  vec3  outward = vec3(sin(facingAngle), 0.0, cos(facingAngle));
  vec3  right   = vec3(outward.z, 0.0, -outward.x);  // cross(Y, outward), already unit
  vOutward   = outward;

  // ── Column sway — sinusoidal lateral drift, head leads, tail lags ──
  float sway = sin(uTime * 0.4 + aSeed * 6.2832) * 0.04
             * (1.0 - clamp(vDist / uNRows, 0.0, 1.0));
  colCenter += right * sway;

  // ── Per-column Z-rotation — ±5° tilt around outward axis ──
  float rotAngle = (h2(vec2(aSeed, 42.0)) - 0.5) * 0.1745;
  float cosR     = cos(rotAngle);
  float sinR     = sin(rotAngle);
  vec3 rotRight  = right            * cosR + vec3(0.0, 1.0, 0.0) * sinR;
  vec3 rotUp     = vec3(0.0, 1.0, 0.0) * cosR - right            * sinR;

  // ── Drip stretch — Y-only scale at head for mercury-drip effect ──
  float scaleJitter = 1.0 + (h2(vec2(aColIdx * 0.53, aRowIdx * 0.17)) - 0.5) * 0.20;
  float dripStretch = 1.0 + 0.35 * exp(-max(vDist, 0.0) * 1.5);
  float sX = aScale * scaleJitter * 2.2;
  float sY = aScale * scaleJitter * 2.2 * dripStretch;

  vec3 worldPos = colCenter
                + rotRight * position.x * uCellW * sX
                + rotUp    * position.y * uCellH * sY;
  vWorldPos = worldPos;

  // ── Depth & brightness ──────────────────────────────────────
  vec4  viewPos   = modelViewMatrix * vec4(worldPos, 1.0);
  float camDist3D = length(viewPos.xyz);
  if (camDist3D < 1.5) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }

  // Fade glyphs close to camera (within 3.5 units) using true 3D distance
  // to prevent blinding when camera auto-focuses beneath a column.
  // No far-distance falloff: back-hemisphere columns stay bright so they appear
  // through the globe via CSS mix-blend-mode:screen on the rain canvas.
  vDepthDim = smoothstep(1.5, 3.5, camDist3D);

  gl_Position = projectionMatrix * viewPos;
}
`,os=`
precision highp float;

uniform sampler2D uGlyphTex;
uniform float     uGlyphCount;
uniform float     uTime;
uniform vec3      uColor;
uniform float     uNRows;
uniform float     uGlobalAlpha;
uniform float     uDepth;
uniform float     uPomSteps;
uniform float     uNormalStrength;
uniform float     uAtlasCols;
uniform float     uAtlasGrid;
uniform vec3      uLightDir;
uniform float     uGlobeInteract;
uniform float     uGlyphChroma;

varying vec2  vUv;
varying float vDist;
varying float vColIdx;
varying float vRowIdx;
varying float vAlpha;
varying float vTrail;
varying float vDepthDim;
varying vec3  vOutward;
varying vec3  vWorldPos;
varying float vBurst;
varying float vBootFade;
varying float vDeathFade;
varying float vGlobeProx;

${Ga}

// MSDF median — preserves sharp corners by selecting the middle channel.
float median3(float a, float b, float c) {
  return max(min(a, b), min(max(a, b), c));
}

// Convert face UV [0,1]² to MSDF grid atlas UV, handling back-face U flip.
float sampleGlyph(vec2 fUV, float gIdx) {
  float su = gl_FrontFacing ? fUV.x : 1.0 - fUV.x;
  float col = mod(gIdx, uAtlasCols);
  float row = floor(gIdx / uAtlasCols);
  vec2 atlasUV = vec2(
    (col + su) / uAtlasGrid,
    (row + (1.0 - fUV.y)) / uAtlasGrid
  );
  vec3 s = texture2D(uGlyphTex, atlasUV).rgb;
  return median3(s.r, s.g, s.b);
}

void main() {
  // Per-column trail decay — accelerates once intensity drops below 50%
  float d = max(vDist, 0.0);
  float halfDist = 0.6931 / vTrail;  // ln(2) / vTrail — distance where trail hits 0.5
  float accel = d > halfDist ? 1.5 : 1.0;
  float trail = exp(-d * vTrail * accel);
  if (trail < 0.012) discard;

  // ── Globe occlusion (early) — skip expensive POM for heavily occluded fragments
  vec3  toFrag   = vWorldPos - cameraPosition;
  float fragDist = length(toFrag);
  vec3  viewDir  = toFrag / fragDist;  // reused for POM tangent projection below
  float occlude  = 1.0;
  float ob       = dot(cameraPosition, viewDir);
  float oc       = dot(cameraPosition, cameraPosition) - 1.0;  // globe radius = 1.0
  float disc     = ob * ob - oc;
  if (disc > 0.0) {
    float tNear = -ob - sqrt(disc);
    if (tNear > 0.0 && fragDist > tNear) {
      occlude = 1.0 - 0.8 * smoothstep(0.0, 0.12, sqrt(disc));
    }
  }
  // Conservative early discard — if max possible alpha is sub-visible, skip everything
  float maxAlpha = pow(trail * vAlpha * vDepthDim, 1.3) * uGlobalAlpha * occlude * vBootFade;
  if (maxAlpha < 0.015) discard;

  // Snap to integer — varyings can have interpolation noise across the quad
  vec2 cellId = vec2(floor(vColIdx + 0.5), floor(vRowIdx + 0.5));

  float cellPhase = h2(cellId * 0.37);
  float stability = h2(cellId * 0.91);

  // Hold period in seconds (refresh-rate independent) — 3.3–11.7s, median ~7.5s
  float holdSec    = 0.45 + h2(cellId * 0.29) * 7.15;
  float burstOffset = vBurst > 0.5 ? floor(uTime * 12.0) : 0.0;
  float changeTick = floor((cellPhase * holdSec + uTime) / holdSec) + burstOffset;

  // ~30% of cells are stable — rest mutate on their own schedule
  float baseGlyph = floor(h2(cellId * 0.47 + 0.5) * uGlyphCount);
  float glyphIdx  = floor(
    h2(cellId * 0.37 + changeTick * vec2(0.11, 0.07)) * uGlyphCount
  );
  glyphIdx = stability < 0.30 ? baseGlyph : glyphIdx;

  // Back-face U flip for film grain (sampleGlyph handles its own flip internally)
  float sampleX = gl_FrontFacing ? vUv.x : 1.0 - vUv.x;

  // Film grain
  float grain = h2(vec2(
    sampleX * 47.3 + vUv.y * 31.7 + vColIdx * 0.53,
    uTime * 7.3 + vRowIdx * 0.19
  ));
  grain = (grain - 0.5) * 0.07;

  // Per-column hue shift — G-B plane rotation for yellow-green ↔ cyan variation
  float hueShift   = (h2(vec2(cellId.x * 0.17, 0.0)) - 0.5) * 2.0;
  float hueRad     = hueShift * 0.14;  // ±8°
  float cosH       = cos(hueRad);
  float sinH       = sin(hueRad);
  vec3 tintedColor = vec3(
    uColor.r,
    uColor.g * cosH - uColor.b * sinH,
    uColor.g * sinH + uColor.b * cosH
  );

  // Color: head burns white, trail is deep saturated green
  float headFrac = 1.0 - smoothstep(0.0, 0.8, vDist);
  vec3  col2     = mix(tintedColor * 1.6, tintedColor * 3.0 + vec3(0.3), headFrac) + grain;

  // Head drip — leading 2-3 glyphs are distinctly brighter (film-accurate)
  float drip = exp(-vDist * 0.8);
  col2 *= 1.0 + drip * 0.5;

  // Glyph flash — ~0.8% of cells flare white with smooth decay
  float flashBucket = floor(uTime * 30.0);
  float flashH = h2(cellId * 0.71 + vec2(flashBucket * 0.13, flashBucket * 0.07));
  float flashAge = fract(uTime * 30.0);
  float flashIntensity = (1.0 - flashAge * flashAge) * step(flashH, 0.008);
  col2 = mix(col2, vec3(2.4), flashIntensity);

  // Atmospheric depth tint — distant columns shift toward cyan/darker
  float depthTint = smoothstep(3.0, 8.0, length(vWorldPos));
  col2 = mix(col2, col2 * vec3(0.6, 0.85, 1.1), depthTint * 0.4);

  // ── Panel tangent frame (vOutward.y is always 0, so closed-form) ──
  // cross((0,1,0), vOutward) = (vOutward.z, 0, -vOutward.x), already unit length
  // cross(vOutward, panelRight) = (0, 1, 0) always
  vec3 panelRight = vec3(vOutward.z, 0.0, -vOutward.x);

  // ── View ray in tangent space (reuses viewDir from globe occlusion) ──
  vec3 tangentV = vec3(
    dot(viewDir, panelRight),
    viewDir.y,
    dot(viewDir, vOutward)
  );

  // Guard: skip POM when view is nearly edge-on (>~84°) or beyond 6 units
  // (distant glyphs are too small on screen for POM to be visible)
  float pomActive = step(0.1, abs(tangentV.z)) * step(fragDist, 6.0);
  // Sign-preserving clamp — naturally handles front/back face POM direction
  // without branching on gl_FrontFacing. Front face: tangentV.z < 0, back face: > 0.
  float safeTZ = sign(tangentV.z) * max(abs(tangentV.z), 0.1);

  // ── Distance-adaptive POM — far glyphs need fewer march steps ──
  float pomLod   = clamp(1.0 - fragDist * 0.1, 0.3, 1.0);
  int   numSteps = int(max(uPomSteps * pomLod, 3.0));
  float stepSize = 1.0 / float(numSteps);
  vec2  stepFace = (-tangentV.xy / safeTZ) * uDepth * stepSize;

  vec2  faceUV      = vUv;
  float currentH    = 1.0;
  vec2  currentFace = faceUV;
  vec2  prevFace    = faceUV;
  float prevH       = 1.0;

  for (int i = 0; i < 8; i++) {
    if (i >= numSteps) break;
    prevFace    = currentFace;
    prevH       = currentH;
    currentFace += stepFace * pomActive;
    currentFace  = clamp(currentFace, vec2(0.005), vec2(0.995));
    currentH    -= stepSize;
    float surfH  = sampleGlyph(currentFace, glyphIdx);
    if (surfH >= currentH) break;
  }

  // Binary refinement (3 bisection steps)
  vec2  loFace = prevFace,  hiFace = currentFace;
  float loH    = prevH,     hiH    = currentH;
  for (int b = 0; b < 3; b++) {
    vec2  midFace = (loFace + hiFace) * 0.5;
    float midH    = (loH + hiH) * 0.5;
    float s       = sampleGlyph(midFace, glyphIdx);
    if (s >= midH) { hiFace = midFace; hiH = midH; }
    else           { loFace = midFace; loH = midH; }
  }

  vec2 finalFace = mix(faceUV, (loFace + hiFace) * 0.5, pomActive);

  // Re-sample MSDF at POM-displaced position — fwidth() gives pixel-perfect
  // SDF anti-aliasing at every screen size instead of fixed smoothstep range
  float sdfG = sampleGlyph(finalFace, glyphIdx);
  float fw   = fwidth(sdfG) * 0.7;
  float mask = smoothstep(0.5 - fw, 0.5 + fw, sdfG);
  if (mask < 0.01) discard;

  // ── Per-glyph chromatic aberration — offset R/B channels at head ──
  float aberration = exp(-max(vDist, 0.0) * 1.5) * uGlyphChroma;
  float chromaOff  = aberration * 0.012;
  vec2 rUV = clamp(vec2(finalFace.x + chromaOff, finalFace.y), 0.005, 0.995);
  vec2 bUV = clamp(vec2(finalFace.x - chromaOff, finalFace.y), 0.005, 0.995);
  float rMask = smoothstep(0.5 - fw, 0.5 + fw, sampleGlyph(rUV, glyphIdx));
  float bMask = smoothstep(0.5 - fw, 0.5 + fw, sampleGlyph(bUV, glyphIdx));
  col2.r *= rMask / max(mask, 0.01);
  col2.b *= bMask / max(mask, 0.01);

  // Edge emission glow — exponential corona peaks sharply at stroke boundary
  // for a laser-etched holographic feel (no extra texture reads)
  float edgeDist = abs(sdfG - 0.5);
  float edgeGlow = exp(-edgeDist * 18.0) * 0.4;
  col2 += uColor * edgeGlow * trail;

  // ── Globe impact pulse — additive glow when head is near globe surface ──
  float impulseBright = vGlobeProx * trail * mask * 2.5 * uGlobeInteract;
  col2 += vec3(0.6, 1.0, 0.7) * impulseBright;

  // ── Normals + Lighting (skipped for dim trail glyphs — saves 4 taps) ──
  vec3 fakeN = vec3(0.0, 0.0, 1.0);  // flat default for dim glyphs
  if (trail > 0.25) {
    float eps = 0.04;
    float mL = sampleGlyph(finalFace + vec2(-eps,  0.0), glyphIdx);
    float mR = sampleGlyph(finalFace + vec2( eps,  0.0), glyphIdx);
    float mD = sampleGlyph(finalFace + vec2( 0.0, -eps), glyphIdx);
    float mU = sampleGlyph(finalFace + vec2( 0.0,  eps), glyphIdx);

    float Kx = mR - mL;
    float Ky = mU - mD;
    Kx *= gl_FrontFacing ? 1.0 : -1.0;  // back-face gradient correction

    fakeN = normalize(vec3(-Kx * uNormalStrength, -Ky * uNormalStrength, 1.0));
  }

  vec3 localLight = normalize(vec3(
    dot(uLightDir, panelRight),
    uLightDir.y,
    dot(uLightDir, vOutward)
  ));
  float diffuse = max(0.0, dot(fakeN, localLight));
  float spec    = pow(max(0.0, dot(fakeN, normalize(localLight + vec3(0.0, 0.0, 1.0)))), 24.0);

  col2 = col2 * (0.65 + 0.35 * diffuse) + tintedColor * spec * 0.8;

  float rawBright  = trail * mask * vAlpha * vDepthDim;
  float contrast   = pow(rawBright, 1.3);
  float alpha = contrast * uGlobalAlpha * occlude * vBootFade * vDeathFade;

  if (alpha < 0.015) discard;

  gl_FragColor = vec4(col2 * alpha, alpha);
}
`,as={uniforms:{tDiffuse:{value:null},uLightPos:{value:null},uDensity:{value:.93},uDecay:{value:.96},uWeight:{value:.35},uExposure:{value:.45},uClampMax:{value:1},uEnabled:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2  uLightPos;
    uniform float uDensity;
    uniform float uDecay;
    uniform float uWeight;
    uniform float uExposure;
    uniform float uClampMax;
    uniform float uEnabled;
    varying vec2  vUv;

    const int NUM_SAMPLES = 80;

    void main() {
      vec4 base = texture2D(tDiffuse, vUv);
      if (uEnabled < 0.5) { gl_FragColor = base; return; }

      vec2 delta = (vUv - uLightPos) * (uDensity / float(NUM_SAMPLES));
      vec2 uv    = vUv;
      float decay = 1.0;
      vec4  rays  = vec4(0.0);

      for (int i = 0; i < NUM_SAMPLES; i++) {
        uv -= delta;
        vec4 s = texture2D(tDiffuse, uv);
        s     *= decay * uWeight;
        rays  += s;
        decay *= uDecay;
      }

      rays *= uExposure;
      rays  = min(rays, vec4(uClampMax));
      gl_FragColor = base + rays;
    }
  `},ns=[..."アウエオカキケコサシスセソタツテナニヌネ",..."ハヒホマミムメモヤヨラリワー",..."012345789z",...':."*+<>|¦╌▪꞊'],is=8,ss=8,ta=600,At=120,rs=.12,ls=.08,cs=16,oa=3.5,ds=8;function us(t){const e=new _a().load(t);return e.flipY=!1,e.minFilter=Mn,e.magFilter=Cn,e.colorSpace=An,e.generateMipmaps=!0,{tex:e,count:ns.length}}function hs(){const t=new fa,e=new rt(1,1);t.index=e.index.clone(),t.setAttribute("position",e.getAttribute("position").clone()),t.setAttribute("uv",e.getAttribute("uv").clone()),e.dispose();const o=ta*At,a=new Float32Array(o),n=new Float32Array(o),i=new Float32Array(o*4),s=new Float32Array(o*4);for(let l=0;l<ta;l++){const c=Math.random()*Math.PI*2,d=1-2*Math.random(),h=Math.sqrt(1-d*d),r=Math.pow(Math.random(),.12),u=oa+r*(ds-oa),m=h*Math.cos(c)*u,f=h*Math.sin(c)*u,y=d*u+(Math.random()-.5)*2,v=.4+Math.random()*1.87,x=Math.random(),p=.5+Math.random()*1,w=.18+Math.random()*.72,_=.015+Math.random()*.035;for(let b=0;b<At;b++){const S=l*At+b;a[S]=l,n[S]=b;const E=S*4;i[E]=m,i[E+1]=f,i[E+2]=v,i[E+3]=x,s[E]=y,s[E+1]=p,s[E+2]=w,s[E+3]=_}}return t.setAttribute("aColIdx",new Ee(a,1)),t.setAttribute("aRowIdx",new Ee(n,1)),t.setAttribute("aColA",new Ee(i,4)),t.setAttribute("aColB",new Ee(s,4)),t.instanceCount=o,t}function ms(t,e,o,a){const n=a.clientWidth||1,i=a.clientHeight||1,s=new _o(t);s.addPass(new wo(e,o));const l=new Re(new k(n,i),1.15,.45,.2);s.addPass(l);const c=new _e(Qi);c.enabled=!0,s.addPass(c);const d=t.getDrawingBufferSize(new k);let h=new wa(d.x,d.y);const r=new _e(Xi);r.uniforms.tPrev.value=h;const u=r.render.bind(r);r.render=function(p,w,_,b,S){u(p,w,_,b,S),p.copyFramebufferToTexture(this.uniforms.tPrev.value)},s.addPass(r);const m=new _e(es);m.enabled=!0,m.uniforms.uBlurStrength.value=.002,s.addPass(m);const f=new _e(Ji);f.enabled=!0,f.uniforms.uAspect.value=n/i,s.addPass(f);const g=new _e(Zi);s.addPass(g);const y=new _e(as);y.uniforms.uLightPos.value=new k(.5,.75),y.enabled=!0,s.addPass(y);const v=new _e(Ki),x=t.getPixelRatio();return v.uniforms.resolution.value.set(1/(n*x),1/(i*x)),s.addPass(v),{composer:s,bloomPass:l,heatPass:c,phosphorPass:r,phosphorTex:h,softenPass:m,streakPass:f,holoPass:g,godRaysPass:y,fxaaPass:v}}const kt=new Map;function fs(t,e={}){kt.has(t)&&aa(t);const o=t.querySelector("canvas[data-matrix-rain]");o&&o.remove();const{color:a="#00ff70",opacity:n=.82,syncCamera:i=null}=e,s=new O(a),l=us("/data/matrixcode_msdf.png"),c=new mo({antialias:!1,alpha:!0});c.setPixelRatio(Math.min(window.devicePixelRatio,2)),c.setSize(t.clientWidth||1,t.clientHeight||1);const d=c.domElement;d.dataset.matrixRain="1",d.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;",t.appendChild(d);const h=new fo,r=new ya(45,(t.clientWidth||1)/(t.clientHeight||1),.1,60);r.position.set(0,0,3),r.lookAt(0,0,0);const u=hs(),m={uGlyphTex:{value:l.tex},uGlyphCount:{value:l.count},uAtlasCols:{value:is},uAtlasGrid:{value:ss},uTime:{value:0},uCellW:{value:rs},uCellH:{value:ls},uWorldH:{value:cs},uNRows:{value:At},uColor:{value:new P(s.r,s.g,s.b)},uGlobalAlpha:{value:n},uDepth:{value:.04},uPomSteps:{value:6},uNormalStrength:{value:6},uLightDir:{value:new P(-.4,.8,.5).normalize()},uGlobeInteract:{value:1},uGlyphChroma:{value:1}},f=new oe({uniforms:m,vertexShader:ts,fragmentShader:os,transparent:!0,depthWrite:!1,blending:En,blendEquation:xn,blendSrc:dt,blendDst:dt,blendEquationAlpha:Sn,blendSrcAlpha:dt,blendDstAlpha:dt,side:ba,extensions:{derivatives:!0}}),g=new se(u,f);g.frustumCulled=!1,g.renderOrder=1,h.add(g);let{composer:y,bloomPass:v,heatPass:x,phosphorPass:p,phosphorTex:w,softenPass:_,streakPass:b,holoPass:S,godRaysPass:E,fxaaPass:C}=ms(c,h,r,t);const A={renderer:c,composer:y,bloomPass:v,heatPass:x,softenPass:_,phosphorPass:p,phosphorTex:w,holoPass:S,streakPass:b,godRaysPass:E,fxaaPass:C,material:f,geom:u,atlas:l,ro:null,animId:0,syncCamera:i,burstBloomEnabled:!0};kt.set(t,A);let B=0,U=0,j=-1;function Me(F){A.animId=requestAnimationFrame(Me);const R=F*.001,le=R-B;if(B=R,m.uTime.value=R,S.uniforms.time.value=R,x.uniforms.uTime.value=R,b.uniforms.uTime.value=R,A.burstBloomEnabled){const ce=Math.floor(R/4);if(ce!==j&&(j=ce,U=.3),U>0){U=Math.max(0,U-le);const de=1-U/.3;v.threshold=de<.2?Pt.lerp(.2,.1,de/.2):Pt.lerp(.1,.2,(de-.2)/.8)}else v.threshold=.2}else v.threshold=.2;if(A.syncCamera&&(r.position.copy(A.syncCamera.position),r.quaternion.copy(A.syncCamera.quaternion),r.fov=A.syncCamera.fov,r.near=A.syncCamera.near,r.far=A.syncCamera.far,r.updateProjectionMatrix()),r.position.lengthSq()>.001){const ce=Math.atan2(r.position.x,r.position.z)+Math.PI/3;m.uLightDir.value.set(Math.sin(ce)*.6,.8,Math.cos(ce)*.6).normalize()}A.composer.render()}A.animId=requestAnimationFrame(Me);let Ce=!1;return A.ro=new ResizeObserver(()=>{Ce||(Ce=!0,requestAnimationFrame(()=>{Ce=!1;const F=t.clientWidth||1,R=t.clientHeight||1;c.setSize(F,R),A.composer.setSize(F,R),A.bloomPass.resolution.set(F,R);const le=c.getPixelRatio();A.fxaaPass.uniforms.resolution.value.set(1/(F*le),1/(R*le)),A.streakPass.uniforms.uAspect.value=F/R,r.aspect=F/R,r.updateProjectionMatrix();const ce=c.getDrawingBufferSize(new k);A.phosphorTex.dispose();const de=new wa(ce.x,ce.y);A.phosphorTex=de,A.phosphorPass.uniforms.tPrev.value=de}))}),A.ro.observe(t),{destroy(){aa(t)},setColor(F){const R=new O(F);m.uColor.value.set(R.r,R.g,R.b)},setOpacity(F){m.uGlobalAlpha.value=F},setDepth(F){m.uDepth.value=F},setNormalStrength(F){m.uNormalStrength.value=F},setSoften(F,R){_.enabled=F,R!==void 0&&(_.uniforms.uBlurStrength.value=R)},setHeat(F,R){x.enabled=F,R!==void 0&&(x.uniforms.uHeatAmt.value=R)},setStreaks(F,R){b.enabled=F,R!==void 0&&(b.uniforms.uStreakAmt.value=R)},setBurstBloom(F){A.burstBloomEnabled=F},setGlobeInteract(F){m.uGlobeInteract.value=F?1:0},setGlyphChroma(F,R){m.uGlyphChroma.value=F?R??1:0},setGodRays(F,R,le,ce,de,Xe,$e){E.uniforms.uEnabled.value=F?1:0,R!==void 0&&(E.uniforms.uLightPos.value.x=R),le!==void 0&&(E.uniforms.uLightPos.value.y=le),ce!==void 0&&(E.uniforms.uDensity.value=ce),de!==void 0&&(E.uniforms.uDecay.value=de),Xe!==void 0&&(E.uniforms.uWeight.value=Xe),$e!==void 0&&(E.uniforms.uExposure.value=$e)}}}function aa(t){const e=kt.get(t);e&&(cancelAnimationFrame(e.animId),e.ro.disconnect(),e.holoPass&&e.holoPass.material.dispose(),e.phosphorPass&&e.phosphorPass.material.dispose(),e.phosphorTex&&e.phosphorTex.dispose(),e.composer.dispose(),e.material.dispose(),e.geom.dispose(),e.atlas.tex.dispose(),e.renderer.dispose(),e.renderer.domElement.remove(),kt.delete(t))}const Ha=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,ps=`
varying vec2 vUv;
uniform vec3  uVoidColor;
uniform float uTime;

float h2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Smooth value noise — interpolate between lattice corners
float vn(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);  // smoothstep curve
  return mix(
    mix(h2(i),                h2(i + vec2(1.0, 0.0)), u.x),
    mix(h2(i + vec2(0.0, 1.0)), h2(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// 4-octave FBM using smooth value noise (no block artifacts)
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vn(p);
    p  = p * 2.0 + vec2(13.7, 31.2);  // decorrelating offset per octave
    a *= 0.5;
  }
  return v * 2.0 - 1.0;  // remap [0,1] → [-1,1]
}

void main() {
  float r    = length(vUv - 0.5) * 2.0;
  vec3  base = mix(uVoidColor * 1.8, uVoidColor, r * r);

  // Subtle animated nebular texture
  float noise = fbm(vUv * 4.0 + uTime * 0.025) * 0.032;

  // Soft ring glow at the disc boundary (subtle phosphor edge)
  float edge  = exp(-pow(abs(r - 0.96), 2.0) * 55.0) * 0.055;

  float bnd  = 0.48 + sin(uTime * 1.3) * 0.003;
  float disc = 1.0 - smoothstep(bnd, bnd + 0.015, r * 0.5);

  gl_FragColor = vec4(base + noise + uVoidColor * edge * 2.5, disc);
}`,gs=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,vs=`
varying vec2 vUv;
uniform float uAngle;
uniform float uArcWidth;
uniform vec3  uColor;
uniform float uStaticAmt;
#define TWO_PI 6.28318530718
void main() {
  vec2  p    = vUv - 0.5;
  float r    = length(p);
  if (r > 0.499) discard;
  float a    = atan(p.x, p.y);
  float diff = mod(uAngle - a + TWO_PI, TWO_PI);
  if (diff > uArcWidth) discard;

  float t      = diff / uArcWidth;
  float radMask = max(0.0, 1.0 - r * 1.9) * smoothstep(0.0, 0.04, r);

  // Fan trail: quadratic falloff from leading edge
  float fan = pow(1.0 - t, 2.0) * radMask;

  // Leading-edge spike: thin bright arc at the sweep arm position (diff ≈ 0)
  float lead = smoothstep(0.055, 0.0, diff) * radMask * 1.5;

  float intensity = (fan + lead) * uStaticAmt;
  float alpha     = max(fan * 0.8, lead * 0.9);

  gl_FragColor = vec4(uColor * intensity * 0.9, alpha);
}`,ys=`
attribute float a_type;
attribute float a_age;
attribute float a_phase;
attribute float a_sweepFade;
varying float vType;
varying float vAge;
varying float vPhase;
varying float vSweepFade;
varying vec2  vUv;
void main() {
  vType      = a_type;
  vAge       = a_age;
  vPhase     = a_phase;
  vSweepFade = a_sweepFade;
  vUv        = uv;
  #ifdef USE_INSTANCING
    vec4 wp = instanceMatrix * vec4(position, 1.0);
  #else
    vec4 wp = vec4(position, 1.0);
  #endif
  gl_Position = projectionMatrix * modelViewMatrix * wp;
}`,bs=`
varying float vType;
varying float vAge;
varying float vPhase;
varying float vSweepFade;
varying vec2  vUv;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
void main() {
  vec2  p = vUv - 0.5;
  float r = length(p);
  if (r > 0.5) discard;

  float core  = 1.0 - smoothstep(0.10, 0.40, r);
  float rim   = smoothstep(0.35, 0.43, r) * (1.0 - smoothstep(0.43, 0.50, r));
  float shape = core + rim * 0.6;

  vec3  color;
  float baseAlpha;
  if      (vType < 0.5) { color = uC0; baseAlpha = 1.0; }
  else if (vType < 1.5) { color = uC1; baseAlpha = 1.0; }
  else if (vType < 2.5) { color = uC2; baseAlpha = 1.0; }
  else                  { color = uC3; baseAlpha = 0.15; }

  // Sweep fade: contacts dim between sweep passes (5-15% floor)
  float sweepAlpha = vType > 2.5 ? 0.15 : vSweepFade;

  float detect = vAge < 0.08 ? mix(1.6, 1.0, vAge / 0.08) : 1.0;
  float alpha  = shape * sweepAlpha * baseAlpha * detect;
  gl_FragColor = vec4(color * shape * detect, alpha);
}`,_s=`
varying float vType;
varying float vAge;
varying float vPhase;
varying float vSweepFade;
varying vec2  vUv;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;
void main() {
  if (vType > 2.5) discard;
  if (vAge  > 0.85) discard;

  if (vPhase >= 1.0) discard;

  vec2  p = vUv - 0.5;
  float r = length(p) * 2.0;
  if (r > 1.0) discard;

  float phase = vPhase;
  float ringR = 0.05 + phase * 0.90;
  float ringW = max(0.004, 0.07 * (1.0 - phase * 0.5));
  float ring  = max(0.0, 1.0 - abs(r - ringR) / ringW);

  if (vType > 1.5) {
    float ph2   = fract(vPhase + 0.4);
    float r2    = 0.05 + ph2 * 0.90;
    float w2    = max(0.004, 0.07 * (1.0 - ph2 * 0.5));
    float ring2 = max(0.0, 1.0 - abs(r - r2) / w2);
    ring = max(ring, ring2 * (1.0 - ph2));
  }

  if (ring < 0.02) discard;

  vec3 color;
  if      (vType < 0.5) color = uC0;
  else if (vType < 1.5) color = uC1;
  else                  color = uC2;

  float phaseAlpha = pow(1.0 - phase, 2.5);
  gl_FragColor     = vec4(color, ring * vSweepFade * phaseAlpha * 0.75);
}`,ws=`
varying vec2 vUv;
uniform vec3  uColor;
uniform float uIntensity;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float glow = exp(-r * r * 8.0) * uIntensity;
  if (glow < 0.005) discard;
  gl_FragColor = vec4(uColor * glow, glow * 0.6);
}`,Ss={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.38},scanlineOpacity:{value:.07},aberrationAmt:{value:.001}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float     time;
    uniform float     vignetteStrength;
    uniform float     scanlineOpacity;
    uniform float     aberrationAmt;
    varying vec2      vUv;

    void main() {
      // Edge-weighted chromatic aberration
      vec2  ctr    = vUv - 0.5;
      float edgeSq = dot(ctr, ctr) * 4.0;
      float s      = aberrationAmt * edgeSq;

      vec2 uvR = clamp(vUv + ctr * s, 0.001, 0.999);
      vec2 uvB = clamp(vUv - ctr * s, 0.001, 0.999);

      float r = texture2D(tDiffuse, uvR).r;
      float g = texture2D(tDiffuse, vUv ).g;
      float b = texture2D(tDiffuse, uvB ).b;

      vec3 col = vec3(r, g, b);

      // Scanlines — 320 lines matches a compact radar panel
      float scan = sin(vUv.y * 320.0) * 0.5 + 0.5;
      col *= 1.0 - scanlineOpacity * (1.0 - scan);

      // Radial vignette
      float vig = 1.0 - edgeSq * vignetteStrength;
      col *= vig;

      // alpha:false renderer — writing 1.0 is correct and required
      gl_FragColor = vec4(col, 1.0);
    }
  `},z=Math.PI*2,we=32,Tt=new WeakMap;let xs=0;function Es(){return`T-${String(++xs).padStart(2,"0")}`}function tt(t){return getComputedStyle(document.documentElement).getPropertyValue(t).trim()}function Le(t){const e=new O().setStyle(t||"#000000");return[e.r,e.g,e.b]}function Nt(t,e,o){return t+(e-t)*Math.max(0,Math.min(1,o))}function Ms(t,e){const o=((t-e)%z+z)%z;return o>Math.PI?o-z:o}function za(){return{neonCyan:tt("--neon-cyan")||"#00f0ff",neonGreen:tt("--neon-green")||"#00ff9d",neonAlert:tt("--neon-alert")||"#ff00cc",neonWarn:tt("--neon-warn")||"#ffb300",voidColor:tt("--void")||"#05080f"}}function na(t,e){const o=t.ringHzBase;return e==="friendly"?o*.6:e==="hostile"?o*1.5:o}function Cs(t){const e=Nt(.1,.85,t),o=Nt(.3,.05,t),a=Math.random();return a<e?"hostile":a<e+o?"friendly":"neutral"}function As(t){return t==="friendly"?0:t==="neutral"?1:t==="hostile"?2:3}let ot=null,no=!1;function Ts(t=.08){if(!no)try{ot||(ot=new Audio("/sonar-ping.mp3")),ot.volume=Math.min(1,Math.max(0,t)),ot.currentTime=0,ot.play().catch(()=>{})}catch{}}function Ls(){no=!no}function Is(t){const o=new Float32Array(192);for(let n=0;n<64;n++){const i=n/64*z;o[n*3]=Math.sin(i)*t,o[n*3+1]=Math.cos(i)*t,o[n*3+2]=0}const a=new De;return a.setAttribute("position",new vo(o,3)),a}function Ds(t){const o=new Float32Array(192);for(let n=0;n<32;n++){const i=n/32*z,s=n%8===0?t*.92:t*.96,l=n*6;o[l]=Math.sin(i)*s,o[l+1]=Math.cos(i)*s,o[l+2]=0,o[l+3]=Math.sin(i)*t,o[l+4]=Math.cos(i)*t,o[l+5]=0}const a=new De;return a.setAttribute("position",new vo(o,3)),a}function Rs(t){const{scene:e,R:o,theme:a}=t;t.backgroundMesh&&(t.backgroundMesh.geometry.dispose(),t.backgroundMesh.material.dispose(),e.remove(t.backgroundMesh));const n=new O(a.voidColor),i=new rt(o*2,o*2),s=new oe({vertexShader:Ha,fragmentShader:ps,uniforms:{uVoidColor:{value:new P(n.r,n.g,n.b)},uTime:{value:0}},transparent:!0,depthWrite:!0,blending:Et}),l=new se(i,s);l.renderOrder=0,e.add(l),t.backgroundMesh=l}function Ps(t){const{scene:e,R:o,theme:a}=t;t.centerGlowMesh&&(t.centerGlowMesh.geometry.dispose(),t.centerGlowMesh.material.dispose(),e.remove(t.centerGlowMesh));const n=new O(a.neonCyan),i=o*.5,s=new rt(i,i),l=new oe({vertexShader:Ha,fragmentShader:ws,uniforms:{uColor:{value:new P(n.r,n.g,n.b)},uIntensity:{value:0}},transparent:!0,depthWrite:!1,blending:$}),c=new se(s,l);c.renderOrder=6,e.add(c),t.centerGlowMesh=c}function Os(t){const{scene:e,R:o,theme:a}=t;t.ringMeshes&&(t.ringMeshes.forEach(d=>{d.geometry.dispose(),e.remove(d)}),t.matRingInner&&t.matRingInner.dispose(),t.matRingOuter&&t.matRingOuter.dispose()),t.ticksMesh&&(t.ticksMesh.geometry.dispose(),t.matRingTicks&&t.matRingTicks.dispose(),e.remove(t.ticksMesh));const n=new Ne({color:new O(a.neonCyan),opacity:.18,transparent:!0,depthWrite:!1,blending:$}),i=new Ne({color:new O(a.neonCyan),opacity:.28,transparent:!0,depthWrite:!1,blending:$}),s=new Ne({color:new O(a.neonCyan),opacity:.22,transparent:!0,depthWrite:!1,blending:$}),l=[.2,.4,.6,.8,1];t.ringMeshes=l.map((d,h)=>{const r=new po(Is(d*o),h<4?n:i);return r.renderOrder=1,e.add(r),r});const c=new Tn(Ds(o),s);c.renderOrder=1,e.add(c),t.ticksMesh=c,t.matRingInner=n,t.matRingOuter=i,t.matRingTicks=s}function Bs(t){const{scene:e,R:o,theme:a}=t;t.sweepTrailMesh&&(t.sweepTrailMesh.geometry.dispose(),t.sweepTrailMesh.material.dispose(),e.remove(t.sweepTrailMesh)),t.sweepArmLine&&(t.sweepArmLine.geometry.dispose(),t.sweepArmLine.material.dispose(),e.remove(t.sweepArmLine));const n=new O(a.neonCyan),i=new P(n.r,n.g,n.b),s=new rt(o*2,o*2),l=new oe({vertexShader:gs,fragmentShader:vs,uniforms:{uAngle:{value:t.sweepAngle},uArcWidth:{value:Math.PI*.6},uColor:{value:i.clone()},uStaticAmt:{value:1}},transparent:!0,depthWrite:!1,blending:$}),c=new se(s,l);c.renderOrder=2,e.add(c),t.sweepTrailMesh=c;const d=new Float32Array([0,0,0,Math.sin(t.sweepAngle)*o,Math.cos(t.sweepAngle)*o,0]),h=new De;h.setAttribute("position",new vo(d,3));const r=new Ne({color:new O(a.neonCyan),opacity:.9,transparent:!0,depthWrite:!1,blending:$}),u=new go(h,r);u.renderOrder=3,e.add(u),t.sweepArmLine=u}function Fs(t){const{scene:e,theme:o}=t;t.contactDotsMesh&&(t.contactDotsMesh.geometry.dispose(),t.contactDotsMesh.material.dispose(),e.remove(t.contactDotsMesh)),t.contactRingsMesh&&(t.contactRingsMesh.geometry.dispose(),t.contactRingsMesh.material.dispose(),e.remove(t.contactRingsMesh));const a=Le(o.neonGreen),n=Le(o.neonWarn),i=Le(o.neonAlert),s=Le(o.neonCyan);function l(h,r,u){const m=new rt(1,1),f=new Ee(new Float32Array(we).fill(0),1),g=new Ee(new Float32Array(we).fill(1),1),y=new Ee(new Float32Array(we).map(()=>Math.random()),1),v=new Ee(new Float32Array(we).fill(0),1);f.setUsage(Qe),g.setUsage(Qe),y.setUsage(Qe),v.setUsage(Qe),m.setAttribute("a_type",f),m.setAttribute("a_age",g),m.setAttribute("a_phase",y),m.setAttribute("a_sweepFade",v);const x=new oe({vertexShader:ys,fragmentShader:h,uniforms:r,transparent:!0,depthWrite:!1,blending:$}),p=new Ln(m,x,we);p.renderOrder=u,p.instanceMatrix.setUsage(Qe);const w=new Sa;w.scale.setScalar(0),w.updateMatrix();for(let _=0;_<we;_++)p.setMatrixAt(_,w.matrix);return p.instanceMatrix.needsUpdate=!0,e.add(p),p}const c={uC0:{value:new P(...a)},uC1:{value:new P(...n)},uC2:{value:new P(...i)},uC3:{value:new P(...s)}},d={uC0:{value:new P(...a)},uC1:{value:new P(...n)},uC2:{value:new P(...i)}};t.contactDotsMesh=l(bs,c,5),t.contactRingsMesh=l(_s,d,4)}function ks(t){const{element:e,overlay:o,R:a}=t,n=e.clientWidth/2,i=e.clientHeight/2;t.staticLabelEls.forEach(h=>h.remove()),t.staticLabelEls=[];const s=[2,4,6,8];[.2,.4,.6,.8].forEach((h,r)=>{const u=document.createElement("span");u.className="s9-radar__ring-label",u.textContent=`${s[r]}km`,u.style.left=`${n+h*a+4}px`,u.style.top=`${i}px`,u.style.transform="translateY(-50%)",o.appendChild(u),t.staticLabelEls.push(u)});const c=[["N",0],["NE",z*.125],["E",z*.25],["SE",z*.375],["S",z*.5],["SW",z*.625],["W",z*.75],["NW",z*.875]],d=a*1.05;c.forEach(([h,r])=>{const u=document.createElement("span");u.className="s9-radar__cardinal-label",u.textContent=h,u.style.left=`${n+Math.sin(r)*d}px`,u.style.top=`${i-Math.cos(r)*d}px`,u.style.transform="translate(-50%, -50%)",o.appendChild(u),t.staticLabelEls.push(u)})}function Ns(t){Rs(t),Ps(t),Os(t),Bs(t),ks(t),t.contactDotsMesh?Us(t):Fs(t)}function Us(t){const{contacts:e,dummy:o,contactDotsMesh:a,contactRingsMesh:n,R:i}=t;!a||!n||(e.forEach((s,l)=>{if(!s)o.scale.setScalar(0),o.position.set(0,0,0),o.updateMatrix(),a.setMatrixAt(l,o.matrix),n.setMatrixAt(l,o.matrix);else{const c=s.age<.08?Nt(0,8,s.age/.08):8;o.position.set(Math.sin(s.angle)*s.range*i,Math.cos(s.angle)*s.range*i,0),o.scale.setScalar(c),o.updateMatrix(),a.setMatrixAt(l,o.matrix),o.scale.setScalar(c>0?i*1.5:0),o.updateMatrix(),n.setMatrixAt(l,o.matrix)}}),a.instanceMatrix.needsUpdate=!0,n.instanceMatrix.needsUpdate=!0)}function io(t,e){const o=t.contacts[e];o&&(o.labelEl&&(o.labelEl.remove(),o.labelEl=null),t.contactDotsMesh&&t.contactRingsMesh&&(t.dummy.scale.setScalar(0),t.dummy.position.set(0,0,0),t.dummy.updateMatrix(),t.contactDotsMesh.setMatrixAt(e,t.dummy.matrix),t.contactRingsMesh.setMatrixAt(e,t.dummy.matrix),t.contactDotsMesh.instanceMatrix.needsUpdate=!0,t.contactRingsMesh.instanceMatrix.needsUpdate=!0),t.contacts[e]=null)}function xo(t,e,o,a,n){var y;const i=t.opts.maxContacts;if(t.contacts.filter(Boolean).length>=i){let v=-1,x=-1;for(let p=0;p<we;p++)((y=t.contacts[p])==null?void 0:y.type)==="ghost"&&t.contacts[p].age>x&&(v=p,x=t.contacts[p].age);if(v>=0)io(t,v);else return console.warn("[pulse-radar] contact pool full"),null}let l=-1;for(let v=0;v<we;v++)if(!t.contacts[v]){l=v;break}if(l<0)return null;const c=a==="ghost",d=(e%z+z)%z,h=Math.max(0,Math.min(1,o)),r=Math.sin(d)*h,u=Math.cos(d)*h,m=c?0:.01+Math.random()*.025,f=Math.random()*z,g={id:n||Es(),angle:d,range:h,wx:r,wy:u,wvx:c?0:Math.sin(f)*m,wvy:c?0:Math.cos(f)*m,type:a,age:c?.85:0,maxAge:c?3e3:8e3+Math.random()*1e4,bornAt:performance.now(),phase:c?Math.random()*.3:1,lastSweep:-1/0,ghostAngle:null,ghostRange:null,ghostSpawned:!1,instIdx:l,labelEl:null,sweepAlpha:c?.15:1,fadeTimeMs:4200*(.88+Math.random()*.24),revealed:c,revealTime:c?performance.now():null};if(!c){const v=document.createElement("span");v.className=`s9-radar__label s9-radar__label--${a}`,v.textContent=a==="hostile"?`${g.id} ⚠HC`:g.id,t.labelsDiv.appendChild(v),g.labelEl=v}return t.contacts[l]=g,g}function Lt(t){if(t.destroyed||t.reducedMotion)return;const e=Math.max(.05,t.opts.contactDensity),o=Nt(3e3,600,t.threatLevel)/e,a=(Math.random()-.5)*o*.4,n=Math.max(200,o+a);t.spawnTimer=setTimeout(()=>{!t.destroyed&&!t.reducedMotion&&(Gs(t),Lt(t))},n)}function Gs(t){const e=t.contacts.filter(i=>i&&i.type!=="ghost"),o=e.length>0&&Math.random()<.3,a=t.sweepAngle;let n;if(o){const i=e[Math.floor(Math.random()*e.length)];n=Math.max(.15,Math.min(.97,i.range+(Math.random()-.5)*.3))}else n=.15+Math.random()*.82;xo(t,a,n,Cs(t.threatLevel))}function Hs(t,e){if(t.reducedMotion)return;const o=t.sweepAngle;t.sweepAngle=(t.sweepAngle+t.sweepSpeed*e/1e3)%z,t.sweepAngle<o&&(Ts(.06),t.centerGlowIntensity=1),t.centerGlowIntensity>0&&(t.centerGlowIntensity*=Math.pow(.001,e/600),t.centerGlowIntensity<.005&&(t.centerGlowIntensity=0),t.centerGlowMesh&&(t.centerGlowMesh.material.uniforms.uIntensity.value=t.centerGlowIntensity));const a=performance.now();if(t.staticNextAt===null&&(t.staticNextAt=a+7e3+Math.random()*5e3),a>=t.staticNextAt&&!t.staticActive&&(t.staticActive=!0,t.staticEndAt=a+60+Math.random()*40,t.staticNextAt=t.staticEndAt+6e3+Math.random()*4e3),t.staticActive&&(t.sweepTrailMesh.material.uniforms.uStaticAmt.value=.5+Math.random()*.5,a>=t.staticEndAt&&(t.staticActive=!1,t.sweepTrailMesh.material.uniforms.uStaticAmt.value=1)),t.sweepTrailMesh&&(t.sweepTrailMesh.material.uniforms.uAngle.value=t.sweepAngle),t.sweepArmLine){const{R:n}=t,i=t.sweepArmLine.geometry.attributes.position;i.setXYZ(0,0,0,0),i.setXYZ(1,Math.sin(t.sweepAngle)*n,Math.cos(t.sweepAngle)*n,0),i.needsUpdate=!0}}function zs(t,e){const{contacts:o,sweepAngle:a}=t,n=t.now;o.forEach((i,s)=>{if(i){if(i.type!=="ghost"&&(i.wx+=i.wvx*e/1e3,i.wy+=i.wvy*e/1e3,Math.hypot(i.wx,i.wy)>1.02)){io(t,s);return}if(i.age+=e/i.maxAge,i.type!=="ghost"&&!t.reducedMotion){const l=(Math.atan2(i.wx,i.wy)%z+z)%z;Math.abs(Ms(a,l))<.12&&n-i.lastSweep>800&&(i.angle=l,i.range=Math.hypot(i.wx,i.wy),i.phase=0,i.lastSweep=n,i.sweepAlpha=1,i.revealed||(i.revealed=!0,i.revealTime=n))}if(i.type!=="ghost"){if(i.phase<1){const l=i.age>.65&&i.age<.85;i.phase=Math.min(1,i.phase+na(t,i.type)*(l?.5:1)*e/1e3)}}else i.phase+=na(t,"neutral")*e/1e3;if(i.type!=="ghost"&&i.revealed){const l=.05+.1*i.range,c=n-i.lastSweep,d=Math.min(1,c/i.fadeTimeMs);i.sweepAlpha=l+(1-l)*Math.pow(1-d,1.025)}i.type!=="ghost"&&!i.ghostSpawned&&i.age>=.65&&i.revealed&&(i.ghostAngle=i.angle,i.ghostRange=i.range,i.ghostSpawned=!0,xo(t,i.ghostAngle,i.ghostRange,"ghost")),i.age>=1&&io(t,s)}})}function Ws(t){const{contacts:e,dummy:o,contactDotsMesh:a,contactRingsMesh:n,R:i}=t;if(!a||!n)return;let s=!1;e.forEach((l,c)=>{if(!l)return;s=!0;let d;l.revealed?d=Math.min(1,(t.now-l.revealTime)/300)*8:d=0;const h=Math.sin(l.angle)*l.range*i,r=Math.cos(l.angle)*l.range*i;o.position.set(h,r,0),o.scale.setScalar(d),o.updateMatrix(),a.setMatrixAt(c,o.matrix),o.scale.setScalar(d>0?i*1.5:0),o.updateMatrix(),n.setMatrixAt(c,o.matrix);const u=As(l.type);a.geometry.attributes.a_type.setX(c,u),a.geometry.attributes.a_age.setX(c,l.age),a.geometry.attributes.a_phase.setX(c,l.phase),a.geometry.attributes.a_sweepFade.setX(c,l.sweepAlpha),n.geometry.attributes.a_type.setX(c,u),n.geometry.attributes.a_age.setX(c,l.age),n.geometry.attributes.a_phase.setX(c,l.phase),n.geometry.attributes.a_sweepFade.setX(c,l.sweepAlpha)}),s&&(a.instanceMatrix.needsUpdate=!0,n.instanceMatrix.needsUpdate=!0,a.geometry.attributes.a_type.needsUpdate=!0,a.geometry.attributes.a_age.needsUpdate=!0,a.geometry.attributes.a_phase.needsUpdate=!0,a.geometry.attributes.a_sweepFade.needsUpdate=!0,n.geometry.attributes.a_type.needsUpdate=!0,n.geometry.attributes.a_age.needsUpdate=!0,n.geometry.attributes.a_phase.needsUpdate=!0,n.geometry.attributes.a_sweepFade.needsUpdate=!0)}function $s(t){const{contacts:e,element:o,R:a}=t,n=o.clientWidth/2,i=o.clientHeight/2;e.forEach(s=>{if(!(s!=null&&s.labelEl))return;if(!s.revealed){s.labelEl.style.opacity="0";return}const l=n+Math.sin(s.angle)*s.range*a,c=i-Math.cos(s.angle)*s.range*a;s.labelEl.style.left=`${l+7}px`,s.labelEl.style.top=`${c-6}px`,s.labelEl.style.opacity=String(s.sweepAlpha)})}function js(t){if(!t.footerEl)return;const e=t.contacts.filter(a=>a&&a.type!=="ghost").length,o=(z/t.sweepSpeed).toFixed(1);t.footerEl.textContent=`CONTACTS: ${e} | SWEEP: ${o}s`}function so(t,e){if(t.destroyed||!t.rafRunning){t.rafId=null;return}const o=Math.min(e-(t.lastTs??e),100);t.lastTs=e,t.now=e,t.R>0&&(t.backgroundMesh&&(t.backgroundMesh.material.uniforms.uTime.value=e/1e3),t.holoPass&&(t.holoPass.uniforms.time.value=e/1e3),Hs(t,o),zs(t,o),Ws(t),$s(t),js(t),t.composer.render()),t.rafId=requestAnimationFrame(a=>so(t,a))}function Vs(t,e={}){if(Tt.has(t)){console.warn("[pulse-radar] already initialised");const _=Tt.get(t);return{setRadarThreatLevel:_.setRadarThreatLevel,injectContact:_.injectContact}}const o={sweepPeriod:2690,contactDensity:Math.max(0,Math.min(1,e.contactDensity??.5)),threatLevel:Math.max(0,Math.min(1,e.threatLevel??0)),primaryColor:e.primaryColor??null,maxContacts:Math.max(4,Math.min(we,e.maxContacts??16))},a=za(),n=document.createElement("canvas");n.className="s9-radar__canvas";const i=document.createElement("div");i.className="s9-radar__overlay";const s=document.createElement("div");s.className="s9-radar__labels",i.appendChild(s),t.appendChild(n),t.appendChild(i),t.style.cursor="pointer",t.addEventListener("click",()=>{Ls()});let l;try{l=new mo({canvas:n,antialias:!0,alpha:!1,premultipliedAlpha:!1})}catch(_){return console.error("[pulse-radar] WebGL context creation failed",_),n.remove(),i.remove(),t.dispatchEvent(new CustomEvent("pulse-radar:init-failed",{bubbles:!0,detail:{error:_}})),{setRadarThreatLevel:()=>{},injectContact:()=>""}}l.setClearColor(new O(a.voidColor),1),l.setPixelRatio(Math.min(devicePixelRatio,2));const c=new fo,d=new ma(-1,1,1,-1,.1,100);d.position.z=10;const h=new _o(l);h.addPass(new wo(c,d));const r=new Re(new k(t.clientWidth||200,t.clientHeight||200),.8,.65,.25);h.addPass(r);const u=new _e(Ss);h.addPass(u);const m={element:t,canvas:n,overlay:i,labelsDiv:s,renderer:l,scene:c,camera:d,opts:o,theme:a,R:0,sweepAngle:Math.random()*z,sweepSpeed:z/(o.sweepPeriod/1e3),ringPopDuration:o.sweepPeriod/1e3-.5,threatLevel:o.threatLevel,contacts:new Array(we).fill(null),dummy:new Sa,footerEl:document.getElementById("radar-contacts"),staticLabelEls:[],staticActive:!1,staticNextAt:null,staticEndAt:null,rafId:null,rafRunning:!1,destroyed:!1,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,centerGlowIntensity:0,centerGlowMesh:null,composer:h,bloomPass:r,holoPass:u,backgroundMesh:null,ringMeshes:null,ticksMesh:null,sweepTrailMesh:null,sweepArmLine:null,contactDotsMesh:null,contactRingsMesh:null,matRingInner:null,matRingOuter:null,matRingTicks:null,spawnTimer:null,lastTs:null,now:performance.now(),resizeObserver:null,intersectionObserver:null,_motionMq:null,_motionHandler:null,setRadarThreatLevel:null,injectContact:null};m.ringHzBase=1/m.ringPopDuration,Tt.set(t,m);const f=t.closest(".s9-panel");f&&(f.classList.add("s9-panel--booting"),f.addEventListener("animationend",()=>f.classList.remove("s9-panel--booting"),{once:!0}));const g=new ResizeObserver(_=>{for(const b of _){const{width:S,height:E}=b.contentRect;if(S===0||E===0)return;const C=Math.floor(Math.min(S,E)/2)-8;if(C<=0)return;m.R=C,d.left=-C,d.right=C,d.top=C,d.bottom=-C,d.updateProjectionMatrix(),l.setSize(S,E),m.composer.setSize(S,E),m.bloomPass&&m.bloomPass.resolution.set(S,E),Ns(m)}});g.observe(t),m.resizeObserver=g;const y=new IntersectionObserver(_=>{_.forEach(b=>{m.rafRunning=b.isIntersecting,m.rafRunning&&!m.rafId&&(m.rafId=requestAnimationFrame(S=>so(m,S)))})},{threshold:0});y.observe(t),m.intersectionObserver=y;const v=matchMedia("(prefers-reduced-motion: reduce)"),x=()=>{m.reducedMotion=v.matches,m.reducedMotion?(m.sweepAngle=Math.PI*.15,clearTimeout(m.spawnTimer)):Lt(m)};v.addEventListener("change",x),m._motionMq=v,m._motionHandler=x,m.rafRunning=!0,m.rafId=requestAnimationFrame(_=>so(m,_)),m.reducedMotion||Lt(m);function p(_){const b=Math.max(0,Math.min(1,_));m.threatLevel=b,clearTimeout(m.spawnTimer),Lt(m)}function w(_,b,S){const E=["friendly","neutral","hostile"].includes(S)?S:"neutral",C=xo(m,_,Math.max(0,Math.min(1,b)),E);return C?C.id:""}return m.setRadarThreatLevel=p,m.injectContact=w,{setRadarThreatLevel:p,injectContact:w}}function qs(t){const e=Tt.get(t);if(!e)return;const o=za();e.theme=o;const a=Le(o.neonGreen),n=Le(o.neonWarn),i=Le(o.neonAlert),s=Le(o.neonCyan),l=new O(o.neonCyan);if(e.backgroundMesh){const c=new O(o.voidColor);e.backgroundMesh.material.uniforms.uVoidColor.value.set(c.r,c.g,c.b),e.renderer.setClearColor(new O(o.voidColor),1)}if(e.matRingInner&&e.matRingInner.color.set(o.neonCyan),e.matRingOuter&&e.matRingOuter.color.set(o.neonCyan),e.matRingTicks&&e.matRingTicks.color.set(o.neonCyan),e.sweepTrailMesh&&e.sweepTrailMesh.material.uniforms.uColor.value.set(l.r,l.g,l.b),e.sweepArmLine&&e.sweepArmLine.material.color.set(o.neonCyan),e.contactDotsMesh){const c=e.contactDotsMesh.material.uniforms;c.uC0.value.set(...a),c.uC1.value.set(...n),c.uC2.value.set(...i),c.uC3.value.set(...s)}if(e.contactRingsMesh){const c=e.contactRingsMesh.material.uniforms;c.uC0.value.set(...a),c.uC1.value.set(...n),c.uC2.value.set(...i)}}const Ys=`
  attribute vec2 a_pos;
  varying vec2 vUv;
  void main() {
    vUv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }`,Ks=`
  precision mediump float;
  uniform sampler2D tDiffuse;
  uniform vec2  iResolution;
  uniform float uTime;
  uniform vec2  uImgOffset;
  uniform vec2  uImgScale;
  varying vec2  vUv;

  // ── Glitch uniforms ──────────────────────────────────────────
  uniform float uGlitchEnabled;   // 0 or 1
  uniform float uGlitchStrength;  // 0 – 0.10, horizontal shift amount
  uniform float uGlitchSpeed;     // 1 – 30, block-pattern change rate (blocks/sec)
  uniform float uGlitchCols;      // 10 – 80, number of horizontal glitch bands

  // ── Chromatic aberration uniforms ────────────────────────────
  uniform float uChromaEnabled;   // 0 or 1
  uniform float uChromaOffset;    // 0 – 0.025, radial R/B separation

  // ── CRT shader uniforms ───────────────────────────────────────
  uniform float uHardPix;      // scanline sharpness, negative: -0.5 (soft) – -3.0 (sharp)
  uniform float uWarpMult;     // barrel distortion multiplier: 0 = flat, 1 = default, 2 = strong
  uniform float uMaskStr;      // phosphor mask strength: 0 = off, 1 = full
  uniform float uGrainAmt;     // film grain amount: 0 – 0.15
  uniform float uHalationStr;  // phosphor halation strength: 0 = off, 1 = default
  uniform float uConvergence;  // convergence error: 0 = off, 0.0007 = default

  const float scrollRate = 0.325; // scanlines/sec

  float ToLinear1(float c) {
    return c <= 0.04045 ? c / 12.92 : pow((c + 0.055) / 1.055, 2.4);
  }
  vec3 ToLinear(vec3 c) {
    return vec3(ToLinear1(c.r), ToLinear1(c.g), ToLinear1(c.b));
  }

  // Map screen pos to image UV, snap to CRT grid in image space so the
  // quantization grid is locked to the source content (no tearing on transform).
  vec3 Fetch(vec2 pos, vec2 off) {
    if (max(abs(pos.x - 0.5), abs(pos.y - 0.5)) > 0.5) return vec3(0.0);
    vec2 uv = (pos - uImgOffset) / uImgScale;
    uv = floor(uv * iResolution + off) / iResolution;
    return ToLinear(texture2D(tDiffuse, uv).rgb);
  }

  // Convergence-offset fetch: R/B channels displaced radially from screen centre.
  // Uses highp for the UV arithmetic — the ~0.000175 displacement is below mediump
  // resolution near pos=1.0 and would be silently zeroed without it.
  // Falls back to the centre sample for any channel whose displaced position exits
  // the image bounds, preventing coloured fringe tears at content edges.
  vec3 FetchConv(vec2 pos, vec2 off) {
    highp vec2  hpos = pos;
    highp vec2  dir  = hpos - 0.5;
    highp float mag  = uConvergence * dot(dir, dir); // quadratic: zero at centre, grows to corners
    vec2 rPos = vec2(hpos + dir *  mag);
    vec2 bPos = vec2(hpos + dir * -mag);
    vec3 center = Fetch(pos,  off);
    float r = max(abs(rPos.x - 0.5), abs(rPos.y - 0.5)) > 0.5 ? center.r : Fetch(rPos, off).r;
    float b = max(abs(bPos.x - 0.5), abs(bPos.y - 0.5)) > 0.5 ? center.b : Fetch(bPos, off).b;
    return vec3(r, center.g, b);
  }

  vec2 Dist(vec2 pos) {
    // Both axes in image space so Gaussian weights align with the Fetch() pixel grid.
    // Screen-space vertical caused seams at fractional image scales.
    vec2 uv = (pos - uImgOffset) / uImgScale;
    float dx = uv.x * iResolution.x;
    float dy = uv.y * iResolution.y + uTime * scrollRate;
    return -vec2((dx - floor(dx)) - 0.5, (dy - floor(dy)) - 0.5);
  }

  float Gaus(float pos, float scale) { return exp2(scale * pos * pos); }

  float Luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

  vec3 Horz3(vec2 pos, float off) {
    vec3 b = FetchConv(pos, vec2(-1.0, off));
    vec3 c = FetchConv(pos, vec2( 0.0, off));
    vec3 d = FetchConv(pos, vec2( 1.0, off));
    float dst = Dist(pos).x;
    float wb = Gaus(dst - 1.0, uHardPix);
    float wc = Gaus(dst + 0.0, uHardPix);
    float wd = Gaus(dst + 1.0, uHardPix);
    return (b*wb + c*wc + d*wd) / (wb + wc + wd);
  }

  vec3 Horz5(vec2 pos, float off) {
    vec3 a = FetchConv(pos, vec2(-2.0, off));
    vec3 b = FetchConv(pos, vec2(-1.0, off));
    vec3 c = FetchConv(pos, vec2( 0.0, off));
    vec3 d = FetchConv(pos, vec2( 1.0, off));
    vec3 e = FetchConv(pos, vec2( 2.0, off));
    float dst = Dist(pos).x;
    float wa = Gaus(dst - 2.0, uHardPix);
    float wb = Gaus(dst - 1.0, uHardPix);
    float wc = Gaus(dst + 0.0, uHardPix);
    float wd = Gaus(dst + 1.0, uHardPix);
    float we = Gaus(dst + 2.0, uHardPix);
    return (a*wa + b*wb + c*wc + d*wd + e*we) / (wa + wb + wc + wd + we);
  }

  // Dynamic beam width: centre row luma drives scanline hardness.
  // Dark signal → narrow beam (hardScan=-12); bright signal → wide beam (hardScan=-4).
  vec3 Tri(vec2 pos) {
    vec3 b = Horz5(pos,  0.0);
    float luma    = clamp(Luma(b), 0.0, 1.0);
    float dynScan = mix(-12.0, -4.0, luma);

    vec3 a = Horz3(pos, -1.0);
    vec3 c = Horz3(pos,  1.0);
    return a * Gaus(Dist(pos).y + (-1.0), dynScan)
         + b * Gaus(Dist(pos).y +   0.0,  dynScan)
         + c * Gaus(Dist(pos).y +   1.0,  dynScan);
  }

  vec2 Warp(vec2 pos) {
    pos = pos * 2.0 - 1.0;
    vec2 warpAmt = vec2(1.0/96.0, 1.0/72.0) * uWarpMult;
    pos *= vec2(1.0 + pos.y * pos.y * warpAmt.x, 1.0 + pos.x * pos.x * warpAmt.y);
    return pos * 0.5 + 0.5;
  }

  // Aperture grille: tight vertical R/G/B stripe triads (Trinitron-style).
  vec3 Mask(vec2 pos) {
    float stripe = fract(pos.x / 3.0) * 3.0;
    vec3 mask = vec3(0.5);
    if      (stripe < 1.0) mask.r = 1.5;
    else if (stripe < 2.0) mask.g = 1.5;
    else                    mask.b = 1.5;
    return mask;
  }

  float hash(vec2 p) {
    vec2 s = fract(p * vec2(0.1031, 0.1030));
    s += dot(s, s.yx + 33.33);
    return fract((s.x + s.y) * s.x);
  }

  // Smooth bezel fade over r=0.018 band inside each screen edge.
  // Coexists safely with Fetch()'s hard clip: outside [0,1] both return 0.
  float cornerMask(vec2 pos) {
    const float r = 0.018;
    float bx = smoothstep(0.0, r, pos.x) * smoothstep(0.0, r, 1.0 - pos.x);
    float by = smoothstep(0.0, r, pos.y) * smoothstep(0.0, r, 1.0 - pos.y);
    return bx * by;
  }

  // CRT phosphor gamma (γ=2.5) — slightly punchier shadows than sRGB (γ≈2.4).
  vec3 ToCrtGamma(vec3 c) {
    return pow(max(c, vec3(0.0)), vec3(1.0 / 2.5));
  }

  // ── Glitch: hash-driven horizontal band displacement ─────────
  float glitchHash(float n) { return fract(sin(n) * 43758.5453123); }

  vec2 applyGlitch(vec2 uv) {
    if (uGlitchEnabled < 0.5 || uGlitchStrength < 0.0001) return uv;
    float t    = floor(uTime * uGlitchSpeed);
    float band = floor(uv.y * uGlitchCols);
    float h1   = glitchHash(band * 137.3 + t);
    float h2   = glitchHash(band *  91.7 + t + 1.0);
    // ~15 % of bands receive a horizontal shift; a rare 3 % get a large tear
    if (h1 > 0.85) {
      float xOff = (h2 * 2.0 - 1.0) * uGlitchStrength;
      uv.x = fract(uv.x + xOff);
    } else if (h1 < 0.03) {
      uv.x = fract(uv.x + (glitchHash(band + t * 7.3) - 0.5) * uGlitchStrength * 3.0);
    }
    return uv;
  }

  void main() {
    vec2 pos = Warp(vUv);

    // 0. Glitch distortion (before any texture sampling)
    pos = applyGlitch(pos);

    // 1. Scanline rendering with dynamic beam width
    vec3 col = Tri(pos);

    // 1b. Chromatic aberration — radial R/B split, before phosphor mask
    if (uChromaEnabled > 0.5 && uChromaOffset > 0.0001) {
      vec2 dir    = pos - 0.5;
      vec2 offset = dir * uChromaOffset * 2.0;
      col.r = Fetch(pos + offset, vec2(0.0)).r;
      col.b = Fetch(pos - offset, vec2(0.0)).b;
    }

    // 2. Phosphor mask (screen-layer effect)
    col *= mix(vec3(1.0), Mask(gl_FragCoord.xy), uMaskStr);

    // 3. Halation (glass-layer backscatter — above mask, not stripe-modulated)
    vec3 halo     = Horz5(pos, 0.0) * Gaus(Dist(pos).y, -2.5);
    vec3 halation = max(vec3(0.0), halo - 0.35) * vec3(0.18, 0.12, 0.08) * uHalationStr;
    col += halation;

    // 4. Film grain
    float grain = (hash(gl_FragCoord.xy + fract(uTime * 73.0)) * 2.0 - 1.0) * uGrainAmt;
    col += grain;

    // 5. Corner masking (bezel/overscan fade)
    col *= cornerMask(pos);

    // 6. CRT gamma encode
    col = ToCrtGamma(col);

    gl_FragColor = vec4(col, 1.0);
  }`;function ia(t,e,o){const a=t.createShader(e);return t.shaderSource(a,o),t.compileShader(a),t.getShaderParameter(a,t.COMPILE_STATUS)||console.error("Telescreen shader error:",t.getShaderInfoLog(a)),a}function Xs(t,e,o){const a=e.getContext("webgl");if(!a)return console.warn("Telescreen: WebGL not available"),{destroy(){}};const n=o.getContext("2d"),i={prog:null,buf:null,tex:null,aPos:-1,uLocs:{}};function s(){const p=a.createProgram();a.attachShader(p,ia(a,a.VERTEX_SHADER,Ys)),a.attachShader(p,ia(a,a.FRAGMENT_SHADER,Ks)),a.linkProgram(p),a.useProgram(p);const w=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,w),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),a.STATIC_DRAW);const _=a.getAttribLocation(p,"a_pos");a.enableVertexAttribArray(_),a.vertexAttribPointer(_,2,a.FLOAT,!1,0,0);const b={res:a.getUniformLocation(p,"iResolution"),time:a.getUniformLocation(p,"uTime"),imgOffset:a.getUniformLocation(p,"uImgOffset"),imgScale:a.getUniformLocation(p,"uImgScale"),diffuse:a.getUniformLocation(p,"tDiffuse"),glitchEnabled:a.getUniformLocation(p,"uGlitchEnabled"),glitchStrength:a.getUniformLocation(p,"uGlitchStrength"),glitchSpeed:a.getUniformLocation(p,"uGlitchSpeed"),glitchCols:a.getUniformLocation(p,"uGlitchCols"),chromaEnabled:a.getUniformLocation(p,"uChromaEnabled"),chromaOffset:a.getUniformLocation(p,"uChromaOffset"),hardPix:a.getUniformLocation(p,"uHardPix"),warpMult:a.getUniformLocation(p,"uWarpMult"),maskStr:a.getUniformLocation(p,"uMaskStr"),grainAmt:a.getUniformLocation(p,"uGrainAmt"),halationStr:a.getUniformLocation(p,"uHalationStr"),convergence:a.getUniformLocation(p,"uConvergence")},S=a.createTexture();a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,S),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.uniform1i(b.diffuse,0),Object.assign(i,{prog:p,buf:w,tex:S,aPos:_,uLocs:b})}s();let l=!1,c=null,d=!1,h=0;const r={glitchEnabled:0,glitchStrength:.025,glitchSpeed:8,glitchCols:30,chromaEnabled:0,chromaOffset:.006,hardPix:-1.2,warpMult:1,maskStr:1,grainAmt:.04,halationStr:1,convergence:7e-4};function u(){a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,i.tex),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,t),l=!0}function m(p,w,_,b){const S=Math.max(p/_,w/b)*.8,E=_*S,C=b*S;return{ox:(p-E)/2/p,oy:(w-C)/2/w,sx:E/p,sy:C/w}}function f(){const p=e.clientWidth||576,w=e.clientHeight||432;e.width=p,e.height=w,o.width=p,o.height=w,d||a.viewport(0,0,p,w)}function g(){if(!t.naturalWidth)return;const p=o.width,w=o.height,_=t.naturalWidth,b=t.naturalHeight,S=Math.max(p/_,w/b)*.8,E=_*S,C=b*S;n.clearRect(0,0,p,w),n.drawImage(t,(p-E)/2,(w-C)/2,E,C)}e.addEventListener("webglcontextlost",p=>{p.preventDefault(),d=!0}),e.addEventListener("webglcontextrestored",()=>{d=!1,l=!1,s(),f(),u()});function y(p){h=requestAnimationFrame(y),c||(c=p);const w=(p-c)/1e3;if(l&&!d){const _=e.width,b=e.height,S=t.naturalWidth,E=t.naturalHeight,C=b/1,A=_/b*C;a.uniform2f(i.uLocs.res,A,C),a.uniform1f(i.uLocs.time,w);const B=m(_,b,S,E);a.uniform2f(i.uLocs.imgOffset,B.ox,B.oy),a.uniform2f(i.uLocs.imgScale,B.sx,B.sy),a.uniform1f(i.uLocs.glitchEnabled,r.glitchEnabled),a.uniform1f(i.uLocs.glitchStrength,r.glitchStrength),a.uniform1f(i.uLocs.glitchSpeed,r.glitchSpeed),a.uniform1f(i.uLocs.glitchCols,r.glitchCols),a.uniform1f(i.uLocs.chromaEnabled,r.chromaEnabled),a.uniform1f(i.uLocs.chromaOffset,r.chromaOffset),a.uniform1f(i.uLocs.hardPix,r.hardPix),a.uniform1f(i.uLocs.warpMult,r.warpMult),a.uniform1f(i.uLocs.maskStr,r.maskStr),a.uniform1f(i.uLocs.grainAmt,r.grainAmt),a.uniform1f(i.uLocs.halationStr,r.halationStr),a.uniform1f(i.uLocs.convergence,r.convergence),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,i.tex),a.drawArrays(a.TRIANGLE_STRIP,0,4),g()}}function v(){f(),u(),g(),h=requestAnimationFrame(y)}t.complete&&t.naturalWidth?v():t.addEventListener("load",v);const x=new ResizeObserver(()=>{f(),g()});return x.observe(e),{destroy(){cancelAnimationFrame(h),x.disconnect()},setGlitch(p,w,_,b){r.glitchEnabled=p?1:0,w!==void 0&&(r.glitchStrength=w),_!==void 0&&(r.glitchSpeed=_),b!==void 0&&(r.glitchCols=b)},setChroma(p,w){r.chromaEnabled=p?1:0,w!==void 0&&(r.chromaOffset=w)},setShader({hardPix:p,warpMult:w,maskStr:_,grainAmt:b,halationStr:S,convergence:E}={}){p!==void 0&&(r.hardPix=p),w!==void 0&&(r.warpMult=w),_!==void 0&&(r.maskStr=_),b!==void 0&&(r.grainAmt=b),S!==void 0&&(r.halationStr=S),E!==void 0&&(r.convergence=E)}}}const sa=[{cls:"sigint",headline:"SIGNAL INTERCEPT: FREQ 12.4GHz",detail:"Encrypted burst tx — POSEIDON signature"},{cls:"humint",headline:"ASSET CONFIRM: NIIHAMA-04",detail:"Target movement: port district, 0300 local"},{cls:"cyber",headline:"ZERO-DAY: CVE-2026-3917",detail:"Legacy auth stack — remote exec payload ready"},{cls:"ghost",headline:"DIVE ANOMALY: SECTOR ALPHA",detail:"Ghost-barrier interference at 4.1m depth"},{cls:"elint",headline:"DRONE SWEEP: SECTOR 12",detail:"Coverage 73% — ETA 4 minutes to full map"},{cls:"sigint",headline:"PACKET STORM: 192.168.7.0/24",detail:"18k pps sustained — possible DDoS staging"},{cls:"cyber",headline:"EXFIL CHANNEL COMPROMISED",detail:"Fallback route DELTA-9 now primary exfil"},{cls:"humint",headline:"CONTACT LOST: ROMEO-7",detail:"Last check-in 03:14:22 UTC — status unknown"},{cls:"ghost",headline:"TACHIKOMA: AUTONOMOUS SWEEP",detail:"Unit 9 executing sector 7 independently"},{cls:"elint",headline:"EM PULSE DETECTED: ZONE 3",detail:"Localized disruption — comm nodes offline"},{cls:"sigint",headline:"NODE COMMS SPIKE: BEIJING",detail:"340% increase in encrypted P2P — 0300-0500"},{cls:"cyber",headline:"FIREWALL PROBE: AS12345",detail:"Systematic port sweep — countermeasures deployed"},{cls:"humint",headline:"BROKER IDENTIFIED: LAUGHING MAN",detail:"Dark web auction — biotech data linked to incident"},{cls:"ghost",headline:"GHOST PROTOCOL: BETA-3",detail:"Shell confirmed on target system — extract ready"},{cls:"elint",headline:"SAT PASS: KH-17 WINDOW",detail:"6 min coverage — imaging tasked to sector 4"}];function Zs(t){const e=document.createElement("div");return e.className=`sigint-item sigint-item--${t.cls}`,e.innerHTML=`
    <div class="sigint-item__class">${t.cls.toUpperCase()}</div>
    <div class="sigint-item__headline">${t.headline}</div>
    <div class="sigint-item__detail">${t.detail}</div>
  `,e}function Qs(t){if(!t)return;const e=4,o=[];function a(){const n=new Set(o.map(h=>{var r;return(r=h.querySelector(".sigint-item__headline"))==null?void 0:r.textContent})),i=sa.filter(h=>!n.has(h.headline)),s=i.length>0?i:sa,l=s[Math.floor(Math.random()*s.length)],c=Zs(l);t.insertBefore(c,t.firstChild),o.unshift(c),requestAnimationFrame(()=>c.classList.add("sigint-item--visible"));const d=8e3+Math.random()*12e3;for(setTimeout(()=>{c.classList.add("sigint-item--closing"),c.classList.remove("sigint-item--visible"),setTimeout(()=>{c.remove();const h=o.indexOf(c);h>=0&&o.splice(h,1)},500)},d);o.length>e;){const h=o.pop();h.classList.add("sigint-item--closing"),h.classList.remove("sigint-item--visible"),setTimeout(()=>h.remove(),500)}setTimeout(a,3e3+Math.random()*6e3)}setTimeout(a,800),setTimeout(a,2200)}const ra=[{cls:"STRATEGIC",headline:"BIOMECH TREATY VOTE: 72HRS",detail:"Section 9 on standby for security detail"},{cls:"TACTICAL",headline:"LAUGHING MAN: ACTIVE",detail:"New sightings logged in Niihama and Togusa ward"},{cls:"ASSET",headline:"BATOU: FIELD POSITION UPDATE",detail:"Grid 7-Delta — visual on primary target"},{cls:"THREAT",headline:"PUPPET MASTER PROTOCOL",detail:"AI ghost-dive signatures — 3 confirmed nodes"},{cls:"STRATEGIC",headline:"ARAMAKI: SITUATION ROOM",detail:"Director briefing at 0600 UTC — attendance req"},{cls:"TACTICAL",headline:"TOGUSA: DEEP COVER",detail:"Identity: Muto Ryo — corporate embedded"},{cls:"THREAT",headline:"ROGUE TACHIKOMA UNIT",detail:"Unit 14 unresponsive — last GPS: Sector 9-Bravo"},{cls:"ASSET",headline:"ISHIKAWA: CYBER BREACH",detail:"Target mainframe penetrated — exfil in 180s"},{cls:"STRATEGIC",headline:"COMA CHIP EXPLOIT: CONFIRMED",detail:"Hardware vulnerability — 40k units affected"},{cls:"TACTICAL",headline:"HELICOPTER SUPPORT: STANDING BY",detail:"AH-6J on tarmac — ETA to sector: 4 min"}];function Js(t){const e=document.createElement("div");return e.className="intel-item",e.innerHTML=`
    <div class="intel-item__class">${t.cls}</div>
    <div class="intel-item__headline">${t.headline}</div>
    <div class="intel-item__detail">${t.detail}</div>
  `,e}function er(t){if(!t)return;const e=5,o=[];function a(){const n=new Set(o.map(h=>{var r;return(r=h.querySelector(".intel-item__headline"))==null?void 0:r.textContent})),i=ra.filter(h=>!n.has(h.headline)),s=i.length>0?i:ra,l=s[Math.floor(Math.random()*s.length)],c=Js(l);t.insertBefore(c,t.firstChild),o.unshift(c),requestAnimationFrame(()=>c.classList.add("intel-item--visible"));const d=1e4+Math.random()*15e3;for(setTimeout(()=>{c.classList.add("intel-item--closing"),c.classList.remove("intel-item--visible"),setTimeout(()=>{c.remove();const h=o.indexOf(c);h>=0&&o.splice(h,1)},500)},d);o.length>e;){const h=o.pop();h.classList.add("intel-item--closing"),h.classList.remove("intel-item--visible"),setTimeout(()=>h.remove(),500)}setTimeout(a,4e3+Math.random()*8e3)}setTimeout(a,1200),setTimeout(a,3500),setTimeout(a,5800)}function Z(t,e){return Math.floor(Math.random()*(e-t+1))+t}const be=()=>`${Z(10,220)}.${Z(0,255)}.${Z(0,255)}.${Z(1,254)}`,Xt=()=>[22,80,443,8443,4444,3389,21,1337,9999][Math.floor(Math.random()*9)],tr=()=>`${Z(64,65535)}B`,or=()=>Array.from({length:4},()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0")).join(" "),la=[()=>({source:"AUTH",message:`HANDSHAKE COMPLETE — ${be()}:${Xt()}`,alert:!1}),()=>({source:"NET",message:`PKT ${tr()} ${be()} → ${be()}`,alert:!1}),()=>({source:"GHOST",message:`DIVE DEPTH: ${(2+Math.random()*3).toFixed(1)}m — STABLE`,alert:!1}),()=>({source:"CRYPT",message:"AES-256 SESSION KEY ESTABLISHED",alert:!1}),()=>({source:"SCAN",message:`PROBE: ${be()}:${Xt()} — ${or()}`,alert:!0}),()=>({source:"SYS",message:`MEM ${Z(60,92)}% CPU ${Z(20,80)}% THERMAL OK`,alert:!1}),()=>({source:"NET",message:`LATENCY ${Z(4,45)}ms — ${Math.random()<.8?"NOMINAL":"DEGRADED"}`,alert:Math.random()<.2}),()=>({source:"AUTH",message:`TOKEN REFRESH: UID-${Z(1e3,9999)}`,alert:!1}),()=>({source:"CRIT",message:`INTRUSION SIG: ${be()} PORT ${Xt()}`,alert:!0}),()=>({source:"SYS",message:`COUNTERMEASURE DEPLOYED — BLOCK RULE ${Z(100,999)}`,alert:!1}),()=>({source:"NET",message:`ROUTE CHANGE: AS${Z(1e3,65e3)} VIA ${be()}`,alert:!1}),()=>({source:"CRYPT",message:`TLS 1.3 HANDSHAKE: ${be()} — ${Z(0,1)?"ECDH":"RSA"}-4096`,alert:!1}),()=>({source:"SCAN",message:`ANOMALY: BURST ${Z(800,9999)} PPS FROM ${be()}`,alert:!0}),()=>({source:"GHOST",message:`GHOST COEFFICIENT: ${(92+Math.random()*8).toFixed(1)}%`,alert:!1}),()=>({source:"AUTH",message:`CERT CHAIN VALID — SHA-${Z(0,1)?"256":"512"}`,alert:!1}),()=>({source:"NET",message:`DNS RESOLVE: ${["niihama.net","togusa.local","sec9.gov","puppet.io"][Math.floor(Math.random()*4)]}`,alert:!1}),()=>({source:"SYS",message:`FIREWALL RULE ${Z(1e3,9999)}: DROP ${be()}/${Z(24,32)}`,alert:!1}),()=>({source:"CRIT",message:`ZERO-DAY ATTEMPT: ${be()} — MITIGATED`,alert:!0})];function ar(t,e){function o(){const a=la[Math.floor(Math.random()*la.length)];e(t,{timestamp:new Date().toISOString(),...a()})}for(let a=0;a<8;a++)o();setInterval(o,Z(1200,2800))}function Te(t,e){return Math.floor(Math.random()*(e-t+1))+t}const Ie=[{id:"n-tokyo",lat:35.68,lng:139.69,label:"TOKYO"},{id:"n-moscow",lat:55.75,lng:37.62,label:"MOSCOW"},{id:"n-beijing",lat:39.91,lng:116.39,label:"BEIJING"},{id:"n-london",lat:51.51,lng:-.13,label:"LONDON"},{id:"n-nyc",lat:40.71,lng:-74,label:"NEW YORK"},{id:"n-sydney",lat:-33.87,lng:151.21,label:"SYDNEY"},{id:"n-dubai",lat:25.2,lng:55.27,label:"DUBAI"},{id:"n-saopaulo",lat:-23.55,lng:-46.63,label:"SÃO PAULO"},{id:"n-paris",lat:48.86,lng:2.35,label:"PARIS"},{id:"n-seoul",lat:37.57,lng:126.98,label:"SEOUL"},{id:"n-cairo",lat:30.05,lng:31.24,label:"CAIRO"},{id:"n-berlin",lat:52.52,lng:13.41,label:"BERLIN"},{id:"n-mumbai",lat:19.08,lng:72.88,label:"MUMBAI"},{id:"n-toronto",lat:43.65,lng:-79.38,label:"TORONTO"},{id:"n-singapore",lat:1.35,lng:103.82,label:"SINGAPORE"},{id:"n-nairobi",lat:-1.29,lng:36.82,label:"NAIROBI"},{id:"n-istanbul",lat:41.01,lng:28.97,label:"ISTANBUL"},{id:"n-lagos",lat:6.52,lng:3.38,label:"LAGOS"}],nr={"n-tokyo":{country:"JAPAN",pop:"13.96M",status:"FINANCIAL HUB"},"n-moscow":{country:"RUSSIA",pop:"12.51M",status:"RESTRICTED"},"n-beijing":{country:"CHINA",pop:"21.54M",status:"RESTRICTED"},"n-london":{country:"UK",pop:"8.98M",status:"ALLIED NODE"},"n-nyc":{country:"USA",pop:"8.34M",status:"ALLIED NODE"},"n-sydney":{country:"AUSTRALIA",pop:"5.31M",status:"ALLIED NODE"},"n-dubai":{country:"UAE",pop:"3.33M",status:"NEUTRAL ZONE"},"n-saopaulo":{country:"BRAZIL",pop:"12.33M",status:"MONITORED"},"n-paris":{country:"FRANCE",pop:"2.15M",status:"ALLIED NODE"},"n-seoul":{country:"S.KOREA",pop:"9.78M",status:"ALLIED NODE"},"n-cairo":{country:"EGYPT",pop:"10.08M",status:"MONITORED"},"n-berlin":{country:"GERMANY",pop:"3.66M",status:"ALLIED NODE"},"n-mumbai":{country:"INDIA",pop:"20.67M",status:"MONITORED"},"n-toronto":{country:"CANADA",pop:"2.93M",status:"ALLIED NODE"},"n-singapore":{country:"SINGAPORE",pop:"5.45M",status:"NEUTRAL ZONE"},"n-nairobi":{country:"KENYA",pop:"4.40M",status:"MONITORED"},"n-istanbul":{country:"TURKEY",pop:"15.46M",status:"NEUTRAL ZONE"},"n-lagos":{country:"NIGERIA",pop:"14.86M",status:"MONITORED"}},It=Ie.slice(0,8),Wa=[15,72,55,18,28,10,45,33];function ir(t){let e=t.split("").reduce((c,d)=>c*31+d.charCodeAt(0)>>>0,7);const o=()=>(e=e*1664525+1013904223>>>0,(e>>>16)/65535),a=9,n=140,i=34,s=n/a;let l=`<svg viewBox="0 0 ${n} ${i}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;height:34px;">`;l+='<g fill="currentColor">';for(let c=0;c<a;c++){const d=8+o()*24,h=s*(.48+o()*.44),r=c*s+(s-h)*.5;l+=`<rect x="${r.toFixed(1)}" y="${(i-d).toFixed(1)}" width="${h.toFixed(1)}" height="${d.toFixed(1)}"/>`}return l+="</g></svg>",l}function sr(t,e,o,a){const{addNode:n,removeNode:i,updateNodeLevel:s,setThreatLevel:l,setActiveNode:c,focusNode:d,pulseGlobeNode:h,spawnArc:r,appendRow:u,printLine:m,setRadarThreatLevel:f}=a,g=new Map;function y(b,S){t.dispatchEvent(new CustomEvent("s9:alert",{bubbles:!0,detail:{level:S>=70?"critical":"warning",source:b}}))}function v(b,S){n(t,{...b,level:S}),g.set(b.id,S),u(e,{timestamp:new Date().toISOString(),source:"NET",message:`NODE ONLINE: ${b.label} — LVL ${S}`,alert:S>=70}),S>=70&&(y(b.label,S),c(t,b.id),d(t,b.id))}It.forEach((b,S)=>{setTimeout(()=>{v(b,Wa[S]),S===It.length-1&&setTimeout(()=>{l(t,55),f(.55)},800)},S*300+500)});let x=!1;function p(){if(x)return;const b=[...g.keys()],S=Ie.filter(C=>!g.has(C.id)),E=Math.random();if(E<.28&&S.length>0){const C=S[Te(0,S.length-1)],A=Te(5,65);v(C,A),m(o,`SIGNAL ACQUIRED: ${C.label}`,"sys")}else if(E<.42&&b.length>5){const C=b[Te(0,b.length-1)],A=Ie.find(B=>B.id===C);i(t,C),g.delete(C),m(o,`SIGNAL LOST: ${(A==null?void 0:A.label)??C}`,"info"),u(e,{timestamp:new Date().toISOString(),source:"NET",message:`NODE OFFLINE: ${(A==null?void 0:A.label)??C}`,alert:!1})}else if(E<.72&&b.length>0){const C=b[Te(0,b.length-1)],A=Ie.find(F=>F.id===C),B=g.get(C)??0,U=Te(8,28),j=Math.min(100,B+U);s(t,C,j),g.set(C,j),l(t,Math.max(...Array.from(g.values()))),f(Math.max(...Array.from(g.values()))/100),m(o,`THREAT ESCALATION: ${(A==null?void 0:A.label)??C} ${B}→${j}`,j>=70?"err":"sys"),u(e,{timestamp:new Date().toISOString(),source:"CRIT",message:`THREAT UP: ${(A==null?void 0:A.label)??C} LVL=${j}`,alert:j>=70}),j>=70&&B<70&&(y((A==null?void 0:A.label)??C,j),c(t,C),d(t,C));const Me=B>=70?2:B>=40?1:0,Ce=j>=70?2:j>=40?1:0;Me!==Ce&&h(t,C)}else if(b.length>0){const C=b[Te(0,b.length-1)],A=Ie.find(Ce=>Ce.id===C),B=g.get(C)??50,U=Math.max(0,B-Te(5,18));s(t,C,U),g.set(C,U),l(t,Math.max(0,...Array.from(g.values()))),f(Math.max(0,...Array.from(g.values()))/100),m(o,`THREAT REDUCED: ${(A==null?void 0:A.label)??C} LVL=${U}`,"info");const j=B>=70?2:B>=40?1:0,Me=U>=70?2:U>=40?1:0;j!==Me&&h(t,C)}if(b.length>=2){const C=1+Math.floor(Math.random()*3);for(let A=0;A<C;A++){const B=b[Math.floor(Math.random()*b.length)];let U=b[Math.floor(Math.random()*b.length)];U===B&&(U=b[(b.indexOf(B)+1)%b.length]),U!==B&&r(t,B,U)}}setTimeout(p,Te(4e3,9e3))}setTimeout(p,It.length*300+2500);const w=setInterval(()=>{const b=[...g.keys()];if(b.length<2)return;const S=Math.random()<.4?2:1;for(let E=0;E<S;E++){const C=b[Math.floor(Math.random()*b.length)];let A=b[Math.floor(Math.random()*b.length)];A===C&&(A=b[(b.indexOf(C)+1)%b.length]),A!==C&&r(t,C,A)}},1200),_=setInterval(()=>{const b=[...g.entries()].filter(([,B])=>B>=70);if(b.length===0)return;const S=t.getAttribute("data-active-node"),E=b.filter(([B])=>B!==S),C=E.length>0?E:b,[A]=C[Math.floor(Math.random()*C.length)];c(t,A),d(t,A)},8e3);return{globeNodes:g,destroy(){x=!0,clearInterval(w),clearInterval(_)}}}function rr(t,e,o,a,n){const{initThreatMap:i,addNode:s,removeNode:l,updateNodeLevel:c,setThreatLevel:d,setActiveNode:h,focusNode:r}=n;i(t,{autoRotate:!0,bloomStrength:.7});const u=new Map;e.forEach((S,E)=>{setTimeout(()=>{s(t,{...S,level:o[E]}),u.set(S.id,o[E])},E*200+300)}),setTimeout(()=>d(t,55),e.length*200+800);const m=document.getElementById("tact-node-info"),f=document.getElementById("tact-btn-add"),g=document.getElementById("tact-btn-remove"),y=document.getElementById("tact-btn-focus"),v=document.getElementById("tact-btn-deselect"),x=document.getElementById("tact-level-slider"),p=document.getElementById("tact-level-val"),w=document.getElementById("tact-level-row");let _=null;function b(){const S=_!==null&&u.has(_);if(g.disabled=!S,y.disabled=!S,v.disabled=!S,x.disabled=!S,w.style.opacity=S?"1":"0.4",w.style.pointerEvents=S?"auto":"none",S){const E=a.find(A=>A.id===_),C=u.get(_);m.textContent=`${(E==null?void 0:E.label)??_} — LVL ${C}`,x.value=C,p.textContent=C}else m.textContent="NO NODE SELECTED"}t.addEventListener("s9:threatmap-node-select",S=>{_=S.detail.nodeId,document.getElementById("tactical-threat").textContent=`THREAT: ${S.detail.level} — ${S.detail.label}`,b()}),t.addEventListener("s9:threatmap-node-deselect",()=>{_=null,b()}),f.addEventListener("click",()=>{const S=a.filter(A=>!u.has(A.id));if(S.length===0)return;const E=S[Math.floor(Math.random()*S.length)],C=Math.floor(Math.random()*60)+10;s(t,{...E,level:C}),u.set(E.id,C),d(t,Math.max(...u.values())),h(t,E.id),r(t,E.id)}),g.addEventListener("click",()=>{_&&(l(t,_),u.delete(_),d(t,u.size>0?Math.max(...u.values()):0),_=null,b())}),y.addEventListener("click",()=>{_&&r(t,_)}),v.addEventListener("click",()=>{h(t,null),_=null,b()}),x.addEventListener("input",()=>{if(!_)return;const S=parseInt(x.value);p.textContent=S,c(t,_,S),u.set(_,S),d(t,Math.max(...u.values()));const E=a.find(C=>C.id===_);m.textContent=`${(E==null?void 0:E.label)??_} — LVL ${S}`}),b()}const bt=[{id:"sec9",label:"SEC.9 HQ",x:50,y:50,root:!0},{id:"niihama",label:"NIIHAMA",x:22,y:22},{id:"togusa",label:"TOGUSA",x:78,y:22},{id:"batou",label:"BATOU",x:78,y:78},{id:"ishikawa",label:"ISHIKAWA",x:22,y:78},{id:"relay1",label:"RELAY ALPHA",x:36,y:32},{id:"relay2",label:"RELAY BETA",x:64,y:32},{id:"relay3",label:"RELAY GAMMA",x:36,y:68},{id:"relay4",label:"RELAY DELTA",x:64,y:68},{id:"ext1",label:"PUPPET MASTER",x:12,y:50},{id:"ext2",label:"LAUGHING MAN",x:88,y:50},{id:"tachi",label:"TACHIKOMA U9",x:50,y:12}],ca=[{id:"e01",from:"sec9",to:"relay1"},{id:"e02",from:"sec9",to:"relay2"},{id:"e03",from:"sec9",to:"relay3"},{id:"e04",from:"sec9",to:"relay4"},{id:"e05",from:"relay1",to:"niihama"},{id:"e06",from:"relay2",to:"togusa"},{id:"e07",from:"relay3",to:"ishikawa"},{id:"e08",from:"relay4",to:"batou"},{id:"e09",from:"niihama",to:"ext1"},{id:"e10",from:"ext1",to:"relay3"},{id:"e11",from:"togusa",to:"relay1"},{id:"e12",from:"batou",to:"relay2"},{id:"e13",from:"ext2",to:"relay2"},{id:"e14",from:"ext2",to:"relay4"},{id:"e15",from:"sec9",to:"tachi"},{id:"e16",from:"relay1",to:"relay2"},{id:"e17",from:"relay3",to:"relay4"}],Zt={relay2:72,relay4:88,ext1:95,ext2:80,niihama:45,batou:55};function lr(t,e){if(!t)return;const{initMatrix:o,activateEdge:a,deactivateEdge:n,pulseNode:i,setActiveNode:s}=e;o(t,{nodes:bt,edges:ca});for(const[r,u]of Object.entries(Zt)){const m=t.querySelector(`[data-node-id="${r}"]`);m&&(u>=70?m.classList.add("s9-matrix__node--threat-high"):u>=40&&m.classList.add("s9-matrix__node--threat-mid"))}s(t,"ext1");const l=ca.map(r=>r.id),c=new Set,d=[null,null,"var(--neon-warn)","var(--neon-alert)","var(--neon-green)",null];function h(){if(c.size>0){const f=[...c],g=f[Math.floor(Math.random()*f.length)];n(t,g),c.delete(g)}const r=l.filter(f=>!c.has(f)),u=Math.random()<.4?2:1;for(let f=0;f<u&&r.length>0;f++){const g=r.splice(Math.floor(Math.random()*r.length),1)[0],y=d[Math.floor(Math.random()*d.length)];a(t,g,y),c.add(g)}if(Math.random()<.35){const f=bt[Math.floor(Math.random()*bt.length)];i(t,f.id)}const m=document.getElementById("flow-overlay");if(m){const f=Object.values(Zt).filter(v=>v>=70).length,g=Object.values(Zt).filter(v=>v>=40&&v<70).length,y=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";m.innerHTML=`<span style="font-family:var(--font-terminal);font-size: 0.7rem;color:${y};opacity:0.7">NODES: ${bt.length} &nbsp; <span style="color:var(--text-alert)">CRIT: ${f}</span> &nbsp; <span style="color:var(--neon-warn)">WARN: ${g}</span></span>`}}for(let r=0;r<4;r++){const u=l[Math.floor(Math.random()*l.length)];c.has(u)||(a(t,u),c.add(u))}setInterval(h,700),h(),document.getElementById("matrix-status").textContent="● LIVE"}const Dt={"":"MATRIX GREEN",gits:"GHOST IN THE SHELL",amber:"AMBER",phosphor:"PHOSPHOR",blood:"BLOOD"};function ro(t){const e=document.documentElement;t===""||t==="matrixgreen"?delete e.dataset.theme:e.dataset.theme=t,document.querySelectorAll(".topbar__theme-btn").forEach(o=>{o.classList.toggle("topbar__theme-btn--active",(o.dataset.themeSet??"")===(t==="matrixgreen"?"":t))}),Jo(ee),lo&&Jo(document.getElementById("threatmap-tactical")),qs(Qa)}function $a(){const t=new Date;document.getElementById("topbar-clock").textContent=`UTC ${t.toUTCString().split(" ")[4]}`}$a();setInterval($a,1e3);document.querySelectorAll(".s9-panel").forEach(qi);document.querySelectorAll(".topbar__theme-btn").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.themeSet??"";ro(e),D(I,`THEME: ${Dt[e]??e.toUpperCase()}`,"sys")})});const ja=document.querySelectorAll(".topbar__tab[data-tab]"),cr=document.querySelectorAll(".center__view[data-view]");let da=!1,lo=!1;function ua(t){ja.forEach(e=>{const o=e.dataset.tab===t;e.classList.toggle("topbar__tab--active",o),e.setAttribute("aria-selected",o)}),cr.forEach(e=>{e.classList.toggle("center__view--active",e.dataset.view===t)}),t==="network"&&!da&&(da=!0,xr()),t==="tactical"&&!lo&&(lo=!0,Sr()),D(I,`VIEW: ${t.toUpperCase()} ACTIVATED`,"sys")}ja.forEach(t=>{t.addEventListener("click",()=>ua(t.dataset.tab)),t.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),ua(t.dataset.tab))})});const I=document.querySelector(".s9-terminal");Dn(I,{onSubmit(t){var n;const e=t.trim().split(/\s+/),o=e[0].toLowerCase(),a=e.slice(1);switch(o){case"help":D(I,"SECTION 9 COMMAND INTERFACE — AVAILABLE COMMANDS:","sys"),D(I,"  status              — system status report","info"),D(I,"  ghost               — ghost coefficient analysis","info"),D(I,"  nodes               — list active threat nodes","info"),D(I,"  threat <lvl>        — set global threat level 0-100","info"),D(I,"  threat <id> <lvl>   — set node threat level","info"),D(I,"  focus <id>          — focus camera on node","info"),D(I,"  theme <name>        — switch theme","info"),D(I,"  themes              — list available themes","info"),D(I,"  clear               — clear terminal","info");break;case"status":{const i=he.size,s=[...he.values()].filter(c=>c>=70).length,l=i>0?Math.max(...he.values()):0;D(I,"── SYSTEM STATUS ──────────────────────────","sys"),D(I,`  CPU: ${ie.cpu}%   MEM: ${ie.mem}%   NET I/O: ${ie.net}%`,"info"),D(I,`  GHOST LAYER: ${ie.ghost}%   ENCRYPTION: ${ie.enc}%`,"info"),D(I,`  NODES ON GRID: ${i}   CRITICAL: ${s}`,s>0?"err":"info"),D(I,`  PEAK THREAT: ${l}   GLOBAL LEVEL: ${l}`,l>=70?"err":"sys"),D(I,"  SECURE CHANNEL: ACTIVE   ENCRYPTION: AES-256","info");break}case"ghost":{const i=Eo.toFixed(1);D(I,"── GHOST COEFFICIENT ANALYSIS ─────────────","sys"),D(I,`  COEFFICIENT: ${i}%   BARRIER: NOMINAL`,"info"),D(I,"  CYBER BRAIN: SECTION 9 CLEARANCE ALPHA-7","info"),D(I,"  DIVE DEPTH: STABLE 3.2m   TACHIKOMA LINK: ACTIVE","info"),D(I,"  IDENTITY: CONFIRMED — KUSANAGI.M",i>=95?"sys":"err");break}case"nodes":{if(he.size===0){D(I,"NO NODES ON GRID","info");break}D(I,`ACTIVE NODES (${he.size}):`,"sys");for(const[i,s]of he){const l=Ie.find(h=>h.id===i),c=(l==null?void 0:l.label)??i,d=s>=70?"err":s>=40?"sys":"info";D(I,`  ${i.padEnd(14)} ${c.padEnd(12)} LVL=${s}`,d)}break}case"threat":{if(a.length===0){D(I,`GLOBAL THREAT: ${Math.max(0,...he.values())}`,"sys");break}if(a.length>=2&&isNaN(parseInt(a[0]))){const i=a[0],s=parseInt(a[1]);if(!he.has(i)){D(I,`ERR: node '${i}' not found — use NODES to list`,"err");break}if(isNaN(s)||s<0||s>100){D(I,"ERR: level must be 0-100","err");break}const l=So(ee,i,s);he.set(i,s),Bt(ee,Math.max(0,...he.values())),co.setRadarThreatLevel(Math.max(0,...he.values())/100),D(I,`NODE ${i}: ${l} → ${s}`,s>=70?"err":"sys"),s>=70&&l<70&&(He(ee,i),Ft(ee,i))}else{const i=parseInt(a[0]);if(isNaN(i)||i<0||i>100){D(I,"ERR: level must be 0-100","err");break}Bt(ee,i),co.setRadarThreatLevel(i/100),D(I,`GLOBAL THREAT LEVEL SET: ${i}`,"sys")}break}case"focus":{const i=a[0];if(!i){D(I,"ERR: focus requires a node id — use NODES to list","err");break}if(!he.has(i)){D(I,`ERR: node '${i}' not found`,"err");break}He(ee,i),Ft(ee,i);const s=Ie.find(l=>l.id===i);D(I,`CAMERA FOCUSED: ${(s==null?void 0:s.label)??i}`,"sys");break}case"theme":{const i=((n=a[0])==null?void 0:n.toLowerCase())??"";if(i===""||i==="matrixgreen"){ro(""),D(I,"THEME: MATRIX GREEN","sys");break}if(!Object.keys(Dt).includes(i)){D(I,`ERR: unknown theme '${i}' — use THEMES to list`,"err");break}ro(i),D(I,`THEME: ${Dt[i]}`,"sys");break}case"themes":D(I,"AVAILABLE THEMES:","sys");for(const[i,s]of Object.entries(Dt))D(I,`  ${(i||"matrixgreen").padEnd(14)} ${s}`,"info");break;case"clear":Rn(I),D(I,"TERMINAL CLEARED","sys");break;default:o&&D(I,`ERR: unknown command '${t}' — type HELP`,"err")}},tabComplete(t){return["help","status","ghost","nodes","threat","focus","theme","themes","clear"].find(o=>o.startsWith(t.toLowerCase()))??null}});D(I,"SECTION 9 OPERATIVE INTERFACE — TYPE HELP FOR COMMANDS","sys");D(I,"GHOST BABEL OPERATION: ACTIVE","info");function Qt(t,e,o){let a=0;function n(){if(a>=t.length)return;const{id:i,state:s}=t[a++],l=document.getElementById(i);l&&Yi(l,s),setTimeout(n,a<t.length?e:e*2)}n()}Qs(document.getElementById("sigint-feed"));er(document.getElementById("intel-feed"));setTimeout(()=>{Qt([{id:"seq-breach",state:"complete"},{id:"seq-extract",state:"active"}],3e3),setTimeout(()=>{Qt([{id:"seq-extract",state:"complete"},{id:"seq-cover",state:"active"}],3500),setTimeout(()=>{Qt([{id:"seq-cover",state:"complete"},{id:"seq-exfil",state:"active"}],3e3)},9e3)},8e3)},5e3);const Gt=document.querySelector(".s9-stream");Bn(Gt);ar(Gt,yo);const me=Xs(document.getElementById("ts-feed-src"),document.getElementById("ts-feed-canvas"),document.getElementById("ts-glow-canvas")),ie={cpu:42,mem:61,net:12,ghost:77,enc:96},dr=document.getElementById("tele-cpu"),ur=document.getElementById("tele-mem"),hr=document.getElementById("tele-net"),mr=document.getElementById("tele-enc");setInterval(()=>{for(const t of Object.keys(ie))ie[t]=Math.max(5,Math.min(100,ie[t]+(Math.random()-.5)*6)),ie[t]=Math.round(ie[t]);ut(dr,ie.cpu),ut(ur,ie.mem),ut(hr,ie.net),ut(mr,ie.enc)},2e3);const Va=document.getElementById("neural-01"),qa=document.getElementById("ghost-val"),Ya=document.getElementById("cyber-index"),Ka=document.getElementById("neural-sync"),Xa=document.getElementById("ekg-bpm"),Za=kn(document.getElementById("ekg-canvas"),document.getElementById("ekg-heart"));let Eo=98.4;for(let t=0;t<3;t++)Eo=Ca(Va,qa,Ya,Ka,Xa,Za);setInterval(()=>{Eo=Ca(Va,qa,Ya,Ka,Xa,Za)},3e3);const ee=document.querySelector(".s9-threatmap");Fa(ee,{autoRotate:!0,bloomStrength:.4});const Qa=document.getElementById("proximity-radar"),co=Vs(Qa,{threatLevel:0}),fr=getComputedStyle(document.documentElement).getPropertyValue("--neon-green").trim()||"#00ff70",ae=fs(document.getElementById("matrix-rain-host"),{color:fr,opacity:.45,syncCamera:Fi(ee)});document.getElementById("sat-toggle").addEventListener("change",t=>{ji(ee,t.target.checked)});const{globeNodes:he}=sr(ee,Gt,I,{addNode:Na,removeNode:Ua,updateNodeLevel:So,setThreatLevel:Bt,setActiveNode:He,focusNode:Ft,pulseGlobeNode:Gi,spawnArc:Hi,appendRow:yo,printLine:D,setRadarThreatLevel:t=>co.setRadarThreatLevel(t)}),pr=document.getElementById("alert-host");document.addEventListener("s9:alert",t=>{var e;if(((e=t.detail)==null?void 0:e.level)==="critical"){const o=t.detail.source??"UNKNOWN";D(I,`⚠ CRITICAL ALERT: ${o}`,"err"),Un(pr,{level:"critical",code:"CRITICAL THREAT",message:o})}});const nt=document.getElementById("node-popup"),gr=document.getElementById("np-city"),vr=document.getElementById("np-skyline"),yr=document.getElementById("np-country"),br=document.getElementById("np-pop"),_r=document.getElementById("np-coords"),ha=document.getElementById("np-threat"),wr=document.getElementById("np-status");ee.addEventListener("s9:threatmap-node-select",t=>{const{nodeId:e,label:o,level:a,lat:n,lng:i}=t.detail;D(I,`NODE SELECT: ${o} — LEVEL ${a} — ${n.toFixed(2)}°, ${i.toFixed(2)}°`,a>=71?"err":a>=41?"warn":"info"),yo(Gt,{timestamp:new Date().toISOString(),source:"TGT",message:`TARGET LOCKED: ${o} THREAT=${a}`,alert:a>=41});const s=nr[e]??{country:"—",pop:"—",status:"UNKNOWN"};gr.textContent=o,vr.innerHTML=ir(e),yr.textContent=s.country,br.textContent=s.pop,_r.textContent=`${n.toFixed(2)}°, ${i.toFixed(2)}°`;const l=a>=70?"CRITICAL":a>=40?"ELEVATED":"LOW";ha.textContent=`${a} — ${l}`,ha.style.color=a>=70?"var(--text-alert)":a>=40?"var(--neon-warn)":"var(--neon-green)",wr.textContent=s.status,nt.classList.toggle("node-popup--left",i>60),nt.setAttribute("aria-hidden","false"),nt.classList.add("node-popup--visible")});ee.addEventListener("s9:threatmap-node-deselect",()=>{nt.classList.remove("node-popup--visible"),setTimeout(()=>nt.setAttribute("aria-hidden","true"),260)});function Sr(){rr(document.getElementById("threatmap-tactical"),It,Wa,Ie,{initThreatMap:Fa,addNode:Na,removeNode:Ua,updateNodeLevel:So,setThreatLevel:Bt,setActiveNode:He,focusNode:Ft})}function xr(){lr(document.getElementById("flow-matrix"),{initMatrix:Gn,activateEdge:Aa,deactivateEdge:Ta,pulseNode:Hn,setActiveNode:Mt})}const Er=document.getElementById("rr-panel");let M=null,Se=!1,Rt=null;const Ja={easeInOutCubic:Oa,easeOutExpo:Ba,backInOut:Ci,linear:Mi},en={default:{label:"Default",lineColor:65484,glowColor:65484,opacity:.72,glowOpacity:.28,emissiveIntensity:1.8,stagger:.55,ringFade:.35,warpAmount:.12,direction:"south-to-north",easingKey:"easeInOutCubic",durationMs:2200},pulse:{label:"Pulse",lineColor:16711782,lineColorB:16737792,glowColor:16711748,glowColorB:16729088,opacity:.95,glowOpacity:.55,emissiveIntensity:6,stagger:1,ringFade:.1,warpAmount:.2,direction:"equator-out",easingKey:"easeOutExpo",durationMs:1400,glowLayers:5},scanner:{label:"Scanner",lineColor:65382,glowColor:47940,opacity:.9,glowOpacity:.35,emissiveIntensity:3,stagger:.96,ringFade:.07,warpAmount:.03,direction:"south-to-north",easingKey:"linear",durationMs:2200},cosmic:{label:"Cosmic",lineColor:10044671,lineColorB:61183,glowColor:5579468,glowColorB:39355,opacity:.75,glowOpacity:.38,emissiveIntensity:2.8,stagger:.48,ringFade:.38,warpAmount:.24,direction:"equator-out",easingKey:"easeInOutCubic",durationMs:3200},ignition:{label:"Ignition",lineColor:16772608,lineColorB:16720384,glowColor:16750848,glowColorB:16716032,opacity:.95,glowOpacity:.55,emissiveIntensity:5.5,stagger:.88,ringFade:.2,warpAmount:.5,direction:"south-to-north",easingKey:"backInOut",durationMs:1600,glowLayers:4},ghost:{label:"Ghost",lineColor:8956671,lineColorB:4491519,glowColor:4495871,glowColorB:2245836,opacity:.28,glowOpacity:.07,emissiveIntensity:.8,stagger:.68,ringFade:.58,warpAmount:.42,direction:"north-to-south",easingKey:"easeOutExpo",durationMs:4500},neon:{label:"Neon",lineColor:16711935,lineColorB:65535,glowColor:13369599,glowColorB:65484,opacity:.85,glowOpacity:.45,emissiveIntensity:4.5,stagger:.62,ringFade:.28,warpAmount:.16,direction:"south-to-north",easingKey:"easeOutExpo",durationMs:2e3,glowLayers:5},solar:{label:"Solar",lineColor:16777215,lineColorB:16742144,glowColor:16768256,glowColorB:16724736,opacity:.8,glowOpacity:.5,emissiveIntensity:6,stagger:1,ringFade:.18,warpAmount:.1,direction:"equator-out",easingKey:"easeOutExpo",durationMs:1600,glowLayers:4},arctic:{label:"Arctic",lineColor:61183,lineColorB:15663103,glowColor:8978431,glowColorB:13434879,opacity:.62,glowOpacity:.22,emissiveIntensity:2,stagger:.42,ringFade:.42,warpAmount:.1,direction:"north-to-south",easingKey:"easeInOutCubic",durationMs:3e3},alert:{label:"Alert",lineColor:16746496,lineColorB:16711680,glowColor:16733440,glowColorB:13369344,opacity:.92,glowOpacity:.48,emissiveIntensity:4.5,stagger:.78,ringFade:.22,warpAmount:.22,direction:"equator-out",easingKey:"backInOut",durationMs:1600},ember:{label:"Ember",lineColor:16763904,lineColorB:16724736,glowColor:16750848,glowColorB:16716032,opacity:.68,glowOpacity:.32,emissiveIntensity:3.5,stagger:.62,ringFade:.52,warpAmount:.38,direction:"south-to-north",easingKey:"backInOut",durationMs:3800,glowLayers:3}};function tn(){Rt!==null&&(clearTimeout(Rt),Rt=null)}function Jt(t,e){tn(),t<=0?e():Rt=setTimeout(e,t)}function Be(){Se=!1,tn(),M&&M.stop(),document.getElementById("rr-loop").classList.remove("active")}function on(t){if(!M)return;const e=document.getElementById("rr-loopMode").value,o=+document.getElementById("rr-pause").value;e==="play-reverse"?(M.reset(),M.play(()=>Jt(o,()=>{Se&&M.reverse(()=>Jt(o,t))}))):(M.reset(),M.play(()=>Jt(o,t)))}function an(){Se&&on(()=>{Se&&an()})}function Mr(t,e=!0){var i;const o=en[t];if(!o||!M)return;if(document.querySelectorAll("#rr-presets button").forEach(s=>s.classList.remove("active")),(i=document.getElementById(`rr-pre-${t}`))==null||i.classList.add("active"),M._options.durationMs=o.durationMs,o.direction){document.getElementById("rr-dir").value=o.direction;const l={"south-to-north":0,"north-to-south":1,"equator-out":2}[o.direction]??0;M._baseRings.material.uniforms.uDirection.value=l,M._glowLayers.forEach(c=>{c.material.uniforms.uDirection.value=l}),M._options.direction=o.direction}o.easingKey&&(document.getElementById("rr-easing").value=o.easingKey,M._options.easingFn=Ja[o.easingKey]),document.getElementById("rr-dur").value=o.durationMs,document.getElementById("rr-vDur").textContent=o.durationMs;const a=e?+document.getElementById("rr-morphDur").value:0;M.morphTo({lineColor:o.lineColor,lineColorB:o.lineColorB??o.lineColor,glowColor:o.glowColor,glowColorB:o.glowColorB??o.glowColor,opacity:o.opacity,glowOpacity:o.glowOpacity,emissiveIntensity:o.emissiveIntensity,stagger:o.stagger,warpAmount:o.warpAmount,ringFade:o.ringFade,glowLayers:o.glowLayers??3,glowLayerRadiusStep:o.glowLayerRadiusStep??.004,glowLayerOpacityFalloff:o.glowLayerOpacityFalloff??.5},a);const n=(s,l,c,d)=>{l!==void 0&&(document.getElementById(s).value=l,c&&(document.getElementById(c).textContent=d?d(l):l))};if(n("rr-opacity",o.opacity!==void 0?Math.round(o.opacity*100):void 0,"rr-vOpacity",s=>(s/100).toFixed(2)),n("rr-glowOp",o.glowOpacity!==void 0?Math.round(o.glowOpacity*100):void 0,"rr-vGlowOp",s=>(s/100).toFixed(2)),n("rr-emissive",o.emissiveIntensity!==void 0?Math.round(o.emissiveIntensity*100):void 0,"rr-vEmissive",s=>(s/100).toFixed(2)),n("rr-stagger",o.stagger!==void 0?Math.round(o.stagger*100):void 0,"rr-vStagger",s=>(s/100).toFixed(2)),n("rr-warp",o.warpAmount!==void 0?Math.round(o.warpAmount*100):void 0,"rr-vWarp",s=>(s/100).toFixed(2)),o.ringFade!==void 0){const s=Math.max(.001,o.ringFade);n("rr-ringFade",Math.round(s*100),"rr-vRingFade",l=>(l/100).toFixed(2))}o.lineColor!==void 0&&(document.getElementById("rr-colLine").value="#"+o.lineColor.toString(16).padStart(6,"0")),o.lineColorB!==void 0&&(document.getElementById("rr-colLineB").value="#"+(o.lineColorB??o.lineColor).toString(16).padStart(6,"0")),o.glowColor!==void 0&&(document.getElementById("rr-colGlow").value="#"+o.glowColor.toString(16).padStart(6,"0")),o.glowColorB!==void 0&&(document.getElementById("rr-colGlowB").value="#"+(o.glowColorB??o.glowColor).toString(16).padStart(6,"0"))}function Cr(){var e;if(M=ki(ee),!M)return;const t=document.getElementById("rr-presets");Object.entries(en).forEach(([o,a])=>{const n=document.createElement("button");n.id=`rr-pre-${o}`,n.textContent=a.label,n.addEventListener("click",()=>Mr(o,!0)),t.appendChild(n)}),(e=document.getElementById("rr-pre-default"))==null||e.classList.add("active"),document.getElementById("rr-enable").addEventListener("change",o=>{if(M)if(o.target.checked){const a=+document.getElementById("rr-opacity").value/100,n=+document.getElementById("rr-glowOp").value/100;M.morphTo({opacity:a,glowOpacity:n},400),M.play()}else Be(),M.morphTo({opacity:0,glowOpacity:0},400)}),document.getElementById("rr-play").addEventListener("click",()=>{Be(),M.play()}),document.getElementById("rr-rev").addEventListener("click",()=>{Be(),M.reverse()}),document.getElementById("rr-stop").addEventListener("click",()=>{Be(),M.stop()}),document.getElementById("rr-reset").addEventListener("click",()=>{Be(),M.reset()}),document.getElementById("rr-loop").addEventListener("click",()=>{Se=!Se,document.getElementById("rr-loop").classList.toggle("active",Se),Se?an():Be()}),document.getElementById("rr-once").addEventListener("click",()=>{Be(),Se=!0,on(()=>{Se=!1})}),document.getElementById("rr-dir").addEventListener("change",o=>{const n={"south-to-north":0,"north-to-south":1,"equator-out":2}[o.target.value]??0;M._options.direction=o.target.value,M._baseRings.material.uniforms.uDirection.value=n,M._glowLayers.forEach(i=>{i.material.uniforms.uDirection.value=n})}),document.getElementById("rr-easing").addEventListener("change",o=>{M._options.easingFn=Ja[o.target.value]}),document.getElementById("rr-dur").addEventListener("input",o=>{M._options.durationMs=+o.target.value,document.getElementById("rr-vDur").textContent=o.target.value}),document.getElementById("rr-stagger").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vStagger").textContent=a.toFixed(2),M._baseRings.material.uniforms.uStagger.value=a,M._glowLayers.forEach(n=>{n.material.uniforms.uStagger.value=a}),M._options.stagger=a}),document.getElementById("rr-ringFade").addEventListener("input",o=>{const a=Math.max(.001,o.target.value/100);document.getElementById("rr-vRingFade").textContent=a.toFixed(2),M._baseRings.material.uniforms.uRingFade.value=a,M._glowLayers.forEach(n=>{n.material.uniforms.uRingFade.value=a}),M._options.ringFade=a}),document.getElementById("rr-invert").addEventListener("change",o=>{M.setInvert(o.target.checked)}),document.getElementById("rr-colLine").addEventListener("input",o=>{const a=parseInt(o.target.value.slice(1),16);M._baseRings.material.uniforms.uColor.value.set(a),M._options.lineColor=a}),document.getElementById("rr-colLineB").addEventListener("input",o=>{const a=parseInt(o.target.value.slice(1),16);M._baseRings.material.uniforms.uColorB.value.set(a),M._options.lineColorB=a}),document.getElementById("rr-colGlow").addEventListener("input",o=>{const a=parseInt(o.target.value.slice(1),16);M._glowLayers.forEach(n=>n.material.uniforms.uColor.value.set(a)),M._options.glowColor=a}),document.getElementById("rr-colGlowB").addEventListener("input",o=>{const a=parseInt(o.target.value.slice(1),16);M._glowLayers.forEach(n=>n.material.uniforms.uColorB.value.set(a)),M._options.glowColorB=a}),document.getElementById("rr-gradMode").addEventListener("change",o=>{M.setGradientMode(+o.target.value)}),document.getElementById("rr-opacity").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vOpacity").textContent=a.toFixed(2),document.getElementById("rr-enable").checked&&(M._baseRings.material.uniforms.uOpacity.value=a,M._options.opacity=a)}),document.getElementById("rr-glowOp").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vGlowOp").textContent=a.toFixed(2),document.getElementById("rr-enable").checked&&(M._glowLayers.forEach((n,i)=>{n.material.uniforms.uOpacity.value=a*Math.pow(M._options.glowLayerOpacityFalloff,i)}),M._options.glowOpacity=a)}),document.getElementById("rr-emissive").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vEmissive").textContent=a.toFixed(2),M._baseRings.material.uniforms.uEmissiveIntensity.value=a,M._glowLayers.forEach(n=>{n.material.uniforms.uEmissiveIntensity.value=a}),M._options.emissiveIntensity=a}),document.getElementById("rr-warp").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vWarp").textContent=a.toFixed(2),M._baseRings.material.uniforms.uWarpAmount.value=a,M._glowLayers.forEach(n=>{n.material.uniforms.uWarpAmount.value=a}),M._options.warpAmount=a}),document.getElementById("rr-glowRad").addEventListener("input",o=>{const a=o.target.value/1e3;document.getElementById("rr-vGlowRad").textContent=a.toFixed(3);const n=M._options.glowRadius;M._glowLayers.forEach(i=>i.scale.setScalar(a/n)),M._options.glowRadius=a}),document.getElementById("rr-glowLayers").addEventListener("change",o=>{const a=+o.target.value;document.getElementById("rr-vGlowLayers").textContent=a,M.morphTo({glowLayers:a},0)}),document.getElementById("rr-glowStep").addEventListener("change",o=>{const a=o.target.value/1e3;document.getElementById("rr-vGlowStep").textContent=a.toFixed(3),M.morphTo({glowLayerRadiusStep:a},0)}),document.getElementById("rr-glowFalloff").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vGlowFalloff").textContent=a.toFixed(2),M.morphTo({glowLayerOpacityFalloff:a},0)}),document.getElementById("rr-colorSpread").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vColorSpread").textContent=a.toFixed(2),M._baseRings.material.uniforms.uColorSpread.value=a,M._glowLayers.forEach(n=>{n.material.uniforms.uColorSpread.value=a}),M._options.colorSpread=a}),document.getElementById("rr-brightSpread").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vBrightSpread").textContent=a.toFixed(2),M._baseRings.material.uniforms.uBrightSpread.value=a,M._glowLayers.forEach(n=>{n.material.uniforms.uBrightSpread.value=a}),M._options.brightSpread=a}),document.getElementById("rr-flickerAmp").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vFlickerAmp").textContent=a.toFixed(2),M._baseRings.material.uniforms.uFlickerAmp.value=a,M._glowLayers.forEach(n=>{n.material.uniforms.uFlickerAmp.value=a}),M._options.flickerAmp=a}),document.getElementById("rr-flickerSpeed").addEventListener("input",o=>{const a=o.target.value/10;document.getElementById("rr-vFlickerSpeed").textContent=a.toFixed(1),M._baseRings.material.uniforms.uFlickerSpeed.value=a,M._glowLayers.forEach(n=>{n.material.uniforms.uFlickerSpeed.value=a}),M._options.flickerSpeed=a}),document.getElementById("rr-arcSpread").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vArcSpread").textContent=a.toFixed(2),M._baseRings.material.uniforms.uArcColorSpread.value=a,M._glowLayers.forEach(n=>{n.material.uniforms.uArcColorSpread.value=a}),M._options.arcColorSpread=a}),document.getElementById("rr-morphDur").addEventListener("input",o=>{document.getElementById("rr-vMorphDur").textContent=o.target.value}),document.getElementById("rr-pause").addEventListener("input",o=>{document.getElementById("rr-vPause").textContent=o.target.value})}Cr();(function(){const e=Ni(ee);if(!e)return;const o=1.002,a=new Ne({color:65484,transparent:!0,opacity:.18,blending:$,depthTest:!0,depthWrite:!1}),n=new ho,i=10,s=20,l=64;for(let u=1;u<i;u++){const m=u/i*Math.PI,f=o*Math.cos(m),g=o*Math.sin(m),y=[];for(let x=0;x<=l;x++){const p=x/l*Math.PI*2;y.push(new P(g*Math.cos(p),f,g*Math.sin(p)))}const v=new po(new De().setFromPoints(y),a);v.renderOrder=3,n.add(v)}for(let u=0;u<s;u++){const m=u/s*Math.PI*2,f=[];for(let y=0;y<=l;y++){const v=y/l*Math.PI;f.push(new P(o*Math.sin(v)*Math.cos(m),o*Math.cos(v),o*Math.sin(v)*Math.sin(m)))}const g=new go(new De().setFromPoints(f),a);g.renderOrder=3,n.add(g)}n.visible=!1,e.add(n);function c(u,m,f){const y=new In(1,m).attributes.position,v=y.count/3,x=new P,p=new P,w=new Map;for(let b=0;b<v;b++){const S=b*3;for(let E=0;E<3;E++){const C=S+E,A=S+(E+1)%3;x.fromBufferAttribute(y,C),p.fromBufferAttribute(y,A);const B=[x,p].map(U=>`${U.x.toFixed(5)},${U.y.toFixed(5)},${U.z.toFixed(5)}`).sort().join("|");w.has(B)||w.set(B,[x.clone(),p.clone()])}}const _=[];for(const[b,S]of w.values())for(let E=0;E<f;E++){const C=new P().lerpVectors(b,S,E/f).normalize().multiplyScalar(u),A=new P().lerpVectors(b,S,(E+1)/f).normalize().multiplyScalar(u);_.push(C.x,C.y,C.z,A.x,A.y,A.z)}return new Float32Array(_)}const d=new ct;d.setPositions(c(o,3,4));const h=new pe({color:65484,transparent:!0,opacity:.22,blending:$,depthTest:!0,depthWrite:!1,linewidth:1,resolution:new k(window.innerWidth,window.innerHeight)}),r=new J(d,h);r.renderOrder=3,r.visible=!1,e.add(r),window.addEventListener("resize",()=>h.resolution.set(window.innerWidth,window.innerHeight)),document.getElementById("rr-globe").addEventListener("change",u=>{const m=u.target.value;n.visible=m==="latlon",r.visible=m==="wire"})})();function nn(){const t=Math.random(),e=.7+Math.random()*.3,o=.45+Math.random()*.2,a=new O().setHSL(t,e,o);return Math.round(a.r*255)<<16|Math.round(a.g*255)<<8|Math.round(a.b*255)}function sn(t){const e=new O(t),o={};e.getHSL(o);const a=(o.h+(Math.random()-.5)*.25+1)%1,n=Math.max(.5,Math.min(1,o.s+(Math.random()-.5)*.3)),i=Math.max(.3,Math.min(.75,o.l+(Math.random()-.5)*.25)),s=new O().setHSL(a,n,i);return Math.round(s.r*255)<<16|Math.round(s.g*255)<<8|Math.round(s.b*255)}function Ut(t,e){document.getElementById(t).value="#"+e.toString(16).padStart(6,"0")}document.getElementById("rr-randLine").addEventListener("click",()=>{if(!M)return;const t=nn(),e=sn(t),o=+document.getElementById("rr-morphDur").value;M.morphTo({lineColor:t,lineColorB:e},o),Ut("rr-colLine",t),Ut("rr-colLineB",e)});document.getElementById("rr-randGlow").addEventListener("click",()=>{if(!M)return;const t=nn(),e=sn(t),o=+document.getElementById("rr-morphDur").value;M.morphTo({glowColor:t,glowColorB:e},o),Ut("rr-colGlow",t),Ut("rr-colGlowB",e)});document.getElementById("rain-color").addEventListener("input",t=>{ae.setColor(t.target.value)});document.getElementById("rain-opacity").addEventListener("input",t=>{const e=t.target.value/100;document.getElementById("rain-vOpacity").textContent=e.toFixed(2),ae.setOpacity(e)});document.getElementById("rain-burstBloom").addEventListener("change",t=>{ae.setBurstBloom(t.target.checked)});document.getElementById("rain-globeInteract").addEventListener("change",t=>{ae.setGlobeInteract(t.target.checked)});document.getElementById("rain-chroma").addEventListener("change",t=>{const e=+document.getElementById("rain-chromaScale").value/100;ae.setGlyphChroma(t.target.checked,e)});document.getElementById("rain-chromaScale").addEventListener("input",t=>{const e=t.target.value/100;document.getElementById("rain-vChromaScale").textContent=e.toFixed(1),document.getElementById("rain-chroma").checked&&ae.setGlyphChroma(!0,e)});document.getElementById("rain-heat").addEventListener("change",t=>{const e=+document.getElementById("rain-heatAmt").value/1e3;ae.setHeat(t.target.checked,e)});document.getElementById("rain-heatAmt").addEventListener("input",t=>{const e=t.target.value/1e3;document.getElementById("rain-vHeatAmt").textContent=e.toFixed(3),ae.setHeat(document.getElementById("rain-heat").checked,e)});document.getElementById("rain-streaks").addEventListener("change",t=>{const e=+document.getElementById("rain-streakAmt").value/1e3;ae.setStreaks(t.target.checked,e)});document.getElementById("rain-streakAmt").addEventListener("input",t=>{const e=t.target.value/1e3;document.getElementById("rain-vStreakAmt").textContent=e.toFixed(3),ae.setStreaks(document.getElementById("rain-streaks").checked,e)});document.getElementById("rain-soften").addEventListener("change",t=>{const e=+document.getElementById("rain-softenStr").value/1e3;ae.setSoften(t.target.checked,e)});document.getElementById("rain-softenStr").addEventListener("input",t=>{const e=t.target.value/1e3;document.getElementById("rain-vSoftenStr").textContent=e.toFixed(3),ae.setSoften(document.getElementById("rain-soften").checked,e)});document.getElementById("rain-depth").addEventListener("input",t=>{const e=t.target.value/100;document.getElementById("rain-vDepth").textContent=e.toFixed(2),ae.setDepth(e)});document.getElementById("rain-normalStr").addEventListener("input",t=>{const e=t.target.value/100;document.getElementById("rain-vNormalStr").textContent=e.toFixed(1),ae.setNormalStrength(e)});document.querySelectorAll("#rr-panel .rr-collapsible").forEach(t=>{t.addEventListener("click",()=>{const e=document.getElementById(t.dataset.target);t.classList.toggle("rr-open"),e.classList.toggle("rr-open")})});document.getElementById("ts-glitchEnabled").addEventListener("change",t=>{const e=document.getElementById("ts-glitchStrength").value/1e3,o=document.getElementById("ts-glitchSpeed").value/10,a=+document.getElementById("ts-glitchCols").value;me.setGlitch(t.target.checked,e,o,a)});document.getElementById("ts-glitchStrength").addEventListener("input",t=>{const e=t.target.value/1e3;document.getElementById("ts-vGlitchStrength").textContent=e.toFixed(3),me.setGlitch(document.getElementById("ts-glitchEnabled").checked,e)});document.getElementById("ts-glitchSpeed").addEventListener("input",t=>{const e=t.target.value/10;document.getElementById("ts-vGlitchSpeed").textContent=e.toFixed(1),me.setGlitch(document.getElementById("ts-glitchEnabled").checked,void 0,e)});document.getElementById("ts-glitchCols").addEventListener("input",t=>{const e=+t.target.value;document.getElementById("ts-vGlitchCols").textContent=e,me.setGlitch(document.getElementById("ts-glitchEnabled").checked,void 0,void 0,e)});document.getElementById("ts-chromaEnabled").addEventListener("change",t=>{const e=document.getElementById("ts-chromaOffset").value/1e4;me.setChroma(t.target.checked,e)});document.getElementById("ts-chromaOffset").addEventListener("input",t=>{const e=t.target.value/1e4;document.getElementById("ts-vChromaOffset").textContent=e.toFixed(4),me.setChroma(document.getElementById("ts-chromaEnabled").checked,e)});const rn=document.querySelector(".s9-telescreen__scratches"),ln=document.querySelector(".s9-telescreen__vignette"),Ar=document.querySelector(".s9-telescreen__scanlines"),Tr=document.querySelector(".s9-telescreen__static"),Lr=document.querySelector(".s9-telescreen__static-b"),Ir=[document.querySelector(".s9-telescreen__phase-a"),document.querySelector(".s9-telescreen__phase-b"),document.querySelector(".s9-telescreen__phase-c")],cn=document.querySelector(".s9-telescreen__glow");document.getElementById("ts-scratchEnabled").addEventListener("change",t=>{rn.style.display=t.target.checked?"":"none"});document.getElementById("ts-scratchOpacity").addEventListener("input",t=>{const e=t.target.value/100;document.getElementById("ts-vScratchOpacity").textContent=e.toFixed(2),rn.style.opacity=e});document.getElementById("ts-vignetteEnabled").addEventListener("change",t=>{ln.style.display=t.target.checked?"":"none"});document.getElementById("ts-vignetteOpacity").addEventListener("input",t=>{const e=t.target.value/100;document.getElementById("ts-vVignetteOpacity").textContent=e.toFixed(2),ln.style.opacity=e});document.getElementById("ts-scanlinesEnabled").addEventListener("change",t=>{Ar.style.display=t.target.checked?"block":"none"});document.getElementById("ts-staticEnabled").addEventListener("change",t=>{const e=t.target.checked?"":"none";Tr.style.display=e,Lr.style.display=e});document.getElementById("ts-phaseEnabled").addEventListener("change",t=>{const e=t.target.checked?"":"none";Ir.forEach(o=>{o.style.display=e})});document.getElementById("ts-glowEnabled").addEventListener("change",t=>{cn.style.display=t.target.checked?"":"none"});document.getElementById("ts-glowOpacity").addEventListener("input",t=>{const e=t.target.value/100;document.getElementById("ts-vGlowOpacity").textContent=e.toFixed(2),cn.style.opacity=e});document.getElementById("ts-warp").addEventListener("input",t=>{const e=t.target.value/100;document.getElementById("ts-vWarp").textContent=e.toFixed(2),me.setShader({warpMult:e})});document.getElementById("ts-hardPix").addEventListener("input",t=>{const e=t.target.value/10;document.getElementById("ts-vHardPix").textContent=e.toFixed(1),me.setShader({hardPix:-e})});document.getElementById("ts-maskStr").addEventListener("input",t=>{const e=t.target.value/100;document.getElementById("ts-vMaskStr").textContent=e.toFixed(2),me.setShader({maskStr:e})});document.getElementById("ts-grain").addEventListener("input",t=>{const e=t.target.value/1e3;document.getElementById("ts-vGrain").textContent=e.toFixed(3),me.setShader({grainAmt:e})});document.getElementById("ts-halation").addEventListener("input",t=>{const e=t.target.value/100;document.getElementById("ts-vHalation").textContent=e.toFixed(2),me.setShader({halationStr:e})});document.getElementById("ts-convergence").addEventListener("input",t=>{const e=t.target.value/1e4;document.getElementById("ts-vConvergence").textContent=e.toFixed(4),me.setShader({convergence:e})});function dn(){const t=document.getElementById("rain-grEnabled").checked,e=document.getElementById("rain-grLightX").value/100,o=document.getElementById("rain-grLightY").value/100,a=document.getElementById("rain-grDensity").value/100,n=document.getElementById("rain-grDecay").value/100,i=document.getElementById("rain-grWeight").value/100,s=document.getElementById("rain-grExposure").value/100;ae.setGodRays(t,e,o,a,n,i,s)}document.getElementById("rain-grEnabled").addEventListener("change",dn);[["rain-grLightX","rain-vGrLightX",100,2],["rain-grLightY","rain-vGrLightY",100,2],["rain-grDensity","rain-vGrDensity",100,2],["rain-grDecay","rain-vGrDecay",100,2],["rain-grWeight","rain-vGrWeight",100,2],["rain-grExposure","rain-vGrExposure",100,2]].forEach(([t,e,o,a])=>{document.getElementById(t).addEventListener("input",n=>{document.getElementById(e).textContent=(n.target.value/o).toFixed(a),dn()})});const Dr=["intel-feed-1","sys-metrics","seq-log-right","neural-readout-1","operative-log","data-stream-1","terminal-1","telescreen-1"],Rr=Dr.map(t=>document.querySelector(`[data-s9-id="${t}"]`));let eo=!1;window.addEventListener("keydown",t=>{t.key==="h"||t.key==="H"?Er.classList.toggle("rr-visible"):(t.key==="i"||t.key==="I")&&(eo=!eo,Rr.forEach(e=>e==null?void 0:e.classList.toggle("s9-panel--i-hidden",eo)))});
