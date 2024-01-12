"use client";

export default function ExportButton() {
    return (
        <button
            onClick={() => {
                alert('export!')
            }}
        >
            Export
        </button>
    );
}