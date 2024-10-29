// ExcelViewer.tsx
import AnswersList from "./_components/AnswersList";
import { useTheme } from "../../Context/ThemeContext";

const ExcelViewer = () => {
  const { theme } = useTheme(); // Get the current theme from context

  // Apply the theme class to the container
  const containerClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";

  return (
    <div
      className={`${containerClass} overflow-hidden flex flex-col items-center p-4 min-h-screen`}
    >
      {/* Answers List */}
      <AnswersList />
    </div>
  );
};

export default ExcelViewer;
