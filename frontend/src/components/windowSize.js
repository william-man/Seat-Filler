import { useState, useEffect } from "react";

const windowWidth = () => {
  return window.screen.width;
};

const Size = () => {
  const [width, setWidth] = useState(windowWidth());

  useEffect(() => {
    const resize = () => {
      setWidth(windowWidth());
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return width;
};

export default Size;
