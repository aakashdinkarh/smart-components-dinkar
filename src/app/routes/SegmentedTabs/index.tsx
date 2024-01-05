import * as React from 'react';

import { SegmentedTabs } from '../../../exports';
import { StickyHeader } from '../../common/StickyHeader';

export function SegmentedTabsPage() {
	return (
		<main>
			<StickyHeader heading='Segmented Tabs' />

			<SegmentedTabs defaultActiveTab='tab1'>
				<SegmentedTabs.Tab name='tab1' title='Tab 1'>
					Tab 1
				</SegmentedTabs.Tab>
				<SegmentedTabs.Tab name='tab2' title='Tab 2'>
					Tab 2
				</SegmentedTabs.Tab>
				<SegmentedTabs.Tab name='tab3' title='Tab 8'>
					Tab 3
				</SegmentedTabs.Tab>
			</SegmentedTabs>
		</main>
	);
}
