import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, nextTick, type App as VueApp } from 'vue'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '@/App.vue'
import UnitsLab from '@/components/labs/UnitsLab.vue'

let app: VueApp | undefined

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
})

afterEach(() => {
  app?.unmount()
  app = undefined
  document.body.replaceChildren()
  vi.unstubAllGlobals()
})

function attach() {
  const target = document.createElement('div')
  document.body.append(target)
  return target
}

async function setInput(label: string, value: string) {
  const input = [...document.querySelectorAll('label')]
    .find((item) => item.textContent?.trim() === label)
    ?.querySelector('input')
  if (!input) throw new Error('Controle nao encontrado: ' + label)
  input.value = value
  input.dispatchEvent(new Event('input', { bubbles: true }))
  await nextTick()
}

describe('Regressoes de interface', () => {
  it('nao transforma campos vazios ou fonte negativa em uma conversao valida', async () => {
    app = createApp(UnitsLab)
    app.mount(attach())
    await setInput('Fonte raiz (px)', '')
    expect(document.querySelector('.conversion')?.textContent).toContain('Valor invalido')
    await setInput('Fonte raiz (px)', '-16')
    expect(document.querySelector('.conversion')?.textContent).toContain('Valor invalido')
    await setInput('Fonte raiz (px)', '20')
    expect(document.querySelector('.conversion')?.textContent).toContain('30px')
    await setInput('Valor', '')
    expect(document.querySelector('.conversion')?.textContent).toContain('Valor invalido')
    await setInput('Valor', '0')
    expect(document.querySelector('.conversion')?.textContent).toContain('0px')
  })

  it('fecha o menu ao selecionar a rota que ja esta ativa', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/', component: { template: '<h1>Inicio</h1>' } }],
    })
    await router.push('/')
    await router.isReady()
    app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.mount(attach())
    const menu = document.querySelector<HTMLButtonElement>('.menu-toggle')!
    menu.click()
    await nextTick()
    expect(menu.getAttribute('aria-expanded')).toBe('true')
    document.querySelector<HTMLAnchorElement>('.overview-link')!.click()
    await nextTick()
    await nextTick()
    expect(menu.getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement?.id).toBe('conteudo')
  })
})
