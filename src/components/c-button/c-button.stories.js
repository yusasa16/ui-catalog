/* global DOMParser */
import './c-button.css';
import buttonHtml from './c-button.html?raw';

/** デフォルト値（style属性に出力しない値） */
const defaults = {
	variant: 'primary',
	size: 'medium',
};

/** 選択肢の定義 */
const options = {
	fontFamily: [
		{ label: 'デフォルト（システム）', value: '' },
		{ label: 'system-ui', value: 'system-ui, sans-serif' },
		{ label: 'Georgia（セリフ）', value: 'Georgia, serif' },
		{ label: 'Menlo（等幅）', value: 'Menlo, monospace' },
	],
	fontWeight: [
		{ label: 'デフォルト', value: '' },
		{ label: '400（Normal）', value: '400' },
		{ label: '500（Medium）', value: '500' },
		{ label: '600（Semi Bold）', value: '600' },
		{ label: '700（Bold）', value: '700' },
		{ label: '800（Extra Bold）', value: '800' },
	],
	shadow: [
		{ label: 'デフォルト', value: '' },
		{ label: 'なし', value: 'none' },
		{ label: '小', value: '0 1px 2px rgba(0,0,0,0.1)' },
		{ label: '中', value: '0 4px 6px rgba(0,0,0,0.1)' },
		{ label: '大', value: '0 10px 15px rgba(0,0,0,0.1)' },
	],
	transition: [
		{ label: 'デフォルト', value: '' },
		{ label: 'なし', value: 'none' },
		{ label: '高速（0.1s）', value: 'all 0.1s ease-in-out' },
		{ label: '標準（0.2s）', value: 'all 0.2s ease-in-out' },
		{ label: '遅め（0.3s）', value: 'all 0.3s ease-in-out' },
		{ label: 'バウンス', value: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
	],
	borderRadius: [
		{ label: 'デフォルト', value: '' },
		{ label: 'なし（0）', value: '0' },
		{ label: '小（0.25em）', value: '0.25em' },
		{ label: '中（0.5em）', value: '0.5em' },
		{ label: '大（1em）', value: '1em' },
		{ label: '丸（3em）', value: '3em' },
		{ label: '円形（50%）', value: '50%' },
	],
	hoverY: [
		{ label: 'デフォルト', value: '' },
		{ label: 'なし', value: '0' },
		{ label: '上に浮く（-2px）', value: '-2px' },
		{ label: '上に大きく浮く（-4px）', value: '-4px' },
		{ label: '下に沈む（2px）', value: '2px' },
	],
};

/**
 * HTMLテンプレートをパースし、argsに基づいてカスタムプロパティを動的に変更する
 * @param {Object} args - Storybookのargs
 * @returns {string} - 変更後のHTML文字列
 */
const createButton = (args) => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(buttonHtml, 'text/html');
	const button = doc.querySelector('.c-button');

	// コンテキスト変数（variant, size）- デフォルト値以外の場合のみ設定
	if (args.variant !== defaults.variant) {
		button.style.setProperty('--variant', args.variant);
	}
	if (args.size !== defaults.size) {
		button.style.setProperty('--size', args.size);
	}

	// パブリックAPI変数
	if (args.fontFamily) {
		button.style.setProperty('--c-button-font-family', args.fontFamily);
	}
	if (args.fontWeight) {
		button.style.setProperty('--c-button-font-weight', args.fontWeight);
	}
	if (args.color) {
		button.style.setProperty('--c-button-color', args.color);
	}
	if (args.bg) {
		button.style.setProperty('--c-button-bg', args.bg);
	}
	if (args.bgHover) {
		button.style.setProperty('--c-button-bg-hover', args.bgHover);
	}
	if (args.shadow) {
		button.style.setProperty('--c-button-shadow', args.shadow);
	}
	if (args.shadowHover) {
		button.style.setProperty('--c-button-shadow-hover', args.shadowHover);
	}
	if (args.transition) {
		button.style.setProperty('--c-button-transition', args.transition);
	}
	if (args.borderRadius) {
		button.style.setProperty('--c-button-border-radius', args.borderRadius);
	}
	if (args.hoverY) {
		button.style.setProperty('--c-button-transform-hover', `translateY(${args.hoverY})`);
	}

	// ボタンのラベルを変更
	button.textContent = args.label;

	return button.outerHTML;
};

