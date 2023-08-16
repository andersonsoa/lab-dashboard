import { DrawerContext } from "@/context/drawer";
import { ReactNode, useCallback, useEffect, useState } from "react";

interface DrawerProviderProps {
  children: ReactNode;
}

export function DrawerProvider({ children }: DrawerProviderProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = useCallback(() => {
    setIsOpen((cur) => !cur);
  }, []);
  const open = useCallback(() => setIsOpen(() => true), []);
  const close = useCallback(() => setIsOpen(() => false), []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= 768) {
        close();
        return;
      }
      open();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [close, open]);
  return (
    <DrawerContext.Provider value={{ isOpen, close, open, toggle }}>
      {children}
    </DrawerContext.Provider>
  );
}
