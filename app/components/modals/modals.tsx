import { CitationInfo } from "./citation-info";
import { EditFilter } from "./edit-filter";
import ExportImportModal from "./export-import-modal";
import { PartialCitationModal } from "./partial-citations";
import { TagSelectionModal } from "./tag-selection-modal";

// TODO: Gather names to a list here for strong typing

export function ModalCollection() {
  return (
    <div>
      <PartialCitationModal />
      <ExportImportModal />
      <CitationInfo />
      <EditFilter />
      <TagSelectionModal />
    </div>
  );
}
