import  { createContext } from 'react';

// Create a context for the settings
export const MenuContext = createContext({
    activeMenuItem: '',
    setActiveMenuItem: (value: string) => {},
});
