import * as React from 'react'

import { Select } from '../../exports';

function SelectPage() {
	return (
		<Select
			options={[
				{label: 'Option 1', value: 'option1'},
				{label: 'Option 2', value: 'option2'},
				{label: 'Option 3', value: 'option3'},
				{label: 'Option 4', value: 'option4'},
				{label: 'Option 5', value: 'option5'},
				{label: 'Option 6', value: 'option6'},
			]}
			multiple
		/>
	)
}

export default SelectPage;