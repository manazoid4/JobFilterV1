import { redirect } from 'next/navigation';
import { IntakeTestPage } from '../../../src/pages/IntakeTestPage';

export default function Page() {
  if (process.env.NODE_ENV !== 'development') {
    redirect('/');
  }
  return <IntakeTestPage />;
}
