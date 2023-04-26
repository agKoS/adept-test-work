import { IButtonProps } from "@types-ui/Button";
import ButtonGroup from "@ui/ButtonGroup";
import classes from "./TableFooter.module.scss";

export default function TableFooter() {
    const buttonsSetting: IButtonProps[] = [
        {
            label: "Добавить",
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
