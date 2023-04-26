import Table from "@components/Table";
import { useScrollUpdate } from "@hooks/use-scroll-update";
import { ICompaniesTableRowData } from "@types-components/CompanyTable";
import { ITableSettings } from "@types-components/Table";
import { useMemo } from "react";
import { companiesActions, companiesSelectors } from "state/companiesSlice";
import { useAppSelector } from "state/hooks";
import settings from "./settings.json";

/**
 * Таблица с компаниями
 */
export default function CompaniesTable() {
    const { companiesData, totalCount } = useAppSelector((state) => ({
        companiesData: companiesSelectors.selectCompanies(state),
        totalCount: companiesSelectors.selectTotal(state),
    }));

    const tableSettings = settings as ITableSettings<ICompaniesTableRowData>;

    const needUpdateData = useMemo(() => {
        return companiesData.length < totalCount;
    }, [companiesData, totalCount]);

    const scrollCallback = useScrollUpdate(needUpdateData, companiesActions.incrementPage);

    return (
        <Table<ICompaniesTableRowData>
            settings={tableSettings}
            tableData={companiesData}
            scrollCallback={scrollCallback}
        />
    );
}
