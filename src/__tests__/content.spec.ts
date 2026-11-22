import { describe, expect, it } from 'vitest'
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'
import { getLesson, lessons } from '@/data/lessons'

describe('Conteudo do guia', () => {
  it('mantem explicacao, exemplo comentado, resposta e fontes nos seis capitulos', () => {
    expect(lessons).toHaveLength(6)
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(6)
    for (const lesson of lessons) {
      expect(lesson.intro.length).toBeGreaterThan(30)
      expect(lesson.concepts.length).toBeGreaterThanOrEqual(3)
      expect(lesson.code).toMatch(/\/\/|\/\*|<!--/)
      expect(lesson.question.length).toBeGreaterThan(30)
      expect(lesson.answer.length).toBeGreaterThanOrEqual(2)
      expect(lesson.sources.every((source) => source.url.startsWith('https://'))).toBe(true)
    }
  })
  it('compila os dois arquivos Vue do exemplo didatico', () => {
    const code = getLesson('vue').code
    const child = code.split('<!-- Outro arquivo:')[0]!
    const parent = code
      .split('<!-- Outro arquivo: src/views/AnimaisView.vue -->')[1]!
      .split('// Outro arquivo: src/router/index.ts')[0]!
    for (const [index, source] of [child, parent].entries()) {
      const filename = index === 0 ? 'AnimalCard.vue' : 'AnimaisView.vue'
      const { descriptor, errors } = parse(source, { filename })
      expect(errors).toEqual([])
      const script = compileScript(descriptor, { id: filename })
      const template = compileTemplate({
        id: filename,
        filename,
        source: descriptor.template!.content,
        compilerOptions: { bindingMetadata: script.bindings },
      })
      expect(template.errors).toEqual([])
    }
  })
})
