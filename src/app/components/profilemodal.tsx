import { useEffect, useState } from "react";
import PricingModal from "./pricingModal";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
type GoogleUser = {
  name: string;
  picture: string;
  email: string;
};
interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  googleuser?: GoogleUser;
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
export default function ProfileModal({
  isOpen,
  onClose,
  googleuser,
}: ProfileModalProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const openConfirm = () => setIsConfirmOpen(true);
  const closeConfirm = () => setIsConfirmOpen(false);

  const logout = () => {
    localStorage.removeItem("user_name_info");
    localStorage.removeItem("user_image_info");
    localStorage.removeItem("user_email_info");
    destroyCookie(null, "google-videobridge-auth-token");

    router.push("/sign-in");
  };

  const confirmLogout = () => {
    logout();
    closeConfirm();
  };
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
      <div
        role="dialog"
        id="radix-:rj:"
        aria-describedby="radix-:rl:"
        aria-labelledby="radix-:rk:"
        data-state="open"
        className="bg-white rounded-xl w-full max-w-4xl p-6 relative shadow-lg"
        style={convertStyleStringToObject("pointer-events: auto;")}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2
            id="radix-:rk:"
            className="tracking-tight flex items-center text-sm font-bold"
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
              className="lucide lucide-circle-user-round size-5 mr-1"
            >
              <path d="M18 20a6 6 0 0 0-12 0"></path>
              <circle cx="12" cy="10" r="4"></circle>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            My profile
          </h2>
          <div className="">
            <div
              data-orientation="horizontal"
              role="none"
              className="shrink-0 bg-border h-[1px] w-full my-2"
            ></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div>
                <small className="font-medium text-sm">Display name</small>
              </div>
              <small className="font-medium text-sm">{googleuser?.name}</small>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <small className="font-medium text-sm">Email</small>
              </div>
              <small className="font-medium text-sm">{googleuser?.email}</small>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <small className="font-medium text-sm">Active plan</small>
              </div>
              <div className="flex items-center gap-2">
                <div className="border bg-card text-card-foreground shadow-sm px-2 py-1 rounded-full">
                  <small className="text-sm font-medium leading-none">
                    free
                  </small>
                </div>
                <button
                  onClick={() => setIsOpenModal(true)}
                  className="active:scale-110 transition-all duration-100"
                >
                  <button className="relative text-center cursor-pointer flex justify-center animate-pulse items-center rounded-lg text-white dark:text-black bg-blue-500 dark:bg-blue-500 px-4 py-2 h-[32px]">
                    <div className="relative z-10 ">
                      <div className="flex items-center">
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
                          className="lucide lucide-crown w-4 h-4 mr-1 text-white"
                        >
                          <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path>
                          <path d="M5 21h14"></path>
                        </svg>
                        <span className="text-white text-sm font-bold">
                          Upgrade plan
                        </span>
                      </div>
                    </div>
                  </button>
                </button>
              </div>
            </div>
          </div>
          <PricingModal
            isOpen={isOpenModal}
            onClose={() => setIsOpenModal(false)}
          ></PricingModal>
          <div className="">
            <h2
              id="radix-:rk:"
              className="font-semibold tracking-tight flex items-center mt-4 text-sm"
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
                className="lucide lucide-settings2 size-5 mr-1"
              >
                <path d="M20 7h-9"></path>
                <path d="M14 17H5"></path>
                <circle cx="17" cy="17" r="3"></circle>
                <circle cx="7" cy="7" r="3"></circle>
              </svg>
              My settings
            </h2>
            <div
              data-orientation="horizontal"
              role="none"
              className="shrink-0 bg-border h-[1px] w-full my-2"
            ></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start justify-start">
                <small className="font-medium text-sm text-left">
                  Appearance
                </small>
                <p className="text-muted-foreground text-xs">
                  Customize how NoteFlow looks on your device.
                </p>
              </div>
              <button className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 flex items-center gap-2">
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
                  className="lucide lucide-sun h-[1.2rem] w-[1.2rem] dark:hidden"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
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
                  className="lucide lucide-moon h-[1.2rem] w-[1.2rem] hidden dark:block"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
                <span className="sr-only">Toggle theme</span>
                <p>Light</p>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start justify-start">
                <small className="font-medium text-sm">Language</small>
                <p className="text-muted-foreground text-xs text-left">
                  Change the language of NoteFlow in the user interface.
                </p>
              </div>
              <div>
                <button
                  type="button"
                  id="radix-:r1k:"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  data-state="closed"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-globe mr-2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                  English
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-chevron-down ml-2"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <h2
              id="radix-:rk:"
              className="font-semibold tracking-tight flex items-center mt-4 text-sm"
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
                className="lucide lucide-shield-ellipsis size-5 mr-1"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                <path d="M8 12h.01"></path>
                <path d="M12 12h.01"></path>
                <path d="M16 12h.01"></path>
              </svg>
              Account actions
            </h2>
            <div
              data-orientation="horizontal"
              role="none"
              className="shrink-0 bg-border h-[1px] w-full my-2"
            ></div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={openConfirm}
              className="active:scale-110 transition-all duration-100 flex items-center gap-1 text-red-500 hover:text-red-700 transition-all duration-150"
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
                className="lucide lucide-log-out w-4 h-4 mr-1"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" x2="9" y1="12" y2="12"></line>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
        {isConfirmOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to log out?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Log out
                </button>
                <button
                  onClick={closeConfirm}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
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
