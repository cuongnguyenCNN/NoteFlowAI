"use client";
import { useState } from "react";

const languages = [
  { label: "English", sub: "English (US)" },
  { label: "Español", sub: "Spanish" },
  { label: "Français", sub: "French" },
  { label: "Deutsch", sub: "German" },
  { label: "Português", sub: "Portuguese" },
  { label: "中文", sub: "Chinese" },
  { label: "日本語", sub: "Japanese" },
  { label: "한국어", sub: "Korean" },
  { label: "Tiếng Việt", sub: "Vietnamese" },
];

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]); // default: English

  const handleSelect = (lang: { label: string; sub: string }) => {
    setSelectedLang(lang);
    setOpen(false);
    console.log(`Language selected: ${lang.label}`);

    // Nếu dùng i18n, gọi i18n.changeLanguage(lang.code) ở đây
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        🌐 {selectedLang.label} ▼
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {languages.map((lang, idx) => (
              <div
                key={idx}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(lang)}
              >
                <strong className="block text-sm">{lang.label}</strong>
                <span className="text-xs text-gray-500">{lang.sub}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
