// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/component/ui/dialog';
import { Plus, Send } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Button } from '@/component/ui/button';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
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

// Defining form Schema
const formSchema = z.object({
  name: z.string(),
});

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting AddCurrency dialog as default
export default function AddCurrency(): ReactNode {
  // Defining hooks
  const [opened, setOpened] = useState<boolean>(true);
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Defining submit handler
  const submitFn: SubmitHandler<formType> = async ({ name }) => {
    console.log(name);
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select currency' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='m@example.com'>
                          m@example.com
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
              <Button className='cursor-pointer' size={'icon'}>
                <Send className='w-4 h-4' />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
