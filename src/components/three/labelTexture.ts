import { CanvasTexture, SRGBColorSpace } from 'three'
import type { Flavor } from '../../data/flavors'

const cache = new Map<string, CanvasTexture>()

/** Draws one 512×512 label panel (half the can's circumference). */
function drawPanel(ctx: CanvasRenderingContext2D, f: Flavor, ox: number) {
  const W = 512
  const H = 512
  ctx.save()
  ctx.translate(ox, 0)

  // body gradient
  const g = ctx.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0, f.canDark)
  g.addColorStop(0.35, f.can)
  g.addColorStop(0.75, f.can)
  g.addColorStop(1, f.canDark)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)

  // soft highlight bands (seamless across panel edges)
  const band = ctx.createLinearGradient(0, 0, 0, H)
  band.addColorStop(0, 'rgba(255,255,255,0.00)')
  band.addColorStop(0.5, 'rgba(255,255,255,0.10)')
  band.addColorStop(1, 'rgba(255,255,255,0.00)')
  ctx.fillStyle = band
  ctx.fillRect(0, 0, W, H)

  // accent rules
  ctx.fillStyle = f.accent2
  ctx.fillRect(0, 62, W, 4)
  ctx.fillRect(0, H - 66, W, 4)

  // giant translucent bolt
  ctx.save()
  ctx.globalAlpha = 0.16
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.moveTo(300, 70)
  ctx.lineTo(150, 290)
  ctx.lineTo(250, 290)
  ctx.lineTo(205, 450)
  ctx.lineTo(375, 215)
  ctx.lineTo(275, 215)
  ctx.closePath()
  ctx.fill()
  ctx.restore()

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#ffffff'
  ctx.shadowColor = 'rgba(0,0,0,0.35)'
  ctx.shadowBlur = 12

  // brand
  ctx.font = '800 36px "Arial Black", Arial, sans-serif'
  ctx.letterSpacing = '14px'
  ctx.fillText('EMBER', W / 2 + 7, 112)

  // flavor name, up to two lines, auto-fit
  ctx.letterSpacing = '0px'
  const words = f.name.toUpperCase().split(' ')
  const lines = words.length > 1 ? [words[0], words.slice(1).join(' ')] : [words[0]]
  let size = 92
  for (const l of lines) {
    ctx.font = `900 italic ${size}px "Arial Black", Impact, sans-serif`
    while (ctx.measureText(l).width > 380 && size > 36) {
      size -= 2
      ctx.font = `900 italic ${size}px "Arial Black", Impact, sans-serif`
    }
  }
  ctx.font = `900 italic ${size}px "Arial Black", Impact, sans-serif`
  const lh = size * 1.02
  const startY = 262 - ((lines.length - 1) * lh) / 2
  lines.forEach((l, i) => ctx.fillText(l, W / 2, startY + i * lh))

  // descriptor
  ctx.shadowBlur = 0
  ctx.font = '700 24px Arial, sans-serif'
  ctx.letterSpacing = '7px'
  ctx.fillStyle = f.accent2
  ctx.fillText('ZERO SUGAR ENERGY', W / 2 + 3, 398)

  ctx.fillStyle = 'rgba(255,255,255,0.8)'
  ctx.font = '600 20px Arial, sans-serif'
  ctx.letterSpacing = '4px'
  ctx.fillText('250 ML · 8.4 FL OZ', W / 2 + 2, 458)

  ctx.restore()
}

export function getLabelTexture(f: Flavor): CanvasTexture {
  const hit = cache.get(f.id)
  if (hit) return hit
  const c = document.createElement('canvas')
  c.width = 1024
  c.height = 512
  const ctx = c.getContext('2d')!
  drawPanel(ctx, f, 0)
  drawPanel(ctx, f, 512)
  const tex = new CanvasTexture(c)
  tex.colorSpace = SRGBColorSpace
  tex.anisotropy = 8
  tex.needsUpdate = true
  cache.set(f.id, tex)
  return tex
}

let glow: CanvasTexture | null = null

/** Soft radial gradient used for the additive halo behind each can. */
export function getGlowTexture(): CanvasTexture {
  if (glow) return glow
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.25, 'rgba(255,255,255,0.45)')
  g.addColorStop(0.6, 'rgba(255,255,255,0.1)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 256, 256)
  glow = new CanvasTexture(c)
  glow.colorSpace = SRGBColorSpace
  return glow
}
