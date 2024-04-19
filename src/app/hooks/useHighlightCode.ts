import { useEffect, useState } from 'react';
import { highlightCode } from '../helpers/highlightCode';

export function useHighlightCode() {
	const [isCodeHighlighted, setIsCodeHighlighted] = useState<boolean | null>(null);

	useEffect(() => {
		highlightCode()
			.then((res) => {
				setIsCodeHighlighted(res);
			})
			.catch(() => {
				setIsCodeHighlighted(false);
			});
	}, []);

	return {
		isCodeHighlighted,
	};
}
