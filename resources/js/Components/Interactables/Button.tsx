import { InteractableTypes, Loader } from '@/.';

export default function Button({
    label,
    onClick,
    icon,
    submit,
    className,
    background,
    disabled, 
    loading,
}: InteractableTypes.ButtonProps) {
    return (
        <button
            disabled={disabled || loading}
            type={submit ? `submit` : undefined}
            className={`${className} flex items-center justify-center gap-1 h-[42px] rounded border border-border/10 bg-${background ? background + '-500' : 'accent'} py-2 font-semibold tracking-widest text-txt-one transition-all duration-300 hover:bg-${background ? background + '-500/80' : 'accent'} hover:opacity-80 ${disabled ? `cursor-not-allowed bg-${background ? background + '-500/80' : 'accent'}` : 'cursor-pointer'}`}
            onClick={(e) => !submit && onClick && onClick(e)}
        >
            {loading && <Loader />}
            {(icon && !loading) && <span className="material-symbols-outlined">{icon}</span>}
            {(label && !loading) && label}
        </button>
    );
}
