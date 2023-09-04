import { isEmpty } from '../../utils/isEmpty';

export function isContain(val1, val2) {
	return val1.toLowerCase().includes(val2.toLowerCase());
}

export function getDefaultValue({ value = '', options = [], multiple = false }) {
	if (multiple) {
		if (Array.isArray(value)) {
			return options.filter((option) => value.includes(option.value)).map((option) => option.value);
		}
		if (typeof value === 'string') {
			return options.filter((option) => value && option.value === value).map((option) => option.value);
		}
	}
	return options.find((option) => value && option.value === value)?.value;
}

export function getDisplayValue({ selectedValue = '', options = [], multiple = false }) {
	if (multiple && Array.isArray(selectedValue)) {
		let displayValue = options.find((option) => option.value === selectedValue[0])?.label;
		displayValue = displayValue ? `${displayValue} (${selectedValue.length})` : '';
		return displayValue;
	}

	return options.find((option) => option.value === selectedValue)?.label;
}

export function getVisibleOptions({ selectedValue = '', options = [], multiple = false }) {
	if (isEmpty(selectedValue)) {
		return options;
	}

	if (multiple) {
		return options.filter((option) => !selectedValue.includes(option.value));
	}

	return options.filter((option) => option.value !== selectedValue);
}
