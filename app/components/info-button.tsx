"use client";
import { ActionButton } from "./action-button";
import { showModal } from "./modals/modal";

export default function InfoButton() {
  const onViewCitationClick = () => {
    // TODO: There must be a more react-y way to accomplish this
    window.postMessage({ name: "full_citation", action: "show" }, "*");
    showModal("full_citation");
  };
  return <ActionButton title="View Citation" onClick={onViewCitationClick} />;
}
