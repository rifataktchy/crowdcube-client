import { useTheme } from "../context/ThemeContext"; // Import the hook

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme(); // Access the theme and toggle function

  return (
    <button onClick={toggleTheme} className="p-2">
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
};

export default ThemeToggle;
