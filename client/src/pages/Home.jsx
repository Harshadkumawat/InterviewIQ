import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthModel from "../components/AuthModel";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";

function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    if (!userData) {
      setShowAuth(true);
      return;
    }
    navigate("/interview");
  };

  const handleHistory = () => {
    if (!userData) {
      setShowAuth(true);
      return;
    }
    navigate("/history");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col">
      <Navbar />

      {/* ── HERO ── */}
      <section className="px-6 pt-24 pb-20 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 mb-8"
          >
            <HiSparkles size={13} />
            AI Powered Smart Interview Platform
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-5xl md:text-6xl font-medium leading-tight tracking-tight text-zinc-900 dark:text-white mb-5"
          >
            Practice interviews with{" "}
            <span className="text-indigo-500">AI intelligence</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed mb-10"
          >
            Role-based mock interviews with smart follow-ups, adaptive
            difficulty and real-time performance evaluation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
            >
              Start Interview
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleHistory}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
              View History
            </motion.button>
          </motion.div>

          <p className="mt-6 text-xs text-zinc-400 dark:text-zinc-600">
            No credit card needed · First session free
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-t border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: "12,000+", label: "Mock interviews done" },
            { value: "94%", label: "Users felt more confident" },
            { value: "50+", label: "Job roles covered" },
            { value: "4.8 ★", label: "Average user rating" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-medium text-indigo-600 dark:text-indigo-400">
                {s.value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
            Process
          </p>
          <h2 className="text-3xl font-medium text-zinc-900 dark:text-white mb-12">
            From signup to offer letter
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
            {[
              {
                icon: <BsRobot size={22} />,
                step: "01",
                title: "Role & Experience Selection",
                desc: "AI adjusts difficulty based on selected job role and your experience level.",
              },
              {
                icon: <BsMic size={22} />,
                step: "02",
                title: "Smart Voice Interview",
                desc: "Dynamic follow-up questions based on your answers in real time.",
              },
              {
                icon: <BsClock size={22} />,
                step: "03",
                title: "Timer Based Simulation",
                desc: "Real interview pressure with time tracking and performance feedback.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`p-7 bg-white dark:bg-zinc-950 ${i < 2 ? "border-b sm:border-b-0 sm:border-r border-zinc-200 dark:border-zinc-800" : ""}`}
              >
                <p className="text-xs font-medium text-indigo-500 tracking-widest mb-3">
                  {item.step}
                </p>
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI CAPABILITIES ── */}
      <section className="px-6 py-20 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
            Features
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-medium text-zinc-900 dark:text-white mb-12"
          >
            Advanced AI capabilities
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                image: evalImg,
                icon: <BsBarChart size={18} />,
                title: "AI Answer Evaluation",
                desc: "Scores communication, technical accuracy and confidence in every response.",
              },
              {
                image: resumeImg,
                icon: <BsFileEarmarkText size={18} />,
                title: "Resume Based Interview",
                desc: "Project-specific questions generated from your uploaded resume.",
              },
              {
                image: pdfImg,
                icon: <BsFileEarmarkText size={18} />,
                title: "Downloadable PDF Report",
                desc: "Detailed strengths, weaknesses and improvement insights after every session.",
              },
              {
                image: analyticsImg,
                icon: <BsBarChart size={18} />,
                title: "History & Analytics",
                desc: "Track progress with performance graphs and topic-level analysis.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-7 flex flex-col md:flex-row items-center gap-7 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
              >
                <div className="w-full md:w-2/5 flex justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full max-h-48 object-contain"
                  />
                </div>
                <div className="w-full md:w-3/5">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-medium text-zinc-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERVIEW MODES ── */}
      <section className="px-6 py-20 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
            Modes
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-medium text-zinc-900 dark:text-white mb-12"
          >
            Multiple interview modes
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                img: hrImg,
                title: "HR Interview Mode",
                desc: "Behavioral and communication based evaluation for non-technical rounds.",
              },
              {
                img: techImg,
                title: "Technical Mode",
                desc: "Deep technical questioning tailored to your selected role.",
              },
              {
                img: confidenceImg,
                title: "Confidence Detection",
                desc: "Basic tone and voice analysis to track your delivery over time.",
              },
              {
                img: creditImg,
                title: "Credits System",
                desc: "Unlock premium interview sessions easily with our flexible credit system.",
              },
            ].map((mode, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-7 flex items-center justify-between gap-6 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all"
              >
                <div>
                  <h3 className="text-base font-medium text-zinc-900 dark:text-white mb-2">
                    {mode.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs">
                    {mode.desc}
                  </p>
                </div>
                <img
                  src={mode.img}
                  alt={mode.title}
                  className="w-24 h-24 object-contain flex-shrink-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-medium text-zinc-900 dark:text-white mb-4">
            Your next interview starts here
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 mb-8">
            No credit card needed. First session is on us.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            Start free
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.button>
        </div>
      </section>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  );
}

export default Home;
