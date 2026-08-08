import { Moon, Sun } from "lucide-react";
import React from "react";

export type Theme = "light" | "dark" | "system";

export type ThemeSwitcherProps = {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
};

export const ThemeSwitcher = ({ currentTheme, onThemeChange }: ThemeSwitcherProps) => {
  const themes: { theme: Theme; icon: React.ReactNode; label: string }[] = [
    { theme: "light", icon: <Sun className="h-4 w-4" />, label: "Light" },
    {
      theme: "system",
      icon: <div className="h-4 w-4 rounded-full border border-current" />,
      label: "System",
    },
    { theme: "dark", icon: <Moon className="h-4 w-4" />, label: "Dark" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-md border border-border bg-muted p-1">
      {themes.map(({ theme, icon, label }) => (
        <button
          key={theme}
          onClick={() => onThemeChange(theme)}
          className={`inline-flex items-center justify-center rounded px-2 py-1.5 transition-colors ${
            currentTheme === theme
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label={`Switch to ${label} theme`}
          title={label}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};
