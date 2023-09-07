export function getClass(...classes){
	return classes.filter(Boolean).join(' ');
}