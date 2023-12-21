import * as React from 'react';

export interface Option {
	label?: string,
	value: string,
}

type IFunction = (...ars: any[]) => void;

export type Options = Option[] | [];

export interface helperFunctionsProps {
	value: string,
	options: Options,
	multiple: boolean,
	selectedValue: string | string[],
}

export interface SelectProps {
	className: string;
	name: string;
	value: string;
	placeholder: string;
	options: Options;
	multiple: boolean;
	isClearable: boolean;
	onChange: IFunction;
	onSearch: IFunction;
	onRemove: IFunction;
	onClear: IFunction;
	disabled: boolean;
}

export interface useCustomSelectProps {
	isSelectOpen: boolean;
	inputRef: React.RefObject<HTMLInputElement>;
	listRef: React.RefObject<HTMLUListElement>;
	containerRef: React.RefObject<HTMLDivElement>;
	clearField: IFunction;
	onInput: IFunction;
}

export interface SelectedOptionProps {
	selectedValue: string[];
	options: Options;
	setSelectedValue: IFunction;
	setVisibleOptions: IFunction;
	onRemove: IFunction;
	multiple: boolean;
}

export interface SyntheticClickEvent {
	target: {
		nodeName: string;
		dataset: {
			optionValue: string;
		}
	}
}

export interface useCustomSelectArgs {
	selectedValue: string | string[],
	setSelectedValue: IFunction;
	visibleOptions: Option[];
	setVisibleOptions: IFunction;
	currentFocus: number;
	setCurrentFocus: IFunction;
	onChange: IFunction;
	onSearch: IFunction;
	onClear: IFunction;
	multiple: boolean;
	options: Option[];
}

export interface useCustomReturnType {
	isSelectOpen: boolean;
	inputRef: React.RefObject<HTMLInputElement>;
	listRef: React.RefObject<HTMLUListElement>;
	containerRef: React.RefObject<HTMLDivElement>;
	clearField: IFunction;
	onInput: IFunction;
}