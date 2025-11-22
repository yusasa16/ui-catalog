import './l-grid.css';
import gridHtml from './l-grid.html?raw';

export default {
	title: 'Layouts/Grid',
};

export const AutoFit = {
	render: () => gridHtml,
};

export const FixedColumns = {
	render: () => {
		return gridHtml.replace('--min-item-width: 250px;', '--cols: 3;');
	},
};
