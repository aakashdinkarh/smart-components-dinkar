import React from 'react';

import { getCombinedClass } from '../../utils/getCombinedClass';
import { isEmpty } from '../../utils/isEmpty';

import { getDefaultValue, getDisplayValue, getVisibleOptions } from './helpers';
import type { IuseCustomSelect,Option, SelectProps } from './interfaces';
import { SelectedOptions } from './SelectedOptions';
import styles from './styles.module.css';
import { useCustomSelect } from './useCustomSelect';

const { useState } = React;

function EmptyList (): React.JSX.Element {
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
}: Partial<SelectProps>): React.JSX.Element {
	const [selectedValue, setSelectedValue] = useState<string | string[]>(
		getDefaultValue({ value, options, multiple })
	);

	const [visibleOptions, setVisibleOptions] = useState<Option[]>(
		getVisibleOptions({ selectedValue, options, multiple })
	);

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
				styles.select_input_container,
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
					'dummy_input',
					styles.dummy_input,
					{[styles.not_empty]: !isEmpty(selectedValue)}
				)}
				disabled={disabled}
				onClick={toggleOptionList}
			/>

			{!isEmpty(selectedValue) && isClearable &&
				<button 
					onClick={clearSelectInput}
					onFocus={resetCurrentFocus}
					className={styles.clear_icon}
				>
					x
				</button>
			}

			{/* todo: implement search */}
			<input name={name} type="hidden" value={selectedValue} disabled={disabled} />

			<ul ref={listRef} className={getCombinedClass(styles.list_options, { [styles.open]: isSelectOpen } )}>
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
													styles.list_option,
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
				styles.caret_button,
				{ [styles.open]: isSelectOpen }
			)} />
		</div>
	);
}

export { Select };
