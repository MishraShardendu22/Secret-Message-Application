'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, MessageSquare, Send, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';
import { motion } from 'framer-motion';

const getRandomMessages = (questions: { question: string }[], count: number) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((q) => q.question);
};

const questions = [
  { question: "What's a hobby you've recently started?" },
  { question: "If you could live anywhere in the world, where would it be?" },
  { question: "What's the most interesting book you've read this year?" },
  { question: "What's a skill you wish you could master instantly?" },
  { question: "If you could time travel, where and when would you go?" },
  { question: "What’s a simple thing that makes you happy?" },
  { question: "What’s your favorite way to spend a weekend?" },
  { question: "If you could learn a new language, which would it be?" },
  { question: "What's the best piece of advice you've ever received?" },
  { question: "If you could switch lives with someone for a day, who would it be?" },
  { question: "What’s a movie or show you could watch over and over again?" },
  { question: "If you could only eat one food for the rest of your life, what would it be?" },
  { question: "What's the most unusual talent you have?" },
  { question: "If you could have dinner with any historical figure, who would it be?" },
  { question: "What’s your favorite childhood memory?" },
  { question: "What’s something you’ve always wanted to try?" },
  { question: "What’s your dream vacation destination?" },
  { question: "What’s a recent goal you’ve achieved?" },
  { question: "If you could meet any fictional character, who would it be?" },
  { question: "What’s a hobby you’ve always wanted to pick up but never did?" },
  { question: "What’s a topic you could talk about for hours?" },
  { question: "If you could magically become an expert in one field, what would it be?" },
  { question: "What’s the last song you had stuck in your head?" },
  { question: "If you had a personal theme song, what would it be?" },
  { question: "What’s your favorite season and why?" },
  { question: "If you could change one thing about the world, what would it be?" },
  { question: "What’s something you’re passionate about?" },
  { question: "What’s a question you wish more people would ask you?" },
  { question: "If you could have any animal as a pet, what would it be?" },
  { question: "What’s a food you disliked as a child but love now?" },
  { question: "What’s your favorite way to unwind after a long day?" },
  { question: "If you could learn a musical instrument, which one would you choose?" },
  { question: "What’s your favorite way to exercise?" },
  { question: "If you could invent something, what would it be?" },
  { question: "What’s a tradition you love?" },
  { question: "If you could design your dream home, what would it look like?" },
  { question: "What’s your favorite type of weather?" },
  { question: "What’s a skill you think everyone should learn?" },
  { question: "If you could live in any time period, which would you choose?" },
  { question: "What’s your favorite holiday?" },
  { question: "What’s something you’re looking forward to?" },
  { question: "If you could have any superpower, what would it be?" },
  { question: "What’s something you do to stay positive?" },
  { question: "What’s a subject you wish you learned more about in school?" },
  { question: "What’s a book or movie that had a big impact on you?" },
  { question: "If you could host a talk show, who would be your first guest?" },
  { question: "What’s a job you’d be terrible at?" },
  { question: "What’s a job you think you’d excel at?" },
  { question: "If you could instantly master any sport, what would it be?" },
  { question: "What’s the best meal you’ve ever had?" },
  { question: "If you could travel anywhere right now, where would you go?" },
  { question: "What’s something you wish you did more often?" },
  { question: "If you could switch jobs with someone for a week, who would it be?" },
  { question: "What’s your favorite form of creative expression?" },
  { question: "What’s your favorite childhood game?" },
  { question: "If you could write a book, what would it be about?" },
  { question: "What’s a new hobby you’d like to start?" },
  { question: "What’s the best compliment you’ve ever received?" },
  { question: "If you could only wear one color for the rest of your life, what would it be?" },
  { question: "What’s something that always makes you laugh?" },
  { question: "What’s your go-to comfort food?" },
  { question: "If you could learn the answer to any question in the universe, what would it be?" },
  { question: "What’s a place you’ve always wanted to visit?" },
  { question: "What’s something you enjoy doing that others might find odd?" },
  { question: "If you could be any age for a week, what age would you choose?" },
  { question: "What’s a challenge you’ve overcome recently?" },
  { question: "What’s something you wish you were better at?" },
  { question: "What’s your favorite thing to do on a rainy day?" },
  { question: "If you could see any concert, past or present, what would it be?" },
  { question: "What’s something you’ve learned recently?" },
  { question: "If you could redo any moment in your life, what would it be?" },
  { question: "What’s your favorite type of cuisine?" },
  { question: "What’s the last thing that made you smile?" },
  { question: "What’s something you’ve done that you’re proud of?" },
  { question: "If you could spend a day with any celebrity, who would it be?" },
  { question: "What’s a movie that always cheers you up?" },
  { question: "What’s the best gift you’ve ever received?" },
  { question: "If you could live in any fictional world, where would you live?" },
  { question: "What’s a piece of technology you wish existed?" },
  { question: "What’s a quote or saying that you live by?" },
  { question: "What’s your favorite way to relax?" },
  { question: "What’s a habit you’re trying to break?" },
  { question: "If you could have dinner with any living person, who would it be?" },
  { question: "What’s a skill you admire in others?" },
  { question: "What’s something you wish more people understood?" },
  { question: "What’s the most fun you’ve had recently?" },
  { question: "If you could only listen to one song for the rest of your life, what would it be?" },
  { question: "What’s something you’re really good at?" },
  { question: "What’s your favorite type of art?" },
  { question: "What’s the most adventurous thing you’ve ever done?" },
  { question: "What’s a product you couldn’t live without?" },
  { question: "If you could learn about any topic in an instant, what would it be?" },
  { question: "What’s the best advice you’ve ever given someone?" },
  { question: "What’s your favorite outdoor activity?" },
  { question: "If you could be famous for one thing, what would it be?" },
  { question: 'What’s something that always inspires you?' },
  { question: 'What’s a language you’d love to speak fluently?' },
  { question: "What's your favorite movie?" },
  { question: 'Do you have any pets?' },
  { question: "What's your dream job?" },
];

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('content');
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false); // New state for skeleton

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = () => {
    setLoadingSuggestions(true); // Start loading
    setTimeout(() => {
      const randomMessages = getRandomMessages(questions, 3);
      setSuggestedMessages(randomMessages);
      setLoadingSuggestions(false); // Stop loading after messages are fetched
    }, 1500); // Simulate a delay to fetch suggestions
  };


  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto my-8 p-6 from-purple-900 to-indigo-900 shadow-lg rounded-lg max-w-3xl"
    >
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-800">
        Send Anonymous Message
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-medium text-purple-700">To @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none border-2 border-purple-300 rounded-md focus:border-purple-500 focus:ring-purple-500 min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isLoading || !messageContent}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send It
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>

      <div className="space-y-6 my-12">
        <div className="text-center">
          <Button
            onClick={fetchSuggestedMessages}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            disabled={isLoading}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            Suggest Messages
          </Button>
          <p className="text-purple-600 mt-2">Click on any message below to select it.</p>
        </div>
        <Card className="bg-white shadow-md rounded-lg overflow-hidden">
          <CardHeader className="p-4 bg-purple-100 border-b border-purple-200">
            <h3 className="text-xl font-semibold text-purple-800">Suggested Messages</h3>
          </CardHeader>
          <CardContent className="p-4 flex flex-col space-y-4">
            {loadingSuggestions ? (
              <>
                <Skeleton className="h-16 w-full mb-2" />
                <Skeleton className="h-16 w-full mb-2" />
                <Skeleton className="h-16 w-full mb-2" />
              </>
            ) : suggestedMessages.length > 0 ? (
              suggestedMessages.map((message, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 border-2 border-purple-200 rounded-lg hover:bg-purple-100 text-purple-700 text-left transition duration-300 ease-in-out"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </motion.button>
              ))
            ) : (
              <p className="text-purple-500 text-center">No messages yet. Click `Suggest Messages` to get some ideas!</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Separator className="my-8 bg-purple-200" />
      <div className="text-center">
        <div className="mb-4 text-xl font-semibold text-purple-700">Get Your Own Message Board</div>
        <Link href={'/sign-up'}>
          <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            <UserPlus className="mr-2 h-5 w-5" />
            Create Your Account
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
