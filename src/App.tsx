import React from 'react';

import { SegmentedTabs } from './exports';

export default function App(): any {
	return (
		<>
			<h1>
				Hello World
			</h1>
			<SegmentedTabs defaultActiveTab="tab1">
				<SegmentedTabs.Tab name="tab1" title="Tab 1">Tab 1</SegmentedTabs.Tab>
				<SegmentedTabs.Tab name="tab2" title="Tab 2">Tab 2</SegmentedTabs.Tab>
				<SegmentedTabs.Tab name="tab3" title="Tab 8">Tab 99</SegmentedTabs.Tab>
			</SegmentedTabs>
		</>
	);
}
