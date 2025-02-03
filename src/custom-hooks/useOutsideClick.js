import { useEffect } from "react";

// Custom hook to detect clicks outside of a given ref
const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    // Function to handle outside clicks
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Add event listener for click outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
