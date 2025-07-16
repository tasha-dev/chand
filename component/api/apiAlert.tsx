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
      <AlertTitle>Unable to process your payment.</AlertTitle>
      <AlertDescription>
        <p>Please verify your billing information and try again.</p>
        <ul className='list-inside list-disc text-sm'>
          <li>Check your card details</li>
          <li>Ensure sufficient funds</li>
          <li>Verify billing address</li>
        </ul>
      </AlertDescription>
    </Alert>
  );
}
