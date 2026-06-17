import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: 'nnuyo5k9',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skZ2zltDw77i7AssA0TnUfioTJxbsXw6t4HDZeiarOVuV7ZewBH9RHBxCfa9WSp967srx49UgkiIqNMNy0XdLni8zXO3YvWz95MK9nck57h30yNDdKhIjiDDiQC1evXqLMHaay4cx57ellur8Osyd9RYxrsZfxdUhw3RDwSyPa2ou5dFccjo', // <-- ver instrucciones abajo
})

const cars = [
  { id: '40', name: 'Mercedes Benz E250', year: 2019, category: 'Sedan', price: 649000, images: ['Mercedes Benz E250 20191.webp','Mercedes Benz E250 20192.webp','Mercedes Benz E250 20193.webp','Mercedes Benz E250 20194.webp','Mercedes Benz E250 20195.webp','Mercedes Benz E250 20196.webp','Mercedes Benz E250 20197.webp','Mercedes Benz E250 20198.webp','Mercedes Benz E250 20199.webp'], details: { condition: 'Factura de agencia (único dueño)', keys: '2 llaves', kilometers: '135,493 Kms', engine: '4 cilindros 2.0 Turbo', features: ['Impecables condiciones','Financiamiento Disponible','Precio Negociable'] } },
  { id: '38', name: 'Land Rover Sport SVR', year: 2017, category: 'SUV', price: 990000, images: ['Land Rover Sport SVR 20171.webp','Land Rover Sport SVR 20172.webp','Land Rover Sport SVR 20173.webp','Land Rover Sport SVR 20174.webp','Land Rover Sport SVR 20175.webp','Land Rover Sport SVR 20176.webp','Land Rover Sport SVR 20177.webp','Land Rover Sport SVR 20178.webp','Land Rover Sport SVR 20179.webp'], details: { condition: 'Factura de agencia (único dueño)', keys: '2 llaves', kilometers: '73,978 Kms', engine: 'V8 5.0 supercharged', features: ['Financiamiento Disponible','Precio Negociable','AWD'] } },
  { id: '37', name: 'RAM 1500 BIGHORN', year: 2023, category: 'Pick Up', price: 740000, images: ['RAM 1500 Bighorn 20231.webp','RAM 1500 Bighorn 20232.webp','RAM 1500 Bighorn 20233.webp','RAM 1500 Bighorn 20234.webp','RAM 1500 Bighorn 20235.webp','RAM 1500 Bighorn 20236.webp','RAM 1500 Bighorn 20237.webp','RAM 1500 Bighorn 20238.webp','RAM 1500 Bighorn 20239.webp'], details: { condition: 'Factura de agencia (único dueño)', keys: '2 llaves', kilometers: '45,093 Kms', engine: 'Motor V6 pentastar', features: ['Financiamiento Disponible','Precio Negociable','Tracción: 4x4'] } },
  { id: '35', name: 'Chevrolet Suburban High Country', year: 2021, category: 'SUV', price: 1130000, images: ['Chevrolet Suburban High Country 20211.webp','Chevrolet Suburban High Country 20212.webp','Chevrolet Suburban High Country 20213.webp','Chevrolet Suburban High Country 20214.webp','Chevrolet Suburban High Country 20215.webp','Chevrolet Suburban High Country 20216.webp','Chevrolet Suburban High Country 20217.webp','Chevrolet Suburban High Country 20218.webp','Chevrolet Suburban High Country 20219.webp'], details: { condition: 'Factura de agencia (único dueño)', keys: '2 llaves', kilometers: '93,890 Kms', engine: 'V8 6.2 L EcoTec', features: ['Sistema de sonido marca Bose','Estribos laterales retráctiles','Financiamiento Disponible','Precio Negociable','Transmisión automática de 10 velocidades','Horsepower: 420 HP','Tracción: 4X4'] } },
  { id: '34', name: 'Nissan X-Trail Advance', year: 2020, category: 'SUV', price: 320000, images: ['Nissan X-Trail Advance 20201.webp','Nissan X-Trail Advance 20202.webp','Nissan X-Trail Advance 20203.webp','Nissan X-Trail Advance 20204.webp','Nissan X-Trail Advance 20205.webp','Nissan X-Trail Advance 20206.webp','Nissan X-Trail Advance 20207.webp','Nissan X-Trail Advance 20208.webp','Nissan X-Trail Advance 20209.webp'], details: { condition: 'Factura de empresa con su consecutivo de agencia', keys: '2 llaves', kilometers: '79,801 Kms', engine: '4 cilindros', features: ['Financiamiento Disponible','Precio Negociable'] } },
  { id: '31', name: 'Ford Lobo Raptor', year: 2018, category: 'Pick Up', price: 800000, images: ['Ford Lobo Raptor 20181.webp','Ford Lobo Raptor 20182.webp','Ford Lobo Raptor 20183.webp','Ford Lobo Raptor 20184.webp','Ford Lobo Raptor 20185.webp','Ford Lobo Raptor 20186.webp','Ford Lobo Raptor 20187.webp','Ford Lobo Raptor 20188.webp','Ford Lobo Raptor 20189.webp'], details: { condition: 'Factura de seminuevos con su consecutivo de agencia', keys: '2 llaves', kilometers: '100,575 Kms', engine: 'V6 de 3.5 L Turbo', features: ['Impecables condiciones','Financiamiento Disponible','Precio Negociable','450 HP','4X4'] } },
  { id: '30', name: 'Ford Lobo Limited', year: 2023, category: 'Pick Up', price: 1215000, images: ['Ford Lobo Limited 20231.webp','Ford Lobo Limited 20232.webp','Ford Lobo Limited 20233.webp','Ford Lobo Limited 20234.webp','Ford Lobo Limited 20235.webp','Ford Lobo Limited 20236.webp','Ford Lobo Limited 20237.webp','Ford Lobo Limited 20238.webp','Ford Lobo Limited 20239.webp'], details: { condition: 'Factura de empresa con su consecutivo de agencia', keys: '2 llaves', kilometers: 'No especificado', engine: 'V6 de 3.5 PowerBoost HEV', features: ['Financiamiento Disponible','Precio Negociable','4x4'] } },
  { id: '29', name: 'Porsche Macan T', year: 2025, category: 'SUV', price: 1650000, images: ['Porsche Macan T 20251.webp','Porsche Macan T 20252.webp','Porsche Macan T 20253.webp','Porsche Macan T 20254.webp','Porsche Macan T 20255.webp','Porsche Macan T 20256.webp','Porsche Macan T 20257.webp','Porsche Macan T 20258.webp','Porsche Macan T 20259.webp'], details: { condition: 'Factura de agencia (único dueño)', keys: '2 llaves', kilometers: '15,462 Kms', engine: '4 cilindros 2.0 Turbo', features: ['Rines 21" RS Spyder Design','Color: Crayón','Financiamiento Bancario Disponible','Precio Negociable','265 HP'] } },
  { id: '27', name: 'GMC Yukon Denali', year: 2022, category: 'SUV', price: 1300000, images: ['GMC Yukon Denali 20221.webp','GMC Yukon Denali 20222.webp','GMC Yukon Denali 20223.webp','GMC Yukon Denali 20224.webp','GMC Yukon Denali 20225.webp','GMC Yukon Denali 20226.webp','GMC Yukon Denali 20227.webp','GMC Yukon Denali 20228.webp','GMC Yukon Denali 20229.webp'], details: { condition: 'Factura de seminuevos con su consecutivo de agencia', keys: '2 llaves', kilometers: '76,824 Kms', engine: 'V8 de 6.2 Litros', features: ['2 pantallas traseras touchscreen de 12.6"','Impecables condiciones','Financiamiento Bancario Disponible','Precio Negociable'] } },
  { id: '18', name: 'FORD EDGE ST', year: 2023, category: 'SUV', price: 850000, images: ['FORD EDGE ST 2023.webp','FORD EDGE ST 20232.webp','FORD EDGE ST 20233.webp','FORD EDGE ST 20234.webp','FORD EDGE ST 20235.webp','FORD EDGE ST 20236.webp','FORD EDGE ST 20237.webp','FORD EDGE ST 20238.webp','FORD EDGE ST 20239.webp'], details: { condition: 'Factura de agencia (único dueño)', keys: '2 llaves', kilometers: '16,045 Kms', engine: 'V6 EcoBoost', features: ['Impecables condiciones','Financiamiento Bancario Disponible','Precio Negociable'] } },
  { id: '16', name: 'TOYOTA TACOMA TRD SPORT', year: 2019, category: 'Pick Up', price: 550000, images: ['Toyota Tacoma trd 20191.webp','Toyota Tacoma trd 20192.webp','Toyota Tacoma trd 20193.webp','Toyota Tacoma trd 20194.webp','Toyota Tacoma trd 20195.webp','Toyota Tacoma trd 20196.webp','Toyota Tacoma trd 20197.webp','Toyota Tacoma trd 20198.webp','Toyota Tacoma trd 20199.webp'], details: { condition: 'Factura de seminuevos con su consecutivo de agencia', keys: '2 llaves', kilometers: '111,986 Kms', engine: 'V6', features: ['Muy buenas condiciones generales','Financiamiento Bancario Disponible','Precio Negociable','4X4'] } },
  { id: '11', name: 'FORD EXPEDITION PLATINUM', year: 2019, category: 'SUV', price: 790000, images: ['FORD EXPEDITION PLATINUM 20191.webp','FORD EXPEDITION PLATINUM 20192.webp','FORD EXPEDITION PLATINUM 20193.webp','FORD EXPEDITION PLATINUM 20194.webp','FORD EXPEDITION PLATINUM 20195.webp','FORD EXPEDITION PLATINUM 20196.webp','FORD EXPEDITION PLATINUM 20197.webp','FORD EXPEDITION PLATINUM 20198.webp','FORD EXPEDITION PLATINUM 20199.webp'], details: { condition: 'Factura de empresa con su consecutivo de agencia', keys: '2 llaves', kilometers: '103,960 Kms', engine: 'V6 de 3.5 L', features: ['3 filas','Excelentes condiciones generales','Financiamiento disponible','Precio Negociable de contado'] } },
  { id: '9', name: 'NISSAN X-TRAIL HIBRIDA', year: 2019, category: 'SUV', price: 375000, images: ['Nissan XTRAIL HÍBRIDA 20191.webp','Nissan XTRAIL HÍBRIDA 20192.webp','Nissan XTRAIL HÍBRIDA 20193.webp','Nissan XTRAIL HÍBRIDA 20194.webp','Nissan XTRAIL HÍBRIDA 20195.webp','Nissan XTRAIL HÍBRIDA 20196.webp','Nissan XTRAIL HÍBRIDA 20197.webp','Nissan XTRAIL HÍBRIDA 20198.webp','Nissan XTRAIL HÍBRIDA 20199.webp'], details: { condition: 'Factura de agencia (único dueño)', keys: '2 llaves', kilometers: '58,274 Kms', engine: 'Motor 2.5 Litros', features: ['Crédito Disponible','Precio Negociable'] } },
  { id: '8', name: 'Polaris Slingshot', year: 2015, category: 'Deportivo', price: 250000, images: ['POLARIS SLINGHOT 20151.webp','POLARIS SLINGHOT 20152.webp','POLARIS SLINGHOT 20153.webp','POLARIS SLINGHOT 20154.webp','POLARIS SLINGHOT 20155.webp','POLARIS SLINGHOT 20156.webp','POLARIS SLINGHOT 20157.webp','POLARIS SLINGHOT 20158.webp','POLARIS SLINGHOT 20159.webp'], details: { condition: 'Factura de agencia (único dueño)', keys: '2 llaves', kilometers: '6,743 Kms (4,190 millas)', engine: '4 cil 2.4 L', features: ['Pantalla LCD de 4,3 pulgadas'] } },
]

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function uploadImage(imageName, retries = 3) {
  const imagePath = path.join(__dirname, 'public', 'cars', imageName)
  if (!fs.existsSync(imagePath)) {
    console.warn(`  ⚠️  No encontrada: ${imageName}`)
    return null
  }
  const imageBuffer = fs.readFileSync(imagePath)
  const ext = path.extname(imageName).toLowerCase().replace('.', '')
  const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const asset = await client.assets.upload('image', imageBuffer, {
        filename: imageName,
        contentType: mimeType,
      })
      return asset._id
    } catch (e) {
      const esUltimoIntento = attempt === retries
      console.warn(`  ❌ Error subiendo ${imageName} (intento ${attempt}/${retries}):`, e.message)
      if (esUltimoIntento) {
        return null
      }
      // Espera antes de reintentar (más tiempo en cada intento)
      await sleep(attempt * 2000)
    }
  }
  return null
}

