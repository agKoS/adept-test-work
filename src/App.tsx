import classes from "./App.module.scss";
import { useEffect } from "react";
import { useAppDispatch } from "state/hooks";
import { companiesActions } from "./state/companiesSlice";
import CompaniesTable from "@components/CompaniesTable";
import { employeesActions } from "state/employeesSlice";
import EmployeeTable from "@components/EmployeesTable";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(companiesActions.initState());
        dispatch(employeesActions.initState());
    }, [dispatch]);

    return (
        <div className={classes.container}>
            <div style={{ marginRight: "auto" }}>
                <CompaniesTable />
            </div>

            <EmployeeTable />
        </div>
    );
}

export default App;
