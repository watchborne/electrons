/**
 * Tailwind preset for consumers of @watchborne/electrons.
 *
 * Usage (tailwind.config.js):
 *   module.exports = {
 *     presets: [require("@watchborne/electrons/tailwind-preset")],
 *     content: [
 *       "./app/**\/*.{js,ts,jsx,tsx}",
 *       "./node_modules/@watchborne/electrons/dist/**\/*.{js,mjs}",
 *     ],
 *   };
 *
 * Pair this with the CSS variables from `@watchborne/electrons/tokens.css`
 * (imported once, e.g. in a root layout) — the color tokens below all resolve
 * through `hsl(var(--token))`.
 */
module.exports = {
  darkMode: ["class"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        // Brand accent — "Charge Amber"
        charge: {
          DEFAULT: "hsl(var(--charge))",
          foreground: "hsl(var(--charge-foreground))",
          soft: "hsl(var(--charge-soft))",
          strong: "hsl(var(--charge-strong))",
        },
        // Generic color palette
        green: {
          DEFAULT: "hsl(var(--green))",
          soft: "hsl(var(--green-soft))",
          foreground: "hsl(var(--green-foreground))",
        },
        blue: {
          DEFAULT: "hsl(var(--blue))",
          soft: "hsl(var(--blue-soft))",
          foreground: "hsl(var(--blue-foreground))",
        },
        amber: {
          DEFAULT: "hsl(var(--amber))",
          soft: "hsl(var(--amber-soft))",
          foreground: "hsl(var(--amber-foreground))",
        },
        orange: {
          DEFAULT: "hsl(var(--orange))",
          soft: "hsl(var(--orange-soft))",
          foreground: "hsl(var(--orange-foreground))",
        },
        red: {
          DEFAULT: "hsl(var(--red))",
          soft: "hsl(var(--red-soft))",
          foreground: "hsl(var(--red-foreground))",
        },
        gray: {
          DEFAULT: "hsl(var(--gray))",
          soft: "hsl(var(--gray-soft))",
          foreground: "hsl(var(--gray-foreground))",
        },
        purple: {
          DEFAULT: "hsl(var(--purple))",
          soft: "hsl(var(--purple-soft))",
          foreground: "hsl(var(--purple-foreground))",
        },
        // Backward compatibility: status tones map to generic colors
        status: {
          available: {
            DEFAULT: "hsl(var(--green))",
            soft: "hsl(var(--green-soft))",
            foreground: "hsl(var(--green-foreground))",
          },
          charging: {
            DEFAULT: "hsl(var(--blue))",
            soft: "hsl(var(--blue-soft))",
            foreground: "hsl(var(--blue-foreground))",
          },
          pending: {
            DEFAULT: "hsl(var(--amber))",
            soft: "hsl(var(--amber-soft))",
            foreground: "hsl(var(--amber-foreground))",
          },
          warning: {
            DEFAULT: "hsl(var(--orange))",
            soft: "hsl(var(--orange-soft))",
            foreground: "hsl(var(--orange-foreground))",
          },
          error: {
            DEFAULT: "hsl(var(--red))",
            soft: "hsl(var(--red-soft))",
            foreground: "hsl(var(--red-foreground))",
          },
          offline: {
            DEFAULT: "hsl(var(--gray))",
            soft: "hsl(var(--gray-soft))",
            foreground: "hsl(var(--gray-foreground))",
          },
          reserved: {
            DEFAULT: "hsl(var(--purple))",
            soft: "hsl(var(--purple-soft))",
            foreground: "hsl(var(--purple-foreground))",
          },
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
    },
  },
};
