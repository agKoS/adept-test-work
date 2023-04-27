import { IButtonProps } from "@types-ui/Button";
import ButtonGroup from "@ui/ButtonGroup";
import { Dispatch, SetStateAction } from "react";
import classes from "./TableFooter.module.scss";

interface ITableFooterProps {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    selectedRows: string[];
}

export default function TableFooter({ setShowModal, selectedRows }: ITableFooterProps) {
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
            disabled: selectedRows.length === 0,
        },
    ];

    return (
        <div className={classes.footer}>
            <ButtonGroup settings={buttonsSetting} />
        </div>
    );
}
