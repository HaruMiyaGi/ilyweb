import * as React from 'react';
import { GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { Node } from './graphql/types';
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
export declare type ValidationFunction<T> = (
	value: T,
	validationResponse: ValidationResponse,
) => ValidationResponse | Promise<ValidationResponse>;
export declare type NodeUpdateFormInputValues = {
	name?: string;
};
export declare type NodeUpdateFormValidationValues = {
	name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
	React.DOMAttributes<HTMLDivElement>;
export declare type NodeUpdateFormOverridesProps = {
	NodeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
	name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NodeUpdateFormProps = React.PropsWithChildren<
	{
		overrides?: NodeUpdateFormOverridesProps | undefined | null;
	} & {
		id?: string;
		node?: Node;
		onSubmit?: (fields: NodeUpdateFormInputValues) => NodeUpdateFormInputValues;
		onSuccess?: (fields: NodeUpdateFormInputValues) => void;
		onError?: (fields: NodeUpdateFormInputValues, errorMessage: string) => void;
		onChange?: (fields: NodeUpdateFormInputValues) => NodeUpdateFormInputValues;
		onValidate?: NodeUpdateFormValidationValues;
	} & React.CSSProperties
>;
export default function NodeUpdateForm(
	props: NodeUpdateFormProps,
): React.ReactElement;
