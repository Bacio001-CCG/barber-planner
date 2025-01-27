import { InteractableTypes, React, Toast } from '@/index';

export default function Input({
    name,
    label,
    required = false,
    options = [],
    onAdd,
    onDelete,
    values = [],
    hasError = false,
    emptyMessage,
    allowOnceMultipleTimes = false,
}: InteractableTypes.MultiSelectProps) {
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
            <label
                htmlFor={name !== undefined ? name : undefined}
                className="absolute -top-2.5 left-2 z-20 bg-transparent px-1 text-sm tracking-wider"
            >
                {label}{' '}
                <span className="text-xs text-txt-two">{required && '*'}</span>
            </label>
            <input
                type="hidden"
                name={name !== undefined ? name : undefined}
                value={values.join(',')}
            />

            {/* Display Section  */}
            <div
                className={`flex max-h-[85px] min-h-[42px] w-full select-none flex-wrap items-center gap-2 overflow-y-auto rounded border bg-bg-light px-[0.75rem] py-[0.5rem] text-txt-two focus:outline-none ${hasError ? 'border-red-500 focus:border-red-500' : 'border-border/10 focus:border-border/10'} focus:ring-0`}
                onClick={() => {
                    if (options.length != 0) setOpen((prev) => !prev);
                    if (options.length == 0 && emptyMessage)
                        Toast.toast(emptyMessage, {
                            type: 'error',
                            position: 'bottom-right',
                        });
                }}
            >
                {values.map((value, index) => {
                    return (
                        <SelectedItem
                            key={index}
                            value={value}
                            index={index}
                            onDelete={onDelete}
                        />
                    );
                })}
                {values.length === 0 && (
                    <span className="material-symbols-outlined scale-75">
                        add_circle
                    </span>
                )}
            </div>

            {/* Options Section */}
            {open && (
                <ul className="absolute left-0 top-[calc(100%+0.5rem)] z-30 max-h-[200px] w-full overflow-y-auto rounded border border-border/10 bg-bg-normal">
                    {options.map((option, index) => {
                        return (
                            <SelectItem
                                key={index}
                                onAdd={onAdd}
                                index={index}
                                option={option}
                                values={values}
                                onDelete={onDelete}
                                allowOnceMultipleTimes={allowOnceMultipleTimes}
                            />
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

function SelectItem({
    onAdd,
    index,
    option,
    values,
    onDelete,
    allowOnceMultipleTimes,
}: {
    onAdd: Function;
    index: number;
    option: { value: string; label: string };
    values: string[];
    onDelete: Function;
    allowOnceMultipleTimes: boolean;
}) {
    return (
        <li
            key={index}
            className="flex cursor-pointer gap-[10px] px-[0.75rem] py-[0.5rem] hover:bg-bg-light"
            onClick={(e) => {
                if (values.includes(option.label) && !allowOnceMultipleTimes)
                    onDelete(option.label);
                else onAdd(option.value);
            }}
        >
            {allowOnceMultipleTimes ? (
                <div className="my-auto flex h-[15px] w-[15px] items-center justify-center rounded p-0.5">
                    <span className="material-symbols-outlined scale-90 text-accent">
                        add
                    </span>
                </div>
            ) : (
                <div className="my-auto flex h-[15px] w-[15px] items-center justify-center rounded border border-border/10 p-0.5">
                    {values.includes(option.label) && (
                        <div className="h-full w-full rounded-sm bg-accent"></div>
                    )}
                </div>
            )}

            <span>{option.label}</span>
        </li>
    );
}

function SelectedItem({
    value,
    index,
    onDelete,
}: {
    value: string;
    index: number;
    onDelete: Function;
}) {
    return (
        <span
            key={index}
            className="z-10 flex items-center whitespace-nowrap rounded bg-bg-normal px-[0.5rem] py-[0.2rem]"
        >
            {value}
            <span
                className="material-symbols-outlined scale-[70%] cursor-pointer text-red-500"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(value);
                }}
            >
                close
            </span>
        </span>
    );
}
