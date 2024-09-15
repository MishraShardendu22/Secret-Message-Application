'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { signInSchema } from '@/schemas/signInSchema';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }

    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 dark:from-purple-900 dark:to-purple-800"
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-purple-800 dark:text-purple-300 lg:text-5xl mb-6">
            Welcome Back
          </h1>
          <p className="mb-4 text-gray-600 dark:text-gray-300">Sign in to continue your secret conversations</p>
        </motion.div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-700 dark:text-purple-300">Email/Username</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={18} />
                    <Input {...field} className="pl-10 border-purple-300 focus:border-purple-500 focus:ring-purple-500" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-700 dark:text-purple-300">Password</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={18} />
                    <Input type="password" {...field} className="pl-10 border-purple-300 focus:border-purple-500 focus:ring-purple-500" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              className='w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-300 ease-in-out transform hover:scale-105'
              type="submit"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Sign In
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p className="text-gray-600 dark:text-gray-300">
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition duration-300 ease-in-out">
              Sign up
            </Link>
          </p>
        </div>
        {/* <div className="mt-6">
          <Button 
            onClick={() => signIn('google')}
            className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
            aria-label="Sign in with Google"
          >
            <Google className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </div> */}
      </div>
    </motion.div>
  );
}
