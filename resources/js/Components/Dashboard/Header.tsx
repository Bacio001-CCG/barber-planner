export default function Header({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="mb-6 w-full border-b border-border pb-3 md:mb-10">
            <h1 className="text-2xl font-bold tracking-widest text-txt-one md:text-3xl">
                {title}
            </h1>
            <p className="hidden text-txt-two md:block">{description}</p>
        </div>
    );
}
