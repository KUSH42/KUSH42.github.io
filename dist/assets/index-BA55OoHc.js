import{C as yn,V as O,M as We,T as He,Q as To,S as Co,a as N,R as bn,P as _n,b as It,c as ae,O as ma,B as Ae,F as Pt,d as te,U as ot,W as bt,H as _t,N as wn,e as Sn,f as B,A as $,g as $e,I as pa,h as Kt,i as ze,j as ga,k as io,l as va,m as wt,n as St,o as at,L as xn,p as ya,G as so,q as we,r as xt,s as ro,t as lo,u as ba,v as Re,w as En,x as Mn,y as Zt,D as _a,z as An,E as Oe,J as co,K as Tn,X as uo,Y as Lo,Z as Do,_ as wa,$ as rt,a0 as Cn,a1 as Ln,a2 as Dn,a3 as Sa,a4 as Rn,a5 as In,a6 as Pn,a7 as nt,a8 as On,a9 as ho,aa as Ke,ab as Bn,ac as xa,ad as Fn}from"./three-C_ueH2ui.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();const Ea=new WeakMap;function kn(t){const e=new AbortController,{signal:o}=e,a={ac:e,paused:!1,filter:null};Ea.set(t,a);const n=t.querySelector(".s9-stream__body");n&&(n.addEventListener("mouseenter",()=>{a.paused=!0,n.dataset.paused="true"},{signal:o}),n.addEventListener("mouseleave",()=>{a.paused=!1,n.dataset.paused="false",Ma(n)},{signal:o}),n.addEventListener("click",i=>{const r=i.target.closest(".s9-stream__row");if(!r)return;const c=r.classList.contains("s9-stream__row--pinned");r.classList.toggle("s9-stream__row--pinned",!c),t.dispatchEvent(new CustomEvent("s9:stream-row-pinned",{bubbles:!0,detail:{row:r,pinned:!c}}))},{signal:o}))}function fo(t,{timestamp:e,source:o,message:a,alert:n=!1}){const i=t.querySelector(".s9-stream__body");if(!i)return;const r=Ea.get(t),c=(r==null?void 0:r.filter)??null,s=document.createElement("div");s.className="s9-stream__row",n&&s.classList.add("s9-stream__row--alert"),c&&o!==c&&(s.hidden=!0),s.innerHTML=`<span class="s9-stream__timestamp">${Nt(e)}</span><span class="s9-stream__source">${Nt(o)}</span><span class="s9-stream__message">${Nt(a)}</span>`,s.classList.add("glitch-enter"),s.addEventListener("animationend",()=>s.classList.remove("glitch-enter"),{once:!0}),i.appendChild(s),i.children.length>100&&i.removeChild(i.firstChild),r!=null&&r.paused||Ma(i)}function Ma(t){t.scrollTop=t.scrollHeight}function Nt(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Nn(t,e){e(),t.classList.remove("glitch-enter"),t.offsetWidth,t.classList.add("glitch-enter"),t.addEventListener("animationend",()=>t.classList.remove("glitch-enter"),{once:!0})}const Ut=.37;function Ro(t){return t>.08&&t<.18?Math.sin((t-.08)/.1*Math.PI)*.18:t>.28&&t<.32?-((t-.28)/.04)*.38:t>.32&&t<.37?-.38+(t-.32)/.05*1.38:t>.37&&t<.43?1-(t-.37)/.06*1.28:t>.43&&t<.49?-.28+(t-.43)/.06*.28:t>.52&&t<.68?Math.sin((t-.52)/.16*Math.PI)*.3:0}function Un(t,e){if(!t)return console.warn("initEkg: canvas element not found"),{setBpm(){},destroy(){}};let o=62,a=0,n=0,i=0,r=0;function c(){e&&(e.classList.remove("beat"),e.offsetWidth,e.classList.add("beat"))}function s(){const u=t.getContext("2d"),f=t.width,g=t.height,m=g/2,b=g*.44,_=o/60/80;u.clearRect(0,0,f,g);const x=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";u.beginPath();for(let C=0;C<f;C++){const A=((a-(f-1-C)*_)%1+1)%1,w=m-Ro(A)*b;C===0?u.moveTo(C,w):u.lineTo(C,w)}u.strokeStyle=x,u.lineWidth=1,u.shadowColor=x,u.shadowBlur=5,u.stroke();const M=m-Ro(a)*b;u.beginPath(),u.arc(f-1,M,1.8,0,Math.PI*2),u.fillStyle=x,u.shadowBlur=10,u.fill()}function d(){const u=t.clientWidth;u&&t.width!==u&&(t.width=u)}d();const h=new ResizeObserver(d);h.observe(t);function l(u){r=requestAnimationFrame(l);const f=i?u-i:16;i=u,n=a,a=(a+o/60*(f/1e3))%1,(n<Ut&&a>=Ut||n>a&&a>=Ut)&&c(),s()}return r=requestAnimationFrame(l),{setBpm(u){o=u},destroy(){cancelAnimationFrame(r),h.disconnect()}}}let Ge=98.4;function Aa(t,e,o,a,n,i){Ge=Math.max(85,Math.min(100,Ge+(Math.random()-.45)*1.2));const r=Ge.toFixed(1),c=Math.round(58+(100-Ge)/15*12);return n.textContent=c,i.setBpm(c),Nn(t,()=>{e.textContent=r,o.textContent=`${r}%`,a.textContent=`${Math.round(Ge)}%`}),Ge}const Io=new WeakMap;function lt(t,e){const o=Math.max(0,Math.min(100,e)),a=t.querySelector(".s9-telemetry__bar-fill");if(a){a.style.width=`${o}%`;const c=["s9-telemetry__bar-fill--ok","s9-telemetry__bar-fill--warning","s9-telemetry__bar-fill--critical"];a.classList.remove(...c),o<=60?a.classList.add("s9-telemetry__bar-fill--ok"):o<=85?a.classList.add("s9-telemetry__bar-fill--warning"):a.classList.add("s9-telemetry__bar-fill--critical")}const n=t.querySelector(".s9-telemetry__value");n&&(n.textContent=Math.round(o).toString());const i=Io.get(t)??!1,r=o>85;r&&!i&&t.dispatchEvent(new CustomEvent("s9:telemetry-threshold",{bubbles:!0,detail:{value:o}})),Io.set(t,r)}const Gn=8e3;function Hn(t,{level:e="critical",code:o,message:a,persistent:n=!1}){const i=document.createElement("div");i.className=`s9-alert s9-alert--${e}`,n&&(i.dataset.persistent="true");const r=e==="critical"?"⬡":"⚠",c=new Date().toISOString().replace("T"," ").substring(0,19)+" UTC";return i.innerHTML=`<span class="s9-alert__icon" aria-hidden="true">${r}</span><div class="s9-alert__body"><span class="s9-alert__code">${Gt(o)}</span><span class="s9-alert__message">${Gt(a)}</span></div><span class="s9-alert__timestamp">${Gt(c)}</span><button class="s9-alert__dismiss" aria-label="Dismiss alert">✕</button>`,i.classList.add("glitch-enter"),i.addEventListener("animationend",()=>i.classList.remove("glitch-enter"),{once:!0}),i.querySelector(".s9-alert__dismiss").addEventListener("click",()=>{Po(i)}),t.appendChild(i),n||setTimeout(()=>{i.isConnected&&Po(i)},Gn),i}function Po(t){var o;if(!t.isConnected)return;const e=((o=t.querySelector(".s9-alert__code"))==null?void 0:o.textContent)??"";t.classList.add("s9-alert--dismissing"),t.addEventListener("transitionend",()=>{t.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:e}})),t.remove()},{once:!0}),setTimeout(()=>{t.isConnected&&(t.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:e}})),t.remove())},400)}function Gt(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const ne="http://www.w3.org/2000/svg",ke=new WeakMap;function zn(t,{nodes:e=[],edges:o=[]}={}){const a=new AbortController,{signal:n}=a,i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r={abortController:a,nodeMap:new Map,edgeMap:new Map,activeNodeId:null,reducedMotion:i};ke.set(t,r);const c=document.createElementNS(ne,"svg");c.setAttribute("class","s9-matrix__canvas"),c.setAttribute("viewBox","0 0 100 100"),c.setAttribute("preserveAspectRatio","xMidYMid meet"),c.setAttribute("role","img"),c.setAttribute("aria-label","Network topology matrix");const s=document.createElementNS(ne,"defs"),d=document.createElementNS(ne,"g");d.setAttribute("class","s9-matrix__edges");const h=document.createElementNS(ne,"g");h.setAttribute("class","s9-matrix__nodes"),c.appendChild(s),c.appendChild(d),c.appendChild(h),t.appendChild(c),e.forEach(l=>$n(t,l)),o.forEach(l=>jn(t,l)),o.forEach(l=>{l.active&&Ta(t,l.id)}),c.addEventListener("click",l=>{const u=l.target.closest("[data-node-id]");u?Et(t,u.dataset.nodeId):r.activeNodeId!==null&&Et(t,null)},{signal:n}),c.addEventListener("keydown",l=>{if(l.key==="Enter"||l.key===" "){const u=l.target.closest("[data-node-id]");u&&(l.preventDefault(),Et(t,u.dataset.nodeId))}},{signal:n})}function Wn(t,e){const o=ke.get(t);if(!o)return;const a=o.nodeMap.get(e);if(!a||a.classList.contains("s9-matrix__node--active"))return;a.classList.add("s9-matrix__node--pulsing");const n=a.querySelector(".s9-matrix__node-ring");n&&n.addEventListener("animationend",i=>{i.animationName==="matrix-ring-pulse"&&a.classList.remove("s9-matrix__node--pulsing")},{once:!0})}function Ta(t,e,o=null){const a=ke.get(t);if(!a)return;if(e===null){for(const[m]of a.edgeMap)Ca(t,m);return}const n=a.edgeMap.get(e);if(!n||n.active)return;const i=t.querySelector(".s9-matrix__canvas");if(!i)return;const r=i.querySelector(".s9-matrix__edges");if(!r)return;const{line:c,x1:s,y1:d,x2:h,y2:l}=n;c&&c.parentNode&&c.parentNode.removeChild(c);const u=`s9-edge-${e}`,f=document.createElementNS(ne,"path");f.setAttribute("class","s9-matrix__edge s9-matrix__edge--active"),f.setAttribute("id",u),f.setAttribute("data-edge-id",e),f.setAttribute("d",`M ${s} ${d} L ${h} ${l}`),r.appendChild(f);let g=null;if(!a.reducedMotion){g=document.createElementNS(ne,"circle"),g.setAttribute("class","s9-matrix__edge-dot"),g.setAttribute("r","1.2"),o&&(g.style.fill=o,g.style.filter=`drop-shadow(0 0 2px ${o})`);const m=document.createElementNS(ne,"animateMotion");m.setAttribute("dur","2s"),m.setAttribute("repeatCount","indefinite");const b=document.createElementNS(ne,"mpath");b.setAttributeNS("http://www.w3.org/1999/xlink","href",`#${u}`),m.appendChild(b),g.appendChild(m),r.appendChild(g)}n.line=f,n.dot=g,n.active=!0}function Ca(t,e){const o=ke.get(t);if(!o)return;const a=o.edgeMap.get(e);if(!a||!a.active)return;const n=t.querySelector(".s9-matrix__canvas");if(!n)return;const i=n.querySelector(".s9-matrix__edges");if(!i)return;const{line:r,dot:c,x1:s,y1:d,x2:h,y2:l}=a;c&&c.parentNode&&c.parentNode.removeChild(c),r&&r.parentNode&&r.parentNode.removeChild(r);const u=document.createElementNS(ne,"line");u.setAttribute("class","s9-matrix__edge"),u.setAttribute("data-edge-id",e),u.setAttribute("x1",s),u.setAttribute("y1",d),u.setAttribute("x2",h),u.setAttribute("y2",l),i.appendChild(u),a.line=u,a.dot=null,a.active=!1}function Et(t,e){const o=ke.get(t);if(!o)return;if(o.activeNodeId!==null){const n=o.nodeMap.get(o.activeNodeId);n&&(n.classList.remove("s9-matrix__node--active"),n.setAttribute("aria-pressed","false")),t.dispatchEvent(new CustomEvent("s9:matrix-node-deselect",{bubbles:!0,detail:{nodeId:o.activeNodeId}})),o.activeNodeId=null}if(e===null)return;const a=o.nodeMap.get(e);a&&(a.classList.add("s9-matrix__node--active"),a.setAttribute("aria-pressed","true"),o.activeNodeId=e,t.dispatchEvent(new CustomEvent("s9:matrix-node-click",{bubbles:!0,detail:{nodeId:e,label:a.getAttribute("aria-label")??e}})))}function $n(t,{id:e,x:o,y:a,label:n,root:i=!1}){const r=ke.get(t);if(!r)return;const c=t.querySelector(".s9-matrix__canvas");if(!c)return;const s=c.querySelector(".s9-matrix__nodes");if(!s)return;const d=document.createElementNS(ne,"g");d.setAttribute("class",`s9-matrix__node${i?" s9-matrix__node--root":""}`),d.setAttribute("data-node-id",e),d.setAttribute("tabindex","0"),d.setAttribute("role","button"),d.setAttribute("aria-label",n),d.setAttribute("aria-pressed","false");const h=document.createElementNS(ne,"circle");h.setAttribute("class","s9-matrix__node-ring"),h.setAttribute("cx",o),h.setAttribute("cy",a),h.setAttribute("r","4");const l=document.createElementNS(ne,"circle");l.setAttribute("class","s9-matrix__node-core"),l.setAttribute("cx",o),l.setAttribute("cy",a),l.setAttribute("r","2.5");const u=document.createElementNS(ne,"text");u.setAttribute("class","s9-matrix__node-label"),u.setAttribute("x",o),u.setAttribute("y",a+3.5),u.textContent=n,d.appendChild(h),d.appendChild(l),d.appendChild(u),s.appendChild(d),r.nodeMap.set(e,d)}function jn(t,{id:e,from:o,to:a}){const n=ke.get(t);if(!n)return;const i=t.querySelector(".s9-matrix__canvas");if(!i)return;const r=i.querySelector(".s9-matrix__edges");if(!r)return;const c=n.nodeMap.get(o),s=n.nodeMap.get(a),d=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,h=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,l=s?parseFloat(s.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,u=s?parseFloat(s.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,f=document.createElementNS(ne,"line");f.setAttribute("class","s9-matrix__edge"),f.setAttribute("data-edge-id",e),f.setAttribute("x1",d),f.setAttribute("y1",h),f.setAttribute("x2",l),f.setAttribute("y2",u),r.appendChild(f),n.edgeMap.set(e,{line:f,dot:null,active:!1,from:o,to:a,x1:d,y1:h,x2:l,y2:u})}const Oo={type:"change"},mo={type:"start"},La={type:"end"},ct=new bn,Bo=new _n,Vn=Math.cos(70*It.DEG2RAD),j=new O,oe=2*Math.PI,U={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ht=1e-6;class qn extends yn{constructor(e,o=null){super(e,o),this.state=U.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:We.ROTATE,MIDDLE:We.DOLLY,RIGHT:We.PAN},this.touches={ONE:He.ROTATE,TWO:He.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new To,this._lastTargetPosition=new O,this._quat=new To().setFromUnitVectors(e.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Co,this._sphericalDelta=new Co,this._scale=1,this._panOffset=new O,this._rotateStart=new N,this._rotateEnd=new N,this._rotateDelta=new N,this._panStart=new N,this._panEnd=new N,this._panDelta=new N,this._dollyStart=new N,this._dollyEnd=new N,this._dollyDelta=new N,this._dollyDirection=new O,this._mouse=new N,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Xn.bind(this),this._onPointerDown=Yn.bind(this),this._onPointerUp=Kn.bind(this),this._onContextMenu=ai.bind(this),this._onMouseWheel=Jn.bind(this),this._onKeyDown=ei.bind(this),this._onTouchStart=ti.bind(this),this._onTouchMove=oi.bind(this),this._onMouseDown=Zn.bind(this),this._onMouseMove=Qn.bind(this),this._interceptControlDown=ni.bind(this),this._interceptControlUp=ii.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Oo),this.update(),this.state=U.NONE}pan(e,o){this._pan(e,o),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const o=this.object.position;j.copy(o).sub(this.target),j.applyQuaternion(this._quat),this._spherical.setFromVector3(j),this.autoRotate&&this.state===U.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let a=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(a)&&isFinite(n)&&(a<-Math.PI?a+=oe:a>Math.PI&&(a-=oe),n<-Math.PI?n+=oe:n>Math.PI&&(n-=oe),a<=n?this._spherical.theta=Math.max(a,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(a+n)/2?Math.max(a,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let i=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),i=r!=this._spherical.radius}if(j.setFromSpherical(this._spherical),j.applyQuaternion(this._quatInverse),o.copy(this.target).add(j),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const c=j.length();r=this._clampDistance(c*this._scale);const s=c-r;this.object.position.addScaledVector(this._dollyDirection,s),this.object.updateMatrixWorld(),i=!!s}else if(this.object.isOrthographicCamera){const c=new O(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),i=s!==this.object.zoom;const d=new O(this._mouse.x,this._mouse.y,0);d.unproject(this.object),this.object.position.sub(d).add(c),this.object.updateMatrixWorld(),r=j.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(ct.origin.copy(this.object.position),ct.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ct.direction))<Vn?this.object.lookAt(this.target):(Bo.setFromNormalAndCoplanarPoint(this.object.up,this.target),ct.intersectPlane(Bo,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),i=!0)}return this._scale=1,this._performCursorZoom=!1,i||this._lastPosition.distanceToSquared(this.object.position)>Ht||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ht||this._lastTargetPosition.distanceToSquared(this.target)>Ht?(this.dispatchEvent(Oo),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?oe/60*this.autoRotateSpeed*e:oe/60/60*this.autoRotateSpeed}_getZoomScale(e){const o=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*o)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,o){j.setFromMatrixColumn(o,0),j.multiplyScalar(-e),this._panOffset.add(j)}_panUp(e,o){this.screenSpacePanning===!0?j.setFromMatrixColumn(o,1):(j.setFromMatrixColumn(o,0),j.crossVectors(this.object.up,j)),j.multiplyScalar(e),this._panOffset.add(j)}_pan(e,o){const a=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;j.copy(n).sub(this.target);let i=j.length();i*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*i/a.clientHeight,this.object.matrix),this._panUp(2*o*i/a.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/a.clientWidth,this.object.matrix),this._panUp(o*(this.object.top-this.object.bottom)/this.object.zoom/a.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,o){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const a=this.domElement.getBoundingClientRect(),n=e-a.left,i=o-a.top,r=a.width,c=a.height;this._mouse.x=n/r*2-1,this._mouse.y=-(i/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const o=this.domElement;this._rotateLeft(oe*this._rotateDelta.x/o.clientHeight),this._rotateUp(oe*this._rotateDelta.y/o.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let o=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),o=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),o=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),o=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),o=!0;break}o&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),a=.5*(e.pageX+o.x),n=.5*(e.pageY+o.y);this._rotateStart.set(a,n)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),a=.5*(e.pageX+o.x),n=.5*(e.pageY+o.y);this._panStart.set(a,n)}}_handleTouchStartDolly(e){const o=this._getSecondPointerPosition(e),a=e.pageX-o.x,n=e.pageY-o.y,i=Math.sqrt(a*a+n*n);this._dollyStart.set(0,i)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const a=this._getSecondPointerPosition(e),n=.5*(e.pageX+a.x),i=.5*(e.pageY+a.y);this._rotateEnd.set(n,i)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const o=this.domElement;this._rotateLeft(oe*this._rotateDelta.x/o.clientHeight),this._rotateUp(oe*this._rotateDelta.y/o.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),a=.5*(e.pageX+o.x),n=.5*(e.pageY+o.y);this._panEnd.set(a,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const o=this._getSecondPointerPosition(e),a=e.pageX-o.x,n=e.pageY-o.y,i=Math.sqrt(a*a+n*n);this._dollyEnd.set(0,i),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+o.x)*.5,c=(e.pageY+o.y)*.5;this._updateZoomParameters(r,c)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let o=0;o<this._pointers.length;o++)if(this._pointers[o]==e.pointerId){this._pointers.splice(o,1);return}}_isTrackingPointer(e){for(let o=0;o<this._pointers.length;o++)if(this._pointers[o]==e.pointerId)return!0;return!1}_trackPointer(e){let o=this._pointerPositions[e.pointerId];o===void 0&&(o=new N,this._pointerPositions[e.pointerId]=o),o.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const o=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[o]}_customWheelEvent(e){const o=e.deltaMode,a={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(o){case 1:a.deltaY*=16;break;case 2:a.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(a.deltaY*=10),a}}function Yn(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Xn(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function Kn(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(La),this.state=U.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],o=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:o.x,pageY:o.y});break}}function Zn(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case We.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=U.DOLLY;break;case We.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=U.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=U.ROTATE}break;case We.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=U.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=U.PAN}break;default:this.state=U.NONE}this.state!==U.NONE&&this.dispatchEvent(mo)}function Qn(t){switch(this.state){case U.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case U.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case U.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function Jn(t){this.enabled===!1||this.enableZoom===!1||this.state!==U.NONE||(t.preventDefault(),this.dispatchEvent(mo),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(La))}function ei(t){this.enabled!==!1&&this._handleKeyDown(t)}function ti(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case He.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=U.TOUCH_ROTATE;break;case He.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=U.TOUCH_PAN;break;default:this.state=U.NONE}break;case 2:switch(this.touches.TWO){case He.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=U.TOUCH_DOLLY_PAN;break;case He.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=U.TOUCH_DOLLY_ROTATE;break;default:this.state=U.NONE}break;default:this.state=U.NONE}this.state!==U.NONE&&this.dispatchEvent(mo)}function oi(t){switch(this._trackPointer(t),this.state){case U.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case U.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case U.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case U.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=U.NONE}}function ai(t){this.enabled!==!1&&t.preventDefault()}function ni(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ii(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Mt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class it{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const si=new ma(-1,1,1,-1,0,1);class ri extends Ae{constructor(){super(),this.setAttribute("position",new Pt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Pt([0,2,0,0,2,0],2))}}const li=new ri;class Da{constructor(e){this._mesh=new ae(li,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,si)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class ve extends it{constructor(e,o="tDiffuse"){super(),this.textureID=o,this.uniforms=null,this.material=null,e instanceof te?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ot.clone(e.uniforms),this.material=new te({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Da(this.material)}render(e,o,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(o),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Fo extends it{constructor(e,o){super(),this.scene=e,this.camera=o,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,o,a){const n=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let r,c;this.inverse?(r=0,c=1):(r=1,c=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),i.buffers.stencil.setFunc(n.ALWAYS,r,4294967295),i.buffers.stencil.setClear(c),i.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(o),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(n.EQUAL,1,4294967295),i.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),i.buffers.stencil.setLocked(!0)}}class ci extends it{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class po{constructor(e,o){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),o===void 0){const a=e.getSize(new N);this._width=a.width,this._height=a.height,o=new bt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:_t}),o.texture.name="EffectComposer.rt1"}else this._width=o.width,this._height=o.height;this.renderTarget1=o,this.renderTarget2=o.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ve(Mt),this.copyPass.material.blending=wn,this.timer=new Sn}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,o){this.passes.splice(o,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const o=this.passes.indexOf(e);o!==-1&&this.passes.splice(o,1)}isLastEnabledPass(e){for(let o=e+1;o<this.passes.length;o++)if(this.passes[o].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const o=this.renderer.getRenderTarget();let a=!1;for(let n=0,i=this.passes.length;n<i;n++){const r=this.passes[n];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),r.needsSwap){if(a){const c=this.renderer.getContext(),s=this.renderer.state.buffers.stencil;s.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),s.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}Fo!==void 0&&(r instanceof Fo?a=!0:r instanceof ci&&(a=!1))}}this.renderer.setRenderTarget(o)}reset(e){if(e===void 0){const o=this.renderer.getSize(new N);this._pixelRatio=this.renderer.getPixelRatio(),this._width=o.width,this._height=o.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,o){this._width=e,this._height=o;const a=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(a,n),this.renderTarget2.setSize(a,n);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(a,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class go extends it{constructor(e,o,a=null,n=null,i=null){super(),this.scene=e,this.camera=o,this.overrideMaterial=a,this.clearColor=n,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new B}render(e,o,a){const n=e.autoClear;e.autoClear=!1;let i,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),e.autoClear=n}}const di={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new B(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Te extends it{constructor(e,o=1,a,n){super(),this.strength=o,this.radius=a,this.threshold=n,this.resolution=e!==void 0?new N(e.x,e.y):new N(256,256),this.clearColor=new B(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new bt(i,r,{type:_t}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const l=new bt(i,r,{type:_t});l.texture.name="UnrealBloomPass.h"+h,l.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(l);const u=new bt(i,r,{type:_t});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),i=Math.round(i/2),r=Math.round(r/2)}const c=di;this.highPassUniforms=ot.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new te({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];const s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new N(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=o,this.compositeMaterial.uniforms.bloomRadius.value=.1;const d=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=d,this.bloomTintColors=[new O(1,1,1),new O(1,1,1),new O(1,1,1),new O(1,1,1),new O(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ot.clone(Mt.uniforms),this.blendMaterial=new te({uniforms:this.copyUniforms,vertexShader:Mt.vertexShader,fragmentShader:Mt.fragmentShader,premultipliedAlpha:!0,blending:$,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new B,this._oldClearAlpha=1,this._basic=new $e,this._fsQuad=new Da(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,o){let a=Math.round(e/2),n=Math.round(o/2);this.renderTargetBright.setSize(a,n);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(a,n),this.renderTargetsVertical[i].setSize(a,n),this.separableBlurMaterials[i].uniforms.invSize.value=new N(1/a,1/n),a=Math.round(a/2),n=Math.round(n/2)}render(e,o,a,n,i){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const r=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=a.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let c=this.renderTargetBright;for(let s=0;s<this.nMips;s++)this._fsQuad.material=this.separableBlurMaterials[s],this.separableBlurMaterials[s].uniforms.colorTexture.value=c.texture,this.separableBlurMaterials[s].uniforms.direction.value=Te.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[s]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[s].uniforms.colorTexture.value=this.renderTargetsHorizontal[s].texture,this.separableBlurMaterials[s].uniforms.direction.value=Te.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[s]),e.clear(),this._fsQuad.render(e),c=this.renderTargetsVertical[s];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=r}_getSeparableBlurMaterial(e){const o=[],a=e/3;for(let n=0;n<e;n++)o.push(.39894*Math.exp(-.5*n*n/(a*a))/a);return new te({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new N(.5,.5)},direction:{value:new N(.5,.5)},gaussianCoefficients:{value:o}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new te({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Te.BlurDirectionX=new N(1,0);Te.BlurDirectionY=new N(0,1);const ko=new io,dt=new O;class st extends pa{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],o=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],a=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(a),this.setAttribute("position",new Pt(e,3)),this.setAttribute("uv",new Pt(o,2))}applyMatrix4(e){const o=this.attributes.instanceStart,a=this.attributes.instanceEnd;return o!==void 0&&(o.applyMatrix4(e),a.applyMatrix4(e),o.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const a=new Kt(o,6,1);return this.setAttribute("instanceStart",new ze(a,3,0)),this.setAttribute("instanceEnd",new ze(a,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const a=new Kt(o,6,1);return this.setAttribute("instanceColorStart",new ze(a,3,0)),this.setAttribute("instanceColorEnd",new ze(a,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ga(e.geometry)),this}fromLineSegments(e){const o=e.geometry;return this.setPositions(o.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new io);const e=this.attributes.instanceStart,o=this.attributes.instanceEnd;e!==void 0&&o!==void 0&&(this.boundingBox.setFromBufferAttribute(e),ko.setFromBufferAttribute(o),this.boundingBox.union(ko))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new va),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,o=this.attributes.instanceEnd;if(e!==void 0&&o!==void 0){const a=this.boundingSphere.center;this.boundingBox.getCenter(a);let n=0;for(let i=0,r=e.count;i<r;i++)dt.fromBufferAttribute(e,i),n=Math.max(n,a.distanceToSquared(dt)),dt.fromBufferAttribute(o,i),n=Math.max(n,a.distanceToSquared(dt));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}St.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new N(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};wt.line={uniforms:ot.merge([St.common,St.fog,St.line]),vertexShader:`
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
		`};class ue extends te{constructor(e){super({type:"LineMaterial",uniforms:ot.clone(wt.line.uniforms),vertexShader:wt.line.vertexShader,fragmentShader:wt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const zt=new at,No=new O,Uo=new O,V=new at,q=new at,fe=new at,Wt=new O,$t=new ya,X=new xn,Go=new O,ut=new io,ht=new va,me=new at;let _e,Be;function Ho(t,e,o){return me.set(0,0,-e,1).applyMatrix4(t.projectionMatrix),me.multiplyScalar(1/me.w),me.x=Be/o.width,me.y=Be/o.height,me.applyMatrix4(t.projectionMatrixInverse),me.multiplyScalar(1/me.w),Math.abs(Math.max(me.x,me.y))}function ui(t,e){const o=t.matrixWorld,a=t.geometry,n=a.attributes.instanceStart,i=a.attributes.instanceEnd,r=Math.min(a.instanceCount,n.count);for(let c=0,s=r;c<s;c++){X.start.fromBufferAttribute(n,c),X.end.fromBufferAttribute(i,c),X.applyMatrix4(o);const d=new O,h=new O;_e.distanceSqToSegment(X.start,X.end,h,d),h.distanceTo(d)<Be*.5&&e.push({point:h,pointOnLine:d,distance:_e.origin.distanceTo(h),object:t,face:null,faceIndex:c,uv:null,uv1:null})}}function hi(t,e,o){const a=e.projectionMatrix,i=t.material.resolution,r=t.matrixWorld,c=t.geometry,s=c.attributes.instanceStart,d=c.attributes.instanceEnd,h=Math.min(c.instanceCount,s.count),l=-e.near;_e.at(1,fe),fe.w=1,fe.applyMatrix4(e.matrixWorldInverse),fe.applyMatrix4(a),fe.multiplyScalar(1/fe.w),fe.x*=i.x/2,fe.y*=i.y/2,fe.z=0,Wt.copy(fe),$t.multiplyMatrices(e.matrixWorldInverse,r);for(let u=0,f=h;u<f;u++){if(V.fromBufferAttribute(s,u),q.fromBufferAttribute(d,u),V.w=1,q.w=1,V.applyMatrix4($t),q.applyMatrix4($t),V.z>l&&q.z>l)continue;if(V.z>l){const M=V.z-q.z,C=(V.z-l)/M;V.lerp(q,C)}else if(q.z>l){const M=q.z-V.z,C=(q.z-l)/M;q.lerp(V,C)}V.applyMatrix4(a),q.applyMatrix4(a),V.multiplyScalar(1/V.w),q.multiplyScalar(1/q.w),V.x*=i.x/2,V.y*=i.y/2,q.x*=i.x/2,q.y*=i.y/2,X.start.copy(V),X.start.z=0,X.end.copy(q),X.end.z=0;const m=X.closestPointToPointParameter(Wt,!0);X.at(m,Go);const b=It.lerp(V.z,q.z,m),_=b>=-1&&b<=1,x=Wt.distanceTo(Go)<Be*.5;if(_&&x){X.start.fromBufferAttribute(s,u),X.end.fromBufferAttribute(d,u),X.start.applyMatrix4(r),X.end.applyMatrix4(r);const M=new O,C=new O;_e.distanceSqToSegment(X.start,X.end,C,M),o.push({point:C,pointOnLine:M,distance:_e.origin.distanceTo(C),object:t,face:null,faceIndex:u,uv:null,uv1:null})}}}class J extends ae{constructor(e=new st,o=new ue({color:Math.random()*16777215})){super(e,o),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,o=e.attributes.instanceStart,a=e.attributes.instanceEnd,n=new Float32Array(2*o.count);for(let r=0,c=0,s=o.count;r<s;r++,c+=2)No.fromBufferAttribute(o,r),Uo.fromBufferAttribute(a,r),n[c]=c===0?0:n[c-1],n[c+1]=n[c]+No.distanceTo(Uo);const i=new Kt(n,2,1);return e.setAttribute("instanceDistanceStart",new ze(i,1,0)),e.setAttribute("instanceDistanceEnd",new ze(i,1,1)),this}raycast(e,o){const a=this.material.worldUnits,n=e.camera;n===null&&!a&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const i=e.params.Line2!==void 0&&e.params.Line2.threshold||0;_e=e.ray;const r=this.matrixWorld,c=this.geometry,s=this.material;Be=s.linewidth+i,c.boundingSphere===null&&c.computeBoundingSphere(),ht.copy(c.boundingSphere).applyMatrix4(r);let d;if(a)d=Be*.5;else{const l=Math.max(n.near,ht.distanceToPoint(_e.origin));d=Ho(n,l,s.resolution)}if(ht.radius+=d,_e.intersectsSphere(ht)===!1)return;c.boundingBox===null&&c.computeBoundingBox(),ut.copy(c.boundingBox).applyMatrix4(r);let h;if(a)h=Be*.5;else{const l=Math.max(n.near,ut.distanceToPoint(_e.origin));h=Ho(n,l,s.resolution)}ut.expandByScalar(h),_e.intersectsBox(ut)!==!1&&(a?ui(this,o):hi(this,n,o))}onBeforeRender(e){const o=this.material.uniforms;o&&o.resolution&&(e.getViewport(zt),this.material.uniforms.resolution.value.set(zt.z,zt.w))}}const fi=40,mi=70,Ie=1,G=new WeakMap;let Ra=null;function pi(){return Ra}function Ia(t){Ra=t}function Qt(t,e,o=1.03){const a=(90-t)*(Math.PI/180),n=(e+180)*(Math.PI/180);return new O(-o*Math.sin(a)*Math.cos(n),o*Math.cos(a),o*Math.sin(a)*Math.sin(n))}let ft=null,zo=0;function Ne(t=!1){const e=Date.now();if(!t&&ft&&e-zo<500)return ft;const o=getComputedStyle(document.documentElement);return ft={neonCyan:o.getPropertyValue("--neon-cyan").trim(),neonGreen:o.getPropertyValue("--neon-green").trim(),neonWarn:o.getPropertyValue("--neon-warn").trim(),neonAlert:o.getPropertyValue("--neon-alert").trim(),neonSelect:o.getPropertyValue("--neon-select").trim()||"#00ffff"},zo=e,ft}function Fe(t,e){return t<=fi?e.neonGreen:t<=mi?e.neonWarn:e.neonAlert}function tt(t,e,o,a){return[(e+180)/360*o,(90-t)/180*a]}const gi={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.5},scanlineOpacity:{value:.035},aberrationAmt:{value:.0022}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `};function vi(t){return t}function yi(t){if(t==null)return vi;var e,o,a=t.scale[0],n=t.scale[1],i=t.translate[0],r=t.translate[1];return function(c,s){s||(e=o=0);var d=2,h=c.length,l=new Array(h);for(l[0]=(e+=c[0])*a+i,l[1]=(o+=c[1])*n+r;d<h;)l[d]=c[d],++d;return l}}function bi(t,e){for(var o,a=t.length,n=a-e;n<--a;)o=t[n],t[n++]=t[a],t[a]=o}function _i(t,e){return typeof e=="string"&&(e=t.objects[e]),e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(o){return Wo(t,o)})}:Wo(t,e)}function Wo(t,e){var o=e.id,a=e.bbox,n=e.properties==null?{}:e.properties,i=Pa(t,e);return o==null&&a==null?{type:"Feature",properties:n,geometry:i}:a==null?{type:"Feature",id:o,properties:n,geometry:i}:{type:"Feature",id:o,bbox:a,properties:n,geometry:i}}function Pa(t,e){var o=yi(t.transform),a=t.arcs;function n(h,l){l.length&&l.pop();for(var u=a[h<0?~h:h],f=0,g=u.length;f<g;++f)l.push(o(u[f],f));h<0&&bi(l,g)}function i(h){return o(h)}function r(h){for(var l=[],u=0,f=h.length;u<f;++u)n(h[u],l);return l.length<2&&l.push(l[0]),l}function c(h){for(var l=r(h);l.length<4;)l.push(l[0]);return l}function s(h){return h.map(c)}function d(h){var l=h.type,u;switch(l){case"GeometryCollection":return{type:l,geometries:h.geometries.map(d)};case"Point":u=i(h.coordinates);break;case"MultiPoint":u=h.coordinates.map(i);break;case"LineString":u=r(h.arcs);break;case"MultiLineString":u=h.arcs.map(r);break;case"Polygon":u=s(h.arcs);break;case"MultiPolygon":u=h.arcs.map(s);break;default:return null}return{type:l,coordinates:u}}return d(e)}function wi(t,e){var o={},a={},n={},i=[],r=-1;e.forEach(function(d,h){var l=t.arcs[d<0?~d:d],u;l.length<3&&!l[1][0]&&!l[1][1]&&(u=e[++r],e[r]=d,e[h]=u)}),e.forEach(function(d){var h=c(d),l=h[0],u=h[1],f,g;if(f=n[l])if(delete n[f.end],f.push(d),f.end=u,g=a[u]){delete a[g.start];var m=g===f?f:f.concat(g);a[m.start=f.start]=n[m.end=g.end]=m}else a[f.start]=n[f.end]=f;else if(f=a[u])if(delete a[f.start],f.unshift(d),f.start=l,g=n[l]){delete n[g.end];var b=g===f?f:g.concat(f);a[b.start=g.start]=n[b.end=f.end]=b}else a[f.start]=n[f.end]=f;else f=[d],a[f.start=l]=n[f.end=u]=f});function c(d){var h=t.arcs[d<0?~d:d],l=h[0],u;return t.transform?(u=[0,0],h.forEach(function(f){u[0]+=f[0],u[1]+=f[1]})):u=h[h.length-1],d<0?[u,l]:[l,u]}function s(d,h){for(var l in d){var u=d[l];delete h[u.start],delete u.start,delete u.end,u.forEach(function(f){o[f<0?~f:f]=1}),i.push(u)}}return s(n,a),s(a,n),e.forEach(function(d){o[d<0?~d:d]||i.push([d])}),i}function $o(t){return Pa(t,Si.apply(this,arguments))}function Si(t,e,o){var a,n,i;if(arguments.length>1)a=xi(t,e,o);else for(n=0,a=new Array(i=t.arcs.length);n<i;++n)a[n]=n;return{type:"MultiLineString",arcs:wi(t,a)}}function xi(t,e,o){var a=[],n=[],i;function r(l){var u=l<0?~l:l;(n[u]||(n[u]=[])).push({i:l,g:i})}function c(l){l.forEach(r)}function s(l){l.forEach(c)}function d(l){l.forEach(s)}function h(l){switch(i=l,l.type){case"GeometryCollection":l.geometries.forEach(h);break;case"LineString":c(l.arcs);break;case"MultiLineString":case"Polygon":s(l.arcs);break;case"MultiPolygon":d(l.arcs);break}}return h(e),n.forEach(o==null?function(l){a.push(l[0].i)}:function(l){o(l[0].g,l[l.length-1].g)&&a.push(l[0].i)}),a}function Ze(t,e){const o=[];for(const n of t)for(let i=0;i<n.length-1;i++){const[r,c]=n[i],[s,d]=n[i+1],h=Qt(c,r,e),l=Qt(d,s,e);o.push(h.x,h.y,h.z,l.x,l.y,l.z)}const a=new st;return a.setPositions(new Float32Array(o)),a}async function Ei(t){const e=G.get(t);if(!e)return;let o;try{const C=await fetch("/data/countries-110m.json",{signal:e.abortController.signal});if(!C.ok)throw new Error(`HTTP ${C.status}`);o=await C.json(),Ia(o)}catch(C){if(C.name==="AbortError")return;console.warn("[s9-threatmap] geo lines: failed to load /data/countries-110m.json",C);return}const a=G.get(t);if(!a)return;const n=t.clientWidth||800,i=t.clientHeight||600,r=new so,c=a.cyanColor,s=$o(o,o.objects.land),d=new ue({color:c,linewidth:1,transparent:!0,opacity:1,depthWrite:!0});d.resolution.set(n,i);const h=new ue({color:c,linewidth:1,transparent:!0,opacity:1,blending:$,depthWrite:!0});h.resolution.set(n,i);const l=new ue({color:c,linewidth:1.5,transparent:!0,opacity:.7,blending:$,depthWrite:!1});l.resolution.set(n,i);const u=new J(Ze(s.coordinates,1.002),d),f=new J(Ze(s.coordinates,1.006),h),g=new J(Ze(s.coordinates,1.011),l);u.userData.geoType=f.userData.geoType=g.userData.geoType="coast",r.add(g,f,u);const m=$o(o,o.objects.countries,(C,A)=>C!==A),b=new ue({color:c,linewidth:1,transparent:!0,opacity:.55,depthWrite:!0});b.resolution.set(n,i);const _=new ue({color:c,linewidth:1,transparent:!0,opacity:.3,blending:$,depthWrite:!1});_.resolution.set(n,i);const x=new J(Ze(m.coordinates,1.012),b),M=new J(Ze(m.coordinates,1.022),_);x.userData.geoType=M.userData.geoType="border",r.add(M,x),a.scene.add(r),a.satelliteMode&&(r.visible=!1),a.geoGroup=r,a.geoLineMats=[d,h,l,b,_]}const Y={NODE_FLASH_DUR:80,NODE_SETTLE_DUR:140,NODE_SCALE_PEAK:1.9,NODE_SCALE_DUR:220,NODE_SCALE_RISE:.35,CROSSHAIR_IN_DELAY:40,LABEL_CHAR_RATE:38,LABEL_CURSOR_BLINK:530,LABEL_START_DELAY:250,COORD_SCRAMBLE_DUR:320,COORD_SCRAMBLE_DELAY:80,DESELECT_LABEL_DUR:100,DESELECT_CROSSHAIR_DELAY:80,DESELECT_NODE_DELAY:120,DESELECT_NODE_DUR:180,NODE_DESELECT_SCALE_TROUGH:.65};function jo(t){return 1-Math.pow(1-t,3)}function Vo(t){return t*t*t}function qo(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}function Mi(t){const e=G.get(t);if(!e)return;e.nodeTween&&e.nodeTween.mesh.scale.setScalar(1),e.deselectTween&&e.deselectTween.mesh.scale.setScalar(1),e.nodeTween=null,e.deselectTween=null,e.tweenGeneration++;for(const a of e.pendingTimers)clearTimeout(a);e.pendingTimers=[],e.labelTypewriter&&(e.labelTypewriter.cancel(),e.labelTypewriter=null),e.coordScrambleLat&&(e.coordScrambleLat.cancel(),e.coordScrambleLat=null),e.coordScrambleLng&&(e.coordScrambleLng.cancel(),e.coordScrambleLng=null);const o=t.querySelector(".s9-threatmap__crosshair");o&&(o.classList.remove("s9-threatmap__crosshair--animating-in","s9-threatmap__crosshair--animating-out"),o.offsetWidth)}function Ai(t,e,o,a,n){if(e.length===0)return t.textContent="",{cancel:()=>{}};let i=0,r=!0,c=null,s=null,d=!1;function h(){d=!0,clearTimeout(s),clearInterval(c)}function l(){t.textContent=e.slice(0,i)+(r?"_":" ")}l(),c=setInterval(()=>{d||(r=!r,l())},a);function u(){d||(i++,l(),i<e.length?s=setTimeout(u,o):s=setTimeout(()=>{d||(clearInterval(c),t.textContent=e)},a))}return s=setTimeout(u,o),{cancel:h}}function Yo(t,e,o,a,n,i){const r=Date.now(),c=Math.abs(o),s=Math.max(1,Math.floor(Math.log10(c||1))+1);let d=null,h=!1;function l(){h=!0,clearTimeout(d)}function u(){if(h)return;if(Date.now()-r>=n){t.textContent=`${e}${o.toFixed(a)}°`;return}const g=(Math.random()*Math.pow(10,s)).toFixed(a),m=o<0?"-":"";t.textContent=`${e}${m}${g}°`,d=setTimeout(u,40)}return u(),{cancel:l}}function Ve(t,e){const o=G.get(t);if(!o)return;Mi(t);const a=Ne(),n=o.activeNodeId;if(n!==null){o.activeNodeId=null,t.removeAttribute("data-active-node"),t.dispatchEvent(new CustomEvent("s9:threatmap-node-deselect",{bubbles:!0,detail:{nodeId:n}}));const l=o.nodeMap.get(n);if(e===null){if(l){l.mesh.material.color.set(a.neonSelect||"#00ffff");const b=new B(a.neonSelect||"#00ffff"),_=new B(Fe(l.level,a)),x=t.querySelector(".s9-threatmap__crosshair-label");x&&x.classList.add("s9-threatmap__crosshair-label--fading");const M=setTimeout(()=>{x&&(x.textContent="",x.classList.remove("s9-threatmap__crosshair-label--fading"))},Y.DESELECT_LABEL_DUR);o.pendingTimers.push(M);const C=setTimeout(()=>{const w=t.querySelector(".s9-threatmap__crosshair");w&&(w.classList.remove("s9-threatmap__crosshair--animating-in","s9-threatmap__crosshair--visible"),w.offsetWidth,w.classList.add("s9-threatmap__crosshair--animating-out"))},Y.DESELECT_CROSSHAIR_DELAY);o.pendingTimers.push(C);const A=setTimeout(()=>{o.deselectTween={generation:o.tweenGeneration,t0:Date.now(),dur:Y.DESELECT_NODE_DUR,troughScale:Y.NODE_DESELECT_SCALE_TROUGH,selectColor:b,levelColor:_,mesh:l.mesh,element:t}},Y.DESELECT_NODE_DELAY);o.pendingTimers.push(A)}else{const b=t.querySelector(".s9-threatmap__crosshair");b&&b.classList.remove("s9-threatmap__crosshair--visible");const _=t.querySelector(".s9-threatmap__crosshair-label");_&&(_.textContent="")}const g=t.querySelector(".s9-threatmap__coords-lat"),m=t.querySelector(".s9-threatmap__coords-lng");g&&(g.textContent="LAT: --.-°"),m&&(m.textContent="LNG: --.-°");return}l&&(l.mesh.scale.setScalar(1),l.mesh.material.color.set(Fe(l.level,a)));const u=t.querySelector(".s9-threatmap__crosshair");u&&u.classList.remove("s9-threatmap__crosshair--visible");const f=t.querySelector(".s9-threatmap__crosshair-label");f&&(f.textContent="")}if(e===null)return;const i=o.nodeMap.get(e);if(!i)return;if(o.activeNodeId=e,t.setAttribute("data-active-node",e),t.dispatchEvent(new CustomEvent("s9:threatmap-node-select",{bubbles:!0,detail:{nodeId:e,label:i.label,lat:i.lat,lng:i.lng,level:i.level}})),o.reducedMotion){i.mesh.material.color.set(a.neonSelect||"#00ffff"),i.mesh.scale.setScalar(1);const l=t.querySelector(".s9-threatmap__crosshair");l&&l.classList.add("s9-threatmap__crosshair--visible");const u=t.querySelector(".s9-threatmap__crosshair-label");u&&(u.textContent=i.label);const f=t.querySelector(".s9-threatmap__coords-lat"),g=t.querySelector(".s9-threatmap__coords-lng");f&&(f.textContent=`LAT: ${i.lat.toFixed(2)}°`),g&&(g.textContent=`LNG: ${i.lng.toFixed(2)}°`);return}const r=new B("#ffffff"),c=new B(a.neonSelect||"#00ffff");i.mesh.material.color.copy(r),i.mesh.scale.setScalar(1),o.nodeTween={generation:o.tweenGeneration,t0:Date.now(),dur:Y.NODE_SCALE_DUR,riseFrac:Y.NODE_SCALE_RISE,peakScale:Y.NODE_SCALE_PEAK,flashDur:Y.NODE_FLASH_DUR,settleDur:Y.NODE_SETTLE_DUR,flashColor:r,selectColor:c,mesh:i.mesh};const s=setTimeout(()=>{const l=t.querySelector(".s9-threatmap__crosshair");l&&l.classList.add("s9-threatmap__crosshair--visible","s9-threatmap__crosshair--animating-in")},Y.CROSSHAIR_IN_DELAY);o.pendingTimers.push(s);const d=setTimeout(()=>{const l=t.querySelector(".s9-threatmap__coords-lat"),u=t.querySelector(".s9-threatmap__coords-lng");l&&(o.coordScrambleLat=Yo(l,"LAT: ",i.lat,2,Y.COORD_SCRAMBLE_DUR)),u&&(o.coordScrambleLng=Yo(u,"LNG: ",i.lng,2,Y.COORD_SCRAMBLE_DUR))},Y.COORD_SCRAMBLE_DELAY);o.pendingTimers.push(d);const h=setTimeout(()=>{const l=t.querySelector(".s9-threatmap__crosshair-label");l&&(o.labelTypewriter=Ai(l,i.label,Y.LABEL_CHAR_RATE,Y.LABEL_CURSOR_BLINK))},Y.LABEL_START_DELAY);o.pendingTimers.push(h)}function vo(t,e){if(!G.get(t))return;const a=Math.max(0,Math.min(100,e));t.setAttribute("data-threat-level",a)}function yo(t,e,o){const a=G.get(t);if(!a)return;const n=a.nodeMap.get(e);if(!n)return;const i=n.level;if(n.level=o,n.mesh.userData.level=o,a.activeNodeId!==e){const r=Ne();n.mesh.material.color.set(Fe(o,r))}return i}function bo(t,e){const o=G.get(t);if(!o)return;const a=o.nodeMap.get(e);if(!a||Date.now()-o.lastOrbitInteraction<3e3)return;const n=o.camera.position.length();o.cameraLerpTarget=a.mesh.position.clone().normalize().multiplyScalar(n),o.controls.autoRotate=!1,o.resumeTimer!==null&&(clearTimeout(o.resumeTimer),o.resumeTimer=null)}const Ti=t=>t,Oa=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,Ba=t=>t>=1?1:1-Math.pow(2,-10*t),Ci=t=>{const o=2.5949095;return t<.5?Math.pow(2*t,2)*((o+1)*2*t-o)/2:(Math.pow(2*t-2,2)*((o+1)*(2*t-2)+o)+2)/2};function Ce({radius:t,numRings:e,samplesPerRing:o,latitudeMin:a,latitudeMax:n,upAxis:i,mode:r="latitude"}){const c=e*o,s=new Float32Array(c*6),d=new Float32Array(c),h=new Float32Array(c);let l=0,u=0;if(r==="longitude"){const g=Math.sin(a),m=Math.sin(n);for(let b=0;b<e;b++){const _=g+b/e*(m-g),x=Math.sqrt(Math.max(0,1-_*_));for(let M=0;M<o;M++){const C=M/o*2*Math.PI,A=(M+1)/o*2*Math.PI;s[l++]=t*_,s[l++]=t*x*Math.cos(C),s[l++]=t*x*Math.sin(C),s[l++]=t*_,s[l++]=t*x*Math.cos(A),s[l++]=t*x*Math.sin(A),d[u]=b,h[u]=M/o,u++}}}else{const g=Math.sin(a),m=Math.sin(n);for(let b=0;b<e;b++){const _=g+b/e*(m-g),x=Math.sqrt(Math.max(0,1-_*_));for(let M=0;M<o;M++){const C=M/o*2*Math.PI,A=(M+1)/o*2*Math.PI;s[l++]=t*x*Math.cos(C),s[l++]=t*_,s[l++]=t*x*Math.sin(C),s[l++]=t*x*Math.cos(A),s[l++]=t*_,s[l++]=t*x*Math.sin(A),d[u]=b,h[u]=M/o,u++}}}const f=new st;return f.setPositions(s),f.setAttribute("ringIndex",new we(d,1)),f.setAttribute("arcPosition",new we(h,1)),i==="z"&&f.applyMatrix4(new ya().makeRotationX(-Math.PI/2)),f}const Li=`
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
`;function Ii(t){return t==="north-to-south"?1:t==="equator-out"?2:0}function Pi({lineColor:t,lineColorB:e,opacity:o,emissiveIntensity:a,numRings:n,stagger:i,ringFade:r,invert:c,warpAmount:s,direction:d,colorSpread:h,brightSpread:l,flickerAmp:u,flickerSpeed:f,arcColorSpread:g,scrollSpeed:m,scrollAxis:b,gradientMode:_,jitter:x}){return{uProgress:{value:0},uNumRings:{value:n},uStagger:{value:i},uRingFade:{value:r},uInvert:{value:c??0},uOpacity:{value:o},uEmissiveIntensity:{value:a},uColor:{value:new B(t)},uColorB:{value:new B(e??t)},uDirection:{value:Ii(d)},uWarpAmount:{value:s},uColorSpread:{value:h},uBrightSpread:{value:l},uFlickerAmp:{value:u},uFlickerSpeed:{value:f},uTime:{value:0},uArcColorSpread:{value:g??0},uScrollSpeed:{value:m??0},uScrollAxis:{value:b??0},uGradientMode:{value:_??0},uJitter:{value:x??0}}}function Oi(t){t.vertexShader.includes("vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 )")||console.warn("[RingReveal] LineMaterial vertex shader injection point changed — warp may be misaligned. Check Three.js version."),t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
attribute float ringIndex;
attribute float arcPosition;
varying float vAlpha;
varying vec3  vRingColor;
varying float vFlickerMult;
${Li}
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
  gl_FragColor = vec4(vRingColor * uEmissiveIntensity * max(vFlickerMult, 0.0), vAlpha * uOpacity);`)}function Le(t){const{lineWidth:e,blending:o,resolution:a}=t,n=new ue({color:16777215,linewidth:e,transparent:!0,depthWrite:!1,blending:o,worldUnits:!1,resolution:a??new N(typeof window<"u"?window.innerWidth:1920,typeof window<"u"?window.innerHeight:1080)});return Object.assign(n.uniforms,Pi(t)),n.onBeforeCompile=i=>{Object.assign(i.uniforms,n.uniforms),Oi(i)},n}const mt=new B,pt=new B;function Qe(t){return t==="latitude"?1:0}const Bi={radius:1,numRings:48,samplesPerRing:256,latitudeMin:-Math.PI/2,latitudeMax:Math.PI/2,durationMs:1800,easingFn:Oa,direction:"south-to-north",stagger:.4,ringFade:.35,lineColor:65484,lineColorB:65484,lineWidth:1,opacity:.7,glowColor:65484,glowColorB:65484,glowOpacity:.25,glowRadius:1.008,glowLayers:3,glowLayerRadiusStep:.004,glowLayerOpacityFalloff:.5,emissiveIntensity:1.5,warpAmount:.12,morphDurationMs:800,upAxis:"y",mode:"latitude",scrollSpeed:0,colorSpread:0,brightSpread:0,flickerAmp:0,flickerSpeed:2,arcColorSpread:0,gradientMode:0,jitter:0,invert:!1};class Fi{constructor(e,o={}){this._scene=e,this._options={...Bi,...o},this._options.ringFade=Math.max(.001,this._options.ringFade),this._options.numRings=Math.max(2,this._options.numRings),this._options.samplesPerRing=Math.max(3,this._options.samplesPerRing),this._options.stagger=Math.max(0,Math.min(1,this._options.stagger)),this._options.radius=Math.max(Number.EPSILON,this._options.radius),this._options.glowRadius=Math.max(Number.EPSILON,this._options.glowRadius),this._options.glowLayers=Math.max(1,Math.round(this._options.glowLayers)),this._playing=!1,this._reversed=!1,this._elapsed=0,this._progress=0,this._onComplete=null,this._morph=null,this._time=0,this._resolution=new N(typeof window<"u"?window.innerWidth:1920,typeof window<"u"?window.innerHeight:1080),this._build()}get isPlaying(){return this._playing}get progress(){return this._progress}get baseRings(){return this._baseRings}get glowRings(){return this._glowLayers[0]}get glowLayers(){return this._glowLayers}play(e){this._reversed=!1,this._playing=!0,this._onComplete=e??null}reverse(e){this._reversed=!0,this._playing=!0,this._onComplete=e??null;const o=1-this._progress;let a=0,n=1;for(let i=0;i<24;i++){const r=(a+n)*.5;this._options.easingFn(r)<o?a=r:n=r}this._elapsed=a*this._options.durationMs}stop(){this._playing=!1}reset(){this._playing=!1,this._reversed=!1,this._elapsed=0,this._progress=0,this._onComplete=null,this._disposeCrossFade(),this._morph=null,this._setProgress(0)}tick(e){var a;this._time+=e/1e3,this._baseRings.material.uniforms.uTime.value=this._time,this._glowLayers.forEach(n=>{n.material.uniforms.uTime.value=this._time});const o=(a=this._morph)==null?void 0:a.crossFade;if(o&&(o.oldBase.material.uniforms.uTime.value=this._time,o.oldGlowLayers.forEach(n=>{n.material.uniforms.uTime.value=this._time})),this._playing){this._elapsed+=e;const n=Math.min(this._elapsed/this._options.durationMs,1),i=this._options.easingFn(n);if(this._progress=this._reversed?1-i:i,this._setProgress(this._progress),this._reversed?this._progress<=0:this._progress>=1){this._playing=!1;const c=this._onComplete;this._onComplete=null,c==null||c()}}if(this._morph){this._morph.elapsed+=e;const n=Math.min(this._morph.elapsed/this._morph.durationMs,1);this._applyMorphT(n),n>=1&&(this._morph=null)}}setColors(e,o){this._baseRings.material.uniforms.uColor.value.set(e),this._glowLayers.forEach(a=>a.material.uniforms.uColor.value.set(o)),this._options.lineColor=e,this._options.glowColor=o}setOpacity(e,o){this._baseRings.material.uniforms.uOpacity.value=e,this._options.opacity=e,o!==void 0&&(this._glowLayers.forEach((a,n)=>{a.material.uniforms.uOpacity.value=o*Math.pow(this._options.glowLayerOpacityFalloff,n)}),this._options.glowOpacity=o)}setScrollSpeed(e){this._options.scrollSpeed=e,this._allMaterials().forEach(o=>{o.uniforms.uScrollSpeed.value=e})}setGradientMode(e){this._options.gradientMode=e,this._allMaterials().forEach(o=>{o.uniforms.uGradientMode.value=e})}setJitter(e){this._options.jitter=e,this._allMaterials().forEach(o=>{o.uniforms.uJitter.value=e})}setInvert(e){this._options.invert=e,this._allMaterials().forEach(o=>{o.uniforms.uInvert.value=e?1:0})}setMode(e){if(e===this._options.mode)return;this._options.mode=e;const o=Qe(e);this._allMaterials().forEach(a=>{a.uniforms.uScrollAxis.value=o}),this._rebuildGeometry()}setResolution(e,o){this._resolution.set(e,o),this._allMaterials().forEach(a=>{var n;return(n=a.resolution)==null?void 0:n.set(e,o)})}morphTo(e,o){var b;const a=o??this._options.morphDurationMs,n=this._options,i=this._baseRings.material,r=this._glowLayers[0].material;e.durationMs!==void 0&&(n.durationMs=e.durationMs),e.easingFn!==void 0&&(n.easingFn=e.easingFn),e.direction!==void 0&&(n.direction=e.direction),e.morphDurationMs!==void 0&&(n.morphDurationMs=e.morphDurationMs),e.upAxis!==void 0&&(n.upAxis=e.upAxis),e.latitudeMin!==void 0&&(n.latitudeMin=e.latitudeMin),e.latitudeMax!==void 0&&(n.latitudeMax=e.latitudeMax),e.scrollSpeed!==void 0&&this.setScrollSpeed(e.scrollSpeed),e.mode!==void 0&&e.mode!==n.mode&&(n.mode=e.mode),e.lineWidth!==void 0&&(n.lineWidth=e.lineWidth,this._allMaterials().forEach(_=>{_.linewidth=e.lineWidth})),e.glowLayerOpacityFalloff!==void 0&&e.glowLayerOpacityFalloff!==n.glowLayerOpacityFalloff&&(n.glowLayerOpacityFalloff=e.glowLayerOpacityFalloff,this._glowLayers.forEach((_,x)=>{_.material.uniforms.uOpacity.value=n.glowOpacity*Math.pow(n.glowLayerOpacityFalloff,x)}));const c=e.glowLayers!==void 0&&e.glowLayers!==n.glowLayers,s=e.glowLayerRadiusStep!==void 0&&e.glowLayerRadiusStep!==n.glowLayerRadiusStep;c&&(n.glowLayers=Math.max(1,Math.round(e.glowLayers))),s&&(n.glowLayerRadiusStep=e.glowLayerRadiusStep),(c||s)&&this._rebuildGlowLayers();const d=n.radius,h=e.radius??n.radius,l=e.numRings!==void 0&&e.numRings!==n.numRings,u=e.samplesPerRing!==void 0&&e.samplesPerRing!==n.samplesPerRing,f=e.mode!==void 0&&e.mode!==n.mode;let g=null;if(l||u||f){const _=this._baseRings,x=this._glowLayers.slice(),M=i.uniforms.uOpacity.value,C=x.map(y=>y.material.uniforms.uOpacity.value);l&&(n.numRings=e.numRings),u&&(n.samplesPerRing=e.samplesPerRing),f&&(n.mode=e.mode);const A={radius:n.radius,numRings:n.numRings,samplesPerRing:n.samplesPerRing,latitudeMin:n.latitudeMin,latitudeMax:n.latitudeMax,upAxis:n.upAxis,mode:n.mode},w={lineWidth:n.lineWidth,numRings:n.numRings,stagger:i.uniforms.uStagger.value,ringFade:i.uniforms.uRingFade.value,warpAmount:i.uniforms.uWarpAmount.value,emissiveIntensity:i.uniforms.uEmissiveIntensity.value,direction:n.direction,colorSpread:i.uniforms.uColorSpread.value,brightSpread:i.uniforms.uBrightSpread.value,flickerAmp:i.uniforms.uFlickerAmp.value,flickerSpeed:i.uniforms.uFlickerSpeed.value,arcColorSpread:i.uniforms.uArcColorSpread.value,scrollSpeed:n.scrollSpeed,scrollAxis:Qe(n.mode),gradientMode:n.gradientMode,jitter:n.jitter,invert:n.invert?1:0,resolution:this._resolution},v=Le({...w,lineColor:i.uniforms.uColor.value.getHex(),lineColorB:i.uniforms.uColorB.value.getHex(),opacity:0,blending:xt});this._baseRings=new J(Ce(A),v),this._baseRings.renderOrder=_.renderOrder,this._scene.add(this._baseRings),this._glowLayers=[];for(let y=0;y<n.glowLayers;y++){const S=n.radius*n.glowRadius*(1+y*n.glowLayerRadiusStep),p=Le({...w,lineColor:r.uniforms.uColor.value.getHex(),lineColorB:r.uniforms.uColorB.value.getHex(),opacity:0,blending:$}),T=new J(Ce({...A,radius:S}),p);T.renderOrder=((b=x[0])==null?void 0:b.renderOrder)??0,this._scene.add(T),this._glowLayers.push(T)}this._setProgress(this._progress),this._baseRings.material.uniforms.uTime.value=this._time,this._glowLayers.forEach(y=>{y.material.uniforms.uTime.value=this._time}),g={oldBase:_,oldGlowLayers:x,oldBaseOpacity:M,oldGlowLayerOpacities:C}}const m=this._glowLayers[0].material;this._morph={elapsed:0,durationMs:Math.max(a,0),crossFade:g,from:{lineColor:i.uniforms.uColor.value.clone(),lineColorB:i.uniforms.uColorB.value.clone(),glowColor:r.uniforms.uColor.value.clone(),glowColorB:r.uniforms.uColorB.value.clone(),opacity:g?0:i.uniforms.uOpacity.value,glowOpacity:g?0:r.uniforms.uOpacity.value,emissiveIntensity:i.uniforms.uEmissiveIntensity.value,stagger:i.uniforms.uStagger.value,warpAmount:i.uniforms.uWarpAmount.value,ringFade:i.uniforms.uRingFade.value,colorSpread:i.uniforms.uColorSpread.value,brightSpread:i.uniforms.uBrightSpread.value,flickerAmp:i.uniforms.uFlickerAmp.value,flickerSpeed:i.uniforms.uFlickerSpeed.value,arcColorSpread:i.uniforms.uArcColorSpread.value,jitter:i.uniforms.uJitter.value,radius:d},to:{lineColor:e.lineColor!==void 0?new B(e.lineColor):i.uniforms.uColor.value.clone(),lineColorB:e.lineColorB!==void 0?new B(e.lineColorB):i.uniforms.uColorB.value.clone(),glowColor:e.glowColor!==void 0?new B(e.glowColor):m.uniforms.uColor.value.clone(),glowColorB:e.glowColorB!==void 0?new B(e.glowColorB):m.uniforms.uColorB.value.clone(),opacity:e.opacity??i.uniforms.uOpacity.value,glowOpacity:e.glowOpacity??m.uniforms.uOpacity.value,emissiveIntensity:e.emissiveIntensity??i.uniforms.uEmissiveIntensity.value,stagger:e.stagger??i.uniforms.uStagger.value,warpAmount:e.warpAmount??i.uniforms.uWarpAmount.value,ringFade:e.ringFade??i.uniforms.uRingFade.value,colorSpread:e.colorSpread??i.uniforms.uColorSpread.value,brightSpread:e.brightSpread??i.uniforms.uBrightSpread.value,flickerAmp:e.flickerAmp??i.uniforms.uFlickerAmp.value,flickerSpeed:e.flickerSpeed??i.uniforms.uFlickerSpeed.value,arcColorSpread:e.arcColorSpread??i.uniforms.uArcColorSpread.value,jitter:e.jitter??i.uniforms.uJitter.value,radius:h}},a<=0&&(this._applyMorphT(1),this._morph=null)}dispose(){this._disposeCrossFade(),this._scene.remove(this._baseRings),this._baseRings.geometry.dispose(),this._baseRings.material.dispose(),this._glowLayers.forEach(e=>{this._scene.remove(e),e.geometry.dispose(),e.material.dispose()})}_allMaterials(){return[this._baseRings.material,...this._glowLayers.map(e=>e.material)]}_disposeCrossFade(){var o;const e=(o=this._morph)==null?void 0:o.crossFade;e&&(this._scene.remove(e.oldBase),e.oldBase.geometry.dispose(),e.oldBase.material.dispose(),e.oldGlowLayers.forEach(a=>{this._scene.remove(a),a.geometry.dispose(),a.material.dispose()}))}_build(){const e=this._options,o={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},a={lineWidth:e.lineWidth,emissiveIntensity:e.emissiveIntensity,numRings:e.numRings,stagger:e.stagger,ringFade:e.ringFade,warpAmount:e.warpAmount,direction:e.direction,colorSpread:e.colorSpread,brightSpread:e.brightSpread,flickerAmp:e.flickerAmp,flickerSpeed:e.flickerSpeed,arcColorSpread:e.arcColorSpread,scrollSpeed:e.scrollSpeed,scrollAxis:Qe(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,invert:e.invert?1:0,resolution:this._resolution},n=Le({...a,lineColor:e.lineColor,lineColorB:e.lineColorB,opacity:e.opacity,blending:xt});this._baseRings=new J(Ce(o),n),this._scene.add(this._baseRings),this._glowLayers=[];for(let i=0;i<e.glowLayers;i++){const r=e.radius*e.glowRadius*(1+i*e.glowLayerRadiusStep),c=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,i),s=Le({...a,lineColor:e.glowColor,lineColorB:e.glowColorB,opacity:c,blending:$}),d=new J(Ce({...o,radius:r}),s);this._scene.add(d),this._glowLayers.push(d)}}_rebuildGlowLayers(){var d,h;const e=this._options,o=(d=this._glowLayers[0])==null?void 0:d.material,a=o?o.uniforms.uColor.value.getHex():e.glowColor,n=o?o.uniforms.uColorB.value.getHex():e.glowColorB,i=((h=this._glowLayers[0])==null?void 0:h.renderOrder)??0;this._glowLayers.forEach(l=>{this._scene.remove(l),l.geometry.dispose(),l.material.dispose()});const r=this._baseRings.material,c={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},s={lineWidth:e.lineWidth,numRings:e.numRings,stagger:r.uniforms.uStagger.value,ringFade:r.uniforms.uRingFade.value,warpAmount:r.uniforms.uWarpAmount.value,emissiveIntensity:r.uniforms.uEmissiveIntensity.value,direction:e.direction,colorSpread:r.uniforms.uColorSpread.value,brightSpread:r.uniforms.uBrightSpread.value,flickerAmp:r.uniforms.uFlickerAmp.value,flickerSpeed:r.uniforms.uFlickerSpeed.value,scrollSpeed:e.scrollSpeed,scrollAxis:Qe(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,resolution:this._resolution};this._glowLayers=[];for(let l=0;l<e.glowLayers;l++){const u=e.radius*e.glowRadius*(1+l*e.glowLayerRadiusStep),f=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,l),g=Le({...s,lineColor:a,lineColorB:n,opacity:f,blending:$}),m=new J(Ce({...c,radius:u}),g);m.renderOrder=i,m.material.uniforms.uProgress.value=this._progress,m.material.uniforms.uTime.value=this._time,this._scene.add(m),this._glowLayers.push(m)}}_rebuildGeometry(){var d,h,l;const e=this._options,o=this._baseRings,a=this._glowLayers.slice(),n=o.material,i={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},r={lineWidth:e.lineWidth,numRings:e.numRings,stagger:n.uniforms.uStagger.value,ringFade:n.uniforms.uRingFade.value,warpAmount:n.uniforms.uWarpAmount.value,emissiveIntensity:n.uniforms.uEmissiveIntensity.value,direction:e.direction,colorSpread:n.uniforms.uColorSpread.value,brightSpread:n.uniforms.uBrightSpread.value,flickerAmp:n.uniforms.uFlickerAmp.value,flickerSpeed:n.uniforms.uFlickerSpeed.value,arcColorSpread:((d=n.uniforms.uArcColorSpread)==null?void 0:d.value)??0,scrollSpeed:e.scrollSpeed,scrollAxis:Qe(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,resolution:this._resolution},c=Le({...r,lineColor:n.uniforms.uColor.value.getHex(),lineColorB:n.uniforms.uColorB.value.getHex(),opacity:n.uniforms.uOpacity.value,blending:xt});this._baseRings=new J(Ce(i),c),this._baseRings.renderOrder=o.renderOrder,this._baseRings.material.uniforms.uProgress.value=this._progress,this._baseRings.material.uniforms.uTime.value=this._time,this._scene.add(this._baseRings);const s=(h=a[0])==null?void 0:h.material;this._glowLayers=[];for(let u=0;u<e.glowLayers;u++){const f=e.radius*e.glowRadius*(1+u*e.glowLayerRadiusStep),g=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,u),m=Le({...r,lineColor:(s==null?void 0:s.uniforms.uColor.value.getHex())??e.glowColor,lineColorB:(s==null?void 0:s.uniforms.uColorB.value.getHex())??e.glowColorB,opacity:g,blending:$}),b=new J(Ce({...i,radius:f}),m);b.renderOrder=((l=a[0])==null?void 0:l.renderOrder)??0,b.material.uniforms.uProgress.value=this._progress,b.material.uniforms.uTime.value=this._time,this._scene.add(b),this._glowLayers.push(b)}this._scene.remove(o),o.geometry.dispose(),o.material.dispose(),a.forEach(u=>{this._scene.remove(u),u.geometry.dispose(),u.material.dispose()})}_setProgress(e){this._baseRings.material.uniforms.uProgress.value=e,this._glowLayers.forEach(o=>{o.material.uniforms.uProgress.value=e})}_applyMorphT(e){const{from:o,to:a}=this._morph,n=this._baseRings.material,i=(d,h)=>d+(h-d)*e;mt.lerpColors(o.lineColor,a.lineColor,e),n.uniforms.uColor.value.copy(mt),pt.lerpColors(o.lineColorB,a.lineColorB,e),n.uniforms.uColorB.value.copy(pt),n.uniforms.uOpacity.value=i(o.opacity,a.opacity),n.uniforms.uEmissiveIntensity.value=i(o.emissiveIntensity,a.emissiveIntensity),n.uniforms.uStagger.value=i(o.stagger,a.stagger),n.uniforms.uWarpAmount.value=i(o.warpAmount,a.warpAmount),n.uniforms.uRingFade.value=i(o.ringFade,a.ringFade),n.uniforms.uColorSpread.value=i(o.colorSpread,a.colorSpread),n.uniforms.uBrightSpread.value=i(o.brightSpread,a.brightSpread),n.uniforms.uFlickerAmp.value=i(o.flickerAmp,a.flickerAmp),n.uniforms.uFlickerSpeed.value=i(o.flickerSpeed,a.flickerSpeed),n.uniforms.uArcColorSpread.value=i(o.arcColorSpread,a.arcColorSpread),n.uniforms.uJitter.value=i(o.jitter,a.jitter),mt.lerpColors(o.glowColor,a.glowColor,e),pt.lerpColors(o.glowColorB,a.glowColorB,e);const r=i(o.glowOpacity,a.glowOpacity),c=this._options.glowLayerOpacityFalloff;this._glowLayers.forEach((d,h)=>{const l=d.material;l.uniforms.uColor.value.copy(mt),l.uniforms.uColorB.value.copy(pt),l.uniforms.uOpacity.value=r*Math.pow(c,h),l.uniforms.uEmissiveIntensity.value=i(o.emissiveIntensity,a.emissiveIntensity),l.uniforms.uStagger.value=i(o.stagger,a.stagger),l.uniforms.uWarpAmount.value=i(o.warpAmount,a.warpAmount),l.uniforms.uRingFade.value=i(o.ringFade,a.ringFade),l.uniforms.uColorSpread.value=i(o.colorSpread,a.colorSpread),l.uniforms.uBrightSpread.value=i(o.brightSpread,a.brightSpread),l.uniforms.uFlickerAmp.value=i(o.flickerAmp,a.flickerAmp),l.uniforms.uFlickerSpeed.value=i(o.flickerSpeed,a.flickerSpeed),l.uniforms.uArcColorSpread.value=i(o.arcColorSpread,a.arcColorSpread),l.uniforms.uJitter.value=i(o.jitter,a.jitter)});const s=i(o.radius,a.radius)/this._options.radius;if(this._baseRings.scale.setScalar(s),this._glowLayers.forEach(d=>d.scale.setScalar(s)),this._morph.crossFade){const{oldBase:d,oldGlowLayers:h,oldBaseOpacity:l,oldGlowLayerOpacities:u}=this._morph.crossFade;d.material.uniforms.uOpacity.value=l*(1-e),d.material.uniforms.uProgress.value=this._progress,h.forEach((f,g)=>{f.material.uniforms.uOpacity.value=u[g]*(1-e),f.material.uniforms.uProgress.value=this._progress}),e>=1&&(this._scene.remove(d),d.geometry.dispose(),d.material.dispose(),h.forEach(f=>{this._scene.remove(f),f.geometry.dispose(),f.material.dispose()}))}if(e>=1){const d=this._options;d.opacity=a.opacity,d.glowOpacity=a.glowOpacity,d.emissiveIntensity=a.emissiveIntensity,d.stagger=a.stagger,d.warpAmount=a.warpAmount,d.ringFade=a.ringFade,d.colorSpread=a.colorSpread,d.brightSpread=a.brightSpread,d.flickerAmp=a.flickerAmp,d.flickerSpeed=a.flickerSpeed,d.arcColorSpread=a.arcColorSpread,d.jitter=a.jitter,d.lineColor=a.lineColor.getHex(),d.lineColorB=a.lineColorB.getHex(),d.glowColor=a.glowColor.getHex(),d.glowColorB=a.glowColorB.getHex(),d.radius=a.radius}}}function ki(t){return t==="bracket"?`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-bracket" aria-hidden="true">
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tr"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--bl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--br"></span>
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`:t==="diamond"?`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-diamond" aria-hidden="true">
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`:`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-box" aria-hidden="true">
    <span class="s9-threatmap__crosshair-label"></span>
  </div>`}function Fa(t,{autoRotate:e=!0,bloomStrength:o=1.7,crosshairShape:a="box"}={}){const n=new AbortController,{signal:i}=n,r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,c=Ne(),s=new ro({antialias:!0,alpha:!0});s.setPixelRatio(window.devicePixelRatio),s.setSize(t.clientWidth||800,t.clientHeight||600),s.domElement.classList.add("s9-threatmap__canvas"),t.appendChild(s.domElement);const d=new lo,h=new ba(45,(t.clientWidth||800)/(t.clientHeight||600),.1,100);h.position.set(0,0,3);const l=new Re(Ie,48,48),u=new Re(Ie*.98,48,48),f=new B(c.neonCyan||"#00d4b0"),g=new ga(l).getAttribute("position").array,m=new st;m.setPositions(g);const b=t.clientWidth||800,_=t.clientHeight||600,x=new ue({color:f,linewidth:1,transparent:!0,opacity:.014,depthTest:!0,depthWrite:!1});x.resolution.set(b,_);const M=new J(m,x);M.renderOrder=0,d.add(M);const C=new $e({colorWrite:!1,depthWrite:!0,depthTest:!0,depthFunc:Mn,side:En}),A=new ae(u,C);A.renderOrder=1,d.add(A);const w=new $e({colorWrite:!1,depthWrite:!0,depthTest:!0,side:Zt}),v=new ae(l,w);v.renderOrder=1,d.add(v);const y=new $e({color:new B("#010e0b"),transparent:!0,opacity:.72,depthTest:!0,depthWrite:!0,side:_a}),S=new ae(l,y);S.renderOrder=1,d.add(S);const p=new ue({color:f,linewidth:1,transparent:!0,opacity:.05,depthTest:!0,depthWrite:!1});p.resolution.set(b,_);const T=new J(m,p);T.renderOrder=2,d.add(T);const D=new ue({color:f,linewidth:1,transparent:!0,opacity:.03,blending:$,depthTest:!0,depthWrite:!1});D.resolution.set(b,_);const k=new J(m,D);k.renderOrder=3,d.add(k);const ie=new Re(Ie,48,48),Z=new te({uniforms:{uColor:{value:new O(f.r,f.g,f.b)}},vertexShader:`
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
    `,transparent:!0,blending:$,depthWrite:!1,side:Zt}),F=new ae(ie,Z);F.renderOrder=4,d.add(F);const P=new qn(h,s.domElement);P.enableDamping=!0,P.dampingFactor=.05,P.autoRotate=e&&!r,P.autoRotateSpeed=.4,P.enablePan=!1,P.minDistance=1.5,P.maxDistance=5,P.minPolarAngle=Math.PI/2-42.5*Math.PI/180,P.maxPolarAngle=Math.PI/2+42.5*Math.PI/180;const se=new po(s),re=new go(d,h);se.addPass(re);const le=new Te(new N(t.clientWidth||800,t.clientHeight||600),o*2,.4,.3);se.addPass(le);const Ye=new ve(gi);se.addPass(Ye);const Ue=document.createElement("div");Ue.className="s9-threatmap__overlay",Ue.innerHTML=`
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tr" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--bl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--br" aria-hidden="true"></div>
    ${ki(a)}
    <div class="s9-threatmap__coords" aria-live="polite">
      <span class="s9-threatmap__coords-lat">LAT: --.-°</span>
      <span class="s9-threatmap__coords-lng">LNG: --.-°</span>
    </div>
    <div class="s9-threatmap__node-count">NODES: 0</div>
  `,t.appendChild(Ue);let Xe=null;P.addEventListener("start",()=>{P.autoRotate=!1,Xe!==null&&(clearTimeout(Xe),Xe=null);const L=G.get(t);L&&(L.cameraLerpTarget=null,L.lastOrbitInteraction=Date.now())}),P.addEventListener("end",()=>{!r&&e&&(Xe=setTimeout(()=>{P.autoRotate=!0,Xe=null},6e3))});const So=new ResizeObserver(()=>{const L=t.clientWidth,Q=t.clientHeight;if(!L||!Q)return;h.aspect=L/Q,h.updateProjectionMatrix(),s.setSize(L,Q),se.setSize(L,Q),le.resolution.set(L,Q);const ce=G.get(t);if(ce){ce.globeBackMat.resolution.set(L,Q),ce.globeFrontMat.resolution.set(L,Q),ce.globeGlowMat.resolution.set(L,Q);for(const R of ce.geoLineMats)R.resolution.set(L,Q)}});So.observe(t);const xo=new An;s.domElement.addEventListener("click",L=>{const Q=G.get(t);if(!Q)return;const ce=s.domElement.getBoundingClientRect(),R=ce.width,W=ce.height,H=(L.clientX-ce.left)/R*2-1,ee=-((L.clientY-ce.top)/W)*2+1;xo.setFromCamera(new N(H,ee),h);const xe=Array.from(Q.nodeMap.values()).map(de=>de.mesh),he=xo.intersectObjects(xe,!1);if(he.length>0){const de=he[0].object;Ve(t,de.userData.nodeId)}else Q.activeNodeId!==null&&Ve(t,null)},{signal:i}),G.set(t,{animFrameId:null,renderer:s,composer:se,bloomPass:le,controls:P,scene:d,camera:h,resizeObserver:So,nodeMap:new Map,edgeMap:new Map,abortController:n,resumeTimer:null,reducedMotion:r,activeNodeId:null,colors:c,cyanColor:f,globeGeo:l,occluderGeo:u,globeBack:M,globeBackMat:x,occluder:A,frontOccluder:v,globeSurface:S,globeFront:T,globeFrontMat:p,globeGlow:k,globeGlowMat:D,rimGeo:ie,rimMesh:F,geoGroup:null,geoLineMats:[],cameraLerpTarget:null,lastOrbitInteraction:0,arcs:[],satelliteMode:!1,sunAngle:Math.random()*Math.PI*2,satelliteGroup:null,holoPass:Ye,nodeGeo:new Re(.02,8,8),nodeTween:null,deselectTween:null,labelTypewriter:null,coordScrambleLat:null,coordScrambleLng:null,pendingTimers:[],tweenGeneration:0,crosshairShape:a});const Eo=G.get(t);let Mo=performance.now();function Ao(){const L=G.get(t);if(!L)return;L.animFrameId=requestAnimationFrame(Ao);const Q=performance.now(),ce=Q-Mo;Mo=Q,L.revealAnim&&L.revealAnim.tick(ce),L.cameraLerpTarget&&Date.now()-L.lastOrbitInteraction>=3e3&&(L.camera.position.lerp(L.cameraLerpTarget,.06),L.camera.position.distanceTo(L.cameraLerpTarget)<.04&&(L.camera.position.copy(L.cameraLerpTarget),L.cameraLerpTarget=null)),L.controls.update();for(let R=L.arcs.length-1;R>=0;R--){const W=L.arcs[R],H=Math.min(1,(Date.now()-W.t0)/W.dur);if(W.particle.position.copy(W.curve.getPoint(H)),H>.75){const ee=1-(H-.75)/.25;W.ptMat.opacity=.9*ee,W.lineMat.opacity=.1*ee}H>=1&&(L.scene.remove(W.line),L.scene.remove(W.particle),W.lineGeo.dispose(),W.lineMat.dispose(),W.ptGeo.dispose(),W.ptMat.dispose(),L.arcs.splice(R,1))}if(L.satelliteMode&&L.satMat){L.sunAngle+=15e-5;const R=performance.now()*.001;L.satMat.uniforms.sunDir.value.set(Math.cos(L.sunAngle),.22,Math.sin(L.sunAngle)).normalize(),L.satMat.uniforms.time.value=R,L.atmMat&&(L.atmMat.uniforms.time.value=R)}if(L.holoPass&&(L.holoPass.uniforms.time.value=performance.now()*.001),L.activeNodeId!==null){const R=L.nodeMap.get(L.activeNodeId),W=t.querySelector(".s9-threatmap__crosshair");if(R&&W){const H=t.clientWidth,ee=t.clientHeight,xe=R.mesh.position.clone().project(L.camera),he=(xe.x*.5+.5)*H,de=(-xe.y*.5+.5)*ee;W.style.left=`${he}px`,W.style.top=`${de}px`}}if(L.nodeTween){const R=L.nodeTween,W=Date.now()-R.t0,H=Math.min(1,W/R.dur),ee=H<R.riseFrac?jo(H/R.riseFrac):Vo((H-R.riseFrac)/(1-R.riseFrac)),xe=H<R.riseFrac?1+(R.peakScale-1)*ee:R.peakScale-(R.peakScale-1)*ee;R.mesh.scale.setScalar(xe);const he=R.flashDur/R.dur,de=R.settleDur/R.dur;if(H<he)R.mesh.material.color.copy(R.flashColor);else if(H<he+de){const vn=(H-he)/de;R.mesh.material.color.lerpColors(R.flashColor,R.selectColor,qo(vn))}else R.mesh.material.color.copy(R.selectColor);H>=1&&(R.mesh.scale.setScalar(1),R.mesh.material.color.copy(R.selectColor),L.nodeTween=null)}if(L.deselectTween){const R=L.deselectTween,W=Date.now()-R.t0,H=Math.min(1,W/R.dur),ee=.4,xe=H<ee?Vo(H/ee):jo((H-ee)/(1-ee)),he=H<ee?1-(1-R.troughScale)*xe:R.troughScale+(1-R.troughScale)*xe;if(R.mesh.scale.setScalar(he),R.mesh.material.color.lerpColors(R.selectColor,R.levelColor,qo(H)),H>=1){R.mesh.scale.setScalar(1),R.mesh.material.color.copy(R.levelColor);const de=R.element.querySelector(".s9-threatmap__crosshair");de&&de.classList.remove("s9-threatmap__crosshair--animating-out"),L.deselectTween=null}}L.composer.render()}const kt=new Fi(d,{radius:Ie*1.003,numRings:56,durationMs:2e3,easingFn:Ba,direction:"south-to-north",stagger:.55,lineColor:65484,glowColor:65484,emissiveIntensity:2,opacity:0,glowOpacity:0});kt.baseRings.renderOrder=4,kt.glowRings.renderOrder=4,Eo.revealAnim=kt,Eo.animFrameId=requestAnimationFrame(Ao),Ei(t)}function Ni(t){var e;return((e=G.get(t))==null?void 0:e.camera)??null}function Ui(t){var e;return((e=G.get(t))==null?void 0:e.revealAnim)??null}function Gi(t){var e;return((e=G.get(t))==null?void 0:e.scene)??null}function Hi(t,e){const o=G.get(t);if(!o)return;const a=o.edgeMap.get(e);a&&(a.line.geometry.dispose(),a.line.material.dispose(),o.scene.remove(a.line),o.edgeMap.delete(e))}function ka(t){const e=G.get(t);if(!e)return;const o=t.querySelector(".s9-threatmap__node-count");o&&(o.textContent=`NODES: ${e.nodeMap.size}`)}function Na(t,{id:e,lat:o,lng:a,label:n,level:i}){const r=G.get(t);if(!r)return;if(o<-90||o>90||a<-180||a>180){console.warn(`[s9-threatmap] addNode: invalid coordinates for "${e}": lat=${o}, lng=${a}`);return}if(r.nodeMap.has(e)){console.warn(`[s9-threatmap] addNode: node "${e}" already exists.`);return}const c=Ne(),s=Fe(i,c),d=new $e({color:new B(s)}),h=new ae(r.nodeGeo,d);h.renderOrder=5;const l=Qt(o,a);h.position.copy(l),h.userData.nodeId=e,h.userData.label=n,h.userData.lat=o,h.userData.lng=a,h.userData.level=i,r.scene.add(h),r.nodeMap.set(e,{mesh:h,lat:o,lng:a,label:n,level:i}),ka(t)}function Ua(t,e){const o=G.get(t);if(!o)return;const a=o.nodeMap.get(e);if(!a){console.warn(`[s9-threatmap] removeNode: node "${e}" not found.`);return}o.activeNodeId===e&&Ve(t,null);for(const[n,i]of o.edgeMap)(i.from===e||i.to===e)&&Hi(t,n);a.mesh.material.dispose(),o.scene.remove(a.mesh),o.nodeMap.delete(e),ka(t)}function zi(t,e){const o=G.get(t);if(!o||o.reducedMotion)return;const a=o.nodeMap.get(e);if(!a)return;const n=Ne(),i=Fe(a.level,n),r=20,c=.035,s=[];for(let b=0;b<=r;b++){const _=b/r*Math.PI*2;s.push(new O(Math.cos(_)*c,Math.sin(_)*c,0))}const d=new Ae().setFromPoints(s),h=new Oe({color:new B(i),transparent:!0,opacity:.8,depthWrite:!1}),l=new co(d,h);l.renderOrder=5,l.position.copy(a.mesh.position);const u=a.mesh.position.clone().normalize();l.quaternion.setFromUnitVectors(new O(0,0,1),u),o.scene.add(l);const f=performance.now(),g=700;let m;(function b(_){if(!G.get(t)){cancelAnimationFrame(m),o.scene.remove(l),d.dispose(),h.dispose();return}const x=Math.min(1,(_-f)/g);l.scale.setScalar(1+x*6),h.opacity=.85*(1-x),x<1?m=requestAnimationFrame(b):(o.scene.remove(l),d.dispose(),h.dispose())})(performance.now())}function Wi(t,e,o){const a=G.get(t);if(!a||a.reducedMotion)return;const n=a.nodeMap.get(e),i=a.nodeMap.get(o);if(!n||!i)return;const r=Ne(),c=Fe(i.level,r),s=n.mesh.position.clone(),d=i.mesh.position.clone(),h=s.clone().add(d).multiplyScalar(.5),l=.2+h.length()*.25,u=h.clone().normalize().multiplyScalar(Ie+l),f=new Tn(s,u,d),g=new Ae().setFromPoints(f.getPoints(48)),m=new Oe({color:new B(c),transparent:!0,opacity:.1,depthWrite:!1}),b=new uo(g,m);b.renderOrder=2;const _=new Re(.009,4,4),x=new $e({color:new B(c),transparent:!0,opacity:.9}),M=new ae(_,x);M.renderOrder=3,M.position.copy(s),a.scene.add(b),a.scene.add(M),a.arcs.push({curve:f,line:b,lineGeo:g,lineMat:m,particle:M,ptGeo:_,ptMat:x,t0:Date.now(),dur:1e3+Math.random()*700})}function $i(t=null){const a=document.createElement("canvas");a.width=2048,a.height=1024;const n=a.getContext("2d"),i=n.createLinearGradient(0,0,0,1024);if(i.addColorStop(0,"#071a2e"),i.addColorStop(.15,"#082035"),i.addColorStop(.5,"#0a2a46"),i.addColorStop(.85,"#082035"),i.addColorStop(1,"#071a2e"),n.fillStyle=i,n.fillRect(0,0,2048,1024),t){const r=_i(t,t.objects.land),s=(r.type==="FeatureCollection"?r.features:[r]).flatMap(l=>{const u=l.geometry;return u?u.type==="Polygon"?[u.coordinates]:u.coordinates:[]}),d=n.createLinearGradient(0,0,0,1024);d.addColorStop(0,"#dce8dc"),d.addColorStop(.06,"#8a9c7a"),d.addColorStop(.16,"#527848"),d.addColorStop(.28,"#4e7040"),d.addColorStop(.4,"#4a6c34"),d.addColorStop(.5,"#3a5c24"),d.addColorStop(.6,"#4a6c34"),d.addColorStop(.72,"#4e7040"),d.addColorStop(.84,"#7a8c6a"),d.addColorStop(.92,"#ccd8c4"),d.addColorStop(1,"#eaf0ea");for(const l of s)for(let u=0;u<l.length;u++){const f=l[u];n.beginPath();for(let g=0;g<f.length;g++){const[m,b]=f[g],_=(m+180)/360*2048,x=(90-b)/180*1024;g===0?n.moveTo(_,x):n.lineTo(_,x)}n.closePath(),n.fillStyle=u===0?d:"#0a2a46",n.fill()}const h=[[22,15,16,28,"rgba(172,142, 88,0.72)"],[23,44,8,12,"rgba(178,148, 96,0.68)"],[27,70,5,9,"rgba(182,158,112,0.52)"],[42,100,6,16,"rgba(152,128, 86,0.58)"],[-25,132,10,17,"rgba(168,134, 82,0.58)"],[-22,-68,4,6,"rgba(142,118, 76,0.48)"],[35,-114,5,8,"rgba(158,128, 82,0.42)"],[40,58,5,8,"rgba(158,134, 88,0.45)"]];for(const[l,u,f,g,m]of h){const[b,_]=tt(l,u,2048,1024),x=g/360*2048,M=f/180*1024,C=n.createRadialGradient(b,_,0,b,_,Math.max(x,M)),A=m.replace(/[\d.]+\)$/,"0)");C.addColorStop(0,m),C.addColorStop(.55,m),C.addColorStop(.88,m.replace(/[\d.]+\)$/,"0.08)")),C.addColorStop(1,A),n.fillStyle=C,n.beginPath(),n.ellipse(b,_,x,M,0,0,Math.PI*2),n.fill()}n.strokeStyle="rgba(120,175,210,0.22)",n.lineWidth=.8;for(const l of s){const u=l[0];n.beginPath();for(let f=0;f<u.length;f++){const[g,m]=u[f],b=(g+180)/360*2048,_=(90-m)/180*1024;f===0?n.moveTo(b,_):n.lineTo(b,_)}n.closePath(),n.stroke()}}n.strokeStyle="rgba(100,150,200,0.04)",n.lineWidth=.5;for(let r=-80;r<=80;r+=30){const c=tt(r,0,2048,1024)[1];n.beginPath(),n.moveTo(0,c),n.lineTo(2048,c),n.stroke()}for(let r=-180;r<=180;r+=30){const c=tt(0,r,2048,1024)[0];n.beginPath(),n.moveTo(c,0),n.lineTo(c,1024),n.stroke()}return a}function ji(){const o=document.createElement("canvas");o.width=1024,o.height=512;const a=o.getContext("2d");a.fillStyle="#000810",a.fillRect(0,0,1024,512);const n=[[40.7,-74,4],[34,-118.2,3.5],[41.9,-87.6,3],[29.8,-95.4,2.5],[19.4,-99.1,3],[43.7,-79.4,3],[45.5,-73.6,2.5],[49.3,-123.1,2],[38.9,-77,2.5],[42.4,-71.1,2.5],[32.8,-96.8,2.5],[33.7,-84.4,2],[37.8,-122.4,2.5],[47.6,-122.3,2],[39.7,-105,2],[33.4,-112.1,2],[36.2,-115.1,2],[29.4,-98.5,2],[32.7,-97.1,2],[30.3,-81.7,1.5],[51,-114.1,2],[53.5,-113.5,2],[49.9,-97.1,2],[14.1,-87.2,1.5],[13.7,-89.2,1.5],[-23.5,-46.6,4],[-22.9,-43.2,3.5],[-34.6,-58.4,3.5],[-12,-77,2],[4.7,-74.1,2],[10.5,-66.9,2],[-33.5,-70.7,2.5],[-3.7,-38.5,2],[-8.1,-34.9,2],[-19.9,-43.9,2.5],[-30,-51.2,2],[-15.8,-47.9,2],[51.5,-.1,4],[48.9,2.3,4],[52.5,13.4,3.5],[55.8,37.6,4],[41,28.9,3.5],[59.9,10.8,2],[59.3,18.1,2],[60.2,25,2],[52.2,21,2.5],[50.1,14.4,2.5],[47.5,19,2.5],[48.2,16.4,2.5],[47.4,8.5,2.5],[48.1,11.6,3],[52.4,4.9,3],[40.4,-3.7,3],[41.4,2.2,3],[45.5,9.2,3],[41.9,12.5,3],[37.9,23.7,2.5],[50,8.7,2.5],[51,13.7,2],[51.2,6.8,2.5],[50.9,4.3,2.5],[53.5,-2.2,2],[55.7,12.6,2],[50.5,30.5,2.5],[59.5,30.3,2.5],[48,37.8,2],[46.5,30.7,2],[49.8,24,2],[50.4,30.5,2],[45.4,28,2],[44.4,26.1,2],[42.7,23.3,2],[37.1,-8.6,2],[30.1,31.3,3.5],[25.2,55.3,2.5],[33.3,44.4,2.5],[35.7,51.4,3],[24.7,46.7,2.5],[31.8,35.2,2],[33.9,35.5,2],[36.8,10.2,2],[32.9,13.2,2],[30.7,29.7,2],[6.5,3.4,2.5],[-26.2,28,3],[-33.9,18.4,2],[-1.3,36.8,2],[5.3,-4,2],[14.7,17.4,1.5],[9.1,7.4,2],[4.4,18.6,1.5],[-4.3,15.3,1.5],[-11.7,43.3,1.5],[-18.9,47.5,1.5],[28.6,77.2,4],[19.1,72.9,3.5],[12.9,77.6,3],[23.7,90.4,3],[24.9,67,2.5],[31.6,74.3,2.5],[33.7,73.1,2],[17.4,78.5,2.5],[22.6,88.4,2.5],[13.1,80.3,2.5],[23,72.6,2],[22.3,70.8,2],[26.9,75.8,2],[21.2,81.4,2],[27.7,85.3,2],[41.3,69.2,2],[43.3,76.9,2],[51.2,71.5,1.5],[53.9,27.6,2],[54.7,55.9,2],[56.8,60.6,2],[55,73.4,2],[56,92.9,2],[52.3,104.3,2],[53.7,87.1,2],[62,129.7,1.5],[43.1,131.9,2],[61.8,34.4,2],[35.7,139.7,5],[37.5,127,4],[39.9,116.4,4.5],[31.2,121.5,4.5],[23.1,113.3,4],[22.3,114.2,3.5],[30.6,104.1,3.5],[32.1,118.8,3.5],[30.3,120.2,3],[36.7,117,2.5],[34.3,108.9,2.5],[26,119.3,2.5],[41.8,123.4,2.5],[45.8,126.5,2.5],[34.6,135.5,3.5],[33.6,130.4,3],[1.3,103.8,3.5],[13.7,100.5,2.5],[10.8,106.7,2.5],[14.6,121,2.5],[3.1,101.7,2.5],[6.2,106.8,3],[21,105.8,2],[-6.2,106.8,2.5],[-33.9,151.2,2.5],[-37.8,144.9,2],[-27.5,153,2],[-31.9,115.9,2],[-43.5,172.6,1.5]];for(const[i,r,c]of n){const[s,d]=tt(i,r,1024,512),h=c*2.2,l=a.createRadialGradient(s,d,0,s,d,h);l.addColorStop(0,"rgba(255,210,120,0.22)"),l.addColorStop(.5,"rgba(255,170,60,0.08)"),l.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=l,a.beginPath(),a.arc(s,d,h,0,Math.PI*2),a.fill()}a.globalCompositeOperation="lighter";for(const[i,r,c]of n){const[s,d]=tt(i,r,1024,512),h=Math.max(1,c*.9),l=a.createRadialGradient(s,d,0,s,d,h);l.addColorStop(0,`rgba(255,245,200,${Math.min(.9,.5+c*.1)})`),l.addColorStop(.6,"rgba(255,200,100,0.15)"),l.addColorStop(1,"rgba(0,0,0,0)"),a.fillStyle=l,a.beginPath(),a.arc(s,d,h,0,Math.PI*2),a.fill()}return a.globalCompositeOperation="source-over",o}function Xo(t){return new Promise((e,o)=>{new wa().load(t,e,void 0,o)})}async function Vi(t){const e=G.get(t);if(!e||e.satelliteGroup)return;let o,a,n=1;try{[o,a]=await Promise.all([Xo("/textures/earth_day.jpg"),Xo("/textures/earth_night.jpg")]),o.colorSpace=Lo,a.colorSpace=Lo}catch(u){console.warn("[s9-threatmap] satellite textures not found, using procedural fallback",u);let f=pi();if(!f)try{const g=await fetch("/data/countries-110m.json");g.ok&&(f=await g.json(),Ia(f))}catch{}o=new Do($i(f)),a=new Do(ji()),n=0}const i=new te({uniforms:{dayMap:{value:o},nightMap:{value:a},sunDir:{value:new O(Math.cos(e.sunAngle),.22,Math.sin(e.sunAngle)).normalize()},realTex:{value:n},time:{value:0}},vertexShader:`
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
    `}),r=new Re(Ie,128,64),c=new ae(r,i);c.renderOrder=0;const s=new Re(Ie*1.055,64,32),d=new te({uniforms:{glowCol:{value:new B(51455)},sunDir:{value:i.uniforms.sunDir.value},time:{value:0}},vertexShader:`
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
    `,side:Zt,blending:$,transparent:!0,depthWrite:!1}),h=new ae(s,d);h.renderOrder=1;const l=new so;l.add(c),l.add(h),l.visible=!1,e.scene.add(l),Object.assign(e,{satelliteGroup:l,satGeo:r,satMat:i,atmGeo:s,atmMat:d,dayTex:o,nightTex:a})}async function qi(t,e){const o=G.get(t);o&&(e?(o.globeBack&&(o.globeBack.visible=!1),o.occluder&&(o.occluder.visible=!1),o.frontOccluder&&(o.frontOccluder.visible=!1),o.globeFront&&(o.globeFront.visible=!1),o.globeSurface&&(o.globeSurface.visible=!1),o.globeGlow&&(o.globeGlow.visible=!1),o.rimMesh&&(o.rimMesh.visible=!1),o.geoGroup&&(o.geoGroup.visible=!1),o.bloomPass&&(o._bloomPrev={strength:o.bloomPass.strength,threshold:o.bloomPass.threshold,radius:o.bloomPass.radius},o.bloomPass.strength=.32,o.bloomPass.threshold=.85,o.bloomPass.radius=.35),o.satelliteMode=!0,await Vi(t),o.satelliteGroup&&(o.satelliteGroup.visible=!0)):(o.satelliteGroup&&(o.satelliteGroup.visible=!1),o.globeBack&&(o.globeBack.visible=!0),o.occluder&&(o.occluder.visible=!0),o.frontOccluder&&(o.frontOccluder.visible=!0),o.globeFront&&(o.globeFront.visible=!0),o.globeSurface&&(o.globeSurface.visible=!0),o.globeGlow&&(o.globeGlow.visible=!0),o.rimMesh&&(o.rimMesh.visible=!0),o.geoGroup&&(o.geoGroup.visible=!0),o.bloomPass&&o._bloomPrev&&(o.bloomPass.strength=o._bloomPrev.strength,o.bloomPass.threshold=o._bloomPrev.threshold,o.bloomPass.radius=o._bloomPrev.radius),o.satelliteMode=!1))}function Ko(t){const e=G.get(t);if(!e)return;const o=Ne(!0);e.colors=o;const a=o.neonCyan||"#00d48ddf";if(e.globeBack&&e.globeBack.material.color.set(a),e.globeFront&&e.globeFront.material.color.set(a),e.geoLineMats){const n=o.neonCyan||"#008410D0";for(const i of e.geoLineMats)i.color.set(n)}for(const n of e.nodeMap.values()){const i=Fe(n.level,o);n.mesh.material.color.set(i),n.mesh.material.emissive.set(i)}}const Yi=new WeakMap;function Xi(t){const e=new AbortController;Yi.set(t,e),t.classList.add("s9-panel--booting"),t.addEventListener("animationend",o=>{o.animationName==="crt-flicker"&&(t.classList.remove("s9-panel--booting"),t.dispatchEvent(new CustomEvent("s9:panel-mount",{bubbles:!0,detail:{id:t.dataset.s9Id??null}})))},{signal:e.signal,once:!0})}const jt=["complete","active","failed","pending"];function Ki(t,e){if(!jt.includes(e)){console.warn(`[s9-sequence] Unknown state: "${e}". Expected one of: ${jt.join(", ")}.`);return}jt.forEach(o=>t.classList.remove(`s9-sequence__entry--${o}`)),e==="failed"?(t.classList.add("s9-sequence__entry--fail-flash"),t.addEventListener("animationend",()=>{t.classList.remove("s9-sequence__entry--fail-flash"),t.classList.add("s9-sequence__entry--failed"),Zo(t,e)},{once:!0})):(t.classList.add(`s9-sequence__entry--${e}`),Zo(t,e))}function Zo(t,e){t.dispatchEvent(new CustomEvent("s9:sequence-step-change",{bubbles:!0,detail:{state:e}}))}const Zi={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new N(1/1024,1/512)}},vertexShader:`

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
`,Qi={uniforms:{tDiffuse:{value:null},tPrev:{value:null},decay:{value:.88}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},Ji={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.42},scanlineOpacity:{value:.045},aberrationAmt:{value:.0025}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},es={uniforms:{tDiffuse:{value:null},uTime:{value:0},uHeatAmt:{value:.004},uHeatFreq:{value:60},uHeatSpeed:{value:3.5}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},ts={uniforms:{tDiffuse:{value:null},uTime:{value:0},uStreakAmt:{value:.055},uAspect:{value:1.78}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},os={uniforms:{tDiffuse:{value:null},uBlurStrength:{value:.006}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},as=`
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
`,ns=`
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
`,is={uniforms:{tDiffuse:{value:null},uLightPos:{value:null},uDensity:{value:.93},uDecay:{value:.96},uWeight:{value:.35},uExposure:{value:.45},uClampMax:{value:1},uEnabled:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},ss=[..."アウエオカキケコサシスセソタツテナニヌネ",..."ハヒホマミムメモヤヨラリワー",..."012345789z",...':."*+<>|¦╌▪꞊'],rs=8,ls=8,Qo=600,At=120,cs=.12,ds=.08,us=16,Jo=3.5,hs=8;function fs(t){const e=new wa().load(t);return e.flipY=!1,e.minFilter=Rn,e.magFilter=In,e.colorSpace=Pn,e.generateMipmaps=!0,{tex:e,count:ss.length}}function ms(){const t=new pa,e=new nt(1,1);t.index=e.index.clone(),t.setAttribute("position",e.getAttribute("position").clone()),t.setAttribute("uv",e.getAttribute("uv").clone()),e.dispose();const o=Qo*At,a=new Float32Array(o),n=new Float32Array(o),i=new Float32Array(o*4),r=new Float32Array(o*4);for(let c=0;c<Qo;c++){const s=Math.random()*Math.PI*2,d=1-2*Math.random(),h=Math.sqrt(1-d*d),l=Math.pow(Math.random(),.12),u=Jo+l*(hs-Jo),f=h*Math.cos(s)*u,g=h*Math.sin(s)*u,b=d*u+(Math.random()-.5)*2,_=.4+Math.random()*1.87,x=Math.random(),M=.5+Math.random()*1,C=.18+Math.random()*.72,A=.015+Math.random()*.035;for(let w=0;w<At;w++){const v=c*At+w;a[v]=c,n[v]=w;const y=v*4;i[y]=f,i[y+1]=g,i[y+2]=_,i[y+3]=x,r[y]=b,r[y+1]=M,r[y+2]=C,r[y+3]=A}}return t.setAttribute("aColIdx",new we(a,1)),t.setAttribute("aRowIdx",new we(n,1)),t.setAttribute("aColA",new we(i,4)),t.setAttribute("aColB",new we(r,4)),t.instanceCount=o,t}function ps(t,e,o,a){const n=a.clientWidth||1,i=a.clientHeight||1,r=new po(t);r.addPass(new go(e,o));const c=new Te(new N(n,i),1.15,.45,.2);r.addPass(c);const s=new ve(es);s.enabled=!0,r.addPass(s);const d=t.getDrawingBufferSize(new N);let h=new Sa(d.x,d.y);const l=new ve(Qi);l.uniforms.tPrev.value=h;const u=l.render.bind(l);l.render=function(M,C,A,w,v){u(M,C,A,w,v),M.copyFramebufferToTexture(this.uniforms.tPrev.value)},r.addPass(l);const f=new ve(os);f.enabled=!0,f.uniforms.uBlurStrength.value=.002,r.addPass(f);const g=new ve(ts);g.enabled=!0,g.uniforms.uAspect.value=n/i,r.addPass(g);const m=new ve(Ji);r.addPass(m);const b=new ve(is);b.uniforms.uLightPos.value=new N(.5,.75),b.enabled=!0,r.addPass(b);const _=new ve(Zi),x=t.getPixelRatio();return _.uniforms.resolution.value.set(1/(n*x),1/(i*x)),r.addPass(_),{composer:r,bloomPass:c,heatPass:s,phosphorPass:l,phosphorTex:h,softenPass:f,streakPass:g,holoPass:m,godRaysPass:b,fxaaPass:_}}const Ot=new Map;function gs(t,e={}){Ot.has(t)&&ea(t);const o=t.querySelector("canvas[data-matrix-rain]");o&&o.remove();const{color:a="#00ff70",opacity:n=.82,syncCamera:i=null}=e,r=new B(a),c=fs("/data/matrixcode_msdf.png"),s=new ro({antialias:!1,alpha:!0});s.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.setSize(t.clientWidth||1,t.clientHeight||1);const d=s.domElement;d.dataset.matrixRain="1",d.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;",t.appendChild(d);const h=new lo,l=new ba(45,(t.clientWidth||1)/(t.clientHeight||1),.1,60);l.position.set(0,0,3),l.lookAt(0,0,0);const u=ms(),f={uGlyphTex:{value:c.tex},uGlyphCount:{value:c.count},uAtlasCols:{value:rs},uAtlasGrid:{value:ls},uTime:{value:0},uCellW:{value:cs},uCellH:{value:ds},uWorldH:{value:us},uNRows:{value:At},uColor:{value:new O(r.r,r.g,r.b)},uGlobalAlpha:{value:n},uDepth:{value:.04},uPomSteps:{value:6},uNormalStrength:{value:6},uLightDir:{value:new O(-.4,.8,.5).normalize()},uGlobeInteract:{value:1},uGlyphChroma:{value:1}},g=new te({uniforms:f,vertexShader:as,fragmentShader:ns,transparent:!0,depthWrite:!1,blending:Dn,blendEquation:Ln,blendSrc:rt,blendDst:rt,blendEquationAlpha:Cn,blendSrcAlpha:rt,blendDstAlpha:rt,side:_a,extensions:{derivatives:!0}}),m=new ae(u,g);m.frustumCulled=!1,m.renderOrder=1,h.add(m);let{composer:b,bloomPass:_,heatPass:x,phosphorPass:M,phosphorTex:C,softenPass:A,streakPass:w,holoPass:v,godRaysPass:y,fxaaPass:S}=ps(s,h,l,t);const p={renderer:s,composer:b,bloomPass:_,heatPass:x,softenPass:A,phosphorPass:M,phosphorTex:C,holoPass:v,streakPass:w,godRaysPass:y,fxaaPass:S,material:g,geom:u,atlas:c,ro:null,animId:0,syncCamera:i,burstBloomEnabled:!0};Ot.set(t,p);let T=0,D=0,k=-1;function ie(F){p.animId=requestAnimationFrame(ie);const P=F*.001,se=P-T;if(T=P,f.uTime.value=P,v.uniforms.time.value=P,x.uniforms.uTime.value=P,w.uniforms.uTime.value=P,p.burstBloomEnabled){const re=Math.floor(P/4);if(re!==k&&(k=re,D=.3),D>0){D=Math.max(0,D-se);const le=1-D/.3;_.threshold=le<.2?It.lerp(.2,.1,le/.2):It.lerp(.1,.2,(le-.2)/.8)}else _.threshold=.2}else _.threshold=.2;if(p.syncCamera&&(l.position.copy(p.syncCamera.position),l.quaternion.copy(p.syncCamera.quaternion),l.fov=p.syncCamera.fov,l.near=p.syncCamera.near,l.far=p.syncCamera.far,l.updateProjectionMatrix()),l.position.lengthSq()>.001){const re=Math.atan2(l.position.x,l.position.z)+Math.PI/3;f.uLightDir.value.set(Math.sin(re)*.6,.8,Math.cos(re)*.6).normalize()}p.composer.render()}p.animId=requestAnimationFrame(ie);let Z=!1;return p.ro=new ResizeObserver(()=>{Z||(Z=!0,requestAnimationFrame(()=>{Z=!1;const F=t.clientWidth||1,P=t.clientHeight||1;s.setSize(F,P),p.composer.setSize(F,P),p.bloomPass.resolution.set(F,P);const se=s.getPixelRatio();p.fxaaPass.uniforms.resolution.value.set(1/(F*se),1/(P*se)),p.streakPass.uniforms.uAspect.value=F/P,l.aspect=F/P,l.updateProjectionMatrix();const re=s.getDrawingBufferSize(new N);p.phosphorTex.dispose();const le=new Sa(re.x,re.y);p.phosphorTex=le,p.phosphorPass.uniforms.tPrev.value=le}))}),p.ro.observe(t),{destroy(){ea(t)},setColor(F){const P=new B(F);f.uColor.value.set(P.r,P.g,P.b)},setOpacity(F){f.uGlobalAlpha.value=F},setDepth(F){f.uDepth.value=F},setNormalStrength(F){f.uNormalStrength.value=F},setSoften(F,P){A.enabled=F,P!==void 0&&(A.uniforms.uBlurStrength.value=P)},setHeat(F,P){x.enabled=F,P!==void 0&&(x.uniforms.uHeatAmt.value=P)},setStreaks(F,P){w.enabled=F,P!==void 0&&(w.uniforms.uStreakAmt.value=P)},setBurstBloom(F){p.burstBloomEnabled=F},setGlobeInteract(F){f.uGlobeInteract.value=F?1:0},setGlyphChroma(F,P){f.uGlyphChroma.value=F?P??1:0},setGodRays(F,P,se,re,le,Ye,Ue){y.uniforms.uEnabled.value=F?1:0,P!==void 0&&(y.uniforms.uLightPos.value.x=P),se!==void 0&&(y.uniforms.uLightPos.value.y=se),re!==void 0&&(y.uniforms.uDensity.value=re),le!==void 0&&(y.uniforms.uDecay.value=le),Ye!==void 0&&(y.uniforms.uWeight.value=Ye),Ue!==void 0&&(y.uniforms.uExposure.value=Ue)}}}function ea(t){const e=Ot.get(t);e&&(cancelAnimationFrame(e.animId),e.ro.disconnect(),e.holoPass&&e.holoPass.material.dispose(),e.phosphorPass&&e.phosphorPass.material.dispose(),e.phosphorTex&&e.phosphorTex.dispose(),e.composer.dispose(),e.material.dispose(),e.geom.dispose(),e.atlas.tex.dispose(),e.renderer.dispose(),e.renderer.domElement.remove(),Ot.delete(t))}const Ha=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,vs=`
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
}`,ys=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,bs=`
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
}`,_s=`
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
}`,ws=`
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
}`,Ss=`
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
}`,xs=`
varying vec2 vUv;
uniform vec3  uColor;
uniform float uIntensity;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float glow = exp(-r * r * 8.0) * uIntensity;
  if (glow < 0.005) discard;
  gl_FragColor = vec4(uColor * glow, glow * 0.6);
}`,Es={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.38},scanlineOpacity:{value:.07},aberrationAmt:{value:.001}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},z=Math.PI*2,ye=32,Tt=new WeakMap;let Ms=0;function As(){return`T-${String(++Ms).padStart(2,"0")}`}function Je(t){return getComputedStyle(document.documentElement).getPropertyValue(t).trim()}function Me(t){const e=new B().setStyle(t||"#000000");return[e.r,e.g,e.b]}function Bt(t,e,o){return t+(e-t)*Math.max(0,Math.min(1,o))}function Ts(t,e){const o=((t-e)%z+z)%z;return o>Math.PI?o-z:o}function za(){return{neonCyan:Je("--neon-cyan")||"#00f0ff",neonGreen:Je("--neon-green")||"#00ff9d",neonAlert:Je("--neon-alert")||"#ff00cc",neonWarn:Je("--neon-warn")||"#ffb300",voidColor:Je("--void")||"#05080f"}}function ta(t,e){const o=t.ringHzBase;return e==="friendly"?o*.6:e==="hostile"?o*1.5:o}function Cs(t){const e=Bt(.1,.85,t),o=Bt(.3,.05,t),a=Math.random();return a<e?"hostile":a<e+o?"friendly":"neutral"}function Ls(t){return t==="friendly"?0:t==="neutral"?1:t==="hostile"?2:3}let et=null,Jt=!1;function Ds(t=.08){if(!Jt)try{et||(et=new Audio("/sonar-ping.mp3")),et.volume=Math.min(1,Math.max(0,t)),et.currentTime=0,et.play().catch(()=>{})}catch{}}function Rs(){Jt=!Jt}function Is(t){const o=new Float32Array(192);for(let n=0;n<64;n++){const i=n/64*z;o[n*3]=Math.sin(i)*t,o[n*3+1]=Math.cos(i)*t,o[n*3+2]=0}const a=new Ae;return a.setAttribute("position",new ho(o,3)),a}function Ps(t){const o=new Float32Array(192);for(let n=0;n<32;n++){const i=n/32*z,r=n%8===0?t*.92:t*.96,c=n*6;o[c]=Math.sin(i)*r,o[c+1]=Math.cos(i)*r,o[c+2]=0,o[c+3]=Math.sin(i)*t,o[c+4]=Math.cos(i)*t,o[c+5]=0}const a=new Ae;return a.setAttribute("position",new ho(o,3)),a}function Os(t){const{scene:e,R:o,theme:a}=t;t.backgroundMesh&&(t.backgroundMesh.geometry.dispose(),t.backgroundMesh.material.dispose(),e.remove(t.backgroundMesh));const n=new B(a.voidColor),i=new nt(o*2,o*2),r=new te({vertexShader:Ha,fragmentShader:vs,uniforms:{uVoidColor:{value:new O(n.r,n.g,n.b)},uTime:{value:0}},transparent:!0,depthWrite:!0,blending:xt}),c=new ae(i,r);c.renderOrder=0,e.add(c),t.backgroundMesh=c}function Bs(t){const{scene:e,R:o,theme:a}=t;t.centerGlowMesh&&(t.centerGlowMesh.geometry.dispose(),t.centerGlowMesh.material.dispose(),e.remove(t.centerGlowMesh));const n=new B(a.neonCyan),i=o*.5,r=new nt(i,i),c=new te({vertexShader:Ha,fragmentShader:xs,uniforms:{uColor:{value:new O(n.r,n.g,n.b)},uIntensity:{value:0}},transparent:!0,depthWrite:!1,blending:$}),s=new ae(r,c);s.renderOrder=6,e.add(s),t.centerGlowMesh=s}function Fs(t){const{scene:e,R:o,theme:a}=t;t.ringMeshes&&(t.ringMeshes.forEach(d=>{d.geometry.dispose(),e.remove(d)}),t.matRingInner&&t.matRingInner.dispose(),t.matRingOuter&&t.matRingOuter.dispose()),t.ticksMesh&&(t.ticksMesh.geometry.dispose(),t.matRingTicks&&t.matRingTicks.dispose(),e.remove(t.ticksMesh));const n=new Oe({color:new B(a.neonCyan),opacity:.18,transparent:!0,depthWrite:!1,blending:$}),i=new Oe({color:new B(a.neonCyan),opacity:.28,transparent:!0,depthWrite:!1,blending:$}),r=new Oe({color:new B(a.neonCyan),opacity:.22,transparent:!0,depthWrite:!1,blending:$}),c=[.2,.4,.6,.8,1];t.ringMeshes=c.map((d,h)=>{const l=new co(Is(d*o),h<4?n:i);return l.renderOrder=1,e.add(l),l});const s=new On(Ps(o),r);s.renderOrder=1,e.add(s),t.ticksMesh=s,t.matRingInner=n,t.matRingOuter=i,t.matRingTicks=r}function ks(t){const{scene:e,R:o,theme:a}=t;t.sweepTrailMesh&&(t.sweepTrailMesh.geometry.dispose(),t.sweepTrailMesh.material.dispose(),e.remove(t.sweepTrailMesh)),t.sweepArmLine&&(t.sweepArmLine.geometry.dispose(),t.sweepArmLine.material.dispose(),e.remove(t.sweepArmLine));const n=new B(a.neonCyan),i=new O(n.r,n.g,n.b),r=new nt(o*2,o*2),c=new te({vertexShader:ys,fragmentShader:bs,uniforms:{uAngle:{value:t.sweepAngle},uArcWidth:{value:Math.PI*.6},uColor:{value:i.clone()},uStaticAmt:{value:1}},transparent:!0,depthWrite:!1,blending:$}),s=new ae(r,c);s.renderOrder=2,e.add(s),t.sweepTrailMesh=s;const d=new Float32Array([0,0,0,Math.sin(t.sweepAngle)*o,Math.cos(t.sweepAngle)*o,0]),h=new Ae;h.setAttribute("position",new ho(d,3));const l=new Oe({color:new B(a.neonCyan),opacity:.9,transparent:!0,depthWrite:!1,blending:$}),u=new uo(h,l);u.renderOrder=3,e.add(u),t.sweepArmLine=u}function Ns(t){const{scene:e,theme:o}=t;t.contactDotsMesh&&(t.contactDotsMesh.geometry.dispose(),t.contactDotsMesh.material.dispose(),e.remove(t.contactDotsMesh)),t.contactRingsMesh&&(t.contactRingsMesh.geometry.dispose(),t.contactRingsMesh.material.dispose(),e.remove(t.contactRingsMesh));const a=Me(o.neonGreen),n=Me(o.neonWarn),i=Me(o.neonAlert),r=Me(o.neonCyan);function c(h,l,u){const f=new nt(1,1),g=new we(new Float32Array(ye).fill(0),1),m=new we(new Float32Array(ye).fill(1),1),b=new we(new Float32Array(ye).map(()=>Math.random()),1),_=new we(new Float32Array(ye).fill(0),1);g.setUsage(Ke),m.setUsage(Ke),b.setUsage(Ke),_.setUsage(Ke),f.setAttribute("a_type",g),f.setAttribute("a_age",m),f.setAttribute("a_phase",b),f.setAttribute("a_sweepFade",_);const x=new te({vertexShader:_s,fragmentShader:h,uniforms:l,transparent:!0,depthWrite:!1,blending:$}),M=new Bn(f,x,ye);M.renderOrder=u,M.instanceMatrix.setUsage(Ke);const C=new xa;C.scale.setScalar(0),C.updateMatrix();for(let A=0;A<ye;A++)M.setMatrixAt(A,C.matrix);return M.instanceMatrix.needsUpdate=!0,e.add(M),M}const s={uC0:{value:new O(...a)},uC1:{value:new O(...n)},uC2:{value:new O(...i)},uC3:{value:new O(...r)}},d={uC0:{value:new O(...a)},uC1:{value:new O(...n)},uC2:{value:new O(...i)}};t.contactDotsMesh=c(ws,s,5),t.contactRingsMesh=c(Ss,d,4)}function Us(t){const{element:e,overlay:o,R:a}=t,n=e.clientWidth/2,i=e.clientHeight/2;t.staticLabelEls.forEach(h=>h.remove()),t.staticLabelEls=[];const r=[2,4,6,8];[.2,.4,.6,.8].forEach((h,l)=>{const u=document.createElement("span");u.className="s9-radar__ring-label",u.textContent=`${r[l]}km`,u.style.left=`${n+h*a+4}px`,u.style.top=`${i}px`,u.style.transform="translateY(-50%)",o.appendChild(u),t.staticLabelEls.push(u)});const s=[["N",0],["NE",z*.125],["E",z*.25],["SE",z*.375],["S",z*.5],["SW",z*.625],["W",z*.75],["NW",z*.875]],d=a*1.05;s.forEach(([h,l])=>{const u=document.createElement("span");u.className="s9-radar__cardinal-label",u.textContent=h,u.style.left=`${n+Math.sin(l)*d}px`,u.style.top=`${i-Math.cos(l)*d}px`,u.style.transform="translate(-50%, -50%)",o.appendChild(u),t.staticLabelEls.push(u)})}function Gs(t){Os(t),Bs(t),Fs(t),ks(t),Us(t),t.contactDotsMesh?Hs(t):Ns(t)}function Hs(t){const{contacts:e,dummy:o,contactDotsMesh:a,contactRingsMesh:n,R:i}=t;!a||!n||(e.forEach((r,c)=>{if(!r)o.scale.setScalar(0),o.position.set(0,0,0),o.updateMatrix(),a.setMatrixAt(c,o.matrix),n.setMatrixAt(c,o.matrix);else{const s=r.age<.08?Bt(0,8,r.age/.08):8;o.position.set(Math.sin(r.angle)*r.range*i,Math.cos(r.angle)*r.range*i,0),o.scale.setScalar(s),o.updateMatrix(),a.setMatrixAt(c,o.matrix),o.scale.setScalar(s>0?i*1.5:0),o.updateMatrix(),n.setMatrixAt(c,o.matrix)}}),a.instanceMatrix.needsUpdate=!0,n.instanceMatrix.needsUpdate=!0)}function eo(t,e){const o=t.contacts[e];o&&(o.labelEl&&(o.labelEl.remove(),o.labelEl=null),t.contactDotsMesh&&t.contactRingsMesh&&(t.dummy.scale.setScalar(0),t.dummy.position.set(0,0,0),t.dummy.updateMatrix(),t.contactDotsMesh.setMatrixAt(e,t.dummy.matrix),t.contactRingsMesh.setMatrixAt(e,t.dummy.matrix),t.contactDotsMesh.instanceMatrix.needsUpdate=!0,t.contactRingsMesh.instanceMatrix.needsUpdate=!0),t.contacts[e]=null)}function _o(t,e,o,a,n){var b;const i=t.opts.maxContacts;if(t.contacts.filter(Boolean).length>=i){let _=-1,x=-1;for(let M=0;M<ye;M++)((b=t.contacts[M])==null?void 0:b.type)==="ghost"&&t.contacts[M].age>x&&(_=M,x=t.contacts[M].age);if(_>=0)eo(t,_);else return console.warn("[pulse-radar] contact pool full"),null}let c=-1;for(let _=0;_<ye;_++)if(!t.contacts[_]){c=_;break}if(c<0)return null;const s=a==="ghost",d=(e%z+z)%z,h=Math.max(0,Math.min(1,o)),l=Math.sin(d)*h,u=Math.cos(d)*h,f=s?0:.01+Math.random()*.025,g=Math.random()*z,m={id:n||As(),angle:d,range:h,wx:l,wy:u,wvx:s?0:Math.sin(g)*f,wvy:s?0:Math.cos(g)*f,type:a,age:s?.85:0,maxAge:s?3e3:8e3+Math.random()*1e4,bornAt:performance.now(),phase:s?Math.random()*.3:1,lastSweep:-1/0,ghostAngle:null,ghostRange:null,ghostSpawned:!1,instIdx:c,labelEl:null,sweepAlpha:s?.15:1,fadeTimeMs:4200*(.88+Math.random()*.24),revealed:s,revealTime:s?performance.now():null};if(!s){const _=document.createElement("span");_.className=`s9-radar__label s9-radar__label--${a}`,_.textContent=a==="hostile"?`${m.id} ⚠HC`:m.id,t.labelsDiv.appendChild(_),m.labelEl=_}return t.contacts[c]=m,m}function Ct(t){if(t.destroyed||t.reducedMotion)return;const e=Math.max(.05,t.opts.contactDensity),o=Bt(3e3,600,t.threatLevel)/e,a=(Math.random()-.5)*o*.4,n=Math.max(200,o+a);t.spawnTimer=setTimeout(()=>{!t.destroyed&&!t.reducedMotion&&(zs(t),Ct(t))},n)}function zs(t){const e=t.contacts.filter(i=>i&&i.type!=="ghost"),o=e.length>0&&Math.random()<.3,a=t.sweepAngle;let n;if(o){const i=e[Math.floor(Math.random()*e.length)];n=Math.max(.15,Math.min(.97,i.range+(Math.random()-.5)*.3))}else n=.15+Math.random()*.82;_o(t,a,n,Cs(t.threatLevel))}function Ws(t,e){if(t.reducedMotion)return;const o=t.sweepAngle;t.sweepAngle=(t.sweepAngle+t.sweepSpeed*e/1e3)%z,t.sweepAngle<o&&(Ds(.06),t.centerGlowIntensity=1),t.centerGlowIntensity>0&&(t.centerGlowIntensity*=Math.pow(.001,e/600),t.centerGlowIntensity<.005&&(t.centerGlowIntensity=0),t.centerGlowMesh&&(t.centerGlowMesh.material.uniforms.uIntensity.value=t.centerGlowIntensity));const a=performance.now();if(t.staticNextAt===null&&(t.staticNextAt=a+7e3+Math.random()*5e3),a>=t.staticNextAt&&!t.staticActive&&(t.staticActive=!0,t.staticEndAt=a+60+Math.random()*40,t.staticNextAt=t.staticEndAt+6e3+Math.random()*4e3),t.staticActive&&(t.sweepTrailMesh.material.uniforms.uStaticAmt.value=.5+Math.random()*.5,a>=t.staticEndAt&&(t.staticActive=!1,t.sweepTrailMesh.material.uniforms.uStaticAmt.value=1)),t.sweepTrailMesh&&(t.sweepTrailMesh.material.uniforms.uAngle.value=t.sweepAngle),t.sweepArmLine){const{R:n}=t,i=t.sweepArmLine.geometry.attributes.position;i.setXYZ(0,0,0,0),i.setXYZ(1,Math.sin(t.sweepAngle)*n,Math.cos(t.sweepAngle)*n,0),i.needsUpdate=!0}}function $s(t,e){const{contacts:o,sweepAngle:a}=t,n=t.now;o.forEach((i,r)=>{if(i){if(i.type!=="ghost"&&(i.wx+=i.wvx*e/1e3,i.wy+=i.wvy*e/1e3,Math.hypot(i.wx,i.wy)>1.02)){eo(t,r);return}if(i.age+=e/i.maxAge,i.type!=="ghost"&&!t.reducedMotion){const c=(Math.atan2(i.wx,i.wy)%z+z)%z;Math.abs(Ts(a,c))<.12&&n-i.lastSweep>800&&(i.angle=c,i.range=Math.hypot(i.wx,i.wy),i.phase=0,i.lastSweep=n,i.sweepAlpha=1,i.revealed||(i.revealed=!0,i.revealTime=n))}if(i.type!=="ghost"){if(i.phase<1){const c=i.age>.65&&i.age<.85;i.phase=Math.min(1,i.phase+ta(t,i.type)*(c?.5:1)*e/1e3)}}else i.phase+=ta(t,"neutral")*e/1e3;if(i.type!=="ghost"&&i.revealed){const c=.05+.1*i.range,s=n-i.lastSweep,d=Math.min(1,s/i.fadeTimeMs);i.sweepAlpha=c+(1-c)*Math.pow(1-d,1.025)}i.type!=="ghost"&&!i.ghostSpawned&&i.age>=.65&&i.revealed&&(i.ghostAngle=i.angle,i.ghostRange=i.range,i.ghostSpawned=!0,_o(t,i.ghostAngle,i.ghostRange,"ghost")),i.age>=1&&eo(t,r)}})}function js(t){const{contacts:e,dummy:o,contactDotsMesh:a,contactRingsMesh:n,R:i}=t;if(!a||!n)return;let r=!1;e.forEach((c,s)=>{if(!c)return;r=!0;let d;c.revealed?d=Math.min(1,(t.now-c.revealTime)/300)*8:d=0;const h=Math.sin(c.angle)*c.range*i,l=Math.cos(c.angle)*c.range*i;o.position.set(h,l,0),o.scale.setScalar(d),o.updateMatrix(),a.setMatrixAt(s,o.matrix),o.scale.setScalar(d>0?i*1.5:0),o.updateMatrix(),n.setMatrixAt(s,o.matrix);const u=Ls(c.type);a.geometry.attributes.a_type.setX(s,u),a.geometry.attributes.a_age.setX(s,c.age),a.geometry.attributes.a_phase.setX(s,c.phase),a.geometry.attributes.a_sweepFade.setX(s,c.sweepAlpha),n.geometry.attributes.a_type.setX(s,u),n.geometry.attributes.a_age.setX(s,c.age),n.geometry.attributes.a_phase.setX(s,c.phase),n.geometry.attributes.a_sweepFade.setX(s,c.sweepAlpha)}),r&&(a.instanceMatrix.needsUpdate=!0,n.instanceMatrix.needsUpdate=!0,a.geometry.attributes.a_type.needsUpdate=!0,a.geometry.attributes.a_age.needsUpdate=!0,a.geometry.attributes.a_phase.needsUpdate=!0,a.geometry.attributes.a_sweepFade.needsUpdate=!0,n.geometry.attributes.a_type.needsUpdate=!0,n.geometry.attributes.a_age.needsUpdate=!0,n.geometry.attributes.a_phase.needsUpdate=!0,n.geometry.attributes.a_sweepFade.needsUpdate=!0)}function Vs(t){const{contacts:e,element:o,R:a}=t,n=o.clientWidth/2,i=o.clientHeight/2;e.forEach(r=>{if(!(r!=null&&r.labelEl))return;if(!r.revealed){r.labelEl.style.opacity="0";return}const c=n+Math.sin(r.angle)*r.range*a,s=i-Math.cos(r.angle)*r.range*a;r.labelEl.style.left=`${c+7}px`,r.labelEl.style.top=`${s-6}px`,r.labelEl.style.opacity=String(r.sweepAlpha)})}function qs(t){if(!t.footerEl)return;const e=t.contacts.filter(a=>a&&a.type!=="ghost").length,o=(z/t.sweepSpeed).toFixed(1);t.footerEl.textContent=`CONTACTS: ${e} | SWEEP: ${o}s`}function to(t,e){if(t.destroyed||!t.rafRunning){t.rafId=null;return}const o=Math.min(e-(t.lastTs??e),100);t.lastTs=e,t.now=e,t.R>0&&(t.backgroundMesh&&(t.backgroundMesh.material.uniforms.uTime.value=e/1e3),t.holoPass&&(t.holoPass.uniforms.time.value=e/1e3),Ws(t,o),$s(t,o),js(t),Vs(t),qs(t),t.composer.render()),t.rafId=requestAnimationFrame(a=>to(t,a))}function Ys(t,e={}){if(Tt.has(t)){console.warn("[pulse-radar] already initialised");const A=Tt.get(t);return{setRadarThreatLevel:A.setRadarThreatLevel,injectContact:A.injectContact}}const o={sweepPeriod:2690,contactDensity:Math.max(0,Math.min(1,e.contactDensity??.5)),threatLevel:Math.max(0,Math.min(1,e.threatLevel??0)),primaryColor:e.primaryColor??null,maxContacts:Math.max(4,Math.min(ye,e.maxContacts??16))},a=za(),n=document.createElement("canvas");n.className="s9-radar__canvas";const i=document.createElement("div");i.className="s9-radar__overlay";const r=document.createElement("div");r.className="s9-radar__labels",i.appendChild(r),t.appendChild(n),t.appendChild(i),t.style.cursor="pointer",t.addEventListener("click",()=>{Rs()});let c;try{c=new ro({canvas:n,antialias:!0,alpha:!1,premultipliedAlpha:!1})}catch(A){return console.error("[pulse-radar] WebGL context creation failed",A),n.remove(),i.remove(),t.dispatchEvent(new CustomEvent("pulse-radar:init-failed",{bubbles:!0,detail:{error:A}})),{setRadarThreatLevel:()=>{},injectContact:()=>""}}c.setClearColor(new B(a.voidColor),1),c.setPixelRatio(Math.min(devicePixelRatio,2));const s=new lo,d=new ma(-1,1,1,-1,.1,100);d.position.z=10;const h=new po(c);h.addPass(new go(s,d));const l=new Te(new N(t.clientWidth||200,t.clientHeight||200),.8,.65,.25);h.addPass(l);const u=new ve(Es);h.addPass(u);const f={element:t,canvas:n,overlay:i,labelsDiv:r,renderer:c,scene:s,camera:d,opts:o,theme:a,R:0,sweepAngle:Math.random()*z,sweepSpeed:z/(o.sweepPeriod/1e3),ringPopDuration:o.sweepPeriod/1e3-.5,threatLevel:o.threatLevel,contacts:new Array(ye).fill(null),dummy:new xa,footerEl:document.getElementById("radar-contacts"),staticLabelEls:[],staticActive:!1,staticNextAt:null,staticEndAt:null,rafId:null,rafRunning:!1,destroyed:!1,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,centerGlowIntensity:0,centerGlowMesh:null,composer:h,bloomPass:l,holoPass:u,backgroundMesh:null,ringMeshes:null,ticksMesh:null,sweepTrailMesh:null,sweepArmLine:null,contactDotsMesh:null,contactRingsMesh:null,matRingInner:null,matRingOuter:null,matRingTicks:null,spawnTimer:null,lastTs:null,now:performance.now(),resizeObserver:null,intersectionObserver:null,_motionMq:null,_motionHandler:null,setRadarThreatLevel:null,injectContact:null};f.ringHzBase=1/f.ringPopDuration,Tt.set(t,f);const g=t.closest(".s9-panel");g&&(g.classList.add("s9-panel--booting"),g.addEventListener("animationend",()=>g.classList.remove("s9-panel--booting"),{once:!0}));const m=new ResizeObserver(A=>{for(const w of A){const{width:v,height:y}=w.contentRect;if(v===0||y===0)return;const S=Math.floor(Math.min(v,y)/2)-8;if(S<=0)return;f.R=S,d.left=-S,d.right=S,d.top=S,d.bottom=-S,d.updateProjectionMatrix(),c.setSize(v,y),f.composer.setSize(v,y),f.bloomPass&&f.bloomPass.resolution.set(v,y),Gs(f)}});m.observe(t),f.resizeObserver=m;const b=new IntersectionObserver(A=>{A.forEach(w=>{f.rafRunning=w.isIntersecting,f.rafRunning&&!f.rafId&&(f.rafId=requestAnimationFrame(v=>to(f,v)))})},{threshold:0});b.observe(t),f.intersectionObserver=b;const _=matchMedia("(prefers-reduced-motion: reduce)"),x=()=>{f.reducedMotion=_.matches,f.reducedMotion?(f.sweepAngle=Math.PI*.15,clearTimeout(f.spawnTimer)):Ct(f)};_.addEventListener("change",x),f._motionMq=_,f._motionHandler=x,f.rafRunning=!0,f.rafId=requestAnimationFrame(A=>to(f,A)),f.reducedMotion||Ct(f);function M(A){const w=Math.max(0,Math.min(1,A));f.threatLevel=w,clearTimeout(f.spawnTimer),Ct(f)}function C(A,w,v){const y=["friendly","neutral","hostile"].includes(v)?v:"neutral",S=_o(f,A,Math.max(0,Math.min(1,w)),y);return S?S.id:""}return f.setRadarThreatLevel=M,f.injectContact=C,{setRadarThreatLevel:M,injectContact:C}}function Xs(t){const e=Tt.get(t);if(!e)return;const o=za();e.theme=o;const a=Me(o.neonGreen),n=Me(o.neonWarn),i=Me(o.neonAlert),r=Me(o.neonCyan),c=new B(o.neonCyan);if(e.backgroundMesh){const s=new B(o.voidColor);e.backgroundMesh.material.uniforms.uVoidColor.value.set(s.r,s.g,s.b),e.renderer.setClearColor(new B(o.voidColor),1)}if(e.matRingInner&&e.matRingInner.color.set(o.neonCyan),e.matRingOuter&&e.matRingOuter.color.set(o.neonCyan),e.matRingTicks&&e.matRingTicks.color.set(o.neonCyan),e.sweepTrailMesh&&e.sweepTrailMesh.material.uniforms.uColor.value.set(c.r,c.g,c.b),e.sweepArmLine&&e.sweepArmLine.material.color.set(o.neonCyan),e.contactDotsMesh){const s=e.contactDotsMesh.material.uniforms;s.uC0.value.set(...a),s.uC1.value.set(...n),s.uC2.value.set(...i),s.uC3.value.set(...r)}if(e.contactRingsMesh){const s=e.contactRingsMesh.material.uniforms;s.uC0.value.set(...a),s.uC1.value.set(...n),s.uC2.value.set(...i)}}const Ks=`
  attribute vec2 a_pos;
  varying vec2 vUv;
  void main() {
    vUv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }`,Zs=`
  precision mediump float;
  uniform sampler2D tDiffuse;
  uniform vec2  iResolution;
  uniform float uTime;
  uniform vec2  uImgOffset;
  uniform vec2  uImgScale;
  varying vec2  vUv;

  // ── Glitch uniforms ──────────────────────────────────────────
  uniform float uGlitchEnabled;   // 0 or 1
  uniform float uGlitchActive;    // 0 or 1 — JS-side sporadic trigger (in active burst)
  uniform float uGlitchStrength;  // 0 – 0.10, horizontal shift amount
  uniform float uGlitchSpeed;     // 1 – 30, block-pattern change rate (blocks/sec)
  uniform float uGlitchCols;      // 10 – 80, number of horizontal glitch bands
  uniform float uGlitchRgb;       // 0 – 1, RGB channel split strength

  // ── CRT shader uniforms ───────────────────────────────────────
  uniform float uHardPix;      // scanline sharpness, negative: -0.5 (soft) – -3.0 (sharp)
  uniform float uWarpMult;     // barrel distortion multiplier: 0 = flat, 1 = default, 2 = strong
  uniform float uMaskStr;      // phosphor mask strength: 0 = off, 1 = full
  uniform float uGrainAmt;     // film grain amount: 0 – 0.15
  uniform float uHalationStr;  // phosphor halation strength: 0 = off, 1 = default
  uniform float uConvergence;  // convergence error: 0 = off, 0.01 = subtle, 0.1 = obvious
  uniform sampler2D tScratch;  // glass scratch overlay (screen blend)
  uniform float uScratchStr;   // scratch opacity: 0 = off, 0.35 = default

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
  // Floor 0.15 → 10:1 active:inactive ratio; avg = 0.60 → visibly distinct stripes.
  vec3 Mask(vec2 pos) {
    float stripe = fract(pos.x / 3.0) * 3.0;
    vec3 mask = vec3(0.15);
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

  // Set by applyGlitch; read by main() for RGB split amount (in source pixels).
  float gRgbSplitPx = 0.0;

  vec2 applyGlitch(vec2 uv) {
    if (uGlitchEnabled < 0.5 || uGlitchActive < 0.5 || uGlitchStrength < 0.0001) return uv;

    float t = floor(uTime * uGlitchSpeed);

    // Weak vs strong glitch window (~15 % of windows are strong).
    float intensity = step(0.85, glitchHash(t * 3.1 + 17.3));
    float str = uGlitchStrength * mix(0.35, 1.0, intensity);

    // RGB split scales with intensity.
    gRgbSplitPx = uGlitchRgb * mix(1.5, 5.0, intensity);

    float band = floor(uv.y * uGlitchCols);
    float h1   = glitchHash(band * 137.3 + t);
    float h2   = glitchHash(band *  91.7 + t + 1.0);

    // Type 1 — thin band horizontal shift (~20 % of bands).
    if (h1 > 0.80) {
      uv.x = fract(uv.x + (h2 * 2.0 - 1.0) * str);
    }
    // Type 2 — large tear (~4 % of bands).
    else if (h1 < 0.04) {
      uv.x = fract(uv.x + (glitchHash(band + t * 7.3) - 0.5) * str * 3.5);
    }
    // Type 3 — UV mirror in band (~6 % of bands, strong windows only).
    else if (h1 > 0.72 && h1 < 0.78 && intensity > 0.5) {
      uv.x = 1.0 - uv.x;
    }

    // Type 4 — block chunk: one large rect displaced per time window.
    float blockRoll = glitchHash(t * 17.3 + 5.1);
    if (blockRoll < 0.35 + intensity * 0.35) {
      float blockY = glitchHash(t * 3.7  + 1.1);
      float blockH = 0.015 + glitchHash(t * 11.3) * 0.07 * (1.0 + intensity);
      if (abs(uv.y - blockY) < blockH) {
        uv.x = fract(uv.x + (glitchHash(t * 23.1) - 0.5) * str * 2.5);
      }
    }

    return uv;
  }

  void main() {
    vec2 pos = Warp(vUv);

    // 0. Glitch distortion (before any texture sampling)
    pos = applyGlitch(pos);

    // 1. Scanline rendering with dynamic beam width.
    // RGB split applied at UV level (signal corruption before beam reads it),
    // so shifted R/B channels go through horizontal scanline reconstruction too.
    vec3 col;
    if (uGlitchEnabled > 0.5 && uGlitchActive > 0.5 && gRgbSplitPx > 0.001) {
      float splitUv = gRgbSplitPx / iResolution.x;
      col   = Tri(pos);
      col.r = Horz5(pos + vec2(splitUv, 0.0), 0.0).r;
      col.b = Horz5(pos - vec2(splitUv, 0.0), 0.0).b;
    } else {
      col = Tri(pos);
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

    // 4b. Glass scratches (screen blend, locked to screen-space not image-space)
    if (uScratchStr > 0.001) {
      vec3 sTex = texture2D(tScratch, vUv).rgb;
      col = 1.0 - (1.0 - col) * (1.0 - sTex * uScratchStr);
    }

    // 5. Corner masking (bezel/overscan fade)
    col *= cornerMask(pos);

    // 6. CRT gamma encode
    col = ToCrtGamma(col);

    gl_FragColor = vec4(col, 1.0);
  }`;function oa(t,e,o){const a=t.createShader(e);return t.shaderSource(a,o),t.compileShader(a),t.getShaderParameter(a,t.COMPILE_STATUS)||console.error("Telescreen shader error:",t.getShaderInfoLog(a)),a}function Qs(t,e,o){const a=e.getContext("webgl");if(!a)return console.warn("Telescreen: WebGL not available"),{destroy(){}};const n=o.getContext("2d"),i={prog:null,buf:null,tex:null,aPos:-1,uLocs:{}};function r(){const v=a.createProgram();a.attachShader(v,oa(a,a.VERTEX_SHADER,Ks)),a.attachShader(v,oa(a,a.FRAGMENT_SHADER,Zs)),a.linkProgram(v),a.useProgram(v);const y=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,y),a.bufferData(a.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),a.STATIC_DRAW);const S=a.getAttribLocation(v,"a_pos");a.enableVertexAttribArray(S),a.vertexAttribPointer(S,2,a.FLOAT,!1,0,0);const p={res:a.getUniformLocation(v,"iResolution"),time:a.getUniformLocation(v,"uTime"),imgOffset:a.getUniformLocation(v,"uImgOffset"),imgScale:a.getUniformLocation(v,"uImgScale"),diffuse:a.getUniformLocation(v,"tDiffuse"),glitchEnabled:a.getUniformLocation(v,"uGlitchEnabled"),glitchActive:a.getUniformLocation(v,"uGlitchActive"),glitchStrength:a.getUniformLocation(v,"uGlitchStrength"),glitchSpeed:a.getUniformLocation(v,"uGlitchSpeed"),glitchCols:a.getUniformLocation(v,"uGlitchCols"),glitchRgb:a.getUniformLocation(v,"uGlitchRgb"),hardPix:a.getUniformLocation(v,"uHardPix"),warpMult:a.getUniformLocation(v,"uWarpMult"),maskStr:a.getUniformLocation(v,"uMaskStr"),grainAmt:a.getUniformLocation(v,"uGrainAmt"),halationStr:a.getUniformLocation(v,"uHalationStr"),convergence:a.getUniformLocation(v,"uConvergence"),scratch:a.getUniformLocation(v,"tScratch"),scratchStr:a.getUniformLocation(v,"uScratchStr")},T=a.createTexture();a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,T),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.uniform1i(p.diffuse,0),a.uniform1i(p.scratch,1);const D=a.createTexture();a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,D),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,new Uint8Array([0,0,0,255])),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.activeTexture(a.TEXTURE0),Object.assign(i,{prog:v,buf:y,tex:T,scratchTex:D,aPos:S,uLocs:p})}r();function c(){!s.complete||!s.naturalWidth||!i.scratchTex||(a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,i.scratchTex),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,s),a.activeTexture(a.TEXTURE0))}const s=new Image;s.onload=c,s.src="/data/scratches.jpg";let d=!1,h=null,l=!1,u=0,f=0,g=0;const m={glitchEnabled:0,glitchActive:0,glitchStrength:.025,glitchSpeed:8,glitchCols:30,glitchRgb:.5,glitchMaxDelay:3.5,glitchMaxBurst:.7,hardPix:-1.2,warpMult:1,maskStr:1,grainAmt:.04,halationStr:1,convergence:.01,scratchStr:.35};function b(){a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,i.tex),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,t),d=!0}function _(v,y,S,p){const T=Math.max(v/S,y/p)*.8,D=S*T,k=p*T;return{ox:(v-D)/2/v,oy:(y-k)/2/y,sx:D/v,sy:k/y}}function x(){const v=e.clientWidth||576,y=e.clientHeight||432;e.width=v,e.height=y,o.width=v,o.height=y,l||a.viewport(0,0,v,y)}function M(){if(!t.naturalWidth)return;const v=o.width,y=o.height,S=t.naturalWidth,p=t.naturalHeight,T=Math.max(v/S,y/p)*.8,D=S*T,k=p*T;n.clearRect(0,0,v,y),n.drawImage(t,(v-D)/2,(y-k)/2,D,k)}e.addEventListener("webglcontextlost",v=>{v.preventDefault(),l=!0}),e.addEventListener("webglcontextrestored",()=>{l=!1,d=!1,r(),x(),b(),c()});function C(v){u=requestAnimationFrame(C),h||(h=v);const y=(v-h)/1e3;if(d&&!l){if(m.glitchEnabled)if(y>=g){if(m.glitchActive=0,y>=f){const F=.08+Math.random()*m.glitchMaxBurst;g=y+F,f=y+F+.3+Math.random()*m.glitchMaxDelay,m.glitchActive=1}}else m.glitchActive=1;else m.glitchActive=0;const S=e.width,p=e.height,T=t.naturalWidth,D=t.naturalHeight,k=p/1,ie=S/p*k;a.uniform2f(i.uLocs.res,ie,k),a.uniform1f(i.uLocs.time,y);const Z=_(S,p,T,D);a.uniform2f(i.uLocs.imgOffset,Z.ox,Z.oy),a.uniform2f(i.uLocs.imgScale,Z.sx,Z.sy),a.uniform1f(i.uLocs.glitchEnabled,m.glitchEnabled),a.uniform1f(i.uLocs.glitchActive,m.glitchActive),a.uniform1f(i.uLocs.glitchStrength,m.glitchStrength),a.uniform1f(i.uLocs.glitchSpeed,m.glitchSpeed),a.uniform1f(i.uLocs.glitchCols,m.glitchCols),a.uniform1f(i.uLocs.glitchRgb,m.glitchRgb),a.uniform1f(i.uLocs.hardPix,m.hardPix),a.uniform1f(i.uLocs.warpMult,m.warpMult),a.uniform1f(i.uLocs.maskStr,m.maskStr),a.uniform1f(i.uLocs.grainAmt,m.grainAmt),a.uniform1f(i.uLocs.halationStr,m.halationStr),a.uniform1f(i.uLocs.convergence,m.convergence),a.uniform1f(i.uLocs.scratchStr,m.scratchStr),a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,i.scratchTex),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,i.tex),a.drawArrays(a.TRIANGLE_STRIP,0,4),M()}}function A(){x(),b(),M(),u=requestAnimationFrame(C)}t.complete&&t.naturalWidth?A():t.addEventListener("load",A);const w=new ResizeObserver(()=>{x(),M()});return w.observe(e),{destroy(){cancelAnimationFrame(u),w.disconnect()},setGlitch(v,y,S,p,T,D,k){m.glitchEnabled=v?1:0,m.glitchEnabled||(m.glitchActive=0,f=0,g=0),y!==void 0&&(m.glitchStrength=y),S!==void 0&&(m.glitchSpeed=S),p!==void 0&&(m.glitchCols=p),T!==void 0&&(m.glitchRgb=T),D!==void 0&&(m.glitchMaxDelay=D),k!==void 0&&(m.glitchMaxBurst=k)},setShader({hardPix:v,warpMult:y,maskStr:S,grainAmt:p,halationStr:T,convergence:D,scratchStr:k}={}){v!==void 0&&(m.hardPix=v),y!==void 0&&(m.warpMult=y),S!==void 0&&(m.maskStr=S),p!==void 0&&(m.grainAmt=p),T!==void 0&&(m.halationStr=T),D!==void 0&&(m.convergence=D),k!==void 0&&(m.scratchStr=k)}}}const aa=[{cls:"sigint",headline:"SIGNAL INTERCEPT: FREQ 12.4GHz",detail:"Encrypted burst tx — POSEIDON signature"},{cls:"humint",headline:"ASSET CONFIRM: NIIHAMA-04",detail:"Target movement: port district, 0300 local"},{cls:"cyber",headline:"ZERO-DAY: CVE-2026-3917",detail:"Legacy auth stack — remote exec payload ready"},{cls:"ghost",headline:"DIVE ANOMALY: SECTOR ALPHA",detail:"Ghost-barrier interference at 4.1m depth"},{cls:"elint",headline:"DRONE SWEEP: SECTOR 12",detail:"Coverage 73% — ETA 4 minutes to full map"},{cls:"sigint",headline:"PACKET STORM: 192.168.7.0/24",detail:"18k pps sustained — possible DDoS staging"},{cls:"cyber",headline:"EXFIL CHANNEL COMPROMISED",detail:"Fallback route DELTA-9 now primary exfil"},{cls:"humint",headline:"CONTACT LOST: ROMEO-7",detail:"Last check-in 03:14:22 UTC — status unknown"},{cls:"ghost",headline:"TACHIKOMA: AUTONOMOUS SWEEP",detail:"Unit 9 executing sector 7 independently"},{cls:"elint",headline:"EM PULSE DETECTED: ZONE 3",detail:"Localized disruption — comm nodes offline"},{cls:"sigint",headline:"NODE COMMS SPIKE: BEIJING",detail:"340% increase in encrypted P2P — 0300-0500"},{cls:"cyber",headline:"FIREWALL PROBE: AS12345",detail:"Systematic port sweep — countermeasures deployed"},{cls:"humint",headline:"BROKER IDENTIFIED: LAUGHING MAN",detail:"Dark web auction — biotech data linked to incident"},{cls:"ghost",headline:"GHOST PROTOCOL: BETA-3",detail:"Shell confirmed on target system — extract ready"},{cls:"elint",headline:"SAT PASS: KH-17 WINDOW",detail:"6 min coverage — imaging tasked to sector 4"}];function Js(t){const e=document.createElement("div");return e.className=`sigint-item sigint-item--${t.cls}`,e.innerHTML=`
    <div class="sigint-item__class">${t.cls.toUpperCase()}</div>
    <div class="sigint-item__headline">${t.headline}</div>
    <div class="sigint-item__detail">${t.detail}</div>
  `,e}function er(t){if(!t)return;const e=4,o=[];function a(){const n=new Set(o.map(h=>{var l;return(l=h.querySelector(".sigint-item__headline"))==null?void 0:l.textContent})),i=aa.filter(h=>!n.has(h.headline)),r=i.length>0?i:aa,c=r[Math.floor(Math.random()*r.length)],s=Js(c);t.insertBefore(s,t.firstChild),o.unshift(s),requestAnimationFrame(()=>s.classList.add("sigint-item--visible"));const d=8e3+Math.random()*12e3;for(setTimeout(()=>{s.classList.add("sigint-item--closing"),s.classList.remove("sigint-item--visible"),setTimeout(()=>{s.remove();const h=o.indexOf(s);h>=0&&o.splice(h,1)},500)},d);o.length>e;){const h=o.pop();h.classList.add("sigint-item--closing"),h.classList.remove("sigint-item--visible"),setTimeout(()=>h.remove(),500)}setTimeout(a,3e3+Math.random()*6e3)}setTimeout(a,800),setTimeout(a,2200)}const na=[{cls:"STRATEGIC",headline:"BIOMECH TREATY VOTE: 72HRS",detail:"Section 9 on standby for security detail"},{cls:"TACTICAL",headline:"LAUGHING MAN: ACTIVE",detail:"New sightings logged in Niihama and Togusa ward"},{cls:"ASSET",headline:"BATOU: FIELD POSITION UPDATE",detail:"Grid 7-Delta — visual on primary target"},{cls:"THREAT",headline:"PUPPET MASTER PROTOCOL",detail:"AI ghost-dive signatures — 3 confirmed nodes"},{cls:"STRATEGIC",headline:"ARAMAKI: SITUATION ROOM",detail:"Director briefing at 0600 UTC — attendance req"},{cls:"TACTICAL",headline:"TOGUSA: DEEP COVER",detail:"Identity: Muto Ryo — corporate embedded"},{cls:"THREAT",headline:"ROGUE TACHIKOMA UNIT",detail:"Unit 14 unresponsive — last GPS: Sector 9-Bravo"},{cls:"ASSET",headline:"ISHIKAWA: CYBER BREACH",detail:"Target mainframe penetrated — exfil in 180s"},{cls:"STRATEGIC",headline:"COMA CHIP EXPLOIT: CONFIRMED",detail:"Hardware vulnerability — 40k units affected"},{cls:"TACTICAL",headline:"HELICOPTER SUPPORT: STANDING BY",detail:"AH-6J on tarmac — ETA to sector: 4 min"}];function tr(t){const e=document.createElement("div");return e.className="intel-item",e.innerHTML=`
    <div class="intel-item__class">${t.cls}</div>
    <div class="intel-item__headline">${t.headline}</div>
    <div class="intel-item__detail">${t.detail}</div>
  `,e}function or(t){if(!t)return;const e=5,o=[];function a(){const n=new Set(o.map(h=>{var l;return(l=h.querySelector(".intel-item__headline"))==null?void 0:l.textContent})),i=na.filter(h=>!n.has(h.headline)),r=i.length>0?i:na,c=r[Math.floor(Math.random()*r.length)],s=tr(c);t.insertBefore(s,t.firstChild),o.unshift(s),requestAnimationFrame(()=>s.classList.add("intel-item--visible"));const d=1e4+Math.random()*15e3;for(setTimeout(()=>{s.classList.add("intel-item--closing"),s.classList.remove("intel-item--visible"),setTimeout(()=>{s.remove();const h=o.indexOf(s);h>=0&&o.splice(h,1)},500)},d);o.length>e;){const h=o.pop();h.classList.add("intel-item--closing"),h.classList.remove("intel-item--visible"),setTimeout(()=>h.remove(),500)}setTimeout(a,4e3+Math.random()*8e3)}setTimeout(a,1200),setTimeout(a,3500),setTimeout(a,5800)}function K(t,e){return Math.floor(Math.random()*(e-t+1))+t}const pe=()=>`${K(10,220)}.${K(0,255)}.${K(0,255)}.${K(1,254)}`,Vt=()=>[22,80,443,8443,4444,3389,21,1337,9999][Math.floor(Math.random()*9)],ar=()=>`${K(64,65535)}B`,nr=()=>Array.from({length:4},()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0")).join(" "),ia=[()=>({source:"AUTH",message:`HANDSHAKE COMPLETE — ${pe()}:${Vt()}`,alert:!1}),()=>({source:"NET",message:`PKT ${ar()} ${pe()} → ${pe()}`,alert:!1}),()=>({source:"GHOST",message:`DIVE DEPTH: ${(2+Math.random()*3).toFixed(1)}m — STABLE`,alert:!1}),()=>({source:"CRYPT",message:"AES-256 SESSION KEY ESTABLISHED",alert:!1}),()=>({source:"SCAN",message:`PROBE: ${pe()}:${Vt()} — ${nr()}`,alert:!0}),()=>({source:"SYS",message:`MEM ${K(60,92)}% CPU ${K(20,80)}% THERMAL OK`,alert:!1}),()=>({source:"NET",message:`LATENCY ${K(4,45)}ms — ${Math.random()<.8?"NOMINAL":"DEGRADED"}`,alert:Math.random()<.2}),()=>({source:"AUTH",message:`TOKEN REFRESH: UID-${K(1e3,9999)}`,alert:!1}),()=>({source:"CRIT",message:`INTRUSION SIG: ${pe()} PORT ${Vt()}`,alert:!0}),()=>({source:"SYS",message:`COUNTERMEASURE DEPLOYED — BLOCK RULE ${K(100,999)}`,alert:!1}),()=>({source:"NET",message:`ROUTE CHANGE: AS${K(1e3,65e3)} VIA ${pe()}`,alert:!1}),()=>({source:"CRYPT",message:`TLS 1.3 HANDSHAKE: ${pe()} — ${K(0,1)?"ECDH":"RSA"}-4096`,alert:!1}),()=>({source:"SCAN",message:`ANOMALY: BURST ${K(800,9999)} PPS FROM ${pe()}`,alert:!0}),()=>({source:"GHOST",message:`GHOST COEFFICIENT: ${(92+Math.random()*8).toFixed(1)}%`,alert:!1}),()=>({source:"AUTH",message:`CERT CHAIN VALID — SHA-${K(0,1)?"256":"512"}`,alert:!1}),()=>({source:"NET",message:`DNS RESOLVE: ${["niihama.net","togusa.local","sec9.gov","puppet.io"][Math.floor(Math.random()*4)]}`,alert:!1}),()=>({source:"SYS",message:`FIREWALL RULE ${K(1e3,9999)}: DROP ${pe()}/${K(24,32)}`,alert:!1}),()=>({source:"CRIT",message:`ZERO-DAY ATTEMPT: ${pe()} — MITIGATED`,alert:!0})];function ir(t,e){function o(){const a=ia[Math.floor(Math.random()*ia.length)];e(t,{timestamp:new Date().toISOString(),...a()})}for(let a=0;a<8;a++)o();setInterval(o,K(1200,2800))}function Ee(t,e){return Math.floor(Math.random()*(e-t+1))+t}const Pe=[{id:"n-tokyo",lat:35.68,lng:139.69,label:"TOKYO"},{id:"n-moscow",lat:55.75,lng:37.62,label:"MOSCOW"},{id:"n-beijing",lat:39.91,lng:116.39,label:"BEIJING"},{id:"n-london",lat:51.51,lng:-.13,label:"LONDON"},{id:"n-nyc",lat:40.71,lng:-74,label:"NEW YORK"},{id:"n-sydney",lat:-33.87,lng:151.21,label:"SYDNEY"},{id:"n-dubai",lat:25.2,lng:55.27,label:"DUBAI"},{id:"n-saopaulo",lat:-23.55,lng:-46.63,label:"SÃO PAULO"},{id:"n-paris",lat:48.86,lng:2.35,label:"PARIS"},{id:"n-seoul",lat:37.57,lng:126.98,label:"SEOUL"},{id:"n-cairo",lat:30.05,lng:31.24,label:"CAIRO"},{id:"n-berlin",lat:52.52,lng:13.41,label:"BERLIN"},{id:"n-mumbai",lat:19.08,lng:72.88,label:"MUMBAI"},{id:"n-toronto",lat:43.65,lng:-79.38,label:"TORONTO"},{id:"n-singapore",lat:1.35,lng:103.82,label:"SINGAPORE"},{id:"n-nairobi",lat:-1.29,lng:36.82,label:"NAIROBI"},{id:"n-istanbul",lat:41.01,lng:28.97,label:"ISTANBUL"},{id:"n-lagos",lat:6.52,lng:3.38,label:"LAGOS"}],Wa={"n-tokyo":{country:"JAPAN",pop:"13.96M",status:"FINANCIAL HUB"},"n-moscow":{country:"RUSSIA",pop:"12.51M",status:"RESTRICTED"},"n-beijing":{country:"CHINA",pop:"21.54M",status:"RESTRICTED"},"n-london":{country:"UK",pop:"8.98M",status:"ALLIED NODE"},"n-nyc":{country:"USA",pop:"8.34M",status:"ALLIED NODE"},"n-sydney":{country:"AUSTRALIA",pop:"5.31M",status:"ALLIED NODE"},"n-dubai":{country:"UAE",pop:"3.33M",status:"NEUTRAL ZONE"},"n-saopaulo":{country:"BRAZIL",pop:"12.33M",status:"MONITORED"},"n-paris":{country:"FRANCE",pop:"2.15M",status:"ALLIED NODE"},"n-seoul":{country:"S.KOREA",pop:"9.78M",status:"ALLIED NODE"},"n-cairo":{country:"EGYPT",pop:"10.08M",status:"MONITORED"},"n-berlin":{country:"GERMANY",pop:"3.66M",status:"ALLIED NODE"},"n-mumbai":{country:"INDIA",pop:"20.67M",status:"MONITORED"},"n-toronto":{country:"CANADA",pop:"2.93M",status:"ALLIED NODE"},"n-singapore":{country:"SINGAPORE",pop:"5.45M",status:"NEUTRAL ZONE"},"n-nairobi":{country:"KENYA",pop:"4.40M",status:"MONITORED"},"n-istanbul":{country:"TURKEY",pop:"15.46M",status:"NEUTRAL ZONE"},"n-lagos":{country:"NIGERIA",pop:"14.86M",status:"MONITORED"}},Lt=Pe.slice(0,8),$a=[15,72,55,18,28,10,45,33];function ja(t){let e=t.split("").reduce((s,d)=>s*31+d.charCodeAt(0)>>>0,7);const o=()=>(e=e*1664525+1013904223>>>0,(e>>>16)/65535),a=9,n=140,i=34,r=n/a;let c=`<svg viewBox="0 0 ${n} ${i}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;height:34px;">`;c+='<g fill="currentColor">';for(let s=0;s<a;s++){const d=8+o()*24,h=r*(.48+o()*.44),l=s*r+(r-h)*.5;c+=`<rect x="${l.toFixed(1)}" y="${(i-d).toFixed(1)}" width="${h.toFixed(1)}" height="${d.toFixed(1)}"/>`}return c+="</g></svg>",c}function sr(t,e,o,a){const{addNode:n,removeNode:i,updateNodeLevel:r,setThreatLevel:c,setActiveNode:s,focusNode:d,pulseGlobeNode:h,spawnArc:l,appendRow:u,printLine:f,setRadarThreatLevel:g}=a,m=new Map;function b(w,v){t.dispatchEvent(new CustomEvent("s9:alert",{bubbles:!0,detail:{level:v>=70?"critical":"warning",source:w}}))}function _(w,v){n(t,{...w,level:v}),m.set(w.id,v),u(e,{timestamp:new Date().toISOString(),source:"NET",message:`NODE ONLINE: ${w.label} — LVL ${v}`,alert:v>=70}),v>=70&&(b(w.label,v),s(t,w.id),d(t,w.id))}Lt.forEach((w,v)=>{setTimeout(()=>{_(w,$a[v]),v===Lt.length-1&&setTimeout(()=>{c(t,55),g(.55)},800)},v*300+500)});let x=!1;function M(){if(x)return;const w=[...m.keys()],v=Pe.filter(S=>!m.has(S.id)),y=Math.random();if(y<.28&&v.length>0){const S=v[Ee(0,v.length-1)],p=Ee(5,65);_(S,p),f(o,`SIGNAL ACQUIRED: ${S.label}`,"sys")}else if(y<.42&&w.length>5){const S=w[Ee(0,w.length-1)],p=Pe.find(T=>T.id===S);i(t,S),m.delete(S),f(o,`SIGNAL LOST: ${(p==null?void 0:p.label)??S}`,"info"),u(e,{timestamp:new Date().toISOString(),source:"NET",message:`NODE OFFLINE: ${(p==null?void 0:p.label)??S}`,alert:!1})}else if(y<.72&&w.length>0){const S=w[Ee(0,w.length-1)],p=Pe.find(F=>F.id===S),T=m.get(S)??0,D=Ee(8,28),k=Math.min(100,T+D);r(t,S,k),m.set(S,k),c(t,Math.max(...Array.from(m.values()))),g(Math.max(...Array.from(m.values()))/100),f(o,`THREAT ESCALATION: ${(p==null?void 0:p.label)??S} ${T}→${k}`,k>=70?"err":"sys"),u(e,{timestamp:new Date().toISOString(),source:"CRIT",message:`THREAT UP: ${(p==null?void 0:p.label)??S} LVL=${k}`,alert:k>=70}),k>=70&&T<70&&(b((p==null?void 0:p.label)??S,k),s(t,S),d(t,S));const ie=T>=70?2:T>=40?1:0,Z=k>=70?2:k>=40?1:0;ie!==Z&&h(t,S)}else if(w.length>0){const S=w[Ee(0,w.length-1)],p=Pe.find(Z=>Z.id===S),T=m.get(S)??50,D=Math.max(0,T-Ee(5,18));r(t,S,D),m.set(S,D),c(t,Math.max(0,...Array.from(m.values()))),g(Math.max(0,...Array.from(m.values()))/100),f(o,`THREAT REDUCED: ${(p==null?void 0:p.label)??S} LVL=${D}`,"info");const k=T>=70?2:T>=40?1:0,ie=D>=70?2:D>=40?1:0;k!==ie&&h(t,S)}if(w.length>=2){const S=1+Math.floor(Math.random()*3);for(let p=0;p<S;p++){const T=w[Math.floor(Math.random()*w.length)];let D=w[Math.floor(Math.random()*w.length)];D===T&&(D=w[(w.indexOf(T)+1)%w.length]),D!==T&&l(t,T,D)}}setTimeout(M,Ee(4e3,9e3))}setTimeout(M,Lt.length*300+2500);const C=setInterval(()=>{const w=[...m.keys()];if(w.length<2)return;const v=Math.random()<.4?2:1;for(let y=0;y<v;y++){const S=w[Math.floor(Math.random()*w.length)];let p=w[Math.floor(Math.random()*w.length)];p===S&&(p=w[(w.indexOf(S)+1)%w.length]),p!==S&&l(t,S,p)}},1200),A=setInterval(()=>{const w=[...m.entries()].filter(([,T])=>T>=70);if(w.length===0)return;const v=t.getAttribute("data-active-node"),y=w.filter(([T])=>T!==v),S=y.length>0?y:w,[p]=S[Math.floor(Math.random()*S.length)];s(t,p),d(t,p)},8e3);return{globeNodes:m,destroy(){x=!0,clearInterval(C),clearInterval(A)}}}function rr(t,e,o,a,n){const{initThreatMap:i,addNode:r,removeNode:c,updateNodeLevel:s,setThreatLevel:d,setActiveNode:h,focusNode:l}=n;i(t,{autoRotate:!0,bloomStrength:.7});const u=new Map;e.forEach((v,y)=>{setTimeout(()=>{r(t,{...v,level:o[y]}),u.set(v.id,o[y])},y*200+300)}),setTimeout(()=>d(t,55),e.length*200+800);const f=document.getElementById("tact-node-info"),g=document.getElementById("tact-btn-add"),m=document.getElementById("tact-btn-remove"),b=document.getElementById("tact-btn-focus"),_=document.getElementById("tact-btn-deselect"),x=document.getElementById("tact-level-slider"),M=document.getElementById("tact-level-val"),C=document.getElementById("tact-level-row");let A=null;function w(){const v=A!==null&&u.has(A);if(m.disabled=!v,b.disabled=!v,_.disabled=!v,x.disabled=!v,C.style.opacity=v?"1":"0.4",C.style.pointerEvents=v?"auto":"none",v){const y=a.find(p=>p.id===A),S=u.get(A);f.textContent=`${(y==null?void 0:y.label)??A} — LVL ${S}`,x.value=S,M.textContent=S}else f.textContent="NO NODE SELECTED"}t.addEventListener("s9:threatmap-node-select",v=>{A=v.detail.nodeId,document.getElementById("tactical-threat").textContent=`THREAT: ${v.detail.level} — ${v.detail.label}`,w()}),t.addEventListener("s9:threatmap-node-deselect",()=>{A=null,w()}),g.addEventListener("click",()=>{const v=a.filter(p=>!u.has(p.id));if(v.length===0)return;const y=v[Math.floor(Math.random()*v.length)],S=Math.floor(Math.random()*60)+10;r(t,{...y,level:S}),u.set(y.id,S),d(t,Math.max(...u.values())),h(t,y.id),l(t,y.id)}),m.addEventListener("click",()=>{A&&(c(t,A),u.delete(A),d(t,u.size>0?Math.max(...u.values()):0),A=null,w())}),b.addEventListener("click",()=>{A&&l(t,A)}),_.addEventListener("click",()=>{h(t,null),A=null,w()}),x.addEventListener("input",()=>{if(!A)return;const v=parseInt(x.value);M.textContent=v,s(t,A,v),u.set(A,v),d(t,Math.max(...u.values()));const y=a.find(S=>S.id===A);f.textContent=`${(y==null?void 0:y.label)??A} — LVL ${v}`}),w()}const gt=[{id:"sec9",label:"SEC.9 HQ",x:50,y:50,root:!0},{id:"niihama",label:"NIIHAMA",x:22,y:22},{id:"togusa",label:"TOGUSA",x:78,y:22},{id:"batou",label:"BATOU",x:78,y:78},{id:"ishikawa",label:"ISHIKAWA",x:22,y:78},{id:"relay1",label:"RELAY ALPHA",x:36,y:32},{id:"relay2",label:"RELAY BETA",x:64,y:32},{id:"relay3",label:"RELAY GAMMA",x:36,y:68},{id:"relay4",label:"RELAY DELTA",x:64,y:68},{id:"ext1",label:"PUPPET MASTER",x:12,y:50},{id:"ext2",label:"LAUGHING MAN",x:88,y:50},{id:"tachi",label:"TACHIKOMA U9",x:50,y:12}],sa=[{id:"e01",from:"sec9",to:"relay1"},{id:"e02",from:"sec9",to:"relay2"},{id:"e03",from:"sec9",to:"relay3"},{id:"e04",from:"sec9",to:"relay4"},{id:"e05",from:"relay1",to:"niihama"},{id:"e06",from:"relay2",to:"togusa"},{id:"e07",from:"relay3",to:"ishikawa"},{id:"e08",from:"relay4",to:"batou"},{id:"e09",from:"niihama",to:"ext1"},{id:"e10",from:"ext1",to:"relay3"},{id:"e11",from:"togusa",to:"relay1"},{id:"e12",from:"batou",to:"relay2"},{id:"e13",from:"ext2",to:"relay2"},{id:"e14",from:"ext2",to:"relay4"},{id:"e15",from:"sec9",to:"tachi"},{id:"e16",from:"relay1",to:"relay2"},{id:"e17",from:"relay3",to:"relay4"}],qt={relay2:72,relay4:88,ext1:95,ext2:80,niihama:45,batou:55};function lr(t,e){if(!t)return;const{initMatrix:o,activateEdge:a,deactivateEdge:n,pulseNode:i,setActiveNode:r}=e;o(t,{nodes:gt,edges:sa});for(const[l,u]of Object.entries(qt)){const f=t.querySelector(`[data-node-id="${l}"]`);f&&(u>=70?f.classList.add("s9-matrix__node--threat-high"):u>=40&&f.classList.add("s9-matrix__node--threat-mid"))}r(t,"ext1");const c=sa.map(l=>l.id),s=new Set,d=[null,null,"var(--neon-warn)","var(--neon-alert)","var(--neon-green)",null];function h(){if(s.size>0){const g=[...s],m=g[Math.floor(Math.random()*g.length)];n(t,m),s.delete(m)}const l=c.filter(g=>!s.has(g)),u=Math.random()<.4?2:1;for(let g=0;g<u&&l.length>0;g++){const m=l.splice(Math.floor(Math.random()*l.length),1)[0],b=d[Math.floor(Math.random()*d.length)];a(t,m,b),s.add(m)}if(Math.random()<.35){const g=gt[Math.floor(Math.random()*gt.length)];i(t,g.id)}const f=document.getElementById("flow-overlay");if(f){const g=Object.values(qt).filter(_=>_>=70).length,m=Object.values(qt).filter(_=>_>=40&&_<70).length,b=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";f.innerHTML=`<span style="font-family:var(--font-terminal);font-size: 0.7rem;color:${b};opacity:0.7">NODES: ${gt.length} &nbsp; <span style="color:var(--text-alert)">CRIT: ${g}</span> &nbsp; <span style="color:var(--neon-warn)">WARN: ${m}</span></span>`}}for(let l=0;l<4;l++){const u=c[Math.floor(Math.random()*c.length)];s.has(u)||(a(t,u),s.add(u))}setInterval(h,700),h(),document.getElementById("matrix-status").textContent="● LIVE"}const Va=new WeakMap;function cr(t,{onSubmit:e,tabComplete:o}={}){const a=new AbortController,{signal:n}=a,i=window.matchMedia("(prefers-reduced-motion: reduce)").matches,r={abortController:a,history:[],historyIndex:-1,partialInput:"",reducedMotion:i};Va.set(t,r);const c=t.querySelector(".s9-terminal__input");c&&c.addEventListener("keydown",s=>{ur(t,s,{onSubmit:e,tabComplete:o})},{signal:n})}function I(t,e,o){const a=t.querySelector(".s9-terminal__output");if(!a)return;const n=document.createElement("span");n.className=`s9-terminal__line s9-terminal__line--${o}`,n.textContent=e,a.appendChild(n);const i=200,r=a.querySelectorAll(".s9-terminal__line");r.length>i&&r[0].remove(),hr(a)}function dr(t){const e=t.querySelector(".s9-terminal__output");e&&(e.querySelectorAll(".s9-terminal__line").forEach(o=>o.remove()),t.dispatchEvent(new CustomEvent("s9:terminal-clear",{bubbles:!0})))}function ur(t,e,{onSubmit:o,tabComplete:a}){const n=Va.get(t);if(!n)return;const i=t.querySelector(".s9-terminal__input");if(i)switch(e.key){case"Enter":{const r=i.value;if(!r)return;I(t,r,"cmd"),typeof o=="function"&&o(r),t.dispatchEvent(new CustomEvent("s9:terminal-submit",{bubbles:!0,detail:{command:r,timestamp:new Date().toISOString()}})),n.history.unshift(r),n.historyIndex=-1,n.partialInput="",i.value="";break}case"ArrowUp":{if(e.preventDefault(),n.history.length===0)return;n.historyIndex===-1&&(n.partialInput=i.value);const r=n.historyIndex+1;if(r<n.history.length){n.historyIndex=r,i.value=n.history[n.historyIndex];const c=i.value.length;i.setSelectionRange(c,c)}break}case"ArrowDown":{if(e.preventDefault(),n.historyIndex===-1)return;if(n.historyIndex>0){n.historyIndex-=1,i.value=n.history[n.historyIndex];const r=i.value.length;i.setSelectionRange(r,r)}else{n.historyIndex=-1,i.value=n.partialInput;const r=i.value.length;i.setSelectionRange(r,r)}break}case"Tab":{if(e.preventDefault(),typeof a=="function"){const r=a(i.value);r!=null&&(i.value=r)}break}default:{if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!n.reducedMotion&&Math.random()<.01){const r=t.querySelector(".s9-terminal__output");if(r){const s=Array.from(r.querySelectorAll(".s9-terminal__line")).slice(-8);if(s.length>0){const d=s[Math.floor(Math.random()*s.length)];d.classList.add("glitch-enter"),d.addEventListener("animationend",h=>{h.animationName==="glitch"&&d.classList.remove("glitch-enter")},{once:!0})}}}break}}}function hr(t){t.scrollTop=t.scrollHeight}const Dt={"":"MATRIX GREEN",gits:"GHOST IN THE SHELL",amber:"AMBER",phosphor:"PHOSPHOR",blood:"BLOOD"};let qa=null,Ya=null,oo=null,ra=null,la=null;function Xa(t){const e=document.documentElement;t===""||t==="matrixgreen"?delete e.dataset.theme:e.dataset.theme=t,document.querySelectorAll(".topbar__theme-btn").forEach(o=>{o.classList.toggle("topbar__theme-btn--active",(o.dataset.themeSet??"")===(t==="matrixgreen"?"":t))}),Ko(qa),oo&&oo()&&Ko(document.getElementById("threatmap-tactical")),Xs(Ya)}function fr({threatEl:t,radarEl:e,getTacticalInited:o,termEl:a,printLine:n}){qa=t,Ya=e,oo=o,ra=a,la=n,document.querySelectorAll(".topbar__theme-btn").forEach(i=>{i.addEventListener("click",()=>{const r=i.dataset.themeSet??"";Xa(r),la(ra,`THEME: ${Dt[r]??r.toUpperCase()}`,"sys")})})}function ca(){const t=new Date;document.getElementById("topbar-clock").textContent=`UTC ${t.toUTCString().split(" ")[4]}`}function mr(){ca(),setInterval(ca,1e3)}function pr({termEl:t,applyTheme:e,globeNodes:o,metrics:a,radar:n,threatEl:i,updateNodeLevel:r,setThreatLevel:c,setActiveNode:s,focusNode:d,CITY_POOL:h,CITY_DATA:l,citySkyline:u,npCity:f,npSkyline:g,npCountry:m,npPop:b,npCoords:_,npThreat:x,npStatus:M,nodePopup:C}){cr(t,{onSubmit(A){var S;const w=A.trim().split(/\s+/),v=w[0].toLowerCase(),y=w.slice(1);switch(v){case"help":I(t,"SECTION 9 COMMAND INTERFACE — AVAILABLE COMMANDS:","sys"),I(t,"  status              — system status report","info"),I(t,"  ghost               — ghost coefficient analysis","info"),I(t,"  nodes               — list active threat nodes","info"),I(t,"  threat <lvl>        — set global threat level 0-100","info"),I(t,"  threat <id> <lvl>   — set node threat level","info"),I(t,"  focus <id>          — focus camera on node","info"),I(t,"  theme <name>        — switch theme","info"),I(t,"  themes              — list available themes","info"),I(t,"  clear               — clear terminal","info");break;case"status":{const p=o.size,T=[...o.values()].filter(k=>k>=70).length,D=p>0?Math.max(...o.values()):0;I(t,"── SYSTEM STATUS ──────────────────────────","sys"),I(t,`  CPU: ${a.cpu}%   MEM: ${a.mem}%   NET I/O: ${a.net}%`,"info"),I(t,`  GHOST LAYER: ${a.ghost}%   ENCRYPTION: ${a.enc}%`,"info"),I(t,`  NODES ON GRID: ${p}   CRITICAL: ${T}`,T>0?"err":"info"),I(t,`  PEAK THREAT: ${D}   GLOBAL LEVEL: ${D}`,D>=70?"err":"sys"),I(t,"  SECURE CHANNEL: ACTIVE   ENCRYPTION: AES-256","info");break}case"ghost":{const p=a.ghostCoeff.toFixed(1);I(t,"── GHOST COEFFICIENT ANALYSIS ─────────────","sys"),I(t,`  COEFFICIENT: ${p}%   BARRIER: NOMINAL`,"info"),I(t,"  CYBER BRAIN: SECTION 9 CLEARANCE ALPHA-7","info"),I(t,"  DIVE DEPTH: STABLE 3.2m   TACHIKOMA LINK: ACTIVE","info"),I(t,"  IDENTITY: CONFIRMED — KUSANAGI.M",p>=95?"sys":"err");break}case"nodes":{if(o.size===0){I(t,"NO NODES ON GRID","info");break}I(t,`ACTIVE NODES (${o.size}):`,"sys");for(const[p,T]of o){const D=h.find(Z=>Z.id===p),k=(D==null?void 0:D.label)??p,ie=T>=70?"err":T>=40?"sys":"info";I(t,`  ${p.padEnd(14)} ${k.padEnd(12)} LVL=${T}`,ie)}break}case"threat":{if(y.length===0){I(t,`GLOBAL THREAT: ${Math.max(0,...o.values())}`,"sys");break}if(y.length>=2&&isNaN(parseInt(y[0]))){const p=y[0],T=parseInt(y[1]);if(!o.has(p)){I(t,`ERR: node '${p}' not found — use NODES to list`,"err");break}if(isNaN(T)||T<0||T>100){I(t,"ERR: level must be 0-100","err");break}const D=r(i,p,T);o.set(p,T),c(i,Math.max(0,...o.values())),n.setRadarThreatLevel(Math.max(0,...o.values())/100),I(t,`NODE ${p}: ${D} → ${T}`,T>=70?"err":"sys"),T>=70&&D<70&&(s(i,p),d(i,p))}else{const p=parseInt(y[0]);if(isNaN(p)||p<0||p>100){I(t,"ERR: level must be 0-100","err");break}c(i,p),n.setRadarThreatLevel(p/100),I(t,`GLOBAL THREAT LEVEL SET: ${p}`,"sys")}break}case"focus":{const p=y[0];if(!p){I(t,"ERR: focus requires a node id — use NODES to list","err");break}if(!o.has(p)){I(t,`ERR: node '${p}' not found`,"err");break}s(i,p),d(i,p);const T=h.find(D=>D.id===p);I(t,`CAMERA FOCUSED: ${(T==null?void 0:T.label)??p}`,"sys");break}case"theme":{const p=((S=y[0])==null?void 0:S.toLowerCase())??"";if(p===""||p==="matrixgreen"){e(""),I(t,"THEME: MATRIX GREEN","sys");break}if(!Object.keys(Dt).includes(p)){I(t,`ERR: unknown theme '${p}' — use THEMES to list`,"err");break}e(p),I(t,`THEME: ${Dt[p]}`,"sys");break}case"themes":I(t,"AVAILABLE THEMES:","sys");for(const[p,T]of Object.entries(Dt))I(t,`  ${(p||"matrixgreen").padEnd(14)} ${T}`,"info");break;case"clear":dr(t),I(t,"TERMINAL CLEARED","sys");break;default:v&&I(t,`ERR: unknown command '${A}' — type HELP`,"err")}},tabComplete(A){return["help","status","ghost","nodes","threat","focus","theme","themes","clear"].find(v=>v.startsWith(A.toLowerCase()))??null}}),I(t,"SECTION 9 OPERATIVE INTERFACE — TYPE HELP FOR COMMANDS","sys"),I(t,"GHOST BABEL OPERATION: ACTIVE","info")}const Ka={easeInOutCubic:Oa,easeOutExpo:Ba,backInOut:Ci,linear:Ti},Za={default:{label:"Default",lineColor:65484,glowColor:65484,opacity:.72,glowOpacity:.28,emissiveIntensity:1.8,stagger:.55,ringFade:.35,warpAmount:.12,direction:"south-to-north",easingKey:"easeInOutCubic",durationMs:2200},pulse:{label:"Pulse",lineColor:16711782,lineColorB:16737792,glowColor:16711748,glowColorB:16729088,opacity:.95,glowOpacity:.55,emissiveIntensity:6,stagger:1,ringFade:.1,warpAmount:.2,direction:"equator-out",easingKey:"easeOutExpo",durationMs:1400,glowLayers:5},scanner:{label:"Scanner",lineColor:65382,glowColor:47940,opacity:.9,glowOpacity:.35,emissiveIntensity:3,stagger:.96,ringFade:.07,warpAmount:.03,direction:"south-to-north",easingKey:"linear",durationMs:2200},cosmic:{label:"Cosmic",lineColor:10044671,lineColorB:61183,glowColor:5579468,glowColorB:39355,opacity:.75,glowOpacity:.38,emissiveIntensity:2.8,stagger:.48,ringFade:.38,warpAmount:.24,direction:"equator-out",easingKey:"easeInOutCubic",durationMs:3200},ignition:{label:"Ignition",lineColor:16772608,lineColorB:16720384,glowColor:16750848,glowColorB:16716032,opacity:.95,glowOpacity:.55,emissiveIntensity:5.5,stagger:.88,ringFade:.2,warpAmount:.5,direction:"south-to-north",easingKey:"backInOut",durationMs:1600,glowLayers:4},ghost:{label:"Ghost",lineColor:8956671,lineColorB:4491519,glowColor:4495871,glowColorB:2245836,opacity:.28,glowOpacity:.07,emissiveIntensity:.8,stagger:.68,ringFade:.58,warpAmount:.42,direction:"north-to-south",easingKey:"easeOutExpo",durationMs:4500},neon:{label:"Neon",lineColor:16711935,lineColorB:65535,glowColor:13369599,glowColorB:65484,opacity:.85,glowOpacity:.45,emissiveIntensity:4.5,stagger:.62,ringFade:.28,warpAmount:.16,direction:"south-to-north",easingKey:"easeOutExpo",durationMs:2e3,glowLayers:5},solar:{label:"Solar",lineColor:16777215,lineColorB:16742144,glowColor:16768256,glowColorB:16724736,opacity:.8,glowOpacity:.5,emissiveIntensity:6,stagger:1,ringFade:.18,warpAmount:.1,direction:"equator-out",easingKey:"easeOutExpo",durationMs:1600,glowLayers:4},arctic:{label:"Arctic",lineColor:61183,lineColorB:15663103,glowColor:8978431,glowColorB:13434879,opacity:.62,glowOpacity:.22,emissiveIntensity:2,stagger:.42,ringFade:.42,warpAmount:.1,direction:"north-to-south",easingKey:"easeInOutCubic",durationMs:3e3},alert:{label:"Alert",lineColor:16746496,lineColorB:16711680,glowColor:16733440,glowColorB:13369344,opacity:.92,glowOpacity:.48,emissiveIntensity:4.5,stagger:.78,ringFade:.22,warpAmount:.22,direction:"equator-out",easingKey:"backInOut",durationMs:1600},ember:{label:"Ember",lineColor:16763904,lineColorB:16724736,glowColor:16750848,glowColorB:16716032,opacity:.68,glowOpacity:.32,emissiveIntensity:3.5,stagger:.62,ringFade:.52,warpAmount:.38,direction:"south-to-north",easingKey:"backInOut",durationMs:3800,glowLayers:3}};let E=null,be=!1,Rt=null;function Qa(){Rt!==null&&(clearTimeout(Rt),Rt=null)}function Yt(t,e){Qa(),t<=0?e():Rt=setTimeout(e,t)}function De(){be=!1,Qa(),E&&E.stop(),document.getElementById("rr-loop").classList.remove("active")}function Ja(t){if(!E)return;const e=document.getElementById("rr-loopMode").value,o=+document.getElementById("rr-pause").value;e==="play-reverse"?(E.reset(),E.play(()=>Yt(o,()=>{be&&E.reverse(()=>Yt(o,t))}))):(E.reset(),E.play(()=>Yt(o,t)))}function en(){be&&Ja(()=>{be&&en()})}function gr(t,e=!0){var i;const o=Za[t];if(!o||!E)return;if(document.querySelectorAll("#rr-presets button").forEach(r=>r.classList.remove("active")),(i=document.getElementById(`rr-pre-${t}`))==null||i.classList.add("active"),E._options.durationMs=o.durationMs,o.direction){document.getElementById("rr-dir").value=o.direction;const c={"south-to-north":0,"north-to-south":1,"equator-out":2}[o.direction]??0;E._baseRings.material.uniforms.uDirection.value=c,E._glowLayers.forEach(s=>{s.material.uniforms.uDirection.value=c}),E._options.direction=o.direction}o.easingKey&&(document.getElementById("rr-easing").value=o.easingKey,E._options.easingFn=Ka[o.easingKey]),document.getElementById("rr-dur").value=o.durationMs,document.getElementById("rr-vDur").textContent=o.durationMs;const a=e?+document.getElementById("rr-morphDur").value:0;E.morphTo({lineColor:o.lineColor,lineColorB:o.lineColorB??o.lineColor,glowColor:o.glowColor,glowColorB:o.glowColorB??o.glowColor,opacity:o.opacity,glowOpacity:o.glowOpacity,emissiveIntensity:o.emissiveIntensity,stagger:o.stagger,warpAmount:o.warpAmount,ringFade:o.ringFade,glowLayers:o.glowLayers??3,glowLayerRadiusStep:o.glowLayerRadiusStep??.004,glowLayerOpacityFalloff:o.glowLayerOpacityFalloff??.5},a);const n=(r,c,s,d)=>{c!==void 0&&(document.getElementById(r).value=c,s&&(document.getElementById(s).textContent=d?d(c):c))};if(n("rr-opacity",o.opacity!==void 0?Math.round(o.opacity*100):void 0,"rr-vOpacity",r=>(r/100).toFixed(2)),n("rr-glowOp",o.glowOpacity!==void 0?Math.round(o.glowOpacity*100):void 0,"rr-vGlowOp",r=>(r/100).toFixed(2)),n("rr-emissive",o.emissiveIntensity!==void 0?Math.round(o.emissiveIntensity*100):void 0,"rr-vEmissive",r=>(r/100).toFixed(2)),n("rr-stagger",o.stagger!==void 0?Math.round(o.stagger*100):void 0,"rr-vStagger",r=>(r/100).toFixed(2)),n("rr-warp",o.warpAmount!==void 0?Math.round(o.warpAmount*100):void 0,"rr-vWarp",r=>(r/100).toFixed(2)),o.ringFade!==void 0){const r=Math.max(.001,o.ringFade);n("rr-ringFade",Math.round(r*100),"rr-vRingFade",c=>(c/100).toFixed(2))}o.lineColor!==void 0&&(document.getElementById("rr-colLine").value="#"+o.lineColor.toString(16).padStart(6,"0")),o.lineColorB!==void 0&&(document.getElementById("rr-colLineB").value="#"+(o.lineColorB??o.lineColor).toString(16).padStart(6,"0")),o.glowColor!==void 0&&(document.getElementById("rr-colGlow").value="#"+o.glowColor.toString(16).padStart(6,"0")),o.glowColorB!==void 0&&(document.getElementById("rr-colGlowB").value="#"+(o.glowColorB??o.glowColor).toString(16).padStart(6,"0"))}function vr(){var e;if(!E)return;const t=document.getElementById("rr-presets");Object.entries(Za).forEach(([o,a])=>{const n=document.createElement("button");n.id=`rr-pre-${o}`,n.textContent=a.label,n.addEventListener("click",()=>gr(o,!0)),t.appendChild(n)}),(e=document.getElementById("rr-pre-default"))==null||e.classList.add("active"),document.getElementById("rr-enable").addEventListener("change",o=>{if(E)if(o.target.checked){const a=+document.getElementById("rr-opacity").value/100,n=+document.getElementById("rr-glowOp").value/100;E.morphTo({opacity:a,glowOpacity:n},400),E.play()}else De(),E.morphTo({opacity:0,glowOpacity:0},400)}),document.getElementById("rr-play").addEventListener("click",()=>{De(),E.play()}),document.getElementById("rr-rev").addEventListener("click",()=>{De(),E.reverse()}),document.getElementById("rr-stop").addEventListener("click",()=>{De(),E.stop()}),document.getElementById("rr-reset").addEventListener("click",()=>{De(),E.reset()}),document.getElementById("rr-loop").addEventListener("click",()=>{be=!be,document.getElementById("rr-loop").classList.toggle("active",be),be?en():De()}),document.getElementById("rr-once").addEventListener("click",()=>{De(),be=!0,Ja(()=>{be=!1})}),document.getElementById("rr-dir").addEventListener("change",o=>{const n={"south-to-north":0,"north-to-south":1,"equator-out":2}[o.target.value]??0;E._options.direction=o.target.value,E._baseRings.material.uniforms.uDirection.value=n,E._glowLayers.forEach(i=>{i.material.uniforms.uDirection.value=n})}),document.getElementById("rr-easing").addEventListener("change",o=>{E._options.easingFn=Ka[o.target.value]}),document.getElementById("rr-dur").addEventListener("input",o=>{E._options.durationMs=+o.target.value,document.getElementById("rr-vDur").textContent=o.target.value}),document.getElementById("rr-stagger").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vStagger").textContent=a.toFixed(2),E._baseRings.material.uniforms.uStagger.value=a,E._glowLayers.forEach(n=>{n.material.uniforms.uStagger.value=a}),E._options.stagger=a}),document.getElementById("rr-ringFade").addEventListener("input",o=>{const a=Math.max(.001,o.target.value/100);document.getElementById("rr-vRingFade").textContent=a.toFixed(2),E._baseRings.material.uniforms.uRingFade.value=a,E._glowLayers.forEach(n=>{n.material.uniforms.uRingFade.value=a}),E._options.ringFade=a}),document.getElementById("rr-invert").addEventListener("change",o=>{E.setInvert(o.target.checked)}),document.getElementById("rr-colLine").addEventListener("input",o=>{const a=parseInt(o.target.value.slice(1),16);E._baseRings.material.uniforms.uColor.value.set(a),E._options.lineColor=a}),document.getElementById("rr-colLineB").addEventListener("input",o=>{const a=parseInt(o.target.value.slice(1),16);E._baseRings.material.uniforms.uColorB.value.set(a),E._options.lineColorB=a}),document.getElementById("rr-colGlow").addEventListener("input",o=>{const a=parseInt(o.target.value.slice(1),16);E._glowLayers.forEach(n=>n.material.uniforms.uColor.value.set(a)),E._options.glowColor=a}),document.getElementById("rr-colGlowB").addEventListener("input",o=>{const a=parseInt(o.target.value.slice(1),16);E._glowLayers.forEach(n=>n.material.uniforms.uColorB.value.set(a)),E._options.glowColorB=a}),document.getElementById("rr-gradMode").addEventListener("change",o=>{E.setGradientMode(+o.target.value)}),document.getElementById("rr-opacity").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vOpacity").textContent=a.toFixed(2),document.getElementById("rr-enable").checked&&(E._baseRings.material.uniforms.uOpacity.value=a,E._options.opacity=a)}),document.getElementById("rr-glowOp").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vGlowOp").textContent=a.toFixed(2),document.getElementById("rr-enable").checked&&(E._glowLayers.forEach((n,i)=>{n.material.uniforms.uOpacity.value=a*Math.pow(E._options.glowLayerOpacityFalloff,i)}),E._options.glowOpacity=a)}),document.getElementById("rr-emissive").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vEmissive").textContent=a.toFixed(2),E._baseRings.material.uniforms.uEmissiveIntensity.value=a,E._glowLayers.forEach(n=>{n.material.uniforms.uEmissiveIntensity.value=a}),E._options.emissiveIntensity=a}),document.getElementById("rr-warp").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vWarp").textContent=a.toFixed(2),E._baseRings.material.uniforms.uWarpAmount.value=a,E._glowLayers.forEach(n=>{n.material.uniforms.uWarpAmount.value=a}),E._options.warpAmount=a}),document.getElementById("rr-glowRad").addEventListener("input",o=>{const a=o.target.value/1e3;document.getElementById("rr-vGlowRad").textContent=a.toFixed(3);const n=E._options.glowRadius;E._glowLayers.forEach(i=>i.scale.setScalar(a/n)),E._options.glowRadius=a}),document.getElementById("rr-glowLayers").addEventListener("change",o=>{const a=+o.target.value;document.getElementById("rr-vGlowLayers").textContent=a,E.morphTo({glowLayers:a},0)}),document.getElementById("rr-glowStep").addEventListener("change",o=>{const a=o.target.value/1e3;document.getElementById("rr-vGlowStep").textContent=a.toFixed(3),E.morphTo({glowLayerRadiusStep:a},0)}),document.getElementById("rr-glowFalloff").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vGlowFalloff").textContent=a.toFixed(2),E.morphTo({glowLayerOpacityFalloff:a},0)}),document.getElementById("rr-colorSpread").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vColorSpread").textContent=a.toFixed(2),E._baseRings.material.uniforms.uColorSpread.value=a,E._glowLayers.forEach(n=>{n.material.uniforms.uColorSpread.value=a}),E._options.colorSpread=a}),document.getElementById("rr-brightSpread").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vBrightSpread").textContent=a.toFixed(2),E._baseRings.material.uniforms.uBrightSpread.value=a,E._glowLayers.forEach(n=>{n.material.uniforms.uBrightSpread.value=a}),E._options.brightSpread=a}),document.getElementById("rr-flickerAmp").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vFlickerAmp").textContent=a.toFixed(2),E._baseRings.material.uniforms.uFlickerAmp.value=a,E._glowLayers.forEach(n=>{n.material.uniforms.uFlickerAmp.value=a}),E._options.flickerAmp=a}),document.getElementById("rr-flickerSpeed").addEventListener("input",o=>{const a=o.target.value/10;document.getElementById("rr-vFlickerSpeed").textContent=a.toFixed(1),E._baseRings.material.uniforms.uFlickerSpeed.value=a,E._glowLayers.forEach(n=>{n.material.uniforms.uFlickerSpeed.value=a}),E._options.flickerSpeed=a}),document.getElementById("rr-arcSpread").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rr-vArcSpread").textContent=a.toFixed(2),E._baseRings.material.uniforms.uArcColorSpread.value=a,E._glowLayers.forEach(n=>{n.material.uniforms.uArcColorSpread.value=a}),E._options.arcColorSpread=a}),document.getElementById("rr-morphDur").addEventListener("input",o=>{document.getElementById("rr-vMorphDur").textContent=o.target.value}),document.getElementById("rr-pause").addEventListener("input",o=>{document.getElementById("rr-vPause").textContent=o.target.value})}function da(){const t=Math.random(),e=.7+Math.random()*.3,o=.45+Math.random()*.2,a=new B().setHSL(t,e,o);return Math.round(a.r*255)<<16|Math.round(a.g*255)<<8|Math.round(a.b*255)}function ua(t){const e=new B(t),o={};e.getHSL(o);const a=(o.h+(Math.random()-.5)*.25+1)%1,n=Math.max(.5,Math.min(1,o.s+(Math.random()-.5)*.3)),i=Math.max(.3,Math.min(.75,o.l+(Math.random()-.5)*.25)),r=new B().setHSL(a,n,i);return Math.round(r.r*255)<<16|Math.round(r.g*255)<<8|Math.round(r.b*255)}function vt(t,e){document.getElementById(t).value="#"+e.toString(16).padStart(6,"0")}function yr(t){E=t,vr(),document.getElementById("rr-randLine").addEventListener("click",()=>{if(!E)return;const e=da(),o=ua(e),a=+document.getElementById("rr-morphDur").value;E.morphTo({lineColor:e,lineColorB:o},a),vt("rr-colLine",e),vt("rr-colLineB",o)}),document.getElementById("rr-randGlow").addEventListener("click",()=>{if(!E)return;const e=da(),o=ua(e),a=+document.getElementById("rr-morphDur").value;E.morphTo({glowColor:e,glowColorB:o},a),vt("rr-colGlow",e),vt("rr-colGlowB",o)})}function br(t){const e=Gi(t);if(!e)return;const o=1.002,a=new Oe({color:65484,transparent:!0,opacity:.18,blending:$,depthTest:!0,depthWrite:!1}),n=new so,i=10,r=20,c=64;for(let u=1;u<i;u++){const f=u/i*Math.PI,g=o*Math.cos(f),m=o*Math.sin(f),b=[];for(let x=0;x<=c;x++){const M=x/c*Math.PI*2;b.push(new O(m*Math.cos(M),g,m*Math.sin(M)))}const _=new co(new Ae().setFromPoints(b),a);_.renderOrder=3,n.add(_)}for(let u=0;u<r;u++){const f=u/r*Math.PI*2,g=[];for(let b=0;b<=c;b++){const _=b/c*Math.PI;g.push(new O(o*Math.sin(_)*Math.cos(f),o*Math.cos(_),o*Math.sin(_)*Math.sin(f)))}const m=new uo(new Ae().setFromPoints(g),a);m.renderOrder=3,n.add(m)}n.visible=!1,e.add(n);function s(u,f,g){const b=new Fn(1,f).attributes.position,_=b.count/3,x=new O,M=new O,C=new Map;for(let w=0;w<_;w++){const v=w*3;for(let y=0;y<3;y++){const S=v+y,p=v+(y+1)%3;x.fromBufferAttribute(b,S),M.fromBufferAttribute(b,p);const T=[x,M].map(D=>`${D.x.toFixed(5)},${D.y.toFixed(5)},${D.z.toFixed(5)}`).sort().join("|");C.has(T)||C.set(T,[x.clone(),M.clone()])}}const A=[];for(const[w,v]of C.values())for(let y=0;y<g;y++){const S=new O().lerpVectors(w,v,y/g).normalize().multiplyScalar(u),p=new O().lerpVectors(w,v,(y+1)/g).normalize().multiplyScalar(u);A.push(S.x,S.y,S.z,p.x,p.y,p.z)}return new Float32Array(A)}const d=new st;d.setPositions(s(o,3,4));const h=new ue({color:65484,transparent:!0,opacity:.22,blending:$,depthTest:!0,depthWrite:!1,linewidth:1,resolution:new N(window.innerWidth,window.innerHeight)}),l=new J(d,h);l.renderOrder=3,l.visible=!1,e.add(l),window.addEventListener("resize",()=>h.resolution.set(window.innerWidth,window.innerHeight)),document.getElementById("rr-globe").addEventListener("change",u=>{const f=u.target.value;n.visible=f==="latlon",l.visible=f==="wire"})}function _r(t){document.getElementById("rain-color").addEventListener("input",o=>{t.setColor(o.target.value)}),document.getElementById("rain-opacity").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rain-vOpacity").textContent=a.toFixed(2),t.setOpacity(a)}),document.getElementById("rain-burstBloom").addEventListener("change",o=>{t.setBurstBloom(o.target.checked)}),document.getElementById("rain-globeInteract").addEventListener("change",o=>{t.setGlobeInteract(o.target.checked)}),document.getElementById("rain-chroma").addEventListener("change",o=>{const a=+document.getElementById("rain-chromaScale").value/100;t.setGlyphChroma(o.target.checked,a)}),document.getElementById("rain-chromaScale").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rain-vChromaScale").textContent=a.toFixed(1),document.getElementById("rain-chroma").checked&&t.setGlyphChroma(!0,a)}),document.getElementById("rain-heat").addEventListener("change",o=>{const a=+document.getElementById("rain-heatAmt").value/1e3;t.setHeat(o.target.checked,a)}),document.getElementById("rain-heatAmt").addEventListener("input",o=>{const a=o.target.value/1e3;document.getElementById("rain-vHeatAmt").textContent=a.toFixed(3),t.setHeat(document.getElementById("rain-heat").checked,a)}),document.getElementById("rain-streaks").addEventListener("change",o=>{const a=+document.getElementById("rain-streakAmt").value/1e3;t.setStreaks(o.target.checked,a)}),document.getElementById("rain-streakAmt").addEventListener("input",o=>{const a=o.target.value/1e3;document.getElementById("rain-vStreakAmt").textContent=a.toFixed(3),t.setStreaks(document.getElementById("rain-streaks").checked,a)}),document.getElementById("rain-soften").addEventListener("change",o=>{const a=+document.getElementById("rain-softenStr").value/1e3;t.setSoften(o.target.checked,a)}),document.getElementById("rain-softenStr").addEventListener("input",o=>{const a=o.target.value/1e3;document.getElementById("rain-vSoftenStr").textContent=a.toFixed(3),t.setSoften(document.getElementById("rain-soften").checked,a)}),document.getElementById("rain-depth").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rain-vDepth").textContent=a.toFixed(2),t.setDepth(a)}),document.getElementById("rain-normalStr").addEventListener("input",o=>{const a=o.target.value/100;document.getElementById("rain-vNormalStr").textContent=a.toFixed(1),t.setNormalStrength(a)});function e(){const o=document.getElementById("rain-grEnabled").checked,a=document.getElementById("rain-grLightX").value/100,n=document.getElementById("rain-grLightY").value/100,i=document.getElementById("rain-grDensity").value/100,r=document.getElementById("rain-grDecay").value/100,c=document.getElementById("rain-grWeight").value/100,s=document.getElementById("rain-grExposure").value/100;t.setGodRays(o,a,n,i,r,c,s)}document.getElementById("rain-grEnabled").addEventListener("change",e),[["rain-grLightX","rain-vGrLightX",100,2],["rain-grLightY","rain-vGrLightY",100,2],["rain-grDensity","rain-vGrDensity",100,2],["rain-grDecay","rain-vGrDecay",100,2],["rain-grWeight","rain-vGrWeight",100,2],["rain-grExposure","rain-vGrExposure",100,2]].forEach(([o,a,n,i])=>{document.getElementById(o).addEventListener("input",r=>{document.getElementById(a).textContent=(r.target.value/n).toFixed(i),e()})})}function wr(t){document.querySelectorAll("#rr-panel .rr-collapsible").forEach(s=>{s.addEventListener("click",()=>{const d=document.getElementById(s.dataset.target);s.classList.toggle("rr-open"),d.classList.toggle("rr-open")})});const e=document.querySelector(".s9-telescreen__vignette"),o=document.querySelector(".s9-telescreen__scanlines"),a=[document.querySelector(".s9-telescreen__phase-a"),document.querySelector(".s9-telescreen__phase-b"),document.querySelector(".s9-telescreen__phase-c")],n=document.querySelector(".s9-telescreen__glow"),i={glitchEnabled:!1,glitchStrength:.025,glitchSpeed:8,glitchCols:30,glitchRgb:.5,glitchFreq:3.5,glitchBurst:.7,scratchEnabled:!0,scratchOpacity:.35,vignetteEnabled:!0,vignetteOpacity:1,scanlinesEnabled:!1,phaseEnabled:!0,glowEnabled:!0,glowOpacity:1,warpMult:1,hardPix:1.2,maskStr:1,grainAmt:.04,halationStr:1,convergence:.01};function r(){t.setGlitch(i.glitchEnabled,i.glitchStrength,i.glitchSpeed,i.glitchCols,i.glitchRgb,i.glitchFreq,i.glitchBurst)}const c=[{type:"checkbox",id:"ts-glitchEnabled",key:"glitchEnabled",set:()=>r()},{id:"ts-glitchStrength",valId:"ts-vGlitchStrength",key:"glitchStrength",toSlider:s=>s*1e3,fromSlider:s=>s/1e3,fmt:s=>s.toFixed(3),set:()=>r()},{id:"ts-glitchSpeed",valId:"ts-vGlitchSpeed",key:"glitchSpeed",toSlider:s=>s*10,fromSlider:s=>s/10,fmt:s=>s.toFixed(1),set:()=>r()},{id:"ts-glitchCols",valId:"ts-vGlitchCols",key:"glitchCols",toSlider:s=>s,fromSlider:s=>+s,fmt:s=>String(s),set:()=>r()},{id:"ts-glitchRgb",valId:"ts-vGlitchRgb",key:"glitchRgb",toSlider:s=>s*100,fromSlider:s=>s/100,fmt:s=>s.toFixed(2),set:()=>r()},{id:"ts-glitchFreq",valId:"ts-vGlitchFreq",key:"glitchFreq",toSlider:s=>(8-s)/7.7*100,fromSlider:s=>8-s/100*7.7,fmt:s=>s.toFixed(1)+"s",set:()=>r()},{id:"ts-glitchBurst",valId:"ts-vGlitchBurst",key:"glitchBurst",toSlider:s=>s*100,fromSlider:s=>s/100,fmt:s=>s.toFixed(2)+"s",set:()=>r()},{type:"checkbox",id:"ts-scratchEnabled",key:"scratchEnabled",set:s=>t.setShader({scratchStr:s?i.scratchOpacity:0})},{id:"ts-scratchOpacity",valId:"ts-vScratchOpacity",key:"scratchOpacity",toSlider:s=>s*100,fromSlider:s=>s/100,fmt:s=>s.toFixed(2),set:s=>{i.scratchEnabled&&t.setShader({scratchStr:s})}},{type:"checkbox",id:"ts-vignetteEnabled",key:"vignetteEnabled",set:s=>{e.style.display=s?"":"none"}},{id:"ts-vignetteOpacity",valId:"ts-vVignetteOpacity",key:"vignetteOpacity",toSlider:s=>s*100,fromSlider:s=>s/100,fmt:s=>s.toFixed(2),set:s=>{e.style.opacity=s}},{type:"checkbox",id:"ts-scanlinesEnabled",key:"scanlinesEnabled",set:s=>{o.style.display=s?"block":"none"}},{type:"checkbox",id:"ts-phaseEnabled",key:"phaseEnabled",set:s=>{a.forEach(d=>{d.style.display=s?"":"none"})}},{type:"checkbox",id:"ts-glowEnabled",key:"glowEnabled",set:s=>{n.style.display=s?"":"none"}},{id:"ts-glowOpacity",valId:"ts-vGlowOpacity",key:"glowOpacity",toSlider:s=>s*100,fromSlider:s=>s/100,fmt:s=>s.toFixed(2),set:s=>{n.style.opacity=s}},{id:"ts-warp",valId:"ts-vWarp",key:"warpMult",toSlider:s=>s*100,fromSlider:s=>s/100,fmt:s=>s.toFixed(2),set:s=>t.setShader({warpMult:s})},{id:"ts-hardPix",valId:"ts-vHardPix",key:"hardPix",toSlider:s=>s*10,fromSlider:s=>s/10,fmt:s=>s.toFixed(1),set:s=>t.setShader({hardPix:-s})},{id:"ts-maskStr",valId:"ts-vMaskStr",key:"maskStr",toSlider:s=>s*100,fromSlider:s=>s/100,fmt:s=>s.toFixed(2),set:s=>t.setShader({maskStr:s})},{id:"ts-grain",valId:"ts-vGrain",key:"grainAmt",toSlider:s=>s*1e3,fromSlider:s=>s/1e3,fmt:s=>s.toFixed(3),set:s=>t.setShader({grainAmt:s})},{id:"ts-halation",valId:"ts-vHalation",key:"halationStr",toSlider:s=>s*100,fromSlider:s=>s/100,fmt:s=>s.toFixed(2),set:s=>t.setShader({halationStr:s})},{id:"ts-convergence",valId:"ts-vConvergence",key:"convergence",toSlider:s=>s*1e3,fromSlider:s=>s/1e3,fmt:s=>s.toFixed(3),set:s=>t.setShader({convergence:s})}];for(const s of c){const d=document.getElementById(s.id);if(!d)continue;const h=s.type==="checkbox",l=s.valId?document.getElementById(s.valId):null;h?d.checked=i[s.key]:(d.value=s.toSlider(i[s.key]),l&&(l.textContent=s.fmt(i[s.key]))),s.set(i[s.key]),d.addEventListener(h?"change":"input",u=>{const f=h?u.target.checked:+u.target.value;i[s.key]=h?f:s.fromSlider(f),!h&&l&&(l.textContent=s.fmt(i[s.key])),s.set(i[s.key])})}}mr();document.querySelectorAll(".s9-panel").forEach(Xi);const tn=document.querySelectorAll(".topbar__tab[data-tab]"),Sr=document.querySelectorAll(".center__view[data-view]");let ha=!1,ao=!1;const qe=document.querySelector(".s9-terminal");function fa(t){tn.forEach(e=>{const o=e.dataset.tab===t;e.classList.toggle("topbar__tab--active",o),e.setAttribute("aria-selected",o)}),Sr.forEach(e=>{e.classList.toggle("center__view--active",e.dataset.view===t)}),t==="network"&&!ha&&(ha=!0,Pr()),t==="tactical"&&!ao&&(ao=!0,Ir()),I(qe,`VIEW: ${t.toUpperCase()} ACTIVATED`,"sys")}tn.forEach(t=>{t.addEventListener("click",()=>fa(t.dataset.tab)),t.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),fa(t.dataset.tab))})});function Xt(t,e,o){let a=0;function n(){if(a>=t.length)return;const{id:i,state:r}=t[a++],c=document.getElementById(i);c&&Ki(c,r),setTimeout(n,a<t.length?e:e*2)}n()}er(document.getElementById("sigint-feed"));or(document.getElementById("intel-feed"));setTimeout(()=>{Xt([{id:"seq-breach",state:"complete"},{id:"seq-extract",state:"active"}],3e3),setTimeout(()=>{Xt([{id:"seq-extract",state:"complete"},{id:"seq-cover",state:"active"}],3500),setTimeout(()=>{Xt([{id:"seq-cover",state:"complete"},{id:"seq-exfil",state:"active"}],3e3)},9e3)},8e3)},5e3);const Ft=document.querySelector(".s9-stream");kn(Ft);ir(Ft,fo);const xr=Qs(document.getElementById("ts-feed-src"),document.getElementById("ts-feed-canvas"),document.getElementById("ts-glow-canvas")),ge={cpu:42,mem:61,net:12,ghost:77,enc:96},Er=document.getElementById("tele-cpu"),Mr=document.getElementById("tele-mem"),Ar=document.getElementById("tele-net"),Tr=document.getElementById("tele-enc");setInterval(()=>{for(const t of Object.keys(ge))ge[t]=Math.max(5,Math.min(100,ge[t]+(Math.random()-.5)*6)),ge[t]=Math.round(ge[t]);lt(Er,ge.cpu),lt(Mr,ge.mem),lt(Ar,ge.net),lt(Tr,ge.enc)},2e3);const on=document.getElementById("neural-01"),an=document.getElementById("ghost-val"),nn=document.getElementById("cyber-index"),sn=document.getElementById("neural-sync"),rn=document.getElementById("ekg-bpm"),ln=Un(document.getElementById("ekg-canvas"),document.getElementById("ekg-heart"));let wo=98.4;for(let t=0;t<3;t++)wo=Aa(on,an,nn,sn,rn,ln);setInterval(()=>{wo=Aa(on,an,nn,sn,rn,ln)},3e3);const Se=document.querySelector(".s9-threatmap");Fa(Se,{autoRotate:!0,bloomStrength:.4});const cn=document.getElementById("proximity-radar"),dn=Ys(cn,{threatLevel:0}),Cr=getComputedStyle(document.documentElement).getPropertyValue("--neon-green").trim()||"#00ff70",Lr=gs(document.getElementById("matrix-rain-host"),{color:Cr,opacity:.45,syncCamera:Ni(Se)});document.getElementById("sat-toggle").addEventListener("change",t=>{qi(Se,t.target.checked)});const{globeNodes:Dr}=sr(Se,Ft,qe,{addNode:Na,removeNode:Ua,updateNodeLevel:yo,setThreatLevel:vo,setActiveNode:Ve,focusNode:bo,pulseGlobeNode:zi,spawnArc:Wi,appendRow:fo,printLine:I,setRadarThreatLevel:t=>dn.setRadarThreatLevel(t)});fr({threatEl:Se,radarEl:cn,getTacticalInited:()=>ao,termEl:qe,printLine:I});const Rr=document.getElementById("alert-host");document.addEventListener("s9:alert",t=>{var e;if(((e=t.detail)==null?void 0:e.level)==="critical"){const o=t.detail.source??"UNKNOWN";I(qe,`⚠ CRITICAL ALERT: ${o}`,"err"),Hn(Rr,{level:"critical",code:"CRITICAL THREAT",message:o})}});const je=document.getElementById("node-popup"),un=document.getElementById("np-city"),hn=document.getElementById("np-skyline"),fn=document.getElementById("np-country"),mn=document.getElementById("np-pop"),pn=document.getElementById("np-coords"),no=document.getElementById("np-threat"),gn=document.getElementById("np-status");Se.addEventListener("s9:threatmap-node-select",t=>{const{nodeId:e,label:o,level:a,lat:n,lng:i}=t.detail;I(qe,`NODE SELECT: ${o} — LEVEL ${a} — ${n.toFixed(2)}°, ${i.toFixed(2)}°`,a>=71?"err":a>=41?"warn":"info"),fo(Ft,{timestamp:new Date().toISOString(),source:"TGT",message:`TARGET LOCKED: ${o} THREAT=${a}`,alert:a>=41});const r=Wa[e]??{country:"—",pop:"—",status:"UNKNOWN"};un.textContent=o,hn.innerHTML=ja(e),fn.textContent=r.country,mn.textContent=r.pop,pn.textContent=`${n.toFixed(2)}°, ${i.toFixed(2)}°`;const c=a>=70?"CRITICAL":a>=40?"ELEVATED":"LOW";no.textContent=`${a} — ${c}`,no.style.color=a>=70?"var(--text-alert)":a>=40?"var(--neon-warn)":"var(--neon-green)",gn.textContent=r.status,je.classList.toggle("node-popup--left",i>60),je.setAttribute("aria-hidden","false"),je.classList.add("node-popup--visible")});Se.addEventListener("s9:threatmap-node-deselect",()=>{je.classList.remove("node-popup--visible"),setTimeout(()=>je.setAttribute("aria-hidden","true"),260)});pr({termEl:qe,applyTheme:Xa,globeNodes:Dr,metrics:{...ge,get ghostCoeff(){return wo}},radar:dn,threatEl:Se,updateNodeLevel:yo,setThreatLevel:vo,setActiveNode:Ve,focusNode:bo,CITY_POOL:Pe,CITY_DATA:Wa,citySkyline:ja,npCity:un,npSkyline:hn,npCountry:fn,npPop:mn,npCoords:pn,npThreat:no,npStatus:gn,nodePopup:je});function Ir(){rr(document.getElementById("threatmap-tactical"),Lt,$a,Pe,{initThreatMap:Fa,addNode:Na,removeNode:Ua,updateNodeLevel:yo,setThreatLevel:vo,setActiveNode:Ve,focusNode:bo})}function Pr(){lr(document.getElementById("flow-matrix"),{initMatrix:zn,activateEdge:Ta,deactivateEdge:Ca,pulseNode:Wn,setActiveNode:Et})}const Or=document.getElementById("rr-panel"),Br=Ui(Se);yr(Br);br(Se);_r(Lr);wr(xr);const Fr=["intel-feed-1","sys-metrics","seq-log-right","neural-readout-1","operative-log","data-stream-1","terminal-1","telescreen-1","pulse-radar-1"],kr=Fr.map(t=>document.querySelector(`[data-s9-id="${t}"]`)),Nr=document.querySelector(".s9-ov");let yt=!1;window.addEventListener("keydown",t=>{t.key==="h"||t.key==="H"?Or.classList.toggle("rr-visible"):(t.key==="i"||t.key==="I")&&(yt=!yt,kr.forEach(e=>e==null?void 0:e.classList.toggle("s9-panel--i-hidden",yt)),Nr.classList.toggle("s9-ov--i-hidden",yt))});
