"use client";

import {ArrowsUpDownIcon} from "@heroicons/react/24/outline";
import {exportAllCards} from "app/actions";
import {useState} from "react";
import {showModal} from "../modal";
import ExportImportModal from "./export-import-modal";

export default function ExportImportButton() {
  const [content, setContent] = useState("");

  const onExportClick = async () => {
    setContent(await exportAllCards());
    showModal("export_import");
  };

  return (
    <div>
        <button
          className="btn btn-btnPrimary ml-2 mr-2 mt-2 mb-2"
          onClick={onExportClick}
        >
          <ArrowsUpDownIcon className="w-6" />
          Export
        </button>
      <ExportImportModal content={content} />
    </div>
  );
}
