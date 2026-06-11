import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { createOrder, verifyPayment } from "../features/payment/paymentService";
import { setUserData } from "../features/auth/authSlice";

const PLAN_AMOUNTS = {
  basic: 100,
  pro: 500,
};

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    credits: 100,
    description: "Perfect for beginners starting interview preparation.",
    features: [
      "100 AI Interview Credits",
      "Basic Performance Report",
      "Voice Interview Access",
      "Limited History Tracking",
    ],
    default: true,
  },
  {
    id: "basic",
    name: "Starter Pack",
    price: "₹100",
    credits: 150,
    description: "Great for focused practice and skill improvement.",
    features: [
      "150 AI Interview Credits",
      "Detailed Feedback",
      "Performance Analytics",
      "Full Interview History",
    ],
  },
  {
    id: "pro",
    name: "Pro Pack",
    price: "₹500",
    credits: 650,
    description: "Best value for serious job preparation.",
    features: [
      "650 AI Interview Credits",
      "Advanced AI Feedback",
      "Skill Trend Analysis",
      "Priority AI Processing",
    ],
    badge: "Best Value",
  },
];

const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-indigo-500 flex-shrink-0"
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
);

function Pricing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id);
      const order = await createOrder({
        planId: plan.id,
        amount: PLAN_AMOUNTS[plan.id] ?? 0,
        credits: plan.credits,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "InterviewIQ.AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: order.id,
        handler: async (response) => {
          const data = await verifyPayment(response);
          dispatch(setUserData(data.user));
          alert("Payment Successful 🎉 Credits Added!");
          navigate("/");
        },
        theme: { color: "#6366f1" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors flex-shrink-0"
          >
            <FaArrowLeft size={13} />
          </button>
          <div>
            <h1 className="text-2xl font-medium text-zinc-900 dark:text-white">
              Choose your plan
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              Flexible pricing to match your interview preparation goals.
            </p>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;

            return (
              <motion.div
                key={plan.id}
                whileHover={!plan.default ? { y: -2 } : {}}
                onClick={() => !plan.default && setSelectedPlan(plan.id)}
                className={`relative bg-white dark:bg-zinc-900 rounded-xl p-7 flex flex-col transition-all
                  ${plan.default ? "cursor-default" : "cursor-pointer"}
                  ${
                    isSelected && !plan.default
                      ? "border-2 border-indigo-500 shadow-sm shadow-indigo-100 dark:shadow-none"
                      : "border border-zinc-200 dark:border-zinc-800 hover:border-indigo-200 dark:hover:border-indigo-800"
                  }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <span className="absolute top-5 right-5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-medium px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                    {plan.badge}
                  </span>
                )}
                {plan.default && (
                  <span className="absolute top-5 right-5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs font-medium px-3 py-1 rounded-full">
                    Current
                  </span>
                )}

                {/* Plan name */}
                <h3 className="text-sm font-medium text-zinc-900 dark:text-white mb-3">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-1">
                  <span className="text-3xl font-medium text-indigo-600 dark:text-indigo-400">
                    {plan.price}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                  {plan.credits} credits
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1 mb-7">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckIcon />
                      <span className="text-xs text-zinc-600 dark:text-zinc-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {!plan.default && (
                  <button
                    disabled={loadingPlan === plan.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isSelected) {
                        setSelectedPlan(plan.id);
                      } else {
                        handlePayment(plan);
                      }
                    }}
                    className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed
                      ${
                        isSelected
                          ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                          : "border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                  >
                    {loadingPlan === plan.id
                      ? "Processing..."
                      : isSelected
                        ? "Proceed to Pay"
                        : "Select Plan"}
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-xs text-zinc-400 dark:text-zinc-600 text-center mt-8">
          Secured by Razorpay · Credits never expire · No subscription
        </p>
      </div>
    </div>
  );
}

export default Pricing;
