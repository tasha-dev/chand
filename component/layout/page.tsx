// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { cn } from '@/lib/utils';
import { PageProps } from '@/type/component';
import { ReactNode, createContext } from 'react';
import Header from '../header';
import BottomBar from '../bottomBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Container from '../ui/container';
import { useApiQuery } from '@/hook/useApiQuery';
import { exchangeRatesResponseType } from '@/type/api';
import { Loader2 } from 'lucide-react';
import ApiAlert from '../api/apiAlert';

// Defining query client
const queryClient = new QueryClient();

// Defining contexts
export const currencyListContext = createContext<
  exchangeRatesResponseType['currencies'] | undefined
>(undefined);

// Defining page content wrapper
function PageContent({ children, variant }: PageProps): ReactNode {
  // Defining hooks
  const getData = useApiQuery<exchangeRatesResponseType>({
    url: '/',
    queryKey: ['currencys', 'list'],
    options: {
      staleTime: Infinity,
    },
  });

  // Conditional rendering
  if (getData.isLoading) {
    return (
      <Container
        variant={variant}
        className='flex items-center justify-center w-full h-[calc(100dvh-24px)]'
      >
        <Loader2 className='w-10 h-10 text-foreground animate-spin' />
      </Container>
    );
  } else if (getData.isError) {
    return (
      <Container variant={variant}>
        <ApiAlert />
      </Container>
    );
  } else if (!getData.isLoading && !getData.isError && getData.data) {
    return (
      <currencyListContext.Provider value={getData.data.currencies}>
        <BottomBar />
        <Container variant={variant}>
          <Header />
          {children}
        </Container>
      </currencyListContext.Provider>
    );
  }
}

// Creating and exporting page component as default
export default function Page({
  children,
  className,
  variant = 'sm',
}: PageProps): ReactNode {
  // Returning JSX
  return (
    <div
      className={cn(
        'bg-background min-h-screen text-foreground lg:p-3 p-6',
        className,
      )}
    >
      <QueryClientProvider client={queryClient}>
        <PageContent variant={variant}>{children}</PageContent>
      </QueryClientProvider>
    </div>
  );
}
