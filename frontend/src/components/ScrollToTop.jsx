import { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true); // Show the button after scrolling 200px
    } else {
      setIsVisible(false); // Hide the button when at the top
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  useEffect(() => {
    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <FaArrowCircleUp
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 p-3 text-6xl hover:text-blue-700"
      />
    )
  );
};

export default ScrollToTopButton;
