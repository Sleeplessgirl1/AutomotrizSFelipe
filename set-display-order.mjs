// set-display-order.mjs
// Asigna un campo numérico "displayOrder" a cada documento "auto" en Sanity,
// según el orden exacto especificado en la lista ORDEN_DESEADO de abajo.
// Busca cada auto por nombre + año (no por _id, ya que esos pueden variar).
//
// NO borra ni modifica ningún otro campo del documento.
//
// Cómo correrlo:
//   1) Pon tu token real en TOKEN.
//   2) node set-display-order.mjs
//
// Después de correr esto exitosamente, hay que modificar fetchCars.ts para que
// ordene por "displayOrder asc" en vez de "_createdAt desc".

import { createClient } from '@sanity/client';

const TOKEN = 'skZ2zltDw77i7AssA0TnUfioTJxbsXw6t4HDZeiarOVuV7ZewBH9RHBxCfa9WSp967srx49UgkiIqNMNy0XdLni8zXO3YvWz95MK9nck57h30yNDdKhIjiDDiQC1evXqLMHaay4cx57ellur8Osyd9RYxrsZfxdUhw3RDwSyPa2ou5dFccjo';

const client = createClient({
  projectId: 'nnuyo5k9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: TOKEN,
  useCdn: false,
});

// Orden deseado: nombre (tal como aparece, se compara de forma flexible) + año.
// Posición 1 = primero en aparecer en el catálogo.
const ORDEN_DESEADO = [
  { nombre: 'MAZDA 3 I GRAND TOURING', anio: 2020 },
  { nombre: 'GMC SIERRA AT4', anio: 2021 },
  { nombre: 'CHEVROLET TAHOE HIGH COUNTRY', anio: 2022 },
  { nombre: 'PEUGEOT 5008 GT', anio: 2022 },
  { nombre: 'AUDI A3 S LINE', anio: 2022 },
  { nombre: 'CHEVROLET SILVERADO 1500', anio: 2016 },
  { nombre: 'DODGE RAM 700 LARAMIE', anio: 2025 },
  { nombre: 'JEEP GRAND CHEROKEE LIMITED', anio: 2023 },
  { nombre: 'GMC SIERRA DENALI', anio: 2022 },
  { nombre: 'VOLKSWAGEN TIGUAN COMFORTLINE', anio: 2019 },
  { nombre: 'BMW X6 XDRIVE40i', anio: 2025 },
  { nombre: 'BMW X5 M COMPETITION', anio: 2024 },
  { nombre: 'CHEVROLET CHEYENNE RST Z71', anio: 2019 },
  { nombre: 'FORD LOBO PLATINUM PLUS HEV', anio: 2024 },
  { nombre: 'HONDA PILOT TOURING', anio: 2018 },
  { nombre: 'BMW X5 XDrive40i', anio: 2020 },
  { nombre: 'INFINITI QX60 SENSORY', anio: 2023 },
  { nombre: 'GMC YUKON DENALI', anio: 2017 },
  { nombre: 'MERCEDES BENZ GLC300 COUPE', anio: 2023 },
  { nombre: 'AUDI RS5', anio: 2019 },
  { nombre: 'AUDI A5 S LINE', anio: 2021 },
  { nombre: 'BMW X6 M50i', anio: 2021 }, // 1a aparición → se asigna el documento más reciente
  { nombre: 'MERCEDES BENZ G63 AMG', anio: 2021 },
  { nombre: 'KIA SPORTAGE EX', anio: 2021 },
  { nombre: 'FORD MUSTANG GT 5.0 EDICIÓN FREDDY VAN BEUREN', anio: 2015 },
  { nombre: 'CHEVROLET COLORADO ZR2', anio: 2024 },
  { nombre: 'GMC SIERRA DENALI', anio: 2024 },
  { nombre: 'JEEP GLADIATOR RUBICON', anio: 2021 },
  { nombre: 'FORD BRONCO BADLANDS', anio: 2021 },
  { nombre: 'BMW X4 XDRIVE28IA', anio: 2017 },
  { nombre: 'AUDI A1 EGO', anio: 2021 },
  { nombre: 'BMW 430i M SPORT COUPE', anio: 2023 },
  { nombre: 'PORSCHE CAYENNE', anio: 2019 },
  { nombre: 'CHEVROLET SUBURBAN PREMIER', anio: 2019 },
  { nombre: 'BMW X6 M50i', anio: 2021 }, // 2a aparición → se asigna el documento más antiguo
  { nombre: 'NISSAN KICKS PLATINUM E-POWER', anio: 2023 },
  { nombre: 'Volkswagen Teramont Trendline', anio: 2025 },
  { nombre: 'CHEVROLET CHEYENNE LT', anio: 2023 },
  { nombre: 'CUPRA FORMENTOR VZ', anio: 2023 },
  { nombre: 'Chevrolet Suburban High Country', anio: 2021 },
  { nombre: 'NISSAN X-TRAIL ADVANCE', anio: 2020 },
  { nombre: 'FORD LOBO RAPTOR', anio: 2018 },
  { nombre: 'FORD LOBO LIMITED', anio: 2023 },
  { nombre: 'PORSCHE MACAN T', anio: 2025 },
  { nombre: 'GMC YUKON DENALI', anio: 2022 },
  { nombre: 'FORD EDGE ST', anio: 2023 },
  { nombre: 'Nissan XTRAIL HÍBRIDA', anio: 2019 },
  { nombre: 'Toyota Tacoma trd', anio: 2019 },
  { nombre: 'FORD EXPEDITION PLATINUM', anio: 2019 },
  { nombre: 'POLARIS SLINGHOT', anio: 2015 },
  { nombre: 'KIA SORENTO EX GDI', anio: 2019 },
  { nombre: 'VOLKSWAGEN GOLF HIGHLINE', anio: 2017 },
];

