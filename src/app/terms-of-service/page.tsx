'use client'
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-extrabold text-purple-800 dark:text-purple-300 mb-6">Terms of Service</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-400">Last updated: September 15, 2024</p>

            <div className="border-t border-gray-200 dark:border-gray-700 mt-6"></div>

            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mt-8">1. Acceptance of Terms</h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">By accessing or using Anonymous Feedback, you agree to be bound by these Terms of Service.</p>

            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mt-8">2. Description of Service</h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">Anonymous Feedback provides a platform for users to give and receive anonymous feedback.</p>

            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mt-8">3. User Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Ensuring that your use of the service complies with all applicable laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mt-8">4. Prohibited Conduct</h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Use the service for any unlawful purpose</li>
              <li>Harass, abuse, or harm another person</li>
              <li>Impersonate or misrepresent your affiliation with any person or entity</li>
              <li>Interfere with or disrupt the service or servers or networks connected to the service</li>
            </ul>

            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mt-8">5. Intellectual Property Rights</h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              The service and its original content, features, and functionality are owned by Anonymous Feedback and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>

            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mt-8">6. Termination</h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>

            <h2 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-300 mt-8">7. Changes to Terms</h2>
            <p className="leading-relaxed text-gray-600 dark:text-gray-400">
              We reserve the right to modify or replace these Terms at any time. It is your responsibility to check the Terms periodically for changes.
            </p>

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
