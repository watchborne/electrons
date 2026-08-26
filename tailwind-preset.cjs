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
        // Charge-point status tones
        status: {
          available: {
            DEFAULT: "hsl(var(--status-available))",
            soft: "hsl(var(--status-available-soft))",
            foreground: "hsl(var(--status-available-foreground))",
          },
          charging: {
            DEFAULT: "hsl(var(--status-charging))",
            soft: "hsl(var(--status-charging-soft))",
            foreground: "hsl(var(--status-charging-foreground))",
          },
          pending: {
            DEFAULT: "hsl(var(--status-pending))",
            soft: "hsl(var(--status-pending-soft))",
            foreground: "hsl(var(--status-pending-foreground))",
          },
          warning: {
            DEFAULT: "hsl(var(--status-warning))",
            soft: "hsl(var(--status-warning-soft))",
            foreground: "hsl(var(--status-warning-foreground))",
          },
          error: {
            DEFAULT: "hsl(var(--status-error))",
            soft: "hsl(var(--status-error-soft))",
            foreground: "hsl(var(--status-error-foreground))",
          },
          offline: {
            DEFAULT: "hsl(var(--status-offline))",
            soft: "hsl(var(--status-offline-soft))",
            foreground: "hsl(var(--status-offline-foreground))",
          },
          reserved: {
            DEFAULT: "hsl(var(--status-reserved))",
            soft: "hsl(var(--status-reserved-soft))",
            foreground: "hsl(var(--status-reserved-foreground))",
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
