import './c-header.css';
import '../c-button/c-button.css';
import headerHtml from './c-header.html?raw';

export default {
	title: 'Components/Header',
	parameters: {
		layout: 'fullscreen',
	},
};

export const Default = {
	render: () => headerHtml,
};

export const LoggedIn = {
	render: () => {
		// Example of changing content for logged in state
		return headerHtml
			.replace(
				'<div class="c-header__actions">',
				'<div class="c-header__actions"><span>Welcome, User!</span>'
			)
			.replace(
				/<div class="c-button"[\s\S]*?<\/div>\s*<div class="c-button"[\s\S]*?<\/div>/,
				'<div class="c-button" style="--variant: secondary; --size: small;"><button type="button">Log Out</button></div>'
			);
	},
};

export const LoggedOut = {};
