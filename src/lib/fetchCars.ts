import { client } from './sanityClient'
import { Car } from '@/types/car'

export async function fetchCars(): Promise<Car[]> {
  const data = await client.fetch(`
    *[_type == "auto"] | order(_createdAt desc) {
      "id": _id,
      name,
      year,
      category,
      price,
      "imageRaw": images[0]._sanityAsset,
      "imagesRaw": images[]._sanityAsset,
      details
    }
  `)

  return data.map((car: any) => ({
    ...car,
    image: car.imageRaw?.replace('image@', '') || '',
    images: (car.imagesRaw || []).map((i: string) => i?.replace('image@', '') || ''),
  }))
}