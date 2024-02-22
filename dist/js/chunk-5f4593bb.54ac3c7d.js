(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f4593bb"],{"10d2":function(e,t,a){"use strict";var i=a("8dd9");t["a"]=i["a"]},"20f68":function(e,t,a){},"22da":function(e,t,a){"use strict";var i=a("490a");t["a"]=i["a"]},"2bfd":function(e,t,a){},"490a":function(e,t,a){"use strict";a("8d4f");var i=a("90a2"),s=a("a9ad"),r=a("80d2");t["a"]=s["a"].extend({name:"v-progress-circular",directives:{intersect:i["a"]},props:{button:Boolean,indeterminate:Boolean,rotate:{type:[Number,String],default:0},size:{type:[Number,String],default:32},width:{type:[Number,String],default:4},value:{type:[Number,String],default:0}},data:()=>({radius:20,isVisible:!0}),computed:{calculatedSize(){return Number(this.size)+(this.button?8:0)},circumference(){return 2*Math.PI*this.radius},classes(){return{"v-progress-circular--visible":this.isVisible,"v-progress-circular--indeterminate":this.indeterminate,"v-progress-circular--button":this.button}},normalizedValue(){return this.value<0?0:this.value>100?100:parseFloat(this.value)},strokeDashArray(){return Math.round(1e3*this.circumference)/1e3},strokeDashOffset(){return(100-this.normalizedValue)/100*this.circumference+"px"},strokeWidth(){return Number(this.width)/+this.size*this.viewBoxSize*2},styles(){return{height:Object(r["h"])(this.calculatedSize),width:Object(r["h"])(this.calculatedSize)}},svgStyles(){return{transform:`rotate(${Number(this.rotate)}deg)`}},viewBoxSize(){return this.radius/(1-Number(this.width)/+this.size)}},methods:{genCircle(e,t){return this.$createElement("circle",{class:"v-progress-circular__"+e,attrs:{fill:"transparent",cx:2*this.viewBoxSize,cy:2*this.viewBoxSize,r:this.radius,"stroke-width":this.strokeWidth,"stroke-dasharray":this.strokeDashArray,"stroke-dashoffset":t}})},genSvg(){const e=[this.indeterminate||this.genCircle("underlay",0),this.genCircle("overlay",this.strokeDashOffset)];return this.$createElement("svg",{style:this.svgStyles,attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:`${this.viewBoxSize} ${this.viewBoxSize} ${2*this.viewBoxSize} ${2*this.viewBoxSize}`}},e)},genInfo(){return this.$createElement("div",{staticClass:"v-progress-circular__info"},this.$slots.default)},onObserve(e,t,a){this.isVisible=a}},render(e){return e("div",this.setTextColor(this.color,{staticClass:"v-progress-circular",attrs:{role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":this.indeterminate?void 0:this.normalizedValue},class:this.classes,directives:[{name:"intersect",value:this.onObserve}],style:this.styles,on:this.$listeners}),[this.genSvg(),this.genInfo()])}})},"4bd4":function(e,t,a){"use strict";var i=a("58df"),s=a("7e2b"),r=a("3206");t["a"]=Object(i["a"])(s["a"],Object(r["b"])("form")).extend({name:"v-form",provide(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:()=>({inputs:[],watchers:[],errorBag:{}}),watch:{errorBag:{handler(e){const t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput(e){const t=e=>e.$watch("hasError",t=>{this.$set(this.errorBag,e._uid,t)},{immediate:!0}),a={_uid:e._uid,valid:()=>{},shouldValidate:()=>{}};return this.lazyValidation?a.shouldValidate=e.$watch("shouldValidate",i=>{i&&(this.errorBag.hasOwnProperty(e._uid)||(a.valid=t(e)))}):a.valid=t(e),a},validate(){return 0===this.inputs.filter(e=>!e.validate(!0)).length},reset(){this.inputs.forEach(e=>e.reset()),this.resetErrorBag()},resetErrorBag(){this.lazyValidation&&setTimeout(()=>{this.errorBag={}},0)},resetValidation(){this.inputs.forEach(e=>e.resetValidation()),this.resetErrorBag()},register(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister(e){const t=this.inputs.find(t=>t._uid===e._uid);if(!t)return;const a=this.watchers.find(e=>e._uid===t._uid);a&&(a.valid(),a.shouldValidate()),this.watchers=this.watchers.filter(e=>e._uid!==t._uid),this.inputs=this.inputs.filter(e=>e._uid!==t._uid),this.$delete(this.errorBag,t._uid)}},render(e){return e("form",{staticClass:"v-form",attrs:{novalidate:!0,...this.attrs$},on:{submit:e=>this.$emit("submit",e)}},this.$slots.default)}})},"4d21":function(e,t,a){"use strict";a.r(t);var i=a("c6a6"),s=a("8336"),r=a("62ad"),o=a("a523"),l=a("4bd4"),n=a("132d"),d=a("0fd9"),u=a("8654"),c=function(){var e=this,t=e._self._c;return t("pagina",{attrs:{loading:e.loading,modal:e.modal,subtitulo:"Página de Manutenção de Empresas",titulo:"Empresas","mais-opcoes":e.formulario.id?e.maisOpcoes:null,"titulo-formulario":e.controle.editar?"Editar Registro":e.controle.inserir?"Adicionar Registro":"Exibir Registro"},on:{voltar:function(t){e.modal=!1,e.resetFormulario()},excluir:function(t){return e.excluirRegistro()}}},[t("template",{slot:"listagem"},[t(l["a"],{on:{submit:function(e){e.preventDefault()}}},[t(o["a"],{staticClass:"my-0 py-0",attrs:{fluid:""}},[t(d["a"],{attrs:{dense:""}},[t(r["a"],{attrs:{cols:"12"}},[t("filtro",{attrs:{options:e.optionsFilter},on:{adicionar:function(t){e.modal=!0,e.controle.inserir=!0,e.formulario.status=e.enumStatusEmpresas.digitacao},clearFilters:function(t){return e.limparFiltros()},pesquisar:function(t){return e.listarRegistro()}}},[t("template",{slot:"filtros"},[t(o["a"],{staticClass:"my-0 py-0",attrs:{fluid:""}},[t(d["a"],{attrs:{dense:""}},[t(r["a"],{attrs:{xl:"1",lg:"1",md:"4",sm:"4",cols:"12"}},[t(u["a"],{directives:[{name:"mask",rawName:"v-mask",value:"###########",expression:"'###########'"}],attrs:{"hide-details":"",dense:"",label:"Código",outlined:""},model:{value:e.filtro.id,callback:function(t){e.$set(e.filtro,"id",t)},expression:"filtro.id"}})],1),t(r["a"],{attrs:{xl:"1",lg:"1",md:"4",sm:"4",cols:"12"}},[t(u["a"],{directives:[{name:"mask",rawName:"v-mask",value:"##.###.###/####-##",expression:"'##.###.###/####-##'"}],attrs:{"hide-details":"",dense:"",label:"CNPJ",outlined:""},model:{value:e.filtro.cnpj,callback:function(t){e.$set(e.filtro,"cnpj",t)},expression:"filtro.cnpj"}})],1),t(r["a"],{attrs:{xl:"2",lg:"2",md:"4",sm:"4",cols:"12"}},[t("selecao-all",{attrs:{items:e.dropdownStatusEmpresa,"hide-details":"",dense:"","item-value":"item","item-text":"descricao",label:"Status",outlined:""},model:{value:e.filtro.status,callback:function(t){e.$set(e.filtro,"status",t)},expression:"filtro.status"}})],1),t(r["a"],{attrs:{xl:"2",lg:"2",md:"4",sm:"12",cols:"12"}},[t(u["a"],{directives:[{name:"uppercase",rawName:"v-uppercase"}],attrs:{"hide-details":"",dense:"",label:"Nome Fantasia",outlined:""},model:{value:e.filtro.nomeFantasia,callback:function(t){e.$set(e.filtro,"nomeFantasia",t)},expression:"filtro.nomeFantasia"}})],1),t(r["a"],{attrs:{xl:"2",lg:"2",md:"4",sm:"12",cols:"12"}},[t(u["a"],{directives:[{name:"uppercase",rawName:"v-uppercase"}],attrs:{"hide-details":"",dense:"",label:"Razão Social",outlined:""},model:{value:e.filtro.razaoSocial,callback:function(t){e.$set(e.filtro,"razaoSocial",t)},expression:"filtro.razaoSocial"}})],1),t(r["a"],{attrs:{xl:"2",lg:"2",md:"4",sm:"12",cols:"12"}},[t("selecao-all",{attrs:{items:e.dropdownPortesEmpresa,"hide-details":"",dense:"","item-value":"item","item-text":"descricao",label:"Porte",outlined:""},model:{value:e.filtro.porte,callback:function(t){e.$set(e.filtro,"porte",t)},expression:"filtro.porte"}})],1),t(r["a"],{attrs:{xl:"2",lg:"2",md:"4",sm:"12",cols:"12"}},[t("selecao-all",{attrs:{items:e.dropdownCidades,"hide-details":"",dense:"","item-value":"codigo","item-text":"nome",label:"Cidade",outlined:""},model:{value:e.filtro.cidade,callback:function(t){e.$set(e.filtro,"cidade",t)},expression:"filtro.cidade"}})],1)],1)],1)],1)],2)],1),t(r["a"],{attrs:{cols:"12"}},[t("tabela",{staticClass:"mt-2",attrs:{colunas:e.colunas,registros:e.registros,paginacao:e.paginacao,"registros-por-pagina":100,"sort-by-cli":["id"],"sort-desc-cli":!0,"height-auto":"",exibir:"","toolbar-grid":"",titulo:"Listagem de Empresas"},on:{paginacao:function(t){e.paginacao=t},exibir:function(t){return e.exibirRegistro(t)}}})],1)],1)],1)],1)],1),t("template",{slot:"formulario"},[t(l["a"],{ref:"form",on:{submit:function(e){e.preventDefault()}}},[t("validation-observer",{ref:"observer"},[t(o["a"],{attrs:{fluid:"","grid-list-xs":""}},[t(d["a"],{attrs:{dense:""}},[e.formulario.id?t(r["a"],{attrs:{xl:"1",lg:"1",md:"1",sm:"2",cols:"12"}},[t("validation-provider",{attrs:{name:"Id",vid:"id"},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(u["a"],{attrs:{"error-messages":a,"hide-details":!a.length,disabled:"",dense:"",label:"Código",outlined:""},model:{value:e.formulario.id,callback:function(t){e.$set(e.formulario,"id",t)},expression:"formulario.id"}})]}}],null,!1,971315007)})],1):e._e(),t(r["a"],{attrs:{xl:e.formulario.id?2:3,lg:e.formulario.id?2:3,md:e.formulario.id?2:3,sm:e.formulario.id?4:6,cols:"12"}},[t("validation-provider",{attrs:{name:"CNPJ",vid:"cnpj",rules:"required"},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(u["a"],{directives:[{name:"mask",rawName:"v-mask",value:"##.###.###/####-##",expression:"'##.###.###/####-##'"}],attrs:{disabled:e.controle.exibir,"error-messages":a,"hide-details":!a.length,dense:"",label:"CNPJ*",outlined:""},model:{value:e.formulario.cnpj,callback:function(t){e.$set(e.formulario,"cnpj",t)},expression:"formulario.cnpj"}})]}}])})],1),t(r["a"],{attrs:{xl:"2",lg:"2",md:"2",sm:"6",cols:"12"}},[t(i["a"],{attrs:{disabled:"",items:e.dropdownStatusEmpresa,"hide-details":"",dense:"","item-value":"item","item-text":"descricao",label:"Status Empresa",outlined:""},model:{value:e.formulario.status,callback:function(t){e.$set(e.formulario,"status",t)},expression:"formulario.status"}})],1),t(r["a"],{attrs:{xl:"3",lg:"3",md:"7",sm:"6",cols:"12"}},[t("validation-provider",{attrs:{name:"Nome Fantasia",vid:"nomeFantasia",rules:"required|max:100"},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(u["a"],{directives:[{name:"uppercase",rawName:"v-uppercase"}],attrs:{disabled:e.controle.exibir,"error-messages":a,"hide-details":!(a.length||e.formulario.nomeFantasia&&e.formulario.nomeFantasia.length>0&&!e.controle.exibir),counter:100,dense:"",label:"Nome Fantasia*",outlined:""},model:{value:e.formulario.nomeFantasia,callback:function(t){e.$set(e.formulario,"nomeFantasia",t)},expression:"formulario.nomeFantasia"}})]}}])})],1),t(r["a"],{attrs:{xl:"2",lg:"2",md:"4",sm:"6",cols:"12"}},[t("validation-provider",{attrs:{name:"Razão Social",vid:"razaoSocial",rules:"required|max:100"},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(u["a"],{directives:[{name:"uppercase",rawName:"v-uppercase"}],attrs:{disabled:e.controle.exibir,"error-messages":a,"hide-details":!(a.length||e.formulario.razaoSocial&&e.formulario.razaoSocial.length>0&&!e.controle.exibir),counter:100,dense:"",label:"Razão Social*",outlined:""},model:{value:e.formulario.razaoSocial,callback:function(t){e.$set(e.formulario,"razaoSocial",t)},expression:"formulario.razaoSocial"}})]}}])})],1),t(r["a"],{attrs:{xl:"2",lg:"2",md:"2",sm:"4",cols:"12"}},[t("validation-provider",{attrs:{name:"Data de Cadastro",vid:"dataCadastro",rules:"required"},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(u["a"],{directives:[{name:"mask",rawName:"v-mask",value:"##/##/####",expression:"'##/##/####'"}],attrs:{disabled:e.controle.exibir,"error-messages":a,"hide-details":!a.length,dense:"",label:"Data de Cadastro*",outlined:""},model:{value:e.formulario.dataCadastro,callback:function(t){e.$set(e.formulario,"dataCadastro",t)},expression:"formulario.dataCadastro"}})]}}])})],1),t(r["a"],{attrs:{xl:"2",lg:"2",md:"3",sm:"4",cols:"12"}},[t("validation-provider",{attrs:{name:"Incrição Estadual",vid:"inscricaoEstadual",rules:""},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(u["a"],{attrs:{disabled:e.controle.exibir,"error-messages":a,"hide-details":!a.length,dense:"",label:"Incrição Estadual",outlined:""},model:{value:e.formulario.inscricaoEstadual,callback:function(t){e.$set(e.formulario,"inscricaoEstadual",t)},expression:"formulario.inscricaoEstadual"}})]}}])})],1),t(r["a"],{attrs:{xl:"2",lg:"2",md:"3",sm:"4",cols:"12"}},[t("validation-provider",{attrs:{name:"Incrição Municipal",vid:"inscricaoMunicipal",rules:""},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(u["a"],{attrs:{disabled:e.controle.exibir,"error-messages":a,"hide-details":!a.length,dense:"",label:"Incrição Municipal",outlined:""},model:{value:e.formulario.inscricaoMunicipal,callback:function(t){e.$set(e.formulario,"inscricaoMunicipal",t)},expression:"formulario.inscricaoMunicipal"}})]}}])})],1),t(r["a"],{attrs:{xl:"3",lg:"3",md:"6",sm:"12",cols:"12"}},[t("validation-provider",{attrs:{name:"Porte",rules:"required",vid:"porte"},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(i["a"],{attrs:{items:e.dropdownPortesEmpresa,disabled:e.controle.exibir,"error-messages":a,"hide-details":!a.length,dense:"","item-value":"item","item-text":"descricao",label:"Porte*",outlined:""},model:{value:e.formulario.porte,callback:function(t){e.$set(e.formulario,"porte",t)},expression:"formulario.porte"}})]}}])})],1),t(r["a"],{attrs:{cols:"12"}},[e._v(" Endereço Principal ")]),t(r["a"],{attrs:{xl:"1",lg:"2",md:"4",sm:"6",cols:"12"}},[t("validation-provider",{attrs:{name:"CEP",vid:"cep",rules:"required"},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(u["a"],{directives:[{name:"mask",rawName:"v-mask",value:"#####-###",expression:"'#####-###'"}],attrs:{disabled:e.controle.exibir,"error-messages":a,"hide-details":!a.length,dense:"",label:"CEP*",outlined:""},model:{value:e.formulario.cep,callback:function(t){e.$set(e.formulario,"cep",t)},expression:"formulario.cep"}})]}}])})],1),t(r["a"],{attrs:{xl:"2",lg:"2",md:"4",sm:"6",cols:"12"}},[t("validation-provider",{attrs:{name:"Logradouro",vid:"logradouro",rules:"required|max:100"},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(u["a"],{directives:[{name:"uppercase",rawName:"v-uppercase"}],attrs:{disabled:e.controle.exibir,"error-messages":a,"hide-details":!(a.length||e.formulario.logradouro&&e.formulario.logradouro.length>0&&!e.controle.exibir),counter:100,dense:"",label:"Logradouro*",outlined:""},model:{value:e.formulario.logradouro,callback:function(t){e.$set(e.formulario,"logradouro",t)},expression:"formulario.logradouro"}})]}}])})],1),t(r["a"],{attrs:{xl:"1",lg:"2",md:"4",sm:"6",cols:"12"}},[t("validation-provider",{attrs:{name:"Número",vid:"enderecoNumero",rules:"required"},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(u["a"],{directives:[{name:"mask",rawName:"v-mask",value:"##########",expression:"'##########'"}],attrs:{disabled:e.controle.exibir,"error-messages":a,"hide-details":!a.length,dense:"",label:"Número*",outlined:""},model:{value:e.formulario.enderecoNumero,callback:function(t){e.$set(e.formulario,"enderecoNumero",t)},expression:"formulario.enderecoNumero"}})]}}])})],1),t(r["a"],{attrs:{xl:"3",lg:"3",md:"4",sm:"6",cols:"12"}},[t("validation-provider",{attrs:{name:"Estado",rules:"required",vid:"estado"},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(i["a"],{attrs:{items:e.dropdownEstados,disabled:e.controle.exibir,"error-messages":a,"hide-details":!a.length,dense:"","item-value":"uf","item-text":"nome",label:"Estado*",outlined:""},model:{value:e.formulario.estado,callback:function(t){e.$set(e.formulario,"estado",t)},expression:"formulario.estado"}})]}}])})],1),t(r["a"],{attrs:{xl:"3",lg:"3",md:"4",sm:"6",cols:"12"}},[t("validation-provider",{attrs:{name:"Cidade",rules:"required",vid:"cidade"},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(i["a"],{attrs:{items:e.dropdownCidades,disabled:e.controle.exibir||!e.formulario.estado||!("RO"===e.formulario.estado||"AM"===e.formulario.estado||"AC"===e.formulario.estado),"error-messages":a,"hide-details":!a.length,dense:"","item-value":"codigo","item-text":"nome",label:"Cidade*",outlined:""},model:{value:e.formulario.cidade,callback:function(t){e.$set(e.formulario,"cidade",t)},expression:"formulario.cidade"}})]}}])})],1),t(r["a"],{attrs:{xl:"2",lg:"2",md:"4",sm:"6",cols:"12"}},[t("validation-provider",{attrs:{name:"Bairro",vid:"bairro",rules:"required|max:100"},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(u["a"],{directives:[{name:"uppercase",rawName:"v-uppercase"}],attrs:{disabled:e.controle.exibir,"error-messages":a,"hide-details":!(a.length||e.formulario.bairro&&e.formulario.bairro.length>0&&!e.controle.exibir),counter:100,dense:"",label:"Bairro*",outlined:""},model:{value:e.formulario.bairro,callback:function(t){e.$set(e.formulario,"bairro",t)},expression:"formulario.bairro"}})]}}])})],1),t(r["a"],{attrs:{xl:"6",lg:"4",md:"12",sm:"12",cols:"12"}},[t("validation-provider",{attrs:{name:"Complemento",vid:"complemento",rules:"max:100"},scopedSlots:e._u([{key:"default",fn:function({errors:a}){return[t(u["a"],{directives:[{name:"uppercase",rawName:"v-uppercase"}],attrs:{disabled:e.controle.exibir,"error-messages":a,"hide-details":!(a.length||e.formulario.complemento&&e.formulario.complemento.length>0&&!e.controle.exibir),counter:100,dense:"",label:"Complemento",outlined:""},model:{value:e.formulario.complemento,callback:function(t){e.$set(e.formulario,"complemento",t)},expression:"formulario.complemento"}})]}}])})],1),e.formulario.id?t(r["a"],{attrs:{xl:"2",lg:"2",md:"3",sm:"6",cols:"12"}},[t(u["a"],{attrs:{disabled:"","hide-details":"",dense:"",label:"Criado Por*",outlined:""},model:{value:e.formulario.created_by,callback:function(t){e.$set(e.formulario,"created_by",t)},expression:"formulario.created_by"}})],1):e._e(),e.formulario.id?t(r["a"],{attrs:{xl:"2",lg:"2",md:"3",sm:"6",cols:"12"}},[t(u["a"],{attrs:{disabled:"","hide-details":"",dense:"",label:"Criado Em*",outlined:""},model:{value:e.formulario.created_at,callback:function(t){e.$set(e.formulario,"created_at",t)},expression:"formulario.created_at"}})],1):e._e()],1)],1)],1)],1)],1),t("template",{slot:"botoes"},[e.controle.exibir||!e.controle.inserir&&!e.controle.editar?e._e():t(s["a"],{class:e.$vuetify.breakpoint.xsOnly?"my-1":"mx-1",attrs:{block:e.$vuetify.breakpoint.xsOnly,color:"success",small:""},on:{click:function(t){return e.salvarRegistro()}}},[t(n["a"],{attrs:{left:"",size:"20"}},[e._v(" mdi-content-save ")]),e._v(" Salvar ")],1),e.controle.exibir&&!e.controle.inserir?t(s["a"],{class:e.$vuetify.breakpoint.xsOnly?"my-1":"mx-1",attrs:{block:e.$vuetify.breakpoint.xsOnly,color:"success",small:""},on:{click:function(t){e.controle.editar=!0,e.controle.exibir=!1}}},[t(n["a"],{attrs:{left:"",size:"20"}},[e._v(" mdi-pencil ")]),e._v(" Editar ")],1):e._e(),t(s["a"],{class:e.$vuetify.breakpoint.xsOnly?"my-1":"mx-1",attrs:{block:e.$vuetify.breakpoint.xsOnly,color:"error",small:""},on:{click:function(t){e.modal=!1,e.resetFormulario()}}},[t(n["a"],{attrs:{left:"",size:"20"}},[e._v(" mdi-cancel ")]),e._v(" Voltar ")],1)],1)],2)},h=[],m=a("2f62"),p={name:"PaginaEmpresas",data:()=>({loading:!1,perfil:window.atob(localStorage.getItem("umbrella:perfil")),colunas:[{text:"Ação",align:"start",sortable:!1,value:"acao"},{text:"Código",align:"start",sortable:!0,value:"id"},{text:"CNPJ",align:"start",sortable:!0,value:"cnpj"},{text:"Status",align:"start",sortable:!1,value:"status"},{text:"Nome Fantasia",align:"start",sortable:!0,value:"nome_fantasia"},{text:"Razão Social",align:"start",sortable:!0,value:"razao_social"},{text:"Data Cadastro",align:"start",sortable:!0,value:"data_cadastro"},{text:"Cidade",align:"start",sortable:!0,value:"cidade"},{text:"Porte",align:"start",sortable:!0,value:"porte_descricao"}],enumStatusEmpresas:{digitacao:1},filtro:{id:null,cnpj:null,status:[],cidade:[],nomeFantasia:null,razaoSocial:null,porte:[]},controle:{exibir:!1,editar:!1,inserir:!1},formulario:{id:null,cnpj:null,status:null,nomeFantasia:null,razaoSocial:null,dataCadastro:null,inscricaoEstadual:null,inscricaoMunicipal:null,porte:null,cep:null,logradouro:null,enderecoNumero:null,estado:null,cidade:null,complemento:null,bairro:null,created_at:null,created_by:null},paginacao:{pagina:1,registros:100,totalRegistros:0},modal:!1}),computed:{...Object(m["d"])("empresa",["registros","dropdownStatusEmpresa","dropdownPortesEmpresa","dropdownEstados","dropdownCidades"]),filtroValor(){return!!(this.filtro.id||this.filtro.cnpj||this.filtro.cidade&&this.filtro.cidade.length||this.filtro.status&&this.filtro.status.length||this.filtro.nomeFantasia||this.filtro.razaoSocial||this.filtro.porte&&this.filtro.porte.length)},optionsFilter(){return{adicionar:!0,values:this.filtroValor}},maisOpcoes(){return[{acao:"excluir",color:"error",icone:"mdi-delete",titulo:"Excluir"}]}},watch:{async"formulario.estado"(e){!e||"RO"!==this.formulario.estado&&"AM"!==this.formulario.estado&&"AC"!==this.formulario.estado||await this.buscarDropdownCidade(e)}},async created(){this.listarRegistro(),await this.buscarDropdownPortesEmpresa(),await this.buscarDropdownStatusEmpresa(),await this.buscarDropdownEstados(),this.buscarDropdownCidade("RO")},methods:{...Object(m["b"])("empresa",["listar","exibir","editar","salvar","excluir","buscarDropdownPortesEmpresa","buscarDropdownStatusEmpresa","buscarDropdownEstados","buscarDropdownCidade"]),async listarRegistro(){this.loading=!0,await this.listar({id:this.filtro.id||null,cnpj:this.filtro.cnpj?String(this.filtro.cnpj).match(/\d/g).join(""):void 0,cidade:this.filtro.cidade&&this.filtro.cidade.length?this.filtro.cidade:null,status:this.filtro.status&&this.filtro.status.length?this.filtro.status:null,nomeFantasia:this.filtro.nomeFantasia||null,razaoSocial:this.filtro.razaoSocial||null,porteEmpresa:this.filtro.porte&&this.filtro.porte.length?this.filtro.porte:null}),this.loading=!1},async exibirRegistro(e){this.loading=!0;const t=await this.exibir(e);t&&!t.erro&&(this.formulario={id:t.id||null,cnpj:t.cnpj||null,status:t.status_empresa_id||null,nomeFantasia:t.nome_fantasia||null,razaoSocial:t.razao_social||null,dataCadastro:t.data_cadastro?this.$day(t.data_cadastro).format("DD/MM/YYYY"):null,inscricaoEstadual:t.inscricao_estadual||null,inscricaoMunicipal:t.inscricao_municipal||null,porte:t.porte_empresa_id||null,cep:t.cep||null,logradouro:t.logradouro||null,enderecoNumero:t.numero||null,complemento:t.complemento||null,bairro:t.bairro||null,estado:t.estado||null,cidade:t.cidade||null,created_by:t.created_by||null,created_at:t.created_at?this.$day(t.created_at).format("DD/MM/YYYY HH:mm:ss"):null}),this.modal=!0,this.controle.exibir=!0,this.loading=!1},async salvarRegistro(){if(await this.$refs.observer.validate()){const e=this.$dataValidade(this.formulario.dataCadastro);if(e)return void(e&&this.$refs.observer.setErrors({dataCadastro:[e]}));this.loading=!0;const t={id:this.formulario.id||void 0,cnpj:this.formulario.cnpj?String(this.formulario.cnpj).match(/\d/g).join(""):void 0,nomeFantasia:this.formulario.nomeFantasia||void 0,razaoSocial:this.formulario.razaoSocial||void 0,inscricaoEstadual:this.formulario.inscricaoEstadual||void 0,inscricaoMunicipal:this.formulario.inscricaoMunicipal||void 0,porte:this.formulario.porte||void 0,dataCadastro:this.formulario.dataCadastro?this.$day(this.formulario.dataCadastro,"DD/MM/YYYY").format("YYYY-MM-DD"):void 0,cep:this.formulario.cep?String(this.formulario.cep).match(/\d/g).join(""):void 0,logradouro:this.formulario.logradouro||void 0,estado:this.formulario.estado||void 0,cidade:this.formulario.cidade||void 0,enderecoNumero:this.formulario.enderecoNumero||void 0,complemento:this.formulario.complemento||void 0,bairro:this.formulario.bairro||void 0};let a;a=t.id?await this.editar(t):await this.salvar(t),a&&!a.erro&&(this.modal=!1,this.exibirRegistro(a.id)),this.loading=!1}},async excluirRegistro(){this.loading=!0;const e=await this.excluir(this.formulario.id);e&&!e.erro&&(this.modal=!1,this.resetFormulario(),this.listarRegistro()),this.loading=!1},resetFormulario(){this.$refs.observer.reset(),this.formulario={id:null,cnpj:null,status:null,nomeFantasia:null,razaoSocial:null,dataCadastro:null,inscricaoEstadual:null,inscricaoMunicipal:null,porte:null,cep:null,logradouro:null,enderecoNumero:null,estado:null,cidade:null,complemento:null,bairro:null,created_at:null,created_by:null},this.controle={exibir:!1,editar:!1,inserir:!1},this.buscarDropdownCidade("RO"),this.listarRegistro()},limparFiltros(){this.filtro={id:null,cnpj:null,cidade:[],status:[],nomeFantasia:null,razaoSocial:null,porte:[]}}}},f=p,v=a("2877"),b=Object(v["a"])(f,c,h,!1,null,null,null);t["default"]=b.exports},8336:function(e,t,a){"use strict";a("86cc");var i=a("10d2"),s=a("22da"),r=a("4e82"),o=a("f2e7"),l=a("c995"),n=a("fe6c"),d=a("1c87"),u=a("af2b"),c=a("58df"),h=a("d9bd");const m=Object(c["a"])(i["a"],d["a"],n["a"],u["a"],Object(r["a"])("btnToggle"),Object(o["b"])("inputValue"));t["a"]=m.extend().extend({name:"v-btn",props:{activeClass:{type:String,default(){return this.btnToggle?this.btnToggle.activeClass:""}},block:Boolean,depressed:Boolean,fab:Boolean,icon:Boolean,loading:Boolean,outlined:Boolean,plain:Boolean,retainFocusOnClick:Boolean,rounded:Boolean,tag:{type:String,default:"button"},text:Boolean,tile:Boolean,type:{type:String,default:"button"},value:null},data:()=>({proxyClass:"v-btn--active"}),computed:{classes(){return{"v-btn":!0,...d["a"].options.computed.classes.call(this),"v-btn--absolute":this.absolute,"v-btn--block":this.block,"v-btn--bottom":this.bottom,"v-btn--disabled":this.disabled,"v-btn--is-elevated":this.isElevated,"v-btn--fab":this.fab,"v-btn--fixed":this.fixed,"v-btn--has-bg":this.hasBg,"v-btn--icon":this.icon,"v-btn--left":this.left,"v-btn--loading":this.loading,"v-btn--outlined":this.outlined,"v-btn--plain":this.plain,"v-btn--right":this.right,"v-btn--round":this.isRound,"v-btn--rounded":this.rounded,"v-btn--router":this.to,"v-btn--text":this.text,"v-btn--tile":this.tile,"v-btn--top":this.top,...this.themeClasses,...this.groupClasses,...this.elevationClasses,...this.sizeableClasses}},computedElevation(){if(!this.disabled)return l["a"].options.computed.computedElevation.call(this)},computedRipple(){var e;const t=!this.icon&&!this.fab||{circle:!0};return!this.disabled&&(null!==(e=this.ripple)&&void 0!==e?e:t)},hasBg(){return!this.text&&!this.plain&&!this.outlined&&!this.icon},isElevated(){return Boolean(!this.icon&&!this.text&&!this.outlined&&!this.depressed&&!this.disabled&&!this.plain&&(null==this.elevation||Number(this.elevation)>0))},isRound(){return Boolean(this.icon||this.fab)},styles(){return{...this.measurableStyles}}},created(){const e=[["flat","text"],["outline","outlined"],["round","rounded"]];e.forEach(([e,t])=>{this.$attrs.hasOwnProperty(e)&&Object(h["a"])(e,t,this)})},methods:{click(e){!this.retainFocusOnClick&&!this.fab&&e.detail&&this.$el.blur(),this.$emit("click",e),this.btnToggle&&this.toggle()},genContent(){return this.$createElement("span",{staticClass:"v-btn__content"},this.$slots.default)},genLoader(){return this.$createElement("span",{class:"v-btn__loader"},this.$slots.loader||[this.$createElement(s["a"],{props:{indeterminate:!0,size:23,width:2}})])}},render(e){const t=[this.genContent(),this.loading&&this.genLoader()],{tag:a,data:i}=this.generateRouteLink(),s=this.hasBg?this.setBackgroundColor:this.setTextColor;return"button"===a&&(i.attrs.type=this.type,i.attrs.disabled=this.disabled),i.attrs.value=["string","number"].includes(typeof this.value)?this.value:JSON.stringify(this.value),e(a,this.disabled?i:s(this.color,i),t)}})},"86cc":function(e,t,a){},"8d4f":function(e,t,a){},a523:function(e,t,a){"use strict";a("20f68"),a("4b85");var i=a("2b0e");function s(e){return i["a"].extend({name:"v-"+e,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(t,{props:a,data:i,children:s}){i.staticClass=`${e} ${i.staticClass||""}`.trim();const{attrs:r}=i;if(r){i.attrs={};const e=Object.keys(r).filter(e=>{if("slot"===e)return!1;const t=r[e];return e.startsWith("data-")?(i.attrs[e]=t,!1):t||"string"===typeof t});e.length&&(i.staticClass+=" "+e.join(" "))}return a.id&&(i.domProps=i.domProps||{},i.domProps.id=a.id),t(a.tag,i,s)}})}var r=a("d9f7");t["a"]=s("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(e,{props:t,data:a,children:i}){let s;const{attrs:o}=a;return o&&(a.attrs={},s=Object.keys(o).filter(e=>{if("slot"===e)return!1;const t=o[e];return e.startsWith("data-")?(a.attrs[e]=t,!1):t||"string"===typeof t})),t.id&&(a.domProps=a.domProps||{},a.domProps.id=t.id),e(t.tag,Object(r["a"])(a,{staticClass:"container",class:Array({"container--fluid":t.fluid}).concat(s||[])}),i)}})},c6a6:function(e,t,a){"use strict";a("2bfd");var i=a("b974"),s=a("8654"),r=a("d9f7"),o=a("80d2");const l={...i["b"],offsetY:!0,offsetOverflow:!0,transition:!1};t["a"]=i["a"].extend({name:"v-autocomplete",props:{autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:(e,t,a)=>a.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1},hideNoData:Boolean,menuProps:{type:i["a"].options.props.menuProps.type,default:()=>l},noFilter:Boolean,searchInput:{type:String}},data(){return{lazySearch:this.searchInput}},computed:{classes(){return{...i["a"].options.computed.classes.call(this),"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1}},computedItems(){return this.filteredItems},selectedValues(){return this.selectedItems.map(e=>this.getValue(e))},hasDisplayedItems(){return this.hideSelected?this.filteredItems.some(e=>!this.hasItem(e)):this.filteredItems.length>0},currentRange(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems(){return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter(e=>{const t=Object(o["q"])(e,this.itemText),a=null!=t?String(t):"";return this.filter(e,String(this.internalSearch),a)})},internalSearch:{get(){return this.lazySearch},set(e){this.lazySearch!==e&&(this.lazySearch=e,this.$emit("update:search-input",e))}},isAnyValueAllowed(){return!1},isDirty(){return this.searchIsDirty||this.selectedItems.length>0},isSearching(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps(){const e=i["a"].options.computed.$_menuProps.call(this);return e.contentClass=("v-autocomplete__content "+(e.contentClass||"")).trim(),{...l,...e}},searchIsDirty(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem(){return this.multiple?null:this.selectedItems.find(e=>this.valueComparator(this.getValue(e),this.getValue(this.internalValue)))},listData(){const e=i["a"].options.computed.listData.call(this);return e.props={...e.props,items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch},e}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused(e){e?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.blur(),this.updateSelf())},isMenuActive(e){!e&&this.hasSlot&&(this.lazySearch=null)},items(e,t){t&&t.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!e.length||this.activateMenu()},searchInput(e){this.lazySearch=e},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created(){this.setSearch()},destroyed(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged(e,t){if(e!==t){if(!this.autoSelectFirst){const a=t[this.$refs.menu.listIndex];a?this.setMenuIndex(e.findIndex(e=>e===a)):this.setMenuIndex(-1),this.$emit("update:list-index",this.$refs.menu.listIndex)}this.$nextTick(()=>{this.internalSearch&&(1===e.length||this.autoSelectFirst)&&(this.$refs.menu.getTiles(),this.autoSelectFirst&&e.length&&(this.setMenuIndex(0),this.$emit("update:list-index",this.$refs.menu.listIndex)))})}},onInternalSearchChanged(){this.updateMenuDimensions()},updateMenuDimensions(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex(e){this.searchIsDirty||(this.multiple&&e===o["w"].left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&e===o["w"].right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:e!==o["w"].backspace&&e!==o["w"].delete||this.deleteCurrentItem())},deleteCurrentItem(){const e=this.selectedIndex,t=this.selectedItems[e];if(!this.isInteractive||this.getDisabled(t))return;const a=this.selectedItems.length-1;if(-1===this.selectedIndex&&0!==a)return void(this.selectedIndex=a);const i=this.selectedItems.length,s=e!==i-1?e:e-1,r=this.selectedItems[s];r?this.selectItem(t):this.setValue(this.multiple?[]:null),this.selectedIndex=s},clearableCallback(){this.internalSearch=null,i["a"].options.methods.clearableCallback.call(this)},genInput(){const e=s["a"].options.methods.genInput.call(this);return e.data=Object(r["a"])(e.data,{attrs:{"aria-activedescendant":Object(o["o"])(this.$refs.menu,"activeTile.id"),autocomplete:Object(o["o"])(e.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),e},genInputSlot(){const e=i["a"].options.methods.genInputSlot.call(this);return e.data.attrs.role="combobox",e},genSelections(){return this.hasSlot||this.multiple?i["a"].options.methods.genSelections.call(this):[]},onClick(e){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(e.target)||this.activateMenu())},onInput(e){if(this.selectedIndex>-1||!e.target)return;const t=e.target,a=t.value;t.value&&this.activateMenu(),this.multiple||""!==a||this.deleteCurrentItem(),this.internalSearch=a,this.badInput=t.validity&&t.validity.badInput},onKeyDown(e){const t=e.keyCode;!e.ctrlKey&&[o["w"].home,o["w"].end].includes(t)||i["a"].options.methods.onKeyDown.call(this,e),this.changeSelectedIndex(t)},onSpaceDown(e){},onTabDown(e){i["a"].options.methods.onTabDown.call(this,e),this.updateSelf()},onUpDown(e){e.preventDefault(),this.activateMenu()},selectItem(e){i["a"].options.methods.selectItem.call(this,e),this.setSearch()},setSelectedItems(){i["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch(){this.$nextTick(()=>{this.multiple&&this.internalSearch&&this.isMenuActive||(this.internalSearch=!this.selectedItems.length||this.multiple||this.hasSlot?null:this.getText(this.selectedItem))})},updateSelf(){(this.searchIsDirty||this.internalValue)&&(this.multiple||this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem(e){return this.selectedValues.indexOf(this.getValue(e))>-1},onCopy(e){var t,a;if(-1===this.selectedIndex)return;const i=this.selectedItems[this.selectedIndex],s=this.getText(i);null===(t=e.clipboardData)||void 0===t||t.setData("text/plain",s),null===(a=e.clipboardData)||void 0===a||a.setData("text/vnd.vuetify.autocomplete.item+plain",s),e.preventDefault()}}})}}]);
//# sourceMappingURL=chunk-5f4593bb.54ac3c7d.js.map