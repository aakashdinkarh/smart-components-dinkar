export function isEmpty(val) {
	if (Array.isArray(val)) {
		return val.length === 0;
	}
	if (typeof val === 'object' && val !== null) {
		return isEmpty(Object.keys(val));
	}
	return val == null || val === '';
}