// Casos con nombre+año duplicado en la lista, donde el orden de aparición en
// Sanity (por _createdAt) determina cuál copia va en cuál posición.
// Para "BMW X6 M50i (2021)": la 1a aparición en ORDEN_DESEADO (posición más alta
// en el catálogo, fecha de ingreso más reciente: 24/03/2026) corresponde al documento
// creado MÁS RECIENTEMENTE en Sanity. La 2a aparición (fecha de ingreso 12/12/2025,
// más antigua) corresponde al documento creado MÁS ANTIGUO.
const CASOS_DUPLICADOS_POR_FECHA = {
  'bmw x6 m50i|2021': 'mas_reciente_primero',
};

function norm(s) {
  return (s || '')
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

async function main() {
  console.log('🔍 Consultando todos los documentos "auto" en Sanity...\n');

  const docs = await client.fetch(`*[_type == "auto"]{_id, name, year, _createdAt}`);
  console.log(`📦 Total de documentos en Sanity: ${docs.length}\n`);

  // Lista mutable de documentos disponibles para emparejar (para poder ir
  // "consumiendo" coincidencias y así soportar nombres repetidos).
  const disponibles = [...docs];

  const asignaciones = []; // { _id, displayOrder, nombre }
  const noEncontrados = [];

  // Pre-procesamos: para cada combinación nombre+año que tenga un caso especial
  // de duplicado por fecha, ordenamos sus copias en Sanity de más reciente a más antigua,
  // para poder ir asignándolas en ese mismo orden a medida que aparecen en ORDEN_DESEADO.
  const colaPorClaveDuplicada = {};

  ORDEN_DESEADO.forEach((target, index) => {
    const displayOrder = index + 1;
    const clave = `${norm(target.nombre)}|${target.anio}`;

    let doc = null;

    if (CASOS_DUPLICADOS_POR_FECHA[clave]) {
      // Si es la primera vez que vemos esta clave, armamos la cola ordenada
      // de más reciente a más antigua, tomando todas las copias disponibles ahora.
      if (!colaPorClaveDuplicada[clave]) {
        const copias = disponibles
          .filter((d) => norm(d.name) === norm(target.nombre) && String(d.year) === String(target.anio))
          .sort((a, b) => new Date(b._createdAt) - new Date(a._createdAt)); // más reciente primero
        colaPorClaveDuplicada[clave] = copias;
      }
      doc = colaPorClaveDuplicada[clave].shift(); // toma la más reciente disponible, luego la siguiente
      if (doc) {
        const idxEnDisponibles = disponibles.findIndex((d) => d._id === doc._id);
        if (idxEnDisponibles !== -1) disponibles.splice(idxEnDisponibles, 1);
      }
    } else {
      const idx = disponibles.findIndex(
        (d) => norm(d.name) === norm(target.nombre) && String(d.year) === String(target.anio)
      );
      if (idx !== -1) {
        doc = disponibles[idx];
        disponibles.splice(idx, 1);
      }
    }

    if (!doc) {
      noEncontrados.push({ posicion: displayOrder, ...target });
      return;
    }

    asignaciones.push({ _id: doc._id, displayOrder, nombre: `${target.nombre} (${target.anio})`, creado: doc._createdAt });
  });

  console.log('━'.repeat(60));
  console.log(`\n✅ Coincidencias encontradas: ${asignaciones.length} de ${ORDEN_DESEADO.length}\n`);

  // Mostrar específicamente el caso de BMW X6 M50i para que se pueda verificar visualmente
  const casosBMW = asignaciones.filter((a) => a.nombre.toLowerCase().includes('bmw x6 m50i'));
  if (casosBMW.length > 0) {
    console.log('🔎 Verificación del caso BMW X6 M50i (2021) duplicado:');
    casosBMW.forEach((a) => {
      console.log(`   Posición ${a.displayOrder} → _id: ${a._id} (creado: ${a.creado})`);
    });
    console.log('   Confirma que el de creación más reciente quedó en la posición más temprana.\n');
  }

  if (noEncontrados.length > 0) {
    console.log(`❌ NO se encontraron en Sanity (${noEncontrados.length}):`);
    noEncontrados.forEach((n) => {
      console.log(`   Posición ${n.posicion}: ${n.nombre} (${n.anio})`);
    });
    console.log('\n⚠️  Revisa estos nombres antes de continuar — probablemente hay una diferencia de escritura.');
    console.log('   El script SOLO aplicará displayOrder a los que sí coincidieron.\n');
  }

  console.log('━'.repeat(60));
  console.log('\n💾 Aplicando displayOrder en Sanity...\n');

  let exitosos = 0;
  let errores = 0;

  for (const a of asignaciones) {
    try {
      await client.patch(a._id).set({ displayOrder: a.displayOrder }).commit();
      console.log(`   ✅ [${a.displayOrder}] ${a.nombre} → _id: ${a._id}`);
      exitosos++;
    } catch (err) {
      console.log(`   ❌ Error en ${a.nombre}: ${err.message}`);
      errores++;
    }
  }

  // Los autos que NO están en ORDEN_DESEADO (autos "extra" en Sanity que no estaban
  // en tu lista) se quedan sin displayOrder. Para que no desaparezcan ni se vayan
  // al principio por accidente, les asignamos un número alto (después de todos los demás),
  // en el orden en que ya estaban (por _createdAt desc), para que aparezcan al final.
  const usados = new Set(asignaciones.map((a) => a._id));
  const sobrantes = docs.filter((d) => !usados.has(d._id));

  if (sobrantes.length > 0) {
    console.log(`\n📋 Autos en Sanity que NO estaban en tu lista (${sobrantes.length}), se irán al final:`);
    let siguienteOrden = ORDEN_DESEADO.length + 1;
    for (const d of sobrantes) {
      try {
        await client.patch(d._id).set({ displayOrder: siguienteOrden }).commit();
        console.log(`   ✅ [${siguienteOrden}] ${d.name} (${d.year}) → _id: ${d._id}`);
        siguienteOrden++;
        exitosos++;
      } catch (err) {
        console.log(`   ❌ Error en ${d.name}: ${err.message}`);
        errores++;
      }
    }
  }

  console.log('\n' + '━'.repeat(60));
  console.log('\n📊 Resumen final:');
  console.log(`   displayOrder asignado correctamente: ${exitosos}`);
  console.log(`   Errores: ${errores}`);
  console.log(`   No encontrados (sin tocar): ${noEncontrados.length}`);
  console.log('\nSiguiente paso: actualizar fetchCars.ts para ordenar por "displayOrder asc".');
}

main().catch((err) => {
  console.error('❌ Error general:', err.message);
});
