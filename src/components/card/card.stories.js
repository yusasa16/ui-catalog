import { createCard } from './card';

export default {
	title: 'Components/Card',
	tags: ['autodocs'],
	render: (args) => createCard(args),
	argTypes: {
		title: { control: 'text' },
		description: { control: 'text' },
		imageUrl: { control: 'text' },
		actionText: { control: 'text' },
		onActionClick: { action: 'onActionClick' },
	},
};

export const Default = {
	args: {
		title: 'Beautiful Landscapes',
		description:
			'Explore the hidden gems of nature with our guided tours. Experience serenity like never before.',
		imageUrl:
			'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
		actionText: 'Learn More',
	},
};

export const NoImage = {
	args: {
		title: 'Simple Card',
		description: 'This is a card without an image, just focusing on the content and action.',
		imageUrl: '', // Logic in JS handles empty image? Wait, my JS appends img always. I should fix that.
		actionText: 'Read',
	},
};
