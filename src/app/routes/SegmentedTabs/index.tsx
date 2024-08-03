import * as React from 'react';

import { LazyImageWithLoader, SegmentedTabs } from '../../../exports';
import { AppCodeWrapper } from '../../common/AppCodeWrapper';
import { StickyHeader } from '../../common/StickyHeader';
import { IMAGE_PREFIX, codeHighlightClassHTML } from '../../constants';
import { useHighlightCode } from '../../hooks/useHighlightCode';
import { HelmetComponent } from '../HelmetComponent';

import usageData from './usage.json';

interface usageDataItem {
	id: number;
	title: string;
	content: {
		title: string;
		image: string;
		description: string;
	};
}

export function SegmentedTabsPage() {
	const { isCodeHighlighted } = useHighlightCode();

	return (
		<main>
			<HelmetComponent />

			<StickyHeader heading='Segmented Tabs' withThemeSelector />

			<h3>Demon Slayer: Kimetsu no Yaiba</h3>
			<p>
				Demon Slayer: Kimetsu no Yaiba ("Blade of Demon Destruction") is a Japanese manga series written and
				illustrated by Koyoharu Gotouge.
			</p>

			<SegmentedTabs>
				{(usageData as usageDataItem[]).map((data) => {
					const { id, title, content } = data;
					return (
						<SegmentedTabs.Tab key={id} name={`${id}`} title={title}>
							<div className='desktop-flex mt-2'>
								<LazyImageWithLoader
									imgHeight={220}
									imgWidth={150}
									imgSrc={`${IMAGE_PREFIX}${content.image}`}
									imgContainerClass='overflow-hidden br-1 mr-2'
								/>
								<div>
									<h4 className='mt-0 mb-1'>{content.title}</h4>
									<p className='mt-2'>{content.description}</p>
								</div>
							</div>
						</SegmentedTabs.Tab>
					);
				})}
			</SegmentedTabs>

			<div className='mt-2'>
				<AppCodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClassHTML}>
					{`interface usageDataItem {
	id: number;
	title: string;
	content: {
		title: string;
		image: string;
		description: string;
	};
}

<SegmentedTabs>
	{(usageData as usageDataItem[]).map((data) => {
		const { id, title, content } = data;
		return (
			<SegmentedTabs.Tab key={id} name={id} title={title}>
				<div className='flex mt-2'>
					<LazyImageWithLoader
						imgHeight={220}
						imgWidth={150}
						imgSrc={content.image}
						imgContainerClass='overflow-hidden br-1 mr-2'
					/>
					<div>
						<h4 className='mt-0 mb-1'>{content.title}</h4>
						<p className='mt-2'>{content.description}</p>
					</div>
				</div>
			</SegmentedTabs.Tab>
		);
	})}
</SegmentedTabs>`}
				</AppCodeWrapper>
			</div>
		</main>
	);
}
