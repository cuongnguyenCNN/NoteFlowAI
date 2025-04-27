"use client";
import Link from "next/link";
import { useState } from "react";
import { Notebook, AlertCircle, Zap, FileText } from "lucide-react";
import Quiz from "../../components/quiz";
import FlashcardQuiz from "../../components/flashcard";
const tabs = [
  { label: "Note", icon: <Notebook size={18} />, id: "note" },
  { label: "Quiz", icon: <AlertCircle size={18} />, id: "quiz" },
  { label: "Flashcards", icon: <Zap size={18} />, id: "flashcards" },
  { label: "Transcript", icon: <FileText size={18} />, id: "transcript" },
];
const initialQuestions = [
  {
    question: "Which blockchain will Pacific DeFi initially operate on?",
    options: ["Ethereum", "Binance Smart Chain", "Polygon", "Solana"],
    correct: 1,
  },
  {
    question: "What is the mission of Pacific DeFi?",
    options: [
      "Replace banks with DeFi platforms",
      "Offer meme coin trading",
      "Provide secure yield products for stablecoins and altcoins",
      "Create a decentralized gaming ecosystem",
    ],
    correct: 2,
  },
  {
    question:
      "What percentage of PACIFIC tokens is allocated to the liquidity pool rewards?",
    options: ["10%", "20%", "30%", "40%"],
    correct: 2,
  },
  {
    question: "Which feature is **not** part of Pacific DeFi’s product suite?",
    options: [
      "Lending & borrowing",
      "Auto-staking vaults",
      "NFT marketplace",
      "Token swap platform",
    ],
    correct: 2,
  },
  {
    question:
      "What is a key benefit of single-token auto-staking in Pacific DeFi?",
    options: [
      "Requires multi-token deposits",
      "Provides yield and spreads risk",
      "Only supports Ethereum-based tokens",
      "Generates NFTs as rewards",
    ],
    correct: 1,
  },
  {
    question: "Which network will Pacific DeFi **not** initially support?",
    options: [
      "Binance Smart Chain",
      "KuCoin Community Chain",
      "Polygon",
      "Cardano",
    ],
    correct: 3,
  },
  {
    question:
      "What percentage of profits will Pacific DeFi commit to environmental efforts?",
    options: ["1%", "2%", "5%", "10%"],
    correct: 1,
  },
  {
    question: "What is the total supply of the PACIFIC token?",
    options: ["10,000,000", "50,000,000", "100,000,000", "500,000,000"],
    correct: 2,
  },
  {
    question:
      "What type of vault in Pacific DeFi has a 3% withdrawal and 10% auto-compound fee?",
    options: [
      "Single Vault: PACIFIC",
      "Time-locked Vaults",
      "Polygon Staking Vault",
      "NFT Farming Vault",
    ],
    correct: 0,
  },
  {
    question: "Which development phase introduces the mobile app?",
    options: ["Phase 1", "Phase 2", "Phase 3", "Post-launch"],
    correct: 2,
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

export default function Note() {
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
                {activeTab === "quiz" && (
                  <Quiz initialQuestions={initialQuestions} />
                )}
                {activeTab === "note" && (
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
                              Pacific DeFi: A New Decentralized Finance
                              Ecosystem
                            </span>
                          </div>
                          <div className="flex">
                            <span
                              className="inline-block max-w-[600px] md:text-lg"
                              style={convertStyleStringToObject(
                                "opacity: 1; filter: blur(0px); will-change: transform; transform: translateY(-8px);"
                              )}
                            >
                              An overview of the Pacific DeFi project, its
                              ecosystem, phases, and features.
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
                            20 Apr 2025, 09:55 PM
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
                            id="radix-:r6m:"
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
                            <img
                              alt="pdf"
                              loading="lazy"
                              width="512"
                              height="512"
                              decoding="async"
                              data-nimg="1"
                              className="mr-1 size-5"
                              src="/_next/static/media/pdf.bc7ff215.svg"
                              style={convertStyleStringToObject(
                                "color: transparent;"
                              )}
                            />
                            <small className="text-sm font-medium leading-none">
                              PDF
                            </small>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ">
                          <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 hover:bg-red-600 text-white size-9"
                            type="button"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="radix-:r6o:"
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
                    <div
                      style={convertStyleStringToObject(
                        "opacity: 1; filter: blur(0px); will-change: transform; transform: translateY(-6px);"
                      )}
                    >
                      <div className="mt-5">
                        <div
                          className="w-full"
                          style={convertStyleStringToObject(
                            "opacity: 1; will-change: transform; transform: none;"
                          )}
                        >
                          <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full py-2 px-4 flex flex-row items-center gap-2">
                            <div className="flex flex-row items-center justify-between flex-1 gap-2">
                              <div className="flex flex-row items-center gap-2 ">
                                <img
                                  alt="PDF"
                                  loading="lazy"
                                  width="20"
                                  height="20"
                                  decoding="async"
                                  data-nimg="1"
                                  srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpdf-icon.213e54c4.png&amp;w=32&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpdf-icon.213e54c4.png&amp;w=48&amp;q=75 2x"
                                  src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpdf-icon.213e54c4.png&amp;w=48&amp;q=75"
                                  style={convertStyleStringToObject(
                                    "color: transparent;"
                                  )}
                                />
                                <small className="text-sm font-medium leading-none text-muted-foreground">
                                  Pacific-Token-White-Paper-261e477d.pdf
                                </small>
                              </div>
                              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 w-10">
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
                                  className="lucide lucide-eye"
                                >
                                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>{/* <PdfViewer fileUrl="14_HSB.pdf" /> */}</div>
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
                        aria-controls="radix-:r6r:"
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
                          <h1 id="pacific-defi-a-new-decentralized-finance-ecosystem">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#pacific-defi-a-new-decentralized-finance-ecosystem"
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
                            </Link>
                            Pacific DeFi: A New Decentralized Finance Ecosystem
                          </h1>
                          <h2 id="project-summary">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#project-summary"
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
                            </Link>
                            Project Summary
                          </h2>
                          <p>
                            Pacific DeFi aims to create a new financial
                            ecosystem that unifies the current scattered DeFi
                            landscape. The project provides an easy-to-use
                            platform by leveraging multi-asset crypto financing
                            capabilities on different blockchains. Initially,
                            Pacific DeFi will operate on the Binance Smart Chain
                            (BSC) network, with interoperability with the KuCoin
                            Community Chain (KCC) network. The project will
                            later expand to the Polygon and Ethereum
                            blockchains.
                          </p>
                          <h3 id="mission">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#mission"
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
                            </Link>
                            Mission
                          </h3>
                          <p>
                            Pacific DeFis mission is to provide highly secure
                            yield enhancement products for stablecoins and
                            altcoins, offering users the ability to earn high
                            risk-adjusted returns. The platform is designed to
                            facilitate mass crypto adoption among retail users.
                          </p>
                          <h2 id="features-of-pacific-defi">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#features-of-pacific-defi"
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
                            </Link>
                            Features of Pacific DeFi
                          </h2>
                          <ul>
                            <li>
                              <strong>Complete DeFi Ecosystem</strong>: A
                              comprehensive suite of financial services.
                            </li>
                            <li>
                              <strong>Simple UI/UX</strong>: User-friendly
                              interface for ease of use.
                            </li>
                            <li>
                              <strong>
                                Built on BSC for Speed &amp; Efficiency
                              </strong>
                              : Optimized for fast transactions.
                            </li>
                          </ul>
                          <h3 id="product-suite">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#product-suite"
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
                            </Link>
                            Product Suite
                          </h3>
                          <p>The product suite includes:</p>
                          <ul>
                            <li>
                              Single-token yield-enhancement stablecoin and
                              non-stablecoin vaults
                            </li>
                            <li>Lending &amp; borrowing services</li>
                            <li>Leveraged vaults</li>
                            <li>A launchpad for accessing top DeFi projects</li>
                          </ul>
                          <h3 id="wallet-and-token-swap-platform">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#wallet-and-token-swap-platform"
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
                            </Link>
                            Wallet and Token Swap Platform
                          </h3>
                          <p>
                            Pacific DeFi will offer a universally usable wallet
                            and token swap platform, ensuring interoperability
                            across different blockchain networks.
                          </p>
                          <h2 id="traditional-finance-vs-defi">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#traditional-finance-vs-defi"
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
                            </Link>
                            Traditional Finance vs. DeFi
                          </h2>
                          <p>
                            Traditional financial services such as payments,
                            lending, and borrowing were only available through
                            established financial institutions. The introduction
                            of blockchain technology has transformed this
                            landscape, giving rise to decentralized finance
                            (DeFi). DeFi aims to build an open-source,
                            permission-less, and transparent financial services
                            ecosystem, allowing unbanked individuals to access
                            financial services via blockchain technology.
                          </p>
                          <h3 id="blockchain-technology">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#blockchain-technology"
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
                            </Link>
                            Blockchain Technology
                          </h3>
                          <ul>
                            <li>
                              <strong>Decentralized Ledger</strong>: Unlike
                              traditional banking ledgers, blockchain is a
                              decentralized, distributed public ledger where
                              transactions are recorded in computer code.
                            </li>
                            <li>
                              <strong>Security</strong>: Data is secured through
                              cryptography, ensuring anonymity and verification
                              of payments.
                            </li>
                          </ul>
                          <h2 id="challenges-in-defi">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#challenges-in-defi"
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
                            </Link>
                            Challenges in DeFi
                          </h2>
                          <p>
                            Despite its promises, DeFi has struggled to deliver
                            accessibility in a practical way. Pacific DeFi aims
                            to address these challenges through an efficient
                            ecosystem of DeFi platforms.
                          </p>
                          <h2 id="ecosystem-development-phases">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#ecosystem-development-phases"
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
                            </Link>
                            Ecosystem Development Phases
                          </h2>
                          <p>
                            Pacific DeFis development is broken down into two
                            phases:
                          </p>
                          <h3 id="phase-1">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#phase-1"
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
                            </Link>
                            Phase 1
                          </h3>
                          <ul>
                            <li>
                              <strong>Token Allocation</strong>: 20% (20,000,000
                              $PACIFIC tokens) for public IDO, 5% (5,000,000
                              $PACIFIC tokens) for private sale.
                            </li>
                            <li>
                              <strong>Auto-Staking Protocol</strong>: The
                              backbone of Pacific DeFi’s fixed-income products,
                              relying on vault aggregation strategies to produce
                              yield for users.
                            </li>
                          </ul>
                          <h3 id="phase-2">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#phase-2"
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
                            </Link>
                            Phase 2
                          </h3>
                          <p>
                            Once the minting process is complete, Pacific DeFi
                            will focus on:
                          </p>
                          <ul>
                            <li>
                              <strong>Trading</strong>: Generating fees from
                              token swaps.
                            </li>
                            <li>
                              <strong>High-Yield Vaults</strong>: Fixed-income
                              products for retail and institutional users.
                            </li>
                            <li>
                              <strong>Lending &amp; Borrowing</strong>:
                              High-yield income through lending to vault
                              participants.
                            </li>
                            <li>
                              <strong>Launchpad</strong>: Access to promising
                              DeFi projects.
                            </li>
                          </ul>
                          <h2 id="yield-enhancement-vaults">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#yield-enhancement-vaults"
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
                            </Link>
                            Yield Enhancement Vaults
                          </h2>
                          <p>
                            Pacific DeFi will offer high-yields on stablecoins
                            and altcoins using single-token auto-staking. This
                            strategy allows users to deposit single tokens to
                            earn high yield while spreading risk across various
                            protocols.
                          </p>
                          <h3 id="lending-borrowing-and-time-deposits">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#lending-borrowing-and-time-deposits"
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
                            </Link>
                            Lending, Borrowing, and Time-Deposits
                          </h3>
                          <ul>
                            <li>
                              <strong>Lending</strong>: Users can lend funds to
                              provide leverage to High-Yield Vaults, magnifying
                              returns.
                            </li>
                            <li>
                              <strong>Time-locked Vaults</strong>: Similar to
                              traditional bank time-deposits.
                            </li>
                          </ul>
                          <h2 id="tokenomics">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#tokenomics"
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
                            </Link>
                            Tokenomics
                          </h2>
                          <ul>
                            <li>
                              <strong>Token Name</strong>: Pacific Coin
                            </li>
                            <li>
                              <strong>Total Supply</strong>: 100,000,000 PACIFIC
                            </li>
                            <li>
                              <strong>Blockchain</strong>: Binance Smart Chain
                            </li>
                            <li>
                              <strong>Symbol</strong>: PACIFIC
                            </li>
                            <li>
                              <strong>Standard</strong>: BEP-20
                            </li>
                          </ul>
                          <h3 id="token-distribution-breakdown">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#token-distribution-breakdown"
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
                            </Link>
                            Token Distribution Breakdown
                          </h3>

                          <table>
                            <thead>
                              <tr>
                                <th>Category</th>
                                <th>Percentage</th>
                                <th>Amount (Tokens)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Treasury</td>
                                <td>15%</td>
                                <td>15,000,000</td>
                              </tr>
                              <tr>
                                <td>Public Presale</td>
                                <td>20%</td>
                                <td>20,000,000</td>
                              </tr>
                              <tr>
                                <td>Project Dev/Marketing/Community</td>
                                <td>5%</td>
                                <td>5,000,000</td>
                              </tr>
                              <tr>
                                <td>Incubation Partner</td>
                                <td>5%</td>
                                <td>5,000,000</td>
                              </tr>
                              <tr>
                                <td>Development Team</td>
                                <td>20%</td>
                                <td>20,000,000</td>
                              </tr>
                              <tr>
                                <td>Private Sale</td>
                                <td>5%</td>
                                <td>5,000,000</td>
                              </tr>
                              <tr>
                                <td>Liquidity Pool Rewards</td>
                                <td>30%</td>
                                <td>30,000,000</td>
                              </tr>
                              <tr>
                                <td>
                                  <strong>Total Supply</strong>
                                </td>
                                <td>
                                  <strong>100%</strong>
                                </td>
                                <td>
                                  <strong>100,000,000</strong>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <h3 id="fee-breakdown-for-liquidity-pools">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#fee-breakdown-for-liquidity-pools"
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
                            </Link>
                            Fee Breakdown for Liquidity Pools
                          </h3>

                          <table>
                            <thead>
                              <tr>
                                <th>Vault Type</th>
                                <th>Withdrawal Fee</th>
                                <th>Auto-compound Fee</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Single Vault: PACIFIC</td>
                                <td>3%</td>
                                <td>10%</td>
                              </tr>
                              <tr>
                                <td>Farming Pair: PACIFIC-BNB LP</td>
                                <td>3%</td>
                                <td>10%</td>
                              </tr>
                            </tbody>
                          </table>
                          <h2 id="environmental-commitment">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#environmental-commitment"
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
                            </Link>
                            Environmental Commitment
                          </h2>
                          <p>
                            Pacific DeFi is committed to environmental
                            sustainability, pledging to distribute 2% of profits
                            to initiatives focused on removing plastic from the
                            Pacific Ocean.
                          </p>
                          <h2 id="road-map">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#road-map"
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
                            </Link>
                            Road Map
                          </h2>
                          <h3 id="phase-1-1">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#phase-1-1"
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
                            </Link>
                            Phase 1
                          </h3>
                          <ul>
                            <li>Platform design and protocol development</li>
                            <li>Internal audit of smart contract code</li>
                            <li>Whitepaper release</li>
                            <li>Private Sale and community building</li>
                            <li>Pre-sale via IDO</li>
                            <li>Go live on DEX PancakeSwap</li>
                          </ul>
                          <h3 id="phase-2-1">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#phase-2-1"
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
                            </Link>
                            Phase 2
                          </h3>
                          <ul>
                            <li>
                              Development of high-yield auto-staking vaults
                            </li>
                            <li>Audit for liquidity pools</li>
                            <li>Introduction of a swap function</li>
                            <li>Launchpad for new projects</li>
                          </ul>
                          <h3 id="phase-3">
                            <Link
                              className="anchor"
                              aria-hidden="true"
                              href="#phase-3"
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
                            </Link>
                            Phase 3
                          </h3>
                          <ul>
                            <li>Mobile app development</li>
                            <li>Community feedback and improvements</li>
                            <li>Release of the mobile app</li>
                          </ul>
                          <h2 id="conclusion">
                            <Link
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
                            </Link>
                            Conclusion
                          </h2>
                          <p>
                            Pacific DeFi aims to bridge the gap between
                            traditional finance and DeFi, providing a secure and
                            user-friendly platform for all users, regardless of
                            their expertise in blockchain or cryptocurrency. The
                            project is designed to evolve with the technology,
                            ensuring long-term sustainability and growth.
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
                {activeTab === "flashcards" && <FlashcardQuiz></FlashcardQuiz>}
              </div>
              <div className="flex items-center p-6 pt-0"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
