import * as React from 'react';

interface CaseProps {
	children?: any;
	condition: boolean;
	[key: string]: any;
}

interface SwitchProps {
	children: CaseProps;
}

function Case ({ children }: CaseProps): any {
	return children;
}
function Default ({ children }: CaseProps): any {
	return children;
}

function Switch ({ children }: SwitchProps): null | React.ReactElement {
	let matchChild: null | React.ReactElement | CaseProps = null;
	let defaultCase: null | React.ReactElement | CaseProps = null;

	React.Children.forEach(children, (child) => {
		if (matchChild == null && child.type === Case) {
			const { condition }: { condition?: boolean } = child.props as Record<string,any>;
			const conditionResult = Boolean(condition);

			if (conditionResult) {
				matchChild = child;
			}
		} else if (defaultCase == null && child.type === Default) {
			defaultCase = child;
		}
	});

	return matchChild ?? defaultCase;
}

Switch.Case = Case;
Switch.Default = Default;

export { Switch };
