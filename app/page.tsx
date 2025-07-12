// Codes by mahdi tasha
// Importing part
import Rate from '@/component/rate';
import Page from '@/component/ui/page';
import { ReactNode } from 'react';

// Creating and exporting Home page as default
export default function HomePage(): ReactNode {
  // Returning JSX
  return (
    <Page>
      <div className='grid grid-cols-3 gap-3'>
        <Rate
          status={{
            number: 122342343,
            name: 'up',
          }}
          slug='USD'
          name='USA DOLLAR'
          price={1231231}
        />
      </div>
    </Page>
  );
}
