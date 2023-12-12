(function(L,R){typeof exports=="object"&&typeof module<"u"?R(exports):typeof define=="function"&&define.amd?define(["exports"],R):(L=typeof globalThis<"u"?globalThis:L||self,R(L.Datastar={}))})(this,function(L){"use strict";function R(t){return t instanceof HTMLElement||t instanceof SVGElement?t:null}function K(){throw new Error("Cycle detected")}function Qe(){throw new Error("Computed cannot have side-effects")}const et=Symbol.for("preact-signals"),T=1,H=2,F=4,D=8,U=16,M=32;function z(){V++}function Z(){if(V>1){V--;return}let t,e=!1;for(;B!==void 0;){let n=B;for(B=void 0,oe++;n!==void 0;){const r=n._nextBatchedEffect;if(n._nextBatchedEffect=void 0,n._flags&=~H,!(n._flags&D)&&_e(n))try{n._callback()}catch(s){e||(t=s,e=!0)}n=r}}if(oe=0,V--,e)throw t}function tt(t){if(V>0)return t();z();try{return t()}finally{Z()}}let p,B,V=0,oe=0,X=0;function ve(t){if(p===void 0)return;let e=t._node;if(e===void 0||e._target!==p)return e={_version:0,_source:t,_prevSource:p._sources,_nextSource:void 0,_target:p,_prevTarget:void 0,_nextTarget:void 0,_rollbackNode:e},p._sources!==void 0&&(p._sources._nextSource=e),p._sources=e,t._node=e,p._flags&M&&t._subscribe(e),e;if(e._version===-1)return e._version=0,e._nextSource!==void 0&&(e._nextSource._prevSource=e._prevSource,e._prevSource!==void 0&&(e._prevSource._nextSource=e._nextSource),e._prevSource=p._sources,e._nextSource=void 0,p._sources._nextSource=e,p._sources=e),e}function g(t){this._value=t,this._version=0,this._node=void 0,this._targets=void 0}g.prototype.brand=et,g.prototype._refresh=function(){return!0},g.prototype._subscribe=function(t){this._targets!==t&&t._prevTarget===void 0&&(t._nextTarget=this._targets,this._targets!==void 0&&(this._targets._prevTarget=t),this._targets=t)},g.prototype._unsubscribe=function(t){if(this._targets!==void 0){const e=t._prevTarget,n=t._nextTarget;e!==void 0&&(e._nextTarget=n,t._prevTarget=void 0),n!==void 0&&(n._prevTarget=e,t._nextTarget=void 0),t===this._targets&&(this._targets=n)}},g.prototype.subscribe=function(t){const e=this;return ae(function(){const n=e.value,r=this._flags&M;this._flags&=~M;try{t(n)}finally{this._flags|=r}})},g.prototype.valueOf=function(){return this.value},g.prototype.toString=function(){return this.value+""},g.prototype.toJSON=function(){return this.value},g.prototype.peek=function(){return this._value},Object.defineProperty(g.prototype,"value",{get(){const t=ve(this);return t!==void 0&&(t._version=this._version),this._value},set(t){if(p instanceof N&&Qe(),t!==this._value){oe>100&&K(),this._value=t,this._version++,X++,z();try{for(let e=this._targets;e!==void 0;e=e._nextTarget)e._target._notify()}finally{Z()}}}});function ye(t){return new g(t)}function _e(t){for(let e=t._sources;e!==void 0;e=e._nextSource)if(e._source._version!==e._version||!e._source._refresh()||e._source._version!==e._version)return!0;return!1}function we(t){for(let e=t._sources;e!==void 0;e=e._nextSource){const n=e._source._node;if(n!==void 0&&(e._rollbackNode=n),e._source._node=e,e._version=-1,e._nextSource===void 0){t._sources=e;break}}}function be(t){let e=t._sources,n;for(;e!==void 0;){const r=e._prevSource;e._version===-1?(e._source._unsubscribe(e),r!==void 0&&(r._nextSource=e._nextSource),e._nextSource!==void 0&&(e._nextSource._prevSource=r)):n=e,e._source._node=e._rollbackNode,e._rollbackNode!==void 0&&(e._rollbackNode=void 0),e=r}t._sources=n}function N(t){g.call(this,void 0),this._compute=t,this._sources=void 0,this._globalVersion=X-1,this._flags=F}N.prototype=new g,N.prototype._refresh=function(){if(this._flags&=~H,this._flags&T)return!1;if((this._flags&(F|M))===M||(this._flags&=~F,this._globalVersion===X))return!0;if(this._globalVersion=X,this._flags|=T,this._version>0&&!_e(this))return this._flags&=~T,!0;const t=p;try{we(this),p=this;const e=this._compute();(this._flags&U||this._value!==e||this._version===0)&&(this._value=e,this._flags&=~U,this._version++)}catch(e){this._value=e,this._flags|=U,this._version++}return p=t,be(this),this._flags&=~T,!0},N.prototype._subscribe=function(t){if(this._targets===void 0){this._flags|=F|M;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._subscribe(e)}g.prototype._subscribe.call(this,t)},N.prototype._unsubscribe=function(t){if(this._targets!==void 0&&(g.prototype._unsubscribe.call(this,t),this._targets===void 0)){this._flags&=~M;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e)}},N.prototype._notify=function(){if(!(this._flags&H)){this._flags|=F|H;for(let t=this._targets;t!==void 0;t=t._nextTarget)t._target._notify()}},N.prototype.peek=function(){if(this._refresh()||K(),this._flags&U)throw this._value;return this._value},Object.defineProperty(N.prototype,"value",{get(){this._flags&T&&K();const t=ve(this);if(this._refresh(),t!==void 0&&(t._version=this._version),this._flags&U)throw this._value;return this._value}});function nt(t){return new N(t)}function Ee(t){const e=t._cleanup;if(t._cleanup=void 0,typeof e=="function"){z();const n=p;p=void 0;try{e()}catch(r){throw t._flags&=~T,t._flags|=D,ie(t),r}finally{p=n,Z()}}}function ie(t){for(let e=t._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e);t._compute=void 0,t._sources=void 0,Ee(t)}function rt(t){if(p!==this)throw new Error("Out-of-order effect");be(this),p=t,this._flags&=~T,this._flags&D&&ie(this),Z()}function j(t){this._compute=t,this._cleanup=void 0,this._sources=void 0,this._nextBatchedEffect=void 0,this._flags=M}j.prototype._callback=function(){const t=this._start();try{if(this._flags&D||this._compute===void 0)return;const e=this._compute();typeof e=="function"&&(this._cleanup=e)}finally{t()}},j.prototype._start=function(){this._flags&T&&K(),this._flags|=T,this._flags&=~D,Ee(this),we(this),z();const t=p;return p=this,rt.bind(this,t)},j.prototype._notify=function(){this._flags&H||(this._flags|=H,this._nextBatchedEffect=B,B=this)},j.prototype._dispose=function(){this._flags|=D,this._flags&T||ie(this)};function ae(t){const e=new j(t);try{e._callback()}catch(n){throw e._dispose(),n}return e._dispose.bind(e)}class Se{get value(){return ce(this)}set value(e){tt(()=>st(this,e))}peek(){return ce(this,{peek:!0})}}const le=t=>Object.assign(new Se,Object.entries(t).reduce((e,[n,r])=>{if(["value","peek"].some(s=>s===n))throw new Error(`${n} is a reserved property name`);return typeof r!="object"||r===null||Array.isArray(r)?e[n]=ye(r):e[n]=le(r),e},{})),st=(t,e)=>Object.keys(e).forEach(n=>t[n].value=e[n]),ce=(t,{peek:e=!1}={})=>Object.entries(t).reduce((n,[r,s])=>(s instanceof g?n[r]=e?s.peek():s.value:s instanceof Se&&(n[r]=ce(s,{peek:e})),n),{}),ot=/([\[:])?"(\d+)n"([,\}\]])/g,it=/([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;function ue(t,e=2){return JSON.stringify(t,(r,s)=>typeof s=="bigint"?s.toString():s,e).replace(ot,"$1$2$3")}function Te(t){const e=t.replace(it,'$1"$2n"$3');return JSON.parse(e,(n,r)=>{if(typeof r=="string"&&r.match(/^\d+n$/))return BigInt(r.substring(0,r.length-1));if(typeof r=="number"&&!Number.isSafeInteger(r)){const o=BigInt(r);return console.log(`Converted ${r} to ${o}`),o}return r})}function Ae(t,e){if(typeof e!="object"||Array.isArray(e)||!e)return Te(ue(e));if(typeof e=="object"&&e.toJSON!==void 0&&typeof e.toJSON=="function")return e.toJSON();let n=t;return typeof t!="object"&&(n={...e}),Object.keys(e).forEach(r=>{n.hasOwnProperty(r)||(n[r]=e[r]),e[r]===null?delete n[r]:n[r]=Ae(n[r],e[r])}),n}const at="[a-zA-Z_$][0-9a-zA-Z_$.]*";function fe(t,e,n){return new RegExp(`(?<whole>\\${t}(?<${e}>${at})${n})`,"g")}const lt={regexp:fe("$","signal",""),replacer:t=>{const{signal:e}=t;return`ctx.store.${e}.value`}},ct={regexp:fe("$\\$","action","(?<call>\\((?<args>.*)\\))?"),replacer:({action:t,args:e})=>{const n=["ctx"];e&&n.push(...e.split(",").map(s=>s.trim()));const r=n.join(",");return`ctx.actions.${t}(${r})`}},ut={regexp:fe("~","ref",""),replacer({ref:t}){return`data.refs.${t}`}},ft=[ct,lt,ut],dt=[{prefix:"mergeStore",preprocessors:{pre:[{regexp:/(?<whole>.+)/g,replacer:t=>{const{whole:e}=t;return`ctx.JSONParse('${e.replace(/'/g,"\\'")}')`}}]},onLoad:t=>{const e=t.expressionFn(t);t.mergeStore(e)}},{prefix:"ref",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,bypassExpressionFunctionCreation:()=>!0,onLoad:t=>{const{el:e,expression:n}=t;return t.refs[n]=e,()=>delete t.refs[n]}}];class Le{plugins=[];store=le({});actions={};refs={};reactivity={signal:ye,computed:nt,effect:ae};parentID="";missingIDNext=0;removals=new Map;constructor(e={},...n){if(this.actions=Object.assign(this.actions,e),n=[...dt,...n],!n.length)throw new Error("no plugins");const r=new Set;for(const s of n){if(s.requiredPluginPrefixes){for(const o of s.requiredPluginPrefixes)if(!r.has(o))throw new Error(`${s.prefix} requires ${o}`)}this.plugins.push(s),r.add(s.prefix)}}run(){this.plugins.forEach(e=>{e.onGlobalInit&&e.onGlobalInit({actions:this.actions,refs:this.refs,reactivity:this.reactivity,mergeStore:this.mergeStore.bind(this),store:this.store})}),this.applyPlugins(document.body)}JSONStringify(e){return ue(e)}JSONParse(e){return Te(e)}cleanupElementRemovals(e){const n=this.removals.get(e);if(n){for(const r of n)r();this.removals.delete(e)}}mergeStore(e){const n=Ae(this.store.value,e);this.store=le(n)}signalByName(e){return this.store[e]}applyPlugins(e){const n=new Set;this.plugins.forEach((r,s)=>{this.walkDownDOM(e,o=>{s===0&&this.cleanupElementRemovals(o);for(const i in o.dataset){let a=o.dataset[i]||"";if(!i.startsWith(r.prefix))continue;if(o.id.length===0&&(o.id=`ds-${this.parentID}-${this.missingIDNext++}`),n.clear(),r.allowedTagRegexps){const d=o.tagName.toLowerCase();if(![...r.allowedTagRegexps].some(v=>d.match(v)))throw new Error(`'${o.tagName}' not allowed for '${i}', allowed ${[[...r.allowedTagRegexps].map(v=>`'${v}'`)].join(", ")}`)}let u=i.slice(r.prefix.length),[f,...c]=u.split(".");if(r.mustHaveEmptyKey&&f.length>0)throw new Error(`'${i}' must have empty key`);if(r.mustNotEmptyKey&&f.length===0)throw new Error(`'${i}' must have non-empty key`);f.length&&(f=f[0].toLowerCase()+f.slice(1));const l=c.map(d=>{const[w,...v]=d.split("_");return{label:w,args:v}});if(r.allowedModifiers){for(const d of l)if(!r.allowedModifiers.has(d.label))throw new Error(`'${d.label}' is not allowed`)}const y=new Map;for(const d of l)y.set(d.label,d.args);if(r.mustHaveEmptyExpression&&a.length)throw new Error(`'${i}' must have empty expression`);if(r.mustNotEmptyExpression&&!a.length)throw new Error(`'${i}' must have non-empty expression`);const b=[...r.preprocessors?.pre||[],...ft,...r.preprocessors?.post||[]];for(const d of b){if(n.has(d))continue;n.add(d);const w=[...a.matchAll(d.regexp)];if(w.length)for(const v of w){if(!v.groups)continue;const{groups:O}=v,{whole:I}=O;a=a.replace(I,d.replacer(O))}}const{store:E,reactivity:P,actions:_,refs:h}=this,m={store:E,mergeStore:this.mergeStore.bind(this),applyPlugins:this.applyPlugins.bind(this),cleanupElementRemovals:this.cleanupElementRemovals.bind(this),walkSignals:this.walkSignals.bind(this),actions:_,refs:h,reactivity:P,el:o,key:f,expression:a,expressionFn:()=>{throw new Error("Expression function not created")},JSONParse:this.JSONParse,JSONStringify:this.JSONStringify,modifiers:y};if(!r.bypassExpressionFunctionCreation?.(m)&&!r.mustHaveEmptyExpression&&a.length){const d=a.split(";");d[d.length-1]=`return ${d[d.length-1]}`;const w=`
try {
  ${d.join(";")}
} catch (e) {
  throw new Error(\`Eval '${a}' on ${o.id?`#${o.id}`:o.tagName}\`)
}
            `;try{const v=new Function("ctx",w);m.expressionFn=v}catch(v){console.error(v);return}}const S=r.onLoad(m);S&&(this.removals.has(o)||this.removals.set(o,new Set),this.removals.get(o).add(S))}})})}walkSignalsStore(e,n){const r=Object.keys(e);for(let s=0;s<r.length;s++){const o=r[s],i=e[o],a=i instanceof g,u=typeof i=="object"&&Object.keys(i).length>0;if(a){n(o,i);continue}u&&this.walkSignalsStore(i,n)}}walkSignals(e){this.walkSignalsStore(this.store,e)}walkDownDOM(e,n,r=0){if(!e)return;const s=R(e);if(s)for(n(s),r=0,e=e.firstElementChild;e;)this.walkDownDOM(e,n,r++),e=e.nextElementSibling}}const pt=t=>t.replace(/[A-Z]+(?![a-z])|[A-Z]/g,(e,n)=>(n?"-":"")+e.toLowerCase()),ht={prefix:"bind",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>t.reactivity.effect(()=>{const e=pt(t.key),r=`${t.expressionFn(t)}`;!r||r==="false"||r==="null"||r==="undefined"?t.el.removeAttribute(e):t.el.setAttribute(e,r)})},mt=/^data:(?<mime>[^;]+);base64,(?<contents>.*)$/,Y=["change","input","keydown"],gt=[ht,{prefix:"model",mustHaveEmptyKey:!0,preprocessors:{post:[{regexp:/(?<whole>.+)/g,replacer:t=>{const{whole:e}=t;return`ctx.store.${e}`}}]},allowedTagRegexps:new Set(["input","textarea","select","checkbox","radio"]),onLoad:t=>{const{store:e,el:n,expression:r}=t,s=t.expressionFn(t),o=n.tagName.toLowerCase().includes("input"),i=n.tagName.toLowerCase().includes("select"),a=n.tagName.toLowerCase().includes("textarea"),u=n.tagName.toLowerCase().includes("radio"),f=n.getAttribute("type"),c=o&&f==="checkbox",l=o&&f==="file";if(!o&&!i&&!a&&!c&&!u)throw new Error("Element must be input, select, textarea, checkbox or radio");const y=()=>{if(!s)throw new Error(`Signal ${r} not found`);const h=s.value;if(o){const m=n;c?m.checked=h:l||(m.value=`${h}`)}else"value"in n?n.value=`${h}`:n.setAttribute("value",`${h}`)},b=t.reactivity.effect(y),E=()=>{const h=n.value;if(!(typeof h>"u"))if(l){const[m]=n?.files||[];if(!m){s.value="";return}const S=new FileReader;S.onload=()=>{if(typeof S.result!="string")throw new Error("Unsupported type");const w=S.result.match(mt);if(!w?.groups)throw new Error("Invalid data URI");const{mime:v,contents:O}=w.groups;s.value=O;const I=`${r}Mime`;if(I in e){const q=e[`${I}`];q.value=v}},S.readAsDataURL(m);const d=`${r}Name`;if(d in e){const w=e[`${d}`];w.value=m.name}return}else{const m=s.value;if(typeof m=="number")s.value=Number(h);else if(typeof m=="string")s.value=h;else if(typeof m=="boolean")if(c){const{checked:S}=n;s.value=S}else s.value=!!h;else if(!(typeof m>"u"))if(typeof m=="bigint")s.value=BigInt(h);else throw console.log(typeof m),new Error("Unsupported type")}},P=n.tagName.split("-");if(P.length>1){const h=P[0].toLowerCase();Y.forEach(m=>{Y.push(`${h}-${m}`)})}return Y.forEach(h=>n.addEventListener(h,E)),()=>{b(),Y.forEach(h=>n.removeEventListener(h,E))}}},{prefix:"text",mustHaveEmptyKey:!0,onLoad:t=>{const{el:e,expressionFn:n}=t;if(!(e instanceof HTMLElement))throw new Error("Element is not HTMLElement");return t.reactivity.effect(()=>{const r=n(t);e.textContent=`${r}`})}},{prefix:"focus",mustHaveEmptyKey:!0,mustHaveEmptyExpression:!0,onLoad:t=>(t.el.tabIndex||t.el.setAttribute("tabindex","0"),t.el.focus(),t.el.scrollIntoView({block:"center",inline:"center"}),()=>t.el.blur())},{prefix:"on",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,allowedModifiers:new Set(["once","passive","capture","debounce","throttle"]),onLoad:t=>{const{el:e,key:n,expressionFn:r}=t;let s=()=>{r(t)};const o=t.modifiers.get("debounce");if(o){const f=Ne(o),c=Q(o,"leading",!1),l=Q(o,"noTrail",!0);s=vt(s,f,c,l)}const i=t.modifiers.get("throttle");if(i){const f=Ne(i),c=Q(i,"noLead",!0),l=Q(i,"noTrail",!0);s=yt(s,f,c,l)}const a={capture:!0,passive:!1,once:!1};if(t.modifiers.has("capture")||(a.capture=!1),t.modifiers.has("passive")&&(a.passive=!0),t.modifiers.has("once")&&(a.once=!0),n==="load")return s(),()=>{};const u=n.toLowerCase();return e.addEventListener(u,s,a),()=>{e.removeEventListener(u,s)}}}];function Ne(t){if(!t||t?.length===0)return 0;for(const e of t){if(e.endsWith("ms"))return Number(e.replace("ms",""));if(e.endsWith("s"))return Number(e.replace("s",""))*1e3;try{return parseFloat(e)}catch{}}return 0}function Q(t,e,n=!1){return t?t.includes(e)||n:!1}function vt(t,e,n=!1,r=!0){let s;const o=()=>s&&clearTimeout(s);return function(...a){o(),n&&!s&&t(...a),s=setTimeout(()=>{r&&t(...a),o()},e)}}function yt(t,e,n=!0,r=!1){let s=!1,o=null;return function(...a){s?o=a:(s=!0,n?t(...a):o=a,setTimeout(()=>{r&&o&&(t(...o),o=null),s=!1},e))}}const ee=new WeakSet;function _t(t,e,n={}){t instanceof Document&&(t=t.documentElement);let r;typeof e=="string"?r=Tt(e):r=e;const s=At(r),o=bt(t,s,n);return Pe(t,s,o)}function Pe(t,e,n){if(n.head.block){const r=t.querySelector("head"),s=e.querySelector("head");if(r&&s){const o=ke(s,r,n);Promise.all(o).then(()=>{Pe(t,e,Object.assign(n,{head:{block:!1,ignore:!0}}))});return}}if(n.morphStyle==="innerHTML")return Me(e,t,n),t.children;if(n.morphStyle==="outerHTML"||n.morphStyle==null){const r=Nt(e,t,n);if(!r)throw new Error("Could not find best match");const s=r?.previousSibling,o=r?.nextSibling,i=te(t,r,n);return r?Lt(s,i,o):[]}else throw"Do not understand how to morph style "+n.morphStyle}function te(t,e,n){if(!(n.ignoreActive&&t===document.activeElement))if(e==null){if(n.callbacks.beforeNodeRemoved(t)===!1)return;t.remove(),n.callbacks.afterNodeRemoved(t);return}else{if(re(t,e))return n.callbacks.beforeNodeMorphed(t,e)===!1?void 0:(t instanceof HTMLHeadElement&&n.head.ignore||(e instanceof HTMLHeadElement&&t instanceof HTMLHeadElement&&n.head.style!=="morph"?ke(e,t,n):(wt(e,t),Me(e,t,n))),n.callbacks.afterNodeMorphed(t,e),t);if(n.callbacks.beforeNodeRemoved(t)===!1||n.callbacks.beforeNodeAdded(e)===!1)return;if(!t.parentElement)throw new Error("oldNode has no parentElement");return t.parentElement.replaceChild(e,t),n.callbacks.afterNodeAdded(e),n.callbacks.afterNodeRemoved(t),e}}function Me(t,e,n){let r=t.firstChild,s=e.firstChild,o;for(;r;){if(o=r,r=o.nextSibling,s==null){if(n.callbacks.beforeNodeAdded(o)===!1)return;e.appendChild(o),n.callbacks.afterNodeAdded(o),C(n,o);continue}if($e(o,s,n)){te(s,o,n),s=s.nextSibling,C(n,o);continue}let i=Et(t,e,o,s,n);if(i){s=Re(s,i,n),te(i,o,n),C(n,o);continue}let a=St(t,o,s,n);if(a){s=Re(s,a,n),te(a,o,n),C(n,o);continue}if(n.callbacks.beforeNodeAdded(o)===!1)return;e.insertBefore(o,s),n.callbacks.afterNodeAdded(o),C(n,o)}for(;s!==null;){let i=s;s=s.nextSibling,Oe(i,n)}}function wt(t,e){let n=t.nodeType;if(n===1){for(const r of t.attributes)e.getAttribute(r.name)!==r.value&&e.setAttribute(r.name,r.value);for(const r of e.attributes)t.hasAttribute(r.name)||e.removeAttribute(r.name)}if((n===Node.COMMENT_NODE||n===Node.TEXT_NODE)&&e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue),t instanceof HTMLInputElement&&e instanceof HTMLInputElement&&t.type!=="file")e.value=t.value||"",ne(t,e,"value"),ne(t,e,"checked"),ne(t,e,"disabled");else if(t instanceof HTMLOptionElement)ne(t,e,"selected");else if(t instanceof HTMLTextAreaElement&&e instanceof HTMLTextAreaElement){const r=t.value,s=e.value;r!==s&&(e.value=r),e.firstChild&&e.firstChild.nodeValue!==r&&(e.firstChild.nodeValue=r)}}function ne(t,e,n){const r=t.getAttribute(n),s=e.getAttribute(n);r!==s&&(r?e.setAttribute(n,r):e.removeAttribute(n))}function ke(t,e,n){const r=[],s=[],o=[],i=[],a=n.head.style,u=new Map;for(const c of t.children)u.set(c.outerHTML,c);for(const c of e.children){let l=u.has(c.outerHTML),y=n.head.shouldReAppend(c),b=n.head.shouldPreserve(c);l||b?y?s.push(c):(u.delete(c.outerHTML),o.push(c)):a==="append"?y&&(s.push(c),i.push(c)):n.head.shouldRemove(c)!==!1&&s.push(c)}i.push(...u.values()),console.log("to append: ",i);const f=[];for(const c of i){console.log("adding: ",c);const l=document.createRange().createContextualFragment(c.outerHTML).firstChild;if(!l)throw new Error("could not create new element from: "+c.outerHTML);if(console.log(l),n.callbacks.beforeNodeAdded(l)){if(l.hasAttribute("href")||l.hasAttribute("src")){let y;const b=new Promise(E=>{y=E});l.addEventListener("load",function(){y(void 0)}),f.push(b)}e.appendChild(l),n.callbacks.afterNodeAdded(l),r.push(l)}}for(const c of s)n.callbacks.beforeNodeRemoved(c)!==!1&&(e.removeChild(c),n.callbacks.afterNodeRemoved(c));return n.head.afterHeadMorphed(e,{added:r,kept:o,removed:s}),f}function k(){}function bt(t,e,n){return{target:t,newContent:e,config:n,morphStyle:n.morphStyle,ignoreActive:n.ignoreActive,idMap:$t(t,e),deadIds:new Set,callbacks:Object.assign({beforeNodeAdded:k,afterNodeAdded:k,beforeNodeMorphed:k,afterNodeMorphed:k,beforeNodeRemoved:k,afterNodeRemoved:k},n.callbacks),head:Object.assign({style:"merge",shouldPreserve:r=>r.getAttribute("im-preserve")==="true",shouldReAppend:r=>r.getAttribute("im-re-append")==="true",shouldRemove:k,afterHeadMorphed:k},n.head)}}function $e(t,e,n){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName?t?.id?.length&&t.id===e.id?!0:J(n,t,e)>0:!1}function re(t,e){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName}function Re(t,e,n){for(;t!==e;){const r=t;if(t=t?.nextSibling,!r)throw new Error("tempNode is null");Oe(r,n)}return C(n,e),e.nextSibling}function Et(t,e,n,r,s){const o=J(s,n,e);let i=null;if(o>0){i=r;let a=0;for(;i!=null;){if($e(n,i,s))return i;if(a+=J(s,i,t),a>o)return null;i=i.nextSibling}}return i}function St(t,e,n,r){let s=n,o=e.nextSibling,i=0;for(;s&&o;){if(J(r,s,t)>0)return null;if(re(e,s))return s;if(re(o,s)&&(i++,o=o.nextSibling,i>=2))return null;s=s.nextSibling}return s}const Ce=new DOMParser;function Tt(t){const e=t.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,"");if(e.match(/<\/html>/)||e.match(/<\/head>/)||e.match(/<\/body>/)){const n=Ce.parseFromString(t,"text/html");if(e.match(/<\/html>/))return ee.add(n),n;{let r=n.firstChild;return r?(ee.add(r),r):null}}else{const r=Ce.parseFromString(`<body><template>${t}</template></body>`,"text/html").body.querySelector("template")?.content;if(!r)throw new Error("content is null");return ee.add(r),r}}function At(t){if(t==null)return document.createElement("div");if(ee.has(t))return t;if(t instanceof Node){const e=document.createElement("div");return e.append(t),e}else{const e=document.createElement("div");for(const n of[...t])e.append(n);return e}}function Lt(t,e,n){const r=[],s=[];for(;t;)r.push(t),t=t.previousSibling;for(;r.length>0;){const o=r.pop();s.push(o),e?.parentElement?.insertBefore(o,e)}for(s.push(e);n;)r.push(n),s.push(n),n=n.nextSibling;for(;r.length;)e?.parentElement?.insertBefore(r.pop(),e.nextSibling);return s}function Nt(t,e,n){let r=t.firstChild,s=r,o=0;for(;r;){let i=Pt(r,e,n);i>o&&(s=r,o=i),r=r.nextSibling}return s}function Pt(t,e,n){return re(t,e)?.5+J(n,t,e):0}function Oe(t,e){C(e,t),e.callbacks.beforeNodeRemoved(t)!==!1&&(t.remove(),e.callbacks.afterNodeRemoved(t))}function Mt(t,e){return!t.deadIds.has(e)}function kt(t,e,n){return t.idMap.get(n)?.has(e)||!1}function C(t,e){const n=t.idMap.get(e);if(n)for(const r of n)t.deadIds.add(r)}function J(t,e,n){const r=t.idMap.get(e);if(!r)return 0;let s=0;for(const o of r)Mt(t,o)&&kt(t,o,n)&&++s;return s}function Ie(t,e){const n=t.parentElement,r=t.querySelectorAll("[id]");for(const s of r){let o=s;for(;o!==n&&o;){let i=e.get(o);i==null&&(i=new Set,e.set(o,i)),i.add(s.id),o=o.parentElement}}}function $t(t,e){const n=new Map;return Ie(t,n),Ie(e,n),n}const Rt=["get","post","put","patch","delete"].reduce((t,e)=>(t[e]=async n=>{const r=Document;if(!r.startViewTransition){await De(e,n);return}return new Promise(s=>{r.startViewTransition(async()=>{await De(e,n),s()})})},t),{}),Ct="Accept",Ot="Content-Type",It="datastar-request",Ht="application/json",Dt="text/event-stream",xt="true",G="datastar-",W=`${G}indicator`,de=`${W}-loading`,He=`${G}settling`,se=`${G}swapping`,Ft="self",A={MorphElement:"morph_element",InnerElement:"inner_element",OuterElement:"outer_element",PrependElement:"prepend_element",AppendElement:"append_element",BeforeElement:"before_element",AfterElement:"after_element",DeleteElement:"delete_element",UpsertAttributes:"upsert_attributes"},Ut=[{prefix:"header",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>{const e=t.store.fetch.headers,n=t.key[0].toUpperCase()+t.key.slice(1);return e[n]=t.reactivity.computed(()=>t.expressionFn(t)),()=>{delete e[n]}}},{prefix:"fetchUrl",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,onGlobalInit:({mergeStore:t})=>{t({fetch:{headers:{},elementURLs:{},indicatorSelectors:{}}})},onLoad:t=>t.reactivity.effect(()=>{const e=t.reactivity.computed(()=>`${t.expressionFn(t)}`);return t.store.fetch.elementURLs[t.el.id]=e,()=>{delete t.store.fetch.elementURLs[t.el.id]}})},{prefix:"fetchIndicator",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,onGlobalInit:()=>{const t=document.createElement("style");t.innerHTML=`
.${W}{
 opacity:0;
 transition: opacity 300ms ease-out;
}
.${de} {
 opacity:1;
 transition: opacity 300ms ease-in;
}
`,document.head.appendChild(t)},onLoad:t=>t.reactivity.effect(()=>{const e=t.reactivity.computed(()=>`${t.expressionFn(t)}`);t.store.fetch.indicatorSelectors[t.el.id]=e;const n=document.querySelector(e.value);if(!n)throw new Error(`No indicator found for ${e.value}`);return n.classList.add(W),()=>{delete t.store.fetch.indicatorSelectors[t.el.id]}})}],Bt=/(?<key>\w*): (?<value>.*)/gm;async function De(t,e){const{el:n,store:r}=e,s=r.fetch.elementURLs[n.id];if(!s)return;const o={...r};delete o.fetch;const i=ue(o);let a=n,u=!1;const f=r.fetch.indicatorSelectors[n.id];if(f){const _=document.querySelector(f);_&&(a=_,a.classList.remove(W),a.classList.add(de),u=!0)}const c=new URL(s.value,window.location.origin),l=new Headers;l.append(Ct,Dt),l.append(Ot,Ht),l.append(It,xt);const y=r.fetch.headers.value;if(y)for(const _ in y){const h=y[_];l.append(_,h)}t=t.toUpperCase();const b={method:t,headers:l};if(t==="GET"){const _=new URLSearchParams(c.search);_.append("datastar",i),c.search=_.toString()}else b.body=i;const E=await fetch(c,b);if(!E.ok)throw new Error(`Response was not ok, url: ${c}, status: ${E.status}`);if(!E.body)throw new Error("No response body");const P=E.body.pipeThrough(new TextDecoderStream).getReader();for(;;){const{done:_,value:h}=await P.read();if(_)break;h.split(`

`).forEach(m=>{const S=[...m.matchAll(Bt)];if(S.length){let d="",w="morph_element",v="",O=0,I=!1,q="",me,Ke=!1,ze=!1;for(const Ze of S){if(!Ze.groups)continue;const{key:Xt,value:$}=Ze.groups;switch(Xt){case"event":if(!$.startsWith(G))throw new Error(`Unknown event: ${$}`);switch($.slice(G.length)){case"redirect":I=!0;break;case"fragment":ze=!0;break;case"error":Ke=!0;break;default:throw new Error(`Unknown event: ${$}`)}break;case"data":const ge=$.indexOf(" ");if(ge===-1)throw new Error("Missing space in data");const Xe=$.slice(0,ge),x=$.slice(ge+1);switch(Xe){case"selector":v=x;break;case"merge":const Ye=x;if(!Object.values(A).includes(Ye))throw new Error(`Unknown merge option: ${$}`);w=Ye;break;case"settle":O=parseInt(x);break;case"fragment":case"html":d=x;break;case"redirect":q=x;break;case"error":me=new Error(x);break;default:throw new Error(`Unknown data type: ${Xe}`)}}}if(Ke&&me)throw me;if(I&&q)window.location.href=q;else if(ze&&d)Vt(e,v,w,d,O);else throw new Error(`Unknown event block: ${m}`)}})}u&&(a.classList.remove(de),a.classList.add(W))}const xe=document.createElement("template");function Vt(t,e,n,r,s){const{el:o}=t;xe.innerHTML=r;const i=xe.content.firstChild;if(!(i instanceof Element))throw new Error(`Fragment is not an element, source '${r}'`);const a=e===Ft;let u;if(a)u=[o];else{const f=e||`#${i.getAttribute("id")}`;if(u=document.querySelectorAll(f)||[],!u)throw new Error(`No target elements, selector: ${e}`)}for(const f of u){f.classList.add(se);const c=f.outerHTML;let l=f;switch(n){case A.MorphElement:const b=_t(l,i);if(!b?.length)throw new Error("Failed to morph element");l=b[0];break;case A.InnerElement:l.innerHTML=i.innerHTML;break;case A.OuterElement:l.replaceWith(i);break;case A.PrependElement:l.prepend(i);break;case A.AppendElement:l.append(i);break;case A.BeforeElement:l.before(i);break;case A.AfterElement:l.after(i);break;case A.DeleteElement:setTimeout(()=>l.remove(),s);break;case A.UpsertAttributes:i.getAttributeNames().forEach(P=>{const _=i.getAttribute(P);l.setAttribute(P,_)});break;default:throw new Error(`Unknown merge type: ${n}`)}l.classList.add(se),t.cleanupElementRemovals(f),t.applyPlugins(l),f.classList.remove(se),l.classList.remove(se);const y=l.outerHTML;c!==y&&(l.classList.add(He),setTimeout(()=>{l.classList.remove(He)},s))}}const jt={setAll:async(t,e,n)=>{const r=new RegExp(e);t.walkSignals((s,o)=>r.test(s)&&(o.value=n))},toggleAll:async(t,e)=>{const n=new RegExp(e);t.walkSignals((r,s)=>n.test(r)&&(s.value=!s.value))}},pe="display",Fe="none",he="important",Jt={prefix:"show",allowedModifiers:new Set([he]),onLoad:t=>{const{el:e,modifiers:n,expressionFn:r}=t;return ae(()=>{const o=!!r(t),a=n.has(he)?he:void 0;o?e.style.length===1&&e.style.display===Fe?e.style.removeProperty(pe):e.style.setProperty(pe,"",a):e.style.setProperty(pe,Fe,a)})}},Gt="intersects",Ue="once",Be="half",Ve="full",Wt={prefix:Gt,allowedModifiers:new Set([Ue,Be,Ve]),mustHaveEmptyKey:!0,onLoad:t=>{const{modifiers:e}=t,n={threshold:0};e.has(Ve)?n.threshold=1:e.has(Be)&&(n.threshold=.5);const r=new IntersectionObserver(s=>{s.forEach(o=>{o.isIntersecting&&(t.expressionFn(t),e.has(Ue)&&r.disconnect())})},n);return r.observe(t.el),()=>r.disconnect()}},je="prepend",Je="append",Ge=new Error("Target element must have a parent if using prepend or append"),qt={prefix:"teleport",allowedModifiers:new Set([je,Je]),allowedTagRegexps:new Set(["template"]),bypassExpressionFunctionCreation:()=>!0,onLoad:t=>{const{el:e,modifiers:n,expression:r}=t;if(!(e instanceof HTMLTemplateElement))throw new Error;const s=document.querySelector(r);if(!s)throw new Error(`Target element not found: ${r}`);if(!e.content)throw new Error("Template element must have content");const o=e.content.cloneNode(!0);if(R(o)?.firstElementChild)throw new Error("Empty template");if(n.has(je)){if(!s.parentNode)throw Ge;s.parentNode.insertBefore(o,s)}else if(n.has(Je)){if(!s.parentNode)throw Ge;s.parentNode.insertBefore(o,s.nextSibling)}else s.appendChild(o)}},Kt={prefix:"scrollIntoView",onLoad:t=>{const{el:e}=t;e.scrollIntoView({behavior:"smooth",block:"center",inline:"center"})}},We="ds-view-transition-stylesheet",zt=[Jt,Wt,qt,Kt,{prefix:"viewTransition",onGlobalInit(t){const e=document.createElement("style");e.id=We,document.head.appendChild(e);let n=!1;if(document.head.childNodes.forEach(r=>{r instanceof HTMLMetaElement&&r.name==="view-transition"&&(n=!0)}),!n){const r=document.createElement("meta");r.name="view-transition",r.content="same-origin",document.head.appendChild(r)}t.mergeStore({viewTransitionRefCounts:{}})},onLoad:t=>{const{el:e,expressionFn:n,store:r}=t;let s=n(t);if(!s){if(!e.id)throw new Error("Element must have an id if no name is provided");s=e.id}const o=document.getElementById(We);if(!o)throw new Error("View transition stylesheet not found");const i=`ds-vt-${s}`,a=`
.${i} {
  view-transition: ${s};
}

`;o.innerHTML+=a;let u=r.viewTransitionRefCounts[s];return u||(u=t.reactivity.signal(0),r.viewTransitionRefCounts[s]=u),u.value++,e.classList.add(i),()=>{u.value--,u.value===0&&(delete r.viewTransitionRefCounts[s],o.innerHTML=o.innerHTML.replace(a,""))}}}];function qe(t={},...e){const n=performance.now(),r=new Le(t,...e);r.run();const s=performance.now();return console.log(`Datastar loaded and attached to all DOM elements in ${s-n}ms`),r}function Zt(t={},...e){const n=Object.assign({},jt,Rt,t),r=[...Ut,...zt,...gt,...e];return qe(n,...r)}L.Datastar=Le,L.runDatastarWith=qe,L.runDatastarWithAllPlugins=Zt,L.toHTMLorSVGElement=R,Object.defineProperty(L,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=datastar.umd.cjs.map
