<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import landscape from '@/assets/landscape.svg'
const loaded = ref(false)
const pending = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
function load() {
  loaded.value = false
  pending.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    loaded.value = true
    pending.value = false
  }, 1800)
}
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <div class="lab-shell">
    <h3>A diferenca de reservar o lugar</h3>
    <p>
      Clique e acompanhe as linhas. A insercao e atrasada em 1,8s para simular uma imagem que chega
      depois. A imagem e local; isso nao mede velocidade de rede nem o CLS real.
    </p>
    <button class="button" :disabled="pending" @click="load">
      {{
        pending
          ? 'Aguardando imagem...'
          : loaded
            ? 'Repetir experimento'
            : 'Carregar imagem com atraso'
      }}
    </button>
    <div class="image-comparison">
      <section class="image-experiment">
        <h4>Sem reserva</h4>
        <div class="image-slot unreserved">
          <img v-if="loaded" :src="landscape" alt="Colinas verdes e sol sobre um rio" />
        </div>
        <p class="moving-text">Este texto muda de lugar.</p>
      </section>
      <section class="image-experiment">
        <h4>Com reserva</h4>
        <div class="image-slot reserved">
          <img
            v-if="loaded"
            :src="landscape"
            width="960"
            height="540"
            alt="Colinas verdes e sol sobre um rio"
          /><span v-else>Espaco reservado: 16 / 9</span>
        </div>
        <p>Este texto permanece no lugar.</p>
      </section>
    </div>
    <p class="lab-result" aria-live="polite">
      {{
        pending
          ? 'Observe a posicao do texto antes da imagem.'
          : loaded
            ? 'Imagem inserida: compare a posicao nas duas caixas.'
            : 'O lado direito ja conhece a proporcao da imagem.'
      }}
    </p>
  </div>
</template>
