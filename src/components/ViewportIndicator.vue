<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { breakpoint } from '@/utils/measurements'

const width = ref(0)
const current = computed(() => breakpoint(width.value))
function measure() {
  width.value = window.innerWidth
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
    title="Pixels CSS. Compacto abaixo de 768px, intermediario ate 1023px, amplo a partir de 1024px."
  >
    <span class="status-dot" aria-hidden="true"></span><span>{{ width }}px</span
    ><span class="indicator-divider">/</span><span>{{ current }}</span>
  </aside>
</template>
