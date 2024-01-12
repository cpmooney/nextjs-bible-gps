"use client";

import { ArrowDownOnSquareIcon, ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { exportAllCards } from "app/actions";

export default function ExportImportComponent() {
  const onExportClick = async () => {
    const tsv =  await exportAllCards();
    console.log(tsv);
  }

  const onImportClick = () => {
    console.log("Import clicked");
  }

  return (<div className="card w-96 bg-base-100 shadow-xl mt-4">
        <div className="card-actions">
          <button
            className="btn btn-btnPrimary ml-2 mr-2 mt-2 mb-2"
            onClick={onExportClick}
          >
            <ArrowDownOnSquareIcon className="w-6" />
          </button>
          <button
            className="btn btn-btnPrimary ml-2 mr-2 mt-2 mb-2"
            onClick={onImportClick}
          >
            <ArrowUpOnSquareIcon className="w-6" />
          </button>
          </div>
          </div>
  );
}
