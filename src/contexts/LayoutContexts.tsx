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

export interface PageSettings {
  title: string;
  navVisible?: boolean;
  tabVisible?: boolean;
}

export const PageSettings: Record<string, PageSettings> = {
  "/": { title: "홈", tabVisible: false },
  "/pages/test": { title: "테스트 페이지" },
};
