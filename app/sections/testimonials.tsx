"use client";

import React from "react";
import Copy from "@/components/Copy/Copy";
import { Marquee } from "@/components/ui/marquee";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";

interface Review {
  id: string | number;
  name: string;
  text: string;
  initials: string;
  bgColor: string;
  picture?: string;
  rating: number;
}

const fallbackReviews: Review[] = [
  {
    id: 1,
    name: "Maria Santos",
    text: "The BBQ Pork (Asado) buns are absolutely divine! They are always steaming hot, fluffy, and packed with flavor. My family orders them every weekend.",
    initials: "MS",
    bgColor: "bg-red-300 dark:bg-red-900/50 text-red-800 dark:text-red-200",
    rating: 5,
  },
  {
    id: 2,
    name: "EM G.",
    text: "Bao Bakery is our absolute favorite go-to spot. The coconut buns are incredibly soft and just the right amount of sweet. Highly recommend!",
    initials: "JD",
    bgColor: "bg-green-300 dark:bg-green-900/50 text-green-800 dark:text-green-200",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    text: "Exceptional service and mouthwatering pastries. The sesame balls are always crispy on the outside and perfectly chewy on the inside. Love it!",
    initials: "SJ",
    bgColor: "bg-blue-300 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200",
    rating: 5,
  },
  {
    id: 4,
    name: "David Lim",
    text: "The Chicken Deluxe (Bola Bola) is legendary. Fluffy bun, rich filling, and huge portion size. Quick delivery every single time.",
    initials: "DL",
    bgColor: "bg-amber-300 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200",
    rating: 5,
  },
  {
    id: 5,
    name: "Emily Chen",
    text: "Unbelievably good steamed buns! They taste exactly like the ones I had in Manila. The mochi is also a must-try dessert.",
    initials: "EC",
    bgColor: "bg-purple-300 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200",
    rating: 4,
  },
];

const QuoteIcon = () => (
  <FaQuoteLeft size={36} className="text-primary mb-4 opacity-90" />
);

const StarIcon = () => (
  <FaStar className="w-5 h-5 text-amber-500 shrink-0" />
);

interface TestimonialCardProps {
  name: string;
  text: string;
  initials: string;
  bgColor: string;
  picture?: string;
  rating: number;
}

const TestimonialCard = ({ name, text, initials, bgColor, picture, rating }: TestimonialCardProps) => (
  <div className="bg-neutral-200/60 dark:bg-neutral-800/40 rounded-4xl border border-border p-8 flex flex-col justify-between shadow-sm h-[320px] w-[350px] md:w-[520px] shrink-0 text-left">
    <div>
      <QuoteIcon />
      <p className="text-text/90 text-lg leading-relaxed font-sans font-medium mb-6 line-clamp-4">
        {text}
      </p>
    </div>
    <div className="flex items-center gap-4">
      {picture ? (
        <img
          src={picture}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-14 h-14 rounded-full object-cover shrink-0 shadow-inner"
        />
      ) : (
        <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shrink-0 shadow-inner ${bgColor}`}>
          {initials}
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-text font-bold text-lg font-sans leading-none mb-1">
          {name}
        </span>
        <div className="flex gap-0.5">
          {Array.from({ length: rating }).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const [reviews, setReviews] = React.useState<Review[]>(fallbackReviews);

  React.useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        }
      })
      .catch((err) => console.error("Error loading reviews:", err));
  }, []);

  return (
    <section id="reviews" className="w-full min-h-screen overflow-hidden relative flex flex-col justify-center">
      {/* Title */}
      <div className="px-6 text-left mx-auto w-full">
        <Copy animateOnScroll={true}>
          <h2 className="text-4xl lg:text-6xl font-cinzel leading-none tracking-tight">
            What Our Clients <br /> Say About Us
          </h2>
        </Copy>
      </div>

      {/* Marquee with cards */}
      <div className="w-full overflow-hidden">
        <Marquee pauseOnHover={true} className="[--duration:40s] py-2" repeat={3}>
          {reviews.map((t) => (
            <TestimonialCard
              key={t.id}
              name={t.name}
              text={t.text}
              initials={t.initials}
              bgColor={t.bgColor}
              picture={t.picture}
              rating={t.rating}
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

