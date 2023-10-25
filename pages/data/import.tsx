import {
  DbActionChoice,
  DbActionChoices,
} from "@/types/interfaces/db-management";
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
  const {debugMessages, appendDebugMessage} = useDebugMessages();

  const dbMutation = trpc.manageDb.useMutation();

  const dispatchDbManagementAction = async (dbAction: DbActionChoice) => {
    if (isDevelopment) {
      const response = await dbMutation.mutateAsync({
        module: "aws-foundations",
        action: dbAction,
      });
      appendDebugMessage(response.debugMessages);
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

  if (isDevelopment) {
    return (
      <div>
        <div>
          {DbActionChoices.map((action) => (
            <button
              key={action}
              onClick={() => dispatchDbManagementAction(action)}
            >
              {action}
            </button>
          ))}
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
