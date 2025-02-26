import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryBlackColor: "#000000ff",
        primaryGreenColor: "#006600ff",
        primaryRedColor: "#ba0000ff",
      },
      backgroundImage: {
        "how-CK-works-bg-img": "url('/images/CK-works-bg.png')",
        "about-sect-hero-bg-img": "url('/images/about-sect-hero-bg.JPG')",
        "overview-bg-img1": "url('/images/overview1-bg.svg')",
        "overview-bg-img2": "url('/images/overview2-bg.svg')",
        "SE-bootcamp-img": "url('/images/SE-img.JPG')",
        "entrepreneurship-bootcamp-img": "url('/images/Entrepreneurship-img.JPG')",
        "AI-bootcamp-img": "url('/images/AI-img.JPG')",
        "our-goals-bg1": "url('/images/our-goals-img1.png')",
        "our-goals-bg2": "url('/images/our-goals-img2.png')",
        "our-goals-bg3": "url('/images/our-goals-img3.png')",
        "our-goals-bg4": "url('/images/our-goals-img4.png')",
        "internship-footer-bg1": "url('/images/internship-footer-bg1.png')",
        "internship-footer-bg2": "url('/images/internship-footer-bg2.png')"
      },
    },
  },
  plugins: [],
} satisfies Config;