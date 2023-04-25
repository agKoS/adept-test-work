import Table from "./components/Table";
import type { ITableSettings } from "@types-components/Table";
import type { ICompaniesTableRowData } from "@types-components/CompanyTable";
import classes from "./App.module.scss";
import { useMemo } from "react";

function App() {
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

    const data: ICompaniesTableRowData[] = [
        {
            id: "1",
            companyName: "Рога и копыта",
            numberEmployees: 3,
            address: "Улица Пушкина, д. Колотушкина",
        },
        {
            id: "2",
            companyName: "Еще одни рога и копыта",
            numberEmployees: 4,
            address: "Улица Пушкина, д. Колотушкина",
        },
        {
            id: "3",
            companyName: "Рога и копыта",
            numberEmployees: 3,
            address: "Улица Пушкина, д. Колотушкина",
        },
        {
            id: "4",
            companyName: "Еще одни рога и копыта",
            numberEmployees: 4,
            address: "Улица Пушкина, д. Колотушкина",
        },
        {
            id: "5",
            companyName: "Рога и копыта",
            numberEmployees: 3,
            address: "Улица Пушкина, д. Колотушкина",
        },
        {
            id: "6",
            companyName: "Еще одни рога и копыта",
            numberEmployees: 4,
            address: "Улица Пушкина, д. Колотушкина",
        },
        {
            id: "7",
            companyName: "Рога и копыта",
            numberEmployees: 3,
            address: "Улица Пушкина, д. Колотушкина",
        },
        {
            id: "8",
            companyName: "Еще одни рога и копыта",
            numberEmployees: 4,
            address: "Улица Пушкина, д. Колотушкина",
        },
        {
            id: "9",
            companyName: "Рога и копыта",
            numberEmployees: 3,
            address: "Улица Пушкина, д. Колотушкина",
        },
        {
            id: "10",
            companyName: "Еще одни рога и копыта",
            numberEmployees: 4,
            address: "Улица Пушкина, д. Колотушкина",
        },
        {
            id: "11",
            companyName: "Рога и копыта",
            numberEmployees: 3,
            address: "Улица Пушкина, д. Колотушкина",
        },
        {
            id: "12",
            companyName: "Еще одни рога и копыта",
            numberEmployees: 4,
            address: "Улица Пушкина, д. Колотушкина",
        },
        {
            id: "13",
            companyName: "Рога и копыта",
            numberEmployees: 3,
            address: "Улица Пушкина, д. Колотушкина",
        },
        {
            id: "14",
            companyName: "Еще одни рога и копыта",
            numberEmployees: 4,
            address: "Улица Пушкина, д. Колотушкина",
        },
    ];

    return (
        <div className={classes.container}>
            <Table<ICompaniesTableRowData> settings={settings} tableData={data} />
        </div>
    );
}

export default App;
