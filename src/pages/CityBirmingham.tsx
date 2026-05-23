"use client";
import { CityPage, CITIES } from '../components/CityPage';

const city = CITIES.find((c) => c.slug === 'birmingham')!;

export function CityBirmingham() {
  return <CityPage city={city} />;
}
