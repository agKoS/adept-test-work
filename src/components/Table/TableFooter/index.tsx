import { IButtonProps } from "@types-ui/Button";
import ButtonGroup from "@ui/ButtonGroup";
import { Dispatch, SetStateAction } from "react";
import classes from "./TableFooter.module.scss";

interface ITableFooterProps {
    setShowAddModal: Dispatch<SetStateAction<boolean>>;
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
    selectedRows: string[];
}

export default function TableFooter({
    setShowAddModal,
    setShowDeleteModal,
    selectedRows,
}: ITableFooterProps) {
    const openAddModalWindowCallback = () => {
        setShowAddModal(true);
    };

    const openDeleteModalWindowCallback = () => {
        setShowDeleteModal(true);
    };

    const buttonsSetting: IButtonProps[] = [
        {
            label: "Добавить",
            clickCallback: openAddModalWindowCallback,
        },
        {
            label: "Удалить",
            disabled: selectedRows.length === 0,
            clickCallback: openDeleteModalWindowCallback,
        },
    ];

    return (
        <div className={classes.footer}>
            <ButtonGroup settings={buttonsSetting} />
        </div>
    );
}
