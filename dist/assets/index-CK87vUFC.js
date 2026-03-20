import{C as wi,V as k,M as Ke,T as Ye,Q as Io,S as Po,a as U,R as Si,P as _i,b as Ft,c as le,O as va,B as Oe,F as Bt,d as ne,U as lt,W as Mt,H as Et,N as xi,e as Mi,f as B,A as V,g as Ze,I as ya,h as eo,i as Xe,j as ba,k as ho,l as wa,m as At,n as Ct,o as ct,L as Ei,p as Sa,G as fo,q as Ae,r as Tt,s as mo,t as po,u as _a,v as Ue,w as Ai,x as Ci,y as to,D as xa,z as Ti,E as ze,J as go,K as Li,X as vo,Y as Oo,Z as ko,_ as Ma,$ as ft,a0 as Di,a1 as Ri,a2 as Ii,a3 as Ea,a4 as Pi,a5 as Oi,a6 as ki,a7 as dt,a8 as Fi,a9 as yo,aa as ot,ab as Bi,ac as Aa,ad as Ni}from"./three-C_ueH2ui.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=a(i);fetch(i.href,r)}})();const Ca=new WeakMap;function Ui(t){const e=new AbortController,{signal:a}=e,o={ac:e,paused:!1,filter:null};Ca.set(t,o);const i=t.querySelector(".s9-stream__body");i&&(i.addEventListener("mouseenter",()=>{o.paused=!0,i.dataset.paused="true"},{signal:a}),i.addEventListener("mouseleave",()=>{o.paused=!1,i.dataset.paused="false",Ta(i)},{signal:a}),i.addEventListener("click",r=>{const s=r.target.closest(".s9-stream__row");if(!s)return;const c=s.classList.contains("s9-stream__row--pinned");s.classList.toggle("s9-stream__row--pinned",!c),t.dispatchEvent(new CustomEvent("s9:stream-row-pinned",{bubbles:!0,detail:{row:s,pinned:!c}}))},{signal:a}))}function bo(t,{timestamp:e,source:a,message:o,alert:i=!1}){const r=t.querySelector(".s9-stream__body");if(!r)return;const s=Ca.get(t),c=(s==null?void 0:s.filter)??null,n=document.createElement("div");n.className="s9-stream__row",i&&n.classList.add("s9-stream__row--alert"),c&&a!==c&&(n.hidden=!0),n.innerHTML=`<span class="s9-stream__timestamp">${zt(e)}</span><span class="s9-stream__source">${zt(a)}</span><span class="s9-stream__message">${zt(o)}</span>`,n.classList.add("glitch-enter"),n.addEventListener("animationend",()=>n.classList.remove("glitch-enter"),{once:!0}),r.appendChild(n),r.children.length>100&&r.removeChild(r.firstChild),s!=null&&s.paused||Ta(r)}function Ta(t){t.scrollTop=t.scrollHeight}function zt(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Gi(t,e){e(),t.classList.remove("glitch-enter"),t.offsetWidth,t.classList.add("glitch-enter"),t.addEventListener("animationend",()=>t.classList.remove("glitch-enter"),{once:!0})}const Wt=.37;function Fo(t){return t>.08&&t<.18?Math.sin((t-.08)/.1*Math.PI)*.18:t>.28&&t<.32?-((t-.28)/.04)*.38:t>.32&&t<.37?-.38+(t-.32)/.05*1.38:t>.37&&t<.43?1-(t-.37)/.06*1.28:t>.43&&t<.49?-.28+(t-.43)/.06*.28:t>.52&&t<.68?Math.sin((t-.52)/.16*Math.PI)*.3:0}function Hi(t,e){if(!t)return console.warn("initEkg: canvas element not found"),{setBpm(){},destroy(){}};let a=62,o=0,i=0,r=0,s=0;function c(){e&&(e.classList.remove("beat"),e.offsetWidth,e.classList.add("beat"))}function n(){const u=t.getContext("2d"),f=t.width,g=t.height,m=g/2,b=g*.44,w=a/60/80;u.clearRect(0,0,f,g);const x=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";u.beginPath();for(let C=0;C<f;C++){const E=((o-(f-1-C)*w)%1+1)%1,S=m-Fo(E)*b;C===0?u.moveTo(C,S):u.lineTo(C,S)}u.strokeStyle=x,u.lineWidth=1,u.shadowColor=x,u.shadowBlur=5,u.stroke();const M=m-Fo(o)*b;u.beginPath(),u.arc(f-1,M,1.8,0,Math.PI*2),u.fillStyle=x,u.shadowBlur=10,u.fill()}function d(){const u=t.clientWidth;u&&t.width!==u&&(t.width=u)}d();const h=new ResizeObserver(d);h.observe(t);function l(u){s=requestAnimationFrame(l);const f=r?u-r:16;r=u,i=o,o=(o+a/60*(f/1e3))%1,(i<Wt&&o>=Wt||i>o&&o>=Wt)&&c(),n()}return s=requestAnimationFrame(l),{setBpm(u){a=u},destroy(){cancelAnimationFrame(s),h.disconnect()}}}let qe=98.4;function La(t,e,a,o,i,r){qe=Math.max(85,Math.min(100,qe+(Math.random()-.45)*1.2));const s=qe.toFixed(1),c=Math.round(58+(100-qe)/15*12);return i.textContent=c,r.setBpm(c),Gi(t,()=>{e.textContent=s,a.textContent=`${s}%`,o.textContent=`${Math.round(qe)}%`}),qe}const Bo=new WeakMap;function mt(t,e){const a=Math.max(0,Math.min(100,e)),o=t.querySelector(".s9-telemetry__bar-fill");if(o){o.style.width=`${a}%`;const c=["s9-telemetry__bar-fill--ok","s9-telemetry__bar-fill--warning","s9-telemetry__bar-fill--critical"];o.classList.remove(...c),a<=60?o.classList.add("s9-telemetry__bar-fill--ok"):a<=85?o.classList.add("s9-telemetry__bar-fill--warning"):o.classList.add("s9-telemetry__bar-fill--critical")}const i=t.querySelector(".s9-telemetry__value");i&&(i.textContent=Math.round(a).toString());const r=Bo.get(t)??!1,s=a>85;s&&!r&&t.dispatchEvent(new CustomEvent("s9:telemetry-threshold",{bubbles:!0,detail:{value:a}})),Bo.set(t,s)}const zi=8e3;function Wi(t,{level:e="critical",code:a,message:o,persistent:i=!1}){const r=document.createElement("div");r.className=`s9-alert s9-alert--${e}`,i&&(r.dataset.persistent="true");const s=e==="critical"?"⬡":"⚠",c=new Date().toISOString().replace("T"," ").substring(0,19)+" UTC";return r.innerHTML=`<span class="s9-alert__icon" aria-hidden="true">${s}</span><div class="s9-alert__body"><span class="s9-alert__code">${$t(a)}</span><span class="s9-alert__message">${$t(o)}</span></div><span class="s9-alert__timestamp">${$t(c)}</span><button class="s9-alert__dismiss" aria-label="Dismiss alert">✕</button>`,r.classList.add("glitch-enter"),r.addEventListener("animationend",()=>r.classList.remove("glitch-enter"),{once:!0}),r.querySelector(".s9-alert__dismiss").addEventListener("click",()=>{No(r)}),t.appendChild(r),i||setTimeout(()=>{r.isConnected&&No(r)},zi),r}function No(t){var a;if(!t.isConnected)return;const e=((a=t.querySelector(".s9-alert__code"))==null?void 0:a.textContent)??"";t.classList.add("s9-alert--dismissing"),t.addEventListener("transitionend",()=>{t.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:e}})),t.remove()},{once:!0}),setTimeout(()=>{t.isConnected&&(t.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:e}})),t.remove())},400)}function $t(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const ce="http://www.w3.org/2000/svg",je=new WeakMap;function $i(t,{nodes:e=[],edges:a=[]}={}){const o=new AbortController,{signal:i}=o,r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s={abortController:o,nodeMap:new Map,edgeMap:new Map,activeNodeId:null,reducedMotion:r};je.set(t,s);const c=document.createElementNS(ce,"svg");c.setAttribute("class","s9-matrix__canvas"),c.setAttribute("viewBox","0 0 100 100"),c.setAttribute("preserveAspectRatio","xMidYMid meet"),c.setAttribute("role","img"),c.setAttribute("aria-label","Network topology matrix");const n=document.createElementNS(ce,"defs"),d=document.createElementNS(ce,"g");d.setAttribute("class","s9-matrix__edges");const h=document.createElementNS(ce,"g");h.setAttribute("class","s9-matrix__nodes"),c.appendChild(n),c.appendChild(d),c.appendChild(h),t.appendChild(c),e.forEach(l=>Vi(t,l)),a.forEach(l=>qi(t,l)),a.forEach(l=>{l.active&&Da(t,l.id)}),c.addEventListener("click",l=>{const u=l.target.closest("[data-node-id]");u?Lt(t,u.dataset.nodeId):s.activeNodeId!==null&&Lt(t,null)},{signal:i}),c.addEventListener("keydown",l=>{if(l.key==="Enter"||l.key===" "){const u=l.target.closest("[data-node-id]");u&&(l.preventDefault(),Lt(t,u.dataset.nodeId))}},{signal:i})}function ji(t,e){const a=je.get(t);if(!a)return;const o=a.nodeMap.get(e);if(!o||o.classList.contains("s9-matrix__node--active"))return;o.classList.add("s9-matrix__node--pulsing");const i=o.querySelector(".s9-matrix__node-ring");i&&i.addEventListener("animationend",r=>{r.animationName==="matrix-ring-pulse"&&o.classList.remove("s9-matrix__node--pulsing")},{once:!0})}function Da(t,e,a=null){const o=je.get(t);if(!o)return;if(e===null){for(const[m]of o.edgeMap)Ra(t,m);return}const i=o.edgeMap.get(e);if(!i||i.active)return;const r=t.querySelector(".s9-matrix__canvas");if(!r)return;const s=r.querySelector(".s9-matrix__edges");if(!s)return;const{line:c,x1:n,y1:d,x2:h,y2:l}=i;c&&c.parentNode&&c.parentNode.removeChild(c);const u=`s9-edge-${e}`,f=document.createElementNS(ce,"path");f.setAttribute("class","s9-matrix__edge s9-matrix__edge--active"),f.setAttribute("id",u),f.setAttribute("data-edge-id",e),f.setAttribute("d",`M ${n} ${d} L ${h} ${l}`),s.appendChild(f);let g=null;if(!o.reducedMotion){g=document.createElementNS(ce,"circle"),g.setAttribute("class","s9-matrix__edge-dot"),g.setAttribute("r","1.2"),a&&(g.style.fill=a,g.style.filter=`drop-shadow(0 0 2px ${a})`);const m=document.createElementNS(ce,"animateMotion");m.setAttribute("dur","2s"),m.setAttribute("repeatCount","indefinite");const b=document.createElementNS(ce,"mpath");b.setAttributeNS("http://www.w3.org/1999/xlink","href",`#${u}`),m.appendChild(b),g.appendChild(m),s.appendChild(g)}i.line=f,i.dot=g,i.active=!0}function Ra(t,e){const a=je.get(t);if(!a)return;const o=a.edgeMap.get(e);if(!o||!o.active)return;const i=t.querySelector(".s9-matrix__canvas");if(!i)return;const r=i.querySelector(".s9-matrix__edges");if(!r)return;const{line:s,dot:c,x1:n,y1:d,x2:h,y2:l}=o;c&&c.parentNode&&c.parentNode.removeChild(c),s&&s.parentNode&&s.parentNode.removeChild(s);const u=document.createElementNS(ce,"line");u.setAttribute("class","s9-matrix__edge"),u.setAttribute("data-edge-id",e),u.setAttribute("x1",n),u.setAttribute("y1",d),u.setAttribute("x2",h),u.setAttribute("y2",l),r.appendChild(u),o.line=u,o.dot=null,o.active=!1}function Lt(t,e){const a=je.get(t);if(!a)return;if(a.activeNodeId!==null){const i=a.nodeMap.get(a.activeNodeId);i&&(i.classList.remove("s9-matrix__node--active"),i.setAttribute("aria-pressed","false")),t.dispatchEvent(new CustomEvent("s9:matrix-node-deselect",{bubbles:!0,detail:{nodeId:a.activeNodeId}})),a.activeNodeId=null}if(e===null)return;const o=a.nodeMap.get(e);o&&(o.classList.add("s9-matrix__node--active"),o.setAttribute("aria-pressed","true"),a.activeNodeId=e,t.dispatchEvent(new CustomEvent("s9:matrix-node-click",{bubbles:!0,detail:{nodeId:e,label:o.getAttribute("aria-label")??e}})))}function Vi(t,{id:e,x:a,y:o,label:i,root:r=!1}){const s=je.get(t);if(!s)return;const c=t.querySelector(".s9-matrix__canvas");if(!c)return;const n=c.querySelector(".s9-matrix__nodes");if(!n)return;const d=document.createElementNS(ce,"g");d.setAttribute("class",`s9-matrix__node${r?" s9-matrix__node--root":""}`),d.setAttribute("data-node-id",e),d.setAttribute("tabindex","0"),d.setAttribute("role","button"),d.setAttribute("aria-label",i),d.setAttribute("aria-pressed","false");const h=document.createElementNS(ce,"circle");h.setAttribute("class","s9-matrix__node-ring"),h.setAttribute("cx",a),h.setAttribute("cy",o),h.setAttribute("r","4");const l=document.createElementNS(ce,"circle");l.setAttribute("class","s9-matrix__node-core"),l.setAttribute("cx",a),l.setAttribute("cy",o),l.setAttribute("r","2.5");const u=document.createElementNS(ce,"text");u.setAttribute("class","s9-matrix__node-label"),u.setAttribute("x",a),u.setAttribute("y",o+3.5),u.textContent=i,d.appendChild(h),d.appendChild(l),d.appendChild(u),n.appendChild(d),s.nodeMap.set(e,d)}function qi(t,{id:e,from:a,to:o}){const i=je.get(t);if(!i)return;const r=t.querySelector(".s9-matrix__canvas");if(!r)return;const s=r.querySelector(".s9-matrix__edges");if(!s)return;const c=i.nodeMap.get(a),n=i.nodeMap.get(o),d=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,h=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,l=n?parseFloat(n.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,u=n?parseFloat(n.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,f=document.createElementNS(ce,"line");f.setAttribute("class","s9-matrix__edge"),f.setAttribute("data-edge-id",e),f.setAttribute("x1",d),f.setAttribute("y1",h),f.setAttribute("x2",l),f.setAttribute("y2",u),s.appendChild(f),i.edgeMap.set(e,{line:f,dot:null,active:!1,from:a,to:o,x1:d,y1:h,x2:l,y2:u})}const Uo={type:"change"},wo={type:"start"},Ia={type:"end"},pt=new Si,Go=new _i,Yi=Math.cos(70*Ft.DEG2RAD),Y=new k,se=2*Math.PI,G={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},jt=1e-6;class Xi extends wi{constructor(e,a=null){super(e,a),this.state=G.NONE,this.target=new k,this.cursor=new k,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ke.ROTATE,MIDDLE:Ke.DOLLY,RIGHT:Ke.PAN},this.touches={ONE:Ye.ROTATE,TWO:Ye.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new k,this._lastQuaternion=new Io,this._lastTargetPosition=new k,this._quat=new Io().setFromUnitVectors(e.up,new k(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Po,this._sphericalDelta=new Po,this._scale=1,this._panOffset=new k,this._rotateStart=new U,this._rotateEnd=new U,this._rotateDelta=new U,this._panStart=new U,this._panEnd=new U,this._panDelta=new U,this._dollyStart=new U,this._dollyEnd=new U,this._dollyDelta=new U,this._dollyDirection=new k,this._mouse=new U,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Zi.bind(this),this._onPointerDown=Ki.bind(this),this._onPointerUp=Qi.bind(this),this._onContextMenu=rr.bind(this),this._onMouseWheel=tr.bind(this),this._onKeyDown=or.bind(this),this._onTouchStart=ar.bind(this),this._onTouchMove=ir.bind(this),this._onMouseDown=Ji.bind(this),this._onMouseMove=er.bind(this),this._interceptControlDown=nr.bind(this),this._interceptControlUp=sr.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Uo),this.update(),this.state=G.NONE}pan(e,a){this._pan(e,a),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const a=this.object.position;Y.copy(a).sub(this.target),Y.applyQuaternion(this._quat),this._spherical.setFromVector3(Y),this.autoRotate&&this.state===G.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let o=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(o)&&isFinite(i)&&(o<-Math.PI?o+=se:o>Math.PI&&(o-=se),i<-Math.PI?i+=se:i>Math.PI&&(i-=se),o<=i?this._spherical.theta=Math.max(o,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(o+i)/2?Math.max(o,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const s=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=s!=this._spherical.radius}if(Y.setFromSpherical(this._spherical),Y.applyQuaternion(this._quatInverse),a.copy(this.target).add(Y),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let s=null;if(this.object.isPerspectiveCamera){const c=Y.length();s=this._clampDistance(c*this._scale);const n=c-s;this.object.position.addScaledVector(this._dollyDirection,n),this.object.updateMatrixWorld(),r=!!n}else if(this.object.isOrthographicCamera){const c=new k(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const n=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=n!==this.object.zoom;const d=new k(this._mouse.x,this._mouse.y,0);d.unproject(this.object),this.object.position.sub(d).add(c),this.object.updateMatrixWorld(),s=Y.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;s!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position):(pt.origin.copy(this.object.position),pt.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(pt.direction))<Yi?this.object.lookAt(this.target):(Go.setFromNormalAndCoplanarPoint(this.object.up,this.target),pt.intersectPlane(Go,this.target))))}else if(this.object.isOrthographicCamera){const s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),s!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>jt||8*(1-this._lastQuaternion.dot(this.object.quaternion))>jt||this._lastTargetPosition.distanceToSquared(this.target)>jt?(this.dispatchEvent(Uo),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?se/60*this.autoRotateSpeed*e:se/60/60*this.autoRotateSpeed}_getZoomScale(e){const a=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*a)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,a){Y.setFromMatrixColumn(a,0),Y.multiplyScalar(-e),this._panOffset.add(Y)}_panUp(e,a){this.screenSpacePanning===!0?Y.setFromMatrixColumn(a,1):(Y.setFromMatrixColumn(a,0),Y.crossVectors(this.object.up,Y)),Y.multiplyScalar(e),this._panOffset.add(Y)}_pan(e,a){const o=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;Y.copy(i).sub(this.target);let r=Y.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/o.clientHeight,this.object.matrix),this._panUp(2*a*r/o.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/o.clientWidth,this.object.matrix),this._panUp(a*(this.object.top-this.object.bottom)/this.object.zoom/o.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,a){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const o=this.domElement.getBoundingClientRect(),i=e-o.left,r=a-o.top,s=o.width,c=o.height;this._mouse.x=i/s*2-1,this._mouse.y=-(r/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const a=this.domElement;this._rotateLeft(se*this._rotateDelta.x/a.clientHeight),this._rotateUp(se*this._rotateDelta.y/a.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let a=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(se*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),a=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-se*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),a=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(se*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),a=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-se*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),a=!0;break}a&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const a=this._getSecondPointerPosition(e),o=.5*(e.pageX+a.x),i=.5*(e.pageY+a.y);this._rotateStart.set(o,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const a=this._getSecondPointerPosition(e),o=.5*(e.pageX+a.x),i=.5*(e.pageY+a.y);this._panStart.set(o,i)}}_handleTouchStartDolly(e){const a=this._getSecondPointerPosition(e),o=e.pageX-a.x,i=e.pageY-a.y,r=Math.sqrt(o*o+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),i=.5*(e.pageX+o.x),r=.5*(e.pageY+o.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const a=this.domElement;this._rotateLeft(se*this._rotateDelta.x/a.clientHeight),this._rotateUp(se*this._rotateDelta.y/a.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const a=this._getSecondPointerPosition(e),o=.5*(e.pageX+a.x),i=.5*(e.pageY+a.y);this._panEnd.set(o,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const a=this._getSecondPointerPosition(e),o=e.pageX-a.x,i=e.pageY-a.y,r=Math.sqrt(o*o+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const s=(e.pageX+a.x)*.5,c=(e.pageY+a.y)*.5;this._updateZoomParameters(s,c)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let a=0;a<this._pointers.length;a++)if(this._pointers[a]==e.pointerId){this._pointers.splice(a,1);return}}_isTrackingPointer(e){for(let a=0;a<this._pointers.length;a++)if(this._pointers[a]==e.pointerId)return!0;return!1}_trackPointer(e){let a=this._pointerPositions[e.pointerId];a===void 0&&(a=new U,this._pointerPositions[e.pointerId]=a),a.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const a=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[a]}_customWheelEvent(e){const a=e.deltaMode,o={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(a){case 1:o.deltaY*=16;break;case 2:o.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(o.deltaY*=10),o}}function Ki(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Zi(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function Qi(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ia),this.state=G.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],a=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:a.x,pageY:a.y});break}}function Ji(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ke.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=G.DOLLY;break;case Ke.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=G.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=G.ROTATE}break;case Ke.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=G.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=G.PAN}break;default:this.state=G.NONE}this.state!==G.NONE&&this.dispatchEvent(wo)}function er(t){switch(this.state){case G.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case G.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case G.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function tr(t){this.enabled===!1||this.enableZoom===!1||this.state!==G.NONE||(t.preventDefault(),this.dispatchEvent(wo),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(Ia))}function or(t){this.enabled!==!1&&this._handleKeyDown(t)}function ar(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case Ye.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=G.TOUCH_ROTATE;break;case Ye.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=G.TOUCH_PAN;break;default:this.state=G.NONE}break;case 2:switch(this.touches.TWO){case Ye.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=G.TOUCH_DOLLY_PAN;break;case Ye.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=G.TOUCH_DOLLY_ROTATE;break;default:this.state=G.NONE}break;default:this.state=G.NONE}this.state!==G.NONE&&this.dispatchEvent(wo)}function ir(t){switch(this._trackPointer(t),this.state){case G.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case G.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case G.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case G.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=G.NONE}}function rr(t){this.enabled!==!1&&t.preventDefault()}function nr(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function sr(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Dt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class ut{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const lr=new va(-1,1,1,-1,0,1);class cr extends Oe{constructor(){super(),this.setAttribute("position",new Bt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Bt([0,2,0,0,2,0],2))}}const dr=new cr;class Pa{constructor(e){this._mesh=new le(dr,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,lr)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Se extends ut{constructor(e,a="tDiffuse"){super(),this.textureID=a,this.uniforms=null,this.material=null,e instanceof ne?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=lt.clone(e.uniforms),this.material=new ne({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Pa(this.material)}render(e,a,o){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=o.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Ho extends ut{constructor(e,a){super(),this.scene=e,this.camera=a,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,a,o){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let s,c;this.inverse?(s=0,c=1):(s=1,c=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,s,4294967295),r.buffers.stencil.setClear(c),r.buffers.stencil.setLocked(!0),e.setRenderTarget(o),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class ur extends ut{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class So{constructor(e,a){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),a===void 0){const o=e.getSize(new U);this._width=o.width,this._height=o.height,a=new Mt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Et}),a.texture.name="EffectComposer.rt1"}else this._width=a.width,this._height=a.height;this.renderTarget1=a,this.renderTarget2=a.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Se(Dt),this.copyPass.material.blending=xi,this.timer=new Mi}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,a){this.passes.splice(a,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const a=this.passes.indexOf(e);a!==-1&&this.passes.splice(a,1)}isLastEnabledPass(e){for(let a=e+1;a<this.passes.length;a++)if(this.passes[a].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const a=this.renderer.getRenderTarget();let o=!1;for(let i=0,r=this.passes.length;i<r;i++){const s=this.passes[i];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,o),s.needsSwap){if(o){const c=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}Ho!==void 0&&(s instanceof Ho?o=!0:s instanceof ur&&(o=!1))}}this.renderer.setRenderTarget(a)}reset(e){if(e===void 0){const a=this.renderer.getSize(new U);this._pixelRatio=this.renderer.getPixelRatio(),this._width=a.width,this._height=a.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,a){this._width=e,this._height=a;const o=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(o,i),this.renderTarget2.setSize(o,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(o,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class _o extends ut{constructor(e,a,o=null,i=null,r=null){super(),this.scene=e,this.camera=a,this.overrideMaterial=o,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new B}render(e,a,o){const i=e.autoClear;e.autoClear=!1;let r,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:o),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=i}}const hr={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new B(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ke extends ut{constructor(e,a=1,o,i){super(),this.strength=a,this.radius=o,this.threshold=i,this.resolution=e!==void 0?new U(e.x,e.y):new U(256,256),this.clearColor=new B(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new Mt(r,s,{type:Et}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const l=new Mt(r,s,{type:Et});l.texture.name="UnrealBloomPass.h"+h,l.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(l);const u=new Mt(r,s,{type:Et});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),s=Math.round(s/2)}const c=hr;this.highPassUniforms=lt.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ne({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];const n=[6,10,14,18,22];r=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(n[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new U(1/r,1/s),r=Math.round(r/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=a,this.compositeMaterial.uniforms.bloomRadius.value=.1;const d=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=d,this.bloomTintColors=[new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=lt.clone(Dt.uniforms),this.blendMaterial=new ne({uniforms:this.copyUniforms,vertexShader:Dt.vertexShader,fragmentShader:Dt.fragmentShader,premultipliedAlpha:!0,blending:V,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new B,this._oldClearAlpha=1,this._basic=new Ze,this._fsQuad=new Pa(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,a){let o=Math.round(e/2),i=Math.round(a/2);this.renderTargetBright.setSize(o,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(o,i),this.renderTargetsVertical[r].setSize(o,i),this.separableBlurMaterials[r].uniforms.invSize.value=new U(1/o,1/i),o=Math.round(o/2),i=Math.round(i/2)}render(e,a,o,i,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=o.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=o.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let c=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=c.texture,this.separableBlurMaterials[n].uniforms.direction.value=ke.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[n]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=ke.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[n]),e.clear(),this._fsQuad.render(e),c=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(o),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=s}_getSeparableBlurMaterial(e){const a=[],o=e/3;for(let i=0;i<e;i++)a.push(.39894*Math.exp(-.5*i*i/(o*o))/o);return new ne({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new U(.5,.5)},direction:{value:new U(.5,.5)},gaussianCoefficients:{value:a}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new ne({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}ke.BlurDirectionX=new U(1,0);ke.BlurDirectionY=new U(0,1);const zo=new ho,gt=new k;class ht extends ya{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],a=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],o=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(o),this.setAttribute("position",new Bt(e,3)),this.setAttribute("uv",new Bt(a,2))}applyMatrix4(e){const a=this.attributes.instanceStart,o=this.attributes.instanceEnd;return a!==void 0&&(a.applyMatrix4(e),o.applyMatrix4(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let a;e instanceof Float32Array?a=e:Array.isArray(e)&&(a=new Float32Array(e));const o=new eo(a,6,1);return this.setAttribute("instanceStart",new Xe(o,3,0)),this.setAttribute("instanceEnd",new Xe(o,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let a;e instanceof Float32Array?a=e:Array.isArray(e)&&(a=new Float32Array(e));const o=new eo(a,6,1);return this.setAttribute("instanceColorStart",new Xe(o,3,0)),this.setAttribute("instanceColorEnd",new Xe(o,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ba(e.geometry)),this}fromLineSegments(e){const a=e.geometry;return this.setPositions(a.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ho);const e=this.attributes.instanceStart,a=this.attributes.instanceEnd;e!==void 0&&a!==void 0&&(this.boundingBox.setFromBufferAttribute(e),zo.setFromBufferAttribute(a),this.boundingBox.union(zo))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wa),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,a=this.attributes.instanceEnd;if(e!==void 0&&a!==void 0){const o=this.boundingSphere.center;this.boundingBox.getCenter(o);let i=0;for(let r=0,s=e.count;r<s;r++)gt.fromBufferAttribute(e,r),i=Math.max(i,o.distanceToSquared(gt)),gt.fromBufferAttribute(a,r),i=Math.max(i,o.distanceToSquared(gt));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}Ct.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new U(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};At.line={uniforms:lt.merge([Ct.common,Ct.fog,Ct.line]),vertexShader:`
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
		`};class me extends ne{constructor(e){super({type:"LineMaterial",uniforms:lt.clone(At.line.uniforms),vertexShader:At.line.vertexShader,fragmentShader:At.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Vt=new ct,Wo=new k,$o=new k,K=new ct,Z=new ct,ge=new ct,qt=new k,Yt=new Sa,J=new Ei,jo=new k,vt=new ho,yt=new wa,ve=new ct;let Ee,We;function Vo(t,e,a){return ve.set(0,0,-e,1).applyMatrix4(t.projectionMatrix),ve.multiplyScalar(1/ve.w),ve.x=We/a.width,ve.y=We/a.height,ve.applyMatrix4(t.projectionMatrixInverse),ve.multiplyScalar(1/ve.w),Math.abs(Math.max(ve.x,ve.y))}function fr(t,e){const a=t.matrixWorld,o=t.geometry,i=o.attributes.instanceStart,r=o.attributes.instanceEnd,s=Math.min(o.instanceCount,i.count);for(let c=0,n=s;c<n;c++){J.start.fromBufferAttribute(i,c),J.end.fromBufferAttribute(r,c),J.applyMatrix4(a);const d=new k,h=new k;Ee.distanceSqToSegment(J.start,J.end,h,d),h.distanceTo(d)<We*.5&&e.push({point:h,pointOnLine:d,distance:Ee.origin.distanceTo(h),object:t,face:null,faceIndex:c,uv:null,uv1:null})}}function mr(t,e,a){const o=e.projectionMatrix,r=t.material.resolution,s=t.matrixWorld,c=t.geometry,n=c.attributes.instanceStart,d=c.attributes.instanceEnd,h=Math.min(c.instanceCount,n.count),l=-e.near;Ee.at(1,ge),ge.w=1,ge.applyMatrix4(e.matrixWorldInverse),ge.applyMatrix4(o),ge.multiplyScalar(1/ge.w),ge.x*=r.x/2,ge.y*=r.y/2,ge.z=0,qt.copy(ge),Yt.multiplyMatrices(e.matrixWorldInverse,s);for(let u=0,f=h;u<f;u++){if(K.fromBufferAttribute(n,u),Z.fromBufferAttribute(d,u),K.w=1,Z.w=1,K.applyMatrix4(Yt),Z.applyMatrix4(Yt),K.z>l&&Z.z>l)continue;if(K.z>l){const M=K.z-Z.z,C=(K.z-l)/M;K.lerp(Z,C)}else if(Z.z>l){const M=Z.z-K.z,C=(Z.z-l)/M;Z.lerp(K,C)}K.applyMatrix4(o),Z.applyMatrix4(o),K.multiplyScalar(1/K.w),Z.multiplyScalar(1/Z.w),K.x*=r.x/2,K.y*=r.y/2,Z.x*=r.x/2,Z.y*=r.y/2,J.start.copy(K),J.start.z=0,J.end.copy(Z),J.end.z=0;const m=J.closestPointToPointParameter(qt,!0);J.at(m,jo);const b=Ft.lerp(K.z,Z.z,m),w=b>=-1&&b<=1,x=qt.distanceTo(jo)<We*.5;if(w&&x){J.start.fromBufferAttribute(n,u),J.end.fromBufferAttribute(d,u),J.start.applyMatrix4(s),J.end.applyMatrix4(s);const M=new k,C=new k;Ee.distanceSqToSegment(J.start,J.end,C,M),a.push({point:C,pointOnLine:M,distance:Ee.origin.distanceTo(C),object:t,face:null,faceIndex:u,uv:null,uv1:null})}}}class ae extends le{constructor(e=new ht,a=new me({color:Math.random()*16777215})){super(e,a),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,a=e.attributes.instanceStart,o=e.attributes.instanceEnd,i=new Float32Array(2*a.count);for(let s=0,c=0,n=a.count;s<n;s++,c+=2)Wo.fromBufferAttribute(a,s),$o.fromBufferAttribute(o,s),i[c]=c===0?0:i[c-1],i[c+1]=i[c]+Wo.distanceTo($o);const r=new eo(i,2,1);return e.setAttribute("instanceDistanceStart",new Xe(r,1,0)),e.setAttribute("instanceDistanceEnd",new Xe(r,1,1)),this}raycast(e,a){const o=this.material.worldUnits,i=e.camera;i===null&&!o&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Ee=e.ray;const s=this.matrixWorld,c=this.geometry,n=this.material;We=n.linewidth+r,c.boundingSphere===null&&c.computeBoundingSphere(),yt.copy(c.boundingSphere).applyMatrix4(s);let d;if(o)d=We*.5;else{const l=Math.max(i.near,yt.distanceToPoint(Ee.origin));d=Vo(i,l,n.resolution)}if(yt.radius+=d,Ee.intersectsSphere(yt)===!1)return;c.boundingBox===null&&c.computeBoundingBox(),vt.copy(c.boundingBox).applyMatrix4(s);let h;if(o)h=We*.5;else{const l=Math.max(i.near,vt.distanceToPoint(Ee.origin));h=Vo(i,l,n.resolution)}vt.expandByScalar(h),Ee.intersectsBox(vt)!==!1&&(o?fr(this,a):mr(this,i,a))}onBeforeRender(e){const a=this.material.uniforms;a&&a.resolution&&(e.getViewport(Vt),this.material.uniforms.resolution.value.set(Vt.z,Vt.w))}}const pr=40,gr=70,Ge=1,H=new WeakMap;let Oa=null;function vr(){return Oa}function ka(t){Oa=t}function oo(t,e,a=1.03){const o=(90-t)*(Math.PI/180),i=(e+180)*(Math.PI/180);return new k(-a*Math.sin(o)*Math.cos(i),a*Math.cos(o),a*Math.sin(o)*Math.sin(i))}let bt=null,qo=0;function Ve(t=!1){const e=Date.now();if(!t&&bt&&e-qo<500)return bt;const a=getComputedStyle(document.documentElement);return bt={neonCyan:a.getPropertyValue("--neon-cyan").trim(),neonGreen:a.getPropertyValue("--neon-green").trim(),neonWarn:a.getPropertyValue("--neon-warn").trim(),neonAlert:a.getPropertyValue("--neon-alert").trim(),neonSelect:a.getPropertyValue("--neon-select").trim()||"#00ffff"},qo=e,bt}function $e(t,e){return t<=pr?e.neonGreen:t<=gr?e.neonWarn:e.neonAlert}function st(t,e,a,o){return[(e+180)/360*a,(90-t)/180*o]}const yr={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.5},scanlineOpacity:{value:.035},aberrationAmt:{value:.0022}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `};function br(t){return t}function wr(t){if(t==null)return br;var e,a,o=t.scale[0],i=t.scale[1],r=t.translate[0],s=t.translate[1];return function(c,n){n||(e=a=0);var d=2,h=c.length,l=new Array(h);for(l[0]=(e+=c[0])*o+r,l[1]=(a+=c[1])*i+s;d<h;)l[d]=c[d],++d;return l}}function Sr(t,e){for(var a,o=t.length,i=o-e;i<--o;)a=t[i],t[i++]=t[o],t[o]=a}function _r(t,e){return typeof e=="string"&&(e=t.objects[e]),e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(a){return Yo(t,a)})}:Yo(t,e)}function Yo(t,e){var a=e.id,o=e.bbox,i=e.properties==null?{}:e.properties,r=Fa(t,e);return a==null&&o==null?{type:"Feature",properties:i,geometry:r}:o==null?{type:"Feature",id:a,properties:i,geometry:r}:{type:"Feature",id:a,bbox:o,properties:i,geometry:r}}function Fa(t,e){var a=wr(t.transform),o=t.arcs;function i(h,l){l.length&&l.pop();for(var u=o[h<0?~h:h],f=0,g=u.length;f<g;++f)l.push(a(u[f],f));h<0&&Sr(l,g)}function r(h){return a(h)}function s(h){for(var l=[],u=0,f=h.length;u<f;++u)i(h[u],l);return l.length<2&&l.push(l[0]),l}function c(h){for(var l=s(h);l.length<4;)l.push(l[0]);return l}function n(h){return h.map(c)}function d(h){var l=h.type,u;switch(l){case"GeometryCollection":return{type:l,geometries:h.geometries.map(d)};case"Point":u=r(h.coordinates);break;case"MultiPoint":u=h.coordinates.map(r);break;case"LineString":u=s(h.arcs);break;case"MultiLineString":u=h.arcs.map(s);break;case"Polygon":u=n(h.arcs);break;case"MultiPolygon":u=h.arcs.map(n);break;default:return null}return{type:l,coordinates:u}}return d(e)}function xr(t,e){var a={},o={},i={},r=[],s=-1;e.forEach(function(d,h){var l=t.arcs[d<0?~d:d],u;l.length<3&&!l[1][0]&&!l[1][1]&&(u=e[++s],e[s]=d,e[h]=u)}),e.forEach(function(d){var h=c(d),l=h[0],u=h[1],f,g;if(f=i[l])if(delete i[f.end],f.push(d),f.end=u,g=o[u]){delete o[g.start];var m=g===f?f:f.concat(g);o[m.start=f.start]=i[m.end=g.end]=m}else o[f.start]=i[f.end]=f;else if(f=o[u])if(delete o[f.start],f.unshift(d),f.start=l,g=i[l]){delete i[g.end];var b=g===f?f:g.concat(f);o[b.start=g.start]=i[b.end=f.end]=b}else o[f.start]=i[f.end]=f;else f=[d],o[f.start=l]=i[f.end=u]=f});function c(d){var h=t.arcs[d<0?~d:d],l=h[0],u;return t.transform?(u=[0,0],h.forEach(function(f){u[0]+=f[0],u[1]+=f[1]})):u=h[h.length-1],d<0?[u,l]:[l,u]}function n(d,h){for(var l in d){var u=d[l];delete h[u.start],delete u.start,delete u.end,u.forEach(function(f){a[f<0?~f:f]=1}),r.push(u)}}return n(i,o),n(o,i),e.forEach(function(d){a[d<0?~d:d]||r.push([d])}),r}function Xo(t){return Fa(t,Mr.apply(this,arguments))}function Mr(t,e,a){var o,i,r;if(arguments.length>1)o=Er(t,e,a);else for(i=0,o=new Array(r=t.arcs.length);i<r;++i)o[i]=i;return{type:"MultiLineString",arcs:xr(t,o)}}function Er(t,e,a){var o=[],i=[],r;function s(l){var u=l<0?~l:l;(i[u]||(i[u]=[])).push({i:l,g:r})}function c(l){l.forEach(s)}function n(l){l.forEach(c)}function d(l){l.forEach(n)}function h(l){switch(r=l,l.type){case"GeometryCollection":l.geometries.forEach(h);break;case"LineString":c(l.arcs);break;case"MultiLineString":case"Polygon":n(l.arcs);break;case"MultiPolygon":d(l.arcs);break}}return h(e),i.forEach(a==null?function(l){o.push(l[0].i)}:function(l){a(l[0].g,l[l.length-1].g)&&o.push(l[0].i)}),o}function at(t,e){const a=[];for(const i of t)for(let r=0;r<i.length-1;r++){const[s,c]=i[r],[n,d]=i[r+1],h=oo(c,s,e),l=oo(d,n,e);a.push(h.x,h.y,h.z,l.x,l.y,l.z)}const o=new ht;return o.setPositions(new Float32Array(a)),o}async function Ar(t){const e=H.get(t);if(!e)return;let a;try{const C=await fetch("/data/countries-110m.json",{signal:e.abortController.signal});if(!C.ok)throw new Error(`HTTP ${C.status}`);a=await C.json(),ka(a)}catch(C){if(C.name==="AbortError")return;console.warn("[s9-threatmap] geo lines: failed to load /data/countries-110m.json",C);return}const o=H.get(t);if(!o)return;const i=t.clientWidth||800,r=t.clientHeight||600,s=new fo,c=o.cyanColor,n=Xo(a,a.objects.land),d=new me({color:c,linewidth:1,transparent:!0,opacity:1,depthWrite:!0});d.resolution.set(i,r);const h=new me({color:c,linewidth:1,transparent:!0,opacity:1,blending:V,depthWrite:!0});h.resolution.set(i,r);const l=new me({color:c,linewidth:1.5,transparent:!0,opacity:.7,blending:V,depthWrite:!1});l.resolution.set(i,r);const u=new ae(at(n.coordinates,1.002),d),f=new ae(at(n.coordinates,1.006),h),g=new ae(at(n.coordinates,1.011),l);u.userData.geoType=f.userData.geoType=g.userData.geoType="coast",s.add(g,f,u);const m=Xo(a,a.objects.countries,(C,E)=>C!==E),b=new me({color:c,linewidth:1,transparent:!0,opacity:.55,depthWrite:!0});b.resolution.set(i,r);const w=new me({color:c,linewidth:1,transparent:!0,opacity:.3,blending:V,depthWrite:!1});w.resolution.set(i,r);const x=new ae(at(m.coordinates,1.012),b),M=new ae(at(m.coordinates,1.022),w);x.userData.geoType=M.userData.geoType="border",s.add(M,x),o.scene.add(s),o.satelliteMode&&(s.visible=!1),o.geoGroup=s,o.geoLineMats=[d,h,l,b,w]}const Q={NODE_FLASH_DUR:80,NODE_SETTLE_DUR:140,NODE_SCALE_PEAK:1.9,NODE_SCALE_DUR:220,NODE_SCALE_RISE:.35,CROSSHAIR_IN_DELAY:40,LABEL_CHAR_RATE:38,LABEL_CURSOR_BLINK:530,LABEL_START_DELAY:250,COORD_SCRAMBLE_DUR:320,COORD_SCRAMBLE_DELAY:80,DESELECT_LABEL_DUR:100,DESELECT_CROSSHAIR_DELAY:80,DESELECT_NODE_DELAY:120,DESELECT_NODE_DUR:180,NODE_DESELECT_SCALE_TROUGH:.65};function Ko(t){return 1-Math.pow(1-t,3)}function Zo(t){return t*t*t}function Qo(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}function Cr(t){const e=H.get(t);if(!e)return;e.nodeTween&&e.nodeTween.mesh.scale.setScalar(1),e.deselectTween&&e.deselectTween.mesh.scale.setScalar(1),e.nodeTween=null,e.deselectTween=null,e.tweenGeneration++;for(const o of e.pendingTimers)clearTimeout(o);e.pendingTimers=[],e.labelTypewriter&&(e.labelTypewriter.cancel(),e.labelTypewriter=null),e.coordScrambleLat&&(e.coordScrambleLat.cancel(),e.coordScrambleLat=null),e.coordScrambleLng&&(e.coordScrambleLng.cancel(),e.coordScrambleLng=null);const a=t.querySelector(".s9-threatmap__crosshair");a&&(a.classList.remove("s9-threatmap__crosshair--animating-in","s9-threatmap__crosshair--animating-out"),a.offsetWidth)}function Tr(t,e,a,o,i){if(e.length===0)return t.textContent="",{cancel:()=>{}};let r=0,s=!0,c=null,n=null,d=!1;function h(){d=!0,clearTimeout(n),clearInterval(c)}function l(){t.textContent=e.slice(0,r)+(s?"_":" ")}l(),c=setInterval(()=>{d||(s=!s,l())},o);function u(){d||(r++,l(),r<e.length?n=setTimeout(u,a):n=setTimeout(()=>{d||(clearInterval(c),t.textContent=e)},o))}return n=setTimeout(u,a),{cancel:h}}function Jo(t,e,a,o,i,r){const s=Date.now(),c=Math.abs(a),n=Math.max(1,Math.floor(Math.log10(c||1))+1);let d=null,h=!1;function l(){h=!0,clearTimeout(d)}function u(){if(h)return;if(Date.now()-s>=i){t.textContent=`${e}${a.toFixed(o)}°`;return}const g=(Math.random()*Math.pow(10,n)).toFixed(o),m=a<0?"-":"";t.textContent=`${e}${m}${g}°`,d=setTimeout(u,40)}return u(),{cancel:l}}function et(t,e){const a=H.get(t);if(!a)return;Cr(t);const o=Ve(),i=a.activeNodeId;if(i!==null){a.activeNodeId=null,t.removeAttribute("data-active-node"),t.dispatchEvent(new CustomEvent("s9:threatmap-node-deselect",{bubbles:!0,detail:{nodeId:i}}));const l=a.nodeMap.get(i);if(e===null){if(l){l.mesh.material.color.set(o.neonSelect||"#00ffff");const b=new B(o.neonSelect||"#00ffff"),w=new B($e(l.level,o)),x=t.querySelector(".s9-threatmap__crosshair-label");x&&x.classList.add("s9-threatmap__crosshair-label--fading");const M=setTimeout(()=>{x&&(x.textContent="",x.classList.remove("s9-threatmap__crosshair-label--fading"))},Q.DESELECT_LABEL_DUR);a.pendingTimers.push(M);const C=setTimeout(()=>{const S=t.querySelector(".s9-threatmap__crosshair");S&&(S.classList.remove("s9-threatmap__crosshair--animating-in","s9-threatmap__crosshair--visible"),S.offsetWidth,S.classList.add("s9-threatmap__crosshair--animating-out"))},Q.DESELECT_CROSSHAIR_DELAY);a.pendingTimers.push(C);const E=setTimeout(()=>{a.deselectTween={generation:a.tweenGeneration,t0:Date.now(),dur:Q.DESELECT_NODE_DUR,troughScale:Q.NODE_DESELECT_SCALE_TROUGH,selectColor:b,levelColor:w,mesh:l.mesh,element:t}},Q.DESELECT_NODE_DELAY);a.pendingTimers.push(E)}else{const b=t.querySelector(".s9-threatmap__crosshair");b&&b.classList.remove("s9-threatmap__crosshair--visible");const w=t.querySelector(".s9-threatmap__crosshair-label");w&&(w.textContent="")}const g=t.querySelector(".s9-threatmap__coords-lat"),m=t.querySelector(".s9-threatmap__coords-lng");g&&(g.textContent="LAT: --.-°"),m&&(m.textContent="LNG: --.-°");return}l&&(l.mesh.scale.setScalar(1),l.mesh.material.color.set($e(l.level,o)));const u=t.querySelector(".s9-threatmap__crosshair");u&&u.classList.remove("s9-threatmap__crosshair--visible");const f=t.querySelector(".s9-threatmap__crosshair-label");f&&(f.textContent="")}if(e===null)return;const r=a.nodeMap.get(e);if(!r)return;if(a.activeNodeId=e,t.setAttribute("data-active-node",e),t.dispatchEvent(new CustomEvent("s9:threatmap-node-select",{bubbles:!0,detail:{nodeId:e,label:r.label,lat:r.lat,lng:r.lng,level:r.level}})),a.reducedMotion){r.mesh.material.color.set(o.neonSelect||"#00ffff"),r.mesh.scale.setScalar(1);const l=t.querySelector(".s9-threatmap__crosshair");l&&l.classList.add("s9-threatmap__crosshair--visible");const u=t.querySelector(".s9-threatmap__crosshair-label");u&&(u.textContent=r.label);const f=t.querySelector(".s9-threatmap__coords-lat"),g=t.querySelector(".s9-threatmap__coords-lng");f&&(f.textContent=`LAT: ${r.lat.toFixed(2)}°`),g&&(g.textContent=`LNG: ${r.lng.toFixed(2)}°`);return}const s=new B("#ffffff"),c=new B(o.neonSelect||"#00ffff");r.mesh.material.color.copy(s),r.mesh.scale.setScalar(1),a.nodeTween={generation:a.tweenGeneration,t0:Date.now(),dur:Q.NODE_SCALE_DUR,riseFrac:Q.NODE_SCALE_RISE,peakScale:Q.NODE_SCALE_PEAK,flashDur:Q.NODE_FLASH_DUR,settleDur:Q.NODE_SETTLE_DUR,flashColor:s,selectColor:c,mesh:r.mesh};const n=setTimeout(()=>{const l=t.querySelector(".s9-threatmap__crosshair");l&&l.classList.add("s9-threatmap__crosshair--visible","s9-threatmap__crosshair--animating-in")},Q.CROSSHAIR_IN_DELAY);a.pendingTimers.push(n);const d=setTimeout(()=>{const l=t.querySelector(".s9-threatmap__coords-lat"),u=t.querySelector(".s9-threatmap__coords-lng");l&&(a.coordScrambleLat=Jo(l,"LAT: ",r.lat,2,Q.COORD_SCRAMBLE_DUR)),u&&(a.coordScrambleLng=Jo(u,"LNG: ",r.lng,2,Q.COORD_SCRAMBLE_DUR))},Q.COORD_SCRAMBLE_DELAY);a.pendingTimers.push(d);const h=setTimeout(()=>{const l=t.querySelector(".s9-threatmap__crosshair-label");l&&(a.labelTypewriter=Tr(l,r.label,Q.LABEL_CHAR_RATE,Q.LABEL_CURSOR_BLINK))},Q.LABEL_START_DELAY);a.pendingTimers.push(h)}function xo(t,e){if(!H.get(t))return;const o=Math.max(0,Math.min(100,e));t.setAttribute("data-threat-level",o)}function Mo(t,e,a){const o=H.get(t);if(!o)return;const i=o.nodeMap.get(e);if(!i)return;const r=i.level;if(i.level=a,i.mesh.userData.level=a,o.activeNodeId!==e){const s=Ve();i.mesh.material.color.set($e(a,s))}return r}function Eo(t,e){const a=H.get(t);if(!a)return;const o=a.nodeMap.get(e);if(!o||Date.now()-a.lastOrbitInteraction<3e3)return;const i=a.camera.position.length();a.cameraLerpTarget=o.mesh.position.clone().normalize().multiplyScalar(i),a.controls.autoRotate=!1,a.resumeTimer!==null&&(clearTimeout(a.resumeTimer),a.resumeTimer=null)}const Lr=t=>t,Ba=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,Na=t=>t>=1?1:1-Math.pow(2,-10*t),Dr=t=>{const a=2.5949095;return t<.5?Math.pow(2*t,2)*((a+1)*2*t-a)/2:(Math.pow(2*t-2,2)*((a+1)*(2*t-2)+a)+2)/2};function Fe({radius:t,numRings:e,samplesPerRing:a,latitudeMin:o,latitudeMax:i,upAxis:r,mode:s="latitude"}){const c=e*a,n=new Float32Array(c*6),d=new Float32Array(c),h=new Float32Array(c);let l=0,u=0;if(s==="longitude"){const g=Math.sin(o),m=Math.sin(i);for(let b=0;b<e;b++){const w=g+b/e*(m-g),x=Math.sqrt(Math.max(0,1-w*w));for(let M=0;M<a;M++){const C=M/a*2*Math.PI,E=(M+1)/a*2*Math.PI;n[l++]=t*w,n[l++]=t*x*Math.cos(C),n[l++]=t*x*Math.sin(C),n[l++]=t*w,n[l++]=t*x*Math.cos(E),n[l++]=t*x*Math.sin(E),d[u]=b,h[u]=M/a,u++}}}else{const g=Math.sin(o),m=Math.sin(i);for(let b=0;b<e;b++){const w=g+b/e*(m-g),x=Math.sqrt(Math.max(0,1-w*w));for(let M=0;M<a;M++){const C=M/a*2*Math.PI,E=(M+1)/a*2*Math.PI;n[l++]=t*x*Math.cos(C),n[l++]=t*w,n[l++]=t*x*Math.sin(C),n[l++]=t*x*Math.cos(E),n[l++]=t*w,n[l++]=t*x*Math.sin(E),d[u]=b,h[u]=M/a,u++}}}const f=new ht;return f.setPositions(n),f.setAttribute("ringIndex",new Ae(d,1)),f.setAttribute("arcPosition",new Ae(h,1)),r==="z"&&f.applyMatrix4(new Sa().makeRotationX(-Math.PI/2)),f}const Rr=`
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
`,Ir=`
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
`,Pr=`
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
`;function Or(t){return t==="north-to-south"?1:t==="equator-out"?2:0}function kr({lineColor:t,lineColorB:e,opacity:a,emissiveIntensity:o,numRings:i,stagger:r,ringFade:s,invert:c,warpAmount:n,direction:d,colorSpread:h,brightSpread:l,flickerAmp:u,flickerSpeed:f,arcColorSpread:g,scrollSpeed:m,scrollAxis:b,gradientMode:w,jitter:x}){return{uProgress:{value:0},uNumRings:{value:i},uStagger:{value:r},uRingFade:{value:s},uInvert:{value:c??0},uOpacity:{value:a},uEmissiveIntensity:{value:o},uColor:{value:new B(t)},uColorB:{value:new B(e??t)},uDirection:{value:Or(d)},uWarpAmount:{value:n},uColorSpread:{value:h},uBrightSpread:{value:l},uFlickerAmp:{value:u},uFlickerSpeed:{value:f},uTime:{value:0},uArcColorSpread:{value:g??0},uScrollSpeed:{value:m??0},uScrollAxis:{value:b??0},uGradientMode:{value:w??0},uJitter:{value:x??0}}}function Fr(t){t.vertexShader.includes("vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 )")||console.warn("[RingReveal] LineMaterial vertex shader injection point changed — warp may be misaligned. Check Three.js version."),t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
attribute float ringIndex;
attribute float arcPosition;
varying float vAlpha;
varying vec3  vRingColor;
varying float vFlickerMult;
${Rr}
${Ir}`),t.vertexShader=t.vertexShader.replace("vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );",`float _scrollOff = uTime * uScrollSpeed;
    float _R = length(instanceStart);
    float _normPos;
    if (uScrollAxis == 1) {
      _normPos = mod(instanceStart.y / _R + _scrollOff + 1.0, 2.0) / 2.0;
    } else {
      _normPos = mod(instanceStart.x / _R + _scrollOff + 1.0, 2.0) / 2.0;
    }
    ${Pr}
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
  gl_FragColor = vec4(vRingColor * uEmissiveIntensity * max(vFlickerMult, 0.0), vAlpha * uOpacity);`)}function Be(t){const{lineWidth:e,blending:a,resolution:o}=t,i=new me({color:16777215,linewidth:e,transparent:!0,depthWrite:!1,blending:a,worldUnits:!1,resolution:o??new U(typeof window<"u"?window.innerWidth:1920,typeof window<"u"?window.innerHeight:1080)});return Object.assign(i.uniforms,kr(t)),i.onBeforeCompile=r=>{Object.assign(r.uniforms,i.uniforms),Fr(r)},i}const wt=new B,St=new B;function it(t){return t==="latitude"?1:0}const Br={radius:1,numRings:48,samplesPerRing:256,latitudeMin:-Math.PI/2,latitudeMax:Math.PI/2,durationMs:1800,easingFn:Ba,direction:"south-to-north",stagger:.4,ringFade:.35,lineColor:65484,lineColorB:65484,lineWidth:1,opacity:.7,glowColor:65484,glowColorB:65484,glowOpacity:.25,glowRadius:1.008,glowLayers:3,glowLayerRadiusStep:.004,glowLayerOpacityFalloff:.5,emissiveIntensity:1.5,warpAmount:.12,morphDurationMs:800,upAxis:"y",mode:"latitude",scrollSpeed:0,colorSpread:0,brightSpread:0,flickerAmp:0,flickerSpeed:2,arcColorSpread:0,gradientMode:0,jitter:0,invert:!1};class Nr{constructor(e,a={}){this._scene=e,this._options={...Br,...a},this._options.ringFade=Math.max(.001,this._options.ringFade),this._options.numRings=Math.max(2,this._options.numRings),this._options.samplesPerRing=Math.max(3,this._options.samplesPerRing),this._options.stagger=Math.max(0,Math.min(1,this._options.stagger)),this._options.radius=Math.max(Number.EPSILON,this._options.radius),this._options.glowRadius=Math.max(Number.EPSILON,this._options.glowRadius),this._options.glowLayers=Math.max(1,Math.round(this._options.glowLayers)),this._playing=!1,this._reversed=!1,this._elapsed=0,this._progress=0,this._onComplete=null,this._morph=null,this._time=0,this._resolution=new U(typeof window<"u"?window.innerWidth:1920,typeof window<"u"?window.innerHeight:1080),this._build()}get isPlaying(){return this._playing}get progress(){return this._progress}get baseRings(){return this._baseRings}get glowRings(){return this._glowLayers[0]}get glowLayers(){return this._glowLayers}play(e){this._reversed=!1,this._playing=!0,this._onComplete=e??null}reverse(e){this._reversed=!0,this._playing=!0,this._onComplete=e??null;const a=1-this._progress;let o=0,i=1;for(let r=0;r<24;r++){const s=(o+i)*.5;this._options.easingFn(s)<a?o=s:i=s}this._elapsed=o*this._options.durationMs}stop(){this._playing=!1}reset(){this._playing=!1,this._reversed=!1,this._elapsed=0,this._progress=0,this._onComplete=null,this._disposeCrossFade(),this._morph=null,this._setProgress(0)}tick(e){var o;this._time+=e/1e3,this._baseRings.material.uniforms.uTime.value=this._time,this._glowLayers.forEach(i=>{i.material.uniforms.uTime.value=this._time});const a=(o=this._morph)==null?void 0:o.crossFade;if(a&&(a.oldBase.material.uniforms.uTime.value=this._time,a.oldGlowLayers.forEach(i=>{i.material.uniforms.uTime.value=this._time})),this._playing){this._elapsed+=e;const i=Math.min(this._elapsed/this._options.durationMs,1),r=this._options.easingFn(i);if(this._progress=this._reversed?1-r:r,this._setProgress(this._progress),this._reversed?this._progress<=0:this._progress>=1){this._playing=!1;const c=this._onComplete;this._onComplete=null,c==null||c()}}if(this._morph){this._morph.elapsed+=e;const i=Math.min(this._morph.elapsed/this._morph.durationMs,1);this._applyMorphT(i),i>=1&&(this._morph=null)}}setColors(e,a){this._baseRings.material.uniforms.uColor.value.set(e),this._glowLayers.forEach(o=>o.material.uniforms.uColor.value.set(a)),this._options.lineColor=e,this._options.glowColor=a}setOpacity(e,a){this._baseRings.material.uniforms.uOpacity.value=e,this._options.opacity=e,a!==void 0&&(this._glowLayers.forEach((o,i)=>{o.material.uniforms.uOpacity.value=a*Math.pow(this._options.glowLayerOpacityFalloff,i)}),this._options.glowOpacity=a)}setScrollSpeed(e){this._options.scrollSpeed=e,this._allMaterials().forEach(a=>{a.uniforms.uScrollSpeed.value=e})}setGradientMode(e){this._options.gradientMode=e,this._allMaterials().forEach(a=>{a.uniforms.uGradientMode.value=e})}setJitter(e){this._options.jitter=e,this._allMaterials().forEach(a=>{a.uniforms.uJitter.value=e})}setInvert(e){this._options.invert=e,this._allMaterials().forEach(a=>{a.uniforms.uInvert.value=e?1:0})}setMode(e){if(e===this._options.mode)return;this._options.mode=e;const a=it(e);this._allMaterials().forEach(o=>{o.uniforms.uScrollAxis.value=a}),this._rebuildGeometry()}setResolution(e,a){this._resolution.set(e,a),this._allMaterials().forEach(o=>{var i;return(i=o.resolution)==null?void 0:i.set(e,a)})}morphTo(e,a){var b;const o=a??this._options.morphDurationMs,i=this._options,r=this._baseRings.material,s=this._glowLayers[0].material;e.durationMs!==void 0&&(i.durationMs=e.durationMs),e.easingFn!==void 0&&(i.easingFn=e.easingFn),e.direction!==void 0&&(i.direction=e.direction),e.morphDurationMs!==void 0&&(i.morphDurationMs=e.morphDurationMs),e.upAxis!==void 0&&(i.upAxis=e.upAxis),e.latitudeMin!==void 0&&(i.latitudeMin=e.latitudeMin),e.latitudeMax!==void 0&&(i.latitudeMax=e.latitudeMax),e.scrollSpeed!==void 0&&this.setScrollSpeed(e.scrollSpeed),e.mode!==void 0&&e.mode!==i.mode&&(i.mode=e.mode),e.lineWidth!==void 0&&(i.lineWidth=e.lineWidth,this._allMaterials().forEach(w=>{w.linewidth=e.lineWidth})),e.glowLayerOpacityFalloff!==void 0&&e.glowLayerOpacityFalloff!==i.glowLayerOpacityFalloff&&(i.glowLayerOpacityFalloff=e.glowLayerOpacityFalloff,this._glowLayers.forEach((w,x)=>{w.material.uniforms.uOpacity.value=i.glowOpacity*Math.pow(i.glowLayerOpacityFalloff,x)}));const c=e.glowLayers!==void 0&&e.glowLayers!==i.glowLayers,n=e.glowLayerRadiusStep!==void 0&&e.glowLayerRadiusStep!==i.glowLayerRadiusStep;c&&(i.glowLayers=Math.max(1,Math.round(e.glowLayers))),n&&(i.glowLayerRadiusStep=e.glowLayerRadiusStep),(c||n)&&this._rebuildGlowLayers();const d=i.radius,h=e.radius??i.radius,l=e.numRings!==void 0&&e.numRings!==i.numRings,u=e.samplesPerRing!==void 0&&e.samplesPerRing!==i.samplesPerRing,f=e.mode!==void 0&&e.mode!==i.mode;let g=null;if(l||u||f){const w=this._baseRings,x=this._glowLayers.slice(),M=r.uniforms.uOpacity.value,C=x.map(y=>y.material.uniforms.uOpacity.value);l&&(i.numRings=e.numRings),u&&(i.samplesPerRing=e.samplesPerRing),f&&(i.mode=e.mode);const E={radius:i.radius,numRings:i.numRings,samplesPerRing:i.samplesPerRing,latitudeMin:i.latitudeMin,latitudeMax:i.latitudeMax,upAxis:i.upAxis,mode:i.mode},S={lineWidth:i.lineWidth,numRings:i.numRings,stagger:r.uniforms.uStagger.value,ringFade:r.uniforms.uRingFade.value,warpAmount:r.uniforms.uWarpAmount.value,emissiveIntensity:r.uniforms.uEmissiveIntensity.value,direction:i.direction,colorSpread:r.uniforms.uColorSpread.value,brightSpread:r.uniforms.uBrightSpread.value,flickerAmp:r.uniforms.uFlickerAmp.value,flickerSpeed:r.uniforms.uFlickerSpeed.value,arcColorSpread:r.uniforms.uArcColorSpread.value,scrollSpeed:i.scrollSpeed,scrollAxis:it(i.mode),gradientMode:i.gradientMode,jitter:i.jitter,invert:i.invert?1:0,resolution:this._resolution},v=Be({...S,lineColor:r.uniforms.uColor.value.getHex(),lineColorB:r.uniforms.uColorB.value.getHex(),opacity:0,blending:Tt});this._baseRings=new ae(Fe(E),v),this._baseRings.renderOrder=w.renderOrder,this._scene.add(this._baseRings),this._glowLayers=[];for(let y=0;y<i.glowLayers;y++){const _=i.radius*i.glowRadius*(1+y*i.glowLayerRadiusStep),p=Be({...S,lineColor:s.uniforms.uColor.value.getHex(),lineColorB:s.uniforms.uColorB.value.getHex(),opacity:0,blending:V}),A=new ae(Fe({...E,radius:_}),p);A.renderOrder=((b=x[0])==null?void 0:b.renderOrder)??0,this._scene.add(A),this._glowLayers.push(A)}this._setProgress(this._progress),this._baseRings.material.uniforms.uTime.value=this._time,this._glowLayers.forEach(y=>{y.material.uniforms.uTime.value=this._time}),g={oldBase:w,oldGlowLayers:x,oldBaseOpacity:M,oldGlowLayerOpacities:C}}const m=this._glowLayers[0].material;this._morph={elapsed:0,durationMs:Math.max(o,0),crossFade:g,from:{lineColor:r.uniforms.uColor.value.clone(),lineColorB:r.uniforms.uColorB.value.clone(),glowColor:s.uniforms.uColor.value.clone(),glowColorB:s.uniforms.uColorB.value.clone(),opacity:g?0:r.uniforms.uOpacity.value,glowOpacity:g?0:s.uniforms.uOpacity.value,emissiveIntensity:r.uniforms.uEmissiveIntensity.value,stagger:r.uniforms.uStagger.value,warpAmount:r.uniforms.uWarpAmount.value,ringFade:r.uniforms.uRingFade.value,colorSpread:r.uniforms.uColorSpread.value,brightSpread:r.uniforms.uBrightSpread.value,flickerAmp:r.uniforms.uFlickerAmp.value,flickerSpeed:r.uniforms.uFlickerSpeed.value,arcColorSpread:r.uniforms.uArcColorSpread.value,jitter:r.uniforms.uJitter.value,radius:d},to:{lineColor:e.lineColor!==void 0?new B(e.lineColor):r.uniforms.uColor.value.clone(),lineColorB:e.lineColorB!==void 0?new B(e.lineColorB):r.uniforms.uColorB.value.clone(),glowColor:e.glowColor!==void 0?new B(e.glowColor):m.uniforms.uColor.value.clone(),glowColorB:e.glowColorB!==void 0?new B(e.glowColorB):m.uniforms.uColorB.value.clone(),opacity:e.opacity??r.uniforms.uOpacity.value,glowOpacity:e.glowOpacity??m.uniforms.uOpacity.value,emissiveIntensity:e.emissiveIntensity??r.uniforms.uEmissiveIntensity.value,stagger:e.stagger??r.uniforms.uStagger.value,warpAmount:e.warpAmount??r.uniforms.uWarpAmount.value,ringFade:e.ringFade??r.uniforms.uRingFade.value,colorSpread:e.colorSpread??r.uniforms.uColorSpread.value,brightSpread:e.brightSpread??r.uniforms.uBrightSpread.value,flickerAmp:e.flickerAmp??r.uniforms.uFlickerAmp.value,flickerSpeed:e.flickerSpeed??r.uniforms.uFlickerSpeed.value,arcColorSpread:e.arcColorSpread??r.uniforms.uArcColorSpread.value,jitter:e.jitter??r.uniforms.uJitter.value,radius:h}},o<=0&&(this._applyMorphT(1),this._morph=null)}dispose(){this._disposeCrossFade(),this._scene.remove(this._baseRings),this._baseRings.geometry.dispose(),this._baseRings.material.dispose(),this._glowLayers.forEach(e=>{this._scene.remove(e),e.geometry.dispose(),e.material.dispose()})}_allMaterials(){return[this._baseRings.material,...this._glowLayers.map(e=>e.material)]}_disposeCrossFade(){var a;const e=(a=this._morph)==null?void 0:a.crossFade;e&&(this._scene.remove(e.oldBase),e.oldBase.geometry.dispose(),e.oldBase.material.dispose(),e.oldGlowLayers.forEach(o=>{this._scene.remove(o),o.geometry.dispose(),o.material.dispose()}))}_build(){const e=this._options,a={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},o={lineWidth:e.lineWidth,emissiveIntensity:e.emissiveIntensity,numRings:e.numRings,stagger:e.stagger,ringFade:e.ringFade,warpAmount:e.warpAmount,direction:e.direction,colorSpread:e.colorSpread,brightSpread:e.brightSpread,flickerAmp:e.flickerAmp,flickerSpeed:e.flickerSpeed,arcColorSpread:e.arcColorSpread,scrollSpeed:e.scrollSpeed,scrollAxis:it(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,invert:e.invert?1:0,resolution:this._resolution},i=Be({...o,lineColor:e.lineColor,lineColorB:e.lineColorB,opacity:e.opacity,blending:Tt});this._baseRings=new ae(Fe(a),i),this._scene.add(this._baseRings),this._glowLayers=[];for(let r=0;r<e.glowLayers;r++){const s=e.radius*e.glowRadius*(1+r*e.glowLayerRadiusStep),c=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,r),n=Be({...o,lineColor:e.glowColor,lineColorB:e.glowColorB,opacity:c,blending:V}),d=new ae(Fe({...a,radius:s}),n);this._scene.add(d),this._glowLayers.push(d)}}_rebuildGlowLayers(){var d,h;const e=this._options,a=(d=this._glowLayers[0])==null?void 0:d.material,o=a?a.uniforms.uColor.value.getHex():e.glowColor,i=a?a.uniforms.uColorB.value.getHex():e.glowColorB,r=((h=this._glowLayers[0])==null?void 0:h.renderOrder)??0;this._glowLayers.forEach(l=>{this._scene.remove(l),l.geometry.dispose(),l.material.dispose()});const s=this._baseRings.material,c={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},n={lineWidth:e.lineWidth,numRings:e.numRings,stagger:s.uniforms.uStagger.value,ringFade:s.uniforms.uRingFade.value,warpAmount:s.uniforms.uWarpAmount.value,emissiveIntensity:s.uniforms.uEmissiveIntensity.value,direction:e.direction,colorSpread:s.uniforms.uColorSpread.value,brightSpread:s.uniforms.uBrightSpread.value,flickerAmp:s.uniforms.uFlickerAmp.value,flickerSpeed:s.uniforms.uFlickerSpeed.value,scrollSpeed:e.scrollSpeed,scrollAxis:it(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,resolution:this._resolution};this._glowLayers=[];for(let l=0;l<e.glowLayers;l++){const u=e.radius*e.glowRadius*(1+l*e.glowLayerRadiusStep),f=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,l),g=Be({...n,lineColor:o,lineColorB:i,opacity:f,blending:V}),m=new ae(Fe({...c,radius:u}),g);m.renderOrder=r,m.material.uniforms.uProgress.value=this._progress,m.material.uniforms.uTime.value=this._time,this._scene.add(m),this._glowLayers.push(m)}}_rebuildGeometry(){var d,h,l;const e=this._options,a=this._baseRings,o=this._glowLayers.slice(),i=a.material,r={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},s={lineWidth:e.lineWidth,numRings:e.numRings,stagger:i.uniforms.uStagger.value,ringFade:i.uniforms.uRingFade.value,warpAmount:i.uniforms.uWarpAmount.value,emissiveIntensity:i.uniforms.uEmissiveIntensity.value,direction:e.direction,colorSpread:i.uniforms.uColorSpread.value,brightSpread:i.uniforms.uBrightSpread.value,flickerAmp:i.uniforms.uFlickerAmp.value,flickerSpeed:i.uniforms.uFlickerSpeed.value,arcColorSpread:((d=i.uniforms.uArcColorSpread)==null?void 0:d.value)??0,scrollSpeed:e.scrollSpeed,scrollAxis:it(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,resolution:this._resolution},c=Be({...s,lineColor:i.uniforms.uColor.value.getHex(),lineColorB:i.uniforms.uColorB.value.getHex(),opacity:i.uniforms.uOpacity.value,blending:Tt});this._baseRings=new ae(Fe(r),c),this._baseRings.renderOrder=a.renderOrder,this._baseRings.material.uniforms.uProgress.value=this._progress,this._baseRings.material.uniforms.uTime.value=this._time,this._scene.add(this._baseRings);const n=(h=o[0])==null?void 0:h.material;this._glowLayers=[];for(let u=0;u<e.glowLayers;u++){const f=e.radius*e.glowRadius*(1+u*e.glowLayerRadiusStep),g=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,u),m=Be({...s,lineColor:(n==null?void 0:n.uniforms.uColor.value.getHex())??e.glowColor,lineColorB:(n==null?void 0:n.uniforms.uColorB.value.getHex())??e.glowColorB,opacity:g,blending:V}),b=new ae(Fe({...r,radius:f}),m);b.renderOrder=((l=o[0])==null?void 0:l.renderOrder)??0,b.material.uniforms.uProgress.value=this._progress,b.material.uniforms.uTime.value=this._time,this._scene.add(b),this._glowLayers.push(b)}this._scene.remove(a),a.geometry.dispose(),a.material.dispose(),o.forEach(u=>{this._scene.remove(u),u.geometry.dispose(),u.material.dispose()})}_setProgress(e){this._baseRings.material.uniforms.uProgress.value=e,this._glowLayers.forEach(a=>{a.material.uniforms.uProgress.value=e})}_applyMorphT(e){const{from:a,to:o}=this._morph,i=this._baseRings.material,r=(d,h)=>d+(h-d)*e;wt.lerpColors(a.lineColor,o.lineColor,e),i.uniforms.uColor.value.copy(wt),St.lerpColors(a.lineColorB,o.lineColorB,e),i.uniforms.uColorB.value.copy(St),i.uniforms.uOpacity.value=r(a.opacity,o.opacity),i.uniforms.uEmissiveIntensity.value=r(a.emissiveIntensity,o.emissiveIntensity),i.uniforms.uStagger.value=r(a.stagger,o.stagger),i.uniforms.uWarpAmount.value=r(a.warpAmount,o.warpAmount),i.uniforms.uRingFade.value=r(a.ringFade,o.ringFade),i.uniforms.uColorSpread.value=r(a.colorSpread,o.colorSpread),i.uniforms.uBrightSpread.value=r(a.brightSpread,o.brightSpread),i.uniforms.uFlickerAmp.value=r(a.flickerAmp,o.flickerAmp),i.uniforms.uFlickerSpeed.value=r(a.flickerSpeed,o.flickerSpeed),i.uniforms.uArcColorSpread.value=r(a.arcColorSpread,o.arcColorSpread),i.uniforms.uJitter.value=r(a.jitter,o.jitter),wt.lerpColors(a.glowColor,o.glowColor,e),St.lerpColors(a.glowColorB,o.glowColorB,e);const s=r(a.glowOpacity,o.glowOpacity),c=this._options.glowLayerOpacityFalloff;this._glowLayers.forEach((d,h)=>{const l=d.material;l.uniforms.uColor.value.copy(wt),l.uniforms.uColorB.value.copy(St),l.uniforms.uOpacity.value=s*Math.pow(c,h),l.uniforms.uEmissiveIntensity.value=r(a.emissiveIntensity,o.emissiveIntensity),l.uniforms.uStagger.value=r(a.stagger,o.stagger),l.uniforms.uWarpAmount.value=r(a.warpAmount,o.warpAmount),l.uniforms.uRingFade.value=r(a.ringFade,o.ringFade),l.uniforms.uColorSpread.value=r(a.colorSpread,o.colorSpread),l.uniforms.uBrightSpread.value=r(a.brightSpread,o.brightSpread),l.uniforms.uFlickerAmp.value=r(a.flickerAmp,o.flickerAmp),l.uniforms.uFlickerSpeed.value=r(a.flickerSpeed,o.flickerSpeed),l.uniforms.uArcColorSpread.value=r(a.arcColorSpread,o.arcColorSpread),l.uniforms.uJitter.value=r(a.jitter,o.jitter)});const n=r(a.radius,o.radius)/this._options.radius;if(this._baseRings.scale.setScalar(n),this._glowLayers.forEach(d=>d.scale.setScalar(n)),this._morph.crossFade){const{oldBase:d,oldGlowLayers:h,oldBaseOpacity:l,oldGlowLayerOpacities:u}=this._morph.crossFade;d.material.uniforms.uOpacity.value=l*(1-e),d.material.uniforms.uProgress.value=this._progress,h.forEach((f,g)=>{f.material.uniforms.uOpacity.value=u[g]*(1-e),f.material.uniforms.uProgress.value=this._progress}),e>=1&&(this._scene.remove(d),d.geometry.dispose(),d.material.dispose(),h.forEach(f=>{this._scene.remove(f),f.geometry.dispose(),f.material.dispose()}))}if(e>=1){const d=this._options;d.opacity=o.opacity,d.glowOpacity=o.glowOpacity,d.emissiveIntensity=o.emissiveIntensity,d.stagger=o.stagger,d.warpAmount=o.warpAmount,d.ringFade=o.ringFade,d.colorSpread=o.colorSpread,d.brightSpread=o.brightSpread,d.flickerAmp=o.flickerAmp,d.flickerSpeed=o.flickerSpeed,d.arcColorSpread=o.arcColorSpread,d.jitter=o.jitter,d.lineColor=o.lineColor.getHex(),d.lineColorB=o.lineColorB.getHex(),d.glowColor=o.glowColor.getHex(),d.glowColorB=o.glowColorB.getHex(),d.radius=o.radius}}}function Ur(t){return t==="bracket"?`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-bracket" aria-hidden="true">
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tr"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--bl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--br"></span>
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`:t==="diamond"?`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-diamond" aria-hidden="true">
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`:`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-box" aria-hidden="true">
    <span class="s9-threatmap__crosshair-label"></span>
  </div>`}function Ua(t,{autoRotate:e=!0,bloomStrength:a=1.7,crosshairShape:o="box"}={}){const i=new AbortController,{signal:r}=i,s=window.matchMedia("(prefers-reduced-motion: reduce)").matches,c=Ve(),n=new mo({antialias:!0,alpha:!0});n.setPixelRatio(window.devicePixelRatio),n.setSize(t.clientWidth||800,t.clientHeight||600),n.domElement.classList.add("s9-threatmap__canvas"),t.appendChild(n.domElement);const d=new po,h=new _a(45,(t.clientWidth||800)/(t.clientHeight||600),.1,100);h.position.set(0,0,3);const l=new Ue(Ge,48,48),u=new Ue(Ge*.98,48,48),f=new B(c.neonCyan||"#00d4b0"),g=new ba(l).getAttribute("position").array,m=new ht;m.setPositions(g);const b=t.clientWidth||800,w=t.clientHeight||600,x=new me({color:f,linewidth:1,transparent:!0,opacity:.014,depthTest:!0,depthWrite:!1});x.resolution.set(b,w);const M=new ae(m,x);M.renderOrder=0,d.add(M);const C=new Ze({colorWrite:!1,depthWrite:!0,depthTest:!0,depthFunc:Ci,side:Ai}),E=new le(u,C);E.renderOrder=1,d.add(E);const S=new Ze({colorWrite:!1,depthWrite:!0,depthTest:!0,side:to}),v=new le(l,S);v.renderOrder=1,d.add(v);const y=new Ze({color:new B("#010e0b"),transparent:!0,opacity:.72,depthTest:!0,depthWrite:!0,side:xa}),_=new le(l,y);_.renderOrder=1,d.add(_);const p=new me({color:f,linewidth:1,transparent:!0,opacity:.05,depthTest:!0,depthWrite:!1});p.resolution.set(b,w);const A=new ae(m,p);A.renderOrder=2,d.add(A);const I=new me({color:f,linewidth:1,transparent:!0,opacity:.03,blending:V,depthTest:!0,depthWrite:!1});I.resolution.set(b,w);const N=new ae(m,I);N.renderOrder=3,d.add(N);const de=new Ue(Ge,48,48),te=new ne({uniforms:{uColor:{value:new k(f.r,f.g,f.b)}},vertexShader:`
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
    `,transparent:!0,blending:V,depthWrite:!1,side:to}),F=new le(de,te);F.renderOrder=4,d.add(F);const R=new Xi(h,n.domElement);R.enableDamping=!0,R.dampingFactor=.05,R.autoRotate=e&&!s,R.autoRotateSpeed=.4,R.enablePan=!1,R.minDistance=1.5,R.maxDistance=5,R.minPolarAngle=Math.PI/2-42.5*Math.PI/180,R.maxPolarAngle=Math.PI/2+42.5*Math.PI/180;const $=new So(n),X=new _o(d,h);$.addPass(X);const ie=new ke(new U(t.clientWidth||800,t.clientHeight||600),a*2,.4,.3);$.addPass(ie);const ue=new Se(yr);$.addPass(ue);const De=document.createElement("div");De.className="s9-threatmap__overlay",De.innerHTML=`
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tr" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--bl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--br" aria-hidden="true"></div>
    ${Ur(o)}
    <div class="s9-threatmap__coords" aria-live="polite">
      <span class="s9-threatmap__coords-lat">LAT: --.-°</span>
      <span class="s9-threatmap__coords-lng">LNG: --.-°</span>
    </div>
    <div class="s9-threatmap__node-count">NODES: 0</div>
  `,t.appendChild(De);let Te=null;R.addEventListener("start",()=>{R.autoRotate=!1,Te!==null&&(clearTimeout(Te),Te=null);const D=H.get(t);D&&(D.cameraLerpTarget=null,D.lastOrbitInteraction=Date.now())}),R.addEventListener("end",()=>{!s&&e&&(Te=setTimeout(()=>{R.autoRotate=!0,Te=null},6e3))});const q=new ResizeObserver(()=>{const D=t.clientWidth,oe=t.clientHeight;if(!D||!oe)return;h.aspect=D/oe,h.updateProjectionMatrix(),n.setSize(D,oe),$.setSize(D,oe),ie.resolution.set(D,oe);const he=H.get(t);if(he){he.globeBackMat.resolution.set(D,oe),he.globeFrontMat.resolution.set(D,oe),he.globeGlowMat.resolution.set(D,oe);for(const P of he.geoLineMats)P.resolution.set(D,oe)}});q.observe(t);const To=new Ti;n.domElement.addEventListener("click",D=>{const oe=H.get(t);if(!oe)return;const he=n.domElement.getBoundingClientRect(),P=he.width,j=he.height,z=(D.clientX-he.left)/P*2-1,re=-((D.clientY-he.top)/j)*2+1;To.setFromCamera(new U(z,re),h);const Le=Array.from(oe.nodeMap.values()).map(fe=>fe.mesh),pe=To.intersectObjects(Le,!1);if(pe.length>0){const fe=pe[0].object;et(t,fe.userData.nodeId)}else oe.activeNodeId!==null&&et(t,null)},{signal:r}),H.set(t,{animFrameId:null,renderer:n,composer:$,bloomPass:ie,controls:R,scene:d,camera:h,resizeObserver:q,nodeMap:new Map,edgeMap:new Map,abortController:i,resumeTimer:null,reducedMotion:s,activeNodeId:null,colors:c,cyanColor:f,globeGeo:l,occluderGeo:u,globeBack:M,globeBackMat:x,occluder:E,frontOccluder:v,globeSurface:_,globeFront:A,globeFrontMat:p,globeGlow:N,globeGlowMat:I,rimGeo:de,rimMesh:F,geoGroup:null,geoLineMats:[],cameraLerpTarget:null,lastOrbitInteraction:0,arcs:[],satelliteMode:!1,sunAngle:Math.random()*Math.PI*2,satelliteGroup:null,holoPass:ue,nodeGeo:new Ue(.02,8,8),nodeTween:null,deselectTween:null,labelTypewriter:null,coordScrambleLat:null,coordScrambleLng:null,pendingTimers:[],tweenGeneration:0,crosshairShape:o});const Lo=H.get(t);let Do=performance.now();function Ro(){const D=H.get(t);if(!D)return;D.animFrameId=requestAnimationFrame(Ro);const oe=performance.now(),he=oe-Do;Do=oe,D.revealAnim&&D.revealAnim.tick(he),D.cameraLerpTarget&&Date.now()-D.lastOrbitInteraction>=3e3&&(D.camera.position.lerp(D.cameraLerpTarget,.06),D.camera.position.distanceTo(D.cameraLerpTarget)<.04&&(D.camera.position.copy(D.cameraLerpTarget),D.cameraLerpTarget=null)),D.controls.update();for(let P=D.arcs.length-1;P>=0;P--){const j=D.arcs[P],z=Math.min(1,(Date.now()-j.t0)/j.dur);if(j.particle.position.copy(j.curve.getPoint(z)),z>.75){const re=1-(z-.75)/.25;j.ptMat.opacity=.9*re,j.lineMat.opacity=.1*re}z>=1&&(D.scene.remove(j.line),D.scene.remove(j.particle),j.lineGeo.dispose(),j.lineMat.dispose(),j.ptGeo.dispose(),j.ptMat.dispose(),D.arcs.splice(P,1))}if(D.satelliteMode&&D.satMat){D.sunAngle+=15e-5;const P=performance.now()*.001;D.satMat.uniforms.sunDir.value.set(Math.cos(D.sunAngle),.22,Math.sin(D.sunAngle)).normalize(),D.satMat.uniforms.time.value=P,D.atmMat&&(D.atmMat.uniforms.time.value=P)}if(D.holoPass&&(D.holoPass.uniforms.time.value=performance.now()*.001),D.activeNodeId!==null){const P=D.nodeMap.get(D.activeNodeId),j=t.querySelector(".s9-threatmap__crosshair");if(P&&j){const z=t.clientWidth,re=t.clientHeight,Le=P.mesh.position.clone().project(D.camera),pe=(Le.x*.5+.5)*z,fe=(-Le.y*.5+.5)*re;j.style.left=`${pe}px`,j.style.top=`${fe}px`}}if(D.nodeTween){const P=D.nodeTween,j=Date.now()-P.t0,z=Math.min(1,j/P.dur),re=z<P.riseFrac?Ko(z/P.riseFrac):Zo((z-P.riseFrac)/(1-P.riseFrac)),Le=z<P.riseFrac?1+(P.peakScale-1)*re:P.peakScale-(P.peakScale-1)*re;P.mesh.scale.setScalar(Le);const pe=P.flashDur/P.dur,fe=P.settleDur/P.dur;if(z<pe)P.mesh.material.color.copy(P.flashColor);else if(z<pe+fe){const bi=(z-pe)/fe;P.mesh.material.color.lerpColors(P.flashColor,P.selectColor,Qo(bi))}else P.mesh.material.color.copy(P.selectColor);z>=1&&(P.mesh.scale.setScalar(1),P.mesh.material.color.copy(P.selectColor),D.nodeTween=null)}if(D.deselectTween){const P=D.deselectTween,j=Date.now()-P.t0,z=Math.min(1,j/P.dur),re=.4,Le=z<re?Zo(z/re):Ko((z-re)/(1-re)),pe=z<re?1-(1-P.troughScale)*Le:P.troughScale+(1-P.troughScale)*Le;if(P.mesh.scale.setScalar(pe),P.mesh.material.color.lerpColors(P.selectColor,P.levelColor,Qo(z)),z>=1){P.mesh.scale.setScalar(1),P.mesh.material.color.copy(P.levelColor);const fe=P.element.querySelector(".s9-threatmap__crosshair");fe&&fe.classList.remove("s9-threatmap__crosshair--animating-out"),D.deselectTween=null}}D.composer.render()}const Ht=new Nr(d,{radius:Ge*1.003,numRings:56,durationMs:2e3,easingFn:Na,direction:"south-to-north",stagger:.55,lineColor:65484,glowColor:65484,emissiveIntensity:2,opacity:0,glowOpacity:0});Ht.baseRings.renderOrder=4,Ht.glowRings.renderOrder=4,Lo.revealAnim=Ht,Lo.animFrameId=requestAnimationFrame(Ro),Ar(t)}function Gr(t){var e;return((e=H.get(t))==null?void 0:e.camera)??null}function Hr(t){var e;return((e=H.get(t))==null?void 0:e.revealAnim)??null}function zr(t){var e;return((e=H.get(t))==null?void 0:e.scene)??null}function Wr(t,e){const a=H.get(t);if(!a)return;const o=a.edgeMap.get(e);o&&(o.line.geometry.dispose(),o.line.material.dispose(),a.scene.remove(o.line),a.edgeMap.delete(e))}function Ga(t){const e=H.get(t);if(!e)return;const a=t.querySelector(".s9-threatmap__node-count");a&&(a.textContent=`NODES: ${e.nodeMap.size}`)}function Ha(t,{id:e,lat:a,lng:o,label:i,level:r}){const s=H.get(t);if(!s)return;if(a<-90||a>90||o<-180||o>180){console.warn(`[s9-threatmap] addNode: invalid coordinates for "${e}": lat=${a}, lng=${o}`);return}if(s.nodeMap.has(e)){console.warn(`[s9-threatmap] addNode: node "${e}" already exists.`);return}const c=Ve(),n=$e(r,c),d=new Ze({color:new B(n)}),h=new le(s.nodeGeo,d);h.renderOrder=5;const l=oo(a,o);h.position.copy(l),h.userData.nodeId=e,h.userData.label=i,h.userData.lat=a,h.userData.lng=o,h.userData.level=r,s.scene.add(h),s.nodeMap.set(e,{mesh:h,lat:a,lng:o,label:i,level:r}),Ga(t)}function za(t,e){const a=H.get(t);if(!a)return;const o=a.nodeMap.get(e);if(!o){console.warn(`[s9-threatmap] removeNode: node "${e}" not found.`);return}a.activeNodeId===e&&et(t,null);for(const[i,r]of a.edgeMap)(r.from===e||r.to===e)&&Wr(t,i);o.mesh.material.dispose(),a.scene.remove(o.mesh),a.nodeMap.delete(e),Ga(t)}function $r(t,e){const a=H.get(t);if(!a||a.reducedMotion)return;const o=a.nodeMap.get(e);if(!o)return;const i=Ve(),r=$e(o.level,i),s=20,c=.035,n=[];for(let b=0;b<=s;b++){const w=b/s*Math.PI*2;n.push(new k(Math.cos(w)*c,Math.sin(w)*c,0))}const d=new Oe().setFromPoints(n),h=new ze({color:new B(r),transparent:!0,opacity:.8,depthWrite:!1}),l=new go(d,h);l.renderOrder=5,l.position.copy(o.mesh.position);const u=o.mesh.position.clone().normalize();l.quaternion.setFromUnitVectors(new k(0,0,1),u),a.scene.add(l);const f=performance.now(),g=700;let m;(function b(w){if(!H.get(t)){cancelAnimationFrame(m),a.scene.remove(l),d.dispose(),h.dispose();return}const x=Math.min(1,(w-f)/g);l.scale.setScalar(1+x*6),h.opacity=.85*(1-x),x<1?m=requestAnimationFrame(b):(a.scene.remove(l),d.dispose(),h.dispose())})(performance.now())}function jr(t,e,a){const o=H.get(t);if(!o||o.reducedMotion)return;const i=o.nodeMap.get(e),r=o.nodeMap.get(a);if(!i||!r)return;const s=Ve(),c=$e(r.level,s),n=i.mesh.position.clone(),d=r.mesh.position.clone(),h=n.clone().add(d).multiplyScalar(.5),l=.2+h.length()*.25,u=h.clone().normalize().multiplyScalar(Ge+l),f=new Li(n,u,d),g=new Oe().setFromPoints(f.getPoints(48)),m=new ze({color:new B(c),transparent:!0,opacity:.1,depthWrite:!1}),b=new vo(g,m);b.renderOrder=2;const w=new Ue(.009,4,4),x=new Ze({color:new B(c),transparent:!0,opacity:.9}),M=new le(w,x);M.renderOrder=3,M.position.copy(n),o.scene.add(b),o.scene.add(M),o.arcs.push({curve:f,line:b,lineGeo:g,lineMat:m,particle:M,ptGeo:w,ptMat:x,t0:Date.now(),dur:1e3+Math.random()*700})}function Vr(t=null){const o=document.createElement("canvas");o.width=2048,o.height=1024;const i=o.getContext("2d"),r=i.createLinearGradient(0,0,0,1024);if(r.addColorStop(0,"#071a2e"),r.addColorStop(.15,"#082035"),r.addColorStop(.5,"#0a2a46"),r.addColorStop(.85,"#082035"),r.addColorStop(1,"#071a2e"),i.fillStyle=r,i.fillRect(0,0,2048,1024),t){const s=_r(t,t.objects.land),n=(s.type==="FeatureCollection"?s.features:[s]).flatMap(l=>{const u=l.geometry;return u?u.type==="Polygon"?[u.coordinates]:u.coordinates:[]}),d=i.createLinearGradient(0,0,0,1024);d.addColorStop(0,"#dce8dc"),d.addColorStop(.06,"#8a9c7a"),d.addColorStop(.16,"#527848"),d.addColorStop(.28,"#4e7040"),d.addColorStop(.4,"#4a6c34"),d.addColorStop(.5,"#3a5c24"),d.addColorStop(.6,"#4a6c34"),d.addColorStop(.72,"#4e7040"),d.addColorStop(.84,"#7a8c6a"),d.addColorStop(.92,"#ccd8c4"),d.addColorStop(1,"#eaf0ea");for(const l of n)for(let u=0;u<l.length;u++){const f=l[u];i.beginPath();for(let g=0;g<f.length;g++){const[m,b]=f[g],w=(m+180)/360*2048,x=(90-b)/180*1024;g===0?i.moveTo(w,x):i.lineTo(w,x)}i.closePath(),i.fillStyle=u===0?d:"#0a2a46",i.fill()}const h=[[22,15,16,28,"rgba(172,142, 88,0.72)"],[23,44,8,12,"rgba(178,148, 96,0.68)"],[27,70,5,9,"rgba(182,158,112,0.52)"],[42,100,6,16,"rgba(152,128, 86,0.58)"],[-25,132,10,17,"rgba(168,134, 82,0.58)"],[-22,-68,4,6,"rgba(142,118, 76,0.48)"],[35,-114,5,8,"rgba(158,128, 82,0.42)"],[40,58,5,8,"rgba(158,134, 88,0.45)"]];for(const[l,u,f,g,m]of h){const[b,w]=st(l,u,2048,1024),x=g/360*2048,M=f/180*1024,C=i.createRadialGradient(b,w,0,b,w,Math.max(x,M)),E=m.replace(/[\d.]+\)$/,"0)");C.addColorStop(0,m),C.addColorStop(.55,m),C.addColorStop(.88,m.replace(/[\d.]+\)$/,"0.08)")),C.addColorStop(1,E),i.fillStyle=C,i.beginPath(),i.ellipse(b,w,x,M,0,0,Math.PI*2),i.fill()}i.strokeStyle="rgba(120,175,210,0.22)",i.lineWidth=.8;for(const l of n){const u=l[0];i.beginPath();for(let f=0;f<u.length;f++){const[g,m]=u[f],b=(g+180)/360*2048,w=(90-m)/180*1024;f===0?i.moveTo(b,w):i.lineTo(b,w)}i.closePath(),i.stroke()}}i.strokeStyle="rgba(100,150,200,0.04)",i.lineWidth=.5;for(let s=-80;s<=80;s+=30){const c=st(s,0,2048,1024)[1];i.beginPath(),i.moveTo(0,c),i.lineTo(2048,c),i.stroke()}for(let s=-180;s<=180;s+=30){const c=st(0,s,2048,1024)[0];i.beginPath(),i.moveTo(c,0),i.lineTo(c,1024),i.stroke()}return o}function qr(){const a=document.createElement("canvas");a.width=1024,a.height=512;const o=a.getContext("2d");o.fillStyle="#000810",o.fillRect(0,0,1024,512);const i=[[40.7,-74,4],[34,-118.2,3.5],[41.9,-87.6,3],[29.8,-95.4,2.5],[19.4,-99.1,3],[43.7,-79.4,3],[45.5,-73.6,2.5],[49.3,-123.1,2],[38.9,-77,2.5],[42.4,-71.1,2.5],[32.8,-96.8,2.5],[33.7,-84.4,2],[37.8,-122.4,2.5],[47.6,-122.3,2],[39.7,-105,2],[33.4,-112.1,2],[36.2,-115.1,2],[29.4,-98.5,2],[32.7,-97.1,2],[30.3,-81.7,1.5],[51,-114.1,2],[53.5,-113.5,2],[49.9,-97.1,2],[14.1,-87.2,1.5],[13.7,-89.2,1.5],[-23.5,-46.6,4],[-22.9,-43.2,3.5],[-34.6,-58.4,3.5],[-12,-77,2],[4.7,-74.1,2],[10.5,-66.9,2],[-33.5,-70.7,2.5],[-3.7,-38.5,2],[-8.1,-34.9,2],[-19.9,-43.9,2.5],[-30,-51.2,2],[-15.8,-47.9,2],[51.5,-.1,4],[48.9,2.3,4],[52.5,13.4,3.5],[55.8,37.6,4],[41,28.9,3.5],[59.9,10.8,2],[59.3,18.1,2],[60.2,25,2],[52.2,21,2.5],[50.1,14.4,2.5],[47.5,19,2.5],[48.2,16.4,2.5],[47.4,8.5,2.5],[48.1,11.6,3],[52.4,4.9,3],[40.4,-3.7,3],[41.4,2.2,3],[45.5,9.2,3],[41.9,12.5,3],[37.9,23.7,2.5],[50,8.7,2.5],[51,13.7,2],[51.2,6.8,2.5],[50.9,4.3,2.5],[53.5,-2.2,2],[55.7,12.6,2],[50.5,30.5,2.5],[59.5,30.3,2.5],[48,37.8,2],[46.5,30.7,2],[49.8,24,2],[50.4,30.5,2],[45.4,28,2],[44.4,26.1,2],[42.7,23.3,2],[37.1,-8.6,2],[30.1,31.3,3.5],[25.2,55.3,2.5],[33.3,44.4,2.5],[35.7,51.4,3],[24.7,46.7,2.5],[31.8,35.2,2],[33.9,35.5,2],[36.8,10.2,2],[32.9,13.2,2],[30.7,29.7,2],[6.5,3.4,2.5],[-26.2,28,3],[-33.9,18.4,2],[-1.3,36.8,2],[5.3,-4,2],[14.7,17.4,1.5],[9.1,7.4,2],[4.4,18.6,1.5],[-4.3,15.3,1.5],[-11.7,43.3,1.5],[-18.9,47.5,1.5],[28.6,77.2,4],[19.1,72.9,3.5],[12.9,77.6,3],[23.7,90.4,3],[24.9,67,2.5],[31.6,74.3,2.5],[33.7,73.1,2],[17.4,78.5,2.5],[22.6,88.4,2.5],[13.1,80.3,2.5],[23,72.6,2],[22.3,70.8,2],[26.9,75.8,2],[21.2,81.4,2],[27.7,85.3,2],[41.3,69.2,2],[43.3,76.9,2],[51.2,71.5,1.5],[53.9,27.6,2],[54.7,55.9,2],[56.8,60.6,2],[55,73.4,2],[56,92.9,2],[52.3,104.3,2],[53.7,87.1,2],[62,129.7,1.5],[43.1,131.9,2],[61.8,34.4,2],[35.7,139.7,5],[37.5,127,4],[39.9,116.4,4.5],[31.2,121.5,4.5],[23.1,113.3,4],[22.3,114.2,3.5],[30.6,104.1,3.5],[32.1,118.8,3.5],[30.3,120.2,3],[36.7,117,2.5],[34.3,108.9,2.5],[26,119.3,2.5],[41.8,123.4,2.5],[45.8,126.5,2.5],[34.6,135.5,3.5],[33.6,130.4,3],[1.3,103.8,3.5],[13.7,100.5,2.5],[10.8,106.7,2.5],[14.6,121,2.5],[3.1,101.7,2.5],[6.2,106.8,3],[21,105.8,2],[-6.2,106.8,2.5],[-33.9,151.2,2.5],[-37.8,144.9,2],[-27.5,153,2],[-31.9,115.9,2],[-43.5,172.6,1.5]];for(const[r,s,c]of i){const[n,d]=st(r,s,1024,512),h=c*2.2,l=o.createRadialGradient(n,d,0,n,d,h);l.addColorStop(0,"rgba(255,210,120,0.22)"),l.addColorStop(.5,"rgba(255,170,60,0.08)"),l.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=l,o.beginPath(),o.arc(n,d,h,0,Math.PI*2),o.fill()}o.globalCompositeOperation="lighter";for(const[r,s,c]of i){const[n,d]=st(r,s,1024,512),h=Math.max(1,c*.9),l=o.createRadialGradient(n,d,0,n,d,h);l.addColorStop(0,`rgba(255,245,200,${Math.min(.9,.5+c*.1)})`),l.addColorStop(.6,"rgba(255,200,100,0.15)"),l.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=l,o.beginPath(),o.arc(n,d,h,0,Math.PI*2),o.fill()}return o.globalCompositeOperation="source-over",a}function ea(t){return new Promise((e,a)=>{new Ma().load(t,e,void 0,a)})}async function Yr(t){const e=H.get(t);if(!e||e.satelliteGroup)return;let a,o,i=1;try{[a,o]=await Promise.all([ea("/textures/earth_day.jpg"),ea("/textures/earth_night.jpg")]),a.colorSpace=Oo,o.colorSpace=Oo}catch(u){console.warn("[s9-threatmap] satellite textures not found, using procedural fallback",u);let f=vr();if(!f)try{const g=await fetch("/data/countries-110m.json");g.ok&&(f=await g.json(),ka(f))}catch{}a=new ko(Vr(f)),o=new ko(qr()),i=0}const r=new ne({uniforms:{dayMap:{value:a},nightMap:{value:o},sunDir:{value:new k(Math.cos(e.sunAngle),.22,Math.sin(e.sunAngle)).normalize()},realTex:{value:i},time:{value:0}},vertexShader:`
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
    `}),s=new Ue(Ge,128,64),c=new le(s,r);c.renderOrder=0;const n=new Ue(Ge*1.055,64,32),d=new ne({uniforms:{glowCol:{value:new B(51455)},sunDir:{value:r.uniforms.sunDir.value},time:{value:0}},vertexShader:`
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
    `,side:to,blending:V,transparent:!0,depthWrite:!1}),h=new le(n,d);h.renderOrder=1;const l=new fo;l.add(c),l.add(h),l.visible=!1,e.scene.add(l),Object.assign(e,{satelliteGroup:l,satGeo:s,satMat:r,atmGeo:n,atmMat:d,dayTex:a,nightTex:o})}async function Xr(t,e){const a=H.get(t);a&&(e?(a.globeBack&&(a.globeBack.visible=!1),a.occluder&&(a.occluder.visible=!1),a.frontOccluder&&(a.frontOccluder.visible=!1),a.globeFront&&(a.globeFront.visible=!1),a.globeSurface&&(a.globeSurface.visible=!1),a.globeGlow&&(a.globeGlow.visible=!1),a.rimMesh&&(a.rimMesh.visible=!1),a.geoGroup&&(a.geoGroup.visible=!1),a.bloomPass&&(a._bloomPrev={strength:a.bloomPass.strength,threshold:a.bloomPass.threshold,radius:a.bloomPass.radius},a.bloomPass.strength=.32,a.bloomPass.threshold=.85,a.bloomPass.radius=.35),a.satelliteMode=!0,await Yr(t),a.satelliteGroup&&(a.satelliteGroup.visible=!0)):(a.satelliteGroup&&(a.satelliteGroup.visible=!1),a.globeBack&&(a.globeBack.visible=!0),a.occluder&&(a.occluder.visible=!0),a.frontOccluder&&(a.frontOccluder.visible=!0),a.globeFront&&(a.globeFront.visible=!0),a.globeSurface&&(a.globeSurface.visible=!0),a.globeGlow&&(a.globeGlow.visible=!0),a.rimMesh&&(a.rimMesh.visible=!0),a.geoGroup&&(a.geoGroup.visible=!0),a.bloomPass&&a._bloomPrev&&(a.bloomPass.strength=a._bloomPrev.strength,a.bloomPass.threshold=a._bloomPrev.threshold,a.bloomPass.radius=a._bloomPrev.radius),a.satelliteMode=!1))}function ta(t){const e=H.get(t);if(!e)return;const a=Ve(!0);e.colors=a;const o=a.neonCyan||"#00d48ddf";if(e.globeBack&&e.globeBack.material.color.set(o),e.globeFront&&e.globeFront.material.color.set(o),e.geoLineMats){const i=a.neonCyan||"#008410D0";for(const r of e.geoLineMats)r.color.set(i)}for(const i of e.nodeMap.values()){const r=$e(i.level,a);i.mesh.material.color.set(r),i.mesh.material.emissive.set(r)}}const Kr=new WeakMap;function Zr(t){const e=new AbortController;Kr.set(t,e),t.classList.add("s9-panel--booting"),t.addEventListener("animationend",a=>{a.animationName==="crt-flicker"&&(t.classList.remove("s9-panel--booting"),t.dispatchEvent(new CustomEvent("s9:panel-mount",{bubbles:!0,detail:{id:t.dataset.s9Id??null}})))},{signal:e.signal,once:!0})}const Xt=["complete","active","failed","pending"];function Qr(t,e){if(!Xt.includes(e)){console.warn(`[s9-sequence] Unknown state: "${e}". Expected one of: ${Xt.join(", ")}.`);return}Xt.forEach(a=>t.classList.remove(`s9-sequence__entry--${a}`)),e==="failed"?(t.classList.add("s9-sequence__entry--fail-flash"),t.addEventListener("animationend",()=>{t.classList.remove("s9-sequence__entry--fail-flash"),t.classList.add("s9-sequence__entry--failed"),oa(t,e)},{once:!0})):(t.classList.add(`s9-sequence__entry--${e}`),oa(t,e))}function oa(t,e){t.dispatchEvent(new CustomEvent("s9:sequence-step-change",{bubbles:!0,detail:{state:e}}))}const Jr={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new U(1/1024,1/512)}},vertexShader:`

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

		}`},Wa=`
// Stable hash — keeps inputs small with fract() to avoid GPU sin() precision issues
float h2(vec2 v) {
  vec2 s = fract(v * vec2(0.1031, 0.1030));
  s += dot(s, s.yx + 33.33);
  return fract((s.x + s.y) * s.x);
}
`,en={uniforms:{tDiffuse:{value:null},tPrev:{value:null},decay:{value:.88}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},tn={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.42},scanlineOpacity:{value:.045},aberrationAmt:{value:.0025}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},on={uniforms:{tDiffuse:{value:null},uTime:{value:0},uHeatAmt:{value:.004},uHeatFreq:{value:60},uHeatSpeed:{value:3.5}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},an={uniforms:{tDiffuse:{value:null},uTime:{value:0},uStreakAmt:{value:.055},uAspect:{value:1.78}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},rn={uniforms:{tDiffuse:{value:null},uBlurStrength:{value:.006}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},nn=`
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

${Wa}

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
  // Columns orbit at r=3.5–8.0, so 3D sphere-surface distance is always ≥2.5.
  // Instead use a cylindrical check: pulse when head sweeps through the globe's
  // Y-span, attenuated by XZ distance from globe surface.
  float xzProx = 1.0 - smoothstep(1.0, 7.0, length(vec2(aWX, aWZ)) - 1.0);
  float yProx  = 1.0 - smoothstep(0.0, 1.2, abs(headY));
  float globeProxRaw = xzProx * yProx;
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
`,sn=`
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

${Wa}

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
  float impulseBright = vGlobeProx * trail * mask * 8.0 * uGlobeInteract;
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
`,ln={uniforms:{tDiffuse:{value:null},uLightPos:{value:null},uDensity:{value:.93},uDecay:{value:.96},uWeight:{value:.35},uExposure:{value:.45},uClampMax:{value:1},uEnabled:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},cn=[..."アウエオカキケコサシスセソタツテナニヌネ",..."ハヒホマミムメモヤヨラリワー",..."012345789z",...':."*+<>|¦╌▪꞊'],dn=8,un=8,ao=600,Qe=120,hn=.12,fn=.08,mn=16,io=3.5,pn=8;function gn(t){const e=new Ma().load(t);return e.flipY=!1,e.minFilter=Pi,e.magFilter=Oi,e.colorSpace=ki,e.generateMipmaps=!0,{tex:e,count:cn.length}}function vn(){const t=new ya,e=new dt(1,1);t.index=e.index.clone(),t.setAttribute("position",e.getAttribute("position").clone()),t.setAttribute("uv",e.getAttribute("uv").clone()),e.dispose();const a=ao*Qe,o=new Float32Array(a),i=new Float32Array(a),r=new Float32Array(a*4),s=new Float32Array(a*4);for(let c=0;c<ao;c++){const n=Math.random()*Math.PI*2,d=1-2*Math.random(),h=Math.sqrt(1-d*d),l=Math.pow(Math.random(),.12),u=io+l*(pn-io),f=h*Math.cos(n)*u,g=h*Math.sin(n)*u,b=d*u+(Math.random()-.5)*2,w=.4+Math.random()*1.87,x=Math.random(),M=.5+Math.random()*1,C=.18+Math.random()*.72,E=.015+Math.random()*.035;for(let S=0;S<Qe;S++){const v=c*Qe+S;o[v]=c,i[v]=S;const y=v*4;r[y]=f,r[y+1]=g,r[y+2]=w,r[y+3]=x,s[y]=b,s[y+1]=M,s[y+2]=C,s[y+3]=E}}return t.setAttribute("aColIdx",new Ae(o,1)),t.setAttribute("aRowIdx",new Ae(i,1)),t.setAttribute("aColA",new Ae(r,4)),t.setAttribute("aColB",new Ae(s,4)),t.instanceCount=a,t}function yn(t,e,a,o){const i=o.clientWidth||1,r=o.clientHeight||1,s=new So(t);s.addPass(new _o(e,a));const c=new ke(new U(i,r),1.15,.45,.2);s.addPass(c);const n=new Se(on);n.enabled=!0,s.addPass(n);const d=t.getDrawingBufferSize(new U);let h=new Ea(d.x,d.y);const l=new Se(en);l.uniforms.tPrev.value=h;const u=l.render.bind(l);l.render=function(M,C,E,S,v){u(M,C,E,S,v),M.copyFramebufferToTexture(this.uniforms.tPrev.value)},s.addPass(l);const f=new Se(rn);f.enabled=!0,f.uniforms.uBlurStrength.value=.002,s.addPass(f);const g=new Se(an);g.enabled=!0,g.uniforms.uAspect.value=i/r,s.addPass(g);const m=new Se(tn);s.addPass(m);const b=new Se(ln);b.uniforms.uLightPos.value=new U(.5,.75),b.enabled=!0,s.addPass(b);const w=new Se(Jr),x=t.getPixelRatio();return w.uniforms.resolution.value.set(1/(i*x),1/(r*x)),s.addPass(w),{composer:s,bloomPass:c,heatPass:n,phosphorPass:l,phosphorTex:h,softenPass:f,streakPass:g,holoPass:m,godRaysPass:b,fxaaPass:w}}const Nt=new Map;function bn(t,e={}){Nt.has(t)&&aa(t);const a=t.querySelector("canvas[data-matrix-rain]");a&&a.remove();const{color:o="#00ff70",opacity:i=.82,syncCamera:r=null}=e,s=new B(o),c=gn("/data/matrixcode_msdf.png"),n=new mo({antialias:!1,alpha:!0});n.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.setSize(t.clientWidth||1,t.clientHeight||1);const d=n.domElement;d.dataset.matrixRain="1",d.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;",t.appendChild(d);const h=new po,l=new _a(45,(t.clientWidth||1)/(t.clientHeight||1),.1,60);l.position.set(0,0,3),l.lookAt(0,0,0);const u=vn(),f={uGlyphTex:{value:c.tex},uGlyphCount:{value:c.count},uAtlasCols:{value:dn},uAtlasGrid:{value:un},uTime:{value:0},uCellW:{value:hn},uCellH:{value:fn},uWorldH:{value:mn},uNRows:{value:Qe},uColor:{value:new k(s.r,s.g,s.b)},uGlobalAlpha:{value:i},uDepth:{value:.04},uPomSteps:{value:6},uNormalStrength:{value:6},uLightDir:{value:new k(-.4,.8,.5).normalize()},uGlobeInteract:{value:1},uGlyphChroma:{value:1}},g=new ne({uniforms:f,vertexShader:nn,fragmentShader:sn,transparent:!0,depthWrite:!1,blending:Ii,blendEquation:Ri,blendSrc:ft,blendDst:ft,blendEquationAlpha:Di,blendSrcAlpha:ft,blendDstAlpha:ft,side:xa,extensions:{derivatives:!0}}),m=new le(u,g);m.frustumCulled=!1,m.renderOrder=1,h.add(m);let{composer:b,bloomPass:w,heatPass:x,phosphorPass:M,phosphorTex:C,softenPass:E,streakPass:S,holoPass:v,godRaysPass:y,fxaaPass:_}=yn(n,h,l,t);const p={renderer:n,composer:b,bloomPass:w,heatPass:x,softenPass:E,phosphorPass:M,phosphorTex:C,holoPass:v,streakPass:S,godRaysPass:y,fxaaPass:_,material:g,geom:u,atlas:c,ro:null,animId:0,syncCamera:r,burstBloomEnabled:!0};Nt.set(t,p);let A=0,I=0,N=-1;function de(F){p.animId=requestAnimationFrame(de);const R=F*.001,$=R-A;if(A=R,f.uTime.value=R,v.uniforms.time.value=R,x.uniforms.uTime.value=R,S.uniforms.uTime.value=R,p.burstBloomEnabled){const X=Math.floor(R/4);if(X!==N&&(N=X,I=.3),I>0){I=Math.max(0,I-$);const ie=1-I/.3;w.threshold=ie<.2?Ft.lerp(.2,.1,ie/.2):Ft.lerp(.1,.2,(ie-.2)/.8)}else w.threshold=.2}else w.threshold=.2;if(p.syncCamera&&(l.position.copy(p.syncCamera.position),l.quaternion.copy(p.syncCamera.quaternion),l.fov=p.syncCamera.fov,l.near=p.syncCamera.near,l.far=p.syncCamera.far,l.updateProjectionMatrix()),l.position.lengthSq()>.001){const X=Math.atan2(l.position.x,l.position.z)+Math.PI/3;f.uLightDir.value.set(Math.sin(X)*.6,.8,Math.cos(X)*.6).normalize()}p.composer.render()}p.animId=requestAnimationFrame(de);let te=!1;return p.ro=new ResizeObserver(()=>{te||(te=!0,requestAnimationFrame(()=>{te=!1;const F=t.clientWidth||1,R=t.clientHeight||1;n.setSize(F,R),p.composer.setSize(F,R),p.bloomPass.resolution.set(F,R);const $=n.getPixelRatio();p.fxaaPass.uniforms.resolution.value.set(1/(F*$),1/(R*$)),p.streakPass.uniforms.uAspect.value=F/R,l.aspect=F/R,l.updateProjectionMatrix();const X=n.getDrawingBufferSize(new U);p.phosphorTex.dispose();const ie=new Ea(X.x,X.y);p.phosphorTex=ie,p.phosphorPass.uniforms.tPrev.value=ie}))}),p.ro.observe(t),{destroy(){aa(t)},setColor(F){const R=new B(F);f.uColor.value.set(R.r,R.g,R.b)},setOpacity(F){f.uGlobalAlpha.value=F},setDepth(F){f.uDepth.value=F},setNormalStrength(F){f.uNormalStrength.value=F},setSoften(F,R){E.enabled=F,R!==void 0&&(E.uniforms.uBlurStrength.value=R)},setHeat(F,R){x.enabled=F,R!==void 0&&(x.uniforms.uHeatAmt.value=R)},setStreaks(F,R){S.enabled=F,R!==void 0&&(S.uniforms.uStreakAmt.value=R)},setBurstBloom(F){p.burstBloomEnabled=F},setGlobeInteract(F){f.uGlobeInteract.value=F?1:0},setDebugGlobeColumn(F){const R=u.getAttribute("aColA"),$=u.getAttribute("aColB"),X=[{wx:1.2,wz:0},{wx:0,wz:1.2},{wx:-1.2,wz:0},{wx:0,wz:-1.2}],ie=ao-X.length;for(let ue=0;ue<X.length;ue++){const De=ie+ue;for(let Te=0;Te<Qe;Te++){const q=(De*Qe+Te)*4;F?(R.array[q]=X[ue].wx,R.array[q+1]=X[ue].wz,R.array[q+2]=1.5,R.array[q+3]=ue*.25,$.array[q]=-6,$.array[q+1]=1,$.array[q+2]=3,$.array[q+3]=.015):(R.array[q]=io,R.array[q+1]=0,R.array[q+2]=1,R.array[q+3]=ue*.25,$.array[q]=0,$.array[q+1]=1,$.array[q+2]=0,$.array[q+3]=.015)}}R.needsUpdate=!0,$.needsUpdate=!0},setGlyphChroma(F,R){f.uGlyphChroma.value=F?R??1:0},setGodRays(F,R,$,X,ie,ue,De){y.uniforms.uEnabled.value=F?1:0,R!==void 0&&(y.uniforms.uLightPos.value.x=R),$!==void 0&&(y.uniforms.uLightPos.value.y=$),X!==void 0&&(y.uniforms.uDensity.value=X),ie!==void 0&&(y.uniforms.uDecay.value=ie),ue!==void 0&&(y.uniforms.uWeight.value=ue),De!==void 0&&(y.uniforms.uExposure.value=De)}}}function aa(t){const e=Nt.get(t);e&&(cancelAnimationFrame(e.animId),e.ro.disconnect(),e.holoPass&&e.holoPass.material.dispose(),e.phosphorPass&&e.phosphorPass.material.dispose(),e.phosphorTex&&e.phosphorTex.dispose(),e.composer.dispose(),e.material.dispose(),e.geom.dispose(),e.atlas.tex.dispose(),e.renderer.dispose(),e.renderer.domElement.remove(),Nt.delete(t))}const $a=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,wn=`
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
}`,Sn=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,_n=`
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
}`,xn=`
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
}`,Mn=`
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
}`,En=`
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
}`,An=`
varying vec2 vUv;
uniform vec3  uColor;
uniform float uIntensity;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float glow = exp(-r * r * 8.0) * uIntensity;
  if (glow < 0.005) discard;
  gl_FragColor = vec4(uColor * glow, glow * 0.6);
}`,Cn={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.38},scanlineOpacity:{value:.07},aberrationAmt:{value:.001}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},W=Math.PI*2,_e=32,Rt=new WeakMap;let Tn=0;function Ln(){return`T-${String(++Tn).padStart(2,"0")}`}function rt(t){return getComputedStyle(document.documentElement).getPropertyValue(t).trim()}function Ie(t){const e=new B().setStyle(t||"#000000");return[e.r,e.g,e.b]}function Ut(t,e,a){return t+(e-t)*Math.max(0,Math.min(1,a))}function Dn(t,e){const a=((t-e)%W+W)%W;return a>Math.PI?a-W:a}function ja(){return{neonCyan:rt("--neon-cyan")||"#00f0ff",neonGreen:rt("--neon-green")||"#00ff9d",neonAlert:rt("--neon-alert")||"#ff00cc",neonWarn:rt("--neon-warn")||"#ffb300",voidColor:rt("--void")||"#05080f"}}function ia(t,e){const a=t.ringHzBase;return e==="friendly"?a*.6:e==="hostile"?a*1.5:a}function Rn(t){const e=Ut(.1,.85,t),a=Ut(.3,.05,t),o=Math.random();return o<e?"hostile":o<e+a?"friendly":"neutral"}function In(t){return t==="friendly"?0:t==="neutral"?1:t==="hostile"?2:3}let nt=null,ro=!1;function Pn(t=.08){if(!ro)try{nt||(nt=new Audio("/sonar-ping.mp3")),nt.volume=Math.min(1,Math.max(0,t)),nt.currentTime=0,nt.play().catch(()=>{})}catch{}}function On(){ro=!ro}function kn(t){const a=new Float32Array(192);for(let i=0;i<64;i++){const r=i/64*W;a[i*3]=Math.sin(r)*t,a[i*3+1]=Math.cos(r)*t,a[i*3+2]=0}const o=new Oe;return o.setAttribute("position",new yo(a,3)),o}function Fn(t){const a=new Float32Array(192);for(let i=0;i<32;i++){const r=i/32*W,s=i%8===0?t*.92:t*.96,c=i*6;a[c]=Math.sin(r)*s,a[c+1]=Math.cos(r)*s,a[c+2]=0,a[c+3]=Math.sin(r)*t,a[c+4]=Math.cos(r)*t,a[c+5]=0}const o=new Oe;return o.setAttribute("position",new yo(a,3)),o}function Bn(t){const{scene:e,R:a,theme:o}=t;t.backgroundMesh&&(t.backgroundMesh.geometry.dispose(),t.backgroundMesh.material.dispose(),e.remove(t.backgroundMesh));const i=new B(o.voidColor),r=new dt(a*2,a*2),s=new ne({vertexShader:$a,fragmentShader:wn,uniforms:{uVoidColor:{value:new k(i.r,i.g,i.b)},uTime:{value:0}},transparent:!0,depthWrite:!0,blending:Tt}),c=new le(r,s);c.renderOrder=0,e.add(c),t.backgroundMesh=c}function Nn(t){const{scene:e,R:a,theme:o}=t;t.centerGlowMesh&&(t.centerGlowMesh.geometry.dispose(),t.centerGlowMesh.material.dispose(),e.remove(t.centerGlowMesh));const i=new B(o.neonCyan),r=a*.5,s=new dt(r,r),c=new ne({vertexShader:$a,fragmentShader:An,uniforms:{uColor:{value:new k(i.r,i.g,i.b)},uIntensity:{value:0}},transparent:!0,depthWrite:!1,blending:V}),n=new le(s,c);n.renderOrder=6,e.add(n),t.centerGlowMesh=n}function Un(t){const{scene:e,R:a,theme:o}=t;t.ringMeshes&&(t.ringMeshes.forEach(d=>{d.geometry.dispose(),e.remove(d)}),t.matRingInner&&t.matRingInner.dispose(),t.matRingOuter&&t.matRingOuter.dispose()),t.ticksMesh&&(t.ticksMesh.geometry.dispose(),t.matRingTicks&&t.matRingTicks.dispose(),e.remove(t.ticksMesh));const i=new ze({color:new B(o.neonCyan),opacity:.18,transparent:!0,depthWrite:!1,blending:V}),r=new ze({color:new B(o.neonCyan),opacity:.28,transparent:!0,depthWrite:!1,blending:V}),s=new ze({color:new B(o.neonCyan),opacity:.22,transparent:!0,depthWrite:!1,blending:V}),c=[.2,.4,.6,.8,1];t.ringMeshes=c.map((d,h)=>{const l=new go(kn(d*a),h<4?i:r);return l.renderOrder=1,e.add(l),l});const n=new Fi(Fn(a),s);n.renderOrder=1,e.add(n),t.ticksMesh=n,t.matRingInner=i,t.matRingOuter=r,t.matRingTicks=s}function Gn(t){const{scene:e,R:a,theme:o}=t;t.sweepTrailMesh&&(t.sweepTrailMesh.geometry.dispose(),t.sweepTrailMesh.material.dispose(),e.remove(t.sweepTrailMesh)),t.sweepArmLine&&(t.sweepArmLine.geometry.dispose(),t.sweepArmLine.material.dispose(),e.remove(t.sweepArmLine));const i=new B(o.neonCyan),r=new k(i.r,i.g,i.b),s=new dt(a*2,a*2),c=new ne({vertexShader:Sn,fragmentShader:_n,uniforms:{uAngle:{value:t.sweepAngle},uArcWidth:{value:Math.PI*.6},uColor:{value:r.clone()},uStaticAmt:{value:1}},transparent:!0,depthWrite:!1,blending:V}),n=new le(s,c);n.renderOrder=2,e.add(n),t.sweepTrailMesh=n;const d=new Float32Array([0,0,0,Math.sin(t.sweepAngle)*a,Math.cos(t.sweepAngle)*a,0]),h=new Oe;h.setAttribute("position",new yo(d,3));const l=new ze({color:new B(o.neonCyan),opacity:.9,transparent:!0,depthWrite:!1,blending:V}),u=new vo(h,l);u.renderOrder=3,e.add(u),t.sweepArmLine=u}function Hn(t){const{scene:e,theme:a}=t;t.contactDotsMesh&&(t.contactDotsMesh.geometry.dispose(),t.contactDotsMesh.material.dispose(),e.remove(t.contactDotsMesh)),t.contactRingsMesh&&(t.contactRingsMesh.geometry.dispose(),t.contactRingsMesh.material.dispose(),e.remove(t.contactRingsMesh));const o=Ie(a.neonGreen),i=Ie(a.neonWarn),r=Ie(a.neonAlert),s=Ie(a.neonCyan);function c(h,l,u){const f=new dt(1,1),g=new Ae(new Float32Array(_e).fill(0),1),m=new Ae(new Float32Array(_e).fill(1),1),b=new Ae(new Float32Array(_e).map(()=>Math.random()),1),w=new Ae(new Float32Array(_e).fill(0),1);g.setUsage(ot),m.setUsage(ot),b.setUsage(ot),w.setUsage(ot),f.setAttribute("a_type",g),f.setAttribute("a_age",m),f.setAttribute("a_phase",b),f.setAttribute("a_sweepFade",w);const x=new ne({vertexShader:xn,fragmentShader:h,uniforms:l,transparent:!0,depthWrite:!1,blending:V}),M=new Bi(f,x,_e);M.renderOrder=u,M.instanceMatrix.setUsage(ot);const C=new Aa;C.scale.setScalar(0),C.updateMatrix();for(let E=0;E<_e;E++)M.setMatrixAt(E,C.matrix);return M.instanceMatrix.needsUpdate=!0,e.add(M),M}const n={uC0:{value:new k(...o)},uC1:{value:new k(...i)},uC2:{value:new k(...r)},uC3:{value:new k(...s)}},d={uC0:{value:new k(...o)},uC1:{value:new k(...i)},uC2:{value:new k(...r)}};t.contactDotsMesh=c(Mn,n,5),t.contactRingsMesh=c(En,d,4)}function zn(t){const{element:e,overlay:a,R:o}=t,i=e.clientWidth/2,r=e.clientHeight/2;t.staticLabelEls.forEach(h=>h.remove()),t.staticLabelEls=[];const s=[2,4,6,8];[.2,.4,.6,.8].forEach((h,l)=>{const u=document.createElement("span");u.className="s9-radar__ring-label",u.textContent=`${s[l]}km`,u.style.left=`${i+h*o+4}px`,u.style.top=`${r}px`,u.style.transform="translateY(-50%)",a.appendChild(u),t.staticLabelEls.push(u)});const n=[["N",0],["NE",W*.125],["E",W*.25],["SE",W*.375],["S",W*.5],["SW",W*.625],["W",W*.75],["NW",W*.875]],d=o*1.05;n.forEach(([h,l])=>{const u=document.createElement("span");u.className="s9-radar__cardinal-label",u.textContent=h,u.style.left=`${i+Math.sin(l)*d}px`,u.style.top=`${r-Math.cos(l)*d}px`,u.style.transform="translate(-50%, -50%)",a.appendChild(u),t.staticLabelEls.push(u)})}function Wn(t){Bn(t),Nn(t),Un(t),Gn(t),zn(t),t.contactDotsMesh?$n(t):Hn(t)}function $n(t){const{contacts:e,dummy:a,contactDotsMesh:o,contactRingsMesh:i,R:r}=t;!o||!i||(e.forEach((s,c)=>{if(!s)a.scale.setScalar(0),a.position.set(0,0,0),a.updateMatrix(),o.setMatrixAt(c,a.matrix),i.setMatrixAt(c,a.matrix);else{const n=s.age<.08?Ut(0,8,s.age/.08):8;a.position.set(Math.sin(s.angle)*s.range*r,Math.cos(s.angle)*s.range*r,0),a.scale.setScalar(n),a.updateMatrix(),o.setMatrixAt(c,a.matrix),a.scale.setScalar(n>0?r*1.5:0),a.updateMatrix(),i.setMatrixAt(c,a.matrix)}}),o.instanceMatrix.needsUpdate=!0,i.instanceMatrix.needsUpdate=!0)}function no(t,e){const a=t.contacts[e];a&&(a.labelEl&&(a.labelEl.remove(),a.labelEl=null),t.contactDotsMesh&&t.contactRingsMesh&&(t.dummy.scale.setScalar(0),t.dummy.position.set(0,0,0),t.dummy.updateMatrix(),t.contactDotsMesh.setMatrixAt(e,t.dummy.matrix),t.contactRingsMesh.setMatrixAt(e,t.dummy.matrix),t.contactDotsMesh.instanceMatrix.needsUpdate=!0,t.contactRingsMesh.instanceMatrix.needsUpdate=!0),t.contacts[e]=null)}function Ao(t,e,a,o,i){var b;const r=t.opts.maxContacts;if(t.contacts.filter(Boolean).length>=r){let w=-1,x=-1;for(let M=0;M<_e;M++)((b=t.contacts[M])==null?void 0:b.type)==="ghost"&&t.contacts[M].age>x&&(w=M,x=t.contacts[M].age);if(w>=0)no(t,w);else return console.warn("[pulse-radar] contact pool full"),null}let c=-1;for(let w=0;w<_e;w++)if(!t.contacts[w]){c=w;break}if(c<0)return null;const n=o==="ghost",d=(e%W+W)%W,h=Math.max(0,Math.min(1,a)),l=Math.sin(d)*h,u=Math.cos(d)*h,f=n?0:.01+Math.random()*.025,g=Math.random()*W,m={id:i||Ln(),angle:d,range:h,wx:l,wy:u,wvx:n?0:Math.sin(g)*f,wvy:n?0:Math.cos(g)*f,type:o,age:n?.85:0,maxAge:n?3e3:8e3+Math.random()*1e4,bornAt:performance.now(),phase:n?Math.random()*.3:1,lastSweep:-1/0,ghostAngle:null,ghostRange:null,ghostSpawned:!1,instIdx:c,labelEl:null,sweepAlpha:n?.15:1,fadeTimeMs:4200*(.88+Math.random()*.24),revealed:n,revealTime:n?performance.now():null};if(!n){const w=document.createElement("span");w.className=`s9-radar__label s9-radar__label--${o}`,w.textContent=o==="hostile"?`${m.id} ⚠HC`:m.id,t.labelsDiv.appendChild(w),m.labelEl=w}return t.contacts[c]=m,m}function It(t){if(t.destroyed||t.reducedMotion)return;const e=Math.max(.05,t.opts.contactDensity),a=Ut(3e3,600,t.threatLevel)/e,o=(Math.random()-.5)*a*.4,i=Math.max(200,a+o);t.spawnTimer=setTimeout(()=>{!t.destroyed&&!t.reducedMotion&&(jn(t),It(t))},i)}function jn(t){const e=t.contacts.filter(r=>r&&r.type!=="ghost"),a=e.length>0&&Math.random()<.3,o=t.sweepAngle;let i;if(a){const r=e[Math.floor(Math.random()*e.length)];i=Math.max(.15,Math.min(.97,r.range+(Math.random()-.5)*.3))}else i=.15+Math.random()*.82;Ao(t,o,i,Rn(t.threatLevel))}function Vn(t,e){if(t.reducedMotion)return;const a=t.sweepAngle;t.sweepAngle=(t.sweepAngle+t.sweepSpeed*e/1e3)%W,t.sweepAngle<a&&(Pn(.06),t.centerGlowIntensity=1),t.centerGlowIntensity>0&&(t.centerGlowIntensity*=Math.pow(.001,e/600),t.centerGlowIntensity<.005&&(t.centerGlowIntensity=0),t.centerGlowMesh&&(t.centerGlowMesh.material.uniforms.uIntensity.value=t.centerGlowIntensity));const o=performance.now();if(t.staticNextAt===null&&(t.staticNextAt=o+7e3+Math.random()*5e3),o>=t.staticNextAt&&!t.staticActive&&(t.staticActive=!0,t.staticEndAt=o+60+Math.random()*40,t.staticNextAt=t.staticEndAt+6e3+Math.random()*4e3),t.staticActive&&(t.sweepTrailMesh.material.uniforms.uStaticAmt.value=.5+Math.random()*.5,o>=t.staticEndAt&&(t.staticActive=!1,t.sweepTrailMesh.material.uniforms.uStaticAmt.value=1)),t.sweepTrailMesh&&(t.sweepTrailMesh.material.uniforms.uAngle.value=t.sweepAngle),t.sweepArmLine){const{R:i}=t,r=t.sweepArmLine.geometry.attributes.position;r.setXYZ(0,0,0,0),r.setXYZ(1,Math.sin(t.sweepAngle)*i,Math.cos(t.sweepAngle)*i,0),r.needsUpdate=!0}}function qn(t,e){const{contacts:a,sweepAngle:o}=t,i=t.now;a.forEach((r,s)=>{if(r){if(r.type!=="ghost"&&(r.wx+=r.wvx*e/1e3,r.wy+=r.wvy*e/1e3,Math.hypot(r.wx,r.wy)>1.02)){no(t,s);return}if(r.age+=e/r.maxAge,r.type!=="ghost"&&!t.reducedMotion){const c=(Math.atan2(r.wx,r.wy)%W+W)%W;Math.abs(Dn(o,c))<.12&&i-r.lastSweep>800&&(r.angle=c,r.range=Math.hypot(r.wx,r.wy),r.phase=0,r.lastSweep=i,r.sweepAlpha=1,r.revealed||(r.revealed=!0,r.revealTime=i))}if(r.type!=="ghost"){if(r.phase<1){const c=r.age>.65&&r.age<.85;r.phase=Math.min(1,r.phase+ia(t,r.type)*(c?.5:1)*e/1e3)}}else r.phase+=ia(t,"neutral")*e/1e3;if(r.type!=="ghost"&&r.revealed){const c=.05+.1*r.range,n=i-r.lastSweep,d=Math.min(1,n/r.fadeTimeMs);r.sweepAlpha=c+(1-c)*Math.pow(1-d,1.025)}r.type!=="ghost"&&!r.ghostSpawned&&r.age>=.65&&r.revealed&&(r.ghostAngle=r.angle,r.ghostRange=r.range,r.ghostSpawned=!0,Ao(t,r.ghostAngle,r.ghostRange,"ghost")),r.age>=1&&no(t,s)}})}function Yn(t){const{contacts:e,dummy:a,contactDotsMesh:o,contactRingsMesh:i,R:r}=t;if(!o||!i)return;let s=!1;e.forEach((c,n)=>{if(!c)return;s=!0;let d;c.revealed?d=Math.min(1,(t.now-c.revealTime)/300)*8:d=0;const h=Math.sin(c.angle)*c.range*r,l=Math.cos(c.angle)*c.range*r;a.position.set(h,l,0),a.scale.setScalar(d),a.updateMatrix(),o.setMatrixAt(n,a.matrix),a.scale.setScalar(d>0?r*1.5:0),a.updateMatrix(),i.setMatrixAt(n,a.matrix);const u=In(c.type);o.geometry.attributes.a_type.setX(n,u),o.geometry.attributes.a_age.setX(n,c.age),o.geometry.attributes.a_phase.setX(n,c.phase),o.geometry.attributes.a_sweepFade.setX(n,c.sweepAlpha),i.geometry.attributes.a_type.setX(n,u),i.geometry.attributes.a_age.setX(n,c.age),i.geometry.attributes.a_phase.setX(n,c.phase),i.geometry.attributes.a_sweepFade.setX(n,c.sweepAlpha)}),s&&(o.instanceMatrix.needsUpdate=!0,i.instanceMatrix.needsUpdate=!0,o.geometry.attributes.a_type.needsUpdate=!0,o.geometry.attributes.a_age.needsUpdate=!0,o.geometry.attributes.a_phase.needsUpdate=!0,o.geometry.attributes.a_sweepFade.needsUpdate=!0,i.geometry.attributes.a_type.needsUpdate=!0,i.geometry.attributes.a_age.needsUpdate=!0,i.geometry.attributes.a_phase.needsUpdate=!0,i.geometry.attributes.a_sweepFade.needsUpdate=!0)}function Xn(t){const{contacts:e,element:a,R:o}=t,i=a.clientWidth/2,r=a.clientHeight/2;e.forEach(s=>{if(!(s!=null&&s.labelEl))return;if(!s.revealed){s.labelEl.style.opacity="0";return}const c=i+Math.sin(s.angle)*s.range*o,n=r-Math.cos(s.angle)*s.range*o;s.labelEl.style.left=`${c+7}px`,s.labelEl.style.top=`${n-6}px`,s.labelEl.style.opacity=String(s.sweepAlpha)})}function Kn(t){if(!t.footerEl)return;const e=t.contacts.filter(o=>o&&o.type!=="ghost").length,a=(W/t.sweepSpeed).toFixed(1);t.footerEl.textContent=`CONTACTS: ${e} | SWEEP: ${a}s`}function so(t,e){if(t.destroyed||!t.rafRunning){t.rafId=null;return}const a=Math.min(e-(t.lastTs??e),100);t.lastTs=e,t.now=e,t.R>0&&(t.backgroundMesh&&(t.backgroundMesh.material.uniforms.uTime.value=e/1e3),t.holoPass&&(t.holoPass.uniforms.time.value=e/1e3),Vn(t,a),qn(t,a),Yn(t),Xn(t),Kn(t),t.composer.render()),t.rafId=requestAnimationFrame(o=>so(t,o))}function Zn(t,e={}){if(Rt.has(t)){console.warn("[pulse-radar] already initialised");const E=Rt.get(t);return{setRadarThreatLevel:E.setRadarThreatLevel,injectContact:E.injectContact}}const a={sweepPeriod:2690,contactDensity:Math.max(0,Math.min(1,e.contactDensity??.5)),threatLevel:Math.max(0,Math.min(1,e.threatLevel??0)),primaryColor:e.primaryColor??null,maxContacts:Math.max(4,Math.min(_e,e.maxContacts??16))},o=ja(),i=document.createElement("canvas");i.className="s9-radar__canvas";const r=document.createElement("div");r.className="s9-radar__overlay";const s=document.createElement("div");s.className="s9-radar__labels",r.appendChild(s),t.appendChild(i),t.appendChild(r),t.style.cursor="pointer",t.addEventListener("click",()=>{On()});let c;try{c=new mo({canvas:i,antialias:!0,alpha:!1,premultipliedAlpha:!1})}catch(E){return console.error("[pulse-radar] WebGL context creation failed",E),i.remove(),r.remove(),t.dispatchEvent(new CustomEvent("pulse-radar:init-failed",{bubbles:!0,detail:{error:E}})),{setRadarThreatLevel:()=>{},injectContact:()=>""}}c.setClearColor(new B(o.voidColor),1),c.setPixelRatio(Math.min(devicePixelRatio,2));const n=new po,d=new va(-1,1,1,-1,.1,100);d.position.z=10;const h=new So(c);h.addPass(new _o(n,d));const l=new ke(new U(t.clientWidth||200,t.clientHeight||200),.8,.65,.25);h.addPass(l);const u=new Se(Cn);h.addPass(u);const f={element:t,canvas:i,overlay:r,labelsDiv:s,renderer:c,scene:n,camera:d,opts:a,theme:o,R:0,sweepAngle:Math.random()*W,sweepSpeed:W/(a.sweepPeriod/1e3),ringPopDuration:a.sweepPeriod/1e3-.5,threatLevel:a.threatLevel,contacts:new Array(_e).fill(null),dummy:new Aa,footerEl:document.getElementById("radar-contacts"),staticLabelEls:[],staticActive:!1,staticNextAt:null,staticEndAt:null,rafId:null,rafRunning:!1,destroyed:!1,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,centerGlowIntensity:0,centerGlowMesh:null,composer:h,bloomPass:l,holoPass:u,backgroundMesh:null,ringMeshes:null,ticksMesh:null,sweepTrailMesh:null,sweepArmLine:null,contactDotsMesh:null,contactRingsMesh:null,matRingInner:null,matRingOuter:null,matRingTicks:null,spawnTimer:null,lastTs:null,now:performance.now(),resizeObserver:null,intersectionObserver:null,_motionMq:null,_motionHandler:null,setRadarThreatLevel:null,injectContact:null};f.ringHzBase=1/f.ringPopDuration,Rt.set(t,f);const g=t.closest(".s9-panel");g&&(g.classList.add("s9-panel--booting"),g.addEventListener("animationend",()=>g.classList.remove("s9-panel--booting"),{once:!0}));const m=new ResizeObserver(E=>{for(const S of E){const{width:v,height:y}=S.contentRect;if(v===0||y===0)return;const _=Math.floor(Math.min(v,y)/2)-8;if(_<=0)return;f.R=_,d.left=-_,d.right=_,d.top=_,d.bottom=-_,d.updateProjectionMatrix(),c.setSize(v,y),f.composer.setSize(v,y),f.bloomPass&&f.bloomPass.resolution.set(v,y),Wn(f)}});m.observe(t),f.resizeObserver=m;const b=new IntersectionObserver(E=>{E.forEach(S=>{f.rafRunning=S.isIntersecting,f.rafRunning&&!f.rafId&&(f.rafId=requestAnimationFrame(v=>so(f,v)))})},{threshold:0});b.observe(t),f.intersectionObserver=b;const w=matchMedia("(prefers-reduced-motion: reduce)"),x=()=>{f.reducedMotion=w.matches,f.reducedMotion?(f.sweepAngle=Math.PI*.15,clearTimeout(f.spawnTimer)):It(f)};w.addEventListener("change",x),f._motionMq=w,f._motionHandler=x,f.rafRunning=!0,f.rafId=requestAnimationFrame(E=>so(f,E)),f.reducedMotion||It(f);function M(E){const S=Math.max(0,Math.min(1,E));f.threatLevel=S,clearTimeout(f.spawnTimer),It(f)}function C(E,S,v){const y=["friendly","neutral","hostile"].includes(v)?v:"neutral",_=Ao(f,E,Math.max(0,Math.min(1,S)),y);return _?_.id:""}return f.setRadarThreatLevel=M,f.injectContact=C,{setRadarThreatLevel:M,injectContact:C}}function Qn(t){const e=Rt.get(t);if(!e)return;const a=ja();e.theme=a;const o=Ie(a.neonGreen),i=Ie(a.neonWarn),r=Ie(a.neonAlert),s=Ie(a.neonCyan),c=new B(a.neonCyan);if(e.backgroundMesh){const n=new B(a.voidColor);e.backgroundMesh.material.uniforms.uVoidColor.value.set(n.r,n.g,n.b),e.renderer.setClearColor(new B(a.voidColor),1)}if(e.matRingInner&&e.matRingInner.color.set(a.neonCyan),e.matRingOuter&&e.matRingOuter.color.set(a.neonCyan),e.matRingTicks&&e.matRingTicks.color.set(a.neonCyan),e.sweepTrailMesh&&e.sweepTrailMesh.material.uniforms.uColor.value.set(c.r,c.g,c.b),e.sweepArmLine&&e.sweepArmLine.material.color.set(a.neonCyan),e.contactDotsMesh){const n=e.contactDotsMesh.material.uniforms;n.uC0.value.set(...o),n.uC1.value.set(...i),n.uC2.value.set(...r),n.uC3.value.set(...s)}if(e.contactRingsMesh){const n=e.contactRingsMesh.material.uniforms;n.uC0.value.set(...o),n.uC1.value.set(...i),n.uC2.value.set(...r)}}const Jn=`
  attribute vec2 a_pos;
  varying vec2 vUv;
  void main() {
    vUv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }`,es=`
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
    gRgbSplitPx = uGlitchRgb * mix(4.0, 14.0, intensity);

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
  }`;function ra(t,e,a){const o=t.createShader(e);return t.shaderSource(o,a),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)||console.error("Telescreen shader error:",t.getShaderInfoLog(o)),o}function ts(t,e,a){const o=e.getContext("webgl");if(!o)return console.warn("Telescreen: WebGL not available"),{destroy(){}};const i=a.getContext("2d"),r={prog:null,buf:null,tex:null,aPos:-1,uLocs:{}};function s(){const v=o.createProgram();o.attachShader(v,ra(o,o.VERTEX_SHADER,Jn)),o.attachShader(v,ra(o,o.FRAGMENT_SHADER,es)),o.linkProgram(v),o.useProgram(v);const y=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,y),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),o.STATIC_DRAW);const _=o.getAttribLocation(v,"a_pos");o.enableVertexAttribArray(_),o.vertexAttribPointer(_,2,o.FLOAT,!1,0,0);const p={res:o.getUniformLocation(v,"iResolution"),time:o.getUniformLocation(v,"uTime"),imgOffset:o.getUniformLocation(v,"uImgOffset"),imgScale:o.getUniformLocation(v,"uImgScale"),diffuse:o.getUniformLocation(v,"tDiffuse"),glitchEnabled:o.getUniformLocation(v,"uGlitchEnabled"),glitchActive:o.getUniformLocation(v,"uGlitchActive"),glitchStrength:o.getUniformLocation(v,"uGlitchStrength"),glitchSpeed:o.getUniformLocation(v,"uGlitchSpeed"),glitchCols:o.getUniformLocation(v,"uGlitchCols"),glitchRgb:o.getUniformLocation(v,"uGlitchRgb"),hardPix:o.getUniformLocation(v,"uHardPix"),warpMult:o.getUniformLocation(v,"uWarpMult"),maskStr:o.getUniformLocation(v,"uMaskStr"),grainAmt:o.getUniformLocation(v,"uGrainAmt"),halationStr:o.getUniformLocation(v,"uHalationStr"),convergence:o.getUniformLocation(v,"uConvergence"),scratch:o.getUniformLocation(v,"tScratch"),scratchStr:o.getUniformLocation(v,"uScratchStr")},A=o.createTexture();o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,A),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.uniform1i(p.diffuse,0),o.uniform1i(p.scratch,1);const I=o.createTexture();o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,I),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,new Uint8Array([0,0,0,255])),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.activeTexture(o.TEXTURE0),Object.assign(r,{prog:v,buf:y,tex:A,scratchTex:I,aPos:_,uLocs:p})}s();function c(){!n.complete||!n.naturalWidth||!r.scratchTex||(o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,r.scratchTex),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,n),o.activeTexture(o.TEXTURE0))}const n=new Image;n.onload=c,n.src="/data/scratches.jpg";let d=!1,h=null,l=!1,u=0,f=0,g=0;const m={glitchEnabled:1,glitchActive:0,glitchStrength:.025,glitchSpeed:8,glitchCols:30,glitchRgb:.5,glitchMaxDelay:3.5,glitchMaxBurst:.7,hardPix:-1.2,warpMult:2,maskStr:1,grainAmt:.04,halationStr:3,convergence:.07,scratchStr:.2};function b(){o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,r.tex),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,t),d=!0}function w(v,y,_,p){const A=Math.max(v/_,y/p)*.8,I=_*A,N=p*A;return{ox:(v-I)/2/v,oy:(y-N)/2/y,sx:I/v,sy:N/y}}function x(){const v=e.clientWidth||576,y=e.clientHeight||432;e.width=v,e.height=y,a.width=v,a.height=y,l||o.viewport(0,0,v,y)}function M(){if(!t.naturalWidth)return;const v=a.width,y=a.height,_=t.naturalWidth,p=t.naturalHeight,A=Math.max(v/_,y/p)*.8,I=_*A,N=p*A;i.clearRect(0,0,v,y),i.drawImage(t,(v-I)/2,(y-N)/2,I,N)}e.addEventListener("webglcontextlost",v=>{v.preventDefault(),l=!0}),e.addEventListener("webglcontextrestored",()=>{l=!1,d=!1,s(),x(),b(),c()});function C(v){u=requestAnimationFrame(C),h||(h=v);const y=(v-h)/1e3;if(d&&!l){if(m.glitchEnabled)if(y>=g){if(m.glitchActive=0,y>=f){const F=.08+Math.random()*m.glitchMaxBurst;g=y+F,f=y+F+.3+Math.random()*m.glitchMaxDelay,m.glitchActive=1}}else m.glitchActive=1;else m.glitchActive=0;const _=e.width,p=e.height,A=t.naturalWidth,I=t.naturalHeight,N=p/1,de=_/p*N;o.uniform2f(r.uLocs.res,de,N),o.uniform1f(r.uLocs.time,y);const te=w(_,p,A,I);o.uniform2f(r.uLocs.imgOffset,te.ox,te.oy),o.uniform2f(r.uLocs.imgScale,te.sx,te.sy),o.uniform1f(r.uLocs.glitchEnabled,m.glitchEnabled),o.uniform1f(r.uLocs.glitchActive,m.glitchActive),o.uniform1f(r.uLocs.glitchStrength,m.glitchStrength),o.uniform1f(r.uLocs.glitchSpeed,m.glitchSpeed),o.uniform1f(r.uLocs.glitchCols,m.glitchCols),o.uniform1f(r.uLocs.glitchRgb,m.glitchRgb),o.uniform1f(r.uLocs.hardPix,m.hardPix),o.uniform1f(r.uLocs.warpMult,m.warpMult),o.uniform1f(r.uLocs.maskStr,m.maskStr),o.uniform1f(r.uLocs.grainAmt,m.grainAmt),o.uniform1f(r.uLocs.halationStr,m.halationStr),o.uniform1f(r.uLocs.convergence,m.convergence),o.uniform1f(r.uLocs.scratchStr,m.scratchStr),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,r.scratchTex),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,r.tex),o.drawArrays(o.TRIANGLE_STRIP,0,4),M()}}function E(){x(),b(),M(),u=requestAnimationFrame(C)}t.complete&&t.naturalWidth?E():t.addEventListener("load",E);const S=new ResizeObserver(()=>{x(),M()});return S.observe(e),{destroy(){cancelAnimationFrame(u),S.disconnect()},setGlitch(v,y,_,p,A,I,N){m.glitchEnabled=v?1:0,m.glitchEnabled||(m.glitchActive=0,f=0,g=0),y!==void 0&&(m.glitchStrength=y),_!==void 0&&(m.glitchSpeed=_),p!==void 0&&(m.glitchCols=p),A!==void 0&&(m.glitchRgb=A),I!==void 0&&(m.glitchMaxDelay=I),N!==void 0&&(m.glitchMaxBurst=N)},setShader({hardPix:v,warpMult:y,maskStr:_,grainAmt:p,halationStr:A,convergence:I,scratchStr:N}={}){v!==void 0&&(m.hardPix=v),y!==void 0&&(m.warpMult=y),_!==void 0&&(m.maskStr=_),p!==void 0&&(m.grainAmt=p),A!==void 0&&(m.halationStr=A),I!==void 0&&(m.convergence=I),N!==void 0&&(m.scratchStr=N)}}}const na=[{cls:"sigint",headline:"SIGNAL INTERCEPT: FREQ 12.4GHz",detail:"Encrypted burst tx — POSEIDON signature"},{cls:"humint",headline:"ASSET CONFIRM: NIIHAMA-04",detail:"Target movement: port district, 0300 local"},{cls:"cyber",headline:"ZERO-DAY: CVE-2026-3917",detail:"Legacy auth stack — remote exec payload ready"},{cls:"ghost",headline:"DIVE ANOMALY: SECTOR ALPHA",detail:"Ghost-barrier interference at 4.1m depth"},{cls:"elint",headline:"DRONE SWEEP: SECTOR 12",detail:"Coverage 73% — ETA 4 minutes to full map"},{cls:"sigint",headline:"PACKET STORM: 192.168.7.0/24",detail:"18k pps sustained — possible DDoS staging"},{cls:"cyber",headline:"EXFIL CHANNEL COMPROMISED",detail:"Fallback route DELTA-9 now primary exfil"},{cls:"humint",headline:"CONTACT LOST: ROMEO-7",detail:"Last check-in 03:14:22 UTC — status unknown"},{cls:"ghost",headline:"TACHIKOMA: AUTONOMOUS SWEEP",detail:"Unit 9 executing sector 7 independently"},{cls:"elint",headline:"EM PULSE DETECTED: ZONE 3",detail:"Localized disruption — comm nodes offline"},{cls:"sigint",headline:"NODE COMMS SPIKE: BEIJING",detail:"340% increase in encrypted P2P — 0300-0500"},{cls:"cyber",headline:"FIREWALL PROBE: AS12345",detail:"Systematic port sweep — countermeasures deployed"},{cls:"humint",headline:"BROKER IDENTIFIED: LAUGHING MAN",detail:"Dark web auction — biotech data linked to incident"},{cls:"ghost",headline:"GHOST PROTOCOL: BETA-3",detail:"Shell confirmed on target system — extract ready"},{cls:"elint",headline:"SAT PASS: KH-17 WINDOW",detail:"6 min coverage — imaging tasked to sector 4"}];function os(t){const e=document.createElement("div");return e.className=`sigint-item sigint-item--${t.cls}`,e.innerHTML=`
    <div class="sigint-item__class">${t.cls.toUpperCase()}</div>
    <div class="sigint-item__headline">${t.headline}</div>
    <div class="sigint-item__detail">${t.detail}</div>
  `,e}function as(t){if(!t)return;const e=4,a=[];function o(){const i=new Set(a.map(h=>{var l;return(l=h.querySelector(".sigint-item__headline"))==null?void 0:l.textContent})),r=na.filter(h=>!i.has(h.headline)),s=r.length>0?r:na,c=s[Math.floor(Math.random()*s.length)],n=os(c);t.insertBefore(n,t.firstChild),a.unshift(n),requestAnimationFrame(()=>n.classList.add("sigint-item--visible"));const d=8e3+Math.random()*12e3;for(setTimeout(()=>{n.classList.add("sigint-item--closing"),n.classList.remove("sigint-item--visible"),setTimeout(()=>{n.remove();const h=a.indexOf(n);h>=0&&a.splice(h,1)},500)},d);a.length>e;){const h=a.pop();h.classList.add("sigint-item--closing"),h.classList.remove("sigint-item--visible"),setTimeout(()=>h.remove(),500)}setTimeout(o,3e3+Math.random()*6e3)}setTimeout(o,800),setTimeout(o,2200)}const sa=[{cls:"STRATEGIC",headline:"BIOMECH TREATY VOTE: 72HRS",detail:"Section 9 on standby for security detail"},{cls:"TACTICAL",headline:"LAUGHING MAN: ACTIVE",detail:"New sightings logged in Niihama and Togusa ward"},{cls:"ASSET",headline:"BATOU: FIELD POSITION UPDATE",detail:"Grid 7-Delta — visual on primary target"},{cls:"THREAT",headline:"PUPPET MASTER PROTOCOL",detail:"AI ghost-dive signatures — 3 confirmed nodes"},{cls:"STRATEGIC",headline:"ARAMAKI: SITUATION ROOM",detail:"Director briefing at 0600 UTC — attendance req"},{cls:"TACTICAL",headline:"TOGUSA: DEEP COVER",detail:"Identity: Muto Ryo — corporate embedded"},{cls:"THREAT",headline:"ROGUE TACHIKOMA UNIT",detail:"Unit 14 unresponsive — last GPS: Sector 9-Bravo"},{cls:"ASSET",headline:"ISHIKAWA: CYBER BREACH",detail:"Target mainframe penetrated — exfil in 180s"},{cls:"STRATEGIC",headline:"COMA CHIP EXPLOIT: CONFIRMED",detail:"Hardware vulnerability — 40k units affected"},{cls:"TACTICAL",headline:"HELICOPTER SUPPORT: STANDING BY",detail:"AH-6J on tarmac — ETA to sector: 4 min"}];function is(t){const e=document.createElement("div");return e.className="intel-item",e.innerHTML=`
    <div class="intel-item__class">${t.cls}</div>
    <div class="intel-item__headline">${t.headline}</div>
    <div class="intel-item__detail">${t.detail}</div>
  `,e}function rs(t){if(!t)return;const e=5,a=[];function o(){const i=new Set(a.map(h=>{var l;return(l=h.querySelector(".intel-item__headline"))==null?void 0:l.textContent})),r=sa.filter(h=>!i.has(h.headline)),s=r.length>0?r:sa,c=s[Math.floor(Math.random()*s.length)],n=is(c);t.insertBefore(n,t.firstChild),a.unshift(n),requestAnimationFrame(()=>n.classList.add("intel-item--visible"));const d=1e4+Math.random()*15e3;for(setTimeout(()=>{n.classList.add("intel-item--closing"),n.classList.remove("intel-item--visible"),setTimeout(()=>{n.remove();const h=a.indexOf(n);h>=0&&a.splice(h,1)},500)},d);a.length>e;){const h=a.pop();h.classList.add("intel-item--closing"),h.classList.remove("intel-item--visible"),setTimeout(()=>h.remove(),500)}setTimeout(o,4e3+Math.random()*8e3)}setTimeout(o,1200),setTimeout(o,3500),setTimeout(o,5800)}function ee(t,e){return Math.floor(Math.random()*(e-t+1))+t}const ye=()=>`${ee(10,220)}.${ee(0,255)}.${ee(0,255)}.${ee(1,254)}`,Kt=()=>[22,80,443,8443,4444,3389,21,1337,9999][Math.floor(Math.random()*9)],ns=()=>`${ee(64,65535)}B`,ss=()=>Array.from({length:4},()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0")).join(" "),la=[()=>({source:"AUTH",message:`HANDSHAKE COMPLETE — ${ye()}:${Kt()}`,alert:!1}),()=>({source:"NET",message:`PKT ${ns()} ${ye()} → ${ye()}`,alert:!1}),()=>({source:"GHOST",message:`DIVE DEPTH: ${(2+Math.random()*3).toFixed(1)}m — STABLE`,alert:!1}),()=>({source:"CRYPT",message:"AES-256 SESSION KEY ESTABLISHED",alert:!1}),()=>({source:"SCAN",message:`PROBE: ${ye()}:${Kt()} — ${ss()}`,alert:!0}),()=>({source:"SYS",message:`MEM ${ee(60,92)}% CPU ${ee(20,80)}% THERMAL OK`,alert:!1}),()=>({source:"NET",message:`LATENCY ${ee(4,45)}ms — ${Math.random()<.8?"NOMINAL":"DEGRADED"}`,alert:Math.random()<.2}),()=>({source:"AUTH",message:`TOKEN REFRESH: UID-${ee(1e3,9999)}`,alert:!1}),()=>({source:"CRIT",message:`INTRUSION SIG: ${ye()} PORT ${Kt()}`,alert:!0}),()=>({source:"SYS",message:`COUNTERMEASURE DEPLOYED — BLOCK RULE ${ee(100,999)}`,alert:!1}),()=>({source:"NET",message:`ROUTE CHANGE: AS${ee(1e3,65e3)} VIA ${ye()}`,alert:!1}),()=>({source:"CRYPT",message:`TLS 1.3 HANDSHAKE: ${ye()} — ${ee(0,1)?"ECDH":"RSA"}-4096`,alert:!1}),()=>({source:"SCAN",message:`ANOMALY: BURST ${ee(800,9999)} PPS FROM ${ye()}`,alert:!0}),()=>({source:"GHOST",message:`GHOST COEFFICIENT: ${(92+Math.random()*8).toFixed(1)}%`,alert:!1}),()=>({source:"AUTH",message:`CERT CHAIN VALID — SHA-${ee(0,1)?"256":"512"}`,alert:!1}),()=>({source:"NET",message:`DNS RESOLVE: ${["niihama.net","togusa.local","sec9.gov","puppet.io"][Math.floor(Math.random()*4)]}`,alert:!1}),()=>({source:"SYS",message:`FIREWALL RULE ${ee(1e3,9999)}: DROP ${ye()}/${ee(24,32)}`,alert:!1}),()=>({source:"CRIT",message:`ZERO-DAY ATTEMPT: ${ye()} — MITIGATED`,alert:!0})];function ls(t,e){function a(){const o=la[Math.floor(Math.random()*la.length)];e(t,{timestamp:new Date().toISOString(),...o()})}for(let o=0;o<8;o++)a();setInterval(a,ee(1200,2800))}function Re(t,e){return Math.floor(Math.random()*(e-t+1))+t}const He=[{id:"n-tokyo",lat:35.68,lng:139.69,label:"TOKYO"},{id:"n-moscow",lat:55.75,lng:37.62,label:"MOSCOW"},{id:"n-beijing",lat:39.91,lng:116.39,label:"BEIJING"},{id:"n-london",lat:51.51,lng:-.13,label:"LONDON"},{id:"n-nyc",lat:40.71,lng:-74,label:"NEW YORK"},{id:"n-sydney",lat:-33.87,lng:151.21,label:"SYDNEY"},{id:"n-dubai",lat:25.2,lng:55.27,label:"DUBAI"},{id:"n-saopaulo",lat:-23.55,lng:-46.63,label:"SÃO PAULO"},{id:"n-paris",lat:48.86,lng:2.35,label:"PARIS"},{id:"n-seoul",lat:37.57,lng:126.98,label:"SEOUL"},{id:"n-cairo",lat:30.05,lng:31.24,label:"CAIRO"},{id:"n-berlin",lat:52.52,lng:13.41,label:"BERLIN"},{id:"n-mumbai",lat:19.08,lng:72.88,label:"MUMBAI"},{id:"n-toronto",lat:43.65,lng:-79.38,label:"TORONTO"},{id:"n-singapore",lat:1.35,lng:103.82,label:"SINGAPORE"},{id:"n-nairobi",lat:-1.29,lng:36.82,label:"NAIROBI"},{id:"n-istanbul",lat:41.01,lng:28.97,label:"ISTANBUL"},{id:"n-lagos",lat:6.52,lng:3.38,label:"LAGOS"}],Va={"n-tokyo":{country:"JAPAN",pop:"13.96M",status:"FINANCIAL HUB"},"n-moscow":{country:"RUSSIA",pop:"12.51M",status:"RESTRICTED"},"n-beijing":{country:"CHINA",pop:"21.54M",status:"RESTRICTED"},"n-london":{country:"UK",pop:"8.98M",status:"ALLIED NODE"},"n-nyc":{country:"USA",pop:"8.34M",status:"ALLIED NODE"},"n-sydney":{country:"AUSTRALIA",pop:"5.31M",status:"ALLIED NODE"},"n-dubai":{country:"UAE",pop:"3.33M",status:"NEUTRAL ZONE"},"n-saopaulo":{country:"BRAZIL",pop:"12.33M",status:"MONITORED"},"n-paris":{country:"FRANCE",pop:"2.15M",status:"ALLIED NODE"},"n-seoul":{country:"S.KOREA",pop:"9.78M",status:"ALLIED NODE"},"n-cairo":{country:"EGYPT",pop:"10.08M",status:"MONITORED"},"n-berlin":{country:"GERMANY",pop:"3.66M",status:"ALLIED NODE"},"n-mumbai":{country:"INDIA",pop:"20.67M",status:"MONITORED"},"n-toronto":{country:"CANADA",pop:"2.93M",status:"ALLIED NODE"},"n-singapore":{country:"SINGAPORE",pop:"5.45M",status:"NEUTRAL ZONE"},"n-nairobi":{country:"KENYA",pop:"4.40M",status:"MONITORED"},"n-istanbul":{country:"TURKEY",pop:"15.46M",status:"NEUTRAL ZONE"},"n-lagos":{country:"NIGERIA",pop:"14.86M",status:"MONITORED"}},Pt=He.slice(0,8),qa=[15,72,55,18,28,10,45,33];function Ya(t){let e=t.split("").reduce((n,d)=>n*31+d.charCodeAt(0)>>>0,7);const a=()=>(e=e*1664525+1013904223>>>0,(e>>>16)/65535),o=9,i=140,r=34,s=i/o;let c=`<svg viewBox="0 0 ${i} ${r}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;height:34px;">`;c+='<g fill="currentColor">';for(let n=0;n<o;n++){const d=8+a()*24,h=s*(.48+a()*.44),l=n*s+(s-h)*.5;c+=`<rect x="${l.toFixed(1)}" y="${(r-d).toFixed(1)}" width="${h.toFixed(1)}" height="${d.toFixed(1)}"/>`}return c+="</g></svg>",c}function cs(t,e,a,o){const{addNode:i,removeNode:r,updateNodeLevel:s,setThreatLevel:c,setActiveNode:n,focusNode:d,pulseGlobeNode:h,spawnArc:l,appendRow:u,printLine:f,setRadarThreatLevel:g}=o,m=new Map;function b(S,v){t.dispatchEvent(new CustomEvent("s9:alert",{bubbles:!0,detail:{level:v>=70?"critical":"warning",source:S}}))}function w(S,v){i(t,{...S,level:v}),m.set(S.id,v),u(e,{timestamp:new Date().toISOString(),source:"NET",message:`NODE ONLINE: ${S.label} — LVL ${v}`,alert:v>=70}),v>=70&&(b(S.label,v),n(t,S.id),d(t,S.id))}Pt.forEach((S,v)=>{setTimeout(()=>{w(S,qa[v]),v===Pt.length-1&&setTimeout(()=>{c(t,55),g(.55)},800)},v*300+500)});let x=!1;function M(){if(x)return;const S=[...m.keys()],v=He.filter(_=>!m.has(_.id)),y=Math.random();if(y<.28&&v.length>0){const _=v[Re(0,v.length-1)],p=Re(5,65);w(_,p),f(a,`SIGNAL ACQUIRED: ${_.label}`,"sys")}else if(y<.42&&S.length>5){const _=S[Re(0,S.length-1)],p=He.find(A=>A.id===_);r(t,_),m.delete(_),f(a,`SIGNAL LOST: ${(p==null?void 0:p.label)??_}`,"info"),u(e,{timestamp:new Date().toISOString(),source:"NET",message:`NODE OFFLINE: ${(p==null?void 0:p.label)??_}`,alert:!1})}else if(y<.72&&S.length>0){const _=S[Re(0,S.length-1)],p=He.find(F=>F.id===_),A=m.get(_)??0,I=Re(8,28),N=Math.min(100,A+I);s(t,_,N),m.set(_,N),c(t,Math.max(...Array.from(m.values()))),g(Math.max(...Array.from(m.values()))/100),f(a,`THREAT ESCALATION: ${(p==null?void 0:p.label)??_} ${A}→${N}`,N>=70?"err":"sys"),u(e,{timestamp:new Date().toISOString(),source:"CRIT",message:`THREAT UP: ${(p==null?void 0:p.label)??_} LVL=${N}`,alert:N>=70}),N>=70&&A<70&&(b((p==null?void 0:p.label)??_,N),n(t,_),d(t,_));const de=A>=70?2:A>=40?1:0,te=N>=70?2:N>=40?1:0;de!==te&&h(t,_)}else if(S.length>0){const _=S[Re(0,S.length-1)],p=He.find(te=>te.id===_),A=m.get(_)??50,I=Math.max(0,A-Re(5,18));s(t,_,I),m.set(_,I),c(t,Math.max(0,...Array.from(m.values()))),g(Math.max(0,...Array.from(m.values()))/100),f(a,`THREAT REDUCED: ${(p==null?void 0:p.label)??_} LVL=${I}`,"info");const N=A>=70?2:A>=40?1:0,de=I>=70?2:I>=40?1:0;N!==de&&h(t,_)}if(S.length>=2){const _=1+Math.floor(Math.random()*3);for(let p=0;p<_;p++){const A=S[Math.floor(Math.random()*S.length)];let I=S[Math.floor(Math.random()*S.length)];I===A&&(I=S[(S.indexOf(A)+1)%S.length]),I!==A&&l(t,A,I)}}setTimeout(M,Re(4e3,9e3))}setTimeout(M,Pt.length*300+2500);const C=setInterval(()=>{const S=[...m.keys()];if(S.length<2)return;const v=Math.random()<.4?2:1;for(let y=0;y<v;y++){const _=S[Math.floor(Math.random()*S.length)];let p=S[Math.floor(Math.random()*S.length)];p===_&&(p=S[(S.indexOf(_)+1)%S.length]),p!==_&&l(t,_,p)}},1200),E=setInterval(()=>{const S=[...m.entries()].filter(([,A])=>A>=70);if(S.length===0)return;const v=t.getAttribute("data-active-node"),y=S.filter(([A])=>A!==v),_=y.length>0?y:S,[p]=_[Math.floor(Math.random()*_.length)];n(t,p),d(t,p)},8e3);return{globeNodes:m,destroy(){x=!0,clearInterval(C),clearInterval(E)}}}function ds(t,e,a,o,i){const{initThreatMap:r,addNode:s,removeNode:c,updateNodeLevel:n,setThreatLevel:d,setActiveNode:h,focusNode:l}=i;r(t,{autoRotate:!0,bloomStrength:.7});const u=new Map;e.forEach((v,y)=>{setTimeout(()=>{s(t,{...v,level:a[y]}),u.set(v.id,a[y])},y*200+300)}),setTimeout(()=>d(t,55),e.length*200+800);const f=document.getElementById("tact-node-info"),g=document.getElementById("tact-btn-add"),m=document.getElementById("tact-btn-remove"),b=document.getElementById("tact-btn-focus"),w=document.getElementById("tact-btn-deselect"),x=document.getElementById("tact-level-slider"),M=document.getElementById("tact-level-val"),C=document.getElementById("tact-level-row");let E=null;function S(){const v=E!==null&&u.has(E);if(m.disabled=!v,b.disabled=!v,w.disabled=!v,x.disabled=!v,C.style.opacity=v?"1":"0.4",C.style.pointerEvents=v?"auto":"none",v){const y=o.find(p=>p.id===E),_=u.get(E);f.textContent=`${(y==null?void 0:y.label)??E} — LVL ${_}`,x.value=_,M.textContent=_}else f.textContent="NO NODE SELECTED"}t.addEventListener("s9:threatmap-node-select",v=>{E=v.detail.nodeId,document.getElementById("tactical-threat").textContent=`THREAT: ${v.detail.level} — ${v.detail.label}`,S()}),t.addEventListener("s9:threatmap-node-deselect",()=>{E=null,S()}),g.addEventListener("click",()=>{const v=o.filter(p=>!u.has(p.id));if(v.length===0)return;const y=v[Math.floor(Math.random()*v.length)],_=Math.floor(Math.random()*60)+10;s(t,{...y,level:_}),u.set(y.id,_),d(t,Math.max(...u.values())),h(t,y.id),l(t,y.id)}),m.addEventListener("click",()=>{E&&(c(t,E),u.delete(E),d(t,u.size>0?Math.max(...u.values()):0),E=null,S())}),b.addEventListener("click",()=>{E&&l(t,E)}),w.addEventListener("click",()=>{h(t,null),E=null,S()}),x.addEventListener("input",()=>{if(!E)return;const v=parseInt(x.value);M.textContent=v,n(t,E,v),u.set(E,v),d(t,Math.max(...u.values()));const y=o.find(_=>_.id===E);f.textContent=`${(y==null?void 0:y.label)??E} — LVL ${v}`}),S()}const _t=[{id:"sec9",label:"SEC.9 HQ",x:50,y:50,root:!0},{id:"niihama",label:"NIIHAMA",x:22,y:22},{id:"togusa",label:"TOGUSA",x:78,y:22},{id:"batou",label:"BATOU",x:78,y:78},{id:"ishikawa",label:"ISHIKAWA",x:22,y:78},{id:"relay1",label:"RELAY ALPHA",x:36,y:32},{id:"relay2",label:"RELAY BETA",x:64,y:32},{id:"relay3",label:"RELAY GAMMA",x:36,y:68},{id:"relay4",label:"RELAY DELTA",x:64,y:68},{id:"ext1",label:"PUPPET MASTER",x:12,y:50},{id:"ext2",label:"LAUGHING MAN",x:88,y:50},{id:"tachi",label:"TACHIKOMA U9",x:50,y:12}],ca=[{id:"e01",from:"sec9",to:"relay1"},{id:"e02",from:"sec9",to:"relay2"},{id:"e03",from:"sec9",to:"relay3"},{id:"e04",from:"sec9",to:"relay4"},{id:"e05",from:"relay1",to:"niihama"},{id:"e06",from:"relay2",to:"togusa"},{id:"e07",from:"relay3",to:"ishikawa"},{id:"e08",from:"relay4",to:"batou"},{id:"e09",from:"niihama",to:"ext1"},{id:"e10",from:"ext1",to:"relay3"},{id:"e11",from:"togusa",to:"relay1"},{id:"e12",from:"batou",to:"relay2"},{id:"e13",from:"ext2",to:"relay2"},{id:"e14",from:"ext2",to:"relay4"},{id:"e15",from:"sec9",to:"tachi"},{id:"e16",from:"relay1",to:"relay2"},{id:"e17",from:"relay3",to:"relay4"}],Zt={relay2:72,relay4:88,ext1:95,ext2:80,niihama:45,batou:55};function us(t,e){if(!t)return;const{initMatrix:a,activateEdge:o,deactivateEdge:i,pulseNode:r,setActiveNode:s}=e;a(t,{nodes:_t,edges:ca});for(const[l,u]of Object.entries(Zt)){const f=t.querySelector(`[data-node-id="${l}"]`);f&&(u>=70?f.classList.add("s9-matrix__node--threat-high"):u>=40&&f.classList.add("s9-matrix__node--threat-mid"))}s(t,"ext1");const c=ca.map(l=>l.id),n=new Set,d=[null,null,"var(--neon-warn)","var(--neon-alert)","var(--neon-green)",null];function h(){if(n.size>0){const g=[...n],m=g[Math.floor(Math.random()*g.length)];i(t,m),n.delete(m)}const l=c.filter(g=>!n.has(g)),u=Math.random()<.4?2:1;for(let g=0;g<u&&l.length>0;g++){const m=l.splice(Math.floor(Math.random()*l.length),1)[0],b=d[Math.floor(Math.random()*d.length)];o(t,m,b),n.add(m)}if(Math.random()<.35){const g=_t[Math.floor(Math.random()*_t.length)];r(t,g.id)}const f=document.getElementById("flow-overlay");if(f){const g=Object.values(Zt).filter(w=>w>=70).length,m=Object.values(Zt).filter(w=>w>=40&&w<70).length,b=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";f.innerHTML=`<span style="font-family:var(--font-terminal);font-size: 0.7rem;color:${b};opacity:0.7">NODES: ${_t.length} &nbsp; <span style="color:var(--text-alert)">CRIT: ${g}</span> &nbsp; <span style="color:var(--neon-warn)">WARN: ${m}</span></span>`}}for(let l=0;l<4;l++){const u=c[Math.floor(Math.random()*c.length)];n.has(u)||(o(t,u),n.add(u))}setInterval(h,700),h(),document.getElementById("matrix-status").textContent="● LIVE"}const Xa=new WeakMap;function hs(t,{onSubmit:e,tabComplete:a}={}){const o=new AbortController,{signal:i}=o,r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s={abortController:o,history:[],historyIndex:-1,partialInput:"",reducedMotion:r};Xa.set(t,s);const c=t.querySelector(".s9-terminal__input");c&&c.addEventListener("keydown",n=>{ms(t,n,{onSubmit:e,tabComplete:a})},{signal:i})}function O(t,e,a){const o=t.querySelector(".s9-terminal__output");if(!o)return;const i=document.createElement("span");i.className=`s9-terminal__line s9-terminal__line--${a}`,i.textContent=e,o.appendChild(i);const r=200,s=o.querySelectorAll(".s9-terminal__line");s.length>r&&s[0].remove(),ps(o)}function fs(t){const e=t.querySelector(".s9-terminal__output");e&&(e.querySelectorAll(".s9-terminal__line").forEach(a=>a.remove()),t.dispatchEvent(new CustomEvent("s9:terminal-clear",{bubbles:!0})))}function ms(t,e,{onSubmit:a,tabComplete:o}){const i=Xa.get(t);if(!i)return;const r=t.querySelector(".s9-terminal__input");if(r)switch(e.key){case"Enter":{const s=r.value;if(!s)return;O(t,s,"cmd"),typeof a=="function"&&a(s),t.dispatchEvent(new CustomEvent("s9:terminal-submit",{bubbles:!0,detail:{command:s,timestamp:new Date().toISOString()}})),i.history.unshift(s),i.historyIndex=-1,i.partialInput="",r.value="";break}case"ArrowUp":{if(e.preventDefault(),i.history.length===0)return;i.historyIndex===-1&&(i.partialInput=r.value);const s=i.historyIndex+1;if(s<i.history.length){i.historyIndex=s,r.value=i.history[i.historyIndex];const c=r.value.length;r.setSelectionRange(c,c)}break}case"ArrowDown":{if(e.preventDefault(),i.historyIndex===-1)return;if(i.historyIndex>0){i.historyIndex-=1,r.value=i.history[i.historyIndex];const s=r.value.length;r.setSelectionRange(s,s)}else{i.historyIndex=-1,r.value=i.partialInput;const s=r.value.length;r.setSelectionRange(s,s)}break}case"Tab":{if(e.preventDefault(),typeof o=="function"){const s=o(r.value);s!=null&&(r.value=s)}break}default:{if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!i.reducedMotion&&Math.random()<.01){const s=t.querySelector(".s9-terminal__output");if(s){const n=Array.from(s.querySelectorAll(".s9-terminal__line")).slice(-8);if(n.length>0){const d=n[Math.floor(Math.random()*n.length)];d.classList.add("glitch-enter"),d.addEventListener("animationend",h=>{h.animationName==="glitch"&&d.classList.remove("glitch-enter")},{once:!0})}}}break}}}function ps(t){t.scrollTop=t.scrollHeight}const Ot={"":"MATRIX GREEN",gits:"GHOST IN THE SHELL",amber:"AMBER",phosphor:"PHOSPHOR",blood:"BLOOD"};let Ka=null,Za=null,lo=null,da=null,ua=null;function Qa(t){const e=document.documentElement;t===""||t==="matrixgreen"?delete e.dataset.theme:e.dataset.theme=t,document.querySelectorAll(".topbar__theme-btn").forEach(a=>{a.classList.toggle("topbar__theme-btn--active",(a.dataset.themeSet??"")===(t==="matrixgreen"?"":t))}),ta(Ka),lo&&lo()&&ta(document.getElementById("threatmap-tactical")),Qn(Za)}function gs({threatEl:t,radarEl:e,getTacticalInited:a,termEl:o,printLine:i}){Ka=t,Za=e,lo=a,da=o,ua=i,document.querySelectorAll(".topbar__theme-btn").forEach(r=>{r.addEventListener("click",()=>{const s=r.dataset.themeSet??"";Qa(s),ua(da,`THEME: ${Ot[s]??s.toUpperCase()}`,"sys")})})}function ha(){const t=new Date;document.getElementById("topbar-clock").textContent=`UTC ${t.toUTCString().split(" ")[4]}`}function vs(){ha(),setInterval(ha,1e3)}function ys({termEl:t,applyTheme:e,globeNodes:a,metrics:o,radar:i,threatEl:r,updateNodeLevel:s,setThreatLevel:c,setActiveNode:n,focusNode:d,CITY_POOL:h,CITY_DATA:l,citySkyline:u,npCity:f,npSkyline:g,npCountry:m,npPop:b,npCoords:w,npThreat:x,npStatus:M,nodePopup:C}){hs(t,{onSubmit(E){var _;const S=E.trim().split(/\s+/),v=S[0].toLowerCase(),y=S.slice(1);switch(v){case"help":O(t,"SECTION 9 COMMAND INTERFACE — AVAILABLE COMMANDS:","sys"),O(t,"  status              — system status report","info"),O(t,"  ghost               — ghost coefficient analysis","info"),O(t,"  nodes               — list active threat nodes","info"),O(t,"  threat <lvl>        — set global threat level 0-100","info"),O(t,"  threat <id> <lvl>   — set node threat level","info"),O(t,"  focus <id>          — focus camera on node","info"),O(t,"  theme <name>        — switch theme","info"),O(t,"  themes              — list available themes","info"),O(t,"  clear               — clear terminal","info");break;case"status":{const p=a.size,A=[...a.values()].filter(N=>N>=70).length,I=p>0?Math.max(...a.values()):0;O(t,"── SYSTEM STATUS ──────────────────────────","sys"),O(t,`  CPU: ${o.cpu}%   MEM: ${o.mem}%   NET I/O: ${o.net}%`,"info"),O(t,`  GHOST LAYER: ${o.ghost}%   ENCRYPTION: ${o.enc}%`,"info"),O(t,`  NODES ON GRID: ${p}   CRITICAL: ${A}`,A>0?"err":"info"),O(t,`  PEAK THREAT: ${I}   GLOBAL LEVEL: ${I}`,I>=70?"err":"sys"),O(t,"  SECURE CHANNEL: ACTIVE   ENCRYPTION: AES-256","info");break}case"ghost":{const p=o.ghostCoeff.toFixed(1);O(t,"── GHOST COEFFICIENT ANALYSIS ─────────────","sys"),O(t,`  COEFFICIENT: ${p}%   BARRIER: NOMINAL`,"info"),O(t,"  CYBER BRAIN: SECTION 9 CLEARANCE ALPHA-7","info"),O(t,"  DIVE DEPTH: STABLE 3.2m   TACHIKOMA LINK: ACTIVE","info"),O(t,"  IDENTITY: CONFIRMED — KUSANAGI.M",p>=95?"sys":"err");break}case"nodes":{if(a.size===0){O(t,"NO NODES ON GRID","info");break}O(t,`ACTIVE NODES (${a.size}):`,"sys");for(const[p,A]of a){const I=h.find(te=>te.id===p),N=(I==null?void 0:I.label)??p,de=A>=70?"err":A>=40?"sys":"info";O(t,`  ${p.padEnd(14)} ${N.padEnd(12)} LVL=${A}`,de)}break}case"threat":{if(y.length===0){O(t,`GLOBAL THREAT: ${Math.max(0,...a.values())}`,"sys");break}if(y.length>=2&&isNaN(parseInt(y[0]))){const p=y[0],A=parseInt(y[1]);if(!a.has(p)){O(t,`ERR: node '${p}' not found — use NODES to list`,"err");break}if(isNaN(A)||A<0||A>100){O(t,"ERR: level must be 0-100","err");break}const I=s(r,p,A);a.set(p,A),c(r,Math.max(0,...a.values())),i.setRadarThreatLevel(Math.max(0,...a.values())/100),O(t,`NODE ${p}: ${I} → ${A}`,A>=70?"err":"sys"),A>=70&&I<70&&(n(r,p),d(r,p))}else{const p=parseInt(y[0]);if(isNaN(p)||p<0||p>100){O(t,"ERR: level must be 0-100","err");break}c(r,p),i.setRadarThreatLevel(p/100),O(t,`GLOBAL THREAT LEVEL SET: ${p}`,"sys")}break}case"focus":{const p=y[0];if(!p){O(t,"ERR: focus requires a node id — use NODES to list","err");break}if(!a.has(p)){O(t,`ERR: node '${p}' not found`,"err");break}n(r,p),d(r,p);const A=h.find(I=>I.id===p);O(t,`CAMERA FOCUSED: ${(A==null?void 0:A.label)??p}`,"sys");break}case"theme":{const p=((_=y[0])==null?void 0:_.toLowerCase())??"";if(p===""||p==="matrixgreen"){e(""),O(t,"THEME: MATRIX GREEN","sys");break}if(!Object.keys(Ot).includes(p)){O(t,`ERR: unknown theme '${p}' — use THEMES to list`,"err");break}e(p),O(t,`THEME: ${Ot[p]}`,"sys");break}case"themes":O(t,"AVAILABLE THEMES:","sys");for(const[p,A]of Object.entries(Ot))O(t,`  ${(p||"matrixgreen").padEnd(14)} ${A}`,"info");break;case"clear":fs(t),O(t,"TERMINAL CLEARED","sys");break;default:v&&O(t,`ERR: unknown command '${E}' — type HELP`,"err")}},tabComplete(E){return["help","status","ghost","nodes","threat","focus","theme","themes","clear"].find(v=>v.startsWith(E.toLowerCase()))??null}}),O(t,"SECTION 9 OPERATIVE INTERFACE — TYPE HELP FOR COMMANDS","sys"),O(t,"GHOST BABEL OPERATION: ACTIVE","info")}const Ja={easeInOutCubic:Ba,easeOutExpo:Na,backInOut:Dr,linear:Lr},ei={default:{label:"Default",lineColor:65484,glowColor:65484,opacity:.72,glowOpacity:.28,emissiveIntensity:1.8,stagger:.55,ringFade:.35,warpAmount:.12,direction:"south-to-north",easingKey:"easeInOutCubic",durationMs:2200},pulse:{label:"Pulse",lineColor:16711782,lineColorB:16737792,glowColor:16711748,glowColorB:16729088,opacity:.95,glowOpacity:.55,emissiveIntensity:6,stagger:1,ringFade:.1,warpAmount:.2,direction:"equator-out",easingKey:"easeOutExpo",durationMs:1400,glowLayers:5},scanner:{label:"Scanner",lineColor:65382,glowColor:47940,opacity:.9,glowOpacity:.35,emissiveIntensity:3,stagger:.96,ringFade:.07,warpAmount:.03,direction:"south-to-north",easingKey:"linear",durationMs:2200},cosmic:{label:"Cosmic",lineColor:10044671,lineColorB:61183,glowColor:5579468,glowColorB:39355,opacity:.75,glowOpacity:.38,emissiveIntensity:2.8,stagger:.48,ringFade:.38,warpAmount:.24,direction:"equator-out",easingKey:"easeInOutCubic",durationMs:3200},ignition:{label:"Ignition",lineColor:16772608,lineColorB:16720384,glowColor:16750848,glowColorB:16716032,opacity:.95,glowOpacity:.55,emissiveIntensity:5.5,stagger:.88,ringFade:.2,warpAmount:.5,direction:"south-to-north",easingKey:"backInOut",durationMs:1600,glowLayers:4},ghost:{label:"Ghost",lineColor:8956671,lineColorB:4491519,glowColor:4495871,glowColorB:2245836,opacity:.28,glowOpacity:.07,emissiveIntensity:.8,stagger:.68,ringFade:.58,warpAmount:.42,direction:"north-to-south",easingKey:"easeOutExpo",durationMs:4500},neon:{label:"Neon",lineColor:16711935,lineColorB:65535,glowColor:13369599,glowColorB:65484,opacity:.85,glowOpacity:.45,emissiveIntensity:4.5,stagger:.62,ringFade:.28,warpAmount:.16,direction:"south-to-north",easingKey:"easeOutExpo",durationMs:2e3,glowLayers:5},solar:{label:"Solar",lineColor:16777215,lineColorB:16742144,glowColor:16768256,glowColorB:16724736,opacity:.8,glowOpacity:.5,emissiveIntensity:6,stagger:1,ringFade:.18,warpAmount:.1,direction:"equator-out",easingKey:"easeOutExpo",durationMs:1600,glowLayers:4},arctic:{label:"Arctic",lineColor:61183,lineColorB:15663103,glowColor:8978431,glowColorB:13434879,opacity:.62,glowOpacity:.22,emissiveIntensity:2,stagger:.42,ringFade:.42,warpAmount:.1,direction:"north-to-south",easingKey:"easeInOutCubic",durationMs:3e3},alert:{label:"Alert",lineColor:16746496,lineColorB:16711680,glowColor:16733440,glowColorB:13369344,opacity:.92,glowOpacity:.48,emissiveIntensity:4.5,stagger:.78,ringFade:.22,warpAmount:.22,direction:"equator-out",easingKey:"backInOut",durationMs:1600},ember:{label:"Ember",lineColor:16763904,lineColorB:16724736,glowColor:16750848,glowColorB:16716032,opacity:.68,glowOpacity:.32,emissiveIntensity:3.5,stagger:.62,ringFade:.52,warpAmount:.38,direction:"south-to-north",easingKey:"backInOut",durationMs:3800,glowLayers:3}},L={enabled:!1,dir:"south-to-north",easing:"easeInOutCubic",dur:2200,stagger:.55,ringFade:.35,invert:!1,lineColor:"#00ffcc",lineColorB:"#00ffcc",glowColor:"#00ffcc",glowColorB:"#00ffcc",gradMode:"0",opacity:.72,glowOp:.28,emissive:1.8,warp:.12,glowRad:1.008,glowLayers:3,glowStep:.004,glowFalloff:.5,colorSpread:0,brightSpread:0,flickerAmp:0,flickerSpeed:2,arcSpread:0,loopMode:"play",pause:0,morphDur:800};let T=null,xe=!1,kt=null;function ti(){kt!==null&&(clearTimeout(kt),kt=null)}function Qt(t,e){ti(),t<=0?e():kt=setTimeout(e,t)}function Ne(){xe=!1,ti(),T&&T.stop(),document.getElementById("rr-loop").classList.remove("active")}function oi(t){T&&(L.loopMode==="play-reverse"?(T.reset(),T.play(()=>Qt(L.pause,()=>{xe&&T.reverse(()=>Qt(L.pause,t))}))):(T.reset(),T.play(()=>Qt(L.pause,t))))}function ai(){xe&&oi(()=>{xe&&ai()})}function be(t,e){T._baseRings.material.uniforms[t].value=e,T._glowLayers.forEach(a=>{a.material.uniforms[t].value=e})}function Me(t){return"#"+t.toString(16).padStart(6,"0")}function Pe(t){return parseInt(t.slice(1),16)}function bs(t,e=!0){var i;const a=ei[t];if(!a||!T)return;if(document.querySelectorAll("#rr-presets button").forEach(r=>r.classList.remove("active")),(i=document.getElementById(`rr-pre-${t}`))==null||i.classList.add("active"),a.direction){L.dir=a.direction;const s={"south-to-north":0,"north-to-south":1,"equator-out":2}[a.direction]??0;T._baseRings.material.uniforms.uDirection.value=s,T._glowLayers.forEach(c=>{c.material.uniforms.uDirection.value=s}),T._options.direction=a.direction,document.getElementById("rr-dir").value=a.direction}if(a.easingKey&&(L.easing=a.easingKey,T._options.easingFn=Ja[a.easingKey],document.getElementById("rr-easing").value=a.easingKey),a.durationMs!==void 0){L.dur=a.durationMs;const r=document.getElementById("rr-dur");r&&(r.value=a.durationMs),document.getElementById("rr-vDur").textContent=a.durationMs,T._options.durationMs=a.durationMs}if(a.opacity!==void 0&&(L.opacity=a.opacity,document.getElementById("rr-opacity").value=Math.round(a.opacity*100),document.getElementById("rr-vOpacity").textContent=a.opacity.toFixed(2)),a.glowOpacity!==void 0&&(L.glowOp=a.glowOpacity,document.getElementById("rr-glowOp").value=Math.round(a.glowOpacity*100),document.getElementById("rr-vGlowOp").textContent=a.glowOpacity.toFixed(2)),a.emissiveIntensity!==void 0&&(L.emissive=a.emissiveIntensity,document.getElementById("rr-emissive").value=Math.round(a.emissiveIntensity*100),document.getElementById("rr-vEmissive").textContent=a.emissiveIntensity.toFixed(2)),a.stagger!==void 0&&(L.stagger=a.stagger,document.getElementById("rr-stagger").value=Math.round(a.stagger*100),document.getElementById("rr-vStagger").textContent=a.stagger.toFixed(2)),a.warpAmount!==void 0&&(L.warp=a.warpAmount,document.getElementById("rr-warp").value=Math.round(a.warpAmount*100),document.getElementById("rr-vWarp").textContent=a.warpAmount.toFixed(2)),a.ringFade!==void 0){const r=Math.max(.001,a.ringFade);L.ringFade=r,document.getElementById("rr-ringFade").value=Math.round(r*100),document.getElementById("rr-vRingFade").textContent=r.toFixed(2)}a.lineColor!==void 0&&(L.lineColor=Me(a.lineColor),document.getElementById("rr-colLine").value=L.lineColor),a.lineColorB!==void 0?(L.lineColorB=Me(a.lineColorB),document.getElementById("rr-colLineB").value=L.lineColorB):a.lineColor!==void 0&&(L.lineColorB=Me(a.lineColor),document.getElementById("rr-colLineB").value=L.lineColorB),a.glowColor!==void 0&&(L.glowColor=Me(a.glowColor),document.getElementById("rr-colGlow").value=L.glowColor),a.glowColorB!==void 0?(L.glowColorB=Me(a.glowColorB),document.getElementById("rr-colGlowB").value=L.glowColorB):a.glowColor!==void 0&&(L.glowColorB=Me(a.glowColor),document.getElementById("rr-colGlowB").value=L.glowColorB);const o=e?L.morphDur:0;T.morphTo({lineColor:Pe(L.lineColor),lineColorB:Pe(L.lineColorB),glowColor:Pe(L.glowColor),glowColorB:Pe(L.glowColorB),opacity:a.opacity??L.opacity,glowOpacity:a.glowOpacity??L.glowOp,emissiveIntensity:a.emissiveIntensity??L.emissive,stagger:a.stagger??L.stagger,warpAmount:a.warpAmount??L.warp,ringFade:a.ringFade??L.ringFade,glowLayers:a.glowLayers??3,glowLayerRadiusStep:a.glowLayerRadiusStep??.004,glowLayerOpacityFalloff:a.glowLayerOpacityFalloff??.5},o)}function ws(){var a;if(!T)return;const t=document.getElementById("rr-presets");Object.entries(ei).forEach(([o,i])=>{const r=document.createElement("button");r.id=`rr-pre-${o}`,r.textContent=i.label,r.addEventListener("click",()=>bs(o,!0)),t.appendChild(r)}),(a=document.getElementById("rr-pre-default"))==null||a.classList.add("active");const e=[{type:"select",id:"rr-dir",key:"dir",set:o=>{const i={"south-to-north":0,"north-to-south":1,"equator-out":2};T._options.direction=o,be("uDirection",i[o]??0)}},{type:"select",id:"rr-easing",key:"easing",set:o=>{T._options.easingFn=Ja[o]}},{id:"rr-dur",valId:"rr-vDur",key:"dur",toSlider:o=>o,fromSlider:o=>+o,fmt:o=>String(o),set:o=>{T._options.durationMs=o}},{id:"rr-stagger",valId:"rr-vStagger",key:"stagger",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{be("uStagger",o),T._options.stagger=o}},{id:"rr-ringFade",valId:"rr-vRingFade",key:"ringFade",toSlider:o=>Math.round(o*100),fromSlider:o=>Math.max(.001,o/100),fmt:o=>o.toFixed(2),set:o=>{be("uRingFade",o),T._options.ringFade=o}},{type:"checkbox",id:"rr-invert",key:"invert",set:o=>T.setInvert(o)},{type:"color",id:"rr-colLine",key:"lineColor",set:o=>{const i=Pe(o);T._baseRings.material.uniforms.uColor.value.set(i),T._options.lineColor=i}},{type:"color",id:"rr-colLineB",key:"lineColorB",set:o=>{const i=Pe(o);T._baseRings.material.uniforms.uColorB.value.set(i),T._options.lineColorB=i}},{type:"color",id:"rr-colGlow",key:"glowColor",set:o=>{const i=Pe(o);T._glowLayers.forEach(r=>r.material.uniforms.uColor.value.set(i)),T._options.glowColor=i}},{type:"color",id:"rr-colGlowB",key:"glowColorB",set:o=>{const i=Pe(o);T._glowLayers.forEach(r=>r.material.uniforms.uColorB.value.set(i)),T._options.glowColorB=i}},{type:"select",id:"rr-gradMode",key:"gradMode",set:o=>T.setGradientMode(+o)},{id:"rr-opacity",valId:"rr-vOpacity",key:"opacity",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{L.enabled&&(T._baseRings.material.uniforms.uOpacity.value=o,T._options.opacity=o)}},{id:"rr-glowOp",valId:"rr-vGlowOp",key:"glowOp",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{L.enabled&&(T._glowLayers.forEach((i,r)=>{i.material.uniforms.uOpacity.value=o*Math.pow(T._options.glowLayerOpacityFalloff,r)}),T._options.glowOpacity=o)}},{id:"rr-emissive",valId:"rr-vEmissive",key:"emissive",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{be("uEmissiveIntensity",o),T._options.emissiveIntensity=o}},{id:"rr-warp",valId:"rr-vWarp",key:"warp",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{be("uWarpAmount",o),T._options.warpAmount=o}},{id:"rr-glowRad",valId:"rr-vGlowRad",key:"glowRad",toSlider:o=>Math.round(o*1e3),fromSlider:o=>o/1e3,fmt:o=>o.toFixed(3),set:o=>{const i=T._options.glowRadius??o;i!==o&&T._glowLayers.forEach(r=>r.scale.multiplyScalar(o/i)),T._options.glowRadius=o}},{id:"rr-glowLayers",valId:"rr-vGlowLayers",key:"glowLayers",toSlider:o=>o,fromSlider:o=>Math.round(+o),fmt:o=>String(o),set:o=>T.morphTo({glowLayers:o},0)},{id:"rr-glowStep",valId:"rr-vGlowStep",key:"glowStep",toSlider:o=>Math.round(o*1e3),fromSlider:o=>o/1e3,fmt:o=>o.toFixed(3),set:o=>T.morphTo({glowLayerRadiusStep:o},0)},{id:"rr-glowFalloff",valId:"rr-vGlowFalloff",key:"glowFalloff",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>T.morphTo({glowLayerOpacityFalloff:o},0)},{id:"rr-colorSpread",valId:"rr-vColorSpread",key:"colorSpread",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{be("uColorSpread",o),T._options.colorSpread=o}},{id:"rr-brightSpread",valId:"rr-vBrightSpread",key:"brightSpread",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{be("uBrightSpread",o),T._options.brightSpread=o}},{id:"rr-flickerAmp",valId:"rr-vFlickerAmp",key:"flickerAmp",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{be("uFlickerAmp",o),T._options.flickerAmp=o}},{id:"rr-flickerSpeed",valId:"rr-vFlickerSpeed",key:"flickerSpeed",toSlider:o=>Math.round(o*10),fromSlider:o=>o/10,fmt:o=>o.toFixed(1),set:o=>{be("uFlickerSpeed",o),T._options.flickerSpeed=o}},{id:"rr-arcSpread",valId:"rr-vArcSpread",key:"arcSpread",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{be("uArcColorSpread",o),T._options.arcColorSpread=o}},{type:"select",id:"rr-loopMode",key:"loopMode",set:()=>{}},{id:"rr-pause",valId:"rr-vPause",key:"pause",toSlider:o=>o,fromSlider:o=>+o,fmt:o=>String(o),set:()=>{}},{id:"rr-morphDur",valId:"rr-vMorphDur",key:"morphDur",toSlider:o=>o,fromSlider:o=>+o,fmt:o=>String(o),set:()=>{}}];for(const o of e){const i=document.getElementById(o.id);if(!i)continue;const r=o.type??"range",s=o.valId?document.getElementById(o.valId):null;r==="checkbox"?i.checked=L[o.key]:r==="color"||r==="select"?i.value=L[o.key]:(i.value=o.toSlider(L[o.key]),s&&(s.textContent=o.fmt(L[o.key]))),o.set(L[o.key]);const c=r==="checkbox"||r==="select"?"change":"input";i.addEventListener(c,n=>{r==="checkbox"?L[o.key]=n.target.checked:r==="color"||r==="select"?L[o.key]=n.target.value:(L[o.key]=o.fromSlider(+n.target.value),s&&(s.textContent=o.fmt(L[o.key]))),o.set(L[o.key])})}document.getElementById("rr-enable").addEventListener("change",o=>{T&&(L.enabled=o.target.checked,L.enabled?(T.morphTo({opacity:L.opacity,glowOpacity:L.glowOp},400),T.play()):(Ne(),T.morphTo({opacity:0,glowOpacity:0},400)))}),document.getElementById("rr-play").addEventListener("click",()=>{Ne(),T.play()}),document.getElementById("rr-rev").addEventListener("click",()=>{Ne(),T.reverse()}),document.getElementById("rr-stop").addEventListener("click",()=>{Ne(),T.stop()}),document.getElementById("rr-reset").addEventListener("click",()=>{Ne(),T.reset()}),document.getElementById("rr-loop").addEventListener("click",()=>{xe=!xe,document.getElementById("rr-loop").classList.toggle("active",xe),xe?ai():Ne()}),document.getElementById("rr-once").addEventListener("click",()=>{Ne(),xe=!0,oi(()=>{xe=!1})})}function fa(){const t=new B().setHSL(Math.random(),.7+Math.random()*.3,.45+Math.random()*.2);return Math.round(t.r*255)<<16|Math.round(t.g*255)<<8|Math.round(t.b*255)}function ma(t){const e=new B(t),a={};e.getHSL(a);const o=(a.h+(Math.random()-.5)*.25+1)%1,i=Math.max(.5,Math.min(1,a.s+(Math.random()-.5)*.3)),r=Math.max(.3,Math.min(.75,a.l+(Math.random()-.5)*.25)),s=new B().setHSL(o,i,r);return Math.round(s.r*255)<<16|Math.round(s.g*255)<<8|Math.round(s.b*255)}function Ss(t){T=t,ws(),document.getElementById("rr-randLine").addEventListener("click",()=>{if(!T)return;const e=fa(),a=ma(e);T.morphTo({lineColor:e,lineColorB:a},L.morphDur),L.lineColor=Me(e),L.lineColorB=Me(a),document.getElementById("rr-colLine").value=L.lineColor,document.getElementById("rr-colLineB").value=L.lineColorB}),document.getElementById("rr-randGlow").addEventListener("click",()=>{if(!T)return;const e=fa(),a=ma(e);T.morphTo({glowColor:e,glowColorB:a},L.morphDur),L.glowColor=Me(e),L.glowColorB=Me(a),document.getElementById("rr-colGlow").value=L.glowColor,document.getElementById("rr-colGlowB").value=L.glowColorB})}function _s(t){const e=zr(t);if(!e)return;const a=1.002,o=new ze({color:65484,transparent:!0,opacity:.18,blending:V,depthTest:!0,depthWrite:!1}),i=new fo,r=10,s=20,c=64;for(let u=1;u<r;u++){const f=u/r*Math.PI,g=a*Math.cos(f),m=a*Math.sin(f),b=[];for(let x=0;x<=c;x++){const M=x/c*Math.PI*2;b.push(new k(m*Math.cos(M),g,m*Math.sin(M)))}const w=new go(new Oe().setFromPoints(b),o);w.renderOrder=3,i.add(w)}for(let u=0;u<s;u++){const f=u/s*Math.PI*2,g=[];for(let b=0;b<=c;b++){const w=b/c*Math.PI;g.push(new k(a*Math.sin(w)*Math.cos(f),a*Math.cos(w),a*Math.sin(w)*Math.sin(f)))}const m=new vo(new Oe().setFromPoints(g),o);m.renderOrder=3,i.add(m)}i.visible=!1,e.add(i);function n(u,f,g){const b=new Ni(1,f).attributes.position,w=b.count/3,x=new k,M=new k,C=new Map;for(let S=0;S<w;S++){const v=S*3;for(let y=0;y<3;y++){const _=v+y,p=v+(y+1)%3;x.fromBufferAttribute(b,_),M.fromBufferAttribute(b,p);const A=[x,M].map(I=>`${I.x.toFixed(5)},${I.y.toFixed(5)},${I.z.toFixed(5)}`).sort().join("|");C.has(A)||C.set(A,[x.clone(),M.clone()])}}const E=[];for(const[S,v]of C.values())for(let y=0;y<g;y++){const _=new k().lerpVectors(S,v,y/g).normalize().multiplyScalar(u),p=new k().lerpVectors(S,v,(y+1)/g).normalize().multiplyScalar(u);E.push(_.x,_.y,_.z,p.x,p.y,p.z)}return new Float32Array(E)}const d=new ht;d.setPositions(n(a,3,4));const h=new me({color:65484,transparent:!0,opacity:.22,blending:V,depthTest:!0,depthWrite:!1,linewidth:1,resolution:new U(window.innerWidth,window.innerHeight)}),l=new ae(d,h);l.renderOrder=3,l.visible=!1,e.add(l),window.addEventListener("resize",()=>h.resolution.set(window.innerWidth,window.innerHeight)),document.getElementById("rr-globe").addEventListener("change",u=>{const f=u.target.value;i.visible=f==="latlon",l.visible=f==="wire"})}function xs(t){const e={color:"#00ff70",opacity:.45,burstBloom:!0,globeInteract:!0,debugGlobeCols:!1,chroma:!0,chromaScale:1,heat:!0,heatAmt:.004,streaks:!0,streakAmt:.055,soften:!0,softenStr:.002,depth:.04,normalStr:6,grEnabled:!1,grLightX:.5,grLightY:.75,grDensity:.93,grDecay:.96,grWeight:.35,grExposure:.45};function a(){t.setGodRays(e.grEnabled,e.grLightX,e.grLightY,e.grDensity,e.grDecay,e.grWeight,e.grExposure)}const o=[{type:"color",id:"rain-color",key:"color",set:i=>t.setColor(i)},{id:"rain-opacity",valId:"rain-vOpacity",key:"opacity",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:i=>t.setOpacity(i)},{type:"checkbox",id:"rain-burstBloom",key:"burstBloom",set:i=>t.setBurstBloom(i)},{type:"checkbox",id:"rain-globeInteract",key:"globeInteract",set:i=>t.setGlobeInteract(i)},{type:"checkbox",id:"rain-debugGlobeCols",key:"debugGlobeCols",set:i=>t.setDebugGlobeColumn(i)},{type:"checkbox",id:"rain-chroma",key:"chroma",set:i=>t.setGlyphChroma(i,e.chromaScale)},{id:"rain-chromaScale",valId:"rain-vChromaScale",key:"chromaScale",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(1),set:i=>{e.chroma&&t.setGlyphChroma(!0,i)}},{type:"checkbox",id:"rain-heat",key:"heat",set:i=>t.setHeat(i,e.heatAmt)},{id:"rain-heatAmt",valId:"rain-vHeatAmt",key:"heatAmt",toSlider:i=>i*1e3,fromSlider:i=>i/1e3,fmt:i=>i.toFixed(3),set:i=>t.setHeat(e.heat,i)},{type:"checkbox",id:"rain-streaks",key:"streaks",set:i=>t.setStreaks(i,e.streakAmt)},{id:"rain-streakAmt",valId:"rain-vStreakAmt",key:"streakAmt",toSlider:i=>i*1e3,fromSlider:i=>i/1e3,fmt:i=>i.toFixed(3),set:i=>t.setStreaks(e.streaks,i)},{type:"checkbox",id:"rain-soften",key:"soften",set:i=>t.setSoften(i,e.softenStr)},{id:"rain-softenStr",valId:"rain-vSoftenStr",key:"softenStr",toSlider:i=>i*1e3,fromSlider:i=>i/1e3,fmt:i=>i.toFixed(3),set:i=>t.setSoften(e.soften,i)},{id:"rain-depth",valId:"rain-vDepth",key:"depth",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:i=>t.setDepth(i)},{id:"rain-normalStr",valId:"rain-vNormalStr",key:"normalStr",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(1),set:i=>t.setNormalStrength(i)},{type:"checkbox",id:"rain-grEnabled",key:"grEnabled",set:()=>a()},{id:"rain-grLightX",valId:"rain-vGrLightX",key:"grLightX",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:()=>a()},{id:"rain-grLightY",valId:"rain-vGrLightY",key:"grLightY",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:()=>a()},{id:"rain-grDensity",valId:"rain-vGrDensity",key:"grDensity",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:()=>a()},{id:"rain-grDecay",valId:"rain-vGrDecay",key:"grDecay",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:()=>a()},{id:"rain-grWeight",valId:"rain-vGrWeight",key:"grWeight",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:()=>a()},{id:"rain-grExposure",valId:"rain-vGrExposure",key:"grExposure",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:()=>a()}];for(const i of o){const r=document.getElementById(i.id);if(!r)continue;const s=i.type??"range",c=i.valId?document.getElementById(i.valId):null;s==="checkbox"?r.checked=e[i.key]:s==="color"?r.value=e[i.key]:(r.value=i.toSlider(e[i.key]),c&&(c.textContent=i.fmt(e[i.key]))),i.set(e[i.key]);const n=s==="checkbox"?"change":"input";r.addEventListener(n,d=>{s==="checkbox"?e[i.key]=d.target.checked:s==="color"?e[i.key]=d.target.value:(e[i.key]=i.fromSlider(+d.target.value),c&&(c.textContent=i.fmt(e[i.key]))),i.set(e[i.key])})}}function Ms(t){document.querySelectorAll("#rr-panel .rr-collapsible").forEach(n=>{n.addEventListener("click",()=>{const d=document.getElementById(n.dataset.target);n.classList.toggle("rr-open"),d.classList.toggle("rr-open")})});const e=document.querySelector(".s9-telescreen__vignette"),a=document.querySelector(".s9-telescreen__scanlines"),o=[document.querySelector(".s9-telescreen__phase-a"),document.querySelector(".s9-telescreen__phase-b"),document.querySelector(".s9-telescreen__phase-c")],i=document.querySelector(".s9-telescreen__glow"),r={glitchEnabled:!0,glitchStrength:.01,glitchSpeed:24,glitchCols:50,glitchRgb:.85,glitchFreq:.3,glitchBurst:.01,scratchEnabled:!0,scratchOpacity:.13,vignetteEnabled:!0,vignetteOpacity:1,scanlinesEnabled:!0,phaseEnabled:!0,glowEnabled:!0,glowOpacity:.55,warpMult:2,hardPix:1.2,maskStr:1,grainAmt:.04,halationStr:3,convergence:.07};function s(){t.setGlitch(r.glitchEnabled,r.glitchStrength,r.glitchSpeed,r.glitchCols,r.glitchRgb,r.glitchFreq,r.glitchBurst)}const c=[{type:"checkbox",id:"ts-glitchEnabled",key:"glitchEnabled",set:()=>s()},{id:"ts-glitchStrength",valId:"ts-vGlitchStrength",key:"glitchStrength",toSlider:n=>n*1e3,fromSlider:n=>n/1e3,fmt:n=>n.toFixed(3),set:()=>s()},{id:"ts-glitchSpeed",valId:"ts-vGlitchSpeed",key:"glitchSpeed",toSlider:n=>n*10,fromSlider:n=>n/10,fmt:n=>n.toFixed(1),set:()=>s()},{id:"ts-glitchCols",valId:"ts-vGlitchCols",key:"glitchCols",toSlider:n=>n,fromSlider:n=>+n,fmt:n=>String(n),set:()=>s()},{id:"ts-glitchRgb",valId:"ts-vGlitchRgb",key:"glitchRgb",toSlider:n=>n*100,fromSlider:n=>n/100,fmt:n=>n.toFixed(2),set:()=>s()},{id:"ts-glitchFreq",valId:"ts-vGlitchFreq",key:"glitchFreq",toSlider:n=>(8-n)/7.99*100,fromSlider:n=>8-n/100*7.99,fmt:n=>n<.1?n.toFixed(3)+"s":n.toFixed(2)+"s",set:()=>s()},{id:"ts-glitchBurst",valId:"ts-vGlitchBurst",key:"glitchBurst",toSlider:n=>n*100,fromSlider:n=>n/100,fmt:n=>n.toFixed(2)+"s",set:()=>s()},{type:"checkbox",id:"ts-scratchEnabled",key:"scratchEnabled",set:n=>t.setShader({scratchStr:n?r.scratchOpacity:0})},{id:"ts-scratchOpacity",valId:"ts-vScratchOpacity",key:"scratchOpacity",toSlider:n=>n*100,fromSlider:n=>n/100,fmt:n=>n.toFixed(2),set:n=>{r.scratchEnabled&&t.setShader({scratchStr:n})}},{type:"checkbox",id:"ts-vignetteEnabled",key:"vignetteEnabled",set:n=>{e.style.display=n?"":"none"}},{id:"ts-vignetteOpacity",valId:"ts-vVignetteOpacity",key:"vignetteOpacity",toSlider:n=>n*100,fromSlider:n=>n/100,fmt:n=>n.toFixed(2),set:n=>{e.style.opacity=n}},{type:"checkbox",id:"ts-scanlinesEnabled",key:"scanlinesEnabled",set:n=>{a.style.display=n?"block":"none"}},{type:"checkbox",id:"ts-phaseEnabled",key:"phaseEnabled",set:n=>{o.forEach(d=>{d.style.display=n?"":"none"})}},{type:"checkbox",id:"ts-glowEnabled",key:"glowEnabled",set:n=>{i.style.display=n?"":"none"}},{id:"ts-glowOpacity",valId:"ts-vGlowOpacity",key:"glowOpacity",toSlider:n=>n*100,fromSlider:n=>n/100,fmt:n=>n.toFixed(2),set:n=>{i.style.opacity=n}},{id:"ts-warp",valId:"ts-vWarp",key:"warpMult",toSlider:n=>n*100,fromSlider:n=>n/100,fmt:n=>n.toFixed(2),set:n=>t.setShader({warpMult:n})},{id:"ts-hardPix",valId:"ts-vHardPix",key:"hardPix",toSlider:n=>n*10,fromSlider:n=>n/10,fmt:n=>n.toFixed(1),set:n=>t.setShader({hardPix:-n})},{id:"ts-maskStr",valId:"ts-vMaskStr",key:"maskStr",toSlider:n=>n*100,fromSlider:n=>n/100,fmt:n=>n.toFixed(2),set:n=>t.setShader({maskStr:n})},{id:"ts-grain",valId:"ts-vGrain",key:"grainAmt",toSlider:n=>n*1e3,fromSlider:n=>n/1e3,fmt:n=>n.toFixed(3),set:n=>t.setShader({grainAmt:n})},{id:"ts-halation",valId:"ts-vHalation",key:"halationStr",toSlider:n=>n*100,fromSlider:n=>n/100,fmt:n=>n.toFixed(2),set:n=>t.setShader({halationStr:n})},{id:"ts-convergence",valId:"ts-vConvergence",key:"convergence",toSlider:n=>n*1e3,fromSlider:n=>n/1e3,fmt:n=>n.toFixed(3),set:n=>t.setShader({convergence:n})}];for(const n of c){const d=document.getElementById(n.id);if(!d)continue;const h=n.type==="checkbox",l=n.valId?document.getElementById(n.valId):null;h?d.checked=r[n.key]:(d.value=n.toSlider(r[n.key]),l&&(l.textContent=n.fmt(r[n.key]))),n.set(r[n.key]),d.addEventListener(h?"change":"input",u=>{const f=h?u.target.checked:+u.target.value;r[n.key]=h?f:n.fromSlider(f),!h&&l&&(l.textContent=n.fmt(r[n.key])),n.set(r[n.key])})}}vs();document.querySelectorAll(".s9-panel").forEach(Zr);const ii=document.querySelectorAll(".topbar__tab[data-tab]"),Es=document.querySelectorAll(".center__view[data-view]");let pa=!1,co=!1;const tt=document.querySelector(".s9-terminal");function ga(t){ii.forEach(e=>{const a=e.dataset.tab===t;e.classList.toggle("topbar__tab--active",a),e.setAttribute("aria-selected",a)}),Es.forEach(e=>{e.classList.toggle("center__view--active",e.dataset.view===t)}),t==="network"&&!pa&&(pa=!0,Fs()),t==="tactical"&&!co&&(co=!0,ks()),O(tt,`VIEW: ${t.toUpperCase()} ACTIVATED`,"sys")}ii.forEach(t=>{t.addEventListener("click",()=>ga(t.dataset.tab)),t.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),ga(t.dataset.tab))})});function Jt(t,e,a){let o=0;function i(){if(o>=t.length)return;const{id:r,state:s}=t[o++],c=document.getElementById(r);c&&Qr(c,s),setTimeout(i,o<t.length?e:e*2)}i()}as(document.getElementById("sigint-feed"));rs(document.getElementById("intel-feed"));setTimeout(()=>{Jt([{id:"seq-breach",state:"complete"},{id:"seq-extract",state:"active"}],3e3),setTimeout(()=>{Jt([{id:"seq-extract",state:"complete"},{id:"seq-cover",state:"active"}],3500),setTimeout(()=>{Jt([{id:"seq-cover",state:"complete"},{id:"seq-exfil",state:"active"}],3e3)},9e3)},8e3)},5e3);const Gt=document.querySelector(".s9-stream");Ui(Gt);ls(Gt,bo);const As=ts(document.getElementById("ts-feed-src"),document.getElementById("ts-feed-canvas"),document.getElementById("ts-glow-canvas")),we={cpu:42,mem:61,net:12,ghost:77,enc:96},Cs=document.getElementById("tele-cpu"),Ts=document.getElementById("tele-mem"),Ls=document.getElementById("tele-net"),Ds=document.getElementById("tele-enc");setInterval(()=>{for(const t of Object.keys(we))we[t]=Math.max(5,Math.min(100,we[t]+(Math.random()-.5)*6)),we[t]=Math.round(we[t]);mt(Cs,we.cpu),mt(Ts,we.mem),mt(Ls,we.net),mt(Ds,we.enc)},2e3);const ri=document.getElementById("neural-01"),ni=document.getElementById("ghost-val"),si=document.getElementById("cyber-index"),li=document.getElementById("neural-sync"),ci=document.getElementById("ekg-bpm"),di=Hi(document.getElementById("ekg-canvas"),document.getElementById("ekg-heart"));let Co=98.4;for(let t=0;t<3;t++)Co=La(ri,ni,si,li,ci,di);setInterval(()=>{Co=La(ri,ni,si,li,ci,di)},3e3);const Ce=document.querySelector(".s9-threatmap");Ua(Ce,{autoRotate:!0,bloomStrength:.4});const ui=document.getElementById("proximity-radar"),hi=Zn(ui,{threatLevel:0}),Rs=getComputedStyle(document.documentElement).getPropertyValue("--neon-green").trim()||"#00ff70",Is=bn(document.getElementById("matrix-rain-host"),{color:Rs,opacity:.45,syncCamera:Gr(Ce)});document.getElementById("sat-toggle").addEventListener("change",t=>{Xr(Ce,t.target.checked)});const{globeNodes:Ps}=cs(Ce,Gt,tt,{addNode:Ha,removeNode:za,updateNodeLevel:Mo,setThreatLevel:xo,setActiveNode:et,focusNode:Eo,pulseGlobeNode:$r,spawnArc:jr,appendRow:bo,printLine:O,setRadarThreatLevel:t=>hi.setRadarThreatLevel(t)});gs({threatEl:Ce,radarEl:ui,getTacticalInited:()=>co,termEl:tt,printLine:O});const Os=document.getElementById("alert-host");document.addEventListener("s9:alert",t=>{var e;if(((e=t.detail)==null?void 0:e.level)==="critical"){const a=t.detail.source??"UNKNOWN";O(tt,`⚠ CRITICAL ALERT: ${a}`,"err"),Wi(Os,{level:"critical",code:"CRITICAL THREAT",message:a})}});const Je=document.getElementById("node-popup"),fi=document.getElementById("np-city"),mi=document.getElementById("np-skyline"),pi=document.getElementById("np-country"),gi=document.getElementById("np-pop"),vi=document.getElementById("np-coords"),uo=document.getElementById("np-threat"),yi=document.getElementById("np-status");Ce.addEventListener("s9:threatmap-node-select",t=>{const{nodeId:e,label:a,level:o,lat:i,lng:r}=t.detail;O(tt,`NODE SELECT: ${a} — LEVEL ${o} — ${i.toFixed(2)}°, ${r.toFixed(2)}°`,o>=71?"err":o>=41?"warn":"info"),bo(Gt,{timestamp:new Date().toISOString(),source:"TGT",message:`TARGET LOCKED: ${a} THREAT=${o}`,alert:o>=41});const s=Va[e]??{country:"—",pop:"—",status:"UNKNOWN"};fi.textContent=a,mi.innerHTML=Ya(e),pi.textContent=s.country,gi.textContent=s.pop,vi.textContent=`${i.toFixed(2)}°, ${r.toFixed(2)}°`;const c=o>=70?"CRITICAL":o>=40?"ELEVATED":"LOW";uo.textContent=`${o} — ${c}`,uo.style.color=o>=70?"var(--text-alert)":o>=40?"var(--neon-warn)":"var(--neon-green)",yi.textContent=s.status,Je.classList.toggle("node-popup--left",r>60),Je.setAttribute("aria-hidden","false"),Je.classList.add("node-popup--visible")});Ce.addEventListener("s9:threatmap-node-deselect",()=>{Je.classList.remove("node-popup--visible"),setTimeout(()=>Je.setAttribute("aria-hidden","true"),260)});ys({termEl:tt,applyTheme:Qa,globeNodes:Ps,metrics:{...we,get ghostCoeff(){return Co}},radar:hi,threatEl:Ce,updateNodeLevel:Mo,setThreatLevel:xo,setActiveNode:et,focusNode:Eo,CITY_POOL:He,CITY_DATA:Va,citySkyline:Ya,npCity:fi,npSkyline:mi,npCountry:pi,npPop:gi,npCoords:vi,npThreat:uo,npStatus:yi,nodePopup:Je});function ks(){ds(document.getElementById("threatmap-tactical"),Pt,qa,He,{initThreatMap:Ua,addNode:Ha,removeNode:za,updateNodeLevel:Mo,setThreatLevel:xo,setActiveNode:et,focusNode:Eo})}function Fs(){us(document.getElementById("flow-matrix"),{initMatrix:$i,activateEdge:Da,deactivateEdge:Ra,pulseNode:ji,setActiveNode:Lt})}const Bs=document.getElementById("rr-panel"),Ns=Hr(Ce);Ss(Ns);_s(Ce);xs(Is);Ms(As);const Us=["intel-feed-1","sys-metrics","seq-log-right","neural-readout-1","operative-log","data-stream-1","terminal-1","telescreen-1","pulse-radar-1"],Gs=Us.map(t=>document.querySelector(`[data-s9-id="${t}"]`)),Hs=document.querySelector(".s9-ov");let xt=!1;window.addEventListener("keydown",t=>{t.key==="h"||t.key==="H"?Bs.classList.toggle("rr-visible"):(t.key==="i"||t.key==="I")&&(xt=!xt,Gs.forEach(e=>e==null?void 0:e.classList.toggle("s9-panel--i-hidden",xt)),Hs.classList.toggle("s9-ov--i-hidden",xt))});
