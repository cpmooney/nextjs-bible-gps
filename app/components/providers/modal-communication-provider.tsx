"use client";
import { ReactNode, createContext, useContext, useState } from "react";

type CloseModalCallback = (data: unknown) => void;
interface CloseModalCallbackWrapper {
    callback?: CloseModalCallback;
}

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
    const [closeModalCallback, setCloseModalCallback] = useState<CloseModalCallbackWrapper>({});
    const declareCloseModalCallback = (callback: CloseModalCallback) => {
        setCloseModalCallback({ callback });
    };

    const invokeCloseModalCallback = (data: unknown) => {
        if (!closeModalCallback.callback) {
            throw new Error("No callback declared for closing modal");
        }
        closeModalCallback.callback(data);
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