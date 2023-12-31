import React from 'react';

import { CopyIcon } from '../../icons';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { getCombinedClass } from '../../utils/getCombinedClass';

import styles from './styles.module.css';

export function CodeWrapper({ children } : { children: any; }){
	function handleCopy(){
		void copyToClipboard(children)
	}

	return (
        <div className={getCombinedClass(styles['code-container'], 'code-container')}>
            <CopyIcon width={20} height={20} onClick={handleCopy} className={styles['copy-button']} />
            <pre>
                <code>
                    {children}
                </code>
            </pre>
        </div>
	);
}
