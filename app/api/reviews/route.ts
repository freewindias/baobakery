import { NextResponse } from "next/server";

interface GoogleReview {
  authorAttribution?: {
    displayName: string;
    photoUri?: string;
  };
  rating: number;
  text?: {
    text: string;
  };
}

const FALLBACK_REVIEWS = [
  {
    id: "fb-1",
    name: "Maria Santos",
    text: "The BBQ Pork (Asado) buns are absolutely divine! They are always steaming hot, fluffy, and packed with flavor. My family orders them every weekend.",
    rating: 5,
    bgColor: "bg-red-300 dark:bg-red-900/50 text-red-800 dark:text-red-200",
  },
  {
    id: "fb-2",
    name: "EM G.",
    text: "Bao Bakery is our absolute favorite go-to spot. The coconut buns are incredibly soft and just the right amount of sweet. Highly recommend!",
    rating: 5,
    bgColor: "bg-green-300 dark:bg-green-900/50 text-green-800 dark:text-green-200",
  },
  {
    id: "fb-3",
    name: "Sarah Jenkins",
    text: "Exceptional service and mouthwatering pastries. The sesame balls are always crispy on the outside and perfectly chewy on the inside. Love it!",
    rating: 5,
    bgColor: "bg-blue-300 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200",
  },
  {
    id: "fb-4",
    name: "David Lim",
    text: "The Chicken Deluxe (Bola Bola) is legendary. Fluffy bun, rich filling, and huge portion size. Quick delivery every single time.",
    rating: 5,
    bgColor: "bg-amber-300 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200",
  },
  {
    id: "fb-5",
    name: "Emily Chen",
    text: "Unbelievably good steamed buns! They taste exactly like the ones I had in Manila. The mochi is also a must-try dessert.",
    rating: 4,
    bgColor: "bg-purple-300 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200",
  },
];

const COLOR_PALETTES = [
  "bg-red-300 dark:bg-red-900/50 text-red-800 dark:text-red-200",
  "bg-green-300 dark:bg-green-900/50 text-green-800 dark:text-green-200",
  "bg-blue-300 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200",
  "bg-amber-300 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200",
  "bg-purple-300 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = "ChIJ26zee5R2hlQRChedjn3pWPI"; // Active Place ID for Bao Bakery

  if (!apiKey) {
    // Return fallback reviews directly if no API key is defined
    return NextResponse.json(FALLBACK_REVIEWS);
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`Google Places API returned status: ${response.status}`);
    }

    const data = await response.json();
    const googleReviews: GoogleReview[] = data.reviews || [];

    // Filter only 4 and 5 star reviews
    const filtered = googleReviews.filter((r) => r.rating >= 4);

    if (filtered.length === 0) {
      return NextResponse.json(FALLBACK_REVIEWS);
    }

    // Map to our desired shape
    const mappedReviews = filtered.map((r, i) => {
      const name = r.authorAttribution?.displayName || "Anonymous";
      const text = r.text?.text || "";
      const picture = r.authorAttribution?.photoUri;

      return {
        id: `google-${i}`,
        name,
        text,
        rating: r.rating,
        picture,
        initials: getInitials(name),
        bgColor: COLOR_PALETTES[i % COLOR_PALETTES.length],
      };
    });

    // Ensure we have at least 6 reviews by appending curated real reviews if needed
    let finalReviews = [...mappedReviews];
    if (finalReviews.length < 6) {
      const needed = 6 - finalReviews.length;
      const uniqueFallbacks = FALLBACK_REVIEWS.filter(
        (fb) => !finalReviews.some((fr) => fr.name.toLowerCase() === fb.name.toLowerCase())
      );
      
      const additional = uniqueFallbacks.slice(0, needed).map((item, idx) => ({
        ...item,
        id: `padded-${idx}`,
        picture: undefined,
        initials: getInitials(item.name),
      }));
      finalReviews = [...finalReviews, ...additional];
    }

    return NextResponse.json(finalReviews);
  } catch (error) {
    console.error("Failed to fetch Google Reviews:", error);
    // Graceful fallback
    return NextResponse.json(FALLBACK_REVIEWS);
  }
}
