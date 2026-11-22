<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { lessons } from '@/data/lessons'
</script>

<template>
  <div class="home-page">
    <header class="home-hero">
      <div class="hero-copy">
        <p class="eyebrow"><span class="tiny-square"></span>UM GUIA PRATICO, EM CONSTANTE AJUSTE</p>
        <h1>A web nao tem<br />um tamanho <em>so.</em></h1>
        <p class="lead">
          Aprenda a criar interfaces que se adaptam.<br />Entenda o conceito, mexa no codigo e veja
          o layout responder.
        </p>
        <RouterLink class="button" to="/fundamentos"
          >Comecar pelo essencial <span aria-hidden="true">&rarr;</span></RouterLink
        >
        <p class="hero-note">6 capitulos / 5 laboratorios / 1 desafio</p>
      </div>
      <div
        class="hero-diagram"
        role="img"
        aria-label="A mesma composicao se reorganiza em uma tela larga e em um celular"
      >
        <span class="diagram-label">O CONTEUDO E O MESMO.</span>
        <div class="diagram-desktop">
          <div class="diagram-top"><span></span><span></span><span></span></div>
          <div class="diagram-content">
            <div class="diagram-art"><span></span></div>
            <div class="diagram-text"><b></b><i></i><i></i><i></i><small></small></div>
          </div>
          <div class="diagram-cards"><span></span><span></span><span></span></div>
        </div>
        <div class="diagram-phone">
          <div class="phone-speaker"></div>
          <div class="diagram-art"><span></span></div>
          <b></b><i></i><i></i><small></small>
          <div class="phone-bottom"></div>
        </div>
        <span class="diagram-caption">A FORMA ENCONTRA SEU ESPACO.</span
        ><span class="diagram-cross" aria-hidden="true">+</span>
      </div>
    </header>
    <div class="intro-strip">
      <p>
        <strong>Observe. Ajuste. Entenda.</strong
        ><span>Este guia foi feito para usar, nao so para ler.</span>
      </p>
      <span class="strip-arrow" aria-hidden="true">&darr;</span>
    </div>
    <section class="chapter-directory" aria-labelledby="directory-title">
      <div class="directory-heading">
        <div>
          <p class="eyebrow">SEU PERCURSO</p>
          <h2 id="directory-title">Do primeiro pixel<br />ao projeto inteiro.</h2>
        </div>
        <p>Comece na ordem ou va direto<br />ao conceito que quer experimentar.</p>
      </div>
      <div class="directory-grid">
        <RouterLink
          v-for="lesson in lessons"
          :key="lesson.id"
          :to="'/' + lesson.id"
          class="directory-card"
          ><span class="eyebrow"
            >CAPITULO {{ lesson.number }} <span aria-hidden="true">&nearr;</span></span
          >
          <h3>{{ lesson.short }}</h3>
          <p>{{ lesson.eyebrow }}</p></RouterLink
        >
      </div>
    </section>
    <section class="challenge-banner">
      <div>
        <p class="eyebrow">ENTENDEU MESMO?</p>
        <h2>Coloque o guia a prova.</h2>
        <p>Uma pergunta. Uma grade real. A resposta esta no que voce experimentou.</p>
      </div>
      <RouterLink to="/desafio" class="button light"
        >Abrir o desafio <span aria-hidden="true">&rarr;</span></RouterLink
      >
    </section>
  </div>
</template>
