import type { JSX, NamedExoticComponent, PropsWithChildren } from 'react';
import React, { Fragment, memo } from 'react';

import { getCombinedClass } from '../../utils/getCombinedClass';

import styles from './styles.module.css';

const { isValidElement, Children, useState, useRef, useEffect } = React;

interface SegmentedTabsProps extends PropsWithChildren {
	defaultActiveTab: string;
	onTabChange: (newTab?: string) => void;
	Tab: any;
}

interface TabProps extends PropsWithChildren {
	name: string;
	title?: string;
}

/**
 * A single tab component to be used inside SegmentedTabs.
 * @param {TabProps} props - The props of the component.
 * @param {string} props.name - The variant of the loader animation.
 * @param {string} [props.title] - The variant of the loader animation.
 * @returns {JSX.Element} The rendered Tab component.
 * @example
 * // Usage example:
	<SegmentedTabs.Tab name="tab1" title="Tab 1">Tab 1</SegmentedTabs.Tab>
 */
export const Tab = memo(function Tab ({ children }: TabProps): JSX.Element {
	return <Fragment>{children}</Fragment>;
});

/**
 * A segmented tabs component.
 * @param {SegmentedTabsProps} props - The props of the component.
 * @param {string} props.defaultActiveTab - The name of the default active tab.
 * @param {string} props.onTabChange - Function called when the active tab changes.
 * @returns {JSX.Element} The rendered SegmentedTabs component.
 * @example
 * // Usage example:
    <SegmentedTabs defaultActiveTab="tab1">
        <SegmentedTabs.Tab name="tab1" title="Tab 1">Tab 1</SegmentedTabs.Tab>
        <SegmentedTabs.Tab name="tab2" title="Tab 2">Tab 2</SegmentedTabs.Tab>
        <SegmentedTabs.Tab name="tab3" title="Tab 8">Tab 8</SegmentedTabs.Tab>
    </SegmentedTabs>
 */
export const SegmentedTabs = memo(function SegmentedTabs ({
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
		<div className="__scd_segmented_tabs_container">
			<div className={getCombinedClass(styles['tabs-container'], '__scd_tabs-container')}>
				<div
					ref={(v) => { tabsRef.current.slider = v; }} 
					className={getCombinedClass(styles.slider, '__scd_slider')}
				/>

				{tabs.map(({ name, title }) => (
					<button
						key={name}
						ref={(v) => { tabsRef.current[name] = v; }}
						onClick={() => { handleTabChange(name); }}
						className={getCombinedClass(styles.tab, '__scd_tab')}
					>
						{title}
					</button>
				))}
			</div>

			<div className="__scd_tab_content">
				{validChildren.filter((child) => (child as {props: TabProps}).props.name === activeTab)}
			</div>
		</div>
	);
}) as NamedExoticComponent<SegmentedTabsProps> & {
	Tab: NamedExoticComponent<TabProps>;
};

SegmentedTabs.Tab = Tab;
