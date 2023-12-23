import * as React from 'react';

import { getCombinedClass } from '../../utils/getCombinedClass';

import styles from './styles.module.css';

const { isValidElement, Children, useState, useRef, useEffect } = React;

interface SegmentedTabsProps {
	defaultActiveTab: string;
	onTabChange: (newTab?: string) => void;
	children: React.ReactNode;
}

interface TabProps {
	name: string;
	title?: string;
	children?: React.ReactNode;
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
		.filter((child) => isValidElement(child) && child.type === Tab);

	const tabs: TabProps[] = validChildren
		.map((child) => ({
			name  : (child as {props: TabProps}).props.name ?? '',
			title : (child as {props: TabProps}).props.title ?? '',
		} as TabProps));

	const [activeTab, setActiveTab] = useState<string>(defaultActiveTab ?? tabs[0].name);

	const tabsRef: { current: Record<string,HTMLDivElement | HTMLButtonElement | null> } = useRef({});

	useEffect(() => {
		const currentButton = tabsRef.current[activeTab];

		if (currentButton != null && tabsRef.current.slider) {
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
			<div className={getCombinedClass(styles.tabs_container, 'tabs_container')}>
				<div
					ref={(v) => { tabsRef.current.slider = v; }} 
					className={getCombinedClass(styles.slider, 'slider')}
				/>

				{tabs.map(({ name, title }) => (
					<button
						key={name}
						ref={(v) => { tabsRef.current[name] = v; }}
						onClick={() => { handleTabChange(name); }}
						className={getCombinedClass(styles.tab, 'tab')}
					>
						{title}
					</button>
				))}
			</div>

			<div className="tab_content">
				{validChildren.filter((child) => (child as {props: TabProps}).props.name === activeTab)}
			</div>
		</div>
	);
}

SegmentedTabs.Tab = Tab;

export { SegmentedTabs };
