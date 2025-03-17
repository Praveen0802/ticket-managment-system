import { useState, useEffect } from "react";
import { debounce } from "lodash";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleWindowResize = debounce(() => {
      setIsMobile(window.innerWidth <= 768);
    }, 50);

    handleWindowResize();
    window.addEventListener("resize", handleWindowResize, true);
    return () =>
      window.removeEventListener("resize", handleWindowResize, false);
  }, []);

  return isMobile;
};

export default useIsMobile;
