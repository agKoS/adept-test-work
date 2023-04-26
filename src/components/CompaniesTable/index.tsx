import Table from "@components/Table";
import { ICompaniesTableRowData } from "@types-components/CompanyTable";
import { ITableSettings } from "@types-components/Table";
import { companiesSelectors } from "state/companiesSlice";
import { useAppSelector } from "state/hooks";
import settings from "./settings.json";

/**
 * Таблица с компаниями
 */
export default function CompaniesTable() {
    const { companiesData } = useAppSelector((state) => ({
        companiesData: companiesSelectors.selectAll(state),
    }));

    const tableSettings = settings as ITableSettings<ICompaniesTableRowData>;

    return <Table<ICompaniesTableRowData> settings={tableSettings} tableData={companiesData} />;
}
