'use client';

import * as React from 'react';
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { HeadingTheme } from '@/components/ui/heading-theme';
import { AlertModal } from '@/components/modals/alert-modal';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'name is required',
  }),
  email: z.string().min(1, {
    message: 'email name is required',
  }),
  role: z
    .string()
    .min(1, {
      message: 'default role [user].',
    })
    .optional(),
  password: z.string().min(1, {
    message: 'password is required.',
  }),
});

type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  initialData?: User | null;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit user' : 'Create user';
  const description = initialData ? 'Edit a user' : 'Add a new user';
  const toastMessage = initialData ? 'User updated' : 'User created';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      email: '',
      role: '',
      password: '',
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/register/${params?.adminuserId}`, data);
      } else {
        await axios.post(`/api/register`, data);
      }
      router.refresh();
      router.push(`/adminusers`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/register/${params?.adminuserId}`);
      router.refresh();
      router.push(`/adminusers`);
      toast.success('User deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all users.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <HeadingTheme title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 space-y-6 sm:space-y-0 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="name"
                      placeholder="user name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="email"
                      placeholder="user email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="select user roles" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles</SelectLabel>
                        <SelectItem value="user">user</SelectItem>
                        <SelectItem value="admin">admin</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Password Is Bcrypt</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="password"
                      placeholder="user password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
