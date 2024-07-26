import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type NodeCreateFormInputValues = {
    name?: string;
};
export declare type NodeCreateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NodeCreateFormOverridesProps = {
    NodeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NodeCreateFormProps = React.PropsWithChildren<{
    overrides?: NodeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NodeCreateFormInputValues) => NodeCreateFormInputValues;
    onSuccess?: (fields: NodeCreateFormInputValues) => void;
    onError?: (fields: NodeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NodeCreateFormInputValues) => NodeCreateFormInputValues;
    onValidate?: NodeCreateFormValidationValues;
} & React.CSSProperties>;
export default function NodeCreateForm(props: NodeCreateFormProps): React.ReactElement;
