// fix-broken-images.mjs
// Repara los autos cuyo campo "images" contiene referencias falsas
// (formato { _sanityAsset: "image@/cars/archivo.webp" }) en vez de
// referencias reales de Sanity. Sube cada imagen con client.assets.upload()
// y reemplaza el array "images" del documento con referencias válidas.
//
// NO toca ningún otro campo del documento (precio, descripción, etc.).
//
// Cómo correrlo:
//   1) Guarda este archivo en la carpeta del proyecto (junto a public/cars).
//   2) Pon tu token real en TOKEN (necesita permisos de Editor/Write).
//   3) node fix-broken-images.mjs

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const TOKEN = 'skZ2zltDw77i7AssA0TnUfioTJxbsXw6t4HDZeiarOVuV7ZewBH9RHBxCfa9WSp967srx49UgkiIqNMNy0XdLni8zXO3YvWz95MK9nck57h30yNDdKhIjiDDiQC1evXqLMHaay4cx57ellur8Osyd9RYxrsZfxdUhw3RDwSyPa2ou5dFccjo' ;
const CARS_DIR = './public/cars';

const client = createClient({
  projectId: 'nnuyo5k9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
});

// Autos a reparar: _id real (tomado del diagnóstico) + nombre exacto de archivo de cada imagen,
// en el orden en que deben quedar.
const autosAReparar = [
  {
    id: 'auto-6',
    nombre: 'VOLKSWAGEN GOLF HIGHLINE (2017)',
    // Caso especial: no existe el archivo "...20173.webp", en su lugar hay un "...201710.webp"
    archivos: [1,2,4,5,6,7,8,9,10].map(n => `VOLKSWAGEN GOLF HIGHLINE 2017${n}.webp`),
  },
  {
    id: 'auto-7',
    nombre: 'KIA SORENTO EX GDI (2019)',
    archivos: [1,2,3,4,5,6,7,8,9].map(n => `KIA SORENTO EX GDI 2019${n}.webp`),
  },
  {
    id: 'auto-8',
    nombre: 'Polaris Slingshot (2015)',
    archivos: [1,2,3,4,5,6,7,8,9].map(n => `POLARIS SLINGHOT 2015${n}.webp`),
  },
  {
    id: 'auto-38',
    nombre: 'Land Rover Sport SVR (2017)',
    archivos: [1,2,3,4,5,6,7,8,9].map(n => `Land Rover Sport SVR 2017${n}.webp`),
  },
  {
    id: 'auto-42',
    nombre: 'Volkswagen Amarok TDI (2017)',
    archivos: [1,2,3,4,5,6,7,8,9].map(n => `Volkswagen Amarok TDI 2017${n}.webp`),
  },
  {
    id: 'auto-44',
    nombre: 'Volkswagen Teramont Trendline (2025)',
    archivos: [1,2,3,4,5,6,7,8,9].map(n => `Volkswagen Teramont Trendline 2025${n}.webp`),
  },
  {
    id: 'auto-60',
    nombre: 'MERCEDES BENZ GLC300 (2019)',
    // Caso especial: la primera imagen no lleva número
    archivos: [
      'MERCEDES BENZ GLC300 2019.webp',
      ...[1,2,3,4,5,6,7,8].map(n => `MERCEDES BENZ GLC300 2019${n}.webp`),
    ],
  },
  {
    id: 'auto-66',
    nombre: 'PORSCHE CAYENNE (2016)',
    archivos: [1,2,3,4,5,6,7,8,9].map(n => `PORSCHE CAYENNE 2016${n}.webp`),
  },
  {
    id: 'auto-77',
    nombre: 'BMW X5 XDrive40i (2025)',
    // Nota: en la carpeta también existe una serie BMW X5 XDrive40i 2020 (otro auto distinto);
    // este auto es el de 2025, así que usamos esa serie.
    archivos: [1,2,3,4,5,6,7,8,9].map(n => `BMW X5 XDrive40i 2025${n}.webp`),
  },
  {
    id: 'auto-85',
    nombre: 'FORD LOBO TREMOR HIGH (2023)',
    archivos: [1,2,3,4,5,6,7,8,9].map(n => `FORD LOBO TREMOR HIGH 2023${n}.webp`),
  },
  {
    id: 'auto-95',
    nombre: 'BMW X5 XDrive45e (2022)',
    archivos: [1,2,3,4,5,6,7,8,9].map(n => `BMW X5 XDrive45e 2022${n}.webp`),
  },
  {
    id: 'auto-115',
    nombre: 'GMC SIERRA DENALI (2025)',
    // Nota: en la carpeta hay 3 variantes ("GMC SIERRA DENALI 2025X.webp" con espacio,
    // "GMC SIERRA DENALI2025X.webp" sin espacio, y una serie 2024). Usamos la que coincide
    // con el patrón real de Sanity: con espacio y año 2025.
    archivos: [1,2,3,4,5,6,7,8,9].map(n => `GMC SIERRA DENALI 2025${n}.webp`),
  },
  {
    id: 'auto-124',
    nombre: 'JEEP GRAND CHEROKEE 4XE (2023)',
    archivos: [1,2,3,4,5,6,7,8,9].map(n => `JEEP GRAND CHEROKEE 4XE 2023${n}.webp`),
  },
];

