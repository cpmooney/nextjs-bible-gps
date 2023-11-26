interface ModalProps {
  contents: JSX.Element;
  name: string;
}

export const Modal = (props: ModalProps) => {
  const modalId = makeModalId(props.name);
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
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
}

export const closeModal = (name: string) => {
    const modal = obtainModal(name);
    if (modal) {
        modal.close();
    }
}

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
