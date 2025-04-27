"use client";

import { useEffect, useState } from "react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}
function convertStyleStringToObject(styleString: string) {
  const styleObject: { [key: string]: string } = {};

  styleString.split(";").forEach((style) => {
    if (style.trim()) {
      const [property, value] = style.split(":");
      if (property && value) {
        const camelCaseProperty = property
          .trim()
          .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()); // Convert to camelCase
        styleObject[camelCaseProperty] = value.trim();
      }
    }
  });

  return styleObject;
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
        id="radix-:rm:"
        aria-describedby="radix-:ro:"
        aria-labelledby="radix-:rn:"
        data-state="open"
        className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg"
        style={convertStyleStringToObject("pointer-events: auto;")}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <div id="pricing">
            <div className="container mx-auto max-w-5xl py-5">
              {/* <div className="flex items-center justify-center mx-auto mb-8 w-full max-w-md">
                <div className="relative flex w-fit items-center rounded-full border p-1.5">
                  <button className="relative px-4 py-2 z-0">
                    <div
                      className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-white"
                      style={convertStyleStringToObject("opacity: 1;")}
                    ></div>
                    <span className="relative block text-sm font-medium duration-200 text-white delay-100 dark:text-black">
                      Yearly
                      <span className="ml-2 text-xs font-bold text-green-500">
                        Save 60%
                      </span>
                    </span>
                  </button>
                  <button className="relative px-4 py-2 z-0">
                    <div
                      className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-white"
                      style={convertStyleStringToObject("opacity: 1;")}
                    ></div>
                    <span className="relative block text-sm font-medium duration-200 text-white delay-100 dark:text-black">
                      Monthly
                    </span>
                  </button>
                </div>
              </div> */}
              <div className="flex justify-center mb-6 space-x-4">
                <button
                  onClick={() => setBilling("yearly")}
                  className={`px-4 py-2 rounded-full font-semibold ${
                    billing === "yearly"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Yearly{" "}
                  <span className="text-green-600 text-sm ml-1">Save 60%</span>
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
              <div className="mx-auto mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg border bg-card text-card-foreground flex flex-col shadow-none md:col-span-2">
                  <div className="flex flex-grow flex-col p-6 md:flex-row">
                    <div className="flex flex-col md:w-1/2">
                      <img
                        alt="Banner Price"
                        loading="lazy"
                        width="300"
                        height="300"
                        decoding="async"
                        data-nimg="1"
                        className="w-[80%] hidden dark:block"
                        srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner-price-dark.b1b20a53.png&amp;w=384&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner-price-dark.b1b20a53.png&amp;w=640&amp;q=75 2x"
                        src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner-price-dark.b1b20a53.png&amp;w=640&amp;q=75"
                        style={convertStyleStringToObject(
                          "color: transparent;"
                        )}
                      />
                      <img
                        alt="Banner Price"
                        loading="lazy"
                        width="300"
                        height="300"
                        decoding="async"
                        data-nimg="1"
                        className="w-[80%] block dark:hidden"
                        srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner-price-light.01e413ae.png&amp;w=384&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner-price-light.01e413ae.png&amp;w=640&amp;q=75 2x"
                        src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbanner-price-light.01e413ae.png&amp;w=640&amp;q=75"
                        style={convertStyleStringToObject(
                          "color: transparent;"
                        )}
                      />
                      <p className="text-muted-foreground text-sm my-4">
                        Get access to all features and benefits of the app. No
                        limits, no restrictions.
                      </p>
                      <div className="flex-1 flex flex-col justify-end">
                        <div
                          style={convertStyleStringToObject(
                            "opacity: 1; filter: blur(0px); will-change: transform; transform: none;"
                          )}
                        >
                          <span className="mb-4 mt-auto text-4xl font-bold">
                            {price}
                          </span>
                          <span className="text-sm font-medium text-neutral-600 dark:font-normal dark:text-neutral-300">
                            {priceText}
                          </span>
                        </div>
                        <button className="inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 group relative w-full mt-4 gap-2 overflow-hidden text-lg font-semibold tracking-tighter transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2">
                          <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black"></span>
                          Upgrade plan
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-arrow-right ml-2 h-4 w-4"
                          >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="mt-6 md:mt-0 md:w-1/2 md:pl-6">
                      <p className="mb-4 text-sm text-muted-foreground">
                        Everything in free plan plus
                      </p>
                      <div className="mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-check mr-2 h-5 w-5 text-green-500"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        <span className="text-sm text-left">
                          Unlimited note generations
                        </span>
                      </div>
                      <div className="mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-check mr-2 h-5 w-5 text-green-500"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        <span className="text-sm text-left">
                          Unlimited audio or phone calls
                        </span>
                      </div>
                      <div className="mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-check mr-2 h-5 w-5 text-green-500"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        <span className="text-sm text-left">
                          Unlimited podcasts and youtube videos
                        </span>
                      </div>
                      <div className="mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-check mr-2 h-5 w-5 text-green-500"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        <span className="text-sm text-left">
                          Unlimited quiz and flashcards
                        </span>
                      </div>
                      <div className="mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-check mr-2 h-5 w-5 text-green-500"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        <span className="text-sm text-left">
                          Support for 100+ languages
                        </span>
                      </div>
                      <div className="mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-check mr-2 h-5 w-5 text-green-500"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        <span className="text-sm text-left">
                          Best-in-className Transcription and Summarization
                        </span>
                      </div>
                      <div className="mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-check mr-2 h-5 w-5 text-green-500"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        <span className="text-sm text-left">
                          Customer support 24/7
                        </span>
                      </div>
                      <div className="mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-check mr-2 h-5 w-5 text-green-500"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        <span className="text-sm text-left">
                          Priority Access to new features
                        </span>
                      </div>
                      <div className="mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-check mr-2 h-5 w-5 text-green-500"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                        <span className="text-sm text-left">And more...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-x h-4 w-4"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
}
