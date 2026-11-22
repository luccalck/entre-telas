<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import WidthControl from '@/components/WidthControl.vue'
const requested = ref(620)
const actual = ref(0)
const frame = ref<HTMLElement | null>(null)
const expanded = computed(() => actual.value >= 480)
let observer: ResizeObserver | undefined
onMounted(() => {
  observer = new ResizeObserver(([entry]) => {
    actual.value = Math.round(entry?.contentRect.width ?? 0)
  })
  if (frame.value) observer.observe(frame.value)
})
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="lab-shell">
    <h3>Uma pagina, dois arranjos</h3>
    <p>
      Arraste a largura. O exemplo muda de pilha para duas colunas em 480px de container. Aqui
      usamos uma container query: ela observa esta caixa, nao a janela toda.
    </p>
    <WidthControl
      id="width-control"
      v-model="requested"
      label="Largura solicitada"
      :min="240"
      :max="960"
    />
    <div class="lab-ruler"><span>240px</span><span>960px</span></div>
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
    <p v-if="actual < requested - 1" class="notice">
      A area disponivel limita a caixa a {{ actual }}px. Amplie a janela para testar larguras
      maiores; o exemplo nunca vaza da pagina.
    </p>
  </div>
</template>
