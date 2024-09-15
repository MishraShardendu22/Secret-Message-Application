'use client'
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false });

const faqs = [
    { question: "What is Anonymous Feedback?", answer: "Anonymous Feedback is a platform that allows users to give and receive feedback anonymously." },
    { question: "How does anonymity work on the platform?", answer: "Our platform uses advanced encryption techniques to ensure that feedback remains anonymous." },
    { question: "Is my personal information safe?", answer: "Yes, we take data security seriously and use industry-standard encryption." },
    { question: "How can I give feedback?", answer: "To give feedback, create an account, log in, and select the recipient. The platform anonymizes your feedback before sending it." },
    { question: "Can I reply to feedback I've received?", answer: "Yes, replies are sent through the system while maintaining anonymity." },
    { question: "What should I do if I receive abusive feedback?", answer: "Use the 'Report' button next to the feedback to alert our moderation team." },
    { question: "Can I delete my account?", answer: "Yes, you can delete your account from your account settings at any time." },
    { question: "Is there a mobile app?", answer: "We offer a responsive web app, and mobile apps for iOS and Android are in development." },
    { question: "Is the service free?", answer: "Yes, our basic services are free, but we also offer premium features for a fee." },
    { question: "How can I reset my password?", answer: "Click 'Forgot Password' on the login page, and you'll receive an email to reset your password." },
    { question: "Can I give feedback without an account?", answer: "No, you need to create an account to ensure accountability and improve the feedback experience." },
    { question: "How do I report a bug or issue?", answer: "You can report bugs through our 'Contact Us' page or by emailing support." },
    { question: "Can I give feedback to multiple users?", answer: "Yes, you can give feedback to multiple recipients by selecting them from the list." },
    { question: "Are there any restrictions on feedback content?", answer: "We have strict guidelines to ensure feedback remains constructive and respectful." },
    { question: "Can I see feedback I've sent?", answer: "Yes, your account dashboard allows you to view all feedback you've submitted." },
    { question: "How do I block abusive users?", answer: "You can block abusive users through your account settings." },
    { question: "Can I edit feedback I've already sent?", answer: "No, feedback cannot be edited once sent to maintain its integrity." },
    { question: "How can I invite others to use the platform?", answer: "You can invite others by sharing your referral link or using the 'Invite Friends' feature." },
    { question: "How do I know if my feedback was received?", answer: "You'll receive a notification once your feedback is delivered and read by the recipient." },
    { question: "What happens if I violate the terms of service?", answer: "Violations may result in warnings, account suspension, or permanent bans based on the severity." }
  ];
  
export default function Page() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => setOpenIndex(openIndex === index ? null : index);

  return (
    <MotionDiv 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 dark:from-purple-900 dark:to-indigo-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-extrabold text-purple-800 dark:text-purple-300 mb-6">Frequently Asked Questions</h1>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <MotionDiv
                key={index}
                initial={false}
                animate={{ backgroundColor: openIndex === index ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0)' }}
                className="border border-purple-200 dark:border-purple-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full px-4 py-4 text-left focus:outline-none"
                >
                  <span className="font-medium text-purple-800 dark:text-purple-300">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-purple-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-purple-500" />
                  )}
                </button>
                {openIndex === index && (
                  <MotionDiv
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 text-gray-600 dark:text-gray-300"
                  >
                    {faq.answer}
                  </MotionDiv>
                )}
              </MotionDiv>
            ))}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
