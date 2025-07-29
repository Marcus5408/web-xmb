import { Sunrise, Sun, Sunset, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const isSystemTheme = theme === "system";
  // if system theme, identify the real theme based on the system
  const realTheme = isSystemTheme
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "night"
      : "day"
    : theme;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {{
            dawn: <Sunrise className="h-[1.2rem] w-[1.2rem] transition-all" />,
            day: <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />,
            dusk: <Sunset className="h-[1.2rem] w-[1.2rem] transition-all" />,
            night: <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />,
          }[isSystemTheme ? realTheme : theme] ?? (
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
          )}
          <span className="sr-only">Change theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("dawn")}>
          <Sunrise /> Dawn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("day")}>
          <Sun /> Day
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dusk")}>
          <Sunset /> Dusk
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("night")}>
          <Moon /> Night
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
