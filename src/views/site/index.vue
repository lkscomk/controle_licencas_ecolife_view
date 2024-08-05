<template>
  <v-container
    fluid
    class="fill-height ma-0 pa-0"
  >
    <v-row class="ma-0 pa-0">
      <v-col
        cols="12"
        class="ma-0 pa-0"
      >
        <v-carousel
          cycle
          hide-delimiters
        >
          <v-carousel-item
            v-for="(item,i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
            class="headline font-weight-regular"
          >
              <v-row
                class="fill-height d-flex align-center justify-start ml-5"
              >
                <div
                  class="text-h2 font-weight-bold primary--text white pa-5"
                >
                  Grupo Ecolife
                </div>
                <div
                  class="text-h6 font-weight-bold primary--text white pa-5"
                >
                  Consultoria e soluções especializadas com quem entende do assunto
                </div>
              </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col
        cols="12"
      >
        <QuemSomos />
      </v-col>
      <v-col
        cols="12"
      >
        <Servicos />
      </v-col>
      <v-col
        cols="12"
      >
        <Clientes />
      </v-col>
      <v-col
        cols="12"
      >
        <Contato />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QuemSomos from '@/components/quem-somos.vue'
import Servicos from '@/components/servicos.vue'
import Clientes from '@/components/clientes.vue'
import Contato from '@/components/contato.vue'

export default {
  name: 'Home',
  components: {
    QuemSomos,
    Servicos,
    Clientes,
    Contato
  },
  data () {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ]
    }
  }
}
</script>
