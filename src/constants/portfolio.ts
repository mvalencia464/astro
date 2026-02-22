import type { Project, ServiceNiche } from "../types/portfolio";

export const NICHES: ServiceNiche[] = ['New Build', 'Resurfacing', 'Railing', 'Covered Deck', 'Commercial'];

const projects: Project[] = [
  {
    "id": "hillside-mountain-view",
    "title": "Hillside Mountain View Deck",
    "niche": "New Build",
    "location": "Hillside",
    "description": "Custom Trex composite deck with cable railing maximizing Chugach Mountain views. This multi-level design features seamless sightline optimization with stainless steel cable railings.",
    "beforeImage": "portfolio/hillside-mountain-view.webp",
    "afterImage": "portfolio/hillside-mountain-view.webp",
    "gallery": [],
    "date": "2024-07-15",
    "featured": true,
    "testimonial": {
      "quote": "The design maximizes our mountain views perfectly. Couldn't be happier with the craftsmanship.",
      "author": "Hillside Homeowner",
      "rating": 5
    }
  },
  {
    "id": "south-anchorage-retreat",
    "title": "South Anchorage Retreat",
    "niche": "Covered Deck",
    "location": "South Anchorage",
    "description": "Cedar construction with integrated pergola and built-in seating. A complete outdoor living transformation with superior weather protection and entertaining space.",
    "beforeImage": "portfolio/south-anchorage-retreat.webp",
    "afterImage": "portfolio/south-anchorage-retreat.webp",
    "gallery": [],
    "date": "2024-06-20",
    "featured": true,
    "testimonial": {
      "quote": "Our backyard is now our favorite room in the house. The pergola provides the perfect shade.",
      "author": "South Anchorage Family",
      "rating": 5
    }
  },
  {
    "id": "turnagain-coastal",
    "title": "Turnagain Coastal Deck",
    "niche": "Resurfacing",
    "location": "Turnagain",
    "description": "Trex Enhance in Coastal Bluff with aluminum railing system. A complete resurfacing that transformed an aging deck into a modern masterpiece.",
    "beforeImage": "portfolio/turnagain-coastal.webp",
    "afterImage": "portfolio/turnagain-coastal.webp",
    "gallery": [],
    "date": "2024-05-30",
    "featured": false,
    "testimonial": {
      "quote": "The transformation was amazing. We didn't realize how much better it could look.",
      "author": "Turnagain Homeowner",
      "rating": 5
    }
  },
  {
    "id": "eagle-river-sanctuary",
    "title": "Eagle River Sanctuary",
    "niche": "New Build",
    "location": "Eagle River",
    "description": "Premium Alaskan Yellow Cedar with custom privacy screens. A natural wood masterpiece that blends seamlessly with the surrounding landscape.",
    "beforeImage": "portfolio/eagle-river-sanctuary.webp",
    "afterImage": "portfolio/eagle-river-sanctuary.webp",
    "gallery": [],
    "date": "2024-08-10",
    "featured": false,
    "testimonial": {
      "quote": "The cedar deck smells amazing and looks even better. Worth every penny.",
      "author": "Eagle River Owner",
      "rating": 5
    }
  },
  {
    "id": "midtown-modern",
    "title": "Midtown Modern",
    "niche": "New Build",
    "location": "Midtown Anchorage",
    "description": "Engineered deck with reinforced hot tub platform and LED lighting. A contemporary design perfect for entertaining with integrated luxury amenities.",
    "beforeImage": "portfolio/midtown-modern.webp",
    "afterImage": "portfolio/midtown-modern.webp",
    "gallery": [],
    "date": "2024-07-05",
    "featured": true,
    "testimonial": {
      "quote": "Our hot tub deck is the envy of the neighborhood. The engineering is rock solid.",
      "author": "Midtown Resident",
      "rating": 5
    }
  },
  {
    "id": "glen-alps-entertainer",
    "title": "Glen Alps Entertainer",
    "niche": "Covered Deck",
    "location": "Glen Alps",
    "description": "Expansive deck with built-in grill station and dining area. An outdoor kitchen paradise designed for large gatherings and entertaining.",
    "beforeImage": "portfolio/glen-alps-entertainer.webp",
    "afterImage": "portfolio/glen-alps-entertainer.webp",
    "gallery": [],
    "date": "2024-06-15",
    "featured": true,
    "testimonial": {
      "quote": "Hosting on our deck is now a dream. The grill station is perfectly integrated.",
      "author": "Glen Alps Entertainer",
      "rating": 5
    }
  }
];

