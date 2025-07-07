import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'
import type { Image } from 'sanity'

const builder = imageUrlBuilder(client)

export function urlFor(source: Image | string) {
  return builder.image(source)
}
