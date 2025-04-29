"use client";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProfileModal from "../components/profilemodal";
import PricingModal from "../components/pricingModal";
import { getCookie } from "cookies-next";
import { useNotes } from "../../contexts/notescontext";
import { useFolders } from "@/src/contexts/folderscontext";
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
type GoogleUser = {
  name: string;
  picture: string;
  email: string;
};
type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const MAX_FREE_NOTES = 3;
export default function SideBar({ isOpen, toggleSidebar }: SidebarProps) {
  const { notes, fetchNotes } = useNotes();
  const { folders, fetchFolders, createFolder } = useFolders();
  // const [notes1, setNotes] = useState<Note[]>([]);
  const [user, setUsers] = useState<GoogleUser>();
  const [showModal, setShowModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [openPricingModal, setOpenPricingModal] = useState(false);
  const handleCreateFolder = async () => {
    if (newFolderName.trim() === "") return;
    createFolder({
      user_id: localStorage.getItem("userId") ?? "",
      name: newFolderName,
    });
    setNewFolderName("");
    setShowModal(false);
  };
  // async function fetchFolders() {
  //   const userId = localStorage.getItem("userId");
  //   const res = await fetch(`/api/folders/list?userId=${userId}`);
  //   const data = await res.json();
  //   setFolders(data.folders);
  // }
  // async function fetchNotes() {
  //   debugger;
  //   const userId = localStorage.getItem("userId");
  //   const res = await fetch(`/api/notes/list?userId=${userId}`);
  //   const data = await res.json();
  //   setNotes(data.notes);
  // }

  // async function createFolder() {
  //   const userId = localStorage.getItem("userId");
  //   if (!newFolderName.trim()) return;

  //   await fetch("/api/folders/create", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ userId: userId, name: newFolderName }),
  //   });

  //   setNewFolderName("");
  //   await fetchFolders(); // Load lại danh sách mới
  // }

  useEffect(() => {
    // ⚡ Check cookie trước
    if (typeof window !== "undefined") {
      const token = getCookie("google-videobridge-auth-token");
      if (token) {
        const user: GoogleUser = jwtDecode(token as string);
        setUsers(user);
      } else {
        console.warn("Không tìm thấy token_user trong localStorage");
      }
    }
    fetchFolders(localStorage.getItem("userId") ?? "");
    fetchNotes(localStorage.getItem("userId") ?? "");
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  return (
    <div
      className={`
      fixed h-full z-50 w-[272px]  duration-300  bg-background max-tablet:w-[80px] py-4 flex flex-col overflow-hidden transition-all duration-400 border-r border-zinc-200  dark:border-zinc-800
      
      ${isOpen ? "left-0" : "left-[-272px]"}
      w-[272px] max-tablet:w-[80px]
    `}
      style={{ background: "white" }}
    >
      <div className="flex justify-center mb-7">
        <Link href="/" className="flex items-center gap-2">
          <h4 className="scroll-m-20 tracking-tight text-2xl font-black">
            Noteflow AI
          </h4>
        </Link>
        <button
          onClick={toggleSidebar}
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
            className="lucide lucide-panel-left-close"
          >
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M9 3v18"></path>
            <path d="m16 15-3-3 3-3"></path>
          </svg>
        </button>
      </div>
      <small className="text-sm leading-none mb-2 font-bold flex items-center mx-4">
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
          className="lucide lucide-folder-tree mr-2"
        >
          <path d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"></path>
          <path d="M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z"></path>
          <path d="M3 5a2 2 0 0 0 2 2h3"></path>
          <path d="M3 3v13a2 2 0 0 0 2 2h3"></path>
        </svg>
        Folders
      </small>
      <div className="flex-1 overflow-y-auto">
        <div
          dir="ltr"
          className="relative overflow-hidden"
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
              <div className="transition-all duration-200 flex-1  h-fit pb-12 mx-4">
                <div className="flex-1 flex flex-col gap-1 ">
                  <button className="inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 w-full justify-between">
                    <div className="flex items-center text-xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
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
                    </div>
                    <small className="font-medium text-muted-foreground text-xs">
                      (0)
                    </small>
                  </button>
                  <ul>
                    {folders &&
                      folders.map((folder) => (
                        <li
                          key={folder.id}
                          className="list-none"
                          style={convertStyleStringToObject(
                            "overflow: hidden; height: auto;"
                          )}
                        >
                          <button className="inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full justify-between">
                            <div className="flex items-center text-xs">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-folder-closed mr-2"
                              >
                                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                                <path d="M2 10h20"></path>
                              </svg>
                              {folder.name}
                            </div>
                            <small className="font-medium text-muted-foreground text-xs">
                              (0)
                            </small>
                          </button>
                        </li>
                      ))}
                  </ul>
                  <div className="absolute bottom-0 left-0 px-4 w-full">
                    <button
                      onClick={() => setShowModal(true)}
                      className="inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full justify-start bottom-0 left-0"
                    >
                      <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 12h12M12 18V6"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      Create new folder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, .8)",
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black\/80 bg-opacity-30 "
        >
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              ✖️
            </button>
            <h3 className="text-lg font-semibold mb-2">Create new folder</h3>
            <p className="text-sm text-gray-500 mb-4">
              Create a new folder to organize your notes
            </p>
            <input
              ref={inputRef}
              type="text"
              className="w-full px-4 py-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Enter folder name"
              value={newFolderName}
              maxLength={25}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <div className="text-right text-sm text-gray-400 mb-4">
              {newFolderName.length}/25
            </div>
            <button
              onClick={handleCreateFolder}
              style={{ background: "black" }}
              className="w-full  text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Create
            </button>
          </div>
        </div>
      )}
      <div className="w-full justify-center items-center flex gap-5">
        <Link target="_blank" href="mailto:cuongnguyen71195@gmail.com">
          <button className="active:scale-110 transition-all duration-100">
            <div className="flex flex-col items-center">
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
                className="lucide lucide-message-circle-question"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <path d="M12 17h.01"></path>
              </svg>
              <small className="font-medium text-[10px]">Support</small>
            </div>
          </button>
        </Link>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full mb-4 mt-2"
      ></div>
      <div
        style={convertStyleStringToObject(
          "opacity: 1; filter: blur(0px); will-change: transform; transform: translateY(-6px);"
        )}
      >
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-3 mx-4">
          <div className="p-6 py-4 flex justify-center items-center flex-col px-3">
            <button
              onClick={() => setOpenPricingModal(true)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2"
            >
              <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black"></span>
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
                className="lucide lucide-crown h-4 w-4"
              >
                <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path>
                <path d="M5 21h14"></path>
              </svg>
              <p>Upgrade plan</p>
            </button>
            <small className="text-sm font-medium leading-none mt-4 text-center text-muted-foreground">
              Get more features and unlimited access
            </small>
            <div className="w-full mt-4">
              <div className="flex justify-between mb-1">
                <div className="flex items-center gap-1">
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
                    className="lucide lucide-notebook size-4"
                  >
                    <path d="M2 6h4"></path>
                    <path d="M2 10h4"></path>
                    <path d="M2 14h4"></path>
                    <path d="M2 18h4"></path>
                    <rect width="16" height="20" x="4" y="2" rx="2"></rect>
                    <path d="M16 2v20"></path>
                  </svg>
                  <span className="text-xs">
                    <span className="font-extrabold">{notes.length}</span> /{" "}
                    {MAX_FREE_NOTES} Notes free
                  </span>
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
                  className="lucide lucide-info size-4"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </div>
              <div
                role="progressbar"
                data-state="indeterminate"
                data-max="100"
                className="relative w-full overflow-hidden rounded-full bg-secondary h-1"
              >
                <div
                  data-state="indeterminate"
                  data-max="100"
                  className="h-full w-full flex-1 bg-primary transition-all"
                  style={convertStyleStringToObject(
                    "transform: translateX(-33.3333%);"
                  )}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PricingModal
        isOpen={openPricingModal}
        onClose={() => setOpenPricingModal(false)}
      />
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm mb-4 mx-4">
        <div className="p-6 py-3 flex justify-between w-full px-3">
          <div className="flex items-center flex-1 gap-2 ">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
              <img
                className="aspect-square h-full w-full"
                src={user?.picture}
              />
            </span>
            <div className="flex flex-col w-[140px]">
              <small className="text-sm font-medium leading-none truncate">
                <b> {user?.name}</b>
              </small>
              <small className="font-medium text-muted-foreground text-xs truncate">
                {user?.email}
              </small>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="active:scale-110 transition-all duration-100"
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
              className="lucide lucide-settings"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
          <ProfileModal
            isOpen={open}
            onClose={() => setOpen(false)}
            googleuser={user}
          />
        </div>
      </div>
    </div>
  );
}
