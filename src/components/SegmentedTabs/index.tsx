import * as React from 'react';

import styles from './styles.module.css';

const { isValidElement, Children, useState, useRef, useEffect } = React;

interface SegmentedTabsProps {
	defaultActiveTab: string;
	onTabChange: (newTab?: string) => void;
	children: any;
}

interface TabProps {
	name: string;
	title?: string;
	children?: any;
}

function Tab ({ children }: TabProps): any {
	return children;
}

function SegmentedTabs ({
	defaultActiveTab = '',
	onTabChange = () => {},
	children = null
}: Partial<SegmentedTabsProps>): React.JSX.Element {
	const validChildren = Children.toArray(children)
		.filter((child: any) => isValidElement(child) && child.type === Tab);

	const tabs: Array<{ name: string, title?: string }> = validChildren
		.map((child: any) => ({ name: child.props.name ?? '', title: child.props.title ?? '' }));

	const [activeTab, setActiveTab] = useState<string>(defaultActiveTab ?? tabs[0].name);

	const tabsRef: Record<string, any> = useRef({});

	useEffect(() => {
		const currentButton = tabsRef.current?.[activeTab];

		if (currentButton != null) {
			const translateX: number = currentButton.offsetLeft;
			const { width, height }: { width: number, height: number } = currentButton.getBoundingClientRect();

			tabsRef.current.slider.style.transform = `translate(${translateX}px, -50%)`;
			tabsRef.current.slider.style.width = `${width}px`;
			tabsRef.current.slider.style.height = `${height}px`;
		}

		if (tabs.every((tab) => tab.name !== activeTab)) {
			setActiveTab(tabs[0].name);
		}
	}, [activeTab, tabs]);

	function handleTabChange (newTab: string): void {
		setActiveTab(newTab);

		if (typeof onTabChange === 'function') { onTabChange(newTab); }
	}

	return (
		<div className="segmented_tabs_container">
			<div className={`${styles.tabs_container} tabs_container`}>
				<div ref={(v) => { tabsRef.current.slider = v; }} className={`${styles.slider} slider`} />

				{tabs.map(({ name, title }) => (
					<button
						key={name}
						ref={(v) => { tabsRef.current[name] = v; }}
						onClick={() => { handleTabChange(name); }}
						className={`${styles.tab} tab`}
					>
						{title}
					</button>
				))}
			</div>

			<div className="tab_content">
				{validChildren.filter((child: any) => child.props.name === activeTab)}
			</div>
		</div>
	);
}

SegmentedTabs.Tab = Tab;

export { SegmentedTabs };
