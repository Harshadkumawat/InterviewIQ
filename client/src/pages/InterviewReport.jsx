import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../config/apiPath";
import Step3Report from "../components/Step3Report";
import { FaArrowLeft } from "react-icons/fa";

function InterviewReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await axios.get(
          ServerUrl + "/api/interview/report/" + id,
          { withCredentials: true },
        );
        setReport(result.data);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    fetchReport();
  }, []);

  // Loading
  if (!report && !error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-indigo-500 animate-spin"
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
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Loading your report...
        </p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-900 dark:text-white mb-1">
            Failed to load report
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Something went wrong. Please try again.
          </p>
        </div>
        <button
          onClick={() => navigate("/history")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <FaArrowLeft size={12} />
          Back to History
        </button>
      </div>
    );
  }

  return <Step3Report report={report} />;
}

export default InterviewReport;
