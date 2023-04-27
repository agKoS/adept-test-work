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
    setShowAddModal: Dispatch<SetStateAction<boolean>>;
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
    checkboxClickEventDelegation: (event: Event) => void;
    selectedRows: string[];
    selectAllCheckboxesCallback: () => void;
}

export default function Table<T extends TTableRowData>({
    settings,
    tableData,
    scrollCallback,
    setShowAddModal,
    setShowDeleteModal,
    checkboxClickEventDelegation,
    selectedRows,
    selectAllCheckboxesCallback,
}: // selectedIds
ITableProps<T>) {
    return (
        <div className={classes.container}>
            <TableHeader
                settings={settings}
                selectAllCheckboxesCallback={selectAllCheckboxesCallback}
                selectedCheckbox={selectedRows.length === tableData.length}
            />
            {tableData.length !== 0 ? (
                <TableBody
                    tableData={tableData}
                    settings={settings}
                    scrollCallback={scrollCallback}
                    checkboxClickEventDelegation={checkboxClickEventDelegation}
                    selectedRows={selectedRows}
                />
            ) : (
                <div className={classes["info-container"]}>
                    <p>Данные отсутствуют</p>
                </div>
            )}
            <TableFooter
                setShowAddModal={setShowAddModal}
                setShowDeleteModal={setShowDeleteModal}
                selectedRows={selectedRows}
            />
        </div>
    );
}
