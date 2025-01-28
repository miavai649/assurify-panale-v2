import React, { createContext, useContext, useReducer, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface ColorModeState {
  colorMode: string;
}

interface ColorModeContextType {
  state: ColorModeState;
  setColorModes: (mode: string) => void;
}

const colorModeReducer = (
  state: ColorModeState,
  action: { type: string; payload: string },
) => {
  switch (action.type) {
    case 'SET_COLOR_MODE':
      return { colorMode: action.payload };
    default:
      return state;
  }
};

const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined,
);

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [storedColorMode, setStoredColorMode] = useLocalStorage(
    'color-mode',
    'light',
  );

  const [state, dispatch] = useReducer(colorModeReducer, {
    colorMode: storedColorMode,
  });

  useEffect(() => {
    dispatch({ type: 'SET_COLOR_MODE', payload: storedColorMode });
  }, [storedColorMode]);

  const setColorModes = (mode: string) => {
    setStoredColorMode(mode);
    dispatch({ type: 'SET_COLOR_MODE', payload: mode });
  };

  return (
    <ColorModeContext.Provider value={{ state, setColorModes }}>
      {children}
    </ColorModeContext.Provider>
  );
};

// Custom hook to use the context
export const useColorModeContext = (): ColorModeContextType => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error(
      'useColorModeContext must be used within a ColorModeProvider',
    );
  }
  return context;
};
