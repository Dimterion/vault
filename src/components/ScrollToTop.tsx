import { useScrollToTop } from "../hooks/useScrollToTop";

export default function ScrollToTop() {
  const showButton = useScrollToTop(300);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed right-3 bottom-3 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-black shadow-lg transition-opacity hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none sm:right-6 sm:bottom-6 sm:h-12 sm:w-12"
      aria-label="Scroll to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    </button>
  );
}
