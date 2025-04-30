"use client";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
interface FolderHeaderProps {
  folderId?: string;
  folderName?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}
type NavbarProps = {
  toggleSidebar: () => void;
};
type CombinedProps = NavbarProps & FolderHeaderProps;
export default function NavbarDashboard({
  toggleSidebar,
  folderName,
  onEdit,
  onDelete,
}: CombinedProps) {
  const [openCustomFolder, setOpenAddFolder] = useState(false);
  const pathname = usePathname();
  const { folderId } = useParams() as { folderId: string };
  const isFolderPage = pathname?.includes("/folder/") && folderId;
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
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
                {isFolderPage ? folderId || "Folder" : "All notes"}
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
      <div className="relative inline-block text-left">
        <button
          onClick={() => setOpenAddFolder(!openCustomFolder)}
          className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 flex items-center gap-2"
        >
          <MoreVertical size={20} />
        </button>
        {openCustomFolder && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
            <button
              onClick={() => {
                setOpenAddFolder(false);
                //   onEdit();
              }}
              className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
            >
              <Pencil size={16} className="mr-2" />
              Edit folder
            </button>
            <button
              onClick={() => {
                setOpenAddFolder(false);
                //   onDelete();
              }}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <Trash size={16} className="mr-2" />
              Delete folder
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
