// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import About from '@/component/dialog/about';
import Rate from '@/component/rate';
import SearchCommand from '@/component/searchCommand';
import Page from '@/component/layout/page';
import SearchCommandProvider from '@/context/searchCommandContext';
import { ReactNode } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import useCurrencys from '@/hook/useCurrencys';

// Creating and exporting Home page as default
export default function HomePage(): ReactNode {
  // Returning JSX
  return (
    <SearchCommandProvider>
      <Page className='mb-20'>
        <HomeContent />
      </Page>
    </SearchCommandProvider>
  );
}

function HomeContent(): ReactNode {
  // Defining hooks
  const currencysList = useCurrencys({ inLocalStorage: true });
  const [modalSeen, setModalSeen] = useLocalStorageState('aboutModalSeen', {
    defaultValue: false,
  });

  return (
    <>
      {!modalSeen && <About setLocalStorageItem={setModalSeen} />}
      <SearchCommand />
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
        {currencysList.data.length === 0 ? (
          <div className='col-span-3 flex items-center justify-center'>
            <span className='lg:font-bold font-medium text-foreground lg:text-2xl text-lg text-center block'>
              There is nothing to show !
            </span>
          </div>
        ) : (
          currencysList.data.map((item, index) => (
            <Rate
              key={index}
              name={item.en}
              price={item.price}
              slug={item.code}
              img={item.icon}
              status={{
                name: 'same',
                number: item.price,
              }}
            />
          ))
        )}
      </div>
    </>
  );
}
