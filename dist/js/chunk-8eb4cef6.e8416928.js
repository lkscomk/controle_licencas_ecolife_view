(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8eb4cef6"],{"210b":function(e,t,s){},"21e3":function(e,t,s){"use strict";s.r(t);var i=s("8336"),a=s("b0af"),n=s("99d9"),o=s("ce7e"),r=s("4e82"),l=s("3206"),c=s("80d2"),d=s("58df"),p=Object(d["a"])(Object(r["a"])("expansionPanels","v-expansion-panel","v-expansion-panels"),Object(l["b"])("expansionPanel",!0)).extend({name:"v-expansion-panel",props:{disabled:Boolean,readonly:Boolean},data(){return{content:null,header:null,nextIsActive:!1}},computed:{classes(){return{"v-expansion-panel--active":this.isActive,"v-expansion-panel--next-active":this.nextIsActive,"v-expansion-panel--disabled":this.isDisabled,...this.groupClasses}},isDisabled(){return this.expansionPanels.disabled||this.disabled},isReadonly(){return this.expansionPanels.readonly||this.readonly}},methods:{registerContent(e){this.content=e},unregisterContent(){this.content=null},registerHeader(e){this.header=e,e.$on("click",this.onClick)},unregisterHeader(){this.header=null},onClick(e){e.detail&&this.header.$el.blur(),this.$emit("click",e),this.isReadonly||this.isDisabled||this.toggle()},toggle(){this.$nextTick(()=>this.$emit("change"))}},render(e){return e("div",{staticClass:"v-expansion-panel",class:this.classes,attrs:{"aria-expanded":String(this.isActive)}},Object(c["s"])(this))}}),h=s("0789"),u=s("9d65"),v=s("a9ad");const b=Object(d["a"])(u["a"],v["a"],Object(l["a"])("expansionPanel","v-expansion-panel-content","v-expansion-panel"));var m=b.extend().extend({name:"v-expansion-panel-content",data:()=>({isActive:!1}),computed:{parentIsActive(){return this.expansionPanel.isActive}},watch:{parentIsActive:{immediate:!0,handler(e,t){e&&(this.isBooted=!0),null==t?this.isActive=e:this.$nextTick(()=>this.isActive=e)}}},created(){this.expansionPanel.registerContent(this)},beforeDestroy(){this.expansionPanel.unregisterContent()},render(e){return e(h["a"],this.showLazyContent(()=>[e("div",this.setBackgroundColor(this.color,{staticClass:"v-expansion-panel-content",directives:[{name:"show",value:this.isActive}]}),[e("div",{class:"v-expansion-panel-content__wrap"},Object(c["s"])(this,"default",{open:this.isActive}))])]))}}),x=s("9d26"),f=s("5607");const g=Object(d["a"])(v["a"],Object(l["a"])("expansionPanel","v-expansion-panel-header","v-expansion-panel"));var y=g.extend().extend({name:"v-expansion-panel-header",directives:{ripple:f["a"]},props:{disableIconRotate:Boolean,expandIcon:{type:String,default:"$expand"},hideActions:Boolean,ripple:{type:[Boolean,Object],default:!1}},data:()=>({hasMousedown:!1}),computed:{classes(){return{"v-expansion-panel-header--active":this.isActive,"v-expansion-panel-header--mousedown":this.hasMousedown}},isActive(){return this.expansionPanel.isActive},isDisabled(){return this.expansionPanel.isDisabled},isReadonly(){return this.expansionPanel.isReadonly}},created(){this.expansionPanel.registerHeader(this)},beforeDestroy(){this.expansionPanel.unregisterHeader()},methods:{onClick(e){this.$emit("click",e)},genIcon(){const e=Object(c["s"])(this,"actions",{open:this.isActive})||[this.$createElement(x["a"],this.expandIcon)];return this.$createElement(h["c"],[this.$createElement("div",{staticClass:"v-expansion-panel-header__icon",class:{"v-expansion-panel-header__icon--disable-rotate":this.disableIconRotate},directives:[{name:"show",value:!this.isDisabled}]},e)])}},render(e){return e("button",this.setBackgroundColor(this.color,{staticClass:"v-expansion-panel-header",class:this.classes,attrs:{tabindex:this.isDisabled?-1:null,type:"button","aria-expanded":this.isActive},directives:[{name:"ripple",value:this.ripple}],on:{...this.$listeners,click:this.onClick,mousedown:()=>this.hasMousedown=!0,mouseup:()=>this.hasMousedown=!1}}),[Object(c["s"])(this,"default",{open:this.isActive},!0),this.hideActions||this.genIcon()])}}),C=(s("210b"),s("604c")),$=s("d9bd"),_=C["a"].extend({name:"v-expansion-panels",provide(){return{expansionPanels:this}},props:{accordion:Boolean,disabled:Boolean,flat:Boolean,hover:Boolean,focusable:Boolean,inset:Boolean,popout:Boolean,readonly:Boolean,tile:Boolean},computed:{classes(){return{...C["a"].options.computed.classes.call(this),"v-expansion-panels":!0,"v-expansion-panels--accordion":this.accordion,"v-expansion-panels--flat":this.flat,"v-expansion-panels--hover":this.hover,"v-expansion-panels--focusable":this.focusable,"v-expansion-panels--inset":this.inset,"v-expansion-panels--popout":this.popout,"v-expansion-panels--tile":this.tile}}},created(){this.$attrs.hasOwnProperty("expand")&&Object($["a"])("expand","multiple",this),Array.isArray(this.value)&&this.value.length>0&&"boolean"===typeof this.value[0]&&Object($["a"])(':value="[true, false, true]"',':value="[0, 2]"',this)},methods:{updateItem(e,t){const s=this.getValue(e,t),i=this.getValue(e,t+1);e.isActive=this.toggleMethod(s),e.nextIsActive=this.toggleMethod(i)}}}),k=s("132d"),B=s("8860"),O=s("da13"),A=s("5d23"),w=s("34c3"),P=s("e449"),j=s("71d9"),E=function(){var e=this,t=e._self._c;return t(a["a"],{staticClass:"mt-0 elevation-0",staticStyle:{"border-radius":"0px"},attrs:{outlined:""}},[e.options.title?t(n["d"],{staticClass:"subtitle-2 py-1"},[e._v(" "+e._s(e.options.title)+" ")]):e._e(),e.options.title?t(o["a"]):e._e(),t(n["c"],{staticClass:"mb-0 pa-0"},[t(_,{attrs:{flat:""}},[t(p,{attrs:{readonly:"",eager:""}},[t(y,{staticClass:"pa-0 mx-0 my-1",attrs:{"disable-icon-rotate":""},scopedSlots:e._u([{key:"actions",fn:function(){return[t("div",{staticStyle:{display:"none"}})]},proxy:!0}])},[t(P["a"],{attrs:{right:"","offset-y":"",dense:""},scopedSlots:e._u([{key:"activator",fn:function({on:s}){return[t(i["a"],e._g({staticClass:"ml-1",attrs:{icon:"",title:"Mais Opções","data-cy":"Mais Opções"}},s),[t(k["a"],{staticClass:"pa-1",attrs:{color:e.$vuetify.theme.dark?"white":"primary"}},[e._v(" mdi-dots-vertical ")])],1)]}}])},[e._t("maisOpcoes"),t(B["a"],{attrs:{dense:""}},[e._l(e.options.maisOpcoes,(function(s,i){return t(O["a"],{key:i,attrs:{disabled:s.disabled,dense:""},on:{click:function(t){return e.$emit(""+s.emit)}}},[t(w["a"],{staticClass:"mr-3"},[t(k["a"],{attrs:{color:e.$vuetify.theme.dark?"white":s.color||"error",disabled:s.disabled}},[e._v(" "+e._s(s.icon||"mdi-check")+" ")])],1),t(A["a"],[t(A["b"],{attrs:{title:s.hint?s.hint:""}},[e._v(" "+e._s(s.title||"Titulo")+" ")])],1)],1)})),t(O["a"],{attrs:{dense:"",disabled:e.options&&!e.options.values,"data-cy":"btnLimparFiltros"},on:{click:function(t){return e.$emit("clearFilters")}}},[t(w["a"],{staticClass:"mr-3"},[t(k["a"],{attrs:{disabled:e.options&&!e.options.values,color:e.$vuetify.theme.dark?"white":"primary"}},[e._v(" mdi-filter-remove ")])],1),t(A["a"],[t(A["b"],[e._v(" Limpar Filtros ")])],1)],1)],2)],2),e.options.botaoGenerico?t(i["a"],{attrs:{icon:"",title:e.options.botaoGenerico.title?e.options.botaoGenerico.title:"Adicionar"},on:{click:function(t){return e.$emit(""+(e.options.botaoGenerico.emit?e.options.botaoGenerico.emit:"adicionar"))}}},[t(k["a"],{staticClass:"pa-1",attrs:{color:e.$vuetify.theme.dark?"white":"primary"}},[e._v(" "+e._s(e.options.botaoGenerico.icon?e.options.botaoGenerico.icon:"mdi-plus")+" ")])],1):e._e(),e.options&&e.options.adicionar||e.options&&e.options.adicionar&&e.options.adicionar.value?t(i["a"],{ref:"btnAdicionarFiltro",staticClass:"my-auto",attrs:{color:e.$vuetify.theme.dark?"white":"primary",disabled:e.options&&e.options.adicionar&&e.options.adicionar.disabled,title:e.options&&e.options.adicionar&&e.options.adicionar.title||"Adicionar",icon:"","data-cy":"btnAdicionar"},on:{click:function(t){return e.$emit("adicionar")}}},[t(k["a"],{attrs:{color:e.$vuetify.theme.dark?"white":"primary"}},[e._v(" mdi-plus-thick ")])],1):e._e(),e._t("acao"),t(i["a"],{staticClass:"my-auto",attrs:{color:e.$vuetify.theme.dark?"white":"primary",title:"Pesquisar","data-cy":"btnPesquisar","data-v-step":"btnPesquisar",text:""},on:{click:function(t){return e.$emit("pesquisar")}}},[t(k["a"],{attrs:{color:e.$vuetify.theme.dark?"white":"primary"}},[e._v(" mdi-magnify ")])],1),e._t("filtros")],2),t(m,{key:"1",attrs:{"hide-actions":e.options&&!e.options.moreFilters,eager:""}},[e._t("maisFiltros")],2)],1)],1)],1),t(j["a"],{attrs:{height:"2",color:"#ddd",flat:""}})],1)},I=[],S={name:"ComponenteFiltroNovo",props:{options:{type:Object,default:()=>{}}}},H=S,D=s("2877"),M=Object(D["a"])(H,E,I,!1,null,null,null);t["default"]=M.exports},"5e23":function(e,t,s){},"71d9":function(e,t,s){"use strict";s("5e23");var i=s("8dd9"),a=s("adda"),n=s("80d2"),o=s("d9bd");t["a"]=i["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"}},data:()=>({isExtended:!1}),computed:{computedHeight(){const e=this.computedContentHeight;if(!this.isExtended)return e;const t=parseInt(this.extensionHeight);return this.isCollapsed?e:e+(isNaN(t)?0:t)},computedContentHeight(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes(){return{...i["a"].options.computed.classes.call(this),"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent}},isCollapsed(){return this.collapse},isProminent(){return this.prominent},styles(){return{...this.measurableStyles,height:Object(n["h"])(this.computedHeight)}}},created(){const e=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];e.forEach(([e,t])=>{this.$attrs.hasOwnProperty(e)&&Object(o["a"])(e,t,this)})},methods:{genBackground(){const e={height:Object(n["h"])(this.computedHeight),src:this.src},t=this.$scopedSlots.img?this.$scopedSlots.img({props:e}):this.$createElement(a["a"],{props:e});return this.$createElement("div",{staticClass:"v-toolbar__image"},[t])},genContent(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(n["h"])(this.computedContentHeight)}},Object(n["s"])(this))},genExtension(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(n["h"])(this.extensionHeight)}},Object(n["s"])(this,"extension"))}},render(e){this.isExtended=this.extended||!!this.$scopedSlots.extension;const t=[this.genContent()],s=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&t.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&t.unshift(this.genBackground()),e(this.tag,s,t)}})},"8ce9":function(e,t,s){},ce7e:function(e,t,s){"use strict";s("8ce9");var i=s("7560");t["a"]=i["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render(e){let t;return this.$attrs.role&&"separator"!==this.$attrs.role||(t=this.vertical?"vertical":"horizontal"),e("hr",{class:{"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical,...this.themeClasses},attrs:{role:"separator","aria-orientation":t,...this.$attrs},on:this.$listeners})}})}}]);
//# sourceMappingURL=chunk-8eb4cef6.e8416928.js.map