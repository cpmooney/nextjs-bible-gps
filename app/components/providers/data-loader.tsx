import {guaranteeUserId} from "app/actions";
import {invokeDbLoadAllAction} from "src/server/db-load-all-rows";
import { DataInitializer } from "./data-initializer";

const DataProvider = async () => {
  const cards = await loadAllCards();
  // TODO: Load preferences

  return <DataInitializer
    cards={cards}
    advancedView={false}
    manualSave={false}
    promptDisplay="entire-citation"
    theme="base"
  />
};

const loadAllCards = async () => {
  const userId = await guaranteeUserId({useDemo: true});
  return await invokeDbLoadAllAction(userId);
};

export default DataProvider;
