import { ITableSettings, TTableRowData, type IColumnState } from "@types-components/Table";
import { useEffect, useRef } from "react";
import classes from "./TableBody.module.scss";

interface ITableBodyProps<T extends TTableRowData> {
    tableData: T[];
    settings: ITableSettings<T>;
    // columnsState: IColumnState<T>[];
    scrollCallback: (event: Event) => void;
    checkboxClickEventDelegation: (event: Event) => void;
    selectedRows: string[];
}

interface IBodyRowProps<T extends TTableRowData> {
    rowData: T;
    settings: ITableSettings<T>;
    selected: boolean;
}

/**
 * Строка таблицы
 */
function BodyRow<T extends TTableRowData>({
    rowData,
    settings: { columnsState, disabledColumns },
    selected,
}: IBodyRowProps<T>) {
    const anotherColumns = columnsState.map((columnState) => {
        const disabledColumn = disabledColumns.includes(columnState.columnName);

        return (
            <td
                contentEditable={!disabledColumn}
                onBlur={() => {}}
                style={{ width: columnState["width"] }}
                key={`${rowData.id}-${columnState.columnHeader}}`}
            >{`${rowData[columnState.columnName]}`}</td>
        );
    });

    return (
        <tr className={selected ? classes.selected : ""} key={rowData.id}>
            <td className={classes["checkbox-cell"]}>
                <input data-id={rowData.id} type="checkbox" checked={selected} readOnly />
            </td>
            {anotherColumns}
        </tr>
    );
}

/**
 * Часть таблицы с данными
 *
 * @returns
 */
export default function TableBody<T extends TTableRowData>({
    tableData,
    settings,
    scrollCallback,
    checkboxClickEventDelegation,
    selectedRows,
}: ITableBodyProps<T>) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current as HTMLElement | null;
        if (element) {
            element.addEventListener("scroll", scrollCallback);
        }

        return () => {
            element?.removeEventListener("scroll", scrollCallback);
        };
    }, [scrollCallback]);

    useEffect(() => {
        const element = ref.current as HTMLElement | null;
        if (element) {
            element.addEventListener("click", checkboxClickEventDelegation);
        }

        return () => {
            element?.removeEventListener("click", checkboxClickEventDelegation);
        };
    });

    return (
        <div ref={ref} className={classes.container}>
            <table className={classes.table}>
                <tbody className={classes.tbody}>
                    {tableData.map((rowData) => {
                        return (
                            <BodyRow
                                key={rowData.id}
                                rowData={rowData}
                                settings={settings}
                                selected={selectedRows.includes(rowData.id)}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
