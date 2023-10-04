/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Clientes } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ClientesUpdateFormInputValues = {
    nombre?: string;
    apellido?: string;
    correo?: string;
    calle?: string;
    numero?: string;
    colonia?: string;
    codigoPostal?: number;
    municipio?: string;
    pais?: string;
    historialCompras?: string;
    carritoActual?: string;
    listaDeseos?: string;
};
export declare type ClientesUpdateFormValidationValues = {
    nombre?: ValidationFunction<string>;
    apellido?: ValidationFunction<string>;
    correo?: ValidationFunction<string>;
    calle?: ValidationFunction<string>;
    numero?: ValidationFunction<string>;
    colonia?: ValidationFunction<string>;
    codigoPostal?: ValidationFunction<number>;
    municipio?: ValidationFunction<string>;
    pais?: ValidationFunction<string>;
    historialCompras?: ValidationFunction<string>;
    carritoActual?: ValidationFunction<string>;
    listaDeseos?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ClientesUpdateFormOverridesProps = {
    ClientesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    nombre?: PrimitiveOverrideProps<TextFieldProps>;
    apellido?: PrimitiveOverrideProps<TextFieldProps>;
    correo?: PrimitiveOverrideProps<TextFieldProps>;
    calle?: PrimitiveOverrideProps<TextFieldProps>;
    numero?: PrimitiveOverrideProps<TextFieldProps>;
    colonia?: PrimitiveOverrideProps<TextFieldProps>;
    codigoPostal?: PrimitiveOverrideProps<TextFieldProps>;
    municipio?: PrimitiveOverrideProps<TextFieldProps>;
    pais?: PrimitiveOverrideProps<TextFieldProps>;
    historialCompras?: PrimitiveOverrideProps<TextFieldProps>;
    carritoActual?: PrimitiveOverrideProps<TextFieldProps>;
    listaDeseos?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ClientesUpdateFormProps = React.PropsWithChildren<{
    overrides?: ClientesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    clientes?: Clientes;
    onSubmit?: (fields: ClientesUpdateFormInputValues) => ClientesUpdateFormInputValues;
    onSuccess?: (fields: ClientesUpdateFormInputValues) => void;
    onError?: (fields: ClientesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ClientesUpdateFormInputValues) => ClientesUpdateFormInputValues;
    onValidate?: ClientesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ClientesUpdateForm(props: ClientesUpdateFormProps): React.ReactElement;
