# Bao Bakery 

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Description 📝

Bao Bakery is a modern, visually stunning website for a bakery specializing in Chinese-Filipino steamed buns and other baked goods. Built with Next.js and React, the site features dynamic animations, a clean UI, and a user-friendly menu presentation. It aims to provide an engaging online presence for the bakery, showcasing its offerings and making it easy for customers to find information and place orders.

## Table of Contents 🧭

- [Project Title & Badges](#bao-bakery-dumpling)
- [Description](#description-📝)
- [Table of Contents](#table-of-contents-🧭)
- [Features](#features-✨)
- [Tech Stack](#tech-stack-💻)
- [Installation](#installation-🚀)
- [Usage](#usage-💡)
- [Project Structure](#project-structure-📁)
- [API Reference](#api-reference- -if-applicable-)
- [Contributing](#contributing-🤝)
- [License](#license-⚖️)
- [Important links](#important-links-🔗)
- [Footer](#footer-️)

## Features ✨

- **Interactive Hero Section:** A captivating hero section with a scroll-driven animation for a marquee element that expands into a full-width banner.
- **Dynamic Menu Display:** An animated carousel for the bakery's menu, allowing users to easily browse different categories.
- **Customer Testimonials:** A marquee displaying customer reviews fetched from a backend API, with fallback data.
- **Contact Information:** Clear display of business hours, contact details (email, phone), social media links, and an embedded Google Map.
- **Smooth Scrolling & Animations:** Utilizes GSAP and `react-lenis` for fluid scrolling and engaging animations throughout the site.
- **Responsive Design:** Ensures a seamless experience across various devices, from desktops to mobile phones.
- **Preloader Animation:** An initial loading animation provides a polished entry experience.
- **Dark Mode Support:** The website adapts to dark mode, offering a theme switch experience (though the explicit toggle is not visible in the analyzed code, the CSS variables suggest support).
- **SEO Optimized:** Leverages Next.js features for potentially better search engine visibility.

## Tech Stack 💻

- **Frontend Framework:** React, Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS, CSS Modules
- **Animation:** GSAP, motion/react
- **UI Components:** shadcn/ui (inferred from `shadcn` dependency and `shadcn/tailwind.css` import), radix-ui
- **Icons:** lucide-react, react-icons, GiDumplingBao, FiMail, FiPhone, FaFacebookSquare, FaInstagram, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar
- **Utilities:** class-variance-authority, clsx, tailwind-merge
- **Scroll Behavior:** Lenis
- **Build Tools:** Next.js (via `next dev`, `next build`, `next start` scripts)
- **Linting:** ESLint


## Real-world Use Cases 🍽️

This project serves as a professional, modern website for a bakery like "Bao Bakery". It effectively:

- **Showcases the Menu:** Clearly displays all available food and beverage items with descriptions.
- **Builds Brand Identity:** Features a visually appealing design with custom animations and typography, reflecting a premium brand.
- **Provides Essential Information:** Offers business hours, location (with an integrated map), and contact details.
- **Facilitates Ordering:** Includes direct links to popular delivery platforms like Uber Eats and SkipTheDishes.
- **Gathers Customer Feedback:** Displays testimonials to build trust and social proof.

## How to Use the Project 🖱️

- **Explore the Menu:** Navigate through different sections like "Steamed Buns", "Dim Sum", "Baked Buns", etc., using the carousel.
- **View Business Hours & Contact:** Scroll down to the "Contact" section for detailed business hours, contact information, and social media links.
- **Find the Location:** The "Contact" section also includes an interactive map to pinpoint the bakery's location.
- **Read Reviews:** The "Reviews" section showcases customer feedback, fetched dynamically.
- **Navigate:** Use the smooth scrolling navigation provided by the Navbar to jump between sections.

## Project Structure 📁

```
baobakery/
├── app/
│   ├── api/             # API routes (e.g., reviews)
│   │   └── reviews/     # Reviews API route
│   │       └── route.ts
│   ├── sections/        # Reusable page sections
│   │   ├── contact.tsx
│   │   ├── hero.tsx
│   │   ├── menu.tsx
│   │   └── testimonials.tsx
│   ├── globals.css      # Global CSS styles
│   └── layout.tsx       # Root layout component
├── components/
│   ├── Copy/            # Custom text animation component
│   │   ├── Copy.css
│   │   └── Copy.jsx
│   ├── Navbar/
│   │   └── Navbar.tsx
│   ├── Preloader/
│   │   └── Preloader.tsx
│   └── ui/              # UI components (likely from shadcn/ui)
│       ├── button.tsx
│       ├── highlighter.tsx
│       └── marquee.tsx
├── data/
│   └── menu-data.ts     # Menu data structure
├── lib/
│   ├── lenis.ts         # Lenis smooth scrolling integration
│   └── utils.ts         # Utility functions (e.g., cn for Tailwind)
├── public/
│   ├── bao/             # Bao images for hero section
│   ├── menuImages/      # Images for menu sections
│   └── navLogos/
│       └── mainLogo.webp
├── .eslintrc.cjs
├── .gitignore
├── .next/
├── components.json    # shadcn/ui configuration
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── pnpm-workspace.yaml
├── README.md
├── tailwind.config.ts  # Assumed, not explicitly shown but implied by imports
├── tsconfig.json
└── AGENTS.md
└── CLAUDE.md
```

## Important links 🔗

- **Live Demo:** [https://baobakery.vercel.app](https://baobakery.vercel.app/)
- **Repository:** [https://github.com/freewindias/baobakery](https://github.com/freewindias/baobakery)
- **Bao Bakery (Official):** [https://www.baobakery.ca/](https://www.baobakery.ca/)
- **Instagram:** [https://www.instagram.com/baobakery/](https://www.instagram.com/baobakery/)
- **Facebook:** [https://www.facebook.com/baobakery](https://www.facebook.com/baobakery)
- **Uber Eats:** [https://www.ubereats.com/ca/store/bao-bakery/4gRq2CYzQoy6eqNXZOPzjQ](https://www.ubereats.com/ca/store/bao-bakery/4gRq2CYzQoy6eqNXZOPzjQ)
- **SkipTheDishes:** [https://www.skipthedishes.com/bao-bakery](https://www.skipthedishes.com/bao-bakery)


**Bao Bakery Project** | [Repository](https://github.com/freewindias/baobakery) | [Author Profile](https://github.com/freewindias) (freewindias)


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**
