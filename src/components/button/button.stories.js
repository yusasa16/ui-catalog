import { createButton } from './button';

export default {
	title: 'Components/Button',
	tags: ['autodocs'],
	render: ({ label, ...args }) => {
		// You can either return a string or a DOM node
		return createButton({ label, ...args });
	},
	argTypes: {
		backgroundColor: { control: 'color' },
		label: { control: 'text' },
		onClick: { action: 'onClick' },
		primary: { control: 'boolean' },
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
		},
	},
};

export const Primary = {
	args: {
		primary: true,
		label: 'Button',
	},
};

export const Secondary = {
	args: {
		label: 'Button',
	},
};

export const Large = {
	args: {
		size: 'large',
		label: 'Button',
	},
};

export const Small = {
	args: {
		size: 'small',
		label: 'Button',
	},
};
