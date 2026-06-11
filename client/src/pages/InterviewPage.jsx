import React, { useState } from "react";
import Step1SetUp from "../components/Step1SetUp";
import Step2Interview from "../components/Step2Interview";
import Step3Report from "../components/Step3Report";

const STEPS = [
  { num: 1, label: "Setup" },
  { num: 2, label: "Interview" },
  { num: 3, label: "Report" },
];

function InterviewPage() {
  const [step, setStep] = useState(1);
  const [interviewData, setInterviewData] = useState(null);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
      {/* Top progress bar */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            InterviewIQ<span className="text-indigo-500">.AI</span>
          </span>

          {/* Steps */}
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                      step > s.num
                        ? "bg-indigo-600 text-white"
                        : step === s.num
                          ? "bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600"
                    }`}
                  >
                    {step > s.num ? (
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      s.num
                    )}
                  </div>
                  <span
                    className={`text-xs hidden sm:block transition-colors ${
                      step === s.num
                        ? "text-zinc-900 dark:text-white font-medium"
                        : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-10 h-px mx-1 transition-colors ${
                      step > s.num
                        ? "bg-indigo-400"
                        : "bg-zinc-200 dark:bg-zinc-800"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step counter */}
          <span className="text-xs text-zinc-400 dark:text-zinc-600">
            Step {step} of 3
          </span>
        </div>

        {/* Progress line */}
        <div className="max-w-3xl mx-auto mt-3">
          <div className="h-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1">
        {step === 1 && (
          <Step1SetUp
            onStart={(data) => {
              setInterviewData(data);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <Step2Interview
            interviewData={interviewData}
            onFinish={(report) => {
              setInterviewData(report);
              setStep(3);
            }}
          />
        )}

        {step === 3 && <Step3Report report={interviewData} />}
      </div>
    </div>
  );
}

export default InterviewPage;
