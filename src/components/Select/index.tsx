import React, { memo, useState, useEffect } from 'react';

import { getCombinedClass } from '../../utils/getCombinedClass';
import { isEmpty } from '../../utils/isEmpty';

import { getDefaultValue, getDisplayValue, getVisibleOptions } from './helpers';
import type { IuseCustomSelect,Option, SelectProps } from './interfaces';
import { SelectedOptions } from './SelectedOptions';
import styles from './styles.module.css';
import { useCustomSelect } from './useCustomSelect';

function EmptyList (): React.JSX.Element {
	return (
		<div className={styles['list-option']} data-is-child>
			No options found
		</div>
	);
}

/**
 * @component - Customizable Select component.
 * @param {SelectProps} props - Props for Select component
 * @param {string} [props.className=''] - Additional CSS class names to be applied to the component container.
 * @param {string} [props.name=''] - The name attribute of the Select component.
 * @param {string} [props.value=''] - The currently selected value(s) in the Select component.
 * @param {string} [props.placeholder=''] - Placeholder text displayed when no option is selected.
 * @param {Array} [props.options=[]] - An array of options to be displayed in the dropdown menu.
 * @param {boolean} [props.multiple=false] - Boolean indicating whether multiple options can be selected.
 * @param {boolean} [props.isClearable=false] - Boolean indicating whether a clear button is displayed to 
   clear the selected value(s).
 * @param {Function} [props.onChange=()=>{}] - Callback function triggered when the selected value(s) change.
 * @param {Function} [props.onSearch=()=>{}] - Callback function triggered when the user searches within 
   the dropdown menu.
 * @param {Function} [props.onRemove=()=>{}] - Callback function triggered when an option is removed from 
   the selection (only applicable in multiple mode).
 * @param {Function} [props.onClear=()=>{}] - Callback function triggered when the clear button is clicked.
 * @param {boolean} [props.disabled=false] - Boolean indicating whether the Select component is disabled.
 * 
 * @example
	//usage example
	<Select 
		placeholder="Food preference type"
		options={[
			{
				"label": "Vegetarian",
				"value": "veg"
			},
			{
				"label": "Non-vegetarian",
				"value": "non-veg"
			},
			{
				"label": "Eggeterian",
				"value": "egg"
			}
		]}
		isClearable={false}
	/>
 */
export const Select = memo(function Select ({
	className = '',
	name = '',
	value = '',
	placeholder = 'Select',
	options = [],
	multiple = false,
	isClearable = true,
	onChange = () => {},
	onSearch = () => {},
	onRemove = () => {},
	onClear = () => {},
	disabled = false,
}: Partial<SelectProps>): React.JSX.Element {
	const [selectedValue, setSelectedValue] = useState<string | string[]>(
		getDefaultValue({ value, options, multiple })
	);

	const [visibleOptions, setVisibleOptions] = useState<Option[]>(
		getVisibleOptions({ selectedValue, options, multiple })
	);

	useEffect(() => {
		setSelectedValue(getDefaultValue({ value, options, multiple }));
	}, [options, multiple, value]);

	useEffect(() => {
		setVisibleOptions(getVisibleOptions({ selectedValue, options, multiple }));
	}, [options, multiple, value]);

	const displayValue: string | undefined = getDisplayValue({ selectedValue, options, multiple });
	
	const {
		isSelectOpen,
		inputRef,
		listRef,
		containerRef,
		currentFocus,
		clearSelectInput,
		resetCurrentFocus,
		toggleOptionList,
		onListClick,
		onKeyDown,
		onListHover
	}: IuseCustomSelect = useCustomSelect({
		selectedValue,
		setSelectedValue,
		visibleOptions,
		setVisibleOptions,
		onChange,
		onSearch,
		onClear,
		multiple,
		options,
	});

	return (
		<div
			ref={containerRef} 
			className={getCombinedClass(
				styles['select-input-container'],
				className,
			)}
			onKeyDown={onKeyDown}
		>
			<input
				type="text"
				name="select_dummy_XCV098Z"
				ref={inputRef}
				placeholder={displayValue ?? placeholder}
				readOnly
				className={getCombinedClass(
					'__scd_dummy-input',
					styles['dummy-input'],
					{[styles['not-empty']]: !isEmpty(selectedValue)}
				)}
				disabled={disabled}
				onClick={toggleOptionList}
			/>

			{!isEmpty(selectedValue) && isClearable &&
				<button 
					onClick={clearSelectInput}
					onFocus={resetCurrentFocus}
					className={styles['clear-icon']}
				>
					x
				</button>
			}

			{/* todo: implement search */}
			<input name={name} type="hidden" value={selectedValue} disabled={disabled} />

			<ul ref={listRef} className={getCombinedClass(styles['list-options'], { [styles.open]: isSelectOpen } )}>
				{isSelectOpen && (
					<>
						{multiple && !isEmpty(selectedValue) && Array.isArray(selectedValue) &&
							(
								<SelectedOptions
									selectedValue={selectedValue}
									options={options}
									inputRef={inputRef}
									setSelectedValue={setSelectedValue}
									setVisibleOptions={setVisibleOptions}
									resetCurrentFocus={resetCurrentFocus}
									onRemove={onRemove}
									multiple={multiple}
								/>
							)}
	
						{isEmpty(visibleOptions)
							? <EmptyList />
							: (
								<>
									{visibleOptions.map((option, index) => {
										return (
											<li
												key={option.value}
												className={getCombinedClass(
													styles['list-option'],
													{ [styles.focused]: currentFocus === index }
												)}
												onClick={() => { onListClick(option); }}
												onMouseOver={() => { onListHover(index); }}
												data-is-child
											>
												{option.label}
											</li>
										);
									})}
								</>
							)}
					</>
				)}
			</ul>

			<div onClick={toggleOptionList} className={getCombinedClass(
				styles['caret-button'],
				{ [styles.open]: isSelectOpen }
			)} />
		</div>
	);
});
