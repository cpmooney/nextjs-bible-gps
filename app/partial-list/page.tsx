import { loadPartialCitations } from "app/actions";
import PartialCitationElement from "./components/partial-card";

export default async function PartialCitationList() {
  const partialCitationList = await loadPartialCitations();

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        {partialCitationList.map(({ id, fragment }) => (
          <PartialCitationElement key={id} id={id} fragment={fragment} />
        ))}
      </div>
    </div>
  );
}
