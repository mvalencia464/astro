import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/services" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    city: z.string(),
    serviceName: z.string(),
  }),
});

export const collections = { services };
