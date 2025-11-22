import './l-grail.css';
import grailHtml from './l-grail.html?raw';

export default {
	title: 'Layouts/Grail',
	parameters: {
		layout: 'fullscreen',
	},
};

export const Default = {
	render: () => grailHtml,
};
