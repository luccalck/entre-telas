# Entre Telas

Guia interativo de responsividade desenvolvido com Vue 3. A proposta é entender os conceitos pelo uso: mudar uma medida, observar o layout e explicar o resultado.

**Integrantes:** Lucca Castilho Costa e Lucas Souza.

- [Abrir o site](https://luccalck.github.io/entre-telas/)
- [Repositório](https://github.com/luccalck/entre-telas)

## Executar localmente

Requisito: Node.js 22.18 ou superior da linha 22, ou Node.js 24.12 ou superior. Desenvolvimento validado com Node.js 24.

```sh
npm ci
npm run dev
```

Abra `http://127.0.0.1:5184/`. O servidor usa uma única porta fixa. Se ela estiver ocupada, avisa em vez de iniciar outra porta.

```sh
npm run test:unit -- --run
npm run build
npm run preview
```

O build executa a verificação TypeScript e gera os arquivos de produção em `dist/`. `preview` serve esse build para conferência local. Para abrir em um celular, use o site publicado acima, sem precisar expor o servidor de desenvolvimento na rede.

## Conteúdo e navegação

| Rota            | Conteúdo                                         | Prática                             |
| --------------- | ------------------------------------------------ | ----------------------------------- |
| `#/`            | Apresentação e índice                            | Acesso aos capítulos                |
| `#/fundamentos` | Viewport, mobile-first e acesso                  | Largura de um contêiner             |
| `#/unidades`    | Unidades absolutas e relativas                   | Conversor contextual para px        |
| `#/layout`      | Flexbox, Grid e intervalos                       | Grade real com largura ajustável    |
| `#/imagens`     | Dimensões, proporção, lazy loading e srcset      | Comparação de reserva de espaço     |
| `#/vue`         | Componentes, contratos, key, tokens e Web Vitals | Identidade de campos em uma lista   |
| `#/estado-api`  | Pinia, persistência e fetch                      | Consulta real à API do GitHub       |
| `#/desafio`     | Pergunta criada pela dupla                       | Resposta, dica e correção explicada |

Cada capítulo contém explicação, exemplo de código comentado, resposta à pergunta-guia e fontes oficiais no final. Os comentários ficam nos exemplos didáticos exibidos, conforme o enunciado.

O PDF anuncia seis seções, mas enumera cinco. Os cinco tópicos foram preservados, e a sexta seção reúne Pinia e consumo de API, tecnologias mencionadas na apresentação do projeto.

## Como experimentar os laboratórios

1. **Largura:** ajuste o controle e compare o conteúdo empilhado com duas colunas. A container query usa 30rem de largura de conteúdo. A medição informa a largura útil, desconta as bordas e avisa somente quando a janela realmente limita a caixa. O estado exibido é lido do CSS calculado, e o limite do controle acompanha fontes ampliadas.
2. **Unidades:** com raiz de 16px, 1,5rem vale 24px. Altere a raiz para 20px: o resultado vira 30px. Em seguida converta 24px e compare. `%` corresponde à largura do pai e `em` ao padding do elemento; as referências são editáveis e não se passam por medidas do aparelho. Campos vazios e referências inválidas mostram uma orientação, sem serem convertidos em zero.
3. **Grid:** use os botões 463, 464, 703 e 704px em uma janela ampla. Com raiz de 16px, o navegador calcula respectivamente uma, duas, duas e três colunas. O laboratório lê as trilhas calculadas de uma grade CSS real; não desenha uma simulação de colunas por fórmula.
4. **Imagens:** clique para inserir a imagem após 1,8s. Compare o texto sem reserva com o texto abaixo da caixa que já reservava a proporção. O atraso é deliberado e não representa um teste de rede ou uma medição real de CLS.
5. **Key:** escreva no campo de Bento e remova o primeiro animal. Com id estável, a anotação acompanha Bento; com chave por posição, pode aparecer no campo de Nina. O uso incorreto da posição existe apenas neste experimento comparativo.

O indicador fixo mostra a largura real da janela em pixels CSS. Os nomes Compacto, Intermediário e Amplo representam os intervalos abaixo de 768px, de 768 a 1023px e a partir de 1024px. O menu se recolhe abaixo de 48rem.

## Estado e API

O progresso dos seis capítulos é compartilhado com Pinia. A persistência usa `localStorage`, com validação dos ids e tratamento de armazenamento bloqueado. Os dados pertencem ao navegador e à origem atual; não são sincronizados com outros aparelhos.

A seção de API consulta `https://api.github.com/repos/vuejs/core`, sem senha ou token. Há estado de carregamento, validação HTTP, validação dos campos recebidos, timeout de oito segundos e botão de nova tentativa. A contagem `open_issues_count` inclui issues e pull requests abertos, como indicado na interface.

Para testar falha, abra DevTools → Network → Offline e atualize os dados. Depois volte para No throttling e tente novamente. Dados simulados aparecem apenas nos testes automatizados isolados; a página não usa um resultado fictício para ocultar indisponibilidade da API.

## Organização

```text
src/
  assets/          Estilos, tokens e ilustração local
  components/     Layout de capítulo, controles e indicador
    labs/         Laboratórios interativos
  data/           Conteúdo, exemplos e fontes
  router/         Rotas com carregamento sob demanda
  stores/         Progresso e consulta da API
  utils/          Conversões e regras de medidas
  views/          Uma página por seção e o Desafio
  __tests__/      Testes de medidas, persistência e falhas
.github/workflows/pages.yml
```

O projeto foi iniciado com `npm create vue@latest`, selecionando TypeScript, Vue Router, Pinia e Vitest. Usa Composition API, props e eventos tipados, `:key` estável nas listas de produção e rotas lazy com `import()`.

## Responsividade e acessibilidade

- CSS mobile-first; media queries de largura usam `min-width`.
- Cores e espaçamentos em variáveis CSS de `:root`; fontes e espaçamentos em rem.
- Grid com `minmax(min(14rem, 100%), 1fr)` para proteger contêineres estreitos.
- Menu móvel com estado expandido, fechamento ao navegar (inclusive na rota já ativa) e suporte a Escape. A abertura no fluxo da página acompanha a altura do cabeçalho.
- Link para pular ao conteúdo, foco visível, rótulos de controles e feedback textual.
- Zoom permitido, preferência por movimento reduzido e imagens com alternativa textual. Reflow conferido com fonte padrão de 32px nas larguras de 320px e 375px.
- Exemplos de código quebram linha para não criar rolagem horizontal.

As metas de LCP, INP e CLS são explicadas no guia. Elas não são apresentadas como resultados de campo deste site.

## Validação técnica

A revisão executou 35 testes automatizados, checagem TypeScript, build de produção e verificação de formatação. Foram conferidas as oito telas em cinco larguras e novamente com fonte padrão ampliada para 32px em 320px e 375px. O menu, as conversões, os limites da grade, a identidade dos campos, a persistência e os estados de erro da API foram testados.

## Publicação

O workflow confere formatação, executa testes e build antes de publicar no GitHub Pages. O Router usa hash e o Vite usa base relativa, permitindo abrir e recarregar as rotas em hospedagem estática sem regras de servidor.

Para republicar uma atualização, envie os commits para `main`. Acompanhe a execução em Actions → Publicar Entre Telas.

## Entrega solicitada

Os dois integrantes devem entregar:

1. Link do site publicado.
2. Link deste repositório.
3. Captura do site rodando no aparelho celular da dupla.

A captura em celular físico foi realizada pela dupla. As imagens mostram a página inicial, o menu móvel e o rodapé com a identificação dos integrantes e acompanham a entrega dos dois links. As capturas de emulação usadas no desenvolvimento não substituem essas imagens do aparelho.

O PDF informa apresentação em 01/12/2026 e entrega até 22/12/2026, às 23h59. Não exige envio de ZIP. Os laboratórios devem ser compreendidos pela dupla para a apresentação.

## Fontes e recursos

As fontes ficam vinculadas ao final de cada capítulo: documentação de [Vue](https://vuejs.org/), [Vue Router](https://router.vuejs.org/), [Pinia](https://pinia.vuejs.org/), [MDN](https://developer.mozilla.org/) e [web.dev](https://web.dev/articles/vitals). A consulta externa usa a [API REST do GitHub](https://docs.github.com/en/rest/repos/repos#get-a-repository).

As ilustrações e os diagramas são recursos locais do projeto; não dependem de bancos de imagens. As famílias tipográficas usam fontes disponíveis no dispositivo, com alternativas locais, sem download de fontes externas.
