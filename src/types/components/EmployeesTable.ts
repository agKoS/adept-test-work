/**
 * Данные, отображаемые в строке таблицы Сотрудники
 */
export interface IEmployeesTableRowData {
    id: string;
    surname: string;
    name: string;
    position: string;
}

/**
 * Имена столбцов таблицы Сотрудники
 */

export type TEmployeesTableColumnNames = keyof IEmployeesTableRowData;
