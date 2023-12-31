/* eslint-disable import/no-default-export */
declare module '*.module.css' {
	const classes: Record<string, string>;
	export default classes;
}

declare module '*.svg' {
	const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export const ReactComponent;
}
