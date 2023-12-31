import { getCombinedClass } from '../../utils/getCombinedClass';

import styles from './styles.module.css';
/**
 * Interface defining the possible options for the toast function.
 */
interface OptionsProps {
	/**
	 * The duration (in seconds) for which the toast will be visible before automatically closing.
	 */
	closeAfter: number;
	/**
	 * The placement of the toast on the screen. It can be one of the following values:
	 * - 'top'
	 * - 'left'
	 * - 'bottom'
	 * - 'right'
	 * - 'top-left'
	 * - 'top-right'
	 * - 'bottom-left'
	 * - 'bottom-right'
	 */
	placement: 'top' | 'left' | 'bottom' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
	toastContainer: {
		/**
		 * Additional CSS class for styling the toast container.
		 */
		toastContainerClass?: string;
	};
	timerStrip: {
		/**
		 * Whether to show the timer strip.
		 */
		showTimerStrip?: boolean;
		/**
		 * Additional CSS class for styling the timer strip.
		 */
		timerStripClass?: string;
	};
	toastDiv: {
		/**
		 * Additional CSS class for styling the toast div.
		 */
		toastDivClass?: string;
	};
	closeButton: {
		/**
		 * Whether to show the close icon.
		 */
		showCloseIcon?: boolean;
		/**
		 * Additional CSS class for styling the close button.
		 */
		closeButtonClass?: string;
	};
}

const uniqueId = 'e47a13d6-4bd5-11ee-be56-0242ac120002';
/**
 * Display a toast message with optional configuration options.
 * @param message - The message to be displayed in the toast.
 * @param options - Optional configuration options for the toast.
 */
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
		toastContainer.className = getCombinedClass(styles['toast-container'], styles[placement], toastContainerClass);
		toastContainer.id = uniqueId;
	}

	const timerStrip: string = showTimerStrip
		? ` <span class="${
			getCombinedClass(styles['timer-strip'], timerStripClass)
		}" style="animation-duration: ${closeAfter}s" ></span>`
		: '';

	const closeButton: string = showCloseIcon
		? ` <button class="${getCombinedClass(styles['close-icon'], closeButtonClass)}">x</button>`
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

	if (['top', 'top-left', 'top-right'].includes(placement)) {
		toastContainer.append(toastDiv);
	} else if (['bottom', 'bottom-left', 'bottom-right'].includes(placement)) {
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
