import type { ITableSettings } from "@types-components/Table";
import type { ICompaniesTableRowData } from "@types-components/CompanyTable";
import type { IEmployeesTableRowData } from "@types-components/EmployeesTable";
import classes from "./Table.module.scss";
import TableHeader from "./TableHeader";

type TTableRowData = ICompaniesTableRowData | IEmployeesTableRowData;

interface ITableProps<T extends TTableRowData> {
    settings: ITableSettings<T>;
    tableData: T[];
}

export default function Table<T extends TTableRowData>({ settings, tableData }: ITableProps<T>) {
    const { columnsState } = settings;

    return (
        <section className={classes.container}>
            <TableHeader settings={settings} />
            <div className={classes["table-data"]}>
                <table className={classes.table}>
                    <tbody className={classes.tbody}>
                        {tableData.map((rowData) => {
                            const anotherColumns = columnsState.map((columnState) => (
                                <td
                                    style={{ width: columnState["width"] }}
                                    key={`${rowData.id}-${columnState.columnHeader}}`}
                                >{`${rowData[columnState.columnName]}`}</td>
                            ));
                            return (
                                <tr key={rowData.id}>
                                    <td className={classes["checkbox-cell"]}>
                                        <input type="checkbox" />
                                    </td>
                                    {anotherColumns}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className={classes["buttons-container"]}>
                <button>Добавить</button>
                <button>Удалить</button>
            </div>
        </section>
    );
}
