import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getMyInterviews } from "../features/user/userService";

function InterviewHistory() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const data = await getMyInterviews();
        setInterviews(data);
      } catch (error) {
        console.error("Failed to fetch interviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 8) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 5) return "text-amber-600 dark:text-amber-400";
    return "text-red-500 dark:text-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 8)
      return "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800";
    if (score >= 5)
      return "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800";
    return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800";
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors flex-shrink-0"
          >
            <FaArrowLeft size={13} />
          </button>
          <div>
            <h1 className="text-2xl font-medium text-zinc-900 dark:text-white">
              Interview History
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              Track your past interviews and performance reports
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 animate-pulse"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-4 w-40 bg-zinc-200 dark:bg-zinc-700 rounded" />
                    <div className="h-3 w-28 bg-zinc-100 dark:bg-zinc-800 rounded" />
                    <div className="h-3 w-20 bg-zinc-100 dark:bg-zinc-800 rounded" />
                  </div>
                  <div className="h-8 w-20 bg-zinc-100 dark:bg-zinc-800 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && interviews.length === 0 && (
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-14 text-center">
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-zinc-900 dark:text-white mb-1">
              No interviews yet
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Start your first session to see your history here.
            </p>
            <button
              onClick={() => navigate("/interview")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
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
            </button>
          </div>
        )}

        {/* List */}
        {!loading && interviews.length > 0 && (
          <div className="grid gap-3">
            {interviews.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/report/${item._id}`)}
                className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-200 dark:hover:border-indigo-800 rounded-xl p-5 cursor-pointer transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Left */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                      {item.role}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {item.experience} · {item.mode}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-0.5">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Right */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Score */}
                    <div
                      className={`border rounded-lg px-4 py-2 text-center min-w-[72px] ${getScoreBg(item.finalScore)}`}
                    >
                      <p
                        className={`text-lg font-medium leading-none ${getScoreColor(item.finalScore)}`}
                      >
                        {item.finalScore ?? 0}
                        <span className="text-xs font-normal opacity-60">
                          /10
                        </span>
                      </p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                        Score
                      </p>
                    </div>

                    {/* Status */}
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${
                        item.status === "completed"
                          ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                          : "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                      }`}
                    >
                      {item.status}
                    </span>

                    {/* Arrow */}
                    <svg
                      className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Count */}
        {!loading && interviews.length > 0 && (
          <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center mt-6">
            {interviews.length} session{interviews.length !== 1 ? "s" : ""}{" "}
            total
          </p>
        )}
      </div>
    </div>
  );
}

export default InterviewHistory;
