import { useCallback, Dispatch, SetStateAction } from "react";
import { useFormik } from "formik";
import { object, ObjectSchema, string } from "yup";
import { nanoid } from "nanoid";
import { companiesActions, companiesSelectors } from "state/companiesSlice";
import { useAppDispatch, useAppSelector } from "state/hooks";
import ModalWindow from "@ui/ModalWindow";
import Input from "@ui/Input";
import ButtonGroup from "@ui/ButtonGroup";
import type { AddCompanyFormData } from "@types-components/AddCompanyModalWindow";
import type { ICompaniesTableRowData } from "@types-components/CompanyTable";
import type { IButtonProps } from "@types-ui/Button";
import classes from "./AddCompanyModalWindow.module.scss";

interface IAddCompanyModalWindowProps {
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

const addCompanyValidationSchema: ObjectSchema<AddCompanyFormData> = object({
    companyName: string().required("Обязательное поле").trim("Пробелы по краям"),
    address: string().required("Обязательное поле").trim("Пробелы по краям"),
});

export default function AddCompanyModalWindow({ setShowModal }: IAddCompanyModalWindowProps) {
    const dispatch = useAppDispatch();

    const { companyNames } = useAppSelector((state) => ({
        companyNames: companiesSelectors.selectCompaniesName(state),
    }));

    const formik = useFormik<AddCompanyFormData>({
        initialValues: {
            companyName: "",
            address: "",
        },
        validateOnChange: false,
        validationSchema: addCompanyValidationSchema,
        onSubmit: (value) => {
            if (companyNames.includes(value.companyName)) {
                return;
            }

            const newCompany: ICompaniesTableRowData = {
                ...value,
                numberEmployees: 0,
                id: nanoid(),
            };

            dispatch(companiesActions.addCompany(newCompany));
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

                    <Input
                        value={formik.values.companyName}
                        name="companyName"
                        id="companyNameField"
                        onChange={formik.handleChange}
                        placeholder="Введите название"
                        errorMessage={formik.errors.companyName}
                        label="Название"
                        invalid={!!formik.errors.companyName}
                    />

                    <Input
                        value={formik.values.address}
                        name="address"
                        id="addressField"
                        onChange={formik.handleChange}
                        placeholder="Введите адрес"
                        errorMessage={formik.errors.address}
                        label="Адрес"
                        invalid={!!formik.errors.address}
                    />

                    <div className={classes["button-container"]}>
                        <ButtonGroup settings={buttonsSetting} />
                    </div>
                </fieldset>
            </form>
        </ModalWindow>
    );
}
