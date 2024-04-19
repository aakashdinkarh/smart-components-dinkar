import * as React from 'react';

import { Select, CodeWrapper } from '../../../exports';
import { StickyHeader } from '../../common/StickyHeader';
import { codeHighlightClassHTML } from '../../constants';
import { useHighlightCode } from '../../hooks/useHighlightCode';

import usageData from './usage.json'

interface usageDataItem {
	id: number;
	title: string;
	label: string;
	placeholder: string;
	options: {
		label: string;
		value: string;
	}[];
	isClearable?: boolean;
	multiple?:boolean;
}

export function SelectPage() {
	const { isCodeHighlighted } = useHighlightCode();

	return (
		<main>
			<StickyHeader heading='Select' withThemeSelector />

			{(usageData as usageDataItem[]).map((data) => {
				const { id, title, label, ...restSelectParams } = data;

				return (
					<React.Fragment key={id}>
						<h4 className='my-1'>{title}</h4>
						<div className='flex align-items-center mb-2' >
							<p className='mr-1 my-1'>{label}</p>
							<Select {...restSelectParams} />
						</div>

						<div className='mb-4'>
							<CodeWrapper 
								isCodeHighlighted={Boolean(isCodeHighlighted)}
								languageClass={codeHighlightClassHTML}
							>
								{`<Select ${JSON.stringify(restSelectParams, null, 4).slice(1).slice(0,-1)} />`}
							</CodeWrapper>
						</div>
					</React.Fragment>
				)
			})}

			</main>
	);
}
