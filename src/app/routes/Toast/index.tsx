import React, { useState, useEffect } from 'react';

import { Button, toast, CodeWrapper } from '../../../exports';
import { StickyHeader } from '../../common/StickyHeader';
import { highlightCode } from '../../helpers/highlightCode';

const codeHighlightClass = 'language-html';

export function ToastPage() {
	const [isCodeHighlighted, setIsCodeHighlighted] = useState<boolean | null>(null);

	useEffect(() => {
		highlightCode()
			.then((res) => { setIsCodeHighlighted(res); })
			.catch(() => { setIsCodeHighlighted(false); });
	}, []);

	return (
		<main>
			<StickyHeader heading='Toast' />
			<link rel='stylesheet' href={`/codeHighlighterThemes/github-dark-min.css`}></link>

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

			<StickyHeader heading='Basic Usage' />
			<div className='mb-4' >
				<CodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClass} >
					{`<button
	onClick={() => {
		toast(
			'I am a toast (top)',
			{ placement: 'top' }
		);
	}}
>
	Toast Top
</button>`}
				</CodeWrapper>
			</div>
			<div className='mb-4' >
				<CodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClass} >
					{`<button
	onClick={() => {
		toast(
			'I am a toast (bottom)',
			{ placement: 'bottom' }
		);
	}}
>
	Toast Bottom
</button>`}
				</CodeWrapper>
			</div>
			<div className='mb-4' >
				<CodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClass} >
					{`<button
	onClick={() => {
		toast(
			'I am a toast (top-left)',
			{ placement: 'top-left' }
		);
	}}
>
	Toast Top left
</button>`}
				</CodeWrapper>
			</div>
			<div className='mb-4' >
				<CodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClass} >
					{`<button
	onClick={() => {
		toast(
			'I am a toast (top-right)',
			{ placement: 'top-right' }
		);
	}}
>
	Toast Top right
</button>`}
				</CodeWrapper>
			</div>
			<div className='mb-4' >
				<CodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClass} >
					{`<button
	onClick={() => {
		toast(
			'I am a toast (bottom-left)',
			{ placement: 'bottom-left' }
		);
	}}
>
	Toast Bottom left
</button>`}
				</CodeWrapper>
			</div>
			<div className='mb-4' >
				<CodeWrapper isCodeHighlighted={Boolean(isCodeHighlighted)} languageClass={codeHighlightClass} >
					{`<button
	onClick={() => {
		toast(
			'I am a toast (bottom-right)',
			{ placement: 'bottom-right' }
		);
	}}
>
	Toast Bottom right
</button>`}
				</CodeWrapper>
			</div>
		</main>
	);
}
