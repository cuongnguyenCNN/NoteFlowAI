"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What is NoteflowAI?",
    answer:
      "NoteflowAI uses AI to convert your notes, recordings, and PDFs into organized and searchable content.",
  },
  {
    question: "How does NoteflowAI work?",
    answer:
      "It analyzes your files and extracts key information using advanced machine learning models.",
  },
  {
    question: "Is NoteflowAI free?",
    answer:
      "We offer a free tier with limited features. Paid plans unlock more capabilities.",
  },
  {
    question: "Is there an iOS or Android app?",
    answer:
      "Yes, NoteflowAI apps are available on both App Store and Google Play.",
  },
  {
    question: "Is this legal to use in schools?",
    answer:
      "Yes, NoteflowAI complies with educational policies. Please check your institution's guidelines.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h1>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-md cursor-pointer transition hover:shadow-lg"
            onClick={() => toggle(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{faq.question}</h2>
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </div>
            {openIndex === index && (
              <p className="text-gray-600 mt-3">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
