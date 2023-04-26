import classes from "./Button.module.scss";
import type { IButtonProps } from "@types-ui/Button";
import { MouseEvent } from "react";

/**
 * Компонент кнопки
 */
export default function Button({ disabled, clickCallback, label, type = "button" }: IButtonProps) {
    const mouseDownCallback = (event: MouseEvent) => {
        event.preventDefault();
    };

    return (
        <button
            className={classes.button}
            onClick={clickCallback}
            onMouseDown={mouseDownCallback}
            disabled={disabled}
            type={type}
        >
            {label}
        </button>
    );
}
