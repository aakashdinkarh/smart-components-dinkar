import React from 'react'

import { Button, toast } from '../../../exports'

export default function ToastPage() {
	return (
		<div>
			<Button outline type='button' themeType='tertiary' onClick={() => { toast(`I'm a toast`); }} >Toast</Button>
		</div>
	)
}
