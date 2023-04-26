import React, { useRef } from "react";
import { useEffect } from "react";
import classes from "./ModalWindow.module.scss";

interface IModalWindowProps {
    closeModalWindow: () => void;
    children: React.ReactNode;
}

export default function ModalWindow({ children, closeModalWindow }: IModalWindowProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const clickHandler = (event: MouseEvent) => {
            if (event.target === event.currentTarget) {
                closeModalWindow();
            }
        };

        const element = containerRef.current;

        if (element) {
            element.addEventListener("click", clickHandler);
        }

        return () => element?.removeEventListener("click", clickHandler);
    }, [closeModalWindow]);

    return (
        <div ref={containerRef} className={classes.container}>
            <div className={classes.content}>{children}</div>
        </div>
    );
}
