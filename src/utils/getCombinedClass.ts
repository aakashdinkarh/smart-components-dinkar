export function getCombinedClass (...classes: string[]): string {
	return classes.filter(Boolean).join(' ');
}
