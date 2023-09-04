import React from 'react';

import styles from './styles.module.css';

function Tab({ children }) {
	return children;
}

function SegmentedTabs({ defaultActiveTab = '', onTabChange = () => {}, children = null }) {
	const validChildren = React.Children.toArray(children).filter((child) => child.type === Tab);

	const tabs = validChildren.map((child) => ({ name: child.props.name, title: child.props.title }));

	const [activeTab, setActiveTab] = React.useState(defaultActiveTab || tabs[0].name);

	const tabsRef = React.useRef({});

	React.useEffect(() => {
		const currentButton = tabsRef.current?.[activeTab];

		if (currentButton) {
			const translateX = currentButton.offsetLeft;
			const { width, height } = currentButton.getBoundingClientRect();

			tabsRef.current.slider.style.transform = `translate(${translateX}px, -50%)`;
			tabsRef.current.slider.style.width = `${width}px`;
			tabsRef.current.slider.style.height = `${height}px`;
		}

		if (tabs.every((tab) => tab.name !== activeTab)) {
			setActiveTab(tabs[0].name);
		}
	}, [activeTab, tabs]);

	function handleTabChange(newTab) {
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
						onClick={() => handleTabChange(name)}
						className={`${styles.tab} tab`}
					>
						{title}
					</button>
				))}
			</div>

			<div className="tab_content">
				{validChildren.filter((child) => child.props.name === activeTab)}
			</div>
		</div>
	);
}

SegmentedTabs.Tab = Tab;

export { SegmentedTabs };
