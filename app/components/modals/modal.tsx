"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

interface ModalProps {
  contents: JSX.Element;
  name: string;
  onShow?: () => void;
}

export const Modal = (props: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { name, onShow } = props;
  const modalId = makeModalId(name);
  const closeMe = () => closeModal(name);
  useEffect(() => {
    console.log(dialogRef.current?.id)
    dialogRef.current?.addEventListener("show", (event) => {
      console.log('dude')
      if (event instanceof CustomEvent) {
          if (onShow) {
            onShow();
          }
      }
    });
  }, [onShow]);
  return (
    <dialog id={modalId} className="modal" ref={dialogRef}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={closeMe}
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
        {props.contents}
      </div>
    </dialog>
  );
};

export const showModal = (name: string) => {
  const modal = obtainModal(name);
  if (modal) {
    modal.showModal();
  }
};

export const closeModal = (name: string) => {
  const modal = obtainModal(name);
  if (modal) {
    modal.close();
  }
};

const makeModalId = (name: string) => {
  return `modal_${name}`;
};

const obtainModal = (name: string): HTMLDialogElement => {
  const modalId = makeModalId(name);
  const modal = document.getElementById(modalId);
  if (!modal) {
    throw new Error(`Could not find modal with name ${name} id ${modalId}`);
  }
  if (!(modal instanceof HTMLDialogElement)) {
    throw new Error(`Element with id ${modalId} is not a dialog element`);
  }
  return modal;
};
