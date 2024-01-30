"use client";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type CloseModalCallback = (data: unknown) => void;
interface ModalInitializationParams {
  callback?: CloseModalCallback;
  data?: unknown;
}

export interface ModalCommunicationContext {
  initializeModal: (params: ModalInitializationParams) => void;
  invokeCloseModalCallback: (data: unknown) => void;
  obtainInformationAsModal: () => unknown;
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
};

export const ModalCommunicationProvider = (
  props: ModalCommunicationProviderProps
) => {
  const [params, setParams] = useState<ModalInitializationParams>({});

  const invokeCloseModalCallback = useCallback(
    (data: unknown) => {
      if (!params.callback) {
        throw new Error("No callback declared for closing modal");
      }
      params.callback(data);
    },
    [params]
  );

  const obtainInformationAsModal = () => {
    return params?.data;
  };

  return (
    <ModalCommunicationContext.Provider
      value={{
        initializeModal: (params: ModalInitializationParams) =>
          setParams(params),
        invokeCloseModalCallback,
        obtainInformationAsModal,
      }}
    >
      {props.children}
    </ModalCommunicationContext.Provider>
  );
};

const ModalCommunicationContext =
  createContext<ModalCommunicationContext | null>(null);