export const MOCK_PROJECTS: Project[] = projects;

export const PORTFOLIO_GALLERY = [
  // Aerial
  { src: "portfolio/001-aerial-wraparound.webp", caption: "Why fly to Hawaii? Walk out your back door instead." },
  { src: "portfolio/002-aerial-overview.webp", caption: "The most impressive room in your house... isn't inside." },
  { src: "portfolio/005-aerial-wide.webp", caption: "Wraparound dreams. Custom built. 21-day guarantee." },
  { src: "portfolio/006-aerial-composite.webp", caption: "Premium composite that won't rot, warp, or splinter." },
  { src: "portfolio/008-aerial-elevated.webp", caption: "From concept to completion. No surprises. Just results." },
  // Masterpiece
  { src: "portfolio/009-masterpiece-main.webp", caption: "Hillside masterpiece. Built to outlast a lifetime." },
  { src: "portfolio/010-masterpiece-detail.webp", caption: "Precision craftsmanship in every hidden fastener." },
  { src: "portfolio/011-masterpiece-railing.webp", caption: "Cable railing. Flawless views. Absolute confidence." },
  { src: "portfolio/012-masterpiece-lighting.webp", caption: "Integrated lighting that transforms your evenings." },
  // Contemporary
  { src: "portfolio/013-contemporary-covered.webp", caption: "Year-round outdoor living. Covered. Protected. Yours." },
  { src: "portfolio/014-contemporary-outdoor.webp", caption: "Where entertaining becomes art. Where summer never ends." },
  { src: "portfolio/015-contemporary-seating.webp", caption: "Built-in seating for the entertaining life you deserve." },
  { src: "portfolio/016-contemporary-angle.webp", caption: "Modern design meets Alaska engineering excellence." },
  { src: "portfolio/017-contemporary-design.webp", caption: "Contemporary beauty. Frost-heave resistant. Built right." },
  { src: "portfolio/018-contemporary-modern.webp", caption: "Composite elegance. No maintenance. All luxury." },
  { src: "portfolio/019-contemporary-finish.webp", caption: "Finished to perfection. Ready to host. Ready to impress." },
  { src: "portfolio/020-contemporary-full.webp", caption: "The view from here? Priceless. The deck? An investment." },
  // Custom
  { src: "portfolio/021-custom-entrance.webp", caption: "Custom entrance to your outdoor sanctuary." },
  { src: "portfolio/022-custom-stairs.webp", caption: "Engineered stairs. Designed for confidence." },
  { src: "portfolio/023-custom-railing.webp", caption: "Cable railing that preserves every mountain view." },
  { src: "portfolio/024-custom-platform.webp", caption: "The platform for your best summer memories." },
  { src: "portfolio/025-custom-ambiance.webp", caption: "Twilight ambiance. Your personal resort." },
  { src: "portfolio/026-custom-landscape.webp", caption: "Landscape integration. Seamless beauty." },
  { src: "portfolio/027-custom-sunset.webp", caption: "Sunset views. Stress-free living. No maintenance." },
  { src: "portfolio/028-custom-evening.webp", caption: "Evening entertainment. Zero surprises. Pure joy." },
  { src: "portfolio/029-custom-premium.webp", caption: "Premium custom design. Your vision. Our expertise." },
  // Premium New Images
  { src: "portfolio/045-wraparound-angle.webp", caption: "Wraparound possibility. Resort living awaits." },
  { src: "portfolio/048-lighting-detail.webp", caption: "Lighting that transforms day into magic." },
  { src: "portfolio/049-small-project.webp", caption: "Every size deck deserves premium engineering." },
  // Final Image
  { src: "portfolio/IMG_1055.webp", caption: "The finishing touch. Your deck complete." }
];
