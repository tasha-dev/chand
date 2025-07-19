// Codes by mahdi tasha
// Importing part
import { ReactNode } from 'react';
import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/component/ui/alert';

// Creating and exporting ApiAlert component as default
export default function ApiAlert(): ReactNode {
  // Returning JSX
  return (
    <Alert variant='destructive'>
      <AlertCircleIcon />
      <AlertTitle>Unable to fetch the api.</AlertTitle>
      <AlertDescription>
        <p>
          There was an error while fetching the api to get list of currencys.
        </p>
        <ul className='list-inside list-disc text-sm'>
          <li>Check later</li>
          <li>Change your internet</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}
