import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  contents: JSX.Element;
  name: string;
}

export const Modal = (props: ModalProps) => {
  const { name } = props;
  const modalId = makeModalId(name);
  const closeMe = () => closeModal(name);
  return (
    <dialog id={modalId} className="modal">
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
