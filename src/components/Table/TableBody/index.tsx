import { TTableRowData, type IColumnState } from "@types-components/Table";
import { useEffect, useRef } from "react";
import classes from "./TableBody.module.scss";

interface ITableBodyProps<T extends TTableRowData> {
    tableData: T[];
    columnsState: IColumnState<T>[];
    scrollCallback: (event: Event) => void;
    checkboxClickEventDelegation: (event: Event) => void;
    selectedRows: string[];
}

interface IBodyRowProps<T extends TTableRowData> {
    rowData: T;
    columnsState: IColumnState<T>[];
    selected: boolean;
}

/**
 * Строка таблицы
 */
function BodyRow<T extends TTableRowData>({ rowData, columnsState, selected }: IBodyRowProps<T>) {
    const anotherColumns = columnsState.map((columnState) => (
        <td
            style={{ width: columnState["width"] }}
            key={`${rowData.id}-${columnState.columnHeader}}`}
        >{`${rowData[columnState.columnName]}`}</td>
    ));

    return (
        <tr className={selected ? classes.selected : ""} key={rowData.id}>
            {/* <BodyCheckboxCell id={rowData.id} companyName={rowData.companyName} /> */}
            <td className={classes["checkbox-cell"]}>
                <input
                    data-id={rowData.id}
                    data-company={rowData.companyName}
                    type="checkbox"
                    checked={selected}
                    readOnly
                />
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
    columnsState,
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
                                columnsState={columnsState}
                                selected={selectedRows.includes(rowData.id)}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
