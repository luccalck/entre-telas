<script setup lang="ts">
import { onMounted } from 'vue'
import { useGuideStore } from '@/stores/guide'
const store = useGuideStore()
onMounted(() => {
  if (!store.repository && !store.loading) void store.loadRepository()
})
</script>

<template>
  <div class="lab-shell api-lab">
    <div class="api-heading">
      <div>
        <span class="eyebrow">API PUBLICA / GITHUB</span>
        <h3>O Vue em dados reais</h3>
      </div>
      <span class="api-badge">{{
        store.loading
          ? 'Consultando'
          : store.error
            ? 'Indisponivel'
            : store.repository
              ? 'Conectado'
              : 'Pronto'
      }}</span>
    </div>
    <p>
      Requisicao sem autenticacao para <code>api.github.com/repos/vuejs/core</code>. Os valores
      podem mudar a cada consulta.
    </p>
    <p v-if="store.loading" role="status">Buscando os dados do repositorio...</p>
    <p v-if="store.error" class="notice error" role="alert">{{ store.error }}</p>
    <div v-if="store.repository" class="api-result" aria-live="polite">
      <a :href="store.repository.url" target="_blank" rel="noopener noreferrer"
        >{{ store.repository.name }} &nearr;</a
      >
      <dl>
        <div>
          <dt>Estrelas</dt>
          <dd>{{ store.repository.stars.toLocaleString('pt-BR') }}</dd>
        </div>
        <div>
          <dt>Issues e PRs abertos</dt>
          <dd>{{ store.repository.issues.toLocaleString('pt-BR') }}</dd>
        </div>
      </dl>
      <p>Consulta concluida as {{ store.loadedAt }}. Dados recebidos, nao simulados.</p>
    </div>
    <button class="button" :disabled="store.loading" @click="store.loadRepository">
      {{ store.loading ? 'Carregando...' : store.error ? 'Tentar novamente' : 'Atualizar dados' }}
    </button>
    <p class="notice">
      Para testar erro: ative Offline no painel Network do DevTools e clique em Atualizar dados.
      Desative Offline e tente novamente. O progresso no menu usa a mesma store Pinia.
    </p>
  </div>
</template>
