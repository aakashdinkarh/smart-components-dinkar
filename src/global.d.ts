/* eslint-disable import/no-default-export */
declare module '*.module.css' {
	const classes: Record<string, string>;
	export default classes;
}

declare module '*.svg' {
	import React = require('react');

	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}
