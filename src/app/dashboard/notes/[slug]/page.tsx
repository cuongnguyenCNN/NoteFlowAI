"use client";
import Link from "next/link";
import { useState } from "react";
import { Notebook, AlertCircle, Zap, FileText } from "lucide-react";
import Quiz from "@/src/app/components/quiz";
import FlashcardQuiz from "@/src/app/components/flashcard";
const tabs = [
  { label: "Note", icon: <Notebook size={18} />, id: "note" },
  { label: "Quiz", icon: <AlertCircle size={18} />, id: "quiz" },
  { label: "Flashcards", icon: <Zap size={18} />, id: "flashcards" },
  { label: "Transcript", icon: <FileText size={18} />, id: "transcript" },
];
const initialQuestions = [
  {
    question:
      "What is the core method used in NoteFlow AI to improve memory retention?",
    options: [
      "NoteFlow Technique",
      "Repetition Looping",
      "Flashcard Sorting",
      "AI Prediction Model",
    ],
    correct: 0,
  },
  {
    question: "Which type of content can NoteFlow AI convert into notes?",
    options: [
      "Only PDFs",
      "Only Audio",
      "Recordings, podcasts, and PDFs",
      "Textbooks only",
    ],
    correct: 2,
  },
  {
    question:
      "What is the primary purpose of the 'Mind Mapping' feature in NoteFlow AI?",
    options: [
      "To create visual aesthetics",
      "To enhance clarity and idea retention",
      "To generate random ideas",
      "To decorate the notes",
    ],
    correct: 1,
  },
  {
    question:
      "What additional support does each note come with in NoteFlow AI?",
    options: [
      "Voice assistant",
      "Search engine optimization",
      "Chatbot for Q&A and insights",
      "Translation plugin",
    ],
    correct: 2,
  },
  {
    question:
      "Which feature allows users to turn content into flashcards or quizzes?",
    options: [
      "Mind Mapping",
      "Chatbot Assistance",
      "Automatic Summaries",
      "Note Comparison",
    ],
    correct: 2,
  },
  {
    question: "How does NoteFlow AI differ from Coconote?",
    options: [
      "It has a darker interface",
      "It focuses on collaborative features",
      "It emphasizes team tasks",
      "It provides AI-driven summaries and chatbot assistance",
    ],
    correct: 3,
  },
  {
    question:
      "What is a unique selling point of Turbolearn AI compared to NoteFlow AI?",
    options: [
      "Quiz generation",
      "Mind Mapping",
      "Adaptive learning paths",
      "Offline mode",
    ],
    correct: 2,
  },
  {
    question:
      "Which feature allows users to visualize relationships between ideas in NoteFlow AI?",
    options: ["Chatbot", "Note Sorting", "Mind Mapping", "Memory Path Builder"],
    correct: 2,
  },
  {
    question: "How does NoteFlow AI enhance accessibility?",
    options: [
      "Offline-only use",
      "App-only access",
      "Cross-platform syncing",
      "Requires browser extension",
    ],
    correct: 2,
  },
  {
    question: "Why is NoteFlow AI recommended for students and professionals?",
    options: [
      "It includes team management tools",
      "It simplifies studying and enhances retention",
      "It tracks physical notebooks",
      "It syncs with calendars",
    ],
    correct: 1,
  },
];

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
// export type Note = {
//     id: string;
//     user_id: string;
//     folder_id?: string;
//     title: string;
//     content: string;
//     summary?: string;
//     mindmap_data?: any;
//     flashcards?: any;
//     transcript?: string;
//     translated_content?: string;
//     language: string;
//     created_at: string;
//     updated_at: string;
//     deleted: boolean;
//     is_premium: boolean;
//     word_count?: number;
//   };

