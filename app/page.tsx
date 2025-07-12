// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import About from '@/component/dialog/about';
import Rate from '@/component/rate';
import Page from '@/component/ui/page';
import { ReactNode } from 'react';
import useLocalStorageState from 'use-local-storage-state';

// Creating and exporting Home page as default
export default function HomePage(): ReactNode {
  const [modalSeen, setModalSeen] = useLocalStorageState('aboutModalSeen', {
    defaultValue: false,
  });

  // Returning JSX
  return (
    <Page>
      {!modalSeen && <About setLocalStorageItem={setModalSeen} />}
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
        {[...new Array(200)].map((_, index) => (
          <Rate
            key={index}
            status={{
              number: 122342343,
              name: 'up',
            }}
            slug='USD'
            name='USA DOLLAR'
            price={1231231}
          />
        ))}
      </div>
    </Page>
  );
}