export default {
	title: 'Components/Button',
	argTypes: {
		// === Content ===
		label: {
			control: 'text',
			description: 'ボタンのラベルテキスト',
			table: {
				category: 'Content',
				type: { summary: 'string' },
				defaultValue: { summary: 'Button' },
			},
		},

		// === Context Variables ===
		variant: {
			control: 'select',
			options: ['primary', 'secondary'],
			description: 'ボタンのスタイルバリアント',
			table: {
				category: 'Context',
				type: { summary: 'primary | secondary' },
				defaultValue: { summary: 'primary' },
			},
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'ボタンのサイズ',
			table: {
				category: 'Context',
				type: { summary: 'small | medium | large' },
				defaultValue: { summary: 'medium' },
			},
		},

		// === Public API: Typography ===
		fontFamily: {
			control: 'select',
			options: options.fontFamily.map((o) => o.value),
			mapping: Object.fromEntries(options.fontFamily.map((o) => [o.value, o.value])),
			labels: Object.fromEntries(options.fontFamily.map((o) => [o.value, o.label])),
			description: 'フォントファミリー',
			table: {
				category: 'API: Typography',
				type: { summary: 'string' },
				defaultValue: { summary: 'var(--sys-font-body)' },
			},
		},
		fontWeight: {
			control: 'select',
			options: options.fontWeight.map((o) => o.value),
			mapping: Object.fromEntries(options.fontWeight.map((o) => [o.value, o.value])),
			labels: Object.fromEntries(options.fontWeight.map((o) => [o.value, o.label])),
			description: 'フォントウェイト',
			table: {
				category: 'API: Typography',
				type: { summary: 'number' },
				defaultValue: { summary: '600' },
			},
		},

		// === Public API: Colors ===
		color: {
			control: 'color',
			description: 'テキストカラー',
			table: {
				category: 'API: Colors',
				type: { summary: 'color' },
				defaultValue: { summary: 'var(--sys-text-inverse)' },
			},
		},
		bg: {
			control: 'color',
			description: '背景色',
			table: {
				category: 'API: Colors',
				type: { summary: 'color' },
				defaultValue: { summary: 'var(--sys-bg-action)' },
			},
		},
		bgHover: {
			control: 'color',
			description: 'ホバー時の背景色',
			table: {
				category: 'API: Colors',
				type: { summary: 'color' },
				defaultValue: { summary: 'var(--sys-bg-action-hover)' },
			},
		},

		// === Public API: Effects ===
		shadow: {
			control: 'select',
			options: options.shadow.map((o) => o.value),
			mapping: Object.fromEntries(options.shadow.map((o) => [o.value, o.value])),
			labels: Object.fromEntries(options.shadow.map((o) => [o.value, o.label])),
			description: 'ボックスシャドウ',
			table: {
				category: 'API: Effects',
				type: { summary: 'string' },
				defaultValue: { summary: 'var(--sys-elevation-base)' },
			},
		},
		shadowHover: {
			control: 'select',
			options: options.shadow.map((o) => o.value),
			mapping: Object.fromEntries(options.shadow.map((o) => [o.value, o.value])),
			labels: Object.fromEntries(options.shadow.map((o) => [o.value, o.label])),
			description: 'ホバー時のシャドウ',
			table: {
				category: 'API: Effects',
				type: { summary: 'string' },
				defaultValue: { summary: 'var(--sys-elevation-md)' },
			},
		},
		borderRadius: {
			control: 'select',
			options: options.borderRadius.map((o) => o.value),
			mapping: Object.fromEntries(options.borderRadius.map((o) => [o.value, o.value])),
			labels: Object.fromEntries(options.borderRadius.map((o) => [o.value, o.label])),
			description: 'ボーダーの角丸',
			table: {
				category: 'API: Effects',
				type: { summary: 'string' },
				defaultValue: { summary: '3em' },
			},
		},
		transition: {
			control: 'select',
			options: options.transition.map((o) => o.value),
			mapping: Object.fromEntries(options.transition.map((o) => [o.value, o.value])),
			labels: Object.fromEntries(options.transition.map((o) => [o.value, o.label])),
			description: 'トランジション',
			table: {
				category: 'API: Effects',
				type: { summary: 'string' },
				defaultValue: { summary: 'all 0.2s ease-in-out' },
			},
		},
		hoverY: {
			control: 'select',
			options: options.hoverY.map((o) => o.value),
			mapping: Object.fromEntries(options.hoverY.map((o) => [o.value, o.value])),
			labels: Object.fromEntries(options.hoverY.map((o) => [o.value, o.label])),
			description: 'ホバー時のY方向移動量',
			table: {
				category: 'API: Effects',
				type: { summary: 'string' },
				defaultValue: { summary: '-2px' },
			},
		},
	},
	args: {
		label: 'Button',
		variant: 'primary',
		size: 'medium',
	},
};

export const Default = {
	render: (args) => createButton(args),
};

export const Primary = {
	args: {
		variant: 'primary',
	},
	render: (args) => createButton(args),
};

export const Secondary = {
	args: {
		variant: 'secondary',
	},
	render: (args) => createButton(args),
};

export const Small = {
	args: {
		size: 'small',
	},
	render: (args) => createButton(args),
};

export const Medium = {
	args: {
		size: 'medium',
	},
	render: (args) => createButton(args),
};

export const Large = {
	args: {
		size: 'large',
	},
	render: (args) => createButton(args),
};

export const CustomColors = {
	args: {
		bg: '#e91e63',
		bgHover: '#c2185b',
		color: '#ffffff',
	},
	render: (args) => createButton(args),
};
