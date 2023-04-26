import Table from "./components/Table";
import type { ITableSettings } from "@types-components/Table";
import type { ICompaniesTableRowData } from "@types-components/CompanyTable";
import classes from "./App.module.scss";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { companiesActions, companiesSelectors } from "./state/companiesSlice";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(companiesActions.initState());
    }, [dispatch]);

    const settings = useMemo<ITableSettings<ICompaniesTableRowData>>(
        () => ({
            header: "Компании",
            columnsState: [
                {
                    columnHeader: "Название компании",
                    columnName: "companyName",
                    width: 210,
                },
                {
                    columnHeader: "Кол-во сотрудников",
                    columnName: "numberEmployees",
                    width: 160,
                },
                {
                    columnHeader: "Адрес",
                    columnName: "address",
                    width: 200,
                },
            ],
            disabledColumns: ["numberEmployees"],
        }),
        []
    );

    const { companiesData } = useAppSelector((state) => ({
        companiesData: companiesSelectors.selectAll(state),
    }));

    return (
        <div className={classes.container}>
            <Table<ICompaniesTableRowData> settings={settings} tableData={companiesData} />
        </div>
    );
}

export default App;
