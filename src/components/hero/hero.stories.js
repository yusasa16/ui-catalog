import { createHero } from './hero';

export default {
	title: 'Components/Hero',
	tags: ['autodocs'],
	render: (args) => createHero(args),
	argTypes: {
		title: { control: 'text' },
		subtitle: { control: 'text' },
		primaryActionLabel: { control: 'text' },
		secondaryActionLabel: { control: 'text' },
		onPrimaryClick: { action: 'onPrimaryClick' },
		onSecondaryClick: { action: 'onSecondaryClick' },
	},
};

export const Default = {
	args: {
		title: 'Build Your Dream Website',
		subtitle:
			'Create stunning, responsive websites with our easy-to-use components. No coding required for the future, but for now, enjoy these clean HTML/CSS blocks.',
		primaryActionLabel: 'Get Started',
		secondaryActionLabel: 'Learn More',
	},
};

export const Simple = {
	args: {
		title: 'Welcome to the Future',
		subtitle: 'AI-driven development is here.',
		primaryActionLabel: 'Join Waitlist',
	},
};
