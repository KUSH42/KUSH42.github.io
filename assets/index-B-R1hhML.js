(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}})();(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}})();(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}})();/**
* @license
* Copyright 2010-2026 Three.js Authors
* SPDX-License-Identifier: MIT
*/const Lo="183",Ha={ROTATE:0,DOLLY:1,PAN:2},Ba={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Hu=0,al=1,ku=2,or=1,Vu=2,pn=3,li=0,Nt=1,ni=2,gi=0,ca=1,Pt=2,nl=3,rl=4,Gu=5,ra=100,Wu=101,Xu=102,qu=103,Yu=104,ju=200,$u=201,Ku=202,Zu=203,Ps=204,Ls=205,Ju=206,Qu=207,eh=208,th=209,ih=210,ah=211,nh=212,rh=213,sh=214,Ds=0,Er=1,Is=2,Ga=3,Ns=4,Us=5,Os=6,Fs=7,Cc=0,oh=1,lh=2,_i=0,Rc=1,Pc=2,Lc=3,Dc=4,Ic=5,Nc=6,Uc=7,Oc=300,ua=301,Wa=302,zr=303,Hr=304,Dr=306,Bs=1e3,Pi=1001,zs=1002,Ct=1003,ch=1004,In=1005,Rt=1006,kr=1007,oa=1008,uh=1008,Zt=1009,Fc=1010,Bc=1011,xn=1012,Do=1013,xi=1014,si=1015,jt=1016,Io=1017,No=1018,Sn=1020,zc=35902,Hc=35899,kc=1021,Vc=1022,oi=1023,Ni=1026,la=1027,Uo=1028,Oo=1029,Xa=1030,Fo=1031,Bo=1033,lr=33776,cr=33777,ur=33778,hr=33779,Hs=35840,ks=35841,Vs=35842,Gs=35843,Ws=36196,Xs=37492,qs=37496,Ys=37488,js=37489,$s=37490,Ks=37491,Zs=37808,Js=37809,Qs=37810,eo=37811,to=37812,io=37813,ao=37814,no=37815,ro=37816,so=37817,oo=37818,lo=37819,co=37820,uo=37821,ho=36492,po=36494,fo=36495,mo=36283,go=36284,_o=36285,vo=36286,hh=3200,dh=0,ph=1,Xi="",Ht="srgb",qa="srgb-linear",br="linear",Ze="srgb",xa=7680,sl=519,fh=512,mh=513,gh=514,zo=515,_h=516,vh=517,Ho=518,xh=519,ol=35044,Qa=35048,ll="300 es",fi=2e3,Tr=2001;function Sh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function yn(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function yh(){const i=yn("canvas");return i.style.display="block",i}const cl={};function ul(...i){const e="THREE."+i.shift();console.log(e,...i)}function Gc(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ne(...i){i=Gc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Xe(...i){i=Gc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ar(...i){const e=i.join(" ");e in cl||(cl[e]=!0,Ne(...i))}function Mh(i,e,t){return new Promise(function(a,n){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:n();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:a()}}setTimeout(r,t)})}const Eh={[Ds]:Er,[Is]:Os,[Ns]:Fs,[Ga]:Us,[Er]:Ds,[Os]:Is,[Fs]:Ns,[Us]:Ga};class fa{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[e]===void 0&&(a[e]=[]),a[e].indexOf(t)===-1&&a[e].push(t)}hasEventListener(e,t){const a=this._listeners;return a===void 0?!1:a[e]!==void 0&&a[e].indexOf(t)!==-1}removeEventListener(e,t){const a=this._listeners;if(a===void 0)return;const n=a[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const a=t[e.type];if(a!==void 0){e.target=this;const n=a.slice(0);for(let r=0,s=n.length;r<s;r++)n[r].call(this,e);e.target=null}}}const Lt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],dr=Math.PI/180,xo=180/Math.PI;function wn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Lt[i&255]+Lt[i>>8&255]+Lt[i>>16&255]+Lt[i>>24&255]+"-"+Lt[e&255]+Lt[e>>8&255]+"-"+Lt[e>>16&15|64]+Lt[e>>24&255]+"-"+Lt[t&63|128]+Lt[t>>8&255]+"-"+Lt[t>>16&255]+Lt[t>>24&255]+Lt[a&255]+Lt[a>>8&255]+Lt[a>>16&255]+Lt[a>>24&255]).toLowerCase()}function ke(i,e,t){return Math.max(e,Math.min(t,i))}function bh(i,e){return(i%e+e)%e}function Vr(i,e,t){return(1-t)*i+t*e}function en(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ft(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Th={DEG2RAD:dr};let De=class Wc{constructor(e=0,t=0){Wc.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,a=this.y,n=e.elements;return this.x=n[0]*t+n[3]*a+n[6],this.y=n[1]*t+n[4]*a+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this}clampLength(e,t){const a=this.length();return this.divideScalar(a||1).multiplyScalar(ke(a,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const a=this.dot(e)/t;return Math.acos(ke(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,a=this.y-e.y;return t*t+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,a){return this.x=e.x+(t.x-e.x)*a,this.y=e.y+(t.y-e.y)*a,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const a=Math.cos(t),n=Math.sin(t),r=this.x-e.x,s=this.y-e.y;return this.x=r*a-s*n+e.x,this.y=r*n+s*a+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};class ji{constructor(e=0,t=0,a=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=a,this._w=n}static slerpFlat(e,t,a,n,r,s,o){let l=a[n+0],c=a[n+1],u=a[n+2],h=a[n+3],d=r[s+0],p=r[s+1],g=r[s+2],S=r[s+3];if(h!==S||l!==d||c!==p||u!==g){let m=l*d+c*p+u*g+h*S;m<0&&(d=-d,p=-p,g=-g,S=-S,m=-m);let f=1-o;if(m<.9995){const y=Math.acos(m),b=Math.sin(y);f=Math.sin(f*y)/b,o=Math.sin(o*y)/b,l=l*f+d*o,c=c*f+p*o,u=u*f+g*o,h=h*f+S*o}else{l=l*f+d*o,c=c*f+p*o,u=u*f+g*o,h=h*f+S*o;const y=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=y,c*=y,u*=y,h*=y}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,a,n,r,s){const o=a[n],l=a[n+1],c=a[n+2],u=a[n+3],h=r[s],d=r[s+1],p=r[s+2],g=r[s+3];return e[t]=o*g+u*h+l*p-c*d,e[t+1]=l*g+u*d+c*h-o*p,e[t+2]=c*g+u*p+o*d-l*h,e[t+3]=u*g-o*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,a,n){return this._x=e,this._y=t,this._z=a,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const a=e._x,n=e._y,r=e._z,s=e._order,o=Math.cos,l=Math.sin,c=o(a/2),u=o(n/2),h=o(r/2),d=l(a/2),p=l(n/2),g=l(r/2);switch(s){case"XYZ":this._x=d*u*h+c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h-d*p*g;break;case"YXZ":this._x=d*u*h+c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h+d*p*g;break;case"ZXY":this._x=d*u*h-c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h-d*p*g;break;case"ZYX":this._x=d*u*h-c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h+d*p*g;break;case"YZX":this._x=d*u*h+c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h-d*p*g;break;case"XZY":this._x=d*u*h-c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h+d*p*g;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const a=t/2,n=Math.sin(a);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,a=t[0],n=t[4],r=t[8],s=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=a+o+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(s-n)*p}else if(a>o&&a>h){const p=2*Math.sqrt(1+a-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(n+s)/p,this._z=(r+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-a-h);this._w=(r-c)/p,this._x=(n+s)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-a-o);this._w=(s-n)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let a=e.dot(t)+1;return a<1e-8?(a=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=a):(this._x=0,this._y=-e.z,this._z=e.y,this._w=a)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=a),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ke(this.dot(e),-1,1)))}rotateTowards(e,t){const a=this.angleTo(e);if(a===0)return this;const n=Math.min(1,t/a);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const a=e._x,n=e._y,r=e._z,s=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=a*u+s*o+n*c-r*l,this._y=n*u+s*l+r*o-a*c,this._z=r*u+s*c+a*l-n*o,this._w=s*u-a*o-n*l-r*c,this._onChangeCallback(),this}slerp(e,t){let a=e._x,n=e._y,r=e._z,s=e._w,o=this.dot(e);o<0&&(a=-a,n=-n,r=-r,s=-s,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+a*t,this._y=this._y*l+n*t,this._z=this._z*l+r*t,this._w=this._w*l+s*t,this._onChangeCallback()}else this._x=this._x*l+a*t,this._y=this._y*l+n*t,this._z=this._z*l+r*t,this._w=this._w*l+s*t,this.normalize();return this}slerpQuaternions(e,t,a){return this.copy(e).slerp(t,a)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),a=Math.random(),n=Math.sqrt(1-a),r=Math.sqrt(a);return this.set(n*Math.sin(e),n*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,a=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=a}set(e,t,a){return a===void 0&&(a=this.z),this.x=e,this.y=t,this.z=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(hl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(hl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,a=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[3]*a+r[6]*n,this.y=r[1]*t+r[4]*a+r[7]*n,this.z=r[2]*t+r[5]*a+r[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,a=this.y,n=this.z,r=e.elements,s=1/(r[3]*t+r[7]*a+r[11]*n+r[15]);return this.x=(r[0]*t+r[4]*a+r[8]*n+r[12])*s,this.y=(r[1]*t+r[5]*a+r[9]*n+r[13])*s,this.z=(r[2]*t+r[6]*a+r[10]*n+r[14])*s,this}applyQuaternion(e){const t=this.x,a=this.y,n=this.z,r=e.x,s=e.y,o=e.z,l=e.w,c=2*(s*n-o*a),u=2*(o*t-r*n),h=2*(r*a-s*t);return this.x=t+l*c+s*h-o*u,this.y=a+l*u+o*c-r*h,this.z=n+l*h+r*u-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,a=this.y,n=this.z,r=e.elements;return this.x=r[0]*t+r[4]*a+r[8]*n,this.y=r[1]*t+r[5]*a+r[9]*n,this.z=r[2]*t+r[6]*a+r[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this}clampLength(e,t){const a=this.length();return this.divideScalar(a||1).multiplyScalar(ke(a,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,a){return this.x=e.x+(t.x-e.x)*a,this.y=e.y+(t.y-e.y)*a,this.z=e.z+(t.z-e.z)*a,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const a=e.x,n=e.y,r=e.z,s=t.x,o=t.y,l=t.z;return this.x=n*l-r*o,this.y=r*s-a*l,this.z=a*o-n*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const a=e.dot(this)/t;return this.copy(e).multiplyScalar(a)}projectOnPlane(e){return Gr.copy(this).projectOnVector(e),this.sub(Gr)}reflect(e){return this.sub(Gr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const a=this.dot(e)/t;return Math.acos(ke(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,a=this.y-e.y,n=this.z-e.z;return t*t+a*a+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,a){const n=Math.sin(t)*e;return this.x=n*Math.sin(a),this.y=Math.cos(t)*e,this.z=n*Math.cos(a),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,a){return this.x=e*Math.sin(t),this.y=a,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),a=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=a,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,a=Math.sqrt(1-t*t);return this.x=a*Math.cos(e),this.y=t,this.z=a*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Gr=new P,hl=new ji;let He=class Xc{constructor(e,t,a,n,r,s,o,l,c){Xc.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,a,n,r,s,o,l,c)}set(e,t,a,n,r,s,o,l,c){const u=this.elements;return u[0]=e,u[1]=n,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=a,u[7]=s,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,a=e.elements;return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],this}extractBasis(e,t,a){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const a=e.elements,n=t.elements,r=this.elements,s=a[0],o=a[3],l=a[6],c=a[1],u=a[4],h=a[7],d=a[2],p=a[5],g=a[8],S=n[0],m=n[3],f=n[6],y=n[1],b=n[4],M=n[7],w=n[2],A=n[5],D=n[8];return r[0]=s*S+o*y+l*w,r[3]=s*m+o*b+l*A,r[6]=s*f+o*M+l*D,r[1]=c*S+u*y+h*w,r[4]=c*m+u*b+h*A,r[7]=c*f+u*M+h*D,r[2]=d*S+p*y+g*w,r[5]=d*m+p*b+g*A,r[8]=d*f+p*M+g*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],a=e[1],n=e[2],r=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*s*u-t*o*c-a*r*u+a*o*l+n*r*c-n*s*l}invert(){const e=this.elements,t=e[0],a=e[1],n=e[2],r=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*s-o*c,d=o*l-u*r,p=c*r-s*l,g=t*h+a*d+n*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/g;return e[0]=h*S,e[1]=(n*c-u*a)*S,e[2]=(o*a-n*s)*S,e[3]=d*S,e[4]=(u*t-n*l)*S,e[5]=(n*r-o*t)*S,e[6]=p*S,e[7]=(a*l-c*t)*S,e[8]=(s*t-a*r)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,a,n,r,s,o){const l=Math.cos(r),c=Math.sin(r);return this.set(a*l,a*c,-a*(l*s+c*o)+s+e,-n*c,n*l,-n*(-c*s+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Wr.makeScale(e,t)),this}rotate(e){return this.premultiply(Wr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Wr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),a=Math.sin(e);return this.set(t,-a,0,a,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,a=e.elements;for(let n=0;n<9;n++)if(t[n]!==a[n])return!1;return!0}fromArray(e,t=0){for(let a=0;a<9;a++)this.elements[a]=e[a+t];return this}toArray(e=[],t=0){const a=this.elements;return e[t]=a[0],e[t+1]=a[1],e[t+2]=a[2],e[t+3]=a[3],e[t+4]=a[4],e[t+5]=a[5],e[t+6]=a[6],e[t+7]=a[7],e[t+8]=a[8],e}clone(){return new this.constructor().fromArray(this.elements)}};const Wr=new He,dl=new He().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pl=new He().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ah(){const i={enabled:!0,workingColorSpace:qa,spaces:{},convert:function(n,r,s){return this.enabled===!1||r===s||!r||!s||(this.spaces[r].transfer===Ze&&(n.r=Ii(n.r),n.g=Ii(n.g),n.b=Ii(n.b)),this.spaces[r].primaries!==this.spaces[s].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===Ze&&(n.r=ka(n.r),n.g=ka(n.g),n.b=ka(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Xi?br:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,s){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return Ar("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return Ar("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(n,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],a=[.3127,.329];return i.define({[qa]:{primaries:e,whitePoint:a,transfer:br,toXYZ:dl,fromXYZ:pl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ht},outputColorSpaceConfig:{drawingBufferColorSpace:Ht}},[Ht]:{primaries:e,whitePoint:a,transfer:Ze,toXYZ:dl,fromXYZ:pl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ht}}}),i}const qe=Ah();function Ii(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ka(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Sa;class wh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let a;if(e instanceof HTMLCanvasElement)a=e;else{Sa===void 0&&(Sa=yn("canvas")),Sa.width=e.width,Sa.height=e.height;const n=Sa.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),a=Sa}return a.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=yn("canvas");t.width=e.width,t.height=e.height;const a=t.getContext("2d");a.drawImage(e,0,0,e.width,e.height);const n=a.getImageData(0,0,e.width,e.height),r=n.data;for(let s=0;s<r.length;s++)r[s]=Ii(r[s]/255)*255;return a.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let a=0;a<t.length;a++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[a]=Math.floor(Ii(t[a]/255)*255):t[a]=Ii(t[a]);return{data:t,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ch=0,ko=class{constructor(i=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=wn(),this.data=i,this.dataReady=!0,this.version=0}getSize(i){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?i.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?i.set(e.displayHeight,e.displayWidth,0):e!==null?i.set(e.width,e.height,e.depth||0):i.set(0,0,0),i}set needsUpdate(i){i===!0&&this.version++}toJSON(i){const e=i===void 0||typeof i=="string";if(!e&&i.images[this.uuid]!==void 0)return i.images[this.uuid];const t={uuid:this.uuid,url:""},a=this.data;if(a!==null){let n;if(Array.isArray(a)){n=[];for(let r=0,s=a.length;r<s;r++)a[r].isDataTexture?n.push(Xr(a[r].image)):n.push(Xr(a[r]))}else n=Xr(a);t.url=n}return e||(i.images[this.uuid]=t),t}};function Xr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?wh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}let Rh=0;const qr=new P;let $t=class pr extends fa{constructor(e=pr.DEFAULT_IMAGE,t=pr.DEFAULT_MAPPING,a=Pi,n=Pi,r=Rt,s=oa,o=oi,l=Zt,c=pr.DEFAULT_ANISOTROPY,u=Xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rh++}),this.uuid=wn(),this.name="",this.source=new ko(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=a,this.wrapT=n,this.magFilter=r,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(qr).x}get height(){return this.source.getSize(qr).y}get depth(){return this.source.getSize(qr).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const a=e[t];if(a===void 0){Ne(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){Ne(`Texture.setValues(): property '${t}' does not exist.`);continue}n&&a&&n.isVector2&&a.isVector2||n&&a&&n.isVector3&&a.isVector3||n&&a&&n.isMatrix3&&a.isMatrix3?n.copy(a):this[t]=a}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const a={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),t||(e.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Oc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bs:e.x=e.x-Math.floor(e.x);break;case Pi:e.x=e.x<0?0:1;break;case zs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bs:e.y=e.y-Math.floor(e.y);break;case Pi:e.y=e.y<0?0:1;break;case zs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};$t.DEFAULT_IMAGE=null;$t.DEFAULT_MAPPING=Oc;$t.DEFAULT_ANISOTROPY=1;class ft{constructor(e=0,t=0,a=0,n=1){ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=a,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,a,n){return this.x=e,this.y=t,this.z=a,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,a=this.y,n=this.z,r=this.w,s=e.elements;return this.x=s[0]*t+s[4]*a+s[8]*n+s[12]*r,this.y=s[1]*t+s[5]*a+s[9]*n+s[13]*r,this.z=s[2]*t+s[6]*a+s[10]*n+s[14]*r,this.w=s[3]*t+s[7]*a+s[11]*n+s[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,a,n,r;const s=e.elements,o=s[0],l=s[4],c=s[8],u=s[1],h=s[5],d=s[9],p=s[2],g=s[6],S=s[10];if(Math.abs(l-u)<.01&&Math.abs(c-p)<.01&&Math.abs(d-g)<.01){if(Math.abs(l+u)<.1&&Math.abs(c+p)<.1&&Math.abs(d+g)<.1&&Math.abs(o+h+S-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const f=(o+1)/2,y=(h+1)/2,b=(S+1)/2,M=(l+u)/4,w=(c+p)/4,A=(d+g)/4;return f>y&&f>b?f<.01?(a=0,n=.707106781,r=.707106781):(a=Math.sqrt(f),n=M/a,r=w/a):y>b?y<.01?(a=.707106781,n=0,r=.707106781):(n=Math.sqrt(y),a=M/n,r=A/n):b<.01?(a=.707106781,n=.707106781,r=0):(r=Math.sqrt(b),a=w/r,n=A/r),this.set(a,n,r,t),this}let m=Math.sqrt((g-d)*(g-d)+(c-p)*(c-p)+(u-l)*(u-l));return Math.abs(m)<.001&&(m=1),this.x=(g-d)/m,this.y=(c-p)/m,this.z=(u-l)/m,this.w=Math.acos((o+h+S-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ke(this.x,e.x,t.x),this.y=ke(this.y,e.y,t.y),this.z=ke(this.z,e.z,t.z),this.w=ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ke(this.x,e,t),this.y=ke(this.y,e,t),this.z=ke(this.z,e,t),this.w=ke(this.w,e,t),this}clampLength(e,t){const a=this.length();return this.divideScalar(a||1).multiplyScalar(ke(a,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,a){return this.x=e.x+(t.x-e.x)*a,this.y=e.y+(t.y-e.y)*a,this.z=e.z+(t.z-e.z)*a,this.w=e.w+(t.w-e.w)*a,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ph extends fa{constructor(e=1,t=1,a={}){super(),a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},a),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=a.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t),this.textures=[];const n={width:e,height:t,depth:a.depth},r=new $t(n),s=a.count;for(let o=0;o<s;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(a),this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=a.depthTexture,this.samples=a.samples,this.multiview=a.multiview}_setTextureOptions(e={}){const t={minFilter:Rt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let a=0;a<this.textures.length;a++)this.textures[a].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,a=1){if(this.width!==e||this.height!==t||this.depth!==a){this.width=e,this.height=t,this.depth=a;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=a,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,a=e.textures.length;t<a;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const n=Object.assign({},e.textures[t].image);this.textures[t].source=new ko(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Vt=class extends Ph{constructor(i=1,e=1,t={}){super(i,e,t),this.isWebGLRenderTarget=!0}},qc=class extends $t{constructor(i=null,e=1,t=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:i,width:e,height:t,depth:a},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(i){this.layerUpdates.add(i)}clearLayerUpdates(){this.layerUpdates.clear()}};class Lh extends $t{constructor(e=null,t=1,a=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:a,depth:n},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class st{constructor(e,t,a,n,r,s,o,l,c,u,h,d,p,g,S,m){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,a,n,r,s,o,l,c,u,h,d,p,g,S,m)}set(e,t,a,n,r,s,o,l,c,u,h,d,p,g,S,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=a,f[12]=n,f[1]=r,f[5]=s,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=g,f[11]=S,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,a=e.elements;return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],this}copyPosition(e){const t=this.elements,a=e.elements;return t[12]=a[12],t[13]=a[13],t[14]=a[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,a){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),a.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this)}makeBasis(e,t,a){return this.set(e.x,t.x,a.x,0,e.y,t.y,a.y,0,e.z,t.z,a.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,a=e.elements,n=1/ya.setFromMatrixColumn(e,0).length(),r=1/ya.setFromMatrixColumn(e,1).length(),s=1/ya.setFromMatrixColumn(e,2).length();return t[0]=a[0]*n,t[1]=a[1]*n,t[2]=a[2]*n,t[3]=0,t[4]=a[4]*r,t[5]=a[5]*r,t[6]=a[6]*r,t[7]=0,t[8]=a[8]*s,t[9]=a[9]*s,t[10]=a[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,a=e.x,n=e.y,r=e.z,s=Math.cos(a),o=Math.sin(a),l=Math.cos(n),c=Math.sin(n),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=s*u,p=s*h,g=o*u,S=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+g*c,t[5]=d-S*c,t[9]=-o*l,t[2]=S-d*c,t[6]=g+p*c,t[10]=s*l}else if(e.order==="YXZ"){const d=l*u,p=l*h,g=c*u,S=c*h;t[0]=d+S*o,t[4]=g*o-p,t[8]=s*c,t[1]=s*h,t[5]=s*u,t[9]=-o,t[2]=p*o-g,t[6]=S+d*o,t[10]=s*l}else if(e.order==="ZXY"){const d=l*u,p=l*h,g=c*u,S=c*h;t[0]=d-S*o,t[4]=-s*h,t[8]=g+p*o,t[1]=p+g*o,t[5]=s*u,t[9]=S-d*o,t[2]=-s*c,t[6]=o,t[10]=s*l}else if(e.order==="ZYX"){const d=s*u,p=s*h,g=o*u,S=o*h;t[0]=l*u,t[4]=g*c-p,t[8]=d*c+S,t[1]=l*h,t[5]=S*c+d,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=s*l}else if(e.order==="YZX"){const d=s*l,p=s*c,g=o*l,S=o*c;t[0]=l*u,t[4]=S-d*h,t[8]=g*h+p,t[1]=h,t[5]=s*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*h+g,t[10]=d-S*h}else if(e.order==="XZY"){const d=s*l,p=s*c,g=o*l,S=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+S,t[5]=s*u,t[9]=p*h-g,t[2]=g*h-p,t[6]=o*u,t[10]=S*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dh,e,Ih)}lookAt(e,t,a){const n=this.elements;return Xt.subVectors(e,t),Xt.lengthSq()===0&&(Xt.z=1),Xt.normalize(),Fi.crossVectors(a,Xt),Fi.lengthSq()===0&&(Math.abs(a.z)===1?Xt.x+=1e-4:Xt.z+=1e-4,Xt.normalize(),Fi.crossVectors(a,Xt)),Fi.normalize(),Nn.crossVectors(Xt,Fi),n[0]=Fi.x,n[4]=Nn.x,n[8]=Xt.x,n[1]=Fi.y,n[5]=Nn.y,n[9]=Xt.y,n[2]=Fi.z,n[6]=Nn.z,n[10]=Xt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const a=e.elements,n=t.elements,r=this.elements,s=a[0],o=a[4],l=a[8],c=a[12],u=a[1],h=a[5],d=a[9],p=a[13],g=a[2],S=a[6],m=a[10],f=a[14],y=a[3],b=a[7],M=a[11],w=a[15],A=n[0],D=n[4],v=n[8],T=n[12],W=n[1],C=n[5],O=n[9],H=n[13],G=n[2],k=n[6],z=n[10],F=n[14],Q=n[3],K=n[7],le=n[11],de=n[15];return r[0]=s*A+o*W+l*G+c*Q,r[4]=s*D+o*C+l*k+c*K,r[8]=s*v+o*O+l*z+c*le,r[12]=s*T+o*H+l*F+c*de,r[1]=u*A+h*W+d*G+p*Q,r[5]=u*D+h*C+d*k+p*K,r[9]=u*v+h*O+d*z+p*le,r[13]=u*T+h*H+d*F+p*de,r[2]=g*A+S*W+m*G+f*Q,r[6]=g*D+S*C+m*k+f*K,r[10]=g*v+S*O+m*z+f*le,r[14]=g*T+S*H+m*F+f*de,r[3]=y*A+b*W+M*G+w*Q,r[7]=y*D+b*C+M*k+w*K,r[11]=y*v+b*O+M*z+w*le,r[15]=y*T+b*H+M*F+w*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],a=e[4],n=e[8],r=e[12],s=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],p=e[14],g=e[3],S=e[7],m=e[11],f=e[15],y=l*p-c*d,b=o*p-c*h,M=o*d-l*h,w=s*p-c*u,A=s*d-l*u,D=s*h-o*u;return t*(S*y-m*b+f*M)-a*(g*y-m*w+f*A)+n*(g*b-S*w+f*D)-r*(g*M-S*A+m*D)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,a){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=a),this}invert(){const e=this.elements,t=e[0],a=e[1],n=e[2],r=e[3],s=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],p=e[11],g=e[12],S=e[13],m=e[14],f=e[15],y=t*o-a*s,b=t*l-n*s,M=t*c-r*s,w=a*l-n*o,A=a*c-r*o,D=n*c-r*l,v=u*S-h*g,T=u*m-d*g,W=u*f-p*g,C=h*m-d*S,O=h*f-p*S,H=d*f-p*m,G=y*H-b*O+M*C+w*W-A*T+D*v;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/G;return e[0]=(o*H-l*O+c*C)*k,e[1]=(n*O-a*H-r*C)*k,e[2]=(S*D-m*A+f*w)*k,e[3]=(d*A-h*D-p*w)*k,e[4]=(l*W-s*H-c*T)*k,e[5]=(t*H-n*W+r*T)*k,e[6]=(m*M-g*D-f*b)*k,e[7]=(u*D-d*M+p*b)*k,e[8]=(s*O-o*W+c*v)*k,e[9]=(a*W-t*O-r*v)*k,e[10]=(g*A-S*M+f*y)*k,e[11]=(h*M-u*A-p*y)*k,e[12]=(o*T-s*C-l*v)*k,e[13]=(t*C-a*T+n*v)*k,e[14]=(S*b-g*w-m*y)*k,e[15]=(u*w-h*b+d*y)*k,this}scale(e){const t=this.elements,a=e.x,n=e.y,r=e.z;return t[0]*=a,t[4]*=n,t[8]*=r,t[1]*=a,t[5]*=n,t[9]*=r,t[2]*=a,t[6]*=n,t[10]*=r,t[3]*=a,t[7]*=n,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],a=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,a,n))}makeTranslation(e,t,a){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,a,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),a=Math.sin(e);return this.set(1,0,0,0,0,t,-a,0,0,a,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),a=Math.sin(e);return this.set(t,0,a,0,0,1,0,0,-a,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),a=Math.sin(e);return this.set(t,-a,0,0,a,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const a=Math.cos(t),n=Math.sin(t),r=1-a,s=e.x,o=e.y,l=e.z,c=r*s,u=r*o;return this.set(c*s+a,c*o-n*l,c*l+n*o,0,c*o+n*l,u*o+a,u*l-n*s,0,c*l-n*o,u*l+n*s,r*l*l+a,0,0,0,0,1),this}makeScale(e,t,a){return this.set(e,0,0,0,0,t,0,0,0,0,a,0,0,0,0,1),this}makeShear(e,t,a,n,r,s){return this.set(1,a,r,0,e,1,s,0,t,n,1,0,0,0,0,1),this}compose(e,t,a){const n=this.elements,r=t._x,s=t._y,o=t._z,l=t._w,c=r+r,u=s+s,h=o+o,d=r*c,p=r*u,g=r*h,S=s*u,m=s*h,f=o*h,y=l*c,b=l*u,M=l*h,w=a.x,A=a.y,D=a.z;return n[0]=(1-(S+f))*w,n[1]=(p+M)*w,n[2]=(g-b)*w,n[3]=0,n[4]=(p-M)*A,n[5]=(1-(d+f))*A,n[6]=(m+y)*A,n[7]=0,n[8]=(g+b)*D,n[9]=(m-y)*D,n[10]=(1-(d+S))*D,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,a){const n=this.elements;e.x=n[12],e.y=n[13],e.z=n[14];const r=this.determinant();if(r===0)return a.set(1,1,1),t.identity(),this;let s=ya.set(n[0],n[1],n[2]).length();const o=ya.set(n[4],n[5],n[6]).length(),l=ya.set(n[8],n[9],n[10]).length();r<0&&(s=-s),ti.copy(this);const c=1/s,u=1/o,h=1/l;return ti.elements[0]*=c,ti.elements[1]*=c,ti.elements[2]*=c,ti.elements[4]*=u,ti.elements[5]*=u,ti.elements[6]*=u,ti.elements[8]*=h,ti.elements[9]*=h,ti.elements[10]*=h,t.setFromRotationMatrix(ti),a.x=s,a.y=o,a.z=l,this}makePerspective(e,t,a,n,r,s,o=fi,l=!1){const c=this.elements,u=2*r/(t-e),h=2*r/(a-n),d=(t+e)/(t-e),p=(a+n)/(a-n);let g,S;if(l)g=r/(s-r),S=s*r/(s-r);else if(o===fi)g=-(s+r)/(s-r),S=-2*s*r/(s-r);else if(o===Tr)g=-s/(s-r),S=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,a,n,r,s,o=fi,l=!1){const c=this.elements,u=2/(t-e),h=2/(a-n),d=-(t+e)/(t-e),p=-(a+n)/(a-n);let g,S;if(l)g=1/(s-r),S=s/(s-r);else if(o===fi)g=-2/(s-r),S=-(s+r)/(s-r);else if(o===Tr)g=-1/(s-r),S=-r/(s-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,a=e.elements;for(let n=0;n<16;n++)if(t[n]!==a[n])return!1;return!0}fromArray(e,t=0){for(let a=0;a<16;a++)this.elements[a]=e[a+t];return this}toArray(e=[],t=0){const a=this.elements;return e[t]=a[0],e[t+1]=a[1],e[t+2]=a[2],e[t+3]=a[3],e[t+4]=a[4],e[t+5]=a[5],e[t+6]=a[6],e[t+7]=a[7],e[t+8]=a[8],e[t+9]=a[9],e[t+10]=a[10],e[t+11]=a[11],e[t+12]=a[12],e[t+13]=a[13],e[t+14]=a[14],e[t+15]=a[15],e}}const ya=new P,ti=new st,Dh=new P(0,0,0),Ih=new P(1,1,1),Fi=new P,Nn=new P,Xt=new P,fl=new st,ml=new ji;let ha=class Yc{constructor(e=0,t=0,a=0,n=Yc.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=a,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,a,n=this._order){return this._x=e,this._y=t,this._z=a,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,a=!0){const n=e.elements,r=n[0],s=n[4],o=n[8],l=n[1],c=n[5],u=n[9],h=n[2],d=n[6],p=n[10];switch(t){case"XYZ":this._y=Math.asin(ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ke(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ke(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ke(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,a===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,a){return fl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fl,t,a)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ml.setFromEuler(this),this.setFromQuaternion(ml,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ha.DEFAULT_ORDER="XYZ";let Vo=class{constructor(){this.mask=1}set(i){this.mask=(1<<i|0)>>>0}enable(i){this.mask|=1<<i|0}enableAll(){this.mask=-1}toggle(i){this.mask^=1<<i|0}disable(i){this.mask&=~(1<<i|0)}disableAll(){this.mask=0}test(i){return(this.mask&i.mask)!==0}isEnabled(i){return(this.mask&(1<<i|0))!==0}},Nh=0;const gl=new P,Ma=new ji,Ei=new st,Un=new P,tn=new P,Uh=new P,Oh=new ji,_l=new P(1,0,0),vl=new P(0,1,0),xl=new P(0,0,1),Sl={type:"added"},Fh={type:"removed"},Ea={type:"childadded",child:null},Yr={type:"childremoved",child:null};let Qt=class fr extends fa{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=fr.DEFAULT_UP.clone();const e=new P,t=new ha,a=new ji,n=new P(1,1,1);function r(){a.setFromEuler(t,!1)}function s(){t.setFromQuaternion(a,void 0,!1)}t._onChange(r),a._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new st},normalMatrix:{value:new He}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=fr.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=fr.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ma.setFromAxisAngle(e,t),this.quaternion.multiply(Ma),this}rotateOnWorldAxis(e,t){return Ma.setFromAxisAngle(e,t),this.quaternion.premultiply(Ma),this}rotateX(e){return this.rotateOnAxis(_l,e)}rotateY(e){return this.rotateOnAxis(vl,e)}rotateZ(e){return this.rotateOnAxis(xl,e)}translateOnAxis(e,t){return gl.copy(e).applyQuaternion(this.quaternion),this.position.add(gl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_l,e)}translateY(e){return this.translateOnAxis(vl,e)}translateZ(e){return this.translateOnAxis(xl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ei.copy(this.matrixWorld).invert())}lookAt(e,t,a){e.isVector3?Un.copy(e):Un.set(e,t,a);const n=this.parent;this.updateWorldMatrix(!0,!1),tn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ei.lookAt(tn,Un,this.up):Ei.lookAt(Un,tn,this.up),this.quaternion.setFromRotationMatrix(Ei),n&&(Ei.extractRotation(n.matrixWorld),Ma.setFromRotationMatrix(Ei),this.quaternion.premultiply(Ma.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Xe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sl),Ea.child=e,this.dispatchEvent(Ea),Ea.child=null):Xe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Fh),Yr.child=e,this.dispatchEvent(Yr),Yr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ei),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sl),Ea.child=e,this.dispatchEvent(Ea),Ea.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let a=0,n=this.children.length;a<n;a++){const r=this.children[a].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,a=[]){this[e]===t&&a.push(this);const n=this.children;for(let r=0,s=n.length;r<s;r++)n[r].getObjectsByProperty(e,t,a);return a}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tn,e,Uh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tn,Oh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let a=0,n=t.length;a<n;a++)t[a].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let a=0,n=t.length;a<n;a++)t[a].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,a=e.y,n=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*a-r[8]*n,r[13]+=a-r[1]*t-r[5]*a-r[9]*n,r[14]+=n-r[2]*t-r[6]*a-r[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let a=0,n=t.length;a<n;a++)t[a].updateMatrixWorld(e)}updateWorldMatrix(e,t){const a=this.parent;if(e===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const n=this.children;for(let r=0,s=n.length;r<s;r++)n[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",a={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),this.static!==!1&&(n.static=this.static),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(e),n.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));n.material=o}else n.material=r(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(r(e.animations,l))}}if(t){const o=s(e.geometries),l=s(e.materials),c=s(e.textures),u=s(e.images),h=s(e.shapes),d=s(e.skeletons),p=s(e.animations),g=s(e.nodes);o.length>0&&(a.geometries=o),l.length>0&&(a.materials=l),c.length>0&&(a.textures=c),u.length>0&&(a.images=u),h.length>0&&(a.shapes=h),d.length>0&&(a.skeletons=d),p.length>0&&(a.animations=p),g.length>0&&(a.nodes=g)}return a.object=n,a;function s(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let a=0;a<e.children.length;a++){const n=e.children[a];this.add(n.clone())}return this}};Qt.DEFAULT_UP=new P(0,1,0);Qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class za extends Qt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Bh={type:"move"};class jr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new za,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new za,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new za,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const a of e.hand.values())this._getHandJoint(t,a)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,a){let n=null,r=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const S of e.hand.values()){const m=t.getJointPose(S,a),f=this._getHandJoint(c,S);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,a),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=t.getPose(e.targetRaySpace,a),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bh)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const a=new za;a.matrixAutoUpdate=!1,a.visible=!1,e.joints[t.jointName]=a,e.add(a)}return e.joints[t.jointName]}}const jc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bi={h:0,s:0,l:0},On={h:0,s:0,l:0};function $r(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}let be=class{constructor(i,e,t){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(i,e,t)}set(i,e,t){if(e===void 0&&t===void 0){const a=i;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(i,e,t);return this}setScalar(i){return this.r=i,this.g=i,this.b=i,this}setHex(i,e=Ht){return i=Math.floor(i),this.r=(i>>16&255)/255,this.g=(i>>8&255)/255,this.b=(i&255)/255,qe.colorSpaceToWorking(this,e),this}setRGB(i,e,t,a=qe.workingColorSpace){return this.r=i,this.g=e,this.b=t,qe.colorSpaceToWorking(this,a),this}setHSL(i,e,t,a=qe.workingColorSpace){if(i=bh(i,1),e=ke(e,0,1),t=ke(t,0,1),e===0)this.r=this.g=this.b=t;else{const n=t<=.5?t*(1+e):t+e-t*e,r=2*t-n;this.r=$r(r,n,i+1/3),this.g=$r(r,n,i),this.b=$r(r,n,i-1/3)}return qe.colorSpaceToWorking(this,a),this}setStyle(i,e=Ht){function t(n){n!==void 0&&parseFloat(n)<1&&Ne("Color: Alpha component of "+i+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(i)){let n;const r=a[1],s=a[2];switch(r){case"rgb":case"rgba":if(n=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return t(n[4]),this.setRGB(Math.min(255,parseInt(n[1],10))/255,Math.min(255,parseInt(n[2],10))/255,Math.min(255,parseInt(n[3],10))/255,e);if(n=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return t(n[4]),this.setRGB(Math.min(100,parseInt(n[1],10))/100,Math.min(100,parseInt(n[2],10))/100,Math.min(100,parseInt(n[3],10))/100,e);break;case"hsl":case"hsla":if(n=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return t(n[4]),this.setHSL(parseFloat(n[1])/360,parseFloat(n[2])/100,parseFloat(n[3])/100,e);break;default:Ne("Color: Unknown color model "+i)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(i)){const n=a[1],r=n.length;if(r===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(n,16),e);Ne("Color: Invalid hex color "+i)}else if(i&&i.length>0)return this.setColorName(i,e);return this}setColorName(i,e=Ht){const t=jc[i.toLowerCase()];return t!==void 0?this.setHex(t,e):Ne("Color: Unknown color "+i),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(i){return this.r=i.r,this.g=i.g,this.b=i.b,this}copySRGBToLinear(i){return this.r=Ii(i.r),this.g=Ii(i.g),this.b=Ii(i.b),this}copyLinearToSRGB(i){return this.r=ka(i.r),this.g=ka(i.g),this.b=ka(i.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(i=Ht){return qe.workingToColorSpace(Dt.copy(this),i),Math.round(ke(Dt.r*255,0,255))*65536+Math.round(ke(Dt.g*255,0,255))*256+Math.round(ke(Dt.b*255,0,255))}getHexString(i=Ht){return("000000"+this.getHex(i).toString(16)).slice(-6)}getHSL(i,e=qe.workingColorSpace){qe.workingToColorSpace(Dt.copy(this),e);const t=Dt.r,a=Dt.g,n=Dt.b,r=Math.max(t,a,n),s=Math.min(t,a,n);let o,l;const c=(s+r)/2;if(s===r)o=0,l=0;else{const u=r-s;switch(l=c<=.5?u/(r+s):u/(2-r-s),r){case t:o=(a-n)/u+(a<n?6:0);break;case a:o=(n-t)/u+2;break;case n:o=(t-a)/u+4;break}o/=6}return i.h=o,i.s=l,i.l=c,i}getRGB(i,e=qe.workingColorSpace){return qe.workingToColorSpace(Dt.copy(this),e),i.r=Dt.r,i.g=Dt.g,i.b=Dt.b,i}getStyle(i=Ht){qe.workingToColorSpace(Dt.copy(this),i);const e=Dt.r,t=Dt.g,a=Dt.b;return i!==Ht?`color(${i} ${e.toFixed(3)} ${t.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(t*255)},${Math.round(a*255)})`}offsetHSL(i,e,t){return this.getHSL(Bi),this.setHSL(Bi.h+i,Bi.s+e,Bi.l+t)}add(i){return this.r+=i.r,this.g+=i.g,this.b+=i.b,this}addColors(i,e){return this.r=i.r+e.r,this.g=i.g+e.g,this.b=i.b+e.b,this}addScalar(i){return this.r+=i,this.g+=i,this.b+=i,this}sub(i){return this.r=Math.max(0,this.r-i.r),this.g=Math.max(0,this.g-i.g),this.b=Math.max(0,this.b-i.b),this}multiply(i){return this.r*=i.r,this.g*=i.g,this.b*=i.b,this}multiplyScalar(i){return this.r*=i,this.g*=i,this.b*=i,this}lerp(i,e){return this.r+=(i.r-this.r)*e,this.g+=(i.g-this.g)*e,this.b+=(i.b-this.b)*e,this}lerpColors(i,e,t){return this.r=i.r+(e.r-i.r)*t,this.g=i.g+(e.g-i.g)*t,this.b=i.b+(e.b-i.b)*t,this}lerpHSL(i,e){this.getHSL(Bi),i.getHSL(On);const t=Vr(Bi.h,On.h,e),a=Vr(Bi.s,On.s,e),n=Vr(Bi.l,On.l,e);return this.setHSL(t,a,n),this}setFromVector3(i){return this.r=i.x,this.g=i.y,this.b=i.z,this}applyMatrix3(i){const e=this.r,t=this.g,a=this.b,n=i.elements;return this.r=n[0]*e+n[3]*t+n[6]*a,this.g=n[1]*e+n[4]*t+n[7]*a,this.b=n[2]*e+n[5]*t+n[8]*a,this}equals(i){return i.r===this.r&&i.g===this.g&&i.b===this.b}fromArray(i,e=0){return this.r=i[e],this.g=i[e+1],this.b=i[e+2],this}toArray(i=[],e=0){return i[e]=this.r,i[e+1]=this.g,i[e+2]=this.b,i}fromBufferAttribute(i,e){return this.r=i.getX(e),this.g=i.getY(e),this.b=i.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const Dt=new be;be.NAMES=jc;class Go extends Qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ha,this.environmentIntensity=1,this.environmentRotation=new ha,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const ii=new P,bi=new P,Kr=new P,Ti=new P,ba=new P,Ta=new P,yl=new P,Zr=new P,Jr=new P,Qr=new P,es=new ft,ts=new ft,is=new ft;let an=class Ua{constructor(e=new P,t=new P,a=new P){this.a=e,this.b=t,this.c=a}static getNormal(e,t,a,n){n.subVectors(a,t),ii.subVectors(e,t),n.cross(ii);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(e,t,a,n,r){ii.subVectors(n,t),bi.subVectors(a,t),Kr.subVectors(e,t);const s=ii.dot(ii),o=ii.dot(bi),l=ii.dot(Kr),c=bi.dot(bi),u=bi.dot(Kr),h=s*c-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,p=(c*l-o*u)*d,g=(s*u-o*l)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,a,n){return this.getBarycoord(e,t,a,n,Ti)===null?!1:Ti.x>=0&&Ti.y>=0&&Ti.x+Ti.y<=1}static getInterpolation(e,t,a,n,r,s,o,l){return this.getBarycoord(e,t,a,n,Ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ti.x),l.addScaledVector(s,Ti.y),l.addScaledVector(o,Ti.z),l)}static getInterpolatedAttribute(e,t,a,n,r,s){return es.setScalar(0),ts.setScalar(0),is.setScalar(0),es.fromBufferAttribute(e,t),ts.fromBufferAttribute(e,a),is.fromBufferAttribute(e,n),s.setScalar(0),s.addScaledVector(es,r.x),s.addScaledVector(ts,r.y),s.addScaledVector(is,r.z),s}static isFrontFacing(e,t,a,n){return ii.subVectors(a,t),bi.subVectors(e,t),ii.cross(bi).dot(n)<0}set(e,t,a){return this.a.copy(e),this.b.copy(t),this.c.copy(a),this}setFromPointsAndIndices(e,t,a,n){return this.a.copy(e[t]),this.b.copy(e[a]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,a,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,a),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ii.subVectors(this.c,this.b),bi.subVectors(this.a,this.b),ii.cross(bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ua.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ua.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,a,n,r){return Ua.getInterpolation(e,this.a,this.b,this.c,t,a,n,r)}containsPoint(e){return Ua.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ua.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const a=this.a,n=this.b,r=this.c;let s,o;ba.subVectors(n,a),Ta.subVectors(r,a),Zr.subVectors(e,a);const l=ba.dot(Zr),c=Ta.dot(Zr);if(l<=0&&c<=0)return t.copy(a);Jr.subVectors(e,n);const u=ba.dot(Jr),h=Ta.dot(Jr);if(u>=0&&h<=u)return t.copy(n);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return s=l/(l-u),t.copy(a).addScaledVector(ba,s);Qr.subVectors(e,r);const p=ba.dot(Qr),g=Ta.dot(Qr);if(g>=0&&p<=g)return t.copy(r);const S=p*c-l*g;if(S<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(a).addScaledVector(Ta,o);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return yl.subVectors(r,n),o=(h-u)/(h-u+(p-g)),t.copy(n).addScaledVector(yl,o);const f=1/(m+S+d);return s=S*f,o=d*f,t.copy(a).addScaledVector(ba,s).addScaledVector(Ta,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}};class ma{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,a=e.length;t<a;t+=3)this.expandByPoint(ai.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,a=e.count;t<a;t++)this.expandByPoint(ai.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,a=e.length;t<a;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const a=ai.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(a),this.max.copy(e).add(a),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const a=e.geometry;if(a!==void 0){const r=a.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=r.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,ai):ai.fromBufferAttribute(r,s),ai.applyMatrix4(e.matrixWorld),this.expandByPoint(ai);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Fn.copy(e.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),Fn.copy(a.boundingBox)),Fn.applyMatrix4(e.matrixWorld),this.union(Fn)}const n=e.children;for(let r=0,s=n.length;r<s;r++)this.expandByObject(n[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ai),ai.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,a;return e.normal.x>0?(t=e.normal.x*this.min.x,a=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,a=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,a+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,a+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,a+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,a+=e.normal.z*this.min.z),t<=-e.constant&&a>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(nn),Bn.subVectors(this.max,nn),Aa.subVectors(e.a,nn),wa.subVectors(e.b,nn),Ca.subVectors(e.c,nn),zi.subVectors(wa,Aa),Hi.subVectors(Ca,wa),Qi.subVectors(Aa,Ca);let t=[0,-zi.z,zi.y,0,-Hi.z,Hi.y,0,-Qi.z,Qi.y,zi.z,0,-zi.x,Hi.z,0,-Hi.x,Qi.z,0,-Qi.x,-zi.y,zi.x,0,-Hi.y,Hi.x,0,-Qi.y,Qi.x,0];return!as(t,Aa,wa,Ca,Bn)||(t=[1,0,0,0,1,0,0,0,1],!as(t,Aa,wa,Ca,Bn))?!1:(zn.crossVectors(zi,Hi),t=[zn.x,zn.y,zn.z],as(t,Aa,wa,Ca,Bn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ai).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ai).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ai),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ai=[new P,new P,new P,new P,new P,new P,new P,new P],ai=new P,Fn=new ma,Aa=new P,wa=new P,Ca=new P,zi=new P,Hi=new P,Qi=new P,nn=new P,Bn=new P,zn=new P,ea=new P;function as(i,e,t,a,n){for(let r=0,s=i.length-3;r<=s;r+=3){ea.fromArray(i,r);const o=n.x*Math.abs(ea.x)+n.y*Math.abs(ea.y)+n.z*Math.abs(ea.z),l=e.dot(ea),c=t.dot(ea),u=a.dot(ea);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const xt=new P,Hn=new De;let zh=0,Gt=class{constructor(i,e,t=!1){if(Array.isArray(i))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:zh++}),this.name="",this.array=i,this.itemSize=e,this.count=i!==void 0?i.length/e:0,this.normalized=t,this.usage=ol,this.updateRanges=[],this.gpuType=si,this.version=0}onUploadCallback(){}set needsUpdate(i){i===!0&&this.version++}setUsage(i){return this.usage=i,this}addUpdateRange(i,e){this.updateRanges.push({start:i,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(i){return this.name=i.name,this.array=new i.array.constructor(i.array),this.itemSize=i.itemSize,this.count=i.count,this.normalized=i.normalized,this.usage=i.usage,this.gpuType=i.gpuType,this}copyAt(i,e,t){i*=this.itemSize,t*=e.itemSize;for(let a=0,n=this.itemSize;a<n;a++)this.array[i+a]=e.array[t+a];return this}copyArray(i){return this.array.set(i),this}applyMatrix3(i){if(this.itemSize===2)for(let e=0,t=this.count;e<t;e++)Hn.fromBufferAttribute(this,e),Hn.applyMatrix3(i),this.setXY(e,Hn.x,Hn.y);else if(this.itemSize===3)for(let e=0,t=this.count;e<t;e++)xt.fromBufferAttribute(this,e),xt.applyMatrix3(i),this.setXYZ(e,xt.x,xt.y,xt.z);return this}applyMatrix4(i){for(let e=0,t=this.count;e<t;e++)xt.fromBufferAttribute(this,e),xt.applyMatrix4(i),this.setXYZ(e,xt.x,xt.y,xt.z);return this}applyNormalMatrix(i){for(let e=0,t=this.count;e<t;e++)xt.fromBufferAttribute(this,e),xt.applyNormalMatrix(i),this.setXYZ(e,xt.x,xt.y,xt.z);return this}transformDirection(i){for(let e=0,t=this.count;e<t;e++)xt.fromBufferAttribute(this,e),xt.transformDirection(i),this.setXYZ(e,xt.x,xt.y,xt.z);return this}set(i,e=0){return this.array.set(i,e),this}getComponent(i,e){let t=this.array[i*this.itemSize+e];return this.normalized&&(t=en(t,this.array)),t}setComponent(i,e,t){return this.normalized&&(t=Ft(t,this.array)),this.array[i*this.itemSize+e]=t,this}getX(i){let e=this.array[i*this.itemSize];return this.normalized&&(e=en(e,this.array)),e}setX(i,e){return this.normalized&&(e=Ft(e,this.array)),this.array[i*this.itemSize]=e,this}getY(i){let e=this.array[i*this.itemSize+1];return this.normalized&&(e=en(e,this.array)),e}setY(i,e){return this.normalized&&(e=Ft(e,this.array)),this.array[i*this.itemSize+1]=e,this}getZ(i){let e=this.array[i*this.itemSize+2];return this.normalized&&(e=en(e,this.array)),e}setZ(i,e){return this.normalized&&(e=Ft(e,this.array)),this.array[i*this.itemSize+2]=e,this}getW(i){let e=this.array[i*this.itemSize+3];return this.normalized&&(e=en(e,this.array)),e}setW(i,e){return this.normalized&&(e=Ft(e,this.array)),this.array[i*this.itemSize+3]=e,this}setXY(i,e,t){return i*=this.itemSize,this.normalized&&(e=Ft(e,this.array),t=Ft(t,this.array)),this.array[i+0]=e,this.array[i+1]=t,this}setXYZ(i,e,t,a){return i*=this.itemSize,this.normalized&&(e=Ft(e,this.array),t=Ft(t,this.array),a=Ft(a,this.array)),this.array[i+0]=e,this.array[i+1]=t,this.array[i+2]=a,this}setXYZW(i,e,t,a,n){return i*=this.itemSize,this.normalized&&(e=Ft(e,this.array),t=Ft(t,this.array),a=Ft(a,this.array),n=Ft(n,this.array)),this.array[i+0]=e,this.array[i+1]=t,this.array[i+2]=a,this.array[i+3]=n,this}onUpload(i){return this.onUploadCallback=i,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const i={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(i.name=this.name),this.usage!==ol&&(i.usage=this.usage),i}},$c=class extends Gt{constructor(i,e,t){super(new Uint16Array(i),e,t)}},Kc=class extends Gt{constructor(i,e,t){super(new Uint32Array(i),e,t)}},Ut=class extends Gt{constructor(i,e,t){super(new Float32Array(i),e,t)}};const Hh=new ma,rn=new P,ns=new P;class Ka{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const a=this.center;t!==void 0?a.copy(t):Hh.setFromPoints(e).getCenter(a);let n=0;for(let r=0,s=e.length;r<s;r++)n=Math.max(n,a.distanceToSquared(e[r]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const a=this.center.distanceToSquared(e);return t.copy(e),a>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rn.subVectors(e,this.center);const t=rn.lengthSq();if(t>this.radius*this.radius){const a=Math.sqrt(t),n=(a-this.radius)*.5;this.center.addScaledVector(rn,n/a),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ns.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rn.copy(e.center).add(ns)),this.expandByPoint(rn.copy(e.center).sub(ns))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let kh=0;const Kt=new st,rs=new Qt,Ra=new P,qt=new ma,sn=new ma,Tt=new P;class ht extends fa{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=wn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Sh(e)?Kc:$c)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,a=0){this.groups.push({start:e,count:t,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const r=new He().getNormalMatrix(e);a.applyNormalMatrix(r),a.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kt.makeRotationFromQuaternion(e),this.applyMatrix4(Kt),this}rotateX(e){return Kt.makeRotationX(e),this.applyMatrix4(Kt),this}rotateY(e){return Kt.makeRotationY(e),this.applyMatrix4(Kt),this}rotateZ(e){return Kt.makeRotationZ(e),this.applyMatrix4(Kt),this}translate(e,t,a){return Kt.makeTranslation(e,t,a),this.applyMatrix4(Kt),this}scale(e,t,a){return Kt.makeScale(e,t,a),this.applyMatrix4(Kt),this}lookAt(e){return rs.lookAt(e),rs.updateMatrix(),this.applyMatrix4(rs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ra).negate(),this.translate(Ra.x,Ra.y,Ra.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const a=[];for(let n=0,r=e.length;n<r;n++){const s=e[n];a.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Ut(a,3))}else{const a=Math.min(e.length,t.count);for(let n=0;n<a;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ma);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let a=0,n=t.length;a<n;a++){const r=t[a];qt.setFromBufferAttribute(r),this.morphTargetsRelative?(Tt.addVectors(this.boundingBox.min,qt.min),this.boundingBox.expandByPoint(Tt),Tt.addVectors(this.boundingBox.max,qt.max),this.boundingBox.expandByPoint(Tt)):(this.boundingBox.expandByPoint(qt.min),this.boundingBox.expandByPoint(qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ka);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const a=this.boundingSphere.center;if(qt.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){const o=t[r];sn.setFromBufferAttribute(o),this.morphTargetsRelative?(Tt.addVectors(qt.min,sn.min),qt.expandByPoint(Tt),Tt.addVectors(qt.max,sn.max),qt.expandByPoint(Tt)):(qt.expandByPoint(sn.min),qt.expandByPoint(sn.max))}qt.getCenter(a);let n=0;for(let r=0,s=e.count;r<s;r++)Tt.fromBufferAttribute(e,r),n=Math.max(n,a.distanceToSquared(Tt));if(t)for(let r=0,s=t.length;r<s;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Tt.fromBufferAttribute(o,c),l&&(Ra.fromBufferAttribute(e,c),Tt.add(Ra)),n=Math.max(n,a.distanceToSquared(Tt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=t.position,n=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gt(new Float32Array(4*a.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let v=0;v<a.count;v++)o[v]=new P,l[v]=new P;const c=new P,u=new P,h=new P,d=new De,p=new De,g=new De,S=new P,m=new P;function f(v,T,W){c.fromBufferAttribute(a,v),u.fromBufferAttribute(a,T),h.fromBufferAttribute(a,W),d.fromBufferAttribute(r,v),p.fromBufferAttribute(r,T),g.fromBufferAttribute(r,W),u.sub(c),h.sub(c),p.sub(d),g.sub(d);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(S.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(C),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(C),o[v].add(S),o[T].add(S),o[W].add(S),l[v].add(m),l[T].add(m),l[W].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let v=0,T=y.length;v<T;++v){const W=y[v],C=W.start,O=W.count;for(let H=C,G=C+O;H<G;H+=3)f(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const b=new P,M=new P,w=new P,A=new P;function D(v){w.fromBufferAttribute(n,v),A.copy(w);const T=o[v];b.copy(T),b.sub(w.multiplyScalar(w.dot(T))).normalize(),M.crossVectors(A,T);const W=M.dot(l[v])<0?-1:1;s.setXYZW(v,b.x,b.y,b.z,W)}for(let v=0,T=y.length;v<T;++v){const W=y[v],C=W.start,O=W.count;for(let H=C,G=C+O;H<G;H+=3)D(e.getX(H+0)),D(e.getX(H+1)),D(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let a=this.getAttribute("normal");if(a===void 0)a=new Gt(new Float32Array(t.count*3),3),this.setAttribute("normal",a);else for(let d=0,p=a.count;d<p;d++)a.setXYZ(d,0,0,0);const n=new P,r=new P,s=new P,o=new P,l=new P,c=new P,u=new P,h=new P;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),S=e.getX(d+1),m=e.getX(d+2);n.fromBufferAttribute(t,g),r.fromBufferAttribute(t,S),s.fromBufferAttribute(t,m),u.subVectors(s,r),h.subVectors(n,r),u.cross(h),o.fromBufferAttribute(a,g),l.fromBufferAttribute(a,S),c.fromBufferAttribute(a,m),o.add(u),l.add(u),c.add(u),a.setXYZ(g,o.x,o.y,o.z),a.setXYZ(S,l.x,l.y,l.z),a.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)n.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),s.fromBufferAttribute(t,d+2),u.subVectors(s,r),h.subVectors(n,r),u.cross(h),a.setXYZ(d+0,u.x,u.y,u.z),a.setXYZ(d+1,u.x,u.y,u.z),a.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,a=e.count;t<a;t++)Tt.fromBufferAttribute(e,t),Tt.normalize(),e.setXYZ(t,Tt.x,Tt.y,Tt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let p=0,g=0;for(let S=0,m=l.length;S<m;S++){o.isInterleavedBufferAttribute?p=l[S]*o.data.stride+o.offset:p=l[S]*u;for(let f=0;f<u;f++)d[g++]=c[p++]}return new Gt(d,u,h)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ht,a=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=e(l,a);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],p=e(d,a);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const a=this.attributes;for(const l in a){const c=a[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(n[l]=u,r=!0)}r&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const a=e.index;a!==null&&this.setIndex(a.clone());const n=e.attributes;for(const c in n){const u=n[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,u=s.length;c<u;c++){const h=s[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Vh=0;class Cn extends fa{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vh++}),this.uuid=wn(),this.name="",this.type="Material",this.blending=ca,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ps,this.blendDst=Ls,this.blendEquation=ra,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new be(0,0,0),this.blendAlpha=0,this.depthFunc=Ga,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xa,this.stencilZFail=xa,this.stencilZPass=xa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const a=e[t];if(a===void 0){Ne(`Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){Ne(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(a):n&&n.isVector3&&a&&a.isVector3?n.copy(a):this[t]=a}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const a={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(a.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(a.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(e).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(e).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(e).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(e).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(e).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.shadowSide!==null&&(a.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),this.blending!==ca&&(a.blending=this.blending),this.side!==li&&(a.side=this.side),this.vertexColors===!0&&(a.vertexColors=!0),this.opacity<1&&(a.opacity=this.opacity),this.transparent===!0&&(a.transparent=!0),this.blendSrc!==Ps&&(a.blendSrc=this.blendSrc),this.blendDst!==Ls&&(a.blendDst=this.blendDst),this.blendEquation!==ra&&(a.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(a.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(a.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(a.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(a.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(a.blendAlpha=this.blendAlpha),this.depthFunc!==Ga&&(a.depthFunc=this.depthFunc),this.depthTest===!1&&(a.depthTest=this.depthTest),this.depthWrite===!1&&(a.depthWrite=this.depthWrite),this.colorWrite===!1&&(a.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(a.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==sl&&(a.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(a.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(a.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xa&&(a.stencilFail=this.stencilFail),this.stencilZFail!==xa&&(a.stencilZFail=this.stencilZFail),this.stencilZPass!==xa&&(a.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(a.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(a.rotation=this.rotation),this.polygonOffset===!0&&(a.polygonOffset=!0),this.polygonOffsetFactor!==0&&(a.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(a.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(a.linewidth=this.linewidth),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.dithering===!0&&(a.dithering=!0),this.alphaTest>0&&(a.alphaTest=this.alphaTest),this.alphaHash===!0&&(a.alphaHash=!0),this.alphaToCoverage===!0&&(a.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(a.premultipliedAlpha=!0),this.forceSinglePass===!0&&(a.forceSinglePass=!0),this.allowOverride===!1&&(a.allowOverride=!1),this.wireframe===!0&&(a.wireframe=!0),this.wireframeLinewidth>1&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(a.flatShading=!0),this.visible===!1&&(a.visible=!1),this.toneMapped===!1&&(a.toneMapped=!1),this.fog===!1&&(a.fog=!1),Object.keys(this.userData).length>0&&(a.userData=this.userData);function n(r){const s=[];for(const o in r){const l=r[o];delete l.metadata,s.push(l)}return s}if(t){const r=n(e.textures),s=n(e.images);r.length>0&&(a.textures=r),s.length>0&&(a.images=s)}return a}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let a=null;if(t!==null){const n=t.length;a=new Array(n);for(let r=0;r!==n;++r)a[r]=t[r].clone()}return this.clippingPlanes=a,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const wi=new P,ss=new P,kn=new P,ki=new P,os=new P,Vn=new P,ls=new P;let Ir=class{constructor(i=new P,e=new P(0,0,-1)){this.origin=i,this.direction=e}set(i,e){return this.origin.copy(i),this.direction.copy(e),this}copy(i){return this.origin.copy(i.origin),this.direction.copy(i.direction),this}at(i,e){return e.copy(this.origin).addScaledVector(this.direction,i)}lookAt(i){return this.direction.copy(i).sub(this.origin).normalize(),this}recast(i){return this.origin.copy(this.at(i,wi)),this}closestPointToPoint(i,e){e.subVectors(i,this.origin);const t=e.dot(this.direction);return t<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,t)}distanceToPoint(i){return Math.sqrt(this.distanceSqToPoint(i))}distanceSqToPoint(i){const e=wi.subVectors(i,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(i):(wi.copy(this.origin).addScaledVector(this.direction,e),wi.distanceToSquared(i))}distanceSqToSegment(i,e,t,a){ss.copy(i).add(e).multiplyScalar(.5),kn.copy(e).sub(i).normalize(),ki.copy(this.origin).sub(ss);const n=i.distanceTo(e)*.5,r=-this.direction.dot(kn),s=ki.dot(this.direction),o=-ki.dot(kn),l=ki.lengthSq(),c=Math.abs(1-r*r);let u,h,d,p;if(c>0)if(u=r*o-s,h=r*s-o,p=n*c,u>=0)if(h>=-p)if(h<=p){const g=1/c;u*=g,h*=g,d=u*(u+r*h+2*s)+h*(r*u+h+2*o)+l}else h=n,u=Math.max(0,-(r*h+s)),d=-u*u+h*(h+2*o)+l;else h=-n,u=Math.max(0,-(r*h+s)),d=-u*u+h*(h+2*o)+l;else h<=-p?(u=Math.max(0,-(-r*n+s)),h=u>0?-n:Math.min(Math.max(-n,-o),n),d=-u*u+h*(h+2*o)+l):h<=p?(u=0,h=Math.min(Math.max(-n,-o),n),d=h*(h+2*o)+l):(u=Math.max(0,-(r*n+s)),h=u>0?n:Math.min(Math.max(-n,-o),n),d=-u*u+h*(h+2*o)+l);else h=r>0?-n:n,u=Math.max(0,-(r*h+s)),d=-u*u+h*(h+2*o)+l;return t&&t.copy(this.origin).addScaledVector(this.direction,u),a&&a.copy(ss).addScaledVector(kn,h),d}intersectSphere(i,e){wi.subVectors(i.center,this.origin);const t=wi.dot(this.direction),a=wi.dot(wi)-t*t,n=i.radius*i.radius;if(a>n)return null;const r=Math.sqrt(n-a),s=t-r,o=t+r;return o<0?null:s<0?this.at(o,e):this.at(s,e)}intersectsSphere(i){return i.radius<0?!1:this.distanceSqToPoint(i.center)<=i.radius*i.radius}distanceToPlane(i){const e=i.normal.dot(this.direction);if(e===0)return i.distanceToPoint(this.origin)===0?0:null;const t=-(this.origin.dot(i.normal)+i.constant)/e;return t>=0?t:null}intersectPlane(i,e){const t=this.distanceToPlane(i);return t===null?null:this.at(t,e)}intersectsPlane(i){const e=i.distanceToPoint(this.origin);return e===0||i.normal.dot(this.direction)*e<0}intersectBox(i,e){let t,a,n,r,s,o;const l=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,h=this.origin;return l>=0?(t=(i.min.x-h.x)*l,a=(i.max.x-h.x)*l):(t=(i.max.x-h.x)*l,a=(i.min.x-h.x)*l),c>=0?(n=(i.min.y-h.y)*c,r=(i.max.y-h.y)*c):(n=(i.max.y-h.y)*c,r=(i.min.y-h.y)*c),t>r||n>a||((n>t||isNaN(t))&&(t=n),(r<a||isNaN(a))&&(a=r),u>=0?(s=(i.min.z-h.z)*u,o=(i.max.z-h.z)*u):(s=(i.max.z-h.z)*u,o=(i.min.z-h.z)*u),t>o||s>a)||((s>t||t!==t)&&(t=s),(o<a||a!==a)&&(a=o),a<0)?null:this.at(t>=0?t:a,e)}intersectsBox(i){return this.intersectBox(i,wi)!==null}intersectTriangle(i,e,t,a,n){os.subVectors(e,i),Vn.subVectors(t,i),ls.crossVectors(os,Vn);let r=this.direction.dot(ls),s;if(r>0){if(a)return null;s=1}else if(r<0)s=-1,r=-r;else return null;ki.subVectors(this.origin,i);const o=s*this.direction.dot(Vn.crossVectors(ki,Vn));if(o<0)return null;const l=s*this.direction.dot(os.cross(ki));if(l<0||o+l>r)return null;const c=-s*ki.dot(ls);return c<0?null:this.at(c/r,n)}applyMatrix4(i){return this.origin.applyMatrix4(i),this.direction.transformDirection(i),this}equals(i){return i.origin.equals(this.origin)&&i.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ri=class extends Cn{constructor(i){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ha,this.combine=Cc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(i)}copy(i){return super.copy(i),this.color.copy(i.color),this.map=i.map,this.lightMap=i.lightMap,this.lightMapIntensity=i.lightMapIntensity,this.aoMap=i.aoMap,this.aoMapIntensity=i.aoMapIntensity,this.specularMap=i.specularMap,this.alphaMap=i.alphaMap,this.envMap=i.envMap,this.envMapRotation.copy(i.envMapRotation),this.combine=i.combine,this.reflectivity=i.reflectivity,this.refractionRatio=i.refractionRatio,this.wireframe=i.wireframe,this.wireframeLinewidth=i.wireframeLinewidth,this.wireframeLinecap=i.wireframeLinecap,this.wireframeLinejoin=i.wireframeLinejoin,this.fog=i.fog,this}};const Ml=new st,ta=new Ir,Gn=new Ka,El=new P,Wn=new P,Xn=new P,qn=new P,cs=new P,Yn=new P,bl=new P,jn=new P;class it extends Qt{constructor(e=new ht,t=new ri){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const a=e[t[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let n=0,r=a.length;n<r;n++){const s=a[n].name||String(n);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=n}}}}getVertexPosition(e,t){const a=this.geometry,n=a.attributes.position,r=a.morphAttributes.position,s=a.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(r&&o){Yn.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],h=r[l];u!==0&&(cs.fromBufferAttribute(h,e),s?Yn.addScaledVector(cs,u):Yn.addScaledVector(cs.sub(t),u))}t.add(Yn)}return t}raycast(e,t){const a=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),Gn.copy(a.boundingSphere),Gn.applyMatrix4(r),ta.copy(e.ray).recast(e.near),!(Gn.containsPoint(ta.origin)===!1&&(ta.intersectSphere(Gn,El)===null||ta.origin.distanceToSquared(El)>(e.far-e.near)**2))&&(Ml.copy(r).invert(),ta.copy(e.ray).applyMatrix4(Ml),!(a.boundingBox!==null&&ta.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(e,t,ta)))}_computeIntersections(e,t,a){let n;const r=this.geometry,s=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,S=d.length;g<S;g++){const m=d[g],f=s[m.materialIndex],y=Math.max(m.start,p.start),b=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let M=y,w=b;M<w;M+=3){const A=o.getX(M),D=o.getX(M+1),v=o.getX(M+2);n=$n(this,f,e,a,c,u,h,A,D,v),n&&(n.faceIndex=Math.floor(M/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,p.start),S=Math.min(o.count,p.start+p.count);for(let m=g,f=S;m<f;m+=3){const y=o.getX(m),b=o.getX(m+1),M=o.getX(m+2);n=$n(this,s,e,a,c,u,h,y,b,M),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(s))for(let g=0,S=d.length;g<S;g++){const m=d[g],f=s[m.materialIndex],y=Math.max(m.start,p.start),b=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=y,w=b;M<w;M+=3){const A=M,D=M+1,v=M+2;n=$n(this,f,e,a,c,u,h,A,D,v),n&&(n.faceIndex=Math.floor(M/3),n.face.materialIndex=m.materialIndex,t.push(n))}}else{const g=Math.max(0,p.start),S=Math.min(l.count,p.start+p.count);for(let m=g,f=S;m<f;m+=3){const y=m,b=m+1,M=m+2;n=$n(this,s,e,a,c,u,h,y,b,M),n&&(n.faceIndex=Math.floor(m/3),t.push(n))}}}}function Gh(i,e,t,a,n,r,s,o){let l;if(e.side===Nt?l=a.intersectTriangle(s,r,n,!0,o):l=a.intersectTriangle(n,r,s,e.side===li,o),l===null)return null;jn.copy(o),jn.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(jn);return c<t.near||c>t.far?null:{distance:c,point:jn.clone(),object:i}}function $n(i,e,t,a,n,r,s,o,l,c){i.getVertexPosition(o,Wn),i.getVertexPosition(l,Xn),i.getVertexPosition(c,qn);const u=Gh(i,e,t,a,Wn,Xn,qn,bl);if(u){const h=new P;an.getBarycoord(bl,Wn,Xn,qn,h),n&&(u.uv=an.getInterpolatedAttribute(n,o,l,c,h,new De)),r&&(u.uv1=an.getInterpolatedAttribute(r,o,l,c,h,new De)),s&&(u.normal=an.getInterpolatedAttribute(s,o,l,c,h,new P),u.normal.dot(a.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new P,materialIndex:0};an.getNormal(Wn,Xn,qn,d.normal),u.face=d,u.barycoord=h}return u}let Zc=class extends $t{constructor(i=null,e=1,t=1,a,n,r,s,o,l=Ct,c=Ct,u,h){super(null,r,s,o,l,c,a,n,u,h),this.isDataTexture=!0,this.image={data:i,width:e,height:t},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},It=class extends Gt{constructor(i,e,t,a=1){super(i,e,t),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(i){return super.copy(i),this.meshPerAttribute=i.meshPerAttribute,this}toJSON(){const i=super.toJSON();return i.meshPerAttribute=this.meshPerAttribute,i.isInstancedBufferAttribute=!0,i}};const Pa=new st,Tl=new st,Kn=[],Al=new ma,Wh=new st,on=new it,ln=new Ka;class Xh extends it{constructor(e,t,a){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new It(new Float32Array(a*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=a,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<a;n++)this.setMatrixAt(n,Wh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ma),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let a=0;a<t;a++)this.getMatrixAt(a,Pa),Al.copy(e.boundingBox).applyMatrix4(Pa),this.boundingBox.union(Al)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ka),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let a=0;a<t;a++)this.getMatrixAt(a,Pa),ln.copy(e.boundingSphere).applyMatrix4(Pa),this.boundingSphere.union(ln)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const a=t.morphTargetInfluences,n=this.morphTexture.source.data.data,r=a.length+1,s=e*r+1;for(let o=0;o<a.length;o++)a[o]=n[s+o]}raycast(e,t){const a=this.matrixWorld,n=this.count;if(on.geometry=this.geometry,on.material=this.material,on.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ln.copy(this.boundingSphere),ln.applyMatrix4(a),e.ray.intersectsSphere(ln)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,Pa),Tl.multiplyMatrices(a,Pa),on.matrixWorld=Tl,on.raycast(e,Kn);for(let s=0,o=Kn.length;s<o;s++){const l=Kn[s];l.instanceId=r,l.object=this,t.push(l)}Kn.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new It(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const a=t.morphTargetInfluences,n=a.length+1;this.morphTexture===null&&(this.morphTexture=new Zc(new Float32Array(n*this.count),n,this.count,Uo,si));const r=this.morphTexture.source.data.data;let s=0;for(let c=0;c<a.length;c++)s+=a[c];const o=this.geometry.morphTargetsRelative?1:1-s,l=n*e;r[l]=o,r.set(a,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const us=new P,qh=new P,Yh=new He;class Gi{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,a,n){return this.normal.set(e,t,a),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,a){const n=us.subVectors(a,t).cross(qh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const a=e.delta(us),n=this.normal.dot(a);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/n;return r<0||r>1?null:t.copy(e.start).addScaledVector(a,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),a=this.distanceToPoint(e.end);return t<0&&a>0||a<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const a=t||Yh.getNormalMatrix(e),n=this.coplanarPoint(us).applyMatrix4(e),r=this.normal.applyMatrix3(a).normalize();return this.constant=-n.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ia=new Ka,jh=new De(.5,.5),Zn=new P;let Jc=class{constructor(i=new Gi,e=new Gi,t=new Gi,a=new Gi,n=new Gi,r=new Gi){this.planes=[i,e,t,a,n,r]}set(i,e,t,a,n,r){const s=this.planes;return s[0].copy(i),s[1].copy(e),s[2].copy(t),s[3].copy(a),s[4].copy(n),s[5].copy(r),this}copy(i){const e=this.planes;for(let t=0;t<6;t++)e[t].copy(i.planes[t]);return this}setFromProjectionMatrix(i,e=fi,t=!1){const a=this.planes,n=i.elements,r=n[0],s=n[1],o=n[2],l=n[3],c=n[4],u=n[5],h=n[6],d=n[7],p=n[8],g=n[9],S=n[10],m=n[11],f=n[12],y=n[13],b=n[14],M=n[15];if(a[0].setComponents(l-r,d-c,m-p,M-f).normalize(),a[1].setComponents(l+r,d+c,m+p,M+f).normalize(),a[2].setComponents(l+s,d+u,m+g,M+y).normalize(),a[3].setComponents(l-s,d-u,m-g,M-y).normalize(),t)a[4].setComponents(o,h,S,b).normalize(),a[5].setComponents(l-o,d-h,m-S,M-b).normalize();else if(a[4].setComponents(l-o,d-h,m-S,M-b).normalize(),e===fi)a[5].setComponents(l+o,d+h,m+S,M+b).normalize();else if(e===Tr)a[5].setComponents(o,h,S,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(i){if(i.boundingSphere!==void 0)i.boundingSphere===null&&i.computeBoundingSphere(),ia.copy(i.boundingSphere).applyMatrix4(i.matrixWorld);else{const e=i.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ia.copy(e.boundingSphere).applyMatrix4(i.matrixWorld)}return this.intersectsSphere(ia)}intersectsSprite(i){ia.center.set(0,0,0);const e=jh.distanceTo(i.center);return ia.radius=.7071067811865476+e,ia.applyMatrix4(i.matrixWorld),this.intersectsSphere(ia)}intersectsSphere(i){const e=this.planes,t=i.center,a=-i.radius;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<a)return!1;return!0}intersectsBox(i){const e=this.planes;for(let t=0;t<6;t++){const a=e[t];if(Zn.x=a.normal.x>0?i.max.x:i.min.x,Zn.y=a.normal.y>0?i.max.y:i.min.y,Zn.z=a.normal.z>0?i.max.z:i.min.z,a.distanceToPoint(Zn)<0)return!1}return!0}containsPoint(i){const e=this.planes;for(let t=0;t<6;t++)if(e[t].distanceToPoint(i)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};class Jt extends Cn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const wr=new P,Cr=new P,wl=new st,cn=new Ir,Jn=new Ka,hs=new P,Cl=new P;let Ri=class extends Qt{constructor(i=new ht,e=new Jt){super(),this.isLine=!0,this.type="Line",this.geometry=i,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(i,e){return super.copy(i,e),this.material=Array.isArray(i.material)?i.material.slice():i.material,this.geometry=i.geometry,this}computeLineDistances(){const i=this.geometry;if(i.index===null){const e=i.attributes.position,t=[0];for(let a=1,n=e.count;a<n;a++)wr.fromBufferAttribute(e,a-1),Cr.fromBufferAttribute(e,a),t[a]=t[a-1],t[a]+=wr.distanceTo(Cr);i.setAttribute("lineDistance",new Ut(t,1))}else Ne("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(i,e){const t=this.geometry,a=this.matrixWorld,n=i.params.Line.threshold,r=t.drawRange;if(t.boundingSphere===null&&t.computeBoundingSphere(),Jn.copy(t.boundingSphere),Jn.applyMatrix4(a),Jn.radius+=n,i.ray.intersectsSphere(Jn)===!1)return;wl.copy(a).invert(),cn.copy(i.ray).applyMatrix4(wl);const s=n/((this.scale.x+this.scale.y+this.scale.z)/3),o=s*s,l=this.isLineSegments?2:1,c=t.index,u=t.attributes.position;if(c!==null){const h=Math.max(0,r.start),d=Math.min(c.count,r.start+r.count);for(let p=h,g=d-1;p<g;p+=l){const S=c.getX(p),m=c.getX(p+1),f=Qn(this,i,cn,o,S,m,p);f&&e.push(f)}if(this.isLineLoop){const p=c.getX(d-1),g=c.getX(h),S=Qn(this,i,cn,o,p,g,d-1);S&&e.push(S)}}else{const h=Math.max(0,r.start),d=Math.min(u.count,r.start+r.count);for(let p=h,g=d-1;p<g;p+=l){const S=Qn(this,i,cn,o,p,p+1,p);S&&e.push(S)}if(this.isLineLoop){const p=Qn(this,i,cn,o,d-1,h,d-1);p&&e.push(p)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,e=Object.keys(i);if(e.length>0){const t=i[e[0]];if(t!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,n=t.length;a<n;a++){const r=t[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[r]=a}}}}};function Qn(i,e,t,a,n,r,s){const o=i.geometry.attributes.position;if(wr.fromBufferAttribute(o,n),Cr.fromBufferAttribute(o,r),t.distanceSqToSegment(wr,Cr,hs,Cl)>a)return;hs.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(hs);if(!(l<e.near||l>e.far))return{distance:l,point:Cl.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Rl=new P,Pl=new P;class $h extends Ri{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,a=[];for(let n=0,r=t.count;n<r;n+=2)Rl.fromBufferAttribute(t,n),Pl.fromBufferAttribute(t,n+1),a[n]=n===0?0:a[n-1],a[n+1]=a[n]+Rl.distanceTo(Pl);e.setAttribute("lineDistance",new Ut(a,1))}else Ne("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qc extends Ri{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}let eu=class extends $t{constructor(i=[],e=ua,t,a,n,r,s,o,l,c){super(i,e,t,a,n,r,s,o,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(i){this.image=i}};class So extends $t{constructor(e,t,a,n,r,s,o,l,c){super(e,t,a,n,r,s,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Mn extends $t{constructor(e,t,a=xi,n,r,s,o=Ct,l=Ct,c,u=Ni,h=1){if(u!==Ni&&u!==la)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,n,r,s,o,l,u,a,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ko(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Kh extends Mn{constructor(e,t=xi,a=ua,n,r,s=Ct,o=Ct,l,c=Ni){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,a,n,r,s,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class tu extends $t{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Rn extends ht{constructor(e=1,t=1,a=1,n=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:a,widthSegments:n,heightSegments:r,depthSegments:s};const o=this;n=Math.floor(n),r=Math.floor(r),s=Math.floor(s);const l=[],c=[],u=[],h=[];let d=0,p=0;g("z","y","x",-1,-1,a,t,e,s,r,0),g("z","y","x",1,-1,a,t,-e,s,r,1),g("x","z","y",1,1,e,a,t,n,s,2),g("x","z","y",1,-1,e,a,-t,n,s,3),g("x","y","z",1,-1,e,t,a,n,r,4),g("x","y","z",-1,-1,e,t,-a,n,r,5),this.setIndex(l),this.setAttribute("position",new Ut(c,3)),this.setAttribute("normal",new Ut(u,3)),this.setAttribute("uv",new Ut(h,2));function g(S,m,f,y,b,M,w,A,D,v,T){const W=M/D,C=w/v,O=M/2,H=w/2,G=A/2,k=D+1,z=v+1;let F=0,Q=0;const K=new P;for(let le=0;le<z;le++){const de=le*C-H;for(let xe=0;xe<k;xe++){const ne=xe*W-O;K[S]=ne*y,K[m]=de*b,K[f]=G,c.push(K.x,K.y,K.z),K[S]=0,K[m]=0,K[f]=A>0?1:-1,u.push(K.x,K.y,K.z),h.push(xe/D),h.push(1-le/v),F+=1}}for(let le=0;le<v;le++)for(let de=0;de<D;de++){const xe=d+de+k*le,ne=d+de+k*(le+1),Fe=d+(de+1)+k*(le+1),Ue=d+(de+1)+k*le;l.push(xe,ne,Ue),l.push(ne,Fe,Ue),Q+=6}o.addGroup(p,Q,T),p+=Q,d+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Zh{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ne("Curve: .getPoint() not implemented.")}getPointAt(e,t){const a=this.getUtoTmapping(e);return this.getPoint(a,t)}getPoints(e=5){const t=[];for(let a=0;a<=e;a++)t.push(this.getPoint(a/e));return t}getSpacedPoints(e=5){const t=[];for(let a=0;a<=e;a++)t.push(this.getPointAt(a/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let a,n=this.getPoint(0),r=0;t.push(0);for(let s=1;s<=e;s++)a=this.getPoint(s/e),r+=a.distanceTo(n),t.push(r),n=a;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const a=this.getLengths();let n=0;const r=a.length;let s;t?s=t:s=e*a[r-1];let o=0,l=r-1,c;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),c=a[n]-s,c<0)o=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,a[n]===s)return n/(r-1);const u=a[n],h=a[n+1]-u,d=(s-u)/h;return(n+d)/(r-1)}getTangent(e,t){let a=e-1e-4,n=e+1e-4;a<0&&(a=0),n>1&&(n=1);const r=this.getPoint(a),s=this.getPoint(n),o=t||(r.isVector2?new De:new P);return o.copy(s).sub(r).normalize(),o}getTangentAt(e,t){const a=this.getUtoTmapping(e);return this.getTangent(a,t)}computeFrenetFrames(e,t=!1){const a=new P,n=[],r=[],s=[],o=new P,l=new st;for(let p=0;p<=e;p++){const g=p/e;n[p]=this.getTangentAt(g,new P)}r[0]=new P,s[0]=new P;let c=Number.MAX_VALUE;const u=Math.abs(n[0].x),h=Math.abs(n[0].y),d=Math.abs(n[0].z);u<=c&&(c=u,a.set(1,0,0)),h<=c&&(c=h,a.set(0,1,0)),d<=c&&a.set(0,0,1),o.crossVectors(n[0],a).normalize(),r[0].crossVectors(n[0],o),s[0].crossVectors(n[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),s[p]=s[p-1].clone(),o.crossVectors(n[p-1],n[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(ke(n[p-1].dot(n[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}s[p].crossVectors(n[p],r[p])}if(t===!0){let p=Math.acos(ke(r[0].dot(r[e]),-1,1));p/=e,n[0].dot(o.crossVectors(r[0],r[e]))>0&&(p=-p);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(n[g],p*g)),s[g].crossVectors(n[g],r[g])}return{tangents:n,normals:r,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function Jh(i,e){const t=1-i;return t*t*e}function Qh(i,e){return 2*(1-i)*i*e}function ed(i,e){return i*i*e}function ds(i,e,t,a){return Jh(i,e)+Qh(i,t)+ed(i,a)}class td extends Zh{constructor(e=new P,t=new P,a=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=a}getPoint(e,t=new P){const a=t,n=this.v0,r=this.v1,s=this.v2;return a.set(ds(e,n.x,r.x,s.x),ds(e,n.y,r.y,s.y),ds(e,n.z,r.z,s.z)),a}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ui extends ht{constructor(e=1,t=1,a=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:a,heightSegments:n};const r=e/2,s=t/2,o=Math.floor(a),l=Math.floor(n),c=o+1,u=l+1,h=e/o,d=t/l,p=[],g=[],S=[],m=[];for(let f=0;f<u;f++){const y=f*d-s;for(let b=0;b<c;b++){const M=b*h-r;g.push(M,-y,0),S.push(0,0,1),m.push(b/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let y=0;y<o;y++){const b=y+c*f,M=y+c*(f+1),w=y+1+c*(f+1),A=y+1+c*f;p.push(b,M,A),p.push(M,w,A)}this.setIndex(p),this.setAttribute("position",new Ut(g,3)),this.setAttribute("normal",new Ut(S,3)),this.setAttribute("uv",new Ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ui(e.width,e.height,e.widthSegments,e.heightSegments)}}class vi extends ht{constructor(e=1,t=32,a=16,n=0,r=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:a,phiStart:n,phiLength:r,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),a=Math.max(2,Math.floor(a));const l=Math.min(s+o,Math.PI);let c=0;const u=[],h=new P,d=new P,p=[],g=[],S=[],m=[];for(let f=0;f<=a;f++){const y=[],b=f/a;let M=0;f===0&&s===0?M=.5/t:f===a&&l===Math.PI&&(M=-.5/t);for(let w=0;w<=t;w++){const A=w/t;h.x=-e*Math.cos(n+A*r)*Math.sin(s+b*o),h.y=e*Math.cos(s+b*o),h.z=e*Math.sin(n+A*r)*Math.sin(s+b*o),g.push(h.x,h.y,h.z),d.copy(h).normalize(),S.push(d.x,d.y,d.z),m.push(A+M,1-b),y.push(c++)}u.push(y)}for(let f=0;f<a;f++)for(let y=0;y<t;y++){const b=u[f][y+1],M=u[f][y],w=u[f+1][y],A=u[f+1][y+1];(f!==0||s>0)&&p.push(b,M,A),(f!==a-1||l<Math.PI)&&p.push(M,w,A)}this.setIndex(p),this.setAttribute("position",new Ut(g,3)),this.setAttribute("normal",new Ut(S,3)),this.setAttribute("uv",new Ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Ya(i){const e={};for(const t in i){e[t]={};for(const a in i[t]){const n=i[t][a];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][a]=null):e[t][a]=n.clone():Array.isArray(n)?e[t][a]=n.slice():e[t][a]=n}}return e}function Ot(i){const e={};for(let t=0;t<i.length;t++){const a=Ya(i[t]);for(const n in a)e[n]=a[n]}return e}function id(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function iu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const Rr={clone:Ya,merge:Ot};var ad=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;let ct=class extends Cn{constructor(i){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ad,this.fragmentShader=nd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,i!==void 0&&this.setValues(i)}copy(i){return super.copy(i),this.fragmentShader=i.fragmentShader,this.vertexShader=i.vertexShader,this.uniforms=Ya(i.uniforms),this.uniformsGroups=id(i.uniformsGroups),this.defines=Object.assign({},i.defines),this.wireframe=i.wireframe,this.wireframeLinewidth=i.wireframeLinewidth,this.fog=i.fog,this.lights=i.lights,this.clipping=i.clipping,this.extensions=Object.assign({},i.extensions),this.glslVersion=i.glslVersion,this.defaultAttributeValues=Object.assign({},i.defaultAttributeValues),this.index0AttributeName=i.index0AttributeName,this.uniformsNeedUpdate=i.uniformsNeedUpdate,this}toJSON(i){const e=super.toJSON(i);e.glslVersion=this.glslVersion,e.uniforms={};for(const a in this.uniforms){const n=this.uniforms[a].value;n&&n.isTexture?e.uniforms[a]={type:"t",value:n.toJSON(i).uuid}:n&&n.isColor?e.uniforms[a]={type:"c",value:n.getHex()}:n&&n.isVector2?e.uniforms[a]={type:"v2",value:n.toArray()}:n&&n.isVector3?e.uniforms[a]={type:"v3",value:n.toArray()}:n&&n.isVector4?e.uniforms[a]={type:"v4",value:n.toArray()}:n&&n.isMatrix3?e.uniforms[a]={type:"m3",value:n.toArray()}:n&&n.isMatrix4?e.uniforms[a]={type:"m4",value:n.toArray()}:e.uniforms[a]={value:n}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const t={};for(const a in this.extensions)this.extensions[a]===!0&&(t[a]=!0);return Object.keys(t).length>0&&(e.extensions=t),e}};class rd extends ct{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class sd extends Cn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class od extends Cn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ps={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Ll(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Ll(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Ll(i){try{const e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class ld{constructor(e,t,a){const n=this;let r=!1,s=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=a,this._abortController=null,this.itemStart=function(u){o++,r===!1&&n.onStart!==void 0&&n.onStart(u,s,o),r=!0},this.itemEnd=function(u){s++,n.onProgress!==void 0&&n.onProgress(u,s,o),s===o&&(r=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(u){n.onError!==void 0&&n.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){const h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){const p=c[h],g=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const cd=new ld;let Wo=class{constructor(i){this.manager=i!==void 0?i:cd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(i,e){const t=this;return new Promise(function(a,n){t.load(i,a,e,n)})}parse(){}setCrossOrigin(i){return this.crossOrigin=i,this}setWithCredentials(i){return this.withCredentials=i,this}setPath(i){return this.path=i,this}setResourcePath(i){return this.resourcePath=i,this}setRequestHeader(i){return this.requestHeader=i,this}abort(){return this}};Wo.DEFAULT_MATERIAL_NAME="__DEFAULT";const La=new WeakMap;class ud extends Wo{constructor(e){super(e)}load(e,t,a,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,s=ps.get(`image:${e}`);if(s!==void 0){if(s.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(s),r.manager.itemEnd(e)},0);else{let h=La.get(s);h===void 0&&(h=[],La.set(s,h)),h.push({onLoad:t,onError:n})}return s}const o=yn("img");function l(){u(),t&&t(this);const h=La.get(this)||[];for(let d=0;d<h.length;d++){const p=h[d];p.onLoad&&p.onLoad(this)}La.delete(this),r.manager.itemEnd(e)}function c(h){u(),n&&n(h),ps.remove(`image:${e}`);const d=La.get(this)||[];for(let p=0;p<d.length;p++){const g=d[p];g.onError&&g.onError(h)}La.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ps.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}}class hd extends Wo{constructor(e){super(e)}load(e,t,a,n){const r=new $t,s=new ud(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},a,n),r}}const er=new P,tr=new ji,ui=new P;class au extends Qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=fi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(er,tr,ui),ui.x===1&&ui.y===1&&ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(er,tr,ui.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(er,tr,ui),ui.x===1&&ui.y===1&&ui.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(er,tr,ui.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Vi=new P,Dl=new De,Il=new De;class Yt extends au{constructor(e=50,t=1,a=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=a,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(dr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xo*2*Math.atan(Math.tan(dr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,a){Vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vi.x,Vi.y).multiplyScalar(-e/Vi.z),Vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(Vi.x,Vi.y).multiplyScalar(-e/Vi.z)}getViewSize(e,t){return this.getViewBounds(e,Dl,Il),t.subVectors(Il,Dl)}setViewOffset(e,t,a,n,r,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=a,this.view.offsetY=n,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(dr*.5*this.fov)/this.zoom,a=2*t,n=this.aspect*a,r=-.5*n;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;r+=s.offsetX*n/l,t-=s.offsetY*a/c,n*=s.width/l,a*=s.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,t,t-a,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Nr extends au{constructor(e=-1,t=1,a=1,n=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=a,this.bottom=n,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,a,n,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=a,this.view.offsetY=n,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=a-e,s=a+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,s,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class dd extends ht{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Da=-90,Ia=1;class pd extends Qt{constructor(e,t,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Yt(Da,Ia,e,t);n.layers=this.layers,this.add(n);const r=new Yt(Da,Ia,e,t);r.layers=this.layers,this.add(r);const s=new Yt(Da,Ia,e,t);s.layers=this.layers,this.add(s);const o=new Yt(Da,Ia,e,t);o.layers=this.layers,this.add(o);const l=new Yt(Da,Ia,e,t);l.layers=this.layers,this.add(l);const c=new Yt(Da,Ia,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[a,n,r,s,o,l]=t;for(const c of t)this.remove(c);if(e===fi)a.up.set(0,1,0),a.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Tr)a.up.set(0,-1,0),a.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,s,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const S=a.texture.generateMipmaps;a.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(a,0,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(a,1,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(a,2,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(a,3,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(a,4,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),a.texture.generateMipmaps=S,e.setRenderTarget(a,5,n),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,p),e.xr.enabled=g,a.texture.needsPMREMUpdate=!0}}class fd extends Yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class md{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=gd.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function gd(){this._document.hidden===!1&&this.reset()}const Nl=new st;class _d{constructor(e,t,a=0,n=1/0){this.ray=new Ir(e,t),this.near=a,this.far=n,this.camera=null,this.layers=new Vo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Xe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Nl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Nl),this}intersectObject(e,t=!0,a=[]){return yo(e,this,a,t),a.sort(Ul),a}intersectObjects(e,t=!0,a=[]){for(let n=0,r=e.length;n<r;n++)yo(e[n],this,a,t);return a.sort(Ul),a}}function Ul(i,e){return i.distance-e.distance}function yo(i,e,t,a){let n=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(n=!1),n===!0&&a===!0){const r=i.children;for(let s=0,o=r.length;s<o;s++)yo(r[s],e,t,!0)}}class Ol{constructor(e=1,t=0,a=0){this.radius=e,this.phi=t,this.theta=a}set(e,t,a){return this.radius=e,this.phi=t,this.theta=a,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,a){return this.radius=Math.sqrt(e*e+t*t+a*a),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,a),this.phi=Math.acos(ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class vd extends fa{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ne("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Fl(i,e,t,a){const n=xd(a);switch(t){case kc:return i*e;case Uo:return i*e/n.components*n.byteLength;case Oo:return i*e/n.components*n.byteLength;case Xa:return i*e*2/n.components*n.byteLength;case Fo:return i*e*2/n.components*n.byteLength;case Vc:return i*e*3/n.components*n.byteLength;case oi:return i*e*4/n.components*n.byteLength;case Bo:return i*e*4/n.components*n.byteLength;case lr:case cr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ur:case hr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ks:case Gs:return Math.max(i,16)*Math.max(e,8)/4;case Hs:case Vs:return Math.max(i,8)*Math.max(e,8)/2;case Ws:case Xs:case Ys:case js:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case qs:case $s:case Ks:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Zs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Js:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Qs:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case eo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case to:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case io:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ao:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case no:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ro:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case so:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case oo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case lo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case co:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case uo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ho:case po:case fo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case mo:case go:return Math.ceil(i/4)*Math.ceil(e/4)*8;case _o:case vo:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function xd(i){switch(i){case Zt:case Fc:return{byteLength:1,components:1};case xn:case Bc:case jt:return{byteLength:2,components:1};case Io:case No:return{byteLength:2,components:4};case xi:case Do:case si:return{byteLength:4,components:1};case zc:case Hc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Lo}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Lo);/**
* @license
* Copyright 2010-2026 Three.js Authors
* SPDX-License-Identifier: MIT
*/function nu(){let i=null,e=!1,t=null,a=null;function n(r,s){t(r,s),a=i.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(a=i.requestAnimationFrame(n),e=!0)},stop:function(){i.cancelAnimationFrame(a),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Sd(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function a(o,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<h.length;p++){const g=h[d],S=h[p];S.start<=g.start+g.count+1?g.count=Math.max(g.count,S.start+S.count-g.start):(++d,h[d]=S)}h.length=d+1;for(let p=0,g=h.length;p<g;p++){const S=h[p];i.bufferSubData(c,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(c.buffer,o,l),c.version=o.version}}return{get:n,remove:r,update:s}}var yd=`#ifdef USE_ALPHAHASH
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
#endif`,Ed=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,bd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Td=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ad=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wd=`#ifdef USE_AOMAP
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
} // validated`,Nd=`#ifdef USE_IRIDESCENCE
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
#endif`,Ud=`#ifdef USE_BUMPMAP
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
#endif`,Vd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Gd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,qd=`vec3 transformedNormal = objectNormal;
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
#endif`,jd=`#ifdef USE_DISPLACEMENTMAP
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
#endif`,ip=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ap=`#ifdef USE_ENVMAP
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
#endif`,rp=`#ifdef USE_FOG
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
#endif`,xp=`uniform sampler2D dfgLUT;
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
}`,Sp=`
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
#endif`,yp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ep=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ap=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wp=`#ifdef USE_MAP
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
#endif`,Np=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Up=`#ifdef USE_MORPHNORMALS
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
#endif`,Vp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gp=`#ifdef USE_NORMALMAP
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
#endif`,qp=`#ifdef USE_CLEARCOATMAP
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
#endif`,jp=`#ifdef OPAQUE
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
#endif`,af=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yf=`varying vec2 vUv;
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
}`,Ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Af=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wf=`#include <common>
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
}`,Nf=`uniform vec3 diffuse;
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
}`,Uf=`#include <common>
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
}`,Vf=`#define NORMAL
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
}`,Gf=`#define PHONG
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
}`,qf=`#define STANDARD
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
}`,jf=`#define TOON
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
}`,Be={alphahash_fragment:yd,alphahash_pars_fragment:Md,alphamap_fragment:Ed,alphamap_pars_fragment:bd,alphatest_fragment:Td,alphatest_pars_fragment:Ad,aomap_fragment:wd,aomap_pars_fragment:Cd,batching_pars_vertex:Rd,batching_vertex:Pd,begin_vertex:Ld,beginnormal_vertex:Dd,bsdfs:Id,iridescence_fragment:Nd,bumpmap_pars_fragment:Ud,clipping_planes_fragment:Od,clipping_planes_pars_fragment:Fd,clipping_planes_pars_vertex:Bd,clipping_planes_vertex:zd,color_fragment:Hd,color_pars_fragment:kd,color_pars_vertex:Vd,color_vertex:Gd,common:Wd,cube_uv_reflection_fragment:Xd,defaultnormal_vertex:qd,displacementmap_pars_vertex:Yd,displacementmap_vertex:jd,emissivemap_fragment:$d,emissivemap_pars_fragment:Kd,colorspace_fragment:Zd,colorspace_pars_fragment:Jd,envmap_fragment:Qd,envmap_common_pars_fragment:ep,envmap_pars_fragment:tp,envmap_pars_vertex:ip,envmap_physical_pars_fragment:pp,envmap_vertex:ap,fog_vertex:np,fog_pars_vertex:rp,fog_fragment:sp,fog_pars_fragment:op,gradientmap_pars_fragment:lp,lightmap_pars_fragment:cp,lights_lambert_fragment:up,lights_lambert_pars_fragment:hp,lights_pars_begin:dp,lights_toon_fragment:fp,lights_toon_pars_fragment:mp,lights_phong_fragment:gp,lights_phong_pars_fragment:_p,lights_physical_fragment:vp,lights_physical_pars_fragment:xp,lights_fragment_begin:Sp,lights_fragment_maps:yp,lights_fragment_end:Mp,logdepthbuf_fragment:Ep,logdepthbuf_pars_fragment:bp,logdepthbuf_pars_vertex:Tp,logdepthbuf_vertex:Ap,map_fragment:wp,map_pars_fragment:Cp,map_particle_fragment:Rp,map_particle_pars_fragment:Pp,metalnessmap_fragment:Lp,metalnessmap_pars_fragment:Dp,morphinstance_vertex:Ip,morphcolor_vertex:Np,morphnormal_vertex:Up,morphtarget_pars_vertex:Op,morphtarget_vertex:Fp,normal_fragment_begin:Bp,normal_fragment_maps:zp,normal_pars_fragment:Hp,normal_pars_vertex:kp,normal_vertex:Vp,normalmap_pars_fragment:Gp,clearcoat_normal_fragment_begin:Wp,clearcoat_normal_fragment_maps:Xp,clearcoat_pars_fragment:qp,iridescence_pars_fragment:Yp,opaque_fragment:jp,packing:$p,premultiplied_alpha_fragment:Kp,project_vertex:Zp,dithering_fragment:Jp,dithering_pars_fragment:Qp,roughnessmap_fragment:ef,roughnessmap_pars_fragment:tf,shadowmap_pars_fragment:af,shadowmap_pars_vertex:nf,shadowmap_vertex:rf,shadowmask_pars_fragment:sf,skinbase_vertex:of,skinning_pars_vertex:lf,skinning_vertex:cf,skinnormal_vertex:uf,specularmap_fragment:hf,specularmap_pars_fragment:df,tonemapping_fragment:pf,tonemapping_pars_fragment:ff,transmission_fragment:mf,transmission_pars_fragment:gf,uv_pars_fragment:_f,uv_pars_vertex:vf,uv_vertex:xf,worldpos_vertex:Sf,background_vert:yf,background_frag:Mf,backgroundCube_vert:Ef,backgroundCube_frag:bf,cube_vert:Tf,cube_frag:Af,depth_vert:wf,depth_frag:Cf,distance_vert:Rf,distance_frag:Pf,equirect_vert:Lf,equirect_frag:Df,linedashed_vert:If,linedashed_frag:Nf,meshbasic_vert:Uf,meshbasic_frag:Of,meshlambert_vert:Ff,meshlambert_frag:Bf,meshmatcap_vert:zf,meshmatcap_frag:Hf,meshnormal_vert:kf,meshnormal_frag:Vf,meshphong_vert:Gf,meshphong_frag:Wf,meshphysical_vert:Xf,meshphysical_frag:qf,meshtoon_vert:Yf,meshtoon_frag:jf,points_vert:$f,points_frag:Kf,shadow_vert:Zf,shadow_frag:Jf,sprite_vert:Qf,sprite_frag:em},ce={common:{diffuse:{value:new be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},envMapRotation:{value:new He},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new be(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},pi={basic:{uniforms:Ot([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:Ot([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new be(0)},envMapIntensity:{value:1}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:Ot([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new be(0)},specular:{value:new be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:Ot([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:Ot([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new be(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:Ot([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:Ot([ce.points,ce.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:Ot([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:Ot([ce.common,ce.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:Ot([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:Ot([ce.sprite,ce.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new He}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distance:{uniforms:Ot([ce.common,ce.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distance_vert,fragmentShader:Be.distance_frag},shadow:{uniforms:Ot([ce.lights,ce.fog,{color:{value:new be(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};pi.physical={uniforms:Ot([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new be(0)},specularColor:{value:new be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const ir={r:0,b:0,g:0},aa=new ha,tm=new st;function im(i,e,t,a,n,r){const s=new be(0);let o=n===!0?0:1,l,c,u=null,h=0,d=null;function p(y){let b=y.isScene===!0?y.background:null;if(b&&b.isTexture){const M=y.backgroundBlurriness>0;b=e.get(b,M)}return b}function g(y){let b=!1;const M=p(y);M===null?m(s,o):M&&M.isColor&&(m(M,1),b=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function S(y,b){const M=p(b);M&&(M.isCubeTexture||M.mapping===Dr)?(c===void 0&&(c=new it(new Rn(1,1,1),new ct({name:"BackgroundCubeMaterial",uniforms:Ya(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:Nt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(c)),aa.copy(b.backgroundRotation),aa.x*=-1,aa.y*=-1,aa.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(aa.y*=-1,aa.z*=-1),c.material.uniforms.envMap.value=M,c.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(tm.makeRotationFromEuler(aa)),c.material.toneMapped=qe.getTransfer(M.colorSpace)!==Ze,(u!==M||h!==M.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=M,h=M.version,d=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new it(new Ui(2,2),new ct({name:"BackgroundMaterial",uniforms:Ya(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=qe.getTransfer(M.colorSpace)!==Ze,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||h!==M.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=M,h=M.version,d=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,b){y.getRGB(ir,iu(i)),t.buffers.color.setClear(ir.r,ir.g,ir.b,b,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(y,b=1){s.set(y),o=b,m(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(s,o)},render:g,addToRenderList:S,dispose:f}}function am(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),a={},n=d(null);let r=n,s=!1;function o(C,O,H,G,k){let z=!1;const F=h(C,G,H,O);r!==F&&(r=F,c(r.object)),z=p(C,G,H,k),z&&g(C,G,H,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),(z||s)&&(s=!1,M(C,O,H,G),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return i.createVertexArray()}function c(C){return i.bindVertexArray(C)}function u(C){return i.deleteVertexArray(C)}function h(C,O,H,G){const k=G.wireframe===!0;let z=a[O.id];z===void 0&&(z={},a[O.id]=z);const F=C.isInstancedMesh===!0?C.id:0;let Q=z[F];Q===void 0&&(Q={},z[F]=Q);let K=Q[H.id];K===void 0&&(K={},Q[H.id]=K);let le=K[k];return le===void 0&&(le=d(l()),K[k]=le),le}function d(C){const O=[],H=[],G=[];for(let k=0;k<t;k++)O[k]=0,H[k]=0,G[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:H,attributeDivisors:G,object:C,attributes:{},index:null}}function p(C,O,H,G){const k=r.attributes,z=O.attributes;let F=0;const Q=H.getAttributes();for(const K in Q)if(Q[K].location>=0){const le=k[K];let de=z[K];if(de===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(de=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(de=C.instanceColor)),le===void 0||le.attribute!==de||de&&le.data!==de.data)return!0;F++}return r.attributesNum!==F||r.index!==G}function g(C,O,H,G){const k={},z=O.attributes;let F=0;const Q=H.getAttributes();for(const K in Q)if(Q[K].location>=0){let le=z[K];le===void 0&&(K==="instanceMatrix"&&C.instanceMatrix&&(le=C.instanceMatrix),K==="instanceColor"&&C.instanceColor&&(le=C.instanceColor));const de={};de.attribute=le,le&&le.data&&(de.data=le.data),k[K]=de,F++}r.attributes=k,r.attributesNum=F,r.index=G}function S(){const C=r.newAttributes;for(let O=0,H=C.length;O<H;O++)C[O]=0}function m(C){f(C,0)}function f(C,O){const H=r.newAttributes,G=r.enabledAttributes,k=r.attributeDivisors;H[C]=1,G[C]===0&&(i.enableVertexAttribArray(C),G[C]=1),k[C]!==O&&(i.vertexAttribDivisor(C,O),k[C]=O)}function y(){const C=r.newAttributes,O=r.enabledAttributes;for(let H=0,G=O.length;H<G;H++)O[H]!==C[H]&&(i.disableVertexAttribArray(H),O[H]=0)}function b(C,O,H,G,k,z,F){F===!0?i.vertexAttribIPointer(C,O,H,k,z):i.vertexAttribPointer(C,O,H,G,k,z)}function M(C,O,H,G){S();const k=G.attributes,z=H.getAttributes(),F=O.defaultAttributeValues;for(const Q in z){const K=z[Q];if(K.location>=0){let le=k[Q];if(le===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(le=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(le=C.instanceColor)),le!==void 0){const de=le.normalized,xe=le.itemSize,ne=e.get(le);if(ne===void 0)continue;const Fe=ne.buffer,Ue=ne.type,q=ne.bytesPerElement,Z=Ue===i.INT||Ue===i.UNSIGNED_INT||le.gpuType===Do;if(le.isInterleavedBufferAttribute){const re=le.data,Oe=re.stride,we=le.offset;if(re.isInstancedInterleavedBuffer){for(let pe=0;pe<K.locationSize;pe++)f(K.location+pe,re.meshPerAttribute);C.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let pe=0;pe<K.locationSize;pe++)m(K.location+pe);i.bindBuffer(i.ARRAY_BUFFER,Fe);for(let pe=0;pe<K.locationSize;pe++)b(K.location+pe,xe/K.locationSize,Ue,de,Oe*q,(we+xe/K.locationSize*pe)*q,Z)}else{if(le.isInstancedBufferAttribute){for(let re=0;re<K.locationSize;re++)f(K.location+re,le.meshPerAttribute);C.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let re=0;re<K.locationSize;re++)m(K.location+re);i.bindBuffer(i.ARRAY_BUFFER,Fe);for(let re=0;re<K.locationSize;re++)b(K.location+re,xe/K.locationSize,Ue,de,xe*q,xe/K.locationSize*re*q,Z)}}else if(F!==void 0){const de=F[Q];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(K.location,de);break;case 3:i.vertexAttrib3fv(K.location,de);break;case 4:i.vertexAttrib4fv(K.location,de);break;default:i.vertexAttrib1fv(K.location,de)}}}}y()}function w(){T();for(const C in a){const O=a[C];for(const H in O){const G=O[H];for(const k in G){const z=G[k];for(const F in z)u(z[F].object),delete z[F];delete G[k]}}delete a[C]}}function A(C){if(a[C.id]===void 0)return;const O=a[C.id];for(const H in O){const G=O[H];for(const k in G){const z=G[k];for(const F in z)u(z[F].object),delete z[F];delete G[k]}}delete a[C.id]}function D(C){for(const O in a){const H=a[O];for(const G in H){const k=H[G];if(k[C.id]===void 0)continue;const z=k[C.id];for(const F in z)u(z[F].object),delete z[F];delete k[C.id]}}}function v(C){for(const O in a){const H=a[O],G=C.isInstancedMesh===!0?C.id:0,k=H[G];if(k!==void 0){for(const z in k){const F=k[z];for(const Q in F)u(F[Q].object),delete F[Q];delete k[z]}delete H[G],Object.keys(H).length===0&&delete a[O]}}}function T(){W(),s=!0,r!==n&&(r=n,c(r.object))}function W(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:T,resetDefaultState:W,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:D,initAttributes:S,enableAttribute:m,disableUnusedAttributes:y}}function nm(i,e,t){let a;function n(c){a=c}function r(c,u){i.drawArrays(a,c,u),t.update(u,a,1)}function s(c,u,h){h!==0&&(i.drawArraysInstanced(a,c,u,h),t.update(u,a,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,c,0,u,0,h);let d=0;for(let p=0;p<h;p++)d+=u[p];t.update(d,a,1)}function l(c,u,h,d){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)s(c[g],u[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(a,c,0,u,0,d,0,h);let g=0;for(let S=0;S<h;S++)g+=u[S]*d[S];t.update(g,a,1)}}this.setMode=n,this.render=r,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function rm(i,e,t,a){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(D){return!(D!==oi&&a.convert(D)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(D){const v=D===jt&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==Zt&&a.convert(D)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==si&&!v)}function l(D){if(D==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ne("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:S,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:M,maxSamples:w,samples:A}}function sm(i){const e=this;let t=null,a=0,n=!1,r=!1;const s=new Gi,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||a!==0||n;return n=d,a=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,p){const g=h.clippingPlanes,S=h.clipIntersection,m=h.clipShadows,f=i.get(h);if(!n||g===null||g.length===0||r&&!m)r?u(null):c();else{const y=r?0:a,b=y*4;let M=f.clippingState||null;l.value=M,M=u(g,d,b,p);for(let w=0;w!==b;++w)M[w]=t[w];f.clippingState=M,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=a>0),e.numPlanes=a,e.numIntersection=0}function u(h,d,p,g){const S=h!==null?h.length:0;let m=null;if(S!==0){if(m=l.value,g!==!0||m===null){const f=p+S*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,M=p;b!==S;++b,M+=4)s.copy(h[b]).applyMatrix4(y,o),s.normal.toArray(m,M),m[M+3]=s.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}const qi=4,Bl=[.125,.215,.35,.446,.526,.582],sa=20,om=256,un=new Nr,zl=new be;let fs=null,ms=0,gs=0,_s=!1;const lm=new P;let Hl=class{constructor(i){this._renderer=i,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(i,e=0,t=.1,a=100,n={}){const{size:r=256,position:s=lm}=n;fs=this._renderer.getRenderTarget(),ms=this._renderer.getActiveCubeFace(),gs=this._renderer.getActiveMipmapLevel(),_s=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(i,t,a,o,s),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(i,e=null){return this._fromTexture(i,e)}fromCubemap(i,e=null){return this._fromTexture(i,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(i){this._lodMax=Math.floor(Math.log2(i)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let i=0;i<this._lodMeshes.length;i++)this._lodMeshes[i].geometry.dispose()}_cleanup(i){this._renderer.setRenderTarget(fs,ms,gs),this._renderer.xr.enabled=_s,i.scissorTest=!1,Na(i,0,0,i.width,i.height)}_fromTexture(i,e){i.mapping===ua||i.mapping===Wa?this._setSize(i.image.length===0?16:i.image[0].width||i.image[0].image.width):this._setSize(i.image.width/4),fs=this._renderer.getRenderTarget(),ms=this._renderer.getActiveCubeFace(),gs=this._renderer.getActiveMipmapLevel(),_s=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const t=e||this._allocateTargets();return this._textureToCubeUV(i,t),this._applyPMREM(t),this._cleanup(t),t}_allocateTargets(){const i=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,t={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:jt,format:oi,colorSpace:qa,depthBuffer:!1},a=kl(i,e,t);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==i||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kl(i,e,t);const{_lodMax:n}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=cm(n)),this._blurMaterial=hm(n,i,e),this._ggxMaterial=um(n,i,e)}return a}_compileMaterial(i){const e=new it(new ht,i);this._renderer.compile(e,un)}_sceneToCubeUV(i,e,t,a,n){const r=new Yt(90,1,e,t),s=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,c=l.autoClear,u=l.toneMapping;l.getClearColor(zl),l.toneMapping=_i,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(a),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new it(new Rn,new ri({name:"PMREM.Background",side:Nt,depthWrite:!1,depthTest:!1})));const h=this._backgroundBox,d=h.material;let p=!1;const g=i.background;g?g.isColor&&(d.color.copy(g),i.background=null,p=!0):(d.color.copy(zl),p=!0);for(let S=0;S<6;S++){const m=S%3;m===0?(r.up.set(0,s[S],0),r.position.set(n.x,n.y,n.z),r.lookAt(n.x+o[S],n.y,n.z)):m===1?(r.up.set(0,0,s[S]),r.position.set(n.x,n.y,n.z),r.lookAt(n.x,n.y+o[S],n.z)):(r.up.set(0,s[S],0),r.position.set(n.x,n.y,n.z),r.lookAt(n.x,n.y,n.z+o[S]));const f=this._cubeSize;Na(a,m*f,S>2?f:0,f,f),l.setRenderTarget(a),p&&l.render(h,r),l.render(i,r)}l.toneMapping=u,l.autoClear=c,i.background=g}_textureToCubeUV(i,e){const t=this._renderer,a=i.mapping===ua||i.mapping===Wa;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gl()),this._cubemapMaterial.uniforms.flipEnvMap.value=i.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vl());const n=a?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=n;const s=n.uniforms;s.envMap.value=i;const o=this._cubeSize;Na(e,0,0,3*o,2*o),t.setRenderTarget(e),t.render(r,un)}_applyPMREM(i){const e=this._renderer,t=e.autoClear;e.autoClear=!1;const a=this._lodMeshes.length;for(let n=1;n<a;n++)this._applyGGXFilter(i,n-1,n);e.autoClear=t}_applyGGXFilter(i,e,t){const a=this._renderer,n=this._pingPongRenderTarget,r=this._ggxMaterial,s=this._lodMeshes[t];s.material=r;const o=r.uniforms,l=t/(this._lodMeshes.length-1),c=e/(this._lodMeshes.length-1),u=Math.sqrt(l*l-c*c),h=0+l*1.25,d=u*h,{_lodMax:p}=this,g=this._sizeLods[t],S=3*g*(t>p-qi?t-p+qi:0),m=4*(this._cubeSize-g);o.envMap.value=i.texture,o.roughness.value=d,o.mipInt.value=p-e,Na(n,S,m,3*g,2*g),a.setRenderTarget(n),a.render(s,un),o.envMap.value=n.texture,o.roughness.value=0,o.mipInt.value=p-t,Na(i,S,m,3*g,2*g),a.setRenderTarget(i),a.render(s,un)}_blur(i,e,t,a,n){const r=this._pingPongRenderTarget;this._halfBlur(i,r,e,t,a,"latitudinal",n),this._halfBlur(r,i,t,t,a,"longitudinal",n)}_halfBlur(i,e,t,a,n,r,s){const o=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&Xe("blur direction must be either latitudinal or longitudinal!");const c=3,u=this._lodMeshes[a];u.material=l;const h=l.uniforms,d=this._sizeLods[t]-1,p=isFinite(n)?Math.PI/(2*d):2*Math.PI/(2*sa-1),g=n/p,S=isFinite(n)?1+Math.floor(c*g):sa;S>sa&&Ne(`sigmaRadians, ${n}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${sa}`);const m=[];let f=0;for(let A=0;A<sa;++A){const D=A/g,v=Math.exp(-D*D/2);m.push(v),A===0?f+=v:A<S&&(f+=2*v)}for(let A=0;A<m.length;A++)m[A]=m[A]/f;h.envMap.value=i.texture,h.samples.value=S,h.weights.value=m,h.latitudinal.value=r==="latitudinal",s&&(h.poleAxis.value=s);const{_lodMax:y}=this;h.dTheta.value=p,h.mipInt.value=y-t;const b=this._sizeLods[a],M=3*b*(a>y-qi?a-y+qi:0),w=4*(this._cubeSize-b);Na(e,M,w,3*b,2*b),o.setRenderTarget(e),o.render(u,un)}};function cm(i){const e=[],t=[],a=[];let n=i;const r=i-qi+1+Bl.length;for(let s=0;s<r;s++){const o=Math.pow(2,n);e.push(o);let l=1/o;s>i-qi?l=Bl[s-i+qi-1]:s===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,S=3,m=2,f=1,y=new Float32Array(S*g*p),b=new Float32Array(m*g*p),M=new Float32Array(f*g*p);for(let A=0;A<p;A++){const D=A%3*2/3-1,v=A>2?0:-1,T=[D,v,0,D+2/3,v,0,D+2/3,v+1,0,D,v,0,D+2/3,v+1,0,D,v+1,0];y.set(T,S*g*A),b.set(d,m*g*A);const W=[A,A,A,A,A,A];M.set(W,f*g*A)}const w=new ht;w.setAttribute("position",new Gt(y,S)),w.setAttribute("uv",new Gt(b,m)),w.setAttribute("faceIndex",new Gt(M,f)),a.push(new it(w,null)),n>qi&&n--}return{lodMeshes:a,sizeLods:e,sigmas:t}}function kl(i,e,t){const a=new Vt(i,e,t);return a.texture.mapping=Dr,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function Na(i,e,t,a,n){i.viewport.set(e,t,a,n),i.scissor.set(e,t,a,n)}function um(i,e,t){return new ct({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:om,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ur(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function hm(i,e,t){const a=new Float32Array(sa),n=new P(0,1,0);return new ct({name:"SphericalGaussianBlur",defines:{n:sa,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:a},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:Ur(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Vl(){return new ct({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ur(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Gl(){return new ct({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ur(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Ur(){return`

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
	`}class ru extends Vt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const a={width:e,height:e,depth:1},n=[a,a,a,a,a,a];this.texture=new eu(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new Rn(5,5,5),r=new ct({name:"CubemapFromEquirect",uniforms:Ya(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:Nt,blending:gi});r.uniforms.tEquirect.value=t;const s=new it(n,r),o=t.minFilter;return t.minFilter===oa&&(t.minFilter=Rt),new pd(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,a=!0,n=!0){const r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,a,n);e.setRenderTarget(r)}}function dm(i){let e=new WeakMap,t=new WeakMap,a=null;function n(d,p=!1){return d==null?null:p?s(d):r(d)}function r(d){if(d&&d.isTexture){const p=d.mapping;if(p===zr||p===Hr)if(e.has(d)){const g=e.get(d).texture;return o(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const S=new ru(g.height);return S.fromEquirectangularTexture(i,d),e.set(d,S),d.addEventListener("dispose",c),o(S.texture,d.mapping)}else return null}}return d}function s(d){if(d&&d.isTexture){const p=d.mapping,g=p===zr||p===Hr,S=p===ua||p===Wa;if(g||S){let m=t.get(d);const f=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==f)return a===null&&(a=new Hl(i)),m=g?a.fromEquirectangular(d,m):a.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const y=d.image;return g&&y&&y.height>0||S&&y&&l(y)?(a===null&&(a=new Hl(i)),m=g?a.fromEquirectangular(d):a.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function o(d,p){return p===zr?d.mapping=ua:p===Hr&&(d.mapping=Wa),d}function l(d){let p=0;const g=6;for(let S=0;S<g;S++)d[S]!==void 0&&p++;return p===g}function c(d){const p=d.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(d){const p=d.target;p.removeEventListener("dispose",u);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function h(){e=new WeakMap,t=new WeakMap,a!==null&&(a.dispose(),a=null)}return{get:n,dispose:h}}function pm(i){const e={};function t(a){if(e[a]!==void 0)return e[a];const n=i.getExtension(a);return e[a]=n,n}return{has:function(a){return t(a)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(a){const n=t(a);return n===null&&Ar("WebGLRenderer: "+a+" extension not supported."),n}}}function fm(i,e,t,a){const n={},r=new WeakMap;function s(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",s),delete n[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),a.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return n[d.id]===!0||(d.addEventListener("dispose",s),n[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const p in d)e.update(d[p],i.ARRAY_BUFFER)}function c(h){const d=[],p=h.index,g=h.attributes.position;let S=0;if(g===void 0)return;if(p!==null){const y=p.array;S=p.version;for(let b=0,M=y.length;b<M;b+=3){const w=y[b+0],A=y[b+1],D=y[b+2];d.push(w,A,A,D,D,w)}}else{const y=g.array;S=g.version;for(let b=0,M=y.length/3-1;b<M;b+=3){const w=b+0,A=b+1,D=b+2;d.push(w,A,A,D,D,w)}}const m=new(g.count>=65535?Kc:$c)(d,1);m.version=S;const f=r.get(h);f&&e.remove(f),r.set(h,m)}function u(h){const d=r.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function mm(i,e,t){let a;function n(d){a=d}let r,s;function o(d){r=d.type,s=d.bytesPerElement}function l(d,p){i.drawElements(a,p,r,d*s),t.update(p,a,1)}function c(d,p,g){g!==0&&(i.drawElementsInstanced(a,p,r,d*s,g),t.update(p,a,g))}function u(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,p,0,r,d,0,g);let S=0;for(let m=0;m<g;m++)S+=p[m];t.update(S,a,1)}function h(d,p,g,S){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/s,p[f],S[f]);else{m.multiDrawElementsInstancedWEBGL(a,p,0,r,d,0,S,0,g);let f=0;for(let y=0;y<g;y++)f+=p[y]*S[y];t.update(f,a,1)}}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function gm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function a(r,s,o){switch(t.calls++,s){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:Xe("WebGLInfo: Unknown draw mode:",s);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:a}}function _m(i,e,t){const a=new WeakMap,n=new ft;function r(s,o,l){const c=s.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=a.get(o);if(d===void 0||d.count!==h){let p=function(){v.dispose(),a.delete(o),o.removeEventListener("dispose",p)};d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,S=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),S===!0&&(M=2),m===!0&&(M=3);let w=o.attributes.position.count*M,A=1;w>e.maxTextureSize&&(A=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const D=new Float32Array(w*A*4*h),v=new qc(D,w,A,h);v.type=si,v.needsUpdate=!0;const T=M*4;for(let W=0;W<h;W++){const C=f[W],O=y[W],H=b[W],G=w*A*4*W;for(let k=0;k<C.count;k++){const z=k*T;g===!0&&(n.fromBufferAttribute(C,k),D[G+z+0]=n.x,D[G+z+1]=n.y,D[G+z+2]=n.z,D[G+z+3]=0),S===!0&&(n.fromBufferAttribute(O,k),D[G+z+4]=n.x,D[G+z+5]=n.y,D[G+z+6]=n.z,D[G+z+7]=0),m===!0&&(n.fromBufferAttribute(H,k),D[G+z+8]=n.x,D[G+z+9]=n.y,D[G+z+10]=n.z,D[G+z+11]=H.itemSize===4?n.w:1)}}d={count:h,texture:v,size:new De(w,A)},a.set(o,d),o.addEventListener("dispose",p)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let p=0;for(let S=0;S<c.length;S++)p+=c[S];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function vm(i,e,t,a,n){let r=new WeakMap;function s(c){const u=n.render.frame,h=c.geometry,d=e.get(c,h);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return d}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),a.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:o}}const xm={[Rc]:"LINEAR_TONE_MAPPING",[Pc]:"REINHARD_TONE_MAPPING",[Lc]:"CINEON_TONE_MAPPING",[Dc]:"ACES_FILMIC_TONE_MAPPING",[Nc]:"AGX_TONE_MAPPING",[Uc]:"NEUTRAL_TONE_MAPPING",[Ic]:"CUSTOM_TONE_MAPPING"};function Sm(i,e,t,a,n){const r=new Vt(e,t,{type:i,depthBuffer:a,stencilBuffer:n}),s=new Vt(e,t,{type:jt,depthBuffer:!1,stencilBuffer:!1}),o=new ht;o.setAttribute("position",new Ut([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ut([0,2,0,0,2,0],2));const l=new rd({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new it(o,l),u=new Nr(-1,1,1,-1,0,1);let h=null,d=null,p=!1,g,S=null,m=[],f=!1;this.setSize=function(y,b){r.setSize(y,b),s.setSize(y,b);for(let M=0;M<m.length;M++){const w=m[M];w.setSize&&w.setSize(y,b)}},this.setEffects=function(y){m=y,f=m.length>0&&m[0].isRenderPass===!0;const b=r.width,M=r.height;for(let w=0;w<m.length;w++){const A=m[w];A.setSize&&A.setSize(b,M)}},this.begin=function(y,b){if(p||y.toneMapping===_i&&m.length===0)return!1;if(S=b,b!==null){const M=b.width,w=b.height;(r.width!==M||r.height!==w)&&this.setSize(M,w)}return f===!1&&y.setRenderTarget(r),g=y.toneMapping,y.toneMapping=_i,!0},this.hasRenderPass=function(){return f},this.end=function(y,b){y.toneMapping=g,p=!0;let M=r,w=s;for(let A=0;A<m.length;A++){const D=m[A];if(D.enabled!==!1&&(D.render(y,w,M,b),D.needsSwap!==!1)){const v=M;M=w,w=v}}if(h!==y.outputColorSpace||d!==y.toneMapping){h=y.outputColorSpace,d=y.toneMapping,l.defines={},qe.getTransfer(h)===Ze&&(l.defines.SRGB_TRANSFER="");const A=xm[d];A&&(l.defines[A]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=M.texture,y.setRenderTarget(S),y.render(c,u),S=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){r.dispose(),s.dispose(),o.dispose(),l.dispose()}}const su=new $t,Mo=new Mn(1,1),ou=new qc,lu=new Lh,cu=new eu,Wl=[],Xl=[],ql=new Float32Array(16),Yl=new Float32Array(9),jl=new Float32Array(4);function Za(i,e,t){const a=i[0];if(a<=0||a>0)return i;const n=e*t;let r=Wl[n];if(r===void 0&&(r=new Float32Array(n),Wl[n]=r),e!==0){a.toArray(r,0);for(let s=1,o=0;s!==e;++s)o+=t,i[s].toArray(r,o)}return r}function Et(i,e){if(i.length!==e.length)return!1;for(let t=0,a=i.length;t<a;t++)if(i[t]!==e[t])return!1;return!0}function bt(i,e){for(let t=0,a=e.length;t<a;t++)i[t]=e[t]}function Or(i,e){let t=Xl[e];t===void 0&&(t=new Int32Array(e),Xl[e]=t);for(let a=0;a!==e;++a)t[a]=i.allocateTextureUnit();return t}function ym(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2fv(this.addr,e),bt(t,e)}}function Em(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;i.uniform3fv(this.addr,e),bt(t,e)}}function bm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4fv(this.addr,e),bt(t,e)}}function Tm(i,e){const t=this.cache,a=e.elements;if(a===void 0){if(Et(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),bt(t,e)}else{if(Et(t,a))return;jl.set(a),i.uniformMatrix2fv(this.addr,!1,jl),bt(t,a)}}function Am(i,e){const t=this.cache,a=e.elements;if(a===void 0){if(Et(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),bt(t,e)}else{if(Et(t,a))return;Yl.set(a),i.uniformMatrix3fv(this.addr,!1,Yl),bt(t,a)}}function wm(i,e){const t=this.cache,a=e.elements;if(a===void 0){if(Et(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),bt(t,e)}else{if(Et(t,a))return;ql.set(a),i.uniformMatrix4fv(this.addr,!1,ql),bt(t,a)}}function Cm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Rm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2iv(this.addr,e),bt(t,e)}}function Pm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3iv(this.addr,e),bt(t,e)}}function Lm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4iv(this.addr,e),bt(t,e)}}function Dm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Im(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2uiv(this.addr,e),bt(t,e)}}function Nm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3uiv(this.addr,e),bt(t,e)}}function Um(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4uiv(this.addr,e),bt(t,e)}}function Om(i,e,t){const a=this.cache,n=t.allocateTextureUnit();a[0]!==n&&(i.uniform1i(this.addr,n),a[0]=n);let r;this.type===i.SAMPLER_2D_SHADOW?(Mo.compareFunction=t.isReversedDepthBuffer()?Ho:zo,r=Mo):r=su,t.setTexture2D(e||r,n)}function Fm(i,e,t){const a=this.cache,n=t.allocateTextureUnit();a[0]!==n&&(i.uniform1i(this.addr,n),a[0]=n),t.setTexture3D(e||lu,n)}function Bm(i,e,t){const a=this.cache,n=t.allocateTextureUnit();a[0]!==n&&(i.uniform1i(this.addr,n),a[0]=n),t.setTextureCube(e||cu,n)}function zm(i,e,t){const a=this.cache,n=t.allocateTextureUnit();a[0]!==n&&(i.uniform1i(this.addr,n),a[0]=n),t.setTexture2DArray(e||ou,n)}function Hm(i){switch(i){case 5126:return ym;case 35664:return Mm;case 35665:return Em;case 35666:return bm;case 35674:return Tm;case 35675:return Am;case 35676:return wm;case 5124:case 35670:return Cm;case 35667:case 35671:return Rm;case 35668:case 35672:return Pm;case 35669:case 35673:return Lm;case 5125:return Dm;case 36294:return Im;case 36295:return Nm;case 36296:return Um;case 35678:case 36198:case 36298:case 36306:case 35682:return Om;case 35679:case 36299:case 36307:return Fm;case 35680:case 36300:case 36308:case 36293:return Bm;case 36289:case 36303:case 36311:case 36292:return zm}}function km(i,e){i.uniform1fv(this.addr,e)}function Vm(i,e){const t=Za(e,this.size,2);i.uniform2fv(this.addr,t)}function Gm(i,e){const t=Za(e,this.size,3);i.uniform3fv(this.addr,t)}function Wm(i,e){const t=Za(e,this.size,4);i.uniform4fv(this.addr,t)}function Xm(i,e){const t=Za(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function qm(i,e){const t=Za(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Ym(i,e){const t=Za(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function jm(i,e){i.uniform1iv(this.addr,e)}function $m(i,e){i.uniform2iv(this.addr,e)}function Km(i,e){i.uniform3iv(this.addr,e)}function Zm(i,e){i.uniform4iv(this.addr,e)}function Jm(i,e){i.uniform1uiv(this.addr,e)}function Qm(i,e){i.uniform2uiv(this.addr,e)}function eg(i,e){i.uniform3uiv(this.addr,e)}function tg(i,e){i.uniform4uiv(this.addr,e)}function ig(i,e,t){const a=this.cache,n=e.length,r=Or(t,n);Et(a,r)||(i.uniform1iv(this.addr,r),bt(a,r));let s;this.type===i.SAMPLER_2D_SHADOW?s=Mo:s=su;for(let o=0;o!==n;++o)t.setTexture2D(e[o]||s,r[o])}function ag(i,e,t){const a=this.cache,n=e.length,r=Or(t,n);Et(a,r)||(i.uniform1iv(this.addr,r),bt(a,r));for(let s=0;s!==n;++s)t.setTexture3D(e[s]||lu,r[s])}function ng(i,e,t){const a=this.cache,n=e.length,r=Or(t,n);Et(a,r)||(i.uniform1iv(this.addr,r),bt(a,r));for(let s=0;s!==n;++s)t.setTextureCube(e[s]||cu,r[s])}function rg(i,e,t){const a=this.cache,n=e.length,r=Or(t,n);Et(a,r)||(i.uniform1iv(this.addr,r),bt(a,r));for(let s=0;s!==n;++s)t.setTexture2DArray(e[s]||ou,r[s])}function sg(i){switch(i){case 5126:return km;case 35664:return Vm;case 35665:return Gm;case 35666:return Wm;case 35674:return Xm;case 35675:return qm;case 35676:return Ym;case 5124:case 35670:return jm;case 35667:case 35671:return $m;case 35668:case 35672:return Km;case 35669:case 35673:return Zm;case 5125:return Jm;case 36294:return Qm;case 36295:return eg;case 36296:return tg;case 35678:case 36198:case 36298:case 36306:case 35682:return ig;case 35679:case 36299:case 36307:return ag;case 35680:case 36300:case 36308:case 36293:return ng;case 36289:case 36303:case 36311:case 36292:return rg}}class og{constructor(e,t,a){this.id=e,this.addr=a,this.cache=[],this.type=t.type,this.setValue=Hm(t.type)}}class lg{constructor(e,t,a){this.id=e,this.addr=a,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sg(t.type)}}class cg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,a){const n=this.seq;for(let r=0,s=n.length;r!==s;++r){const o=n[r];o.setValue(e,t[o.id],a)}}}const vs=/(\w+)(\])?(\[|\.)?/g;function $l(i,e){i.seq.push(e),i.map[e.id]=e}function ug(i,e,t){const a=i.name,n=a.length;for(vs.lastIndex=0;;){const r=vs.exec(a),s=vs.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===n){$l(t,c===void 0?new og(o,i,e):new lg(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new cg(o),$l(t,u)),t=u}}}class mr{constructor(e,t){this.seq=[],this.map={};const a=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<a;++s){const o=e.getActiveUniform(t,s),l=e.getUniformLocation(t,o.name);ug(o,l,this)}const n=[],r=[];for(const s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?n.push(s):r.push(s);n.length>0&&(this.seq=n.concat(r))}setValue(e,t,a,n){const r=this.map[t];r!==void 0&&r.setValue(e,a,n)}setOptional(e,t,a){const n=t[a];n!==void 0&&this.setValue(e,a,n)}static upload(e,t,a,n){for(let r=0,s=t.length;r!==s;++r){const o=t[r],l=a[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){const a=[];for(let n=0,r=e.length;n!==r;++n){const s=e[n];s.id in t&&a.push(s)}return a}}function Kl(i,e,t){const a=i.createShader(e);return i.shaderSource(a,t),i.compileShader(a),a}const hg=37297;let dg=0;function pg(i,e){const t=i.split(`
`),a=[],n=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let s=n;s<r;s++){const o=s+1;a.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return a.join(`
`)}const Zl=new He;function fg(i){qe._getMatrix(Zl,qe.workingColorSpace,i);const e=`mat3( ${Zl.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(i)){case br:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Jl(i,e,t){const a=i.getShaderParameter(e,i.COMPILE_STATUS),n=(i.getShaderInfoLog(e)||"").trim();if(a&&n==="")return"";const r=/ERROR: 0:(\d+)/.exec(n);if(r){const s=parseInt(r[1]);return t.toUpperCase()+`

`+n+`

`+pg(i.getShaderSource(e),s)}else return n}function mg(i,e){const t=fg(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const gg={[Rc]:"Linear",[Pc]:"Reinhard",[Lc]:"Cineon",[Dc]:"ACESFilmic",[Nc]:"AgX",[Uc]:"Neutral",[Ic]:"Custom"};function _g(i,e){const t=gg[e];return t===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ar=new P;function vg(){qe.getLuminanceCoefficients(ar);const i=ar.x.toFixed(4),e=ar.y.toFixed(4),t=ar.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fn).join(`
`)}function Sg(i){const e=[];for(const t in i){const a=i[t];a!==!1&&e.push("#define "+t+" "+a)}return e.join(`
`)}function yg(i,e){const t={},a=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let n=0;n<a;n++){const r=i.getActiveAttrib(e,n),s=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[s]={type:r.type,location:i.getAttribLocation(e,s),locationSize:o}}return t}function fn(i){return i!==""}function Ql(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ec(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Mg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Eo(i){return i.replace(Mg,bg)}const Eg=new Map;function bg(i,e){let t=Be[e];if(t===void 0){const a=Eg.get(e);if(a!==void 0)t=Be[a],Ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,a);else throw new Error("Can not resolve #include <"+e+">")}return Eo(t)}const Tg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tc(i){return i.replace(Tg,Ag)}function Ag(i,e,t,a){let n="";for(let r=parseInt(e);r<parseInt(t);r++)n+=a.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function ic(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const wg={[or]:"SHADOWMAP_TYPE_PCF",[pn]:"SHADOWMAP_TYPE_VSM"};function Cg(i){return wg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Rg={[ua]:"ENVMAP_TYPE_CUBE",[Wa]:"ENVMAP_TYPE_CUBE",[Dr]:"ENVMAP_TYPE_CUBE_UV"};function Pg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Rg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Lg={[Wa]:"ENVMAP_MODE_REFRACTION"};function Dg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Lg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Ig={[Cc]:"ENVMAP_BLENDING_MULTIPLY",[oh]:"ENVMAP_BLENDING_MIX",[lh]:"ENVMAP_BLENDING_ADD"};function Ng(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Ig[i.combine]||"ENVMAP_BLENDING_NONE"}function Ug(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,a=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:a,maxMip:t}}function Og(i,e,t,a){const n=i.getContext(),r=t.defines;let s=t.vertexShader,o=t.fragmentShader;const l=Cg(t),c=Pg(t),u=Dg(t),h=Ng(t),d=Ug(t),p=xg(t),g=Sg(r),S=n.createProgram();let m,f,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(fn).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(fn).join(`
`),f.length>0&&(f+=`
`)):(m=[ic(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fn).join(`
`),f=[ic(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_i?"#define TONE_MAPPING":"",t.toneMapping!==_i?Be.tonemapping_pars_fragment:"",t.toneMapping!==_i?_g("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,mg("linearToOutputTexel",t.outputColorSpace),vg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fn).join(`
`)),s=Eo(s),s=Ql(s,t),s=ec(s,t),o=Eo(o),o=Ql(o,t),o=ec(o,t),s=tc(s),o=tc(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===ll?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ll?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=y+m+s,M=y+f+o,w=Kl(n,n.VERTEX_SHADER,b),A=Kl(n,n.FRAGMENT_SHADER,M);n.attachShader(S,w),n.attachShader(S,A),t.index0AttributeName!==void 0?n.bindAttribLocation(S,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(S,0,"position"),n.linkProgram(S);function D(C){if(i.debug.checkShaderErrors){const O=n.getProgramInfoLog(S)||"",H=n.getShaderInfoLog(w)||"",G=n.getShaderInfoLog(A)||"",k=O.trim(),z=H.trim(),F=G.trim();let Q=!0,K=!0;if(n.getProgramParameter(S,n.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(n,S,w,A);else{const le=Jl(n,w,"vertex"),de=Jl(n,A,"fragment");Xe("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(S,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+k+`
`+le+`
`+de)}else k!==""?Ne("WebGLProgram: Program Info Log:",k):(z===""||F==="")&&(K=!1);K&&(C.diagnostics={runnable:Q,programLog:k,vertexShader:{log:z,prefix:m},fragmentShader:{log:F,prefix:f}})}n.deleteShader(w),n.deleteShader(A),v=new mr(n,S),T=yg(n,S)}let v;this.getUniforms=function(){return v===void 0&&D(this),v};let T;this.getAttributes=function(){return T===void 0&&D(this),T};let W=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=n.getProgramParameter(S,hg)),W},this.destroy=function(){a.releaseStatesOfProgram(this),n.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=dg++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=w,this.fragmentShader=A,this}let Fg=0;class Bg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,a=e.fragmentShader,n=this._getShaderStage(t),r=this._getShaderStage(a),s=this._getShaderCacheForMaterial(e);return s.has(n)===!1&&(s.add(n),n.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const a of t)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let a=t.get(e);return a===void 0&&(a=new Set,t.set(e,a)),a}_getShaderStage(e){const t=this.shaderCache;let a=t.get(e);return a===void 0&&(a=new zg(e),t.set(e,a)),a}}class zg{constructor(e){this.id=Fg++,this.code=e,this.usedTimes=0}}function Hg(i,e,t,a,n,r){const s=new Vo,o=new Bg,l=new Set,c=[],u=new Map,h=a.logarithmicDepthBuffer;let d=a.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return l.add(v),v===0?"uv":`uv${v}`}function S(v,T,W,C,O){const H=C.fog,G=O.geometry,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?C.environment:null,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,F=e.get(v.envMap||k,z),Q=F&&F.mapping===Dr?F.image.height:null,K=p[v.type];v.precision!==null&&(d=a.getMaxPrecision(v.precision),d!==v.precision&&Ne("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));const le=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,de=le!==void 0?le.length:0;let xe=0;G.morphAttributes.position!==void 0&&(xe=1),G.morphAttributes.normal!==void 0&&(xe=2),G.morphAttributes.color!==void 0&&(xe=3);let ne,Fe,Ue,q;if(K){const Ke=pi[K];ne=Ke.vertexShader,Fe=Ke.fragmentShader}else ne=v.vertexShader,Fe=v.fragmentShader,o.update(v),Ue=o.getVertexShaderID(v),q=o.getFragmentShaderID(v);const Z=i.getRenderTarget(),re=i.state.buffers.depth.getReversed(),Oe=O.isInstancedMesh===!0,we=O.isBatchedMesh===!0,pe=!!v.map,je=!!v.matcap,Qe=!!F,Ve=!!v.aoMap,St=!!v.lightMap,gt=!!v.bumpMap,At=!!v.normalMap,R=!!v.displacementMap,_t=!!v.emissiveMap,$e=!!v.metalnessMap,at=!!v.roughnessMap,Se=v.anisotropy>0,E=v.clearcoat>0,_=v.dispersion>0,I=v.iridescence>0,Y=v.sheen>0,$=v.transmission>0,j=Se&&!!v.anisotropyMap,ye=E&&!!v.clearcoatMap,se=E&&!!v.clearcoatNormalMap,Te=E&&!!v.clearcoatRoughnessMap,Me=I&&!!v.iridescenceMap,J=I&&!!v.iridescenceThicknessMap,ie=Y&&!!v.sheenColorMap,Ee=Y&&!!v.sheenRoughnessMap,ve=!!v.specularMap,he=!!v.specularColorMap,Ge=!!v.specularIntensityMap,L=$&&!!v.transmissionMap,oe=$&&!!v.thicknessMap,te=!!v.gradientMap,ge=!!v.alphaMap,ee=v.alphaTest>0,X=!!v.alphaHash,_e=!!v.extensions;let Le=_i;v.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Le=i.toneMapping);const yt={shaderID:K,shaderType:v.type,shaderName:v.name,vertexShader:ne,fragmentShader:Fe,defines:v.defines,customVertexShaderID:Ue,customFragmentShaderID:q,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:we,batchingColor:we&&O._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&O.instanceColor!==null,instancingMorph:Oe&&O.morphTexture!==null,outputColorSpace:Z===null?i.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:qa,alphaToCoverage:!!v.alphaToCoverage,map:pe,matcap:je,envMap:Qe,envMapMode:Qe&&F.mapping,envMapCubeUVHeight:Q,aoMap:Ve,lightMap:St,bumpMap:gt,normalMap:At,displacementMap:R,emissiveMap:_t,normalMapObjectSpace:At&&v.normalMapType===ph,normalMapTangentSpace:At&&v.normalMapType===dh,metalnessMap:$e,roughnessMap:at,anisotropy:Se,anisotropyMap:j,clearcoat:E,clearcoatMap:ye,clearcoatNormalMap:se,clearcoatRoughnessMap:Te,dispersion:_,iridescence:I,iridescenceMap:Me,iridescenceThicknessMap:J,sheen:Y,sheenColorMap:ie,sheenRoughnessMap:Ee,specularMap:ve,specularColorMap:he,specularIntensityMap:Ge,transmission:$,transmissionMap:L,thicknessMap:oe,gradientMap:te,opaque:v.transparent===!1&&v.blending===ca&&v.alphaToCoverage===!1,alphaMap:ge,alphaTest:ee,alphaHash:X,combine:v.combine,mapUv:pe&&g(v.map.channel),aoMapUv:Ve&&g(v.aoMap.channel),lightMapUv:St&&g(v.lightMap.channel),bumpMapUv:gt&&g(v.bumpMap.channel),normalMapUv:At&&g(v.normalMap.channel),displacementMapUv:R&&g(v.displacementMap.channel),emissiveMapUv:_t&&g(v.emissiveMap.channel),metalnessMapUv:$e&&g(v.metalnessMap.channel),roughnessMapUv:at&&g(v.roughnessMap.channel),anisotropyMapUv:j&&g(v.anisotropyMap.channel),clearcoatMapUv:ye&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:se&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Me&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:J&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:ie&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&g(v.sheenRoughnessMap.channel),specularMapUv:ve&&g(v.specularMap.channel),specularColorMapUv:he&&g(v.specularColorMap.channel),specularIntensityMapUv:Ge&&g(v.specularIntensityMap.channel),transmissionMapUv:L&&g(v.transmissionMap.channel),thicknessMapUv:oe&&g(v.thicknessMap.channel),alphaMapUv:ge&&g(v.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(At||Se),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!G.attributes.uv&&(pe||ge),fog:!!H,useFog:v.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||G.attributes.normal===void 0&&At===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:re,skinning:O.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:xe,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&W.length>0,shadowMapType:i.shadowMap.type,toneMapping:Le,decodeVideoTexture:pe&&v.map.isVideoTexture===!0&&qe.getTransfer(v.map.colorSpace)===Ze,decodeVideoTextureEmissive:_t&&v.emissiveMap.isVideoTexture===!0&&qe.getTransfer(v.emissiveMap.colorSpace)===Ze,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===ni,flipSided:v.side===Nt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:_e&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&v.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return yt.vertexUv1s=l.has(1),yt.vertexUv2s=l.has(2),yt.vertexUv3s=l.has(3),l.clear(),yt}function m(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const W in v.defines)T.push(W),T.push(v.defines[W]);return v.isRawShaderMaterial===!1&&(f(T,v),y(T,v),T.push(i.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function f(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function y(v,T){s.disableAll(),T.instancing&&s.enable(0),T.instancingColor&&s.enable(1),T.instancingMorph&&s.enable(2),T.matcap&&s.enable(3),T.envMap&&s.enable(4),T.normalMapObjectSpace&&s.enable(5),T.normalMapTangentSpace&&s.enable(6),T.clearcoat&&s.enable(7),T.iridescence&&s.enable(8),T.alphaTest&&s.enable(9),T.vertexColors&&s.enable(10),T.vertexAlphas&&s.enable(11),T.vertexUv1s&&s.enable(12),T.vertexUv2s&&s.enable(13),T.vertexUv3s&&s.enable(14),T.vertexTangents&&s.enable(15),T.anisotropy&&s.enable(16),T.alphaHash&&s.enable(17),T.batching&&s.enable(18),T.dispersion&&s.enable(19),T.batchingColor&&s.enable(20),T.gradientMap&&s.enable(21),v.push(s.mask),s.disableAll(),T.fog&&s.enable(0),T.useFog&&s.enable(1),T.flatShading&&s.enable(2),T.logarithmicDepthBuffer&&s.enable(3),T.reversedDepthBuffer&&s.enable(4),T.skinning&&s.enable(5),T.morphTargets&&s.enable(6),T.morphNormals&&s.enable(7),T.morphColors&&s.enable(8),T.premultipliedAlpha&&s.enable(9),T.shadowMapEnabled&&s.enable(10),T.doubleSided&&s.enable(11),T.flipSided&&s.enable(12),T.useDepthPacking&&s.enable(13),T.dithering&&s.enable(14),T.transmission&&s.enable(15),T.sheen&&s.enable(16),T.opaque&&s.enable(17),T.pointsUvs&&s.enable(18),T.decodeVideoTexture&&s.enable(19),T.decodeVideoTextureEmissive&&s.enable(20),T.alphaToCoverage&&s.enable(21),v.push(s.mask)}function b(v){const T=p[v.type];let W;if(T){const C=pi[T];W=Rr.clone(C.uniforms)}else W=v.uniforms;return W}function M(v,T){let W=u.get(T);return W!==void 0?++W.usedTimes:(W=new Og(i,T,v,n),c.push(W),u.set(T,W)),W}function w(v){if(--v.usedTimes===0){const T=c.indexOf(v);c[T]=c[c.length-1],c.pop(),u.delete(v.cacheKey),v.destroy()}}function A(v){o.remove(v)}function D(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:b,acquireProgram:M,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:D}}function kg(){let i=new WeakMap;function e(s){return i.has(s)}function t(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function a(s){i.delete(s)}function n(s,o,l){i.get(s)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:a,update:n,dispose:r}}function Vg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function ac(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function nc(){const i=[];let e=0;const t=[],a=[],n=[];function r(){e=0,t.length=0,a.length=0,n.length=0}function s(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,g,S,m,f){let y=i[e];return y===void 0?(y={id:d.id,object:d,geometry:p,material:g,materialVariant:s(d),groupOrder:S,renderOrder:d.renderOrder,z:m,group:f},i[e]=y):(y.id=d.id,y.object=d,y.geometry=p,y.material=g,y.materialVariant=s(d),y.groupOrder=S,y.renderOrder=d.renderOrder,y.z=m,y.group=f),e++,y}function l(d,p,g,S,m,f){const y=o(d,p,g,S,m,f);g.transmission>0?a.push(y):g.transparent===!0?n.push(y):t.push(y)}function c(d,p,g,S,m,f){const y=o(d,p,g,S,m,f);g.transmission>0?a.unshift(y):g.transparent===!0?n.unshift(y):t.unshift(y)}function u(d,p){t.length>1&&t.sort(d||Vg),a.length>1&&a.sort(p||ac),n.length>1&&n.sort(p||ac)}function h(){for(let d=e,p=i.length;d<p;d++){const g=i[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:a,transparent:n,init:r,push:l,unshift:c,finish:h,sort:u}}function Gg(){let i=new WeakMap;function e(a,n){const r=i.get(a);let s;return r===void 0?(s=new nc,i.set(a,[s])):n>=r.length?(s=new nc,r.push(s)):s=r[n],s}function t(){i=new WeakMap}return{get:e,dispose:t}}function Wg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new be};break;case"SpotLight":t={position:new P,direction:new P,color:new be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new be,groundColor:new be};break;case"RectAreaLight":t={color:new be,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function Xg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let qg=0;function Yg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function jg(i){const e=new Wg,t=Xg(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)a.probe.push(new P);const n=new P,r=new st,s=new st;function o(c){let u=0,h=0,d=0;for(let T=0;T<9;T++)a.probe[T].set(0,0,0);let p=0,g=0,S=0,m=0,f=0,y=0,b=0,M=0,w=0,A=0,D=0;c.sort(Yg);for(let T=0,W=c.length;T<W;T++){const C=c[T],O=C.color,H=C.intensity,G=C.distance;let k=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Xa?k=C.shadow.map.texture:k=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)u+=O.r*H,h+=O.g*H,d+=O.b*H;else if(C.isLightProbe){for(let z=0;z<9;z++)a.probe[z].addScaledVector(C.sh.coefficients[z],H);D++}else if(C.isDirectionalLight){const z=e.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const F=C.shadow,Q=t.get(C);Q.shadowIntensity=F.intensity,Q.shadowBias=F.bias,Q.shadowNormalBias=F.normalBias,Q.shadowRadius=F.radius,Q.shadowMapSize=F.mapSize,a.directionalShadow[p]=Q,a.directionalShadowMap[p]=k,a.directionalShadowMatrix[p]=C.shadow.matrix,y++}a.directional[p]=z,p++}else if(C.isSpotLight){const z=e.get(C);z.position.setFromMatrixPosition(C.matrixWorld),z.color.copy(O).multiplyScalar(H),z.distance=G,z.coneCos=Math.cos(C.angle),z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),z.decay=C.decay,a.spot[S]=z;const F=C.shadow;if(C.map&&(a.spotLightMap[w]=C.map,w++,F.updateMatrices(C),C.castShadow&&A++),a.spotLightMatrix[S]=F.matrix,C.castShadow){const Q=t.get(C);Q.shadowIntensity=F.intensity,Q.shadowBias=F.bias,Q.shadowNormalBias=F.normalBias,Q.shadowRadius=F.radius,Q.shadowMapSize=F.mapSize,a.spotShadow[S]=Q,a.spotShadowMap[S]=k,M++}S++}else if(C.isRectAreaLight){const z=e.get(C);z.color.copy(O).multiplyScalar(H),z.halfWidth.set(C.width*.5,0,0),z.halfHeight.set(0,C.height*.5,0),a.rectArea[m]=z,m++}else if(C.isPointLight){const z=e.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),z.distance=C.distance,z.decay=C.decay,C.castShadow){const F=C.shadow,Q=t.get(C);Q.shadowIntensity=F.intensity,Q.shadowBias=F.bias,Q.shadowNormalBias=F.normalBias,Q.shadowRadius=F.radius,Q.shadowMapSize=F.mapSize,Q.shadowCameraNear=F.camera.near,Q.shadowCameraFar=F.camera.far,a.pointShadow[g]=Q,a.pointShadowMap[g]=k,a.pointShadowMatrix[g]=C.shadow.matrix,b++}a.point[g]=z,g++}else if(C.isHemisphereLight){const z=e.get(C);z.skyColor.copy(C.color).multiplyScalar(H),z.groundColor.copy(C.groundColor).multiplyScalar(H),a.hemi[f]=z,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=ce.LTC_FLOAT_1,a.rectAreaLTC2=ce.LTC_FLOAT_2):(a.rectAreaLTC1=ce.LTC_HALF_1,a.rectAreaLTC2=ce.LTC_HALF_2)),a.ambient[0]=u,a.ambient[1]=h,a.ambient[2]=d;const v=a.hash;(v.directionalLength!==p||v.pointLength!==g||v.spotLength!==S||v.rectAreaLength!==m||v.hemiLength!==f||v.numDirectionalShadows!==y||v.numPointShadows!==b||v.numSpotShadows!==M||v.numSpotMaps!==w||v.numLightProbes!==D)&&(a.directional.length=p,a.spot.length=S,a.rectArea.length=m,a.point.length=g,a.hemi.length=f,a.directionalShadow.length=y,a.directionalShadowMap.length=y,a.pointShadow.length=b,a.pointShadowMap.length=b,a.spotShadow.length=M,a.spotShadowMap.length=M,a.directionalShadowMatrix.length=y,a.pointShadowMatrix.length=b,a.spotLightMatrix.length=M+w-A,a.spotLightMap.length=w,a.numSpotLightShadowsWithMaps=A,a.numLightProbes=D,v.directionalLength=p,v.pointLength=g,v.spotLength=S,v.rectAreaLength=m,v.hemiLength=f,v.numDirectionalShadows=y,v.numPointShadows=b,v.numSpotShadows=M,v.numSpotMaps=w,v.numLightProbes=D,a.version=qg++)}function l(c,u){let h=0,d=0,p=0,g=0,S=0;const m=u.matrixWorldInverse;for(let f=0,y=c.length;f<y;f++){const b=c[f];if(b.isDirectionalLight){const M=a.directional[h];M.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(n),M.direction.transformDirection(m),h++}else if(b.isSpotLight){const M=a.spot[p];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),M.direction.sub(n),M.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const M=a.rectArea[g];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),s.identity(),r.copy(b.matrixWorld),r.premultiply(m),s.extractRotation(r),M.halfWidth.set(b.width*.5,0,0),M.halfHeight.set(0,b.height*.5,0),M.halfWidth.applyMatrix4(s),M.halfHeight.applyMatrix4(s),g++}else if(b.isPointLight){const M=a.point[d];M.position.setFromMatrixPosition(b.matrixWorld),M.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){const M=a.hemi[S];M.direction.setFromMatrixPosition(b.matrixWorld),M.direction.transformDirection(m),S++}}}return{setup:o,setupView:l,state:a}}function rc(i){const e=new jg(i),t=[],a=[];function n(u){c.camera=u,t.length=0,a.length=0}function r(u){t.push(u)}function s(u){a.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:a,camera:null,lights:e,transmissionRenderTarget:{}};return{init:n,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:s}}function $g(i){let e=new WeakMap;function t(n,r=0){const s=e.get(n);let o;return s===void 0?(o=new rc(i),e.set(n,[o])):r>=s.length?(o=new rc(i),s.push(o)):o=s[r],o}function a(){e=new WeakMap}return{get:t,dispose:a}}const Kg=`void main() {
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
}`,Jg=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],Qg=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],sc=new st,hn=new P,xs=new P;function e_(i,e,t){let a=new Jc;const n=new De,r=new De,s=new ft,o=new sd,l=new od,c={},u=t.maxTextureSize,h={[li]:Nt,[Nt]:li,[ni]:ni},d=new ct({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:Kg,fragmentShader:Zg}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new ht;g.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new it(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=or;let f=this.type;this.render=function(A,D,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===Vu&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=or);const T=i.getRenderTarget(),W=i.getActiveCubeFace(),C=i.getActiveMipmapLevel(),O=i.state;O.setBlending(gi),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const H=f!==this.type;H&&D.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(k=>k.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,k=A.length;G<k;G++){const z=A[G],F=z.shadow;if(F===void 0){Ne("WebGLShadowMap:",z,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;n.copy(F.mapSize);const Q=F.getFrameExtents();n.multiply(Q),r.copy(F.mapSize),(n.x>u||n.y>u)&&(n.x>u&&(r.x=Math.floor(u/Q.x),n.x=r.x*Q.x,F.mapSize.x=r.x),n.y>u&&(r.y=Math.floor(u/Q.y),n.y=r.y*Q.y,F.mapSize.y=r.y));const K=i.state.buffers.depth.getReversed();if(F.camera._reversedDepth=K,F.map===null||H===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===pn){if(z.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new Vt(n.x,n.y,{format:Xa,type:jt,minFilter:Rt,magFilter:Rt,generateMipmaps:!1}),F.map.texture.name=z.name+".shadowMap",F.map.depthTexture=new Mn(n.x,n.y,si),F.map.depthTexture.name=z.name+".shadowMapDepth",F.map.depthTexture.format=Ni,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Ct,F.map.depthTexture.magFilter=Ct}else z.isPointLight?(F.map=new ru(n.x),F.map.depthTexture=new Kh(n.x,xi)):(F.map=new Vt(n.x,n.y),F.map.depthTexture=new Mn(n.x,n.y,xi)),F.map.depthTexture.name=z.name+".shadowMap",F.map.depthTexture.format=Ni,this.type===or?(F.map.depthTexture.compareFunction=K?Ho:zo,F.map.depthTexture.minFilter=Rt,F.map.depthTexture.magFilter=Rt):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Ct,F.map.depthTexture.magFilter=Ct);F.camera.updateProjectionMatrix()}const le=F.map.isWebGLCubeRenderTarget?6:1;for(let de=0;de<le;de++){if(F.map.isWebGLCubeRenderTarget)i.setRenderTarget(F.map,de),i.clear();else{de===0&&(i.setRenderTarget(F.map),i.clear());const xe=F.getViewport(de);s.set(r.x*xe.x,r.y*xe.y,r.x*xe.z,r.y*xe.w),O.viewport(s)}if(z.isPointLight){const xe=F.camera,ne=F.matrix,Fe=z.distance||xe.far;Fe!==xe.far&&(xe.far=Fe,xe.updateProjectionMatrix()),hn.setFromMatrixPosition(z.matrixWorld),xe.position.copy(hn),xs.copy(xe.position),xs.add(Jg[de]),xe.up.copy(Qg[de]),xe.lookAt(xs),xe.updateMatrixWorld(),ne.makeTranslation(-hn.x,-hn.y,-hn.z),sc.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),F._frustum.setFromProjectionMatrix(sc,xe.coordinateSystem,xe.reversedDepth)}else F.updateMatrices(z);a=F.getFrustum(),M(D,v,F.camera,z,this.type)}F.isPointLightShadow!==!0&&this.type===pn&&y(F,v),F.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(T,W,C)};function y(A,D){const v=e.update(S);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Vt(n.x,n.y,{format:Xa,type:jt})),d.uniforms.shadow_pass.value=A.map.depthTexture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(D,null,v,d,S,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(D,null,v,p,S,null)}function b(A,D,v,T){let W=null;const C=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)W=C;else if(W=v.isPointLight===!0?l:o,i.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const O=W.uuid,H=D.uuid;let G=c[O];G===void 0&&(G={},c[O]=G);let k=G[H];k===void 0&&(k=W.clone(),G[H]=k,D.addEventListener("dispose",w)),W=k}if(W.visible=D.visible,W.wireframe=D.wireframe,T===pn?W.side=D.shadowSide!==null?D.shadowSide:D.side:W.side=D.shadowSide!==null?D.shadowSide:h[D.side],W.alphaMap=D.alphaMap,W.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,W.map=D.map,W.clipShadows=D.clipShadows,W.clippingPlanes=D.clippingPlanes,W.clipIntersection=D.clipIntersection,W.displacementMap=D.displacementMap,W.displacementScale=D.displacementScale,W.displacementBias=D.displacementBias,W.wireframeLinewidth=D.wireframeLinewidth,W.linewidth=D.linewidth,v.isPointLight===!0&&W.isMeshDistanceMaterial===!0){const O=i.properties.get(W);O.light=v}return W}function M(A,D,v,T,W){if(A.visible===!1)return;if(A.layers.test(D.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&W===pn)&&(!A.frustumCulled||a.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);const O=e.update(A),H=A.material;if(Array.isArray(H)){const G=O.groups;for(let k=0,z=G.length;k<z;k++){const F=G[k],Q=H[F.materialIndex];if(Q&&Q.visible){const K=b(A,Q,T,W);A.onBeforeShadow(i,A,D,v,O,K,F),i.renderBufferDirect(v,null,O,K,A,F),A.onAfterShadow(i,A,D,v,O,K,F)}}}else if(H.visible){const G=b(A,H,T,W);A.onBeforeShadow(i,A,D,v,O,G,null),i.renderBufferDirect(v,null,O,G,A,null),A.onAfterShadow(i,A,D,v,O,G,null)}}const C=A.children;for(let O=0,H=C.length;O<H;O++)M(C[O],D,v,T,W)}function w(A){A.target.removeEventListener("dispose",w);for(const D in c){const v=c[D],T=A.target.uuid;T in v&&(v[T].dispose(),delete v[T])}}}function t_(i,e){function t(){let L=!1;const oe=new ft;let te=null;const ge=new ft(0,0,0,0);return{setMask:function(ee){te!==ee&&!L&&(i.colorMask(ee,ee,ee,ee),te=ee)},setLocked:function(ee){L=ee},setClear:function(ee,X,_e,Le,yt){yt===!0&&(ee*=Le,X*=Le,_e*=Le),oe.set(ee,X,_e,Le),ge.equals(oe)===!1&&(i.clearColor(ee,X,_e,Le),ge.copy(oe))},reset:function(){L=!1,te=null,ge.set(-1,0,0,0)}}}function a(){let L=!1,oe=!1,te=null,ge=null,ee=null;return{setReversed:function(X){if(oe!==X){const _e=e.get("EXT_clip_control");X?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),oe=X;const Le=ee;ee=null,this.setClear(Le)}},getReversed:function(){return oe},setTest:function(X){X?Z(i.DEPTH_TEST):re(i.DEPTH_TEST)},setMask:function(X){te!==X&&!L&&(i.depthMask(X),te=X)},setFunc:function(X){if(oe&&(X=Eh[X]),ge!==X){switch(X){case Ds:i.depthFunc(i.NEVER);break;case Er:i.depthFunc(i.ALWAYS);break;case Is:i.depthFunc(i.LESS);break;case Ga:i.depthFunc(i.LEQUAL);break;case Ns:i.depthFunc(i.EQUAL);break;case Us:i.depthFunc(i.GEQUAL);break;case Os:i.depthFunc(i.GREATER);break;case Fs:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ge=X}},setLocked:function(X){L=X},setClear:function(X){ee!==X&&(ee=X,oe&&(X=1-X),i.clearDepth(X))},reset:function(){L=!1,te=null,ge=null,ee=null,oe=!1}}}function n(){let L=!1,oe=null,te=null,ge=null,ee=null,X=null,_e=null,Le=null,yt=null;return{setTest:function(Ke){L||(Ke?Z(i.STENCIL_TEST):re(i.STENCIL_TEST))},setMask:function(Ke){oe!==Ke&&!L&&(i.stencilMask(Ke),oe=Ke)},setFunc:function(Ke,yi,Mi){(te!==Ke||ge!==yi||ee!==Mi)&&(i.stencilFunc(Ke,yi,Mi),te=Ke,ge=yi,ee=Mi)},setOp:function(Ke,yi,Mi){(X!==Ke||_e!==yi||Le!==Mi)&&(i.stencilOp(Ke,yi,Mi),X=Ke,_e=yi,Le=Mi)},setLocked:function(Ke){L=Ke},setClear:function(Ke){yt!==Ke&&(i.clearStencil(Ke),yt=Ke)},reset:function(){L=!1,oe=null,te=null,ge=null,ee=null,X=null,_e=null,Le=null,yt=null}}}const r=new t,s=new a,o=new n,l=new WeakMap,c=new WeakMap;let u={},h={},d=new WeakMap,p=[],g=null,S=!1,m=null,f=null,y=null,b=null,M=null,w=null,A=null,D=new be(0,0,0),v=0,T=!1,W=null,C=null,O=null,H=null,G=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,F=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(Q)[1]),z=F>=1):Q.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),z=F>=2);let K=null,le={};const de=i.getParameter(i.SCISSOR_BOX),xe=i.getParameter(i.VIEWPORT),ne=new ft().fromArray(de),Fe=new ft().fromArray(xe);function Ue(L,oe,te,ge){const ee=new Uint8Array(4),X=i.createTexture();i.bindTexture(L,X),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _e=0;_e<te;_e++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(oe,0,i.RGBA,1,1,ge,0,i.RGBA,i.UNSIGNED_BYTE,ee):i.texImage2D(oe+_e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ee);return X}const q={};q[i.TEXTURE_2D]=Ue(i.TEXTURE_2D,i.TEXTURE_2D,1),q[i.TEXTURE_CUBE_MAP]=Ue(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[i.TEXTURE_2D_ARRAY]=Ue(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),q[i.TEXTURE_3D]=Ue(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),Z(i.DEPTH_TEST),s.setFunc(Ga),gt(!1),At(al),Z(i.CULL_FACE),Ve(gi);function Z(L){u[L]!==!0&&(i.enable(L),u[L]=!0)}function re(L){u[L]!==!1&&(i.disable(L),u[L]=!1)}function Oe(L,oe){return h[L]!==oe?(i.bindFramebuffer(L,oe),h[L]=oe,L===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=oe),L===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=oe),!0):!1}function we(L,oe){let te=p,ge=!1;if(L){te=d.get(oe),te===void 0&&(te=[],d.set(oe,te));const ee=L.textures;if(te.length!==ee.length||te[0]!==i.COLOR_ATTACHMENT0){for(let X=0,_e=ee.length;X<_e;X++)te[X]=i.COLOR_ATTACHMENT0+X;te.length=ee.length,ge=!0}}else te[0]!==i.BACK&&(te[0]=i.BACK,ge=!0);ge&&i.drawBuffers(te)}function pe(L){return g!==L?(i.useProgram(L),g=L,!0):!1}const je={[ra]:i.FUNC_ADD,[Wu]:i.FUNC_SUBTRACT,[Xu]:i.FUNC_REVERSE_SUBTRACT};je[qu]=i.MIN,je[Yu]=i.MAX;const Qe={[ju]:i.ZERO,[$u]:i.ONE,[Ku]:i.SRC_COLOR,[Ps]:i.SRC_ALPHA,[ih]:i.SRC_ALPHA_SATURATE,[eh]:i.DST_COLOR,[Ju]:i.DST_ALPHA,[Zu]:i.ONE_MINUS_SRC_COLOR,[Ls]:i.ONE_MINUS_SRC_ALPHA,[th]:i.ONE_MINUS_DST_COLOR,[Qu]:i.ONE_MINUS_DST_ALPHA,[ah]:i.CONSTANT_COLOR,[nh]:i.ONE_MINUS_CONSTANT_COLOR,[rh]:i.CONSTANT_ALPHA,[sh]:i.ONE_MINUS_CONSTANT_ALPHA};function Ve(L,oe,te,ge,ee,X,_e,Le,yt,Ke){if(L===gi){S===!0&&(re(i.BLEND),S=!1);return}if(S===!1&&(Z(i.BLEND),S=!0),L!==Gu){if(L!==m||Ke!==T){if((f!==ra||M!==ra)&&(i.blendEquation(i.FUNC_ADD),f=ra,M=ra),Ke)switch(L){case ca:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pt:i.blendFunc(i.ONE,i.ONE);break;case nl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case rl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Xe("WebGLState: Invalid blending: ",L);break}else switch(L){case ca:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Pt:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case nl:Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rl:Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Xe("WebGLState: Invalid blending: ",L);break}y=null,b=null,w=null,A=null,D.set(0,0,0),v=0,m=L,T=Ke}return}ee=ee||oe,X=X||te,_e=_e||ge,(oe!==f||ee!==M)&&(i.blendEquationSeparate(je[oe],je[ee]),f=oe,M=ee),(te!==y||ge!==b||X!==w||_e!==A)&&(i.blendFuncSeparate(Qe[te],Qe[ge],Qe[X],Qe[_e]),y=te,b=ge,w=X,A=_e),(Le.equals(D)===!1||yt!==v)&&(i.blendColor(Le.r,Le.g,Le.b,yt),D.copy(Le),v=yt),m=L,T=!1}function St(L,oe){L.side===ni?re(i.CULL_FACE):Z(i.CULL_FACE);let te=L.side===Nt;oe&&(te=!te),gt(te),L.blending===ca&&L.transparent===!1?Ve(gi):Ve(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),s.setFunc(L.depthFunc),s.setTest(L.depthTest),s.setMask(L.depthWrite),r.setMask(L.colorWrite);const ge=L.stencilWrite;o.setTest(ge),ge&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),_t(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Z(i.SAMPLE_ALPHA_TO_COVERAGE):re(i.SAMPLE_ALPHA_TO_COVERAGE)}function gt(L){W!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),W=L)}function At(L){L!==Hu?(Z(i.CULL_FACE),L!==C&&(L===al?i.cullFace(i.BACK):L===ku?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):re(i.CULL_FACE),C=L}function R(L){L!==O&&(z&&i.lineWidth(L),O=L)}function _t(L,oe,te){L?(Z(i.POLYGON_OFFSET_FILL),(H!==oe||G!==te)&&(H=oe,G=te,s.getReversed()&&(oe=-oe),i.polygonOffset(oe,te))):re(i.POLYGON_OFFSET_FILL)}function $e(L){L?Z(i.SCISSOR_TEST):re(i.SCISSOR_TEST)}function at(L){L===void 0&&(L=i.TEXTURE0+k-1),K!==L&&(i.activeTexture(L),K=L)}function Se(L,oe,te){te===void 0&&(K===null?te=i.TEXTURE0+k-1:te=K);let ge=le[te];ge===void 0&&(ge={type:void 0,texture:void 0},le[te]=ge),(ge.type!==L||ge.texture!==oe)&&(K!==te&&(i.activeTexture(te),K=te),i.bindTexture(L,oe||q[L]),ge.type=L,ge.texture=oe)}function E(){const L=le[K];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function _(){try{i.compressedTexImage2D(...arguments)}catch(L){Xe("WebGLState:",L)}}function I(){try{i.compressedTexImage3D(...arguments)}catch(L){Xe("WebGLState:",L)}}function Y(){try{i.texSubImage2D(...arguments)}catch(L){Xe("WebGLState:",L)}}function $(){try{i.texSubImage3D(...arguments)}catch(L){Xe("WebGLState:",L)}}function j(){try{i.compressedTexSubImage2D(...arguments)}catch(L){Xe("WebGLState:",L)}}function ye(){try{i.compressedTexSubImage3D(...arguments)}catch(L){Xe("WebGLState:",L)}}function se(){try{i.texStorage2D(...arguments)}catch(L){Xe("WebGLState:",L)}}function Te(){try{i.texStorage3D(...arguments)}catch(L){Xe("WebGLState:",L)}}function Me(){try{i.texImage2D(...arguments)}catch(L){Xe("WebGLState:",L)}}function J(){try{i.texImage3D(...arguments)}catch(L){Xe("WebGLState:",L)}}function ie(L){ne.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),ne.copy(L))}function Ee(L){Fe.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Fe.copy(L))}function ve(L,oe){let te=c.get(oe);te===void 0&&(te=new WeakMap,c.set(oe,te));let ge=te.get(L);ge===void 0&&(ge=i.getUniformBlockIndex(oe,L.name),te.set(L,ge))}function he(L,oe){const te=c.get(oe).get(L);l.get(oe)!==te&&(i.uniformBlockBinding(oe,te,L.__bindingPointIndex),l.set(oe,te))}function Ge(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),s.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},K=null,le={},h={},d=new WeakMap,p=[],g=null,S=!1,m=null,f=null,y=null,b=null,M=null,w=null,A=null,D=new be(0,0,0),v=0,T=!1,W=null,C=null,O=null,H=null,G=null,ne.set(0,0,i.canvas.width,i.canvas.height),Fe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:Z,disable:re,bindFramebuffer:Oe,drawBuffers:we,useProgram:pe,setBlending:Ve,setMaterial:St,setFlipSided:gt,setCullFace:At,setLineWidth:R,setPolygonOffset:_t,setScissorTest:$e,activeTexture:at,bindTexture:Se,unbindTexture:E,compressedTexImage2D:_,compressedTexImage3D:I,texImage2D:Me,texImage3D:J,updateUBOMapping:ve,uniformBlockBinding:he,texStorage2D:se,texStorage3D:Te,texSubImage2D:Y,texSubImage3D:$,compressedTexSubImage2D:j,compressedTexSubImage3D:ye,scissor:ie,viewport:Ee,reset:Ge}}function i_(i,e,t,a,n,r,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new De,u=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,_){return p?new OffscreenCanvas(E,_):yn("canvas")}function S(E,_,I){let Y=1;const $=Se(E);if(($.width>I||$.height>I)&&(Y=I/Math.max($.width,$.height)),Y<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const j=Math.floor(Y*$.width),ye=Math.floor(Y*$.height);h===void 0&&(h=g(j,ye));const se=_?g(j,ye):h;return se.width=j,se.height=ye,se.getContext("2d").drawImage(E,0,0,j,ye),Ne("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+j+"x"+ye+")."),se}else return"data"in E&&Ne("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),E;return E}function m(E){return E.generateMipmaps}function f(E){i.generateMipmap(E)}function y(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(E,_,I,Y,$=!1){if(E!==null){if(i[E]!==void 0)return i[E];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let j=_;if(_===i.RED&&(I===i.FLOAT&&(j=i.R32F),I===i.HALF_FLOAT&&(j=i.R16F),I===i.UNSIGNED_BYTE&&(j=i.R8)),_===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(j=i.R8UI),I===i.UNSIGNED_SHORT&&(j=i.R16UI),I===i.UNSIGNED_INT&&(j=i.R32UI),I===i.BYTE&&(j=i.R8I),I===i.SHORT&&(j=i.R16I),I===i.INT&&(j=i.R32I)),_===i.RG&&(I===i.FLOAT&&(j=i.RG32F),I===i.HALF_FLOAT&&(j=i.RG16F),I===i.UNSIGNED_BYTE&&(j=i.RG8)),_===i.RG_INTEGER&&(I===i.UNSIGNED_BYTE&&(j=i.RG8UI),I===i.UNSIGNED_SHORT&&(j=i.RG16UI),I===i.UNSIGNED_INT&&(j=i.RG32UI),I===i.BYTE&&(j=i.RG8I),I===i.SHORT&&(j=i.RG16I),I===i.INT&&(j=i.RG32I)),_===i.RGB_INTEGER&&(I===i.UNSIGNED_BYTE&&(j=i.RGB8UI),I===i.UNSIGNED_SHORT&&(j=i.RGB16UI),I===i.UNSIGNED_INT&&(j=i.RGB32UI),I===i.BYTE&&(j=i.RGB8I),I===i.SHORT&&(j=i.RGB16I),I===i.INT&&(j=i.RGB32I)),_===i.RGBA_INTEGER&&(I===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),I===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),I===i.UNSIGNED_INT&&(j=i.RGBA32UI),I===i.BYTE&&(j=i.RGBA8I),I===i.SHORT&&(j=i.RGBA16I),I===i.INT&&(j=i.RGBA32I)),_===i.RGB&&(I===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),I===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),_===i.RGBA){const ye=$?br:qe.getTransfer(Y);I===i.FLOAT&&(j=i.RGBA32F),I===i.HALF_FLOAT&&(j=i.RGBA16F),I===i.UNSIGNED_BYTE&&(j=ye===Ze?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function M(E,_){let I;return E?_===null||_===xi||_===Sn?I=i.DEPTH24_STENCIL8:_===si?I=i.DEPTH32F_STENCIL8:_===xn&&(I=i.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===xi||_===Sn?I=i.DEPTH_COMPONENT24:_===si?I=i.DEPTH_COMPONENT32F:_===xn&&(I=i.DEPTH_COMPONENT16),I}function w(E,_){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ct&&E.minFilter!==Rt?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function A(E){const _=E.target;_.removeEventListener("dispose",A),v(_),_.isVideoTexture&&u.delete(_)}function D(E){const _=E.target;_.removeEventListener("dispose",D),W(_)}function v(E){const _=a.get(E);if(_.__webglInit===void 0)return;const I=E.source,Y=d.get(I);if(Y){const $=Y[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&T(E),Object.keys(Y).length===0&&d.delete(I)}a.remove(E)}function T(E){const _=a.get(E);i.deleteTexture(_.__webglTexture);const I=E.source,Y=d.get(I);delete Y[_.__cacheKey],s.memory.textures--}function W(E){const _=a.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),a.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let $=0;$<_.__webglFramebuffer[Y].length;$++)i.deleteFramebuffer(_.__webglFramebuffer[Y][$]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const I=E.textures;for(let Y=0,$=I.length;Y<$;Y++){const j=a.get(I[Y]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),s.memory.textures--),a.remove(I[Y])}a.remove(E)}let C=0;function O(){C=0}function H(){const E=C;return E>=n.maxTextures&&Ne("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+n.maxTextures),C+=1,E}function G(E){const _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function k(E,_){const I=a.get(E);if(E.isVideoTexture&&$e(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&I.__version!==E.version){const Y=E.image;if(Y===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{q(I,E,_);return}}else E.isExternalTexture&&(I.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+_)}function z(E,_){const I=a.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&I.__version!==E.version){q(I,E,_);return}else E.isExternalTexture&&(I.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+_)}function F(E,_){const I=a.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&I.__version!==E.version){q(I,E,_);return}t.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+_)}function Q(E,_){const I=a.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&I.__version!==E.version){Z(I,E,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+_)}const K={[Bs]:i.REPEAT,[Pi]:i.CLAMP_TO_EDGE,[zs]:i.MIRRORED_REPEAT},le={[Ct]:i.NEAREST,[ch]:i.NEAREST_MIPMAP_NEAREST,[In]:i.NEAREST_MIPMAP_LINEAR,[Rt]:i.LINEAR,[kr]:i.LINEAR_MIPMAP_NEAREST,[oa]:i.LINEAR_MIPMAP_LINEAR},de={[fh]:i.NEVER,[xh]:i.ALWAYS,[mh]:i.LESS,[zo]:i.LEQUAL,[gh]:i.EQUAL,[Ho]:i.GEQUAL,[_h]:i.GREATER,[vh]:i.NOTEQUAL};function xe(E,_){if(_.type===si&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Rt||_.magFilter===kr||_.magFilter===In||_.magFilter===oa||_.minFilter===Rt||_.minFilter===kr||_.minFilter===In||_.minFilter===oa)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,K[_.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,K[_.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,K[_.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,le[_.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,le[_.minFilter]),_.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,de[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ct||_.minFilter!==In&&_.minFilter!==oa||_.type===si&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||a.get(_).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,n.getMaxAnisotropy())),a.get(_).__currentAnisotropy=_.anisotropy}}}function ne(E,_){let I=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",A));const Y=_.source;let $=d.get(Y);$===void 0&&($={},d.set(Y,$));const j=G(_);if(j!==E.__cacheKey){$[j]===void 0&&($[j]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,I=!0),$[j].usedTimes++;const ye=$[E.__cacheKey];ye!==void 0&&($[E.__cacheKey].usedTimes--,ye.usedTimes===0&&T(_)),E.__cacheKey=j,E.__webglTexture=$[j].texture}return I}function Fe(E,_,I){return Math.floor(Math.floor(E/I)/_)}function Ue(E,_,I,Y){const $=E.updateRanges;if($.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,_.width,_.height,I,Y,_.data);else{$.sort((Me,J)=>Me.start-J.start);let j=0;for(let Me=1;Me<$.length;Me++){const J=$[j],ie=$[Me],Ee=J.start+J.count,ve=Fe(ie.start,_.width,4),he=Fe(J.start,_.width,4);ie.start<=Ee+1&&ve===he&&Fe(ie.start+ie.count-1,_.width,4)===ve?J.count=Math.max(J.count,ie.start+ie.count-J.start):(++j,$[j]=ie)}$.length=j+1;const ye=i.getParameter(i.UNPACK_ROW_LENGTH),se=i.getParameter(i.UNPACK_SKIP_PIXELS),Te=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,_.width);for(let Me=0,J=$.length;Me<J;Me++){const ie=$[Me],Ee=Math.floor(ie.start/4),ve=Math.ceil(ie.count/4),he=Ee%_.width,Ge=Math.floor(Ee/_.width),L=ve;i.pixelStorei(i.UNPACK_SKIP_PIXELS,he),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ge),t.texSubImage2D(i.TEXTURE_2D,0,he,Ge,L,1,I,Y,_.data)}E.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ye),i.pixelStorei(i.UNPACK_SKIP_PIXELS,se),i.pixelStorei(i.UNPACK_SKIP_ROWS,Te)}}function q(E,_,I){let Y=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=i.TEXTURE_3D);const $=ne(E,_),j=_.source;t.bindTexture(Y,E.__webglTexture,i.TEXTURE0+I);const ye=a.get(j);if(j.version!==ye.__version||$===!0){t.activeTexture(i.TEXTURE0+I);const se=qe.getPrimaries(qe.workingColorSpace),Te=_.colorSpace===Xi?null:qe.getPrimaries(_.colorSpace),Me=_.colorSpace===Xi||se===Te?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let J=S(_.image,!1,n.maxTextureSize);J=at(_,J);const ie=r.convert(_.format,_.colorSpace),Ee=r.convert(_.type);let ve=b(_.internalFormat,ie,Ee,_.colorSpace,_.isVideoTexture);xe(Y,_);let he;const Ge=_.mipmaps,L=_.isVideoTexture!==!0,oe=ye.__version===void 0||$===!0,te=j.dataReady,ge=w(_,J);if(_.isDepthTexture)ve=M(_.format===la,_.type),oe&&(L?t.texStorage2D(i.TEXTURE_2D,1,ve,J.width,J.height):t.texImage2D(i.TEXTURE_2D,0,ve,J.width,J.height,0,ie,Ee,null));else if(_.isDataTexture)if(Ge.length>0){L&&oe&&t.texStorage2D(i.TEXTURE_2D,ge,ve,Ge[0].width,Ge[0].height);for(let ee=0,X=Ge.length;ee<X;ee++)he=Ge[ee],L?te&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,he.width,he.height,ie,Ee,he.data):t.texImage2D(i.TEXTURE_2D,ee,ve,he.width,he.height,0,ie,Ee,he.data);_.generateMipmaps=!1}else L?(oe&&t.texStorage2D(i.TEXTURE_2D,ge,ve,J.width,J.height),te&&Ue(_,J,ie,Ee)):t.texImage2D(i.TEXTURE_2D,0,ve,J.width,J.height,0,ie,Ee,J.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){L&&oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,ve,Ge[0].width,Ge[0].height,J.depth);for(let ee=0,X=Ge.length;ee<X;ee++)if(he=Ge[ee],_.format!==oi)if(ie!==null)if(L){if(te)if(_.layerUpdates.size>0){const _e=Fl(he.width,he.height,_.format,_.type);for(const Le of _.layerUpdates){const yt=he.data.subarray(Le*_e/he.data.BYTES_PER_ELEMENT,(Le+1)*_e/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,Le,he.width,he.height,1,ie,yt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,J.depth,ie,he.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,ve,he.width,he.height,J.depth,0,he.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?te&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,he.width,he.height,J.depth,ie,Ee,he.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,ve,he.width,he.height,J.depth,0,ie,Ee,he.data)}else{L&&oe&&t.texStorage2D(i.TEXTURE_2D,ge,ve,Ge[0].width,Ge[0].height);for(let ee=0,X=Ge.length;ee<X;ee++)he=Ge[ee],_.format!==oi?ie!==null?L?te&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,he.width,he.height,ie,he.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,ve,he.width,he.height,0,he.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?te&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,he.width,he.height,ie,Ee,he.data):t.texImage2D(i.TEXTURE_2D,ee,ve,he.width,he.height,0,ie,Ee,he.data)}else if(_.isDataArrayTexture)if(L){if(oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,ve,J.width,J.height,J.depth),te)if(_.layerUpdates.size>0){const ee=Fl(J.width,J.height,_.format,_.type);for(const X of _.layerUpdates){const _e=J.data.subarray(X*ee/J.data.BYTES_PER_ELEMENT,(X+1)*ee/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,X,J.width,J.height,1,ie,Ee,_e)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ie,Ee,J.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ve,J.width,J.height,J.depth,0,ie,Ee,J.data);else if(_.isData3DTexture)L?(oe&&t.texStorage3D(i.TEXTURE_3D,ge,ve,J.width,J.height,J.depth),te&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ie,Ee,J.data)):t.texImage3D(i.TEXTURE_3D,0,ve,J.width,J.height,J.depth,0,ie,Ee,J.data);else if(_.isFramebufferTexture){if(oe)if(L)t.texStorage2D(i.TEXTURE_2D,ge,ve,J.width,J.height);else{let ee=J.width,X=J.height;for(let _e=0;_e<ge;_e++)t.texImage2D(i.TEXTURE_2D,_e,ve,ee,X,0,ie,Ee,null),ee>>=1,X>>=1}}else if(Ge.length>0){if(L&&oe){const ee=Se(Ge[0]);t.texStorage2D(i.TEXTURE_2D,ge,ve,ee.width,ee.height)}for(let ee=0,X=Ge.length;ee<X;ee++)he=Ge[ee],L?te&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ie,Ee,he):t.texImage2D(i.TEXTURE_2D,ee,ve,ie,Ee,he);_.generateMipmaps=!1}else if(L){if(oe){const ee=Se(J);t.texStorage2D(i.TEXTURE_2D,ge,ve,ee.width,ee.height)}te&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie,Ee,J)}else t.texImage2D(i.TEXTURE_2D,0,ve,ie,Ee,J);m(_)&&f(Y),ye.__version=j.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function Z(E,_,I){if(_.image.length!==6)return;const Y=ne(E,_),$=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+I);const j=a.get($);if($.version!==j.__version||Y===!0){t.activeTexture(i.TEXTURE0+I);const ye=qe.getPrimaries(qe.workingColorSpace),se=_.colorSpace===Xi?null:qe.getPrimaries(_.colorSpace),Te=_.colorSpace===Xi||ye===se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Me=_.isCompressedTexture||_.image[0].isCompressedTexture,J=_.image[0]&&_.image[0].isDataTexture,ie=[];for(let X=0;X<6;X++)!Me&&!J?ie[X]=S(_.image[X],!0,n.maxCubemapSize):ie[X]=J?_.image[X].image:_.image[X],ie[X]=at(_,ie[X]);const Ee=ie[0],ve=r.convert(_.format,_.colorSpace),he=r.convert(_.type),Ge=b(_.internalFormat,ve,he,_.colorSpace),L=_.isVideoTexture!==!0,oe=j.__version===void 0||Y===!0,te=$.dataReady;let ge=w(_,Ee);xe(i.TEXTURE_CUBE_MAP,_);let ee;if(Me){L&&oe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Ge,Ee.width,Ee.height);for(let X=0;X<6;X++){ee=ie[X].mipmaps;for(let _e=0;_e<ee.length;_e++){const Le=ee[_e];_.format!==oi?ve!==null?L?te&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,0,0,Le.width,Le.height,ve,Le.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,Ge,Le.width,Le.height,0,Le.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,0,0,Le.width,Le.height,ve,he,Le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e,Ge,Le.width,Le.height,0,ve,he,Le.data)}}}else{if(ee=_.mipmaps,L&&oe){ee.length>0&&ge++;const X=Se(ie[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Ge,X.width,X.height)}for(let X=0;X<6;X++)if(J){L?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,ie[X].width,ie[X].height,ve,he,ie[X].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ge,ie[X].width,ie[X].height,0,ve,he,ie[X].data);for(let _e=0;_e<ee.length;_e++){const Le=ee[_e].image[X].image;L?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,0,0,Le.width,Le.height,ve,he,Le.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,Ge,Le.width,Le.height,0,ve,he,Le.data)}}else{L?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,ve,he,ie[X]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ge,ve,he,ie[X]);for(let _e=0;_e<ee.length;_e++){const Le=ee[_e];L?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,0,0,ve,he,Le.image[X]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,_e+1,Ge,ve,he,Le.image[X])}}}m(_)&&f(i.TEXTURE_CUBE_MAP),j.__version=$.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function re(E,_,I,Y,$,j){const ye=r.convert(I.format,I.colorSpace),se=r.convert(I.type),Te=b(I.internalFormat,ye,se,I.colorSpace),Me=a.get(_),J=a.get(I);if(J.__renderTarget=_,!Me.__hasExternalTextures){const ie=Math.max(1,_.width>>j),Ee=Math.max(1,_.height>>j);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?t.texImage3D($,j,Te,ie,Ee,_.depth,0,ye,se,null):t.texImage2D($,j,Te,ie,Ee,0,ye,se,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),_t(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,$,J.__webglTexture,0,R(_)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,$,J.__webglTexture,j),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(E,_,I){if(i.bindRenderbuffer(i.RENDERBUFFER,E),_.depthBuffer){const Y=_.depthTexture,$=Y&&Y.isDepthTexture?Y.type:null,j=M(_.stencilBuffer,$),ye=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;_t(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,R(_),j,_.width,_.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,R(_),j,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,j,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ye,i.RENDERBUFFER,E)}else{const Y=_.textures;for(let $=0;$<Y.length;$++){const j=Y[$],ye=r.convert(j.format,j.colorSpace),se=r.convert(j.type),Te=b(j.internalFormat,ye,se,j.colorSpace);_t(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,R(_),Te,_.width,_.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,R(_),Te,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,Te,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function we(E,_,I){const Y=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=a.get(_.depthTexture);if($.__renderTarget=_,(!$.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y){if($.__webglInit===void 0&&($.__webglInit=!0,_.depthTexture.addEventListener("dispose",A)),$.__webglTexture===void 0){$.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),xe(i.TEXTURE_CUBE_MAP,_.depthTexture);const Me=r.convert(_.depthTexture.format),J=r.convert(_.depthTexture.type);let ie;_.depthTexture.format===Ni?ie=i.DEPTH_COMPONENT24:_.depthTexture.format===la&&(ie=i.DEPTH24_STENCIL8);for(let Ee=0;Ee<6;Ee++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,ie,_.width,_.height,0,Me,J,null)}}else k(_.depthTexture,0);const j=$.__webglTexture,ye=R(_),se=Y?i.TEXTURE_CUBE_MAP_POSITIVE_X+I:i.TEXTURE_2D,Te=_.depthTexture.format===la?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(_.depthTexture.format===Ni)_t(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Te,se,j,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,Te,se,j,0);else if(_.depthTexture.format===la)_t(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Te,se,j,0,ye):i.framebufferTexture2D(i.FRAMEBUFFER,Te,se,j,0);else throw new Error("Unknown depthTexture format")}function pe(E){const _=a.get(E),I=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){const Y=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const $=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",$)};Y.addEventListener("dispose",$),_.__depthDisposeCallback=$}_.__boundDepthTexture=Y}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(I)for(let Y=0;Y<6;Y++)we(_.__webglFramebuffer[Y],E,Y);else{const Y=E.texture.mipmaps;Y&&Y.length>0?we(_.__webglFramebuffer[0],E,0):we(_.__webglFramebuffer,E,0)}else if(I){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=i.createRenderbuffer(),Oe(_.__webglDepthbuffer[Y],E,!1);else{const $=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=_.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,j)}}else{const Y=E.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),Oe(_.__webglDepthbuffer,E,!1);else{const $=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,j)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function je(E,_,I){const Y=a.get(E);_!==void 0&&re(Y.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&pe(E)}function Qe(E){const _=E.texture,I=a.get(E),Y=a.get(_);E.addEventListener("dispose",D);const $=E.textures,j=E.isWebGLCubeRenderTarget===!0,ye=$.length>1;if(ye||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=_.version,s.memory.textures++),j){I.__webglFramebuffer=[];for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer[se]=[];for(let Te=0;Te<_.mipmaps.length;Te++)I.__webglFramebuffer[se][Te]=i.createFramebuffer()}else I.__webglFramebuffer[se]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer=[];for(let se=0;se<_.mipmaps.length;se++)I.__webglFramebuffer[se]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(ye)for(let se=0,Te=$.length;se<Te;se++){const Me=a.get($[se]);Me.__webglTexture===void 0&&(Me.__webglTexture=i.createTexture(),s.memory.textures++)}if(E.samples>0&&_t(E)===!1){I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let se=0;se<$.length;se++){const Te=$[se];I.__webglColorRenderbuffer[se]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[se]);const Me=r.convert(Te.format,Te.colorSpace),J=r.convert(Te.type),ie=b(Te.internalFormat,Me,J,Te.colorSpace,E.isXRRenderTarget===!0),Ee=R(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,ie,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.RENDERBUFFER,I.__webglColorRenderbuffer[se])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),Oe(I.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),xe(i.TEXTURE_CUBE_MAP,_);for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0)for(let Te=0;Te<_.mipmaps.length;Te++)re(I.__webglFramebuffer[se][Te],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Te);else re(I.__webglFramebuffer[se],E,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);m(_)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let se=0,Te=$.length;se<Te;se++){const Me=$[se],J=a.get(Me);let ie=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ie=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,J.__webglTexture),xe(ie,Me),re(I.__webglFramebuffer,E,Me,i.COLOR_ATTACHMENT0+se,ie,0),m(Me)&&f(ie)}t.unbindTexture()}else{let se=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(se=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,Y.__webglTexture),xe(se,_),_.mipmaps&&_.mipmaps.length>0)for(let Te=0;Te<_.mipmaps.length;Te++)re(I.__webglFramebuffer[Te],E,_,i.COLOR_ATTACHMENT0,se,Te);else re(I.__webglFramebuffer,E,_,i.COLOR_ATTACHMENT0,se,0);m(_)&&f(se),t.unbindTexture()}E.depthBuffer&&pe(E)}function Ve(E){const _=E.textures;for(let I=0,Y=_.length;I<Y;I++){const $=_[I];if(m($)){const j=y(E),ye=a.get($).__webglTexture;t.bindTexture(j,ye),f(j),t.unbindTexture()}}}const St=[],gt=[];function At(E){if(E.samples>0){if(_t(E)===!1){const _=E.textures,I=E.width,Y=E.height;let $=i.COLOR_BUFFER_BIT;const j=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ye=a.get(E),se=_.length>1;if(se)for(let Me=0;Me<_.length;Me++)t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);const Te=E.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let Me=0;Me<_.length;Me++){if(E.resolveDepthBuffer&&(E.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),se){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ye.__webglColorRenderbuffer[Me]);const J=a.get(_[Me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,J,0)}i.blitFramebuffer(0,0,I,Y,0,0,I,Y,$,i.NEAREST),l===!0&&(St.length=0,gt.length=0,St.push(i.COLOR_ATTACHMENT0+Me),E.depthBuffer&&E.resolveDepthBuffer===!1&&(St.push(j),gt.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,gt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,St))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),se)for(let Me=0;Me<_.length;Me++){t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.RENDERBUFFER,ye.__webglColorRenderbuffer[Me]);const J=a.get(_[Me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ye.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Me,i.TEXTURE_2D,J,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const _=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function R(E){return Math.min(n.maxSamples,E.samples)}function _t(E){const _=a.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function $e(E){const _=s.render.frame;u.get(E)!==_&&(u.set(E,_),E.update())}function at(E,_){const I=E.colorSpace,Y=E.format,$=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||I!==qa&&I!==Xi&&(qe.getTransfer(I)===Ze?(Y!==oi||$!==Zt)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Xe("WebGLTextures: Unsupported texture color space:",I)),_}function Se(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=O,this.setTexture2D=k,this.setTexture2DArray=z,this.setTexture3D=F,this.setTextureCube=Q,this.rebindTextures=je,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=At,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=re,this.useMultisampledRTT=_t,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function a_(i,e){function t(a,n=Xi){let r;const s=qe.getTransfer(n);if(a===Zt)return i.UNSIGNED_BYTE;if(a===Io)return i.UNSIGNED_SHORT_4_4_4_4;if(a===No)return i.UNSIGNED_SHORT_5_5_5_1;if(a===zc)return i.UNSIGNED_INT_5_9_9_9_REV;if(a===Hc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(a===Fc)return i.BYTE;if(a===Bc)return i.SHORT;if(a===xn)return i.UNSIGNED_SHORT;if(a===Do)return i.INT;if(a===xi)return i.UNSIGNED_INT;if(a===si)return i.FLOAT;if(a===jt)return i.HALF_FLOAT;if(a===kc)return i.ALPHA;if(a===Vc)return i.RGB;if(a===oi)return i.RGBA;if(a===Ni)return i.DEPTH_COMPONENT;if(a===la)return i.DEPTH_STENCIL;if(a===Uo)return i.RED;if(a===Oo)return i.RED_INTEGER;if(a===Xa)return i.RG;if(a===Fo)return i.RG_INTEGER;if(a===Bo)return i.RGBA_INTEGER;if(a===lr||a===cr||a===ur||a===hr)if(s===Ze)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(a===lr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(a===lr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===cr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===ur)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===hr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Hs||a===ks||a===Vs||a===Gs)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(a===Hs)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===ks)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Vs)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Gs)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Ws||a===Xs||a===qs||a===Ys||a===js||a===$s||a===Ks)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(a===Ws||a===Xs)return s===Ze?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(a===qs)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(a===Ys)return r.COMPRESSED_R11_EAC;if(a===js)return r.COMPRESSED_SIGNED_R11_EAC;if(a===$s)return r.COMPRESSED_RG11_EAC;if(a===Ks)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(a===Zs||a===Js||a===Qs||a===eo||a===to||a===io||a===ao||a===no||a===ro||a===so||a===oo||a===lo||a===co||a===uo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(a===Zs)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Js)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===Qs)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===eo)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===to)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===io)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===ao)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===no)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===ro)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===so)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===oo)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===lo)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===co)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===uo)return s===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===ho||a===po||a===fo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(a===ho)return s===Ze?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===po)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===fo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===mo||a===go||a===_o||a===vo)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(a===mo)return r.COMPRESSED_RED_RGTC1_EXT;if(a===go)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===_o)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===vo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===Sn?i.UNSIGNED_INT_24_8:i[a]!==void 0?i[a]:null}return{convert:t}}const n_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,r_=`
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

}`;class s_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const a=new tu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,a=new ct({vertexShader:n_,fragmentShader:r_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new it(new Ui(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class o_ extends fa{constructor(e,t){super();const a=this;let n=null,r=1,s=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,p=null,g=null;const S=typeof XRWebGLBinding<"u",m=new s_,f={},y=t.getContextAttributes();let b=null,M=null;const w=[],A=[],D=new De;let v=null;const T=new Yt;T.viewport=new ft;const W=new Yt;W.viewport=new ft;const C=[T,W],O=new fd;let H=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=w[q];return Z===void 0&&(Z=new jr,w[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=w[q];return Z===void 0&&(Z=new jr,w[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=w[q];return Z===void 0&&(Z=new jr,w[q]=Z),Z.getHandSpace()};function k(q){const Z=A.indexOf(q.inputSource);if(Z===-1)return;const re=w[Z];re!==void 0&&(re.update(q.inputSource,q.frame,c||s),re.dispatchEvent({type:q.type,data:q.inputSource}))}function z(){n.removeEventListener("select",k),n.removeEventListener("selectstart",k),n.removeEventListener("selectend",k),n.removeEventListener("squeeze",k),n.removeEventListener("squeezestart",k),n.removeEventListener("squeezeend",k),n.removeEventListener("end",z),n.removeEventListener("inputsourceschange",F);for(let q=0;q<w.length;q++){const Z=A[q];Z!==null&&(A[q]=null,w[q].disconnect(Z))}H=null,G=null,m.reset();for(const q in f)delete f[q];e.setRenderTarget(b),p=null,d=null,h=null,n=null,M=null,Ue.stop(),a.isPresenting=!1,e.setPixelRatio(v),e.setSize(D.width,D.height,!1),a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,a.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,a.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h===null&&S&&(h=new XRWebGLBinding(n,t)),h},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(q){if(n=q,n!==null){if(b=e.getRenderTarget(),n.addEventListener("select",k),n.addEventListener("selectstart",k),n.addEventListener("selectend",k),n.addEventListener("squeeze",k),n.addEventListener("squeezestart",k),n.addEventListener("squeezeend",k),n.addEventListener("end",z),n.addEventListener("inputsourceschange",F),y.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(D),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let Z=null,re=null,Oe=null;y.depth&&(Oe=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Z=y.stencil?la:Ni,re=y.stencil?Sn:xi);const we={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(we),n.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new Vt(d.textureWidth,d.textureHeight,{format:oi,type:Zt,depthTexture:new Mn(d.textureWidth,d.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Z={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(n,t,Z),n.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new Vt(p.framebufferWidth,p.framebufferHeight,{format:oi,type:Zt,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await n.requestReferenceSpace(o),Ue.setContext(n),Ue.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function F(q){for(let Z=0;Z<q.removed.length;Z++){const re=q.removed[Z],Oe=A.indexOf(re);Oe>=0&&(A[Oe]=null,w[Oe].disconnect(re))}for(let Z=0;Z<q.added.length;Z++){const re=q.added[Z];let Oe=A.indexOf(re);if(Oe===-1){for(let pe=0;pe<w.length;pe++)if(pe>=A.length){A.push(re),Oe=pe;break}else if(A[pe]===null){A[pe]=re,Oe=pe;break}if(Oe===-1)break}const we=w[Oe];we&&we.connect(re)}}const Q=new P,K=new P;function le(q,Z,re){Q.setFromMatrixPosition(Z.matrixWorld),K.setFromMatrixPosition(re.matrixWorld);const Oe=Q.distanceTo(K),we=Z.projectionMatrix.elements,pe=re.projectionMatrix.elements,je=we[14]/(we[10]-1),Qe=we[14]/(we[10]+1),Ve=(we[9]+1)/we[5],St=(we[9]-1)/we[5],gt=(we[8]-1)/we[0],At=(pe[8]+1)/pe[0],R=je*gt,_t=je*At,$e=Oe/(-gt+At),at=$e*-gt;if(Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(at),q.translateZ($e),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),we[10]===-1)q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const Se=je+$e,E=Qe+$e,_=R-at,I=_t+(Oe-at),Y=Ve*Qe/E*Se,$=St*Qe/E*Se;q.projectionMatrix.makePerspective(_,I,Y,$,Se,E),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function de(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(n===null)return;let Z=q.near,re=q.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(re=m.depthFar)),O.near=W.near=T.near=Z,O.far=W.far=T.far=re,(H!==O.near||G!==O.far)&&(n.updateRenderState({depthNear:O.near,depthFar:O.far}),H=O.near,G=O.far),O.layers.mask=q.layers.mask|6,T.layers.mask=O.layers.mask&-5,W.layers.mask=O.layers.mask&-3;const Oe=q.parent,we=O.cameras;de(O,Oe);for(let pe=0;pe<we.length;pe++)de(we[pe],Oe);we.length===2?le(O,T,W):O.projectionMatrix.copy(T.projectionMatrix),xe(q,O,Oe)};function xe(q,Z,re){re===null?q.matrix.copy(Z.matrixWorld):(q.matrix.copy(re.matrixWorld),q.matrix.invert(),q.matrix.multiply(Z.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=xo*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(O)},this.getCameraTexture=function(q){return f[q]};let ne=null;function Fe(q,Z){if(u=Z.getViewerPose(c||s),g=Z,u!==null){const re=u.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let Oe=!1;re.length!==O.cameras.length&&(O.cameras.length=0,Oe=!0);for(let pe=0;pe<re.length;pe++){const je=re[pe];let Qe=null;if(p!==null)Qe=p.getViewport(je);else{const St=h.getViewSubImage(d,je);Qe=St.viewport,pe===0&&(e.setRenderTargetTextures(M,St.colorTexture,St.depthStencilTexture),e.setRenderTarget(M))}let Ve=C[pe];Ve===void 0&&(Ve=new Yt,Ve.layers.enable(pe),Ve.viewport=new ft,C[pe]=Ve),Ve.matrix.fromArray(je.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(je.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),pe===0&&(O.matrix.copy(Ve.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Oe===!0&&O.cameras.push(Ve)}const we=n.enabledFeatures;if(we&&we.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&S){h=a.getBinding();const pe=h.getDepthInformation(re[0]);pe&&pe.isValid&&pe.texture&&m.init(pe,n.renderState)}if(we&&we.includes("camera-access")&&S){e.state.unbindTexture(),h=a.getBinding();for(let pe=0;pe<re.length;pe++){const je=re[pe].camera;if(je){let Qe=f[je];Qe||(Qe=new tu,f[je]=Qe);const Ve=h.getCameraImage(je);Qe.sourceTexture=Ve}}}}for(let re=0;re<w.length;re++){const Oe=A[re],we=w[re];Oe!==null&&we!==void 0&&we.update(Oe,Z,c||s)}ne&&ne(q,Z),Z.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:Z}),g=null}const Ue=new nu;Ue.setAnimationLoop(Fe),this.setAnimationLoop=function(q){ne=q},this.dispose=function(){}}}const na=new ha,l_=new st;function c_(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function a(m,f){f.color.getRGB(m.fogColor.value,iu(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function n(m,f,y,b,M){f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),h(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,M)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),S(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(s(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,y,b):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Nt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Nt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const y=e.get(f),b=y.envMap,M=y.envMapRotation;b&&(m.envMap.value=b,na.copy(M),na.x*=-1,na.y*=-1,na.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(na.y*=-1,na.z*=-1),m.envMapRotation.value.setFromMatrix4(l_.makeRotationFromEuler(na)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function s(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,y,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*y,m.scale.value=b*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,y){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Nt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function S(m,f){const y=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:n}}function u_(i,e,t,a){let n={},r={},s=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,b){const M=b.program;a.uniformBlockBinding(y,M)}function c(y,b){let M=n[y.id];M===void 0&&(g(y),M=u(y),n[y.id]=M,y.addEventListener("dispose",m));const w=b.program;a.updateUBOMapping(y,w);const A=e.render.frame;r[y.id]!==A&&(d(y),r[y.id]=A)}function u(y){const b=h();y.__bindingPointIndex=b;const M=i.createBuffer(),w=y.__size,A=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,w,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,M),M}function h(){for(let y=0;y<o;y++)if(s.indexOf(y)===-1)return s.push(y),y;return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const b=n[y.id],M=y.uniforms,w=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let A=0,D=M.length;A<D;A++){const v=Array.isArray(M[A])?M[A]:[M[A]];for(let T=0,W=v.length;T<W;T++){const C=v[T];if(p(C,A,T,w)===!0){const O=C.__offset,H=Array.isArray(C.value)?C.value:[C.value];let G=0;for(let k=0;k<H.length;k++){const z=H[k],F=S(z);typeof z=="number"||typeof z=="boolean"?(C.__data[0]=z,i.bufferSubData(i.UNIFORM_BUFFER,O+G,C.__data)):z.isMatrix3?(C.__data[0]=z.elements[0],C.__data[1]=z.elements[1],C.__data[2]=z.elements[2],C.__data[3]=0,C.__data[4]=z.elements[3],C.__data[5]=z.elements[4],C.__data[6]=z.elements[5],C.__data[7]=0,C.__data[8]=z.elements[6],C.__data[9]=z.elements[7],C.__data[10]=z.elements[8],C.__data[11]=0):(z.toArray(C.__data,G),G+=F.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,C.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,b,M,w){const A=y.value,D=b+"_"+M;if(w[D]===void 0)return typeof A=="number"||typeof A=="boolean"?w[D]=A:w[D]=A.clone(),!0;{const v=w[D];if(typeof A=="number"||typeof A=="boolean"){if(v!==A)return w[D]=A,!0}else if(v.equals(A)===!1)return v.copy(A),!0}return!1}function g(y){const b=y.uniforms;let M=0;const w=16;for(let D=0,v=b.length;D<v;D++){const T=Array.isArray(b[D])?b[D]:[b[D]];for(let W=0,C=T.length;W<C;W++){const O=T[W],H=Array.isArray(O.value)?O.value:[O.value];for(let G=0,k=H.length;G<k;G++){const z=H[G],F=S(z),Q=M%w,K=Q%F.boundary,le=Q+K;M+=K,le!==0&&w-le<F.storage&&(M+=w-le),O.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=M,M+=F.storage}}}const A=M%w;return A>0&&(M+=w-A),y.__size=M,y.__cache={},this}function S(y){const b={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(b.boundary=4,b.storage=4):y.isVector2?(b.boundary=8,b.storage=8):y.isVector3||y.isColor?(b.boundary=16,b.storage=12):y.isVector4?(b.boundary=16,b.storage=16):y.isMatrix3?(b.boundary=48,b.storage=48):y.isMatrix4?(b.boundary=64,b.storage=64):y.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ne("WebGLRenderer: Unsupported uniform value type.",y),b}function m(y){const b=y.target;b.removeEventListener("dispose",m);const M=s.indexOf(b.__bindingPointIndex);s.splice(M,1),i.deleteBuffer(n[b.id]),delete n[b.id],delete r[b.id]}function f(){for(const y in n)i.deleteBuffer(n[y]);s=[],n={},r={}}return{bind:l,update:c,dispose:f}}const h_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let hi=null;function d_(){return hi===null&&(hi=new Zc(h_,16,16,Xa,jt),hi.name="DFG_LUT",hi.minFilter=Rt,hi.magFilter=Rt,hi.wrapS=Pi,hi.wrapT=Pi,hi.generateMipmaps=!1,hi.needsUpdate=!0),hi}class Xo{constructor(e={}){const{canvas:t=yh(),context:a=null,depth:n=!0,stencil:r=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:p=Zt}=e;this.isWebGLRenderer=!0;let g;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=a.getContextAttributes().alpha}else g=s;const S=p,m=new Set([Bo,Fo,Oo]),f=new Set([Zt,xi,xn,Sn,Io,No]),y=new Uint32Array(4),b=new Int32Array(4);let M=null,w=null;const A=[],D=[];let v=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_i,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const T=this;let W=!1;this._outputColorSpace=Ht;let C=0,O=0,H=null,G=-1,k=null;const z=new ft,F=new ft;let Q=null;const K=new be(0);let le=0,de=t.width,xe=t.height,ne=1,Fe=null,Ue=null;const q=new ft(0,0,de,xe),Z=new ft(0,0,de,xe);let re=!1;const Oe=new Jc;let we=!1,pe=!1;const je=new st,Qe=new P,Ve=new ft,St={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let gt=!1;function At(){return H===null?ne:1}let R=a;function _t(x,N){return t.getContext(x,N)}try{const x={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Lo}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",Le,!1),t.addEventListener("webglcontextcreationerror",yt,!1),R===null){const N="webgl2";if(R=_t(N,x),R===null)throw _t(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw Xe("WebGLRenderer: "+x.message),x}let $e,at,Se,E,_,I,Y,$,j,ye,se,Te,Me,J,ie,Ee,ve,he,Ge,L,oe,te,ge;function ee(){$e=new pm(R),$e.init(),oe=new a_(R,$e),at=new rm(R,$e,e,oe),Se=new t_(R,$e),at.reversedDepthBuffer&&d&&Se.buffers.depth.setReversed(!0),E=new gm(R),_=new kg,I=new i_(R,$e,Se,_,at,oe,E),Y=new dm(T),$=new Sd(R),te=new am(R,$),j=new fm(R,$,E,te),ye=new vm(R,j,$,te,E),he=new _m(R,at,I),ie=new sm(_),se=new Hg(T,Y,$e,at,te,ie),Te=new c_(T,_),Me=new Gg,J=new $g($e),ve=new im(T,Y,Se,ye,g,l),Ee=new e_(T,ye,at),ge=new u_(R,E,at,Se),Ge=new nm(R,$e,E),L=new mm(R,$e,E),E.programs=se.programs,T.capabilities=at,T.extensions=$e,T.properties=_,T.renderLists=Me,T.shadowMap=Ee,T.state=Se,T.info=E}ee(),S!==Zt&&(v=new Sm(S,t.width,t.height,n,r));const X=new o_(T,R);this.xr=X,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const x=$e.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=$e.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(x){x!==void 0&&(ne=x,this.setSize(de,xe,!1))},this.getSize=function(x){return x.set(de,xe)},this.setSize=function(x,N,V=!0){if(X.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}de=x,xe=N,t.width=Math.floor(x*ne),t.height=Math.floor(N*ne),V===!0&&(t.style.width=x+"px",t.style.height=N+"px"),v!==null&&v.setSize(t.width,t.height),this.setViewport(0,0,x,N)},this.getDrawingBufferSize=function(x){return x.set(de*ne,xe*ne).floor()},this.setDrawingBufferSize=function(x,N,V){de=x,xe=N,ne=V,t.width=Math.floor(x*V),t.height=Math.floor(N*V),this.setViewport(0,0,x,N)},this.setEffects=function(x){if(S===Zt){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let N=0;N<x.length;N++)if(x[N].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(z)},this.getViewport=function(x){return x.copy(q)},this.setViewport=function(x,N,V,B){x.isVector4?q.set(x.x,x.y,x.z,x.w):q.set(x,N,V,B),Se.viewport(z.copy(q).multiplyScalar(ne).round())},this.getScissor=function(x){return x.copy(Z)},this.setScissor=function(x,N,V,B){x.isVector4?Z.set(x.x,x.y,x.z,x.w):Z.set(x,N,V,B),Se.scissor(F.copy(Z).multiplyScalar(ne).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(x){Se.setScissorTest(re=x)},this.setOpaqueSort=function(x){Fe=x},this.setTransparentSort=function(x){Ue=x},this.getClearColor=function(x){return x.copy(ve.getClearColor())},this.setClearColor=function(){ve.setClearColor(...arguments)},this.getClearAlpha=function(){return ve.getClearAlpha()},this.setClearAlpha=function(){ve.setClearAlpha(...arguments)},this.clear=function(x=!0,N=!0,V=!0){let B=0;if(x){let U=!1;if(H!==null){const ae=H.texture.format;U=m.has(ae)}if(U){const ae=H.texture.type,ue=f.has(ae),me=ve.getClearColor(),fe=ve.getClearAlpha(),Ie=me.r,ze=me.g,We=me.b;ue?(y[0]=Ie,y[1]=ze,y[2]=We,y[3]=fe,R.clearBufferuiv(R.COLOR,0,y)):(b[0]=Ie,b[1]=ze,b[2]=We,b[3]=fe,R.clearBufferiv(R.COLOR,0,b))}else B|=R.COLOR_BUFFER_BIT}N&&(B|=R.DEPTH_BUFFER_BIT),V&&(B|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&R.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",Le,!1),t.removeEventListener("webglcontextcreationerror",yt,!1),ve.dispose(),Me.dispose(),J.dispose(),_.dispose(),Y.dispose(),ye.dispose(),te.dispose(),ge.dispose(),se.dispose(),X.dispose(),X.removeEventListener("sessionstart",$o),X.removeEventListener("sessionend",Ko),Ki.stop()};function _e(x){x.preventDefault(),ul("WebGLRenderer: Context Lost."),W=!0}function Le(){ul("WebGLRenderer: Context Restored."),W=!1;const x=E.autoReset,N=Ee.enabled,V=Ee.autoUpdate,B=Ee.needsUpdate,U=Ee.type;ee(),E.autoReset=x,Ee.enabled=N,Ee.autoUpdate=V,Ee.needsUpdate=B,Ee.type=U}function yt(x){Xe("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Ke(x){const N=x.target;N.removeEventListener("dispose",Ke),yi(N)}function yi(x){Mi(x),_.remove(x)}function Mi(x){const N=_.get(x).programs;N!==void 0&&(N.forEach(function(V){se.releaseProgram(V)}),x.isShaderMaterial&&se.releaseShaderCache(x))}this.renderBufferDirect=function(x,N,V,B,U,ae){N===null&&(N=St);const ue=U.isMesh&&U.matrixWorld.determinant()<0,me=Nu(x,N,V,B,U);Se.setMaterial(B,ue);let fe=V.index,Ie=1;if(B.wireframe===!0){if(fe=j.getWireframeAttribute(V),fe===void 0)return;Ie=2}const ze=V.drawRange,We=V.attributes.position;let Re=ze.start*Ie,nt=(ze.start+ze.count)*Ie;ae!==null&&(Re=Math.max(Re,ae.start*Ie),nt=Math.min(nt,(ae.start+ae.count)*Ie)),fe!==null?(Re=Math.max(Re,0),nt=Math.min(nt,fe.count)):We!=null&&(Re=Math.max(Re,0),nt=Math.min(nt,We.count));const pt=nt-Re;if(pt<0||pt===1/0)return;te.setup(U,B,me,V,fe);let ut,et=Ge;if(fe!==null&&(ut=$.get(fe),et=L,et.setIndex(ut)),U.isMesh)B.wireframe===!0?(Se.setLineWidth(B.wireframeLinewidth*At()),et.setMode(R.LINES)):et.setMode(R.TRIANGLES);else if(U.isLine){let dt=B.linewidth;dt===void 0&&(dt=1),Se.setLineWidth(dt*At()),U.isLineSegments?et.setMode(R.LINES):U.isLineLoop?et.setMode(R.LINE_LOOP):et.setMode(R.LINE_STRIP)}else U.isPoints?et.setMode(R.POINTS):U.isSprite&&et.setMode(R.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Ar("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),et.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if($e.get("WEBGL_multi_draw"))et.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const dt=U._multiDrawStarts,Ae=U._multiDrawCounts,Wt=U._multiDrawCount,Zi=fe?$.get(fe).bytesPerElement:1,ei=_.get(B).currentProgram.getUniforms();for(let ci=0;ci<Wt;ci++)ei.setValue(R,"_gl_DrawID",ci),et.render(dt[ci]/Zi,Ae[ci])}else if(U.isInstancedMesh)et.renderInstances(Re,pt,U.count);else if(V.isInstancedBufferGeometry){const dt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ae=Math.min(V.instanceCount,dt);et.renderInstances(Re,pt,Ae)}else et.render(Re,pt)};function jo(x,N,V){x.transparent===!0&&x.side===ni&&x.forceSinglePass===!1?(x.side=Nt,x.needsUpdate=!0,Dn(x,N,V),x.side=li,x.needsUpdate=!0,Dn(x,N,V),x.side=ni):Dn(x,N,V)}this.compile=function(x,N,V=null){V===null&&(V=x),w=J.get(V),w.init(N),D.push(w),V.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(w.pushLight(U),U.castShadow&&w.pushShadow(U))}),x!==V&&x.traverseVisible(function(U){U.isLight&&U.layers.test(N.layers)&&(w.pushLight(U),U.castShadow&&w.pushShadow(U))}),w.setupLights();const B=new Set;return x.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const ae=U.material;if(ae)if(Array.isArray(ae))for(let ue=0;ue<ae.length;ue++){const me=ae[ue];jo(me,V,U),B.add(me)}else jo(ae,V,U),B.add(ae)}),w=D.pop(),B},this.compileAsync=function(x,N,V=null){const B=this.compile(x,N,V);return new Promise(U=>{function ae(){if(B.forEach(function(ue){_.get(ue).currentProgram.isReady()&&B.delete(ue)}),B.size===0){U(x);return}setTimeout(ae,10)}$e.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let Fr=null;function Iu(x){Fr&&Fr(x)}function $o(){Ki.stop()}function Ko(){Ki.start()}const Ki=new nu;Ki.setAnimationLoop(Iu),typeof self<"u"&&Ki.setContext(self),this.setAnimationLoop=function(x){Fr=x,X.setAnimationLoop(x),x===null?Ki.stop():Ki.start()},X.addEventListener("sessionstart",$o),X.addEventListener("sessionend",Ko),this.render=function(x,N){if(N!==void 0&&N.isCamera!==!0){Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;const V=X.enabled===!0&&X.isPresenting===!0,B=v!==null&&(H===null||V)&&v.begin(T,H);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(X.cameraAutoUpdate===!0&&X.updateCamera(N),N=X.getCamera()),x.isScene===!0&&x.onBeforeRender(T,x,N,H),w=J.get(x,D.length),w.init(N),D.push(w),je.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Oe.setFromProjectionMatrix(je,fi,N.reversedDepth),pe=this.localClippingEnabled,we=ie.init(this.clippingPlanes,pe),M=Me.get(x,A.length),M.init(),A.push(M),X.enabled===!0&&X.isPresenting===!0){const ae=T.xr.getDepthSensingMesh();ae!==null&&Br(ae,N,-1/0,T.sortObjects)}Br(x,N,0,T.sortObjects),M.finish(),T.sortObjects===!0&&M.sort(Fe,Ue),gt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,gt&&ve.addToRenderList(M,x),this.info.render.frame++,we===!0&&ie.beginShadows();const U=w.state.shadowsArray;if(Ee.render(U,x,N),we===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset(),(B&&v.hasRenderPass())===!1){const ae=M.opaque,ue=M.transmissive;if(w.setupLights(),N.isArrayCamera){const me=N.cameras;if(ue.length>0)for(let fe=0,Ie=me.length;fe<Ie;fe++){const ze=me[fe];Jo(ae,ue,x,ze)}gt&&ve.render(x);for(let fe=0,Ie=me.length;fe<Ie;fe++){const ze=me[fe];Zo(M,x,ze,ze.viewport)}}else ue.length>0&&Jo(ae,ue,x,N),gt&&ve.render(x),Zo(M,x,N)}H!==null&&O===0&&(I.updateMultisampleRenderTarget(H),I.updateRenderTargetMipmap(H)),B&&v.end(T),x.isScene===!0&&x.onAfterRender(T,x,N),te.resetDefaultState(),G=-1,k=null,D.pop(),D.length>0?(w=D[D.length-1],we===!0&&ie.setGlobalState(T.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?M=A[A.length-1]:M=null};function Br(x,N,V,B){if(x.visible===!1)return;if(x.layers.test(N.layers)){if(x.isGroup)V=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(N);else if(x.isLight)w.pushLight(x),x.castShadow&&w.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||Oe.intersectsSprite(x)){B&&Ve.setFromMatrixPosition(x.matrixWorld).applyMatrix4(je);const ae=ye.update(x),ue=x.material;ue.visible&&M.push(x,ae,ue,V,Ve.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||Oe.intersectsObject(x))){const ae=ye.update(x),ue=x.material;if(B&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Ve.copy(x.boundingSphere.center)):(ae.boundingSphere===null&&ae.computeBoundingSphere(),Ve.copy(ae.boundingSphere.center)),Ve.applyMatrix4(x.matrixWorld).applyMatrix4(je)),Array.isArray(ue)){const me=ae.groups;for(let fe=0,Ie=me.length;fe<Ie;fe++){const ze=me[fe],We=ue[ze.materialIndex];We&&We.visible&&M.push(x,ae,We,V,Ve.z,ze)}}else ue.visible&&M.push(x,ae,ue,V,Ve.z,null)}}const U=x.children;for(let ae=0,ue=U.length;ae<ue;ae++)Br(U[ae],N,V,B)}function Zo(x,N,V,B){const{opaque:U,transmissive:ae,transparent:ue}=x;w.setupLightsView(V),we===!0&&ie.setGlobalState(T.clippingPlanes,V),B&&Se.viewport(z.copy(B)),U.length>0&&Ln(U,N,V),ae.length>0&&Ln(ae,N,V),ue.length>0&&Ln(ue,N,V),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function Jo(x,N,V,B){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[B.id]===void 0){const We=$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[B.id]=new Vt(1,1,{generateMipmaps:!0,type:We?jt:Zt,minFilter:oa,samples:Math.max(4,at.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace})}const U=w.state.transmissionRenderTarget[B.id],ae=B.viewport||z;U.setSize(ae.z*T.transmissionResolutionScale,ae.w*T.transmissionResolutionScale);const ue=T.getRenderTarget(),me=T.getActiveCubeFace(),fe=T.getActiveMipmapLevel();T.setRenderTarget(U),T.getClearColor(K),le=T.getClearAlpha(),le<1&&T.setClearColor(16777215,.5),T.clear(),gt&&ve.render(V);const Ie=T.toneMapping;T.toneMapping=_i;const ze=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),w.setupLightsView(B),we===!0&&ie.setGlobalState(T.clippingPlanes,B),Ln(x,V,B),I.updateMultisampleRenderTarget(U),I.updateRenderTargetMipmap(U),$e.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Re=0,nt=N.length;Re<nt;Re++){const pt=N[Re],{object:ut,geometry:et,material:dt,group:Ae}=pt;if(dt.side===ni&&ut.layers.test(B.layers)){const Wt=dt.side;dt.side=Nt,dt.needsUpdate=!0,Qo(ut,V,B,et,dt,Ae),dt.side=Wt,dt.needsUpdate=!0,We=!0}}We===!0&&(I.updateMultisampleRenderTarget(U),I.updateRenderTargetMipmap(U))}T.setRenderTarget(ue,me,fe),T.setClearColor(K,le),ze!==void 0&&(B.viewport=ze),T.toneMapping=Ie}function Ln(x,N,V){const B=N.isScene===!0?N.overrideMaterial:null;for(let U=0,ae=x.length;U<ae;U++){const ue=x[U],{object:me,geometry:fe,group:Ie}=ue;let ze=ue.material;ze.allowOverride===!0&&B!==null&&(ze=B),me.layers.test(V.layers)&&Qo(me,N,V,fe,ze,Ie)}}function Qo(x,N,V,B,U,ae){x.onBeforeRender(T,N,V,B,U,ae),x.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),U.onBeforeRender(T,N,V,B,x,ae),U.transparent===!0&&U.side===ni&&U.forceSinglePass===!1?(U.side=Nt,U.needsUpdate=!0,T.renderBufferDirect(V,N,B,U,x,ae),U.side=li,U.needsUpdate=!0,T.renderBufferDirect(V,N,B,U,x,ae),U.side=ni):T.renderBufferDirect(V,N,B,U,x,ae),x.onAfterRender(T,N,V,B,U,ae)}function Dn(x,N,V){N.isScene!==!0&&(N=St);const B=_.get(x),U=w.state.lights,ae=w.state.shadowsArray,ue=U.state.version,me=se.getParameters(x,U.state,ae,N,V),fe=se.getProgramCacheKey(me);let Ie=B.programs;B.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?N.environment:null,B.fog=N.fog;const ze=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;B.envMap=Y.get(x.envMap||B.environment,ze),B.envMapRotation=B.environment!==null&&x.envMap===null?N.environmentRotation:x.envMapRotation,Ie===void 0&&(x.addEventListener("dispose",Ke),Ie=new Map,B.programs=Ie);let We=Ie.get(fe);if(We!==void 0){if(B.currentProgram===We&&B.lightsStateVersion===ue)return tl(x,me),We}else me.uniforms=se.getUniforms(x),x.onBeforeCompile(me,T),We=se.acquireProgram(me,fe),Ie.set(fe,We),B.uniforms=me.uniforms;const Re=B.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Re.clippingPlanes=ie.uniform),tl(x,me),B.needsLights=Ou(x),B.lightsStateVersion=ue,B.needsLights&&(Re.ambientLightColor.value=U.state.ambient,Re.lightProbe.value=U.state.probe,Re.directionalLights.value=U.state.directional,Re.directionalLightShadows.value=U.state.directionalShadow,Re.spotLights.value=U.state.spot,Re.spotLightShadows.value=U.state.spotShadow,Re.rectAreaLights.value=U.state.rectArea,Re.ltc_1.value=U.state.rectAreaLTC1,Re.ltc_2.value=U.state.rectAreaLTC2,Re.pointLights.value=U.state.point,Re.pointLightShadows.value=U.state.pointShadow,Re.hemisphereLights.value=U.state.hemi,Re.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Re.spotLightMatrix.value=U.state.spotLightMatrix,Re.spotLightMap.value=U.state.spotLightMap,Re.pointShadowMatrix.value=U.state.pointShadowMatrix),B.currentProgram=We,B.uniformsList=null,We}function el(x){if(x.uniformsList===null){const N=x.currentProgram.getUniforms();x.uniformsList=mr.seqWithValue(N.seq,x.uniforms)}return x.uniformsList}function tl(x,N){const V=_.get(x);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.batchingColor=N.batchingColor,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.instancingMorph=N.instancingMorph,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function Nu(x,N,V,B,U){N.isScene!==!0&&(N=St),I.resetTextureUnits();const ae=N.fog,ue=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?N.environment:null,me=H===null?T.outputColorSpace:H.isXRRenderTarget===!0?H.texture.colorSpace:qa,fe=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Ie=Y.get(B.envMap||ue,fe),ze=B.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,We=!!V.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Re=!!V.morphAttributes.position,nt=!!V.morphAttributes.normal,pt=!!V.morphAttributes.color;let ut=_i;B.toneMapped&&(H===null||H.isXRRenderTarget===!0)&&(ut=T.toneMapping);const et=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,dt=et!==void 0?et.length:0,Ae=_.get(B),Wt=w.state.lights;if(we===!0&&(pe===!0||x!==k)){const vt=x===k&&B.id===G;ie.setState(B,x,vt)}let Zi=!1;B.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==Wt.state.version||Ae.outputColorSpace!==me||U.isBatchedMesh&&Ae.batching===!1||!U.isBatchedMesh&&Ae.batching===!0||U.isBatchedMesh&&Ae.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Ae.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Ae.instancing===!1||!U.isInstancedMesh&&Ae.instancing===!0||U.isSkinnedMesh&&Ae.skinning===!1||!U.isSkinnedMesh&&Ae.skinning===!0||U.isInstancedMesh&&Ae.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Ae.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Ae.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Ae.instancingMorph===!1&&U.morphTexture!==null||Ae.envMap!==Ie||B.fog===!0&&Ae.fog!==ae||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==ie.numPlanes||Ae.numIntersection!==ie.numIntersection)||Ae.vertexAlphas!==ze||Ae.vertexTangents!==We||Ae.morphTargets!==Re||Ae.morphNormals!==nt||Ae.morphColors!==pt||Ae.toneMapping!==ut||Ae.morphTargetsCount!==dt)&&(Zi=!0):(Zi=!0,Ae.__version=B.version);let ei=Ae.currentProgram;Zi===!0&&(ei=Dn(B,N,U));let ci=!1,Ji=!1,_a=!1;const tt=ei.getUniforms(),wt=Ae.uniforms;if(Se.useProgram(ei.program)&&(ci=!0,Ji=!0,_a=!0),B.id!==G&&(G=B.id,Ji=!0),ci||k!==x){Se.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),tt.setValue(R,"projectionMatrix",x.projectionMatrix),tt.setValue(R,"viewMatrix",x.matrixWorldInverse);const vt=tt.map.cameraPosition;vt!==void 0&&vt.setValue(R,Qe.setFromMatrixPosition(x.matrixWorld)),at.logarithmicDepthBuffer&&tt.setValue(R,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&tt.setValue(R,"isOrthographic",x.isOrthographicCamera===!0),k!==x&&(k=x,Ji=!0,_a=!0)}if(Ae.needsLights&&(Wt.state.directionalShadowMap.length>0&&tt.setValue(R,"directionalShadowMap",Wt.state.directionalShadowMap,I),Wt.state.spotShadowMap.length>0&&tt.setValue(R,"spotShadowMap",Wt.state.spotShadowMap,I),Wt.state.pointShadowMap.length>0&&tt.setValue(R,"pointShadowMap",Wt.state.pointShadowMap,I)),U.isSkinnedMesh){tt.setOptional(R,U,"bindMatrix"),tt.setOptional(R,U,"bindMatrixInverse");const vt=U.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),tt.setValue(R,"boneTexture",vt.boneTexture,I))}U.isBatchedMesh&&(tt.setOptional(R,U,"batchingTexture"),tt.setValue(R,"batchingTexture",U._matricesTexture,I),tt.setOptional(R,U,"batchingIdTexture"),tt.setValue(R,"batchingIdTexture",U._indirectTexture,I),tt.setOptional(R,U,"batchingColorTexture"),U._colorsTexture!==null&&tt.setValue(R,"batchingColorTexture",U._colorsTexture,I));const Oi=V.morphAttributes;if((Oi.position!==void 0||Oi.normal!==void 0||Oi.color!==void 0)&&he.update(U,V,ei),(Ji||Ae.receiveShadow!==U.receiveShadow)&&(Ae.receiveShadow=U.receiveShadow,tt.setValue(R,"receiveShadow",U.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&N.environment!==null&&(wt.envMapIntensity.value=N.environmentIntensity),wt.dfgLUT!==void 0&&(wt.dfgLUT.value=d_()),Ji&&(tt.setValue(R,"toneMappingExposure",T.toneMappingExposure),Ae.needsLights&&Uu(wt,_a),ae&&B.fog===!0&&Te.refreshFogUniforms(wt,ae),Te.refreshMaterialUniforms(wt,B,ne,xe,w.state.transmissionRenderTarget[x.id]),mr.upload(R,el(Ae),wt,I)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(mr.upload(R,el(Ae),wt,I),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&tt.setValue(R,"center",U.center),tt.setValue(R,"modelViewMatrix",U.modelViewMatrix),tt.setValue(R,"normalMatrix",U.normalMatrix),tt.setValue(R,"modelMatrix",U.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const vt=B.uniformsGroups;for(let Ja=0,va=vt.length;Ja<va;Ja++){const il=vt[Ja];ge.update(il,ei),ge.bind(il,ei)}}return ei}function Uu(x,N){x.ambientLightColor.needsUpdate=N,x.lightProbe.needsUpdate=N,x.directionalLights.needsUpdate=N,x.directionalLightShadows.needsUpdate=N,x.pointLights.needsUpdate=N,x.pointLightShadows.needsUpdate=N,x.spotLights.needsUpdate=N,x.spotLightShadows.needsUpdate=N,x.rectAreaLights.needsUpdate=N,x.hemisphereLights.needsUpdate=N}function Ou(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return H},this.setRenderTargetTextures=function(x,N,V){const B=_.get(x);B.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),_.get(x.texture).__webglTexture=N,_.get(x.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:V,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,N){const V=_.get(x);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0};const Fu=R.createFramebuffer();this.setRenderTarget=function(x,N=0,V=0){H=x,C=N,O=V;let B=null,U=!1,ae=!1;if(x){const ue=_.get(x);if(ue.__useDefaultFramebuffer!==void 0){Se.bindFramebuffer(R.FRAMEBUFFER,ue.__webglFramebuffer),z.copy(x.viewport),F.copy(x.scissor),Q=x.scissorTest,Se.viewport(z),Se.scissor(F),Se.setScissorTest(Q),G=-1;return}else if(ue.__webglFramebuffer===void 0)I.setupRenderTarget(x);else if(ue.__hasExternalTextures)I.rebindTextures(x,_.get(x.texture).__webglTexture,_.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Ie=x.depthTexture;if(ue.__boundDepthTexture!==Ie){if(Ie!==null&&_.has(Ie)&&(x.width!==Ie.image.width||x.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(x)}}const me=x.texture;(me.isData3DTexture||me.isDataArrayTexture||me.isCompressedArrayTexture)&&(ae=!0);const fe=_.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(fe[N])?B=fe[N][V]:B=fe[N],U=!0):x.samples>0&&I.useMultisampledRTT(x)===!1?B=_.get(x).__webglMultisampledFramebuffer:Array.isArray(fe)?B=fe[V]:B=fe,z.copy(x.viewport),F.copy(x.scissor),Q=x.scissorTest}else z.copy(q).multiplyScalar(ne).floor(),F.copy(Z).multiplyScalar(ne).floor(),Q=re;if(V!==0&&(B=Fu),Se.bindFramebuffer(R.FRAMEBUFFER,B)&&Se.drawBuffers(x,B),Se.viewport(z),Se.scissor(F),Se.setScissorTest(Q),U){const ue=_.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+N,ue.__webglTexture,V)}else if(ae){const ue=N;for(let me=0;me<x.textures.length;me++){const fe=_.get(x.textures[me]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+me,fe.__webglTexture,V,ue)}}else if(x!==null&&V!==0){const ue=_.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,ue.__webglTexture,V)}G=-1},this.readRenderTargetPixels=function(x,N,V,B,U,ae,ue,me=0){if(!(x&&x.isWebGLRenderTarget)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=_.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe){Se.bindFramebuffer(R.FRAMEBUFFER,fe);try{const Ie=x.textures[me],ze=Ie.format,We=Ie.type;if(x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+me),!at.textureFormatReadable(ze)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!at.textureTypeReadable(We)){Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=x.width-B&&V>=0&&V<=x.height-U&&R.readPixels(N,V,B,U,oe.convert(ze),oe.convert(We),ae)}finally{const Ie=H!==null?_.get(H).__webglFramebuffer:null;Se.bindFramebuffer(R.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(x,N,V,B,U,ae,ue,me=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=_.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&ue!==void 0&&(fe=fe[ue]),fe)if(N>=0&&N<=x.width-B&&V>=0&&V<=x.height-U){Se.bindFramebuffer(R.FRAMEBUFFER,fe);const Ie=x.textures[me],ze=Ie.format,We=Ie.type;if(x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+me),!at.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!at.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Re),R.bufferData(R.PIXEL_PACK_BUFFER,ae.byteLength,R.STREAM_READ),R.readPixels(N,V,B,U,oe.convert(ze),oe.convert(We),0);const nt=H!==null?_.get(H).__webglFramebuffer:null;Se.bindFramebuffer(R.FRAMEBUFFER,nt);const pt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Mh(R,pt,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Re),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,ae),R.deleteBuffer(Re),R.deleteSync(pt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,N=null,V=0){const B=Math.pow(2,-V),U=Math.floor(x.image.width*B),ae=Math.floor(x.image.height*B),ue=N!==null?N.x:0,me=N!==null?N.y:0;I.setTexture2D(x,0),R.copyTexSubImage2D(R.TEXTURE_2D,V,0,0,ue,me,U,ae),Se.unbindTexture()};const Bu=R.createFramebuffer(),zu=R.createFramebuffer();this.copyTextureToTexture=function(x,N,V=null,B=null,U=0,ae=0){let ue,me,fe,Ie,ze,We,Re,nt,pt;const ut=x.isCompressedTexture?x.mipmaps[ae]:x.image;if(V!==null)ue=V.max.x-V.min.x,me=V.max.y-V.min.y,fe=V.isBox3?V.max.z-V.min.z:1,Ie=V.min.x,ze=V.min.y,We=V.isBox3?V.min.z:0;else{const wt=Math.pow(2,-U);ue=Math.floor(ut.width*wt),me=Math.floor(ut.height*wt),x.isDataArrayTexture?fe=ut.depth:x.isData3DTexture?fe=Math.floor(ut.depth*wt):fe=1,Ie=0,ze=0,We=0}B!==null?(Re=B.x,nt=B.y,pt=B.z):(Re=0,nt=0,pt=0);const et=oe.convert(N.format),dt=oe.convert(N.type);let Ae;N.isData3DTexture?(I.setTexture3D(N,0),Ae=R.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(I.setTexture2DArray(N,0),Ae=R.TEXTURE_2D_ARRAY):(I.setTexture2D(N,0),Ae=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,N.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,N.unpackAlignment);const Wt=R.getParameter(R.UNPACK_ROW_LENGTH),Zi=R.getParameter(R.UNPACK_IMAGE_HEIGHT),ei=R.getParameter(R.UNPACK_SKIP_PIXELS),ci=R.getParameter(R.UNPACK_SKIP_ROWS),Ji=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,ut.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ut.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ie),R.pixelStorei(R.UNPACK_SKIP_ROWS,ze),R.pixelStorei(R.UNPACK_SKIP_IMAGES,We);const _a=x.isDataArrayTexture||x.isData3DTexture,tt=N.isDataArrayTexture||N.isData3DTexture;if(x.isDepthTexture){const wt=_.get(x),Oi=_.get(N),vt=_.get(wt.__renderTarget),Ja=_.get(Oi.__renderTarget);Se.bindFramebuffer(R.READ_FRAMEBUFFER,vt.__webglFramebuffer),Se.bindFramebuffer(R.DRAW_FRAMEBUFFER,Ja.__webglFramebuffer);for(let va=0;va<fe;va++)_a&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_.get(x).__webglTexture,U,We+va),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_.get(N).__webglTexture,ae,pt+va)),R.blitFramebuffer(Ie,ze,ue,me,Re,nt,ue,me,R.DEPTH_BUFFER_BIT,R.NEAREST);Se.bindFramebuffer(R.READ_FRAMEBUFFER,null),Se.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(U!==0||x.isRenderTargetTexture||_.has(x)){const wt=_.get(x),Oi=_.get(N);Se.bindFramebuffer(R.READ_FRAMEBUFFER,Bu),Se.bindFramebuffer(R.DRAW_FRAMEBUFFER,zu);for(let vt=0;vt<fe;vt++)_a?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,wt.__webglTexture,U,We+vt):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,wt.__webglTexture,U),tt?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Oi.__webglTexture,ae,pt+vt):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Oi.__webglTexture,ae),U!==0?R.blitFramebuffer(Ie,ze,ue,me,Re,nt,ue,me,R.COLOR_BUFFER_BIT,R.NEAREST):tt?R.copyTexSubImage3D(Ae,ae,Re,nt,pt+vt,Ie,ze,ue,me):R.copyTexSubImage2D(Ae,ae,Re,nt,Ie,ze,ue,me);Se.bindFramebuffer(R.READ_FRAMEBUFFER,null),Se.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else tt?x.isDataTexture||x.isData3DTexture?R.texSubImage3D(Ae,ae,Re,nt,pt,ue,me,fe,et,dt,ut.data):N.isCompressedArrayTexture?R.compressedTexSubImage3D(Ae,ae,Re,nt,pt,ue,me,fe,et,ut.data):R.texSubImage3D(Ae,ae,Re,nt,pt,ue,me,fe,et,dt,ut):x.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,ae,Re,nt,ue,me,et,dt,ut.data):x.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,ae,Re,nt,ut.width,ut.height,et,ut.data):R.texSubImage2D(R.TEXTURE_2D,ae,Re,nt,ue,me,et,dt,ut);R.pixelStorei(R.UNPACK_ROW_LENGTH,Wt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Zi),R.pixelStorei(R.UNPACK_SKIP_PIXELS,ei),R.pixelStorei(R.UNPACK_SKIP_ROWS,ci),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ji),ae===0&&N.generateMipmaps&&R.generateMipmap(Ae),Se.unbindTexture()},this.initRenderTarget=function(x){_.get(x).__webglFramebuffer===void 0&&I.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?I.setTextureCube(x,0):x.isData3DTexture?I.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?I.setTexture2DArray(x,0):I.setTexture2D(x,0),Se.unbindTexture()},this.resetState=function(){C=0,O=0,H=null,Se.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}})();const uu=new WeakMap;function p_(i,{onSubmit:e,tabComplete:t}={}){const a=new AbortController,{signal:n}=a,r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s={abortController:a,history:[],historyIndex:-1,partialInput:"",reducedMotion:r};uu.set(i,s);const o=i.querySelector(".s9-terminal__input");o&&o.addEventListener("keydown",l=>{m_(i,l,{onSubmit:e,tabComplete:t})},{signal:n})}function Pe(i,e,t){const a=i.querySelector(".s9-terminal__output");if(!a)return;const n=document.createElement("span");n.className=`s9-terminal__line s9-terminal__line--${t}`,n.textContent=e,a.appendChild(n);const r=200,s=a.querySelectorAll(".s9-terminal__line");s.length>r&&s[0].remove(),g_(a)}function f_(i){const e=i.querySelector(".s9-terminal__output");e&&(e.querySelectorAll(".s9-terminal__line").forEach(t=>t.remove()),i.dispatchEvent(new CustomEvent("s9:terminal-clear",{bubbles:!0})))}function m_(i,e,{onSubmit:t,tabComplete:a}){const n=uu.get(i);if(!n)return;const r=i.querySelector(".s9-terminal__input");if(r)switch(e.key){case"Enter":{const s=r.value;if(!s)return;Pe(i,s,"cmd"),typeof t=="function"&&t(s),i.dispatchEvent(new CustomEvent("s9:terminal-submit",{bubbles:!0,detail:{command:s,timestamp:new Date().toISOString()}})),n.history.unshift(s),n.historyIndex=-1,n.partialInput="",r.value="";break}case"ArrowUp":{if(e.preventDefault(),n.history.length===0)return;n.historyIndex===-1&&(n.partialInput=r.value);const s=n.historyIndex+1;if(s<n.history.length){n.historyIndex=s,r.value=n.history[n.historyIndex];const o=r.value.length;r.setSelectionRange(o,o)}break}case"ArrowDown":{if(e.preventDefault(),n.historyIndex===-1)return;if(n.historyIndex>0){n.historyIndex-=1,r.value=n.history[n.historyIndex];const s=r.value.length;r.setSelectionRange(s,s)}else{n.historyIndex=-1,r.value=n.partialInput;const s=r.value.length;r.setSelectionRange(s,s)}break}case"Tab":{if(e.preventDefault(),typeof a=="function"){const s=a(r.value);s!=null&&(r.value=s)}break}default:{if(e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!n.reducedMotion&&Math.random()<.01){const s=i.querySelector(".s9-terminal__output");if(s){const o=Array.from(s.querySelectorAll(".s9-terminal__line")).slice(-8);if(o.length>0){const l=o[Math.floor(Math.random()*o.length)];l.classList.add("glitch-enter"),l.addEventListener("animationend",c=>{c.animationName==="glitch"&&l.classList.remove("glitch-enter")},{once:!0})}}}break}}}function g_(i){i.scrollTop=i.scrollHeight}const hu=new WeakMap;function __(i){const e=new AbortController,{signal:t}=e,a={ac:e,paused:!1,filter:null};hu.set(i,a);const n=i.querySelector(".s9-stream__body");n&&(n.addEventListener("mouseenter",()=>{a.paused=!0,n.dataset.paused="true"},{signal:t}),n.addEventListener("mouseleave",()=>{a.paused=!1,n.dataset.paused="false",du(n)},{signal:t}),n.addEventListener("click",r=>{const s=r.target.closest(".s9-stream__row");if(!s)return;const o=s.classList.contains("s9-stream__row--pinned");s.classList.toggle("s9-stream__row--pinned",!o),i.dispatchEvent(new CustomEvent("s9:stream-row-pinned",{bubbles:!0,detail:{row:s,pinned:!o}}))},{signal:t}))}function En(i,{timestamp:e,source:t,message:a,alert:n=!1}){const r=i.querySelector(".s9-stream__body");if(!r)return;const s=hu.get(i),o=(s==null?void 0:s.filter)??null,l=document.createElement("div");l.className="s9-stream__row",n&&l.classList.add("s9-stream__row--alert"),o&&t!==o&&(l.hidden=!0),l.innerHTML=`<span class="s9-stream__timestamp">${Ss(e)}</span><span class="s9-stream__source">${Ss(t)}</span><span class="s9-stream__message">${Ss(a)}</span>`,l.classList.add("glitch-enter"),l.addEventListener("animationend",()=>l.classList.remove("glitch-enter"),{once:!0}),r.appendChild(l),r.children.length>100&&r.removeChild(r.firstChild),s!=null&&s.paused||du(r)}function du(i){i.scrollTop=i.scrollHeight}function Ss(i){return String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function v_(i,e){e(),i.classList.remove("glitch-enter"),i.offsetWidth,i.classList.add("glitch-enter"),i.addEventListener("animationend",()=>i.classList.remove("glitch-enter"),{once:!0})}const oc=new WeakMap;function nr(i,e){const t=Math.max(0,Math.min(100,e)),a=i.querySelector(".s9-telemetry__bar-fill");if(a){a.style.width=`${t}%`;const o=["s9-telemetry__bar-fill--ok","s9-telemetry__bar-fill--warning","s9-telemetry__bar-fill--critical"];a.classList.remove(...o),t<=60?a.classList.add("s9-telemetry__bar-fill--ok"):t<=85?a.classList.add("s9-telemetry__bar-fill--warning"):a.classList.add("s9-telemetry__bar-fill--critical")}const n=i.querySelector(".s9-telemetry__value");n&&(n.textContent=Math.round(t).toString());const r=oc.get(i)??!1,s=t>85;s&&!r&&i.dispatchEvent(new CustomEvent("s9:telemetry-threshold",{bubbles:!0,detail:{value:t}})),oc.set(i,s)}const x_=8e3;function S_(i,{level:e="critical",code:t,message:a,persistent:n=!1}){const r=document.createElement("div");r.className=`s9-alert s9-alert--${e}`,n&&(r.dataset.persistent="true");const s=e==="critical"?"⬡":"⚠",o=new Date().toISOString().replace("T"," ").substring(0,19)+" UTC";return r.innerHTML=`<span class="s9-alert__icon" aria-hidden="true">${s}</span><div class="s9-alert__body"><span class="s9-alert__code">${ys(t)}</span><span class="s9-alert__message">${ys(a)}</span></div><span class="s9-alert__timestamp">${ys(o)}</span><button class="s9-alert__dismiss" aria-label="Dismiss alert">✕</button>`,r.classList.add("glitch-enter"),r.addEventListener("animationend",()=>r.classList.remove("glitch-enter"),{once:!0}),r.querySelector(".s9-alert__dismiss").addEventListener("click",()=>{lc(r)}),i.appendChild(r),n||setTimeout(()=>{r.isConnected&&lc(r)},x_),r}function lc(i){var e;if(!i.isConnected)return;const t=((e=i.querySelector(".s9-alert__code"))==null?void 0:e.textContent)??"";i.classList.add("s9-alert--dismissing"),i.addEventListener("transitionend",()=>{i.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:t}})),i.remove()},{once:!0}),setTimeout(()=>{i.isConnected&&(i.dispatchEvent(new CustomEvent("s9:alert-dismissed",{bubbles:!0,detail:{code:t}})),i.remove())},400)}function ys(i){return String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const kt="http://www.w3.org/2000/svg",ga=new WeakMap;function y_(i,{nodes:e=[],edges:t=[]}={}){const a=new AbortController,{signal:n}=a,r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s={abortController:a,nodeMap:new Map,edgeMap:new Map,activeNodeId:null,reducedMotion:r};ga.set(i,s);const o=document.createElementNS(kt,"svg");o.setAttribute("class","s9-matrix__canvas"),o.setAttribute("viewBox","0 0 100 100"),o.setAttribute("preserveAspectRatio","xMidYMid meet"),o.setAttribute("role","img"),o.setAttribute("aria-label","Network topology matrix");const l=document.createElementNS(kt,"defs"),c=document.createElementNS(kt,"g");c.setAttribute("class","s9-matrix__edges");const u=document.createElementNS(kt,"g");u.setAttribute("class","s9-matrix__nodes"),o.appendChild(l),o.appendChild(c),o.appendChild(u),i.appendChild(o),e.forEach(h=>E_(i,h)),t.forEach(h=>b_(i,h)),t.forEach(h=>{h.active&&bo(i,h.id)}),o.addEventListener("click",h=>{const d=h.target.closest("[data-node-id]");d?gr(i,d.dataset.nodeId):s.activeNodeId!==null&&gr(i,null)},{signal:n}),o.addEventListener("keydown",h=>{if(h.key==="Enter"||h.key===" "){const d=h.target.closest("[data-node-id]");d&&(h.preventDefault(),gr(i,d.dataset.nodeId))}},{signal:n})}function M_(i,e){const t=ga.get(i);if(!t)return;const a=t.nodeMap.get(e);if(!a||a.classList.contains("s9-matrix__node--active"))return;a.classList.add("s9-matrix__node--pulsing");const n=a.querySelector(".s9-matrix__node-ring");n&&n.addEventListener("animationend",r=>{r.animationName==="matrix-ring-pulse"&&a.classList.remove("s9-matrix__node--pulsing")},{once:!0})}function bo(i,e,t=null){const a=ga.get(i);if(!a)return;if(e===null){for(const[S]of a.edgeMap)pu(i,S);return}const n=a.edgeMap.get(e);if(!n||n.active)return;const r=i.querySelector(".s9-matrix__canvas");if(!r)return;const s=r.querySelector(".s9-matrix__edges");if(!s)return;const{line:o,x1:l,y1:c,x2:u,y2:h}=n;o&&o.parentNode&&o.parentNode.removeChild(o);const d=`s9-edge-${e}`,p=document.createElementNS(kt,"path");p.setAttribute("class","s9-matrix__edge s9-matrix__edge--active"),p.setAttribute("id",d),p.setAttribute("data-edge-id",e),p.setAttribute("d",`M ${l} ${c} L ${u} ${h}`),s.appendChild(p);let g=null;if(!a.reducedMotion){g=document.createElementNS(kt,"circle"),g.setAttribute("class","s9-matrix__edge-dot"),g.setAttribute("r","1.2"),t&&(g.style.fill=t,g.style.filter=`drop-shadow(0 0 2px ${t})`);const S=document.createElementNS(kt,"animateMotion");S.setAttribute("dur","2s"),S.setAttribute("repeatCount","indefinite");const m=document.createElementNS(kt,"mpath");m.setAttributeNS("http://www.w3.org/1999/xlink","href",`#${d}`),S.appendChild(m),g.appendChild(S),s.appendChild(g)}n.line=p,n.dot=g,n.active=!0}function pu(i,e){const t=ga.get(i);if(!t)return;const a=t.edgeMap.get(e);if(!a||!a.active)return;const n=i.querySelector(".s9-matrix__canvas");if(!n)return;const r=n.querySelector(".s9-matrix__edges");if(!r)return;const{line:s,dot:o,x1:l,y1:c,x2:u,y2:h}=a;o&&o.parentNode&&o.parentNode.removeChild(o),s&&s.parentNode&&s.parentNode.removeChild(s);const d=document.createElementNS(kt,"line");d.setAttribute("class","s9-matrix__edge"),d.setAttribute("data-edge-id",e),d.setAttribute("x1",l),d.setAttribute("y1",c),d.setAttribute("x2",u),d.setAttribute("y2",h),r.appendChild(d),a.line=d,a.dot=null,a.active=!1}function gr(i,e){const t=ga.get(i);if(!t)return;if(t.activeNodeId!==null){const n=t.nodeMap.get(t.activeNodeId);n&&(n.classList.remove("s9-matrix__node--active"),n.setAttribute("aria-pressed","false")),i.dispatchEvent(new CustomEvent("s9:matrix-node-deselect",{bubbles:!0,detail:{nodeId:t.activeNodeId}})),t.activeNodeId=null}if(e===null)return;const a=t.nodeMap.get(e);a&&(a.classList.add("s9-matrix__node--active"),a.setAttribute("aria-pressed","true"),t.activeNodeId=e,i.dispatchEvent(new CustomEvent("s9:matrix-node-click",{bubbles:!0,detail:{nodeId:e,label:a.getAttribute("aria-label")??e}})))}function E_(i,{id:e,x:t,y:a,label:n,root:r=!1}){const s=ga.get(i);if(!s)return;const o=i.querySelector(".s9-matrix__canvas");if(!o)return;const l=o.querySelector(".s9-matrix__nodes");if(!l)return;const c=document.createElementNS(kt,"g");c.setAttribute("class",`s9-matrix__node${r?" s9-matrix__node--root":""}`),c.setAttribute("data-node-id",e),c.setAttribute("tabindex","0"),c.setAttribute("role","button"),c.setAttribute("aria-label",n),c.setAttribute("aria-pressed","false");const u=document.createElementNS(kt,"circle");u.setAttribute("class","s9-matrix__node-ring"),u.setAttribute("cx",t),u.setAttribute("cy",a),u.setAttribute("r","4");const h=document.createElementNS(kt,"circle");h.setAttribute("class","s9-matrix__node-core"),h.setAttribute("cx",t),h.setAttribute("cy",a),h.setAttribute("r","2.5");const d=document.createElementNS(kt,"text");d.setAttribute("class","s9-matrix__node-label"),d.setAttribute("x",t),d.setAttribute("y",a+3.5),d.textContent=n,c.appendChild(u),c.appendChild(h),c.appendChild(d),l.appendChild(c),s.nodeMap.set(e,c)}function b_(i,{id:e,from:t,to:a}){const n=ga.get(i);if(!n)return;const r=i.querySelector(".s9-matrix__canvas");if(!r)return;const s=r.querySelector(".s9-matrix__edges");if(!s)return;const o=n.nodeMap.get(t),l=n.nodeMap.get(a),c=o?parseFloat(o.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,u=o?parseFloat(o.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,h=l?parseFloat(l.querySelector(".s9-matrix__node-core").getAttribute("cx")):50,d=l?parseFloat(l.querySelector(".s9-matrix__node-core").getAttribute("cy")):50,p=document.createElementNS(kt,"line");p.setAttribute("class","s9-matrix__edge"),p.setAttribute("data-edge-id",e),p.setAttribute("x1",c),p.setAttribute("y1",u),p.setAttribute("x2",h),p.setAttribute("y2",d),s.appendChild(p),n.edgeMap.set(e,{line:p,dot:null,active:!1,from:t,to:a,x1:c,y1:u,x2:h,y2:d})}const cc={type:"change"},qo={type:"start"},fu={type:"end"},rr=new Ir,uc=new Gi,T_=Math.cos(70*Th.DEG2RAD),Mt=new P,Bt=2*Math.PI,Je={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ms=1e-6;class A_ extends vd{constructor(e,t=null){super(e,t),this.state=Je.NONE,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ha.ROTATE,MIDDLE:Ha.DOLLY,RIGHT:Ha.PAN},this.touches={ONE:Ba.ROTATE,TWO:Ba.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new ji,this._lastTargetPosition=new P,this._quat=new ji().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ol,this._sphericalDelta=new Ol,this._scale=1,this._panOffset=new P,this._rotateStart=new De,this._rotateEnd=new De,this._rotateDelta=new De,this._panStart=new De,this._panEnd=new De,this._panDelta=new De,this._dollyStart=new De,this._dollyEnd=new De,this._dollyDelta=new De,this._dollyDirection=new P,this._mouse=new De,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=C_.bind(this),this._onPointerDown=w_.bind(this),this._onPointerUp=R_.bind(this),this._onContextMenu=O_.bind(this),this._onMouseWheel=D_.bind(this),this._onKeyDown=I_.bind(this),this._onTouchStart=N_.bind(this),this._onTouchMove=U_.bind(this),this._onMouseDown=P_.bind(this),this._onMouseMove=L_.bind(this),this._interceptControlDown=F_.bind(this),this._interceptControlUp=B_.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(cc),this.update(),this.state=Je.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Mt.copy(t).sub(this.target),Mt.applyQuaternion(this._quat),this._spherical.setFromVector3(Mt),this.autoRotate&&this.state===Je.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let a=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(a)&&isFinite(n)&&(a<-Math.PI?a+=Bt:a>Math.PI&&(a-=Bt),n<-Math.PI?n+=Bt:n>Math.PI&&(n-=Bt),a<=n?this._spherical.theta=Math.max(a,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(a+n)/2?Math.max(a,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const s=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=s!=this._spherical.radius}if(Mt.setFromSpherical(this._spherical),Mt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Mt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let s=null;if(this.object.isPerspectiveCamera){const o=Mt.length();s=this._clampDistance(o*this._scale);const l=o-s;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new P(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new P(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),s=Mt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;s!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(s).add(this.object.position):(rr.origin.copy(this.object.position),rr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(rr.direction))<T_?this.object.lookAt(this.target):(uc.setFromNormalAndCoplanarPoint(this.object.up,this.target),rr.intersectPlane(uc,this.target))))}else if(this.object.isOrthographicCamera){const s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),s!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ms||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ms||this._lastTargetPosition.distanceToSquared(this.target)>Ms?(this.dispatchEvent(cc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Bt/60*this.autoRotateSpeed*e:Bt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Mt.setFromMatrixColumn(t,0),Mt.multiplyScalar(-e),this._panOffset.add(Mt)}_panUp(e,t){this.screenSpacePanning===!0?Mt.setFromMatrixColumn(t,1):(Mt.setFromMatrixColumn(t,0),Mt.crossVectors(this.object.up,Mt)),Mt.multiplyScalar(e),this._panOffset.add(Mt)}_pan(e,t){const a=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;Mt.copy(n).sub(this.target);let r=Mt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/a.clientHeight,this.object.matrix),this._panUp(2*t*r/a.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/a.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/a.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const a=this.domElement.getBoundingClientRect(),n=e-a.left,r=t-a.top,s=a.width,o=a.height;this._mouse.x=n/s*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Bt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Bt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Bt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Bt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Bt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Bt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),a=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._rotateStart.set(a,n)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),a=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panStart.set(a,n)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),a=e.pageX-t.x,n=e.pageY-t.y,r=Math.sqrt(a*a+n*n);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const a=this._getSecondPointerPosition(e),n=.5*(e.pageX+a.x),r=.5*(e.pageY+a.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Bt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Bt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),a=.5*(e.pageX+t.x),n=.5*(e.pageY+t.y);this._panEnd.set(a,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),a=e.pageX-t.x,n=e.pageY-t.y,r=Math.sqrt(a*a+n*n);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const s=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(s,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new De,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,a={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:a.deltaY*=16;break;case 2:a.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(a.deltaY*=10),a}}function w_(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function C_(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function R_(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(fu),this.state=Je.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function P_(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ha.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Je.DOLLY;break;case Ha.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Je.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Je.ROTATE}break;case Ha.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Je.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Je.PAN}break;default:this.state=Je.NONE}this.state!==Je.NONE&&this.dispatchEvent(qo)}function L_(i){switch(this.state){case Je.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Je.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Je.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function D_(i){this.enabled===!1||this.enableZoom===!1||this.state!==Je.NONE||(i.preventDefault(),this.dispatchEvent(qo),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(fu))}function I_(i){this.enabled!==!1&&this._handleKeyDown(i)}function N_(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ba.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Je.TOUCH_ROTATE;break;case Ba.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Je.TOUCH_PAN;break;default:this.state=Je.NONE}break;case 2:switch(this.touches.TWO){case Ba.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Je.TOUCH_DOLLY_PAN;break;case Ba.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Je.TOUCH_DOLLY_ROTATE;break;default:this.state=Je.NONE}break;default:this.state=Je.NONE}this.state!==Je.NONE&&this.dispatchEvent(qo)}function U_(i){switch(this._trackPointer(i),this.state){case Je.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Je.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Je.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Je.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Je.NONE}}function O_(i){this.enabled!==!1&&i.preventDefault()}function F_(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function B_(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const _r={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Pn{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const z_=new Nr(-1,1,1,-1,0,1);class H_ extends ht{constructor(){super(),this.setAttribute("position",new Ut([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ut([0,2,0,0,2,0],2))}}const k_=new H_;class mu{constructor(e){this._mesh=new it(k_,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,z_)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class gu extends Pn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ct?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Rr.clone(e.uniforms),this.material=new ct({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new mu(this.material)}render(e,t,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class hc extends Pn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,a){const n=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let s,o;this.inverse?(s=0,o=1):(s=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),r.buffers.stencil.setFunc(n.ALWAYS,s,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(a),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(n.EQUAL,1,4294967295),r.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),r.buffers.stencil.setLocked(!0)}}class V_ extends Pn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class G_{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const a=e.getSize(new De);this._width=a.width,this._height=a.height,t=new Vt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:jt}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new gu(_r),this.copyPass.material.blending=gi,this.timer=new md}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let a=!1;for(let n=0,r=this.passes.length;n<r;n++){const s=this.passes[n];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,a),s.needsSwap){if(a){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}hc!==void 0&&(s instanceof hc?a=!0:s instanceof V_&&(a=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new De);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const a=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(a,n),this.renderTarget2.setSize(a,n);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(a,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class W_ extends Pn{constructor(e,t,a=null,n=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=a,this.clearColor=n,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new be}render(e,t,a){const n=e.autoClear;e.autoClear=!1;let r,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=n}}const X_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new be(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ja extends Pn{constructor(e,t=1,a,n){super(),this.strength=t,this.radius=a,this.threshold=n,this.resolution=e!==void 0?new De(e.x,e.y):new De(256,256),this.clearColor=new be(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new Vt(r,s,{type:jt}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const h=new Vt(r,s,{type:jt});h.texture.name="UnrealBloomPass.h"+u,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const d=new Vt(r,s,{type:jt});d.texture.name="UnrealBloomPass.v"+u,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),r=Math.round(r/2),s=Math.round(s/2)}const o=X_;this.highPassUniforms=Rr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ct({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new De(1/r,1/s),r=Math.round(r/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1),new P(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Rr.clone(_r.uniforms),this.blendMaterial=new ct({uniforms:this.copyUniforms,vertexShader:_r.vertexShader,fragmentShader:_r.fragmentShader,premultipliedAlpha:!0,blending:Pt,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new be,this._oldClearAlpha=1,this._basic=new ri,this._fsQuad=new mu(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let a=Math.round(e/2),n=Math.round(t/2);this.renderTargetBright.setSize(a,n);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(a,n),this.renderTargetsVertical[r].setSize(a,n),this.separableBlurMaterials[r].uniforms.invSize.value=new De(1/a,1/n),a=Math.round(a/2),n=Math.round(n/2)}render(e,t,a,n,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=a.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=ja.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ja.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(a),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=s}_getSeparableBlurMaterial(e){const t=[],a=e/3;for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(a*a))/a);return new ct({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new De(.5,.5)},direction:{value:new De(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}}ja.BlurDirectionX=new De(1,0);ja.BlurDirectionY=new De(0,1);function q_(i){return i}function Y_(i){if(i==null)return q_;var e,t,a=i.scale[0],n=i.scale[1],r=i.translate[0],s=i.translate[1];return function(o,l){l||(e=t=0);var c=2,u=o.length,h=new Array(u);for(h[0]=(e+=o[0])*a+r,h[1]=(t+=o[1])*n+s;c<u;)h[c]=o[c],++c;return h}}function j_(i,e){for(var t,a=i.length,n=a-e;n<--a;)t=i[n],i[n++]=i[a],i[a]=t}function $_(i,e){return typeof e=="string"&&(e=i.objects[e]),e.type==="GeometryCollection"?{type:"FeatureCollection",features:e.geometries.map(function(t){return dc(i,t)})}:dc(i,e)}function dc(i,e){var t=e.id,a=e.bbox,n=e.properties==null?{}:e.properties,r=_u(i,e);return t==null&&a==null?{type:"Feature",properties:n,geometry:r}:a==null?{type:"Feature",id:t,properties:n,geometry:r}:{type:"Feature",id:t,bbox:a,properties:n,geometry:r}}function _u(i,e){var t=Y_(i.transform),a=i.arcs;function n(u,h){h.length&&h.pop();for(var d=a[u<0?~u:u],p=0,g=d.length;p<g;++p)h.push(t(d[p],p));u<0&&j_(h,g)}function r(u){return t(u)}function s(u){for(var h=[],d=0,p=u.length;d<p;++d)n(u[d],h);return h.length<2&&h.push(h[0]),h}function o(u){for(var h=s(u);h.length<4;)h.push(h[0]);return h}function l(u){return u.map(o)}function c(u){var h=u.type,d;switch(h){case"GeometryCollection":return{type:h,geometries:u.geometries.map(c)};case"Point":d=r(u.coordinates);break;case"MultiPoint":d=u.coordinates.map(r);break;case"LineString":d=s(u.arcs);break;case"MultiLineString":d=u.arcs.map(s);break;case"Polygon":d=l(u.arcs);break;case"MultiPolygon":d=u.arcs.map(l);break;default:return null}return{type:h,coordinates:d}}return c(e)}function K_(i,e){var t={},a={},n={},r=[],s=-1;e.forEach(function(c,u){var h=i.arcs[c<0?~c:c],d;h.length<3&&!h[1][0]&&!h[1][1]&&(d=e[++s],e[s]=c,e[u]=d)}),e.forEach(function(c){var u=o(c),h=u[0],d=u[1],p,g;if(p=n[h])if(delete n[p.end],p.push(c),p.end=d,g=a[d]){delete a[g.start];var S=g===p?p:p.concat(g);a[S.start=p.start]=n[S.end=g.end]=S}else a[p.start]=n[p.end]=p;else if(p=a[d])if(delete a[p.start],p.unshift(c),p.start=h,g=n[h]){delete n[g.end];var m=g===p?p:g.concat(p);a[m.start=g.start]=n[m.end=p.end]=m}else a[p.start]=n[p.end]=p;else p=[c],a[p.start=h]=n[p.end=d]=p});function o(c){var u=i.arcs[c<0?~c:c],h=u[0],d;return i.transform?(d=[0,0],u.forEach(function(p){d[0]+=p[0],d[1]+=p[1]})):d=u[u.length-1],c<0?[d,h]:[h,d]}function l(c,u){for(var h in c){var d=c[h];delete u[d.start],delete d.start,delete d.end,d.forEach(function(p){t[p<0?~p:p]=1}),r.push(d)}}return l(n,a),l(a,n),e.forEach(function(c){t[c<0?~c:c]||r.push([c])}),r}function pc(i){return _u(i,Z_.apply(this,arguments))}function Z_(i,e,t){var a,n,r;if(arguments.length>1)a=J_(i,e,t);else for(n=0,a=new Array(r=i.arcs.length);n<r;++n)a[n]=n;return{type:"MultiLineString",arcs:K_(i,a)}}function J_(i,e,t){var a=[],n=[],r;function s(h){var d=h<0?~h:h;(n[d]||(n[d]=[])).push({i:h,g:r})}function o(h){h.forEach(s)}function l(h){h.forEach(o)}function c(h){h.forEach(l)}function u(h){switch(r=h,h.type){case"GeometryCollection":h.geometries.forEach(u);break;case"LineString":o(h.arcs);break;case"MultiLineString":case"Polygon":l(h.arcs);break;case"MultiPolygon":c(h.arcs);break}}return u(e),n.forEach(t==null?function(h){a.push(h[0].i)}:function(h){t(h[0].g,h[h.length-1].g)&&a.push(h[0].i)}),a}const Q_=40,ev=70,Va=1,mt=new WeakMap;let vr=null;function Oa(i,e,t=1.03){const a=(90-i)*(Math.PI/180),n=(e+180)*(Math.PI/180);return new P(-t*Math.sin(a)*Math.cos(n),t*Math.cos(a),t*Math.sin(a)*Math.sin(n))}function $i(){const i=getComputedStyle(document.documentElement);return{neonCyan:i.getPropertyValue("--neon-cyan").trim(),neonGreen:i.getPropertyValue("--neon-green").trim(),neonAmber:i.getPropertyValue("--neon-amber").trim(),neonMagenta:i.getPropertyValue("--neon-magenta").trim()}}function da(i,e){return i<=Q_?e.neonGreen:i<=ev?e.neonAmber:e.neonMagenta}const tv={uniforms:{tDiffuse:{value:null},shiftAmt:{value:.9}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",fragmentShader:`
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
  `};function vu(i,{autoRotate:e=!0,bloomStrength:t=1.7}={}){const a=new AbortController,{signal:n}=a,r=window.matchMedia("(prefers-reduced-motion: reduce)").matches,s=$i(),o=new Xo({E:!0,alpha:!0});o.setPixelRatio(window.devicePixelRatio),o.setSize(i.clientWidth||800,i.clientHeight||600),o.domElement.classList.add("s9-threatmap__canvas"),o.domElement.style.filter="blur(0.66px) drop-shadow(0 1 4px rgba(0,200,255,0.84))",i.appendChild(o.domElement);const l=new Go,c=new Yt(45,(i.clientWidth||800)/(i.clientHeight||600),.1,100);c.position.set(0,0,3);const u=new vi(Va,48,48),h=new vi(Va*.98,48,48),d=new be(s.neonCyan||"#00d4b0"),p=new ri({color:d,wireframe:!0,transparent:!0,opacity:.005,depthTest:!0,depthWrite:!0,side:Nt}),g=new it(u,p);g.renderOrder=0,l.add(g);const S=new ri({colorWrite:!1,depthWrite:!0,depthTest:!0,depthFunc:Er,side:Nt}),m=new it(h,S);m.renderOrder=1,l.add(m);const f=new ri({color:new be("#010e0b"),transparent:!0,opacity:.85,depthTest:!0,depthWrite:!0,side:ni}),y=new it(u,f);y.renderOrder=1,l.add(y);const b=new ri({color:d,wireframe:!0,transparent:!0,opacity:.002,depthTest:!0,depthWrite:!1,side:li}),M=new it(u,b);M.renderOrder=2,l.add(M);const w=new ri({color:d,wireframe:!0,transparent:!0,opacity:.0061,blending:Pt,depthTest:!0,depthWrite:!1}),A=new it(u,w);A.renderOrder=3,l.add(A);const D=new vi(Va,48,48),v=new ct({uniforms:{uColor:{value:new P(d.r,d.g,d.b)}},vertexShader:`
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
    `,transparent:!0,blending:Pt,depthWrite:!0,side:li}),T=new it(D,v);T.renderOrder=4,l.add(T);const W=new A_(c,o.domElement);W.enableDamping=!0,W.dampingFactor=.05,W.autoRotate=e&&!r,W.autoRotateSpeed=.4,W.enablePan=!1,W.minDistance=1.5,W.maxDistance=5,W.minPolarAngle=Math.PI/2-42.5*Math.PI/180,W.maxPolarAngle=Math.PI/2+42.5*Math.PI/180;const C=new G_(o),O=new W_(l,c);C.addPass(O);const H=new ja(new De(i.clientWidth||800,i.clientHeight||600),t*1.8,1.525,.45);C.addPass(H);const G=new gu(tv);G.enabled=!1,C.addPass(G);const k=document.createElement("div");k.className="s9-threatmap__overlay",k.innerHTML=`
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
  `,i.appendChild(k);let z=null;function F(){z=requestAnimationFrame(F),W.update(),C.render()}F();let Q=null;W.addEventListener("start",()=>{W.autoRotate=!1,Q!==null&&(clearTimeout(Q),Q=null);const ne=mt.get(i);ne&&(ne.cameraLerpTarget=null,ne.lastOrbitInteraction=Date.now())}),W.addEventListener("end",()=>{!r&&e&&(Q=setTimeout(()=>{W.autoRotate=!0,Q=null},6e3))});const K=new ResizeObserver(()=>{const ne=i.clientWidth,Fe=i.clientHeight;!ne||!Fe||(c.aspect=ne/Fe,c.updateProjectionMatrix(),o.setSize(ne,Fe),C.setSize(ne,Fe),H.resolution.set(ne,Fe))});K.observe(i);const le=new _d;o.domElement.addEventListener("click",ne=>{const Fe=mt.get(i);if(!Fe)return;const Ue=o.domElement.getBoundingClientRect(),q=Ue.width,Z=Ue.height,re=(ne.clientX-Ue.left)/q*2-1,Oe=-((ne.clientY-Ue.top)/Z)*2+1;le.setFromCamera(new De(re,Oe),c);const we=Array.from(Fe.nodeMap.values()).map(je=>je.mesh),pe=le.intersectObjects(we,!1);if(pe.length>0){const je=pe[0].object;Si(i,je.userData.nodeId)}else Fe.activeNodeId!==null&&Si(i,null)},{signal:n}),mt.set(i,{animFrameId:z,renderer:o,composer:C,bloomPass:H,controls:W,scene:l,camera:c,resizeObserver:K,nodeMap:new Map,edgeMap:new Map,abortController:a,resumeTimer:null,reducedMotion:r,activeNodeId:null,colors:s,cyanColor:d,globeGeo:u,occluderGeo:h,globeBack:g,occluder:m,globeSurface:y,globeFront:M,globeGlow:A,rimGeo:D,rimMesh:T,geoGroup:null,cameraLerpTarget:null,lastOrbitInteraction:0,arcs:[],satelliteMode:!1,sunAngle:Math.random()*Math.PI*2,satelliteGroup:null,glitchPass:G,glitchActive:null,glitchNext:performance.now()+8e3+Math.random()*12e3});const de=mt.get(i);de.animFrameId=z,cancelAnimationFrame(z);function xe(){const ne=mt.get(i);if(ne){ne.animFrameId=requestAnimationFrame(xe),ne.cameraLerpTarget&&Date.now()-ne.lastOrbitInteraction>=3e3&&(ne.camera.position.lerp(ne.cameraLerpTarget,.06),ne.camera.position.distanceTo(ne.cameraLerpTarget)<.04&&(ne.camera.position.copy(ne.cameraLerpTarget),ne.cameraLerpTarget=null)),ne.controls.update();for(let Fe=ne.arcs.length-1;Fe>=0;Fe--){const Ue=ne.arcs[Fe],q=Math.min(1,(Date.now()-Ue.t0)/Ue.dur);if(Ue.particle.position.copy(Ue.curve.getPoint(q)),q>.75){const Z=1-(q-.75)/.25;Ue.ptMat.opacity=.9*Z,Ue.lineMat.opacity=.1*Z}q>=1&&(ne.scene.remove(Ue.line),ne.scene.remove(Ue.particle),Ue.lineGeo.dispose(),Ue.lineMat.dispose(),Ue.ptGeo.dispose(),Ue.ptMat.dispose(),ne.arcs.splice(Fe,1))}if(ne.satelliteMode&&ne.satMat&&(ne.sunAngle+=15e-5,ne.satMat.uniforms.sunDir.value.set(Math.cos(ne.sunAngle),.22,Math.sin(ne.sunAngle)).normalize()),rv(ne),ne.activeNodeId!==null){const Fe=ne.nodeMap.get(ne.activeNodeId),Ue=i.querySelector(".s9-threatmap__crosshair");if(Fe&&Ue){const q=i.clientWidth,Z=i.clientHeight,re=Fe.mesh.position.clone().project(ne.camera),Oe=(re.x*.5+.5)*q,we=(-re.y*.5+.5)*Z;Ue.style.left=`${Oe}px`,Ue.style.top=`${we}px`}}ne.composer.render()}}de.animFrameId=requestAnimationFrame(xe),nv(i)}function iv(i){var e;return((e=mt.get(i))==null?void 0:e.camera)??null}function To(i,{id:e,lat:t,lng:a,label:n,level:r}){const s=mt.get(i);if(!s)return;if(s.nodeMap.has(e)){console.warn(`[s9-threatmap] addNode: node "${e}" already exists.`);return}const o=$i(),l=da(r,o),c=new vi(.02,8,8),u=new ri({color:new be(l)}),h=new it(c,u),d=Oa(t,a);h.position.copy(d),h.userData.nodeId=e,h.userData.label=n,h.userData.lat=t,h.userData.lng=a,h.userData.level=r,s.scene.add(h),s.nodeMap.set(e,{mesh:h,lat:t,lng:a,label:n,level:r}),Su(i)}function xu(i,e){const t=mt.get(i);if(!t)return;const a=t.nodeMap.get(e);if(!a){console.warn(`[s9-threatmap] removeNode: node "${e}" not found.`);return}t.activeNodeId===e&&Si(i,null);for(const[n,r]of t.edgeMap)(r.from===e||r.to===e)&&av(i,n);a.mesh.geometry.dispose(),a.mesh.material.dispose(),t.scene.remove(a.mesh),t.nodeMap.delete(e),Su(i)}function av(i,e){const t=mt.get(i);if(!t)return;const a=t.edgeMap.get(e);a&&(a.line.geometry.dispose(),a.line.material.dispose(),t.scene.remove(a.line),t.edgeMap.delete(e))}function Si(i,e){const t=mt.get(i);if(!t)return;if(t.activeNodeId!==null){const l=t.nodeMap.get(t.activeNodeId);if(l){const d=$i();l.mesh.material.color.set(da(l.level,d))}const c=i.querySelector(".s9-threatmap__crosshair");if(c){c.classList.remove("s9-threatmap__crosshair--visible");const d=c.querySelector(".s9-threatmap__crosshair-label");d&&(d.textContent="")}i.removeAttribute("data-active-node");const u=i.querySelector(".s9-threatmap__coords-lat"),h=i.querySelector(".s9-threatmap__coords-lng");u&&(u.textContent="LAT: --.-°"),h&&(h.textContent="LNG: --.-°"),i.dispatchEvent(new CustomEvent("s9:threatmap-node-deselect",{bubbles:!0,detail:{nodeId:t.activeNodeId}})),t.activeNodeId=null}if(e===null)return;const a=t.nodeMap.get(e);if(!a)return;const n=$i();a.mesh.material.color.set(da(a.level,n));const r=i.querySelector(".s9-threatmap__crosshair");if(r){r.classList.add("s9-threatmap__crosshair--visible");const l=r.querySelector(".s9-threatmap__crosshair-label");l&&(l.textContent=a.label)}i.setAttribute("data-active-node",e);const s=i.querySelector(".s9-threatmap__coords-lat"),o=i.querySelector(".s9-threatmap__coords-lng");s&&(s.textContent=`LAT: ${a.lat.toFixed(2)}°`),o&&(o.textContent=`LNG: ${a.lng.toFixed(2)}°`),t.activeNodeId=e,i.dispatchEvent(new CustomEvent("s9:threatmap-node-select",{bubbles:!0,detail:{nodeId:e,label:a.label,lat:a.lat,lng:a.lng,level:a.level}}))}function Li(i,e){if(!mt.get(i))return;const t=Math.max(0,Math.min(100,e));i.setAttribute("data-threat-level",t)}function Pr(i,e,t){const a=mt.get(i);if(!a)return;const n=a.nodeMap.get(e);if(!n)return;const r=n.level;if(n.level=t,n.mesh.userData.level=t,a.activeNodeId!==e){const s=$i();n.mesh.material.color.set(da(t,s))}return r}function pa(i,e){const t=mt.get(i);if(!t)return;const a=t.nodeMap.get(e);if(!a||Date.now()-t.lastOrbitInteraction<3e3)return;const n=t.camera.position.length();t.cameraLerpTarget=a.mesh.position.clone().normalize().multiplyScalar(n),t.controls.autoRotate=!1,t.resumeTimer!==null&&(clearTimeout(t.resumeTimer),t.resumeTimer=null)}async function nv(i){let e;try{const d=await fetch("/data/countries-110m.json");if(!d.ok)throw new Error(`HTTP ${d.status}`);e=await d.json(),vr=e}catch(d){console.warn("[s9-threatmap] geo lines: failed to load /data/countries-110m.json",d);return}const t=mt.get(i);if(!t)return;const a=new za,n=t.cyanColor,r=pc(e,e.objects.land),s=new Jt({color:n,transparent:!0,opacity:.85,depthWrite:!0}),o=new Jt({color:n,transparent:!0,opacity:.8,blending:Pt,depthWrite:!0}),l=new Jt({color:n,transparent:!0,opacity:.45,blending:Pt,depthWrite:!1});for(const d of r.coordinates){const p=d.map(([b,M])=>Oa(M,b,1.002)),g=d.map(([b,M])=>Oa(M,b,1.006)),S=d.map(([b,M])=>Oa(M,b,1.011)),m=new Ri(new ht().setFromPoints(p),s),f=new Ri(new ht().setFromPoints(g),o),y=new Ri(new ht().setFromPoints(S),l);m.userData.geoType=f.userData.geoType=y.userData.geoType="coast",a.add(y,f,m)}const c=pc(e,e.objects.countries,(d,p)=>d!==p),u=new Jt({color:n,transparent:!0,opacity:.35,depthWrite:!0}),h=new Jt({color:n,transparent:!0,opacity:.15,blending:Pt,depthWrite:!1});for(const d of c.coordinates){const p=d.map(([f,y])=>Oa(y,f,1.012)),g=d.map(([f,y])=>Oa(y,f,1.022)),S=new Ri(new ht().setFromPoints(p),u),m=new Ri(new ht().setFromPoints(g),h);S.userData.geoType=m.userData.geoType="border",a.add(m,S)}t.scene.add(a),t.satelliteMode&&(a.visible=!1),t.geoGroup=a}function Su(i){const e=mt.get(i);if(!e)return;const t=i.querySelector(".s9-threatmap__node-count");t&&(t.textContent=`NODES: ${e.nodeMap.size}`)}function rv(i){const e=i.glitchPass;if(!e)return;const t=performance.now()*.001;e.uniforms.shiftAmt.value=.4+Math.sin(t*.6)*.2}function fc(i,e){const t=mt.get(i);if(!t||t.reducedMotion)return;const a=t.nodeMap.get(e);if(!a)return;const n=$i(),r=da(a.level,n),s=20,o=.035,l=[];for(let S=0;S<=s;S++){const m=S/s*Math.PI*2;l.push(new P(Math.cos(m)*o,Math.sin(m)*o,0))}const c=new ht().setFromPoints(l),u=new Jt({color:new be(r),transparent:!0,opacity:.8,depthWrite:!1}),h=new Qc(c,u);h.position.copy(a.mesh.position);const d=a.mesh.position.clone().normalize();h.quaternion.setFromUnitVectors(new P(0,0,1),d),t.scene.add(h);const p=Date.now(),g=700;(function S(){if(!mt.get(i)){t.scene.remove(h),c.dispose(),u.dispose();return}const m=Math.min(1,(Date.now()-p)/g);h.scale.setScalar(1+m*6),u.opacity=.85*(1-m),m<1?requestAnimationFrame(S):(t.scene.remove(h),c.dispose(),u.dispose())})()}function mc(i){const e=mt.get(i);if(!e)return;const t=$i();e.colors=t;const a=t.neonCyan||"#00d48ddf";e.globeBack&&e.globeBack.material.color.set(a),e.globeFront&&e.globeFront.material.color.set(a),e.geoGroup&&e.geoGroup.traverse(n=>{n.isLine&&n.material.color.set(t.neonCyan||"#008410D0")});for(const n of e.nodeMap.values()){const r=da(n.level,t);n.mesh.material.color.set(r),n.mesh.material.emissive.set(r)}}function yu(i,e,t){const a=mt.get(i);if(!a||a.reducedMotion)return;const n=a.nodeMap.get(e),r=a.nodeMap.get(t);if(!n||!r)return;const s=$i(),o=da(r.level,s),l=n.mesh.position.clone(),c=r.mesh.position.clone(),u=l.clone().add(c).multiplyScalar(.5),h=.2+u.length()*.25,d=u.clone().normalize().multiplyScalar(Va+h),p=new td(l,d,c),g=new ht().setFromPoints(p.getPoints(48)),S=new Jt({color:new be(o),transparent:!0,opacity:.1,depthWrite:!1}),m=new Ri(g,S);m.renderOrder=2;const f=new vi(.009,4,4),y=new ri({color:new be(o),transparent:!0,opacity:.9}),b=new it(f,y);b.renderOrder=3,b.position.copy(l),a.scene.add(m),a.scene.add(b),a.arcs.push({curve:p,line:m,lineGeo:g,lineMat:S,particle:b,ptGeo:f,ptMat:y,t0:Date.now(),dur:1e3+Math.random()*700})}function gn(i,e,t,a){return[(e+180)/360*t,(90-i)/180*a]}function sv(i=null){const e=document.createElement("canvas");e.width=2048,e.height=1024;const t=e.getContext("2d"),a=t.createLinearGradient(0,0,0,1024);if(a.addColorStop(0,"#071a2e"),a.addColorStop(.15,"#082035"),a.addColorStop(.5,"#0a2a46"),a.addColorStop(.85,"#082035"),a.addColorStop(1,"#071a2e"),t.fillStyle=a,t.fillRect(0,0,2048,1024),i){const n=$_(i,i.objects.land),r=(n.type==="FeatureCollection"?n.features:[n]).flatMap(l=>{const c=l.geometry;return c?c.type==="Polygon"?[c.coordinates]:c.coordinates:[]}),s=t.createLinearGradient(0,0,0,1024);s.addColorStop(0,"#dce8dc"),s.addColorStop(.06,"#8a9c7a"),s.addColorStop(.16,"#527848"),s.addColorStop(.28,"#4e7040"),s.addColorStop(.4,"#4a6c34"),s.addColorStop(.5,"#3a5c24"),s.addColorStop(.6,"#4a6c34"),s.addColorStop(.72,"#4e7040"),s.addColorStop(.84,"#7a8c6a"),s.addColorStop(.92,"#ccd8c4"),s.addColorStop(1,"#eaf0ea");for(const l of r)for(let c=0;c<l.length;c++){const u=l[c];t.beginPath();for(let h=0;h<u.length;h++){const[d,p]=u[h],g=(d+180)/360*2048,S=(90-p)/180*1024;h===0?t.moveTo(g,S):t.lineTo(g,S)}t.closePath(),t.fillStyle=c===0?s:"#0a2a46",t.fill()}const o=[[22,15,16,28,"rgba(172,142, 88,0.72)"],[23,44,8,12,"rgba(178,148, 96,0.68)"],[27,70,5,9,"rgba(182,158,112,0.52)"],[42,100,6,16,"rgba(152,128, 86,0.58)"],[-25,132,10,17,"rgba(168,134, 82,0.58)"],[-22,-68,4,6,"rgba(142,118, 76,0.48)"],[35,-114,5,8,"rgba(158,128, 82,0.42)"],[40,58,5,8,"rgba(158,134, 88,0.45)"]];for(const[l,c,u,h,d]of o){const[p,g]=gn(l,c,2048,1024),S=h/360*2048,m=u/180*1024,f=t.createRadialGradient(p,g,0,p,g,Math.max(S,m)),y=d.replace(/[\d.]+\)$/,"0)");f.addColorStop(0,d),f.addColorStop(.55,d),f.addColorStop(.88,d.replace(/[\d.]+\)$/,"0.08)")),f.addColorStop(1,y),t.fillStyle=f,t.beginPath(),t.ellipse(p,g,S,m,0,0,Math.PI*2),t.fill()}t.strokeStyle="rgba(120,175,210,0.22)",t.lineWidth=.8;for(const l of r){const c=l[0];t.beginPath();for(let u=0;u<c.length;u++){const[h,d]=c[u],p=(h+180)/360*2048,g=(90-d)/180*1024;u===0?t.moveTo(p,g):t.lineTo(p,g)}t.closePath(),t.stroke()}}t.strokeStyle="rgba(100,150,200,0.04)",t.lineWidth=.5;for(let n=-80;n<=80;n+=30){const r=gn(n,0,2048,1024)[1];t.beginPath(),t.moveTo(0,r),t.lineTo(2048,r),t.stroke()}for(let n=-180;n<=180;n+=30){const r=gn(0,n,2048,1024)[0];t.beginPath(),t.moveTo(r,0),t.lineTo(r,1024),t.stroke()}return e}function ov(){const i=document.createElement("canvas");i.width=1024,i.height=512;const e=i.getContext("2d");e.fillStyle="#000810",e.fillRect(0,0,1024,512);const t=[[40.7,-74,4],[34,-118.2,3.5],[41.9,-87.6,3],[29.8,-95.4,2.5],[19.4,-99.1,3],[43.7,-79.4,3],[45.5,-73.6,2.5],[49.3,-123.1,2],[38.9,-77,2.5],[42.4,-71.1,2.5],[32.8,-96.8,2.5],[33.7,-84.4,2],[37.8,-122.4,2.5],[47.6,-122.3,2],[39.7,-105,2],[33.4,-112.1,2],[36.2,-115.1,2],[29.4,-98.5,2],[32.7,-97.1,2],[30.3,-81.7,1.5],[51,-114.1,2],[53.5,-113.5,2],[49.9,-97.1,2],[14.1,-87.2,1.5],[13.7,-89.2,1.5],[-23.5,-46.6,4],[-22.9,-43.2,3.5],[-34.6,-58.4,3.5],[-12,-77,2],[4.7,-74.1,2],[10.5,-66.9,2],[-33.5,-70.7,2.5],[-3.7,-38.5,2],[-8.1,-34.9,2],[-19.9,-43.9,2.5],[-30,-51.2,2],[-15.8,-47.9,2],[51.5,-.1,4],[48.9,2.3,4],[52.5,13.4,3.5],[55.8,37.6,4],[41,28.9,3.5],[59.9,10.8,2],[59.3,18.1,2],[60.2,25,2],[52.2,21,2.5],[50.1,14.4,2.5],[47.5,19,2.5],[48.2,16.4,2.5],[47.4,8.5,2.5],[48.1,11.6,3],[52.4,4.9,3],[40.4,-3.7,3],[41.4,2.2,3],[45.5,9.2,3],[41.9,12.5,3],[37.9,23.7,2.5],[50,8.7,2.5],[51,13.7,2],[51.2,6.8,2.5],[50.9,4.3,2.5],[53.5,-2.2,2],[55.7,12.6,2],[50.5,30.5,2.5],[59.5,30.3,2.5],[48,37.8,2],[46.5,30.7,2],[49.8,24,2],[50.4,30.5,2],[45.4,28,2],[44.4,26.1,2],[42.7,23.3,2],[37.1,-8.6,2],[30.1,31.3,3.5],[25.2,55.3,2.5],[33.3,44.4,2.5],[35.7,51.4,3],[24.7,46.7,2.5],[31.8,35.2,2],[33.9,35.5,2],[36.8,10.2,2],[32.9,13.2,2],[30.7,29.7,2],[6.5,3.4,2.5],[-26.2,28,3],[-33.9,18.4,2],[-1.3,36.8,2],[5.3,-4,2],[14.7,17.4,1.5],[9.1,7.4,2],[4.4,18.6,1.5],[-4.3,15.3,1.5],[-11.7,43.3,1.5],[-18.9,47.5,1.5],[28.6,77.2,4],[19.1,72.9,3.5],[12.9,77.6,3],[23.7,90.4,3],[24.9,67,2.5],[31.6,74.3,2.5],[33.7,73.1,2],[17.4,78.5,2.5],[22.6,88.4,2.5],[13.1,80.3,2.5],[23,72.6,2],[22.3,70.8,2],[26.9,75.8,2],[21.2,81.4,2],[27.7,85.3,2],[41.3,69.2,2],[43.3,76.9,2],[51.2,71.5,1.5],[53.9,27.6,2],[54.7,55.9,2],[56.8,60.6,2],[55,73.4,2],[56,92.9,2],[52.3,104.3,2],[53.7,87.1,2],[62,129.7,1.5],[43.1,131.9,2],[61.8,34.4,2],[35.7,139.7,5],[37.5,127,4],[39.9,116.4,4.5],[31.2,121.5,4.5],[23.1,113.3,4],[22.3,114.2,3.5],[30.6,104.1,3.5],[32.1,118.8,3.5],[30.3,120.2,3],[36.7,117,2.5],[34.3,108.9,2.5],[26,119.3,2.5],[41.8,123.4,2.5],[45.8,126.5,2.5],[34.6,135.5,3.5],[33.6,130.4,3],[1.3,103.8,3.5],[13.7,100.5,2.5],[10.8,106.7,2.5],[14.6,121,2.5],[3.1,101.7,2.5],[6.2,106.8,3],[21,105.8,2],[-6.2,106.8,2.5],[-33.9,151.2,2.5],[-37.8,144.9,2],[-27.5,153,2],[-31.9,115.9,2],[-43.5,172.6,1.5]];for(const[a,n,r]of t){const[s,o]=gn(a,n,1024,512),l=r*2.2,c=e.createRadialGradient(s,o,0,s,o,l);c.addColorStop(0,"rgba(255,210,120,0.22)"),c.addColorStop(.5,"rgba(255,170,60,0.08)"),c.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=c,e.beginPath(),e.arc(s,o,l,0,Math.PI*2),e.fill()}e.globalCompositeOperation="lighter";for(const[a,n,r]of t){const[s,o]=gn(a,n,1024,512),l=Math.max(1,r*.9),c=e.createRadialGradient(s,o,0,s,o,l);c.addColorStop(0,`rgba(255,245,200,${Math.min(.9,.5+r*.1)})`),c.addColorStop(.6,"rgba(255,200,100,0.15)"),c.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=c,e.beginPath(),e.arc(s,o,l,0,Math.PI*2),e.fill()}return e.globalCompositeOperation="source-over",i}function gc(i){return new Promise((e,t)=>{new hd().load(i,e,void 0,t)})}async function lv(i){const e=mt.get(i);if(!e||e.satelliteGroup)return;let t,a,n=1;try{[t,a]=await Promise.all([gc("/textures/earth_day.jpg"),gc("/textures/earth_night.jpg")]),t.colorSpace=Ht,a.colorSpace=Ht}catch(d){if(console.warn("[s9-threatmap] satellite textures not found, using procedural fallback",d),!vr)try{const p=await fetch("/data/countries-110m.json");p.ok&&(vr=await p.json())}catch{}t=new So(sv(vr)),a=new So(ov()),n=0}const r=new ct({uniforms:{dayMap:{value:t},nightMap:{value:a},sunDir:{value:new P(Math.cos(e.sunAngle),.22,Math.sin(e.sunAngle)).normalize()},realTex:{value:n}},vertexShader:`
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
    `}),s=new vi(Va,64,32),o=new it(s,r);o.renderOrder=0;const l=new vi(Va*1.055,32,16),c=new ct({uniforms:{glowCol:{value:new be(51455)}},vertexShader:`
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
    `,side:li,blending:Pt,transparent:!0,depthWrite:!1}),u=new it(l,c);u.renderOrder=1;const h=new za;h.add(o),h.add(u),h.visible=!1,e.scene.add(h),Object.assign(e,{satelliteGroup:h,satGeo:s,satMat:r,atmGeo:l,atmMat:c,dayTex:t,nightTex:a})}async function cv(i,e){const t=mt.get(i);t&&(e?(t.globeBack&&(t.globeBack.visible=!1),t.occluder&&(t.occluder.visible=!1),t.globeFront&&(t.globeFront.visible=!1),t.globeSurface&&(t.globeSurface.visible=!1),t.globeGlow&&(t.globeGlow.visible=!1),t.geoGroup&&(t.geoGroup.visible=!1),t.bloomPass&&(t._bloomPrev={strength:t.bloomPass.strength,threshold:t.bloomPass.threshold,radius:t.bloomPass.radius},t.bloomPass.strength=.32,t.bloomPass.threshold=.85,t.bloomPass.radius=.35),t.satelliteMode=!0,await lv(i),t.satelliteGroup&&(t.satelliteGroup.visible=!0)):(t.satelliteGroup&&(t.satelliteGroup.visible=!1),t.globeBack&&(t.globeBack.visible=!0),t.occluder&&(t.occluder.visible=!0),t.globeFront&&(t.globeFront.visible=!0),t.globeSurface&&(t.globeSurface.visible=!0),t.globeGlow&&(t.globeGlow.visible=!0),t.geoGroup&&(t.geoGroup.visible=!0),t.bloomPass&&t._bloomPrev&&(t.bloomPass.strength=t._bloomPrev.strength,t.bloomPass.threshold=t._bloomPrev.threshold,t.bloomPass.radius=t._bloomPrev.radius),t.satelliteMode=!1))}const uv=new WeakMap;function hv(i){const e=new AbortController;uv.set(i,e),i.classList.add("s9-panel--booting"),i.addEventListener("animationend",t=>{t.animationName==="crt-flicker"&&(i.classList.remove("s9-panel--booting"),i.dispatchEvent(new CustomEvent("s9:panel-mount",{bubbles:!0,detail:{id:i.dataset.s9Id??null}})))},{signal:e.signal,once:!0})}const Es=["complete","active","failed","pending"];function dv(i,e){if(!Es.includes(e)){console.warn(`[s9-sequence] Unknown state: "${e}". Expected one of: ${Es.join(", ")}.`);return}Es.forEach(t=>i.classList.remove(`s9-sequence__entry--${t}`)),e==="failed"?(i.classList.add("s9-sequence__entry--fail-flash"),i.addEventListener("animationend",()=>{i.classList.remove("s9-sequence__entry--fail-flash"),i.classList.add("s9-sequence__entry--failed"),_c(i,e)},{once:!0})):(i.classList.add(`s9-sequence__entry--${e}`),_c(i,e))}function _c(i,e){i.dispatchEvent(new CustomEvent("s9:sequence-step-change",{bubbles:!0,detail:{state:e}}))}const Ao=[..."アウエオカキケコサシスセソタツテナニヌネ",..."ハヒホマミムメモヤヨラリワー",..."012345789z",...':."*+<>|¦╌▪꞊'],mn=96,vc=2400,xr=70,pv=.12,fv=.08,mv=16,xc=3.5,gv=8;function _v(){const i=Ao.length,e=mn,t=document.createElement("canvas");t.width=e,t.height=e*i;const a=t.getContext("2d");a.fillStyle="#000",a.fillRect(0,0,t.width,t.height),a.fillStyle="#fff",a.textAlign="center",a.textBaseline="middle",a.font=`${Math.round(e*.78)}px "Matrix-Code", "Share Tech Mono", monospace`,Ao.forEach((r,s)=>a.fillText(r,e/2,e*s+e/2));const n=new So(t);return n.flipY=!1,n.minFilter=uh,n.magFilter=Rt,n.generateMipmaps=!0,{tex:n,count:i,canvas:t,ctx:a}}function vv(){const i=new dd,e=new Ui(1,1);i.index=e.index.clone(),i.setAttribute("position",e.getAttribute("position").clone()),i.setAttribute("uv",e.getAttribute("uv").clone()),e.dispose();const t=vc*xr,a=new Float32Array(t),n=new Float32Array(t),r=new Float32Array(t),s=new Float32Array(t),o=new Float32Array(t),l=new Float32Array(t),c=new Float32Array(t),u=new Float32Array(t),h=new Float32Array(t),d=new Float32Array(t);for(let p=0;p<vc;p++){const g=Math.random()*Math.PI*2,S=1-2*Math.random(),m=Math.sqrt(1-S*S),f=Math.pow(Math.random(),.12),y=xc+f*(gv-xc),b=m*Math.cos(g)*y,M=m*Math.sin(g)*y,w=S*y+(Math.random()-.5)*2,A=.4+Math.random()*1.87,D=Math.random(),v=.5+Math.random()*1,T=.18+Math.random()*.72,W=.004+Math.random()*.03;for(let C=0;C<xr;C++){const O=p*xr+C;a[O]=p,n[O]=C,r[O]=b,s[O]=M,o[O]=A,l[O]=D,c[O]=w,u[O]=v,h[O]=T,d[O]=W}}return i.setAttribute("aColIdx",new It(a,1)),i.setAttribute("aRowIdx",new It(n,1)),i.setAttribute("aWX",new It(r,1)),i.setAttribute("aWZ",new It(s,1)),i.setAttribute("aSpeed",new It(o,1)),i.setAttribute("aSeed",new It(l,1)),i.setAttribute("aYOff",new It(c,1)),i.setAttribute("aScale",new It(u,1)),i.setAttribute("aAlpha",new It(h,1)),i.setAttribute("aTrail",new It(d,1)),i.instanceCount=t,i}const xv=`
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
`,Sv=`
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
`,_n=new Map;function yv(i,e={}){_n.has(i)&&Sc(i);const{color:t="#00ff70",opacity:a=.82,syncCamera:n=null}=e,r=new be(t),s=_v(),o=new Xo({antialias:!1,alpha:!0});o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.setSize(i.clientWidth||1,i.clientHeight||1);const l=o.domElement;l.style.cssText="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;mix-blend-mode:screen;filter:blur(0.15px) drop-shadow(0 0 3px rgba(0,255,112,0.3));",l.style.opacity=String(a),i.appendChild(l);const c=new Go,u=new Yt(45,(i.clientWidth||1)/(i.clientHeight||1),.1,60);u.position.set(0,0,3),u.lookAt(0,0,0);const h=new vi(1,32,32),d=new ri({colorWrite:!1,depthWrite:!0,depthTest:!0}),p=new it(h,d);p.renderOrder=0,c.add(p);const g=vv(),S={uGlyphTex:{value:s.tex},uGlyphCount:{value:s.count},uTime:{value:0},uFrame:{value:0},uCellW:{value:pv},uCellH:{value:fv},uWorldH:{value:mv},uNRows:{value:xr},uColor:{value:new P(r.r,r.g,r.b)}},m=new ct({uniforms:S,vertexShader:xv,fragmentShader:Sv,transparent:!0,depthWrite:!1,blending:Pt,side:ni}),f=new it(g,m);f.frustumCulled=!1,f.renderOrder=1,c.add(f);const y={renderer:o,material:m,geom:g,atlas:s,occluderGeo:h,occluderMat:d,ro:null,animId:0,syncCamera:n};_n.set(i,y);function b(M){y.animId=requestAnimationFrame(b),S.uTime.value=M*.001,S.uFrame.value+=1,y.syncCamera&&(u.position.copy(y.syncCamera.position),u.quaternion.copy(y.syncCamera.quaternion),u.fov=y.syncCamera.fov,u.near=y.syncCamera.near,u.far=y.syncCamera.far,u.updateProjectionMatrix()),o.render(c,u)}return y.animId=requestAnimationFrame(b),y.ro=new ResizeObserver(()=>{const M=i.clientWidth||1,w=i.clientHeight||1;o.setSize(M,w),u.aspect=M/w,u.updateProjectionMatrix()}),y.ro.observe(i),document.fonts.ready.then(()=>{if(!_n.get(i))return;const{tex:M,canvas:w,ctx:A}=s;A.clearRect(0,0,w.width,w.height),A.fillStyle="#000",A.fillRect(0,0,w.width,w.height),A.fillStyle="#fff",A.textAlign="center",A.textBaseline="middle",A.font=`${Math.round(mn*.78)}px "Matrix-Code", "Share Tech Mono", monospace`,Ao.forEach((D,v)=>A.fillText(D,mn/2,mn*v+mn/2)),M.needsUpdate=!0}),{destroy(){Sc(i)},setColor(M){const w=new be(M);S.uColor.value.set(w.r,w.g,w.b)},setOpacity(M){l.style.opacity=String(M)}}}function Sc(i){const e=_n.get(i);e&&(cancelAnimationFrame(e.animId),e.ro.disconnect(),e.material.dispose(),e.geom.dispose(),e.occluderGeo.dispose(),e.occluderMat.dispose(),e.atlas.tex.dispose(),e.renderer.dispose(),e.renderer.domElement.remove(),_n.delete(i))}const lt=Math.PI*2,Ci=64;let Mv=0;const Sr=new WeakMap;function dn(i){return getComputedStyle(document.documentElement).getPropertyValue(i).trim()}function Yi(i){const e=new be().setStyle(i||"#000000");return[e.r,e.g,e.b]}function bn(i,e,t){return i+(e-i)*Math.max(0,Math.min(1,t))}function Ev(i,e){const t=((i-e)%lt+lt)%lt;return t>Math.PI?t-lt:t}function Mu(){return{neonCyan:dn("--neon-cyan")||"#00f0ff",neonGreen:dn("--neon-green")||"#00ff9d",neonMagenta:dn("--neon-magenta")||"#ff00cc",neonAmber:dn("--neon-amber")||"#ffb300",voidColor:dn("--void")||"#05080f"}}function yc(i){return i==="friendly"?.6:i==="hostile"?1.5:1}function bv(i){const e=bn(.1,.85,i),t=bn(.3,.05,i),a=Math.random();return a<e?"hostile":a<e+t?"friendly":"neutral"}function Tv(i){return i==="friendly"?0:i==="neutral"?1:i==="hostile"?2:3}let bs=null;function Av(i=.08){try{bs||(bs=new(window.AudioContext||window.webkitAudioContext));const e=bs,t=e.currentTime,a=e.createOscillator();a.type="sine",a.frequency.setValueAtTime(1320,t),a.frequency.exponentialRampToValueAtTime(880,t+.08);const n=e.createGain();n.gain.setValueAtTime(i,t),n.gain.exponentialRampToValueAtTime(.001,t+.4),a.connect(n).connect(e.destination),a.start(t),a.stop(t+.4)}catch{}}const Eu=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,wv=`
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
}`;function Nv(i){const e=new Float32Array(192);for(let a=0;a<64;a++){const n=a/64*lt;e[a*3]=Math.sin(n)*i,e[a*3+1]=Math.cos(n)*i,e[a*3+2]=0}const t=new ht;return t.setAttribute("position",new Gt(e,3)),t}function Uv(i){const e=new Float32Array(192);for(let a=0;a<32;a++){const n=a/32*lt,r=a%8===0?i*.92:i*.96,s=a*6;e[s]=Math.sin(n)*r,e[s+1]=Math.cos(n)*r,e[s+2]=0,e[s+3]=Math.sin(n)*i,e[s+4]=Math.cos(n)*i,e[s+5]=0}const t=new ht;return t.setAttribute("position",new Gt(e,3)),t}function Ov(i){const{scene:e,R:t,theme:a}=i;i.backgroundMesh&&(i.backgroundMesh.geometry.dispose(),i.backgroundMesh.material.dispose(),e.remove(i.backgroundMesh));const n=new be(a.voidColor),r=new Ui(t*2,t*2),s=new ct({vertexShader:Eu,fragmentShader:wv,uniforms:{uVoidColor:{value:new P(n.r,n.g,n.b)},uTime:{value:0}},transparent:!0,depthWrite:!0,blending:ca}),o=new it(r,s);o.renderOrder=0,e.add(o),i.backgroundMesh=o}function Fv(i){const{scene:e,R:t,theme:a}=i;i.centerGlowMesh&&(i.centerGlowMesh.geometry.dispose(),i.centerGlowMesh.material.dispose(),e.remove(i.centerGlowMesh));const n=new be(a.neonCyan),r=t*.5,s=new Ui(r,r),o=new ct({vertexShader:Eu,fragmentShader:Iv,uniforms:{uColor:{value:new P(n.r,n.g,n.b)},uIntensity:{value:0}},transparent:!0,depthWrite:!1,blending:Pt}),l=new it(s,o);l.renderOrder=6,e.add(l),i.centerGlowMesh=l}function Bv(i){const{scene:e,R:t,theme:a}=i;i.ringMeshes&&(i.ringMeshes.forEach(c=>{c.geometry.dispose(),e.remove(c)}),i.matRingInner&&i.matRingInner.dispose(),i.matRingOuter&&i.matRingOuter.dispose()),i.ticksMesh&&(i.ticksMesh.geometry.dispose(),i.matRingTicks&&i.matRingTicks.dispose(),e.remove(i.ticksMesh));const n=new Jt({color:new be(a.neonCyan),opacity:.18,transparent:!0,depthWrite:!1,blending:Pt}),r=new Jt({color:new be(a.neonCyan),opacity:.28,transparent:!0,depthWrite:!1,blending:Pt}),s=new Jt({color:new be(a.neonCyan),opacity:.22,transparent:!0,depthWrite:!1,blending:Pt}),o=[.2,.4,.6,.8,1];i.ringMeshes=o.map((c,u)=>{const h=new Qc(Nv(c*t),u<4?n:r);return h.renderOrder=1,e.add(h),h});const l=new $h(Uv(t),s);l.renderOrder=1,e.add(l),i.ticksMesh=l,i.matRingInner=n,i.matRingOuter=r,i.matRingTicks=s}function zv(i){const{scene:e,R:t,theme:a}=i;i.sweepTrailMesh&&(i.sweepTrailMesh.geometry.dispose(),i.sweepTrailMesh.material.dispose(),e.remove(i.sweepTrailMesh)),i.sweepArmLine&&(i.sweepArmLine.geometry.dispose(),i.sweepArmLine.material.dispose(),e.remove(i.sweepArmLine));const n=new be(a.neonCyan),r=new P(n.r,n.g,n.b),s=new Ui(t*2,t*2),o=new ct({vertexShader:Cv,fragmentShader:Rv,uniforms:{uAngle:{value:i.sweepAngle},uArcWidth:{value:Math.PI*.6},uColor:{value:r.clone()},uStaticAmt:{value:1}},transparent:!0,depthWrite:!1,blending:Pt}),l=new it(s,o);l.renderOrder=2,e.add(l),i.sweepTrailMesh=l;const c=new Float32Array([0,0,0,Math.sin(i.sweepAngle)*t,Math.cos(i.sweepAngle)*t,0]),u=new ht;u.setAttribute("position",new Gt(c,3));const h=new Jt({color:new be(a.neonCyan),opacity:.9,transparent:!0,depthWrite:!1,blending:Pt}),d=new Ri(u,h);d.renderOrder=3,e.add(d),i.sweepArmLine=d}function Hv(i){const{scene:e,theme:t}=i;i.contactDotsMesh&&(i.contactDotsMesh.geometry.dispose(),i.contactDotsMesh.material.dispose(),e.remove(i.contactDotsMesh)),i.contactRingsMesh&&(i.contactRingsMesh.geometry.dispose(),i.contactRingsMesh.material.dispose(),e.remove(i.contactRingsMesh));const a=Yi(t.neonGreen),n=Yi(t.neonAmber),r=Yi(t.neonMagenta),s=Yi(t.neonCyan);function o(u,h,d){const p=new Ui(1,1),g=new It(new Float32Array(Ci).fill(0),1),S=new It(new Float32Array(Ci).fill(1),1),m=new It(new Float32Array(Ci).map(()=>Math.random()),1),f=new It(new Float32Array(Ci).fill(0),1);g.setUsage(Qa),S.setUsage(Qa),m.setUsage(Qa),f.setUsage(Qa),p.setAttribute("a_type",g),p.setAttribute("a_age",S),p.setAttribute("a_phase",m),p.setAttribute("a_sweepFade",f);const y=new ct({vertexShader:Pv,fragmentShader:u,uniforms:h,transparent:!0,depthWrite:!1,blending:Pt}),b=new Xh(p,y,Ci);b.renderOrder=d,b.instanceMatrix.setUsage(Qa);const M=new Qt;M.scale.setScalar(0),M.updateMatrix();for(let w=0;w<Ci;w++)b.setMatrixAt(w,M.matrix);return b.instanceMatrix.needsUpdate=!0,e.add(b),b}const l={uC0:{value:new P(...a)},uC1:{value:new P(...n)},uC2:{value:new P(...r)},uC3:{value:new P(...s)}},c={uC0:{value:new P(...a)},uC1:{value:new P(...n)},uC2:{value:new P(...r)}};i.contactDotsMesh=o(Lv,l,5),i.contactRingsMesh=o(Dv,c,4)}function kv(i){const{element:e,overlay:t,R:a}=i,n=e.clientWidth/2,r=e.clientHeight/2;i.staticLabelEls.forEach(c=>c.remove()),i.staticLabelEls=[];const s=[2,4,6,8,10];[.2,.4,.6,.8,1].forEach((c,u)=>{const h=document.createElement("span");h.className="s9-radar__ring-label",h.textContent=`${s[u]}km`,h.style.left=`${n+c*a+4}px`,h.style.top=`${r}px`,h.style.transform="translateY(-50%)",t.appendChild(h),i.staticLabelEls.push(h)});const o=[["N",0],["NE",lt*.125],["E",lt*.25],["SE",lt*.375],["S",lt*.5],["SW",lt*.625],["W",lt*.75],["NW",lt*.875]],l=a*1.05;o.forEach(([c,u])=>{const h=document.createElement("span");h.className="s9-radar__cardinal-label",h.textContent=c,h.style.left=`${n+Math.sin(u)*l}px`,h.style.top=`${r-Math.cos(u)*l}px`,h.style.transform="translate(-50%, -50%)",t.appendChild(h),i.staticLabelEls.push(h)})}function Vv(i){Ov(i),Fv(i),Bv(i),zv(i),kv(i),i.contactDotsMesh?Gv(i):Hv(i)}function Gv(i){const{contacts:e,dummy:t,contactDotsMesh:a,contactRingsMesh:n,R:r}=i;!a||!n||(e.forEach((s,o)=>{if(!s)t.scale.setScalar(0),t.position.set(0,0,0);else{const l=s.age<.08?bn(0,8,s.age/.08):8;t.position.set(Math.sin(s.angle)*s.range*r,Math.cos(s.angle)*s.range*r,0),t.scale.setScalar(l)}t.updateMatrix(),a.setMatrixAt(o,t.matrix),n.setMatrixAt(o,t.matrix)}),a.instanceMatrix.needsUpdate=!0,n.instanceMatrix.needsUpdate=!0)}function bu(i,e){const t=i.contacts[e];t&&(t.labelEl&&(t.labelEl.remove(),t.labelEl=null),i.contactDotsMesh&&i.contactRingsMesh&&(i.dummy.scale.setScalar(0),i.dummy.position.set(0,0,0),i.dummy.updateMatrix(),i.contactDotsMesh.setMatrixAt(e,i.dummy.matrix),i.contactRingsMesh.setMatrixAt(e,i.dummy.matrix),i.contactDotsMesh.instanceMatrix.needsUpdate=!0,i.contactRingsMesh.instanceMatrix.needsUpdate=!0),i.contacts[e]=null)}function Yo(i,e,t,a,n){var r;const s=i.opts.maxContacts;if(i.contacts.filter(Boolean).length>=s){let u=-1,h=-1;for(let d=0;d<Ci;d++)((r=i.contacts[d])==null?void 0:r.type)==="ghost"&&i.contacts[d].age>h&&(u=d,h=i.contacts[d].age);if(u>=0)bu(i,u);else return console.warn("[pulse-radar] contact pool full"),null}let o=-1;for(let u=0;u<Ci;u++)if(!i.contacts[u]){o=u;break}if(o<0)return null;const l=a==="ghost",c={id:n||`T-${String(++Mv).padStart(2,"0")}`,angle:(e%lt+lt)%lt,range:Math.max(0,Math.min(1,t)),type:a,age:l?.85:0,maxAge:l?3e3:8e3+Math.random()*1e4,bornAt:performance.now(),phase:l?Math.random()*.3:0,lastSweep:-1/0,ghostAngle:null,ghostRange:null,ghostSpawned:!1,instIdx:o,labelEl:null,sweepAlpha:l?.15:1,revealed:l,revealTime:l?performance.now():null};if(!l){const u=document.createElement("span");u.className=`s9-radar__label s9-radar__label--${a}`,u.textContent=a==="hostile"?`${c.id} ⚠HC`:c.id,i.labelsDiv.appendChild(u),c.labelEl=u}return i.contacts[o]=c,c}function yr(i){if(i.destroyed||i.reducedMotion)return;const e=Math.max(.05,i.opts.contactDensity),t=bn(3e3,600,i.threatLevel)/e,a=(Math.random()-.5)*t*.4,n=Math.max(200,t+a);i.spawnTimer=setTimeout(()=>{!i.destroyed&&!i.reducedMotion&&(Wv(i),yr(i))},n)}function Wv(i){const e=i.contacts.filter(r=>r&&r.type!=="ghost"),t=e.length>0&&Math.random()<.3?e[Math.floor(Math.random()*e.length)]:null,a=t?t.angle+(Math.random()-.5)*.4:Math.random()*lt,n=.15+Math.random()*.82;Yo(i,a,n,bv(i.threatLevel))}function Xv(i,e){if(i.reducedMotion)return;const t=i.sweepAngle;i.sweepAngle=(i.sweepAngle+i.sweepSpeed*e/1e3)%lt,i.sweepAngle<t&&(Av(.06),i.centerGlowIntensity=1),i.centerGlowIntensity>0&&(i.centerGlowIntensity*=Math.pow(.001,e/600),i.centerGlowIntensity<.005&&(i.centerGlowIntensity=0),i.centerGlowMesh&&(i.centerGlowMesh.material.uniforms.uIntensity.value=i.centerGlowIntensity));const a=performance.now();if(i.staticNextAt===null&&(i.staticNextAt=a+7e3+Math.random()*5e3),a>=i.staticNextAt&&!i.staticActive&&(i.staticActive=!0,i.staticEndAt=a+60+Math.random()*40,i.staticNextAt=i.staticEndAt+6e3+Math.random()*4e3),i.staticActive&&(i.sweepTrailMesh.material.uniforms.uStaticAmt.value=.5+Math.random()*.5,a>=i.staticEndAt&&(i.staticActive=!1,i.sweepTrailMesh.material.uniforms.uStaticAmt.value=1)),i.sweepTrailMesh&&(i.sweepTrailMesh.material.uniforms.uAngle.value=i.sweepAngle),i.sweepArmLine){const{R:n}=i,r=i.sweepArmLine.geometry.attributes.position;r.setXYZ(0,0,0,0),r.setXYZ(1,Math.sin(i.sweepAngle)*n,Math.cos(i.sweepAngle)*n,0),r.needsUpdate=!0}}function qv(i,e){const{contacts:t,sweepAngle:a}=i,n=performance.now(),r=lt/i.sweepSpeed*1e3,s=Math.max(200,r-220),o=performance.now();t.forEach((l,c)=>{if(l){if(l.age+=e/l.maxAge,l.type!=="ghost"&&l.revealed){const u=.05+.1*l.range,h=o-l.lastSweep,d=Math.min(1,h/s);l.sweepAlpha=u+(1-u)*Math.pow(1-d,2.5)}if(l.type!=="ghost"){const u=l.age>.65&&l.age<.85;l.phase+=yc(l.type)*(u?.5:1)*e/1e3}else l.phase+=yc("neutral")*e/1e3;l.type!=="ghost"&&!i.reducedMotion&&Math.abs(Ev(a,l.angle))<.12&&n-l.lastSweep>800&&(l.phase=0,l.lastSweep=n,l.sweepAlpha=1,l.revealed||(l.revealed=!0,l.revealTime=n)),l.type!=="ghost"&&!l.ghostSpawned&&l.age>=.65&&l.revealed&&(l.ghostAngle=l.angle,l.ghostRange=l.range,l.ghostSpawned=!0,Yo(i,l.ghostAngle,l.ghostRange,"ghost")),l.age>=1&&bu(i,c)}})}function Yv(i){const{contacts:e,dummy:t,contactDotsMesh:a,contactRingsMesh:n,R:r}=i;if(!a||!n)return;let s=!1;e.forEach((o,l)=>{if(!o)return;s=!0;let c;o.revealed?c=Math.min(1,(i.now-o.revealTime)/300)*8:c=0,t.position.set(Math.sin(o.angle)*o.range*r,Math.cos(o.angle)*o.range*r,0),t.scale.setScalar(c),t.updateMatrix(),a.setMatrixAt(l,t.matrix),n.setMatrixAt(l,t.matrix);const u=Tv(o.type);a.geometry.attributes.a_type.setX(l,u),a.geometry.attributes.a_age.setX(l,o.age),a.geometry.attributes.a_phase.setX(l,o.phase),a.geometry.attributes.a_sweepFade.setX(l,o.sweepAlpha),n.geometry.attributes.a_type.setX(l,u),n.geometry.attributes.a_age.setX(l,o.age),n.geometry.attributes.a_phase.setX(l,o.phase),n.geometry.attributes.a_sweepFade.setX(l,o.sweepAlpha)}),s&&(a.instanceMatrix.needsUpdate=!0,n.instanceMatrix.needsUpdate=!0,a.geometry.attributes.a_type.needsUpdate=!0,a.geometry.attributes.a_age.needsUpdate=!0,a.geometry.attributes.a_phase.needsUpdate=!0,a.geometry.attributes.a_sweepFade.needsUpdate=!0,n.geometry.attributes.a_type.needsUpdate=!0,n.geometry.attributes.a_age.needsUpdate=!0,n.geometry.attributes.a_phase.needsUpdate=!0,n.geometry.attributes.a_sweepFade.needsUpdate=!0)}function jv(i){const{contacts:e,element:t,R:a}=i,n=t.clientWidth/2,r=t.clientHeight/2;e.forEach(s=>{if(!(s!=null&&s.labelEl))return;if(!s.revealed){s.labelEl.style.opacity="0";return}const o=n+Math.sin(s.angle)*s.range*a,l=r-Math.cos(s.angle)*s.range*a;s.labelEl.style.left=`${o+7}px`,s.labelEl.style.top=`${l-6}px`,s.labelEl.style.opacity=String(s.sweepAlpha)})}function $v(i){if(!i.footerEl)return;const e=i.contacts.filter(a=>a&&a.type!=="ghost").length,t=(lt/i.sweepSpeed).toFixed(1);i.footerEl.textContent=`CONTACTS: ${e} | SWEEP: ${t}s`}function wo(i,e){if(i.destroyed||!i.rafRunning){i.rafId=null;return}const t=Math.min(e-(i.lastTs??e),100);i.lastTs=e,i.now=e,i.R>0&&(i.backgroundMesh&&(i.backgroundMesh.material.uniforms.uTime.value=e/1e3),Xv(i,t),qv(i,t),Yv(i),jv(i),$v(i),i.renderer.render(i.scene,i.camera)),i.rafId=requestAnimationFrame(a=>wo(i,a))}function Kv(i,e={}){if(Sr.has(i)){console.warn("[pulse-radar] already initialised");const y=Sr.get(i);return{setRadarThreatLevel:y.setRadarThreatLevel,injectContact:y.injectContact}}const t={sweepPeriod:Math.max(600,Math.min(2e4,e.sweepPeriod??3690)),contactDensity:Math.max(0,Math.min(1,e.contactDensity??.5)),threatLevel:Math.max(0,Math.min(1,e.threatLevel??0)),primaryColor:e.primaryColor??null,maxContacts:Math.max(4,Math.min(64,e.maxContacts??28))},a=Mu(),n=document.createElement("canvas");n.className="s9-radar__canvas";const r=document.createElement("div");r.className="s9-radar__overlay";const s=document.createElement("div");s.className="s9-radar__labels",r.appendChild(s),i.appendChild(n),i.appendChild(r);let o;try{o=new Xo({canvas:n,antialias:!0,alpha:!1,premultipliedAlpha:!1})}catch(y){return console.error("[pulse-radar] WebGL context creation failed",y),n.remove(),r.remove(),{setRadarThreatLevel:()=>{},injectContact:()=>""}}o.setClearColor(new be(a.voidColor),1),o.setPixelRatio(Math.min(devicePixelRatio,2)),o.debug.checkShaderErrors=!0;const l=new Go,c=new Nr(-1,1,1,-1,.1,100);c.position.z=10;const u={element:i,canvas:n,overlay:r,labelsDiv:s,renderer:o,scene:l,camera:c,opts:t,theme:a,R:0,sweepAngle:Math.random()*lt,sweepSpeed:lt/(t.sweepPeriod/1e3),threatLevel:t.threatLevel,contacts:new Array(Ci).fill(null),dummy:new Qt,footerEl:document.getElementById("radar-contacts"),staticLabelEls:[],staticActive:!1,staticNextAt:null,staticEndAt:null,rafId:null,rafRunning:!1,destroyed:!1,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches,centerGlowIntensity:0,centerGlowMesh:null,backgroundMesh:null,ringMeshes:null,ticksMesh:null,sweepTrailMesh:null,sweepArmLine:null,contactDotsMesh:null,contactRingsMesh:null,matRingInner:null,matRingOuter:null,matRingTicks:null,spawnTimer:null,lastTs:null,now:performance.now(),resizeObserver:null,intersectionObserver:null,_motionMq:null,_motionHandler:null,setRadarThreatLevel:null,injectContact:null};Sr.set(i,u);const h=i.closest(".s9-panel");h&&(h.classList.add("s9-panel--booting"),h.addEventListener("animationend",()=>h.classList.remove("s9-panel--booting"),{once:!0}));const d=new ResizeObserver(y=>{for(const b of y){const{width:M,height:w}=b.contentRect;if(M===0||w===0)return;const A=Math.floor(Math.min(M,w)/2)-8;if(A<=0)return;u.R=A,c.left=-A,c.right=A,c.top=A,c.bottom=-A,c.updateProjectionMatrix(),o.setSize(M,w),Vv(u)}});d.observe(i),u.resizeObserver=d;const p=new IntersectionObserver(y=>{y.forEach(b=>{u.rafRunning=b.isIntersecting,u.rafRunning&&!u.rafId&&(u.rafId=requestAnimationFrame(M=>wo(u,M)))})},{threshold:0});p.observe(i),u.intersectionObserver=p;const g=matchMedia("(prefers-reduced-motion: reduce)"),S=()=>{u.reducedMotion=g.matches,u.reducedMotion?(u.sweepAngle=Math.PI*.15,clearTimeout(u.spawnTimer)):yr(u)};g.addEventListener("change",S),u._motionMq=g,u._motionHandler=S,u.rafRunning=!0,u.rafId=requestAnimationFrame(y=>wo(u,y)),u.reducedMotion||yr(u);function m(y){const b=Math.max(0,Math.min(1,y));u.threatLevel=b,u.sweepSpeed=bn(lt/4,lt/1.2,b),clearTimeout(u.spawnTimer),yr(u)}function f(y,b,M){const w=["friendly","neutral","hostile"].includes(M)?M:"neutral",A=Yo(u,y,Math.max(0,Math.min(1,b)),w);return A?A.id:""}return u.setRadarThreatLevel=m,u.injectContact=f,{setRadarThreatLevel:m,injectContact:f}}function Zv(i){const e=Sr.get(i);if(!e)return;const t=Mu();e.theme=t;const a=Yi(t.neonGreen),n=Yi(t.neonAmber),r=Yi(t.neonMagenta),s=Yi(t.neonCyan),o=new be(t.neonCyan);if(e.backgroundMesh){const l=new be(t.voidColor);e.backgroundMesh.material.uniforms.uVoidColor.value.set(l.r,l.g,l.b),e.renderer.setClearColor(new be(t.voidColor),1)}if(e.matRingInner&&e.matRingInner.color.set(t.neonCyan),e.matRingOuter&&e.matRingOuter.color.set(t.neonCyan),e.matRingTicks&&e.matRingTicks.color.set(t.neonCyan),e.sweepTrailMesh&&e.sweepTrailMesh.material.uniforms.uColor.value.set(o.r,o.g,o.b),e.sweepArmLine&&e.sweepArmLine.material.color.set(t.neonCyan),e.contactDotsMesh){const l=e.contactDotsMesh.material.uniforms;l.uC0.value.set(...a),l.uC1.value.set(...n),l.uC2.value.set(...r),l.uC3.value.set(...s)}if(e.contactRingsMesh){const l=e.contactRingsMesh.material.uniforms;l.uC0.value.set(...a),l.uC1.value.set(...n),l.uC2.value.set(...r)}}const Mr={"":"MATRIX GREEN",gits:"GHOST IN THE SHELL",amber:"AMBER",phosphor:"PHOSPHOR",blood:"BLOOD"};function Co(i){const e=document.documentElement;i===""||i==="matrixgreen"?delete e.dataset.theme:e.dataset.theme=i,document.querySelectorAll(".topbar__theme-btn").forEach(t=>{t.classList.toggle("topbar__theme-btn--active",(t.dataset.themeSet??"")===(i==="matrixgreen"?"":i))}),mc(Ye),Ro&&mc(document.getElementById("threatmap-tactical")),Zv(Ru)}function Tu(){const i=new Date;document.getElementById("topbar-clock").textContent=`UTC ${i.toUTCString().split(" ")[4]}`}Tu();setInterval(Tu,1e3);document.querySelectorAll(".s9-panel").forEach(hv);document.querySelectorAll(".topbar__theme-btn").forEach(i=>{i.addEventListener("click",()=>{const e=i.dataset.themeSet??"";Co(e),Pe(Ce,`THEME: ${Mr[e]??e.toUpperCase()}`,"sys")})});const Au=document.querySelectorAll(".topbar__tab[data-tab]"),Jv=document.querySelectorAll(".center__view[data-view]");let Mc=!1,Ro=!1;function Ec(i){Au.forEach(e=>{const t=e.dataset.tab===i;e.classList.toggle("topbar__tab--active",t),e.setAttribute("aria-selected",t)}),Jv.forEach(e=>{e.classList.toggle("center__view--active",e.dataset.view===i)}),i==="network"&&!Mc&&(Mc=!0,A0()),i==="tactical"&&!Ro&&(Ro=!0,T0()),Pe(Ce,`VIEW: ${i.toUpperCase()} ACTIVATED`,"sys")}Au.forEach(i=>{i.addEventListener("click",()=>Ec(i.dataset.tab)),i.addEventListener("keydown",e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),Ec(i.dataset.tab))})});const Ce=document.querySelector(".s9-terminal");p_(Ce,{onSubmit(i){var e;const t=i.trim().split(/\s+/),a=t[0].toLowerCase(),n=t.slice(1);switch(a){case"help":Pe(Ce,"SECTION 9 COMMAND INTERFACE — AVAILABLE COMMANDS:","sys"),Pe(Ce,"  status              — system status report","info"),Pe(Ce,"  ghost               — ghost coefficient analysis","info"),Pe(Ce,"  nodes               — list active threat nodes","info"),Pe(Ce,"  threat <lvl>        — set global threat level 0-100","info"),Pe(Ce,"  threat <id> <lvl>   — set node threat level","info"),Pe(Ce,"  focus <id>          — focus camera on node","info"),Pe(Ce,"  theme <name>        — switch theme","info"),Pe(Ce,"  themes              — list available themes","info"),Pe(Ce,"  clear               — clear terminal","info");break;case"status":{const r=rt.size,s=[...rt.values()].filter(l=>l>=70).length,o=r>0?Math.max(...rt.values()):0;Pe(Ce,"── SYSTEM STATUS ──────────────────────────","sys"),Pe(Ce,`  CPU: ${zt.cpu}%   MEM: ${zt.mem}%   NET I/O: ${zt.net}%`,"info"),Pe(Ce,`  GHOST LAYER: ${zt.ghost}%   ENCRYPTION: ${zt.enc}%`,"info"),Pe(Ce,`  NODES ON GRID: ${r}   CRITICAL: ${s}`,s>0?"err":"info"),Pe(Ce,`  PEAK THREAT: ${o}   GLOBAL LEVEL: ${o}`,o>=70?"err":"sys"),Pe(Ce,"  SECURE CHANNEL: ACTIVE   ENCRYPTION: AES-256","info");break}case"ghost":{const r=Fa.toFixed(1);Pe(Ce,"── GHOST COEFFICIENT ANALYSIS ─────────────","sys"),Pe(Ce,`  COEFFICIENT: ${r}%   BARRIER: NOMINAL`,"info"),Pe(Ce,"  CYBER BRAIN: SECTION 9 CLEARANCE ALPHA-7","info"),Pe(Ce,"  DIVE DEPTH: STABLE 3.2m   TACHIKOMA LINK: ACTIVE","info"),Pe(Ce,"  IDENTITY: CONFIRMED — KUSANAGI.M",r>=95?"sys":"err");break}case"nodes":{if(rt.size===0){Pe(Ce,"NO NODES ON GRID","info");break}Pe(Ce,`ACTIVE NODES (${rt.size}):`,"sys");for(const[r,s]of rt){const o=mi.find(u=>u.id===r),l=(o==null?void 0:o.label)??r,c=s>=70?"err":s>=40?"sys":"info";Pe(Ce,`  ${r.padEnd(14)} ${l.padEnd(12)} LVL=${s}`,c)}break}case"threat":{if(n.length===0){Pe(Ce,`GLOBAL THREAT: ${Math.max(0,...rt.values())}`,"sys");break}if(n.length>=2&&isNaN(parseInt(n[0]))){const r=n[0],s=parseInt(n[1]);if(!rt.has(r)){Pe(Ce,`ERR: node '${r}' not found — use NODES to list`,"err");break}if(isNaN(s)||s<0||s>100){Pe(Ce,"ERR: level must be 0-100","err");break}const o=Pr(Ye,r,s);rt.set(r,s),Li(Ye,Math.max(0,...rt.values())),Tn.setRadarThreatLevel(Math.max(0,...rt.values())/100),Pe(Ce,`NODE ${r}: ${o} → ${s}`,s>=70?"err":"sys"),s>=70&&o<70&&(Si(Ye,r),pa(Ye,r))}else{const r=parseInt(n[0]);if(isNaN(r)||r<0||r>100){Pe(Ce,"ERR: level must be 0-100","err");break}Li(Ye,r),Tn.setRadarThreatLevel(r/100),Pe(Ce,`GLOBAL THREAT LEVEL SET: ${r}`,"sys")}break}case"focus":{const r=n[0];if(!r){Pe(Ce,"ERR: focus requires a node id — use NODES to list","err");break}if(!rt.has(r)){Pe(Ce,`ERR: node '${r}' not found`,"err");break}Si(Ye,r),pa(Ye,r);const s=mi.find(o=>o.id===r);Pe(Ce,`CAMERA FOCUSED: ${(s==null?void 0:s.label)??r}`,"sys");break}case"theme":{const r=((e=n[0])==null?void 0:e.toLowerCase())??"";if(r===""||r==="matrixgreen"){Co(""),Pe(Ce,"THEME: MATRIX GREEN","sys");break}if(!Object.keys(Mr).includes(r)){Pe(Ce,`ERR: unknown theme '${r}' — use THEMES to list`,"err");break}Co(r),Pe(Ce,`THEME: ${Mr[r]}`,"sys");break}case"themes":Pe(Ce,"AVAILABLE THEMES:","sys");for(const[r,s]of Object.entries(Mr))Pe(Ce,`  ${(r||"matrixgreen").padEnd(14)} ${s}`,"info");break;case"clear":f_(Ce),Pe(Ce,"TERMINAL CLEARED","sys");break;default:a&&Pe(Ce,`ERR: unknown command '${i}' — type HELP`,"err")}},tabComplete(i){return["help","status","ghost","nodes","threat","focus","theme","themes","clear"].find(e=>e.startsWith(i.toLowerCase()))??null}});Pe(Ce,"SECTION 9 OPERATIVE INTERFACE — TYPE HELP FOR COMMANDS","sys");Pe(Ce,"GHOST BABEL OPERATION: ACTIVE","info");function Ts(i,e,t){let a=0;function n(){if(a>=i.length)return;const{id:r,state:s}=i[a++],o=document.getElementById(r);o&&dv(o,s),setTimeout(n,a<i.length?e:e*2)}n()}const bc=[{cls:"sigint",headline:"SIGNAL INTERCEPT: FREQ 12.4GHz",detail:"Encrypted burst tx — POSEIDON signature"},{cls:"humint",headline:"ASSET CONFIRM: NIIHAMA-04",detail:"Target movement: port district, 0300 local"},{cls:"cyber",headline:"ZERO-DAY: CVE-2026-3917",detail:"Legacy auth stack — remote exec payload ready"},{cls:"ghost",headline:"DIVE ANOMALY: SECTOR ALPHA",detail:"Ghost-barrier interference at 4.1m depth"},{cls:"elint",headline:"DRONE SWEEP: SECTOR 12",detail:"Coverage 73% — ETA 4 minutes to full map"},{cls:"sigint",headline:"PACKET STORM: 192.168.7.0/24",detail:"18k pps sustained — possible DDoS staging"},{cls:"cyber",headline:"EXFIL CHANNEL COMPROMISED",detail:"Fallback route DELTA-9 now primary exfil"},{cls:"humint",headline:"CONTACT LOST: ROMEO-7",detail:"Last check-in 03:14:22 UTC — status unknown"},{cls:"ghost",headline:"TACHIKOMA: AUTONOMOUS SWEEP",detail:"Unit 9 executing sector 7 independently"},{cls:"elint",headline:"EM PULSE DETECTED: ZONE 3",detail:"Localized disruption — comm nodes offline"},{cls:"sigint",headline:"NODE COMMS SPIKE: BEIJING",detail:"340% increase in encrypted P2P — 0300-0500"},{cls:"cyber",headline:"FIREWALL PROBE: AS12345",detail:"Systematic port sweep — countermeasures deployed"},{cls:"humint",headline:"BROKER IDENTIFIED: LAUGHING MAN",detail:"Dark web auction — biotech data linked to incident"},{cls:"ghost",headline:"GHOST PROTOCOL: BETA-3",detail:"Shell confirmed on target system — extract ready"},{cls:"elint",headline:"SAT PASS: KH-17 WINDOW",detail:"6 min coverage — imaging tasked to sector 4"}];function Qv(i){const e=document.createElement("div");return e.className=`sigint-item sigint-item--${i.cls}`,e.innerHTML=`
    <div class="sigint-item__class">${i.cls.toUpperCase()}</div>
    <div class="sigint-item__headline">${i.headline}</div>
    <div class="sigint-item__detail">${i.detail}</div>
  `,e}(function(){const i=document.getElementById("sigint-feed");if(!i)return;const e=4,t=[];function a(){const n=new Set(t.map(u=>{var h;return(h=u.querySelector(".sigint-item__headline"))==null?void 0:h.textContent})),r=bc.filter(u=>!n.has(u.headline)),s=r.length>0?r:bc,o=s[Math.floor(Math.random()*s.length)],l=Qv(o);i.insertBefore(l,i.firstChild),t.unshift(l),requestAnimationFrame(()=>l.classList.add("sigint-item--visible"));const c=8e3+Math.random()*12e3;for(setTimeout(()=>{l.classList.add("sigint-item--closing"),l.classList.remove("sigint-item--visible"),setTimeout(()=>{l.remove();const u=t.indexOf(l);u>=0&&t.splice(u,1)},500)},c);t.length>e;){const u=t.pop();u.classList.add("sigint-item--closing"),u.classList.remove("sigint-item--visible"),setTimeout(()=>u.remove(),500)}setTimeout(a,3e3+Math.random()*6e3)}setTimeout(a,800),setTimeout(a,2200)})();const Tc=[{cls:"STRATEGIC",headline:"BIOMECH TREATY VOTE: 72HRS",detail:"Section 9 on standby for security detail"},{cls:"TACTICAL",headline:"LAUGHING MAN: ACTIVE",detail:"New sightings logged in Niihama and Togusa ward"},{cls:"ASSET",headline:"BATOU: FIELD POSITION UPDATE",detail:"Grid 7-Delta — visual on primary target"},{cls:"THREAT",headline:"PUPPET MASTER PROTOCOL",detail:"AI ghost-dive signatures — 3 confirmed nodes"},{cls:"STRATEGIC",headline:"ARAMAKI: SITUATION ROOM",detail:"Director briefing at 0600 UTC — attendance req"},{cls:"TACTICAL",headline:"TOGUSA: DEEP COVER",detail:"Identity: Muto Ryo — corporate embedded"},{cls:"THREAT",headline:"ROGUE TACHIKOMA UNIT",detail:"Unit 14 unresponsive — last GPS: Sector 9-Bravo"},{cls:"ASSET",headline:"ISHIKAWA: CYBER BREACH",detail:"Target mainframe penetrated — exfil in 180s"},{cls:"STRATEGIC",headline:"COMA CHIP EXPLOIT: CONFIRMED",detail:"Hardware vulnerability — 40k units affected"},{cls:"TACTICAL",headline:"HELICOPTER SUPPORT: STANDING BY",detail:"AH-6J on tarmac — ETA to sector: 4 min"}];function e0(i){const e=document.createElement("div");return e.className="intel-item",e.innerHTML=`
    <div class="intel-item__class">${i.cls}</div>
    <div class="intel-item__headline">${i.headline}</div>
    <div class="intel-item__detail">${i.detail}</div>
  `,e}(function(){const i=document.getElementById("intel-feed");if(!i)return;const e=5,t=[];function a(){const n=new Set(t.map(u=>{var h;return(h=u.querySelector(".intel-item__headline"))==null?void 0:h.textContent})),r=Tc.filter(u=>!n.has(u.headline)),s=r.length>0?r:Tc,o=s[Math.floor(Math.random()*s.length)],l=e0(o);i.insertBefore(l,i.firstChild),t.unshift(l),requestAnimationFrame(()=>l.classList.add("intel-item--visible"));const c=1e4+Math.random()*15e3;for(setTimeout(()=>{l.classList.add("intel-item--closing"),l.classList.remove("intel-item--visible"),setTimeout(()=>{l.remove();const u=t.indexOf(l);u>=0&&t.splice(u,1)},500)},c);t.length>e;){const u=t.pop();u.classList.add("intel-item--closing"),u.classList.remove("intel-item--visible"),setTimeout(()=>u.remove(),500)}setTimeout(a,4e3+Math.random()*8e3)}setTimeout(a,1200),setTimeout(a,3500),setTimeout(a,5800)})();setTimeout(()=>{Ts([{id:"seq-breach",state:"complete"},{id:"seq-extract",state:"active"}],3e3),setTimeout(()=>{Ts([{id:"seq-extract",state:"complete"},{id:"seq-cover",state:"active"}],3500),setTimeout(()=>{Ts([{id:"seq-cover",state:"complete"},{id:"seq-exfil",state:"active"}],3e3)},9e3)},8e3)},5e3);const $a=document.querySelector(".s9-stream");__($a);const di=()=>`${ot(10,220)}.${ot(0,255)}.${ot(0,255)}.${ot(1,254)}`,As=()=>[22,80,443,8443,4444,3389,21,1337,9999][Math.floor(Math.random()*9)],t0=()=>`${ot(64,65535)}B`,i0=()=>Array.from({length:4},()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0")).join(" ");function a0(){const i=[()=>({source:"AUTH",message:`HANDSHAKE COMPLETE — ${di()}:${As()}`,alert:!1}),()=>({source:"NET",message:`PKT ${t0()} ${di()} → ${di()}`,alert:!1}),()=>({source:"GHOST",message:`DIVE DEPTH: ${(2+Math.random()*3).toFixed(1)}m — STABLE`,alert:!1}),()=>({source:"CRYPT",message:"AES-256 SESSION KEY ESTABLISHED",alert:!1}),()=>({source:"SCAN",message:`PROBE: ${di()}:${As()} — ${i0()}`,alert:!0}),()=>({source:"SYS",message:`MEM ${ot(60,92)}% CPU ${ot(20,80)}% THERMAL OK`,alert:!1}),()=>({source:"NET",message:`LATENCY ${ot(4,45)}ms — ${Math.random()<.8?"NOMINAL":"DEGRADED"}`,alert:Math.random()<.2}),()=>({source:"AUTH",message:`TOKEN REFRESH: UID-${ot(1e3,9999)}`,alert:!1}),()=>({source:"CRIT",message:`INTRUSION SIG: ${di()} PORT ${As()}`,alert:!0}),()=>({source:"SYS",message:`COUNTERMEASURE DEPLOYED — BLOCK RULE ${ot(100,999)}`,alert:!1}),()=>({source:"NET",message:`ROUTE CHANGE: AS${ot(1e3,65e3)} VIA ${di()}`,alert:!1}),()=>({source:"CRYPT",message:`TLS 1.3 HANDSHAKE: ${di()} — ${ot(0,1)?"ECDH":"RSA"}-4096`,alert:!1}),()=>({source:"SCAN",message:`ANOMALY: BURST ${ot(800,9999)} PPS FROM ${di()}`,alert:!0}),()=>({source:"GHOST",message:`GHOST COEFFICIENT: ${(92+Math.random()*8).toFixed(1)}%`,alert:!1}),()=>({source:"AUTH",message:`CERT CHAIN VALID — SHA-${ot(0,1)?"256":"512"}`,alert:!1}),()=>({source:"NET",message:`DNS RESOLVE: ${["niihama.net","togusa.local","sec9.gov","puppet.io"][Math.floor(Math.random()*4)]}`,alert:!1}),()=>({source:"SYS",message:`FIREWALL RULE ${ot(1e3,9999)}: DROP ${di()}/${ot(24,32)}`,alert:!1}),()=>({source:"CRIT",message:`ZERO-DAY ATTEMPT: ${di()} — MITIGATED`,alert:!0})];function e(){const t=i[Math.floor(Math.random()*i.length)];En($a,{timestamp:new Date().toISOString(),...t()})}for(let t=0;t<8;t++)e();setInterval(e,ot(1200,2800))}a0();const zt={cpu:42,mem:61,net:12,ghost:77,enc:96},n0=document.getElementById("tele-cpu"),r0=document.getElementById("tele-mem"),s0=document.getElementById("tele-net"),o0=document.getElementById("tele-enc");setInterval(()=>{for(const i of Object.keys(zt))zt[i]=Math.max(5,Math.min(100,zt[i]+(Math.random()-.5)*6)),zt[i]=Math.round(zt[i]);nr(n0,zt.cpu),nr(r0,zt.mem),nr(s0,zt.net),nr(o0,zt.enc)},2e3);const l0=document.getElementById("neural-01"),c0=document.getElementById("ghost-val"),u0=document.getElementById("cyber-index"),h0=document.getElementById("neural-sync"),Di=document.getElementById("ekg-canvas"),d0=document.getElementById("ekg-bpm"),sr=document.getElementById("ekg-heart");let Fa=98.4,Lr=62,Wi=0,ws=0;const Cs=.37;function p0(){sr&&(sr.classList.remove("beat"),sr.offsetWidth,sr.classList.add("beat"))}function Ac(i){return i>.08&&i<.18?Math.sin((i-.08)/.1*Math.PI)*.18:i>.28&&i<.32?-((i-.28)/.04)*.38:i>.32&&i<.37?-.38+(i-.32)/.05*1.38:i>.37&&i<.43?1-(i-.37)/.06*1.28:i>.43&&i<.49?-.28+(i-.43)/.06*.28:i>.52&&i<.68?Math.sin((i-.52)/.16*Math.PI)*.3:0}function f0(){if(!Di)return;const i=Di.getContext("2d"),e=Di.width,t=Di.height,a=t/2,n=t*.44,r=Lr/60/80;i.clearRect(0,0,e,t);const s=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";i.beginPath();for(let l=0;l<e;l++){const c=((Wi-(e-1-l)*r)%1+1)%1,u=a-Ac(c)*n;l===0?i.moveTo(l,u):i.lineTo(l,u)}i.strokeStyle=s,i.lineWidth=1,i.shadowColor=s,i.shadowBlur=5,i.stroke();const o=a-Ac(Wi)*n;i.beginPath(),i.arc(e-1,o,1.8,0,Math.PI*2),i.fillStyle=s,i.shadowBlur=10,i.fill()}function wu(){if(!Di)return;const i=Di.clientWidth;i&&Di.width!==i&&(Di.width=i)}wu();new ResizeObserver(wu).observe(Di);let Rs=0;(function i(e){const t=Rs?e-Rs:16;Rs=e,ws=Wi,Wi=(Wi+Lr/60*(t/1e3))%1,(ws<Cs&&Wi>=Cs||ws>Wi&&Wi>=Cs)&&p0(),f0(),requestAnimationFrame(i)})(0);function Cu(){Fa=Math.max(85,Math.min(100,Fa+(Math.random()-.45)*1.2));const i=Fa.toFixed(1);Lr=Math.round(58+(100-Fa)/15*12),d0.textContent=Lr,v_(l0,()=>{c0.textContent=i,u0.textContent=`${i}%`,h0.textContent=`${Math.round(Fa)}%`})}for(let i=0;i<3;i++)Cu();setInterval(Cu,3e3);const Ye=document.querySelector(".s9-threatmap");vu(Ye,{autoRotate:!0,bloomStrength:.4});const Ru=document.getElementById("proximity-radar"),Tn=Kv(Ru,{threatLevel:0}),m0=getComputedStyle(document.documentElement).getPropertyValue("--neon-green").trim()||"#00ff70";yv(document.getElementById("matrix-rain-host"),{color:m0,opacity:.9,syncCamera:iv(Ye)});document.getElementById("sat-toggle").addEventListener("change",i=>{cv(Ye,i.target.checked)});const mi=[{id:"n-tokyo",lat:35.68,lng:139.69,label:"TOKYO"},{id:"n-moscow",lat:55.75,lng:37.62,label:"MOSCOW"},{id:"n-beijing",lat:39.91,lng:116.39,label:"BEIJING"},{id:"n-london",lat:51.51,lng:-.13,label:"LONDON"},{id:"n-nyc",lat:40.71,lng:-74,label:"NEW YORK"},{id:"n-sydney",lat:-33.87,lng:151.21,label:"SYDNEY"},{id:"n-dubai",lat:25.2,lng:55.27,label:"DUBAI"},{id:"n-saopaulo",lat:-23.55,lng:-46.63,label:"SÃO PAULO"},{id:"n-paris",lat:48.86,lng:2.35,label:"PARIS"},{id:"n-seoul",lat:37.57,lng:126.98,label:"SEOUL"},{id:"n-cairo",lat:30.05,lng:31.24,label:"CAIRO"},{id:"n-berlin",lat:52.52,lng:13.41,label:"BERLIN"},{id:"n-mumbai",lat:19.08,lng:72.88,label:"MUMBAI"},{id:"n-toronto",lat:43.65,lng:-79.38,label:"TORONTO"},{id:"n-singapore",lat:1.35,lng:103.82,label:"SINGAPORE"},{id:"n-nairobi",lat:-1.29,lng:36.82,label:"NAIROBI"},{id:"n-istanbul",lat:41.01,lng:28.97,label:"ISTANBUL"},{id:"n-lagos",lat:6.52,lng:3.38,label:"LAGOS"}],rt=new Map;function ot(i,e){return Math.floor(Math.random()*(e-i+1))+i}const g0={"n-tokyo":{country:"JAPAN",pop:"13.96M",status:"FINANCIAL HUB"},"n-moscow":{country:"RUSSIA",pop:"12.51M",status:"RESTRICTED"},"n-beijing":{country:"CHINA",pop:"21.54M",status:"RESTRICTED"},"n-london":{country:"UK",pop:"8.98M",status:"ALLIED NODE"},"n-nyc":{country:"USA",pop:"8.34M",status:"ALLIED NODE"},"n-sydney":{country:"AUSTRALIA",pop:"5.31M",status:"ALLIED NODE"},"n-dubai":{country:"UAE",pop:"3.33M",status:"NEUTRAL ZONE"},"n-saopaulo":{country:"BRAZIL",pop:"12.33M",status:"MONITORED"},"n-paris":{country:"FRANCE",pop:"2.15M",status:"ALLIED NODE"},"n-seoul":{country:"S.KOREA",pop:"9.78M",status:"ALLIED NODE"},"n-cairo":{country:"EGYPT",pop:"10.08M",status:"MONITORED"},"n-berlin":{country:"GERMANY",pop:"3.66M",status:"ALLIED NODE"},"n-mumbai":{country:"INDIA",pop:"20.67M",status:"MONITORED"},"n-toronto":{country:"CANADA",pop:"2.93M",status:"ALLIED NODE"},"n-singapore":{country:"SINGAPORE",pop:"5.45M",status:"NEUTRAL ZONE"},"n-nairobi":{country:"KENYA",pop:"4.40M",status:"MONITORED"},"n-istanbul":{country:"TURKEY",pop:"15.46M",status:"NEUTRAL ZONE"},"n-lagos":{country:"NIGERIA",pop:"14.86M",status:"MONITORED"}};function _0(i){let e=i.split("").reduce((l,c)=>l*31+c.charCodeAt(0)>>>0,7);const t=()=>(e=e*1664525+1013904223>>>0,(e>>>16)/65535),a=9,n=140,r=34,s=n/a;let o=`<svg viewBox="0 0 ${n} ${r}" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block;height:34px;">`;o+='<g fill="currentColor">';for(let l=0;l<a;l++){const c=8+t()*24,u=s*(.48+t()*.44),h=l*s+(s-u)*.5;o+=`<rect x="${h.toFixed(1)}" y="${(r-c).toFixed(1)}" width="${u.toFixed(1)}" height="${c.toFixed(1)}"/>`}return o+="</g></svg>",o}function Pu(i,e,t){t.dispatchEvent(new CustomEvent("s9:alert",{bubbles:!0,detail:{level:e>=70?"critical":"warning",source:i}}))}function Lu(i,e){To(Ye,{...i,level:e}),rt.set(i.id,e),En($a,{timestamp:new Date().toISOString(),source:"NET",message:`NODE ONLINE: ${i.label} — LVL ${e}`,alert:e>=70}),e>=70&&(Pu(i.label,e,Ye),Si(Ye,i.id),pa(Ye,i.id))}const An=mi.slice(0,8),Po=[15,72,55,18,28,10,45,33];An.forEach((i,e)=>{setTimeout(()=>{Lu(i,Po[e]),e===An.length-1&&setTimeout(()=>{Li(Ye,55),Tn.setRadarThreatLevel(.55)},800)},e*300+500)});function Du(){const i=[...rt.keys()],e=mi.filter(a=>!rt.has(a.id)),t=Math.random();if(t<.28&&e.length>0){const a=e[ot(0,e.length-1)],n=ot(5,65);Lu(a,n),Pe(Ce,`SIGNAL ACQUIRED: ${a.label}`,"sys")}else if(t<.42&&i.length>5){const a=i[ot(0,i.length-1)],n=mi.find(r=>r.id===a);xu(Ye,a),rt.delete(a),Pe(Ce,`SIGNAL LOST: ${(n==null?void 0:n.label)??a}`,"info"),En($a,{timestamp:new Date().toISOString(),source:"NET",message:`NODE OFFLINE: ${(n==null?void 0:n.label)??a}`,alert:!1})}else if(t<.72&&i.length>0){const a=i[ot(0,i.length-1)],n=mi.find(u=>u.id===a),r=rt.get(a)??0,s=ot(8,28),o=Math.min(100,r+s);Pr(Ye,a,o),rt.set(a,o),Li(Ye,Math.max(...rt.values())),Tn.setRadarThreatLevel(Math.max(...rt.values())/100),Pe(Ce,`THREAT ESCALATION: ${(n==null?void 0:n.label)??a} ${r}→${o}`,o>=70?"err":"sys"),En($a,{timestamp:new Date().toISOString(),source:"CRIT",message:`THREAT UP: ${(n==null?void 0:n.label)??a} LVL=${o}`,alert:o>=70}),o>=70&&r<70&&(Pu((n==null?void 0:n.label)??a,o,Ye),Si(Ye,a),pa(Ye,a));const l=r>=70?2:r>=40?1:0,c=o>=70?2:o>=40?1:0;l!==c&&fc(Ye,a)}else if(i.length>0){const a=i[ot(0,i.length-1)],n=mi.find(c=>c.id===a),r=rt.get(a)??50,s=Math.max(0,r-ot(5,18));Pr(Ye,a,s),rt.set(a,s),Li(Ye,Math.max(0,...rt.values())),Tn.setRadarThreatLevel(Math.max(0,...rt.values())/100),Pe(Ce,`THREAT REDUCED: ${(n==null?void 0:n.label)??a} LVL=${s}`,"info");const o=r>=70?2:r>=40?1:0,l=s>=70?2:s>=40?1:0;o!==l&&fc(Ye,a)}if(i.length>=2){const a=1+Math.floor(Math.random()*3);for(let n=0;n<a;n++){const r=i[Math.floor(Math.random()*i.length)];let s=i[Math.floor(Math.random()*i.length)];s===r&&(s=i[(i.indexOf(r)+1)%i.length]),s!==r&&yu(Ye,r,s)}}setTimeout(Du,ot(4e3,9e3))}setTimeout(Du,An.length*300+2500);setInterval(()=>{const i=[...rt.keys()];if(i.length<2)return;const e=Math.random()<.4?2:1;for(let t=0;t<e;t++){const a=i[Math.floor(Math.random()*i.length)];let n=i[Math.floor(Math.random()*i.length)];n===a&&(n=i[(i.indexOf(a)+1)%i.length]),n!==a&&yu(Ye,a,n)}},1200);setInterval(()=>{const i=[...rt.entries()].filter(([,r])=>r>=70);if(i.length===0)return;const e=Ye.getAttribute("data-active-node"),t=i.filter(([r])=>r!==e),a=t.length>0?t:i,[n]=a[Math.floor(Math.random()*a.length)];Si(Ye,n),pa(Ye,n)},8e3);const v0=document.getElementById("alert-host");document.addEventListener("s9:alert",i=>{var e;if(((e=i.detail)==null?void 0:e.level)==="critical"){const t=i.detail.source??"UNKNOWN";Pe(Ce,`⚠ CRITICAL ALERT: ${t}`,"err"),S_(v0,{level:"critical",code:"CRITICAL THREAT",message:t})}});const vn=document.getElementById("node-popup"),x0=document.getElementById("np-city"),S0=document.getElementById("np-skyline"),y0=document.getElementById("np-country"),M0=document.getElementById("np-pop"),E0=document.getElementById("np-coords"),wc=document.getElementById("np-threat"),b0=document.getElementById("np-status");Ye.addEventListener("s9:threatmap-node-select",i=>{const{nodeId:e,label:t,level:a,lat:n,lng:r}=i.detail;Pe(Ce,`NODE SELECT: ${t} — LEVEL ${a} — ${n.toFixed(2)}°, ${r.toFixed(2)}°`,a>=71?"err":a>=41?"warn":"info"),En($a,{timestamp:new Date().toISOString(),source:"TGT",message:`TARGET LOCKED: ${t} THREAT=${a}`,alert:a>=41});const s=g0[e]??{country:"—",pop:"—",status:"UNKNOWN"};x0.textContent=t,S0.innerHTML=_0(e),y0.textContent=s.country,M0.textContent=s.pop,E0.textContent=`${n.toFixed(2)}°, ${r.toFixed(2)}°`;const o=a>=70?"CRITICAL":a>=40?"ELEVATED":"LOW";wc.textContent=`${a} — ${o}`,wc.style.color=a>=70?"var(--text-alert)":a>=40?"var(--neon-amber)":"var(--neon-green)",b0.textContent=s.status,vn.classList.toggle("node-popup--left",r>60),vn.setAttribute("aria-hidden","false"),vn.classList.add("node-popup--visible")});Ye.addEventListener("s9:threatmap-node-deselect",()=>{vn.classList.remove("node-popup--visible"),setTimeout(()=>vn.setAttribute("aria-hidden","true"),260)});function T0(){const i=document.getElementById("threatmap-tactical");vu(i,{autoRotate:!0,bloomStrength:.7});const e=new Map;An.forEach((d,p)=>{setTimeout(()=>{To(i,{...d,level:Po[p]}),e.set(d.id,Po[p])},p*200+300)}),setTimeout(()=>Li(i,55),An.length*200+800);const t=document.getElementById("tact-node-info"),a=document.getElementById("tact-btn-add"),n=document.getElementById("tact-btn-remove"),r=document.getElementById("tact-btn-focus"),s=document.getElementById("tact-btn-deselect"),o=document.getElementById("tact-level-slider"),l=document.getElementById("tact-level-val"),c=document.getElementById("tact-level-row");let u=null;function h(){const d=u!==null&&e.has(u);if(n.disabled=!d,r.disabled=!d,s.disabled=!d,o.disabled=!d,c.style.opacity=d?"1":"0.4",c.style.pointerEvents=d?"auto":"none",d){const p=mi.find(S=>S.id===u),g=e.get(u);t.textContent=`${(p==null?void 0:p.label)??u} — LVL ${g}`,o.value=g,l.textContent=g}else t.textContent="NO NODE SELECTED"}i.addEventListener("s9:threatmap-node-select",d=>{u=d.detail.nodeId,document.getElementById("tactical-threat").textContent=`THREAT: ${d.detail.level} — ${d.detail.label}`,h()}),i.addEventListener("s9:threatmap-node-deselect",()=>{u=null,h()}),a.addEventListener("click",()=>{const d=mi.filter(S=>!e.has(S.id));if(d.length===0)return;const p=d[Math.floor(Math.random()*d.length)],g=Math.floor(Math.random()*60)+10;To(i,{...p,level:g}),e.set(p.id,g),Li(i,Math.max(...e.values())),Si(i,p.id),pa(i,p.id)}),n.addEventListener("click",()=>{u&&(xu(i,u),e.delete(u),Li(i,e.size>0?Math.max(...e.values()):0),u=null,h())}),r.addEventListener("click",()=>{u&&pa(i,u)}),s.addEventListener("click",()=>{Si(i,null),u=null,h()}),o.addEventListener("input",()=>{if(!u)return;const d=parseInt(o.value);l.textContent=d,Pr(i,u,d),e.set(u,d),Li(i,Math.max(...e.values()));const p=mi.find(g=>g.id===u);t.textContent=`${(p==null?void 0:p.label)??u} — LVL ${d}`}),h()}function A0(){const i=document.getElementById("flow-matrix");if(!i)return;const e=[{id:"sec9",label:"SEC.9 HQ",x:50,y:50,root:!0},{id:"niihama",label:"NIIHAMA",x:22,y:22},{id:"togusa",label:"TOGUSA",x:78,y:22},{id:"batou",label:"BATOU",x:78,y:78},{id:"ishikawa",label:"ISHIKAWA",x:22,y:78},{id:"relay1",label:"RELAY ALPHA",x:36,y:32},{id:"relay2",label:"RELAY BETA",x:64,y:32},{id:"relay3",label:"RELAY GAMMA",x:36,y:68},{id:"relay4",label:"RELAY DELTA",x:64,y:68},{id:"ext1",label:"PUPPET MASTER",x:12,y:50},{id:"ext2",label:"LAUGHING MAN",x:88,y:50},{id:"tachi",label:"TACHIKOMA U9",x:50,y:12}],t=[{id:"e01",from:"sec9",to:"relay1"},{id:"e02",from:"sec9",to:"relay2"},{id:"e03",from:"sec9",to:"relay3"},{id:"e04",from:"sec9",to:"relay4"},{id:"e05",from:"relay1",to:"niihama"},{id:"e06",from:"relay2",to:"togusa"},{id:"e07",from:"relay3",to:"ishikawa"},{id:"e08",from:"relay4",to:"batou"},{id:"e09",from:"niihama",to:"ext1"},{id:"e10",from:"ext1",to:"relay3"},{id:"e11",from:"togusa",to:"relay1"},{id:"e12",from:"batou",to:"relay2"},{id:"e13",from:"ext2",to:"relay2"},{id:"e14",from:"ext2",to:"relay4"},{id:"e15",from:"sec9",to:"tachi"},{id:"e16",from:"relay1",to:"relay2"},{id:"e17",from:"relay3",to:"relay4"}],a={relay2:72,relay4:88,ext1:95,ext2:80,niihama:45,batou:55};y_(i,{nodes:e,edges:t});for(const[o,l]of Object.entries(a)){const c=i.querySelector(`[data-node-id="${o}"]`);c&&(l>=70?c.classList.add("s9-matrix__node--threat-high"):l>=40&&c.classList.add("s9-matrix__node--threat-mid"))}gr(i,"ext1");const n=t.map(o=>o.id),r=new Set;function s(){if(r.size>0){const h=[...r],d=h[Math.floor(Math.random()*h.length)];pu(i,d),r.delete(d)}const o=[null,null,"var(--neon-amber)","var(--neon-magenta)","var(--neon-green)",null],l=n.filter(h=>!r.has(h)),c=Math.random()<.4?2:1;for(let h=0;h<c&&l.length>0;h++){const d=l.splice(Math.floor(Math.random()*l.length),1)[0],p=o[Math.floor(Math.random()*o.length)];bo(i,d,p),r.add(d)}if(Math.random()<.35){const h=e[Math.floor(Math.random()*e.length)];M_(i,h.id)}const u=document.getElementById("flow-overlay");if(u){const h=Object.values(a).filter(g=>g>=70).length,d=Object.values(a).filter(g=>g>=40&&g<70).length,p=getComputedStyle(document.documentElement).getPropertyValue("--neon-cyan").trim()||"#00d4b0";u.innerHTML=`<span style="font-family:var(--font-terminal);font-size: 0.7rem;color:${p};opacity:0.7">NODES: ${e.length} &nbsp; <span style="color:var(--text-alert)">CRIT: ${h}</span> &nbsp; <span style="color:var(--neon-amber)">WARN: ${d}</span></span>`}}for(let o=0;o<4;o++){const l=n[Math.floor(Math.random()*n.length)];r.has(l)||(bo(i,l),r.add(l))}setInterval(s,700),s(),document.getElementById("matrix-status").textContent="● LIVE"}(function(){const i=document.getElementById("ts-feed-src"),e=document.getElementById("ts-feed-canvas"),t=document.getElementById("ts-glow-canvas");if(!i||!e)return;const a=480,n=270,r=document.createElement("canvas");r.width=a,r.height=n;const s=r.getContext("2d");s.imageSmoothingEnabled=!1;function o(){const c=window.devicePixelRatio||1,u=e.getBoundingClientRect(),h=Math.round(u.width*c),d=Math.round(u.height*c);(e.width!==h||e.height!==d)&&(e.width=h,e.height=d);const p=e.getContext("2d");p.imageSmoothingEnabled=!0,p.imageSmoothingQuality="low";const g=i.naturalWidth||a*4,S=i.naturalHeight||n*4,m=g/S;let f=a,y=Math.round(a/m);y>n&&(y=n,f=Math.round(n*m));const b=(a-f)/2|0,M=(n-y)/2|0;s.clearRect(0,0,a,n),s.drawImage(i,b,M,f,y),p.clearRect(0,0,h,d);const w=Math.min(h/a,d/n),A=(h-a*w)/2|0,D=(d-n*w)/2|0;if(p.drawImage(r,A,D,a*w,n*w),t){(t.width!==h||t.height!==d)&&(t.width=h,t.height=d);const v=t.getContext("2d");v.clearRect(0,0,h,d),v.drawImage(r,A,D,a*w,n*w)}}function l(){o(),new ResizeObserver(o).observe(e)}i.complete&&i.naturalWidth?l():i.addEventListener("load",l,{once:!0})})();(function(){const i=document.getElementById("ts-grain-turb");if(!i)return;let e=0,t=2;function a(){e++;const n=2+(e%3===0?1:0)+(e%7===0?1:0);if(e%n===0){let r;do r=Math.random()*999+1|0;while(r===t);t=r,i.setAttribute("seed",r)}requestAnimationFrame(a)}requestAnimationFrame(a)})();
