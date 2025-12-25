"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const pathname = usePathname();
  const { user, loading, isAuthenticated } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isDashboardPage = pathname.startsWith("/dashboard");

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  if (loading) return null;

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            LOGO
          </Link>

          {/* Desktop Nav (Home only) */}
          {pathname === "/" && (
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#about" className="text-gray-600 hover:text-black">
                About
              </Link>
              <Link href="#features" className="text-gray-600 hover:text-black">
                Features
              </Link>
              <Link href="#faq" className="text-gray-600 hover:text-black">
                FAQ
              </Link>
            </div>
          )}

          {/* RIGHT SIDE (Desktop) */}
          <div className="hidden md:flex items-center gap-4 relative">

            {/* NOT AUTH */}
            {!isAuthenticated && (
              <Link href="/login">
                <Button>Get Started</Button>
              </Link>
            )}

            {/* AUTH + HOME PAGE */}
            {isAuthenticated && !isDashboardPage && (
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            )}

            {/* AUTH + DASHBOARD PAGE */}
            {isAuthenticated && isDashboardPage && (
              <div className="relative">
                {/* Profile Icon */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center"
                >
                  {user?.email?.charAt(0).toUpperCase()}
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-4">

          {pathname === "/" && (
            <>
              <Link href="#about" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link href="#features" onClick={() => setMenuOpen(false)}>
                Features
              </Link>
              <Link href="#faq" onClick={() => setMenuOpen(false)}>
                FAQ
              </Link>
            </>
          )}

          {!isAuthenticated && (
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              <Button className="w-full">Get Started</Button>
            </Link>
          )}

          {isAuthenticated && !isDashboardPage && (
            <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
              <Button className="w-full">Dashboard</Button>
            </Link>
          )}

          {isAuthenticated && isDashboardPage && (
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 border rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
