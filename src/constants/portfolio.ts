// Deck service categories
export const NICHES = ['New Build', 'Resurfacing', 'Railing', 'Covered Deck', 'Commercial'] as const;
export type ServiceNiche = (typeof NICHES)[number];
