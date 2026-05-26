import { client } from './sanityClient'
import { Car } from '@/types/car'

export async function fetchCars(): Promise<Car[]> {
  const data = await client.fetch(`
    *[_type == "auto"] {
      "id": _id,
      name,
      year,
      category,
      price,
      "image": coalesce(images[0].asset->url, images[0]._sanityAsset),
      "images": images[]{
        "url": coalesce(asset->url, _sanityAsset)
      },
      details
    }
  `)

  return data
    .map((car: any) => ({
      ...car,
      image: car.image?.replace('image@', '') || '',
      images: (car.images || []).map((i: any) => i?.url?.replace('image@', '') || ''),
    }))
    .sort((a: any, b: any) => {
      const idA = parseInt(a.id.replace('auto-', ''))
      const idB = parseInt(b.id.replace('auto-', ''))
      return idB - idA
    })
}