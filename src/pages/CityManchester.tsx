import { CityPage, CITIES } from '../components/CityPage';

const city = CITIES.find((c) => c.slug === 'manchester')!;

export function CityManchester() {
  return <CityPage city={city} />;
}
