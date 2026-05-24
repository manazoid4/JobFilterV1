"use client";
import { CityPage, CITIES } from '../components/CityPage';

const city = CITIES.find((c) => c.slug === 'leeds')!;

export function CityLeeds() {
  return <CityPage city={city} />;
}
