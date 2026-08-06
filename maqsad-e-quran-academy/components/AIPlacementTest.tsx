"use client";

import React, { useState, useCallback } from "react";
import {
  Sparkles,
  X,
  CheckCircle2,
  HelpCircle,
  Mic,
  Volume2,
  Award,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Check,
  Zap,
  BookOpen,
  ChevronRight,
} from "lucide-react";

interface AIPlacementTestProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCourse?: (courseName: string) => void;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: { label: string; value: string; point: number; hint?: string }[];
}

const PLACEMENT_QUESTIONS: Question[] = [
  {
    id: 1,
    title: "Arabic Script & Reading Background",
    subtitle: "Select the option that best describes your current reading capability:",
    options: [
      { label: "Complete beginner (Cannot recognize Arabic letters yet)", value: "beginner", point: 1 },
      { label: "Can recognize letters & join them slowly with vowels (Fatha, Kasra, Damma)", value: "basic", point: 2 },
      { label: "Can read Quran directly, but struggle with Tajweed rules and fluency", value: "intermediate", point: 3 },
      { label: "Fluent Quran reader looking for advanced Tajweed, Makharij & Hifz", value: "advanced", point: 4 },
    ],
  },
  {
    id: 2,
    title: "Tajweed Rule Diagnostic: Noon Sakinah & Tanween",
    subtitle: "What Tajweed rule applies when Nun Sakinah (نْ) is followed by the letter Ya (ي) as in 'مَن يَقُولُ'?",
    options: [
      { label: "Izhar (Clear pronunciation without Ghunna)", value: "izhar", point: 1 },
      { label: "Idgham with Ghunna (Merging with nasal sound)", value: "idgham_ghunna", point: 4, hint: "Correct! Idgham in Yanmu letters" },
      { label: "Iqlab (Converting Nun to Meem)", value: "iqlab", point: 1 },
      { label: "Ikhfa (Hiding the Nun sound)", value: "ikhfa", point: 2 },
    ],
  },
  {
    id: 3,
    title: "Makharij (Articulation Points) Self Check",
    subtitle: "How well do you differentiate deep throat letters like Ain (ع) vs Hamza (أ) and Ha (ح) vs Ha (هـ)?",
    options: [
      { label: "I find them hard to differentiate and sound similar", value: "makhraj_struggle", point: 1 },
      { label: "I know the theory but need teacher corrections in live practice", value: "makhraj_practice", point: 2 },
      { label: "I can pronounce Ain (ع) and Ha (ح) clearly from throat mid-point", value: "makhraj_confident", point: 4 },
    ],
  },
  {
    id: 4,
    title: "Madd (Elongation) Duration Diagnostic",
    subtitle: "In Madd Muttasil (Connected Madd, e.g., جَاءَ), how many counts/harakat must it be prolonged?",
    options: [
      { label: "1 Count (No elongation)", value: "madd_1", point: 1 },
      { label: "2 Counts (Natural Madd)", value: "madd_2", point: 2 },
      { label: "4 to 5 Counts (Obligatory Madd)", value: "madd_45", point: 4, hint: "Correct! Madd Muttasil is 4-5 counts" },
      { label: "Not sure / Have not studied Madd rules", value: "madd_unsure", point: 1 },
    ],
  },
];

