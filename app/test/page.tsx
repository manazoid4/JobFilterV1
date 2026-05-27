import { redirect } from 'next/navigation';
import { TestConsolePage } from '../../src/pages/TestConsolePage';

export default function Page(props: any) {
  if (process.env.NODE_ENV !== 'development') {
    redirect('/');
  }
  return <TestConsolePage {...props} />;
}
