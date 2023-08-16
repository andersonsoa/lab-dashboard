import { createContext } from "react";

interface DrawerContextProps {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export const DrawerContext = createContext<DrawerContextProps>(
  {} as DrawerContextProps,
);
