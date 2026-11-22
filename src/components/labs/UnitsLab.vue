<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { toPixels, type Unit, type UnitContext } from '@/utils/measurements'
const value = ref(1.5)
const unit = ref<Unit>('rem')
const context = reactive<UnitContext>({
  root: 16,
  element: 20,
  parentWidth: 400,
  viewportWidth: 1200,
  largeHeight: 900,
  dynamicHeight: 760,
  zeroWidth: 8,
})
const result = computed(() => toPixels(Number(value.value), unit.value, context))
const units: Unit[] = ['px', 'rem', 'em', '%', 'vw', 'vh', 'dvh', 'ch']
</script>

<template>
  <div class="lab-shell">
    <h3>De uma unidade para outra</h3>
    <p>
      As referencias abaixo sao um cenario editavel, nao medidas do seu aparelho. Para %, o exemplo
      converte width; para em, converte padding.
    </p>
    <div class="control-grid">
      <label
        >Valor<input v-model.number="value" type="number" min="0" max="10000" step="0.1"
      /></label>
      <label
        >Unidade<select v-model="unit">
          <option v-for="item in units" :key="item">{{ item }}</option>
        </select></label
      >
      <label
        >Fonte raiz (px)<input v-model.number="context.root" type="number" min="8" max="64"
      /></label>
      <label
        >Fonte do elemento (px)<input
          v-model.number="context.element"
          type="number"
          min="8"
          max="64"
      /></label>
      <label
        >Largura do pai (px)<input
          v-model.number="context.parentWidth"
          type="number"
          min="1"
          max="4000"
      /></label>
      <label
        >Largura da viewport (px)<input
          v-model.number="context.viewportWidth"
          type="number"
          min="1"
          max="8000"
      /></label>
      <label
        >Altura grande, vh (px)<input
          v-model.number="context.largeHeight"
          type="number"
          min="1"
          max="4000"
      /></label>
      <label
        >Altura dinamica, dvh (px)<input
          v-model.number="context.dynamicHeight"
          type="number"
          min="1"
          max="4000"
      /></label>
      <label
        >Largura do zero, ch (px)<input
          v-model.number="context.zeroWidth"
          type="number"
          min="1"
          max="64"
          step="0.1"
      /></label>
    </div>
    <div class="conversion" aria-live="polite">
      <span>{{ value || 0 }}{{ unit }}</span
      ><span aria-hidden="true">=</span
      ><strong
        >{{ Number.isFinite(result) ? Number(result.toFixed(2)) : 'Valor invalido'
        }}<small v-if="Number.isFinite(result)">px</small></strong
      >
    </div>
    <p>
      Experimente: 1.5rem com raiz de 16px resulta em 24px. Mude a raiz para 20px: agora sao 30px. O
      valor de 24px permanece 24px.
    </p>
    <p class="notice">
      fr nao tem conversao isolada: em uma grade de 600px, com gap de 16px e colunas 2fr 1fr, sobram
      584px. As colunas medem aproximadamente 389,33px e 194,67px.
    </p>
  </div>
</template>
