import type { ITableSettings, TTableRowData } from "@types-components/Table";
import classes from "./Table.module.scss";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
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

    return (
        <div className={classes.container}>
            <TableHeader settings={settings} />
            <TableBody
                tableData={tableData}
                columnsState={columnsState}
                scrollCallback={scrollCallback}
            />
            <TableFooter />
        </div>
    );
}
