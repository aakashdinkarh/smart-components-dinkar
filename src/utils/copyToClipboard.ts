import { toast } from '../exports';

export async function copyToClipboard(text = ''){
	try {
		await window.navigator.clipboard.writeText(text);
		toast.success('Copied !', {
			closeAfter  : 2,
			closeButton : { showCloseIcon: false },
			timerStrip  : { showTimerStrip: false }
		});
		return true;
	} catch {
		toast.error('! Could not copy !', {
			closeAfter  : 2,
			closeButton : { showCloseIcon: false },
			timerStrip  : { showTimerStrip: false }
		})
		return false;
	}
}
