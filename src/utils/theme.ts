export type UiTheme = "sleek" | "high-contrast" | "cyberpunk" | "light";

export interface ThemeOption {
  id: UiTheme;
  name: string;
  badge: string;
  description: string;
  accentBg: string;
  accentText: string;
  previewColors: string[];
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "sleek",
    name: "Sleek Studio",
    badge: "DEFAULT",
    description: "Refined dark slate with deep blue & purple precision accents",
    accentBg: "bg-blue-600",
    accentText: "text-blue-400",
    previewColors: ["#0f172a", "#1e293b", "#3b82f6", "#a855f7"],
  },
  {
    id: "light",
    name: "Clean Light",
    badge: "MINIMAL",
    description: "Crisp white canvas with high-contrast text and subtle borders",
    accentBg: "bg-zinc-900 text-white",
    accentText: "text-zinc-900",
    previewColors: ["#ffffff", "#f4f4f5", "#18181b", "#e4e4e7"],
  },
  {
    id: "high-contrast",
    name: "High-Contrast",
    badge: "WCAG AAA",
    description: "Maximum legibility with deep black, bold white borders & bright yellow/lime focus state",
    accentBg: "bg-yellow-400 text-black",
    accentText: "text-yellow-300",
    previewColors: ["#000000", "#18181b", "#facc15", "#84cc16"],
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Matrix",
    badge: "NEON",
    description: "Futuristic dark neon canvas with electric pink, cyan glow & matrix vibes",
    accentBg: "bg-gradient-to-r from-pink-600 to-cyan-500",
    accentText: "text-pink-400",
    previewColors: ["#0d021a", "#1a0826", "#ff007f", "#00f0ff"],
  },
];

const THEME_STORAGE_KEY = "core_brain_theme_preference";

export function getStoredTheme(): UiTheme {
  if (typeof window === "undefined") return "sleek";
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "sleek" || saved === "high-contrast" || saved === "cyberpunk" || saved === "light") {
      return saved;
    }
  } catch (e) {
    console.warn("Unable to read theme from localStorage", e);
  }
  return "sleek";
}

export function applyThemeToDocument(theme: UiTheme): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.remove("theme-sleek", "theme-high-contrast", "theme-cyberpunk", "theme-light");
  root.classList.add(`theme-${theme}`);
  root.setAttribute("data-theme", theme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (e) {
    console.warn("Unable to save theme to localStorage", e);
  }
}
