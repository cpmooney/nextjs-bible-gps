"use client";
interface Props {
    title: string;
    onClick: () => void;
}

// TODO: Eliminate this component in favor of a css solution

export const ActionButton = ({ title, onClick }: Props) => {
    return (
        <button className="w-full justify-center m-4 bg-teal-200 p-4" onClick={onClick}>
            {title}
        </button>
    );
};