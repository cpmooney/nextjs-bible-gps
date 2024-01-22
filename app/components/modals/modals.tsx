import { CitationInfo } from "./citation-info";
import { EditFilter } from "./edit-filter";
import ExportImportModal from "./export-import-modal";
import { PartialCitationModal } from "./partial-citations";

export function ModalCollection() {
  return (
    <div>
      <PartialCitationModal />
      <ExportImportModal />
      <CitationInfo />
      <EditFilter />
    </div>
  );
}
