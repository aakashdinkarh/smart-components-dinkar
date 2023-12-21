export function isEmpty (val: any): boolean {
	if (Array.isArray(val)) {
		return val.length === 0;
	}
	if (typeof val === 'object' && val !== null) {
		return isEmpty(Object.keys(val));
	}
	return val == null || val === '';
}
