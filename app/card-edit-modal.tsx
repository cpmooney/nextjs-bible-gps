import { Card } from "@/models/card";
import { Modal } from "./modal";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface CardEditProps {
    card: Card;
}

export const CardEditModal = (props: CardEditProps) => {
    return Modal({
        name: "edit_citation",
        contents: (
            <div>
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">{props.card.fullCitation}</h3>
                    <p className="text-lg">{props.card.entire}</p>
                </div>
                <div className="modal-action">
                    <button
                        className="btn btn-btnPrimary mr-2 mt-2 mb-2"
                    >
                            <CheckCircleIcon className="h-8 w-8" />
                    </button>
                </div>
            </div>
        ),
    });
}