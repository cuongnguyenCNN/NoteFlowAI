"use client"; // chỉ cần nếu bạn dùng App Router

import { useState, useRef, useEffect } from "react";
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
export default function YoutubeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUploadPdf, setIsOpenUploadPdf] = useState(false);
  const [isOpenUploadAudio, setIsOpenUploadAudio] = useState(false);
  const [isOpenUploadRecording, setIsOpenUploadRecording] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState("");
  const [language, setLanguage] = useState("Auto detect");
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const isValidYoutubeLink = (link: string) => {
    return /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/.test(link);
  };

  const handleGenerate = () => {
    if (!isValidYoutubeLink(youtubeLink)) {
      setError("Invalid YouTube video link");
    } else {
      setError("");
      alert(`Generating notes for: ${youtubeLink} in ${language}`);
      // TODO: API call or action
    }
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChangePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDeletePDF = () => {
    setSelectedFile(null);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <div className="flex items-center max-[600px]:flex-col max-[600px]:gap-3 gap-3 ">
        <button
          onClick={() => setIsOpenUploadRecording(true)}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 rounded-md px-8 mt-6 max-[600px]:mt-6 max-[600px]:w-full bg-red-500 hover:bg-red-600 text-white"
        >
          <svg
            className="mr-2 "
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M11.969 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.47-10-10-10Zm.03 14.23c-2.34 0-4.23-1.89-4.23-4.23 0-2.34 1.89-4.23 4.23-4.23 2.34 0 4.23 1.89 4.23 4.23 0 2.34-1.89 4.23-4.23 4.23Z"
              fill="currentColor"
            ></path>
          </svg>
          Record audio
        </button>
        <button
          onClick={() => setIsOpenUploadAudio(true)}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 mt-6 max-[600px]:mt-0 max-[600px]:w-full"
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
            className="lucide lucide-cloud-upload mr-2"
          >
            <path d="M12 13v8"></path>
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="m8 17 4-4 4 4"></path>
          </svg>
          Upload audio
        </button>
        <button
          onClick={() => setIsOpenUploadPdf(true)}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 mt-6 max-[600px]:mt-0 max-[600px]:w-full"
        >
          <img
            alt="PDF"
            loading="lazy"
            width="20"
            height="20"
            decoding="async"
            data-nimg="1"
            className="mr-2"
            srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpdf-icon.213e54c4.png&amp;w=32&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpdf-icon.213e54c4.png&amp;w=48&amp;q=75 2x"
            src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpdf-icon.213e54c4.png&amp;w=48&amp;q=75"
            style={convertStyleStringToObject("color: transparent;")}
          />
          Upload PDF
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-md px-8 mt-6 max-[600px]:mt-0 max-[600px]:w-full"
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
              fill="currentColor"
              d="M17 4H7C4 4 2 6 2 9v6c0 3 2 5 5 5h10c3 0 5-2 5-5V9c0-3-2-5-5-5zm-3.11 9.03l-2.47 1.48c-1 .6-1.82.14-1.82-1.03v-2.97c0-1.17.82-1.63 1.82-1.03l2.47 1.48c.95.58.95 1.5 0 2.07z"
            ></path>
          </svg>
          YouTube video
        </button>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black\/80 bg-opacity-50 z-50 flex justify-center items-center bg-black/50">
            <div
              className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
              ref={modalRef}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-3 text-2xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold mb-4">Youtube video note</h2>

              <label className="block mb-1">📎 Youtube link</label>
              <input
                type="text"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mb-1"
                placeholder="Paste Youtube link here..."
              />
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

              <label className="block mb-1">🗣️ Note language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mb-4"
              >
                <option>Auto detect</option>
                <option>🇬🇧 US English</option>
                <option>🇫🇷 French</option>
                <option>🇩🇪 German</option>
                <option>🇪🇸 Spanish</option>
                <option>🇵🇹 Portuguese</option>
                <option>🇯🇵 Japanese</option>
                <option>🇰🇷 Korean</option>
                <option>🇮🇹 Italian</option>
              </select>

              <button
                onClick={handleGenerate}
                className="w-full bg-gray-700 text-white py-2 rounded"
              >
                ✨ Generate note
              </button>
            </div>
          </div>
          {/* <div
            role="dialog"
            id="radix-:rg:"
            aria-describedby="radix-:ri:"
            aria-labelledby="radix-:rh:"
            data-state="open"
            className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
            style={convertStyleStringToObject("pointer-events: auto;")}
          >
            <div className="w-full flex flex-col items-center pt-5">
              <div className="flex flex-col items-center">
                <h3 className="scroll-m-20 text-2xl tracking-tight font-bold">
                  Youtube video note
                </h3>
              </div>
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col w-full items-start mt-5 gap-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-row items-center gap-1">
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
                      className="lucide lucide-link"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    Youtube link
                  </label>
                  <input
                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 h-12"
                    placeholder="Ex. https://www.youtube.com/watch/example"
                    value="https://www.youtube.com/watch?v=DLUDwoVKoRo"
                    name="youtubeLink"
                  />
                </div>
                <div
                  data-orientation="horizontal"
                  role="none"
                  className="shrink-0 bg-border h-[1px] w-full my-4"
                ></div>
                <div className="grid grid-cols-1 w-full gap-2 gap-y-4 mt-0">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="m19.06 18.67-2.14-4.27-2.14 4.27M15.17 17.91h3.52"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M16.92 22a5.08 5.08 0 1 1 .002-10.162A5.08 5.08 0 0 1 16.92 22ZM5.02 2h3.92c2.07 0 3.07 1 3.02 3.02v3.92c.05 2.07-.95 3.07-3.02 3.02H5.02C3 12 2 11 2 8.93V5.01C2 3 3 2 5.02 2ZM9.01 5.85H4.95M6.97 5.17v.68"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M7.99 5.84c0 1.75-1.37 3.17-3.05 3.17"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M9.01 9.01c-.73 0-1.39-.39-1.85-1.01M2 15c0 3.87 3.13 7 7 7l-1.05-1.75M22 9c0-3.87-3.13-7-7-7l1.05 1.75"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <small className="text-sm leading-none font-bold">
                        Note language
                      </small>
                    </div>
                    <button
                      className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full justify-between"
                      role="combobox"
                      aria-expanded="true"
                      type="button"
                      aria-haspopup="dialog"
                      aria-controls="radix-:r1e:"
                      data-state="open"
                    >
                      🤖 Auto detect
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
                        className="lucide lucide-chevrons-up-down ml-2 h-4 w-4 shrink-0 opacity-50"
                      >
                        <path d="m7 15 5 5 5-5"></path>
                        <path d="m7 9 5-5 5 5"></path>
                      </svg>
                    </button>
                    <div
                      data-radix-popper-content-wrapper=""
                      style={convertStyleStringToObject(
                        "position: fixed; left: 0px; top: 0px; transform: translate(135px, -128px); min-width: max-content; --radix-popper-transform-origin: 50% 347px; z-index: 50; --radix-popper-available-width: 1920px; --radix-popper-available-height: 160.5px; --radix-popper-anchor-width: 462px; --radix-popper-anchor-height: 40px;"
                      )}
                    >
                      <div
                        data-side="top"
                        data-align="center"
                        data-state="open"
                        role="dialog"
                        id="radix-:r1e:"
                        className="z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 w-full p-0"
                        style={convertStyleStringToObject(
                          "pointer-events: auto; --radix-popover-content-transform-origin: var(--radix-popper-transform-origin); --radix-popover-content-available-width: var(--radix-popper-available-width); --radix-popover-content-available-height: var(--radix-popper-available-height); --radix-popover-trigger-width: var(--radix-popper-anchor-width); --radix-popover-trigger-height: var(--radix-popper-anchor-height);"
                        )}
                      >
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
                            style={convertStyleStringToObject(
                              "overflow: hidden scroll;"
                            )}
                          >
                            <div
                              style={convertStyleStringToObject(
                                "min-width: 100%; display: table;"
                              )}
                            >
                              <div
                                className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground"
                                cmdk-root=""
                              >
                                <label
                                  cmdk-label=""
                                  id=":r1g:"
                                  style={convertStyleStringToObject(
                                    "position: absolute; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;"
                                  )}
                                ></label>
                                <div
                                  className="flex items-center border-b px-3"
                                  cmdk-input-wrapper=""
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
                                    className="lucide lucide-search mr-2 h-4 w-4 shrink-0 opacity-50"
                                  >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                  </svg>
                                  <input
                                    className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Search..."
                                    cmdk-input=""
                                    aria-autocomplete="list"
                                    role="combobox"
                                    aria-expanded="true"
                                    aria-controls=":r1f:"
                                    aria-labelledby=":r1g:"
                                    id=":r1h:"
                                    type="text"
                                    value=""
                                  />
                                </div>
                                <div
                                  className="max-h-[300px] overflow-y-auto overflow-x-hidden"
                                  cmdk-list=""
                                  role="listbox"
                                  aria-label="Suggestions"
                                  id=":r1f:"
                                  style={convertStyleStringToObject(
                                    "--cmdk-list-height: 2536.0px;"
                                  )}
                                >
                                  <div cmdk-list-sizer="">
                                    <div
                                      className="overflow-hidden p-1 text-foreground [&amp;_[cmdk-group-heading]]:px-2 [&amp;_[cmdk-group-heading]]:py-1.5 [&amp;_[cmdk-group-heading]]:text-xs [&amp;_[cmdk-group-heading]]:font-medium [&amp;_[cmdk-group-heading]]:text-muted-foreground"
                                      cmdk-group=""
                                      role="presentation"
                                      data-value="undefined"
                                    >
                                      <div cmdk-group-items="" role="group">
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r1k:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="true"
                                          data-disabled="false"
                                          data-selected="true"
                                          data-value="auto"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-100 text-primary"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🤖 Auto detect
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r1l:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="en"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇬🇧 🇺🇸 English
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r1m:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="fr"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇫🇷 French
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r1n:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="de"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇩🇪 German
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r1o:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="es"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇪🇸 Spanish
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r1p:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="pt"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇵🇹 Portuguese
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r1q:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ja"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇯🇵 Japanese
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r1r:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ko"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇰🇷 Korean
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r1s:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="it"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇮🇹 Italian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r1t:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="hi"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇮🇳 Hindi
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r1u:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ar"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇸🇦 Arabic
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r1v:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ru"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇷🇺 Russian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r20:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="zh"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇨🇳 Chinese
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r21:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="id"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇮🇩 Indonesian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r22:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="af"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇿🇦 Afrikaans
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r23:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="hy"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇦🇲 Armenian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r24:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="az"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇦🇿 Azerbaijani
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r25:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="be"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇧🇾 Belarusian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r26:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="bs"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇧🇦 Bosnian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r27:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="bg"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇧🇬 Bulgarian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r28:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ca"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🏴󠁥󠁳󠁣󠁴󠁿 Catalan
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r29:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="hr"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇭🇷 Croatian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2a:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="cs"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇨🇿 Czech
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2b:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="da"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇩🇰 Danish
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2c:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="nl"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇳🇱 Dutch
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2d:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="et"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇪🇪 Estonian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2e:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="fi"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇫🇮 Finnish
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2f:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="gl"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇪🇸 Galician
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2g:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="el"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇬🇷 Greek
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2h:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="he"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇮🇱 Hebrew
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2i:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="hu"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇭🇺 Hungarian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2j:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="is"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇮🇸 Icelandic
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2k:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="kn"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇮🇳 Kannada
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2l:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="kk"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇰🇿 Kazakh
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2m:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="lv"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇱🇻 Latvian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2n:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="lt"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇱🇹 Lithuanian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2o:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="mk"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇲🇰 Macedonian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2p:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ms"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇲🇾 Malay
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2q:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="mr"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇮🇳 Marathi
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2r:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="mi"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇳🇿 Maori
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2s:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ne"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇳🇵 Nepali
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2t:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="no"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇳🇴 Norwegian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2u:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="fa"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇮🇷 Persian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r2v:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="pl"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇵🇱 Polish
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r30:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ro"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇷🇴 Romanian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r31:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="sr"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇷🇸 Serbian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r32:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="sk"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇸🇰 Slovak
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r33:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="sl"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇸🇮 Slovenian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r34:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="sv"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇸🇪 Swedish
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r35:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="sw"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇹🇿 Swahili
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r36:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="tl"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇵🇭 Tagalog
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r37:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ta"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇮🇳 Tamil
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r38:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="th"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇹🇭 Thai
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r39:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="tr"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇹🇷 Turkish
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3a:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="uk"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇺🇦 Ukrainian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3b:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ur"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇵🇰 Urdu
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3c:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="vi"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇻🇳 Vietnamese
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3d:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="cy"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🏴󠁧󠁢󠁷󠁬󠁳󠁿 Welsh
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3e:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ab"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇬🇪 Abkhazian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3f:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="aa"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇪🇹 Afar
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3g:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="af"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇿🇦 Afrikaans
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3h:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ak"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇬🇭 Akan
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3i:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="sq"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇦🇱 Albanian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3j:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="am"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇪🇹 Amharic
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3k:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ar"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇸🇦 Arabic
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3l:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="hy"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇦🇲 Armenian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3m:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="az"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇦🇿 Azerbaijani
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3n:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ba"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇷🇺 Bashkir
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3o:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="eu"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇪🇺 Basque
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3p:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="bn"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇧🇩 Bengali
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3q:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="dz"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇧🇹 Bhutani
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3r:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="bh"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇮🇳 Bihari
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3s:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="bi"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇻🇺 Bislama
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3t:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="br"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🏴󠁥󠁳󠁣󠁴󠁿 Breton
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3u:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="bg"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇧🇬 Bulgarian
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r3v:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="my"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇲🇲 Burmese
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r40:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ca"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🏴󠁥󠁳󠁣󠁴󠁿 Catalan
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r41:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ch"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇮🇳 Chamorro
                                        </div>
                                        <div
                                          className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
                                          id=":r42:"
                                          cmdk-item=""
                                          role="option"
                                          aria-disabled="false"
                                          aria-selected="false"
                                          data-disabled="false"
                                          data-selected="false"
                                          data-value="ce"
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
                                            className="lucide lucide-check mr-2 h-4 w-4 opacity-0"
                                          >
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          🇷🇺 Chechen
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <small className="font-medium text-muted-foreground text-xs flex flex-row items-center gap-1">
                You can use AI auto-detect to detect the audio language and note
                generation language.
              </small>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2 mt-3 w-full">
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
                  className="lucide lucide-sparkles"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
                Generate note
              </button>
            </div>
            <button
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
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x h-4 w-4"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div> */}
        </>
      )}
      {isOpenUploadPdf && (
        <div className="fixed inset-0 bg-black\/80 bg-opacity-50 z-50 flex justify-center items-center bg-black/50">
          <div
            role="dialog"
            id="radix-:rs:"
            aria-describedby="radix-:ru:"
            aria-labelledby="radix-:rt:"
            data-state="open"
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
            style={convertStyleStringToObject("pointer-events: auto;")}
          >
            <div className="w-full flex flex-col items-center pt-5">
              <div className="flex flex-col items-center">
                <h3 className="scroll-m-20 text-2xl tracking-tight font-bold">
                  Upload PDF
                </h3>
              </div>
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col w-full items-start mt-5 gap-2">
                  <div className="grid w-full focus:outline-none overflow-hidden">
                    <div className="relative w-full cursor-pointer ">
                      <label
                        htmlFor="file-pdf-upload"
                        className="w-full rounded-lg duration-300 ease-in-out border-gray-300"
                        role="presentation"
                      >
                        <div className="flex flex-col items-center justify-center h-32 w-full border border-dashed bg-background rounded-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-upload text-muted-foreground"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" x2="12" y1="3" y2="15"></line>
                          </svg>
                          <p className="text-muted-foreground text-sm mt-1">
                            Drag or click to upload your PDF file
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Supported formats: pdf
                          </p>
                          <input
                            id="file-pdf-upload"
                            onChange={handleFileChangePDF}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            accept="application/pdf,.pdf"
                            type="file"
                            style={convertStyleStringToObject("display: none;")}
                          />
                        </div>
                      </label>
                    </div>
                    <div
                      className="w-full px-1"
                      aria-description="content file holder"
                    >
                      {selectedFile?.name}

                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={handleDeletePDF}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  data-orientation="horizontal"
                  role="none"
                  className="shrink-0 bg-border h-[1px] w-full my-4"
                ></div>
                <div className="grid grid-cols-1 w-full gap-2 gap-y-4 mt-0">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="m19.06 18.67-2.14-4.27-2.14 4.27M15.17 17.91h3.52"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M16.92 22a5.08 5.08 0 1 1 .002-10.162A5.08 5.08 0 0 1 16.92 22ZM5.02 2h3.92c2.07 0 3.07 1 3.02 3.02v3.92c.05 2.07-.95 3.07-3.02 3.02H5.02C3 12 2 11 2 8.93V5.01C2 3 3 2 5.02 2ZM9.01 5.85H4.95M6.97 5.17v.68"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M7.99 5.84c0 1.75-1.37 3.17-3.05 3.17"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M9.01 9.01c-.73 0-1.39-.39-1.85-1.01M2 15c0 3.87 3.13 7 7 7l-1.05-1.75M22 9c0-3.87-3.13-7-7-7l1.05 1.75"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <small className="text-sm leading-none font-bold">
                        Note language
                      </small>
                    </div>
                    <button
                      className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full justify-between"
                      role="combobox"
                      aria-expanded="false"
                      type="button"
                      aria-haspopup="dialog"
                      aria-controls="radix-:r1h:"
                      data-state="closed"
                    >
                      🤖 Auto detect
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
                        className="lucide lucide-chevrons-up-down ml-2 h-4 w-4 shrink-0 opacity-50"
                      >
                        <path d="m7 15 5 5 5-5"></path>
                        <path d="m7 9 5-5 5 5"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <small className="font-medium text-muted-foreground text-xs flex flex-row items-center gap-1">
                You can use AI auto-detect to detect the audio language and note
                generation language.
              </small>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2 mt-3 w-full">
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
                  className="lucide lucide-sparkles"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
                Generate note
              </button>
            </div>
            <button
              onClick={() => setIsOpenUploadPdf(false)}
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
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x h-4 w-4"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      )}
      {isOpenUploadAudio && (
        <div className="fixed inset-0 bg-black\/80 bg-opacity-50 z-50 flex justify-center items-center bg-black/50">
          <div
            role="dialog"
            id="radix-:rs:"
            aria-describedby="radix-:ru:"
            aria-labelledby="radix-:rt:"
            data-state="open"
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
            style={convertStyleStringToObject("pointer-events: auto;")}
          >
            <div className="w-full flex flex-col items-center pt-5">
              <div className="flex flex-col items-center">
                <h3 className="scroll-m-20 text-2xl tracking-tight font-bold">
                  Upload Audio
                </h3>
              </div>
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col w-full items-start mt-5 gap-2">
                  <div className="grid w-full focus:outline-none overflow-hidden">
                    <div className="relative w-full cursor-pointer ">
                      <div
                        className="w-full rounded-lg duration-300 ease-in-out border-gray-300"
                        role="presentation"
                      >
                        <div className="flex flex-col items-center justify-center h-32 w-full border border-dashed bg-background rounded-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-upload text-muted-foreground"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" x2="12" y1="3" y2="15"></line>
                          </svg>
                          <p className="text-muted-foreground text-sm mt-1">
                            Drag audio file here, or click to select
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Supported formats: mp3, mav, ogg, flac, aac, wma,
                            aiff
                          </p>
                        </div>
                      </div>
                      <input
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        accept="application/pdf,.pdf"
                        type="file"
                        style={convertStyleStringToObject("display: none;")}
                      />
                    </div>
                    <div
                      className="w-full px-1"
                      aria-description="content file holder"
                    >
                      <div className="rounded-xl flex items-center flex-row gap-2"></div>
                    </div>
                  </div>
                </div>
                <div
                  data-orientation="horizontal"
                  role="none"
                  className="shrink-0 bg-border h-[1px] w-full my-4"
                ></div>
                <div className="grid grid-cols-1 w-full gap-2 gap-y-4 mt-0">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="m19.06 18.67-2.14-4.27-2.14 4.27M15.17 17.91h3.52"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M16.92 22a5.08 5.08 0 1 1 .002-10.162A5.08 5.08 0 0 1 16.92 22ZM5.02 2h3.92c2.07 0 3.07 1 3.02 3.02v3.92c.05 2.07-.95 3.07-3.02 3.02H5.02C3 12 2 11 2 8.93V5.01C2 3 3 2 5.02 2ZM9.01 5.85H4.95M6.97 5.17v.68"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M7.99 5.84c0 1.75-1.37 3.17-3.05 3.17"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M9.01 9.01c-.73 0-1.39-.39-1.85-1.01M2 15c0 3.87 3.13 7 7 7l-1.05-1.75M22 9c0-3.87-3.13-7-7-7l1.05 1.75"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <small className="text-sm leading-none font-bold">
                        Note language
                      </small>
                    </div>
                    <button
                      className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full justify-between"
                      role="combobox"
                      aria-expanded="false"
                      type="button"
                      aria-haspopup="dialog"
                      aria-controls="radix-:r1h:"
                      data-state="closed"
                    >
                      🤖 Auto detect
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
                        className="lucide lucide-chevrons-up-down ml-2 h-4 w-4 shrink-0 opacity-50"
                      >
                        <path d="m7 15 5 5 5-5"></path>
                        <path d="m7 9 5-5 5 5"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <small className="font-medium text-muted-foreground text-xs flex flex-row items-center gap-1">
                You can use AI auto-detect to detect the audio language and note
                generation language.
              </small>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2 mt-3 w-full">
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
                  className="lucide lucide-sparkles"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
                Generate note
              </button>
            </div>
            <button
              onClick={() => setIsOpenUploadAudio(false)}
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
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x h-4 w-4"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      )}
      {isOpenUploadRecording && (
        <div className="fixed inset-0 bg-black\/80 bg-opacity-50 z-50 flex justify-center items-center bg-black/50">
          <div
            role="dialog"
            id="radix-:rs:"
            aria-describedby="radix-:ru:"
            aria-labelledby="radix-:rt:"
            data-state="open"
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
            style={convertStyleStringToObject("pointer-events: auto;")}
          >
            <div className="w-full flex flex-col items-center pt-5">
              <div className="flex flex-col items-center">
                <h3 className="scroll-m-20 text-2xl tracking-tight font-bold">
                  Record Audio
                </h3>
              </div>
              <div className="flex flex-col items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative">
                    <div
                      className="audio-recorder  mt-5"
                      data-testid="audio_recorder"
                    >
                      <img
                        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDQ3MCA0NzAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ3MCA0NzA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KCTxnPgoJCTxwYXRoIGQ9Ik0yMzUsMzAyLjI5NmM0Ny4xNzcsMCw4NS40MjMtMzguMjQ1LDg1LjQyMy04NS40MjNWODUuNDIzQzMyMC40MjMsMzguMjQ1LDI4Mi4xNzcsMCwyMzUsMHMtODUuNDIzLDM4LjI0NS04NS40MjMsODUuNDIzCgkJCXYxMzEuNDUxQzE0OS41NzcsMjY0LjA1MSwxODcuODIzLDMwMi4yOTYsMjM1LDMwMi4yOTZ6Ii8+CgkJPHBhdGggZD0iTTM1MC40MjMsMTM2LjE0OHYzMGgxNXY1MC43MjZjMCw3MS45MTUtNTguNTA4LDEzMC40MjMtMTMwLjQyMywxMzAuNDIzcy0xMzAuNDIzLTU4LjUwNy0xMzAuNDIzLTEzMC40MjN2LTUwLjcyNmgxNXYtMzAKCQkJaC00NXY4MC43MjZDNzQuNTc3LDMwMC4yNzMsMTM4LjU1MSwzNjksMjIwLDM3Ni41ODlWNDQwaC05MC40NDR2MzBoMjEwLjg4OXYtMzBIMjUwdi02My40MTEKCQkJYzgxLjQ0OS03LjU4OSwxNDUuNDIzLTc2LjMxNywxNDUuNDIzLTE1OS43MTZ2LTgwLjcyNkgzNTAuNDIzeiIvPgoJPC9nPgo8L3N2Zz4K"
                        className="audio-recorder-mic "
                        data-testid="ar_mic"
                        title="Start recording"
                      />
                      <span
                        className="audio-recorder-timer display-none "
                        data-testid="ar_timer"
                      >
                        0:00
                      </span>
                      <span className="audio-recorder-status display-none flex-1">
                        <span className="audio-recorder-status-dot"></span>
                        Recording
                      </span>
                      <img
                        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNDcuNjA3IDQ3LjYwNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDcuNjA3IDQ3LjYwNzsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgoJPGc+CgkJPHBhdGggZD0iTTE3Ljk5MSw0MC45NzZjMCwzLjY2Mi0yLjk2OSw2LjYzMS02LjYzMSw2LjYzMWwwLDBjLTMuNjYyLDAtNi42MzEtMi45NjktNi42MzEtNi42MzFWNi42MzFDNC43MjksMi45NjksNy42OTgsMCwxMS4zNiwwCgkJCWwwLDBjMy42NjIsMCw2LjYzMSwyLjk2OSw2LjYzMSw2LjYzMVY0MC45NzZ6Ii8+CgkJPHBhdGggZD0iTTQyLjg3Nyw0MC45NzZjMCwzLjY2Mi0yLjk2OSw2LjYzMS02LjYzMSw2LjYzMWwwLDBjLTMuNjYyLDAtNi42MzEtMi45NjktNi42MzEtNi42MzFWNi42MzEKCQkJQzI5LjYxNiwyLjk2OSwzMi41ODUsMCwzNi4yNDYsMGwwLDBjMy42NjIsMCw2LjYzMSwyLjk2OSw2LjYzMSw2LjYzMVY0MC45NzZ6Ii8+Cgk8L2c+Cjwvc3ZnPgo="
                        className="audio-recorder-options display-none "
                        title="Pause recording"
                        data-testid="ar_pause"
                      />
                      <img
                        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNDYuNzM0IDQ2LjczNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDYuNzM0IDQ2LjczNDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik00MS4zNDYsMEg1LjM4OEMyLjQxNywwLDAsMi40MTcsMCw1LjM4OHYzNS45NThjMCwyLjk3MSwyLjQxNyw1LjM4OCw1LjM4OCw1LjM4OGgzNS45NThjMi45NzEsMCw1LjM4OC0yLjQxNyw1LjM4OC01LjM4OAoJCVY1LjM4OEM0Ni43MzMsMi40MTcsNDQuMzE2LDAsNDEuMzQ2LDB6Ii8+CjwvZz4KPC9zdmc+Cg=="
                        className="audio-recorder-options display-none "
                        title="Discard Recording"
                        data-testid="ar_cancel"
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col justify-center items-center">
                    <div
                      className="text-xs"
                      style={convertStyleStringToObject(
                        "opacity: 1; filter: blur(0px); will-change: transform; transform: translateY(-6px);"
                      )}
                    >
                      Press to record
                    </div>
                  </div>
                </div>
                <div
                  data-orientation="horizontal"
                  role="none"
                  className="shrink-0 bg-border h-[1px] w-full my-4"
                ></div>
                <div className="grid grid-cols-1 w-full gap-2 gap-y-4 mt-0">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="m19.06 18.67-2.14-4.27-2.14 4.27M15.17 17.91h3.52"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M16.92 22a5.08 5.08 0 1 1 .002-10.162A5.08 5.08 0 0 1 16.92 22ZM5.02 2h3.92c2.07 0 3.07 1 3.02 3.02v3.92c.05 2.07-.95 3.07-3.02 3.02H5.02C3 12 2 11 2 8.93V5.01C2 3 3 2 5.02 2ZM9.01 5.85H4.95M6.97 5.17v.68"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M7.99 5.84c0 1.75-1.37 3.17-3.05 3.17"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M9.01 9.01c-.73 0-1.39-.39-1.85-1.01M2 15c0 3.87 3.13 7 7 7l-1.05-1.75M22 9c0-3.87-3.13-7-7-7l1.05 1.75"
                          stroke="currentColor"
                          stroke-width="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <small className="text-sm leading-none font-bold">
                        Note language
                      </small>
                    </div>
                    <button
                      className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full justify-between"
                      role="combobox"
                      aria-expanded="false"
                      type="button"
                      aria-haspopup="dialog"
                      aria-controls="radix-:r1h:"
                      data-state="closed"
                    >
                      🤖 Auto detect
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
                        className="lucide lucide-chevrons-up-down ml-2 h-4 w-4 shrink-0 opacity-50"
                      >
                        <path d="m7 15 5 5 5-5"></path>
                        <path d="m7 9 5-5 5 5"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <small className="font-medium text-muted-foreground text-xs flex flex-row items-center gap-1">
                You can use AI auto-detect to detect the audio language and note
                generation language.
              </small>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2 mt-3 w-full">
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
                  className="lucide lucide-sparkles"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
                Generate note
              </button>
            </div>
            <button
              onClick={() => setIsOpenUploadRecording(false)}
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
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x h-4 w-4"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
