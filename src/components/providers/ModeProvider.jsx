"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { createContext, useContext, useState, useEffect } from "react";

const ModeContext = createContext({});

export function ModeProvider({ children }) {
  const [mode, setModeState] = useState("application"); // 'application' | 'life'
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedMode = localStorage.getItem("pandaoffer_mode");
      if (savedMode === "life" || savedMode === "application") setModeState(savedMode);
    } catch { /* Storage is optional in restricted browsers. */ }
  }, []);

  const setMode = (newMode) => {
    if (newMode !== 'life' && newMode !== 'application') return;
    setModeState(newMode);
    try { localStorage.setItem("pandaoffer_mode", newMode); } catch { /* Keep the current session usable. */ }
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, isMounted }}>
      {children}
    </ModeContext.Provider>
  );
}

export const useMode = () => useContext(ModeContext);
