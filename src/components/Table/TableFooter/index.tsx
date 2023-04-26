import { IButtonProps } from "@types-ui/Button";
import ButtonGroup from "@ui/ButtonGroup";
import { Dispatch, SetStateAction } from "react";
import classes from "./TableFooter.module.scss";

interface ITableFooterProps {
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function TableFooter({ setShowModal }: ITableFooterProps) {
    const openModalWindowCallback = () => {
        setShowModal(true);
    };

    const buttonsSetting: IButtonProps[] = [
        {
            label: "Добавить",
            clickCallback: openModalWindowCallback,
        },
        {
            label: "Удалить",
            disabled: true,
        },
    ];

    return (
        <div className={classes.footer}>
            <ButtonGroup settings={buttonsSetting} />
        </div>
    );
}
