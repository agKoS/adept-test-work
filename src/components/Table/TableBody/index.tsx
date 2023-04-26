import { TTableRowData, type IColumnState } from "@types-components/Table";
import classes from "./TableBody.module.scss";

interface ITableBodyProps<T extends TTableRowData> {
    tableData: T[];
    columnsState: IColumnState<T>[];
}

interface IBodyRowProps<T extends TTableRowData> {
    rowData: T;
    columnsState: IColumnState<T>[];
}

/**
 * Ячейка с чекбоксом
 */
function BodyCheckboxCell() {
    return (
        <td className={classes["checkbox-cell"]}>
            <input type="checkbox" />
        </td>
    );
}

/**
 * Строка таблицы
 */
function BodyRow<T extends TTableRowData>({ rowData, columnsState }: IBodyRowProps<T>) {
    const anotherColumns = columnsState.map((columnState) => (
        <td
            style={{ width: columnState["width"] }}
            key={`${rowData.id}-${columnState.columnHeader}}`}
        >{`${rowData[columnState.columnName]}`}</td>
    ));

    return (
        <tr key={rowData.id}>
            <BodyCheckboxCell />
            {anotherColumns}
        </tr>
    );
}

export default function TableBody<T extends TTableRowData>({
    tableData,
    columnsState,
}: ITableBodyProps<T>) {
    return (
        <div className={classes.container}>
            <table className={classes.table}>
                <tbody className={classes.tbody}>
                    {tableData.map((rowData) => {
                        return (
                            <BodyRow
                                key={rowData.id}
                                rowData={rowData}
                                columnsState={columnsState}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
