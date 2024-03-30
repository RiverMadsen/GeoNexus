import React, { createContext, useReducer, useEffect, useContext } from 'react';

// Define the shape of your settings state
export type SettingsState = {
  units: 'metric' | 'english';
  compass: string,
  activeRoute:  string,
  nonActiveRoute:  string,
  background:  string,
  navigationVector:  string,
  // add other settings here
};

export enum SettingsActionTypes {
  SET_UNITS = 'SET_UNITS',
  COMPASS = 'COMPASS',
  BACKGROUND = 'BACKGROUND',
  ACTIVE_ROUTE = 'ACTIVE_ROUTE',
  NON_ACTIVE_ROUTE = 'NON_ACTIVE_ROUTE',
  NAVIGATION_VECTOR = 'NAVIGATION_VECTOR',

}
// Define actions for changing settings
type SettingsAction = {
    type: SettingsActionTypes.SET_UNITS;
    payload: 'metric' | 'english';
  }
  | {
    type: SettingsActionTypes;
    payload:string;
  };
  // | {
  //   type:SettingsActionTypes.BACKGROUND;
  //   payload: string;
  // }
  // | {
  //   type:SettingsActionTypes.ACTIVE_ROUTE;
  //   payload: string;
  // }
  // | {
  //   type: SettingsActionTypes.NON_ACTIVE_ROUTE;
  //   payload:string;
  // }
  // | {
  //   type:SettingsActionTypes.NAVIGATION_VECTOR;
  //   payload: string;
  // }
  //;

// Reducer function to handle state changes
function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
  switch (action.type) {
    case SettingsActionTypes.SET_UNITS:
      return { ...state, units: action.payload as 'metric'|'english' };
    // handle other actions
    case SettingsActionTypes.COMPASS:
      return { ...state, compass: action.payload };
    case SettingsActionTypes.BACKGROUND:
      console.log("setting background to: ", action.payload)
      return { ...state, background: action.payload };
    case SettingsActionTypes.ACTIVE_ROUTE:
      return { ...state, activeRoute: action.payload };
    case SettingsActionTypes.NON_ACTIVE_ROUTE:
      return { ...state, nonActiveRoute: action.payload };
    case SettingsActionTypes.NAVIGATION_VECTOR:
      return { ...state, navigationVector: action.payload };
    default:
      return state;
  }
}

// Create a context for the settings
const SettingsContext = createContext<{
  state: SettingsState;
  dispatch: React.Dispatch<SettingsAction>;
}>({ state: { units: 'metric', background: '#', nonActiveRoute: '#', activeRoute: '#', navigationVector: '#', compass: '#' }, dispatch: () => null });

// Component to provide the settings context
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, { units: 'metric', nonActiveRoute: '#FFFFFF', background: '#000000', activeRoute: '#0000FF', navigationVector: '#FFFF00', compass: '#FF00FF' });

  useEffect(() => {
    console.log("Settings changed:", state);
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
