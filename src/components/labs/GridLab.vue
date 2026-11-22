<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import WidthControl from '@/components/WidthControl.vue'
const requested = ref(464)
const actual = ref(0)
const columns = ref(1)
const root = ref(16)
const frame = ref<HTMLElement | null>(null)
const gap = computed(() => root.value)
let observer: ResizeObserver | undefined
function measure() {
  if (!frame.value) return
  actual.value = Math.round(frame.value.getBoundingClientRect().width * 100) / 100
  columns.value = getComputedStyle(frame.value).gridTemplateColumns.split(' ').length
  root.value = parseFloat(getComputedStyle(document.documentElement).fontSize)
}
onMounted(() => {
  observer = new ResizeObserver(measure)
  if (frame.value) observer.observe(frame.value)
  measure()
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="lab-shell">
    <h3>Em que ponto cabe mais um card?</h3>
    <p>
      Uma grade real: quatro cards, minimo de 14rem e gap de 1rem. O resultado e lido do CSS
      calculado pelo navegador.
    </p>
    <WidthControl
      id="grid-width"
      v-model="requested"
      label="Largura solicitada"
      :min="200"
      :max="1000"
    />
    <div class="preset-buttons">
      <button
        v-for="size in [463, 464, 703, 704]"
        :key="size"
        class="button secondary small"
        @click="requested = size"
      >
        {{ size }}px
      </button>
    </div>
    <div ref="frame" class="demo-grid" :style="{ width: requested + 'px' }" data-testid="demo-grid">
      <div
        v-for="(name, index) in ['Observar', 'Medir', 'Ajustar', 'Testar']"
        :key="name"
        class="demo-card"
      >
        <span>0{{ index + 1 }}</span
        ><strong>{{ name }}</strong
        ><span class="card-lines" aria-hidden="true"></span>
      </div>
    </div>
    <p class="lab-result" aria-live="polite">
      <strong>{{ columns }} {{ columns === 1 ? 'coluna' : 'colunas' }}</strong> em {{ actual }}px de
      largura real. Raiz: {{ root }}px; gap: {{ gap }}px.
    </p>
    <p v-if="actual < requested - 1" class="notice">
      O container foi limitado pela tela. Para testar {{ requested }}px reais, use uma janela mais
      larga. O calculo continua disponivel abaixo.
    </p>
    <p>
      Para duas colunas: 2 x 14 x {{ root }} + {{ root }} = <strong>{{ 29 * root }}px</strong>. Para
      descobrir tres colunas, conte tambem os dois intervalos.
    </p>
  </div>
</template>
