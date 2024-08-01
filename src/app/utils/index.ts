export const getSafe = <F,T>(func: () => F, defaultValue: T) => {
	try {
		return func();
	} catch (error) {
		return defaultValue;
	}
}
