/* eslint-disable */
'use client';
import * as React from 'react';
import { Button, Flex, Grid, TextField } from '@aws-amplify/ui-react';
import { fetchByPath, getOverrideProps, validateField } from './utils';
import { generateClient } from 'aws-amplify/api';
import { getNodeLink } from './graphql/queries';
import { updateNodeLink } from './graphql/mutations';
const client = generateClient();
export default function NodeLinkUpdateForm(props) {
	const {
		id: idProp,
		nodeLink: nodeLinkModelProp,
		onSuccess,
		onError,
		onSubmit,
		onValidate,
		onChange,
		overrides,
		...rest
	} = props;
	const initialValues = {
		category: '',
	};
	const [category, setCategory] = React.useState(initialValues.category);
	const [errors, setErrors] = React.useState({});
	const resetStateValues = () => {
		const cleanValues = nodeLinkRecord
			? { ...initialValues, ...nodeLinkRecord }
			: initialValues;
		setCategory(cleanValues.category);
		setErrors({});
	};
	const [nodeLinkRecord, setNodeLinkRecord] = React.useState(nodeLinkModelProp);
	React.useEffect(() => {
		const queryData = async () => {
			const record = idProp
				? (
						await client.graphql({
							query: getNodeLink.replaceAll('__typename', ''),
							variables: { id: idProp },
						})
				  )?.data?.getNodeLink
				: nodeLinkModelProp;
			setNodeLinkRecord(record);
		};
		queryData();
	}, [idProp, nodeLinkModelProp]);
	React.useEffect(resetStateValues, [nodeLinkRecord]);
	const validations = {
		category: [],
	};
	const runValidationTasks = async (
		fieldName,
		currentValue,
		getDisplayValue,
	) => {
		const value =
			currentValue && getDisplayValue
				? getDisplayValue(currentValue)
				: currentValue;
		let validationResponse = validateField(value, validations[fieldName]);
		const customValidator = fetchByPath(onValidate, fieldName);
		if (customValidator) {
			validationResponse = await customValidator(value, validationResponse);
		}
		setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
		return validationResponse;
	};
	return (
		<Grid
			as="form"
			rowGap="15px"
			columnGap="15px"
			padding="20px"
			onSubmit={async (event) => {
				event.preventDefault();
				let modelFields = {
					category: category ?? null,
				};
				const validationResponses = await Promise.all(
					Object.keys(validations).reduce((promises, fieldName) => {
						if (Array.isArray(modelFields[fieldName])) {
							promises.push(
								...modelFields[fieldName].map((item) =>
									runValidationTasks(fieldName, item),
								),
							);
							return promises;
						}
						promises.push(
							runValidationTasks(fieldName, modelFields[fieldName]),
						);
						return promises;
					}, []),
				);
				if (validationResponses.some((r) => r.hasError)) {
					return;
				}
				if (onSubmit) {
					modelFields = onSubmit(modelFields);
				}
				try {
					Object.entries(modelFields).forEach(([key, value]) => {
						if (typeof value === 'string' && value === '') {
							modelFields[key] = null;
						}
					});
					await client.graphql({
						query: updateNodeLink.replaceAll('__typename', ''),
						variables: {
							input: {
								id: nodeLinkRecord.id,
								...modelFields,
							},
						},
					});
					if (onSuccess) {
						onSuccess(modelFields);
					}
				} catch (err) {
					if (onError) {
						const messages = err.errors.map((e) => e.message).join('\n');
						onError(modelFields, messages);
					}
				}
			}}
			{...getOverrideProps(overrides, 'NodeLinkUpdateForm')}
			{...rest}
		>
			<TextField
				label="Category"
				isRequired={false}
				isReadOnly={false}
				value={category}
				onChange={(e) => {
					let { value } = e.target;
					if (onChange) {
						const modelFields = {
							category: value,
						};
						const result = onChange(modelFields);
						value = result?.category ?? value;
					}
					if (errors.category?.hasError) {
						runValidationTasks('category', value);
					}
					setCategory(value);
				}}
				onBlur={() => runValidationTasks('category', category)}
				errorMessage={errors.category?.errorMessage}
				hasError={errors.category?.hasError}
				{...getOverrideProps(overrides, 'category')}
			></TextField>
			<Flex
				justifyContent="space-between"
				{...getOverrideProps(overrides, 'CTAFlex')}
			>
				<Button
					children="Reset"
					type="reset"
					onClick={(event) => {
						event.preventDefault();
						resetStateValues();
					}}
					isDisabled={!(idProp || nodeLinkModelProp)}
					{...getOverrideProps(overrides, 'ResetButton')}
				></Button>
				<Flex
					gap="15px"
					{...getOverrideProps(overrides, 'RightAlignCTASubFlex')}
				>
					<Button
						children="Submit"
						type="submit"
						variation="primary"
						isDisabled={
							!(idProp || nodeLinkModelProp) ||
							Object.values(errors).some((e) => e?.hasError)
						}
						{...getOverrideProps(overrides, 'SubmitButton')}
					></Button>
				</Flex>
			</Flex>
		</Grid>
	);
}
