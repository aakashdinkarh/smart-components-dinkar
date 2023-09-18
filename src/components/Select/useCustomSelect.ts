import React, { useEffect, useCallback, useRef } from 'react';

import { getVisibleOptions, isContain } from './helpers';

interface Option {
	label?: string,
	value: string,
}

interface SyntheticClickEvent {
	target: {
		nodeName: string;
		dataset : {
			optionValue: string;
		}
	}
}

interface useCustomSelectProps {
	selectedValue: string | string[],
	setSelectedValue: (...args: any[]) => void;
	visibleOptions: Option[];
	setVisibleOptions: (...args: any[]) => void;
	currentFocus: number;
	setCurrentFocus: (...args: any[]) => void;
	onChange: (...args: any[]) => void;
	onSearch: (...args: any[]) => void;
	onClear: (...args: any[]) => void;
	multiple: boolean;
	options: Option[];
}

interface useCustomReturnType {
	inputRef: React.RefObject<HTMLInputElement>;
	listRef : React.RefObject<HTMLUListElement>;
	containerRef : React.RefObject<HTMLDivElement>;
	clearField : (...args : any[]) => void;
	onInput : (...args : any[]) => void;
};

export function useCustomSelect({
	selectedValue = '',
	setSelectedValue = () => {},
	visibleOptions = [],
	setVisibleOptions = () => {},
	currentFocus = -1,
	setCurrentFocus = () => {},
	onChange = () => {},
	onSearch = () => {},
	onClear = () => {},
	multiple = false,
	options = [],
}: Partial<useCustomSelectProps>) : useCustomReturnType {
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<any>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const clearField = useCallback(() => {
		const newSelectedValue = multiple ? [] : '';
		setSelectedValue(newSelectedValue);

		setVisibleOptions(getVisibleOptions({ selectedValue: newSelectedValue, options, multiple }));

		if (typeof onClear === 'function') {
			onClear();
		}
	}, [multiple, onClear, options, setSelectedValue, setVisibleOptions]);

	const onFocus = useCallback(() => {
		if (listRef.current && containerRef.current) {
			listRef.current.style.display = 'block';
			containerRef.current.classList.add('open');
		}
	}, []);

	const onInput = useCallback((e : React.MouseEvent | React.KeyboardEvent<HTMLInputElement>) => {
		const val = (e.target as HTMLInputElement).value;

		let filteredOptions = getVisibleOptions({ selectedValue, options, multiple });
		if (val) {
			filteredOptions = filteredOptions.filter(
				(option) => isContain(option.label ?? '', val)
                    || isContain(option.value, val),
			);
		}

		setVisibleOptions(filteredOptions);
		setCurrentFocus(-1);

		if (typeof onSearch === 'function') {
			onSearch(val, filteredOptions);
		}
	}, [selectedValue, options, multiple, setVisibleOptions, setCurrentFocus, onSearch]);

	const resetOptions = useCallback(() => {
		if (listRef.current && containerRef.current) {
			listRef.current.style.display = 'none';
			containerRef.current.classList.remove('open');
		}

		(inputRef.current as HTMLInputElement).value = '';
		setVisibleOptions(getVisibleOptions({ selectedValue, options, multiple }));
	}, [multiple, options, selectedValue, setVisibleOptions]);

	const onOutsideClick = useCallback((e : MouseEvent | KeyboardEvent) => {
		const { target } = e;

		if ((containerRef.current as HTMLDivElement).contains(target as HTMLElement) 
			|| (multiple && (target as HTMLElement).dataset.isChild === 'true')) {
			return;
		}

		if ((inputRef.current as HTMLInputElement).value !== '' || listRef.current.style.display !== 'none') {
			resetOptions();
		}
	}, [resetOptions, multiple]);

	const onListClick = useCallback((e : MouseEvent | KeyboardEvent | SyntheticClickEvent) => {
		if ((e.target as HTMLElement).nodeName !== 'LI') {
			return;
		}

		const { optionValue = '' } = (e.target as HTMLElement).dataset || {};

		const selectedOption = visibleOptions.find((option) => optionValue && option.value === optionValue);

		let newSelectedValue : string | string[] = optionValue;

		if (multiple) {
			if (Array.isArray(selectedValue)) {
				newSelectedValue = [...selectedValue, optionValue];
			} else {
				newSelectedValue = [optionValue];
			}
		}

		setSelectedValue(newSelectedValue);
		setVisibleOptions(getVisibleOptions({ selectedValue: newSelectedValue, options, multiple }));

		if (typeof onChange === 'function') {
			onChange(newSelectedValue, selectedOption);
		}
	}, [visibleOptions, multiple, setSelectedValue, setVisibleOptions, options, onChange, selectedValue]);

	const onListHover = useCallback((e : MouseEvent) => {
		if ((e.target as HTMLElement).nodeName === 'LI') {
			const listItem = (e.target as HTMLElement);
			const { optionIndex = '' } : { optionIndex ?: string } = listItem.dataset || {};

			setCurrentFocus(+optionIndex);
		}
	}, [setCurrentFocus]);

	const onKeyDown = useCallback((e : KeyboardEvent) => {
		if (e.key === 'ArrowDown') {
			if (listRef.current && listRef.current.style.display !== 'block') {
				listRef.current.style.display = 'block';
				(containerRef.current as HTMLElement).classList.add('open');
			}
			setCurrentFocus((prev : number) => {
				if (prev >= visibleOptions.length - 1) {
					return 0;
				}
				return prev + 1;
			});
		} else if (e.key === 'ArrowUp') {
			if (listRef.current && listRef.current.style.display !== 'block') {
				listRef.current.style.display = 'block';
				(containerRef.current as HTMLElement).classList.add('open');
			}
			setCurrentFocus((prev : number) => {
				if (prev <= 0) {
					return visibleOptions.length - 1;
				}
				return prev - 1;
			});
		} else if (e.key === 'Enter') {
			if (currentFocus > -1 && currentFocus < visibleOptions.length) {
				onListClick({
					target: {
						nodeName : 'LI',
						dataset  : {
							optionValue: visibleOptions[currentFocus].value,
						},
					},
				});
			}
		} else if (e.key === 'Escape') {
			resetOptions();
		}
	}, [setCurrentFocus, visibleOptions, currentFocus, onListClick, resetOptions]);

	useEffect(() => {
		const inputElem = (inputRef.current as HTMLElement);
		const listElem = (listRef.current as HTMLElement);
		const containerElem = (containerRef.current as HTMLElement);

		inputElem.addEventListener('focus', onFocus);
		document.addEventListener('click', onOutsideClick);
		listElem.addEventListener('click', onListClick);
		listElem.addEventListener('mouseover', onListHover);
		containerElem.addEventListener('keydown', onKeyDown);

		return () => {
			inputElem.removeEventListener('focus', onFocus);
			document.removeEventListener('click', onOutsideClick);
			listElem.removeEventListener('click', onListClick);
			listElem.removeEventListener('mouseover', onListHover);
			containerElem.removeEventListener('keydown', onKeyDown);
		};
	}, [onFocus, onOutsideClick, onListClick, onListHover, onKeyDown]);

	return {
		inputRef,
		listRef,
		containerRef,
		clearField,
		onInput,
	};
}
