import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Banner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary-500 via-primary-600 to-accent-600 shadow-2xl">
      {/* Enhanced animated background pattern */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.15%22%3E%3Cpath%20d%3D%22M0%200h20L10%2010zm10%2010L20%2020H0z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"
      />

      {/* Enhanced glowing orbs with more dynamic animations */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [-20, 0, -20],
          y: [-20, 0, -20],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/30 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [20, 0, 20],
          y: [-20, 0, -20],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -bottom-32 right-20 h-64 w-64 rounded-full bg-accent-400/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          {/* Enhanced sparkles icon with more dynamic animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="relative"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-4 rounded-full bg-white/20 blur-md"
            />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          {/* Enhanced text content with more dramatic animations */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-bold tracking-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl"
            >
              Wellness is Golden
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mx-auto max-w-2xl text-xl text-white/90 drop-shadow-lg md:text-2xl lg:text-3xl"
            >
              Discover nature's healing treasures through ancient wisdom and modern science
            </motion.p>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/70 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/70 to-transparent" />
    </div>
  );
}