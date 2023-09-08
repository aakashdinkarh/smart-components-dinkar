export function getClass(...classes : string[]) : string {
	return classes.filter(Boolean).join(' ');
}