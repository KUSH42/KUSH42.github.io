(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();/**
* @license
* Copyright 2010-2026 Three.js Authors
* SPDX-License-Identifier: MIT
*/const Lo="183",Hi={ROTATE:0,DOLLY:1,PAN:2},Bi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Hu=0,il=1,ku=2,oa=1,Gu=2,pn=3,lr=0,Ut=1,nr=2,gr=0,ci=1,Pt=2,nl=3,al=4,Vu=5,ai=100,Wu=101,Xu=102,ju=103,Yu=104,qu=200,$u=201,Ku=202,Zu=203,Ps=204,Ls=205,Ju=206,Qu=207,eh=208,th=209,rh=210,ih=211,nh=212,ah=213,sh=214,Ds=0,ba=1,Is=2,Vi=3,Us=4,Ns=5,Os=6,Fs=7,Cc=0,oh=1,lh=2,_r=0,Rc=1,Pc=2,Lc=3,Dc=4,Ic=5,Uc=6,Nc=7,Oc=300,ui=301,Wi=302,za=303,Ha=304,Da=306,Bs=1e3,Pr=1001,zs=1002,Ct=1003,ch=1004,In=1005,Rt=1006,ka=1007,oi=1008,uh=1008,Zt=1009,Fc=1010,Bc=1011,Mn=1012,Do=1013,Mr=1014,sr=1015,qt=1016,Io=1017,Uo=1018,xn=1020,zc=35902,Hc=35899,kc=1021,Gc=1022,or=1023,Ur=1026,li=1027,No=1028,Oo=1029,Xi=1030,Fo=1031,Bo=1033,la=33776,ca=33777,ua=33778,ha=33779,Hs=35840,ks=35841,Gs=35842,Vs=35843,Ws=36196,Xs=37492,js=37496,Ys=37488,qs=37489,$s=37490,Ks=37491,Zs=37808,Js=37809,Qs=37810,eo=37811,to=37812,ro=37813,io=37814,no=37815,ao=37816,so=37817,oo=37818,lo=37819,co=37820,uo=37821,ho=36492,po=36494,fo=36495,mo=36283,go=36284,_o=36285,vo=36286,hh=3200,dh=0,ph=1,Xr="",Ht="srgb",ji="srgb-linear",Ea="linear",Ze="srgb",Mi=7680,sl=519,fh=512,mh=513,gh=514,zo=515,_h=516,vh=517,Ho=518,Mh=519,ol=35044,Qi=35048,ll="300 es",fr=2e3,Ta=2001;function xh(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Sn(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Sh(){const r=Sn("canvas");return r.style.display="block",r}const cl={};function ul(...r){const e="THREE."+r.shift();console.log(e,...r)}function Vc(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Ue(...r){r=Vc(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function Xe(...r){r=Vc(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function wa(...r){const e=r.join(" ");e in cl||(cl[e]=!0,Ue(...r))}function yh(r,e,t){return new Promise(function(i,n){function a(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:n();break;case r.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}const bh={[Ds]:ba,[Is]:Os,[Us]:Fs,[Vi]:Ns,[ba]:Ds,[Os]:Is,[Fs]:Us,[Ns]:Vi};class fi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const n=i[e];if(n!==void 0){const a=n.indexOf(t);a!==-1&&n.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const n=i.slice(0);for(let a=0,s=n.length;a<s;a++)n[a].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],da=Math.PI/180,Mo=180/Math.PI;function An(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Lt[r&255]+Lt[r>>8&255]+Lt[r>>16&255]+Lt[r>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]).toLowerCase()}function ke(r,e,t){return Math.max(e,Math.min(t,r))}function Eh(r,e){return(r%e+e)%e}function Ga(r,e,t){return(1-t)*r+t*e}function en(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Ft(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Th={DEG2RAD:da};let De=class Wc{constructor(e=0,t=0){Wc.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),n=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*i-s*n+e.x,this.y=a*n+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};class qr{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,a,s,o){let l=i[n+0],c=i[n+1],u=i[n+2],h=i[n+3],d=a[s+0],p=a[s+1],g=a[s+2],x=a[s+3];if(h!==x||l!==d||c!==p||u!==g){let m=l*d+c*p+u*g+h*x;m<0&&(d=-d,p=-p,g=-g,x=-x,m=-m);let f=1-o;if(m<.9995){const S=Math.acos(m),E=Math.sin(S);f=Math.sin(f*S)/E,o=Math.sin(o*S)/E,l=l*f+d*o,c=c*f+p*o,u=u*f+g*o,h=h*f+x*o}else{l=l*f+d*o,c=c*f+p*o,u=u*f+g*o,h=h*f+x*o;const S=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=S,c*=S,u*=S,h*=S}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,n,a,s){const o=i[n],l=i[n+1],c=i[n+2],u=i[n+3],h=a[s],d=a[s+1],p=a[s+2],g=a[s+3];return e[t]=o*g+u*h+l*p-c*d,e[t+1]=l*g+u*d+c*h-o*p,e[t+2]=c*g+u*p+o*d-l*h,e[t+3]=u*g-o*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,n=e._y,a=e._z,s=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(n/2),h=o(a/2),d=l(i/2),p=l(n/2),g=l(a/2);switch(s){case"XYZ":this._x=d*u*h+c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h-d*p*g;break;case"YXZ":this._x=d*u*h+c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h+d*p*g;break;case"ZXY":this._x=d*u*h-c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h-d*p*g;break;case"ZYX":this._x=d*u*h-c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h+d*p*g;break;case"YZX":this._x=d*u*h+c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h-d*p*g;break;case"XZY":this._x=d*u*h-c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h+d*p*g;break;default:Ue("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],n=t[4],a=t[8],s=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=i+o+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(a-c)*p,this._z=(s-n)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(n+s)/p,this._z=(a+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(a-c)/p,this._x=(n+s)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(s-n)/p,this._x=(a+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ke(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,n=e._y,a=e._z,s=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+s*o+n*c-a*l,this._y=n*u+s*l+a*o-i*c,this._z=a*u+s*c+i*l-n*o,this._w=s*u-i*o-n*l-a*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,n=e._y,a=e._z,s=e._w,o=this.dot(e);o<0&&(i=-i,n=-n,a=-a,s=-s,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+a*t,this._w=this._w*l+s*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+n*t,this._z=this._z*l+a*t,this._w=this._w*l+s*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,i=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(hl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(hl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,n=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*n,this.y=a[1]*t+a[4]*i+a[7]*n,this.z=a[2]*t+a[5]*i+a[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,a=e.elements,s=1/(a[3]*t+a[7]*i+a[11]*n+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*n+a[12])*s,this.y=(a[1]*t+a[5]*i+a[9]*n+a[13])*s,this.z=(a[2]*t+a[6]*i+a[10]*n+a[14])*s,this}applyQuaternion(e){const t=this.x,i=this.y,n=this.z,a=e.x,s=e.y,o=e.z,l=e.w,c=2*(s*n-o*i),u=2*(o*t-a*n),h=2*(a*i-s*t);return this.x=t+l*c+s*h-o*u,this.y=i+l*u+o*c-a*h,this.z=n+l*h+a*u-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,n=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n,this.y=a[1]*t+a[5]*i+a[9]*n,this.z=a[2]*t+a[6]*i+a[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,n=e.y,a=e.z,s=t.x,o=t.y,l=t.z;return this.x=n*l-a*o,this.y=a*s-i*l,this.z=i*o-n*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Va.copy(this).projectOnVector(e),this.sub(Va)}reflect(e){return this.sub(Va.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ke(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Va=new P,hl=new qr;let He=class Xc{constructor(e,t,i,n,a,s,o,l,c){Xc.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,a,s,o,l,c)}set(e,t,i,n,a,s,o,l,c){const u=this.elements;return u[0]=e,u[1]=n,u[2]=o,u[3]=t,u[4]=a,u[5]=l,u[6]=i,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,a=this.elements,s=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],p=i[5],g=i[8],x=n[0],m=n[3],f=n[6],S=n[1],E=n[4],y=n[7],A=n[2],w=n[5],D=n[8];return a[0]=s*x+o*S+l*A,a[3]=s*m+o*E+l*w,a[6]=s*f+o*y+l*D,a[1]=c*x+u*S+h*A,a[4]=c*m+u*E+h*w,a[7]=c*f+u*y+h*D,a[2]=d*x+p*S+g*A,a[5]=d*m+p*E+g*w,a[8]=d*f+p*y+g*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],n=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*s*u-t*o*c-i*a*u+i*o*l+n*a*c-n*s*l}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*s-o*c,d=o*l-u*a,p=c*a-s*l,g=t*h+i*d+n*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=h*x,e[1]=(n*c-u*i)*x,e[2]=(o*i-n*s)*x,e[3]=d*x,e[4]=(u*t-n*l)*x,e[5]=(n*a-o*t)*x,e[6]=p*x,e[7]=(i*l-c*t)*x,e[8]=(s*t-i*a)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,a,s,o){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*s+c*o)+s+e,-n*c,n*l,-n*(-c*s+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Wa.makeScale(e,t)),this}rotate(e){return this.premultiply(Wa.makeRotation(-e)),this}translate(e,t){return this.premultiply(Wa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};const Wa=new He,dl=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pl=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wh(){const r={enabled:!0,workingColorSpace:ji,spaces:{},convert:function(n,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===Ze&&(n.r=Ir(n.r),n.g=Ir(n.g),n.b=Ir(n.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(n.applyMatrix3(this.spaces[a].toXYZ),n.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===Ze&&(n.r=ki(n.r),n.g=ki(n.g),n.b=ki(n.b))),n},workingToColorSpace:function(n,a){return this.convert(n,this.workingColorSpace,a)},colorSpaceToWorking:function(n,a){return this.convert(n,a,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Xr?Ea:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,a=this.workingColorSpace){return n.fromArray(this.spaces[a].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,a,s){return n.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,a){return wa("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(n,a)},toWorkingColorSpace:function(n,a){return wa("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(n,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return r.define({[ji]:{primaries:e,whitePoint:i,transfer:Ea,toXYZ:dl,fromXYZ:pl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ht},outputColorSpaceConfig:{drawingBufferColorSpace:Ht}},[Ht]:{primaries:e,whitePoint:i,transfer:Ze,toXYZ:dl,fromXYZ:pl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ht}}}),r}const je=wh();function Ir(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ki(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let xi;class Ah{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{xi===void 0&&(xi=Sn("canvas")),xi.width=e.width,xi.height=e.height;const n=xi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),i=xi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Sn("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const n=i.getImageData(0,0,e.width,e.height),a=n.data;for(let s=0;s<a.length;s++)a[s]=Ir(a[s]/255)*255;return i.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ir(t[i]/255)*255):t[i]=Ir(t[i]);return{data:t,width:e.width,height:e.height}}else return Ue("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ch=0,ko=class{constructor(r=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=An(),this.data=r,this.dataReady=!0,this.version=0}getSize(r){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?r.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?r.set(e.displayHeight,e.displayWidth,0):e!==null?r.set(e.width,e.height,e.depth||0):r.set(0,0,0),r}set needsUpdate(r){r===!0&&this.version++}toJSON(r){const e=r===void 0||typeof r=="string";if(!e&&r.images[this.uuid]!==void 0)return r.images[this.uuid];const t={uuid:this.uuid,url:""},i=this.data;if(i!==null){let n;if(Array.isArray(i)){n=[];for(let a=0,s=i.length;a<s;a++)i[a].isDataTexture?n.push(Xa(i[a].image)):n.push(Xa(i[a]))}else n=Xa(i);t.url=n}return e||(r.images[this.uuid]=t),t}};function Xa(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ah.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Ue("Texture: Unable to serialize Texture."),{})}let Rh=0;const ja=new P;let $t=class pa extends fi{constructor(e=pa.DEFAULT_IMAGE,t=pa.DEFAULT_MAPPING,i=Pr,n=Pr,a=Rt,s=oi,o=or,l=Zt,c=pa.DEFAULT_ANISOTROPY,u=Xr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=An(),this.name="",this.source=new ko(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=a,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ja).x}get height(){return this.source.getSize(ja).y}get depth(){return this.source.getSize(ja).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ue(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){Ue(`Texture.setValues(): property '${t}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Oc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bs:e.x=e.x-Math.floor(e.x);break;case Pr:e.x=e.x<0?0:1;break;case zs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bs:e.y=e.y-Math.floor(e.y);break;case Pr:e.y=e.y<0?0:1;break;case zs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};$t.DEFAULT_IMAGE=null;$t.DEFAULT_MAPPING=Oc;$t.DEFAULT_ANISOTROPY=1;class ft{constructor(e=0,t=0,i=0,n=1){ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,n=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*n+s[12]*a,this.y=s[1]*t+s[5]*i+s[9]*n+s[13]*a,this.z=s[2]*t+s[6]*i+s[10]*n+s[14]*a,this.w=s[3]*t+s[7]*i+s[11]*n+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,a;const s=e.elements,o=s[0],l=s[4],c=s[8],u=s[1],h=s[5],d=s[9],p=s[2],g=s[6],x=s[10];if(Math.abs(l-u)<.01&&Math.abs(c-p)<.01&&Math.abs(d-g)<.01){if(Math.abs(l+u)<.1&&Math.abs(c+p)<.1&&Math.abs(d+g)<.1&&Math.abs(o+h+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const f=(o+1)/2,S=(h+1)/2,E=(x+1)/2,y=(l+u)/4,A=(c+p)/4,w=(d+g)/4;return f>S&&f>E?f<.01?(i=0,n=.707106781,a=.707106781):(i=Math.sqrt(f),n=y/i,a=A/i):S>E?S<.01?(i=.707106781,n=0,a=.707106781):(n=Math.sqrt(S),i=y/n,a=w/n):E<.01?(i=.707106781,n=.707106781,a=0):(a=Math.sqrt(E),i=A/a,n=w/a),this.set(i,n,a,t),this}let m=Math.sqrt((g-d)*(g-d)+(c-p)*(c-p)+(u-l)*(u-l));return Math.abs(m)<.001&&(m=1),this.x=(g-d)/m,this.y=(c-p)/m,this.z=(u-l)/m,this.w=Math.acos((o+h+x-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this.w=ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this.w=ke(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ke(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ph extends fi{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t),this.textures=[];const n={width:e,height:t,depth:i.depth},a=new $t(n),s=i.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Rt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,a=this.textures.length;n<a;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const n=Object.assign({},e.textures[t].image);this.textures[t].source=new ko(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Gt=class extends Ph{constructor(r=1,e=1,t={}){super(r,e,t),this.isWebGLRenderTarget=!0}},jc=class extends $t{constructor(r=null,e=1,t=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:r,width:e,height:t,depth:i},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Pr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(r){this.layerUpdates.add(r)}clearLayerUpdates(){this.layerUpdates.clear()}};class Lh extends $t{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Pr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class st{constructor(e,t,i,n,a,s,o,l,c,u,h,d,p,g,x,m){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,a,s,o,l,c,u,h,d,p,g,x,m)}set(e,t,i,n,a,s,o,l,c,u,h,d,p,g,x,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=n,f[1]=a,f[5]=s,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,n=1/Si.setFromMatrixColumn(e,0).length(),a=1/Si.setFromMatrixColumn(e,1).length(),s=1/Si.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,n=e.y,a=e.z,s=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),u=Math.cos(a),h=Math.sin(a);if(e.order==="XYZ"){const d=s*u,p=s*h,g=o*u,x=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+g*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=g+p*c,t[10]=s*l}else if(e.order==="YXZ"){const d=l*u,p=l*h,g=c*u,x=c*h;t[0]=d+x*o,t[4]=g*o-p,t[8]=s*c,t[1]=s*h,t[5]=s*u,t[9]=-o,t[2]=p*o-g,t[6]=x+d*o,t[10]=s*l}else if(e.order==="ZXY"){const d=l*u,p=l*h,g=c*u,x=c*h;t[0]=d-x*o,t[4]=-s*h,t[8]=g+p*o,t[1]=p+g*o,t[5]=s*u,t[9]=x-d*o,t[2]=-s*c,t[6]=o,t[10]=s*l}else if(e.order==="ZYX"){const d=s*u,p=s*h,g=o*u,x=o*h;t[0]=l*u,t[4]=g*c-p,t[8]=d*c+x,t[1]=l*h,t[5]=x*c+d,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=s*l}else if(e.order==="YZX"){const d=s*l,p=s*c,g=o*l,x=o*c;t[0]=l*u,t[4]=x-d*h,t[8]=g*h+p,t[1]=h,t[5]=s*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*h+g,t[10]=d-x*h}else if(e.order==="XZY"){const d=s*l,p=s*c,g=o*l,x=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+x,t[5]=s*u,t[9]=p*h-g,t[2]=g*h-p,t[6]=o*u,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dh,e,Ih)}lookAt(e,t,i){const n=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Fr.crossVectors(i,Xt),Fr.lengthSq()===0&&(Math.abs(i.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Fr.crossVectors(i,Xt)),Fr.normalize(),Un.crossVectors(Xt,Fr),n[0]=Fr.x,n[4]=Un.x,n[8]=Xt.x,n[1]=Fr.y,n[5]=Un.y,n[9]=Xt.y,n[2]=Fr.z,n[6]=Un.z,n[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,n=t.elements,a=this.elements,s=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],p=i[13],g=i[2],x=i[6],m=i[10],f=i[14],S=i[3],E=i[7],y=i[11],A=i[15],w=n[0],D=n[4],v=n[8],T=n[12],W=n[1],C=n[5],O=n[9],H=n[13],V=n[2],k=n[6],z=n[10],F=n[14],Q=n[3],K=n[7],le=n[11],de=n[15];return a[0]=s*w+o*W+l*V+c*Q,a[4]=s*D+o*C+l*k+c*K,a[8]=s*v+o*O+l*z+c*le,a[12]=s*T+o*H+l*F+c*de,a[1]=u*w+h*W+d*V+p*Q,a[5]=u*D+h*C+d*k+p*K,a[9]=u*v+h*O+d*z+p*le,a[13]=u*T+h*H+d*F+p*de,a[2]=g*w+x*W+m*V+f*Q,a[6]=g*D+x*C+m*k+f*K,a[10]=g*v+x*O+m*z+f*le,a[14]=g*T+x*H+m*F+f*de,a[3]=S*w+E*W+y*V+A*Q,a[7]=S*D+E*C+y*k+A*K,a[11]=S*v+E*O+y*z+A*le,a[15]=S*T+E*H+y*F+A*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],n=e[8],a=e[12],s=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],p=e[14],g=e[3],x=e[7],m=e[11],f=e[15],S=l*p-c*d,E=o*p-c*h,y=o*d-l*h,A=s*p-c*u,w=s*d-l*u,D=s*h-o*u;return t*(x*S-m*E+f*y)-i*(g*S-m*A+f*w)+n*(g*E-x*A+f*D)-a*(g*y-x*w+m*D)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],n=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],p=e[11],g=e[12],x=e[13],m=e[14],f=e[15],S=t*o-i*s,E=t*l-n*s,y=t*c-a*s,A=i*l-n*o,w=i*c-a*o,D=n*c-a*l,v=u*x-h*g,T=u*m-d*g,W=u*f-p*g,C=h*m-d*x,O=h*f-p*x,H=d*f-p*m,V=S*H-E*O+y*C+A*W-w*T+D*v;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/V;return e[0]=(o*H-l*O+c*C)*k,e[1]=(n*O-i*H-a*C)*k,e[2]=(x*D-m*w+f*A)*k,e[3]=(d*w-h*D-p*A)*k,e[4]=(l*W-s*H-c*T)*k,e[5]=(t*H-n*W+a*T)*k,e[6]=(m*y-g*D-f*E)*k,e[7]=(u*D-d*y+p*E)*k,e[8]=(s*O-o*W+c*v)*k,e[9]=(i*W-t*O-a*v)*k,e[10]=(g*w-x*y+f*S)*k,e[11]=(h*y-u*w-p*S)*k,e[12]=(o*T-s*C-l*v)*k,e[13]=(t*C-i*T+n*v)*k,e[14]=(x*E-g*A-m*S)*k,e[15]=(u*A-h*E+d*S)*k,this}scale(e){const t=this.elements,i=e.x,n=e.y,a=e.z;return t[0]*=i,t[4]*=n,t[8]*=a,t[1]*=i,t[5]*=n,t[9]*=a,t[2]*=i,t[6]*=n,t[10]*=a,t[3]*=i,t[7]*=n,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),n=Math.sin(t),a=1-i,s=e.x,o=e.y,l=e.z,c=a*s,u=a*o;return this.set(c*s+i,c*o-n*l,c*l+n*o,0,c*o+n*l,u*o+i,u*l-n*s,0,c*l-n*o,u*l+n*s,a*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,a,s){return this.set(1,i,a,0,e,1,s,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){const n=this.elements,a=t._x,s=t._y,o=t._z,l=t._w,c=a+a,u=s+s,h=o+o,d=a*c,p=a*u,g=a*h,x=s*u,m=s*h,f=o*h,S=l*c,E=l*u,y=l*h,A=i.x,w=i.y,D=i.z;return n[0]=(1-(x+f))*A,n[1]=(p+y)*A,n[2]=(g-E)*A,n[3]=0,n[4]=(p-y)*w,n[5]=(1-(d+f))*w,n[6]=(m+S)*w,n[7]=0,n[8]=(g+E)*D,n[9]=(m-S)*D,n[10]=(1-(d+x))*D,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){const n=this.elements;e.x=n[12],e.y=n[13],e.z=n[14];const a=this.determinant();if(a===0)return i.set(1,1,1),t.identity(),this;let s=Si.set(n[0],n[1],n[2]).length();const o=Si.set(n[4],n[5],n[6]).length(),l=Si.set(n[8],n[9],n[10]).length();a<0&&(s=-s),tr.copy(this);const c=1/s,u=1/o,h=1/l;return tr.elements[0]*=c,tr.elements[1]*=c,tr.elements[2]*=c,tr.elements[4]*=u,tr.elements[5]*=u,tr.elements[6]*=u,tr.elements[8]*=h,tr.elements[9]*=h,tr.elements[10]*=h,t.setFromRotationMatrix(tr),i.x=s,i.y=o,i.z=l,this}makePerspective(e,t,i,n,a,s,o=fr,l=!1){const c=this.elements,u=2*a/(t-e),h=2*a/(i-n),d=(t+e)/(t-e),p=(i+n)/(i-n);let g,x;if(l)g=a/(s-a),x=s*a/(s-a);else if(o===fr)g=-(s+a)/(s-a),x=-2*s*a/(s-a);else if(o===Ta)g=-s/(s-a),x=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,a,s,o=fr,l=!1){const c=this.elements,u=2/(t-e),h=2/(i-n),d=-(t+e)/(t-e),p=-(i+n)/(i-n);let g,x;if(l)g=1/(s-a),x=s/(s-a);else if(o===fr)g=-2/(s-a),x=-(s+a)/(s-a);else if(o===Ta)g=-1/(s-a),x=-a/(s-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Si=new P,tr=new st,Dh=new P(0,0,0),Ih=new P(1,1,1),Fr=new P,Un=new P,Xt=new P,fl=new st,ml=new qr;let hi=class Yc{constructor(e=0,t=0,i=0,n=Yc.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const n=e.elements,a=n[0],s=n[4],o=n[8],l=n[1],c=n[5],u=n[9],h=n[2],d=n[6],p=n[10];switch(t){case"XYZ":this._y=Math.asin(ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin(ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-ke(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ke(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ue("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return fl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ml.setFromEuler(this),this.setFromQuaternion(ml,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};hi.DEFAULT_ORDER="XYZ";let Go=class{constructor(){this.mask=1}set(r){this.mask=(1<<r|0)>>>0}enable(r){this.mask|=1<<r|0}enableAll(){this.mask=-1}toggle(r){this.mask^=1<<r|0}disable(r){this.mask&=~(1<<r|0)}disableAll(){this.mask=0}test(r){return(this.mask&r.mask)!==0}isEnabled(r){return(this.mask&(1<<r|0))!==0}},Uh=0;const gl=new P,yi=new qr,br=new st,Nn=new P,tn=new P,Nh=new P,Oh=new qr,_l=new P(1,0,0),vl=new P(0,1,0),Ml=new P(0,0,1),xl={type:"added"},Fh={type:"removed"},bi={type:"childadded",child:null},Ya={type:"childremoved",child:null};let Qt=class fa extends fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=An(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=fa.DEFAULT_UP.clone();const e=new P,t=new hi,i=new qr,n=new P(1,1,1);function a(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new st},normalMatrix:{value:new He}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=fa.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=fa.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Go,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.multiply(yi),this}rotateOnWorldAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.premultiply(yi),this}rotateX(e){return this.rotateOnAxis(_l,e)}rotateY(e){return this.rotateOnAxis(vl,e)}rotateZ(e){return this.rotateOnAxis(Ml,e)}translateOnAxis(e,t){return gl.copy(e).applyQuaternion(this.quaternion),this.position.add(gl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_l,e)}translateY(e){return this.translateOnAxis(vl,e)}translateZ(e){return this.translateOnAxis(Ml,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(br.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Nn.copy(e):Nn.set(e,t,i);const n=this.parent;this.updateWorldMatrix(!0,!1),tn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?br.lookAt(tn,Nn,this.up):br.lookAt(Nn,tn,this.up),this.quaternion.setFromRotationMatrix(br),n&&(br.extractRotation(n.matrixWorld),yi.setFromRotationMatrix(br),this.quaternion.premultiply(yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Xe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xl),bi.child=e,this.dispatchEvent(bi),bi.child=null):Xe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Fh),Ya.child=e,this.dispatchEvent(Ya),Ya.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),br.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),br.multiply(e.parent.matrixWorld)),e.applyMatrix4(br),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xl),bi.child=e,this.dispatchEvent(bi),bi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const n=this.children;for(let a=0,s=n.length;a<s;a++)n[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tn,e,Nh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tn,Oh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,n=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*n,a[13]+=i-a[1]*t-a[5]*i-a[9]*n,a[14]+=n-a[2]*t-a[6]*i-a[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const n=this.children;for(let a=0,s=n.length;a<s;a++)n[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),this.static!==!1&&(n.static=this.static),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(e),n.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];a(e.shapes,h)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));n.material=o}else n.material=a(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(a(e.animations,l))}}if(t){const o=s(e.geometries),l=s(e.materials),c=s(e.textures),u=s(e.images),h=s(e.shapes),d=s(e.skeletons),p=s(e.animations),g=s(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=n,i;function s(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const n=e.children[i];this.add(n.clone())}return this}};Qt.DEFAULT_UP=new P(0,1,0);Qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class zi extends Qt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Bh={type:"move"};class qa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,a=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&a!==null&&(n=a),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bh)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new zi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const qc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Br={h:0,s:0,l:0},On={h:0,s:0,l:0};function $a(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let Ee=class{constructor(r,e,t){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(r,e,t)}set(r,e,t){if(e===void 0&&t===void 0){const i=r;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(r,e,t);return this}setScalar(r){return this.r=r,this.g=r,this.b=r,this}setHex(r,e=Ht){return r=Math.floor(r),this.r=(r>>16&255)/255,this.g=(r>>8&255)/255,this.b=(r&255)/255,je.colorSpaceToWorking(this,e),this}setRGB(r,e,t,i=je.workingColorSpace){return this.r=r,this.g=e,this.b=t,je.colorSpaceToWorking(this,i),this}setHSL(r,e,t,i=je.workingColorSpace){if(r=Eh(r,1),e=ke(e,0,1),t=ke(t,0,1),e===0)this.r=this.g=this.b=t;else{const n=t<=.5?t*(1+e):t+e-t*e,a=2*t-n;this.r=$a(a,n,r+1/3),this.g=$a(a,n,r),this.b=$a(a,n,r-1/3)}return je.colorSpaceToWorking(this,i),this}setStyle(r,e=Ht){function t(n){n!==void 0&&parseFloat(n)<1&&Ue("Color: Alpha component of "+r+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(r)){let n;const a=i[1],s=i[2];switch(a){case"rgb":case"rgba":if(n=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return t(n[4]),this.setRGB(Math.min(255,parseInt(n[1],10))/255,Math.min(255,parseInt(n[2],10))/255,Math.min(255,parseInt(n[3],10))/255,e);if(n=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return t(n[4]),this.setRGB(Math.min(100,parseInt(n[1],10))/100,Math.min(100,parseInt(n[2],10))/100,Math.min(100,parseInt(n[3],10))/100,e);break;case"hsl":case"hsla":if(n=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return t(n[4]),this.setHSL(parseFloat(n[1])/360,parseFloat(n[2])/100,parseFloat(n[3])/100,e);break;default:Ue("Color: Unknown color model "+r)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(r)){const n=i[1],a=n.length;if(a===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(n,16),e);Ue("Color: Invalid hex color "+r)}else if(r&&r.length>0)return this.setColorName(r,e);return this}setColorName(r,e=Ht){const t=qc[r.toLowerCase()];return t!==void 0?this.setHex(t,e):Ue("Color: Unknown color "+r),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(r){return this.r=r.r,this.g=r.g,this.b=r.b,this}copySRGBToLinear(r){return this.r=Ir(r.r),this.g=Ir(r.g),this.b=Ir(r.b),this}copyLinearToSRGB(r){return this.r=ki(r.r),this.g=ki(r.g),this.b=ki(r.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(r=Ht){return je.workingToColorSpace(Dt.copy(this),r),Math.round(ke(Dt.r*255,0,255))*65536+Math.round(ke(Dt.g*255,0,255))*256+Math.round(ke(Dt.b*255,0,255))}getHexString(r=Ht){return("000000"+this.getHex(r).toString(16)).slice(-6)}getHSL(r,e=je.workingColorSpace){je.workingToColorSpace(Dt.copy(this),e);const t=Dt.r,i=Dt.g,n=Dt.b,a=Math.max(t,i,n),s=Math.min(t,i,n);let o,l;const c=(s+a)/2;if(s===a)o=0,l=0;else{const u=a-s;switch(l=c<=.5?u/(a+s):u/(2-a-s),a){case t:o=(i-n)/u+(i<n?6:0);break;case i:o=(n-t)/u+2;break;case n:o=(t-i)/u+4;break}o/=6}return r.h=o,r.s=l,r.l=c,r}getRGB(r,e=je.workingColorSpace){return je.workingToColorSpace(Dt.copy(this),e),r.r=Dt.r,r.g=Dt.g,r.b=Dt.b,r}getStyle(r=Ht){je.workingToColorSpace(Dt.copy(this),r);const e=Dt.r,t=Dt.g,i=Dt.b;return r!==Ht?`color(${r} ${e.toFixed(3)} ${t.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(t*255)},${Math.round(i*255)})`}offsetHSL(r,e,t){return this.getHSL(Br),this.setHSL(Br.h+r,Br.s+e,Br.l+t)}add(r){return this.r+=r.r,this.g+=r.g,this.b+=r.b,this}addColors(r,e){return this.r=r.r+e.r,this.g=r.g+e.g,this.b=r.b+e.b,this}addScalar(r){return this.r+=r,this.g+=r,this.b+=r,this}sub(r){return this.r=Math.max(0,this.r-r.r),this.g=Math.max(0,this.g-r.g),this.b=Math.max(0,this.b-r.b),this}multiply(r){return this.r*=r.r,this.g*=r.g,this.b*=r.b,this}multiplyScalar(r){return this.r*=r,this.g*=r,this.b*=r,this}lerp(r,e){return this.r+=(r.r-this.r)*e,this.g+=(r.g-this.g)*e,this.b+=(r.b-this.b)*e,this}lerpColors(r,e,t){return this.r=r.r+(e.r-r.r)*t,this.g=r.g+(e.g-r.g)*t,this.b=r.b+(e.b-r.b)*t,this}lerpHSL(r,e){this.getHSL(Br),r.getHSL(On);const t=Ga(Br.h,On.h,e),i=Ga(Br.s,On.s,e),n=Ga(Br.l,On.l,e);return this.setHSL(t,i,n),this}setFromVector3(r){return this.r=r.x,this.g=r.y,this.b=r.z,this}applyMatrix3(r){const e=this.r,t=this.g,i=this.b,n=r.elements;return this.r=n[0]*e+n[3]*t+n[6]*i,this.g=n[1]*e+n[4]*t+n[7]*i,this.b=n[2]*e+n[5]*t+n[8]*i,this}equals(r){return r.r===this.r&&r.g===this.g&&r.b===this.b}fromArray(r,e=0){return this.r=r[e],this.g=r[e+1],this.b=r[e+2],this}toArray(r=[],e=0){return r[e]=this.r,r[e+1]=this.g,r[e+2]=this.b,r}fromBufferAttribute(r,e){return this.r=r.getX(e),this.g=r.getY(e),this.b=r.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const Dt=new Ee;Ee.NAMES=qc;class Vo extends Qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hi,this.environmentIntensity=1,this.environmentRotation=new hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const rr=new P,Er=new P,Ka=new P,Tr=new P,Ei=new P,Ti=new P,Sl=new P,Za=new P,Ja=new P,Qa=new P,es=new ft,ts=new ft,rs=new ft;let rn=class Ni{constructor(e=new P,t=new P,i=new P){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),rr.subVectors(e,t),n.cross(rr);const a=n.lengthSq();return a>0?n.multiplyScalar(1/Math.sqrt(a)):n.set(0,0,0)}static getBarycoord(e,t,i,n,a){rr.subVectors(n,t),Er.subVectors(i,t),Ka.subVectors(e,t);const s=rr.dot(rr),o=rr.dot(Er),l=rr.dot(Ka),c=Er.dot(Er),u=Er.dot(Ka),h=s*c-o*o;if(h===0)return a.set(0,0,0),null;const d=1/h,p=(c*l-o*u)*d,g=(s*u-o*l)*d;return a.set(1-p-g,g,p)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,Tr)===null?!1:Tr.x>=0&&Tr.y>=0&&Tr.x+Tr.y<=1}static getInterpolation(e,t,i,n,a,s,o,l){return this.getBarycoord(e,t,i,n,Tr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Tr.x),l.addScaledVector(s,Tr.y),l.addScaledVector(o,Tr.z),l)}static getInterpolatedAttribute(e,t,i,n,a,s){return es.setScalar(0),ts.setScalar(0),rs.setScalar(0),es.fromBufferAttribute(e,t),ts.fromBufferAttribute(e,i),rs.fromBufferAttribute(e,n),s.setScalar(0),s.addScaledVector(es,a.x),s.addScaledVector(ts,a.y),s.addScaledVector(rs,a.z),s}static isFrontFacing(e,t,i,n){return rr.subVectors(i,t),Er.subVectors(e,t),rr.cross(Er).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rr.subVectors(this.c,this.b),Er.subVectors(this.a,this.b),rr.cross(Er).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ni.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ni.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,a){return Ni.getInterpolation(e,this.a,this.b,this.c,t,i,n,a)}containsPoint(e){return Ni.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ni.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,n=this.b,a=this.c;let s,o;Ei.subVectors(n,i),Ti.subVectors(a,i),Za.subVectors(e,i);const l=Ei.dot(Za),c=Ti.dot(Za);if(l<=0&&c<=0)return t.copy(i);Ja.subVectors(e,n);const u=Ei.dot(Ja),h=Ti.dot(Ja);if(u>=0&&h<=u)return t.copy(n);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return s=l/(l-u),t.copy(i).addScaledVector(Ei,s);Qa.subVectors(e,a);const p=Ei.dot(Qa),g=Ti.dot(Qa);if(g>=0&&p<=g)return t.copy(a);const x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Ti,o);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return Sl.subVectors(a,n),o=(h-u)/(h-u+(p-g)),t.copy(n).addScaledVector(Sl,o);const f=1/(m+x+d);return s=x*f,o=d*f,t.copy(i).addScaledVector(Ei,s).addScaledVector(Ti,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}};class mi{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ir.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ir.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ir.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,ir):ir.fromBufferAttribute(a,s),ir.applyMatrix4(e.matrixWorld),this.expandByPoint(ir);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fn.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Fn.copy(i.boundingBox)),Fn.applyMatrix4(e.matrixWorld),this.union(Fn)}const n=e.children;for(let a=0,s=n.length;a<s;a++)this.expandByObject(n[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ir),ir.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(nn),Bn.subVectors(this.max,nn),wi.subVectors(e.a,nn),Ai.subVectors(e.b,nn),Ci.subVectors(e.c,nn),zr.subVectors(Ai,wi),Hr.subVectors(Ci,Ai),Qr.subVectors(wi,Ci);let t=[0,-zr.z,zr.y,0,-Hr.z,Hr.y,0,-Qr.z,Qr.y,zr.z,0,-zr.x,Hr.z,0,-Hr.x,Qr.z,0,-Qr.x,-zr.y,zr.x,0,-Hr.y,Hr.x,0,-Qr.y,Qr.x,0];return!is(t,wi,Ai,Ci,Bn)||(t=[1,0,0,0,1,0,0,0,1],!is(t,wi,Ai,Ci,Bn))?!1:(zn.crossVectors(zr,Hr),t=[zn.x,zn.y,zn.z],is(t,wi,Ai,Ci,Bn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ir).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ir).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(wr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),wr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),wr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),wr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),wr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),wr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),wr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),wr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(wr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const wr=[new P,new P,new P,new P,new P,new P,new P,new P],ir=new P,Fn=new mi,wi=new P,Ai=new P,Ci=new P,zr=new P,Hr=new P,Qr=new P,nn=new P,Bn=new P,zn=new P,ei=new P;function is(r,e,t,i,n){for(let a=0,s=r.length-3;a<=s;a+=3){ei.fromArray(r,a);const o=n.x*Math.abs(ei.x)+n.y*Math.abs(ei.y)+n.z*Math.abs(ei.z),l=e.dot(ei),c=t.dot(ei),u=i.dot(ei);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Mt=new P,Hn=new De;let zh=0,Vt=class{constructor(r,e,t=!1){if(Array.isArray(r))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:zh++}),this.name="",this.array=r,this.itemSize=e,this.count=r!==void 0?r.length/e:0,this.normalized=t,this.usage=ol,this.updateRanges=[],this.gpuType=sr,this.version=0}onUploadCallback(){}set needsUpdate(r){r===!0&&this.version++}setUsage(r){return this.usage=r,this}addUpdateRange(r,e){this.updateRanges.push({start:r,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(r){return this.name=r.name,this.array=new r.array.constructor(r.array),this.itemSize=r.itemSize,this.count=r.count,this.normalized=r.normalized,this.usage=r.usage,this.gpuType=r.gpuType,this}copyAt(r,e,t){r*=this.itemSize,t*=e.itemSize;for(let i=0,n=this.itemSize;i<n;i++)this.array[r+i]=e.array[t+i];return this}copyArray(r){return this.array.set(r),this}applyMatrix3(r){if(this.itemSize===2)for(let e=0,t=this.count;e<t;e++)Hn.fromBufferAttribute(this,e),Hn.applyMatrix3(r),this.setXY(e,Hn.x,Hn.y);else if(this.itemSize===3)for(let e=0,t=this.count;e<t;e++)Mt.fromBufferAttribute(this,e),Mt.applyMatrix3(r),this.setXYZ(e,Mt.x,Mt.y,Mt.z);return this}applyMatrix4(r){for(let e=0,t=this.count;e<t;e++)Mt.fromBufferAttribute(this,e),Mt.applyMatrix4(r),this.setXYZ(e,Mt.x,Mt.y,Mt.z);return this}applyNormalMatrix(r){for(let e=0,t=this.count;e<t;e++)Mt.fromBufferAttribute(this,e),Mt.applyNormalMatrix(r),this.setXYZ(e,Mt.x,Mt.y,Mt.z);return this}transformDirection(r){for(let e=0,t=this.count;e<t;e++)Mt.fromBufferAttribute(this,e),Mt.transformDirection(r),this.setXYZ(e,Mt.x,Mt.y,Mt.z);return this}set(r,e=0){return this.array.set(r,e),this}getComponent(r,e){let t=this.array[r*this.itemSize+e];return this.normalized&&(t=en(t,this.array)),t}setComponent(r,e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[r*this.itemSize+e]=t,this}getX(r){let e=this.array[r*this.itemSize];return this.normalized&&(e=en(e,this.array)),e}setX(r,e){return this.normalized&&(e=Ft(e,this.array)),this.array[r*this.itemSize]=e,this}getY(r){let e=this.array[r*this.itemSize+1];return this.normalized&&(e=en(e,this.array)),e}setY(r,e){return this.normalized&&(e=Ft(e,this.array)),this.array[r*this.itemSize+1]=e,this}getZ(r){let e=this.array[r*this.itemSize+2];return this.normalized&&(e=en(e,this.array)),e}setZ(r,e){return this.normalized&&(e=Ft(e,this.array)),this.array[r*this.itemSize+2]=e,this}getW(r){let e=this.array[r*this.itemSize+3];return this.normalized&&(e=en(e,this.array)),e}setW(r,e){return this.normalized&&(e=Ft(e,this.array)),this.array[r*this.itemSize+3]=e,this}setXY(r,e,t){return r*=this.itemSize,this.normalized&&(e=Ft(e,this.array),t=Ft(t,this.array)),this.array[r+0]=e,this.array[r+1]=t,this}setXYZ(r,e,t,i){return r*=this.itemSize,this.normalized&&(e=Ft(e,this.array),t=Ft(t,this.array),i=Ft(i,this.array)),this.array[r+0]=e,this.array[r+1]=t,this.array[r+2]=i,this}setXYZW(r,e,t,i,n){return r*=this.itemSize,this.normalized&&(e=Ft(e,this.array),t=Ft(t,this.array),i=Ft(i,this.array),n=Ft(n,this.array)),this.array[r+0]=e,this.array[r+1]=t,this.array[r+2]=i,this.array[r+3]=n,this}onUpload(r){return this.onUploadCallback=r,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const r={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(r.name=this.name),this.usage!==ol&&(r.usage=this.usage),r}},$c=class extends Vt{constructor(r,e,t){super(new Uint16Array(r),e,t)}},Kc=class extends Vt{constructor(r,e,t){super(new Uint32Array(r),e,t)}},Nt=class extends Vt{constructor(r,e,t){super(new Float32Array(r),e,t)}};const Hh=new mi,an=new P,ns=new P;class Ki{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Hh.setFromPoints(e).getCenter(i);let n=0;for(let a=0,s=e.length;a<s;a++)n=Math.max(n,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;an.subVectors(e,this.center);const t=an.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.addScaledVector(an,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ns.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(an.copy(e.center).add(ns)),this.expandByPoint(an.copy(e.center).sub(ns))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let kh=0;const Kt=new st,as=new Qt,Ri=new P,jt=new mi,sn=new mi,Tt=new P;class ht extends fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=An(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(xh(e)?Kc:$c)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new He().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kt.makeRotationFromQuaternion(e),this.applyMatrix4(Kt),this}rotateX(e){return Kt.makeRotationX(e),this.applyMatrix4(Kt),this}rotateY(e){return Kt.makeRotationY(e),this.applyMatrix4(Kt),this}rotateZ(e){return Kt.makeRotationZ(e),this.applyMatrix4(Kt),this}translate(e,t,i){return Kt.makeTranslation(e,t,i),this.applyMatrix4(Kt),this}scale(e,t,i){return Kt.makeScale(e,t,i),this.applyMatrix4(Kt),this}lookAt(e){return as.lookAt(e),as.updateMatrix(),this.applyMatrix4(as.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let n=0,a=e.length;n<a;n++){const s=e[n];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Nt(i,3))}else{const i=Math.min(e.length,t.count);for(let n=0;n<i;n++){const a=e[n];t.setXYZ(n,a.x,a.y,a.z||0)}e.length>t.count&&Ue("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){const a=t[i];jt.setFromBufferAttribute(a),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const i=this.boundingSphere.center;if(jt.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const o=t[a];sn.setFromBufferAttribute(o),this.morphTargetsRelative?(Tt.addVectors(jt.min,sn.min),jt.expandByPoint(Tt),Tt.addVectors(jt.max,sn.max),jt.expandByPoint(Tt)):(jt.expandByPoint(sn.min),jt.expandByPoint(sn.max))}jt.getCenter(i);let n=0;for(let a=0,s=e.count;a<s;a++)Tt.fromBufferAttribute(e,a),n=Math.max(n,i.distanceToSquared(Tt));if(t)for(let a=0,s=t.length;a<s;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Tt.fromBufferAttribute(o,c),l&&(Ri.fromBufferAttribute(e,c),Tt.add(Ri)),n=Math.max(n,i.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,n=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vt(new Float32Array(4*i.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let v=0;v<i.count;v++)o[v]=new P,l[v]=new P;const c=new P,u=new P,h=new P,d=new De,p=new De,g=new De,x=new P,m=new P;function f(v,T,W){c.fromBufferAttribute(i,v),u.fromBufferAttribute(i,T),h.fromBufferAttribute(i,W),d.fromBufferAttribute(a,v),p.fromBufferAttribute(a,T),g.fromBufferAttribute(a,W),u.sub(c),h.sub(c),p.sub(d),g.sub(d);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(C),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(C),o[v].add(x),o[T].add(x),o[W].add(x),l[v].add(m),l[T].add(m),l[W].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let v=0,T=S.length;v<T;++v){const W=S[v],C=W.start,O=W.count;for(let H=C,V=C+O;H<V;H+=3)f(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const E=new P,y=new P,A=new P,w=new P;function D(v){A.fromBufferAttribute(n,v),w.copy(A);const T=o[v];E.copy(T),E.sub(A.multiplyScalar(A.dot(T))).normalize(),y.crossVectors(w,T);const W=y.dot(l[v])<0?-1:1;s.setXYZW(v,E.x,E.y,E.z,W)}for(let v=0,T=S.length;v<T;++v){const W=S[v],C=W.start,O=W.count;for(let H=C,V=C+O;H<V;H+=3)D(e.getX(H+0)),D(e.getX(H+1)),D(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Vt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const n=new P,a=new P,s=new P,o=new P,l=new P,c=new P,u=new P,h=new P;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);n.fromBufferAttribute(t,g),a.fromBufferAttribute(t,x),s.fromBufferAttribute(t,m),u.subVectors(s,a),h.subVectors(n,a),u.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)n.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),s.fromBufferAttribute(t,d+2),u.subVectors(s,a),h.subVectors(n,a),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let p=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*u;for(let f=0;f<u;f++)d[g++]=c[p++]}return new Vt(d,u,h)}if(this.index===null)return Ue("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ht,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=e(l,i);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],p=e(d,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(n[l]=u,a=!0)}a&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const n=e.attributes;for(const c in n){const u=n[c];this.setAttribute(c,u.clone(t))}const a=e.morphAttributes;for(const c in a){const u=[],h=a[c];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,u=s.length;c<u;c++){const h=s[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Gh=0;class Cn extends fi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=An(),this.name="",this.type="Material",this.blending=ci,this.side=lr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ps,this.blendDst=Ls,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ee(0,0,0),this.blendAlpha=0,this.depthFunc=Vi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Mi,this.stencilZFail=Mi,this.stencilZPass=Mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ue(`Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){Ue(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ci&&(i.blending=this.blending),this.side!==lr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ps&&(i.blendSrc=this.blendSrc),this.blendDst!==Ls&&(i.blendDst=this.blendDst),this.blendEquation!==ai&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Vi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Mi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Mi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Mi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(a){const s=[];for(const o in a){const l=a[o];delete l.metadata,s.push(l)}return s}if(t){const a=n(e.textures),s=n(e.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const n=t.length;i=new Array(n);for(let a=0;a!==n;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ar=new P,ss=new P,kn=new P,kr=new P,os=new P,Gn=new P,ls=new P;let Ia=class{constructor(r=new P,e=new P(0,0,-1)){this.origin=r,this.direction=e}set(r,e){return this.origin.copy(r),this.direction.copy(e),this}copy(r){return this.origin.copy(r.origin),this.direction.copy(r.direction),this}at(r,e){return e.copy(this.origin).addScaledVector(this.direction,r)}lookAt(r){return this.direction.copy(r).sub(this.origin).normalize(),this}recast(r){return this.origin.copy(this.at(r,Ar)),this}closestPointToPoint(r,e){e.subVectors(r,this.origin);const t=e.dot(this.direction);return t<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,t)}distanceToPoint(r){return Math.sqrt(this.distanceSqToPoint(r))}distanceSqToPoint(r){const e=Ar.subVectors(r,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(r):(Ar.copy(this.origin).addScaledVector(this.direction,e),Ar.distanceToSquared(r))}distanceSqToSegment(r,e,t,i){ss.copy(r).add(e).multiplyScalar(.5),kn.copy(e).sub(r).normalize(),kr.copy(this.origin).sub(ss);const n=r.distanceTo(e)*.5,a=-this.direction.dot(kn),s=kr.dot(this.direction),o=-kr.dot(kn),l=kr.lengthSq(),c=Math.abs(1-a*a);let u,h,d,p;if(c>0)if(u=a*o-s,h=a*s-o,p=n*c,u>=0)if(h>=-p)if(h<=p){const g=1/c;u*=g,h*=g,d=u*(u+a*h+2*s)+h*(a*u+h+2*o)+l}else h=n,u=Math.max(0,-(a*h+s)),d=-u*u+h*(h+2*o)+l;else h=-n,u=Math.max(0,-(a*h+s)),d=-u*u+h*(h+2*o)+l;else h<=-p?(u=Math.max(0,-(-a*n+s)),h=u>0?-n:Math.min(Math.max(-n,-o),n),d=-u*u+h*(h+2*o)+l):h<=p?(u=0,h=Math.min(Math.max(-n,-o),n),d=h*(h+2*o)+l):(u=Math.max(0,-(a*n+s)),h=u>0?n:Math.min(Math.max(-n,-o),n),d=-u*u+h*(h+2*o)+l);else h=a>0?-n:n,u=Math.max(0,-(a*h+s)),d=-u*u+h*(h+2*o)+l;return t&&t.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(ss).addScaledVector(kn,h),d}intersectSphere(r,e){Ar.subVectors(r.center,this.origin);const t=Ar.dot(this.direction),i=Ar.dot(Ar)-t*t,n=r.radius*r.radius;if(i>n)return null;const a=Math.sqrt(n-i),s=t-a,o=t+a;return o<0?null:s<0?this.at(o,e):this.at(s,e)}intersectsSphere(r){return r.radius<0?!1:this.distanceSqToPoint(r.center)<=r.radius*r.radius}distanceToPlane(r){const e=r.normal.dot(this.direction);if(e===0)return r.distanceToPoint(this.origin)===0?0:null;const t=-(this.origin.dot(r.normal)+r.constant)/e;return t>=0?t:null}intersectPlane(r,e){const t=this.distanceToPlane(r);return t===null?null:this.at(t,e)}intersectsPlane(r){const e=r.distanceToPoint(this.origin);return e===0||r.normal.dot(this.direction)*e<0}intersectBox(r,e){let t,i,n,a,s,o;const l=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,h=this.origin;return l>=0?(t=(r.min.x-h.x)*l,i=(r.max.x-h.x)*l):(t=(r.max.x-h.x)*l,i=(r.min.x-h.x)*l),c>=0?(n=(r.min.y-h.y)*c,a=(r.max.y-h.y)*c):(n=(r.max.y-h.y)*c,a=(r.min.y-h.y)*c),t>a||n>i||((n>t||isNaN(t))&&(t=n),(a<i||isNaN(i))&&(i=a),u>=0?(s=(r.min.z-h.z)*u,o=(r.max.z-h.z)*u):(s=(r.max.z-h.z)*u,o=(r.min.z-h.z)*u),t>o||s>i)||((s>t||t!==t)&&(t=s),(o<i||i!==i)&&(i=o),i<0)?null:this.at(t>=0?t:i,e)}intersectsBox(r){return this.intersectBox(r,Ar)!==null}intersectTriangle(r,e,t,i,n){os.subVectors(e,r),Gn.subVectors(t,r),ls.crossVectors(os,Gn);let a=this.direction.dot(ls),s;if(a>0){if(i)return null;s=1}else if(a<0)s=-1,a=-a;else return null;kr.subVectors(this.origin,r);const o=s*this.direction.dot(Gn.crossVectors(kr,Gn));if(o<0)return null;const l=s*this.direction.dot(os.cross(kr));if(l<0||o+l>a)return null;const c=-s*kr.dot(ls);return c<0?null:this.at(c/a,n)}applyMatrix4(r){return this.origin.applyMatrix4(r),this.direction.transformDirection(r),this}equals(r){return r.origin.equals(this.origin)&&r.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ar=class extends Cn{constructor(r){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.combine=Cc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(r)}copy(r){return super.copy(r),this.color.copy(r.color),this.map=r.map,this.lightMap=r.lightMap,this.lightMapIntensity=r.lightMapIntensity,this.aoMap=r.aoMap,this.aoMapIntensity=r.aoMapIntensity,this.specularMap=r.specularMap,this.alphaMap=r.alphaMap,this.envMap=r.envMap,this.envMapRotation.copy(r.envMapRotation),this.combine=r.combine,this.reflectivity=r.reflectivity,this.refractionRatio=r.refractionRatio,this.wireframe=r.wireframe,this.wireframeLinewidth=r.wireframeLinewidth,this.wireframeLinecap=r.wireframeLinecap,this.wireframeLinejoin=r.wireframeLinejoin,this.fog=r.fog,this}};const yl=new st,ti=new Ia,Vn=new Ki,bl=new P,Wn=new P,Xn=new P,jn=new P,cs=new P,Yn=new P,El=new P,qn=new P;class rt extends Qt{constructor(e=new ht,t=new ar){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let n=0,a=i.length;n<a;n++){const s=i[n].name||String(n);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=n}}}}getVertexPosition(e,t){const i=this.geometry,n=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(a&&o){Yn.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const u=o[l],h=a[l];u!==0&&(cs.fromBufferAttribute(h,e),s?Yn.addScaledVector(cs,u):Yn.addScaledVector(cs.sub(t),u))}t.add(Yn)}return t}raycast(e,t){const i=this.geometry,n=this.material,a=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Vn.copy(i.boundingSphere),Vn.applyMatrix4(a),ti.copy(e.ray).recast(e.near),!(Vn.containsPoint(ti.origin)===!1&&(ti.intersectSphere(Vn,bl)===null||ti.origin.distanceToSquared(bl)>(e.far-e.near)**2))&&(yl.copy(a).invert(),ti.copy(e.ray).applyMatrix4(yl),!(i.boundingBox!==null&&ti.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ti)))}_computeIntersections(e,t,i){let n;const a=this.geometry,s=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,u=a.attributes.uv1,h=a.attributes.normal,d=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,x=d.length;g<x;g++){const m=d[g],f=s[m.materialIndex],S=Math.max(m.start,p.start),E=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=S,A=E;y<A;y+=3){const w=o.getX(y),D=o.getX(y+1),v=o.getX(y+2);n=$n(this,f,e,i,c,u,h,w,D,v),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const S=o.getX(m),E=o.getX(m+1),y=o.getX(m+2);n=$n(this,s,e,i,c,u,h,S,E,y),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(s))for(let g=0,x=d.length;g<x;g++){const m=d[g],f=s[m.materialIndex],S=Math.max(m.start,p.start),E=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=S,A=E;y<A;y+=3){const w=y,D=y+1,v=y+2;n=$n(this,f,e,i,c,u,h,w,D,v),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const S=m,E=m+1,y=m+2;n=$n(this,s,e,i,c,u,h,S,E,y),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}}function Vh(r,e,t,i,n,a,s,o){let l;if(e.side===Ut?l=i.intersectTriangle(s,a,n,!0,o):l=i.intersectTriangle(n,a,s,e.side===lr,o),l===null)return null;qn.copy(o),qn.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(qn);return c<t.near||c>t.far?null:{distance:c,point:qn.clone(),object:r}}function $n(r,e,t,i,n,a,s,o,l,c){r.getVertexPosition(o,Wn),r.getVertexPosition(l,Xn),r.getVertexPosition(c,jn);const u=Vh(r,e,t,i,Wn,Xn,jn,El);if(u){const h=new P;rn.getBarycoord(El,Wn,Xn,jn,h),n&&(u.uv=rn.getInterpolatedAttribute(n,o,l,c,h,new De)),a&&(u.uv1=rn.getInterpolatedAttribute(a,o,l,c,h,new De)),s&&(u.normal=rn.getInterpolatedAttribute(s,o,l,c,h,new P),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new P,materialIndex:0};rn.getNormal(Wn,Xn,jn,d.normal),u.face=d,u.barycoord=h}return u}let Zc=class extends $t{constructor(r=null,e=1,t=1,i,n,a,s,o,l=Ct,c=Ct,u,h){super(null,a,s,o,l,c,i,n,u,h),this.isDataTexture=!0,this.image={data:r,width:e,height:t},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},It=class extends Vt{constructor(r,e,t,i=1){super(r,e,t),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(r){return super.copy(r),this.meshPerAttribute=r.meshPerAttribute,this}toJSON(){const r=super.toJSON();return r.meshPerAttribute=this.meshPerAttribute,r.isInstancedBufferAttribute=!0,r}};const Pi=new st,Tl=new st,Kn=[],wl=new mi,Wh=new st,on=new rt,ln=new Ki;class Xh extends rt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new It(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,Wh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new mi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Pi),wl.copy(e.boundingBox).applyMatrix4(Pi),this.boundingBox.union(wl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ki),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Pi),ln.copy(e.boundingSphere).applyMatrix4(Pi),this.boundingSphere.union(ln)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,n=this.morphTexture.source.data.data,a=i.length+1,s=e*a+1;for(let o=0;o<i.length;o++)i[o]=n[s+o]}raycast(e,t){const i=this.matrixWorld,n=this.count;if(on.geometry=this.geometry,on.material=this.material,on.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ln.copy(this.boundingSphere),ln.applyMatrix4(i),e.ray.intersectsSphere(ln)!==!1))for(let a=0;a<n;a++){this.getMatrixAt(a,Pi),Tl.multiplyMatrices(i,Pi),on.matrixWorld=Tl,on.raycast(e,Kn);for(let s=0,o=Kn.length;s<o;s++){const l=Kn[s];l.instanceId=a,l.object=this,t.push(l)}Kn.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new It(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new Zc(new Float32Array(n*this.count),n,this.count,No,sr));const a=this.morphTexture.source.data.data;let s=0;for(let c=0;c<i.length;c++)s+=i[c];const o=this.geometry.morphTargetsRelative?1:1-s,l=n*e;a[l]=o,a.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const us=new P,jh=new P,Yh=new He;class Vr{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const n=us.subVectors(i,t).cross(jh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(us),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/n;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Yh.getNormalMatrix(e),n=this.coplanarPoint(us).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ri=new Ki,qh=new De(.5,.5),Zn=new P;let Jc=class{constructor(r=new Vr,e=new Vr,t=new Vr,i=new Vr,n=new Vr,a=new Vr){this.planes=[r,e,t,i,n,a]}set(r,e,t,i,n,a){const s=this.planes;return s[0].copy(r),s[1].copy(e),s[2].copy(t),s[3].copy(i),s[4].copy(n),s[5].copy(a),this}copy(r){const e=this.planes;for(let t=0;t<6;t++)e[t].copy(r.planes[t]);return this}setFromProjectionMatrix(r,e=fr,t=!1){const i=this.planes,n=r.elements,a=n[0],s=n[1],o=n[2],l=n[3],c=n[4],u=n[5],h=n[6],d=n[7],p=n[8],g=n[9],x=n[10],m=n[11],f=n[12],S=n[13],E=n[14],y=n[15];if(i[0].setComponents(l-a,d-c,m-p,y-f).normalize(),i[1].setComponents(l+a,d+c,m+p,y+f).normalize(),i[2].setComponents(l+s,d+u,m+g,y+S).normalize(),i[3].setComponents(l-s,d-u,m-g,y-S).normalize(),t)i[4].setComponents(o,h,x,E).normalize(),i[5].setComponents(l-o,d-h,m-x,y-E).normalize();else if(i[4].setComponents(l-o,d-h,m-x,y-E).normalize(),e===fr)i[5].setComponents(l+o,d+h,m+x,y+E).normalize();else if(e===Ta)i[5].setComponents(o,h,x,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(r){if(r.boundingSphere!==void 0)r.boundingSphere===null&&r.computeBoundingSphere(),ri.copy(r.boundingSphere).applyMatrix4(r.matrixWorld);else{const e=r.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ri.copy(e.boundingSphere).applyMatrix4(r.matrixWorld)}return this.intersectsSphere(ri)}intersectsSprite(r){ri.center.set(0,0,0);const e=qh.distanceTo(r.center);return ri.radius=.7071067811865476+e,ri.applyMatrix4(r.matrixWorld),this.intersectsSphere(ri)}intersectsSphere(r){const e=this.planes,t=r.center,i=-r.radius;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<i)return!1;return!0}intersectsBox(r){const e=this.planes;for(let t=0;t<6;t++){const i=e[t];if(Zn.x=i.normal.x>0?r.max.x:r.min.x,Zn.y=i.normal.y>0?r.max.y:r.min.y,Zn.z=i.normal.z>0?r.max.z:r.min.z,i.distanceToPoint(Zn)<0)return!1}return!0}containsPoint(r){const e=this.planes;for(let t=0;t<6;t++)if(e[t].distanceToPoint(r)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};class Jt extends Cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Aa=new P,Ca=new P,Al=new st,cn=new Ia,Jn=new Ki,hs=new P,Cl=new P;let Rr=class extends Qt{constructor(r=new ht,e=new Jt){super(),this.isLine=!0,this.type="Line",this.geometry=r,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(r,e){return super.copy(r,e),this.material=Array.isArray(r.material)?r.material.slice():r.material,this.geometry=r.geometry,this}computeLineDistances(){const r=this.geometry;if(r.index===null){const e=r.attributes.position,t=[0];for(let i=1,n=e.count;i<n;i++)Aa.fromBufferAttribute(e,i-1),Ca.fromBufferAttribute(e,i),t[i]=t[i-1],t[i]+=Aa.distanceTo(Ca);r.setAttribute("lineDistance",new Nt(t,1))}else Ue("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(r,e){const t=this.geometry,i=this.matrixWorld,n=r.params.Line.threshold,a=t.drawRange;if(t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere),Jn.applyMatrix4(i),Jn.radius+=n,r.ray.intersectsSphere(Jn)===!1)return;Al.copy(i).invert(),cn.copy(r.ray).applyMatrix4(Al);const s=n/((this.scale.x+this.scale.y+this.scale.z)/3),o=s*s,l=this.isLineSegments?2:1,c=t.index,u=t.attributes.position;if(c!==null){const h=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let p=h,g=d-1;p<g;p+=l){const x=c.getX(p),m=c.getX(p+1),f=Qn(this,r,cn,o,x,m,p);f&&e.push(f)}if(this.isLineLoop){const p=c.getX(d-1),g=c.getX(h),x=Qn(this,r,cn,o,p,g,d-1);x&&e.push(x)}}else{const h=Math.max(0,a.start),d=Math.min(u.count,a.start+a.count);for(let p=h,g=d-1;p<g;p+=l){const x=Qn(this,r,cn,o,p,p+1,p);x&&e.push(x)}if(this.isLineLoop){const p=Qn(this,r,cn,o,d-1,h,d-1);p&&e.push(p)}}}updateMorphTargets(){const r=this.geometry.morphAttributes,e=Object.keys(r);if(e.length>0){const t=r[e[0]];if(t!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,n=t.length;i<n;i++){const a=t[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};function Qn(r,e,t,i,n,a,s){const o=r.geometry.attributes.position;if(Aa.fromBufferAttribute(o,n),Ca.fromBufferAttribute(o,a),t.distanceSqToSegment(Aa,Ca,hs,Cl)>i)return;hs.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(hs);if(!(l<e.near||l>e.far))return{distance:l,point:Cl.clone().applyMatrix4(r.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:r}}const Rl=new P,Pl=new P;class $h extends Rr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let n=0,a=t.count;n<a;n+=2)Rl.fromBufferAttribute(t,n),Pl.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Rl.distanceTo(Pl);e.setAttribute("lineDistance",new Nt(i,1))}else Ue("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qc extends Rr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}let eu=class extends $t{constructor(r=[],e=ui,t,i,n,a,s,o,l,c){super(r,e,t,i,n,a,s,o,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(r){this.image=r}};class xo extends $t{constructor(e,t,i,n,a,s,o,l,c){super(e,t,i,n,a,s,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class yn extends $t{constructor(e,t,i=Mr,n,a,s,o=Ct,l=Ct,c,u=Ur,h=1){if(u!==Ur&&u!==li)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,n,a,s,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ko(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Kh extends yn{constructor(e,t=Mr,i=ui,n,a,s=Ct,o=Ct,l,c=Ur){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,i,n,a,s,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class tu extends $t{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Rn extends ht{constructor(e=1,t=1,i=1,n=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:a,depthSegments:s};const o=this;n=Math.floor(n),a=Math.floor(a),s=Math.floor(s);const l=[],c=[],u=[],h=[];let d=0,p=0;g("z","y","x",-1,-1,i,t,e,s,a,0),g("z","y","x",1,-1,i,t,-e,s,a,1),g("x","z","y",1,1,e,i,t,n,s,2),g("x","z","y",1,-1,e,i,-t,n,s,3),g("x","y","z",1,-1,e,t,i,n,a,4),g("x","y","z",-1,-1,e,t,-i,n,a,5),this.setIndex(l),this.setAttribute("position",new Nt(c,3)),this.setAttribute("normal",new Nt(u,3)),this.setAttribute("uv",new Nt(h,2));function g(x,m,f,S,E,y,A,w,D,v,T){const W=y/D,C=A/v,O=y/2,H=A/2,V=w/2,k=D+1,z=v+1;let F=0,Q=0;const K=new P;for(let le=0;le<z;le++){const de=le*C-H;for(let Me=0;Me<k;Me++){const ne=Me*W-O;K[x]=ne*S,K[m]=de*E,K[f]=V,c.push(K.x,K.y,K.z),K[x]=0,K[m]=0,K[f]=w>0?1:-1,u.push(K.x,K.y,K.z),h.push(Me/D),h.push(1-le/v),F+=1}}for(let le=0;le<v;le++)for(let de=0;de<D;de++){const Me=d+de+k*le,ne=d+de+k*(le+1),Fe=d+(de+1)+k*(le+1),Ne=d+(de+1)+k*le;l.push(Me,ne,Ne),l.push(ne,Fe,Ne),Q+=6}o.addGroup(p,Q,T),p+=Q,d+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Zh{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ue("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,n=this.getPoint(0),a=0;t.push(0);for(let s=1;s<=e;s++)i=this.getPoint(s/e),a+=i.distanceTo(n),t.push(a),n=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let n=0;const a=i.length;let s;t?s=t:s=e*i[a-1];let o=0,l=a-1,c;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),c=i[n]-s,c<0)o=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===s)return n/(a-1);const u=i[n],h=i[n+1]-u,d=(s-u)/h;return(n+d)/(a-1)}getTangent(e,t){let i=e-1e-4,n=e+1e-4;i<0&&(i=0),n>1&&(n=1);const a=this.getPoint(i),s=this.getPoint(n),o=t||(a.isVector2?new De:new P);return o.copy(s).sub(a).normalize(),o}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new P,n=[],a=[],s=[],o=new P,l=new st;for(let p=0;p<=e;p++){const g=p/e;n[p]=this.getTangentAt(g,new P)}a[0]=new P,s[0]=new P;let c=Number.MAX_VALUE;const u=Math.abs(n[0].x),h=Math.abs(n[0].y),d=Math.abs(n[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(n[0],i).normalize(),a[0].crossVectors(n[0],o),s[0].crossVectors(n[0],a[0]);for(let p=1;p<=e;p++){if(a[p]=a[p-1].clone(),s[p]=s[p-1].clone(),o.crossVectors(n[p-1],n[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ke(n[p-1].dot(n[p]),-1,1));a[p].applyMatrix4(l.makeRotationAxis(o,g))}s[p].crossVectors(n[p],a[p])}if(t===!0){let p=Math.acos(ke(a[0].dot(a[e]),-1,1));p/=e,n[0].dot(o.crossVectors(a[0],a[e]))>0&&(p=-p);for(let g=1;g<=e;g++)a[g].applyMatrix4(l.makeRotationAxis(n[g],p*g)),s[g].crossVectors(n[g],a[g])}return{tangents:n,normals:a,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function Jh(r,e){const t=1-r;return t*t*e}function Qh(r,e){return 2*(1-r)*r*e}function ed(r,e){return r*r*e}function ds(r,e,t,i){return Jh(r,e)+Qh(r,t)+ed(r,i)}class td extends Zh{constructor(e=new P,t=new P,i=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new P){const i=t,n=this.v0,a=this.v1,s=this.v2;return i.set(ds(e,n.x,a.x,s.x),ds(e,n.y,a.y,s.y),ds(e,n.z,a.z,s.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Nr extends ht{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};const a=e/2,s=t/2,o=Math.floor(i),l=Math.floor(n),c=o+1,u=l+1,h=e/o,d=t/l,p=[],g=[],x=[],m=[];for(let f=0;f<u;f++){const S=f*d-s;for(let E=0;E<c;E++){const y=E*h-a;g.push(y,-S,0),x.push(0,0,1),m.push(E/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<o;S++){const E=S+c*f,y=S+c*(f+1),A=S+1+c*(f+1),w=S+1+c*f;p.push(E,y,w),p.push(y,A,w)}this.setIndex(p),this.setAttribute("position",new Nt(g,3)),this.setAttribute("normal",new Nt(x,3)),this.setAttribute("uv",new Nt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Nr(e.width,e.height,e.widthSegments,e.heightSegments)}}class vr extends ht{constructor(e=1,t=32,i=16,n=0,a=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:a,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(s+o,Math.PI);let c=0;const u=[],h=new P,d=new P,p=[],g=[],x=[],m=[];for(let f=0;f<=i;f++){const S=[],E=f/i;let y=0;f===0&&s===0?y=.5/t:f===i&&l===Math.PI&&(y=-.5/t);for(let A=0;A<=t;A++){const w=A/t;h.x=-e*Math.cos(n+w*a)*Math.sin(s+E*o),h.y=e*Math.cos(s+E*o),h.z=e*Math.sin(n+w*a)*Math.sin(s+E*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),m.push(w+y,1-E),S.push(c++)}u.push(S)}for(let f=0;f<i;f++)for(let S=0;S<t;S++){const E=u[f][S+1],y=u[f][S],A=u[f+1][S],w=u[f+1][S+1];(f!==0||s>0)&&p.push(E,y,w),(f!==i-1||l<Math.PI)&&p.push(y,A,w)}this.setIndex(p),this.setAttribute("position",new Nt(g,3)),this.setAttribute("normal",new Nt(x,3)),this.setAttribute("uv",new Nt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Yi(r){const e={};for(const t in r){e[t]={};for(const i in r[t]){const n=r[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(Ue("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function Ot(r){const e={};for(let t=0;t<r.length;t++){const i=Yi(r[t]);for(const n in i)e[n]=i[n]}return e}function rd(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function ru(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const Ra={clone:Yi,merge:Ot};var id=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;let ct=class extends Cn{constructor(r){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=id,this.fragmentShader=nd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,r!==void 0&&this.setValues(r)}copy(r){return super.copy(r),this.fragmentShader=r.fragmentShader,this.vertexShader=r.vertexShader,this.uniforms=Yi(r.uniforms),this.uniformsGroups=rd(r.uniformsGroups),this.defines=Object.assign({},r.defines),this.wireframe=r.wireframe,this.wireframeLinewidth=r.wireframeLinewidth,this.fog=r.fog,this.lights=r.lights,this.clipping=r.clipping,this.extensions=Object.assign({},r.extensions),this.glslVersion=r.glslVersion,this.defaultAttributeValues=Object.assign({},r.defaultAttributeValues),this.index0AttributeName=r.index0AttributeName,this.uniformsNeedUpdate=r.uniformsNeedUpdate,this}toJSON(r){const e=super.toJSON(r);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const n=this.uniforms[i].value;n&&n.isTexture?e.uniforms[i]={type:"t",value:n.toJSON(r).uuid}:n&&n.isColor?e.uniforms[i]={type:"c",value:n.getHex()}:n&&n.isVector2?e.uniforms[i]={type:"v2",value:n.toArray()}:n&&n.isVector3?e.uniforms[i]={type:"v3",value:n.toArray()}:n&&n.isVector4?e.uniforms[i]={type:"v4",value:n.toArray()}:n&&n.isMatrix3?e.uniforms[i]={type:"m3",value:n.toArray()}:n&&n.isMatrix4?e.uniforms[i]={type:"m4",value:n.toArray()}:e.uniforms[i]={value:n}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const t={};for(const i in this.extensions)this.extensions[i]===!0&&(t[i]=!0);return Object.keys(t).length>0&&(e.extensions=t),e}};class ad extends ct{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class sd extends Cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class od extends Cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ps={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(Ll(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!Ll(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function Ll(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class ld{constructor(e,t,i){const n=this;let a=!1,s=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,a===!1&&n.onStart!==void 0&&n.onStart(u,s,o),a=!0},this.itemEnd=function(u){s++,n.onProgress!==void 0&&n.onProgress(u,s,o),s===o&&(a=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(u){n.onError!==void 0&&n.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const p=c[h],g=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const cd=new ld;let Wo=class{constructor(r){this.manager=r!==void 0?r:cd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(r,e){const t=this;return new Promise(function(i,n){t.load(r,i,e,n)})}parse(){}setCrossOrigin(r){return this.crossOrigin=r,this}setWithCredentials(r){return this.withCredentials=r,this}setPath(r){return this.path=r,this}setResourcePath(r){return this.resourcePath=r,this}setRequestHeader(r){return this.requestHeader=r,this}abort(){return this}};Wo.DEFAULT_MATERIAL_NAME="__DEFAULT";const Li=new WeakMap;class ud extends Wo{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const a=this,s=ps.get(`image:${e}`);if(s!==void 0){if(s.complete===!0)a.manager.itemStart(e),setTimeout(function(){t&&t(s),a.manager.itemEnd(e)},0);else{let h=Li.get(s);h===void 0&&(h=[],Li.set(s,h)),h.push({onLoad:t,onError:n})}return s}const o=Sn("img");function l(){u(),t&&t(this);const h=Li.get(this)||[];for(let d=0;d<h.length;d++){const p=h[d];p.onLoad&&p.onLoad(this)}Li.delete(this),a.manager.itemEnd(e)}function c(h){u(),n&&n(h),ps.remove(`image:${e}`);const d=Li.get(this)||[];for(let p=0;p<d.length;p++){const g=d[p];g.onError&&g.onError(h)}Li.delete(this),a.manager.itemError(e),a.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ps.add(`image:${e}`,o),a.manager.itemStart(e),o.src=e,o}}class hd extends Wo{constructor(e){super(e)}load(e,t,i,n){const a=new $t,s=new ud(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(o){a.image=o,a.needsUpdate=!0,t!==void 0&&t(a)},i,n),a}}const ea=new P,ta=new qr,ur=new P;class iu extends Qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=fr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ea,ta,ur),ur.x===1&&ur.y===1&&ur.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ta,ur.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ea,ta,ur),ur.x===1&&ur.y===1&&ur.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ta,ur.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Gr=new P,Dl=new De,Il=new De;class Yt extends iu{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Mo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(da*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Mo*2*Math.atan(Math.tan(da*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Gr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gr.x,Gr.y).multiplyScalar(-e/Gr.z),Gr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Gr.x,Gr.y).multiplyScalar(-e/Gr.z)}getViewSize(e,t){return this.getViewBounds(e,Dl,Il),t.subVectors(Il,Dl)}setViewOffset(e,t,i,n,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(da*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,a=-.5*n;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;a+=s.offsetX*n/l,t-=s.offsetY*i/c,n*=s.width/l,i*=s.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+n,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ua extends iu{constructor(e=-1,t=1,i=1,n=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let a=i-e,s=i+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,s=a+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class dd extends ht{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Di=-90,Ii=1;class pd extends Qt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Yt(Di,Ii,e,t);n.layers=this.layers,this.add(n);const a=new Yt(Di,Ii,e,t);a.layers=this.layers,this.add(a);const s=new Yt(Di,Ii,e,t);s.layers=this.layers,this.add(s);const o=new Yt(Di,Ii,e,t);o.layers=this.layers,this.add(o);const l=new Yt(Di,Ii,e,t);l.layers=this.layers,this.add(l);const c=new Yt(Di,Ii,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,n,a,s,o,l]=t;for(const c of t)this.remove(c);if(e===fr)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ta)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,2,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class fd extends Yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class md{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=gd.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function gd(){this._document.hidden===!1&&this.reset()}const Ul=new st;class _d{constructor(e,t,i=0,n=1/0){this.ray=new Ia(e,t),this.near=i,this.far=n,this.camera=null,this.layers=new Go,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Xe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ul.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ul),this}intersectObject(e,t=!0,i=[]){return So(e,this,i,t),i.sort(Nl),i}intersectObjects(e,t=!0,i=[]){for(let n=0,a=e.length;n<a;n++)So(e[n],this,i,t);return i.sort(Nl),i}}function Nl(r,e){return r.distance-e.distance}function So(r,e,t,i){let n=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(n=!1),n===!0&&i===!0){const a=r.children;for(let s=0,o=a.length;s<o;s++)So(a[s],e,t,!0)}}class Ol{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class vd extends fi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ue("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Fl(r,e,t,i){const n=Md(i);switch(t){case kc:return r*e;case No:return r*e/n.components*n.byteLength;case Oo:return r*e/n.components*n.byteLength;case Xi:return r*e*2/n.components*n.byteLength;case Fo:return r*e*2/n.components*n.byteLength;case Gc:return r*e*3/n.components*n.byteLength;case or:return r*e*4/n.components*n.byteLength;case Bo:return r*e*4/n.components*n.byteLength;case la:case ca:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ua:case ha:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case ks:case Vs:return Math.max(r,16)*Math.max(e,8)/4;case Hs:case Gs:return Math.max(r,8)*Math.max(e,8)/2;case Ws:case Xs:case Ys:case qs:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case js:case $s:case Ks:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Zs:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Js:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Qs:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case eo:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case to:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case ro:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case io:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case no:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case ao:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case so:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case oo:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case lo:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case co:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case uo:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case ho:case po:case fo:return Math.ceil(r/4)*Math.ceil(e/4)*16;case mo:case go:return Math.ceil(r/4)*Math.ceil(e/4)*8;case _o:case vo:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Md(r){switch(r){case Zt:case Fc:return{byteLength:1,components:1};case Mn:case Bc:case qt:return{byteLength:2,components:1};case Io:case Uo:return{byteLength:2,components:4};case Mr:case Do:case sr:return{byteLength:4,components:1};case zc:case Hc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Lo}}));typeof window<"u"&&(window.__THREE__?Ue("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Lo);/**
* @license
* Copyright 2010-2026 Three.js Authors
* SPDX-License-Identifier: MIT
*/function nu(){let r=null,e=!1,t=null,i=null;function n(a,s){t(a,s),i=r.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=r.requestAnimationFrame(n),e=!0)},stop:function(){r.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){r=a}}}function xd(r){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=r.HALF_FLOAT:p=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=r.SHORT;else if(c instanceof Uint32Array)p=r.UNSIGNED_INT;else if(c instanceof Int32Array)p=r.INT;else if(c instanceof Int8Array)p=r.BYTE;else if(c instanceof Uint8Array)p=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const u=l.array,h=l.updateRanges;if(r.bindBuffer(c,o),h.length===0)r.bufferSubData(c,0,u);else{h.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<h.length;p++){const g=h[d],x=h[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,h[d]=x)}h.length=d+1;for(let p=0,g=h.length;p<g;p++){const x=h[p];r.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:a,update:s}}var Sd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,yd=`#ifdef USE_ALPHAHASH
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
#endif`,bd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ed=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Td=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ad=`#ifdef USE_AOMAP
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
#endif`,Cd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rd=`#ifdef USE_BATCHING
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
#endif`,Pd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ld=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Dd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Id=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ud=`#ifdef USE_IRIDESCENCE
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
#endif`,Nd=`#ifdef USE_BUMPMAP
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
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Fd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,kd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Gd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Vd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Wd=`#define PI 3.141592653589793
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
} // validated`,Xd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,jd=`vec3 transformedNormal = objectNormal;
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
#endif`,Yd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$d=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qd=`#ifdef USE_ENVMAP
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
#endif`,ep=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,tp=`#ifdef USE_ENVMAP
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
#endif`,rp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ip=`#ifdef USE_ENVMAP
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
#endif`,np=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ap=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,sp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,op=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lp=`#ifdef USE_GRADIENTMAP
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
}`,cp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,up=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dp=`uniform bool receiveShadow;
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
#endif`,pp=`#ifdef USE_ENVMAP
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
#endif`,fp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_p=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vp=`PhysicalMaterial material;
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
#endif`,Mp=`uniform sampler2D dfgLUT;
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
}`,xp=`
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
#endif`,Sp=`#if defined( RE_IndirectDiffuse )
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
#endif`,yp=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ep=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ap=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Pp=`#if defined( USE_POINTS_UV )
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
#endif`,Lp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Dp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ip=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Up=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Np=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Op=`#ifdef USE_MORPHTARGETS
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
#endif`,Fp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,zp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vp=`#ifdef USE_NORMALMAP
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
#endif`,Wp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$p=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Kp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ef=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,rf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,af=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,sf=`float getShadowMask() {
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
}`,of=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lf=`#ifdef USE_SKINNING
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
#endif`,cf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uf=`#ifdef USE_SKINNING
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
#endif`,hf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,df=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ff=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mf=`#ifdef USE_TRANSMISSION
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
#endif`,gf=`#ifdef USE_TRANSMISSION
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
#endif`,_f=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yf=`uniform sampler2D t2D;
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
}`,bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ef=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Tf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Af=`#include <common>
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
}`,Cf=`#if DEPTH_PACKING == 3200
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
}`,Rf=`#define DISTANCE
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
}`,Pf=`#define DISTANCE
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
}`,Lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Df=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,If=`uniform float scale;
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
}`,Uf=`uniform vec3 diffuse;
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
}`,Nf=`#include <common>
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
}`,Of=`uniform vec3 diffuse;
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
}`,Ff=`#define LAMBERT
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
}`,Bf=`#define LAMBERT
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
}`,zf=`#define MATCAP
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
}`,Hf=`#define MATCAP
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
}`,kf=`#define NORMAL
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
}`,Gf=`#define NORMAL
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
}`,Vf=`#define PHONG
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
}`,Wf=`#define PHONG
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
}`,Xf=`#define STANDARD
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
}`,jf=`#define STANDARD
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
}`,Yf=`#define TOON
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
}`,qf=`#define TOON
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
}`,$f=`uniform float size;
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
}`,Kf=`uniform vec3 diffuse;
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
}`,Zf=`#include <common>
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
}`,Jf=`uniform vec3 color;
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
}`,Qf=`uniform float rotation;
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
}`,em=`uniform vec3 diffuse;
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
}`,Be={alphahash_fragment:Sd,alphahash_pars_fragment:yd,alphamap_fragment:bd,alphamap_pars_fragment:Ed,alphatest_fragment:Td,alphatest_pars_fragment:wd,aomap_fragment:Ad,aomap_pars_fragment:Cd,batching_pars_vertex:Rd,batching_vertex:Pd,begin_vertex:Ld,beginnormal_vertex:Dd,bsdfs:Id,iridescence_fragment:Ud,bumpmap_pars_fragment:Nd,clipping_planes_fragment:Od,clipping_planes_pars_fragment:Fd,clipping_planes_pars_vertex:Bd,clipping_planes_vertex:zd,color_fragment:Hd,color_pars_fragment:kd,color_pars_vertex:Gd,color_vertex:Vd,common:Wd,cube_uv_reflection_fragment:Xd,defaultnormal_vertex:jd,displacementmap_pars_vertex:Yd,displacementmap_vertex:qd,emissivemap_fragment:$d,emissivemap_pars_fragment:Kd,colorspace_fragment:Zd,colorspace_pars_fragment:Jd,envmap_fragment:Qd,envmap_common_pars_fragment:ep,envmap_pars_fragment:tp,envmap_pars_vertex:rp,envmap_physical_pars_fragment:pp,envmap_vertex:ip,fog_vertex:np,fog_pars_vertex:ap,fog_fragment:sp,fog_pars_fragment:op,gradientmap_pars_fragment:lp,lightmap_pars_fragment:cp,lights_lambert_fragment:up,lights_lambert_pars_fragment:hp,lights_pars_begin:dp,lights_toon_fragment:fp,lights_toon_pars_fragment:mp,lights_phong_fragment:gp,lights_phong_pars_fragment:_p,lights_physical_fragment:vp,lights_physical_pars_fragment:Mp,lights_fragment_begin:xp,lights_fragment_maps:Sp,lights_fragment_end:yp,logdepthbuf_fragment:bp,logdepthbuf_pars_fragment:Ep,logdepthbuf_pars_vertex:Tp,logdepthbuf_vertex:wp,map_fragment:Ap,map_pars_fragment:Cp,map_particle_fragment:Rp,map_particle_pars_fragment:Pp,metalnessmap_fragment:Lp,metalnessmap_pars_fragment:Dp,morphinstance_vertex:Ip,morphcolor_vertex:Up,morphnormal_vertex:Np,morphtarget_pars_vertex:Op,morphtarget_vertex:Fp,normal_fragment_begin:Bp,normal_fragment_maps:zp,normal_pars_fragment:Hp,normal_pars_vertex:kp,normal_vertex:Gp,normalmap_pars_fragment:Vp,clearcoat_normal_fragment_begin:Wp,clearcoat_normal_fragment_maps:Xp,clearcoat_pars_fragment:jp,iridescence_pars_fragment:Yp,opaque_fragment:qp,packing:$p,premultiplied_alpha_fragment:Kp,project_vertex:Zp,dithering_fragment:Jp,dithering_pars_fragment:Qp,roughnessmap_fragment:ef,roughnessmap_pars_fragment:tf,shadowmap_pars_fragment:rf,shadowmap_pars_vertex:nf,shadowmap_vertex:af,shadowmask_pars_fragment:sf,skinbase_vertex:of,skinning_pars_vertex:lf,skinning_vertex:cf,skinnormal_vertex:uf,specularmap_fragment:hf,specularmap_pars_fragment:df,tonemapping_fragment:pf,tonemapping_pars_fragment:ff,transmission_fragment:mf,transmission_pars_fragment:gf,uv_pars_fragment:_f,uv_pars_vertex:vf,uv_vertex:Mf,worldpos_vertex:xf,background_vert:Sf,background_frag:yf,backgroundCube_vert:bf,backgroundCube_frag:Ef,cube_vert:Tf,cube_frag:wf,depth_vert:Af,depth_frag:Cf,distance_vert:Rf,distance_frag:Pf,equirect_vert:Lf,equirect_frag:Df,linedashed_vert:If,linedashed_frag:Uf,meshbasic_vert:Nf,meshbasic_frag:Of,meshlambert_vert:Ff,meshlambert_frag:Bf,meshmatcap_vert:zf,meshmatcap_frag:Hf,meshnormal_vert:kf,meshnormal_frag:Gf,meshphong_vert:Vf,meshphong_frag:Wf,meshphysical_vert:Xf,meshphysical_frag:jf,meshtoon_vert:Yf,meshtoon_frag:qf,points_vert:$f,points_frag:Kf,shadow_vert:Zf,shadow_frag:Jf,sprite_vert:Qf,sprite_frag:em},ce={common:{diffuse:{value:new Ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new Ee(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},pr={basic:{uniforms:Ot([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Ot([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ee(0)},envMapIntensity:{value:1}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Ot([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ee(0)},specular:{value:new Ee(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Ot([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Ot([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Ee(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Ot([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Ot([ce.points,ce.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Ot([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Ot([ce.common,ce.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Ot([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Ot([ce.sprite,ce.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distance:{uniforms:Ot([ce.common,ce.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distance_vert,fragmentShader:Be.distance_frag},shadow:{uniforms:Ot([ce.lights,ce.fog,{color:{value:new Ee(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};pr.physical={uniforms:Ot([pr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new Ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new Ee(0)},specularColor:{value:new Ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const ra={r:0,b:0,g:0},ii=new hi,tm=new st;function rm(r,e,t,i,n,a){const s=new Ee(0);let o=n===!0?0:1,l,c,u=null,h=0,d=null;function p(S){let E=S.isScene===!0?S.background:null;if(E&&E.isTexture){const y=S.backgroundBlurriness>0;E=e.get(E,y)}return E}function g(S){let E=!1;const y=p(S);y===null?m(s,o):y&&y.isColor&&(m(y,1),E=!0);const A=r.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(r.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function x(S,E){const y=p(E);y&&(y.isCubeTexture||y.mapping===Da)?(c===void 0&&(c=new rt(new Rn(1,1,1),new ct({name:"BackgroundCubeMaterial",uniforms:Yi(pr.backgroundCube.uniforms),vertexShader:pr.backgroundCube.vertexShader,fragmentShader:pr.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,w,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),ii.copy(E.backgroundRotation),ii.x*=-1,ii.y*=-1,ii.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),c.material.uniforms.envMap.value=y,c.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(tm.makeRotationFromEuler(ii)),c.material.toneMapped=je.getTransfer(y.colorSpace)!==Ze,(u!==y||h!==y.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,u=y,h=y.version,d=r.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new rt(new Nr(2,2),new ct({name:"BackgroundMaterial",uniforms:Yi(pr.background.uniforms),vertexShader:pr.background.vertexShader,fragmentShader:pr.background.fragmentShader,side:lr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=je.getTransfer(y.colorSpace)!==Ze,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||h!==y.version||d!==r.toneMapping)&&(l.material.needsUpdate=!0,u=y,h=y.version,d=r.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function m(S,E){S.getRGB(ra,ru(r)),t.buffers.color.setClear(ra.r,ra.g,ra.b,E,a)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(S,E=1){s.set(S),o=E,m(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(s,o)},render:g,addToRenderList:x,dispose:f}}function im(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),i={},n=d(null);let a=n,s=!1;function o(C,O,H,V,k){let z=!1;const F=h(C,V,H,O);a!==F&&(a=F,c(a.object)),z=p(C,V,H,k),z&&g(C,V,H,k),k!==null&&e.update(k,r.ELEMENT_ARRAY_BUFFER),(z||s)&&(s=!1,y(C,O,H,V),k!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return r.createVertexArray()}function c(C){return r.bindVertexArray(C)}function u(C){return r.deleteVertexArray(C)}function h(C,O,H,V){const k=V.wireframe===!0;let z=i[O.id];z===void 0&&(z={},i[O.id]=z);const F=C.isInstancedMesh===!0?C.id:0;let Q=z[F];Q===void 0&&(Q={},z[F]=Q);let K=Q[H.id];K===void 0&&(K={},Q[H.id]=K);let le=K[k];return le===void 0&&(le=d(l()),K[k]=le),le}function d(C){const O=[],H=[],V=[];for(let k=0;k<t;k++)O[k]=0,H[k]=0,V[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:H,attributeDivisors:V,object:C,attributes:{},index:null}}function p(C,O,H,V){const k=a.attributes,z=O.attributes;let F=0;const Q=H.getAttributes();for(const K in Q)if(Q[K].location>=0){const le=k[K];let de=z[K];if(de===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(de=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(de=C.instanceColor)),le===void 0||le.attribute!==de||de&&le.data!==de.data)return!0;F++}return a.attributesNum!==F||a.index!==V}function g(C,O,H,V){const k={},z=O.attributes;let F=0;const Q=H.getAttributes();for(const K in Q)if(Q[K].location>=0){let le=z[K];le===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(le=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(le=C.instanceColor));const de={};de.attribute=le,le&&le.data&&(de.data=le.data),k[K]=de,F++}a.attributes=k,a.attributesNum=F,a.index=V}function x(){const C=a.newAttributes;for(let O=0,H=C.length;O<H;O++)C[O]=0}function m(C){f(C,0)}function f(C,O){const H=a.newAttributes,V=a.enabledAttributes,k=a.attributeDivisors;H[C]=1,V[C]===0&&(r.enableVertexAttribArray(C),V[C]=1),k[C]!==O&&(r.vertexAttribDivisor(C,O),k[C]=O)}function S(){const C=a.newAttributes,O=a.enabledAttributes;for(let H=0,V=O.length;H<V;H++)O[H]!==C[H]&&(r.disableVertexAttribArray(H),O[H]=0)}function E(C,O,H,V,k,z,F){F===!0?r.vertexAttribIPointer(C,O,H,k,z):r.vertexAttribPointer(C,O,H,V,k,z)}function y(C,O,H,V){x();const k=V.attributes,z=H.getAttributes(),F=O.defaultAttributeValues;for(const Q in z){const K=z[Q];if(K.location>=0){let le=k[Q];if(le===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(le=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(le=C.instanceColor)),le!==void 0){const de=le.normalized,Me=le.itemSize,ne=e.get(le);if(ne===void 0)continue;const Fe=ne.buffer,Ne=ne.type,j=ne.bytesPerElement,Z=Ne===r.INT||Ne===r.UNSIGNED_INT||le.gpuType===Do;if(le.isInterleavedBufferAttribute){const ae=le.data,Oe=ae.stride,Ae=le.offset;if(ae.isInstancedInterleavedBuffer){for(let pe=0;pe<K.locationSize;pe++)f(K.location+pe,ae.meshPerAttribute);C.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let pe=0;pe<K.locationSize;pe++)m(K.location+pe);r.bindBuffer(r.ARRAY_BUFFER,Fe);for(let pe=0;pe<K.locationSize;pe++)E(K.location+pe,Me/K.locationSize,Ne,de,Oe*j,(Ae+Me/K.locationSize*pe)*j,Z)}else{if(le.isInstancedBufferAttribute){for(let ae=0;ae<K.locationSize;ae++)f(K.location+ae,le.meshPerAttribute);C.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ae=0;ae<K.locationSize;ae++)m(K.location+ae);r.bindBuffer(r.ARRAY_BUFFER,Fe);for(let ae=0;ae<K.locationSize;ae++)E(K.location+ae,Me/K.locationSize,Ne,de,Me*j,Me/K.locationSize*ae*j,Z)}}else if(F!==void 0){const de=F[Q];if(de!==void 0)switch(de.length){case 2:r.vertexAttrib2fv(K.location,de);break;case 3:r.vertexAttrib3fv(K.location,de);break;case 4:r.vertexAttrib4fv(K.location,de);break;default:r.vertexAttrib1fv(K.location,de)}}}}S()}function A(){T();for(const C in i){const O=i[C];for(const H in O){const V=O[H];for(const k in V){const z=V[k];for(const F in z)u(z[F].object),delete z[F];delete V[k]}}delete i[C]}}function w(C){if(i[C.id]===void 0)return;const O=i[C.id];for(const H in O){const V=O[H];for(const k in V){const z=V[k];for(const F in z)u(z[F].object),delete z[F];delete V[k]}}delete i[C.id]}function D(C){for(const O in i){const H=i[O];for(const V in H){const k=H[V];if(k[C.id]===void 0)continue;const z=k[C.id];for(const F in z)u(z[F].object),delete z[F];delete k[C.id]}}}function v(C){for(const O in i){const H=i[O],V=C.isInstancedMesh===!0?C.id:0,k=H[V];if(k!==void 0){for(const z in k){const F=k[z];for(const Q in F)u(F[Q].object),delete F[Q];delete k[z]}delete H[V],Object.keys(H).length===0&&delete i[O]}}}function T(){W(),s=!0,a!==n&&(a=n,c(a.object))}function W(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:T,resetDefaultState:W,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfObject:v,releaseStatesOfProgram:D,initAttributes:x,enableAttribute:m,disableUnusedAttributes:S}}function nm(r,e,t){let i;function n(c){i=c}function a(c,u){r.drawArrays(i,c,u),t.update(u,i,1)}function s(c,u,h){h!==0&&(r.drawArraysInstanced(i,c,u,h),t.update(u,i,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let d=0;for(let p=0;p<h;p++)d+=u[p];t.update(d,i,1)}function l(c,u,h,d){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)s(c[g],u[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,d,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x]*d[x];t.update(g,i,1)}}this.setMode=n,this.render=a,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function am(r,e,t,i){let n;function a(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(D){return!(D!==or&&i.convert(D)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(D){const v=D===qt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==Zt&&i.convert(D)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==sr&&!v)}function l(D){if(D==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ue("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),f=r.getParameter(r.MAX_VERTEX_ATTRIBS),S=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),E=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),A=r.getParameter(r.MAX_SAMPLES),w=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:S,maxVaryings:E,maxFragmentUniforms:y,maxSamples:A,samples:w}}function sm(r){const e=this;let t=null,i=0,n=!1,a=!1;const s=new Vr,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||i!==0||n;return n=d,i=h.length,p},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,p){const g=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,f=r.get(h);if(!n||g===null||g.length===0||a&&!m)a?u(null):c();else{const S=a?0:i,E=S*4;let y=f.clippingState||null;l.value=y,y=u(g,d,E,p);for(let A=0;A!==E;++A)y[A]=t[A];f.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,p,g){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const f=p+x*4,S=d.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,y=p;E!==x;++E,y+=4)s.copy(h[E]).applyMatrix4(S,o),s.normal.toArray(m,y),m[y+3]=s.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}const jr=4,Bl=[.125,.215,.35,.446,.526,.582],si=20,om=256,un=new Ua,zl=new Ee;let fs=null,ms=0,gs=0,_s=!1;const lm=new P;let Hl=class{constructor(r){this._renderer=r,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(r,e=0,t=.1,i=100,n={}){const{size:a=256,position:s=lm}=n;fs=this._renderer.getRenderTarget(),ms=this._renderer.getActiveCubeFace(),gs=this._renderer.getActiveMipmapLevel(),_s=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(r,t,i,o,s),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(r,e=null){return this._fromTexture(r,e)}fromCubemap(r,e=null){return this._fromTexture(r,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(r){this._lodMax=Math.floor(Math.log2(r)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let r=0;r<this._lodMeshes.length;r++)this._lodMeshes[r].geometry.dispose()}_cleanup(r){this._renderer.setRenderTarget(fs,ms,gs),this._renderer.xr.enabled=_s,r.scissorTest=!1,Ui(r,0,0,r.width,r.height)}_fromTexture(r,e){r.mapping===ui||r.mapping===Wi?this._setSize(r.image.length===0?16:r.image[0].width||r.image[0].image.width):this._setSize(r.image.width/4),fs=this._renderer.getRenderTarget(),ms=this._renderer.getActiveCubeFace(),gs=this._renderer.getActiveMipmapLevel(),_s=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const t=e||this._allocateTargets();return this._textureToCubeUV(r,t),this._applyPMREM(t),this._cleanup(t),t}_allocateTargets(){const r=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,t={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:qt,format:or,colorSpace:ji,depthBuffer:!1},i=kl(r,e,t);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==r||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kl(r,e,t);const{_lodMax:n}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=cm(n)),this._blurMaterial=hm(n,r,e),this._ggxMaterial=um(n,r,e)}return i}_compileMaterial(r){const e=new rt(new ht,r);this._renderer.compile(e,un)}_sceneToCubeUV(r,e,t,i,n){const a=new Yt(90,1,e,t),s=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,c=l.autoClear,u=l.toneMapping;l.getClearColor(zl),l.toneMapping=_r,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(i),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new rt(new Rn,new ar({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1})));const h=this._backgroundBox,d=h.material;let p=!1;const g=r.background;g?g.isColor&&(d.color.copy(g),r.background=null,p=!0):(d.color.copy(zl),p=!0);for(let x=0;x<6;x++){const m=x%3;m===0?(a.up.set(0,s[x],0),a.position.set(n.x,n.y,n.z),a.lookAt(n.x+o[x],n.y,n.z)):m===1?(a.up.set(0,0,s[x]),a.position.set(n.x,n.y,n.z),a.lookAt(n.x,n.y+o[x],n.z)):(a.up.set(0,s[x],0),a.position.set(n.x,n.y,n.z),a.lookAt(n.x,n.y,n.z+o[x]));const f=this._cubeSize;Ui(i,m*f,x>2?f:0,f,f),l.setRenderTarget(i),p&&l.render(h,a),l.render(r,a)}l.toneMapping=u,l.autoClear=c,r.background=g}_textureToCubeUV(r,e){const t=this._renderer,i=r.mapping===ui||r.mapping===Wi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vl()),this._cubemapMaterial.uniforms.flipEnvMap.value=r.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gl());const n=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=n;const s=n.uniforms;s.envMap.value=r;const o=this._cubeSize;Ui(e,0,0,3*o,2*o),t.setRenderTarget(e),t.render(a,un)}_applyPMREM(r){const e=this._renderer,t=e.autoClear;e.autoClear=!1;const i=this._lodMeshes.length;for(let n=1;n<i;n++)this._applyGGXFilter(r,n-1,n);e.autoClear=t}_applyGGXFilter(r,e,t){const i=this._renderer,n=this._pingPongRenderTarget,a=this._ggxMaterial,s=this._lodMeshes[t];s.material=a;const o=a.uniforms,l=t/(this._lodMeshes.length-1),c=e/(this._lodMeshes.length-1),u=Math.sqrt(l*l-c*c),h=0+l*1.25,d=u*h,{_lodMax:p}=this,g=this._sizeLods[t],x=3*g*(t>p-jr?t-p+jr:0),m=4*(this._cubeSize-g);o.envMap.value=r.texture,o.roughness.value=d,o.mipInt.value=p-e,Ui(n,x,m,3*g,2*g),i.setRenderTarget(n),i.render(s,un),o.envMap.value=n.texture,o.roughness.value=0,o.mipInt.value=p-t,Ui(r,x,m,3*g,2*g),i.setRenderTarget(r),i.render(s,un)}_blur(r,e,t,i,n){const a=this._pingPongRenderTarget;this._halfBlur(r,a,e,t,i,"latitudinal",n),this._halfBlur(a,r,t,t,i,"longitudinal",n)}_halfBlur(r,e,t,i,n,a,s){const o=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Xe("blur direction must be either latitudinal or longitudinal!");const c=3,u=this._lodMeshes[i];u.material=l;const h=l.uniforms,d=this._sizeLods[t]-1,p=isFinite(n)?Math.PI/(2*d):2*Math.PI/(2*si-1),g=n/p,x=isFinite(n)?1+Math.floor(c*g):si;x>si&&Ue(`sigmaRadians, ${n}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${si}`);const m=[];let f=0;for(let w=0;w<si;++w){const D=w/g,v=Math.exp(-D*D/2);m.push(v),w===0?f+=v:w<x&&(f+=2*v)}for(let w=0;w<m.length;w++)m[w]=m[w]/f;h.envMap.value=r.texture,h.samples.value=x,h.weights.value=m,h.latitudinal.value=a==="latitudinal",s&&(h.poleAxis.value=s);const{_lodMax:S}=this;h.dTheta.value=p,h.mipInt.value=S-t;const E=this._sizeLods[i],y=3*E*(i>S-jr?i-S+jr:0),A=4*(this._cubeSize-E);Ui(e,y,A,3*E,2*E),o.setRenderTarget(e),o.render(u,un)}};function cm(r){const e=[],t=[],i=[];let n=r;const a=r-jr+1+Bl.length;for(let s=0;s<a;s++){const o=Math.pow(2,n);e.push(o);let l=1/o;s>r-jr?l=Bl[s-r+jr-1]:s===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,x=3,m=2,f=1,S=new Float32Array(x*g*p),E=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let w=0;w<p;w++){const D=w%3*2/3-1,v=w>2?0:-1,T=[D,v,0,D+2/3,v,0,D+2/3,v+1,0,D,v,0,D+2/3,v+1,0,D,v+1,0];S.set(T,x*g*w),E.set(d,m*g*w);const W=[w,w,w,w,w,w];y.set(W,f*g*w)}const A=new ht;A.setAttribute("position",new Vt(S,x)),A.setAttribute("uv",new Vt(E,m)),A.setAttribute("faceIndex",new Vt(y,f)),i.push(new rt(A,null)),n>jr&&n--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function kl(r,e,t){const i=new Gt(r,e,t);return i.texture.mapping=Da,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ui(r,e,t,i,n){r.viewport.set(e,t,i,n),r.scissor.set(e,t,i,n)}function um(r,e,t){return new ct({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:om,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Na(),fragmentShader:`

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
		`,blending:gr,depthTest:!1,depthWrite:!1})}function hm(r,e,t){const i=new Float32Array(si),n=new P(0,1,0);return new ct({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:Na(),fragmentShader:`

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
		`,blending:gr,depthTest:!1,depthWrite:!1})}function Gl(){return new ct({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Na(),fragmentShader:`

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
		`,blending:gr,depthTest:!1,depthWrite:!1})}function Vl(){return new ct({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Na(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gr,depthTest:!1,depthWrite:!1})}function Na(){return`

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
	`}class au extends Gt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new eu(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new Rn(5,5,5),a=new ct({name:"CubemapFromEquirect",uniforms:Yi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ut,blending:gr});a.uniforms.tEquirect.value=t;const s=new rt(n,a),o=t.minFilter;return t.minFilter===oi&&(t.minFilter=Rt),new pd(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,n=!0){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,n);e.setRenderTarget(a)}}function dm(r){let e=new WeakMap,t=new WeakMap,i=null;function n(d,p=!1){return d==null?null:p?s(d):a(d)}function a(d){if(d&&d.isTexture){const p=d.mapping;if(p===za||p===Ha)if(e.has(d)){const g=e.get(d).texture;return o(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const x=new au(g.height);return x.fromEquirectangularTexture(r,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function s(d){if(d&&d.isTexture){const p=d.mapping,g=p===za||p===Ha,x=p===ui||p===Wi;if(g||x){let m=t.get(d);const f=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==f)return i===null&&(i=new Hl(r)),m=g?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const S=d.image;return g&&S&&S.height>0||x&&S&&l(S)?(i===null&&(i=new Hl(r)),m=g?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function o(d,p){return p===za?d.mapping=ui:p===Ha&&(d.mapping=Wi),d}function l(d){let p=0;const g=6;for(let x=0;x<g;x++)d[x]!==void 0&&p++;return p===g}function c(d){const p=d.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(d){const p=d.target;p.removeEventListener("dispose",u);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:n,dispose:h}}function pm(r){const e={};function t(i){if(e[i]!==void 0)return e[i];const n=r.getExtension(i);return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const n=t(i);return n===null&&wa("WebGLRenderer: "+i+" extension not supported."),n}}}function fm(r,e,t,i){const n={},a=new WeakMap;function s(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",s),delete n[d.id];const p=a.get(d);p&&(e.remove(p),a.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return n[d.id]===!0||(d.addEventListener("dispose",s),n[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const p in d)e.update(d[p],r.ARRAY_BUFFER)}function c(h){const d=[],p=h.index,g=h.attributes.position;let x=0;if(g===void 0)return;if(p!==null){const S=p.array;x=p.version;for(let E=0,y=S.length;E<y;E+=3){const A=S[E+0],w=S[E+1],D=S[E+2];d.push(A,w,w,D,D,A)}}else{const S=g.array;x=g.version;for(let E=0,y=S.length/3-1;E<y;E+=3){const A=E+0,w=E+1,D=E+2;d.push(A,w,w,D,D,A)}}const m=new(g.count>=65535?Kc:$c)(d,1);m.version=x;const f=a.get(h);f&&e.remove(f),a.set(h,m)}function u(h){const d=a.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&c(h)}else c(h);return a.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function mm(r,e,t){let i;function n(d){i=d}let a,s;function o(d){a=d.type,s=d.bytesPerElement}function l(d,p){r.drawElements(i,p,a,d*s),t.update(p,i,1)}function c(d,p,g){g!==0&&(r.drawElementsInstanced(i,p,a,d*s,g),t.update(p,i,g))}function u(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,a,d,0,g);let x=0;for(let m=0;m<g;m++)x+=p[m];t.update(x,i,1)}function h(d,p,g,x){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/s,p[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,a,d,0,x,0,g);let f=0;for(let S=0;S<g;S++)f+=p[S]*x[S];t.update(f,i,1)}}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function gm(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,s,o){switch(t.calls++,s){case r.TRIANGLES:t.triangles+=o*(a/3);break;case r.LINES:t.lines+=o*(a/2);break;case r.LINE_STRIP:t.lines+=o*(a-1);break;case r.LINE_LOOP:t.lines+=o*a;break;case r.POINTS:t.points+=o*a;break;default:Xe("WebGLInfo: Unknown draw mode:",s);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function _m(r,e,t){const i=new WeakMap,n=new ft;function a(s,o,l){const c=s.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==h){let p=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",p)};d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),x===!0&&(y=2),m===!0&&(y=3);let A=o.attributes.position.count*y,w=1;A>e.maxTextureSize&&(w=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const D=new Float32Array(A*w*4*h),v=new jc(D,A,w,h);v.type=sr,v.needsUpdate=!0;const T=y*4;for(let W=0;W<h;W++){const C=f[W],O=S[W],H=E[W],V=A*w*4*W;for(let k=0;k<C.count;k++){const z=k*T;g===!0&&(n.fromBufferAttribute(C,k),D[V+z+0]=n.x,D[V+z+1]=n.y,D[V+z+2]=n.z,D[V+z+3]=0),x===!0&&(n.fromBufferAttribute(O,k),D[V+z+4]=n.x,D[V+z+5]=n.y,D[V+z+6]=n.z,D[V+z+7]=0),m===!0&&(n.fromBufferAttribute(H,k),D[V+z+8]=n.x,D[V+z+9]=n.y,D[V+z+10]=n.z,D[V+z+11]=H.itemSize===4?n.w:1)}}d={count:h,texture:v,size:new De(A,w)},i.set(o,d),o.addEventListener("dispose",p)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:a}}function vm(r,e,t,i,n){let a=new WeakMap;function s(c){const u=n.render.frame,h=c.geometry,d=e.get(c,h);if(a.get(d)!==u&&(e.update(d),a.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),a.get(c)!==u&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),a.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;a.get(p)!==u&&(p.update(),a.set(p,u))}return d}function o(){a=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:o}}const Mm={[Rc]:"LINEAR_TONE_MAPPING",[Pc]:"REINHARD_TONE_MAPPING",[Lc]:"CINEON_TONE_MAPPING",[Dc]:"ACES_FILMIC_TONE_MAPPING",[Uc]:"AGX_TONE_MAPPING",[Nc]:"NEUTRAL_TONE_MAPPING",[Ic]:"CUSTOM_TONE_MAPPING"};function xm(r,e,t,i,n){const a=new Gt(e,t,{type:r,depthBuffer:i,stencilBuffer:n}),s=new Gt(e,t,{type:qt,depthBuffer:!1,stencilBuffer:!1}),o=new ht;o.setAttribute("position",new Nt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Nt([0,2,0,0,2,0],2));const l=new ad({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new rt(o,l),u=new Ua(-1,1,1,-1,0,1);let h=null,d=null,p=!1,g,x=null,m=[],f=!1;this.setSize=function(S,E){a.setSize(S,E),s.setSize(S,E);for(let y=0;y<m.length;y++){const A=m[y];A.setSize&&A.setSize(S,E)}},this.setEffects=function(S){m=S,f=m.length>0&&m[0].isRenderPass===!0;const E=a.width,y=a.height;for(let A=0;A<m.length;A++){const w=m[A];w.setSize&&w.setSize(E,y)}},this.begin=function(S,E){if(p||S.toneMapping===_r&&m.length===0)return!1;if(x=E,E!==null){const y=E.width,A=E.height;(a.width!==y||a.height!==A)&&this.setSize(y,A)}return f===!1&&S.setRenderTarget(a),g=S.toneMapping,S.toneMapping=_r,!0},this.hasRenderPass=function(){return f},this.end=function(S,E){S.toneMapping=g,p=!0;let y=a,A=s;for(let w=0;w<m.length;w++){const D=m[w];if(D.enabled!==!1&&(D.render(S,A,y,E),D.needsSwap!==!1)){const v=y;y=A,A=v}}if(h!==S.outputColorSpace||d!==S.toneMapping){h=S.outputColorSpace,d=S.toneMapping,l.defines={},je.getTransfer(h)===Ze&&(l.defines.SRGB_TRANSFER="");const w=Mm[d];w&&(l.defines[w]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=y.texture,S.setRenderTarget(x),S.render(c,u),x=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.dispose(),s.dispose(),o.dispose(),l.dispose()}}const su=new $t,yo=new yn(1,1),ou=new jc,lu=new Lh,cu=new eu,Wl=[],Xl=[],jl=new Float32Array(16),Yl=new Float32Array(9),ql=new Float32Array(4);function Zi(r,e,t){const i=r[0];if(i<=0||i>0)return r;const n=e*t;let a=Wl[n];if(a===void 0&&(a=new Float32Array(n),Wl[n]=a),e!==0){i.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,r[s].toArray(a,o)}return a}function bt(r,e){if(r.length!==e.length)return!1;for(let t=0,i=r.length;t<i;t++)if(r[t]!==e[t])return!1;return!0}function Et(r,e){for(let t=0,i=e.length;t<i;t++)r[t]=e[t]}function Oa(r,e){let t=Xl[e];t===void 0&&(t=new Int32Array(e),Xl[e]=t);for(let i=0;i!==e;++i)t[i]=r.allocateTextureUnit();return t}function Sm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function ym(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;r.uniform2fv(this.addr,e),Et(t,e)}}function bm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bt(t,e))return;r.uniform3fv(this.addr,e),Et(t,e)}}function Em(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;r.uniform4fv(this.addr,e),Et(t,e)}}function Tm(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(bt(t,i))return;ql.set(i),r.uniformMatrix2fv(this.addr,!1,ql),Et(t,i)}}function wm(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(bt(t,i))return;Yl.set(i),r.uniformMatrix3fv(this.addr,!1,Yl),Et(t,i)}}function Am(r,e){const t=this.cache,i=e.elements;if(i===void 0){if(bt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(bt(t,i))return;jl.set(i),r.uniformMatrix4fv(this.addr,!1,jl),Et(t,i)}}function Cm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Rm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;r.uniform2iv(this.addr,e),Et(t,e)}}function Pm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;r.uniform3iv(this.addr,e),Et(t,e)}}function Lm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;r.uniform4iv(this.addr,e),Et(t,e)}}function Dm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Im(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bt(t,e))return;r.uniform2uiv(this.addr,e),Et(t,e)}}function Um(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bt(t,e))return;r.uniform3uiv(this.addr,e),Et(t,e)}}function Nm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bt(t,e))return;r.uniform4uiv(this.addr,e),Et(t,e)}}function Om(r,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n);let a;this.type===r.SAMPLER_2D_SHADOW?(yo.compareFunction=t.isReversedDepthBuffer()?Ho:zo,a=yo):a=su,t.setTexture2D(e||a,n)}function Fm(r,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||lu,n)}function Bm(r,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||cu,n)}function zm(r,e,t){const i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||ou,n)}function Hm(r){switch(r){case 5126:return Sm;case 35664:return ym;case 35665:return bm;case 35666:return Em;case 35674:return Tm;case 35675:return wm;case 35676:return Am;case 5124:case 35670:return Cm;case 35667:case 35671:return Rm;case 35668:case 35672:return Pm;case 35669:case 35673:return Lm;case 5125:return Dm;case 36294:return Im;case 36295:return Um;case 36296:return Nm;case 35678:case 36198:case 36298:case 36306:case 35682:return Om;case 35679:case 36299:case 36307:return Fm;case 35680:case 36300:case 36308:case 36293:return Bm;case 36289:case 36303:case 36311:case 36292:return zm}}function km(r,e){r.uniform1fv(this.addr,e)}function Gm(r,e){const t=Zi(e,this.size,2);r.uniform2fv(this.addr,t)}function Vm(r,e){const t=Zi(e,this.size,3);r.uniform3fv(this.addr,t)}function Wm(r,e){const t=Zi(e,this.size,4);r.uniform4fv(this.addr,t)}function Xm(r,e){const t=Zi(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function jm(r,e){const t=Zi(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Ym(r,e){const t=Zi(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function qm(r,e){r.uniform1iv(this.addr,e)}function $m(r,e){r.uniform2iv(this.addr,e)}function Km(r,e){r.uniform3iv(this.addr,e)}function Zm(r,e){r.uniform4iv(this.addr,e)}function Jm(r,e){r.uniform1uiv(this.addr,e)}function Qm(r,e){r.uniform2uiv(this.addr,e)}function eg(r,e){r.uniform3uiv(this.addr,e)}function tg(r,e){r.uniform4uiv(this.addr,e)}function rg(r,e,t){const i=this.cache,n=e.length,a=Oa(t,n);bt(i,a)||(r.uniform1iv(this.addr,a),Et(i,a));let s;this.type===r.SAMPLER_2D_SHADOW?s=yo:s=su;for(let o=0;o!==n;++o)t.setTexture2D(e[o]||s,a[o])}function ig(r,e,t){const i=this.cache,n=e.length,a=Oa(t,n);bt(i,a)||(r.uniform1iv(this.addr,a),Et(i,a));for(let s=0;s!==n;++s)t.setTexture3D(e[s]||lu,a[s])}function ng(r,e,t){const i=this.cache,n=e.length,a=Oa(t,n);bt(i,a)||(r.uniform1iv(this.addr,a),Et(i,a));for(let s=0;s!==n;++s)t.setTextureCube(e[s]||cu,a[s])}function ag(r,e,t){const i=this.cache,n=e.length,a=Oa(t,n);bt(i,a)||(r.uniform1iv(this.addr,a),Et(i,a));for(let s=0;s!==n;++s)t.setTexture2DArray(e[s]||ou,a[s])}function sg(r){switch(r){case 5126:return km;case 35664:return Gm;case 35665:return Vm;case 35666:return Wm;case 35674:return Xm;case 35675:return jm;case 35676:return Ym;case 5124:case 35670:return qm;case 35667:case 35671:return $m;case 35668:case 35672:return Km;case 35669:case 35673:return Zm;case 5125:return Jm;case 36294:return Qm;case 36295:return eg;case 36296:return tg;case 35678:case 36198:case 36298:case 36306:case 35682:return rg;case 35679:case 36299:case 36307:return ig;case 35680:case 36300:case 36308:case 36293:return ng;case 36289:case 36303:case 36311:case 36292:return ag}}class og{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Hm(t.type)}}class lg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sg(t.type)}}class cg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const n=this.seq;for(let a=0,s=n.length;a!==s;++a){const o=n[a];o.setValue(e,t[o.id],i)}}}const vs=/(\w+)(\])?(\[|\.)?/g;function $l(r,e){r.seq.push(e),r.map[e.id]=e}function ug(r,e,t){const i=r.name,n=i.length;for(vs.lastIndex=0;;){const a=vs.exec(i),s=vs.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===n){$l(t,c===void 0?new og(o,r,e):new lg(o,r,e));break}else{let u=t.map[o];u===void 0&&(u=new cg(o),$l(t,u)),t=u}}}class ma{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const o=e.getActiveUniform(t,s),l=e.getUniformLocation(t,o.name);ug(o,l,this)}const n=[],a=[];for(const s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?n.push(s):a.push(s);n.length>0&&(this.seq=n.concat(a))}setValue(e,t,i,n){const a=this.map[t];a!==void 0&&a.setValue(e,i,n)}setOptional(e,t,i){const n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let a=0,s=t.length;a!==s;++a){const o=t[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){const i=[];for(let n=0,a=e.length;n!==a;++n){const s=e[n];s.id in t&&i.push(s)}return i}}function Kl(r,e,t){const i=r.createShader(e);return r.shaderSource(i,t),r.compileShader(i),i}const hg=37297;let dg=0;function pg(r,e){const t=r.split(`
`),i=[],n=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=n;s<a;s++){const o=s+1;i.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return i.join(`
`)}const Zl=new He;function fg(r){je._getMatrix(Zl,je.workingColorSpace,r);const e=`mat3( ${Zl.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(r)){case Ea:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return Ue("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Jl(r,e,t){const i=r.getShaderParameter(e,r.COMPILE_STATUS),n=(r.getShaderInfoLog(e)||"").trim();if(i&&n==="")return"";const a=/ERROR: 0:(\d+)/.exec(n);if(a){const s=parseInt(a[1]);return t.toUpperCase()+`

`+n+`

`+pg(r.getShaderSource(e),s)}else return n}function mg(r,e){const t=fg(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const gg={[Rc]:"Linear",[Pc]:"Reinhard",[Lc]:"Cineon",[Dc]:"ACESFilmic",[Uc]:"AgX",[Nc]:"Neutral",[Ic]:"Custom"};function _g(r,e){const t=gg[e];return t===void 0?(Ue("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ia=new P;function vg(){je.getLuminanceCoefficients(ia);const r=ia.x.toFixed(4),e=ia.y.toFixed(4),t=ia.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Mg(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fn).join(`
`)}function xg(r){const e=[];for(const t in r){const i=r[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Sg(r,e){const t={},i=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const a=r.getActiveAttrib(e,n),s=a.name;let o=1;a.type===r.FLOAT_MAT2&&(o=2),a.type===r.FLOAT_MAT3&&(o=3),a.type===r.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:r.getAttribLocation(e,s),locationSize:o}}return t}function fn(r){return r!==""}function Ql(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ec(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const yg=/^[ \t]*#include +<([\w\d./]+)>/gm;function bo(r){return r.replace(yg,Eg)}const bg=new Map;function Eg(r,e){let t=Be[e];if(t===void 0){const i=bg.get(e);if(i!==void 0)t=Be[i],Ue('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return bo(t)}const Tg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tc(r){return r.replace(Tg,wg)}function wg(r,e,t,i){let n="";for(let a=parseInt(e);a<parseInt(t);a++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return n}function rc(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Ag={[oa]:"SHADOWMAP_TYPE_PCF",[pn]:"SHADOWMAP_TYPE_VSM"};function Cg(r){return Ag[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Rg={[ui]:"ENVMAP_TYPE_CUBE",[Wi]:"ENVMAP_TYPE_CUBE",[Da]:"ENVMAP_TYPE_CUBE_UV"};function Pg(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":Rg[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const Lg={[Wi]:"ENVMAP_MODE_REFRACTION"};function Dg(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":Lg[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Ig={[Cc]:"ENVMAP_BLENDING_MULTIPLY",[oh]:"ENVMAP_BLENDING_MIX",[lh]:"ENVMAP_BLENDING_ADD"};function Ug(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":Ig[r.combine]||"ENVMAP_BLENDING_NONE"}function Ng(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Og(r,e,t,i){const n=r.getContext(),a=t.defines;let s=t.vertexShader,o=t.fragmentShader;const l=Cg(t),c=Pg(t),u=Dg(t),h=Ug(t),d=Ng(t),p=Mg(t),g=xg(a),x=n.createProgram();let m,f,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(fn).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(fn).join(`
`),f.length>0&&(f+=`
`)):(m=[rc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fn).join(`
`),f=[rc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_r?"#define TONE_MAPPING":"",t.toneMapping!==_r?Be.tonemapping_pars_fragment:"",t.toneMapping!==_r?_g("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,mg("linearToOutputTexel",t.outputColorSpace),vg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fn).join(`
`)),s=bo(s),s=Ql(s,t),s=ec(s,t),o=bo(o),o=Ql(o,t),o=ec(o,t),s=tc(s),o=tc(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===ll?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ll?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=S+m+s,y=S+f+o,A=Kl(n,n.VERTEX_SHADER,E),w=Kl(n,n.FRAGMENT_SHADER,y);n.attachShader(x,A),n.attachShader(x,w),t.index0AttributeName!==void 0?n.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x);function D(C){if(r.debug.checkShaderErrors){const O=n.getProgramInfoLog(x)||"",H=n.getShaderInfoLog(A)||"",V=n.getShaderInfoLog(w)||"",k=O.trim(),z=H.trim(),F=V.trim();let Q=!0,K=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1)if(Q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(n,x,A,w);else{const le=Jl(n,A,"vertex"),de=Jl(n,w,"fragment");Xe("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+k+`
`+le+`
`+de)}else k!==""?Ue("WebGLProgram: Program Info Log:",k):(z===""||F==="")&&(K=!1);K&&(C.diagnostics={runnable:Q,programLog:k,vertexShader:{log:z,prefix:m},fragmentShader:{log:F,prefix:f}})}n.deleteShader(A),n.deleteShader(w),v=new ma(n,x),T=Sg(n,x)}let v;this.getUniforms=function(){return v===void 0&&D(this),v};let T;this.getAttributes=function(){return T===void 0&&D(this),T};let W=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=n.getProgramParameter(x,hg)),W},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dg++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=w,this}let Fg=0;class Bg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,n=this._getShaderStage(t),a=this._getShaderStage(i),s=this._getShaderCacheForMaterial(e);return s.has(n)===!1&&(s.add(n),n.usedTimes++),s.has(a)===!1&&(s.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new zg(e),t.set(e,i)),i}}class zg{constructor(e){this.id=Fg++,this.code=e,this.usedTimes=0}}function Hg(r,e,t,i,n,a){const s=new Go,o=new Bg,l=new Set,c=[],u=new Map,h=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,T,W,C,O){const H=C.fog,V=O.geometry,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?C.environment:null,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,F=e.get(v.envMap||k,z),Q=F&&F.mapping===Da?F.image.height:null,K=p[v.type];v.precision!==null&&(d=i.getMaxPrecision(v.precision),d!==v.precision&&Ue("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const le=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,de=le!==void 0?le.length:0;let Me=0;V.morphAttributes.position!==void 0&&(Me=1),V.morphAttributes.normal!==void 0&&(Me=2),V.morphAttributes.color!==void 0&&(Me=3);let ne,Fe,Ne,j;if(K){const Ke=pr[K];ne=Ke.vertexShader,Fe=Ke.fragmentShader}else ne=v.vertexShader,Fe=v.fragmentShader,o.update(v),Ne=o.getVertexShaderID(v),j=o.getFragmentShaderID(v);const Z=r.getRenderTarget(),ae=r.state.buffers.depth.getReversed(),Oe=O.isInstancedMesh===!0,Ae=O.isBatchedMesh===!0,pe=!!v.map,qe=!!v.matcap,Qe=!!F,Ge=!!v.aoMap,xt=!!v.lightMap,gt=!!v.bumpMap,wt=!!v.normalMap,R=!!v.displacementMap,_t=!!v.emissiveMap,$e=!!v.metalnessMap,it=!!v.roughnessMap,xe=v.anisotropy>0,b=v.clearcoat>0,_=v.dispersion>0,I=v.iridescence>0,Y=v.sheen>0,$=v.transmission>0,q=xe&&!!v.anisotropyMap,Se=b&&!!v.clearcoatMap,se=b&&!!v.clearcoatNormalMap,Te=b&&!!v.clearcoatRoughnessMap,ye=I&&!!v.iridescenceMap,J=I&&!!v.iridescenceThicknessMap,re=Y&&!!v.sheenColorMap,be=Y&&!!v.sheenRoughnessMap,ve=!!v.specularMap,he=!!v.specularColorMap,Ve=!!v.specularIntensityMap,L=$&&!!v.transmissionMap,oe=$&&!!v.thicknessMap,te=!!v.gradientMap,ge=!!v.alphaMap,ee=v.alphaTest>0,X=!!v.alphaHash,_e=!!v.extensions;let Le=_r;v.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Le=r.toneMapping);const St={shaderID:K,shaderType:v.type,shaderName:v.name,vertexShader:ne,fragmentShader:Fe,defines:v.defines,customVertexShaderID:Ne,customFragmentShaderID:j,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:Ae,batchingColor:Ae&&O._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&O.instanceColor!==null,instancingMorph:Oe&&O.morphTexture!==null,outputColorSpace:Z===null?r.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:ji,alphaToCoverage:!!v.alphaToCoverage,map:pe,matcap:qe,envMap:Qe,envMapMode:Qe&&F.mapping,envMapCubeUVHeight:Q,aoMap:Ge,lightMap:xt,bumpMap:gt,normalMap:wt,displacementMap:R,emissiveMap:_t,normalMapObjectSpace:wt&&v.normalMapType===ph,normalMapTangentSpace:wt&&v.normalMapType===dh,metalnessMap:$e,roughnessMap:it,anisotropy:xe,anisotropyMap:q,clearcoat:b,clearcoatMap:Se,clearcoatNormalMap:se,clearcoatRoughnessMap:Te,dispersion:_,iridescence:I,iridescenceMap:ye,iridescenceThicknessMap:J,sheen:Y,sheenColorMap:re,sheenRoughnessMap:be,specularMap:ve,specularColorMap:he,specularIntensityMap:Ve,transmission:$,transmissionMap:L,thicknessMap:oe,gradientMap:te,opaque:v.transparent===!1&&v.blending===ci&&v.alphaToCoverage===!1,alphaMap:ge,alphaTest:ee,alphaHash:X,combine:v.combine,mapUv:pe&&g(v.map.channel),aoMapUv:Ge&&g(v.aoMap.channel),lightMapUv:xt&&g(v.lightMap.channel),bumpMapUv:gt&&g(v.bumpMap.channel),normalMapUv:wt&&g(v.normalMap.channel),displacementMapUv:R&&g(v.displacementMap.channel),emissiveMapUv:_t&&g(v.emissiveMap.channel),metalnessMapUv:$e&&g(v.metalnessMap.channel),roughnessMapUv:it&&g(v.roughnessMap.channel),anisotropyMapUv:q&&g(v.anisotropyMap.channel),clearcoatMapUv:Se&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:se&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:J&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:re&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:be&&g(v.sheenRoughnessMap.channel),specularMapUv:ve&&g(v.specularMap.channel),specularColorMapUv:he&&g(v.specularColorMap.channel),specularIntensityMapUv:Ve&&g(v.specularIntensityMap.channel),transmissionMapUv:L&&g(v.transmissionMap.channel),thicknessMapUv:oe&&g(v.thicknessMap.channel),alphaMapUv:ge&&g(v.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(wt||xe),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!V.attributes.uv&&(pe||ge),fog:!!H,useFog:v.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||V.attributes.normal===void 0&&wt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ae,skinning:O.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:Me,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&W.length>0,shadowMapType:r.shadowMap.type,toneMapping:Le,decodeVideoTexture:pe&&v.map.isVideoTexture===!0&&je.getTransfer(v.map.colorSpace)===Ze,decodeVideoTextureEmissive:_t&&v.emissiveMap.isVideoTexture===!0&&je.getTransfer(v.emissiveMap.colorSpace)===Ze,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===nr,flipSided:v.side===Ut,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:_e&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&v.extensions.multiDraw===!0||Ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return St.vertexUv1s=l.has(1),St.vertexUv2s=l.has(2),St.vertexUv3s=l.has(3),l.clear(),St}function m(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const W in v.defines)T.push(W),T.push(v.defines[W]);return v.isRawShaderMaterial===!1&&(f(T,v),S(T,v),T.push(r.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function f(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function S(v,T){s.disableAll(),T.instancing&&s.enable(0),T.instancingColor&&s.enable(1),T.instancingMorph&&s.enable(2),T.matcap&&s.enable(3),T.envMap&&s.enable(4),T.normalMapObjectSpace&&s.enable(5),T.normalMapTangentSpace&&s.enable(6),T.clearcoat&&s.enable(7),T.iridescence&&s.enable(8),T.alphaTest&&s.enable(9),T.vertexColors&&s.enable(10),T.vertexAlphas&&s.enable(11),T.vertexUv1s&&s.enable(12),T.vertexUv2s&&s.enable(13),T.vertexUv3s&&s.enable(14),T.vertexTangents&&s.enable(15),T.anisotropy&&s.enable(16),T.alphaHash&&s.enable(17),T.batching&&s.enable(18),T.dispersion&&s.enable(19),T.batchingColor&&s.enable(20),T.gradientMap&&s.enable(21),v.push(s.mask),s.disableAll(),T.fog&&s.enable(0),T.useFog&&s.enable(1),T.flatShading&&s.enable(2),T.logarithmicDepthBuffer&&s.enable(3),T.reversedDepthBuffer&&s.enable(4),T.skinning&&s.enable(5),T.morphTargets&&s.enable(6),T.morphNormals&&s.enable(7),T.morphColors&&s.enable(8),T.premultipliedAlpha&&s.enable(9),T.shadowMapEnabled&&s.enable(10),T.doubleSided&&s.enable(11),T.flipSided&&s.enable(12),T.useDepthPacking&&s.enable(13),T.dithering&&s.enable(14),T.transmission&&s.enable(15),T.sheen&&s.enable(16),T.opaque&&s.enable(17),T.pointsUvs&&s.enable(18),T.decodeVideoTexture&&s.enable(19),T.decodeVideoTextureEmissive&&s.enable(20),T.alphaToCoverage&&s.enable(21),v.push(s.mask)}function E(v){const T=p[v.type];let W;if(T){const C=pr[T];W=Ra.clone(C.uniforms)}else W=v.uniforms;return W}function y(v,T){let W=u.get(T);return W!==void 0?++W.usedTimes:(W=new Og(r,T,v,n),c.push(W),u.set(T,W)),W}function A(v){if(--v.usedTimes===0){const T=c.indexOf(v);c[T]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function w(v){o.remove(v)}function D(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:E,acquireProgram:y,releaseProgram:A,releaseShaderCache:w,programs:c,dispose:D}}function kg(){let r=new WeakMap;function e(s){return r.has(s)}function t(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function i(s){r.delete(s)}function n(s,o,l){r.get(s)[o]=l}function a(){r=new WeakMap}return{has:e,get:t,remove:i,update:n,dispose:a}}function Gg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function ic(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function nc(){const r=[];let e=0;const t=[],i=[],n=[];function a(){e=0,t.length=0,i.length=0,n.length=0}function s(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,g,x,m,f){let S=r[e];return S===void 0?(S={id:d.id,object:d,geometry:p,material:g,materialVariant:s(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:f},r[e]=S):(S.id=d.id,S.object=d,S.geometry=p,S.material=g,S.materialVariant=s(d),S.groupOrder=x,S.renderOrder=d.renderOrder,S.z=m,S.group=f),e++,S}function l(d,p,g,x,m,f){const S=o(d,p,g,x,m,f);g.transmission>0?i.push(S):g.transparent===!0?n.push(S):t.push(S)}function c(d,p,g,x,m,f){const S=o(d,p,g,x,m,f);g.transmission>0?i.unshift(S):g.transparent===!0?n.unshift(S):t.unshift(S)}function u(d,p){t.length>1&&t.sort(d||Gg),i.length>1&&i.sort(p||ic),n.length>1&&n.sort(p||ic)}function h(){for(let d=e,p=r.length;d<p;d++){const g=r[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:n,init:a,push:l,unshift:c,finish:h,sort:u}}function Vg(){let r=new WeakMap;function e(i,n){const a=r.get(i);let s;return a===void 0?(s=new nc,r.set(i,[s])):n>=a.length?(s=new nc,a.push(s)):s=a[n],s}function t(){r=new WeakMap}return{get:e,dispose:t}}function Wg(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new Ee};break;case"SpotLight":t={position:new P,direction:new P,color:new Ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Ee,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Ee,groundColor:new Ee};break;case"RectAreaLight":t={color:new Ee,position:new P,halfWidth:new P,halfHeight:new P};break}return r[e.id]=t,t}}}function Xg(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let jg=0;function Yg(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function qg(r){const e=new Wg,t=Xg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new P);const n=new P,a=new st,s=new st;function o(c){let u=0,h=0,d=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,S=0,E=0,y=0,A=0,w=0,D=0;c.sort(Yg);for(let T=0,W=c.length;T<W;T++){const C=c[T],O=C.color,H=C.intensity,V=C.distance;let k=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Xi?k=C.shadow.map.texture:k=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)u+=O.r*H,h+=O.g*H,d+=O.b*H;else if(C.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(C.sh.coefficients[z],H);D++}else if(C.isDirectionalLight){const z=e.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const F=C.shadow,Q=t.get(C);Q.shadowIntensity=F.intensity,Q.shadowBias=F.bias,Q.shadowNormalBias=F.normalBias,Q.shadowRadius=F.radius,Q.shadowMapSize=F.mapSize,i.directionalShadow[p]=Q,i.directionalShadowMap[p]=k,i.directionalShadowMatrix[p]=C.shadow.matrix,S++}i.directional[p]=z,p++}else if(C.isSpotLight){const z=e.get(C);z.position.setFromMatrixPosition(C.matrixWorld),z.color.copy(O).multiplyScalar(H),z.distance=V,z.coneCos=Math.cos(C.angle),z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),z.decay=C.decay,i.spot[x]=z;const F=C.shadow;if(C.map&&(i.spotLightMap[A]=C.map,A++,F.updateMatrices(C),C.castShadow&&w++),i.spotLightMatrix[x]=F.matrix,C.castShadow){const Q=t.get(C);Q.shadowIntensity=F.intensity,Q.shadowBias=F.bias,Q.shadowNormalBias=F.normalBias,Q.shadowRadius=F.radius,Q.shadowMapSize=F.mapSize,i.spotShadow[x]=Q,i.spotShadowMap[x]=k,y++}x++}else if(C.isRectAreaLight){const z=e.get(C);z.color.copy(O).multiplyScalar(H),z.halfWidth.set(C.width*.5,0,0),z.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=z,m++}else if(C.isPointLight){const z=e.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),z.distance=C.distance,z.decay=C.decay,C.castShadow){const F=C.shadow,Q=t.get(C);Q.shadowIntensity=F.intensity,Q.shadowBias=F.bias,Q.shadowNormalBias=F.normalBias,Q.shadowRadius=F.radius,Q.shadowMapSize=F.mapSize,Q.shadowCameraNear=F.camera.near,Q.shadowCameraFar=F.camera.far,i.pointShadow[g]=Q,i.pointShadowMap[g]=k,i.pointShadowMatrix[g]=C.shadow.matrix,E++}i.point[g]=z,g++}else if(C.isHemisphereLight){const z=e.get(C);z.skyColor.copy(C.color).multiplyScalar(H),z.groundColor.copy(C.groundColor).multiplyScalar(H),i.hemi[f]=z,f++}}m>0&&(r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;const v=i.hash;(v.directionalLength!==p||v.pointLength!==g||v.spotLength!==x||v.rectAreaLength!==m||v.hemiLength!==f||v.numDirectionalShadows!==S||v.numPointShadows!==E||v.numSpotShadows!==y||v.numSpotMaps!==A||v.numLightProbes!==D)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=y+A-w,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=D,v.directionalLength=p,v.pointLength=g,v.spotLength=x,v.rectAreaLength=m,v.hemiLength=f,v.numDirectionalShadows=S,v.numPointShadows=E,v.numSpotShadows=y,v.numSpotMaps=A,v.numLightProbes=D,i.version=jg++)}function l(c,u){let h=0,d=0,p=0,g=0,x=0;const m=u.matrixWorldInverse;for(let f=0,S=c.length;f<S;f++){const E=c[f];if(E.isDirectionalLight){const y=i.directional[h];y.direction.setFromMatrixPosition(E.matrixWorld),n.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(n),y.direction.transformDirection(m),h++}else if(E.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(E.matrixWorld),n.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(n),y.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),s.identity(),a.copy(E.matrixWorld),a.premultiply(m),s.extractRotation(a),y.halfWidth.set(E.width*.5,0,0),y.halfHeight.set(0,E.height*.5,0),y.halfWidth.applyMatrix4(s),y.halfHeight.applyMatrix4(s),g++}else if(E.isPointLight){const y=i.point[d];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){const y=i.hemi[x];y.direction.setFromMatrixPosition(E.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:i}}function ac(r){const e=new qg(r),t=[],i=[];function n(u){c.camera=u,t.length=0,i.length=0}function a(u){t.push(u)}function s(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:n,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:s}}function $g(r){let e=new WeakMap;function t(n,a=0){const s=e.get(n);let o;return s===void 0?(o=new ac(r),e.set(n,[o])):a>=s.length?(o=new ac(r),s.push(o)):o=s[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Kg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Zg=`uniform sampler2D shadow_pass;
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
}`,Jg=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],Qg=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],sc=new st,hn=new P,Ms=new P;function e_(r,e,t){let i=new Jc;const n=new De,a=new De,s=new ft,o=new sd,l=new od,c={},u=t.maxTextureSize,h={[lr]:Ut,[Ut]:lr,[nr]:nr},d=new ct({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:Kg,fragmentShader:Zg}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new ht;g.setAttribute("position",new Vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new rt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oa;let f=this.type;this.render=function(w,D,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===Gu&&(Ue("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=oa);const T=r.getRenderTarget(),W=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),O=r.state;O.setBlending(gr),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const H=f!==this.type;H&&D.traverse(function(V){V.material&&(Array.isArray(V.material)?V.material.forEach(k=>k.needsUpdate=!0):V.material.needsUpdate=!0)});for(let V=0,k=w.length;V<k;V++){const z=w[V],F=z.shadow;if(F===void 0){Ue("WebGLShadowMap:",z,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;n.copy(F.mapSize);const Q=F.getFrameExtents();n.multiply(Q),a.copy(F.mapSize),(n.x>u||n.y>u)&&(n.x>u&&(a.x=Math.floor(u/Q.x),n.x=a.x*Q.x,F.mapSize.x=a.x),n.y>u&&(a.y=Math.floor(u/Q.y),n.y=a.y*Q.y,F.mapSize.y=a.y));const K=r.state.buffers.depth.getReversed();if(F.camera._reversedDepth=K,F.map===null||H===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===pn){if(z.isPointLight){Ue("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new Gt(n.x,n.y,{format:Xi,type:qt,minFilter:Rt,magFilter:Rt,generateMipmaps:!1}),F.map.texture.name=z.name+".shadowMap",F.map.depthTexture=new yn(n.x,n.y,sr),F.map.depthTexture.name=z.name+".shadowMapDepth",F.map.depthTexture.format=Ur,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Ct,F.map.depthTexture.magFilter=Ct}else z.isPointLight?(F.map=new au(n.x),F.map.depthTexture=new Kh(n.x,Mr)):(F.map=new Gt(n.x,n.y),F.map.depthTexture=new yn(n.x,n.y,Mr)),F.map.depthTexture.name=z.name+".shadowMap",F.map.depthTexture.format=Ur,this.type===oa?(F.map.depthTexture.compareFunction=K?Ho:zo,F.map.depthTexture.minFilter=Rt,F.map.depthTexture.magFilter=Rt):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Ct,F.map.depthTexture.magFilter=Ct);F.camera.updateProjectionMatrix()}const le=F.map.isWebGLCubeRenderTarget?6:1;for(let de=0;de<le;de++){if(F.map.isWebGLCubeRenderTarget)r.setRenderTarget(F.map,de),r.clear();else{de===0&&(r.setRenderTarget(F.map),r.clear());const Me=F.getViewport(de);s.set(a.x*Me.x,a.y*Me.y,a.x*Me.z,a.y*Me.w),O.viewport(s)}if(z.isPointLight){const Me=F.camera,ne=F.matrix,Fe=z.distance||Me.far;Fe!==Me.far&&(Me.far=Fe,Me.updateProjectionMatrix()),hn.setFromMatrixPosition(z.matrixWorld),Me.position.copy(hn),Ms.copy(Me.position),Ms.add(Jg[de]),Me.up.copy(Qg[de]),Me.lookAt(Ms),Me.updateMatrixWorld(),ne.makeTranslation(-hn.x,-hn.y,-hn.z),sc.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),F._frustum.setFromProjectionMatrix(sc,Me.coordinateSystem,Me.reversedDepth)}else F.updateMatrices(z);i=F.getFrustum(),y(D,v,F.camera,z,this.type)}F.isPointLightShadow!==!0&&this.type===pn&&S(F,v),F.needsUpdate=!1}f=this.type,m.needsUpdate=!1,r.setRenderTarget(T,W,C)};function S(w,D){const v=e.update(x);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Gt(n.x,n.y,{format:Xi,type:qt})),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(D,null,v,d,x,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(D,null,v,p,x,null)}function E(w,D,v,T){let W=null;const C=v.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)W=C;else if(W=v.isPointLight===!0?l:o,r.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const O=W.uuid,H=D.uuid;let V=c[O];V===void 0&&(V={},c[O]=V);let k=V[H];k===void 0&&(k=W.clone(),V[H]=k,D.addEventListener("dispose",A)),W=k}if(W.visible=D.visible,W.wireframe=D.wireframe,T===pn?W.side=D.shadowSide!==null?D.shadowSide:D.side:W.side=D.shadowSide!==null?D.shadowSide:h[D.side],W.alphaMap=D.alphaMap,W.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,W.map=D.map,W.clipShadows=D.clipShadows,W.clippingPlanes=D.clippingPlanes,W.clipIntersection=D.clipIntersection,W.displacementMap=D.displacementMap,W.displacementScale=D.displacementScale,W.displacementBias=D.displacementBias,W.wireframeLinewidth=D.wireframeLinewidth,W.linewidth=D.linewidth,v.isPointLight===!0&&W.isMeshDistanceMaterial===!0){const O=r.properties.get(W);O.light=v}return W}function y(w,D,v,T,W){if(w.visible===!1)return;if(w.layers.test(D.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&W===pn)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,w.matrixWorld);const O=e.update(w),H=w.material;if(Array.isArray(H)){const V=O.groups;for(let k=0,z=V.length;k<z;k++){const F=V[k],Q=H[F.materialIndex];if(Q&&Q.visible){const K=E(w,Q,T,W);w.onBeforeShadow(r,w,D,v,O,K,F),r.renderBufferDirect(v,null,O,K,w,F),w.onAfterShadow(r,w,D,v,O,K,F)}}}else if(H.visible){const V=E(w,H,T,W);w.onBeforeShadow(r,w,D,v,O,V,null),r.renderBufferDirect(v,null,O,V,w,null),w.onAfterShadow(r,w,D,v,O,V,null)}}const C=w.children;for(let O=0,H=C.length;O<H;O++)y(C[O],D,v,T,W)}function A(w){w.target.removeEventListener("dispose",A);for(const D in c){const v=c[D],T=w.target.uuid;T in v&&(v[T].dispose(),delete v[T])}}}function t_(r,e){function t(){let L=!1;const oe=new ft;let te=null;const ge=new ft(0,0,0,0);return{setMask:function(ee){te!==ee&&!L&&(r.colorMask(ee,ee,ee,ee),te=ee)},setLocked:function(ee){L=ee},setClear:function(ee,X,_e,Le,St){St===!0&&(ee*=Le,X*=Le,_e*=Le),oe.set(ee,X,_e,Le),ge.equals(oe)===!1&&(r.clearColor(ee,X,_e,Le),ge.copy(oe))},reset:function(){L=!1,te=null,ge.set(-1,0,0,0)}}}function i(){let L=!1,oe=!1,te=null,ge=null,ee=null;return{setReversed:function(X){if(oe!==X){const _e=e.get("EXT_clip_control");X?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),oe=X;const Le=ee;ee=null,this.setClear(Le)}},getReversed:function(){return oe},setTest:function(X){X?Z(r.DEPTH_TEST):ae(r.DEPTH_TEST)},setMask:function(X){te!==X&&!L&&(r.depthMask(X),te=X)},setFunc:function(X){if(oe&&(X=bh[X]),ge!==X){switch(X){case Ds:r.depthFunc(r.NEVER);break;case ba:r.depthFunc(r.ALWAYS);break;case Is:r.depthFunc(r.LESS);break;case Vi:r.depthFunc(r.LEQUAL);break;case Us:r.depthFunc(r.EQUAL);break;case Ns:r.depthFunc(r.GEQUAL);break;case Os:r.depthFunc(r.GREATER);break;case Fs:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ge=X}},setLocked:function(X){L=X},setClear:function(X){ee!==X&&(ee=X,oe&&(X=1-X),r.clearDepth(X))},reset:function(){L=!1,te=null,ge=null,ee=null,oe=!1}}}function n(){let L=!1,oe=null,te=null,ge=null,ee=null,X=null,_e=null,Le=null,St=null;return{setTest:function(Ke){L||(Ke?Z(r.STENCIL_TEST):ae(r.STENCIL_TEST))},setMask:function(Ke){oe!==Ke&&!L&&(r.stencilMask(Ke),oe=Ke)},setFunc:function(Ke,Sr,yr){(te!==Ke||ge!==Sr||ee!==yr)&&(r.stencilFunc(Ke,Sr,yr),te=Ke,ge=Sr,ee=yr)},setOp:function(Ke,Sr,yr){(X!==Ke||_e!==Sr||Le!==yr)&&(r.stencilOp(Ke,Sr,yr),X=Ke,_e=Sr,Le=yr)},setLocked:function(Ke){L=Ke},setClear:function(Ke){St!==Ke&&(r.clearStencil(Ke),St=Ke)},reset:function(){L=!1,oe=null,te=null,ge=null,ee=null,X=null,_e=null,Le=null,St=null}}}const a=new t,s=new i,o=new n,l=new WeakMap,c=new WeakMap;let u={},h={},d=new WeakMap,p=[],g=null,x=!1,m=null,f=null,S=null,E=null,y=null,A=null,w=null,D=new Ee(0,0,0),v=0,T=!1,W=null,C=null,O=null,H=null,V=null;const k=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,F=0;const Q=r.getParameter(r.VERSION);Q.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(Q)[1]),z=F>=1):Q.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),z=F>=2);let K=null,le={};const de=r.getParameter(r.SCISSOR_BOX),Me=r.getParameter(r.VIEWPORT),ne=new ft().fromArray(de),Fe=new ft().fromArray(Me);function Ne(L,oe,te,ge){const ee=new Uint8Array(4),X=r.createTexture();r.bindTexture(L,X),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let _e=0;_e<te;_e++)L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY?r.texImage3D(oe,0,r.RGBA,1,1,ge,0,r.RGBA,r.UNSIGNED_BYTE,ee):r.texImage2D(oe+_e,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ee);return X}const j={};j[r.TEXTURE_2D]=Ne(r.TEXTURE_2D,r.TEXTURE_2D,1),j[r.TEXTURE_CUBE_MAP]=Ne(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[r.TEXTURE_2D_ARRAY]=Ne(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),j[r.TEXTURE_3D]=Ne(r.TEXTURE_3D,r.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),Z(r.DEPTH_TEST),s.setFunc(Vi),gt(!1),wt(il),Z(r.CULL_FACE),Ge(gr);function Z(L){u[L]!==!0&&(r.enable(L),u[L]=!0)}function ae(L){u[L]!==!1&&(r.disable(L),u[L]=!1)}function Oe(L,oe){return h[L]!==oe?(r.bindFramebuffer(L,oe),h[L]=oe,L===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=oe),L===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=oe),!0):!1}function Ae(L,oe){let te=p,ge=!1;if(L){te=d.get(oe),te===void 0&&(te=[],d.set(oe,te));const ee=L.textures;if(te.length!==ee.length||te[0]!==r.COLOR_ATTACHMENT0){for(let X=0,_e=ee.length;X<_e;X++)te[X]=r.COLOR_ATTACHMENT0+X;te.length=ee.length,ge=!0}}else te[0]!==r.BACK&&(te[0]=r.BACK,ge=!0);ge&&r.drawBuffers(te)}function pe(L){return g!==L?(r.useProgram(L),g=L,!0):!1}const qe={[ai]:r.FUNC_ADD,[Wu]:r.FUNC_SUBTRACT,[Xu]:r.FUNC_REVERSE_SUBTRACT};qe[ju]=r.MIN,qe[Yu]=r.MAX;const Qe={[qu]:r.ZERO,[$u]:r.ONE,[Ku]:r.SRC_COLOR,[Ps]:r.SRC_ALPHA,[rh]:r.SRC_ALPHA_SATURATE,[eh]:r.DST_COLOR,[Ju]:r.DST_ALPHA,[Zu]:r.ONE_MINUS_SRC_COLOR,[Ls]:r.ONE_MINUS_SRC_ALPHA,[th]:r.ONE_MINUS_DST_COLOR,[Qu]:r.ONE_MINUS_DST_ALPHA,[ih]:r.CONSTANT_COLOR,[nh]:r.ONE_MINUS_CONSTANT_COLOR,[ah]:r.CONSTANT_ALPHA,[sh]:r.ONE_MINUS_CONSTANT_ALPHA};function Ge(L,oe,te,ge,ee,X,_e,Le,St,Ke){if(L===gr){x===!0&&(ae(r.BLEND),x=!1);return}if(x===!1&&(Z(r.BLEND),x=!0),L!==Vu){if(L!==m||Ke!==T){if((f!==ai||y!==ai)&&(r.blendEquation(r.FUNC_ADD),f=ai,y=ai),Ke)switch(L){case ci:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Pt:r.blendFunc(r.ONE,r.ONE);break;case nl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case al:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Xe("WebGLState: Invalid blending: ",L);break}else switch(L){case ci:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Pt:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case nl:Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case al:Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xe("WebGLState: Invalid blending: ",L);break}S=null,E=null,A=null,w=null,D.set(0,0,0),v=0,m=L,T=Ke}return}ee=ee||oe,X=X||te,_e=_e||ge,(oe!==f||ee!==y)&&(r.blendEquationSeparate(qe[oe],qe[ee]),f=oe,y=ee),(te!==S||ge!==E||X!==A||_e!==w)&&(r.blendFuncSeparate(Qe[te],Qe[ge],Qe[X],Qe[_e]),S=te,E=ge,A=X,w=_e),(Le.equals(D)===!1||St!==v)&&(r.blendColor(Le.r,Le.g,Le.b,St),D.copy(Le),v=St),m=L,T=!1}function xt(L,oe){L.side===nr?ae(r.CULL_FACE):Z(r.CULL_FACE);let te=L.side===Ut;oe&&(te=!te),gt(te),L.blending===ci&&L.transparent===!1?Ge(gr):Ge(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),s.setFunc(L.depthFunc),s.setTest(L.depthTest),s.setMask(L.depthWrite),a.setMask(L.colorWrite);const ge=L.stencilWrite;o.setTest(ge),ge&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),_t(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Z(r.SAMPLE_ALPHA_TO_COVERAGE):ae(r.SAMPLE_ALPHA_TO_COVERAGE)}function gt(L){W!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),W=L)}function wt(L){L!==Hu?(Z(r.CULL_FACE),L!==C&&(L===il?r.cullFace(r.BACK):L===ku?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ae(r.CULL_FACE),C=L}function R(L){L!==O&&(z&&r.lineWidth(L),O=L)}function _t(L,oe,te){L?(Z(r.POLYGON_OFFSET_FILL),(H!==oe||V!==te)&&(H=oe,V=te,s.getReversed()&&(oe=-oe),r.polygonOffset(oe,te))):ae(r.POLYGON_OFFSET_FILL)}function $e(L){L?Z(r.SCISSOR_TEST):ae(r.SCISSOR_TEST)}function it(L){L===void 0&&(L=r.TEXTURE0+k-1),K!==L&&(r.activeTexture(L),K=L)}function xe(L,oe,te){te===void 0&&(K===null?te=r.TEXTURE0+k-1:te=K);let ge=le[te];ge===void 0&&(ge={type:void 0,texture:void 0},le[te]=ge),(ge.type!==L||ge.texture!==oe)&&(K!==te&&(r.activeTexture(te),K=te),r.bindTexture(L,oe||j[L]),ge.type=L,ge.texture=oe)}function b(){const L=le[K];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function _(){try{r.compressedTexImage2D(...arguments)}catch(L){Xe("WebGLState:",L)}}function I(){try{r.compressedTexImage3D(...arguments)}catch(L){Xe("WebGLState:",L)}}function Y(){try{r.texSubImage2D(...arguments)}catch(L){Xe("WebGLState:",L)}}function $(){try{r.texSubImage3D(...arguments)}catch(L){Xe("WebGLState:",L)}}function q(){try{r.compressedTexSubImage2D(...arguments)}catch(L){Xe("WebGLState:",L)}}function Se(){try{r.compressedTexSubImage3D(...arguments)}catch(L){Xe("WebGLState:",L)}}function se(){try{r.texStorage2D(...arguments)}catch(L){Xe("WebGLState:",L)}}function Te(){try{r.texStorage3D(...arguments)}catch(L){Xe("WebGLState:",L)}}function ye(){try{r.texImage2D(...arguments)}catch(L){Xe("WebGLState:",L)}}function J(){try{r.texImage3D(...arguments)}catch(L){Xe("WebGLState:",L)}}function re(L){ne.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),ne.copy(L))}function be(L){Fe.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),Fe.copy(L))}function ve(L,oe){let te=c.get(oe);te===void 0&&(te=new WeakMap,c.set(oe,te));let ge=te.get(L);ge===void 0&&(ge=r.getUniformBlockIndex(oe,L.name),te.set(L,ge))}function he(L,oe){const te=c.get(oe).get(L);l.get(oe)!==te&&(r.uniformBlockBinding(oe,te,L.__bindingPointIndex),l.set(oe,te))}function Ve(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),s.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},K=null,le={},h={},d=new WeakMap,p=[],g=null,x=!1,m=null,f=null,S=null,E=null,y=null,A=null,w=null,D=new Ee(0,0,0),v=0,T=!1,W=null,C=null,O=null,H=null,V=null,ne.set(0,0,r.canvas.width,r.canvas.height),Fe.set(0,0,r.canvas.width,r.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:Z,disable:ae,bindFramebuffer:Oe,drawBuffers:Ae,useProgram:pe,setBlending:Ge,setMaterial:xt,setFlipSided:gt,setCullFace:wt,setLineWidth:R,setPolygonOffset:_t,setScissorTest:$e,activeTexture:it,bindTexture:xe,unbindTexture:b,compressedTexImage2D:_,compressedTexImage3D:I,texImage2D:ye,texImage3D:J,updateUBOMapping:ve,uniformBlockBinding:he,texStorage2D:se,texStorage3D:Te,texSubImage2D:Y,texSubImage3D:$,compressedTexSubImage2D:q,compressedTexSubImage3D:Se,scissor:re,viewport:be,reset:Ve}}function r_(r,e,t,i,n,a,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new De,u=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return p?new OffscreenCanvas(b,_):Sn("canvas")}function x(b,_,I){let Y=1;const $=xe(b);if(($.width>I||$.height>I)&&(Y=I/Math.max($.width,$.height)),Y<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const q=Math.floor(Y*$.width),Se=Math.floor(Y*$.height);h===void 0&&(h=g(q,Se));const se=_?g(q,Se):h;return se.width=q,se.height=Se,se.getContext("2d").drawImage(b,0,0,q,Se),Ue("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+q+"x"+Se+")."),se}else return"data"in b&&Ue("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),b;return b}function m(b){return b.generateMipmaps}function f(b){r.generateMipmap(b)}function S(b){return b.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?r.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function E(b,_,I,Y,$=!1){if(b!==null){if(r[b]!==void 0)return r[b];Ue("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let q=_;if(_===r.RED&&(I===r.FLOAT&&(q=r.R32F),I===r.HALF_FLOAT&&(q=r.R16F),I===r.UNSIGNED_BYTE&&(q=r.R8)),_===r.RED_INTEGER&&(I===r.UNSIGNED_BYTE&&(q=r.R8UI),I===r.UNSIGNED_SHORT&&(q=r.R16UI),I===r.UNSIGNED_INT&&(q=r.R32UI),I===r.BYTE&&(q=r.R8I),I===r.SHORT&&(q=r.R16I),I===r.INT&&(q=r.R32I)),_===r.RG&&(I===r.FLOAT&&(q=r.RG32F),I===r.HALF_FLOAT&&(q=r.RG16F),I===r.UNSIGNED_BYTE&&(q=r.RG8)),_===r.RG_INTEGER&&(I===r.UNSIGNED_BYTE&&(q=r.RG8UI),I===r.UNSIGNED_SHORT&&(q=r.RG16UI),I===r.UNSIGNED_INT&&(q=r.RG32UI),I===r.BYTE&&(q=r.RG8I),I===r.SHORT&&(q=r.RG16I),I===r.INT&&(q=r.RG32I)),_===r.RGB_INTEGER&&(I===r.UNSIGNED_BYTE&&(q=r.RGB8UI),I===r.UNSIGNED_SHORT&&(q=r.RGB16UI),I===r.UNSIGNED_INT&&(q=r.RGB32UI),I===r.BYTE&&(q=r.RGB8I),I===r.SHORT&&(q=r.RGB16I),I===r.INT&&(q=r.RGB32I)),_===r.RGBA_INTEGER&&(I===r.UNSIGNED_BYTE&&(q=r.RGBA8UI),I===r.UNSIGNED_SHORT&&(q=r.RGBA16UI),I===r.UNSIGNED_INT&&(q=r.RGBA32UI),I===r.BYTE&&(q=r.RGBA8I),I===r.SHORT&&(q=r.RGBA16I),I===r.INT&&(q=r.RGBA32I)),_===r.RGB&&(I===r.UNSIGNED_INT_5_9_9_9_REV&&(q=r.RGB9_E5),I===r.UNSIGNED_INT_10F_11F_11F_REV&&(q=r.R11F_G11F_B10F)),_===r.RGBA){const Se=$?Ea:je.getTransfer(Y);I===r.FLOAT&&(q=r.RGBA32F),I===r.HALF_FLOAT&&(q=r.RGBA16F),I===r.UNSIGNED_BYTE&&(q=Se===Ze?r.SRGB8_ALPHA8:r.RGBA8),I===r.UNSIGNED_SHORT_4_4_4_4&&(q=r.RGBA4),I===r.UNSIGNED_SHORT_5_5_5_1&&(q=r.RGB5_A1)}return(q===r.R16F||q===r.R32F||q===r.RG16F||q===r.RG32F||q===r.RGBA16F||q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function y(b,_){let I;return b?_===null||_===Mr||_===xn?I=r.DEPTH24_STENCIL8:_===sr?I=r.DEPTH32F_STENCIL8:_===Mn&&(I=r.DEPTH24_STENCIL8,Ue("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Mr||_===xn?I=r.DEPTH_COMPONENT24:_===sr?I=r.DEPTH_COMPONENT32F:_===Mn&&(I=r.DEPTH_COMPONENT16),I}function A(b,_){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ct&&b.minFilter!==Rt?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function w(b){const _=b.target;_.removeEventListener("dispose",w),v(_),_.isVideoTexture&&u.delete(_)}function D(b){const _=b.target;_.removeEventListener("dispose",D),W(_)}function v(b){const _=i.get(b);if(_.__webglInit===void 0)return;const I=b.source,Y=d.get(I);if(Y){const $=Y[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&T(b),Object.keys(Y).length===0&&d.delete(I)}i.remove(b)}function T(b){const _=i.get(b);r.deleteTexture(_.__webglTexture);const I=b.source,Y=d.get(I);delete Y[_.__cacheKey],s.memory.textures--}function W(b){const _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let $=0;$<_.__webglFramebuffer[Y].length;$++)r.deleteFramebuffer(_.__webglFramebuffer[Y][$]);else r.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&r.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)r.deleteFramebuffer(_.__webglFramebuffer[Y]);else r.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&r.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&r.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&r.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&r.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const I=b.textures;for(let Y=0,$=I.length;Y<$;Y++){const q=i.get(I[Y]);q.__webglTexture&&(r.deleteTexture(q.__webglTexture),s.memory.textures--),i.remove(I[Y])}i.remove(b)}let C=0;function O(){C=0}function H(){const b=C;return b>=n.maxTextures&&Ue("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+n.maxTextures),C+=1,b}function V(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function k(b,_){const I=i.get(b);if(b.isVideoTexture&&$e(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&I.__version!==b.version){const Y=b.image;if(Y===null)Ue("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Ue("WebGLRenderer: Texture marked for update but image is incomplete");else{j(I,b,_);return}}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,I.__webglTexture,r.TEXTURE0+_)}function z(b,_){const I=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){j(I,b,_);return}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,I.__webglTexture,r.TEXTURE0+_)}function F(b,_){const I=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){j(I,b,_);return}t.bindTexture(r.TEXTURE_3D,I.__webglTexture,r.TEXTURE0+_)}function Q(b,_){const I=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&I.__version!==b.version){Z(I,b,_);return}t.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+_)}const K={[Bs]:r.REPEAT,[Pr]:r.CLAMP_TO_EDGE,[zs]:r.MIRRORED_REPEAT},le={[Ct]:r.NEAREST,[ch]:r.NEAREST_MIPMAP_NEAREST,[In]:r.NEAREST_MIPMAP_LINEAR,[Rt]:r.LINEAR,[ka]:r.LINEAR_MIPMAP_NEAREST,[oi]:r.LINEAR_MIPMAP_LINEAR},de={[fh]:r.NEVER,[Mh]:r.ALWAYS,[mh]:r.LESS,[zo]:r.LEQUAL,[gh]:r.EQUAL,[Ho]:r.GEQUAL,[_h]:r.GREATER,[vh]:r.NOTEQUAL};function Me(b,_){if(_.type===sr&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Rt||_.magFilter===ka||_.magFilter===In||_.magFilter===oi||_.minFilter===Rt||_.minFilter===ka||_.minFilter===In||_.minFilter===oi)&&Ue("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(b,r.TEXTURE_WRAP_S,K[_.wrapS]),r.texParameteri(b,r.TEXTURE_WRAP_T,K[_.wrapT]),(b===r.TEXTURE_3D||b===r.TEXTURE_2D_ARRAY)&&r.texParameteri(b,r.TEXTURE_WRAP_R,K[_.wrapR]),r.texParameteri(b,r.TEXTURE_MAG_FILTER,le[_.magFilter]),r.texParameteri(b,r.TEXTURE_MIN_FILTER,le[_.minFilter]),_.compareFunction&&(r.texParameteri(b,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(b,r.TEXTURE_COMPARE_FUNC,de[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ct||_.minFilter!==In&&_.minFilter!==oi||_.type===sr&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");r.texParameterf(b,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,n.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function ne(b,_){let I=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",w));const Y=_.source;let $=d.get(Y);$===void 0&&($={},d.set(Y,$));const q=V(_);if(q!==b.__cacheKey){$[q]===void 0&&($[q]={texture:r.createTexture(),usedTimes:0},s.memory.textures++,I=!0),$[q].usedTimes++;const Se=$[b.__cacheKey];Se!==void 0&&($[b.__cacheKey].usedTimes--,Se.usedTimes===0&&T(_)),b.__cacheKey=q,b.__webglTexture=$[q].texture}return I}function Fe(b,_,I){return Math.floor(Math.floor(b/I)/_)}function Ne(b,_,I,Y){const $=b.updateRanges;if($.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,_.width,_.height,I,Y,_.data);else{$.sort((ye,J)=>ye.start-J.start);let q=0;for(let ye=1;ye<$.length;ye++){const J=$[q],re=$[ye],be=J.start+J.count,ve=Fe(re.start,_.width,4),he=Fe(J.start,_.width,4);re.start<=be+1&&ve===he&&Fe(re.start+re.count-1,_.width,4)===ve?J.count=Math.max(J.count,re.start+re.count-J.start):(++q,$[q]=re)}$.length=q+1;const Se=r.getParameter(r.UNPACK_ROW_LENGTH),se=r.getParameter(r.UNPACK_SKIP_PIXELS),Te=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,_.width);for(let ye=0,J=$.length;ye<J;ye++){const re=$[ye],be=Math.floor(re.start/4),ve=Math.ceil(re.count/4),he=be%_.width,Ve=Math.floor(be/_.width),L=ve;r.pixelStorei(r.UNPACK_SKIP_PIXELS,he),r.pixelStorei(r.UNPACK_SKIP_ROWS,Ve),t.texSubImage2D(r.TEXTURE_2D,0,he,Ve,L,1,I,Y,_.data)}b.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,Se),r.pixelStorei(r.UNPACK_SKIP_PIXELS,se),r.pixelStorei(r.UNPACK_SKIP_ROWS,Te)}}function j(b,_,I){let Y=r.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=r.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=r.TEXTURE_3D);const $=ne(b,_),q=_.source;t.bindTexture(Y,b.__webglTexture,r.TEXTURE0+I);const Se=i.get(q);if(q.version!==Se.__version||$===!0){t.activeTexture(r.TEXTURE0+I);const se=je.getPrimaries(je.workingColorSpace),Te=_.colorSpace===Xr?null:je.getPrimaries(_.colorSpace),ye=_.colorSpace===Xr||se===Te?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,_.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,_.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let J=x(_.image,!1,n.maxTextureSize);J=it(_,J);const re=a.convert(_.format,_.colorSpace),be=a.convert(_.type);let ve=E(_.internalFormat,re,be,_.colorSpace,_.isVideoTexture);Me(Y,_);let he;const Ve=_.mipmaps,L=_.isVideoTexture!==!0,oe=Se.__version===void 0||$===!0,te=q.dataReady,ge=A(_,J);if(_.isDepthTexture)ve=y(_.format===li,_.type),oe&&(L?t.texStorage2D(r.TEXTURE_2D,1,ve,J.width,J.height):t.texImage2D(r.TEXTURE_2D,0,ve,J.width,J.height,0,re,be,null));else if(_.isDataTexture)if(Ve.length>0){L&&oe&&t.texStorage2D(r.TEXTURE_2D,ge,ve,Ve[0].width,Ve[0].height);for(let ee=0,X=Ve.length;ee<X;ee++)he=Ve[ee],L?te&&t.texSubImage2D(r.TEXTURE_2D,ee,0,0,he.width,he.height,re,be,he.data):t.texImage2D(r.TEXTURE_2D,ee,ve,he.width,he.height,0,re,be,he.data);_.generateMipmaps=!1}else L?(oe&&t.texStorage2D(r.TEXTURE_2D,ge,ve,J.width,J.height),te&&Ne(_,J,re,be)):t.texImage2D(r.TEXTURE_2D,0,ve,J.width,J.height,0,re,be,J.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){L&&oe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ge,ve,Ve[0].width,Ve[0].height,J.depth);for(let ee=0,X=Ve.length;ee<X;ee++)if(he=Ve[ee],_.format!==or)if(re!==null)if(L){if(te)if(_.layerUpdates.size>0){const _e=Fl(he.width,he.height,_.format,_.type);for(const Le of _.layerUpdates){const St=he.data.subarray(Le*_e/he.data.BYTES_PER_ELEMENT,(Le+1)*_e/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ee,0,0,Le,he.width,he.height,1,re,St)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,J.depth,re,he.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ee,ve,he.width,he.height,J.depth,0,he.data,0,0);else Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?te&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,J.depth,re,be,he.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ee,ve,he.width,he.height,J.depth,0,re,be,he.data)}else{L&&oe&&t.texStorage2D(r.TEXTURE_2D,ge,ve,Ve[0].width,Ve[0].height);for(let ee=0,X=Ve.length;ee<X;ee++)he=Ve[ee],_.format!==or?re!==null?L?te&&t.compressedTexSubImage2D(r.TEXTURE_2D,ee,0,0,he.width,he.height,re,he.data):t.compressedTexImage2D(r.TEXTURE_2D,ee,ve,he.width,he.height,0,he.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?te&&t.texSubImage2D(r.TEXTURE_2D,ee,0,0,he.width,he.height,re,be,he.data):t.texImage2D(r.TEXTURE_2D,ee,ve,he.width,he.height,0,re,be,he.data)}else if(_.isDataArrayTexture)if(L){if(oe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ge,ve,J.width,J.height,J.depth),te)if(_.layerUpdates.size>0){const ee=Fl(J.width,J.height,_.format,_.type);for(const X of _.layerUpdates){const _e=J.data.subarray(X*ee/J.data.BYTES_PER_ELEMENT,(X+1)*ee/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,X,J.width,J.height,1,re,be,_e)}_.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,re,be,J.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,ve,J.width,J.height,J.depth,0,re,be,J.data);else if(_.isData3DTexture)L?(oe&&t.texStorage3D(r.TEXTURE_3D,ge,ve,J.width,J.height,J.depth),te&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,re,be,J.data)):t.texImage3D(r.TEXTURE_3D,0,ve,J.width,J.height,J.depth,0,re,be,J.data);else if(_.isFramebufferTexture){if(oe)if(L)t.texStorage2D(r.TEXTURE_2D,ge,ve,J.width,J.height);else{let ee=J.width,X=J.height;for(let _e=0;_e<ge;_e++)t.texImage2D(r.TEXTURE_2D,_e,ve,ee,X,0,re,be,null),ee>>=1,X>>=1}}else if(Ve.length>0){if(L&&oe){const ee=xe(Ve[0]);t.texStorage2D(r.TEXTURE_2D,ge,ve,ee.width,ee.height)}for(let ee=0,X=Ve.length;ee<X;ee++)he=Ve[ee],L?te&&t.texSubImage2D(r.TEXTURE_2D,ee,0,0,re,be,he):t.texImage2D(r.TEXTURE_2D,ee,ve,re,be,he);_.generateMipmaps=!1}else if(L){if(oe){const ee=xe(J);t.texStorage2D(r.TEXTURE_2D,ge,ve,ee.width,ee.height)}te&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,re,be,J)}else t.texImage2D(r.TEXTURE_2D,0,ve,re,be,J);m(_)&&f(Y),Se.__version=q.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Z(b,_,I){if(_.image.length!==6)return;const Y=ne(b,_),$=_.source;t.bindTexture(r.TEXTURE_CUBE_MAP,b.__webglTexture,r.TEXTURE0+I);const q=i.get($);if($.version!==q.__version||Y===!0){t.activeTexture(r.TEXTURE0+I);const Se=je.getPrimaries(je.workingColorSpace),se=_.colorSpace===Xr?null:je.getPrimaries(_.colorSpace),Te=_.colorSpace===Xr||Se===se?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,_.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,_.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const ye=_.isCompressedTexture||_.image[0].isCompressedTexture,J=_.image[0]&&_.image[0].isDataTexture,re=[];for(let X=0;X<6;X++)!ye&&!J?re[X]=x(_.image[X],!0,n.maxCubemapSize):re[X]=J?_.image[X].image:_.image[X],re[X]=it(_,re[X]);const be=re[0],ve=a.convert(_.format,_.colorSpace),he=a.convert(_.type),Ve=E(_.internalFormat,ve,he,_.colorSpace),L=_.isVideoTexture!==!0,oe=q.__version===void 0||Y===!0,te=$.dataReady;let ge=A(_,be);Me(r.TEXTURE_CUBE_MAP,_);let ee;if(ye){L&&oe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ge,Ve,be.width,be.height);for(let X=0;X<6;X++){ee=re[X].mipmaps;for(let _e=0;_e<ee.length;_e++){const Le=ee[_e];_.format!==or?ve!==null?L?te&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,0,0,Le.width,Le.height,ve,Le.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,Ve,Le.width,Le.height,0,Le.data):Ue("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,0,0,Le.width,Le.height,ve,he,Le.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,Ve,Le.width,Le.height,0,ve,he,Le.data)}}}else{if(ee=_.mipmaps,L&&oe){ee.length>0&&ge++;const X=xe(re[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ge,Ve,X.width,X.height)}for(let X=0;X<6;X++)if(J){L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,re[X].width,re[X].height,ve,he,re[X].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ve,re[X].width,re[X].height,0,ve,he,re[X].data);for(let _e=0;_e<ee.length;_e++){const Le=ee[_e].image[X].image;L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,0,0,Le.width,Le.height,ve,he,Le.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,Ve,Le.width,Le.height,0,ve,he,Le.data)}}else{L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,ve,he,re[X]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ve,ve,he,re[X]);for(let _e=0;_e<ee.length;_e++){const Le=ee[_e];L?te&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,0,0,ve,he,Le.image[X]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,Ve,ve,he,Le.image[X])}}}m(_)&&f(r.TEXTURE_CUBE_MAP),q.__version=$.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function ae(b,_,I,Y,$,q){const Se=a.convert(I.format,I.colorSpace),se=a.convert(I.type),Te=E(I.internalFormat,Se,se,I.colorSpace),ye=i.get(_),J=i.get(I);if(J.__renderTarget=_,!ye.__hasExternalTextures){const re=Math.max(1,_.width>>q),be=Math.max(1,_.height>>q);$===r.TEXTURE_3D||$===r.TEXTURE_2D_ARRAY?t.texImage3D($,q,Te,re,be,_.depth,0,Se,se,null):t.texImage2D($,q,Te,re,be,0,Se,se,null)}t.bindFramebuffer(r.FRAMEBUFFER,b),_t(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Y,$,J.__webglTexture,0,R(_)):($===r.TEXTURE_2D||$>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Y,$,J.__webglTexture,q),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Oe(b,_,I){if(r.bindRenderbuffer(r.RENDERBUFFER,b),_.depthBuffer){const Y=_.depthTexture,$=Y&&Y.isDepthTexture?Y.type:null,q=y(_.stencilBuffer,$),Se=_.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;_t(_)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,R(_),q,_.width,_.height):I?r.renderbufferStorageMultisample(r.RENDERBUFFER,R(_),q,_.width,_.height):r.renderbufferStorage(r.RENDERBUFFER,q,_.width,_.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Se,r.RENDERBUFFER,b)}else{const Y=_.textures;for(let $=0;$<Y.length;$++){const q=Y[$],Se=a.convert(q.format,q.colorSpace),se=a.convert(q.type),Te=E(q.internalFormat,Se,se,q.colorSpace);_t(_)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,R(_),Te,_.width,_.height):I?r.renderbufferStorageMultisample(r.RENDERBUFFER,R(_),Te,_.width,_.height):r.renderbufferStorage(r.RENDERBUFFER,Te,_.width,_.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ae(b,_,I){const Y=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=i.get(_.depthTexture);if($.__renderTarget=_,(!$.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y){if($.__webglInit===void 0&&($.__webglInit=!0,_.depthTexture.addEventListener("dispose",w)),$.__webglTexture===void 0){$.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,$.__webglTexture),Me(r.TEXTURE_CUBE_MAP,_.depthTexture);const ye=a.convert(_.depthTexture.format),J=a.convert(_.depthTexture.type);let re;_.depthTexture.format===Ur?re=r.DEPTH_COMPONENT24:_.depthTexture.format===li&&(re=r.DEPTH24_STENCIL8);for(let be=0;be<6;be++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,re,_.width,_.height,0,ye,J,null)}}else k(_.depthTexture,0);const q=$.__webglTexture,Se=R(_),se=Y?r.TEXTURE_CUBE_MAP_POSITIVE_X+I:r.TEXTURE_2D,Te=_.depthTexture.format===li?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(_.depthTexture.format===Ur)_t(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Te,se,q,0,Se):r.framebufferTexture2D(r.FRAMEBUFFER,Te,se,q,0);else if(_.depthTexture.format===li)_t(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Te,se,q,0,Se):r.framebufferTexture2D(r.FRAMEBUFFER,Te,se,q,0);else throw new Error("Unknown depthTexture format")}function pe(b){const _=i.get(b),I=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const Y=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const $=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",$)};Y.addEventListener("dispose",$),_.__depthDisposeCallback=$}_.__boundDepthTexture=Y}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(I)for(let Y=0;Y<6;Y++)Ae(_.__webglFramebuffer[Y],b,Y);else{const Y=b.texture.mipmaps;Y&&Y.length>0?Ae(_.__webglFramebuffer[0],b,0):Ae(_.__webglFramebuffer,b,0)}else if(I){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=r.createRenderbuffer(),Oe(_.__webglDepthbuffer[Y],b,!1);else{const $=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,q=_.__webglDepthbuffer[Y];r.bindRenderbuffer(r.RENDERBUFFER,q),r.framebufferRenderbuffer(r.FRAMEBUFFER,$,r.RENDERBUFFER,q)}}else{const Y=b.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=r.createRenderbuffer(),Oe(_.__webglDepthbuffer,b,!1);else{const $=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,q=_.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,q),r.framebufferRenderbuffer(r.FRAMEBUFFER,$,r.RENDERBUFFER,q)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function qe(b,_,I){const Y=i.get(b);_!==void 0&&ae(Y.__webglFramebuffer,b,b.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),I!==void 0&&pe(b)}function Qe(b){const _=b.texture,I=i.get(b),Y=i.get(_);b.addEventListener("dispose",D);const $=b.textures,q=b.isWebGLCubeRenderTarget===!0,Se=$.length>1;if(Se||(Y.__webglTexture===void 0&&(Y.__webglTexture=r.createTexture()),Y.__version=_.version,s.memory.textures++),q){I.__webglFramebuffer=[];for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer[se]=[];for(let Te=0;Te<_.mipmaps.length;Te++)I.__webglFramebuffer[se][Te]=r.createFramebuffer()}else I.__webglFramebuffer[se]=r.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer=[];for(let se=0;se<_.mipmaps.length;se++)I.__webglFramebuffer[se]=r.createFramebuffer()}else I.__webglFramebuffer=r.createFramebuffer();if(Se)for(let se=0,Te=$.length;se<Te;se++){const ye=i.get($[se]);ye.__webglTexture===void 0&&(ye.__webglTexture=r.createTexture(),s.memory.textures++)}if(b.samples>0&&_t(b)===!1){I.__webglMultisampledFramebuffer=r.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let se=0;se<$.length;se++){const Te=$[se];I.__webglColorRenderbuffer[se]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,I.__webglColorRenderbuffer[se]);const ye=a.convert(Te.format,Te.colorSpace),J=a.convert(Te.type),re=E(Te.internalFormat,ye,J,Te.colorSpace,b.isXRRenderTarget===!0),be=R(b);r.renderbufferStorageMultisample(r.RENDERBUFFER,be,re,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+se,r.RENDERBUFFER,I.__webglColorRenderbuffer[se])}r.bindRenderbuffer(r.RENDERBUFFER,null),b.depthBuffer&&(I.__webglDepthRenderbuffer=r.createRenderbuffer(),Oe(I.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(q){t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture),Me(r.TEXTURE_CUBE_MAP,_);for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0)for(let Te=0;Te<_.mipmaps.length;Te++)ae(I.__webglFramebuffer[se][Te],b,_,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+se,Te);else ae(I.__webglFramebuffer[se],b,_,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);m(_)&&f(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let se=0,Te=$.length;se<Te;se++){const ye=$[se],J=i.get(ye);let re=r.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(re=b.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(re,J.__webglTexture),Me(re,ye),ae(I.__webglFramebuffer,b,ye,r.COLOR_ATTACHMENT0+se,re,0),m(ye)&&f(re)}t.unbindTexture()}else{let se=r.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(se=b.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(se,Y.__webglTexture),Me(se,_),_.mipmaps&&_.mipmaps.length>0)for(let Te=0;Te<_.mipmaps.length;Te++)ae(I.__webglFramebuffer[Te],b,_,r.COLOR_ATTACHMENT0,se,Te);else ae(I.__webglFramebuffer,b,_,r.COLOR_ATTACHMENT0,se,0);m(_)&&f(se),t.unbindTexture()}b.depthBuffer&&pe(b)}function Ge(b){const _=b.textures;for(let I=0,Y=_.length;I<Y;I++){const $=_[I];if(m($)){const q=S(b),Se=i.get($).__webglTexture;t.bindTexture(q,Se),f(q),t.unbindTexture()}}}const xt=[],gt=[];function wt(b){if(b.samples>0){if(_t(b)===!1){const _=b.textures,I=b.width,Y=b.height;let $=r.COLOR_BUFFER_BIT;const q=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Se=i.get(b),se=_.length>1;if(se)for(let ye=0;ye<_.length;ye++)t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ye,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ye,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const Te=b.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let ye=0;ye<_.length;ye++){if(b.resolveDepthBuffer&&(b.depthBuffer&&($|=r.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&($|=r.STENCIL_BUFFER_BIT)),se){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Se.__webglColorRenderbuffer[ye]);const J=i.get(_[ye]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,J,0)}r.blitFramebuffer(0,0,I,Y,0,0,I,Y,$,r.NEAREST),l===!0&&(xt.length=0,gt.length=0,xt.push(r.COLOR_ATTACHMENT0+ye),b.depthBuffer&&b.resolveDepthBuffer===!1&&(xt.push(q),gt.push(q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,gt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,xt))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),se)for(let ye=0;ye<_.length;ye++){t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ye,r.RENDERBUFFER,Se.__webglColorRenderbuffer[ye]);const J=i.get(_[ye]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Se.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ye,r.TEXTURE_2D,J,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const _=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[_])}}}function R(b){return Math.min(n.maxSamples,b.samples)}function _t(b){const _=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function $e(b){const _=s.render.frame;u.get(b)!==_&&(u.set(b,_),b.update())}function it(b,_){const I=b.colorSpace,Y=b.format,$=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||I!==ji&&I!==Xr&&(je.getTransfer(I)===Ze?(Y!==or||$!==Zt)&&Ue("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xe("WebGLTextures: Unsupported texture color space:",I)),_}function xe(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=O,this.setTexture2D=k,this.setTexture2DArray=z,this.setTexture3D=F,this.setTextureCube=Q,this.rebindTextures=qe,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=Ge,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=_t,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function i_(r,e){function t(i,n=Xr){let a;const s=je.getTransfer(n);if(i===Zt)return r.UNSIGNED_BYTE;if(i===Io)return r.UNSIGNED_SHORT_4_4_4_4;if(i===Uo)return r.UNSIGNED_SHORT_5_5_5_1;if(i===zc)return r.UNSIGNED_INT_5_9_9_9_REV;if(i===Hc)return r.UNSIGNED_INT_10F_11F_11F_REV;if(i===Fc)return r.BYTE;if(i===Bc)return r.SHORT;if(i===Mn)return r.UNSIGNED_SHORT;if(i===Do)return r.INT;if(i===Mr)return r.UNSIGNED_INT;if(i===sr)return r.FLOAT;if(i===qt)return r.HALF_FLOAT;if(i===kc)return r.ALPHA;if(i===Gc)return r.RGB;if(i===or)return r.RGBA;if(i===Ur)return r.DEPTH_COMPONENT;if(i===li)return r.DEPTH_STENCIL;if(i===No)return r.RED;if(i===Oo)return r.RED_INTEGER;if(i===Xi)return r.RG;if(i===Fo)return r.RG_INTEGER;if(i===Bo)return r.RGBA_INTEGER;if(i===la||i===ca||i===ua||i===ha)if(s===Ze)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===la)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ca)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ua)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ha)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===la)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ca)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ua)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ha)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Hs||i===ks||i===Gs||i===Vs)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Hs)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ks)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Gs)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Vs)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ws||i===Xs||i===js||i===Ys||i===qs||i===$s||i===Ks)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Ws||i===Xs)return s===Ze?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===js)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ys)return a.COMPRESSED_R11_EAC;if(i===qs)return a.COMPRESSED_SIGNED_R11_EAC;if(i===$s)return a.COMPRESSED_RG11_EAC;if(i===Ks)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Zs||i===Js||i===Qs||i===eo||i===to||i===ro||i===io||i===no||i===ao||i===so||i===oo||i===lo||i===co||i===uo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Zs)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Js)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Qs)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===eo)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===to)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ro)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===io)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===no)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ao)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===so)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===oo)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===lo)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===co)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===uo)return s===Ze?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ho||i===po||i===fo)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===ho)return s===Ze?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===po)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===fo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===mo||i===go||i===_o||i===vo)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===mo)return a.COMPRESSED_RED_RGTC1_EXT;if(i===go)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===_o)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===vo)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===xn?r.UNSIGNED_INT_24_8:r[i]!==void 0?r[i]:null}return{convert:t}}const n_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,a_=`
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

}`;class s_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new tu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ct({vertexShader:n_,fragmentShader:a_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new rt(new Nr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class o_ extends fi{constructor(e,t){super();const i=this;let n=null,a=1,s=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,p=null,g=null;const x=typeof XRWebGLBinding<"u",m=new s_,f={},S=t.getContextAttributes();let E=null,y=null;const A=[],w=[],D=new De;let v=null;const T=new Yt;T.viewport=new ft;const W=new Yt;W.viewport=new ft;const C=[T,W],O=new fd;let H=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let Z=A[j];return Z===void 0&&(Z=new qa,A[j]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(j){let Z=A[j];return Z===void 0&&(Z=new qa,A[j]=Z),Z.getGripSpace()},this.getHand=function(j){let Z=A[j];return Z===void 0&&(Z=new qa,A[j]=Z),Z.getHandSpace()};function k(j){const Z=w.indexOf(j.inputSource);if(Z===-1)return;const ae=A[Z];ae!==void 0&&(ae.update(j.inputSource,j.frame,c||s),ae.dispatchEvent({type:j.type,data:j.inputSource}))}function z(){n.removeEventListener("select",k),n.removeEventListener("selectstart",k),n.removeEventListener("selectend",k),n.removeEventListener("squeeze",k),n.removeEventListener("squeezestart",k),n.removeEventListener("squeezeend",k),n.removeEventListener("end",z),n.removeEventListener("inputsourceschange",F);for(let j=0;j<A.length;j++){const Z=w[j];Z!==null&&(w[j]=null,A[j].disconnect(Z))}H=null,V=null,m.reset();for(const j in f)delete f[j];e.setRenderTarget(E),p=null,d=null,h=null,n=null,y=null,Ne.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){a=j,i.isPresenting===!0&&Ue("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Ue("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(n,t)),h},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(j){if(n=j,n!==null){if(E=e.getRenderTarget(),n.addEventListener("select",k),n.addEventListener("selectstart",k),n.addEventListener("selectend",k),n.addEventListener("squeeze",k),n.addEventListener("squeezestart",k),n.addEventListener("squeezeend",k),n.addEventListener("end",z),n.addEventListener("inputsourceschange",F),S.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(D),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Z=null,ae=null,Oe=null;S.depth&&(Oe=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=S.stencil?li:Ur,ae=S.stencil?xn:Mr);const Ae={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:a};h=this.getBinding(),d=h.createProjectionLayer(Ae),n.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Gt(d.textureWidth,d.textureHeight,{format:or,type:Zt,depthTexture:new yn(d.textureWidth,d.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Z={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(n,t,Z),n.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Gt(p.framebufferWidth,p.framebufferHeight,{format:or,type:Zt,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await n.requestReferenceSpace(o),Ne.setContext(n),Ne.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function F(j){for(let Z=0;Z<j.removed.length;Z++){const ae=j.removed[Z],Oe=w.indexOf(ae);Oe>=0&&(w[Oe]=null,A[Oe].disconnect(ae))}for(let Z=0;Z<j.added.length;Z++){const ae=j.added[Z];let Oe=w.indexOf(ae);if(Oe===-1){for(let pe=0;pe<A.length;pe++)if(pe>=w.length){w.push(ae),Oe=pe;break}else if(w[pe]===null){w[pe]=ae,Oe=pe;break}if(Oe===-1)break}const Ae=A[Oe];Ae&&Ae.connect(ae)}}const Q=new P,K=new P;function le(j,Z,ae){Q.setFromMatrixPosition(Z.matrixWorld),K.setFromMatrixPosition(ae.matrixWorld);const Oe=Q.distanceTo(K),Ae=Z.projectionMatrix.elements,pe=ae.projectionMatrix.elements,qe=Ae[14]/(Ae[10]-1),Qe=Ae[14]/(Ae[10]+1),Ge=(Ae[9]+1)/Ae[5],xt=(Ae[9]-1)/Ae[5],gt=(Ae[8]-1)/Ae[0],wt=(pe[8]+1)/pe[0],R=qe*gt,_t=qe*wt,$e=Oe/(-gt+wt),it=$e*-gt;if(Z.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(it),j.translateZ($e),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Ae[10]===-1)j.projectionMatrix.copy(Z.projectionMatrix),j.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const xe=qe+$e,b=Qe+$e,_=R-it,I=_t+(Oe-it),Y=Ge*Qe/b*xe,$=xt*Qe/b*xe;j.projectionMatrix.makePerspective(_,I,Y,$,xe,b),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function de(j,Z){Z===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(Z.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(n===null)return;let Z=j.near,ae=j.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(ae=m.depthFar)),O.near=W.near=T.near=Z,O.far=W.far=T.far=ae,(H!==O.near||V!==O.far)&&(n.updateRenderState({depthNear:O.near,depthFar:O.far}),H=O.near,V=O.far),O.layers.mask=j.layers.mask|6,T.layers.mask=O.layers.mask&-5,W.layers.mask=O.layers.mask&-3;const Oe=j.parent,Ae=O.cameras;de(O,Oe);for(let pe=0;pe<Ae.length;pe++)de(Ae[pe],Oe);Ae.length===2?le(O,T,W):O.projectionMatrix.copy(T.projectionMatrix),Me(j,O,Oe)};function Me(j,Z,ae){ae===null?j.matrix.copy(Z.matrixWorld):(j.matrix.copy(ae.matrixWorld),j.matrix.invert(),j.matrix.multiply(Z.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(Z.projectionMatrix),j.projectionMatrixInverse.copy(Z.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Mo*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(j){l=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(j){return f[j]};let ne=null;function Fe(j,Z){if(u=Z.getViewerPose(c||s),g=Z,u!==null){const ae=u.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Oe=!1;ae.length!==O.cameras.length&&(O.cameras.length=0,Oe=!0);for(let pe=0;pe<ae.length;pe++){const qe=ae[pe];let Qe=null;if(p!==null)Qe=p.getViewport(qe);else{const xt=h.getViewSubImage(d,qe);Qe=xt.viewport,pe===0&&(e.setRenderTargetTextures(y,xt.colorTexture,xt.depthStencilTexture),e.setRenderTarget(y))}let Ge=C[pe];Ge===void 0&&(Ge=new Yt,Ge.layers.enable(pe),Ge.viewport=new ft,C[pe]=Ge),Ge.matrix.fromArray(qe.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(qe.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),pe===0&&(O.matrix.copy(Ge.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Oe===!0&&O.cameras.push(Ge)}const Ae=n.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){h=i.getBinding();const pe=h.getDepthInformation(ae[0]);pe&&pe.isValid&&pe.texture&&m.init(pe,n.renderState)}if(Ae&&Ae.includes("camera-access")&&x){e.state.unbindTexture(),h=i.getBinding();for(let pe=0;pe<ae.length;pe++){const qe=ae[pe].camera;if(qe){let Qe=f[qe];Qe||(Qe=new tu,f[qe]=Qe);const Ge=h.getCameraImage(qe);Qe.sourceTexture=Ge}}}}for(let ae=0;ae<A.length;ae++){const Oe=w[ae],Ae=A[ae];Oe!==null&&Ae!==void 0&&Ae.update(Oe,Z,c||s)}ne&&ne(j,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),g=null}const Ne=new nu;Ne.setAnimationLoop(Fe),this.setAnimationLoop=function(j){ne=j},this.dispose=function(){}}}const ni=new hi,l_=new st;function c_(r,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,ru(r)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function n(m,f,S,E,y){f.isMeshBasicMaterial?a(m,f):f.isMeshLambertMaterial?(a(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(a(m,f),h(m,f)):f.isMeshPhongMaterial?(a(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(a(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(a(m,f),g(m,f)):f.isMeshDepthMaterial?a(m,f):f.isMeshDistanceMaterial?(a(m,f),x(m,f)):f.isMeshNormalMaterial?a(m,f):f.isLineBasicMaterial?(s(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,S,E):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ut&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ut&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const S=e.get(f),E=S.envMap,y=S.envMapRotation;E&&(m.envMap.value=E,ni.copy(y),ni.x*=-1,ni.y*=-1,ni.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),m.envMapRotation.value.setFromMatrix4(l_.makeRotationFromEuler(ni)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function s(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,S,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=E*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ut&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const S=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function u_(r,e,t,i){let n={},a={},s=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,E){const y=E.program;i.uniformBlockBinding(S,y)}function c(S,E){let y=n[S.id];y===void 0&&(g(S),y=u(S),n[S.id]=y,S.addEventListener("dispose",m));const A=E.program;i.updateUBOMapping(S,A);const w=e.render.frame;a[S.id]!==w&&(d(S),a[S.id]=w)}function u(S){const E=h();S.__bindingPointIndex=E;const y=r.createBuffer(),A=S.__size,w=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,A,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,E,y),y}function h(){for(let S=0;S<o;S++)if(s.indexOf(S)===-1)return s.push(S),S;return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const E=n[S.id],y=S.uniforms,A=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,E);for(let w=0,D=y.length;w<D;w++){const v=Array.isArray(y[w])?y[w]:[y[w]];for(let T=0,W=v.length;T<W;T++){const C=v[T];if(p(C,w,T,A)===!0){const O=C.__offset,H=Array.isArray(C.value)?C.value:[C.value];let V=0;for(let k=0;k<H.length;k++){const z=H[k],F=x(z);typeof z=="number"||typeof z=="boolean"?(C.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,O+V,C.__data)):z.isMatrix3?(C.__data[0]=z.elements[0],C.__data[1]=z.elements[1],C.__data[2]=z.elements[2],C.__data[3]=0,C.__data[4]=z.elements[3],C.__data[5]=z.elements[4],C.__data[6]=z.elements[5],C.__data[7]=0,C.__data[8]=z.elements[6],C.__data[9]=z.elements[7],C.__data[10]=z.elements[8],C.__data[11]=0):(z.toArray(C.__data,V),V+=F.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,O,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(S,E,y,A){const w=S.value,D=E+"_"+y;if(A[D]===void 0)return typeof w=="number"||typeof w=="boolean"?A[D]=w:A[D]=w.clone(),!0;{const v=A[D];if(typeof w=="number"||typeof w=="boolean"){if(v!==w)return A[D]=w,!0}else if(v.equals(w)===!1)return v.copy(w),!0}return!1}function g(S){const E=S.uniforms;let y=0;const A=16;for(let D=0,v=E.length;D<v;D++){const T=Array.isArray(E[D])?E[D]:[E[D]];for(let W=0,C=T.length;W<C;W++){const O=T[W],H=Array.isArray(O.value)?O.value:[O.value];for(let V=0,k=H.length;V<k;V++){const z=H[V],F=x(z),Q=y%A,K=Q%F.boundary,le=Q+K;y+=K,le!==0&&A-le<F.storage&&(y+=A-le),O.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=y,y+=F.storage}}}const w=y%A;return w>0&&(y+=A-w),S.__size=y,S.__cache={},this}function x(S){const E={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(E.boundary=4,E.storage=4):S.isVector2?(E.boundary=8,E.storage=8):S.isVector3||S.isColor?(E.boundary=16,E.storage=12):S.isVector4?(E.boundary=16,E.storage=16):S.isMatrix3?(E.boundary=48,E.storage=48):S.isMatrix4?(E.boundary=64,E.storage=64):S.isTexture?Ue("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ue("WebGLRenderer: Unsupported uniform value type.",S),E}function m(S){const E=S.target;E.removeEventListener("dispose",m);const y=s.indexOf(E.__bindingPointIndex);s.splice(y,1),r.deleteBuffer(n[E.id]),delete n[E.id],delete a[E.id]}function f(){for(const S in n)r.deleteBuffer(n[S]);s=[],n={},a={}}return{bind:l,update:c,dispose:f}}const h_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let hr=null;function d_(){return hr===null&&(hr=new Zc(h_,16,16,Xi,qt),hr.name="DFG_LUT",hr.minFilter=Rt,hr.magFilter=Rt,hr.wrapS=Pr,hr.wrapT=Pr,hr.generateMipmaps=!1,hr.needsUpdate=!0),hr}class Xo{constructor(e={}){const{canvas:t=Sh(),context:i=null,depth:n=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:p=Zt}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=s;const x=p,m=new Set([Bo,Fo,Oo]),f=new Set([Zt,Mr,Mn,xn,Io,Uo]),S=new Uint32Array(4),E=new Int32Array(4);let y=null,A=null;const w=[],D=[];let v=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_r,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const T=this;let W=!1;this._outputColorSpace=Ht;let C=0,O=0,H=null,V=-1,k=null;const z=new ft,F=new ft;let Q=null;const K=new Ee(0);let le=0,de=t.width,Me=t.height,ne=1,Fe=null,Ne=null;const j=new ft(0,0,de,Me),Z=new ft(0,0,de,Me);let ae=!1;const Oe=new Jc;let Ae=!1,pe=!1;const qe=new st,Qe=new P,Ge=new ft,xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let gt=!1;function wt(){return H===null?ne:1}let R=i;function _t(M,U){return t.getContext(M,U)}try{const M={alpha:!0,depth:n,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Lo}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",Le,!1),t.addEventListener("webglcontextcreationerror",St,!1),R===null){const U="webgl2";if(R=_t(U,M),R===null)throw _t(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw Xe("WebGLRenderer: "+M.message),M}let $e,it,xe,b,_,I,Y,$,q,Se,se,Te,ye,J,re,be,ve,he,Ve,L,oe,te,ge;function ee(){$e=new pm(R),$e.init(),oe=new i_(R,$e),it=new am(R,$e,e,oe),xe=new t_(R,$e),it.reversedDepthBuffer&&d&&xe.buffers.depth.setReversed(!0),b=new gm(R),_=new kg,I=new r_(R,$e,xe,_,it,oe,b),Y=new dm(T),$=new xd(R),te=new im(R,$),q=new fm(R,$,b,te),Se=new vm(R,q,$,te,b),he=new _m(R,it,I),re=new sm(_),se=new Hg(T,Y,$e,it,te,re),Te=new c_(T,_),ye=new Vg,J=new $g($e),ve=new rm(T,Y,xe,Se,g,l),be=new e_(T,Se,it),ge=new u_(R,b,it,xe),Ve=new nm(R,$e,b),L=new mm(R,$e,b),b.programs=se.programs,T.capabilities=it,T.extensions=$e,T.properties=_,T.renderLists=ye,T.shadowMap=be,T.state=xe,T.info=b}ee(),x!==Zt&&(v=new xm(x,t.width,t.height,n,a));const X=new o_(T,R);this.xr=X,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const M=$e.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=$e.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(M){M!==void 0&&(ne=M,this.setSize(de,Me,!1))},this.getSize=function(M){return M.set(de,Me)},this.setSize=function(M,U,G=!0){if(X.isPresenting){Ue("WebGLRenderer: Can't change size while VR device is presenting.");return}de=M,Me=U,t.width=Math.floor(M*ne),t.height=Math.floor(U*ne),G===!0&&(t.style.width=M+"px",t.style.height=U+"px"),v!==null&&v.setSize(t.width,t.height),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(de*ne,Me*ne).floor()},this.setDrawingBufferSize=function(M,U,G){de=M,Me=U,ne=G,t.width=Math.floor(M*G),t.height=Math.floor(U*G),this.setViewport(0,0,M,U)},this.setEffects=function(M){if(x===Zt){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let U=0;U<M.length;U++)if(M[U].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(z)},this.getViewport=function(M){return M.copy(j)},this.setViewport=function(M,U,G,B){M.isVector4?j.set(M.x,M.y,M.z,M.w):j.set(M,U,G,B),xe.viewport(z.copy(j).multiplyScalar(ne).round())},this.getScissor=function(M){return M.copy(Z)},this.setScissor=function(M,U,G,B){M.isVector4?Z.set(M.x,M.y,M.z,M.w):Z.set(M,U,G,B),xe.scissor(F.copy(Z).multiplyScalar(ne).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(M){xe.setScissorTest(ae=M)},this.setOpaqueSort=function(M){Fe=M},this.setTransparentSort=function(M){Ne=M},this.getClearColor=function(M){return M.copy(ve.getClearColor())},this.setClearColor=function(){ve.setClearColor(...arguments)},this.getClearAlpha=function(){return ve.getClearAlpha()},this.setClearAlpha=function(){ve.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,G=!0){let B=0;if(M){let N=!1;if(H!==null){const ie=H.texture.format;N=m.has(ie)}if(N){const ie=H.texture.type,ue=f.has(ie),me=ve.getClearColor(),fe=ve.getClearAlpha(),Ie=me.r,ze=me.g,We=me.b;ue?(S[0]=Ie,S[1]=ze,S[2]=We,S[3]=fe,R.clearBufferuiv(R.COLOR,0,S)):(E[0]=Ie,E[1]=ze,E[2]=We,E[3]=fe,R.clearBufferiv(R.COLOR,0,E))}else B|=R.COLOR_BUFFER_BIT}U&&(B|=R.DEPTH_BUFFER_BIT),G&&(B|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&R.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",Le,!1),t.removeEventListener("webglcontextcreationerror",St,!1),ve.dispose(),ye.dispose(),J.dispose(),_.dispose(),Y.dispose(),Se.dispose(),te.dispose(),ge.dispose(),se.dispose(),X.dispose(),X.removeEventListener("sessionstart",$o),X.removeEventListener("sessionend",Ko),Kr.stop()};function _e(M){M.preventDefault(),ul("WebGLRenderer: Context Lost."),W=!0}function Le(){ul("WebGLRenderer: Context Restored."),W=!1;const M=b.autoReset,U=be.enabled,G=be.autoUpdate,B=be.needsUpdate,N=be.type;ee(),b.autoReset=M,be.enabled=U,be.autoUpdate=G,be.needsUpdate=B,be.type=N}function St(M){Xe("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Ke(M){const U=M.target;U.removeEventListener("dispose",Ke),Sr(U)}function Sr(M){yr(M),_.remove(M)}function yr(M){const U=_.get(M).programs;U!==void 0&&(U.forEach(function(G){se.releaseProgram(G)}),M.isShaderMaterial&&se.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,G,B,N,ie){U===null&&(U=xt);const ue=N.isMesh&&N.matrixWorld.determinant()<0,me=Uu(M,U,G,B,N);xe.setMaterial(B,ue);let fe=G.index,Ie=1;if(B.wireframe===!0){if(fe=q.getWireframeAttribute(G),fe===void 0)return;Ie=2}const ze=G.drawRange,We=G.attributes.position;let Re=ze.start*Ie,nt=(ze.start+ze.count)*Ie;ie!==null&&(Re=Math.max(Re,ie.start*Ie),nt=Math.min(nt,(ie.start+ie.count)*Ie)),fe!==null?(Re=Math.max(Re,0),nt=Math.min(nt,fe.count)):We!=null&&(Re=Math.max(Re,0),nt=Math.min(nt,We.count));const pt=nt-Re;if(pt<0||pt===1/0)return;te.setup(N,B,me,G,fe);let ut,et=Ve;if(fe!==null&&(ut=$.get(fe),et=L,et.setIndex(ut)),N.isMesh)B.wireframe===!0?(xe.setLineWidth(B.wireframeLinewidth*wt()),et.setMode(R.LINES)):et.setMode(R.TRIANGLES);else if(N.isLine){let dt=B.linewidth;dt===void 0&&(dt=1),xe.setLineWidth(dt*wt()),N.isLineSegments?et.setMode(R.LINES):N.isLineLoop?et.setMode(R.LINE_LOOP):et.setMode(R.LINE_STRIP)}else N.isPoints?et.setMode(R.POINTS):N.isSprite&&et.setMode(R.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)wa("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),et.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if($e.get("WEBGL_multi_draw"))et.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const dt=N._multiDrawStarts,we=N._multiDrawCounts,Wt=N._multiDrawCount,Zr=fe?$.get(fe).bytesPerElement:1,er=_.get(B).currentProgram.getUniforms();for(let cr=0;cr<Wt;cr++)er.setValue(R,"_gl_DrawID",cr),et.render(dt[cr]/Zr,we[cr])}else if(N.isInstancedMesh)et.renderInstances(Re,pt,N.count);else if(G.isInstancedBufferGeometry){const dt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,we=Math.min(G.instanceCount,dt);et.renderInstances(Re,pt,we)}else et.render(Re,pt)};function qo(M,U,G){M.transparent===!0&&M.side===nr&&M.forceSinglePass===!1?(M.side=Ut,M.needsUpdate=!0,Dn(M,U,G),M.side=lr,M.needsUpdate=!0,Dn(M,U,G),M.side=nr):Dn(M,U,G)}this.compile=function(M,U,G=null){G===null&&(G=M),A=J.get(G),A.init(U),D.push(A),G.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(A.pushLight(N),N.castShadow&&A.pushShadow(N))}),M!==G&&M.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(A.pushLight(N),N.castShadow&&A.pushShadow(N))}),A.setupLights();const B=new Set;return M.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const ie=N.material;if(ie)if(Array.isArray(ie))for(let ue=0;ue<ie.length;ue++){const me=ie[ue];qo(me,G,N),B.add(me)}else qo(ie,G,N),B.add(ie)}),A=D.pop(),B},this.compileAsync=function(M,U,G=null){const B=this.compile(M,U,G);return new Promise(N=>{function ie(){if(B.forEach(function(ue){_.get(ue).currentProgram.isReady()&&B.delete(ue)}),B.size===0){N(M);return}setTimeout(ie,10)}$e.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let Fa=null;function Iu(M){Fa&&Fa(M)}function $o(){Kr.stop()}function Ko(){Kr.start()}const Kr=new nu;Kr.setAnimationLoop(Iu),typeof self<"u"&&Kr.setContext(self),this.setAnimationLoop=function(M){Fa=M,X.setAnimationLoop(M),M===null?Kr.stop():Kr.start()},X.addEventListener("sessionstart",$o),X.addEventListener("sessionend",Ko),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;const G=X.enabled===!0&&X.isPresenting===!0,B=v!==null&&(H===null||G)&&v.begin(T,H);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(X.cameraAutoUpdate===!0&&X.updateCamera(U),U=X.getCamera()),M.isScene===!0&&M.onBeforeRender(T,M,U,H),A=J.get(M,D.length),A.init(U),D.push(A),qe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Oe.setFromProjectionMatrix(qe,fr,U.reversedDepth),pe=this.localClippingEnabled,Ae=re.init(this.clippingPlanes,pe),y=ye.get(M,w.length),y.init(),w.push(y),X.enabled===!0&&X.isPresenting===!0){const ie=T.xr.getDepthSensingMesh();ie!==null&&Ba(ie,U,-1/0,T.sortObjects)}Ba(M,U,0,T.sortObjects),y.finish(),T.sortObjects===!0&&y.sort(Fe,Ne),gt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,gt&&ve.addToRenderList(y,M),this.info.render.frame++,Ae===!0&&re.beginShadows();const N=A.state.shadowsArray;if(be.render(N,M,U),Ae===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset(),(B&&v.hasRenderPass())===!1){const ie=y.opaque,ue=y.transmissive;if(A.setupLights(),U.isArrayCamera){const me=U.cameras;if(ue.length>0)for(let fe=0,Ie=me.length;fe<Ie;fe++){const ze=me[fe];Jo(ie,ue,M,ze)}gt&&ve.render(M);for(let fe=0,Ie=me.length;fe<Ie;fe++){const ze=me[fe];Zo(y,M,ze,ze.viewport)}}else ue.length>0&&Jo(ie,ue,M,U),gt&&ve.render(M),Zo(y,M,U)}H!==null&&O===0&&(I.updateMultisampleRenderTarget(H),I.updateRenderTargetMipmap(H)),B&&v.end(T),M.isScene===!0&&M.onAfterRender(T,M,U),te.resetDefaultState(),V=-1,k=null,D.pop(),D.length>0?(A=D[D.length-1],Ae===!0&&re.setGlobalState(T.clippingPlanes,A.state.camera)):A=null,w.pop(),w.length>0?y=w[w.length-1]:y=null};function Ba(M,U,G,B){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)G=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLight)A.pushLight(M),M.castShadow&&A.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Oe.intersectsSprite(M)){B&&Ge.setFromMatrixPosition(M.matrixWorld).applyMatrix4(qe);const ie=Se.update(M),ue=M.material;ue.visible&&y.push(M,ie,ue,G,Ge.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Oe.intersectsObject(M))){const ie=Se.update(M),ue=M.material;if(B&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ge.copy(M.boundingSphere.center)):(ie.boundingSphere===null&&ie.computeBoundingSphere(),Ge.copy(ie.boundingSphere.center)),Ge.applyMatrix4(M.matrixWorld).applyMatrix4(qe)),Array.isArray(ue)){const me=ie.groups;for(let fe=0,Ie=me.length;fe<Ie;fe++){const ze=me[fe],We=ue[ze.materialIndex];We&&We.visible&&y.push(M,ie,We,G,Ge.z,ze)}}else ue.visible&&y.push(M,ie,ue,G,Ge.z,null)}}const N=M.children;for(let ie=0,ue=N.length;ie<ue;ie++)Ba(N[ie],U,G,B)}function Zo(M,U,G,B){const{opaque:N,transmissive:ie,transparent:ue}=M;A.setupLightsView(G),Ae===!0&&re.setGlobalState(T.clippingPlanes,G),B&&xe.viewport(z.copy(B)),N.length>0&&Ln(N,U,G),ie.length>0&&Ln(ie,U,G),ue.length>0&&Ln(ue,U,G),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function Jo(M,U,G,B){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[B.id]===void 0){const We=$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[B.id]=new Gt(1,1,{generateMipmaps:!0,type:We?qt:Zt,minFilter:oi,samples:Math.max(4,it.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace})}const N=A.state.transmissionRenderTarget[B.id],ie=B.viewport||z;N.setSize(ie.z*T.transmissionResolutionScale,ie.w*T.transmissionResolutionScale);const ue=T.getRenderTarget(),me=T.getActiveCubeFace(),fe=T.getActiveMipmapLevel();T.setRenderTarget(N),T.getClearColor(K),le=T.getClearAlpha(),le<1&&T.setClearColor(16777215,.5),T.clear(),gt&&ve.render(G);const Ie=T.toneMapping;T.toneMapping=_r;const ze=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),A.setupLightsView(B),Ae===!0&&re.setGlobalState(T.clippingPlanes,B),Ln(M,G,B),I.updateMultisampleRenderTarget(N),I.updateRenderTargetMipmap(N),$e.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Re=0,nt=U.length;Re<nt;Re++){const pt=U[Re],{object:ut,geometry:et,material:dt,group:we}=pt;if(dt.side===nr&&ut.layers.test(B.layers)){const Wt=dt.side;dt.side=Ut,dt.needsUpdate=!0,Qo(ut,G,B,et,dt,we),dt.side=Wt,dt.needsUpdate=!0,We=!0}}We===!0&&(I.updateMultisampleRenderTarget(N),I.updateRenderTargetMipmap(N))}T.setRenderTarget(ue,me,fe),T.setClearColor(K,le),ze!==void 0&&(B.viewport=ze),T.toneMapping=Ie}function Ln(M,U,G){const B=U.isScene===!0?U.overrideMaterial:null;for(let N=0,ie=M.length;N<ie;N++){const ue=M[N],{object:me,geometry:fe,group:Ie}=ue;let ze=ue.material;ze.allowOverride===!0&&B!==null&&(ze=B),me.layers.test(G.layers)&&Qo(me,U,G,fe,ze,Ie)}}function Qo(M,U,G,B,N,ie){M.onBeforeRender(T,U,G,B,N,ie),M.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),N.onBeforeRender(T,U,G,B,M,ie),N.transparent===!0&&N.side===nr&&N.forceSinglePass===!1?(N.side=Ut,N.needsUpdate=!0,T.renderBufferDirect(G,U,B,N,M,ie),N.side=lr,N.needsUpdate=!0,T.renderBufferDirect(G,U,B,N,M,ie),N.side=nr):T.renderBufferDirect(G,U,B,N,M,ie),M.onAfterRender(T,U,G,B,N,ie)}function Dn(M,U,G){U.isScene!==!0&&(U=xt);const B=_.get(M),N=A.state.lights,ie=A.state.shadowsArray,ue=N.state.version,me=se.getParameters(M,N.state,ie,U,G),fe=se.getProgramCacheKey(me);let Ie=B.programs;B.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?U.environment:null,B.fog=U.fog;const ze=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;B.envMap=Y.get(M.envMap||B.environment,ze),B.envMapRotation=B.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Ie===void 0&&(M.addEventListener("dispose",Ke),Ie=new Map,B.programs=Ie);let We=Ie.get(fe);if(We!==void 0){if(B.currentProgram===We&&B.lightsStateVersion===ue)return tl(M,me),We}else me.uniforms=se.getUniforms(M),M.onBeforeCompile(me,T),We=se.acquireProgram(me,fe),Ie.set(fe,We),B.uniforms=me.uniforms;const Re=B.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Re.clippingPlanes=re.uniform),tl(M,me),B.needsLights=Ou(M),B.lightsStateVersion=ue,B.needsLights&&(Re.ambientLightColor.value=N.state.ambient,Re.lightProbe.value=N.state.probe,Re.directionalLights.value=N.state.directional,Re.directionalLightShadows.value=N.state.directionalShadow,Re.spotLights.value=N.state.spot,Re.spotLightShadows.value=N.state.spotShadow,Re.rectAreaLights.value=N.state.rectArea,Re.ltc_1.value=N.state.rectAreaLTC1,Re.ltc_2.value=N.state.rectAreaLTC2,Re.pointLights.value=N.state.point,Re.pointLightShadows.value=N.state.pointShadow,Re.hemisphereLights.value=N.state.hemi,Re.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Re.spotLightMatrix.value=N.state.spotLightMatrix,Re.spotLightMap.value=N.state.spotLightMap,Re.pointShadowMatrix.value=N.state.pointShadowMatrix),B.currentProgram=We,B.uniformsList=null,We}function el(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=ma.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function tl(M,U){const G=_.get(M);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.batchingColor=U.batchingColor,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.instancingMorph=U.instancingMorph,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function Uu(M,U,G,B,N){U.isScene!==!0&&(U=xt),I.resetTextureUnits();const ie=U.fog,ue=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?U.environment:null,me=H===null?T.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:ji,fe=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Ie=Y.get(B.envMap||ue,fe),ze=B.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,We=!!G.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Re=!!G.morphAttributes.position,nt=!!G.morphAttributes.normal,pt=!!G.morphAttributes.color;let ut=_r;B.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(ut=T.toneMapping);const et=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,dt=et!==void 0?et.length:0,we=_.get(B),Wt=A.state.lights;if(Ae===!0&&(pe===!0||M!==k)){const vt=M===k&&B.id===V;re.setState(B,M,vt)}let Zr=!1;B.version===we.__version?(we.needsLights&&we.lightsStateVersion!==Wt.state.version||we.outputColorSpace!==me||N.isBatchedMesh&&we.batching===!1||!N.isBatchedMesh&&we.batching===!0||N.isBatchedMesh&&we.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&we.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&we.instancing===!1||!N.isInstancedMesh&&we.instancing===!0||N.isSkinnedMesh&&we.skinning===!1||!N.isSkinnedMesh&&we.skinning===!0||N.isInstancedMesh&&we.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&we.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&we.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&we.instancingMorph===!1&&N.morphTexture!==null||we.envMap!==Ie||B.fog===!0&&we.fog!==ie||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==re.numPlanes||we.numIntersection!==re.numIntersection)||we.vertexAlphas!==ze||we.vertexTangents!==We||we.morphTargets!==Re||we.morphNormals!==nt||we.morphColors!==pt||we.toneMapping!==ut||we.morphTargetsCount!==dt)&&(Zr=!0):(Zr=!0,we.__version=B.version);let er=we.currentProgram;Zr===!0&&(er=Dn(B,U,N));let cr=!1,Jr=!1,_i=!1;const tt=er.getUniforms(),At=we.uniforms;if(xe.useProgram(er.program)&&(cr=!0,Jr=!0,_i=!0),B.id!==V&&(V=B.id,Jr=!0),cr||k!==M){xe.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),tt.setValue(R,"projectionMatrix",M.projectionMatrix),tt.setValue(R,"viewMatrix",M.matrixWorldInverse);const vt=tt.map.cameraPosition;vt!==void 0&&vt.setValue(R,Qe.setFromMatrixPosition(M.matrixWorld)),it.logarithmicDepthBuffer&&tt.setValue(R,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&tt.setValue(R,"isOrthographic",M.isOrthographicCamera===!0),k!==M&&(k=M,Jr=!0,_i=!0)}if(we.needsLights&&(Wt.state.directionalShadowMap.length>0&&tt.setValue(R,"directionalShadowMap",Wt.state.directionalShadowMap,I),Wt.state.spotShadowMap.length>0&&tt.setValue(R,"spotShadowMap",Wt.state.spotShadowMap,I),Wt.state.pointShadowMap.length>0&&tt.setValue(R,"pointShadowMap",Wt.state.pointShadowMap,I)),N.isSkinnedMesh){tt.setOptional(R,N,"bindMatrix"),tt.setOptional(R,N,"bindMatrixInverse");const vt=N.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),tt.setValue(R,"boneTexture",vt.boneTexture,I))}N.isBatchedMesh&&(tt.setOptional(R,N,"batchingTexture"),tt.setValue(R,"batchingTexture",N._matricesTexture,I),tt.setOptional(R,N,"batchingIdTexture"),tt.setValue(R,"batchingIdTexture",N._indirectTexture,I),tt.setOptional(R,N,"batchingColorTexture"),N._colorsTexture!==null&&tt.setValue(R,"batchingColorTexture",N._colorsTexture,I));const Or=G.morphAttributes;if((Or.position!==void 0||Or.normal!==void 0||Or.color!==void 0)&&he.update(N,G,er),(Jr||we.receiveShadow!==N.receiveShadow)&&(we.receiveShadow=N.receiveShadow,tt.setValue(R,"receiveShadow",N.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&U.environment!==null&&(At.envMapIntensity.value=U.environmentIntensity),At.dfgLUT!==void 0&&(At.dfgLUT.value=d_()),Jr&&(tt.setValue(R,"toneMappingExposure",T.toneMappingExposure),we.needsLights&&Nu(At,_i),ie&&B.fog===!0&&Te.refreshFogUniforms(At,ie),Te.refreshMaterialUniforms(At,B,ne,Me,A.state.transmissionRenderTarget[M.id]),ma.upload(R,el(we),At,I)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(ma.upload(R,el(we),At,I),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&tt.setValue(R,"center",N.center),tt.setValue(R,"modelViewMatrix",N.modelViewMatrix),tt.setValue(R,"normalMatrix",N.normalMatrix),tt.setValue(R,"modelMatrix",N.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const vt=B.uniformsGroups;for(let Ji=0,vi=vt.length;Ji<vi;Ji++){const rl=vt[Ji];ge.update(rl,er),ge.bind(rl,er)}}return er}function Nu(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function Ou(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(M,U,G){const B=_.get(M);B.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),_.get(M.texture).__webglTexture=U,_.get(M.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:G,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,U){const G=_.get(M);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0};const Fu=R.createFramebuffer();this.setRenderTarget=function(M,U=0,G=0){H=M,C=U,O=G;let B=null,N=!1,ie=!1;if(M){const ue=_.get(M);if(ue.__useDefaultFramebuffer!==void 0){xe.bindFramebuffer(R.FRAMEBUFFER,ue.__webglFramebuffer),z.copy(M.viewport),F.copy(M.scissor),Q=M.scissorTest,xe.viewport(z),xe.scissor(F),xe.setScissorTest(Q),V=-1;return}else if(ue.__webglFramebuffer===void 0)I.setupRenderTarget(M);else if(ue.__hasExternalTextures)I.rebindTextures(M,_.get(M.texture).__webglTexture,_.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ie=M.depthTexture;if(ue.__boundDepthTexture!==Ie){if(Ie!==null&&_.has(Ie)&&(M.width!==Ie.image.width||M.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(M)}}const me=M.texture;(me.isData3DTexture||me.isDataArrayTexture||me.isCompressedArrayTexture)&&(ie=!0);const fe=_.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(fe[U])?B=fe[U][G]:B=fe[U],N=!0):M.samples>0&&I.useMultisampledRTT(M)===!1?B=_.get(M).__webglMultisampledFramebuffer:Array.isArray(fe)?B=fe[G]:B=fe,z.copy(M.viewport),F.copy(M.scissor),Q=M.scissorTest}else z.copy(j).multiplyScalar(ne).floor(),F.copy(Z).multiplyScalar(ne).floor(),Q=ae;if(G!==0&&(B=Fu),xe.bindFramebuffer(R.FRAMEBUFFER,B)&&xe.drawBuffers(M,B),xe.viewport(z),xe.scissor(F),xe.setScissorTest(Q),N){const ue=_.get(M.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+U,ue.__webglTexture,G)}else if(ie){const ue=U;for(let me=0;me<M.textures.length;me++){const fe=_.get(M.textures[me]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+me,fe.__webglTexture,G,ue)}}else if(M!==null&&G!==0){const ue=_.get(M.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,ue.__webglTexture,G)}V=-1},this.readRenderTargetPixels=function(M,U,G,B,N,ie,ue,me=0){if(!(M&&M.isWebGLRenderTarget)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=_.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe){xe.bindFramebuffer(R.FRAMEBUFFER,fe);try{const Ie=M.textures[me],ze=Ie.format,We=Ie.type;if(M.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+me),!it.textureFormatReadable(ze)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!it.textureTypeReadable(We)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-B&&G>=0&&G<=M.height-N&&R.readPixels(U,G,B,N,oe.convert(ze),oe.convert(We),ie)}finally{const Ie=H!==null?_.get(H).__webglFramebuffer:null;xe.bindFramebuffer(R.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(M,U,G,B,N,ie,ue,me=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=_.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe)if(U>=0&&U<=M.width-B&&G>=0&&G<=M.height-N){xe.bindFramebuffer(R.FRAMEBUFFER,fe);const Ie=M.textures[me],ze=Ie.format,We=Ie.type;if(M.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+me),!it.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!it.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Re),R.bufferData(R.PIXEL_PACK_BUFFER,ie.byteLength,R.STREAM_READ),R.readPixels(U,G,B,N,oe.convert(ze),oe.convert(We),0);const nt=H!==null?_.get(H).__webglFramebuffer:null;xe.bindFramebuffer(R.FRAMEBUFFER,nt);const pt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await yh(R,pt,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Re),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,ie),R.deleteBuffer(Re),R.deleteSync(pt),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,U=null,G=0){const B=Math.pow(2,-G),N=Math.floor(M.image.width*B),ie=Math.floor(M.image.height*B),ue=U!==null?U.x:0,me=U!==null?U.y:0;I.setTexture2D(M,0),R.copyTexSubImage2D(R.TEXTURE_2D,G,0,0,ue,me,N,ie),xe.unbindTexture()};const Bu=R.createFramebuffer(),zu=R.createFramebuffer();this.copyTextureToTexture=function(M,U,G=null,B=null,N=0,ie=0){let ue,me,fe,Ie,ze,We,Re,nt,pt;const ut=M.isCompressedTexture?M.mipmaps[ie]:M.image;if(G!==null)ue=G.max.x-G.min.x,me=G.max.y-G.min.y,fe=G.isBox3?G.max.z-G.min.z:1,Ie=G.min.x,ze=G.min.y,We=G.isBox3?G.min.z:0;else{const At=Math.pow(2,-N);ue=Math.floor(ut.width*At),me=Math.floor(ut.height*At),M.isDataArrayTexture?fe=ut.depth:M.isData3DTexture?fe=Math.floor(ut.depth*At):fe=1,Ie=0,ze=0,We=0}B!==null?(Re=B.x,nt=B.y,pt=B.z):(Re=0,nt=0,pt=0);const et=oe.convert(U.format),dt=oe.convert(U.type);let we;U.isData3DTexture?(I.setTexture3D(U,0),we=R.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(I.setTexture2DArray(U,0),we=R.TEXTURE_2D_ARRAY):(I.setTexture2D(U,0),we=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);const Wt=R.getParameter(R.UNPACK_ROW_LENGTH),Zr=R.getParameter(R.UNPACK_IMAGE_HEIGHT),er=R.getParameter(R.UNPACK_SKIP_PIXELS),cr=R.getParameter(R.UNPACK_SKIP_ROWS),Jr=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,ut.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ut.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ie),R.pixelStorei(R.UNPACK_SKIP_ROWS,ze),R.pixelStorei(R.UNPACK_SKIP_IMAGES,We);const _i=M.isDataArrayTexture||M.isData3DTexture,tt=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){const At=_.get(M),Or=_.get(U),vt=_.get(At.__renderTarget),Ji=_.get(Or.__renderTarget);xe.bindFramebuffer(R.READ_FRAMEBUFFER,vt.__webglFramebuffer),xe.bindFramebuffer(R.DRAW_FRAMEBUFFER,Ji.__webglFramebuffer);for(let vi=0;vi<fe;vi++)_i&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_.get(M).__webglTexture,N,We+vi),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_.get(U).__webglTexture,ie,pt+vi)),R.blitFramebuffer(Ie,ze,ue,me,Re,nt,ue,me,R.DEPTH_BUFFER_BIT,R.NEAREST);xe.bindFramebuffer(R.READ_FRAMEBUFFER,null),xe.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(N!==0||M.isRenderTargetTexture||_.has(M)){const At=_.get(M),Or=_.get(U);xe.bindFramebuffer(R.READ_FRAMEBUFFER,Bu),xe.bindFramebuffer(R.DRAW_FRAMEBUFFER,zu);for(let vt=0;vt<fe;vt++)_i?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,At.__webglTexture,N,We+vt):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,At.__webglTexture,N),tt?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Or.__webglTexture,ie,pt+vt):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Or.__webglTexture,ie),N!==0?R.blitFramebuffer(Ie,ze,ue,me,Re,nt,ue,me,R.COLOR_BUFFER_BIT,R.NEAREST):tt?R.copyTexSubImage3D(we,ie,Re,nt,pt+vt,Ie,ze,ue,me):R.copyTexSubImage2D(we,ie,Re,nt,Ie,ze,ue,me);xe.bindFramebuffer(R.READ_FRAMEBUFFER,null),xe.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else tt?M.isDataTexture||M.isData3DTexture?R.texSubImage3D(we,ie,Re,nt,pt,ue,me,fe,et,dt,ut.data):U.isCompressedArrayTexture?R.compressedTexSubImage3D(we,ie,Re,nt,pt,ue,me,fe,et,ut.data):R.texSubImage3D(we,ie,Re,nt,pt,ue,me,fe,et,dt,ut):M.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,ie,Re,nt,ue,me,et,dt,ut.data):M.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,ie,Re,nt,ut.width,ut.height,et,ut.data):R.texSubImage2D(R.TEXTURE_2D,ie,Re,nt,ue,me,et,dt,ut);R.pixelStorei(R.UNPACK_ROW_LENGTH,Wt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Zr),R.pixelStorei(R.UNPACK_SKIP_PIXELS,er),R.pixelStorei(R.UNPACK_SKIP_ROWS,cr),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Jr),ie===0&&U.generateMipmaps&&R.generateMipmap(we),xe.unbindTexture()},this.initRenderTarget=function(M){_.get(M).__webglFramebuffer===void 0&&I.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?I.setTextureCube(M,0):M.isData3DTexture?I.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?I.setTexture2DArray(M,0):I.setTexture2D(M,0),xe.unbindTexture()},this.resetState=function(){C=0,O=0,H=null,xe.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();const uu=new WeakMap;function p_(r,{onSubmit:e,tabComplete:t}={}){const i=new AbortController,{signal:n}=i,a=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s={abortController:i,history:[],historyIndex:-1,partialInput:"",reducedMotion:a};uu.set(r,s);const o=r.querySelector(".s9-terminal__input");o&&o.addEventListener("keydown",l=>{m_(r,l,{onSubmit:e,tabComplete:t})},{signal:n})}function Pe(r,e,t){const i=r.querySelector(".s9-terminal__output");if(!i)return;const n=document.createElement("span");n.className=`s9-terminal__line s9-terminal__line--${t}`,n.textContent=e,i.appendChild(n);const a=200,s=i.querySelectorAll(".s9-terminal__line");s.length>a&&s[0].remove(),g_(i)}function f_(r){const e=r.querySelector(".s9-terminal__output");e&&(e.querySelectorAll(".s9-terminal__line").forEach(t=>t.remove()),r.dispatchEvent(new CustomEvent("s9:terminal-clear",{bubbles:!0})))}function m_(r,e,{onSubmit:t,tabComplete:i}){const n=uu.get(r);if(!n)return;const a=r.querySelector(".s9-terminal__input");if(a)switch(e.key){case"Enter":{const s=a.value;if(!s)return;Pe(r,s,"cmd"),typeof t=="function"&&t(s),r.dispatchEvent(new CustomEvent("s9:terminal-submit",{bubbles:!0,detail:{command:s,timestamp:new Date().toISOString()}})),n.history.unshift(s),n.historyIndex=-1,n.partialInput="",a.value="";break}case"ArrowUp":{if(e.preventDefault(),n.history.length===0)return;n.historyIndex===-1&&(n.partialInput=a.value);const s=n.historyIndex+1;if(s<n.history.length){n.historyIndex=s,a.value=n.history[n.historyIndex];const o=a.value.length;a.setSelectionRange(o,o)}break}case"ArrowDown":{if(e.preventDefault(),n.historyIndex===-1)return;if(n.historyIndex>0){n.historyIndex-=1,a.value=n.history[n.historyIndex];const s=a.value.length;a.setSelectionRange(s,s)}else{n.historyIndex=-1,a.value=n.partialInput;const s=a.value.length;a.setSelectionRange(s,s)}break}case"Tab":{if(e.preventDefault(),typeof i=="function"){const s=i(a.value);s!=null&&(a.value=s)}break}default:{if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!n.reducedMotion&&Math.random()<.01){const s=r.querySelector(".s9-terminal__output");if(s){const o=Array.from(s.querySelectorAll(".s9-terminal__line")).slice(-8);if(o.length>0){const l=o[Math.floor(Math.random()*o.length)];l.classList.add("glitch-enter"),l.addEventListener("animationend",c=>{c.animationName==="glitch"&&l.classList.remove("glitch-enter")},{once:!0})}}}break}}}function g_(r){r.scrollTop=r.scrollHeight}const hu=new WeakMap;function __(r){const e=new AbortController,{signal:t}=e,i={ac:e,paused:!1,filter:null};hu.set(r,i);const n=r.querySelector(".s9-stream__body");n&&(n.addEventListener("mouseenter",()=>{i.paused=!0,n.dataset.paused="true"},{signal:t}),n.addEventListener("mouseleave",()=>{i.paused=!1,n.dataset.paused="false",du(n)},{signal:t}),n.addEventListener("click",a=>{const s=a.target.closest(".s9-stream__row");if(!s)return;const o=s.classList.contains("s9-stream__row--pinned");s.classList.toggle("s9-stream__row--pinned",!o),r.dispatchEvent(new CustomEvent("s9:stream-row-pinned",{bubbles:!0,detail:{row:s,pinned:!o}}))},{signal:t}))}function bn(r,{timestamp:e,source:t,message:i,alert:n=!1}){const a=r.querySelector(".s9-stream__body");if(!a)return;const s=hu.get(r),o=(s==null?void 0:s.filter)??null,l=document.createElement("div");l.className="s9-stream__row",n&&l.classList.add("s9-stream__row--alert"),o&&t!==o&&(l.hidden=!0),l.innerHTML=`<span class="s9-stream__timestamp">${xs(e)}</span><span class="s9-stream__source">${xs(t)}</span><span class="s9-stream__message">${xs(i)}</span>`,l.classList.add("glitch-enter"),l.addEventListener("animationend",()=>l.classList.remove("glitch-enter"),{once:!0}),a.appendChild(l),a.children.length>100&&a.removeChild(a.firstChild),s!=null&&s.paused||du(a)}function du(r){r.scrollTop=r.scrollHeight}function xs(r){return String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function v_(r,e){e(),r.classList.remove("glitch-enter"),r.offsetWidth,r.classList.add("glitch-enter"),r.addEventListener("animationend",()=>r.classList.remove("glitch-enter"),{once:!0})}const oc=new WeakMap;function na(r,e){const t=Math.max(0,Math.min(100,e)),i=r.querySelector(".s9-telemetry__bar-fill");if(i){i.style.width=`${t}%`;const o=["s9-telemetry__bar-fill--ok","s9-telemetry__bar-fill--warning","s9-telemetry__bar-fill--critical"];i.classList.remove(...o),t<=60?i.classList.add("s9-telemetry__bar-fill--ok"):t<=85?i.classList.add("s9-telemetry__bar-fill--warning"):i.classList.add("s9-telemetry__bar-fill--critical")}const n=r.querySelector(".s9-telemetry__value");n&&(n.textContent=Math.round(t).toString());const a=oc.get(r)??!1,s=t>85;s&&!a&&r.dispatchEvent(new CustomEvent("s9:telemetry-threshold",{bubbles:!0,detail:{value:t}})),oc.set(r,s)}const M_=8e3;function x_(r,{level:e="critical",code:t,message:i,persistent:n=!1}){const a=document.createElement("div");a.className=`s9-alert s9-alert--${e}`,n&&(a.dataset.persistent="true");const s=e==="critical"?"⬡":"⚠",o=new Date().toISOString().replace("T"," ").substring(0,19)+" UTC";return a.innerHTML=`<span class="s9-alert__icon" aria-hidden="true">${s}</span><div class="s9-alert__body"><span class="s9-alert__code">${Ss(t)}</span><span class="s9-alert__message">${Ss(i)}</span></div><span class="s9-alert__timestamp">${Ss(o)}</span><button class="s9-alert__dismiss" aria-label="Dismiss alert">✕</button>`,a.classList.add("glitch-enter"),a.addEventListener("animationend",()=>a.classList.remove("glitch-enter"),{once:!0}),a.querySelector(".s9-alert__dismiss").addEventListener("click",()=>{lc(a)}),r.appendChild(a),n||setTimeout(()=>{a.isConnected&&lc(a)},M_),a}function lc(r){var e;if(!r.isConnected)return;const t=((e=r.querySelector(".s9-alert__code"))==null?void 0:e.textContent)??"";r.classList.add("s9-alert--dismissing"),r.addEventListener("transitionend",()=>{r.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:t}})),r.remove()},{once:!0}),setTimeout(()=>{r.isConnected&&(r.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:t}})),r.remove())},400)}function Ss(r){return String(r).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const kt="http://www.w3.org/2000/svg",gi=new WeakMap;function S_(r,{nodes:e=[],edges:t=[]}={}){const i=new AbortController,{signal:n}=i,a=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s={abortController:i,nodeMap:new Map,edgeMap:new Map,activeNodeId:null,reducedMotion:a};gi.set(r,s);const o=document.createElementNS(kt,"svg");o.setAttribute("class","s9-matrix__canvas"),o.setAttribute("viewBox","0 0 100 100"),o.setAttribute("preserveAspectRatio","xMidYMid meet"),o.setAttribute("role","img"),o.setAttribute("aria-label","Network topology matrix");const l=document.createElementNS(kt,"defs"),c=document.createElementNS(kt,"g");c.setAttribute("class","s9-matrix__edges");const u=document.createElementNS(kt,"g");u.setAttribute("class","s9-matrix__nodes"),o.appendChild(l),o.appendChild(c),o.appendChild(u),r.appendChild(o),e.forEach(h=>b_(r,h)),t.forEach(h=>E_(r,h)),t.forEach(h=>{h.active&&Eo(r,h.id)}),o.addEventListener("click",h=>{const d=h.target.closest("[data-node-id]");d?ga(r,d.dataset.nodeId):s.activeNodeId!==null&&ga(r,null)},{signal:n}),o.addEventListener("keydown",h=>{if(h.key==="Enter"||h.key===" "){const d=h.target.closest("[data-node-id]");d&&(h.preventDefault(),ga(r,d.dataset.nodeId))}},{signal:n})}function y_(r,e){const t=gi.get(r);if(!t)return;const i=t.nodeMap.get(e);if(!i||i.classList.contains("s9-matrix__node--active"))return;i.classList.add("s9-matrix__node--pulsing");const n=i.querySelector(".s9-matrix__node-ring");n&&n.addEventListener("animationend",a=>{a.animationName==="matrix-ring-pulse"&&i.classList.remove("s9-matrix__node--pulsing")},{once:!0})}function Eo(r,e,t=null){const i=gi.get(r);if(!i)return;if(e===null){for(const[x]of i.edgeMap)pu(r,x);return}const n=i.edgeMap.get(e);if(!n||n.active)return;const a=r.querySelector(".s9-matrix__canvas");if(!a)return;const s=a.querySelector(".s9-matrix__edges");if(!s)return;const{line:o,x1:l,y1:c,x2:u,y2:h}=n;o&&o.parentNode&&o.parentNode.removeChild(o);const d=`s9-edge-${e}`,p=document.createElementNS(kt,"path");p.setAttribute("class","s9-matrix__edge s9-matrix__edge--active"),p.setAttribute("id",d),p.setAttribute("data-edge-id",e),p.setAttribute("d",`M ${l} ${c} L ${u} ${h}`),s.appendChild(p);let g=null;if(!i.reducedMotion){g=document.createElementNS(kt,"circle"),g.setAttribute("class","s9-matrix__edge-dot"),g.setAttribute("r","1.2"),t&&(g.style.fill=t,g.style.filter=`drop-shadow(0 0 2px ${t})`);const x=document.createElementNS(kt,"animateMotion");x.setAttribute("dur","2s"),x.setAttribute("repeatCount","indefinite");const m=document.createElementNS(kt,"mpath");m.setAttributeNS("http://www.w3.org/1999/xlink","href",`#${d}`),x.appendChild(m),g.appendChild(x),s.appendChild(g)}n.line=p,n.dot=g,n.active=!0}function pu(r,e){const t=gi.get(r);if(!t)return;const i=t.edgeMap.get(e);if(!i||!i.active)return;const n=r.querySelector(".s9-matrix__canvas");if(!n)return;const a=n.querySelector(".s9-matrix__edges");if(!a)return;const{line:s,dot:o,x1:l,y1:c,x2:u,y2:h}=i;o&&o.parentNode&&o.parentNode.removeChild(o),s&&s.parentNode&&s.parentNode.removeChild(s);const d=document.createElementNS(kt,"line");d.setAttribute("class","s9-matrix__edge"),d.setAttribute("data-edge-id",e),d.setAttribute("x1",l),d.setAttribute("y1",c),d.setAttribute("x2",u),d.setAttribute("y2",h),a.appendChild(d),i.line=d,i.dot=null,i.active=!1}function ga(r,e){const t=gi.get(r);if(!t)return;if(t.activeNodeId!==null){const n=t.nodeMap.get(t.activeNodeId);n&&(n.classList.remove("s9-matrix__node--active"),n.setAttribute("aria-pressed","false")),r.dispatchEvent(new CustomEvent("s9:matrix-node-deselect",{bubbles:!0,detail:{nodeId:t.activeNodeId}})),t.activeNodeId=null}if(e===null)return;const i=t.nodeMap.get(e);i&&(i.classList.add("s9-matrix__node--active"),i.setAttribute("aria-pressed","true"),t.activeNodeId=e,r.dispatchEvent(new CustomEvent("s9:matrix-node-click",{bubbles:!0,detail:{nodeId:e,label:i.getAttribute("aria-label")??e}})))}function b_(r,{id:e,x:t,y:i,label:n,root:a=!1}){const s=gi.get(r);if(!s)return;const o=r.querySelector(".s9-matrix__canvas");if(!o)return;const l=o.querySelector(".s9-matrix__nodes");if(!l)return;const c=document.createElementNS(kt,"g");c.setAttribute("class",`s9-matrix__node${a?" s9-matrix__node--root":""}`),c.setAttribute("data-node-id",e),c.setAttribute("tabindex","0"),c.setAttribute("role","button"),c.setAttribute("aria-label",n),c.setAttribute("aria-pressed","false");const u=document.createElementNS(kt,"circle");u.setAttribute("class","s9-matrix__node-ring"),u.setAttribute("cx",t),u.setAttribute("cy",i),u.setAttribute("r","4");const h=document.createElementNS(kt,"circle");h.setAttribute("class","s9-matrix__node-core"),h.setAttribute("cx",t),h.setAttribute("cy",i),h.setAttribute("r","2.5");const d=document.createElementNS(kt,"text");d.setAttribute("class","s9-matrix__node-label"),d.setAttribute("x",t),d.setAttribute("y",i+3.5),d.textContent=n,c.appendChild(u),c.appendChild(h),c.appendChild(d),l.appendChild(c),s.nodeMap.set(e,c)}function E_(r,{id:e,from:t,to:i}){const n=gi.get(r);if(!n)return;const a=r.querySelector(".s9-matrix__canvas");if(!a)return;const s=a.querySelector(".s9-matrix__edges");if(!s)return;const o=n.nodeMap.get(t),l=n.nodeMap.get(i),c=o?parseFloat(o.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,u=o?parseFloat(o.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,h=l?parseFloat(l.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,d=l?parseFloat(l.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,p=document.createElementNS(kt,"line");p.setAttribute("class","s9-matrix__edge"),p.setAttribute("data-edge-id",e),p.setAttribute("x1",c),p.setAttribute("y1",u),p.setAttribute("x2",h),p.setAttribute("y2",d),s.appendChild(p),n.edgeMap.set(e,{line:p,dot:null,active:!1,from:t,to:i,x1:c,y1:u,x2:h,y2:d})}const cc={type:"change"},jo={type:"start"},fu={type:"end"},aa=new Ia,uc=new Vr,T_=Math.cos(70*Th.DEG2RAD),yt=new P,Bt=2*Math.PI,Je={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ys=1e-6;class w_ extends vd{constructor(e,t=null){super(e,t),this.state=Je.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Hi.ROTATE,MIDDLE:Hi.DOLLY,RIGHT:Hi.PAN},this.touches={ONE:Bi.ROTATE,TWO:Bi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new qr,this._lastTargetPosition=new P,this._quat=new qr().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ol,this._sphericalDelta=new Ol,this._scale=1,this._panOffset=new P,this._rotateStart=new De,this._rotateEnd=new De,this._rotateDelta=new De,this._panStart=new De,this._panEnd=new De,this._panDelta=new De,this._dollyStart=new De,this._dollyEnd=new De,this._dollyDelta=new De,this._dollyDirection=new P,this._mouse=new De,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=C_.bind(this),this._onPointerDown=A_.bind(this),this._onPointerUp=R_.bind(this),this._onContextMenu=O_.bind(this),this._onMouseWheel=D_.bind(this),this._onKeyDown=I_.bind(this),this._onTouchStart=U_.bind(this),this._onTouchMove=N_.bind(this),this._onMouseDown=P_.bind(this),this._onMouseMove=L_.bind(this),this._interceptControlDown=F_.bind(this),this._interceptControlUp=B_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(cc),this.update(),this.state=Je.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;yt.copy(t).sub(this.target),yt.applyQuaternion(this._quat),this._spherical.setFromVector3(yt),this.autoRotate&&this.state===Je.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(i)&&isFinite(n)&&(i<-Math.PI?i+=Bt:i>Math.PI&&(i-=Bt),n<-Math.PI?n+=Bt:n>Math.PI&&(n-=Bt),i<=n?this._spherical.theta=Math.max(i,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+n)/2?Math.max(i,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const s=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=s!=this._spherical.radius}if(yt.setFromSpherical(this._spherical),yt.applyQuaternion(this._quatInverse),t.copy(this.target).add(yt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let s=null;if(this.object.isPerspectiveCamera){const o=yt.length();s=this._clampDistance(o*this._scale);const l=o-s;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),a=!!l}else if(this.object.isOrthographicCamera){const o=new P(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=l!==this.object.zoom;const c=new P(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),s=yt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;s!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position):(aa.origin.copy(this.object.position),aa.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(aa.direction))<T_?this.object.lookAt(this.target):(uc.setFromNormalAndCoplanarPoint(this.object.up,this.target),aa.intersectPlane(uc,this.target))))}else if(this.object.isOrthographicCamera){const s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),s!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>ys||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ys||this._lastTargetPosition.distanceToSquared(this.target)>ys?(this.dispatchEvent(cc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Bt/60*this.autoRotateSpeed*e:Bt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){yt.setFromMatrixColumn(t,0),yt.multiplyScalar(-e),this._panOffset.add(yt)}_panUp(e,t){this.screenSpacePanning===!0?yt.setFromMatrixColumn(t,1):(yt.setFromMatrixColumn(t,0),yt.crossVectors(this.object.up,yt)),yt.multiplyScalar(e),this._panOffset.add(yt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;yt.copy(n).sub(this.target);let a=yt.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*a/i.clientHeight,this.object.matrix),this._panUp(2*t*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),n=e-i.left,a=t-i.top,s=i.width,o=i.height;this._mouse.x=n/s*2-1,this._mouse.y=-(a/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Bt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Bt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Bt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Bt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Bt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Bt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panStart.set(i,n)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,n=e.pageY-t.y,a=Math.sqrt(i*i+n*n);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),n=.5*(e.pageX+i.x),a=.5*(e.pageY+i.y);this._rotateEnd.set(n,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Bt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Bt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,n=e.pageY-t.y,a=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const s=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(s,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new De,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function A_(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function C_(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function R_(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(fu),this.state=Je.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function P_(r){let e;switch(r.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Hi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=Je.DOLLY;break;case Hi.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Je.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Je.ROTATE}break;case Hi.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=Je.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=Je.PAN}break;default:this.state=Je.NONE}this.state!==Je.NONE&&this.dispatchEvent(jo)}function L_(r){switch(this.state){case Je.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case Je.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case Je.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function D_(r){this.enabled===!1||this.enableZoom===!1||this.state!==Je.NONE||(r.preventDefault(),this.dispatchEvent(jo),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(fu))}function I_(r){this.enabled!==!1&&this._handleKeyDown(r)}function U_(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case Bi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=Je.TOUCH_ROTATE;break;case Bi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=Je.TOUCH_PAN;break;default:this.state=Je.NONE}break;case 2:switch(this.touches.TWO){case Bi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=Je.TOUCH_DOLLY_PAN;break;case Bi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=Je.TOUCH_DOLLY_ROTATE;break;default:this.state=Je.NONE}break;default:this.state=Je.NONE}this.state!==Je.NONE&&this.dispatchEvent(jo)}function N_(r){switch(this._trackPointer(r),this.state){case Je.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case Je.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case Je.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case Je.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=Je.NONE}}function O_(r){this.enabled!==!1&&r.preventDefault()}function F_(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function B_(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const _a={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Pn{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const z_=new Ua(-1,1,1,-1,0,1);class H_ extends ht{constructor(){super(),this.setAttribute("position",new Nt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Nt([0,2,0,0,2,0],2))}}const k_=new H_;class mu{constructor(e){this._mesh=new rt(k_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,z_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class gu extends Pn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ct?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ra.clone(e.uniforms),this.material=new ct({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new mu(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class hc extends Pn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const n=e.getContext(),a=e.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let s,o;this.inverse?(s=0,o=1):(s=1,o=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),a.buffers.stencil.setFunc(n.ALWAYS,s,4294967295),a.buffers.stencil.setClear(o),a.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(n.EQUAL,1,4294967295),a.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),a.buffers.stencil.setLocked(!0)}}class G_ extends Pn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class V_{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new De);this._width=i.width,this._height=i.height,t=new Gt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:qt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new gu(_a),this.copyPass.material.blending=gr,this.timer=new md}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let n=0,a=this.passes.length;n<a;n++){const s=this.passes[n];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),s.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}hc!==void 0&&(s instanceof hc?i=!0:s instanceof G_&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new De);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(i,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class W_ extends Pn{constructor(e,t,i=null,n=null,a=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ee}render(e,t,i){const n=e.autoClear;e.autoClear=!1;let a,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(a=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=n}}const X_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ee(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class qi extends Pn{constructor(e,t=1,i,n){super(),this.strength=t,this.radius=i,this.threshold=n,this.resolution=e!==void 0?new De(e.x,e.y):new De(256,256),this.clearColor=new Ee(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new Gt(a,s,{type:qt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const h=new Gt(a,s,{type:qt});h.texture.name="UnrealBloomPass.h"+u,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const d=new Gt(a,s,{type:qt});d.texture.name="UnrealBloomPass.v"+u,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),a=Math.round(a/2),s=Math.round(s/2)}const o=X_;this.highPassUniforms=Ra.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ct({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new De(1/a,1/s),a=Math.round(a/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ra.clone(_a.uniforms),this.blendMaterial=new ct({uniforms:this.copyUniforms,vertexShader:_a.vertexShader,fragmentShader:_a.fragmentShader,premultipliedAlpha:!0,blending:Pt,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ee,this._oldClearAlpha=1,this._basic=new ar,this._fsQuad=new mu(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),n=Math.round(t/2);this.renderTargetBright.setSize(i,n);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(i,n),this.renderTargetsVertical[a].setSize(i,n),this.separableBlurMaterials[a].uniforms.invSize.value=new De(1/i,1/n),i=Math.round(i/2),n=Math.round(n/2)}render(e,t,i,n,a){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),a&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=qi.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=qi.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=s}_getSeparableBlurMaterial(e){const t=[],i=e/3;for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(i*i))/i);return new ct({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new De(.5,.5)},direction:{value:new De(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new ct({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}qi.BlurDirectionX=new De(1,0);qi.BlurDirectionY=new De(0,1);function j_(r){return r}function Y_(r){if(r==null)return j_;var e,t,i=r.scale[0],n=r.scale[1],a=r.translate[0],s=r.translate[1];return function(o,l){l||(e=t=0);var c=2,u=o.length,h=new Array(u);for(h[0]=(e+=o[0])*i+a,h[1]=(t+=o[1])*n+s;c<u;)h[c]=o[c],++c;return h}}function q_(r,e){for(var t,i=r.length,n=i-e;n<--i;)t=r[n],r[n++]=r[i],r[i]=t}function $_(r,e){return typeof e=="string"&&(e=r.objects[e]),e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(t){return dc(r,t)})}:dc(r,e)}function dc(r,e){var t=e.id,i=e.bbox,n=e.properties==null?{}:e.properties,a=_u(r,e);return t==null&&i==null?{type:"Feature",properties:n,geometry:a}:i==null?{type:"Feature",id:t,properties:n,geometry:a}:{type:"Feature",id:t,bbox:i,properties:n,geometry:a}}function _u(r,e){var t=Y_(r.transform),i=r.arcs;function n(u,h){h.length&&h.pop();for(var d=i[u<0?~u:u],p=0,g=d.length;p<g;++p)h.push(t(d[p],p));u<0&&q_(h,g)}function a(u){return t(u)}function s(u){for(var h=[],d=0,p=u.length;d<p;++d)n(u[d],h);return h.length<2&&h.push(h[0]),h}function o(u){for(var h=s(u);h.length<4;)h.push(h[0]);return h}function l(u){return u.map(o)}function c(u){var h=u.type,d;switch(h){case"GeometryCollection":return{type:h,geometries:u.geometries.map(c)};case"Point":d=a(u.coordinates);break;case"MultiPoint":d=u.coordinates.map(a);break;case"LineString":d=s(u.arcs);break;case"MultiLineString":d=u.arcs.map(s);break;case"Polygon":d=l(u.arcs);break;case"MultiPolygon":d=u.arcs.map(l);break;default:return null}return{type:h,coordinates:d}}return c(e)}function K_(r,e){var t={},i={},n={},a=[],s=-1;e.forEach(function(c,u){var h=r.arcs[c<0?~c:c],d;h.length<3&&!h[1][0]&&!h[1][1]&&(d=e[++s],e[s]=c,e[u]=d)}),e.forEach(function(c){var u=o(c),h=u[0],d=u[1],p,g;if(p=n[h])if(delete n[p.end],p.push(c),p.end=d,g=i[d]){delete i[g.start];var x=g===p?p:p.concat(g);i[x.start=p.start]=n[x.end=g.end]=x}else i[p.start]=n[p.end]=p;else if(p=i[d])if(delete i[p.start],p.unshift(c),p.start=h,g=n[h]){delete n[g.end];var m=g===p?p:g.concat(p);i[m.start=g.start]=n[m.end=p.end]=m}else i[p.start]=n[p.end]=p;else p=[c],i[p.start=h]=n[p.end=d]=p});function o(c){var u=r.arcs[c<0?~c:c],h=u[0],d;return r.transform?(d=[0,0],u.forEach(function(p){d[0]+=p[0],d[1]+=p[1]})):d=u[u.length-1],c<0?[d,h]:[h,d]}function l(c,u){for(var h in c){var d=c[h];delete u[d.start],delete d.start,delete d.end,d.forEach(function(p){t[p<0?~p:p]=1}),a.push(d)}}return l(n,i),l(i,n),e.forEach(function(c){t[c<0?~c:c]||a.push([c])}),a}function pc(r){return _u(r,Z_.apply(this,arguments))}function Z_(r,e,t){var i,n,a;if(arguments.length>1)i=J_(r,e,t);else for(n=0,i=new Array(a=r.arcs.length);n<a;++n)i[n]=n;return{type:"MultiLineString",arcs:K_(r,i)}}function J_(r,e,t){var i=[],n=[],a;function s(h){var d=h<0?~h:h;(n[d]||(n[d]=[])).push({i:h,g:a})}function o(h){h.forEach(s)}function l(h){h.forEach(o)}function c(h){h.forEach(l)}function u(h){switch(a=h,h.type){case"GeometryCollection":h.geometries.forEach(u);break;case"LineString":o(h.arcs);break;case"MultiLineString":case"Polygon":l(h.arcs);break;case"MultiPolygon":c(h.arcs);break}}return u(e),n.forEach(t==null?function(h){i.push(h[0].i)}:function(h){t(h[0].g,h[h.length-1].g)&&i.push(h[0].i)}),i}const Q_=40,ev=70,Gi=1,mt=new WeakMap;let va=null;function Oi(r,e,t=1.03){const i=(90-r)*(Math.PI/180),n=(e+180)*(Math.PI/180);return new P(-t*Math.sin(i)*Math.cos(n),t*Math.cos(i),t*Math.sin(i)*Math.sin(n))}function $r(){const r=getComputedStyle(document.documentElement);return{neonCyan:r.getPropertyValue("--neon-cyan").trim(),neonGreen:r.getPropertyValue("--neon-green").trim(),neonAmber:r.getPropertyValue("--neon-amber").trim(),neonMagenta:r.getPropertyValue("--neon-magenta").trim()}}function di(r,e){return r<=Q_?e.neonGreen:r<=ev?e.neonAmber:e.neonMagenta}const tv={uniforms:{tDiffuse:{value:null},shiftAmt:{value:.9}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:`
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
  `};function vu(r,{autoRotate:e=!0,bloomStrength:t=1.7}={}){const i=new AbortController,{signal:n}=i,a=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s=$r(),o=new Xo({E:!0,alpha:!0});o.setPixelRatio(window.devicePixelRatio),o.setSize(r.clientWidth||800,r.clientHeight||600),o.domElement.classList.add("s9-threatmap__canvas"),o.domElement.style.filter="blur(0.66px) drop-shadow(0 1 4px rgba(0,200,255,0.84))",r.appendChild(o.domElement);const l=new Vo,c=new Yt(45,(r.clientWidth||800)/(r.clientHeight||600),.1,100);c.position.set(0,0,3);const u=new vr(Gi,48,48),h=new vr(Gi*.98,48,48),d=new Ee(s.neonCyan||"#00d4b0"),p=new ar({color:d,wireframe:!0,transparent:!0,opacity:.005,depthTest:!0,depthWrite:!0,side:Ut}),g=new rt(u,p);g.renderOrder=0,l.add(g);const x=new ar({colorWrite:!1,depthWrite:!0,depthTest:!0,depthFunc:ba,side:Ut}),m=new rt(h,x);m.renderOrder=1,l.add(m);const f=new ar({color:new Ee("#010e0b"),transparent:!0,opacity:.85,depthTest:!0,depthWrite:!0,side:nr}),S=new rt(u,f);S.renderOrder=1,l.add(S);const E=new ar({color:d,wireframe:!0,transparent:!0,opacity:.002,depthTest:!0,depthWrite:!1,side:lr}),y=new rt(u,E);y.renderOrder=2,l.add(y);const A=new ar({color:d,wireframe:!0,transparent:!0,opacity:.0061,blending:Pt,depthTest:!0,depthWrite:!1}),w=new rt(u,A);w.renderOrder=3,l.add(w);const D=new vr(Gi,48,48),v=new ct({uniforms:{uColor:{value:new P(d.r,d.g,d.b)}},vertexShader:`
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
    `,transparent:!0,blending:Pt,depthWrite:!0,side:lr}),T=new rt(D,v);T.renderOrder=4,l.add(T);const W=new w_(c,o.domElement);W.enableDamping=!0,W.dampingFactor=.05,W.autoRotate=e&&!a,W.autoRotateSpeed=.4,W.enablePan=!1,W.minDistance=1.5,W.maxDistance=5,W.minPolarAngle=Math.PI/2-42.5*Math.PI/180,W.maxPolarAngle=Math.PI/2+42.5*Math.PI/180;const C=new V_(o),O=new W_(l,c);C.addPass(O);const H=new qi(new De(r.clientWidth||800,r.clientHeight||600),t*1.8,1.525,.45);C.addPass(H);const V=new gu(tv);V.enabled=!1,C.addPass(V);const k=document.createElement("div");k.className="s9-threatmap__overlay",k.innerHTML=`
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
  `,r.appendChild(k);let z=null;function F(){z=requestAnimationFrame(F),W.update(),C.render()}F();let Q=null;W.addEventListener("start",()=>{W.autoRotate=!1,Q!==null&&(clearTimeout(Q),Q=null);const ne=mt.get(r);ne&&(ne.cameraLerpTarget=null,ne.lastOrbitInteraction=Date.now())}),W.addEventListener("end",()=>{!a&&e&&(Q=setTimeout(()=>{W.autoRotate=!0,Q=null},6e3))});const K=new ResizeObserver(()=>{const ne=r.clientWidth,Fe=r.clientHeight;!ne||!Fe||(c.aspect=ne/Fe,c.updateProjectionMatrix(),o.setSize(ne,Fe),C.setSize(ne,Fe),H.resolution.set(ne,Fe))});K.observe(r);const le=new _d;o.domElement.addEventListener("click",ne=>{const Fe=mt.get(r);if(!Fe)return;const Ne=o.domElement.getBoundingClientRect(),j=Ne.width,Z=Ne.height,ae=(ne.clientX-Ne.left)/j*2-1,Oe=-((ne.clientY-Ne.top)/Z)*2+1;le.setFromCamera(new De(ae,Oe),c);const Ae=Array.from(Fe.nodeMap.values()).map(qe=>qe.mesh),pe=le.intersectObjects(Ae,!1);if(pe.length>0){const qe=pe[0].object;xr(r,qe.userData.nodeId)}else Fe.activeNodeId!==null&&xr(r,null)},{signal:n}),mt.set(r,{animFrameId:z,renderer:o,composer:C,bloomPass:H,controls:W,scene:l,camera:c,resizeObserver:K,nodeMap:new Map,edgeMap:new Map,abortController:i,resumeTimer:null,reducedMotion:a,activeNodeId:null,colors:s,cyanColor:d,globeGeo:u,occluderGeo:h,globeBack:g,occluder:m,globeSurface:S,globeFront:y,globeGlow:w,rimGeo:D,rimMesh:T,geoGroup:null,cameraLerpTarget:null,lastOrbitInteraction:0,arcs:[],satelliteMode:!1,sunAngle:Math.random()*Math.PI*2,satelliteGroup:null,glitchPass:V,glitchActive:null,glitchNext:performance.now()+8e3+Math.random()*12e3});const de=mt.get(r);de.animFrameId=z,cancelAnimationFrame(z);function Me(){const ne=mt.get(r);if(ne){ne.animFrameId=requestAnimationFrame(Me),ne.cameraLerpTarget&&Date.now()-ne.lastOrbitInteraction>=3e3&&(ne.camera.position.lerp(ne.cameraLerpTarget,.06),ne.camera.position.distanceTo(ne.cameraLerpTarget)<.04&&(ne.camera.position.copy(ne.cameraLerpTarget),ne.cameraLerpTarget=null)),ne.controls.update();for(let Fe=ne.arcs.length-1;Fe>=0;Fe--){const Ne=ne.arcs[Fe],j=Math.min(1,(Date.now()-Ne.t0)/Ne.dur);if(Ne.particle.position.copy(Ne.curve.getPoint(j)),j>.75){const Z=1-(j-.75)/.25;Ne.ptMat.opacity=.9*Z,Ne.lineMat.opacity=.1*Z}j>=1&&(ne.scene.remove(Ne.line),ne.scene.remove(Ne.particle),Ne.lineGeo.dispose(),Ne.lineMat.dispose(),Ne.ptGeo.dispose(),Ne.ptMat.dispose(),ne.arcs.splice(Fe,1))}if(ne.satelliteMode&&ne.satMat&&(ne.sunAngle+=15e-5,ne.satMat.uniforms.sunDir.value.set(Math.cos(ne.sunAngle),.22,Math.sin(ne.sunAngle)).normalize()),av(ne),ne.activeNodeId!==null){const Fe=ne.nodeMap.get(ne.activeNodeId),Ne=r.querySelector(".s9-threatmap__crosshair");if(Fe&&Ne){const j=r.clientWidth,Z=r.clientHeight,ae=Fe.mesh.position.clone().project(ne.camera),Oe=(ae.x*.5+.5)*j,Ae=(-ae.y*.5+.5)*Z;Ne.style.left=`${Oe}px`,Ne.style.top=`${Ae}px`}}ne.composer.render()}}de.animFrameId=requestAnimationFrame(Me),nv(r)}function rv(r){var e;return((e=mt.get(r))==null?void 0:e.camera)??null}function To(r,{id:e,lat:t,lng:i,label:n,level:a}){const s=mt.get(r);if(!s)return;if(s.nodeMap.has(e)){console.warn(`[s9-threatmap] addNode: node "${e}" already exists.`);return}const o=$r(),l=di(a,o),c=new vr(.02,8,8),u=new ar({color:new Ee(l)}),h=new rt(c,u),d=Oi(t,i);h.position.copy(d),h.userData.nodeId=e,h.userData.label=n,h.userData.lat=t,h.userData.lng=i,h.userData.level=a,s.scene.add(h),s.nodeMap.set(e,{mesh:h,lat:t,lng:i,label:n,level:a}),xu(r)}function Mu(r,e){const t=mt.get(r);if(!t)return;const i=t.nodeMap.get(e);if(!i){console.warn(`[s9-threatmap] removeNode: node "${e}" not found.`);return}t.activeNodeId===e&&xr(r,null);for(const[n,a]of t.edgeMap)(a.from===e||a.to===e)&&iv(r,n);i.mesh.geometry.dispose(),i.mesh.material.dispose(),t.scene.remove(i.mesh),t.nodeMap.delete(e),xu(r)}function iv(r,e){const t=mt.get(r);if(!t)return;const i=t.edgeMap.get(e);i&&(i.line.geometry.dispose(),i.line.material.dispose(),t.scene.remove(i.line),t.edgeMap.delete(e))}function xr(r,e){const t=mt.get(r);if(!t)return;if(t.activeNodeId!==null){const l=t.nodeMap.get(t.activeNodeId);if(l){const d=$r();l.mesh.material.color.set(di(l.level,d))}const c=r.querySelector(".s9-threatmap__crosshair");if(c){c.classList.remove("s9-threatmap__crosshair--visible");const d=c.querySelector(".s9-threatmap__crosshair-label");d&&(d.textContent="")}r.removeAttribute("data-active-node");const u=r.querySelector(".s9-threatmap__coords-lat"),h=r.querySelector(".s9-threatmap__coords-lng");u&&(u.textContent="LAT: --.-°"),h&&(h.textContent="LNG: --.-°"),r.dispatchEvent(new CustomEvent("s9:threatmap-node-deselect",{bubbles:!0,detail:{nodeId:t.activeNodeId}})),t.activeNodeId=null}if(e===null)return;const i=t.nodeMap.get(e);if(!i)return;const n=$r();i.mesh.material.color.set(di(i.level,n));const a=r.querySelector(".s9-threatmap__crosshair");if(a){a.classList.add("s9-threatmap__crosshair--visible");const l=a.querySelector(".s9-threatmap__crosshair-label");l&&(l.textContent=i.label)}r.setAttribute("data-active-node",e);const s=r.querySelector(".s9-threatmap__coords-lat"),o=r.querySelector(".s9-threatmap__coords-lng");s&&(s.textContent=`LAT: ${i.lat.toFixed(2)}°`),o&&(o.textContent=`LNG: ${i.lng.toFixed(2)}°`),t.activeNodeId=e,r.dispatchEvent(new CustomEvent("s9:threatmap-node-select",{bubbles:!0,detail:{nodeId:e,label:i.label,lat:i.lat,lng:i.lng,level:i.level}}))}function Lr(r,e){if(!mt.get(r))return;const t=Math.max(0,Math.min(100,e));r.setAttribute("data-threat-level",t)}function Pa(r,e,t){const i=mt.get(r);if(!i)return;const n=i.nodeMap.get(e);if(!n)return;const a=n.level;if(n.level=t,n.mesh.userData.level=t,i.activeNodeId!==e){const s=$r();n.mesh.material.color.set(di(t,s))}return a}function pi(r,e){const t=mt.get(r);if(!t)return;const i=t.nodeMap.get(e);if(!i||Date.now()-t.lastOrbitInteraction<3e3)return;const n=t.camera.position.length();t.cameraLerpTarget=i.mesh.position.clone().normalize().multiplyScalar(n),t.controls.autoRotate=!1,t.resumeTimer!==null&&(clearTimeout(t.resumeTimer),t.resumeTimer=null)}async function nv(r){let e;try{const d=await fetch("/data/countries-110m.json");if(!d.ok)throw new Error(`HTTP ${d.status}`);e=await d.json(),va=e}catch(d){console.warn("[s9-threatmap] geo lines: failed to load /data/countries-110m.json",d);return}const t=mt.get(r);if(!t)return;const i=new zi,n=t.cyanColor,a=pc(e,e.objects.land),s=new Jt({color:n,transparent:!0,opacity:.85,depthWrite:!0}),o=new Jt({color:n,transparent:!0,opacity:.8,blending:Pt,depthWrite:!0}),l=new Jt({color:n,transparent:!0,opacity:.45,blending:Pt,depthWrite:!1});for(const d of a.coordinates){const p=d.map(([E,y])=>Oi(y,E,1.002)),g=d.map(([E,y])=>Oi(y,E,1.006)),x=d.map(([E,y])=>Oi(y,E,1.011)),m=new Rr(new ht().setFromPoints(p),s),f=new Rr(new ht().setFromPoints(g),o),S=new Rr(new ht().setFromPoints(x),l);m.userData.geoType=f.userData.geoType=S.userData.geoType="coast",i.add(S,f,m)}const c=pc(e,e.objects.countries,(d,p)=>d!==p),u=new Jt({color:n,transparent:!0,opacity:.35,depthWrite:!0}),h=new Jt({color:n,transparent:!0,opacity:.15,blending:Pt,depthWrite:!1});for(const d of c.coordinates){const p=d.map(([f,S])=>Oi(S,f,1.012)),g=d.map(([f,S])=>Oi(S,f,1.022)),x=new Rr(new ht().setFromPoints(p),u),m=new Rr(new ht().setFromPoints(g),h);x.userData.geoType=m.userData.geoType="border",i.add(m,x)}t.scene.add(i),t.satelliteMode&&(i.visible=!1),t.geoGroup=i}function xu(r){const e=mt.get(r);if(!e)return;const t=r.querySelector(".s9-threatmap__node-count");t&&(t.textContent=`NODES: ${e.nodeMap.size}`)}function av(r){const e=r.glitchPass;if(!e)return;const t=performance.now()*.001;e.uniforms.shiftAmt.value=.4+Math.sin(t*.6)*.2}function fc(r,e){const t=mt.get(r);if(!t||t.reducedMotion)return;const i=t.nodeMap.get(e);if(!i)return;const n=$r(),a=di(i.level,n),s=20,o=.035,l=[];for(let x=0;x<=s;x++){const m=x/s*Math.PI*2;l.push(new P(Math.cos(m)*o,Math.sin(m)*o,0))}const c=new ht().setFromPoints(l),u=new Jt({color:new Ee(a),transparent:!0,opacity:.8,depthWrite:!1}),h=new Qc(c,u);h.position.copy(i.mesh.position);const d=i.mesh.position.clone().normalize();h.quaternion.setFromUnitVectors(new P(0,0,1),d),t.scene.add(h);const p=Date.now(),g=700;(function x(){if(!mt.get(r)){t.scene.remove(h),c.dispose(),u.dispose();return}const m=Math.min(1,(Date.now()-p)/g);h.scale.setScalar(1+m*6),u.opacity=.85*(1-m),m<1?requestAnimationFrame(x):(t.scene.remove(h),c.dispose(),u.dispose())})()}function mc(r){const e=mt.get(r);if(!e)return;const t=$r();e.colors=t;const i=t.neonCyan||"#00d48ddf";e.globeBack&&e.globeBack.material.color.set(i),e.globeFront&&e.globeFront.material.color.set(i),e.geoGroup&&e.geoGroup.traverse(n=>{n.isLine&&n.material.color.set(t.neonCyan||"#008410D0")});for(const n of e.nodeMap.values()){const a=di(n.level,t);n.mesh.material.color.set(a),n.mesh.material.emissive.set(a)}}function Su(r,e,t){const i=mt.get(r);if(!i||i.reducedMotion)return;const n=i.nodeMap.get(e),a=i.nodeMap.get(t);if(!n||!a)return;const s=$r(),o=di(a.level,s),l=n.mesh.position.clone(),c=a.mesh.position.clone(),u=l.clone().add(c).multiplyScalar(.5),h=.2+u.length()*.25,d=u.clone().normalize().multiplyScalar(Gi+h),p=new td(l,d,c),g=new ht().setFromPoints(p.getPoints(48)),x=new Jt({color:new Ee(o),transparent:!0,opacity:.1,depthWrite:!1}),m=new Rr(g,x);m.renderOrder=2;const f=new vr(.009,4,4),S=new ar({color:new Ee(o),transparent:!0,opacity:.9}),E=new rt(f,S);E.renderOrder=3,E.position.copy(l),i.scene.add(m),i.scene.add(E),i.arcs.push({curve:p,line:m,lineGeo:g,lineMat:x,particle:E,ptGeo:f,ptMat:S,t0:Date.now(),dur:1e3+Math.random()*700})}function gn(r,e,t,i){return[(e+180)/360*t,(90-r)/180*i]}function sv(r=null){const e=document.createElement("canvas");e.width=2048,e.height=1024;const t=e.getContext("2d"),i=t.createLinearGradient(0,0,0,1024);if(i.addColorStop(0,"#071a2e"),i.addColorStop(.15,"#082035"),i.addColorStop(.5,"#0a2a46"),i.addColorStop(.85,"#082035"),i.addColorStop(1,"#071a2e"),t.fillStyle=i,t.fillRect(0,0,2048,1024),r){const n=$_(r,r.objects.land),a=(n.type==="FeatureCollection"?n.features:[n]).flatMap(l=>{const c=l.geometry;return c?c.type==="Polygon"?[c.coordinates]:c.coordinates:[]}),s=t.createLinearGradient(0,0,0,1024);s.addColorStop(0,"#dce8dc"),s.addColorStop(.06,"#8a9c7a"),s.addColorStop(.16,"#527848"),s.addColorStop(.28,"#4e7040"),s.addColorStop(.4,"#4a6c34"),s.addColorStop(.5,"#3a5c24"),s.addColorStop(.6,"#4a6c34"),s.addColorStop(.72,"#4e7040"),s.addColorStop(.84,"#7a8c6a"),s.addColorStop(.92,"#ccd8c4"),s.addColorStop(1,"#eaf0ea");for(const l of a)for(let c=0;c<l.length;c++){const u=l[c];t.beginPath();for(let h=0;h<u.length;h++){const[d,p]=u[h],g=(d+180)/360*2048,x=(90-p)/180*1024;h===0?t.moveTo(g,x):t.lineTo(g,x)}t.closePath(),t.fillStyle=c===0?s:"#0a2a46",t.fill()}const o=[[22,15,16,28,"rgba(172,142, 88,0.72)"],[23,44,8,12,"rgba(178,148, 96,0.68)"],[27,70,5,9,"rgba(182,158,112,0.52)"],[42,100,6,16,"rgba(152,128, 86,0.58)"],[-25,132,10,17,"rgba(168,134, 82,0.58)"],[-22,-68,4,6,"rgba(142,118, 76,0.48)"],[35,-114,5,8,"rgba(158,128, 82,0.42)"],[40,58,5,8,"rgba(158,134, 88,0.45)"]];for(const[l,c,u,h,d]of o){const[p,g]=gn(l,c,2048,1024),x=h/360*2048,m=u/180*1024,f=t.createRadialGradient(p,g,0,p,g,Math.max(x,m)),S=d.replace(/[\d.]+\)$/,"0)");f.addColorStop(0,d),f.addColorStop(.55,d),f.addColorStop(.88,d.replace(/[\d.]+\)$/,"0.08)")),f.addColorStop(1,S),t.fillStyle=f,t.beginPath(),t.ellipse(p,g,x,m,0,0,Math.PI*2),t.fill()}t.strokeStyle="rgba(120,175,210,0.22)",t.lineWidth=.8;for(const l of a){const c=l[0];t.beginPath();for(let u=0;u<c.length;u++){const[h,d]=c[u],p=(h+180)/360*2048,g=(90-d)/180*1024;u===0?t.moveTo(p,g):t.lineTo(p,g)}t.closePath(),t.stroke()}}t.strokeStyle="rgba(100,150,200,0.04)",t.lineWidth=.5;for(let n=-80;n<=80;n+=30){const a=gn(n,0,2048,1024)[1];t.beginPath(),t.moveTo(0,a),t.lineTo(2048,a),t.stroke()}for(let n=-180;n<=180;n+=30){const a=gn(0,n,2048,1024)[0];t.beginPath(),t.moveTo(a,0),t.lineTo(a,1024),t.stroke()}return e}function ov(){const r=document.createElement("canvas");r.width=1024,r.height=512;const e=r.getContext("2d");e.fillStyle="#000810",e.fillRect(0,0,1024,512);const t=[[40.7,-74,4],[34,-118.2,3.5],[41.9,-87.6,3],[29.8,-95.4,2.5],[19.4,-99.1,3],[43.7,-79.4,3],[45.5,-73.6,2.5],[49.3,-123.1,2],[38.9,-77,2.5],[42.4,-71.1,2.5],[32.8,-96.8,2.5],[33.7,-84.4,2],[37.8,-122.4,2.5],[47.6,-122.3,2],[39.7,-105,2],[33.4,-112.1,2],[36.2,-115.1,2],[29.4,-98.5,2],[32.7,-97.1,2],[30.3,-81.7,1.5],[51,-114.1,2],[53.5,-113.5,2],[49.9,-97.1,2],[14.1,-87.2,1.5],[13.7,-89.2,1.5],[-23.5,-46.6,4],[-22.9,-43.2,3.5],[-34.6,-58.4,3.5],[-12,-77,2],[4.7,-74.1,2],[10.5,-66.9,2],[-33.5,-70.7,2.5],[-3.7,-38.5,2],[-8.1,-34.9,2],[-19.9,-43.9,2.5],[-30,-51.2,2],[-15.8,-47.9,2],[51.5,-.1,4],[48.9,2.3,4],[52.5,13.4,3.5],[55.8,37.6,4],[41,28.9,3.5],[59.9,10.8,2],[59.3,18.1,2],[60.2,25,2],[52.2,21,2.5],[50.1,14.4,2.5],[47.5,19,2.5],[48.2,16.4,2.5],[47.4,8.5,2.5],[48.1,11.6,3],[52.4,4.9,3],[40.4,-3.7,3],[41.4,2.2,3],[45.5,9.2,3],[41.9,12.5,3],[37.9,23.7,2.5],[50,8.7,2.5],[51,13.7,2],[51.2,6.8,2.5],[50.9,4.3,2.5],[53.5,-2.2,2],[55.7,12.6,2],[50.5,30.5,2.5],[59.5,30.3,2.5],[48,37.8,2],[46.5,30.7,2],[49.8,24,2],[50.4,30.5,2],[45.4,28,2],[44.4,26.1,2],[42.7,23.3,2],[37.1,-8.6,2],[30.1,31.3,3.5],[25.2,55.3,2.5],[33.3,44.4,2.5],[35.7,51.4,3],[24.7,46.7,2.5],[31.8,35.2,2],[33.9,35.5,2],[36.8,10.2,2],[32.9,13.2,2],[30.7,29.7,2],[6.5,3.4,2.5],[-26.2,28,3],[-33.9,18.4,2],[-1.3,36.8,2],[5.3,-4,2],[14.7,17.4,1.5],[9.1,7.4,2],[4.4,18.6,1.5],[-4.3,15.3,1.5],[-11.7,43.3,1.5],[-18.9,47.5,1.5],[28.6,77.2,4],[19.1,72.9,3.5],[12.9,77.6,3],[23.7,90.4,3],[24.9,67,2.5],[31.6,74.3,2.5],[33.7,73.1,2],[17.4,78.5,2.5],[22.6,88.4,2.5],[13.1,80.3,2.5],[23,72.6,2],[22.3,70.8,2],[26.9,75.8,2],[21.2,81.4,2],[27.7,85.3,2],[41.3,69.2,2],[43.3,76.9,2],[51.2,71.5,1.5],[53.9,27.6,2],[54.7,55.9,2],[56.8,60.6,2],[55,73.4,2],[56,92.9,2],[52.3,104.3,2],[53.7,87.1,2],[62,129.7,1.5],[43.1,131.9,2],[61.8,34.4,2],[35.7,139.7,5],[37.5,127,4],[39.9,116.4,4.5],[31.2,121.5,4.5],[23.1,113.3,4],[22.3,114.2,3.5],[30.6,104.1,3.5],[32.1,118.8,3.5],[30.3,120.2,3],[36.7,117,2.5],[34.3,108.9,2.5],[26,119.3,2.5],[41.8,123.4,2.5],[45.8,126.5,2.5],[34.6,135.5,3.5],[33.6,130.4,3],[1.3,103.8,3.5],[13.7,100.5,2.5],[10.8,106.7,2.5],[14.6,121,2.5],[3.1,101.7,2.5],[6.2,106.8,3],[21,105.8,2],[-6.2,106.8,2.5],[-33.9,151.2,2.5],[-37.8,144.9,2],[-27.5,153,2],[-31.9,115.9,2],[-43.5,172.6,1.5]];for(const[i,n,a]of t){const[s,o]=gn(i,n,1024,512),l=a*2.2,c=e.createRadialGradient(s,o,0,s,o,l);c.addColorStop(0,"rgba(255,210,120,0.22)"),c.addColorStop(.5,"rgba(255,170,60,0.08)"),c.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=c,e.beginPath(),e.arc(s,o,l,0,Math.PI*2),e.fill()}e.globalCompositeOperation="lighter";for(const[i,n,a]of t){const[s,o]=gn(i,n,1024,512),l=Math.max(1,a*.9),c=e.createRadialGradient(s,o,0,s,o,l);c.addColorStop(0,`rgba(255,245,200,${Math.min(.9,.5+a*.1)})`),c.addColorStop(.6,"rgba(255,200,100,0.15)"),c.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=c,e.beginPath(),e.arc(s,o,l,0,Math.PI*2),e.fill()}return e.globalCompositeOperation="source-over",r}function gc(r){return new Promise((e,t)=>{new hd().load(r,e,void 0,t)})}async function lv(r){const e=mt.get(r);if(!e||e.satelliteGroup)return;let t,i,n=1;try{[t,i]=await Promise.all([gc("/textures/earth_day.jpg"),gc("/textures/earth_night.jpg")]),t.colorSpace=Ht,i.colorSpace=Ht}catch(d){if(console.warn("[s9-threatmap] satellite textures not found, using procedural fallback",d),!va)try{const p=await fetch("/data/countries-110m.json");p.ok&&(va=await p.json())}catch{}t=new xo(sv(va)),i=new xo(ov()),n=0}const a=new ct({uniforms:{dayMap:{value:t},nightMap:{value:i},sunDir:{value:new P(Math.cos(e.sunAngle),.22,Math.sin(e.sunAngle)).normalize()},realTex:{value:n}},vertexShader:`
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
    `}),s=new vr(Gi,64,32),o=new rt(s,a);o.renderOrder=0;const l=new vr(Gi*1.055,32,16),c=new ct({uniforms:{glowCol:{value:new Ee(51455)}},vertexShader:`
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
    `,side:lr,blending:Pt,transparent:!0,depthWrite:!1}),u=new rt(l,c);u.renderOrder=1;const h=new zi;h.add(o),h.add(u),h.visible=!1,e.scene.add(h),Object.assign(e,{satelliteGroup:h,satGeo:s,satMat:a,atmGeo:l,atmMat:c,dayTex:t,nightTex:i})}async function cv(r,e){const t=mt.get(r);t&&(e?(t.globeBack&&(t.globeBack.visible=!1),t.occluder&&(t.occluder.visible=!1),t.globeFront&&(t.globeFront.visible=!1),t.globeSurface&&(t.globeSurface.visible=!1),t.globeGlow&&(t.globeGlow.visible=!1),t.geoGroup&&(t.geoGroup.visible=!1),t.bloomPass&&(t._bloomPrev={strength:t.bloomPass.strength,threshold:t.bloomPass.threshold,radius:t.bloomPass.radius},t.bloomPass.strength=.32,t.bloomPass.threshold=.85,t.bloomPass.radius=.35),t.satelliteMode=!0,await lv(r),t.satelliteGroup&&(t.satelliteGroup.visible=!0)):(t.satelliteGroup&&(t.satelliteGroup.visible=!1),t.globeBack&&(t.globeBack.visible=!0),t.occluder&&(t.occluder.visible=!0),t.globeFront&&(t.globeFront.visible=!0),t.globeSurface&&(t.globeSurface.visible=!0),t.globeGlow&&(t.globeGlow.visible=!0),t.geoGroup&&(t.geoGroup.visible=!0),t.bloomPass&&t._bloomPrev&&(t.bloomPass.strength=t._bloomPrev.strength,t.bloomPass.threshold=t._bloomPrev.threshold,t.bloomPass.radius=t._bloomPrev.radius),t.satelliteMode=!1))}const uv=new WeakMap;function hv(r){const e=new AbortController;uv.set(r,e),r.classList.add("s9-panel--booting"),r.addEventListener("animationend",t=>{t.animationName==="crt-flicker"&&(r.classList.remove("s9-panel--booting"),r.dispatchEvent(new CustomEvent("s9:panel-mount",{bubbles:!0,detail:{id:r.dataset.s9Id??null}})))},{signal:e.signal,once:!0})}const bs=["complete","active","failed","pending"];function dv(r,e){if(!bs.includes(e)){console.warn(`[s9-sequence] Unknown state: "${e}". Expected one of: ${bs.join(", ")}.`);return}bs.forEach(t=>r.classList.remove(`s9-sequence__entry--${t}`)),e==="failed"?(r.classList.add("s9-sequence__entry--fail-flash"),r.addEventListener("animationend",()=>{r.classList.remove("s9-sequence__entry--fail-flash"),r.classList.add("s9-sequence__entry--failed"),_c(r,e)},{once:!0})):(r.classList.add(`s9-sequence__entry--${e}`),_c(r,e))}function _c(r,e){r.dispatchEvent(new CustomEvent("s9:sequence-step-change",{bubbles:!0,detail:{state:e}}))}const wo=[..."アウエオカキケコサシスセソタツテナニヌネ",..."ハヒホマミムメモヤヨラリワー",..."012345789z",...':."*+<>|¦╌▪꞊'],mn=96,vc=2400,Ma=70,pv=.12,fv=.08,mv=16,Mc=3.5,gv=8;function _v(){const r=wo.length,e=mn,t=document.createElement("canvas");t.width=e,t.height=e*r;const i=t.getContext("2d");i.fillStyle="#000",i.fillRect(0,0,t.width,t.height),i.fillStyle="#fff",i.textAlign="center",i.textBaseline="middle",i.font=`${Math.round(e*.78)}px "Matrix-Code", "Share Tech Mono", monospace`,wo.forEach((a,s)=>i.fillText(a,e/2,e*s+e/2));const n=new xo(t);return n.flipY=!1,n.minFilter=uh,n.magFilter=Rt,n.generateMipmaps=!0,{tex:n,count:r,canvas:t,ctx:i}}function vv(){const r=new dd,e=new Nr(1,1);r.index=e.index.clone(),r.setAttribute("position",e.getAttribute("position").clone()),r.setAttribute("uv",e.getAttribute("uv").clone()),e.dispose();const t=vc*Ma,i=new Float32Array(t),n=new Float32Array(t),a=new Float32Array(t),s=new Float32Array(t),o=new Float32Array(t),l=new Float32Array(t),c=new Float32Array(t),u=new Float32Array(t),h=new Float32Array(t),d=new Float32Array(t);for(let p=0;p<vc;p++){const g=Math.random()*Math.PI*2,x=1-2*Math.random(),m=Math.sqrt(1-x*x),f=Math.pow(Math.random(),.12),S=Mc+f*(gv-Mc),E=m*Math.cos(g)*S,y=m*Math.sin(g)*S,A=x*S+(Math.random()-.5)*2,w=.4+Math.random()*1.87,D=Math.random(),v=.5+Math.random()*1,T=.18+Math.random()*.72,W=.004+Math.random()*.03;for(let C=0;C<Ma;C++){const O=p*Ma+C;i[O]=p,n[O]=C,a[O]=E,s[O]=y,o[O]=w,l[O]=D,c[O]=A,u[O]=v,h[O]=T,d[O]=W}}return r.setAttribute("aColIdx",new It(i,1)),r.setAttribute("aRowIdx",new It(n,1)),r.setAttribute("aWX",new It(a,1)),r.setAttribute("aWZ",new It(s,1)),r.setAttribute("aSpeed",new It(o,1)),r.setAttribute("aSeed",new It(l,1)),r.setAttribute("aYOff",new It(c,1)),r.setAttribute("aScale",new It(u,1)),r.setAttribute("aAlpha",new It(h,1)),r.setAttribute("aTrail",new It(d,1)),r.instanceCount=t,r}const Mv=`
precision highp float;

attribute float aColIdx;
attribute float aRowIdx;
attribute float aWX;
attribute float aWZ;
attribute float aSpeed;
attribute float aSeed;
attribute float aYOff;
attribute float aScale;
attribute float aAlpha;
attribute float aTrail;

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
varying float vSpeed;

float hash(vec2 v) {
  vec2 s = fract(v * vec2(0.1031, 0.1030));
  s += dot(s, s.yx + 33.33);
  return fract((s.x + s.y) * s.x);
}

void main() {
  vUv     = uv;
  vColIdx = aColIdx;
  vRowIdx = aRowIdx;
  vTrail  = aTrail;
  vSpeed  = aSpeed;

  // Per-column spacing compression: 0–33% tighter
  float spacingFactor = 1.0 - 0.33 * hash(vec2(aColIdx * 0.61, 0.29));
  float cellStep = uCellH * aScale * spacingFactor;

  // Per-glyph Y jitter: nudge upward only (decreases spacing)
  float yJitter = hash(vec2(aColIdx * 0.43, aRowIdx * 0.89)) * 0.16 * cellStep;

  // Per-glyph alpha variation: ±12% of column alpha
  float alphaJitter = 1.0 + (hash(vec2(aColIdx * 0.67, aRowIdx * 0.31)) - 0.5) * 0.24;
  vAlpha = aAlpha * alphaJitter;

  // Static world-Y of this cell, offset per column
  float cellY = aYOff + uWorldH * 0.5 - aRowIdx * cellStep + yJitter;

  // Illumination head sweeps down
  float cycleH = uWorldH + uNRows * cellStep;
  float headY  = aYOff + uWorldH * 0.5 - mod(uTime * aSpeed + aSeed * cycleH, cycleH);

  vDist = (cellY - headY) / cellStep;

  // Cull cells ahead of the head or far enough behind that decay is invisible
  if (vDist < -0.5) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }
  if (vDist > uNRows * 1.2) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }

  // Transform column center to view space
  vec4 viewCenter = modelViewMatrix * vec4(aWX, cellY, aWZ, 1.0);

  // Camera proximity — cull within 1.0 of camera
  float viewDist = -viewCenter.z;  // depth in front of camera
  float sideDist = length(viewCenter.xy);  // lateral distance
  float camDist3D = length(viewCenter.xyz);
  if (camDist3D < 1.0) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }

  // Proximity fade: sides within 0.8, front (toward globe) within 3.0
  float sideFade  = smoothstep(0.0, 0.8, sideDist);
  float frontFade = (viewDist > 0.0) ? smoothstep(0.0, 3.0, viewDist) : 1.0;
  float proxFade  = sideFade * frontFade;

  // Depth-based brightness: closer = brighter, far = dim
  vDepthDim = clamp(viewDist / 6.0, 0.0, 1.0);
  vDepthDim = (1.0 - vDepthDim * vDepthDim) * proxFade;  // quadratic falloff + proximity fade

  // Per-glyph scale variation: ±10%
  float scaleJitter = 1.0 + (hash(vec2(aColIdx * 0.53, aRowIdx * 0.17)) - 0.5) * 0.20;

  // Depth-scaled billboard with per-column scale + per-glyph variation
  float depthScale = clamp(viewDist / 3.0, 0.3, 3.0);
  float s = aScale * scaleJitter * depthScale;
  viewCenter.xy += position.xy * vec2(uCellW, uCellH) * s;

  gl_Position = projectionMatrix * viewCenter;
}
`,xv=`
precision highp float;

uniform sampler2D uGlyphTex;
uniform float     uGlyphCount;
uniform float     uTime;
uniform float     uFrame;
uniform vec3      uColor;
uniform float     uNRows;

varying vec2  vUv;
varying float vDist;
varying float vColIdx;
varying float vRowIdx;
varying float vAlpha;
varying float vTrail;
varying float vDepthDim;
varying float vSpeed;

// Stable hash — keeps inputs small with fract() to avoid GPU sin() precision issues
float h2(vec2 v) {
  vec2 s = fract(v * vec2(0.1031, 0.1030));
  s += dot(s, s.yx + 33.33);
  return fract((s.x + s.y) * s.x);
}

void main() {
  // Per-column trail decay — smooth exponential fade, no hard cutoff
  float trail = exp(-max(vDist, 0.0) * vTrail);
  if (trail < 0.005) discard;

  // Snap to integer — varyings can have interpolation noise across the quad
  vec2 cellId = vec2(floor(vColIdx + 0.5), floor(vRowIdx + 0.5));

  float cellPhase = h2(cellId * 0.37);
  float stability = h2(cellId * 0.91);

  // Hold period in seconds (refresh-rate independent) — 3.3–11.7s, median ~7.5s
  float holdSec    = 20.0 + h2(cellId * 0.29) * 40.0;
  float changeTick = floor((cellPhase * holdSec + uTime) / holdSec);

  // ~55% of cells are stable — keep base glyph, never change
  float baseGlyph = floor(h2(cellId * 0.47 + 0.5) * uGlyphCount);
  float glyphIdx  = floor(
    h2(cellId * 0.37 + changeTick * vec2(0.11, 0.07)) * uGlyphCount
  );
  glyphIdx = stability < 0.9325 ? baseGlyph : glyphIdx;

  // Vertical strip atlas
  float atlasV = (glyphIdx + (1.0 - vUv.y)) / uGlyphCount;
  float mask   = texture2D(uGlyphTex, vec2(vUv.x, atlasV)).r;
  if (mask < 0.06) discard;

  // Film grain
  float grain = h2(vec2(
    gl_FragCoord.x * 0.73 + gl_FragCoord.y * 0.41,
    uTime * 7.3 + vColIdx * 0.17
  ));
  grain = (grain - 0.5) * 0.08;

  // High-contrast color: head burns white, trail is deep saturated green
  // baseBrightness equivalent: trail already decays to near-zero,
  // plus depth dimming kills distant cells → dark grid with bright heads
  float headFrac = 1.0 - smoothstep(0.0, 0.8, vDist);
  vec3  col2     = mix(uColor * 1.6, uColor * 3.0 + vec3(0.3), headFrac);
  col2          += grain;

  // Moderate contrast: pow curve adds depth without killing trails
  float rawBright = trail * mask * vAlpha * vDepthDim;
  float contrast  = pow(rawBright, 1.05);
  float alpha     = contrast;
  gl_FragColor    = vec4(col2 * alpha, alpha);
}
`,_n=new Map;function Sv(r,e={}){_n.has(r)&&xc(r);const{color:t="#00ff70",opacity:i=.82,syncCamera:n=null}=e,a=new Ee(t),s=_v(),o=new Xo({antialias:!1,alpha:!0});o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.setSize(r.clientWidth||1,r.clientHeight||1);const l=o.domElement;l.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;mix-blend-mode:screen;filter:blur(0.15px) drop-shadow(0 0 3px rgba(0,255,112,0.3));",l.style.opacity=String(i),r.appendChild(l);const c=new Vo,u=new Yt(45,(r.clientWidth||1)/(r.clientHeight||1),.1,60);u.position.set(0,0,3),u.lookAt(0,0,0);const h=new vr(1,32,32),d=new ar({colorWrite:!1,depthWrite:!0,depthTest:!0}),p=new rt(h,d);p.renderOrder=0,c.add(p);const g=vv(),x={uGlyphTex:{value:s.tex},uGlyphCount:{value:s.count},uTime:{value:0},uFrame:{value:0},uCellW:{value:pv},uCellH:{value:fv},uWorldH:{value:mv},uNRows:{value:Ma},uColor:{value:new P(a.r,a.g,a.b)}},m=new ct({uniforms:x,vertexShader:Mv,fragmentShader:xv,transparent:!0,depthWrite:!1,blending:Pt,side:nr}),f=new rt(g,m);f.frustumCulled=!1,f.renderOrder=1,c.add(f);const S={renderer:o,material:m,geom:g,atlas:s,occluderGeo:h,occluderMat:d,ro:null,animId:0,syncCamera:n};_n.set(r,S);function E(y){S.animId=requestAnimationFrame(E),x.uTime.value=y*.001,x.uFrame.value+=1,S.syncCamera&&(u.position.copy(S.syncCamera.position),u.quaternion.copy(S.syncCamera.quaternion),u.fov=S.syncCamera.fov,u.near=S.syncCamera.near,u.far=S.syncCamera.far,u.updateProjectionMatrix()),o.render(c,u)}return S.animId=requestAnimationFrame(E),S.ro=new ResizeObserver(()=>{const y=r.clientWidth||1,A=r.clientHeight||1;o.setSize(y,A),u.aspect=y/A,u.updateProjectionMatrix()}),S.ro.observe(r),document.fonts.ready.then(()=>{if(!_n.get(r))return;const{tex:y,canvas:A,ctx:w}=s;w.clearRect(0,0,A.width,A.height),w.fillStyle="#000",w.fillRect(0,0,A.width,A.height),w.fillStyle="#fff",w.textAlign="center",w.textBaseline="middle",w.font=`${Math.round(mn*.78)}px "Matrix-Code", "Share Tech Mono", monospace`,wo.forEach((D,v)=>w.fillText(D,mn/2,mn*v+mn/2)),y.needsUpdate=!0}),{destroy(){xc(r)},setColor(y){const A=new Ee(y);x.uColor.value.set(A.r,A.g,A.b)},setOpacity(y){l.style.opacity=String(y)}}}function xc(r){const e=_n.get(r);e&&(cancelAnimationFrame(e.animId),e.ro.disconnect(),e.material.dispose(),e.geom.dispose(),e.occluderGeo.dispose(),e.occluderMat.dispose(),e.atlas.tex.dispose(),e.renderer.dispose(),e.renderer.domElement.remove(),_n.delete(r))}const lt=Math.PI*2,Cr=64;let yv=0;const xa=new WeakMap;function dn(r){return getComputedStyle(document.documentElement).getPropertyValue(r).trim()}function Yr(r){const e=new Ee().setStyle(r||"#000000");return[e.r,e.g,e.b]}function En(r,e,t){return r+(e-r)*Math.max(0,Math.min(1,t))}function bv(r,e){const t=((r-e)%lt+lt)%lt;return t>Math.PI?t-lt:t}function yu(){return{neonCyan:dn("--neon-cyan")||"#00f0ff",neonGreen:dn("--neon-green")||"#00ff9d",neonMagenta:dn("--neon-magenta")||"#ff00cc",neonAmber:dn("--neon-amber")||"#ffb300",voidColor:dn("--void")||"#05080f"}}function Sc(r){return r==="friendly"?.6:r==="hostile"?1.5:1}function Ev(r){const e=En(.1,.85,r),t=En(.3,.05,r),i=Math.random();return i<e?"hostile":i<e+t?"friendly":"neutral"}function Tv(r){return r==="friendly"?0:r==="neutral"?1:r==="hostile"?2:3}let Es=null;function wv(r=.08){try{Es||(Es=new(window.AudioContext||window.webkitAudioContext));const e=Es,t=e.currentTime,i=e.createOscillator();i.type="sine",i.frequency.setValueAtTime(1320,t),i.frequency.exponentialRampToValueAtTime(880,t+.08);const n=e.createGain();n.gain.setValueAtTime(r,t),n.gain.exponentialRampToValueAtTime(.001,t+.4),i.connect(n).connect(e.destination),i.start(t),i.stop(t+.4)}catch{}}const bu=`
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
}`,Cv=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,Rv=`
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
}`,Pv=`
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
}`,Lv=`
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
}`,Dv=`
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

  float phaseAlpha = 1.0 - phase;
  gl_FragColor     = vec4(color, ring * vSweepFade * phaseAlpha * 0.75);
}`,Iv=`
varying vec2 vUv;
uniform vec3  uColor;
uniform float uIntensity;
void main() {
  float r = length(vUv - 0.5) * 2.0;
  float glow = exp(-r * r * 8.0) * uIntensity;
  if (glow < 0.005) discard;
  gl_FragColor = vec4(uColor * glow, glow * 0.6);
}`;function Uv(r){const e=new Float32Array(192);for(let i=0;i<64;i++){const n=i/64*lt;e[i*3]=Math.sin(n)*r,e[i*3+1]=Math.cos(n)*r,e[i*3+2]=0}const t=new ht;return t.setAttribute("position",new Vt(e,3)),t}function Nv(r){const e=new Float32Array(192);for(let i=0;i<32;i++){const n=i/32*lt,a=i%8===0?r*.92:r*.96,s=i*6;e[s]=Math.sin(n)*a,e[s+1]=Math.cos(n)*a,e[s+2]=0,e[s+3]=Math.sin(n)*r,e[s+4]=Math.cos(n)*r,e[s+5]=0}const t=new ht;return t.setAttribute("position",new Vt(e,3)),t}function Ov(r){const{scene:e,R:t,theme:i}=r;r.backgroundMesh&&(r.backgroundMesh.geometry.dispose(),r.backgroundMesh.material.dispose(),e.remove(r.backgroundMesh));const n=new Ee(i.voidColor),a=new Nr(t*2,t*2),s=new ct({vertexShader:bu,fragmentShader:Av,uniforms:{uVoidColor:{value:new P(n.r,n.g,n.b)},uTime:{value:0}},transparent:!0,depthWrite:!0,blending:ci}),o=new rt(a,s);o.renderOrder=0,e.add(o),r.backgroundMesh=o}function Fv(r){const{scene:e,R:t,theme:i}=r;r.centerGlowMesh&&(r.centerGlowMesh.geometry.dispose(),r.centerGlowMesh.material.dispose(),e.remove(r.centerGlowMesh));const n=new Ee(i.neonCyan),a=t*.5,s=new Nr(a,a),o=new ct({vertexShader:bu,fragmentShader:Iv,uniforms:{uColor:{value:new P(n.r,n.g,n.b)},uIntensity:{value:0}},transparent:!0,depthWrite:!1,blending:Pt}),l=new rt(s,o);l.renderOrder=6,e.add(l),r.centerGlowMesh=l}function Bv(r){const{scene:e,R:t,theme:i}=r;r.ringMeshes&&(r.ringMeshes.forEach(c=>{c.geometry.dispose(),e.remove(c)}),r.matRingInner&&r.matRingInner.dispose(),r.matRingOuter&&r.matRingOuter.dispose()),r.ticksMesh&&(r.ticksMesh.geometry.dispose(),r.matRingTicks&&r.matRingTicks.dispose(),e.remove(r.ticksMesh));const n=new Jt({color:new Ee(i.neonCyan),opacity:.18,transparent:!0,depthWrite:!1,blending:Pt}),a=new Jt({color:new Ee(i.neonCyan),opacity:.28,transparent:!0,depthWrite:!1,blending:Pt}),s=new Jt({color:new Ee(i.neonCyan),opacity:.22,transparent:!0,depthWrite:!1,blending:Pt}),o=[.2,.4,.6,.8,1];r.ringMeshes=o.map((c,u)=>{const h=new Qc(Uv(c*t),u<4?n:a);return h.renderOrder=1,e.add(h),h});const l=new $h(Nv(t),s);l.renderOrder=1,e.add(l),r.ticksMesh=l,r.matRingInner=n,r.matRingOuter=a,r.matRingTicks=s}function zv(r){const{scene:e,R:t,theme:i}=r;r.sweepTrailMesh&&(r.sweepTrailMesh.geometry.dispose(),r.sweepTrailMesh.material.dispose(),e.remove(r.sweepTrailMesh)),r.sweepArmLine&&(r.sweepArmLine.geometry.dispose(),r.sweepArmLine.material.dispose(),e.remove(r.sweepArmLine));const n=new Ee(i.neonCyan),a=new P(n.r,n.g,n.b),s=new Nr(t*2,t*2),o=new ct({vertexShader:Cv,fragmentShader:Rv,uniforms:{uAngle:{value:r.sweepAngle},uArcWidth:{value:Math.PI*.6},uColor:{value:a.clone()},uStaticAmt:{value:1}},transparent:!0,depthWrite:!1,blending:Pt}),l=new rt(s,o);l.renderOrder=2,e.add(l),r.sweepTrailMesh=l;const c=new Float32Array([0,0,0,Math.sin(r.sweepAngle)*t,Math.cos(r.sweepAngle)*t,0]),u=new ht;u.setAttribute("position",new Vt(c,3));const h=new Jt({color:new Ee(i.neonCyan),opacity:.9,transparent:!0,depthWrite:!1,blending:Pt}),d=new Rr(u,h);d.renderOrder=3,e.add(d),r.sweepArmLine=d}function Hv(r){const{scene:e,theme:t}=r;r.contactDotsMesh&&(r.contactDotsMesh.geometry.dispose(),r.contactDotsMesh.material.dispose(),e.remove(r.contactDotsMesh)),r.contactRingsMesh&&(r.contactRingsMesh.geometry.dispose(),r.contactRingsMesh.material.dispose(),e.remove(r.contactRingsMesh));const i=Yr(t.neonGreen),n=Yr(t.neonAmber),a=Yr(t.neonMagenta),s=Yr(t.neonCyan);function o(u,h,d){const p=new Nr(1,1),g=new It(new Float32Array(Cr).fill(0),1),x=new It(new Float32Array(Cr).fill(1),1),m=new It(new Float32Array(Cr).map(()=>Math.random()),1),f=new It(new Float32Array(Cr).fill(0),1);g.setUsage(Qi),x.setUsage(Qi),m.setUsage(Qi),f.setUsage(Qi),p.setAttribute("a_type",g),p.setAttribute("a_age",x),p.setAttribute("a_phase",m),p.setAttribute("a_sweepFade",f);const S=new ct({vertexShader:Pv,fragmentShader:u,uniforms:h,transparent:!0,depthWrite:!1,blending:Pt}),E=new Xh(p,S,Cr);E.renderOrder=d,E.instanceMatrix.setUsage(Qi);const y=new Qt;y.scale.setScalar(0),y.updateMatrix();for(let A=0;A<Cr;A++)E.setMatrixAt(A,y.matrix);return E.instanceMatrix.needsUpdate=!0,e.add(E),E}const l={uC0:{value:new P(...i)},uC1:{value:new P(...n)},uC2:{value:new P(...a)},uC3:{value:new P(...s)}},c={uC0:{value:new P(...i)},uC1:{value:new P(...n)},uC2:{value:new P(...a)}};r.contactDotsMesh=o(Lv,l,5),r.contactRingsMesh=o(Dv,c,4)}function kv(r){const{element:e,overlay:t,R:i}=r,n=e.clientWidth/2,a=e.clientHeight/2;r.staticLabelEls.forEach(c=>c.remove()),r.staticLabelEls=[];const s=[2,4,6,8,10];[.2,.4,.6,.8,1].forEach((c,u)=>{const h=document.createElement("span");h.className="s9-radar__ring-label",h.textContent=`${s[u]}km`,h.style.left=`${n+c*i+4}px`,h.style.top=`${a}px`,h.style.transform="translateY(-50%)",t.appendChild(h),r.staticLabelEls.push(h)});const o=[["N",0],["NE",lt*.125],["E",lt*.25],["SE",lt*.375],["S",lt*.5],["SW",lt*.625],["W",lt*.75],["NW",lt*.875]],l=i*1.05;o.forEach(([c,u])=>{const h=document.createElement("span");h.className="s9-radar__cardinal-label",h.textContent=c,h.style.left=`${n+Math.sin(u)*l}px`,h.style.top=`${a-Math.cos(u)*l}px`,h.style.transform="translate(-50%, -50%)",t.appendChild(h),r.staticLabelEls.push(h)})}function Gv(r){Ov(r),Fv(r),Bv(r),zv(r),kv(r),r.contactDotsMesh?Vv(r):Hv(r)}function Vv(r){const{contacts:e,dummy:t,contactDotsMesh:i,contactRingsMesh:n,R:a}=r;!i||!n||(e.forEach((s,o)=>{if(!s)t.scale.setScalar(0),t.position.set(0,0,0);else{const l=s.age<.08?En(0,8,s.age/.08):8;t.position.set(Math.sin(s.angle)*s.range*a,Math.cos(s.angle)*s.range*a,0),t.scale.setScalar(l)}t.updateMatrix(),i.setMatrixAt(o,t.matrix),n.setMatrixAt(o,t.matrix)}),i.instanceMatrix.needsUpdate=!0,n.instanceMatrix.needsUpdate=!0)}function Eu(r,e){const t=r.contacts[e];t&&(t.labelEl&&(t.labelEl.remove(),t.labelEl=null),r.contactDotsMesh&&r.contactRingsMesh&&(r.dummy.scale.setScalar(0),r.dummy.position.set(0,0,0),r.dummy.updateMatrix(),r.contactDotsMesh.setMatrixAt(e,r.dummy.matrix),r.contactRingsMesh.setMatrixAt(e,r.dummy.matrix),r.contactDotsMesh.instanceMatrix.needsUpdate=!0,r.contactRingsMesh.instanceMatrix.needsUpdate=!0),r.contacts[e]=null)}function Yo(r,e,t,i,n){var a;const s=r.opts.maxContacts;if(r.contacts.filter(Boolean).length>=s){let u=-1,h=-1;for(let d=0;d<Cr;d++)((a=r.contacts[d])==null?void 0:a.type)==="ghost"&&r.contacts[d].age>h&&(u=d,h=r.contacts[d].age);if(u>=0)Eu(r,u);else return console.warn("[pulse-radar] contact pool full"),null}let o=-1;for(let u=0;u<Cr;u++)if(!r.contacts[u]){o=u;break}if(o<0)return null;const l=i==="ghost",c={id:n||`T-${String(++yv).padStart(2,"0")}`,angle:(e%lt+lt)%lt,range:Math.max(0,Math.min(1,t)),type:i,age:l?.85:0,maxAge:l?3e3:8e3+Math.random()*1e4,bornAt:performance.now(),phase:l?Math.random()*.3:0,lastSweep:-1/0,ghostAngle:null,ghostRange:null,ghostSpawned:!1,instIdx:o,labelEl:null,sweepAlpha:l?.15:1,revealed:l,revealTime:l?performance.now():null};if(!l){const u=document.createElement("span");u.className=`s9-radar__label s9-radar__label--${i}`,u.textContent=i==="hostile"?`${c.id} ⚠HC`:c.id,r.labelsDiv.appendChild(u),c.labelEl=u}return r.contacts[o]=c,c}function Sa(r){if(r.destroyed||r.reducedMotion)return;const e=Math.max(.05,r.opts.contactDensity),t=En(3e3,600,r.threatLevel)/e,i=(Math.random()-.5)*t*.4,n=Math.max(200,t+i);r.spawnTimer=setTimeout(()=>{!r.destroyed&&!r.reducedMotion&&(Wv(r),Sa(r))},n)}function Wv(r){const e=r.contacts.filter(a=>a&&a.type!=="ghost"),t=e.length>0&&Math.random()<.3?e[Math.floor(Math.random()*e.length)]:null,i=t?t.angle+(Math.random()-.5)*.4:Math.random()*lt,n=.15+Math.random()*.82;Yo(r,i,n,Ev(r.threatLevel))}function Xv(r,e){if(r.reducedMotion)return;const t=r.sweepAngle;r.sweepAngle=(r.sweepAngle+r.sweepSpeed*e/1e3)%lt,r.sweepAngle<t&&(wv(.06),r.centerGlowIntensity=1),r.centerGlowIntensity>0&&(r.centerGlowIntensity*=Math.pow(.001,e/600),r.centerGlowIntensity<.005&&(r.centerGlowIntensity=0),r.centerGlowMesh&&(r.centerGlowMesh.material.uniforms.uIntensity.value=r.centerGlowIntensity));const i=performance.now();if(r.staticNextAt===null&&(r.staticNextAt=i+7e3+Math.random()*5e3),i>=r.staticNextAt&&!r.staticActive&&(r.staticActive=!0,r.staticEndAt=i+60+Math.random()*40,r.staticNextAt=r.staticEndAt+6e3+Math.random()*4e3),r.staticActive&&(r.sweepTrailMesh.material.uniforms.uStaticAmt.value=.5+Math.random()*.5,i>=r.staticEndAt&&(r.staticActive=!1,r.sweepTrailMesh.material.uniforms.uStaticAmt.value=1)),r.sweepTrailMesh&&(r.sweepTrailMesh.material.uniforms.uAngle.value=r.sweepAngle),r.sweepArmLine){const{R:n}=r,a=r.sweepArmLine.geometry.attributes.position;a.setXYZ(0,0,0,0),a.setXYZ(1,Math.sin(r.sweepAngle)*n,Math.cos(r.sweepAngle)*n,0),a.needsUpdate=!0}}function jv(r,e){const{contacts:t,sweepAngle:i}=r,n=performance.now(),a=lt/r.sweepSpeed*1e3,s=Math.max(200,a-220),o=performance.now();t.forEach((l,c)=>{if(l){if(l.age+=e/l.maxAge,l.type!=="ghost"&&l.revealed){const u=.05+.1*l.range,h=o-l.lastSweep,d=Math.min(1,h/s);l.sweepAlpha=u+(1-u)*Math.pow(1-d,2.5)}if(l.type!=="ghost"){const u=l.age>.65&&l.age<.85;l.phase+=Sc(l.type)*(u?.5:1)*e/1e3}else l.phase+=Sc("neutral")*e/1e3;l.type!=="ghost"&&!r.reducedMotion&&Math.abs(bv(i,l.angle))<.12&&n-l.lastSweep>800&&(l.phase=0,l.lastSweep=n,l.sweepAlpha=1,l.revealed||(l.revealed=!0,l.revealTime=n)),l.type!=="ghost"&&!l.ghostSpawned&&l.age>=.65&&l.revealed&&(l.ghostAngle=l.angle,l.ghostRange=l.range,l.ghostSpawned=!0,Yo(r,l.ghostAngle,l.ghostRange,"ghost")),l.age>=1&&Eu(r,c)}})}function Yv(r){const{contacts:e,dummy:t,contactDotsMesh:i,contactRingsMesh:n,R:a}=r;if(!i||!n)return;let s=!1;e.forEach((o,l)=>{if(!o)return;s=!0;let c;o.revealed?c=Math.min(1,(r.now-o.revealTime)/300)*8:c=0,t.position.set(Math.sin(o.angle)*o.range*a,Math.cos(o.angle)*o.range*a,0),t.scale.setScalar(c),t.updateMatrix(),i.setMatrixAt(l,t.matrix),n.setMatrixAt(l,t.matrix);const u=Tv(o.type);i.geometry.attributes.a_type.setX(l,u),i.geometry.attributes.a_age.setX(l,o.age),i.geometry.attributes.a_phase.setX(l,o.phase),i.geometry.attributes.a_sweepFade.setX(l,o.sweepAlpha),n.geometry.attributes.a_type.setX(l,u),n.geometry.attributes.a_age.setX(l,o.age),n.geometry.attributes.a_phase.setX(l,o.phase),n.geometry.attributes.a_sweepFade.setX(l,o.sweepAlpha)}),s&&(i.instanceMatrix.needsUpdate=!0,n.instanceMatrix.needsUpdate=!0,i.geometry.attributes.a_type.needsUpdate=!0,i.geometry.attributes.a_age.needsUpdate=!0,i.geometry.attributes.a_phase.needsUpdate=!0,i.geometry.attributes.a_sweepFade.needsUpdate=!0,n.geometry.attributes.a_type.needsUpdate=!0,n.geometry.attributes.a_age.needsUpdate=!0,n.geometry.attributes.a_phase.needsUpdate=!0,n.geometry.attributes.a_sweepFade.needsUpdate=!0)}function qv(r){const{contacts:e,element:t,R:i}=r,n=t.clientWidth/2,a=t.clientHeight/2;e.forEach(s=>{if(!(s!=null&&s.labelEl))return;if(!s.revealed){s.labelEl.style.opacity="0";return}const o=n+Math.sin(s.angle)*s.range*i,l=a-Math.cos(s.angle)*s.range*i;s.labelEl.style.left=`${o+7}px`,s.labelEl.style.top=`${l-6}px`,s.labelEl.style.opacity=String(s.sweepAlpha)})}function $v(r){if(!r.footerEl)return;const e=r.contacts.filter(i=>i&&i.type!=="ghost").length,t=(lt/r.sweepSpeed).toFixed(1);r.footerEl.textContent=`CONTACTS: ${e} | SWEEP: ${t}s`}function Ao(r,e){if(r.destroyed||!r.rafRunning){r.rafId=null;return}const t=Math.min(e-(r.lastTs??e),100);r.lastTs=e,r.now=e,r.R>0&&(r.backgroundMesh&&(r.backgroundMesh.material.uniforms.uTime.value=e/1e3),Xv(r,t),jv(r,t),Yv(r),qv(r),$v(r),r.renderer.render(r.scene,r.camera)),r.rafId=requestAnimationFrame(i=>Ao(r,i))}function Kv(r,e={}){if(xa.has(r)){console.warn("[pulse-radar] already initialised");const S=xa.get(r);return{setRadarThreatLevel:S.setRadarThreatLevel,injectContact:S.injectContact}}const t={sweepPeriod:Math.max(600,Math.min(2e4,e.sweepPeriod??3690)),contactDensity:Math.max(0,Math.min(1,e.contactDensity??.5)),threatLevel:Math.max(0,Math.min(1,e.threatLevel??0)),primaryColor:e.primaryColor??null,maxContacts:Math.max(4,Math.min(64,e.maxContacts??28))},i=yu(),n=document.createElement("canvas");n.className="s9-radar__canvas";const a=document.createElement("div");a.className="s9-radar__overlay";const s=document.createElement("div");s.className="s9-radar__labels",a.appendChild(s),r.appendChild(n),r.appendChild(a);let o;try{o=new Xo({canvas:n,antialias:!0,alpha:!1,premultipliedAlpha:!1})}catch(S){return console.error("[pulse-radar] WebGL context creation failed",S),n.remove(),a.remove(),{setRadarThreatLevel:()=>{},injectContact:()=>""}}o.setClearColor(new Ee(i.voidColor),1),o.setPixelRatio(Math.min(devicePixelRatio,2)),o.debug.checkShaderErrors=!0;const l=new Vo,c=new Ua(-1,1,1,-1,.1,100);c.position.z=10;const u={element:r,canvas:n,overlay:a,labelsDiv:s,renderer:o,scene:l,camera:c,opts:t,theme:i,R:0,sweepAngle:Math.random()*lt,sweepSpeed:lt/(t.sweepPeriod/1e3),threatLevel:t.threatLevel,contacts:new Array(Cr).fill(null),dummy:new Qt,footerEl:document.getElementById("radar-contacts"),staticLabelEls:[],staticActive:!1,staticNextAt:null,staticEndAt:null,rafId:null,rafRunning:!1,destroyed:!1,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,centerGlowIntensity:0,centerGlowMesh:null,backgroundMesh:null,ringMeshes:null,ticksMesh:null,sweepTrailMesh:null,sweepArmLine:null,contactDotsMesh:null,contactRingsMesh:null,matRingInner:null,matRingOuter:null,matRingTicks:null,spawnTimer:null,lastTs:null,now:performance.now(),resizeObserver:null,intersectionObserver:null,_motionMq:null,_motionHandler:null,setRadarThreatLevel:null,injectContact:null};xa.set(r,u);const h=r.closest(".s9-panel");h&&(h.classList.add("s9-panel--booting"),h.addEventListener("animationend",()=>h.classList.remove("s9-panel--booting"),{once:!0}));const d=new ResizeObserver(S=>{for(const E of S){const{width:y,height:A}=E.contentRect;if(y===0||A===0)return;const w=Math.floor(Math.min(y,A)/2)-8;if(w<=0)return;u.R=w,c.left=-w,c.right=w,c.top=w,c.bottom=-w,c.updateProjectionMatrix(),o.setSize(y,A),Gv(u)}});d.observe(r),u.resizeObserver=d;const p=new IntersectionObserver(S=>{S.forEach(E=>{u.rafRunning=E.isIntersecting,u.rafRunning&&!u.rafId&&(u.rafId=requestAnimationFrame(y=>Ao(u,y)))})},{threshold:0});p.observe(r),u.intersectionObserver=p;const g=matchMedia("(prefers-reduced-motion: reduce)"),x=()=>{u.reducedMotion=g.matches,u.reducedMotion?(u.sweepAngle=Math.PI*.15,clearTimeout(u.spawnTimer)):Sa(u)};g.addEventListener("change",x),u._motionMq=g,u._motionHandler=x,u.rafRunning=!0,u.rafId=requestAnimationFrame(S=>Ao(u,S)),u.reducedMotion||Sa(u);function m(S){const E=Math.max(0,Math.min(1,S));u.threatLevel=E,u.sweepSpeed=En(lt/4,lt/1.2,E),clearTimeout(u.spawnTimer),Sa(u)}function f(S,E,y){const A=["friendly","neutral","hostile"].includes(y)?y:"neutral",w=Yo(u,S,Math.max(0,Math.min(1,E)),A);return w?w.id:""}return u.setRadarThreatLevel=m,u.injectContact=f,{setRadarThreatLevel:m,injectContact:f}}function Zv(r){const e=xa.get(r);if(!e)return;const t=yu();e.theme=t;const i=Yr(t.neonGreen),n=Yr(t.neonAmber),a=Yr(t.neonMagenta),s=Yr(t.neonCyan),o=new Ee(t.neonCyan);if(e.backgroundMesh){const l=new Ee(t.voidColor);e.backgroundMesh.material.uniforms.uVoidColor.value.set(l.r,l.g,l.b),e.renderer.setClearColor(new Ee(t.voidColor),1)}if(e.matRingInner&&e.matRingInner.color.set(t.neonCyan),e.matRingOuter&&e.matRingOuter.color.set(t.neonCyan),e.matRingTicks&&e.matRingTicks.color.set(t.neonCyan),e.sweepTrailMesh&&e.sweepTrailMesh.material.uniforms.uColor.value.set(o.r,o.g,o.b),e.sweepArmLine&&e.sweepArmLine.material.color.set(t.neonCyan),e.contactDotsMesh){const l=e.contactDotsMesh.material.uniforms;l.uC0.value.set(...i),l.uC1.value.set(...n),l.uC2.value.set(...a),l.uC3.value.set(...s)}if(e.contactRingsMesh){const l=e.contactRingsMesh.material.uniforms;l.uC0.value.set(...i),l.uC1.value.set(...n),l.uC2.value.set(...a)}}const ya={"":"MATRIX GREEN",gits:"GHOST IN THE SHELL",amber:"AMBER",phosphor:"PHOSPHOR",blood:"BLOOD"};function Co(r){const e=document.documentElement;r===""||r==="matrixgreen"?delete e.dataset.theme:e.dataset.theme=r,document.querySelectorAll(".topbar__theme-btn").forEach(t=>{t.classList.toggle("topbar__theme-btn--active",(t.dataset.themeSet??"")===(r==="matrixgreen"?"":r))}),mc(Ye),Ro&&mc(document.getElementById("threatmap-tactical")),Zv(Ru)}function Tu(){const r=new Date;document.getElementById("topbar-clock").textContent=`UTC ${r.toUTCString().split(" ")[4]}`}Tu();setInterval(Tu,1e3);document.querySelectorAll(".s9-panel").forEach(hv);document.querySelectorAll(".topbar__theme-btn").forEach(r=>{r.addEventListener("click",()=>{const e=r.dataset.themeSet??"";Co(e),Pe(Ce,`THEME: ${ya[e]??e.toUpperCase()}`,"sys")})});const wu=document.querySelectorAll(".topbar__tab[data-tab]"),Jv=document.querySelectorAll(".center__view[data-view]");let yc=!1,Ro=!1;function bc(r){wu.forEach(e=>{const t=e.dataset.tab===r;e.classList.toggle("topbar__tab--active",t),e.setAttribute("aria-selected",t)}),Jv.forEach(e=>{e.classList.toggle("center__view--active",e.dataset.view===r)}),r==="network"&&!yc&&(yc=!0,w0()),r==="tactical"&&!Ro&&(Ro=!0,T0()),Pe(Ce,`VIEW: ${r.toUpperCase()} ACTIVATED`,"sys")}wu.forEach(r=>{r.addEventListener("click",()=>bc(r.dataset.tab)),r.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),bc(r.dataset.tab))})});const Ce=document.querySelector(".s9-terminal");p_(Ce,{onSubmit(r){var e;const t=r.trim().split(/\s+/),i=t[0].toLowerCase(),n=t.slice(1);switch(i){case"help":Pe(Ce,"SECTION 9 COMMAND INTERFACE — AVAILABLE COMMANDS:","sys"),Pe(Ce,"  status              — system status report","info"),Pe(Ce,"  ghost               — ghost coefficient analysis","info"),Pe(Ce,"  nodes               — list active threat nodes","info"),Pe(Ce,"  threat <lvl>        — set global threat level 0-100","info"),Pe(Ce,"  threat <id> <lvl>   — set node threat level","info"),Pe(Ce,"  focus <id>          — focus camera on node","info"),Pe(Ce,"  theme <name>        — switch theme","info"),Pe(Ce,"  themes              — list available themes","info"),Pe(Ce,"  clear               — clear terminal","info");break;case"status":{const a=at.size,s=[...at.values()].filter(l=>l>=70).length,o=a>0?Math.max(...at.values()):0;Pe(Ce,"── SYSTEM STATUS ──────────────────────────","sys"),Pe(Ce,`  CPU: ${zt.cpu}%   MEM: ${zt.mem}%   NET I/O: ${zt.net}%`,"info"),Pe(Ce,`  GHOST LAYER: ${zt.ghost}%   ENCRYPTION: ${zt.enc}%`,"info"),Pe(Ce,`  NODES ON GRID: ${a}   CRITICAL: ${s}`,s>0?"err":"info"),Pe(Ce,`  PEAK THREAT: ${o}   GLOBAL LEVEL: ${o}`,o>=70?"err":"sys"),Pe(Ce,"  SECURE CHANNEL: ACTIVE   ENCRYPTION: AES-256","info");break}case"ghost":{const a=Fi.toFixed(1);Pe(Ce,"── GHOST COEFFICIENT ANALYSIS ─────────────","sys"),Pe(Ce,`  COEFFICIENT: ${a}%   BARRIER: NOMINAL`,"info"),Pe(Ce,"  CYBER BRAIN: SECTION 9 CLEARANCE ALPHA-7","info"),Pe(Ce,"  DIVE DEPTH: STABLE 3.2m   TACHIKOMA LINK: ACTIVE","info"),Pe(Ce,"  IDENTITY: CONFIRMED — KUSANAGI.M",a>=95?"sys":"err");break}case"nodes":{if(at.size===0){Pe(Ce,"NO NODES ON GRID","info");break}Pe(Ce,`ACTIVE NODES (${at.size}):`,"sys");for(const[a,s]of at){const o=mr.find(u=>u.id===a),l=(o==null?void 0:o.label)??a,c=s>=70?"err":s>=40?"sys":"info";Pe(Ce,`  ${a.padEnd(14)} ${l.padEnd(12)} LVL=${s}`,c)}break}case"threat":{if(n.length===0){Pe(Ce,`GLOBAL THREAT: ${Math.max(0,...at.values())}`,"sys");break}if(n.length>=2&&isNaN(parseInt(n[0]))){const a=n[0],s=parseInt(n[1]);if(!at.has(a)){Pe(Ce,`ERR: node '${a}' not found — use NODES to list`,"err");break}if(isNaN(s)||s<0||s>100){Pe(Ce,"ERR: level must be 0-100","err");break}const o=Pa(Ye,a,s);at.set(a,s),Lr(Ye,Math.max(0,...at.values())),Tn.setRadarThreatLevel(Math.max(0,...at.values())/100),Pe(Ce,`NODE ${a}: ${o} → ${s}`,s>=70?"err":"sys"),s>=70&&o<70&&(xr(Ye,a),pi(Ye,a))}else{const a=parseInt(n[0]);if(isNaN(a)||a<0||a>100){Pe(Ce,"ERR: level must be 0-100","err");break}Lr(Ye,a),Tn.setRadarThreatLevel(a/100),Pe(Ce,`GLOBAL THREAT LEVEL SET: ${a}`,"sys")}break}case"focus":{const a=n[0];if(!a){Pe(Ce,"ERR: focus requires a node id — use NODES to list","err");break}if(!at.has(a)){Pe(Ce,`ERR: node '${a}' not found`,"err");break}xr(Ye,a),pi(Ye,a);const s=mr.find(o=>o.id===a);Pe(Ce,`CAMERA FOCUSED: ${(s==null?void 0:s.label)??a}`,"sys");break}case"theme":{const a=((e=n[0])==null?void 0:e.toLowerCase())??"";if(a===""||a==="matrixgreen"){Co(""),Pe(Ce,"THEME: MATRIX GREEN","sys");break}if(!Object.keys(ya).includes(a)){Pe(Ce,`ERR: unknown theme '${a}' — use THEMES to list`,"err");break}Co(a),Pe(Ce,`THEME: ${ya[a]}`,"sys");break}case"themes":Pe(Ce,"AVAILABLE THEMES:","sys");for(const[a,s]of Object.entries(ya))Pe(Ce,`  ${(a||"matrixgreen").padEnd(14)} ${s}`,"info");break;case"clear":f_(Ce),Pe(Ce,"TERMINAL CLEARED","sys");break;default:i&&Pe(Ce,`ERR: unknown command '${r}' — type HELP`,"err")}},tabComplete(r){return["help","status","ghost","nodes","threat","focus","theme","themes","clear"].find(e=>e.startsWith(r.toLowerCase()))??null}});Pe(Ce,"SECTION 9 OPERATIVE INTERFACE — TYPE HELP FOR COMMANDS","sys");Pe(Ce,"GHOST BABEL OPERATION: ACTIVE","info");function Ts(r,e,t){let i=0;function n(){if(i>=r.length)return;const{id:a,state:s}=r[i++],o=document.getElementById(a);o&&dv(o,s),setTimeout(n,i<r.length?e:e*2)}n()}const Ec=[{cls:"sigint",headline:"SIGNAL INTERCEPT: FREQ 12.4GHz",detail:"Encrypted burst tx — POSEIDON signature"},{cls:"humint",headline:"ASSET CONFIRM: NIIHAMA-04",detail:"Target movement: port district, 0300 local"},{cls:"cyber",headline:"ZERO-DAY: CVE-2026-3917",detail:"Legacy auth stack — remote exec payload ready"},{cls:"ghost",headline:"DIVE ANOMALY: SECTOR ALPHA",detail:"Ghost-barrier interference at 4.1m depth"},{cls:"elint",headline:"DRONE SWEEP: SECTOR 12",detail:"Coverage 73% — ETA 4 minutes to full map"},{cls:"sigint",headline:"PACKET STORM: 192.168.7.0/24",detail:"18k pps sustained — possible DDoS staging"},{cls:"cyber",headline:"EXFIL CHANNEL COMPROMISED",detail:"Fallback route DELTA-9 now primary exfil"},{cls:"humint",headline:"CONTACT LOST: ROMEO-7",detail:"Last check-in 03:14:22 UTC — status unknown"},{cls:"ghost",headline:"TACHIKOMA: AUTONOMOUS SWEEP",detail:"Unit 9 executing sector 7 independently"},{cls:"elint",headline:"EM PULSE DETECTED: ZONE 3",detail:"Localized disruption — comm nodes offline"},{cls:"sigint",headline:"NODE COMMS SPIKE: BEIJING",detail:"340% increase in encrypted P2P — 0300-0500"},{cls:"cyber",headline:"FIREWALL PROBE: AS12345",detail:"Systematic port sweep — countermeasures deployed"},{cls:"humint",headline:"BROKER IDENTIFIED: LAUGHING MAN",detail:"Dark web auction — biotech data linked to incident"},{cls:"ghost",headline:"GHOST PROTOCOL: BETA-3",detail:"Shell confirmed on target system — extract ready"},{cls:"elint",headline:"SAT PASS: KH-17 WINDOW",detail:"6 min coverage — imaging tasked to sector 4"}];function Qv(r){const e=document.createElement("div");return e.className=`sigint-item sigint-item--${r.cls}`,e.innerHTML=`
    <div class="sigint-item__class">${r.cls.toUpperCase()}</div>
    <div class="sigint-item__headline">${r.headline}</div>
    <div class="sigint-item__detail">${r.detail}</div>
  `,e}(function(){const r=document.getElementById("sigint-feed");if(!r)return;const e=4,t=[];function i(){const n=new Set(t.map(u=>{var h;return(h=u.querySelector(".sigint-item__headline"))==null?void 0:h.textContent})),a=Ec.filter(u=>!n.has(u.headline)),s=a.length>0?a:Ec,o=s[Math.floor(Math.random()*s.length)],l=Qv(o);r.insertBefore(l,r.firstChild),t.unshift(l),requestAnimationFrame(()=>l.classList.add("sigint-item--visible"));const c=8e3+Math.random()*12e3;for(setTimeout(()=>{l.classList.add("sigint-item--closing"),l.classList.remove("sigint-item--visible"),setTimeout(()=>{l.remove();const u=t.indexOf(l);u>=0&&t.splice(u,1)},500)},c);t.length>e;){const u=t.pop();u.classList.add("sigint-item--closing"),u.classList.remove("sigint-item--visible"),setTimeout(()=>u.remove(),500)}setTimeout(i,3e3+Math.random()*6e3)}setTimeout(i,800),setTimeout(i,2200)})();const Tc=[{cls:"STRATEGIC",headline:"BIOMECH TREATY VOTE: 72HRS",detail:"Section 9 on standby for security detail"},{cls:"TACTICAL",headline:"LAUGHING MAN: ACTIVE",detail:"New sightings logged in Niihama and Togusa ward"},{cls:"ASSET",headline:"BATOU: FIELD POSITION UPDATE",detail:"Grid 7-Delta — visual on primary target"},{cls:"THREAT",headline:"PUPPET MASTER PROTOCOL",detail:"AI ghost-dive signatures — 3 confirmed nodes"},{cls:"STRATEGIC",headline:"ARAMAKI: SITUATION ROOM",detail:"Director briefing at 0600 UTC — attendance req"},{cls:"TACTICAL",headline:"TOGUSA: DEEP COVER",detail:"Identity: Muto Ryo — corporate embedded"},{cls:"THREAT",headline:"ROGUE TACHIKOMA UNIT",detail:"Unit 14 unresponsive — last GPS: Sector 9-Bravo"},{cls:"ASSET",headline:"ISHIKAWA: CYBER BREACH",detail:"Target mainframe penetrated — exfil in 180s"},{cls:"STRATEGIC",headline:"COMA CHIP EXPLOIT: CONFIRMED",detail:"Hardware vulnerability — 40k units affected"},{cls:"TACTICAL",headline:"HELICOPTER SUPPORT: STANDING BY",detail:"AH-6J on tarmac — ETA to sector: 4 min"}];function e0(r){const e=document.createElement("div");return e.className="intel-item",e.innerHTML=`
    <div class="intel-item__class">${r.cls}</div>
    <div class="intel-item__headline">${r.headline}</div>
    <div class="intel-item__detail">${r.detail}</div>
  `,e}(function(){const r=document.getElementById("intel-feed");if(!r)return;const e=5,t=[];function i(){const n=new Set(t.map(u=>{var h;return(h=u.querySelector(".intel-item__headline"))==null?void 0:h.textContent})),a=Tc.filter(u=>!n.has(u.headline)),s=a.length>0?a:Tc,o=s[Math.floor(Math.random()*s.length)],l=e0(o);r.insertBefore(l,r.firstChild),t.unshift(l),requestAnimationFrame(()=>l.classList.add("intel-item--visible"));const c=1e4+Math.random()*15e3;for(setTimeout(()=>{l.classList.add("intel-item--closing"),l.classList.remove("intel-item--visible"),setTimeout(()=>{l.remove();const u=t.indexOf(l);u>=0&&t.splice(u,1)},500)},c);t.length>e;){const u=t.pop();u.classList.add("intel-item--closing"),u.classList.remove("intel-item--visible"),setTimeout(()=>u.remove(),500)}setTimeout(i,4e3+Math.random()*8e3)}setTimeout(i,1200),setTimeout(i,3500),setTimeout(i,5800)})();setTimeout(()=>{Ts([{id:"seq-breach",state:"complete"},{id:"seq-extract",state:"active"}],3e3),setTimeout(()=>{Ts([{id:"seq-extract",state:"complete"},{id:"seq-cover",state:"active"}],3500),setTimeout(()=>{Ts([{id:"seq-cover",state:"complete"},{id:"seq-exfil",state:"active"}],3e3)},9e3)},8e3)},5e3);const $i=document.querySelector(".s9-stream");__($i);const dr=()=>`${ot(10,220)}.${ot(0,255)}.${ot(0,255)}.${ot(1,254)}`,ws=()=>[22,80,443,8443,4444,3389,21,1337,9999][Math.floor(Math.random()*9)],t0=()=>`${ot(64,65535)}B`,r0=()=>Array.from({length:4},()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0")).join(" ");function i0(){const r=[()=>({source:"AUTH",message:`HANDSHAKE COMPLETE — ${dr()}:${ws()}`,alert:!1}),()=>({source:"NET",message:`PKT ${t0()} ${dr()} → ${dr()}`,alert:!1}),()=>({source:"GHOST",message:`DIVE DEPTH: ${(2+Math.random()*3).toFixed(1)}m — STABLE`,alert:!1}),()=>({source:"CRYPT",message:"AES-256 SESSION KEY ESTABLISHED",alert:!1}),()=>({source:"SCAN",message:`PROBE: ${dr()}:${ws()} — ${r0()}`,alert:!0}),()=>({source:"SYS",message:`MEM ${ot(60,92)}% CPU ${ot(20,80)}% THERMAL OK`,alert:!1}),()=>({source:"NET",message:`LATENCY ${ot(4,45)}ms — ${Math.random()<.8?"NOMINAL":"DEGRADED"}`,alert:Math.random()<.2}),()=>({source:"AUTH",message:`TOKEN REFRESH: UID-${ot(1e3,9999)}`,alert:!1}),()=>({source:"CRIT",message:`INTRUSION SIG: ${dr()} PORT ${ws()}`,alert:!0}),()=>({source:"SYS",message:`COUNTERMEASURE DEPLOYED — BLOCK RULE ${ot(100,999)}`,alert:!1}),()=>({source:"NET",message:`ROUTE CHANGE: AS${ot(1e3,65e3)} VIA ${dr()}`,alert:!1}),()=>({source:"CRYPT",message:`TLS 1.3 HANDSHAKE: ${dr()} — ${ot(0,1)?"ECDH":"RSA"}-4096`,alert:!1}),()=>({source:"SCAN",message:`ANOMALY: BURST ${ot(800,9999)} PPS FROM ${dr()}`,alert:!0}),()=>({source:"GHOST",message:`GHOST COEFFICIENT: ${(92+Math.random()*8).toFixed(1)}%`,alert:!1}),()=>({source:"AUTH",message:`CERT CHAIN VALID — SHA-${ot(0,1)?"256":"512"}`,alert:!1}),()=>({source:"NET",message:`DNS RESOLVE: ${["niihama.net","togusa.local","sec9.gov","puppet.io"][Math.floor(Math.random()*4)]}`,alert:!1}),()=>({source:"SYS",message:`FIREWALL RULE ${ot(1e3,9999)}: DROP ${dr()}/${ot(24,32)}`,alert:!1}),()=>({source:"CRIT",message:`ZERO-DAY ATTEMPT: ${dr()} — MITIGATED`,alert:!0})];function e(){const t=r[Math.floor(Math.random()*r.length)];bn($i,{timestamp:new Date().toISOString(),...t()})}for(let t=0;t<8;t++)e();setInterval(e,ot(1200,2800))}i0();const zt={cpu:42,mem:61,net:12,ghost:77,enc:96},n0=document.getElementById("tele-cpu"),a0=document.getElementById("tele-mem"),s0=document.getElementById("tele-net"),o0=document.getElementById("tele-enc");setInterval(()=>{for(const r of Object.keys(zt))zt[r]=Math.max(5,Math.min(100,zt[r]+(Math.random()-.5)*6)),zt[r]=Math.round(zt[r]);na(n0,zt.cpu),na(a0,zt.mem),na(s0,zt.net),na(o0,zt.enc)},2e3);const l0=document.getElementById("neural-01"),c0=document.getElementById("ghost-val"),u0=document.getElementById("cyber-index"),h0=document.getElementById("neural-sync"),Dr=document.getElementById("ekg-canvas"),d0=document.getElementById("ekg-bpm"),sa=document.getElementById("ekg-heart");let Fi=98.4,La=62,Wr=0,As=0;const Cs=.37;function p0(){sa&&(sa.classList.remove("beat"),sa.offsetWidth,sa.classList.add("beat"))}function wc(r){return r>.08&&r<.18?Math.sin((r-.08)/.1*Math.PI)*.18:r>.28&&r<.32?-((r-.28)/.04)*.38:r>.32&&r<.37?-.38+(r-.32)/.05*1.38:r>.37&&r<.43?1-(r-.37)/.06*1.28:r>.43&&r<.49?-.28+(r-.43)/.06*.28:r>.52&&r<.68?Math.sin((r-.52)/.16*Math.PI)*.3:0}function f0(){if(!Dr)return;const r=Dr.getContext("2d"),e=Dr.width,t=Dr.height,i=t/2,n=t*.44,a=La/60/80;r.clearRect(0,0,e,t);const s=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";r.beginPath();for(let l=0;l<e;l++){const c=((Wr-(e-1-l)*a)%1+1)%1,u=i-wc(c)*n;l===0?r.moveTo(l,u):r.lineTo(l,u)}r.strokeStyle=s,r.lineWidth=1,r.shadowColor=s,r.shadowBlur=5,r.stroke();const o=i-wc(Wr)*n;r.beginPath(),r.arc(e-1,o,1.8,0,Math.PI*2),r.fillStyle=s,r.shadowBlur=10,r.fill()}function Au(){if(!Dr)return;const r=Dr.clientWidth;r&&Dr.width!==r&&(Dr.width=r)}Au();new ResizeObserver(Au).observe(Dr);let Rs=0;(function r(e){const t=Rs?e-Rs:16;Rs=e,As=Wr,Wr=(Wr+La/60*(t/1e3))%1,(As<Cs&&Wr>=Cs||As>Wr&&Wr>=Cs)&&p0(),f0(),requestAnimationFrame(r)})(0);function Cu(){Fi=Math.max(85,Math.min(100,Fi+(Math.random()-.45)*1.2));const r=Fi.toFixed(1);La=Math.round(58+(100-Fi)/15*12),d0.textContent=La,v_(l0,()=>{c0.textContent=r,u0.textContent=`${r}%`,h0.textContent=`${Math.round(Fi)}%`})}for(let r=0;r<3;r++)Cu();setInterval(Cu,3e3);const Ye=document.querySelector(".s9-threatmap");vu(Ye,{autoRotate:!0,bloomStrength:.4});const Ru=document.getElementById("proximity-radar"),Tn=Kv(Ru,{threatLevel:0}),m0=getComputedStyle(document.documentElement).getPropertyValue("--neon-green").trim()||"#00ff70";Sv(document.getElementById("matrix-rain-host"),{color:m0,opacity:.9,syncCamera:rv(Ye)});document.getElementById("sat-toggle").addEventListener("change",r=>{cv(Ye,r.target.checked)});const mr=[{id:"n-tokyo",lat:35.68,lng:139.69,label:"TOKYO"},{id:"n-moscow",lat:55.75,lng:37.62,label:"MOSCOW"},{id:"n-beijing",lat:39.91,lng:116.39,label:"BEIJING"},{id:"n-london",lat:51.51,lng:-.13,label:"LONDON"},{id:"n-nyc",lat:40.71,lng:-74,label:"NEW YORK"},{id:"n-sydney",lat:-33.87,lng:151.21,label:"SYDNEY"},{id:"n-dubai",lat:25.2,lng:55.27,label:"DUBAI"},{id:"n-saopaulo",lat:-23.55,lng:-46.63,label:"SÃO PAULO"},{id:"n-paris",lat:48.86,lng:2.35,label:"PARIS"},{id:"n-seoul",lat:37.57,lng:126.98,label:"SEOUL"},{id:"n-cairo",lat:30.05,lng:31.24,label:"CAIRO"},{id:"n-berlin",lat:52.52,lng:13.41,label:"BERLIN"},{id:"n-mumbai",lat:19.08,lng:72.88,label:"MUMBAI"},{id:"n-toronto",lat:43.65,lng:-79.38,label:"TORONTO"},{id:"n-singapore",lat:1.35,lng:103.82,label:"SINGAPORE"},{id:"n-nairobi",lat:-1.29,lng:36.82,label:"NAIROBI"},{id:"n-istanbul",lat:41.01,lng:28.97,label:"ISTANBUL"},{id:"n-lagos",lat:6.52,lng:3.38,label:"LAGOS"}],at=new Map;function ot(r,e){return Math.floor(Math.random()*(e-r+1))+r}const g0={"n-tokyo":{country:"JAPAN",pop:"13.96M",status:"FINANCIAL HUB"},"n-moscow":{country:"RUSSIA",pop:"12.51M",status:"RESTRICTED"},"n-beijing":{country:"CHINA",pop:"21.54M",status:"RESTRICTED"},"n-london":{country:"UK",pop:"8.98M",status:"ALLIED NODE"},"n-nyc":{country:"USA",pop:"8.34M",status:"ALLIED NODE"},"n-sydney":{country:"AUSTRALIA",pop:"5.31M",status:"ALLIED NODE"},"n-dubai":{country:"UAE",pop:"3.33M",status:"NEUTRAL ZONE"},"n-saopaulo":{country:"BRAZIL",pop:"12.33M",status:"MONITORED"},"n-paris":{country:"FRANCE",pop:"2.15M",status:"ALLIED NODE"},"n-seoul":{country:"S.KOREA",pop:"9.78M",status:"ALLIED NODE"},"n-cairo":{country:"EGYPT",pop:"10.08M",status:"MONITORED"},"n-berlin":{country:"GERMANY",pop:"3.66M",status:"ALLIED NODE"},"n-mumbai":{country:"INDIA",pop:"20.67M",status:"MONITORED"},"n-toronto":{country:"CANADA",pop:"2.93M",status:"ALLIED NODE"},"n-singapore":{country:"SINGAPORE",pop:"5.45M",status:"NEUTRAL ZONE"},"n-nairobi":{country:"KENYA",pop:"4.40M",status:"MONITORED"},"n-istanbul":{country:"TURKEY",pop:"15.46M",status:"NEUTRAL ZONE"},"n-lagos":{country:"NIGERIA",pop:"14.86M",status:"MONITORED"}};function _0(r){let e=r.split("").reduce((l,c)=>l*31+c.charCodeAt(0)>>>0,7);const t=()=>(e=e*1664525+1013904223>>>0,(e>>>16)/65535),i=9,n=140,a=34,s=n/i;let o=`<svg viewBox="0 0 ${n} ${a}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;height:34px;">`;o+='<g fill="currentColor">';for(let l=0;l<i;l++){const c=8+t()*24,u=s*(.48+t()*.44),h=l*s+(s-u)*.5;o+=`<rect x="${h.toFixed(1)}" y="${(a-c).toFixed(1)}" width="${u.toFixed(1)}" height="${c.toFixed(1)}"/>`}return o+="</g></svg>",o}function Pu(r,e,t){t.dispatchEvent(new CustomEvent("s9:alert",{bubbles:!0,detail:{level:e>=70?"critical":"warning",source:r}}))}function Lu(r,e){To(Ye,{...r,level:e}),at.set(r.id,e),bn($i,{timestamp:new Date().toISOString(),source:"NET",message:`NODE ONLINE: ${r.label} — LVL ${e}`,alert:e>=70}),e>=70&&(Pu(r.label,e,Ye),xr(Ye,r.id),pi(Ye,r.id))}const wn=mr.slice(0,8),Po=[15,72,55,18,28,10,45,33];wn.forEach((r,e)=>{setTimeout(()=>{Lu(r,Po[e]),e===wn.length-1&&setTimeout(()=>{Lr(Ye,55),Tn.setRadarThreatLevel(.55)},800)},e*300+500)});function Du(){const r=[...at.keys()],e=mr.filter(i=>!at.has(i.id)),t=Math.random();if(t<.28&&e.length>0){const i=e[ot(0,e.length-1)],n=ot(5,65);Lu(i,n),Pe(Ce,`SIGNAL ACQUIRED: ${i.label}`,"sys")}else if(t<.42&&r.length>5){const i=r[ot(0,r.length-1)],n=mr.find(a=>a.id===i);Mu(Ye,i),at.delete(i),Pe(Ce,`SIGNAL LOST: ${(n==null?void 0:n.label)??i}`,"info"),bn($i,{timestamp:new Date().toISOString(),source:"NET",message:`NODE OFFLINE: ${(n==null?void 0:n.label)??i}`,alert:!1})}else if(t<.72&&r.length>0){const i=r[ot(0,r.length-1)],n=mr.find(u=>u.id===i),a=at.get(i)??0,s=ot(8,28),o=Math.min(100,a+s);Pa(Ye,i,o),at.set(i,o),Lr(Ye,Math.max(...at.values())),Tn.setRadarThreatLevel(Math.max(...at.values())/100),Pe(Ce,`THREAT ESCALATION: ${(n==null?void 0:n.label)??i} ${a}→${o}`,o>=70?"err":"sys"),bn($i,{timestamp:new Date().toISOString(),source:"CRIT",message:`THREAT UP: ${(n==null?void 0:n.label)??i} LVL=${o}`,alert:o>=70}),o>=70&&a<70&&(Pu((n==null?void 0:n.label)??i,o,Ye),xr(Ye,i),pi(Ye,i));const l=a>=70?2:a>=40?1:0,c=o>=70?2:o>=40?1:0;l!==c&&fc(Ye,i)}else if(r.length>0){const i=r[ot(0,r.length-1)],n=mr.find(c=>c.id===i),a=at.get(i)??50,s=Math.max(0,a-ot(5,18));Pa(Ye,i,s),at.set(i,s),Lr(Ye,Math.max(0,...at.values())),Tn.setRadarThreatLevel(Math.max(0,...at.values())/100),Pe(Ce,`THREAT REDUCED: ${(n==null?void 0:n.label)??i} LVL=${s}`,"info");const o=a>=70?2:a>=40?1:0,l=s>=70?2:s>=40?1:0;o!==l&&fc(Ye,i)}if(r.length>=2){const i=1+Math.floor(Math.random()*3);for(let n=0;n<i;n++){const a=r[Math.floor(Math.random()*r.length)];let s=r[Math.floor(Math.random()*r.length)];s===a&&(s=r[(r.indexOf(a)+1)%r.length]),s!==a&&Su(Ye,a,s)}}setTimeout(Du,ot(4e3,9e3))}setTimeout(Du,wn.length*300+2500);setInterval(()=>{const r=[...at.keys()];if(r.length<2)return;const e=Math.random()<.4?2:1;for(let t=0;t<e;t++){const i=r[Math.floor(Math.random()*r.length)];let n=r[Math.floor(Math.random()*r.length)];n===i&&(n=r[(r.indexOf(i)+1)%r.length]),n!==i&&Su(Ye,i,n)}},1200);setInterval(()=>{const r=[...at.entries()].filter(([,a])=>a>=70);if(r.length===0)return;const e=Ye.getAttribute("data-active-node"),t=r.filter(([a])=>a!==e),i=t.length>0?t:r,[n]=i[Math.floor(Math.random()*i.length)];xr(Ye,n),pi(Ye,n)},8e3);const v0=document.getElementById("alert-host");document.addEventListener("s9:alert",r=>{var e;if(((e=r.detail)==null?void 0:e.level)==="critical"){const t=r.detail.source??"UNKNOWN";Pe(Ce,`⚠ CRITICAL ALERT: ${t}`,"err"),x_(v0,{level:"critical",code:"CRITICAL THREAT",message:t})}});const vn=document.getElementById("node-popup"),M0=document.getElementById("np-city"),x0=document.getElementById("np-skyline"),S0=document.getElementById("np-country"),y0=document.getElementById("np-pop"),b0=document.getElementById("np-coords"),Ac=document.getElementById("np-threat"),E0=document.getElementById("np-status");Ye.addEventListener("s9:threatmap-node-select",r=>{const{nodeId:e,label:t,level:i,lat:n,lng:a}=r.detail;Pe(Ce,`NODE SELECT: ${t} — LEVEL ${i} — ${n.toFixed(2)}°, ${a.toFixed(2)}°`,i>=71?"err":i>=41?"warn":"info"),bn($i,{timestamp:new Date().toISOString(),source:"TGT",message:`TARGET LOCKED: ${t} THREAT=${i}`,alert:i>=41});const s=g0[e]??{country:"—",pop:"—",status:"UNKNOWN"};M0.textContent=t,x0.innerHTML=_0(e),S0.textContent=s.country,y0.textContent=s.pop,b0.textContent=`${n.toFixed(2)}°, ${a.toFixed(2)}°`;const o=i>=70?"CRITICAL":i>=40?"ELEVATED":"LOW";Ac.textContent=`${i} — ${o}`,Ac.style.color=i>=70?"var(--text-alert)":i>=40?"var(--neon-amber)":"var(--neon-green)",E0.textContent=s.status,vn.classList.toggle("node-popup--left",a>60),vn.setAttribute("aria-hidden","false"),vn.classList.add("node-popup--visible")});Ye.addEventListener("s9:threatmap-node-deselect",()=>{vn.classList.remove("node-popup--visible"),setTimeout(()=>vn.setAttribute("aria-hidden","true"),260)});function T0(){const r=document.getElementById("threatmap-tactical");vu(r,{autoRotate:!0,bloomStrength:.7});const e=new Map;wn.forEach((d,p)=>{setTimeout(()=>{To(r,{...d,level:Po[p]}),e.set(d.id,Po[p])},p*200+300)}),setTimeout(()=>Lr(r,55),wn.length*200+800);const t=document.getElementById("tact-node-info"),i=document.getElementById("tact-btn-add"),n=document.getElementById("tact-btn-remove"),a=document.getElementById("tact-btn-focus"),s=document.getElementById("tact-btn-deselect"),o=document.getElementById("tact-level-slider"),l=document.getElementById("tact-level-val"),c=document.getElementById("tact-level-row");let u=null;function h(){const d=u!==null&&e.has(u);if(n.disabled=!d,a.disabled=!d,s.disabled=!d,o.disabled=!d,c.style.opacity=d?"1":"0.4",c.style.pointerEvents=d?"auto":"none",d){const p=mr.find(x=>x.id===u),g=e.get(u);t.textContent=`${(p==null?void 0:p.label)??u} — LVL ${g}`,o.value=g,l.textContent=g}else t.textContent="NO NODE SELECTED"}r.addEventListener("s9:threatmap-node-select",d=>{u=d.detail.nodeId,document.getElementById("tactical-threat").textContent=`THREAT: ${d.detail.level} — ${d.detail.label}`,h()}),r.addEventListener("s9:threatmap-node-deselect",()=>{u=null,h()}),i.addEventListener("click",()=>{const d=mr.filter(x=>!e.has(x.id));if(d.length===0)return;const p=d[Math.floor(Math.random()*d.length)],g=Math.floor(Math.random()*60)+10;To(r,{...p,level:g}),e.set(p.id,g),Lr(r,Math.max(...e.values())),xr(r,p.id),pi(r,p.id)}),n.addEventListener("click",()=>{u&&(Mu(r,u),e.delete(u),Lr(r,e.size>0?Math.max(...e.values()):0),u=null,h())}),a.addEventListener("click",()=>{u&&pi(r,u)}),s.addEventListener("click",()=>{xr(r,null),u=null,h()}),o.addEventListener("input",()=>{if(!u)return;const d=parseInt(o.value);l.textContent=d,Pa(r,u,d),e.set(u,d),Lr(r,Math.max(...e.values()));const p=mr.find(g=>g.id===u);t.textContent=`${(p==null?void 0:p.label)??u} — LVL ${d}`}),h()}function w0(){const r=document.getElementById("flow-matrix");if(!r)return;const e=[{id:"sec9",label:"SEC.9 HQ",x:50,y:50,root:!0},{id:"niihama",label:"NIIHAMA",x:22,y:22},{id:"togusa",label:"TOGUSA",x:78,y:22},{id:"batou",label:"BATOU",x:78,y:78},{id:"ishikawa",label:"ISHIKAWA",x:22,y:78},{id:"relay1",label:"RELAY ALPHA",x:36,y:32},{id:"relay2",label:"RELAY BETA",x:64,y:32},{id:"relay3",label:"RELAY GAMMA",x:36,y:68},{id:"relay4",label:"RELAY DELTA",x:64,y:68},{id:"ext1",label:"PUPPET MASTER",x:12,y:50},{id:"ext2",label:"LAUGHING MAN",x:88,y:50},{id:"tachi",label:"TACHIKOMA U9",x:50,y:12}],t=[{id:"e01",from:"sec9",to:"relay1"},{id:"e02",from:"sec9",to:"relay2"},{id:"e03",from:"sec9",to:"relay3"},{id:"e04",from:"sec9",to:"relay4"},{id:"e05",from:"relay1",to:"niihama"},{id:"e06",from:"relay2",to:"togusa"},{id:"e07",from:"relay3",to:"ishikawa"},{id:"e08",from:"relay4",to:"batou"},{id:"e09",from:"niihama",to:"ext1"},{id:"e10",from:"ext1",to:"relay3"},{id:"e11",from:"togusa",to:"relay1"},{id:"e12",from:"batou",to:"relay2"},{id:"e13",from:"ext2",to:"relay2"},{id:"e14",from:"ext2",to:"relay4"},{id:"e15",from:"sec9",to:"tachi"},{id:"e16",from:"relay1",to:"relay2"},{id:"e17",from:"relay3",to:"relay4"}],i={relay2:72,relay4:88,ext1:95,ext2:80,niihama:45,batou:55};S_(r,{nodes:e,edges:t});for(const[o,l]of Object.entries(i)){const c=r.querySelector(`[data-node-id="${o}"]`);c&&(l>=70?c.classList.add("s9-matrix__node--threat-high"):l>=40&&c.classList.add("s9-matrix__node--threat-mid"))}ga(r,"ext1");const n=t.map(o=>o.id),a=new Set;function s(){if(a.size>0){const h=[...a],d=h[Math.floor(Math.random()*h.length)];pu(r,d),a.delete(d)}const o=[null,null,"var(--neon-amber)","var(--neon-magenta)","var(--neon-green)",null],l=n.filter(h=>!a.has(h)),c=Math.random()<.4?2:1;for(let h=0;h<c&&l.length>0;h++){const d=l.splice(Math.floor(Math.random()*l.length),1)[0],p=o[Math.floor(Math.random()*o.length)];Eo(r,d,p),a.add(d)}if(Math.random()<.35){const h=e[Math.floor(Math.random()*e.length)];y_(r,h.id)}const u=document.getElementById("flow-overlay");if(u){const h=Object.values(i).filter(g=>g>=70).length,d=Object.values(i).filter(g=>g>=40&&g<70).length,p=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";u.innerHTML=`<span style="font-family:var(--font-terminal);font-size: 0.7rem;color:${p};opacity:0.7">NODES: ${e.length} &nbsp; <span style="color:var(--text-alert)">CRIT: ${h}</span> &nbsp; <span style="color:var(--neon-amber)">WARN: ${d}</span></span>`}}for(let o=0;o<4;o++){const l=n[Math.floor(Math.random()*n.length)];a.has(l)||(Eo(r,l),a.add(l))}setInterval(s,700),s(),document.getElementById("matrix-status").textContent="● LIVE"}(function(){const r=document.getElementById("ts-feed-src"),e=document.getElementById("ts-feed-canvas"),t=document.getElementById("ts-glow-canvas");if(!r||!e)return;const i=480,n=270,a=document.createElement("canvas");a.width=i,a.height=n;const s=a.getContext("2d");s.imageSmoothingEnabled=!1;function o(){const c=window.devicePixelRatio||1,u=e.getBoundingClientRect(),h=Math.round(u.width*c),d=Math.round(u.height*c);(e.width!==h||e.height!==d)&&(e.width=h,e.height=d);const p=e.getContext("2d");p.imageSmoothingEnabled=!0,p.imageSmoothingQuality="low";const g=r.naturalWidth||i*4,x=r.naturalHeight||n*4,m=g/x;let f=i,S=Math.round(i/m);S>n&&(S=n,f=Math.round(n*m));const E=(i-f)/2|0,y=(n-S)/2|0;s.clearRect(0,0,i,n),s.drawImage(r,E,y,f,S),p.clearRect(0,0,h,d);const A=Math.min(h/i,d/n),w=(h-i*A)/2|0,D=(d-n*A)/2|0;if(p.drawImage(a,w,D,i*A,n*A),t){(t.width!==h||t.height!==d)&&(t.width=h,t.height=d);const v=t.getContext("2d");v.clearRect(0,0,h,d),v.drawImage(a,w,D,i*A,n*A)}}function l(){o(),new ResizeObserver(o).observe(e)}r.complete&&r.naturalWidth?l():r.addEventListener("load",l,{once:!0})})();(function(){const r=document.getElementById("ts-grain-turb");if(!r)return;let e=0,t=2;function i(){e++;const n=2+(e%3===0?1:0)+(e%7===0?1:0);if(e%n===0){let a;do a=Math.random()*999+1|0;while(a===t);t=a,r.setAttribute("seed",a)}requestAnimationFrame(i)}requestAnimationFrame(i)})();
