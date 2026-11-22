<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { lessons } from '@/data/lessons'
import { useGuideStore } from '@/stores/guide'
import ViewportIndicator from '@/components/ViewportIndicator.vue'
const route = useRoute()
const store = useGuideStore()
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
function focusContent() {
  document.querySelector<HTMLElement>('#conteudo')?.focus()
}
function closeMenu() {
  if (!menuOpen.value) return
  menuOpen.value = false
  menuButton.value?.focus()
}
async function handleNavigation(event: MouseEvent) {
  if (!(event.target instanceof Element) || !event.target.closest('a')) return
  menuOpen.value = false
  await nextTick()
  document.querySelector<HTMLElement>('#conteudo')?.focus({ preventScroll: true })
}
watch(
  () => route.path,
  async () => {
    menuOpen.value = false
    await nextTick()
    document.querySelector<HTMLElement>('#conteudo')?.focus({ preventScroll: true })
  },
)
</script>

<template>
  <a class="skip-link" href="#conteudo" @click.prevent="focusContent">Pular para o conteudo</a>
  <div class="app-shell" @keydown.esc="closeMenu">
    <header class="mobile-header">
      <RouterLink to="/" class="brand" @click="handleNavigation"
        ><span class="brand-symbol" aria-hidden="true">et.</span
        ><span>entre telas<small>GUIA DE RESPONSIVIDADE</small></span></RouterLink
      ><button
        ref="menuButton"
        class="menu-toggle"
        :aria-expanded="menuOpen"
        aria-controls="site-nav"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? 'Fechar' : 'Menu' }}<span aria-hidden="true">{{ menuOpen ? '-' : '+' }}</span>
      </button>
    </header>
    <aside class="sidebar" :class="{ 'is-open': menuOpen }">
      <RouterLink class="brand desktop-brand" to="/"
        ><span class="brand-symbol" aria-hidden="true">et.</span
        ><span>entre telas<small>GUIA DE RESPONSIVIDADE</small></span></RouterLink
      >
      <nav id="site-nav" aria-label="Navegacao principal" @click="handleNavigation">
        <RouterLink to="/" class="overview-link" exact-active-class="is-active"
          >Visao geral <span aria-hidden="true">&nearr;</span></RouterLink
        >
        <p class="nav-caption">O GUIA / 6 CAPITULOS</p>
        <RouterLink
          v-for="lesson in lessons"
          :key="lesson.id"
          class="chapter-link"
          active-class="is-active"
          :to="'/' + lesson.id"
          ><span class="nav-number">{{ lesson.number }}</span
          ><span>{{ lesson.short }}</span
          ><span v-if="store.completed.includes(lesson.id)" class="done-mark" aria-label="concluido"
            >&#10003;</span
          ></RouterLink
        >
        <RouterLink to="/desafio" class="challenge-link" active-class="is-active"
          ><span aria-hidden="true">+</span> Desafio final
          <span aria-hidden="true">&rarr;</span></RouterLink
        >
      </nav>
      <div class="sidebar-bottom">
        <div class="progress-label">
          <span>Seu percurso</span><strong>{{ store.completed.length }}/6</strong>
        </div>
        <progress
          :value="store.completed.length"
          max="6"
          aria-label="Capitulos concluidos"
        ></progress>
        <p>Explore no seu ritmo.<br />Teste antes de decorar.</p>
        <span class="edition-label">CADERNO DIGITAL / 2026</span>
      </div>
    </aside>
    <div class="main-shell">
      <div class="top-line">
        <span>MENOS RECEITA. MAIS EXPERIMENTO.</span><span>VUE 3 + CSS</span>
      </div>
      <main id="conteudo" tabindex="-1"><RouterView /></main>
      <footer class="site-footer">
        <p>Entre Telas. Feito para entender, nao para decorar.</p>
        <p>Lucca Castilho Costa <span aria-hidden="true">/</span> Lucas Souza</p>
        <a href="https://github.com/luccalck/entre-telas" target="_blank" rel="noopener noreferrer"
          >Codigo no GitHub &nearr;</a
        >
      </footer>
    </div>
  </div>
  <ViewportIndicator />
</template>
