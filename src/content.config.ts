import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
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

const areas = defineCollection({
  // Simulating fetching Neighborhood data dynamically via an inline API/DB loader
  loader: async () => {
    // Artificial delay to mimic remote fetch payload
    await new Promise(resolve => setTimeout(resolve, 500));

    const dbPayload = [
      { id: 'eagle-river', name: 'Eagle River', region: 'Chugiak-Eagle River', population: '25,000+', highlight: 'mountain views and robust deck engineering', geoImage: 'https://images.unsplash.com/photo-1549405626-d62f48efeb05' },
      { id: 'girdwood', name: 'Girdwood', region: 'Turnagain Arm', population: '~3,000', highlight: 'resort-style outdoor living and snow-load resistance', geoImage: 'https://images.unsplash.com/photo-1478827536114-da961b7f86d2' },
      { id: 'anchorage', name: 'Anchorage', region: 'Municipality of Anchorage', population: '290,000+', highlight: 'year-round durability for unpredictable coastal weather', geoImage: 'https://images.unsplash.com/photo-1548842407-3da39d891b61' },
      { id: 'wasilla', name: 'Wasilla', region: 'Mat-Su Borough', population: '11,000+', highlight: 'spacious lakeside designs', geoImage: 'https://images.unsplash.com/photo-1522079495449-74d6c442cfd9' },
    ];

    return dbPayload.map((area) => ({
      ...area,
    }));
  },
  schema: z.object({
    id: z.string(),
    name: z.string(),
    region: z.string(),
    population: z.string(),
    highlight: z.string(),
    geoImage: z.string().url(),
  })
});

export const collections = { services, areas };
