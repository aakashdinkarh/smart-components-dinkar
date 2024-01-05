import type { ReactElement, ReactNode } from 'react';
import React from 'react';

interface SwitchProps {
	/**
	 * The children can include instances of `Switch.Case` and `Switch.Default`.
	 */
	children: ReactNode;
}

/**
 * Represents a switch-like component that conditionally renders the first matched case or the default case.
 * @component
 * @example
 * // Usage example:
 * <Switch>
 *   <Switch.Case condition={false}>Case 1</Switch.Case>
 *   <Switch.Case condition>Case 2</Switch.Case>
 *   <Switch.Case condition={false}>Case 3</Switch.Case>
 *   <Switch.Default>Default</Switch.Default>
 * </Switch>
 * @param {SwitchProps} props - The props of the component.
 * @returns {ReactElement | null} The first matched case or the default case or null.
 */
function Switch({ children }: SwitchProps): ReactElement | null {
	let matchChild: ReactElement | null = null;
	let defaultCase: ReactElement | null = null;

	React.Children.forEach(children, (child) => {
		if (matchChild == null && React.isValidElement(child) && (child.type as any) === Switch.Case) {
			const { condition }: { condition?: boolean } = child.props as Record<string, any>;
			const conditionResult = Boolean(condition);

			if (conditionResult) {
				matchChild = child as ReactElement;
			}
		} else if (defaultCase == null && React.isValidElement(child) && (child.type as any) === Switch.Default) {
			defaultCase = child as ReactElement;
		}
	});

	return matchChild ?? defaultCase;
}

interface CaseProps {
	/**
	 * Case component to be used within the Switch component.
	 * Renders its content if the provided condition is truthy.
	 */
	condition: boolean;
	/**
	 * The content to render if the condition is true.
	 */
	children: ReactNode;
}

/**
 * Case component that renders its content if the provided condition is truthy.
 * @param {CaseProps} props - The props of the Case component.
 * @returns {ReactElement | null} The rendered content.
 */
function Case({ children }: CaseProps): ReactElement | null {
	return children as ReactElement;
}

interface DefaultProps {
	/**
	 * The content to render if no other Case is matched.
	 */
	children: ReactNode;
}

/**
 * Default component to be used within the Switch component.
 * Renders its content if no other Case is matched.
 * 
 * @param {DefaultProps} props - The props of the Default component.
 * @returns {ReactElement} The rendered content.
 */
function Default({ children }: DefaultProps): ReactElement {
	return children as ReactElement;
}

Switch.Case = Case;
Switch.Default = Default;

export { Switch };
