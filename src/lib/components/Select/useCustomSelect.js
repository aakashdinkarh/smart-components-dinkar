import React, { useEffect, useCallback, useRef } from 'react';

import { getVisibleOptions, isContain } from './helpers';

export function useCustomSelect({
	selectedValue = '',
	setSelectedValue = () => {},
	visibleOptions = [],
	setVisibleOptions = () => {},
	currentFocus = -1,
	setCurrentFocus = () => {},
	onChange = () => { },
	onSearch = () => { },
	onClear = () => { },
	multiple = false,
	options = [],
}) {
	const inputRef = useRef(null);
	const listRef = useRef(null);
	const containerRef = useRef(null);

	const clearField = useCallback(() => {
		const newSelectedValue = multiple ? [] : '';
		setSelectedValue(newSelectedValue);

		setVisibleOptions(getVisibleOptions({ selectedValue: newSelectedValue, options, multiple }));

		if (typeof onClear === 'function') {
			onClear();
		}
	}, [multiple, onClear, options, setSelectedValue, setVisibleOptions]);

	const onFocus = useCallback(() => {
		if (listRef.current) {
			listRef.current.style.display = 'block';
			containerRef.current.classList.add('open');
		}
	}, []);

	const onInput = useCallback((e) => {
		const val = e.target.value;

		let filteredOptions = getVisibleOptions({ selectedValue, options, multiple });
		if (val) {
			filteredOptions = filteredOptions.filter(
				(option) => isContain(option.label, val)
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
		if (listRef.current) {
			listRef.current.style.display = 'none';
			containerRef.current.classList.remove('open');
		}

		inputRef.current.value = '';
		setVisibleOptions(getVisibleOptions({ selectedValue, options, multiple }));
	}, [multiple, options, selectedValue, setVisibleOptions]);

	const onOutsideClick = useCallback((e) => {
		const { target } = e;

		if (containerRef.current.contains(target) || (multiple && target.dataset.isChild === 'true')) {
			return;
		}

		if (inputRef.current.value !== '' || listRef.current.style.display !== 'none') {
			resetOptions();
		}
	}, [resetOptions, multiple]);

	const onListClick = useCallback((e) => {
		if (e.target.nodeName !== 'LI') {
			return;
		}

		const { optionValue } = e.target.dataset || {};

		const selectedOption = visibleOptions.find((option) => optionValue && option.value === optionValue);

		let newSelectedValue = optionValue;

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

	const onListHover = useCallback((e) => {
		if (e.target.nodeName === 'LI') {
			const listItem = e.target;
			const { optionIndex } = listItem.dataset;

			setCurrentFocus(+optionIndex);
		}
	}, [setCurrentFocus]);

	const onKeyDown = useCallback((e) => {
		if (e.keyCode === 40) { // arrow down key pressed
			if (listRef.current && listRef.current.style.display !== 'block') {
				listRef.current.style.display = 'block';
				containerRef.current.classList.add('open');
			}
			setCurrentFocus((prev) => {
				if (prev >= visibleOptions.length - 1) {
					return 0;
				}
				return prev + 1;
			});
		} else if (e.keyCode === 38) { // arrow up key pressed
			if (listRef.current && listRef.current.style.display !== 'block') {
				listRef.current.style.display = 'block';
				containerRef.current.classList.add('open');
			}
			setCurrentFocus((prev) => {
				if (prev <= 0) {
					return visibleOptions.length - 1;
				}
				return prev - 1;
			});
		} else if (e.keyCode === 13) { // enter key pressed
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
		} else if (e.keyCode === 27) { // escape key pressed
			resetOptions();
		}
	}, [setCurrentFocus, visibleOptions, currentFocus, onListClick, resetOptions]);

	useEffect(() => {
		const inputElem = inputRef.current;
		const listElem = listRef.current;
		const containerElem = containerRef.current;

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
