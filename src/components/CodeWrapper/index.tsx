import { Button } from 'exports';
import * as React from 'react';
import { copyToClipboard } from 'utils/copyToClipboard';

import styles from './styles.module.css';

export function CodeWrapper({ children } : { children: any; }){
	function handleCopy(){
		void copyToClipboard(children)
	}

	return (
        <div className={styles.code_container}>
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