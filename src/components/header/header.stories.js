import { createHeader } from './header';

export default {
	title: 'Components/Header',
	tags: ['autodocs'],
	render: (args) => createHeader(args),
	argTypes: {
		onLogin: { action: 'onLogin' },
		onLogout: { action: 'onLogout' },
		onCreateAccount: { action: 'onCreateAccount' },
	},
};

export const LoggedIn = {
	args: {
		user: {
			name: 'Jane Doe',
		},
	},
};

export const LoggedOut = {};
