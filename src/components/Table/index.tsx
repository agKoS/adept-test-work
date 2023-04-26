import type { ITableSettings, TTableRowData } from "@types-components/Table";
import { IButtonProps } from "@types-ui/Button";
import ButtonGroup from "@ui/ButtonGroup";
import classes from "./Table.module.scss";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

interface ITableProps<T extends TTableRowData> {
    settings: ITableSettings<T>;
    tableData: T[];
    scrollCallback: (event: Event) => void;
}

export default function Table<T extends TTableRowData>({
    settings,
    tableData,
    scrollCallback,
}: ITableProps<T>) {
    const { columnsState } = settings;

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
        <div className={classes.container}>
            <TableHeader settings={settings} />
            <TableBody
                tableData={tableData}
                columnsState={columnsState}
                scrollCallback={scrollCallback}
            />
            <div className={classes.footer}>
                <ButtonGroup settings={buttonsSetting} />
            </div>
        </div>
    );
}
