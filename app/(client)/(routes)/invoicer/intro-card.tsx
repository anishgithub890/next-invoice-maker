'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Smartphone, Zap, Tablet, Sparkles } from 'lucide-react';

import ClientOnly from '@/components/client-only';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';
import { SafeUser } from '@/app/types';

const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible,
};

interface IntroCardProps {
  currentUser?: SafeUser | null;
}

const IntroCard: React.FC<IntroCardProps> = ({ currentUser }) => {
  const { onOpen } = useModal();

  return (
    <ClientOnly>
      <motion.article
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 1 } }}
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
      >
        <div className="p-4">
          <section className="relative py-24 space-y-8 max-w-4xl mx-auto text-center">
            <div className="absolute left-0 top-0 h-40 w-40 bg-pink-400 blur-[100px]"></div>
            <div className="absolute right-0 bottom-0 h-40 w-40 bg-blue-400 blur-[100px]"></div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible,
              }}
            >
              <h1 className="text-4xl lg:text-5xl text-slate-800 font-bold">
                Welcome to Invoice Maker V-0
              </h1>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-lg text-left rounded-tl-lg">
                        Feature
                      </th>
                      <th className="py-3 px-6 bg-blue-600 text-white font-semibold text-lg text-left rounded-tr-lg">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <td className="py-3 px-6 text-left flex items-center">
                        <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
                        Create Invoices
                      </td>
                      <td className="py-3 px-6 text-left">
                        Easily create invoices for yourself and your clients.
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-gray-200">
                      <td className="py-3 px-6 text-left flex items-center">
                        <Smartphone className="h-6 w-6 text-blue-600 mr-2" />
                        Accessibility
                      </td>
                      <td className="py-3 px-6 text-left">
                        Conveniently accessible from your mobile phone or PC.
                      </td>
                    </tr>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <td className="py-3 px-6 text-left flex items-center">
                        <Zap className="h-6 w-6 text-blue-600 mr-2" />
                        Performance
                      </td>
                      <td className="py-3 px-6 text-left">
                        Improved performance.
                      </td>
                    </tr>
                    <tr className="bg-white border-b border-gray-200">
                      <td className="py-3 px-6 text-left flex items-center">
                        <Tablet className="h-6 w-6 text-blue-600 mr-2" />
                        Responsiveness
                      </td>
                      <td className="py-3 px-6 text-left">
                        Better responsiveness on mobile devices.
                      </td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="py-3 px-6 text-left flex items-center">
                        <Sparkles className="h-6 w-6 text-blue-600 mr-2" />
                        UI Design
                      </td>
                      <td className="py-3 px-6 text-left">
                        Enhanced UI design by Developer.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="mt-8">
                {currentUser ? (
                  <Button
                    size="lg"
                    className="bg-sky-600 text-white py-2 px-4 rounded-full hover:bg-sky-700 transition duration-300"
                  >
                    Hi {currentUser.name}
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={() => onOpen('login')}
                    className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </motion.div>
          </section>
        </div>
      </motion.article>
    </ClientOnly>
  );
};

interface HomePageProps {
  currentUser?: SafeUser | null;
}

const HomePage: React.FC<HomePageProps> = ({ currentUser }) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <IntroCard currentUser={currentUser} />
      </main>
      <footer className="w-full py-5 bg-gray-800 text-white text-center">
        <p>&copy; 2024 Anish Invoice Maker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
