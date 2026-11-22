import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { parseProgress, useGuideStore } from '@/stores/guide'

beforeEach(() => {
  localStorage.clear()
  setActivePinia(createPinia())
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('Progresso Pinia', () => {
  it('descarta dados corrompidos, repetidos e ids desconhecidos', () => {
    expect(parseProgress('incorreto')).toEqual([])
    expect(parseProgress('{"id":1}')).toEqual([])
    expect(parseProgress('["layout", "layout", "invalido", 42]')).toEqual(['layout'])
  })
  it('mantem uma unica conclusao por capitulo e persiste ao recriar a store', () => {
    const store = useGuideStore()
    store.toggleComplete('layout')
    expect(store.completed).toEqual(['layout'])
    expect(store.percentage).toBe(17)
    setActivePinia(createPinia())
    expect(useGuideStore().completed).toEqual(['layout'])
    useGuideStore().toggleComplete('layout')
    expect(useGuideStore().completed).toEqual([])
    useGuideStore().toggleComplete('desconhecido')
    expect(useGuideStore().completed).toEqual([])
  })
  it('continua funcionando quando o armazenamento e bloqueado', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Blocked')
    })
    const store = useGuideStore()
    store.toggleComplete('vue')
    expect(store.completed).toEqual(['vue'])
    expect(store.storageAvailable).toBe(false)
  })
})

describe('API externa', () => {
  it('guarda dados recebidos e encerra o carregamento', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          full_name: 'vuejs/core',
          stargazers_count: 50000,
          open_issues_count: 100,
        }),
      }),
    )
    const store = useGuideStore()
    await store.loadRepository()
    expect(store.repository?.stars).toBe(50000)
    expect(store.error).toBe('')
    expect(store.loading).toBe(false)
  })
  it.each([
    { ok: false, status: 403 },
    { ok: true, json: async () => ({ full_name: 'vuejs/core' }) },
  ])('nao exibe sucesso para HTTP invalido ou formato incompleto', async (response) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response))
    const store = useGuideStore()
    await store.loadRepository()
    expect(store.repository).toBeNull()
    expect(store.error).toContain('Nao foi possivel')
    expect(store.loading).toBe(false)
  })
  it('permite nova tentativa depois de falha de rede', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockRejectedValueOnce(new Error('Offline'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            full_name: 'vuejs/core',
            stargazers_count: 42,
            open_issues_count: 3,
          }),
        }),
    )
    const store = useGuideStore()
    await store.loadRepository()
    expect(store.error).not.toBe('')
    await store.loadRepository()
    expect(store.error).toBe('')
    expect(store.repository?.stars).toBe(42)
  })
})
