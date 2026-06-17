// check-cover-images.mjs
// Diagnostica por qué a ciertos autos les falta la foto de portada en el catálogo,
// aunque el documento exista en Sanity con varias imágenes.
//
// Revisa:
//  - El orden y validez de cada referencia en el array "images"
//  - Si la primera imagen (la que se usa como portada) tiene un asset válido (_ref existente)
//  - Si hay referencias rotas (asset que ya no existe) en cualquier posición
//
// Cómo correrlo:
//   1) Pon tu token real abajo en TOKEN.
//   2) node check-cover-images.mjs

import { createClient } from '@sanity/client';

const TOKEN = 'skZ2zltDw77i7AssA0TnUfioTJxbsXw6t4HDZeiarOVuV7ZewBH9RHBxCfa9WSp967srx49UgkiIqNMNy0XdLni8zXO3YvWz95MK9nck57h30yNDdKhIjiDDiQC1evXqLMHaay4cx57ellur8Osyd9RYxrsZfxdUhw3RDwSyPa2ou5dFccjo';

const client = createClient({
  projectId: 'nnuyo5k9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
});

// Autos a revisar: nombre (tal como aparece en Sanity) + año
const autosARevisar = [
  { nombre: 'VOLKSWAGEN GOLF HIGHLINE', anio: 2017 },
  { nombre: 'KIA SORENTO EX GDI', anio: 2019 },
  { nombre: 'Polaris Slingshot', anio: 2015 },
  { nombre: 'Land Rover Sport SVR', anio: 2017 },
  { nombre: 'Volkswagen Amarok TDI', anio: 2017 },
  { nombre: 'Volkswagen Teramont Trendline', anio: 2025 },
  { nombre: 'MERCEDES BENZ GLC300', anio: 2019 },
  { nombre: 'PORSCHE CAYENNE', anio: 2016 },
  { nombre: 'BMW X5 XDrive40i', anio: 2025 },
  { nombre: 'FORD LOBO TREMOR HIGH', anio: 2023 },
  { nombre: 'BMW X5 XDrive45e', anio: 2022 },
  { nombre: 'GMC SIERRA DENALI', anio: 2025 },
  { nombre: 'JEEP GRAND CHEROKEE 4XE', anio: 2023 },
];

function norm(s) {
  return (s || '')
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

async function main() {
  console.log('🔍 Consultando documentos "auto" en Sanity...\n');

  const docs = await client.fetch(`*[_type == "auto"]{
    _id,
    _createdAt,
    name,
    year,
    images
  }`);

  console.log(`📦 Total de documentos en Sanity: ${docs.length}\n`);
  console.log('━'.repeat(60));

  for (const target of autosARevisar) {
    const matches = docs.filter(
      (d) => norm(d.name) === norm(target.nombre) && String(d.year) === String(target.anio)
    );

    console.log(`\n🚗 ${target.nombre} (${target.anio})`);

    if (matches.length === 0) {
      console.log('   ❌ No se encontró ningún documento con ese nombre/año exactos.');
      continue;
    }

    if (matches.length > 1) {
      console.log(`   ⚠️  Hay ${matches.length} documentos con este nombre/año (posible duplicado restante).`);
    }

    for (const doc of matches) {
      console.log(`   📄 _id: ${doc._id} (creado ${doc._createdAt})`);
      const images = Array.isArray(doc.images) ? doc.images : [];
      console.log(`      Total de entradas en "images": ${images.length}`);

      if (images.length === 0) {
        console.log('      ❌ El array de imágenes está vacío. Por eso no hay portada.');
        continue;
      }

      images.forEach((img, idx) => {
        const ref = img?.asset?._ref;
        const tag = idx === 0 ? '👉 PORTADA' : `   #${idx + 1}`;
        if (!ref) {
          console.log(`      ${tag}: ❌ SIN asset._ref válido (objeto: ${JSON.stringify(img)})`);
        } else {
          console.log(`      ${tag}: ✅ asset._ref = ${ref}`);
        }
      });

      // Verificar que la portada (primera imagen) realmente exista como asset en Sanity
      const portadaRef = images[0]?.asset?._ref;
      if (portadaRef) {
        try {
          const asset = await client.fetch(`*[_id == $id][0]{_id, url}`, { id: portadaRef });
          if (!asset) {
            console.log(`      ❌ La portada referencia un asset (${portadaRef}) que YA NO EXISTE en Sanity. Esto explica la foto faltante.`);
          } else {
            console.log(`      ✅ Asset de portada confirmado, existe en Sanity. URL: ${asset.url}`);
          }
        } catch (e) {
          console.log(`      ⚠️  No se pudo verificar el asset de portada: ${e.message}`);
        }
      }
    }
  }

  console.log('\n' + '━'.repeat(60));
  console.log('\n📊 Diagnóstico completo. Revisa arriba cuál es el problema de cada auto:');
  console.log('   - Array vacío → no se subió ninguna imagen para ese auto.');
  console.log('   - Asset roto/inexistente en la portada → la imagen se borró o nunca se subió bien, aunque el documento la referencia.');
  console.log('   - Todo válido → el problema podría ser de caché del sitio web, no de los datos.');
}

main().catch((err) => {
  console.error('❌ Error general:', err.message);
});
