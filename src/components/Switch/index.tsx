import React from 'react';

interface CaseProps {
	children?: any
}

function Case({ children } : CaseProps) {
	return children;
}
function Default({ children }: CaseProps) {
	return children;
}

function Switch({ children }: CaseProps) : null | React.ReactElement {
	let matchChild : null | React.ReactElement = null;
	let defaultCase : null | React.ReactElement = null;

	React.Children.forEach(children, (child : any) => {
		if (!matchChild && child.type === Case) {
			const { condition } : { condition: boolean } = child.props;
			const conditionResult = Boolean(condition);

			if (conditionResult) {
				matchChild = child;
			}
		} else if (!defaultCase && child.type === Default) {
			defaultCase = child;
		}
	});

	return matchChild ?? defaultCase ?? null;
}

Switch.Case = Case;
Switch.Default = Default;

export { Switch };
