import { loadHljs } from './hljsLoader';

export async function highlightCode() {
	const hljs = await loadHljs();
	if (typeof hljs?.highlightAll === 'function') {
		(hljs.highlightAll as () => void)();
		return true;
	}

	return false;
}
