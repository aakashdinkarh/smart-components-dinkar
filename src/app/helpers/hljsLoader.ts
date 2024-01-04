declare global {
	interface Window {
		hljs?: Record<string, any>;
	}
}

function getHljs() {
	return window.hljs;
}

export async function loadHljs() : Promise<Record<string, any> | undefined> {
	return new Promise(function(resolve, reject) {
		const hljs = getHljs();

		if(hljs) {
			resolve(hljs);
			return
		}

		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
		script.onload = () => {
			const hljsFound = getHljs();
			resolve(hljsFound);
		}

		script.onerror = () => {
			reject(new Error('Failed to load highlight.js'));
			script.remove();
		}
		document.body.appendChild(script);
	})
}
