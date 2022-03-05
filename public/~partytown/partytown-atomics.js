/* Partytown 0.4.2 - MIT builder.io */
(e=>{const t=()=>{},r=e=>e.length,n=e=>{try{return e.constructor.name}catch(e){}return""},i=(e,t)=>e.startsWith(t),s=e=>!(i(e,"webkit")||i(e,"toJSON")||i(e,"constructor")||i(e,"toString")||i(e,"_")),o=()=>Math.round(Math.random()*Number.MAX_SAFE_INTEGER).toString(36),a={Anchor:"a",DList:"dl",Image:"img",OList:"ol",Paragraph:"p",Quote:"q",TableCaption:"caption",TableCell:"td",TableCol:"colgroup",TableRow:"tr",TableSection:"tbody",UList:"ul"},c={Graphics:"g",SVG:"svg"},l=Symbol(),u=Symbol(),h=new Map,d=new Map,p={},m=new WeakMap,g=(e,t,r)=>{if(e)return e===e.window?"0":"#document"===(r=e.nodeName)?"1":"HTML"===r?"2":"HEAD"===r?"3":"BODY"===r?"4":((t=e[l])||y(e,t=o()),t)},f=(e,t,r,n,i)=>{if((r=p[e])&&(n=r.R))return i=n.document,"0"===t?n:"1"===t?i:"2"===t?i.documentElement:"3"===t?i.head:"4"===t?i.body:h.get(t)},y=(e,t,r)=>{e&&(h.set(t,e),e[l]=t,e[u]=r=Date.now(),r>$+5e3&&(h.forEach(((e,t)=>{e[u]<$&&e.nodeType&&!e.isConnected&&h.delete(t)})),$=r))};let $=0;const w=e.parent,S=document,v=w.partytown||{},b=(v.lib||"/~partytown/")+"",T=(e,t,r,s,o)=>void 0!==t&&(s=typeof t)?"string"===s||"number"===s||"boolean"===s||null==t?[0,t]:"function"===s?[6]:(r=r||new Set)&&Array.isArray(t)?r.has(t)?[1,[]]:r.add(t)&&[1,t.map((t=>T(e,t,r)))]:"object"===s?""===(o=n(t))?[2,{}]:"Window"===o?[3,{S:e,w:"0"}]:"HTMLCollection"===o||"NodeList"===o?[7,Array.from(t).map((t=>T(e,t,r)[1]))]:o.endsWith("Event")?[5,E(e,t,r)]:"CSSRuleList"===o?[12,Array.from(t).map(I)]:i(o,"CSS")&&o.endsWith("Rule")?[11,I(t)]:"CSSStyleDeclaration"===o?[13,E(e,t,r)]:"Attr"===o?[10,[t.name,t.value]]:t.nodeType?[3,{S:e,w:g(t),E:t.nodeName}]:[2,E(e,t,r,!0,!0)]:void 0:t,E=(e,t,r,n,i,o,a,c)=>{if(o={},!r.has(t))for(a in r.add(t),t)s(a)&&(c=t[a],(n||"function"!=typeof c)&&(i||""!==c)&&(o[a]=T(e,c,r)));return o},I=e=>{let t,r={};for(t in e)R.includes(t)&&(r[t]=e[t]);return r},M=(t,r,n,i)=>r?(n=r[0],i=r[1],0===n?i:4===n?N(t,i):1===n?i.map((e=>M(t,e))):3===n?f(i.S,i.w):5===n?A(L(t,i)):2===n?L(t,i):8===n?i:9===n?new e[r[2]](i):void 0):void 0,N=(e,{S:t,w:r,J:n},i)=>((i=d.get(n))||(i=function(...i){e.postMessage([7,{S:t,w:r,J:n,P:T(t,this),b:T(t,i)}])},d.set(n,i)),i),A=e=>new("detail"in e?CustomEvent:Event)(e.type,e),L=(e,t,r,n)=>{for(n in r={},t)r[n]=M(e,t[n]);return r},R="cssText,selectorText,href,media,namespaceURI,prefix,name,conditionText".split(","),C=async(e,t)=>{let n,i,s,o,a,c,l={D:t.D},u=r(t.O),h=0;for(;h<u;h++)try{c=h===u-1,n=t.O[h],i=n.S,s=n.a,p[i]||await new Promise((e=>{let t=0,r=()=>{p[i]||t++>999?e():setTimeout(r,9)};r()})),1===s[0]&&s[1]in p[i].R?y(new p[i].R[s[1]](...M(e,s[2])),n.w):(o=f(i,n.w),o?(a=x(e,o,s,c,n.r),n.d&&y(a,n.d),"object"==typeof(d=a)&&d&&d.then&&(a=await a,l.z=!0),l.K=T(i,a)):l.p=n.w+" not found")}catch(e){c?l.p=String(e.stack||e):console.error(e)}var d;return l},x=(e,t,n,i,s)=>{let o,a,c,l,u,h=0,d=r(n);for(;h<d;h++){a=n[h],o=n[h+1],c=n[h-1];try{if(!Array.isArray(o))if("string"==typeof a||"number"==typeof a){if(h+1===d&&s)return u={},s.map((e=>u[e]=t[e])),u;t=t[a]}else{if(0===o)return void(t[c]=M(e,a));if("function"==typeof t[c]&&(l=M(e,a),"insertRule"===c&&l[1]>r(t.cssRules)&&(l[1]=r(t.cssRules)),t=t[c].apply(t,l),"play"===c))return Promise.resolve()}}catch(e){if(i)throw e;console.debug(e)}}return t},O=(e,t,r)=>{if(!m.has(r)){m.set(r,t);const n=r.document,i=r.history,s=m.get(r.parent),o=()=>e.postMessage([3,{S:t,H:s,Q:n.baseURI}]),a=i.pushState.bind(i),c=i.replaceState.bind(i),l=()=>setTimeout((()=>e.postMessage([11,t,n.baseURI])));i.pushState=(e,t,r)=>{a(e,t,r),l()},i.replaceState=(e,t,r)=>{c(e,t,r),l()},r.addEventListener("popstate",l),r.addEventListener("hashchange",l),p[t]={S:t,R:r},"complete"===n.readyState?o():r.addEventListener("load",o)}},j=(e,t)=>{let n,i,s,o=t.S,a=t.R,c=a.document;c&&c.body?(n=c.querySelector('script[type="text/partytown"]:not([data-ptid]):not([data-pterror]):not([async]):not([defer])'),n||(n=c.querySelector('script[type="text/partytown"]:not([data-ptid]):not([data-pterror])')),n?(n.dataset.ptid=i=g(n,o),s={S:o,w:i},n.src?(s.Q=n.src,s.F=n.dataset.ptsrc||n.src):s.j=n.innerHTML,e.postMessage([5,s])):(t.x||(t.x=1,((e,t,n)=>{let i,s,o=n._ptf,a=(n.partytown||{}).forward||[],c=(r,n)=>e.postMessage([8,{S:t,q:r,b:T(t,Array.from(n))}]);if(n._ptf=void 0,a.map((e=>{s=n,e.split(".").map(((e,t,n)=>{s=s[n[t]]=t+1<r(n)?s[n[t]]||("push"===n[t+1]?[]:{}):(...e)=>c(n,e)}))})),o)for(i=0;i<r(o);i+=2)c(o[i],o[i+1])})(e,o,a),c.dispatchEvent(new CustomEvent("pt0"))),e.postMessage([6,o]))):requestAnimationFrame((()=>j(e,t)))},P=(e,t,r)=>{let n=[],i=[e,"Object",n];for(r in t)k(n,t,r);return i},H=(e,t,r,i,s)=>{if("Object"!==t&&!e.some((e=>e[0]===t))){const o=Object.getPrototypeOf(r),a=n(o),c=[];H(e,a,o,i,s),Object.keys(Object.getOwnPropertyDescriptors(r)).map((e=>k(c,i,e))),e.push([t,a,c,s,i.nodeName])}},k=(e,t,r,i,o,a)=>{try{s(r)&&isNaN(r[0])&&"all"!==r&&("function"==(o=typeof(i=t[r]))?(String(i).includes("[native")||Object.getPrototypeOf(t)[r])&&e.push([r,5]):"object"===o&&null!=i?"Object"!==(a=n(i))&&self[a]&&e.push([r,i.nodeType||a]):"symbol"!==o&&(r.toUpperCase()===r?e.push([r,6,i]):e.push([r,6])))}catch(e){console.warn(e)}},D=e=>{let t,n=[],i=0,s=r(w[e]);for(;i<s;i++)t=w[e].key(i),n.push([t,w[e].getItem(t)]);return n},q=(e,r)=>void 0!==e[r]?new e[r](t):0;let F;(async e=>{const t=new SharedArrayBuffer(1073741824),r=new Int32Array(t);return(i,s)=>{const l=s[0],u=s[1];if(0===l){const e=(()=>{const e=S.implementation.createHTMLDocument(),t=e.head,r=e.createTextNode(""),i=e.createComment(""),s=e.createDocumentFragment(),o=q(w,"IntersectionObserver"),l=q(w,"MutationObserver"),u=q(w,"ResizeObserver"),h=w.performance,d=w.screen,p=Object.getOwnPropertyNames(w).map((t=>((e,t,r,n)=>{if(r=t.match(/^(HTML|SVG)(.+)Element$/))return n=r[2],"S"==t[0]?e.createElementNS("http://www.w3.org/2000/svg",c[n]||n.slice(0,2).toLowerCase()+n.slice(2)):e.createElement(a[n]||n)})(e,t))).filter((e=>e)).map((e=>[e])),m=[[w.history],[h],[h.navigation],[h.timing],[d],[d.orientation],[o,12],[l,12],[u,12],[r],[i],[s],[t],[t.attributes],[t.classList],[t.dataset],[t.style],[e],[e.doctype],...p].filter((e=>e[0])).map((e=>{const t=e[0],r=e[1],i=n(t);return[i,w[i].prototype,t,r]})),g=[P("Window",w),P("Node",r)],f={i:JSON.stringify(v,((e,t)=>("function"==typeof t&&(t=String(t)).startsWith(e+"(")&&(t="function "+t),t))),A:new URL(b,w.location)+"",v:g,G:origin,B:D("localStorage"),M:D("sessionStorage")};return m.map((([e,t,r,n])=>H(g,e,t,r,n))),((e,t,r)=>{void 0!==t[r]&&e.push([r,"Object",Object.keys(t[r].prototype).map((e=>[e,6])),12])})(g,w,"IntersectionObserverEntry"),f})();e.N=t,i.postMessage([1,e])}else 9===l?e(u,(e=>{const t=JSON.stringify(e),n=t.length;for(let e=0;e<n;e++)r[e+1]=t.charCodeAt(e);r[0]=n,Atomics.notify(r,0)})):((e,t,r)=>{2===t[0]?O(e,o(),w):(r=p[t[1]])&&(5===t[0]?requestAnimationFrame((()=>j(e,r))):4===t[0]&&((e,t,r,n,i)=>{(i=t.R.document.querySelector(`[data-ptid="${r}"]`))&&(n?i.dataset.pterror=n:i.type+="-x",delete i.dataset.ptid),j(e,t)})(e,r,t[2],t[3]))})(i,s)}})(((e,t)=>C(F,e).then(t))).then((e=>{e&&(F=new Worker(URL.createObjectURL(new Blob(['/* Partytown 0.4.2 - MIT builder.io */\n(e=>{const t=Symbol(),r=Symbol(),n=Symbol(),i=Symbol(),s=Symbol(),o=Symbol(),a=Symbol(),$=Symbol(),c=new Map,l={},u=new WeakMap,d=[],h={},p=new Map,g=new Map,m={},f=new Map,w=new Map,y=e=>e.split(","),v=e=>{if(e=h.A+e,new URL(e).origin!=location.origin)throw"Invalid "+e;return e},I=y("clientWidth,clientHeight,clientTop,clientLeft,innerWidth,innerHeight,offsetWidth,offsetHeight,offsetTop,offsetLeft,outerWidth,outerHeight,pageXOffset,pageYOffset,scrollWidth,scrollHeight,scrollTop,scrollLeft"),S=y("childElementCount,children,firstElementChild,lastElementChild,nextElementSibling,previousElementSibling"),b=y("insertBefore,remove,removeChild,replaceChild"),M=y("className,width,height,hidden,innerHTML,innerText,textContent"),T=y("setAttribute,setAttributeNS,setProperty"),E=y("addEventListener,dispatchEvent,removeEventListener"),N=E.concat(T,y("add,observe,remove,unobserve")),x=/^[A-Z]([A-Z0-9-]*[A-Z0-9])?$/,L=()=>{},A=e=>e.length,C=e=>{try{return e.constructor.name}catch(e){}return""},R=[],P=()=>Math.round(Math.random()*Number.MAX_SAFE_INTEGER).toString(36),W="text/partytown",H=(e,t,r)=>Object.defineProperty(e,t,{...r,configurable:!0}),D=(e,t)=>H(e,"name",{value:t}),O=(e,t,r)=>H(e.prototype,t,r),k=(e,t)=>Object.defineProperties(e.prototype,t),B=(e,t,r)=>O(e,t,{value:r,writable:!0}),U=(e,t)=>t in e[o],j=(e,t)=>e[o][t],F=(e,t,r)=>e[o][t]=r,_=[],V=(e,n,i,o,a,$)=>{if(_.push({S:e[t],w:e[r],a:[...e[s],...n],d:o,r:a}),3===i)h.I([10,{D:P(),O:[..._]}],$?[$ instanceof ArrayBuffer?$:$.buffer]:void 0),_.length=0;else if(1===i)return z(!0);h.c=setTimeout(z,20)},z=e=>{if(clearTimeout(h.c),A(_)){const t=_[A(_)-1],r={D:P(),O:[..._]};if(_.length=0,e){const e=((e,t)=>{const r=e.N,n=new Int32Array(r);Atomics.store(n,0,0),e.I([9,t]),Atomics.wait(n,0,0);let i=Atomics.load(n,0),s="",o=0;for(;o<i;o++)s+=String.fromCharCode(n[o+1]);return JSON.parse(s)})(h,r),n=e.z,i=$e(t.S,t.w,t.a,e.K);if(e.p){if(n)return Promise.reject(e.p);throw new Error(e.p)}return n?Promise.resolve(i):i}h.I([10,r])}},G=(e,t,r,n)=>h.i.get&&(n=h.i.get(J(e,t)))!==a?n:n=V(e,t,1,void 0,r),X=(e,t,r,n)=>{if(h.i.set){if((n=h.i.set({value:r,prevent:$,...J(e,t)}))===$)return;n!==a&&(r=n)}M.some((e=>t.includes(e)))&&(f.clear(),t[t.length-1]),t=[...t,ae(e,r),0],V(e,t,2)},q=(e,t,r,n,i,s,o,$)=>h.i.apply&&(o=h.i.apply({args:r,...J(e,t)}))!==a?o:($=t[A(t)-1],t=[...t,ae(e,r)],n=n||(N.includes($)?2:1),"setAttribute"===$&&U(e,r[0])?F(e,r[0],r[1]):b.includes($)?(f.clear(),w.clear()):T.includes($)&&(n=2,f.clear()),o=V(e,t,n,i,void 0,s)),Z=(e,t,r)=>{V(e,[1,t,ae(e,r)],1)},J=(e,t)=>({name:t.join("."),continue:a,nodeName:e[n],constructor:C(e)}),Y=(e,t,r,n,i)=>((i=c.get(t))||(i=m[e].k(r,t,n),c.set(t,i)),i),K=(e,t)=>B(e,"nodeType",t),Q=(e,t)=>t.map((t=>O(e,t,{get(){let e=ee(this,t),r=w.get(e);return r||(r=G(this,[t]),w.set(e,r)),r}}))),ee=(e,n,i)=>[e[t],e[r],n,...(i||R).map((e=>String(e&&e[t]?e[r]:e)))].join("."),te=(e,t)=>y(t).map((t=>O(e,t,{get(){return U(this,t)||F(this,t,G(this,[t])),j(this,t)},set(e){j(this,t)!==e&&X(this,[t],e),F(this,t,e)}}))),re=e=>I.map((t=>O(e,t,{get(){const e=f.get(ee(this,t));if("number"==typeof e)return e;const r=G(this,[t],I);return r&&"object"==typeof r?(Object.entries(r).map((([e,t])=>f.set(ee(this,e),t))),r[t]):r}}))),ne=(e,t)=>t.map((t=>{e.prototype[t]=function(...e){let r=ee(this,t,e),n=f.get(r);return n||(n=q(this,[t],e),f.set(r,n)),n}})),ie=(e,n,i,s,o)=>{return void 0!==i&&(o=typeof i)?"string"===o||"boolean"===o||"number"===o||null==i?[0,i]:"function"===o?[4,{S:e,w:n,J:(a=i,($=u.get(a))||(u.set(a,$=P()),l[$]=a),$)}]:(s=s||new Set)&&Array.isArray(i)?s.has(i)?[1,[]]:s.add(i)&&[1,i.map((t=>ie(e,n,t,s)))]:"object"===o?i[r]?[3,{S:i[t],w:i[r]}]:i instanceof Event?[5,oe(e,n,i,!1,s)]:se&&i instanceof TrustedHTML?[0,i.toString()]:i instanceof ArrayBuffer?[8,i]:ArrayBuffer.isView(i)?[9,i.buffer,C(i)]:[2,oe(e,n,i,!0,s)]:void 0:i;var a,$},se="undefined"!=typeof TrustedHTML,oe=(e,t,r,n,i,s,o,a)=>{if(s={},!i.has(r))for(o in i.add(r),r)a=r[o],(n||"function"!=typeof a)&&(s[o]=ie(e,t,a,i));return s},ae=(e,n)=>e?ie(e[t],e[r],n):[0,n],$e=(e,t,r,n,i,s,o,a)=>{if(n){if(i=n[0],s=n[1],0===i||11===i||12===i)return s;if(4===i)return ue(r,s);if(6===i)return L;if(3===i)return ce(s);if(7===i)return new de(s.map(ce));if(10===i)return new he(s);if(1===i)return s.map((n=>$e(e,t,r,n)));for(a in o={},s)o[a]=$e(e,t,[...r,a],s[a]);if(13===i)return new m[e].R.CSSStyleDeclaration(e,t,r,o);if(5===i){if("message"===o.type&&o.origin){let e,t=JSON.stringify(o.data),r=d.find((e=>e.m===t));r&&(e=m[r.S],e&&(o.source=e.R,o.origin=e.C.origin))}return new Proxy(new Event(o.type,o),{get:(e,t)=>t in o?o[t]:"function"==typeof e[String(t)]?L:e[String(t)]})}if(2===i)return o}},ce=({S:e,w:t,E:r})=>le(e,t)||Y(e,t,r),le=(e,t,r)=>(r=m[e])&&"0"===t?r.R:"1"===t?r.n:"2"===t?r.o:"3"===t?r.s:"4"===t?r.e:void 0,ue=(e,{S:t,w:r,E:n,J:i})=>(l[i]||u.set(l[i]=function(...i){const s=Y(t,r,n);return q(s,e,i)},i),l[i]),de=class{constructor(e){(this._=e).map(((e,t)=>this[t]=e))}entries(){return this._.entries()}forEach(e,t){this._.map(e,t)}item(e){return this[e]}keys(){return this._.keys()}get length(){return A(this._)}values(){return this._.values()}[Symbol.iterator](){return this._[Symbol.iterator]()}},he=class{constructor(e){this.name=e[0],this.value=e[1]}get nodeName(){return this.name}get nodeType(){return 2}},pe=(e,t,r,n)=>{let i,s,o=t=>((t=r.get(e.origin))||r.set(e.origin,t=[]),t),a=e=>o().findIndex((t=>t[ge]===e)),$={getItem:e=>(i=a(e),i>-1?o()[i][me]:null),setItem(r,s){i=a(r),i>-1?o()[i][me]=s:o().push([r,s]),n&&q(e,[t,"setItem"],[r,s],2)},removeItem(r){i=a(r),i>-1&&o().splice(i,1),n&&q(e,[t,"removeItem"],[r],2)},key:e=>(s=o()[e],s?s[ge]:null),clear(){o().length=0,n&&q(e,[t,"clear"],R,2)},get length(){return o().length}};e[t]=$},ge=0,me=1,fe=(e,t,r)=>{e[r]=D(class extends t{constructor(e,t,r,i){return super(e,t,r,i||{}),new Proxy(this,{get:(e,t)=>e[t]?e[t]:(e[t]||"string"!=typeof t||e[n][t]||(e[n][t]=G(e,[t])),e[n][t]),set:(e,t,r)=>(e[n][t]=r,X(e,[t],r),f.clear(),!0)})}setProperty(...e){this[n][e[0]]=e[1],q(this,["setProperty"],e,2),e[0],f.clear()}getPropertyValue(e){return this[e]}removeProperty(e){let t=this[n][e];return q(this,["removeProperty"],[e],2),f.clear(),this[n][e]=void 0,t}},r)},we=(e,t)=>{e[t]=D(class{constructor(e){this.ownerNode=e}get cssRules(){const e=this.ownerNode;return new Proxy({},{get(t,r){const n=String(r);return"item"===n?t=>ve(e,t):"length"===n?ye(e).length:isNaN(n)?t[r]:ve(e,n)}})}insertRule(e,t){const r=ye(this.ownerNode);return(t=void 0===t?0:t)>=0&&t<=r.length&&(q(this.ownerNode,["sheet","insertRule"],[e,t],2),r.splice(t,0,0)),this.ownerNode,f.clear(),t}deleteRule(e){q(this.ownerNode,["sheet","deleteRule"],[e],2),ye(this.ownerNode).splice(e,1),this.ownerNode,f.clear()}get type(){return"text/css"}},t);const r={sheet:{get(){return new e[t](this)}}};k(e.HTMLStyleElement,r)},ye=(e,t)=>((t=j(e,2))||(t=G(e,["sheet","cssRules"]),F(e,2,t)),t),ve=(e,t,r)=>(0===(r=ye(e))[t]&&(r[t]=G(e,["sheet","cssRules",parseInt(t,10)])),r[t]),Ie="0.4.2",Se=(e,t,r,n,i)=>{try{e.l=t,be(e,r)}catch(e){console.error(r,e),i=String(e.stack||e)}return e.l="",i},be=(e,t,r)=>{e.L=1,new Function(`with(this){${t.replace(/\\bthis\\b/g,"(thi$(this)?window:this)").replace(/\\/\\/# so/g,"//Xso")}\\n;function thi$(t){return t===this}${(h.i.globalFns||[]).filter((e=>/[a-zA-Z_$][0-9a-zA-Z_$]*/.test(e))).map((e=>`(typeof ${e}==\'function\'&&(window.${e}=${e}))`)).join(";")}}`+(r?"\\n//# sourceURL="+r:"")).call(e.R),e.L=0},Me=(e,t,r)=>{(r=j(e,t))&&setTimeout((()=>r.map((e=>e({type:t})))))},Te=(e,t,r,n,i,s)=>{for(n=e.C;!n.host&&(n=(e=m[e.H]).C,e.S!==e.H););return i=new URL(t||"",n),!r&&h.i.resolveUrl&&(s=h.i.resolveUrl(i,n))?s:i},Ee=(e,t,r)=>Te(e,t,r)+"",Ne=()=>`<script src="${v("partytown.js?v="+Ie)}"><\\/script>`,xe=e=>class{constructor(){this.s="",this.l=[],this.e=[]}get src(){return this.s}set src(t){fetch(Ee(e,t,!0),{mode:"no-cors",keepalive:!0}).then((e=>{e.ok||0===e.status?this.l.map((e=>e({type:"load"}))):this.e.map((e=>e({type:"error"})))}),(()=>this.e.forEach((e=>e({type:"error"})))))}addEventListener(e,t){"load"===e&&this.l.push(t),"error"===e&&this.e.push(t)}get onload(){return this.l[0]}set onload(e){this.l=[e]}get onerror(){return this.e[0]}set onerror(e){this.e=[e]}},Le={addEventListener:{value(...e){const t=e[0],r=j(this,t)||[];r.push(e[1]),F(this,t,r)}},async:{get:L,set:L},defer:{get:L,set:L},onload:{get(){let e=j(this,"load");return e&&e[0]||null},set(e){F(this,"load",e?[e]:null)}},onerror:{get(){let e=j(this,"error");return e&&e[0]||null},set(e){F(this,"error",e?[e]:null)}},getAttribute:{value(e){return"src"===e?this.src:q(this,["getAttribute"],[e])}},setAttribute:{value(e,t){Ae.includes(e)?this[e]=t:q(this,["setAttribute"],[e,t])}}},Ae=y("src,type"),Ce=e=>{const t={innerHTML:Re,innerText:Re,src:{get(){return j(this,4)||""},set(e){const t=Ze(this),r=Ee(t,e,!0);e=Ee(t,e),F(this,4,e),X(this,["src"],e),r!==e&&X(this,["dataset","ptsrc"],r)}},textContent:Re,type:{get(){return G(this,["type"])},set(e){Pe(e)||(F(this,5,e),X(this,["type"],e))}},...Le};k(e,t)},Re={get(){return j(this,3)||""},set(e){F(this,3,e)}},Pe=e=>!e||"text/javascript"===e,We=(e,i)=>{const s=D(class extends i{appendChild(e){return this.insertBefore(e,null)}get href(){}set href(e){}insertBefore(e,i){const s=e[t]=this[t],o=e[r],a=e[n],$="SCRIPT"===a,c="IFRAME"===a;if($){const t=j(e,3),r=j(e,5);if(t){if(Pe(r)){const r=Se(Ze(e),o,t,0,""),n=r?"pterror":"ptid",i=r||o;X(e,["type"],W+"-x"),X(e,["dataset",n],i)}X(e,["innerHTML"],t)}}return q(this,["insertBefore"],[e,i],2),c&&((e,t)=>{let r,n,i=0,s=()=>{m[e]&&m[e].x&&!m[e].y?(r=j(t,1)?"error":"load",n=j(t,r),n&&n.map((e=>e({type:r})))):i++>2e3?(n=j(t,"error"),n&&n.map((e=>e({type:"error"})))):setTimeout(s,9)};s()})(o,e),$&&(z(!0),h.I([5,s])),e}get nodeName(){return this[n]}get nodeType(){return 3}get ownerDocument(){return Ze(this).n}},"Node");Q(s,y("childNodes,firstChild,isConnected,lastChild,nextSibling,parentElement,parentNode,previousSibling")),e.Node=s},He=y("AUDIO,CANVAS,VIDEO"),De=y("Audio,MediaSource"),Oe=(e,r)=>{k(e,{body:{get(){return Ze(this).e}},cookie:{get(){return r?G(this,["cookie"]):""},set(e){r&&X(this,["cookie"],e)}},createElement:{value(e){if(e=e.toUpperCase(),!x.test(e))throw e+" not valid";const r=this[t],n=P(),i=Y(r,n,e);if(q(this,["createElement"],[e],2,n),"IFRAME"===e)qe({S:n,H:r,Q:"about:blank"},!0).R.fetch=fetch,X(i,["srcdoc"],Ne());else if("SCRIPT"===e){const e=j(i,5);Pe(e)&&X(i,["type"],W)}return i}},createElementNS:{value(e,r){const n=P(),i=Y(this[t],n,r,e);return q(this,["createElementNS"],[e,r],2,n),i}},createTextNode:{value(e){const r=this[t],n=P(),i=Y(r,n,"#text");return q(this,["createTextNode"],[e],2,n),i}},createEvent:{value:e=>new Event(e)},currentScript:{get(){const e=this[t],r=Ze(this).l;return r?Y(e,r,"SCRIPT"):null}},defaultView:{get(){return Je(this)}},documentElement:{get(){return Ze(this).o}},getElementsByTagName:{value(e){return"BODY"===(e=e.toUpperCase())?[Ze(this).e]:"HEAD"===e?[Ze(this).s]:q(this,["getElementsByTagName"],[e])}},head:{get(){return Ze(this).s}},implementation:{value:{hasFeature:()=>!0}},location:{get(){return Ze(this).C},set(e){Ze(this).C.href=e+""}},nodeType:{value:9},parentNode:{value:null},parentElement:{value:null},readyState:{value:"complete"}}),te(e,"compatMode,referrer,forms")},ke=e=>{k(e,{parentElement:{get(){return this.parentNode}},parentNode:{get(){return Ze(this).o}}})},Be=e=>{k(e,{parentElement:{value:null},parentNode:{get(){return Ze(this).n}}})},Ue=e=>{k(e,{localName:{get(){return this[n].toLowerCase()}},namespaceURI:{get(){return this[i]||"http://www.w3.org/1999/xhtml"}},nodeType:{value:1},tagName:{get(){return this[n]}}}),Q(e,S),re(e),ne(e,y("getClientRects,getBoundingClientRect")),te(e,"id")},je=e=>{const t={};y("hash,host,hostname,href,origin,pathname,port,protocol,search").map((e=>{t[e]={get(){let t,r=Ze(this),n=j(this,4);return"string"!=typeof n&&(t=G(this,["href"]),F(this,4,t),n=new URL(t)[e]),Te(r,n)[e]},set(t){let r=Ze(this),n=j(this,4),i=Te(r,n);i[e]=new URL(t+"",i.href),F(this,4,i.href),X(this,["href"],i.href)}}})),k(e,t)},Fe=e=>{const t={contentDocument:{get(){return _e(this).n}},contentWindow:{get(){return _e(this).R}},src:{get(){let e=_e(this).C.href;return e.startsWith("about:")?"":e},set(e){if(!e.startsWith("about:")){let t,r=new XMLHttpRequest,n=_e(this);n.C.href=e=Ee(Ze(this),e),n.y=1,F(this,1,void 0),r.open("GET",e,!1),r.send(),t=r.status,t>199&&t<300?(X(this,["srcdoc"],`<base href="${e}">`+r.responseText.replace(/<script>/g,\'<script type="text/partytown">\').replace(/<script /g,\'<script type="text/partytown" \').replace(/text\\/javascript/g,W)+Ne()),z(!0),h.I([5,n.S])):(F(this,1,t),n.y=0)}}},...Le};k(e,t)},_e=e=>{const n=e[r];return m[n]||qe({S:n,H:e[t],Q:G(e,["src"])||"about:blank"},!0),m[n]},Ve=e=>{const t=(e,t)=>{const{a:r,b:n,c:i,d:s,e:o,f:a}=q(e,[t],R);return new DOMMatrixReadOnly([r,n,i,s,o,a])},r={...e,getCTM:{value:function(){return t(this,"getCTM")}},getScreenCTM:{value:function(){return t(this,"getScreenCTM")}}};k(e,r)},ze=(a,$,c,l)=>{const u=class{constructor(e,a,$,c,l){this[t]=e,this[r]=a,this[s]=$||[],this[n]=c,this[o]={},l&&(this[i]=l)}},d=new(D(class extends URL{assign(){}reload(){}replace(){}},"Location"))(c),f=d.origin===h.G,w=D(class extends u{constructor(){super(a,"0");let n,i,o=this,c=0,M=()=>{c||((h.u||(e.g=[G,X,q,Z,k,P,t,r,s],h.t(v("partytown-media.js?v="+Ie)),h.u=e.f,delete e.f),h.u)(u,b,m[a],o,De),c=1)},T={},E=(e,t,r)=>(He.includes(e)&&M(),new(T[e]?T[e]:e.includes("-")?T.UNKNOWN:T.DIV)(a,t,R,e,r));var N;o.Window=w,We(o,u),fe(o,u,"CSSStyleDeclaration"),((e,t,r)=>{e[r]=D(class extends t{now(){return performance.now()}},r)})(o,u,"Performance"),h.v.map((([e,n,i,$,c])=>{const l=Xe[e]?I:"EventTarget"===n?b:"Object"===n?u:o[n],d=o[e]=D(12===$?class extends u{constructor(...t){super(a,P()),Z(this,e,t)}}:o[e]||class extends l{},e);c&&(T[c]=d),i.map((([e,n,i])=>{e in d.prototype||e in l.prototype||("string"==typeof n?O(d,e,{get(){if(!U(this,e)){const i=this[t],a=this[r],$=[...this[s],e],c=o[n];c&&F(this,e,new c(i,a,$))}return j(this,e)},set(t){F(this,e,t)}}):5===n?B(d,e,(function(...t){return q(this,[e],t)})):n>0&&(void 0!==i?B(d,e,i):O(d,e,{get(){return G(this,[e])},set(t){return X(this,[e],t)}})))}))})),y("atob,btoa,crypto,indexedDB,setTimeout,setInterval,clearTimeout,clearInterval").map((t=>{delete w.prototype[t],t in o||(n=e[t],null!=n&&(o[t]="function"!=typeof n||n.toString().startsWith("class")?n:n.bind(e)))})),Object.getOwnPropertyNames(e).map((t=>{t in o||(o[t]=e[t])})),De.map((e=>H(o,e,{get:()=>(M(),o[e])}))),"trustedTypes"in e&&(o.trustedTypes=e.trustedTypes),Ue(o.Element),Oe(o.Document,f),N=o.DocumentFragment,K(N,11),Q(N,S),je(o.HTMLAnchorElement),Fe(o.HTMLIFrameElement),Ce(o.HTMLScriptElement),Ve(o.SVGGraphicsElement),ke(o.HTMLHeadElement),ke(o.HTMLBodyElement),Be(o.HTMLHtmlElement),we(o,"CSSStyleSheet"),K(o.Comment,8),K(o.DocumentType,10),m[a]={S:a,H:$,R:new Proxy(o,{has:()=>!0}),n:E("#document","1"),o:E("HTML","2"),s:E("HEAD","3"),e:E("BODY","4"),C:d,k:E},o.requestAnimationFrame=e=>setTimeout((()=>e(performance.now())),9),o.cancelAnimationFrame=e=>clearTimeout(e),o.requestIdleCallback=(e,t)=>(t=Date.now(),setTimeout((()=>e({didTimeout:!1,timeRemaining:()=>Math.max(0,50-(Date.now()-t))})),1)),o.cancelIdleCallback=e=>clearTimeout(e),pe(o,"localStorage",p,f),pe(o,"sessionStorage",g,f),f||(o.indexeddb=void 0),l&&(i={},o.history={pushState(e){i=e},replaceState(e){i=e},get state(){return i},length:0}),o.Worker=void 0}addEventListener(...e){"load"===e[0]?Ze(this).L&&setTimeout((()=>e[1]({type:"load"}))):q(this,["addEventListener"],e,2)}get body(){return Ze(this).e}get document(){return Ze(this).n}get documentElement(){return Ze(this).o}fetch(e,t){return e="string"==typeof e||e instanceof URL?String(e):e.url,fetch(Ee(Ze(this),e),t)}get frameElement(){const e=Ze(this),t=e.H,r=e.S;return r===t?null:Y(t,r,"IFRAME")}get globalThis(){return this}get head(){return Ze(this).s}get location(){return d}set location(e){d.href=e+""}get Image(){return xe(Ze(this))}get name(){return name+this[t]}get navigator(){return(e=>{let t,r={sendBeacon:(t,r)=>{try{return fetch(Ee(e,t,!0),{method:"POST",body:r,mode:"no-cors",keepalive:!0}),!0}catch(e){return console.error(e),!1}}};for(t in navigator)r[t]=navigator[t];return r})(Ze(this))}get origin(){return d.origin}set origin(e){}get parent(){return Ge(m[Ze(this).H].R,this[t])}postMessage(...e){q(this,["postMessage"],e,3)}get self(){return this}get top(){for(let e in m)if(m[e].S===m[e].H)return Ge(m[e].R,this[t])}get window(){return this}get XMLHttpRequest(){const e=Ze(this),t=XMLHttpRequest,r=String(t),n=D(class extends t{open(...t){t[1]=Ee(e,t[1]),super.open(...t)}set withCredentials(e){}toString(){return r}},C(t));return n.prototype.constructor.toString=()=>r,n}},"Window"),I=class extends u{constructor(e,t,r,n){return super(e,t,r,n),new Proxy(this,{get:(e,t)=>G(e,[t]),set:(e,t,r)=>(X(e,[t],r),!0)})}},b=class extends u{};E.map((e=>b.prototype[e]=function(...t){return q(this,[e],t,2)})),te(w,"devicePixelRatio"),re(w),ne(w,["getComputedStyle"]),new w},Ge=(e,t)=>new Proxy(e,{get:(e,r)=>"postMessage"===r?(...r)=>{A(d)>20&&d.splice(0,5),d.push({m:JSON.stringify(r[0]),S:t}),e.postMessage(...r)}:e[r]}),Xe={DOMStringMap:1,NamedNodeMap:1},qe=({S:e,H:t,Q:r},n)=>(m[e]||ze(e,t,r,n),h.I([5,e]),m[e]),Ze=e=>m[e[t]],Je=e=>Ze(e).R,Ye=[],Ke=t=>{const r=t.data,n=r[0],i=r[1];h.x?5===n?(async e=>{let t,r=e.S,n=e.w,i=Y(r,n,"SCRIPT"),s=e.j,o=e.Q,a=e.F,$="",c=m[r];if(o)try{o=Te(c,o)+"",F(i,4,o),t=await fetch(o),t.ok?(s=await t.text(),c.l=n,be(c,s,a||o),Me(i,"load")):($=t.statusText,Me(i,"error"))}catch(e){console.error(e),$=String(e.stack||e),Me(i,"error")}else s&&($=Se(c,n,s,0,$));c.l="",h.I([4,r,n,$])})(i):7===n?(({S:e,w:t,J:r,P:n,b:i})=>{if(l[r])try{l[r].apply($e(e,t,[],n),$e(e,t,[],i))}catch(e){console.error(e)}})(i):8===n?(({S:e,q:t,b:r})=>{try{let n=m[e].R,i=0,s=A(t);for(;i<s;i++)i+1<s?n=n[t[i]]:n[t[i]].apply(n,$e(null,"0",[],r))}catch(e){console.error(e)}})(i):3===n?qe(i):6===n?(m[i].x=1,m[i].y=0):11===n&&(m[r[1]].C.href=r[2]):1===n?((t=>{const r=h.i=JSON.parse(t.i),n=t.G;h.t=importScripts.bind(e),h.v=t.v,h.A=t.A,h.G=n,h.I=postMessage.bind(e),h.N=t.N,p.set(n,t.B),g.set(n,t.M),e.importScripts=void 0,delete e.postMessage,delete e.WorkerGlobalScope,y("resolveUrl,get,set,apply").map((e=>{r[e]&&(r[e]=new Function("return "+r[e])())})),h.x=1})(r[1]),h.I([2]),[...Ye].map(Ke),Ye.length=0):Ye.push(t)};e.onmessage=Ke,postMessage([0])})(self);\n'],{type:"text/javascript"})),{name:"Partytown 🎉"}),F.onmessage=t=>{const r=t.data;10===r[0]?C(F,r[1]):e(F,r)},w.addEventListener("pt1",(e=>O(F,g(e.detail.frameElement),e.detail))))}))})(window);
