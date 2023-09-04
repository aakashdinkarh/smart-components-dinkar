import { useState } from 'react';

import { getDefaultValue, getDisplayValue, getVisibleOptions } from './helpers';
import { isEmpty } from '../../utils/isEmpty';

import { SelectedOptions } from './SelectedOptions';
import styles from './styles.module.css';
import { useCustomSelect } from './useCustomSelect';

function EmptyList() {
	return (
		<div className={styles.list_option} data-is-child>
			No options found
		</div>
	);
}

export default function Select({
	className = '',
	name = '',
	value = '',
	placeholder = 'Select',
	options = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' },
		{ value: 'option4', label: 'Option 4' },
	],
	multiple = false,
	isClearable = true,
	onChange = () => { },
	onSearch = () => { },
	onRemove = () => { },
	onClear = () => { },
	disabled = false,
}) {
	const [selectedValue, setSelectedValue] = useState(getDefaultValue({ value, options, multiple }));

	const [visibleOptions, setVisibleOptions] = useState(getVisibleOptions({ selectedValue, options, multiple }));

	const [currentFocus, setCurrentFocus] = useState(-1);

	const displayValue = getDisplayValue({ selectedValue, options, multiple });

	const {
		inputRef,
		listRef,
		containerRef,
		clearField,
	} = useCustomSelect({
		selectedValue,
		setSelectedValue,
		visibleOptions,
		setVisibleOptions,
		currentFocus,
		setCurrentFocus,
		onChange,
		onSearch,
		onClear,
		multiple,
		options,
	});

	return (
		<div ref={containerRef} className={`${styles.select_input_container} ${className || ''}`}>
			<input
				type="text"
				name="select_dummy_XCV098Z"
				ref={inputRef}
				placeholder={displayValue || placeholder}
				className={`${styles.dummy_input} ${!isEmpty(selectedValue) ? styles.not_empty : ''} dummy_input`}
				disabled={disabled}
			/>

			{!isEmpty(selectedValue) && isClearable
				&& <button onClick={clearField} className={styles.clear_icon}>x</button>}

			<input name={name} type="hidden" value={selectedValue} disabled={disabled} />

			<ul ref={listRef} className={styles.list_options}>

				{multiple && !isEmpty(selectedValue)
					&& (
						<SelectedOptions
							selectedValue={selectedValue}
							options={options}
							setSelectedValue={setSelectedValue}
							setVisibleOptions={setVisibleOptions}
							onRemove={onRemove}
							multiple={multiple}
						/>
					)}

				{!isEmpty(visibleOptions)
					? <EmptyList /> : (
						<>
							{visibleOptions.map((option, index) => {
								let itemClass = `${styles.list_option} `;
								itemClass += currentFocus === index ? styles.focused : '';

								return (
									<li
										key={option.value}
										className={itemClass}
										data-option-value={option.value}
										data-option-index={index}
										data-is-child
									>
										{option.label}
									</li>
								);
							})}
						</>
					)}
			</ul>
		</div>
	);
}
