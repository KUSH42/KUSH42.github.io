import{C as Bo,V as L,M as ze,T as Ge,Q as da,S as ha,a as N,R as Go,P as Ho,b as At,c as X,O as Ka,B as Ie,F as Ct,d as J,U as et,W as pt,H as gt,N as zo,e as Wo,f as P,A as K,g as we,G as Za,L as ce,h as Be,i as It,I as Qa,j as jt,k as He,l as $o,m as ta,n as Ja,o as vt,p as yt,q as tt,r as Vo,s as eo,t as ge,u as qt,v as aa,w as oa,x as to,y as Ce,z as fa,D as jo,E as bt,J as ao,K as qo,X as oo,Y as Yo,Z as so,_ as ma,$ as pa,a0 as io,a1 as it,a2 as Xo,a3 as Ko,a4 as Zo,a5 as ga,a6 as Qo,a7 as Jo,a8 as es,a9 as at,aa as Ve,ab as ts,ac as no}from"./three-Dno5jR9y.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=a(i);fetch(i.href,s)}})();const ro=new WeakMap;function as(t,{onSubmit:e,tabComplete:a}={}){const o=new AbortController,{signal:i}=o,s=window.matchMedia("(prefers-reduced-motion: reduce)").matches,n={abortController:o,history:[],historyIndex:-1,partialInput:"",reducedMotion:s};ro.set(t,n);const r=t.querySelector(".s9-terminal__input");r&&r.addEventListener("keydown",c=>{ss(t,c,{onSubmit:e,tabComplete:a})},{signal:i})}function D(t,e,a){const o=t.querySelector(".s9-terminal__output");if(!o)return;const i=document.createElement("span");i.className=`s9-terminal__line s9-terminal__line--${a}`,i.textContent=e,o.appendChild(i);const s=200,n=o.querySelectorAll(".s9-terminal__line");n.length>s&&n[0].remove(),is(o)}function os(t){const e=t.querySelector(".s9-terminal__output");e&&(e.querySelectorAll(".s9-terminal__line").forEach(a=>a.remove()),t.dispatchEvent(new CustomEvent("s9:terminal-clear",{bubbles:!0})))}function ss(t,e,{onSubmit:a,tabComplete:o}){const i=ro.get(t);if(!i)return;const s=t.querySelector(".s9-terminal__input");if(s)switch(e.key){case"Enter":{const n=s.value;if(!n)return;D(t,n,"cmd"),typeof a=="function"&&a(n),t.dispatchEvent(new CustomEvent("s9:terminal-submit",{bubbles:!0,detail:{command:n,timestamp:new Date().toISOString()}})),i.history.unshift(n),i.historyIndex=-1,i.partialInput="",s.value="";break}case"ArrowUp":{if(e.preventDefault(),i.history.length===0)return;i.historyIndex===-1&&(i.partialInput=s.value);const n=i.historyIndex+1;if(n<i.history.length){i.historyIndex=n,s.value=i.history[i.historyIndex];const r=s.value.length;s.setSelectionRange(r,r)}break}case"ArrowDown":{if(e.preventDefault(),i.historyIndex===-1)return;if(i.historyIndex>0){i.historyIndex-=1,s.value=i.history[i.historyIndex];const n=s.value.length;s.setSelectionRange(n,n)}else{i.historyIndex=-1,s.value=i.partialInput;const n=s.value.length;s.setSelectionRange(n,n)}break}case"Tab":{if(e.preventDefault(),typeof o=="function"){const n=o(s.value);n!=null&&(s.value=n)}break}default:{if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!i.reducedMotion&&Math.random()<.01){const n=t.querySelector(".s9-terminal__output");if(n){const c=Array.from(n.querySelectorAll(".s9-terminal__line")).slice(-8);if(c.length>0){const u=c[Math.floor(Math.random()*c.length)];u.classList.add("glitch-enter"),u.addEventListener("animationend",d=>{d.animationName==="glitch"&&u.classList.remove("glitch-enter")},{once:!0})}}}break}}}function is(t){t.scrollTop=t.scrollHeight}const lo=new WeakMap;function ns(t){const e=new AbortController,{signal:a}=e,o={ac:e,paused:!1,filter:null};lo.set(t,o);const i=t.querySelector(".s9-stream__body");i&&(i.addEventListener("mouseenter",()=>{o.paused=!0,i.dataset.paused="true"},{signal:a}),i.addEventListener("mouseleave",()=>{o.paused=!1,i.dataset.paused="false",co(i)},{signal:a}),i.addEventListener("click",s=>{const n=s.target.closest(".s9-stream__row");if(!n)return;const r=n.classList.contains("s9-stream__row--pinned");n.classList.toggle("s9-stream__row--pinned",!r),t.dispatchEvent(new CustomEvent("s9:stream-row-pinned",{bubbles:!0,detail:{row:n,pinned:!r}}))},{signal:a}))}function sa(t,{timestamp:e,source:a,message:o,alert:i=!1}){const s=t.querySelector(".s9-stream__body");if(!s)return;const n=lo.get(t),r=(n==null?void 0:n.filter)??null,c=document.createElement("div");c.className="s9-stream__row",i&&c.classList.add("s9-stream__row--alert"),r&&a!==r&&(c.hidden=!0),c.innerHTML=`<span class="s9-stream__timestamp">${Nt(e)}</span><span class="s9-stream__source">${Nt(a)}</span><span class="s9-stream__message">${Nt(o)}</span>`,c.classList.add("glitch-enter"),c.addEventListener("animationend",()=>c.classList.remove("glitch-enter"),{once:!0}),s.appendChild(c),s.children.length>100&&s.removeChild(s.firstChild),n!=null&&n.paused||co(s)}function co(t){t.scrollTop=t.scrollHeight}function Nt(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function rs(t,e){e(),t.classList.remove("glitch-enter"),t.offsetWidth,t.classList.add("glitch-enter"),t.addEventListener("animationend",()=>t.classList.remove("glitch-enter"),{once:!0})}const Ut=.37;function va(t){return t>.08&&t<.18?Math.sin((t-.08)/.1*Math.PI)*.18:t>.28&&t<.32?-((t-.28)/.04)*.38:t>.32&&t<.37?-.38+(t-.32)/.05*1.38:t>.37&&t<.43?1-(t-.37)/.06*1.28:t>.43&&t<.49?-.28+(t-.43)/.06*.28:t>.52&&t<.68?Math.sin((t-.52)/.16*Math.PI)*.3:0}function ls(t,e){if(!t)return console.warn("initEkg: canvas element not found"),{setBpm(){},destroy(){}};let a=62,o=0,i=0,s=0,n=0;function r(){e&&(e.classList.remove("beat"),e.offsetWidth,e.classList.add("beat"))}function c(){const h=t.getContext("2d"),f=t.width,g=t.height,m=g/2,S=g*.44,_=a/60/80;h.clearRect(0,0,f,g);const E=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";h.beginPath();for(let y=0;y<f;y++){const w=((o-(f-1-y)*_)%1+1)%1,b=m-va(w)*S;y===0?h.moveTo(y,b):h.lineTo(y,b)}h.strokeStyle=E,h.lineWidth=1,h.shadowColor=E,h.shadowBlur=5,h.stroke();const v=m-va(o)*S;h.beginPath(),h.arc(f-1,v,1.8,0,Math.PI*2),h.fillStyle=E,h.shadowBlur=10,h.fill()}function u(){const h=t.clientWidth;h&&t.width!==h&&(t.width=h)}u();const d=new ResizeObserver(u);d.observe(t);function l(h){n=requestAnimationFrame(l);const f=s?h-s:16;s=h,i=o,o=(o+a/60*(f/1e3))%1,(i<Ut&&o>=Ut||i>o&&o>=Ut)&&r(),c()}return n=requestAnimationFrame(l),{setBpm(h){a=h},destroy(){cancelAnimationFrame(n),d.disconnect()}}}let ke=98.4;function uo(t,e,a,o,i,s){ke=Math.max(85,Math.min(100,ke+(Math.random()-.45)*1.2));const n=ke.toFixed(1),r=Math.round(58+(100-ke)/15*12);return i.textContent=r,s.setBpm(r),rs(t,()=>{e.textContent=n,a.textContent=`${n}%`,o.textContent=`${Math.round(ke)}%`}),ke}const ya=new WeakMap;function nt(t,e){const a=Math.max(0,Math.min(100,e)),o=t.querySelector(".s9-telemetry__bar-fill");if(o){o.style.width=`${a}%`;const r=["s9-telemetry__bar-fill--ok","s9-telemetry__bar-fill--warning","s9-telemetry__bar-fill--critical"];o.classList.remove(...r),a<=60?o.classList.add("s9-telemetry__bar-fill--ok"):a<=85?o.classList.add("s9-telemetry__bar-fill--warning"):o.classList.add("s9-telemetry__bar-fill--critical")}const i=t.querySelector(".s9-telemetry__value");i&&(i.textContent=Math.round(a).toString());const s=ya.get(t)??!1,n=a>85;n&&!s&&t.dispatchEvent(new CustomEvent("s9:telemetry-threshold",{bubbles:!0,detail:{value:a}})),ya.set(t,n)}const cs=8e3;function us(t,{level:e="critical",code:a,message:o,persistent:i=!1}){const s=document.createElement("div");s.className=`s9-alert s9-alert--${e}`,i&&(s.dataset.persistent="true");const n=e==="critical"?"⬡":"⚠",r=new Date().toISOString().replace("T"," ").substring(0,19)+" UTC";return s.innerHTML=`<span class="s9-alert__icon" aria-hidden="true">${n}</span><div class="s9-alert__body"><span class="s9-alert__code">${Ft(a)}</span><span class="s9-alert__message">${Ft(o)}</span></div><span class="s9-alert__timestamp">${Ft(r)}</span><button class="s9-alert__dismiss" aria-label="Dismiss alert">✕</button>`,s.classList.add("glitch-enter"),s.addEventListener("animationend",()=>s.classList.remove("glitch-enter"),{once:!0}),s.querySelector(".s9-alert__dismiss").addEventListener("click",()=>{ba(s)}),t.appendChild(s),i||setTimeout(()=>{s.isConnected&&ba(s)},cs),s}function ba(t){var a;if(!t.isConnected)return;const e=((a=t.querySelector(".s9-alert__code"))==null?void 0:a.textContent)??"";t.classList.add("s9-alert--dismissing"),t.addEventListener("transitionend",()=>{t.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:e}})),t.remove()},{once:!0}),setTimeout(()=>{t.isConnected&&(t.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:e}})),t.remove())},400)}function Ft(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const oe="http://www.w3.org/2000/svg",Oe=new WeakMap;function ds(t,{nodes:e=[],edges:a=[]}={}){const o=new AbortController,{signal:i}=o,s=window.matchMedia("(prefers-reduced-motion: reduce)").matches,n={abortController:o,nodeMap:new Map,edgeMap:new Map,activeNodeId:null,reducedMotion:s};Oe.set(t,n);const r=document.createElementNS(oe,"svg");r.setAttribute("class","s9-matrix__canvas"),r.setAttribute("viewBox","0 0 100 100"),r.setAttribute("preserveAspectRatio","xMidYMid meet"),r.setAttribute("role","img"),r.setAttribute("aria-label","Network topology matrix");const c=document.createElementNS(oe,"defs"),u=document.createElementNS(oe,"g");u.setAttribute("class","s9-matrix__edges");const d=document.createElementNS(oe,"g");d.setAttribute("class","s9-matrix__nodes"),r.appendChild(c),r.appendChild(u),r.appendChild(d),t.appendChild(r),e.forEach(l=>fs(t,l)),a.forEach(l=>ms(t,l)),a.forEach(l=>{l.active&&ho(t,l.id)}),r.addEventListener("click",l=>{const h=l.target.closest("[data-node-id]");h?_t(t,h.dataset.nodeId):n.activeNodeId!==null&&_t(t,null)},{signal:i}),r.addEventListener("keydown",l=>{if(l.key==="Enter"||l.key===" "){const h=l.target.closest("[data-node-id]");h&&(l.preventDefault(),_t(t,h.dataset.nodeId))}},{signal:i})}function hs(t,e){const a=Oe.get(t);if(!a)return;const o=a.nodeMap.get(e);if(!o||o.classList.contains("s9-matrix__node--active"))return;o.classList.add("s9-matrix__node--pulsing");const i=o.querySelector(".s9-matrix__node-ring");i&&i.addEventListener("animationend",s=>{s.animationName==="matrix-ring-pulse"&&o.classList.remove("s9-matrix__node--pulsing")},{once:!0})}function ho(t,e,a=null){const o=Oe.get(t);if(!o)return;if(e===null){for(const[m]of o.edgeMap)fo(t,m);return}const i=o.edgeMap.get(e);if(!i||i.active)return;const s=t.querySelector(".s9-matrix__canvas");if(!s)return;const n=s.querySelector(".s9-matrix__edges");if(!n)return;const{line:r,x1:c,y1:u,x2:d,y2:l}=i;r&&r.parentNode&&r.parentNode.removeChild(r);const h=`s9-edge-${e}`,f=document.createElementNS(oe,"path");f.setAttribute("class","s9-matrix__edge s9-matrix__edge--active"),f.setAttribute("id",h),f.setAttribute("data-edge-id",e),f.setAttribute("d",`M ${c} ${u} L ${d} ${l}`),n.appendChild(f);let g=null;if(!o.reducedMotion){g=document.createElementNS(oe,"circle"),g.setAttribute("class","s9-matrix__edge-dot"),g.setAttribute("r","1.2"),a&&(g.style.fill=a,g.style.filter=`drop-shadow(0 0 2px ${a})`);const m=document.createElementNS(oe,"animateMotion");m.setAttribute("dur","2s"),m.setAttribute("repeatCount","indefinite");const S=document.createElementNS(oe,"mpath");S.setAttributeNS("http://www.w3.org/1999/xlink","href",`#${h}`),m.appendChild(S),g.appendChild(m),n.appendChild(g)}i.line=f,i.dot=g,i.active=!0}function fo(t,e){const a=Oe.get(t);if(!a)return;const o=a.edgeMap.get(e);if(!o||!o.active)return;const i=t.querySelector(".s9-matrix__canvas");if(!i)return;const s=i.querySelector(".s9-matrix__edges");if(!s)return;const{line:n,dot:r,x1:c,y1:u,x2:d,y2:l}=o;r&&r.parentNode&&r.parentNode.removeChild(r),n&&n.parentNode&&n.parentNode.removeChild(n);const h=document.createElementNS(oe,"line");h.setAttribute("class","s9-matrix__edge"),h.setAttribute("data-edge-id",e),h.setAttribute("x1",c),h.setAttribute("y1",u),h.setAttribute("x2",d),h.setAttribute("y2",l),s.appendChild(h),o.line=h,o.dot=null,o.active=!1}function _t(t,e){const a=Oe.get(t);if(!a)return;if(a.activeNodeId!==null){const i=a.nodeMap.get(a.activeNodeId);i&&(i.classList.remove("s9-matrix__node--active"),i.setAttribute("aria-pressed","false")),t.dispatchEvent(new CustomEvent("s9:matrix-node-deselect",{bubbles:!0,detail:{nodeId:a.activeNodeId}})),a.activeNodeId=null}if(e===null)return;const o=a.nodeMap.get(e);o&&(o.classList.add("s9-matrix__node--active"),o.setAttribute("aria-pressed","true"),a.activeNodeId=e,t.dispatchEvent(new CustomEvent("s9:matrix-node-click",{bubbles:!0,detail:{nodeId:e,label:o.getAttribute("aria-label")??e}})))}function fs(t,{id:e,x:a,y:o,label:i,root:s=!1}){const n=Oe.get(t);if(!n)return;const r=t.querySelector(".s9-matrix__canvas");if(!r)return;const c=r.querySelector(".s9-matrix__nodes");if(!c)return;const u=document.createElementNS(oe,"g");u.setAttribute("class",`s9-matrix__node${s?" s9-matrix__node--root":""}`),u.setAttribute("data-node-id",e),u.setAttribute("tabindex","0"),u.setAttribute("role","button"),u.setAttribute("aria-label",i),u.setAttribute("aria-pressed","false");const d=document.createElementNS(oe,"circle");d.setAttribute("class","s9-matrix__node-ring"),d.setAttribute("cx",a),d.setAttribute("cy",o),d.setAttribute("r","4");const l=document.createElementNS(oe,"circle");l.setAttribute("class","s9-matrix__node-core"),l.setAttribute("cx",a),l.setAttribute("cy",o),l.setAttribute("r","2.5");const h=document.createElementNS(oe,"text");h.setAttribute("class","s9-matrix__node-label"),h.setAttribute("x",a),h.setAttribute("y",o+3.5),h.textContent=i,u.appendChild(d),u.appendChild(l),u.appendChild(h),c.appendChild(u),n.nodeMap.set(e,u)}function ms(t,{id:e,from:a,to:o}){const i=Oe.get(t);if(!i)return;const s=t.querySelector(".s9-matrix__canvas");if(!s)return;const n=s.querySelector(".s9-matrix__edges");if(!n)return;const r=i.nodeMap.get(a),c=i.nodeMap.get(o),u=r?parseFloat(r.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,d=r?parseFloat(r.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,l=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,h=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,f=document.createElementNS(oe,"line");f.setAttribute("class","s9-matrix__edge"),f.setAttribute("data-edge-id",e),f.setAttribute("x1",u),f.setAttribute("y1",d),f.setAttribute("x2",l),f.setAttribute("y2",h),n.appendChild(f),i.edgeMap.set(e,{line:f,dot:null,active:!1,from:a,to:o,x1:u,y1:d,x2:l,y2:h})}const _a={type:"change"},ia={type:"start"},mo={type:"end"},rt=new Go,wa=new Ho,ps=Math.cos(70*At.DEG2RAD),W=new L,ee=2*Math.PI,U={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},kt=1e-6;class gs extends Bo{constructor(e,a=null){super(e,a),this.state=U.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ze.ROTATE,MIDDLE:ze.DOLLY,RIGHT:ze.PAN},this.touches={ONE:Ge.ROTATE,TWO:Ge.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new da,this._lastTargetPosition=new L,this._quat=new da().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ha,this._sphericalDelta=new ha,this._scale=1,this._panOffset=new L,this._rotateStart=new N,this._rotateEnd=new N,this._rotateDelta=new N,this._panStart=new N,this._panEnd=new N,this._panDelta=new N,this._dollyStart=new N,this._dollyEnd=new N,this._dollyDelta=new N,this._dollyDirection=new L,this._mouse=new N,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ys.bind(this),this._onPointerDown=vs.bind(this),this._onPointerUp=bs.bind(this),this._onContextMenu=Ms.bind(this),this._onMouseWheel=Ss.bind(this),this._onKeyDown=xs.bind(this),this._onTouchStart=Es.bind(this),this._onTouchMove=Ts.bind(this),this._onMouseDown=_s.bind(this),this._onMouseMove=ws.bind(this),this._interceptControlDown=As.bind(this),this._interceptControlUp=Cs.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(_a),this.update(),this.state=U.NONE}pan(e,a){this._pan(e,a),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const a=this.object.position;W.copy(a).sub(this.target),W.applyQuaternion(this._quat),this._spherical.setFromVector3(W),this.autoRotate&&this.state===U.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let o=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(o)&&isFinite(i)&&(o<-Math.PI?o+=ee:o>Math.PI&&(o-=ee),i<-Math.PI?i+=ee:i>Math.PI&&(i-=ee),o<=i?this._spherical.theta=Math.max(o,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(o+i)/2?Math.max(o,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const n=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=n!=this._spherical.radius}if(W.setFromSpherical(this._spherical),W.applyQuaternion(this._quatInverse),a.copy(this.target).add(W),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let n=null;if(this.object.isPerspectiveCamera){const r=W.length();n=this._clampDistance(r*this._scale);const c=r-n;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){const r=new L(this._mouse.x,this._mouse.y,0);r.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;const u=new L(this._mouse.x,this._mouse.y,0);u.unproject(this.object),this.object.position.sub(u).add(r),this.object.updateMatrixWorld(),n=W.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;n!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(n).add(this.object.position):(rt.origin.copy(this.object.position),rt.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(rt.direction))<ps?this.object.lookAt(this.target):(wa.setFromNormalAndCoplanarPoint(this.object.up,this.target),rt.intersectPlane(wa,this.target))))}else if(this.object.isOrthographicCamera){const n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),n!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>kt||8*(1-this._lastQuaternion.dot(this.object.quaternion))>kt||this._lastTargetPosition.distanceToSquared(this.target)>kt?(this.dispatchEvent(_a),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ee/60*this.autoRotateSpeed*e:ee/60/60*this.autoRotateSpeed}_getZoomScale(e){const a=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*a)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,a){W.setFromMatrixColumn(a,0),W.multiplyScalar(-e),this._panOffset.add(W)}_panUp(e,a){this.screenSpacePanning===!0?W.setFromMatrixColumn(a,1):(W.setFromMatrixColumn(a,0),W.crossVectors(this.object.up,W)),W.multiplyScalar(e),this._panOffset.add(W)}_pan(e,a){const o=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;W.copy(i).sub(this.target);let s=W.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/o.clientHeight,this.object.matrix),this._panUp(2*a*s/o.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/o.clientWidth,this.object.matrix),this._panUp(a*(this.object.top-this.object.bottom)/this.object.zoom/o.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,a){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const o=this.domElement.getBoundingClientRect(),i=e-o.left,s=a-o.top,n=o.width,r=o.height;this._mouse.x=i/n*2-1,this._mouse.y=-(s/r)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const a=this.domElement;this._rotateLeft(ee*this._rotateDelta.x/a.clientHeight),this._rotateUp(ee*this._rotateDelta.y/a.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let a=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ee*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),a=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ee*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),a=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ee*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),a=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ee*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),a=!0;break}a&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const a=this._getSecondPointerPosition(e),o=.5*(e.pageX+a.x),i=.5*(e.pageY+a.y);this._rotateStart.set(o,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const a=this._getSecondPointerPosition(e),o=.5*(e.pageX+a.x),i=.5*(e.pageY+a.y);this._panStart.set(o,i)}}_handleTouchStartDolly(e){const a=this._getSecondPointerPosition(e),o=e.pageX-a.x,i=e.pageY-a.y,s=Math.sqrt(o*o+i*i);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),i=.5*(e.pageX+o.x),s=.5*(e.pageY+o.y);this._rotateEnd.set(i,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const a=this.domElement;this._rotateLeft(ee*this._rotateDelta.x/a.clientHeight),this._rotateUp(ee*this._rotateDelta.y/a.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const a=this._getSecondPointerPosition(e),o=.5*(e.pageX+a.x),i=.5*(e.pageY+a.y);this._panEnd.set(o,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const a=this._getSecondPointerPosition(e),o=e.pageX-a.x,i=e.pageY-a.y,s=Math.sqrt(o*o+i*i);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const n=(e.pageX+a.x)*.5,r=(e.pageY+a.y)*.5;this._updateZoomParameters(n,r)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let a=0;a<this._pointers.length;a++)if(this._pointers[a]==e.pointerId){this._pointers.splice(a,1);return}}_isTrackingPointer(e){for(let a=0;a<this._pointers.length;a++)if(this._pointers[a]==e.pointerId)return!0;return!1}_trackPointer(e){let a=this._pointerPositions[e.pointerId];a===void 0&&(a=new N,this._pointerPositions[e.pointerId]=a),a.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const a=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[a]}_customWheelEvent(e){const a=e.deltaMode,o={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(a){case 1:o.deltaY*=16;break;case 2:o.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(o.deltaY*=10),o}}function vs(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function ys(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function bs(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(mo),this.state=U.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],a=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:a.x,pageY:a.y});break}}function _s(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ze.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=U.DOLLY;break;case ze.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=U.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=U.ROTATE}break;case ze.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=U.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=U.PAN}break;default:this.state=U.NONE}this.state!==U.NONE&&this.dispatchEvent(ia)}function ws(t){switch(this.state){case U.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case U.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case U.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function Ss(t){this.enabled===!1||this.enableZoom===!1||this.state!==U.NONE||(t.preventDefault(),this.dispatchEvent(ia),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(mo))}function xs(t){this.enabled!==!1&&this._handleKeyDown(t)}function Es(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case Ge.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=U.TOUCH_ROTATE;break;case Ge.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=U.TOUCH_PAN;break;default:this.state=U.NONE}break;case 2:switch(this.touches.TWO){case Ge.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=U.TOUCH_DOLLY_PAN;break;case Ge.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=U.TOUCH_DOLLY_ROTATE;break;default:this.state=U.NONE}break;default:this.state=U.NONE}this.state!==U.NONE&&this.dispatchEvent(ia)}function Ts(t){switch(this._trackPointer(t),this.state){case U.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case U.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case U.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case U.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=U.NONE}}function Ms(t){this.enabled!==!1&&t.preventDefault()}function As(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Cs(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const wt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class ot{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ds=new Ka(-1,1,1,-1,0,1);class Ls extends Ie{constructor(){super(),this.setAttribute("position",new Ct([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ct([0,2,0,0,2,0],2))}}const Rs=new Ls;class po{constructor(e){this._mesh=new X(Rs,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ds)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Se extends ot{constructor(e,a="tDiffuse"){super(),this.textureID=a,this.uniforms=null,this.material=null,e instanceof J?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=et.clone(e.uniforms),this.material=new J({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new po(this.material)}render(e,a,o){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=o.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Sa extends ot{constructor(e,a){super(),this.scene=e,this.camera=a,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,a,o){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let n,r;this.inverse?(n=0,r=1):(n=1,r=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,n,4294967295),s.buffers.stencil.setClear(r),s.buffers.stencil.setLocked(!0),e.setRenderTarget(o),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class Ps extends ot{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class na{constructor(e,a){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),a===void 0){const o=e.getSize(new N);this._width=o.width,this._height=o.height,a=new pt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:gt}),a.texture.name="EffectComposer.rt1"}else this._width=a.width,this._height=a.height;this.renderTarget1=a,this.renderTarget2=a.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Se(wt),this.copyPass.material.blending=zo,this.timer=new Wo}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,a){this.passes.splice(a,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const a=this.passes.indexOf(e);a!==-1&&this.passes.splice(a,1)}isLastEnabledPass(e){for(let a=e+1;a<this.passes.length;a++)if(this.passes[a].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const a=this.renderer.getRenderTarget();let o=!1;for(let i=0,s=this.passes.length;i<s;i++){const n=this.passes[i];if(n.enabled!==!1){if(n.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),n.render(this.renderer,this.writeBuffer,this.readBuffer,e,o),n.needsSwap){if(o){const r=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}Sa!==void 0&&(n instanceof Sa?o=!0:n instanceof Ps&&(o=!1))}}this.renderer.setRenderTarget(a)}reset(e){if(e===void 0){const a=this.renderer.getSize(new N);this._pixelRatio=this.renderer.getPixelRatio(),this._width=a.width,this._height=a.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,a){this._width=e,this._height=a;const o=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(o,i),this.renderTarget2.setSize(o,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(o,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class ra extends ot{constructor(e,a,o=null,i=null,s=null){super(),this.scene=e,this.camera=a,this.overrideMaterial=o,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new P}render(e,a,o){const i=e.autoClear;e.autoClear=!1;let s,n;this.overrideMaterial!==null&&(n=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:o),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=n),e.autoClear=i}}const Is={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new P(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Ae extends ot{constructor(e,a=1,o,i){super(),this.strength=a,this.radius=o,this.threshold=i,this.resolution=e!==void 0?new N(e.x,e.y):new N(256,256),this.clearColor=new P(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);this.renderTargetBright=new pt(s,n,{type:gt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const l=new pt(s,n,{type:gt});l.texture.name="UnrealBloomPass.h"+d,l.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(l);const h=new pt(s,n,{type:gt});h.texture.name="UnrealBloomPass.v"+d,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),s=Math.round(s/2),n=Math.round(n/2)}const r=Is;this.highPassUniforms=et.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new J({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];s=Math.round(this.resolution.x/2),n=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new N(1/s,1/n),s=Math.round(s/2),n=Math.round(n/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=a,this.compositeMaterial.uniforms.bloomRadius.value=.1;const u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=et.clone(wt.uniforms),this.blendMaterial=new J({uniforms:this.copyUniforms,vertexShader:wt.vertexShader,fragmentShader:wt.fragmentShader,premultipliedAlpha:!0,blending:K,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new P,this._oldClearAlpha=1,this._basic=new we,this._fsQuad=new po(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,a){let o=Math.round(e/2),i=Math.round(a/2);this.renderTargetBright.setSize(o,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(o,i),this.renderTargetsVertical[s].setSize(o,i),this.separableBlurMaterials[s].uniforms.invSize.value=new N(1/o,1/i),o=Math.round(o/2),i=Math.round(i/2)}render(e,a,o,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const n=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=o.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=o.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let r=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[c].uniforms.direction.value=Ae.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Ae.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),r=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(o),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=n}_getSeparableBlurMaterial(e){const a=[],o=e/3;for(let i=0;i<e;i++)a.push(.39894*Math.exp(-.5*i*i/(o*o))/o);return new J({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new N(.5,.5)},direction:{value:new N(.5,.5)},gaussianCoefficients:{value:a}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new J({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Ae.BlurDirectionX=new N(1,0);Ae.BlurDirectionY=new N(0,1);const Os=40,Ns=70,De=1,H=new WeakMap;let go=null;function Us(){return go}function vo(t){go=t}function Yt(t,e,a=1.03){const o=(90-t)*(Math.PI/180),i=(e+180)*(Math.PI/180);return new L(-a*Math.sin(o)*Math.cos(i),a*Math.cos(o),a*Math.sin(o)*Math.sin(i))}let lt=null,xa=0;function Ne(t=!1){const e=Date.now();if(!t&&lt&&e-xa<500)return lt;const a=getComputedStyle(document.documentElement);return lt={neonCyan:a.getPropertyValue("--neon-cyan").trim(),neonGreen:a.getPropertyValue("--neon-green").trim(),neonWarn:a.getPropertyValue("--neon-warn").trim(),neonAlert:a.getPropertyValue("--neon-alert").trim(),neonSelect:a.getPropertyValue("--neon-select").trim()||"#00ffff"},xa=e,lt}function Re(t,e){return t<=Os?e.neonGreen:t<=Ns?e.neonWarn:e.neonAlert}function Qe(t,e,a,o){return[(e+180)/360*a,(90-t)/180*o]}const Fs={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.5},scanlineOpacity:{value:.035},aberrationAmt:{value:.0022}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `};function ks(t){return t}function Bs(t){if(t==null)return ks;var e,a,o=t.scale[0],i=t.scale[1],s=t.translate[0],n=t.translate[1];return function(r,c){c||(e=a=0);var u=2,d=r.length,l=new Array(d);for(l[0]=(e+=r[0])*o+s,l[1]=(a+=r[1])*i+n;u<d;)l[u]=r[u],++u;return l}}function Gs(t,e){for(var a,o=t.length,i=o-e;i<--o;)a=t[i],t[i++]=t[o],t[o]=a}function Hs(t,e){return typeof e=="string"&&(e=t.objects[e]),e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(a){return Ea(t,a)})}:Ea(t,e)}function Ea(t,e){var a=e.id,o=e.bbox,i=e.properties==null?{}:e.properties,s=yo(t,e);return a==null&&o==null?{type:"Feature",properties:i,geometry:s}:o==null?{type:"Feature",id:a,properties:i,geometry:s}:{type:"Feature",id:a,bbox:o,properties:i,geometry:s}}function yo(t,e){var a=Bs(t.transform),o=t.arcs;function i(d,l){l.length&&l.pop();for(var h=o[d<0?~d:d],f=0,g=h.length;f<g;++f)l.push(a(h[f],f));d<0&&Gs(l,g)}function s(d){return a(d)}function n(d){for(var l=[],h=0,f=d.length;h<f;++h)i(d[h],l);return l.length<2&&l.push(l[0]),l}function r(d){for(var l=n(d);l.length<4;)l.push(l[0]);return l}function c(d){return d.map(r)}function u(d){var l=d.type,h;switch(l){case"GeometryCollection":return{type:l,geometries:d.geometries.map(u)};case"Point":h=s(d.coordinates);break;case"MultiPoint":h=d.coordinates.map(s);break;case"LineString":h=n(d.arcs);break;case"MultiLineString":h=d.arcs.map(n);break;case"Polygon":h=c(d.arcs);break;case"MultiPolygon":h=d.arcs.map(c);break;default:return null}return{type:l,coordinates:h}}return u(e)}function zs(t,e){var a={},o={},i={},s=[],n=-1;e.forEach(function(u,d){var l=t.arcs[u<0?~u:u],h;l.length<3&&!l[1][0]&&!l[1][1]&&(h=e[++n],e[n]=u,e[d]=h)}),e.forEach(function(u){var d=r(u),l=d[0],h=d[1],f,g;if(f=i[l])if(delete i[f.end],f.push(u),f.end=h,g=o[h]){delete o[g.start];var m=g===f?f:f.concat(g);o[m.start=f.start]=i[m.end=g.end]=m}else o[f.start]=i[f.end]=f;else if(f=o[h])if(delete o[f.start],f.unshift(u),f.start=l,g=i[l]){delete i[g.end];var S=g===f?f:g.concat(f);o[S.start=g.start]=i[S.end=f.end]=S}else o[f.start]=i[f.end]=f;else f=[u],o[f.start=l]=i[f.end=h]=f});function r(u){var d=t.arcs[u<0?~u:u],l=d[0],h;return t.transform?(h=[0,0],d.forEach(function(f){h[0]+=f[0],h[1]+=f[1]})):h=d[d.length-1],u<0?[h,l]:[l,h]}function c(u,d){for(var l in u){var h=u[l];delete d[h.start],delete h.start,delete h.end,h.forEach(function(f){a[f<0?~f:f]=1}),s.push(h)}}return c(i,o),c(o,i),e.forEach(function(u){a[u<0?~u:u]||s.push([u])}),s}function Ta(t){return yo(t,Ws.apply(this,arguments))}function Ws(t,e,a){var o,i,s;if(arguments.length>1)o=$s(t,e,a);else for(i=0,o=new Array(s=t.arcs.length);i<s;++i)o[i]=i;return{type:"MultiLineString",arcs:zs(t,o)}}function $s(t,e,a){var o=[],i=[],s;function n(l){var h=l<0?~l:l;(i[h]||(i[h]=[])).push({i:l,g:s})}function r(l){l.forEach(n)}function c(l){l.forEach(r)}function u(l){l.forEach(c)}function d(l){switch(s=l,l.type){case"GeometryCollection":l.geometries.forEach(d);break;case"LineString":r(l.arcs);break;case"MultiLineString":case"Polygon":c(l.arcs);break;case"MultiPolygon":u(l.arcs);break}}return d(e),i.forEach(a==null?function(l){o.push(l[0].i)}:function(l){a(l[0].g,l[l.length-1].g)&&o.push(l[0].i)}),o}function je(t,e){const a=[];for(const i of t)for(let s=0;s<i.length-1;s++){const[n,r]=i[s],[c,u]=i[s+1],d=Yt(r,n,e),l=Yt(u,c,e);a.push(d.x,d.y,d.z,l.x,l.y,l.z)}const o=new Ie;return o.setAttribute("position",new It(new Float32Array(a),3)),o}async function Vs(t){let e;try{const _=await fetch("/data/countries-110m.json");if(!_.ok)throw new Error(`HTTP ${_.status}`);e=await _.json(),vo(e)}catch(_){console.warn("[s9-threatmap] geo lines: failed to load /data/countries-110m.json",_);return}const a=H.get(t);if(!a)return;const o=new Za,i=a.cyanColor,s=Ta(e,e.objects.land),n=new ce({color:i,transparent:!0,opacity:1,depthWrite:!0}),r=new ce({color:i,transparent:!0,opacity:1,blending:K,depthWrite:!0}),c=new ce({color:i,transparent:!0,opacity:.7,blending:K,depthWrite:!1}),u=new Be(je(s.coordinates,1.002),n),d=new Be(je(s.coordinates,1.006),r),l=new Be(je(s.coordinates,1.011),c);u.userData.geoType=d.userData.geoType=l.userData.geoType="coast",o.add(l,d,u);const h=Ta(e,e.objects.countries,(_,E)=>_!==E),f=new ce({color:i,transparent:!0,opacity:.55,depthWrite:!0}),g=new ce({color:i,transparent:!0,opacity:.3,blending:K,depthWrite:!1}),m=new Be(je(h.coordinates,1.012),f),S=new Be(je(h.coordinates,1.022),g);m.userData.geoType=S.userData.geoType="border",o.add(S,m),a.scene.add(o),a.satelliteMode&&(o.visible=!1),a.geoGroup=o}const $={NODE_FLASH_DUR:80,NODE_SETTLE_DUR:140,NODE_SCALE_PEAK:1.9,NODE_SCALE_DUR:220,NODE_SCALE_RISE:.35,CROSSHAIR_IN_DELAY:40,LABEL_CHAR_RATE:38,LABEL_CURSOR_BLINK:530,LABEL_START_DELAY:250,COORD_SCRAMBLE_DUR:320,COORD_SCRAMBLE_DELAY:80,DESELECT_LABEL_DUR:100,DESELECT_CROSSHAIR_DELAY:80,DESELECT_NODE_DELAY:120,DESELECT_NODE_DUR:180,NODE_DESELECT_SCALE_TROUGH:.65};function Ma(t){return 1-Math.pow(1-t,3)}function Aa(t){return t*t*t}function Ca(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}function js(t){const e=H.get(t);if(!e)return;e.nodeTween&&e.nodeTween.mesh.scale.setScalar(1),e.deselectTween&&e.deselectTween.mesh.scale.setScalar(1),e.nodeTween=null,e.deselectTween=null,e.tweenGeneration++;for(const o of e.pendingTimers)clearTimeout(o);e.pendingTimers=[],e.labelTypewriter&&(e.labelTypewriter.cancel(),e.labelTypewriter=null),e.coordScrambleLat&&(e.coordScrambleLat.cancel(),e.coordScrambleLat=null),e.coordScrambleLng&&(e.coordScrambleLng.cancel(),e.coordScrambleLng=null);const a=t.querySelector(".s9-threatmap__crosshair");a&&(a.classList.remove("s9-threatmap__crosshair--animating-in","s9-threatmap__crosshair--animating-out"),a.offsetWidth)}function qs(t,e,a,o,i){if(e.length===0)return t.textContent="",{cancel:()=>{}};let s=0,n=!0,r=null,c=null,u=!1;function d(){u=!0,clearTimeout(c),clearInterval(r)}function l(){t.textContent=e.slice(0,s)+(n?"_":" ")}l(),r=setInterval(()=>{u||(n=!n,l())},o);function h(){u||(s++,l(),s<e.length?c=setTimeout(h,a):c=setTimeout(()=>{u||(clearInterval(r),t.textContent=e)},o))}return c=setTimeout(h,a),{cancel:d}}function Da(t,e,a,o,i,s){const n=Date.now(),r=Math.abs(a),c=Math.max(1,Math.floor(Math.log10(r||1))+1);let u=null,d=!1;function l(){d=!0,clearTimeout(u)}function h(){if(d)return;if(Date.now()-n>=i){t.textContent=`${e}${a.toFixed(o)}°`;return}const g=(Math.random()*Math.pow(10,c)).toFixed(o),m=a<0?"-":"";t.textContent=`${e}${m}${g}°`,u=setTimeout(h,40)}return h(),{cancel:l}}function Pe(t,e){const a=H.get(t);if(!a)return;js(t);const o=Ne(),i=a.activeNodeId;if(i!==null){a.activeNodeId=null,t.removeAttribute("data-active-node"),t.dispatchEvent(new CustomEvent("s9:threatmap-node-deselect",{bubbles:!0,detail:{nodeId:i}}));const l=a.nodeMap.get(i);if(e===null){if(l){l.mesh.material.color.set(o.neonSelect||"#00ffff");const S=new P(o.neonSelect||"#00ffff"),_=new P(Re(l.level,o)),E=t.querySelector(".s9-threatmap__crosshair-label");E&&E.classList.add("s9-threatmap__crosshair-label--fading");const v=setTimeout(()=>{E&&(E.textContent="",E.classList.remove("s9-threatmap__crosshair-label--fading"))},$.DESELECT_LABEL_DUR);a.pendingTimers.push(v);const y=setTimeout(()=>{const b=t.querySelector(".s9-threatmap__crosshair");b&&(b.classList.remove("s9-threatmap__crosshair--animating-in","s9-threatmap__crosshair--visible"),b.offsetWidth,b.classList.add("s9-threatmap__crosshair--animating-out"))},$.DESELECT_CROSSHAIR_DELAY);a.pendingTimers.push(y);const w=setTimeout(()=>{a.deselectTween={generation:a.tweenGeneration,t0:Date.now(),dur:$.DESELECT_NODE_DUR,troughScale:$.NODE_DESELECT_SCALE_TROUGH,selectColor:S,levelColor:_,mesh:l.mesh,element:t}},$.DESELECT_NODE_DELAY);a.pendingTimers.push(w)}else{const S=t.querySelector(".s9-threatmap__crosshair");S&&S.classList.remove("s9-threatmap__crosshair--visible");const _=t.querySelector(".s9-threatmap__crosshair-label");_&&(_.textContent="")}const g=t.querySelector(".s9-threatmap__coords-lat"),m=t.querySelector(".s9-threatmap__coords-lng");g&&(g.textContent="LAT: --.-°"),m&&(m.textContent="LNG: --.-°");return}l&&(l.mesh.scale.setScalar(1),l.mesh.material.color.set(Re(l.level,o)));const h=t.querySelector(".s9-threatmap__crosshair");h&&h.classList.remove("s9-threatmap__crosshair--visible");const f=t.querySelector(".s9-threatmap__crosshair-label");f&&(f.textContent="")}if(e===null)return;const s=a.nodeMap.get(e);if(!s)return;if(a.activeNodeId=e,t.setAttribute("data-active-node",e),t.dispatchEvent(new CustomEvent("s9:threatmap-node-select",{bubbles:!0,detail:{nodeId:e,label:s.label,lat:s.lat,lng:s.lng,level:s.level}})),a.reducedMotion){s.mesh.material.color.set(o.neonSelect||"#00ffff"),s.mesh.scale.setScalar(1);const l=t.querySelector(".s9-threatmap__crosshair");l&&l.classList.add("s9-threatmap__crosshair--visible");const h=t.querySelector(".s9-threatmap__crosshair-label");h&&(h.textContent=s.label);const f=t.querySelector(".s9-threatmap__coords-lat"),g=t.querySelector(".s9-threatmap__coords-lng");f&&(f.textContent=`LAT: ${s.lat.toFixed(2)}°`),g&&(g.textContent=`LNG: ${s.lng.toFixed(2)}°`);return}const n=new P("#ffffff"),r=new P(o.neonSelect||"#00ffff");s.mesh.material.color.copy(n),s.mesh.scale.setScalar(1),a.nodeTween={generation:a.tweenGeneration,t0:Date.now(),dur:$.NODE_SCALE_DUR,riseFrac:$.NODE_SCALE_RISE,peakScale:$.NODE_SCALE_PEAK,flashDur:$.NODE_FLASH_DUR,settleDur:$.NODE_SETTLE_DUR,flashColor:n,selectColor:r,mesh:s.mesh};const c=setTimeout(()=>{const l=t.querySelector(".s9-threatmap__crosshair");l&&l.classList.add("s9-threatmap__crosshair--visible","s9-threatmap__crosshair--animating-in")},$.CROSSHAIR_IN_DELAY);a.pendingTimers.push(c);const u=setTimeout(()=>{const l=t.querySelector(".s9-threatmap__coords-lat"),h=t.querySelector(".s9-threatmap__coords-lng");l&&(a.coordScrambleLat=Da(l,"LAT: ",s.lat,2,$.COORD_SCRAMBLE_DUR)),h&&(a.coordScrambleLng=Da(h,"LNG: ",s.lng,2,$.COORD_SCRAMBLE_DUR))},$.COORD_SCRAMBLE_DELAY);a.pendingTimers.push(u);const d=setTimeout(()=>{const l=t.querySelector(".s9-threatmap__crosshair-label");l&&(a.labelTypewriter=qs(l,s.label,$.LABEL_CHAR_RATE,$.LABEL_CURSOR_BLINK))},$.LABEL_START_DELAY);a.pendingTimers.push(d)}function Dt(t,e){if(!H.get(t))return;const o=Math.max(0,Math.min(100,e));t.setAttribute("data-threat-level",o)}function la(t,e,a){const o=H.get(t);if(!o)return;const i=o.nodeMap.get(e);if(!i)return;const s=i.level;if(i.level=a,i.mesh.userData.level=a,o.activeNodeId!==e){const n=Ne();i.mesh.material.color.set(Re(a,n))}return s}function Lt(t,e){const a=H.get(t);if(!a)return;const o=a.nodeMap.get(e);if(!o||Date.now()-a.lastOrbitInteraction<3e3)return;const i=a.camera.position.length();a.cameraLerpTarget=o.mesh.position.clone().normalize().multiplyScalar(i),a.controls.autoRotate=!1,a.resumeTimer!==null&&(clearTimeout(a.resumeTimer),a.resumeTimer=null)}const La=new ta,ct=new L;class bo extends Qa{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],a=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],o=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(o),this.setAttribute("position",new Ct(e,3)),this.setAttribute("uv",new Ct(a,2))}applyMatrix4(e){const a=this.attributes.instanceStart,o=this.attributes.instanceEnd;return a!==void 0&&(a.applyMatrix4(e),o.applyMatrix4(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let a;e instanceof Float32Array?a=e:Array.isArray(e)&&(a=new Float32Array(e));const o=new jt(a,6,1);return this.setAttribute("instanceStart",new He(o,3,0)),this.setAttribute("instanceEnd",new He(o,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let a;e instanceof Float32Array?a=e:Array.isArray(e)&&(a=new Float32Array(e));const o=new jt(a,6,1);return this.setAttribute("instanceColorStart",new He(o,3,0)),this.setAttribute("instanceColorEnd",new He(o,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new $o(e.geometry)),this}fromLineSegments(e){const a=e.geometry;return this.setPositions(a.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ta);const e=this.attributes.instanceStart,a=this.attributes.instanceEnd;e!==void 0&&a!==void 0&&(this.boundingBox.setFromBufferAttribute(e),La.setFromBufferAttribute(a),this.boundingBox.union(La))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ja),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,a=this.attributes.instanceEnd;if(e!==void 0&&a!==void 0){const o=this.boundingSphere.center;this.boundingBox.getCenter(o);let i=0;for(let s=0,n=e.count;s<n;s++)ct.fromBufferAttribute(e,s),i=Math.max(i,o.distanceToSquared(ct)),ct.fromBufferAttribute(a,s),i=Math.max(i,o.distanceToSquared(ct));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}yt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new N(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};vt.line={uniforms:et.merge([yt.common,yt.fog,yt.line]),vertexShader:`
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
		`};class _o extends J{constructor(e){super({type:"LineMaterial",uniforms:et.clone(vt.line.uniforms),vertexShader:vt.line.vertexShader,fragmentShader:vt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Bt=new tt,Ra=new L,Pa=new L,V=new tt,j=new tt,de=new tt,Gt=new L,Ht=new eo,q=new Vo,Ia=new L,ut=new ta,dt=new Ja,he=new tt;let pe,Le;function Oa(t,e,a){return he.set(0,0,-e,1).applyMatrix4(t.projectionMatrix),he.multiplyScalar(1/he.w),he.x=Le/a.width,he.y=Le/a.height,he.applyMatrix4(t.projectionMatrixInverse),he.multiplyScalar(1/he.w),Math.abs(Math.max(he.x,he.y))}function Ys(t,e){const a=t.matrixWorld,o=t.geometry,i=o.attributes.instanceStart,s=o.attributes.instanceEnd,n=Math.min(o.instanceCount,i.count);for(let r=0,c=n;r<c;r++){q.start.fromBufferAttribute(i,r),q.end.fromBufferAttribute(s,r),q.applyMatrix4(a);const u=new L,d=new L;pe.distanceSqToSegment(q.start,q.end,d,u),d.distanceTo(u)<Le*.5&&e.push({point:d,pointOnLine:u,distance:pe.origin.distanceTo(d),object:t,face:null,faceIndex:r,uv:null,uv1:null})}}function Xs(t,e,a){const o=e.projectionMatrix,s=t.material.resolution,n=t.matrixWorld,r=t.geometry,c=r.attributes.instanceStart,u=r.attributes.instanceEnd,d=Math.min(r.instanceCount,c.count),l=-e.near;pe.at(1,de),de.w=1,de.applyMatrix4(e.matrixWorldInverse),de.applyMatrix4(o),de.multiplyScalar(1/de.w),de.x*=s.x/2,de.y*=s.y/2,de.z=0,Gt.copy(de),Ht.multiplyMatrices(e.matrixWorldInverse,n);for(let h=0,f=d;h<f;h++){if(V.fromBufferAttribute(c,h),j.fromBufferAttribute(u,h),V.w=1,j.w=1,V.applyMatrix4(Ht),j.applyMatrix4(Ht),V.z>l&&j.z>l)continue;if(V.z>l){const v=V.z-j.z,y=(V.z-l)/v;V.lerp(j,y)}else if(j.z>l){const v=j.z-V.z,y=(j.z-l)/v;j.lerp(V,y)}V.applyMatrix4(o),j.applyMatrix4(o),V.multiplyScalar(1/V.w),j.multiplyScalar(1/j.w),V.x*=s.x/2,V.y*=s.y/2,j.x*=s.x/2,j.y*=s.y/2,q.start.copy(V),q.start.z=0,q.end.copy(j),q.end.z=0;const m=q.closestPointToPointParameter(Gt,!0);q.at(m,Ia);const S=At.lerp(V.z,j.z,m),_=S>=-1&&S<=1,E=Gt.distanceTo(Ia)<Le*.5;if(_&&E){q.start.fromBufferAttribute(c,h),q.end.fromBufferAttribute(u,h),q.start.applyMatrix4(n),q.end.applyMatrix4(n);const v=new L,y=new L;pe.distanceSqToSegment(q.start,q.end,y,v),a.push({point:y,pointOnLine:v,distance:pe.origin.distanceTo(y),object:t,face:null,faceIndex:h,uv:null,uv1:null})}}}class qe extends X{constructor(e=new bo,a=new _o({color:Math.random()*16777215})){super(e,a),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,a=e.attributes.instanceStart,o=e.attributes.instanceEnd,i=new Float32Array(2*a.count);for(let n=0,r=0,c=a.count;n<c;n++,r+=2)Ra.fromBufferAttribute(a,n),Pa.fromBufferAttribute(o,n),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Ra.distanceTo(Pa);const s=new jt(i,2,1);return e.setAttribute("instanceDistanceStart",new He(s,1,0)),e.setAttribute("instanceDistanceEnd",new He(s,1,1)),this}raycast(e,a){const o=this.material.worldUnits,i=e.camera;i===null&&!o&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;pe=e.ray;const n=this.matrixWorld,r=this.geometry,c=this.material;Le=c.linewidth+s,r.boundingSphere===null&&r.computeBoundingSphere(),dt.copy(r.boundingSphere).applyMatrix4(n);let u;if(o)u=Le*.5;else{const l=Math.max(i.near,dt.distanceToPoint(pe.origin));u=Oa(i,l,c.resolution)}if(dt.radius+=u,pe.intersectsSphere(dt)===!1)return;r.boundingBox===null&&r.computeBoundingBox(),ut.copy(r.boundingBox).applyMatrix4(n);let d;if(o)d=Le*.5;else{const l=Math.max(i.near,ut.distanceToPoint(pe.origin));d=Oa(i,l,c.resolution)}ut.expandByScalar(d),pe.intersectsBox(ut)!==!1&&(o?Ys(this,a):Xs(this,i,a))}onBeforeRender(e){const a=this.material.uniforms;a&&a.resolution&&(e.getViewport(Bt),this.material.uniforms.resolution.value.set(Bt.z,Bt.w))}}const Ks=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,Zs=t=>t>=1?1:1-Math.pow(2,-10*t);function Ye({radius:t,numRings:e,samplesPerRing:a,latitudeMin:o,latitudeMax:i,upAxis:s}){const n=e*a,r=new Float32Array(n*6),c=new Float32Array(n),u=new Float32Array(n);let d=0,l=0;for(let f=0;f<e;f++){const g=o+f/(e-1)*(i-o),m=Math.cos(g),S=Math.sin(g);for(let _=0;_<a;_++){const E=_/a*2*Math.PI,v=(_+1)/a*2*Math.PI;r[d++]=t*m*Math.cos(E),r[d++]=t*S,r[d++]=t*m*Math.sin(E),r[d++]=t*m*Math.cos(v),r[d++]=t*S,r[d++]=t*m*Math.sin(v),c[l]=f,u[l]=_/a,l++}}const h=new bo;return h.setPositions(r),h.setAttribute("ringIndex",new ge(c,1)),h.setAttribute("arcPosition",new ge(u,1)),s==="z"&&h.applyMatrix4(new eo().makeRotationX(-Math.PI/2)),h}const Qs=`
uniform float uProgress;
uniform float uNumRings;
uniform float uStagger;
uniform float uRingDuration;
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
`,Js=`
float _hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }

vec3 _hue2rgb(float h) {
  vec3 k = mod(vec3(0.0, 4.0, 2.0) + h * 6.0, 6.0);
  return clamp(min(k, 4.0 - k), 0.0, 1.0);
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
`,ei=`
  // ── reveal ────────────────────────────────────────────────────────────────
  float normRing;
  if (uDirection == 0) {
    normRing = ringIndex / (uNumRings - 1.0);
  } else if (uDirection == 1) {
    normRing = 1.0 - ringIndex / (uNumRings - 1.0);
  } else {
    normRing = abs(ringIndex / (uNumRings - 1.0) - 0.5) * 2.0;
  }
  float onset  = normRing * (1.0 - uRingDuration) * (1.0 - uStagger);
  float localT = clamp((uProgress - onset) / uRingDuration, 0.0, 1.0);
  vAlpha = smoothstep(0.0, 1.0, localT);

  // ── warp ──────────────────────────────────────────────────────────────────
  float c1 = 1.70158;
  float c3 = c1 + 1.0;
  float easeOutBack = 1.0 + c3 * pow(localT - 1.0, 3.0) + c1 * pow(localT - 1.0, 2.0);
  float warpScale = 1.0 - uWarpAmount * (1.0 - easeOutBack);

  // ── per-ring colour variation ──────────────────────────────────────────────
  float rng1 = _hash(ringIndex);
  float rng2 = _hash(ringIndex + 71.3);
  float rng3 = _hash(ringIndex + 37.9);
  vec3 gradientBase = mix(uColor, uColorB, normRing);
  vec3 hsl = _rgb2hsl(gradientBase);
  hsl.x = fract(hsl.x + (rng1 - 0.5) * uColorSpread);
  hsl.z = clamp(hsl.z + (rng2 - 0.5) * uBrightSpread, 0.02, 0.98);
  hsl.x = fract(hsl.x + arcPosition * uArcColorSpread);
  vRingColor = _hsl2rgb(hsl.x, hsl.y, hsl.z);

  // ── per-ring flicker ───────────────────────────────────────────────────────
  vFlickerMult = 1.0 + uFlickerAmp * sin(uTime * uFlickerSpeed + rng3 * 6.2832);
`;function ti(t){return t==="north-to-south"?1:t==="equator-out"?2:0}function ai({lineColor:t,lineColorB:e,opacity:a,emissiveIntensity:o,numRings:i,stagger:s,ringDuration:n,warpAmount:r,direction:c,colorSpread:u,brightSpread:d,flickerAmp:l,flickerSpeed:h,arcColorSpread:f}){return{uProgress:{value:0},uNumRings:{value:i},uStagger:{value:s},uRingDuration:{value:n},uOpacity:{value:a},uEmissiveIntensity:{value:o},uColor:{value:new P(t)},uColorB:{value:new P(e??t)},uDirection:{value:ti(c)},uWarpAmount:{value:r},uColorSpread:{value:u},uBrightSpread:{value:d},uFlickerAmp:{value:l},uFlickerSpeed:{value:h},uTime:{value:0},uArcColorSpread:{value:f??0}}}function oi(t){t.vertexShader.includes("vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 )")||console.warn("[RingReveal] LineMaterial vertex shader injection point changed — warp may be misaligned. Check Three.js version."),t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
attribute float ringIndex;
attribute float arcPosition;
varying float vAlpha;
varying vec3  vRingColor;
varying float vFlickerMult;
${Qs}
${Js}`),t.vertexShader=t.vertexShader.replace("vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );",`${ei}
    vec4 start = modelViewMatrix * vec4( instanceStart * warpScale, 1.0 );`),t.vertexShader=t.vertexShader.replace("vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );","vec4 end = modelViewMatrix * vec4( instanceEnd * warpScale, 1.0 );"),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
varying float vAlpha;
varying vec3  vRingColor;
varying float vFlickerMult;
uniform float uOpacity;
uniform float uEmissiveIntensity;`),t.fragmentShader=t.fragmentShader.replace("gl_FragColor = vec4( diffuseColor.rgb, alpha );",`if (vAlpha < 0.001) discard;
  gl_FragColor = vec4(vRingColor * uEmissiveIntensity * max(vFlickerMult, 0.0), vAlpha * uOpacity);`)}function Xe(t){const{lineWidth:e,blending:a,resolution:o}=t,i=new _o({color:16777215,linewidth:e,transparent:!0,depthWrite:!1,blending:a,worldUnits:!1,resolution:o??new N(typeof window<"u"?window.innerWidth:1920,typeof window<"u"?window.innerHeight:1080)});return Object.assign(i.uniforms,ai(t)),i.onBeforeCompile=s=>{Object.assign(s.uniforms,i.uniforms),oi(s)},i}const ht=new P,ft=new P,si={radius:1,numRings:48,samplesPerRing:256,latitudeMin:-Math.PI/2,latitudeMax:Math.PI/2,durationMs:1800,easingFn:Ks,direction:"south-to-north",stagger:.4,ringDuration:.35,lineColor:65484,lineColorB:65484,lineWidth:1,opacity:.7,glowColor:65484,glowColorB:65484,glowOpacity:.25,glowRadius:1.008,glowLayers:3,glowLayerRadiusStep:.004,glowLayerOpacityFalloff:.5,emissiveIntensity:1.5,warpAmount:.12,morphDurationMs:800,upAxis:"y",colorSpread:0,brightSpread:0,flickerAmp:0,flickerSpeed:2,arcColorSpread:0};class ii{constructor(e,a={}){this._scene=e,this._options={...si,...a},this._options.ringDuration=Math.max(.001,this._options.ringDuration),this._options.numRings=Math.max(2,this._options.numRings),this._options.samplesPerRing=Math.max(3,this._options.samplesPerRing),this._options.stagger=Math.max(0,Math.min(1,this._options.stagger)),this._options.radius=Math.max(Number.EPSILON,this._options.radius),this._options.glowRadius=Math.max(Number.EPSILON,this._options.glowRadius),this._options.glowLayers=Math.max(1,Math.round(this._options.glowLayers)),this._playing=!1,this._reversed=!1,this._elapsed=0,this._progress=0,this._onComplete=null,this._morph=null,this._time=0,this._resolution=new N(typeof window<"u"?window.innerWidth:1920,typeof window<"u"?window.innerHeight:1080),this._build()}get isPlaying(){return this._playing}get progress(){return this._progress}get baseRings(){return this._baseRings}get glowRings(){return this._glowLayers[0]}get glowLayers(){return this._glowLayers}play(e){this._reversed=!1,this._playing=!0,this._onComplete=e??null}reverse(e){this._reversed=!0,this._playing=!0,this._onComplete=e??null;const a=1-this._progress;let o=0,i=1;for(let s=0;s<24;s++){const n=(o+i)*.5;this._options.easingFn(n)<a?o=n:i=n}this._elapsed=o*this._options.durationMs}stop(){this._playing=!1}reset(){this._playing=!1,this._reversed=!1,this._elapsed=0,this._progress=0,this._onComplete=null,this._disposeCrossFade(),this._morph=null,this._setProgress(0)}tick(e){var o;this._time+=e/1e3,this._baseRings.material.uniforms.uTime.value=this._time,this._glowLayers.forEach(i=>{i.material.uniforms.uTime.value=this._time});const a=(o=this._morph)==null?void 0:o.crossFade;if(a&&(a.oldBase.material.uniforms.uTime.value=this._time,a.oldGlowLayers.forEach(i=>{i.material.uniforms.uTime.value=this._time})),this._playing){this._elapsed+=e;const i=Math.min(this._elapsed/this._options.durationMs,1),s=this._options.easingFn(i);if(this._progress=this._reversed?1-s:s,this._setProgress(this._progress),this._reversed?this._progress<=0:this._progress>=1){this._playing=!1;const r=this._onComplete;this._onComplete=null,r==null||r()}}if(this._morph){this._morph.elapsed+=e;const i=Math.min(this._morph.elapsed/this._morph.durationMs,1);this._applyMorphT(i),i>=1&&(this._morph=null)}}setColors(e,a){this._baseRings.material.uniforms.uColor.value.set(e),this._glowLayers.forEach(o=>o.material.uniforms.uColor.value.set(a)),this._options.lineColor=e,this._options.glowColor=a}setOpacity(e,a){this._baseRings.material.uniforms.uOpacity.value=e,this._options.opacity=e,a!==void 0&&(this._glowLayers.forEach((o,i)=>{o.material.uniforms.uOpacity.value=a*Math.pow(this._options.glowLayerOpacityFalloff,i)}),this._options.glowOpacity=a)}setResolution(e,a){this._resolution.set(e,a),this._allMaterials().forEach(o=>{var i;return(i=o.resolution)==null?void 0:i.set(e,a)})}morphTo(e,a){var m;const o=a??this._options.morphDurationMs,i=this._options,s=this._baseRings.material,n=this._glowLayers[0].material;e.durationMs!==void 0&&(i.durationMs=e.durationMs),e.easingFn!==void 0&&(i.easingFn=e.easingFn),e.direction!==void 0&&(i.direction=e.direction),e.morphDurationMs!==void 0&&(i.morphDurationMs=e.morphDurationMs),e.upAxis!==void 0&&(i.upAxis=e.upAxis),e.latitudeMin!==void 0&&(i.latitudeMin=e.latitudeMin),e.latitudeMax!==void 0&&(i.latitudeMax=e.latitudeMax),e.lineWidth!==void 0&&(i.lineWidth=e.lineWidth,this._allMaterials().forEach(S=>{S.linewidth=e.lineWidth})),e.glowLayerOpacityFalloff!==void 0&&e.glowLayerOpacityFalloff!==i.glowLayerOpacityFalloff&&(i.glowLayerOpacityFalloff=e.glowLayerOpacityFalloff,this._glowLayers.forEach((S,_)=>{S.material.uniforms.uOpacity.value=i.glowOpacity*Math.pow(i.glowLayerOpacityFalloff,_)}));const r=e.glowLayers!==void 0&&e.glowLayers!==i.glowLayers,c=e.glowLayerRadiusStep!==void 0&&e.glowLayerRadiusStep!==i.glowLayerRadiusStep;r&&(i.glowLayers=Math.max(1,Math.round(e.glowLayers))),c&&(i.glowLayerRadiusStep=e.glowLayerRadiusStep),(r||c)&&this._rebuildGlowLayers();const u=i.radius,d=e.radius??i.radius,l=e.numRings!==void 0&&e.numRings!==i.numRings,h=e.samplesPerRing!==void 0&&e.samplesPerRing!==i.samplesPerRing;let f=null;if(l||h){const S=this._baseRings,_=this._glowLayers.slice(),E=s.uniforms.uOpacity.value,v=_.map(p=>p.material.uniforms.uOpacity.value);l&&(i.numRings=e.numRings),h&&(i.samplesPerRing=e.samplesPerRing);const y={radius:i.radius,numRings:i.numRings,samplesPerRing:i.samplesPerRing,latitudeMin:i.latitudeMin,latitudeMax:i.latitudeMax,upAxis:i.upAxis},w={lineWidth:i.lineWidth,numRings:i.numRings,stagger:s.uniforms.uStagger.value,ringDuration:s.uniforms.uRingDuration.value,warpAmount:s.uniforms.uWarpAmount.value,emissiveIntensity:s.uniforms.uEmissiveIntensity.value,direction:i.direction,colorSpread:s.uniforms.uColorSpread.value,brightSpread:s.uniforms.uBrightSpread.value,flickerAmp:s.uniforms.uFlickerAmp.value,flickerSpeed:s.uniforms.uFlickerSpeed.value,arcColorSpread:s.uniforms.uArcColorSpread.value,resolution:this._resolution},b=Xe({...w,lineColor:s.uniforms.uColor.value.getHex(),lineColorB:s.uniforms.uColorB.value.getHex(),opacity:0,blending:qt});this._baseRings=new qe(Ye(y),b),this._baseRings.renderOrder=S.renderOrder,this._scene.add(this._baseRings),this._glowLayers=[];for(let p=0;p<i.glowLayers;p++){const x=i.radius*i.glowRadius*(1+p*i.glowLayerRadiusStep),T=Xe({...w,lineColor:n.uniforms.uColor.value.getHex(),lineColorB:n.uniforms.uColorB.value.getHex(),opacity:0,blending:K}),R=new qe(Ye({...y,radius:x}),T);R.renderOrder=((m=_[0])==null?void 0:m.renderOrder)??0,this._scene.add(R),this._glowLayers.push(R)}this._setProgress(this._progress),this._baseRings.material.uniforms.uTime.value=this._time,this._glowLayers.forEach(p=>{p.material.uniforms.uTime.value=this._time}),f={oldBase:S,oldGlowLayers:_,oldBaseOpacity:E,oldGlowLayerOpacities:v}}const g=this._glowLayers[0].material;this._morph={elapsed:0,durationMs:Math.max(o,0),crossFade:f,from:{lineColor:s.uniforms.uColor.value.clone(),lineColorB:s.uniforms.uColorB.value.clone(),glowColor:n.uniforms.uColor.value.clone(),glowColorB:n.uniforms.uColorB.value.clone(),opacity:f?0:s.uniforms.uOpacity.value,glowOpacity:f?0:n.uniforms.uOpacity.value,emissiveIntensity:s.uniforms.uEmissiveIntensity.value,stagger:s.uniforms.uStagger.value,warpAmount:s.uniforms.uWarpAmount.value,ringDuration:s.uniforms.uRingDuration.value,colorSpread:s.uniforms.uColorSpread.value,brightSpread:s.uniforms.uBrightSpread.value,flickerAmp:s.uniforms.uFlickerAmp.value,flickerSpeed:s.uniforms.uFlickerSpeed.value,arcColorSpread:s.uniforms.uArcColorSpread.value,radius:u},to:{lineColor:e.lineColor!==void 0?new P(e.lineColor):s.uniforms.uColor.value.clone(),lineColorB:e.lineColorB!==void 0?new P(e.lineColorB):s.uniforms.uColorB.value.clone(),glowColor:e.glowColor!==void 0?new P(e.glowColor):g.uniforms.uColor.value.clone(),glowColorB:e.glowColorB!==void 0?new P(e.glowColorB):g.uniforms.uColorB.value.clone(),opacity:e.opacity??s.uniforms.uOpacity.value,glowOpacity:e.glowOpacity??g.uniforms.uOpacity.value,emissiveIntensity:e.emissiveIntensity??s.uniforms.uEmissiveIntensity.value,stagger:e.stagger??s.uniforms.uStagger.value,warpAmount:e.warpAmount??s.uniforms.uWarpAmount.value,ringDuration:e.ringDuration??s.uniforms.uRingDuration.value,colorSpread:e.colorSpread??s.uniforms.uColorSpread.value,brightSpread:e.brightSpread??s.uniforms.uBrightSpread.value,flickerAmp:e.flickerAmp??s.uniforms.uFlickerAmp.value,flickerSpeed:e.flickerSpeed??s.uniforms.uFlickerSpeed.value,arcColorSpread:e.arcColorSpread??s.uniforms.uArcColorSpread.value,radius:d}},o<=0&&(this._applyMorphT(1),this._morph=null)}dispose(){this._disposeCrossFade(),this._scene.remove(this._baseRings),this._baseRings.geometry.dispose(),this._baseRings.material.dispose(),this._glowLayers.forEach(e=>{this._scene.remove(e),e.geometry.dispose(),e.material.dispose()})}_allMaterials(){return[this._baseRings.material,...this._glowLayers.map(e=>e.material)]}_disposeCrossFade(){var a;const e=(a=this._morph)==null?void 0:a.crossFade;e&&(this._scene.remove(e.oldBase),e.oldBase.geometry.dispose(),e.oldBase.material.dispose(),e.oldGlowLayers.forEach(o=>{this._scene.remove(o),o.geometry.dispose(),o.material.dispose()}))}_build(){const e=this._options,a={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis},o={lineWidth:e.lineWidth,emissiveIntensity:e.emissiveIntensity,numRings:e.numRings,stagger:e.stagger,ringDuration:e.ringDuration,warpAmount:e.warpAmount,direction:e.direction,colorSpread:e.colorSpread,brightSpread:e.brightSpread,flickerAmp:e.flickerAmp,flickerSpeed:e.flickerSpeed,arcColorSpread:e.arcColorSpread,resolution:this._resolution},i=Xe({...o,lineColor:e.lineColor,lineColorB:e.lineColorB,opacity:e.opacity,blending:qt});this._baseRings=new qe(Ye(a),i),this._scene.add(this._baseRings),this._glowLayers=[];for(let s=0;s<e.glowLayers;s++){const n=e.radius*e.glowRadius*(1+s*e.glowLayerRadiusStep),r=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,s),c=Xe({...o,lineColor:e.glowColor,lineColorB:e.glowColorB,opacity:r,blending:K}),u=new qe(Ye({...a,radius:n}),c);this._scene.add(u),this._glowLayers.push(u)}}_rebuildGlowLayers(){var u,d;const e=this._options,a=(u=this._glowLayers[0])==null?void 0:u.material,o=a?a.uniforms.uColor.value.getHex():e.glowColor,i=a?a.uniforms.uColorB.value.getHex():e.glowColorB,s=((d=this._glowLayers[0])==null?void 0:d.renderOrder)??0;this._glowLayers.forEach(l=>{this._scene.remove(l),l.geometry.dispose(),l.material.dispose()});const n=this._baseRings.material,r={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis},c={lineWidth:e.lineWidth,numRings:e.numRings,stagger:n.uniforms.uStagger.value,ringDuration:n.uniforms.uRingDuration.value,warpAmount:n.uniforms.uWarpAmount.value,emissiveIntensity:n.uniforms.uEmissiveIntensity.value,direction:e.direction,colorSpread:n.uniforms.uColorSpread.value,brightSpread:n.uniforms.uBrightSpread.value,flickerAmp:n.uniforms.uFlickerAmp.value,flickerSpeed:n.uniforms.uFlickerSpeed.value,resolution:this._resolution};this._glowLayers=[];for(let l=0;l<e.glowLayers;l++){const h=e.radius*e.glowRadius*(1+l*e.glowLayerRadiusStep),f=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,l),g=Xe({...c,lineColor:o,lineColorB:i,opacity:f,blending:K}),m=new qe(Ye({...r,radius:h}),g);m.renderOrder=s,m.material.uniforms.uProgress.value=this._progress,m.material.uniforms.uTime.value=this._time,this._scene.add(m),this._glowLayers.push(m)}}_setProgress(e){this._baseRings.material.uniforms.uProgress.value=e,this._glowLayers.forEach(a=>{a.material.uniforms.uProgress.value=e})}_applyMorphT(e){const{from:a,to:o}=this._morph,i=this._baseRings.material,s=(u,d)=>u+(d-u)*e;ht.lerpColors(a.lineColor,o.lineColor,e),i.uniforms.uColor.value.copy(ht),ft.lerpColors(a.lineColorB,o.lineColorB,e),i.uniforms.uColorB.value.copy(ft),i.uniforms.uOpacity.value=s(a.opacity,o.opacity),i.uniforms.uEmissiveIntensity.value=s(a.emissiveIntensity,o.emissiveIntensity),i.uniforms.uStagger.value=s(a.stagger,o.stagger),i.uniforms.uWarpAmount.value=s(a.warpAmount,o.warpAmount),i.uniforms.uRingDuration.value=s(a.ringDuration,o.ringDuration),i.uniforms.uColorSpread.value=s(a.colorSpread,o.colorSpread),i.uniforms.uBrightSpread.value=s(a.brightSpread,o.brightSpread),i.uniforms.uFlickerAmp.value=s(a.flickerAmp,o.flickerAmp),i.uniforms.uFlickerSpeed.value=s(a.flickerSpeed,o.flickerSpeed),i.uniforms.uArcColorSpread.value=s(a.arcColorSpread,o.arcColorSpread),ht.lerpColors(a.glowColor,o.glowColor,e),ft.lerpColors(a.glowColorB,o.glowColorB,e);const n=s(a.glowOpacity,o.glowOpacity),r=this._options.glowLayerOpacityFalloff;this._glowLayers.forEach((u,d)=>{const l=u.material;l.uniforms.uColor.value.copy(ht),l.uniforms.uColorB.value.copy(ft),l.uniforms.uOpacity.value=n*Math.pow(r,d),l.uniforms.uEmissiveIntensity.value=s(a.emissiveIntensity,o.emissiveIntensity),l.uniforms.uStagger.value=s(a.stagger,o.stagger),l.uniforms.uWarpAmount.value=s(a.warpAmount,o.warpAmount),l.uniforms.uRingDuration.value=s(a.ringDuration,o.ringDuration),l.uniforms.uColorSpread.value=s(a.colorSpread,o.colorSpread),l.uniforms.uBrightSpread.value=s(a.brightSpread,o.brightSpread),l.uniforms.uFlickerAmp.value=s(a.flickerAmp,o.flickerAmp),l.uniforms.uFlickerSpeed.value=s(a.flickerSpeed,o.flickerSpeed),l.uniforms.uArcColorSpread.value=s(a.arcColorSpread,o.arcColorSpread)});const c=s(a.radius,o.radius)/this._options.radius;if(this._baseRings.scale.setScalar(c),this._glowLayers.forEach(u=>u.scale.setScalar(c)),this._morph.crossFade){const{oldBase:u,oldGlowLayers:d,oldBaseOpacity:l,oldGlowLayerOpacities:h}=this._morph.crossFade;u.material.uniforms.uOpacity.value=l*(1-e),u.material.uniforms.uProgress.value=this._progress,d.forEach((f,g)=>{f.material.uniforms.uOpacity.value=h[g]*(1-e),f.material.uniforms.uProgress.value=this._progress}),e>=1&&(this._scene.remove(u),u.geometry.dispose(),u.material.dispose(),d.forEach(f=>{this._scene.remove(f),f.geometry.dispose(),f.material.dispose()}))}if(e>=1){const u=this._options;u.opacity=o.opacity,u.glowOpacity=o.glowOpacity,u.emissiveIntensity=o.emissiveIntensity,u.stagger=o.stagger,u.warpAmount=o.warpAmount,u.ringDuration=o.ringDuration,u.colorSpread=o.colorSpread,u.brightSpread=o.brightSpread,u.flickerAmp=o.flickerAmp,u.flickerSpeed=o.flickerSpeed,u.arcColorSpread=o.arcColorSpread,u.lineColor=o.lineColor.getHex(),u.lineColorB=o.lineColorB.getHex(),u.glowColor=o.glowColor.getHex(),u.glowColorB=o.glowColorB.getHex(),u.radius=o.radius}}}function ni(t){return t==="bracket"?`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-bracket" aria-hidden="true">
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tr"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--bl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--br"></span>
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`:t==="diamond"?`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-diamond" aria-hidden="true">
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`:`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-box" aria-hidden="true">
    <span class="s9-threatmap__crosshair-label"></span>
  </div>`}function wo(t,{autoRotate:e=!0,bloomStrength:a=1.7,crosshairShape:o="box"}={}){const i=new AbortController,{signal:s}=i,n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=Ne(),c=new aa({antialias:!0,alpha:!0});c.setPixelRatio(window.devicePixelRatio),c.setSize(t.clientWidth||800,t.clientHeight||600),c.domElement.classList.add("s9-threatmap__canvas"),t.appendChild(c.domElement);const u=new oa,d=new to(45,(t.clientWidth||800)/(t.clientHeight||600),.1,100);d.position.set(0,0,3);const l=new Ce(De,48,48),h=new Ce(De*.98,48,48),f=new P(r.neonCyan||"#00d4b0"),g=new we({color:f,wireframe:!0,transparent:!0,opacity:.014,depthTest:!0,depthWrite:!1,side:fa}),m=new X(l,g);m.renderOrder=0,u.add(m);const S=new we({colorWrite:!1,depthWrite:!0,depthTest:!0,depthFunc:jo,side:fa}),_=new X(h,S);_.renderOrder=1,u.add(_);const E=new we({colorWrite:!1,depthWrite:!0,depthTest:!0,side:bt}),v=new X(l,E);v.renderOrder=1,u.add(v);const y=new we({color:new P("#010e0b"),transparent:!0,opacity:.72,depthTest:!0,depthWrite:!0,side:ao}),w=new X(l,y);w.renderOrder=1,u.add(w);const b=new we({color:f,wireframe:!0,transparent:!0,opacity:.05,depthTest:!0,depthWrite:!1,side:bt}),p=new X(l,b);p.renderOrder=2,u.add(p);const x=new we({color:f,wireframe:!0,transparent:!0,opacity:.03,blending:K,depthTest:!0,depthWrite:!1}),T=new X(l,x);T.renderOrder=3,u.add(T);const R=new Ce(De,48,48),re=new J({uniforms:{uColor:{value:new L(f.r,f.g,f.b)}},vertexShader:`
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
    `,transparent:!0,blending:K,depthWrite:!1,side:bt}),Z=new X(R,re);Z.renderOrder=4,u.add(Z);const z=new gs(d,c.domElement);z.enableDamping=!0,z.dampingFactor=.05,z.autoRotate=e&&!n,z.autoRotateSpeed=.4,z.enablePan=!1,z.minDistance=1.5,z.maxDistance=5,z.minPolarAngle=Math.PI/2-42.5*Math.PI/180,z.maxPolarAngle=Math.PI/2+42.5*Math.PI/180;const F=new na(c),st=new ra(u,d);F.addPass(st);const ve=new Ae(new N(t.clientWidth||800,t.clientHeight||600),a*2,.4,.3);F.addPass(ve);const We=new Se(Fs);F.addPass(We);const Ue=document.createElement("div");Ue.className="s9-threatmap__overlay",Ue.innerHTML=`
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tr" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--bl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--br" aria-hidden="true"></div>
    ${ni(o)}
    <div class="s9-threatmap__coords" aria-live="polite">
      <span class="s9-threatmap__coords-lat">LAT: --.-°</span>
      <span class="s9-threatmap__coords-lng">LNG: --.-°</span>
    </div>
    <div class="s9-threatmap__node-count">NODES: 0</div>
  `,t.appendChild(Ue);let ye=null;z.addEventListener("start",()=>{z.autoRotate=!1,ye!==null&&(clearTimeout(ye),ye=null);const M=H.get(t);M&&(M.cameraLerpTarget=null,M.lastOrbitInteraction=Date.now())}),z.addEventListener("end",()=>{!n&&e&&(ye=setTimeout(()=>{z.autoRotate=!0,ye=null},6e3))});const I=new ResizeObserver(()=>{const M=t.clientWidth,ie=t.clientHeight;!M||!ie||(d.aspect=M/ie,d.updateProjectionMatrix(),c.setSize(M,ie),F.setSize(M,ie),ve.resolution.set(M,ie))});I.observe(t);const O=new qo;c.domElement.addEventListener("click",M=>{const ie=H.get(t);if(!ie)return;const Fe=c.domElement.getBoundingClientRect(),A=Fe.width,G=Fe.height,k=(M.clientX-Fe.left)/A*2-1,Q=-((M.clientY-Fe.top)/G)*2+1;O.setFromCamera(new N(k,Q),d);const _e=Array.from(ie.nodeMap.values()).map(le=>le.mesh),ue=O.intersectObjects(_e,!1);if(ue.length>0){const le=ue[0].object;Pe(t,le.userData.nodeId)}else ie.activeNodeId!==null&&Pe(t,null)},{signal:s}),H.set(t,{animFrameId:null,renderer:c,composer:F,bloomPass:ve,controls:z,scene:u,camera:d,resizeObserver:I,nodeMap:new Map,edgeMap:new Map,abortController:i,resumeTimer:null,reducedMotion:n,activeNodeId:null,colors:r,cyanColor:f,globeGeo:l,occluderGeo:h,globeBack:m,occluder:_,frontOccluder:v,globeSurface:w,globeFront:p,globeGlow:T,rimGeo:R,rimMesh:Z,geoGroup:null,cameraLerpTarget:null,lastOrbitInteraction:0,arcs:[],satelliteMode:!1,sunAngle:Math.random()*Math.PI*2,satelliteGroup:null,holoPass:We,nodeGeo:new Ce(.02,8,8),nodeTween:null,deselectTween:null,labelTypewriter:null,coordScrambleLat:null,coordScrambleLng:null,pendingTimers:[],tweenGeneration:0,crosshairShape:o});const be=H.get(t);let se=performance.now();function xe(){const M=H.get(t);if(!M)return;M.animFrameId=requestAnimationFrame(xe);const ie=performance.now(),Fe=ie-se;se=ie,M.revealAnim&&M.revealAnim.tick(Fe),M.cameraLerpTarget&&Date.now()-M.lastOrbitInteraction>=3e3&&(M.camera.position.lerp(M.cameraLerpTarget,.06),M.camera.position.distanceTo(M.cameraLerpTarget)<.04&&(M.camera.position.copy(M.cameraLerpTarget),M.cameraLerpTarget=null)),M.controls.update();for(let A=M.arcs.length-1;A>=0;A--){const G=M.arcs[A],k=Math.min(1,(Date.now()-G.t0)/G.dur);if(G.particle.position.copy(G.curve.getPoint(k)),k>.75){const Q=1-(k-.75)/.25;G.ptMat.opacity=.9*Q,G.lineMat.opacity=.1*Q}k>=1&&(M.scene.remove(G.line),M.scene.remove(G.particle),G.lineGeo.dispose(),G.lineMat.dispose(),G.ptGeo.dispose(),G.ptMat.dispose(),M.arcs.splice(A,1))}if(M.satelliteMode&&M.satMat){M.sunAngle+=15e-5;const A=performance.now()*.001;M.satMat.uniforms.sunDir.value.set(Math.cos(M.sunAngle),.22,Math.sin(M.sunAngle)).normalize(),M.satMat.uniforms.time.value=A,M.atmMat&&(M.atmMat.uniforms.time.value=A)}if(M.holoPass&&(M.holoPass.uniforms.time.value=performance.now()*.001),M.activeNodeId!==null){const A=M.nodeMap.get(M.activeNodeId),G=t.querySelector(".s9-threatmap__crosshair");if(A&&G){const k=t.clientWidth,Q=t.clientHeight,_e=A.mesh.position.clone().project(M.camera),ue=(_e.x*.5+.5)*k,le=(-_e.y*.5+.5)*Q;G.style.left=`${ue}px`,G.style.top=`${le}px`}}if(M.nodeTween){const A=M.nodeTween,G=Date.now()-A.t0,k=Math.min(1,G/A.dur),Q=k<A.riseFrac?Ma(k/A.riseFrac):Aa((k-A.riseFrac)/(1-A.riseFrac)),_e=k<A.riseFrac?1+(A.peakScale-1)*Q:A.peakScale-(A.peakScale-1)*Q;A.mesh.scale.setScalar(_e);const ue=A.flashDur/A.dur,le=A.settleDur/A.dur;if(k<ue)A.mesh.material.color.copy(A.flashColor);else if(k<ue+le){const ko=(k-ue)/le;A.mesh.material.color.lerpColors(A.flashColor,A.selectColor,Ca(ko))}else A.mesh.material.color.copy(A.selectColor);k>=1&&(A.mesh.scale.setScalar(1),A.mesh.material.color.copy(A.selectColor),M.nodeTween=null)}if(M.deselectTween){const A=M.deselectTween,G=Date.now()-A.t0,k=Math.min(1,G/A.dur),Q=.4,_e=k<Q?Aa(k/Q):Ma((k-Q)/(1-Q)),ue=k<Q?1-(1-A.troughScale)*_e:A.troughScale+(1-A.troughScale)*_e;if(A.mesh.scale.setScalar(ue),A.mesh.material.color.lerpColors(A.selectColor,A.levelColor,Ca(k)),k>=1){A.mesh.scale.setScalar(1),A.mesh.material.color.copy(A.levelColor);const le=A.element.querySelector(".s9-threatmap__crosshair");le&&le.classList.remove("s9-threatmap__crosshair--animating-out"),M.deselectTween=null}}M.composer.render()}const $e=new ii(u,{radius:De*1.003,numRings:56,durationMs:2e3,easingFn:Zs,direction:"south-to-north",stagger:.55,lineColor:65484,glowColor:65484,emissiveIntensity:2});$e.baseRings.renderOrder=4,$e.glowRings.renderOrder=4,be.revealAnim=$e,$e.play(()=>{$e.morphTo({opacity:0,glowOpacity:0},600)}),be.animFrameId=requestAnimationFrame(xe),Vs(t)}function ri(t){var e;return((e=H.get(t))==null?void 0:e.camera)??null}function li(t,e){const a=H.get(t);if(!a)return;const o=a.edgeMap.get(e);o&&(o.line.geometry.dispose(),o.line.material.dispose(),a.scene.remove(o.line),a.edgeMap.delete(e))}function So(t){const e=H.get(t);if(!e)return;const a=t.querySelector(".s9-threatmap__node-count");a&&(a.textContent=`NODES: ${e.nodeMap.size}`)}function xo(t,{id:e,lat:a,lng:o,label:i,level:s}){const n=H.get(t);if(!n)return;if(n.nodeMap.has(e)){console.warn(`[s9-threatmap] addNode: node "${e}" already exists.`);return}const r=Ne(),c=Re(s,r),u=new we({color:new P(c)}),d=new X(n.nodeGeo,u);d.renderOrder=5;const l=Yt(a,o);d.position.copy(l),d.userData.nodeId=e,d.userData.label=i,d.userData.lat=a,d.userData.lng=o,d.userData.level=s,n.scene.add(d),n.nodeMap.set(e,{mesh:d,lat:a,lng:o,label:i,level:s}),So(t)}function Eo(t,e){const a=H.get(t);if(!a)return;const o=a.nodeMap.get(e);if(!o){console.warn(`[s9-threatmap] removeNode: node "${e}" not found.`);return}a.activeNodeId===e&&Pe(t,null);for(const[i,s]of a.edgeMap)(s.from===e||s.to===e)&&li(t,i);o.mesh.material.dispose(),a.scene.remove(o.mesh),a.nodeMap.delete(e),So(t)}function ci(t,e){const a=H.get(t);if(!a||a.reducedMotion)return;const o=a.nodeMap.get(e);if(!o)return;const i=Ne(),s=Re(o.level,i),n=20,r=.035,c=[];for(let m=0;m<=n;m++){const S=m/n*Math.PI*2;c.push(new L(Math.cos(S)*r,Math.sin(S)*r,0))}const u=new Ie().setFromPoints(c),d=new ce({color:new P(s),transparent:!0,opacity:.8,depthWrite:!1}),l=new oo(u,d);l.renderOrder=5,l.position.copy(o.mesh.position);const h=o.mesh.position.clone().normalize();l.quaternion.setFromUnitVectors(new L(0,0,1),h),a.scene.add(l);const f=Date.now(),g=700;(function m(){if(!H.get(t)){a.scene.remove(l),u.dispose(),d.dispose();return}const S=Math.min(1,(Date.now()-f)/g);l.scale.setScalar(1+S*6),d.opacity=.85*(1-S),S<1?requestAnimationFrame(m):(a.scene.remove(l),u.dispose(),d.dispose())})()}function ui(t,e,a){const o=H.get(t);if(!o||o.reducedMotion)return;const i=o.nodeMap.get(e),s=o.nodeMap.get(a);if(!i||!s)return;const n=Ne(),r=Re(s.level,n),c=i.mesh.position.clone(),u=s.mesh.position.clone(),d=c.clone().add(u).multiplyScalar(.5),l=.2+d.length()*.25,h=d.clone().normalize().multiplyScalar(De+l),f=new Yo(c,h,u),g=new Ie().setFromPoints(f.getPoints(48)),m=new ce({color:new P(r),transparent:!0,opacity:.1,depthWrite:!1}),S=new so(g,m);S.renderOrder=2;const _=new Ce(.009,4,4),E=new we({color:new P(r),transparent:!0,opacity:.9}),v=new X(_,E);v.renderOrder=3,v.position.copy(c),o.scene.add(S),o.scene.add(v),o.arcs.push({curve:f,line:S,lineGeo:g,lineMat:m,particle:v,ptGeo:_,ptMat:E,t0:Date.now(),dur:1e3+Math.random()*700})}function di(t=null){const o=document.createElement("canvas");o.width=2048,o.height=1024;const i=o.getContext("2d"),s=i.createLinearGradient(0,0,0,1024);if(s.addColorStop(0,"#071a2e"),s.addColorStop(.15,"#082035"),s.addColorStop(.5,"#0a2a46"),s.addColorStop(.85,"#082035"),s.addColorStop(1,"#071a2e"),i.fillStyle=s,i.fillRect(0,0,2048,1024),t){const n=Hs(t,t.objects.land),c=(n.type==="FeatureCollection"?n.features:[n]).flatMap(l=>{const h=l.geometry;return h?h.type==="Polygon"?[h.coordinates]:h.coordinates:[]}),u=i.createLinearGradient(0,0,0,1024);u.addColorStop(0,"#dce8dc"),u.addColorStop(.06,"#8a9c7a"),u.addColorStop(.16,"#527848"),u.addColorStop(.28,"#4e7040"),u.addColorStop(.4,"#4a6c34"),u.addColorStop(.5,"#3a5c24"),u.addColorStop(.6,"#4a6c34"),u.addColorStop(.72,"#4e7040"),u.addColorStop(.84,"#7a8c6a"),u.addColorStop(.92,"#ccd8c4"),u.addColorStop(1,"#eaf0ea");for(const l of c)for(let h=0;h<l.length;h++){const f=l[h];i.beginPath();for(let g=0;g<f.length;g++){const[m,S]=f[g],_=(m+180)/360*2048,E=(90-S)/180*1024;g===0?i.moveTo(_,E):i.lineTo(_,E)}i.closePath(),i.fillStyle=h===0?u:"#0a2a46",i.fill()}const d=[[22,15,16,28,"rgba(172,142, 88,0.72)"],[23,44,8,12,"rgba(178,148, 96,0.68)"],[27,70,5,9,"rgba(182,158,112,0.52)"],[42,100,6,16,"rgba(152,128, 86,0.58)"],[-25,132,10,17,"rgba(168,134, 82,0.58)"],[-22,-68,4,6,"rgba(142,118, 76,0.48)"],[35,-114,5,8,"rgba(158,128, 82,0.42)"],[40,58,5,8,"rgba(158,134, 88,0.45)"]];for(const[l,h,f,g,m]of d){const[S,_]=Qe(l,h,2048,1024),E=g/360*2048,v=f/180*1024,y=i.createRadialGradient(S,_,0,S,_,Math.max(E,v)),w=m.replace(/[\d.]+\)$/,"0)");y.addColorStop(0,m),y.addColorStop(.55,m),y.addColorStop(.88,m.replace(/[\d.]+\)$/,"0.08)")),y.addColorStop(1,w),i.fillStyle=y,i.beginPath(),i.ellipse(S,_,E,v,0,0,Math.PI*2),i.fill()}i.strokeStyle="rgba(120,175,210,0.22)",i.lineWidth=.8;for(const l of c){const h=l[0];i.beginPath();for(let f=0;f<h.length;f++){const[g,m]=h[f],S=(g+180)/360*2048,_=(90-m)/180*1024;f===0?i.moveTo(S,_):i.lineTo(S,_)}i.closePath(),i.stroke()}}i.strokeStyle="rgba(100,150,200,0.04)",i.lineWidth=.5;for(let n=-80;n<=80;n+=30){const r=Qe(n,0,2048,1024)[1];i.beginPath(),i.moveTo(0,r),i.lineTo(2048,r),i.stroke()}for(let n=-180;n<=180;n+=30){const r=Qe(0,n,2048,1024)[0];i.beginPath(),i.moveTo(r,0),i.lineTo(r,1024),i.stroke()}return o}function hi(){const a=document.createElement("canvas");a.width=1024,a.height=512;const o=a.getContext("2d");o.fillStyle="#000810",o.fillRect(0,0,1024,512);const i=[[40.7,-74,4],[34,-118.2,3.5],[41.9,-87.6,3],[29.8,-95.4,2.5],[19.4,-99.1,3],[43.7,-79.4,3],[45.5,-73.6,2.5],[49.3,-123.1,2],[38.9,-77,2.5],[42.4,-71.1,2.5],[32.8,-96.8,2.5],[33.7,-84.4,2],[37.8,-122.4,2.5],[47.6,-122.3,2],[39.7,-105,2],[33.4,-112.1,2],[36.2,-115.1,2],[29.4,-98.5,2],[32.7,-97.1,2],[30.3,-81.7,1.5],[51,-114.1,2],[53.5,-113.5,2],[49.9,-97.1,2],[14.1,-87.2,1.5],[13.7,-89.2,1.5],[-23.5,-46.6,4],[-22.9,-43.2,3.5],[-34.6,-58.4,3.5],[-12,-77,2],[4.7,-74.1,2],[10.5,-66.9,2],[-33.5,-70.7,2.5],[-3.7,-38.5,2],[-8.1,-34.9,2],[-19.9,-43.9,2.5],[-30,-51.2,2],[-15.8,-47.9,2],[51.5,-.1,4],[48.9,2.3,4],[52.5,13.4,3.5],[55.8,37.6,4],[41,28.9,3.5],[59.9,10.8,2],[59.3,18.1,2],[60.2,25,2],[52.2,21,2.5],[50.1,14.4,2.5],[47.5,19,2.5],[48.2,16.4,2.5],[47.4,8.5,2.5],[48.1,11.6,3],[52.4,4.9,3],[40.4,-3.7,3],[41.4,2.2,3],[45.5,9.2,3],[41.9,12.5,3],[37.9,23.7,2.5],[50,8.7,2.5],[51,13.7,2],[51.2,6.8,2.5],[50.9,4.3,2.5],[53.5,-2.2,2],[55.7,12.6,2],[50.5,30.5,2.5],[59.5,30.3,2.5],[48,37.8,2],[46.5,30.7,2],[49.8,24,2],[50.4,30.5,2],[45.4,28,2],[44.4,26.1,2],[42.7,23.3,2],[37.1,-8.6,2],[30.1,31.3,3.5],[25.2,55.3,2.5],[33.3,44.4,2.5],[35.7,51.4,3],[24.7,46.7,2.5],[31.8,35.2,2],[33.9,35.5,2],[36.8,10.2,2],[32.9,13.2,2],[30.7,29.7,2],[6.5,3.4,2.5],[-26.2,28,3],[-33.9,18.4,2],[-1.3,36.8,2],[5.3,-4,2],[14.7,17.4,1.5],[9.1,7.4,2],[4.4,18.6,1.5],[-4.3,15.3,1.5],[-11.7,43.3,1.5],[-18.9,47.5,1.5],[28.6,77.2,4],[19.1,72.9,3.5],[12.9,77.6,3],[23.7,90.4,3],[24.9,67,2.5],[31.6,74.3,2.5],[33.7,73.1,2],[17.4,78.5,2.5],[22.6,88.4,2.5],[13.1,80.3,2.5],[23,72.6,2],[22.3,70.8,2],[26.9,75.8,2],[21.2,81.4,2],[27.7,85.3,2],[41.3,69.2,2],[43.3,76.9,2],[51.2,71.5,1.5],[53.9,27.6,2],[54.7,55.9,2],[56.8,60.6,2],[55,73.4,2],[56,92.9,2],[52.3,104.3,2],[53.7,87.1,2],[62,129.7,1.5],[43.1,131.9,2],[61.8,34.4,2],[35.7,139.7,5],[37.5,127,4],[39.9,116.4,4.5],[31.2,121.5,4.5],[23.1,113.3,4],[22.3,114.2,3.5],[30.6,104.1,3.5],[32.1,118.8,3.5],[30.3,120.2,3],[36.7,117,2.5],[34.3,108.9,2.5],[26,119.3,2.5],[41.8,123.4,2.5],[45.8,126.5,2.5],[34.6,135.5,3.5],[33.6,130.4,3],[1.3,103.8,3.5],[13.7,100.5,2.5],[10.8,106.7,2.5],[14.6,121,2.5],[3.1,101.7,2.5],[6.2,106.8,3],[21,105.8,2],[-6.2,106.8,2.5],[-33.9,151.2,2.5],[-37.8,144.9,2],[-27.5,153,2],[-31.9,115.9,2],[-43.5,172.6,1.5]];for(const[s,n,r]of i){const[c,u]=Qe(s,n,1024,512),d=r*2.2,l=o.createRadialGradient(c,u,0,c,u,d);l.addColorStop(0,"rgba(255,210,120,0.22)"),l.addColorStop(.5,"rgba(255,170,60,0.08)"),l.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=l,o.beginPath(),o.arc(c,u,d,0,Math.PI*2),o.fill()}o.globalCompositeOperation="lighter";for(const[s,n,r]of i){const[c,u]=Qe(s,n,1024,512),d=Math.max(1,r*.9),l=o.createRadialGradient(c,u,0,c,u,d);l.addColorStop(0,`rgba(255,245,200,${Math.min(.9,.5+r*.1)})`),l.addColorStop(.6,"rgba(255,200,100,0.15)"),l.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=l,o.beginPath(),o.arc(c,u,d,0,Math.PI*2),o.fill()}return o.globalCompositeOperation="source-over",a}function Na(t){return new Promise((e,a)=>{new io().load(t,e,void 0,a)})}async function fi(t){const e=H.get(t);if(!e||e.satelliteGroup)return;let a,o,i=1;try{[a,o]=await Promise.all([Na("/textures/earth_day.jpg"),Na("/textures/earth_night.jpg")]),a.colorSpace=ma,o.colorSpace=ma}catch(h){console.warn("[s9-threatmap] satellite textures not found, using procedural fallback",h);let f=Us();if(!f)try{const g=await fetch("/data/countries-110m.json");g.ok&&(f=await g.json(),vo(f))}catch{}a=new pa(di(f)),o=new pa(hi()),i=0}const s=new J({uniforms:{dayMap:{value:a},nightMap:{value:o},sunDir:{value:new L(Math.cos(e.sunAngle),.22,Math.sin(e.sunAngle)).normalize()},realTex:{value:i},time:{value:0}},vertexShader:`
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
    `}),n=new Ce(De,128,64),r=new X(n,s);r.renderOrder=0;const c=new Ce(De*1.055,64,32),u=new J({uniforms:{glowCol:{value:new P(51455)},sunDir:{value:s.uniforms.sunDir.value},time:{value:0}},vertexShader:`
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
    `,side:bt,blending:K,transparent:!0,depthWrite:!1}),d=new X(c,u);d.renderOrder=1;const l=new Za;l.add(r),l.add(d),l.visible=!1,e.scene.add(l),Object.assign(e,{satelliteGroup:l,satGeo:n,satMat:s,atmGeo:c,atmMat:u,dayTex:a,nightTex:o})}async function mi(t,e){const a=H.get(t);a&&(e?(a.globeBack&&(a.globeBack.visible=!1),a.occluder&&(a.occluder.visible=!1),a.frontOccluder&&(a.frontOccluder.visible=!1),a.globeFront&&(a.globeFront.visible=!1),a.globeSurface&&(a.globeSurface.visible=!1),a.globeGlow&&(a.globeGlow.visible=!1),a.rimMesh&&(a.rimMesh.visible=!1),a.geoGroup&&(a.geoGroup.visible=!1),a.bloomPass&&(a._bloomPrev={strength:a.bloomPass.strength,threshold:a.bloomPass.threshold,radius:a.bloomPass.radius},a.bloomPass.strength=.32,a.bloomPass.threshold=.85,a.bloomPass.radius=.35),a.satelliteMode=!0,await fi(t),a.satelliteGroup&&(a.satelliteGroup.visible=!0)):(a.satelliteGroup&&(a.satelliteGroup.visible=!1),a.globeBack&&(a.globeBack.visible=!0),a.occluder&&(a.occluder.visible=!0),a.frontOccluder&&(a.frontOccluder.visible=!0),a.globeFront&&(a.globeFront.visible=!0),a.globeSurface&&(a.globeSurface.visible=!0),a.globeGlow&&(a.globeGlow.visible=!0),a.rimMesh&&(a.rimMesh.visible=!0),a.geoGroup&&(a.geoGroup.visible=!0),a.bloomPass&&a._bloomPrev&&(a.bloomPass.strength=a._bloomPrev.strength,a.bloomPass.threshold=a._bloomPrev.threshold,a.bloomPass.radius=a._bloomPrev.radius),a.satelliteMode=!1))}function Ua(t){const e=H.get(t);if(!e)return;const a=Ne(!0);e.colors=a;const o=a.neonCyan||"#00d48ddf";e.globeBack&&e.globeBack.material.color.set(o),e.globeFront&&e.globeFront.material.color.set(o),e.geoGroup&&e.geoGroup.traverse(i=>{i.isLine&&i.material.color.set(a.neonCyan||"#008410D0")});for(const i of e.nodeMap.values()){const s=Re(i.level,a);i.mesh.material.color.set(s),i.mesh.material.emissive.set(s)}}const pi=new WeakMap;function gi(t){const e=new AbortController;pi.set(t,e),t.classList.add("s9-panel--booting"),t.addEventListener("animationend",a=>{a.animationName==="crt-flicker"&&(t.classList.remove("s9-panel--booting"),t.dispatchEvent(new CustomEvent("s9:panel-mount",{bubbles:!0,detail:{id:t.dataset.s9Id??null}})))},{signal:e.signal,once:!0})}const zt=["complete","active","failed","pending"];function vi(t,e){if(!zt.includes(e)){console.warn(`[s9-sequence] Unknown state: "${e}". Expected one of: ${zt.join(", ")}.`);return}zt.forEach(a=>t.classList.remove(`s9-sequence__entry--${a}`)),e==="failed"?(t.classList.add("s9-sequence__entry--fail-flash"),t.addEventListener("animationend",()=>{t.classList.remove("s9-sequence__entry--fail-flash"),t.classList.add("s9-sequence__entry--failed"),Fa(t,e)},{once:!0})):(t.classList.add(`s9-sequence__entry--${e}`),Fa(t,e))}function Fa(t,e){t.dispatchEvent(new CustomEvent("s9:sequence-step-change",{bubbles:!0,detail:{state:e}}))}const yi={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new N(1/1024,1/512)}},vertexShader:`

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

		}`},bi=[..."アウエオカキケコサシスセソタツテナニヌネ",..."ハヒホマミムメモヤヨラリワー",..."012345789z",...':."*+<>|¦╌▪꞊'],_i=8,wi=8,To=`
// Stable hash — keeps inputs small with fract() to avoid GPU sin() precision issues
float h2(vec2 v) {
  vec2 s = fract(v * vec2(0.1031, 0.1030));
  s += dot(s, s.yx + 33.33);
  return fract((s.x + s.y) * s.x);
}
`,Si={uniforms:{tDiffuse:{value:null},tPrev:{value:null},decay:{value:.88}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},xi={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.42},scanlineOpacity:{value:.045},aberrationAmt:{value:.0025}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},Ei={uniforms:{tDiffuse:{value:null},uTime:{value:0},uHeatAmt:{value:.004},uHeatFreq:{value:60},uHeatSpeed:{value:3.5}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},Ti={uniforms:{tDiffuse:{value:null},uTime:{value:0},uStreakAmt:{value:.055},uAspect:{value:1.78}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},ka=600,St=120,Mi=.12,Ai=.08,Ci=16,Ba=3.5,Di=8;function Li(t){const e=new io().load(t);return e.flipY=!1,e.minFilter=Qo,e.magFilter=Jo,e.colorSpace=es,e.generateMipmaps=!0,{tex:e,count:bi.length}}function Ri(){const t=new Qa,e=new at(1,1);t.index=e.index.clone(),t.setAttribute("position",e.getAttribute("position").clone()),t.setAttribute("uv",e.getAttribute("uv").clone()),e.dispose();const a=ka*St,o=new Float32Array(a),i=new Float32Array(a),s=new Float32Array(a*4),n=new Float32Array(a*4);for(let r=0;r<ka;r++){const c=Math.random()*Math.PI*2,u=1-2*Math.random(),d=Math.sqrt(1-u*u),l=Math.pow(Math.random(),.12),h=Ba+l*(Di-Ba),f=d*Math.cos(c)*h,g=d*Math.sin(c)*h,S=u*h+(Math.random()-.5)*2,_=.4+Math.random()*1.87,E=Math.random(),v=.5+Math.random()*1,y=.18+Math.random()*.72,w=.015+Math.random()*.035;for(let b=0;b<St;b++){const p=r*St+b;o[p]=r,i[p]=b;const x=p*4;s[x]=f,s[x+1]=g,s[x+2]=_,s[x+3]=E,n[x]=S,n[x+1]=v,n[x+2]=y,n[x+3]=w}}return t.setAttribute("aColIdx",new ge(o,1)),t.setAttribute("aRowIdx",new ge(i,1)),t.setAttribute("aColA",new ge(s,4)),t.setAttribute("aColB",new ge(n,4)),t.instanceCount=a,t}const Pi=`
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

${To}

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
`,Ii=`
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

${To}

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
`,Oi={uniforms:{tDiffuse:{value:null},uBlurStrength:{value:.006}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},Rt=new Map;function Ni(t,e={}){Rt.has(t)&&Ga(t);const a=t.querySelector("canvas[data-matrix-rain]");a&&a.remove();const{color:o="#00ff70",opacity:i=.82,syncCamera:s=null}=e,n=new P(o),r=Li("/data/matrixcode_msdf.png"),c=new aa({antialias:!1,alpha:!0});c.setPixelRatio(Math.min(window.devicePixelRatio,2)),c.setSize(t.clientWidth||1,t.clientHeight||1);const u=c.domElement;u.dataset.matrixRain="1",u.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;",t.appendChild(u);const d=new oa,l=new to(45,(t.clientWidth||1)/(t.clientHeight||1),.1,60);l.position.set(0,0,3),l.lookAt(0,0,0);const h=Ri(),f={uGlyphTex:{value:r.tex},uGlyphCount:{value:r.count},uAtlasCols:{value:_i},uAtlasGrid:{value:wi},uTime:{value:0},uCellW:{value:Mi},uCellH:{value:Ai},uWorldH:{value:Ci},uNRows:{value:St},uColor:{value:new L(n.r,n.g,n.b)},uGlobalAlpha:{value:i},uDepth:{value:.04},uPomSteps:{value:6},uNormalStrength:{value:6},uLightDir:{value:new L(-.4,.8,.5).normalize()},uGlobeInteract:{value:1},uGlyphChroma:{value:1}},g=new J({uniforms:f,vertexShader:Pi,fragmentShader:Ii,transparent:!0,depthWrite:!1,blending:Zo,blendEquation:Ko,blendSrc:it,blendDst:it,blendEquationAlpha:Xo,blendSrcAlpha:it,blendDstAlpha:it,side:ao,extensions:{derivatives:!0}}),m=new X(h,g);m.frustumCulled=!1,m.renderOrder=1,d.add(m);const S=t.clientWidth||1,_=t.clientHeight||1,E=new na(c);E.addPass(new ra(d,l));const v=new Ae(new N(S,_),1.15,.45,.2);E.addPass(v);const y=new Se(Ei);y.enabled=!0,E.addPass(y);const w=c.getDrawingBufferSize(new N);let b=new ga(w.x,w.y);const p=new Se(Si);p.uniforms.tPrev.value=b;const x=p.render.bind(p);p.render=function(I,O,be,se,xe){this.uniforms.tPrev.value=b,x(I,O,be,se,xe),I.copyFramebufferToTexture(b)},E.addPass(p);const T=new Se(Oi);T.enabled=!0,T.uniforms.uBlurStrength.value=.002,E.addPass(T);const R=new Se(Ti);R.enabled=!0,R.uniforms.uAspect.value=(t.clientWidth||1)/(t.clientHeight||1),E.addPass(R);const re=new Se(xi);E.addPass(re);const Z=new Se(yi),z=c.getPixelRatio();Z.uniforms.resolution.value.set(1/((t.clientWidth||1)*z),1/((t.clientHeight||1)*z)),E.addPass(Z);const F={renderer:c,composer:E,bloomPass:v,heatPass:y,softenPass:T,phosphorPass:p,phosphorTex:b,holoPass:re,streakPass:R,fxaaPass:Z,material:g,geom:h,atlas:r,ro:null,animId:0,syncCamera:s,burstBloomEnabled:!0};Rt.set(t,F);let st=0,ve=0,We=-1;function Ue(I){F.animId=requestAnimationFrame(Ue);const O=I*.001,be=O-st;if(st=O,f.uTime.value=O,re.uniforms.time.value=O,y.uniforms.uTime.value=O,R.uniforms.uTime.value=O,F.burstBloomEnabled){const se=Math.floor(O/4);if(se!==We&&(We=se,ve=.3),ve>0){ve=Math.max(0,ve-be);const xe=1-ve/.3;v.threshold=xe<.2?At.lerp(.2,.1,xe/.2):At.lerp(.1,.2,(xe-.2)/.8)}else v.threshold=.2}else v.threshold=.2;if(F.syncCamera&&(l.position.copy(F.syncCamera.position),l.quaternion.copy(F.syncCamera.quaternion),l.fov=F.syncCamera.fov,l.near=F.syncCamera.near,l.far=F.syncCamera.far,l.updateProjectionMatrix()),l.position.lengthSq()>.001){const se=Math.atan2(l.position.x,l.position.z)+Math.PI/3;f.uLightDir.value.set(Math.sin(se)*.6,.8,Math.cos(se)*.6).normalize()}F.composer.render()}F.animId=requestAnimationFrame(Ue);let ye=!1;return F.ro=new ResizeObserver(()=>{ye||(ye=!0,requestAnimationFrame(()=>{ye=!1;const I=t.clientWidth||1,O=t.clientHeight||1;c.setSize(I,O),F.composer.setSize(I,O),F.bloomPass.resolution.set(I,O);const be=c.getPixelRatio();F.fxaaPass.uniforms.resolution.value.set(1/(I*be),1/(O*be)),F.streakPass.uniforms.uAspect.value=I/O,l.aspect=I/O,l.updateProjectionMatrix();const se=c.getDrawingBufferSize(new N);F.phosphorTex.dispose(),b=new ga(se.x,se.y),F.phosphorTex=b}))}),F.ro.observe(t),{destroy(){Ga(t)},setColor(I){const O=new P(I);f.uColor.value.set(O.r,O.g,O.b)},setOpacity(I){f.uGlobalAlpha.value=I},setDepth(I){f.uDepth.value=I},setNormalStrength(I){f.uNormalStrength.value=I},setSoften(I,O){T.enabled=I,O!==void 0&&(T.uniforms.uBlurStrength.value=O)},setHeat(I,O){y.enabled=I,O!==void 0&&(y.uniforms.uHeatAmt.value=O)},setStreaks(I,O){R.enabled=I,O!==void 0&&(R.uniforms.uStreakAmt.value=O)},setBurstBloom(I){F.burstBloomEnabled=I},setGlobeInteract(I){f.uGlobeInteract.value=I?1:0},setGlyphChroma(I,O){f.uGlyphChroma.value=I?O??1:0}}}function Ga(t){const e=Rt.get(t);e&&(cancelAnimationFrame(e.animId),e.ro.disconnect(),e.holoPass&&e.holoPass.material.dispose(),e.phosphorPass&&e.phosphorPass.material.dispose(),e.phosphorTex&&e.phosphorTex.dispose(),e.composer.dispose(),e.material.dispose(),e.geom.dispose(),e.atlas.tex.dispose(),e.renderer.dispose(),e.renderer.domElement.remove(),Rt.delete(t))}const Mo=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Ui=`
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
}`,Fi=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,ki=`
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
}`,Bi=`
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
}`,Gi=`
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
}`,Hi=`
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
}`,zi=`
varying vec2 vUv;
uniform vec3  uColor;
uniform float uIntensity;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float glow = exp(-r * r * 8.0) * uIntensity;
  if (glow < 0.005) discard;
  gl_FragColor = vec4(uColor * glow, glow * 0.6);
}`,Wi={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.38},scanlineOpacity:{value:.07},aberrationAmt:{value:.001}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},B=Math.PI*2,me=32,xt=new WeakMap;let $i=0;function Vi(){return`T-${String(++$i).padStart(2,"0")}`}function Ke(t){return getComputedStyle(document.documentElement).getPropertyValue(t).trim()}function Te(t){const e=new P().setStyle(t||"#000000");return[e.r,e.g,e.b]}function Pt(t,e,a){return t+(e-t)*Math.max(0,Math.min(1,a))}function ji(t,e){const a=((t-e)%B+B)%B;return a>Math.PI?a-B:a}function Ao(){return{neonCyan:Ke("--neon-cyan")||"#00f0ff",neonGreen:Ke("--neon-green")||"#00ff9d",neonAlert:Ke("--neon-alert")||"#ff00cc",neonWarn:Ke("--neon-warn")||"#ffb300",voidColor:Ke("--void")||"#05080f"}}function Ha(t,e){const a=t.ringHzBase;return e==="friendly"?a*.6:e==="hostile"?a*1.5:a}function qi(t){const e=Pt(.1,.85,t),a=Pt(.3,.05,t),o=Math.random();return o<e?"hostile":o<e+a?"friendly":"neutral"}function Yi(t){return t==="friendly"?0:t==="neutral"?1:t==="hostile"?2:3}let Ze=null,Xt=!1;function Xi(t=.08){if(!Xt)try{Ze||(Ze=new Audio("/sonar-ping.mp3")),Ze.volume=Math.min(1,Math.max(0,t)),Ze.currentTime=0,Ze.play().catch(()=>{})}catch{}}function Ki(){Xt=!Xt}function Zi(t){const a=new Float32Array(192);for(let i=0;i<64;i++){const s=i/64*B;a[i*3]=Math.sin(s)*t,a[i*3+1]=Math.cos(s)*t,a[i*3+2]=0}const o=new Ie;return o.setAttribute("position",new It(a,3)),o}function Qi(t){const a=new Float32Array(192);for(let i=0;i<32;i++){const s=i/32*B,n=i%8===0?t*.92:t*.96,r=i*6;a[r]=Math.sin(s)*n,a[r+1]=Math.cos(s)*n,a[r+2]=0,a[r+3]=Math.sin(s)*t,a[r+4]=Math.cos(s)*t,a[r+5]=0}const o=new Ie;return o.setAttribute("position",new It(a,3)),o}function Ji(t){const{scene:e,R:a,theme:o}=t;t.backgroundMesh&&(t.backgroundMesh.geometry.dispose(),t.backgroundMesh.material.dispose(),e.remove(t.backgroundMesh));const i=new P(o.voidColor),s=new at(a*2,a*2),n=new J({vertexShader:Mo,fragmentShader:Ui,uniforms:{uVoidColor:{value:new L(i.r,i.g,i.b)},uTime:{value:0}},transparent:!0,depthWrite:!0,blending:qt}),r=new X(s,n);r.renderOrder=0,e.add(r),t.backgroundMesh=r}function en(t){const{scene:e,R:a,theme:o}=t;t.centerGlowMesh&&(t.centerGlowMesh.geometry.dispose(),t.centerGlowMesh.material.dispose(),e.remove(t.centerGlowMesh));const i=new P(o.neonCyan),s=a*.5,n=new at(s,s),r=new J({vertexShader:Mo,fragmentShader:zi,uniforms:{uColor:{value:new L(i.r,i.g,i.b)},uIntensity:{value:0}},transparent:!0,depthWrite:!1,blending:K}),c=new X(n,r);c.renderOrder=6,e.add(c),t.centerGlowMesh=c}function tn(t){const{scene:e,R:a,theme:o}=t;t.ringMeshes&&(t.ringMeshes.forEach(u=>{u.geometry.dispose(),e.remove(u)}),t.matRingInner&&t.matRingInner.dispose(),t.matRingOuter&&t.matRingOuter.dispose()),t.ticksMesh&&(t.ticksMesh.geometry.dispose(),t.matRingTicks&&t.matRingTicks.dispose(),e.remove(t.ticksMesh));const i=new ce({color:new P(o.neonCyan),opacity:.18,transparent:!0,depthWrite:!1,blending:K}),s=new ce({color:new P(o.neonCyan),opacity:.28,transparent:!0,depthWrite:!1,blending:K}),n=new ce({color:new P(o.neonCyan),opacity:.22,transparent:!0,depthWrite:!1,blending:K}),r=[.2,.4,.6,.8,1];t.ringMeshes=r.map((u,d)=>{const l=new oo(Zi(u*a),d<4?i:s);return l.renderOrder=1,e.add(l),l});const c=new Be(Qi(a),n);c.renderOrder=1,e.add(c),t.ticksMesh=c,t.matRingInner=i,t.matRingOuter=s,t.matRingTicks=n}function an(t){const{scene:e,R:a,theme:o}=t;t.sweepTrailMesh&&(t.sweepTrailMesh.geometry.dispose(),t.sweepTrailMesh.material.dispose(),e.remove(t.sweepTrailMesh)),t.sweepArmLine&&(t.sweepArmLine.geometry.dispose(),t.sweepArmLine.material.dispose(),e.remove(t.sweepArmLine));const i=new P(o.neonCyan),s=new L(i.r,i.g,i.b),n=new at(a*2,a*2),r=new J({vertexShader:Fi,fragmentShader:ki,uniforms:{uAngle:{value:t.sweepAngle},uArcWidth:{value:Math.PI*.6},uColor:{value:s.clone()},uStaticAmt:{value:1}},transparent:!0,depthWrite:!1,blending:K}),c=new X(n,r);c.renderOrder=2,e.add(c),t.sweepTrailMesh=c;const u=new Float32Array([0,0,0,Math.sin(t.sweepAngle)*a,Math.cos(t.sweepAngle)*a,0]),d=new Ie;d.setAttribute("position",new It(u,3));const l=new ce({color:new P(o.neonCyan),opacity:.9,transparent:!0,depthWrite:!1,blending:K}),h=new so(d,l);h.renderOrder=3,e.add(h),t.sweepArmLine=h}function on(t){const{scene:e,theme:a}=t;t.contactDotsMesh&&(t.contactDotsMesh.geometry.dispose(),t.contactDotsMesh.material.dispose(),e.remove(t.contactDotsMesh)),t.contactRingsMesh&&(t.contactRingsMesh.geometry.dispose(),t.contactRingsMesh.material.dispose(),e.remove(t.contactRingsMesh));const o=Te(a.neonGreen),i=Te(a.neonWarn),s=Te(a.neonAlert),n=Te(a.neonCyan);function r(d,l,h){const f=new at(1,1),g=new ge(new Float32Array(me).fill(0),1),m=new ge(new Float32Array(me).fill(1),1),S=new ge(new Float32Array(me).map(()=>Math.random()),1),_=new ge(new Float32Array(me).fill(0),1);g.setUsage(Ve),m.setUsage(Ve),S.setUsage(Ve),_.setUsage(Ve),f.setAttribute("a_type",g),f.setAttribute("a_age",m),f.setAttribute("a_phase",S),f.setAttribute("a_sweepFade",_);const E=new J({vertexShader:Bi,fragmentShader:d,uniforms:l,transparent:!0,depthWrite:!1,blending:K}),v=new ts(f,E,me);v.renderOrder=h,v.instanceMatrix.setUsage(Ve);const y=new no;y.scale.setScalar(0),y.updateMatrix();for(let w=0;w<me;w++)v.setMatrixAt(w,y.matrix);return v.instanceMatrix.needsUpdate=!0,e.add(v),v}const c={uC0:{value:new L(...o)},uC1:{value:new L(...i)},uC2:{value:new L(...s)},uC3:{value:new L(...n)}},u={uC0:{value:new L(...o)},uC1:{value:new L(...i)},uC2:{value:new L(...s)}};t.contactDotsMesh=r(Gi,c,5),t.contactRingsMesh=r(Hi,u,4)}function sn(t){const{element:e,overlay:a,R:o}=t,i=e.clientWidth/2,s=e.clientHeight/2;t.staticLabelEls.forEach(d=>d.remove()),t.staticLabelEls=[];const n=[2,4,6,8];[.2,.4,.6,.8].forEach((d,l)=>{const h=document.createElement("span");h.className="s9-radar__ring-label",h.textContent=`${n[l]}km`,h.style.left=`${i+d*o+4}px`,h.style.top=`${s}px`,h.style.transform="translateY(-50%)",a.appendChild(h),t.staticLabelEls.push(h)});const c=[["N",0],["NE",B*.125],["E",B*.25],["SE",B*.375],["S",B*.5],["SW",B*.625],["W",B*.75],["NW",B*.875]],u=o*1.05;c.forEach(([d,l])=>{const h=document.createElement("span");h.className="s9-radar__cardinal-label",h.textContent=d,h.style.left=`${i+Math.sin(l)*u}px`,h.style.top=`${s-Math.cos(l)*u}px`,h.style.transform="translate(-50%, -50%)",a.appendChild(h),t.staticLabelEls.push(h)})}function nn(t){Ji(t),en(t),tn(t),an(t),sn(t),t.contactDotsMesh?rn(t):on(t)}function rn(t){const{contacts:e,dummy:a,contactDotsMesh:o,contactRingsMesh:i,R:s}=t;!o||!i||(e.forEach((n,r)=>{if(!n)a.scale.setScalar(0),a.position.set(0,0,0),a.updateMatrix(),o.setMatrixAt(r,a.matrix),i.setMatrixAt(r,a.matrix);else{const c=n.age<.08?Pt(0,8,n.age/.08):8;a.position.set(Math.sin(n.angle)*n.range*s,Math.cos(n.angle)*n.range*s,0),a.scale.setScalar(c),a.updateMatrix(),o.setMatrixAt(r,a.matrix),a.scale.setScalar(c>0?s*1.5:0),a.updateMatrix(),i.setMatrixAt(r,a.matrix)}}),o.instanceMatrix.needsUpdate=!0,i.instanceMatrix.needsUpdate=!0)}function Kt(t,e){const a=t.contacts[e];a&&(a.labelEl&&(a.labelEl.remove(),a.labelEl=null),t.contactDotsMesh&&t.contactRingsMesh&&(t.dummy.scale.setScalar(0),t.dummy.position.set(0,0,0),t.dummy.updateMatrix(),t.contactDotsMesh.setMatrixAt(e,t.dummy.matrix),t.contactRingsMesh.setMatrixAt(e,t.dummy.matrix),t.contactDotsMesh.instanceMatrix.needsUpdate=!0,t.contactRingsMesh.instanceMatrix.needsUpdate=!0),t.contacts[e]=null)}function ca(t,e,a,o,i){var S;const s=t.opts.maxContacts;if(t.contacts.filter(Boolean).length>=s){let _=-1,E=-1;for(let v=0;v<me;v++)((S=t.contacts[v])==null?void 0:S.type)==="ghost"&&t.contacts[v].age>E&&(_=v,E=t.contacts[v].age);if(_>=0)Kt(t,_);else return console.warn("[pulse-radar] contact pool full"),null}let r=-1;for(let _=0;_<me;_++)if(!t.contacts[_]){r=_;break}if(r<0)return null;const c=o==="ghost",u=(e%B+B)%B,d=Math.max(0,Math.min(1,a)),l=Math.sin(u)*d,h=Math.cos(u)*d,f=c?0:.01+Math.random()*.025,g=Math.random()*B,m={id:i||Vi(),angle:u,range:d,wx:l,wy:h,wvx:c?0:Math.sin(g)*f,wvy:c?0:Math.cos(g)*f,type:o,age:c?.85:0,maxAge:c?3e3:8e3+Math.random()*1e4,bornAt:performance.now(),phase:c?Math.random()*.3:1,lastSweep:-1/0,ghostAngle:null,ghostRange:null,ghostSpawned:!1,instIdx:r,labelEl:null,sweepAlpha:c?.15:1,fadeTimeMs:4200*(.88+Math.random()*.24),revealed:c,revealTime:c?performance.now():null};if(!c){const _=document.createElement("span");_.className=`s9-radar__label s9-radar__label--${o}`,_.textContent=o==="hostile"?`${m.id} ⚠HC`:m.id,t.labelsDiv.appendChild(_),m.labelEl=_}return t.contacts[r]=m,m}function Et(t){if(t.destroyed||t.reducedMotion)return;const e=Math.max(.05,t.opts.contactDensity),a=Pt(3e3,600,t.threatLevel)/e,o=(Math.random()-.5)*a*.4,i=Math.max(200,a+o);t.spawnTimer=setTimeout(()=>{!t.destroyed&&!t.reducedMotion&&(ln(t),Et(t))},i)}function ln(t){const e=t.contacts.filter(s=>s&&s.type!=="ghost"),a=e.length>0&&Math.random()<.3,o=t.sweepAngle;let i;if(a){const s=e[Math.floor(Math.random()*e.length)];i=Math.max(.15,Math.min(.97,s.range+(Math.random()-.5)*.3))}else i=.15+Math.random()*.82;ca(t,o,i,qi(t.threatLevel))}function cn(t,e){if(t.reducedMotion)return;const a=t.sweepAngle;t.sweepAngle=(t.sweepAngle+t.sweepSpeed*e/1e3)%B,t.sweepAngle<a&&(Xi(.06),t.centerGlowIntensity=1),t.centerGlowIntensity>0&&(t.centerGlowIntensity*=Math.pow(.001,e/600),t.centerGlowIntensity<.005&&(t.centerGlowIntensity=0),t.centerGlowMesh&&(t.centerGlowMesh.material.uniforms.uIntensity.value=t.centerGlowIntensity));const o=performance.now();if(t.staticNextAt===null&&(t.staticNextAt=o+7e3+Math.random()*5e3),o>=t.staticNextAt&&!t.staticActive&&(t.staticActive=!0,t.staticEndAt=o+60+Math.random()*40,t.staticNextAt=t.staticEndAt+6e3+Math.random()*4e3),t.staticActive&&(t.sweepTrailMesh.material.uniforms.uStaticAmt.value=.5+Math.random()*.5,o>=t.staticEndAt&&(t.staticActive=!1,t.sweepTrailMesh.material.uniforms.uStaticAmt.value=1)),t.sweepTrailMesh&&(t.sweepTrailMesh.material.uniforms.uAngle.value=t.sweepAngle),t.sweepArmLine){const{R:i}=t,s=t.sweepArmLine.geometry.attributes.position;s.setXYZ(0,0,0,0),s.setXYZ(1,Math.sin(t.sweepAngle)*i,Math.cos(t.sweepAngle)*i,0),s.needsUpdate=!0}}function un(t,e){const{contacts:a,sweepAngle:o}=t,i=t.now;a.forEach((s,n)=>{if(s){if(s.type!=="ghost"&&(s.wx+=s.wvx*e/1e3,s.wy+=s.wvy*e/1e3,Math.hypot(s.wx,s.wy)>1.02)){Kt(t,n);return}if(s.age+=e/s.maxAge,s.type!=="ghost"&&!t.reducedMotion){const r=(Math.atan2(s.wx,s.wy)%B+B)%B;Math.abs(ji(o,r))<.12&&i-s.lastSweep>800&&(s.angle=r,s.range=Math.hypot(s.wx,s.wy),s.phase=0,s.lastSweep=i,s.sweepAlpha=1,s.revealed||(s.revealed=!0,s.revealTime=i))}if(s.type!=="ghost"){if(s.phase<1){const r=s.age>.65&&s.age<.85;s.phase=Math.min(1,s.phase+Ha(t,s.type)*(r?.5:1)*e/1e3)}}else s.phase+=Ha(t,"neutral")*e/1e3;if(s.type!=="ghost"&&s.revealed){const r=.05+.1*s.range,c=i-s.lastSweep,u=Math.min(1,c/s.fadeTimeMs);s.sweepAlpha=r+(1-r)*Math.pow(1-u,1.025)}s.type!=="ghost"&&!s.ghostSpawned&&s.age>=.65&&s.revealed&&(s.ghostAngle=s.angle,s.ghostRange=s.range,s.ghostSpawned=!0,ca(t,s.ghostAngle,s.ghostRange,"ghost")),s.age>=1&&Kt(t,n)}})}function dn(t){const{contacts:e,dummy:a,contactDotsMesh:o,contactRingsMesh:i,R:s}=t;if(!o||!i)return;let n=!1;e.forEach((r,c)=>{if(!r)return;n=!0;let u;r.revealed?u=Math.min(1,(t.now-r.revealTime)/300)*8:u=0;const d=Math.sin(r.angle)*r.range*s,l=Math.cos(r.angle)*r.range*s;a.position.set(d,l,0),a.scale.setScalar(u),a.updateMatrix(),o.setMatrixAt(c,a.matrix),a.scale.setScalar(u>0?s*1.5:0),a.updateMatrix(),i.setMatrixAt(c,a.matrix);const h=Yi(r.type);o.geometry.attributes.a_type.setX(c,h),o.geometry.attributes.a_age.setX(c,r.age),o.geometry.attributes.a_phase.setX(c,r.phase),o.geometry.attributes.a_sweepFade.setX(c,r.sweepAlpha),i.geometry.attributes.a_type.setX(c,h),i.geometry.attributes.a_age.setX(c,r.age),i.geometry.attributes.a_phase.setX(c,r.phase),i.geometry.attributes.a_sweepFade.setX(c,r.sweepAlpha)}),n&&(o.instanceMatrix.needsUpdate=!0,i.instanceMatrix.needsUpdate=!0,o.geometry.attributes.a_type.needsUpdate=!0,o.geometry.attributes.a_age.needsUpdate=!0,o.geometry.attributes.a_phase.needsUpdate=!0,o.geometry.attributes.a_sweepFade.needsUpdate=!0,i.geometry.attributes.a_type.needsUpdate=!0,i.geometry.attributes.a_age.needsUpdate=!0,i.geometry.attributes.a_phase.needsUpdate=!0,i.geometry.attributes.a_sweepFade.needsUpdate=!0)}function hn(t){const{contacts:e,element:a,R:o}=t,i=a.clientWidth/2,s=a.clientHeight/2;e.forEach(n=>{if(!(n!=null&&n.labelEl))return;if(!n.revealed){n.labelEl.style.opacity="0";return}const r=i+Math.sin(n.angle)*n.range*o,c=s-Math.cos(n.angle)*n.range*o;n.labelEl.style.left=`${r+7}px`,n.labelEl.style.top=`${c-6}px`,n.labelEl.style.opacity=String(n.sweepAlpha)})}function fn(t){if(!t.footerEl)return;const e=t.contacts.filter(o=>o&&o.type!=="ghost").length,a=(B/t.sweepSpeed).toFixed(1);t.footerEl.textContent=`CONTACTS: ${e} | SWEEP: ${a}s`}function Zt(t,e){if(t.destroyed||!t.rafRunning){t.rafId=null;return}const a=Math.min(e-(t.lastTs??e),100);t.lastTs=e,t.now=e,t.R>0&&(t.backgroundMesh&&(t.backgroundMesh.material.uniforms.uTime.value=e/1e3),t.holoPass&&(t.holoPass.uniforms.time.value=e/1e3),cn(t,a),un(t,a),dn(t),hn(t),fn(t),t.composer.render()),t.rafId=requestAnimationFrame(o=>Zt(t,o))}function mn(t,e={}){if(xt.has(t)){console.warn("[pulse-radar] already initialised");const w=xt.get(t);return{setRadarThreatLevel:w.setRadarThreatLevel,injectContact:w.injectContact}}const a={sweepPeriod:2690,contactDensity:Math.max(0,Math.min(1,e.contactDensity??.5)),threatLevel:Math.max(0,Math.min(1,e.threatLevel??0)),primaryColor:e.primaryColor??null,maxContacts:Math.max(4,Math.min(me,e.maxContacts??16))},o=Ao(),i=document.createElement("canvas");i.className="s9-radar__canvas";const s=document.createElement("div");s.className="s9-radar__overlay";const n=document.createElement("div");n.className="s9-radar__labels",s.appendChild(n),t.appendChild(i),t.appendChild(s),t.style.cursor="pointer",t.addEventListener("click",()=>{Ki()});let r;try{r=new aa({canvas:i,antialias:!0,alpha:!1,premultipliedAlpha:!1})}catch(w){return console.error("[pulse-radar] WebGL context creation failed",w),i.remove(),s.remove(),{setRadarThreatLevel:()=>{},injectContact:()=>""}}r.setClearColor(new P(o.voidColor),1),r.setPixelRatio(Math.min(devicePixelRatio,2));const c=new oa,u=new Ka(-1,1,1,-1,.1,100);u.position.z=10;const d=new na(r);d.addPass(new ra(c,u));const l=new Ae(new N(t.clientWidth||200,t.clientHeight||200),.8,.65,.25);d.addPass(l);const h=new Se(Wi);d.addPass(h);const f={element:t,canvas:i,overlay:s,labelsDiv:n,renderer:r,scene:c,camera:u,opts:a,theme:o,R:0,sweepAngle:Math.random()*B,sweepSpeed:B/(a.sweepPeriod/1e3),ringPopDuration:a.sweepPeriod/1e3-.5,threatLevel:a.threatLevel,contacts:new Array(me).fill(null),dummy:new no,footerEl:document.getElementById("radar-contacts"),staticLabelEls:[],staticActive:!1,staticNextAt:null,staticEndAt:null,rafId:null,rafRunning:!1,destroyed:!1,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,centerGlowIntensity:0,centerGlowMesh:null,composer:d,bloomPass:l,holoPass:h,backgroundMesh:null,ringMeshes:null,ticksMesh:null,sweepTrailMesh:null,sweepArmLine:null,contactDotsMesh:null,contactRingsMesh:null,matRingInner:null,matRingOuter:null,matRingTicks:null,spawnTimer:null,lastTs:null,now:performance.now(),resizeObserver:null,intersectionObserver:null,_motionMq:null,_motionHandler:null,setRadarThreatLevel:null,injectContact:null};f.ringHzBase=1/f.ringPopDuration,xt.set(t,f);const g=t.closest(".s9-panel");g&&(g.classList.add("s9-panel--booting"),g.addEventListener("animationend",()=>g.classList.remove("s9-panel--booting"),{once:!0}));const m=new ResizeObserver(w=>{for(const b of w){const{width:p,height:x}=b.contentRect;if(p===0||x===0)return;const T=Math.floor(Math.min(p,x)/2)-8;if(T<=0)return;f.R=T,u.left=-T,u.right=T,u.top=T,u.bottom=-T,u.updateProjectionMatrix(),r.setSize(p,x),f.composer.setSize(p,x),f.bloomPass&&f.bloomPass.resolution.set(p,x),nn(f)}});m.observe(t),f.resizeObserver=m;const S=new IntersectionObserver(w=>{w.forEach(b=>{f.rafRunning=b.isIntersecting,f.rafRunning&&!f.rafId&&(f.rafId=requestAnimationFrame(p=>Zt(f,p)))})},{threshold:0});S.observe(t),f.intersectionObserver=S;const _=matchMedia("(prefers-reduced-motion: reduce)"),E=()=>{f.reducedMotion=_.matches,f.reducedMotion?(f.sweepAngle=Math.PI*.15,clearTimeout(f.spawnTimer)):Et(f)};_.addEventListener("change",E),f._motionMq=_,f._motionHandler=E,f.rafRunning=!0,f.rafId=requestAnimationFrame(w=>Zt(f,w)),f.reducedMotion||Et(f);function v(w){const b=Math.max(0,Math.min(1,w));f.threatLevel=b,clearTimeout(f.spawnTimer),Et(f)}function y(w,b,p){const x=["friendly","neutral","hostile"].includes(p)?p:"neutral",T=ca(f,w,Math.max(0,Math.min(1,b)),x);return T?T.id:""}return f.setRadarThreatLevel=v,f.injectContact=y,{setRadarThreatLevel:v,injectContact:y}}function pn(t){const e=xt.get(t);if(!e)return;const a=Ao();e.theme=a;const o=Te(a.neonGreen),i=Te(a.neonWarn),s=Te(a.neonAlert),n=Te(a.neonCyan),r=new P(a.neonCyan);if(e.backgroundMesh){const c=new P(a.voidColor);e.backgroundMesh.material.uniforms.uVoidColor.value.set(c.r,c.g,c.b),e.renderer.setClearColor(new P(a.voidColor),1)}if(e.matRingInner&&e.matRingInner.color.set(a.neonCyan),e.matRingOuter&&e.matRingOuter.color.set(a.neonCyan),e.matRingTicks&&e.matRingTicks.color.set(a.neonCyan),e.sweepTrailMesh&&e.sweepTrailMesh.material.uniforms.uColor.value.set(r.r,r.g,r.b),e.sweepArmLine&&e.sweepArmLine.material.color.set(a.neonCyan),e.contactDotsMesh){const c=e.contactDotsMesh.material.uniforms;c.uC0.value.set(...o),c.uC1.value.set(...i),c.uC2.value.set(...s),c.uC3.value.set(...n)}if(e.contactRingsMesh){const c=e.contactRingsMesh.material.uniforms;c.uC0.value.set(...o),c.uC1.value.set(...i),c.uC2.value.set(...s)}}const gn=`
  attribute vec2 a_pos;
  varying vec2 vUv;
  void main() {
    vUv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }`,vn=`
  precision mediump float;
  uniform sampler2D tDiffuse;
  uniform sampler2D tScratches;
  uniform vec2  iResolution;
  uniform float uTime;
  uniform vec2  uImgOffset;
  uniform vec2  uImgScale;
  varying vec2  vUv;

  const float hardPix    = -1.2;
  const vec2  warp       = vec2(1.0/96.0, 1.0/72.0);
  const float maskDark   = 0.5;
  const float maskLight  = 1.5;
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
    highp float mag  = 0.0007 * dot(dir, dir); // quadratic: zero at centre, grows to corners
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
    float wb = Gaus(dst - 1.0, hardPix);
    float wc = Gaus(dst + 0.0, hardPix);
    float wd = Gaus(dst + 1.0, hardPix);
    return (b*wb + c*wc + d*wd) / (wb + wc + wd);
  }

  vec3 Horz5(vec2 pos, float off) {
    vec3 a = FetchConv(pos, vec2(-2.0, off));
    vec3 b = FetchConv(pos, vec2(-1.0, off));
    vec3 c = FetchConv(pos, vec2( 0.0, off));
    vec3 d = FetchConv(pos, vec2( 1.0, off));
    vec3 e = FetchConv(pos, vec2( 2.0, off));
    float dst = Dist(pos).x;
    float wa = Gaus(dst - 2.0, hardPix);
    float wb = Gaus(dst - 1.0, hardPix);
    float wc = Gaus(dst + 0.0, hardPix);
    float wd = Gaus(dst + 1.0, hardPix);
    float we = Gaus(dst + 2.0, hardPix);
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
    pos *= vec2(1.0 + pos.y * pos.y * warp.x, 1.0 + pos.x * pos.x * warp.y);
    return pos * 0.5 + 0.5;
  }

  // Aperture grille: tight vertical R/G/B stripe triads (Trinitron-style).
  vec3 Mask(vec2 pos) {
    float stripe = fract(pos.x / 3.0) * 3.0;
    vec3 mask = vec3(maskDark);
    if      (stripe < 1.0) mask.r = maskLight;
    else if (stripe < 2.0) mask.g = maskLight;
    else                    mask.b = maskLight;
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

  void main() {
    vec2 pos = Warp(vUv);

    // 1. Scanline rendering with dynamic beam width
    vec3 col = Tri(pos);

    // 2. Phosphor mask (screen-layer effect)
    col *= Mask(gl_FragCoord.xy);

    // 3. Halation (glass-layer backscatter — above mask, not stripe-modulated)
    vec3 halo     = Horz5(pos, 0.0) * Gaus(Dist(pos).y, -2.5);
    vec3 halation = max(vec3(0.0), halo - 0.35) * vec3(0.18, 0.12, 0.08);
    col += halation;

    // 4. Film grain
    float grain = (hash(gl_FragCoord.xy + fract(uTime * 73.0)) * 2.0 - 1.0) * 0.04;
    col += grain;

    // 5. Corner masking (bezel/overscan fade)
    col *= cornerMask(pos);

    // 6. CRT gamma encode
    col = ToCrtGamma(col);

    // 7. Physical scratches overlay — sampled in raw display UV (glass surface,
    //    not phosphor layer) so scratches don't distort with the CRT warp.
    col *= texture2D(tScratches, vUv).rgb;

    gl_FragColor = vec4(col, 1.0);
  }`;function za(t,e,a){const o=t.createShader(e);return t.shaderSource(o,a),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)||console.error("Telescreen shader error:",t.getShaderInfoLog(o)),o}function yn(t,e,a){const o=e.getContext("webgl");if(!o)return console.warn("Telescreen: WebGL not available"),{destroy(){}};const i=a.getContext("2d"),s={prog:null,buf:null,tex:null,scratchTex:null,aPos:-1,uLocs:{}};function n(){const y=o.createProgram();o.attachShader(y,za(o,o.VERTEX_SHADER,gn)),o.attachShader(y,za(o,o.FRAGMENT_SHADER,vn)),o.linkProgram(y),o.useProgram(y);const w=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,w),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),o.STATIC_DRAW);const b=o.getAttribLocation(y,"a_pos");o.enableVertexAttribArray(b),o.vertexAttribPointer(b,2,o.FLOAT,!1,0,0);const p={res:o.getUniformLocation(y,"iResolution"),time:o.getUniformLocation(y,"uTime"),imgOffset:o.getUniformLocation(y,"uImgOffset"),imgScale:o.getUniformLocation(y,"uImgScale"),diffuse:o.getUniformLocation(y,"tDiffuse"),scratches:o.getUniformLocation(y,"tScratches")},x=o.createTexture();o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,x),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.uniform1i(p.diffuse,0);const T=o.createTexture();o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,T),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.REPEAT),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.REPEAT),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR_MIPMAP_LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texImage2D(o.TEXTURE_2D,0,o.RGB,1,1,0,o.RGB,o.UNSIGNED_BYTE,new Uint8Array([255,255,255])),o.uniform1i(p.scratches,1),Object.assign(s,{prog:y,buf:w,tex:x,scratchTex:T,aPos:b,uLocs:p})}n();let r=!1,c=null,u=!1,d=0;function l(){o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,s.tex),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,t),r=!0}function h(y){o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,s.scratchTex),o.texImage2D(o.TEXTURE_2D,0,o.RGB,o.RGB,o.UNSIGNED_BYTE,y),o.generateMipmap(o.TEXTURE_2D)}const f=new Image;f.src=new URL("/assets/scratches-CuKAcXgp.jpg",import.meta.url).href,f.addEventListener("load",()=>{u||h(f)});function g(y,w,b,p){const x=Math.max(y/b,w/p)*.8,T=b*x,R=p*x;return{ox:(y-T)/2/y,oy:(w-R)/2/w,sx:T/y,sy:R/w}}function m(){const y=e.clientWidth||576,w=e.clientHeight||432;e.width=y,e.height=w,a.width=y,a.height=w,u||o.viewport(0,0,y,w)}function S(){if(!t.naturalWidth)return;const y=a.width,w=a.height,b=t.naturalWidth,p=t.naturalHeight,x=Math.max(y/b,w/p)*.8,T=b*x,R=p*x;i.clearRect(0,0,y,w),i.drawImage(t,(y-T)/2,(w-R)/2,T,R)}e.addEventListener("webglcontextlost",y=>{y.preventDefault(),u=!0}),e.addEventListener("webglcontextrestored",()=>{u=!1,r=!1,n(),m(),l(),f.complete&&f.naturalWidth&&h(f)});function _(y){d=requestAnimationFrame(_),c||(c=y);const w=(y-c)/1e3;if(r&&!u){const b=e.width,p=e.height,x=t.naturalWidth,T=t.naturalHeight,R=p/1,re=b/p*R;o.uniform2f(s.uLocs.res,re,R),o.uniform1f(s.uLocs.time,w);const Z=g(b,p,x,T);o.uniform2f(s.uLocs.imgOffset,Z.ox,Z.oy),o.uniform2f(s.uLocs.imgScale,Z.sx,Z.sy),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,s.tex),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,s.scratchTex),o.drawArrays(o.TRIANGLE_STRIP,0,4),S()}}function E(){m(),l(),S(),d=requestAnimationFrame(_)}t.complete&&t.naturalWidth?E():t.addEventListener("load",E);const v=new ResizeObserver(()=>{m(),S()});return v.observe(e),{destroy(){cancelAnimationFrame(d),v.disconnect()}}}const Wa=[{cls:"sigint",headline:"SIGNAL INTERCEPT: FREQ 12.4GHz",detail:"Encrypted burst tx — POSEIDON signature"},{cls:"humint",headline:"ASSET CONFIRM: NIIHAMA-04",detail:"Target movement: port district, 0300 local"},{cls:"cyber",headline:"ZERO-DAY: CVE-2026-3917",detail:"Legacy auth stack — remote exec payload ready"},{cls:"ghost",headline:"DIVE ANOMALY: SECTOR ALPHA",detail:"Ghost-barrier interference at 4.1m depth"},{cls:"elint",headline:"DRONE SWEEP: SECTOR 12",detail:"Coverage 73% — ETA 4 minutes to full map"},{cls:"sigint",headline:"PACKET STORM: 192.168.7.0/24",detail:"18k pps sustained — possible DDoS staging"},{cls:"cyber",headline:"EXFIL CHANNEL COMPROMISED",detail:"Fallback route DELTA-9 now primary exfil"},{cls:"humint",headline:"CONTACT LOST: ROMEO-7",detail:"Last check-in 03:14:22 UTC — status unknown"},{cls:"ghost",headline:"TACHIKOMA: AUTONOMOUS SWEEP",detail:"Unit 9 executing sector 7 independently"},{cls:"elint",headline:"EM PULSE DETECTED: ZONE 3",detail:"Localized disruption — comm nodes offline"},{cls:"sigint",headline:"NODE COMMS SPIKE: BEIJING",detail:"340% increase in encrypted P2P — 0300-0500"},{cls:"cyber",headline:"FIREWALL PROBE: AS12345",detail:"Systematic port sweep — countermeasures deployed"},{cls:"humint",headline:"BROKER IDENTIFIED: LAUGHING MAN",detail:"Dark web auction — biotech data linked to incident"},{cls:"ghost",headline:"GHOST PROTOCOL: BETA-3",detail:"Shell confirmed on target system — extract ready"},{cls:"elint",headline:"SAT PASS: KH-17 WINDOW",detail:"6 min coverage — imaging tasked to sector 4"}];function bn(t){const e=document.createElement("div");return e.className=`sigint-item sigint-item--${t.cls}`,e.innerHTML=`
    <div class="sigint-item__class">${t.cls.toUpperCase()}</div>
    <div class="sigint-item__headline">${t.headline}</div>
    <div class="sigint-item__detail">${t.detail}</div>
  `,e}function _n(t){if(!t)return;const e=4,a=[];function o(){const i=new Set(a.map(d=>{var l;return(l=d.querySelector(".sigint-item__headline"))==null?void 0:l.textContent})),s=Wa.filter(d=>!i.has(d.headline)),n=s.length>0?s:Wa,r=n[Math.floor(Math.random()*n.length)],c=bn(r);t.insertBefore(c,t.firstChild),a.unshift(c),requestAnimationFrame(()=>c.classList.add("sigint-item--visible"));const u=8e3+Math.random()*12e3;for(setTimeout(()=>{c.classList.add("sigint-item--closing"),c.classList.remove("sigint-item--visible"),setTimeout(()=>{c.remove();const d=a.indexOf(c);d>=0&&a.splice(d,1)},500)},u);a.length>e;){const d=a.pop();d.classList.add("sigint-item--closing"),d.classList.remove("sigint-item--visible"),setTimeout(()=>d.remove(),500)}setTimeout(o,3e3+Math.random()*6e3)}setTimeout(o,800),setTimeout(o,2200)}const $a=[{cls:"STRATEGIC",headline:"BIOMECH TREATY VOTE: 72HRS",detail:"Section 9 on standby for security detail"},{cls:"TACTICAL",headline:"LAUGHING MAN: ACTIVE",detail:"New sightings logged in Niihama and Togusa ward"},{cls:"ASSET",headline:"BATOU: FIELD POSITION UPDATE",detail:"Grid 7-Delta — visual on primary target"},{cls:"THREAT",headline:"PUPPET MASTER PROTOCOL",detail:"AI ghost-dive signatures — 3 confirmed nodes"},{cls:"STRATEGIC",headline:"ARAMAKI: SITUATION ROOM",detail:"Director briefing at 0600 UTC — attendance req"},{cls:"TACTICAL",headline:"TOGUSA: DEEP COVER",detail:"Identity: Muto Ryo — corporate embedded"},{cls:"THREAT",headline:"ROGUE TACHIKOMA UNIT",detail:"Unit 14 unresponsive — last GPS: Sector 9-Bravo"},{cls:"ASSET",headline:"ISHIKAWA: CYBER BREACH",detail:"Target mainframe penetrated — exfil in 180s"},{cls:"STRATEGIC",headline:"COMA CHIP EXPLOIT: CONFIRMED",detail:"Hardware vulnerability — 40k units affected"},{cls:"TACTICAL",headline:"HELICOPTER SUPPORT: STANDING BY",detail:"AH-6J on tarmac — ETA to sector: 4 min"}];function wn(t){const e=document.createElement("div");return e.className="intel-item",e.innerHTML=`
    <div class="intel-item__class">${t.cls}</div>
    <div class="intel-item__headline">${t.headline}</div>
    <div class="intel-item__detail">${t.detail}</div>
  `,e}function Sn(t){if(!t)return;const e=5,a=[];function o(){const i=new Set(a.map(d=>{var l;return(l=d.querySelector(".intel-item__headline"))==null?void 0:l.textContent})),s=$a.filter(d=>!i.has(d.headline)),n=s.length>0?s:$a,r=n[Math.floor(Math.random()*n.length)],c=wn(r);t.insertBefore(c,t.firstChild),a.unshift(c),requestAnimationFrame(()=>c.classList.add("intel-item--visible"));const u=1e4+Math.random()*15e3;for(setTimeout(()=>{c.classList.add("intel-item--closing"),c.classList.remove("intel-item--visible"),setTimeout(()=>{c.remove();const d=a.indexOf(c);d>=0&&a.splice(d,1)},500)},u);a.length>e;){const d=a.pop();d.classList.add("intel-item--closing"),d.classList.remove("intel-item--visible"),setTimeout(()=>d.remove(),500)}setTimeout(o,4e3+Math.random()*8e3)}setTimeout(o,1200),setTimeout(o,3500),setTimeout(o,5800)}function Y(t,e){return Math.floor(Math.random()*(e-t+1))+t}const fe=()=>`${Y(10,220)}.${Y(0,255)}.${Y(0,255)}.${Y(1,254)}`,Wt=()=>[22,80,443,8443,4444,3389,21,1337,9999][Math.floor(Math.random()*9)],xn=()=>`${Y(64,65535)}B`,En=()=>Array.from({length:4},()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0")).join(" "),Va=[()=>({source:"AUTH",message:`HANDSHAKE COMPLETE — ${fe()}:${Wt()}`,alert:!1}),()=>({source:"NET",message:`PKT ${xn()} ${fe()} → ${fe()}`,alert:!1}),()=>({source:"GHOST",message:`DIVE DEPTH: ${(2+Math.random()*3).toFixed(1)}m — STABLE`,alert:!1}),()=>({source:"CRYPT",message:"AES-256 SESSION KEY ESTABLISHED",alert:!1}),()=>({source:"SCAN",message:`PROBE: ${fe()}:${Wt()} — ${En()}`,alert:!0}),()=>({source:"SYS",message:`MEM ${Y(60,92)}% CPU ${Y(20,80)}% THERMAL OK`,alert:!1}),()=>({source:"NET",message:`LATENCY ${Y(4,45)}ms — ${Math.random()<.8?"NOMINAL":"DEGRADED"}`,alert:Math.random()<.2}),()=>({source:"AUTH",message:`TOKEN REFRESH: UID-${Y(1e3,9999)}`,alert:!1}),()=>({source:"CRIT",message:`INTRUSION SIG: ${fe()} PORT ${Wt()}`,alert:!0}),()=>({source:"SYS",message:`COUNTERMEASURE DEPLOYED — BLOCK RULE ${Y(100,999)}`,alert:!1}),()=>({source:"NET",message:`ROUTE CHANGE: AS${Y(1e3,65e3)} VIA ${fe()}`,alert:!1}),()=>({source:"CRYPT",message:`TLS 1.3 HANDSHAKE: ${fe()} — ${Y(0,1)?"ECDH":"RSA"}-4096`,alert:!1}),()=>({source:"SCAN",message:`ANOMALY: BURST ${Y(800,9999)} PPS FROM ${fe()}`,alert:!0}),()=>({source:"GHOST",message:`GHOST COEFFICIENT: ${(92+Math.random()*8).toFixed(1)}%`,alert:!1}),()=>({source:"AUTH",message:`CERT CHAIN VALID — SHA-${Y(0,1)?"256":"512"}`,alert:!1}),()=>({source:"NET",message:`DNS RESOLVE: ${["niihama.net","togusa.local","sec9.gov","puppet.io"][Math.floor(Math.random()*4)]}`,alert:!1}),()=>({source:"SYS",message:`FIREWALL RULE ${Y(1e3,9999)}: DROP ${fe()}/${Y(24,32)}`,alert:!1}),()=>({source:"CRIT",message:`ZERO-DAY ATTEMPT: ${fe()} — MITIGATED`,alert:!0})];function Tn(t,e){function a(){const o=Va[Math.floor(Math.random()*Va.length)];e(t,{timestamp:new Date().toISOString(),...o()})}for(let o=0;o<8;o++)a();setInterval(a,Y(1200,2800))}function Ee(t,e){return Math.floor(Math.random()*(e-t+1))+t}const Me=[{id:"n-tokyo",lat:35.68,lng:139.69,label:"TOKYO"},{id:"n-moscow",lat:55.75,lng:37.62,label:"MOSCOW"},{id:"n-beijing",lat:39.91,lng:116.39,label:"BEIJING"},{id:"n-london",lat:51.51,lng:-.13,label:"LONDON"},{id:"n-nyc",lat:40.71,lng:-74,label:"NEW YORK"},{id:"n-sydney",lat:-33.87,lng:151.21,label:"SYDNEY"},{id:"n-dubai",lat:25.2,lng:55.27,label:"DUBAI"},{id:"n-saopaulo",lat:-23.55,lng:-46.63,label:"SÃO PAULO"},{id:"n-paris",lat:48.86,lng:2.35,label:"PARIS"},{id:"n-seoul",lat:37.57,lng:126.98,label:"SEOUL"},{id:"n-cairo",lat:30.05,lng:31.24,label:"CAIRO"},{id:"n-berlin",lat:52.52,lng:13.41,label:"BERLIN"},{id:"n-mumbai",lat:19.08,lng:72.88,label:"MUMBAI"},{id:"n-toronto",lat:43.65,lng:-79.38,label:"TORONTO"},{id:"n-singapore",lat:1.35,lng:103.82,label:"SINGAPORE"},{id:"n-nairobi",lat:-1.29,lng:36.82,label:"NAIROBI"},{id:"n-istanbul",lat:41.01,lng:28.97,label:"ISTANBUL"},{id:"n-lagos",lat:6.52,lng:3.38,label:"LAGOS"}],Mn={"n-tokyo":{country:"JAPAN",pop:"13.96M",status:"FINANCIAL HUB"},"n-moscow":{country:"RUSSIA",pop:"12.51M",status:"RESTRICTED"},"n-beijing":{country:"CHINA",pop:"21.54M",status:"RESTRICTED"},"n-london":{country:"UK",pop:"8.98M",status:"ALLIED NODE"},"n-nyc":{country:"USA",pop:"8.34M",status:"ALLIED NODE"},"n-sydney":{country:"AUSTRALIA",pop:"5.31M",status:"ALLIED NODE"},"n-dubai":{country:"UAE",pop:"3.33M",status:"NEUTRAL ZONE"},"n-saopaulo":{country:"BRAZIL",pop:"12.33M",status:"MONITORED"},"n-paris":{country:"FRANCE",pop:"2.15M",status:"ALLIED NODE"},"n-seoul":{country:"S.KOREA",pop:"9.78M",status:"ALLIED NODE"},"n-cairo":{country:"EGYPT",pop:"10.08M",status:"MONITORED"},"n-berlin":{country:"GERMANY",pop:"3.66M",status:"ALLIED NODE"},"n-mumbai":{country:"INDIA",pop:"20.67M",status:"MONITORED"},"n-toronto":{country:"CANADA",pop:"2.93M",status:"ALLIED NODE"},"n-singapore":{country:"SINGAPORE",pop:"5.45M",status:"NEUTRAL ZONE"},"n-nairobi":{country:"KENYA",pop:"4.40M",status:"MONITORED"},"n-istanbul":{country:"TURKEY",pop:"15.46M",status:"NEUTRAL ZONE"},"n-lagos":{country:"NIGERIA",pop:"14.86M",status:"MONITORED"}},Tt=Me.slice(0,8),Co=[15,72,55,18,28,10,45,33];function An(t){let e=t.split("").reduce((c,u)=>c*31+u.charCodeAt(0)>>>0,7);const a=()=>(e=e*1664525+1013904223>>>0,(e>>>16)/65535),o=9,i=140,s=34,n=i/o;let r=`<svg viewBox="0 0 ${i} ${s}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;height:34px;">`;r+='<g fill="currentColor">';for(let c=0;c<o;c++){const u=8+a()*24,d=n*(.48+a()*.44),l=c*n+(n-d)*.5;r+=`<rect x="${l.toFixed(1)}" y="${(s-u).toFixed(1)}" width="${d.toFixed(1)}" height="${u.toFixed(1)}"/>`}return r+="</g></svg>",r}function Cn(t,e,a,o){const{addNode:i,removeNode:s,updateNodeLevel:n,setThreatLevel:r,setActiveNode:c,focusNode:u,pulseGlobeNode:d,spawnArc:l,appendRow:h,printLine:f,setRadarThreatLevel:g}=o,m=new Map;function S(v,y){t.dispatchEvent(new CustomEvent("s9:alert",{bubbles:!0,detail:{level:y>=70?"critical":"warning",source:v}}))}function _(v,y){i(t,{...v,level:y}),m.set(v.id,y),h(e,{timestamp:new Date().toISOString(),source:"NET",message:`NODE ONLINE: ${v.label} — LVL ${y}`,alert:y>=70}),y>=70&&(S(v.label,y),c(t,v.id),u(t,v.id))}Tt.forEach((v,y)=>{setTimeout(()=>{_(v,Co[y]),y===Tt.length-1&&setTimeout(()=>{r(t,55),g(.55)},800)},y*300+500)});function E(){const v=[...m.keys()],y=Me.filter(b=>!m.has(b.id)),w=Math.random();if(w<.28&&y.length>0){const b=y[Ee(0,y.length-1)],p=Ee(5,65);_(b,p),f(a,`SIGNAL ACQUIRED: ${b.label}`,"sys")}else if(w<.42&&v.length>5){const b=v[Ee(0,v.length-1)],p=Me.find(x=>x.id===b);s(t,b),m.delete(b),f(a,`SIGNAL LOST: ${(p==null?void 0:p.label)??b}`,"info"),h(e,{timestamp:new Date().toISOString(),source:"NET",message:`NODE OFFLINE: ${(p==null?void 0:p.label)??b}`,alert:!1})}else if(w<.72&&v.length>0){const b=v[Ee(0,v.length-1)],p=Me.find(z=>z.id===b),x=m.get(b)??0,T=Ee(8,28),R=Math.min(100,x+T);n(t,b,R),m.set(b,R),r(t,Math.max(...m.values())),g(Math.max(...m.values())/100),f(a,`THREAT ESCALATION: ${(p==null?void 0:p.label)??b} ${x}→${R}`,R>=70?"err":"sys"),h(e,{timestamp:new Date().toISOString(),source:"CRIT",message:`THREAT UP: ${(p==null?void 0:p.label)??b} LVL=${R}`,alert:R>=70}),R>=70&&x<70&&(S((p==null?void 0:p.label)??b,R),c(t,b),u(t,b));const re=x>=70?2:x>=40?1:0,Z=R>=70?2:R>=40?1:0;re!==Z&&d(t,b)}else if(v.length>0){const b=v[Ee(0,v.length-1)],p=Me.find(Z=>Z.id===b),x=m.get(b)??50,T=Math.max(0,x-Ee(5,18));n(t,b,T),m.set(b,T),r(t,Math.max(0,...m.values())),g(Math.max(0,...m.values())/100),f(a,`THREAT REDUCED: ${(p==null?void 0:p.label)??b} LVL=${T}`,"info");const R=x>=70?2:x>=40?1:0,re=T>=70?2:T>=40?1:0;R!==re&&d(t,b)}if(v.length>=2){const b=1+Math.floor(Math.random()*3);for(let p=0;p<b;p++){const x=v[Math.floor(Math.random()*v.length)];let T=v[Math.floor(Math.random()*v.length)];T===x&&(T=v[(v.indexOf(x)+1)%v.length]),T!==x&&l(t,x,T)}}setTimeout(E,Ee(4e3,9e3))}return setTimeout(E,Tt.length*300+2500),setInterval(()=>{const v=[...m.keys()];if(v.length<2)return;const y=Math.random()<.4?2:1;for(let w=0;w<y;w++){const b=v[Math.floor(Math.random()*v.length)];let p=v[Math.floor(Math.random()*v.length)];p===b&&(p=v[(v.indexOf(b)+1)%v.length]),p!==b&&l(t,b,p)}},1200),setInterval(()=>{const v=[...m.entries()].filter(([,x])=>x>=70);if(v.length===0)return;const y=t.getAttribute("data-active-node"),w=v.filter(([x])=>x!==y),b=w.length>0?w:v,[p]=b[Math.floor(Math.random()*b.length)];c(t,p),u(t,p)},8e3),{globeNodes:m}}function Dn(t,e,a,o,i){const{initThreatMap:s,addNode:n,removeNode:r,updateNodeLevel:c,setThreatLevel:u,setActiveNode:d,focusNode:l}=i;s(t,{autoRotate:!0,bloomStrength:.7});const h=new Map;e.forEach((p,x)=>{setTimeout(()=>{n(t,{...p,level:a[x]}),h.set(p.id,a[x])},x*200+300)}),setTimeout(()=>u(t,55),e.length*200+800);const f=document.getElementById("tact-node-info"),g=document.getElementById("tact-btn-add"),m=document.getElementById("tact-btn-remove"),S=document.getElementById("tact-btn-focus"),_=document.getElementById("tact-btn-deselect"),E=document.getElementById("tact-level-slider"),v=document.getElementById("tact-level-val"),y=document.getElementById("tact-level-row");let w=null;function b(){const p=w!==null&&h.has(w);if(m.disabled=!p,S.disabled=!p,_.disabled=!p,E.disabled=!p,y.style.opacity=p?"1":"0.4",y.style.pointerEvents=p?"auto":"none",p){const x=o.find(R=>R.id===w),T=h.get(w);f.textContent=`${(x==null?void 0:x.label)??w} — LVL ${T}`,E.value=T,v.textContent=T}else f.textContent="NO NODE SELECTED"}t.addEventListener("s9:threatmap-node-select",p=>{w=p.detail.nodeId,document.getElementById("tactical-threat").textContent=`THREAT: ${p.detail.level} — ${p.detail.label}`,b()}),t.addEventListener("s9:threatmap-node-deselect",()=>{w=null,b()}),g.addEventListener("click",()=>{const p=o.filter(R=>!h.has(R.id));if(p.length===0)return;const x=p[Math.floor(Math.random()*p.length)],T=Math.floor(Math.random()*60)+10;n(t,{...x,level:T}),h.set(x.id,T),u(t,Math.max(...h.values())),d(t,x.id),l(t,x.id)}),m.addEventListener("click",()=>{w&&(r(t,w),h.delete(w),u(t,h.size>0?Math.max(...h.values()):0),w=null,b())}),S.addEventListener("click",()=>{w&&l(t,w)}),_.addEventListener("click",()=>{d(t,null),w=null,b()}),E.addEventListener("input",()=>{if(!w)return;const p=parseInt(E.value);v.textContent=p,c(t,w,p),h.set(w,p),u(t,Math.max(...h.values()));const x=o.find(T=>T.id===w);f.textContent=`${(x==null?void 0:x.label)??w} — LVL ${p}`}),b()}const mt=[{id:"sec9",label:"SEC.9 HQ",x:50,y:50,root:!0},{id:"niihama",label:"NIIHAMA",x:22,y:22},{id:"togusa",label:"TOGUSA",x:78,y:22},{id:"batou",label:"BATOU",x:78,y:78},{id:"ishikawa",label:"ISHIKAWA",x:22,y:78},{id:"relay1",label:"RELAY ALPHA",x:36,y:32},{id:"relay2",label:"RELAY BETA",x:64,y:32},{id:"relay3",label:"RELAY GAMMA",x:36,y:68},{id:"relay4",label:"RELAY DELTA",x:64,y:68},{id:"ext1",label:"PUPPET MASTER",x:12,y:50},{id:"ext2",label:"LAUGHING MAN",x:88,y:50},{id:"tachi",label:"TACHIKOMA U9",x:50,y:12}],ja=[{id:"e01",from:"sec9",to:"relay1"},{id:"e02",from:"sec9",to:"relay2"},{id:"e03",from:"sec9",to:"relay3"},{id:"e04",from:"sec9",to:"relay4"},{id:"e05",from:"relay1",to:"niihama"},{id:"e06",from:"relay2",to:"togusa"},{id:"e07",from:"relay3",to:"ishikawa"},{id:"e08",from:"relay4",to:"batou"},{id:"e09",from:"niihama",to:"ext1"},{id:"e10",from:"ext1",to:"relay3"},{id:"e11",from:"togusa",to:"relay1"},{id:"e12",from:"batou",to:"relay2"},{id:"e13",from:"ext2",to:"relay2"},{id:"e14",from:"ext2",to:"relay4"},{id:"e15",from:"sec9",to:"tachi"},{id:"e16",from:"relay1",to:"relay2"},{id:"e17",from:"relay3",to:"relay4"}],$t={relay2:72,relay4:88,ext1:95,ext2:80,niihama:45,batou:55};function Ln(t,e){if(!t)return;const{initMatrix:a,activateEdge:o,deactivateEdge:i,pulseNode:s,setActiveNode:n}=e;a(t,{nodes:mt,edges:ja});for(const[l,h]of Object.entries($t)){const f=t.querySelector(`[data-node-id="${l}"]`);f&&(h>=70?f.classList.add("s9-matrix__node--threat-high"):h>=40&&f.classList.add("s9-matrix__node--threat-mid"))}n(t,"ext1");const r=ja.map(l=>l.id),c=new Set,u=[null,null,"var(--neon-warn)","var(--neon-alert)","var(--neon-green)",null];function d(){if(c.size>0){const g=[...c],m=g[Math.floor(Math.random()*g.length)];i(t,m),c.delete(m)}const l=r.filter(g=>!c.has(g)),h=Math.random()<.4?2:1;for(let g=0;g<h&&l.length>0;g++){const m=l.splice(Math.floor(Math.random()*l.length),1)[0],S=u[Math.floor(Math.random()*u.length)];o(t,m,S),c.add(m)}if(Math.random()<.35){const g=mt[Math.floor(Math.random()*mt.length)];s(t,g.id)}const f=document.getElementById("flow-overlay");if(f){const g=Object.values($t).filter(_=>_>=70).length,m=Object.values($t).filter(_=>_>=40&&_<70).length,S=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";f.innerHTML=`<span style="font-family:var(--font-terminal);font-size: 0.7rem;color:${S};opacity:0.7">NODES: ${mt.length} &nbsp; <span style="color:var(--text-alert)">CRIT: ${g}</span> &nbsp; <span style="color:var(--neon-warn)">WARN: ${m}</span></span>`}}for(let l=0;l<4;l++){const h=r[Math.floor(Math.random()*r.length)];c.has(h)||(o(t,h),c.add(h))}setInterval(d,700),d(),document.getElementById("matrix-status").textContent="● LIVE"}const Mt={"":"MATRIX GREEN",gits:"GHOST IN THE SHELL",amber:"AMBER",phosphor:"PHOSPHOR",blood:"BLOOD"};function Qt(t){const e=document.documentElement;t===""||t==="matrixgreen"?delete e.dataset.theme:e.dataset.theme=t,document.querySelectorAll(".topbar__theme-btn").forEach(a=>{a.classList.toggle("topbar__theme-btn--active",(a.dataset.themeSet??"")===(t==="matrixgreen"?"":t))}),Ua(ae),Jt&&Ua(document.getElementById("threatmap-tactical")),pn(Fo)}function Do(){const t=new Date;document.getElementById("topbar-clock").textContent=`UTC ${t.toUTCString().split(" ")[4]}`}Do();setInterval(Do,1e3);document.querySelectorAll(".s9-panel").forEach(gi);document.querySelectorAll(".topbar__theme-btn").forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.themeSet??"";Qt(e),D(C,`THEME: ${Mt[e]??e.toUpperCase()}`,"sys")})});const Lo=document.querySelectorAll(".topbar__tab[data-tab]"),Rn=document.querySelectorAll(".center__view[data-view]");let qa=!1,Jt=!1;function Ya(t){Lo.forEach(e=>{const a=e.dataset.tab===t;e.classList.toggle("topbar__tab--active",a),e.setAttribute("aria-selected",a)}),Rn.forEach(e=>{e.classList.toggle("center__view--active",e.dataset.view===t)}),t==="network"&&!qa&&(qa=!0,Vn()),t==="tactical"&&!Jt&&(Jt=!0,$n()),D(C,`VIEW: ${t.toUpperCase()} ACTIVATED`,"sys")}Lo.forEach(t=>{t.addEventListener("click",()=>Ya(t.dataset.tab)),t.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),Ya(t.dataset.tab))})});const C=document.querySelector(".s9-terminal");as(C,{onSubmit(t){var i;const e=t.trim().split(/\s+/),a=e[0].toLowerCase(),o=e.slice(1);switch(a){case"help":D(C,"SECTION 9 COMMAND INTERFACE — AVAILABLE COMMANDS:","sys"),D(C,"  status              — system status report","info"),D(C,"  ghost               — ghost coefficient analysis","info"),D(C,"  nodes               — list active threat nodes","info"),D(C,"  threat <lvl>        — set global threat level 0-100","info"),D(C,"  threat <id> <lvl>   — set node threat level","info"),D(C,"  focus <id>          — focus camera on node","info"),D(C,"  theme <name>        — switch theme","info"),D(C,"  themes              — list available themes","info"),D(C,"  clear               — clear terminal","info");break;case"status":{const s=ne.size,n=[...ne.values()].filter(c=>c>=70).length,r=s>0?Math.max(...ne.values()):0;D(C,"── SYSTEM STATUS ──────────────────────────","sys"),D(C,`  CPU: ${te.cpu}%   MEM: ${te.mem}%   NET I/O: ${te.net}%`,"info"),D(C,`  GHOST LAYER: ${te.ghost}%   ENCRYPTION: ${te.enc}%`,"info"),D(C,`  NODES ON GRID: ${s}   CRITICAL: ${n}`,n>0?"err":"info"),D(C,`  PEAK THREAT: ${r}   GLOBAL LEVEL: ${r}`,r>=70?"err":"sys"),D(C,"  SECURE CHANNEL: ACTIVE   ENCRYPTION: AES-256","info");break}case"ghost":{const s=ua.toFixed(1);D(C,"── GHOST COEFFICIENT ANALYSIS ─────────────","sys"),D(C,`  COEFFICIENT: ${s}%   BARRIER: NOMINAL`,"info"),D(C,"  CYBER BRAIN: SECTION 9 CLEARANCE ALPHA-7","info"),D(C,"  DIVE DEPTH: STABLE 3.2m   TACHIKOMA LINK: ACTIVE","info"),D(C,"  IDENTITY: CONFIRMED — KUSANAGI.M",s>=95?"sys":"err");break}case"nodes":{if(ne.size===0){D(C,"NO NODES ON GRID","info");break}D(C,`ACTIVE NODES (${ne.size}):`,"sys");for(const[s,n]of ne){const r=Me.find(d=>d.id===s),c=(r==null?void 0:r.label)??s,u=n>=70?"err":n>=40?"sys":"info";D(C,`  ${s.padEnd(14)} ${c.padEnd(12)} LVL=${n}`,u)}break}case"threat":{if(o.length===0){D(C,`GLOBAL THREAT: ${Math.max(0,...ne.values())}`,"sys");break}if(o.length>=2&&isNaN(parseInt(o[0]))){const s=o[0],n=parseInt(o[1]);if(!ne.has(s)){D(C,`ERR: node '${s}' not found — use NODES to list`,"err");break}if(isNaN(n)||n<0||n>100){D(C,"ERR: level must be 0-100","err");break}const r=la(ae,s,n);ne.set(s,n),Dt(ae,Math.max(0,...ne.values())),ea.setRadarThreatLevel(Math.max(0,...ne.values())/100),D(C,`NODE ${s}: ${r} → ${n}`,n>=70?"err":"sys"),n>=70&&r<70&&(Pe(ae,s),Lt(ae,s))}else{const s=parseInt(o[0]);if(isNaN(s)||s<0||s>100){D(C,"ERR: level must be 0-100","err");break}Dt(ae,s),ea.setRadarThreatLevel(s/100),D(C,`GLOBAL THREAT LEVEL SET: ${s}`,"sys")}break}case"focus":{const s=o[0];if(!s){D(C,"ERR: focus requires a node id — use NODES to list","err");break}if(!ne.has(s)){D(C,`ERR: node '${s}' not found`,"err");break}Pe(ae,s),Lt(ae,s);const n=Me.find(r=>r.id===s);D(C,`CAMERA FOCUSED: ${(n==null?void 0:n.label)??s}`,"sys");break}case"theme":{const s=((i=o[0])==null?void 0:i.toLowerCase())??"";if(s===""||s==="matrixgreen"){Qt(""),D(C,"THEME: MATRIX GREEN","sys");break}if(!Object.keys(Mt).includes(s)){D(C,`ERR: unknown theme '${s}' — use THEMES to list`,"err");break}Qt(s),D(C,`THEME: ${Mt[s]}`,"sys");break}case"themes":D(C,"AVAILABLE THEMES:","sys");for(const[s,n]of Object.entries(Mt))D(C,`  ${(s||"matrixgreen").padEnd(14)} ${n}`,"info");break;case"clear":os(C),D(C,"TERMINAL CLEARED","sys");break;default:a&&D(C,`ERR: unknown command '${t}' — type HELP`,"err")}},tabComplete(t){return["help","status","ghost","nodes","threat","focus","theme","themes","clear"].find(a=>a.startsWith(t.toLowerCase()))??null}});D(C,"SECTION 9 OPERATIVE INTERFACE — TYPE HELP FOR COMMANDS","sys");D(C,"GHOST BABEL OPERATION: ACTIVE","info");function Vt(t,e,a){let o=0;function i(){if(o>=t.length)return;const{id:s,state:n}=t[o++],r=document.getElementById(s);r&&vi(r,n),setTimeout(i,o<t.length?e:e*2)}i()}_n(document.getElementById("sigint-feed"));Sn(document.getElementById("intel-feed"));setTimeout(()=>{Vt([{id:"seq-breach",state:"complete"},{id:"seq-extract",state:"active"}],3e3),setTimeout(()=>{Vt([{id:"seq-extract",state:"complete"},{id:"seq-cover",state:"active"}],3500),setTimeout(()=>{Vt([{id:"seq-cover",state:"complete"},{id:"seq-exfil",state:"active"}],3e3)},9e3)},8e3)},5e3);const Ot=document.querySelector(".s9-stream");ns(Ot);Tn(Ot,sa);yn(document.getElementById("ts-feed-src"),document.getElementById("ts-feed-canvas"),document.getElementById("ts-glow-canvas"));const te={cpu:42,mem:61,net:12,ghost:77,enc:96},Pn=document.getElementById("tele-cpu"),In=document.getElementById("tele-mem"),On=document.getElementById("tele-net"),Nn=document.getElementById("tele-enc");setInterval(()=>{for(const t of Object.keys(te))te[t]=Math.max(5,Math.min(100,te[t]+(Math.random()-.5)*6)),te[t]=Math.round(te[t]);nt(Pn,te.cpu),nt(In,te.mem),nt(On,te.net),nt(Nn,te.enc)},2e3);const Ro=document.getElementById("neural-01"),Po=document.getElementById("ghost-val"),Io=document.getElementById("cyber-index"),Oo=document.getElementById("neural-sync"),No=document.getElementById("ekg-bpm"),Uo=ls(document.getElementById("ekg-canvas"),document.getElementById("ekg-heart"));let ua=98.4;for(let t=0;t<3;t++)ua=uo(Ro,Po,Io,Oo,No,Uo);setInterval(()=>{ua=uo(Ro,Po,Io,Oo,No,Uo)},3e3);const ae=document.querySelector(".s9-threatmap");wo(ae,{autoRotate:!0,bloomStrength:.4});const Fo=document.getElementById("proximity-radar"),ea=mn(Fo,{threatLevel:0}),Un=getComputedStyle(document.documentElement).getPropertyValue("--neon-green").trim()||"#00ff70";Ni(document.getElementById("matrix-rain-host"),{color:Un,opacity:.45,syncCamera:ri(ae)});document.getElementById("sat-toggle").addEventListener("change",t=>{mi(ae,t.target.checked)});const{globeNodes:ne}=Cn(ae,Ot,C,{addNode:xo,removeNode:Eo,updateNodeLevel:la,setThreatLevel:Dt,setActiveNode:Pe,focusNode:Lt,pulseGlobeNode:ci,spawnArc:ui,appendRow:sa,printLine:D,setRadarThreatLevel:t=>ea.setRadarThreatLevel(t)}),Fn=document.getElementById("alert-host");document.addEventListener("s9:alert",t=>{var e;if(((e=t.detail)==null?void 0:e.level)==="critical"){const a=t.detail.source??"UNKNOWN";D(C,`⚠ CRITICAL ALERT: ${a}`,"err"),us(Fn,{level:"critical",code:"CRITICAL THREAT",message:a})}});const Je=document.getElementById("node-popup"),kn=document.getElementById("np-city"),Bn=document.getElementById("np-skyline"),Gn=document.getElementById("np-country"),Hn=document.getElementById("np-pop"),zn=document.getElementById("np-coords"),Xa=document.getElementById("np-threat"),Wn=document.getElementById("np-status");ae.addEventListener("s9:threatmap-node-select",t=>{const{nodeId:e,label:a,level:o,lat:i,lng:s}=t.detail;D(C,`NODE SELECT: ${a} — LEVEL ${o} — ${i.toFixed(2)}°, ${s.toFixed(2)}°`,o>=71?"err":o>=41?"warn":"info"),sa(Ot,{timestamp:new Date().toISOString(),source:"TGT",message:`TARGET LOCKED: ${a} THREAT=${o}`,alert:o>=41});const n=Mn[e]??{country:"—",pop:"—",status:"UNKNOWN"};kn.textContent=a,Bn.innerHTML=An(e),Gn.textContent=n.country,Hn.textContent=n.pop,zn.textContent=`${i.toFixed(2)}°, ${s.toFixed(2)}°`;const r=o>=70?"CRITICAL":o>=40?"ELEVATED":"LOW";Xa.textContent=`${o} — ${r}`,Xa.style.color=o>=70?"var(--text-alert)":o>=40?"var(--neon-warn)":"var(--neon-green)",Wn.textContent=n.status,Je.classList.toggle("node-popup--left",s>60),Je.setAttribute("aria-hidden","false"),Je.classList.add("node-popup--visible")});ae.addEventListener("s9:threatmap-node-deselect",()=>{Je.classList.remove("node-popup--visible"),setTimeout(()=>Je.setAttribute("aria-hidden","true"),260)});function $n(){Dn(document.getElementById("threatmap-tactical"),Tt,Co,Me,{initThreatMap:wo,addNode:xo,removeNode:Eo,updateNodeLevel:la,setThreatLevel:Dt,setActiveNode:Pe,focusNode:Lt})}function Vn(){Ln(document.getElementById("flow-matrix"),{initMatrix:ds,activateEdge:ho,deactivateEdge:fo,pulseNode:hs,setActiveNode:_t})}
