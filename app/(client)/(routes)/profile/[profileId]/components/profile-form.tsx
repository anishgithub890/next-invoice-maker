'use client';

import * as React from 'react';
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { User } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { HeadingTheme } from '@/components/ui/heading-theme';

const formSchema = z.object({
  company: z.string().min(1, {
    message: 'company name is required',
  }),
  name: z.string().min(1, {
    message: 'name is required',
  }),
  email: z.string().min(1, {
    message: 'email name is required',
  }),
  role: z
    .string()
    .min(1, {
      message: 'default role is user.',
    })
    .optional(),
  password: z.string().min(1, {
    message: 'password is required.',
  }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileFormProps {
  initialData?: User | null;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Profile' : 'Create Profile';
  const description = initialData ? 'Edit a profile' : 'Add a new profile';
  const toastMessage = initialData ? 'Profile updated' : 'Profile created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      company: '',
      name: '',
      email: '',
      role: 'user',
      password: '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/register/${params?.profileId}`, data);
      } else {
        await axios.post(`/api/register`, data);
      }
      router.push('/profile');
      router.refresh();
      toast.success(toastMessage, {
        action: {
          label: 'Close',
          onClick: () => console.log('Undo'),
        },
      });
    } catch (error: any) {
      toast.error('Something went wrong.', {
        action: {
          label: 'Close',
          onClick: () => console.log('Undo'),
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <HeadingTheme title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-1 space-y-6 sm:space-y-0 gap-8">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Company Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      className="bg-zinc-300/50 shadow-sm dark:bg-zinc-600/50 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0 p-8 text-sm"
                      placeholder="Enter company name"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      className="bg-zinc-300/50 shadow-sm dark:bg-zinc-600/50 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0 p-8 text-sm"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      className="bg-zinc-300/50 shadow-sm dark:bg-zinc-600/50 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0 p-8 text-sm"
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Bcrypt Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      {...field}
                      className="bg-zinc-300/50 shadow-sm dark:bg-zinc-600/50 border-0 focus-visible:ring-0 text-black dark:text-white focus-visible:ring-offset-0 p-8 text-sm"
                      placeholder="change password"
                    />
                  </FormControl>
                  <FormMessage className="text-rose-600" />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
