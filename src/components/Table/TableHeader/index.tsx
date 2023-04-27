import { type ITableSettings } from "@types-components/Table";
import classes from "./TableHeader.module.scss";

interface ITableHeaderProps<T> {
    settings: ITableSettings<T>;
    selectAllCheckboxesCallback: () => void;
    selectedCheckbox: boolean;
}

export default function TableHeader<T>({
    settings,
    selectAllCheckboxesCallback,
    selectedCheckbox,
}: ITableHeaderProps<T>) {
    const { columnsState, header } = settings;
    return (
        <>
            <h2 className={classes.header}>{header}</h2>
            <div className={classes["header-container"]}>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th className={classes["checkbox-cell"]}>
                                <input
                                    type="checkbox"
                                    title="Выделить всё"
                                    onClick={selectAllCheckboxesCallback}
                                    checked={selectedCheckbox}
                                    readOnly
                                />
                            </th>
                            {columnsState.map((columnState) => (
                                <th
                                    key={`${columnState.width}-${columnState.columnHeader}`}
                                    style={{ width: columnState.width }}
                                >
                                    {columnState.columnHeader}
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    );
}
