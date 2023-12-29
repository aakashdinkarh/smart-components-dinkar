import * as React from 'react';

import { CopyIcon } from '../../icons';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { getCombinedClass } from '../../utils/getCombinedClass';

import styles from './styles.module.css';

export function CodeWrapper({ children } : { children: any; }){
	function handleCopy(){
		void copyToClipboard(children)
	}

	return (
        <div className={getCombinedClass(styles.code_container, 'code_container')}>
            <CopyIcon width={20} height={20} onClick={handleCopy} className={styles.copy_button} />
            <pre>
                <code>
                    {children}
                </code>
            </pre>
        </div>
	);
}