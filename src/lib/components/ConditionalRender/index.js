import React from 'react';

function Case({ children }) {
	return children;
}
function Default({ children }) {
	return children;
}

function Switch({ children }) {
	let matchChild = null;
	let defaultCase = null;

	React.Children.forEach(children, (child) => {
		if (!matchChild && child.type === Case) {
			const { condition } = child.props;
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
