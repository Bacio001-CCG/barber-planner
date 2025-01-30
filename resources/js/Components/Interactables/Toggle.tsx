import { FramerMotion, InteractableTypes } from '@/index';
export default function Toggle({
    label,
    value,
    onChange,
    hasError,
    description,
}: InteractableTypes.ToggleProps) {
    return (
        <div
            className={`flex w-full flex-row items-center justify-between ${label || description ? 'flex w-full flex-row items-center justify-between' : 'w-max'} `}
        >
            <label className="flex flex-1 flex-col gap-1">
                <span className="text-sm tracking-wider text-txt-one">
                    {label}
                </span>
                <span className="text-sm font-normal text-txt-two">
                    {description}
                </span>
            </label>

            <span
                className="relative flex h-6 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-bg-light shadow"
                onClick={(e) => {
                    e.preventDefault();
                    onChange(!value);
                }}
            >
                <FramerMotion.motion.span
                    initial={'off'}
                    animate={value ? 'on' : 'off'}
                    variants={{
                        off: { x: -15 },
                        on: { x: 15 },
                    }}
                    className={`absolute flex size-6 transform items-center justify-center rounded-full text-center text-[10px] font-semibold text-txt-one shadow-2xl ${value ? 'bg-accent' : 'border border-border bg-bg-extra-light'} `}
                ></FramerMotion.motion.span>
            </span>
        </div>
    );
}
