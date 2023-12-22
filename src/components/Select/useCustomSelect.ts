import * as React from 'react';
const { useState, useEffect, useCallback, useRef } = React;

import { getVisibleOptions } from './helpers';
import { useCustomSelectArgs, IuseCustomSelect, Option } from './interfaces';

export function useCustomSelect ({
	selectedValue = '',
	setSelectedValue = () => {},
	// visibleOptions = [],
	setVisibleOptions = () => {},
	// currentFocus = -1,
	setCurrentFocus = () => {},
	onChange = () => {},
	// onSearch = () => {},
	onClear = () => {},
	multiple = false,
	options = [],
}: Partial<useCustomSelectArgs>): IuseCustomSelect {
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<any>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const toggleOptionList = useCallback(() => setIsSelectOpen((p) => !p), []);
	const hideOptionList = useCallback(() => setIsSelectOpen(false), []);
	// const showOptionList = useCallback(() => setIsSelectOpen(true), []);

	const onKeyDownInput = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
		if(e.key === 'Enter'){
			toggleOptionList();
		}
	}, []);

	const clearSelectInput = useCallback(() => {
		const newSelectedValue = multiple ? [] : '';
		setSelectedValue(newSelectedValue);

		setVisibleOptions(getVisibleOptions({ selectedValue: newSelectedValue, options, multiple }));

		if (typeof onClear === 'function') {
			onClear();
		}
	}, [multiple, onClear, options]);

	// const onInput = useCallback((e: React.MouseEvent | React.KeyboardEvent<HTMLInputElement>) => {
	// 	const val = (e.target as HTMLInputElement).value;

	// 	let filteredOptions = getVisibleOptions({ selectedValue, options, multiple });
	// 	if (val !== '') {
	// 		filteredOptions = filteredOptions.filter(
	// 			(option) => isContain(option.label ?? '', val) ||
	//                 isContain(option.value, val),
	// 		);
	// 	}

	// 	setVisibleOptions(filteredOptions);
	// 	setCurrentFocus(-1);

	// 	if (typeof onSearch === 'function') {
	// 		onSearch(val, filteredOptions);
	// 	}
	// }, [selectedValue, options, multiple, setVisibleOptions, setCurrentFocus, onSearch]);

	const resetVisibleOptions = useCallback(() => {
		setVisibleOptions(getVisibleOptions({ selectedValue, options, multiple }));
	}, [multiple, options, selectedValue]);

	const onOutsideClick = useCallback((e: MouseEvent | KeyboardEvent) => {
		const { target } = e;
		
		if ((containerRef.current as HTMLDivElement).contains(target as HTMLElement)
			|| (multiple && (target as HTMLElement).dataset.isChild === 'true')) {
			return;
		}
		hideOptionList();

		// if ((inputRef.current as HTMLInputElement).value !== '' || isSelectOpen) {
		// 	resetVisibleOptions();
		// }
	}, [resetVisibleOptions, multiple, isSelectOpen]);

	const onListClick = useCallback((option: Option) => {
		const { value } = option;

		let newSelectedValue: string | string[] = value;

		if (multiple) {
			if (Array.isArray(selectedValue)) {
				newSelectedValue = [...selectedValue, value];
			} else {
				newSelectedValue = [value];
			}
		}

		setSelectedValue(newSelectedValue);
		setVisibleOptions(getVisibleOptions({ selectedValue: newSelectedValue, options, multiple }));

		if (typeof onChange === 'function') {
			onChange(newSelectedValue, option);
		}
	}, [multiple, options, onChange, selectedValue]);

	const onListHover = useCallback((optionIndex: number) => {
		setCurrentFocus(optionIndex);
	}, [setCurrentFocus]);

	// const onKeyDown = useCallback((e: KeyboardEvent) => {
	// 	if (e.key === 'ArrowDown') {
	// 		if (!isSelectOpen) {
	// 			setIsSelectOpen(true);
	// 		}
	// 		setCurrentFocus((prev: number) => {
	// 			if (prev >= visibleOptions.length - 1) {
	// 				return 0;
	// 			}
	// 			return prev + 1;
	// 		});
	// 	} else if (e.key === 'ArrowUp') {
	// 		if (!isSelectOpen) {
	// 			setIsSelectOpen(true);
	// 		}
	// 		setCurrentFocus((prev: number) => {
	// 			if (prev <= 0) {
	// 				return visibleOptions.length - 1;
	// 			}
	// 			return prev - 1;
	// 		});
	// 	} else if (e.key === 'Enter') {
	// 		if (currentFocus > -1 && currentFocus < visibleOptions.length) {
	// 			onListClick({
	// 				target: {
	// 					nodeName : 'LI',
	// 					dataset  : {
	// 						optionValue: visibleOptions[currentFocus].value,
	// 					},
	// 				},
	// 			});
	// 		}
	// 	} else if (e.key === 'Escape') {
	// 		resetVisibleOptions();
	// 	}
	// }, [setCurrentFocus, visibleOptions, currentFocus, onListClick, resetVisibleOptions, isSelectOpen]);

	useEffect(() => {
		document.addEventListener('click', onOutsideClick);
		// containerElem.addEventListener('keydown', onKeyDown);

		return () => {
			document.removeEventListener('click', onOutsideClick);
		};
	}, [onOutsideClick]);

	return {
		isSelectOpen,
		inputRef,
		listRef,
		containerRef,
		clearSelectInput,
		// onInput,
		toggleOptionList,
		onListClick,
		onKeyDownInput,
		onListHover,
	};
}
