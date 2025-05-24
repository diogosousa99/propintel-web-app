type Props = {
    title: string;
    subtitle: string;
};

export function ModuleTitle({ title, subtitle }: Props) {
    return (
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-black">{title}</h1>
            <p className="text-xs text-neutral-content">{subtitle}</p>
        </div>
    );
}
