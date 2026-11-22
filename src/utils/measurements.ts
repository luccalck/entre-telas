export type Unit = 'px' | 'rem' | 'em' | '%' | 'vw' | 'vh' | 'dvh' | 'ch'

export interface UnitContext {
  root: number
  element: number
  parentWidth: number
  viewportWidth: number
  largeHeight: number
  dynamicHeight: number
  zeroWidth: number
}

export function toPixels(value: number, unit: Unit, context: UnitContext): number {
  const factors: Record<Unit, number> = {
    px: 1,
    rem: context.root,
    em: context.element,
    '%': context.parentWidth / 100,
    vw: context.viewportWidth / 100,
    vh: context.largeHeight / 100,
    dvh: context.dynamicHeight / 100,
    ch: context.zeroWidth,
  }
  return value * factors[unit]
}

export function gridColumns(width: number, root = 16, items = 4): number {
  return Math.max(1, Math.min(items, Math.floor((width + root) / (15 * root))))
}

export function breakpoint(width: number): string {
  if (width >= 1024) return 'Amplo'
  if (width >= 768) return 'Intermediario'
  return 'Compacto'
}
