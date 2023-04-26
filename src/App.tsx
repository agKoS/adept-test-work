import classes from "./App.module.scss";
import { useEffect } from "react";
import { useAppDispatch } from "state/hooks";
import { companiesActions } from "./state/companiesSlice";
import CompaniesTable from "@components/CompaniesTable";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(companiesActions.initState());
    }, [dispatch]);

    return (
        <div className={classes.container}>
            <CompaniesTable />
        </div>
    );
}

export default App;
