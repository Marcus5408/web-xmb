import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dawn" | "day" | "dusk" | "night" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const body = window.document.body;
    // Remove all theme classes
    body.classList.remove("dawn", "day", "dusk", "night", "light", "dark");

    // Helper to set background image
    const setBackground = (themeName: Theme) => {
      let bg = "";
      switch (themeName) {
        case "dawn":
          bg = "/dawn.png";
          break;
        case "day":
          bg = "/day.png";
          break;
        case "dusk":
          bg = "/dusk.png";
          break;
        case "night":
          bg = "/night.png";
          break;
        default:
          bg = "";
      }
      body.style.backgroundImage = bg ? `url(${bg})` : "";
      body.style.backgroundSize = bg ? "cover" : "";
      body.style.backgroundRepeat = bg ? "no-repeat" : "";
      body.style.backgroundPosition = bg ? "center center" : "";
    };

    let appliedTheme: Theme = theme;
    let colorScheme: "light" | "dark" = "light";

    if (theme === "system") {
      const systemIsDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      appliedTheme = systemIsDark ? "night" : "day";
    }

    // Map to color scheme
    if (appliedTheme === "dawn" || appliedTheme === "day") {
      colorScheme = "light";
    } else if (appliedTheme === "dusk" || appliedTheme === "night") {
      colorScheme = "dark";
    }

    body.classList.add(appliedTheme);
    body.classList.add(colorScheme);
    setBackground(appliedTheme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
