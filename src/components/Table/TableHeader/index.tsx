import { type ITableSettings } from "@types-components/Table";
import classes from "./TableHeader.module.scss";

interface ITableHeaderProps<T> {
    settings: ITableSettings<T>;
}

interface IHeaderCellProps {
    width: number;
    columnHeader: string;
}

/**
 * Ячейка заголовка с чекбоксом
 */
function HeaderCheckboxCell() {
    return (
        <th className={classes["checkbox-cell"]}>
            <input type="checkbox" />
        </th>
    );
}

/**
 * Ячейка заголовка
 */
function HeaderCell({ width, columnHeader }: IHeaderCellProps) {
    return <th style={{ width }}>{columnHeader}</th>;
}

export default function TableHeader<T>({ settings }: ITableHeaderProps<T>) {
    const { columnsState, header } = settings;
    return (
        <>
            <h2 className={classes.header}>{header}</h2>
            <div className={classes["header-container"]}>
                <table className={classes.table}>
                    <thead>
                        <HeaderCheckboxCell />
                        {columnsState.map((columnState) => (
                            <HeaderCell
                                width={columnState.width}
                                columnHeader={columnState.columnHeader}
                            />
                        ))}
                    </thead>
                </table>
            </div>
        </>
    );
}
