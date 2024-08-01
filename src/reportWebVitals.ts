export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		void import('web-vitals').then((vitals) => {
			vitals.onCLS(onPerfEntry);
			vitals.onFID(onPerfEntry);
			vitals.onINP(onPerfEntry);
			vitals.onFCP(onPerfEntry);
			vitals.onLCP(onPerfEntry);
			vitals.onTTFB(onPerfEntry);
		});
	}
};
