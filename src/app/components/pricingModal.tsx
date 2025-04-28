"use client";

import { useEffect, useState } from "react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function PricingModal({ isOpen, onClose }: ProfileModalProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const price = billing === "monthly" ? "$18.99" : "$7.99";
  const priceText =
    billing === "monthly" ? "/per month" : "/per month (billed yearly)";
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setBilling("yearly")}
            className={`px-4 py-2 rounded-full font-semibold ${
              billing === "yearly"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Yearly <span className="text-green-600 text-sm ml-1">Save 60%</span>
          </button>
          <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-2 rounded-full font-semibold ${
              billing === "monthly"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Monthly
          </button>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
              🎤
            </div>
            <h2 className="text-2xl font-bold">Notewave AI</h2>
            <span className="text-yellow-400 text-xl">✨</span>
          </div>
          <p className="text-gray-600 mb-4">
            Get access to all features and benefits. No limits, no restrictions.
          </p>
          <p className="text-3xl font-bold">
            {price} <span className="text-base text-gray-500">{priceText}</span>
          </p>

          <button className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition">
            Upgrade plan →
          </button>

          <ul className="text-left mt-6 text-sm text-gray-700 space-y-2">
            <li>✔ Unlimited note generations</li>
            <li>✔ Unlimited audio or phone calls</li>
            <li>✔ Unlimited podcasts and YouTube videos</li>
            <li>✔ Unlimited quiz and flashcards</li>
            <li>✔ Support for 100+ languages</li>
            <li>✔ Best-in-className Transcription and Summarization</li>
            <li>✔ Customer support 24/7</li>
            <li>✔ Priority Access to new features</li>
            <li>✔ And more...</li>
          </ul>
        </div>
      </div> */}
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white dark:bg-background rounded-xl w-full max-w-4xl mx-auto p-4 md:p-6 relative shadow-lg overflow-hidden border bg-card text-card-foreground"
      >
        {/* Nút Đóng */}
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition"
        >
          ✕<span className="sr-only">Close</span>
        </button>

        {/* Chọn Billing */}
        <div className="flex justify-center space-x-2 mb-6">
          <button
            onClick={() => setBilling("yearly")}
            className={`px-4 py-2 rounded-full font-semibold ${
              billing === "yearly"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Yearly <span className="text-green-600 text-xs ml-1">Save 60%</span>
          </button>
          <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-2 rounded-full font-semibold ${
              billing === "monthly"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Monthly
          </button>
        </div>

        {/* Nội dung */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Bên trái: Ảnh + Mô tả */}
          <div className="flex flex-col items-center md:items-start md:w-1/2">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
                🎤
              </div>
              <h2 className="text-2xl font-bold">Notewave AI</h2>
              <span className="text-yellow-400 text-xl">✨</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center md:text-left">
              Get access to all features and benefits of the app. No limits, no
              restrictions.
            </p>
            <div className="flex-1 flex flex-col justify-end">
              <div className="opacity: 1; filter: blur(0px); will-change: transform; transform: none;">
                {" "}
                <span className="mb-4 mt-auto text-4xl font-bold">{price}</span>
                <span className="text-sm font-medium text-neutral-600 dark:font-normal dark:text-neutral-300">
                  {priceText}
                </span>
              </div>

              <button className="inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 group relative w-full mt-4 gap-2 overflow-hidden text-lg font-semibold tracking-tighter transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2">
                Upgrade Plan →
              </button>
            </div>
          </div>

          {/* Bên phải: Features */}
          <div className="md:w-1/2">
            <p className="text-sm text-muted-foreground mb-4">
              Everything in free plan plus:
            </p>
            <ul className="space-y-2">
              {[
                "Unlimited note generations",
                "Unlimited audio or phone calls",
                "Unlimited podcasts and YouTube videos",
                "Unlimited quiz and flashcards",
                "Support for 100+ languages",
                "Best-in-class transcription and summarization",
                "Customer support 24/7",
                "Priority access to new features",
                "And more...",
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
