import './card.css';

export const createCard = ({ title, description, imageUrl, actionText, onActionClick }) => {
	const card = document.createElement('div');
	card.className = 'card';

	if (imageUrl) {
		const img = document.createElement('img');
		img.src = imageUrl;
		img.alt = title;
		img.className = 'card__image';
		card.appendChild(img);
	}

	const content = document.createElement('div');
	content.className = 'card__content';

	const h3 = document.createElement('h3');
	h3.className = 'card__title';
	h3.innerText = title;
	content.appendChild(h3);

	const p = document.createElement('p');
	p.className = 'card__description';
	p.innerText = description;
	content.appendChild(p);

	if (actionText) {
		const a = document.createElement('a');
		a.href = '#';
		a.className = 'card__action';
		a.innerText = actionText;
		a.addEventListener('click', (e) => {
			e.preventDefault();
			if (onActionClick) onActionClick(e);
		});
		content.appendChild(a);
	}

	card.appendChild(content);

	return card;
};
