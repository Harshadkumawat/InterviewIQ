import React, { useState } from "react";
import { motion } from "motion/react";
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine,
} from "react-icons/fa";
import axios from "axios";
import { ServerUrl } from "../config/apiPath";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../features/auth/authSlice";

function Step1SetUp({ onStart }) {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;
    setAnalyzing(true);
    const formdata = new FormData();
    formdata.append("resume", resumeFile);
    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/resume",
        formdata,
        { withCredentials: true },
      );
      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");
      setAnalysisDone(true);
    } catch (error) {
      console.log(error);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/generate-questions",
        { role, experience, mode, resumeText, projects, skills },
        { withCredentials: true },
      );
      if (userData)
        dispatch(
          setUserData({ ...userData, credits: result.data.creditsLeft }),
        );
      onStart(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12"
    >
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        {/* ── LEFT PANEL ── */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 p-10 flex flex-col justify-center"
        >
          <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-950 rounded-lg flex items-center justify-center mb-6">
            <svg
              className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-medium text-zinc-900 dark:text-white mb-3">
            Start your AI interview
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10">
            Practice real interview scenarios powered by AI. Improve
            communication, technical skills, and confidence.
          </p>

          <div className="space-y-3">
            {[
              {
                icon: <FaUserTie size={14} />,
                text: "Choose role & experience level",
              },
              {
                icon: <FaMicrophoneAlt size={14} />,
                text: "Smart voice interview mode",
              },
              {
                icon: <FaChartLine size={14} />,
                text: "Performance analytics & score",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3"
              >
                <span className="text-indigo-500">{item.icon}</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Credits info */}
          {userData && (
            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Available credits
              </p>
              <p className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
                {userData.credits ?? 0}
              </p>
            </div>
          )}
        </motion.div>

        {/* ── RIGHT PANEL ── */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-10 bg-white dark:bg-zinc-900"
        >
          <h2 className="text-lg font-medium text-zinc-900 dark:text-white mb-7">
            Interview setup
          </h2>

          <div className="space-y-4">
            {/* Role */}
            <div className="relative">
              <FaUserTie
                className="absolute top-3.5 left-3.5 text-zinc-400"
                size={13}
              />
              <input
                type="text"
                placeholder="Job role (e.g. Frontend Developer)"
                className="w-full pl-9 pr-4 py-3 text-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 placeholder-zinc-400 dark:placeholder-zinc-600 transition"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              />
            </div>

            {/* Experience */}
            <div className="relative">
              <FaBriefcase
                className="absolute top-3.5 left-3.5 text-zinc-400"
                size={13}
              />
              <input
                type="text"
                placeholder="Experience (e.g. 2 years, Fresher)"
                className="w-full pl-9 pr-4 py-3 text-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 placeholder-zinc-400 dark:placeholder-zinc-600 transition"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              />
            </div>

            {/* Mode */}
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full py-3 px-4 text-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
            >
              <option value="Technical">Technical Interview</option>
              <option value="HR">HR Interview</option>
            </select>

            {/* Resume upload */}
            {!analysisDone && (
              <div
                onClick={() => document.getElementById("resumeUpload").click()}
                className="border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors"
              >
                <FaFileUpload className="text-2xl mx-auto text-indigo-400 mb-2" />
                <input
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  className="hidden"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {resumeFile ? (
                    <span className="text-zinc-900 dark:text-white font-medium">
                      {resumeFile.name}
                    </span>
                  ) : (
                    <>
                      Click to upload resume{" "}
                      <span className="text-zinc-400">(optional)</span>
                    </>
                  )}
                </p>

                {resumeFile && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadResume();
                    }}
                    disabled={analyzing}
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium hover:bg-zinc-700 dark:hover:bg-zinc-100 disabled:opacity-60 transition-colors"
                  >
                    {analyzing && (
                      <svg
                        className="w-3 h-3 animate-spin"
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
                    {analyzing ? "Analyzing..." : "Analyze Resume"}
                  </button>
                )}
              </div>
            )}

            {/* Resume analysis result */}
            {analysisDone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-white">
                    Resume analysis
                  </h3>
                  <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Done
                  </span>
                </div>

                {projects.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                      Projects
                    </p>
                    <ul className="space-y-1">
                      {projects.map((p, i) => (
                        <li
                          key={i}
                          className="text-xs text-zinc-700 dark:text-zinc-300 flex items-start gap-2"
                        >
                          <span className="text-indigo-400 mt-0.5">·</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {skills.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((s, i) => (
                        <span
                          key={i}
                          className="bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 px-2.5 py-0.5 rounded-full text-xs"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Start button */}
            <motion.button
              onClick={handleStart}
              disabled={!role || !experience || loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && (
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
              {loading ? "Starting..." : "Start Interview"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Step1SetUp;
