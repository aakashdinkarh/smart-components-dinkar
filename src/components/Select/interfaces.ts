import type * as React from 'react';

export interface Option {
	label?: string,
	value: string,
}

type IFunction = (...ars: any[]) => void;

export type Options = Option[] | [];

export interface helperFunctionsProps {
	value: string | string[],
	options: Options,
	multiple: boolean,
	selectedValue: string | string[],
}

export interface IsetNewFocus {
	n: number;
	func: IFunction;
	max: number;
	min?: number;
}

export interface SelectProps {
	className: string;
	name: string;
	value: string | string[];
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

export interface SelectedOptionProps {
	selectedValue: string[];
	options: Options;
	inputRef: React.RefObject<HTMLInputElement>;
	setSelectedValue: IFunction;
	setVisibleOptions: IFunction;
	resetCurrentFocus: IFunction;
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

export interface IuseCustomSelect {
	isSelectOpen: boolean;
	inputRef: React.RefObject<HTMLInputElement>;
	listRef: React.RefObject<HTMLUListElement>;
	containerRef: React.RefObject<HTMLDivElement>;
	currentFocus: number;
	clearSelectInput: IFunction;
	resetCurrentFocus: IFunction;
	toggleOptionList: IFunction;
	onListClick: IFunction;
	onKeyDown: IFunction;
	onListHover: IFunction;
}