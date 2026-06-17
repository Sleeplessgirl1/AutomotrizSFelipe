import { client } from './sanityClient'
import { Car } from '@/types/car'
import { cars as staticCars } from '@/data/cars'

export async function fetchCars(): Promise<Car[]> {
  let sanityCars: Car[] = []

  try {
    const data = await client.fetch(
      `*[_type == "auto"] | order(_createdAt desc) {
        "id": _id,
        _createdAt,
        name,
        year,
        category,
        price,
        "image": coalesce(images[0].asset->url, images[0]._sanityAsset),
        "images": images[]{
          "url": coalesce(asset->url, _sanityAsset)
        },
        details
      }`
    )

    sanityCars = data.map((car: any) => ({
      ...car,
      image: car.image?.replace('image@', '') || '',
      images: (car.images || []).map((i: any) => i?.url?.replace('image@', '') || ''),
    }))
  } catch (e) {
    console.error('Error fetching from Sanity:', e)
  }

  const sanityIds = new Set(sanityCars.map(c => c.id))

  const onlyStatic = staticCars.filter(
    (car): car is Car => !!car && !sanityIds.has(car.id)
  )

  return [...sanityCars, ...onlyStatic]
}