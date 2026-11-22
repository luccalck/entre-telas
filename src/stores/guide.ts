import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { lessons } from '@/data/lessons'

const storageKey = 'entre-telas-progresso-v1'
const validIds = new Set(lessons.map((lesson) => lesson.id))

export function parseProgress(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? '[]')
    if (!Array.isArray(value)) return []
    return [
      ...new Set(value.filter((id): id is string => typeof id === 'string' && validIds.has(id))),
    ]
  } catch {
    return []
  }
}

interface Repository {
  name: string
  stars: number
  issues: number
  url: string
}

export const useGuideStore = defineStore('guide', () => {
  const completed = ref<string[]>([])
  const storageAvailable = ref(true)
  const repository = ref<Repository | null>(null)
  const loading = ref(false)
  const error = ref('')
  const loadedAt = ref('')
  const percentage = computed(() => Math.round((completed.value.length / lessons.length) * 100))

  try {
    completed.value = parseProgress(localStorage.getItem(storageKey))
  } catch {
    storageAvailable.value = false
  }

  function toggleComplete(id: string) {
    if (!validIds.has(id)) return
    completed.value = completed.value.includes(id)
      ? completed.value.filter((item) => item !== id)
      : [...completed.value, id]
    try {
      localStorage.setItem(storageKey, JSON.stringify(completed.value))
    } catch {
      storageAvailable.value = false
    }
  }

  async function loadRepository() {
    if (loading.value) return
    loading.value = true
    error.value = ''
    repository.value = null
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    try {
      const response = await fetch('https://api.github.com/repos/vuejs/core', {
        signal: controller.signal,
        headers: { Accept: 'application/vnd.github+json' },
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data: unknown = await response.json()
      if (typeof data !== 'object' || data === null) throw new Error('Formato invalido')
      const item = data as Record<string, unknown>
      if (
        typeof item.full_name !== 'string' ||
        typeof item.stargazers_count !== 'number' ||
        typeof item.open_issues_count !== 'number'
      )
        throw new Error('Formato invalido')
      repository.value = {
        name: item.full_name,
        stars: item.stargazers_count,
        issues: item.open_issues_count,
        url: 'https://github.com/vuejs/core',
      }
      loadedAt.value = new Date().toLocaleTimeString('pt-BR')
    } catch (cause) {
      error.value =
        cause instanceof Error && cause.name === 'AbortError'
          ? 'A consulta excedeu 8 segundos. Verifique a conexao e tente novamente.'
          : 'Nao foi possivel consultar a API. Verifique a conexao ou o limite do GitHub e tente novamente.'
    } finally {
      clearTimeout(timeout)
      loading.value = false
    }
  }

  return {
    completed,
    percentage,
    storageAvailable,
    repository,
    loading,
    error,
    loadedAt,
    toggleComplete,
    loadRepository,
  }
})
