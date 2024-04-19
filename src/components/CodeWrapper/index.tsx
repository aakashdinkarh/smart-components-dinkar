import type { PropsWithChildren} from 'react';
import React, { memo } from 'react';

import { CopyIcon } from '../../icons';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { getCombinedClass } from '../../utils/getCombinedClass';

import styles from './styles.module.css';

function CodeWrapper({
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
			className={getCombinedClass(styles['code-container'], 'code-container', {
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
}

const memoizedCodeWrapper = memo(CodeWrapper);

export { memoizedCodeWrapper as CodeWrapper };
