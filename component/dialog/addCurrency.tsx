// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { Loader2, Minus, Plus } from 'lucide-react';
import { ReactNode, useContext, useState } from 'react';
import { Button } from '@/component/ui/button';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { currencyListContext } from '../layout/page';
import useLocalStorageState from 'use-local-storage-state';
import { toast } from 'sonner';
import usePagination from '@/hook/usePagination';
import { currencyRateType } from '@/type/api';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/component/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/component/ui/tooltip';
import { Combobox } from '../ui/combobox';

// Defining form Schema
const formSchema = z.object({
  name: z.string(),
});

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting AddCurrency dialog as default
export default function AddCurrency(): ReactNode {
  // Defining hooks
  const currencys = useContext(currencyListContext);
  const [opened, setOpened] = useState<boolean>(false);

  const [savedItems, setSavedItems] = useLocalStorageState<string[]>(
    'savedItems',
    {
      defaultValue: [],
    },
  );

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Defining variables
  const currencysList = currencys ? Object.values(currencys) : [];
  const pagination = usePagination<currencyRateType>(currencysList, 10);
  const transformed = pagination.paginatedData.map((item) => ({
    label: item.code,
    value: item.value,
  }));

  // Defining submit handler
  const submitFn: SubmitHandler<formType> = async ({ name }) => {
    if (savedItems.includes(name)) {
      form.setError('name', {
        message: 'The item is added already !',
      });
    } else {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSavedItems([...savedItems, name]);
      setOpened(false);
      toast('The item is added !');
    }
  };

  // Returning JSX
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
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of the currency :</FormLabel>
                    <FormControl>
                      <div className='flex justify-between gap-3'>
                        <Combobox
                          items={transformed}
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
                                disabled={
                                  pagination.currentPage >=
                                  pagination.totalPages
                                }
                                onClick={pagination.nextPage}
                              >
                                <Plus className='w-2 h-2' />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Show more items in dropdown
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size='icon'
                                type='button'
                                className='cursor-pointer'
                                onClick={pagination.prevPage}
                                disabled={pagination.currentPage <= 1}
                              >
                                <Minus className='w-2 h-2' />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              Show less items in dropdown
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
}
