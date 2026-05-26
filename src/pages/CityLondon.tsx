"use client";
import { CityPage, CITIES } from '../components/CityPage';

const city = CITIES.find((c) => c.slug === 'london')!;

export function CityLondon() {
  return <CityPage city={city} />;
}
