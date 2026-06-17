import { client } from './sanityClient'
import { Car } from '@/types/car'

export async function fetchCars(): Promise<Car[]> {
  const data = await client.fetch(
    `*[_type == "auto"] | order(_createdAt desc) {
      "id": _id,
      _createdAt,
      name,
      year,
      category,
      price,
      "image": images[0].asset->url,
      "images": images[].asset->url,
      details
    }`
  )

  console.log('Sanity total:', data.length)
  console.log('Primer auto:', data[0])

  return data.map((car: any) => ({
    ...car,
    image: car.image || '',
    images: (car.images || []).filter(Boolean),
  }))
}