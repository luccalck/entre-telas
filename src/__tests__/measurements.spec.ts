import { describe, expect, it } from 'vitest'
import { breakpoint, gridColumns, toPixels } from '@/utils/measurements'

const context = {
  root: 16,
  element: 20,
  parentWidth: 400,
  viewportWidth: 1200,
  largeHeight: 900,
  dynamicHeight: 760,
  zeroWidth: 8,
}

describe('Medidas CSS', () => {
  it.each([
    ['rem', 1.5, 24],
    ['em', 2, 40],
    ['%', 50, 200],
    ['vw', 10, 120],
    ['vh', 100, 900],
    ['dvh', 100, 760],
    ['ch', 65, 520],
    ['px', 24, 24],
  ] as const)('converte %s com referencia explicita', (unit, value, result) => {
    expect(toPixels(value, unit, context)).toBe(result)
  })
  it('adapta rem a raiz e mantem px independente dela', () => {
    expect(toPixels(1.5, 'rem', { ...context, root: 20 })).toBe(30)
    expect(toPixels(24, 'px', { ...context, root: 20 })).toBe(24)
  })
  it.each([0, -16, NaN, Infinity])('recusa referencia de fonte invalida: %s', (root) => {
    expect(toPixels(1.5, 'rem', { ...context, root })).toBeNaN()
  })
  it('recusa valor nao numerico e mantem zero como valor valido', () => {
    expect(toPixels(NaN, 'rem', context)).toBeNaN()
    expect(toPixels(0, 'rem', context)).toBe(0)
    expect(toPixels(24, 'px', { ...context, root: NaN })).toBe(24)
  })
  it.each([
    [463, 1],
    [464, 2],
    [703, 2],
    [704, 3],
    [943, 3],
    [944, 4],
    [1200, 4],
    [200, 1],
  ])('conta colunas no limite %d', (width, count) => {
    expect(gridColumns(width)).toBe(count)
  })
  it('respeita uma raiz diferente e o numero de itens', () => {
    expect(gridColumns(579, 20)).toBe(1)
    expect(gridColumns(580, 20)).toBe(2)
    expect(gridColumns(1000, 16, 2)).toBe(2)
  })
  it('nomeia os limites da janela', () => {
    expect(breakpoint(767)).toBe('Compacto')
    expect(breakpoint(768)).toBe('Intermediario')
    expect(breakpoint(1024)).toBe('Amplo')
  })
})
