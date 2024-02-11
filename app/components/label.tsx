interface Props {
    title: string;
}

export default function Label({ title }: Props) {
    return <div className="mb-4">
        <label className="text-xl font-bold uppercase">{title}</label>
    </div>
}
