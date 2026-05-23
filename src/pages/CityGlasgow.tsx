"use client";
import { CityPage, CITIES } from '../components/CityPage';

const city = CITIES.find((c) => c.slug === 'glasgow')!;

export function CityGlasgow() {
  return <CityPage city={city} />;
}
