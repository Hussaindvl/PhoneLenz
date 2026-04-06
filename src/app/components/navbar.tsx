"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Bar */}
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div style={{ position: "relative", width: "80px", height: "120px" }}>
              <Image
                src="/phonelenz_logo.svg"
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <span className="text-xl font-semibold">PhoneLenz</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/market/detectphone" className="hover:text-blue-600">Detect Phone</Link>
            <Link href="/market/sellphone" className="hover:text-blue-600">Sell Phone</Link>
            <Link href="/market/buyphone" className="hover:text-blue-600">Buy Phone</Link>
            <Link href="/market/repairephone" className="hover:text-blue-600">Repair Phone</Link>
          </div>

          {/* Auth Buttons + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/auth/signin"
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-2xl"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-80 py-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4">
            <Link href="/">Home</Link>
            <Link href="/market/detectphone">Detect Phone</Link>
            <Link href="/market/sellphone">Sell Phone</Link>
            <Link href="/market/buyphone">Buy Phone</Link>
            <Link href="/market/repairephone">Repair Phone</Link>
            <hr className="border-gray-200" />
            <Link
              href="/auth/signin"
              className="text-center py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="text-center py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>

      </div>
    </nav>
  );
}