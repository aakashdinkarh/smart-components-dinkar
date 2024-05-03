import type { NamedExoticComponent, PropsWithChildren, ReactElement } from 'react';
import React, { isValidElement, memo } from 'react';

interface CaseProps extends PropsWithChildren {
	condition: boolean;
}
type DefaultProps = PropsWithChildren;7
type SwitchProps = PropsWithChildren;

/**
 * The content to render if no other Case is matched.
 * @param {CaseProps} props - The props of the Default component.
 * @param {React.ReactNode} props.children - The content to be displayed in Case.
 * @param {boolean} props.condition - Renders its content if the provided condition is truthy.
 * @returns {ReactElement | null} The rendered content.
 * @example
 * // Usage example:
	<Switch.Case condition={false}>Case 1</Switch.Case>
 */
const Case = memo(function Case({ children }: CaseProps): ReactElement | null {
	return children as ReactElement;
});

/**
 * The content to render if no other Case is matched.
 * @param {DefaultProps} props - The props of the Default component.
 * @returns {ReactElement} The rendered content.
 * @example
 * // Usage example:
	<Switch.Default>Default</Switch.Default>
 */
const Default = memo(function Default({ children }: DefaultProps): ReactElement {
	return children as ReactElement;
});

/**
 * Represents a switch-like component that conditionally renders the first matched case or the default case.
 * The children can include instances of `Switch.Case` and `Switch.Default`.
 * @component
 * @param {DefaultProps} props - The props of the Switch component.
 * @param {React.ReactNode} props.children - Switch.Case or Switch.Default child components.
 * @returns {ReactElement | null} The first matched case or the default case or null.
 * @example
 * // Usage example:
 * <Switch>
 *   <Switch.Case condition={false}>Case 1</Switch.Case>
 *   <Switch.Case condition>Case 2</Switch.Case>
 *   <Switch.Case condition={false}>Case 3</Switch.Case>
 *   <Switch.Default>Default</Switch.Default>
 * </Switch>
 */
export const Switch = memo(function Switch({ children }: SwitchProps): ReactElement | null {
	let matchChild: ReactElement | null = null;
	let defaultCase: ReactElement | null = null;

	React.Children.forEach(children, (child) => {
		if(!isValidElement(child)) { return }

		if (matchChild == null && child.type === Case) {
			const { condition }: { condition?: boolean } = child.props as Record<string, any>;
			const conditionResult = Boolean(condition);

			if (conditionResult) {
				matchChild = child as ReactElement;
			}
		} else if (defaultCase == null && child.type === Default) {
			defaultCase = child as ReactElement;
		}
	});

	return matchChild ?? defaultCase;
}) as NamedExoticComponent<SwitchProps> & {
	Case: NamedExoticComponent<CaseProps>;
	Default: NamedExoticComponent<DefaultProps>;
};

Switch.Case = Case;
Switch.Default = Default;
