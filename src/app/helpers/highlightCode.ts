/* eslint-disable no-console */
import { loadHljs } from "./hljsLoader";

export async function highlightCode(){
	try {
		const hljs = await loadHljs();
		if(typeof hljs?.highlightAll === 'function'){
			(hljs.highlightAll as () => void)();
			return true;
		}

	} catch (err) {
		console.error(err);
	}
	return false;
}
