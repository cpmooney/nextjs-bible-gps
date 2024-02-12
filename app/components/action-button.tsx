"use client";
interface Props {
    title: string;
    onClick: () => void;
}

// TODO: Eliminate this component in favor of a css solution

export const ActionButton = ({ title, onClick }: Props) => {
    return (
        <button className="justify-center m-4 text-white bg-dark-gray-1 p-4" onClick={onClick}>
            {title}
        </button>
    );
};