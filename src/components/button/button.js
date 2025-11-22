import './button.css';

export const createButton = ({
	primary = false,
	size = 'medium',
	backgroundColor,
	label,
	onClick,
}) => {
	const btn = document.createElement('button');
	btn.type = 'button';
	btn.innerText = label;
	btn.addEventListener('click', onClick);

	const mode = primary ? 'btn--primary' : 'btn--secondary';
	btn.className = ['btn', `btn--${size}`, mode].join(' ');

	if (backgroundColor) {
		btn.style.backgroundColor = backgroundColor;
	}

	return btn;
};
