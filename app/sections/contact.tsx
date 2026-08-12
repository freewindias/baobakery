"use client";

import { GiDumplingBao } from "react-icons/gi";
import { FiMail, FiPhone  } from "react-icons/fi";
import {FaFacebookSquare, FaInstagram} from 'react-icons/fa';
import Copy from "@/components/Copy/Copy";

const hours = [
  { day: "Sunday", time: "8:30 AM – 8:30 PM" },
  { day: "Monday", time: "Closed" },
  { day: "Tuesday", time: "8:30 AM – 8:30 PM" },
  { day: "Wednesday", time: "8:30 AM – 8:30 PM" },
  { day: "Thursday", time: "8:30 AM – 8:30 PM" },
  { day: "Friday", time: "8:30 AM – 8:30 PM" },
  { day: "Saturday", time: "8:30 AM – 8:30 PM" },
];

export default function Contact() {
  return (
    <section id="contact" className="w-full min-h-screen bg-background  flex flex-col items-center ">
      {/* Divider with bao icons */}
      <div className="flex items-center w-full max-w-2xl mb-5">
        <div className="flex-1 h-px bg-foreground/20" />
        <div className="flex items-center gap-1 px-4">
          <GiDumplingBao className="text-foreground text-3xl mt-1" />
          <GiDumplingBao className="text-foreground text-3xl" />
          <GiDumplingBao className="text-foreground text-3xl mt-1" />
        </div>
        <div className="flex-1 h-px bg-foreground/20" />
      </div>

      {/* Title */}
      <Copy animateOnScroll={true}>
        <h2 className="font-cinzel text-4xl md:text-5xl text-foreground mb-5 text-center">
          Business Hours
        </h2>
      </Copy>


      {/* Hours list */}
      <ul className="px-6 md:px-0 w-full max-w-md flex flex-col gap-2 mb-12">
        {hours.map(({ day, time }) => (
          <li
            key={day}
            className="flex justify-between items-baseline font-sans text-base text-foreground"
          >
            <Copy animateOnScroll={true}>
              <span
                className={
                  time === "Closed"
                    ? "font-medium text-text-muted"
                    : "font-medium"
                }
              >
                {day}
              </span>
            </Copy>
            <Copy animateOnScroll={true}>
              <span
                className={
                  time === "Closed"
                    ? "text-primary font-semibold"
                    : "text-text-muted"
                }
              >
                {time}
              </span>
            </Copy>
          </li>
        ))}
      </ul>

      {/* Order Platforms */}
      <div className="flex items-center gap-4 mb-12">
        <Copy animateOnScroll={true}>
          <span className="font-sans text-lg font-medium text-foreground">Order:</span>
        </Copy>
        <div className="flex gap-3">
          <a
            href="https://www.ubereats.com/ca/store/bao-bakery/4gRq2CYzQoy6eqNXZOPzjQ"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <img src="/UE.svg" alt="Uber Eats" className="w-[60px] h-[60px] object-contain rounded-lg" />
          </a>
          <a
            href="https://www.skipthedishes.com/bao-bakery"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <img src="/skip.svg" alt="SkipTheDishes" className="w-[60px] h-[60px] object-contain rounded-lg" />
          </a>
        </div>
      </div>

      {/* Contact Info (Email & Phone) */}
      <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-12">
        <a
          href="mailto:info@baobakery.ca"
          className="flex items-center gap-3 text-lg font-sans font-medium text-foreground hover:text-primary transition-colors group"
        >
          <FiMail className="text-2xl group-hover:scale-110 transition-transform" />
          <Copy animateOnScroll={true}>
            <span>info@baobakery.ca</span>
          </Copy>
        </a>
        <a
          href="tel:+17783798792"
          className="flex items-center gap-3 text-lg font-sans font-medium text-foreground hover:text-primary transition-colors group"
        >
          <FiPhone className="text-2xl group-hover:scale-110 transition-transform" />
          <Copy animateOnScroll={true}>
            <span>+1 (778) 379-8792</span>
          </Copy>
        </a>
      </div>

      {/* Social Follow */}
      <div className="flex items-center gap-4 mb-10">
        <Copy animateOnScroll={true}>
          <span className="font-sans text-lg font-medium text-foreground">Follow us:</span>
        </Copy>
        <div className="flex gap-1">
          <a
            href="https://www.instagram.com/baobakery/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-all duration-200 hover:scale-110"
            aria-label="Instagram"
          >
            <FaInstagram className="text-3xl" />
          </a>
          <a
            href="https://www.facebook.com/baobakery"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-all duration-200 hover:scale-110"
            aria-label="Facebook"
          >
            <FaFacebookSquare className="text-3xl" />
          </a>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full flex flex-col items-center px-6 h-[70vh] transition-all duration-500 mb-5">
        <Copy animateOnScroll={true}>
          <span className="font-sans text-lg font-medium text-foreground mb-2">Locate us:</span>
        </Copy>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2605.0177290043866!2d-123.03489592377292!3d49.23815307390685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548676947bdeacdb%3A0xf258e97d8e9d170a!2sBao%20Bakery!5e0!3m2!1sen!2sca!4v1783497069337!5m2!1sen!2sca"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Bao Bakery Location"
          className="rounded-lg"
        />
      </div>
    </section>
  );
}


