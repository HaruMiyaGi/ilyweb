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
export declare type NodeLinkCreateFormInputValues = {
    category?: string;
};
export declare type NodeLinkCreateFormValidationValues = {
    category?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NodeLinkCreateFormOverridesProps = {
    NodeLinkCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    category?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NodeLinkCreateFormProps = React.PropsWithChildren<{
    overrides?: NodeLinkCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NodeLinkCreateFormInputValues) => NodeLinkCreateFormInputValues;
    onSuccess?: (fields: NodeLinkCreateFormInputValues) => void;
    onError?: (fields: NodeLinkCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NodeLinkCreateFormInputValues) => NodeLinkCreateFormInputValues;
    onValidate?: NodeLinkCreateFormValidationValues;
} & React.CSSProperties>;
export default function NodeLinkCreateForm(props: NodeLinkCreateFormProps): React.ReactElement;
