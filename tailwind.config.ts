import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Enable dark mode based on a class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background-dark))', // Default dark background color
        foreground: 'hsl(var(--foreground-dark))', // Default dark foreground color
        card: {
          DEFAULT: 'hsl(var(--card-dark))',
          foreground: 'hsl(var(--card-foreground-dark))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover-dark))',
          foreground: 'hsl(var(--popover-foreground-dark))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary-dark))',
          foreground: 'hsl(var(--primary-foreground-dark))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary-dark))',
          foreground: 'hsl(var(--secondary-foreground-dark))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted-dark))',
          foreground: 'hsl(var(--muted-foreground-dark))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent-dark))',
          foreground: 'hsl(var(--accent-foreground-dark))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive-dark))',
          foreground: 'hsl(var(--destructive-foreground-dark))'
        },
        border: 'hsl(var(--border-dark))',
        input: 'hsl(var(--input-dark))',
        ring: 'hsl(var(--ring-dark))',
        chart: {
          '1': 'hsl(var(--chart-1-dark))',
          '2': 'hsl(var(--chart-2-dark))',
          '3': 'hsl(var(--chart-3-dark))',
          '4': 'hsl(var(--chart-4-dark))',
          '5': 'hsl(var(--chart-5-dark))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
