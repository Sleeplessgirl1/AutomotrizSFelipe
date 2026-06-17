import { createClient } from '@sanity/client'

// ⚠️ Usa el mismo token que usaste para subir los autos (necesita permisos de lectura, basta con 'Viewer' o el mismo de antes)
const client = createClient({
  projectId: 'nnuyo5k9',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skZ2zltDw77i7AssA0TnUfioTJxbsXw6t4HDZeiarOVuV7ZewBH9RHBxCfa9WSp967srx49UgkiIqNMNy0XdLni8zXO3YvWz95MK9nck57h30yNDdKhIjiDDiQC1evXqLMHaay4cx57ellur8Osyd9RYxrsZfxdUhw3RDwSyPa2ou5dFccjo',
})

// Lista completa de autos que DEBERÍAN existir (extraída del script original upload-cars.mjs)
const expectedCars = [
  { id: '124', name: 'JEEP GRAND CHEROKEE 4XE', year: 2023 },
  { id: '120', name: 'FORD LOBO PLATINUM PLUS HEV', year: 2024 },
  { id: '118', name: 'HONDA PILOT TOURING', year: 2018 },
  { id: '117', name: 'BMW X5 XDrive40i', year: 2020 },
  { id: '115', name: 'GMC SIERRA DENALI', year: 2025 },
  { id: '114', name: 'INFINITI QX60 SENSORY', year: 2023 },
  { id: '113', name: 'GMC YUKON DENALI', year: 2017 },
  { id: '110', name: 'MERCEDES BENZ GLC300 COUPE', year: 2023 },
  { id: '109', name: 'AUDI RS5', year: 2019 },
  { id: '108', name: 'AUDI A5 S LINE', year: 2021 },
  { id: '107', name: 'BMW X6 M50i', year: 2021 },
  { id: '106', name: 'MERCEDES BENZ G63 AMG', year: 2021 },
  { id: '103', name: 'KIA SPORTAGE EX', year: 2021 },
  { id: '101', name: 'CHEVROLET SILVERADO 1500', year: 2020 },
  { id: '100', name: 'FORD MUSTANG GT 5.0 EDICIÓN FREDDY VAN BEUREN', year: 2015 },
  { id: '97', name: 'CHEVROLET COLORADO ZR2', year: 2024 },
  { id: '96', name: 'GMC SIERRA DENALI', year: 2024 },
  { id: '95', name: 'BMW X5 XDrive45e', year: 2022 },
  { id: '94', name: 'JEEP GLADIATOR RUBICON', year: 2021 },
  { id: '92', name: 'CHEVROLET SILVERADO CUSTOM', year: 2025 },
  { id: '90', name: 'FORD BRONCO BADLANDS', year: 2021 },
  { id: '88', name: 'BMW X4 XDRIVE28IA', year: 2017 },
  { id: '85', name: 'FORD LOBO TREMOR HIGH', year: 2023 },
  { id: '81', name: 'AUDI A1 EGO', year: 2021 },
  { id: '80', name: 'BMW 430i M SPORT COUPE', year: 2023 },
  { id: '77', name: 'BMW X5 XDrive40i', year: 2025 },
  { id: '69', name: 'PORSCHE CAYENNE', year: 2019 },
  { id: '67', name: 'CHEVROLET SUBURBAN PREMIER', year: 2019 },
  { id: '66', name: 'PORSCHE CAYENNE', year: 2016 },
  { id: '63', name: 'BMW X6 M50i', year: 2021 },
  { id: '60', name: 'MERCEDES BENZ GLC300', year: 2019 },
  { id: '46', name: 'NISSAN KICKS PLATINUM E-POWER', year: 2023 },
  { id: '44', name: 'Volkswagen Teramont Trendline', year: 2025 },
  { id: '43', name: 'Chevrolet Cheyenne LT', year: 2023 },
  { id: '42', name: 'Volkswagen Amarok TDI', year: 2017 },
  { id: '41', name: 'Cupra Formentor VZ', year: 2023 },
  { id: '40', name: 'Mercedes Benz E250', year: 2019 },
  { id: '38', name: 'Land Rover Sport SVR', year: 2017 },
  { id: '37', name: 'RAM 1500 BIGHORN', year: 2023 },
  { id: '35', name: 'Chevrolet Suburban High Country', year: 2021 },
  { id: '34', name: 'Nissan X-Trail Advance', year: 2020 },
  { id: '31', name: 'Ford Lobo Raptor', year: 2018 },
  { id: '30', name: 'Ford Lobo Limited', year: 2023 },
  { id: '29', name: 'Porsche Macan T', year: 2025 },
  { id: '27', name: 'GMC Yukon Denali', year: 2022 },
  { id: '18', name: 'FORD EDGE ST', year: 2023 },
  { id: '16', name: 'TOYOTA TACOMA TRD SPORT', year: 2019 },
  { id: '11', name: 'FORD EXPEDITION PLATINUM', year: 2019 },
  { id: '9', name: 'NISSAN X-TRAIL HIBRIDA', year: 2019 },
  { id: '8', name: 'Polaris Slingshot', year: 2015 },
  { id: '7', name: 'KIA SORENTO EX GDI', year: 2019 },
  { id: '6', name: 'VOLKSWAGEN GOLF HIGHLINE', year: 2017 },
]

