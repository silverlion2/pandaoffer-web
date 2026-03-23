"use client";

import { createContext, useContext, useState, useEffect } from "react";

const ModeContext = createContext({});

export function ModeProvider({ children }) {
  const [mode, setModeState] = useState("application"); // 'application' | 'life'
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedMode = localStorage.getItem("pandaoffer_mode");
    if (savedMode === "life" || savedMode === "application") {
      setModeState(savedMode);
    }
  }, []);

  const setMode = (newMode) => {
    setModeState(newMode);
    localStorage.setItem("pandaoffer_mode", newMode);
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, isMounted }}>
      {children}
    </ModeContext.Provider>
  );
}

export const useMode = () => useContext(ModeContext);
