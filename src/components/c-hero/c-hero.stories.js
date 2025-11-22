import './c-hero.css';
import '../c-button/c-button.css';
import heroHtml from './c-hero.html?raw';

export default {
	title: 'Components/Hero',
	parameters: {
		layout: 'fullscreen',
	},
};

export const Default = {
	render: () => heroHtml,
};

export const Simple = {
	render: () => {
		// Remove subtitle and button for a simple version
		return heroHtml
			.replace(/<p class="c-hero__subtitle">[\s\S]*?<\/p>/, '')
			.replace(/<div class="c-button"[\s\S]*?<\/div>/, '');
	},
};
