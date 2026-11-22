<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import WidthControl from '@/components/WidthControl.vue'
const requested = ref(620)
const actual = ref(0)
const outerWidth = ref(0)
const root = ref(16)
const frame = ref<HTMLElement | null>(null)
const expanded = ref(false)
const threshold = computed(() => 30 * root.value)
const maximum = computed(() => Math.max(960, Math.ceil(36 * root.value)))
const limited = computed(() => outerWidth.value < requested.value - 0.5)
watch(maximum, (max) => {
  requested.value = Math.min(requested.value, max)
})
let observer: ResizeObserver | undefined
onMounted(() => {
  observer = new ResizeObserver(([entry]) => {
    if (!frame.value) return
    actual.value = Math.round((entry?.contentRect.width ?? 0) * 100) / 100
    outerWidth.value = frame.value.getBoundingClientRect().width
    root.value = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const site = frame.value.querySelector('.mini-site')
    expanded.value = site ? getComputedStyle(site).gridTemplateColumns.split(' ').length > 1 : false
  })
  if (frame.value) observer.observe(frame.value)
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="lab-shell">
    <h3>Uma pagina, dois arranjos</h3>
    <p>
      Arraste a largura. O exemplo muda de pilha para duas colunas em 30rem de largura util ({{
        threshold
      }}px com a raiz atual de {{ root }}px). A container query observa esta caixa, nao a janela
      toda. O controle define a largura total; a medicao desconta as bordas.
    </p>
    <WidthControl
      id="width-control"
      v-model="requested"
      label="Largura solicitada"
      :min="240"
      :max="maximum"
    />
    <div class="lab-ruler">
      <span>240px</span><span>{{ maximum }}px</span>
    </div>
    <div ref="frame" class="width-frame" :style="{ width: requested + 'px' }">
      <div class="mini-site">
        <div class="mini-art" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="mini-copy">
          <span class="eyebrow">BOA LEITURA EM QUALQUER TELA</span>
          <h4>Espaco para respirar.</h4>
          <p>O conteudo se adapta. A mensagem continua inteira.</p>
          <span class="mini-chip">Um layout flexivel</span>
        </div>
      </div>
    </div>
    <p class="lab-result" aria-live="polite">
      Largura real: <strong>{{ actual }}px</strong>.
      {{ expanded ? 'Duas colunas.' : 'Conteudo empilhado.' }}
    </p>
    <p v-if="limited" class="notice">
      A area disponivel limita a caixa a {{ actual }}px. Amplie a janela para testar larguras
      maiores; o exemplo nunca vaza da pagina.
    </p>
  </div>
</template>
