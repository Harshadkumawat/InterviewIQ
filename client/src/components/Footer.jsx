import React from "react";
import { BsRobot } from "react-icons/bs";

function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 px-6 py-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
            <BsRobot size={14} />
          </div>
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            InterviewIQ<span className="text-indigo-500">.AI</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center max-w-sm">
          AI-powered interview prep — improve communication, technical depth,
          and confidence.
        </p>

        {/* Links */}
        <div className="flex items-center gap-5">
          <a
            href="#"
            className="text-xs text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-xs text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-xs text-zinc-400 dark:text-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
