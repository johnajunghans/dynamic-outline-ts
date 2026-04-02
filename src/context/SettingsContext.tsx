import { createContext, ReactNode } from "react";

const SettingsContext = createContext({});

export const SettingsContextProvider = ({ children }: { children: ReactNode }) => {
    return ( 
        <SettingsContext.Provider value={{}}>
            { children }
        </SettingsContext.Provider>
     );
};
