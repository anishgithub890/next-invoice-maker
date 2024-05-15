'use client';

import * as z from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';

import { useModal } from '@/hooks/use-modal-store';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import CustomeButton from '@/components/custome-button';

const formSchema = z.object({
  email: z.string().min(1, {
    message: 'Email is required.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
});

export const LoginModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const params = useParams();
  const [issloadingg, setIsLoading] = useState(false);

  const { onOpen } = useModal();

  const isModalOpen = isOpen && type === 'login';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in', {
          action: {
            label: 'Close',
            onClick: () => console.log('Undo'),
          },
        });
        router.push('/home');
        router.refresh();

        onClose();
      }

      if (callback?.error) {
        toast.error(callback.error, {
          action: {
            label: 'Close',
            onClick: () => console.log('Undo'),
          },
        });
      }
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold pb-2">
            Login
          </DialogTitle>
          <Separator />
          <DialogTitle className="pt-4">Welcome Back</DialogTitle>
          <DialogDescription>Login to your account!</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        type="email"
                        className="bg-zinc-300/50 shadow-sm dark:bg-zinc-200/50 border-0 focus-visible:ring-0 text-black dark:text-zinc-900 focus-visible:ring-offset-0 p-6 text-sm"
                        placeholder="Enter your email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        type="password"
                        className="bg-zinc-300/50 shadow-sm dark:bg-zinc-200/50 border-0 focus-visible:ring-0 text-black dark:text-zinc-900 focus-visible:ring-offset-0 p-6 text-sm"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <CustomeButton label="Continue" disabled={isLoading} />
              </DialogFooter>
              <Separator />
              <div className="flex flex-col gap-4 mt-3">
                <div
                  className="
                   text-neutral-500 text-center mt-4 font-light pb-6"
                >
                  <p className="dark:text-zinc-900">
                    First time using Invoicer?
                    <span
                      onClick={() => onOpen('createUser')}
                      className="
                      text-zinc-900
                      cursor-pointer
                      hover:underline
                      dark:text-zinc-900
                    "
                    >
                      {' '}
                      Create an account
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
