import { createContext, useContext } from "react";

export interface LayoutContextType {
  navVisible: boolean;
  tabVisible: boolean;
  setNavVisible?: (visible: boolean) => void;
  setTabVisible?: (visible: boolean) => void;
}

export const LayoutContext = createContext<LayoutContextType>({
  navVisible: true,
  tabVisible: true,
});

export const useLayoutContext = () => useContext(LayoutContext);
