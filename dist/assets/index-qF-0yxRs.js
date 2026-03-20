import{C as wi,V as k,M as qe,T as je,Q as Do,S as Ro,a as U,R as Si,P as _i,b as kt,c as ie,O as va,B as De,F as Ft,d as oe,U as rt,W as _t,H as xt,N as xi,e as Mi,f as F,A as j,g as Ye,I as ya,h as Jt,i as Ve,j as ba,k as lo,l as wa,m as Mt,n as Et,o as st,L as Ei,p as Sa,G as co,q as Me,r as At,s as uo,t as ho,u as _a,v as ke,w as Ai,x as Ci,y as eo,D as xa,z as Ti,E as Ne,J as fo,K as Li,X as mo,Y as Io,Z as Po,_ as Ma,$ as ut,a0 as Di,a1 as Ri,a2 as Ii,a3 as Ea,a4 as Pi,a5 as Oi,a6 as ki,a7 as lt,a8 as Fi,a9 as po,aa as et,ab as Bi,ac as Aa,ad as Ni}from"./three-C_ueH2ui.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(i){if(i.ep)return;i.ep=!0;const n=a(i);fetch(i.href,n)}})();const Ca=new WeakMap;function Ui(t){const e=new AbortController,{signal:a}=e,o={ac:e,paused:!1,filter:null};Ca.set(t,o);const i=t.querySelector(".s9-stream__body");i&&(i.addEventListener("mouseenter",()=>{o.paused=!0,i.dataset.paused="true"},{signal:a}),i.addEventListener("mouseleave",()=>{o.paused=!1,i.dataset.paused="false",Ta(i)},{signal:a}),i.addEventListener("click",n=>{const s=n.target.closest(".s9-stream__row");if(!s)return;const c=s.classList.contains("s9-stream__row--pinned");s.classList.toggle("s9-stream__row--pinned",!c),t.dispatchEvent(new CustomEvent("s9:stream-row-pinned",{bubbles:!0,detail:{row:s,pinned:!c}}))},{signal:a}))}function go(t,{timestamp:e,source:a,message:o,alert:i=!1}){const n=t.querySelector(".s9-stream__body");if(!n)return;const s=Ca.get(t),c=(s==null?void 0:s.filter)??null,r=document.createElement("div");r.className="s9-stream__row",i&&r.classList.add("s9-stream__row--alert"),c&&a!==c&&(r.hidden=!0),r.innerHTML=`<span class="s9-stream__timestamp">${Ht(e)}</span><span class="s9-stream__source">${Ht(a)}</span><span class="s9-stream__message">${Ht(o)}</span>`,r.classList.add("glitch-enter"),r.addEventListener("animationend",()=>r.classList.remove("glitch-enter"),{once:!0}),n.appendChild(r),n.children.length>100&&n.removeChild(n.firstChild),s!=null&&s.paused||Ta(n)}function Ta(t){t.scrollTop=t.scrollHeight}function Ht(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Gi(t,e){e(),t.classList.remove("glitch-enter"),t.offsetWidth,t.classList.add("glitch-enter"),t.addEventListener("animationend",()=>t.classList.remove("glitch-enter"),{once:!0})}const zt=.37;function Oo(t){return t>.08&&t<.18?Math.sin((t-.08)/.1*Math.PI)*.18:t>.28&&t<.32?-((t-.28)/.04)*.38:t>.32&&t<.37?-.38+(t-.32)/.05*1.38:t>.37&&t<.43?1-(t-.37)/.06*1.28:t>.43&&t<.49?-.28+(t-.43)/.06*.28:t>.52&&t<.68?Math.sin((t-.52)/.16*Math.PI)*.3:0}function Hi(t,e){if(!t)return console.warn("initEkg: canvas element not found"),{setBpm(){},destroy(){}};let a=62,o=0,i=0,n=0,s=0;function c(){e&&(e.classList.remove("beat"),e.offsetWidth,e.classList.add("beat"))}function r(){const u=t.getContext("2d"),f=t.width,g=t.height,m=g/2,b=g*.44,w=a/60/80;u.clearRect(0,0,f,g);const x=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";u.beginPath();for(let C=0;C<f;C++){const E=((o-(f-1-C)*w)%1+1)%1,S=m-Oo(E)*b;C===0?u.moveTo(C,S):u.lineTo(C,S)}u.strokeStyle=x,u.lineWidth=1,u.shadowColor=x,u.shadowBlur=5,u.stroke();const M=m-Oo(o)*b;u.beginPath(),u.arc(f-1,M,1.8,0,Math.PI*2),u.fillStyle=x,u.shadowBlur=10,u.fill()}function d(){const u=t.clientWidth;u&&t.width!==u&&(t.width=u)}d();const h=new ResizeObserver(d);h.observe(t);function l(u){s=requestAnimationFrame(l);const f=n?u-n:16;n=u,i=o,o=(o+a/60*(f/1e3))%1,(i<zt&&o>=zt||i>o&&o>=zt)&&c(),r()}return s=requestAnimationFrame(l),{setBpm(u){a=u},destroy(){cancelAnimationFrame(s),h.disconnect()}}}let $e=98.4;function La(t,e,a,o,i,n){$e=Math.max(85,Math.min(100,$e+(Math.random()-.45)*1.2));const s=$e.toFixed(1),c=Math.round(58+(100-$e)/15*12);return i.textContent=c,n.setBpm(c),Gi(t,()=>{e.textContent=s,a.textContent=`${s}%`,o.textContent=`${Math.round($e)}%`}),$e}const ko=new WeakMap;function ht(t,e){const a=Math.max(0,Math.min(100,e)),o=t.querySelector(".s9-telemetry__bar-fill");if(o){o.style.width=`${a}%`;const c=["s9-telemetry__bar-fill--ok","s9-telemetry__bar-fill--warning","s9-telemetry__bar-fill--critical"];o.classList.remove(...c),a<=60?o.classList.add("s9-telemetry__bar-fill--ok"):a<=85?o.classList.add("s9-telemetry__bar-fill--warning"):o.classList.add("s9-telemetry__bar-fill--critical")}const i=t.querySelector(".s9-telemetry__value");i&&(i.textContent=Math.round(a).toString());const n=ko.get(t)??!1,s=a>85;s&&!n&&t.dispatchEvent(new CustomEvent("s9:telemetry-threshold",{bubbles:!0,detail:{value:a}})),ko.set(t,s)}const zi=8e3;function Wi(t,{level:e="critical",code:a,message:o,persistent:i=!1}){const n=document.createElement("div");n.className=`s9-alert s9-alert--${e}`,i&&(n.dataset.persistent="true");const s=e==="critical"?"⬡":"⚠",c=new Date().toISOString().replace("T"," ").substring(0,19)+" UTC";return n.innerHTML=`<span class="s9-alert__icon" aria-hidden="true">${s}</span><div class="s9-alert__body"><span class="s9-alert__code">${Wt(a)}</span><span class="s9-alert__message">${Wt(o)}</span></div><span class="s9-alert__timestamp">${Wt(c)}</span><button class="s9-alert__dismiss" aria-label="Dismiss alert">✕</button>`,n.classList.add("glitch-enter"),n.addEventListener("animationend",()=>n.classList.remove("glitch-enter"),{once:!0}),n.querySelector(".s9-alert__dismiss").addEventListener("click",()=>{Fo(n)}),t.appendChild(n),i||setTimeout(()=>{n.isConnected&&Fo(n)},zi),n}function Fo(t){var a;if(!t.isConnected)return;const e=((a=t.querySelector(".s9-alert__code"))==null?void 0:a.textContent)??"";t.classList.add("s9-alert--dismissing"),t.addEventListener("transitionend",()=>{t.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:e}})),t.remove()},{once:!0}),setTimeout(()=>{t.isConnected&&(t.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:e}})),t.remove())},400)}function Wt(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const ne="http://www.w3.org/2000/svg",He=new WeakMap;function $i(t,{nodes:e=[],edges:a=[]}={}){const o=new AbortController,{signal:i}=o,n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s={abortController:o,nodeMap:new Map,edgeMap:new Map,activeNodeId:null,reducedMotion:n};He.set(t,s);const c=document.createElementNS(ne,"svg");c.setAttribute("class","s9-matrix__canvas"),c.setAttribute("viewBox","0 0 100 100"),c.setAttribute("preserveAspectRatio","xMidYMid meet"),c.setAttribute("role","img"),c.setAttribute("aria-label","Network topology matrix");const r=document.createElementNS(ne,"defs"),d=document.createElementNS(ne,"g");d.setAttribute("class","s9-matrix__edges");const h=document.createElementNS(ne,"g");h.setAttribute("class","s9-matrix__nodes"),c.appendChild(r),c.appendChild(d),c.appendChild(h),t.appendChild(c),e.forEach(l=>Vi(t,l)),a.forEach(l=>qi(t,l)),a.forEach(l=>{l.active&&Da(t,l.id)}),c.addEventListener("click",l=>{const u=l.target.closest("[data-node-id]");u?Ct(t,u.dataset.nodeId):s.activeNodeId!==null&&Ct(t,null)},{signal:i}),c.addEventListener("keydown",l=>{if(l.key==="Enter"||l.key===" "){const u=l.target.closest("[data-node-id]");u&&(l.preventDefault(),Ct(t,u.dataset.nodeId))}},{signal:i})}function ji(t,e){const a=He.get(t);if(!a)return;const o=a.nodeMap.get(e);if(!o||o.classList.contains("s9-matrix__node--active"))return;o.classList.add("s9-matrix__node--pulsing");const i=o.querySelector(".s9-matrix__node-ring");i&&i.addEventListener("animationend",n=>{n.animationName==="matrix-ring-pulse"&&o.classList.remove("s9-matrix__node--pulsing")},{once:!0})}function Da(t,e,a=null){const o=He.get(t);if(!o)return;if(e===null){for(const[m]of o.edgeMap)Ra(t,m);return}const i=o.edgeMap.get(e);if(!i||i.active)return;const n=t.querySelector(".s9-matrix__canvas");if(!n)return;const s=n.querySelector(".s9-matrix__edges");if(!s)return;const{line:c,x1:r,y1:d,x2:h,y2:l}=i;c&&c.parentNode&&c.parentNode.removeChild(c);const u=`s9-edge-${e}`,f=document.createElementNS(ne,"path");f.setAttribute("class","s9-matrix__edge s9-matrix__edge--active"),f.setAttribute("id",u),f.setAttribute("data-edge-id",e),f.setAttribute("d",`M ${r} ${d} L ${h} ${l}`),s.appendChild(f);let g=null;if(!o.reducedMotion){g=document.createElementNS(ne,"circle"),g.setAttribute("class","s9-matrix__edge-dot"),g.setAttribute("r","1.2"),a&&(g.style.fill=a,g.style.filter=`drop-shadow(0 0 2px ${a})`);const m=document.createElementNS(ne,"animateMotion");m.setAttribute("dur","2s"),m.setAttribute("repeatCount","indefinite");const b=document.createElementNS(ne,"mpath");b.setAttributeNS("http://www.w3.org/1999/xlink","href",`#${u}`),m.appendChild(b),g.appendChild(m),s.appendChild(g)}i.line=f,i.dot=g,i.active=!0}function Ra(t,e){const a=He.get(t);if(!a)return;const o=a.edgeMap.get(e);if(!o||!o.active)return;const i=t.querySelector(".s9-matrix__canvas");if(!i)return;const n=i.querySelector(".s9-matrix__edges");if(!n)return;const{line:s,dot:c,x1:r,y1:d,x2:h,y2:l}=o;c&&c.parentNode&&c.parentNode.removeChild(c),s&&s.parentNode&&s.parentNode.removeChild(s);const u=document.createElementNS(ne,"line");u.setAttribute("class","s9-matrix__edge"),u.setAttribute("data-edge-id",e),u.setAttribute("x1",r),u.setAttribute("y1",d),u.setAttribute("x2",h),u.setAttribute("y2",l),n.appendChild(u),o.line=u,o.dot=null,o.active=!1}function Ct(t,e){const a=He.get(t);if(!a)return;if(a.activeNodeId!==null){const i=a.nodeMap.get(a.activeNodeId);i&&(i.classList.remove("s9-matrix__node--active"),i.setAttribute("aria-pressed","false")),t.dispatchEvent(new CustomEvent("s9:matrix-node-deselect",{bubbles:!0,detail:{nodeId:a.activeNodeId}})),a.activeNodeId=null}if(e===null)return;const o=a.nodeMap.get(e);o&&(o.classList.add("s9-matrix__node--active"),o.setAttribute("aria-pressed","true"),a.activeNodeId=e,t.dispatchEvent(new CustomEvent("s9:matrix-node-click",{bubbles:!0,detail:{nodeId:e,label:o.getAttribute("aria-label")??e}})))}function Vi(t,{id:e,x:a,y:o,label:i,root:n=!1}){const s=He.get(t);if(!s)return;const c=t.querySelector(".s9-matrix__canvas");if(!c)return;const r=c.querySelector(".s9-matrix__nodes");if(!r)return;const d=document.createElementNS(ne,"g");d.setAttribute("class",`s9-matrix__node${n?" s9-matrix__node--root":""}`),d.setAttribute("data-node-id",e),d.setAttribute("tabindex","0"),d.setAttribute("role","button"),d.setAttribute("aria-label",i),d.setAttribute("aria-pressed","false");const h=document.createElementNS(ne,"circle");h.setAttribute("class","s9-matrix__node-ring"),h.setAttribute("cx",a),h.setAttribute("cy",o),h.setAttribute("r","4");const l=document.createElementNS(ne,"circle");l.setAttribute("class","s9-matrix__node-core"),l.setAttribute("cx",a),l.setAttribute("cy",o),l.setAttribute("r","2.5");const u=document.createElementNS(ne,"text");u.setAttribute("class","s9-matrix__node-label"),u.setAttribute("x",a),u.setAttribute("y",o+3.5),u.textContent=i,d.appendChild(h),d.appendChild(l),d.appendChild(u),r.appendChild(d),s.nodeMap.set(e,d)}function qi(t,{id:e,from:a,to:o}){const i=He.get(t);if(!i)return;const n=t.querySelector(".s9-matrix__canvas");if(!n)return;const s=n.querySelector(".s9-matrix__edges");if(!s)return;const c=i.nodeMap.get(a),r=i.nodeMap.get(o),d=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,h=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,l=r?parseFloat(r.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,u=r?parseFloat(r.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,f=document.createElementNS(ne,"line");f.setAttribute("class","s9-matrix__edge"),f.setAttribute("data-edge-id",e),f.setAttribute("x1",d),f.setAttribute("y1",h),f.setAttribute("x2",l),f.setAttribute("y2",u),s.appendChild(f),i.edgeMap.set(e,{line:f,dot:null,active:!1,from:a,to:o,x1:d,y1:h,x2:l,y2:u})}const Bo={type:"change"},vo={type:"start"},Ia={type:"end"},ft=new Si,No=new _i,Yi=Math.cos(70*kt.DEG2RAD),V=new k,ae=2*Math.PI,G={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},$t=1e-6;class Xi extends wi{constructor(e,a=null){super(e,a),this.state=G.NONE,this.target=new k,this.cursor=new k,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:qe.ROTATE,MIDDLE:qe.DOLLY,RIGHT:qe.PAN},this.touches={ONE:je.ROTATE,TWO:je.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new k,this._lastQuaternion=new Do,this._lastTargetPosition=new k,this._quat=new Do().setFromUnitVectors(e.up,new k(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ro,this._sphericalDelta=new Ro,this._scale=1,this._panOffset=new k,this._rotateStart=new U,this._rotateEnd=new U,this._rotateDelta=new U,this._panStart=new U,this._panEnd=new U,this._panDelta=new U,this._dollyStart=new U,this._dollyEnd=new U,this._dollyDelta=new U,this._dollyDirection=new k,this._mouse=new U,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Zi.bind(this),this._onPointerDown=Ki.bind(this),this._onPointerUp=Qi.bind(this),this._onContextMenu=rn.bind(this),this._onMouseWheel=tn.bind(this),this._onKeyDown=on.bind(this),this._onTouchStart=an.bind(this),this._onTouchMove=nn.bind(this),this._onMouseDown=Ji.bind(this),this._onMouseMove=en.bind(this),this._interceptControlDown=sn.bind(this),this._interceptControlUp=ln.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Bo),this.update(),this.state=G.NONE}pan(e,a){this._pan(e,a),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const a=this.object.position;V.copy(a).sub(this.target),V.applyQuaternion(this._quat),this._spherical.setFromVector3(V),this.autoRotate&&this.state===G.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let o=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(o)&&isFinite(i)&&(o<-Math.PI?o+=ae:o>Math.PI&&(o-=ae),i<-Math.PI?i+=ae:i>Math.PI&&(i-=ae),o<=i?this._spherical.theta=Math.max(o,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(o+i)/2?Math.max(o,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let n=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const s=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),n=s!=this._spherical.radius}if(V.setFromSpherical(this._spherical),V.applyQuaternion(this._quatInverse),a.copy(this.target).add(V),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let s=null;if(this.object.isPerspectiveCamera){const c=V.length();s=this._clampDistance(c*this._scale);const r=c-s;this.object.position.addScaledVector(this._dollyDirection,r),this.object.updateMatrixWorld(),n=!!r}else if(this.object.isOrthographicCamera){const c=new k(this._mouse.x,this._mouse.y,0);c.unproject(this.object);const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),n=r!==this.object.zoom;const d=new k(this._mouse.x,this._mouse.y,0);d.unproject(this.object),this.object.position.sub(d).add(c),this.object.updateMatrixWorld(),s=V.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;s!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position):(ft.origin.copy(this.object.position),ft.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ft.direction))<Yi?this.object.lookAt(this.target):(No.setFromNormalAndCoplanarPoint(this.object.up,this.target),ft.intersectPlane(No,this.target))))}else if(this.object.isOrthographicCamera){const s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),s!==this.object.zoom&&(this.object.updateProjectionMatrix(),n=!0)}return this._scale=1,this._performCursorZoom=!1,n||this._lastPosition.distanceToSquared(this.object.position)>$t||8*(1-this._lastQuaternion.dot(this.object.quaternion))>$t||this._lastTargetPosition.distanceToSquared(this.target)>$t?(this.dispatchEvent(Bo),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ae/60*this.autoRotateSpeed*e:ae/60/60*this.autoRotateSpeed}_getZoomScale(e){const a=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*a)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,a){V.setFromMatrixColumn(a,0),V.multiplyScalar(-e),this._panOffset.add(V)}_panUp(e,a){this.screenSpacePanning===!0?V.setFromMatrixColumn(a,1):(V.setFromMatrixColumn(a,0),V.crossVectors(this.object.up,V)),V.multiplyScalar(e),this._panOffset.add(V)}_pan(e,a){const o=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;V.copy(i).sub(this.target);let n=V.length();n*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*n/o.clientHeight,this.object.matrix),this._panUp(2*a*n/o.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/o.clientWidth,this.object.matrix),this._panUp(a*(this.object.top-this.object.bottom)/this.object.zoom/o.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,a){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const o=this.domElement.getBoundingClientRect(),i=e-o.left,n=a-o.top,s=o.width,c=o.height;this._mouse.x=i/s*2-1,this._mouse.y=-(n/c)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const a=this.domElement;this._rotateLeft(ae*this._rotateDelta.x/a.clientHeight),this._rotateUp(ae*this._rotateDelta.y/a.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let a=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ae*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),a=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ae*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),a=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ae*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),a=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ae*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),a=!0;break}a&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const a=this._getSecondPointerPosition(e),o=.5*(e.pageX+a.x),i=.5*(e.pageY+a.y);this._rotateStart.set(o,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const a=this._getSecondPointerPosition(e),o=.5*(e.pageX+a.x),i=.5*(e.pageY+a.y);this._panStart.set(o,i)}}_handleTouchStartDolly(e){const a=this._getSecondPointerPosition(e),o=e.pageX-a.x,i=e.pageY-a.y,n=Math.sqrt(o*o+i*i);this._dollyStart.set(0,n)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const o=this._getSecondPointerPosition(e),i=.5*(e.pageX+o.x),n=.5*(e.pageY+o.y);this._rotateEnd.set(i,n)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const a=this.domElement;this._rotateLeft(ae*this._rotateDelta.x/a.clientHeight),this._rotateUp(ae*this._rotateDelta.y/a.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const a=this._getSecondPointerPosition(e),o=.5*(e.pageX+a.x),i=.5*(e.pageY+a.y);this._panEnd.set(o,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const a=this._getSecondPointerPosition(e),o=e.pageX-a.x,i=e.pageY-a.y,n=Math.sqrt(o*o+i*i);this._dollyEnd.set(0,n),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const s=(e.pageX+a.x)*.5,c=(e.pageY+a.y)*.5;this._updateZoomParameters(s,c)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let a=0;a<this._pointers.length;a++)if(this._pointers[a]==e.pointerId){this._pointers.splice(a,1);return}}_isTrackingPointer(e){for(let a=0;a<this._pointers.length;a++)if(this._pointers[a]==e.pointerId)return!0;return!1}_trackPointer(e){let a=this._pointerPositions[e.pointerId];a===void 0&&(a=new U,this._pointerPositions[e.pointerId]=a),a.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const a=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[a]}_customWheelEvent(e){const a=e.deltaMode,o={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(a){case 1:o.deltaY*=16;break;case 2:o.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(o.deltaY*=10),o}}function Ki(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Zi(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function Qi(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ia),this.state=G.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],a=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:a.x,pageY:a.y});break}}function Ji(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case qe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=G.DOLLY;break;case qe.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=G.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=G.ROTATE}break;case qe.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=G.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=G.PAN}break;default:this.state=G.NONE}this.state!==G.NONE&&this.dispatchEvent(vo)}function en(t){switch(this.state){case G.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case G.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case G.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function tn(t){this.enabled===!1||this.enableZoom===!1||this.state!==G.NONE||(t.preventDefault(),this.dispatchEvent(vo),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(Ia))}function on(t){this.enabled!==!1&&this._handleKeyDown(t)}function an(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case je.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=G.TOUCH_ROTATE;break;case je.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=G.TOUCH_PAN;break;default:this.state=G.NONE}break;case 2:switch(this.touches.TWO){case je.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=G.TOUCH_DOLLY_PAN;break;case je.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=G.TOUCH_DOLLY_ROTATE;break;default:this.state=G.NONE}break;default:this.state=G.NONE}this.state!==G.NONE&&this.dispatchEvent(vo)}function nn(t){switch(this._trackPointer(t),this.state){case G.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case G.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case G.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case G.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=G.NONE}}function rn(t){this.enabled!==!1&&t.preventDefault()}function sn(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function ln(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Tt={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class ct{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const cn=new va(-1,1,1,-1,0,1);class dn extends De{constructor(){super(),this.setAttribute("position",new Ft([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ft([0,2,0,0,2,0],2))}}const un=new dn;class Pa{constructor(e){this._mesh=new ie(un,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,cn)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class be extends ct{constructor(e,a="tDiffuse"){super(),this.textureID=a,this.uniforms=null,this.material=null,e instanceof oe?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=rt.clone(e.uniforms),this.material=new oe({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Pa(this.material)}render(e,a,o){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=o.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Uo extends ct{constructor(e,a){super(),this.scene=e,this.camera=a,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,a,o){const i=e.getContext(),n=e.state;n.buffers.color.setMask(!1),n.buffers.depth.setMask(!1),n.buffers.color.setLocked(!0),n.buffers.depth.setLocked(!0);let s,c;this.inverse?(s=0,c=1):(s=1,c=0),n.buffers.stencil.setTest(!0),n.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),n.buffers.stencil.setFunc(i.ALWAYS,s,4294967295),n.buffers.stencil.setClear(c),n.buffers.stencil.setLocked(!0),e.setRenderTarget(o),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),n.buffers.color.setLocked(!1),n.buffers.depth.setLocked(!1),n.buffers.color.setMask(!0),n.buffers.depth.setMask(!0),n.buffers.stencil.setLocked(!1),n.buffers.stencil.setFunc(i.EQUAL,1,4294967295),n.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),n.buffers.stencil.setLocked(!0)}}class hn extends ct{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class yo{constructor(e,a){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),a===void 0){const o=e.getSize(new U);this._width=o.width,this._height=o.height,a=new _t(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:xt}),a.texture.name="EffectComposer.rt1"}else this._width=a.width,this._height=a.height;this.renderTarget1=a,this.renderTarget2=a.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new be(Tt),this.copyPass.material.blending=xi,this.timer=new Mi}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,a){this.passes.splice(a,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const a=this.passes.indexOf(e);a!==-1&&this.passes.splice(a,1)}isLastEnabledPass(e){for(let a=e+1;a<this.passes.length;a++)if(this.passes[a].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const a=this.renderer.getRenderTarget();let o=!1;for(let i=0,n=this.passes.length;i<n;i++){const s=this.passes[i];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,o),s.needsSwap){if(o){const c=this.renderer.getContext(),r=this.renderer.state.buffers.stencil;r.setFunc(c.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),r.setFunc(c.EQUAL,1,4294967295)}this.swapBuffers()}Uo!==void 0&&(s instanceof Uo?o=!0:s instanceof hn&&(o=!1))}}this.renderer.setRenderTarget(a)}reset(e){if(e===void 0){const a=this.renderer.getSize(new U);this._pixelRatio=this.renderer.getPixelRatio(),this._width=a.width,this._height=a.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,a){this._width=e,this._height=a;const o=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(o,i),this.renderTarget2.setSize(o,i);for(let n=0;n<this.passes.length;n++)this.passes[n].setSize(o,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class bo extends ct{constructor(e,a,o=null,i=null,n=null){super(),this.scene=e,this.camera=a,this.overrideMaterial=o,this.clearColor=i,this.clearAlpha=n,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new F}render(e,a,o){const i=e.autoClear;e.autoClear=!1;let n,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(n=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:o),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(n),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=i}}const fn={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new F(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Re extends ct{constructor(e,a=1,o,i){super(),this.strength=a,this.radius=o,this.threshold=i,this.resolution=e!==void 0?new U(e.x,e.y):new U(256,256),this.clearColor=new F(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let n=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new _t(n,s,{type:xt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const l=new _t(n,s,{type:xt});l.texture.name="UnrealBloomPass.h"+h,l.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(l);const u=new _t(n,s,{type:xt});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),n=Math.round(n/2),s=Math.round(s/2)}const c=fn;this.highPassUniforms=rt.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new oe({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];const r=[6,10,14,18,22];n=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(r[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new U(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=a,this.compositeMaterial.uniforms.bloomRadius.value=.1;const d=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=d,this.bloomTintColors=[new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=rt.clone(Tt.uniforms),this.blendMaterial=new oe({uniforms:this.copyUniforms,vertexShader:Tt.vertexShader,fragmentShader:Tt.fragmentShader,premultipliedAlpha:!0,blending:j,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new F,this._oldClearAlpha=1,this._basic=new Ye,this._fsQuad=new Pa(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,a){let o=Math.round(e/2),i=Math.round(a/2);this.renderTargetBright.setSize(o,i);for(let n=0;n<this.nMips;n++)this.renderTargetsHorizontal[n].setSize(o,i),this.renderTargetsVertical[n].setSize(o,i),this.separableBlurMaterials[n].uniforms.invSize.value=new U(1/o,1/i),o=Math.round(o/2),i=Math.round(i/2)}render(e,a,o,i,n){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),n&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=o.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=o.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let c=this.renderTargetBright;for(let r=0;r<this.nMips;r++)this._fsQuad.material=this.separableBlurMaterials[r],this.separableBlurMaterials[r].uniforms.colorTexture.value=c.texture,this.separableBlurMaterials[r].uniforms.direction.value=Re.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[r]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[r].uniforms.colorTexture.value=this.renderTargetsHorizontal[r].texture,this.separableBlurMaterials[r].uniforms.direction.value=Re.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[r]),e.clear(),this._fsQuad.render(e),c=this.renderTargetsVertical[r];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,n&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(o),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=s}_getSeparableBlurMaterial(e){const a=[],o=e/3;for(let i=0;i<e;i++)a.push(.39894*Math.exp(-.5*i*i/(o*o))/o);return new oe({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new U(.5,.5)},direction:{value:new U(.5,.5)},gaussianCoefficients:{value:a}},vertexShader:`

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

				}`})}}Re.BlurDirectionX=new U(1,0);Re.BlurDirectionY=new U(0,1);const Go=new lo,mt=new k;class dt extends ya{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],a=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],o=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(o),this.setAttribute("position",new Ft(e,3)),this.setAttribute("uv",new Ft(a,2))}applyMatrix4(e){const a=this.attributes.instanceStart,o=this.attributes.instanceEnd;return a!==void 0&&(a.applyMatrix4(e),o.applyMatrix4(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let a;e instanceof Float32Array?a=e:Array.isArray(e)&&(a=new Float32Array(e));const o=new Jt(a,6,1);return this.setAttribute("instanceStart",new Ve(o,3,0)),this.setAttribute("instanceEnd",new Ve(o,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let a;e instanceof Float32Array?a=e:Array.isArray(e)&&(a=new Float32Array(e));const o=new Jt(a,6,1);return this.setAttribute("instanceColorStart",new Ve(o,3,0)),this.setAttribute("instanceColorEnd",new Ve(o,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ba(e.geometry)),this}fromLineSegments(e){const a=e.geometry;return this.setPositions(a.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new lo);const e=this.attributes.instanceStart,a=this.attributes.instanceEnd;e!==void 0&&a!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Go.setFromBufferAttribute(a),this.boundingBox.union(Go))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wa),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,a=this.attributes.instanceEnd;if(e!==void 0&&a!==void 0){const o=this.boundingSphere.center;this.boundingBox.getCenter(o);let i=0;for(let n=0,s=e.count;n<s;n++)mt.fromBufferAttribute(e,n),i=Math.max(i,o.distanceToSquared(mt)),mt.fromBufferAttribute(a,n),i=Math.max(i,o.distanceToSquared(mt));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}Et.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new U(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Mt.line={uniforms:rt.merge([Et.common,Et.fog,Et.line]),vertexShader:`
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
		`};class he extends oe{constructor(e){super({type:"LineMaterial",uniforms:rt.clone(Mt.line.uniforms),vertexShader:Mt.line.vertexShader,fragmentShader:Mt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const jt=new st,Ho=new k,zo=new k,q=new st,Y=new st,me=new st,Vt=new k,qt=new Sa,K=new Ei,Wo=new k,pt=new lo,gt=new wa,pe=new st;let xe,Ue;function $o(t,e,a){return pe.set(0,0,-e,1).applyMatrix4(t.projectionMatrix),pe.multiplyScalar(1/pe.w),pe.x=Ue/a.width,pe.y=Ue/a.height,pe.applyMatrix4(t.projectionMatrixInverse),pe.multiplyScalar(1/pe.w),Math.abs(Math.max(pe.x,pe.y))}function mn(t,e){const a=t.matrixWorld,o=t.geometry,i=o.attributes.instanceStart,n=o.attributes.instanceEnd,s=Math.min(o.instanceCount,i.count);for(let c=0,r=s;c<r;c++){K.start.fromBufferAttribute(i,c),K.end.fromBufferAttribute(n,c),K.applyMatrix4(a);const d=new k,h=new k;xe.distanceSqToSegment(K.start,K.end,h,d),h.distanceTo(d)<Ue*.5&&e.push({point:h,pointOnLine:d,distance:xe.origin.distanceTo(h),object:t,face:null,faceIndex:c,uv:null,uv1:null})}}function pn(t,e,a){const o=e.projectionMatrix,n=t.material.resolution,s=t.matrixWorld,c=t.geometry,r=c.attributes.instanceStart,d=c.attributes.instanceEnd,h=Math.min(c.instanceCount,r.count),l=-e.near;xe.at(1,me),me.w=1,me.applyMatrix4(e.matrixWorldInverse),me.applyMatrix4(o),me.multiplyScalar(1/me.w),me.x*=n.x/2,me.y*=n.y/2,me.z=0,Vt.copy(me),qt.multiplyMatrices(e.matrixWorldInverse,s);for(let u=0,f=h;u<f;u++){if(q.fromBufferAttribute(r,u),Y.fromBufferAttribute(d,u),q.w=1,Y.w=1,q.applyMatrix4(qt),Y.applyMatrix4(qt),q.z>l&&Y.z>l)continue;if(q.z>l){const M=q.z-Y.z,C=(q.z-l)/M;q.lerp(Y,C)}else if(Y.z>l){const M=Y.z-q.z,C=(Y.z-l)/M;Y.lerp(q,C)}q.applyMatrix4(o),Y.applyMatrix4(o),q.multiplyScalar(1/q.w),Y.multiplyScalar(1/Y.w),q.x*=n.x/2,q.y*=n.y/2,Y.x*=n.x/2,Y.y*=n.y/2,K.start.copy(q),K.start.z=0,K.end.copy(Y),K.end.z=0;const m=K.closestPointToPointParameter(Vt,!0);K.at(m,Wo);const b=kt.lerp(q.z,Y.z,m),w=b>=-1&&b<=1,x=Vt.distanceTo(Wo)<Ue*.5;if(w&&x){K.start.fromBufferAttribute(r,u),K.end.fromBufferAttribute(d,u),K.start.applyMatrix4(s),K.end.applyMatrix4(s);const M=new k,C=new k;xe.distanceSqToSegment(K.start,K.end,C,M),a.push({point:C,pointOnLine:M,distance:xe.origin.distanceTo(C),object:t,face:null,faceIndex:u,uv:null,uv1:null})}}}class ee extends ie{constructor(e=new dt,a=new he({color:Math.random()*16777215})){super(e,a),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,a=e.attributes.instanceStart,o=e.attributes.instanceEnd,i=new Float32Array(2*a.count);for(let s=0,c=0,r=a.count;s<r;s++,c+=2)Ho.fromBufferAttribute(a,s),zo.fromBufferAttribute(o,s),i[c]=c===0?0:i[c-1],i[c+1]=i[c]+Ho.distanceTo(zo);const n=new Jt(i,2,1);return e.setAttribute("instanceDistanceStart",new Ve(n,1,0)),e.setAttribute("instanceDistanceEnd",new Ve(n,1,1)),this}raycast(e,a){const o=this.material.worldUnits,i=e.camera;i===null&&!o&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const n=e.params.Line2!==void 0&&e.params.Line2.threshold||0;xe=e.ray;const s=this.matrixWorld,c=this.geometry,r=this.material;Ue=r.linewidth+n,c.boundingSphere===null&&c.computeBoundingSphere(),gt.copy(c.boundingSphere).applyMatrix4(s);let d;if(o)d=Ue*.5;else{const l=Math.max(i.near,gt.distanceToPoint(xe.origin));d=$o(i,l,r.resolution)}if(gt.radius+=d,xe.intersectsSphere(gt)===!1)return;c.boundingBox===null&&c.computeBoundingBox(),pt.copy(c.boundingBox).applyMatrix4(s);let h;if(o)h=Ue*.5;else{const l=Math.max(i.near,pt.distanceToPoint(xe.origin));h=$o(i,l,r.resolution)}pt.expandByScalar(h),xe.intersectsBox(pt)!==!1&&(o?mn(this,a):pn(this,i,a))}onBeforeRender(e){const a=this.material.uniforms;a&&a.resolution&&(e.getViewport(jt),this.material.uniforms.resolution.value.set(jt.z,jt.w))}}const gn=40,vn=70,Fe=1,H=new WeakMap;let Oa=null;function yn(){return Oa}function ka(t){Oa=t}function to(t,e,a=1.03){const o=(90-t)*(Math.PI/180),i=(e+180)*(Math.PI/180);return new k(-a*Math.sin(o)*Math.cos(i),a*Math.cos(o),a*Math.sin(o)*Math.sin(i))}let vt=null,jo=0;function ze(t=!1){const e=Date.now();if(!t&&vt&&e-jo<500)return vt;const a=getComputedStyle(document.documentElement);return vt={neonCyan:a.getPropertyValue("--neon-cyan").trim(),neonGreen:a.getPropertyValue("--neon-green").trim(),neonWarn:a.getPropertyValue("--neon-warn").trim(),neonAlert:a.getPropertyValue("--neon-alert").trim(),neonSelect:a.getPropertyValue("--neon-select").trim()||"#00ffff"},jo=e,vt}function Ge(t,e){return t<=gn?e.neonGreen:t<=vn?e.neonWarn:e.neonAlert}function nt(t,e,a,o){return[(e+180)/360*a,(90-t)/180*o]}const bn={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.5},scanlineOpacity:{value:.035},aberrationAmt:{value:.0022}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `};function wn(t){return t}function Sn(t){if(t==null)return wn;var e,a,o=t.scale[0],i=t.scale[1],n=t.translate[0],s=t.translate[1];return function(c,r){r||(e=a=0);var d=2,h=c.length,l=new Array(h);for(l[0]=(e+=c[0])*o+n,l[1]=(a+=c[1])*i+s;d<h;)l[d]=c[d],++d;return l}}function _n(t,e){for(var a,o=t.length,i=o-e;i<--o;)a=t[i],t[i++]=t[o],t[o]=a}function xn(t,e){return typeof e=="string"&&(e=t.objects[e]),e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(a){return Vo(t,a)})}:Vo(t,e)}function Vo(t,e){var a=e.id,o=e.bbox,i=e.properties==null?{}:e.properties,n=Fa(t,e);return a==null&&o==null?{type:"Feature",properties:i,geometry:n}:o==null?{type:"Feature",id:a,properties:i,geometry:n}:{type:"Feature",id:a,bbox:o,properties:i,geometry:n}}function Fa(t,e){var a=Sn(t.transform),o=t.arcs;function i(h,l){l.length&&l.pop();for(var u=o[h<0?~h:h],f=0,g=u.length;f<g;++f)l.push(a(u[f],f));h<0&&_n(l,g)}function n(h){return a(h)}function s(h){for(var l=[],u=0,f=h.length;u<f;++u)i(h[u],l);return l.length<2&&l.push(l[0]),l}function c(h){for(var l=s(h);l.length<4;)l.push(l[0]);return l}function r(h){return h.map(c)}function d(h){var l=h.type,u;switch(l){case"GeometryCollection":return{type:l,geometries:h.geometries.map(d)};case"Point":u=n(h.coordinates);break;case"MultiPoint":u=h.coordinates.map(n);break;case"LineString":u=s(h.arcs);break;case"MultiLineString":u=h.arcs.map(s);break;case"Polygon":u=r(h.arcs);break;case"MultiPolygon":u=h.arcs.map(r);break;default:return null}return{type:l,coordinates:u}}return d(e)}function Mn(t,e){var a={},o={},i={},n=[],s=-1;e.forEach(function(d,h){var l=t.arcs[d<0?~d:d],u;l.length<3&&!l[1][0]&&!l[1][1]&&(u=e[++s],e[s]=d,e[h]=u)}),e.forEach(function(d){var h=c(d),l=h[0],u=h[1],f,g;if(f=i[l])if(delete i[f.end],f.push(d),f.end=u,g=o[u]){delete o[g.start];var m=g===f?f:f.concat(g);o[m.start=f.start]=i[m.end=g.end]=m}else o[f.start]=i[f.end]=f;else if(f=o[u])if(delete o[f.start],f.unshift(d),f.start=l,g=i[l]){delete i[g.end];var b=g===f?f:g.concat(f);o[b.start=g.start]=i[b.end=f.end]=b}else o[f.start]=i[f.end]=f;else f=[d],o[f.start=l]=i[f.end=u]=f});function c(d){var h=t.arcs[d<0?~d:d],l=h[0],u;return t.transform?(u=[0,0],h.forEach(function(f){u[0]+=f[0],u[1]+=f[1]})):u=h[h.length-1],d<0?[u,l]:[l,u]}function r(d,h){for(var l in d){var u=d[l];delete h[u.start],delete u.start,delete u.end,u.forEach(function(f){a[f<0?~f:f]=1}),n.push(u)}}return r(i,o),r(o,i),e.forEach(function(d){a[d<0?~d:d]||n.push([d])}),n}function qo(t){return Fa(t,En.apply(this,arguments))}function En(t,e,a){var o,i,n;if(arguments.length>1)o=An(t,e,a);else for(i=0,o=new Array(n=t.arcs.length);i<n;++i)o[i]=i;return{type:"MultiLineString",arcs:Mn(t,o)}}function An(t,e,a){var o=[],i=[],n;function s(l){var u=l<0?~l:l;(i[u]||(i[u]=[])).push({i:l,g:n})}function c(l){l.forEach(s)}function r(l){l.forEach(c)}function d(l){l.forEach(r)}function h(l){switch(n=l,l.type){case"GeometryCollection":l.geometries.forEach(h);break;case"LineString":c(l.arcs);break;case"MultiLineString":case"Polygon":r(l.arcs);break;case"MultiPolygon":d(l.arcs);break}}return h(e),i.forEach(a==null?function(l){o.push(l[0].i)}:function(l){a(l[0].g,l[l.length-1].g)&&o.push(l[0].i)}),o}function tt(t,e){const a=[];for(const i of t)for(let n=0;n<i.length-1;n++){const[s,c]=i[n],[r,d]=i[n+1],h=to(c,s,e),l=to(d,r,e);a.push(h.x,h.y,h.z,l.x,l.y,l.z)}const o=new dt;return o.setPositions(new Float32Array(a)),o}async function Cn(t){const e=H.get(t);if(!e)return;let a;try{const C=await fetch("/data/countries-110m.json",{signal:e.abortController.signal});if(!C.ok)throw new Error(`HTTP ${C.status}`);a=await C.json(),ka(a)}catch(C){if(C.name==="AbortError")return;console.warn("[s9-threatmap] geo lines: failed to load /data/countries-110m.json",C);return}const o=H.get(t);if(!o)return;const i=t.clientWidth||800,n=t.clientHeight||600,s=new co,c=o.cyanColor,r=qo(a,a.objects.land),d=new he({color:c,linewidth:1,transparent:!0,opacity:1,depthWrite:!0});d.resolution.set(i,n);const h=new he({color:c,linewidth:1,transparent:!0,opacity:1,blending:j,depthWrite:!0});h.resolution.set(i,n);const l=new he({color:c,linewidth:1.5,transparent:!0,opacity:.7,blending:j,depthWrite:!1});l.resolution.set(i,n);const u=new ee(tt(r.coordinates,1.002),d),f=new ee(tt(r.coordinates,1.006),h),g=new ee(tt(r.coordinates,1.011),l);u.userData.geoType=f.userData.geoType=g.userData.geoType="coast",s.add(g,f,u);const m=qo(a,a.objects.countries,(C,E)=>C!==E),b=new he({color:c,linewidth:1,transparent:!0,opacity:.55,depthWrite:!0});b.resolution.set(i,n);const w=new he({color:c,linewidth:1,transparent:!0,opacity:.3,blending:j,depthWrite:!1});w.resolution.set(i,n);const x=new ee(tt(m.coordinates,1.012),b),M=new ee(tt(m.coordinates,1.022),w);x.userData.geoType=M.userData.geoType="border",s.add(M,x),o.scene.add(s),o.satelliteMode&&(s.visible=!1),o.geoGroup=s,o.geoLineMats=[d,h,l,b,w]}const X={NODE_FLASH_DUR:80,NODE_SETTLE_DUR:140,NODE_SCALE_PEAK:1.9,NODE_SCALE_DUR:220,NODE_SCALE_RISE:.35,CROSSHAIR_IN_DELAY:40,LABEL_CHAR_RATE:38,LABEL_CURSOR_BLINK:530,LABEL_START_DELAY:250,COORD_SCRAMBLE_DUR:320,COORD_SCRAMBLE_DELAY:80,DESELECT_LABEL_DUR:100,DESELECT_CROSSHAIR_DELAY:80,DESELECT_NODE_DELAY:120,DESELECT_NODE_DUR:180,NODE_DESELECT_SCALE_TROUGH:.65};function Yo(t){return 1-Math.pow(1-t,3)}function Xo(t){return t*t*t}function Ko(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}function Tn(t){const e=H.get(t);if(!e)return;e.nodeTween&&e.nodeTween.mesh.scale.setScalar(1),e.deselectTween&&e.deselectTween.mesh.scale.setScalar(1),e.nodeTween=null,e.deselectTween=null,e.tweenGeneration++;for(const o of e.pendingTimers)clearTimeout(o);e.pendingTimers=[],e.labelTypewriter&&(e.labelTypewriter.cancel(),e.labelTypewriter=null),e.coordScrambleLat&&(e.coordScrambleLat.cancel(),e.coordScrambleLat=null),e.coordScrambleLng&&(e.coordScrambleLng.cancel(),e.coordScrambleLng=null);const a=t.querySelector(".s9-threatmap__crosshair");a&&(a.classList.remove("s9-threatmap__crosshair--animating-in","s9-threatmap__crosshair--animating-out"),a.offsetWidth)}function Ln(t,e,a,o,i){if(e.length===0)return t.textContent="",{cancel:()=>{}};let n=0,s=!0,c=null,r=null,d=!1;function h(){d=!0,clearTimeout(r),clearInterval(c)}function l(){t.textContent=e.slice(0,n)+(s?"_":" ")}l(),c=setInterval(()=>{d||(s=!s,l())},o);function u(){d||(n++,l(),n<e.length?r=setTimeout(u,a):r=setTimeout(()=>{d||(clearInterval(c),t.textContent=e)},o))}return r=setTimeout(u,a),{cancel:h}}function Zo(t,e,a,o,i,n){const s=Date.now(),c=Math.abs(a),r=Math.max(1,Math.floor(Math.log10(c||1))+1);let d=null,h=!1;function l(){h=!0,clearTimeout(d)}function u(){if(h)return;if(Date.now()-s>=i){t.textContent=`${e}${a.toFixed(o)}°`;return}const g=(Math.random()*Math.pow(10,r)).toFixed(o),m=a<0?"-":"";t.textContent=`${e}${m}${g}°`,d=setTimeout(u,40)}return u(),{cancel:l}}function Ke(t,e){const a=H.get(t);if(!a)return;Tn(t);const o=ze(),i=a.activeNodeId;if(i!==null){a.activeNodeId=null,t.removeAttribute("data-active-node"),t.dispatchEvent(new CustomEvent("s9:threatmap-node-deselect",{bubbles:!0,detail:{nodeId:i}}));const l=a.nodeMap.get(i);if(e===null){if(l){l.mesh.material.color.set(o.neonSelect||"#00ffff");const b=new F(o.neonSelect||"#00ffff"),w=new F(Ge(l.level,o)),x=t.querySelector(".s9-threatmap__crosshair-label");x&&x.classList.add("s9-threatmap__crosshair-label--fading");const M=setTimeout(()=>{x&&(x.textContent="",x.classList.remove("s9-threatmap__crosshair-label--fading"))},X.DESELECT_LABEL_DUR);a.pendingTimers.push(M);const C=setTimeout(()=>{const S=t.querySelector(".s9-threatmap__crosshair");S&&(S.classList.remove("s9-threatmap__crosshair--animating-in","s9-threatmap__crosshair--visible"),S.offsetWidth,S.classList.add("s9-threatmap__crosshair--animating-out"))},X.DESELECT_CROSSHAIR_DELAY);a.pendingTimers.push(C);const E=setTimeout(()=>{a.deselectTween={generation:a.tweenGeneration,t0:Date.now(),dur:X.DESELECT_NODE_DUR,troughScale:X.NODE_DESELECT_SCALE_TROUGH,selectColor:b,levelColor:w,mesh:l.mesh,element:t}},X.DESELECT_NODE_DELAY);a.pendingTimers.push(E)}else{const b=t.querySelector(".s9-threatmap__crosshair");b&&b.classList.remove("s9-threatmap__crosshair--visible");const w=t.querySelector(".s9-threatmap__crosshair-label");w&&(w.textContent="")}const g=t.querySelector(".s9-threatmap__coords-lat"),m=t.querySelector(".s9-threatmap__coords-lng");g&&(g.textContent="LAT: --.-°"),m&&(m.textContent="LNG: --.-°");return}l&&(l.mesh.scale.setScalar(1),l.mesh.material.color.set(Ge(l.level,o)));const u=t.querySelector(".s9-threatmap__crosshair");u&&u.classList.remove("s9-threatmap__crosshair--visible");const f=t.querySelector(".s9-threatmap__crosshair-label");f&&(f.textContent="")}if(e===null)return;const n=a.nodeMap.get(e);if(!n)return;if(a.activeNodeId=e,t.setAttribute("data-active-node",e),t.dispatchEvent(new CustomEvent("s9:threatmap-node-select",{bubbles:!0,detail:{nodeId:e,label:n.label,lat:n.lat,lng:n.lng,level:n.level}})),a.reducedMotion){n.mesh.material.color.set(o.neonSelect||"#00ffff"),n.mesh.scale.setScalar(1);const l=t.querySelector(".s9-threatmap__crosshair");l&&l.classList.add("s9-threatmap__crosshair--visible");const u=t.querySelector(".s9-threatmap__crosshair-label");u&&(u.textContent=n.label);const f=t.querySelector(".s9-threatmap__coords-lat"),g=t.querySelector(".s9-threatmap__coords-lng");f&&(f.textContent=`LAT: ${n.lat.toFixed(2)}°`),g&&(g.textContent=`LNG: ${n.lng.toFixed(2)}°`);return}const s=new F("#ffffff"),c=new F(o.neonSelect||"#00ffff");n.mesh.material.color.copy(s),n.mesh.scale.setScalar(1),a.nodeTween={generation:a.tweenGeneration,t0:Date.now(),dur:X.NODE_SCALE_DUR,riseFrac:X.NODE_SCALE_RISE,peakScale:X.NODE_SCALE_PEAK,flashDur:X.NODE_FLASH_DUR,settleDur:X.NODE_SETTLE_DUR,flashColor:s,selectColor:c,mesh:n.mesh};const r=setTimeout(()=>{const l=t.querySelector(".s9-threatmap__crosshair");l&&l.classList.add("s9-threatmap__crosshair--visible","s9-threatmap__crosshair--animating-in")},X.CROSSHAIR_IN_DELAY);a.pendingTimers.push(r);const d=setTimeout(()=>{const l=t.querySelector(".s9-threatmap__coords-lat"),u=t.querySelector(".s9-threatmap__coords-lng");l&&(a.coordScrambleLat=Zo(l,"LAT: ",n.lat,2,X.COORD_SCRAMBLE_DUR)),u&&(a.coordScrambleLng=Zo(u,"LNG: ",n.lng,2,X.COORD_SCRAMBLE_DUR))},X.COORD_SCRAMBLE_DELAY);a.pendingTimers.push(d);const h=setTimeout(()=>{const l=t.querySelector(".s9-threatmap__crosshair-label");l&&(a.labelTypewriter=Ln(l,n.label,X.LABEL_CHAR_RATE,X.LABEL_CURSOR_BLINK))},X.LABEL_START_DELAY);a.pendingTimers.push(h)}function wo(t,e){if(!H.get(t))return;const o=Math.max(0,Math.min(100,e));t.setAttribute("data-threat-level",o)}function So(t,e,a){const o=H.get(t);if(!o)return;const i=o.nodeMap.get(e);if(!i)return;const n=i.level;if(i.level=a,i.mesh.userData.level=a,o.activeNodeId!==e){const s=ze();i.mesh.material.color.set(Ge(a,s))}return n}function _o(t,e){const a=H.get(t);if(!a)return;const o=a.nodeMap.get(e);if(!o||Date.now()-a.lastOrbitInteraction<3e3)return;const i=a.camera.position.length();a.cameraLerpTarget=o.mesh.position.clone().normalize().multiplyScalar(i),a.controls.autoRotate=!1,a.resumeTimer!==null&&(clearTimeout(a.resumeTimer),a.resumeTimer=null)}const Dn=t=>t,Ba=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,Na=t=>t>=1?1:1-Math.pow(2,-10*t),Rn=t=>{const a=2.5949095;return t<.5?Math.pow(2*t,2)*((a+1)*2*t-a)/2:(Math.pow(2*t-2,2)*((a+1)*(2*t-2)+a)+2)/2};function Ie({radius:t,numRings:e,samplesPerRing:a,latitudeMin:o,latitudeMax:i,upAxis:n,mode:s="latitude"}){const c=e*a,r=new Float32Array(c*6),d=new Float32Array(c),h=new Float32Array(c);let l=0,u=0;if(s==="longitude"){const g=Math.sin(o),m=Math.sin(i);for(let b=0;b<e;b++){const w=g+b/e*(m-g),x=Math.sqrt(Math.max(0,1-w*w));for(let M=0;M<a;M++){const C=M/a*2*Math.PI,E=(M+1)/a*2*Math.PI;r[l++]=t*w,r[l++]=t*x*Math.cos(C),r[l++]=t*x*Math.sin(C),r[l++]=t*w,r[l++]=t*x*Math.cos(E),r[l++]=t*x*Math.sin(E),d[u]=b,h[u]=M/a,u++}}}else{const g=Math.sin(o),m=Math.sin(i);for(let b=0;b<e;b++){const w=g+b/e*(m-g),x=Math.sqrt(Math.max(0,1-w*w));for(let M=0;M<a;M++){const C=M/a*2*Math.PI,E=(M+1)/a*2*Math.PI;r[l++]=t*x*Math.cos(C),r[l++]=t*w,r[l++]=t*x*Math.sin(C),r[l++]=t*x*Math.cos(E),r[l++]=t*w,r[l++]=t*x*Math.sin(E),d[u]=b,h[u]=M/a,u++}}}const f=new dt;return f.setPositions(r),f.setAttribute("ringIndex",new Me(d,1)),f.setAttribute("arcPosition",new Me(h,1)),n==="z"&&f.applyMatrix4(new Sa().makeRotationX(-Math.PI/2)),f}const In=`
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
`,Pn=`
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
`,On=`
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
`;function kn(t){return t==="north-to-south"?1:t==="equator-out"?2:0}function Fn({lineColor:t,lineColorB:e,opacity:a,emissiveIntensity:o,numRings:i,stagger:n,ringFade:s,invert:c,warpAmount:r,direction:d,colorSpread:h,brightSpread:l,flickerAmp:u,flickerSpeed:f,arcColorSpread:g,scrollSpeed:m,scrollAxis:b,gradientMode:w,jitter:x}){return{uProgress:{value:0},uNumRings:{value:i},uStagger:{value:n},uRingFade:{value:s},uInvert:{value:c??0},uOpacity:{value:a},uEmissiveIntensity:{value:o},uColor:{value:new F(t)},uColorB:{value:new F(e??t)},uDirection:{value:kn(d)},uWarpAmount:{value:r},uColorSpread:{value:h},uBrightSpread:{value:l},uFlickerAmp:{value:u},uFlickerSpeed:{value:f},uTime:{value:0},uArcColorSpread:{value:g??0},uScrollSpeed:{value:m??0},uScrollAxis:{value:b??0},uGradientMode:{value:w??0},uJitter:{value:x??0}}}function Bn(t){t.vertexShader.includes("vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 )")||console.warn("[RingReveal] LineMaterial vertex shader injection point changed — warp may be misaligned. Check Three.js version."),t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
attribute float ringIndex;
attribute float arcPosition;
varying float vAlpha;
varying vec3  vRingColor;
varying float vFlickerMult;
${In}
${Pn}`),t.vertexShader=t.vertexShader.replace("vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );",`float _scrollOff = uTime * uScrollSpeed;
    float _R = length(instanceStart);
    float _normPos;
    if (uScrollAxis == 1) {
      _normPos = mod(instanceStart.y / _R + _scrollOff + 1.0, 2.0) / 2.0;
    } else {
      _normPos = mod(instanceStart.x / _R + _scrollOff + 1.0, 2.0) / 2.0;
    }
    ${On}
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
  gl_FragColor = vec4(vRingColor * uEmissiveIntensity * max(vFlickerMult, 0.0), vAlpha * uOpacity);`)}function Pe(t){const{lineWidth:e,blending:a,resolution:o}=t,i=new he({color:16777215,linewidth:e,transparent:!0,depthWrite:!1,blending:a,worldUnits:!1,resolution:o??new U(typeof window<"u"?window.innerWidth:1920,typeof window<"u"?window.innerHeight:1080)});return Object.assign(i.uniforms,Fn(t)),i.onBeforeCompile=n=>{Object.assign(n.uniforms,i.uniforms),Bn(n)},i}const yt=new F,bt=new F;function ot(t){return t==="latitude"?1:0}const Nn={radius:1,numRings:48,samplesPerRing:256,latitudeMin:-Math.PI/2,latitudeMax:Math.PI/2,durationMs:1800,easingFn:Ba,direction:"south-to-north",stagger:.4,ringFade:.35,lineColor:65484,lineColorB:65484,lineWidth:1,opacity:.7,glowColor:65484,glowColorB:65484,glowOpacity:.25,glowRadius:1.008,glowLayers:3,glowLayerRadiusStep:.004,glowLayerOpacityFalloff:.5,emissiveIntensity:1.5,warpAmount:.12,morphDurationMs:800,upAxis:"y",mode:"latitude",scrollSpeed:0,colorSpread:0,brightSpread:0,flickerAmp:0,flickerSpeed:2,arcColorSpread:0,gradientMode:0,jitter:0,invert:!1};class Un{constructor(e,a={}){this._scene=e,this._options={...Nn,...a},this._options.ringFade=Math.max(.001,this._options.ringFade),this._options.numRings=Math.max(2,this._options.numRings),this._options.samplesPerRing=Math.max(3,this._options.samplesPerRing),this._options.stagger=Math.max(0,Math.min(1,this._options.stagger)),this._options.radius=Math.max(Number.EPSILON,this._options.radius),this._options.glowRadius=Math.max(Number.EPSILON,this._options.glowRadius),this._options.glowLayers=Math.max(1,Math.round(this._options.glowLayers)),this._playing=!1,this._reversed=!1,this._elapsed=0,this._progress=0,this._onComplete=null,this._morph=null,this._time=0,this._resolution=new U(typeof window<"u"?window.innerWidth:1920,typeof window<"u"?window.innerHeight:1080),this._build()}get isPlaying(){return this._playing}get progress(){return this._progress}get baseRings(){return this._baseRings}get glowRings(){return this._glowLayers[0]}get glowLayers(){return this._glowLayers}play(e){this._reversed=!1,this._playing=!0,this._onComplete=e??null}reverse(e){this._reversed=!0,this._playing=!0,this._onComplete=e??null;const a=1-this._progress;let o=0,i=1;for(let n=0;n<24;n++){const s=(o+i)*.5;this._options.easingFn(s)<a?o=s:i=s}this._elapsed=o*this._options.durationMs}stop(){this._playing=!1}reset(){this._playing=!1,this._reversed=!1,this._elapsed=0,this._progress=0,this._onComplete=null,this._disposeCrossFade(),this._morph=null,this._setProgress(0)}tick(e){var o;this._time+=e/1e3,this._baseRings.material.uniforms.uTime.value=this._time,this._glowLayers.forEach(i=>{i.material.uniforms.uTime.value=this._time});const a=(o=this._morph)==null?void 0:o.crossFade;if(a&&(a.oldBase.material.uniforms.uTime.value=this._time,a.oldGlowLayers.forEach(i=>{i.material.uniforms.uTime.value=this._time})),this._playing){this._elapsed+=e;const i=Math.min(this._elapsed/this._options.durationMs,1),n=this._options.easingFn(i);if(this._progress=this._reversed?1-n:n,this._setProgress(this._progress),this._reversed?this._progress<=0:this._progress>=1){this._playing=!1;const c=this._onComplete;this._onComplete=null,c==null||c()}}if(this._morph){this._morph.elapsed+=e;const i=Math.min(this._morph.elapsed/this._morph.durationMs,1);this._applyMorphT(i),i>=1&&(this._morph=null)}}setColors(e,a){this._baseRings.material.uniforms.uColor.value.set(e),this._glowLayers.forEach(o=>o.material.uniforms.uColor.value.set(a)),this._options.lineColor=e,this._options.glowColor=a}setOpacity(e,a){this._baseRings.material.uniforms.uOpacity.value=e,this._options.opacity=e,a!==void 0&&(this._glowLayers.forEach((o,i)=>{o.material.uniforms.uOpacity.value=a*Math.pow(this._options.glowLayerOpacityFalloff,i)}),this._options.glowOpacity=a)}setScrollSpeed(e){this._options.scrollSpeed=e,this._allMaterials().forEach(a=>{a.uniforms.uScrollSpeed.value=e})}setGradientMode(e){this._options.gradientMode=e,this._allMaterials().forEach(a=>{a.uniforms.uGradientMode.value=e})}setJitter(e){this._options.jitter=e,this._allMaterials().forEach(a=>{a.uniforms.uJitter.value=e})}setInvert(e){this._options.invert=e,this._allMaterials().forEach(a=>{a.uniforms.uInvert.value=e?1:0})}setMode(e){if(e===this._options.mode)return;this._options.mode=e;const a=ot(e);this._allMaterials().forEach(o=>{o.uniforms.uScrollAxis.value=a}),this._rebuildGeometry()}setResolution(e,a){this._resolution.set(e,a),this._allMaterials().forEach(o=>{var i;return(i=o.resolution)==null?void 0:i.set(e,a)})}morphTo(e,a){var b;const o=a??this._options.morphDurationMs,i=this._options,n=this._baseRings.material,s=this._glowLayers[0].material;e.durationMs!==void 0&&(i.durationMs=e.durationMs),e.easingFn!==void 0&&(i.easingFn=e.easingFn),e.direction!==void 0&&(i.direction=e.direction),e.morphDurationMs!==void 0&&(i.morphDurationMs=e.morphDurationMs),e.upAxis!==void 0&&(i.upAxis=e.upAxis),e.latitudeMin!==void 0&&(i.latitudeMin=e.latitudeMin),e.latitudeMax!==void 0&&(i.latitudeMax=e.latitudeMax),e.scrollSpeed!==void 0&&this.setScrollSpeed(e.scrollSpeed),e.mode!==void 0&&e.mode!==i.mode&&(i.mode=e.mode),e.lineWidth!==void 0&&(i.lineWidth=e.lineWidth,this._allMaterials().forEach(w=>{w.linewidth=e.lineWidth})),e.glowLayerOpacityFalloff!==void 0&&e.glowLayerOpacityFalloff!==i.glowLayerOpacityFalloff&&(i.glowLayerOpacityFalloff=e.glowLayerOpacityFalloff,this._glowLayers.forEach((w,x)=>{w.material.uniforms.uOpacity.value=i.glowOpacity*Math.pow(i.glowLayerOpacityFalloff,x)}));const c=e.glowLayers!==void 0&&e.glowLayers!==i.glowLayers,r=e.glowLayerRadiusStep!==void 0&&e.glowLayerRadiusStep!==i.glowLayerRadiusStep;c&&(i.glowLayers=Math.max(1,Math.round(e.glowLayers))),r&&(i.glowLayerRadiusStep=e.glowLayerRadiusStep),(c||r)&&this._rebuildGlowLayers();const d=i.radius,h=e.radius??i.radius,l=e.numRings!==void 0&&e.numRings!==i.numRings,u=e.samplesPerRing!==void 0&&e.samplesPerRing!==i.samplesPerRing,f=e.mode!==void 0&&e.mode!==i.mode;let g=null;if(l||u||f){const w=this._baseRings,x=this._glowLayers.slice(),M=n.uniforms.uOpacity.value,C=x.map(y=>y.material.uniforms.uOpacity.value);l&&(i.numRings=e.numRings),u&&(i.samplesPerRing=e.samplesPerRing),f&&(i.mode=e.mode);const E={radius:i.radius,numRings:i.numRings,samplesPerRing:i.samplesPerRing,latitudeMin:i.latitudeMin,latitudeMax:i.latitudeMax,upAxis:i.upAxis,mode:i.mode},S={lineWidth:i.lineWidth,numRings:i.numRings,stagger:n.uniforms.uStagger.value,ringFade:n.uniforms.uRingFade.value,warpAmount:n.uniforms.uWarpAmount.value,emissiveIntensity:n.uniforms.uEmissiveIntensity.value,direction:i.direction,colorSpread:n.uniforms.uColorSpread.value,brightSpread:n.uniforms.uBrightSpread.value,flickerAmp:n.uniforms.uFlickerAmp.value,flickerSpeed:n.uniforms.uFlickerSpeed.value,arcColorSpread:n.uniforms.uArcColorSpread.value,scrollSpeed:i.scrollSpeed,scrollAxis:ot(i.mode),gradientMode:i.gradientMode,jitter:i.jitter,invert:i.invert?1:0,resolution:this._resolution},v=Pe({...S,lineColor:n.uniforms.uColor.value.getHex(),lineColorB:n.uniforms.uColorB.value.getHex(),opacity:0,blending:At});this._baseRings=new ee(Ie(E),v),this._baseRings.renderOrder=w.renderOrder,this._scene.add(this._baseRings),this._glowLayers=[];for(let y=0;y<i.glowLayers;y++){const _=i.radius*i.glowRadius*(1+y*i.glowLayerRadiusStep),p=Pe({...S,lineColor:s.uniforms.uColor.value.getHex(),lineColorB:s.uniforms.uColorB.value.getHex(),opacity:0,blending:j}),A=new ee(Ie({...E,radius:_}),p);A.renderOrder=((b=x[0])==null?void 0:b.renderOrder)??0,this._scene.add(A),this._glowLayers.push(A)}this._setProgress(this._progress),this._baseRings.material.uniforms.uTime.value=this._time,this._glowLayers.forEach(y=>{y.material.uniforms.uTime.value=this._time}),g={oldBase:w,oldGlowLayers:x,oldBaseOpacity:M,oldGlowLayerOpacities:C}}const m=this._glowLayers[0].material;this._morph={elapsed:0,durationMs:Math.max(o,0),crossFade:g,from:{lineColor:n.uniforms.uColor.value.clone(),lineColorB:n.uniforms.uColorB.value.clone(),glowColor:s.uniforms.uColor.value.clone(),glowColorB:s.uniforms.uColorB.value.clone(),opacity:g?0:n.uniforms.uOpacity.value,glowOpacity:g?0:s.uniforms.uOpacity.value,emissiveIntensity:n.uniforms.uEmissiveIntensity.value,stagger:n.uniforms.uStagger.value,warpAmount:n.uniforms.uWarpAmount.value,ringFade:n.uniforms.uRingFade.value,colorSpread:n.uniforms.uColorSpread.value,brightSpread:n.uniforms.uBrightSpread.value,flickerAmp:n.uniforms.uFlickerAmp.value,flickerSpeed:n.uniforms.uFlickerSpeed.value,arcColorSpread:n.uniforms.uArcColorSpread.value,jitter:n.uniforms.uJitter.value,radius:d},to:{lineColor:e.lineColor!==void 0?new F(e.lineColor):n.uniforms.uColor.value.clone(),lineColorB:e.lineColorB!==void 0?new F(e.lineColorB):n.uniforms.uColorB.value.clone(),glowColor:e.glowColor!==void 0?new F(e.glowColor):m.uniforms.uColor.value.clone(),glowColorB:e.glowColorB!==void 0?new F(e.glowColorB):m.uniforms.uColorB.value.clone(),opacity:e.opacity??n.uniforms.uOpacity.value,glowOpacity:e.glowOpacity??m.uniforms.uOpacity.value,emissiveIntensity:e.emissiveIntensity??n.uniforms.uEmissiveIntensity.value,stagger:e.stagger??n.uniforms.uStagger.value,warpAmount:e.warpAmount??n.uniforms.uWarpAmount.value,ringFade:e.ringFade??n.uniforms.uRingFade.value,colorSpread:e.colorSpread??n.uniforms.uColorSpread.value,brightSpread:e.brightSpread??n.uniforms.uBrightSpread.value,flickerAmp:e.flickerAmp??n.uniforms.uFlickerAmp.value,flickerSpeed:e.flickerSpeed??n.uniforms.uFlickerSpeed.value,arcColorSpread:e.arcColorSpread??n.uniforms.uArcColorSpread.value,jitter:e.jitter??n.uniforms.uJitter.value,radius:h}},o<=0&&(this._applyMorphT(1),this._morph=null)}dispose(){this._disposeCrossFade(),this._scene.remove(this._baseRings),this._baseRings.geometry.dispose(),this._baseRings.material.dispose(),this._glowLayers.forEach(e=>{this._scene.remove(e),e.geometry.dispose(),e.material.dispose()})}_allMaterials(){return[this._baseRings.material,...this._glowLayers.map(e=>e.material)]}_disposeCrossFade(){var a;const e=(a=this._morph)==null?void 0:a.crossFade;e&&(this._scene.remove(e.oldBase),e.oldBase.geometry.dispose(),e.oldBase.material.dispose(),e.oldGlowLayers.forEach(o=>{this._scene.remove(o),o.geometry.dispose(),o.material.dispose()}))}_build(){const e=this._options,a={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},o={lineWidth:e.lineWidth,emissiveIntensity:e.emissiveIntensity,numRings:e.numRings,stagger:e.stagger,ringFade:e.ringFade,warpAmount:e.warpAmount,direction:e.direction,colorSpread:e.colorSpread,brightSpread:e.brightSpread,flickerAmp:e.flickerAmp,flickerSpeed:e.flickerSpeed,arcColorSpread:e.arcColorSpread,scrollSpeed:e.scrollSpeed,scrollAxis:ot(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,invert:e.invert?1:0,resolution:this._resolution},i=Pe({...o,lineColor:e.lineColor,lineColorB:e.lineColorB,opacity:e.opacity,blending:At});this._baseRings=new ee(Ie(a),i),this._scene.add(this._baseRings),this._glowLayers=[];for(let n=0;n<e.glowLayers;n++){const s=e.radius*e.glowRadius*(1+n*e.glowLayerRadiusStep),c=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,n),r=Pe({...o,lineColor:e.glowColor,lineColorB:e.glowColorB,opacity:c,blending:j}),d=new ee(Ie({...a,radius:s}),r);this._scene.add(d),this._glowLayers.push(d)}}_rebuildGlowLayers(){var d,h;const e=this._options,a=(d=this._glowLayers[0])==null?void 0:d.material,o=a?a.uniforms.uColor.value.getHex():e.glowColor,i=a?a.uniforms.uColorB.value.getHex():e.glowColorB,n=((h=this._glowLayers[0])==null?void 0:h.renderOrder)??0;this._glowLayers.forEach(l=>{this._scene.remove(l),l.geometry.dispose(),l.material.dispose()});const s=this._baseRings.material,c={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},r={lineWidth:e.lineWidth,numRings:e.numRings,stagger:s.uniforms.uStagger.value,ringFade:s.uniforms.uRingFade.value,warpAmount:s.uniforms.uWarpAmount.value,emissiveIntensity:s.uniforms.uEmissiveIntensity.value,direction:e.direction,colorSpread:s.uniforms.uColorSpread.value,brightSpread:s.uniforms.uBrightSpread.value,flickerAmp:s.uniforms.uFlickerAmp.value,flickerSpeed:s.uniforms.uFlickerSpeed.value,scrollSpeed:e.scrollSpeed,scrollAxis:ot(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,resolution:this._resolution};this._glowLayers=[];for(let l=0;l<e.glowLayers;l++){const u=e.radius*e.glowRadius*(1+l*e.glowLayerRadiusStep),f=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,l),g=Pe({...r,lineColor:o,lineColorB:i,opacity:f,blending:j}),m=new ee(Ie({...c,radius:u}),g);m.renderOrder=n,m.material.uniforms.uProgress.value=this._progress,m.material.uniforms.uTime.value=this._time,this._scene.add(m),this._glowLayers.push(m)}}_rebuildGeometry(){var d,h,l;const e=this._options,a=this._baseRings,o=this._glowLayers.slice(),i=a.material,n={radius:e.radius,numRings:e.numRings,samplesPerRing:e.samplesPerRing,latitudeMin:e.latitudeMin,latitudeMax:e.latitudeMax,upAxis:e.upAxis,mode:e.mode},s={lineWidth:e.lineWidth,numRings:e.numRings,stagger:i.uniforms.uStagger.value,ringFade:i.uniforms.uRingFade.value,warpAmount:i.uniforms.uWarpAmount.value,emissiveIntensity:i.uniforms.uEmissiveIntensity.value,direction:e.direction,colorSpread:i.uniforms.uColorSpread.value,brightSpread:i.uniforms.uBrightSpread.value,flickerAmp:i.uniforms.uFlickerAmp.value,flickerSpeed:i.uniforms.uFlickerSpeed.value,arcColorSpread:((d=i.uniforms.uArcColorSpread)==null?void 0:d.value)??0,scrollSpeed:e.scrollSpeed,scrollAxis:ot(e.mode),gradientMode:e.gradientMode,jitter:e.jitter,resolution:this._resolution},c=Pe({...s,lineColor:i.uniforms.uColor.value.getHex(),lineColorB:i.uniforms.uColorB.value.getHex(),opacity:i.uniforms.uOpacity.value,blending:At});this._baseRings=new ee(Ie(n),c),this._baseRings.renderOrder=a.renderOrder,this._baseRings.material.uniforms.uProgress.value=this._progress,this._baseRings.material.uniforms.uTime.value=this._time,this._scene.add(this._baseRings);const r=(h=o[0])==null?void 0:h.material;this._glowLayers=[];for(let u=0;u<e.glowLayers;u++){const f=e.radius*e.glowRadius*(1+u*e.glowLayerRadiusStep),g=e.glowOpacity*Math.pow(e.glowLayerOpacityFalloff,u),m=Pe({...s,lineColor:(r==null?void 0:r.uniforms.uColor.value.getHex())??e.glowColor,lineColorB:(r==null?void 0:r.uniforms.uColorB.value.getHex())??e.glowColorB,opacity:g,blending:j}),b=new ee(Ie({...n,radius:f}),m);b.renderOrder=((l=o[0])==null?void 0:l.renderOrder)??0,b.material.uniforms.uProgress.value=this._progress,b.material.uniforms.uTime.value=this._time,this._scene.add(b),this._glowLayers.push(b)}this._scene.remove(a),a.geometry.dispose(),a.material.dispose(),o.forEach(u=>{this._scene.remove(u),u.geometry.dispose(),u.material.dispose()})}_setProgress(e){this._baseRings.material.uniforms.uProgress.value=e,this._glowLayers.forEach(a=>{a.material.uniforms.uProgress.value=e})}_applyMorphT(e){const{from:a,to:o}=this._morph,i=this._baseRings.material,n=(d,h)=>d+(h-d)*e;yt.lerpColors(a.lineColor,o.lineColor,e),i.uniforms.uColor.value.copy(yt),bt.lerpColors(a.lineColorB,o.lineColorB,e),i.uniforms.uColorB.value.copy(bt),i.uniforms.uOpacity.value=n(a.opacity,o.opacity),i.uniforms.uEmissiveIntensity.value=n(a.emissiveIntensity,o.emissiveIntensity),i.uniforms.uStagger.value=n(a.stagger,o.stagger),i.uniforms.uWarpAmount.value=n(a.warpAmount,o.warpAmount),i.uniforms.uRingFade.value=n(a.ringFade,o.ringFade),i.uniforms.uColorSpread.value=n(a.colorSpread,o.colorSpread),i.uniforms.uBrightSpread.value=n(a.brightSpread,o.brightSpread),i.uniforms.uFlickerAmp.value=n(a.flickerAmp,o.flickerAmp),i.uniforms.uFlickerSpeed.value=n(a.flickerSpeed,o.flickerSpeed),i.uniforms.uArcColorSpread.value=n(a.arcColorSpread,o.arcColorSpread),i.uniforms.uJitter.value=n(a.jitter,o.jitter),yt.lerpColors(a.glowColor,o.glowColor,e),bt.lerpColors(a.glowColorB,o.glowColorB,e);const s=n(a.glowOpacity,o.glowOpacity),c=this._options.glowLayerOpacityFalloff;this._glowLayers.forEach((d,h)=>{const l=d.material;l.uniforms.uColor.value.copy(yt),l.uniforms.uColorB.value.copy(bt),l.uniforms.uOpacity.value=s*Math.pow(c,h),l.uniforms.uEmissiveIntensity.value=n(a.emissiveIntensity,o.emissiveIntensity),l.uniforms.uStagger.value=n(a.stagger,o.stagger),l.uniforms.uWarpAmount.value=n(a.warpAmount,o.warpAmount),l.uniforms.uRingFade.value=n(a.ringFade,o.ringFade),l.uniforms.uColorSpread.value=n(a.colorSpread,o.colorSpread),l.uniforms.uBrightSpread.value=n(a.brightSpread,o.brightSpread),l.uniforms.uFlickerAmp.value=n(a.flickerAmp,o.flickerAmp),l.uniforms.uFlickerSpeed.value=n(a.flickerSpeed,o.flickerSpeed),l.uniforms.uArcColorSpread.value=n(a.arcColorSpread,o.arcColorSpread),l.uniforms.uJitter.value=n(a.jitter,o.jitter)});const r=n(a.radius,o.radius)/this._options.radius;if(this._baseRings.scale.setScalar(r),this._glowLayers.forEach(d=>d.scale.setScalar(r)),this._morph.crossFade){const{oldBase:d,oldGlowLayers:h,oldBaseOpacity:l,oldGlowLayerOpacities:u}=this._morph.crossFade;d.material.uniforms.uOpacity.value=l*(1-e),d.material.uniforms.uProgress.value=this._progress,h.forEach((f,g)=>{f.material.uniforms.uOpacity.value=u[g]*(1-e),f.material.uniforms.uProgress.value=this._progress}),e>=1&&(this._scene.remove(d),d.geometry.dispose(),d.material.dispose(),h.forEach(f=>{this._scene.remove(f),f.geometry.dispose(),f.material.dispose()}))}if(e>=1){const d=this._options;d.opacity=o.opacity,d.glowOpacity=o.glowOpacity,d.emissiveIntensity=o.emissiveIntensity,d.stagger=o.stagger,d.warpAmount=o.warpAmount,d.ringFade=o.ringFade,d.colorSpread=o.colorSpread,d.brightSpread=o.brightSpread,d.flickerAmp=o.flickerAmp,d.flickerSpeed=o.flickerSpeed,d.arcColorSpread=o.arcColorSpread,d.jitter=o.jitter,d.lineColor=o.lineColor.getHex(),d.lineColorB=o.lineColorB.getHex(),d.glowColor=o.glowColor.getHex(),d.glowColorB=o.glowColorB.getHex(),d.radius=o.radius}}}function Gn(t){return t==="bracket"?`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-bracket" aria-hidden="true">
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--tr"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--bl"></span>
      <span class="s9-threatmap__crosshair-corner s9-threatmap__crosshair-corner--br"></span>
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`:t==="diamond"?`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-diamond" aria-hidden="true">
      <span class="s9-threatmap__crosshair-label"></span>
    </div>`:`<div class="s9-threatmap__crosshair s9-threatmap__crosshair--shape-box" aria-hidden="true">
    <span class="s9-threatmap__crosshair-label"></span>
  </div>`}function Ua(t,{autoRotate:e=!0,bloomStrength:a=1.7,crosshairShape:o="box"}={}){const i=new AbortController,{signal:n}=i,s=window.matchMedia("(prefers-reduced-motion: reduce)").matches,c=ze(),r=new uo({antialias:!0,alpha:!0});r.setPixelRatio(window.devicePixelRatio),r.setSize(t.clientWidth||800,t.clientHeight||600),r.domElement.classList.add("s9-threatmap__canvas"),t.appendChild(r.domElement);const d=new ho,h=new _a(45,(t.clientWidth||800)/(t.clientHeight||600),.1,100);h.position.set(0,0,3);const l=new ke(Fe,48,48),u=new ke(Fe*.98,48,48),f=new F(c.neonCyan||"#00d4b0"),g=new ba(l).getAttribute("position").array,m=new dt;m.setPositions(g);const b=t.clientWidth||800,w=t.clientHeight||600,x=new he({color:f,linewidth:1,transparent:!0,opacity:.014,depthTest:!0,depthWrite:!1});x.resolution.set(b,w);const M=new ee(m,x);M.renderOrder=0,d.add(M);const C=new Ye({colorWrite:!1,depthWrite:!0,depthTest:!0,depthFunc:Ci,side:Ai}),E=new ie(u,C);E.renderOrder=1,d.add(E);const S=new Ye({colorWrite:!1,depthWrite:!0,depthTest:!0,side:eo}),v=new ie(l,S);v.renderOrder=1,d.add(v);const y=new Ye({color:new F("#010e0b"),transparent:!0,opacity:.72,depthTest:!0,depthWrite:!0,side:xa}),_=new ie(l,y);_.renderOrder=1,d.add(_);const p=new he({color:f,linewidth:1,transparent:!0,opacity:.05,depthTest:!0,depthWrite:!1});p.resolution.set(b,w);const A=new ee(m,p);A.renderOrder=2,d.add(A);const R=new he({color:f,linewidth:1,transparent:!0,opacity:.03,blending:j,depthTest:!0,depthWrite:!1});R.resolution.set(b,w);const N=new ee(m,R);N.renderOrder=3,d.add(N);const re=new ke(Fe,48,48),Q=new oe({uniforms:{uColor:{value:new k(f.r,f.g,f.b)}},vertexShader:`
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
    `,transparent:!0,blending:j,depthWrite:!1,side:eo}),B=new ie(re,Q);B.renderOrder=4,d.add(B);const O=new Xi(h,r.domElement);O.enableDamping=!0,O.dampingFactor=.05,O.autoRotate=e&&!s,O.autoRotateSpeed=.4,O.enablePan=!1,O.minDistance=1.5,O.maxDistance=5,O.minPolarAngle=Math.PI/2-42.5*Math.PI/180,O.maxPolarAngle=Math.PI/2+42.5*Math.PI/180;const se=new yo(r),le=new bo(d,h);se.addPass(le);const ce=new Re(new U(t.clientWidth||800,t.clientHeight||600),a*2,.4,.3);se.addPass(ce);const Qe=new be(bn);se.addPass(Qe);const We=document.createElement("div");We.className="s9-threatmap__overlay",We.innerHTML=`
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tr" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--bl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--br" aria-hidden="true"></div>
    ${Gn(o)}
    <div class="s9-threatmap__coords" aria-live="polite">
      <span class="s9-threatmap__coords-lat">LAT: --.-°</span>
      <span class="s9-threatmap__coords-lng">LNG: --.-°</span>
    </div>
    <div class="s9-threatmap__node-count">NODES: 0</div>
  `,t.appendChild(We);let Je=null;O.addEventListener("start",()=>{O.autoRotate=!1,Je!==null&&(clearTimeout(Je),Je=null);const D=H.get(t);D&&(D.cameraLerpTarget=null,D.lastOrbitInteraction=Date.now())}),O.addEventListener("end",()=>{!s&&e&&(Je=setTimeout(()=>{O.autoRotate=!0,Je=null},6e3))});const Eo=new ResizeObserver(()=>{const D=t.clientWidth,J=t.clientHeight;if(!D||!J)return;h.aspect=D/J,h.updateProjectionMatrix(),r.setSize(D,J),se.setSize(D,J),ce.resolution.set(D,J);const de=H.get(t);if(de){de.globeBackMat.resolution.set(D,J),de.globeFrontMat.resolution.set(D,J),de.globeGlowMat.resolution.set(D,J);for(const I of de.geoLineMats)I.resolution.set(D,J)}});Eo.observe(t);const Ao=new Ti;r.domElement.addEventListener("click",D=>{const J=H.get(t);if(!J)return;const de=r.domElement.getBoundingClientRect(),I=de.width,$=de.height,z=(D.clientX-de.left)/I*2-1,te=-((D.clientY-de.top)/$)*2+1;Ao.setFromCamera(new U(z,te),h);const Ae=Array.from(J.nodeMap.values()).map(ue=>ue.mesh),fe=Ao.intersectObjects(Ae,!1);if(fe.length>0){const ue=fe[0].object;Ke(t,ue.userData.nodeId)}else J.activeNodeId!==null&&Ke(t,null)},{signal:n}),H.set(t,{animFrameId:null,renderer:r,composer:se,bloomPass:ce,controls:O,scene:d,camera:h,resizeObserver:Eo,nodeMap:new Map,edgeMap:new Map,abortController:i,resumeTimer:null,reducedMotion:s,activeNodeId:null,colors:c,cyanColor:f,globeGeo:l,occluderGeo:u,globeBack:M,globeBackMat:x,occluder:E,frontOccluder:v,globeSurface:_,globeFront:A,globeFrontMat:p,globeGlow:N,globeGlowMat:R,rimGeo:re,rimMesh:B,geoGroup:null,geoLineMats:[],cameraLerpTarget:null,lastOrbitInteraction:0,arcs:[],satelliteMode:!1,sunAngle:Math.random()*Math.PI*2,satelliteGroup:null,holoPass:Qe,nodeGeo:new ke(.02,8,8),nodeTween:null,deselectTween:null,labelTypewriter:null,coordScrambleLat:null,coordScrambleLng:null,pendingTimers:[],tweenGeneration:0,crosshairShape:o});const Co=H.get(t);let To=performance.now();function Lo(){const D=H.get(t);if(!D)return;D.animFrameId=requestAnimationFrame(Lo);const J=performance.now(),de=J-To;To=J,D.revealAnim&&D.revealAnim.tick(de),D.cameraLerpTarget&&Date.now()-D.lastOrbitInteraction>=3e3&&(D.camera.position.lerp(D.cameraLerpTarget,.06),D.camera.position.distanceTo(D.cameraLerpTarget)<.04&&(D.camera.position.copy(D.cameraLerpTarget),D.cameraLerpTarget=null)),D.controls.update();for(let I=D.arcs.length-1;I>=0;I--){const $=D.arcs[I],z=Math.min(1,(Date.now()-$.t0)/$.dur);if($.particle.position.copy($.curve.getPoint(z)),z>.75){const te=1-(z-.75)/.25;$.ptMat.opacity=.9*te,$.lineMat.opacity=.1*te}z>=1&&(D.scene.remove($.line),D.scene.remove($.particle),$.lineGeo.dispose(),$.lineMat.dispose(),$.ptGeo.dispose(),$.ptMat.dispose(),D.arcs.splice(I,1))}if(D.satelliteMode&&D.satMat){D.sunAngle+=15e-5;const I=performance.now()*.001;D.satMat.uniforms.sunDir.value.set(Math.cos(D.sunAngle),.22,Math.sin(D.sunAngle)).normalize(),D.satMat.uniforms.time.value=I,D.atmMat&&(D.atmMat.uniforms.time.value=I)}if(D.holoPass&&(D.holoPass.uniforms.time.value=performance.now()*.001),D.activeNodeId!==null){const I=D.nodeMap.get(D.activeNodeId),$=t.querySelector(".s9-threatmap__crosshair");if(I&&$){const z=t.clientWidth,te=t.clientHeight,Ae=I.mesh.position.clone().project(D.camera),fe=(Ae.x*.5+.5)*z,ue=(-Ae.y*.5+.5)*te;$.style.left=`${fe}px`,$.style.top=`${ue}px`}}if(D.nodeTween){const I=D.nodeTween,$=Date.now()-I.t0,z=Math.min(1,$/I.dur),te=z<I.riseFrac?Yo(z/I.riseFrac):Xo((z-I.riseFrac)/(1-I.riseFrac)),Ae=z<I.riseFrac?1+(I.peakScale-1)*te:I.peakScale-(I.peakScale-1)*te;I.mesh.scale.setScalar(Ae);const fe=I.flashDur/I.dur,ue=I.settleDur/I.dur;if(z<fe)I.mesh.material.color.copy(I.flashColor);else if(z<fe+ue){const bi=(z-fe)/ue;I.mesh.material.color.lerpColors(I.flashColor,I.selectColor,Ko(bi))}else I.mesh.material.color.copy(I.selectColor);z>=1&&(I.mesh.scale.setScalar(1),I.mesh.material.color.copy(I.selectColor),D.nodeTween=null)}if(D.deselectTween){const I=D.deselectTween,$=Date.now()-I.t0,z=Math.min(1,$/I.dur),te=.4,Ae=z<te?Xo(z/te):Yo((z-te)/(1-te)),fe=z<te?1-(1-I.troughScale)*Ae:I.troughScale+(1-I.troughScale)*Ae;if(I.mesh.scale.setScalar(fe),I.mesh.material.color.lerpColors(I.selectColor,I.levelColor,Ko(z)),z>=1){I.mesh.scale.setScalar(1),I.mesh.material.color.copy(I.levelColor);const ue=I.element.querySelector(".s9-threatmap__crosshair");ue&&ue.classList.remove("s9-threatmap__crosshair--animating-out"),D.deselectTween=null}}D.composer.render()}const Gt=new Un(d,{radius:Fe*1.003,numRings:56,durationMs:2e3,easingFn:Na,direction:"south-to-north",stagger:.55,lineColor:65484,glowColor:65484,emissiveIntensity:2,opacity:0,glowOpacity:0});Gt.baseRings.renderOrder=4,Gt.glowRings.renderOrder=4,Co.revealAnim=Gt,Co.animFrameId=requestAnimationFrame(Lo),Cn(t)}function Hn(t){var e;return((e=H.get(t))==null?void 0:e.camera)??null}function zn(t){var e;return((e=H.get(t))==null?void 0:e.revealAnim)??null}function Wn(t){var e;return((e=H.get(t))==null?void 0:e.scene)??null}function $n(t,e){const a=H.get(t);if(!a)return;const o=a.edgeMap.get(e);o&&(o.line.geometry.dispose(),o.line.material.dispose(),a.scene.remove(o.line),a.edgeMap.delete(e))}function Ga(t){const e=H.get(t);if(!e)return;const a=t.querySelector(".s9-threatmap__node-count");a&&(a.textContent=`NODES: ${e.nodeMap.size}`)}function Ha(t,{id:e,lat:a,lng:o,label:i,level:n}){const s=H.get(t);if(!s)return;if(a<-90||a>90||o<-180||o>180){console.warn(`[s9-threatmap] addNode: invalid coordinates for "${e}": lat=${a}, lng=${o}`);return}if(s.nodeMap.has(e)){console.warn(`[s9-threatmap] addNode: node "${e}" already exists.`);return}const c=ze(),r=Ge(n,c),d=new Ye({color:new F(r)}),h=new ie(s.nodeGeo,d);h.renderOrder=5;const l=to(a,o);h.position.copy(l),h.userData.nodeId=e,h.userData.label=i,h.userData.lat=a,h.userData.lng=o,h.userData.level=n,s.scene.add(h),s.nodeMap.set(e,{mesh:h,lat:a,lng:o,label:i,level:n}),Ga(t)}function za(t,e){const a=H.get(t);if(!a)return;const o=a.nodeMap.get(e);if(!o){console.warn(`[s9-threatmap] removeNode: node "${e}" not found.`);return}a.activeNodeId===e&&Ke(t,null);for(const[i,n]of a.edgeMap)(n.from===e||n.to===e)&&$n(t,i);o.mesh.material.dispose(),a.scene.remove(o.mesh),a.nodeMap.delete(e),Ga(t)}function jn(t,e){const a=H.get(t);if(!a||a.reducedMotion)return;const o=a.nodeMap.get(e);if(!o)return;const i=ze(),n=Ge(o.level,i),s=20,c=.035,r=[];for(let b=0;b<=s;b++){const w=b/s*Math.PI*2;r.push(new k(Math.cos(w)*c,Math.sin(w)*c,0))}const d=new De().setFromPoints(r),h=new Ne({color:new F(n),transparent:!0,opacity:.8,depthWrite:!1}),l=new fo(d,h);l.renderOrder=5,l.position.copy(o.mesh.position);const u=o.mesh.position.clone().normalize();l.quaternion.setFromUnitVectors(new k(0,0,1),u),a.scene.add(l);const f=performance.now(),g=700;let m;(function b(w){if(!H.get(t)){cancelAnimationFrame(m),a.scene.remove(l),d.dispose(),h.dispose();return}const x=Math.min(1,(w-f)/g);l.scale.setScalar(1+x*6),h.opacity=.85*(1-x),x<1?m=requestAnimationFrame(b):(a.scene.remove(l),d.dispose(),h.dispose())})(performance.now())}function Vn(t,e,a){const o=H.get(t);if(!o||o.reducedMotion)return;const i=o.nodeMap.get(e),n=o.nodeMap.get(a);if(!i||!n)return;const s=ze(),c=Ge(n.level,s),r=i.mesh.position.clone(),d=n.mesh.position.clone(),h=r.clone().add(d).multiplyScalar(.5),l=.2+h.length()*.25,u=h.clone().normalize().multiplyScalar(Fe+l),f=new Li(r,u,d),g=new De().setFromPoints(f.getPoints(48)),m=new Ne({color:new F(c),transparent:!0,opacity:.1,depthWrite:!1}),b=new mo(g,m);b.renderOrder=2;const w=new ke(.009,4,4),x=new Ye({color:new F(c),transparent:!0,opacity:.9}),M=new ie(w,x);M.renderOrder=3,M.position.copy(r),o.scene.add(b),o.scene.add(M),o.arcs.push({curve:f,line:b,lineGeo:g,lineMat:m,particle:M,ptGeo:w,ptMat:x,t0:Date.now(),dur:1e3+Math.random()*700})}function qn(t=null){const o=document.createElement("canvas");o.width=2048,o.height=1024;const i=o.getContext("2d"),n=i.createLinearGradient(0,0,0,1024);if(n.addColorStop(0,"#071a2e"),n.addColorStop(.15,"#082035"),n.addColorStop(.5,"#0a2a46"),n.addColorStop(.85,"#082035"),n.addColorStop(1,"#071a2e"),i.fillStyle=n,i.fillRect(0,0,2048,1024),t){const s=xn(t,t.objects.land),r=(s.type==="FeatureCollection"?s.features:[s]).flatMap(l=>{const u=l.geometry;return u?u.type==="Polygon"?[u.coordinates]:u.coordinates:[]}),d=i.createLinearGradient(0,0,0,1024);d.addColorStop(0,"#dce8dc"),d.addColorStop(.06,"#8a9c7a"),d.addColorStop(.16,"#527848"),d.addColorStop(.28,"#4e7040"),d.addColorStop(.4,"#4a6c34"),d.addColorStop(.5,"#3a5c24"),d.addColorStop(.6,"#4a6c34"),d.addColorStop(.72,"#4e7040"),d.addColorStop(.84,"#7a8c6a"),d.addColorStop(.92,"#ccd8c4"),d.addColorStop(1,"#eaf0ea");for(const l of r)for(let u=0;u<l.length;u++){const f=l[u];i.beginPath();for(let g=0;g<f.length;g++){const[m,b]=f[g],w=(m+180)/360*2048,x=(90-b)/180*1024;g===0?i.moveTo(w,x):i.lineTo(w,x)}i.closePath(),i.fillStyle=u===0?d:"#0a2a46",i.fill()}const h=[[22,15,16,28,"rgba(172,142, 88,0.72)"],[23,44,8,12,"rgba(178,148, 96,0.68)"],[27,70,5,9,"rgba(182,158,112,0.52)"],[42,100,6,16,"rgba(152,128, 86,0.58)"],[-25,132,10,17,"rgba(168,134, 82,0.58)"],[-22,-68,4,6,"rgba(142,118, 76,0.48)"],[35,-114,5,8,"rgba(158,128, 82,0.42)"],[40,58,5,8,"rgba(158,134, 88,0.45)"]];for(const[l,u,f,g,m]of h){const[b,w]=nt(l,u,2048,1024),x=g/360*2048,M=f/180*1024,C=i.createRadialGradient(b,w,0,b,w,Math.max(x,M)),E=m.replace(/[\d.]+\)$/,"0)");C.addColorStop(0,m),C.addColorStop(.55,m),C.addColorStop(.88,m.replace(/[\d.]+\)$/,"0.08)")),C.addColorStop(1,E),i.fillStyle=C,i.beginPath(),i.ellipse(b,w,x,M,0,0,Math.PI*2),i.fill()}i.strokeStyle="rgba(120,175,210,0.22)",i.lineWidth=.8;for(const l of r){const u=l[0];i.beginPath();for(let f=0;f<u.length;f++){const[g,m]=u[f],b=(g+180)/360*2048,w=(90-m)/180*1024;f===0?i.moveTo(b,w):i.lineTo(b,w)}i.closePath(),i.stroke()}}i.strokeStyle="rgba(100,150,200,0.04)",i.lineWidth=.5;for(let s=-80;s<=80;s+=30){const c=nt(s,0,2048,1024)[1];i.beginPath(),i.moveTo(0,c),i.lineTo(2048,c),i.stroke()}for(let s=-180;s<=180;s+=30){const c=nt(0,s,2048,1024)[0];i.beginPath(),i.moveTo(c,0),i.lineTo(c,1024),i.stroke()}return o}function Yn(){const a=document.createElement("canvas");a.width=1024,a.height=512;const o=a.getContext("2d");o.fillStyle="#000810",o.fillRect(0,0,1024,512);const i=[[40.7,-74,4],[34,-118.2,3.5],[41.9,-87.6,3],[29.8,-95.4,2.5],[19.4,-99.1,3],[43.7,-79.4,3],[45.5,-73.6,2.5],[49.3,-123.1,2],[38.9,-77,2.5],[42.4,-71.1,2.5],[32.8,-96.8,2.5],[33.7,-84.4,2],[37.8,-122.4,2.5],[47.6,-122.3,2],[39.7,-105,2],[33.4,-112.1,2],[36.2,-115.1,2],[29.4,-98.5,2],[32.7,-97.1,2],[30.3,-81.7,1.5],[51,-114.1,2],[53.5,-113.5,2],[49.9,-97.1,2],[14.1,-87.2,1.5],[13.7,-89.2,1.5],[-23.5,-46.6,4],[-22.9,-43.2,3.5],[-34.6,-58.4,3.5],[-12,-77,2],[4.7,-74.1,2],[10.5,-66.9,2],[-33.5,-70.7,2.5],[-3.7,-38.5,2],[-8.1,-34.9,2],[-19.9,-43.9,2.5],[-30,-51.2,2],[-15.8,-47.9,2],[51.5,-.1,4],[48.9,2.3,4],[52.5,13.4,3.5],[55.8,37.6,4],[41,28.9,3.5],[59.9,10.8,2],[59.3,18.1,2],[60.2,25,2],[52.2,21,2.5],[50.1,14.4,2.5],[47.5,19,2.5],[48.2,16.4,2.5],[47.4,8.5,2.5],[48.1,11.6,3],[52.4,4.9,3],[40.4,-3.7,3],[41.4,2.2,3],[45.5,9.2,3],[41.9,12.5,3],[37.9,23.7,2.5],[50,8.7,2.5],[51,13.7,2],[51.2,6.8,2.5],[50.9,4.3,2.5],[53.5,-2.2,2],[55.7,12.6,2],[50.5,30.5,2.5],[59.5,30.3,2.5],[48,37.8,2],[46.5,30.7,2],[49.8,24,2],[50.4,30.5,2],[45.4,28,2],[44.4,26.1,2],[42.7,23.3,2],[37.1,-8.6,2],[30.1,31.3,3.5],[25.2,55.3,2.5],[33.3,44.4,2.5],[35.7,51.4,3],[24.7,46.7,2.5],[31.8,35.2,2],[33.9,35.5,2],[36.8,10.2,2],[32.9,13.2,2],[30.7,29.7,2],[6.5,3.4,2.5],[-26.2,28,3],[-33.9,18.4,2],[-1.3,36.8,2],[5.3,-4,2],[14.7,17.4,1.5],[9.1,7.4,2],[4.4,18.6,1.5],[-4.3,15.3,1.5],[-11.7,43.3,1.5],[-18.9,47.5,1.5],[28.6,77.2,4],[19.1,72.9,3.5],[12.9,77.6,3],[23.7,90.4,3],[24.9,67,2.5],[31.6,74.3,2.5],[33.7,73.1,2],[17.4,78.5,2.5],[22.6,88.4,2.5],[13.1,80.3,2.5],[23,72.6,2],[22.3,70.8,2],[26.9,75.8,2],[21.2,81.4,2],[27.7,85.3,2],[41.3,69.2,2],[43.3,76.9,2],[51.2,71.5,1.5],[53.9,27.6,2],[54.7,55.9,2],[56.8,60.6,2],[55,73.4,2],[56,92.9,2],[52.3,104.3,2],[53.7,87.1,2],[62,129.7,1.5],[43.1,131.9,2],[61.8,34.4,2],[35.7,139.7,5],[37.5,127,4],[39.9,116.4,4.5],[31.2,121.5,4.5],[23.1,113.3,4],[22.3,114.2,3.5],[30.6,104.1,3.5],[32.1,118.8,3.5],[30.3,120.2,3],[36.7,117,2.5],[34.3,108.9,2.5],[26,119.3,2.5],[41.8,123.4,2.5],[45.8,126.5,2.5],[34.6,135.5,3.5],[33.6,130.4,3],[1.3,103.8,3.5],[13.7,100.5,2.5],[10.8,106.7,2.5],[14.6,121,2.5],[3.1,101.7,2.5],[6.2,106.8,3],[21,105.8,2],[-6.2,106.8,2.5],[-33.9,151.2,2.5],[-37.8,144.9,2],[-27.5,153,2],[-31.9,115.9,2],[-43.5,172.6,1.5]];for(const[n,s,c]of i){const[r,d]=nt(n,s,1024,512),h=c*2.2,l=o.createRadialGradient(r,d,0,r,d,h);l.addColorStop(0,"rgba(255,210,120,0.22)"),l.addColorStop(.5,"rgba(255,170,60,0.08)"),l.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=l,o.beginPath(),o.arc(r,d,h,0,Math.PI*2),o.fill()}o.globalCompositeOperation="lighter";for(const[n,s,c]of i){const[r,d]=nt(n,s,1024,512),h=Math.max(1,c*.9),l=o.createRadialGradient(r,d,0,r,d,h);l.addColorStop(0,`rgba(255,245,200,${Math.min(.9,.5+c*.1)})`),l.addColorStop(.6,"rgba(255,200,100,0.15)"),l.addColorStop(1,"rgba(0,0,0,0)"),o.fillStyle=l,o.beginPath(),o.arc(r,d,h,0,Math.PI*2),o.fill()}return o.globalCompositeOperation="source-over",a}function Qo(t){return new Promise((e,a)=>{new Ma().load(t,e,void 0,a)})}async function Xn(t){const e=H.get(t);if(!e||e.satelliteGroup)return;let a,o,i=1;try{[a,o]=await Promise.all([Qo("/textures/earth_day.jpg"),Qo("/textures/earth_night.jpg")]),a.colorSpace=Io,o.colorSpace=Io}catch(u){console.warn("[s9-threatmap] satellite textures not found, using procedural fallback",u);let f=yn();if(!f)try{const g=await fetch("/data/countries-110m.json");g.ok&&(f=await g.json(),ka(f))}catch{}a=new Po(qn(f)),o=new Po(Yn()),i=0}const n=new oe({uniforms:{dayMap:{value:a},nightMap:{value:o},sunDir:{value:new k(Math.cos(e.sunAngle),.22,Math.sin(e.sunAngle)).normalize()},realTex:{value:i},time:{value:0}},vertexShader:`
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
    `}),s=new ke(Fe,128,64),c=new ie(s,n);c.renderOrder=0;const r=new ke(Fe*1.055,64,32),d=new oe({uniforms:{glowCol:{value:new F(51455)},sunDir:{value:n.uniforms.sunDir.value},time:{value:0}},vertexShader:`
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
    `,side:eo,blending:j,transparent:!0,depthWrite:!1}),h=new ie(r,d);h.renderOrder=1;const l=new co;l.add(c),l.add(h),l.visible=!1,e.scene.add(l),Object.assign(e,{satelliteGroup:l,satGeo:s,satMat:n,atmGeo:r,atmMat:d,dayTex:a,nightTex:o})}async function Kn(t,e){const a=H.get(t);a&&(e?(a.globeBack&&(a.globeBack.visible=!1),a.occluder&&(a.occluder.visible=!1),a.frontOccluder&&(a.frontOccluder.visible=!1),a.globeFront&&(a.globeFront.visible=!1),a.globeSurface&&(a.globeSurface.visible=!1),a.globeGlow&&(a.globeGlow.visible=!1),a.rimMesh&&(a.rimMesh.visible=!1),a.geoGroup&&(a.geoGroup.visible=!1),a.bloomPass&&(a._bloomPrev={strength:a.bloomPass.strength,threshold:a.bloomPass.threshold,radius:a.bloomPass.radius},a.bloomPass.strength=.32,a.bloomPass.threshold=.85,a.bloomPass.radius=.35),a.satelliteMode=!0,await Xn(t),a.satelliteGroup&&(a.satelliteGroup.visible=!0)):(a.satelliteGroup&&(a.satelliteGroup.visible=!1),a.globeBack&&(a.globeBack.visible=!0),a.occluder&&(a.occluder.visible=!0),a.frontOccluder&&(a.frontOccluder.visible=!0),a.globeFront&&(a.globeFront.visible=!0),a.globeSurface&&(a.globeSurface.visible=!0),a.globeGlow&&(a.globeGlow.visible=!0),a.rimMesh&&(a.rimMesh.visible=!0),a.geoGroup&&(a.geoGroup.visible=!0),a.bloomPass&&a._bloomPrev&&(a.bloomPass.strength=a._bloomPrev.strength,a.bloomPass.threshold=a._bloomPrev.threshold,a.bloomPass.radius=a._bloomPrev.radius),a.satelliteMode=!1))}function Jo(t){const e=H.get(t);if(!e)return;const a=ze(!0);e.colors=a;const o=a.neonCyan||"#00d48ddf";if(e.globeBack&&e.globeBack.material.color.set(o),e.globeFront&&e.globeFront.material.color.set(o),e.geoLineMats){const i=a.neonCyan||"#008410D0";for(const n of e.geoLineMats)n.color.set(i)}for(const i of e.nodeMap.values()){const n=Ge(i.level,a);i.mesh.material.color.set(n),i.mesh.material.emissive.set(n)}}const Zn=new WeakMap;function Qn(t){const e=new AbortController;Zn.set(t,e),t.classList.add("s9-panel--booting"),t.addEventListener("animationend",a=>{a.animationName==="crt-flicker"&&(t.classList.remove("s9-panel--booting"),t.dispatchEvent(new CustomEvent("s9:panel-mount",{bubbles:!0,detail:{id:t.dataset.s9Id??null}})))},{signal:e.signal,once:!0})}const Yt=["complete","active","failed","pending"];function Jn(t,e){if(!Yt.includes(e)){console.warn(`[s9-sequence] Unknown state: "${e}". Expected one of: ${Yt.join(", ")}.`);return}Yt.forEach(a=>t.classList.remove(`s9-sequence__entry--${a}`)),e==="failed"?(t.classList.add("s9-sequence__entry--fail-flash"),t.addEventListener("animationend",()=>{t.classList.remove("s9-sequence__entry--fail-flash"),t.classList.add("s9-sequence__entry--failed"),ea(t,e)},{once:!0})):(t.classList.add(`s9-sequence__entry--${e}`),ea(t,e))}function ea(t,e){t.dispatchEvent(new CustomEvent("s9:sequence-step-change",{bubbles:!0,detail:{state:e}}))}const er={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new U(1/1024,1/512)}},vertexShader:`

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
`,tr={uniforms:{tDiffuse:{value:null},tPrev:{value:null},decay:{value:.88}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},or={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.42},scanlineOpacity:{value:.045},aberrationAmt:{value:.0025}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},ar={uniforms:{tDiffuse:{value:null},uTime:{value:0},uHeatAmt:{value:.004},uHeatFreq:{value:60},uHeatSpeed:{value:3.5}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},ir={uniforms:{tDiffuse:{value:null},uTime:{value:0},uStreakAmt:{value:.055},uAspect:{value:1.78}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},nr={uniforms:{tDiffuse:{value:null},uBlurStrength:{value:.006}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},rr=`
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
`,sr=`
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
`,lr={uniforms:{tDiffuse:{value:null},uLightPos:{value:null},uDensity:{value:.93},uDecay:{value:.96},uWeight:{value:.35},uExposure:{value:.45},uClampMax:{value:1},uEnabled:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},cr=[..."アウエオカキケコサシスセソタツテナニヌネ",..."ハヒホマミムメモヤヨラリワー",..."012345789z",...':."*+<>|¦╌▪꞊'],dr=8,ur=8,ta=600,Lt=120,hr=.12,fr=.08,mr=16,oa=3.5,pr=8;function gr(t){const e=new Ma().load(t);return e.flipY=!1,e.minFilter=Pi,e.magFilter=Oi,e.colorSpace=ki,e.generateMipmaps=!0,{tex:e,count:cr.length}}function vr(){const t=new ya,e=new lt(1,1);t.index=e.index.clone(),t.setAttribute("position",e.getAttribute("position").clone()),t.setAttribute("uv",e.getAttribute("uv").clone()),e.dispose();const a=ta*Lt,o=new Float32Array(a),i=new Float32Array(a),n=new Float32Array(a*4),s=new Float32Array(a*4);for(let c=0;c<ta;c++){const r=Math.random()*Math.PI*2,d=1-2*Math.random(),h=Math.sqrt(1-d*d),l=Math.pow(Math.random(),.12),u=oa+l*(pr-oa),f=h*Math.cos(r)*u,g=h*Math.sin(r)*u,b=d*u+(Math.random()-.5)*2,w=.4+Math.random()*1.87,x=Math.random(),M=.5+Math.random()*1,C=.18+Math.random()*.72,E=.015+Math.random()*.035;for(let S=0;S<Lt;S++){const v=c*Lt+S;o[v]=c,i[v]=S;const y=v*4;n[y]=f,n[y+1]=g,n[y+2]=w,n[y+3]=x,s[y]=b,s[y+1]=M,s[y+2]=C,s[y+3]=E}}return t.setAttribute("aColIdx",new Me(o,1)),t.setAttribute("aRowIdx",new Me(i,1)),t.setAttribute("aColA",new Me(n,4)),t.setAttribute("aColB",new Me(s,4)),t.instanceCount=a,t}function yr(t,e,a,o){const i=o.clientWidth||1,n=o.clientHeight||1,s=new yo(t);s.addPass(new bo(e,a));const c=new Re(new U(i,n),1.15,.45,.2);s.addPass(c);const r=new be(ar);r.enabled=!0,s.addPass(r);const d=t.getDrawingBufferSize(new U);let h=new Ea(d.x,d.y);const l=new be(tr);l.uniforms.tPrev.value=h;const u=l.render.bind(l);l.render=function(M,C,E,S,v){u(M,C,E,S,v),M.copyFramebufferToTexture(this.uniforms.tPrev.value)},s.addPass(l);const f=new be(nr);f.enabled=!0,f.uniforms.uBlurStrength.value=.002,s.addPass(f);const g=new be(ir);g.enabled=!0,g.uniforms.uAspect.value=i/n,s.addPass(g);const m=new be(or);s.addPass(m);const b=new be(lr);b.uniforms.uLightPos.value=new U(.5,.75),b.enabled=!0,s.addPass(b);const w=new be(er),x=t.getPixelRatio();return w.uniforms.resolution.value.set(1/(i*x),1/(n*x)),s.addPass(w),{composer:s,bloomPass:c,heatPass:r,phosphorPass:l,phosphorTex:h,softenPass:f,streakPass:g,holoPass:m,godRaysPass:b,fxaaPass:w}}const Bt=new Map;function br(t,e={}){Bt.has(t)&&aa(t);const a=t.querySelector("canvas[data-matrix-rain]");a&&a.remove();const{color:o="#00ff70",opacity:i=.82,syncCamera:n=null}=e,s=new F(o),c=gr("/data/matrixcode_msdf.png"),r=new uo({antialias:!1,alpha:!0});r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.setSize(t.clientWidth||1,t.clientHeight||1);const d=r.domElement;d.dataset.matrixRain="1",d.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;",t.appendChild(d);const h=new ho,l=new _a(45,(t.clientWidth||1)/(t.clientHeight||1),.1,60);l.position.set(0,0,3),l.lookAt(0,0,0);const u=vr(),f={uGlyphTex:{value:c.tex},uGlyphCount:{value:c.count},uAtlasCols:{value:dr},uAtlasGrid:{value:ur},uTime:{value:0},uCellW:{value:hr},uCellH:{value:fr},uWorldH:{value:mr},uNRows:{value:Lt},uColor:{value:new k(s.r,s.g,s.b)},uGlobalAlpha:{value:i},uDepth:{value:.04},uPomSteps:{value:6},uNormalStrength:{value:6},uLightDir:{value:new k(-.4,.8,.5).normalize()},uGlobeInteract:{value:1},uGlyphChroma:{value:1}},g=new oe({uniforms:f,vertexShader:rr,fragmentShader:sr,transparent:!0,depthWrite:!1,blending:Ii,blendEquation:Ri,blendSrc:ut,blendDst:ut,blendEquationAlpha:Di,blendSrcAlpha:ut,blendDstAlpha:ut,side:xa,extensions:{derivatives:!0}}),m=new ie(u,g);m.frustumCulled=!1,m.renderOrder=1,h.add(m);let{composer:b,bloomPass:w,heatPass:x,phosphorPass:M,phosphorTex:C,softenPass:E,streakPass:S,holoPass:v,godRaysPass:y,fxaaPass:_}=yr(r,h,l,t);const p={renderer:r,composer:b,bloomPass:w,heatPass:x,softenPass:E,phosphorPass:M,phosphorTex:C,holoPass:v,streakPass:S,godRaysPass:y,fxaaPass:_,material:g,geom:u,atlas:c,ro:null,animId:0,syncCamera:n,burstBloomEnabled:!0};Bt.set(t,p);let A=0,R=0,N=-1;function re(B){p.animId=requestAnimationFrame(re);const O=B*.001,se=O-A;if(A=O,f.uTime.value=O,v.uniforms.time.value=O,x.uniforms.uTime.value=O,S.uniforms.uTime.value=O,p.burstBloomEnabled){const le=Math.floor(O/4);if(le!==N&&(N=le,R=.3),R>0){R=Math.max(0,R-se);const ce=1-R/.3;w.threshold=ce<.2?kt.lerp(.2,.1,ce/.2):kt.lerp(.1,.2,(ce-.2)/.8)}else w.threshold=.2}else w.threshold=.2;if(p.syncCamera&&(l.position.copy(p.syncCamera.position),l.quaternion.copy(p.syncCamera.quaternion),l.fov=p.syncCamera.fov,l.near=p.syncCamera.near,l.far=p.syncCamera.far,l.updateProjectionMatrix()),l.position.lengthSq()>.001){const le=Math.atan2(l.position.x,l.position.z)+Math.PI/3;f.uLightDir.value.set(Math.sin(le)*.6,.8,Math.cos(le)*.6).normalize()}p.composer.render()}p.animId=requestAnimationFrame(re);let Q=!1;return p.ro=new ResizeObserver(()=>{Q||(Q=!0,requestAnimationFrame(()=>{Q=!1;const B=t.clientWidth||1,O=t.clientHeight||1;r.setSize(B,O),p.composer.setSize(B,O),p.bloomPass.resolution.set(B,O);const se=r.getPixelRatio();p.fxaaPass.uniforms.resolution.value.set(1/(B*se),1/(O*se)),p.streakPass.uniforms.uAspect.value=B/O,l.aspect=B/O,l.updateProjectionMatrix();const le=r.getDrawingBufferSize(new U);p.phosphorTex.dispose();const ce=new Ea(le.x,le.y);p.phosphorTex=ce,p.phosphorPass.uniforms.tPrev.value=ce}))}),p.ro.observe(t),{destroy(){aa(t)},setColor(B){const O=new F(B);f.uColor.value.set(O.r,O.g,O.b)},setOpacity(B){f.uGlobalAlpha.value=B},setDepth(B){f.uDepth.value=B},setNormalStrength(B){f.uNormalStrength.value=B},setSoften(B,O){E.enabled=B,O!==void 0&&(E.uniforms.uBlurStrength.value=O)},setHeat(B,O){x.enabled=B,O!==void 0&&(x.uniforms.uHeatAmt.value=O)},setStreaks(B,O){S.enabled=B,O!==void 0&&(S.uniforms.uStreakAmt.value=O)},setBurstBloom(B){p.burstBloomEnabled=B},setGlobeInteract(B){f.uGlobeInteract.value=B?1:0},setGlyphChroma(B,O){f.uGlyphChroma.value=B?O??1:0},setGodRays(B,O,se,le,ce,Qe,We){y.uniforms.uEnabled.value=B?1:0,O!==void 0&&(y.uniforms.uLightPos.value.x=O),se!==void 0&&(y.uniforms.uLightPos.value.y=se),le!==void 0&&(y.uniforms.uDensity.value=le),ce!==void 0&&(y.uniforms.uDecay.value=ce),Qe!==void 0&&(y.uniforms.uWeight.value=Qe),We!==void 0&&(y.uniforms.uExposure.value=We)}}}function aa(t){const e=Bt.get(t);e&&(cancelAnimationFrame(e.animId),e.ro.disconnect(),e.holoPass&&e.holoPass.material.dispose(),e.phosphorPass&&e.phosphorPass.material.dispose(),e.phosphorTex&&e.phosphorTex.dispose(),e.composer.dispose(),e.material.dispose(),e.geom.dispose(),e.atlas.tex.dispose(),e.renderer.dispose(),e.renderer.domElement.remove(),Bt.delete(t))}const $a=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,wr=`
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
}`,Sr=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,_r=`
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
}`,xr=`
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
}`,Mr=`
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
}`,Er=`
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
}`,Ar=`
varying vec2 vUv;
uniform vec3  uColor;
uniform float uIntensity;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float glow = exp(-r * r * 8.0) * uIntensity;
  if (glow < 0.005) discard;
  gl_FragColor = vec4(uColor * glow, glow * 0.6);
}`,Cr={uniforms:{tDiffuse:{value:null},time:{value:0},vignetteStrength:{value:.38},scanlineOpacity:{value:.07},aberrationAmt:{value:.001}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
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
  `},W=Math.PI*2,we=32,Dt=new WeakMap;let Tr=0;function Lr(){return`T-${String(++Tr).padStart(2,"0")}`}function at(t){return getComputedStyle(document.documentElement).getPropertyValue(t).trim()}function Te(t){const e=new F().setStyle(t||"#000000");return[e.r,e.g,e.b]}function Nt(t,e,a){return t+(e-t)*Math.max(0,Math.min(1,a))}function Dr(t,e){const a=((t-e)%W+W)%W;return a>Math.PI?a-W:a}function ja(){return{neonCyan:at("--neon-cyan")||"#00f0ff",neonGreen:at("--neon-green")||"#00ff9d",neonAlert:at("--neon-alert")||"#ff00cc",neonWarn:at("--neon-warn")||"#ffb300",voidColor:at("--void")||"#05080f"}}function ia(t,e){const a=t.ringHzBase;return e==="friendly"?a*.6:e==="hostile"?a*1.5:a}function Rr(t){const e=Nt(.1,.85,t),a=Nt(.3,.05,t),o=Math.random();return o<e?"hostile":o<e+a?"friendly":"neutral"}function Ir(t){return t==="friendly"?0:t==="neutral"?1:t==="hostile"?2:3}let it=null,oo=!1;function Pr(t=.08){if(!oo)try{it||(it=new Audio("/sonar-ping.mp3")),it.volume=Math.min(1,Math.max(0,t)),it.currentTime=0,it.play().catch(()=>{})}catch{}}function Or(){oo=!oo}function kr(t){const a=new Float32Array(192);for(let i=0;i<64;i++){const n=i/64*W;a[i*3]=Math.sin(n)*t,a[i*3+1]=Math.cos(n)*t,a[i*3+2]=0}const o=new De;return o.setAttribute("position",new po(a,3)),o}function Fr(t){const a=new Float32Array(192);for(let i=0;i<32;i++){const n=i/32*W,s=i%8===0?t*.92:t*.96,c=i*6;a[c]=Math.sin(n)*s,a[c+1]=Math.cos(n)*s,a[c+2]=0,a[c+3]=Math.sin(n)*t,a[c+4]=Math.cos(n)*t,a[c+5]=0}const o=new De;return o.setAttribute("position",new po(a,3)),o}function Br(t){const{scene:e,R:a,theme:o}=t;t.backgroundMesh&&(t.backgroundMesh.geometry.dispose(),t.backgroundMesh.material.dispose(),e.remove(t.backgroundMesh));const i=new F(o.voidColor),n=new lt(a*2,a*2),s=new oe({vertexShader:$a,fragmentShader:wr,uniforms:{uVoidColor:{value:new k(i.r,i.g,i.b)},uTime:{value:0}},transparent:!0,depthWrite:!0,blending:At}),c=new ie(n,s);c.renderOrder=0,e.add(c),t.backgroundMesh=c}function Nr(t){const{scene:e,R:a,theme:o}=t;t.centerGlowMesh&&(t.centerGlowMesh.geometry.dispose(),t.centerGlowMesh.material.dispose(),e.remove(t.centerGlowMesh));const i=new F(o.neonCyan),n=a*.5,s=new lt(n,n),c=new oe({vertexShader:$a,fragmentShader:Ar,uniforms:{uColor:{value:new k(i.r,i.g,i.b)},uIntensity:{value:0}},transparent:!0,depthWrite:!1,blending:j}),r=new ie(s,c);r.renderOrder=6,e.add(r),t.centerGlowMesh=r}function Ur(t){const{scene:e,R:a,theme:o}=t;t.ringMeshes&&(t.ringMeshes.forEach(d=>{d.geometry.dispose(),e.remove(d)}),t.matRingInner&&t.matRingInner.dispose(),t.matRingOuter&&t.matRingOuter.dispose()),t.ticksMesh&&(t.ticksMesh.geometry.dispose(),t.matRingTicks&&t.matRingTicks.dispose(),e.remove(t.ticksMesh));const i=new Ne({color:new F(o.neonCyan),opacity:.18,transparent:!0,depthWrite:!1,blending:j}),n=new Ne({color:new F(o.neonCyan),opacity:.28,transparent:!0,depthWrite:!1,blending:j}),s=new Ne({color:new F(o.neonCyan),opacity:.22,transparent:!0,depthWrite:!1,blending:j}),c=[.2,.4,.6,.8,1];t.ringMeshes=c.map((d,h)=>{const l=new fo(kr(d*a),h<4?i:n);return l.renderOrder=1,e.add(l),l});const r=new Fi(Fr(a),s);r.renderOrder=1,e.add(r),t.ticksMesh=r,t.matRingInner=i,t.matRingOuter=n,t.matRingTicks=s}function Gr(t){const{scene:e,R:a,theme:o}=t;t.sweepTrailMesh&&(t.sweepTrailMesh.geometry.dispose(),t.sweepTrailMesh.material.dispose(),e.remove(t.sweepTrailMesh)),t.sweepArmLine&&(t.sweepArmLine.geometry.dispose(),t.sweepArmLine.material.dispose(),e.remove(t.sweepArmLine));const i=new F(o.neonCyan),n=new k(i.r,i.g,i.b),s=new lt(a*2,a*2),c=new oe({vertexShader:Sr,fragmentShader:_r,uniforms:{uAngle:{value:t.sweepAngle},uArcWidth:{value:Math.PI*.6},uColor:{value:n.clone()},uStaticAmt:{value:1}},transparent:!0,depthWrite:!1,blending:j}),r=new ie(s,c);r.renderOrder=2,e.add(r),t.sweepTrailMesh=r;const d=new Float32Array([0,0,0,Math.sin(t.sweepAngle)*a,Math.cos(t.sweepAngle)*a,0]),h=new De;h.setAttribute("position",new po(d,3));const l=new Ne({color:new F(o.neonCyan),opacity:.9,transparent:!0,depthWrite:!1,blending:j}),u=new mo(h,l);u.renderOrder=3,e.add(u),t.sweepArmLine=u}function Hr(t){const{scene:e,theme:a}=t;t.contactDotsMesh&&(t.contactDotsMesh.geometry.dispose(),t.contactDotsMesh.material.dispose(),e.remove(t.contactDotsMesh)),t.contactRingsMesh&&(t.contactRingsMesh.geometry.dispose(),t.contactRingsMesh.material.dispose(),e.remove(t.contactRingsMesh));const o=Te(a.neonGreen),i=Te(a.neonWarn),n=Te(a.neonAlert),s=Te(a.neonCyan);function c(h,l,u){const f=new lt(1,1),g=new Me(new Float32Array(we).fill(0),1),m=new Me(new Float32Array(we).fill(1),1),b=new Me(new Float32Array(we).map(()=>Math.random()),1),w=new Me(new Float32Array(we).fill(0),1);g.setUsage(et),m.setUsage(et),b.setUsage(et),w.setUsage(et),f.setAttribute("a_type",g),f.setAttribute("a_age",m),f.setAttribute("a_phase",b),f.setAttribute("a_sweepFade",w);const x=new oe({vertexShader:xr,fragmentShader:h,uniforms:l,transparent:!0,depthWrite:!1,blending:j}),M=new Bi(f,x,we);M.renderOrder=u,M.instanceMatrix.setUsage(et);const C=new Aa;C.scale.setScalar(0),C.updateMatrix();for(let E=0;E<we;E++)M.setMatrixAt(E,C.matrix);return M.instanceMatrix.needsUpdate=!0,e.add(M),M}const r={uC0:{value:new k(...o)},uC1:{value:new k(...i)},uC2:{value:new k(...n)},uC3:{value:new k(...s)}},d={uC0:{value:new k(...o)},uC1:{value:new k(...i)},uC2:{value:new k(...n)}};t.contactDotsMesh=c(Mr,r,5),t.contactRingsMesh=c(Er,d,4)}function zr(t){const{element:e,overlay:a,R:o}=t,i=e.clientWidth/2,n=e.clientHeight/2;t.staticLabelEls.forEach(h=>h.remove()),t.staticLabelEls=[];const s=[2,4,6,8];[.2,.4,.6,.8].forEach((h,l)=>{const u=document.createElement("span");u.className="s9-radar__ring-label",u.textContent=`${s[l]}km`,u.style.left=`${i+h*o+4}px`,u.style.top=`${n}px`,u.style.transform="translateY(-50%)",a.appendChild(u),t.staticLabelEls.push(u)});const r=[["N",0],["NE",W*.125],["E",W*.25],["SE",W*.375],["S",W*.5],["SW",W*.625],["W",W*.75],["NW",W*.875]],d=o*1.05;r.forEach(([h,l])=>{const u=document.createElement("span");u.className="s9-radar__cardinal-label",u.textContent=h,u.style.left=`${i+Math.sin(l)*d}px`,u.style.top=`${n-Math.cos(l)*d}px`,u.style.transform="translate(-50%, -50%)",a.appendChild(u),t.staticLabelEls.push(u)})}function Wr(t){Br(t),Nr(t),Ur(t),Gr(t),zr(t),t.contactDotsMesh?$r(t):Hr(t)}function $r(t){const{contacts:e,dummy:a,contactDotsMesh:o,contactRingsMesh:i,R:n}=t;!o||!i||(e.forEach((s,c)=>{if(!s)a.scale.setScalar(0),a.position.set(0,0,0),a.updateMatrix(),o.setMatrixAt(c,a.matrix),i.setMatrixAt(c,a.matrix);else{const r=s.age<.08?Nt(0,8,s.age/.08):8;a.position.set(Math.sin(s.angle)*s.range*n,Math.cos(s.angle)*s.range*n,0),a.scale.setScalar(r),a.updateMatrix(),o.setMatrixAt(c,a.matrix),a.scale.setScalar(r>0?n*1.5:0),a.updateMatrix(),i.setMatrixAt(c,a.matrix)}}),o.instanceMatrix.needsUpdate=!0,i.instanceMatrix.needsUpdate=!0)}function ao(t,e){const a=t.contacts[e];a&&(a.labelEl&&(a.labelEl.remove(),a.labelEl=null),t.contactDotsMesh&&t.contactRingsMesh&&(t.dummy.scale.setScalar(0),t.dummy.position.set(0,0,0),t.dummy.updateMatrix(),t.contactDotsMesh.setMatrixAt(e,t.dummy.matrix),t.contactRingsMesh.setMatrixAt(e,t.dummy.matrix),t.contactDotsMesh.instanceMatrix.needsUpdate=!0,t.contactRingsMesh.instanceMatrix.needsUpdate=!0),t.contacts[e]=null)}function xo(t,e,a,o,i){var b;const n=t.opts.maxContacts;if(t.contacts.filter(Boolean).length>=n){let w=-1,x=-1;for(let M=0;M<we;M++)((b=t.contacts[M])==null?void 0:b.type)==="ghost"&&t.contacts[M].age>x&&(w=M,x=t.contacts[M].age);if(w>=0)ao(t,w);else return console.warn("[pulse-radar] contact pool full"),null}let c=-1;for(let w=0;w<we;w++)if(!t.contacts[w]){c=w;break}if(c<0)return null;const r=o==="ghost",d=(e%W+W)%W,h=Math.max(0,Math.min(1,a)),l=Math.sin(d)*h,u=Math.cos(d)*h,f=r?0:.01+Math.random()*.025,g=Math.random()*W,m={id:i||Lr(),angle:d,range:h,wx:l,wy:u,wvx:r?0:Math.sin(g)*f,wvy:r?0:Math.cos(g)*f,type:o,age:r?.85:0,maxAge:r?3e3:8e3+Math.random()*1e4,bornAt:performance.now(),phase:r?Math.random()*.3:1,lastSweep:-1/0,ghostAngle:null,ghostRange:null,ghostSpawned:!1,instIdx:c,labelEl:null,sweepAlpha:r?.15:1,fadeTimeMs:4200*(.88+Math.random()*.24),revealed:r,revealTime:r?performance.now():null};if(!r){const w=document.createElement("span");w.className=`s9-radar__label s9-radar__label--${o}`,w.textContent=o==="hostile"?`${m.id} ⚠HC`:m.id,t.labelsDiv.appendChild(w),m.labelEl=w}return t.contacts[c]=m,m}function Rt(t){if(t.destroyed||t.reducedMotion)return;const e=Math.max(.05,t.opts.contactDensity),a=Nt(3e3,600,t.threatLevel)/e,o=(Math.random()-.5)*a*.4,i=Math.max(200,a+o);t.spawnTimer=setTimeout(()=>{!t.destroyed&&!t.reducedMotion&&(jr(t),Rt(t))},i)}function jr(t){const e=t.contacts.filter(n=>n&&n.type!=="ghost"),a=e.length>0&&Math.random()<.3,o=t.sweepAngle;let i;if(a){const n=e[Math.floor(Math.random()*e.length)];i=Math.max(.15,Math.min(.97,n.range+(Math.random()-.5)*.3))}else i=.15+Math.random()*.82;xo(t,o,i,Rr(t.threatLevel))}function Vr(t,e){if(t.reducedMotion)return;const a=t.sweepAngle;t.sweepAngle=(t.sweepAngle+t.sweepSpeed*e/1e3)%W,t.sweepAngle<a&&(Pr(.06),t.centerGlowIntensity=1),t.centerGlowIntensity>0&&(t.centerGlowIntensity*=Math.pow(.001,e/600),t.centerGlowIntensity<.005&&(t.centerGlowIntensity=0),t.centerGlowMesh&&(t.centerGlowMesh.material.uniforms.uIntensity.value=t.centerGlowIntensity));const o=performance.now();if(t.staticNextAt===null&&(t.staticNextAt=o+7e3+Math.random()*5e3),o>=t.staticNextAt&&!t.staticActive&&(t.staticActive=!0,t.staticEndAt=o+60+Math.random()*40,t.staticNextAt=t.staticEndAt+6e3+Math.random()*4e3),t.staticActive&&(t.sweepTrailMesh.material.uniforms.uStaticAmt.value=.5+Math.random()*.5,o>=t.staticEndAt&&(t.staticActive=!1,t.sweepTrailMesh.material.uniforms.uStaticAmt.value=1)),t.sweepTrailMesh&&(t.sweepTrailMesh.material.uniforms.uAngle.value=t.sweepAngle),t.sweepArmLine){const{R:i}=t,n=t.sweepArmLine.geometry.attributes.position;n.setXYZ(0,0,0,0),n.setXYZ(1,Math.sin(t.sweepAngle)*i,Math.cos(t.sweepAngle)*i,0),n.needsUpdate=!0}}function qr(t,e){const{contacts:a,sweepAngle:o}=t,i=t.now;a.forEach((n,s)=>{if(n){if(n.type!=="ghost"&&(n.wx+=n.wvx*e/1e3,n.wy+=n.wvy*e/1e3,Math.hypot(n.wx,n.wy)>1.02)){ao(t,s);return}if(n.age+=e/n.maxAge,n.type!=="ghost"&&!t.reducedMotion){const c=(Math.atan2(n.wx,n.wy)%W+W)%W;Math.abs(Dr(o,c))<.12&&i-n.lastSweep>800&&(n.angle=c,n.range=Math.hypot(n.wx,n.wy),n.phase=0,n.lastSweep=i,n.sweepAlpha=1,n.revealed||(n.revealed=!0,n.revealTime=i))}if(n.type!=="ghost"){if(n.phase<1){const c=n.age>.65&&n.age<.85;n.phase=Math.min(1,n.phase+ia(t,n.type)*(c?.5:1)*e/1e3)}}else n.phase+=ia(t,"neutral")*e/1e3;if(n.type!=="ghost"&&n.revealed){const c=.05+.1*n.range,r=i-n.lastSweep,d=Math.min(1,r/n.fadeTimeMs);n.sweepAlpha=c+(1-c)*Math.pow(1-d,1.025)}n.type!=="ghost"&&!n.ghostSpawned&&n.age>=.65&&n.revealed&&(n.ghostAngle=n.angle,n.ghostRange=n.range,n.ghostSpawned=!0,xo(t,n.ghostAngle,n.ghostRange,"ghost")),n.age>=1&&ao(t,s)}})}function Yr(t){const{contacts:e,dummy:a,contactDotsMesh:o,contactRingsMesh:i,R:n}=t;if(!o||!i)return;let s=!1;e.forEach((c,r)=>{if(!c)return;s=!0;let d;c.revealed?d=Math.min(1,(t.now-c.revealTime)/300)*8:d=0;const h=Math.sin(c.angle)*c.range*n,l=Math.cos(c.angle)*c.range*n;a.position.set(h,l,0),a.scale.setScalar(d),a.updateMatrix(),o.setMatrixAt(r,a.matrix),a.scale.setScalar(d>0?n*1.5:0),a.updateMatrix(),i.setMatrixAt(r,a.matrix);const u=Ir(c.type);o.geometry.attributes.a_type.setX(r,u),o.geometry.attributes.a_age.setX(r,c.age),o.geometry.attributes.a_phase.setX(r,c.phase),o.geometry.attributes.a_sweepFade.setX(r,c.sweepAlpha),i.geometry.attributes.a_type.setX(r,u),i.geometry.attributes.a_age.setX(r,c.age),i.geometry.attributes.a_phase.setX(r,c.phase),i.geometry.attributes.a_sweepFade.setX(r,c.sweepAlpha)}),s&&(o.instanceMatrix.needsUpdate=!0,i.instanceMatrix.needsUpdate=!0,o.geometry.attributes.a_type.needsUpdate=!0,o.geometry.attributes.a_age.needsUpdate=!0,o.geometry.attributes.a_phase.needsUpdate=!0,o.geometry.attributes.a_sweepFade.needsUpdate=!0,i.geometry.attributes.a_type.needsUpdate=!0,i.geometry.attributes.a_age.needsUpdate=!0,i.geometry.attributes.a_phase.needsUpdate=!0,i.geometry.attributes.a_sweepFade.needsUpdate=!0)}function Xr(t){const{contacts:e,element:a,R:o}=t,i=a.clientWidth/2,n=a.clientHeight/2;e.forEach(s=>{if(!(s!=null&&s.labelEl))return;if(!s.revealed){s.labelEl.style.opacity="0";return}const c=i+Math.sin(s.angle)*s.range*o,r=n-Math.cos(s.angle)*s.range*o;s.labelEl.style.left=`${c+7}px`,s.labelEl.style.top=`${r-6}px`,s.labelEl.style.opacity=String(s.sweepAlpha)})}function Kr(t){if(!t.footerEl)return;const e=t.contacts.filter(o=>o&&o.type!=="ghost").length,a=(W/t.sweepSpeed).toFixed(1);t.footerEl.textContent=`CONTACTS: ${e} | SWEEP: ${a}s`}function io(t,e){if(t.destroyed||!t.rafRunning){t.rafId=null;return}const a=Math.min(e-(t.lastTs??e),100);t.lastTs=e,t.now=e,t.R>0&&(t.backgroundMesh&&(t.backgroundMesh.material.uniforms.uTime.value=e/1e3),t.holoPass&&(t.holoPass.uniforms.time.value=e/1e3),Vr(t,a),qr(t,a),Yr(t),Xr(t),Kr(t),t.composer.render()),t.rafId=requestAnimationFrame(o=>io(t,o))}function Zr(t,e={}){if(Dt.has(t)){console.warn("[pulse-radar] already initialised");const E=Dt.get(t);return{setRadarThreatLevel:E.setRadarThreatLevel,injectContact:E.injectContact}}const a={sweepPeriod:2690,contactDensity:Math.max(0,Math.min(1,e.contactDensity??.5)),threatLevel:Math.max(0,Math.min(1,e.threatLevel??0)),primaryColor:e.primaryColor??null,maxContacts:Math.max(4,Math.min(we,e.maxContacts??16))},o=ja(),i=document.createElement("canvas");i.className="s9-radar__canvas";const n=document.createElement("div");n.className="s9-radar__overlay";const s=document.createElement("div");s.className="s9-radar__labels",n.appendChild(s),t.appendChild(i),t.appendChild(n),t.style.cursor="pointer",t.addEventListener("click",()=>{Or()});let c;try{c=new uo({canvas:i,antialias:!0,alpha:!1,premultipliedAlpha:!1})}catch(E){return console.error("[pulse-radar] WebGL context creation failed",E),i.remove(),n.remove(),t.dispatchEvent(new CustomEvent("pulse-radar:init-failed",{bubbles:!0,detail:{error:E}})),{setRadarThreatLevel:()=>{},injectContact:()=>""}}c.setClearColor(new F(o.voidColor),1),c.setPixelRatio(Math.min(devicePixelRatio,2));const r=new ho,d=new va(-1,1,1,-1,.1,100);d.position.z=10;const h=new yo(c);h.addPass(new bo(r,d));const l=new Re(new U(t.clientWidth||200,t.clientHeight||200),.8,.65,.25);h.addPass(l);const u=new be(Cr);h.addPass(u);const f={element:t,canvas:i,overlay:n,labelsDiv:s,renderer:c,scene:r,camera:d,opts:a,theme:o,R:0,sweepAngle:Math.random()*W,sweepSpeed:W/(a.sweepPeriod/1e3),ringPopDuration:a.sweepPeriod/1e3-.5,threatLevel:a.threatLevel,contacts:new Array(we).fill(null),dummy:new Aa,footerEl:document.getElementById("radar-contacts"),staticLabelEls:[],staticActive:!1,staticNextAt:null,staticEndAt:null,rafId:null,rafRunning:!1,destroyed:!1,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,centerGlowIntensity:0,centerGlowMesh:null,composer:h,bloomPass:l,holoPass:u,backgroundMesh:null,ringMeshes:null,ticksMesh:null,sweepTrailMesh:null,sweepArmLine:null,contactDotsMesh:null,contactRingsMesh:null,matRingInner:null,matRingOuter:null,matRingTicks:null,spawnTimer:null,lastTs:null,now:performance.now(),resizeObserver:null,intersectionObserver:null,_motionMq:null,_motionHandler:null,setRadarThreatLevel:null,injectContact:null};f.ringHzBase=1/f.ringPopDuration,Dt.set(t,f);const g=t.closest(".s9-panel");g&&(g.classList.add("s9-panel--booting"),g.addEventListener("animationend",()=>g.classList.remove("s9-panel--booting"),{once:!0}));const m=new ResizeObserver(E=>{for(const S of E){const{width:v,height:y}=S.contentRect;if(v===0||y===0)return;const _=Math.floor(Math.min(v,y)/2)-8;if(_<=0)return;f.R=_,d.left=-_,d.right=_,d.top=_,d.bottom=-_,d.updateProjectionMatrix(),c.setSize(v,y),f.composer.setSize(v,y),f.bloomPass&&f.bloomPass.resolution.set(v,y),Wr(f)}});m.observe(t),f.resizeObserver=m;const b=new IntersectionObserver(E=>{E.forEach(S=>{f.rafRunning=S.isIntersecting,f.rafRunning&&!f.rafId&&(f.rafId=requestAnimationFrame(v=>io(f,v)))})},{threshold:0});b.observe(t),f.intersectionObserver=b;const w=matchMedia("(prefers-reduced-motion: reduce)"),x=()=>{f.reducedMotion=w.matches,f.reducedMotion?(f.sweepAngle=Math.PI*.15,clearTimeout(f.spawnTimer)):Rt(f)};w.addEventListener("change",x),f._motionMq=w,f._motionHandler=x,f.rafRunning=!0,f.rafId=requestAnimationFrame(E=>io(f,E)),f.reducedMotion||Rt(f);function M(E){const S=Math.max(0,Math.min(1,E));f.threatLevel=S,clearTimeout(f.spawnTimer),Rt(f)}function C(E,S,v){const y=["friendly","neutral","hostile"].includes(v)?v:"neutral",_=xo(f,E,Math.max(0,Math.min(1,S)),y);return _?_.id:""}return f.setRadarThreatLevel=M,f.injectContact=C,{setRadarThreatLevel:M,injectContact:C}}function Qr(t){const e=Dt.get(t);if(!e)return;const a=ja();e.theme=a;const o=Te(a.neonGreen),i=Te(a.neonWarn),n=Te(a.neonAlert),s=Te(a.neonCyan),c=new F(a.neonCyan);if(e.backgroundMesh){const r=new F(a.voidColor);e.backgroundMesh.material.uniforms.uVoidColor.value.set(r.r,r.g,r.b),e.renderer.setClearColor(new F(a.voidColor),1)}if(e.matRingInner&&e.matRingInner.color.set(a.neonCyan),e.matRingOuter&&e.matRingOuter.color.set(a.neonCyan),e.matRingTicks&&e.matRingTicks.color.set(a.neonCyan),e.sweepTrailMesh&&e.sweepTrailMesh.material.uniforms.uColor.value.set(c.r,c.g,c.b),e.sweepArmLine&&e.sweepArmLine.material.color.set(a.neonCyan),e.contactDotsMesh){const r=e.contactDotsMesh.material.uniforms;r.uC0.value.set(...o),r.uC1.value.set(...i),r.uC2.value.set(...n),r.uC3.value.set(...s)}if(e.contactRingsMesh){const r=e.contactRingsMesh.material.uniforms;r.uC0.value.set(...o),r.uC1.value.set(...i),r.uC2.value.set(...n)}}const Jr=`
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
  }`;function na(t,e,a){const o=t.createShader(e);return t.shaderSource(o,a),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)||console.error("Telescreen shader error:",t.getShaderInfoLog(o)),o}function ts(t,e,a){const o=e.getContext("webgl");if(!o)return console.warn("Telescreen: WebGL not available"),{destroy(){}};const i=a.getContext("2d"),n={prog:null,buf:null,tex:null,aPos:-1,uLocs:{}};function s(){const v=o.createProgram();o.attachShader(v,na(o,o.VERTEX_SHADER,Jr)),o.attachShader(v,na(o,o.FRAGMENT_SHADER,es)),o.linkProgram(v),o.useProgram(v);const y=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,y),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),o.STATIC_DRAW);const _=o.getAttribLocation(v,"a_pos");o.enableVertexAttribArray(_),o.vertexAttribPointer(_,2,o.FLOAT,!1,0,0);const p={res:o.getUniformLocation(v,"iResolution"),time:o.getUniformLocation(v,"uTime"),imgOffset:o.getUniformLocation(v,"uImgOffset"),imgScale:o.getUniformLocation(v,"uImgScale"),diffuse:o.getUniformLocation(v,"tDiffuse"),glitchEnabled:o.getUniformLocation(v,"uGlitchEnabled"),glitchActive:o.getUniformLocation(v,"uGlitchActive"),glitchStrength:o.getUniformLocation(v,"uGlitchStrength"),glitchSpeed:o.getUniformLocation(v,"uGlitchSpeed"),glitchCols:o.getUniformLocation(v,"uGlitchCols"),glitchRgb:o.getUniformLocation(v,"uGlitchRgb"),hardPix:o.getUniformLocation(v,"uHardPix"),warpMult:o.getUniformLocation(v,"uWarpMult"),maskStr:o.getUniformLocation(v,"uMaskStr"),grainAmt:o.getUniformLocation(v,"uGrainAmt"),halationStr:o.getUniformLocation(v,"uHalationStr"),convergence:o.getUniformLocation(v,"uConvergence"),scratch:o.getUniformLocation(v,"tScratch"),scratchStr:o.getUniformLocation(v,"uScratchStr")},A=o.createTexture();o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,A),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.uniform1i(p.diffuse,0),o.uniform1i(p.scratch,1);const R=o.createTexture();o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,R),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,new Uint8Array([0,0,0,255])),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.activeTexture(o.TEXTURE0),Object.assign(n,{prog:v,buf:y,tex:A,scratchTex:R,aPos:_,uLocs:p})}s();function c(){!r.complete||!r.naturalWidth||!n.scratchTex||(o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,n.scratchTex),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,r),o.activeTexture(o.TEXTURE0))}const r=new Image;r.onload=c,r.src="/data/scratches.jpg";let d=!1,h=null,l=!1,u=0,f=0,g=0;const m={glitchEnabled:1,glitchActive:0,glitchStrength:.025,glitchSpeed:8,glitchCols:30,glitchRgb:.5,glitchMaxDelay:3.5,glitchMaxBurst:.7,hardPix:-1.2,warpMult:2,maskStr:1,grainAmt:.04,halationStr:3,convergence:.07,scratchStr:.2};function b(){o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,n.tex),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,t),d=!0}function w(v,y,_,p){const A=Math.max(v/_,y/p)*.8,R=_*A,N=p*A;return{ox:(v-R)/2/v,oy:(y-N)/2/y,sx:R/v,sy:N/y}}function x(){const v=e.clientWidth||576,y=e.clientHeight||432;e.width=v,e.height=y,a.width=v,a.height=y,l||o.viewport(0,0,v,y)}function M(){if(!t.naturalWidth)return;const v=a.width,y=a.height,_=t.naturalWidth,p=t.naturalHeight,A=Math.max(v/_,y/p)*.8,R=_*A,N=p*A;i.clearRect(0,0,v,y),i.drawImage(t,(v-R)/2,(y-N)/2,R,N)}e.addEventListener("webglcontextlost",v=>{v.preventDefault(),l=!0}),e.addEventListener("webglcontextrestored",()=>{l=!1,d=!1,s(),x(),b(),c()});function C(v){u=requestAnimationFrame(C),h||(h=v);const y=(v-h)/1e3;if(d&&!l){if(m.glitchEnabled)if(y>=g){if(m.glitchActive=0,y>=f){const B=.08+Math.random()*m.glitchMaxBurst;g=y+B,f=y+B+.3+Math.random()*m.glitchMaxDelay,m.glitchActive=1}}else m.glitchActive=1;else m.glitchActive=0;const _=e.width,p=e.height,A=t.naturalWidth,R=t.naturalHeight,N=p/1,re=_/p*N;o.uniform2f(n.uLocs.res,re,N),o.uniform1f(n.uLocs.time,y);const Q=w(_,p,A,R);o.uniform2f(n.uLocs.imgOffset,Q.ox,Q.oy),o.uniform2f(n.uLocs.imgScale,Q.sx,Q.sy),o.uniform1f(n.uLocs.glitchEnabled,m.glitchEnabled),o.uniform1f(n.uLocs.glitchActive,m.glitchActive),o.uniform1f(n.uLocs.glitchStrength,m.glitchStrength),o.uniform1f(n.uLocs.glitchSpeed,m.glitchSpeed),o.uniform1f(n.uLocs.glitchCols,m.glitchCols),o.uniform1f(n.uLocs.glitchRgb,m.glitchRgb),o.uniform1f(n.uLocs.hardPix,m.hardPix),o.uniform1f(n.uLocs.warpMult,m.warpMult),o.uniform1f(n.uLocs.maskStr,m.maskStr),o.uniform1f(n.uLocs.grainAmt,m.grainAmt),o.uniform1f(n.uLocs.halationStr,m.halationStr),o.uniform1f(n.uLocs.convergence,m.convergence),o.uniform1f(n.uLocs.scratchStr,m.scratchStr),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,n.scratchTex),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,n.tex),o.drawArrays(o.TRIANGLE_STRIP,0,4),M()}}function E(){x(),b(),M(),u=requestAnimationFrame(C)}t.complete&&t.naturalWidth?E():t.addEventListener("load",E);const S=new ResizeObserver(()=>{x(),M()});return S.observe(e),{destroy(){cancelAnimationFrame(u),S.disconnect()},setGlitch(v,y,_,p,A,R,N){m.glitchEnabled=v?1:0,m.glitchEnabled||(m.glitchActive=0,f=0,g=0),y!==void 0&&(m.glitchStrength=y),_!==void 0&&(m.glitchSpeed=_),p!==void 0&&(m.glitchCols=p),A!==void 0&&(m.glitchRgb=A),R!==void 0&&(m.glitchMaxDelay=R),N!==void 0&&(m.glitchMaxBurst=N)},setShader({hardPix:v,warpMult:y,maskStr:_,grainAmt:p,halationStr:A,convergence:R,scratchStr:N}={}){v!==void 0&&(m.hardPix=v),y!==void 0&&(m.warpMult=y),_!==void 0&&(m.maskStr=_),p!==void 0&&(m.grainAmt=p),A!==void 0&&(m.halationStr=A),R!==void 0&&(m.convergence=R),N!==void 0&&(m.scratchStr=N)}}}const ra=[{cls:"sigint",headline:"SIGNAL INTERCEPT: FREQ 12.4GHz",detail:"Encrypted burst tx — POSEIDON signature"},{cls:"humint",headline:"ASSET CONFIRM: NIIHAMA-04",detail:"Target movement: port district, 0300 local"},{cls:"cyber",headline:"ZERO-DAY: CVE-2026-3917",detail:"Legacy auth stack — remote exec payload ready"},{cls:"ghost",headline:"DIVE ANOMALY: SECTOR ALPHA",detail:"Ghost-barrier interference at 4.1m depth"},{cls:"elint",headline:"DRONE SWEEP: SECTOR 12",detail:"Coverage 73% — ETA 4 minutes to full map"},{cls:"sigint",headline:"PACKET STORM: 192.168.7.0/24",detail:"18k pps sustained — possible DDoS staging"},{cls:"cyber",headline:"EXFIL CHANNEL COMPROMISED",detail:"Fallback route DELTA-9 now primary exfil"},{cls:"humint",headline:"CONTACT LOST: ROMEO-7",detail:"Last check-in 03:14:22 UTC — status unknown"},{cls:"ghost",headline:"TACHIKOMA: AUTONOMOUS SWEEP",detail:"Unit 9 executing sector 7 independently"},{cls:"elint",headline:"EM PULSE DETECTED: ZONE 3",detail:"Localized disruption — comm nodes offline"},{cls:"sigint",headline:"NODE COMMS SPIKE: BEIJING",detail:"340% increase in encrypted P2P — 0300-0500"},{cls:"cyber",headline:"FIREWALL PROBE: AS12345",detail:"Systematic port sweep — countermeasures deployed"},{cls:"humint",headline:"BROKER IDENTIFIED: LAUGHING MAN",detail:"Dark web auction — biotech data linked to incident"},{cls:"ghost",headline:"GHOST PROTOCOL: BETA-3",detail:"Shell confirmed on target system — extract ready"},{cls:"elint",headline:"SAT PASS: KH-17 WINDOW",detail:"6 min coverage — imaging tasked to sector 4"}];function os(t){const e=document.createElement("div");return e.className=`sigint-item sigint-item--${t.cls}`,e.innerHTML=`
    <div class="sigint-item__class">${t.cls.toUpperCase()}</div>
    <div class="sigint-item__headline">${t.headline}</div>
    <div class="sigint-item__detail">${t.detail}</div>
  `,e}function as(t){if(!t)return;const e=4,a=[];function o(){const i=new Set(a.map(h=>{var l;return(l=h.querySelector(".sigint-item__headline"))==null?void 0:l.textContent})),n=ra.filter(h=>!i.has(h.headline)),s=n.length>0?n:ra,c=s[Math.floor(Math.random()*s.length)],r=os(c);t.insertBefore(r,t.firstChild),a.unshift(r),requestAnimationFrame(()=>r.classList.add("sigint-item--visible"));const d=8e3+Math.random()*12e3;for(setTimeout(()=>{r.classList.add("sigint-item--closing"),r.classList.remove("sigint-item--visible"),setTimeout(()=>{r.remove();const h=a.indexOf(r);h>=0&&a.splice(h,1)},500)},d);a.length>e;){const h=a.pop();h.classList.add("sigint-item--closing"),h.classList.remove("sigint-item--visible"),setTimeout(()=>h.remove(),500)}setTimeout(o,3e3+Math.random()*6e3)}setTimeout(o,800),setTimeout(o,2200)}const sa=[{cls:"STRATEGIC",headline:"BIOMECH TREATY VOTE: 72HRS",detail:"Section 9 on standby for security detail"},{cls:"TACTICAL",headline:"LAUGHING MAN: ACTIVE",detail:"New sightings logged in Niihama and Togusa ward"},{cls:"ASSET",headline:"BATOU: FIELD POSITION UPDATE",detail:"Grid 7-Delta — visual on primary target"},{cls:"THREAT",headline:"PUPPET MASTER PROTOCOL",detail:"AI ghost-dive signatures — 3 confirmed nodes"},{cls:"STRATEGIC",headline:"ARAMAKI: SITUATION ROOM",detail:"Director briefing at 0600 UTC — attendance req"},{cls:"TACTICAL",headline:"TOGUSA: DEEP COVER",detail:"Identity: Muto Ryo — corporate embedded"},{cls:"THREAT",headline:"ROGUE TACHIKOMA UNIT",detail:"Unit 14 unresponsive — last GPS: Sector 9-Bravo"},{cls:"ASSET",headline:"ISHIKAWA: CYBER BREACH",detail:"Target mainframe penetrated — exfil in 180s"},{cls:"STRATEGIC",headline:"COMA CHIP EXPLOIT: CONFIRMED",detail:"Hardware vulnerability — 40k units affected"},{cls:"TACTICAL",headline:"HELICOPTER SUPPORT: STANDING BY",detail:"AH-6J on tarmac — ETA to sector: 4 min"}];function is(t){const e=document.createElement("div");return e.className="intel-item",e.innerHTML=`
    <div class="intel-item__class">${t.cls}</div>
    <div class="intel-item__headline">${t.headline}</div>
    <div class="intel-item__detail">${t.detail}</div>
  `,e}function ns(t){if(!t)return;const e=5,a=[];function o(){const i=new Set(a.map(h=>{var l;return(l=h.querySelector(".intel-item__headline"))==null?void 0:l.textContent})),n=sa.filter(h=>!i.has(h.headline)),s=n.length>0?n:sa,c=s[Math.floor(Math.random()*s.length)],r=is(c);t.insertBefore(r,t.firstChild),a.unshift(r),requestAnimationFrame(()=>r.classList.add("intel-item--visible"));const d=1e4+Math.random()*15e3;for(setTimeout(()=>{r.classList.add("intel-item--closing"),r.classList.remove("intel-item--visible"),setTimeout(()=>{r.remove();const h=a.indexOf(r);h>=0&&a.splice(h,1)},500)},d);a.length>e;){const h=a.pop();h.classList.add("intel-item--closing"),h.classList.remove("intel-item--visible"),setTimeout(()=>h.remove(),500)}setTimeout(o,4e3+Math.random()*8e3)}setTimeout(o,1200),setTimeout(o,3500),setTimeout(o,5800)}function Z(t,e){return Math.floor(Math.random()*(e-t+1))+t}const ge=()=>`${Z(10,220)}.${Z(0,255)}.${Z(0,255)}.${Z(1,254)}`,Xt=()=>[22,80,443,8443,4444,3389,21,1337,9999][Math.floor(Math.random()*9)],rs=()=>`${Z(64,65535)}B`,ss=()=>Array.from({length:4},()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0")).join(" "),la=[()=>({source:"AUTH",message:`HANDSHAKE COMPLETE — ${ge()}:${Xt()}`,alert:!1}),()=>({source:"NET",message:`PKT ${rs()} ${ge()} → ${ge()}`,alert:!1}),()=>({source:"GHOST",message:`DIVE DEPTH: ${(2+Math.random()*3).toFixed(1)}m — STABLE`,alert:!1}),()=>({source:"CRYPT",message:"AES-256 SESSION KEY ESTABLISHED",alert:!1}),()=>({source:"SCAN",message:`PROBE: ${ge()}:${Xt()} — ${ss()}`,alert:!0}),()=>({source:"SYS",message:`MEM ${Z(60,92)}% CPU ${Z(20,80)}% THERMAL OK`,alert:!1}),()=>({source:"NET",message:`LATENCY ${Z(4,45)}ms — ${Math.random()<.8?"NOMINAL":"DEGRADED"}`,alert:Math.random()<.2}),()=>({source:"AUTH",message:`TOKEN REFRESH: UID-${Z(1e3,9999)}`,alert:!1}),()=>({source:"CRIT",message:`INTRUSION SIG: ${ge()} PORT ${Xt()}`,alert:!0}),()=>({source:"SYS",message:`COUNTERMEASURE DEPLOYED — BLOCK RULE ${Z(100,999)}`,alert:!1}),()=>({source:"NET",message:`ROUTE CHANGE: AS${Z(1e3,65e3)} VIA ${ge()}`,alert:!1}),()=>({source:"CRYPT",message:`TLS 1.3 HANDSHAKE: ${ge()} — ${Z(0,1)?"ECDH":"RSA"}-4096`,alert:!1}),()=>({source:"SCAN",message:`ANOMALY: BURST ${Z(800,9999)} PPS FROM ${ge()}`,alert:!0}),()=>({source:"GHOST",message:`GHOST COEFFICIENT: ${(92+Math.random()*8).toFixed(1)}%`,alert:!1}),()=>({source:"AUTH",message:`CERT CHAIN VALID — SHA-${Z(0,1)?"256":"512"}`,alert:!1}),()=>({source:"NET",message:`DNS RESOLVE: ${["niihama.net","togusa.local","sec9.gov","puppet.io"][Math.floor(Math.random()*4)]}`,alert:!1}),()=>({source:"SYS",message:`FIREWALL RULE ${Z(1e3,9999)}: DROP ${ge()}/${Z(24,32)}`,alert:!1}),()=>({source:"CRIT",message:`ZERO-DAY ATTEMPT: ${ge()} — MITIGATED`,alert:!0})];function ls(t,e){function a(){const o=la[Math.floor(Math.random()*la.length)];e(t,{timestamp:new Date().toISOString(),...o()})}for(let o=0;o<8;o++)a();setInterval(a,Z(1200,2800))}function Ce(t,e){return Math.floor(Math.random()*(e-t+1))+t}const Be=[{id:"n-tokyo",lat:35.68,lng:139.69,label:"TOKYO"},{id:"n-moscow",lat:55.75,lng:37.62,label:"MOSCOW"},{id:"n-beijing",lat:39.91,lng:116.39,label:"BEIJING"},{id:"n-london",lat:51.51,lng:-.13,label:"LONDON"},{id:"n-nyc",lat:40.71,lng:-74,label:"NEW YORK"},{id:"n-sydney",lat:-33.87,lng:151.21,label:"SYDNEY"},{id:"n-dubai",lat:25.2,lng:55.27,label:"DUBAI"},{id:"n-saopaulo",lat:-23.55,lng:-46.63,label:"SÃO PAULO"},{id:"n-paris",lat:48.86,lng:2.35,label:"PARIS"},{id:"n-seoul",lat:37.57,lng:126.98,label:"SEOUL"},{id:"n-cairo",lat:30.05,lng:31.24,label:"CAIRO"},{id:"n-berlin",lat:52.52,lng:13.41,label:"BERLIN"},{id:"n-mumbai",lat:19.08,lng:72.88,label:"MUMBAI"},{id:"n-toronto",lat:43.65,lng:-79.38,label:"TORONTO"},{id:"n-singapore",lat:1.35,lng:103.82,label:"SINGAPORE"},{id:"n-nairobi",lat:-1.29,lng:36.82,label:"NAIROBI"},{id:"n-istanbul",lat:41.01,lng:28.97,label:"ISTANBUL"},{id:"n-lagos",lat:6.52,lng:3.38,label:"LAGOS"}],Va={"n-tokyo":{country:"JAPAN",pop:"13.96M",status:"FINANCIAL HUB"},"n-moscow":{country:"RUSSIA",pop:"12.51M",status:"RESTRICTED"},"n-beijing":{country:"CHINA",pop:"21.54M",status:"RESTRICTED"},"n-london":{country:"UK",pop:"8.98M",status:"ALLIED NODE"},"n-nyc":{country:"USA",pop:"8.34M",status:"ALLIED NODE"},"n-sydney":{country:"AUSTRALIA",pop:"5.31M",status:"ALLIED NODE"},"n-dubai":{country:"UAE",pop:"3.33M",status:"NEUTRAL ZONE"},"n-saopaulo":{country:"BRAZIL",pop:"12.33M",status:"MONITORED"},"n-paris":{country:"FRANCE",pop:"2.15M",status:"ALLIED NODE"},"n-seoul":{country:"S.KOREA",pop:"9.78M",status:"ALLIED NODE"},"n-cairo":{country:"EGYPT",pop:"10.08M",status:"MONITORED"},"n-berlin":{country:"GERMANY",pop:"3.66M",status:"ALLIED NODE"},"n-mumbai":{country:"INDIA",pop:"20.67M",status:"MONITORED"},"n-toronto":{country:"CANADA",pop:"2.93M",status:"ALLIED NODE"},"n-singapore":{country:"SINGAPORE",pop:"5.45M",status:"NEUTRAL ZONE"},"n-nairobi":{country:"KENYA",pop:"4.40M",status:"MONITORED"},"n-istanbul":{country:"TURKEY",pop:"15.46M",status:"NEUTRAL ZONE"},"n-lagos":{country:"NIGERIA",pop:"14.86M",status:"MONITORED"}},It=Be.slice(0,8),qa=[15,72,55,18,28,10,45,33];function Ya(t){let e=t.split("").reduce((r,d)=>r*31+d.charCodeAt(0)>>>0,7);const a=()=>(e=e*1664525+1013904223>>>0,(e>>>16)/65535),o=9,i=140,n=34,s=i/o;let c=`<svg viewBox="0 0 ${i} ${n}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;height:34px;">`;c+='<g fill="currentColor">';for(let r=0;r<o;r++){const d=8+a()*24,h=s*(.48+a()*.44),l=r*s+(s-h)*.5;c+=`<rect x="${l.toFixed(1)}" y="${(n-d).toFixed(1)}" width="${h.toFixed(1)}" height="${d.toFixed(1)}"/>`}return c+="</g></svg>",c}function cs(t,e,a,o){const{addNode:i,removeNode:n,updateNodeLevel:s,setThreatLevel:c,setActiveNode:r,focusNode:d,pulseGlobeNode:h,spawnArc:l,appendRow:u,printLine:f,setRadarThreatLevel:g}=o,m=new Map;function b(S,v){t.dispatchEvent(new CustomEvent("s9:alert",{bubbles:!0,detail:{level:v>=70?"critical":"warning",source:S}}))}function w(S,v){i(t,{...S,level:v}),m.set(S.id,v),u(e,{timestamp:new Date().toISOString(),source:"NET",message:`NODE ONLINE: ${S.label} — LVL ${v}`,alert:v>=70}),v>=70&&(b(S.label,v),r(t,S.id),d(t,S.id))}It.forEach((S,v)=>{setTimeout(()=>{w(S,qa[v]),v===It.length-1&&setTimeout(()=>{c(t,55),g(.55)},800)},v*300+500)});let x=!1;function M(){if(x)return;const S=[...m.keys()],v=Be.filter(_=>!m.has(_.id)),y=Math.random();if(y<.28&&v.length>0){const _=v[Ce(0,v.length-1)],p=Ce(5,65);w(_,p),f(a,`SIGNAL ACQUIRED: ${_.label}`,"sys")}else if(y<.42&&S.length>5){const _=S[Ce(0,S.length-1)],p=Be.find(A=>A.id===_);n(t,_),m.delete(_),f(a,`SIGNAL LOST: ${(p==null?void 0:p.label)??_}`,"info"),u(e,{timestamp:new Date().toISOString(),source:"NET",message:`NODE OFFLINE: ${(p==null?void 0:p.label)??_}`,alert:!1})}else if(y<.72&&S.length>0){const _=S[Ce(0,S.length-1)],p=Be.find(B=>B.id===_),A=m.get(_)??0,R=Ce(8,28),N=Math.min(100,A+R);s(t,_,N),m.set(_,N),c(t,Math.max(...Array.from(m.values()))),g(Math.max(...Array.from(m.values()))/100),f(a,`THREAT ESCALATION: ${(p==null?void 0:p.label)??_} ${A}→${N}`,N>=70?"err":"sys"),u(e,{timestamp:new Date().toISOString(),source:"CRIT",message:`THREAT UP: ${(p==null?void 0:p.label)??_} LVL=${N}`,alert:N>=70}),N>=70&&A<70&&(b((p==null?void 0:p.label)??_,N),r(t,_),d(t,_));const re=A>=70?2:A>=40?1:0,Q=N>=70?2:N>=40?1:0;re!==Q&&h(t,_)}else if(S.length>0){const _=S[Ce(0,S.length-1)],p=Be.find(Q=>Q.id===_),A=m.get(_)??50,R=Math.max(0,A-Ce(5,18));s(t,_,R),m.set(_,R),c(t,Math.max(0,...Array.from(m.values()))),g(Math.max(0,...Array.from(m.values()))/100),f(a,`THREAT REDUCED: ${(p==null?void 0:p.label)??_} LVL=${R}`,"info");const N=A>=70?2:A>=40?1:0,re=R>=70?2:R>=40?1:0;N!==re&&h(t,_)}if(S.length>=2){const _=1+Math.floor(Math.random()*3);for(let p=0;p<_;p++){const A=S[Math.floor(Math.random()*S.length)];let R=S[Math.floor(Math.random()*S.length)];R===A&&(R=S[(S.indexOf(A)+1)%S.length]),R!==A&&l(t,A,R)}}setTimeout(M,Ce(4e3,9e3))}setTimeout(M,It.length*300+2500);const C=setInterval(()=>{const S=[...m.keys()];if(S.length<2)return;const v=Math.random()<.4?2:1;for(let y=0;y<v;y++){const _=S[Math.floor(Math.random()*S.length)];let p=S[Math.floor(Math.random()*S.length)];p===_&&(p=S[(S.indexOf(_)+1)%S.length]),p!==_&&l(t,_,p)}},1200),E=setInterval(()=>{const S=[...m.entries()].filter(([,A])=>A>=70);if(S.length===0)return;const v=t.getAttribute("data-active-node"),y=S.filter(([A])=>A!==v),_=y.length>0?y:S,[p]=_[Math.floor(Math.random()*_.length)];r(t,p),d(t,p)},8e3);return{globeNodes:m,destroy(){x=!0,clearInterval(C),clearInterval(E)}}}function ds(t,e,a,o,i){const{initThreatMap:n,addNode:s,removeNode:c,updateNodeLevel:r,setThreatLevel:d,setActiveNode:h,focusNode:l}=i;n(t,{autoRotate:!0,bloomStrength:.7});const u=new Map;e.forEach((v,y)=>{setTimeout(()=>{s(t,{...v,level:a[y]}),u.set(v.id,a[y])},y*200+300)}),setTimeout(()=>d(t,55),e.length*200+800);const f=document.getElementById("tact-node-info"),g=document.getElementById("tact-btn-add"),m=document.getElementById("tact-btn-remove"),b=document.getElementById("tact-btn-focus"),w=document.getElementById("tact-btn-deselect"),x=document.getElementById("tact-level-slider"),M=document.getElementById("tact-level-val"),C=document.getElementById("tact-level-row");let E=null;function S(){const v=E!==null&&u.has(E);if(m.disabled=!v,b.disabled=!v,w.disabled=!v,x.disabled=!v,C.style.opacity=v?"1":"0.4",C.style.pointerEvents=v?"auto":"none",v){const y=o.find(p=>p.id===E),_=u.get(E);f.textContent=`${(y==null?void 0:y.label)??E} — LVL ${_}`,x.value=_,M.textContent=_}else f.textContent="NO NODE SELECTED"}t.addEventListener("s9:threatmap-node-select",v=>{E=v.detail.nodeId,document.getElementById("tactical-threat").textContent=`THREAT: ${v.detail.level} — ${v.detail.label}`,S()}),t.addEventListener("s9:threatmap-node-deselect",()=>{E=null,S()}),g.addEventListener("click",()=>{const v=o.filter(p=>!u.has(p.id));if(v.length===0)return;const y=v[Math.floor(Math.random()*v.length)],_=Math.floor(Math.random()*60)+10;s(t,{...y,level:_}),u.set(y.id,_),d(t,Math.max(...u.values())),h(t,y.id),l(t,y.id)}),m.addEventListener("click",()=>{E&&(c(t,E),u.delete(E),d(t,u.size>0?Math.max(...u.values()):0),E=null,S())}),b.addEventListener("click",()=>{E&&l(t,E)}),w.addEventListener("click",()=>{h(t,null),E=null,S()}),x.addEventListener("input",()=>{if(!E)return;const v=parseInt(x.value);M.textContent=v,r(t,E,v),u.set(E,v),d(t,Math.max(...u.values()));const y=o.find(_=>_.id===E);f.textContent=`${(y==null?void 0:y.label)??E} — LVL ${v}`}),S()}const wt=[{id:"sec9",label:"SEC.9 HQ",x:50,y:50,root:!0},{id:"niihama",label:"NIIHAMA",x:22,y:22},{id:"togusa",label:"TOGUSA",x:78,y:22},{id:"batou",label:"BATOU",x:78,y:78},{id:"ishikawa",label:"ISHIKAWA",x:22,y:78},{id:"relay1",label:"RELAY ALPHA",x:36,y:32},{id:"relay2",label:"RELAY BETA",x:64,y:32},{id:"relay3",label:"RELAY GAMMA",x:36,y:68},{id:"relay4",label:"RELAY DELTA",x:64,y:68},{id:"ext1",label:"PUPPET MASTER",x:12,y:50},{id:"ext2",label:"LAUGHING MAN",x:88,y:50},{id:"tachi",label:"TACHIKOMA U9",x:50,y:12}],ca=[{id:"e01",from:"sec9",to:"relay1"},{id:"e02",from:"sec9",to:"relay2"},{id:"e03",from:"sec9",to:"relay3"},{id:"e04",from:"sec9",to:"relay4"},{id:"e05",from:"relay1",to:"niihama"},{id:"e06",from:"relay2",to:"togusa"},{id:"e07",from:"relay3",to:"ishikawa"},{id:"e08",from:"relay4",to:"batou"},{id:"e09",from:"niihama",to:"ext1"},{id:"e10",from:"ext1",to:"relay3"},{id:"e11",from:"togusa",to:"relay1"},{id:"e12",from:"batou",to:"relay2"},{id:"e13",from:"ext2",to:"relay2"},{id:"e14",from:"ext2",to:"relay4"},{id:"e15",from:"sec9",to:"tachi"},{id:"e16",from:"relay1",to:"relay2"},{id:"e17",from:"relay3",to:"relay4"}],Kt={relay2:72,relay4:88,ext1:95,ext2:80,niihama:45,batou:55};function us(t,e){if(!t)return;const{initMatrix:a,activateEdge:o,deactivateEdge:i,pulseNode:n,setActiveNode:s}=e;a(t,{nodes:wt,edges:ca});for(const[l,u]of Object.entries(Kt)){const f=t.querySelector(`[data-node-id="${l}"]`);f&&(u>=70?f.classList.add("s9-matrix__node--threat-high"):u>=40&&f.classList.add("s9-matrix__node--threat-mid"))}s(t,"ext1");const c=ca.map(l=>l.id),r=new Set,d=[null,null,"var(--neon-warn)","var(--neon-alert)","var(--neon-green)",null];function h(){if(r.size>0){const g=[...r],m=g[Math.floor(Math.random()*g.length)];i(t,m),r.delete(m)}const l=c.filter(g=>!r.has(g)),u=Math.random()<.4?2:1;for(let g=0;g<u&&l.length>0;g++){const m=l.splice(Math.floor(Math.random()*l.length),1)[0],b=d[Math.floor(Math.random()*d.length)];o(t,m,b),r.add(m)}if(Math.random()<.35){const g=wt[Math.floor(Math.random()*wt.length)];n(t,g.id)}const f=document.getElementById("flow-overlay");if(f){const g=Object.values(Kt).filter(w=>w>=70).length,m=Object.values(Kt).filter(w=>w>=40&&w<70).length,b=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";f.innerHTML=`<span style="font-family:var(--font-terminal);font-size: 0.7rem;color:${b};opacity:0.7">NODES: ${wt.length} &nbsp; <span style="color:var(--text-alert)">CRIT: ${g}</span> &nbsp; <span style="color:var(--neon-warn)">WARN: ${m}</span></span>`}}for(let l=0;l<4;l++){const u=c[Math.floor(Math.random()*c.length)];r.has(u)||(o(t,u),r.add(u))}setInterval(h,700),h(),document.getElementById("matrix-status").textContent="● LIVE"}const Xa=new WeakMap;function hs(t,{onSubmit:e,tabComplete:a}={}){const o=new AbortController,{signal:i}=o,n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s={abortController:o,history:[],historyIndex:-1,partialInput:"",reducedMotion:n};Xa.set(t,s);const c=t.querySelector(".s9-terminal__input");c&&c.addEventListener("keydown",r=>{ms(t,r,{onSubmit:e,tabComplete:a})},{signal:i})}function P(t,e,a){const o=t.querySelector(".s9-terminal__output");if(!o)return;const i=document.createElement("span");i.className=`s9-terminal__line s9-terminal__line--${a}`,i.textContent=e,o.appendChild(i);const n=200,s=o.querySelectorAll(".s9-terminal__line");s.length>n&&s[0].remove(),ps(o)}function fs(t){const e=t.querySelector(".s9-terminal__output");e&&(e.querySelectorAll(".s9-terminal__line").forEach(a=>a.remove()),t.dispatchEvent(new CustomEvent("s9:terminal-clear",{bubbles:!0})))}function ms(t,e,{onSubmit:a,tabComplete:o}){const i=Xa.get(t);if(!i)return;const n=t.querySelector(".s9-terminal__input");if(n)switch(e.key){case"Enter":{const s=n.value;if(!s)return;P(t,s,"cmd"),typeof a=="function"&&a(s),t.dispatchEvent(new CustomEvent("s9:terminal-submit",{bubbles:!0,detail:{command:s,timestamp:new Date().toISOString()}})),i.history.unshift(s),i.historyIndex=-1,i.partialInput="",n.value="";break}case"ArrowUp":{if(e.preventDefault(),i.history.length===0)return;i.historyIndex===-1&&(i.partialInput=n.value);const s=i.historyIndex+1;if(s<i.history.length){i.historyIndex=s,n.value=i.history[i.historyIndex];const c=n.value.length;n.setSelectionRange(c,c)}break}case"ArrowDown":{if(e.preventDefault(),i.historyIndex===-1)return;if(i.historyIndex>0){i.historyIndex-=1,n.value=i.history[i.historyIndex];const s=n.value.length;n.setSelectionRange(s,s)}else{i.historyIndex=-1,n.value=i.partialInput;const s=n.value.length;n.setSelectionRange(s,s)}break}case"Tab":{if(e.preventDefault(),typeof o=="function"){const s=o(n.value);s!=null&&(n.value=s)}break}default:{if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!i.reducedMotion&&Math.random()<.01){const s=t.querySelector(".s9-terminal__output");if(s){const r=Array.from(s.querySelectorAll(".s9-terminal__line")).slice(-8);if(r.length>0){const d=r[Math.floor(Math.random()*r.length)];d.classList.add("glitch-enter"),d.addEventListener("animationend",h=>{h.animationName==="glitch"&&d.classList.remove("glitch-enter")},{once:!0})}}}break}}}function ps(t){t.scrollTop=t.scrollHeight}const Pt={"":"MATRIX GREEN",gits:"GHOST IN THE SHELL",amber:"AMBER",phosphor:"PHOSPHOR",blood:"BLOOD"};let Ka=null,Za=null,no=null,da=null,ua=null;function Qa(t){const e=document.documentElement;t===""||t==="matrixgreen"?delete e.dataset.theme:e.dataset.theme=t,document.querySelectorAll(".topbar__theme-btn").forEach(a=>{a.classList.toggle("topbar__theme-btn--active",(a.dataset.themeSet??"")===(t==="matrixgreen"?"":t))}),Jo(Ka),no&&no()&&Jo(document.getElementById("threatmap-tactical")),Qr(Za)}function gs({threatEl:t,radarEl:e,getTacticalInited:a,termEl:o,printLine:i}){Ka=t,Za=e,no=a,da=o,ua=i,document.querySelectorAll(".topbar__theme-btn").forEach(n=>{n.addEventListener("click",()=>{const s=n.dataset.themeSet??"";Qa(s),ua(da,`THEME: ${Pt[s]??s.toUpperCase()}`,"sys")})})}function ha(){const t=new Date;document.getElementById("topbar-clock").textContent=`UTC ${t.toUTCString().split(" ")[4]}`}function vs(){ha(),setInterval(ha,1e3)}function ys({termEl:t,applyTheme:e,globeNodes:a,metrics:o,radar:i,threatEl:n,updateNodeLevel:s,setThreatLevel:c,setActiveNode:r,focusNode:d,CITY_POOL:h,CITY_DATA:l,citySkyline:u,npCity:f,npSkyline:g,npCountry:m,npPop:b,npCoords:w,npThreat:x,npStatus:M,nodePopup:C}){hs(t,{onSubmit(E){var _;const S=E.trim().split(/\s+/),v=S[0].toLowerCase(),y=S.slice(1);switch(v){case"help":P(t,"SECTION 9 COMMAND INTERFACE — AVAILABLE COMMANDS:","sys"),P(t,"  status              — system status report","info"),P(t,"  ghost               — ghost coefficient analysis","info"),P(t,"  nodes               — list active threat nodes","info"),P(t,"  threat <lvl>        — set global threat level 0-100","info"),P(t,"  threat <id> <lvl>   — set node threat level","info"),P(t,"  focus <id>          — focus camera on node","info"),P(t,"  theme <name>        — switch theme","info"),P(t,"  themes              — list available themes","info"),P(t,"  clear               — clear terminal","info");break;case"status":{const p=a.size,A=[...a.values()].filter(N=>N>=70).length,R=p>0?Math.max(...a.values()):0;P(t,"── SYSTEM STATUS ──────────────────────────","sys"),P(t,`  CPU: ${o.cpu}%   MEM: ${o.mem}%   NET I/O: ${o.net}%`,"info"),P(t,`  GHOST LAYER: ${o.ghost}%   ENCRYPTION: ${o.enc}%`,"info"),P(t,`  NODES ON GRID: ${p}   CRITICAL: ${A}`,A>0?"err":"info"),P(t,`  PEAK THREAT: ${R}   GLOBAL LEVEL: ${R}`,R>=70?"err":"sys"),P(t,"  SECURE CHANNEL: ACTIVE   ENCRYPTION: AES-256","info");break}case"ghost":{const p=o.ghostCoeff.toFixed(1);P(t,"── GHOST COEFFICIENT ANALYSIS ─────────────","sys"),P(t,`  COEFFICIENT: ${p}%   BARRIER: NOMINAL`,"info"),P(t,"  CYBER BRAIN: SECTION 9 CLEARANCE ALPHA-7","info"),P(t,"  DIVE DEPTH: STABLE 3.2m   TACHIKOMA LINK: ACTIVE","info"),P(t,"  IDENTITY: CONFIRMED — KUSANAGI.M",p>=95?"sys":"err");break}case"nodes":{if(a.size===0){P(t,"NO NODES ON GRID","info");break}P(t,`ACTIVE NODES (${a.size}):`,"sys");for(const[p,A]of a){const R=h.find(Q=>Q.id===p),N=(R==null?void 0:R.label)??p,re=A>=70?"err":A>=40?"sys":"info";P(t,`  ${p.padEnd(14)} ${N.padEnd(12)} LVL=${A}`,re)}break}case"threat":{if(y.length===0){P(t,`GLOBAL THREAT: ${Math.max(0,...a.values())}`,"sys");break}if(y.length>=2&&isNaN(parseInt(y[0]))){const p=y[0],A=parseInt(y[1]);if(!a.has(p)){P(t,`ERR: node '${p}' not found — use NODES to list`,"err");break}if(isNaN(A)||A<0||A>100){P(t,"ERR: level must be 0-100","err");break}const R=s(n,p,A);a.set(p,A),c(n,Math.max(0,...a.values())),i.setRadarThreatLevel(Math.max(0,...a.values())/100),P(t,`NODE ${p}: ${R} → ${A}`,A>=70?"err":"sys"),A>=70&&R<70&&(r(n,p),d(n,p))}else{const p=parseInt(y[0]);if(isNaN(p)||p<0||p>100){P(t,"ERR: level must be 0-100","err");break}c(n,p),i.setRadarThreatLevel(p/100),P(t,`GLOBAL THREAT LEVEL SET: ${p}`,"sys")}break}case"focus":{const p=y[0];if(!p){P(t,"ERR: focus requires a node id — use NODES to list","err");break}if(!a.has(p)){P(t,`ERR: node '${p}' not found`,"err");break}r(n,p),d(n,p);const A=h.find(R=>R.id===p);P(t,`CAMERA FOCUSED: ${(A==null?void 0:A.label)??p}`,"sys");break}case"theme":{const p=((_=y[0])==null?void 0:_.toLowerCase())??"";if(p===""||p==="matrixgreen"){e(""),P(t,"THEME: MATRIX GREEN","sys");break}if(!Object.keys(Pt).includes(p)){P(t,`ERR: unknown theme '${p}' — use THEMES to list`,"err");break}e(p),P(t,`THEME: ${Pt[p]}`,"sys");break}case"themes":P(t,"AVAILABLE THEMES:","sys");for(const[p,A]of Object.entries(Pt))P(t,`  ${(p||"matrixgreen").padEnd(14)} ${A}`,"info");break;case"clear":fs(t),P(t,"TERMINAL CLEARED","sys");break;default:v&&P(t,`ERR: unknown command '${E}' — type HELP`,"err")}},tabComplete(E){return["help","status","ghost","nodes","threat","focus","theme","themes","clear"].find(v=>v.startsWith(E.toLowerCase()))??null}}),P(t,"SECTION 9 OPERATIVE INTERFACE — TYPE HELP FOR COMMANDS","sys"),P(t,"GHOST BABEL OPERATION: ACTIVE","info")}const Ja={easeInOutCubic:Ba,easeOutExpo:Na,backInOut:Rn,linear:Dn},ei={default:{label:"Default",lineColor:65484,glowColor:65484,opacity:.72,glowOpacity:.28,emissiveIntensity:1.8,stagger:.55,ringFade:.35,warpAmount:.12,direction:"south-to-north",easingKey:"easeInOutCubic",durationMs:2200},pulse:{label:"Pulse",lineColor:16711782,lineColorB:16737792,glowColor:16711748,glowColorB:16729088,opacity:.95,glowOpacity:.55,emissiveIntensity:6,stagger:1,ringFade:.1,warpAmount:.2,direction:"equator-out",easingKey:"easeOutExpo",durationMs:1400,glowLayers:5},scanner:{label:"Scanner",lineColor:65382,glowColor:47940,opacity:.9,glowOpacity:.35,emissiveIntensity:3,stagger:.96,ringFade:.07,warpAmount:.03,direction:"south-to-north",easingKey:"linear",durationMs:2200},cosmic:{label:"Cosmic",lineColor:10044671,lineColorB:61183,glowColor:5579468,glowColorB:39355,opacity:.75,glowOpacity:.38,emissiveIntensity:2.8,stagger:.48,ringFade:.38,warpAmount:.24,direction:"equator-out",easingKey:"easeInOutCubic",durationMs:3200},ignition:{label:"Ignition",lineColor:16772608,lineColorB:16720384,glowColor:16750848,glowColorB:16716032,opacity:.95,glowOpacity:.55,emissiveIntensity:5.5,stagger:.88,ringFade:.2,warpAmount:.5,direction:"south-to-north",easingKey:"backInOut",durationMs:1600,glowLayers:4},ghost:{label:"Ghost",lineColor:8956671,lineColorB:4491519,glowColor:4495871,glowColorB:2245836,opacity:.28,glowOpacity:.07,emissiveIntensity:.8,stagger:.68,ringFade:.58,warpAmount:.42,direction:"north-to-south",easingKey:"easeOutExpo",durationMs:4500},neon:{label:"Neon",lineColor:16711935,lineColorB:65535,glowColor:13369599,glowColorB:65484,opacity:.85,glowOpacity:.45,emissiveIntensity:4.5,stagger:.62,ringFade:.28,warpAmount:.16,direction:"south-to-north",easingKey:"easeOutExpo",durationMs:2e3,glowLayers:5},solar:{label:"Solar",lineColor:16777215,lineColorB:16742144,glowColor:16768256,glowColorB:16724736,opacity:.8,glowOpacity:.5,emissiveIntensity:6,stagger:1,ringFade:.18,warpAmount:.1,direction:"equator-out",easingKey:"easeOutExpo",durationMs:1600,glowLayers:4},arctic:{label:"Arctic",lineColor:61183,lineColorB:15663103,glowColor:8978431,glowColorB:13434879,opacity:.62,glowOpacity:.22,emissiveIntensity:2,stagger:.42,ringFade:.42,warpAmount:.1,direction:"north-to-south",easingKey:"easeInOutCubic",durationMs:3e3},alert:{label:"Alert",lineColor:16746496,lineColorB:16711680,glowColor:16733440,glowColorB:13369344,opacity:.92,glowOpacity:.48,emissiveIntensity:4.5,stagger:.78,ringFade:.22,warpAmount:.22,direction:"equator-out",easingKey:"backInOut",durationMs:1600},ember:{label:"Ember",lineColor:16763904,lineColorB:16724736,glowColor:16750848,glowColorB:16716032,opacity:.68,glowOpacity:.32,emissiveIntensity:3.5,stagger:.62,ringFade:.52,warpAmount:.38,direction:"south-to-north",easingKey:"backInOut",durationMs:3800,glowLayers:3}},L={enabled:!1,dir:"south-to-north",easing:"easeInOutCubic",dur:2200,stagger:.55,ringFade:.35,invert:!1,lineColor:"#00ffcc",lineColorB:"#00ffcc",glowColor:"#00ffcc",glowColorB:"#00ffcc",gradMode:"0",opacity:.72,glowOp:.28,emissive:1.8,warp:.12,glowRad:1.008,glowLayers:3,glowStep:.004,glowFalloff:.5,colorSpread:0,brightSpread:0,flickerAmp:0,flickerSpeed:2,arcSpread:0,loopMode:"play",pause:0,morphDur:800};let T=null,Se=!1,Ot=null;function ti(){Ot!==null&&(clearTimeout(Ot),Ot=null)}function Zt(t,e){ti(),t<=0?e():Ot=setTimeout(e,t)}function Oe(){Se=!1,ti(),T&&T.stop(),document.getElementById("rr-loop").classList.remove("active")}function oi(t){T&&(L.loopMode==="play-reverse"?(T.reset(),T.play(()=>Zt(L.pause,()=>{Se&&T.reverse(()=>Zt(L.pause,t))}))):(T.reset(),T.play(()=>Zt(L.pause,t))))}function ai(){Se&&oi(()=>{Se&&ai()})}function ve(t,e){T._baseRings.material.uniforms[t].value=e,T._glowLayers.forEach(a=>{a.material.uniforms[t].value=e})}function _e(t){return"#"+t.toString(16).padStart(6,"0")}function Le(t){return parseInt(t.slice(1),16)}function bs(t,e=!0){var i;const a=ei[t];if(!a||!T)return;if(document.querySelectorAll("#rr-presets button").forEach(n=>n.classList.remove("active")),(i=document.getElementById(`rr-pre-${t}`))==null||i.classList.add("active"),a.direction){L.dir=a.direction;const s={"south-to-north":0,"north-to-south":1,"equator-out":2}[a.direction]??0;T._baseRings.material.uniforms.uDirection.value=s,T._glowLayers.forEach(c=>{c.material.uniforms.uDirection.value=s}),T._options.direction=a.direction,document.getElementById("rr-dir").value=a.direction}if(a.easingKey&&(L.easing=a.easingKey,T._options.easingFn=Ja[a.easingKey],document.getElementById("rr-easing").value=a.easingKey),a.durationMs!==void 0){L.dur=a.durationMs;const n=document.getElementById("rr-dur");n&&(n.value=a.durationMs),document.getElementById("rr-vDur").textContent=a.durationMs,T._options.durationMs=a.durationMs}if(a.opacity!==void 0&&(L.opacity=a.opacity,document.getElementById("rr-opacity").value=Math.round(a.opacity*100),document.getElementById("rr-vOpacity").textContent=a.opacity.toFixed(2)),a.glowOpacity!==void 0&&(L.glowOp=a.glowOpacity,document.getElementById("rr-glowOp").value=Math.round(a.glowOpacity*100),document.getElementById("rr-vGlowOp").textContent=a.glowOpacity.toFixed(2)),a.emissiveIntensity!==void 0&&(L.emissive=a.emissiveIntensity,document.getElementById("rr-emissive").value=Math.round(a.emissiveIntensity*100),document.getElementById("rr-vEmissive").textContent=a.emissiveIntensity.toFixed(2)),a.stagger!==void 0&&(L.stagger=a.stagger,document.getElementById("rr-stagger").value=Math.round(a.stagger*100),document.getElementById("rr-vStagger").textContent=a.stagger.toFixed(2)),a.warpAmount!==void 0&&(L.warp=a.warpAmount,document.getElementById("rr-warp").value=Math.round(a.warpAmount*100),document.getElementById("rr-vWarp").textContent=a.warpAmount.toFixed(2)),a.ringFade!==void 0){const n=Math.max(.001,a.ringFade);L.ringFade=n,document.getElementById("rr-ringFade").value=Math.round(n*100),document.getElementById("rr-vRingFade").textContent=n.toFixed(2)}a.lineColor!==void 0&&(L.lineColor=_e(a.lineColor),document.getElementById("rr-colLine").value=L.lineColor),a.lineColorB!==void 0?(L.lineColorB=_e(a.lineColorB),document.getElementById("rr-colLineB").value=L.lineColorB):a.lineColor!==void 0&&(L.lineColorB=_e(a.lineColor),document.getElementById("rr-colLineB").value=L.lineColorB),a.glowColor!==void 0&&(L.glowColor=_e(a.glowColor),document.getElementById("rr-colGlow").value=L.glowColor),a.glowColorB!==void 0?(L.glowColorB=_e(a.glowColorB),document.getElementById("rr-colGlowB").value=L.glowColorB):a.glowColor!==void 0&&(L.glowColorB=_e(a.glowColor),document.getElementById("rr-colGlowB").value=L.glowColorB);const o=e?L.morphDur:0;T.morphTo({lineColor:Le(L.lineColor),lineColorB:Le(L.lineColorB),glowColor:Le(L.glowColor),glowColorB:Le(L.glowColorB),opacity:a.opacity??L.opacity,glowOpacity:a.glowOpacity??L.glowOp,emissiveIntensity:a.emissiveIntensity??L.emissive,stagger:a.stagger??L.stagger,warpAmount:a.warpAmount??L.warp,ringFade:a.ringFade??L.ringFade,glowLayers:a.glowLayers??3,glowLayerRadiusStep:a.glowLayerRadiusStep??.004,glowLayerOpacityFalloff:a.glowLayerOpacityFalloff??.5},o)}function ws(){var a;if(!T)return;const t=document.getElementById("rr-presets");Object.entries(ei).forEach(([o,i])=>{const n=document.createElement("button");n.id=`rr-pre-${o}`,n.textContent=i.label,n.addEventListener("click",()=>bs(o,!0)),t.appendChild(n)}),(a=document.getElementById("rr-pre-default"))==null||a.classList.add("active");const e=[{type:"select",id:"rr-dir",key:"dir",set:o=>{const i={"south-to-north":0,"north-to-south":1,"equator-out":2};T._options.direction=o,ve("uDirection",i[o]??0)}},{type:"select",id:"rr-easing",key:"easing",set:o=>{T._options.easingFn=Ja[o]}},{id:"rr-dur",valId:"rr-vDur",key:"dur",toSlider:o=>o,fromSlider:o=>+o,fmt:o=>String(o),set:o=>{T._options.durationMs=o}},{id:"rr-stagger",valId:"rr-vStagger",key:"stagger",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{ve("uStagger",o),T._options.stagger=o}},{id:"rr-ringFade",valId:"rr-vRingFade",key:"ringFade",toSlider:o=>Math.round(o*100),fromSlider:o=>Math.max(.001,o/100),fmt:o=>o.toFixed(2),set:o=>{ve("uRingFade",o),T._options.ringFade=o}},{type:"checkbox",id:"rr-invert",key:"invert",set:o=>T.setInvert(o)},{type:"color",id:"rr-colLine",key:"lineColor",set:o=>{const i=Le(o);T._baseRings.material.uniforms.uColor.value.set(i),T._options.lineColor=i}},{type:"color",id:"rr-colLineB",key:"lineColorB",set:o=>{const i=Le(o);T._baseRings.material.uniforms.uColorB.value.set(i),T._options.lineColorB=i}},{type:"color",id:"rr-colGlow",key:"glowColor",set:o=>{const i=Le(o);T._glowLayers.forEach(n=>n.material.uniforms.uColor.value.set(i)),T._options.glowColor=i}},{type:"color",id:"rr-colGlowB",key:"glowColorB",set:o=>{const i=Le(o);T._glowLayers.forEach(n=>n.material.uniforms.uColorB.value.set(i)),T._options.glowColorB=i}},{type:"select",id:"rr-gradMode",key:"gradMode",set:o=>T.setGradientMode(+o)},{id:"rr-opacity",valId:"rr-vOpacity",key:"opacity",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{L.enabled&&(T._baseRings.material.uniforms.uOpacity.value=o,T._options.opacity=o)}},{id:"rr-glowOp",valId:"rr-vGlowOp",key:"glowOp",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{L.enabled&&(T._glowLayers.forEach((i,n)=>{i.material.uniforms.uOpacity.value=o*Math.pow(T._options.glowLayerOpacityFalloff,n)}),T._options.glowOpacity=o)}},{id:"rr-emissive",valId:"rr-vEmissive",key:"emissive",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{ve("uEmissiveIntensity",o),T._options.emissiveIntensity=o}},{id:"rr-warp",valId:"rr-vWarp",key:"warp",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{ve("uWarpAmount",o),T._options.warpAmount=o}},{id:"rr-glowRad",valId:"rr-vGlowRad",key:"glowRad",toSlider:o=>Math.round(o*1e3),fromSlider:o=>o/1e3,fmt:o=>o.toFixed(3),set:o=>{const i=T._options.glowRadius??o;i!==o&&T._glowLayers.forEach(n=>n.scale.multiplyScalar(o/i)),T._options.glowRadius=o}},{id:"rr-glowLayers",valId:"rr-vGlowLayers",key:"glowLayers",toSlider:o=>o,fromSlider:o=>Math.round(+o),fmt:o=>String(o),set:o=>T.morphTo({glowLayers:o},0)},{id:"rr-glowStep",valId:"rr-vGlowStep",key:"glowStep",toSlider:o=>Math.round(o*1e3),fromSlider:o=>o/1e3,fmt:o=>o.toFixed(3),set:o=>T.morphTo({glowLayerRadiusStep:o},0)},{id:"rr-glowFalloff",valId:"rr-vGlowFalloff",key:"glowFalloff",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>T.morphTo({glowLayerOpacityFalloff:o},0)},{id:"rr-colorSpread",valId:"rr-vColorSpread",key:"colorSpread",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{ve("uColorSpread",o),T._options.colorSpread=o}},{id:"rr-brightSpread",valId:"rr-vBrightSpread",key:"brightSpread",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{ve("uBrightSpread",o),T._options.brightSpread=o}},{id:"rr-flickerAmp",valId:"rr-vFlickerAmp",key:"flickerAmp",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{ve("uFlickerAmp",o),T._options.flickerAmp=o}},{id:"rr-flickerSpeed",valId:"rr-vFlickerSpeed",key:"flickerSpeed",toSlider:o=>Math.round(o*10),fromSlider:o=>o/10,fmt:o=>o.toFixed(1),set:o=>{ve("uFlickerSpeed",o),T._options.flickerSpeed=o}},{id:"rr-arcSpread",valId:"rr-vArcSpread",key:"arcSpread",toSlider:o=>Math.round(o*100),fromSlider:o=>o/100,fmt:o=>o.toFixed(2),set:o=>{ve("uArcColorSpread",o),T._options.arcColorSpread=o}},{type:"select",id:"rr-loopMode",key:"loopMode",set:()=>{}},{id:"rr-pause",valId:"rr-vPause",key:"pause",toSlider:o=>o,fromSlider:o=>+o,fmt:o=>String(o),set:()=>{}},{id:"rr-morphDur",valId:"rr-vMorphDur",key:"morphDur",toSlider:o=>o,fromSlider:o=>+o,fmt:o=>String(o),set:()=>{}}];for(const o of e){const i=document.getElementById(o.id);if(!i)continue;const n=o.type??"range",s=o.valId?document.getElementById(o.valId):null;n==="checkbox"?i.checked=L[o.key]:n==="color"||n==="select"?i.value=L[o.key]:(i.value=o.toSlider(L[o.key]),s&&(s.textContent=o.fmt(L[o.key]))),o.set(L[o.key]);const c=n==="checkbox"||n==="select"?"change":"input";i.addEventListener(c,r=>{n==="checkbox"?L[o.key]=r.target.checked:n==="color"||n==="select"?L[o.key]=r.target.value:(L[o.key]=o.fromSlider(+r.target.value),s&&(s.textContent=o.fmt(L[o.key]))),o.set(L[o.key])})}document.getElementById("rr-enable").addEventListener("change",o=>{T&&(L.enabled=o.target.checked,L.enabled?(T.morphTo({opacity:L.opacity,glowOpacity:L.glowOp},400),T.play()):(Oe(),T.morphTo({opacity:0,glowOpacity:0},400)))}),document.getElementById("rr-play").addEventListener("click",()=>{Oe(),T.play()}),document.getElementById("rr-rev").addEventListener("click",()=>{Oe(),T.reverse()}),document.getElementById("rr-stop").addEventListener("click",()=>{Oe(),T.stop()}),document.getElementById("rr-reset").addEventListener("click",()=>{Oe(),T.reset()}),document.getElementById("rr-loop").addEventListener("click",()=>{Se=!Se,document.getElementById("rr-loop").classList.toggle("active",Se),Se?ai():Oe()}),document.getElementById("rr-once").addEventListener("click",()=>{Oe(),Se=!0,oi(()=>{Se=!1})})}function fa(){const t=new F().setHSL(Math.random(),.7+Math.random()*.3,.45+Math.random()*.2);return Math.round(t.r*255)<<16|Math.round(t.g*255)<<8|Math.round(t.b*255)}function ma(t){const e=new F(t),a={};e.getHSL(a);const o=(a.h+(Math.random()-.5)*.25+1)%1,i=Math.max(.5,Math.min(1,a.s+(Math.random()-.5)*.3)),n=Math.max(.3,Math.min(.75,a.l+(Math.random()-.5)*.25)),s=new F().setHSL(o,i,n);return Math.round(s.r*255)<<16|Math.round(s.g*255)<<8|Math.round(s.b*255)}function Ss(t){T=t,ws(),document.getElementById("rr-randLine").addEventListener("click",()=>{if(!T)return;const e=fa(),a=ma(e);T.morphTo({lineColor:e,lineColorB:a},L.morphDur),L.lineColor=_e(e),L.lineColorB=_e(a),document.getElementById("rr-colLine").value=L.lineColor,document.getElementById("rr-colLineB").value=L.lineColorB}),document.getElementById("rr-randGlow").addEventListener("click",()=>{if(!T)return;const e=fa(),a=ma(e);T.morphTo({glowColor:e,glowColorB:a},L.morphDur),L.glowColor=_e(e),L.glowColorB=_e(a),document.getElementById("rr-colGlow").value=L.glowColor,document.getElementById("rr-colGlowB").value=L.glowColorB})}function _s(t){const e=Wn(t);if(!e)return;const a=1.002,o=new Ne({color:65484,transparent:!0,opacity:.18,blending:j,depthTest:!0,depthWrite:!1}),i=new co,n=10,s=20,c=64;for(let u=1;u<n;u++){const f=u/n*Math.PI,g=a*Math.cos(f),m=a*Math.sin(f),b=[];for(let x=0;x<=c;x++){const M=x/c*Math.PI*2;b.push(new k(m*Math.cos(M),g,m*Math.sin(M)))}const w=new fo(new De().setFromPoints(b),o);w.renderOrder=3,i.add(w)}for(let u=0;u<s;u++){const f=u/s*Math.PI*2,g=[];for(let b=0;b<=c;b++){const w=b/c*Math.PI;g.push(new k(a*Math.sin(w)*Math.cos(f),a*Math.cos(w),a*Math.sin(w)*Math.sin(f)))}const m=new mo(new De().setFromPoints(g),o);m.renderOrder=3,i.add(m)}i.visible=!1,e.add(i);function r(u,f,g){const b=new Ni(1,f).attributes.position,w=b.count/3,x=new k,M=new k,C=new Map;for(let S=0;S<w;S++){const v=S*3;for(let y=0;y<3;y++){const _=v+y,p=v+(y+1)%3;x.fromBufferAttribute(b,_),M.fromBufferAttribute(b,p);const A=[x,M].map(R=>`${R.x.toFixed(5)},${R.y.toFixed(5)},${R.z.toFixed(5)}`).sort().join("|");C.has(A)||C.set(A,[x.clone(),M.clone()])}}const E=[];for(const[S,v]of C.values())for(let y=0;y<g;y++){const _=new k().lerpVectors(S,v,y/g).normalize().multiplyScalar(u),p=new k().lerpVectors(S,v,(y+1)/g).normalize().multiplyScalar(u);E.push(_.x,_.y,_.z,p.x,p.y,p.z)}return new Float32Array(E)}const d=new dt;d.setPositions(r(a,3,4));const h=new he({color:65484,transparent:!0,opacity:.22,blending:j,depthTest:!0,depthWrite:!1,linewidth:1,resolution:new U(window.innerWidth,window.innerHeight)}),l=new ee(d,h);l.renderOrder=3,l.visible=!1,e.add(l),window.addEventListener("resize",()=>h.resolution.set(window.innerWidth,window.innerHeight)),document.getElementById("rr-globe").addEventListener("change",u=>{const f=u.target.value;i.visible=f==="latlon",l.visible=f==="wire"})}function xs(t){const e={color:"#00ff70",opacity:.45,burstBloom:!0,globeInteract:!0,chroma:!0,chromaScale:1,heat:!0,heatAmt:.004,streaks:!0,streakAmt:.055,soften:!0,softenStr:.002,depth:.04,normalStr:6,grEnabled:!1,grLightX:.5,grLightY:.75,grDensity:.93,grDecay:.96,grWeight:.35,grExposure:.45};function a(){t.setGodRays(e.grEnabled,e.grLightX,e.grLightY,e.grDensity,e.grDecay,e.grWeight,e.grExposure)}const o=[{type:"color",id:"rain-color",key:"color",set:i=>t.setColor(i)},{id:"rain-opacity",valId:"rain-vOpacity",key:"opacity",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:i=>t.setOpacity(i)},{type:"checkbox",id:"rain-burstBloom",key:"burstBloom",set:i=>t.setBurstBloom(i)},{type:"checkbox",id:"rain-globeInteract",key:"globeInteract",set:i=>t.setGlobeInteract(i)},{type:"checkbox",id:"rain-chroma",key:"chroma",set:i=>t.setGlyphChroma(i,e.chromaScale)},{id:"rain-chromaScale",valId:"rain-vChromaScale",key:"chromaScale",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(1),set:i=>{e.chroma&&t.setGlyphChroma(!0,i)}},{type:"checkbox",id:"rain-heat",key:"heat",set:i=>t.setHeat(i,e.heatAmt)},{id:"rain-heatAmt",valId:"rain-vHeatAmt",key:"heatAmt",toSlider:i=>i*1e3,fromSlider:i=>i/1e3,fmt:i=>i.toFixed(3),set:i=>t.setHeat(e.heat,i)},{type:"checkbox",id:"rain-streaks",key:"streaks",set:i=>t.setStreaks(i,e.streakAmt)},{id:"rain-streakAmt",valId:"rain-vStreakAmt",key:"streakAmt",toSlider:i=>i*1e3,fromSlider:i=>i/1e3,fmt:i=>i.toFixed(3),set:i=>t.setStreaks(e.streaks,i)},{type:"checkbox",id:"rain-soften",key:"soften",set:i=>t.setSoften(i,e.softenStr)},{id:"rain-softenStr",valId:"rain-vSoftenStr",key:"softenStr",toSlider:i=>i*1e3,fromSlider:i=>i/1e3,fmt:i=>i.toFixed(3),set:i=>t.setSoften(e.soften,i)},{id:"rain-depth",valId:"rain-vDepth",key:"depth",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:i=>t.setDepth(i)},{id:"rain-normalStr",valId:"rain-vNormalStr",key:"normalStr",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(1),set:i=>t.setNormalStrength(i)},{type:"checkbox",id:"rain-grEnabled",key:"grEnabled",set:()=>a()},{id:"rain-grLightX",valId:"rain-vGrLightX",key:"grLightX",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:()=>a()},{id:"rain-grLightY",valId:"rain-vGrLightY",key:"grLightY",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:()=>a()},{id:"rain-grDensity",valId:"rain-vGrDensity",key:"grDensity",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:()=>a()},{id:"rain-grDecay",valId:"rain-vGrDecay",key:"grDecay",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:()=>a()},{id:"rain-grWeight",valId:"rain-vGrWeight",key:"grWeight",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:()=>a()},{id:"rain-grExposure",valId:"rain-vGrExposure",key:"grExposure",toSlider:i=>i*100,fromSlider:i=>i/100,fmt:i=>i.toFixed(2),set:()=>a()}];for(const i of o){const n=document.getElementById(i.id);if(!n)continue;const s=i.type??"range",c=i.valId?document.getElementById(i.valId):null;s==="checkbox"?n.checked=e[i.key]:s==="color"?n.value=e[i.key]:(n.value=i.toSlider(e[i.key]),c&&(c.textContent=i.fmt(e[i.key]))),i.set(e[i.key]);const r=s==="checkbox"?"change":"input";n.addEventListener(r,d=>{s==="checkbox"?e[i.key]=d.target.checked:s==="color"?e[i.key]=d.target.value:(e[i.key]=i.fromSlider(+d.target.value),c&&(c.textContent=i.fmt(e[i.key]))),i.set(e[i.key])})}}function Ms(t){document.querySelectorAll("#rr-panel .rr-collapsible").forEach(r=>{r.addEventListener("click",()=>{const d=document.getElementById(r.dataset.target);r.classList.toggle("rr-open"),d.classList.toggle("rr-open")})});const e=document.querySelector(".s9-telescreen__vignette"),a=document.querySelector(".s9-telescreen__scanlines"),o=[document.querySelector(".s9-telescreen__phase-a"),document.querySelector(".s9-telescreen__phase-b"),document.querySelector(".s9-telescreen__phase-c")],i=document.querySelector(".s9-telescreen__glow"),n={glitchEnabled:!0,glitchStrength:.025,glitchSpeed:8,glitchCols:30,glitchRgb:.5,glitchFreq:3.5,glitchBurst:.7,scratchEnabled:!0,scratchOpacity:.2,vignetteEnabled:!0,vignetteOpacity:1,scanlinesEnabled:!1,phaseEnabled:!0,glowEnabled:!0,glowOpacity:1,warpMult:2,hardPix:1.2,maskStr:1,grainAmt:.04,halationStr:3,convergence:.07};function s(){t.setGlitch(n.glitchEnabled,n.glitchStrength,n.glitchSpeed,n.glitchCols,n.glitchRgb,n.glitchFreq,n.glitchBurst)}const c=[{type:"checkbox",id:"ts-glitchEnabled",key:"glitchEnabled",set:()=>s()},{id:"ts-glitchStrength",valId:"ts-vGlitchStrength",key:"glitchStrength",toSlider:r=>r*1e3,fromSlider:r=>r/1e3,fmt:r=>r.toFixed(3),set:()=>s()},{id:"ts-glitchSpeed",valId:"ts-vGlitchSpeed",key:"glitchSpeed",toSlider:r=>r*10,fromSlider:r=>r/10,fmt:r=>r.toFixed(1),set:()=>s()},{id:"ts-glitchCols",valId:"ts-vGlitchCols",key:"glitchCols",toSlider:r=>r,fromSlider:r=>+r,fmt:r=>String(r),set:()=>s()},{id:"ts-glitchRgb",valId:"ts-vGlitchRgb",key:"glitchRgb",toSlider:r=>r*100,fromSlider:r=>r/100,fmt:r=>r.toFixed(2),set:()=>s()},{id:"ts-glitchFreq",valId:"ts-vGlitchFreq",key:"glitchFreq",toSlider:r=>(8-r)/7.7*100,fromSlider:r=>8-r/100*7.7,fmt:r=>r.toFixed(1)+"s",set:()=>s()},{id:"ts-glitchBurst",valId:"ts-vGlitchBurst",key:"glitchBurst",toSlider:r=>r*100,fromSlider:r=>r/100,fmt:r=>r.toFixed(2)+"s",set:()=>s()},{type:"checkbox",id:"ts-scratchEnabled",key:"scratchEnabled",set:r=>t.setShader({scratchStr:r?n.scratchOpacity:0})},{id:"ts-scratchOpacity",valId:"ts-vScratchOpacity",key:"scratchOpacity",toSlider:r=>r*100,fromSlider:r=>r/100,fmt:r=>r.toFixed(2),set:r=>{n.scratchEnabled&&t.setShader({scratchStr:r})}},{type:"checkbox",id:"ts-vignetteEnabled",key:"vignetteEnabled",set:r=>{e.style.display=r?"":"none"}},{id:"ts-vignetteOpacity",valId:"ts-vVignetteOpacity",key:"vignetteOpacity",toSlider:r=>r*100,fromSlider:r=>r/100,fmt:r=>r.toFixed(2),set:r=>{e.style.opacity=r}},{type:"checkbox",id:"ts-scanlinesEnabled",key:"scanlinesEnabled",set:r=>{a.style.display=r?"block":"none"}},{type:"checkbox",id:"ts-phaseEnabled",key:"phaseEnabled",set:r=>{o.forEach(d=>{d.style.display=r?"":"none"})}},{type:"checkbox",id:"ts-glowEnabled",key:"glowEnabled",set:r=>{i.style.display=r?"":"none"}},{id:"ts-glowOpacity",valId:"ts-vGlowOpacity",key:"glowOpacity",toSlider:r=>r*100,fromSlider:r=>r/100,fmt:r=>r.toFixed(2),set:r=>{i.style.opacity=r}},{id:"ts-warp",valId:"ts-vWarp",key:"warpMult",toSlider:r=>r*100,fromSlider:r=>r/100,fmt:r=>r.toFixed(2),set:r=>t.setShader({warpMult:r})},{id:"ts-hardPix",valId:"ts-vHardPix",key:"hardPix",toSlider:r=>r*10,fromSlider:r=>r/10,fmt:r=>r.toFixed(1),set:r=>t.setShader({hardPix:-r})},{id:"ts-maskStr",valId:"ts-vMaskStr",key:"maskStr",toSlider:r=>r*100,fromSlider:r=>r/100,fmt:r=>r.toFixed(2),set:r=>t.setShader({maskStr:r})},{id:"ts-grain",valId:"ts-vGrain",key:"grainAmt",toSlider:r=>r*1e3,fromSlider:r=>r/1e3,fmt:r=>r.toFixed(3),set:r=>t.setShader({grainAmt:r})},{id:"ts-halation",valId:"ts-vHalation",key:"halationStr",toSlider:r=>r*100,fromSlider:r=>r/100,fmt:r=>r.toFixed(2),set:r=>t.setShader({halationStr:r})},{id:"ts-convergence",valId:"ts-vConvergence",key:"convergence",toSlider:r=>r*1e3,fromSlider:r=>r/1e3,fmt:r=>r.toFixed(3),set:r=>t.setShader({convergence:r})}];for(const r of c){const d=document.getElementById(r.id);if(!d)continue;const h=r.type==="checkbox",l=r.valId?document.getElementById(r.valId):null;h?d.checked=n[r.key]:(d.value=r.toSlider(n[r.key]),l&&(l.textContent=r.fmt(n[r.key]))),r.set(n[r.key]),d.addEventListener(h?"change":"input",u=>{const f=h?u.target.checked:+u.target.value;n[r.key]=h?f:r.fromSlider(f),!h&&l&&(l.textContent=r.fmt(n[r.key])),r.set(n[r.key])})}}vs();document.querySelectorAll(".s9-panel").forEach(Qn);const ii=document.querySelectorAll(".topbar__tab[data-tab]"),Es=document.querySelectorAll(".center__view[data-view]");let pa=!1,ro=!1;const Ze=document.querySelector(".s9-terminal");function ga(t){ii.forEach(e=>{const a=e.dataset.tab===t;e.classList.toggle("topbar__tab--active",a),e.setAttribute("aria-selected",a)}),Es.forEach(e=>{e.classList.toggle("center__view--active",e.dataset.view===t)}),t==="network"&&!pa&&(pa=!0,Fs()),t==="tactical"&&!ro&&(ro=!0,ks()),P(Ze,`VIEW: ${t.toUpperCase()} ACTIVATED`,"sys")}ii.forEach(t=>{t.addEventListener("click",()=>ga(t.dataset.tab)),t.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),ga(t.dataset.tab))})});function Qt(t,e,a){let o=0;function i(){if(o>=t.length)return;const{id:n,state:s}=t[o++],c=document.getElementById(n);c&&Jn(c,s),setTimeout(i,o<t.length?e:e*2)}i()}as(document.getElementById("sigint-feed"));ns(document.getElementById("intel-feed"));setTimeout(()=>{Qt([{id:"seq-breach",state:"complete"},{id:"seq-extract",state:"active"}],3e3),setTimeout(()=>{Qt([{id:"seq-extract",state:"complete"},{id:"seq-cover",state:"active"}],3500),setTimeout(()=>{Qt([{id:"seq-cover",state:"complete"},{id:"seq-exfil",state:"active"}],3e3)},9e3)},8e3)},5e3);const Ut=document.querySelector(".s9-stream");Ui(Ut);ls(Ut,go);const As=ts(document.getElementById("ts-feed-src"),document.getElementById("ts-feed-canvas"),document.getElementById("ts-glow-canvas")),ye={cpu:42,mem:61,net:12,ghost:77,enc:96},Cs=document.getElementById("tele-cpu"),Ts=document.getElementById("tele-mem"),Ls=document.getElementById("tele-net"),Ds=document.getElementById("tele-enc");setInterval(()=>{for(const t of Object.keys(ye))ye[t]=Math.max(5,Math.min(100,ye[t]+(Math.random()-.5)*6)),ye[t]=Math.round(ye[t]);ht(Cs,ye.cpu),ht(Ts,ye.mem),ht(Ls,ye.net),ht(Ds,ye.enc)},2e3);const ni=document.getElementById("neural-01"),ri=document.getElementById("ghost-val"),si=document.getElementById("cyber-index"),li=document.getElementById("neural-sync"),ci=document.getElementById("ekg-bpm"),di=Hi(document.getElementById("ekg-canvas"),document.getElementById("ekg-heart"));let Mo=98.4;for(let t=0;t<3;t++)Mo=La(ni,ri,si,li,ci,di);setInterval(()=>{Mo=La(ni,ri,si,li,ci,di)},3e3);const Ee=document.querySelector(".s9-threatmap");Ua(Ee,{autoRotate:!0,bloomStrength:.4});const ui=document.getElementById("proximity-radar"),hi=Zr(ui,{threatLevel:0}),Rs=getComputedStyle(document.documentElement).getPropertyValue("--neon-green").trim()||"#00ff70",Is=br(document.getElementById("matrix-rain-host"),{color:Rs,opacity:.45,syncCamera:Hn(Ee)});document.getElementById("sat-toggle").addEventListener("change",t=>{Kn(Ee,t.target.checked)});const{globeNodes:Ps}=cs(Ee,Ut,Ze,{addNode:Ha,removeNode:za,updateNodeLevel:So,setThreatLevel:wo,setActiveNode:Ke,focusNode:_o,pulseGlobeNode:jn,spawnArc:Vn,appendRow:go,printLine:P,setRadarThreatLevel:t=>hi.setRadarThreatLevel(t)});gs({threatEl:Ee,radarEl:ui,getTacticalInited:()=>ro,termEl:Ze,printLine:P});const Os=document.getElementById("alert-host");document.addEventListener("s9:alert",t=>{var e;if(((e=t.detail)==null?void 0:e.level)==="critical"){const a=t.detail.source??"UNKNOWN";P(Ze,`⚠ CRITICAL ALERT: ${a}`,"err"),Wi(Os,{level:"critical",code:"CRITICAL THREAT",message:a})}});const Xe=document.getElementById("node-popup"),fi=document.getElementById("np-city"),mi=document.getElementById("np-skyline"),pi=document.getElementById("np-country"),gi=document.getElementById("np-pop"),vi=document.getElementById("np-coords"),so=document.getElementById("np-threat"),yi=document.getElementById("np-status");Ee.addEventListener("s9:threatmap-node-select",t=>{const{nodeId:e,label:a,level:o,lat:i,lng:n}=t.detail;P(Ze,`NODE SELECT: ${a} — LEVEL ${o} — ${i.toFixed(2)}°, ${n.toFixed(2)}°`,o>=71?"err":o>=41?"warn":"info"),go(Ut,{timestamp:new Date().toISOString(),source:"TGT",message:`TARGET LOCKED: ${a} THREAT=${o}`,alert:o>=41});const s=Va[e]??{country:"—",pop:"—",status:"UNKNOWN"};fi.textContent=a,mi.innerHTML=Ya(e),pi.textContent=s.country,gi.textContent=s.pop,vi.textContent=`${i.toFixed(2)}°, ${n.toFixed(2)}°`;const c=o>=70?"CRITICAL":o>=40?"ELEVATED":"LOW";so.textContent=`${o} — ${c}`,so.style.color=o>=70?"var(--text-alert)":o>=40?"var(--neon-warn)":"var(--neon-green)",yi.textContent=s.status,Xe.classList.toggle("node-popup--left",n>60),Xe.setAttribute("aria-hidden","false"),Xe.classList.add("node-popup--visible")});Ee.addEventListener("s9:threatmap-node-deselect",()=>{Xe.classList.remove("node-popup--visible"),setTimeout(()=>Xe.setAttribute("aria-hidden","true"),260)});ys({termEl:Ze,applyTheme:Qa,globeNodes:Ps,metrics:{...ye,get ghostCoeff(){return Mo}},radar:hi,threatEl:Ee,updateNodeLevel:So,setThreatLevel:wo,setActiveNode:Ke,focusNode:_o,CITY_POOL:Be,CITY_DATA:Va,citySkyline:Ya,npCity:fi,npSkyline:mi,npCountry:pi,npPop:gi,npCoords:vi,npThreat:so,npStatus:yi,nodePopup:Xe});function ks(){ds(document.getElementById("threatmap-tactical"),It,qa,Be,{initThreatMap:Ua,addNode:Ha,removeNode:za,updateNodeLevel:So,setThreatLevel:wo,setActiveNode:Ke,focusNode:_o})}function Fs(){us(document.getElementById("flow-matrix"),{initMatrix:$i,activateEdge:Da,deactivateEdge:Ra,pulseNode:ji,setActiveNode:Ct})}const Bs=document.getElementById("rr-panel"),Ns=zn(Ee);Ss(Ns);_s(Ee);xs(Is);Ms(As);const Us=["intel-feed-1","sys-metrics","seq-log-right","neural-readout-1","operative-log","data-stream-1","terminal-1","telescreen-1","pulse-radar-1"],Gs=Us.map(t=>document.querySelector(`[data-s9-id="${t}"]`)),Hs=document.querySelector(".s9-ov");let St=!1;window.addEventListener("keydown",t=>{t.key==="h"||t.key==="H"?Bs.classList.toggle("rr-visible"):(t.key==="i"||t.key==="I")&&(St=!St,Gs.forEach(e=>e==null?void 0:e.classList.toggle("s9-panel--i-hidden",St)),Hs.classList.toggle("s9-ov--i-hidden",St))});
