"use client";

import { motion } from 'framer-motion';

export default function page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-6 sm:px-8 lg:px-16"
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-300 mb-8">
            Privacy Policy
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: <span className="font-semibold">September 15, 2024</span>
            </p>
            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mt-8">
              1. Introduction
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              Welcome to Anonymous Feedback. We respect your privacy and are committed to protecting your personal data.
            </p>

            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mt-8">
              2. Data We Collect
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              We collect and process the following types of personal data:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Account information (e.g., username, email address)</li>
              <li>Feedback content</li>
              <li>Usage data and analytics</li>
            </ul>

            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mt-8">
              3. How We Use Your Data
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              We use your personal data to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Provide and maintain our service</li>
              <li>Notify you about changes to our service</li>
              <li>Provide customer support</li>
              <li>Gather analysis or valuable information to improve our service</li>
            </ul>

            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mt-8">
              4. Data Security
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>

            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mt-8">
              5. Your Rights
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              You have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Access your personal data</li>
              <li>Rectify inaccurate personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Withdraw consent</li>
            </ul>

            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mt-8">
              6. Contact Us
            </h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                If you have any questions about this Privacy Policy, please contact us at
                <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=shardendumishra01@gmail.com&su=Privacy Inquiry&body=Hi,"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-700 font-extrabold dark:text-indigo-400 underline ml-1"
                >
                    shardendumishra01@gmail.com
                </a>.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
