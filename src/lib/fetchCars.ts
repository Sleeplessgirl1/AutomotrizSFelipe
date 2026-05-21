import { client } from './sanityClient'
import { Car } from '@/types/car'

export async function fetchCars(): Promise<Car[]> {
  return client.fetch(`
    *[_type == "auto"] | order(_createdAt desc) {
      "id": _id,
      name,
      year,
      category,
      price,
      "image": images[0].asset->url,
      "images": images[].asset->url,
      details
    }
  `)
}