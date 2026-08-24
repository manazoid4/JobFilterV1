import type { Metadata } from 'next';
import { RevenueRescueDemoPage } from '../../../src/pages/RevenueRescueDemoPage';

export const metadata: Metadata = {
  title: 'Revenue Rescue Demo | JobFilter',
  description: 'A synthetic walkthrough of JobFilter enquiry qualification, quoting, follow-up and revenue attribution.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <RevenueRescueDemoPage />;
}
