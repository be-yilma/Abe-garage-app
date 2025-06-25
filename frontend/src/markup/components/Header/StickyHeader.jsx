import { useEffect } from "react";

function useStickyHeader() {
  useEffect(() => {
    const header = document.querySelector(".main-header");

    const handleScroll = () => {
      if (window.scrollY > 150) {
        header?.classList.add("fixed-header");
      } else {
        header?.classList.remove("fixed-header");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });
}

export default useStickyHeader;
