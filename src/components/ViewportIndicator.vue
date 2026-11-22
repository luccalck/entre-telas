<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const width = ref(0)
const current = ref('Compacto')
function measure() {
  width.value = window.innerWidth
  current.value = window.matchMedia('(min-width: 64rem)').matches
    ? 'Amplo'
    : window.matchMedia('(min-width: 48rem)').matches
      ? 'Intermediario'
      : 'Compacto'
}
onMounted(() => {
  measure()
  window.addEventListener('resize', measure)
})
onUnmounted(() => window.removeEventListener('resize', measure))
</script>

<template>
  <aside
    class="viewport-indicator"
    aria-label="Largura real da janela"
    title="Pixels CSS. Breakpoints reais: compacto abaixo de 48rem, intermediario de 48rem a 64rem e amplo a partir de 64rem."
  >
    <span class="status-dot" aria-hidden="true"></span><span>{{ width }}px</span
    ><span class="indicator-divider">/</span><span>{{ current }}</span>
  </aside>
</template>
