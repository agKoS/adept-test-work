import { type ICompaniesTableRowData } from "./CompanyTable";
import { type IEmployeesTableRowData } from "./EmployeesTable";

/**
 * Состояние для столбца
 *
 * columnName - имя столбца для взаимодействия
 * columnHeader - заголовок столбца
 * width - ширина столбца
 */
export interface IColumnState<T> {
    columnName: Exclude<keyof T, "id">;
    columnHeader: string;
    width: number;
}

/**
 * Настройки таблицы
 *
 * caption - заголовок таблицы
 * columnsState - состояние столбцов
 * disabledColumns - массив столбцов, которые нельзя редактировать
 */
export interface ITableSettings<T> {
    header: string;
    columnsState: IColumnState<T>[];
    disabledColumns: Exclude<keyof T, "id">[];
}

/**
 * Тип данных строки таблицы
 */
export type TTableRowData = ICompaniesTableRowData | IEmployeesTableRowData;
