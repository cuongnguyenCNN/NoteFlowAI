"use client";
import { useEffect, useRef, useState } from "react";

export default function SidebarWithFolder() {
  const [folders, setFolders] = useState<string[]>(["All notes"]);
  const [showModal, setShowModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreateFolder = () => {
    if (newFolderName.trim() === "") return;
    setFolders([...folders, newFolderName.trim()]);
    setNewFolderName("");
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  return (
    <div className="w-64 p-4 border-r h-screen flex flex-col bg-white">
      <h2 className="text-lg font-bold mb-4">📁 Folders</h2>

      <ul className="flex flex-col gap-2 overflow-y-auto">
        {folders.map((folder, idx) => (
          <li
            key={idx}
            className="px-3 py-2 rounded hover:bg-gray-100 cursor-pointer transition"
          >
            {folder}
          </li>
        ))}
      </ul>

      <button
        className="mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100 transition"
        onClick={() => setShowModal(true)}
      >
        ➕ Create new folder
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black\/80 bg-opacity-30 backdrop-blur-sm">
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
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