// Normaliza nombres para comparar sin importar mayúsculas/acentos/espacios extra
function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/\s+/g, ' ')
    .trim()
}

async function main() {
  console.log('🔍 Consultando documentos "auto" en Sanity...\n')

  const existingDocs = await client.fetch(
    `*[_type == "auto"]{ _id, name, year, "imageCount": count(images) } | order(name asc)`
  )

  console.log(`📦 Documentos encontrados en Sanity: ${existingDocs.length}`)
  console.log(`📋 Documentos esperados (según script original): ${expectedCars.length}\n`)

  // Set de claves existentes (nombre normalizado + año) para comparar
  const existingKeys = new Set(
    existingDocs.map((d) => `${normalize(d.name)}|${d.year}`)
  )

  const faltantes = []
  const presentesConPocasImagenes = []

  for (const car of expectedCars) {
    const key = `${normalize(car.name)}|${car.year}`
    const match = existingDocs.find((d) => `${normalize(d.name)}|${d.year}` === key)
    if (!match) {
      faltantes.push(car)
    } else if (match.imageCount < 5) {
      // Si tiene muy pocas imágenes, probablemente se subió incompleto
      presentesConPocasImagenes.push({ ...car, imageCount: match.imageCount })
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  if (faltantes.length === 0) {
    console.log('✅ ¡Todos los autos esperados existen en Sanity!')
  } else {
    console.log(`❌ Autos QUE NO EXISTEN en Sanity (${faltantes.length}):\n`)
    faltantes.forEach((c) => console.log(`   - [id ${c.id}] ${c.name} (${c.year})`))
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  if (presentesConPocasImagenes.length > 0) {
    console.log(`⚠️  Autos que existen pero con pocas imágenes (<5), revisar (${presentesConPocasImagenes.length}):\n`)
    presentesConPocasImagenes.forEach((c) =>
      console.log(`   - [id ${c.id}] ${c.name} (${c.year}) → solo ${c.imageCount} imágenes`)
    )
  } else {
    console.log('✅ Ningún auto presente tiene menos de 5 imágenes.')
  }

  // También muestra si hay duplicados en Sanity (mismo nombre+año repetido)
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  const counts = {}
  for (const d of existingDocs) {
    const key = `${normalize(d.name)}|${d.year}`
    counts[key] = (counts[key] || 0) + 1
  }
  const duplicados = Object.entries(counts).filter(([, count]) => count > 1)
  if (duplicados.length > 0) {
    console.log(`⚠️  Posibles duplicados en Sanity (${duplicados.length}):`)
    duplicados.forEach(([key, count]) => console.log(`   - ${key} → aparece ${count} veces`))
  } else {
    console.log('✅ No se detectaron duplicados.')
  }

  console.log('\n📊 Resumen:')
  console.log(`   Esperados: ${expectedCars.length}`)
  console.log(`   En Sanity: ${existingDocs.length}`)
  console.log(`   Faltantes: ${faltantes.length}`)
  console.log(`   Con pocas imágenes: ${presentesConPocasImagenes.length}`)
}

main().catch((e) => {
  console.error('❌ Error general:', e.message)
})
