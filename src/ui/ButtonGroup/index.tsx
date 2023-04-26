import { IButtonProps } from "@types-ui/Button";
import Button from "@ui/Button";
import classes from "./ButtonGroup.module.scss";

interface IButtonGroupProps {
    settings: IButtonProps[];
}

/**
 * Группа кнопок
 */
export default function ButtonGroup({ settings }: IButtonGroupProps) {
    return (
        <div className={classes.container}>
            {settings.map((setting) => (
                <Button {...setting} />
            ))}
        </div>
    );
}
