import { useEffect } from "react";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function ThemeProvider() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "dark");

  useEffect(() => {
    if (!theme) return;

    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  if (!theme) return null;

  return (
    <button
      className="cursor-pointer hover:scale-95 transition-all duration-200 ease-in-out"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