async function main() {
  console.log(`\n🚀 Subiendo ${cars.length} autos faltantes a Sanity...\n`)

  const exitosos = []
  const fallidos = []

  for (const car of cars) {
    console.log(`📦 Procesando: ${car.name} (${car.year})`)

    // Subir imágenes
    const imageAssets = []
    for (const imgName of car.images) {
      const assetId = await uploadImage(imgName)
      if (assetId) {
        imageAssets.push({
          _type: 'image',
          _key: Math.random().toString(36).slice(2),
          asset: { _type: 'reference', _ref: assetId },
        })
      }
    }

    // Crear documento en Sanity (con reintento simple)
    let creado = false
    for (let attempt = 1; attempt <= 3 && !creado; attempt++) {
      try {
        await client.create({
          _type: 'auto',
          name: car.name,
          year: car.year,
          category: car.category,
          price: car.price,
          images: imageAssets,
          details: car.details,
        })
        console.log(`  ✅ Subido con ${imageAssets.length} imágenes`)
        exitosos.push(car.name)
        creado = true
      } catch (e) {
        const esUltimoIntento = attempt === 3
        console.error(`  ❌ Error creando documento (intento ${attempt}/3):`, e.message)
        if (esUltimoIntento) {
          fallidos.push(car.name)
        } else {
          await sleep(attempt * 2000)
        }
      }
    }
  }

  console.log('\n📊 Resumen final:')
  console.log(`  ✅ Subidos correctamente: ${exitosos.length}`)
  if (exitosos.length) console.log('     -', exitosos.join('\n     - '))
  console.log(`  ❌ Fallidos: ${fallidos.length}`)
  if (fallidos.length) console.log('     -', fallidos.join('\n     - '))

  if (fallidos.length === 0) {
    console.log('\n✅ ¡Listo! Todos los autos faltantes fueron subidos correctamente.')
  } else {
    console.log('\n⚠️  Algunos autos no pudieron subirse. Revisa tu conexión e intenta de nuevo solo con esos.')
  }
}

main()
