"use client";
import Link from "next/link";
import "../../css/21527cccdd6ccf0f.css";
import "../../css/b81a822ef496e877.css";

import "../../css/be7c40c9332f48ab.css";
import YoutubeModal from "../components/youtubemodal";
import { useState } from "react";
import SideBar from "./sidebar";
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
export default function Dashboard() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex">
      <div className="transition-all w-full h-full  flex flex-col  duration-400 pl-[272px] max-[866px]:pl-0 max-tablet:pl-0">
        <div className="flex w-full flex-col px-8 max-[600px]:px-4 !flex-row pl-0">
          <div className="w-full py-6 flex flex-col mx-8 max-[600px]:mx-0 h-screen">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setOpenSidebar(true)}
                  className="items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 size-9 hidden max-[866px]:flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-panel-left-open"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                    <path d="M9 3v18"></path>
                    <path d="m14 9 3 3-3 3"></path>
                  </svg>
                </button>
                {openSidebar && <SideBar></SideBar>}
                <nav aria-label="breadcrumb">
                  <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                    <li className="inline-flex items-center gap-1.5">
                      <Link
                        href="/dashboard"
                        className="transition-colors hover:text-foreground flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-folder-open mr-2"
                        >
                          <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        All notes
                      </Link>
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
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
              <button className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 flex items-center gap-2"></button>
            </div>
            <h3 className="scroll-m-20 text-2xl tracking-tight font-bold mt-2">
              New note
            </h3>
            <p className="text-sm text-muted-foreground">
              Record your thoughts, ideas, and tasks in a note. You can also add
            </p>

            <YoutubeModal></YoutubeModal>
            <h3 className="scroll-m-20 text-2xl tracking-tight font-bold mb-2 mt-7">
              My notes
            </h3>
            <div
              dir="ltr"
              className="relative overflow-hidden flex-1 pr-4"
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
                  <div className=" flex flex-col gap-3 overflow-hidden">
                    <li
                      className="list-none"
                      style={convertStyleStringToObject(
                        "overflow: hidden; height: auto;"
                      )}
                    >
                      <Link href="/dashboard/notes">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer hover:shadow-lg transition-all duration-200 group">
                          <div className="p-6 py-4 flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="scroll-m-20 text-xl tracking-tight font-bold">
                                Pacific DeFi: A New Decentralized Finance
                                Ecosystem
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                An overview of the Pacific DeFi project, its
                                ecosystem, phases, and features.
                              </p>
                              <div className="flex max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-2 justify-between items-center mt-2">
                                <div className="flex items-center gap-2">
                                  <button
                                    className="flex items-center"
                                    type="button"
                                    id="radix-:r16:"
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
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
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
                                <p className="text-xs text-muted-foreground">
                                  20 Apr 2025, 09:55 PM
                                </p>
                              </div>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-chevron-right ml-3 h-4 w-4 transition-transform duration-150 group-hover:translate-x-2"
                            >
                              <path d="m9 18 6-6-6-6"></path>
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li
                      className="list-none"
                      style={convertStyleStringToObject(
                        "overflow: hidden; height: auto;"
                      )}
                    >
                      <Link href="/dashboard/notes">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer hover:shadow-lg transition-all duration-200 group">
                          <div className="p-6 py-4 flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="scroll-m-20 text-xl tracking-tight font-bold">
                                Bodyweight vs. Barbells: Which Training Method
                                is Best for You?
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                A detailed comparison of calisthenics and
                                weightlifting, exploring their pros, cons, and
                                effectiveness for different fitness goals.
                              </p>
                              <div className="flex max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-2 justify-between items-center mt-2">
                                <div className="flex items-center gap-2">
                                  <button
                                    className="flex items-center"
                                    type="button"
                                    id="radix-:r19:"
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
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
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
                                      className="mr-1"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        fill="red"
                                        d="M17 4H7C4 4 2 6 2 9v6c0 3 2 5 5 5h10c3 0 5-2 5-5V9c0-3-2-5-5-5zm-3.11 9.03l-2.47 1.48c-1 .6-1.82.14-1.82-1.03v-2.97c0-1.17.82-1.63 1.82-1.03l2.47 1.48c.95.58.95 1.5 0 2.07z"
                                      ></path>
                                    </svg>
                                    <small className="text-sm font-medium leading-none">
                                      Youtube video
                                    </small>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  20 Apr 2025, 09:50 PM
                                </p>
                              </div>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-chevron-right ml-3 h-4 w-4 transition-transform duration-150 group-hover:translate-x-2"
                            >
                              <path d="m9 18 6-6-6-6"></path>
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li
                      className="list-none"
                      style={convertStyleStringToObject(
                        "overflow: hidden; height: auto;"
                      )}
                    >
                      <Link href="/dashboard/notes/0">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer hover:shadow-lg transition-all duration-200 group">
                          <div className="p-6 py-4 flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="scroll-m-20 text-xl tracking-tight font-bold">
                                Welcome to NoteFlow AI: Your Study and Work
                                Companion
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                A powerful tool for transforming recordings and
                                PDFs into organized notes using the NoteFlow
                                technique.
                              </p>
                              <div className="flex max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-2 justify-between items-center mt-2">
                                <div className="flex items-center gap-2">
                                  <button
                                    className="flex items-center"
                                    type="button"
                                    id="radix-:r1c:"
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
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
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
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
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
                                <p className="text-xs text-muted-foreground">
                                  10 Nov 2024, 01:08 AM
                                </p>
                              </div>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-chevron-right ml-3 h-4 w-4 transition-transform duration-150 group-hover:translate-x-2"
                            >
                              <path d="m9 18 6-6-6-6"></path>
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
