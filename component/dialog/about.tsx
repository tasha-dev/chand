// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/component/ui/dialog';
import { DollarSign } from 'lucide-react';
import { AboutModalProps } from '@/type/component';
import { ReactNode, useState } from 'react';
import { Button } from '@/component/ui/button';
import { useMediaQuery } from '@/hook/useMediqQuery';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';

// Creating and exporting About dialog as default
export default function About({
  setLocalStorageItem,
}: AboutModalProps): ReactNode {
  // Defining states of component
  const [opened, setOpened] = useState<boolean>(true);
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // Conditional rendering
  if (!isMobile) {
    return (
      <Dialog
        open={opened}
        onOpenChange={(open) => {
          setLocalStorageItem(true);
          setOpened(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2 justify-start'>
              <DollarSign className='w-5 h-5 shrink-0' />
              Welcome to Chand
            </DialogTitle>
          </DialogHeader>
          <div>
            <DialogDescription>
              Experience a faster, cleaner version of the original Chand app —
              now rebuilt for the web and PWA with a modern UI and smooth
              performance. Enjoy the full experience right in your browser or
              install it as an app!
            </DialogDescription>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button className='cursor-pointer'>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer
        open={opened}
        onOpenChange={(open) => {
          setLocalStorageItem(true);
          setOpened(open);
        }}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className='flex items-center gap-2 justify-start'>
              <DollarSign className='w-5 h-5 shrink-0' />
              Welcome to Chand
            </DrawerTitle>
          </DrawerHeader>
          <div className='p-4'>
            <DrawerDescription>
              Experience a faster, cleaner version of the original Chand app —
              now rebuilt for the web and PWA with a modern UI and smooth
              performance. Enjoy the full experience right in your browser or
              install it as an app!
            </DrawerDescription>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className='cursor-pointer'>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
}
