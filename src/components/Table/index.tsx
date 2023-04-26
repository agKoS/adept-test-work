import type { ITableSettings, TTableRowData } from "@types-components/Table";
import classes from "./Table.module.scss";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

interface ITableProps<T extends TTableRowData> {
    settings: ITableSettings<T>;
    tableData: T[];
}

export default function Table<T extends TTableRowData>({ settings, tableData }: ITableProps<T>) {
    const { columnsState } = settings;

    return (
        <div className={classes.container}>
            <TableHeader settings={settings} />
            <TableBody tableData={tableData} columnsState={columnsState} />
            <div className={classes["buttons-container"]}>
                <button>Добавить</button>
                <button>Удалить</button>
            </div>
        </div>
    );
}
