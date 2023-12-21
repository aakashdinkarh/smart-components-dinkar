import * as React from 'react';

const { useState } = React;

import { getCombinedClass } from '../../utils/getCombinedClass';
import { isEmpty } from '../../utils/isEmpty';

import { getDefaultValue, getDisplayValue, getVisibleOptions } from './helpers';
import { SelectProps, Option, useCustomSelectProps } from './interfaces';
import { SelectedOptions } from './SelectedOptions';
import styles from './styles.module.css';
import { useCustomSelect } from './useCustomSelect';


function EmptyList (): JSX.Element {
	return (
		<div className={styles.list_option} data-is-child>
			No options found
		</div>
	);
}

function Select ({
	className = '',
	name = '',
	value = '',
	placeholder = 'Select',
	options = [],
	multiple = false,
	isClearable = true,
	onChange = () => { },
	onSearch = () => { },
	onRemove = () => { },
	onClear = () => { },
	disabled = false,
}: Partial<SelectProps>): JSX.Element {
	const [selectedValue, setSelectedValue] = useState<string | string[]>(
		getDefaultValue({ value, options, multiple })
	);

	const [visibleOptions, setVisibleOptions] = useState<Option[]>(
		getVisibleOptions({ selectedValue, options, multiple })
	);

	const [currentFocus, setCurrentFocus] = useState<number>(-1);

	const displayValue: string | undefined = getDisplayValue({ selectedValue, options, multiple });
	
	const {
		isSelectOpen,
		inputRef,
		listRef,
		containerRef,
		clearField,
		onInput,
	}: useCustomSelectProps = useCustomSelect({
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
		<div
			ref={containerRef} 
			className={getCombinedClass(
				styles.select_input_container,
				className,
				{ [styles.open]: isSelectOpen }
			)}
		>
			<input
				type="text"
				name="select_dummy_XCV098Z"
				ref={inputRef}
				placeholder={displayValue ?? placeholder}
				readOnly
				className={`${styles.dummy_input} ${!isEmpty(selectedValue) ? styles.not_empty : ''} dummy_input`}
				disabled={disabled}
			/>

			{!isEmpty(selectedValue) && isClearable &&
				<button onClick={clearField} className={styles.clear_icon}>x</button>}

			<input name={name} type="hidden" value={selectedValue} onChange={onInput} disabled={disabled} />

			<ul ref={listRef} className={getCombinedClass(styles.list_options, { [styles.open]: isSelectOpen } )}>
				{isSelectOpen && (
					<>
					{multiple && !isEmpty(selectedValue) && Array.isArray(selectedValue) &&
						(
							<SelectedOptions
								selectedValue={selectedValue}
								options={options}
								setSelectedValue={setSelectedValue}
								setVisibleOptions={setVisibleOptions}
								onRemove={onRemove}
								multiple={multiple}
							/>
						)}
	
					{isEmpty(visibleOptions)
						? <EmptyList />
						: (
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
					</>
				)}
			</ul>
		</div>
	);
}

export { Select };
