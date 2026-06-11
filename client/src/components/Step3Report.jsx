import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Step3Report({ report }) {
  if (!report) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Loading report...
        </p>
      </div>
    );
  }

  const navigate = useNavigate();
  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0,
  }));

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  const getScoreLabel = (s) => {
    if (s >= 8)
      return {
        text: "Ready for job opportunities.",
        tag: "Excellent clarity and structured responses.",
      };
    if (s >= 5)
      return {
        text: "Needs minor improvement.",
        tag: "Good foundation, refine articulation.",
      };
    return {
      text: "Significant improvement required.",
      tag: "Work on clarity and confidence.",
    };
  };

  const getScoreColor = (s) => {
    if (s >= 8) return "text-emerald-600 dark:text-emerald-400";
    if (s >= 5) return "text-amber-600 dark:text-amber-400";
    return "text-red-500 dark:text-red-400";
  };

  const getBarColor = (s) => {
    if (s >= 8) return "bg-emerald-500";
    if (s >= 5) return "bg-amber-500";
    return "bg-red-500";
  };

  const { text: performanceText, tag: shortTagline } =
    getScoreLabel(finalScore);
  const percentage = (finalScore / 10) * 100;

  const getAdvice = (s) => {
    if (s >= 8)
      return "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    if (s >= 5)
      return "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    return "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
  };

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let currentY = 25;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(99, 102, 241);
    doc.text("AI Interview Performance Report", pageWidth / 2, currentY, {
      align: "center",
    });
    currentY += 5;
    doc.setDrawColor(99, 102, 241);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);
    currentY += 15;

    doc.setFillColor(238, 242, 255);
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Final Score: ${finalScore}/10`, pageWidth / 2, currentY + 12, {
      align: "center",
    });
    currentY += 30;

    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");
    doc.setFontSize(12);
    doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);
    doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);
    doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);
    currentY += 45;

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220);
    doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);
    doc.setFont("helvetica", "bold");
    doc.text("Professional Advice", margin + 10, currentY + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const splitAdvice = doc.splitTextToSize(
      getAdvice(finalScore),
      contentWidth - 20,
    );
    doc.text(splitAdvice, margin + 10, currentY + 20);
    currentY += 50;

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [
        `${i + 1}`,
        q.question,
        `${q.score}/10`,
        q.feedback,
      ]),
      styles: { fontSize: 9, cellPadding: 5, valign: "top" },
      headStyles: {
        fillColor: [99, 102, 241],
        textColor: 255,
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 55 },
        2: { cellWidth: 20, halign: "center" },
        3: { cellWidth: "auto" },
      },
      alternateRowStyles: { fillColor: [249, 250, 251] },
    });

    doc.save("AI_Interview_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-4 sm:px-6 lg:px-10 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/history")}
            className="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors flex-shrink-0"
          >
            <FaArrowLeft size={13} />
          </button>
          <div>
            <h1 className="text-2xl font-medium text-zinc-900 dark:text-white">
              Interview Analytics
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              AI-powered performance insights
            </p>
          </div>
        </div>

        <button
          onClick={downloadPDF}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
        >
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download PDF
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── LEFT COLUMN ── */}
        <div className="space-y-5">
          {/* Overall score */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 text-center"
          >
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-5">
              Overall Performance
            </p>
            <div className="w-24 h-24 mx-auto">
              <CircularProgressbar
                value={percentage}
                text={`${finalScore}/10`}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor:
                    finalScore >= 8
                      ? "#10b981"
                      : finalScore >= 5
                        ? "#f59e0b"
                        : "#ef4444",
                  textColor:
                    finalScore >= 8
                      ? "#10b981"
                      : finalScore >= 5
                        ? "#f59e0b"
                        : "#ef4444",
                  trailColor: "#e4e4e7",
                })}
              />
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-3">
              Out of 10
            </p>
            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <p className={`text-sm font-medium ${getScoreColor(finalScore)}`}>
                {performanceText}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {shortTagline}
              </p>
            </div>
          </motion.div>

          {/* Skill bars */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
          >
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-5">
              Skill Evaluation
            </p>
            <div className="space-y-5">
              {skills.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {s.label}
                    </span>
                    <span className={`font-medium ${getScoreColor(s.value)}`}>
                      {s.value}
                    </span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${getBarColor(s.value)}`}
                      style={{ width: `${s.value * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Advice */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-xl p-6"
          >
            <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
              Professional Advice
            </p>
            <p className="text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed">
              {getAdvice(finalScore)}
            </p>
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
          >
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-5">
              Performance Trend
            </p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionScoreData}>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#a1a1aa" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 10]}
                    tick={{ fontSize: 12, fill: "#a1a1aa" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #e4e4e7",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    fill="url(#scoreGrad)"
                    strokeWidth={2}
                    dot={{ fill: "#6366f1", r: 4 }}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Question breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
          >
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-5">
              Question Breakdown
            </p>

            <div className="space-y-4">
              {questionWiseScore.map((q, i) => (
                <div
                  key={i}
                  className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                    <div className="flex-1">
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">
                        Question {i + 1}
                      </p>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white leading-relaxed">
                        {q.question || "Question not available"}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-medium px-3 py-1 rounded-lg border flex-shrink-0 w-fit ${
                        q.score >= 8
                          ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                          : q.score >= 5
                            ? "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                            : "bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
                      }`}
                    >
                      {q.score ?? 0}/10
                    </span>
                  </div>

                  <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
                    <p className="text-xs font-medium text-indigo-500 uppercase tracking-wider mb-1.5">
                      AI Feedback
                    </p>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {q.feedback?.trim() ||
                        "No feedback available for this question."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Step3Report;
