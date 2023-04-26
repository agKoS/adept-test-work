import type { ITableSettings, TTableRowData } from "@types-components/Table";
import { Dispatch, SetStateAction } from "react";
import classes from "./Table.module.scss";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";

interface ITableProps<T extends TTableRowData> {
    settings: ITableSettings<T>;
    tableData: T[];
    scrollCallback: (event: Event) => void;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function Table<T extends TTableRowData>({
    settings,
    tableData,
    scrollCallback,
    setShowModal,
}: ITableProps<T>) {
    const { columnsState } = settings;

    return (
        <div className={classes.container}>
            <TableHeader settings={settings} />
            {tableData.length !== 0 ? (
                <TableBody
                    tableData={tableData}
                    columnsState={columnsState}
                    scrollCallback={scrollCallback}
                />
            ) : (
                <div className={classes["info-container"]}>
                    <p>Данные отсутствуют</p>
                </div>
            )}
            <TableFooter setShowModal={setShowModal} />
        </div>
    );
}
