(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fb3f6d6e"],{"0fd9":function(t,e,a){"use strict";a("4b85");var s=a("2b0e"),i=a("d9f7"),n=a("80d2");const o=["sm","md","lg","xl"],l=["start","end","center"];function r(t,e){return o.reduce((a,s)=>(a[t+Object(n["D"])(s)]=e(),a),{})}const c=t=>[...l,"baseline","stretch"].includes(t),d=r("align",()=>({type:String,default:null,validator:c})),u=t=>[...l,"space-between","space-around"].includes(t),p=r("justify",()=>({type:String,default:null,validator:u})),f=t=>[...l,"space-between","space-around","stretch"].includes(t),h=r("alignContent",()=>({type:String,default:null,validator:f})),g={align:Object.keys(d),justify:Object.keys(p),alignContent:Object.keys(h)},m={align:"align",justify:"justify",alignContent:"align-content"};function v(t,e,a){let s=m[t];if(null!=a){if(e){const a=e.replace(t,"");s+="-"+a}return s+="-"+a,s.toLowerCase()}}const b=new Map;e["a"]=s["a"].extend({name:"v-row",functional:!0,props:{tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:c},...d,justify:{type:String,default:null,validator:u},...p,alignContent:{type:String,default:null,validator:f},...h},render(t,{props:e,data:a,children:s}){let n="";for(const i in e)n+=String(e[i]);let o=b.get(n);if(!o){let t;for(t in o=[],g)g[t].forEach(a=>{const s=e[a],i=v(t,a,s);i&&o.push(i)});o.push({"no-gutters":e.noGutters,"row--dense":e.dense,["align-"+e.align]:e.align,["justify-"+e.justify]:e.justify,["align-content-"+e.alignContent]:e.alignContent}),b.set(n,o)}return t(e.tag,Object(i["a"])(a,{staticClass:"row",class:o}),s)}})},"20f68":function(t,e,a){},"2a7f":function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));var s=a("71d9"),i=a("80d2");const n=Object(i["i"])("v-toolbar__title"),o=Object(i["i"])("v-toolbar__items");s["a"]},"2fa4":function(t,e,a){"use strict";a("20f68");var s=a("80d2");e["a"]=Object(s["i"])("spacer","div","v-spacer")},"3c93":function(t,e,a){},"4b85":function(t,e,a){},"5c1f":function(t,e,a){"use strict";a.r(e);var s=a("8336"),i=a("b0af"),n=a("99d9"),o=a("62ad"),l=a("a523"),r=a("132d"),c=a("8860"),d=a("da13"),u=a("5d23"),p=a("34c3"),f=a("e449"),h=a("0fd9"),g=a("2fa4"),m=a("71d9"),v=a("2a7f"),b=function(){var t=this,e=t._self._c;return e("div",[e("loading",{attrs:{value:t.loading}}),e(h["a"],{attrs:{dense:""}},[e(o["a"],{attrs:{cols:12}},[t.titulo||t.subtitulo?e(l["a"],{staticClass:"py-0 px-3 pl-5 elevation-1 d-flex align-center grey lighten-4",staticStyle:{height:"60px"},attrs:{fluid:""}},[e("div",{staticClass:"headline font-weight-regular"},[t.titulo?e("b",[t._v(t._s(t.titulo))]):t._e(),t._v(" "+t._s(t.titulo&&t.subtitulo?"|":"")+" "),t.subtitulo?e("span",{staticClass:"body-1 font-weight-mediun"},[t._v(" "+t._s(t.subtitulo)+" ")]):t._e()])]):t._e()],1)],1),e(h["a"],{class:t.$vuetify.breakpoint.mobile?"ma-0":"justify-center",attrs:{dense:""}},[e(o["a"],{staticClass:"pb-0 mb-0",attrs:{cols:"12"}},[t._t("default")],2),t.modal?e(o["a"],{attrs:{cols:"12"}},[e(i["a"],{staticClass:"elevation-0 ma-2",attrs:{outlined:""}},[e(m["a"],{staticClass:"font-weight-bold",class:t.$vuetify.theme.dark?"":"grey--text text--darken-2",attrs:{color:t.$vuetify.theme.dark?"accent":"white",flat:"",height:"50"}},[e(s["a"],{attrs:{color:"error",icon:"",small:"",title:"Voltar"},on:{click:function(e){return t.$emit("voltar")}}},[e(r["a"],{attrs:{dark:""}},[t._v(" mdi-chevron-left ")])],1),e(v["a"],{staticClass:"px-2"},[t._v(" "+t._s(t.tituloFormulario)+" ")]),e(g["a"]),t.maisOpcoes?e(f["a"],{attrs:{"offset-y":"",left:""},scopedSlots:t._u([{key:"activator",fn:function({on:a}){return[e(s["a"],t._g({staticClass:"mx-0",attrs:{color:"primary darken-1",dark:"",small:"",icon:""}},a),[e(r["a"],[t._v(" mdi-dots-vertical ")])],1)]}}],null,!1,1512810259)},[t.maisOpcoes&&t.maisOpcoes.length?e(c["a"],{staticClass:"pa-0",attrs:{dense:""}},t._l(t.maisOpcoes,(function(a,s){return e(d["a"],{key:s,attrs:{disabled:!!a.disabled},on:{click:function(e){a.acao?t.$emit(a.acao):t.$emit("input")}}},[e(p["a"],{staticClass:"mr-3"},[e(r["a"],{attrs:{color:a.color||"primary"}},[t._v(" "+t._s(a.icone)+" ")])],1),e(u["a"],[e(u["b"],[t._v(" "+t._s(a.titulo)+" ")])],1)],1)})),1):t._e(),t._t("maisOpcoes")],2):t._e()],1),e(n["c"],{staticClass:"ma-0 pa-0"},[t._t("formulario")],2),e(n["a"],[e(h["a"],{staticClass:"pa-0",attrs:{dense:""}},[t.camposObrigatorios?e(o["a"],{class:t.$vuetify.breakpoint.xsOnly?"px-0 py-0 text-center":"px-0 py-0",attrs:{cols:"12",xl:"3",lg:"3",md:"3",sm:"12"}},[e("span",{staticClass:"caption pl-2"},[e("span",{staticClass:"red--text"},[t._v("*")]),t._v(" Campos obrigatórios ")])]):t._e(),e(g["a"]),e(o["a"],{staticClass:"text-right py-1",attrs:{cols:"12",xl:"9",lg:"9",md:"9",sm:"12"}},[t._t("botoes")],2)],1)],1)],1)],1):e(o["a"],{staticClass:"pb-0 mb-0",attrs:{cols:"12"}},[t._t("listagem")],2),e(o["a"],{attrs:{cols:"12"}},[t._t("relacionamento")],2)],1)],1)},y=[],_=a("c428"),C={name:"ComponentePagina",components:{loading:_["default"]},props:{subtitulo:{default:"",type:String},titulo:{default:"",type:String},tituloFormulario:{default:"",type:String},loading:{default:!1,type:Boolean},modal:{default:!1,type:Boolean},camposObrigatorios:{default:!0,type:Boolean},maisOpcoes:{type:Array,default:()=>[]}},data:()=>({aviso:{modal:!1,key:null,text:""}})},x=C,S=a("2877"),O=Object(S["a"])(x,b,y,!1,null,null,null);e["default"]=O.exports},"5e23":function(t,e,a){},"62ad":function(t,e,a){"use strict";a("4b85");var s=a("2b0e"),i=a("d9f7"),n=a("80d2");const o=["sm","md","lg","xl"],l=(()=>o.reduce((t,e)=>(t[e]={type:[Boolean,String,Number],default:!1},t),{}))(),r=(()=>o.reduce((t,e)=>(t["offset"+Object(n["D"])(e)]={type:[String,Number],default:null},t),{}))(),c=(()=>o.reduce((t,e)=>(t["order"+Object(n["D"])(e)]={type:[String,Number],default:null},t),{}))(),d={col:Object.keys(l),offset:Object.keys(r),order:Object.keys(c)};function u(t,e,a){let s=t;if(null!=a&&!1!==a){if(e){const a=e.replace(t,"");s+="-"+a}return"col"!==t||""!==a&&!0!==a?(s+="-"+a,s.toLowerCase()):s.toLowerCase()}}const p=new Map;e["a"]=s["a"].extend({name:"v-col",functional:!0,props:{cols:{type:[Boolean,String,Number],default:!1},...l,offset:{type:[String,Number],default:null},...r,order:{type:[String,Number],default:null},...c,alignSelf:{type:String,default:null,validator:t=>["auto","start","end","center","baseline","stretch"].includes(t)},tag:{type:String,default:"div"}},render(t,{props:e,data:a,children:s,parent:n}){let o="";for(const i in e)o+=String(e[i]);let l=p.get(o);if(!l){let t;for(t in l=[],d)d[t].forEach(a=>{const s=e[a],i=u(t,a,s);i&&l.push(i)});const a=l.some(t=>t.startsWith("col-"));l.push({col:!a||!e.cols,["col-"+e.cols]:e.cols,["offset-"+e.offset]:e.offset,["order-"+e.order]:e.order,["align-self-"+e.alignSelf]:e.alignSelf}),p.set(o,l)}return t(e.tag,Object(i["a"])(a,{class:l}),s)}})},"71d9":function(t,e,a){"use strict";a("5e23");var s=a("8dd9"),i=a("adda"),n=a("80d2"),o=a("d9bd");e["a"]=s["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"}},data:()=>({isExtended:!1}),computed:{computedHeight(){const t=this.computedContentHeight;if(!this.isExtended)return t;const e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes(){return{...s["a"].options.computed.classes.call(this),"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent}},isCollapsed(){return this.collapse},isProminent(){return this.prominent},styles(){return{...this.measurableStyles,height:Object(n["h"])(this.computedHeight)}}},created(){const t=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];t.forEach(([t,e])=>{this.$attrs.hasOwnProperty(t)&&Object(o["a"])(t,e,this)})},methods:{genBackground(){const t={height:Object(n["h"])(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement(i["a"],{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(n["h"])(this.computedContentHeight)}},Object(n["r"])(this))},genExtension(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(n["h"])(this.extensionHeight)}},Object(n["r"])(this,"extension"))}},render(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;const e=[this.genContent()],a=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,a,e)}})},a523:function(t,e,a){"use strict";a("20f68"),a("4b85");var s=a("2b0e");function i(t){return s["a"].extend({name:"v-"+t,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(e,{props:a,data:s,children:i}){s.staticClass=`${t} ${s.staticClass||""}`.trim();const{attrs:n}=s;if(n){s.attrs={};const t=Object.keys(n).filter(t=>{if("slot"===t)return!1;const e=n[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e});t.length&&(s.staticClass+=" "+t.join(" "))}return a.id&&(s.domProps=s.domProps||{},s.domProps.id=a.id),e(a.tag,s,i)}})}var n=a("d9f7");e["a"]=i("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:e,data:a,children:s}){let i;const{attrs:o}=a;return o&&(a.attrs={},i=Object.keys(o).filter(t=>{if("slot"===t)return!1;const e=o[t];return t.startsWith("data-")?(a.attrs[t]=e,!1):e||"string"===typeof e})),e.id&&(a.domProps=a.domProps||{},a.domProps.id=e.id),t(e.tag,Object(n["a"])(a,{staticClass:"container",class:Array({"container--fluid":e.fluid}).concat(i||[])}),s)}})},a797:function(t,e,a){"use strict";a("3c93");var s=a("a9ad"),i=a("7560"),n=a("f2e7"),o=a("58df");e["a"]=Object(o["a"])(s["a"],i["a"],n["a"]).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim(){const t=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",t)},classes(){return{"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive,...this.themeClasses}},computedOpacity(){return Number(this.isActive?this.opacity:0)},styles(){return{zIndex:this.zIndex}}},methods:{genContent(){return this.$createElement("div",{staticClass:"v-overlay__content"},this.$slots.default)}},render(t){const e=[this.__scrim];return this.isActive&&e.push(this.genContent()),t("div",{staticClass:"v-overlay",on:this.$listeners,class:this.classes,style:this.styles},e)}})},c428:function(t,e,a){"use strict";a.r(e);var s=a("8336"),i=a("132d"),n=a("a797"),o=a("490a"),l=function(){var t=this,e=t._self._c;return e("div",{staticClass:"text-center"},[e(n["a"],{staticStyle:{"z-index":"10000 !important"},attrs:{value:t.dialog}},[t.titulo?e("div",{staticClass:"headline lighten-2 pa-3"},[t._v(" "+t._s(t.titulo)+" ")]):t._e(),e("div",{staticClass:"pa-3 ma-0"},[e(o["a"],{attrs:{color:t.$vuetify.theme.dark?"":"primary",size:100,width:6,indeterminate:""}},[e("div",{staticClass:"white--text font-weight-medium caption"},[t._v(" Aguarde ... ")])])],1),t.cancelar?e(s["a"],{attrs:{block:"",color:"error",outlined:"",text:"",small:""},on:{click:function(e){return t.$emit("cancelar")}}},[e(i["a"],{attrs:{left:"",size:"28"}},[t._v(" mdi-cancel ")]),t._v(" Cancelar ")],1):t._e()],1)],1)},r=[],c={name:"ComponenteLoading",props:{cancelar:{default:!1,type:Boolean},value:{required:!0,type:Boolean},titulo:{default:null,type:String}},data:()=>({dialog:!1}),watch:{value(t){t?this.dialog=!0:setTimeout(()=>{this.dialog=!1},200)}}},d=c,u=a("2877"),p=Object(u["a"])(d,l,r,!1,null,null,null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-fb3f6d6e.d6b4aa5d.js.map