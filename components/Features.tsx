"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Features data
const featuresData = [
  {
    id: "01",
    title: "AI-Powered Meals",
    description:
      "AI-generated meal plans tailored to your dietary preferences, goals, and nutritional needs.",
    image: "https://res.cloudinary.com/dgt4ygjhp/image/upload/v1769024121/AI_Powered_Meals_ykimgw.jpg",
  },
  {
    id: "02",
    title: "Smart Workouts",
    description:
      "Personalized workout plans designed by AI based on your fitness level and available equipment.",
    image: "https://res.cloudinary.com/dgt4ygjhp/image/upload/v1769024078/Smart_Workouts_ekc3un.jpg",
  },
  {
    id: "03",
    title: "AI Coach Assistant",
    description:
      "A 24/7 AI health coach offering guidance, motivation, and personalized support anytime.",
    image: "https://res.cloudinary.com/dgt4ygjhp/image/upload/v1769024120/AI_Coach_Assistant_femku1.jpg",
  },
  {
    id: "04",
    title: "Activity Tracking",
    description:
      "Track workouts, meals, hydration, and recovery to stay consistent and improve daily.",
    image: "https://res.cloudinary.com/dgt4ygjhp/image/upload/v1769024127/Activity_Tracking_tbbjtg.jpg",
  },
  {
    id: "05",
    title: "Progress Analytics",
    description:
      "Clear performance insights and progress analytics based on your consistency and results.",
    image: "https://res.cloudinary.com/dgt4ygjhp/image/upload/v1769024079/Progress_Analytics_qnu4ny.jpg",
  },
];


const Features = () => {
  return (
    <section id="features" className="pt-12 lg:px-0 px-6 md:w-11/12 mx-auto">
      <div className="mx-auto">
        {/* Top Badge */}
        <motion.div
          className="flex justify-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-[#1A232D] text-xs md:text-sm text-[#EEEEEE] font-medium px-4 py-1.5 rounded-[8px] mb-4">
            Features
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight mb-4">
            <div className="text-[#FF6600]">Smart Features</div>
            <div className="text-[#0A0A0A]">Smarter Results</div>
          </h2>
          <p className="text-[#707070] md:text-2xl mx-auto">
            NutriFit blends AI-planning, tracking, and analytics to help you{" "}
            <br className="hidden md:block" />
            stay consistent and progress faster.
          </p>
        </motion.div>

        {/* Feature Cards with Swiper */}
        <div className=" mt-8">
          <Swiper
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1.30 }, // Mobile
              640: { slidesPerView: 2.1 }, // Small tablet
              1024: { slidesPerView: 3.35 }, // Laptop
            }}
          >
            {featuresData.map((feature, index) => (
              <SwiperSlide key={feature.id} className="h-full">
                <motion.div
                  className="relative h-80 md:h-96 rounded-[50px] overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 * index }}
                >
                  {/* Background Image */}
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/50 to-black/30"></div>

                  {/* Content */}
                  <div className="absolute inset-0 z-30 flex h-full flex-col justify-between p-6">
                    {/* Number */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-4xl font-bold text-white"
                    >
                      {feature.id}
                    </motion.div>

                    {/* Bottom Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      className="space-y-2"
                    >
                      <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-200">{feature.description}</p>
                    </motion.div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Features;