import { ICompaniesTableRowData } from "./CompanyTable";
import { IEmployeesTableRowData } from "./EmployeesTable";

export type AddEmployeeFormData = Omit<IEmployeesTableRowData, "id" | "companyId"> &
    Pick<ICompaniesTableRowData, "companyName">;

export interface INewEmployeeData {
    newEmployee: IEmployeesTableRowData;
    company: ICompaniesTableRowData;
}
