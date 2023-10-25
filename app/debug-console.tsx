import { DebugMessage, LogLevel } from "@/types/interfaces/db-management";
import { useState } from "react";

const messageColor: Record<LogLevel, string> = {
  info: "darkblue",
  warn: "orange",
  error: "red"
};

const formatTimestamp = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
}

const DebugMessageBox = (debugMessage: DebugMessage) => {
  const timestamp = formatTimestamp(debugMessage.timestamp);
  const { message } = debugMessage;
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "1px",
        color: messageColor[debugMessage.level]
      }}
    >
      <pre>{timestamp}</pre>
      <pre>{message}</pre>
    </div>
  );
};

export const useDebugMessages = () => {
    const [debugMessages, setDebugMessages] = useState<DebugMessage[]>([]);
    
    const appendDebugMessage = (debugMessages: DebugMessage[]) => {
      setDebugMessages([...debugMessages, ...debugMessages]);
    };
    
    return {
        debugMessages,
        appendDebugMessage,
    };
}

interface DebugConsoleProps {
  debugMessages: DebugMessage[];
}

export const DebugConsole = (props: DebugConsoleProps) => {
  const { debugMessages } = props;
  return (
    <div>
        {debugMessages.map((debugMessage) => (
            <DebugMessageBox {...debugMessage} key={debugMessage.timestamp} />
        ))}
    </div>
  );
};
