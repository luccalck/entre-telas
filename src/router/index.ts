import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/HomeView.vue'), meta: { title: 'Visao geral' } },
    {
      path: '/fundamentos',
      component: () => import('@/views/FundamentalsView.vue'),
      meta: { title: 'Por que ser responsivo' },
    },
    {
      path: '/unidades',
      component: () => import('@/views/UnitsView.vue'),
      meta: { title: 'Unidades CSS' },
    },
    {
      path: '/layout',
      component: () => import('@/views/LayoutView.vue'),
      meta: { title: 'Flexbox e Grid' },
    },
    {
      path: '/imagens',
      component: () => import('@/views/ImagesView.vue'),
      meta: { title: 'Imagens responsivas' },
    },
    {
      path: '/vue',
      component: () => import('@/views/VueView.vue'),
      meta: { title: 'Boas praticas Vue' },
    },
    {
      path: '/estado-api',
      component: () => import('@/views/StateView.vue'),
      meta: { title: 'Pinia e API' },
    },
    {
      path: '/desafio',
      component: () => import('@/views/ChallengeView.vue'),
      meta: { title: 'Desafio' },
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'Pagina nao encontrada' },
    },
  ],
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, top: 24 }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = `${String(to.meta.title)} | Entre Telas`
})

export default router
