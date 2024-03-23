import  { createContext } from 'react';

// Create a context for the settings
export const MenuContext = createContext({
    activeMenuItem: '',
    isMenuOpen: false,
    setActiveMenuItem: (value: string) => {},
});
