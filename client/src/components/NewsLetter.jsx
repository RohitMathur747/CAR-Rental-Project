import React from "react";
import { motion } from "motion/react";

const NewsLetter = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transitions={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center gap-2 text-sm px-3 py-1 pb-5 mb-20"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transitions={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-4xl md:text-6xl font-semibold text-gray-900 mt-4"
        >
          Never Miss a Deal
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transitions={{ duration: 0.3, delay: 0.5 }}
          className="max-w-lg text-center text-slate-500 mt-6"
        >
          Subscibe to get the latest offers, new arrivals, and exclusive
          discounts
        </motion.p>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transitions={{ duration: 0.4, delay: 0.5 }}
          className="relative flex items-center rounded-md border border-slate-200 mt-6 text-sm max-w-md w-full"
        >
          <svg
            className="absolute left-3"
            width="19"
            height="17"
            viewBox="0 0 19 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 6 9.505 8.865a1 1 0 0 1-1.005 0L4 6"
              stroke="#90A1B9"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.3 1H2.7C1.761 1 1 1.84 1 2.875v11.25C1 15.161 1.761 16 2.7 16h13.6c.939 0 1.7-.84 1.7-1.875V2.875C18 1.839 17.239 1 16.3 1"
              stroke="#90A1B9"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="focus:outline-none pl-10 py-5 bg-transparent w-full"
            required
          />
          <button
            type="submit"
            className="shrink-0 mr-2 px-6 py-3 text-sm bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-md active:scale-95 transition duration-300 text-white"
          >
            Subscribe now
          </button>
        </motion.form>
      </motion.div>
    </>
  );
};

export default NewsLetter;
