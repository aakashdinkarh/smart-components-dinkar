type IClass = string | Record<string,boolean>;

export function getCombinedClass (...classes: IClass[]): string {
	return classes.filter(Boolean).map((item) => {
		if(typeof item === 'string') {
			return item;
		}
		if (item && typeof item === 'object') {
			return Object.keys(item).filter((key) => item[key]).join(' ');
		}
		return '';
	}).join(' ');
}
