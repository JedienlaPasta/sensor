import { Inter, Manrope } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const righteous = localFont({
  src: "../../../public/fonts/Righteous/Righteous-Regular.ttf",
  display: "swap",
});

// Titan_One
// Coda
// Changa_One
// Righteous
// Passion_One
