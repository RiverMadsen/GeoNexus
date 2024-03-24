import React, { createContext, useReducer, useEffect, useContext } from 'react';

// Define the shape of your settings state
type SettingsState = {
  units: 'metric' | 'english';
  // add other settings here
};

// Define actions for changing settings
type SettingsAction = {
  type: 'SET_UNITS';
  payload: 'metric' | 'english';
  // add other actions here
};

// Reducer function to handle state changes
function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case 'SET_UNITS':
      return { ...state, units: action.payload };
    // handle other actions
    default:
      return state;
  }
}

// Create a context for the settings
const SettingsContext = createContext<{
  state: SettingsState;
  dispatch: React.Dispatch<SettingsAction>;
}>({ state: { units: 'metric' }, dispatch: () => null });

// Component to provide the settings context
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, { units: 'metric' });

  useEffect(() => {
    console.log("Settings changed:", state  );
  }, [state]);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use settings
export function useSettings() {
  return useContext(SettingsContext);
}
