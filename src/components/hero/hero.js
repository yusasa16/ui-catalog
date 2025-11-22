import './hero.css';
import { createButton } from '../button/button';

export const createHero = ({
	title,
	subtitle,
	primaryActionLabel,
	secondaryActionLabel,
	onPrimaryClick,
	onSecondaryClick,
}) => {
	const hero = document.createElement('div');
	hero.className = 'hero';

	const content = document.createElement('div');
	content.className = 'hero__content';

	const h1 = document.createElement('h1');
	h1.className = 'hero__title';
	h1.innerText = title;
	content.appendChild(h1);

	const p = document.createElement('p');
	p.className = 'hero__subtitle';
	p.innerText = subtitle;
	content.appendChild(p);

	const actions = document.createElement('div');
	actions.className = 'hero__actions';

	if (primaryActionLabel) {
		const primaryBtn = createButton({
			primary: true,
			size: 'large',
			label: primaryActionLabel,
			onClick: onPrimaryClick,
		});
		actions.appendChild(primaryBtn);
	}

	if (secondaryActionLabel) {
		const secondaryBtn = createButton({
			size: 'large',
			label: secondaryActionLabel,
			onClick: onSecondaryClick,
		});
		actions.appendChild(secondaryBtn);
	}

	content.appendChild(actions);
	hero.appendChild(content);

	return hero;
};
