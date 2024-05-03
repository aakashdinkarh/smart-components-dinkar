import type { PropsWithChildren} from 'react';
import React, { memo } from 'react';

import { CopyIcon } from '../../icons';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { getCombinedClass } from '../../utils/getCombinedClass';

import styles from './styles.module.css';

/**
 * CodeWrapper component for displaying and highlighting code snippets.
 * @component
 * @param {object} props - The props for the CodeWrapper component.
 * @param {React.ReactNode} props.children - The content to be displayed within the code wrapper.
 * @param {boolean} props.isCodeHighlighted - Indicates whether code highlighting should be applied.
 * @param {string} [props.languageClass=''] - Additional CSS class to apply to the code wrapper 
	based on the programming language.
 * @returns {JSX.Element} The rendered CodeWrapper component.
 */
export const CodeWrapper = memo(function CodeWrapper({
	children,
	isCodeHighlighted,
	languageClass = '',
}: PropsWithChildren & {
	isCodeHighlighted: boolean;
	languageClass?: string;
}) {
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
