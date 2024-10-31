import { InteractableTypes, React } from '@/index';

export default function Input({
    name,
    label,
    required = false,
    options = [],
    value,
    hasError = false,
    onChange
}: InteractableTypes.SelectProps) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="relative w-full text-txt-one" ref={containerRef}>
            {/* Display Section  */}
            <div
                className={`flex max-h-[85px] min-h-[42px] w-full select-none flex-wrap items-center gap-2 overflow-y-auto rounded border bg-bg-light px-[0.75rem] py-[0.5rem] text-txt-two focus:outline-none ${hasError ? 'border-red-500 focus:border-red-500' : 'border-border/10 focus:border-border/10'} focus:ring-0`}
                onClick={() => setOpen((prev) => !prev)}
            >
                {value}
            </div>

            {/* Options Section */}
            {open && (
                <ul className="absolute left-0 top-[calc(100%+0.5rem)] z-30 max-h-[200px] w-full overflow-y-auto rounded border border-border/10 bg-bg-normal">
                    {options.map((option, index) => {
                        return (
                            <SelectItem
                                onChange={onChange}
                                key={index}
                                index={index}
                                option={option}
                            />
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

function SelectItem({
    index,
    option,
    onChange,
}: {
    index: number;
    option: { value: string; label: string };
    onChange: Function;
}) {
    return (
        <li
            key={index}
            className="flex cursor-pointer gap-[10px] px-[0.75rem] py-[0.5rem] hover:bg-bg-light"
            onClick={(e) => {
                e.stopPropagation();
                onChange(option.value);
            }}
        >
            <span>{option.label}</span>
        </li>
    );
}
