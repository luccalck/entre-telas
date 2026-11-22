<script setup lang="ts">
defineProps<{ code: string; language: string }>()
</script>

<template>
  <section class="code-example" aria-label="Exemplo de codigo comentado">
    <div class="code-toolbar">
      <span>EXEMPLO COMENTADO</span><span>{{ language }}</span>
    </div>
    <pre tabindex="0"><code>{{ code }}</code></pre>
  </section>
</template>
