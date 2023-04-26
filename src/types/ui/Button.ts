import { MouseEvent } from "react";

export interface IButtonProps {
    label: string;
    disabled?: boolean;
    clickCallback?: (event: MouseEvent) => void;
}
