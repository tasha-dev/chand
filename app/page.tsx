// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import About from '@/component/dialog/about';
import Rate from '@/component/rate';
import SearchCommand from '@/component/searchCommand';
import Page from '@/component/ui/page';
import SearchCommandProvider from '@/context/searchCommandContext';
import { ReactNode } from 'react';
import useLocalStorageState from 'use-local-storage-state';

// Defining fake data
const rates: {
  name: string;
  slug: string;
  price: number;
  status: {
    name: 'down' | 'up' | 'same';
    number: number;
  };
}[] = [
  {
    name: 'US Dollar',
    slug: 'usd',
    price: 87300 / 10, // 87,300 Rials → 8,730 Toman
    status: { name: 'down', number: -900 / 10 }, // –900 Rials → –90 Toman
  },
  {
    name: 'Euro',
    slug: 'eur',
    price: 1_021_000 / 10, // 1,021,000 Rials → 102,100 Toman
    status: { name: 'down', number: -10_000 / 10 }, // –1,000 Toman
  },
  {
    name: 'British Pound',
    slug: 'gbp',
    price: 1_160_000 / 10, // assume ~1,160,000 Rials → 116,000 Toman
    status: { name: 'down', number: -12000 / 10 }, // example –12,000 Rials
  },
  {
    name: 'UAE Dirham',
    slug: 'aed',
    price: 11_900 / 10, // assume ~11,900 Rials → 1,190 Toman
    status: { name: 'same', number: 0 },
  },
  {
    name: 'Australian Dollar',
    slug: 'aud',
    price: 27_000 / 10, // approx → 2,700 Toman
    status: { name: 'down', number: -300 / 10 },
  },
  {
    name: 'Canadian Dollar',
    slug: 'cad',
    price: 31_000 / 10, // approx → 3,100 Toman
    status: { name: 'down', number: -200 / 10 },
  },
  {
    name: 'Swiss Franc',
    slug: 'chf',
    price: 47_000 / 10, // approx → 4,700 Toman
    status: { name: 'down', number: -500 / 10 },
  },
  {
    name: 'Japanese Yen (100¥)',
    slug: 'jpy100',
    price: 28_000 / 10, // approx → 2,800 Toman
    status: { name: 'same', number: 0 },
  },
  {
    name: 'Chinese Yuan',
    slug: 'cny',
    price: 5_800 / 10, // approx → 580 Toman
    status: { name: 'down', number: -100 / 10 },
  },
  {
    name: 'Turkish Lira',
    slug: 'try',
    price: 1_450_000 / 10, // approx → 145,000 Toman
    status: { name: 'down', number: -15000 / 10 },
  },
  {
    name: 'Afghan Afghani',
    slug: 'afn',
    price: 500 / 10, // approx → 50 Toman
    status: { name: 'same', number: 0 },
  },
  {
    name: 'Indian Rupee',
    slug: 'inr',
    price: 550 / 10, // approx → 55 Toman
    status: { name: 'down', number: -20 / 10 },
  },
];

// Creating and exporting Home page as default
export default function HomePage(): ReactNode {
  const [modalSeen, setModalSeen] = useLocalStorageState('aboutModalSeen', {
    defaultValue: false,
  });

  // Returning JSX
  return (
    <SearchCommandProvider>
      <Page className='mb-20'>
        {!modalSeen && <About setLocalStorageItem={setModalSeen} />}
        <SearchCommand data={rates} />
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
          {rates.map((item, index) => (
            <Rate key={index} {...item} />
          ))}
        </div>
      </Page>
    </SearchCommandProvider>
  );
}
