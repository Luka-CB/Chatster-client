import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<number | string | any>("");

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, [window]);

  return windowSize;
};
