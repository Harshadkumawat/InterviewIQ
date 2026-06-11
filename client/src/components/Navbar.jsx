import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../features/auth/authSlice";
import AuthModel from "./AuthModel";
import { logoutUser } from "../features/auth/authService";

function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(setUserData(null));
      setShowCreditPopup(false);
      setShowUserPopup(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCreditClick = () => {
    if (!userData) {
      setShowAuth(true);
      return;
    }
    setShowCreditPopup(!showCreditPopup);
    setShowUserPopup(false);
  };

  const handleUserClick = () => {
    if (!userData) {
      setShowAuth(true);
      return;
    }
    setShowUserPopup(!showUserPopup);
    setShowCreditPopup(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between"
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-7 h-7 bg-indigo-600 text-white rounded-lg flex items-center justify-center">
            <BsRobot size={15} />
          </div>
          <span className="font-medium text-zinc-900 dark:text-white hidden md:block">
            InterviewIQ<span className="text-indigo-500">.AI</span>
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 relative">
          {/* Credits pill */}
          <div className="relative">
            <button
              onClick={handleCreditClick}
              className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <BsCoin size={16} className="text-indigo-500" />
              {userData?.credits || 0} credits
            </button>

            {showCreditPopup && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 shadow-lg z-50"
              >
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                  Your balance
                </p>
                <p className="text-2xl font-medium text-zinc-900 dark:text-white mb-1">
                  {userData?.credits || 0}
                  <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400 ml-1">
                    credits
                  </span>
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">
                  Need more to continue practicing?
                </p>
                <button
                  onClick={() => {
                    navigate("/pricing");
                    setShowCreditPopup(false);
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Buy more credits
                </button>
              </motion.div>
            )}
          </div>

          {/* User avatar */}
          <div className="relative">
            <button
              onClick={handleUserClick}
              className="w-9 h-9 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg flex items-center justify-center text-sm font-medium transition-colors"
            >
              {userData?.name ? (
                userData.name.slice(0, 1).toUpperCase()
              ) : (
                <FaUserAstronaut size={15} />
              )}
            </button>

            {showUserPopup && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 shadow-lg z-50"
              >
                {/* User info */}
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {userData?.name?.slice(0, 1).toUpperCase() || (
                      <FaUserAstronaut size={13} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                      {userData?.name}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate">
                      {userData?.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigate("/history");
                    setShowUserPopup(false);
                  }}
                  className="w-full text-left text-sm py-2 px-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  Interview History
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm py-2 px-2 rounded-lg flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors mt-1"
                >
                  <HiOutlineLogout size={15} />
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </nav>
  );
}

export default Navbar;
