import { ChangeEvent } from "react";
import classes from "./Input.module.scss";
import cn from "classnames";

interface IInputProps {
    value: string;
    name: string;
    id: string;
    onChange: (event: ChangeEvent) => void;
    placeholder?: string;
    label?: string;
    errorMessage?: string;
    invalid?: boolean;
}

export default function Input({
    value,
    name,
    id,
    onChange,
    label,
    errorMessage,
    invalid,
    placeholder,
}: IInputProps) {
    const inputClass = cn(classes.input, { [classes["input--invalid"]]: invalid });

    return (
        <div className={classes["input-container"]}>
            {label ? (
                <label htmlFor={id} className={classes["label"]}>
                    {label}
                </label>
            ) : null}
            <input
                className={inputClass}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {errorMessage ? <p className={classes["error-message"]}>{errorMessage}</p> : null}
        </div>
    );
}
