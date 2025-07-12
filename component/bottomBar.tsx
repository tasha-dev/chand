// Codes by mahdi tasha
// Importing part
import { ReactNode } from 'react';
import Container from './ui/container';
import { Ellipsis, Plus } from 'lucide-react';

// Creating and exorting footer component as default
export default function BottomBar(): ReactNode {
  // Retutning JSX
  return (
    <div className='fixed bottom-5 left-0 w-full'>
      <Container className='bg-foreground/20 backdrop-blur-xl border border-foreground/20 rounded-[50rem] p-4 shadow-xl scale-95 flex items-center justify-between'>
        <button className='block shrink-0'>
          <Plus className='w-4 h-4 text-foreground' />
        </button>
        <span className='text-foreground/80 text-right text-xs font-medium truncate block'>
          Chand ?!
        </span>
        <button className='block shrink-0'>
          <Ellipsis className='w-4 h-4 text-foreground' />
        </button>
      </Container>
    </div>
  );
}