async function subirImagenConReintentos(filePath, intentos = 3) {
  for (let i = 1; i <= intentos; i++) {
    try {
      const buffer = fs.readFileSync(filePath);
      const asset = await client.assets.upload('image', buffer, {
        filename: path.basename(filePath),
      });
      return asset;
    } catch (err) {
      if (i === intentos) throw err;
      console.log(`      ⏳ Reintentando subida (${i}/${intentos})...`);
      await new Promise(r => setTimeout(r, 1500 * i));
    }
  }
}

async function main() {
  console.log('🔧 Reparando imágenes de autos con referencias inválidas...\n');

  const resumen = { reparados: [], conProblemas: [] };

  for (const auto of autosAReparar) {
    console.log(`📦 Procesando: ${auto.nombre}`);

    const nuevasImagenes = [];
    const archivosNoEncontrados = [];

    for (const archivo of auto.archivos) {
      const filePath = path.join(CARS_DIR, archivo);

      if (!fs.existsSync(filePath)) {
        console.log(`   ⚠️  No encontrada: ${archivo}`);
        archivosNoEncontrados.push(archivo);
        continue;
      }

      try {
        const asset = await subirImagenConReintentos(filePath);
        nuevasImagenes.push({
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
        });
        console.log(`   ✅ Subida: ${archivo}`);
      } catch (err) {
        console.log(`   ❌ Error subiendo ${archivo}: ${err.message}`);
        archivosNoEncontrados.push(archivo);
      }
    }

    if (nuevasImagenes.length === 0) {
      console.log(`   ❌ No se pudo subir ninguna imagen para ${auto.nombre}. Se omite la actualización del documento.\n`);
      resumen.conProblemas.push({ nombre: auto.nombre, motivo: 'sin imágenes subidas', archivosNoEncontrados });
      continue;
    }

    // Reemplaza el array "images" completo del documento por las referencias reales
    try {
      await client.patch(auto.id).set({ images: nuevasImagenes }).commit();
      console.log(`   💾 Documento actualizado con ${nuevasImagenes.length} imagen(es) válida(s).\n`);
      resumen.reparados.push({ nombre: auto.nombre, imagenes: nuevasImagenes.length, faltantes: archivosNoEncontrados });
    } catch (err) {
      console.log(`   ❌ Error actualizando el documento: ${err.message}\n`);
      resumen.conProblemas.push({ nombre: auto.nombre, motivo: 'error al actualizar documento', error: err.message });
    }
  }

  console.log('━'.repeat(60));
  console.log('\n📊 Resumen final:\n');

  console.log(`✅ Reparados correctamente: ${resumen.reparados.length}`);
  resumen.reparados.forEach(r => {
    const nota = r.faltantes.length > 0 ? ` (faltaron ${r.faltantes.length} archivo(s): ${r.faltantes.join(', ')})` : '';
    console.log(`   - ${r.nombre}: ${r.imagenes} imágenes${nota}`);
  });

  if (resumen.conProblemas.length > 0) {
    console.log(`\n❌ Con problemas: ${resumen.conProblemas.length}`);
    resumen.conProblemas.forEach(r => {
      console.log(`   - ${r.nombre}: ${r.motivo}`);
    });
  }

  console.log('\nListo. Vuelve a correr check-cover-images.mjs para confirmar que ya todas las portadas tienen un asset._ref válido.');
}

main().catch(err => {
  console.error('❌ Error general:', err.message);
});