// { params }: { params: { slug: string } }
export default function NoteDetail() {
  const [activeTab, setActiveTab] = useState("note");
  return (
    <>
      <div className="flex items-center gap-3">
        <button className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 size-9 hidden max-[866px]:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-panel-left-open"
          >
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M9 3v18"></path>
            <path d="m14 9 3 3-3 3"></path>
          </svg>
        </button>
        <nav aria-label="breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
            <li className="inline-flex items-center gap-1.5">
              <li className="inline-flex items-center gap-1.5">
                <Link
                  className="flex items-center hover:text-primary"
                  href="/dashboard"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-folder-open mr-1"
                  >
                    <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  All notes
                </Link>
              </li>
            </li>
            <li
              role="presentation"
              aria-hidden="true"
              className="[&amp;>svg]:size-3.5"
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
                className="lucide lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span
                role="link"
                aria-disabled="true"
                aria-current="page"
                className="font-normal text-foreground"
              >
                My notes
              </span>
            </li>
          </ol>
        </nav>
      </div>
      <div className="w-full grid grid-cols-4 max-[600px]:grid-cols-2 gap-2 bg-secondary rounded-md p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center px-4 py-2 text-sm font-medium w-full gap-2 transition-all rounded-md text-sm font-medium ring-offset-background
            ${
              activeTab === tab.id
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "note" && (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm relative">
          <div
            dir="ltr"
            className="relative overflow-hidden h-[calc(100dvh-10rem)]"
            style={convertStyleStringToObject(
              "position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;"
            )}
          >
            <div
              data-radix-scroll-area-viewport=""
              className="h-full w-full rounded-[inherit]"
              style={convertStyleStringToObject("overflow: hidden scroll;")}
            >
              <div
                style={convertStyleStringToObject(
                  "min-width: 100%; display: table;"
                )}
              >
                <div className="flex flex-col space-y-1.5 p-6"></div>
                <div className="p-6 pt-0">
                  <div className="flex flex-col mx-auto w-full max-w-2xl space-y-3 pt-5 max-[600px]:pt-0">
                    <section id="hero">
                      <div className="gap-2 flex justify-between">
                        <div className="flex-col flex flex-1 space-y-1.5">
                          <div className="flex">
                            <span
                              className="inline-block text-2xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                              style={convertStyleStringToObject(
                                "opacity: 1; filter: blur(0px); will-change: transform; transform: translateY(-8px);"
                              )}
                            >
                              Welcome to NoteFlow AI: Your Study and Work
                              Companion
                            </span>
                          </div>
                          <div className="flex">
                            <span
                              className="inline-block max-w-[600px] md:text-lg"
                              style={convertStyleStringToObject(
                                "opacity: 1; filter: blur(0px); will-change: transform; transform: translateY(-8px);"
                              )}
                            >
                              A powerful tool for transforming recordings and
                              PDFs into organized notes using the NoteFlow
                              technique.
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          style={convertStyleStringToObject(
                            "opacity: 1; filter: blur(0px); will-change: transform; transform: translateY(-6px);"
                          )}
                        >
                          <small className="text-sm font-medium leading-none text-muted-foreground">
                            10 Nov 2024, 01:08 AM
                          </small>
                        </div>
                      </div>
                    </section>
                    <section>
                      <div className="flex max-[600px]:flex-col max-[600px]:items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 flex items-center rounded min-w-[120px]"
                            type="button"
                            id="radix-:r1k:"
                            aria-haspopup="menu"
                            aria-expanded="false"
                            data-state="closed"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-folder-plus mr-1 "
                            >
                              <path d="M12 10v6"></path>
                              <path d="M9 13h6"></path>
                              <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                            </svg>
                            <small className="text-sm font-medium leading-none">
                              Add folder
                            </small>
                          </button>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-text mr-1 "
                            >
                              <path d="M17 6.1H3"></path>
                              <path d="M21 12.1H3"></path>
                              <path d="M15.1 18H3"></path>
                            </svg>
                            <small className="text-sm font-medium leading-none">
                              Copy text
                            </small>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ">
                          <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 hover:bg-red-600 text-white size-9"
                            type="button"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="radix-:r1m:"
                            data-state="closed"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="lucide lucide-trash2"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                              <line x1="10" x2="10" y1="11" y2="17"></line>
                              <line x1="14" x2="14" y1="11" y2="17"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </section>
                    <div className="h-1"></div>
                    <div className="flex items-center gap-2 justify-end">
                      <button className="group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium text-primary-foreground transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:[filter:blur(calc(0.8*1rem))] bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] flex-1">
                        <svg
                          className="mr-2 "
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M7 8H4c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h3c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2ZM20.8 7h-3.6c-.66 0-1.2-.54-1.2-1.2V4.2c0-.66.54-1.2 1.2-1.2h3.6c.66 0 1.2.54 1.2 1.2v1.6c0 .66-.54 1.2-1.2 1.2ZM20.8 14.5h-3.6c-.66 0-1.2-.54-1.2-1.2v-1.6c0-.66.54-1.2 1.2-1.2h3.6c.66 0 1.2.54 1.2 1.2v1.6c0 .66-.54 1.2-1.2 1.2Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M9 5h7"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M12.5 5v13c0 1.1.9 2 2 2H16"
                            fill="#fff"
                          ></path>
                          <path
                            d="M12.5 5v13c0 1.1.9 2 2 2H16M12.5 12.5H16"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M20.8 22h-3.6c-.66 0-1.2-.54-1.2-1.2v-1.6c0-.66.54-1.2 1.2-1.2h3.6c.66 0 1.2.54 1.2 1.2v1.6c0 .66-.54 1.2-1.2 1.2Z"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                        View mind map
                      </button>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-secondary-foreground/20 h-11 rounded-md px-8 flex-1"
                        type="button"
                        aria-haspopup="dialog"
                        aria-expanded="false"
                        aria-controls="radix-:r1p:"
                        data-state="closed"
                      >
                        <svg
                          className="mr-2 "
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m19.06 18.67-2.14-4.27-2.14 4.27M15.17 17.91h3.52"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M16.92 22a5.08 5.08 0 1 1 .002-10.162A5.08 5.08 0 0 1 16.92 22ZM5.02 2h3.92c2.07 0 3.07 1 3.02 3.02v3.92c.05 2.07-.95 3.07-3.02 3.02H5.02C3 12 2 11 2 8.93V5.01C2 3 3 2 5.02 2ZM9.01 5.85H4.95M6.97 5.17v.68"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M7.99 5.84c0 1.75-1.37 3.17-3.05 3.17"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                          <path
                            d="M9.01 9.01c-.73 0-1.39-.39-1.85-1.01M2 15c0 3.87 3.13 7 7 7l-1.05-1.75M22 9c0-3.87-3.13-7-7-7l1.05 1.75"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                        Translate
                      </button>
                    </div>
                    <div className="h-5"></div>
                    <section
                      id="note-content"
                      className=""
                      data-color-mode="light"
                    >
                      <div
                        style={convertStyleStringToObject(
                          "opacity: 1; filter: blur(0px); will-change: transform; transform: translateY(-6px);"
                        )}
                      >
                        <div className="wmde-markdown wmde-markdown-color markdown !bg-transparent">
                          <h1 id="welcome-to-feynman-ai-your-study-and-work-companion">
                            <a
                              className="anchor"
                              aria-hidden="true"
                              href="#welcome-to-feynman-ai-your-study-and-work-companion"
                            >
                              <svg
                                className="octicon octicon-link"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                height="16"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                                ></path>
                              </svg>
                            </a>
                            Welcome to NoteFlow AI: Your Study and Work
                            Companion
                          </h1>
                          <p>
                            NoteFlow AI utilizes advanced AI technology to
                            convert recordings, podcasts, and PDFs into clear,
                            organized notes. By applying the NoteFlow technique,
                            users can understand and retain complex ideas
                            through simple explanations, making learning more
                            effective.
                          </p>
                          <h2 id="key-features">
                            <a
                              className="anchor"
                              aria-hidden="true"
                              href="#key-features"
                            >
                              <svg
                                className="octicon octicon-link"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                height="16"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                                ></path>
                              </svg>
                            </a>
                            Key Features
                          </h2>

                          <table>
                            <thead>
                              <tr>
                                <th>Feature</th>
                                <th>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <strong>
                                    Learn with the NoteFlow Technique
                                  </strong>
                                </td>
                                <td>
                                  This method aids memory retention by
                                  encouraging users to explain concepts simply,
                                  as if teaching someone else.
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Automatic Summaries</strong>
                                </td>
                                <td>
                                  Instantly summarizes lectures, meetings,
                                  YouTube videos, and PDFs into study guides,
                                  flashcards, or quizzes.
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Mind Mapping</strong>
                                </td>
                                <td>
                                  Visualizes ideas and connections for enhanced
                                  clarity and retention.
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Chatbot Assistance</strong>
                                </td>
                                <td>
                                  Each note includes a chatbot that answers
                                  questions and highlights important insights.
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Cross-Platform Access</strong>
                                </td>
                                <td>
                                  Sync notes between app and web for access
                                  anytime, anywhere.
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>
                                    Easy Sharing &amp; Organization
                                  </strong>
                                </td>
                                <td>
                                  Share notes with friends or colleagues and
                                  organize them in folders for better
                                  management.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <h2 id="comparison-with-other-apps">
                            <a
                              className="anchor"
                              aria-hidden="true"
                              href="#comparison-with-other-apps"
                            >
                              <svg
                                className="octicon octicon-link"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                height="16"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                                ></path>
                              </svg>
                            </a>
                            Comparison with Other Apps
                          </h2>
                          <p>
                            NoteFlow AI stands out as a powerful alternative to
                            other note-taking applications. Below is a
                            comparison with similar apps:
                          </p>

                          <table>
                            <thead>
                              <tr>
                                <th>App Name</th>
                                <th>Key Features</th>
                                <th>Unique Selling Point</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <strong>NoteFlow AI</strong>
                                </td>
                                <td>NoteFlow Technique, Mind Mapping</td>
                                <td>
                                  AI-driven summaries and chatbot assistance
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Coconote</strong>
                                </td>
                                <td>Collaborative notes, cloud storage</td>
                                <td>Focus on team collaboration</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Turbolearn AI</strong>
                                </td>
                                <td>Adaptive learning paths</td>
                                <td>Personalized learning experience</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Quizlet</strong>
                                </td>
                                <td>Flashcards, games</td>
                                <td>
                                  Extensive library of user-generated content
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <h2 id="conclusion">
                            <a
                              className="anchor"
                              aria-hidden="true"
                              href="#conclusion"
                            >
                              <svg
                                className="octicon octicon-link"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                height="16"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                                ></path>
                              </svg>
                            </a>
                            Conclusion
                          </h2>
                          <p>
                            NoteFlow AI is a powerful tool that enhances the
                            study and work experience by transforming complex
                            information into easily digestible notes. Its unique
                            features, such as the NoteFlow technique, automatic
                            summaries, and chatbot assistance, make it an
                            invaluable resource for students and professionals
                            alike.
                          </p>
                          <h3 id="recommendation">
                            <a
                              className="anchor"
                              aria-hidden="true"
                              href="#recommendation"
                            >
                              <svg
                                className="octicon octicon-link"
                                viewBox="0 0 16 16"
                                version="1.1"
                                width="16"
                                height="16"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
                                ></path>
                              </svg>
                            </a>
                            Recommendation
                          </h3>
                          <p>
                            For anyone looking to improve their learning
                            efficiency and retention, I highly recommend
                            downloading NoteFlow AI. It not only simplifies the
                            study process but also provides a comprehensive
                            platform for organizing and sharing knowledge.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
                <div className="flex items-center p-6 pt-0"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeTab === "quiz" && (
        <Quiz initialQuestions={initialQuestions}></Quiz>
      )}
      {activeTab === "flashcards" && <FlashcardQuiz></FlashcardQuiz>}
    </>
  );
}
