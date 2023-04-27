/**
 * Данные, отображаемые в строке таблицы Сотрудники
 */
export interface IEmployeesTableRowData {
    id: string;
    lastName: string;
    firstName: string;
    position: string;
    companyId: string;
}

/**
 * Имена столбцов таблицы Сотрудники
 */

export type TEmployeesTableColumnNames = keyof IEmployeesTableRowData;
