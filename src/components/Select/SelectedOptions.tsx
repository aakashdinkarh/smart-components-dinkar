import * as React from 'react';

import { getVisibleOptions } from './helpers';
import { SelectedOptionProps } from './interfaces'
import styles from './styles.module.css';


export function SelectedOptions ({
	selectedValue = [],
	options = [],
	setSelectedValue = () => {},
	setVisibleOptions = () => {},
	onRemove = () => {},
	multiple = true,
}: Partial<SelectedOptionProps>): React.JSX.Element {
	function removeOption (removeValue: string): void {
		const newSelectedValue = selectedValue.filter((option) => option !== removeValue);

		const removedOption = options.filter((option) => option.value === removeValue);

		setSelectedValue(newSelectedValue);

		setVisibleOptions(getVisibleOptions({ selectedValue: newSelectedValue, options, multiple }));

		if (typeof onRemove === 'function') {
			onRemove(removeValue, removedOption);
		}
	}

	return (
		<div className={styles.list_option} data-is-child>
			{options
				.filter((option) => selectedValue.includes(option.value))
				.map((option) => (
					<div key={option.value} className={styles.selected_option} data-is-child>
						{option.label}
						<button
							onClick={() => { removeOption(option.value); }}
							className={styles.clear_icon}
							data-is-child
						>
							x
						</button>
					</div>
				))}
		</div>
	);
}
