import type { Project, ServiceNiche } from "../types/portfolio";
import projectsData from '../data/projects.json';

export const NICHES: ServiceNiche[] = ['New Build', 'Resurfacing', 'Railing', 'Covered Deck', 'Commercial'];

export const MOCK_PROJECTS: Project[] = projectsData as Project[];
