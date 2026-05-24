"use client";
import { CityPage, CITIES } from '../components/CityPage';

const city = CITIES.find((c) => c.slug === 'bristol')!;

export function CityBristol() {
  return <CityPage city={city} />;
}
