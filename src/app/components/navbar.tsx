"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu as LucideMenu, X as LucideX } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonial" },
    { label: "Sign Up", href: "/sign-in" },
  ];

  return (
    <nav className="shadow-md z-50 flex justify-between items-center px-6 py-4">
      <div className="font-bold text-xl">NoteFlow AI</div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className="text-gray-600 hover:text-blue-600"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <LucideX className="w-6 h-6 text-gray-600" />
          ) : (
            <LucideMenu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-40">
          <div className="bg-white w-3/4 p-6 absolute right-0 top-0 h-full">
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  onClick={toggleMenu}
                  className="block text-gray-800 hover:text-blue-600"
                >
                  Home
                </Link>
              </li>
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    onClick={toggleMenu}
                    className="block text-gray-800 hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button onClick={toggleMenu} className="mt-6">
              <LucideX className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
