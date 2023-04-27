import { ICompaniesTableRowData } from "./CompanyTable";

export interface DeleteEmployeesData {
    companies: ICompaniesTableRowData[];
    selectedEmployeeIds: string[];
}
