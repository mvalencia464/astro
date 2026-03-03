import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const decks = defineCollection({
  loader: glob({ pattern: '**/*.{jpg,jpeg,png,webp}', base: './src/assets/decks' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().optional().default('Custom Deck Project'),
      cover: image(),
    }),
});

export const collections = { decks };
