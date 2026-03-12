(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=t(a);fetch(a.href,n)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Po="183",Hr={ROTATE:0,DOLLY:1,PAN:2},Br={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Fu=0,al=1,Bu=2,cn=1,zu=2,da=3,si=0,Dt=1,ni=2,mi=0,lr=1,It=2,nl=3,sl=4,Hu=5,ar=100,ku=101,Gu=102,Vu=103,Wu=104,Xu=200,ju=201,$u=202,qu=203,Ls=204,Ps=205,Yu=206,Zu=207,Ku=208,Ju=209,Qu=210,eh=211,th=212,ih=213,rh=214,Ds=0,En=1,Is=2,Wr=3,Us=4,Ns=5,Os=6,Fs=7,Cc=0,ah=1,nh=2,gi=0,Rc=1,Lc=2,Pc=3,Dc=4,Ic=5,Uc=6,Nc=7,Oc=300,ur=301,Xr=302,Hn=303,kn=304,In=306,Bs=1e3,wi=1001,zs=1002,Ct=1003,sh=1004,Ia=1005,Rt=1006,Gn=1007,sr=1008,oh=1008,Zt=1009,Fc=1010,Bc=1011,Ma=1012,Do=1013,_i=1014,Jt=1015,$t=1016,Io=1017,Uo=1018,xa=1020,zc=35902,Hc=35899,kc=1021,Gc=1022,Qt=1023,Di=1026,or=1027,No=1028,Oo=1029,jr=1030,Fo=1031,Bo=1033,un=33776,hn=33777,dn=33778,pn=33779,Hs=35840,ks=35841,Gs=35842,Vs=35843,Ws=36196,Xs=37492,js=37496,$s=37488,qs=37489,Ys=37490,Zs=37491,Ks=37808,Js=37809,Qs=37810,eo=37811,to=37812,io=37813,ro=37814,ao=37815,no=37816,so=37817,oo=37818,lo=37819,co=37820,uo=37821,ho=36492,po=36494,fo=36495,mo=36283,go=36284,_o=36285,vo=36286,lh=3200,ch=0,uh=1,Gi="",zt="srgb",$r="srgb-linear",Tn="linear",Ke="srgb",Mr=7680,ol=519,hh=512,dh=513,ph=514,zo=515,fh=516,mh=517,Ho=518,gh=519,ll=35044,Ua=35048,cl="300 es",pi=2e3,An=2001;function _h(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ya(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function vh(){const i=ya("canvas");return i.style.display="block",i}const ul={};function hl(...i){const e="THREE."+i.shift();console.log(e,...i)}function Vc(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ue(...i){i=Vc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Xe(...i){i=Vc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function wn(...i){const e=i.join(" ");e in ul||(ul[e]=!0,Ue(...i))}function Mh(i,e,t){return new Promise(function(r,a){function n(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:a();break;case i.TIMEOUT_EXPIRED:setTimeout(n,t);break;default:r()}}setTimeout(n,t)})}const xh={[Ds]:En,[Is]:Os,[Us]:Fs,[Wr]:Ns,[En]:Ds,[Os]:Is,[Fs]:Us,[Ns]:Wr};class fr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){const r=this._listeners;if(r===void 0)return;const a=r[e];if(a!==void 0){const n=a.indexOf(t);n!==-1&&a.splice(n,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const r=t[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let n=0,s=a.length;n<s;n++)a[n].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],fn=Math.PI/180,Mo=180/Math.PI;function wa(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[r&255]+Lt[r>>8&255]+Lt[r>>16&255]+Lt[r>>24&255]).toLowerCase()}function ke(i,e,t){return Math.max(e,Math.min(t,i))}function yh(i,e){return(i%e+e)%e}function Vn(i,e,t){return(1-t)*i+t*e}function ea(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ot(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Sh={DEG2RAD:fn};class Re{constructor(e=0,t=0){Re.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,a=e.elements;return this.x=a[0]*t+a[3]*r+a[6],this.y=a[1]*t+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(ke(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(ke(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),a=Math.sin(t),n=this.x-e.x,s=this.y-e.y;return this.x=n*r-s*a+e.x,this.y=n*a+s*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ji{constructor(e=0,t=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=a}static slerpFlat(e,t,r,a,n,s,o){let c=r[a+0],l=r[a+1],u=r[a+2],d=r[a+3],h=n[s+0],p=n[s+1],g=n[s+2],y=n[s+3];if(d!==y||c!==h||l!==p||u!==g){let f=c*h+l*p+u*g+d*y;f<0&&(h=-h,p=-p,g=-g,y=-y,f=-f);let m=1-o;if(f<.9995){const x=Math.acos(f),T=Math.sin(x);m=Math.sin(m*x)/T,o=Math.sin(o*x)/T,c=c*m+h*o,l=l*m+p*o,u=u*m+g*o,d=d*m+y*o}else{c=c*m+h*o,l=l*m+p*o,u=u*m+g*o,d=d*m+y*o;const x=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=x,l*=x,u*=x,d*=x}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,r,a,n,s){const o=r[a],c=r[a+1],l=r[a+2],u=r[a+3],d=n[s],h=n[s+1],p=n[s+2],g=n[s+3];return e[t]=o*g+u*d+c*p-l*h,e[t+1]=c*g+u*h+l*d-o*p,e[t+2]=l*g+u*p+o*h-c*d,e[t+3]=u*g-o*d-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,a){return this._x=e,this._y=t,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,a=e._y,n=e._z,s=e._order,o=Math.cos,c=Math.sin,l=o(r/2),u=o(a/2),d=o(n/2),h=c(r/2),p=c(a/2),g=c(n/2);switch(s){case"XYZ":this._x=h*u*d+l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d+h*p*g;break;case"YZX":this._x=h*u*d+l*p*g,this._y=l*p*d+h*u*g,this._z=l*u*g-h*p*d,this._w=l*u*d-h*p*g;break;case"XZY":this._x=h*u*d-l*p*g,this._y=l*p*d-h*u*g,this._z=l*u*g+h*p*d,this._w=l*u*d+h*p*g;break;default:Ue("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],a=t[4],n=t[8],s=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=r+o+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(n-l)*p,this._z=(s-a)*p}else if(r>o&&r>d){const p=2*Math.sqrt(1+r-o-d);this._w=(u-c)/p,this._x=.25*p,this._y=(a+s)/p,this._z=(n+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-r-d);this._w=(n-l)/p,this._x=(a+s)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-r-o);this._w=(s-a)/p,this._x=(n+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ke(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,t/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,a=e._y,n=e._z,s=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=r*u+s*o+a*l-n*c,this._y=a*u+s*c+n*o-r*l,this._z=n*u+s*l+r*c-a*o,this._w=s*u-r*o-a*c-n*l,this._onChangeCallback(),this}slerp(e,t){let r=e._x,a=e._y,n=e._z,s=e._w,o=this.dot(e);o<0&&(r=-r,a=-a,n=-n,s=-s,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+r*t,this._y=this._y*c+a*t,this._z=this._z*c+n*t,this._w=this._w*c+s*t,this._onChangeCallback()}else this._x=this._x*c+r*t,this._y=this._y*c+a*t,this._z=this._z*c+n*t,this._w=this._w*c+s*t,this.normalize();return this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),n=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),n*Math.sin(t),n*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,r=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,a=this.z,n=e.elements;return this.x=n[0]*t+n[3]*r+n[6]*a,this.y=n[1]*t+n[4]*r+n[7]*a,this.z=n[2]*t+n[5]*r+n[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,n=e.elements,s=1/(n[3]*t+n[7]*r+n[11]*a+n[15]);return this.x=(n[0]*t+n[4]*r+n[8]*a+n[12])*s,this.y=(n[1]*t+n[5]*r+n[9]*a+n[13])*s,this.z=(n[2]*t+n[6]*r+n[10]*a+n[14])*s,this}applyQuaternion(e){const t=this.x,r=this.y,a=this.z,n=e.x,s=e.y,o=e.z,c=e.w,l=2*(s*a-o*r),u=2*(o*t-n*a),d=2*(n*r-s*t);return this.x=t+c*l+s*d-o*u,this.y=r+c*u+o*l-n*d,this.z=a+c*d+n*u-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,a=this.z,n=e.elements;return this.x=n[0]*t+n[4]*r+n[8]*a,this.y=n[1]*t+n[5]*r+n[9]*a,this.z=n[2]*t+n[6]*r+n[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(ke(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,a=e.y,n=e.z,s=t.x,o=t.y,c=t.z;return this.x=a*c-n*o,this.y=n*s-r*c,this.z=r*o-a*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Wn.copy(this).projectOnVector(e),this.sub(Wn)}reflect(e){return this.sub(Wn.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(ke(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return t*t+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const a=Math.sin(t)*e;return this.x=a*Math.sin(r),this.y=Math.cos(t)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wn=new L,dl=new ji;let He=class Wc{constructor(e,t,r,a,n,s,o,c,l){Wc.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,a,n,s,o,c,l)}set(e,t,r,a,n,s,o,c,l){const u=this.elements;return u[0]=e,u[1]=a,u[2]=o,u[3]=t,u[4]=n,u[5]=c,u[6]=r,u[7]=s,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,n=this.elements,s=r[0],o=r[3],c=r[6],l=r[1],u=r[4],d=r[7],h=r[2],p=r[5],g=r[8],y=a[0],f=a[3],m=a[6],x=a[1],T=a[4],S=a[7],w=a[2],A=a[5],P=a[8];return n[0]=s*y+o*x+c*w,n[3]=s*f+o*T+c*A,n[6]=s*m+o*S+c*P,n[1]=l*y+u*x+d*w,n[4]=l*f+u*T+d*A,n[7]=l*m+u*S+d*P,n[2]=h*y+p*x+g*w,n[5]=h*f+p*T+g*A,n[8]=h*m+p*S+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],a=e[2],n=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*s*u-t*o*l-r*n*u+r*o*c+a*n*l-a*s*c}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],n=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*s-o*l,h=o*c-u*n,p=l*n-s*c,g=t*d+r*h+a*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=d*y,e[1]=(a*l-u*r)*y,e[2]=(o*r-a*s)*y,e[3]=h*y,e[4]=(u*t-a*c)*y,e[5]=(a*n-o*t)*y,e[6]=p*y,e[7]=(r*c-l*t)*y,e[8]=(s*t-r*n)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,a,n,s,o){const c=Math.cos(n),l=Math.sin(n);return this.set(r*c,r*l,-r*(c*s+l*o)+s+e,-a*l,a*c,-a*(-l*s+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Xn.makeScale(e,t)),this}rotate(e){return this.premultiply(Xn.makeRotation(-e)),this}translate(e,t){return this.premultiply(Xn.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<9;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}};const Xn=new He,pl=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fl=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function bh(){const i={enabled:!0,workingColorSpace:$r,spaces:{},convert:function(a,n,s){return this.enabled===!1||n===s||!n||!s||(this.spaces[n].transfer===Ke&&(a.r=Li(a.r),a.g=Li(a.g),a.b=Li(a.b)),this.spaces[n].primaries!==this.spaces[s].primaries&&(a.applyMatrix3(this.spaces[n].toXYZ),a.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===Ke&&(a.r=kr(a.r),a.g=kr(a.g),a.b=kr(a.b))),a},workingToColorSpace:function(a,n){return this.convert(a,this.workingColorSpace,n)},colorSpaceToWorking:function(a,n){return this.convert(a,n,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Gi?Tn:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,n=this.workingColorSpace){return a.fromArray(this.spaces[n].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,n,s){return a.copy(this.spaces[n].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,n){return wn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(a,n)},toWorkingColorSpace:function(a,n){return wn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(a,n)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],r=[.3127,.329];return i.define({[$r]:{primaries:e,whitePoint:r,transfer:Tn,toXYZ:pl,fromXYZ:fl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:zt},outputColorSpaceConfig:{drawingBufferColorSpace:zt}},[zt]:{primaries:e,whitePoint:r,transfer:Ke,toXYZ:pl,fromXYZ:fl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:zt}}}),i}const je=bh();function Li(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function kr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let xr;class Eh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{xr===void 0&&(xr=ya("canvas")),xr.width=e.width,xr.height=e.height;const a=xr.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),r=xr}return r.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ya("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),n=a.data;for(let s=0;s<n.length;s++)n[s]=Li(n[s]/255)*255;return r.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(Li(t[r]/255)*255):t[r]=Li(t[r]);return{data:t,width:e.width,height:e.height}}else return Ue("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Th=0,ko=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=wa(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let n;if(Array.isArray(a)){n=[];for(let s=0,o=a.length;s<o;s++)a[s].isDataTexture?n.push(jn(a[s].image)):n.push(jn(a[s]))}else n=jn(a);r.url=n}return t||(e.images[this.uuid]=r),r}};function jn(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Eh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ue("Texture: Unable to serialize Texture."),{})}let Ah=0;const $n=new L;let qt=class mn extends fr{constructor(e=mn.DEFAULT_IMAGE,t=mn.DEFAULT_MAPPING,r=wi,a=wi,n=Rt,s=sr,o=Qt,c=Zt,l=mn.DEFAULT_ANISOTROPY,u=Gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ah++}),this.uuid=wa(),this.name="",this.source=new ko(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=n,this.minFilter=s,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Re(0,0),this.repeat=new Re(1,1),this.center=new Re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize($n).x}get height(){return this.source.getSize($n).y}get depth(){return this.source.getSize($n).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const r=e[t];if(r===void 0){Ue(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){Ue(`Texture.setValues(): property '${t}' does not exist.`);continue}a&&r&&a.isVector2&&r.isVector2||a&&r&&a.isVector3&&r.isVector3||a&&r&&a.isMatrix3&&r.isMatrix3?a.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Oc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bs:e.x=e.x-Math.floor(e.x);break;case wi:e.x=e.x<0?0:1;break;case zs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bs:e.y=e.y-Math.floor(e.y);break;case wi:e.y=e.y<0?0:1;break;case zs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=Oc;qt.DEFAULT_ANISOTROPY=1;class ft{constructor(e=0,t=0,r=0,a=1){ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,a){return this.x=e,this.y=t,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,n=this.w,s=e.elements;return this.x=s[0]*t+s[4]*r+s[8]*a+s[12]*n,this.y=s[1]*t+s[5]*r+s[9]*a+s[13]*n,this.z=s[2]*t+s[6]*r+s[10]*a+s[14]*n,this.w=s[3]*t+s[7]*r+s[11]*a+s[15]*n,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,a,n;const s=e.elements,o=s[0],c=s[4],l=s[8],u=s[1],d=s[5],h=s[9],p=s[2],g=s[6],y=s[10];if(Math.abs(c-u)<.01&&Math.abs(l-p)<.01&&Math.abs(h-g)<.01){if(Math.abs(c+u)<.1&&Math.abs(l+p)<.1&&Math.abs(h+g)<.1&&Math.abs(o+d+y-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const m=(o+1)/2,x=(d+1)/2,T=(y+1)/2,S=(c+u)/4,w=(l+p)/4,A=(h+g)/4;return m>x&&m>T?m<.01?(r=0,a=.707106781,n=.707106781):(r=Math.sqrt(m),a=S/r,n=w/r):x>T?x<.01?(r=.707106781,a=0,n=.707106781):(a=Math.sqrt(x),r=S/a,n=A/a):T<.01?(r=.707106781,a=.707106781,n=0):(n=Math.sqrt(T),r=w/n,a=A/n),this.set(r,a,n,t),this}let f=Math.sqrt((g-h)*(g-h)+(l-p)*(l-p)+(u-c)*(u-c));return Math.abs(f)<.001&&(f=1),this.x=(g-h)/f,this.y=(l-p)/f,this.z=(u-c)/f,this.w=Math.acos((o+d+y-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this.w=ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this.w=ke(this.w,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(ke(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wh extends fr{constructor(e=1,t=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},r),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=r.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t),this.textures=[];const a={width:e,height:t,depth:r.depth},n=new qt(a),s=r.count;for(let o=0;o<s;o++)this.textures[o]=n.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview}_setTextureOptions(e={}){const t={minFilter:Rt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let a=0,n=this.textures.length;a<n;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=r,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,r=e.textures.length;t<r;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const a=Object.assign({},e.textures[t].image);this.textures[t].source=new ko(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}let kt=class extends wh{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}},Xc=class extends qt{constructor(e=null,t=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};class Ch extends qt{constructor(e=null,t=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nt{constructor(e,t,r,a,n,s,o,c,l,u,d,h,p,g,y,f){nt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,a,n,s,o,c,l,u,d,h,p,g,y,f)}set(e,t,r,a,n,s,o,c,l,u,d,h,p,g,y,f){const m=this.elements;return m[0]=e,m[4]=t,m[8]=r,m[12]=a,m[1]=n,m[5]=s,m[9]=o,m[13]=c,m[2]=l,m[6]=u,m[10]=d,m[14]=h,m[3]=p,m[7]=g,m[11]=y,m[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nt().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),r.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,r=e.elements,a=1/yr.setFromMatrixColumn(e,0).length(),n=1/yr.setFromMatrixColumn(e,1).length(),s=1/yr.setFromMatrixColumn(e,2).length();return t[0]=r[0]*a,t[1]=r[1]*a,t[2]=r[2]*a,t[3]=0,t[4]=r[4]*n,t[5]=r[5]*n,t[6]=r[6]*n,t[7]=0,t[8]=r[8]*s,t[9]=r[9]*s,t[10]=r[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,a=e.y,n=e.z,s=Math.cos(r),o=Math.sin(r),c=Math.cos(a),l=Math.sin(a),u=Math.cos(n),d=Math.sin(n);if(e.order==="XYZ"){const h=s*u,p=s*d,g=o*u,y=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=h-y*l,t[9]=-o*c,t[2]=y-h*l,t[6]=g+p*l,t[10]=s*c}else if(e.order==="YXZ"){const h=c*u,p=c*d,g=l*u,y=l*d;t[0]=h+y*o,t[4]=g*o-p,t[8]=s*l,t[1]=s*d,t[5]=s*u,t[9]=-o,t[2]=p*o-g,t[6]=y+h*o,t[10]=s*c}else if(e.order==="ZXY"){const h=c*u,p=c*d,g=l*u,y=l*d;t[0]=h-y*o,t[4]=-s*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=s*u,t[9]=y-h*o,t[2]=-s*l,t[6]=o,t[10]=s*c}else if(e.order==="ZYX"){const h=s*u,p=s*d,g=o*u,y=o*d;t[0]=c*u,t[4]=g*l-p,t[8]=h*l+y,t[1]=c*d,t[5]=y*l+h,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=s*c}else if(e.order==="YZX"){const h=s*c,p=s*l,g=o*c,y=o*l;t[0]=c*u,t[4]=y-h*d,t[8]=g*d+p,t[1]=d,t[5]=s*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*d+g,t[10]=h-y*d}else if(e.order==="XZY"){const h=s*c,p=s*l,g=o*c,y=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+y,t[5]=s*u,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*u,t[10]=y*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rh,e,Lh)}lookAt(e,t,r){const a=this.elements;return Wt.subVectors(e,t),Wt.lengthSq()===0&&(Wt.z=1),Wt.normalize(),Ui.crossVectors(r,Wt),Ui.lengthSq()===0&&(Math.abs(r.z)===1?Wt.x+=1e-4:Wt.z+=1e-4,Wt.normalize(),Ui.crossVectors(r,Wt)),Ui.normalize(),Na.crossVectors(Wt,Ui),a[0]=Ui.x,a[4]=Na.x,a[8]=Wt.x,a[1]=Ui.y,a[5]=Na.y,a[9]=Wt.y,a[2]=Ui.z,a[6]=Na.z,a[10]=Wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,n=this.elements,s=r[0],o=r[4],c=r[8],l=r[12],u=r[1],d=r[5],h=r[9],p=r[13],g=r[2],y=r[6],f=r[10],m=r[14],x=r[3],T=r[7],S=r[11],w=r[15],A=a[0],P=a[4],v=a[8],E=a[12],W=a[1],R=a[5],B=a[9],H=a[13],V=a[2],k=a[6],z=a[10],O=a[14],Q=a[3],Z=a[7],le=a[11],de=a[15];return n[0]=s*A+o*W+c*V+l*Q,n[4]=s*P+o*R+c*k+l*Z,n[8]=s*v+o*B+c*z+l*le,n[12]=s*E+o*H+c*O+l*de,n[1]=u*A+d*W+h*V+p*Q,n[5]=u*P+d*R+h*k+p*Z,n[9]=u*v+d*B+h*z+p*le,n[13]=u*E+d*H+h*O+p*de,n[2]=g*A+y*W+f*V+m*Q,n[6]=g*P+y*R+f*k+m*Z,n[10]=g*v+y*B+f*z+m*le,n[14]=g*E+y*H+f*O+m*de,n[3]=x*A+T*W+S*V+w*Q,n[7]=x*P+T*R+S*k+w*Z,n[11]=x*v+T*B+S*z+w*le,n[15]=x*E+T*H+S*O+w*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],a=e[8],n=e[12],s=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],p=e[14],g=e[3],y=e[7],f=e[11],m=e[15],x=c*p-l*h,T=o*p-l*d,S=o*h-c*d,w=s*p-l*u,A=s*h-c*u,P=s*d-o*u;return t*(y*x-f*T+m*S)-r*(g*x-f*w+m*A)+a*(g*T-y*w+m*P)-n*(g*S-y*A+f*P)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],n=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],p=e[11],g=e[12],y=e[13],f=e[14],m=e[15],x=t*o-r*s,T=t*c-a*s,S=t*l-n*s,w=r*c-a*o,A=r*l-n*o,P=a*l-n*c,v=u*y-d*g,E=u*f-h*g,W=u*m-p*g,R=d*f-h*y,B=d*m-p*y,H=h*m-p*f,V=x*H-T*B+S*R+w*W-A*E+P*v;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/V;return e[0]=(o*H-c*B+l*R)*k,e[1]=(a*B-r*H-n*R)*k,e[2]=(y*P-f*A+m*w)*k,e[3]=(h*A-d*P-p*w)*k,e[4]=(c*W-s*H-l*E)*k,e[5]=(t*H-a*W+n*E)*k,e[6]=(f*S-g*P-m*T)*k,e[7]=(u*P-h*S+p*T)*k,e[8]=(s*B-o*W+l*v)*k,e[9]=(r*W-t*B-n*v)*k,e[10]=(g*A-y*S+m*x)*k,e[11]=(d*S-u*A-p*x)*k,e[12]=(o*E-s*R-c*v)*k,e[13]=(t*R-r*E+a*v)*k,e[14]=(y*T-g*w-f*x)*k,e[15]=(u*w-d*T+h*x)*k,this}scale(e){const t=this.elements,r=e.x,a=e.y,n=e.z;return t[0]*=r,t[4]*=a,t[8]*=n,t[1]*=r,t[5]*=a,t[9]*=n,t[2]*=r,t[6]*=a,t[10]*=n,t[3]*=r,t[7]*=a,t[11]*=n,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,a))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),a=Math.sin(t),n=1-r,s=e.x,o=e.y,c=e.z,l=n*s,u=n*o;return this.set(l*s+r,l*o-a*c,l*c+a*o,0,l*o+a*c,u*o+r,u*c-a*s,0,l*c-a*o,u*c+a*s,n*c*c+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,a,n,s){return this.set(1,r,n,0,e,1,s,0,t,a,1,0,0,0,0,1),this}compose(e,t,r){const a=this.elements,n=t._x,s=t._y,o=t._z,c=t._w,l=n+n,u=s+s,d=o+o,h=n*l,p=n*u,g=n*d,y=s*u,f=s*d,m=o*d,x=c*l,T=c*u,S=c*d,w=r.x,A=r.y,P=r.z;return a[0]=(1-(y+m))*w,a[1]=(p+S)*w,a[2]=(g-T)*w,a[3]=0,a[4]=(p-S)*A,a[5]=(1-(h+m))*A,a[6]=(f+x)*A,a[7]=0,a[8]=(g+T)*P,a[9]=(f-x)*P,a[10]=(1-(h+y))*P,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,r){const a=this.elements;e.x=a[12],e.y=a[13],e.z=a[14];const n=this.determinant();if(n===0)return r.set(1,1,1),t.identity(),this;let s=yr.set(a[0],a[1],a[2]).length();const o=yr.set(a[4],a[5],a[6]).length(),c=yr.set(a[8],a[9],a[10]).length();n<0&&(s=-s),ii.copy(this);const l=1/s,u=1/o,d=1/c;return ii.elements[0]*=l,ii.elements[1]*=l,ii.elements[2]*=l,ii.elements[4]*=u,ii.elements[5]*=u,ii.elements[6]*=u,ii.elements[8]*=d,ii.elements[9]*=d,ii.elements[10]*=d,t.setFromRotationMatrix(ii),r.x=s,r.y=o,r.z=c,this}makePerspective(e,t,r,a,n,s,o=pi,c=!1){const l=this.elements,u=2*n/(t-e),d=2*n/(r-a),h=(t+e)/(t-e),p=(r+a)/(r-a);let g,y;if(c)g=n/(s-n),y=s*n/(s-n);else if(o===pi)g=-(s+n)/(s-n),y=-2*s*n/(s-n);else if(o===An)g=-s/(s-n),y=-s*n/(s-n);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,r,a,n,s,o=pi,c=!1){const l=this.elements,u=2/(t-e),d=2/(r-a),h=-(t+e)/(t-e),p=-(r+a)/(r-a);let g,y;if(c)g=1/(s-n),y=s/(s-n);else if(o===pi)g=-2/(s-n),y=-(s+n)/(s-n);else if(o===An)g=-1/(s-n),y=-n/(s-n);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<16;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const yr=new L,ii=new nt,Rh=new L(0,0,0),Lh=new L(1,1,1),Ui=new L,Na=new L,Wt=new L,ml=new nt,gl=new ji;let hr=class jc{constructor(e=0,t=0,r=0,a=jc.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,a=this._order){return this._x=e,this._y=t,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const a=e.elements,n=a[0],s=a[4],o=a[8],c=a[1],l=a[5],u=a[9],d=a[2],h=a[6],p=a[10];switch(t){case"XYZ":this._y=Math.asin(ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,n)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,n),this._z=0);break;case"ZXY":this._x=Math.asin(ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,n));break;case"ZYX":this._y=Math.asin(-ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,n)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,n)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ke(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,n)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ue("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return ml.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ml,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gl.setFromEuler(this),this.setFromQuaternion(gl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};hr.DEFAULT_ORDER="XYZ";let Go=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Ph=0;const _l=new L,Sr=new ji,yi=new nt,Oa=new L,ta=new L,Dh=new L,Ih=new ji,vl=new L(1,0,0),Ml=new L(0,1,0),xl=new L(0,0,1),yl={type:"added"},Uh={type:"removed"},br={type:"childadded",child:null},qn={type:"childremoved",child:null};let ei=class gn extends fr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ph++}),this.uuid=wa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gn.DEFAULT_UP.clone();const e=new L,t=new hr,r=new ji,a=new L(1,1,1);function n(){r.setFromEuler(t,!1)}function s(){t.setFromQuaternion(r,void 0,!1)}t._onChange(n),r._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new nt},normalMatrix:{value:new He}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=gn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Go,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Sr.setFromAxisAngle(e,t),this.quaternion.multiply(Sr),this}rotateOnWorldAxis(e,t){return Sr.setFromAxisAngle(e,t),this.quaternion.premultiply(Sr),this}rotateX(e){return this.rotateOnAxis(vl,e)}rotateY(e){return this.rotateOnAxis(Ml,e)}rotateZ(e){return this.rotateOnAxis(xl,e)}translateOnAxis(e,t){return _l.copy(e).applyQuaternion(this.quaternion),this.position.add(_l.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vl,e)}translateY(e){return this.translateOnAxis(Ml,e)}translateZ(e){return this.translateOnAxis(xl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?Oa.copy(e):Oa.set(e,t,r);const a=this.parent;this.updateWorldMatrix(!0,!1),ta.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(ta,Oa,this.up):yi.lookAt(Oa,ta,this.up),this.quaternion.setFromRotationMatrix(yi),a&&(yi.extractRotation(a.matrixWorld),Sr.setFromRotationMatrix(yi),this.quaternion.premultiply(Sr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Xe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yl),br.child=e,this.dispatchEvent(br),br.child=null):Xe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Uh),qn.child=e,this.dispatchEvent(qn),qn.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yi.multiply(e.parent.matrixWorld)),e.applyMatrix4(yi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yl),br.child=e,this.dispatchEvent(br),br.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,a=this.children.length;r<a;r++){const n=this.children[r].getObjectByProperty(e,t);if(n!==void 0)return n}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const a=this.children;for(let n=0,s=a.length;n<s;n++)a[n].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ta,e,Dh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ta,Ih,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,r=e.y,a=e.z,n=this.matrix.elements;n[12]+=t-n[0]*t-n[4]*r-n[8]*a,n[13]+=r-n[1]*t-n[5]*r-n[9]*a,n[14]+=a-n[2]*t-n[6]*r-n[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const a=this.children;for(let n=0,s=a.length;n<s;n++)a[n].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),this.static!==!1&&(a.static=this.static),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function n(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=n(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];n(e.shapes,d)}else n(e.shapes,c)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(n(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(n(e.materials,this.material[c]));a.material=o}else a.material=n(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];a.animations.push(n(e.animations,c))}}if(t){const o=s(e.geometries),c=s(e.materials),l=s(e.textures),u=s(e.images),d=s(e.shapes),h=s(e.skeletons),p=s(e.animations),g=s(e.nodes);o.length>0&&(r.geometries=o),c.length>0&&(r.materials=c),l.length>0&&(r.textures=l),u.length>0&&(r.images=u),d.length>0&&(r.shapes=d),h.length>0&&(r.skeletons=h),p.length>0&&(r.animations=p),g.length>0&&(r.nodes=g)}return r.object=a,r;function s(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}};ei.DEFAULT_UP=new L(0,1,0);ei.DEFAULT_MATRIX_AUTO_UPDATE=!0;ei.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class zr extends ei{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Nh={type:"move"};class Yn{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let a=null,n=null,s=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const y of e.hand.values()){const f=t.getJointPose(y,r),m=this._getHandJoint(l,y);f!==null&&(m.matrix.fromArray(f.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=f.radius),m.visible=f!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&h>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(n=t.getPose(e.gripSpace,r),n!==null&&(c.matrix.fromArray(n.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,n.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(n.linearVelocity)):c.hasLinearVelocity=!1,n.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(n.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(a=t.getPose(e.targetRaySpace,r),a===null&&n!==null&&(a=n),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Nh)))}return o!==null&&(o.visible=a!==null),c!==null&&(c.visible=n!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new zr;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}const $c={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},Fa={h:0,s:0,l:0};function Zn(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}let Ae=class{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,r,a=je.workingColorSpace){return this.r=e,this.g=t,this.b=r,je.colorSpaceToWorking(this,a),this}setHSL(e,t,r,a=je.workingColorSpace){if(e=yh(e,1),t=ke(t,0,1),r=ke(r,0,1),t===0)this.r=this.g=this.b=r;else{const n=r<=.5?r*(1+t):r+t-r*t,s=2*r-n;this.r=Zn(s,n,e+1/3),this.g=Zn(s,n,e),this.b=Zn(s,n,e-1/3)}return je.colorSpaceToWorking(this,a),this}setStyle(e,t=zt){function r(n){n!==void 0&&parseFloat(n)<1&&Ue("Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let n;const s=a[1],o=a[2];switch(s){case"rgb":case"rgba":if(n=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(n[4]),this.setRGB(Math.min(255,parseInt(n[1],10))/255,Math.min(255,parseInt(n[2],10))/255,Math.min(255,parseInt(n[3],10))/255,t);if(n=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(n[4]),this.setRGB(Math.min(100,parseInt(n[1],10))/100,Math.min(100,parseInt(n[2],10))/100,Math.min(100,parseInt(n[3],10))/100,t);break;case"hsl":case"hsla":if(n=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(n[4]),this.setHSL(parseFloat(n[1])/360,parseFloat(n[2])/100,parseFloat(n[3])/100,t);break;default:Ue("Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const n=a[1],s=n.length;if(s===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(n,16),t);Ue("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){const r=$c[e.toLowerCase()];return r!==void 0?this.setHex(r,t):Ue("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}copyLinearToSRGB(e){return this.r=kr(e.r),this.g=kr(e.g),this.b=kr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return je.workingToColorSpace(Pt.copy(this),e),Math.round(ke(Pt.r*255,0,255))*65536+Math.round(ke(Pt.g*255,0,255))*256+Math.round(ke(Pt.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(Pt.copy(this),t);const r=Pt.r,a=Pt.g,n=Pt.b,s=Math.max(r,a,n),o=Math.min(r,a,n);let c,l;const u=(o+s)/2;if(o===s)c=0,l=0;else{const d=s-o;switch(l=u<=.5?d/(s+o):d/(2-s-o),s){case r:c=(a-n)/d+(a<n?6:0);break;case a:c=(n-r)/d+2;break;case n:c=(r-a)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=zt){je.workingToColorSpace(Pt.copy(this),e);const t=Pt.r,r=Pt.g,a=Pt.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,t,r){return this.getHSL(Ni),this.setHSL(Ni.h+e,Ni.s+t,Ni.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(Ni),e.getHSL(Fa);const r=Vn(Ni.h,Fa.h,t),a=Vn(Ni.s,Fa.s,t),n=Vn(Ni.l,Fa.l,t);return this.setHSL(r,a,n),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,a=this.b,n=e.elements;return this.r=n[0]*t+n[3]*r+n[6]*a,this.g=n[1]*t+n[4]*r+n[7]*a,this.b=n[2]*t+n[5]*r+n[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const Pt=new Ae;Ae.NAMES=$c;class Vo extends ei{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hr,this.environmentIntensity=1,this.environmentRotation=new hr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const ri=new L,Si=new L,Kn=new L,bi=new L,Er=new L,Tr=new L,Sl=new L,Jn=new L,Qn=new L,es=new L,ts=new ft,is=new ft,rs=new ft;let ia=class Nr{constructor(e=new L,t=new L,r=new L){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,a){a.subVectors(r,t),ri.subVectors(e,t),a.cross(ri);const n=a.lengthSq();return n>0?a.multiplyScalar(1/Math.sqrt(n)):a.set(0,0,0)}static getBarycoord(e,t,r,a,n){ri.subVectors(a,t),Si.subVectors(r,t),Kn.subVectors(e,t);const s=ri.dot(ri),o=ri.dot(Si),c=ri.dot(Kn),l=Si.dot(Si),u=Si.dot(Kn),d=s*l-o*o;if(d===0)return n.set(0,0,0),null;const h=1/d,p=(l*c-o*u)*h,g=(s*u-o*c)*h;return n.set(1-p-g,g,p)}static containsPoint(e,t,r,a){return this.getBarycoord(e,t,r,a,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(e,t,r,a,n,s,o,c){return this.getBarycoord(e,t,r,a,bi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(n,bi.x),c.addScaledVector(s,bi.y),c.addScaledVector(o,bi.z),c)}static getInterpolatedAttribute(e,t,r,a,n,s){return ts.setScalar(0),is.setScalar(0),rs.setScalar(0),ts.fromBufferAttribute(e,t),is.fromBufferAttribute(e,r),rs.fromBufferAttribute(e,a),s.setScalar(0),s.addScaledVector(ts,n.x),s.addScaledVector(is,n.y),s.addScaledVector(rs,n.z),s}static isFrontFacing(e,t,r,a){return ri.subVectors(r,t),Si.subVectors(e,t),ri.cross(Si).dot(a)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,a){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,r,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ri.subVectors(this.c,this.b),Si.subVectors(this.a,this.b),ri.cross(Si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Nr.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Nr.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,a,n){return Nr.getInterpolation(e,this.a,this.b,this.c,t,r,a,n)}containsPoint(e){return Nr.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Nr.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,a=this.b,n=this.c;let s,o;Er.subVectors(a,r),Tr.subVectors(n,r),Jn.subVectors(e,r);const c=Er.dot(Jn),l=Tr.dot(Jn);if(c<=0&&l<=0)return t.copy(r);Qn.subVectors(e,a);const u=Er.dot(Qn),d=Tr.dot(Qn);if(u>=0&&d<=u)return t.copy(a);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return s=c/(c-u),t.copy(r).addScaledVector(Er,s);es.subVectors(e,n);const p=Er.dot(es),g=Tr.dot(es);if(g>=0&&p<=g)return t.copy(n);const y=p*l-c*g;if(y<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(r).addScaledVector(Tr,o);const f=u*g-p*d;if(f<=0&&d-u>=0&&p-g>=0)return Sl.subVectors(n,a),o=(d-u)/(d-u+(p-g)),t.copy(a).addScaledVector(Sl,o);const m=1/(f+y+h);return s=y*m,o=h*m,t.copy(r).addScaledVector(Er,s).addScaledVector(Tr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}};class mr{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(ai.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(ai.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=ai.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const n=r.getAttribute("position");if(t===!0&&n!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=n.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,ai):ai.fromBufferAttribute(n,s),ai.applyMatrix4(e.matrixWorld),this.expandByPoint(ai);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ba.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Ba.copy(r.boundingBox)),Ba.applyMatrix4(e.matrixWorld),this.union(Ba)}const a=e.children;for(let n=0,s=a.length;n<s;n++)this.expandByObject(a[n],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ai),ai.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ra),za.subVectors(this.max,ra),Ar.subVectors(e.a,ra),wr.subVectors(e.b,ra),Cr.subVectors(e.c,ra),Oi.subVectors(wr,Ar),Fi.subVectors(Cr,wr),Ji.subVectors(Ar,Cr);let t=[0,-Oi.z,Oi.y,0,-Fi.z,Fi.y,0,-Ji.z,Ji.y,Oi.z,0,-Oi.x,Fi.z,0,-Fi.x,Ji.z,0,-Ji.x,-Oi.y,Oi.x,0,-Fi.y,Fi.x,0,-Ji.y,Ji.x,0];return!as(t,Ar,wr,Cr,za)||(t=[1,0,0,0,1,0,0,0,1],!as(t,Ar,wr,Cr,za))?!1:(Ha.crossVectors(Oi,Fi),t=[Ha.x,Ha.y,Ha.z],as(t,Ar,wr,Cr,za))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ai).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ai).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ei=[new L,new L,new L,new L,new L,new L,new L,new L],ai=new L,Ba=new mr,Ar=new L,wr=new L,Cr=new L,Oi=new L,Fi=new L,Ji=new L,ra=new L,za=new L,Ha=new L,Qi=new L;function as(i,e,t,r,a){for(let n=0,s=i.length-3;n<=s;n+=3){Qi.fromArray(i,n);const o=a.x*Math.abs(Qi.x)+a.y*Math.abs(Qi.y)+a.z*Math.abs(Qi.z),c=e.dot(Qi),l=t.dot(Qi),u=r.dot(Qi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Mt=new L,ka=new Re;let Oh=0;class Gt{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Oh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=ll,this.updateRanges=[],this.gpuType=Jt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let a=0,n=this.itemSize;a<n;a++)this.array[e+a]=t.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)ka.fromBufferAttribute(this,t),ka.applyMatrix3(e),this.setXY(t,ka.x,ka.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix3(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)Mt.fromBufferAttribute(this,t),Mt.applyMatrix4(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)Mt.fromBufferAttribute(this,t),Mt.applyNormalMatrix(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)Mt.fromBufferAttribute(this,t),Mt.transformDirection(e),this.setXYZ(t,Mt.x,Mt.y,Mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=ea(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=Ot(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ea(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ea(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ea(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ea(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),r=Ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,a){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),r=Ot(r,this.array),a=Ot(a,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,t,r,a,n){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),r=Ot(r,this.array),a=Ot(a,this.array),n=Ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=n,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ll&&(e.usage=this.usage),e}}let qc=class extends Gt{constructor(e,t,r){super(new Uint16Array(e),t,r)}},Yc=class extends Gt{constructor(e,t,r){super(new Uint32Array(e),t,r)}};class Ut extends Gt{constructor(e,t,r){super(new Float32Array(e),t,r)}}const Fh=new mr,aa=new L,ns=new L;class Kr{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):Fh.setFromPoints(e).getCenter(r);let a=0;for(let n=0,s=e.length;n<s;n++)a=Math.max(a,r.distanceToSquared(e[n]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;aa.subVectors(e,this.center);const t=aa.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),a=(r-this.radius)*.5;this.center.addScaledVector(aa,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ns.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(aa.copy(e.center).add(ns)),this.expandByPoint(aa.copy(e.center).sub(ns))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Bh=0;const Yt=new nt,ss=new ei,Rr=new L,Xt=new mr,na=new mr,Tt=new L;class ut extends fr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bh++}),this.uuid=wa(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_h(e)?Yc:qc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const n=new He().getNormalMatrix(e);r.applyNormalMatrix(n),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yt.makeRotationFromQuaternion(e),this.applyMatrix4(Yt),this}rotateX(e){return Yt.makeRotationX(e),this.applyMatrix4(Yt),this}rotateY(e){return Yt.makeRotationY(e),this.applyMatrix4(Yt),this}rotateZ(e){return Yt.makeRotationZ(e),this.applyMatrix4(Yt),this}translate(e,t,r){return Yt.makeTranslation(e,t,r),this.applyMatrix4(Yt),this}scale(e,t,r){return Yt.makeScale(e,t,r),this.applyMatrix4(Yt),this}lookAt(e){return ss.lookAt(e),ss.updateMatrix(),this.applyMatrix4(ss.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rr).negate(),this.translate(Rr.x,Rr.y,Rr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const r=[];for(let a=0,n=e.length;a<n;a++){const s=e[a];r.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Ut(r,3))}else{const r=Math.min(e.length,t.count);for(let a=0;a<r;a++){const n=e[a];t.setXYZ(a,n.x,n.y,n.z||0)}e.length>t.count&&Ue("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const n=t[r];Xt.setFromBufferAttribute(n),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const r=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const o=t[n];na.setFromBufferAttribute(o),this.morphTargetsRelative?(Tt.addVectors(Xt.min,na.min),Xt.expandByPoint(Tt),Tt.addVectors(Xt.max,na.max),Xt.expandByPoint(Tt)):(Xt.expandByPoint(na.min),Xt.expandByPoint(na.max))}Xt.getCenter(r);let a=0;for(let n=0,s=e.count;n<s;n++)Tt.fromBufferAttribute(e,n),a=Math.max(a,r.distanceToSquared(Tt));if(t)for(let n=0,s=t.length;n<s;n++){const o=t[n],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Tt.fromBufferAttribute(o,l),c&&(Rr.fromBufferAttribute(e,l),Tt.add(Rr)),a=Math.max(a,r.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,a=t.normal,n=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gt(new Float32Array(4*r.count),4));const s=this.getAttribute("tangent"),o=[],c=[];for(let v=0;v<r.count;v++)o[v]=new L,c[v]=new L;const l=new L,u=new L,d=new L,h=new Re,p=new Re,g=new Re,y=new L,f=new L;function m(v,E,W){l.fromBufferAttribute(r,v),u.fromBufferAttribute(r,E),d.fromBufferAttribute(r,W),h.fromBufferAttribute(n,v),p.fromBufferAttribute(n,E),g.fromBufferAttribute(n,W),u.sub(l),d.sub(l),p.sub(h),g.sub(h);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(y.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(R),f.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(R),o[v].add(y),o[E].add(y),o[W].add(y),c[v].add(f),c[E].add(f),c[W].add(f))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let v=0,E=x.length;v<E;++v){const W=x[v],R=W.start,B=W.count;for(let H=R,V=R+B;H<V;H+=3)m(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const T=new L,S=new L,w=new L,A=new L;function P(v){w.fromBufferAttribute(a,v),A.copy(w);const E=o[v];T.copy(E),T.sub(w.multiplyScalar(w.dot(E))).normalize(),S.crossVectors(A,E);const W=S.dot(c[v])<0?-1:1;s.setXYZW(v,T.x,T.y,T.z,W)}for(let v=0,E=x.length;v<E;++v){const W=x[v],R=W.start,B=W.count;for(let H=R,V=R+B;H<V;H+=3)P(e.getX(H+0)),P(e.getX(H+1)),P(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Gt(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let h=0,p=r.count;h<p;h++)r.setXYZ(h,0,0,0);const a=new L,n=new L,s=new L,o=new L,c=new L,l=new L,u=new L,d=new L;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),y=e.getX(h+1),f=e.getX(h+2);a.fromBufferAttribute(t,g),n.fromBufferAttribute(t,y),s.fromBufferAttribute(t,f),u.subVectors(s,n),d.subVectors(a,n),u.cross(d),o.fromBufferAttribute(r,g),c.fromBufferAttribute(r,y),l.fromBufferAttribute(r,f),o.add(u),c.add(u),l.add(u),r.setXYZ(g,o.x,o.y,o.z),r.setXYZ(y,c.x,c.y,c.z),r.setXYZ(f,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)a.fromBufferAttribute(t,h+0),n.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),u.subVectors(s,n),d.subVectors(a,n),u.cross(d),r.setXYZ(h+0,u.x,u.y,u.z),r.setXYZ(h+1,u.x,u.y,u.z),r.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let p=0,g=0;for(let y=0,f=c.length;y<f;y++){o.isInterleavedBufferAttribute?p=c[y]*o.data.stride+o.offset:p=c[y]*u;for(let m=0;m<u;m++)h[g++]=l[p++]}return new Gt(h,u,d)}if(this.index===null)return Ue("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ut,r=this.index.array,a=this.attributes;for(const o in a){const c=a[o],l=e(c,r);t.setAttribute(o,l)}const n=this.morphAttributes;for(const o in n){const c=[],l=n[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],p=e(h,r);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,c=s.length;o<c;o++){const l=s[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const c in r){const l=r[c];e.data.attributes[c]=l.toJSON(e.data)}const a={};let n=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(a[c]=u,n=!0)}n&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const a=e.attributes;for(const l in a){const u=a[l];this.setAttribute(l,u.clone(t))}const n=e.morphAttributes;for(const l in n){const u=[],d=n[l];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,u=s.length;l<u;l++){const d=s[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let zh=0;class Ca extends fr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zh++}),this.uuid=wa(),this.name="",this.type="Material",this.blending=lr,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ls,this.blendDst=Ps,this.blendEquation=ar,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ae(0,0,0),this.blendAlpha=0,this.depthFunc=Wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ol,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mr,this.stencilZFail=Mr,this.stencilZPass=Mr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){Ue(`Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){Ue(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==lr&&(r.blending=this.blending),this.side!==si&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Ls&&(r.blendSrc=this.blendSrc),this.blendDst!==Ps&&(r.blendDst=this.blendDst),this.blendEquation!==ar&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Wr&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ol&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Mr&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Mr&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Mr&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.allowOverride===!1&&(r.allowOverride=!1),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(n){const s=[];for(const o in n){const c=n[o];delete c.metadata,s.push(c)}return s}if(t){const n=a(e.textures),s=a(e.images);n.length>0&&(r.textures=n),s.length>0&&(r.images=s)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const a=t.length;r=new Array(a);for(let n=0;n!==a;++n)r[n]=t[n].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ti=new L,os=new L,Ga=new L,Bi=new L,ls=new L,Va=new L,cs=new L;let Un=class{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ti)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ti.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ti.copy(this.origin).addScaledVector(this.direction,t),Ti.distanceToSquared(e))}distanceSqToSegment(e,t,r,a){os.copy(e).add(t).multiplyScalar(.5),Ga.copy(t).sub(e).normalize(),Bi.copy(this.origin).sub(os);const n=e.distanceTo(t)*.5,s=-this.direction.dot(Ga),o=Bi.dot(this.direction),c=-Bi.dot(Ga),l=Bi.lengthSq(),u=Math.abs(1-s*s);let d,h,p,g;if(u>0)if(d=s*c-o,h=s*o-c,g=n*u,d>=0)if(h>=-g)if(h<=g){const y=1/u;d*=y,h*=y,p=d*(d+s*h+2*o)+h*(s*d+h+2*c)+l}else h=n,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;else h=-n,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-s*n+o)),h=d>0?-n:Math.min(Math.max(-n,-c),n),p=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-n,-c),n),p=h*(h+2*c)+l):(d=Math.max(0,-(s*n+o)),h=d>0?n:Math.min(Math.max(-n,-c),n),p=-d*d+h*(h+2*c)+l);else h=s>0?-n:n,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;return r&&r.copy(this.origin).addScaledVector(this.direction,d),a&&a.copy(os).addScaledVector(Ga,h),p}intersectSphere(e,t){Ti.subVectors(e.center,this.origin);const r=Ti.dot(this.direction),a=Ti.dot(Ti)-r*r,n=e.radius*e.radius;if(a>n)return null;const s=Math.sqrt(n-a),o=r-s,c=r+s;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,a,n,s,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(r=(e.min.x-h.x)*l,a=(e.max.x-h.x)*l):(r=(e.max.x-h.x)*l,a=(e.min.x-h.x)*l),u>=0?(n=(e.min.y-h.y)*u,s=(e.max.y-h.y)*u):(n=(e.max.y-h.y)*u,s=(e.min.y-h.y)*u),r>s||n>a||((n>r||isNaN(r))&&(r=n),(s<a||isNaN(a))&&(a=s),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),r>c||o>a)||((o>r||r!==r)&&(r=o),(c<a||a!==a)&&(a=c),a<0)?null:this.at(r>=0?r:a,t)}intersectsBox(e){return this.intersectBox(e,Ti)!==null}intersectTriangle(e,t,r,a,n){ls.subVectors(t,e),Va.subVectors(r,e),cs.crossVectors(ls,Va);let s=this.direction.dot(cs),o;if(s>0){if(a)return null;o=1}else if(s<0)o=-1,s=-s;else return null;Bi.subVectors(this.origin,e);const c=o*this.direction.dot(Va.crossVectors(Bi,Va));if(c<0)return null;const l=o*this.direction.dot(ls.cross(Bi));if(l<0||c+l>s)return null;const u=-o*Bi.dot(cs);return u<0?null:this.at(u/s,n)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},di=class extends Ca{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hr,this.combine=Cc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};const bl=new nt,er=new Un,Wa=new Kr,El=new L,Xa=new L,ja=new L,$a=new L,us=new L,qa=new L,Tl=new L,Ya=new L;class ot extends ei{constructor(e=new ut,t=new di){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const r=e[t[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,n=r.length;a<n;a++){const s=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=a}}}}getVertexPosition(e,t){const r=this.geometry,a=r.attributes.position,n=r.morphAttributes.position,s=r.morphTargetsRelative;t.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(n&&o){qa.set(0,0,0);for(let c=0,l=n.length;c<l;c++){const u=o[c],d=n[c];u!==0&&(us.fromBufferAttribute(d,e),s?qa.addScaledVector(us,u):qa.addScaledVector(us.sub(t),u))}t.add(qa)}return t}raycast(e,t){const r=this.geometry,a=this.material,n=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Wa.copy(r.boundingSphere),Wa.applyMatrix4(n),er.copy(e.ray).recast(e.near),!(Wa.containsPoint(er.origin)===!1&&(er.intersectSphere(Wa,El)===null||er.origin.distanceToSquared(El)>(e.far-e.near)**2))&&(bl.copy(n).invert(),er.copy(e.ray).applyMatrix4(bl),!(r.boundingBox!==null&&er.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,er)))}_computeIntersections(e,t,r){let a;const n=this.geometry,s=this.material,o=n.index,c=n.attributes.position,l=n.attributes.uv,u=n.attributes.uv1,d=n.attributes.normal,h=n.groups,p=n.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,y=h.length;g<y;g++){const f=h[g],m=s[f.materialIndex],x=Math.max(f.start,p.start),T=Math.min(o.count,Math.min(f.start+f.count,p.start+p.count));for(let S=x,w=T;S<w;S+=3){const A=o.getX(S),P=o.getX(S+1),v=o.getX(S+2);a=Za(this,m,e,r,l,u,d,A,P,v),a&&(a.faceIndex=Math.floor(S/3),a.face.materialIndex=f.materialIndex,t.push(a))}}else{const g=Math.max(0,p.start),y=Math.min(o.count,p.start+p.count);for(let f=g,m=y;f<m;f+=3){const x=o.getX(f),T=o.getX(f+1),S=o.getX(f+2);a=Za(this,s,e,r,l,u,d,x,T,S),a&&(a.faceIndex=Math.floor(f/3),t.push(a))}}else if(c!==void 0)if(Array.isArray(s))for(let g=0,y=h.length;g<y;g++){const f=h[g],m=s[f.materialIndex],x=Math.max(f.start,p.start),T=Math.min(c.count,Math.min(f.start+f.count,p.start+p.count));for(let S=x,w=T;S<w;S+=3){const A=S,P=S+1,v=S+2;a=Za(this,m,e,r,l,u,d,A,P,v),a&&(a.faceIndex=Math.floor(S/3),a.face.materialIndex=f.materialIndex,t.push(a))}}else{const g=Math.max(0,p.start),y=Math.min(c.count,p.start+p.count);for(let f=g,m=y;f<m;f+=3){const x=f,T=f+1,S=f+2;a=Za(this,s,e,r,l,u,d,x,T,S),a&&(a.faceIndex=Math.floor(f/3),t.push(a))}}}}function Hh(i,e,t,r,a,n,s,o){let c;if(e.side===Dt?c=r.intersectTriangle(s,n,a,!0,o):c=r.intersectTriangle(a,n,s,e.side===si,o),c===null)return null;Ya.copy(o),Ya.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ya);return l<t.near||l>t.far?null:{distance:l,point:Ya.clone(),object:i}}function Za(i,e,t,r,a,n,s,o,c,l){i.getVertexPosition(o,Xa),i.getVertexPosition(c,ja),i.getVertexPosition(l,$a);const u=Hh(i,e,t,r,Xa,ja,$a,Tl);if(u){const d=new L;ia.getBarycoord(Tl,Xa,ja,$a,d),a&&(u.uv=ia.getInterpolatedAttribute(a,o,c,l,d,new Re)),n&&(u.uv1=ia.getInterpolatedAttribute(n,o,c,l,d,new Re)),s&&(u.normal=ia.getInterpolatedAttribute(s,o,c,l,d,new L),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new L,materialIndex:0};ia.getNormal(Xa,ja,$a,h.normal),u.face=h,u.barycoord=d}return u}let Wo=class extends qt{constructor(e=null,t=1,r=1,a,n,s,o,c,l=Ct,u=Ct,d,h){super(null,s,o,c,l,u,a,n,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},cr=class extends Gt{constructor(e,t,r,a=1){super(e,t,r),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}};const Lr=new nt,Al=new nt,Ka=[],wl=new mr,kh=new nt,sa=new ot,oa=new Kr;class Gh extends ot{constructor(e,t,r){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new cr(new Float32Array(r*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=r,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<r;a++)this.setMatrixAt(a,kh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new mr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let r=0;r<t;r++)this.getMatrixAt(r,Lr),wl.copy(e.boundingBox).applyMatrix4(Lr),this.boundingBox.union(wl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Kr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let r=0;r<t;r++)this.getMatrixAt(r,Lr),oa.copy(e.boundingSphere).applyMatrix4(Lr),this.boundingSphere.union(oa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const r=t.morphTargetInfluences,a=this.morphTexture.source.data.data,n=r.length+1,s=e*n+1;for(let o=0;o<r.length;o++)r[o]=a[s+o]}raycast(e,t){const r=this.matrixWorld,a=this.count;if(sa.geometry=this.geometry,sa.material=this.material,sa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),oa.copy(this.boundingSphere),oa.applyMatrix4(r),e.ray.intersectsSphere(oa)!==!1))for(let n=0;n<a;n++){this.getMatrixAt(n,Lr),Al.multiplyMatrices(r,Lr),sa.matrixWorld=Al,sa.raycast(e,Ka);for(let s=0,o=Ka.length;s<o;s++){const c=Ka[s];c.instanceId=n,c.object=this,t.push(c)}Ka.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new cr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const r=t.morphTargetInfluences,a=r.length+1;this.morphTexture===null&&(this.morphTexture=new Wo(new Float32Array(a*this.count),a,this.count,No,Jt));const n=this.morphTexture.source.data.data;let s=0;for(let l=0;l<r.length;l++)s+=r[l];const o=this.geometry.morphTargetsRelative?1:1-s,c=a*e;n[c]=o,n.set(r,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const hs=new L,Vh=new L,Wh=new He;class Hi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,a){return this.normal.set(e,t,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const a=hs.subVectors(r,t).cross(Vh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(hs),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const n=-(e.start.dot(this.normal)+this.constant)/a;return n<0||n>1?null:t.copy(e.start).addScaledVector(r,n)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||Wh.getNormalMatrix(e),a=this.coplanarPoint(hs).applyMatrix4(e),n=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(n),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const tr=new Kr,Xh=new Re(.5,.5),Ja=new L;let Zc=class{constructor(e=new Hi,t=new Hi,r=new Hi,a=new Hi,n=new Hi,s=new Hi){this.planes=[e,t,r,a,n,s]}set(e,t,r,a,n,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(r),o[3].copy(a),o[4].copy(n),o[5].copy(s),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=pi,r=!1){const a=this.planes,n=e.elements,s=n[0],o=n[1],c=n[2],l=n[3],u=n[4],d=n[5],h=n[6],p=n[7],g=n[8],y=n[9],f=n[10],m=n[11],x=n[12],T=n[13],S=n[14],w=n[15];if(a[0].setComponents(l-s,p-u,m-g,w-x).normalize(),a[1].setComponents(l+s,p+u,m+g,w+x).normalize(),a[2].setComponents(l+o,p+d,m+y,w+T).normalize(),a[3].setComponents(l-o,p-d,m-y,w-T).normalize(),r)a[4].setComponents(c,h,f,S).normalize(),a[5].setComponents(l-c,p-h,m-f,w-S).normalize();else if(a[4].setComponents(l-c,p-h,m-f,w-S).normalize(),t===pi)a[5].setComponents(l+c,p+h,m+f,w+S).normalize();else if(t===An)a[5].setComponents(c,h,f,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),tr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),tr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(tr)}intersectsSprite(e){tr.center.set(0,0,0);const t=Xh.distanceTo(e.center);return tr.radius=.7071067811865476+t,tr.applyMatrix4(e.matrixWorld),this.intersectsSphere(tr)}intersectsSphere(e){const t=this.planes,r=e.center,a=-e.radius;for(let n=0;n<6;n++)if(t[n].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const a=t[r];if(Ja.x=a.normal.x>0?e.max.x:e.min.x,Ja.y=a.normal.y>0?e.max.y:e.min.y,Ja.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Ja)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};class Kt extends Ca{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Cn=new L,Rn=new L,Cl=new nt,la=new Un,Qa=new Kr,ds=new L,Rl=new L;let Ai=class extends ei{constructor(e=new ut,t=new Kt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let a=1,n=t.count;a<n;a++)Cn.fromBufferAttribute(t,a-1),Rn.fromBufferAttribute(t,a),r[a]=r[a-1],r[a]+=Cn.distanceTo(Rn);e.setAttribute("lineDistance",new Ut(r,1))}else Ue("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,a=this.matrixWorld,n=e.params.Line.threshold,s=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Qa.copy(r.boundingSphere),Qa.applyMatrix4(a),Qa.radius+=n,e.ray.intersectsSphere(Qa)===!1)return;Cl.copy(a).invert(),la.copy(e.ray).applyMatrix4(Cl);const o=n/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=r.index,d=r.attributes.position;if(u!==null){const h=Math.max(0,s.start),p=Math.min(u.count,s.start+s.count);for(let g=h,y=p-1;g<y;g+=l){const f=u.getX(g),m=u.getX(g+1),x=en(this,e,la,c,f,m,g);x&&t.push(x)}if(this.isLineLoop){const g=u.getX(p-1),y=u.getX(h),f=en(this,e,la,c,g,y,p-1);f&&t.push(f)}}else{const h=Math.max(0,s.start),p=Math.min(d.count,s.start+s.count);for(let g=h,y=p-1;g<y;g+=l){const f=en(this,e,la,c,g,g+1,g);f&&t.push(f)}if(this.isLineLoop){const g=en(this,e,la,c,p-1,h,p-1);g&&t.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const r=e[t[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,n=r.length;a<n;a++){const s=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=a}}}}};function en(i,e,t,r,a,n,s){const o=i.geometry.attributes.position;if(Cn.fromBufferAttribute(o,a),Rn.fromBufferAttribute(o,n),t.distanceSqToSegment(Cn,Rn,ds,Rl)>r)return;ds.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ds);if(!(c<e.near||c>e.far))return{distance:c,point:Rl.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Ll=new L,Pl=new L;class jh extends Ai{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[];for(let a=0,n=t.count;a<n;a+=2)Ll.fromBufferAttribute(t,a),Pl.fromBufferAttribute(t,a+1),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+Ll.distanceTo(Pl);e.setAttribute("lineDistance",new Ut(r,1))}else Ue("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Kc extends Ai{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}let Jc=class extends qt{constructor(e=[],t=ur,r,a,n,s,o,c,l,u){super(e,t,r,a,n,s,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};class xo extends qt{constructor(e,t,r,a,n,s,o,c,l){super(e,t,r,a,n,s,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Sa extends qt{constructor(e,t,r=_i,a,n,s,o=Ct,c=Ct,l,u=Di,d=1){if(u!==Di&&u!==or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,a,n,s,o,c,u,r,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ko(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class $h extends Sa{constructor(e,t=_i,r=ur,a,n,s=Ct,o=Ct,c,l=Di){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,r,a,n,s,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Qc extends qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ra extends ut{constructor(e=1,t=1,r=1,a=1,n=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:a,heightSegments:n,depthSegments:s};const o=this;a=Math.floor(a),n=Math.floor(n),s=Math.floor(s);const c=[],l=[],u=[],d=[];let h=0,p=0;g("z","y","x",-1,-1,r,t,e,s,n,0),g("z","y","x",1,-1,r,t,-e,s,n,1),g("x","z","y",1,1,e,r,t,a,s,2),g("x","z","y",1,-1,e,r,-t,a,s,3),g("x","y","z",1,-1,e,t,r,a,n,4),g("x","y","z",-1,-1,e,t,-r,a,n,5),this.setIndex(c),this.setAttribute("position",new Ut(l,3)),this.setAttribute("normal",new Ut(u,3)),this.setAttribute("uv",new Ut(d,2));function g(y,f,m,x,T,S,w,A,P,v,E){const W=S/P,R=w/v,B=S/2,H=w/2,V=A/2,k=P+1,z=v+1;let O=0,Q=0;const Z=new L;for(let le=0;le<z;le++){const de=le*R-H;for(let Me=0;Me<k;Me++){const ae=Me*W-B;Z[y]=ae*x,Z[f]=de*T,Z[m]=V,l.push(Z.x,Z.y,Z.z),Z[y]=0,Z[f]=0,Z[m]=A>0?1:-1,u.push(Z.x,Z.y,Z.z),d.push(Me/P),d.push(1-le/v),O+=1}}for(let le=0;le<v;le++)for(let de=0;de<P;de++){const Me=h+de+k*le,ae=h+de+k*(le+1),Fe=h+(de+1)+k*(le+1),Ne=h+(de+1)+k*le;c.push(Me,ae,Ne),c.push(ae,Fe,Ne),Q+=6}o.addGroup(p,Q,E),p+=Q,h+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ra(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class qh{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ue("Curve: .getPoint() not implemented.")}getPointAt(e,t){const r=this.getUtoTmapping(e);return this.getPoint(r,t)}getPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPoint(r/e));return t}getSpacedPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPointAt(r/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let r,a=this.getPoint(0),n=0;t.push(0);for(let s=1;s<=e;s++)r=this.getPoint(s/e),n+=r.distanceTo(a),t.push(n),a=r;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const r=this.getLengths();let a=0;const n=r.length;let s;t?s=t:s=e*r[n-1];let o=0,c=n-1,l;for(;o<=c;)if(a=Math.floor(o+(c-o)/2),l=r[a]-s,l<0)o=a+1;else if(l>0)c=a-1;else{c=a;break}if(a=c,r[a]===s)return a/(n-1);const u=r[a],d=r[a+1]-u,h=(s-u)/d;return(a+h)/(n-1)}getTangent(e,t){let r=e-1e-4,a=e+1e-4;r<0&&(r=0),a>1&&(a=1);const n=this.getPoint(r),s=this.getPoint(a),o=t||(n.isVector2?new Re:new L);return o.copy(s).sub(n).normalize(),o}getTangentAt(e,t){const r=this.getUtoTmapping(e);return this.getTangent(r,t)}computeFrenetFrames(e,t=!1){const r=new L,a=[],n=[],s=[],o=new L,c=new nt;for(let p=0;p<=e;p++){const g=p/e;a[p]=this.getTangentAt(g,new L)}n[0]=new L,s[0]=new L;let l=Number.MAX_VALUE;const u=Math.abs(a[0].x),d=Math.abs(a[0].y),h=Math.abs(a[0].z);u<=l&&(l=u,r.set(1,0,0)),d<=l&&(l=d,r.set(0,1,0)),h<=l&&r.set(0,0,1),o.crossVectors(a[0],r).normalize(),n[0].crossVectors(a[0],o),s[0].crossVectors(a[0],n[0]);for(let p=1;p<=e;p++){if(n[p]=n[p-1].clone(),s[p]=s[p-1].clone(),o.crossVectors(a[p-1],a[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ke(a[p-1].dot(a[p]),-1,1));n[p].applyMatrix4(c.makeRotationAxis(o,g))}s[p].crossVectors(a[p],n[p])}if(t===!0){let p=Math.acos(ke(n[0].dot(n[e]),-1,1));p/=e,a[0].dot(o.crossVectors(n[0],n[e]))>0&&(p=-p);for(let g=1;g<=e;g++)n[g].applyMatrix4(c.makeRotationAxis(a[g],p*g)),s[g].crossVectors(a[g],n[g])}return{tangents:a,normals:n,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function Yh(i,e){const t=1-i;return t*t*e}function Zh(i,e){return 2*(1-i)*i*e}function Kh(i,e){return i*i*e}function ps(i,e,t,r){return Yh(i,e)+Zh(i,t)+Kh(i,r)}class Jh extends qh{constructor(e=new L,t=new L,r=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=r}getPoint(e,t=new L){const r=t,a=this.v0,n=this.v1,s=this.v2;return r.set(ps(e,a.x,n.x,s.x),ps(e,a.y,n.y,s.y),ps(e,a.z,n.z,s.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class qi extends ut{constructor(e=1,t=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:a};const n=e/2,s=t/2,o=Math.floor(r),c=Math.floor(a),l=o+1,u=c+1,d=e/o,h=t/c,p=[],g=[],y=[],f=[];for(let m=0;m<u;m++){const x=m*h-s;for(let T=0;T<l;T++){const S=T*d-n;g.push(S,-x,0),y.push(0,0,1),f.push(T/o),f.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<o;x++){const T=x+l*m,S=x+l*(m+1),w=x+1+l*(m+1),A=x+1+l*m;p.push(T,S,A),p.push(S,w,A)}this.setIndex(p),this.setAttribute("position",new Ut(g,3)),this.setAttribute("normal",new Ut(y,3)),this.setAttribute("uv",new Ut(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qi(e.width,e.height,e.widthSegments,e.heightSegments)}}class Pi extends ut{constructor(e=1,t=32,r=16,a=0,n=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:a,phiLength:n,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const c=Math.min(s+o,Math.PI);let l=0;const u=[],d=new L,h=new L,p=[],g=[],y=[],f=[];for(let m=0;m<=r;m++){const x=[],T=m/r;let S=0;m===0&&s===0?S=.5/t:m===r&&c===Math.PI&&(S=-.5/t);for(let w=0;w<=t;w++){const A=w/t;d.x=-e*Math.cos(a+A*n)*Math.sin(s+T*o),d.y=e*Math.cos(s+T*o),d.z=e*Math.sin(a+A*n)*Math.sin(s+T*o),g.push(d.x,d.y,d.z),h.copy(d).normalize(),y.push(h.x,h.y,h.z),f.push(A+S,1-T),x.push(l++)}u.push(x)}for(let m=0;m<r;m++)for(let x=0;x<t;x++){const T=u[m][x+1],S=u[m][x],w=u[m+1][x],A=u[m+1][x+1];(m!==0||s>0)&&p.push(T,S,A),(m!==r-1||c<Math.PI)&&p.push(S,w,A)}this.setIndex(p),this.setAttribute("position",new Ut(g,3)),this.setAttribute("normal",new Ut(y,3)),this.setAttribute("uv",new Ut(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function qr(i){const e={};for(const t in i){e[t]={};for(const r in i[t]){const a=i[t][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(Ue("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=a.clone():Array.isArray(a)?e[t][r]=a.slice():e[t][r]=a}}return e}function Nt(i){const e={};for(let t=0;t<i.length;t++){const r=qr(i[t]);for(const a in r)e[a]=r[a]}return e}function Qh(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function eu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const Ln={clone:qr,merge:Nt};var ed=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,td=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;let ht=class extends Ca{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ed,this.fragmentShader=td,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qr(e.uniforms),this.uniformsGroups=Qh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const n=this.uniforms[a].value;n&&n.isTexture?t.uniforms[a]={type:"t",value:n.toJSON(e).uuid}:n&&n.isColor?t.uniforms[a]={type:"c",value:n.getHex()}:n&&n.isVector2?t.uniforms[a]={type:"v2",value:n.toArray()}:n&&n.isVector3?t.uniforms[a]={type:"v3",value:n.toArray()}:n&&n.isVector4?t.uniforms[a]={type:"v4",value:n.toArray()}:n&&n.isMatrix3?t.uniforms[a]={type:"m3",value:n.toArray()}:n&&n.isMatrix4?t.uniforms[a]={type:"m4",value:n.toArray()}:t.uniforms[a]={value:n}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}};class id extends ht{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class rd extends Ca{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ad extends Ca{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const fs={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Dl(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Dl(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Dl(i){try{const e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class nd{constructor(e,t,r){const a=this;let n=!1,s=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=r,this._abortController=null,this.itemStart=function(u){o++,n===!1&&a.onStart!==void 0&&a.onStart(u,s,o),n=!0},this.itemEnd=function(u){s++,a.onProgress!==void 0&&a.onProgress(u,s,o),s===o&&(n=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(u){a.onError!==void 0&&a.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){const d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){const p=l[d],g=l[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const sd=new nd;let Xo=class{constructor(e){this.manager=e!==void 0?e:sd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const r=this;return new Promise(function(a,n){r.load(e,a,t,n)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Xo.DEFAULT_MATERIAL_NAME="__DEFAULT";const Pr=new WeakMap;class od extends Xo{constructor(e){super(e)}load(e,t,r,a){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const n=this,s=fs.get(`image:${e}`);if(s!==void 0){if(s.complete===!0)n.manager.itemStart(e),setTimeout(function(){t&&t(s),n.manager.itemEnd(e)},0);else{let d=Pr.get(s);d===void 0&&(d=[],Pr.set(s,d)),d.push({onLoad:t,onError:a})}return s}const o=ya("img");function c(){u(),t&&t(this);const d=Pr.get(this)||[];for(let h=0;h<d.length;h++){const p=d[h];p.onLoad&&p.onLoad(this)}Pr.delete(this),n.manager.itemEnd(e)}function l(d){u(),a&&a(d),fs.remove(`image:${e}`);const h=Pr.get(this)||[];for(let p=0;p<h.length;p++){const g=h[p];g.onError&&g.onError(d)}Pr.delete(this),n.manager.itemError(e),n.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),fs.add(`image:${e}`,o),n.manager.itemStart(e),o.src=e,o}}class ld extends Xo{constructor(e){super(e)}load(e,t,r,a){const n=new qt,s=new od(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(o){n.image=o,n.needsUpdate=!0,t!==void 0&&t(n)},r,a),n}}const tn=new L,rn=new ji,li=new L;class tu extends ei{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=pi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(tn,rn,li),li.x===1&&li.y===1&&li.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(tn,rn,li.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(tn,rn,li),li.x===1&&li.y===1&&li.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(tn,rn,li.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const zi=new L,Il=new Re,Ul=new Re;let jt=class extends tu{constructor(e=50,t=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Mo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Mo*2*Math.atan(Math.tan(fn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(zi.x,zi.y).multiplyScalar(-e/zi.z),zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(zi.x,zi.y).multiplyScalar(-e/zi.z)}getViewSize(e,t){return this.getViewBounds(e,Il,Ul),t.subVectors(Ul,Il)}setViewOffset(e,t,r,a,n,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=n,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(fn*.5*this.fov)/this.zoom,r=2*t,a=this.aspect*r,n=-.5*a;const s=this.view;if(this.view!==null&&this.view.enabled){const c=s.fullWidth,l=s.fullHeight;n+=s.offsetX*a/c,t-=s.offsetY*r/l,a*=s.width/c,r*=s.height/l}const o=this.filmOffset;o!==0&&(n+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(n,n+a,t,t-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};class Nn extends tu{constructor(e=-1,t=1,r=1,a=-1,n=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=a,this.near=n,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,a,n,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=n,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let n=r-e,s=r+e,o=a+t,c=a-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;n+=l*this.view.offsetX,s=n+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(n,s,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class cd extends ut{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Dr=-90,Ir=1;class ud extends ei{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new jt(Dr,Ir,e,t);a.layers=this.layers,this.add(a);const n=new jt(Dr,Ir,e,t);n.layers=this.layers,this.add(n);const s=new jt(Dr,Ir,e,t);s.layers=this.layers,this.add(s);const o=new jt(Dr,Ir,e,t);o.layers=this.layers,this.add(o);const c=new jt(Dr,Ir,e,t);c.layers=this.layers,this.add(c);const l=new jt(Dr,Ir,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,a,n,s,o,c]=t;for(const l of t)this.remove(l);if(e===pi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),n.up.set(0,0,-1),n.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===An)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),n.up.set(0,0,1),n.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[n,s,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=r.texture.generateMipmaps;r.texture.generateMipmaps=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(r,0,a),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,n),e.setRenderTarget(r,1,a),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(r,2,a),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(r,3,a),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(r,4,a),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),r.texture.generateMipmaps=y,e.setRenderTarget(r,5,a),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=g,r.texture.needsPMREMUpdate=!0}}class hd extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class dd{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=pd.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function pd(){this._document.hidden===!1&&this.reset()}const Nl=new nt;class fd{constructor(e,t,r=0,a=1/0){this.ray=new Un(e,t),this.near=r,this.far=a,this.camera=null,this.layers=new Go,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Xe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Nl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Nl),this}intersectObject(e,t=!0,r=[]){return yo(e,this,r,t),r.sort(Ol),r}intersectObjects(e,t=!0,r=[]){for(let a=0,n=e.length;a<n;a++)yo(e[a],this,r,t);return r.sort(Ol),r}}function Ol(i,e){return i.distance-e.distance}function yo(i,e,t,r){let a=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(a=!1),a===!0&&r===!0){const n=i.children;for(let s=0,o=n.length;s<o;s++)yo(n[s],e,t,!0)}}class Fl{constructor(e=1,t=0,r=0){this.radius=e,this.phi=t,this.theta=r}set(e,t,r){return this.radius=e,this.phi=t,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,r){return this.radius=Math.sqrt(e*e+t*t+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class md extends fr{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ue("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Bl(i,e,t,r){const a=gd(r);switch(t){case kc:return i*e;case No:return i*e/a.components*a.byteLength;case Oo:return i*e/a.components*a.byteLength;case jr:return i*e*2/a.components*a.byteLength;case Fo:return i*e*2/a.components*a.byteLength;case Gc:return i*e*3/a.components*a.byteLength;case Qt:return i*e*4/a.components*a.byteLength;case Bo:return i*e*4/a.components*a.byteLength;case un:case hn:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case dn:case pn:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ks:case Vs:return Math.max(i,16)*Math.max(e,8)/4;case Hs:case Gs:return Math.max(i,8)*Math.max(e,8)/2;case Ws:case Xs:case $s:case qs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case js:case Ys:case Zs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ks:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Js:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Qs:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case eo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case to:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case io:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ro:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ao:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case no:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case so:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case oo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case lo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case co:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case uo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ho:case po:case fo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case mo:case go:return Math.ceil(i/4)*Math.ceil(e/4)*8;case _o:case vo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function gd(i){switch(i){case Zt:case Fc:return{byteLength:1,components:1};case Ma:case Bc:case $t:return{byteLength:2,components:1};case Io:case Uo:return{byteLength:2,components:4};case _i:case Do:case Jt:return{byteLength:4,components:1};case zc:case Hc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Po}}));typeof window<"u"&&(window.__THREE__?Ue("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Po);/**
* @license
* Copyright 2010-2026 Three.js Authors
* SPDX-License-Identifier: MIT
*/function iu(){let i=null,e=!1,t=null,r=null;function a(n,s){t(n,s),r=i.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(r=i.requestAnimationFrame(a),e=!0)},stop:function(){i.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(n){t=n},setContext:function(n){i=n}}}function _d(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function r(o,c,l){const u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<d.length;p++){const g=d[h],y=d[p];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++h,d[h]=y)}d.length=h+1;for(let p=0,g=d.length;p<g;p++){const y=d[p];i.bufferSubData(l,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function n(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function s(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(l.buffer,o,c),l.version=o.version}}return{get:a,remove:n,update:s}}var vd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Md=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,xd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ed=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Td=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ad=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,wd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Cd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ld=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Pd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Dd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Id=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ud=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Bd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,zd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Hd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,kd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Gd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Vd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Wd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Xd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,jd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$d=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Yd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Kd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Jd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Qd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ep=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ip=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ap=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,np=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,sp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,op=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,up=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,hp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,pp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,gp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,_p=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Mp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ep=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Tp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ap=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,wp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Lp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ip=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Up=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Np=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Op=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Hp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,kp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,$p=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Yp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ef=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,tf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,rf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,af=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,sf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,of=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,lf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,uf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,df=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,pf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ff=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,_f=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Mf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ef=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Tf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Af=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,wf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Pf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Df=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,If=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Of=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ff=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,zf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Hf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Vf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,$f=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Kf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Be={alphahash_fragment:vd,alphahash_pars_fragment:Md,alphamap_fragment:xd,alphamap_pars_fragment:yd,alphatest_fragment:Sd,alphatest_pars_fragment:bd,aomap_fragment:Ed,aomap_pars_fragment:Td,batching_pars_vertex:Ad,batching_vertex:wd,begin_vertex:Cd,beginnormal_vertex:Rd,bsdfs:Ld,iridescence_fragment:Pd,bumpmap_pars_fragment:Dd,clipping_planes_fragment:Id,clipping_planes_pars_fragment:Ud,clipping_planes_pars_vertex:Nd,clipping_planes_vertex:Od,color_fragment:Fd,color_pars_fragment:Bd,color_pars_vertex:zd,color_vertex:Hd,common:kd,cube_uv_reflection_fragment:Gd,defaultnormal_vertex:Vd,displacementmap_pars_vertex:Wd,displacementmap_vertex:Xd,emissivemap_fragment:jd,emissivemap_pars_fragment:$d,colorspace_fragment:qd,colorspace_pars_fragment:Yd,envmap_fragment:Zd,envmap_common_pars_fragment:Kd,envmap_pars_fragment:Jd,envmap_pars_vertex:Qd,envmap_physical_pars_fragment:up,envmap_vertex:ep,fog_vertex:tp,fog_pars_vertex:ip,fog_fragment:rp,fog_pars_fragment:ap,gradientmap_pars_fragment:np,lightmap_pars_fragment:sp,lights_lambert_fragment:op,lights_lambert_pars_fragment:lp,lights_pars_begin:cp,lights_toon_fragment:hp,lights_toon_pars_fragment:dp,lights_phong_fragment:pp,lights_phong_pars_fragment:fp,lights_physical_fragment:mp,lights_physical_pars_fragment:gp,lights_fragment_begin:_p,lights_fragment_maps:vp,lights_fragment_end:Mp,logdepthbuf_fragment:xp,logdepthbuf_pars_fragment:yp,logdepthbuf_pars_vertex:Sp,logdepthbuf_vertex:bp,map_fragment:Ep,map_pars_fragment:Tp,map_particle_fragment:Ap,map_particle_pars_fragment:wp,metalnessmap_fragment:Cp,metalnessmap_pars_fragment:Rp,morphinstance_vertex:Lp,morphcolor_vertex:Pp,morphnormal_vertex:Dp,morphtarget_pars_vertex:Ip,morphtarget_vertex:Up,normal_fragment_begin:Np,normal_fragment_maps:Op,normal_pars_fragment:Fp,normal_pars_vertex:Bp,normal_vertex:zp,normalmap_pars_fragment:Hp,clearcoat_normal_fragment_begin:kp,clearcoat_normal_fragment_maps:Gp,clearcoat_pars_fragment:Vp,iridescence_pars_fragment:Wp,opaque_fragment:Xp,packing:jp,premultiplied_alpha_fragment:$p,project_vertex:qp,dithering_fragment:Yp,dithering_pars_fragment:Zp,roughnessmap_fragment:Kp,roughnessmap_pars_fragment:Jp,shadowmap_pars_fragment:Qp,shadowmap_pars_vertex:ef,shadowmap_vertex:tf,shadowmask_pars_fragment:rf,skinbase_vertex:af,skinning_pars_vertex:nf,skinning_vertex:sf,skinnormal_vertex:of,specularmap_fragment:lf,specularmap_pars_fragment:cf,tonemapping_fragment:uf,tonemapping_pars_fragment:hf,transmission_fragment:df,transmission_pars_fragment:pf,uv_pars_fragment:ff,uv_pars_vertex:mf,uv_vertex:gf,worldpos_vertex:_f,background_vert:vf,background_frag:Mf,backgroundCube_vert:xf,backgroundCube_frag:yf,cube_vert:Sf,cube_frag:bf,depth_vert:Ef,depth_frag:Tf,distance_vert:Af,distance_frag:wf,equirect_vert:Cf,equirect_frag:Rf,linedashed_vert:Lf,linedashed_frag:Pf,meshbasic_vert:Df,meshbasic_frag:If,meshlambert_vert:Uf,meshlambert_frag:Nf,meshmatcap_vert:Of,meshmatcap_frag:Ff,meshnormal_vert:Bf,meshnormal_frag:zf,meshphong_vert:Hf,meshphong_frag:kf,meshphysical_vert:Gf,meshphysical_frag:Vf,meshtoon_vert:Wf,meshtoon_frag:Xf,points_vert:jf,points_frag:$f,shadow_vert:qf,shadow_frag:Yf,sprite_vert:Zf,sprite_frag:Kf},ce={common:{diffuse:{value:new Ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Ae(16777215)},opacity:{value:1},center:{value:new Re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},hi={basic:{uniforms:Nt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Nt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ae(0)},envMapIntensity:{value:1}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Nt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ae(0)},specular:{value:new Ae(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Nt([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Nt([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Ae(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Nt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Nt([ce.points,ce.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Nt([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Nt([ce.common,ce.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Nt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Nt([ce.sprite,ce.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distance:{uniforms:Nt([ce.common,ce.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distance_vert,fragmentShader:Be.distance_frag},shadow:{uniforms:Nt([ce.lights,ce.fog,{color:{value:new Ae(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};hi.physical={uniforms:Nt([hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Ae(0)},specularColor:{value:new Ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const an={r:0,b:0,g:0},ir=new hr,Jf=new nt;function Qf(i,e,t,r,a,n){const s=new Ae(0);let o=a===!0?0:1,c,l,u=null,d=0,h=null;function p(x){let T=x.isScene===!0?x.background:null;if(T&&T.isTexture){const S=x.backgroundBlurriness>0;T=e.get(T,S)}return T}function g(x){let T=!1;const S=p(x);S===null?f(s,o):S&&S.isColor&&(f(S,1),T=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,n):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,n),(i.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(x,T){const S=p(T);S&&(S.isCubeTexture||S.mapping===In)?(l===void 0&&(l=new ot(new Ra(1,1,1),new ht({name:"BackgroundCubeMaterial",uniforms:qr(hi.backgroundCube.uniforms),vertexShader:hi.backgroundCube.vertexShader,fragmentShader:hi.backgroundCube.fragmentShader,side:Dt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),ir.copy(T.backgroundRotation),ir.x*=-1,ir.y*=-1,ir.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ir.y*=-1,ir.z*=-1),l.material.uniforms.envMap.value=S,l.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Jf.makeRotationFromEuler(ir)),l.material.toneMapped=je.getTransfer(S.colorSpace)!==Ke,(u!==S||d!==S.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,h=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new ot(new qi(2,2),new ht({name:"BackgroundMaterial",uniforms:qr(hi.background.uniforms),vertexShader:hi.background.vertexShader,fragmentShader:hi.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=je.getTransfer(S.colorSpace)!==Ke,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,h=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function f(x,T){x.getRGB(an,eu(i)),t.buffers.color.setClear(an.r,an.g,an.b,T,n)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return s},setClearColor:function(x,T=1){s.set(x),o=T,f(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,f(s,o)},render:g,addToRenderList:y,dispose:m}}function em(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),r={},a=h(null);let n=a,s=!1;function o(R,B,H,V,k){let z=!1;const O=d(R,V,H,B);n!==O&&(n=O,l(n.object)),z=p(R,V,H,k),z&&g(R,V,H,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),(z||s)&&(s=!1,S(R,B,H,V),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return i.createVertexArray()}function l(R){return i.bindVertexArray(R)}function u(R){return i.deleteVertexArray(R)}function d(R,B,H,V){const k=V.wireframe===!0;let z=r[B.id];z===void 0&&(z={},r[B.id]=z);const O=R.isInstancedMesh===!0?R.id:0;let Q=z[O];Q===void 0&&(Q={},z[O]=Q);let Z=Q[H.id];Z===void 0&&(Z={},Q[H.id]=Z);let le=Z[k];return le===void 0&&(le=h(c()),Z[k]=le),le}function h(R){const B=[],H=[],V=[];for(let k=0;k<t;k++)B[k]=0,H[k]=0,V[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:H,attributeDivisors:V,object:R,attributes:{},index:null}}function p(R,B,H,V){const k=n.attributes,z=B.attributes;let O=0;const Q=H.getAttributes();for(const Z in Q)if(Q[Z].location>=0){const le=k[Z];let de=z[Z];if(de===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(de=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(de=R.instanceColor)),le===void 0||le.attribute!==de||de&&le.data!==de.data)return!0;O++}return n.attributesNum!==O||n.index!==V}function g(R,B,H,V){const k={},z=B.attributes;let O=0;const Q=H.getAttributes();for(const Z in Q)if(Q[Z].location>=0){let le=z[Z];le===void 0&&(Z==="instanceMatrix"&&R.instanceMatrix&&(le=R.instanceMatrix),Z==="instanceColor"&&R.instanceColor&&(le=R.instanceColor));const de={};de.attribute=le,le&&le.data&&(de.data=le.data),k[Z]=de,O++}n.attributes=k,n.attributesNum=O,n.index=V}function y(){const R=n.newAttributes;for(let B=0,H=R.length;B<H;B++)R[B]=0}function f(R){m(R,0)}function m(R,B){const H=n.newAttributes,V=n.enabledAttributes,k=n.attributeDivisors;H[R]=1,V[R]===0&&(i.enableVertexAttribArray(R),V[R]=1),k[R]!==B&&(i.vertexAttribDivisor(R,B),k[R]=B)}function x(){const R=n.newAttributes,B=n.enabledAttributes;for(let H=0,V=B.length;H<V;H++)B[H]!==R[H]&&(i.disableVertexAttribArray(H),B[H]=0)}function T(R,B,H,V,k,z,O){O===!0?i.vertexAttribIPointer(R,B,H,k,z):i.vertexAttribPointer(R,B,H,V,k,z)}function S(R,B,H,V){y();const k=V.attributes,z=H.getAttributes(),O=B.defaultAttributeValues;for(const Q in z){const Z=z[Q];if(Z.location>=0){let le=k[Q];if(le===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(le=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(le=R.instanceColor)),le!==void 0){const de=le.normalized,Me=le.itemSize,ae=e.get(le);if(ae===void 0)continue;const Fe=ae.buffer,Ne=ae.type,j=ae.bytesPerElement,K=Ne===i.INT||Ne===i.UNSIGNED_INT||le.gpuType===Do;if(le.isInterleavedBufferAttribute){const ne=le.data,Oe=ne.stride,we=le.offset;if(ne.isInstancedInterleavedBuffer){for(let pe=0;pe<Z.locationSize;pe++)m(Z.location+pe,ne.meshPerAttribute);R.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let pe=0;pe<Z.locationSize;pe++)f(Z.location+pe);i.bindBuffer(i.ARRAY_BUFFER,Fe);for(let pe=0;pe<Z.locationSize;pe++)T(Z.location+pe,Me/Z.locationSize,Ne,de,Oe*j,(we+Me/Z.locationSize*pe)*j,K)}else{if(le.isInstancedBufferAttribute){for(let ne=0;ne<Z.locationSize;ne++)m(Z.location+ne,le.meshPerAttribute);R.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ne=0;ne<Z.locationSize;ne++)f(Z.location+ne);i.bindBuffer(i.ARRAY_BUFFER,Fe);for(let ne=0;ne<Z.locationSize;ne++)T(Z.location+ne,Me/Z.locationSize,Ne,de,Me*j,Me/Z.locationSize*ne*j,K)}}else if(O!==void 0){const de=O[Q];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(Z.location,de);break;case 3:i.vertexAttrib3fv(Z.location,de);break;case 4:i.vertexAttrib4fv(Z.location,de);break;default:i.vertexAttrib1fv(Z.location,de)}}}}x()}function w(){E();for(const R in r){const B=r[R];for(const H in B){const V=B[H];for(const k in V){const z=V[k];for(const O in z)u(z[O].object),delete z[O];delete V[k]}}delete r[R]}}function A(R){if(r[R.id]===void 0)return;const B=r[R.id];for(const H in B){const V=B[H];for(const k in V){const z=V[k];for(const O in z)u(z[O].object),delete z[O];delete V[k]}}delete r[R.id]}function P(R){for(const B in r){const H=r[B];for(const V in H){const k=H[V];if(k[R.id]===void 0)continue;const z=k[R.id];for(const O in z)u(z[O].object),delete z[O];delete k[R.id]}}}function v(R){for(const B in r){const H=r[B],V=R.isInstancedMesh===!0?R.id:0,k=H[V];if(k!==void 0){for(const z in k){const O=k[z];for(const Q in O)u(O[Q].object),delete O[Q];delete k[z]}delete H[V],Object.keys(H).length===0&&delete r[B]}}}function E(){W(),s=!0,n!==a&&(n=a,l(n.object))}function W(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:E,resetDefaultState:W,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:y,enableAttribute:f,disableUnusedAttributes:x}}function tm(i,e,t){let r;function a(l){r=l}function n(l,u){i.drawArrays(r,l,u),t.update(u,r,1)}function s(l,u,d){d!==0&&(i.drawArraysInstanced(r,l,u,d),t.update(u,r,d))}function o(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,l,0,u,0,d);let h=0;for(let p=0;p<d;p++)h+=u[p];t.update(h,r,1)}function c(l,u,d,h){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<l.length;g++)s(l[g],u[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(r,l,0,u,0,h,0,d);let g=0;for(let y=0;y<d;y++)g+=u[y]*h[y];t.update(g,r,1)}}this.setMode=a,this.render=n,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function im(i,e,t,r){let a;function n(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");a=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(P){return!(P!==Qt&&r.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const v=P===$t&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Zt&&r.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Jt&&!v)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Ue("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:n,getMaxPrecision:c,textureFormatReadable:s,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:f,maxAttributes:m,maxVertexUniforms:x,maxVaryings:T,maxFragmentUniforms:S,maxSamples:w,samples:A}}function rm(i){const e=this;let t=null,r=0,a=!1,n=!1;const s=new Hi,o=new He,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||r!==0||a;return a=h,r=d.length,p},this.beginShadows=function(){n=!0,u(null)},this.endShadows=function(){n=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const g=d.clippingPlanes,y=d.clipIntersection,f=d.clipShadows,m=i.get(d);if(!a||g===null||g.length===0||n&&!f)n?u(null):l();else{const x=n?0:r,T=x*4;let S=m.clippingState||null;c.value=S,S=u(g,h,T,p);for(let w=0;w!==T;++w)S[w]=t[w];m.clippingState=S,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function u(d,h,p,g){const y=d!==null?d.length:0;let f=null;if(y!==0){if(f=c.value,g!==!0||f===null){const m=p+y*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(f===null||f.length<m)&&(f=new Float32Array(m));for(let T=0,S=p;T!==y;++T,S+=4)s.copy(d[T]).applyMatrix4(x,o),s.normal.toArray(f,S),f[S+3]=s.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,f}}const Wi=4,zl=[.125,.215,.35,.446,.526,.582],nr=20,am=256,ca=new Nn,Hl=new Ae;let ms=null,gs=0,_s=0,vs=!1;const nm=new L;let kl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,r=.1,a=100,n={}){const{size:s=256,position:o=nm}=n;ms=this._renderer.getRenderTarget(),gs=this._renderer.getActiveCubeFace(),_s=this._renderer.getActiveMipmapLevel(),vs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,r,a,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(ms,gs,_s),this._renderer.xr.enabled=vs,e.scissorTest=!1,Ur(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ur||e.mapping===Xr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ms=this._renderer.getRenderTarget(),gs=this._renderer.getActiveCubeFace(),_s=this._renderer.getActiveMipmapLevel(),vs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:$t,format:Qt,colorSpace:$r,depthBuffer:!1},a=Gl(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gl(e,t,r);const{_lodMax:n}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=sm(n)),this._blurMaterial=lm(n,e,t),this._ggxMaterial=om(n,e,t)}return a}_compileMaterial(e){const t=new ot(new ut,e);this._renderer.compile(t,ca)}_sceneToCubeUV(e,t,r,a,n){const s=new jt(90,1,t,r),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,u=l.autoClear,d=l.toneMapping;l.getClearColor(Hl),l.toneMapping=gi,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(a),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ot(new Ra,new di({name:"PMREM.Background",side:Dt,depthWrite:!1,depthTest:!1})));const h=this._backgroundBox,p=h.material;let g=!1;const y=e.background;y?y.isColor&&(p.color.copy(y),e.background=null,g=!0):(p.color.copy(Hl),g=!0);for(let f=0;f<6;f++){const m=f%3;m===0?(s.up.set(0,o[f],0),s.position.set(n.x,n.y,n.z),s.lookAt(n.x+c[f],n.y,n.z)):m===1?(s.up.set(0,0,o[f]),s.position.set(n.x,n.y,n.z),s.lookAt(n.x,n.y+c[f],n.z)):(s.up.set(0,o[f],0),s.position.set(n.x,n.y,n.z),s.lookAt(n.x,n.y,n.z+c[f]));const x=this._cubeSize;Ur(a,m*x,f>2?x:0,x,x),l.setRenderTarget(a),g&&l.render(h,s),l.render(e,s)}l.toneMapping=d,l.autoClear=u,e.background=y}_textureToCubeUV(e,t){const r=this._renderer,a=e.mapping===ur||e.mapping===Xr;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vl());const n=a?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=n;const o=n.uniforms;o.envMap.value=e;const c=this._cubeSize;Ur(t,0,0,3*c,2*c),r.setRenderTarget(t),r.render(s,ca)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const a=this._lodMeshes.length;for(let n=1;n<a;n++)this._applyGGXFilter(e,n-1,n);t.autoClear=r}_applyGGXFilter(e,t,r){const a=this._renderer,n=this._pingPongRenderTarget,s=this._ggxMaterial,o=this._lodMeshes[r];o.material=s;const c=s.uniforms,l=r/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=0+l*1.25,p=d*h,{_lodMax:g}=this,y=this._sizeLods[r],f=3*y*(r>g-Wi?r-g+Wi:0),m=4*(this._cubeSize-y);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=g-t,Ur(n,f,m,3*y,2*y),a.setRenderTarget(n),a.render(o,ca),c.envMap.value=n.texture,c.roughness.value=0,c.mipInt.value=g-r,Ur(e,f,m,3*y,2*y),a.setRenderTarget(e),a.render(o,ca)}_blur(e,t,r,a,n){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,r,a,"latitudinal",n),this._halfBlur(s,e,r,r,a,"longitudinal",n)}_halfBlur(e,t,r,a,n,s,o){const c=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&Xe("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[a];d.material=l;const h=l.uniforms,p=this._sizeLods[r]-1,g=isFinite(n)?Math.PI/(2*p):2*Math.PI/(2*nr-1),y=n/g,f=isFinite(n)?1+Math.floor(u*y):nr;f>nr&&Ue(`sigmaRadians, ${n}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${nr}`);const m=[];let x=0;for(let P=0;P<nr;++P){const v=P/y,E=Math.exp(-v*v/2);m.push(E),P===0?x+=E:P<f&&(x+=2*E)}for(let P=0;P<m.length;P++)m[P]=m[P]/x;h.envMap.value=e.texture,h.samples.value=f,h.weights.value=m,h.latitudinal.value=s==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:T}=this;h.dTheta.value=g,h.mipInt.value=T-r;const S=this._sizeLods[a],w=3*S*(a>T-Wi?a-T+Wi:0),A=4*(this._cubeSize-S);Ur(t,w,A,3*S,2*S),c.setRenderTarget(t),c.render(d,ca)}};function sm(i){const e=[],t=[],r=[];let a=i;const n=i-Wi+1+zl.length;for(let s=0;s<n;s++){const o=Math.pow(2,a);e.push(o);let c=1/o;s>i-Wi?c=zl[s-i+Wi-1]:s===0&&(c=0),t.push(c);const l=1/(o-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,y=3,f=2,m=1,x=new Float32Array(y*g*p),T=new Float32Array(f*g*p),S=new Float32Array(m*g*p);for(let A=0;A<p;A++){const P=A%3*2/3-1,v=A>2?0:-1,E=[P,v,0,P+2/3,v,0,P+2/3,v+1,0,P,v,0,P+2/3,v+1,0,P,v+1,0];x.set(E,y*g*A),T.set(h,f*g*A);const W=[A,A,A,A,A,A];S.set(W,m*g*A)}const w=new ut;w.setAttribute("position",new Gt(x,y)),w.setAttribute("uv",new Gt(T,f)),w.setAttribute("faceIndex",new Gt(S,m)),r.push(new ot(w,null)),a>Wi&&a--}return{lodMeshes:r,sizeLods:e,sigmas:t}}function Gl(i,e,t){const r=new kt(i,e,t);return r.texture.mapping=In,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Ur(i,e,t,r,a){i.viewport.set(e,t,r,a),i.scissor.set(e,t,r,a)}function om(i,e,t){return new ht({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:am,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:On(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function lm(i,e,t){const r=new Float32Array(nr),a=new L(0,1,0);return new ht({name:"SphericalGaussianBlur",defines:{n:nr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:On(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Vl(){return new ht({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:On(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Wl(){return new ht({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:On(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function On(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class ru extends kt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new Jc(a),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Ra(5,5,5),n=new ht({name:"CubemapFromEquirect",uniforms:qr(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Dt,blending:mi});n.uniforms.tEquirect.value=t;const s=new ot(a,n),o=t.minFilter;return t.minFilter===sr&&(t.minFilter=Rt),new ud(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,r=!0,a=!0){const n=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,r,a);e.setRenderTarget(n)}}function cm(i){let e=new WeakMap,t=new WeakMap,r=null;function a(h,p=!1){return h==null?null:p?s(h):n(h)}function n(h){if(h&&h.isTexture){const p=h.mapping;if(p===Hn||p===kn)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const y=new ru(g.height);return y.fromEquirectangularTexture(i,h),e.set(h,y),h.addEventListener("dispose",l),o(y.texture,h.mapping)}else return null}}return h}function s(h){if(h&&h.isTexture){const p=h.mapping,g=p===Hn||p===kn,y=p===ur||p===Xr;if(g||y){let f=t.get(h);const m=f!==void 0?f.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==m)return r===null&&(r=new kl(i)),f=g?r.fromEquirectangular(h,f):r.fromCubemap(h,f),f.texture.pmremVersion=h.pmremVersion,t.set(h,f),f.texture;if(f!==void 0)return f.texture;{const x=h.image;return g&&x&&x.height>0||y&&x&&c(x)?(r===null&&(r=new kl(i)),f=g?r.fromEquirectangular(h):r.fromCubemap(h),f.texture.pmremVersion=h.pmremVersion,t.set(h,f),h.addEventListener("dispose",u),f.texture):null}}}return h}function o(h,p){return p===Hn?h.mapping=ur:p===kn&&(h.mapping=Xr),h}function c(h){let p=0;const g=6;for(let y=0;y<g;y++)h[y]!==void 0&&p++;return p===g}function l(h){const p=h.target;p.removeEventListener("dispose",l);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(h){const p=h.target;p.removeEventListener("dispose",u);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:a,dispose:d}}function um(i){const e={};function t(r){if(e[r]!==void 0)return e[r];const a=i.getExtension(r);return e[r]=a,a}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const a=t(r);return a===null&&wn("WebGLRenderer: "+r+" extension not supported."),a}}}function hm(i,e,t,r){const a={},n=new WeakMap;function s(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",s),delete a[h.id];const p=n.get(h);p&&(e.remove(p),n.delete(h)),r.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return a[h.id]===!0||(h.addEventListener("dispose",s),a[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const p in h)e.update(h[p],i.ARRAY_BUFFER)}function l(d){const h=[],p=d.index,g=d.attributes.position;let y=0;if(g===void 0)return;if(p!==null){const x=p.array;y=p.version;for(let T=0,S=x.length;T<S;T+=3){const w=x[T+0],A=x[T+1],P=x[T+2];h.push(w,A,A,P,P,w)}}else{const x=g.array;y=g.version;for(let T=0,S=x.length/3-1;T<S;T+=3){const w=T+0,A=T+1,P=T+2;h.push(w,A,A,P,P,w)}}const f=new(g.count>=65535?Yc:qc)(h,1);f.version=y;const m=n.get(d);m&&e.remove(m),n.set(d,f)}function u(d){const h=n.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&l(d)}else l(d);return n.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function dm(i,e,t){let r;function a(h){r=h}let n,s;function o(h){n=h.type,s=h.bytesPerElement}function c(h,p){i.drawElements(r,p,n,h*s),t.update(p,r,1)}function l(h,p,g){g!==0&&(i.drawElementsInstanced(r,p,n,h*s,g),t.update(p,r,g))}function u(h,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,p,0,n,h,0,g);let y=0;for(let f=0;f<g;f++)y+=p[f];t.update(y,r,1)}function d(h,p,g,y){if(g===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<h.length;m++)l(h[m]/s,p[m],y[m]);else{f.multiDrawElementsInstancedWEBGL(r,p,0,n,h,0,y,0,g);let m=0;for(let x=0;x<g;x++)m+=p[x]*y[x];t.update(m,r,1)}}this.setMode=a,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function pm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(n,s,o){switch(t.calls++,s){case i.TRIANGLES:t.triangles+=o*(n/3);break;case i.LINES:t.lines+=o*(n/2);break;case i.LINE_STRIP:t.lines+=o*(n-1);break;case i.LINE_LOOP:t.lines+=o*n;break;case i.POINTS:t.points+=o*n;break;default:Xe("WebGLInfo: Unknown draw mode:",s);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:r}}function fm(i,e,t){const r=new WeakMap,a=new ft;function n(s,o,c){const l=s.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=r.get(o);if(h===void 0||h.count!==d){let p=function(){v.dispose(),r.delete(o),o.removeEventListener("dispose",p)};h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,f=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let S=0;g===!0&&(S=1),y===!0&&(S=2),f===!0&&(S=3);let w=o.attributes.position.count*S,A=1;w>e.maxTextureSize&&(A=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const P=new Float32Array(w*A*4*d),v=new Xc(P,w,A,d);v.type=Jt,v.needsUpdate=!0;const E=S*4;for(let W=0;W<d;W++){const R=m[W],B=x[W],H=T[W],V=w*A*4*W;for(let k=0;k<R.count;k++){const z=k*E;g===!0&&(a.fromBufferAttribute(R,k),P[V+z+0]=a.x,P[V+z+1]=a.y,P[V+z+2]=a.z,P[V+z+3]=0),y===!0&&(a.fromBufferAttribute(B,k),P[V+z+4]=a.x,P[V+z+5]=a.y,P[V+z+6]=a.z,P[V+z+7]=0),f===!0&&(a.fromBufferAttribute(H,k),P[V+z+8]=a.x,P[V+z+9]=a.y,P[V+z+10]=a.z,P[V+z+11]=H.itemSize===4?a.w:1)}}h={count:d,texture:v,size:new Re(w,A)},r.set(o,h),o.addEventListener("dispose",p)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let p=0;for(let y=0;y<l.length;y++)p+=l[y];const g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:n}}function mm(i,e,t,r,a){let n=new WeakMap;function s(l){const u=a.render.frame,d=l.geometry,h=e.get(l,d);if(n.get(h)!==u&&(e.update(h),n.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),n.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),n.set(l,u))),l.isSkinnedMesh){const p=l.skeleton;n.get(p)!==u&&(p.update(),n.set(p,u))}return h}function o(){n=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),r.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:o}}const gm={[Rc]:"LINEAR_TONE_MAPPING",[Lc]:"REINHARD_TONE_MAPPING",[Pc]:"CINEON_TONE_MAPPING",[Dc]:"ACES_FILMIC_TONE_MAPPING",[Uc]:"AGX_TONE_MAPPING",[Nc]:"NEUTRAL_TONE_MAPPING",[Ic]:"CUSTOM_TONE_MAPPING"};function _m(i,e,t,r,a){const n=new kt(e,t,{type:i,depthBuffer:r,stencilBuffer:a}),s=new kt(e,t,{type:$t,depthBuffer:!1,stencilBuffer:!1}),o=new ut;o.setAttribute("position",new Ut([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ut([0,2,0,0,2,0],2));const c=new id({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new ot(o,c),u=new Nn(-1,1,1,-1,0,1);let d=null,h=null,p=!1,g,y=null,f=[],m=!1;this.setSize=function(x,T){n.setSize(x,T),s.setSize(x,T);for(let S=0;S<f.length;S++){const w=f[S];w.setSize&&w.setSize(x,T)}},this.setEffects=function(x){f=x,m=f.length>0&&f[0].isRenderPass===!0;const T=n.width,S=n.height;for(let w=0;w<f.length;w++){const A=f[w];A.setSize&&A.setSize(T,S)}},this.begin=function(x,T){if(p||x.toneMapping===gi&&f.length===0)return!1;if(y=T,T!==null){const S=T.width,w=T.height;(n.width!==S||n.height!==w)&&this.setSize(S,w)}return m===!1&&x.setRenderTarget(n),g=x.toneMapping,x.toneMapping=gi,!0},this.hasRenderPass=function(){return m},this.end=function(x,T){x.toneMapping=g,p=!0;let S=n,w=s;for(let A=0;A<f.length;A++){const P=f[A];if(P.enabled!==!1&&(P.render(x,w,S,T),P.needsSwap!==!1)){const v=S;S=w,w=v}}if(d!==x.outputColorSpace||h!==x.toneMapping){d=x.outputColorSpace,h=x.toneMapping,c.defines={},je.getTransfer(d)===Ke&&(c.defines.SRGB_TRANSFER="");const A=gm[h];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=S.texture,x.setRenderTarget(y),x.render(l,u),y=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){n.dispose(),s.dispose(),o.dispose(),c.dispose()}}const au=new qt,So=new Sa(1,1),nu=new Xc,su=new Ch,ou=new Jc,Xl=[],jl=[],$l=new Float32Array(16),ql=new Float32Array(9),Yl=new Float32Array(4);function Jr(i,e,t){const r=i[0];if(r<=0||r>0)return i;const a=e*t;let n=Xl[a];if(n===void 0&&(n=new Float32Array(a),Xl[a]=n),e!==0){r.toArray(n,0);for(let s=1,o=0;s!==e;++s)o+=t,i[s].toArray(n,o)}return n}function bt(i,e){if(i.length!==e.length)return!1;for(let t=0,r=i.length;t<r;t++)if(i[t]!==e[t])return!1;return!0}function Et(i,e){for(let t=0,r=e.length;t<r;t++)i[t]=e[t]}function Fn(i,e){let t=jl[e];t===void 0&&(t=new Int32Array(e),jl[e]=t);for(let r=0;r!==e;++r)t[r]=i.allocateTextureUnit();return t}function vm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2fv(this.addr,e),Et(t,e)}}function xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;i.uniform3fv(this.addr,e),Et(t,e)}}function ym(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4fv(this.addr,e),Et(t,e)}}function Sm(i,e){const t=this.cache,r=e.elements;if(r===void 0){if(bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(bt(t,r))return;Yl.set(r),i.uniformMatrix2fv(this.addr,!1,Yl),Et(t,r)}}function bm(i,e){const t=this.cache,r=e.elements;if(r===void 0){if(bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(bt(t,r))return;ql.set(r),i.uniformMatrix3fv(this.addr,!1,ql),Et(t,r)}}function Em(i,e){const t=this.cache,r=e.elements;if(r===void 0){if(bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(bt(t,r))return;$l.set(r),i.uniformMatrix4fv(this.addr,!1,$l),Et(t,r)}}function Tm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Am(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2iv(this.addr,e),Et(t,e)}}function wm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3iv(this.addr,e),Et(t,e)}}function Cm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4iv(this.addr,e),Et(t,e)}}function Rm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Lm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;i.uniform2uiv(this.addr,e),Et(t,e)}}function Pm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;i.uniform3uiv(this.addr,e),Et(t,e)}}function Dm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;i.uniform4uiv(this.addr,e),Et(t,e)}}function Im(i,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(i.uniform1i(this.addr,a),r[0]=a);let n;this.type===i.SAMPLER_2D_SHADOW?(So.compareFunction=t.isReversedDepthBuffer()?Ho:zo,n=So):n=au,t.setTexture2D(e||n,a)}function Um(i,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(i.uniform1i(this.addr,a),r[0]=a),t.setTexture3D(e||su,a)}function Nm(i,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(i.uniform1i(this.addr,a),r[0]=a),t.setTextureCube(e||ou,a)}function Om(i,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(i.uniform1i(this.addr,a),r[0]=a),t.setTexture2DArray(e||nu,a)}function Fm(i){switch(i){case 5126:return vm;case 35664:return Mm;case 35665:return xm;case 35666:return ym;case 35674:return Sm;case 35675:return bm;case 35676:return Em;case 5124:case 35670:return Tm;case 35667:case 35671:return Am;case 35668:case 35672:return wm;case 35669:case 35673:return Cm;case 5125:return Rm;case 36294:return Lm;case 36295:return Pm;case 36296:return Dm;case 35678:case 36198:case 36298:case 36306:case 35682:return Im;case 35679:case 36299:case 36307:return Um;case 35680:case 36300:case 36308:case 36293:return Nm;case 36289:case 36303:case 36311:case 36292:return Om}}function Bm(i,e){i.uniform1fv(this.addr,e)}function zm(i,e){const t=Jr(e,this.size,2);i.uniform2fv(this.addr,t)}function Hm(i,e){const t=Jr(e,this.size,3);i.uniform3fv(this.addr,t)}function km(i,e){const t=Jr(e,this.size,4);i.uniform4fv(this.addr,t)}function Gm(i,e){const t=Jr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Vm(i,e){const t=Jr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Wm(i,e){const t=Jr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Xm(i,e){i.uniform1iv(this.addr,e)}function jm(i,e){i.uniform2iv(this.addr,e)}function $m(i,e){i.uniform3iv(this.addr,e)}function qm(i,e){i.uniform4iv(this.addr,e)}function Ym(i,e){i.uniform1uiv(this.addr,e)}function Zm(i,e){i.uniform2uiv(this.addr,e)}function Km(i,e){i.uniform3uiv(this.addr,e)}function Jm(i,e){i.uniform4uiv(this.addr,e)}function Qm(i,e,t){const r=this.cache,a=e.length,n=Fn(t,a);bt(r,n)||(i.uniform1iv(this.addr,n),Et(r,n));let s;this.type===i.SAMPLER_2D_SHADOW?s=So:s=au;for(let o=0;o!==a;++o)t.setTexture2D(e[o]||s,n[o])}function eg(i,e,t){const r=this.cache,a=e.length,n=Fn(t,a);bt(r,n)||(i.uniform1iv(this.addr,n),Et(r,n));for(let s=0;s!==a;++s)t.setTexture3D(e[s]||su,n[s])}function tg(i,e,t){const r=this.cache,a=e.length,n=Fn(t,a);bt(r,n)||(i.uniform1iv(this.addr,n),Et(r,n));for(let s=0;s!==a;++s)t.setTextureCube(e[s]||ou,n[s])}function ig(i,e,t){const r=this.cache,a=e.length,n=Fn(t,a);bt(r,n)||(i.uniform1iv(this.addr,n),Et(r,n));for(let s=0;s!==a;++s)t.setTexture2DArray(e[s]||nu,n[s])}function rg(i){switch(i){case 5126:return Bm;case 35664:return zm;case 35665:return Hm;case 35666:return km;case 35674:return Gm;case 35675:return Vm;case 35676:return Wm;case 5124:case 35670:return Xm;case 35667:case 35671:return jm;case 35668:case 35672:return $m;case 35669:case 35673:return qm;case 5125:return Ym;case 36294:return Zm;case 36295:return Km;case 36296:return Jm;case 35678:case 36198:case 36298:case 36306:case 35682:return Qm;case 35679:case 36299:case 36307:return eg;case 35680:case 36300:case 36308:case 36293:return tg;case 36289:case 36303:case 36311:case 36292:return ig}}class ag{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=Fm(t.type)}}class ng{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rg(t.type)}}class sg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const a=this.seq;for(let n=0,s=a.length;n!==s;++n){const o=a[n];o.setValue(e,t[o.id],r)}}}const Ms=/(\w+)(\])?(\[|\.)?/g;function Zl(i,e){i.seq.push(e),i.map[e.id]=e}function og(i,e,t){const r=i.name,a=r.length;for(Ms.lastIndex=0;;){const n=Ms.exec(r),s=Ms.lastIndex;let o=n[1];const c=n[2]==="]",l=n[3];if(c&&(o=o|0),l===void 0||l==="["&&s+2===a){Zl(t,l===void 0?new ag(o,i,e):new ng(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new sg(o),Zl(t,u)),t=u}}}class _n{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<r;++s){const o=e.getActiveUniform(t,s),c=e.getUniformLocation(t,o.name);og(o,c,this)}const a=[],n=[];for(const s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?a.push(s):n.push(s);a.length>0&&(this.seq=a.concat(n))}setValue(e,t,r,a){const n=this.map[t];n!==void 0&&n.setValue(e,r,a)}setOptional(e,t,r){const a=t[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,t,r,a){for(let n=0,s=t.length;n!==s;++n){const o=t[n],c=r[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,a)}}static seqWithValue(e,t){const r=[];for(let a=0,n=e.length;a!==n;++a){const s=e[a];s.id in t&&r.push(s)}return r}}function Kl(i,e,t){const r=i.createShader(e);return i.shaderSource(r,t),i.compileShader(r),r}const lg=37297;let cg=0;function ug(i,e){const t=i.split(`
`),r=[],a=Math.max(e-6,0),n=Math.min(e+6,t.length);for(let s=a;s<n;s++){const o=s+1;r.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return r.join(`
`)}const Jl=new He;function hg(i){je._getMatrix(Jl,je.workingColorSpace,i);const e=`mat3( ${Jl.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(i)){case Tn:return[e,"LinearTransferOETF"];case Ke:return[e,"sRGBTransferOETF"];default:return Ue("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ql(i,e,t){const r=i.getShaderParameter(e,i.COMPILE_STATUS),a=(i.getShaderInfoLog(e)||"").trim();if(r&&a==="")return"";const n=/ERROR: 0:(\d+)/.exec(a);if(n){const s=parseInt(n[1]);return t.toUpperCase()+`

`+a+`

`+ug(i.getShaderSource(e),s)}else return a}function dg(i,e){const t=hg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const pg={[Rc]:"Linear",[Lc]:"Reinhard",[Pc]:"Cineon",[Dc]:"ACESFilmic",[Uc]:"AgX",[Nc]:"Neutral",[Ic]:"Custom"};function fg(i,e){const t=pg[e];return t===void 0?(Ue("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const nn=new L;function mg(){je.getLuminanceCoefficients(nn);const i=nn.x.toFixed(4),e=nn.y.toFixed(4),t=nn.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pa).join(`
`)}function _g(i){const e=[];for(const t in i){const r=i[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function vg(i,e){const t={},r=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const n=i.getActiveAttrib(e,a),s=n.name;let o=1;n.type===i.FLOAT_MAT2&&(o=2),n.type===i.FLOAT_MAT3&&(o=3),n.type===i.FLOAT_MAT4&&(o=4),t[s]={type:n.type,location:i.getAttribLocation(e,s),locationSize:o}}return t}function pa(i){return i!==""}function ec(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Mg=/^[ \t]*#include +<([\w\d./]+)>/gm;function bo(i){return i.replace(Mg,yg)}const xg=new Map;function yg(i,e){let t=Be[e];if(t===void 0){const r=xg.get(e);if(r!==void 0)t=Be[r],Ue('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return bo(t)}const Sg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ic(i){return i.replace(Sg,bg)}function bg(i,e,t,r){let a="";for(let n=parseInt(e);n<parseInt(t);n++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+n+" ]").replace(/UNROLLED_LOOP_INDEX/g,n);return a}function rc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Eg={[cn]:"SHADOWMAP_TYPE_PCF",[da]:"SHADOWMAP_TYPE_VSM"};function Tg(i){return Eg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Ag={[ur]:"ENVMAP_TYPE_CUBE",[Xr]:"ENVMAP_TYPE_CUBE",[In]:"ENVMAP_TYPE_CUBE_UV"};function wg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Ag[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Cg={[Xr]:"ENVMAP_MODE_REFRACTION"};function Rg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Cg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Lg={[Cc]:"ENVMAP_BLENDING_MULTIPLY",[ah]:"ENVMAP_BLENDING_MIX",[nh]:"ENVMAP_BLENDING_ADD"};function Pg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Lg[i.combine]||"ENVMAP_BLENDING_NONE"}function Dg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:r,maxMip:t}}function Ig(i,e,t,r){const a=i.getContext(),n=t.defines;let s=t.vertexShader,o=t.fragmentShader;const c=Tg(t),l=wg(t),u=Rg(t),d=Pg(t),h=Dg(t),p=gg(t),g=_g(n),y=a.createProgram();let f,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(pa).join(`
`),f.length>0&&(f+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(pa).join(`
`),m.length>0&&(m+=`
`)):(f=[rc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pa).join(`
`),m=[rc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==gi?"#define TONE_MAPPING":"",t.toneMapping!==gi?Be.tonemapping_pars_fragment:"",t.toneMapping!==gi?fg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,dg("linearToOutputTexel",t.outputColorSpace),mg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(pa).join(`
`)),s=bo(s),s=ec(s,t),s=tc(s,t),o=bo(o),o=ec(o,t),o=tc(o,t),s=ic(s),o=ic(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,f=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,m=["#define varying in",t.glslVersion===cl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===cl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const T=x+f+s,S=x+m+o,w=Kl(a,a.VERTEX_SHADER,T),A=Kl(a,a.FRAGMENT_SHADER,S);a.attachShader(y,w),a.attachShader(y,A),t.index0AttributeName!==void 0?a.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(y,0,"position"),a.linkProgram(y);function P(R){if(i.debug.checkShaderErrors){const B=a.getProgramInfoLog(y)||"",H=a.getShaderInfoLog(w)||"",V=a.getShaderInfoLog(A)||"",k=B.trim(),z=H.trim(),O=V.trim();let Q=!0,Z=!0;if(a.getProgramParameter(y,a.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(a,y,w,A);else{const le=Ql(a,w,"vertex"),de=Ql(a,A,"fragment");Xe("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(y,a.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+k+`
`+le+`
`+de)}else k!==""?Ue("WebGLProgram: Program Info Log:",k):(z===""||O==="")&&(Z=!1);Z&&(R.diagnostics={runnable:Q,programLog:k,vertexShader:{log:z,prefix:f},fragmentShader:{log:O,prefix:m}})}a.deleteShader(w),a.deleteShader(A),v=new _n(a,y),E=vg(a,y)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let W=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=a.getProgramParameter(y,lg)),W},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=cg++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=w,this.fragmentShader=A,this}let Ug=0;class Ng{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,a=this._getShaderStage(t),n=this._getShaderStage(r),s=this._getShaderCacheForMaterial(e);return s.has(a)===!1&&(s.add(a),a.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new Og(e),t.set(e,r)),r}}class Og{constructor(e){this.id=Ug++,this.code=e,this.usedTimes=0}}function Fg(i,e,t,r,a,n){const s=new Go,o=new Ng,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer;let h=r.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function y(v,E,W,R,B){const H=R.fog,V=B.geometry,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?R.environment:null,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,O=e.get(v.envMap||k,z),Q=O&&O.mapping===In?O.image.height:null,Z=p[v.type];v.precision!==null&&(h=r.getMaxPrecision(v.precision),h!==v.precision&&Ue("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const le=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,de=le!==void 0?le.length:0;let Me=0;V.morphAttributes.position!==void 0&&(Me=1),V.morphAttributes.normal!==void 0&&(Me=2),V.morphAttributes.color!==void 0&&(Me=3);let ae,Fe,Ne,j;if(Z){const Ze=hi[Z];ae=Ze.vertexShader,Fe=Ze.fragmentShader}else ae=v.vertexShader,Fe=v.fragmentShader,o.update(v),Ne=o.getVertexShaderID(v),j=o.getFragmentShaderID(v);const K=i.getRenderTarget(),ne=i.state.buffers.depth.getReversed(),Oe=B.isInstancedMesh===!0,we=B.isBatchedMesh===!0,pe=!!v.map,qe=!!v.matcap,Qe=!!O,Ge=!!v.aoMap,xt=!!v.lightMap,gt=!!v.bumpMap,At=!!v.normalMap,C=!!v.displacementMap,_t=!!v.emissiveMap,Ye=!!v.metalnessMap,it=!!v.roughnessMap,xe=v.anisotropy>0,b=v.clearcoat>0,_=v.dispersion>0,I=v.iridescence>0,$=v.sheen>0,Y=v.transmission>0,q=xe&&!!v.anisotropyMap,ye=b&&!!v.clearcoatMap,se=b&&!!v.clearcoatNormalMap,Ee=b&&!!v.clearcoatRoughnessMap,Se=I&&!!v.iridescenceMap,J=I&&!!v.iridescenceThicknessMap,ie=$&&!!v.sheenColorMap,be=$&&!!v.sheenRoughnessMap,ve=!!v.specularMap,he=!!v.specularColorMap,Ve=!!v.specularIntensityMap,D=Y&&!!v.transmissionMap,oe=Y&&!!v.thicknessMap,te=!!v.gradientMap,ge=!!v.alphaMap,ee=v.alphaTest>0,X=!!v.alphaHash,_e=!!v.extensions;let De=gi;v.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(De=i.toneMapping);const yt={shaderID:Z,shaderType:v.type,shaderName:v.name,vertexShader:ae,fragmentShader:Fe,defines:v.defines,customVertexShaderID:Ne,customFragmentShaderID:j,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:we,batchingColor:we&&B._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&B.instanceColor!==null,instancingMorph:Oe&&B.morphTexture!==null,outputColorSpace:K===null?i.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:$r,alphaToCoverage:!!v.alphaToCoverage,map:pe,matcap:qe,envMap:Qe,envMapMode:Qe&&O.mapping,envMapCubeUVHeight:Q,aoMap:Ge,lightMap:xt,bumpMap:gt,normalMap:At,displacementMap:C,emissiveMap:_t,normalMapObjectSpace:At&&v.normalMapType===uh,normalMapTangentSpace:At&&v.normalMapType===ch,metalnessMap:Ye,roughnessMap:it,anisotropy:xe,anisotropyMap:q,clearcoat:b,clearcoatMap:ye,clearcoatNormalMap:se,clearcoatRoughnessMap:Ee,dispersion:_,iridescence:I,iridescenceMap:Se,iridescenceThicknessMap:J,sheen:$,sheenColorMap:ie,sheenRoughnessMap:be,specularMap:ve,specularColorMap:he,specularIntensityMap:Ve,transmission:Y,transmissionMap:D,thicknessMap:oe,gradientMap:te,opaque:v.transparent===!1&&v.blending===lr&&v.alphaToCoverage===!1,alphaMap:ge,alphaTest:ee,alphaHash:X,combine:v.combine,mapUv:pe&&g(v.map.channel),aoMapUv:Ge&&g(v.aoMap.channel),lightMapUv:xt&&g(v.lightMap.channel),bumpMapUv:gt&&g(v.bumpMap.channel),normalMapUv:At&&g(v.normalMap.channel),displacementMapUv:C&&g(v.displacementMap.channel),emissiveMapUv:_t&&g(v.emissiveMap.channel),metalnessMapUv:Ye&&g(v.metalnessMap.channel),roughnessMapUv:it&&g(v.roughnessMap.channel),anisotropyMapUv:q&&g(v.anisotropyMap.channel),clearcoatMapUv:ye&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:se&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Se&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:J&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:ie&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:be&&g(v.sheenRoughnessMap.channel),specularMapUv:ve&&g(v.specularMap.channel),specularColorMapUv:he&&g(v.specularColorMap.channel),specularIntensityMapUv:Ve&&g(v.specularIntensityMap.channel),transmissionMapUv:D&&g(v.transmissionMap.channel),thicknessMapUv:oe&&g(v.thicknessMap.channel),alphaMapUv:ge&&g(v.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(At||xe),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!V.attributes.uv&&(pe||ge),fog:!!H,useFog:v.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||V.attributes.normal===void 0&&At===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ne,skinning:B.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:Me,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:n.numPlanes,numClipIntersection:n.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&W.length>0,shadowMapType:i.shadowMap.type,toneMapping:De,decodeVideoTexture:pe&&v.map.isVideoTexture===!0&&je.getTransfer(v.map.colorSpace)===Ke,decodeVideoTextureEmissive:_t&&v.emissiveMap.isVideoTexture===!0&&je.getTransfer(v.emissiveMap.colorSpace)===Ke,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===ni,flipSided:v.side===Dt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:_e&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&v.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return yt.vertexUv1s=c.has(1),yt.vertexUv2s=c.has(2),yt.vertexUv3s=c.has(3),c.clear(),yt}function f(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const W in v.defines)E.push(W),E.push(v.defines[W]);return v.isRawShaderMaterial===!1&&(m(E,v),x(E,v),E.push(i.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function m(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function x(v,E){s.disableAll(),E.instancing&&s.enable(0),E.instancingColor&&s.enable(1),E.instancingMorph&&s.enable(2),E.matcap&&s.enable(3),E.envMap&&s.enable(4),E.normalMapObjectSpace&&s.enable(5),E.normalMapTangentSpace&&s.enable(6),E.clearcoat&&s.enable(7),E.iridescence&&s.enable(8),E.alphaTest&&s.enable(9),E.vertexColors&&s.enable(10),E.vertexAlphas&&s.enable(11),E.vertexUv1s&&s.enable(12),E.vertexUv2s&&s.enable(13),E.vertexUv3s&&s.enable(14),E.vertexTangents&&s.enable(15),E.anisotropy&&s.enable(16),E.alphaHash&&s.enable(17),E.batching&&s.enable(18),E.dispersion&&s.enable(19),E.batchingColor&&s.enable(20),E.gradientMap&&s.enable(21),v.push(s.mask),s.disableAll(),E.fog&&s.enable(0),E.useFog&&s.enable(1),E.flatShading&&s.enable(2),E.logarithmicDepthBuffer&&s.enable(3),E.reversedDepthBuffer&&s.enable(4),E.skinning&&s.enable(5),E.morphTargets&&s.enable(6),E.morphNormals&&s.enable(7),E.morphColors&&s.enable(8),E.premultipliedAlpha&&s.enable(9),E.shadowMapEnabled&&s.enable(10),E.doubleSided&&s.enable(11),E.flipSided&&s.enable(12),E.useDepthPacking&&s.enable(13),E.dithering&&s.enable(14),E.transmission&&s.enable(15),E.sheen&&s.enable(16),E.opaque&&s.enable(17),E.pointsUvs&&s.enable(18),E.decodeVideoTexture&&s.enable(19),E.decodeVideoTextureEmissive&&s.enable(20),E.alphaToCoverage&&s.enable(21),v.push(s.mask)}function T(v){const E=p[v.type];let W;if(E){const R=hi[E];W=Ln.clone(R.uniforms)}else W=v.uniforms;return W}function S(v,E){let W=u.get(E);return W!==void 0?++W.usedTimes:(W=new Ig(i,E,v,a),l.push(W),u.set(E,W)),W}function w(v){if(--v.usedTimes===0){const E=l.indexOf(v);l[E]=l[l.length-1],l.pop(),u.delete(v.cacheKey),v.destroy()}}function A(v){o.remove(v)}function P(){o.dispose()}return{getParameters:y,getProgramCacheKey:f,getUniforms:T,acquireProgram:S,releaseProgram:w,releaseShaderCache:A,programs:l,dispose:P}}function Bg(){let i=new WeakMap;function e(s){return i.has(s)}function t(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function r(s){i.delete(s)}function a(s,o,c){i.get(s)[o]=c}function n(){i=new WeakMap}return{has:e,get:t,remove:r,update:a,dispose:n}}function zg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function ac(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function nc(){const i=[];let e=0;const t=[],r=[],a=[];function n(){e=0,t.length=0,r.length=0,a.length=0}function s(h){let p=0;return h.isInstancedMesh&&(p+=2),h.isSkinnedMesh&&(p+=1),p}function o(h,p,g,y,f,m){let x=i[e];return x===void 0?(x={id:h.id,object:h,geometry:p,material:g,materialVariant:s(h),groupOrder:y,renderOrder:h.renderOrder,z:f,group:m},i[e]=x):(x.id=h.id,x.object=h,x.geometry=p,x.material=g,x.materialVariant=s(h),x.groupOrder=y,x.renderOrder=h.renderOrder,x.z=f,x.group=m),e++,x}function c(h,p,g,y,f,m){const x=o(h,p,g,y,f,m);g.transmission>0?r.push(x):g.transparent===!0?a.push(x):t.push(x)}function l(h,p,g,y,f,m){const x=o(h,p,g,y,f,m);g.transmission>0?r.unshift(x):g.transparent===!0?a.unshift(x):t.unshift(x)}function u(h,p){t.length>1&&t.sort(h||zg),r.length>1&&r.sort(p||ac),a.length>1&&a.sort(p||ac)}function d(){for(let h=e,p=i.length;h<p;h++){const g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:r,transparent:a,init:n,push:c,unshift:l,finish:d,sort:u}}function Hg(){let i=new WeakMap;function e(r,a){const n=i.get(r);let s;return n===void 0?(s=new nc,i.set(r,[s])):a>=n.length?(s=new nc,n.push(s)):s=n[a],s}function t(){i=new WeakMap}return{get:e,dispose:t}}function kg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ae};break;case"SpotLight":t={position:new L,direction:new L,color:new Ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ae,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ae,groundColor:new Ae};break;case"RectAreaLight":t={color:new Ae,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function Gg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Vg=0;function Wg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Xg(i){const e=new kg,t=Gg(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)r.probe.push(new L);const a=new L,n=new nt,s=new nt;function o(l){let u=0,d=0,h=0;for(let E=0;E<9;E++)r.probe[E].set(0,0,0);let p=0,g=0,y=0,f=0,m=0,x=0,T=0,S=0,w=0,A=0,P=0;l.sort(Wg);for(let E=0,W=l.length;E<W;E++){const R=l[E],B=R.color,H=R.intensity,V=R.distance;let k=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===jr?k=R.shadow.map.texture:k=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=B.r*H,d+=B.g*H,h+=B.b*H;else if(R.isLightProbe){for(let z=0;z<9;z++)r.probe[z].addScaledVector(R.sh.coefficients[z],H);P++}else if(R.isDirectionalLight){const z=e.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const O=R.shadow,Q=t.get(R);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,r.directionalShadow[p]=Q,r.directionalShadowMap[p]=k,r.directionalShadowMatrix[p]=R.shadow.matrix,x++}r.directional[p]=z,p++}else if(R.isSpotLight){const z=e.get(R);z.position.setFromMatrixPosition(R.matrixWorld),z.color.copy(B).multiplyScalar(H),z.distance=V,z.coneCos=Math.cos(R.angle),z.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),z.decay=R.decay,r.spot[y]=z;const O=R.shadow;if(R.map&&(r.spotLightMap[w]=R.map,w++,O.updateMatrices(R),R.castShadow&&A++),r.spotLightMatrix[y]=O.matrix,R.castShadow){const Q=t.get(R);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,r.spotShadow[y]=Q,r.spotShadowMap[y]=k,S++}y++}else if(R.isRectAreaLight){const z=e.get(R);z.color.copy(B).multiplyScalar(H),z.halfWidth.set(R.width*.5,0,0),z.halfHeight.set(0,R.height*.5,0),r.rectArea[f]=z,f++}else if(R.isPointLight){const z=e.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),z.distance=R.distance,z.decay=R.decay,R.castShadow){const O=R.shadow,Q=t.get(R);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,Q.shadowCameraNear=O.camera.near,Q.shadowCameraFar=O.camera.far,r.pointShadow[g]=Q,r.pointShadowMap[g]=k,r.pointShadowMatrix[g]=R.shadow.matrix,T++}r.point[g]=z,g++}else if(R.isHemisphereLight){const z=e.get(R);z.skyColor.copy(R.color).multiplyScalar(H),z.groundColor.copy(R.groundColor).multiplyScalar(H),r.hemi[m]=z,m++}}f>0&&(i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=ce.LTC_FLOAT_1,r.rectAreaLTC2=ce.LTC_FLOAT_2):(r.rectAreaLTC1=ce.LTC_HALF_1,r.rectAreaLTC2=ce.LTC_HALF_2)),r.ambient[0]=u,r.ambient[1]=d,r.ambient[2]=h;const v=r.hash;(v.directionalLength!==p||v.pointLength!==g||v.spotLength!==y||v.rectAreaLength!==f||v.hemiLength!==m||v.numDirectionalShadows!==x||v.numPointShadows!==T||v.numSpotShadows!==S||v.numSpotMaps!==w||v.numLightProbes!==P)&&(r.directional.length=p,r.spot.length=y,r.rectArea.length=f,r.point.length=g,r.hemi.length=m,r.directionalShadow.length=x,r.directionalShadowMap.length=x,r.pointShadow.length=T,r.pointShadowMap.length=T,r.spotShadow.length=S,r.spotShadowMap.length=S,r.directionalShadowMatrix.length=x,r.pointShadowMatrix.length=T,r.spotLightMatrix.length=S+w-A,r.spotLightMap.length=w,r.numSpotLightShadowsWithMaps=A,r.numLightProbes=P,v.directionalLength=p,v.pointLength=g,v.spotLength=y,v.rectAreaLength=f,v.hemiLength=m,v.numDirectionalShadows=x,v.numPointShadows=T,v.numSpotShadows=S,v.numSpotMaps=w,v.numLightProbes=P,r.version=Vg++)}function c(l,u){let d=0,h=0,p=0,g=0,y=0;const f=u.matrixWorldInverse;for(let m=0,x=l.length;m<x;m++){const T=l[m];if(T.isDirectionalLight){const S=r.directional[d];S.direction.setFromMatrixPosition(T.matrixWorld),a.setFromMatrixPosition(T.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(f),d++}else if(T.isSpotLight){const S=r.spot[p];S.position.setFromMatrixPosition(T.matrixWorld),S.position.applyMatrix4(f),S.direction.setFromMatrixPosition(T.matrixWorld),a.setFromMatrixPosition(T.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(f),p++}else if(T.isRectAreaLight){const S=r.rectArea[g];S.position.setFromMatrixPosition(T.matrixWorld),S.position.applyMatrix4(f),s.identity(),n.copy(T.matrixWorld),n.premultiply(f),s.extractRotation(n),S.halfWidth.set(T.width*.5,0,0),S.halfHeight.set(0,T.height*.5,0),S.halfWidth.applyMatrix4(s),S.halfHeight.applyMatrix4(s),g++}else if(T.isPointLight){const S=r.point[h];S.position.setFromMatrixPosition(T.matrixWorld),S.position.applyMatrix4(f),h++}else if(T.isHemisphereLight){const S=r.hemi[y];S.direction.setFromMatrixPosition(T.matrixWorld),S.direction.transformDirection(f),y++}}}return{setup:o,setupView:c,state:r}}function sc(i){const e=new Xg(i),t=[],r=[];function a(u){l.camera=u,t.length=0,r.length=0}function n(u){t.push(u)}function s(u){r.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:l,setupLights:o,setupLightsView:c,pushLight:n,pushShadow:s}}function jg(i){let e=new WeakMap;function t(a,n=0){const s=e.get(a);let o;return s===void 0?(o=new sc(i),e.set(a,[o])):n>=s.length?(o=new sc(i),s.push(o)):o=s[n],o}function r(){e=new WeakMap}return{get:t,dispose:r}}const $g=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Yg=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],Zg=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],oc=new nt,ua=new L,xs=new L;function Kg(i,e,t){let r=new Zc;const a=new Re,n=new Re,s=new ft,o=new rd,c=new ad,l={},u=t.maxTextureSize,d={[si]:Dt,[Dt]:si,[ni]:ni},h=new ht({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Re},radius:{value:4}},vertexShader:$g,fragmentShader:qg}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new ut;g.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new ot(g,h),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cn;let m=this.type;this.render=function(A,P,v){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||A.length===0)return;this.type===zu&&(Ue("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=cn);const E=i.getRenderTarget(),W=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),B=i.state;B.setBlending(mi),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const H=m!==this.type;H&&P.traverse(function(V){V.material&&(Array.isArray(V.material)?V.material.forEach(k=>k.needsUpdate=!0):V.material.needsUpdate=!0)});for(let V=0,k=A.length;V<k;V++){const z=A[V],O=z.shadow;if(O===void 0){Ue("WebGLShadowMap:",z,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;a.copy(O.mapSize);const Q=O.getFrameExtents();a.multiply(Q),n.copy(O.mapSize),(a.x>u||a.y>u)&&(a.x>u&&(n.x=Math.floor(u/Q.x),a.x=n.x*Q.x,O.mapSize.x=n.x),a.y>u&&(n.y=Math.floor(u/Q.y),a.y=n.y*Q.y,O.mapSize.y=n.y));const Z=i.state.buffers.depth.getReversed();if(O.camera._reversedDepth=Z,O.map===null||H===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===da){if(z.isPointLight){Ue("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new kt(a.x,a.y,{format:jr,type:$t,minFilter:Rt,magFilter:Rt,generateMipmaps:!1}),O.map.texture.name=z.name+".shadowMap",O.map.depthTexture=new Sa(a.x,a.y,Jt),O.map.depthTexture.name=z.name+".shadowMapDepth",O.map.depthTexture.format=Di,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ct,O.map.depthTexture.magFilter=Ct}else z.isPointLight?(O.map=new ru(a.x),O.map.depthTexture=new $h(a.x,_i)):(O.map=new kt(a.x,a.y),O.map.depthTexture=new Sa(a.x,a.y,_i)),O.map.depthTexture.name=z.name+".shadowMap",O.map.depthTexture.format=Di,this.type===cn?(O.map.depthTexture.compareFunction=Z?Ho:zo,O.map.depthTexture.minFilter=Rt,O.map.depthTexture.magFilter=Rt):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Ct,O.map.depthTexture.magFilter=Ct);O.camera.updateProjectionMatrix()}const le=O.map.isWebGLCubeRenderTarget?6:1;for(let de=0;de<le;de++){if(O.map.isWebGLCubeRenderTarget)i.setRenderTarget(O.map,de),i.clear();else{de===0&&(i.setRenderTarget(O.map),i.clear());const Me=O.getViewport(de);s.set(n.x*Me.x,n.y*Me.y,n.x*Me.z,n.y*Me.w),B.viewport(s)}if(z.isPointLight){const Me=O.camera,ae=O.matrix,Fe=z.distance||Me.far;Fe!==Me.far&&(Me.far=Fe,Me.updateProjectionMatrix()),ua.setFromMatrixPosition(z.matrixWorld),Me.position.copy(ua),xs.copy(Me.position),xs.add(Yg[de]),Me.up.copy(Zg[de]),Me.lookAt(xs),Me.updateMatrixWorld(),ae.makeTranslation(-ua.x,-ua.y,-ua.z),oc.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),O._frustum.setFromProjectionMatrix(oc,Me.coordinateSystem,Me.reversedDepth)}else O.updateMatrices(z);r=O.getFrustum(),S(P,v,O.camera,z,this.type)}O.isPointLightShadow!==!0&&this.type===da&&x(O,v),O.needsUpdate=!1}m=this.type,f.needsUpdate=!1,i.setRenderTarget(E,W,R)};function x(A,P){const v=e.update(y);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new kt(a.x,a.y,{format:jr,type:$t})),h.uniforms.shadow_pass.value=A.map.depthTexture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(P,null,v,h,y,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(P,null,v,p,y,null)}function T(A,P,v,E){let W=null;const R=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)W=R;else if(W=v.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const B=W.uuid,H=P.uuid;let V=l[B];V===void 0&&(V={},l[B]=V);let k=V[H];k===void 0&&(k=W.clone(),V[H]=k,P.addEventListener("dispose",w)),W=k}if(W.visible=P.visible,W.wireframe=P.wireframe,E===da?W.side=P.shadowSide!==null?P.shadowSide:P.side:W.side=P.shadowSide!==null?P.shadowSide:d[P.side],W.alphaMap=P.alphaMap,W.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,W.map=P.map,W.clipShadows=P.clipShadows,W.clippingPlanes=P.clippingPlanes,W.clipIntersection=P.clipIntersection,W.displacementMap=P.displacementMap,W.displacementScale=P.displacementScale,W.displacementBias=P.displacementBias,W.wireframeLinewidth=P.wireframeLinewidth,W.linewidth=P.linewidth,v.isPointLight===!0&&W.isMeshDistanceMaterial===!0){const B=i.properties.get(W);B.light=v}return W}function S(A,P,v,E,W){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&W===da)&&(!A.frustumCulled||r.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);const B=e.update(A),H=A.material;if(Array.isArray(H)){const V=B.groups;for(let k=0,z=V.length;k<z;k++){const O=V[k],Q=H[O.materialIndex];if(Q&&Q.visible){const Z=T(A,Q,E,W);A.onBeforeShadow(i,A,P,v,B,Z,O),i.renderBufferDirect(v,null,B,Z,A,O),A.onAfterShadow(i,A,P,v,B,Z,O)}}}else if(H.visible){const V=T(A,H,E,W);A.onBeforeShadow(i,A,P,v,B,V,null),i.renderBufferDirect(v,null,B,V,A,null),A.onAfterShadow(i,A,P,v,B,V,null)}}const R=A.children;for(let B=0,H=R.length;B<H;B++)S(R[B],P,v,E,W)}function w(A){A.target.removeEventListener("dispose",w);for(const P in l){const v=l[P],E=A.target.uuid;E in v&&(v[E].dispose(),delete v[E])}}}function Jg(i,e){function t(){let D=!1;const oe=new ft;let te=null;const ge=new ft(0,0,0,0);return{setMask:function(ee){te!==ee&&!D&&(i.colorMask(ee,ee,ee,ee),te=ee)},setLocked:function(ee){D=ee},setClear:function(ee,X,_e,De,yt){yt===!0&&(ee*=De,X*=De,_e*=De),oe.set(ee,X,_e,De),ge.equals(oe)===!1&&(i.clearColor(ee,X,_e,De),ge.copy(oe))},reset:function(){D=!1,te=null,ge.set(-1,0,0,0)}}}function r(){let D=!1,oe=!1,te=null,ge=null,ee=null;return{setReversed:function(X){if(oe!==X){const _e=e.get("EXT_clip_control");X?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),oe=X;const De=ee;ee=null,this.setClear(De)}},getReversed:function(){return oe},setTest:function(X){X?K(i.DEPTH_TEST):ne(i.DEPTH_TEST)},setMask:function(X){te!==X&&!D&&(i.depthMask(X),te=X)},setFunc:function(X){if(oe&&(X=xh[X]),ge!==X){switch(X){case Ds:i.depthFunc(i.NEVER);break;case En:i.depthFunc(i.ALWAYS);break;case Is:i.depthFunc(i.LESS);break;case Wr:i.depthFunc(i.LEQUAL);break;case Us:i.depthFunc(i.EQUAL);break;case Ns:i.depthFunc(i.GEQUAL);break;case Os:i.depthFunc(i.GREATER);break;case Fs:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ge=X}},setLocked:function(X){D=X},setClear:function(X){ee!==X&&(ee=X,oe&&(X=1-X),i.clearDepth(X))},reset:function(){D=!1,te=null,ge=null,ee=null,oe=!1}}}function a(){let D=!1,oe=null,te=null,ge=null,ee=null,X=null,_e=null,De=null,yt=null;return{setTest:function(Ze){D||(Ze?K(i.STENCIL_TEST):ne(i.STENCIL_TEST))},setMask:function(Ze){oe!==Ze&&!D&&(i.stencilMask(Ze),oe=Ze)},setFunc:function(Ze,Mi,xi){(te!==Ze||ge!==Mi||ee!==xi)&&(i.stencilFunc(Ze,Mi,xi),te=Ze,ge=Mi,ee=xi)},setOp:function(Ze,Mi,xi){(X!==Ze||_e!==Mi||De!==xi)&&(i.stencilOp(Ze,Mi,xi),X=Ze,_e=Mi,De=xi)},setLocked:function(Ze){D=Ze},setClear:function(Ze){yt!==Ze&&(i.clearStencil(Ze),yt=Ze)},reset:function(){D=!1,oe=null,te=null,ge=null,ee=null,X=null,_e=null,De=null,yt=null}}}const n=new t,s=new r,o=new a,c=new WeakMap,l=new WeakMap;let u={},d={},h=new WeakMap,p=[],g=null,y=!1,f=null,m=null,x=null,T=null,S=null,w=null,A=null,P=new Ae(0,0,0),v=0,E=!1,W=null,R=null,B=null,H=null,V=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,O=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(Q)[1]),z=O>=1):Q.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),z=O>=2);let Z=null,le={};const de=i.getParameter(i.SCISSOR_BOX),Me=i.getParameter(i.VIEWPORT),ae=new ft().fromArray(de),Fe=new ft().fromArray(Me);function Ne(D,oe,te,ge){const ee=new Uint8Array(4),X=i.createTexture();i.bindTexture(D,X),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _e=0;_e<te;_e++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,ge,0,i.RGBA,i.UNSIGNED_BYTE,ee):i.texImage2D(oe+_e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ee);return X}const j={};j[i.TEXTURE_2D]=Ne(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=Ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=Ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=Ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),n.setClear(0,0,0,1),s.setClear(1),o.setClear(0),K(i.DEPTH_TEST),s.setFunc(Wr),gt(!1),At(al),K(i.CULL_FACE),Ge(mi);function K(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function ne(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function Oe(D,oe){return d[D]!==oe?(i.bindFramebuffer(D,oe),d[D]=oe,D===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=oe),D===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function we(D,oe){let te=p,ge=!1;if(D){te=h.get(oe),te===void 0&&(te=[],h.set(oe,te));const ee=D.textures;if(te.length!==ee.length||te[0]!==i.COLOR_ATTACHMENT0){for(let X=0,_e=ee.length;X<_e;X++)te[X]=i.COLOR_ATTACHMENT0+X;te.length=ee.length,ge=!0}}else te[0]!==i.BACK&&(te[0]=i.BACK,ge=!0);ge&&i.drawBuffers(te)}function pe(D){return g!==D?(i.useProgram(D),g=D,!0):!1}const qe={[ar]:i.FUNC_ADD,[ku]:i.FUNC_SUBTRACT,[Gu]:i.FUNC_REVERSE_SUBTRACT};qe[Vu]=i.MIN,qe[Wu]=i.MAX;const Qe={[Xu]:i.ZERO,[ju]:i.ONE,[$u]:i.SRC_COLOR,[Ls]:i.SRC_ALPHA,[Qu]:i.SRC_ALPHA_SATURATE,[Ku]:i.DST_COLOR,[Yu]:i.DST_ALPHA,[qu]:i.ONE_MINUS_SRC_COLOR,[Ps]:i.ONE_MINUS_SRC_ALPHA,[Ju]:i.ONE_MINUS_DST_COLOR,[Zu]:i.ONE_MINUS_DST_ALPHA,[eh]:i.CONSTANT_COLOR,[th]:i.ONE_MINUS_CONSTANT_COLOR,[ih]:i.CONSTANT_ALPHA,[rh]:i.ONE_MINUS_CONSTANT_ALPHA};function Ge(D,oe,te,ge,ee,X,_e,De,yt,Ze){if(D===mi){y===!0&&(ne(i.BLEND),y=!1);return}if(y===!1&&(K(i.BLEND),y=!0),D!==Hu){if(D!==f||Ze!==E){if((m!==ar||S!==ar)&&(i.blendEquation(i.FUNC_ADD),m=ar,S=ar),Ze)switch(D){case lr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case It:i.blendFunc(i.ONE,i.ONE);break;case nl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case sl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Xe("WebGLState: Invalid blending: ",D);break}else switch(D){case lr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case It:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case nl:Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case sl:Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xe("WebGLState: Invalid blending: ",D);break}x=null,T=null,w=null,A=null,P.set(0,0,0),v=0,f=D,E=Ze}return}ee=ee||oe,X=X||te,_e=_e||ge,(oe!==m||ee!==S)&&(i.blendEquationSeparate(qe[oe],qe[ee]),m=oe,S=ee),(te!==x||ge!==T||X!==w||_e!==A)&&(i.blendFuncSeparate(Qe[te],Qe[ge],Qe[X],Qe[_e]),x=te,T=ge,w=X,A=_e),(De.equals(P)===!1||yt!==v)&&(i.blendColor(De.r,De.g,De.b,yt),P.copy(De),v=yt),f=D,E=!1}function xt(D,oe){D.side===ni?ne(i.CULL_FACE):K(i.CULL_FACE);let te=D.side===Dt;oe&&(te=!te),gt(te),D.blending===lr&&D.transparent===!1?Ge(mi):Ge(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),s.setFunc(D.depthFunc),s.setTest(D.depthTest),s.setMask(D.depthWrite),n.setMask(D.colorWrite);const ge=D.stencilWrite;o.setTest(ge),ge&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),_t(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?K(i.SAMPLE_ALPHA_TO_COVERAGE):ne(i.SAMPLE_ALPHA_TO_COVERAGE)}function gt(D){W!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),W=D)}function At(D){D!==Fu?(K(i.CULL_FACE),D!==R&&(D===al?i.cullFace(i.BACK):D===Bu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ne(i.CULL_FACE),R=D}function C(D){D!==B&&(z&&i.lineWidth(D),B=D)}function _t(D,oe,te){D?(K(i.POLYGON_OFFSET_FILL),(H!==oe||V!==te)&&(H=oe,V=te,s.getReversed()&&(oe=-oe),i.polygonOffset(oe,te))):ne(i.POLYGON_OFFSET_FILL)}function Ye(D){D?K(i.SCISSOR_TEST):ne(i.SCISSOR_TEST)}function it(D){D===void 0&&(D=i.TEXTURE0+k-1),Z!==D&&(i.activeTexture(D),Z=D)}function xe(D,oe,te){te===void 0&&(Z===null?te=i.TEXTURE0+k-1:te=Z);let ge=le[te];ge===void 0&&(ge={type:void 0,texture:void 0},le[te]=ge),(ge.type!==D||ge.texture!==oe)&&(Z!==te&&(i.activeTexture(te),Z=te),i.bindTexture(D,oe||j[D]),ge.type=D,ge.texture=oe)}function b(){const D=le[Z];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function I(){try{i.compressedTexImage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function $(){try{i.texSubImage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function Y(){try{i.texSubImage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function ye(){try{i.compressedTexSubImage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function se(){try{i.texStorage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function Ee(){try{i.texStorage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function Se(){try{i.texImage2D(...arguments)}catch(D){Xe("WebGLState:",D)}}function J(){try{i.texImage3D(...arguments)}catch(D){Xe("WebGLState:",D)}}function ie(D){ae.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),ae.copy(D))}function be(D){Fe.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Fe.copy(D))}function ve(D,oe){let te=l.get(oe);te===void 0&&(te=new WeakMap,l.set(oe,te));let ge=te.get(D);ge===void 0&&(ge=i.getUniformBlockIndex(oe,D.name),te.set(D,ge))}function he(D,oe){const te=l.get(oe).get(D);c.get(oe)!==te&&(i.uniformBlockBinding(oe,te,D.__bindingPointIndex),c.set(oe,te))}function Ve(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),s.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},Z=null,le={},d={},h=new WeakMap,p=[],g=null,y=!1,f=null,m=null,x=null,T=null,S=null,w=null,A=null,P=new Ae(0,0,0),v=0,E=!1,W=null,R=null,B=null,H=null,V=null,ae.set(0,0,i.canvas.width,i.canvas.height),Fe.set(0,0,i.canvas.width,i.canvas.height),n.reset(),s.reset(),o.reset()}return{buffers:{color:n,depth:s,stencil:o},enable:K,disable:ne,bindFramebuffer:Oe,drawBuffers:we,useProgram:pe,setBlending:Ge,setMaterial:xt,setFlipSided:gt,setCullFace:At,setLineWidth:C,setPolygonOffset:_t,setScissorTest:Ye,activeTexture:it,bindTexture:xe,unbindTexture:b,compressedTexImage2D:_,compressedTexImage3D:I,texImage2D:Se,texImage3D:J,updateUBOMapping:ve,uniformBlockBinding:he,texStorage2D:se,texStorage3D:Ee,texSubImage2D:$,texSubImage3D:Y,compressedTexSubImage2D:q,compressedTexSubImage3D:ye,scissor:ie,viewport:be,reset:Ve}}function Qg(i,e,t,r,a,n,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Re,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return p?new OffscreenCanvas(b,_):ya("canvas")}function y(b,_,I){let $=1;const Y=xe(b);if((Y.width>I||Y.height>I)&&($=I/Math.max(Y.width,Y.height)),$<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const q=Math.floor($*Y.width),ye=Math.floor($*Y.height);d===void 0&&(d=g(q,ye));const se=_?g(q,ye):d;return se.width=q,se.height=ye,se.getContext("2d").drawImage(b,0,0,q,ye),Ue("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+q+"x"+ye+")."),se}else return"data"in b&&Ue("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),b;return b}function f(b){return b.generateMipmaps}function m(b){i.generateMipmap(b)}function x(b){return b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?i.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(b,_,I,$,Y=!1){if(b!==null){if(i[b]!==void 0)return i[b];Ue("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let q=_;if(_===i.RED&&(I===i.FLOAT&&(q=i.R32F),I===i.HALF_FLOAT&&(q=i.R16F),I===i.UNSIGNED_BYTE&&(q=i.R8)),_===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(q=i.R8UI),I===i.UNSIGNED_SHORT&&(q=i.R16UI),I===i.UNSIGNED_INT&&(q=i.R32UI),I===i.BYTE&&(q=i.R8I),I===i.SHORT&&(q=i.R16I),I===i.INT&&(q=i.R32I)),_===i.RG&&(I===i.FLOAT&&(q=i.RG32F),I===i.HALF_FLOAT&&(q=i.RG16F),I===i.UNSIGNED_BYTE&&(q=i.RG8)),_===i.RG_INTEGER&&(I===i.UNSIGNED_BYTE&&(q=i.RG8UI),I===i.UNSIGNED_SHORT&&(q=i.RG16UI),I===i.UNSIGNED_INT&&(q=i.RG32UI),I===i.BYTE&&(q=i.RG8I),I===i.SHORT&&(q=i.RG16I),I===i.INT&&(q=i.RG32I)),_===i.RGB_INTEGER&&(I===i.UNSIGNED_BYTE&&(q=i.RGB8UI),I===i.UNSIGNED_SHORT&&(q=i.RGB16UI),I===i.UNSIGNED_INT&&(q=i.RGB32UI),I===i.BYTE&&(q=i.RGB8I),I===i.SHORT&&(q=i.RGB16I),I===i.INT&&(q=i.RGB32I)),_===i.RGBA_INTEGER&&(I===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),I===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),I===i.UNSIGNED_INT&&(q=i.RGBA32UI),I===i.BYTE&&(q=i.RGBA8I),I===i.SHORT&&(q=i.RGBA16I),I===i.INT&&(q=i.RGBA32I)),_===i.RGB&&(I===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),I===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),_===i.RGBA){const ye=Y?Tn:je.getTransfer($);I===i.FLOAT&&(q=i.RGBA32F),I===i.HALF_FLOAT&&(q=i.RGBA16F),I===i.UNSIGNED_BYTE&&(q=ye===Ke?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function S(b,_){let I;return b?_===null||_===_i||_===xa?I=i.DEPTH24_STENCIL8:_===Jt?I=i.DEPTH32F_STENCIL8:_===Ma&&(I=i.DEPTH24_STENCIL8,Ue("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===_i||_===xa?I=i.DEPTH_COMPONENT24:_===Jt?I=i.DEPTH_COMPONENT32F:_===Ma&&(I=i.DEPTH_COMPONENT16),I}function w(b,_){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ct&&b.minFilter!==Rt?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function A(b){const _=b.target;_.removeEventListener("dispose",A),v(_),_.isVideoTexture&&u.delete(_)}function P(b){const _=b.target;_.removeEventListener("dispose",P),W(_)}function v(b){const _=r.get(b);if(_.__webglInit===void 0)return;const I=b.source,$=h.get(I);if($){const Y=$[_.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&E(b),Object.keys($).length===0&&h.delete(I)}r.remove(b)}function E(b){const _=r.get(b);i.deleteTexture(_.__webglTexture);const I=b.source,$=h.get(I);delete $[_.__cacheKey],s.memory.textures--}function W(b){const _=r.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),r.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(_.__webglFramebuffer[$]))for(let Y=0;Y<_.__webglFramebuffer[$].length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[$][Y]);else i.deleteFramebuffer(_.__webglFramebuffer[$]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[$])}else{if(Array.isArray(_.__webglFramebuffer))for(let $=0;$<_.__webglFramebuffer.length;$++)i.deleteFramebuffer(_.__webglFramebuffer[$]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let $=0;$<_.__webglColorRenderbuffer.length;$++)_.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[$]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const I=b.textures;for(let $=0,Y=I.length;$<Y;$++){const q=r.get(I[$]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),s.memory.textures--),r.remove(I[$])}r.remove(b)}let R=0;function B(){R=0}function H(){const b=R;return b>=a.maxTextures&&Ue("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+a.maxTextures),R+=1,b}function V(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function k(b,_){const I=r.get(b);if(b.isVideoTexture&&Ye(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&I.__version!==b.version){const $=b.image;if($===null)Ue("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Ue("WebGLRenderer: Texture marked for update but image is incomplete");else{j(I,b,_);return}}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+_)}function z(b,_){const I=r.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){j(I,b,_);return}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+_)}function O(b,_){const I=r.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){j(I,b,_);return}t.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+_)}function Q(b,_){const I=r.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&I.__version!==b.version){K(I,b,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+_)}const Z={[Bs]:i.REPEAT,[wi]:i.CLAMP_TO_EDGE,[zs]:i.MIRRORED_REPEAT},le={[Ct]:i.NEAREST,[sh]:i.NEAREST_MIPMAP_NEAREST,[Ia]:i.NEAREST_MIPMAP_LINEAR,[Rt]:i.LINEAR,[Gn]:i.LINEAR_MIPMAP_NEAREST,[sr]:i.LINEAR_MIPMAP_LINEAR},de={[hh]:i.NEVER,[gh]:i.ALWAYS,[dh]:i.LESS,[zo]:i.LEQUAL,[ph]:i.EQUAL,[Ho]:i.GEQUAL,[fh]:i.GREATER,[mh]:i.NOTEQUAL};function Me(b,_){if(_.type===Jt&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Rt||_.magFilter===Gn||_.magFilter===Ia||_.magFilter===sr||_.minFilter===Rt||_.minFilter===Gn||_.minFilter===Ia||_.minFilter===sr)&&Ue("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,Z[_.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,Z[_.wrapT]),(b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY)&&i.texParameteri(b,i.TEXTURE_WRAP_R,Z[_.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,le[_.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,le[_.minFilter]),_.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,de[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ct||_.minFilter!==Ia&&_.minFilter!==sr||_.type===Jt&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||r.get(_).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,a.getMaxAnisotropy())),r.get(_).__currentAnisotropy=_.anisotropy}}}function ae(b,_){let I=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",A));const $=_.source;let Y=h.get($);Y===void 0&&(Y={},h.set($,Y));const q=V(_);if(q!==b.__cacheKey){Y[q]===void 0&&(Y[q]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,I=!0),Y[q].usedTimes++;const ye=Y[b.__cacheKey];ye!==void 0&&(Y[b.__cacheKey].usedTimes--,ye.usedTimes===0&&E(_)),b.__cacheKey=q,b.__webglTexture=Y[q].texture}return I}function Fe(b,_,I){return Math.floor(Math.floor(b/I)/_)}function Ne(b,_,I,$){const Y=b.updateRanges;if(Y.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,I,$,_.data);else{Y.sort((Se,J)=>Se.start-J.start);let q=0;for(let Se=1;Se<Y.length;Se++){const J=Y[q],ie=Y[Se],be=J.start+J.count,ve=Fe(ie.start,_.width,4),he=Fe(J.start,_.width,4);ie.start<=be+1&&ve===he&&Fe(ie.start+ie.count-1,_.width,4)===ve?J.count=Math.max(J.count,ie.start+ie.count-J.start):(++q,Y[q]=ie)}Y.length=q+1;const ye=i.getParameter(i.UNPACK_ROW_LENGTH),se=i.getParameter(i.UNPACK_SKIP_PIXELS),Ee=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Se=0,J=Y.length;Se<J;Se++){const ie=Y[Se],be=Math.floor(ie.start/4),ve=Math.ceil(ie.count/4),he=be%_.width,Ve=Math.floor(be/_.width),D=ve;i.pixelStorei(i.UNPACK_SKIP_PIXELS,he),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ve),t.texSubImage2D(i.TEXTURE_2D,0,he,Ve,D,1,I,$,_.data)}b.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ye),i.pixelStorei(i.UNPACK_SKIP_PIXELS,se),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ee)}}function j(b,_,I){let $=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&($=i.TEXTURE_3D);const Y=ae(b,_),q=_.source;t.bindTexture($,b.__webglTexture,i.TEXTURE0+I);const ye=r.get(q);if(q.version!==ye.__version||Y===!0){t.activeTexture(i.TEXTURE0+I);const se=je.getPrimaries(je.workingColorSpace),Ee=_.colorSpace===Gi?null:je.getPrimaries(_.colorSpace),Se=_.colorSpace===Gi||se===Ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);let J=y(_.image,!1,a.maxTextureSize);J=it(_,J);const ie=n.convert(_.format,_.colorSpace),be=n.convert(_.type);let ve=T(_.internalFormat,ie,be,_.colorSpace,_.isVideoTexture);Me($,_);let he;const Ve=_.mipmaps,D=_.isVideoTexture!==!0,oe=ye.__version===void 0||Y===!0,te=q.dataReady,ge=w(_,J);if(_.isDepthTexture)ve=S(_.format===or,_.type),oe&&(D?t.texStorage2D(i.TEXTURE_2D,1,ve,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,ve,J.width,J.height,0,ie,be,null));else if(_.isDataTexture)if(Ve.length>0){D&&oe&&t.texStorage2D(i.TEXTURE_2D,ge,ve,Ve[0].width,Ve[0].height);for(let ee=0,X=Ve.length;ee<X;ee++)he=Ve[ee],D?te&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,he.width,he.height,ie,be,he.data):t.texImage2D(i.TEXTURE_2D,ee,ve,he.width,he.height,0,ie,be,he.data);_.generateMipmaps=!1}else D?(oe&&t.texStorage2D(i.TEXTURE_2D,ge,ve,J.width,J.height),te&&Ne(_,J,ie,be)):t.texImage2D(i.TEXTURE_2D,0,ve,J.width,J.height,0,ie,be,J.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){D&&oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,ve,Ve[0].width,Ve[0].height,J.depth);for(let ee=0,X=Ve.length;ee<X;ee++)if(he=Ve[ee],_.format!==Qt)if(ie!==null)if(D){if(te)if(_.layerUpdates.size>0){const _e=Bl(he.width,he.height,_.format,_.type);for(const De of _.layerUpdates){const yt=he.data.subarray(De*_e/he.data.BYTES_PER_ELEMENT,(De+1)*_e/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,De,he.width,he.height,1,ie,yt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,J.depth,ie,he.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,ve,he.width,he.height,J.depth,0,he.data,0,0);else Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?te&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,J.depth,ie,be,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,ve,he.width,he.height,J.depth,0,ie,be,he.data)}else{D&&oe&&t.texStorage2D(i.TEXTURE_2D,ge,ve,Ve[0].width,Ve[0].height);for(let ee=0,X=Ve.length;ee<X;ee++)he=Ve[ee],_.format!==Qt?ie!==null?D?te&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,he.width,he.height,ie,he.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,ve,he.width,he.height,0,he.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?te&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,he.width,he.height,ie,be,he.data):t.texImage2D(i.TEXTURE_2D,ee,ve,he.width,he.height,0,ie,be,he.data)}else if(_.isDataArrayTexture)if(D){if(oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,ve,J.width,J.height,J.depth),te)if(_.layerUpdates.size>0){const ee=Bl(J.width,J.height,_.format,_.type);for(const X of _.layerUpdates){const _e=J.data.subarray(X*ee/J.data.BYTES_PER_ELEMENT,(X+1)*ee/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,X,J.width,J.height,1,ie,be,_e)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ie,be,J.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ve,J.width,J.height,J.depth,0,ie,be,J.data);else if(_.isData3DTexture)D?(oe&&t.texStorage3D(i.TEXTURE_3D,ge,ve,J.width,J.height,J.depth),te&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ie,be,J.data)):t.texImage3D(i.TEXTURE_3D,0,ve,J.width,J.height,J.depth,0,ie,be,J.data);else if(_.isFramebufferTexture){if(oe)if(D)t.texStorage2D(i.TEXTURE_2D,ge,ve,J.width,J.height);else{let ee=J.width,X=J.height;for(let _e=0;_e<ge;_e++)t.texImage2D(i.TEXTURE_2D,_e,ve,ee,X,0,ie,be,null),ee>>=1,X>>=1}}else if(Ve.length>0){if(D&&oe){const ee=xe(Ve[0]);t.texStorage2D(i.TEXTURE_2D,ge,ve,ee.width,ee.height)}for(let ee=0,X=Ve.length;ee<X;ee++)he=Ve[ee],D?te&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ie,be,he):t.texImage2D(i.TEXTURE_2D,ee,ve,ie,be,he);_.generateMipmaps=!1}else if(D){if(oe){const ee=xe(J);t.texStorage2D(i.TEXTURE_2D,ge,ve,ee.width,ee.height)}te&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie,be,J)}else t.texImage2D(i.TEXTURE_2D,0,ve,ie,be,J);f(_)&&m($),ye.__version=q.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function K(b,_,I){if(_.image.length!==6)return;const $=ae(b,_),Y=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,b.__webglTexture,i.TEXTURE0+I);const q=r.get(Y);if(Y.version!==q.__version||$===!0){t.activeTexture(i.TEXTURE0+I);const ye=je.getPrimaries(je.workingColorSpace),se=_.colorSpace===Gi?null:je.getPrimaries(_.colorSpace),Ee=_.colorSpace===Gi||ye===se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Se=_.isCompressedTexture||_.image[0].isCompressedTexture,J=_.image[0]&&_.image[0].isDataTexture,ie=[];for(let X=0;X<6;X++)!Se&&!J?ie[X]=y(_.image[X],!0,a.maxCubemapSize):ie[X]=J?_.image[X].image:_.image[X],ie[X]=it(_,ie[X]);const be=ie[0],ve=n.convert(_.format,_.colorSpace),he=n.convert(_.type),Ve=T(_.internalFormat,ve,he,_.colorSpace),D=_.isVideoTexture!==!0,oe=q.__version===void 0||$===!0,te=Y.dataReady;let ge=w(_,be);Me(i.TEXTURE_CUBE_MAP,_);let ee;if(Se){D&&oe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Ve,be.width,be.height);for(let X=0;X<6;X++){ee=ie[X].mipmaps;for(let _e=0;_e<ee.length;_e++){const De=ee[_e];_.format!==Qt?ve!==null?D?te&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,0,0,De.width,De.height,ve,De.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,Ve,De.width,De.height,0,De.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,0,0,De.width,De.height,ve,he,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,Ve,De.width,De.height,0,ve,he,De.data)}}}else{if(ee=_.mipmaps,D&&oe){ee.length>0&&ge++;const X=xe(ie[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Ve,X.width,X.height)}for(let X=0;X<6;X++)if(J){D?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,ie[X].width,ie[X].height,ve,he,ie[X].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ve,ie[X].width,ie[X].height,0,ve,he,ie[X].data);for(let _e=0;_e<ee.length;_e++){const De=ee[_e].image[X].image;D?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,0,0,De.width,De.height,ve,he,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,Ve,De.width,De.height,0,ve,he,De.data)}}else{D?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,ve,he,ie[X]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ve,ve,he,ie[X]);for(let _e=0;_e<ee.length;_e++){const De=ee[_e];D?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,0,0,ve,he,De.image[X]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,Ve,ve,he,De.image[X])}}}f(_)&&m(i.TEXTURE_CUBE_MAP),q.__version=Y.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function ne(b,_,I,$,Y,q){const ye=n.convert(I.format,I.colorSpace),se=n.convert(I.type),Ee=T(I.internalFormat,ye,se,I.colorSpace),Se=r.get(_),J=r.get(I);if(J.__renderTarget=_,!Se.__hasExternalTextures){const ie=Math.max(1,_.width>>q),be=Math.max(1,_.height>>q);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?t.texImage3D(Y,q,Ee,ie,be,_.depth,0,ye,se,null):t.texImage2D(Y,q,Ee,ie,be,0,ye,se,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),_t(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,Y,J.__webglTexture,0,C(_)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,Y,J.__webglTexture,q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(b,_,I){if(i.bindRenderbuffer(i.RENDERBUFFER,b),_.depthBuffer){const $=_.depthTexture,Y=$&&$.isDepthTexture?$.type:null,q=S(_.stencilBuffer,Y),ye=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;_t(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,C(_),q,_.width,_.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,C(_),q,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,q,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ye,i.RENDERBUFFER,b)}else{const $=_.textures;for(let Y=0;Y<$.length;Y++){const q=$[Y],ye=n.convert(q.format,q.colorSpace),se=n.convert(q.type),Ee=T(q.internalFormat,ye,se,q.colorSpace);_t(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,C(_),Ee,_.width,_.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,C(_),Ee,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Ee,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function we(b,_,I){const $=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=r.get(_.depthTexture);if(Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),$){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,_.depthTexture.addEventListener("dispose",A)),Y.__webglTexture===void 0){Y.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Me(i.TEXTURE_CUBE_MAP,_.depthTexture);const Se=n.convert(_.depthTexture.format),J=n.convert(_.depthTexture.type);let ie;_.depthTexture.format===Di?ie=i.DEPTH_COMPONENT24:_.depthTexture.format===or&&(ie=i.DEPTH24_STENCIL8);for(let be=0;be<6;be++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,ie,_.width,_.height,0,Se,J,null)}}else k(_.depthTexture,0);const q=Y.__webglTexture,ye=C(_),se=$?i.TEXTURE_CUBE_MAP_POSITIVE_X+I:i.TEXTURE_2D,Ee=_.depthTexture.format===or?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Di)_t(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ee,se,q,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,Ee,se,q,0);else if(_.depthTexture.format===or)_t(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ee,se,q,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,Ee,se,q,0);else throw new Error("Unknown depthTexture format")}function pe(b){const _=r.get(b),I=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const $=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),$){const Y=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,$.removeEventListener("dispose",Y)};$.addEventListener("dispose",Y),_.__depthDisposeCallback=Y}_.__boundDepthTexture=$}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(I)for(let $=0;$<6;$++)we(_.__webglFramebuffer[$],b,$);else{const $=b.texture.mipmaps;$&&$.length>0?we(_.__webglFramebuffer[0],b,0):we(_.__webglFramebuffer,b,0)}else if(I){_.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[$]),_.__webglDepthbuffer[$]===void 0)_.__webglDepthbuffer[$]=i.createRenderbuffer(),Oe(_.__webglDepthbuffer[$],b,!1);else{const Y=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=_.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,q)}}else{const $=b.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Oe(_.__webglDepthbuffer,b,!1);else{const Y=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,q)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function qe(b,_,I){const $=r.get(b);_!==void 0&&ne($.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&pe(b)}function Qe(b){const _=b.texture,I=r.get(b),$=r.get(_);b.addEventListener("dispose",P);const Y=b.textures,q=b.isWebGLCubeRenderTarget===!0,ye=Y.length>1;if(ye||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=_.version,s.memory.textures++),q){I.__webglFramebuffer=[];for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer[se]=[];for(let Ee=0;Ee<_.mipmaps.length;Ee++)I.__webglFramebuffer[se][Ee]=i.createFramebuffer()}else I.__webglFramebuffer[se]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer=[];for(let se=0;se<_.mipmaps.length;se++)I.__webglFramebuffer[se]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(ye)for(let se=0,Ee=Y.length;se<Ee;se++){const Se=r.get(Y[se]);Se.__webglTexture===void 0&&(Se.__webglTexture=i.createTexture(),s.memory.textures++)}if(b.samples>0&&_t(b)===!1){I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let se=0;se<Y.length;se++){const Ee=Y[se];I.__webglColorRenderbuffer[se]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[se]);const Se=n.convert(Ee.format,Ee.colorSpace),J=n.convert(Ee.type),ie=T(Ee.internalFormat,Se,J,Ee.colorSpace,b.isXRRenderTarget===!0),be=C(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,be,ie,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.RENDERBUFFER,I.__webglColorRenderbuffer[se])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),Oe(I.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),Me(i.TEXTURE_CUBE_MAP,_);for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0)for(let Ee=0;Ee<_.mipmaps.length;Ee++)ne(I.__webglFramebuffer[se][Ee],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ee);else ne(I.__webglFramebuffer[se],b,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);f(_)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let se=0,Ee=Y.length;se<Ee;se++){const Se=Y[se],J=r.get(Se);let ie=i.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ie=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,J.__webglTexture),Me(ie,Se),ne(I.__webglFramebuffer,b,Se,i.COLOR_ATTACHMENT0+se,ie,0),f(Se)&&m(ie)}t.unbindTexture()}else{let se=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(se=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,$.__webglTexture),Me(se,_),_.mipmaps&&_.mipmaps.length>0)for(let Ee=0;Ee<_.mipmaps.length;Ee++)ne(I.__webglFramebuffer[Ee],b,_,i.COLOR_ATTACHMENT0,se,Ee);else ne(I.__webglFramebuffer,b,_,i.COLOR_ATTACHMENT0,se,0);f(_)&&m(se),t.unbindTexture()}b.depthBuffer&&pe(b)}function Ge(b){const _=b.textures;for(let I=0,$=_.length;I<$;I++){const Y=_[I];if(f(Y)){const q=x(b),ye=r.get(Y).__webglTexture;t.bindTexture(q,ye),m(q),t.unbindTexture()}}}const xt=[],gt=[];function At(b){if(b.samples>0){if(_t(b)===!1){const _=b.textures,I=b.width,$=b.height;let Y=i.COLOR_BUFFER_BIT;const q=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=r.get(b),se=_.length>1;if(se)for(let Se=0;Se<_.length;Se++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);const Ee=b.texture.mipmaps;Ee&&Ee.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let Se=0;Se<_.length;Se++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),se){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[Se]);const J=r.get(_[Se]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,I,$,0,0,I,$,Y,i.NEAREST),c===!0&&(xt.length=0,gt.length=0,xt.push(i.COLOR_ATTACHMENT0+Se),b.depthBuffer&&b.resolveDepthBuffer===!1&&(xt.push(q),gt.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,gt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,xt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),se)for(let Se=0;Se<_.length;Se++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,ye.__webglColorRenderbuffer[Se]);const J=r.get(_[Se]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,J,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const _=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function C(b){return Math.min(a.maxSamples,b.samples)}function _t(b){const _=r.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Ye(b){const _=s.render.frame;u.get(b)!==_&&(u.set(b,_),b.update())}function it(b,_){const I=b.colorSpace,$=b.format,Y=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||I!==$r&&I!==Gi&&(je.getTransfer(I)===Ke?($!==Qt||Y!==Zt)&&Ue("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xe("WebGLTextures: Unsupported texture color space:",I)),_}function xe(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=B,this.setTexture2D=k,this.setTexture2DArray=z,this.setTexture3D=O,this.setTextureCube=Q,this.rebindTextures=qe,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=Ge,this.updateMultisampleRenderTarget=At,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=ne,this.useMultisampledRTT=_t,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function e_(i,e){function t(r,a=Gi){let n;const s=je.getTransfer(a);if(r===Zt)return i.UNSIGNED_BYTE;if(r===Io)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Uo)return i.UNSIGNED_SHORT_5_5_5_1;if(r===zc)return i.UNSIGNED_INT_5_9_9_9_REV;if(r===Hc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(r===Fc)return i.BYTE;if(r===Bc)return i.SHORT;if(r===Ma)return i.UNSIGNED_SHORT;if(r===Do)return i.INT;if(r===_i)return i.UNSIGNED_INT;if(r===Jt)return i.FLOAT;if(r===$t)return i.HALF_FLOAT;if(r===kc)return i.ALPHA;if(r===Gc)return i.RGB;if(r===Qt)return i.RGBA;if(r===Di)return i.DEPTH_COMPONENT;if(r===or)return i.DEPTH_STENCIL;if(r===No)return i.RED;if(r===Oo)return i.RED_INTEGER;if(r===jr)return i.RG;if(r===Fo)return i.RG_INTEGER;if(r===Bo)return i.RGBA_INTEGER;if(r===un||r===hn||r===dn||r===pn)if(s===Ke)if(n=e.get("WEBGL_compressed_texture_s3tc_srgb"),n!==null){if(r===un)return n.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===hn)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===dn)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===pn)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(n=e.get("WEBGL_compressed_texture_s3tc"),n!==null){if(r===un)return n.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===hn)return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===dn)return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===pn)return n.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Hs||r===ks||r===Gs||r===Vs)if(n=e.get("WEBGL_compressed_texture_pvrtc"),n!==null){if(r===Hs)return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ks)return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Gs)return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Vs)return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ws||r===Xs||r===js||r===$s||r===qs||r===Ys||r===Zs)if(n=e.get("WEBGL_compressed_texture_etc"),n!==null){if(r===Ws||r===Xs)return s===Ke?n.COMPRESSED_SRGB8_ETC2:n.COMPRESSED_RGB8_ETC2;if(r===js)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:n.COMPRESSED_RGBA8_ETC2_EAC;if(r===$s)return n.COMPRESSED_R11_EAC;if(r===qs)return n.COMPRESSED_SIGNED_R11_EAC;if(r===Ys)return n.COMPRESSED_RG11_EAC;if(r===Zs)return n.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===Ks||r===Js||r===Qs||r===eo||r===to||r===io||r===ro||r===ao||r===no||r===so||r===oo||r===lo||r===co||r===uo)if(n=e.get("WEBGL_compressed_texture_astc"),n!==null){if(r===Ks)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:n.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Js)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:n.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Qs)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:n.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===eo)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:n.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===to)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:n.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===io)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:n.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===ro)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:n.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===ao)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:n.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===no)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:n.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===so)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:n.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===oo)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:n.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===lo)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:n.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===co)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:n.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===uo)return s===Ke?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:n.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===ho||r===po||r===fo)if(n=e.get("EXT_texture_compression_bptc"),n!==null){if(r===ho)return s===Ke?n.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:n.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===po)return n.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===fo)return n.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===mo||r===go||r===_o||r===vo)if(n=e.get("EXT_texture_compression_rgtc"),n!==null){if(r===mo)return n.COMPRESSED_RED_RGTC1_EXT;if(r===go)return n.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===_o)return n.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===vo)return n.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===xa?i.UNSIGNED_INT_24_8:i[r]!==void 0?i[r]:null}return{convert:t}}const t_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,i_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class r_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const r=new Qc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new ht({vertexShader:t_,fragmentShader:i_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ot(new qi(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class a_ extends fr{constructor(e,t){super();const r=this;let a=null,n=1,s=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,p=null,g=null;const y=typeof XRWebGLBinding<"u",f=new r_,m={},x=t.getContextAttributes();let T=null,S=null;const w=[],A=[],P=new Re;let v=null;const E=new jt;E.viewport=new ft;const W=new jt;W.viewport=new ft;const R=[E,W],B=new hd;let H=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let K=w[j];return K===void 0&&(K=new Yn,w[j]=K),K.getTargetRaySpace()},this.getControllerGrip=function(j){let K=w[j];return K===void 0&&(K=new Yn,w[j]=K),K.getGripSpace()},this.getHand=function(j){let K=w[j];return K===void 0&&(K=new Yn,w[j]=K),K.getHandSpace()};function k(j){const K=A.indexOf(j.inputSource);if(K===-1)return;const ne=w[K];ne!==void 0&&(ne.update(j.inputSource,j.frame,l||s),ne.dispatchEvent({type:j.type,data:j.inputSource}))}function z(){a.removeEventListener("select",k),a.removeEventListener("selectstart",k),a.removeEventListener("selectend",k),a.removeEventListener("squeeze",k),a.removeEventListener("squeezestart",k),a.removeEventListener("squeezeend",k),a.removeEventListener("end",z),a.removeEventListener("inputsourceschange",O);for(let j=0;j<w.length;j++){const K=A[j];K!==null&&(A[j]=null,w[j].disconnect(K))}H=null,V=null,f.reset();for(const j in m)delete m[j];e.setRenderTarget(T),p=null,h=null,d=null,a=null,S=null,Ne.stop(),r.isPresenting=!1,e.setPixelRatio(v),e.setSize(P.width,P.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){n=j,r.isPresenting===!0&&Ue("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,r.isPresenting===!0&&Ue("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(a,t)),d},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(j){if(a=j,a!==null){if(T=e.getRenderTarget(),a.addEventListener("select",k),a.addEventListener("selectstart",k),a.addEventListener("selectend",k),a.addEventListener("squeeze",k),a.addEventListener("squeezestart",k),a.addEventListener("squeezeend",k),a.addEventListener("end",z),a.addEventListener("inputsourceschange",O),x.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(P),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let K=null,ne=null,Oe=null;x.depth&&(Oe=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=x.stencil?or:Di,ne=x.stencil?xa:_i);const we={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:n};d=this.getBinding(),h=d.createProjectionLayer(we),a.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new kt(h.textureWidth,h.textureHeight,{format:Qt,type:Zt,depthTexture:new Sa(h.textureWidth,h.textureHeight,ne,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const K={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:n};p=new XRWebGLLayer(a,t,K),a.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new kt(p.framebufferWidth,p.framebufferHeight,{format:Qt,type:Zt,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await a.requestReferenceSpace(o),Ne.setContext(a),Ne.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function O(j){for(let K=0;K<j.removed.length;K++){const ne=j.removed[K],Oe=A.indexOf(ne);Oe>=0&&(A[Oe]=null,w[Oe].disconnect(ne))}for(let K=0;K<j.added.length;K++){const ne=j.added[K];let Oe=A.indexOf(ne);if(Oe===-1){for(let pe=0;pe<w.length;pe++)if(pe>=A.length){A.push(ne),Oe=pe;break}else if(A[pe]===null){A[pe]=ne,Oe=pe;break}if(Oe===-1)break}const we=w[Oe];we&&we.connect(ne)}}const Q=new L,Z=new L;function le(j,K,ne){Q.setFromMatrixPosition(K.matrixWorld),Z.setFromMatrixPosition(ne.matrixWorld);const Oe=Q.distanceTo(Z),we=K.projectionMatrix.elements,pe=ne.projectionMatrix.elements,qe=we[14]/(we[10]-1),Qe=we[14]/(we[10]+1),Ge=(we[9]+1)/we[5],xt=(we[9]-1)/we[5],gt=(we[8]-1)/we[0],At=(pe[8]+1)/pe[0],C=qe*gt,_t=qe*At,Ye=Oe/(-gt+At),it=Ye*-gt;if(K.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(it),j.translateZ(Ye),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),we[10]===-1)j.projectionMatrix.copy(K.projectionMatrix),j.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const xe=qe+Ye,b=Qe+Ye,_=C-it,I=_t+(Oe-it),$=Ge*Qe/b*xe,Y=xt*Qe/b*xe;j.projectionMatrix.makePerspective(_,I,$,Y,xe,b),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function de(j,K){K===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(K.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(a===null)return;let K=j.near,ne=j.far;f.texture!==null&&(f.depthNear>0&&(K=f.depthNear),f.depthFar>0&&(ne=f.depthFar)),B.near=W.near=E.near=K,B.far=W.far=E.far=ne,(H!==B.near||V!==B.far)&&(a.updateRenderState({depthNear:B.near,depthFar:B.far}),H=B.near,V=B.far),B.layers.mask=j.layers.mask|6,E.layers.mask=B.layers.mask&-5,W.layers.mask=B.layers.mask&-3;const Oe=j.parent,we=B.cameras;de(B,Oe);for(let pe=0;pe<we.length;pe++)de(we[pe],Oe);we.length===2?le(B,E,W):B.projectionMatrix.copy(E.projectionMatrix),Me(j,B,Oe)};function Me(j,K,ne){ne===null?j.matrix.copy(K.matrixWorld):(j.matrix.copy(ne.matrixWorld),j.matrix.invert(),j.matrix.multiply(K.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(K.projectionMatrix),j.projectionMatrixInverse.copy(K.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Mo*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(j){c=j,h!==null&&(h.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(B)},this.getCameraTexture=function(j){return m[j]};let ae=null;function Fe(j,K){if(u=K.getViewerPose(l||s),g=K,u!==null){const ne=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let Oe=!1;ne.length!==B.cameras.length&&(B.cameras.length=0,Oe=!0);for(let pe=0;pe<ne.length;pe++){const qe=ne[pe];let Qe=null;if(p!==null)Qe=p.getViewport(qe);else{const xt=d.getViewSubImage(h,qe);Qe=xt.viewport,pe===0&&(e.setRenderTargetTextures(S,xt.colorTexture,xt.depthStencilTexture),e.setRenderTarget(S))}let Ge=R[pe];Ge===void 0&&(Ge=new jt,Ge.layers.enable(pe),Ge.viewport=new ft,R[pe]=Ge),Ge.matrix.fromArray(qe.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(qe.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),pe===0&&(B.matrix.copy(Ge.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Oe===!0&&B.cameras.push(Ge)}const we=a.enabledFeatures;if(we&&we.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&y){d=r.getBinding();const pe=d.getDepthInformation(ne[0]);pe&&pe.isValid&&pe.texture&&f.init(pe,a.renderState)}if(we&&we.includes("camera-access")&&y){e.state.unbindTexture(),d=r.getBinding();for(let pe=0;pe<ne.length;pe++){const qe=ne[pe].camera;if(qe){let Qe=m[qe];Qe||(Qe=new Qc,m[qe]=Qe);const Ge=d.getCameraImage(qe);Qe.sourceTexture=Ge}}}}for(let ne=0;ne<w.length;ne++){const Oe=A[ne],we=w[ne];Oe!==null&&we!==void 0&&we.update(Oe,K,l||s)}ae&&ae(j,K),K.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:K}),g=null}const Ne=new iu;Ne.setAnimationLoop(Fe),this.setAnimationLoop=function(j){ae=j},this.dispose=function(){}}}const rr=new hr,n_=new nt;function s_(i,e){function t(f,m){f.matrixAutoUpdate===!0&&f.updateMatrix(),m.value.copy(f.matrix)}function r(f,m){m.color.getRGB(f.fogColor.value,eu(i)),m.isFog?(f.fogNear.value=m.near,f.fogFar.value=m.far):m.isFogExp2&&(f.fogDensity.value=m.density)}function a(f,m,x,T,S){m.isMeshBasicMaterial?n(f,m):m.isMeshLambertMaterial?(n(f,m),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(n(f,m),d(f,m)):m.isMeshPhongMaterial?(n(f,m),u(f,m),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(n(f,m),h(f,m),m.isMeshPhysicalMaterial&&p(f,m,S)):m.isMeshMatcapMaterial?(n(f,m),g(f,m)):m.isMeshDepthMaterial?n(f,m):m.isMeshDistanceMaterial?(n(f,m),y(f,m)):m.isMeshNormalMaterial?n(f,m):m.isLineBasicMaterial?(s(f,m),m.isLineDashedMaterial&&o(f,m)):m.isPointsMaterial?c(f,m,x,T):m.isSpriteMaterial?l(f,m):m.isShadowMaterial?(f.color.value.copy(m.color),f.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function n(f,m){f.opacity.value=m.opacity,m.color&&f.diffuse.value.copy(m.color),m.emissive&&f.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(f.map.value=m.map,t(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.bumpMap&&(f.bumpMap.value=m.bumpMap,t(m.bumpMap,f.bumpMapTransform),f.bumpScale.value=m.bumpScale,m.side===Dt&&(f.bumpScale.value*=-1)),m.normalMap&&(f.normalMap.value=m.normalMap,t(m.normalMap,f.normalMapTransform),f.normalScale.value.copy(m.normalScale),m.side===Dt&&f.normalScale.value.negate()),m.displacementMap&&(f.displacementMap.value=m.displacementMap,t(m.displacementMap,f.displacementMapTransform),f.displacementScale.value=m.displacementScale,f.displacementBias.value=m.displacementBias),m.emissiveMap&&(f.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,f.emissiveMapTransform)),m.specularMap&&(f.specularMap.value=m.specularMap,t(m.specularMap,f.specularMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest);const x=e.get(m),T=x.envMap,S=x.envMapRotation;T&&(f.envMap.value=T,rr.copy(S),rr.x*=-1,rr.y*=-1,rr.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(rr.y*=-1,rr.z*=-1),f.envMapRotation.value.setFromMatrix4(n_.makeRotationFromEuler(rr)),f.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=m.reflectivity,f.ior.value=m.ior,f.refractionRatio.value=m.refractionRatio),m.lightMap&&(f.lightMap.value=m.lightMap,f.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,f.lightMapTransform)),m.aoMap&&(f.aoMap.value=m.aoMap,f.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,f.aoMapTransform))}function s(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,m.map&&(f.map.value=m.map,t(m.map,f.mapTransform))}function o(f,m){f.dashSize.value=m.dashSize,f.totalSize.value=m.dashSize+m.gapSize,f.scale.value=m.scale}function c(f,m,x,T){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.size.value=m.size*x,f.scale.value=T*.5,m.map&&(f.map.value=m.map,t(m.map,f.uvTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function l(f,m){f.diffuse.value.copy(m.color),f.opacity.value=m.opacity,f.rotation.value=m.rotation,m.map&&(f.map.value=m.map,t(m.map,f.mapTransform)),m.alphaMap&&(f.alphaMap.value=m.alphaMap,t(m.alphaMap,f.alphaMapTransform)),m.alphaTest>0&&(f.alphaTest.value=m.alphaTest)}function u(f,m){f.specular.value.copy(m.specular),f.shininess.value=Math.max(m.shininess,1e-4)}function d(f,m){m.gradientMap&&(f.gradientMap.value=m.gradientMap)}function h(f,m){f.metalness.value=m.metalness,m.metalnessMap&&(f.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,f.metalnessMapTransform)),f.roughness.value=m.roughness,m.roughnessMap&&(f.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,f.roughnessMapTransform)),m.envMap&&(f.envMapIntensity.value=m.envMapIntensity)}function p(f,m,x){f.ior.value=m.ior,m.sheen>0&&(f.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),f.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(f.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,f.sheenColorMapTransform)),m.sheenRoughnessMap&&(f.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,f.sheenRoughnessMapTransform))),m.clearcoat>0&&(f.clearcoat.value=m.clearcoat,f.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(f.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,f.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(f.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Dt&&f.clearcoatNormalScale.value.negate())),m.dispersion>0&&(f.dispersion.value=m.dispersion),m.iridescence>0&&(f.iridescence.value=m.iridescence,f.iridescenceIOR.value=m.iridescenceIOR,f.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(f.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,f.iridescenceMapTransform)),m.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),m.transmission>0&&(f.transmission.value=m.transmission,f.transmissionSamplerMap.value=x.texture,f.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(f.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,f.transmissionMapTransform)),f.thickness.value=m.thickness,m.thicknessMap&&(f.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=m.attenuationDistance,f.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(f.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(f.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=m.specularIntensity,f.specularColor.value.copy(m.specularColor),m.specularColorMap&&(f.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,f.specularColorMapTransform)),m.specularIntensityMap&&(f.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,m){m.matcap&&(f.matcap.value=m.matcap)}function y(f,m){const x=e.get(m).light;f.referencePosition.value.setFromMatrixPosition(x.matrixWorld),f.nearDistance.value=x.shadow.camera.near,f.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function o_(i,e,t,r){let a={},n={},s=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,T){const S=T.program;r.uniformBlockBinding(x,S)}function l(x,T){let S=a[x.id];S===void 0&&(g(x),S=u(x),a[x.id]=S,x.addEventListener("dispose",f));const w=T.program;r.updateUBOMapping(x,w);const A=e.render.frame;n[x.id]!==A&&(h(x),n[x.id]=A)}function u(x){const T=d();x.__bindingPointIndex=T;const S=i.createBuffer(),w=x.__size,A=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,w,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,S),S}function d(){for(let x=0;x<o;x++)if(s.indexOf(x)===-1)return s.push(x),x;return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const T=a[x.id],S=x.uniforms,w=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let A=0,P=S.length;A<P;A++){const v=Array.isArray(S[A])?S[A]:[S[A]];for(let E=0,W=v.length;E<W;E++){const R=v[E];if(p(R,A,E,w)===!0){const B=R.__offset,H=Array.isArray(R.value)?R.value:[R.value];let V=0;for(let k=0;k<H.length;k++){const z=H[k],O=y(z);typeof z=="number"||typeof z=="boolean"?(R.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,B+V,R.__data)):z.isMatrix3?(R.__data[0]=z.elements[0],R.__data[1]=z.elements[1],R.__data[2]=z.elements[2],R.__data[3]=0,R.__data[4]=z.elements[3],R.__data[5]=z.elements[4],R.__data[6]=z.elements[5],R.__data[7]=0,R.__data[8]=z.elements[6],R.__data[9]=z.elements[7],R.__data[10]=z.elements[8],R.__data[11]=0):(z.toArray(R.__data,V),V+=O.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(x,T,S,w){const A=x.value,P=T+"_"+S;if(w[P]===void 0)return typeof A=="number"||typeof A=="boolean"?w[P]=A:w[P]=A.clone(),!0;{const v=w[P];if(typeof A=="number"||typeof A=="boolean"){if(v!==A)return w[P]=A,!0}else if(v.equals(A)===!1)return v.copy(A),!0}return!1}function g(x){const T=x.uniforms;let S=0;const w=16;for(let P=0,v=T.length;P<v;P++){const E=Array.isArray(T[P])?T[P]:[T[P]];for(let W=0,R=E.length;W<R;W++){const B=E[W],H=Array.isArray(B.value)?B.value:[B.value];for(let V=0,k=H.length;V<k;V++){const z=H[V],O=y(z),Q=S%w,Z=Q%O.boundary,le=Q+Z;S+=Z,le!==0&&w-le<O.storage&&(S+=w-le),B.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=O.storage}}}const A=S%w;return A>0&&(S+=w-A),x.__size=S,x.__cache={},this}function y(x){const T={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(T.boundary=4,T.storage=4):x.isVector2?(T.boundary=8,T.storage=8):x.isVector3||x.isColor?(T.boundary=16,T.storage=12):x.isVector4?(T.boundary=16,T.storage=16):x.isMatrix3?(T.boundary=48,T.storage=48):x.isMatrix4?(T.boundary=64,T.storage=64):x.isTexture?Ue("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ue("WebGLRenderer: Unsupported uniform value type.",x),T}function f(x){const T=x.target;T.removeEventListener("dispose",f);const S=s.indexOf(T.__bindingPointIndex);s.splice(S,1),i.deleteBuffer(a[T.id]),delete a[T.id],delete n[T.id]}function m(){for(const x in a)i.deleteBuffer(a[x]);s=[],a={},n={}}return{bind:c,update:l,dispose:m}}const l_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ci=null;function c_(){return ci===null&&(ci=new Wo(l_,16,16,jr,$t),ci.name="DFG_LUT",ci.minFilter=Rt,ci.magFilter=Rt,ci.wrapS=wi,ci.wrapT=wi,ci.generateMipmaps=!1,ci.needsUpdate=!0),ci}class jo{constructor(e={}){const{canvas:t=vh(),context:r=null,depth:a=!0,stencil:n=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:p=Zt}=e;this.isWebGLRenderer=!0;let g;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=r.getContextAttributes().alpha}else g=s;const y=p,f=new Set([Bo,Fo,Oo]),m=new Set([Zt,_i,Ma,xa,Io,Uo]),x=new Uint32Array(4),T=new Int32Array(4);let S=null,w=null;const A=[],P=[];let v=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=gi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let W=!1;this._outputColorSpace=zt;let R=0,B=0,H=null,V=-1,k=null;const z=new ft,O=new ft;let Q=null;const Z=new Ae(0);let le=0,de=t.width,Me=t.height,ae=1,Fe=null,Ne=null;const j=new ft(0,0,de,Me),K=new ft(0,0,de,Me);let ne=!1;const Oe=new Zc;let we=!1,pe=!1;const qe=new nt,Qe=new L,Ge=new ft,xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let gt=!1;function At(){return H===null?ae:1}let C=r;function _t(M,U){return t.getContext(M,U)}try{const M={alpha:!0,depth:a,stencil:n,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Po}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",De,!1),t.addEventListener("webglcontextcreationerror",yt,!1),C===null){const U="webgl2";if(C=_t(U,M),C===null)throw _t(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw Xe("WebGLRenderer: "+M.message),M}let Ye,it,xe,b,_,I,$,Y,q,ye,se,Ee,Se,J,ie,be,ve,he,Ve,D,oe,te,ge;function ee(){Ye=new um(C),Ye.init(),oe=new e_(C,Ye),it=new im(C,Ye,e,oe),xe=new Jg(C,Ye),it.reversedDepthBuffer&&h&&xe.buffers.depth.setReversed(!0),b=new pm(C),_=new Bg,I=new Qg(C,Ye,xe,_,it,oe,b),$=new cm(E),Y=new _d(C),te=new em(C,Y),q=new hm(C,Y,b,te),ye=new mm(C,q,Y,te,b),he=new fm(C,it,I),ie=new rm(_),se=new Fg(E,$,Ye,it,te,ie),Ee=new s_(E,_),Se=new Hg,J=new jg(Ye),ve=new Qf(E,$,xe,ye,g,c),be=new Kg(E,ye,it),ge=new o_(C,b,it,xe),Ve=new tm(C,Ye,b),D=new dm(C,Ye,b),b.programs=se.programs,E.capabilities=it,E.extensions=Ye,E.properties=_,E.renderLists=Se,E.shadowMap=be,E.state=xe,E.info=b}ee(),y!==Zt&&(v=new _m(y,t.width,t.height,a,n));const X=new a_(E,C);this.xr=X,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const M=Ye.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Ye.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(M){M!==void 0&&(ae=M,this.setSize(de,Me,!1))},this.getSize=function(M){return M.set(de,Me)},this.setSize=function(M,U,G=!0){if(X.isPresenting){Ue("WebGLRenderer: Can't change size while VR device is presenting.");return}de=M,Me=U,t.width=Math.floor(M*ae),t.height=Math.floor(U*ae),G===!0&&(t.style.width=M+"px",t.style.height=U+"px"),v!==null&&v.setSize(t.width,t.height),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(de*ae,Me*ae).floor()},this.setDrawingBufferSize=function(M,U,G){de=M,Me=U,ae=G,t.width=Math.floor(M*G),t.height=Math.floor(U*G),this.setViewport(0,0,M,U)},this.setEffects=function(M){if(y===Zt){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let U=0;U<M.length;U++)if(M[U].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(z)},this.getViewport=function(M){return M.copy(j)},this.setViewport=function(M,U,G,F){M.isVector4?j.set(M.x,M.y,M.z,M.w):j.set(M,U,G,F),xe.viewport(z.copy(j).multiplyScalar(ae).round())},this.getScissor=function(M){return M.copy(K)},this.setScissor=function(M,U,G,F){M.isVector4?K.set(M.x,M.y,M.z,M.w):K.set(M,U,G,F),xe.scissor(O.copy(K).multiplyScalar(ae).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(M){xe.setScissorTest(ne=M)},this.setOpaqueSort=function(M){Fe=M},this.setTransparentSort=function(M){Ne=M},this.getClearColor=function(M){return M.copy(ve.getClearColor())},this.setClearColor=function(){ve.setClearColor(...arguments)},this.getClearAlpha=function(){return ve.getClearAlpha()},this.setClearAlpha=function(){ve.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,G=!0){let F=0;if(M){let N=!1;if(H!==null){const re=H.texture.format;N=f.has(re)}if(N){const re=H.texture.type,ue=m.has(re),me=ve.getClearColor(),fe=ve.getClearAlpha(),Ie=me.r,ze=me.g,We=me.b;ue?(x[0]=Ie,x[1]=ze,x[2]=We,x[3]=fe,C.clearBufferuiv(C.COLOR,0,x)):(T[0]=Ie,T[1]=ze,T[2]=We,T[3]=fe,C.clearBufferiv(C.COLOR,0,T))}else F|=C.COLOR_BUFFER_BIT}U&&(F|=C.DEPTH_BUFFER_BIT),G&&(F|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F!==0&&C.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",De,!1),t.removeEventListener("webglcontextcreationerror",yt,!1),ve.dispose(),Se.dispose(),J.dispose(),_.dispose(),$.dispose(),ye.dispose(),te.dispose(),ge.dispose(),se.dispose(),X.dispose(),X.removeEventListener("sessionstart",Zo),X.removeEventListener("sessionend",Ko),Yi.stop()};function _e(M){M.preventDefault(),hl("WebGLRenderer: Context Lost."),W=!0}function De(){hl("WebGLRenderer: Context Restored."),W=!1;const M=b.autoReset,U=be.enabled,G=be.autoUpdate,F=be.needsUpdate,N=be.type;ee(),b.autoReset=M,be.enabled=U,be.autoUpdate=G,be.needsUpdate=F,be.type=N}function yt(M){Xe("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Ze(M){const U=M.target;U.removeEventListener("dispose",Ze),Mi(U)}function Mi(M){xi(M),_.remove(M)}function xi(M){const U=_.get(M).programs;U!==void 0&&(U.forEach(function(G){se.releaseProgram(G)}),M.isShaderMaterial&&se.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,G,F,N,re){U===null&&(U=xt);const ue=N.isMesh&&N.matrixWorld.determinant()<0,me=Pu(M,U,G,F,N);xe.setMaterial(F,ue);let fe=G.index,Ie=1;if(F.wireframe===!0){if(fe=q.getWireframeAttribute(G),fe===void 0)return;Ie=2}const ze=G.drawRange,We=G.attributes.position;let Le=ze.start*Ie,rt=(ze.start+ze.count)*Ie;re!==null&&(Le=Math.max(Le,re.start*Ie),rt=Math.min(rt,(re.start+re.count)*Ie)),fe!==null?(Le=Math.max(Le,0),rt=Math.min(rt,fe.count)):We!=null&&(Le=Math.max(Le,0),rt=Math.min(rt,We.count));const pt=rt-Le;if(pt<0||pt===1/0)return;te.setup(N,F,me,G,fe);let lt,et=Ve;if(fe!==null&&(lt=Y.get(fe),et=D,et.setIndex(lt)),N.isMesh)F.wireframe===!0?(xe.setLineWidth(F.wireframeLinewidth*At()),et.setMode(C.LINES)):et.setMode(C.TRIANGLES);else if(N.isLine){let dt=F.linewidth;dt===void 0&&(dt=1),xe.setLineWidth(dt*At()),N.isLineSegments?et.setMode(C.LINES):N.isLineLoop?et.setMode(C.LINE_LOOP):et.setMode(C.LINE_STRIP)}else N.isPoints?et.setMode(C.POINTS):N.isSprite&&et.setMode(C.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)wn("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),et.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Ye.get("WEBGL_multi_draw"))et.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const dt=N._multiDrawStarts,Te=N._multiDrawCounts,Vt=N._multiDrawCount,Zi=fe?Y.get(fe).bytesPerElement:1,ti=_.get(F).currentProgram.getUniforms();for(let oi=0;oi<Vt;oi++)ti.setValue(C,"_gl_DrawID",oi),et.render(dt[oi]/Zi,Te[oi])}else if(N.isInstancedMesh)et.renderInstances(Le,pt,N.count);else if(G.isInstancedBufferGeometry){const dt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Te=Math.min(G.instanceCount,dt);et.renderInstances(Le,pt,Te)}else et.render(Le,pt)};function Yo(M,U,G){M.transparent===!0&&M.side===ni&&M.forceSinglePass===!1?(M.side=Dt,M.needsUpdate=!0,Da(M,U,G),M.side=si,M.needsUpdate=!0,Da(M,U,G),M.side=ni):Da(M,U,G)}this.compile=function(M,U,G=null){G===null&&(G=M),w=J.get(G),w.init(U),P.push(w),G.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(w.pushLight(N),N.castShadow&&w.pushShadow(N))}),M!==G&&M.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(w.pushLight(N),N.castShadow&&w.pushShadow(N))}),w.setupLights();const F=new Set;return M.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const re=N.material;if(re)if(Array.isArray(re))for(let ue=0;ue<re.length;ue++){const me=re[ue];Yo(me,G,N),F.add(me)}else Yo(re,G,N),F.add(re)}),w=P.pop(),F},this.compileAsync=function(M,U,G=null){const F=this.compile(M,U,G);return new Promise(N=>{function re(){if(F.forEach(function(ue){_.get(ue).currentProgram.isReady()&&F.delete(ue)}),F.size===0){N(M);return}setTimeout(re,10)}Ye.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let Bn=null;function Lu(M){Bn&&Bn(M)}function Zo(){Yi.stop()}function Ko(){Yi.start()}const Yi=new iu;Yi.setAnimationLoop(Lu),typeof self<"u"&&Yi.setContext(self),this.setAnimationLoop=function(M){Bn=M,X.setAnimationLoop(M),M===null?Yi.stop():Yi.start()},X.addEventListener("sessionstart",Zo),X.addEventListener("sessionend",Ko),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;const G=X.enabled===!0&&X.isPresenting===!0,F=v!==null&&(H===null||G)&&v.begin(E,H);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(X.cameraAutoUpdate===!0&&X.updateCamera(U),U=X.getCamera()),M.isScene===!0&&M.onBeforeRender(E,M,U,H),w=J.get(M,P.length),w.init(U),P.push(w),qe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Oe.setFromProjectionMatrix(qe,pi,U.reversedDepth),pe=this.localClippingEnabled,we=ie.init(this.clippingPlanes,pe),S=Se.get(M,A.length),S.init(),A.push(S),X.enabled===!0&&X.isPresenting===!0){const re=E.xr.getDepthSensingMesh();re!==null&&zn(re,U,-1/0,E.sortObjects)}zn(M,U,0,E.sortObjects),S.finish(),E.sortObjects===!0&&S.sort(Fe,Ne),gt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,gt&&ve.addToRenderList(S,M),this.info.render.frame++,we===!0&&ie.beginShadows();const N=w.state.shadowsArray;if(be.render(N,M,U),we===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset(),(F&&v.hasRenderPass())===!1){const re=S.opaque,ue=S.transmissive;if(w.setupLights(),U.isArrayCamera){const me=U.cameras;if(ue.length>0)for(let fe=0,Ie=me.length;fe<Ie;fe++){const ze=me[fe];Qo(re,ue,M,ze)}gt&&ve.render(M);for(let fe=0,Ie=me.length;fe<Ie;fe++){const ze=me[fe];Jo(S,M,ze,ze.viewport)}}else ue.length>0&&Qo(re,ue,M,U),gt&&ve.render(M),Jo(S,M,U)}H!==null&&B===0&&(I.updateMultisampleRenderTarget(H),I.updateRenderTargetMipmap(H)),F&&v.end(E),M.isScene===!0&&M.onAfterRender(E,M,U),te.resetDefaultState(),V=-1,k=null,P.pop(),P.length>0?(w=P[P.length-1],we===!0&&ie.setGlobalState(E.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?S=A[A.length-1]:S=null};function zn(M,U,G,F){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)G=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Oe.intersectsSprite(M)){F&&Ge.setFromMatrixPosition(M.matrixWorld).applyMatrix4(qe);const re=ye.update(M),ue=M.material;ue.visible&&S.push(M,re,ue,G,Ge.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Oe.intersectsObject(M))){const re=ye.update(M),ue=M.material;if(F&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ge.copy(M.boundingSphere.center)):(re.boundingSphere===null&&re.computeBoundingSphere(),Ge.copy(re.boundingSphere.center)),Ge.applyMatrix4(M.matrixWorld).applyMatrix4(qe)),Array.isArray(ue)){const me=re.groups;for(let fe=0,Ie=me.length;fe<Ie;fe++){const ze=me[fe],We=ue[ze.materialIndex];We&&We.visible&&S.push(M,re,We,G,Ge.z,ze)}}else ue.visible&&S.push(M,re,ue,G,Ge.z,null)}}const N=M.children;for(let re=0,ue=N.length;re<ue;re++)zn(N[re],U,G,F)}function Jo(M,U,G,F){const{opaque:N,transmissive:re,transparent:ue}=M;w.setupLightsView(G),we===!0&&ie.setGlobalState(E.clippingPlanes,G),F&&xe.viewport(z.copy(F)),N.length>0&&Pa(N,U,G),re.length>0&&Pa(re,U,G),ue.length>0&&Pa(ue,U,G),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function Qo(M,U,G,F){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[F.id]===void 0){const We=Ye.has("EXT_color_buffer_half_float")||Ye.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[F.id]=new kt(1,1,{generateMipmaps:!0,type:We?$t:Zt,minFilter:sr,samples:Math.max(4,it.samples),stencilBuffer:n,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace})}const N=w.state.transmissionRenderTarget[F.id],re=F.viewport||z;N.setSize(re.z*E.transmissionResolutionScale,re.w*E.transmissionResolutionScale);const ue=E.getRenderTarget(),me=E.getActiveCubeFace(),fe=E.getActiveMipmapLevel();E.setRenderTarget(N),E.getClearColor(Z),le=E.getClearAlpha(),le<1&&E.setClearColor(16777215,.5),E.clear(),gt&&ve.render(G);const Ie=E.toneMapping;E.toneMapping=gi;const ze=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),w.setupLightsView(F),we===!0&&ie.setGlobalState(E.clippingPlanes,F),Pa(M,G,F),I.updateMultisampleRenderTarget(N),I.updateRenderTargetMipmap(N),Ye.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Le=0,rt=U.length;Le<rt;Le++){const pt=U[Le],{object:lt,geometry:et,material:dt,group:Te}=pt;if(dt.side===ni&&lt.layers.test(F.layers)){const Vt=dt.side;dt.side=Dt,dt.needsUpdate=!0,el(lt,G,F,et,dt,Te),dt.side=Vt,dt.needsUpdate=!0,We=!0}}We===!0&&(I.updateMultisampleRenderTarget(N),I.updateRenderTargetMipmap(N))}E.setRenderTarget(ue,me,fe),E.setClearColor(Z,le),ze!==void 0&&(F.viewport=ze),E.toneMapping=Ie}function Pa(M,U,G){const F=U.isScene===!0?U.overrideMaterial:null;for(let N=0,re=M.length;N<re;N++){const ue=M[N],{object:me,geometry:fe,group:Ie}=ue;let ze=ue.material;ze.allowOverride===!0&&F!==null&&(ze=F),me.layers.test(G.layers)&&el(me,U,G,fe,ze,Ie)}}function el(M,U,G,F,N,re){M.onBeforeRender(E,U,G,F,N,re),M.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),N.onBeforeRender(E,U,G,F,M,re),N.transparent===!0&&N.side===ni&&N.forceSinglePass===!1?(N.side=Dt,N.needsUpdate=!0,E.renderBufferDirect(G,U,F,N,M,re),N.side=si,N.needsUpdate=!0,E.renderBufferDirect(G,U,F,N,M,re),N.side=ni):E.renderBufferDirect(G,U,F,N,M,re),M.onAfterRender(E,U,G,F,N,re)}function Da(M,U,G){U.isScene!==!0&&(U=xt);const F=_.get(M),N=w.state.lights,re=w.state.shadowsArray,ue=N.state.version,me=se.getParameters(M,N.state,re,U,G),fe=se.getProgramCacheKey(me);let Ie=F.programs;F.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?U.environment:null,F.fog=U.fog;const ze=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;F.envMap=$.get(M.envMap||F.environment,ze),F.envMapRotation=F.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Ie===void 0&&(M.addEventListener("dispose",Ze),Ie=new Map,F.programs=Ie);let We=Ie.get(fe);if(We!==void 0){if(F.currentProgram===We&&F.lightsStateVersion===ue)return il(M,me),We}else me.uniforms=se.getUniforms(M),M.onBeforeCompile(me,E),We=se.acquireProgram(me,fe),Ie.set(fe,We),F.uniforms=me.uniforms;const Le=F.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Le.clippingPlanes=ie.uniform),il(M,me),F.needsLights=Iu(M),F.lightsStateVersion=ue,F.needsLights&&(Le.ambientLightColor.value=N.state.ambient,Le.lightProbe.value=N.state.probe,Le.directionalLights.value=N.state.directional,Le.directionalLightShadows.value=N.state.directionalShadow,Le.spotLights.value=N.state.spot,Le.spotLightShadows.value=N.state.spotShadow,Le.rectAreaLights.value=N.state.rectArea,Le.ltc_1.value=N.state.rectAreaLTC1,Le.ltc_2.value=N.state.rectAreaLTC2,Le.pointLights.value=N.state.point,Le.pointLightShadows.value=N.state.pointShadow,Le.hemisphereLights.value=N.state.hemi,Le.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Le.spotLightMatrix.value=N.state.spotLightMatrix,Le.spotLightMap.value=N.state.spotLightMap,Le.pointShadowMatrix.value=N.state.pointShadowMatrix),F.currentProgram=We,F.uniformsList=null,We}function tl(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=_n.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function il(M,U){const G=_.get(M);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.batchingColor=U.batchingColor,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.instancingMorph=U.instancingMorph,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function Pu(M,U,G,F,N){U.isScene!==!0&&(U=xt),I.resetTextureUnits();const re=U.fog,ue=F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial?U.environment:null,me=H===null?E.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:$r,fe=F.isMeshStandardMaterial||F.isMeshLambertMaterial&&!F.envMap||F.isMeshPhongMaterial&&!F.envMap,Ie=$.get(F.envMap||ue,fe),ze=F.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,We=!!G.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Le=!!G.morphAttributes.position,rt=!!G.morphAttributes.normal,pt=!!G.morphAttributes.color;let lt=gi;F.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(lt=E.toneMapping);const et=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,dt=et!==void 0?et.length:0,Te=_.get(F),Vt=w.state.lights;if(we===!0&&(pe===!0||M!==k)){const vt=M===k&&F.id===V;ie.setState(F,M,vt)}let Zi=!1;F.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Vt.state.version||Te.outputColorSpace!==me||N.isBatchedMesh&&Te.batching===!1||!N.isBatchedMesh&&Te.batching===!0||N.isBatchedMesh&&Te.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Te.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Te.instancing===!1||!N.isInstancedMesh&&Te.instancing===!0||N.isSkinnedMesh&&Te.skinning===!1||!N.isSkinnedMesh&&Te.skinning===!0||N.isInstancedMesh&&Te.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Te.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Te.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Te.instancingMorph===!1&&N.morphTexture!==null||Te.envMap!==Ie||F.fog===!0&&Te.fog!==re||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==ie.numPlanes||Te.numIntersection!==ie.numIntersection)||Te.vertexAlphas!==ze||Te.vertexTangents!==We||Te.morphTargets!==Le||Te.morphNormals!==rt||Te.morphColors!==pt||Te.toneMapping!==lt||Te.morphTargetsCount!==dt)&&(Zi=!0):(Zi=!0,Te.__version=F.version);let ti=Te.currentProgram;Zi===!0&&(ti=Da(F,U,N));let oi=!1,Ki=!1,_r=!1;const tt=ti.getUniforms(),wt=Te.uniforms;if(xe.useProgram(ti.program)&&(oi=!0,Ki=!0,_r=!0),F.id!==V&&(V=F.id,Ki=!0),oi||k!==M){xe.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),tt.setValue(C,"projectionMatrix",M.projectionMatrix),tt.setValue(C,"viewMatrix",M.matrixWorldInverse);const vt=tt.map.cameraPosition;vt!==void 0&&vt.setValue(C,Qe.setFromMatrixPosition(M.matrixWorld)),it.logarithmicDepthBuffer&&tt.setValue(C,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&tt.setValue(C,"isOrthographic",M.isOrthographicCamera===!0),k!==M&&(k=M,Ki=!0,_r=!0)}if(Te.needsLights&&(Vt.state.directionalShadowMap.length>0&&tt.setValue(C,"directionalShadowMap",Vt.state.directionalShadowMap,I),Vt.state.spotShadowMap.length>0&&tt.setValue(C,"spotShadowMap",Vt.state.spotShadowMap,I),Vt.state.pointShadowMap.length>0&&tt.setValue(C,"pointShadowMap",Vt.state.pointShadowMap,I)),N.isSkinnedMesh){tt.setOptional(C,N,"bindMatrix"),tt.setOptional(C,N,"bindMatrixInverse");const vt=N.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),tt.setValue(C,"boneTexture",vt.boneTexture,I))}N.isBatchedMesh&&(tt.setOptional(C,N,"batchingTexture"),tt.setValue(C,"batchingTexture",N._matricesTexture,I),tt.setOptional(C,N,"batchingIdTexture"),tt.setValue(C,"batchingIdTexture",N._indirectTexture,I),tt.setOptional(C,N,"batchingColorTexture"),N._colorsTexture!==null&&tt.setValue(C,"batchingColorTexture",N._colorsTexture,I));const Ii=G.morphAttributes;if((Ii.position!==void 0||Ii.normal!==void 0||Ii.color!==void 0)&&he.update(N,G,ti),(Ki||Te.receiveShadow!==N.receiveShadow)&&(Te.receiveShadow=N.receiveShadow,tt.setValue(C,"receiveShadow",N.receiveShadow)),(F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial)&&F.envMap===null&&U.environment!==null&&(wt.envMapIntensity.value=U.environmentIntensity),wt.dfgLUT!==void 0&&(wt.dfgLUT.value=c_()),Ki&&(tt.setValue(C,"toneMappingExposure",E.toneMappingExposure),Te.needsLights&&Du(wt,_r),re&&F.fog===!0&&Ee.refreshFogUniforms(wt,re),Ee.refreshMaterialUniforms(wt,F,ae,Me,w.state.transmissionRenderTarget[M.id]),_n.upload(C,tl(Te),wt,I)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(_n.upload(C,tl(Te),wt,I),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&tt.setValue(C,"center",N.center),tt.setValue(C,"modelViewMatrix",N.modelViewMatrix),tt.setValue(C,"normalMatrix",N.normalMatrix),tt.setValue(C,"modelMatrix",N.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const vt=F.uniformsGroups;for(let Qr=0,vr=vt.length;Qr<vr;Qr++){const rl=vt[Qr];ge.update(rl,ti),ge.bind(rl,ti)}}return ti}function Du(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function Iu(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(M,U,G){const F=_.get(M);F.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),_.get(M.texture).__webglTexture=U,_.get(M.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:G,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,U){const G=_.get(M);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0};const Uu=C.createFramebuffer();this.setRenderTarget=function(M,U=0,G=0){H=M,R=U,B=G;let F=null,N=!1,re=!1;if(M){const ue=_.get(M);if(ue.__useDefaultFramebuffer!==void 0){xe.bindFramebuffer(C.FRAMEBUFFER,ue.__webglFramebuffer),z.copy(M.viewport),O.copy(M.scissor),Q=M.scissorTest,xe.viewport(z),xe.scissor(O),xe.setScissorTest(Q),V=-1;return}else if(ue.__webglFramebuffer===void 0)I.setupRenderTarget(M);else if(ue.__hasExternalTextures)I.rebindTextures(M,_.get(M.texture).__webglTexture,_.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ie=M.depthTexture;if(ue.__boundDepthTexture!==Ie){if(Ie!==null&&_.has(Ie)&&(M.width!==Ie.image.width||M.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(M)}}const me=M.texture;(me.isData3DTexture||me.isDataArrayTexture||me.isCompressedArrayTexture)&&(re=!0);const fe=_.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(fe[U])?F=fe[U][G]:F=fe[U],N=!0):M.samples>0&&I.useMultisampledRTT(M)===!1?F=_.get(M).__webglMultisampledFramebuffer:Array.isArray(fe)?F=fe[G]:F=fe,z.copy(M.viewport),O.copy(M.scissor),Q=M.scissorTest}else z.copy(j).multiplyScalar(ae).floor(),O.copy(K).multiplyScalar(ae).floor(),Q=ne;if(G!==0&&(F=Uu),xe.bindFramebuffer(C.FRAMEBUFFER,F)&&xe.drawBuffers(M,F),xe.viewport(z),xe.scissor(O),xe.setScissorTest(Q),N){const ue=_.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+U,ue.__webglTexture,G)}else if(re){const ue=U;for(let me=0;me<M.textures.length;me++){const fe=_.get(M.textures[me]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+me,fe.__webglTexture,G,ue)}}else if(M!==null&&G!==0){const ue=_.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ue.__webglTexture,G)}V=-1},this.readRenderTargetPixels=function(M,U,G,F,N,re,ue,me=0){if(!(M&&M.isWebGLRenderTarget)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=_.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe){xe.bindFramebuffer(C.FRAMEBUFFER,fe);try{const Ie=M.textures[me],ze=Ie.format,We=Ie.type;if(M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+me),!it.textureFormatReadable(ze)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!it.textureTypeReadable(We)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-F&&G>=0&&G<=M.height-N&&C.readPixels(U,G,F,N,oe.convert(ze),oe.convert(We),re)}finally{const Ie=H!==null?_.get(H).__webglFramebuffer:null;xe.bindFramebuffer(C.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(M,U,G,F,N,re,ue,me=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=_.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe)if(U>=0&&U<=M.width-F&&G>=0&&G<=M.height-N){xe.bindFramebuffer(C.FRAMEBUFFER,fe);const Ie=M.textures[me],ze=Ie.format,We=Ie.type;if(M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+me),!it.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!it.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Le=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Le),C.bufferData(C.PIXEL_PACK_BUFFER,re.byteLength,C.STREAM_READ),C.readPixels(U,G,F,N,oe.convert(ze),oe.convert(We),0);const rt=H!==null?_.get(H).__webglFramebuffer:null;xe.bindFramebuffer(C.FRAMEBUFFER,rt);const pt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Mh(C,pt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Le),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,re),C.deleteBuffer(Le),C.deleteSync(pt),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,U=null,G=0){const F=Math.pow(2,-G),N=Math.floor(M.image.width*F),re=Math.floor(M.image.height*F),ue=U!==null?U.x:0,me=U!==null?U.y:0;I.setTexture2D(M,0),C.copyTexSubImage2D(C.TEXTURE_2D,G,0,0,ue,me,N,re),xe.unbindTexture()};const Nu=C.createFramebuffer(),Ou=C.createFramebuffer();this.copyTextureToTexture=function(M,U,G=null,F=null,N=0,re=0){let ue,me,fe,Ie,ze,We,Le,rt,pt;const lt=M.isCompressedTexture?M.mipmaps[re]:M.image;if(G!==null)ue=G.max.x-G.min.x,me=G.max.y-G.min.y,fe=G.isBox3?G.max.z-G.min.z:1,Ie=G.min.x,ze=G.min.y,We=G.isBox3?G.min.z:0;else{const wt=Math.pow(2,-N);ue=Math.floor(lt.width*wt),me=Math.floor(lt.height*wt),M.isDataArrayTexture?fe=lt.depth:M.isData3DTexture?fe=Math.floor(lt.depth*wt):fe=1,Ie=0,ze=0,We=0}F!==null?(Le=F.x,rt=F.y,pt=F.z):(Le=0,rt=0,pt=0);const et=oe.convert(U.format),dt=oe.convert(U.type);let Te;U.isData3DTexture?(I.setTexture3D(U,0),Te=C.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(I.setTexture2DArray(U,0),Te=C.TEXTURE_2D_ARRAY):(I.setTexture2D(U,0),Te=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,U.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,U.unpackAlignment);const Vt=C.getParameter(C.UNPACK_ROW_LENGTH),Zi=C.getParameter(C.UNPACK_IMAGE_HEIGHT),ti=C.getParameter(C.UNPACK_SKIP_PIXELS),oi=C.getParameter(C.UNPACK_SKIP_ROWS),Ki=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,lt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,lt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ie),C.pixelStorei(C.UNPACK_SKIP_ROWS,ze),C.pixelStorei(C.UNPACK_SKIP_IMAGES,We);const _r=M.isDataArrayTexture||M.isData3DTexture,tt=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){const wt=_.get(M),Ii=_.get(U),vt=_.get(wt.__renderTarget),Qr=_.get(Ii.__renderTarget);xe.bindFramebuffer(C.READ_FRAMEBUFFER,vt.__webglFramebuffer),xe.bindFramebuffer(C.DRAW_FRAMEBUFFER,Qr.__webglFramebuffer);for(let vr=0;vr<fe;vr++)_r&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,_.get(M).__webglTexture,N,We+vr),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,_.get(U).__webglTexture,re,pt+vr)),C.blitFramebuffer(Ie,ze,ue,me,Le,rt,ue,me,C.DEPTH_BUFFER_BIT,C.NEAREST);xe.bindFramebuffer(C.READ_FRAMEBUFFER,null),xe.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(N!==0||M.isRenderTargetTexture||_.has(M)){const wt=_.get(M),Ii=_.get(U);xe.bindFramebuffer(C.READ_FRAMEBUFFER,Nu),xe.bindFramebuffer(C.DRAW_FRAMEBUFFER,Ou);for(let vt=0;vt<fe;vt++)_r?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,wt.__webglTexture,N,We+vt):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,wt.__webglTexture,N),tt?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ii.__webglTexture,re,pt+vt):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ii.__webglTexture,re),N!==0?C.blitFramebuffer(Ie,ze,ue,me,Le,rt,ue,me,C.COLOR_BUFFER_BIT,C.NEAREST):tt?C.copyTexSubImage3D(Te,re,Le,rt,pt+vt,Ie,ze,ue,me):C.copyTexSubImage2D(Te,re,Le,rt,Ie,ze,ue,me);xe.bindFramebuffer(C.READ_FRAMEBUFFER,null),xe.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else tt?M.isDataTexture||M.isData3DTexture?C.texSubImage3D(Te,re,Le,rt,pt,ue,me,fe,et,dt,lt.data):U.isCompressedArrayTexture?C.compressedTexSubImage3D(Te,re,Le,rt,pt,ue,me,fe,et,lt.data):C.texSubImage3D(Te,re,Le,rt,pt,ue,me,fe,et,dt,lt):M.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,re,Le,rt,ue,me,et,dt,lt.data):M.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,re,Le,rt,lt.width,lt.height,et,lt.data):C.texSubImage2D(C.TEXTURE_2D,re,Le,rt,ue,me,et,dt,lt);C.pixelStorei(C.UNPACK_ROW_LENGTH,Vt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Zi),C.pixelStorei(C.UNPACK_SKIP_PIXELS,ti),C.pixelStorei(C.UNPACK_SKIP_ROWS,oi),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ki),re===0&&U.generateMipmaps&&C.generateMipmap(Te),xe.unbindTexture()},this.initRenderTarget=function(M){_.get(M).__webglFramebuffer===void 0&&I.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?I.setTextureCube(M,0):M.isData3DTexture?I.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?I.setTexture2DArray(M,0):I.setTexture2D(M,0),xe.unbindTexture()},this.resetState=function(){R=0,B=0,H=null,xe.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();const lu=new WeakMap;function u_(i,{onSubmit:e,tabComplete:t}={}){const r=new AbortController,{signal:a}=r,n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s={abortController:r,history:[],historyIndex:-1,partialInput:"",reducedMotion:n};lu.set(i,s);const o=i.querySelector(".s9-terminal__input");o&&o.addEventListener("keydown",c=>{d_(i,c,{onSubmit:e,tabComplete:t})},{signal:a})}function Pe(i,e,t){const r=i.querySelector(".s9-terminal__output");if(!r)return;const a=document.createElement("span");a.className=`s9-terminal__line s9-terminal__line--${t}`,a.textContent=e,r.appendChild(a);const n=200,s=r.querySelectorAll(".s9-terminal__line");s.length>n&&s[0].remove(),p_(r)}function h_(i){const e=i.querySelector(".s9-terminal__output");e&&(e.querySelectorAll(".s9-terminal__line").forEach(t=>t.remove()),i.dispatchEvent(new CustomEvent("s9:terminal-clear",{bubbles:!0})))}function d_(i,e,{onSubmit:t,tabComplete:r}){const a=lu.get(i);if(!a)return;const n=i.querySelector(".s9-terminal__input");if(n)switch(e.key){case"Enter":{const s=n.value;if(!s)return;Pe(i,s,"cmd"),typeof t=="function"&&t(s),i.dispatchEvent(new CustomEvent("s9:terminal-submit",{bubbles:!0,detail:{command:s,timestamp:new Date().toISOString()}})),a.history.unshift(s),a.historyIndex=-1,a.partialInput="",n.value="";break}case"ArrowUp":{if(e.preventDefault(),a.history.length===0)return;a.historyIndex===-1&&(a.partialInput=n.value);const s=a.historyIndex+1;if(s<a.history.length){a.historyIndex=s,n.value=a.history[a.historyIndex];const o=n.value.length;n.setSelectionRange(o,o)}break}case"ArrowDown":{if(e.preventDefault(),a.historyIndex===-1)return;if(a.historyIndex>0){a.historyIndex-=1,n.value=a.history[a.historyIndex];const s=n.value.length;n.setSelectionRange(s,s)}else{a.historyIndex=-1,n.value=a.partialInput;const s=n.value.length;n.setSelectionRange(s,s)}break}case"Tab":{if(e.preventDefault(),typeof r=="function"){const s=r(n.value);s!=null&&(n.value=s)}break}default:{if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!a.reducedMotion&&Math.random()<.01){const s=i.querySelector(".s9-terminal__output");if(s){const o=Array.from(s.querySelectorAll(".s9-terminal__line")).slice(-8);if(o.length>0){const c=o[Math.floor(Math.random()*o.length)];c.classList.add("glitch-enter"),c.addEventListener("animationend",l=>{l.animationName==="glitch"&&c.classList.remove("glitch-enter")},{once:!0})}}}break}}}function p_(i){i.scrollTop=i.scrollHeight}const cu=new WeakMap;function f_(i){const e=new AbortController,{signal:t}=e,r={ac:e,paused:!1,filter:null};cu.set(i,r);const a=i.querySelector(".s9-stream__body");a&&(a.addEventListener("mouseenter",()=>{r.paused=!0,a.dataset.paused="true"},{signal:t}),a.addEventListener("mouseleave",()=>{r.paused=!1,a.dataset.paused="false",uu(a)},{signal:t}),a.addEventListener("click",n=>{const s=n.target.closest(".s9-stream__row");if(!s)return;const o=s.classList.contains("s9-stream__row--pinned");s.classList.toggle("s9-stream__row--pinned",!o),i.dispatchEvent(new CustomEvent("s9:stream-row-pinned",{bubbles:!0,detail:{row:s,pinned:!o}}))},{signal:t}))}function ba(i,{timestamp:e,source:t,message:r,alert:a=!1}){const n=i.querySelector(".s9-stream__body");if(!n)return;const s=cu.get(i),o=(s==null?void 0:s.filter)??null,c=document.createElement("div");c.className="s9-stream__row",a&&c.classList.add("s9-stream__row--alert"),o&&t!==o&&(c.hidden=!0),c.innerHTML=`<span class="s9-stream__timestamp">${ys(e)}</span><span class="s9-stream__source">${ys(t)}</span><span class="s9-stream__message">${ys(r)}</span>`,c.classList.add("glitch-enter"),c.addEventListener("animationend",()=>c.classList.remove("glitch-enter"),{once:!0}),n.appendChild(c),n.children.length>100&&n.removeChild(n.firstChild),s!=null&&s.paused||uu(n)}function uu(i){i.scrollTop=i.scrollHeight}function ys(i){return String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function m_(i,e){e(),i.classList.remove("glitch-enter"),i.offsetWidth,i.classList.add("glitch-enter"),i.addEventListener("animationend",()=>i.classList.remove("glitch-enter"),{once:!0})}const lc=new WeakMap;function sn(i,e){const t=Math.max(0,Math.min(100,e)),r=i.querySelector(".s9-telemetry__bar-fill");if(r){r.style.width=`${t}%`;const o=["s9-telemetry__bar-fill--ok","s9-telemetry__bar-fill--warning","s9-telemetry__bar-fill--critical"];r.classList.remove(...o),t<=60?r.classList.add("s9-telemetry__bar-fill--ok"):t<=85?r.classList.add("s9-telemetry__bar-fill--warning"):r.classList.add("s9-telemetry__bar-fill--critical")}const a=i.querySelector(".s9-telemetry__value");a&&(a.textContent=Math.round(t).toString());const n=lc.get(i)??!1,s=t>85;s&&!n&&i.dispatchEvent(new CustomEvent("s9:telemetry-threshold",{bubbles:!0,detail:{value:t}})),lc.set(i,s)}const g_=8e3;function __(i,{level:e="critical",code:t,message:r,persistent:a=!1}){const n=document.createElement("div");n.className=`s9-alert s9-alert--${e}`,a&&(n.dataset.persistent="true");const s=e==="critical"?"⬡":"⚠",o=new Date().toISOString().replace("T"," ").substring(0,19)+" UTC";return n.innerHTML=`<span class="s9-alert__icon" aria-hidden="true">${s}</span><div class="s9-alert__body"><span class="s9-alert__code">${Ss(t)}</span><span class="s9-alert__message">${Ss(r)}</span></div><span class="s9-alert__timestamp">${Ss(o)}</span><button class="s9-alert__dismiss" aria-label="Dismiss alert">✕</button>`,n.classList.add("glitch-enter"),n.addEventListener("animationend",()=>n.classList.remove("glitch-enter"),{once:!0}),n.querySelector(".s9-alert__dismiss").addEventListener("click",()=>{cc(n)}),i.appendChild(n),a||setTimeout(()=>{n.isConnected&&cc(n)},g_),n}function cc(i){var e;if(!i.isConnected)return;const t=((e=i.querySelector(".s9-alert__code"))==null?void 0:e.textContent)??"";i.classList.add("s9-alert--dismissing"),i.addEventListener("transitionend",()=>{i.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:t}})),i.remove()},{once:!0}),setTimeout(()=>{i.isConnected&&(i.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:t}})),i.remove())},400)}function Ss(i){return String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const Ht="http://www.w3.org/2000/svg",gr=new WeakMap;function v_(i,{nodes:e=[],edges:t=[]}={}){const r=new AbortController,{signal:a}=r,n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s={abortController:r,nodeMap:new Map,edgeMap:new Map,activeNodeId:null,reducedMotion:n};gr.set(i,s);const o=document.createElementNS(Ht,"svg");o.setAttribute("class","s9-matrix__canvas"),o.setAttribute("viewBox","0 0 100 100"),o.setAttribute("preserveAspectRatio","xMidYMid meet"),o.setAttribute("role","img"),o.setAttribute("aria-label","Network topology matrix");const c=document.createElementNS(Ht,"defs"),l=document.createElementNS(Ht,"g");l.setAttribute("class","s9-matrix__edges");const u=document.createElementNS(Ht,"g");u.setAttribute("class","s9-matrix__nodes"),o.appendChild(c),o.appendChild(l),o.appendChild(u),i.appendChild(o),e.forEach(d=>x_(i,d)),t.forEach(d=>y_(i,d)),t.forEach(d=>{d.active&&Eo(i,d.id)}),o.addEventListener("click",d=>{const h=d.target.closest("[data-node-id]");h?vn(i,h.dataset.nodeId):s.activeNodeId!==null&&vn(i,null)},{signal:a}),o.addEventListener("keydown",d=>{if(d.key==="Enter"||d.key===" "){const h=d.target.closest("[data-node-id]");h&&(d.preventDefault(),vn(i,h.dataset.nodeId))}},{signal:a})}function M_(i,e){const t=gr.get(i);if(!t)return;const r=t.nodeMap.get(e);if(!r||r.classList.contains("s9-matrix__node--active"))return;r.classList.add("s9-matrix__node--pulsing");const a=r.querySelector(".s9-matrix__node-ring");a&&a.addEventListener("animationend",n=>{n.animationName==="matrix-ring-pulse"&&r.classList.remove("s9-matrix__node--pulsing")},{once:!0})}function Eo(i,e,t=null){const r=gr.get(i);if(!r)return;if(e===null){for(const[y]of r.edgeMap)hu(i,y);return}const a=r.edgeMap.get(e);if(!a||a.active)return;const n=i.querySelector(".s9-matrix__canvas");if(!n)return;const s=n.querySelector(".s9-matrix__edges");if(!s)return;const{line:o,x1:c,y1:l,x2:u,y2:d}=a;o&&o.parentNode&&o.parentNode.removeChild(o);const h=`s9-edge-${e}`,p=document.createElementNS(Ht,"path");p.setAttribute("class","s9-matrix__edge s9-matrix__edge--active"),p.setAttribute("id",h),p.setAttribute("data-edge-id",e),p.setAttribute("d",`M ${c} ${l} L ${u} ${d}`),s.appendChild(p);let g=null;if(!r.reducedMotion){g=document.createElementNS(Ht,"circle"),g.setAttribute("class","s9-matrix__edge-dot"),g.setAttribute("r","1.2"),t&&(g.style.fill=t,g.style.filter=`drop-shadow(0 0 2px ${t})`);const y=document.createElementNS(Ht,"animateMotion");y.setAttribute("dur","2s"),y.setAttribute("repeatCount","indefinite");const f=document.createElementNS(Ht,"mpath");f.setAttributeNS("http://www.w3.org/1999/xlink","href",`#${h}`),y.appendChild(f),g.appendChild(y),s.appendChild(g)}a.line=p,a.dot=g,a.active=!0}function hu(i,e){const t=gr.get(i);if(!t)return;const r=t.edgeMap.get(e);if(!r||!r.active)return;const a=i.querySelector(".s9-matrix__canvas");if(!a)return;const n=a.querySelector(".s9-matrix__edges");if(!n)return;const{line:s,dot:o,x1:c,y1:l,x2:u,y2:d}=r;o&&o.parentNode&&o.parentNode.removeChild(o),s&&s.parentNode&&s.parentNode.removeChild(s);const h=document.createElementNS(Ht,"line");h.setAttribute("class","s9-matrix__edge"),h.setAttribute("data-edge-id",e),h.setAttribute("x1",c),h.setAttribute("y1",l),h.setAttribute("x2",u),h.setAttribute("y2",d),n.appendChild(h),r.line=h,r.dot=null,r.active=!1}function vn(i,e){const t=gr.get(i);if(!t)return;if(t.activeNodeId!==null){const a=t.nodeMap.get(t.activeNodeId);a&&(a.classList.remove("s9-matrix__node--active"),a.setAttribute("aria-pressed","false")),i.dispatchEvent(new CustomEvent("s9:matrix-node-deselect",{bubbles:!0,detail:{nodeId:t.activeNodeId}})),t.activeNodeId=null}if(e===null)return;const r=t.nodeMap.get(e);r&&(r.classList.add("s9-matrix__node--active"),r.setAttribute("aria-pressed","true"),t.activeNodeId=e,i.dispatchEvent(new CustomEvent("s9:matrix-node-click",{bubbles:!0,detail:{nodeId:e,label:r.getAttribute("aria-label")??e}})))}function x_(i,{id:e,x:t,y:r,label:a,root:n=!1}){const s=gr.get(i);if(!s)return;const o=i.querySelector(".s9-matrix__canvas");if(!o)return;const c=o.querySelector(".s9-matrix__nodes");if(!c)return;const l=document.createElementNS(Ht,"g");l.setAttribute("class",`s9-matrix__node${n?" s9-matrix__node--root":""}`),l.setAttribute("data-node-id",e),l.setAttribute("tabindex","0"),l.setAttribute("role","button"),l.setAttribute("aria-label",a),l.setAttribute("aria-pressed","false");const u=document.createElementNS(Ht,"circle");u.setAttribute("class","s9-matrix__node-ring"),u.setAttribute("cx",t),u.setAttribute("cy",r),u.setAttribute("r","4");const d=document.createElementNS(Ht,"circle");d.setAttribute("class","s9-matrix__node-core"),d.setAttribute("cx",t),d.setAttribute("cy",r),d.setAttribute("r","2.5");const h=document.createElementNS(Ht,"text");h.setAttribute("class","s9-matrix__node-label"),h.setAttribute("x",t),h.setAttribute("y",r+3.5),h.textContent=a,l.appendChild(u),l.appendChild(d),l.appendChild(h),c.appendChild(l),s.nodeMap.set(e,l)}function y_(i,{id:e,from:t,to:r}){const a=gr.get(i);if(!a)return;const n=i.querySelector(".s9-matrix__canvas");if(!n)return;const s=n.querySelector(".s9-matrix__edges");if(!s)return;const o=a.nodeMap.get(t),c=a.nodeMap.get(r),l=o?parseFloat(o.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,u=o?parseFloat(o.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,d=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,h=c?parseFloat(c.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,p=document.createElementNS(Ht,"line");p.setAttribute("class","s9-matrix__edge"),p.setAttribute("data-edge-id",e),p.setAttribute("x1",l),p.setAttribute("y1",u),p.setAttribute("x2",d),p.setAttribute("y2",h),s.appendChild(p),a.edgeMap.set(e,{line:p,dot:null,active:!1,from:t,to:r,x1:l,y1:u,x2:d,y2:h})}const uc={type:"change"},$o={type:"start"},du={type:"end"},on=new Un,hc=new Hi,S_=Math.cos(70*Sh.DEG2RAD),St=new L,Ft=2*Math.PI,Je={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},bs=1e-6;class b_ extends md{constructor(e,t=null){super(e,t),this.state=Je.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Hr.ROTATE,MIDDLE:Hr.DOLLY,RIGHT:Hr.PAN},this.touches={ONE:Br.ROTATE,TWO:Br.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new ji,this._lastTargetPosition=new L,this._quat=new ji().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Fl,this._sphericalDelta=new Fl,this._scale=1,this._panOffset=new L,this._rotateStart=new Re,this._rotateEnd=new Re,this._rotateDelta=new Re,this._panStart=new Re,this._panEnd=new Re,this._panDelta=new Re,this._dollyStart=new Re,this._dollyEnd=new Re,this._dollyDelta=new Re,this._dollyDirection=new L,this._mouse=new Re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=T_.bind(this),this._onPointerDown=E_.bind(this),this._onPointerUp=A_.bind(this),this._onContextMenu=I_.bind(this),this._onMouseWheel=R_.bind(this),this._onKeyDown=L_.bind(this),this._onTouchStart=P_.bind(this),this._onTouchMove=D_.bind(this),this._onMouseDown=w_.bind(this),this._onMouseMove=C_.bind(this),this._interceptControlDown=U_.bind(this),this._interceptControlUp=N_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(uc),this.update(),this.state=Je.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;St.copy(t).sub(this.target),St.applyQuaternion(this._quat),this._spherical.setFromVector3(St),this.autoRotate&&this.state===Je.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(r)&&isFinite(a)&&(r<-Math.PI?r+=Ft:r>Math.PI&&(r-=Ft),a<-Math.PI?a+=Ft:a>Math.PI&&(a-=Ft),r<=a?this._spherical.theta=Math.max(r,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+a)/2?Math.max(r,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let n=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const s=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),n=s!=this._spherical.radius}if(St.setFromSpherical(this._spherical),St.applyQuaternion(this._quatInverse),t.copy(this.target).add(St),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let s=null;if(this.object.isPerspectiveCamera){const o=St.length();s=this._clampDistance(o*this._scale);const c=o-s;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),n=!!c}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),n=c!==this.object.zoom;const l=new L(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),s=St.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;s!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position):(on.origin.copy(this.object.position),on.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(on.direction))<S_?this.object.lookAt(this.target):(hc.setFromNormalAndCoplanarPoint(this.object.up,this.target),on.intersectPlane(hc,this.target))))}else if(this.object.isOrthographicCamera){const s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),s!==this.object.zoom&&(this.object.updateProjectionMatrix(),n=!0)}return this._scale=1,this._performCursorZoom=!1,n||this._lastPosition.distanceToSquared(this.object.position)>bs||8*(1-this._lastQuaternion.dot(this.object.quaternion))>bs||this._lastTargetPosition.distanceToSquared(this.target)>bs?(this.dispatchEvent(uc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Ft/60*this.autoRotateSpeed*e:Ft/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){St.setFromMatrixColumn(t,0),St.multiplyScalar(-e),this._panOffset.add(St)}_panUp(e,t){this.screenSpacePanning===!0?St.setFromMatrixColumn(t,1):(St.setFromMatrixColumn(t,0),St.crossVectors(this.object.up,St)),St.multiplyScalar(e),this._panOffset.add(St)}_pan(e,t){const r=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;St.copy(a).sub(this.target);let n=St.length();n*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*n/r.clientHeight,this.object.matrix),this._panUp(2*t*n/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),a=e-r.left,n=t-r.top,s=r.width,o=r.height;this._mouse.x=a/s*2-1,this._mouse.y=-(n/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Ft*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ft*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Ft*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Ft*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Ft*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Ft*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._rotateStart.set(r,a)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._panStart.set(r,a)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),r=e.pageX-t.x,a=e.pageY-t.y,n=Math.sqrt(r*r+a*a);this._dollyStart.set(0,n)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const r=this._getSecondPointerPosition(e),a=.5*(e.pageX+r.x),n=.5*(e.pageY+r.y);this._rotateEnd.set(a,n)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Ft*this._rotateDelta.x/t.clientHeight),this._rotateUp(Ft*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._panEnd.set(r,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),r=e.pageX-t.x,a=e.pageY-t.y,n=Math.sqrt(r*r+a*a);this._dollyEnd.set(0,n),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const s=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(s,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Re,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,r={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function E_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function T_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function A_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(du),this.state=Je.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function w_(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Hr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Je.DOLLY;break;case Hr.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Je.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Je.ROTATE}break;case Hr.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Je.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Je.PAN}break;default:this.state=Je.NONE}this.state!==Je.NONE&&this.dispatchEvent($o)}function C_(i){switch(this.state){case Je.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Je.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Je.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function R_(i){this.enabled===!1||this.enableZoom===!1||this.state!==Je.NONE||(i.preventDefault(),this.dispatchEvent($o),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(du))}function L_(i){this.enabled!==!1&&this._handleKeyDown(i)}function P_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Br.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Je.TOUCH_ROTATE;break;case Br.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Je.TOUCH_PAN;break;default:this.state=Je.NONE}break;case 2:switch(this.touches.TWO){case Br.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Je.TOUCH_DOLLY_PAN;break;case Br.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Je.TOUCH_DOLLY_ROTATE;break;default:this.state=Je.NONE}break;default:this.state=Je.NONE}this.state!==Je.NONE&&this.dispatchEvent($o)}function D_(i){switch(this._trackPointer(i),this.state){case Je.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Je.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Je.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Je.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Je.NONE}}function I_(i){this.enabled!==!1&&i.preventDefault()}function U_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function N_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Mn={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class La{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const O_=new Nn(-1,1,1,-1,0,1);class F_ extends ut{constructor(){super(),this.setAttribute("position",new Ut([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ut([0,2,0,0,2,0],2))}}const B_=new F_;class pu{constructor(e){this._mesh=new ot(B_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,O_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class fu extends La{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ht?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ln.clone(e.uniforms),this.material=new ht({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new pu(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class dc extends La{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){const a=e.getContext(),n=e.state;n.buffers.color.setMask(!1),n.buffers.depth.setMask(!1),n.buffers.color.setLocked(!0),n.buffers.depth.setLocked(!0);let s,o;this.inverse?(s=0,o=1):(s=1,o=0),n.buffers.stencil.setTest(!0),n.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),n.buffers.stencil.setFunc(a.ALWAYS,s,4294967295),n.buffers.stencil.setClear(o),n.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),n.buffers.color.setLocked(!1),n.buffers.depth.setLocked(!1),n.buffers.color.setMask(!0),n.buffers.depth.setMask(!0),n.buffers.stencil.setLocked(!1),n.buffers.stencil.setFunc(a.EQUAL,1,4294967295),n.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),n.buffers.stencil.setLocked(!0)}}class z_ extends La{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class H_{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const r=e.getSize(new Re);this._width=r.width,this._height=r.height,t=new kt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:$t}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new fu(Mn),this.copyPass.material.blending=mi,this.timer=new dd}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let r=!1;for(let a=0,n=this.passes.length;a<n;a++){const s=this.passes[a];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),s.needsSwap){if(r){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}dc!==void 0&&(s instanceof dc?r=!0:s instanceof z_&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Re);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const r=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(r,a),this.renderTarget2.setSize(r,a);for(let n=0;n<this.passes.length;n++)this.passes[n].setSize(r,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class k_ extends La{constructor(e,t,r=null,a=null,n=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=a,this.clearAlpha=n,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ae}render(e,t,r){const a=e.autoClear;e.autoClear=!1;let n,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(n=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(n),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=a}}const G_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ae(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Yr extends La{constructor(e,t=1,r,a){super(),this.strength=t,this.radius=r,this.threshold=a,this.resolution=e!==void 0?new Re(e.x,e.y):new Re(256,256),this.clearColor=new Ae(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let n=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new kt(n,s,{type:$t}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new kt(n,s,{type:$t});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const h=new kt(n,s,{type:$t});h.texture.name="UnrealBloomPass.v"+u,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),n=Math.round(n/2),s=Math.round(s/2)}const o=G_;this.highPassUniforms=Ln.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ht({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];n=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Re(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ln.clone(Mn.uniforms),this.blendMaterial=new ht({uniforms:this.copyUniforms,vertexShader:Mn.vertexShader,fragmentShader:Mn.fragmentShader,premultipliedAlpha:!0,blending:It,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ae,this._oldClearAlpha=1,this._basic=new di,this._fsQuad=new pu(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let r=Math.round(e/2),a=Math.round(t/2);this.renderTargetBright.setSize(r,a);for(let n=0;n<this.nMips;n++)this.renderTargetsHorizontal[n].setSize(r,a),this.renderTargetsVertical[n].setSize(r,a),this.separableBlurMaterials[n].uniforms.invSize.value=new Re(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2)}render(e,t,r,a,n){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),n&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=Yr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Yr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,n&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(r),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=s}_getSeparableBlurMaterial(e){const t=[],r=e/3;for(let a=0;a<e;a++)t.push(.39894*Math.exp(-.5*a*a/(r*r))/r);return new ht({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Re(.5,.5)},direction:{value:new Re(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new ht({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}Yr.BlurDirectionX=new Re(1,0);Yr.BlurDirectionY=new Re(0,1);function V_(i){return i}function W_(i){if(i==null)return V_;var e,t,r=i.scale[0],a=i.scale[1],n=i.translate[0],s=i.translate[1];return function(o,c){c||(e=t=0);var l=2,u=o.length,d=new Array(u);for(d[0]=(e+=o[0])*r+n,d[1]=(t+=o[1])*a+s;l<u;)d[l]=o[l],++l;return d}}function X_(i,e){for(var t,r=i.length,a=r-e;a<--r;)t=i[a],i[a++]=i[r],i[r]=t}function j_(i,e){return typeof e=="string"&&(e=i.objects[e]),e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(t){return pc(i,t)})}:pc(i,e)}function pc(i,e){var t=e.id,r=e.bbox,a=e.properties==null?{}:e.properties,n=mu(i,e);return t==null&&r==null?{type:"Feature",properties:a,geometry:n}:r==null?{type:"Feature",id:t,properties:a,geometry:n}:{type:"Feature",id:t,bbox:r,properties:a,geometry:n}}function mu(i,e){var t=W_(i.transform),r=i.arcs;function a(u,d){d.length&&d.pop();for(var h=r[u<0?~u:u],p=0,g=h.length;p<g;++p)d.push(t(h[p],p));u<0&&X_(d,g)}function n(u){return t(u)}function s(u){for(var d=[],h=0,p=u.length;h<p;++h)a(u[h],d);return d.length<2&&d.push(d[0]),d}function o(u){for(var d=s(u);d.length<4;)d.push(d[0]);return d}function c(u){return u.map(o)}function l(u){var d=u.type,h;switch(d){case"GeometryCollection":return{type:d,geometries:u.geometries.map(l)};case"Point":h=n(u.coordinates);break;case"MultiPoint":h=u.coordinates.map(n);break;case"LineString":h=s(u.arcs);break;case"MultiLineString":h=u.arcs.map(s);break;case"Polygon":h=c(u.arcs);break;case"MultiPolygon":h=u.arcs.map(c);break;default:return null}return{type:d,coordinates:h}}return l(e)}function $_(i,e){var t={},r={},a={},n=[],s=-1;e.forEach(function(l,u){var d=i.arcs[l<0?~l:l],h;d.length<3&&!d[1][0]&&!d[1][1]&&(h=e[++s],e[s]=l,e[u]=h)}),e.forEach(function(l){var u=o(l),d=u[0],h=u[1],p,g;if(p=a[d])if(delete a[p.end],p.push(l),p.end=h,g=r[h]){delete r[g.start];var y=g===p?p:p.concat(g);r[y.start=p.start]=a[y.end=g.end]=y}else r[p.start]=a[p.end]=p;else if(p=r[h])if(delete r[p.start],p.unshift(l),p.start=d,g=a[d]){delete a[g.end];var f=g===p?p:g.concat(p);r[f.start=g.start]=a[f.end=p.end]=f}else r[p.start]=a[p.end]=p;else p=[l],r[p.start=d]=a[p.end=h]=p});function o(l){var u=i.arcs[l<0?~l:l],d=u[0],h;return i.transform?(h=[0,0],u.forEach(function(p){h[0]+=p[0],h[1]+=p[1]})):h=u[u.length-1],l<0?[h,d]:[d,h]}function c(l,u){for(var d in l){var h=l[d];delete u[h.start],delete h.start,delete h.end,h.forEach(function(p){t[p<0?~p:p]=1}),n.push(h)}}return c(a,r),c(r,a),e.forEach(function(l){t[l<0?~l:l]||n.push([l])}),n}function fc(i){return mu(i,q_.apply(this,arguments))}function q_(i,e,t){var r,a,n;if(arguments.length>1)r=Y_(i,e,t);else for(a=0,r=new Array(n=i.arcs.length);a<n;++a)r[a]=a;return{type:"MultiLineString",arcs:$_(i,r)}}function Y_(i,e,t){var r=[],a=[],n;function s(d){var h=d<0?~d:d;(a[h]||(a[h]=[])).push({i:d,g:n})}function o(d){d.forEach(s)}function c(d){d.forEach(o)}function l(d){d.forEach(c)}function u(d){switch(n=d,d.type){case"GeometryCollection":d.geometries.forEach(u);break;case"LineString":o(d.arcs);break;case"MultiLineString":case"Polygon":c(d.arcs);break;case"MultiPolygon":l(d.arcs);break}}return u(e),a.forEach(t==null?function(d){r.push(d[0].i)}:function(d){t(d[0].g,d[d.length-1].g)&&r.push(d[0].i)}),r}const Z_=40,K_=70,Gr=1,mt=new WeakMap;let xn=null;function Or(i,e,t=1.03){const r=(90-i)*(Math.PI/180),a=(e+180)*(Math.PI/180);return new L(-t*Math.sin(r)*Math.cos(a),t*Math.cos(r),t*Math.sin(r)*Math.sin(a))}function $i(){const i=getComputedStyle(document.documentElement);return{neonCyan:i.getPropertyValue("--neon-cyan").trim(),neonGreen:i.getPropertyValue("--neon-green").trim(),neonAmber:i.getPropertyValue("--neon-amber").trim(),neonMagenta:i.getPropertyValue("--neon-magenta").trim(),panelBorder:i.getPropertyValue("--panel-border").trim()}}function dr(i,e){return i<=Z_?e.neonGreen:i<=K_?e.neonAmber:e.neonMagenta}const J_={uniforms:{tDiffuse:{value:null},shiftAmt:{value:0}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float shiftAmt;
    varying vec2 vUv;
    void main(){
      float s = shiftAmt * 0.0012;
      float r = texture2D(tDiffuse, vec2(vUv.x + s, vUv.y)).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vec2(vUv.x - s, vUv.y)).b;
      gl_FragColor = vec4(vec3(r, g, b), 1.0);
    }
  `};function gu(i,{autoRotate:e=!0,bloomStrength:t=.4}={}){const r=new AbortController,{signal:a}=r,n=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s=$i(),o=new jo({antialias:!0,alpha:!0});o.setPixelRatio(window.devicePixelRatio),o.setSize(i.clientWidth||800,i.clientHeight||600),o.domElement.classList.add("s9-threatmap__canvas"),i.appendChild(o.domElement);const c=new Vo,l=new jt(45,(i.clientWidth||800)/(i.clientHeight||600),.1,100);l.position.set(0,0,3);const u=new Pi(Gr,48,48),d=new Pi(Gr*.999,48,48),h=new Ae(s.neonCyan||"#00d4b0"),p=new di({color:h,wireframe:!0,transparent:!0,opacity:.0015,depthTest:!1,depthWrite:!1,side:Dt}),g=new ot(u,p);g.renderOrder=0,c.add(g);const y=new di({colorWrite:!1,depthWrite:!0,depthTest:!0,depthFunc:En,side:Dt}),f=new ot(d,y);f.renderOrder=1,c.add(f);const m=new di({color:new Ae("#010e0b"),transparent:!0,opacity:.5,depthTest:!0,depthWrite:!0,side:ni}),x=new ot(u,m);x.renderOrder=1,c.add(x);const T=new di({color:h,wireframe:!0,transparent:!0,opacity:.014,depthTest:!0,depthWrite:!1,side:si}),S=new ot(u,T);S.renderOrder=2,c.add(S);const w=new di({color:h,wireframe:!0,transparent:!0,opacity:.025,blending:It,depthTest:!0,depthWrite:!1}),A=new ot(u,w);A.renderOrder=3,c.add(A);const P=new Pi(Gr,48,48),v=new ht({uniforms:{uColor:{value:new L(h.r,h.g,h.b)}},vertexShader:`
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
        float alpha = pow(rim, 4.5) * 0.55;
        gl_FragColor = vec4(uColor * alpha, alpha);
      }
    `,transparent:!0,blending:It,depthWrite:!0,side:si}),E=new ot(P,v);E.renderOrder=4,c.add(E);const W=new b_(l,o.domElement);W.enableDamping=!0,W.dampingFactor=.05,W.autoRotate=e&&!n,W.autoRotateSpeed=.4,W.enablePan=!1,W.minDistance=1.5,W.maxDistance=5;const R=new H_(o),B=new k_(c,l);R.addPass(B);const H=new Yr(new Re(i.clientWidth||800,i.clientHeight||600),t,.55,.65);R.addPass(H);const V=new fu(J_);V.enabled=!1,R.addPass(V);const k=document.createElement("div");k.className="s9-threatmap__overlay",k.innerHTML=`
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--tr" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--bl" aria-hidden="true"></div>
    <div class="s9-threatmap__bracket s9-threatmap__bracket--br" aria-hidden="true"></div>
    <div class="s9-threatmap__crosshair" aria-hidden="true">
      <span class="s9-threatmap__crosshair-label"></span>
    </div>
    <div class="s9-threatmap__coords" aria-live="polite">
      <span class="s9-threatmap__coords-lat">LAT: --.-°</span>
      <span class="s9-threatmap__coords-lng">LNG: --.-°</span>
    </div>
    <div class="s9-threatmap__node-count">NODES: 0</div>
  `,i.appendChild(k);let z=null;function O(){z=requestAnimationFrame(O),W.update(),R.render()}O();let Q=null;W.addEventListener("start",()=>{W.autoRotate=!1,Q!==null&&(clearTimeout(Q),Q=null);const ae=mt.get(i);ae&&(ae.cameraLerpTarget=null,ae.lastOrbitInteraction=Date.now())}),W.addEventListener("end",()=>{!n&&e&&(Q=setTimeout(()=>{W.autoRotate=!0,Q=null},6e3))});const Z=new ResizeObserver(()=>{const ae=i.clientWidth,Fe=i.clientHeight;!ae||!Fe||(l.aspect=ae/Fe,l.updateProjectionMatrix(),o.setSize(ae,Fe),R.setSize(ae,Fe),H.resolution.set(ae,Fe))});Z.observe(i);const le=new fd;o.domElement.addEventListener("click",ae=>{const Fe=mt.get(i);if(!Fe)return;const Ne=o.domElement.getBoundingClientRect(),j=Ne.width,K=Ne.height,ne=(ae.clientX-Ne.left)/j*2-1,Oe=-((ae.clientY-Ne.top)/K)*2+1;le.setFromCamera(new Re(ne,Oe),l);const we=Array.from(Fe.nodeMap.values()).map(qe=>qe.mesh),pe=le.intersectObjects(we,!1);if(pe.length>0){const qe=pe[0].object;vi(i,qe.userData.nodeId)}else Fe.activeNodeId!==null&&vi(i,null)},{signal:a}),mt.set(i,{animFrameId:z,renderer:o,composer:R,bloomPass:H,controls:W,scene:c,camera:l,resizeObserver:Z,nodeMap:new Map,edgeMap:new Map,abortController:r,resumeTimer:null,reducedMotion:n,activeNodeId:null,colors:s,cyanColor:h,globeGeo:u,occluderGeo:d,globeBack:g,occluder:f,globeSurface:x,globeFront:S,globeGlow:A,rimGeo:P,rimMesh:E,geoGroup:null,cameraLerpTarget:null,lastOrbitInteraction:0,arcs:[],satelliteMode:!1,sunAngle:Math.random()*Math.PI*2,satelliteGroup:null,glitchPass:V,glitchActive:null,glitchNext:performance.now()+8e3+Math.random()*12e3});const de=mt.get(i);de.animFrameId=z,cancelAnimationFrame(z);function Me(){const ae=mt.get(i);if(ae){ae.animFrameId=requestAnimationFrame(Me),ae.cameraLerpTarget&&Date.now()-ae.lastOrbitInteraction>=3e3&&(ae.camera.position.lerp(ae.cameraLerpTarget,.06),ae.camera.position.distanceTo(ae.cameraLerpTarget)<.04&&(ae.camera.position.copy(ae.cameraLerpTarget),ae.cameraLerpTarget=null)),ae.controls.update();for(let Fe=ae.arcs.length-1;Fe>=0;Fe--){const Ne=ae.arcs[Fe],j=Math.min(1,(Date.now()-Ne.t0)/Ne.dur);if(Ne.particle.position.copy(Ne.curve.getPoint(j)),j>.75){const K=1-(j-.75)/.25;Ne.ptMat.opacity=.9*K,Ne.lineMat.opacity=.1*K}j>=1&&(ae.scene.remove(Ne.line),ae.scene.remove(Ne.particle),Ne.lineGeo.dispose(),Ne.lineMat.dispose(),Ne.ptGeo.dispose(),Ne.ptMat.dispose(),ae.arcs.splice(Fe,1))}if(ae.satelliteMode&&ae.satMat&&(ae.sunAngle+=15e-5,ae.satMat.uniforms.sunDir.value.set(Math.cos(ae.sunAngle),.22,Math.sin(ae.sunAngle)).normalize()),iv(ae),ae.activeNodeId!==null){const Fe=ae.nodeMap.get(ae.activeNodeId),Ne=i.querySelector(".s9-threatmap__crosshair");if(Fe&&Ne){const j=i.clientWidth,K=i.clientHeight,ne=Fe.mesh.position.clone().project(ae.camera),Oe=(ne.x*.5+.5)*j,we=(-ne.y*.5+.5)*K;Ne.style.left=`${Oe}px`,Ne.style.top=`${we}px`}}ae.composer.render()}}de.animFrameId=requestAnimationFrame(Me),tv(i)}function Q_(i){var e;return((e=mt.get(i))==null?void 0:e.camera)??null}function To(i,{id:e,lat:t,lng:r,label:a,level:n}){const s=mt.get(i);if(!s)return;if(s.nodeMap.has(e)){console.warn(`[s9-threatmap] addNode: node "${e}" already exists.`);return}const o=$i(),c=dr(n,o),l=new Pi(.032,8,8),u=new di({color:new Ae(c)}),d=new ot(l,u),h=Or(t,r);d.position.copy(h),d.userData.nodeId=e,d.userData.label=a,d.userData.lat=t,d.userData.lng=r,d.userData.level=n,s.scene.add(d),s.nodeMap.set(e,{mesh:d,lat:t,lng:r,label:a,level:n}),vu(i)}function _u(i,e){const t=mt.get(i);if(!t)return;const r=t.nodeMap.get(e);if(!r){console.warn(`[s9-threatmap] removeNode: node "${e}" not found.`);return}t.activeNodeId===e&&vi(i,null);for(const[a,n]of t.edgeMap)(n.from===e||n.to===e)&&ev(i,a);r.mesh.geometry.dispose(),r.mesh.material.dispose(),t.scene.remove(r.mesh),t.nodeMap.delete(e),vu(i)}function ev(i,e){const t=mt.get(i);if(!t)return;const r=t.edgeMap.get(e);r&&(r.line.geometry.dispose(),r.line.material.dispose(),t.scene.remove(r.line),t.edgeMap.delete(e))}function vi(i,e){const t=mt.get(i);if(!t)return;if(t.activeNodeId!==null){const c=t.nodeMap.get(t.activeNodeId);if(c){const h=$i();c.mesh.material.color.set(dr(c.level,h))}const l=i.querySelector(".s9-threatmap__crosshair");if(l){l.classList.remove("s9-threatmap__crosshair--visible");const h=l.querySelector(".s9-threatmap__crosshair-label");h&&(h.textContent="")}i.removeAttribute("data-active-node");const u=i.querySelector(".s9-threatmap__coords-lat"),d=i.querySelector(".s9-threatmap__coords-lng");u&&(u.textContent="LAT: --.-°"),d&&(d.textContent="LNG: --.-°"),i.dispatchEvent(new CustomEvent("s9:threatmap-node-deselect",{bubbles:!0,detail:{nodeId:t.activeNodeId}})),t.activeNodeId=null}if(e===null)return;const r=t.nodeMap.get(e);if(!r)return;const a=$i();r.mesh.material.color.set(dr(r.level,a));const n=i.querySelector(".s9-threatmap__crosshair");if(n){n.classList.add("s9-threatmap__crosshair--visible");const c=n.querySelector(".s9-threatmap__crosshair-label");c&&(c.textContent=r.label)}i.setAttribute("data-active-node",e);const s=i.querySelector(".s9-threatmap__coords-lat"),o=i.querySelector(".s9-threatmap__coords-lng");s&&(s.textContent=`LAT: ${r.lat.toFixed(2)}°`),o&&(o.textContent=`LNG: ${r.lng.toFixed(2)}°`),t.activeNodeId=e,i.dispatchEvent(new CustomEvent("s9:threatmap-node-select",{bubbles:!0,detail:{nodeId:e,label:r.label,lat:r.lat,lng:r.lng,level:r.level}}))}function Ci(i,e){if(!mt.get(i))return;const t=Math.max(0,Math.min(100,e));i.setAttribute("data-threat-level",t)}function Pn(i,e,t){const r=mt.get(i);if(!r)return;const a=r.nodeMap.get(e);if(!a)return;const n=a.level;if(a.level=t,a.mesh.userData.level=t,r.activeNodeId!==e){const s=$i();a.mesh.material.color.set(dr(t,s))}return n}function pr(i,e){const t=mt.get(i);if(!t)return;const r=t.nodeMap.get(e);if(!r||Date.now()-t.lastOrbitInteraction<3e3)return;const a=t.camera.position.length();t.cameraLerpTarget=r.mesh.position.clone().normalize().multiplyScalar(a),t.controls.autoRotate=!1,t.resumeTimer!==null&&(clearTimeout(t.resumeTimer),t.resumeTimer=null)}async function tv(i){let e;try{const h=await fetch("/data/countries-110m.json");if(!h.ok)throw new Error(`HTTP ${h.status}`);e=await h.json(),xn=e}catch(h){console.warn("[s9-threatmap] geo lines: failed to load /data/countries-110m.json",h);return}const t=mt.get(i);if(!t)return;const r=new zr,a=t.cyanColor,n=fc(e,e.objects.land),s=new Kt({color:a,transparent:!0,opacity:.75,depthWrite:!1}),o=new Kt({color:a,transparent:!0,opacity:.55,blending:It,depthWrite:!1}),c=new Kt({color:a,transparent:!0,opacity:.16,blending:It,depthWrite:!1});for(const h of n.coordinates){const p=h.map(([T,S])=>Or(S,T,1.002)),g=h.map(([T,S])=>Or(S,T,1.006)),y=h.map(([T,S])=>Or(S,T,1.011)),f=new Ai(new ut().setFromPoints(p),s),m=new Ai(new ut().setFromPoints(g),o),x=new Ai(new ut().setFromPoints(y),c);f.userData.geoType=m.userData.geoType=x.userData.geoType="coast",r.add(x,m,f)}const l=fc(e,e.objects.countries,(h,p)=>h!==p),u=new Kt({color:a,transparent:!0,opacity:.32,depthWrite:!1}),d=new Kt({color:a,transparent:!0,opacity:.18,blending:It,depthWrite:!1});for(const h of l.coordinates){const p=h.map(([m,x])=>Or(x,m,1.002)),g=h.map(([m,x])=>Or(x,m,1.006)),y=new Ai(new ut().setFromPoints(p),u),f=new Ai(new ut().setFromPoints(g),d);y.userData.geoType=f.userData.geoType="border",r.add(f,y)}t.scene.add(r),t.satelliteMode&&(r.visible=!1),t.geoGroup=r}function vu(i){const e=mt.get(i);if(!e)return;const t=i.querySelector(".s9-threatmap__node-count");t&&(t.textContent=`NODES: ${e.nodeMap.size}`)}function iv(i){const e=i.glitchPass;if(!e)return;const t=performance.now()*.001;e.uniforms.shiftAmt.value=.4+Math.sin(t*.6)*.2}function mc(i,e){const t=mt.get(i);if(!t||t.reducedMotion)return;const r=t.nodeMap.get(e);if(!r)return;const a=$i(),n=dr(r.level,a),s=20,o=.035,c=[];for(let y=0;y<=s;y++){const f=y/s*Math.PI*2;c.push(new L(Math.cos(f)*o,Math.sin(f)*o,0))}const l=new ut().setFromPoints(c),u=new Kt({color:new Ae(n),transparent:!0,opacity:.9,depthWrite:!1}),d=new Kc(l,u);d.position.copy(r.mesh.position);const h=r.mesh.position.clone().normalize();d.quaternion.setFromUnitVectors(new L(0,0,1),h),t.scene.add(d);const p=Date.now(),g=700;(function y(){if(!mt.get(i)){t.scene.remove(d),l.dispose(),u.dispose();return}const f=Math.min(1,(Date.now()-p)/g);d.scale.setScalar(1+f*6),u.opacity=.85*(1-f),f<1?requestAnimationFrame(y):(t.scene.remove(d),l.dispose(),u.dispose())})()}function gc(i){const e=mt.get(i);if(!e)return;const t=$i();e.colors=t;const r=t.neonCyan||"#00d4b0";e.globeBack&&e.globeBack.material.color.set(r),e.globeFront&&e.globeFront.material.color.set(r),e.geoGroup&&e.geoGroup.traverse(a=>{if(a.isLine){const n=a.userData.geoType==="coast"?t.neonCyan:t.panelBorder;a.material.color.set(n||"#ffffff")}});for(const a of e.nodeMap.values()){const n=dr(a.level,t);a.mesh.material.color.set(n),a.mesh.material.emissive.set(n)}}function Mu(i,e,t){const r=mt.get(i);if(!r||r.reducedMotion)return;const a=r.nodeMap.get(e),n=r.nodeMap.get(t);if(!a||!n)return;const s=$i(),o=dr(n.level,s),c=a.mesh.position.clone(),l=n.mesh.position.clone(),u=c.clone().add(l).multiplyScalar(.5),d=.2+u.length()*.25,h=u.clone().normalize().multiplyScalar(Gr+d),p=new Jh(c,h,l),g=new ut().setFromPoints(p.getPoints(48)),y=new Kt({color:new Ae(o),transparent:!0,opacity:.1,depthWrite:!1}),f=new Ai(g,y);f.renderOrder=2;const m=new Pi(.009,4,4),x=new di({color:new Ae(o),transparent:!0,opacity:.9}),T=new ot(m,x);T.renderOrder=3,T.position.copy(c),r.scene.add(f),r.scene.add(T),r.arcs.push({curve:p,line:f,lineGeo:g,lineMat:y,particle:T,ptGeo:m,ptMat:x,t0:Date.now(),dur:1e3+Math.random()*700})}function ga(i,e,t,r){return[(e+180)/360*t,(90-i)/180*r]}function rv(i=null){const e=document.createElement("canvas");e.width=2048,e.height=1024;const t=e.getContext("2d"),r=t.createLinearGradient(0,0,0,1024);if(r.addColorStop(0,"#071a2e"),r.addColorStop(.15,"#082035"),r.addColorStop(.5,"#0a2a46"),r.addColorStop(.85,"#082035"),r.addColorStop(1,"#071a2e"),t.fillStyle=r,t.fillRect(0,0,2048,1024),i){const a=j_(i,i.objects.land),n=(a.type==="FeatureCollection"?a.features:[a]).flatMap(c=>{const l=c.geometry;return l?l.type==="Polygon"?[l.coordinates]:l.coordinates:[]}),s=t.createLinearGradient(0,0,0,1024);s.addColorStop(0,"#dce8dc"),s.addColorStop(.06,"#8a9c7a"),s.addColorStop(.16,"#527848"),s.addColorStop(.28,"#4e7040"),s.addColorStop(.4,"#4a6c34"),s.addColorStop(.5,"#3a5c24"),s.addColorStop(.6,"#4a6c34"),s.addColorStop(.72,"#4e7040"),s.addColorStop(.84,"#7a8c6a"),s.addColorStop(.92,"#ccd8c4"),s.addColorStop(1,"#eaf0ea");for(const c of n)for(let l=0;l<c.length;l++){const u=c[l];t.beginPath();for(let d=0;d<u.length;d++){const[h,p]=u[d],g=(h+180)/360*2048,y=(90-p)/180*1024;d===0?t.moveTo(g,y):t.lineTo(g,y)}t.closePath(),t.fillStyle=l===0?s:"#0a2a46",t.fill()}const o=[[22,15,16,28,"rgba(172,142, 88,0.72)"],[23,44,8,12,"rgba(178,148, 96,0.68)"],[27,70,5,9,"rgba(182,158,112,0.52)"],[42,100,6,16,"rgba(152,128, 86,0.58)"],[-25,132,10,17,"rgba(168,134, 82,0.58)"],[-22,-68,4,6,"rgba(142,118, 76,0.48)"],[35,-114,5,8,"rgba(158,128, 82,0.42)"],[40,58,5,8,"rgba(158,134, 88,0.45)"]];for(const[c,l,u,d,h]of o){const[p,g]=ga(c,l,2048,1024),y=d/360*2048,f=u/180*1024,m=t.createRadialGradient(p,g,0,p,g,Math.max(y,f)),x=h.replace(/[\d.]+\)$/,"0)");m.addColorStop(0,h),m.addColorStop(.55,h),m.addColorStop(.88,h.replace(/[\d.]+\)$/,"0.08)")),m.addColorStop(1,x),t.fillStyle=m,t.beginPath(),t.ellipse(p,g,y,f,0,0,Math.PI*2),t.fill()}t.strokeStyle="rgba(120,175,210,0.22)",t.lineWidth=.8;for(const c of n){const l=c[0];t.beginPath();for(let u=0;u<l.length;u++){const[d,h]=l[u],p=(d+180)/360*2048,g=(90-h)/180*1024;u===0?t.moveTo(p,g):t.lineTo(p,g)}t.closePath(),t.stroke()}}t.strokeStyle="rgba(100,150,200,0.04)",t.lineWidth=.5;for(let a=-80;a<=80;a+=30){const n=ga(a,0,2048,1024)[1];t.beginPath(),t.moveTo(0,n),t.lineTo(2048,n),t.stroke()}for(let a=-180;a<=180;a+=30){const n=ga(0,a,2048,1024)[0];t.beginPath(),t.moveTo(n,0),t.lineTo(n,1024),t.stroke()}return e}function av(){const i=document.createElement("canvas");i.width=1024,i.height=512;const e=i.getContext("2d");e.fillStyle="#000810",e.fillRect(0,0,1024,512);const t=[[40.7,-74,4],[34,-118.2,3.5],[41.9,-87.6,3],[29.8,-95.4,2.5],[19.4,-99.1,3],[43.7,-79.4,3],[45.5,-73.6,2.5],[49.3,-123.1,2],[38.9,-77,2.5],[42.4,-71.1,2.5],[32.8,-96.8,2.5],[33.7,-84.4,2],[37.8,-122.4,2.5],[47.6,-122.3,2],[39.7,-105,2],[33.4,-112.1,2],[36.2,-115.1,2],[29.4,-98.5,2],[32.7,-97.1,2],[30.3,-81.7,1.5],[51,-114.1,2],[53.5,-113.5,2],[49.9,-97.1,2],[14.1,-87.2,1.5],[13.7,-89.2,1.5],[-23.5,-46.6,4],[-22.9,-43.2,3.5],[-34.6,-58.4,3.5],[-12,-77,2],[4.7,-74.1,2],[10.5,-66.9,2],[-33.5,-70.7,2.5],[-3.7,-38.5,2],[-8.1,-34.9,2],[-19.9,-43.9,2.5],[-30,-51.2,2],[-15.8,-47.9,2],[51.5,-.1,4],[48.9,2.3,4],[52.5,13.4,3.5],[55.8,37.6,4],[41,28.9,3.5],[59.9,10.8,2],[59.3,18.1,2],[60.2,25,2],[52.2,21,2.5],[50.1,14.4,2.5],[47.5,19,2.5],[48.2,16.4,2.5],[47.4,8.5,2.5],[48.1,11.6,3],[52.4,4.9,3],[40.4,-3.7,3],[41.4,2.2,3],[45.5,9.2,3],[41.9,12.5,3],[37.9,23.7,2.5],[50,8.7,2.5],[51,13.7,2],[51.2,6.8,2.5],[50.9,4.3,2.5],[53.5,-2.2,2],[55.7,12.6,2],[50.5,30.5,2.5],[59.5,30.3,2.5],[48,37.8,2],[46.5,30.7,2],[49.8,24,2],[50.4,30.5,2],[45.4,28,2],[44.4,26.1,2],[42.7,23.3,2],[37.1,-8.6,2],[30.1,31.3,3.5],[25.2,55.3,2.5],[33.3,44.4,2.5],[35.7,51.4,3],[24.7,46.7,2.5],[31.8,35.2,2],[33.9,35.5,2],[36.8,10.2,2],[32.9,13.2,2],[30.7,29.7,2],[6.5,3.4,2.5],[-26.2,28,3],[-33.9,18.4,2],[-1.3,36.8,2],[5.3,-4,2],[14.7,17.4,1.5],[9.1,7.4,2],[4.4,18.6,1.5],[-4.3,15.3,1.5],[-11.7,43.3,1.5],[-18.9,47.5,1.5],[28.6,77.2,4],[19.1,72.9,3.5],[12.9,77.6,3],[23.7,90.4,3],[24.9,67,2.5],[31.6,74.3,2.5],[33.7,73.1,2],[17.4,78.5,2.5],[22.6,88.4,2.5],[13.1,80.3,2.5],[23,72.6,2],[22.3,70.8,2],[26.9,75.8,2],[21.2,81.4,2],[27.7,85.3,2],[41.3,69.2,2],[43.3,76.9,2],[51.2,71.5,1.5],[53.9,27.6,2],[54.7,55.9,2],[56.8,60.6,2],[55,73.4,2],[56,92.9,2],[52.3,104.3,2],[53.7,87.1,2],[62,129.7,1.5],[43.1,131.9,2],[61.8,34.4,2],[35.7,139.7,5],[37.5,127,4],[39.9,116.4,4.5],[31.2,121.5,4.5],[23.1,113.3,4],[22.3,114.2,3.5],[30.6,104.1,3.5],[32.1,118.8,3.5],[30.3,120.2,3],[36.7,117,2.5],[34.3,108.9,2.5],[26,119.3,2.5],[41.8,123.4,2.5],[45.8,126.5,2.5],[34.6,135.5,3.5],[33.6,130.4,3],[1.3,103.8,3.5],[13.7,100.5,2.5],[10.8,106.7,2.5],[14.6,121,2.5],[3.1,101.7,2.5],[6.2,106.8,3],[21,105.8,2],[-6.2,106.8,2.5],[-33.9,151.2,2.5],[-37.8,144.9,2],[-27.5,153,2],[-31.9,115.9,2],[-43.5,172.6,1.5]];for(const[r,a,n]of t){const[s,o]=ga(r,a,1024,512),c=n*2.2,l=e.createRadialGradient(s,o,0,s,o,c);l.addColorStop(0,"rgba(255,210,120,0.22)"),l.addColorStop(.5,"rgba(255,170,60,0.08)"),l.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=l,e.beginPath(),e.arc(s,o,c,0,Math.PI*2),e.fill()}e.globalCompositeOperation="lighter";for(const[r,a,n]of t){const[s,o]=ga(r,a,1024,512),c=Math.max(1,n*.9),l=e.createRadialGradient(s,o,0,s,o,c);l.addColorStop(0,`rgba(255,245,200,${Math.min(.9,.5+n*.1)})`),l.addColorStop(.6,"rgba(255,200,100,0.15)"),l.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=l,e.beginPath(),e.arc(s,o,c,0,Math.PI*2),e.fill()}return e.globalCompositeOperation="source-over",i}function _c(i){return new Promise((e,t)=>{new ld().load(i,e,void 0,t)})}async function nv(i){const e=mt.get(i);if(!e||e.satelliteGroup)return;let t,r,a=1;try{[t,r]=await Promise.all([_c("/textures/earth_day.jpg"),_c("/textures/earth_night.jpg")]),t.colorSpace=zt,r.colorSpace=zt}catch(h){if(console.warn("[s9-threatmap] satellite textures not found, using procedural fallback",h),!xn)try{const p=await fetch("/data/countries-110m.json");p.ok&&(xn=await p.json())}catch{}t=new xo(rv(xn)),r=new xo(av()),a=0}const n=new ht({uniforms:{dayMap:{value:t},nightMap:{value:r},sunDir:{value:new L(Math.cos(e.sunAngle),.22,Math.sin(e.sunAngle)).normalize()},realTex:{value:a}},vertexShader:`
      varying vec2  vUv;
      varying vec3  vWorldNormal;
      void main() {
        vUv          = uv;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform sampler2D dayMap;
      uniform sampler2D nightMap;
      uniform vec3      sunDir;
      uniform float     realTex;
      varying vec2      vUv;
      varying vec3      vWorldNormal;
      void main() {
        float d     = dot(normalize(vWorldNormal), normalize(sunDir));
        float blend = smoothstep(-0.18, 0.22, d);
        vec4  day   = texture2D(dayMap,   vUv);
        vec4  night = texture2D(nightMap, vUv);

        // Terminator fringe — suppressed for real satellite textures
        float term   = smoothstep(-0.06, 0.0, d) * (1.0 - smoothstep(0.0, 0.07, d));
        vec3  fringe = mix(vec3(0.0), vec3(1.0, 0.65, 0.2), term * 0.28 * (1.0 - realTex));
        vec3  base   = mix(night.rgb, day.rgb, blend) + fringe;

        gl_FragColor = vec4(base, 1.0);
      }
    `}),s=new Pi(Gr,64,32),o=new ot(s,n);o.renderOrder=0;const c=new Pi(Gr*1.055,32,16),l=new ht({uniforms:{glowCol:{value:new Ae(51455)}},vertexShader:`
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vNormal  = normalize(normalMatrix * normal);
        vViewDir = normalize(-( modelViewMatrix * vec4(position,1.0) ).xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,fragmentShader:`
      uniform vec3 glowCol;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float rim        = 1.0 - abs(dot(vNormal, vViewDir));
        // Outer haze layer (very wide)
        float outer      = pow(rim, 2.2) * 0.55;
        // Inner sharp rim
        float inner      = pow(rim, 5.0) * 1.10;
        float intensity  = outer + inner;
        gl_FragColor     = vec4(glowCol * intensity, intensity * 0.72);
      }
    `,side:si,blending:It,transparent:!0,depthWrite:!1}),u=new ot(c,l);u.renderOrder=1;const d=new zr;d.add(o),d.add(u),d.visible=!1,e.scene.add(d),Object.assign(e,{satelliteGroup:d,satGeo:s,satMat:n,atmGeo:c,atmMat:l,dayTex:t,nightTex:r})}async function sv(i,e){const t=mt.get(i);t&&(e?(t.globeBack&&(t.globeBack.visible=!1),t.occluder&&(t.occluder.visible=!1),t.globeFront&&(t.globeFront.visible=!1),t.geoGroup&&(t.geoGroup.visible=!1),t.bloomPass&&(t._bloomPrev={strength:t.bloomPass.strength,threshold:t.bloomPass.threshold,radius:t.bloomPass.radius},t.bloomPass.strength=.32,t.bloomPass.threshold=.85,t.bloomPass.radius=.35),t.satelliteMode=!0,await nv(i),t.satelliteGroup&&(t.satelliteGroup.visible=!0)):(t.satelliteGroup&&(t.satelliteGroup.visible=!1),t.globeBack&&(t.globeBack.visible=!0),t.occluder&&(t.occluder.visible=!0),t.globeFront&&(t.globeFront.visible=!0),t.geoGroup&&(t.geoGroup.visible=!0),t.bloomPass&&t._bloomPrev&&(t.bloomPass.strength=t._bloomPrev.strength,t.bloomPass.threshold=t._bloomPrev.threshold,t.bloomPass.radius=t._bloomPrev.radius),t.satelliteMode=!1))}const ov=new WeakMap;function lv(i){const e=new AbortController;ov.set(i,e),i.classList.add("s9-panel--booting"),i.addEventListener("animationend",t=>{t.animationName==="crt-flicker"&&(i.classList.remove("s9-panel--booting"),i.dispatchEvent(new CustomEvent("s9:panel-mount",{bubbles:!0,detail:{id:i.dataset.s9Id??null}})))},{signal:e.signal,once:!0})}const Es=["complete","active","failed","pending"];function cv(i,e){if(!Es.includes(e)){console.warn(`[s9-sequence] Unknown state: "${e}". Expected one of: ${Es.join(", ")}.`);return}Es.forEach(t=>i.classList.remove(`s9-sequence__entry--${t}`)),e==="failed"?(i.classList.add("s9-sequence__entry--fail-flash"),i.addEventListener("animationend",()=>{i.classList.remove("s9-sequence__entry--fail-flash"),i.classList.add("s9-sequence__entry--failed"),vc(i,e)},{once:!0})):(i.classList.add(`s9-sequence__entry--${e}`),vc(i,e))}function vc(i,e){i.dispatchEvent(new CustomEvent("s9:sequence-step-change",{bubbles:!0,detail:{state:e}}))}const Ao=[..."ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ",..."ﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",..."012345789",...':."=*+-<>¦|'],Vr=110,fa=55,uv=.28,hv=.36,dv=22,pv=16,Mc=-.6,fv=-9,ma=52;function mv(){const i=Ao.length,e=ma,t=document.createElement("canvas");t.width=e,t.height=e*i;const r=t.getContext("2d");r.fillStyle="#000",r.fillRect(0,0,t.width,t.height),r.fillStyle="#fff",r.textAlign="center",r.textBaseline="middle",r.font=`${Math.round(e*.84)}px "Share Tech Mono", "Courier New", monospace`,Ao.forEach((n,s)=>r.fillText(n,e/2,e*s+e/2));const a=new xo(t);return a.flipY=!1,a.minFilter=oh,a.magFilter=Rt,a.generateMipmaps=!0,{tex:a,count:i,canvas:t,ctx:r}}function gv(){const i=new Float32Array(Vr*4);for(let t=0;t<Vr;t++)i[t*4+0]=(Math.random()-.5)*2*pv,i[t*4+1]=Mc+Math.random()*(fv-Mc),i[t*4+2]=1.8+Math.random()*3.2,i[t*4+3]=Math.random();const e=new Wo(i,Vr,1,Qt,Jt);return e.needsUpdate=!0,e}function _v(){const i=new cd,e=new qi(1,1);i.index=e.index.clone(),i.setAttribute("position",e.getAttribute("position").clone()),i.setAttribute("uv",e.getAttribute("uv").clone()),e.dispose();const t=Vr*fa,r=new Float32Array(t),a=new Float32Array(t);for(let n=0;n<Vr;n++)for(let s=0;s<fa;s++)r[n*fa+s]=n,a[n*fa+s]=s;return i.setAttribute("aColIdx",new cr(r,1)),i.setAttribute("aRowIdx",new cr(a,1)),i.instanceCount=t,i}const vv=`
precision highp float;

attribute float aColIdx;
attribute float aRowIdx;

uniform sampler2D uColData;
uniform float     uNCols;
uniform float     uTime;
uniform float     uCellW;
uniform float     uCellH;
uniform float     uWorldH;
uniform float     uNRows;

varying vec2  vUv;
varying float vDist;   // distance from illumination head in row-units (0=head, +ve=trail)
varying float vColIdx;
varying float vRowIdx;

void main() {
  vUv     = uv;
  vColIdx = aColIdx;
  vRowIdx = aRowIdx;

  // Fetch column config from DataTexture
  vec4  col  = texture2D(uColData, vec2((aColIdx + 0.5) / uNCols, 0.5));
  float colX = col.r;
  float colZ = col.g;
  float spd  = col.b;
  float seed = col.a;

  // Static world-Y of this character cell (top → bottom as rowIdx increases)
  float cellY = uWorldH * 0.5 - aRowIdx * uCellH;

  // Illumination head sweeps from top to bottom, cycling continuously.
  // headY decreases from +WORLD_H/2 toward -WORLD_H/2, then wraps.
  float cycleH = uWorldH + uNRows * uCellH;
  float headY  = uWorldH * 0.5 - mod(uTime * spd + seed * cycleH, cycleH);

  // Distance from head in row-units:
  //   < 0  → cell is below head  (not yet lit, invisible)
  //   0    → head position       (brightest, white)
  //   > 0  → above head          (trail, exponential fade)
  vDist = (cellY - headY) / uCellH;

  // Cull cells that are not in the visible trail window
  if (vDist < -0.5 || vDist > float(uNRows)) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);  // outside NDC cube → clipped
    return;
  }

  // Place quad in world space.
  // position is the base PlaneGeometry vertex in [-0.5, 0.5] unit space.
  vec3 worldPos = vec3(
    position.x * uCellW + colX,
    position.y * uCellH + cellY,
    colZ
  );

  gl_Position = projectionMatrix * modelViewMatrix * vec4(worldPos, 1.0);
}
`,Mv=`
precision highp float;

uniform sampler2D uGlyphTex;
uniform float     uGlyphCount;
uniform float     uTime;
uniform vec3      uColor;
uniform float     uNRows;

varying vec2  vUv;
varying float vDist;
varying float vColIdx;
varying float vRowIdx;

float h2(vec2 v) {
  return fract(sin(dot(v, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  // Trail brightness: max at head (vDist≈0), exponential falloff into trail
  float trail = exp(-max(vDist, 0.0) * 0.14);
  if (trail < 0.012) discard;

  // Glyph identity: each cell has a stable character that flickers occasionally.
  // Cells near the head flicker faster (higher rate).
  float proximity = 1.0 - clamp(vDist / 8.0, 0.0, 1.0);
  float rate      = 2.0 + proximity * 14.0 + h2(vec2(vColIdx, 0.5)) * 6.0;
  float tick      = floor(uTime * rate);
  float glyphIdx  = floor(
    h2(vec2(vColIdx * 0.37 + tick * 0.11, vRowIdx * 0.73 + tick * 0.07)) * uGlyphCount
  );

  // Sample atlas.
  // flipY=false: UV.v=0 → canvas top, UV.v=1 → canvas bottom.
  // PlaneGeometry: vUv.y=0 → quad bottom, vUv.y=1 → quad top.
  // Glyph i canvas range: v=[i/n, (i+1)/n] top-to-bottom.
  // Map quad top→glyph top, quad bottom→glyph bottom:
  float atlasV = (glyphIdx + (1.0 - vUv.y)) / uGlyphCount;
  float mask   = texture2D(uGlyphTex, vec2(vUv.x, atlasV)).r;

  if (mask < 0.07) discard;

  // Color: head → bright white; trail → theme color, fading
  float headFrac = 1.0 - smoothstep(0.0, 1.8, vDist);
  vec3  col      = mix(uColor * 1.3, vec3(0.82, 1.0, 0.88), headFrac);

  // Second-brightest row: slightly elevated (classic matrix look)
  float subHead  = 1.0 - smoothstep(1.0, 3.0, vDist);
  col            = mix(col, uColor * 1.8, subHead * 0.35);

  float alpha    = trail * mask;
  gl_FragColor   = vec4(col * alpha, alpha);
}
`,_a=new Map;function xv(i,e={}){_a.has(i)&&xc(i);const{color:t="#00ff70",opacity:r=.9,syncCamera:a=null}=e,n=new Ae(t),s=mv(),o=new jo({antialias:!1,alpha:!0});o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.setSize(i.clientWidth||1,i.clientHeight||1);const c=o.domElement;c.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;mix-blend-mode:screen;",c.style.opacity=String(r),i.appendChild(c);const l=new Vo,u=new jt(70,(i.clientWidth||1)/(i.clientHeight||1),.1,60);u.position.set(0,0,4),u.lookAt(0,0,0);const d=gv(),h=_v(),p={uGlyphTex:{value:s.tex},uGlyphCount:{value:s.count},uColData:{value:d},uNCols:{value:Vr},uTime:{value:0},uCellW:{value:uv},uCellH:{value:hv},uWorldH:{value:dv},uNRows:{value:fa},uColor:{value:new L(n.r,n.g,n.b)}},g=new ht({uniforms:p,vertexShader:vv,fragmentShader:Mv,transparent:!0,depthWrite:!1,blending:It,side:ni}),y=new ot(h,g);l.add(y);const f={renderer:o,material:g,geom:h,atlas:s,colData:d,ro:null,animId:0,syncCamera:a};_a.set(i,f);function m(x){f.animId=requestAnimationFrame(m),p.uTime.value=x*.001,f.syncCamera&&(u.position.copy(f.syncCamera.position),u.quaternion.copy(f.syncCamera.quaternion),u.fov=f.syncCamera.fov,u.near=f.syncCamera.near,u.far=f.syncCamera.far,u.updateProjectionMatrix()),o.render(l,u)}return f.animId=requestAnimationFrame(m),f.ro=new ResizeObserver(()=>{const x=i.clientWidth||1,T=i.clientHeight||1;o.setSize(x,T),u.aspect=x/T,u.updateProjectionMatrix()}),f.ro.observe(i),document.fonts.ready.then(()=>{if(!_a.get(i))return;const{tex:x,count:T,canvas:S,ctx:w}=s;w.clearRect(0,0,S.width,S.height),w.fillStyle="#000",w.fillRect(0,0,S.width,S.height),w.fillStyle="#fff",w.textAlign="center",w.textBaseline="middle",w.font=`${Math.round(ma*.84)}px "Share Tech Mono", monospace`,Ao.forEach((A,P)=>w.fillText(A,ma/2,ma*P+ma/2)),x.needsUpdate=!0}),{destroy(){xc(i)},setColor(x){const T=new Ae(x);p.uColor.value.set(T.r,T.g,T.b)},setOpacity(x){c.style.opacity=String(x)}}}function xc(i){const e=_a.get(i);e&&(cancelAnimationFrame(e.animId),e.ro.disconnect(),e.material.dispose(),e.geom.dispose(),e.atlas.tex.dispose(),e.colData.dispose(),e.renderer.dispose(),e.renderer.domElement.remove(),_a.delete(i))}const ct=Math.PI*2,Vi=64;let yv=0;const yn=new WeakMap;function ha(i){return getComputedStyle(document.documentElement).getPropertyValue(i).trim()}function Xi(i){const e=new Ae().setStyle(i||"#000000");return[e.r,e.g,e.b]}function Ea(i,e,t){return i+(e-i)*Math.max(0,Math.min(1,t))}function Sv(i,e){const t=((i-e)%ct+ct)%ct;return t>Math.PI?t-ct:t}function xu(){return{neonCyan:ha("--neon-cyan")||"#00f0ff",neonGreen:ha("--neon-green")||"#00ff9d",neonMagenta:ha("--neon-magenta")||"#ff00cc",neonAmber:ha("--neon-amber")||"#ffb300",voidColor:ha("--void")||"#05080f"}}function yc(i){return i==="friendly"?.6:i==="hostile"?1.5:1}function bv(i){const e=Ea(.1,.85,i),t=Ea(.3,.05,i),r=Math.random();return r<e?"hostile":r<e+t?"friendly":"neutral"}function Ev(i){return i==="friendly"?0:i==="neutral"?1:i==="hostile"?2:3}const Tv=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Av=`
varying vec2 vUv;
uniform vec3  uVoidColor;
uniform float uTime;

float h2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * (h2(p) * 2.0 - 1.0);
    p  = p * 2.0 + vec2(0.5);
    a *= 0.5;
  }
  return v;
}
void main() {
  float r     = length(vUv - 0.5) * 2.0;
  vec3  base  = mix(uVoidColor * 1.6, uVoidColor, r * r);
  float noise = fbm(vUv * 3.0 + uTime * 0.04) * 0.04;
  float bnd   = 0.48 + sin(uTime * 1.3) * 0.003;
  float disc  = 1.0 - smoothstep(bnd, bnd + 0.02, r * 0.5);
  gl_FragColor = vec4(base + noise, disc);
}`,wv=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Cv=`
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
  float t         = diff / uArcWidth;
  float intensity = pow(1.0 - t, 2.0)
                  * max(0.0, 1.0 - r * 1.9)
                  * smoothstep(0.0, 0.04, r);
  gl_FragColor = vec4(uColor * intensity * 0.9 * uStaticAmt, intensity * 0.8);
}`,Rv=`
attribute float a_type;
attribute float a_age;
attribute float a_phase;
varying float vType;
varying float vAge;
varying float vPhase;
varying vec2  vUv;
void main() {
  vType  = a_type;
  vAge   = a_age;
  vPhase = a_phase;
  vUv    = uv;
  #ifdef USE_INSTANCING
    vec4 wp = instanceMatrix * vec4(position, 1.0);
  #else
    vec4 wp = vec4(position, 1.0);
  #endif
  gl_Position = projectionMatrix * modelViewMatrix * wp;
}`,Lv=`
varying float vType;
varying float vAge;
varying float vPhase;
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

  float ageAlpha = vType > 2.5
    ? 0.15
    : (1.0 - smoothstep(0.65, 0.85, vAge) * 0.85);

  float detect = vAge < 0.08 ? mix(1.6, 1.0, vAge / 0.08) : 1.0;
  float alpha  = shape * ageAlpha * baseAlpha * detect;
  gl_FragColor = vec4(color * shape * detect, alpha);
}`,Pv=`
varying float vType;
varying float vAge;
varying float vPhase;
varying vec2  vUv;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;
void main() {
  if (vType > 2.5) discard;
  if (vAge  > 0.85) discard;

  vec2  p = vUv - 0.5;
  float r = length(p) * 2.0;
  if (r > 1.0) discard;

  float phase = fract(vPhase);
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

  float ageAlpha   = 1.0 - smoothstep(0.65, 0.85, vAge);
  float phaseAlpha = 1.0 - phase;
  gl_FragColor     = vec4(color, ring * ageAlpha * phaseAlpha * 0.75);
}`;function Dv(i){const e=new Float32Array(192);for(let r=0;r<64;r++){const a=r/64*ct;e[r*3]=Math.sin(a)*i,e[r*3+1]=Math.cos(a)*i,e[r*3+2]=0}const t=new ut;return t.setAttribute("position",new Gt(e,3)),t}function Iv(i){const e=new Float32Array(192);for(let r=0;r<32;r++){const a=r/32*ct,n=r%8===0?i*.92:i*.96,s=r*6;e[s]=Math.sin(a)*n,e[s+1]=Math.cos(a)*n,e[s+2]=0,e[s+3]=Math.sin(a)*i,e[s+4]=Math.cos(a)*i,e[s+5]=0}const t=new ut;return t.setAttribute("position",new Gt(e,3)),t}function Uv(i){const{scene:e,R:t,theme:r}=i;i.backgroundMesh&&(i.backgroundMesh.geometry.dispose(),i.backgroundMesh.material.dispose(),e.remove(i.backgroundMesh));const a=new Ae(r.voidColor),n=new qi(t*2,t*2),s=new ht({vertexShader:Tv,fragmentShader:Av,uniforms:{uVoidColor:{value:new L(a.r,a.g,a.b)},uTime:{value:0}},transparent:!0,depthWrite:!0,blending:lr}),o=new ot(n,s);o.renderOrder=0,e.add(o),i.backgroundMesh=o}function Nv(i){const{scene:e,R:t,theme:r}=i;i.ringMeshes&&(i.ringMeshes.forEach(l=>{l.geometry.dispose(),e.remove(l)}),i.matRingInner&&i.matRingInner.dispose(),i.matRingOuter&&i.matRingOuter.dispose()),i.ticksMesh&&(i.ticksMesh.geometry.dispose(),i.matRingTicks&&i.matRingTicks.dispose(),e.remove(i.ticksMesh));const a=new Kt({color:new Ae(r.neonCyan),opacity:.18,transparent:!0,depthWrite:!1,blending:It}),n=new Kt({color:new Ae(r.neonCyan),opacity:.28,transparent:!0,depthWrite:!1,blending:It}),s=new Kt({color:new Ae(r.neonCyan),opacity:.22,transparent:!0,depthWrite:!1,blending:It}),o=[.2,.4,.6,.8,1];i.ringMeshes=o.map((l,u)=>{const d=new Kc(Dv(l*t),u<4?a:n);return d.renderOrder=1,e.add(d),d});const c=new jh(Iv(t),s);c.renderOrder=1,e.add(c),i.ticksMesh=c,i.matRingInner=a,i.matRingOuter=n,i.matRingTicks=s}function Ov(i){const{scene:e,R:t,theme:r}=i;i.sweepTrailMesh&&(i.sweepTrailMesh.geometry.dispose(),i.sweepTrailMesh.material.dispose(),e.remove(i.sweepTrailMesh)),i.sweepArmLine&&(i.sweepArmLine.geometry.dispose(),i.sweepArmLine.material.dispose(),e.remove(i.sweepArmLine));const a=new Ae(r.neonCyan),n=new L(a.r,a.g,a.b),s=new qi(t*2,t*2),o=new ht({vertexShader:wv,fragmentShader:Cv,uniforms:{uAngle:{value:i.sweepAngle},uArcWidth:{value:Math.PI*.6},uColor:{value:n.clone()},uStaticAmt:{value:1}},transparent:!0,depthWrite:!1,blending:It}),c=new ot(s,o);c.renderOrder=2,e.add(c),i.sweepTrailMesh=c;const l=new Float32Array([0,0,0,Math.sin(i.sweepAngle)*t,Math.cos(i.sweepAngle)*t,0]),u=new ut;u.setAttribute("position",new Gt(l,3));const d=new Kt({color:new Ae(r.neonCyan),opacity:.9,transparent:!0,depthWrite:!1,blending:It}),h=new Ai(u,d);h.renderOrder=3,e.add(h),i.sweepArmLine=h}function Fv(i){const{scene:e,theme:t}=i;i.contactDotsMesh&&(i.contactDotsMesh.geometry.dispose(),i.contactDotsMesh.material.dispose(),e.remove(i.contactDotsMesh)),i.contactRingsMesh&&(i.contactRingsMesh.geometry.dispose(),i.contactRingsMesh.material.dispose(),e.remove(i.contactRingsMesh));const r=Xi(t.neonGreen),a=Xi(t.neonAmber),n=Xi(t.neonMagenta),s=Xi(t.neonCyan);function o(u,d,h){const p=new qi(1,1),g=new cr(new Float32Array(Vi).fill(0),1),y=new cr(new Float32Array(Vi).fill(1),1),f=new cr(new Float32Array(Vi).map(()=>Math.random()),1);g.setUsage(Ua),y.setUsage(Ua),f.setUsage(Ua),p.setAttribute("a_type",g),p.setAttribute("a_age",y),p.setAttribute("a_phase",f);const m=new ht({vertexShader:Rv,fragmentShader:u,uniforms:d,transparent:!0,depthWrite:!1,blending:It}),x=new Gh(p,m,Vi);x.renderOrder=h,x.instanceMatrix.setUsage(Ua);const T=new ei;T.scale.setScalar(0),T.updateMatrix();for(let S=0;S<Vi;S++)x.setMatrixAt(S,T.matrix);return x.instanceMatrix.needsUpdate=!0,e.add(x),x}const c={uC0:{value:new L(...r)},uC1:{value:new L(...a)},uC2:{value:new L(...n)},uC3:{value:new L(...s)}},l={uC0:{value:new L(...r)},uC1:{value:new L(...a)},uC2:{value:new L(...n)}};i.contactDotsMesh=o(Lv,c,5),i.contactRingsMesh=o(Pv,l,4)}function Bv(i){const{element:e,overlay:t,R:r}=i,a=e.clientWidth/2,n=e.clientHeight/2;i.staticLabelEls.forEach(l=>l.remove()),i.staticLabelEls=[];const s=[2,4,6,8,10];[.2,.4,.6,.8,1].forEach((l,u)=>{const d=document.createElement("span");d.className="s9-radar__ring-label",d.textContent=`${s[u]}km`,d.style.left=`${a+l*r+4}px`,d.style.top=`${n}px`,d.style.transform="translateY(-50%)",t.appendChild(d),i.staticLabelEls.push(d)});const o=[["N",0],["NE",ct*.125],["E",ct*.25],["SE",ct*.375],["S",ct*.5],["SW",ct*.625],["W",ct*.75],["NW",ct*.875]],c=r*1.05;o.forEach(([l,u])=>{const d=document.createElement("span");d.className="s9-radar__cardinal-label",d.textContent=l,d.style.left=`${a+Math.sin(u)*c}px`,d.style.top=`${n-Math.cos(u)*c}px`,d.style.transform="translate(-50%, -50%)",t.appendChild(d),i.staticLabelEls.push(d)})}function zv(i){Uv(i),Nv(i),Ov(i),Bv(i),i.contactDotsMesh?Hv(i):Fv(i)}function Hv(i){const{contacts:e,dummy:t,contactDotsMesh:r,contactRingsMesh:a,R:n}=i;!r||!a||(e.forEach((s,o)=>{if(!s)t.scale.setScalar(0),t.position.set(0,0,0);else{const c=s.age<.08?Ea(0,8,s.age/.08):8;t.position.set(Math.sin(s.angle)*s.range*n,Math.cos(s.angle)*s.range*n,0),t.scale.setScalar(c)}t.updateMatrix(),r.setMatrixAt(o,t.matrix),a.setMatrixAt(o,t.matrix)}),r.instanceMatrix.needsUpdate=!0,a.instanceMatrix.needsUpdate=!0)}function yu(i,e){const t=i.contacts[e];t&&(t.labelEl&&(t.labelEl.remove(),t.labelEl=null),i.contactDotsMesh&&i.contactRingsMesh&&(i.dummy.scale.setScalar(0),i.dummy.position.set(0,0,0),i.dummy.updateMatrix(),i.contactDotsMesh.setMatrixAt(e,i.dummy.matrix),i.contactRingsMesh.setMatrixAt(e,i.dummy.matrix),i.contactDotsMesh.instanceMatrix.needsUpdate=!0,i.contactRingsMesh.instanceMatrix.needsUpdate=!0),i.contacts[e]=null)}function qo(i,e,t,r,a){var n;const s=i.opts.maxContacts;if(i.contacts.filter(Boolean).length>=s){let u=-1,d=-1;for(let h=0;h<Vi;h++)((n=i.contacts[h])==null?void 0:n.type)==="ghost"&&i.contacts[h].age>d&&(u=h,d=i.contacts[h].age);if(u>=0)yu(i,u);else return console.warn("[pulse-radar] contact pool full"),null}let o=-1;for(let u=0;u<Vi;u++)if(!i.contacts[u]){o=u;break}if(o<0)return null;const c=r==="ghost",l={id:a||`T-${String(++yv).padStart(2,"0")}`,angle:(e%ct+ct)%ct,range:Math.max(0,Math.min(1,t)),type:r,age:c?.85:0,maxAge:c?3e3:8e3+Math.random()*1e4,bornAt:performance.now(),phase:c?Math.random()*.3:0,lastSweep:-1/0,ghostAngle:null,ghostRange:null,ghostSpawned:!1,instIdx:o,labelEl:null,revealed:c,revealTime:c?performance.now():null};if(!c){const u=document.createElement("span");u.className=`s9-radar__label s9-radar__label--${r}`,u.textContent=r==="hostile"?`${l.id} ⚠HC`:l.id,i.labelsDiv.appendChild(u),l.labelEl=u}return i.contacts[o]=l,l}function Sn(i){if(i.destroyed||i.reducedMotion)return;const e=Math.max(.05,i.opts.contactDensity),t=Ea(3e3,600,i.threatLevel)/e,r=(Math.random()-.5)*t*.4,a=Math.max(200,t+r);i.spawnTimer=setTimeout(()=>{!i.destroyed&&!i.reducedMotion&&(kv(i),Sn(i))},a)}function kv(i){const e=i.contacts.filter(n=>n&&n.type!=="ghost"),t=e.length>0&&Math.random()<.3?e[Math.floor(Math.random()*e.length)]:null,r=t?t.angle+(Math.random()-.5)*.4:Math.random()*ct,a=.15+Math.random()*.82;qo(i,r,a,bv(i.threatLevel))}function Gv(i,e){if(i.reducedMotion)return;i.sweepAngle=(i.sweepAngle+i.sweepSpeed*e/1e3)%ct;const t=performance.now();if(i.staticNextAt===null&&(i.staticNextAt=t+7e3+Math.random()*5e3),t>=i.staticNextAt&&!i.staticActive&&(i.staticActive=!0,i.staticEndAt=t+60+Math.random()*40,i.staticNextAt=i.staticEndAt+6e3+Math.random()*4e3),i.staticActive&&(i.sweepTrailMesh.material.uniforms.uStaticAmt.value=.5+Math.random()*.5,t>=i.staticEndAt&&(i.staticActive=!1,i.sweepTrailMesh.material.uniforms.uStaticAmt.value=1)),i.sweepTrailMesh&&(i.sweepTrailMesh.material.uniforms.uAngle.value=i.sweepAngle),i.sweepArmLine){const{R:r}=i,a=i.sweepArmLine.geometry.attributes.position;a.setXYZ(0,0,0,0),a.setXYZ(1,Math.sin(i.sweepAngle)*r,Math.cos(i.sweepAngle)*r,0),a.needsUpdate=!0}}function Vv(i,e){const{contacts:t,sweepAngle:r}=i,a=performance.now();t.forEach((n,s)=>{if(n){if(n.age+=e/n.maxAge,n.type!=="ghost"){const o=n.age>.65&&n.age<.85;n.phase+=yc(n.type)*(o?.5:1)*e/1e3}else n.phase+=yc("neutral")*e/1e3;n.type!=="ghost"&&!i.reducedMotion&&Math.abs(Sv(r,n.angle))<.12&&a-n.lastSweep>800&&(n.phase=0,n.lastSweep=a,n.revealed?n.age>.65&&(n.age=.6):(n.revealed=!0,n.revealTime=a)),n.type!=="ghost"&&!n.ghostSpawned&&n.age>=.65&&n.revealed&&(n.ghostAngle=n.angle,n.ghostRange=n.range,n.ghostSpawned=!0,qo(i,n.ghostAngle,n.ghostRange,"ghost")),n.age>=1&&yu(i,s)}})}function Wv(i){const{contacts:e,dummy:t,contactDotsMesh:r,contactRingsMesh:a,R:n}=i;if(!r||!a)return;let s=!1;e.forEach((o,c)=>{if(!o)return;s=!0;let l;o.revealed?l=Math.min(1,(i.now-o.revealTime)/300)*8:l=0,t.position.set(Math.sin(o.angle)*o.range*n,Math.cos(o.angle)*o.range*n,0),t.scale.setScalar(l),t.updateMatrix(),r.setMatrixAt(c,t.matrix),a.setMatrixAt(c,t.matrix);const u=Ev(o.type);r.geometry.attributes.a_type.setX(c,u),r.geometry.attributes.a_age.setX(c,o.age),r.geometry.attributes.a_phase.setX(c,o.phase),a.geometry.attributes.a_type.setX(c,u),a.geometry.attributes.a_age.setX(c,o.age),a.geometry.attributes.a_phase.setX(c,o.phase)}),s&&(r.instanceMatrix.needsUpdate=!0,a.instanceMatrix.needsUpdate=!0,r.geometry.attributes.a_type.needsUpdate=!0,r.geometry.attributes.a_age.needsUpdate=!0,r.geometry.attributes.a_phase.needsUpdate=!0,a.geometry.attributes.a_type.needsUpdate=!0,a.geometry.attributes.a_age.needsUpdate=!0,a.geometry.attributes.a_phase.needsUpdate=!0)}function Xv(i){const{contacts:e,element:t,R:r}=i,a=t.clientWidth/2,n=t.clientHeight/2;e.forEach(s=>{if(!(s!=null&&s.labelEl))return;if(!s.revealed){s.labelEl.style.opacity="0";return}const o=a+Math.sin(s.angle)*s.range*r,c=n-Math.cos(s.angle)*s.range*r;s.labelEl.style.left=`${o+7}px`,s.labelEl.style.top=`${c-6}px`,s.labelEl.style.opacity=String(Math.max(0,1-Math.max(0,s.age-.5)/.5))})}function jv(i){if(!i.footerEl)return;const e=i.contacts.filter(r=>r&&r.type!=="ghost").length,t=(ct/i.sweepSpeed).toFixed(1);i.footerEl.textContent=`CONTACTS: ${e} | SWEEP: ${t}s`}function wo(i,e){if(i.destroyed||!i.rafRunning){i.rafId=null;return}const t=Math.min(e-(i.lastTs??e),100);i.lastTs=e,i.now=e,i.R>0&&(i.backgroundMesh&&(i.backgroundMesh.material.uniforms.uTime.value=e/1e3),Gv(i,t),Vv(i,t),Wv(i),Xv(i),jv(i),i.renderer.render(i.scene,i.camera)),i.rafId=requestAnimationFrame(r=>wo(i,r))}function $v(i,e={}){if(yn.has(i)){console.warn("[pulse-radar] already initialised");const x=yn.get(i);return{setRadarThreatLevel:x.setRadarThreatLevel,injectContact:x.injectContact}}const t={sweepPeriod:Math.max(600,Math.min(2e4,e.sweepPeriod??4e3)),contactDensity:Math.max(0,Math.min(1,e.contactDensity??.5)),threatLevel:Math.max(0,Math.min(1,e.threatLevel??0)),primaryColor:e.primaryColor??null,maxContacts:Math.max(4,Math.min(64,e.maxContacts??48))},r=xu(),a=document.createElement("canvas");a.className="s9-radar__canvas";const n=document.createElement("div");n.className="s9-radar__overlay";const s=document.createElement("div");s.className="s9-radar__labels",n.appendChild(s),i.appendChild(a),i.appendChild(n);let o;try{o=new jo({canvas:a,antialias:!0,alpha:!1,premultipliedAlpha:!1})}catch(x){return console.error("[pulse-radar] WebGL context creation failed",x),a.remove(),n.remove(),{setRadarThreatLevel:()=>{},injectContact:()=>""}}o.setClearColor(new Ae(r.voidColor),1),o.setPixelRatio(Math.min(devicePixelRatio,2)),o.debug.checkShaderErrors=!0;const c=new Vo,l=new Nn(-1,1,1,-1,.1,100);l.position.z=10;const u={element:i,canvas:a,overlay:n,labelsDiv:s,renderer:o,scene:c,camera:l,opts:t,theme:r,R:0,sweepAngle:Math.random()*ct,sweepSpeed:ct/(t.sweepPeriod/1e3),threatLevel:t.threatLevel,contacts:new Array(Vi).fill(null),dummy:new ei,footerEl:document.getElementById("radar-contacts"),staticLabelEls:[],staticActive:!1,staticNextAt:null,staticEndAt:null,rafId:null,rafRunning:!1,destroyed:!1,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,backgroundMesh:null,ringMeshes:null,ticksMesh:null,sweepTrailMesh:null,sweepArmLine:null,contactDotsMesh:null,contactRingsMesh:null,matRingInner:null,matRingOuter:null,matRingTicks:null,spawnTimer:null,lastTs:null,now:performance.now(),resizeObserver:null,intersectionObserver:null,_motionMq:null,_motionHandler:null,setRadarThreatLevel:null,injectContact:null};yn.set(i,u);const d=i.closest(".s9-panel");d&&(d.classList.add("s9-panel--booting"),d.addEventListener("animationend",()=>d.classList.remove("s9-panel--booting"),{once:!0}));const h=new ResizeObserver(x=>{for(const T of x){const{width:S,height:w}=T.contentRect;if(S===0||w===0)return;const A=Math.floor(Math.min(S,w)/2)-8;if(A<=0)return;u.R=A,l.left=-A,l.right=A,l.top=A,l.bottom=-A,l.updateProjectionMatrix(),o.setSize(S,w),zv(u)}});h.observe(i),u.resizeObserver=h;const p=new IntersectionObserver(x=>{x.forEach(T=>{u.rafRunning=T.isIntersecting,u.rafRunning&&!u.rafId&&(u.rafId=requestAnimationFrame(S=>wo(u,S)))})},{threshold:0});p.observe(i),u.intersectionObserver=p;const g=matchMedia("(prefers-reduced-motion: reduce)"),y=()=>{u.reducedMotion=g.matches,u.reducedMotion?(u.sweepAngle=Math.PI*.15,clearTimeout(u.spawnTimer)):Sn(u)};g.addEventListener("change",y),u._motionMq=g,u._motionHandler=y,u.rafRunning=!0,u.rafId=requestAnimationFrame(x=>wo(u,x)),u.reducedMotion||Sn(u);function f(x){const T=Math.max(0,Math.min(1,x));u.threatLevel=T,u.sweepSpeed=Ea(ct/4,ct/1.2,T),clearTimeout(u.spawnTimer),Sn(u)}function m(x,T,S){const w=["friendly","neutral","hostile"].includes(S)?S:"neutral",A=qo(u,x,Math.max(0,Math.min(1,T)),w);return A?A.id:""}return u.setRadarThreatLevel=f,u.injectContact=m,{setRadarThreatLevel:f,injectContact:m}}function qv(i){const e=yn.get(i);if(!e)return;const t=xu();e.theme=t;const r=Xi(t.neonGreen),a=Xi(t.neonAmber),n=Xi(t.neonMagenta),s=Xi(t.neonCyan),o=new Ae(t.neonCyan);if(e.backgroundMesh){const c=new Ae(t.voidColor);e.backgroundMesh.material.uniforms.uVoidColor.value.set(c.r,c.g,c.b),e.renderer.setClearColor(new Ae(t.voidColor),1)}if(e.matRingInner&&e.matRingInner.color.set(t.neonCyan),e.matRingOuter&&e.matRingOuter.color.set(t.neonCyan),e.matRingTicks&&e.matRingTicks.color.set(t.neonCyan),e.sweepTrailMesh&&e.sweepTrailMesh.material.uniforms.uColor.value.set(o.r,o.g,o.b),e.sweepArmLine&&e.sweepArmLine.material.color.set(t.neonCyan),e.contactDotsMesh){const c=e.contactDotsMesh.material.uniforms;c.uC0.value.set(...r),c.uC1.value.set(...a),c.uC2.value.set(...n),c.uC3.value.set(...s)}if(e.contactRingsMesh){const c=e.contactRingsMesh.material.uniforms;c.uC0.value.set(...r),c.uC1.value.set(...a),c.uC2.value.set(...n)}}const bn={"":"MATRIX GREEN",gits:"GHOST IN THE SHELL",amber:"AMBER",phosphor:"PHOSPHOR",blood:"BLOOD"};function Co(i){const e=document.documentElement;i===""||i==="matrixgreen"?delete e.dataset.theme:e.dataset.theme=i,document.querySelectorAll(".topbar__theme-btn").forEach(t=>{t.classList.toggle("topbar__theme-btn--active",(t.dataset.themeSet??"")===(i==="matrixgreen"?"":i))}),gc($e),Ro&&gc(document.getElementById("threatmap-tactical")),qv(Au)}function Su(){const i=new Date;document.getElementById("topbar-clock").textContent=`UTC ${i.toUTCString().split(" ")[4]}`}Su();setInterval(Su,1e3);document.querySelectorAll(".s9-panel").forEach(lv);document.querySelectorAll(".topbar__theme-btn").forEach(i=>{i.addEventListener("click",()=>{const e=i.dataset.themeSet??"";Co(e),Pe(Ce,`THEME: ${bn[e]??e.toUpperCase()}`,"sys")})});const bu=document.querySelectorAll(".topbar__tab[data-tab]"),Yv=document.querySelectorAll(".center__view[data-view]");let Sc=!1,Ro=!1;function bc(i){bu.forEach(e=>{const t=e.dataset.tab===i;e.classList.toggle("topbar__tab--active",t),e.setAttribute("aria-selected",t)}),Yv.forEach(e=>{e.classList.toggle("center__view--active",e.dataset.view===i)}),i==="network"&&!Sc&&(Sc=!0,b0()),i==="tactical"&&!Ro&&(Ro=!0,S0()),Pe(Ce,`VIEW: ${i.toUpperCase()} ACTIVATED`,"sys")}bu.forEach(i=>{i.addEventListener("click",()=>bc(i.dataset.tab)),i.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),bc(i.dataset.tab))})});const Ce=document.querySelector(".s9-terminal");u_(Ce,{onSubmit(i){var e;const t=i.trim().split(/\s+/),r=t[0].toLowerCase(),a=t.slice(1);switch(r){case"help":Pe(Ce,"SECTION 9 COMMAND INTERFACE — AVAILABLE COMMANDS:","sys"),Pe(Ce,"  status              — system status report","info"),Pe(Ce,"  ghost               — ghost coefficient analysis","info"),Pe(Ce,"  nodes               — list active threat nodes","info"),Pe(Ce,"  threat <lvl>        — set global threat level 0-100","info"),Pe(Ce,"  threat <id> <lvl>   — set node threat level","info"),Pe(Ce,"  focus <id>          — focus camera on node","info"),Pe(Ce,"  theme <name>        — switch theme","info"),Pe(Ce,"  themes              — list available themes","info"),Pe(Ce,"  clear               — clear terminal","info");break;case"status":{const n=at.size,s=[...at.values()].filter(c=>c>=70).length,o=n>0?Math.max(...at.values()):0;Pe(Ce,"── SYSTEM STATUS ──────────────────────────","sys"),Pe(Ce,`  CPU: ${Bt.cpu}%   MEM: ${Bt.mem}%   NET I/O: ${Bt.net}%`,"info"),Pe(Ce,`  GHOST LAYER: ${Bt.ghost}%   ENCRYPTION: ${Bt.enc}%`,"info"),Pe(Ce,`  NODES ON GRID: ${n}   CRITICAL: ${s}`,s>0?"err":"info"),Pe(Ce,`  PEAK THREAT: ${o}   GLOBAL LEVEL: ${o}`,o>=70?"err":"sys"),Pe(Ce,"  SECURE CHANNEL: ACTIVE   ENCRYPTION: AES-256","info");break}case"ghost":{const n=Fr.toFixed(1);Pe(Ce,"── GHOST COEFFICIENT ANALYSIS ─────────────","sys"),Pe(Ce,`  COEFFICIENT: ${n}%   BARRIER: NOMINAL`,"info"),Pe(Ce,"  CYBER BRAIN: SECTION 9 CLEARANCE ALPHA-7","info"),Pe(Ce,"  DIVE DEPTH: STABLE 3.2m   TACHIKOMA LINK: ACTIVE","info"),Pe(Ce,"  IDENTITY: CONFIRMED — KUSANAGI.M",n>=95?"sys":"err");break}case"nodes":{if(at.size===0){Pe(Ce,"NO NODES ON GRID","info");break}Pe(Ce,`ACTIVE NODES (${at.size}):`,"sys");for(const[n,s]of at){const o=fi.find(u=>u.id===n),c=(o==null?void 0:o.label)??n,l=s>=70?"err":s>=40?"sys":"info";Pe(Ce,`  ${n.padEnd(14)} ${c.padEnd(12)} LVL=${s}`,l)}break}case"threat":{if(a.length===0){Pe(Ce,`GLOBAL THREAT: ${Math.max(0,...at.values())}`,"sys");break}if(a.length>=2&&isNaN(parseInt(a[0]))){const n=a[0],s=parseInt(a[1]);if(!at.has(n)){Pe(Ce,`ERR: node '${n}' not found — use NODES to list`,"err");break}if(isNaN(s)||s<0||s>100){Pe(Ce,"ERR: level must be 0-100","err");break}const o=Pn($e,n,s);at.set(n,s),Ci($e,Math.max(0,...at.values())),Ta.setRadarThreatLevel(Math.max(0,...at.values())/100),Pe(Ce,`NODE ${n}: ${o} → ${s}`,s>=70?"err":"sys"),s>=70&&o<70&&(vi($e,n),pr($e,n))}else{const n=parseInt(a[0]);if(isNaN(n)||n<0||n>100){Pe(Ce,"ERR: level must be 0-100","err");break}Ci($e,n),Ta.setRadarThreatLevel(n/100),Pe(Ce,`GLOBAL THREAT LEVEL SET: ${n}`,"sys")}break}case"focus":{const n=a[0];if(!n){Pe(Ce,"ERR: focus requires a node id — use NODES to list","err");break}if(!at.has(n)){Pe(Ce,`ERR: node '${n}' not found`,"err");break}vi($e,n),pr($e,n);const s=fi.find(o=>o.id===n);Pe(Ce,`CAMERA FOCUSED: ${(s==null?void 0:s.label)??n}`,"sys");break}case"theme":{const n=((e=a[0])==null?void 0:e.toLowerCase())??"";if(n===""||n==="matrixgreen"){Co(""),Pe(Ce,"THEME: MATRIX GREEN","sys");break}if(!Object.keys(bn).includes(n)){Pe(Ce,`ERR: unknown theme '${n}' — use THEMES to list`,"err");break}Co(n),Pe(Ce,`THEME: ${bn[n]}`,"sys");break}case"themes":Pe(Ce,"AVAILABLE THEMES:","sys");for(const[n,s]of Object.entries(bn))Pe(Ce,`  ${(n||"matrixgreen").padEnd(14)} ${s}`,"info");break;case"clear":h_(Ce),Pe(Ce,"TERMINAL CLEARED","sys");break;default:r&&Pe(Ce,`ERR: unknown command '${i}' — type HELP`,"err")}},tabComplete(i){return["help","status","ghost","nodes","threat","focus","theme","themes","clear"].find(e=>e.startsWith(i.toLowerCase()))??null}});Pe(Ce,"SECTION 9 OPERATIVE INTERFACE — TYPE HELP FOR COMMANDS","sys");Pe(Ce,"GHOST BABEL OPERATION: ACTIVE","info");function Ts(i,e,t){let r=0;function a(){if(r>=i.length)return;const{id:n,state:s}=i[r++],o=document.getElementById(n);o&&cv(o,s),setTimeout(a,r<i.length?e:e*2)}a()}const Ec=[{cls:"sigint",headline:"SIGNAL INTERCEPT: FREQ 12.4GHz",detail:"Encrypted burst tx — POSEIDON signature"},{cls:"humint",headline:"ASSET CONFIRM: NIIHAMA-04",detail:"Target movement: port district, 0300 local"},{cls:"cyber",headline:"ZERO-DAY: CVE-2026-3917",detail:"Legacy auth stack — remote exec payload ready"},{cls:"ghost",headline:"DIVE ANOMALY: SECTOR ALPHA",detail:"Ghost-barrier interference at 4.1m depth"},{cls:"elint",headline:"DRONE SWEEP: SECTOR 12",detail:"Coverage 73% — ETA 4 minutes to full map"},{cls:"sigint",headline:"PACKET STORM: 192.168.7.0/24",detail:"18k pps sustained — possible DDoS staging"},{cls:"cyber",headline:"EXFIL CHANNEL COMPROMISED",detail:"Fallback route DELTA-9 now primary exfil"},{cls:"humint",headline:"CONTACT LOST: ROMEO-7",detail:"Last check-in 03:14:22 UTC — status unknown"},{cls:"ghost",headline:"TACHIKOMA: AUTONOMOUS SWEEP",detail:"Unit 9 executing sector 7 independently"},{cls:"elint",headline:"EM PULSE DETECTED: ZONE 3",detail:"Localized disruption — comm nodes offline"},{cls:"sigint",headline:"NODE COMMS SPIKE: BEIJING",detail:"340% increase in encrypted P2P — 0300-0500"},{cls:"cyber",headline:"FIREWALL PROBE: AS12345",detail:"Systematic port sweep — countermeasures deployed"},{cls:"humint",headline:"BROKER IDENTIFIED: LAUGHING MAN",detail:"Dark web auction — biotech data linked to incident"},{cls:"ghost",headline:"GHOST PROTOCOL: BETA-3",detail:"Shell confirmed on target system — extract ready"},{cls:"elint",headline:"SAT PASS: KH-17 WINDOW",detail:"6 min coverage — imaging tasked to sector 4"}];function Zv(i){const e=document.createElement("div");return e.className=`sigint-item sigint-item--${i.cls}`,e.innerHTML=`
    <div class="sigint-item__class">${i.cls.toUpperCase()}</div>
    <div class="sigint-item__headline">${i.headline}</div>
    <div class="sigint-item__detail">${i.detail}</div>
  `,e}(function(){const i=document.getElementById("sigint-feed");if(!i)return;const e=4,t=[];function r(){const a=new Set(t.map(u=>{var d;return(d=u.querySelector(".sigint-item__headline"))==null?void 0:d.textContent})),n=Ec.filter(u=>!a.has(u.headline)),s=n.length>0?n:Ec,o=s[Math.floor(Math.random()*s.length)],c=Zv(o);i.insertBefore(c,i.firstChild),t.unshift(c),requestAnimationFrame(()=>c.classList.add("sigint-item--visible"));const l=8e3+Math.random()*12e3;for(setTimeout(()=>{c.classList.add("sigint-item--closing"),c.classList.remove("sigint-item--visible"),setTimeout(()=>{c.remove();const u=t.indexOf(c);u>=0&&t.splice(u,1)},500)},l);t.length>e;){const u=t.pop();u.classList.add("sigint-item--closing"),u.classList.remove("sigint-item--visible"),setTimeout(()=>u.remove(),500)}setTimeout(r,3e3+Math.random()*6e3)}setTimeout(r,800),setTimeout(r,2200)})();const Tc=[{cls:"STRATEGIC",headline:"BIOMECH TREATY VOTE: 72HRS",detail:"Section 9 on standby for security detail"},{cls:"TACTICAL",headline:"LAUGHING MAN: ACTIVE",detail:"New sightings logged in Niihama and Togusa ward"},{cls:"ASSET",headline:"BATOU: FIELD POSITION UPDATE",detail:"Grid 7-Delta — visual on primary target"},{cls:"THREAT",headline:"PUPPET MASTER PROTOCOL",detail:"AI ghost-dive signatures — 3 confirmed nodes"},{cls:"STRATEGIC",headline:"ARAMAKI: SITUATION ROOM",detail:"Director briefing at 0600 UTC — attendance req"},{cls:"TACTICAL",headline:"TOGUSA: DEEP COVER",detail:"Identity: Muto Ryo — corporate embedded"},{cls:"THREAT",headline:"ROGUE TACHIKOMA UNIT",detail:"Unit 14 unresponsive — last GPS: Sector 9-Bravo"},{cls:"ASSET",headline:"ISHIKAWA: CYBER BREACH",detail:"Target mainframe penetrated — exfil in 180s"},{cls:"STRATEGIC",headline:"COMA CHIP EXPLOIT: CONFIRMED",detail:"Hardware vulnerability — 40k units affected"},{cls:"TACTICAL",headline:"HELICOPTER SUPPORT: STANDING BY",detail:"AH-6J on tarmac — ETA to sector: 4 min"}];function Kv(i){const e=document.createElement("div");return e.className="intel-item",e.innerHTML=`
    <div class="intel-item__class">${i.cls}</div>
    <div class="intel-item__headline">${i.headline}</div>
    <div class="intel-item__detail">${i.detail}</div>
  `,e}(function(){const i=document.getElementById("intel-feed");if(!i)return;const e=5,t=[];function r(){const a=new Set(t.map(u=>{var d;return(d=u.querySelector(".intel-item__headline"))==null?void 0:d.textContent})),n=Tc.filter(u=>!a.has(u.headline)),s=n.length>0?n:Tc,o=s[Math.floor(Math.random()*s.length)],c=Kv(o);i.insertBefore(c,i.firstChild),t.unshift(c),requestAnimationFrame(()=>c.classList.add("intel-item--visible"));const l=1e4+Math.random()*15e3;for(setTimeout(()=>{c.classList.add("intel-item--closing"),c.classList.remove("intel-item--visible"),setTimeout(()=>{c.remove();const u=t.indexOf(c);u>=0&&t.splice(u,1)},500)},l);t.length>e;){const u=t.pop();u.classList.add("intel-item--closing"),u.classList.remove("intel-item--visible"),setTimeout(()=>u.remove(),500)}setTimeout(r,4e3+Math.random()*8e3)}setTimeout(r,1200),setTimeout(r,3500),setTimeout(r,5800)})();setTimeout(()=>{Ts([{id:"seq-breach",state:"complete"},{id:"seq-extract",state:"active"}],3e3),setTimeout(()=>{Ts([{id:"seq-extract",state:"complete"},{id:"seq-cover",state:"active"}],3500),setTimeout(()=>{Ts([{id:"seq-cover",state:"complete"},{id:"seq-exfil",state:"active"}],3e3)},9e3)},8e3)},5e3);const Zr=document.querySelector(".s9-stream");f_(Zr);const ui=()=>`${st(10,220)}.${st(0,255)}.${st(0,255)}.${st(1,254)}`,As=()=>[22,80,443,8443,4444,3389,21,1337,9999][Math.floor(Math.random()*9)],Jv=()=>`${st(64,65535)}B`,Qv=()=>Array.from({length:4},()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0")).join(" ");function e0(){const i=[()=>({source:"AUTH",message:`HANDSHAKE COMPLETE — ${ui()}:${As()}`,alert:!1}),()=>({source:"NET",message:`PKT ${Jv()} ${ui()} → ${ui()}`,alert:!1}),()=>({source:"GHOST",message:`DIVE DEPTH: ${(2+Math.random()*3).toFixed(1)}m — STABLE`,alert:!1}),()=>({source:"CRYPT",message:"AES-256 SESSION KEY ESTABLISHED",alert:!1}),()=>({source:"SCAN",message:`PROBE: ${ui()}:${As()} — ${Qv()}`,alert:!0}),()=>({source:"SYS",message:`MEM ${st(60,92)}% CPU ${st(20,80)}% THERMAL OK`,alert:!1}),()=>({source:"NET",message:`LATENCY ${st(4,45)}ms — ${Math.random()<.8?"NOMINAL":"DEGRADED"}`,alert:Math.random()<.2}),()=>({source:"AUTH",message:`TOKEN REFRESH: UID-${st(1e3,9999)}`,alert:!1}),()=>({source:"CRIT",message:`INTRUSION SIG: ${ui()} PORT ${As()}`,alert:!0}),()=>({source:"SYS",message:`COUNTERMEASURE DEPLOYED — BLOCK RULE ${st(100,999)}`,alert:!1}),()=>({source:"NET",message:`ROUTE CHANGE: AS${st(1e3,65e3)} VIA ${ui()}`,alert:!1}),()=>({source:"CRYPT",message:`TLS 1.3 HANDSHAKE: ${ui()} — ${st(0,1)?"ECDH":"RSA"}-4096`,alert:!1}),()=>({source:"SCAN",message:`ANOMALY: BURST ${st(800,9999)} PPS FROM ${ui()}`,alert:!0}),()=>({source:"GHOST",message:`GHOST COEFFICIENT: ${(92+Math.random()*8).toFixed(1)}%`,alert:!1}),()=>({source:"AUTH",message:`CERT CHAIN VALID — SHA-${st(0,1)?"256":"512"}`,alert:!1}),()=>({source:"NET",message:`DNS RESOLVE: ${["niihama.net","togusa.local","sec9.gov","puppet.io"][Math.floor(Math.random()*4)]}`,alert:!1}),()=>({source:"SYS",message:`FIREWALL RULE ${st(1e3,9999)}: DROP ${ui()}/${st(24,32)}`,alert:!1}),()=>({source:"CRIT",message:`ZERO-DAY ATTEMPT: ${ui()} — MITIGATED`,alert:!0})];function e(){const t=i[Math.floor(Math.random()*i.length)];ba(Zr,{timestamp:new Date().toISOString(),...t()})}for(let t=0;t<8;t++)e();setInterval(e,st(1200,2800))}e0();const Bt={cpu:42,mem:61,net:12,ghost:77,enc:96},t0=document.getElementById("tele-cpu"),i0=document.getElementById("tele-mem"),r0=document.getElementById("tele-net"),a0=document.getElementById("tele-enc");setInterval(()=>{for(const i of Object.keys(Bt))Bt[i]=Math.max(5,Math.min(100,Bt[i]+(Math.random()-.5)*6)),Bt[i]=Math.round(Bt[i]);sn(t0,Bt.cpu),sn(i0,Bt.mem),sn(r0,Bt.net),sn(a0,Bt.enc)},2e3);const n0=document.getElementById("neural-01"),s0=document.getElementById("ghost-val"),o0=document.getElementById("cyber-index"),l0=document.getElementById("neural-sync"),Ri=document.getElementById("ekg-canvas"),c0=document.getElementById("ekg-bpm"),ln=document.getElementById("ekg-heart");let Fr=98.4,Dn=62,ki=0,ws=0;const Cs=.37;function u0(){ln&&(ln.classList.remove("beat"),ln.offsetWidth,ln.classList.add("beat"))}function Ac(i){return i>.08&&i<.18?Math.sin((i-.08)/.1*Math.PI)*.18:i>.28&&i<.32?-((i-.28)/.04)*.38:i>.32&&i<.37?-.38+(i-.32)/.05*1.38:i>.37&&i<.43?1-(i-.37)/.06*1.28:i>.43&&i<.49?-.28+(i-.43)/.06*.28:i>.52&&i<.68?Math.sin((i-.52)/.16*Math.PI)*.3:0}function h0(){if(!Ri)return;const i=Ri.getContext("2d"),e=Ri.width,t=Ri.height,r=t/2,a=t*.44,n=Dn/60/80;i.clearRect(0,0,e,t);const s=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";i.beginPath();for(let c=0;c<e;c++){const l=((ki-(e-1-c)*n)%1+1)%1,u=r-Ac(l)*a;c===0?i.moveTo(c,u):i.lineTo(c,u)}i.strokeStyle=s,i.lineWidth=1,i.shadowColor=s,i.shadowBlur=5,i.stroke();const o=r-Ac(ki)*a;i.beginPath(),i.arc(e-1,o,1.8,0,Math.PI*2),i.fillStyle=s,i.shadowBlur=10,i.fill()}function Eu(){if(!Ri)return;const i=Ri.clientWidth;i&&Ri.width!==i&&(Ri.width=i)}Eu();new ResizeObserver(Eu).observe(Ri);let Rs=0;(function i(e){const t=Rs?e-Rs:16;Rs=e,ws=ki,ki=(ki+Dn/60*(t/1e3))%1,(ws<Cs&&ki>=Cs||ws>ki&&ki>=Cs)&&u0(),h0(),requestAnimationFrame(i)})(0);function Tu(){Fr=Math.max(85,Math.min(100,Fr+(Math.random()-.45)*1.2));const i=Fr.toFixed(1);Dn=Math.round(58+(100-Fr)/15*12),c0.textContent=Dn,m_(n0,()=>{s0.textContent=i,o0.textContent=`${i}%`,l0.textContent=`${Math.round(Fr)}%`})}for(let i=0;i<3;i++)Tu();setInterval(Tu,3e3);const $e=document.querySelector(".s9-threatmap");gu($e,{autoRotate:!0,bloomStrength:.4});const Au=document.getElementById("proximity-radar"),Ta=$v(Au,{threatLevel:0}),d0=getComputedStyle(document.documentElement).getPropertyValue("--neon-green").trim()||"#00ff70";xv(document.getElementById("matrix-rain-host"),{color:d0,opacity:.9,syncCamera:Q_($e)});document.getElementById("sat-toggle").addEventListener("change",i=>{sv($e,i.target.checked)});const fi=[{id:"n-tokyo",lat:35.68,lng:139.69,label:"TOKYO"},{id:"n-moscow",lat:55.75,lng:37.62,label:"MOSCOW"},{id:"n-beijing",lat:39.91,lng:116.39,label:"BEIJING"},{id:"n-london",lat:51.51,lng:-.13,label:"LONDON"},{id:"n-nyc",lat:40.71,lng:-74,label:"NEW YORK"},{id:"n-sydney",lat:-33.87,lng:151.21,label:"SYDNEY"},{id:"n-dubai",lat:25.2,lng:55.27,label:"DUBAI"},{id:"n-saopaulo",lat:-23.55,lng:-46.63,label:"SÃO PAULO"},{id:"n-paris",lat:48.86,lng:2.35,label:"PARIS"},{id:"n-seoul",lat:37.57,lng:126.98,label:"SEOUL"},{id:"n-cairo",lat:30.05,lng:31.24,label:"CAIRO"},{id:"n-berlin",lat:52.52,lng:13.41,label:"BERLIN"},{id:"n-mumbai",lat:19.08,lng:72.88,label:"MUMBAI"},{id:"n-toronto",lat:43.65,lng:-79.38,label:"TORONTO"},{id:"n-singapore",lat:1.35,lng:103.82,label:"SINGAPORE"},{id:"n-nairobi",lat:-1.29,lng:36.82,label:"NAIROBI"},{id:"n-istanbul",lat:41.01,lng:28.97,label:"ISTANBUL"},{id:"n-lagos",lat:6.52,lng:3.38,label:"LAGOS"}],at=new Map;function st(i,e){return Math.floor(Math.random()*(e-i+1))+i}const p0={"n-tokyo":{country:"JAPAN",pop:"13.96M",status:"FINANCIAL HUB"},"n-moscow":{country:"RUSSIA",pop:"12.51M",status:"RESTRICTED"},"n-beijing":{country:"CHINA",pop:"21.54M",status:"RESTRICTED"},"n-london":{country:"UK",pop:"8.98M",status:"ALLIED NODE"},"n-nyc":{country:"USA",pop:"8.34M",status:"ALLIED NODE"},"n-sydney":{country:"AUSTRALIA",pop:"5.31M",status:"ALLIED NODE"},"n-dubai":{country:"UAE",pop:"3.33M",status:"NEUTRAL ZONE"},"n-saopaulo":{country:"BRAZIL",pop:"12.33M",status:"MONITORED"},"n-paris":{country:"FRANCE",pop:"2.15M",status:"ALLIED NODE"},"n-seoul":{country:"S.KOREA",pop:"9.78M",status:"ALLIED NODE"},"n-cairo":{country:"EGYPT",pop:"10.08M",status:"MONITORED"},"n-berlin":{country:"GERMANY",pop:"3.66M",status:"ALLIED NODE"},"n-mumbai":{country:"INDIA",pop:"20.67M",status:"MONITORED"},"n-toronto":{country:"CANADA",pop:"2.93M",status:"ALLIED NODE"},"n-singapore":{country:"SINGAPORE",pop:"5.45M",status:"NEUTRAL ZONE"},"n-nairobi":{country:"KENYA",pop:"4.40M",status:"MONITORED"},"n-istanbul":{country:"TURKEY",pop:"15.46M",status:"NEUTRAL ZONE"},"n-lagos":{country:"NIGERIA",pop:"14.86M",status:"MONITORED"}};function f0(i){let e=i.split("").reduce((c,l)=>c*31+l.charCodeAt(0)>>>0,7);const t=()=>(e=e*1664525+1013904223>>>0,(e>>>16)/65535),r=9,a=140,n=34,s=a/r;let o=`<svg viewBox="0 0 ${a} ${n}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;height:34px;">`;o+='<g fill="currentColor">';for(let c=0;c<r;c++){const l=8+t()*24,u=s*(.48+t()*.44),d=c*s+(s-u)*.5;o+=`<rect x="${d.toFixed(1)}" y="${(n-l).toFixed(1)}" width="${u.toFixed(1)}" height="${l.toFixed(1)}"/>`}return o+="</g></svg>",o}function wu(i,e,t){t.dispatchEvent(new CustomEvent("s9:alert",{bubbles:!0,detail:{level:e>=70?"critical":"warning",source:i}}))}function Cu(i,e){To($e,{...i,level:e}),at.set(i.id,e),ba(Zr,{timestamp:new Date().toISOString(),source:"NET",message:`NODE ONLINE: ${i.label} — LVL ${e}`,alert:e>=70}),e>=70&&(wu(i.label,e,$e),vi($e,i.id),pr($e,i.id))}const Aa=fi.slice(0,8),Lo=[15,72,55,18,28,10,45,33];Aa.forEach((i,e)=>{setTimeout(()=>{Cu(i,Lo[e]),e===Aa.length-1&&setTimeout(()=>{Ci($e,55),Ta.setRadarThreatLevel(.55)},800)},e*300+500)});function Ru(){const i=[...at.keys()],e=fi.filter(r=>!at.has(r.id)),t=Math.random();if(t<.28&&e.length>0){const r=e[st(0,e.length-1)],a=st(5,65);Cu(r,a),Pe(Ce,`SIGNAL ACQUIRED: ${r.label}`,"sys")}else if(t<.42&&i.length>5){const r=i[st(0,i.length-1)],a=fi.find(n=>n.id===r);_u($e,r),at.delete(r),Pe(Ce,`SIGNAL LOST: ${(a==null?void 0:a.label)??r}`,"info"),ba(Zr,{timestamp:new Date().toISOString(),source:"NET",message:`NODE OFFLINE: ${(a==null?void 0:a.label)??r}`,alert:!1})}else if(t<.72&&i.length>0){const r=i[st(0,i.length-1)],a=fi.find(u=>u.id===r),n=at.get(r)??0,s=st(8,28),o=Math.min(100,n+s);Pn($e,r,o),at.set(r,o),Ci($e,Math.max(...at.values())),Ta.setRadarThreatLevel(Math.max(...at.values())/100),Pe(Ce,`THREAT ESCALATION: ${(a==null?void 0:a.label)??r} ${n}→${o}`,o>=70?"err":"sys"),ba(Zr,{timestamp:new Date().toISOString(),source:"CRIT",message:`THREAT UP: ${(a==null?void 0:a.label)??r} LVL=${o}`,alert:o>=70}),o>=70&&n<70&&(wu((a==null?void 0:a.label)??r,o,$e),vi($e,r),pr($e,r));const c=n>=70?2:n>=40?1:0,l=o>=70?2:o>=40?1:0;c!==l&&mc($e,r)}else if(i.length>0){const r=i[st(0,i.length-1)],a=fi.find(l=>l.id===r),n=at.get(r)??50,s=Math.max(0,n-st(5,18));Pn($e,r,s),at.set(r,s),Ci($e,Math.max(0,...at.values())),Ta.setRadarThreatLevel(Math.max(0,...at.values())/100),Pe(Ce,`THREAT REDUCED: ${(a==null?void 0:a.label)??r} LVL=${s}`,"info");const o=n>=70?2:n>=40?1:0,c=s>=70?2:s>=40?1:0;o!==c&&mc($e,r)}if(i.length>=2){const r=1+Math.floor(Math.random()*3);for(let a=0;a<r;a++){const n=i[Math.floor(Math.random()*i.length)];let s=i[Math.floor(Math.random()*i.length)];s===n&&(s=i[(i.indexOf(n)+1)%i.length]),s!==n&&Mu($e,n,s)}}setTimeout(Ru,st(4e3,9e3))}setTimeout(Ru,Aa.length*300+2500);setInterval(()=>{const i=[...at.keys()];if(i.length<2)return;const e=Math.random()<.4?2:1;for(let t=0;t<e;t++){const r=i[Math.floor(Math.random()*i.length)];let a=i[Math.floor(Math.random()*i.length)];a===r&&(a=i[(i.indexOf(r)+1)%i.length]),a!==r&&Mu($e,r,a)}},1200);setInterval(()=>{const i=[...at.entries()].filter(([,n])=>n>=70);if(i.length===0)return;const e=$e.getAttribute("data-active-node"),t=i.filter(([n])=>n!==e),r=t.length>0?t:i,[a]=r[Math.floor(Math.random()*r.length)];vi($e,a),pr($e,a)},8e3);const m0=document.getElementById("alert-host");document.addEventListener("s9:alert",i=>{var e;if(((e=i.detail)==null?void 0:e.level)==="critical"){const t=i.detail.source??"UNKNOWN";Pe(Ce,`⚠ CRITICAL ALERT: ${t}`,"err"),__(m0,{level:"critical",code:"CRITICAL THREAT",message:t})}});const va=document.getElementById("node-popup"),g0=document.getElementById("np-city"),_0=document.getElementById("np-skyline"),v0=document.getElementById("np-country"),M0=document.getElementById("np-pop"),x0=document.getElementById("np-coords"),wc=document.getElementById("np-threat"),y0=document.getElementById("np-status");$e.addEventListener("s9:threatmap-node-select",i=>{const{nodeId:e,label:t,level:r,lat:a,lng:n}=i.detail;Pe(Ce,`NODE SELECT: ${t} — LEVEL ${r} — ${a.toFixed(2)}°, ${n.toFixed(2)}°`,r>=71?"err":r>=41?"warn":"info"),ba(Zr,{timestamp:new Date().toISOString(),source:"TGT",message:`TARGET LOCKED: ${t} THREAT=${r}`,alert:r>=41});const s=p0[e]??{country:"—",pop:"—",status:"UNKNOWN"};g0.textContent=t,_0.innerHTML=f0(e),v0.textContent=s.country,M0.textContent=s.pop,x0.textContent=`${a.toFixed(2)}°, ${n.toFixed(2)}°`;const o=r>=70?"CRITICAL":r>=40?"ELEVATED":"LOW";wc.textContent=`${r} — ${o}`,wc.style.color=r>=70?"var(--text-alert)":r>=40?"var(--neon-amber)":"var(--neon-green)",y0.textContent=s.status,va.classList.toggle("node-popup--left",n>60),va.setAttribute("aria-hidden","false"),va.classList.add("node-popup--visible")});$e.addEventListener("s9:threatmap-node-deselect",()=>{va.classList.remove("node-popup--visible"),setTimeout(()=>va.setAttribute("aria-hidden","true"),260)});function S0(){const i=document.getElementById("threatmap-tactical");gu(i,{autoRotate:!0,bloomStrength:.7});const e=new Map;Aa.forEach((h,p)=>{setTimeout(()=>{To(i,{...h,level:Lo[p]}),e.set(h.id,Lo[p])},p*200+300)}),setTimeout(()=>Ci(i,55),Aa.length*200+800);const t=document.getElementById("tact-node-info"),r=document.getElementById("tact-btn-add"),a=document.getElementById("tact-btn-remove"),n=document.getElementById("tact-btn-focus"),s=document.getElementById("tact-btn-deselect"),o=document.getElementById("tact-level-slider"),c=document.getElementById("tact-level-val"),l=document.getElementById("tact-level-row");let u=null;function d(){const h=u!==null&&e.has(u);if(a.disabled=!h,n.disabled=!h,s.disabled=!h,o.disabled=!h,l.style.opacity=h?"1":"0.4",l.style.pointerEvents=h?"auto":"none",h){const p=fi.find(y=>y.id===u),g=e.get(u);t.textContent=`${(p==null?void 0:p.label)??u} — LVL ${g}`,o.value=g,c.textContent=g}else t.textContent="NO NODE SELECTED"}i.addEventListener("s9:threatmap-node-select",h=>{u=h.detail.nodeId,document.getElementById("tactical-threat").textContent=`THREAT: ${h.detail.level} — ${h.detail.label}`,d()}),i.addEventListener("s9:threatmap-node-deselect",()=>{u=null,d()}),r.addEventListener("click",()=>{const h=fi.filter(y=>!e.has(y.id));if(h.length===0)return;const p=h[Math.floor(Math.random()*h.length)],g=Math.floor(Math.random()*60)+10;To(i,{...p,level:g}),e.set(p.id,g),Ci(i,Math.max(...e.values())),vi(i,p.id),pr(i,p.id)}),a.addEventListener("click",()=>{u&&(_u(i,u),e.delete(u),Ci(i,e.size>0?Math.max(...e.values()):0),u=null,d())}),n.addEventListener("click",()=>{u&&pr(i,u)}),s.addEventListener("click",()=>{vi(i,null),u=null,d()}),o.addEventListener("input",()=>{if(!u)return;const h=parseInt(o.value);c.textContent=h,Pn(i,u,h),e.set(u,h),Ci(i,Math.max(...e.values()));const p=fi.find(g=>g.id===u);t.textContent=`${(p==null?void 0:p.label)??u} — LVL ${h}`}),d()}function b0(){const i=document.getElementById("flow-matrix");if(!i)return;const e=[{id:"sec9",label:"SEC.9 HQ",x:50,y:50,root:!0},{id:"niihama",label:"NIIHAMA",x:22,y:22},{id:"togusa",label:"TOGUSA",x:78,y:22},{id:"batou",label:"BATOU",x:78,y:78},{id:"ishikawa",label:"ISHIKAWA",x:22,y:78},{id:"relay1",label:"RELAY ALPHA",x:36,y:32},{id:"relay2",label:"RELAY BETA",x:64,y:32},{id:"relay3",label:"RELAY GAMMA",x:36,y:68},{id:"relay4",label:"RELAY DELTA",x:64,y:68},{id:"ext1",label:"PUPPET MASTER",x:12,y:50},{id:"ext2",label:"LAUGHING MAN",x:88,y:50},{id:"tachi",label:"TACHIKOMA U9",x:50,y:12}],t=[{id:"e01",from:"sec9",to:"relay1"},{id:"e02",from:"sec9",to:"relay2"},{id:"e03",from:"sec9",to:"relay3"},{id:"e04",from:"sec9",to:"relay4"},{id:"e05",from:"relay1",to:"niihama"},{id:"e06",from:"relay2",to:"togusa"},{id:"e07",from:"relay3",to:"ishikawa"},{id:"e08",from:"relay4",to:"batou"},{id:"e09",from:"niihama",to:"ext1"},{id:"e10",from:"ext1",to:"relay3"},{id:"e11",from:"togusa",to:"relay1"},{id:"e12",from:"batou",to:"relay2"},{id:"e13",from:"ext2",to:"relay2"},{id:"e14",from:"ext2",to:"relay4"},{id:"e15",from:"sec9",to:"tachi"},{id:"e16",from:"relay1",to:"relay2"},{id:"e17",from:"relay3",to:"relay4"}],r={relay2:72,relay4:88,ext1:95,ext2:80,niihama:45,batou:55};v_(i,{nodes:e,edges:t});for(const[o,c]of Object.entries(r)){const l=i.querySelector(`[data-node-id="${o}"]`);l&&(c>=70?l.classList.add("s9-matrix__node--threat-high"):c>=40&&l.classList.add("s9-matrix__node--threat-mid"))}vn(i,"ext1");const a=t.map(o=>o.id),n=new Set;function s(){if(n.size>0){const d=[...n],h=d[Math.floor(Math.random()*d.length)];hu(i,h),n.delete(h)}const o=[null,null,"var(--neon-amber)","var(--neon-magenta)","var(--neon-green)",null],c=a.filter(d=>!n.has(d)),l=Math.random()<.4?2:1;for(let d=0;d<l&&c.length>0;d++){const h=c.splice(Math.floor(Math.random()*c.length),1)[0],p=o[Math.floor(Math.random()*o.length)];Eo(i,h,p),n.add(h)}if(Math.random()<.35){const d=e[Math.floor(Math.random()*e.length)];M_(i,d.id)}const u=document.getElementById("flow-overlay");if(u){const d=Object.values(r).filter(g=>g>=70).length,h=Object.values(r).filter(g=>g>=40&&g<70).length,p=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";u.innerHTML=`<span style="font-family:var(--font-terminal);font-size: 0.7rem;color:${p};opacity:0.7">NODES: ${e.length} &nbsp; <span style="color:var(--text-alert)">CRIT: ${d}</span> &nbsp; <span style="color:var(--neon-amber)">WARN: ${h}</span></span>`}}for(let o=0;o<4;o++){const c=a[Math.floor(Math.random()*a.length)];n.has(c)||(Eo(i,c),n.add(c))}setInterval(s,700),s(),document.getElementById("matrix-status").textContent="● LIVE"}(function(){const i=document.getElementById("ts-grain-turb");if(!i)return;let e=0,t=2;function r(){e++;const a=2+(e%3===0?1:0)+(e%7===0?1:0);if(e%a===0){let n;do n=Math.random()*999+1|0;while(n===t);t=n,i.setAttribute("seed",n)}requestAnimationFrame(r)}requestAnimationFrame(r)})();
