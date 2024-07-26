import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Links } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LinksUpdateFormInputValues = {
    name?: string;
};
export declare type LinksUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LinksUpdateFormOverridesProps = {
    LinksUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LinksUpdateFormProps = React.PropsWithChildren<{
    overrides?: LinksUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    links?: Links;
    onSubmit?: (fields: LinksUpdateFormInputValues) => LinksUpdateFormInputValues;
    onSuccess?: (fields: LinksUpdateFormInputValues) => void;
    onError?: (fields: LinksUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LinksUpdateFormInputValues) => LinksUpdateFormInputValues;
    onValidate?: LinksUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LinksUpdateForm(props: LinksUpdateFormProps): React.ReactElement;
