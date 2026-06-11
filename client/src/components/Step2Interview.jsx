import React, { useState, useRef, useEffect } from "react";
import maleVideo from "../assets/videos/male-ai.mp4";
import femaleVideo from "../assets/videos/female-ai.mp4";
import Timer from "./Timer";
import { motion } from "motion/react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import axios from "axios";
import { ServerUrl } from "../config/apiPath";

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");
  const videoRef = useRef(null);
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      const femaleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("female"),
      );
      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }
      const maleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("mark") ||
          v.name.toLowerCase().includes("male"),
      );
      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }
      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }
      window.speechSynthesis.cancel();
      const humanText = text.replace(/,/g, ", ... ").replace(/\./g, ". ... ");
      const utterance = new SpeechSynthesisUtterance(humanText);
      utterance.voice = selectedVoice;
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;
      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic();
        videoRef.current?.play();
      };
      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);
        if (isMicOn) startMic();
        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };
      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  };

  useEffect(() => {
    if (!selectedVoice) return;
    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`,
        );
        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin.",
        );
        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise((r) => setTimeout(r, 800));
        if (currentIndex === questions.length - 1)
          await speakText("Alright, this one might be a bit more challenging.");
        await speakText(currentQuestion.question);
        if (isMicOn) startMic();
      }
    };
    runIntro();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  useEffect(() => {
    if (isIntroPhase || !currentQuestion) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isIntroPhase, currentIndex]);

  useEffect(() => {
    if (!isIntroPhase && currentQuestion)
      setTimeLeft(currentQuestion.timeLimit || 60);
  }, [currentIndex]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setAnswer((prev) => prev + " " + transcript);
    };
    recognitionRef.current = recognition;
  }, []);

  const startMic = () => {
    try {
      recognitionRef.current?.start();
    } catch {}
  };
  const stopMic = () => {
    recognitionRef.current?.stop();
  };
  const toggleMic = () => {
    isMicOn ? stopMic() : startMic();
    setIsMicOn(!isMicOn);
  };

  const submitAnswer = async () => {
    if (isSubmitting) return;
    stopMic();
    setIsSubmitting(true);
    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/submit-answer",
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken: currentQuestion.timeLimit - timeLeft,
        },
        { withCredentials: true },
      );
      setFeedback(result.data.feedback);
      speakText(result.data.feedback);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    setAnswer("");
    setFeedback("");
    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }
    await speakText("Alright, let's move to the next question.");
    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      if (isMicOn) startMic();
    }, 500);
  };

  const finishInterview = async () => {
    stopMic();
    setIsMicOn(false);
    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/finish",
        { interviewId },
        { withCredentials: true },
      );
      onFinish(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      !isIntroPhase &&
      currentQuestion &&
      timeLeft === 0 &&
      !isSubmitting &&
      !feedback
    )
      submitAnswer();
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      recognitionRef.current?.abort();
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm flex flex-col lg:flex-row overflow-hidden">
        {/* ── LEFT: Video + Status ── */}
        <div className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-4 p-6 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
          {/* Video */}
          <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-black">
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* AI Subtitle */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4"
            >
              <p className="text-sm text-indigo-700 dark:text-indigo-300 text-center leading-relaxed">
                {subtitle}
              </p>
            </motion.div>
          )}

          {/* Status card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-4">
            {/* AI Speaking indicator */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Interview status
              </span>
              <span
                className={`flex items-center gap-1.5 text-xs font-medium ${isAIPlaying ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400 dark:text-zinc-600"}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isAIPlaying ? "bg-indigo-500 animate-pulse" : "bg-zinc-300 dark:bg-zinc-700"}`}
                />
                {isAIPlaying ? "AI Speaking" : "Listening"}
              </span>
            </div>

            <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

            {/* Timer */}
            <div className="flex justify-center">
              <Timer
                timeLeft={timeLeft}
                totalTime={currentQuestion?.timeLimit}
              />
            </div>

            <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

            {/* Question counter */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xl font-medium text-indigo-600 dark:text-indigo-400">
                  {currentIndex + 1}
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">
                  Current
                </p>
              </div>
              <div>
                <p className="text-xl font-medium text-zinc-900 dark:text-white">
                  {questions.length}
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">
                  Total
                </p>
              </div>
            </div>

            {/* Progress pips */}
            <div className="flex items-center gap-1.5 justify-center flex-wrap">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i < currentIndex
                      ? "w-4 bg-indigo-500"
                      : i === currentIndex
                        ? "w-4 bg-indigo-400 animate-pulse"
                        : "w-2 bg-zinc-200 dark:bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Question + Answer ── */}
        <div className="flex-1 flex flex-col p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-medium text-zinc-900 dark:text-white">
              InterviewIQ<span className="text-indigo-500">.AI</span>
            </h2>
            {isIntroPhase && (
              <span className="text-xs text-zinc-400 dark:text-zinc-600 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                Intro
              </span>
            )}
          </div>

          {/* Question bubble */}
          {!isIntroPhase && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 mb-5"
            >
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">
                Question {currentIndex + 1} of {questions.length}
              </p>
              <p className="text-base font-medium text-zinc-900 dark:text-white leading-relaxed">
                {currentQuestion?.question}
              </p>
            </motion.div>
          )}

          {isIntroPhase && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950 rounded-xl flex items-center justify-center mx-auto">
                  <svg
                    className="w-5 h-5 text-indigo-500 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  AI is introducing itself...
                </p>
              </div>
            </div>
          )}

          {/* Answer textarea */}
          {!isIntroPhase && (
            <textarea
              placeholder="Type your answer here, or use the mic to speak..."
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              className="flex-1 min-h-[160px] bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 resize-none outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
            />
          )}

          {/* Actions */}
          {!isIntroPhase && !feedback && (
            <div className="flex items-center gap-3 mt-4">
              {/* Mic toggle */}
              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.92 }}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${
                  isMicOn
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                    : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-600"
                }`}
              >
                {isMicOn ? (
                  <FaMicrophone size={15} />
                ) : (
                  <FaMicrophoneSlash size={15} />
                )}
              </motion.button>

              {/* Submit */}
              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting}
                whileTap={{ scale: 0.98 }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting && (
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                )}
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </motion.button>
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-xl p-5"
            >
              <p className="text-xs font-medium text-indigo-500 uppercase tracking-wider mb-2">
                AI Feedback
              </p>
              <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed mb-4">
                {feedback}
              </p>
              <button
                onClick={handleNext}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
              >
                {currentIndex + 1 >= questions.length
                  ? "Finish Interview"
                  : "Next Question"}
                <BsArrowRight size={15} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Step2Interview;
