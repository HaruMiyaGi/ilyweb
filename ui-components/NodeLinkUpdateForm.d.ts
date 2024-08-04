import * as React from 'react';
import { GridProps, TextFieldProps } from '@aws-amplify/ui-react';
import { NodeLink } from './graphql/types';
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
export declare type NodeLinkUpdateFormInputValues = {
	category?: string;
};
export declare type NodeLinkUpdateFormValidationValues = {
	category?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
	React.DOMAttributes<HTMLDivElement>;
export declare type NodeLinkUpdateFormOverridesProps = {
	NodeLinkUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
	category?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NodeLinkUpdateFormProps = React.PropsWithChildren<
	{
		overrides?: NodeLinkUpdateFormOverridesProps | undefined | null;
	} & {
		id?: string;
		nodeLink?: NodeLink;
		onSubmit?: (
			fields: NodeLinkUpdateFormInputValues,
		) => NodeLinkUpdateFormInputValues;
		onSuccess?: (fields: NodeLinkUpdateFormInputValues) => void;
		onError?: (
			fields: NodeLinkUpdateFormInputValues,
			errorMessage: string,
		) => void;
		onChange?: (
			fields: NodeLinkUpdateFormInputValues,
		) => NodeLinkUpdateFormInputValues;
		onValidate?: NodeLinkUpdateFormValidationValues;
	} & React.CSSProperties
>;
export default function NodeLinkUpdateForm(
	props: NodeLinkUpdateFormProps,
): React.ReactElement;
