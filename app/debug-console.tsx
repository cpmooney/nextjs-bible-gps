import { DebugMessage, LogLevel } from "@/utilities/debugger";
import { useState } from "react";

export const useDebugMessages = () => {
  const [debugMessages, setDebugMessages] = useState<DebugMessage[]>([]);
  
  const appendDebugMessage = (debugMessages: DebugMessage[]) => {
    setDebugMessages([...debugMessages, ...debugMessages]);
  };
  
  const resetDebugMessages = () => {
    setDebugMessages([]);
  }
  
  return {
    debugMessages,
    appendDebugMessage,
    resetDebugMessages
  };
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
      
      interface DebugConsoleProps {
        debugMessages: DebugMessage[];
      }
      