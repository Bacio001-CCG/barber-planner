import { InteractableTypes, FramerMotion } from "@/index"
export default function Toggle({ label, value, onChange, hasError, description }: InteractableTypes.ToggleProps) {

    return (
        <div
            className={`
                flex flex-row items-center justify-between w-full
                ${label || description ? 'flex flex-row items-center justify-between w-full' : 'w-max'}
            `}
        >
            <label
                className='flex flex-col gap-1 flex-1'
            >
                <span className='text-sm tracking-wider text-txt-one'>{label}</span>
                <span className='text-txt-two font-normal text-sm'>{description}</span>
            </label>

            <span
                className="relative flex items-center justify-center w-10 h-6 bg-bg-light rounded-full cursor-pointer border border-border/10 shadow"
                onClick={(e) => {
                    e.preventDefault();
                    onChange(!value)
                }}
            >
                <FramerMotion.motion.span
                    initial={'off'}
                    animate={value ? 'on' : 'off'}
                    variants={{
                        off: { x: -15 },
                        on: { x: 15 },
                    }}
                    className={`
                 absolute size-6 rounded-full transform shadow text-center text-[10px] flex items-center justify-center font-semibold text-txt-one
                 ${value ? 'bg-accent' : 'bg-bg-extra-light'}
                `}
                >
                </FramerMotion.motion.span>
            </span>
        </div>
    )

}