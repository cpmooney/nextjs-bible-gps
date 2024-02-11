"use client";
import Label from "../label";
import { showModal } from "../modals/modal";

export default function InfoButton() {
  const modal = "full_citation";
    const onClick = () => {
    // TODO: There must be a more react-y way to accomplish this
      window.postMessage({ name: modal, action: "show" }, "*");
      showModal(modal);
  };

  return (
    <button className="flex mt-4 bg-teal-200 p-4" onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6 mr-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
        />
      </svg>
      <label>
        View This Citation
      </label>
    </button>
  );
}
