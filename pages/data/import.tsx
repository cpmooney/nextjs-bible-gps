import {isDevelopment} from "@/utilities/env";
import {trpc} from "@/utilities/trpc";
import {DebugConsole, useDebugMessages} from "app/debug-console";
import {InferGetServerSidePropsType} from "next";

export const getServerSideProps = async () => {
  return {props: {isDevelopment: isDevelopment()}};
};

const App = ({
  isDevelopment,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {debugMessages, appendDebugMessage, resetDebugMessages} = useDebugMessages();

  const dbDropProcedure = trpc.dbDropProcedure.useMutation();
  const dbSeedProcedure = trpc.dbSeedProcedure.useMutation();

  const reseed = async () => {
    if (isDevelopment) {
      const dropResponse = await dbDropProcedure.mutateAsync({});
      appendDebugMessage(dropResponse);

      const seedResponse = await dbSeedProcedure.mutateAsync({});
      appendDebugMessage(seedResponse);
    } else {
      appendDebugMessage([
        {
          action: "attempted unauthenticated db action",
          level: "error",
          message: "You cannot perform this action in production.",
          timestamp: new Date().getTime(),
        },
      ]);
    }
  };

  const testDebugMessage = () => {
    appendDebugMessage([
      {
        action: "test debug message",
        level: "info",
        message: "This is a test debug message.",
        timestamp: new Date().getTime(),
      },
    ]);
  };

  if (isDevelopment) {
    return (
      <div>
        <div>
          <button onClick={reseed}>Reseed</button>
          <button onClick={resetDebugMessages}>Clear Debug</button>
          <button onClick={testDebugMessage}>Test Debug</button>
        </div>
        <DebugConsole debugMessages={debugMessages} />
      </div>
    );
  } else {
    return (
    <div>Import functionality is only available in local</div>
    );
  }
};

export default trpc.withTRPC(App);
