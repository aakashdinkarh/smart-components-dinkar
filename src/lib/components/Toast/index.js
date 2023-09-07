import { getClass } from '../../utils/getCombinedClass';

import styles from './styles.module.css';


const uniqueId = 'e47a13d6-4bd5-11ee-be56-0242ac120002';

function toast(message = '', options = {}) {
	const {
		closeAfter = 5,
		placement = 'top',
		toastContainer: { toastContainerClass = '' } = {},
		timerStrip: { showTimerStrip = true, timerStripClass = '' } = {},
		toastDiv: { toastDivClass } = {},
		closeButton: { showCloseIcon = true, closeButtonClass = '' } = {},
	} = options;

	let toastContainer = document.querySelector(`#${uniqueId}`);

	if (!toastContainer) {
		toastContainer = document.createElement('div');
		toastContainer.className = getClass(styles.toast_container, styles[placement], toastContainerClass);
		toastContainer.id = uniqueId;
	}

	const timerStrip = showTimerStrip 
		? ` <span class="${
			getClass(styles.timer_strip, timerStripClass)
		}" style="animation-duration: ${closeAfter}s" ></span>` 
		: '';

	const closeButton = showCloseIcon 
		? ` <button class="${getClass(styles.close_icon, closeButtonClass)}">x</button>` 
		: '';

	const toastDiv = document.createElement('div');
	toastDiv.className = getClass(styles.toast, styles[placement], toastDivClass);
	toastDiv.innerHTML = `${message}${timerStrip}${closeButton}`;

	const timeoutId = setTimeout(() => {
		toastDiv.remove();

		const container = document.querySelector(`#${uniqueId}`);
		if (container && container.children.length === 0) {
			container.remove();
		}
	}, closeAfter * 1000);

	toastDiv.querySelector('button')?.addEventListener('click', function () {
		clearTimeout(timeoutId);
		toastDiv.remove();

		const container = document.querySelector(`#${uniqueId}`);
		if (container && container.children.length === 0) {
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

function success(message, options = {}) {
	toast(message, {
		...options,
		toastDiv: {
			...(options.toastDiv || {}),
			toastDivClass: styles.success,
		}
	})
}

function error(message, options = {}) {
	toast(message, {
		...options,
		toastDiv: {
			...(options.toastDiv || {}),
			toastDivClass: styles.error,
		}
	})
}

function warn(message, options = {}) {
	toast(message, {
		...options,
		toastDiv: {
			...(options.toastDiv || {}),
			toastDivClass: styles.warn,
		}
	})
}

toast.success = success;
toast.error = error;
toast.warn = warn;

export { toast };