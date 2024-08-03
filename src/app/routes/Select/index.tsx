import * as React from 'react';

import { Select } from '../../../exports';
import { AppCodeWrapper } from '../../common/AppCodeWrapper';
import { StickyHeader } from '../../common/StickyHeader';
import { codeHighlightClassHTML } from '../../constants';
import { useHighlightCode } from '../../hooks/useHighlightCode';
import { HelmetComponent } from '../HelmetComponent';

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
			<HelmetComponent />

			<StickyHeader heading='Select' withThemeSelector />

			{(usageData as usageDataItem[]).map((data) => {
				const { id, title, label, ...restSelectParams } = data;

				let usageDataString = '<Select\n\t';
				usageDataString += 'placeholder="'+ restSelectParams.placeholder +'"\n\t';
				usageDataString += 'options={'+ JSON.stringify(restSelectParams.options, null, 4) +'}\n\t';
				if(restSelectParams.isClearable !== undefined) {
					usageDataString += 'isClearable={'+ restSelectParams.isClearable +'}\n';
				}
				if(restSelectParams.multiple !== undefined) {
					usageDataString += 'multiple={'+ restSelectParams.multiple +'}\n';
				}
				usageDataString += '/>';

				return (
					<React.Fragment key={id}>
						<h4 className='my-1'>{title}</h4>
						<div className='flex align-items-center mb-2' >
							<p className='mr-1 my-1'>{label}</p>
							<Select {...restSelectParams} />
						</div>

						<div className='mb-4'>
							<AppCodeWrapper 
								isCodeHighlighted={Boolean(isCodeHighlighted)}
								languageClass={codeHighlightClassHTML}
							>
								{usageDataString}
							</AppCodeWrapper>
						</div>
					</React.Fragment>
				)
			})}
			</main>
	);
}
