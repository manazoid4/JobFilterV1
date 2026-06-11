import { notFound } from 'next/navigation';
import { DevPortalPage } from '../../src/pages/DevPortalPage';

export default function Page(props: any) {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }
  return <DevPortalPage {...props} />;
}
