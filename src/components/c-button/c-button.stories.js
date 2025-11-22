import './c-button.css';
import buttonHtml from './c-button.html?raw';

export default {
	title: 'Components/Button',
};

export const Primary = {
	render: () => buttonHtml,
};

export const Secondary = {
	render: () => {
		// Simple string replacement for variant
		return buttonHtml.replace('--variant: primary', '--variant: secondary');
	},
};

export const Large = {
	render: () => {
		return buttonHtml.replace('--size: medium', '--size: large');
	},
};

export const Small = {
	render: () => {
		return buttonHtml.replace('--size: medium', '--size: small');
	},
};
