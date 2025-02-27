import { InteractableTypes, React } from '@/index';

export default function Input({
    name,
    type = 'text',
    value,
    placeholder,
    onChange,
    label,
    required = false,
    hasError = false,
    icon,
    disabled = false,
    autoComplete,
    isFocused = false,
    className = '',
}: InteractableTypes.InputProps) {
    const localRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="relative w-full text-txt-one">
            <label
                htmlFor={name !== undefined ? name : undefined}
                className="absolute -top-2.5 left-2 z-20 bg-transparent px-1 text-sm tracking-wider"
            >
                {label}{' '}
                <span className="text-xs text-txt-two">{required && '*'}</span>
            </label>
            <div className="relative">
                {icon && (
                    <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 scale-90 text-txt-two">
                        {icon}
                    </span>
                )}
                <input
                    ref={localRef}
                    autoComplete={autoComplete}
                    disabled={disabled}
                    lang="nl"
                    type={type}
                    className={`${icon && 'pl-10'} ${className} w-full rounded border bg-bg-light text-txt-two ${hasError ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-border'} p-2 focus:outline-none focus:ring-0`}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    value={value !== undefined ? value : undefined}
                    placeholder={
                        placeholder !== undefined ? placeholder : undefined
                    }
                    name={name !== undefined ? name : undefined}
                />
            </div>
        </div>
    );
}
