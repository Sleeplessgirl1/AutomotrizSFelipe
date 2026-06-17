import { createClient } from '@sanity/client'

// ⚠️ Pon aquí el mismo token que ya usaste antes (necesita permiso de escritura para poder borrar)
const client = createClient({
  projectId: 'nnuyo5k9',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skZ2zltDw77i7AssA0TnUfioTJxbsXw6t4HDZeiarOVuV7ZewBH9RHBxCfa9WSp967srx49UgkiIqNMNy0XdLni8zXO3YvWz95MK9nck57h30yNDdKhIjiDDiQC1evXqLMHaay4cx57ellur8Osyd9RYxrsZfxdUhw3RDwSyPa2ou5dFccjo',
})

// 🔒 MODO SEGURO POR DEFECTO: no borra nada, solo muestra qué borraría.
// Cuando ya revisaste la lista y estás seguro, cambia esto a true y vuelve a correr.
const EJECUTAR_BORRADO = true

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function main() {
  console.log('🔍 Consultando todos los documentos "auto" en Sanity...\n')

  const docs = await client.fetch(
    `*[_type == "auto"]{ _id, _createdAt, name, year, "imageCount": count(images) } | order(_createdAt asc)`
  )

  console.log(`📦 Total de documentos encontrados: ${docs.length}\n`)

  // Agrupar por nombre normalizado + año
  const groups = {}
  for (const doc of docs) {
    const key = `${normalize(doc.name)}|${doc.year}`
    if (!groups[key]) groups[key] = []
    groups[key].push(doc)
  }

  const toDelete = []
  const toKeep = []

  for (const [key, group] of Object.entries(groups)) {
    if (group.length <= 1) {
      toKeep.push(group[0])
      continue
    }
    // Hay duplicados: nos quedamos con el que tenga MÁS imágenes;
    // si hay empate, nos quedamos con el más reciente (_createdAt más nuevo)
    const sorted = [...group].sort((a, b) => {
      if (b.imageCount !== a.imageCount) return b.imageCount - a.imageCount
      return new Date(b._createdAt) - new Date(a._createdAt)
    })
    const keep = sorted[0]
    const remove = sorted.slice(1)
    toKeep.push(keep)
    toDelete.push(...remove)

    console.log(`🔁 Duplicado: ${keep.name} (${keep.year}) → ${group.length} copias`)
    console.log(`   ✅ Se conserva: ${keep._id} (${keep.imageCount} imágenes, creado ${keep._createdAt})`)
    remove.forEach((d) =>
      console.log(`   🗑️  Se borraría: ${d._id} (${d.imageCount} imágenes, creado ${d._createdAt})`)
    )
    console.log('')
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`📊 Resumen:`)
  console.log(`   Documentos totales: ${docs.length}`)
  console.log(`   Autos únicos: ${Object.keys(groups).length}`)
  console.log(`   A conservar: ${toKeep.length}`)
  console.log(`   A borrar: ${toDelete.length}`)

  if (!EJECUTAR_BORRADO) {
    console.log('\n🔒 MODO SIMULACIÓN: no se borró nada todavía.')
    console.log('   Si la lista de arriba se ve correcta, cambia EJECUTAR_BORRADO a true en este archivo y vuelve a correrlo.')
    return
  }

  console.log('\n🗑️  Borrando duplicados...\n')
  let borrados = 0
  let errores = 0

  for (const doc of toDelete) {
    try {
      await client.delete(doc._id)
      console.log(`  ✅ Borrado: ${doc.name} (${doc.year}) [${doc._id}]`)
      borrados++
    } catch (e) {
      console.error(`  ❌ Error borrando ${doc._id}:`, e.message)
      errores++
    }
  }

  console.log('\n📊 Resultado final:')
  console.log(`   Borrados: ${borrados}`)
  console.log(`   Errores: ${errores}`)
  console.log(`   Documentos restantes esperados: ${docs.length - borrados}`)
}

main().catch((e) => {
  console.error('❌ Error general:', e.message)
})
