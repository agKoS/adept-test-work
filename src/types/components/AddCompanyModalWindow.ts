import { ICompaniesTableRowData } from "./CompanyTable";

export type AddCompanyFormData = Omit<ICompaniesTableRowData, "id" | "numberEmployees">;
