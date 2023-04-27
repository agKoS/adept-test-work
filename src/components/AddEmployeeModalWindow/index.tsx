import { Dispatch, SetStateAction, useCallback } from "react";
import { object, ObjectSchema, string } from "yup";
import type { AddEmployeeFormData } from "@types-components/AddEmployeeModalWindow";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { useFormik } from "formik";
import { IButtonProps } from "@types-ui/Button";
import ModalWindow from "@ui/ModalWindow";
import classes from "./AddEmployeeModalWindow.module.scss";
import Input from "@ui/Input";
import ButtonGroup from "@ui/ButtonGroup";
import { companiesSelectors } from "state/companiesSlice";
import { IEmployeesTableRowData } from "@types-components/EmployeesTable";
import { nanoid } from "nanoid";
import { addNewEmployeeThunk } from "state/thunks";

interface IAddEmployeeModalWindowProps {
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

const addEmployeeValidationSchema: ObjectSchema<AddEmployeeFormData> = object({
    lastName: string().required("Обязательное поле").trim("Пробелы по краям"),
    firstName: string().required("Обязательное поле").trim("Пробелы по краям"),
    companyName: string().required("Обязательное поле"),
    position: string().required("Обязательное поле").trim("Пробелы по краям"),
});

export default function AddEmployeeModalWindow({ setShowModal }: IAddEmployeeModalWindowProps) {
    const dispatch = useAppDispatch();

    const { selectedCompanyNames, selectedCompanies } = useAppSelector((state) => ({
        selectedCompanyNames: companiesSelectors.selectSelectedCompaniesName(state),
        selectedCompanies: companiesSelectors.selectSelectedCompanies(state),
    }));

    const formik = useFormik<AddEmployeeFormData>({
        initialValues: {
            companyName: "",
            lastName: "",
            firstName: "",
            position: "",
        },
        validateOnChange: false,
        validationSchema: addEmployeeValidationSchema,
        onSubmit: (value) => {
            const company = selectedCompanies.find(
                (company) => company.companyName === value.companyName
            )!;

            const newEmployee: IEmployeesTableRowData = {
                ...value,
                id: nanoid(),
                companyId: company.id,
            };

            dispatch(addNewEmployeeThunk({ newEmployee, company }));
            setShowModal(false);
        },
    });

    const closeModalWindow = useCallback(() => {
        setShowModal(false);
    }, [setShowModal]);

    const buttonsSetting: IButtonProps[] = [
        {
            type: "submit",
            label: "Добавить",
        },
        {
            type: "reset",
            label: "Отмена",
        },
    ];

    return (
        <ModalWindow closeModalWindow={closeModalWindow}>
            <form onSubmit={formik.handleSubmit} onReset={closeModalWindow}>
                <fieldset className={classes.fieldset}>
                    <legend className={classes.legend}>Добавить компанию</legend>

                    <div>
                        <label className={classes.label} htmlFor="companyNameOption">
                            Название компании
                        </label>
                        <select
                            id="companyNameOption"
                            name="companyName"
                            onChange={formik.handleChange}
                            value={formik.values.companyName}
                        >
                            <option value={""}>{""}</option>
                            {selectedCompanyNames.map((companyName) => {
                                return (
                                    <option key={`companyName-${companyName}`} value={companyName}>
                                        {companyName}
                                    </option>
                                );
                            })}
                        </select>
                        {formik.errors.companyName ? (
                            <p className={classes["error-message"]}>{formik.errors.companyName}</p>
                        ) : null}
                    </div>

                    <Input
                        value={formik.values.firstName}
                        name="firstName"
                        id="firstNameField"
                        onChange={formik.handleChange}
                        placeholder="Введите имя"
                        errorMessage={formik.errors.firstName}
                        label="Имя"
                        invalid={!!formik.errors.firstName}
                    />

                    <Input
                        value={formik.values.lastName}
                        name="lastName"
                        id="lastNameField"
                        onChange={formik.handleChange}
                        placeholder="Введите фамилию"
                        errorMessage={formik.errors.lastName}
                        label="Фамилия"
                        invalid={!!formik.errors.lastName}
                    />

                    <Input
                        value={formik.values.position}
                        name="position"
                        id="positionField"
                        onChange={formik.handleChange}
                        placeholder="Введите должность"
                        errorMessage={formik.errors.position}
                        label="Должность"
                        invalid={!!formik.errors.position}
                    />

                    <div className={classes["button-container"]}>
                        <ButtonGroup settings={buttonsSetting} />
                    </div>
                </fieldset>
            </form>
        </ModalWindow>
    );
}
