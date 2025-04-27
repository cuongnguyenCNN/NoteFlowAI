import "../../css/21527cccdd6ccf0f.css";
import "../../css/b81a822ef496e877.css";

import "../../css/be7c40c9332f48ab.css";
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
export default async function Modal() {
  return (
    <div
      role="dialog"
      id="radix-:rs:"
      aria-describedby="radix-:ru:"
      aria-labelledby="radix-:rt:"
      data-state="open"
      className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg"
      style={convertStyleStringToObject("pointer-events: auto;")}
    >
      <div className="w-full flex flex-col items-center pt-5">
        <div className="flex flex-col items-center">
          <h3 className="scroll-m-20 text-2xl tracking-tight font-bold">
            Upload audio
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
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
                      Supported formats: mp3, mav, ogg, flac, aac, wma, aiff
                    </p>
                  </div>
                </div>
                <input
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  accept="audio/*,.mp3,.mav,.ogg,.flac,.aac,.wma,.aiff,.webm"
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
                aria-controls="radix-:r24:"
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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
  );
}
