# Entre Telas

Guia interativo de responsividade desenvolvido com Vue 3. A proposta Ã© entender os conceitos pelo uso: mudar uma medida, observar o layout e explicar o resultado.

**Integrantes:** Lucca Castilho Costa e Lucas Souza.

- [Abrir o site](https://luccalck.github.io/entre-telas/)
- [RepositÃ³rio](https://github.com/luccalck/entre-telas)

## Executar localmente

Requisito: Node.js 22.18 ou superior da linha 22, ou Node.js 24.12 ou superior. Desenvolvimento validado com Node.js 24.

```sh
npm ci
npm run dev
```

Abra `http://127.0.0.1:5184/`. O servidor usa uma Ãºnica porta fixa. Se ela estiver ocupada, avisa em vez de iniciar outra porta.

```sh
npm run test:unit -- --run
npm run build
npm run preview
```

O build executa a verificaÃ§Ã£o TypeScript e gera os arquivos de produÃ§Ã£o em `dist/`. `preview` serve esse build para conferÃªncia local. Para abrir em um celular, use o site publicado acima, sem precisar expor o servidor de desenvolvimento na rede.

## ConteÃºdo e navegaÃ§Ã£o

| Rota            | ConteÃºdo                                        | PrÃ¡tica                              |
| --------------- | ------------------------------------------------ | ------------------------------------- |
| `#/`            | ApresentaÃ§Ã£o e Ã­ndice                         | Acesso aos capÃ­tulos                 |
| `#/fundamentos` | Viewport, mobile-first e acesso                  | Largura de um contÃªiner              |
| `#/unidades`    | Unidades absolutas e relativas                   | Conversor contextual para px          |
| `#/layout`      | Flexbox, Grid e intervalos                       | Grade real com largura ajustÃ¡vel     |
| `#/imagens`     | DimensÃµes, proporÃ§Ã£o, lazy loading e srcset   | ComparaÃ§Ã£o de reserva de espaÃ§o    |
| `#/vue`         | Componentes, contratos, key, tokens e Web Vitals | Identidade de campos em uma lista     |
| `#/estado-api`  | Pinia, persistÃªncia e fetch                     | Consulta real Ã  API do GitHub        |
| `#/desafio`     | Pergunta criada pela dupla                       | Resposta, dica e correÃ§Ã£o explicada |

Cada capÃ­tulo contÃ©m explicaÃ§Ã£o, exemplo de cÃ³digo comentado, resposta Ã  pergunta-guia e fontes oficiais no final. Os comentÃ¡rios ficam nos exemplos didÃ¡ticos exibidos, conforme o enunciado.

O PDF anuncia seis seÃ§Ãµes, mas enumera cinco. Os cinco tÃ³picos foram preservados, e a sexta seÃ§Ã£o reÃºne Pinia e consumo de API, tecnologias mencionadas na apresentaÃ§Ã£o do projeto.

## Como experimentar os laboratÃ³rios

1. **Largura:** ajuste o controle e compare o conteÃºdo empilhado com duas colunas. A container query usa 30rem de largura de conteÃºdo. A mediÃ§Ã£o informa o espaÃ§o real e avisa quando a janela limita a largura solicitada.
2. **Unidades:** com raiz de 16px, 1,5rem vale 24px. Altere a raiz para 20px: o resultado vira 30px. Em seguida converta 24px e compare. `%` corresponde Ã  largura do pai e `em` ao padding do elemento; as referÃªncias sÃ£o editÃ¡veis e nÃ£o se passam por medidas do aparelho.
3. **Grid:** use os botÃµes 463, 464, 703 e 704px em uma janela ampla. Com raiz de 16px, o navegador calcula respectivamente uma, duas, duas e trÃªs colunas. O laboratÃ³rio lÃª as trilhas calculadas de uma grade CSS real; nÃ£o desenha uma simulaÃ§Ã£o de colunas por fÃ³rmula.
4. **Imagens:** clique para inserir a imagem apÃ³s 1,8s. Compare o texto sem reserva com o texto abaixo da caixa que jÃ¡ reservava a proporÃ§Ã£o. O atraso Ã© deliberado e nÃ£o representa um teste de rede ou uma mediÃ§Ã£o real de CLS.
5. **Key:** escreva no campo de Bento e remova o primeiro animal. Com id estÃ¡vel, a anotaÃ§Ã£o acompanha Bento; com chave por posiÃ§Ã£o, pode aparecer no campo de Nina. O uso incorreto da posiÃ§Ã£o existe apenas neste experimento comparativo.

O indicador fixo mostra a largura real da janela em pixels CSS. Os nomes Compacto, IntermediÃ¡rio e Amplo representam os intervalos abaixo de 768px, de 768 a 1023px e a partir de 1024px. O menu se recolhe abaixo de 48rem.

## Estado e API

O progresso dos seis capÃ­tulos Ã© compartilhado com Pinia. A persistÃªncia usa `localStorage`, com validaÃ§Ã£o dos ids e tratamento de armazenamento bloqueado. Os dados pertencem ao navegador e Ã  origem atual; nÃ£o sÃ£o sincronizados com outros aparelhos.

A seÃ§Ã£o de API consulta `https://api.github.com/repos/vuejs/core`, sem senha ou token. HÃ¡ estado de carregamento, validaÃ§Ã£o HTTP, validaÃ§Ã£o dos campos recebidos, timeout de oito segundos e botÃ£o de nova tentativa. A contagem `open_issues_count` inclui issues e pull requests abertos, como indicado na interface.

Para testar falha, abra DevTools â†’ Network â†’ Offline e atualize os dados. Depois volte para No throttling e tente novamente. Dados simulados aparecem apenas nos testes automatizados isolados; a pÃ¡gina nÃ£o usa um resultado fictÃ­cio para ocultar indisponibilidade da API.

## OrganizaÃ§Ã£o

```text
src/
  assets/          Estilos, tokens e ilustraÃ§Ã£o local
  components/     Layout de capÃ­tulo, controles e indicador
    labs/         LaboratÃ³rios interativos
  data/           ConteÃºdo, exemplos e fontes
  router/         Rotas com carregamento sob demanda
  stores/         Progresso e consulta da API
  utils/          ConversÃµes e regras de medidas
  views/          Uma pÃ¡gina por seÃ§Ã£o e o Desafio
  __tests__/      Testes de medidas, persistÃªncia e falhas
.github/workflows/pages.yml
```

O projeto foi iniciado com `npm create vue@latest`, selecionando TypeScript, Vue Router, Pinia e Vitest. Usa Composition API, props e eventos tipados, `:key` estÃ¡vel nas listas de produÃ§Ã£o e rotas lazy com `import()`.

## Responsividade e acessibilidade

- CSS mobile-first; media queries de largura usam `min-width`.
- Cores e espaÃ§amentos em variÃ¡veis CSS de `:root`; fontes e espaÃ§amentos em rem.
- Grid com `minmax(min(14rem, 100%), 1fr)` para proteger contÃªineres estreitos.
- Menu mÃ³vel com estado expandido, fechamento ao navegar e suporte a Escape.
- Link para pular ao conteÃºdo, foco visÃ­vel, rÃ³tulos de controles e feedback textual.
- Zoom permitido, preferÃªncia por movimento reduzido e imagens com alternativa textual.
- Exemplos de cÃ³digo quebram linha para nÃ£o criar rolagem horizontal.

As metas de LCP, INP e CLS sÃ£o explicadas no guia. Elas nÃ£o sÃ£o apresentadas como resultados de campo deste site.

## PublicaÃ§Ã£o

O workflow executa testes e build antes de publicar no GitHub Pages. O Router usa hash e o Vite usa base relativa, permitindo abrir e recarregar as rotas em hospedagem estÃ¡tica sem regras de servidor.

Para republicar uma atualizaÃ§Ã£o, envie os commits para `main`. Acompanhe a execuÃ§Ã£o em Actions â†’ Publicar Entre Telas.

## Entrega solicitada

Os dois integrantes devem entregar:

1. Link do site publicado.
2. Link deste repositÃ³rio.
3. Captura do site rodando no aparelho celular da dupla.

**A captura em celular fÃ­sico ainda precisa ser feita pela dupla.** Abra o site no navegador do celular, mostre uma seÃ§Ã£o ou laboratÃ³rio e faÃ§a uma captura de tela do prÃ³prio aparelho. Uma imagem de emulaÃ§Ã£o do computador nÃ£o substitui esse item.

O PDF informa apresentaÃ§Ã£o em 01/12/2026 e entrega atÃ© 22/12/2026, Ã s 23h59. NÃ£o exige envio de ZIP. Os laboratÃ³rios devem ser compreendidos pela dupla para a apresentaÃ§Ã£o.

## Fontes e recursos

As fontes ficam vinculadas ao final de cada capÃ­tulo: documentaÃ§Ã£o de [Vue](https://vuejs.org/), [Vue Router](https://router.vuejs.org/), [Pinia](https://pinia.vuejs.org/), [MDN](https://developer.mozilla.org/) e [web.dev](https://web.dev/articles/vitals). A consulta externa usa a [API REST do GitHub](https://docs.github.com/en/rest/repos/repos#get-a-repository).

As ilustraÃ§Ãµes e os diagramas sÃ£o recursos locais do projeto; nÃ£o dependem de bancos de imagens. As famÃ­lias tipogrÃ¡ficas usam fontes disponÃ­veis no dispositivo, com alternativas locais, sem download de fontes externas.
