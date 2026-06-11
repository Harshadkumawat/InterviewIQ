import React from "react";
import { BsRobot } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";
import { auth, provider } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { googleSignIn } from "../features/auth/authService";
import { setUserData } from "../features/auth/authSlice";
import { signInWithPopup } from "firebase/auth";

function Auth({ isModel = false }) {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const { displayName: name, email } = response.user;
      const data = await googleSignIn({ name, email });
      dispatch(setUserData(data));
    } catch (error) {
      console.error("Google Auth failed:", error);
      dispatch(setUserData(null));
    }
  };

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: isModel ? 0 : -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`w-full ${isModel ? "p-8" : "max-w-sm p-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
          <BsRobot size={16} />
        </div>
        <span className="font-medium text-zinc-900 dark:text-white">
          InterviewIQ<span className="text-indigo-500">.AI</span>
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-2xl font-medium text-zinc-900 dark:text-white text-center leading-snug mb-3">
        Welcome back
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center leading-relaxed mb-8">
        Sign in to start AI-powered mock interviews, track your progress, and
        unlock detailed performance insights.
      </p>

      {/* Google button */}
      <motion.button
        onClick={handleGoogleAuth}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
      >
        <FcGoogle size={18} />
        Continue with Google
      </motion.button>

      {/* Fine print */}
      <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center mt-5">
        By continuing, you agree to our{" "}
        <a
          href="#"
          className="underline hover:text-zinc-600 dark:hover:text-zinc-400"
        >
          Terms
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="underline hover:text-zinc-600 dark:hover:text-zinc-400"
        >
          Privacy Policy
        </a>
        .
      </p>
    </motion.div>
  );

  if (isModel) return inner;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-6 py-20">
      {inner}
    </div>
  );
}

export default Auth;
