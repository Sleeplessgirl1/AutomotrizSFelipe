import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'nnuyo5k9',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})