import { getVisibleOptions } from './helpers';
import styles from './styles.module.css';

export function SelectedOptions({
	selectedValue = [],
	options = [],
	setSelectedValue = () => { },
	setVisibleOptions = () => { },
	onRemove = () => { },
	multiple = true,
}) {
	function removeOption(removeValue) {
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
							onClick={() => removeOption(option.value)}
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
