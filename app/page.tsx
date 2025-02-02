"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Brain, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const cloudY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main 
      ref={containerRef} 
      className="min-h-screen bg-[#2D1B69] overflow-hidden"
    >
      {/* Navigation */}
      <nav className="fixed w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-2xl">SkoolOfCode</div>
          <div className="flex gap-6">
            <Link href="/" className="text-white hover:text-purple-300">Home</Link>
            <Link href="/lessons" className="text-white hover:text-purple-300">Lessons</Link>
            <Link href="/playground" className="text-white hover:text-purple-300">Playground</Link>
            <Button className="bg-purple-500 hover:bg-purple-600">Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
            SkoolOfCode
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-8">
            Start your coding journey today with our interactive learning platform designed especially for kids!
          </p>
          <Button size="lg" className="bg-purple-500 hover:bg-purple-600">
            Start Learning
          </Button>
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src="/images/hero.png"
            alt="Kid Coding"
            width={500}
            height={500}
            className="object-contain"
          />
        </motion.div>
      </div>

      {/* Cloud Section with Stats */}
      <motion.div 
        style={{ y: cloudY }}
        className="relative bg-white rounded-t-[100px] min-h-screen"
      >
        <div className="max-w-6xl mx-auto px-4 py-20">
          <motion.div
            ref={statsRef}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={statsVariants}
            transition={{ duration: 0.6, staggerChildren: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          >
            <motion.div variants={statsVariants} className="space-y-2">
              <h3 className="text-5xl font-bold text-purple-600">97%</h3>
              <p className="text-gray-600">Success Rate</p>
            </motion.div>
            <motion.div variants={statsVariants} className="space-y-2">
              <h3 className="text-5xl font-bold text-purple-600">10K+</h3>
              <p className="text-gray-600">Happy Students</p>
            </motion.div>
            <motion.div variants={statsVariants} className="space-y-2">
              <h3 className="text-5xl font-bold text-purple-600">500+</h3>
              <p className="text-gray-600">Interactive Lessons</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20 text-center"
          >
            <h2 className="text-4xl font-bold text-purple-600 mb-6">
              Why Choose SkoolOfCode?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 rounded-lg bg-purple-50">
                <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Learning</h3>
                <p className="text-gray-600">AI-powered personalized learning path for every student</p>
              </div>
              <div className="p-6 rounded-lg bg-purple-50">
                <Code2 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Interactive Coding</h3>
                <p className="text-gray-600">Learn by doing with our interactive code playground</p>
              </div>
              <div className="p-6 rounded-lg bg-purple-50">
                <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fun Projects</h3>
                <p className="text-gray-600">Build exciting projects while learning to code</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}