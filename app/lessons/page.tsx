"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Notebook as Robot, MessageSquare, Calculator, Database, GitFork, Repeat2, Package, Gamepad2, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";


export const lessons = [
  {
    id: 1,
    title: "Welcome to Coding in Python!",
    description: "An introduction to Python and why coding is fun!",
    icon: <BookOpen className="w-6 h-6" />,
    emoji: "🎉",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Meet Python: Your New Coding Buddy!",
    description: "Learn how to write your first Python program!",
    icon: <Robot className="w-6 h-6" />,
    emoji: "🤖",
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Let's Talk to the Computer!",
    description: "Understanding print() and user input!",
    icon: <MessageSquare className="w-6 h-6" />,
    emoji: "🗣️",
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Magic Numbers and Super Math!",
    description: "Play with numbers, addition, subtraction, and more!",
    icon: <Calculator className="w-6 h-6" />,
    emoji: "✨",
    color: "bg-pink-500"
  },
  {
    id: 5,
    title: "Treasure Chest of Variables!",
    description: "Learn about storing information with variables!",
    icon: <Database className="w-6 h-6" />,
    emoji: "💰",
    color: "bg-yellow-500"
  },
  {
    id: 6,
    title: "If-Else: The Secret Pathways!",
    description: "Make decisions in Python with if statements!",
    icon: <GitFork className="w-6 h-6" />,
    emoji: "🚦",
    color: "bg-orange-500"
  },
  {
    id: 7,
    title: "Loops: The Power of Repeat!",
    description: "Discover for and while loops to repeat fun tasks!",
    icon: <Repeat2 className="w-6 h-6" />,
    emoji: "🔄",
    color: "bg-teal-500"
  },
  {
    id: 8,
    title: "Lists: Your Super Storage Box!",
    description: "Learn how to store multiple things in a list!",
    icon: <Package className="w-6 h-6" />,
    emoji: "📦",
    color: "bg-indigo-500"
  },
  {
    id: 9,
    title: "Let's Build a Mini Game!",
    description: "Use everything you've learned to make a simple Python game!",
    icon: <Gamepad2 className="w-6 h-6" />,
    emoji: "🎮",
    color: "bg-red-500"
  },
  {
    id: 10,
    title: "You're a Python Pro Now!",
    description: "Wrap-up, review, and where to go next!",
    icon: <Trophy className="w-6 h-6" />,
    emoji: "🎓",
    color: "bg-emerald-500"
  }
];

export default function LessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState(lessons[0]);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Virtual Classroom Header */}
      <div className="relative bg-[#2D1B69] text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold mb-4"
          >
            Virtual Classroom
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-purple-200 mb-8"
          >
            Our Virtual Classroom is designed to bring the joy of learning right to your home.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              size="lg" 
              className="bg-purple-500 hover:bg-purple-600"
              onClick={() => router.push('/ai-tutor')}
            >
             Start Learning
            </Button>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#fff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Selected Lesson Preview */}
        <motion.div
          layoutId={`lesson-${selectedLesson.id}`}
          className="mb-12"
        >
          <Card className="p-8 bg-white shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-full ${selectedLesson.color} text-white`}>
                {selectedLesson.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedLesson.title} {selectedLesson.emoji}
                </h2>
                <p className="text-gray-600">{selectedLesson.description}</p>
              </div>
            </div>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => router.push('/bot')}
            >
              Start Learning
            </Button>
          </Card>
        </motion.div>

        {/* Lesson Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedLesson.id === lesson.id ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => setSelectedLesson(lesson)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${lesson.color} text-white`}>
                    {lesson.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {lesson.title} {lesson.emoji}
                    </h3>
                    <p className="text-sm text-gray-600">{lesson.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}