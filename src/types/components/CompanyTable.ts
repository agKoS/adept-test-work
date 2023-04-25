/**
 * Данные, отображаемые в строке таблицы Компании
 */
export interface ICompaniesTableRowData {
    id: string;
    companyName: string;
    numberEmployees: number;
    address: string;
}

/**
 * Имена столбцов таблицы Компании
 */
export type TCompaniesTableColumnNames = keyof ICompaniesTableRowData;
