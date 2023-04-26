import React from "react";
import classes from "./ModalWindow.module.scss";

interface IModalWindowProps {
    children: React.ReactNode;
}

export default function ModalWindow({ children }: IModalWindowProps) {
    return (
        <div className={classes.container}>
            <div className={classes.content}>{children}</div>
        </div>
    );
}
