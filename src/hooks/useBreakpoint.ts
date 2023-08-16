import { useEffect, useState } from "react";

const BREAK_POINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export function useBreakpoint({ size }: { size: keyof typeof BREAK_POINTS }) {
  const [width, setWidth] = useState(0);
  const selectedSize = BREAK_POINTS[size];

  useEffect(() => {
    const getScreenWidth = () => {
      const screenWidth = window.innerWidth;
      setWidth(() => screenWidth);
    };

    window.addEventListener("resize", getScreenWidth);
    return () => window.removeEventListener("resize", getScreenWidth);
  }, []);

  return width <= selectedSize;
}
