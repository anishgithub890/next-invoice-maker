'use client';

import { motion } from 'framer-motion';

import Container from '@/components/container';
import ClientOnly from '@/components/client-only';

const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible,
};

const IntroCard = () => {
  return (
    <>
      <ClientOnly>
        <Container>
          <motion.article
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 1 } }}
            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
          >
            <div className="p-4">
              <section className="relative py-32 space-y-8 max-w-4xl mx-auto text-center">
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
                  <p className="text-muted-foreground text-lg lg:text-xl">
                    Easily create invoices for yourself, your clients all at the
                    convenience of your mobile phone or PC. Invoice maker offers
                    improved performance, better responsiveness on mobile, and
                    better UI design by Developer.
                  </p>
                </motion.div>
              </section>
            </div>
          </motion.article>
        </Container>
      </ClientOnly>
    </>
  );
};

export default IntroCard;
