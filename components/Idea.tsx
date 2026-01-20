"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface Exercise {
    exerciseId: string;
    name: string;
    gifUrl: string;
    targetMuscles?: string[];
    bodyParts?: string[];
    equipments?: string[];
    secondaryMuscles?: string[];
    instructions?: string[];
}

export default function NutrifitIdeaSection() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMuscle, setSelectedMuscle] = useState("All");
    const [sortOrder, setSortOrder] = useState("a-z");
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Fetch exercises from API
    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch(
                    "https://www.ascendapi.com/api/v1/exercises?offset=0&limit=100&search=&sortBy=name&sortOrder=desc"
                );
                const result = await response.json();
                if (result.success && result.data) {
                    setExercises(result.data);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching exercises:", error);
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);

    // Extract unique target muscles
    const targetMuscles = ["All", ...new Set(exercises.flatMap((ex: Exercise) => ex.targetMuscles || []))];

    // Filter exercises by selected muscle
    const filteredExercises =
        selectedMuscle === "All"
            ? exercises
            : exercises.filter((ex: Exercise) =>
                ex.targetMuscles && ex.targetMuscles.includes(selectedMuscle)
            );

    // Sort exercises
    const sortedExercises = [...filteredExercises].sort((a: Exercise, b: Exercise) =>
        sortOrder === "a-z"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
    );

    // Take only 5 exercises per muscle group
    const displayExercises = sortedExercises.slice(0, 5);

    return (
        <motion.section
            id="idea"
            className="text-white my-5 pt-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="w-11/12 mx-auto rounded-[50px] bg-[#1A232D] py-12 sm:p-8 lg:p-12">
                {/* Header */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-10 px-4 text-center md:text-left"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col items-center md:items-start">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-full mb-2 mx-auto md:mx-0 justify-center md:justify-start">
                            <span className="inline-block bg-white text-xs md:text-sm text-[#1A232D] font-medium px-4 py-1.5 rounded-[8px] mb-4">
                                Idea
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
                            <span className="text-[#FF6600]">Premium Exercises for</span>
                            <br />
                            <span className="text-white">Fitness Passionate</span>
                        </h1>
                    </div>
                    <p className="text-sm sm:text-lg lg:text-2xl max-w-xl mt-4 md:mt-0 mx-auto md:mx-0 md:text-right">
                        Discover targeted exercises to build strength and achieve your fitness goals.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 px-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <Select value={selectedMuscle} onValueChange={setSelectedMuscle}>
                        <SelectTrigger className="w-full sm:w-45 bg-white text-black rounded-lg">
                            <SelectValue placeholder="Select target muscle" />
                        </SelectTrigger>
                        <SelectContent>
                            {targetMuscles.map((muscle: string) => (
                                <SelectItem key={muscle} value={muscle}>
                                    {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-full sm:w-45 bg-white text-black rounded-lg">
                            <SelectValue placeholder="Sort by name" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="a-z">Name A to Z</SelectItem>
                            <SelectItem value="z-a">Name Z to A</SelectItem>
                        </SelectContent>
                    </Select>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center text-gray-400 py-12">
                        Loading exercises...
                    </div>
                )}

                {/* Exercise Cards Horizontal Scroll */}
                {!loading && displayExercises.length > 0 && (
                    <motion.div
                        className="relative px-4 my-6 overflow-hidden"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7 }}
                    >
                        <motion.div
                            ref={scrollRef}
                            className="flex gap-4 sm:gap-6 cursor-grab active:cursor-grabbing"
                            drag="x"
                            dragConstraints={{ left: -((displayExercises.length * 280) - 800), right: 0 }}
                        >
                            {displayExercises.map((exercise: Exercise) => (
                                <motion.div
                                    key={exercise.exerciseId}
                                    onClick={() => setSelectedExercise(exercise)}
                                    className="shrink-0 w-65 sm:w-70 md:w-75 px-2 bg-white text-black rounded-2xl p-4 sm:p-6 transition-transform cursor-pointer"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="relative w-full h-55 mb-4 rounded-xl overflow-hidden">
                                        <img
                                            src={exercise.gifUrl}
                                            alt={exercise.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>

                                    <h3 className="font-semibold text-base sm:text-lg line-clamp-2 capitalize">
                                        {exercise.name}
                                    </h3>

                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {exercise.targetMuscles?.slice(0, 2).map((muscle: string, idx: number) => (
                                            <span
                                                key={idx}
                                                className="text-xs bg-orange-100 text-[#FF6600] px-2 py-1 rounded-full capitalize"
                                            >
                                                {muscle}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}

                {!loading && displayExercises.length === 0 && (
                    <div className="text-center text-gray-400 py-12">
                        No exercises found for this muscle group.
                    </div>
                )}
            </div>

            {/* Exercise Detail Modal */}
            <AnimatePresence>
                {selectedExercise && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedExercise(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
                                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                                    {selectedExercise.name}
                                </h2>
                                <button
                                    onClick={() => setSelectedExercise(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>

                            {/* Modal Content - 2 Columns */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                                {/* Left Column - Exercise Details */}
                                <div className="space-y-4">
                                    {/* Target Muscles */}
                                    {selectedExercise.targetMuscles && selectedExercise.targetMuscles.length > 0 && (
                                        <div className="flex items-start gap-3">
                                            <h3 className="font-semibold text-base text-gray-900 min-w-[140px]">
                                                Target Muscles:
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedExercise.targetMuscles.map((muscle: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-orange-100 text-[#FF6600] px-3 py-1 rounded-full text-sm font-medium capitalize"
                                                    >
                                                        {muscle}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Body Parts */}
                                    {selectedExercise.bodyParts && selectedExercise.bodyParts.length > 0 && (
                                        <div className="flex items-start gap-3">
                                            <h3 className="font-semibold text-base text-gray-900 min-w-[140px]">
                                                Body Parts:
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedExercise.bodyParts.map((part: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-orange-100 text-[#FF6600] px-3 py-1 rounded-full text-sm font-medium capitalize"
                                                    >
                                                        {part}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Equipment */}
                                    {selectedExercise.equipments && selectedExercise.equipments.length > 0 && (
                                        <div className="flex items-start gap-3">
                                            <h3 className="font-semibold text-base text-gray-900 min-w-[140px]">
                                                Equipment:
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedExercise.equipments.map((equipment: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-orange-100 text-[#FF6600] px-3 py-1 rounded-full text-sm font-medium capitalize"
                                                    >
                                                        {equipment}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Secondary Muscles */}
                                    {selectedExercise.secondaryMuscles && selectedExercise.secondaryMuscles.length > 0 && (
                                        <div className="flex items-start gap-3">
                                            <h3 className="font-semibold text-base text-gray-900 min-w-[140px]">
                                                Secondary Muscles:
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedExercise.secondaryMuscles.map((muscle: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-orange-100 text-[#FF6600] px-3 py-1 rounded-full text-sm font-medium capitalize"
                                                    >
                                                        {muscle}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Instructions */}
                                    {selectedExercise.instructions && selectedExercise.instructions.length > 0 && (
                                        <div className="pt-4">
                                            <h3 className="font-semibold text-lg text-gray-900 mb-3">
                                                Instructions
                                            </h3>
                                            <ol className="space-y-3">
                                                {selectedExercise.instructions.map((instruction: string, idx: number) => (
                                                    <li key={idx} className="text-gray-700 leading-relaxed">
                                                        <span className="font-medium text-gray-900">
                                                            {instruction.split(':')[0]}:
                                                        </span>
                                                        {instruction.split(':')[1]}
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column - Exercise GIF */}
                                <div className="flex items-center justify-center lg:sticky lg:top-6">
                                    <div className="w-3/5 max-w-md">
                                        <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                                            <img
                                                src={selectedExercise.gifUrl}
                                                alt={selectedExercise.name}
                                                className="w-full h-auto object-contain"
                                            />
                                        </div>
                                        <p className="text-center text-sm text-[#FF6600] mt-4">
                                            Watch the animation to learn proper form
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
}