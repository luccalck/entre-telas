<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import CodeExample from '@/components/CodeExample.vue'
const answer = ref<number | null>(null)
const submitted = ref(false)
const hint = ref(false)
function check() {
  submitted.value = true
}
const code = `/* Quatro cards; o espaco restante e distribuido. */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}`
</script>

<template>
  <article class="challenge-page">
    <header class="lesson-hero">
      <p class="eyebrow">O DESAFIO DA DUPLA</p>
      <h1>Mais uma coluna.<br />Quanto espaco?</h1>
      <p class="lead">
        A resposta nao esta na sorte. Esta na largura de cada card e nos intervalos que voce testou.
      </p>
    </header>
    <section class="lab-shell">
      <p class="eyebrow">UMA PERGUNTA PARA USAR O GUIA</p>
      <h2>
        Em nosso laboratorio de Grid, qual e a menor largura util para os quatro cards passarem a
        ocupar tres colunas?
      </h2>
      <p>
        Considere a raiz de 16px, minimo de 14rem por trilha e gap de 1rem. Nao inclua padding ou
        borda. Use o laboratorio para conferir o ponto exato.
      </p>
      <RouterLink class="text-link" to="/layout#laboratorio"
        >Consultar o laboratorio de Grid &nearr;</RouterLink
      >
      <form class="challenge-form" @submit.prevent="check">
        <label for="challenge-answer">Largura minima em pixels CSS</label>
        <div>
          <input
            id="challenge-answer"
            v-model.number="answer"
            required
            type="number"
            min="1"
            step="1"
            placeholder="Sua resposta"
            @input="submitted = false"
          /><button class="button" type="submit">Conferir resposta &rarr;</button>
        </div>
      </form>
      <button class="text-link hint-button" :aria-expanded="hint" @click="hint = !hint">
        {{ hint ? 'Ocultar dica' : 'Preciso de uma dica' }}
      </button>
      <p v-if="hint" class="notice">
        Tres colunas tem dois intervalos. Converta o minimo de cada card e some os dois gaps.
      </p>
      <div
        v-if="submitted"
        class="challenge-feedback"
        :class="{ correct: answer === 704 }"
        role="status"
      >
        <h3>
          {{
            answer === 704
              ? 'Isso. Cada intervalo conta.'
              : 'Ainda nao. Repare nos dois intervalos.'
          }}
        </h3>
        <p>
          Tres cards de 14rem: 3 x 14 x 16 = 672px. Dois gaps: 2 x 16 = 32px. Total:
          <strong>704px</strong>. Em 703px cabem duas colunas; em 704px cabem tres, e o quarto card
          vai para a linha seguinte.
        </p>
        <p>
          Se a fonte raiz mudar, o limite em pixels tambem muda. Por isso o enunciado fixa 16px.
        </p>
      </div>
    </section>
    <CodeExample :code="code" language="CSS" />
    <section class="sources">
      <h2>Continue investigando</h2>
      <p>
        Altere a fonte raiz no laboratorio de unidades. Depois refaca a conta para quatro colunas e
        teste sua previsao em uma janela mais larga.
      </p>
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/repeat"
        target="_blank"
        rel="noopener noreferrer"
        >MDN: repeat() e trilhas automaticas &nearr;</a
      >
    </section>
  </article>
</template>
