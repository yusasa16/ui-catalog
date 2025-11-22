import './c-card.css';
import cardHtml from './c-card.html?raw';

export default {
	title: 'Components/Card',
};

export const Default = {
	render: () => cardHtml,
};

export const NoImage = {
	render: () => {
		return cardHtml.replace(/<div class="c-card__image">[\s\S]*?<\/div>/, '');
	},
};
