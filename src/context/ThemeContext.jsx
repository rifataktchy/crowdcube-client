// context/ThemeContext.js
import { createContext, useContext, useState, useEffect } from "react";

// Create a Context for theme
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply the theme class on the document element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark"); // Add dark class on <html>
    } else {
      document.documentElement.classList.remove("dark"); // Remove dark class
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
