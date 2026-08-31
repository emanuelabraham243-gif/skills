import type { CarImage } from "./types";

// Real photography for the homepage hero slideshow — deliberately not tied
// to any specific car in stock (the hero is atmosphere, not inventory), so
// it stays correct even as the mock/real car list changes. Swap these for
// the importer's own photography when available.
export const heroImages: CarImage[] = [
  {
    id: "hero-1",
    url: "/hero/mercedes-c-class-black.jpg",
    alt: "A black Mercedes-Benz C-Class driving past a modern glass building",
    position: 0,
  },
  {
    id: "hero-2",
    url: "/hero/mercedes-a-class-white.jpg",
    alt: "A white Mercedes-Benz A-Class hatchback in motion on a city street",
    position: 1,
  },
  {
    id: "hero-3",
    url: "/hero/byd-seal-front.jpg",
    alt: "Close-up front detail of a BYD Seal electric car",
    position: 2,
  },
  {
    id: "hero-4",
    url: "/hero/genesis-gv60-charging.jpg",
    alt: "A Genesis GV60 electric SUV charging at a futuristic charging station",
    position: 3,
  },
];
