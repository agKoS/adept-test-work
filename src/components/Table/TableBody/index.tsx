import { IColumnState, ITableSettings, TTableRowData } from "@types-components/Table";
import { FocusEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "state/hooks";
import classes from "./TableBody.module.scss";

interface ITableBodyProps<T extends TTableRowData> {
    tableData: T[];
    settings: ITableSettings<T>;
    scrollCallback: (event: Event) => void;
    checkboxClickEventDelegation: (event: Event) => void;
    selectedRows: string[];
    actions: any;
}

interface IBodyRowProps<T extends TTableRowData> {
    rowData: T;
    settings: ITableSettings<T>;
    selected: boolean;
    actions: any;
}

interface IBodyCellProps<T extends TTableRowData> {
    editable: boolean;
    rowData: T;
    columnState: IColumnState<T>;
    actions: any;
}

function BodyCell<T extends TTableRowData>({
    editable,
    rowData,
    columnState,
    actions,
}: IBodyCellProps<T>) {
    const [text, setText] = useState(rowData[columnState.columnName] as any as string);

    const dispatch = useAppDispatch();

    const blurHandler = (event: FocusEvent) => {
        const element = event.target as HTMLTableCellElement;
        const newText = element.textContent;
        //@ts-ignore
        if (newText !== text) {
            //@ts-ignore
            setText(newText);

            const headerName = element.dataset["header"]!;

            const result: any = {
                id: rowData.id,
                changes: { [headerName]: newText },
            };

            console.log(result);

            dispatch(actions(result));
        }
    };

    return (
        <td
            contentEditable={editable}
            onBlur={blurHandler}
            data-header={columnState.columnName}
            style={{ width: columnState["width"] }}
        >
            {text}
        </td>
    );
}

/**
 * Строка таблицы
 */
function BodyRow<T extends TTableRowData>({
    rowData,
    settings: { columnsState, disabledColumns },
    selected,
    actions,
}: IBodyRowProps<T>) {
    const anotherColumns = columnsState.map((columnState) => {
        const disabledColumn = disabledColumns.includes(columnState.columnName);

        return (
            <BodyCell
                editable={!disabledColumn}
                rowData={rowData}
                columnState={columnState}
                key={`${rowData.id}-${columnState.columnHeader}}`}
                actions={actions}
            />
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
    actions,
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
                                actions={actions}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