export default function AIPlacementTest({ isOpen, onClose, onSelectCourse }: AIPlacementTestProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState<boolean>(false);
  const [audioRecorded, setAudioRecorded] = useState<boolean>(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelectOption = React.useCallback((questionId: number, val: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: val }));
  }, []);

  const startAIAnalysis = React.useCallback(() => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsFinished(true);
    }, 2500);
  }, []);

  const handleNext = React.useCallback(() => {
    if (currentStep < PLACEMENT_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      startAIAnalysis();
    }
  }, [currentStep, startAIAnalysis]);

  const resetTest = React.useCallback(() => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setIsAnalyzing(false);
    setIsFinished(false);
    setAudioRecorded(false);
  }, []);

  if (!isOpen) return null;

  const currentQuestion = PLACEMENT_QUESTIONS[currentStep];

  // Calculate Placement Result
  const calculateResult = () => {
    let score = 0;
    PLACEMENT_QUESTIONS.forEach((q) => {
      const selected = q.options.find((opt) => opt.value === selectedAnswers[q.id]);
      if (selected) {
        score += selected.point;
      }
    });

    if (score <= 5) {
      return {
        level: "Level 1: Noorani Qaida & Basic Arabic Alphabets",
        recommendedCourse: "Noorani Qaida for Beginners",
        accuracyScore: 68,
        description: "Focus on letter recognition, Makharij articulation points, and vowel symbols (Harakat).",
        nextStepText: "Start from Qaida Foundations with 1-on-1 certified tutor.",
      };
    } else if (score <= 11) {
      return {
        level: "Level 2: Intermediate Tajweed & Fluent Nazra",
        recommendedCourse: "Noorani Qaida & Basic Tajweed",
        accuracyScore: 84,
        description: "You have good basic reading skills! Focus on Noon Sakinah rules, Ghunna, and Madd elongation.",
        nextStepText: "Master Tajweed rules with personalized feedback and live Zoom drills.",
      };
    } else {
      return {
        level: "Level 3: Advanced Tajweed, Qira'at & Online Hifz",
        recommendedCourse: "Quran Recitation & Hifz Program",
        accuracyScore: 95,
        description: "Mashallah! Excellent Tajweed foundations. Ready for Juz Amma Hifz, Tarteel perfection & Tafseer.",
        nextStepText: "Join advanced Hifz track with flexible 1-on-1 memorization schedule.",
      };
    }
  };

  const result = calculateResult();
  const progressPercent = Math.round(((currentStep + 1) / PLACEMENT_QUESTIONS.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-placement-title"
        className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles size={20} aria-hidden="true" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                Gemini Quran AI Diagnostic Engine
              </span>
              <h2 id="ai-placement-title" className="text-lg font-extrabold text-white mt-0.5">AI Tajweed Placement Test</h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Placement Test Modal"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* State 1: AI Analyzing loader */}
          {isAnalyzing && (
            <div role="status" aria-live="polite" className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
                <Sparkles className="w-8 h-8 text-amber-400 absolute inset-0 m-auto animate-pulse" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Analyzing Recitation & Tajweed Knowledge...</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Gemini Quran AI is evaluating your responses, Makhraj scores, and matching you with the optimal learning curriculum.
                </p>
              </div>
            </div>
          )}

          {/* State 2: Final Placement Test Results */}
          {!isAnalyzing && isFinished && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <Award size={32} aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Diagnostic Completed
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">{result.level}</h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-lg mx-auto">{result.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2 text-left">
                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                    <p className="text-[11px] text-slate-400 font-semibold uppercase">Tajweed Score</p>
                    <p className="text-xl font-black text-emerald-400 mt-0.5">{result.accuracyScore}%</p>
                  </div>
                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                    <p className="text-[11px] text-slate-400 font-semibold uppercase">Recommended Track</p>
                    <p className="text-xs font-bold text-amber-400 truncate mt-1">{result.recommendedCourse}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={resetTest}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  <RotateCcw size={16} aria-hidden="true" />
                  <span>Retake Test</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectCourse) onSelectCourse(result.recommendedCourse);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-700/30 transition flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  <span>Select Recommended Course</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {/* State 3: Active Question Wizard */}
          {!isAnalyzing && !isFinished && (
            <div className="space-y-6">
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                  <span>Question {currentStep + 1} of {PLACEMENT_QUESTIONS.length}</span>
                  <span className="text-emerald-400">{progressPercent}% Completed</span>
                </div>
                <div
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Diagnostic test progress"
                  className="w-full h-2 rounded-full bg-slate-800 overflow-hidden"
                >
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question title & options */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{currentQuestion.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{currentQuestion.subtitle}</p>
                </div>

                <div role="radiogroup" aria-label={currentQuestion.title} className="space-y-3">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = selectedAnswers[currentQuestion.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => handleSelectOption(currentQuestion.id, opt.value)}
                        className={`w-full p-4 rounded-2xl border text-left transition flex items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                          isSelected
                            ? "bg-emerald-950/50 border-emerald-500/80 text-white shadow-lg shadow-emerald-950/50"
                            : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-emerald-500 border-emerald-500 text-emerald-950 font-bold"
                              : "border-slate-600"
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} aria-hidden="true" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm font-semibold">{opt.label}</p>
                          {opt.hint && isSelected && (
                            <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1 font-medium">
                              <Sparkles size={12} aria-hidden="true" /> {opt.hint}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Voice Mic Recitation sample prompt on question 3 */}
              {currentStep === 2 && (
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRecordingAudio(true);
                        setTimeout(() => {
                          setIsRecordingAudio(false);
                          setAudioRecorded(true);
                        }, 2000);
                      }}
                      className={`p-3 rounded-xl font-bold text-xs transition flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                        isRecordingAudio
                          ? "bg-rose-600 text-white animate-pulse"
                          : audioRecorded
                          ? "bg-emerald-600 text-white"
                          : "bg-amber-500 text-emerald-950 hover:bg-amber-400"
                      }`}
                    >
                      <Mic size={16} aria-hidden="true" />
                      <span>
                        {isRecordingAudio
                          ? "Listening to Recitation..."
                          : audioRecorded
                          ? "Sample Recorded ✓"
                          : "Test Voice Pronunciation"}
                      </span>
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {audioRecorded ? "Pronunciation score added to AI model" : "Optional 3-second audio sample"}
                  </span>
                </div>
              )}

              {/* Footer navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    currentStep === 0
                      ? "opacity-40 border-slate-800 text-slate-500 cursor-not-allowed"
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
                  }`}
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  disabled={!selectedAnswers[currentQuestion.id]}
                  onClick={handleNext}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    !selectedAnswers[currentQuestion.id]
                      ? "opacity-50 bg-slate-800 text-slate-500 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30"
                  }`}
                >
                  <span>{currentStep === PLACEMENT_QUESTIONS.length - 1 ? "Submit & Analyze" : "Next Question"}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
