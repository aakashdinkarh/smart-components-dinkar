import React from 'react'

import { toast } from '../../exports'

export default function ToastPage() {
	return (
    <div>
        <button type='button' onClick={() => toast(`I'm a toast`)} >Toast</button>
    </div>
	)
}
