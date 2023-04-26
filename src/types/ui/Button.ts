import { MouseEvent } from "react";

export interface IButtonProps {
    type?: "button" | "submit" | "reset";
    label: string;
    disabled?: boolean;
    clickCallback?: (event: MouseEvent) => void;
}
