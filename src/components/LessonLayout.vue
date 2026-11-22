<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Lesson } from '@/data/lessons'
import { lessons } from '@/data/lessons'
import { useGuideStore } from '@/stores/guide'
import CodeExample from './CodeExample.vue'

const props = defineProps<{ lesson: Lesson }>()
const store = useGuideStore()
const done = computed(() => store.completed.includes(props.lesson.id))
const next = computed(() => lessons[lessons.findIndex((item) => item.id === props.lesson.id) + 1])
</script>

<template>
  <article>
    <header class="lesson-hero">
      <div class="eyebrow">
        <span class="chapter-index">{{ lesson.number }}</span>{{ lesson.eyebrow }}
      </div>
      <h1>{{ lesson.title }}</h1>
      <p class="lead">{{ lesson.intro }}</p>
      <RouterLink class="text-link" :to="{ path: '/' + lesson.id, hash: '#laboratorio' }"
        >Experimentar no laboratorio <span aria-hidden="true">&darr;</span></RouterLink
      >
    </header>

    <section class="lesson-block" aria-labelledby="concepts-title">
      <div class="section-heading">
        <span class="eyebrow">ENTENDA O CONCEITO</span>
        <h2 id="concepts-title">O que muda na pratica</h2>
      </div>
      <div class="concept-grid">
        <section
          v-for="(concept, index) in lesson.concepts"
          :key="concept.title"
          class="concept-card"
        >
          <span class="small-number">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ concept.title }}</h3>
          <p>{{ concept.text }}</p>
        </section>
      </div>
    </section>

    <section id="laboratorio" class="lesson-block lab-block" aria-labelledby="lab-title">
      <div class="section-heading">
        <span class="eyebrow">MEXA, OBSERVE, COMPARE</span>
        <h2 id="lab-title">Bancada de testes</h2>
      </div>
      <slot />
    </section>

    <CodeExample :code="lesson.code" :language="lesson.language" />

    <section class="answer-block" aria-labelledby="question-title">
      <span class="eyebrow">PERGUNTA-GUIA {{ lesson.number }}</span>
      <h2 id="question-title">{{ lesson.question }}</h2>
      <p v-for="paragraph in lesson.answer" :key="paragraph">{{ paragraph }}</p>
    </section>

    <section class="sources" aria-labelledby="sources-title">
      <h2 id="sources-title">Para ir a fonte</h2>
      <ul>
        <li v-for="source in lesson.sources" :key="source.url">
          <a :href="source.url" target="_blank" rel="noopener noreferrer"
            >{{ source.title }} <span aria-hidden="true">&nearr;</span
            ><span class="sr-only"> (abre em nova aba)</span></a
          >
        </li>
      </ul>
    </section>

    <div class="lesson-finish">
      <button
        class="button"
        :class="{ secondary: done }"
        :aria-pressed="done"
        @click="store.toggleComplete(lesson.id)"
      >
        {{ done ? 'Concluido. Desmarcar' : 'Marcar como concluido' }}
      </button>
      <RouterLink class="text-link" :to="next ? '/' + next.id : '/desafio'"
        >{{ next ? 'Proximo: ' + next.short : 'Ir para o Desafio' }}
        <span aria-hidden="true">&rarr;</span></RouterLink
      >
    </div>
    <p v-if="!store.storageAvailable" class="notice" role="status">
      O navegador bloqueou o armazenamento. O progresso permanece nesta sessao.
    </p>
  </article>
</template>
