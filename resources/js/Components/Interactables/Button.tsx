import { InteractableTypes } from '@/.';

export default function Button({
    label,
    onClick,
    icon,
    submit,
    className,
    background
}: InteractableTypes.ButtonProps) {
    return (
        <button
            type={submit ? `submit` : undefined}
            className={`${className} flex items-center justify-center gap-1 rounded border border-border/10 bg-${background ? background + '-500' : 'accent'} py-2 font-semibold tracking-widest text-txt-one transition-all duration-300 hover:bg-${background ? background + '-500/80' : 'accent'} hover:opacity-80`}
            onClick={(e) => !submit && onClick && onClick(e)}
        >
            {icon && <span className="material-symbols-outlined">{icon}</span>}
            {label}
        </button>
    );
}
