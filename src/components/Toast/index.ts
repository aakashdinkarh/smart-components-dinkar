import { getCombinedClass } from '../../utils/getCombinedClass';

import styles from './styles.module.css';

interface OptionsProps {
	closeAfter: number;
	placement: string;
	toastContainer: {
		toastContainerClass?: string;
	};
	timerStrip: {
		showTimerStrip?: boolean;
		timerStripClass?: string;
	};
	toastDiv: {
		toastDivClass?: string;
	};
	closeButton: {
		showCloseIcon?: boolean;
		closeButtonClass?: string;
	};
}

const uniqueId = 'e47a13d6-4bd5-11ee-be56-0242ac120002';

function toast (message = '', options?: Partial<OptionsProps>): void {
	const {
		closeAfter = 5,
		placement = 'top',
		toastContainer: { toastContainerClass = '' } = {},
		timerStrip: { showTimerStrip = true, timerStripClass = '' } = {},
		toastDiv: { toastDivClass = '' } = {},
		closeButton: { showCloseIcon = true, closeButtonClass = '' } = {},
	} = options ?? {};

	let toastContainer: HTMLElement | null = document.querySelector(`#${uniqueId}`);

	if (toastContainer == null) {
		toastContainer = document.createElement('div');
		toastContainer.className = getCombinedClass(styles.toast_container, styles[placement], toastContainerClass);
		toastContainer.id = uniqueId;
	}

	const timerStrip: string = showTimerStrip
		? ` <span class="${
			getCombinedClass(styles.timer_strip, timerStripClass)
		}" style="animation-duration: ${closeAfter}s" ></span>`
		: '';

	const closeButton: string = showCloseIcon
		? ` <button class="${getCombinedClass(styles.close_icon, closeButtonClass)}">x</button>`
		: '';

	const toastDiv: HTMLDivElement = document.createElement('div');
	toastDiv.className = getCombinedClass(styles.toast, styles[placement], toastDivClass);
	toastDiv.innerHTML = `${message}${timerStrip}${closeButton}`;

	const timeoutId = setTimeout(() => {
		toastDiv.remove();

		const container = document.querySelector(`#${uniqueId}`);
		if (container != null && container.children.length === 0) {
			container.remove();
		}
	}, closeAfter * 1000);

	toastDiv.querySelector('button')?.addEventListener('click', function () {
		clearTimeout(timeoutId);
		toastDiv.remove();

		const container: HTMLElement | null = document.querySelector(`#${uniqueId}`);
		if (container != null && container.children.length === 0) {
			container.remove();
		}
	})

	if (['top', 'top_left', 'top_right'].includes(placement)) {
		toastContainer.append(toastDiv);
	} else if (['bottom', 'bottom_left', 'bottom_right'].includes(placement)) {
		toastContainer.prepend(toastDiv);
	}

	if (!document.body.contains(toastContainer)) {
		document.body.append(toastContainer);
	}
}

function success (message = '', options: Partial<OptionsProps> = {}): void {
	toast(message, {
		...options,
		toastDiv: {
			...(options.toastDiv ?? {}),
			toastDivClass: styles.success,
		}
	})
}

function error (message = '', options: Partial<OptionsProps> = {}): void {
	toast(message, {
		...options,
		toastDiv: {
			...(options.toastDiv ?? {}),
			toastDivClass: styles.error,
		}
	})
}

function warn (message = '', options: Partial<OptionsProps> = {}): void {
	toast(message, {
		...options,
		toastDiv: {
			...(options.toastDiv ?? {}),
			toastDivClass: styles.warn,
		}
	})
}

toast.success = success;
toast.error = error;
toast.warn = warn;

export { toast };
