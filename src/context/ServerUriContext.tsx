import { createContext, useContext, useState, ReactNode } from "react";

const STORAGE_KEY = "aminded-server-uri";

type ServerUriContextType = {
    serverUri: string;
    setServerUri: (uri: string) => void;
};

const ServerUriContext = createContext<ServerUriContextType | undefined>(
    undefined
);

export const ServerUriProvider = ({ children }: { children: ReactNode }) => {
    const defaultUri = "http://localhost:8080";
    const [serverUri, setServerUri] = useState(() =>
        typeof window !== "undefined"
            ? localStorage.getItem(STORAGE_KEY) || defaultUri
            : defaultUri
    );

    const handleSetServerUri = (uri: string) => {
        setServerUri(uri);
        if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, uri);
        }
    };

    return (
        <ServerUriContext.Provider
            value={{ serverUri, setServerUri: handleSetServerUri }}
        >
            {children}
        </ServerUriContext.Provider>
    );
};

export const useServerUri = () => {
    const ctx = useContext(ServerUriContext);
    if (!ctx)
        throw new Error("useServerUri must be used within a ServerUriProvider");
    return ctx;
};
