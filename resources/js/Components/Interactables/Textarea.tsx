import { InteractableTypes } from '@/index';

export default function Textarea({
    name,
    placeholder,
    onChange,
    label,
    rows = 3,
    required = false,
    value,
    hasError = false,
}: InteractableTypes.TextAreaProps) {
    return (
        <div className="relative w-full text-txt-one">
            <label
                htmlFor={name !== undefined ? name : undefined}
                className="absolute -top-2.5 left-2 z-20 bg-transparent px-1 text-sm tracking-wider"
            >
                {label}{' '}
                <span className="text-xs text-txt-two">{required && '*'}</span>
            </label>
            <textarea
                className={`w-full rounded border bg-bg-light p-2 text-txt-two ${hasError ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-border'} focus:outline-none focus:ring-0`}
                onChange={(e) => onChange && onChange(e.target.value)}
                value={value !== undefined ? value : undefined}
                placeholder={
                    placeholder !== undefined ? placeholder : undefined
                }
                name={name !== undefined ? name : undefined}
                rows={rows}
            />
        </div>
    );
}
