import exteriorDay from "@/assets/exterior-cafe.jpeg";
import exteriorNight from "@/assets/exterior-night.jpeg";
import interiorDay from "@/assets/interior-day.jpeg";
import interiorArchEvening from "@/assets/interior-arch-evening.jpeg";
import interiorPerspective from "@/assets/interior-perspective.jpeg";
import archesDay from "@/assets/arches-day.jpeg";
import archesEvening from "@/assets/arches-evening.jpeg";
import archesEvening2 from "@/assets/arches-evening-2.jpeg";
import corridorArches from "@/assets/corridor-arches.jpeg";
import ceilingDay from "@/assets/ceiling-day.jpeg";
import ceilingWarm from "@/assets/ceiling-warm.jpeg";
import interiorCeiling from "@/assets/interior-ceiling.jpeg";
import logo from "@/assets/gg-logo.jpeg";
import brandIdentity from "@/assets/brand-identity.jpeg";

import residenceExterior from "@/assets/residence-exterior.jpeg";
import residenceLiving from "@/assets/residence-living.jpeg";
import residenceTv from "@/assets/residence-tv.jpeg";
import residenceDining from "@/assets/residence-dining.jpeg";
import residenceBedroom1 from "@/assets/residence-bedroom-1.jpeg";
import residenceBedroom2 from "@/assets/residence-bedroom-2.jpeg";
import residenceBedroomGeo from "@/assets/residence-bedroom-geo.jpeg";

export const IMG = {
  exteriorDay,
  exteriorNight,
  interiorDay,
  interiorArchEvening,
  interiorPerspective,
  archesDay,
  archesEvening,
  archesEvening2,
  corridorArches,
  ceilingDay,
  ceilingWarm,
  interiorCeiling,
  logo,
  brandIdentity,
  residenceExterior,
  residenceLiving,
  residenceTv,
  residenceDining,
  residenceBedroom1,
  residenceBedroom2,
  residenceBedroomGeo,
};

export const GALLERY = [
  { src: interiorDay, title: "Daylight Hall", caption: "Natural light through full-height glazing" },
  { src: interiorArchEvening, title: "Evening Arches", caption: "Warm sconces, ribbed walls, soft glow" },
  { src: archesDay, title: "Arched Niches", caption: "Terracotta panels in morning light" },
  { src: archesEvening, title: "Recessed Glow", caption: "LED contour & wrought iron" },
  { src: archesEvening2, title: "Repeated Rhythm", caption: "Symmetry through repeated arch forms" },
  { src: ceilingWarm, title: "Coffered Ceiling", caption: "Wood lattice, woven pendants, hung greens" },
  { src: interiorPerspective, title: "Spatial Flow", caption: "Procession from entry to lounge" },
  { src: corridorArches, title: "Corridor Symmetry", caption: "A guided walkthrough" },
];

// Second project — a private residence
export const RESIDENCE_PROJECT = {
  title: "The Verdant Residence",
  location: "Pune · Private Commission",
  year: "2025",
  summary:
    "A four-storey contemporary home where warm timber, deep navy panelling and living green screens compose a calm, layered domestic landscape.",
  cover: residenceExterior,
  images: [
    { src: residenceExterior, title: "Façade at Dusk", caption: "Layered volumes lit from within" },
    { src: residenceLiving, title: "Living Pavilion", caption: "Marble, herringbone timber, navy fluting" },
    { src: residenceTv, title: "Media Wall", caption: "Oak veneer + travertine, screened by green" },
    { src: residenceDining, title: "Dining Alcove", caption: "Halo pendant over walnut table" },
    { src: residenceBedroomGeo, title: "Geometry Suite", caption: "Hand-laid timber marquetry headboard" },
    { src: residenceBedroom2, title: "Master Bedroom", caption: "Linen drapes, marble floor, soft warmth" },
    { src: residenceBedroom1, title: "Window Reading Nook", caption: "Built-in oak joinery and garden view" },
  ],
};
