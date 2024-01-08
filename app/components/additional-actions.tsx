"use client";

import {SignedIn} from "@clerk/nextjs";
import {
  InformationCircleIcon,
  LightBulbIcon,
  ListBulletIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import {CitationInfo} from "./citation-info";
import {showModal} from "./modal";
import {PartialCitationModal} from "./partial-citations";

export const AdditionalActionComponents = () => {
  const router = useRouter();

  const showFullCitation = () => showModal("full_citation");
  const createPartialCitation = () => showModal("create_partial_citation");
  const addNewCitation = () => router.push("/partial-list");
  const gotoList = () => router.push("/list");

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl mt-4">
        <div className="card-actions">
          <button
            className="btn btn-btnPrimary ml-2 mr-2 mt-2 mb-2"
            onClick={showFullCitation}
          >
            <InformationCircleIcon className="w-6" />
          </button>
          <SignedIn>
            <button
              className="btn btn-btnPrimary mr-2 mt-2 mb-2"
              onClick={addNewCitation}
            >
              <PlusCircleIcon className="w-6" />
            </button>
            <button
              className="btn btn-btnPrimary mr-2 mt-2 mb-2"
              onClick={createPartialCitation}
            >
              <LightBulbIcon className="w-6" />
            </button>
          </SignedIn>
          <button
            className="btn btn-btnPrimary mr-2 mt-2 mb-2"
            onClick={gotoList}
          >
            <ListBulletIcon className="w-6" />
          </button>
        </div>
      </div>
      <div>
        <PartialCitationModal />
        <CitationInfo />
      </div>
    </>
  );
};
