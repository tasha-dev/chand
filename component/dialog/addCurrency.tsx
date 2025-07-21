// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { Loader2, Minus, Plus } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Button } from '@/component/ui/button';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useLocalStorageState from 'use-local-storage-state';
import { toast } from 'sonner';
import usePagination from '@/hook/usePagination';
import { Combobox, ComboboxItem } from '../ui/combobox';
import { sortValBy } from '@/lib/utils';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/component/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/component/ui/form';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/component/ui/tooltip';
import useCurrencys from '@/hook/useCurrencys';
import { useMediaQuery } from '@/hook/useMediqQuery';
import { CurrencySelectorFormItemProps } from '@/type/component';

// Defining form Schema
const formSchema = z.object({
  name: z.string(),
});

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting CurrencySelectorFormItem component
function CurrencySelectorFormItem({
  name,
  label,
  control,
  items,
  onNext,
  onPrev,
  canNext,
  canPrev,
}: CurrencySelectorFormItemProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className='flex justify-between gap-3'>
              <Combobox
                items={items}
                value={field.value}
                onChange={field.onChange}
                placeholder='Select currency...'
                className='flex-1'
              />
              <div className='shrink-0 flex gap-3'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      type='button'
                      className='cursor-pointer'
                      onClick={onNext}
                      disabled={!canNext}
                    >
                      <Plus className='w-2 h-2' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Show more items</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size='icon'
                      type='button'
                      className='cursor-pointer'
                      onClick={onPrev}
                      disabled={!canPrev}
                    >
                      <Minus className='w-2 h-2' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Show fewer items</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Creating and exporting AddCurrency dialog as default
export default function AddCurrency(): ReactNode {
  // Defining hooks
  const [opened, setOpened] = useState<boolean>(false);
  const currencysList = useCurrencys({ inLocalStorage: false });
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [savedItems, setSavedItems] =
    useLocalStorageState<string[]>('savedItems');
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Defining variables
  const pagination = usePagination(currencysList.data, 10);
  const transformed: ComboboxItem[] = pagination.paginatedData.map((item) => ({
    label: item.code,
    value: sortValBy(Math.round(item.value)),
  }));

  // Defining submit handler
  const submitFn: SubmitHandler<formType> = async ({ name }) => {
    if (savedItems) {
      if (savedItems.includes(name)) {
        form.setError('name', {
          message: 'The item is added already !',
        });
      } else if (name === '') {
        form.setError('name', {
          message: 'The item is Empty !',
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setSavedItems([...savedItems, name.toLowerCase()]);
        setOpened(false);
        toast('The item is added !');
      }
    }
  };

  // Conditional rendering
  if (!isMobile) {
    return (
      <Dialog open={opened} onOpenChange={setOpened}>
        <DialogTrigger asChild>
          <button className='block shrink-0 cursor-pointer outline-none'>
            <Plus className='w-4 h-4 text-foreground' />
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adding new Currency to your List</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form action='#' onSubmit={form.handleSubmit(submitFn)}>
              <div className='mb-5'>
                <CurrencySelectorFormItem
                  name='name'
                  label='Name of the currency :'
                  control={form.control}
                  items={transformed}
                  onNext={pagination.nextPage}
                  onPrev={pagination.prevPage}
                  canNext={pagination.currentPage < pagination.totalPages}
                  canPrev={pagination.currentPage > 1}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={'outline'} className='cursor-pointer'>
                    Close
                  </Button>
                </DialogClose>
                <Button
                  className='cursor-pointer'
                  disabled={form.formState.isSubmitting}
                >
                  Save
                  {form.formState.isSubmitting ? (
                    <Loader2 className='w-2 h-2 animate-spin' />
                  ) : (
                    <Plus className='w-2 h-2' />
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer open={opened} onOpenChange={setOpened}>
        <DrawerTrigger asChild>
          <button className='block shrink-0 cursor-pointer outline-none'>
            <Plus className='w-4 h-4 text-foreground' />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Adding new Currency to your List</DrawerTitle>
          </DrawerHeader>
          <Form {...form}>
            <form action='#' onSubmit={form.handleSubmit(submitFn)}>
              <div className='p-4'>
                <CurrencySelectorFormItem
                  name='name'
                  label='Name of the currency :'
                  control={form.control}
                  items={transformed}
                  onNext={pagination.nextPage}
                  onPrev={pagination.prevPage}
                  canNext={pagination.currentPage < pagination.totalPages}
                  canPrev={pagination.currentPage > 1}
                />
              </div>
              <DrawerFooter>
                <Button
                  className='cursor-pointer'
                  disabled={form.formState.isSubmitting}
                >
                  Save
                  {form.formState.isSubmitting ? (
                    <Loader2 className='w-2 h-2 animate-spin' />
                  ) : (
                    <Plus className='w-2 h-2' />
                  )}
                </Button>
                <DrawerClose asChild>
                  <Button variant={'outline'} className='cursor-pointer mt-3'>
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    );
  }
}
