"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import IconAuth from "./icons/IconAuth";
import IconPlan from "./icons/IconPlan";
import IconChat from "./icons/IconChat";
import IconTrack from "./icons/IconTrack";
import IconAnalytics from "./icons/IconAnalytics";
import IconAdmin from "./icons/IconAdmin";

type Feature = {
  id: string;
  title: string;
  description: string;
  preview?: React.ReactNode;
  icon: React.ReactNode;
};

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      type: "spring" as const, 
      stiffness: 160, 
      damping: 20 
    } 
  },
};

const hover = {
  whileHover: { y: -6, scale: 1.02, transition: { type: "spring" as const, stiffness: 300 } },
};

export default function Features() {
  const features: Feature[] = [
    {
      id: "auth",
      title: "User Authentication",
      description: "Create and secure your NutriFit account with email, social sign-in, and secure sessions.",
      icon: <IconAuth className="w-6 h-6" />,
      preview: (
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 text-xs text-slate-500">Signed in as</div>
            <div className="rounded-full px-3 py-1 bg-white/80 text-sm font-medium border">ameerhamzahd</div>
          </div>
        </div>
      ),
    },
    {
      id: "plans",
      title: "Personalized Meal & Workout Plans",
      description: "AI-generated plans based on fitness level, dietary preferences, and goals. Adjust anytime.",
      icon: <IconPlan className="w-6 h-6" />,
      preview: (
        <div className="mt-4 text-sm">
          <div className="flex items-center justify-between">
            <div className="text-slate-700 font-medium">Today • Cardio + Strength</div>
            <div className="text-xs text-slate-500">Calories: 1750</div>
          </div>
          <ul className="mt-2 text-xs text-slate-500 space-y-1">
            <li>• Oatmeal + berries (350 cal)</li>
            <li>• HIIT 25 min</li>
            <li>• Grilled chicken salad (450 cal)</li>
          </ul>
        </div>
      ),
    },
    {
      id: "chatbot",
      title: "AI Health Coach Chatbot",
      description: "Ask the AI for nutrition tips, workout modifications, or motivation at any time.",
      icon: <IconChat className="w-6 h-6" />,
      preview: (
        <div className="mt-4">
          <div className="bg-white/90 rounded-xl p-2 border text-sm text-slate-700">
            <div className="text-xs text-slate-400 mb-1">AI Coach</div>
            <div className="font-medium">Try: {`"`}Short workout for core strength?{`"`}</div>
          </div>
        </div>
      ),
    },
    {
      id: "tracking",
      title: "Water & Workout Tracking",
      description: "Log workouts, water intake, and recovery to keep progress consistent.",
      icon: <IconTrack className="w-6 h-6" />,
      preview: (
        <div className="mt-4 flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center border">
              <div className="text-sm font-semibold text-[#FF6600]">68%</div>
            </div>
            <div className="text-xs text-slate-500 mt-1">Water</div>
          </div>
          <div className="flex-1">
            <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-2 bg-[#FF6600] w-[65%]" />
            </div>
            <div className="text-xs text-slate-500 mt-1">Workout Goal • 2/3 sessions</div>
          </div>
        </div>
      ),
    },
    {
      id: "analytics",
      title: "Progress Analytics & Reports",
      description: "Weekly and monthly analytics to visualize progress, calorie trends and performance.",
      icon: <IconAnalytics className="w-6 h-6" />,
      preview: (
        <div className="mt-4 flex items-end gap-2">
          <div className="w-5 h-8 bg-[#BFFF00]/25 rounded-t" />
          <div className="w-5 h-16 bg-[#BFFF00] rounded-t" />
          <div className="w-5 h-12 bg-[#BFFF00]/50 rounded-t" />
          <div className="w-5 h-20 bg-[#BFFF00]/75 rounded-t" />
        </div>
      ),
    },
    {
      id: "admin",
      title: "Admin Dashboard",
      description: "Monitor users, subscription tiers, and system health with admin tools.",
      icon: <IconAdmin className="w-6 h-6" />,
      preview: (
        <div className="mt-4">
          <div className="text-xs text-slate-500">Active users</div>
          <div className="mt-3 flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/90 border">
              <Image 
                src="/images/Features/image-02.jpg" 
                alt="User avatar"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/90 border">
              <Image 
                src="/images/Features/image-01.jpg" 
                alt="User avatar"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/90 border">
              <Image 
                src="/images/Features/image-03.jpg" 
                alt="User avatar"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="text-sm font-medium text-slate-700">+ 1,254</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-16 px-6">
      <div className="md:max-w-[92%] mx-auto">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-6xl font-extrabold text-slate-900">Achieve your Health Objectives in 1-2-3</h2>
            <p className="mt-8 text-slate-500 max-w-3xl mx-auto text-base lg:text-xl">NutriFit blends AI-planning, tracking, and analytics to help you stay consistent and progress faster.</p>
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={container}>
            {features.map((f) => (
              <motion.article
                key={f.id}
                className="relative rounded-2xl p-6 bg-white/60 backdrop-blur-sm border border-slate-100 shadow-sm"
                variants={cardVariant}
                {...hover}
                role="article"
                aria-labelledby={`feature-${f.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-[#FF6600]`} style={{ background: undefined }}>
                    <div className="w-6 h-6 text-current">{f.icon}</div>
                  </div>
                  <div>
                    <h3 id={`feature-${f.id}`} className="text-lg font-semibold text-slate-900">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{f.description}</p>
                    {f.preview}
                  </div>
                </div>

                {/* subtle decorative pattern */}
                <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/5 blur-xl pointer-events-none" />
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}