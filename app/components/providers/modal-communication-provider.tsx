"use client";
import { ConsoleLogWriter } from "drizzle-orm";
import { ReactNode, createContext, useContext, useState } from "react";

type CloseModalCallback = (data: unknown) => void;

export interface ModalCommunicationContext {
    declareCloseModalCallback: (callback: CloseModalCallback) => void;
    invokeCloseModalCallback: (data: unknown) => void;
}

interface ModalCommunicationProviderProps {
    children: ReactNode;
}

export const useModalCommunicationContext = () => {
    const context = useContext(ModalCommunicationContext);
    if (!context) {
        throw new Error(
            "useModalCommunicationContext must be used within a ModalCommunicationProvider"
        );
    }
    return context;
}

export const ModalCommunicationProvider = (props: ModalCommunicationProviderProps) => {
    const [closeModalCallback, setCloseModalCallback] = useState<CloseModalCallback | null>(null);
    const declareCloseModalCallback = (callback: CloseModalCallback) => {
        setCloseModalCallback(callback);
    };

    const invokeCloseModalCallback = (data: unknown) => {
        if (!closeModalCallback) {
            throw new Error("No callback declared for closing modal");
        }
        closeModalCallback(data);
    }

    return (
        <ModalCommunicationContext.Provider value={{
            declareCloseModalCallback,
            invokeCloseModalCallback
            }}>
            {props.children}
        </ModalCommunicationContext.Provider>
    );
}

const ModalCommunicationContext = createContext<ModalCommunicationContext | null>(null);