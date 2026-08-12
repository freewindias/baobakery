"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Menu", id: "menu" },
    { label: "Reviews", id: "reviews" },
    { label: "Contact us", id: "contact" },
  ];

  // Track scroll position to update active nav item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // offset for detection

      for (const item of menuItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Small timeout to allow the menu close animation to play or coordinate with scroll
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <motion.div
      initial={{ y: -120, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ delay: 3.5, duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 z-9999 flex flex-col items-center gap-3 select-none w-[calc(100vw-3rem)] md:w-auto"
    >
      {/* Navbar Header Pill */}
      <div 
        className="flex items-center justify-between w-full md:w-150 h-16 px-4 bg-[#D4D4D6]/90 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-white/10 transition-all duration-300"
      >
        {/* Logo container */}
        <div className="flex items-center justify-center w-11 h-11 bg-white rounded-full border border-black/10 overflow-hidden relative shrink-0">
          <Image
            src="/navLogos/mainNoBGLogo.png"
            alt="Bao Bakery Logo"
            fill
            sizes="44px"
            className="object-contain p-1"
            priority
          />
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="flex items-center justify-center w-11 h-11 rounded-full cursor-pointer hover:bg-black/5 active:scale-95 transition-all duration-200"
        >
          {isOpen ? (
            <X className="w-8 h-8 text-[#2B211B] stroke-[1.5]" />
          ) : (
            <div className="flex flex-col gap-2 justify-center items-center w-8 h-8">
              <span className="w-7 h-0.5 bg-[#2B211B] rounded-full"></span>
              <span className="w-7 h-0.5 bg-[#2B211B] rounded-full"></span>
            </div>
          )}
        </button>
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full md:w-150 bg-[#D4D4D6]/95 backdrop-blur-md rounded-3xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-white/10 flex flex-col gap-4 text-left overflow-hidden"
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`text-2xl font-bold tracking-tight text-[#2B211B] hover:text-primary transition-colors text-left font-sans cursor-pointer ${
                  activeSection === item.id ? "text-primary" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
