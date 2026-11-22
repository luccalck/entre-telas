export interface Lesson {
  id: string
  number: string
  title: string
  short: string
  eyebrow: string
  intro: string
  concepts: { title: string; text: string }[]
  code: string
  language: string
  question: string
  answer: string[]
  sources: { title: string; url: string }[]
}

export const lessons: Lesson[] = [
  {
    id: 'fundamentos',
    number: '01',
    title: 'Uma web que cabe na vida real.',
    short: 'Por que ser responsivo',
    eyebrow: 'O ponto de partida',
    intro:
      'Um celular, uma janela dividida, uma TV. A mesma pagina precisa acompanhar o espaco disponivel sem perder leitura ou funcao.',
    concepts: [
      {
        title: 'Comece pelo essencial',
        text: 'Mobile-first e escrever primeiro o CSS para telas pequenas. Quando o conteudo precisa de mais espaco, acrescente regras com min-width. Escolha breakpoints pelo conteudo, nao por modelos de aparelho.',
      },
      {
        title: 'Viewport nao e resolucao',
        text: 'Viewport e a area de layout em pixels CSS. Um celular pode ter muitos pixels fisicos e uma viewport de 390 pixels CSS. Densidade de pixels nao transforma o celular em um desktop.',
      },
      {
        title: 'Responsivo tambem e acessivel',
        text: 'Texto legivel, zoom permitido, foco de teclado e controles que cabem importam tanto quanto reorganizar colunas. Teste a leitura e a interacao, nao so a aparencia.',
      },
    ],
    language: 'HTML + CSS',
    code: `<!-- Usa a largura do aparelho sem bloquear o zoom. -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
  /* A regra inicial atende telas pequenas. */
  .conteudo { display: grid; gap: 1rem; }
  /* O layout ganha uma coluna quando existe espaco. */
  @media (min-width: 48rem) {
    .conteudo { grid-template-columns: 2fr 1fr; }
  }
</style>`,
    question:
      'Um site tem media queries corretas, mas nao tem a meta viewport. Por que no celular aparece como um desktop minusculo? O que a meta muda?',
    answer: [
      'Sem a meta viewport, navegadores moveis podem usar uma viewport de layout virtual larga, frequentemente proxima de 980 pixels CSS, para acomodar paginas antigas. Depois reduzem a pagina para caber na tela fisica. O texto fica pequeno e as media queries podem avaliar uma largura virtual de desktop.',
      'width=device-width ajusta a viewport de layout a largura do dispositivo em pixels CSS, e initial-scale=1.0 define a escala inicial. As media queries passam a responder ao espaco correto. A meta nao cria responsividade sozinha: o CSS precisa ser flexivel, e o zoom deve continuar permitido.',
    ],
    sources: [
      {
        title: 'MDN: meta viewport',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport',
      },
      {
        title: 'MDN: responsive design',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design',
      },
    ],
  },
  {
    id: 'unidades',
    number: '02',
    title: 'Medidas que fazem sentido.',
    short: 'Unidades CSS',
    eyebrow: 'Escolha a referencia',
    intro:
      'Um numero em CSS so faz sentido com uma referencia. Isso deve acompanhar a fonte, o pai ou a janela?',
    concepts: [
      {
        title: 'Absolutas: px, cm, mm, in, pt',
        text: 'px e uma unidade absoluta de CSS, nao necessariamente um pixel fisico. Use em bordas e pequenos detalhes. cm, mm, in e pt sao mais comuns na impressao; em tela nao garantem o tamanho fisico aparente.',
      },
      {
        title: 'rem e em',
        text: 'rem acompanha a fonte da raiz. em em font-size usa a fonte herdada do pai; em propriedades como padding usa a fonte do proprio elemento. rem cria uma escala consistente; em permite componentes proporcionais ao seu texto.',
      },
      {
        title: '% e fr',
        text: '% depende da propriedade: em width, costuma usar a largura do bloco que contem o elemento; alturas percentuais precisam de referencia definida. fr divide o espaco livre em trilhas do Grid depois das trilhas fixas e dos gaps.',
      },
      {
        title: 'vw, vh e dvh',
        text: '1vw e 1% da largura da viewport. 1vh usa 1% da viewport grande nos navegadores atuais; barras moveis podem cobrir parte dela. dvh acompanha a altura dinamica disponivel. Para texto, prefira min-height a alturas rigidas.',
      },
      {
        title: 'ch e leitura',
        text: '1ch e a largura de avanco do caractere zero da fonte usada. max-width: 65ch ajuda a controlar o comprimento das linhas, mas nao significa exatamente 65 caracteres de qualquer texto.',
      },
    ],
    language: 'CSS',
    code: `:root {
  /* Respeita a preferencia de fonte do navegador. */
  font-size: 100%;
}
.artigo {
  max-width: 65ch;
  padding: 1.5rem;
  font-size: 1rem;
}
/* em acompanha o texto do proprio botao. */
.botao { padding: 0.6em 1em; }
.tela { min-height: 100dvh; }
.grade {
  display: grid;
  /* Duas partes do espaco livre para uma. */
  grid-template-columns: 2fr 1fr;
}`,
    question:
      'Uma pessoa aumenta a fonte padrao do navegador. Por que o texto em px pode manter o tamanho e o texto em rem aumentar?',
    answer: [
      'px define o tamanho em pixels CSS sem depender da fonte padrao. rem depende do font-size da raiz. Quando a raiz respeita o padrao do navegador, por exemplo com font-size: 100%, aumentar esse padrao tambem aumenta o texto em rem.',
      'Se a raiz for fixada em px, essa vantagem pode ser perdida. Alterar a fonte padrao e diferente de usar o zoom da pagina, que amplia tambem texto em px. Portanto, nao e correto dizer que px nunca aumenta.',
    ],
    sources: [
      {
        title: 'MDN: values and units',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units',
      },
      {
        title: 'MDN: CSS length',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length',
      },
    ],
  },
  {
    id: 'layout',
    number: '03',
    title: 'De uma linha a uma grade.',
    short: 'Flexbox e Grid',
    eyebrow: 'Organize o espaco',
    intro:
      'Flexbox distribui itens em uma direcao de cada vez. Grid coordena linhas e colunas. Uma grade pode conter cards que usam Flexbox.',
    concepts: [
      {
        title: 'Flexbox: uma dimensao',
        text: 'Use em menus, grupos de botoes e dentro de cards. justify-content distribui espaco no eixo principal; align-items alinha no eixo transversal. Com flex-direction: column, os eixos mudam.',
      },
      {
        title: 'Quebrar e separar',
        text: 'flex-wrap: wrap permite novas linhas. Cada linha flex distribui seu proprio espaco, sem alinhar todas as colunas como Grid. gap separa os itens sem margens especiais nas extremidades.',
      },
      {
        title: 'Grid: duas dimensoes',
        text: 'Use em galerias e estruturas que alinham linhas e colunas. repeat(auto-fit, minmax(14rem, 1fr)) cria tantas trilhas quanto couberem. auto-fit recolhe trilhas vazias; auto-fill pode preserva-las.',
      },
      {
        title: 'Inclua o intervalo na conta',
        text: 'Duas colunas de 14rem mais um intervalo de 1rem precisam de 29rem. Com raiz de 16px, sao 464px de largura util do conteudo do container, sem contar padding ou borda.',
      },
    ],
    language: 'CSS',
    code: `.acoes {
  /* Linha de acoes que pode quebrar. */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}
.cards {
  display: grid;
  gap: 1rem;
  /* min() protege containers menores que 14rem. */
  grid-template-columns: repeat(auto-fit, minmax(min(14rem, 100%), 1fr));
}`,
    question:
      'Com repeat(auto-fit, minmax(14rem, 1fr)) e gap: 1rem, em qual largura os cards passam de uma para duas colunas? Considere 1rem = 16px.',
    answer: [
      'Cada trilha minima mede 14 vezes 16 = 224px. Duas precisam de 448px, mais um gap de 16px: 448 + 16 = 464px. A partir de 464px de largura util do container cabem duas colunas, desde que existam pelo menos dois cards.',
      'Em 463px ainda ha uma coluna. Some padding e bordas se consultar a largura total da caixa. Para containers menores que 224px, a versao com min(14rem, 100%) evita overflow.',
    ],
    sources: [
      {
        title: 'MDN: Flexbox',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox',
      },
      {
        title: 'MDN: repeat() e auto-fit',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/repeat',
      },
    ],
  },
  {
    id: 'imagens',
    number: '04',
    title: 'A imagem cabe. O texto fica.',
    short: 'Imagens responsivas',
    eyebrow: 'Estabilidade tambem e design',
    intro:
      'Uma imagem responsiva se adapta ao container, entrega um arquivo adequado e reserva seu lugar antes de chegar.',
    concepts: [
      {
        title: 'Escalar sem distorcer',
        text: 'max-width: 100% impede a imagem de ultrapassar o container e height: auto preserva a proporcao. width e height no HTML informam a proporcao intrinseca antes do download; nao impedem o redimensionamento por CSS.',
      },
      {
        title: 'Recortar com intencao',
        text: 'aspect-ratio define a proporcao da caixa. object-fit: cover preenche com recorte; contain mostra tudo e pode deixar faixas. Preserve o que e importante no conteudo.',
      },
      {
        title: 'Carregar na hora certa',
        text: 'loading="lazy" adia imagens fora da area visivel. Nao use lazy na imagem principal acima da dobra, especialmente se for o LCP. Use alt coerente; imagens puramente decorativas devem usar alt vazio.',
      },
      {
        title: 'Escolher o arquivo',
        text: 'srcset oferece candidatos com larguras reais. sizes informa a largura de exibicao esperada. O navegador escolhe considerando viewport, densidade e outras condicoes. Com descritores w, sizes evita downloads desnecessarios.',
      },
    ],
    language: 'HTML + CSS',
    code: `<!-- Arquivos com 480px e 960px e proporcao reservada. -->
<img class="capa" src="paisagem-960.webp"
  srcset="paisagem-480.webp 480w, paisagem-960.webp 960w"
  sizes="(min-width: 48rem) 40rem, 90vw"
  width="960" height="540" loading="lazy"
  alt="Colinas verdes ao lado de um rio">
<style>
  /* Na imagem principal do topo, retire loading=lazy. */
  img { display: block; max-width: 100%; height: auto; }
  .capa { aspect-ratio: 16 / 9; object-fit: cover; }
</style>`,
    question:
      'Por que uma imagem sem width e height pode empurrar o texto depois de carregar? Qual metrica do Google mede esse problema?',
    answer: [
      'Sem dimensoes, aspect-ratio ou outra reserva no CSS, o navegador pode desconhecer a altura antes do download. Quando descobre as dimensoes, refaz o layout e desloca o texto ja visivel. width e height permitem reservar a proporcao antecipadamente.',
      'A metrica e CLS, Cumulative Layout Shift, que mede instabilidade por deslocamentos inesperados. Nao e um tempo em milissegundos. A referencia de boa experiencia e CLS ate 0,1 no percentil 75 das visitas. Nosso laboratorio mostra deslocamento local e nao calcula o CLS real da pagina.',
    ],
    sources: [
      {
        title: 'MDN: responsive images',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images',
      },
      { title: 'web.dev: optimize CLS', url: 'https://web.dev/articles/optimize-cls' },
      {
        title: 'web.dev: image lazy loading',
        url: 'https://web.dev/articles/browser-level-image-lazy-loading',
      },
    ],
  },
  {
    id: 'vue',
    number: '05',
    title: 'Uma base que aguenta crescer.',
    short: 'Boas praticas Vue',
    eyebrow: 'Estruture para entender',
    intro:
      'Organizar o projeto e dar uma responsabilidade clara a cada parte e manter o comportamento previsivel quando a interface muda.',
    concepts: [
      {
        title: 'Pastas e componentes',
        text: 'views/ guarda paginas; components/ guarda pecas reutilizaveis; stores/ compartilha estado; utils/ concentra regras puras; assets/ reune estilos e imagens. Use nomes de componentes com mais de uma palavra, como LessonLayout e GridLab.',
      },
      {
        title: 'Props e eventos tipados',
        text: 'Props levam dados do pai ao filho; eventos levam intencoes do filho ao pai. defineProps e defineEmits com TypeScript definem contratos e ajudam a detectar usos incorretos antes da execucao.',
      },
      {
        title: 'Identidade nao e posicao',
        text: 'No v-for, use :key com um id unico e estavel. O indice muda quando a lista e removida ou reordenada. Sem identidade correta, o Vue pode reutilizar um campo e associar seu estado ao item errado.',
      },
      {
        title: 'Tokens e rotas leves',
        text: 'Variaveis CSS em :root centralizam cores e espacamentos. import() nas rotas carrega paginas sob demanda e separa bundles. Nao use defineAsyncComponent como substituto do componente de rota lazy.',
      },
      {
        title: 'LCP, INP e CLS',
        text: 'LCP mede carregamento do maior conteudo visivel; INP mede resposta as interacoes durante a visita; CLS mede instabilidade. Metas boas no percentil 75: LCP ate 2,5s, INP ate 200ms e CLS ate 0,1. Um teste local nao comprova resultados de campo.',
      },
    ],
    language: 'Vue + TypeScript',
    code: `<!-- Arquivo: src/components/AnimalCard.vue -->
<script setup lang="ts">
// A prop recebe dados; o evento informa a intencao ao pai.
defineProps<{ animal: { id: number; nome: string } }>()
const emit = defineEmits<{ remover: [id: number] }>()
<\/script>
<template>
  <button @click="emit('remover', animal.id)">Remover {{ animal.nome }}</button>
</template>

<!-- Outro arquivo: src/views/AnimaisView.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import AnimalCard from '../components/AnimalCard.vue'

const animais = ref([{ id: 1, nome: 'Luna' }, { id: 2, nome: 'Bento' }])
function removerAnimal(id: number) {
  animais.value = animais.value.filter((animal) => animal.id !== id)
}
<\/script>
<template>
  <!-- O id mantem a identidade mesmo depois de uma remocao. -->
  <AnimalCard v-for="animal in animais" :key="animal.id"
    :animal="animal" @remover="removerAnimal" />
</template>

// Outro arquivo: src/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'
export default createRouter({
  history: createWebHashHistory(),
  routes: [
    // O componente so e baixado quando a rota e acessada.
    { path: '/animais', component: () => import('../views/AnimaisView.vue') },
  ],
})`,
    question:
      'Uma lista sem :key tem um campo por animal. A pessoa digita no segundo e remove o primeiro. O que pode acontecer com o texto e por que?',
    answer: [
      'O Vue pode atualizar elementos na mesma posicao em vez de mover cada elemento com a identidade do animal. O antigo segundo campo pode ser reutilizado para o animal que agora ocupa aquela posicao, fazendo o texto parecer pertencer ao animal errado. Componentes com estado interno tambem podem sofrer essa troca.',
      'Uma :key com id unico e estavel preserva a identidade de cada campo. O indice como chave nao resolve remocoes no inicio. Com v-model ligado a dados corretos o valor pode ser reaplicado, mas estado local e estado temporario do DOM ainda exigem identidade estavel.',
    ],
    sources: [
      { title: 'Vue: list rendering e key', url: 'https://vuejs.org/guide/essentials/list.html' },
      {
        title: 'Vue: TypeScript Composition API',
        url: 'https://vuejs.org/guide/typescript/composition-api',
      },
      {
        title: 'Vue Router: lazy loading',
        url: 'https://router.vuejs.org/guide/advanced/lazy-loading.html',
      },
      { title: 'web.dev: Web Vitals', url: 'https://web.dev/articles/vitals' },
    ],
  },
  {
    id: 'estado-api',
    number: '06',
    title: 'Dados que conectam as telas.',
    short: 'Pinia e consumo de API',
    eyebrow: 'Do componente para o projeto',
    intro:
      'O progresso aparece em todas as paginas: responsabilidade da store. Ja os dados do Vue abaixo chegam de uma API publica, com uma requisicao de verdade.',
    concepts: [
      {
        title: 'Uma fonte de estado',
        text: 'Pinia compartilha dados sem passar props por varias camadas. Aqui a store guarda capitulos concluidos e o estado da requisicao. Estado temporario de um controle continua no proprio componente.',
      },
      {
        title: 'Persistencia consciente',
        text: 'Pinia nao salva dados automaticamente depois de fechar a pagina. Gravamos apenas ids de progresso em localStorage e validamos a leitura. O armazenamento pertence a este navegador e origem, sem sincronizar aparelhos. Se bloqueado, o progresso fica apenas na sessao.',
      },
      {
        title: 'API sem atalhos',
        text: 'fetch consulta api.github.com/repos/vuejs/core. Verificamos response.ok, validamos campos e cancelamos por timeout. Sem rede ou com limite de requisicoes, ha erro e nova tentativa. Nao ha token no cliente nem dados inventados para esconder falhas.',
      },
    ],
    language: 'TypeScript',
    code: `import { defineStore } from 'pinia'

export const useExemploStore = defineStore('exemplo', {
  state: () => ({ estrelas: 0, erro: '' }),
  actions: {
    async carregar() {
      try {
        // HTTP 403 e 404 nao fazem fetch rejeitar sozinho.
        const resposta = await fetch('https://api.github.com/repos/vuejs/core')
        if (!resposta.ok) throw new Error('Falha na consulta')
        const dados = await resposta.json()
        // A store compartilha o resultado entre telas.
        this.estrelas = dados.stargazers_count
      } catch {
        this.erro = 'Nao foi possivel consultar. Tente novamente.'
      }
    },
  },
})`,
    question:
      'Por que usar Pinia para o progresso entre rotas e tratar carregamento e erro ao consumir uma API?',
    answer: [
      'Paginas podem ser desmontadas durante a navegacao. A store Pinia permanece na aplicacao e compartilha um unico progresso com menu e paginas. A persistencia entre recargas e feita separadamente por localStorage, quando disponivel.',
      'Uma requisicao leva tempo e pode falhar. Carregamento evita cliques duplicados; validar status e formato impede dados invalidos; erro e nova tentativa devolvem controle ao usuario.',
    ],
    sources: [
      { title: 'Pinia: introduction', url: 'https://pinia.vuejs.org/introduction.html' },
      { title: 'Pinia: actions', url: 'https://pinia.vuejs.org/core-concepts/actions.html' },
      {
        title: 'MDN: using Fetch',
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
      },
      {
        title: 'GitHub REST: repository',
        url: 'https://docs.github.com/en/rest/repos/repos#get-a-repository',
      },
    ],
  },
]

export function getLesson(id: string): Lesson {
  const lesson = lessons.find((item) => item.id === id)
  if (!lesson) throw new Error('Secao nao encontrada')
  return lesson
}
