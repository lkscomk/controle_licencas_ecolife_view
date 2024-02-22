<template>
  <div v-resize="newCalculaTableHeigth">
    <v-data-table
      id="10"
      ref="tabela"
      v-model="selected"
      v-sortable-table="sortable"
      :class="
        flat ? 'elevation-0 componente-tabela' : 'elevation-1 componente-tabela'
      "
      :custom-filter="fnSearch"
      :custom-sort="customSort"
      :disable-pagination="semRodape || semRodapeExpand || !!search"
      :expanded.sync="expanded"
      :headers="colunas"
      :height="
        heightAuto ? (registros.length >= 20 ? tableHeight : '') : height || ''
      "
      :hide-default-header="hideDefaultHeader"
      :item-key="itemKey"
      :item-class="itemClass"
      :items="
        selectedExpand.length
          ? selectedExpand
          : registros.length
            ? registros
            : []
      "
      :items-per-page="rowsPerPage || 100"
      :loading="loading"
      :mobile-breakpoint="0"
      :page="page"
      :server-items-length="itensServidor"
      :show-select="selecionar"
      :single-select="singleSelect"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :single-expand="expand"
      :show-expand="expand"
      :search="search"
      calculate-widths
      dense
      fixed-header
      hide-default-footer
      style="border-radius: 0px !important;"
      @sorted="$emit('sorted', $event)"
      @click:row="noClickRow ? '' : $emit('select', $event)"
      @dblclick:row="acaoDbClick"
      @update:options="alterarPaginacao($event)"
      @item-selected="$emit('itemSelecionado', $event)"
      @toggle-select-all="todosSelecionados($event)"
    >
      <template v-slot:[`item.customAcao`]="{ item }">
        <v-btn
          x-small
          icon
          text
          tabindex="-1"
          @click="$emit('custom:valor:remove', item)"
        >
          <v-icon color="error">
            mdi-window-close
          </v-icon>
        </v-btn>
      </template>

      <template v-slot:[`item.inputValor`]="{ item, index }">
        <v-text-field
          :ref="`input_${index}`"
          v-model="item.inputValor"
          v-moeda="{ negativo: false, decimal: 2 }"
          :disabled="customValorDesabilitado"
          dense
          outlined
          class="elevation-0 ma-0"
          hide-details="auto"
          @blur="$emit('custom:valor:blur', { item, $event })"
          @keyup.enter="
            $emit('custom:valor:enter', { item, $event }),
            $refs[`input_${index + 1}`]
              ? $refs[`input_${index + 1}`].focus()
              : $emit('custom:valor:input')
          "
        />
      </template>

      <template
        v-for="(coluna, index) in colunasCustomizadas"
        v-slot:[`item.${coluna}`]="{ value }"
      >
        <span
          v-if="typeof value === 'object' && value !== null"
          :key="index"
          :class="value.class"
          :style="value.style"
        >
          {{ value.text }}
        </span>
        <span
          v-else
          :key="String(index)"
          class="font-weight-mediun"
          v-html="value"
        />
      </template>

      <template
        v-for="(colPadrao, index) in customizadas"
        v-slot:[`item.${colPadrao}`]="{ value }"
      >
        <span
          :key="index"
          v-html="value"
        />
      </template>

      <template
        v-for="(htmlCol, index) in htmlCols"
        v-slot:[`item.${htmlCol.value}`]="{ value }"
      >
        <span
          :key="index"
          v-html="value"
        />
      </template>

      <template v-slot:top="{ items }">
        <v-toolbar
          v-if="toolbarGrid"
          :height="toolbarHight"
          :style="corToolbar ? `background: ${corToolbar}` : ''"
          dense
          flat
        >
          <v-btn
            v-if="voltarListagem"
            :title="tituloVoltar"
            icon
            width="30"
            small
            @click="$emit('voltar')"
          >
            <v-icon
              pl-3
              dark
            >
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-toolbar-title class="pa-0 ma-0 subtitle-2 font-weight-medium">
            {{ titulo }}
          </v-toolbar-title>
          <span
            v-if="subtitulo"
            class="body-2 font-weight-light mt-1"
          >
            {{ subtitulo }}
          </span>
          <v-divider
            v-if="titulo || subtitulo"
            vertical
            inset
            style="border-width: 1px; border-color: #fff5; border-radius: 25%;"
            size="30"
            class="mx-2"
          />
          <slot
            :items="items"
            name="titulo"
          />
          <v-spacer />
          <slot name="botoes" />
          <v-menu
            v-if="$slots.maisOpcoes"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-tooltip
                activator=".btn_mais_opcoes"
                bottom
              >
                <span>Mais Opções</span>
              </v-tooltip>
              <v-btn
                :color="$vuetify.theme.dark ? '' : 'primary darken-1'"
                :loading="loading"
                class="btn_mais_opcoes mx-0 ml-2"
                dark
                small
                icon
                v-on="on"
              >
                <v-icon>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>
            <slot name="maisOpcoes" />
          </v-menu>
        </v-toolbar>
        <v-card
          v-if="items"
          flat
        >
          <slot name="cabecalho" />
        </v-card>
        <v-divider v-if="toolbarGrid" />
      </template>
      <template
        v-if="hideDefaultHeader"
        v-slot:[`header`]="{ props, on }"
      >
        <thead class="v-data-table-header mb-3">
          <tr class="table-filters">
            <th
              v-for="(header, idx) in props.headers"
              :key="idx"
              :style="{
                width: `${header.width}px !important`,
                minWidth: `${header.width}px !important`
              }"
            >
              <template
                v-if="header.value === 'data-table-select' && selecionar"
              >
                <v-simple-checkbox
                  v-model="allSelected"
                  :ripple="false"
                  @click="on[`toggle-select-all`](allSelected)"
                />
              </template>
              <slot
                v-if="header.value !== 'acao'"
                :header="header"
                :on="on"
                :name="header.value"
              />
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:[`item.id`]="{ item }">
        <span
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          style="cursor: pointer"
          @click="$emit('exibir', item[itemKey])"
        >
          {{ item.id }}
        </span>
      </template>
      <template v-slot:[`item.personalizado`]="{ item }">
        <slot
          :registro="item"
          :fabs="fabs"
          name="personalizado"
        />
      </template>
      <template v-slot:[`item.personalizado2`]="{ item }">
        <slot
          :registro="item"
          :fabs="fabs"
          name="personalizado2"
        />
      </template>
      <template v-slot:[`item.personalizado3`]="{ item }">
        <slot
          :registro="item"
          :fabs="fabs"
          name="personalizado3"
        />
      </template>
      <template v-slot:[`item.depositoAjusteDebito`]="{ item }">
        <slot
          :registro="item"
          :fabs="fabs"
          name="depositoAjusteDebito"
        />
      </template>
      <template v-slot:[`item.depositoAjusteCredito`]="{ item }">
        <slot
          :registro="item"
          :fabs="fabs"
          name="depositoAjusteCredito"
        />
      </template>
      <template v-slot:[`item.contaDepositoT01t`]="{ item }">
        <span
          v-if="item && item.contaDepositoT01t === 'S'"
          title="Ativo"
        >
          <v-icon
            color="green"
            size="20"
            title="Ativo"
          >
            mdi-check
          </v-icon>
        </span>
        <span
          v-if="item && item.contaDepositoT01t === 'N'"
          style="color: green; font-weight: bold;"
        >
          <v-icon
            color="error"
            size="20"
            title="Inativo"
          >
            mdi-close
          </v-icon>
        </span>
        <span
          v-if="item && !item.contaDepositoT01t"
          style="font-weight: bold;"
        >
          -
        </span>
      </template>
      <template v-slot:[`item.formaEnvio`]="{ item }">
        <span
          v-if="item.formaEnvio === 'ENTREGA'"
          style="color: green; font-weight: bold;"
        >
          <v-icon
            color="primary"
            size="20"
            title="Entrega"
          >
            mdi-truck-fast
          </v-icon>
          {{ item.formaEnvio }}
        </span>
        <span
          v-if="item.formaEnvio === 'RETIRADA'"
          style="color: #2196f3; font-weight: bold;"
        >
          <v-icon
            color="#2196f3"
            size="20"
            title="Retirada"
          >
            mdi-cart
          </v-icon>
          {{ item.formaEnvio }}
        </span>
      </template>
      <template v-slot:[`item.disponibilidade`]="{ item }">
        <v-btn
          v-if="item.disponibilidade === 'DISPONIVEL'"
          style="color: #2196f3;"
          class="font-weight-bold"
          depressed
          small
          text
        >
          {{ item.disponibilidade }}
        </v-btn>
        <v-btn
          v-if="item.disponibilidade === 'ALUGADO'"
          style="color: #d35400;"
          class="font-weight-bold"
          depressed
          small
          text
        >
          {{ item.disponibilidade }}
        </v-btn>
      </template>
      <template v-slot:[`item.agendamento`]="{ item }">
        <span style="color: #000000; font-weight: bold;">
          {{ item.agendamento }}
        </span>
      </template>

      <template v-slot:[`item.acao`]="{ item }">
        <slot
          :registro="item"
          :expand="expandTable"
          :expandUndo="expandUndoTable"
          :fabs="fabs"
          name="acao"
        />
        <v-btn
          v-if="excluir"
          :color="$vuetify.theme.dark ? 'white' : 'error'"
          class="botao-acao-tabela"
          data-cy="btnTableExibir"
          icon
          title="Excluir Registro"
          @click="$emit('excluir', item)"
        >
          <v-icon size="20">
            mdi-delete
          </v-icon>
        </v-btn>
        <v-btn
          v-if="sortable"
          :loading="loading"
          :disabled="desabilitado"
          class="sortHandle botao-acao-tabela ml-1 mr-2"
          color="secondary"
          icon
          style="cursor: move"
          title="Mover"
        >
          <v-icon size="20">
            mdi-drag-variant
          </v-icon>
        </v-btn>
        <v-btn
          v-if="acessar"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :disabled="desabilitado"
          :loading="loading"
          class="botao-acao-tabela"
          data-cy="btnTableAcessar"
          icon
          title="Acessar Registro"
          @click="$emit('acessar', item[itemKey])"
        >
          <v-icon size="20">
            mdi-open-in-app
          </v-icon>
        </v-btn>
        <v-btn
          v-if="btnExpandTable"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :disabled="desabilitado"
          :loading="loading"
          :title="
            !selectedExpand.length ? 'Expandir registro' : 'Recolher registro'
          "
          class="botao-acao-tabela"
          data-cy="btnTableExpandTable"
          icon
          @click="
            !selectedExpand.length ? expandTable(item) : expandUndoTable()
          "
        >
          <v-icon size="20">
            {{ !selectedExpand.length ? "mdi-chevron-down" : "mdi-chevron-up" }}
          </v-icon>
        </v-btn>
        <v-btn
          v-if="btnExpand"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :disabled="desabilitado"
          :loading="loading"
          class="botao-acao-tabela"
          data-cy="btnTableExpand"
          icon
          title="Expandir registro"
          @click="$emit('btnExpand', item)"
        >
          <v-icon size="20">
            mdi-chevron-down
          </v-icon>
        </v-btn>
        <v-btn
          v-if="btnExpandUndo"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :disabled="desabilitado"
          :loading="loading"
          class="botao-acao-tabela"
          data-cy="btnTableExpandUndo"
          icon
          title="Encolher registro"
          @click="$emit('btnExpandUndo', item)"
        >
          <v-icon size="20">
            mdi-chevron-up
          </v-icon>
        </v-btn>
        <v-btn
          v-if="exibir"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :disabled="desabilitado"
          :loading="loading"
          class="botao-acao-tabela"
          data-cy="btnTableExibir"
          icon
          title="Exibir registro"
          @click="$emit('exibir', item[itemKey])"
        >
          <v-icon size="20">
            mdi-eye
          </v-icon>
        </v-btn>
        <v-btn
          v-if="exibirLinha"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :disabled="desabilitado"
          :loading="loading"
          class="botao-acao-tabela"
          data-cy="btnTableExibirLinha"
          icon
          title="Exibir registro"
          @click="$emit('exibirLinha', item)"
        >
          <v-icon size="20">
            mdi-eye
          </v-icon>
        </v-btn>
        <v-btn
          v-if="escolher"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :disabled="desabilitado"
          :loading="loading"
          class="botao-acao-tabela"
          data-cy="btnTableEscolher"
          icon
          title="Escolher registro"
          @click.stop="$emit('escolher', item[itemKey])"
        >
          <v-icon size="20">
            mdi-check-bold
          </v-icon>
        </v-btn>
        <v-btn
          v-if="selecionarLinha"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :disabled="desabilitado"
          :loading="loading"
          class="botao-acao-tabela"
          data-cy="btnTableEscolher"
          icon
          title="Escolher registro"
          @click="$emit('selecionarLinha', item)"
        >
          <v-icon size="20">
            mdi-check-bold
          </v-icon>
        </v-btn>
        <v-btn
          v-if="editar"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :disabled="desabilitado"
          :loading="loading"
          class="botao-acao-tabela"
          data-cy="btnTableEditar"
          icon
          title="Editar Registro"
          @click="$emit('editar', item[itemKey])"
        >
          <v-icon size="20">
            mdi-lead-pencil
          </v-icon>
        </v-btn>
        <v-btn
          v-if="moveUp"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :disabled="desabilitado || desabilitadoMover"
          :loading="loading"
          class="botao-acao-tabela ml-1"
          data-cy="btnTableMoveUp"
          icon
          title="Mover Para Cima"
          @click="$emit('moveUp', item[itemKey])"
        >
          <v-icon size="20">
            mdi-arrow-up-bold-box-outline
          </v-icon>
        </v-btn>
        <v-btn
          v-if="moveDown"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :disabled="desabilitado || desabilitadoMover"
          :loading="loading"
          class="botao-acao-tabela"
          data-cy="btnTableMoveDown"
          icon
          title="Mover Para Baixo"
          @click="$emit('moveDown', item[itemKey])"
        >
          <v-icon size="20">
            mdi-arrow-down-bold-box-outline
          </v-icon>
        </v-btn>
        <v-btn
          v-if="resetSenhaUsuario"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :loading="loading"
          class="botao-acao-tabela"
          data-cy="btnTableResetSenhaUsuario"
          icon
          title="Redefinir senha"
          @click="$emit('resetSenhaUsuario', item[itemKey])"
        >
          <v-icon size="20">
            mdi-lock-reset
          </v-icon>
        </v-btn>
        <v-btn
          v-if="configuracao"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :loading="loading"
          class="botao-acao-tabela ml-2"
          data-cy="btnTableConfiguracao"
          icon
          title="Configuração"
          @click="$emit('configuracao', item[itemKey])"
        >
          <v-icon size="20">
            mdi-cogs
          </v-icon>
        </v-btn>
        <v-btn
          v-if="auditoria"
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :loading="loading"
          class="botao-acao-tabela ml-2"
          data-cy="btnTableAuditoria"
          icon
          title="Auditoria"
          @click="$emit('auditoria', item)"
        >
          <v-icon size="20">
            mdi-history
          </v-icon>
        </v-btn>
        <v-btn
          v-if="generico"
          :color="genericoColor ? genericoColor : $vuetify.theme.dark ? 'white' : 'primary'"
          :disabled="genericoDisabled"
          :loading="loading"
          class="botao-acao-tabela ml-2"
          data-cy="btnGenerico"
          icon
          :title="genericoTitle"
          @click="$emit('generico', item)"
        >
          <v-icon size="20">
            {{ genericoIcon }}
          </v-icon>
        </v-btn>
        <slot
          :registro="item"
          :expand="expandTable"
          :expandUndo="expandUndoTable"
          :fabs="fabs"
          name="acaoAppend"
        />
      </template>
      <template v-slot:[`item.icone`]="{ value }">
        <v-icon
          v-if="value"
          :color="value && value.color ? value.color : ''"
          :title="value && value.title ? value.title : ''"
          size="25"
        >
          {{ value && value.icon ? value.icon : value }}
        </v-icon>
      </template>
      <template
        v-slot:[`item.workflowCalculoInfo`]="{ value }"
      >
        <tt-btn
          icone="mdi-shield-lock-outline"
          icon
          small
          color="primary"
          tooltip-label="Workflow de aprovação"
          @click="$emit('workflowCalculoInfo',value)"
        />
      </template>
      <!-- <template v-slot:[`item.problema`]="{ value }">
        <v-icon
          :color="value ? 'error' : 'green'"
          :title="value ? 'SIM' : 'NÃO'"
          size="25"
        >
          {{ value ? 'mdi-alert-outline' : 'mdi-check-all' }}
        </v-icon>
      </template> -->
      <template v-slot:[`item.imagem`]="{ item }">
        <v-img
          v-if="item.imagem"
          :src="item.imagem"
          height="30"
          width="30"
        />
      </template>
      <template v-slot:[`item.imagemBanco`]="{ item }">
        <!-- TODO: Requer um objeto -->
        <!-- imagemBanco: {
          imagem: '',
          descricao: ''
        } -->
        <div class="d-flex align-center justify-start">
          <v-img
            :src="item.imagemBanco.imagem"
            class="my-1"
            contain
            width="100%"
            height="100%"
            max-height="30"
            max-width="35"
            min-height="30"
            min-width="35"
          />
          <div class="py-2 ml-3">
            {{ item.imagemBanco.descricao }}
          </div>
        </div>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td
          :colspan="headers.length"
          class="pa-0"
        >
          <slot
            :registros="item"
            name="expandir"
          />
        </td>
      </template>
      <template v-slot:[`item.observacao`]="{ value }">
        {{
          value && value.length >= observacaoSliceSize
            ? `${value.substring(0, observacaoSliceSize)} [...]`
            : value
        }}
      </template>
      <template v-slot:[`item.${htmlColumn}`]="{ value }">
        <div v-html="value" />
      </template>
      <template
        v-for="(item, idx) in htmlColumnArray"
        v-slot:[`item.${item}`]="{ value }"
      >
        <div
          :key="idx"
          v-html="value"
        />
      </template>

      <template v-slot:[`item.tipo`]="{ item, value }">
        <v-btn
          v-if="value && value.chip"
          :color="value.color ? value.color : 'primary'"
          :class="`font-weight-bold ${value.class ? value.class : ''}`"
          depressed
          small
          text
        >
          {{ value.text }}
        </v-btn>

        <v-progress-circular
          v-else
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :size="20"
          :width="2"
          indeterminate
        />

        <v-tooltip
          v-if="value && value.tooltip"
          bottom
          :activator="`#${item.empresa}`"
        >
          {{ value.tooltip }}
        </v-tooltip>
      </template>
      <template v-slot:[`item.${statusTag}`]="{ item, value }">
        <v-btn
          v-if="value && value.chip"
          :color="value.color ? value.color : 'primary'"
          :class="`font-weight-bold ${value.class ? value.class : ''}`"
          depressed
          small
          text
        >
          {{ value.text }}
        </v-btn>

        <v-progress-circular
          v-else
          :color="$vuetify.theme.dark ? 'white' : 'primary'"
          :size="20"
          :width="2"
          indeterminate
        />

        <v-tooltip
          v-if="value && value.tooltip"
          bottom
          :activator="`#${item.empresa}`"
        >
          {{ value.tooltip }}
        </v-tooltip>
      </template>
      <template v-slot:[`item.link`]="{ value }">
        <v-tooltip
          v-if="value"
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              :color="$vuetify.theme.dark ? 'white' : 'primary'"
              :to="{ name: value.to }"
              icon
              small
              v-on="on"
            >
              <v-icon>
                mdi-link
              </v-icon>
            </v-btn>
          </template>
          <span>Ir para o depósito código: {{ value.depositoId }}</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.progresso`]="{ item }">
        <v-progress-linear
          v-if="item.progresso"
          :color="
            item.progressoNumero < 30
              ? '#B0BEC5'
              : item.progressoNumero > 30 && item.progressoNumero < 90
                ? '#FFC107'
                : '#29B6F6'
          "
          :value="item.progressoNumero"
          height="20"
          reactive
        >
          <div v-html="item.progresso" />
        </v-progress-linear>
      </template>
      <template v-slot:[`item.campoEdit`]="{ item }">
        <v-row
          class="pa-0 mx-1"
          dense
        >
          <v-col
            cols="12"
            class="pa-0 mx-4 my-0"
          >
            <v-text-field
              v-model="item.campoEdit"
              v-moeda="{ negativo: false, decimal: 3 }"
              hide-details
              dense
              text
              @change="$emit('campoEdit', item)"
            />
          </v-col>
        </v-row>
      </template>
      <template v-slot:[`item.campoEdit2`]="{ item }">
        <v-row
          class="pa-0 mx-1"
          dense
        >
          <v-col
            cols="12"
            class="pa-0 mx-4 my-0"
          >
            <v-text-field
              v-model="item.campoEdit2"
              v-moeda="{ negativo: false, decimal: 2 }"
              hide-details
              dense
              text
              @change="$emit('campoEdit2', item)"
            />
          </v-col>
        </v-row>
      </template>
      <template v-slot:[`item.campoEdit3`]="{ item }">
        <v-row
          class="pa-0 mx-1"
          dense
        >
          <v-col
            cols="12"
            class="pa-0 mx-4 my-0"
          >
            <v-text-field
              v-model="item.campoEdit3"
              v-mask="mascara('T', 255)"
              hide-details
              dense
              text
              @change="$emit('campoEdit3', item)"
            />
          </v-col>
        </v-row>
      </template>

      <template v-slot:[`item.campoInputEdit`]="{ item, index }">
        <v-row
          dense
        >
          <v-col
            cols="12"
          >
            <v-text-field
              v-if="campoInputModoEdicao"
              :ref="`campo_input_edit_${index}`"
              v-model="item.campoInputEdit"
              v-moeda="campoInputInteiro ? { negativo: false, decimal: 0 } : { negativo: false, decimal: 3 }"
              :reverse="campoInputEditReverse"
              hide-details
              dense
              outlined
              @change="$emit('campoInputEdit', item)"
              @keyup.enter="
                $emit('campoInputEdit:enter', { item, $event }),
                $refs[`campo_input_edit_${index + 1}`]
                  ? $refs[`campo_input_edit_${index + 1}`].focus()
                  : $emit('campoInputEdit:input')
              "
            />
            <span v-if="!campoInputModoEdicao">
              {{ item.campoInputEdit }}
            </span>
          </v-col>
        </v-row>
      </template>
      <template v-slot:[`item.campoInputEdit1`]="{ item, index }">
        <v-row
          dense
        >
          <v-col
            cols="12"
          >
            <v-text-field
              v-if="campoInputModoEdicao"
              :ref="`campo_input_edit_${index}`"
              v-model="item.campoInputEdit1"
              v-moeda="campoInputInteiro ? { negativo: false, decimal: 0 } : { negativo: false, decimal: 3 }"
              :reverse="campoInputEditReverse"
              hide-details
              dense
              outlined
              @change="$emit('campoInputEdit1', item)"
              @keyup.enter="
                $emit('campoInputEdit1:enter', { item, $event }),
                $refs[`campoInputEdit1${index + 1}`]
                  ? $refs[`campoInputEdit1${index + 1}`].focus()
                  : $emit('campoInputEdit1:input')
              "
            />
            <span v-if="!campoInputModoEdicao">
              {{ item.campoInputEdit1 }}
            </span>
          </v-col>
        </v-row>
      </template>

      <template v-slot:[`item.fieldInputEdit`]="{ item, index }">
        <v-row
          dense
        >
          <v-col
            cols="12"
          >
            <v-text-field
              v-if="fieldInputModoEdicao"
              :ref="`field_input_edit_${index}`"
              v-model="item.fieldInputEdit"
              v-moeda="fieldInputInteiro ? { negativo: false, decimal: 0 } : { negativo: false, decimal: 3 }"
              :reverse="fieldInputEditReverse"
              hide-details
              dense
              outlined
              @change="$emit('fieldInputEdit', item)"
              @keyup.enter="
                $emit('fieldInputEdit:enter', { item, $event }),
                $refs[`field_input_edit_${index + 1}`]
                  ? $refs[`field_input_edit_${index + 1}`].focus()
                  : $emit('fieldInputEdit:input')
              "
            />
            <span v-if="!fieldInputModoEdicao">
              {{ item.fieldInputEdit }}
            </span>
          </v-col>
        </v-row>
      </template>
      <template v-slot:[`item.descricaoStatus`]="{ item }">
        <v-btn
          :color="
            item.descricaoStatus.includes('003')
              ? 'grey'
              : item.descricaoStatus.includes('004')
                ? 'error'
                : item.descricaoStatus.includes('005')
                  ? 'orange darken-1'
                  : item.descricaoStatus.includes('001')
                    ? 'green darken-3'
                    : item.descricaoStatus.includes('002')
                      ? 'yellow darken-1'
                      : 'indigo darken-4'
          "
          text
          elevation="0"
          dense
          small
          style="cursor: default"
        >
          <span class="font-weight-bold">
            {{ item.descricaoStatus.split('-')[1] }}
          </span>
        </v-btn>
      </template>
      <template v-slot:[`item.habilitado`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :color="[1, '1', '1 - REALIZADO'].includes(item.habilitado) ? 'green' : 'red'"
              dark
              v-bind="attrs"
              v-on="on"
            >
              mdi-circle
            </v-icon>
          </template>
          <span>{{ [1, '1', '1 - REALIZADO'].includes(item.habilitado) ? 'Habilitado' : 'Desabilitado' }}</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.descricaoStatusProdutos`]="{ item }">
        <v-btn
          :color="
            item.descricaoStatusProdutos.includes('FINALIZADO CONF')
              ? 'grey'
              : item.descricaoStatusProdutos.includes('CONF DIVERGENTE')
                ? 'error'
                : item.descricaoStatusProdutos.includes('CORRIGIDO')
                  ? 'orange darken-1'
                  : item.descricaoStatusProdutos.includes('AGUARD CONF')
                    ? 'light-green darken-1'
                    : item.descricaoStatusProdutos.includes('INICIADO LEITURA')
                      ? 'yellow darken-1'
                      : item.descricaoStatusProdutos.includes('EXCLUIDO')
                        ? 'teal darken-3'
                        : item.descricaoStatusProdutos.includes('INIC CORRECAO')
                          ? 'deep-purple darken-2'
                          : item.descricaoStatusProdutos.includes('AGUARD PROC CORRECAO')
                            ? 'cyan lighten-3'
                            : 'primary'
          "
          text
          elevation="0"
          dense
          small
          style="cursor: default"
        >
          <span class="font-weight-bold">
            {{ item.descricaoStatusProdutos.split('-')[1] }}
          </span>
        </v-btn>
      </template>
      <template v-slot:[`item.avisoContas`]="{ item }">
        <!-- {{ item }} -->
        <span
          v-if="item && !item.registrosDetalhados || !item.registrosDetalhados.length"
          class="font-weight-bold red--text"
        >
          <v-icon
            small
            color="error"
          >mdi-alert</v-icon>  Para gravar este grupo de contas gerenciais é necessário incluir pelo menos uma conta!
        </span>
      </template>
      <template
        v-for="(coll, index) in colunasNegrito"
        v-slot:[`item.${coll}`]="{ item }"
      >
        <span :key="index"><strong>{{ item[coll] }}</strong></span>
      </template>

      <template
        v-if="
          colunas.length &&
            !selectedExpand.length &&
            colunas.find(el => el.total)
        "
        v-slot:[`body.append`]
      >
        <tr
          v-if="
            colunas.length &&
              !selectedExpand.length &&
              colunas.find(el => el.total)
          "
          class="body_append_line"
        >
          <td
            v-for="(col, index) in colunas"
            :key="index"
            :class="
              ($vuetify.theme.dark ? 'white--text' : 'grey--text',
              `text-${col.align ? col.align : 'start'} py-1`)
            "
            :style="
              $vuetify.theme.dark
                ? 'pointer-events: none; background-color: #000 !important;'
                : 'pointer-events: none; border: solid 1px #E0E0E0; background-color: #fafafa !important;'
            "
            class="font-weight-bold py-0 ma-0 text--darken-2"
          >
            <span v-html="getValorTotal(col.total)" />
          </td>
        </tr>
      </template>
      <template v-slot:no-data>
        <div class="d-flex justify-center align-center align-self-center pt-4">
          <v-alert
            :color="$vuetify.theme.dark ? 'white' : 'primary'"
            text
            type="info"
            :width="mensagemSemRegistros ? 'auto' : '210'"
          >
            <span v-if="mensagemSemRegistros">{{ mensagemSemRegistros }}</span>
            <span v-else> Nenhum Registro!</span>
          </v-alert>
        </div>
      </template>
      <template
        v-if="!semRodape && !semRodapeExpand"
        v-slot:footer="{ headers, widths }"
      >
        <slot
          name="append"
          v-bind="{
            headers: headers.map((header, idx) => ({
              ...header,
              width: widths[idx]
            })),
            widths
          }"
        />
        <v-divider />
        <v-toolbar
          v-if="!naoExibirToobar"
          class="body-2"
          dense
          flat
          height="30"
        >
          <span
            v-if="!naoExibirTotalRegistros"
          >
            Registros:
            <b class="ml-1">{{
              !!search
                ? $refs.tabela.internalCurrentItems
                  ? $refs.tabela.internalCurrentItems.length
                  : 0
                : totalRegistrosRodape
            }}</b>
          </span>
          <span
            v-if="selecionadosMostrar"
            class="ml-1"
          >
            &nbsp;| &nbsp; Selecionados: &nbsp;
            <b class="font-weight-bold">
              {{ selecionados.length }}
            </b>
          </span>
          <span
            v-if="!!observacaoRodape"
            :class="classObservacaoRodape"
            v-html="observacaoRodape"
          />
          <v-spacer />
          <span v-if="!semPaginacaoRaw && !$vuetify.breakpoint.mobile && !descricaoPaginacao">
            Por página
          </span>
          <v-select
            v-if="!$vuetify.breakpoint.xs && !semPaginacaoRaw"
            v-model="rowsPerPage"
            :items="
              linhasCustomizadas.length
                ? linhasCustomizadas
                : [20, 50, 100, 200, 400, 600, 1000]
            "
            class="registros-pagina ml-3"
            style=".v-menu__content { width: 100px !important; }"
            hide-details
            @change="page = 1"
          />
          <div
            v-if="!$vuetify.breakpoint.xs && !semPaginacaoRaw"
            class="pa-3"
          />
          <v-btn
            v-if="!semPaginacaoRaw && !descricaoPaginacao"
            :color="$vuetify.theme.dark ? '' : 'primary darken-1'"
            :disabled="loading || desabilitarPaginaAnterior || !!search"
            icon
            small
            @click="page = 1"
          >
            <v-icon>
              mdi-chevron-double-left
            </v-icon>
          </v-btn>
          <v-btn
            v-if="!semPaginacaoRaw"
            :color="$vuetify.theme.dark ? '' : 'primary darken-1'"
            :disabled="loading || desabilitarPaginaAnterior || !!search"
            class="mr-3"
            icon
            small
            @click="--page"
          >
            <v-icon>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <span v-if="!semPaginacaoRaw">
            {{ !!search ? 1 : paginaAtual }} &nbsp;-&nbsp;
            {{ !!search ? 1 : totalPaginas || 1 }}
          </span>
          <v-btn
            v-if="!semPaginacaoRaw"
            :color="$vuetify.theme.dark ? '' : 'primary darken-1'"
            :disabled="loading || desabilitarPaginaPosterior || !!search"
            class="ml-3"
            icon
            small
            @click="++page"
          >
            <v-icon>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-btn
            v-if="!semPaginacaoRaw && !descricaoPaginacao"
            :color="$vuetify.theme.dark ? '' : 'primary darken-1'"
            :disabled="loading || desabilitarPaginaPosterior || !!search"
            class="mr-1"
            icon
            small
            @click="page = totalPaginas"
          >
            <v-icon>
              mdi-chevron-double-right
            </v-icon>
          </v-btn>
        </v-toolbar>
      </template>
    </v-data-table>

    <v-divider
      v-if="semRodape && contarRegistros"
      style="border: solid 1px #ddd;"
    />

    <v-toolbar
      v-if="semRodape && contarRegistros"
      class="body-2 elevation-0"
      dense
      flat
      height="35"
    >
      Registros: <b class="ml-1">{{ totalRegistrosRodape }}</b>
    </v-toolbar>

    <slot name="totais" />
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'ComponenteTabela',

  props: {
    acessar: {
      default: false,
      type: Boolean
    },
    auditoria: {
      default: false,
      type: Boolean
    },
    btnExpandTable: {
      default: false,
      type: Boolean
    },
    btnExpand: {
      default: false,
      type: Boolean
    },
    btnExpandUndo: {
      default: false,
      type: Boolean
    },
    child: {
      type: [Number, Boolean],
      default: false
    },
    colunasCustomizadas: {
      required: false,
      default: () => {
        return []
      },
      type: Array
    },
    configuracao: {
      default: false,
      type: Boolean
    },
    contarRegistros: {
      default: false,
      type: Boolean
    },
    corToolbar: {
      type: String,
      default: null
    },
    customValorDesabilitado: {
      default: true,
      type: Boolean
    },
    campoInputEditReverse: {
      default: false,
      type: Boolean
    },
    fieldInputEditReverse: {
      default: false,
      type: Boolean
    },
    campoInputInteiro: {
      default: false,
      type: Boolean
    },
    fieldInputInteiro: {
      default: false,
      type: Boolean
    },
    campoInputModoEdicao: {
      default: false,
      type: Boolean
    },
    fieldInputModoEdicao: {
      default: false,
      type: Boolean
    },
    naoExibirToobar: {
      type: Boolean,
      default: false
    },
    naoExibirTotalRegistros: {
      type: Boolean,
      default: false
    },
    colunas: {
      required: true,
      type: Array
    },
    desabilitado: {
      default: false,
      type: Boolean
    },
    desabilitadoMover: {
      default: false,
      type: Boolean
    },
    disabledSortDefault: {
      default: false,
      type: Boolean
    },
    editar: {
      default: false,
      type: Boolean
    },
    escolher: {
      default: false,
      type: Boolean
    },
    excluir: {
      default: false,
      type: Boolean
    },
    exibir: {
      default: false,
      type: Boolean
    },
    exibirLinha: {
      default: false,
      type: Boolean
    },
    expand: {
      default: false,
      type: Boolean
    },
    flat: {
      default: false,
      type: Boolean
    },
    fnSearch: {
      type: Function,
      default: () => true
    },
    footer: {
      default: () => {
        return []
      },
      type: Array
    },
    generico: {
      default: false,
      type: Boolean
    },
    genericoColor: {
      type: String,
      default: 'primary'
    },
    genericoIcon: {
      type: String,
      default: 'mdi-eye'
    },
    genericoTitle: {
      type: String,
      default: 'Generico'
    },
    height: {
      default: '',
      type: String
    },
    heightAuto: {
      default: false,
      type: Boolean
    },
    genericoDisabled: {
      default: false,
      type: Boolean
    },
    hideDefaultHeader: {
      default: false,
      type: Boolean
    },
    htmlColumn: {
      type: String,
      default: 'html'
    },
    htmlColumnArray: {
      type: Array,
      default: () => []
    },
    htmlCols: {
      type: Array,
      default: () => {}
    },
    colunasNegrito: {
      type: Array,
      default: () => []
    },
    iconSortHeader: {
      default: false,
      type: Boolean
    },
    itemClass: {
      default: '',
      type: [String, Function]
    },
    itemKey: {
      default: 'id',
      type: String
    },
    lineHover: {
      default: true,
      type: Boolean
    },
    linhasCustomizadas: {
      required: false,
      default: () => [],
      type: Array
    },
    loading: {
      default: false,
      type: Boolean
    },
    maxHeight: {
      default: false,
      type: Boolean
    },
    mensagemSemRegistros: {
      required: false,
      default: ' Nenhum Registro!',
      type: String
    },
    moveDown: {
      default: false,
      type: Boolean
    },
    moveUp: {
      default: false,
      type: Boolean
    },
    noClickRow: {
      default: false,
      type: Boolean
    },
    observacaoSliceSize: {
      default: 60,
      type: [Number, String]
    },
    classObservacaoRodape: {
      default: '',
      type: String
    },
    observacaoRodape: {
      default: null,
      type: String
    },
    paginacao: {
      default: () => {},
      type: Object
    },
    paginacaoServidor: {
      default: false,
      type: Boolean
    },
    problemas: {
      default: false,
      type: Boolean
    },
    registros: {
      required: true,
      type: Array
    },
    registrosPorPagina: {
      default: 15,
      type: Number
    },
    resetSenhaUsuario: {
      default: false,
      type: Boolean
    },
    search: {
      validator: function (value) {
        return (
          typeof value === 'undefined' ||
          typeof value === 'string' ||
          typeof value === 'boolean' ||
          value === null
        )
      },
      default: ''
    },
    selecionados: {
      type: Array,
      default: () => []
    },
    selecionadosMostrar: {
      default: false,
      type: Boolean
    },
    selecionar: {
      default: false,
      type: Boolean
    },
    selecionarLinha: {
      default: false,
      type: Boolean
    },
    semPaginacaoRaw: {
      default: false,
      type: Boolean
    },
    semRodape: {
      default: false,
      type: Boolean
    },
    descricaoPaginacao: {
      default: false,
      type: Boolean
    },
    singleSelect: {
      default: false,
      type: Boolean
    },
    subtitulo: {
      default: '',
      type: String
    },
    sortByCli: {
      default: 'id',
      type: [String, Array]
    },
    sortDescCli: {
      default: false,
      type: Boolean
    },
    statusTag: {
      type: String,
      default: 'status'
    },
    titulo: {
      default: '',
      type: String
    },
    tituloVoltar: {
      default: 'Voltar Listagem',
      type: String
    },
    todosSelecionadosEvento: {
      default: false,
      type: Boolean
    },
    toolbarGrid: {
      default: false,
      type: Boolean
    },
    selecionarSemOrdem: {
      default: false,
      type: Boolean
    },
    sortable: {
      default: false,
      type: Boolean
    },
    toolbarHight: {
      type: [Number, String],
      default: 30
    },
    voltarListagem: {
      default: false,
      type: Boolean
    },
    filtrosPagina: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    selecionadoSemOrdem: [],
    allSelected: false,
    customizadas: [
      'saidaValor',
      'saidaConciliar',
      'entradaValor',
      'entradaConciliar',
      'valor',
      'valorConciliado',
      'valorConciliar',
      'saldo',
      'valorCredito',
      'valorDebito',
      'valorLancado',
      'valorExtrato',
      'diferenca',
      'tipo',
      'resultado',
      'htmlColumn'
    ],
    expanded: [],
    rowsPerPage: 15,
    page: 1,
    sortBy: [],
    sortDesc: [],
    fabs: {},
    selectedExpand: [],
    semRodapeExpand: false,
    tableHeight: 0
  }),

  computed: {
    desabilitarPaginaAnterior () {
      return this.paginacaoServidor
        ? this.paginacao.pagina === 1 || this.paginacao.pagina === undefined
        : this.page === 1
    },
    desabilitarPaginaPosterior () {
      return this.paginacaoServidor
        ? this.paginacao.pagina === this.paginacao.totalPaginas ||
            this.paginacao.totalPaginas === 0
        : this.page === Math.ceil(this.registros.length / this.rowsPerPage) ||
            Math.ceil(this.registros.length / this.rowsPerPage) === 0
    },
    itensServidor () {
      return this.paginacaoServidor ? this.paginacao.totalRegistros : -1
    },
    paginaAtual () {
      return this.paginacaoServidor ? this.paginacao.pagina : this.page
    },
    totalPaginas () {
      return this.paginacaoServidor
        ? this.paginacao.totalPaginas
        : Math.ceil(this.registros.length / this.rowsPerPage)
    },
    totalRegistros () {
      return this.paginacaoServidor
        ? this.paginacao.totalRegistros
        : this.registros.length
    },
    totalRegistrosRodape () {
      return this.paginacaoServidor
        ? this.paginacao.totalRegistros
        : this.registros.length
    },
    selected: {
      get () {
        return this.selecionados
      },
      set (val) {
        this.$emit('update:selecionados', val)
        this.$emit('selecionar', val)
      }
    }
  },

  watch: {
    expanded (valor) {
      if (valor.length) {
        this.$emit('expandir', this.expanded)
      }
    },
    selected (valor) {
      if (valor) {
        if (this.selected.length) {
          if (this.selecionarSemOrdem) {
            for (let index = 0; index < valor.length; index++) {
              if (!this.selecionadoSemOrdem.length) {
                valor[index].selecao = Date.now()
                this.selecionadoSemOrdem.push(valor[index])
              } else {
                const registrosFiltrados = this.selecionadoSemOrdem.filter(item => item.id === valor[index].id)

                if (!registrosFiltrados.length) {
                  valor[index].selecao = Date.now()
                  this.selecionadoSemOrdem.push(valor[index])
                }

                for (let index = 0; index < this.selecionadoSemOrdem.length; index++) {
                  const registroInexistente = this.selected.filter(item => item.id === this.selecionadoSemOrdem[index].id)

                  if (!registroInexistente.length) {
                    this.selecionadoSemOrdem.splice(index, 1)
                  }
                }
              }
            }
          }
          this.$emit('selecionar', valor)
        } else {
          if (this.selecionarSemOrdem) {
            this.selecionadoSemOrdem = []
          }
          this.$emit('selecionar', [])
        }
      }
    },
    paginacao: {
      handler (val) {
        if (val && val.registros !== this.rowsPerPage) this.rowsPerPage = val.registros
        if (val && val.pagina !== this.page) this.page = val.pagina
      }
    },
    registros: {
      handler (value) {
        const [selectedExpand] = this.selectedExpand
        if (selectedExpand) {
          const atualizado = value.find(el => el.id === selectedExpand.id)
          if (atualizado) {
            this.selectedExpand = [atualizado]
            this.expandTable(atualizado)
          }
        }

        setTimeout(() => {
          this.newCalculaTableHeigth()
        }, 200)
      },
      deep: true
    }
  },

  created () {
    this.rowsPerPage = this.registrosPorPagina
    this.sortBy =
      typeof this.sortByCli === 'string' ? [this.sortByCli] : this.sortByCli
    this.sortDesc = [this.sortDescCli]

    if (this.paginacaoServidor) {
      this.page = this.paginacao.pagina
      this.rowsPerPage = this.paginacao.registros
    }
  },

  mounted () {
    this.newCalculaTableHeigth()
  },

  methods: {
    customSort (items, index, isDesc) {
      const coluna = this.colunas.find(el => el.value === index[0])
      let sort = ''
      if (coluna) {
        sort = coluna.sort || ''
      }

      items.sort((a, b) => {
        if (sort) {
          if (sort === 'money') {
            if (!isDesc[0]) {
              if (isNaN(a[index[0]]) || isNaN(b[index[0]])) {
                const va = String(a[index[0]])
                  .match(/-*[?^0-9,]/gm)
                  .join('')
                const vb = String(b[index[0]])
                  .match(/-*[?^0-9,]/gm)
                  .join('')

                return va - vb
              } else {
                return a[index[0]] - b[index[0]]
              }
            } else {
              if (isNaN(a[index[0]]) || isNaN(b[index[0]])) {
                const va = String(a[index[0]])
                  .match(/-*[?^0-9,]/gm)
                  .join('')
                const vb = String(b[index[0]])
                  .match(/-*[?^0-9,]/gm)
                  .join('')

                return vb - va
              } else {
                return b[index[0]] - a[index[0]]
              }
            }
          } else if (sort === 'date') {
            const dataA = this.$day(a[index[0]], 'DD/MM/YYYY')
            const dataB = this.$day(b[index[0]], 'DD/MM/YYYY')
            if (dataA.isValid() && dataB.isValid()) {
              if (!isDesc[0]) {
                return dataB && dataA && dataA.isSameOrBefore(dataB) ? -1 : 1
              } else {
                return dataB && dataA && dataB.isSameOrBefore(dataA) ? -1 : 1
              }
            }
          }
        } else if (!this.disabledSortDefault) {
          if (!isDesc[0]) {
            return a[index[0]] < b[index[0]] ? -1 : 1
          } else {
            return b[index[0]] < a[index[0]] ? -1 : 1
          }
        }
      })

      if (this.problemas) {
        for (let y = 0; y < items.length; y++) {
          if (items[y].problemas === 1) {
            this.changePosition(items, y, 0)
          }
        }
        return items
      }
      return items
    },
    changePosition (arr, from, to) {
      arr.splice(to, 0, arr.splice(from, 1)[0])
      return arr
    },
    getValorTotal (valor) {
      if (valor && typeof valor === 'number') {
        return `<span class="${valor < 0 ? 'red--text' : ''}">${valor}</span>`
      } else if (valor && typeof valor === 'object') {
        return `<span class="${
          valor.valor < 0 ? 'red--text' : ''
        }">${valor.valor}</span>`
      } else return valor
    },
    newCalculaTableHeigth () {
      const table = this.$refs.tabela.$el

      if (!table) return

      // let tableHeaderFooterHeight = 0

      // // Pega o tamanho do header e do footer do componente tabela
      // table.children.forEach(node => {
      //   const nodeRect = node.getBoundingClientRect()

      //   if (!node.classList.contains('v-data-table__wrapper')) {
      //     tableHeaderFooterHeight += nodeRect.height
      //   }
      // })

      const tableRect = table.getBoundingClientRect()
      const windowHeigh = window.innerHeight

      if (this.$slots.totais) {
        this.tableHeight =
          windowHeigh - tableRect.top - 75 - 100
      } else {
        this.tableHeight =
          windowHeigh - tableRect.top - 35 - 100
      }
    },
    expandTable (item) {
      const cloneItem = _.cloneDeep(item)
      this.selectedExpand = [cloneItem]
      this.semRodapeExpand = true
      this.$emit('expand', cloneItem)
    },
    expandUndoTable (emit = true) {
      this.selectedExpand = []
      this.semRodapeExpand = false
      emit && this.$emit('expandUndo')
    },
    alterarPaginacao ({ sortBy, sortDesc, page, itemsPerPage }) {
      this.$emit('paginacao', {
        ordenacao: sortBy[0],
        ordenacao_tipo:
          sortDesc[0] === true
            ? 'desc'
            : sortDesc[0] === false
              ? 'asc'
              : undefined,
        pagina: page,
        registros: itemsPerPage
      })
    },
    hasSlot (name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name]
    },
    acaoDbClick (event, item) {
      this.$emit('dblclick', item.item)
    },
    acaoClickRow (event, item) {
      this.$emit('clickrow', item.item)
    },
    todosSelecionados (x) {
      if (this.todosSelecionadosEvento) {
        if (this.selecionados && this.selecionados.length && x.items && x.items.length) {
          this.$emit('update:selecionados', [])
          this.$emit('allSelected', false)
        }
        if (this.selecionados && !this.selecionados.length && x.items && x.items.length) {
          this.$emit('allSelected', x)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-data-table__selected {
  background: #bbdefb !important;
}
::v-deep .body_append_line {
  td {
    position: sticky;
    bottom: 0;
    z-index: 1;
  }
}
::v-deep .theme--light.v-data-table thead tr th {
  color: rgba(0, 0, 0, 1) !important;
}
::v-deep .v-input--selection-controls__ripple {
  padding: 0px !important;
  margin: 0px !important;
  visibility: hidden !important;
}
::v-deep .botao-acao-tabela {
  height: 31px !important;
  width: 29px !important;
}

::v-deep .componente-tabela {
  border-collapse: collapse;
  white-space: nowrap;

  ::-webkit-scrollbar {
    width: 12px !important;
    height: 12px !important;
    background-color: #f1f1f1;
  }

  ::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

  ::-webkit-scrollbar-thumb {
  background-color: #cccccc;
}

  ::-webkit-scrollbar-thumb:hover {
  background-color: #cccccc;
}
}
::v-deep .componente-tabela > .v-data-table__wrapper {
  min-height: 100px !important;
}
::v-deep .registros-pagina {
  .v-menu__content .menuable__content__active {
    min-width: 80px !important;
  }
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    padding-left: 8px !important;
    padding-right: 0px !important;
  }
  font-size: 12px !important;
  margin-bottom: 10px !important;
  max-width: 80px !important;
  .v-input__control
    .v-input__slot
    .v-select__slot
    .v-select__selections
    .v-select__selection {
    margin-bottom: 0px !important;
    min-width: 1;
  }
}
</style>
