import type { PropsWithChildren} from 'react';
import React, { memo } from 'react';

import { CopyIcon } from '../../exports';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { getCombinedClass } from '../../utils/getCombinedClass';

import styles from './styles.module.css';

interface CodeWrapperProps extends PropsWithChildren {
	isCodeHighlighted: boolean;
	languageClass?: string;
}

/**
 * CodeWrapper component for displaying and highlighting code snippets.
 * @component
 * @param {CodeWrapperProps} props - The props for the CodeWrapper component.
 * @param {boolean} props.isCodeHighlighted - Indicates whether code is highlighted with hljs or not.
 * @param {string} [props.languageClass=''] - Additional CSS class to apply to the code wrapper 
	based on the programming language.
 * @returns {JSX.Element} The rendered CodeWrapper component.
 * @example
 * //usage example
	<CodeWrapper
		isCodeHighlighted={Boolean(isCodeHighlighted)}
		languageClass="language-html"
	>
		{`<Loader variant="dots-bounce" />`}
	</CodeWrapper>
 */
export const CodeWrapper = memo(function CodeWrapper({
	children,
	isCodeHighlighted,
	languageClass = '',
}: CodeWrapperProps) {
	function handleCopy() {
		void copyToClipboard(children as string);
	}

	return (
		<div
			className={getCombinedClass(styles['code-container'], '__scd_code-container', {
				[styles['code-highlighted']]: isCodeHighlighted,
			})}
		>
			<CopyIcon width={20} height={20} onClick={handleCopy} className={styles['copy-button']} />
			<pre
				className={getCombinedClass({
					hljs: isCodeHighlighted,
				})}
				style={{ paddingRight: 28 }}
			>
				<code className={languageClass}>{children}</code>
			</pre>
		</div>
	);
})
