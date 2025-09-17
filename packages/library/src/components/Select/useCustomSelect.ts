import React from 'react';

import { getVisibleOptions, setNewFocus } from './helpers';
import type { IuseCustomSelect, Option,useCustomSelectArgs } from './interfaces';
import styles from './styles.module.css';

const { useState, useEffect, useCallback, useRef } = React;
const initialCurrentListFocus = -1;

export function useCustomSelect ({
	selectedValue = '',
	setSelectedValue = () => {},
	visibleOptions = [],
	setVisibleOptions = () => {},
	onChange = () => {},
	// onSearch = () => {},
	onClear = () => {},
	multiple = false,
	options = [],
}: Partial<useCustomSelectArgs>): IuseCustomSelect {
	const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
	const [currentFocus, setCurrentFocus] = useState<number>(initialCurrentListFocus);
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<any>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const toggleOptionList = useCallback(() => { setIsSelectOpen((p) => !p); }, []);
	const hideOptionList = useCallback(() => { setIsSelectOpen(false); }, []);
	const showOptionList = useCallback(() => { setIsSelectOpen(true); }, []);

	const resetCurrentFocus = useCallback(() => { setCurrentFocus(initialCurrentListFocus); }, []);

	useEffect(() => {
		if(!isSelectOpen){
			resetCurrentFocus();
		}
	}, [isSelectOpen])

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

	// const resetVisibleOptions = useCallback(() => {
	// 	setVisibleOptions(getVisibleOptions({ selectedValue, options, multiple }));
	// }, [multiple, options, selectedValue]);

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
	}, [multiple, isSelectOpen]);

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

		!multiple && hideOptionList();
		setSelectedValue(newSelectedValue);
		setVisibleOptions(getVisibleOptions({ selectedValue: newSelectedValue, options, multiple }));

		if (typeof onChange === 'function') {
			onChange(newSelectedValue, option);
		}
	}, [multiple, options, onChange, selectedValue]);

	const onListHover = useCallback((optionIndex: number) => {
		setCurrentFocus(optionIndex);
	}, [setCurrentFocus]);

	const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
		e.preventDefault();

		if((document.activeElement as HTMLElement)?.classList.contains(styles.clear_icon)){
			if (e.key === 'ArrowUp' || e.key === 'ArrowDown'){
				(document.activeElement as HTMLElement).blur();
				inputRef.current?.focus();
			}
		} else if(e.key === 'Enter'){
			if(currentFocus < 0 || currentFocus >= visibleOptions.length){				
				toggleOptionList();
			} else {
				onListClick(visibleOptions[currentFocus]);
			}
		} else if (e.key === 'Escape') {
			hideOptionList();
		} else if (e.key === 'ArrowDown') {
			!isSelectOpen && showOptionList();

			setNewFocus({ n: 1, func: setCurrentFocus, max: visibleOptions.length - 1 });
		} else if (e.key === 'ArrowUp') {
			!isSelectOpen && showOptionList();

			setNewFocus({ n: -1, func: setCurrentFocus, max: visibleOptions.length - 1 });
		}
	}, [setCurrentFocus, visibleOptions, currentFocus, onListClick, isSelectOpen]);

	useEffect(() => {
		document.addEventListener('click', onOutsideClick);

		return () => {
			document.removeEventListener('click', onOutsideClick);
		};
	}, [onOutsideClick]);

	return {
		isSelectOpen,
		inputRef,
		listRef,
		containerRef,
		currentFocus,
		clearSelectInput,
		resetCurrentFocus,
		// onInput,
		toggleOptionList,
		onListClick,
		onKeyDown,
		onListHover,
	};
}
