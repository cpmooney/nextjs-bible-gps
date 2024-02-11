import { loadPartialCitations } from "app/actions";
import PartialCardList from "./components/partial-card-list";

export default async function PartialCitationList() {
  const partialCitationList = await loadPartialCitations();

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <PartialCardList partialCitationList={partialCitationList} />
      </div>
    </div>
  );
}

