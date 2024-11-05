export interface ButtonProps {
    label?: string;
    onClick?: Function;
    icon?: string;
    submit?: boolean;
    className?: string;
    background?: string;
    disabled?: boolean;
    loading?: boolean;
}

export interface InputProps {
    name?: string,
    defaultValue?: string,
    placeholder?: string,
    onChange?: Function,
    label?: string,
    required?: boolean,
    value?: string | number,
    type?: string,
    hasError?: boolean,
    icon?: string,
    disabled?: boolean,
    autoComplete?: string,
    isFocused?: boolean
}

export interface MultiSelectProps {
    name?: string,
    label?: string,
    required?: boolean,
    options: { label: string, value: string }[],
    onAdd: Function,
    onDelete: Function,
    values: string[],
    hasError?: boolean,
    emptyMessage?: string
}

export interface TextAreaProps {
    name?: string,
    defaultValue?: string,
    placeholder?: string,
    onChange?: Function,
    label?: string,
    rows?: number,
    required?: boolean,
    value?: string,
    hasError?: boolean
}

export interface SelectProps {
    name?: string,
    label?: string,
    required?: boolean,
    options: { label: string, value: string }[],
    value: string,
    onChange: Function,
    hasError?: boolean,
}

export interface ToggleProps {
    label?: string,
    value: boolean,
    onChange: Function,
    hasError?: boolean,
    description?: string
}