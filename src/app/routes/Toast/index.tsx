import React from 'react';

import { Button, toast } from '../../../exports';
import { StickyHeader } from '../../common/StickyHeader';

export function ToastPage() {
	return (
		<main>
			<StickyHeader heading='Toast' />

			<div className='flex flex-col align-items-start'>
				<Button
					className='my-1'
					themeType='primary'
					outline
					onClick={() => {
						toast('I am a toast (top)', { placement: 'top' });
					}}
				>
					Toast Top
				</Button>
				<Button
					className='my-1'
					themeType='secondary'
					outline
					onClick={() => {
						toast('I am a toast (bottom)', { placement: 'bottom' });
					}}
				>
					Toast Bottom
				</Button>
				<Button
					className='my-1'
					themeType='tertiary'
					outline
					onClick={() => {
						toast('I am a toast (top-left)', { placement: 'top-left' });
					}}
				>
					Toast Top left
				</Button>
				<Button
					className='my-1'
					themeType='success'
					outline
					onClick={() => {
						toast('I am a toast (top-right)', { placement: 'top-right' });
					}}
				>
					Toast Top right
				</Button>
				<Button
					className='my-1'
					themeType='warn'
					outline
					onClick={() => {
						toast('I am a toast (bottom-left)', { placement: 'bottom-left' });
					}}
				>
					Toast Bottom left
				</Button>
				<Button
					className='my-1'
					themeType='danger'
					outline
					onClick={() => {
						toast('I am a toast (bottom-right)', { placement: 'bottom-right' });
					}}
				>
					Toast Bottom right
				</Button>
			</div>
		</main>
	);
}
