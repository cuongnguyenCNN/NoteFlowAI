"use client";
import Link from "next/link";
import "../../css/21527cccdd6ccf0f.css";
import "../../css/b81a822ef496e877.css";
import "../../css/be7c40c9332f48ab.css";
import YoutubeModal from "../components/youtubemodal";
import { useNotes } from "../../contexts/notescontext";
import { useState } from "react";
import { useFolders } from "@/src/contexts/folderscontext";
const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

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
  const { notes, updateNote, fetchNotes } = useNotes();
  const { folders } = useFolders();
  const [openAddfolder, setOpenAddFolder] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  // const [showContent, setShowContent] = useState("");
  // const saveContent = async () => {
  //   const response = await fetch("api/getData");
  //   const data = await response.json();
  //   setShowContent(data.text);
  // };

  return (
    <>
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
          className="h-full w-full rounded-[inherit] overflow-x-auto"
          style={convertStyleStringToObject("overflow: hidden scroll;")}
        >
          <div
            style={convertStyleStringToObject(
              "min-width: 100%; display: table;"
            )}
          >
            <div className=" flex flex-col gap-3 overflow-hidden">
              {notes &&
                notes.map((note, index) => (
                  <li
                    key={index}
                    className="list-none relative overflow-visible "
                    style={convertStyleStringToObject(" height: auto;")}
                  >
                    <Link href="/dashboard/notes">
                      <div className="rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer hover:shadow-lg transition-all duration-200 group">
                        <div className="p-6 py-4 flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="scroll-m-20 text-xl tracking-tight font-bold">
                              {note.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {note.content}
                            </p>
                            <div className="flex max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-2 justify-between items-center mt-2">
                              <div className="relative flex items-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setOpenAddFolder(!openAddfolder);
                                    setSelectedNoteId(note.id);
                                  }}
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
                                    {folders.find(
                                      (f) => f.id === note.folder_id
                                    )?.name || "Add folder"}
                                  </small>
                                </button>
                                {openAddfolder &&
                                  selectedNoteId === note.id && (
                                    <div
                                      className=" absolute top-full left-0 mt-2 w-48 bg-white border rounded shadow z-50
        transition-all duration-200 ease-out origin-top scale-95 animate-in"
                                    >
                                      <p className="px-4 py-2 font-semibold text-sm border-b">
                                        Add folder
                                      </p>
                                      {folders.map((folder) => (
                                        <div
                                          key={folder.id}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            updateNote(note.id, {
                                              folder_id: folder.id,
                                            }).then(() => {
                                              fetchNotes(
                                                localStorage.getItem(
                                                  "userId"
                                                ) ?? ""
                                              );
                                              setOpenAddFolder(false);
                                              setSelectedNoteId(null);
                                            });
                                          }}
                                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                        >
                                          📁 {folder.name}
                                        </div>
                                      ))}
                                    </div>
                                  )}
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
                                {formatDate(note.created_at)}
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
                    {/* Folder menu riêng cho mỗi note */}
                  </li>
                ))}
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
                          Pacific DeFi: A New Decentralized Finance Ecosystem
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          An overview of the Pacific DeFi project, its
                          ecosystem, phases, and features.
                        </p>
                        <div className="flex max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-2 justify-between items-center mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setOpenAddFolder(!openAddfolder);
                              }}
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
                          Bodyweight vs. Barbells: Which Training Method is Best
                          for You?
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          A detailed comparison of calisthenics and
                          weightlifting, exploring their pros, cons, and
                          effectiveness for different fitness goals.
                        </p>
                        <div className="flex max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-2 justify-between items-center mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setOpenAddFolder(!openAddfolder);
                              }}
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
                {openAddfolder && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded shadow z-10">
                    <p className="px-4 py-2 font-semibold text-sm border-b">
                      Add folder
                    </p>
                    {folders.map((folder) => (
                      <div
                        key={folder.id}
                        onClick={() => {
                          setOpenAddFolder(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      >
                        📁 {folder.name}
                      </div>
                    ))}
                  </div>
                )}
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
                          Welcome to NoteFlow AI: Your Study and Work Companion
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          A powerful tool for transforming recordings and PDFs
                          into organized notes using the NoteFlow technique.
                        </p>
                        <div className="flex max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-2 justify-between items-center mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setOpenAddFolder(!openAddfolder);
                              }}
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
    </>
  );
}
