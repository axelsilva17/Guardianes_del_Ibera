import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const appDir = resolve(here, '..')
const distDir = resolve(appDir, 'dist-demo')
const outDir = resolve(appDir, '..', 'docs')
const outFile = resolve(outDir, 'guardianes-demo.html')

const distFile = (ref) => resolve(distDir, ref.replace(/^\.?\//, ''))

let html = readFileSync(resolve(distDir, 'index.html'), 'utf8')

// El CSS se incrusta donde estaba el <link>, dentro del <head>.
html = html.replace(
  /<link[^>]*href="([^"]+\.css)"[^>]*>/g,
  (_match, href) => `<style>\n${readFileSync(distFile(href), 'utf8')}\n</style>`,
)

// El bundle se recoge y se reinserta antes de </body>: al pasar a script
// clásico pierde el comportamiento diferido de los módulos, así que debe
// ejecutarse después de que #root ya exista en el DOM.
let bundle = ''
html = html.replace(
  /<script[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g,
  (_match, src) => {
    bundle += readFileSync(distFile(src), 'utf8')
    return ''
  },
)

if (!bundle) {
  throw new Error('No se encontró el bundle a incrustar en dist-demo/index.html')
}

html = html.replace('</body>', `<script>\n${bundle}\n  </script>\n  </body>`)

mkdirSync(outDir, { recursive: true })
writeFileSync(outFile, html, 'utf8')

const kb = (html.length / 1024).toFixed(1)
console.log(`demo listo -> ${outFile} (${kb} kB)`)
