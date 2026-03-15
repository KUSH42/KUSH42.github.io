import{C as eo,V as I,M as Le,T as De,Q as kt,S as Ft,a as N,R as to,P as ao,b as yt,c as q,O as ba,B as xe,F as Gt,d as Z,U as _t,W as Ye,H as Ke,N as oo,e as so,f as O,A as J,g as he,G as ya,L as oe,h as Ce,i as lt,j as Ct,k as Dt,l as _a,m as _e,n as Bt,o as no,p as Xe,D as wa,q as io,r as Sa,s as ro,t as xa,u as Ht,v as zt,w as Ta,x as We,y as lo,z as co,E as uo,I as Wt,J as ho,K as fo,X as mo,Y as po,Z as Ge,_ as ge,$ as go,a0 as Ie,a1 as vo,a2 as Ea}from"./three-BJA8G7W0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();const Ma=new WeakMap;function bo(e,{onSubmit:t,tabComplete:a}={}){const o=new AbortController,{signal:n}=o,s=window.matchMedia("(prefers-reduced-motion: reduce)").matches,i={abortController:o,history:[],historyIndex:-1,partialInput:"",reducedMotion:s};Ma.set(e,i);const r=e.querySelector(".s9-terminal__input");r&&r.addEventListener("keydown",c=>{_o(e,c,{onSubmit:t,tabComplete:a})},{signal:n})}function C(e,t,a){const o=e.querySelector(".s9-terminal__output");if(!o)return;const n=document.createElement("span");n.className=`s9-terminal__line s9-terminal__line--${a}`,n.textContent=t,o.appendChild(n);const s=200,i=o.querySelectorAll(".s9-terminal__line");i.length>s&&i[0].remove(),wo(o)}function yo(e){const t=e.querySelector(".s9-terminal__output");t&&(t.querySelectorAll(".s9-terminal__line").forEach(a=>a.remove()),e.dispatchEvent(new CustomEvent("s9:terminal-clear",{bubbles:!0})))}function _o(e,t,{onSubmit:a,tabComplete:o}){const n=Ma.get(e);if(!n)return;const s=e.querySelector(".s9-terminal__input");if(s)switch(t.key){case"Enter":{const i=s.value;if(!i)return;C(e,i,"cmd"),typeof a=="function"&&a(i),e.dispatchEvent(new CustomEvent("s9:terminal-submit",{bubbles:!0,detail:{command:i,timestamp:new Date().toISOString()}})),n.history.unshift(i),n.historyIndex=-1,n.partialInput="",s.value="";break}case"ArrowUp":{if(t.preventDefault(),n.history.length===0)return;n.historyIndex===-1&&(n.partialInput=s.value);const i=n.historyIndex+1;if(i<n.history.length){n.historyIndex=i,s.value=n.history[n.historyIndex];const r=s.value.length;s.setSelectionRange(r,r)}break}case"ArrowDown":{if(t.preventDefault(),n.historyIndex===-1)return;if(n.historyIndex>0){n.historyIndex-=1,s.value=n.history[n.historyIndex];const i=s.value.length;s.setSelectionRange(i,i)}else{n.historyIndex=-1,s.value=n.partialInput;const i=s.value.length;s.setSelectionRange(i,i)}break}case"Tab":{if(t.preventDefault(),typeof o=="function"){const i=o(s.value);i!=null&&(s.value=i)}break}default:{if(t.key.length===1&&!t.ctrlKey&&!t.metaKey&&!t.altKey&&!n.reducedMotion&&Math.random()<.01){const i=e.querySelector(".s9-terminal__output");if(i){const c=Array.from(i.querySelectorAll(".s9-terminal__line")).slice(-8);if(c.length>0){const u=c[Math.floor(Math.random()*c.length)];u.classList.add("glitch-enter"),u.addEventListener("animationend",h=>{h.animationName==="glitch"&&u.classList.remove("glitch-enter")},{once:!0})}}}break}}}function wo(e){e.scrollTop=e.scrollHeight}const Aa=new WeakMap;function So(e){const t=new AbortController,{signal:a}=t,o={ac:t,paused:!1,filter:null};Aa.set(e,o);const n=e.querySelector(".s9-stream__body");n&&(n.addEventListener("mouseenter",()=>{o.paused=!0,n.dataset.paused="true"},{signal:a}),n.addEventListener("mouseleave",()=>{o.paused=!1,n.dataset.paused="false",Ca(n)},{signal:a}),n.addEventListener("click",s=>{const i=s.target.closest(".s9-stream__row");if(!i)return;const r=i.classList.contains("s9-stream__row--pinned");i.classList.toggle("s9-stream__row--pinned",!r),e.dispatchEvent(new CustomEvent("s9:stream-row-pinned",{bubbles:!0,detail:{row:i,pinned:!r}}))},{signal:a}))}function Lt(e,{timestamp:t,source:a,message:o,alert:n=!1}){const s=e.querySelector(".s9-stream__body");if(!s)return;const i=Aa.get(e),r=(i==null?void 0:i.filter)??null,c=document.createElement("div");c.className="s9-stream__row",n&&c.classList.add("s9-stream__row--alert"),r&&a!==r&&(c.hidden=!0),c.innerHTML=`<span class="s9-stream__timestamp">${ut(t)}</span><span class="s9-stream__source">${ut(a)}</span><span class="s9-stream__message">${ut(o)}</span>`,c.classList.add("glitch-enter"),c.addEventListener("animationend",()=>c.classList.remove("glitch-enter"),{once:!0}),s.appendChild(c),s.children.length>100&&s.removeChild(s.firstChild),i!=null&&i.paused||Ca(s)}function Ca(e){e.scrollTop=e.scrollHeight}function ut(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function xo(e,t){t(),e.classList.remove("glitch-enter"),e.offsetWidth,e.classList.add("glitch-enter"),e.addEventListener("animationend",()=>e.classList.remove("glitch-enter"),{once:!0})}const ht=.37;function $t(e){return e>.08&&e<.18?Math.sin((e-.08)/.1*Math.PI)*.18:e>.28&&e<.32?-((e-.28)/.04)*.38:e>.32&&e<.37?-.38+(e-.32)/.05*1.38:e>.37&&e<.43?1-(e-.37)/.06*1.28:e>.43&&e<.49?-.28+(e-.43)/.06*.28:e>.52&&e<.68?Math.sin((e-.52)/.16*Math.PI)*.3:0}function To(e,t){if(!e)return console.warn("initEkg: canvas element not found"),{setBpm(){},destroy(){}};let a=62,o=0,n=0,s=0,i=0;function r(){t&&(t.classList.remove("beat"),t.offsetWidth,t.classList.add("beat"))}function c(){const d=e.getContext("2d"),f=e.width,p=e.height,v=p/2,T=p*.44,w=a/60/80;d.clearRect(0,0,f,p);const y=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";d.beginPath();for(let S=0;S<f;S++){const _=((o-(f-1-S)*w)%1+1)%1,b=v-$t(_)*T;S===0?d.moveTo(S,b):d.lineTo(S,b)}d.strokeStyle=y,d.lineWidth=1,d.shadowColor=y,d.shadowBlur=5,d.stroke();const m=v-$t(o)*T;d.beginPath(),d.arc(f-1,m,1.8,0,Math.PI*2),d.fillStyle=y,d.shadowBlur=10,d.fill()}function u(){const d=e.clientWidth;d&&e.width!==d&&(e.width=d)}u();const h=new ResizeObserver(u);h.observe(e);function l(d){i=requestAnimationFrame(l);const f=s?d-s:16;s=d,n=o,o=(o+a/60*(f/1e3))%1,(n<ht&&o>=ht||n>o&&o>=ht)&&r(),c()}return i=requestAnimationFrame(l),{setBpm(d){a=d},destroy(){cancelAnimationFrame(i),h.disconnect()}}}let Ae=98.4;function Da(e,t,a,o,n,s){Ae=Math.max(85,Math.min(100,Ae+(Math.random()-.45)*1.2));const i=Ae.toFixed(1),r=Math.round(58+(100-Ae)/15*12);return n.textContent=r,s.setBpm(r),xo(e,()=>{t.textContent=i,a.textContent=`${i}%`,o.textContent=`${Math.round(Ae)}%`}),Ae}const Vt=new WeakMap;function $e(e,t){const a=Math.max(0,Math.min(100,t)),o=e.querySelector(".s9-telemetry__bar-fill");if(o){o.style.width=`${a}%`;const r=["s9-telemetry__bar-fill--ok","s9-telemetry__bar-fill--warning","s9-telemetry__bar-fill--critical"];o.classList.remove(...r),a<=60?o.classList.add("s9-telemetry__bar-fill--ok"):a<=85?o.classList.add("s9-telemetry__bar-fill--warning"):o.classList.add("s9-telemetry__bar-fill--critical")}const n=e.querySelector(".s9-telemetry__value");n&&(n.textContent=Math.round(a).toString());const s=Vt.get(e)??!1,i=a>85;i&&!s&&e.dispatchEvent(new CustomEvent("s9:telemetry-threshold",{bubbles:!0,detail:{value:a}})),Vt.set(e,i)}const Eo=8e3;function Mo(e,{level:t="critical",code:a,message:o,persistent:n=!1}){const s=document.createElement("div");s.className=`s9-alert s9-alert--${t}`,n&&(s.dataset.persistent="true");const i=t==="critical"?"⬡":"⚠",r=new Date().toISOString().replace("T"," ").substring(0,19)+" UTC";return s.innerHTML=`<span class="s9-alert__icon" aria-hidden="true">${i}</span><div class="s9-alert__body"><span class="s9-alert__code">${ft(a)}</span><span class="s9-alert__message">${ft(o)}</span></div><span class="s9-alert__timestamp">${ft(r)}</span><button class="s9-alert__dismiss" aria-label="Dismiss alert">✕</button>`,s.classList.add("glitch-enter"),s.addEventListener("animationend",()=>s.classList.remove("glitch-enter"),{once:!0}),s.querySelector(".s9-alert__dismiss").addEventListener("click",()=>{qt(s)}),e.appendChild(s),n||setTimeout(()=>{s.isConnected&&qt(s)},Eo),s}function qt(e){var a;if(!e.isConnected)return;const t=((a=e.querySelector(".s9-alert__code"))==null?void 0:a.textContent)??"";e.classList.add("s9-alert--dismissing"),e.addEventListener("transitionend",()=>{e.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:t}})),e.remove()},{once:!0}),setTimeout(()=>{e.isConnected&&(e.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:t}})),e.remove())},400)}function ft(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const Q="http://www.w3.org/2000/svg",Te=new WeakMap;function Ao(e,{nodes:t=[],edges:a=[]}={}){const o=new AbortController,{signal:n}=o,s=window.matchMedia("(prefers-reduced-motion: reduce)").matches,i={abortController:o,nodeMap:new Map,edgeMap:new Map,activeNodeId:null,reducedMotion:s};Te.set(e,i);const r=document.createElementNS(Q,"svg");r.setAttribute("class","s9-matrix__canvas"),r.setAttribute("viewBox","0 0 100 100"),r.setAttribute("preserveAspectRatio","xMidYMid meet"),r.setAttribute("role","img"),r.setAttribute("aria-label","Network topology matrix");const c=document.createElementNS(Q,"defs"),u=document.createElementNS(Q,"g");u.setAttribute("class","s9-matrix__edges");const h=document.createElementNS(Q,"g");h.setAttribute("class","s9-matrix__nodes"),r.appendChild(c),r.appendChild(u),r.appendChild(h),e.appendChild(r),t.forEach(l=>Do(e,l)),a.forEach(l=>Lo(e,l)),a.forEach(l=>{l.active&&La(e,l.id)}),r.addEventListener("click",l=>{const d=l.target.closest("[data-node-id]");d?Ze(e,d.dataset.nodeId):i.activeNodeId!==null&&Ze(e,null)},{signal:n}),r.addEventListener("keydown",l=>{if(l.key==="Enter"||l.key===" "){const d=l.target.closest("[data-node-id]");d&&(l.preventDefault(),Ze(e,d.dataset.nodeId))}},{signal:n})}function Co(e,t){const a=Te.get(e);if(!a)return;const o=a.nodeMap.get(t);if(!o||o.classList.contains("s9-matrix__node--active"))return;o.classList.add("s9-matrix__node--pulsing");const n=o.querySelector(".s9-matrix__node-ring");n&&n.addEventListener("animationend",s=>{s.animationName==="matrix-ring-pulse"&&o.classList.remove("s9-matrix__node--pulsing")},{once:!0})}function La(e,t,a=null){const o=Te.get(e);if(!o)return;if(t===null){for(const[v]of o.edgeMap)Ra(e,v);return}const n=o.edgeMap.get(t);if(!n||n.active)return;const s=e.querySelector(".s9-matrix__canvas");if(!s)return;const i=s.querySelector(".s9-matrix__edges");if(!i)return;const{line:r,x1:c,y1:u,x2:h,y2:l}=n;r&&r.parentNode&&r.parentNode.removeChild(r);const d=`s9-edge-${t}`,f=document.createElementNS(Q,"path");f.setAttribute("class","s9-matrix__edge s9-matrix__edge--active"),f.setAttribute("id",d),f.setAttribute("data-edge-id",t),f.setAttribute("d",`M ${c} ${u} L ${h} ${l}`),i.appendChild(f);let p=null;if(!o.reducedMotion){p=document.createElementNS(Q,"circle"),p.setAttribute("class","s9-matrix__edge-dot"),p.setAttribute("r","1.2"),a&&(p.style.fill=a,p.style.filter=`drop-shadow(0 0 2px ${a})`);const v=document.createElementNS(Q,"animateMotion");v.setAttribute("dur","2s"),v.setAttribute("repeatCount","indefinite");const T=document.createElementNS(Q,"mpath");T.setAttributeNS("http://www.w3.org/1999/xlink","href",`#${d}`),v.appendChild(T),p.appendChild(v),i.appendChild(p)}n.line=f,n.dot=p,n.active=!0}function Ra(e,t){const a=Te.get(e);if(!a)return;const o=a.edgeMap.get(t);if(!o||!o.active)return;const n=e.querySelector(".s9-matrix__canvas");if(!n)return;const s=n.querySelector(".s9-matrix__edges");if(!s)return;const{line:i,dot:r,x1:c,y1:u,x2:h,y2:l}=o;r&&r.parentNode&&r.parentNode.removeChild(r),i&&i.parentNode&&i.parentNode.removeChild(i);const d=document.createElementNS(Q,"line");d.setAttribute("class","s9-matrix__edge"),d.setAttribute("data-edge-id",t),d.setAttribute("x1",c),d.setAttribute("y1",u),d.setAttribute("x2",h),d.setAttribute("y2",l),s.appendChild(d),o.line=d,o.dot=null,o.active=!1}function Ze(e,t){const a=Te.get(e);if(!a)return;if(a.activeNodeId!==null){const n=a.nodeMap.get(a.activeNodeId);n&&(n.classList.remove("s9-matrix__node--active"),n.setAttribute("aria-pressed","false")),e.dispatchEvent(new CustomEvent("s9:matrix-node-deselect",{bubbles:!0,detail:{nodeId:a.activeNodeId}})),a.activeNodeId=null}if(t===null)return;const o=a.nodeMap.get(t);o&&(o.classList.add("s9-matrix__node--active"),o.setAttribute("aria-pressed","true"),a.activeNodeId=t,e.dispatchEvent(new CustomEvent("s9:matrix-node-click",{bubbles:!0,detail:{nodeId:t,label:o.getAttribute("aria-label")??t}})))}function Do(e,{id:t,x:a,y:o,label:n,root:s=!1}){const i=Te.get(e);if(!i)return;const r=e.querySelector(".s9-matrix__canvas");if(!r)return;const c=r.querySelector(".s9-matrix__nodes");if(!c)return;const u=document.createElementNS(Q,"g");u.setAttribute("class",`s9-matrix__node${s?" s9-matrix__node--root":""}`),u.setAttribute("data-node-id",t),u.setAttribute("tabindex","0"),u.setAttribute("role","button"),u.setAttribute("aria-label",n),u.setAttribute("aria-pressed","false");const h=document.createElementNS(Q,"circle");h.setAttribute("class","s9-matrix__node-ring"),h.setAttribute("cx",a),h.setAttribute("cy",o),h.setAttribute("r","4");const l=document.createElementNS(Q,"circle");l.setAttribute("class","s9-matrix__node-core"),l.setAttribute("cx",a),l.setAttribute("cy",o),l.setAttribute("r","2.5");const d=document.createElementNS(Q,"text");d.setAttribute("class","s9-matrix__node-label"),d.setAttribute("x",a),d.setAttribute("y",o+3.5),d.textContent=n,u.appendChild(h),u.appendChild(l),u.appendChild(d),c.appendChild(u),i.nodeMap.set(t,u)}function Lo(e,{id:t,from:a,to:o}){const n=Te.get(e);if(!n)return;const s=e.querySelector(".s9-matrix__canvas");if(!s)return;const i=s.querySelector(".s9-matrix__edges");if(!i)return;const r=n.nodeMap.get(a),c=n.nodeMap.get(o),u=r?parseFloat(r.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,h=r?parseFloat(r.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,l=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,d=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,f=document.createElementNS(Q,"line");f.setAttribute("class","s9-matrix__edge"),f.setAttribute("data-edge-id",t),f.setAttribute("x1",u),f.setAttribute("y1",h),f.setAttribute("x2",l),f.setAttribute("y2",d),i.appendChild(f),n.edgeMap.set(t,{line:f,dot:null,active:!1,from:a,to:o,x1:u,y1:h,x2:l,y2:d})}const jt={type:"change"},Rt={type:"start"},Pa={type:"end"},Ve=new to,Yt=new ao,Ro=Math.cos(70*yt.DEG2RAD),W=new I,Y=2*Math.PI,U={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},mt=1e-6;class Po extends eo{constructor(t,a=null){super(t,a),this.state=U.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Le.ROTATE,MIDDLE:Le.DOLLY,RIGHT:Le.PAN},this.touches={ONE:De.ROTATE,TWO:De.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new kt,this._lastTargetPosition=new I,this._quat=new kt().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ft,this._sphericalDelta=new Ft,this._scale=1,this._panOffset=new I,this._rotateStart=new N,this._rotateEnd=new N,this._rotateDelta=new N,this._panStart=new N,this._panEnd=new N,this._panDelta=new N,this._dollyStart=new N,this._dollyEnd=new N,this._dollyDelta=new N,this._dollyDirection=new I,this._mouse=new N,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Oo.bind(this),this._onPointerDown=Io.bind(this),this._onPointerUp=No.bind(this),this._onContextMenu=zo.bind(this),this._onMouseWheel=Fo.bind(this),this._onKeyDown=Go.bind(this),this._onTouchStart=Bo.bind(this),this._onTouchMove=Ho.bind(this),this._onMouseDown=Uo.bind(this),this._onMouseMove=ko.bind(this),this._interceptControlDown=Wo.bind(this),this._interceptControlUp=$o.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(jt),this.update(),this.state=U.NONE}pan(t,a){this._pan(t,a),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){const a=this.object.position;W.copy(a).sub(this.target),W.applyQuaternion(this._quat),this._spherical.setFromVector3(W),this.autoRotate&&this.state===U.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let o=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(o)&&isFinite(n)&&(o<-Math.PI?o+=Y:o>Math.PI&&(o-=Y),n<-Math.PI?n+=Y:n>Math.PI&&(n-=Y),o<=n?this._spherical.theta=Math.max(o,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(o+n)/2?Math.max(o,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const i=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=i!=this._spherical.radius}if(W.setFromSpherical(this._spherical),W.applyQuaternion(this._quatInverse),a.copy(this.target).add(W),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let i=null;if(this.object.isPerspectiveCamera){const r=W.length();i=this._clampDistance(r*this._scale);const c=r-i;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){const r=new I(this._mouse.x,this._mouse.y,0);r.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;const u=new I(this._mouse.x,this._mouse.y,0);u.unproject(this.object),this.object.position.sub(u).add(r),this.object.updateMatrixWorld(),i=W.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;i!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(i).add(this.object.position):(Ve.origin.copy(this.object.position),Ve.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ve.direction))<Ro?this.object.lookAt(this.target):(Yt.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ve.intersectPlane(Yt,this.target))))}else if(this.object.isOrthographicCamera){const i=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),i!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>mt||8*(1-this._lastQuaternion.dot(this.object.quaternion))>mt||this._lastTargetPosition.distanceToSquared(this.target)>mt?(this.dispatchEvent(jt),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Y/60*this.autoRotateSpeed*t:Y/60/60*this.autoRotateSpeed}_getZoomScale(t){const a=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*a)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,a){W.setFromMatrixColumn(a,0),W.multiplyScalar(-t),this._panOffset.add(W)}_panUp(t,a){this.screenSpacePanning===!0?W.setFromMatrixColumn(a,1):(W.setFromMatrixColumn(a,0),W.crossVectors(this.object.up,W)),W.multiplyScalar(t),this._panOffset.add(W)}_pan(t,a){const o=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;W.copy(n).sub(this.target);let s=W.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/o.clientHeight,this.object.matrix),this._panUp(2*a*s/o.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/o.clientWidth,this.object.matrix),this._panUp(a*(this.object.top-this.object.bottom)/this.object.zoom/o.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,a){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const o=this.domElement.getBoundingClientRect(),n=t-o.left,s=a-o.top,i=o.width,r=o.height;this._mouse.x=n/i*2-1,this._mouse.y=-(s/r)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const a=this.domElement;this._rotateLeft(Y*this._rotateDelta.x/a.clientHeight),this._rotateUp(Y*this._rotateDelta.y/a.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let a=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Y*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),a=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Y*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),a=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Y*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),a=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Y*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),a=!0;break}a&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const a=this._getSecondPointerPosition(t),o=.5*(t.pageX+a.x),n=.5*(t.pageY+a.y);this._rotateStart.set(o,n)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const a=this._getSecondPointerPosition(t),o=.5*(t.pageX+a.x),n=.5*(t.pageY+a.y);this._panStart.set(o,n)}}_handleTouchStartDolly(t){const a=this._getSecondPointerPosition(t),o=t.pageX-a.x,n=t.pageY-a.y,s=Math.sqrt(o*o+n*n);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const o=this._getSecondPointerPosition(t),n=.5*(t.pageX+o.x),s=.5*(t.pageY+o.y);this._rotateEnd.set(n,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const a=this.domElement;this._rotateLeft(Y*this._rotateDelta.x/a.clientHeight),this._rotateUp(Y*this._rotateDelta.y/a.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const a=this._getSecondPointerPosition(t),o=.5*(t.pageX+a.x),n=.5*(t.pageY+a.y);this._panEnd.set(o,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const a=this._getSecondPointerPosition(t),o=t.pageX-a.x,n=t.pageY-a.y,s=Math.sqrt(o*o+n*n);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const i=(t.pageX+a.x)*.5,r=(t.pageY+a.y)*.5;this._updateZoomParameters(i,r)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let a=0;a<this._pointers.length;a++)if(this._pointers[a]==t.pointerId){this._pointers.splice(a,1);return}}_isTrackingPointer(t){for(let a=0;a<this._pointers.length;a++)if(this._pointers[a]==t.pointerId)return!0;return!1}_trackPointer(t){let a=this._pointerPositions[t.pointerId];a===void 0&&(a=new N,this._pointerPositions[t.pointerId]=a),a.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const a=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[a]}_customWheelEvent(t){const a=t.deltaMode,o={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(a){case 1:o.deltaY*=16;break;case 2:o.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(o.deltaY*=10),o}}function Io(e){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(e.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(e)&&(this._addPointer(e),e.pointerType==="touch"?this._onTouchStart(e):this._onMouseDown(e),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Oo(e){this.enabled!==!1&&(e.pointerType==="touch"?this._onTouchMove(e):this._onMouseMove(e))}function No(e){switch(this._removePointer(e),this._pointers.length){case 0:this.domElement.releasePointerCapture(e.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Pa),this.state=U.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const t=this._pointers[0],a=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:a.x,pageY:a.y});break}}function Uo(e){let t;switch(e.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Le.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(e),this.state=U.DOLLY;break;case Le.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=U.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=U.ROTATE}break;case Le.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(e),this.state=U.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(e),this.state=U.PAN}break;default:this.state=U.NONE}this.state!==U.NONE&&this.dispatchEvent(Rt)}function ko(e){switch(this.state){case U.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(e);break;case U.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(e);break;case U.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(e);break}}function Fo(e){this.enabled===!1||this.enableZoom===!1||this.state!==U.NONE||(e.preventDefault(),this.dispatchEvent(Rt),this._handleMouseWheel(this._customWheelEvent(e)),this.dispatchEvent(Pa))}function Go(e){this.enabled!==!1&&this._handleKeyDown(e)}function Bo(e){switch(this._trackPointer(e),this._pointers.length){case 1:switch(this.touches.ONE){case De.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(e),this.state=U.TOUCH_ROTATE;break;case De.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(e),this.state=U.TOUCH_PAN;break;default:this.state=U.NONE}break;case 2:switch(this.touches.TWO){case De.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(e),this.state=U.TOUCH_DOLLY_PAN;break;case De.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(e),this.state=U.TOUCH_DOLLY_ROTATE;break;default:this.state=U.NONE}break;default:this.state=U.NONE}this.state!==U.NONE&&this.dispatchEvent(Rt)}function Ho(e){switch(this._trackPointer(e),this.state){case U.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(e),this.update();break;case U.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(e),this.update();break;case U.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(e),this.update();break;case U.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(e),this.update();break;default:this.state=U.NONE}}function zo(e){this.enabled!==!1&&e.preventDefault()}function Wo(e){e.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function $o(e){e.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Qe={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Be{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Vo=new ba(-1,1,1,-1,0,1);class qo extends xe{constructor(){super(),this.setAttribute("position",new Gt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Gt([0,2,0,0,2,0],2))}}const jo=new qo;class Ia{constructor(t){this._mesh=new q(jo,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Vo)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class fe extends Be{constructor(t,a="tDiffuse"){super(),this.textureID=a,this.uniforms=null,this.material=null,t instanceof Z?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=_t.clone(t.uniforms),this.material=new Z({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Ia(this.material)}render(t,a,o){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=o.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(a),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Kt extends Be{constructor(t,a){super(),this.scene=t,this.camera=a,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,a,o){const n=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let i,r;this.inverse?(i=0,r=1):(i=1,r=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),s.buffers.stencil.setFunc(n.ALWAYS,i,4294967295),s.buffers.stencil.setClear(r),s.buffers.stencil.setLocked(!0),t.setRenderTarget(o),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(a),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(n.EQUAL,1,4294967295),s.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),s.buffers.stencil.setLocked(!0)}}class Yo extends Be{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Pt{constructor(t,a){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),a===void 0){const o=t.getSize(new N);this._width=o.width,this._height=o.height,a=new Ye(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ke}),a.texture.name="EffectComposer.rt1"}else this._width=a.width,this._height=a.height;this.renderTarget1=a,this.renderTarget2=a.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new fe(Qe),this.copyPass.material.blending=oo,this.timer=new so}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,a){this.passes.splice(a,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const a=this.passes.indexOf(t);a!==-1&&this.passes.splice(a,1)}isLastEnabledPass(t){for(let a=t+1;a<this.passes.length;a++)if(this.passes[a].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const a=this.renderer.getRenderTarget();let o=!1;for(let n=0,s=this.passes.length;n<s;n++){const i=this.passes[n];if(i.enabled!==!1){if(i.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),i.render(this.renderer,this.writeBuffer,this.readBuffer,t,o),i.needsSwap){if(o){const r=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}Kt!==void 0&&(i instanceof Kt?o=!0:i instanceof Yo&&(o=!1))}}this.renderer.setRenderTarget(a)}reset(t){if(t===void 0){const a=this.renderer.getSize(new N);this._pixelRatio=this.renderer.getPixelRatio(),this._width=a.width,this._height=a.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,a){this._width=t,this._height=a;const o=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(o,n),this.renderTarget2.setSize(o,n);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(o,n)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class It extends Be{constructor(t,a,o=null,n=null,s=null){super(),this.scene=t,this.camera=a,this.overrideMaterial=o,this.clearColor=n,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new O}render(t,a,o){const n=t.autoClear;t.autoClear=!1;let s,i;this.overrideMaterial!==null&&(i=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:o),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=i),t.autoClear=n}}const Ko={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new O(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ye extends Be{constructor(t,a=1,o,n){super(),this.strength=a,this.radius=o,this.threshold=n,this.resolution=t!==void 0?new N(t.x,t.y):new N(256,256),this.clearColor=new O(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);this.renderTargetBright=new Ye(s,i,{type:Ke}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const l=new Ye(s,i,{type:Ke});l.texture.name="UnrealBloomPass.h"+h,l.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(l);const d=new Ye(s,i,{type:Ke});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),s=Math.round(s/2),i=Math.round(i/2)}const r=Ko;this.highPassUniforms=_t.clone(r.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Z({uniforms:this.highPassUniforms,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];s=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new N(1/s,1/i),s=Math.round(s/2),i=Math.round(i/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=a,this.compositeMaterial.uniforms.bloomRadius.value=.1;const u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1),new I(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=_t.clone(Qe.uniforms),this.blendMaterial=new Z({uniforms:this.copyUniforms,vertexShader:Qe.vertexShader,fragmentShader:Qe.fragmentShader,premultipliedAlpha:!0,blending:J,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new O,this._oldClearAlpha=1,this._basic=new he,this._fsQuad=new Ia(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,a){let o=Math.round(t/2),n=Math.round(a/2);this.renderTargetBright.setSize(o,n);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(o,n),this.renderTargetsVertical[s].setSize(o,n),this.separableBlurMaterials[s].uniforms.invSize.value=new N(1/o,1/n),o=Math.round(o/2),n=Math.round(n/2)}render(t,a,o,n,s){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const i=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=o.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=o.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let r=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=r.texture,this.separableBlurMaterials[c].uniforms.direction.value=ye.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=ye.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),r=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(o),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=i}_getSeparableBlurMaterial(t){const a=[],o=t/3;for(let n=0;n<t;n++)a.push(.39894*Math.exp(-.5*n*n/(o*o))/o);return new Z({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new N(.5,.5)},direction:{value:new N(.5,.5)},gaussianCoefficients:{value:a}},vertexShader:`

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

				}`})}_getCompositeMaterial(t){return new Z({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}ye.BlurDirectionX=new N(1,0);ye.BlurDirectionY=new N(0,1);const Xo=40,Zo=70,Re=1,H=new WeakMap;let Oa=null;function Qo(){return Oa}function Na(e){Oa=e}function wt(e,t,a=1.03){const o=(90-e)*(Math.PI/180),n=(t+180)*(Math.PI/180);return new I(-a*Math.sin(o)*Math.cos(n),a*Math.cos(o),a*Math.sin(o)*Math.sin(n))}let qe=null,Xt=0;function Ee(e=!1){const t=Date.now();if(!e&&qe&&t-Xt<500)return qe;const a=getComputedStyle(document.documentElement);return qe={neonCyan:a.getPropertyValue("--neon-cyan").trim(),neonGreen:a.getPropertyValue("--neon-green").trim(),neonWarn:a.getPropertyValue("--neon-warn").trim(),neonAlert:a.getPropertyValue("--neon-alert").trim(),neonSelect:a.getPropertyValue("--neon-select").trim()||"#00ffff"},Xt=t,qe}function we(e,t){return e<=Xo?t.neonGreen:e<=Zo?t.neonWarn:t.neonAlert}function ke(e,t,a,o){return[(t+180)/360*a,(90-e)/180*o]}const Jo={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.5},scanlineOpacity:{value:.035},aberrationAmt:{value:.0022}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `};function es(e){return e}function ts(e){if(e==null)return es;var t,a,o=e.scale[0],n=e.scale[1],s=e.translate[0],i=e.translate[1];return function(r,c){c||(t=a=0);var u=2,h=r.length,l=new Array(h);for(l[0]=(t+=r[0])*o+s,l[1]=(a+=r[1])*n+i;u<h;)l[u]=r[u],++u;return l}}function as(e,t){for(var a,o=e.length,n=o-t;n<--o;)a=e[n],e[n++]=e[o],e[o]=a}function os(e,t){return typeof t=="string"&&(t=e.objects[t]),t.type==="GeometryCollection"?{type:"FeatureCollection",features:t.geometries.map(function(a){return Zt(e,a)})}:Zt(e,t)}function Zt(e,t){var a=t.id,o=t.bbox,n=t.properties==null?{}:t.properties,s=Ua(e,t);return a==null&&o==null?{type:"Feature",properties:n,geometry:s}:o==null?{type:"Feature",id:a,properties:n,geometry:s}:{type:"Feature",id:a,bbox:o,properties:n,geometry:s}}function Ua(e,t){var a=ts(e.transform),o=e.arcs;function n(h,l){l.length&&l.pop();for(var d=o[h<0?~h:h],f=0,p=d.length;f<p;++f)l.push(a(d[f],f));h<0&&as(l,p)}function s(h){return a(h)}function i(h){for(var l=[],d=0,f=h.length;d<f;++d)n(h[d],l);return l.length<2&&l.push(l[0]),l}function r(h){for(var l=i(h);l.length<4;)l.push(l[0]);return l}function c(h){return h.map(r)}function u(h){var l=h.type,d;switch(l){case"GeometryCollection":return{type:l,geometries:h.geometries.map(u)};case"Point":d=s(h.coordinates);break;case"MultiPoint":d=h.coordinates.map(s);break;case"LineString":d=i(h.arcs);break;case"MultiLineString":d=h.arcs.map(i);break;case"Polygon":d=c(h.arcs);break;case"MultiPolygon":d=h.arcs.map(c);break;default:return null}return{type:l,coordinates:d}}return u(t)}function ss(e,t){var a={},o={},n={},s=[],i=-1;t.forEach(function(u,h){var l=e.arcs[u<0?~u:u],d;l.length<3&&!l[1][0]&&!l[1][1]&&(d=t[++i],t[i]=u,t[h]=d)}),t.forEach(function(u){var h=r(u),l=h[0],d=h[1],f,p;if(f=n[l])if(delete n[f.end],f.push(u),f.end=d,p=o[d]){delete o[p.start];var v=p===f?f:f.concat(p);o[v.start=f.start]=n[v.end=p.end]=v}else o[f.start]=n[f.end]=f;else if(f=o[d])if(delete o[f.start],f.unshift(u),f.start=l,p=n[l]){delete n[p.end];var T=p===f?f:p.concat(f);o[T.start=p.start]=n[T.end=f.end]=T}else o[f.start]=n[f.end]=f;else f=[u],o[f.start=l]=n[f.end=d]=f});function r(u){var h=e.arcs[u<0?~u:u],l=h[0],d;return e.transform?(d=[0,0],h.forEach(function(f){d[0]+=f[0],d[1]+=f[1]})):d=h[h.length-1],u<0?[d,l]:[l,d]}function c(u,h){for(var l in u){var d=u[l];delete h[d.start],delete d.start,delete d.end,d.forEach(function(f){a[f<0?~f:f]=1}),s.push(d)}}return c(n,o),c(o,n),t.forEach(function(u){a[u<0?~u:u]||s.push([u])}),s}function Qt(e){return Ua(e,ns.apply(this,arguments))}function ns(e,t,a){var o,n,s;if(arguments.length>1)o=is(e,t,a);else for(n=0,o=new Array(s=e.arcs.length);n<s;++n)o[n]=n;return{type:"MultiLineString",arcs:ss(e,o)}}function is(e,t,a){var o=[],n=[],s;function i(l){var d=l<0?~l:l;(n[d]||(n[d]=[])).push({i:l,g:s})}function r(l){l.forEach(i)}function c(l){l.forEach(r)}function u(l){l.forEach(c)}function h(l){switch(s=l,l.type){case"GeometryCollection":l.geometries.forEach(h);break;case"LineString":r(l.arcs);break;case"MultiLineString":case"Polygon":c(l.arcs);break;case"MultiPolygon":u(l.arcs);break}}return h(t),n.forEach(a==null?function(l){o.push(l[0].i)}:function(l){a(l[0].g,l[l.length-1].g)&&o.push(l[0].i)}),o}function Oe(e,t){const a=[];for(const n of e)for(let s=0;s<n.length-1;s++){const[i,r]=n[s],[c,u]=n[s+1],h=wt(r,i,t),l=wt(u,c,t);a.push(h.x,h.y,h.z,l.x,l.y,l.z)}const o=new xe;return o.setAttribute("position",new lt(new Float32Array(a),3)),o}async function rs(e){let t;try{const w=await fetch("/data/countries-110m.json");if(!w.ok)throw new Error(`HTTP ${w.status}`);t=await w.json(),Na(t)}catch(w){console.warn("[s9-threatmap] geo lines: failed to load /data/countries-110m.json",w);return}const a=H.get(e);if(!a)return;const o=new ya,n=a.cyanColor,s=Qt(t,t.objects.land),i=new oe({color:n,transparent:!0,opacity:1,depthWrite:!0}),r=new oe({color:n,transparent:!0,opacity:1,blending:J,depthWrite:!0}),c=new oe({color:n,transparent:!0,opacity:.7,blending:J,depthWrite:!1}),u=new Ce(Oe(s.coordinates,1.002),i),h=new Ce(Oe(s.coordinates,1.006),r),l=new Ce(Oe(s.coordinates,1.011),c);u.userData.geoType=h.userData.geoType=l.userData.geoType="coast",o.add(l,h,u);const d=Qt(t,t.objects.countries,(w,y)=>w!==y),f=new oe({color:n,transparent:!0,opacity:.55,depthWrite:!0}),p=new oe({color:n,transparent:!0,opacity:.3,blending:J,depthWrite:!1}),v=new Ce(Oe(d.coordinates,1.012),f),T=new Ce(Oe(d.coordinates,1.022),p);v.userData.geoType=T.userData.geoType="border",o.add(T,v),a.scene.add(o),a.satelliteMode&&(o.visible=!1),a.geoGroup=o}const $={NODE_FLASH_DUR:80,NODE_SETTLE_DUR:140,NODE_SCALE_PEAK:1.9,NODE_SCALE_DUR:220,NODE_SCALE_RISE:.35,CROSSHAIR_IN_DELAY:40,LABEL_CHAR_RATE:38,LABEL_CURSOR_BLINK:530,LABEL_START_DELAY:250,COORD_SCRAMBLE_DUR:320,COORD_SCRAMBLE_DELAY:80,DESELECT_LABEL_DUR:100,DESELECT_CROSSHAIR_DELAY:80,DESELECT_NODE_DELAY:120,DESELECT_NODE_DUR:180,NODE_DESELECT_SCALE_TROUGH:.65};function Jt(e){return 1-Math.pow(1-e,3)}function ea(e){return e*e*e}function ta(e){return e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2}function ls(e){const t=H.get(e);if(!t)return;t.nodeTween&&t.nodeTween.mesh.scale.setScalar(1),t.deselectTween&&t.deselectTween.mesh.scale.setScalar(1),t.nodeTween=null,t.deselectTween=null,t.tweenGeneration++;for(const o of t.pendingTimers)clearTimeout(o);t.pendingTimers=[],t.labelTypewriter&&(t.labelTypewriter.cancel(),t.labelTypewriter=null),t.coordScrambleLat&&(t.coordScrambleLat.cancel(),t.coordScrambleLat=null),t.coordScrambleLng&&(t.coordScrambleLng.cancel(),t.coordScrambleLng=null);const a=e.querySelector(".s9-threatmap__crosshair");a&&(a.classList.remove("s9-threatmap__crosshair--animating-in","s9-threatmap__crosshair--animating-out"),a.offsetWidth)}function cs(e,t,a,o,n){if(t.length===0)return e.textContent="",{cancel:()=>{}};let s=0,i=!0,r=null,c=null,u=!1;function h(){u=!0,clearTimeout(c),clearInterval(r)}function l(){e.textContent=t.slice(0,s)+(i?"_":" ")}l(),r=setInterval(()=>{u||(i=!i,l())},o);function d(){u||(s++,l(),s<t.length?c=setTimeout(d,a):c=setTimeout(()=>{u||(clearInterval(r),e.textContent=t)},o))}return c=setTimeout(d,a),{cancel:h}}function aa(e,t,a,o,n,s){const i=Date.now(),r=Math.abs(a),c=Math.max(1,Math.floor(Math.log10(r||1))+1);let u=null,h=!1;function l(){h=!0,clearTimeout(u)}function d(){if(h)return;if(Date.now()-i>=n){e.textContent=`${t}${a.toFixed(o)}°`;return}const p=(Math.random()*Math.pow(10,c)).toFixed(o),v=a<0?"-":"";e.textContent=`${t}${v}${p}°`,u=setTimeout(d,40)}return d(),{cancel:l}}function Se(e,t){const a=H.get(e);if(!a)return;ls(e);const o=Ee(),n=a.activeNodeId;if(n!==null){a.activeNodeId=null,e.removeAttribute("data-active-node"),e.dispatchEvent(new CustomEvent("s9:threatmap-node-deselect",{bubbles:!0,detail:{nodeId:n}}));const l=a.nodeMap.get(n);if(t===null){if(l){l.mesh.material.color.set(o.neonSelect||"#00ffff");const T=new O(o.neonSelect||"#00ffff"),w=new O(we(l.level,o)),y=e.querySelector(".s9-threatmap__crosshair-label");y&&y.classList.add("s9-threatmap__crosshair-label--fading");const m=setTimeout(()=>{y&&(y.textContent="",y.classList.remove("s9-threatmap__crosshair-label--fading"))},$.DESELECT_LABEL_DUR);a.pendingTimers.push(m);const S=setTimeout(()=>{const b=e.querySelector(".s9-threatmap__crosshair");b&&(b.classList.remove("s9-threatmap__crosshair--animating-in","s9-threatmap__crosshair--visible"),b.offsetWidth,b.classList.add("s9-threatmap__crosshair--animating-out"))},$.DESELECT_CROSSHAIR_DELAY);a.pendingTimers.push(S);const _=setTimeout(()=>{a.deselectTween={generation:a.tweenGeneration,t0:Date.now(),dur:$.DESELECT_NODE_DUR,troughScale:$.NODE_DESELECT_SCALE_TROUGH,selectColor:T,levelColor:w,mesh:l.mesh,element:e}},$.DESELECT_NODE_DELAY);a.pendingTimers.push(_)}else{const T=e.querySelector(".s9-threatmap__crosshair");T&&T.classList.remove("s9-threatmap__crosshair--visible");const w=e.querySelector(".s9-threatmap__crosshair-label");w&&(w.textContent="")}const p=e.querySelector(".s9-threatmap__coords-lat"),v=e.querySelector(".s9-threatmap__coords-lng");p&&(p.textContent="LAT: --.-°"),v&&(v.textContent="LNG: --.-°");return}l&&(l.mesh.scale.setScalar(1),l.mesh.material.color.set(we(l.level,o)));const d=e.querySelector(".s9-threatmap__crosshair");d&&d.classList.remove("s9-threatmap__crosshair--visible");const f=e.querySelector(".s9-threatmap__crosshair-label");f&&(f.textContent="")}if(t===null)return;const s=a.nodeMap.get(t);if(!s)return;if(a.activeNodeId=t,e.setAttribute("data-active-node",t),e.dispatchEvent(new CustomEvent("s9:threatmap-node-select",{bubbles:!0,detail:{nodeId:t,label:s.label,lat:s.lat,lng:s.lng,level:s.level}})),a.reducedMotion){s.mesh.material.color.set(o.neonSelect||"#00ffff"),s.mesh.scale.setScalar(1);const l=e.querySelector(".s9-threatmap__crosshair");l&&l.classList.add("s9-threatmap__crosshair--visible");const d=e.querySelector(".s9-threatmap__crosshair-label");d&&(d.textContent=s.label);const f=e.querySelector(".s9-threatmap__coords-lat"),p=e.querySelector(".s9-threatmap__coords-lng");f&&(f.textContent=`LAT: ${s.lat.toFixed(2)}°`),p&&(p.textContent=`LNG: ${s.lng.toFixed(2)}°`);return}const i=new O("#ffffff"),r=new O(o.neonSelect||"#00ffff");s.mesh.material.color.copy(i),s.mesh.scale.setScalar(1),a.nodeTween={generation:a.tweenGeneration,t0:Date.now(),dur:$.NODE_SCALE_DUR,riseFrac:$.NODE_SCALE_RISE,peakScale:$.NODE_SCALE_PEAK,flashDur:$.NODE_FLASH_DUR,settleDur:$.NODE_SETTLE_DUR,flashColor:i,selectColor:r,mesh:s.mesh};const c=setTimeout(()=>{const l=e.querySelector(".s9-threatmap__crosshair");l&&l.classList.add("s9-threatmap__crosshair--visible","s9-threatmap__crosshair--animating-in")},$.CROSSHAIR_IN_DELAY);a.pendingTimers.push(c);const u=setTimeout(()=>{const l=e.querySelector(".s9-threatmap__coords-lat"),d=e.querySelector(".s9-threatmap__coords-lng");l&&(a.coordScrambleLat=aa(l,"LAT: ",s.lat,2,$.COORD_SCRAMBLE_DUR)),d&&(a.coordScrambleLng=aa(d,"LNG: ",s.lng,2,$.COORD_SCRAMBLE_DUR))},$.COORD_SCRAMBLE_DELAY);a.pendingTimers.push(u);const h=setTimeout(()=>{const l=e.querySelector(".s9-threatmap__crosshair-label");l&&(a.labelTypewriter=cs(l,s.label,$.LABEL_CHAR_RATE,$.LABEL_CURSOR_BLINK))},$.LABEL_START_DELAY);a.pendingTimers.push(h)}function st(e,t){if(!H.get(e))return;const o=Math.max(0,Math.min(100,t));e.setAttribute("data-threat-level",o)}function Ot(e,t,a){const o=H.get(e);if(!o)return;const n=o.nodeMap.get(t);if(!n)return;const s=n.level;if(n.level=a,n.mesh.userData.level=a,o.activeNodeId!==t){const i=Ee();n.mesh.material.color.set(we(a,i))}return s}function nt(e,t){const a=H.get(e);if(!a)return;const o=a.nodeMap.get(t);if(!o||Date.now()-a.lastOrbitInteraction<3e3)return;const n=a.camera.position.length();a.cameraLerpTarget=o.mesh.position.clone().normalize().multiplyScalar(n),a.controls.autoRotate=!1,a.resumeTimer!==null&&(clearTimeout(a.resumeTimer),a.resumeTimer=null)}function ds(e){return e==="bracket"?`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-bracket" aria-hidden="true">
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tr"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--bl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--br"></span>
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`:e==="diamond"?`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-diamond" aria-hidden="true">
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`:`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-box" aria-hidden="true">
    <span class="s9-threatmap__crosshair-label"></span>
  </div>`}function ka(e,{autoRotate:t=!0,bloomStrength:a=1.7,crosshairShape:o="box"}={}){const n=new AbortController,{signal:s}=n,i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r=Ee(),c=new Ct({antialias:!0,alpha:!0});c.setPixelRatio(window.devicePixelRatio),c.setSize(e.clientWidth||800,e.clientHeight||600),c.domElement.classList.add("s9-threatmap__canvas"),e.appendChild(c.domElement);const u=new Dt,h=new _a(45,(e.clientWidth||800)/(e.clientHeight||600),.1,100);h.position.set(0,0,3);const l=new _e(Re,48,48),d=new _e(Re*.98,48,48),f=new O(r.neonCyan||"#00d4b0"),p=new he({color:f,wireframe:!0,transparent:!0,opacity:.014,depthTest:!0,depthWrite:!1,side:Bt}),v=new q(l,p);v.renderOrder=0,u.add(v);const T=new he({colorWrite:!1,depthWrite:!0,depthTest:!0,depthFunc:no,side:Bt}),w=new q(d,T);w.renderOrder=1,u.add(w);const y=new he({colorWrite:!1,depthWrite:!0,depthTest:!0,side:Xe}),m=new q(l,y);m.renderOrder=1,u.add(m);const S=new he({color:new O("#010e0b"),transparent:!0,opacity:.72,depthTest:!0,depthWrite:!0,side:wa}),_=new q(l,S);_.renderOrder=1,u.add(_);const b=new he({color:f,wireframe:!0,transparent:!0,opacity:.05,depthTest:!0,depthWrite:!1,side:Xe}),g=new q(l,b);g.renderOrder=2,u.add(g);const x=new he({color:f,wireframe:!0,transparent:!0,opacity:.03,blending:J,depthTest:!0,depthWrite:!1}),D=new q(l,x);D.renderOrder=3,u.add(D);const P=new _e(Re,48,48),ie=new Z({uniforms:{uColor:{value:new I(f.r,f.g,f.b)}},vertexShader:`
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
    `,transparent:!0,blending:J,depthWrite:!1,side:Xe}),ae=new q(P,ie);ae.renderOrder=4,u.add(ae);const z=new Po(h,c.domElement);z.enableDamping=!0,z.dampingFactor=.05,z.autoRotate=t&&!i,z.autoRotateSpeed=.4,z.enablePan=!1,z.minDistance=1.5,z.maxDistance=5,z.minPolarAngle=Math.PI/2-42.5*Math.PI/180,z.maxPolarAngle=Math.PI/2+42.5*Math.PI/180;const k=new Pt(c),He=new It(u,h);k.addPass(He);const re=new ye(new N(e.clientWidth||800,e.clientHeight||600),a*2,.4,.3);k.addPass(re);const Pe=new fe(Jo);k.addPass(Pe);const Me=document.createElement("div");Me.className="s9-threatmap__overlay",Me.innerHTML=`
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tr" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--bl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--br" aria-hidden="true"></div>
    ${ds(o)}
    <div class="s9-threatmap__coords" aria-live="polite">
      <span class="s9-threatmap__coords-lat">LAT: --.-°</span>
      <span class="s9-threatmap__coords-lng">LNG: --.-°</span>
    </div>
    <div class="s9-threatmap__node-count">NODES: 0</div>
  `,e.appendChild(Me);let le=null;z.addEventListener("start",()=>{z.autoRotate=!1,le!==null&&(clearTimeout(le),le=null);const M=H.get(e);M&&(M.cameraLerpTarget=null,M.lastOrbitInteraction=Date.now())}),z.addEventListener("end",()=>{!i&&t&&(le=setTimeout(()=>{z.autoRotate=!0,le=null},6e3))});const L=new ResizeObserver(()=>{const M=e.clientWidth,E=e.clientHeight;!M||!E||(h.aspect=M/E,h.updateProjectionMatrix(),c.setSize(M,E),k.setSize(M,E),re.resolution.set(M,E))});L.observe(e);const R=new io;c.domElement.addEventListener("click",M=>{const E=H.get(e);if(!E)return;const F=c.domElement.getBoundingClientRect(),G=F.width,j=F.height,ce=(M.clientX-F.left)/G*2-1,de=-((M.clientY-F.top)/j)*2+1;R.setFromCamera(new N(ce,de),h);const ue=Array.from(E.nodeMap.values()).map(dt=>dt.mesh),ze=R.intersectObjects(ue,!1);if(ze.length>0){const dt=ze[0].object;Se(e,dt.userData.nodeId)}else E.activeNodeId!==null&&Se(e,null)},{signal:s}),H.set(e,{animFrameId:null,renderer:c,composer:k,bloomPass:re,controls:z,scene:u,camera:h,resizeObserver:L,nodeMap:new Map,edgeMap:new Map,abortController:n,resumeTimer:null,reducedMotion:i,activeNodeId:null,colors:r,cyanColor:f,globeGeo:l,occluderGeo:d,globeBack:v,occluder:w,frontOccluder:m,globeSurface:_,globeFront:g,globeGlow:D,rimGeo:P,rimMesh:ae,geoGroup:null,cameraLerpTarget:null,lastOrbitInteraction:0,arcs:[],satelliteMode:!1,sunAngle:Math.random()*Math.PI*2,satelliteGroup:null,holoPass:Pe,nodeGeo:new _e(.02,8,8),nodeTween:null,deselectTween:null,labelTypewriter:null,coordScrambleLat:null,coordScrambleLng:null,pendingTimers:[],tweenGeneration:0,crosshairShape:o});const me=H.get(e);function ee(){const M=H.get(e);if(M){M.animFrameId=requestAnimationFrame(ee),M.cameraLerpTarget&&Date.now()-M.lastOrbitInteraction>=3e3&&(M.camera.position.lerp(M.cameraLerpTarget,.06),M.camera.position.distanceTo(M.cameraLerpTarget)<.04&&(M.camera.position.copy(M.cameraLerpTarget),M.cameraLerpTarget=null)),M.controls.update();for(let E=M.arcs.length-1;E>=0;E--){const F=M.arcs[E],G=Math.min(1,(Date.now()-F.t0)/F.dur);if(F.particle.position.copy(F.curve.getPoint(G)),G>.75){const j=1-(G-.75)/.25;F.ptMat.opacity=.9*j,F.lineMat.opacity=.1*j}G>=1&&(M.scene.remove(F.line),M.scene.remove(F.particle),F.lineGeo.dispose(),F.lineMat.dispose(),F.ptGeo.dispose(),F.ptMat.dispose(),M.arcs.splice(E,1))}if(M.satelliteMode&&M.satMat){M.sunAngle+=15e-5;const E=performance.now()*.001;M.satMat.uniforms.sunDir.value.set(Math.cos(M.sunAngle),.22,Math.sin(M.sunAngle)).normalize(),M.satMat.uniforms.time.value=E,M.atmMat&&(M.atmMat.uniforms.time.value=E)}if(M.holoPass&&(M.holoPass.uniforms.time.value=performance.now()*.001),M.activeNodeId!==null){const E=M.nodeMap.get(M.activeNodeId),F=e.querySelector(".s9-threatmap__crosshair");if(E&&F){const G=e.clientWidth,j=e.clientHeight,ce=E.mesh.position.clone().project(M.camera),de=(ce.x*.5+.5)*G,ue=(-ce.y*.5+.5)*j;F.style.left=`${de}px`,F.style.top=`${ue}px`}}if(M.nodeTween){const E=M.nodeTween,F=Date.now()-E.t0,G=Math.min(1,F/E.dur),j=G<E.riseFrac?Jt(G/E.riseFrac):ea((G-E.riseFrac)/(1-E.riseFrac)),ce=G<E.riseFrac?1+(E.peakScale-1)*j:E.peakScale-(E.peakScale-1)*j;E.mesh.scale.setScalar(ce);const de=E.flashDur/E.dur,ue=E.settleDur/E.dur;if(G<de)E.mesh.material.color.copy(E.flashColor);else if(G<de+ue){const ze=(G-de)/ue;E.mesh.material.color.lerpColors(E.flashColor,E.selectColor,ta(ze))}else E.mesh.material.color.copy(E.selectColor);G>=1&&(E.mesh.scale.setScalar(1),E.mesh.material.color.copy(E.selectColor),M.nodeTween=null)}if(M.deselectTween){const E=M.deselectTween,F=Date.now()-E.t0,G=Math.min(1,F/E.dur),j=.4,ce=G<j?ea(G/j):Jt((G-j)/(1-j)),de=G<j?1-(1-E.troughScale)*ce:E.troughScale+(1-E.troughScale)*ce;if(E.mesh.scale.setScalar(de),E.mesh.material.color.lerpColors(E.selectColor,E.levelColor,ta(G)),G>=1){E.mesh.scale.setScalar(1),E.mesh.material.color.copy(E.levelColor);const ue=E.element.querySelector(".s9-threatmap__crosshair");ue&&ue.classList.remove("s9-threatmap__crosshair--animating-out"),M.deselectTween=null}}M.composer.render()}}me.animFrameId=requestAnimationFrame(ee),rs(e)}function us(e){var t;return((t=H.get(e))==null?void 0:t.camera)??null}function hs(e,t){const a=H.get(e);if(!a)return;const o=a.edgeMap.get(t);o&&(o.line.geometry.dispose(),o.line.material.dispose(),a.scene.remove(o.line),a.edgeMap.delete(t))}function Fa(e){const t=H.get(e);if(!t)return;const a=e.querySelector(".s9-threatmap__node-count");a&&(a.textContent=`NODES: ${t.nodeMap.size}`)}function Ga(e,{id:t,lat:a,lng:o,label:n,level:s}){const i=H.get(e);if(!i)return;if(i.nodeMap.has(t)){console.warn(`[s9-threatmap] addNode: node "${t}" already exists.`);return}const r=Ee(),c=we(s,r),u=new he({color:new O(c)}),h=new q(i.nodeGeo,u);h.renderOrder=5;const l=wt(a,o);h.position.copy(l),h.userData.nodeId=t,h.userData.label=n,h.userData.lat=a,h.userData.lng=o,h.userData.level=s,i.scene.add(h),i.nodeMap.set(t,{mesh:h,lat:a,lng:o,label:n,level:s}),Fa(e)}function Ba(e,t){const a=H.get(e);if(!a)return;const o=a.nodeMap.get(t);if(!o){console.warn(`[s9-threatmap] removeNode: node "${t}" not found.`);return}a.activeNodeId===t&&Se(e,null);for(const[n,s]of a.edgeMap)(s.from===t||s.to===t)&&hs(e,n);o.mesh.material.dispose(),a.scene.remove(o.mesh),a.nodeMap.delete(t),Fa(e)}function fs(e,t){const a=H.get(e);if(!a||a.reducedMotion)return;const o=a.nodeMap.get(t);if(!o)return;const n=Ee(),s=we(o.level,n),i=20,r=.035,c=[];for(let v=0;v<=i;v++){const T=v/i*Math.PI*2;c.push(new I(Math.cos(T)*r,Math.sin(T)*r,0))}const u=new xe().setFromPoints(c),h=new oe({color:new O(s),transparent:!0,opacity:.8,depthWrite:!1}),l=new Sa(u,h);l.renderOrder=5,l.position.copy(o.mesh.position);const d=o.mesh.position.clone().normalize();l.quaternion.setFromUnitVectors(new I(0,0,1),d),a.scene.add(l);const f=Date.now(),p=700;(function v(){if(!H.get(e)){a.scene.remove(l),u.dispose(),h.dispose();return}const T=Math.min(1,(Date.now()-f)/p);l.scale.setScalar(1+T*6),h.opacity=.85*(1-T),T<1?requestAnimationFrame(v):(a.scene.remove(l),u.dispose(),h.dispose())})()}function ms(e,t,a){const o=H.get(e);if(!o||o.reducedMotion)return;const n=o.nodeMap.get(t),s=o.nodeMap.get(a);if(!n||!s)return;const i=Ee(),r=we(s.level,i),c=n.mesh.position.clone(),u=s.mesh.position.clone(),h=c.clone().add(u).multiplyScalar(.5),l=.2+h.length()*.25,d=h.clone().normalize().multiplyScalar(Re+l),f=new ro(c,d,u),p=new xe().setFromPoints(f.getPoints(48)),v=new oe({color:new O(r),transparent:!0,opacity:.1,depthWrite:!1}),T=new xa(p,v);T.renderOrder=2;const w=new _e(.009,4,4),y=new he({color:new O(r),transparent:!0,opacity:.9}),m=new q(w,y);m.renderOrder=3,m.position.copy(c),o.scene.add(T),o.scene.add(m),o.arcs.push({curve:f,line:T,lineGeo:p,lineMat:v,particle:m,ptGeo:w,ptMat:y,t0:Date.now(),dur:1e3+Math.random()*700})}function ps(e=null){const o=document.createElement("canvas");o.width=2048,o.height=1024;const n=o.getContext("2d"),s=n.createLinearGradient(0,0,0,1024);if(s.addColorStop(0,"#071a2e"),s.addColorStop(.15,"#082035"),s.addColorStop(.5,"#0a2a46"),s.addColorStop(.85,"#082035"),s.addColorStop(1,"#071a2e"),n.fillStyle=s,n.fillRect(0,0,2048,1024),e){const i=os(e,e.objects.land),c=(i.type==="FeatureCollection"?i.features:[i]).flatMap(l=>{const d=l.geometry;return d?d.type==="Polygon"?[d.coordinates]:d.coordinates:[]}),u=n.createLinearGradient(0,0,0,1024);u.addColorStop(0,"#dce8dc"),u.addColorStop(.06,"#8a9c7a"),u.addColorStop(.16,"#527848"),u.addColorStop(.28,"#4e7040"),u.addColorStop(.4,"#4a6c34"),u.addColorStop(.5,"#3a5c24"),u.addColorStop(.6,"#4a6c34"),u.addColorStop(.72,"#4e7040"),u.addColorStop(.84,"#7a8c6a"),u.addColorStop(.92,"#ccd8c4"),u.addColorStop(1,"#eaf0ea");for(const l of c)for(let d=0;d<l.length;d++){const f=l[d];n.beginPath();for(let p=0;p<f.length;p++){const[v,T]=f[p],w=(v+180)/360*2048,y=(90-T)/180*1024;p===0?n.moveTo(w,y):n.lineTo(w,y)}n.closePath(),n.fillStyle=d===0?u:"#0a2a46",n.fill()}const h=[[22,15,16,28,"rgba(172,142, 88,0.72)"],[23,44,8,12,"rgba(178,148, 96,0.68)"],[27,70,5,9,"rgba(182,158,112,0.52)"],[42,100,6,16,"rgba(152,128, 86,0.58)"],[-25,132,10,17,"rgba(168,134, 82,0.58)"],[-22,-68,4,6,"rgba(142,118, 76,0.48)"],[35,-114,5,8,"rgba(158,128, 82,0.42)"],[40,58,5,8,"rgba(158,134, 88,0.45)"]];for(const[l,d,f,p,v]of h){const[T,w]=ke(l,d,2048,1024),y=p/360*2048,m=f/180*1024,S=n.createRadialGradient(T,w,0,T,w,Math.max(y,m)),_=v.replace(/[\d.]+\)$/,"0)");S.addColorStop(0,v),S.addColorStop(.55,v),S.addColorStop(.88,v.replace(/[\d.]+\)$/,"0.08)")),S.addColorStop(1,_),n.fillStyle=S,n.beginPath(),n.ellipse(T,w,y,m,0,0,Math.PI*2),n.fill()}n.strokeStyle="rgba(120,175,210,0.22)",n.lineWidth=.8;for(const l of c){const d=l[0];n.beginPath();for(let f=0;f<d.length;f++){const[p,v]=d[f],T=(p+180)/360*2048,w=(90-v)/180*1024;f===0?n.moveTo(T,w):n.lineTo(T,w)}n.closePath(),n.stroke()}}n.strokeStyle="rgba(100,150,200,0.04)",n.lineWidth=.5;for(let i=-80;i<=80;i+=30){const r=ke(i,0,2048,1024)[1];n.beginPath(),n.moveTo(0,r),n.lineTo(2048,r),n.stroke()}for(let i=-180;i<=180;i+=30){const r=ke(0,i,2048,1024)[0];n.beginPath(),n.moveTo(r,0),n.lineTo(r,1024),n.stroke()}return o}function gs(){const a=document.createElement("canvas");a.width=1024,a.height=512;const o=a.getContext("2d");o.fillStyle="#000810",o.fillRect(0,0,1024,512);const n=[[40.7,-74,4],[34,-118.2,3.5],[41.9,-87.6,3],[29.8,-95.4,2.5],[19.4,-99.1,3],[43.7,-79.4,3],[45.5,-73.6,2.5],[49.3,-123.1,2],[38.9,-77,2.5],[42.4,-71.1,2.5],[32.8,-96.8,2.5],[33.7,-84.4,2],[37.8,-122.4,2.5],[47.6,-122.3,2],[39.7,-105,2],[33.4,-112.1,2],[36.2,-115.1,2],[29.4,-98.5,2],[32.7,-97.1,2],[30.3,-81.7,1.5],[51,-114.1,2],[53.5,-113.5,2],[49.9,-97.1,2],[14.1,-87.2,1.5],[13.7,-89.2,1.5],[-23.5,-46.6,4],[-22.9,-43.2,3.5],[-34.6,-58.4,3.5],[-12,-77,2],[4.7,-74.1,2],[10.5,-66.9,2],[-33.5,-70.7,2.5],[-3.7,-38.5,2],[-8.1,-34.9,2],[-19.9,-43.9,2.5],[-30,-51.2,2],[-15.8,-47.9,2],[51.5,-.1,4],[48.9,2.3,4],[52.5,13.4,3.5],[55.8,37.6,4],[41,28.9,3.5],[59.9,10.8,2],[59.3,18.1,2],[60.2,25,2],[52.2,21,2.5],[50.1,14.4,2.5],[47.5,19,2.5],[48.2,16.4,2.5],[47.4,8.5,2.5],[48.1,11.6,3],[52.4,4.9,3],[40.4,-3.7,3],[41.4,2.2,3],[45.5,9.2,3],[41.9,12.5,3],[37.9,23.7,2.5],[50,8.7,2.5],[51,13.7,2],[51.2,6.8,2.5],[50.9,4.3,2.5],[53.5,-2.2,2],[55.7,12.6,2],[50.5,30.5,2.5],[59.5,30.3,2.5],[48,37.8,2],[46.5,30.7,2],[49.8,24,2],[50.4,30.5,2],[45.4,28,2],[44.4,26.1,2],[42.7,23.3,2],[37.1,-8.6,2],[30.1,31.3,3.5],[25.2,55.3,2.5],[33.3,44.4,2.5],[35.7,51.4,3],[24.7,46.7,2.5],[31.8,35.2,2],[33.9,35.5,2],[36.8,10.2,2],[32.9,13.2,2],[30.7,29.7,2],[6.5,3.4,2.5],[-26.2,28,3],[-33.9,18.4,2],[-1.3,36.8,2],[5.3,-4,2],[14.7,17.4,1.5],[9.1,7.4,2],[4.4,18.6,1.5],[-4.3,15.3,1.5],[-11.7,43.3,1.5],[-18.9,47.5,1.5],[28.6,77.2,4],[19.1,72.9,3.5],[12.9,77.6,3],[23.7,90.4,3],[24.9,67,2.5],[31.6,74.3,2.5],[33.7,73.1,2],[17.4,78.5,2.5],[22.6,88.4,2.5],[13.1,80.3,2.5],[23,72.6,2],[22.3,70.8,2],[26.9,75.8,2],[21.2,81.4,2],[27.7,85.3,2],[41.3,69.2,2],[43.3,76.9,2],[51.2,71.5,1.5],[53.9,27.6,2],[54.7,55.9,2],[56.8,60.6,2],[55,73.4,2],[56,92.9,2],[52.3,104.3,2],[53.7,87.1,2],[62,129.7,1.5],[43.1,131.9,2],[61.8,34.4,2],[35.7,139.7,5],[37.5,127,4],[39.9,116.4,4.5],[31.2,121.5,4.5],[23.1,113.3,4],[22.3,114.2,3.5],[30.6,104.1,3.5],[32.1,118.8,3.5],[30.3,120.2,3],[36.7,117,2.5],[34.3,108.9,2.5],[26,119.3,2.5],[41.8,123.4,2.5],[45.8,126.5,2.5],[34.6,135.5,3.5],[33.6,130.4,3],[1.3,103.8,3.5],[13.7,100.5,2.5],[10.8,106.7,2.5],[14.6,121,2.5],[3.1,101.7,2.5],[6.2,106.8,3],[21,105.8,2],[-6.2,106.8,2.5],[-33.9,151.2,2.5],[-37.8,144.9,2],[-27.5,153,2],[-31.9,115.9,2],[-43.5,172.6,1.5]];for(const[s,i,r]of n){const[c,u]=ke(s,i,1024,512),h=r*2.2,l=o.createRadialGradient(c,u,0,c,u,h);l.addColorStop(0,"rgba(255,210,120,0.22)"),l.addColorStop(.5,"rgba(255,170,60,0.08)"),l.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=l,o.beginPath(),o.arc(c,u,h,0,Math.PI*2),o.fill()}o.globalCompositeOperation="lighter";for(const[s,i,r]of n){const[c,u]=ke(s,i,1024,512),h=Math.max(1,r*.9),l=o.createRadialGradient(c,u,0,c,u,h);l.addColorStop(0,`rgba(255,245,200,${Math.min(.9,.5+r*.1)})`),l.addColorStop(.6,"rgba(255,200,100,0.15)"),l.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=l,o.beginPath(),o.arc(c,u,h,0,Math.PI*2),o.fill()}return o.globalCompositeOperation="source-over",a}function oa(e){return new Promise((t,a)=>{new Ta().load(e,t,void 0,a)})}async function vs(e){const t=H.get(e);if(!t||t.satelliteGroup)return;let a,o,n=1;try{[a,o]=await Promise.all([oa("/textures/earth_day.jpg"),oa("/textures/earth_night.jpg")]),a.colorSpace=Ht,o.colorSpace=Ht}catch(d){console.warn("[s9-threatmap] satellite textures not found, using procedural fallback",d);let f=Qo();if(!f)try{const p=await fetch("/data/countries-110m.json");p.ok&&(f=await p.json(),Na(f))}catch{}a=new zt(ps(f)),o=new zt(gs()),n=0}const s=new Z({uniforms:{dayMap:{value:a},nightMap:{value:o},sunDir:{value:new I(Math.cos(t.sunAngle),.22,Math.sin(t.sunAngle)).normalize()},realTex:{value:n},time:{value:0}},vertexShader:`
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
    `}),i=new _e(Re,128,64),r=new q(i,s);r.renderOrder=0;const c=new _e(Re*1.055,64,32),u=new Z({uniforms:{glowCol:{value:new O(51455)},sunDir:{value:s.uniforms.sunDir.value},time:{value:0}},vertexShader:`
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
    `,side:Xe,blending:J,transparent:!0,depthWrite:!1}),h=new q(c,u);h.renderOrder=1;const l=new ya;l.add(r),l.add(h),l.visible=!1,t.scene.add(l),Object.assign(t,{satelliteGroup:l,satGeo:i,satMat:s,atmGeo:c,atmMat:u,dayTex:a,nightTex:o})}async function bs(e,t){const a=H.get(e);a&&(t?(a.globeBack&&(a.globeBack.visible=!1),a.occluder&&(a.occluder.visible=!1),a.frontOccluder&&(a.frontOccluder.visible=!1),a.globeFront&&(a.globeFront.visible=!1),a.globeSurface&&(a.globeSurface.visible=!1),a.globeGlow&&(a.globeGlow.visible=!1),a.rimMesh&&(a.rimMesh.visible=!1),a.geoGroup&&(a.geoGroup.visible=!1),a.bloomPass&&(a._bloomPrev={strength:a.bloomPass.strength,threshold:a.bloomPass.threshold,radius:a.bloomPass.radius},a.bloomPass.strength=.32,a.bloomPass.threshold=.85,a.bloomPass.radius=.35),a.satelliteMode=!0,await vs(e),a.satelliteGroup&&(a.satelliteGroup.visible=!0)):(a.satelliteGroup&&(a.satelliteGroup.visible=!1),a.globeBack&&(a.globeBack.visible=!0),a.occluder&&(a.occluder.visible=!0),a.frontOccluder&&(a.frontOccluder.visible=!0),a.globeFront&&(a.globeFront.visible=!0),a.globeSurface&&(a.globeSurface.visible=!0),a.globeGlow&&(a.globeGlow.visible=!0),a.rimMesh&&(a.rimMesh.visible=!0),a.geoGroup&&(a.geoGroup.visible=!0),a.bloomPass&&a._bloomPrev&&(a.bloomPass.strength=a._bloomPrev.strength,a.bloomPass.threshold=a._bloomPrev.threshold,a.bloomPass.radius=a._bloomPrev.radius),a.satelliteMode=!1))}function sa(e){const t=H.get(e);if(!t)return;const a=Ee(!0);t.colors=a;const o=a.neonCyan||"#00d48ddf";t.globeBack&&t.globeBack.material.color.set(o),t.globeFront&&t.globeFront.material.color.set(o),t.geoGroup&&t.geoGroup.traverse(n=>{n.isLine&&n.material.color.set(a.neonCyan||"#008410D0")});for(const n of t.nodeMap.values()){const s=we(n.level,a);n.mesh.material.color.set(s),n.mesh.material.emissive.set(s)}}const ys=new WeakMap;function _s(e){const t=new AbortController;ys.set(e,t),e.classList.add("s9-panel--booting"),e.addEventListener("animationend",a=>{a.animationName==="crt-flicker"&&(e.classList.remove("s9-panel--booting"),e.dispatchEvent(new CustomEvent("s9:panel-mount",{bubbles:!0,detail:{id:e.dataset.s9Id??null}})))},{signal:t.signal,once:!0})}const pt=["complete","active","failed","pending"];function ws(e,t){if(!pt.includes(t)){console.warn(`[s9-sequence] Unknown state: "${t}". Expected one of: ${pt.join(", ")}.`);return}pt.forEach(a=>e.classList.remove(`s9-sequence__entry--${a}`)),t==="failed"?(e.classList.add("s9-sequence__entry--fail-flash"),e.addEventListener("animationend",()=>{e.classList.remove("s9-sequence__entry--fail-flash"),e.classList.add("s9-sequence__entry--failed"),na(e,t)},{once:!0})):(e.classList.add(`s9-sequence__entry--${t}`),na(e,t))}function na(e,t){e.dispatchEvent(new CustomEvent("s9:sequence-step-change",{bubbles:!0,detail:{state:t}}))}const Ss={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new N(1/1024,1/512)}},vertexShader:`

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

		}`},xs=[..."アウエオカキケコサシスセソタツテナニヌネ",..."ハヒホマミムメモヤヨラリワー",..."012345789z",...':."*+<>|¦╌▪꞊'],Ts=8,Es=8,Ha=`
// Stable hash — keeps inputs small with fract() to avoid GPU sin() precision issues
float h2(vec2 v) {
  vec2 s = fract(v * vec2(0.1031, 0.1030));
  s += dot(s, s.yx + 33.33);
  return fract((s.x + s.y) * s.x);
}
`,Ms={uniforms:{tDiffuse:{value:null},tPrev:{value:null},decay:{value:.88}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},As={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.42},scanlineOpacity:{value:.045},aberrationAmt:{value:.0025}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},Cs={uniforms:{tDiffuse:{value:null},uTime:{value:0},uHeatAmt:{value:.004},uHeatFreq:{value:60},uHeatSpeed:{value:3.5}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},Ds={uniforms:{tDiffuse:{value:null},uTime:{value:0},uStreakAmt:{value:.055},uAspect:{value:1.78}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},ia=600,Je=120,Ls=.12,Rs=.08,Ps=16,ra=3.5,Is=8;function Os(e){const t=new Ta().load(e);return t.flipY=!1,t.minFilter=ho,t.magFilter=fo,t.colorSpace=mo,t.generateMipmaps=!0,{tex:t,count:xs.length}}function Ns(){const e=new po,t=new Ge(1,1);e.index=t.index.clone(),e.setAttribute("position",t.getAttribute("position").clone()),e.setAttribute("uv",t.getAttribute("uv").clone()),t.dispose();const a=ia*Je,o=new Float32Array(a),n=new Float32Array(a),s=new Float32Array(a*4),i=new Float32Array(a*4);for(let r=0;r<ia;r++){const c=Math.random()*Math.PI*2,u=1-2*Math.random(),h=Math.sqrt(1-u*u),l=Math.pow(Math.random(),.12),d=ra+l*(Is-ra),f=h*Math.cos(c)*d,p=h*Math.sin(c)*d,T=u*d+(Math.random()-.5)*2,w=.4+Math.random()*1.87,y=Math.random(),m=.5+Math.random()*1,S=.18+Math.random()*.72,_=.015+Math.random()*.035;for(let b=0;b<Je;b++){const g=r*Je+b;o[g]=r,n[g]=b;const x=g*4;s[x]=f,s[x+1]=p,s[x+2]=w,s[x+3]=y,i[x]=T,i[x+1]=m,i[x+2]=S,i[x+3]=_}}return e.setAttribute("aColIdx",new ge(o,1)),e.setAttribute("aRowIdx",new ge(n,1)),e.setAttribute("aColA",new ge(s,4)),e.setAttribute("aColB",new ge(i,4)),e.instanceCount=a,e}const Us=`
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

${Ha}

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
`,ks=`
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

${Ha}

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
`,Fs={uniforms:{tDiffuse:{value:null},uBlurStrength:{value:.006}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},it=new Map;function Gs(e,t={}){it.has(e)&&la(e);const a=e.querySelector("canvas[data-matrix-rain]");a&&a.remove();const{color:o="#00ff70",opacity:n=.82,syncCamera:s=null}=t,i=new O(o),r=Os("/data/matrixcode_msdf.png"),c=new Ct({antialias:!1,alpha:!0});c.setPixelRatio(Math.min(window.devicePixelRatio,2)),c.setSize(e.clientWidth||1,e.clientHeight||1);const u=c.domElement;u.dataset.matrixRain="1",u.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;",e.appendChild(u);const h=new Dt,l=new _a(45,(e.clientWidth||1)/(e.clientHeight||1),.1,60);l.position.set(0,0,3),l.lookAt(0,0,0);const d=Ns(),f={uGlyphTex:{value:r.tex},uGlyphCount:{value:r.count},uAtlasCols:{value:Ts},uAtlasGrid:{value:Es},uTime:{value:0},uCellW:{value:Ls},uCellH:{value:Rs},uWorldH:{value:Ps},uNRows:{value:Je},uColor:{value:new I(i.r,i.g,i.b)},uGlobalAlpha:{value:n},uDepth:{value:.04},uPomSteps:{value:6},uNormalStrength:{value:6},uLightDir:{value:new I(-.4,.8,.5).normalize()},uGlobeInteract:{value:1},uGlyphChroma:{value:1}},p=new Z({uniforms:f,vertexShader:Us,fragmentShader:ks,transparent:!0,depthWrite:!1,blending:uo,blendEquation:co,blendSrc:We,blendDst:We,blendEquationAlpha:lo,blendSrcAlpha:We,blendDstAlpha:We,side:wa,extensions:{derivatives:!0}}),v=new q(d,p);v.frustumCulled=!1,v.renderOrder=1,h.add(v);const T=e.clientWidth||1,w=e.clientHeight||1,y=new Pt(c);y.addPass(new It(h,l));const m=new ye(new N(T,w),1.15,.45,.2);y.addPass(m);const S=new fe(Cs);S.enabled=!0,y.addPass(S);const _=c.getDrawingBufferSize(new N);let b=new Wt(_.x,_.y);const g=new fe(Ms);g.uniforms.tPrev.value=b;const x=g.render.bind(g);g.render=function(L,R,me,ee,M){this.uniforms.tPrev.value=b,x(L,R,me,ee,M),L.copyFramebufferToTexture(b)},y.addPass(g);const D=new fe(Fs);D.enabled=!0,D.uniforms.uBlurStrength.value=.002,y.addPass(D);const P=new fe(Ds);P.enabled=!0,P.uniforms.uAspect.value=(e.clientWidth||1)/(e.clientHeight||1),y.addPass(P);const ie=new fe(As);y.addPass(ie);const ae=new fe(Ss),z=c.getPixelRatio();ae.uniforms.resolution.value.set(1/((e.clientWidth||1)*z),1/((e.clientHeight||1)*z)),y.addPass(ae);const k={renderer:c,composer:y,bloomPass:m,heatPass:S,softenPass:D,phosphorPass:g,phosphorTex:b,holoPass:ie,streakPass:P,fxaaPass:ae,material:p,geom:d,atlas:r,ro:null,animId:0,syncCamera:s,burstBloomEnabled:!0};it.set(e,k);let He=0,re=0,Pe=-1;function Me(L){k.animId=requestAnimationFrame(Me);const R=L*.001,me=R-He;if(He=R,f.uTime.value=R,ie.uniforms.time.value=R,S.uniforms.uTime.value=R,P.uniforms.uTime.value=R,k.burstBloomEnabled){const ee=Math.floor(R/4);if(ee!==Pe&&(Pe=ee,re=.3),re>0){re=Math.max(0,re-me);const M=1-re/.3;m.threshold=M<.2?yt.lerp(.2,.1,M/.2):yt.lerp(.1,.2,(M-.2)/.8)}else m.threshold=.2}else m.threshold=.2;if(k.syncCamera&&(l.position.copy(k.syncCamera.position),l.quaternion.copy(k.syncCamera.quaternion),l.fov=k.syncCamera.fov,l.near=k.syncCamera.near,l.far=k.syncCamera.far,l.updateProjectionMatrix()),l.position.lengthSq()>.001){const ee=Math.atan2(l.position.x,l.position.z)+Math.PI/3;f.uLightDir.value.set(Math.sin(ee)*.6,.8,Math.cos(ee)*.6).normalize()}k.composer.render()}k.animId=requestAnimationFrame(Me);let le=!1;return k.ro=new ResizeObserver(()=>{le||(le=!0,requestAnimationFrame(()=>{le=!1;const L=e.clientWidth||1,R=e.clientHeight||1;c.setSize(L,R),k.composer.setSize(L,R),k.bloomPass.resolution.set(L,R);const me=c.getPixelRatio();k.fxaaPass.uniforms.resolution.value.set(1/(L*me),1/(R*me)),k.streakPass.uniforms.uAspect.value=L/R,l.aspect=L/R,l.updateProjectionMatrix();const ee=c.getDrawingBufferSize(new N);k.phosphorTex.dispose(),b=new Wt(ee.x,ee.y),k.phosphorTex=b}))}),k.ro.observe(e),{destroy(){la(e)},setColor(L){const R=new O(L);f.uColor.value.set(R.r,R.g,R.b)},setOpacity(L){f.uGlobalAlpha.value=L},setDepth(L){f.uDepth.value=L},setNormalStrength(L){f.uNormalStrength.value=L},setSoften(L,R){D.enabled=L,R!==void 0&&(D.uniforms.uBlurStrength.value=R)},setHeat(L,R){S.enabled=L,R!==void 0&&(S.uniforms.uHeatAmt.value=R)},setStreaks(L,R){P.enabled=L,R!==void 0&&(P.uniforms.uStreakAmt.value=R)},setBurstBloom(L){k.burstBloomEnabled=L},setGlobeInteract(L){f.uGlobeInteract.value=L?1:0},setGlyphChroma(L,R){f.uGlyphChroma.value=L?R??1:0}}}function la(e){const t=it.get(e);t&&(cancelAnimationFrame(t.animId),t.ro.disconnect(),t.holoPass&&t.holoPass.material.dispose(),t.phosphorPass&&t.phosphorPass.material.dispose(),t.phosphorTex&&t.phosphorTex.dispose(),t.composer.dispose(),t.material.dispose(),t.geom.dispose(),t.atlas.tex.dispose(),t.renderer.dispose(),t.renderer.domElement.remove(),it.delete(e))}const za=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Bs=`
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
}`,Hs=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,zs=`
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
}`,Ws=`
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
}`,$s=`
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
}`,Vs=`
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
}`,qs=`
varying vec2 vUv;
uniform vec3  uColor;
uniform float uIntensity;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float glow = exp(-r * r * 8.0) * uIntensity;
  if (glow < 0.005) discard;
  gl_FragColor = vec4(uColor * glow, glow * 0.6);
}`,js={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.38},scanlineOpacity:{value:.07},aberrationAmt:{value:.001}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},B=Math.PI*2,ne=32,et=new WeakMap;let Ys=0;function Ks(){return`T-${String(++Ys).padStart(2,"0")}`}function Ne(e){return getComputedStyle(document.documentElement).getPropertyValue(e).trim()}function ve(e){const t=new O().setStyle(e||"#000000");return[t.r,t.g,t.b]}function rt(e,t,a){return e+(t-e)*Math.max(0,Math.min(1,a))}function Xs(e,t){const a=((e-t)%B+B)%B;return a>Math.PI?a-B:a}function Wa(){return{neonCyan:Ne("--neon-cyan")||"#00f0ff",neonGreen:Ne("--neon-green")||"#00ff9d",neonAlert:Ne("--neon-alert")||"#ff00cc",neonWarn:Ne("--neon-warn")||"#ffb300",voidColor:Ne("--void")||"#05080f"}}function ca(e,t){const a=e.ringHzBase;return t==="friendly"?a*.6:t==="hostile"?a*1.5:a}function Zs(e){const t=rt(.1,.85,e),a=rt(.3,.05,e),o=Math.random();return o<t?"hostile":o<t+a?"friendly":"neutral"}function Qs(e){return e==="friendly"?0:e==="neutral"?1:e==="hostile"?2:3}let Ue=null,St=!1;function Js(e=.08){if(!St)try{Ue||(Ue=new Audio("/sonar-ping.mp3")),Ue.volume=Math.min(1,Math.max(0,e)),Ue.currentTime=0,Ue.play().catch(()=>{})}catch{}}function en(){St=!St}function tn(e){const a=new Float32Array(192);for(let n=0;n<64;n++){const s=n/64*B;a[n*3]=Math.sin(s)*e,a[n*3+1]=Math.cos(s)*e,a[n*3+2]=0}const o=new xe;return o.setAttribute("position",new lt(a,3)),o}function an(e){const a=new Float32Array(192);for(let n=0;n<32;n++){const s=n/32*B,i=n%8===0?e*.92:e*.96,r=n*6;a[r]=Math.sin(s)*i,a[r+1]=Math.cos(s)*i,a[r+2]=0,a[r+3]=Math.sin(s)*e,a[r+4]=Math.cos(s)*e,a[r+5]=0}const o=new xe;return o.setAttribute("position",new lt(a,3)),o}function on(e){const{scene:t,R:a,theme:o}=e;e.backgroundMesh&&(e.backgroundMesh.geometry.dispose(),e.backgroundMesh.material.dispose(),t.remove(e.backgroundMesh));const n=new O(o.voidColor),s=new Ge(a*2,a*2),i=new Z({vertexShader:za,fragmentShader:Bs,uniforms:{uVoidColor:{value:new I(n.r,n.g,n.b)},uTime:{value:0}},transparent:!0,depthWrite:!0,blending:go}),r=new q(s,i);r.renderOrder=0,t.add(r),e.backgroundMesh=r}function sn(e){const{scene:t,R:a,theme:o}=e;e.centerGlowMesh&&(e.centerGlowMesh.geometry.dispose(),e.centerGlowMesh.material.dispose(),t.remove(e.centerGlowMesh));const n=new O(o.neonCyan),s=a*.5,i=new Ge(s,s),r=new Z({vertexShader:za,fragmentShader:qs,uniforms:{uColor:{value:new I(n.r,n.g,n.b)},uIntensity:{value:0}},transparent:!0,depthWrite:!1,blending:J}),c=new q(i,r);c.renderOrder=6,t.add(c),e.centerGlowMesh=c}function nn(e){const{scene:t,R:a,theme:o}=e;e.ringMeshes&&(e.ringMeshes.forEach(u=>{u.geometry.dispose(),t.remove(u)}),e.matRingInner&&e.matRingInner.dispose(),e.matRingOuter&&e.matRingOuter.dispose()),e.ticksMesh&&(e.ticksMesh.geometry.dispose(),e.matRingTicks&&e.matRingTicks.dispose(),t.remove(e.ticksMesh));const n=new oe({color:new O(o.neonCyan),opacity:.18,transparent:!0,depthWrite:!1,blending:J}),s=new oe({color:new O(o.neonCyan),opacity:.28,transparent:!0,depthWrite:!1,blending:J}),i=new oe({color:new O(o.neonCyan),opacity:.22,transparent:!0,depthWrite:!1,blending:J}),r=[.2,.4,.6,.8,1];e.ringMeshes=r.map((u,h)=>{const l=new Sa(tn(u*a),h<4?n:s);return l.renderOrder=1,t.add(l),l});const c=new Ce(an(a),i);c.renderOrder=1,t.add(c),e.ticksMesh=c,e.matRingInner=n,e.matRingOuter=s,e.matRingTicks=i}function rn(e){const{scene:t,R:a,theme:o}=e;e.sweepTrailMesh&&(e.sweepTrailMesh.geometry.dispose(),e.sweepTrailMesh.material.dispose(),t.remove(e.sweepTrailMesh)),e.sweepArmLine&&(e.sweepArmLine.geometry.dispose(),e.sweepArmLine.material.dispose(),t.remove(e.sweepArmLine));const n=new O(o.neonCyan),s=new I(n.r,n.g,n.b),i=new Ge(a*2,a*2),r=new Z({vertexShader:Hs,fragmentShader:zs,uniforms:{uAngle:{value:e.sweepAngle},uArcWidth:{value:Math.PI*.6},uColor:{value:s.clone()},uStaticAmt:{value:1}},transparent:!0,depthWrite:!1,blending:J}),c=new q(i,r);c.renderOrder=2,t.add(c),e.sweepTrailMesh=c;const u=new Float32Array([0,0,0,Math.sin(e.sweepAngle)*a,Math.cos(e.sweepAngle)*a,0]),h=new xe;h.setAttribute("position",new lt(u,3));const l=new oe({color:new O(o.neonCyan),opacity:.9,transparent:!0,depthWrite:!1,blending:J}),d=new xa(h,l);d.renderOrder=3,t.add(d),e.sweepArmLine=d}function ln(e){const{scene:t,theme:a}=e;e.contactDotsMesh&&(e.contactDotsMesh.geometry.dispose(),e.contactDotsMesh.material.dispose(),t.remove(e.contactDotsMesh)),e.contactRingsMesh&&(e.contactRingsMesh.geometry.dispose(),e.contactRingsMesh.material.dispose(),t.remove(e.contactRingsMesh));const o=ve(a.neonGreen),n=ve(a.neonWarn),s=ve(a.neonAlert),i=ve(a.neonCyan);function r(h,l,d){const f=new Ge(1,1),p=new ge(new Float32Array(ne).fill(0),1),v=new ge(new Float32Array(ne).fill(1),1),T=new ge(new Float32Array(ne).map(()=>Math.random()),1),w=new ge(new Float32Array(ne).fill(0),1);p.setUsage(Ie),v.setUsage(Ie),T.setUsage(Ie),w.setUsage(Ie),f.setAttribute("a_type",p),f.setAttribute("a_age",v),f.setAttribute("a_phase",T),f.setAttribute("a_sweepFade",w);const y=new Z({vertexShader:Ws,fragmentShader:h,uniforms:l,transparent:!0,depthWrite:!1,blending:J}),m=new vo(f,y,ne);m.renderOrder=d,m.instanceMatrix.setUsage(Ie);const S=new Ea;S.scale.setScalar(0),S.updateMatrix();for(let _=0;_<ne;_++)m.setMatrixAt(_,S.matrix);return m.instanceMatrix.needsUpdate=!0,t.add(m),m}const c={uC0:{value:new I(...o)},uC1:{value:new I(...n)},uC2:{value:new I(...s)},uC3:{value:new I(...i)}},u={uC0:{value:new I(...o)},uC1:{value:new I(...n)},uC2:{value:new I(...s)}};e.contactDotsMesh=r($s,c,5),e.contactRingsMesh=r(Vs,u,4)}function cn(e){const{element:t,overlay:a,R:o}=e,n=t.clientWidth/2,s=t.clientHeight/2;e.staticLabelEls.forEach(h=>h.remove()),e.staticLabelEls=[];const i=[2,4,6,8];[.2,.4,.6,.8].forEach((h,l)=>{const d=document.createElement("span");d.className="s9-radar__ring-label",d.textContent=`${i[l]}km`,d.style.left=`${n+h*o+4}px`,d.style.top=`${s}px`,d.style.transform="translateY(-50%)",a.appendChild(d),e.staticLabelEls.push(d)});const c=[["N",0],["NE",B*.125],["E",B*.25],["SE",B*.375],["S",B*.5],["SW",B*.625],["W",B*.75],["NW",B*.875]],u=o*1.05;c.forEach(([h,l])=>{const d=document.createElement("span");d.className="s9-radar__cardinal-label",d.textContent=h,d.style.left=`${n+Math.sin(l)*u}px`,d.style.top=`${s-Math.cos(l)*u}px`,d.style.transform="translate(-50%, -50%)",a.appendChild(d),e.staticLabelEls.push(d)})}function dn(e){on(e),sn(e),nn(e),rn(e),cn(e),e.contactDotsMesh?un(e):ln(e)}function un(e){const{contacts:t,dummy:a,contactDotsMesh:o,contactRingsMesh:n,R:s}=e;!o||!n||(t.forEach((i,r)=>{if(!i)a.scale.setScalar(0),a.position.set(0,0,0),a.updateMatrix(),o.setMatrixAt(r,a.matrix),n.setMatrixAt(r,a.matrix);else{const c=i.age<.08?rt(0,8,i.age/.08):8;a.position.set(Math.sin(i.angle)*i.range*s,Math.cos(i.angle)*i.range*s,0),a.scale.setScalar(c),a.updateMatrix(),o.setMatrixAt(r,a.matrix),a.scale.setScalar(c>0?s*1.5:0),a.updateMatrix(),n.setMatrixAt(r,a.matrix)}}),o.instanceMatrix.needsUpdate=!0,n.instanceMatrix.needsUpdate=!0)}function xt(e,t){const a=e.contacts[t];a&&(a.labelEl&&(a.labelEl.remove(),a.labelEl=null),e.contactDotsMesh&&e.contactRingsMesh&&(e.dummy.scale.setScalar(0),e.dummy.position.set(0,0,0),e.dummy.updateMatrix(),e.contactDotsMesh.setMatrixAt(t,e.dummy.matrix),e.contactRingsMesh.setMatrixAt(t,e.dummy.matrix),e.contactDotsMesh.instanceMatrix.needsUpdate=!0,e.contactRingsMesh.instanceMatrix.needsUpdate=!0),e.contacts[t]=null)}function Nt(e,t,a,o,n){var T;const s=e.opts.maxContacts;if(e.contacts.filter(Boolean).length>=s){let w=-1,y=-1;for(let m=0;m<ne;m++)((T=e.contacts[m])==null?void 0:T.type)==="ghost"&&e.contacts[m].age>y&&(w=m,y=e.contacts[m].age);if(w>=0)xt(e,w);else return console.warn("[pulse-radar] contact pool full"),null}let r=-1;for(let w=0;w<ne;w++)if(!e.contacts[w]){r=w;break}if(r<0)return null;const c=o==="ghost",u=(t%B+B)%B,h=Math.max(0,Math.min(1,a)),l=Math.sin(u)*h,d=Math.cos(u)*h,f=c?0:.01+Math.random()*.025,p=Math.random()*B,v={id:n||Ks(),angle:u,range:h,wx:l,wy:d,wvx:c?0:Math.sin(p)*f,wvy:c?0:Math.cos(p)*f,type:o,age:c?.85:0,maxAge:c?3e3:8e3+Math.random()*1e4,bornAt:performance.now(),phase:c?Math.random()*.3:1,lastSweep:-1/0,ghostAngle:null,ghostRange:null,ghostSpawned:!1,instIdx:r,labelEl:null,sweepAlpha:c?.15:1,fadeTimeMs:4200*(.88+Math.random()*.24),revealed:c,revealTime:c?performance.now():null};if(!c){const w=document.createElement("span");w.className=`s9-radar__label s9-radar__label--${o}`,w.textContent=o==="hostile"?`${v.id} ⚠HC`:v.id,e.labelsDiv.appendChild(w),v.labelEl=w}return e.contacts[r]=v,v}function tt(e){if(e.destroyed||e.reducedMotion)return;const t=Math.max(.05,e.opts.contactDensity),a=rt(3e3,600,e.threatLevel)/t,o=(Math.random()-.5)*a*.4,n=Math.max(200,a+o);e.spawnTimer=setTimeout(()=>{!e.destroyed&&!e.reducedMotion&&(hn(e),tt(e))},n)}function hn(e){const t=e.contacts.filter(s=>s&&s.type!=="ghost"),a=t.length>0&&Math.random()<.3,o=e.sweepAngle;let n;if(a){const s=t[Math.floor(Math.random()*t.length)];n=Math.max(.15,Math.min(.97,s.range+(Math.random()-.5)*.3))}else n=.15+Math.random()*.82;Nt(e,o,n,Zs(e.threatLevel))}function fn(e,t){if(e.reducedMotion)return;const a=e.sweepAngle;e.sweepAngle=(e.sweepAngle+e.sweepSpeed*t/1e3)%B,e.sweepAngle<a&&(Js(.06),e.centerGlowIntensity=1),e.centerGlowIntensity>0&&(e.centerGlowIntensity*=Math.pow(.001,t/600),e.centerGlowIntensity<.005&&(e.centerGlowIntensity=0),e.centerGlowMesh&&(e.centerGlowMesh.material.uniforms.uIntensity.value=e.centerGlowIntensity));const o=performance.now();if(e.staticNextAt===null&&(e.staticNextAt=o+7e3+Math.random()*5e3),o>=e.staticNextAt&&!e.staticActive&&(e.staticActive=!0,e.staticEndAt=o+60+Math.random()*40,e.staticNextAt=e.staticEndAt+6e3+Math.random()*4e3),e.staticActive&&(e.sweepTrailMesh.material.uniforms.uStaticAmt.value=.5+Math.random()*.5,o>=e.staticEndAt&&(e.staticActive=!1,e.sweepTrailMesh.material.uniforms.uStaticAmt.value=1)),e.sweepTrailMesh&&(e.sweepTrailMesh.material.uniforms.uAngle.value=e.sweepAngle),e.sweepArmLine){const{R:n}=e,s=e.sweepArmLine.geometry.attributes.position;s.setXYZ(0,0,0,0),s.setXYZ(1,Math.sin(e.sweepAngle)*n,Math.cos(e.sweepAngle)*n,0),s.needsUpdate=!0}}function mn(e,t){const{contacts:a,sweepAngle:o}=e,n=e.now;a.forEach((s,i)=>{if(s){if(s.type!=="ghost"&&(s.wx+=s.wvx*t/1e3,s.wy+=s.wvy*t/1e3,Math.hypot(s.wx,s.wy)>1.02)){xt(e,i);return}if(s.age+=t/s.maxAge,s.type!=="ghost"&&!e.reducedMotion){const r=(Math.atan2(s.wx,s.wy)%B+B)%B;Math.abs(Xs(o,r))<.12&&n-s.lastSweep>800&&(s.angle=r,s.range=Math.hypot(s.wx,s.wy),s.phase=0,s.lastSweep=n,s.sweepAlpha=1,s.revealed||(s.revealed=!0,s.revealTime=n))}if(s.type!=="ghost"){if(s.phase<1){const r=s.age>.65&&s.age<.85;s.phase=Math.min(1,s.phase+ca(e,s.type)*(r?.5:1)*t/1e3)}}else s.phase+=ca(e,"neutral")*t/1e3;if(s.type!=="ghost"&&s.revealed){const r=.05+.1*s.range,c=n-s.lastSweep,u=Math.min(1,c/s.fadeTimeMs);s.sweepAlpha=r+(1-r)*Math.pow(1-u,1.025)}s.type!=="ghost"&&!s.ghostSpawned&&s.age>=.65&&s.revealed&&(s.ghostAngle=s.angle,s.ghostRange=s.range,s.ghostSpawned=!0,Nt(e,s.ghostAngle,s.ghostRange,"ghost")),s.age>=1&&xt(e,i)}})}function pn(e){const{contacts:t,dummy:a,contactDotsMesh:o,contactRingsMesh:n,R:s}=e;if(!o||!n)return;let i=!1;t.forEach((r,c)=>{if(!r)return;i=!0;let u;r.revealed?u=Math.min(1,(e.now-r.revealTime)/300)*8:u=0;const h=Math.sin(r.angle)*r.range*s,l=Math.cos(r.angle)*r.range*s;a.position.set(h,l,0),a.scale.setScalar(u),a.updateMatrix(),o.setMatrixAt(c,a.matrix),a.scale.setScalar(u>0?s*1.5:0),a.updateMatrix(),n.setMatrixAt(c,a.matrix);const d=Qs(r.type);o.geometry.attributes.a_type.setX(c,d),o.geometry.attributes.a_age.setX(c,r.age),o.geometry.attributes.a_phase.setX(c,r.phase),o.geometry.attributes.a_sweepFade.setX(c,r.sweepAlpha),n.geometry.attributes.a_type.setX(c,d),n.geometry.attributes.a_age.setX(c,r.age),n.geometry.attributes.a_phase.setX(c,r.phase),n.geometry.attributes.a_sweepFade.setX(c,r.sweepAlpha)}),i&&(o.instanceMatrix.needsUpdate=!0,n.instanceMatrix.needsUpdate=!0,o.geometry.attributes.a_type.needsUpdate=!0,o.geometry.attributes.a_age.needsUpdate=!0,o.geometry.attributes.a_phase.needsUpdate=!0,o.geometry.attributes.a_sweepFade.needsUpdate=!0,n.geometry.attributes.a_type.needsUpdate=!0,n.geometry.attributes.a_age.needsUpdate=!0,n.geometry.attributes.a_phase.needsUpdate=!0,n.geometry.attributes.a_sweepFade.needsUpdate=!0)}function gn(e){const{contacts:t,element:a,R:o}=e,n=a.clientWidth/2,s=a.clientHeight/2;t.forEach(i=>{if(!(i!=null&&i.labelEl))return;if(!i.revealed){i.labelEl.style.opacity="0";return}const r=n+Math.sin(i.angle)*i.range*o,c=s-Math.cos(i.angle)*i.range*o;i.labelEl.style.left=`${r+7}px`,i.labelEl.style.top=`${c-6}px`,i.labelEl.style.opacity=String(i.sweepAlpha)})}function vn(e){if(!e.footerEl)return;const t=e.contacts.filter(o=>o&&o.type!=="ghost").length,a=(B/e.sweepSpeed).toFixed(1);e.footerEl.textContent=`CONTACTS: ${t} | SWEEP: ${a}s`}function Tt(e,t){if(e.destroyed||!e.rafRunning){e.rafId=null;return}const a=Math.min(t-(e.lastTs??t),100);e.lastTs=t,e.now=t,e.R>0&&(e.backgroundMesh&&(e.backgroundMesh.material.uniforms.uTime.value=t/1e3),e.holoPass&&(e.holoPass.uniforms.time.value=t/1e3),fn(e,a),mn(e,a),pn(e),gn(e),vn(e),e.composer.render()),e.rafId=requestAnimationFrame(o=>Tt(e,o))}function bn(e,t={}){if(et.has(e)){console.warn("[pulse-radar] already initialised");const _=et.get(e);return{setRadarThreatLevel:_.setRadarThreatLevel,injectContact:_.injectContact}}const a={sweepPeriod:2690,contactDensity:Math.max(0,Math.min(1,t.contactDensity??.5)),threatLevel:Math.max(0,Math.min(1,t.threatLevel??0)),primaryColor:t.primaryColor??null,maxContacts:Math.max(4,Math.min(ne,t.maxContacts??16))},o=Wa(),n=document.createElement("canvas");n.className="s9-radar__canvas";const s=document.createElement("div");s.className="s9-radar__overlay";const i=document.createElement("div");i.className="s9-radar__labels",s.appendChild(i),e.appendChild(n),e.appendChild(s),e.style.cursor="pointer",e.addEventListener("click",()=>{en()});let r;try{r=new Ct({canvas:n,antialias:!0,alpha:!1,premultipliedAlpha:!1})}catch(_){return console.error("[pulse-radar] WebGL context creation failed",_),n.remove(),s.remove(),{setRadarThreatLevel:()=>{},injectContact:()=>""}}r.setClearColor(new O(o.voidColor),1),r.setPixelRatio(Math.min(devicePixelRatio,2));const c=new Dt,u=new ba(-1,1,1,-1,.1,100);u.position.z=10;const h=new Pt(r);h.addPass(new It(c,u));const l=new ye(new N(e.clientWidth||200,e.clientHeight||200),.8,.65,.25);h.addPass(l);const d=new fe(js);h.addPass(d);const f={element:e,canvas:n,overlay:s,labelsDiv:i,renderer:r,scene:c,camera:u,opts:a,theme:o,R:0,sweepAngle:Math.random()*B,sweepSpeed:B/(a.sweepPeriod/1e3),ringPopDuration:a.sweepPeriod/1e3-.5,threatLevel:a.threatLevel,contacts:new Array(ne).fill(null),dummy:new Ea,footerEl:document.getElementById("radar-contacts"),staticLabelEls:[],staticActive:!1,staticNextAt:null,staticEndAt:null,rafId:null,rafRunning:!1,destroyed:!1,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,centerGlowIntensity:0,centerGlowMesh:null,composer:h,bloomPass:l,holoPass:d,backgroundMesh:null,ringMeshes:null,ticksMesh:null,sweepTrailMesh:null,sweepArmLine:null,contactDotsMesh:null,contactRingsMesh:null,matRingInner:null,matRingOuter:null,matRingTicks:null,spawnTimer:null,lastTs:null,now:performance.now(),resizeObserver:null,intersectionObserver:null,_motionMq:null,_motionHandler:null,setRadarThreatLevel:null,injectContact:null};f.ringHzBase=1/f.ringPopDuration,et.set(e,f);const p=e.closest(".s9-panel");p&&(p.classList.add("s9-panel--booting"),p.addEventListener("animationend",()=>p.classList.remove("s9-panel--booting"),{once:!0}));const v=new ResizeObserver(_=>{for(const b of _){const{width:g,height:x}=b.contentRect;if(g===0||x===0)return;const D=Math.floor(Math.min(g,x)/2)-8;if(D<=0)return;f.R=D,u.left=-D,u.right=D,u.top=D,u.bottom=-D,u.updateProjectionMatrix(),r.setSize(g,x),f.composer.setSize(g,x),f.bloomPass&&f.bloomPass.resolution.set(g,x),dn(f)}});v.observe(e),f.resizeObserver=v;const T=new IntersectionObserver(_=>{_.forEach(b=>{f.rafRunning=b.isIntersecting,f.rafRunning&&!f.rafId&&(f.rafId=requestAnimationFrame(g=>Tt(f,g)))})},{threshold:0});T.observe(e),f.intersectionObserver=T;const w=matchMedia("(prefers-reduced-motion: reduce)"),y=()=>{f.reducedMotion=w.matches,f.reducedMotion?(f.sweepAngle=Math.PI*.15,clearTimeout(f.spawnTimer)):tt(f)};w.addEventListener("change",y),f._motionMq=w,f._motionHandler=y,f.rafRunning=!0,f.rafId=requestAnimationFrame(_=>Tt(f,_)),f.reducedMotion||tt(f);function m(_){const b=Math.max(0,Math.min(1,_));f.threatLevel=b,clearTimeout(f.spawnTimer),tt(f)}function S(_,b,g){const x=["friendly","neutral","hostile"].includes(g)?g:"neutral",D=Nt(f,_,Math.max(0,Math.min(1,b)),x);return D?D.id:""}return f.setRadarThreatLevel=m,f.injectContact=S,{setRadarThreatLevel:m,injectContact:S}}function yn(e){const t=et.get(e);if(!t)return;const a=Wa();t.theme=a;const o=ve(a.neonGreen),n=ve(a.neonWarn),s=ve(a.neonAlert),i=ve(a.neonCyan),r=new O(a.neonCyan);if(t.backgroundMesh){const c=new O(a.voidColor);t.backgroundMesh.material.uniforms.uVoidColor.value.set(c.r,c.g,c.b),t.renderer.setClearColor(new O(a.voidColor),1)}if(t.matRingInner&&t.matRingInner.color.set(a.neonCyan),t.matRingOuter&&t.matRingOuter.color.set(a.neonCyan),t.matRingTicks&&t.matRingTicks.color.set(a.neonCyan),t.sweepTrailMesh&&t.sweepTrailMesh.material.uniforms.uColor.value.set(r.r,r.g,r.b),t.sweepArmLine&&t.sweepArmLine.material.color.set(a.neonCyan),t.contactDotsMesh){const c=t.contactDotsMesh.material.uniforms;c.uC0.value.set(...o),c.uC1.value.set(...n),c.uC2.value.set(...s),c.uC3.value.set(...i)}if(t.contactRingsMesh){const c=t.contactRingsMesh.material.uniforms;c.uC0.value.set(...o),c.uC1.value.set(...n),c.uC2.value.set(...s)}}const _n=`
  attribute vec2 a_pos;
  varying vec2 vUv;
  void main() {
    vUv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }`,wn=`
  precision mediump float;
  uniform sampler2D tDiffuse;
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
    gl_FragColor = vec4(ToCrtGamma(col), 1.0);
  }`;function da(e,t,a){const o=e.createShader(t);return e.shaderSource(o,a),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)||console.error("Telescreen shader error:",e.getShaderInfoLog(o)),o}function Sn(e,t,a){const o=t.getContext("webgl");if(!o)return console.warn("Telescreen: WebGL not available"),{destroy(){}};const n=a.getContext("2d"),s={prog:null,buf:null,tex:null,aPos:-1,uLocs:{}};function i(){const y=o.createProgram();o.attachShader(y,da(o,o.VERTEX_SHADER,_n)),o.attachShader(y,da(o,o.FRAGMENT_SHADER,wn)),o.linkProgram(y),o.useProgram(y);const m=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,m),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),o.STATIC_DRAW);const S=o.getAttribLocation(y,"a_pos");o.enableVertexAttribArray(S),o.vertexAttribPointer(S,2,o.FLOAT,!1,0,0);const _={res:o.getUniformLocation(y,"iResolution"),time:o.getUniformLocation(y,"uTime"),imgOffset:o.getUniformLocation(y,"uImgOffset"),imgScale:o.getUniformLocation(y,"uImgScale"),diffuse:o.getUniformLocation(y,"tDiffuse")},b=o.createTexture();o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,b),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.uniform1i(_.diffuse,0),Object.assign(s,{prog:y,buf:m,tex:b,aPos:S,uLocs:_})}i();let r=!1,c=null,u=!1,h=0;function l(){o.bindTexture(o.TEXTURE_2D,s.tex),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,e),r=!0}function d(y,m,S,_){const b=Math.max(y/S,m/_)*.8,g=S*b,x=_*b;return{ox:(y-g)/2/y,oy:(m-x)/2/m,sx:g/y,sy:x/m}}function f(){const y=t.clientWidth||576,m=t.clientHeight||432;t.width=y,t.height=m,a.width=y,a.height=m,u||o.viewport(0,0,y,m)}function p(){if(!e.naturalWidth)return;const y=a.width,m=a.height,S=e.naturalWidth,_=e.naturalHeight,b=Math.max(y/S,m/_)*.8,g=S*b,x=_*b;n.clearRect(0,0,y,m),n.drawImage(e,(y-g)/2,(m-x)/2,g,x)}t.addEventListener("webglcontextlost",y=>{y.preventDefault(),u=!0}),t.addEventListener("webglcontextrestored",()=>{u=!1,r=!1,i(),f(),l()});function v(y){h=requestAnimationFrame(v),c||(c=y);const m=(y-c)/1e3;if(r&&!u){const S=t.width,_=t.height,b=e.naturalWidth,g=e.naturalHeight,x=_/1,D=S/_*x;o.uniform2f(s.uLocs.res,D,x),o.uniform1f(s.uLocs.time,m);const P=d(S,_,b,g);o.uniform2f(s.uLocs.imgOffset,P.ox,P.oy),o.uniform2f(s.uLocs.imgScale,P.sx,P.sy),o.drawArrays(o.TRIANGLE_STRIP,0,4),p()}}function T(){f(),l(),p(),h=requestAnimationFrame(v)}e.complete&&e.naturalWidth?T():e.addEventListener("load",T);const w=new ResizeObserver(()=>{f(),p()});return w.observe(t),{destroy(){cancelAnimationFrame(h),w.disconnect()}}}const ua=[{cls:"sigint",headline:"SIGNAL INTERCEPT: FREQ 12.4GHz",detail:"Encrypted burst tx — POSEIDON signature"},{cls:"humint",headline:"ASSET CONFIRM: NIIHAMA-04",detail:"Target movement: port district, 0300 local"},{cls:"cyber",headline:"ZERO-DAY: CVE-2026-3917",detail:"Legacy auth stack — remote exec payload ready"},{cls:"ghost",headline:"DIVE ANOMALY: SECTOR ALPHA",detail:"Ghost-barrier interference at 4.1m depth"},{cls:"elint",headline:"DRONE SWEEP: SECTOR 12",detail:"Coverage 73% — ETA 4 minutes to full map"},{cls:"sigint",headline:"PACKET STORM: 192.168.7.0/24",detail:"18k pps sustained — possible DDoS staging"},{cls:"cyber",headline:"EXFIL CHANNEL COMPROMISED",detail:"Fallback route DELTA-9 now primary exfil"},{cls:"humint",headline:"CONTACT LOST: ROMEO-7",detail:"Last check-in 03:14:22 UTC — status unknown"},{cls:"ghost",headline:"TACHIKOMA: AUTONOMOUS SWEEP",detail:"Unit 9 executing sector 7 independently"},{cls:"elint",headline:"EM PULSE DETECTED: ZONE 3",detail:"Localized disruption — comm nodes offline"},{cls:"sigint",headline:"NODE COMMS SPIKE: BEIJING",detail:"340% increase in encrypted P2P — 0300-0500"},{cls:"cyber",headline:"FIREWALL PROBE: AS12345",detail:"Systematic port sweep — countermeasures deployed"},{cls:"humint",headline:"BROKER IDENTIFIED: LAUGHING MAN",detail:"Dark web auction — biotech data linked to incident"},{cls:"ghost",headline:"GHOST PROTOCOL: BETA-3",detail:"Shell confirmed on target system — extract ready"},{cls:"elint",headline:"SAT PASS: KH-17 WINDOW",detail:"6 min coverage — imaging tasked to sector 4"}];function xn(e){const t=document.createElement("div");return t.className=`sigint-item sigint-item--${e.cls}`,t.innerHTML=`
    <div class="sigint-item__class">${e.cls.toUpperCase()}</div>
    <div class="sigint-item__headline">${e.headline}</div>
    <div class="sigint-item__detail">${e.detail}</div>
  `,t}function Tn(e){if(!e)return;const t=4,a=[];function o(){const n=new Set(a.map(h=>{var l;return(l=h.querySelector(".sigint-item__headline"))==null?void 0:l.textContent})),s=ua.filter(h=>!n.has(h.headline)),i=s.length>0?s:ua,r=i[Math.floor(Math.random()*i.length)],c=xn(r);e.insertBefore(c,e.firstChild),a.unshift(c),requestAnimationFrame(()=>c.classList.add("sigint-item--visible"));const u=8e3+Math.random()*12e3;for(setTimeout(()=>{c.classList.add("sigint-item--closing"),c.classList.remove("sigint-item--visible"),setTimeout(()=>{c.remove();const h=a.indexOf(c);h>=0&&a.splice(h,1)},500)},u);a.length>t;){const h=a.pop();h.classList.add("sigint-item--closing"),h.classList.remove("sigint-item--visible"),setTimeout(()=>h.remove(),500)}setTimeout(o,3e3+Math.random()*6e3)}setTimeout(o,800),setTimeout(o,2200)}const ha=[{cls:"STRATEGIC",headline:"BIOMECH TREATY VOTE: 72HRS",detail:"Section 9 on standby for security detail"},{cls:"TACTICAL",headline:"LAUGHING MAN: ACTIVE",detail:"New sightings logged in Niihama and Togusa ward"},{cls:"ASSET",headline:"BATOU: FIELD POSITION UPDATE",detail:"Grid 7-Delta — visual on primary target"},{cls:"THREAT",headline:"PUPPET MASTER PROTOCOL",detail:"AI ghost-dive signatures — 3 confirmed nodes"},{cls:"STRATEGIC",headline:"ARAMAKI: SITUATION ROOM",detail:"Director briefing at 0600 UTC — attendance req"},{cls:"TACTICAL",headline:"TOGUSA: DEEP COVER",detail:"Identity: Muto Ryo — corporate embedded"},{cls:"THREAT",headline:"ROGUE TACHIKOMA UNIT",detail:"Unit 14 unresponsive — last GPS: Sector 9-Bravo"},{cls:"ASSET",headline:"ISHIKAWA: CYBER BREACH",detail:"Target mainframe penetrated — exfil in 180s"},{cls:"STRATEGIC",headline:"COMA CHIP EXPLOIT: CONFIRMED",detail:"Hardware vulnerability — 40k units affected"},{cls:"TACTICAL",headline:"HELICOPTER SUPPORT: STANDING BY",detail:"AH-6J on tarmac — ETA to sector: 4 min"}];function En(e){const t=document.createElement("div");return t.className="intel-item",t.innerHTML=`
    <div class="intel-item__class">${e.cls}</div>
    <div class="intel-item__headline">${e.headline}</div>
    <div class="intel-item__detail">${e.detail}</div>
  `,t}function Mn(e){if(!e)return;const t=5,a=[];function o(){const n=new Set(a.map(h=>{var l;return(l=h.querySelector(".intel-item__headline"))==null?void 0:l.textContent})),s=ha.filter(h=>!n.has(h.headline)),i=s.length>0?s:ha,r=i[Math.floor(Math.random()*i.length)],c=En(r);e.insertBefore(c,e.firstChild),a.unshift(c),requestAnimationFrame(()=>c.classList.add("intel-item--visible"));const u=1e4+Math.random()*15e3;for(setTimeout(()=>{c.classList.add("intel-item--closing"),c.classList.remove("intel-item--visible"),setTimeout(()=>{c.remove();const h=a.indexOf(c);h>=0&&a.splice(h,1)},500)},u);a.length>t;){const h=a.pop();h.classList.add("intel-item--closing"),h.classList.remove("intel-item--visible"),setTimeout(()=>h.remove(),500)}setTimeout(o,4e3+Math.random()*8e3)}setTimeout(o,1200),setTimeout(o,3500),setTimeout(o,5800)}function V(e,t){return Math.floor(Math.random()*(t-e+1))+e}const se=()=>`${V(10,220)}.${V(0,255)}.${V(0,255)}.${V(1,254)}`,gt=()=>[22,80,443,8443,4444,3389,21,1337,9999][Math.floor(Math.random()*9)],An=()=>`${V(64,65535)}B`,Cn=()=>Array.from({length:4},()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0")).join(" "),fa=[()=>({source:"AUTH",message:`HANDSHAKE COMPLETE — ${se()}:${gt()}`,alert:!1}),()=>({source:"NET",message:`PKT ${An()} ${se()} → ${se()}`,alert:!1}),()=>({source:"GHOST",message:`DIVE DEPTH: ${(2+Math.random()*3).toFixed(1)}m — STABLE`,alert:!1}),()=>({source:"CRYPT",message:"AES-256 SESSION KEY ESTABLISHED",alert:!1}),()=>({source:"SCAN",message:`PROBE: ${se()}:${gt()} — ${Cn()}`,alert:!0}),()=>({source:"SYS",message:`MEM ${V(60,92)}% CPU ${V(20,80)}% THERMAL OK`,alert:!1}),()=>({source:"NET",message:`LATENCY ${V(4,45)}ms — ${Math.random()<.8?"NOMINAL":"DEGRADED"}`,alert:Math.random()<.2}),()=>({source:"AUTH",message:`TOKEN REFRESH: UID-${V(1e3,9999)}`,alert:!1}),()=>({source:"CRIT",message:`INTRUSION SIG: ${se()} PORT ${gt()}`,alert:!0}),()=>({source:"SYS",message:`COUNTERMEASURE DEPLOYED — BLOCK RULE ${V(100,999)}`,alert:!1}),()=>({source:"NET",message:`ROUTE CHANGE: AS${V(1e3,65e3)} VIA ${se()}`,alert:!1}),()=>({source:"CRYPT",message:`TLS 1.3 HANDSHAKE: ${se()} — ${V(0,1)?"ECDH":"RSA"}-4096`,alert:!1}),()=>({source:"SCAN",message:`ANOMALY: BURST ${V(800,9999)} PPS FROM ${se()}`,alert:!0}),()=>({source:"GHOST",message:`GHOST COEFFICIENT: ${(92+Math.random()*8).toFixed(1)}%`,alert:!1}),()=>({source:"AUTH",message:`CERT CHAIN VALID — SHA-${V(0,1)?"256":"512"}`,alert:!1}),()=>({source:"NET",message:`DNS RESOLVE: ${["niihama.net","togusa.local","sec9.gov","puppet.io"][Math.floor(Math.random()*4)]}`,alert:!1}),()=>({source:"SYS",message:`FIREWALL RULE ${V(1e3,9999)}: DROP ${se()}/${V(24,32)}`,alert:!1}),()=>({source:"CRIT",message:`ZERO-DAY ATTEMPT: ${se()} — MITIGATED`,alert:!0})];function Dn(e,t){function a(){const o=fa[Math.floor(Math.random()*fa.length)];t(e,{timestamp:new Date().toISOString(),...o()})}for(let o=0;o<8;o++)a();setInterval(a,V(1200,2800))}function pe(e,t){return Math.floor(Math.random()*(t-e+1))+e}const be=[{id:"n-tokyo",lat:35.68,lng:139.69,label:"TOKYO"},{id:"n-moscow",lat:55.75,lng:37.62,label:"MOSCOW"},{id:"n-beijing",lat:39.91,lng:116.39,label:"BEIJING"},{id:"n-london",lat:51.51,lng:-.13,label:"LONDON"},{id:"n-nyc",lat:40.71,lng:-74,label:"NEW YORK"},{id:"n-sydney",lat:-33.87,lng:151.21,label:"SYDNEY"},{id:"n-dubai",lat:25.2,lng:55.27,label:"DUBAI"},{id:"n-saopaulo",lat:-23.55,lng:-46.63,label:"SÃO PAULO"},{id:"n-paris",lat:48.86,lng:2.35,label:"PARIS"},{id:"n-seoul",lat:37.57,lng:126.98,label:"SEOUL"},{id:"n-cairo",lat:30.05,lng:31.24,label:"CAIRO"},{id:"n-berlin",lat:52.52,lng:13.41,label:"BERLIN"},{id:"n-mumbai",lat:19.08,lng:72.88,label:"MUMBAI"},{id:"n-toronto",lat:43.65,lng:-79.38,label:"TORONTO"},{id:"n-singapore",lat:1.35,lng:103.82,label:"SINGAPORE"},{id:"n-nairobi",lat:-1.29,lng:36.82,label:"NAIROBI"},{id:"n-istanbul",lat:41.01,lng:28.97,label:"ISTANBUL"},{id:"n-lagos",lat:6.52,lng:3.38,label:"LAGOS"}],Ln={"n-tokyo":{country:"JAPAN",pop:"13.96M",status:"FINANCIAL HUB"},"n-moscow":{country:"RUSSIA",pop:"12.51M",status:"RESTRICTED"},"n-beijing":{country:"CHINA",pop:"21.54M",status:"RESTRICTED"},"n-london":{country:"UK",pop:"8.98M",status:"ALLIED NODE"},"n-nyc":{country:"USA",pop:"8.34M",status:"ALLIED NODE"},"n-sydney":{country:"AUSTRALIA",pop:"5.31M",status:"ALLIED NODE"},"n-dubai":{country:"UAE",pop:"3.33M",status:"NEUTRAL ZONE"},"n-saopaulo":{country:"BRAZIL",pop:"12.33M",status:"MONITORED"},"n-paris":{country:"FRANCE",pop:"2.15M",status:"ALLIED NODE"},"n-seoul":{country:"S.KOREA",pop:"9.78M",status:"ALLIED NODE"},"n-cairo":{country:"EGYPT",pop:"10.08M",status:"MONITORED"},"n-berlin":{country:"GERMANY",pop:"3.66M",status:"ALLIED NODE"},"n-mumbai":{country:"INDIA",pop:"20.67M",status:"MONITORED"},"n-toronto":{country:"CANADA",pop:"2.93M",status:"ALLIED NODE"},"n-singapore":{country:"SINGAPORE",pop:"5.45M",status:"NEUTRAL ZONE"},"n-nairobi":{country:"KENYA",pop:"4.40M",status:"MONITORED"},"n-istanbul":{country:"TURKEY",pop:"15.46M",status:"NEUTRAL ZONE"},"n-lagos":{country:"NIGERIA",pop:"14.86M",status:"MONITORED"}},at=be.slice(0,8),$a=[15,72,55,18,28,10,45,33];function Rn(e){let t=e.split("").reduce((c,u)=>c*31+u.charCodeAt(0)>>>0,7);const a=()=>(t=t*1664525+1013904223>>>0,(t>>>16)/65535),o=9,n=140,s=34,i=n/o;let r=`<svg viewBox="0 0 ${n} ${s}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;height:34px;">`;r+='<g fill="currentColor">';for(let c=0;c<o;c++){const u=8+a()*24,h=i*(.48+a()*.44),l=c*i+(i-h)*.5;r+=`<rect x="${l.toFixed(1)}" y="${(s-u).toFixed(1)}" width="${h.toFixed(1)}" height="${u.toFixed(1)}"/>`}return r+="</g></svg>",r}function Pn(e,t,a,o){const{addNode:n,removeNode:s,updateNodeLevel:i,setThreatLevel:r,setActiveNode:c,focusNode:u,pulseGlobeNode:h,spawnArc:l,appendRow:d,printLine:f,setRadarThreatLevel:p}=o,v=new Map;function T(m,S){e.dispatchEvent(new CustomEvent("s9:alert",{bubbles:!0,detail:{level:S>=70?"critical":"warning",source:m}}))}function w(m,S){n(e,{...m,level:S}),v.set(m.id,S),d(t,{timestamp:new Date().toISOString(),source:"NET",message:`NODE ONLINE: ${m.label} — LVL ${S}`,alert:S>=70}),S>=70&&(T(m.label,S),c(e,m.id),u(e,m.id))}at.forEach((m,S)=>{setTimeout(()=>{w(m,$a[S]),S===at.length-1&&setTimeout(()=>{r(e,55),p(.55)},800)},S*300+500)});function y(){const m=[...v.keys()],S=be.filter(b=>!v.has(b.id)),_=Math.random();if(_<.28&&S.length>0){const b=S[pe(0,S.length-1)],g=pe(5,65);w(b,g),f(a,`SIGNAL ACQUIRED: ${b.label}`,"sys")}else if(_<.42&&m.length>5){const b=m[pe(0,m.length-1)],g=be.find(x=>x.id===b);s(e,b),v.delete(b),f(a,`SIGNAL LOST: ${(g==null?void 0:g.label)??b}`,"info"),d(t,{timestamp:new Date().toISOString(),source:"NET",message:`NODE OFFLINE: ${(g==null?void 0:g.label)??b}`,alert:!1})}else if(_<.72&&m.length>0){const b=m[pe(0,m.length-1)],g=be.find(z=>z.id===b),x=v.get(b)??0,D=pe(8,28),P=Math.min(100,x+D);i(e,b,P),v.set(b,P),r(e,Math.max(...v.values())),p(Math.max(...v.values())/100),f(a,`THREAT ESCALATION: ${(g==null?void 0:g.label)??b} ${x}→${P}`,P>=70?"err":"sys"),d(t,{timestamp:new Date().toISOString(),source:"CRIT",message:`THREAT UP: ${(g==null?void 0:g.label)??b} LVL=${P}`,alert:P>=70}),P>=70&&x<70&&(T((g==null?void 0:g.label)??b,P),c(e,b),u(e,b));const ie=x>=70?2:x>=40?1:0,ae=P>=70?2:P>=40?1:0;ie!==ae&&h(e,b)}else if(m.length>0){const b=m[pe(0,m.length-1)],g=be.find(ae=>ae.id===b),x=v.get(b)??50,D=Math.max(0,x-pe(5,18));i(e,b,D),v.set(b,D),r(e,Math.max(0,...v.values())),p(Math.max(0,...v.values())/100),f(a,`THREAT REDUCED: ${(g==null?void 0:g.label)??b} LVL=${D}`,"info");const P=x>=70?2:x>=40?1:0,ie=D>=70?2:D>=40?1:0;P!==ie&&h(e,b)}if(m.length>=2){const b=1+Math.floor(Math.random()*3);for(let g=0;g<b;g++){const x=m[Math.floor(Math.random()*m.length)];let D=m[Math.floor(Math.random()*m.length)];D===x&&(D=m[(m.indexOf(x)+1)%m.length]),D!==x&&l(e,x,D)}}setTimeout(y,pe(4e3,9e3))}return setTimeout(y,at.length*300+2500),setInterval(()=>{const m=[...v.keys()];if(m.length<2)return;const S=Math.random()<.4?2:1;for(let _=0;_<S;_++){const b=m[Math.floor(Math.random()*m.length)];let g=m[Math.floor(Math.random()*m.length)];g===b&&(g=m[(m.indexOf(b)+1)%m.length]),g!==b&&l(e,b,g)}},1200),setInterval(()=>{const m=[...v.entries()].filter(([,x])=>x>=70);if(m.length===0)return;const S=e.getAttribute("data-active-node"),_=m.filter(([x])=>x!==S),b=_.length>0?_:m,[g]=b[Math.floor(Math.random()*b.length)];c(e,g),u(e,g)},8e3),{globeNodes:v}}function In(e,t,a,o,n){const{initThreatMap:s,addNode:i,removeNode:r,updateNodeLevel:c,setThreatLevel:u,setActiveNode:h,focusNode:l}=n;s(e,{autoRotate:!0,bloomStrength:.7});const d=new Map;t.forEach((g,x)=>{setTimeout(()=>{i(e,{...g,level:a[x]}),d.set(g.id,a[x])},x*200+300)}),setTimeout(()=>u(e,55),t.length*200+800);const f=document.getElementById("tact-node-info"),p=document.getElementById("tact-btn-add"),v=document.getElementById("tact-btn-remove"),T=document.getElementById("tact-btn-focus"),w=document.getElementById("tact-btn-deselect"),y=document.getElementById("tact-level-slider"),m=document.getElementById("tact-level-val"),S=document.getElementById("tact-level-row");let _=null;function b(){const g=_!==null&&d.has(_);if(v.disabled=!g,T.disabled=!g,w.disabled=!g,y.disabled=!g,S.style.opacity=g?"1":"0.4",S.style.pointerEvents=g?"auto":"none",g){const x=o.find(P=>P.id===_),D=d.get(_);f.textContent=`${(x==null?void 0:x.label)??_} — LVL ${D}`,y.value=D,m.textContent=D}else f.textContent="NO NODE SELECTED"}e.addEventListener("s9:threatmap-node-select",g=>{_=g.detail.nodeId,document.getElementById("tactical-threat").textContent=`THREAT: ${g.detail.level} — ${g.detail.label}`,b()}),e.addEventListener("s9:threatmap-node-deselect",()=>{_=null,b()}),p.addEventListener("click",()=>{const g=o.filter(P=>!d.has(P.id));if(g.length===0)return;const x=g[Math.floor(Math.random()*g.length)],D=Math.floor(Math.random()*60)+10;i(e,{...x,level:D}),d.set(x.id,D),u(e,Math.max(...d.values())),h(e,x.id),l(e,x.id)}),v.addEventListener("click",()=>{_&&(r(e,_),d.delete(_),u(e,d.size>0?Math.max(...d.values()):0),_=null,b())}),T.addEventListener("click",()=>{_&&l(e,_)}),w.addEventListener("click",()=>{h(e,null),_=null,b()}),y.addEventListener("input",()=>{if(!_)return;const g=parseInt(y.value);m.textContent=g,c(e,_,g),d.set(_,g),u(e,Math.max(...d.values()));const x=o.find(D=>D.id===_);f.textContent=`${(x==null?void 0:x.label)??_} — LVL ${g}`}),b()}const je=[{id:"sec9",label:"SEC.9 HQ",x:50,y:50,root:!0},{id:"niihama",label:"NIIHAMA",x:22,y:22},{id:"togusa",label:"TOGUSA",x:78,y:22},{id:"batou",label:"BATOU",x:78,y:78},{id:"ishikawa",label:"ISHIKAWA",x:22,y:78},{id:"relay1",label:"RELAY ALPHA",x:36,y:32},{id:"relay2",label:"RELAY BETA",x:64,y:32},{id:"relay3",label:"RELAY GAMMA",x:36,y:68},{id:"relay4",label:"RELAY DELTA",x:64,y:68},{id:"ext1",label:"PUPPET MASTER",x:12,y:50},{id:"ext2",label:"LAUGHING MAN",x:88,y:50},{id:"tachi",label:"TACHIKOMA U9",x:50,y:12}],ma=[{id:"e01",from:"sec9",to:"relay1"},{id:"e02",from:"sec9",to:"relay2"},{id:"e03",from:"sec9",to:"relay3"},{id:"e04",from:"sec9",to:"relay4"},{id:"e05",from:"relay1",to:"niihama"},{id:"e06",from:"relay2",to:"togusa"},{id:"e07",from:"relay3",to:"ishikawa"},{id:"e08",from:"relay4",to:"batou"},{id:"e09",from:"niihama",to:"ext1"},{id:"e10",from:"ext1",to:"relay3"},{id:"e11",from:"togusa",to:"relay1"},{id:"e12",from:"batou",to:"relay2"},{id:"e13",from:"ext2",to:"relay2"},{id:"e14",from:"ext2",to:"relay4"},{id:"e15",from:"sec9",to:"tachi"},{id:"e16",from:"relay1",to:"relay2"},{id:"e17",from:"relay3",to:"relay4"}],vt={relay2:72,relay4:88,ext1:95,ext2:80,niihama:45,batou:55};function On(e,t){if(!e)return;const{initMatrix:a,activateEdge:o,deactivateEdge:n,pulseNode:s,setActiveNode:i}=t;a(e,{nodes:je,edges:ma});for(const[l,d]of Object.entries(vt)){const f=e.querySelector(`[data-node-id="${l}"]`);f&&(d>=70?f.classList.add("s9-matrix__node--threat-high"):d>=40&&f.classList.add("s9-matrix__node--threat-mid"))}i(e,"ext1");const r=ma.map(l=>l.id),c=new Set,u=[null,null,"var(--neon-warn)","var(--neon-alert)","var(--neon-green)",null];function h(){if(c.size>0){const p=[...c],v=p[Math.floor(Math.random()*p.length)];n(e,v),c.delete(v)}const l=r.filter(p=>!c.has(p)),d=Math.random()<.4?2:1;for(let p=0;p<d&&l.length>0;p++){const v=l.splice(Math.floor(Math.random()*l.length),1)[0],T=u[Math.floor(Math.random()*u.length)];o(e,v,T),c.add(v)}if(Math.random()<.35){const p=je[Math.floor(Math.random()*je.length)];s(e,p.id)}const f=document.getElementById("flow-overlay");if(f){const p=Object.values(vt).filter(w=>w>=70).length,v=Object.values(vt).filter(w=>w>=40&&w<70).length,T=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";f.innerHTML=`<span style="font-family:var(--font-terminal);font-size: 0.7rem;color:${T};opacity:0.7">NODES: ${je.length} &nbsp; <span style="color:var(--text-alert)">CRIT: ${p}</span> &nbsp; <span style="color:var(--neon-warn)">WARN: ${v}</span></span>`}}for(let l=0;l<4;l++){const d=r[Math.floor(Math.random()*r.length)];c.has(d)||(o(e,d),c.add(d))}setInterval(h,700),h(),document.getElementById("matrix-status").textContent="● LIVE"}const ot={"":"MATRIX GREEN",gits:"GHOST IN THE SHELL",amber:"AMBER",phosphor:"PHOSPHOR",blood:"BLOOD"};function Et(e){const t=document.documentElement;e===""||e==="matrixgreen"?delete t.dataset.theme:t.dataset.theme=e,document.querySelectorAll(".topbar__theme-btn").forEach(a=>{a.classList.toggle("topbar__theme-btn--active",(a.dataset.themeSet??"")===(e==="matrixgreen"?"":e))}),sa(X),Mt&&sa(document.getElementById("threatmap-tactical")),yn(Ja)}function Va(){const e=new Date;document.getElementById("topbar-clock").textContent=`UTC ${e.toUTCString().split(" ")[4]}`}Va();setInterval(Va,1e3);document.querySelectorAll(".s9-panel").forEach(_s);document.querySelectorAll(".topbar__theme-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.themeSet??"";Et(t),C(A,`THEME: ${ot[t]??t.toUpperCase()}`,"sys")})});const qa=document.querySelectorAll(".topbar__tab[data-tab]"),Nn=document.querySelectorAll(".center__view[data-view]");let pa=!1,Mt=!1;function ga(e){qa.forEach(t=>{const a=t.dataset.tab===e;t.classList.toggle("topbar__tab--active",a),t.setAttribute("aria-selected",a)}),Nn.forEach(t=>{t.classList.toggle("center__view--active",t.dataset.view===e)}),e==="network"&&!pa&&(pa=!0,Kn()),e==="tactical"&&!Mt&&(Mt=!0,Yn()),C(A,`VIEW: ${e.toUpperCase()} ACTIVATED`,"sys")}qa.forEach(e=>{e.addEventListener("click",()=>ga(e.dataset.tab)),e.addEventListener("keydown",t=>{(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),ga(e.dataset.tab))})});const A=document.querySelector(".s9-terminal");bo(A,{onSubmit(e){var n;const t=e.trim().split(/\s+/),a=t[0].toLowerCase(),o=t.slice(1);switch(a){case"help":C(A,"SECTION 9 COMMAND INTERFACE — AVAILABLE COMMANDS:","sys"),C(A,"  status              — system status report","info"),C(A,"  ghost               — ghost coefficient analysis","info"),C(A,"  nodes               — list active threat nodes","info"),C(A,"  threat <lvl>        — set global threat level 0-100","info"),C(A,"  threat <id> <lvl>   — set node threat level","info"),C(A,"  focus <id>          — focus camera on node","info"),C(A,"  theme <name>        — switch theme","info"),C(A,"  themes              — list available themes","info"),C(A,"  clear               — clear terminal","info");break;case"status":{const s=te.size,i=[...te.values()].filter(c=>c>=70).length,r=s>0?Math.max(...te.values()):0;C(A,"── SYSTEM STATUS ──────────────────────────","sys"),C(A,`  CPU: ${K.cpu}%   MEM: ${K.mem}%   NET I/O: ${K.net}%`,"info"),C(A,`  GHOST LAYER: ${K.ghost}%   ENCRYPTION: ${K.enc}%`,"info"),C(A,`  NODES ON GRID: ${s}   CRITICAL: ${i}`,i>0?"err":"info"),C(A,`  PEAK THREAT: ${r}   GLOBAL LEVEL: ${r}`,r>=70?"err":"sys"),C(A,"  SECURE CHANNEL: ACTIVE   ENCRYPTION: AES-256","info");break}case"ghost":{const s=Ut.toFixed(1);C(A,"── GHOST COEFFICIENT ANALYSIS ─────────────","sys"),C(A,`  COEFFICIENT: ${s}%   BARRIER: NOMINAL`,"info"),C(A,"  CYBER BRAIN: SECTION 9 CLEARANCE ALPHA-7","info"),C(A,"  DIVE DEPTH: STABLE 3.2m   TACHIKOMA LINK: ACTIVE","info"),C(A,"  IDENTITY: CONFIRMED — KUSANAGI.M",s>=95?"sys":"err");break}case"nodes":{if(te.size===0){C(A,"NO NODES ON GRID","info");break}C(A,`ACTIVE NODES (${te.size}):`,"sys");for(const[s,i]of te){const r=be.find(h=>h.id===s),c=(r==null?void 0:r.label)??s,u=i>=70?"err":i>=40?"sys":"info";C(A,`  ${s.padEnd(14)} ${c.padEnd(12)} LVL=${i}`,u)}break}case"threat":{if(o.length===0){C(A,`GLOBAL THREAT: ${Math.max(0,...te.values())}`,"sys");break}if(o.length>=2&&isNaN(parseInt(o[0]))){const s=o[0],i=parseInt(o[1]);if(!te.has(s)){C(A,`ERR: node '${s}' not found — use NODES to list`,"err");break}if(isNaN(i)||i<0||i>100){C(A,"ERR: level must be 0-100","err");break}const r=Ot(X,s,i);te.set(s,i),st(X,Math.max(0,...te.values())),At.setRadarThreatLevel(Math.max(0,...te.values())/100),C(A,`NODE ${s}: ${r} → ${i}`,i>=70?"err":"sys"),i>=70&&r<70&&(Se(X,s),nt(X,s))}else{const s=parseInt(o[0]);if(isNaN(s)||s<0||s>100){C(A,"ERR: level must be 0-100","err");break}st(X,s),At.setRadarThreatLevel(s/100),C(A,`GLOBAL THREAT LEVEL SET: ${s}`,"sys")}break}case"focus":{const s=o[0];if(!s){C(A,"ERR: focus requires a node id — use NODES to list","err");break}if(!te.has(s)){C(A,`ERR: node '${s}' not found`,"err");break}Se(X,s),nt(X,s);const i=be.find(r=>r.id===s);C(A,`CAMERA FOCUSED: ${(i==null?void 0:i.label)??s}`,"sys");break}case"theme":{const s=((n=o[0])==null?void 0:n.toLowerCase())??"";if(s===""||s==="matrixgreen"){Et(""),C(A,"THEME: MATRIX GREEN","sys");break}if(!Object.keys(ot).includes(s)){C(A,`ERR: unknown theme '${s}' — use THEMES to list`,"err");break}Et(s),C(A,`THEME: ${ot[s]}`,"sys");break}case"themes":C(A,"AVAILABLE THEMES:","sys");for(const[s,i]of Object.entries(ot))C(A,`  ${(s||"matrixgreen").padEnd(14)} ${i}`,"info");break;case"clear":yo(A),C(A,"TERMINAL CLEARED","sys");break;default:a&&C(A,`ERR: unknown command '${e}' — type HELP`,"err")}},tabComplete(e){return["help","status","ghost","nodes","threat","focus","theme","themes","clear"].find(a=>a.startsWith(e.toLowerCase()))??null}});C(A,"SECTION 9 OPERATIVE INTERFACE — TYPE HELP FOR COMMANDS","sys");C(A,"GHOST BABEL OPERATION: ACTIVE","info");function bt(e,t,a){let o=0;function n(){if(o>=e.length)return;const{id:s,state:i}=e[o++],r=document.getElementById(s);r&&ws(r,i),setTimeout(n,o<e.length?t:t*2)}n()}Tn(document.getElementById("sigint-feed"));Mn(document.getElementById("intel-feed"));setTimeout(()=>{bt([{id:"seq-breach",state:"complete"},{id:"seq-extract",state:"active"}],3e3),setTimeout(()=>{bt([{id:"seq-extract",state:"complete"},{id:"seq-cover",state:"active"}],3500),setTimeout(()=>{bt([{id:"seq-cover",state:"complete"},{id:"seq-exfil",state:"active"}],3e3)},9e3)},8e3)},5e3);const ct=document.querySelector(".s9-stream");So(ct);Dn(ct,Lt);Sn(document.getElementById("ts-feed-src"),document.getElementById("ts-feed-canvas"),document.getElementById("ts-glow-canvas"));const K={cpu:42,mem:61,net:12,ghost:77,enc:96},Un=document.getElementById("tele-cpu"),kn=document.getElementById("tele-mem"),Fn=document.getElementById("tele-net"),Gn=document.getElementById("tele-enc");setInterval(()=>{for(const e of Object.keys(K))K[e]=Math.max(5,Math.min(100,K[e]+(Math.random()-.5)*6)),K[e]=Math.round(K[e]);$e(Un,K.cpu),$e(kn,K.mem),$e(Fn,K.net),$e(Gn,K.enc)},2e3);const ja=document.getElementById("neural-01"),Ya=document.getElementById("ghost-val"),Ka=document.getElementById("cyber-index"),Xa=document.getElementById("neural-sync"),Za=document.getElementById("ekg-bpm"),Qa=To(document.getElementById("ekg-canvas"),document.getElementById("ekg-heart"));let Ut=98.4;for(let e=0;e<3;e++)Ut=Da(ja,Ya,Ka,Xa,Za,Qa);setInterval(()=>{Ut=Da(ja,Ya,Ka,Xa,Za,Qa)},3e3);const X=document.querySelector(".s9-threatmap");ka(X,{autoRotate:!0,bloomStrength:.4});const Ja=document.getElementById("proximity-radar"),At=bn(Ja,{threatLevel:0}),Bn=getComputedStyle(document.documentElement).getPropertyValue("--neon-green").trim()||"#00ff70";Gs(document.getElementById("matrix-rain-host"),{color:Bn,opacity:.45,syncCamera:us(X)});document.getElementById("sat-toggle").addEventListener("change",e=>{bs(X,e.target.checked)});const{globeNodes:te}=Pn(X,ct,A,{addNode:Ga,removeNode:Ba,updateNodeLevel:Ot,setThreatLevel:st,setActiveNode:Se,focusNode:nt,pulseGlobeNode:fs,spawnArc:ms,appendRow:Lt,printLine:C,setRadarThreatLevel:e=>At.setRadarThreatLevel(e)}),Hn=document.getElementById("alert-host");document.addEventListener("s9:alert",e=>{var t;if(((t=e.detail)==null?void 0:t.level)==="critical"){const a=e.detail.source??"UNKNOWN";C(A,`⚠ CRITICAL ALERT: ${a}`,"err"),Mo(Hn,{level:"critical",code:"CRITICAL THREAT",message:a})}});const Fe=document.getElementById("node-popup"),zn=document.getElementById("np-city"),Wn=document.getElementById("np-skyline"),$n=document.getElementById("np-country"),Vn=document.getElementById("np-pop"),qn=document.getElementById("np-coords"),va=document.getElementById("np-threat"),jn=document.getElementById("np-status");X.addEventListener("s9:threatmap-node-select",e=>{const{nodeId:t,label:a,level:o,lat:n,lng:s}=e.detail;C(A,`NODE SELECT: ${a} — LEVEL ${o} — ${n.toFixed(2)}°, ${s.toFixed(2)}°`,o>=71?"err":o>=41?"warn":"info"),Lt(ct,{timestamp:new Date().toISOString(),source:"TGT",message:`TARGET LOCKED: ${a} THREAT=${o}`,alert:o>=41});const i=Ln[t]??{country:"—",pop:"—",status:"UNKNOWN"};zn.textContent=a,Wn.innerHTML=Rn(t),$n.textContent=i.country,Vn.textContent=i.pop,qn.textContent=`${n.toFixed(2)}°, ${s.toFixed(2)}°`;const r=o>=70?"CRITICAL":o>=40?"ELEVATED":"LOW";va.textContent=`${o} — ${r}`,va.style.color=o>=70?"var(--text-alert)":o>=40?"var(--neon-warn)":"var(--neon-green)",jn.textContent=i.status,Fe.classList.toggle("node-popup--left",s>60),Fe.setAttribute("aria-hidden","false"),Fe.classList.add("node-popup--visible")});X.addEventListener("s9:threatmap-node-deselect",()=>{Fe.classList.remove("node-popup--visible"),setTimeout(()=>Fe.setAttribute("aria-hidden","true"),260)});function Yn(){In(document.getElementById("threatmap-tactical"),at,$a,be,{initThreatMap:ka,addNode:Ga,removeNode:Ba,updateNodeLevel:Ot,setThreatLevel:st,setActiveNode:Se,focusNode:nt})}function Kn(){On(document.getElementById("flow-matrix"),{initMatrix:Ao,activateEdge:La,deactivateEdge:Ra,pulseNode:Co,setActiveNode:Ze})}
