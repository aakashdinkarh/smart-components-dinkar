import * as React from 'react';

import { Button } from '../../exports';
import { copyToClipboard } from '../../utils/copyToClipboard';
import { getCombinedClass } from '../../utils/getCombinedClass';

import styles from './styles.module.css';

export function CodeWrapper({ children } : { children: any; }){
	function handleCopy(){
		void copyToClipboard(children)
	}

	return (
        <div className={getCombinedClass(styles.code_container, 'code_container')}>
            <Button 
                themeType='tertiary' 
                className={styles.copy_button} 
                onClick={handleCopy}
            >
                Copy
            </Button>
            <pre>
                <code>
                    {children}
                </code>
            </pre>
        </div>
	);
}