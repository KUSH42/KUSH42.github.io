import{C as bn,V as P,M as We,T as He,Q as Ao,S as To,a as k,R as _n,P as wn,b as Rt,c as oe,O as fa,B as Ce,F as Pt,d as ee,U as ot,W as bt,H as _t,N as Sn,e as xn,f as O,A as $,g as $e,I as pa,h as Xt,i as ze,j as ga,k as io,l as va,m as wt,n as St,o as at,L as En,p as ya,G as so,q as we,r as xt,s as ro,t as lo,u as ba,v as De,w as Mn,x as Cn,y as Zt,D as _a,z as An,E as Oe,J as co,K as Tn,X as uo,Y as Lo,Z as Io,_ as wa,$ as rt,a0 as Ln,a1 as In,a2 as Dn,a3 as Sa,a4 as Rn,a5 as Pn,a6 as On,a7 as nt,a8 as Bn,a9 as ho,aa as Xe,ab as Fn,ac as xa,ad as kn}from"./three-C_ueH2ui.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();const Ea=new WeakMap;function Nn(t){const e=new AbortController,{signal:o}=e,a={ac:e,paused:!1,filter:null};Ea.set(t,a);const n=t.querySelector(".s9-stream__body");n&&(n.addEventListener("mouseenter",()=>{a.paused=!0,n.dataset.paused="true"},{signal:o}),n.addEventListener("mouseleave",()=>{a.paused=!1,n.dataset.paused="false",Ma(n)},{signal:o}),n.addEventListener("click",i=>{const r=i.target.closest(".s9-stream__row");if(!r)return;const l=r.classList.contains("s9-stream__row--pinned");r.classList.toggle("s9-stream__row--pinned",!l),t.dispatchEvent(new CustomEvent("s9:stream-row-pinned",{bubbles:!0,detail:{row:r,pinned:!l}}))},{signal:o}))}function mo(t,{timestamp:e,source:o,message:a,alert:n=!1}){const i=t.querySelector(".s9-stream__body");if(!i)return;const r=Ea.get(t),l=(r==null?void 0:r.filter)??null,c=document.createElement("div");c.className="s9-stream__row",n&&c.classList.add("s9-stream__row--alert"),l&&o!==l&&(c.hidden=!0),c.innerHTML=`<span class="s9-stream__timestamp">${Nt(e)}</span><span class="s9-stream__source">${Nt(o)}</span><span class="s9-stream__message">${Nt(a)}</span>`,c.classList.add("glitch-enter"),c.addEventListener("animationend",()=>c.classList.remove("glitch-enter"),{once:!0}),i.appendChild(c),i.children.length>100&&i.removeChild(i.firstChild),r!=null&&r.paused||Ma(i)}function Ma(t){t.scrollTop=t.scrollHeight}function Nt(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Un(t,e){e(),t.classList.remove("glitch-enter"),t.offsetWidth,t.classList.add("glitch-enter"),t.addEventListener("animationend",()=>t.classList.remove("glitch-enter"),{once:!0})}const Ut=.37;function Do(t){return t>.08&&t<.18?Math.sin((t-.08)/.1*Math.PI)*.18:t>.28&&t<.32?-((t-.28)/.04)*.38:t>.32&&t<.37?-.38+(t-.32)/.05*1.38:t>.37&&t<.43?1-(t-.37)/.06*1.28:t>.43&&t<.49?-.28+(t-.43)/.06*.28:t>.52&&t<.68?Math.sin((t-.52)/.16*Math.PI)*.3:0}function Gn(t,e){if(!t)return console.warn("initEkg: canvas element not found"),{setBpm(){},destroy(){}};let o=62,a=0,n=0,i=0,r=0;function l(){e&&(e.classList.remove("beat"),e.offsetWidth,e.classList.add("beat"))}function c(){const h=t.getContext("2d"),m=t.width,f=t.height,g=f/2,b=f*.44,_=o/60/80;h.clearRect(0,0,m,f);const M=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";h.beginPath();for(let E=0;E<m;E++){const w=((a-(m-1-E)*_)%1+1)%1,y=g-Do(w)*b;E===0?h.moveTo(E,y):h.lineTo(E,y)}h.strokeStyle=M,h.lineWidth=1,h.shadowColor=M,h.shadowBlur=5,h.stroke();const p=g-Do(a)*b;h.beginPath(),h.arc(m-1,p,1.8,0,Math.PI*2),h.fillStyle=M,h.shadowBlur=10,h.fill()}function u(){const h=t.clientWidth;h&&t.width!==h&&(t.width=h)}u();const d=new ResizeObserver(u);d.observe(t);function s(h){r=requestAnimationFrame(s);const m=i?h-i:16;i=h,n=a,a=(a+o/60*(m/1e3))%1,(n<Ut&&a>=Ut||n>a&&a>=Ut)&&l(),c()}return r=requestAnimationFrame(s),{setBpm(h){o=h},destroy(){cancelAnimationFrame(r),d.disconnect()}}}let Ge=98.4;function Ca(t,e,o,a,n,i){Ge=Math.max(85,Math.min(100,Ge+(Math.random()-.45)*1.2));const r=Ge.toFixed(1),l=Math.round(58+(100-Ge)/15*12);return n.textContent=l,i.setBpm(l),Un(t,()=>{e.textContent=r,o.textContent=`${r}%`,a.textContent=`${Math.round(Ge)}%`}),Ge}const Ro=new WeakMap;function lt(t,e){const o=Math.max(0,Math.min(100,e)),a=t.querySelector(".s9-telemetry__bar-fill");if(a){a.style.width=`${o}%`;const l=["s9-telemetry__bar-fill--ok","s9-telemetry__bar-fill--warning","s9-telemetry__bar-fill--critical"];a.classList.remove(...l),o<=60?a.classList.add("s9-telemetry__bar-fill--ok"):o<=85?a.classList.add("s9-telemetry__bar-fill--warning"):a.classList.add("s9-telemetry__bar-fill--critical")}const n=t.querySelector(".s9-telemetry__value");n&&(n.textContent=Math.round(o).toString());const i=Ro.get(t)??!1,r=o>85;r&&!i&&t.dispatchEvent(new CustomEvent("s9:telemetry-threshold",{bubbles:!0,detail:{value:o}})),Ro.set(t,r)}const Hn=8e3;function zn(t,{level:e="critical",code:o,message:a,persistent:n=!1}){const i=document.createElement("div");i.className=`s9-alert s9-alert--${e}`,n&&(i.dataset.persistent="true");const r=e==="critical"?"⬡":"⚠",l=new Date().toISOString().replace("T"," ").substring(0,19)+" UTC";return i.innerHTML=`<span class="s9-alert__icon" aria-hidden="true">${r}</span><div class="s9-alert__body"><span class="s9-alert__code">${Gt(o)}</span><span class="s9-alert__message">${Gt(a)}</span></div><span class="s9-alert__timestamp">${Gt(l)}</span><button class="s9-alert__dismiss" aria-label="Dismiss alert">✕</button>`,i.classList.add("glitch-enter"),i.addEventListener("animationend",()=>i.classList.remove("glitch-enter"),{once:!0}),i.querySelector(".s9-alert__dismiss").addEventListener("click",()=>{Po(i)}),t.appendChild(i),n||setTimeout(()=>{i.isConnected&&Po(i)},Hn),i}function Po(t){var o;if(!t.isConnected)return;const e=((o=t.querySelector(".s9-alert__code"))==null?void 0:o.textContent)??"";t.classList.add("s9-alert--dismissing"),t.addEventListener("transitionend",()=>{t.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:e}})),t.remove()},{once:!0}),setTimeout(()=>{t.isConnected&&(t.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:e}})),t.remove())},400)}function Gt(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const ae="http://www.w3.org/2000/svg",ke=new WeakMap;function Wn(t,{nodes:e=[],edges:o=[]}={}){const a=new AbortController,{signal:n}=a,i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r={abortController:a,nodeMap:new Map,edgeMap:new Map,activeNodeId:null,reducedMotion:i};ke.set(t,r);const l=document.createElementNS(ae,"svg");l.setAttribute("class","s9-matrix__canvas"),l.setAttribute("viewBox","0 0 100 100"),l.setAttribute("preserveAspectRatio","xMidYMid meet"),l.setAttribute("role","img"),l.setAttribute("aria-label","Network topology matrix");const c=document.createElementNS(ae,"defs"),u=document.createElementNS(ae,"g");u.setAttribute("class","s9-matrix__edges");const d=document.createElementNS(ae,"g");d.setAttribute("class","s9-matrix__nodes"),l.appendChild(c),l.appendChild(u),l.appendChild(d),t.appendChild(l),e.forEach(s=>jn(t,s)),o.forEach(s=>Vn(t,s)),o.forEach(s=>{s.active&&Aa(t,s.id)}),l.addEventListener("click",s=>{const h=s.target.closest("[data-node-id]");h?Et(t,h.dataset.nodeId):r.activeNodeId!==null&&Et(t,null)},{signal:n}),l.addEventListener("keydown",s=>{if(s.key==="Enter"||s.key===" "){const h=s.target.closest("[data-node-id]");h&&(s.preventDefault(),Et(t,h.dataset.nodeId))}},{signal:n})}function $n(t,e){const o=ke.get(t);if(!o)return;const a=o.nodeMap.get(e);if(!a||a.classList.contains("s9-matrix__node--active"))return;a.classList.add("s9-matrix__node--pulsing");const n=a.querySelector(".s9-matrix__node-ring");n&&n.addEventListener("animationend",i=>{i.animationName==="matrix-ring-pulse"&&a.classList.remove("s9-matrix__node--pulsing")},{once:!0})}function Aa(t,e,o=null){const a=ke.get(t);if(!a)return;if(e===null){for(const[g]of a.edgeMap)Ta(t,g);return}const n=a.edgeMap.get(e);if(!n||n.active)return;const i=t.querySelector(".s9-matrix__canvas");if(!i)return;const r=i.querySelector(".s9-matrix__edges");if(!r)return;const{line:l,x1:c,y1:u,x2:d,y2:s}=n;l&&l.parentNode&&l.parentNode.removeChild(l);const h=`s9-edge-${e}`,m=document.createElementNS(ae,"path");m.setAttribute("class","s9-matrix__edge s9-matrix__edge--active"),m.setAttribute("id",h),m.setAttribute("data-edge-id",e),m.setAttribute("d",`M ${c} ${u} L ${d} ${s}`),r.appendChild(m);let f=null;if(!a.reducedMotion){f=document.createElementNS(ae,"circle"),f.setAttribute("class","s9-matrix__edge-dot"),f.setAttribute("r","1.2"),o&&(f.style.fill=o,f.style.filter=`drop-shadow(0 0 2px ${o})`);const g=document.createElementNS(ae,"animateMotion");g.setAttribute("dur","2s"),g.setAttribute("repeatCount","indefinite");const b=document.createElementNS(ae,"mpath");b.setAttributeNS("http://www.w3.org/1999/xlink","href",`#${h}`),g.appendChild(b),f.appendChild(g),r.appendChild(f)}n.line=m,n.dot=f,n.active=!0}function Ta(t,e){const o=ke.get(t);if(!o)return;const a=o.edgeMap.get(e);if(!a||!a.active)return;const n=t.querySelector(".s9-matrix__canvas");if(!n)return;const i=n.querySelector(".s9-matrix__edges");if(!i)return;const{line:r,dot:l,x1:c,y1:u,x2:d,y2:s}=a;l&&l.parentNode&&l.parentNode.removeChild(l),r&&r.parentNode&&r.parentNode.removeChild(r);const h=document.createElementNS(ae,"line");h.setAttribute("class","s9-matrix__edge"),h.setAttribute("data-edge-id",e),h.setAttribute("x1",c),h.setAttribute("y1",u),h.setAttribute("x2",d),h.setAttribute("y2",s),i.appendChild(h),a.line=h,a.dot=null,a.active=!1}function Et(t,e){const o=ke.get(t);if(!o)return;if(o.activeNodeId!==null){const n=o.nodeMap.get(o.activeNodeId);n&&(n.classList.remove("s9-matrix__node--active"),n.setAttribute("aria-pressed","false")),t.dispatchEvent(new CustomEvent("s9:matrix-node-deselect",{bubbles:!0,detail:{nodeId:o.activeNodeId}})),o.activeNodeId=null}if(e===null)return;const a=o.nodeMap.get(e);a&&(a.classList.add("s9-matrix__node--active"),a.setAttribute("aria-pressed","true"),o.activeNodeId=e,t.dispatchEvent(new CustomEvent("s9:matrix-node-click",{bubbles:!0,detail:{nodeId:e,label:a.getAttribute("aria-label")??e}})))}function jn(t,{id:e,x:o,y:a,label:n,root:i=!1}){const r=ke.get(t);if(!r)return;const l=t.querySelector(".s9-matrix__canvas");if(!l)return;const c=l.querySelector(".s9-matrix__nodes");if(!c)return;const u=document.createElementNS(ae,"g");u.setAttribute("class",`s9-matrix__node${i?" s9-matrix__node--root":""}`),u.setAttribute("data-node-id",e),u.setAttribute("tabindex","0"),u.setAttribute("role","button"),u.setAttribute("aria-label",n),u.setAttribute("aria-pressed","false");const d=document.createElementNS(ae,"circle");d.setAttribute("class","s9-matrix__node-ring"),d.setAttribute("cx",o),d.setAttribute("cy",a),d.setAttribute("r","4");const s=document.createElementNS(ae,"circle");s.setAttribute("class","s9-matrix__node-core"),s.setAttribute("cx",o),s.setAttribute("cy",a),s.setAttribute("r","2.5");const h=document.createElementNS(ae,"text");h.setAttribute("class","s9-matrix__node-label"),h.setAttribute("x",o),h.setAttribute("y",a+3.5),h.textContent=n,u.appendChild(d),u.appendChild(s),u.appendChild(h),c.appendChild(u),r.nodeMap.set(e,u)}function Vn(t,{id:e,from:o,to:a}){const n=ke.get(t);if(!n)return;const i=t.querySelector(".s9-matrix__canvas");if(!i)return;const r=i.querySelector(".s9-matrix__edges");if(!r)return;const l=n.nodeMap.get(o),c=n.nodeMap.get(a),u=l?parseFloat(l.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,d=l?parseFloat(l.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,s=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,h=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,m=document.createElementNS(ae,"line");m.setAttribute("class","s9-matrix__edge"),m.setAttribute("data-edge-id",e),m.setAttribute("x1",u),m.setAttribute("y1",d),m.setAttribute("x2",s),m.setAttribute("y2",h),r.appendChild(m),n.edgeMap.set(e,{line:m,dot:null,active:!1,from:o,to:a,x1:u,y1:d,x2:s,y2:h})}const Oo={type:"change"},fo={type:"start"},La={type:"end"},ct=new _n,Bo=new wn,qn=Math.cos(70*Rt.DEG2RAD),j=new P,te=2*Math.PI,N={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ht=1e-6;class Yn extends bn{constructor(e,o=null){super(e,o),this.state=N.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:We.ROTATE,MIDDLE:We.DOLLY,RIGHT:We.PAN},this.touches={ONE:He.ROTATE,TWO:He.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new Ao,this._lastTargetPosition=new P,this._quat=new Ao().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new To,this._sphericalDelta=new To,this._scale=1,this._panOffset=new P,this._rotateStart=new k,this._rotateEnd=new k,this._rotateDelta=new k,this._panStart=new k,this._panEnd=new k,this._panDelta=new k,this._dollyStart=new k,this._dollyEnd=new k,this._dollyDelta=new k,this._dollyDirection=new P,this._mouse=new k,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Xn.bind(this),this._onPointerDown=Kn.bind(this),this._onPointerUp=Zn.bind(this),this._onContextMenu=ni.bind(this),this._onMouseWheel=ei.bind(this),this._onKeyDown=ti.bind(this),this._onTouchStart=oi.bind(this),this._onTouchMove=ai.bind(this),this._onMouseDown=Qn.bind(this),this._onMouseMove=Jn.bind(this),this._interceptControlDown=ii.bind(this),this._interceptControlUp=si.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Oo),this.update(),this.state=N.NONE}pan(e,o){this._pan(e,o),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const o=this.object.position;j.copy(o).sub(this.target),j.applyQuaternion(this._quat),this._spherical.setFromVector3(j),this.autoRotate&&this.state===N.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let a=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(a)&&isFinite(n)&&(a<-Math.PI?a+=te:a>Math.PI&&(a-=te),n<-Math.PI?n+=te:n>Math.PI&&(n-=te),a<=n?this._spherical.theta=Math.max(a,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(a+n)/2?Math.max(a,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=r!=this._spherical.radius}if(j.setFromSpherical(this._spherical),j.applyQuaternion(this._quatInverse),o.copy(this.target).add(j),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const l=j.length();r=this._clampDistance(l*this._scale);const c=l-r;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),i=!!c}else if(this.object.isOrthographicCamera){const l=new P(this._mouse.x,this._mouse.y,0);l.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=c!==this.object.zoom;const u=new P(this._mouse.x,this._mouse.y,0);u.unproject(this.object),this.object.position.sub(u).add(l),this.object.updateMatrixWorld(),r=j.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(ct.origin.copy(this.object.position),ct.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ct.direction))<qn?this.object.lookAt(this.target):(Bo.setFromNormalAndCoplanarPoint(this.object.up,this.target),ct.intersectPlane(Bo,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>Ht||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ht||this._lastTargetPosition.distanceToSquared(this.target)>Ht?(this.dispatchEvent(Oo),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?te/60*this.autoRotateSpeed*e:te/60/60*this.autoRotateSpeed}_getZoomScale(e){const o=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*o)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,o){j.setFromMatrixColumn(o,0),j.multiplyScalar(-e),this._panOffset.add(j)}_panUp(e,o){this.screenSpacePanning===!0?j.setFromMatrixColumn(o,1):(j.setFromMatrixColumn(o,0),j.crossVectors(this.object.up,j)),j.multiplyScalar(e),this._panOffset.add(j)}_pan(e,o){const a=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;j.copy(n).sub(this.target);let i=j.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/a.clientHeight,this.object.matrix),this._panUp(2*o*i/a.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/a.clientWidth,this.object.matrix),this._panUp(o*(this.object.top-this.object.bottom)/this.object.zoom/a.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,o){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const a=this.domElement.getBoundingClientRect(),n=e-a.left,i=o-a.top,r=a.width,l=a.height;this._mouse.x=n/r*2-1,this._mouse.y=-(i/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const o=this.domElement;this._rotateLeft(te*this._rotateDelta.x/o.clientHeight),this._rotateUp(te*this._rotateDelta.y/o.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let o=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(te*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),o=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-te*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),o=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(te*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),o=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-te*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),o=!0;break}o&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),a=.5*(e.pageX+o.x),n=.5*(e.pageY+o.y);this._rotateStart.set(a,n)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),a=.5*(e.pageX+o.x),n=.5*(e.pageY+o.y);this._panStart.set(a,n)}}_handleTouchStartDolly(e){const o=this._getSecondPointerPosition(e),a=e.pageX-o.x,n=e.pageY-o.y,i=Math.sqrt(a*a+n*n);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const a=this._getSecondPointerPosition(e),n=.5*(e.pageX+a.x),i=.5*(e.pageY+a.y);this._rotateEnd.set(n,i)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const o=this.domElement;this._rotateLeft(te*this._rotateDelta.x/o.clientHeight),this._rotateUp(te*this._rotateDelta.y/o.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),a=.5*(e.pageX+o.x),n=.5*(e.pageY+o.y);this._panEnd.set(a,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const o=this._getSecondPointerPosition(e),a=e.pageX-o.x,n=e.pageY-o.y,i=Math.sqrt(a*a+n*n);this._dollyEnd.set(0,i),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+o.x)*.5,l=(e.pageY+o.y)*.5;this._updateZoomParameters(r,l)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let o=0;o<this._pointers.length;o++)if(this._pointers[o]==e.pointerId){this._pointers.splice(o,1);return}}_isTrackingPointer(e){for(let o=0;o<this._pointers.length;o++)if(this._pointers[o]==e.pointerId)return!0;return!1}_trackPointer(e){let o=this._pointerPositions[e.pointerId];o===void 0&&(o=new k,this._pointerPositions[e.pointerId]=o),o.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const o=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[o]}_customWheelEvent(e){const o=e.deltaMode,a={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(o){case 1:a.deltaY*=16;break;case 2:a.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(a.deltaY*=10),a}}function Kn(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Xn(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function Zn(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(La),this.state=N.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],o=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:o.x,pageY:o.y});break}}function Qn(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case We.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=N.DOLLY;break;case We.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=N.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=N.ROTATE}break;case We.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=N.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=N.PAN}break;default:this.state=N.NONE}this.state!==N.NONE&&this.dispatchEvent(fo)}function Jn(t){switch(this.state){case N.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case N.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case N.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function ei(t){this.enabled===!1||this.enableZoom===!1||this.state!==N.NONE||(t.preventDefault(),this.dispatchEvent(fo),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(La))}function ti(t){this.enabled!==!1&&this._handleKeyDown(t)}function oi(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case He.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=N.TOUCH_ROTATE;break;case He.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=N.TOUCH_PAN;break;default:this.state=N.NONE}break;case 2:switch(this.touches.TWO){case He.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=N.TOUCH_DOLLY_PAN;break;case He.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=N.TOUCH_DOLLY_ROTATE;break;default:this.state=N.NONE}break;default:this.state=N.NONE}this.state!==N.NONE&&this.dispatchEvent(fo)}function ai(t){switch(this._trackPointer(t),this.state){case N.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case N.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case N.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case N.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=N.NONE}}function ni(t){this.enabled!==!1&&t.preventDefault()}function ii(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function si(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Mt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class it{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const ri=new fa(-1,1,1,-1,0,1);class li extends Ce{constructor(){super(),this.setAttribute("position",new Pt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Pt([0,2,0,0,2,0],2))}}const ci=new li;class Ia{constructor(e){this._mesh=new oe(ci,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ri)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ve extends it{constructor(e,o="tDiffuse"){super(),this.textureID=o,this.uniforms=null,this.material=null,e instanceof ee?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ot.clone(e.uniforms),this.material=new ee({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ia(this.material)}render(e,o,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(o),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Fo extends it{constructor(e,o){super(),this.scene=e,this.camera=o,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,o,a){const n=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let r,l;this.inverse?(r=0,l=1):(r=1,l=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),i.buffers.stencil.setFunc(n.ALWAYS,r,4294967295),i.buffers.stencil.setClear(l),i.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(o),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(n.EQUAL,1,4294967295),i.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),i.buffers.stencil.setLocked(!0)}}class di extends it{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class po{constructor(e,o){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),o===void 0){const a=e.getSize(new k);this._width=a.width,this._height=a.height,o=new bt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:_t}),o.texture.name="EffectComposer.rt1"}else this._width=o.width,this._height=o.height;this.renderTarget1=o,this.renderTarget2=o.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ve(Mt),this.copyPass.material.blending=Sn,this.timer=new xn}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,o){this.passes.splice(o,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const o=this.passes.indexOf(e);o!==-1&&this.passes.splice(o,1)}isLastEnabledPass(e){for(let o=e+1;o<this.passes.length;o++)if(this.passes[o].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const o=this.renderer.getRenderTarget();let a=!1;for(let n=0,i=this.passes.length;n<i;n++){const r=this.passes[n];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),r.needsSwap){if(a){const l=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}Fo!==void 0&&(r instanceof Fo?a=!0:r instanceof di&&(a=!1))}}this.renderer.setRenderTarget(o)}reset(e){if(e===void 0){const o=this.renderer.getSize(new k);this._pixelRatio=this.renderer.getPixelRatio(),this._width=o.width,this._height=o.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,o){this._width=e,this._height=o;const a=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(a,n),this.renderTarget2.setSize(a,n);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(a,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class go extends it{constructor(e,o,a=null,n=null,i=null){super(),this.scene=e,this.camera=o,this.overrideMaterial=a,this.clearColor=n,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new O}render(e,o,a){const n=e.autoClear;e.autoClear=!1;let i,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),e.autoClear=n}}const ui={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new O(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Ae extends it{constructor(e,o=1,a,n){super(),this.strength=o,this.radius=a,this.threshold=n,this.resolution=e!==void 0?new k(e.x,e.y):new k(256,256),this.clearColor=new O(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new bt(i,r,{type:_t}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const s=new bt(i,r,{type:_t});s.texture.name="UnrealBloomPass.h"+d,s.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(s);const h=new bt(i,r,{type:_t});h.texture.name="UnrealBloomPass.v"+d,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),i=Math.round(i/2),r=Math.round(r/2)}const l=ui;this.highPassUniforms=ot.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ee({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];i=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new k(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=o,this.compositeMaterial.uniforms.bloomRadius.value=.1;const u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ot.clone(Mt.uniforms),this.blendMaterial=new ee({uniforms:this.copyUniforms,vertexShader:Mt.vertexShader,fragmentShader:Mt.fragmentShader,premultipliedAlpha:!0,blending:$,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new O,this._oldClearAlpha=1,this._basic=new $e,this._fsQuad=new Ia(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,o){let a=Math.round(e/2),n=Math.round(o/2);this.renderTargetBright.setSize(a,n);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(a,n),this.renderTargetsVertical[i].setSize(a,n),this.separableBlurMaterials[i].uniforms.invSize.value=new k(1/a,1/n),a=Math.round(a/2),n=Math.round(n/2)}render(e,o,a,n,i){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const r=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=a.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let l=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=l.texture,this.separableBlurMaterials[c].uniforms.direction.value=Ae.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Ae.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),l=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=r}_getSeparableBlurMaterial(e){const o=[],a=e/3;for(let n=0;n<e;n++)o.push(.39894*Math.exp(-.5*n*n/(a*a))/a);return new ee({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new k(.5,.5)},direction:{value:new k(.5,.5)},gaussianCoefficients:{value:o}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new ee({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Ae.BlurDirectionX=new k(1,0);Ae.BlurDirectionY=new k(0,1);const ko=new io,dt=new P;class st extends pa{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],o=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],a=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(a),this.setAttribute("position",new Pt(e,3)),this.setAttribute("uv",new Pt(o,2))}applyMatrix4(e){const o=this.attributes.instanceStart,a=this.attributes.instanceEnd;return o!==void 0&&(o.applyMatrix4(e),a.applyMatrix4(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const a=new Xt(o,6,1);return this.setAttribute("instanceStart",new ze(a,3,0)),this.setAttribute("instanceEnd",new ze(a,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const a=new Xt(o,6,1);return this.setAttribute("instanceColorStart",new ze(a,3,0)),this.setAttribute("instanceColorEnd",new ze(a,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ga(e.geometry)),this}fromLineSegments(e){const o=e.geometry;return this.setPositions(o.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new io);const e=this.attributes.instanceStart,o=this.attributes.instanceEnd;e!==void 0&&o!==void 0&&(this.boundingBox.setFromBufferAttribute(e),ko.setFromBufferAttribute(o),this.boundingBox.union(ko))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new va),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,o=this.attributes.instanceEnd;if(e!==void 0&&o!==void 0){const a=this.boundingSphere.center;this.boundingBox.getCenter(a);let n=0;for(let i=0,r=e.count;i<r;i++)dt.fromBufferAttribute(e,i),n=Math.max(n,a.distanceToSquared(dt)),dt.fromBufferAttribute(o,i),n=Math.max(n,a.distanceToSquared(dt));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}St.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new k(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};wt.line={uniforms:ot.merge([St.common,St.fog,St.line]),vertexShader:`
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
		`};class ue extends ee{constructor(e){super({type:"LineMaterial",uniforms:ot.clone(wt.line.uniforms),vertexShader:wt.line.vertexShader,fragmentShader:wt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const zt=new at,No=new P,Uo=new P,V=new at,q=new at,me=new at,Wt=new P,$t=new ya,K=new En,Go=new P,ut=new io,ht=new va,fe=new at;let _e,Be;function Ho(t,e,o){return fe.set(0,0,-e,1).applyMatrix4(t.projectionMatrix),fe.multiplyScalar(1/fe.w),fe.x=Be/o.width,fe.y=Be/o.height,fe.applyMatrix4(t.projectionMatrixInverse),fe.multiplyScalar(1/fe.w),Math.abs(Math.max(fe.x,fe.y))}function hi(t,e){const o=t.matrixWorld,a=t.geometry,n=a.attributes.instanceStart,i=a.attributes.instanceEnd,r=Math.min(a.instanceCount,n.count);for(let l=0,c=r;l<c;l++){K.start.fromBufferAttribute(n,l),K.end.fromBufferAttribute(i,l),K.applyMatrix4(o);const u=new P,d=new P;_e.distanceSqToSegment(K.start,K.end,d,u),d.distanceTo(u)<Be*.5&&e.push({point:d,pointOnLine:u,distance:_e.origin.distanceTo(d),object:t,face:null,faceIndex:l,uv:null,uv1:null})}}function mi(t,e,o){const a=e.projectionMatrix,i=t.material.resolution,r=t.matrixWorld,l=t.geometry,c=l.attributes.instanceStart,u=l.attributes.instanceEnd,d=Math.min(l.instanceCount,c.count),s=-e.near;_e.at(1,me),me.w=1,me.applyMatrix4(e.matrixWorldInverse),me.applyMatrix4(a),me.multiplyScalar(1/me.w),me.x*=i.x/2,me.y*=i.y/2,me.z=0,Wt.copy(me),$t.multiplyMatrices(e.matrixWorldInverse,r);for(let h=0,m=d;h<m;h++){if(V.fromBufferAttribute(c,h),q.fromBufferAttribute(u,h),V.w=1,q.w=1,V.applyMatrix4($t),q.applyMatrix4($t),V.z>s&&q.z>s)continue;if(V.z>s){const p=V.z-q.z,E=(V.z-s)/p;V.lerp(q,E)}else if(q.z>s){const p=q.z-V.z,E=(q.z-s)/p;q.lerp(V,E)}V.applyMatrix4(a),q.applyMatrix4(a),V.multiplyScalar(1/V.w),q.multiplyScalar(1/q.w),V.x*=i.x/2,V.y*=i.y/2,q.x*=i.x/2,q.y*=i.y/2,K.start.copy(V),K.start.z=0,K.end.copy(q),K.end.z=0;const g=K.closestPointToPointParameter(Wt,!0);K.at(g,Go);const b=Rt.lerp(V.z,q.z,g),_=b>=-1&&b<=1,M=Wt.distanceTo(Go)<Be*.5;if(_&&M){K.start.fromBufferAttribute(c,h),K.end.fromBufferAttribute(u,h),K.start.applyMatrix4(r),K.end.applyMatrix4(r);const p=new P,E=new P;_e.distanceSqToSegment(K.start,K.end,E,p),o.push({point:E,pointOnLine:p,distance:_e.origin.distanceTo(E),object:t,face:null,faceIndex:h,uv:null,uv1:null})}}}class Q extends oe{constructor(e=new st,o=new ue({color:Math.random()*16777215})){super(e,o),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,o=e.attributes.instanceStart,a=e.attributes.instanceEnd,n=new Float32Array(2*o.count);for(let r=0,l=0,c=o.count;r<c;r++,l+=2)No.fromBufferAttribute(o,r),Uo.fromBufferAttribute(a,r),n[l]=l===0?0:n[l-1],n[l+1]=n[l]+No.distanceTo(Uo);const i=new Xt(n,2,1);return e.setAttribute("instanceDistanceStart",new ze(i,1,0)),e.setAttribute("instanceDistanceEnd",new ze(i,1,1)),this}raycast(e,o){const a=this.material.worldUnits,n=e.camera;n===null&&!a&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const i=e.params.Line2!==void 0&&e.params.Line2.threshold||0;_e=e.ray;const r=this.matrixWorld,l=this.geometry,c=this.material;Be=c.linewidth+i,l.boundingSphere===null&&l.computeBoundingSphere(),ht.copy(l.boundingSphere).applyMatrix4(r);let u;if(a)u=Be*.5;else{const s=Math.max(n.near,ht.distanceToPoint(_e.origin));u=Ho(n,s,c.resolution)}if(ht.radius+=u,_e.intersectsSphere(ht)===!1)return;l.boundingBox===null&&l.computeBoundingBox(),ut.copy(l.boundingBox).applyMatrix4(r);let d;if(a)d=Be*.5;else{const s=Math.max(n.near,ut.distanceToPoint(_e.origin));d=Ho(n,s,c.resolution)}ut.expandByScalar(d),_e.intersectsBox(ut)!==!1&&(a?hi(this,o):mi(this,n,o))}onBeforeRender(e){const o=this.material.uniforms;o&&o.resolution&&(e.getViewport(zt),this.material.uniforms.resolution.value.set(zt.z,zt.w))}}const fi=40,pi=70,Re=1,U=new WeakMap;let Da=null;function gi(){return Da}function Ra(t){Da=t}function Qt(t,e,o=1.03){const a=(90-t)*(Math.PI/180),n=(e+180)*(Math.PI/180);return new P(-o*Math.sin(a)*Math.cos(n),o*Math.cos(a),o*Math.sin(a)*Math.sin(n))}let mt=null,zo=0;function Ne(t=!1){const e=Date.now();if(!t&&mt&&e-zo<500)return mt;const o=getComputedStyle(document.documentElement);return mt={neonCyan:o.getPropertyValue("--neon-cyan").trim(),neonGreen:o.getPropertyValue("--neon-green").trim(),neonWarn:o.getPropertyValue("--neon-warn").trim(),neonAlert:o.getPropertyValue("--neon-alert").trim(),neonSelect:o.getPropertyValue("--neon-select").trim()||"#00ffff"},zo=e,mt}function Fe(t,e){return t<=fi?e.neonGreen:t<=pi?e.neonWarn:e.neonAlert}function tt(t,e,o,a){return[(e+180)/360*o,(90-t)/180*a]}const vi={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.5},scanlineOpacity:{value:.035},aberrationAmt:{value:.0022}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `};function yi(t){return t}function bi(t){if(t==null)return yi;var e,o,a=t.scale[0],n=t.scale[1],i=t.translate[0],r=t.translate[1];return function(l,c){c||(e=o=0);var u=2,d=l.length,s=new Array(d);for(s[0]=(e+=l[0])*a+i,s[1]=(o+=l[1])*n+r;u<d;)s[u]=l[u],++u;return s}}function _i(t,e){for(var o,a=t.length,n=a-e;n<--a;)o=t[n],t[n++]=t[a],t[a]=o}function wi(t,e){return typeof e=="string"&&(e=t.objects[e]),e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(o){return Wo(t,o)})}:Wo(t,e)}function Wo(t,e){var o=e.id,a=e.bbox,n=e.properties==null?{}:e.properties,i=Pa(t,e);return o==null&&a==null?{type:"Feature",properties:n,geometry:i}:a==null?{type:"Feature",id:o,properties:n,geometry:i}:{type:"Feature",id:o,bbox:a,properties:n,geometry:i}}function Pa(t,e){var o=bi(t.transform),a=t.arcs;function n(d,s){s.length&&s.pop();for(var h=a[d<0?~d:d],m=0,f=h.length;m<f;++m)s.push(o(h[m],m));d<0&&_i(s,f)}function i(d){return o(d)}function r(d){for(var s=[],h=0,m=d.length;h<m;++h)n(d[h],s);return s.length<2&&s.push(s[0]),s}function l(d){for(var s=r(d);s.length<4;)s.push(s[0]);return s}function c(d){return d.map(l)}function u(d){var s=d.type,h;switch(s){case"GeometryCollection":return{type:s,geometries:d.geometries.map(u)};case"Point":h=i(d.coordinates);break;case"MultiPoint":h=d.coordinates.map(i);break;case"LineString":h=r(d.arcs);break;case"MultiLineString":h=d.arcs.map(r);break;case"Polygon":h=c(d.arcs);break;case"MultiPolygon":h=d.arcs.map(c);break;default:return null}return{type:s,coordinates:h}}return u(e)}function Si(t,e){var o={},a={},n={},i=[],r=-1;e.forEach(function(u,d){var s=t.arcs[u<0?~u:u],h;s.length<3&&!s[1][0]&&!s[1][1]&&(h=e[++r],e[r]=u,e[d]=h)}),e.forEach(function(u){var d=l(u),s=d[0],h=d[1],m,f;if(m=n[s])if(delete n[m.end],m.push(u),m.end=h,f=a[h]){delete a[f.start];var g=f===m?m:m.concat(f);a[g.start=m.start]=n[g.end=f.end]=g}else a[m.start]=n[m.end]=m;else if(m=a[h])if(delete a[m.start],m.unshift(u),m.start=s,f=n[s]){delete n[f.end];var b=f===m?m:f.concat(m);a[b.start=f.start]=n[b.end=m.end]=b}else a[m.start]=n[m.end]=m;else m=[u],a[m.start=s]=n[m.end=h]=m});function l(u){var d=t.arcs[u<0?~u:u],s=d[0],h;return t.transform?(h=[0,0],d.forEach(function(m){h[0]+=m[0],h[1]+=m[1]})):h=d[d.length-1],u<0?[h,s]:[s,h]}function c(u,d){for(var s in u){var h=u[s];delete d[h.start],delete h.start,delete h.end,h.forEach(function(m){o[m<0?~m:m]=1}),i.push(h)}}return c(n,a),c(a,n),e.forEach(function(u){o[u<0?~u:u]||i.push([u])}),i}function $o(t){return Pa(t,xi.apply(this,arguments))}function xi(t,e,o){var a,n,i;if(arguments.length>1)a=Ei(t,e,o);else for(n=0,a=new Array(i=t.arcs.length);n<i;++n)a[n]=n;return{type:"MultiLineString",arcs:Si(t,a)}}function Ei(t,e,o){var a=[],n=[],i;function r(s){var h=s<0?~s:s;(n[h]||(n[h]=[])).push({i:s,g:i})}function l(s){s.forEach(r)}function c(s){s.forEach(l)}function u(s){s.forEach(c)}function d(s){switch(i=s,s.type){case"GeometryCollection":s.geometries.forEach(d);break;case"LineString":l(s.arcs);break;case"MultiLineString":case"Polygon":c(s.arcs);break;case"MultiPolygon":u(s.arcs);break}}return d(e),n.forEach(o==null?function(s){a.push(s[0].i)}:function(s){o(s[0].g,s[s.length-1].g)&&a.push(s[0].i)}),a}function Ze(t,e){const o=[];for(const n of t)for(let i=0;i<n.length-1;i++){const[r,l]=n[i],[c,u]=n[i+1],d=Qt(l,r,e),s=Qt(u,c,e);o.push(d.x,d.y,d.z,s.x,s.y,s.z)}const a=new st;return a.setPositions(new Float32Array(o)),a}async function Mi(t){const e=U.get(t);if(!e)return;let o;try{const E=await fetch("/data/countries-110m.json",{signal:e.abortController.signal});if(!E.ok)throw new Error(`HTTP ${E.status}`);o=await E.json(),Ra(o)}catch(E){if(E.name==="AbortError")return;console.warn("[s9-threatmap] geo lines: failed to load /data/countries-110m.json",E);return}const a=U.get(t);if(!a)return;const n=t.clientWidth||800,i=t.clientHeight||600,r=new so,l=a.cyanColor,c=$o(o,o.objects.land),u=new ue({color:l,linewidth:1,transparent:!0,opacity:1,depthWrite:!0});u.resolution.set(n,i);const d=new ue({color:l,linewidth:1,transparent:!0,opacity:1,blending:$,depthWrite:!0});d.resolution.set(n,i);const s=new ue({color:l,linewidth:1.5,transparent:!0,opacity:.7,blending:$,depthWrite:!1});s.resolution.set(n,i);const h=new Q(Ze(c.coordinates,1.002),u),m=new Q(Ze(c.coordinates,1.006),d),f=new Q(Ze(c.coordinates,1.011),s);h.userData.geoType=m.userData.geoType=f.userData.geoType="coast",r.add(f,m,h);const g=$o(o,o.objects.countries,(E,w)=>E!==w),b=new ue({color:l,linewidth:1,transparent:!0,opacity:.55,depthWrite:!0});b.resolution.set(n,i);const _=new ue({color:l,linewidth:1,transparent:!0,opacity:.3,blending:$,depthWrite:!1});_.resolution.set(n,i);const M=new Q(Ze(g.coordinates,1.012),b),p=new Q(Ze(g.coordinates,1.022),_);M.userData.geoType=p.userData.geoType="border",r.add(p,M),a.scene.add(r),a.satelliteMode&&(r.visible=!1),a.geoGroup=r,a.geoLineMats=[u,d,s,b,_]}const Y={NODE_FLASH_DUR:80,NODE_SETTLE_DUR:140,NODE_SCALE_PEAK:1.9,NODE_SCALE_DUR:220,NODE_SCALE_RISE:.35,CROSSHAIR_IN_DELAY:40,LABEL_CHAR_RATE:38,LABEL_CURSOR_BLINK:530,LABEL_START_DELAY:250,COORD_SCRAMBLE_DUR:320,COORD_SCRAMBLE_DELAY:80,DESELECT_LABEL_DUR:100,DESELECT_CROSSHAIR_DELAY:80,DESELECT_NODE_DELAY:120,DESELECT_NODE_DUR:180,NODE_DESELECT_SCALE_TROUGH:.65};function jo(t){return 1-Math.pow(1-t,3)}function Vo(t){return t*t*t}function qo(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}function Ci(t){const e=U.get(t);if(!e)return;e.nodeTween&&e.nodeTween.mesh.scale.setScalar(1),e.deselectTween&&e.deselectTween.mesh.scale.setScalar(1),e.nodeTween=null,e.deselectTween=null,e.tweenGeneration++;for(const a of e.pendingTimers)clearTimeout(a);e.pendingTimers=[],e.labelTypewriter&&(e.labelTypewriter.cancel(),e.labelTypewriter=null),e.coordScrambleLat&&(e.coordScrambleLat.cancel(),e.coordScrambleLat=null),e.coordScrambleLng&&(e.coordScrambleLng.cancel(),e.coordScrambleLng=null);const o=t.querySelector(".s9-threatmap__crosshair");o&&(o.classList.remove("s9-threatmap__crosshair--animating-in","s9-threatmap__crosshair--animating-out"),o.offsetWidth)}function Ai(t,e,o,a,n){if(e.length===0)return t.textContent="",{cancel:()=>{}};let i=0,r=!0,l=null,c=null,u=!1;function d(){u=!0,clearTimeout(c),clearInterval(l)}function s(){t.textContent=e.slice(0,i)+(r?"_":" ")}s(),l=setInterval(()=>{u||(r=!r,s())},a);function h(){u||(i++,s(),i<e.length?c=setTimeout(h,o):c=setTimeout(()=>{u||(clearInterval(l),t.textContent=e)},a))}return c=setTimeout(h,o),{cancel:d}}function Yo(t,e,o,a,n,i){const r=Date.now(),l=Math.abs(o),c=Math.max(1,Math.floor(Math.log10(l||1))+1);let u=null,d=!1;function s(){d=!0,clearTimeout(u)}function h(){if(d)return;if(Date.now()-r>=n){t.textContent=`${e}${o.toFixed(a)}°`;return}const f=(Math.random()*Math.pow(10,c)).toFixed(a),g=o<0?"-":"";t.textContent=`${e}${g}${f}°`,u=setTimeout(h,40)}return h(),{cancel:s}}function Ve(t,e){const o=U.get(t);if(!o)return;Ci(t);const a=Ne(),n=o.activeNodeId;if(n!==null){o.activeNodeId=null,t.removeAttribute("data-active-node"),t.dispatchEvent(new CustomEvent("s9:threatmap-node-deselect",{bubbles:!0,detail:{nodeId:n}}));const s=o.nodeMap.get(n);if(e===null){if(s){s.mesh.material.color.set(a.neonSelect||"#00ffff");const b=new O(a.neonSelect||"#00ffff"),_=new O(Fe(s.level,a)),M=t.querySelector(".s9-threatmap__crosshair-label");M&&M.classList.add("s9-threatmap__crosshair-label--fading");const p=setTimeout(()=>{M&&(M.textContent="",M.classList.remove("s9-threatmap__crosshair-label--fading"))},Y.DESELECT_LABEL_DUR);o.pendingTimers.push(p);const E=setTimeout(()=>{const y=t.querySelector(".s9-threatmap__crosshair");y&&(y.classList.remove("s9-threatmap__crosshair--animating-in","s9-threatmap__crosshair--visible"),y.offsetWidth,y.classList.add("s9-threatmap__crosshair--animating-out"))},Y.DESELECT_CROSSHAIR_DELAY);o.pendingTimers.push(E);const w=setTimeout(()=>{o.deselectTween={generation:o.tweenGeneration,t0:Date.now(),dur:Y.DESELECT_NODE_DUR,troughScale:Y.NODE_DESELECT_SCALE_TROUGH,selectColor:b,levelColor:_,mesh:s.mesh,element:t}},Y.DESELECT_NODE_DELAY);o.pendingTimers.push(w)}else{const b=t.querySelector(".s9-threatmap__crosshair");b&&b.classList.remove("s9-threatmap__crosshair--visible");const _=t.querySelector(".s9-threatmap__crosshair-label");_&&(_.textContent="")}const f=t.querySelector(".s9-threatmap__coords-lat"),g=t.querySelector(".s9-threatmap__coords-lng");f&&(f.textContent="LAT: --.-°"),g&&(g.textContent="LNG: --.-°");return}s&&(s.mesh.scale.setScalar(1),s.mesh.material.color.set(Fe(s.level,a)));const h=t.querySelector(".s9-threatmap__crosshair");h&&h.classList.remove("s9-threatmap__crosshair--visible");const m=t.querySelector(".s9-threatmap__crosshair-label");m&&(m.textContent="")}if(e===null)return;const i=o.nodeMap.get(e);if(!i)return;if(o.activeNodeId=e,t.setAttribute("data-active-node",e),t.dispatchEvent(new CustomEvent("s9:threatmap-node-select",{bubbles:!0,detail:{nodeId:e,label:i.label,lat:i.lat,lng:i.lng,level:i.level}})),o.reducedMotion){i.mesh.material.color.set(a.neonSelect||"#00ffff"),i.mesh.scale.setScalar(1);const s=t.querySelector(".s9-threatmap__crosshair");s&&s.classList.add("s9-threatmap__crosshair--visible");const h=t.querySelector(".s9-threatmap__crosshair-label");h&&(h.textContent=i.label);const m=t.querySelector(".s9-threatmap__coords-lat"),f=t.querySelector(".s9-threatmap__coords-lng");m&&(m.textContent=`LAT: ${i.lat.toFixed(2)}°`),f&&(f.textContent=`LNG: ${i.lng.toFixed(2)}°`);return}const r=new O("#ffffff"),l=new O(a.neonSelect||"#00ffff");i.mesh.material.color.copy(r),i.mesh.scale.setScalar(1),o.nodeTween={generation:o.tweenGeneration,t0:Date.now(),dur:Y.NODE_SCALE_DUR,riseFrac:Y.NODE_SCALE_RISE,peakScale:Y.NODE_SCALE_PEAK,flashDur:Y.NODE_FLASH_DUR,settleDur:Y.NODE_SETTLE_DUR,flashColor:r,selectColor:l,mesh:i.mesh};const c=setTimeout(()=>{const s=t.querySelector(".s9-threatmap__crosshair");s&&s.classList.add("s9-threatmap__crosshair--visible","s9-threatmap__crosshair--animating-in")},Y.CROSSHAIR_IN_DELAY);o.pendingTimers.push(c);const u=setTimeout(()=>{const s=t.querySelector(".s9-threatmap__coords-lat"),h=t.querySelector(".s9-threatmap__coords-lng");s&&(o.coordScrambleLat=Yo(s,"LAT: ",i.lat,2,Y.COORD_SCRAMBLE_DUR)),h&&(o.coordScrambleLng=Yo(h,"LNG: ",i.lng,2,Y.COORD_SCRAMBLE_DUR))},Y.COORD_SCRAMBLE_DELAY);o.pendingTimers.push(u);const d=setTimeout(()=>{const s=t.querySelector(".s9-threatmap__crosshair-label");s&&(o.labelTypewriter=Ai(s,i.label,Y.LABEL_CHAR_RATE,Y.LABEL_CURSOR_BLINK))},Y.LABEL_START_DELAY);o.pendingTimers.push(d)}function vo(t,e){if(!U.get(t))return;const a=Math.max(0,Math.min(100,e));t.setAttribute("data-threat-level",a)}function yo(t,e,o){const a=U.get(t);if(!a)return;const n=a.nodeMap.get(e);if(!n)return;const i=n.level;if(n.level=o,n.mesh.userData.level=o,a.activeNodeId!==e){const r=Ne();n.mesh.material.color.set(Fe(o,r))}return i}function bo(t,e){const o=U.get(t);if(!o)return;const a=o.nodeMap.get(e);if(!a||Date.now()-o.lastOrbitInteraction<3e3)return;const n=o.camera.position.length();o.cameraLerpTarget=a.mesh.position.clone().normalize().multiplyScalar(n),o.controls.autoRotate=!1,o.resumeTimer!==null&&(clearTimeout(o.resumeTimer),o.resumeTimer=null)}const Ti=t=>t,Oa=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,Ba=t=>t>=1?1:1-Math.pow(2,-10*t),Li=t=>{const o=2.5949095;return t<.5?Math.pow(2*t,2)*((o+1)*2*t-o)/2:(Math.pow(2*t-2,2)*((o+1)*(2*t-2)+o)+2)/2};function Te({radius:t,numRings:e,samplesPerRing:o,latitudeMin:a,latitudeMax:n,upAxis:i,mode:r="latitude"}){const l=e*o,c=new Float32Array(l*6),u=new Float32Array(l),d=new Float32Array(l);let s=0,h=0;if(r==="longitude"){const f=Math.sin(a),g=Math.sin(n);for(let b=0;b<e;b++){const _=f+b/e*(g-f),M=Math.sqrt(Math.max(0,1-_*_));for(let p=0;p<o;p++){const E=p/o*2*Math.PI,w=(p+1)/o*2*Math.PI;c[s++]=t*_,c[s++]=t*M*Math.cos(E),c[s++]=t*M*Math.sin(E),c[s++]=t*_,c[s++]=t*M*Math.cos(w),c[s++]=t*M*Math.sin(w),u[h]=b,d[h]=p/o,h++}}}else{const f=Math.sin(a),g=Math.sin(n);for(let b=0;b<e;b++){const _=f+b/e*(g-f),M=Math.sqrt(Math.max(0,1-_*_));for(let p=0;p<o;p++){const E=p/o*2*Math.PI,w=(p+1)/o*2*Math.PI;c[s++]=t*M*Math.cos(E),c[s++]=t*_,c[s++]=t*M*Math.sin(E),c[s++]=t*M*Math.cos(w),c[s++]=t*_,c[s++]=t*M*Math.sin(w),u[h]=b,d[h]=p/o,h++}}}const m=new st;return m.setPositions(c),m.setAttribute("ringIndex",new we(u,1)),m.setAttribute("arcPosition",new we(d,1)),i==="z"&&m.applyMatrix4(new ya().makeRotationX(-Math.PI/2)),m}const Ii=`
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
`,Di=`
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
`,Ri=`
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
`;function Pi(t){return t==="north-to-south"?1:t==="equator-out"?2:0}function Oi({lineColor:t,lineColorB:e,opacity:o,emissiveIntensity:a,numRings:n,stagger:i,ringFade:r,invert:l,warpAmount:c,direction:u,colorSpread:d,brightSpread:s,flickerAmp:h,flickerSpeed:m,arcColorSpread:f,scrollSpeed:g,scrollAxis:b,gradientMode:_,jitter:M}){return{uProgress:{value:0},uNumRings:{value:n},uStagger:{value:i},uRingFade:{value:r},uInvert:{value:l??0},uOpacity:{value:o},uEmissiveIntensity:{value:a},uColor:{value:new O(t)},uColorB:{value:new O(e??t)},uDirection:{value:Pi(u)},uWarpAmount:{value:c},uColorSpread:{value:d},uBrightSpread:{value:s},uFlickerAmp:{value:h},uFlickerSpeed:{value:m},uTime:{value:0},uArcColorSpread:{value:f??0},uScrollSpeed:{value:g??0},uScrollAxis:{value:b??0},uGradientMode:{value:_??0},uJitter:{value:M??0}}}function Bi(t){t.vertexShader.includes("vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 )")||console.warn("[RingReveal] LineMaterial vertex shader injection point changed — warp may be misaligned. Check Three.js version."),t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
attribute float ringIndex;
attribute float arcPosition;
varying float vAlpha;
varying vec3  vRingColor;
varying float vFlickerMult;
${Ii}
${Di}`),t.vertexShader=t.vertexShader.replace("vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );",`float _scrollOff = uTime * uScrollSpeed;
    float _R = length(instanceStart);
    float _normPos;
    if (uScrollAxis == 1) {
      _normPos = mod(instanceStart.y / _R + _scrollOff + 1.0, 2.0) / 2.0;
    } else {
      _normPos = mod(instanceStart.x / _R + _scrollOff + 1.0, 2.0) / 2.0;
    }
    ${Ri}
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
  gl_FragColor = vec4(vRingColor * uEmissiveIntensity * max(vFlickerMult, 0.0), vAlpha * uOpacity);`)}function Le(t){const{lineWidth:e,blending:o,resolution:a}=t,n=new ue({color:16777215,linewidth:e,transparent:!0,depthWrite:!1,blending:o,worldUnits:!1,resolution:a??new k(typeof window<"u"?window.innerWidth:1920,typeof window<"u"?window.innerHeight:1080)});return Object.assign(n.uniforms,Oi(t)),n.onBeforeCompile=i=>{Object.assign(i.uniforms,n.uniforms),Bi(i)},n}const ft=new O,pt=new O;function Qe(t){return t==="latitude"?1:0}const Fi={radius:1,numRings:48,samplesPerRing:256,latitudeMin:-Math.PI/2,latitudeMax:Math.PI/2,durationMs:1800,easingFn:Oa,direction:"south-to-north",stagger:.4,ringFade:.35,lineColor:65484,lineColorB:65484,lineWidth:1,opacity:.7,glowColor:65484,glowColorB:65484,glowOpacity:.25,glowRadius:1.008,glowLayers:3,glowLayerRadiusStep:.004,glowLayerOpacityFalloff:.5,emissiveIntensity:1.5,warpAmount:.12,morphDurationMs:800,upAxis:"y",mode:"latitude",scrollSpeed:0,colorSpread:0,brightSpread:0,flickerAmp:0,flickerSpeed:2,arcColorSpread:0,gradientMode:0,jitter:0,invert:!1};class ki{constructor(e,o={}){this._scene=e,this._options={...Fi,...o},this._options.ringFade=Math.max(.001,this._options.ringFade),this._options.numRings=Math.max(2,this._options.numRings),this._options.samplesPerRing=Math.max(3,this._options.samplesPerRing),this._options.stagger=Math.max(0,Math.min(1,this._options.stagger)),this._options.radius=Math.max(Number.EPSILON,this._options.radius),this._options.glowRadius=Math.max(Number.EPSILON,this._options.glowRadius),this._options.glowLayers=Math.max(1,Math.round(this._options.glowLayers)),this._playing=!1,this._reversed=!1,this._elapsed=0,this._progress=0,this._onComplete=null,this._morph=null,this._time=0,this._resolution=new k(typeof window<"u"?window.innerWidth:1920,typeof window<"u"?window.innerHeight:1080),this._build()}get isPlaying(){return this._playing}get progress(){return this._progress}get baseRings(){return this._baseRings}get glowRings(){return this._glowLayers[0]}get glowLayers(){return this._glowLayers}play(e){this._reversed=!1,this._playing=!0,this._onComplete=e??null}reverse(e){this._reversed=!0,this._playing=!0,this._onComplete=e??null;const o=1-this._progress;let a=0,n=1;for(let i=0;i<24;i++){const r=(a+n)*.5;this._options.easingFn(r)<o?a=r:n=r}this._elapsed=a*this._options.durationMs}stop(){this._playing=!1}reset(){this._playing=!1,this._reversed=!1,this._elapsed=0,this._progress=0,this._onComplete=null,this._disposeCrossFade(),this._morph=null,this._setProgress(0)}tick(e){var a;this._time+=e/1e3,this._baseRings.material.uniforms.uTime.value=this._time,this._glowLayers.forEach(n=>{n.material.uniforms.uTime.value=this._time});const o=(a=this._morph)==null?void 0:a.crossFade;if(o&&(o.oldBase.material.uniforms.uTime.value=this._time,o.oldGlowLayers.forEach(n=>{n.material.uniforms.uTime.value=this._time})),this._playing){this._elapsed+=e;const n=Math.min(this._elapsed/this._options.durationMs,1),i=this._options.easingFn(n);if(this._progress=this._reversed?1-i:i,this._setProgress(this._progress),this._reversed?this._progress<=0:this._progress>=1){this._playing=!1;const l=this._onComplete;this._onComplete=null,l==null||l()}}if(this._morph){this._morph.elapsed+=e;const n=Math.min(this._morph.elapsed/this._morph.durationMs,1);this._applyMorphT(n),n>=1&&(this._morph=null)}}setColors(e,o){this._baseRings.material.uniforms.uColor.value.set(e),this._glowLayers.forEach(a=>a.material.uniforms.uColor.value.set(o)),this._options.lineColor=e,this._options.glowColor=o}setOpacity(e,o){this._baseRings.material.uniforms.uOpacity.value=e,this._options.opacity=e,o!==void 0&&(this._glowLayers.forEach((a,n)=>{a.material.uniforms.uOpacity.value=o*Math.pow(this._options.glowLayerOpacityFalloff,n)}),this._options.glowOpacity=o)}setScrollSpeed(e){this._options.scrollSpeed=e,this._allMaterials().forEach(o=>{o.uniforms.uScrollSpeed.value=e})}setGradientMode(e){this._options.gradientMode=e,this._allMaterials().forEach(o=>{o.uniforms.uGradientMode.value=e})}setJitter(e){this._options.jitter=e,this._allMaterials().forEach(o=>{o.uniforms.uJitter.value=e})}setInvert(e){this._options.invert=e,this._allMaterials().forEach(o=>{o.uniforms.uInvert.value=e?1:0})}setMode(e){if(e===this._options.mode)return;this._options.mode=e;const o=Qe(e);this._allMaterials().forEach(a=>{a.uniforms.uScrollAxis.value=o}),this._rebuildGeometry()}setResolution(e,o){this._resolution.set(e,o),this._allMaterials().forEach(a=>{var n;return(n=a.resolution)==null?void 0:n.set(e,o)})}morphTo(e,o){var b;const a=o??this._options.morphDurationMs,n=this._options,i=this._baseRings.material,r=this._glowLayers[0].material;e.durationMs!==void 0&&(n.durationMs=e.durationMs),e.easingFn!==void 0&&(n.easingFn=e.easingFn),e.direction!==void 0&&(n.direction=e.direction),e.morphDurationMs!==void 0&&(n.morphDurationMs=e.morphDurationMs),e.upAxis!==void 0&&(n.upAxis=e.upAxis),e.latitudeMin!==void 0&&(n.latitudeMin=e.latitudeMin),e.latitudeMax!==void 0&&(n.latitudeMax=e.latitudeMax),e.scrollSpeed!==void 0&&this.setScrollSpeed(e.scrollSpeed),e.mode!==void 0&&e.mode!==n.mode&&(n.mode=e.mode),e.lineWidth!==void 0&&(n.lineWidth=e.lineWidth,this._allMaterials().forEach(_=>{_.linewidth=e.lineWidth})),e.glowLayerOpacityFalloff!==void 0&&e.glowLayerOpacityFalloff!==n.glowLayerOpacityFalloff&&(n.glowLayerOpacityFalloff=e.glowLayerOpacityFalloff,this._glowLayers.forEach((_,M)=>{_.material.uniforms.uOpacity.value=n.glowOpacity*Math.pow(n.glowLayerOpacityFalloff,M)}));const l=e.glowLayers!==void 0&&e.glowLayers!==n.glowLayers,c=e.glowLayerRadiusStep!==void 0&&e.glowLayerRadiusStep!==n.glowLayerRadiusStep;l&&(n.glowLayers=Math.max(1,Math.round(e.glowLayers))),c&&(n.glowLayerRadiusStep=e.glowLayerRadiusStep),(l||c)&&this._rebuildGlowLayers();const u=n.radius,d=e.radius??n.radius,s=e.numRings!==void 0&&e.numRings!==n.numRings,h=e.samplesPerRing!==void 0&&e.samplesPerRing!==n.samplesPerRing,m=e.mode!==void 0&&e.mode!==n.mode;let f=null;if(s||h||m){const _=this._baseRings,M=this._glowLayers.slice(),p=i.uniforms.uOpacity.value,E=M.map(x=>x.material.uniforms.uOpacity.value);s&&(n.numRings=e.numRings),h&&(n.samplesPerRing=e.samplesPerRing),m&&(n.mode=e.mode);const w={radius:n.radius,numRings:n.numRings,samplesPerRing:n.samplesPerRing,latitudeMin:n.latitudeMin,latitudeMax:n.latitudeMax,upAxis:n.upAxis,mode:n.mode},y={lineWidth:n.lineWidth,numRings:n.numRings,stagger:i.uniforms.uStagger.value,ringFade:i.uniforms.uRingFade.value,warpAmount:i.uniforms.uWarpAmount.value,emissiveIntensity:i.uniforms.uEmissiveIntensity.value,direction:n.direction,colorSpread:i.uniforms.uColorSpread.value,brightSpread:i.uniforms.uBrightSpread.value,flickerAmp:i.uniforms.uFlickerAmp.value,flickerSpeed:i.uniforms.uFlickerSpeed.value,arcColorSpread:i.uniforms.uArcColorSpread.value,scrollSpeed:n.scrollSpeed,scrollAxis:Qe(n.mode),gradientMode:n.gradientMode,jitter:n.jitter,invert:n.invert?1:0,resolution:this._resolution},S=Le({...y,lineColor:i.uniforms.uColor.value.getHex(),lineColorB:i.uniforms.uColorB.value.getHex(),opacity:0,blending:xt});this._baseRings=new Q(Te(w),S),this._baseRings.renderOrder=_.renderOrder,this._scene.add(this._baseRings),this._glowLayers=[];for(let x=0;x<n.glowLayers;x++){const C=n.radius*n.glowRadius*(1+x*n.glowLayerRadiusStep),v=Le({...y,lineColor:r.uniforms.uColor.value.getHex(),lineColorB:r.uniforms.uColorB.value.getHex(),opacity:0,blending:$}),T=new Q(Te({...w,radius:C}),v);T.renderOrder=((b=M[0])==null?void 0:b.renderOrder)??0,this._scene.add(T),this._glowLayers.push(T)}this._setProgress(this._progress),this._baseRings.material.uniforms.uTime.value=this._time,this._glowLayers.forEach(x=>{x.material.uniforms.uTime.value=this._time}),f={oldBase:_,oldGlowLayers:M,oldBaseOpacity:p,oldGlowLayerOpacities:E}}const g=this._glowLayers[0].material;this._morph={elapsed:0,durationMs:Math.max(a,0),crossFade:f,from:{lineColor:i.uniforms.uColor.value.clone(),lineColorB:i.uniforms.uColorB.value.clone(),glowColor:r.uniforms.uColor.value.clone(),glowColorB:r.uniforms.uColorB.value.clone(),opacity:f?0:i.uniforms.uOpacity.value,glowOpacity:f?0:r.uniforms.uOpacity.value,emissiveIntensity:i.uniforms.uEmissiveIntensity.value,stagger:i.uniforms.uStagger.value,warpAmount:i.uniforms.uWarpAmount.value,ringFade:i.uniforms.uRingFade.value,colorSpread:i.uniforms.uColorSpread.value,brightSpread:i.uniforms.uBrightSpread.value,flickerAmp:i.uniforms.uFlickerAmp.value,flickerSpeed:i.uniforms.uFlickerSpeed.value,arcColorSpread:i.uniforms.uArcColorSpread.value,jitter:i.uniforms.uJitter.value,radius:u},to:{lineColor:e.lineColor!==void 0?new O(e.lineColor):i.uniforms.uColor.value.clone(),lineColorB:e.lineColorB!==void 0?new O(e.lineColorB):i.uniforms.uColorB.value.clone(),glowColor:e.glowColor!==void 0?new O(e.glowColor):g.uniforms.uColor.value.clone(),glowColorB:e.glowColorB!==void 0?new O(e.glowColorB):g.uniforms.uColorB.value.clone(),opacity:e.opacity??i.uniforms.uOpacity.value,glowOpacity:e.glowOpacity??g.uniforms.uOpacity.value,emissiveIntensity:e.emissiveIntensity??i.uniforms.uEmissiveIntensity.value,stagger:e.stagger??i.uniforms.uStagger.value,warpAmount:e.warpAmount??i.uniforms.uWarpAmount.value,ringFade:e.ringFade??i.uniforms.uRingFade.value,colorSpread:e.colorSpread??i.uniforms.uColorSpread.value,brightSpread:e.brightSpread??i.uniforms.uBrightSpread.value,flickerAmp:e.flickerAmp??i.uniforms.uFlickerAmp.value,flickerSpeed:e.flickerSpeed??i.uniforms.uFlickerSpeed.value,arcColorSpread:e.arcColorSpread??i.uniforms.uArcColorSpread.value,jitter:e.jitter??i.uniforms.uJitter.value,radius:d}},a<=0&&(this._applyMorphT(1),this._morph=null)}dispose(){this._disposeCrossFade(),this._scene.remove(this._baseRings),this._baseRings.geometry.dispose(),this._baseRings.material.dispose(),this._glowLayers.forEach(e=>{this._scene.remove(e),e.geometry.dispose(),e.material.dispose()})}_allMaterials(){return[this._baseRings.material,...this._glowLayers.map(e=>e.material)]}_disposeCrossFade(){var o;const e=(o=this._morph)==null?void 0:o.crossFade;e&&(this._scene.remove(e.oldBase),e.oldBase.geometry.dispose(),e.oldBase.material.dispose(),e.oldGlowLayers.forEach(a=>{this._scene.remove(a),a.geometry.dispose(),a.material.dispose()}))}_build(){const e=this._options,o={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},a={lineWidth:e.lineWidth,emissiveIntensity:e.emissiveIntensity,numRings:e.numRings,stagger:e.stagger,ringFade:e.ringFade,warpAmount:e.warpAmount,direction:e.direction,colorSpread:e.colorSpread,brightSpread:e.brightSpread,flickerAmp:e.flickerAmp,flickerSpeed:e.flickerSpeed,arcColorSpread:e.arcColorSpread,scrollSpeed:e.scrollSpeed,scrollAxis:Qe(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,invert:e.invert?1:0,resolution:this._resolution},n=Le({...a,lineColor:e.lineColor,lineColorB:e.lineColorB,opacity:e.opacity,blending:xt});this._baseRings=new Q(Te(o),n),this._scene.add(this._baseRings),this._glowLayers=[];for(let i=0;i<e.glowLayers;i++){const r=e.radius*e.glowRadius*(1+i*e.glowLayerRadiusStep),l=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,i),c=Le({...a,lineColor:e.glowColor,lineColorB:e.glowColorB,opacity:l,blending:$}),u=new Q(Te({...o,radius:r}),c);this._scene.add(u),this._glowLayers.push(u)}}_rebuildGlowLayers(){var u,d;const e=this._options,o=(u=this._glowLayers[0])==null?void 0:u.material,a=o?o.uniforms.uColor.value.getHex():e.glowColor,n=o?o.uniforms.uColorB.value.getHex():e.glowColorB,i=((d=this._glowLayers[0])==null?void 0:d.renderOrder)??0;this._glowLayers.forEach(s=>{this._scene.remove(s),s.geometry.dispose(),s.material.dispose()});const r=this._baseRings.material,l={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},c={lineWidth:e.lineWidth,numRings:e.numRings,stagger:r.uniforms.uStagger.value,ringFade:r.uniforms.uRingFade.value,warpAmount:r.uniforms.uWarpAmount.value,emissiveIntensity:r.uniforms.uEmissiveIntensity.value,direction:e.direction,colorSpread:r.uniforms.uColorSpread.value,brightSpread:r.uniforms.uBrightSpread.value,flickerAmp:r.uniforms.uFlickerAmp.value,flickerSpeed:r.uniforms.uFlickerSpeed.value,scrollSpeed:e.scrollSpeed,scrollAxis:Qe(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,resolution:this._resolution};this._glowLayers=[];for(let s=0;s<e.glowLayers;s++){const h=e.radius*e.glowRadius*(1+s*e.glowLayerRadiusStep),m=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,s),f=Le({...c,lineColor:a,lineColorB:n,opacity:m,blending:$}),g=new Q(Te({...l,radius:h}),f);g.renderOrder=i,g.material.uniforms.uProgress.value=this._progress,g.material.uniforms.uTime.value=this._time,this._scene.add(g),this._glowLayers.push(g)}}_rebuildGeometry(){var u,d,s;const e=this._options,o=this._baseRings,a=this._glowLayers.slice(),n=o.material,i={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},r={lineWidth:e.lineWidth,numRings:e.numRings,stagger:n.uniforms.uStagger.value,ringFade:n.uniforms.uRingFade.value,warpAmount:n.uniforms.uWarpAmount.value,emissiveIntensity:n.uniforms.uEmissiveIntensity.value,direction:e.direction,colorSpread:n.uniforms.uColorSpread.value,brightSpread:n.uniforms.uBrightSpread.value,flickerAmp:n.uniforms.uFlickerAmp.value,flickerSpeed:n.uniforms.uFlickerSpeed.value,arcColorSpread:((u=n.uniforms.uArcColorSpread)==null?void 0:u.value)??0,scrollSpeed:e.scrollSpeed,scrollAxis:Qe(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,resolution:this._resolution},l=Le({...r,lineColor:n.uniforms.uColor.value.getHex(),lineColorB:n.uniforms.uColorB.value.getHex(),opacity:n.uniforms.uOpacity.value,blending:xt});this._baseRings=new Q(Te(i),l),this._baseRings.renderOrder=o.renderOrder,this._baseRings.material.uniforms.uProgress.value=this._progress,this._baseRings.material.uniforms.uTime.value=this._time,this._scene.add(this._baseRings);const c=(d=a[0])==null?void 0:d.material;this._glowLayers=[];for(let h=0;h<e.glowLayers;h++){const m=e.radius*e.glowRadius*(1+h*e.glowLayerRadiusStep),f=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,h),g=Le({...r,lineColor:(c==null?void 0:c.uniforms.uColor.value.getHex())??e.glowColor,lineColorB:(c==null?void 0:c.uniforms.uColorB.value.getHex())??e.glowColorB,opacity:f,blending:$}),b=new Q(Te({...i,radius:m}),g);b.renderOrder=((s=a[0])==null?void 0:s.renderOrder)??0,b.material.uniforms.uProgress.value=this._progress,b.material.uniforms.uTime.value=this._time,this._scene.add(b),this._glowLayers.push(b)}this._scene.remove(o),o.geometry.dispose(),o.material.dispose(),a.forEach(h=>{this._scene.remove(h),h.geometry.dispose(),h.material.dispose()})}_setProgress(e){this._baseRings.material.uniforms.uProgress.value=e,this._glowLayers.forEach(o=>{o.material.uniforms.uProgress.value=e})}_applyMorphT(e){const{from:o,to:a}=this._morph,n=this._baseRings.material,i=(u,d)=>u+(d-u)*e;ft.lerpColors(o.lineColor,a.lineColor,e),n.uniforms.uColor.value.copy(ft),pt.lerpColors(o.lineColorB,a.lineColorB,e),n.uniforms.uColorB.value.copy(pt),n.uniforms.uOpacity.value=i(o.opacity,a.opacity),n.uniforms.uEmissiveIntensity.value=i(o.emissiveIntensity,a.emissiveIntensity),n.uniforms.uStagger.value=i(o.stagger,a.stagger),n.uniforms.uWarpAmount.value=i(o.warpAmount,a.warpAmount),n.uniforms.uRingFade.value=i(o.ringFade,a.ringFade),n.uniforms.uColorSpread.value=i(o.colorSpread,a.colorSpread),n.uniforms.uBrightSpread.value=i(o.brightSpread,a.brightSpread),n.uniforms.uFlickerAmp.value=i(o.flickerAmp,a.flickerAmp),n.uniforms.uFlickerSpeed.value=i(o.flickerSpeed,a.flickerSpeed),n.uniforms.uArcColorSpread.value=i(o.arcColorSpread,a.arcColorSpread),n.uniforms.uJitter.value=i(o.jitter,a.jitter),ft.lerpColors(o.glowColor,a.glowColor,e),pt.lerpColors(o.glowColorB,a.glowColorB,e);const r=i(o.glowOpacity,a.glowOpacity),l=this._options.glowLayerOpacityFalloff;this._glowLayers.forEach((u,d)=>{const s=u.material;s.uniforms.uColor.value.copy(ft),s.uniforms.uColorB.value.copy(pt),s.uniforms.uOpacity.value=r*Math.pow(l,d),s.uniforms.uEmissiveIntensity.value=i(o.emissiveIntensity,a.emissiveIntensity),s.uniforms.uStagger.value=i(o.stagger,a.stagger),s.uniforms.uWarpAmount.value=i(o.warpAmount,a.warpAmount),s.uniforms.uRingFade.value=i(o.ringFade,a.ringFade),s.uniforms.uColorSpread.value=i(o.colorSpread,a.colorSpread),s.uniforms.uBrightSpread.value=i(o.brightSpread,a.brightSpread),s.uniforms.uFlickerAmp.value=i(o.flickerAmp,a.flickerAmp),s.uniforms.uFlickerSpeed.value=i(o.flickerSpeed,a.flickerSpeed),s.uniforms.uArcColorSpread.value=i(o.arcColorSpread,a.arcColorSpread),s.uniforms.uJitter.value=i(o.jitter,a.jitter)});const c=i(o.radius,a.radius)/this._options.radius;if(this._baseRings.scale.setScalar(c),this._glowLayers.forEach(u=>u.scale.setScalar(c)),this._morph.crossFade){const{oldBase:u,oldGlowLayers:d,oldBaseOpacity:s,oldGlowLayerOpacities:h}=this._morph.crossFade;u.material.uniforms.uOpacity.value=s*(1-e),u.material.uniforms.uProgress.value=this._progress,d.forEach((m,f)=>{m.material.uniforms.uOpacity.value=h[f]*(1-e),m.material.uniforms.uProgress.value=this._progress}),e>=1&&(this._scene.remove(u),u.geometry.dispose(),u.material.dispose(),d.forEach(m=>{this._scene.remove(m),m.geometry.dispose(),m.material.dispose()}))}if(e>=1){const u=this._options;u.opacity=a.opacity,u.glowOpacity=a.glowOpacity,u.emissiveIntensity=a.emissiveIntensity,u.stagger=a.stagger,u.warpAmount=a.warpAmount,u.ringFade=a.ringFade,u.colorSpread=a.colorSpread,u.brightSpread=a.brightSpread,u.flickerAmp=a.flickerAmp,u.flickerSpeed=a.flickerSpeed,u.arcColorSpread=a.arcColorSpread,u.jitter=a.jitter,u.lineColor=a.lineColor.getHex(),u.lineColorB=a.lineColorB.getHex(),u.glowColor=a.glowColor.getHex(),u.glowColorB=a.glowColorB.getHex(),u.radius=a.radius}}}function Ni(t){return t==="bracket"?`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-bracket" aria-hidden="true">
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tr"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--bl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--br"></span>
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`:t==="diamond"?`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-diamond" aria-hidden="true">
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`:`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-box" aria-hidden="true">
    <span class="s9-threatmap__crosshair-label"></span>
  </div>`}function Fa(t,{autoRotate:e=!0,bloomStrength:o=1.7,crosshairShape:a="box"}={}){const n=new AbortController,{signal:i}=n,r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,l=Ne(),c=new ro({antialias:!0,alpha:!0});c.setPixelRatio(window.devicePixelRatio),c.setSize(t.clientWidth||800,t.clientHeight||600),c.domElement.classList.add("s9-threatmap__canvas"),t.appendChild(c.domElement);const u=new lo,d=new ba(45,(t.clientWidth||800)/(t.clientHeight||600),.1,100);d.position.set(0,0,3);const s=new De(Re,48,48),h=new De(Re*.98,48,48),m=new O(l.neonCyan||"#00d4b0"),f=new ga(s).getAttribute("position").array,g=new st;g.setPositions(f);const b=t.clientWidth||800,_=t.clientHeight||600,M=new ue({color:m,linewidth:1,transparent:!0,opacity:.014,depthTest:!0,depthWrite:!1});M.resolution.set(b,_);const p=new Q(g,M);p.renderOrder=0,u.add(p);const E=new $e({colorWrite:!1,depthWrite:!0,depthTest:!0,depthFunc:Cn,side:Mn}),w=new oe(h,E);w.renderOrder=1,u.add(w);const y=new $e({colorWrite:!1,depthWrite:!0,depthTest:!0,side:Zt}),S=new oe(s,y);S.renderOrder=1,u.add(S);const x=new $e({color:new O("#010e0b"),transparent:!0,opacity:.72,depthTest:!0,depthWrite:!0,side:_a}),C=new oe(s,x);C.renderOrder=1,u.add(C);const v=new ue({color:m,linewidth:1,transparent:!0,opacity:.05,depthTest:!0,depthWrite:!1});v.resolution.set(b,_);const T=new Q(g,v);T.renderOrder=2,u.add(T);const B=new ue({color:m,linewidth:1,transparent:!0,opacity:.03,blending:$,depthTest:!0,depthWrite:!1});B.resolution.set(b,_);const z=new Q(g,B);z.renderOrder=3,u.add(z);const le=new De(Re,48,48),ce=new ee({uniforms:{uColor:{value:new P(m.r,m.g,m.b)}},vertexShader:`
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
    `,transparent:!0,blending:$,depthWrite:!1,side:Zt}),F=new oe(le,ce);F.renderOrder=4,u.add(F);const R=new Yn(d,c.domElement);R.enableDamping=!0,R.dampingFactor=.05,R.autoRotate=e&&!r,R.autoRotateSpeed=.4,R.enablePan=!1,R.minDistance=1.5,R.maxDistance=5,R.minPolarAngle=Math.PI/2-42.5*Math.PI/180,R.maxPolarAngle=Math.PI/2+42.5*Math.PI/180;const ne=new po(c),ie=new go(u,d);ne.addPass(ie);const se=new Ae(new k(t.clientWidth||800,t.clientHeight||600),o*2,.4,.3);ne.addPass(se);const Ye=new ve(vi);ne.addPass(Ye);const Ue=document.createElement("div");Ue.className="s9-threatmap__overlay",Ue.innerHTML=`
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tr" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--bl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--br" aria-hidden="true"></div>
    ${Ni(a)}
    <div class="s9-threatmap__coords" aria-live="polite">
      <span class="s9-threatmap__coords-lat">LAT: --.-°</span>
      <span class="s9-threatmap__coords-lng">LNG: --.-°</span>
    </div>
    <div class="s9-threatmap__node-count">NODES: 0</div>
  `,t.appendChild(Ue);let Ke=null;R.addEventListener("start",()=>{R.autoRotate=!1,Ke!==null&&(clearTimeout(Ke),Ke=null);const L=U.get(t);L&&(L.cameraLerpTarget=null,L.lastOrbitInteraction=Date.now())}),R.addEventListener("end",()=>{!r&&e&&(Ke=setTimeout(()=>{R.autoRotate=!0,Ke=null},6e3))});const So=new ResizeObserver(()=>{const L=t.clientWidth,Z=t.clientHeight;if(!L||!Z)return;d.aspect=L/Z,d.updateProjectionMatrix(),c.setSize(L,Z),ne.setSize(L,Z),se.resolution.set(L,Z);const re=U.get(t);if(re){re.globeBackMat.resolution.set(L,Z),re.globeFrontMat.resolution.set(L,Z),re.globeGlowMat.resolution.set(L,Z);for(const I of re.geoLineMats)I.resolution.set(L,Z)}});So.observe(t);const xo=new An;c.domElement.addEventListener("click",L=>{const Z=U.get(t);if(!Z)return;const re=c.domElement.getBoundingClientRect(),I=re.width,W=re.height,G=(L.clientX-re.left)/I*2-1,J=-((L.clientY-re.top)/W)*2+1;xo.setFromCamera(new k(G,J),d);const xe=Array.from(Z.nodeMap.values()).map(de=>de.mesh),he=xo.intersectObjects(xe,!1);if(he.length>0){const de=he[0].object;Ve(t,de.userData.nodeId)}else Z.activeNodeId!==null&&Ve(t,null)},{signal:i}),U.set(t,{animFrameId:null,renderer:c,composer:ne,bloomPass:se,controls:R,scene:u,camera:d,resizeObserver:So,nodeMap:new Map,edgeMap:new Map,abortController:n,resumeTimer:null,reducedMotion:r,activeNodeId:null,colors:l,cyanColor:m,globeGeo:s,occluderGeo:h,globeBack:p,globeBackMat:M,occluder:w,frontOccluder:S,globeSurface:C,globeFront:T,globeFrontMat:v,globeGlow:z,globeGlowMat:B,rimGeo:le,rimMesh:F,geoGroup:null,geoLineMats:[],cameraLerpTarget:null,lastOrbitInteraction:0,arcs:[],satelliteMode:!1,sunAngle:Math.random()*Math.PI*2,satelliteGroup:null,holoPass:Ye,nodeGeo:new De(.02,8,8),nodeTween:null,deselectTween:null,labelTypewriter:null,coordScrambleLat:null,coordScrambleLng:null,pendingTimers:[],tweenGeneration:0,crosshairShape:a});const Eo=U.get(t);let Mo=performance.now();function Co(){const L=U.get(t);if(!L)return;L.animFrameId=requestAnimationFrame(Co);const Z=performance.now(),re=Z-Mo;Mo=Z,L.revealAnim&&L.revealAnim.tick(re),L.cameraLerpTarget&&Date.now()-L.lastOrbitInteraction>=3e3&&(L.camera.position.lerp(L.cameraLerpTarget,.06),L.camera.position.distanceTo(L.cameraLerpTarget)<.04&&(L.camera.position.copy(L.cameraLerpTarget),L.cameraLerpTarget=null)),L.controls.update();for(let I=L.arcs.length-1;I>=0;I--){const W=L.arcs[I],G=Math.min(1,(Date.now()-W.t0)/W.dur);if(W.particle.position.copy(W.curve.getPoint(G)),G>.75){const J=1-(G-.75)/.25;W.ptMat.opacity=.9*J,W.lineMat.opacity=.1*J}G>=1&&(L.scene.remove(W.line),L.scene.remove(W.particle),W.lineGeo.dispose(),W.lineMat.dispose(),W.ptGeo.dispose(),W.ptMat.dispose(),L.arcs.splice(I,1))}if(L.satelliteMode&&L.satMat){L.sunAngle+=15e-5;const I=performance.now()*.001;L.satMat.uniforms.sunDir.value.set(Math.cos(L.sunAngle),.22,Math.sin(L.sunAngle)).normalize(),L.satMat.uniforms.time.value=I,L.atmMat&&(L.atmMat.uniforms.time.value=I)}if(L.holoPass&&(L.holoPass.uniforms.time.value=performance.now()*.001),L.activeNodeId!==null){const I=L.nodeMap.get(L.activeNodeId),W=t.querySelector(".s9-threatmap__crosshair");if(I&&W){const G=t.clientWidth,J=t.clientHeight,xe=I.mesh.position.clone().project(L.camera),he=(xe.x*.5+.5)*G,de=(-xe.y*.5+.5)*J;W.style.left=`${he}px`,W.style.top=`${de}px`}}if(L.nodeTween){const I=L.nodeTween,W=Date.now()-I.t0,G=Math.min(1,W/I.dur),J=G<I.riseFrac?jo(G/I.riseFrac):Vo((G-I.riseFrac)/(1-I.riseFrac)),xe=G<I.riseFrac?1+(I.peakScale-1)*J:I.peakScale-(I.peakScale-1)*J;I.mesh.scale.setScalar(xe);const he=I.flashDur/I.dur,de=I.settleDur/I.dur;if(G<he)I.mesh.material.color.copy(I.flashColor);else if(G<he+de){const yn=(G-he)/de;I.mesh.material.color.lerpColors(I.flashColor,I.selectColor,qo(yn))}else I.mesh.material.color.copy(I.selectColor);G>=1&&(I.mesh.scale.setScalar(1),I.mesh.material.color.copy(I.selectColor),L.nodeTween=null)}if(L.deselectTween){const I=L.deselectTween,W=Date.now()-I.t0,G=Math.min(1,W/I.dur),J=.4,xe=G<J?Vo(G/J):jo((G-J)/(1-J)),he=G<J?1-(1-I.troughScale)*xe:I.troughScale+(1-I.troughScale)*xe;if(I.mesh.scale.setScalar(he),I.mesh.material.color.lerpColors(I.selectColor,I.levelColor,qo(G)),G>=1){I.mesh.scale.setScalar(1),I.mesh.material.color.copy(I.levelColor);const de=I.element.querySelector(".s9-threatmap__crosshair");de&&de.classList.remove("s9-threatmap__crosshair--animating-out"),L.deselectTween=null}}L.composer.render()}const kt=new ki(u,{radius:Re*1.003,numRings:56,durationMs:2e3,easingFn:Ba,direction:"south-to-north",stagger:.55,lineColor:65484,glowColor:65484,emissiveIntensity:2,opacity:0,glowOpacity:0});kt.baseRings.renderOrder=4,kt.glowRings.renderOrder=4,Eo.revealAnim=kt,Eo.animFrameId=requestAnimationFrame(Co),Mi(t)}function Ui(t){var e;return((e=U.get(t))==null?void 0:e.camera)??null}function Gi(t){var e;return((e=U.get(t))==null?void 0:e.revealAnim)??null}function Hi(t){var e;return((e=U.get(t))==null?void 0:e.scene)??null}function zi(t,e){const o=U.get(t);if(!o)return;const a=o.edgeMap.get(e);a&&(a.line.geometry.dispose(),a.line.material.dispose(),o.scene.remove(a.line),o.edgeMap.delete(e))}function ka(t){const e=U.get(t);if(!e)return;const o=t.querySelector(".s9-threatmap__node-count");o&&(o.textContent=`NODES: ${e.nodeMap.size}`)}function Na(t,{id:e,lat:o,lng:a,label:n,level:i}){const r=U.get(t);if(!r)return;if(o<-90||o>90||a<-180||a>180){console.warn(`[s9-threatmap] addNode: invalid coordinates for "${e}": lat=${o}, lng=${a}`);return}if(r.nodeMap.has(e)){console.warn(`[s9-threatmap] addNode: node "${e}" already exists.`);return}const l=Ne(),c=Fe(i,l),u=new $e({color:new O(c)}),d=new oe(r.nodeGeo,u);d.renderOrder=5;const s=Qt(o,a);d.position.copy(s),d.userData.nodeId=e,d.userData.label=n,d.userData.lat=o,d.userData.lng=a,d.userData.level=i,r.scene.add(d),r.nodeMap.set(e,{mesh:d,lat:o,lng:a,label:n,level:i}),ka(t)}function Ua(t,e){const o=U.get(t);if(!o)return;const a=o.nodeMap.get(e);if(!a){console.warn(`[s9-threatmap] removeNode: node "${e}" not found.`);return}o.activeNodeId===e&&Ve(t,null);for(const[n,i]of o.edgeMap)(i.from===e||i.to===e)&&zi(t,n);a.mesh.material.dispose(),o.scene.remove(a.mesh),o.nodeMap.delete(e),ka(t)}function Wi(t,e){const o=U.get(t);if(!o||o.reducedMotion)return;const a=o.nodeMap.get(e);if(!a)return;const n=Ne(),i=Fe(a.level,n),r=20,l=.035,c=[];for(let b=0;b<=r;b++){const _=b/r*Math.PI*2;c.push(new P(Math.cos(_)*l,Math.sin(_)*l,0))}const u=new Ce().setFromPoints(c),d=new Oe({color:new O(i),transparent:!0,opacity:.8,depthWrite:!1}),s=new co(u,d);s.renderOrder=5,s.position.copy(a.mesh.position);const h=a.mesh.position.clone().normalize();s.quaternion.setFromUnitVectors(new P(0,0,1),h),o.scene.add(s);const m=performance.now(),f=700;let g;(function b(_){if(!U.get(t)){cancelAnimationFrame(g),o.scene.remove(s),u.dispose(),d.dispose();return}const M=Math.min(1,(_-m)/f);s.scale.setScalar(1+M*6),d.opacity=.85*(1-M),M<1?g=requestAnimationFrame(b):(o.scene.remove(s),u.dispose(),d.dispose())})(performance.now())}function $i(t,e,o){const a=U.get(t);if(!a||a.reducedMotion)return;const n=a.nodeMap.get(e),i=a.nodeMap.get(o);if(!n||!i)return;const r=Ne(),l=Fe(i.level,r),c=n.mesh.position.clone(),u=i.mesh.position.clone(),d=c.clone().add(u).multiplyScalar(.5),s=.2+d.length()*.25,h=d.clone().normalize().multiplyScalar(Re+s),m=new Tn(c,h,u),f=new Ce().setFromPoints(m.getPoints(48)),g=new Oe({color:new O(l),transparent:!0,opacity:.1,depthWrite:!1}),b=new uo(f,g);b.renderOrder=2;const _=new De(.009,4,4),M=new $e({color:new O(l),transparent:!0,opacity:.9}),p=new oe(_,M);p.renderOrder=3,p.position.copy(c),a.scene.add(b),a.scene.add(p),a.arcs.push({curve:m,line:b,lineGeo:f,lineMat:g,particle:p,ptGeo:_,ptMat:M,t0:Date.now(),dur:1e3+Math.random()*700})}function ji(t=null){const a=document.createElement("canvas");a.width=2048,a.height=1024;const n=a.getContext("2d"),i=n.createLinearGradient(0,0,0,1024);if(i.addColorStop(0,"#071a2e"),i.addColorStop(.15,"#082035"),i.addColorStop(.5,"#0a2a46"),i.addColorStop(.85,"#082035"),i.addColorStop(1,"#071a2e"),n.fillStyle=i,n.fillRect(0,0,2048,1024),t){const r=wi(t,t.objects.land),c=(r.type==="FeatureCollection"?r.features:[r]).flatMap(s=>{const h=s.geometry;return h?h.type==="Polygon"?[h.coordinates]:h.coordinates:[]}),u=n.createLinearGradient(0,0,0,1024);u.addColorStop(0,"#dce8dc"),u.addColorStop(.06,"#8a9c7a"),u.addColorStop(.16,"#527848"),u.addColorStop(.28,"#4e7040"),u.addColorStop(.4,"#4a6c34"),u.addColorStop(.5,"#3a5c24"),u.addColorStop(.6,"#4a6c34"),u.addColorStop(.72,"#4e7040"),u.addColorStop(.84,"#7a8c6a"),u.addColorStop(.92,"#ccd8c4"),u.addColorStop(1,"#eaf0ea");for(const s of c)for(let h=0;h<s.length;h++){const m=s[h];n.beginPath();for(let f=0;f<m.length;f++){const[g,b]=m[f],_=(g+180)/360*2048,M=(90-b)/180*1024;f===0?n.moveTo(_,M):n.lineTo(_,M)}n.closePath(),n.fillStyle=h===0?u:"#0a2a46",n.fill()}const d=[[22,15,16,28,"rgba(172,142, 88,0.72)"],[23,44,8,12,"rgba(178,148, 96,0.68)"],[27,70,5,9,"rgba(182,158,112,0.52)"],[42,100,6,16,"rgba(152,128, 86,0.58)"],[-25,132,10,17,"rgba(168,134, 82,0.58)"],[-22,-68,4,6,"rgba(142,118, 76,0.48)"],[35,-114,5,8,"rgba(158,128, 82,0.42)"],[40,58,5,8,"rgba(158,134, 88,0.45)"]];for(const[s,h,m,f,g]of d){const[b,_]=tt(s,h,2048,1024),M=f/360*2048,p=m/180*1024,E=n.createRadialGradient(b,_,0,b,_,Math.max(M,p)),w=g.replace(/[\d.]+\)$/,"0)");E.addColorStop(0,g),E.addColorStop(.55,g),E.addColorStop(.88,g.replace(/[\d.]+\)$/,"0.08)")),E.addColorStop(1,w),n.fillStyle=E,n.beginPath(),n.ellipse(b,_,M,p,0,0,Math.PI*2),n.fill()}n.strokeStyle="rgba(120,175,210,0.22)",n.lineWidth=.8;for(const s of c){const h=s[0];n.beginPath();for(let m=0;m<h.length;m++){const[f,g]=h[m],b=(f+180)/360*2048,_=(90-g)/180*1024;m===0?n.moveTo(b,_):n.lineTo(b,_)}n.closePath(),n.stroke()}}n.strokeStyle="rgba(100,150,200,0.04)",n.lineWidth=.5;for(let r=-80;r<=80;r+=30){const l=tt(r,0,2048,1024)[1];n.beginPath(),n.moveTo(0,l),n.lineTo(2048,l),n.stroke()}for(let r=-180;r<=180;r+=30){const l=tt(0,r,2048,1024)[0];n.beginPath(),n.moveTo(l,0),n.lineTo(l,1024),n.stroke()}return a}function Vi(){const o=document.createElement("canvas");o.width=1024,o.height=512;const a=o.getContext("2d");a.fillStyle="#000810",a.fillRect(0,0,1024,512);const n=[[40.7,-74,4],[34,-118.2,3.5],[41.9,-87.6,3],[29.8,-95.4,2.5],[19.4,-99.1,3],[43.7,-79.4,3],[45.5,-73.6,2.5],[49.3,-123.1,2],[38.9,-77,2.5],[42.4,-71.1,2.5],[32.8,-96.8,2.5],[33.7,-84.4,2],[37.8,-122.4,2.5],[47.6,-122.3,2],[39.7,-105,2],[33.4,-112.1,2],[36.2,-115.1,2],[29.4,-98.5,2],[32.7,-97.1,2],[30.3,-81.7,1.5],[51,-114.1,2],[53.5,-113.5,2],[49.9,-97.1,2],[14.1,-87.2,1.5],[13.7,-89.2,1.5],[-23.5,-46.6,4],[-22.9,-43.2,3.5],[-34.6,-58.4,3.5],[-12,-77,2],[4.7,-74.1,2],[10.5,-66.9,2],[-33.5,-70.7,2.5],[-3.7,-38.5,2],[-8.1,-34.9,2],[-19.9,-43.9,2.5],[-30,-51.2,2],[-15.8,-47.9,2],[51.5,-.1,4],[48.9,2.3,4],[52.5,13.4,3.5],[55.8,37.6,4],[41,28.9,3.5],[59.9,10.8,2],[59.3,18.1,2],[60.2,25,2],[52.2,21,2.5],[50.1,14.4,2.5],[47.5,19,2.5],[48.2,16.4,2.5],[47.4,8.5,2.5],[48.1,11.6,3],[52.4,4.9,3],[40.4,-3.7,3],[41.4,2.2,3],[45.5,9.2,3],[41.9,12.5,3],[37.9,23.7,2.5],[50,8.7,2.5],[51,13.7,2],[51.2,6.8,2.5],[50.9,4.3,2.5],[53.5,-2.2,2],[55.7,12.6,2],[50.5,30.5,2.5],[59.5,30.3,2.5],[48,37.8,2],[46.5,30.7,2],[49.8,24,2],[50.4,30.5,2],[45.4,28,2],[44.4,26.1,2],[42.7,23.3,2],[37.1,-8.6,2],[30.1,31.3,3.5],[25.2,55.3,2.5],[33.3,44.4,2.5],[35.7,51.4,3],[24.7,46.7,2.5],[31.8,35.2,2],[33.9,35.5,2],[36.8,10.2,2],[32.9,13.2,2],[30.7,29.7,2],[6.5,3.4,2.5],[-26.2,28,3],[-33.9,18.4,2],[-1.3,36.8,2],[5.3,-4,2],[14.7,17.4,1.5],[9.1,7.4,2],[4.4,18.6,1.5],[-4.3,15.3,1.5],[-11.7,43.3,1.5],[-18.9,47.5,1.5],[28.6,77.2,4],[19.1,72.9,3.5],[12.9,77.6,3],[23.7,90.4,3],[24.9,67,2.5],[31.6,74.3,2.5],[33.7,73.1,2],[17.4,78.5,2.5],[22.6,88.4,2.5],[13.1,80.3,2.5],[23,72.6,2],[22.3,70.8,2],[26.9,75.8,2],[21.2,81.4,2],[27.7,85.3,2],[41.3,69.2,2],[43.3,76.9,2],[51.2,71.5,1.5],[53.9,27.6,2],[54.7,55.9,2],[56.8,60.6,2],[55,73.4,2],[56,92.9,2],[52.3,104.3,2],[53.7,87.1,2],[62,129.7,1.5],[43.1,131.9,2],[61.8,34.4,2],[35.7,139.7,5],[37.5,127,4],[39.9,116.4,4.5],[31.2,121.5,4.5],[23.1,113.3,4],[22.3,114.2,3.5],[30.6,104.1,3.5],[32.1,118.8,3.5],[30.3,120.2,3],[36.7,117,2.5],[34.3,108.9,2.5],[26,119.3,2.5],[41.8,123.4,2.5],[45.8,126.5,2.5],[34.6,135.5,3.5],[33.6,130.4,3],[1.3,103.8,3.5],[13.7,100.5,2.5],[10.8,106.7,2.5],[14.6,121,2.5],[3.1,101.7,2.5],[6.2,106.8,3],[21,105.8,2],[-6.2,106.8,2.5],[-33.9,151.2,2.5],[-37.8,144.9,2],[-27.5,153,2],[-31.9,115.9,2],[-43.5,172.6,1.5]];for(const[i,r,l]of n){const[c,u]=tt(i,r,1024,512),d=l*2.2,s=a.createRadialGradient(c,u,0,c,u,d);s.addColorStop(0,"rgba(255,210,120,0.22)"),s.addColorStop(.5,"rgba(255,170,60,0.08)"),s.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=s,a.beginPath(),a.arc(c,u,d,0,Math.PI*2),a.fill()}a.globalCompositeOperation="lighter";for(const[i,r,l]of n){const[c,u]=tt(i,r,1024,512),d=Math.max(1,l*.9),s=a.createRadialGradient(c,u,0,c,u,d);s.addColorStop(0,`rgba(255,245,200,${Math.min(.9,.5+l*.1)})`),s.addColorStop(.6,"rgba(255,200,100,0.15)"),s.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=s,a.beginPath(),a.arc(c,u,d,0,Math.PI*2),a.fill()}return a.globalCompositeOperation="source-over",o}function Ko(t){return new Promise((e,o)=>{new wa().load(t,e,void 0,o)})}async function qi(t){const e=U.get(t);if(!e||e.satelliteGroup)return;let o,a,n=1;try{[o,a]=await Promise.all([Ko("/textures/earth_day.jpg"),Ko("/textures/earth_night.jpg")]),o.colorSpace=Lo,a.colorSpace=Lo}catch(h){console.warn("[s9-threatmap] satellite textures not found, using procedural fallback",h);let m=gi();if(!m)try{const f=await fetch("/data/countries-110m.json");f.ok&&(m=await f.json(),Ra(m))}catch{}o=new Io(ji(m)),a=new Io(Vi()),n=0}const i=new ee({uniforms:{dayMap:{value:o},nightMap:{value:a},sunDir:{value:new P(Math.cos(e.sunAngle),.22,Math.sin(e.sunAngle)).normalize()},realTex:{value:n},time:{value:0}},vertexShader:`
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
    `}),r=new De(Re,128,64),l=new oe(r,i);l.renderOrder=0;const c=new De(Re*1.055,64,32),u=new ee({uniforms:{glowCol:{value:new O(51455)},sunDir:{value:i.uniforms.sunDir.value},time:{value:0}},vertexShader:`
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
    `,side:Zt,blending:$,transparent:!0,depthWrite:!1}),d=new oe(c,u);d.renderOrder=1;const s=new so;s.add(l),s.add(d),s.visible=!1,e.scene.add(s),Object.assign(e,{satelliteGroup:s,satGeo:r,satMat:i,atmGeo:c,atmMat:u,dayTex:o,nightTex:a})}async function Yi(t,e){const o=U.get(t);o&&(e?(o.globeBack&&(o.globeBack.visible=!1),o.occluder&&(o.occluder.visible=!1),o.frontOccluder&&(o.frontOccluder.visible=!1),o.globeFront&&(o.globeFront.visible=!1),o.globeSurface&&(o.globeSurface.visible=!1),o.globeGlow&&(o.globeGlow.visible=!1),o.rimMesh&&(o.rimMesh.visible=!1),o.geoGroup&&(o.geoGroup.visible=!1),o.bloomPass&&(o._bloomPrev={strength:o.bloomPass.strength,threshold:o.bloomPass.threshold,radius:o.bloomPass.radius},o.bloomPass.strength=.32,o.bloomPass.threshold=.85,o.bloomPass.radius=.35),o.satelliteMode=!0,await qi(t),o.satelliteGroup&&(o.satelliteGroup.visible=!0)):(o.satelliteGroup&&(o.satelliteGroup.visible=!1),o.globeBack&&(o.globeBack.visible=!0),o.occluder&&(o.occluder.visible=!0),o.frontOccluder&&(o.frontOccluder.visible=!0),o.globeFront&&(o.globeFront.visible=!0),o.globeSurface&&(o.globeSurface.visible=!0),o.globeGlow&&(o.globeGlow.visible=!0),o.rimMesh&&(o.rimMesh.visible=!0),o.geoGroup&&(o.geoGroup.visible=!0),o.bloomPass&&o._bloomPrev&&(o.bloomPass.strength=o._bloomPrev.strength,o.bloomPass.threshold=o._bloomPrev.threshold,o.bloomPass.radius=o._bloomPrev.radius),o.satelliteMode=!1))}function Xo(t){const e=U.get(t);if(!e)return;const o=Ne(!0);e.colors=o;const a=o.neonCyan||"#00d48ddf";if(e.globeBack&&e.globeBack.material.color.set(a),e.globeFront&&e.globeFront.material.color.set(a),e.geoLineMats){const n=o.neonCyan||"#008410D0";for(const i of e.geoLineMats)i.color.set(n)}for(const n of e.nodeMap.values()){const i=Fe(n.level,o);n.mesh.material.color.set(i),n.mesh.material.emissive.set(i)}}const Ki=new WeakMap;function Xi(t){const e=new AbortController;Ki.set(t,e),t.classList.add("s9-panel--booting"),t.addEventListener("animationend",o=>{o.animationName==="crt-flicker"&&(t.classList.remove("s9-panel--booting"),t.dispatchEvent(new CustomEvent("s9:panel-mount",{bubbles:!0,detail:{id:t.dataset.s9Id??null}})))},{signal:e.signal,once:!0})}const jt=["complete","active","failed","pending"];function Zi(t,e){if(!jt.includes(e)){console.warn(`[s9-sequence] Unknown state: "${e}". Expected one of: ${jt.join(", ")}.`);return}jt.forEach(o=>t.classList.remove(`s9-sequence__entry--${o}`)),e==="failed"?(t.classList.add("s9-sequence__entry--fail-flash"),t.addEventListener("animationend",()=>{t.classList.remove("s9-sequence__entry--fail-flash"),t.classList.add("s9-sequence__entry--failed"),Zo(t,e)},{once:!0})):(t.classList.add(`s9-sequence__entry--${e}`),Zo(t,e))}function Zo(t,e){t.dispatchEvent(new CustomEvent("s9:sequence-step-change",{bubbles:!0,detail:{state:e}}))}const Qi={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new k(1/1024,1/512)}},vertexShader:`

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
`,Ji={uniforms:{tDiffuse:{value:null},tPrev:{value:null},decay:{value:.88}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},es={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.42},scanlineOpacity:{value:.045},aberrationAmt:{value:.0025}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},ts={uniforms:{tDiffuse:{value:null},uTime:{value:0},uHeatAmt:{value:.004},uHeatFreq:{value:60},uHeatSpeed:{value:3.5}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},os={uniforms:{tDiffuse:{value:null},uTime:{value:0},uStreakAmt:{value:.055},uAspect:{value:1.78}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},as={uniforms:{tDiffuse:{value:null},uBlurStrength:{value:.006}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},ns=`
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
`,is=`
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
`,ss={uniforms:{tDiffuse:{value:null},uLightPos:{value:null},uDensity:{value:.93},uDecay:{value:.96},uWeight:{value:.35},uExposure:{value:.45},uClampMax:{value:1},uEnabled:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},rs=[..."アウエオカキケコサシスセソタツテナニヌネ",..."ハヒホマミムメモヤヨラリワー",..."012345789z",...':."*+<>|¦╌▪꞊'],ls=8,cs=8,Qo=600,Ct=120,ds=.12,us=.08,hs=16,Jo=3.5,ms=8;function fs(t){const e=new wa().load(t);return e.flipY=!1,e.minFilter=Rn,e.magFilter=Pn,e.colorSpace=On,e.generateMipmaps=!0,{tex:e,count:rs.length}}function ps(){const t=new pa,e=new nt(1,1);t.index=e.index.clone(),t.setAttribute("position",e.getAttribute("position").clone()),t.setAttribute("uv",e.getAttribute("uv").clone()),e.dispose();const o=Qo*Ct,a=new Float32Array(o),n=new Float32Array(o),i=new Float32Array(o*4),r=new Float32Array(o*4);for(let l=0;l<Qo;l++){const c=Math.random()*Math.PI*2,u=1-2*Math.random(),d=Math.sqrt(1-u*u),s=Math.pow(Math.random(),.12),h=Jo+s*(ms-Jo),m=d*Math.cos(c)*h,f=d*Math.sin(c)*h,b=u*h+(Math.random()-.5)*2,_=.4+Math.random()*1.87,M=Math.random(),p=.5+Math.random()*1,E=.18+Math.random()*.72,w=.015+Math.random()*.035;for(let y=0;y<Ct;y++){const S=l*Ct+y;a[S]=l,n[S]=y;const x=S*4;i[x]=m,i[x+1]=f,i[x+2]=_,i[x+3]=M,r[x]=b,r[x+1]=p,r[x+2]=E,r[x+3]=w}}return t.setAttribute("aColIdx",new we(a,1)),t.setAttribute("aRowIdx",new we(n,1)),t.setAttribute("aColA",new we(i,4)),t.setAttribute("aColB",new we(r,4)),t.instanceCount=o,t}function gs(t,e,o,a){const n=a.clientWidth||1,i=a.clientHeight||1,r=new po(t);r.addPass(new go(e,o));const l=new Ae(new k(n,i),1.15,.45,.2);r.addPass(l);const c=new ve(ts);c.enabled=!0,r.addPass(c);const u=t.getDrawingBufferSize(new k);let d=new Sa(u.x,u.y);const s=new ve(Ji);s.uniforms.tPrev.value=d;const h=s.render.bind(s);s.render=function(p,E,w,y,S){h(p,E,w,y,S),p.copyFramebufferToTexture(this.uniforms.tPrev.value)},r.addPass(s);const m=new ve(as);m.enabled=!0,m.uniforms.uBlurStrength.value=.002,r.addPass(m);const f=new ve(os);f.enabled=!0,f.uniforms.uAspect.value=n/i,r.addPass(f);const g=new ve(es);r.addPass(g);const b=new ve(ss);b.uniforms.uLightPos.value=new k(.5,.75),b.enabled=!0,r.addPass(b);const _=new ve(Qi),M=t.getPixelRatio();return _.uniforms.resolution.value.set(1/(n*M),1/(i*M)),r.addPass(_),{composer:r,bloomPass:l,heatPass:c,phosphorPass:s,phosphorTex:d,softenPass:m,streakPass:f,holoPass:g,godRaysPass:b,fxaaPass:_}}const Ot=new Map;function vs(t,e={}){Ot.has(t)&&ea(t);const o=t.querySelector("canvas[data-matrix-rain]");o&&o.remove();const{color:a="#00ff70",opacity:n=.82,syncCamera:i=null}=e,r=new O(a),l=fs("/data/matrixcode_msdf.png"),c=new ro({antialias:!1,alpha:!0});c.setPixelRatio(Math.min(window.devicePixelRatio,2)),c.setSize(t.clientWidth||1,t.clientHeight||1);const u=c.domElement;u.dataset.matrixRain="1",u.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;",t.appendChild(u);const d=new lo,s=new ba(45,(t.clientWidth||1)/(t.clientHeight||1),.1,60);s.position.set(0,0,3),s.lookAt(0,0,0);const h=ps(),m={uGlyphTex:{value:l.tex},uGlyphCount:{value:l.count},uAtlasCols:{value:ls},uAtlasGrid:{value:cs},uTime:{value:0},uCellW:{value:ds},uCellH:{value:us},uWorldH:{value:hs},uNRows:{value:Ct},uColor:{value:new P(r.r,r.g,r.b)},uGlobalAlpha:{value:n},uDepth:{value:.04},uPomSteps:{value:6},uNormalStrength:{value:6},uLightDir:{value:new P(-.4,.8,.5).normalize()},uGlobeInteract:{value:1},uGlyphChroma:{value:1}},f=new ee({uniforms:m,vertexShader:ns,fragmentShader:is,transparent:!0,depthWrite:!1,blending:Dn,blendEquation:In,blendSrc:rt,blendDst:rt,blendEquationAlpha:Ln,blendSrcAlpha:rt,blendDstAlpha:rt,side:_a,extensions:{derivatives:!0}}),g=new oe(h,f);g.frustumCulled=!1,g.renderOrder=1,d.add(g);let{composer:b,bloomPass:_,heatPass:M,phosphorPass:p,phosphorTex:E,softenPass:w,streakPass:y,holoPass:S,godRaysPass:x,fxaaPass:C}=gs(c,d,s,t);const v={renderer:c,composer:b,bloomPass:_,heatPass:M,softenPass:w,phosphorPass:p,phosphorTex:E,holoPass:S,streakPass:y,godRaysPass:x,fxaaPass:C,material:f,geom:h,atlas:l,ro:null,animId:0,syncCamera:i,burstBloomEnabled:!0};Ot.set(t,v);let T=0,B=0,z=-1;function le(F){v.animId=requestAnimationFrame(le);const R=F*.001,ne=R-T;if(T=R,m.uTime.value=R,S.uniforms.time.value=R,M.uniforms.uTime.value=R,y.uniforms.uTime.value=R,v.burstBloomEnabled){const ie=Math.floor(R/4);if(ie!==z&&(z=ie,B=.3),B>0){B=Math.max(0,B-ne);const se=1-B/.3;_.threshold=se<.2?Rt.lerp(.2,.1,se/.2):Rt.lerp(.1,.2,(se-.2)/.8)}else _.threshold=.2}else _.threshold=.2;if(v.syncCamera&&(s.position.copy(v.syncCamera.position),s.quaternion.copy(v.syncCamera.quaternion),s.fov=v.syncCamera.fov,s.near=v.syncCamera.near,s.far=v.syncCamera.far,s.updateProjectionMatrix()),s.position.lengthSq()>.001){const ie=Math.atan2(s.position.x,s.position.z)+Math.PI/3;m.uLightDir.value.set(Math.sin(ie)*.6,.8,Math.cos(ie)*.6).normalize()}v.composer.render()}v.animId=requestAnimationFrame(le);let ce=!1;return v.ro=new ResizeObserver(()=>{ce||(ce=!0,requestAnimationFrame(()=>{ce=!1;const F=t.clientWidth||1,R=t.clientHeight||1;c.setSize(F,R),v.composer.setSize(F,R),v.bloomPass.resolution.set(F,R);const ne=c.getPixelRatio();v.fxaaPass.uniforms.resolution.value.set(1/(F*ne),1/(R*ne)),v.streakPass.uniforms.uAspect.value=F/R,s.aspect=F/R,s.updateProjectionMatrix();const ie=c.getDrawingBufferSize(new k);v.phosphorTex.dispose();const se=new Sa(ie.x,ie.y);v.phosphorTex=se,v.phosphorPass.uniforms.tPrev.value=se}))}),v.ro.observe(t),{destroy(){ea(t)},setColor(F){const R=new O(F);m.uColor.value.set(R.r,R.g,R.b)},setOpacity(F){m.uGlobalAlpha.value=F},setDepth(F){m.uDepth.value=F},setNormalStrength(F){m.uNormalStrength.value=F},setSoften(F,R){w.enabled=F,R!==void 0&&(w.uniforms.uBlurStrength.value=R)},setHeat(F,R){M.enabled=F,R!==void 0&&(M.uniforms.uHeatAmt.value=R)},setStreaks(F,R){y.enabled=F,R!==void 0&&(y.uniforms.uStreakAmt.value=R)},setBurstBloom(F){v.burstBloomEnabled=F},setGlobeInteract(F){m.uGlobeInteract.value=F?1:0},setGlyphChroma(F,R){m.uGlyphChroma.value=F?R??1:0},setGodRays(F,R,ne,ie,se,Ye,Ue){x.uniforms.uEnabled.value=F?1:0,R!==void 0&&(x.uniforms.uLightPos.value.x=R),ne!==void 0&&(x.uniforms.uLightPos.value.y=ne),ie!==void 0&&(x.uniforms.uDensity.value=ie),se!==void 0&&(x.uniforms.uDecay.value=se),Ye!==void 0&&(x.uniforms.uWeight.value=Ye),Ue!==void 0&&(x.uniforms.uExposure.value=Ue)}}}function ea(t){const e=Ot.get(t);e&&(cancelAnimationFrame(e.animId),e.ro.disconnect(),e.holoPass&&e.holoPass.material.dispose(),e.phosphorPass&&e.phosphorPass.material.dispose(),e.phosphorTex&&e.phosphorTex.dispose(),e.composer.dispose(),e.material.dispose(),e.geom.dispose(),e.atlas.tex.dispose(),e.renderer.dispose(),e.renderer.domElement.remove(),Ot.delete(t))}const Ha=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,ys=`
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
}`,bs=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,_s=`
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
}`,ws=`
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
}`,Ss=`
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
}`,xs=`
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
}`,Es=`
varying vec2 vUv;
uniform vec3  uColor;
uniform float uIntensity;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float glow = exp(-r * r * 8.0) * uIntensity;
  if (glow < 0.005) discard;
  gl_FragColor = vec4(uColor * glow, glow * 0.6);
}`,Ms={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.38},scanlineOpacity:{value:.07},aberrationAmt:{value:.001}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},H=Math.PI*2,ye=32,At=new WeakMap;let Cs=0;function As(){return`T-${String(++Cs).padStart(2,"0")}`}function Je(t){return getComputedStyle(document.documentElement).getPropertyValue(t).trim()}function Me(t){const e=new O().setStyle(t||"#000000");return[e.r,e.g,e.b]}function Bt(t,e,o){return t+(e-t)*Math.max(0,Math.min(1,o))}function Ts(t,e){const o=((t-e)%H+H)%H;return o>Math.PI?o-H:o}function za(){return{neonCyan:Je("--neon-cyan")||"#00f0ff",neonGreen:Je("--neon-green")||"#00ff9d",neonAlert:Je("--neon-alert")||"#ff00cc",neonWarn:Je("--neon-warn")||"#ffb300",voidColor:Je("--void")||"#05080f"}}function ta(t,e){const o=t.ringHzBase;return e==="friendly"?o*.6:e==="hostile"?o*1.5:o}function Ls(t){const e=Bt(.1,.85,t),o=Bt(.3,.05,t),a=Math.random();return a<e?"hostile":a<e+o?"friendly":"neutral"}function Is(t){return t==="friendly"?0:t==="neutral"?1:t==="hostile"?2:3}let et=null,Jt=!1;function Ds(t=.08){if(!Jt)try{et||(et=new Audio("/sonar-ping.mp3")),et.volume=Math.min(1,Math.max(0,t)),et.currentTime=0,et.play().catch(()=>{})}catch{}}function Rs(){Jt=!Jt}function Ps(t){const o=new Float32Array(192);for(let n=0;n<64;n++){const i=n/64*H;o[n*3]=Math.sin(i)*t,o[n*3+1]=Math.cos(i)*t,o[n*3+2]=0}const a=new Ce;return a.setAttribute("position",new ho(o,3)),a}function Os(t){const o=new Float32Array(192);for(let n=0;n<32;n++){const i=n/32*H,r=n%8===0?t*.92:t*.96,l=n*6;o[l]=Math.sin(i)*r,o[l+1]=Math.cos(i)*r,o[l+2]=0,o[l+3]=Math.sin(i)*t,o[l+4]=Math.cos(i)*t,o[l+5]=0}const a=new Ce;return a.setAttribute("position",new ho(o,3)),a}function Bs(t){const{scene:e,R:o,theme:a}=t;t.backgroundMesh&&(t.backgroundMesh.geometry.dispose(),t.backgroundMesh.material.dispose(),e.remove(t.backgroundMesh));const n=new O(a.voidColor),i=new nt(o*2,o*2),r=new ee({vertexShader:Ha,fragmentShader:ys,uniforms:{uVoidColor:{value:new P(n.r,n.g,n.b)},uTime:{value:0}},transparent:!0,depthWrite:!0,blending:xt}),l=new oe(i,r);l.renderOrder=0,e.add(l),t.backgroundMesh=l}function Fs(t){const{scene:e,R:o,theme:a}=t;t.centerGlowMesh&&(t.centerGlowMesh.geometry.dispose(),t.centerGlowMesh.material.dispose(),e.remove(t.centerGlowMesh));const n=new O(a.neonCyan),i=o*.5,r=new nt(i,i),l=new ee({vertexShader:Ha,fragmentShader:Es,uniforms:{uColor:{value:new P(n.r,n.g,n.b)},uIntensity:{value:0}},transparent:!0,depthWrite:!1,blending:$}),c=new oe(r,l);c.renderOrder=6,e.add(c),t.centerGlowMesh=c}function ks(t){const{scene:e,R:o,theme:a}=t;t.ringMeshes&&(t.ringMeshes.forEach(u=>{u.geometry.dispose(),e.remove(u)}),t.matRingInner&&t.matRingInner.dispose(),t.matRingOuter&&t.matRingOuter.dispose()),t.ticksMesh&&(t.ticksMesh.geometry.dispose(),t.matRingTicks&&t.matRingTicks.dispose(),e.remove(t.ticksMesh));const n=new Oe({color:new O(a.neonCyan),opacity:.18,transparent:!0,depthWrite:!1,blending:$}),i=new Oe({color:new O(a.neonCyan),opacity:.28,transparent:!0,depthWrite:!1,blending:$}),r=new Oe({color:new O(a.neonCyan),opacity:.22,transparent:!0,depthWrite:!1,blending:$}),l=[.2,.4,.6,.8,1];t.ringMeshes=l.map((u,d)=>{const s=new co(Ps(u*o),d<4?n:i);return s.renderOrder=1,e.add(s),s});const c=new Bn(Os(o),r);c.renderOrder=1,e.add(c),t.ticksMesh=c,t.matRingInner=n,t.matRingOuter=i,t.matRingTicks=r}function Ns(t){const{scene:e,R:o,theme:a}=t;t.sweepTrailMesh&&(t.sweepTrailMesh.geometry.dispose(),t.sweepTrailMesh.material.dispose(),e.remove(t.sweepTrailMesh)),t.sweepArmLine&&(t.sweepArmLine.geometry.dispose(),t.sweepArmLine.material.dispose(),e.remove(t.sweepArmLine));const n=new O(a.neonCyan),i=new P(n.r,n.g,n.b),r=new nt(o*2,o*2),l=new ee({vertexShader:bs,fragmentShader:_s,uniforms:{uAngle:{value:t.sweepAngle},uArcWidth:{value:Math.PI*.6},uColor:{value:i.clone()},uStaticAmt:{value:1}},transparent:!0,depthWrite:!1,blending:$}),c=new oe(r,l);c.renderOrder=2,e.add(c),t.sweepTrailMesh=c;const u=new Float32Array([0,0,0,Math.sin(t.sweepAngle)*o,Math.cos(t.sweepAngle)*o,0]),d=new Ce;d.setAttribute("position",new ho(u,3));const s=new Oe({color:new O(a.neonCyan),opacity:.9,transparent:!0,depthWrite:!1,blending:$}),h=new uo(d,s);h.renderOrder=3,e.add(h),t.sweepArmLine=h}function Us(t){const{scene:e,theme:o}=t;t.contactDotsMesh&&(t.contactDotsMesh.geometry.dispose(),t.contactDotsMesh.material.dispose(),e.remove(t.contactDotsMesh)),t.contactRingsMesh&&(t.contactRingsMesh.geometry.dispose(),t.contactRingsMesh.material.dispose(),e.remove(t.contactRingsMesh));const a=Me(o.neonGreen),n=Me(o.neonWarn),i=Me(o.neonAlert),r=Me(o.neonCyan);function l(d,s,h){const m=new nt(1,1),f=new we(new Float32Array(ye).fill(0),1),g=new we(new Float32Array(ye).fill(1),1),b=new we(new Float32Array(ye).map(()=>Math.random()),1),_=new we(new Float32Array(ye).fill(0),1);f.setUsage(Xe),g.setUsage(Xe),b.setUsage(Xe),_.setUsage(Xe),m.setAttribute("a_type",f),m.setAttribute("a_age",g),m.setAttribute("a_phase",b),m.setAttribute("a_sweepFade",_);const M=new ee({vertexShader:ws,fragmentShader:d,uniforms:s,transparent:!0,depthWrite:!1,blending:$}),p=new Fn(m,M,ye);p.renderOrder=h,p.instanceMatrix.setUsage(Xe);const E=new xa;E.scale.setScalar(0),E.updateMatrix();for(let w=0;w<ye;w++)p.setMatrixAt(w,E.matrix);return p.instanceMatrix.needsUpdate=!0,e.add(p),p}const c={uC0:{value:new P(...a)},uC1:{value:new P(...n)},uC2:{value:new P(...i)},uC3:{value:new P(...r)}},u={uC0:{value:new P(...a)},uC1:{value:new P(...n)},uC2:{value:new P(...i)}};t.contactDotsMesh=l(Ss,c,5),t.contactRingsMesh=l(xs,u,4)}function Gs(t){const{element:e,overlay:o,R:a}=t,n=e.clientWidth/2,i=e.clientHeight/2;t.staticLabelEls.forEach(d=>d.remove()),t.staticLabelEls=[];const r=[2,4,6,8];[.2,.4,.6,.8].forEach((d,s)=>{const h=document.createElement("span");h.className="s9-radar__ring-label",h.textContent=`${r[s]}km`,h.style.left=`${n+d*a+4}px`,h.style.top=`${i}px`,h.style.transform="translateY(-50%)",o.appendChild(h),t.staticLabelEls.push(h)});const c=[["N",0],["NE",H*.125],["E",H*.25],["SE",H*.375],["S",H*.5],["SW",H*.625],["W",H*.75],["NW",H*.875]],u=a*1.05;c.forEach(([d,s])=>{const h=document.createElement("span");h.className="s9-radar__cardinal-label",h.textContent=d,h.style.left=`${n+Math.sin(s)*u}px`,h.style.top=`${i-Math.cos(s)*u}px`,h.style.transform="translate(-50%, -50%)",o.appendChild(h),t.staticLabelEls.push(h)})}function Hs(t){Bs(t),Fs(t),ks(t),Ns(t),Gs(t),t.contactDotsMesh?zs(t):Us(t)}function zs(t){const{contacts:e,dummy:o,contactDotsMesh:a,contactRingsMesh:n,R:i}=t;!a||!n||(e.forEach((r,l)=>{if(!r)o.scale.setScalar(0),o.position.set(0,0,0),o.updateMatrix(),a.setMatrixAt(l,o.matrix),n.setMatrixAt(l,o.matrix);else{const c=r.age<.08?Bt(0,8,r.age/.08):8;o.position.set(Math.sin(r.angle)*r.range*i,Math.cos(r.angle)*r.range*i,0),o.scale.setScalar(c),o.updateMatrix(),a.setMatrixAt(l,o.matrix),o.scale.setScalar(c>0?i*1.5:0),o.updateMatrix(),n.setMatrixAt(l,o.matrix)}}),a.instanceMatrix.needsUpdate=!0,n.instanceMatrix.needsUpdate=!0)}function eo(t,e){const o=t.contacts[e];o&&(o.labelEl&&(o.labelEl.remove(),o.labelEl=null),t.contactDotsMesh&&t.contactRingsMesh&&(t.dummy.scale.setScalar(0),t.dummy.position.set(0,0,0),t.dummy.updateMatrix(),t.contactDotsMesh.setMatrixAt(e,t.dummy.matrix),t.contactRingsMesh.setMatrixAt(e,t.dummy.matrix),t.contactDotsMesh.instanceMatrix.needsUpdate=!0,t.contactRingsMesh.instanceMatrix.needsUpdate=!0),t.contacts[e]=null)}function _o(t,e,o,a,n){var b;const i=t.opts.maxContacts;if(t.contacts.filter(Boolean).length>=i){let _=-1,M=-1;for(let p=0;p<ye;p++)((b=t.contacts[p])==null?void 0:b.type)==="ghost"&&t.contacts[p].age>M&&(_=p,M=t.contacts[p].age);if(_>=0)eo(t,_);else return console.warn("[pulse-radar] contact pool full"),null}let l=-1;for(let _=0;_<ye;_++)if(!t.contacts[_]){l=_;break}if(l<0)return null;const c=a==="ghost",u=(e%H+H)%H,d=Math.max(0,Math.min(1,o)),s=Math.sin(u)*d,h=Math.cos(u)*d,m=c?0:.01+Math.random()*.025,f=Math.random()*H,g={id:n||As(),angle:u,range:d,wx:s,wy:h,wvx:c?0:Math.sin(f)*m,wvy:c?0:Math.cos(f)*m,type:a,age:c?.85:0,maxAge:c?3e3:8e3+Math.random()*1e4,bornAt:performance.now(),phase:c?Math.random()*.3:1,lastSweep:-1/0,ghostAngle:null,ghostRange:null,ghostSpawned:!1,instIdx:l,labelEl:null,sweepAlpha:c?.15:1,fadeTimeMs:4200*(.88+Math.random()*.24),revealed:c,revealTime:c?performance.now():null};if(!c){const _=document.createElement("span");_.className=`s9-radar__label s9-radar__label--${a}`,_.textContent=a==="hostile"?`${g.id} ⚠HC`:g.id,t.labelsDiv.appendChild(_),g.labelEl=_}return t.contacts[l]=g,g}function Tt(t){if(t.destroyed||t.reducedMotion)return;const e=Math.max(.05,t.opts.contactDensity),o=Bt(3e3,600,t.threatLevel)/e,a=(Math.random()-.5)*o*.4,n=Math.max(200,o+a);t.spawnTimer=setTimeout(()=>{!t.destroyed&&!t.reducedMotion&&(Ws(t),Tt(t))},n)}function Ws(t){const e=t.contacts.filter(i=>i&&i.type!=="ghost"),o=e.length>0&&Math.random()<.3,a=t.sweepAngle;let n;if(o){const i=e[Math.floor(Math.random()*e.length)];n=Math.max(.15,Math.min(.97,i.range+(Math.random()-.5)*.3))}else n=.15+Math.random()*.82;_o(t,a,n,Ls(t.threatLevel))}function $s(t,e){if(t.reducedMotion)return;const o=t.sweepAngle;t.sweepAngle=(t.sweepAngle+t.sweepSpeed*e/1e3)%H,t.sweepAngle<o&&(Ds(.06),t.centerGlowIntensity=1),t.centerGlowIntensity>0&&(t.centerGlowIntensity*=Math.pow(.001,e/600),t.centerGlowIntensity<.005&&(t.centerGlowIntensity=0),t.centerGlowMesh&&(t.centerGlowMesh.material.uniforms.uIntensity.value=t.centerGlowIntensity));const a=performance.now();if(t.staticNextAt===null&&(t.staticNextAt=a+7e3+Math.random()*5e3),a>=t.staticNextAt&&!t.staticActive&&(t.staticActive=!0,t.staticEndAt=a+60+Math.random()*40,t.staticNextAt=t.staticEndAt+6e3+Math.random()*4e3),t.staticActive&&(t.sweepTrailMesh.material.uniforms.uStaticAmt.value=.5+Math.random()*.5,a>=t.staticEndAt&&(t.staticActive=!1,t.sweepTrailMesh.material.uniforms.uStaticAmt.value=1)),t.sweepTrailMesh&&(t.sweepTrailMesh.material.uniforms.uAngle.value=t.sweepAngle),t.sweepArmLine){const{R:n}=t,i=t.sweepArmLine.geometry.attributes.position;i.setXYZ(0,0,0,0),i.setXYZ(1,Math.sin(t.sweepAngle)*n,Math.cos(t.sweepAngle)*n,0),i.needsUpdate=!0}}function js(t,e){const{contacts:o,sweepAngle:a}=t,n=t.now;o.forEach((i,r)=>{if(i){if(i.type!=="ghost"&&(i.wx+=i.wvx*e/1e3,i.wy+=i.wvy*e/1e3,Math.hypot(i.wx,i.wy)>1.02)){eo(t,r);return}if(i.age+=e/i.maxAge,i.type!=="ghost"&&!t.reducedMotion){const l=(Math.atan2(i.wx,i.wy)%H+H)%H;Math.abs(Ts(a,l))<.12&&n-i.lastSweep>800&&(i.angle=l,i.range=Math.hypot(i.wx,i.wy),i.phase=0,i.lastSweep=n,i.sweepAlpha=1,i.revealed||(i.revealed=!0,i.revealTime=n))}if(i.type!=="ghost"){if(i.phase<1){const l=i.age>.65&&i.age<.85;i.phase=Math.min(1,i.phase+ta(t,i.type)*(l?.5:1)*e/1e3)}}else i.phase+=ta(t,"neutral")*e/1e3;if(i.type!=="ghost"&&i.revealed){const l=.05+.1*i.range,c=n-i.lastSweep,u=Math.min(1,c/i.fadeTimeMs);i.sweepAlpha=l+(1-l)*Math.pow(1-u,1.025)}i.type!=="ghost"&&!i.ghostSpawned&&i.age>=.65&&i.revealed&&(i.ghostAngle=i.angle,i.ghostRange=i.range,i.ghostSpawned=!0,_o(t,i.ghostAngle,i.ghostRange,"ghost")),i.age>=1&&eo(t,r)}})}function Vs(t){const{contacts:e,dummy:o,contactDotsMesh:a,contactRingsMesh:n,R:i}=t;if(!a||!n)return;let r=!1;e.forEach((l,c)=>{if(!l)return;r=!0;let u;l.revealed?u=Math.min(1,(t.now-l.revealTime)/300)*8:u=0;const d=Math.sin(l.angle)*l.range*i,s=Math.cos(l.angle)*l.range*i;o.position.set(d,s,0),o.scale.setScalar(u),o.updateMatrix(),a.setMatrixAt(c,o.matrix),o.scale.setScalar(u>0?i*1.5:0),o.updateMatrix(),n.setMatrixAt(c,o.matrix);const h=Is(l.type);a.geometry.attributes.a_type.setX(c,h),a.geometry.attributes.a_age.setX(c,l.age),a.geometry.attributes.a_phase.setX(c,l.phase),a.geometry.attributes.a_sweepFade.setX(c,l.sweepAlpha),n.geometry.attributes.a_type.setX(c,h),n.geometry.attributes.a_age.setX(c,l.age),n.geometry.attributes.a_phase.setX(c,l.phase),n.geometry.attributes.a_sweepFade.setX(c,l.sweepAlpha)}),r&&(a.instanceMatrix.needsUpdate=!0,n.instanceMatrix.needsUpdate=!0,a.geometry.attributes.a_type.needsUpdate=!0,a.geometry.attributes.a_age.needsUpdate=!0,a.geometry.attributes.a_phase.needsUpdate=!0,a.geometry.attributes.a_sweepFade.needsUpdate=!0,n.geometry.attributes.a_type.needsUpdate=!0,n.geometry.attributes.a_age.needsUpdate=!0,n.geometry.attributes.a_phase.needsUpdate=!0,n.geometry.attributes.a_sweepFade.needsUpdate=!0)}function qs(t){const{contacts:e,element:o,R:a}=t,n=o.clientWidth/2,i=o.clientHeight/2;e.forEach(r=>{if(!(r!=null&&r.labelEl))return;if(!r.revealed){r.labelEl.style.opacity="0";return}const l=n+Math.sin(r.angle)*r.range*a,c=i-Math.cos(r.angle)*r.range*a;r.labelEl.style.left=`${l+7}px`,r.labelEl.style.top=`${c-6}px`,r.labelEl.style.opacity=String(r.sweepAlpha)})}function Ys(t){if(!t.footerEl)return;const e=t.contacts.filter(a=>a&&a.type!=="ghost").length,o=(H/t.sweepSpeed).toFixed(1);t.footerEl.textContent=`CONTACTS: ${e} | SWEEP: ${o}s`}function to(t,e){if(t.destroyed||!t.rafRunning){t.rafId=null;return}const o=Math.min(e-(t.lastTs??e),100);t.lastTs=e,t.now=e,t.R>0&&(t.backgroundMesh&&(t.backgroundMesh.material.uniforms.uTime.value=e/1e3),t.holoPass&&(t.holoPass.uniforms.time.value=e/1e3),$s(t,o),js(t,o),Vs(t),qs(t),Ys(t),t.composer.render()),t.rafId=requestAnimationFrame(a=>to(t,a))}function Ks(t,e={}){if(At.has(t)){console.warn("[pulse-radar] already initialised");const w=At.get(t);return{setRadarThreatLevel:w.setRadarThreatLevel,injectContact:w.injectContact}}const o={sweepPeriod:2690,contactDensity:Math.max(0,Math.min(1,e.contactDensity??.5)),threatLevel:Math.max(0,Math.min(1,e.threatLevel??0)),primaryColor:e.primaryColor??null,maxContacts:Math.max(4,Math.min(ye,e.maxContacts??16))},a=za(),n=document.createElement("canvas");n.className="s9-radar__canvas";const i=document.createElement("div");i.className="s9-radar__overlay";const r=document.createElement("div");r.className="s9-radar__labels",i.appendChild(r),t.appendChild(n),t.appendChild(i),t.style.cursor="pointer",t.addEventListener("click",()=>{Rs()});let l;try{l=new ro({canvas:n,antialias:!0,alpha:!1,premultipliedAlpha:!1})}catch(w){return console.error("[pulse-radar] WebGL context creation failed",w),n.remove(),i.remove(),t.dispatchEvent(new CustomEvent("pulse-radar:init-failed",{bubbles:!0,detail:{error:w}})),{setRadarThreatLevel:()=>{},injectContact:()=>""}}l.setClearColor(new O(a.voidColor),1),l.setPixelRatio(Math.min(devicePixelRatio,2));const c=new lo,u=new fa(-1,1,1,-1,.1,100);u.position.z=10;const d=new po(l);d.addPass(new go(c,u));const s=new Ae(new k(t.clientWidth||200,t.clientHeight||200),.8,.65,.25);d.addPass(s);const h=new ve(Ms);d.addPass(h);const m={element:t,canvas:n,overlay:i,labelsDiv:r,renderer:l,scene:c,camera:u,opts:o,theme:a,R:0,sweepAngle:Math.random()*H,sweepSpeed:H/(o.sweepPeriod/1e3),ringPopDuration:o.sweepPeriod/1e3-.5,threatLevel:o.threatLevel,contacts:new Array(ye).fill(null),dummy:new xa,footerEl:document.getElementById("radar-contacts"),staticLabelEls:[],staticActive:!1,staticNextAt:null,staticEndAt:null,rafId:null,rafRunning:!1,destroyed:!1,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,centerGlowIntensity:0,centerGlowMesh:null,composer:d,bloomPass:s,holoPass:h,backgroundMesh:null,ringMeshes:null,ticksMesh:null,sweepTrailMesh:null,sweepArmLine:null,contactDotsMesh:null,contactRingsMesh:null,matRingInner:null,matRingOuter:null,matRingTicks:null,spawnTimer:null,lastTs:null,now:performance.now(),resizeObserver:null,intersectionObserver:null,_motionMq:null,_motionHandler:null,setRadarThreatLevel:null,injectContact:null};m.ringHzBase=1/m.ringPopDuration,At.set(t,m);const f=t.closest(".s9-panel");f&&(f.classList.add("s9-panel--booting"),f.addEventListener("animationend",()=>f.classList.remove("s9-panel--booting"),{once:!0}));const g=new ResizeObserver(w=>{for(const y of w){const{width:S,height:x}=y.contentRect;if(S===0||x===0)return;const C=Math.floor(Math.min(S,x)/2)-8;if(C<=0)return;m.R=C,u.left=-C,u.right=C,u.top=C,u.bottom=-C,u.updateProjectionMatrix(),l.setSize(S,x),m.composer.setSize(S,x),m.bloomPass&&m.bloomPass.resolution.set(S,x),Hs(m)}});g.observe(t),m.resizeObserver=g;const b=new IntersectionObserver(w=>{w.forEach(y=>{m.rafRunning=y.isIntersecting,m.rafRunning&&!m.rafId&&(m.rafId=requestAnimationFrame(S=>to(m,S)))})},{threshold:0});b.observe(t),m.intersectionObserver=b;const _=matchMedia("(prefers-reduced-motion: reduce)"),M=()=>{m.reducedMotion=_.matches,m.reducedMotion?(m.sweepAngle=Math.PI*.15,clearTimeout(m.spawnTimer)):Tt(m)};_.addEventListener("change",M),m._motionMq=_,m._motionHandler=M,m.rafRunning=!0,m.rafId=requestAnimationFrame(w=>to(m,w)),m.reducedMotion||Tt(m);function p(w){const y=Math.max(0,Math.min(1,w));m.threatLevel=y,clearTimeout(m.spawnTimer),Tt(m)}function E(w,y,S){const x=["friendly","neutral","hostile"].includes(S)?S:"neutral",C=_o(m,w,Math.max(0,Math.min(1,y)),x);return C?C.id:""}return m.setRadarThreatLevel=p,m.injectContact=E,{setRadarThreatLevel:p,injectContact:E}}function Xs(t){const e=At.get(t);if(!e)return;const o=za();e.theme=o;const a=Me(o.neonGreen),n=Me(o.neonWarn),i=Me(o.neonAlert),r=Me(o.neonCyan),l=new O(o.neonCyan);if(e.backgroundMesh){const c=new O(o.voidColor);e.backgroundMesh.material.uniforms.uVoidColor.value.set(c.r,c.g,c.b),e.renderer.setClearColor(new O(o.voidColor),1)}if(e.matRingInner&&e.matRingInner.color.set(o.neonCyan),e.matRingOuter&&e.matRingOuter.color.set(o.neonCyan),e.matRingTicks&&e.matRingTicks.color.set(o.neonCyan),e.sweepTrailMesh&&e.sweepTrailMesh.material.uniforms.uColor.value.set(l.r,l.g,l.b),e.sweepArmLine&&e.sweepArmLine.material.color.set(o.neonCyan),e.contactDotsMesh){const c=e.contactDotsMesh.material.uniforms;c.uC0.value.set(...a),c.uC1.value.set(...n),c.uC2.value.set(...i),c.uC3.value.set(...r)}if(e.contactRingsMesh){const c=e.contactRingsMesh.material.uniforms;c.uC0.value.set(...a),c.uC1.value.set(...n),c.uC2.value.set(...i)}}const Zs=`
  attribute vec2 a_pos;
  varying vec2 vUv;
  void main() {
    vUv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }`,Qs=`
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
  }`;function oa(t,e,o){const a=t.createShader(e);return t.shaderSource(a,o),t.compileShader(a),t.getShaderParameter(a,t.COMPILE_STATUS)||console.error("Telescreen shader error:",t.getShaderInfoLog(a)),a}function Js(t,e,o){const a=e.getContext("webgl");if(!a)return console.warn("Telescreen: WebGL not available"),{destroy(){}};const n=o.getContext("2d"),i={prog:null,buf:null,tex:null,aPos:-1,uLocs:{}};function r(){const p=a.createProgram();a.attachShader(p,oa(a,a.VERTEX_SHADER,Zs)),a.attachShader(p,oa(a,a.FRAGMENT_SHADER,Qs)),a.linkProgram(p),a.useProgram(p);const E=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,E),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),a.STATIC_DRAW);const w=a.getAttribLocation(p,"a_pos");a.enableVertexAttribArray(w),a.vertexAttribPointer(w,2,a.FLOAT,!1,0,0);const y={res:a.getUniformLocation(p,"iResolution"),time:a.getUniformLocation(p,"uTime"),imgOffset:a.getUniformLocation(p,"uImgOffset"),imgScale:a.getUniformLocation(p,"uImgScale"),diffuse:a.getUniformLocation(p,"tDiffuse"),glitchEnabled:a.getUniformLocation(p,"uGlitchEnabled"),glitchStrength:a.getUniformLocation(p,"uGlitchStrength"),glitchSpeed:a.getUniformLocation(p,"uGlitchSpeed"),glitchCols:a.getUniformLocation(p,"uGlitchCols"),chromaEnabled:a.getUniformLocation(p,"uChromaEnabled"),chromaOffset:a.getUniformLocation(p,"uChromaOffset"),hardPix:a.getUniformLocation(p,"uHardPix"),warpMult:a.getUniformLocation(p,"uWarpMult"),maskStr:a.getUniformLocation(p,"uMaskStr"),grainAmt:a.getUniformLocation(p,"uGrainAmt"),halationStr:a.getUniformLocation(p,"uHalationStr"),convergence:a.getUniformLocation(p,"uConvergence")},S=a.createTexture();a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,S),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.uniform1i(y.diffuse,0),Object.assign(i,{prog:p,buf:E,tex:S,aPos:w,uLocs:y})}r();let l=!1,c=null,u=!1,d=0;const s={glitchEnabled:0,glitchStrength:.025,glitchSpeed:8,glitchCols:30,chromaEnabled:0,chromaOffset:.006,hardPix:-1.2,warpMult:1,maskStr:1,grainAmt:.04,halationStr:1,convergence:7e-4};function h(){a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,i.tex),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,t),l=!0}function m(p,E,w,y){const S=Math.max(p/w,E/y)*.8,x=w*S,C=y*S;return{ox:(p-x)/2/p,oy:(E-C)/2/E,sx:x/p,sy:C/E}}function f(){const p=e.clientWidth||576,E=e.clientHeight||432;e.width=p,e.height=E,o.width=p,o.height=E,u||a.viewport(0,0,p,E)}function g(){if(!t.naturalWidth)return;const p=o.width,E=o.height,w=t.naturalWidth,y=t.naturalHeight,S=Math.max(p/w,E/y)*.8,x=w*S,C=y*S;n.clearRect(0,0,p,E),n.drawImage(t,(p-x)/2,(E-C)/2,x,C)}e.addEventListener("webglcontextlost",p=>{p.preventDefault(),u=!0}),e.addEventListener("webglcontextrestored",()=>{u=!1,l=!1,r(),f(),h()});function b(p){d=requestAnimationFrame(b),c||(c=p);const E=(p-c)/1e3;if(l&&!u){const w=e.width,y=e.height,S=t.naturalWidth,x=t.naturalHeight,C=y/1,v=w/y*C;a.uniform2f(i.uLocs.res,v,C),a.uniform1f(i.uLocs.time,E);const T=m(w,y,S,x);a.uniform2f(i.uLocs.imgOffset,T.ox,T.oy),a.uniform2f(i.uLocs.imgScale,T.sx,T.sy),a.uniform1f(i.uLocs.glitchEnabled,s.glitchEnabled),a.uniform1f(i.uLocs.glitchStrength,s.glitchStrength),a.uniform1f(i.uLocs.glitchSpeed,s.glitchSpeed),a.uniform1f(i.uLocs.glitchCols,s.glitchCols),a.uniform1f(i.uLocs.chromaEnabled,s.chromaEnabled),a.uniform1f(i.uLocs.chromaOffset,s.chromaOffset),a.uniform1f(i.uLocs.hardPix,s.hardPix),a.uniform1f(i.uLocs.warpMult,s.warpMult),a.uniform1f(i.uLocs.maskStr,s.maskStr),a.uniform1f(i.uLocs.grainAmt,s.grainAmt),a.uniform1f(i.uLocs.halationStr,s.halationStr),a.uniform1f(i.uLocs.convergence,s.convergence),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,i.tex),a.drawArrays(a.TRIANGLE_STRIP,0,4),g()}}function _(){f(),h(),g(),d=requestAnimationFrame(b)}t.complete&&t.naturalWidth?_():t.addEventListener("load",_);const M=new ResizeObserver(()=>{f(),g()});return M.observe(e),{destroy(){cancelAnimationFrame(d),M.disconnect()},setGlitch(p,E,w,y){s.glitchEnabled=p?1:0,E!==void 0&&(s.glitchStrength=E),w!==void 0&&(s.glitchSpeed=w),y!==void 0&&(s.glitchCols=y)},setChroma(p,E){s.chromaEnabled=p?1:0,E!==void 0&&(s.chromaOffset=E)},setShader({hardPix:p,warpMult:E,maskStr:w,grainAmt:y,halationStr:S,convergence:x}={}){p!==void 0&&(s.hardPix=p),E!==void 0&&(s.warpMult=E),w!==void 0&&(s.maskStr=w),y!==void 0&&(s.grainAmt=y),S!==void 0&&(s.halationStr=S),x!==void 0&&(s.convergence=x)}}}const aa=[{cls:"sigint",headline:"SIGNAL INTERCEPT: FREQ 12.4GHz",detail:"Encrypted burst tx — POSEIDON signature"},{cls:"humint",headline:"ASSET CONFIRM: NIIHAMA-04",detail:"Target movement: port district, 0300 local"},{cls:"cyber",headline:"ZERO-DAY: CVE-2026-3917",detail:"Legacy auth stack — remote exec payload ready"},{cls:"ghost",headline:"DIVE ANOMALY: SECTOR ALPHA",detail:"Ghost-barrier interference at 4.1m depth"},{cls:"elint",headline:"DRONE SWEEP: SECTOR 12",detail:"Coverage 73% — ETA 4 minutes to full map"},{cls:"sigint",headline:"PACKET STORM: 192.168.7.0/24",detail:"18k pps sustained — possible DDoS staging"},{cls:"cyber",headline:"EXFIL CHANNEL COMPROMISED",detail:"Fallback route DELTA-9 now primary exfil"},{cls:"humint",headline:"CONTACT LOST: ROMEO-7",detail:"Last check-in 03:14:22 UTC — status unknown"},{cls:"ghost",headline:"TACHIKOMA: AUTONOMOUS SWEEP",detail:"Unit 9 executing sector 7 independently"},{cls:"elint",headline:"EM PULSE DETECTED: ZONE 3",detail:"Localized disruption — comm nodes offline"},{cls:"sigint",headline:"NODE COMMS SPIKE: BEIJING",detail:"340% increase in encrypted P2P — 0300-0500"},{cls:"cyber",headline:"FIREWALL PROBE: AS12345",detail:"Systematic port sweep — countermeasures deployed"},{cls:"humint",headline:"BROKER IDENTIFIED: LAUGHING MAN",detail:"Dark web auction — biotech data linked to incident"},{cls:"ghost",headline:"GHOST PROTOCOL: BETA-3",detail:"Shell confirmed on target system — extract ready"},{cls:"elint",headline:"SAT PASS: KH-17 WINDOW",detail:"6 min coverage — imaging tasked to sector 4"}];function er(t){const e=document.createElement("div");return e.className=`sigint-item sigint-item--${t.cls}`,e.innerHTML=`
    <div class="sigint-item__class">${t.cls.toUpperCase()}</div>
    <div class="sigint-item__headline">${t.headline}</div>
    <div class="sigint-item__detail">${t.detail}</div>
  `,e}function tr(t){if(!t)return;const e=4,o=[];function a(){const n=new Set(o.map(d=>{var s;return(s=d.querySelector(".sigint-item__headline"))==null?void 0:s.textContent})),i=aa.filter(d=>!n.has(d.headline)),r=i.length>0?i:aa,l=r[Math.floor(Math.random()*r.length)],c=er(l);t.insertBefore(c,t.firstChild),o.unshift(c),requestAnimationFrame(()=>c.classList.add("sigint-item--visible"));const u=8e3+Math.random()*12e3;for(setTimeout(()=>{c.classList.add("sigint-item--closing"),c.classList.remove("sigint-item--visible"),setTimeout(()=>{c.remove();const d=o.indexOf(c);d>=0&&o.splice(d,1)},500)},u);o.length>e;){const d=o.pop();d.classList.add("sigint-item--closing"),d.classList.remove("sigint-item--visible"),setTimeout(()=>d.remove(),500)}setTimeout(a,3e3+Math.random()*6e3)}setTimeout(a,800),setTimeout(a,2200)}const na=[{cls:"STRATEGIC",headline:"BIOMECH TREATY VOTE: 72HRS",detail:"Section 9 on standby for security detail"},{cls:"TACTICAL",headline:"LAUGHING MAN: ACTIVE",detail:"New sightings logged in Niihama and Togusa ward"},{cls:"ASSET",headline:"BATOU: FIELD POSITION UPDATE",detail:"Grid 7-Delta — visual on primary target"},{cls:"THREAT",headline:"PUPPET MASTER PROTOCOL",detail:"AI ghost-dive signatures — 3 confirmed nodes"},{cls:"STRATEGIC",headline:"ARAMAKI: SITUATION ROOM",detail:"Director briefing at 0600 UTC — attendance req"},{cls:"TACTICAL",headline:"TOGUSA: DEEP COVER",detail:"Identity: Muto Ryo — corporate embedded"},{cls:"THREAT",headline:"ROGUE TACHIKOMA UNIT",detail:"Unit 14 unresponsive — last GPS: Sector 9-Bravo"},{cls:"ASSET",headline:"ISHIKAWA: CYBER BREACH",detail:"Target mainframe penetrated — exfil in 180s"},{cls:"STRATEGIC",headline:"COMA CHIP EXPLOIT: CONFIRMED",detail:"Hardware vulnerability — 40k units affected"},{cls:"TACTICAL",headline:"HELICOPTER SUPPORT: STANDING BY",detail:"AH-6J on tarmac — ETA to sector: 4 min"}];function or(t){const e=document.createElement("div");return e.className="intel-item",e.innerHTML=`
    <div class="intel-item__class">${t.cls}</div>
    <div class="intel-item__headline">${t.headline}</div>
    <div class="intel-item__detail">${t.detail}</div>
  `,e}function ar(t){if(!t)return;const e=5,o=[];function a(){const n=new Set(o.map(d=>{var s;return(s=d.querySelector(".intel-item__headline"))==null?void 0:s.textContent})),i=na.filter(d=>!n.has(d.headline)),r=i.length>0?i:na,l=r[Math.floor(Math.random()*r.length)],c=or(l);t.insertBefore(c,t.firstChild),o.unshift(c),requestAnimationFrame(()=>c.classList.add("intel-item--visible"));const u=1e4+Math.random()*15e3;for(setTimeout(()=>{c.classList.add("intel-item--closing"),c.classList.remove("intel-item--visible"),setTimeout(()=>{c.remove();const d=o.indexOf(c);d>=0&&o.splice(d,1)},500)},u);o.length>e;){const d=o.pop();d.classList.add("intel-item--closing"),d.classList.remove("intel-item--visible"),setTimeout(()=>d.remove(),500)}setTimeout(a,4e3+Math.random()*8e3)}setTimeout(a,1200),setTimeout(a,3500),setTimeout(a,5800)}function X(t,e){return Math.floor(Math.random()*(e-t+1))+t}const pe=()=>`${X(10,220)}.${X(0,255)}.${X(0,255)}.${X(1,254)}`,Vt=()=>[22,80,443,8443,4444,3389,21,1337,9999][Math.floor(Math.random()*9)],nr=()=>`${X(64,65535)}B`,ir=()=>Array.from({length:4},()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0")).join(" "),ia=[()=>({source:"AUTH",message:`HANDSHAKE COMPLETE — ${pe()}:${Vt()}`,alert:!1}),()=>({source:"NET",message:`PKT ${nr()} ${pe()} → ${pe()}`,alert:!1}),()=>({source:"GHOST",message:`DIVE DEPTH: ${(2+Math.random()*3).toFixed(1)}m — STABLE`,alert:!1}),()=>({source:"CRYPT",message:"AES-256 SESSION KEY ESTABLISHED",alert:!1}),()=>({source:"SCAN",message:`PROBE: ${pe()}:${Vt()} — ${ir()}`,alert:!0}),()=>({source:"SYS",message:`MEM ${X(60,92)}% CPU ${X(20,80)}% THERMAL OK`,alert:!1}),()=>({source:"NET",message:`LATENCY ${X(4,45)}ms — ${Math.random()<.8?"NOMINAL":"DEGRADED"}`,alert:Math.random()<.2}),()=>({source:"AUTH",message:`TOKEN REFRESH: UID-${X(1e3,9999)}`,alert:!1}),()=>({source:"CRIT",message:`INTRUSION SIG: ${pe()} PORT ${Vt()}`,alert:!0}),()=>({source:"SYS",message:`COUNTERMEASURE DEPLOYED — BLOCK RULE ${X(100,999)}`,alert:!1}),()=>({source:"NET",message:`ROUTE CHANGE: AS${X(1e3,65e3)} VIA ${pe()}`,alert:!1}),()=>({source:"CRYPT",message:`TLS 1.3 HANDSHAKE: ${pe()} — ${X(0,1)?"ECDH":"RSA"}-4096`,alert:!1}),()=>({source:"SCAN",message:`ANOMALY: BURST ${X(800,9999)} PPS FROM ${pe()}`,alert:!0}),()=>({source:"GHOST",message:`GHOST COEFFICIENT: ${(92+Math.random()*8).toFixed(1)}%`,alert:!1}),()=>({source:"AUTH",message:`CERT CHAIN VALID — SHA-${X(0,1)?"256":"512"}`,alert:!1}),()=>({source:"NET",message:`DNS RESOLVE: ${["niihama.net","togusa.local","sec9.gov","puppet.io"][Math.floor(Math.random()*4)]}`,alert:!1}),()=>({source:"SYS",message:`FIREWALL RULE ${X(1e3,9999)}: DROP ${pe()}/${X(24,32)}`,alert:!1}),()=>({source:"CRIT",message:`ZERO-DAY ATTEMPT: ${pe()} — MITIGATED`,alert:!0})];function sr(t,e){function o(){const a=ia[Math.floor(Math.random()*ia.length)];e(t,{timestamp:new Date().toISOString(),...a()})}for(let a=0;a<8;a++)o();setInterval(o,X(1200,2800))}function Ee(t,e){return Math.floor(Math.random()*(e-t+1))+t}const Pe=[{id:"n-tokyo",lat:35.68,lng:139.69,label:"TOKYO"},{id:"n-moscow",lat:55.75,lng:37.62,label:"MOSCOW"},{id:"n-beijing",lat:39.91,lng:116.39,label:"BEIJING"},{id:"n-london",lat:51.51,lng:-.13,label:"LONDON"},{id:"n-nyc",lat:40.71,lng:-74,label:"NEW YORK"},{id:"n-sydney",lat:-33.87,lng:151.21,label:"SYDNEY"},{id:"n-dubai",lat:25.2,lng:55.27,label:"DUBAI"},{id:"n-saopaulo",lat:-23.55,lng:-46.63,label:"SÃO PAULO"},{id:"n-paris",lat:48.86,lng:2.35,label:"PARIS"},{id:"n-seoul",lat:37.57,lng:126.98,label:"SEOUL"},{id:"n-cairo",lat:30.05,lng:31.24,label:"CAIRO"},{id:"n-berlin",lat:52.52,lng:13.41,label:"BERLIN"},{id:"n-mumbai",lat:19.08,lng:72.88,label:"MUMBAI"},{id:"n-toronto",lat:43.65,lng:-79.38,label:"TORONTO"},{id:"n-singapore",lat:1.35,lng:103.82,label:"SINGAPORE"},{id:"n-nairobi",lat:-1.29,lng:36.82,label:"NAIROBI"},{id:"n-istanbul",lat:41.01,lng:28.97,label:"ISTANBUL"},{id:"n-lagos",lat:6.52,lng:3.38,label:"LAGOS"}],Wa={"n-tokyo":{country:"JAPAN",pop:"13.96M",status:"FINANCIAL HUB"},"n-moscow":{country:"RUSSIA",pop:"12.51M",status:"RESTRICTED"},"n-beijing":{country:"CHINA",pop:"21.54M",status:"RESTRICTED"},"n-london":{country:"UK",pop:"8.98M",status:"ALLIED NODE"},"n-nyc":{country:"USA",pop:"8.34M",status:"ALLIED NODE"},"n-sydney":{country:"AUSTRALIA",pop:"5.31M",status:"ALLIED NODE"},"n-dubai":{country:"UAE",pop:"3.33M",status:"NEUTRAL ZONE"},"n-saopaulo":{country:"BRAZIL",pop:"12.33M",status:"MONITORED"},"n-paris":{country:"FRANCE",pop:"2.15M",status:"ALLIED NODE"},"n-seoul":{country:"S.KOREA",pop:"9.78M",status:"ALLIED NODE"},"n-cairo":{country:"EGYPT",pop:"10.08M",status:"MONITORED"},"n-berlin":{country:"GERMANY",pop:"3.66M",status:"ALLIED NODE"},"n-mumbai":{country:"INDIA",pop:"20.67M",status:"MONITORED"},"n-toronto":{country:"CANADA",pop:"2.93M",status:"ALLIED NODE"},"n-singapore":{country:"SINGAPORE",pop:"5.45M",status:"NEUTRAL ZONE"},"n-nairobi":{country:"KENYA",pop:"4.40M",status:"MONITORED"},"n-istanbul":{country:"TURKEY",pop:"15.46M",status:"NEUTRAL ZONE"},"n-lagos":{country:"NIGERIA",pop:"14.86M",status:"MONITORED"}},Lt=Pe.slice(0,8),$a=[15,72,55,18,28,10,45,33];function ja(t){let e=t.split("").reduce((c,u)=>c*31+u.charCodeAt(0)>>>0,7);const o=()=>(e=e*1664525+1013904223>>>0,(e>>>16)/65535),a=9,n=140,i=34,r=n/a;let l=`<svg viewBox="0 0 ${n} ${i}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;height:34px;">`;l+='<g fill="currentColor">';for(let c=0;c<a;c++){const u=8+o()*24,d=r*(.48+o()*.44),s=c*r+(r-d)*.5;l+=`<rect x="${s.toFixed(1)}" y="${(i-u).toFixed(1)}" width="${d.toFixed(1)}" height="${u.toFixed(1)}"/>`}return l+="</g></svg>",l}function rr(t,e,o,a){const{addNode:n,removeNode:i,updateNodeLevel:r,setThreatLevel:l,setActiveNode:c,focusNode:u,pulseGlobeNode:d,spawnArc:s,appendRow:h,printLine:m,setRadarThreatLevel:f}=a,g=new Map;function b(y,S){t.dispatchEvent(new CustomEvent("s9:alert",{bubbles:!0,detail:{level:S>=70?"critical":"warning",source:y}}))}function _(y,S){n(t,{...y,level:S}),g.set(y.id,S),h(e,{timestamp:new Date().toISOString(),source:"NET",message:`NODE ONLINE: ${y.label} — LVL ${S}`,alert:S>=70}),S>=70&&(b(y.label,S),c(t,y.id),u(t,y.id))}Lt.forEach((y,S)=>{setTimeout(()=>{_(y,$a[S]),S===Lt.length-1&&setTimeout(()=>{l(t,55),f(.55)},800)},S*300+500)});let M=!1;function p(){if(M)return;const y=[...g.keys()],S=Pe.filter(C=>!g.has(C.id)),x=Math.random();if(x<.28&&S.length>0){const C=S[Ee(0,S.length-1)],v=Ee(5,65);_(C,v),m(o,`SIGNAL ACQUIRED: ${C.label}`,"sys")}else if(x<.42&&y.length>5){const C=y[Ee(0,y.length-1)],v=Pe.find(T=>T.id===C);i(t,C),g.delete(C),m(o,`SIGNAL LOST: ${(v==null?void 0:v.label)??C}`,"info"),h(e,{timestamp:new Date().toISOString(),source:"NET",message:`NODE OFFLINE: ${(v==null?void 0:v.label)??C}`,alert:!1})}else if(x<.72&&y.length>0){const C=y[Ee(0,y.length-1)],v=Pe.find(F=>F.id===C),T=g.get(C)??0,B=Ee(8,28),z=Math.min(100,T+B);r(t,C,z),g.set(C,z),l(t,Math.max(...Array.from(g.values()))),f(Math.max(...Array.from(g.values()))/100),m(o,`THREAT ESCALATION: ${(v==null?void 0:v.label)??C} ${T}→${z}`,z>=70?"err":"sys"),h(e,{timestamp:new Date().toISOString(),source:"CRIT",message:`THREAT UP: ${(v==null?void 0:v.label)??C} LVL=${z}`,alert:z>=70}),z>=70&&T<70&&(b((v==null?void 0:v.label)??C,z),c(t,C),u(t,C));const le=T>=70?2:T>=40?1:0,ce=z>=70?2:z>=40?1:0;le!==ce&&d(t,C)}else if(y.length>0){const C=y[Ee(0,y.length-1)],v=Pe.find(ce=>ce.id===C),T=g.get(C)??50,B=Math.max(0,T-Ee(5,18));r(t,C,B),g.set(C,B),l(t,Math.max(0,...Array.from(g.values()))),f(Math.max(0,...Array.from(g.values()))/100),m(o,`THREAT REDUCED: ${(v==null?void 0:v.label)??C} LVL=${B}`,"info");const z=T>=70?2:T>=40?1:0,le=B>=70?2:B>=40?1:0;z!==le&&d(t,C)}if(y.length>=2){const C=1+Math.floor(Math.random()*3);for(let v=0;v<C;v++){const T=y[Math.floor(Math.random()*y.length)];let B=y[Math.floor(Math.random()*y.length)];B===T&&(B=y[(y.indexOf(T)+1)%y.length]),B!==T&&s(t,T,B)}}setTimeout(p,Ee(4e3,9e3))}setTimeout(p,Lt.length*300+2500);const E=setInterval(()=>{const y=[...g.keys()];if(y.length<2)return;const S=Math.random()<.4?2:1;for(let x=0;x<S;x++){const C=y[Math.floor(Math.random()*y.length)];let v=y[Math.floor(Math.random()*y.length)];v===C&&(v=y[(y.indexOf(C)+1)%y.length]),v!==C&&s(t,C,v)}},1200),w=setInterval(()=>{const y=[...g.entries()].filter(([,T])=>T>=70);if(y.length===0)return;const S=t.getAttribute("data-active-node"),x=y.filter(([T])=>T!==S),C=x.length>0?x:y,[v]=C[Math.floor(Math.random()*C.length)];c(t,v),u(t,v)},8e3);return{globeNodes:g,destroy(){M=!0,clearInterval(E),clearInterval(w)}}}function lr(t,e,o,a,n){const{initThreatMap:i,addNode:r,removeNode:l,updateNodeLevel:c,setThreatLevel:u,setActiveNode:d,focusNode:s}=n;i(t,{autoRotate:!0,bloomStrength:.7});const h=new Map;e.forEach((S,x)=>{setTimeout(()=>{r(t,{...S,level:o[x]}),h.set(S.id,o[x])},x*200+300)}),setTimeout(()=>u(t,55),e.length*200+800);const m=document.getElementById("tact-node-info"),f=document.getElementById("tact-btn-add"),g=document.getElementById("tact-btn-remove"),b=document.getElementById("tact-btn-focus"),_=document.getElementById("tact-btn-deselect"),M=document.getElementById("tact-level-slider"),p=document.getElementById("tact-level-val"),E=document.getElementById("tact-level-row");let w=null;function y(){const S=w!==null&&h.has(w);if(g.disabled=!S,b.disabled=!S,_.disabled=!S,M.disabled=!S,E.style.opacity=S?"1":"0.4",E.style.pointerEvents=S?"auto":"none",S){const x=a.find(v=>v.id===w),C=h.get(w);m.textContent=`${(x==null?void 0:x.label)??w} — LVL ${C}`,M.value=C,p.textContent=C}else m.textContent="NO NODE SELECTED"}t.addEventListener("s9:threatmap-node-select",S=>{w=S.detail.nodeId,document.getElementById("tactical-threat").textContent=`THREAT: ${S.detail.level} — ${S.detail.label}`,y()}),t.addEventListener("s9:threatmap-node-deselect",()=>{w=null,y()}),f.addEventListener("click",()=>{const S=a.filter(v=>!h.has(v.id));if(S.length===0)return;const x=S[Math.floor(Math.random()*S.length)],C=Math.floor(Math.random()*60)+10;r(t,{...x,level:C}),h.set(x.id,C),u(t,Math.max(...h.values())),d(t,x.id),s(t,x.id)}),g.addEventListener("click",()=>{w&&(l(t,w),h.delete(w),u(t,h.size>0?Math.max(...h.values()):0),w=null,y())}),b.addEventListener("click",()=>{w&&s(t,w)}),_.addEventListener("click",()=>{d(t,null),w=null,y()}),M.addEventListener("input",()=>{if(!w)return;const S=parseInt(M.value);p.textContent=S,c(t,w,S),h.set(w,S),u(t,Math.max(...h.values()));const x=a.find(C=>C.id===w);m.textContent=`${(x==null?void 0:x.label)??w} — LVL ${S}`}),y()}const gt=[{id:"sec9",label:"SEC.9 HQ",x:50,y:50,root:!0},{id:"niihama",label:"NIIHAMA",x:22,y:22},{id:"togusa",label:"TOGUSA",x:78,y:22},{id:"batou",label:"BATOU",x:78,y:78},{id:"ishikawa",label:"ISHIKAWA",x:22,y:78},{id:"relay1",label:"RELAY ALPHA",x:36,y:32},{id:"relay2",label:"RELAY BETA",x:64,y:32},{id:"relay3",label:"RELAY GAMMA",x:36,y:68},{id:"relay4",label:"RELAY DELTA",x:64,y:68},{id:"ext1",label:"PUPPET MASTER",x:12,y:50},{id:"ext2",label:"LAUGHING MAN",x:88,y:50},{id:"tachi",label:"TACHIKOMA U9",x:50,y:12}],sa=[{id:"e01",from:"sec9",to:"relay1"},{id:"e02",from:"sec9",to:"relay2"},{id:"e03",from:"sec9",to:"relay3"},{id:"e04",from:"sec9",to:"relay4"},{id:"e05",from:"relay1",to:"niihama"},{id:"e06",from:"relay2",to:"togusa"},{id:"e07",from:"relay3",to:"ishikawa"},{id:"e08",from:"relay4",to:"batou"},{id:"e09",from:"niihama",to:"ext1"},{id:"e10",from:"ext1",to:"relay3"},{id:"e11",from:"togusa",to:"relay1"},{id:"e12",from:"batou",to:"relay2"},{id:"e13",from:"ext2",to:"relay2"},{id:"e14",from:"ext2",to:"relay4"},{id:"e15",from:"sec9",to:"tachi"},{id:"e16",from:"relay1",to:"relay2"},{id:"e17",from:"relay3",to:"relay4"}],qt={relay2:72,relay4:88,ext1:95,ext2:80,niihama:45,batou:55};function cr(t,e){if(!t)return;const{initMatrix:o,activateEdge:a,deactivateEdge:n,pulseNode:i,setActiveNode:r}=e;o(t,{nodes:gt,edges:sa});for(const[s,h]of Object.entries(qt)){const m=t.querySelector(`[data-node-id="${s}"]`);m&&(h>=70?m.classList.add("s9-matrix__node--threat-high"):h>=40&&m.classList.add("s9-matrix__node--threat-mid"))}r(t,"ext1");const l=sa.map(s=>s.id),c=new Set,u=[null,null,"var(--neon-warn)","var(--neon-alert)","var(--neon-green)",null];function d(){if(c.size>0){const f=[...c],g=f[Math.floor(Math.random()*f.length)];n(t,g),c.delete(g)}const s=l.filter(f=>!c.has(f)),h=Math.random()<.4?2:1;for(let f=0;f<h&&s.length>0;f++){const g=s.splice(Math.floor(Math.random()*s.length),1)[0],b=u[Math.floor(Math.random()*u.length)];a(t,g,b),c.add(g)}if(Math.random()<.35){const f=gt[Math.floor(Math.random()*gt.length)];i(t,f.id)}const m=document.getElementById("flow-overlay");if(m){const f=Object.values(qt).filter(_=>_>=70).length,g=Object.values(qt).filter(_=>_>=40&&_<70).length,b=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";m.innerHTML=`<span style="font-family:var(--font-terminal);font-size: 0.7rem;color:${b};opacity:0.7">NODES: ${gt.length} &nbsp; <span style="color:var(--text-alert)">CRIT: ${f}</span> &nbsp; <span style="color:var(--neon-warn)">WARN: ${g}</span></span>`}}for(let s=0;s<4;s++){const h=l[Math.floor(Math.random()*l.length)];c.has(h)||(a(t,h),c.add(h))}setInterval(d,700),d(),document.getElementById("matrix-status").textContent="● LIVE"}const Va=new WeakMap;function dr(t,{onSubmit:e,tabComplete:o}={}){const a=new AbortController,{signal:n}=a,i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r={abortController:a,history:[],historyIndex:-1,partialInput:"",reducedMotion:i};Va.set(t,r);const l=t.querySelector(".s9-terminal__input");l&&l.addEventListener("keydown",c=>{hr(t,c,{onSubmit:e,tabComplete:o})},{signal:n})}function D(t,e,o){const a=t.querySelector(".s9-terminal__output");if(!a)return;const n=document.createElement("span");n.className=`s9-terminal__line s9-terminal__line--${o}`,n.textContent=e,a.appendChild(n);const i=200,r=a.querySelectorAll(".s9-terminal__line");r.length>i&&r[0].remove(),mr(a)}function ur(t){const e=t.querySelector(".s9-terminal__output");e&&(e.querySelectorAll(".s9-terminal__line").forEach(o=>o.remove()),t.dispatchEvent(new CustomEvent("s9:terminal-clear",{bubbles:!0})))}function hr(t,e,{onSubmit:o,tabComplete:a}){const n=Va.get(t);if(!n)return;const i=t.querySelector(".s9-terminal__input");if(i)switch(e.key){case"Enter":{const r=i.value;if(!r)return;D(t,r,"cmd"),typeof o=="function"&&o(r),t.dispatchEvent(new CustomEvent("s9:terminal-submit",{bubbles:!0,detail:{command:r,timestamp:new Date().toISOString()}})),n.history.unshift(r),n.historyIndex=-1,n.partialInput="",i.value="";break}case"ArrowUp":{if(e.preventDefault(),n.history.length===0)return;n.historyIndex===-1&&(n.partialInput=i.value);const r=n.historyIndex+1;if(r<n.history.length){n.historyIndex=r,i.value=n.history[n.historyIndex];const l=i.value.length;i.setSelectionRange(l,l)}break}case"ArrowDown":{if(e.preventDefault(),n.historyIndex===-1)return;if(n.historyIndex>0){n.historyIndex-=1,i.value=n.history[n.historyIndex];const r=i.value.length;i.setSelectionRange(r,r)}else{n.historyIndex=-1,i.value=n.partialInput;const r=i.value.length;i.setSelectionRange(r,r)}break}case"Tab":{if(e.preventDefault(),typeof a=="function"){const r=a(i.value);r!=null&&(i.value=r)}break}default:{if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!n.reducedMotion&&Math.random()<.01){const r=t.querySelector(".s9-terminal__output");if(r){const c=Array.from(r.querySelectorAll(".s9-terminal__line")).slice(-8);if(c.length>0){const u=c[Math.floor(Math.random()*c.length)];u.classList.add("glitch-enter"),u.addEventListener("animationend",d=>{d.animationName==="glitch"&&u.classList.remove("glitch-enter")},{once:!0})}}}break}}}function mr(t){t.scrollTop=t.scrollHeight}const It={"":"MATRIX GREEN",gits:"GHOST IN THE SHELL",amber:"AMBER",phosphor:"PHOSPHOR",blood:"BLOOD"};let qa=null,Ya=null,oo=null,ra=null,la=null;function Ka(t){const e=document.documentElement;t===""||t==="matrixgreen"?delete e.dataset.theme:e.dataset.theme=t,document.querySelectorAll(".topbar__theme-btn").forEach(o=>{o.classList.toggle("topbar__theme-btn--active",(o.dataset.themeSet??"")===(t==="matrixgreen"?"":t))}),Xo(qa),oo&&oo()&&Xo(document.getElementById("threatmap-tactical")),Xs(Ya)}function fr({threatEl:t,radarEl:e,getTacticalInited:o,termEl:a,printLine:n}){qa=t,Ya=e,oo=o,ra=a,la=n,document.querySelectorAll(".topbar__theme-btn").forEach(i=>{i.addEventListener("click",()=>{const r=i.dataset.themeSet??"";Ka(r),la(ra,`THEME: ${It[r]??r.toUpperCase()}`,"sys")})})}function ca(){const t=new Date;document.getElementById("topbar-clock").textContent=`UTC ${t.toUTCString().split(" ")[4]}`}function pr(){ca(),setInterval(ca,1e3)}function gr({termEl:t,applyTheme:e,globeNodes:o,metrics:a,radar:n,threatEl:i,updateNodeLevel:r,setThreatLevel:l,setActiveNode:c,focusNode:u,CITY_POOL:d,CITY_DATA:s,citySkyline:h,npCity:m,npSkyline:f,npCountry:g,npPop:b,npCoords:_,npThreat:M,npStatus:p,nodePopup:E}){dr(t,{onSubmit(w){var C;const y=w.trim().split(/\s+/),S=y[0].toLowerCase(),x=y.slice(1);switch(S){case"help":D(t,"SECTION 9 COMMAND INTERFACE — AVAILABLE COMMANDS:","sys"),D(t,"  status              — system status report","info"),D(t,"  ghost               — ghost coefficient analysis","info"),D(t,"  nodes               — list active threat nodes","info"),D(t,"  threat <lvl>        — set global threat level 0-100","info"),D(t,"  threat <id> <lvl>   — set node threat level","info"),D(t,"  focus <id>          — focus camera on node","info"),D(t,"  theme <name>        — switch theme","info"),D(t,"  themes              — list available themes","info"),D(t,"  clear               — clear terminal","info");break;case"status":{const v=o.size,T=[...o.values()].filter(z=>z>=70).length,B=v>0?Math.max(...o.values()):0;D(t,"── SYSTEM STATUS ──────────────────────────","sys"),D(t,`  CPU: ${a.cpu}%   MEM: ${a.mem}%   NET I/O: ${a.net}%`,"info"),D(t,`  GHOST LAYER: ${a.ghost}%   ENCRYPTION: ${a.enc}%`,"info"),D(t,`  NODES ON GRID: ${v}   CRITICAL: ${T}`,T>0?"err":"info"),D(t,`  PEAK THREAT: ${B}   GLOBAL LEVEL: ${B}`,B>=70?"err":"sys"),D(t,"  SECURE CHANNEL: ACTIVE   ENCRYPTION: AES-256","info");break}case"ghost":{const v=a.ghostCoeff.toFixed(1);D(t,"── GHOST COEFFICIENT ANALYSIS ─────────────","sys"),D(t,`  COEFFICIENT: ${v}%   BARRIER: NOMINAL`,"info"),D(t,"  CYBER BRAIN: SECTION 9 CLEARANCE ALPHA-7","info"),D(t,"  DIVE DEPTH: STABLE 3.2m   TACHIKOMA LINK: ACTIVE","info"),D(t,"  IDENTITY: CONFIRMED — KUSANAGI.M",v>=95?"sys":"err");break}case"nodes":{if(o.size===0){D(t,"NO NODES ON GRID","info");break}D(t,`ACTIVE NODES (${o.size}):`,"sys");for(const[v,T]of o){const B=d.find(ce=>ce.id===v),z=(B==null?void 0:B.label)??v,le=T>=70?"err":T>=40?"sys":"info";D(t,`  ${v.padEnd(14)} ${z.padEnd(12)} LVL=${T}`,le)}break}case"threat":{if(x.length===0){D(t,`GLOBAL THREAT: ${Math.max(0,...o.values())}`,"sys");break}if(x.length>=2&&isNaN(parseInt(x[0]))){const v=x[0],T=parseInt(x[1]);if(!o.has(v)){D(t,`ERR: node '${v}' not found — use NODES to list`,"err");break}if(isNaN(T)||T<0||T>100){D(t,"ERR: level must be 0-100","err");break}const B=r(i,v,T);o.set(v,T),l(i,Math.max(0,...o.values())),n.setRadarThreatLevel(Math.max(0,...o.values())/100),D(t,`NODE ${v}: ${B} → ${T}`,T>=70?"err":"sys"),T>=70&&B<70&&(c(i,v),u(i,v))}else{const v=parseInt(x[0]);if(isNaN(v)||v<0||v>100){D(t,"ERR: level must be 0-100","err");break}l(i,v),n.setRadarThreatLevel(v/100),D(t,`GLOBAL THREAT LEVEL SET: ${v}`,"sys")}break}case"focus":{const v=x[0];if(!v){D(t,"ERR: focus requires a node id — use NODES to list","err");break}if(!o.has(v)){D(t,`ERR: node '${v}' not found`,"err");break}c(i,v),u(i,v);const T=d.find(B=>B.id===v);D(t,`CAMERA FOCUSED: ${(T==null?void 0:T.label)??v}`,"sys");break}case"theme":{const v=((C=x[0])==null?void 0:C.toLowerCase())??"";if(v===""||v==="matrixgreen"){e(""),D(t,"THEME: MATRIX GREEN","sys");break}if(!Object.keys(It).includes(v)){D(t,`ERR: unknown theme '${v}' — use THEMES to list`,"err");break}e(v),D(t,`THEME: ${It[v]}`,"sys");break}case"themes":D(t,"AVAILABLE THEMES:","sys");for(const[v,T]of Object.entries(It))D(t,`  ${(v||"matrixgreen").padEnd(14)} ${T}`,"info");break;case"clear":ur(t),D(t,"TERMINAL CLEARED","sys");break;default:S&&D(t,`ERR: unknown command '${w}' — type HELP`,"err")}},tabComplete(w){return["help","status","ghost","nodes","threat","focus","theme","themes","clear"].find(S=>S.startsWith(w.toLowerCase()))??null}}),D(t,"SECTION 9 OPERATIVE INTERFACE — TYPE HELP FOR COMMANDS","sys"),D(t,"GHOST BABEL OPERATION: ACTIVE","info")}const Xa={easeInOutCubic:Oa,easeOutExpo:Ba,backInOut:Li,linear:Ti},Za={default:{label:"Default",lineColor:65484,glowColor:65484,opacity:.72,glowOpacity:.28,emissiveIntensity:1.8,stagger:.55,ringFade:.35,warpAmount:.12,direction:"south-to-north",easingKey:"easeInOutCubic",durationMs:2200},pulse:{label:"Pulse",lineColor:16711782,lineColorB:16737792,glowColor:16711748,glowColorB:16729088,opacity:.95,glowOpacity:.55,emissiveIntensity:6,stagger:1,ringFade:.1,warpAmount:.2,direction:"equator-out",easingKey:"easeOutExpo",durationMs:1400,glowLayers:5},scanner:{label:"Scanner",lineColor:65382,glowColor:47940,opacity:.9,glowOpacity:.35,emissiveIntensity:3,stagger:.96,ringFade:.07,warpAmount:.03,direction:"south-to-north",easingKey:"linear",durationMs:2200},cosmic:{label:"Cosmic",lineColor:10044671,lineColorB:61183,glowColor:5579468,glowColorB:39355,opacity:.75,glowOpacity:.38,emissiveIntensity:2.8,stagger:.48,ringFade:.38,warpAmount:.24,direction:"equator-out",easingKey:"easeInOutCubic",durationMs:3200},ignition:{label:"Ignition",lineColor:16772608,lineColorB:16720384,glowColor:16750848,glowColorB:16716032,opacity:.95,glowOpacity:.55,emissiveIntensity:5.5,stagger:.88,ringFade:.2,warpAmount:.5,direction:"south-to-north",easingKey:"backInOut",durationMs:1600,glowLayers:4},ghost:{label:"Ghost",lineColor:8956671,lineColorB:4491519,glowColor:4495871,glowColorB:2245836,opacity:.28,glowOpacity:.07,emissiveIntensity:.8,stagger:.68,ringFade:.58,warpAmount:.42,direction:"north-to-south",easingKey:"easeOutExpo",durationMs:4500},neon:{label:"Neon",lineColor:16711935,lineColorB:65535,glowColor:13369599,glowColorB:65484,opacity:.85,glowOpacity:.45,emissiveIntensity:4.5,stagger:.62,ringFade:.28,warpAmount:.16,direction:"south-to-north",easingKey:"easeOutExpo",durationMs:2e3,glowLayers:5},solar:{label:"Solar",lineColor:16777215,lineColorB:16742144,glowColor:16768256,glowColorB:16724736,opacity:.8,glowOpacity:.5,emissiveIntensity:6,stagger:1,ringFade:.18,warpAmount:.1,direction:"equator-out",easingKey:"easeOutExpo",durationMs:1600,glowLayers:4},arctic:{label:"Arctic",lineColor:61183,lineColorB:15663103,glowColor:8978431,glowColorB:13434879,opacity:.62,glowOpacity:.22,emissiveIntensity:2,stagger:.42,ringFade:.42,warpAmount:.1,direction:"north-to-south",easingKey:"easeInOutCubic",durationMs:3e3},alert:{label:"Alert",lineColor:16746496,lineColorB:16711680,glowColor:16733440,glowColorB:13369344,opacity:.92,glowOpacity:.48,emissiveIntensity:4.5,stagger:.78,ringFade:.22,warpAmount:.22,direction:"equator-out",easingKey:"backInOut",durationMs:1600},ember:{label:"Ember",lineColor:16763904,lineColorB:16724736,glowColor:16750848,glowColorB:16716032,opacity:.68,glowOpacity:.32,emissiveIntensity:3.5,stagger:.62,ringFade:.52,warpAmount:.38,direction:"south-to-north",easingKey:"backInOut",durationMs:3800,glowLayers:3}};let A=null,be=!1,Dt=null;function Qa(){Dt!==null&&(clearTimeout(Dt),Dt=null)}function Yt(t,e){Qa(),t<=0?e():Dt=setTimeout(e,t)}function Ie(){be=!1,Qa(),A&&A.stop(),document.getElementById("rr-loop").classList.remove("active")}function Ja(t){if(!A)return;const e=document.getElementById("rr-loopMode").value,o=+document.getElementById("rr-pause").value;e==="play-reverse"?(A.reset(),A.play(()=>Yt(o,()=>{be&&A.reverse(()=>Yt(o,t))}))):(A.reset(),A.play(()=>Yt(o,t)))}function en(){be&&Ja(()=>{be&&en()})}function vr(t,e=!0){var i;const o=Za[t];if(!o||!A)return;if(document.querySelectorAll("#rr-presets button").forEach(r=>r.classList.remove("active")),(i=document.getElementById(`rr-pre-${t}`))==null||i.classList.add("active"),A._options.durationMs=o.durationMs,o.direction){document.getElementById("rr-dir").value=o.direction;const l={"south-to-north":0,"north-to-south":1,"equator-out":2}[o.direction]??0;A._baseRings.material.uniforms.uDirection.value=l,A._glowLayers.forEach(c=>{c.material.uniforms.uDirection.value=l}),A._options.direction=o.direction}o.easingKey&&(document.getElementById("rr-easing").value=o.easingKey,A._options.easingFn=Xa[o.easingKey]),document.getElementById("rr-dur").value=o.durationMs,document.getElementById("rr-vDur").textContent=o.durationMs;const a=e?+document.getElementById("rr-morphDur").value:0;A.morphTo({lineColor:o.lineColor,lineColorB:o.lineColorB??o.lineColor,glowColor:o.glowColor,glowColorB:o.glowColorB??o.glowColor,opacity:o.opacity,glowOpacity:o.glowOpacity,emissiveIntensity:o.emissiveIntensity,stagger:o.stagger,warpAmount:o.warpAmount,ringFade:o.ringFade,glowLayers:o.glowLayers??3,glowLayerRadiusStep:o.glowLayerRadiusStep??.004,glowLayerOpacityFalloff:o.glowLayerOpacityFalloff??.5},a);const n=(r,l,c,u)=>{l!==void 0&&(document.getElementById(r).value=l,c&&(document.getElementById(c).textContent=u?u(l):l))};if(n("rr-opacity",o.opacity!==void 0?Math.round(o.opacity*100):void 0,"rr-vOpacity",r=>(r/100).toFixed(2)),n("rr-glowOp",o.glowOpacity!==void 0?Math.round(o.glowOpacity*100):void 0,"rr-vGlowOp",r=>(r/100).toFixed(2)),n("rr-emissive",o.emissiveIntensity!==void 0?Math.round(o.emissiveIntensity*100):void 0,"rr-vEmissive",r=>(r/100).toFixed(2)),n("rr-stagger",o.stagger!==void 0?Math.round(o.stagger*100):void 0,"rr-vStagger",r=>(r/100).toFixed(2)),n("rr-warp",o.warpAmount!==void 0?Math.round(o.warpAmount*100):void 0,"rr-vWarp",r=>(r/100).toFixed(2)),o.ringFade!==void 0){const r=Math.max(.001,o.ringFade);n("rr-ringFade",Math.round(r*100),"rr-vRingFade",l=>(l/100).toFixed(2))}o.lineColor!==void 0&&(document.getElementById("rr-colLine").value="#"+o.lineColor.toString(16).padStart(6,"0")),o.lineColorB!==void 0&&(document.getElementById("rr-colLineB").value="#"+(o.lineColorB??o.lineColor).toString(16).padStart(6,"0")),o.glowColor!==void 0&&(document.getElementById("rr-colGlow").value="#"+o.glowColor.toString(16).padStart(6,"0")),o.glowColorB!==void 0&&(document.getElementById("rr-colGlowB").value="#"+(o.glowColorB??o.glowColor).toString(16).padStart(6,"0"))}function yr(){var e;if(!A)return;const t=document.getElementById("rr-presets");Object.entries(Za).forEach(([o,a])=>{const n=document.createElement("button");n.id=`rr-pre-${o}`,n.textContent=a.label,n.addEventListener("click",()=>vr(o,!0)),t.appendChild(n)}),(e=document.getElementById("rr-pre-default"))==null||e.classList.add("active"),document.getElementById("rr-enable").addEventListener("change",o=>{if(A)if(o.target.checked){const a=+document.getElementById("rr-opacity").value/100,n=+document.getElementById("rr-glowOp").value/100;A.morphTo({opacity:a,glowOpacity:n},400),A.play()}else Ie(),A.morphTo({opacity:0,glowOpacity:0},400)}),document.getElementById("rr-play").addEventListener("click",()=>{Ie(),A.play()}),document.getElementById("rr-rev").addEventListener("click",()=>{Ie(),A.reverse()}),document.getElementById("rr-stop").addEventListener("click",()=>{Ie(),A.stop()}),document.getElementById("rr-reset").addEventListener("click",()=>{Ie(),A.reset()}),document.getElementById("rr-loop").addEventListener("click",()=>{be=!be,document.getElementById("rr-loop").classList.toggle("active",be),be?en():Ie()}),document.getElementById("rr-once").addEventListener("click",()=>{Ie(),be=!0,Ja(()=>{be=!1})}),document.getElementById("rr-dir").addEventListener("change",o=>{const n={"south-to-north":0,"north-to-south":1,"equator-out":2}[o.target.value]??0;A._options.direction=o.target.value,A._baseRings.material.uniforms.uDirection.value=n,A._glowLayers.forEach(i=>{i.material.uniforms.uDirection.value=n})}),document.getElementById("rr-easing").addEventListener("change",o=>{A._options.easingFn=Xa[o.target.value]}),document.getElementById("rr-dur").addEventListener("input",o=>{A._options.durationMs=+o.target.value,document.getElementById("rr-vDur").textContent=o.target.value}),document.getElementById("rr-stagger").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vStagger").textContent=a.toFixed(2),A._baseRings.material.uniforms.uStagger.value=a,A._glowLayers.forEach(n=>{n.material.uniforms.uStagger.value=a}),A._options.stagger=a}),document.getElementById("rr-ringFade").addEventListener("input",o=>{const a=Math.max(.001,o.target.value/100);document.getElementById("rr-vRingFade").textContent=a.toFixed(2),A._baseRings.material.uniforms.uRingFade.value=a,A._glowLayers.forEach(n=>{n.material.uniforms.uRingFade.value=a}),A._options.ringFade=a}),document.getElementById("rr-invert").addEventListener("change",o=>{A.setInvert(o.target.checked)}),document.getElementById("rr-colLine").addEventListener("input",o=>{const a=parseInt(o.target.value.slice(1),16);A._baseRings.material.uniforms.uColor.value.set(a),A._options.lineColor=a}),document.getElementById("rr-colLineB").addEventListener("input",o=>{const a=parseInt(o.target.value.slice(1),16);A._baseRings.material.uniforms.uColorB.value.set(a),A._options.lineColorB=a}),document.getElementById("rr-colGlow").addEventListener("input",o=>{const a=parseInt(o.target.value.slice(1),16);A._glowLayers.forEach(n=>n.material.uniforms.uColor.value.set(a)),A._options.glowColor=a}),document.getElementById("rr-colGlowB").addEventListener("input",o=>{const a=parseInt(o.target.value.slice(1),16);A._glowLayers.forEach(n=>n.material.uniforms.uColorB.value.set(a)),A._options.glowColorB=a}),document.getElementById("rr-gradMode").addEventListener("change",o=>{A.setGradientMode(+o.target.value)}),document.getElementById("rr-opacity").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vOpacity").textContent=a.toFixed(2),document.getElementById("rr-enable").checked&&(A._baseRings.material.uniforms.uOpacity.value=a,A._options.opacity=a)}),document.getElementById("rr-glowOp").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vGlowOp").textContent=a.toFixed(2),document.getElementById("rr-enable").checked&&(A._glowLayers.forEach((n,i)=>{n.material.uniforms.uOpacity.value=a*Math.pow(A._options.glowLayerOpacityFalloff,i)}),A._options.glowOpacity=a)}),document.getElementById("rr-emissive").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vEmissive").textContent=a.toFixed(2),A._baseRings.material.uniforms.uEmissiveIntensity.value=a,A._glowLayers.forEach(n=>{n.material.uniforms.uEmissiveIntensity.value=a}),A._options.emissiveIntensity=a}),document.getElementById("rr-warp").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vWarp").textContent=a.toFixed(2),A._baseRings.material.uniforms.uWarpAmount.value=a,A._glowLayers.forEach(n=>{n.material.uniforms.uWarpAmount.value=a}),A._options.warpAmount=a}),document.getElementById("rr-glowRad").addEventListener("input",o=>{const a=o.target.value/1e3;document.getElementById("rr-vGlowRad").textContent=a.toFixed(3);const n=A._options.glowRadius;A._glowLayers.forEach(i=>i.scale.setScalar(a/n)),A._options.glowRadius=a}),document.getElementById("rr-glowLayers").addEventListener("change",o=>{const a=+o.target.value;document.getElementById("rr-vGlowLayers").textContent=a,A.morphTo({glowLayers:a},0)}),document.getElementById("rr-glowStep").addEventListener("change",o=>{const a=o.target.value/1e3;document.getElementById("rr-vGlowStep").textContent=a.toFixed(3),A.morphTo({glowLayerRadiusStep:a},0)}),document.getElementById("rr-glowFalloff").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vGlowFalloff").textContent=a.toFixed(2),A.morphTo({glowLayerOpacityFalloff:a},0)}),document.getElementById("rr-colorSpread").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vColorSpread").textContent=a.toFixed(2),A._baseRings.material.uniforms.uColorSpread.value=a,A._glowLayers.forEach(n=>{n.material.uniforms.uColorSpread.value=a}),A._options.colorSpread=a}),document.getElementById("rr-brightSpread").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vBrightSpread").textContent=a.toFixed(2),A._baseRings.material.uniforms.uBrightSpread.value=a,A._glowLayers.forEach(n=>{n.material.uniforms.uBrightSpread.value=a}),A._options.brightSpread=a}),document.getElementById("rr-flickerAmp").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vFlickerAmp").textContent=a.toFixed(2),A._baseRings.material.uniforms.uFlickerAmp.value=a,A._glowLayers.forEach(n=>{n.material.uniforms.uFlickerAmp.value=a}),A._options.flickerAmp=a}),document.getElementById("rr-flickerSpeed").addEventListener("input",o=>{const a=o.target.value/10;document.getElementById("rr-vFlickerSpeed").textContent=a.toFixed(1),A._baseRings.material.uniforms.uFlickerSpeed.value=a,A._glowLayers.forEach(n=>{n.material.uniforms.uFlickerSpeed.value=a}),A._options.flickerSpeed=a}),document.getElementById("rr-arcSpread").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vArcSpread").textContent=a.toFixed(2),A._baseRings.material.uniforms.uArcColorSpread.value=a,A._glowLayers.forEach(n=>{n.material.uniforms.uArcColorSpread.value=a}),A._options.arcColorSpread=a}),document.getElementById("rr-morphDur").addEventListener("input",o=>{document.getElementById("rr-vMorphDur").textContent=o.target.value}),document.getElementById("rr-pause").addEventListener("input",o=>{document.getElementById("rr-vPause").textContent=o.target.value})}function da(){const t=Math.random(),e=.7+Math.random()*.3,o=.45+Math.random()*.2,a=new O().setHSL(t,e,o);return Math.round(a.r*255)<<16|Math.round(a.g*255)<<8|Math.round(a.b*255)}function ua(t){const e=new O(t),o={};e.getHSL(o);const a=(o.h+(Math.random()-.5)*.25+1)%1,n=Math.max(.5,Math.min(1,o.s+(Math.random()-.5)*.3)),i=Math.max(.3,Math.min(.75,o.l+(Math.random()-.5)*.25)),r=new O().setHSL(a,n,i);return Math.round(r.r*255)<<16|Math.round(r.g*255)<<8|Math.round(r.b*255)}function vt(t,e){document.getElementById(t).value="#"+e.toString(16).padStart(6,"0")}function br(t){A=t,yr(),document.getElementById("rr-randLine").addEventListener("click",()=>{if(!A)return;const e=da(),o=ua(e),a=+document.getElementById("rr-morphDur").value;A.morphTo({lineColor:e,lineColorB:o},a),vt("rr-colLine",e),vt("rr-colLineB",o)}),document.getElementById("rr-randGlow").addEventListener("click",()=>{if(!A)return;const e=da(),o=ua(e),a=+document.getElementById("rr-morphDur").value;A.morphTo({glowColor:e,glowColorB:o},a),vt("rr-colGlow",e),vt("rr-colGlowB",o)})}function _r(t){const e=Hi(t);if(!e)return;const o=1.002,a=new Oe({color:65484,transparent:!0,opacity:.18,blending:$,depthTest:!0,depthWrite:!1}),n=new so,i=10,r=20,l=64;for(let h=1;h<i;h++){const m=h/i*Math.PI,f=o*Math.cos(m),g=o*Math.sin(m),b=[];for(let M=0;M<=l;M++){const p=M/l*Math.PI*2;b.push(new P(g*Math.cos(p),f,g*Math.sin(p)))}const _=new co(new Ce().setFromPoints(b),a);_.renderOrder=3,n.add(_)}for(let h=0;h<r;h++){const m=h/r*Math.PI*2,f=[];for(let b=0;b<=l;b++){const _=b/l*Math.PI;f.push(new P(o*Math.sin(_)*Math.cos(m),o*Math.cos(_),o*Math.sin(_)*Math.sin(m)))}const g=new uo(new Ce().setFromPoints(f),a);g.renderOrder=3,n.add(g)}n.visible=!1,e.add(n);function c(h,m,f){const b=new kn(1,m).attributes.position,_=b.count/3,M=new P,p=new P,E=new Map;for(let y=0;y<_;y++){const S=y*3;for(let x=0;x<3;x++){const C=S+x,v=S+(x+1)%3;M.fromBufferAttribute(b,C),p.fromBufferAttribute(b,v);const T=[M,p].map(B=>`${B.x.toFixed(5)},${B.y.toFixed(5)},${B.z.toFixed(5)}`).sort().join("|");E.has(T)||E.set(T,[M.clone(),p.clone()])}}const w=[];for(const[y,S]of E.values())for(let x=0;x<f;x++){const C=new P().lerpVectors(y,S,x/f).normalize().multiplyScalar(h),v=new P().lerpVectors(y,S,(x+1)/f).normalize().multiplyScalar(h);w.push(C.x,C.y,C.z,v.x,v.y,v.z)}return new Float32Array(w)}const u=new st;u.setPositions(c(o,3,4));const d=new ue({color:65484,transparent:!0,opacity:.22,blending:$,depthTest:!0,depthWrite:!1,linewidth:1,resolution:new k(window.innerWidth,window.innerHeight)}),s=new Q(u,d);s.renderOrder=3,s.visible=!1,e.add(s),window.addEventListener("resize",()=>d.resolution.set(window.innerWidth,window.innerHeight)),document.getElementById("rr-globe").addEventListener("change",h=>{const m=h.target.value;n.visible=m==="latlon",s.visible=m==="wire"})}function wr(t){document.getElementById("rain-color").addEventListener("input",e=>{t.setColor(e.target.value)}),document.getElementById("rain-opacity").addEventListener("input",e=>{const o=e.target.value/100;document.getElementById("rain-vOpacity").textContent=o.toFixed(2),t.setOpacity(o)}),document.getElementById("rain-burstBloom").addEventListener("change",e=>{t.setBurstBloom(e.target.checked)}),document.getElementById("rain-globeInteract").addEventListener("change",e=>{t.setGlobeInteract(e.target.checked)}),document.getElementById("rain-chroma").addEventListener("change",e=>{const o=+document.getElementById("rain-chromaScale").value/100;t.setGlyphChroma(e.target.checked,o)}),document.getElementById("rain-chromaScale").addEventListener("input",e=>{const o=e.target.value/100;document.getElementById("rain-vChromaScale").textContent=o.toFixed(1),document.getElementById("rain-chroma").checked&&t.setGlyphChroma(!0,o)}),document.getElementById("rain-heat").addEventListener("change",e=>{const o=+document.getElementById("rain-heatAmt").value/1e3;t.setHeat(e.target.checked,o)}),document.getElementById("rain-heatAmt").addEventListener("input",e=>{const o=e.target.value/1e3;document.getElementById("rain-vHeatAmt").textContent=o.toFixed(3),t.setHeat(document.getElementById("rain-heat").checked,o)}),document.getElementById("rain-streaks").addEventListener("change",e=>{const o=+document.getElementById("rain-streakAmt").value/1e3;t.setStreaks(e.target.checked,o)}),document.getElementById("rain-streakAmt").addEventListener("input",e=>{const o=e.target.value/1e3;document.getElementById("rain-vStreakAmt").textContent=o.toFixed(3),t.setStreaks(document.getElementById("rain-streaks").checked,o)}),document.getElementById("rain-soften").addEventListener("change",e=>{const o=+document.getElementById("rain-softenStr").value/1e3;t.setSoften(e.target.checked,o)}),document.getElementById("rain-softenStr").addEventListener("input",e=>{const o=e.target.value/1e3;document.getElementById("rain-vSoftenStr").textContent=o.toFixed(3),t.setSoften(document.getElementById("rain-soften").checked,o)}),document.getElementById("rain-depth").addEventListener("input",e=>{const o=e.target.value/100;document.getElementById("rain-vDepth").textContent=o.toFixed(2),t.setDepth(o)}),document.getElementById("rain-normalStr").addEventListener("input",e=>{const o=e.target.value/100;document.getElementById("rain-vNormalStr").textContent=o.toFixed(1),t.setNormalStrength(o)})}function Sr(t,e){document.querySelectorAll("#rr-panel .rr-collapsible").forEach(d=>{d.addEventListener("click",()=>{const s=document.getElementById(d.dataset.target);d.classList.toggle("rr-open"),s.classList.toggle("rr-open")})}),document.getElementById("ts-glitchEnabled").addEventListener("change",d=>{const s=document.getElementById("ts-glitchStrength").value/1e3,h=document.getElementById("ts-glitchSpeed").value/10,m=+document.getElementById("ts-glitchCols").value;t.setGlitch(d.target.checked,s,h,m)}),document.getElementById("ts-glitchStrength").addEventListener("input",d=>{const s=d.target.value/1e3;document.getElementById("ts-vGlitchStrength").textContent=s.toFixed(3),t.setGlitch(document.getElementById("ts-glitchEnabled").checked,s)}),document.getElementById("ts-glitchSpeed").addEventListener("input",d=>{const s=d.target.value/10;document.getElementById("ts-vGlitchSpeed").textContent=s.toFixed(1),t.setGlitch(document.getElementById("ts-glitchEnabled").checked,void 0,s)}),document.getElementById("ts-glitchCols").addEventListener("input",d=>{const s=+d.target.value;document.getElementById("ts-vGlitchCols").textContent=s,t.setGlitch(document.getElementById("ts-glitchEnabled").checked,void 0,void 0,s)}),document.getElementById("ts-chromaEnabled").addEventListener("change",d=>{const s=document.getElementById("ts-chromaOffset").value/1e4;t.setChroma(d.target.checked,s)}),document.getElementById("ts-chromaOffset").addEventListener("input",d=>{const s=d.target.value/1e4;document.getElementById("ts-vChromaOffset").textContent=s.toFixed(4),t.setChroma(document.getElementById("ts-chromaEnabled").checked,s)});const o=document.querySelector(".s9-telescreen__scratches"),a=document.querySelector(".s9-telescreen__vignette"),n=document.querySelector(".s9-telescreen__scanlines"),i=document.querySelector(".s9-telescreen__static"),r=document.querySelector(".s9-telescreen__static-b"),l=[document.querySelector(".s9-telescreen__phase-a"),document.querySelector(".s9-telescreen__phase-b"),document.querySelector(".s9-telescreen__phase-c")],c=document.querySelector(".s9-telescreen__glow");document.getElementById("ts-scratchEnabled").addEventListener("change",d=>{o.style.display=d.target.checked?"":"none"}),document.getElementById("ts-scratchOpacity").addEventListener("input",d=>{const s=d.target.value/100;document.getElementById("ts-vScratchOpacity").textContent=s.toFixed(2),o.style.opacity=s}),document.getElementById("ts-vignetteEnabled").addEventListener("change",d=>{a.style.display=d.target.checked?"":"none"}),document.getElementById("ts-vignetteOpacity").addEventListener("input",d=>{const s=d.target.value/100;document.getElementById("ts-vVignetteOpacity").textContent=s.toFixed(2),a.style.opacity=s}),document.getElementById("ts-scanlinesEnabled").addEventListener("change",d=>{n.style.display=d.target.checked?"block":"none"}),document.getElementById("ts-staticEnabled").addEventListener("change",d=>{const s=d.target.checked?"":"none";i.style.display=s,r.style.display=s}),document.getElementById("ts-phaseEnabled").addEventListener("change",d=>{const s=d.target.checked?"":"none";l.forEach(h=>{h.style.display=s})}),document.getElementById("ts-glowEnabled").addEventListener("change",d=>{c.style.display=d.target.checked?"":"none"}),document.getElementById("ts-glowOpacity").addEventListener("input",d=>{const s=d.target.value/100;document.getElementById("ts-vGlowOpacity").textContent=s.toFixed(2),c.style.opacity=s}),document.getElementById("ts-warp").addEventListener("input",d=>{const s=d.target.value/100;document.getElementById("ts-vWarp").textContent=s.toFixed(2),t.setShader({warpMult:s})}),document.getElementById("ts-hardPix").addEventListener("input",d=>{const s=d.target.value/10;document.getElementById("ts-vHardPix").textContent=s.toFixed(1),t.setShader({hardPix:-s})}),document.getElementById("ts-maskStr").addEventListener("input",d=>{const s=d.target.value/100;document.getElementById("ts-vMaskStr").textContent=s.toFixed(2),t.setShader({maskStr:s})}),document.getElementById("ts-grain").addEventListener("input",d=>{const s=d.target.value/1e3;document.getElementById("ts-vGrain").textContent=s.toFixed(3),t.setShader({grainAmt:s})}),document.getElementById("ts-halation").addEventListener("input",d=>{const s=d.target.value/100;document.getElementById("ts-vHalation").textContent=s.toFixed(2),t.setShader({halationStr:s})}),document.getElementById("ts-convergence").addEventListener("input",d=>{const s=d.target.value/1e4;document.getElementById("ts-vConvergence").textContent=s.toFixed(4),t.setShader({convergence:s})});function u(){const d=document.getElementById("rain-grEnabled").checked,s=document.getElementById("rain-grLightX").value/100,h=document.getElementById("rain-grLightY").value/100,m=document.getElementById("rain-grDensity").value/100,f=document.getElementById("rain-grDecay").value/100,g=document.getElementById("rain-grWeight").value/100,b=document.getElementById("rain-grExposure").value/100;e.setGodRays(d,s,h,m,f,g,b)}document.getElementById("rain-grEnabled").addEventListener("change",u),[["rain-grLightX","rain-vGrLightX",100,2],["rain-grLightY","rain-vGrLightY",100,2],["rain-grDensity","rain-vGrDensity",100,2],["rain-grDecay","rain-vGrDecay",100,2],["rain-grWeight","rain-vGrWeight",100,2],["rain-grExposure","rain-vGrExposure",100,2]].forEach(([d,s,h,m])=>{document.getElementById(d).addEventListener("input",f=>{document.getElementById(s).textContent=(f.target.value/h).toFixed(m),u()})})}pr();document.querySelectorAll(".s9-panel").forEach(Xi);const tn=document.querySelectorAll(".topbar__tab[data-tab]"),xr=document.querySelectorAll(".center__view[data-view]");let ha=!1,ao=!1;const qe=document.querySelector(".s9-terminal");function ma(t){tn.forEach(e=>{const o=e.dataset.tab===t;e.classList.toggle("topbar__tab--active",o),e.setAttribute("aria-selected",o)}),xr.forEach(e=>{e.classList.toggle("center__view--active",e.dataset.view===t)}),t==="network"&&!ha&&(ha=!0,Pr()),t==="tactical"&&!ao&&(ao=!0,Rr()),D(qe,`VIEW: ${t.toUpperCase()} ACTIVATED`,"sys")}tn.forEach(t=>{t.addEventListener("click",()=>ma(t.dataset.tab)),t.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),ma(t.dataset.tab))})});function Kt(t,e,o){let a=0;function n(){if(a>=t.length)return;const{id:i,state:r}=t[a++],l=document.getElementById(i);l&&Zi(l,r),setTimeout(n,a<t.length?e:e*2)}n()}tr(document.getElementById("sigint-feed"));ar(document.getElementById("intel-feed"));setTimeout(()=>{Kt([{id:"seq-breach",state:"complete"},{id:"seq-extract",state:"active"}],3e3),setTimeout(()=>{Kt([{id:"seq-extract",state:"complete"},{id:"seq-cover",state:"active"}],3500),setTimeout(()=>{Kt([{id:"seq-cover",state:"complete"},{id:"seq-exfil",state:"active"}],3e3)},9e3)},8e3)},5e3);const Ft=document.querySelector(".s9-stream");Nn(Ft);sr(Ft,mo);const Er=Js(document.getElementById("ts-feed-src"),document.getElementById("ts-feed-canvas"),document.getElementById("ts-glow-canvas")),ge={cpu:42,mem:61,net:12,ghost:77,enc:96},Mr=document.getElementById("tele-cpu"),Cr=document.getElementById("tele-mem"),Ar=document.getElementById("tele-net"),Tr=document.getElementById("tele-enc");setInterval(()=>{for(const t of Object.keys(ge))ge[t]=Math.max(5,Math.min(100,ge[t]+(Math.random()-.5)*6)),ge[t]=Math.round(ge[t]);lt(Mr,ge.cpu),lt(Cr,ge.mem),lt(Ar,ge.net),lt(Tr,ge.enc)},2e3);const on=document.getElementById("neural-01"),an=document.getElementById("ghost-val"),nn=document.getElementById("cyber-index"),sn=document.getElementById("neural-sync"),rn=document.getElementById("ekg-bpm"),ln=Gn(document.getElementById("ekg-canvas"),document.getElementById("ekg-heart"));let wo=98.4;for(let t=0;t<3;t++)wo=Ca(on,an,nn,sn,rn,ln);setInterval(()=>{wo=Ca(on,an,nn,sn,rn,ln)},3e3);const Se=document.querySelector(".s9-threatmap");Fa(Se,{autoRotate:!0,bloomStrength:.4});const cn=document.getElementById("proximity-radar"),dn=Ks(cn,{threatLevel:0}),Lr=getComputedStyle(document.documentElement).getPropertyValue("--neon-green").trim()||"#00ff70",un=vs(document.getElementById("matrix-rain-host"),{color:Lr,opacity:.45,syncCamera:Ui(Se)});document.getElementById("sat-toggle").addEventListener("change",t=>{Yi(Se,t.target.checked)});const{globeNodes:Ir}=rr(Se,Ft,qe,{addNode:Na,removeNode:Ua,updateNodeLevel:yo,setThreatLevel:vo,setActiveNode:Ve,focusNode:bo,pulseGlobeNode:Wi,spawnArc:$i,appendRow:mo,printLine:D,setRadarThreatLevel:t=>dn.setRadarThreatLevel(t)});fr({threatEl:Se,radarEl:cn,getTacticalInited:()=>ao,termEl:qe,printLine:D});const Dr=document.getElementById("alert-host");document.addEventListener("s9:alert",t=>{var e;if(((e=t.detail)==null?void 0:e.level)==="critical"){const o=t.detail.source??"UNKNOWN";D(qe,`⚠ CRITICAL ALERT: ${o}`,"err"),zn(Dr,{level:"critical",code:"CRITICAL THREAT",message:o})}});const je=document.getElementById("node-popup"),hn=document.getElementById("np-city"),mn=document.getElementById("np-skyline"),fn=document.getElementById("np-country"),pn=document.getElementById("np-pop"),gn=document.getElementById("np-coords"),no=document.getElementById("np-threat"),vn=document.getElementById("np-status");Se.addEventListener("s9:threatmap-node-select",t=>{const{nodeId:e,label:o,level:a,lat:n,lng:i}=t.detail;D(qe,`NODE SELECT: ${o} — LEVEL ${a} — ${n.toFixed(2)}°, ${i.toFixed(2)}°`,a>=71?"err":a>=41?"warn":"info"),mo(Ft,{timestamp:new Date().toISOString(),source:"TGT",message:`TARGET LOCKED: ${o} THREAT=${a}`,alert:a>=41});const r=Wa[e]??{country:"—",pop:"—",status:"UNKNOWN"};hn.textContent=o,mn.innerHTML=ja(e),fn.textContent=r.country,pn.textContent=r.pop,gn.textContent=`${n.toFixed(2)}°, ${i.toFixed(2)}°`;const l=a>=70?"CRITICAL":a>=40?"ELEVATED":"LOW";no.textContent=`${a} — ${l}`,no.style.color=a>=70?"var(--text-alert)":a>=40?"var(--neon-warn)":"var(--neon-green)",vn.textContent=r.status,je.classList.toggle("node-popup--left",i>60),je.setAttribute("aria-hidden","false"),je.classList.add("node-popup--visible")});Se.addEventListener("s9:threatmap-node-deselect",()=>{je.classList.remove("node-popup--visible"),setTimeout(()=>je.setAttribute("aria-hidden","true"),260)});gr({termEl:qe,applyTheme:Ka,globeNodes:Ir,metrics:{...ge,get ghostCoeff(){return wo}},radar:dn,threatEl:Se,updateNodeLevel:yo,setThreatLevel:vo,setActiveNode:Ve,focusNode:bo,CITY_POOL:Pe,CITY_DATA:Wa,citySkyline:ja,npCity:hn,npSkyline:mn,npCountry:fn,npPop:pn,npCoords:gn,npThreat:no,npStatus:vn,nodePopup:je});function Rr(){lr(document.getElementById("threatmap-tactical"),Lt,$a,Pe,{initThreatMap:Fa,addNode:Na,removeNode:Ua,updateNodeLevel:yo,setThreatLevel:vo,setActiveNode:Ve,focusNode:bo})}function Pr(){cr(document.getElementById("flow-matrix"),{initMatrix:Wn,activateEdge:Aa,deactivateEdge:Ta,pulseNode:$n,setActiveNode:Et})}const Or=document.getElementById("rr-panel"),Br=Gi(Se);br(Br);_r(Se);wr(un);Sr(Er,un);const Fr=["intel-feed-1","sys-metrics","seq-log-right","neural-readout-1","operative-log","data-stream-1","terminal-1","telescreen-1","pulse-radar-1"],kr=Fr.map(t=>document.querySelector(`[data-s9-id="${t}"]`)),Nr=document.querySelector(".s9-ov");let yt=!1;window.addEventListener("keydown",t=>{t.key==="h"||t.key==="H"?Or.classList.toggle("rr-visible"):(t.key==="i"||t.key==="I")&&(yt=!yt,kr.forEach(e=>e==null?void 0:e.classList.toggle("s9-panel--i-hidden",yt)),Nr.classList.toggle("s9-ov--i-hidden",yt))});
