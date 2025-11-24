/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
	plugins: ['stylelint-order'],
	rules: {
		// コンポーネントトークンの命名(--_*)を許可
		'custom-property-pattern': '^(_)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$',

		// クラス名の命名規則 (BEMを許可)
		// default: kebab-case -> BEM pattern (block__element--modifier)
		'selector-class-pattern': '^[a-z][a-z0-9\\-]+(__[a-z0-9\\-]+)?(--[a-z0-9\\-]+)?$',

		// 詳細度の上限管理 (0,1,0)
		// クラスセレクタ1つまでを基本とし、IDセレクタや要素セレクタによる加算を防ぐ
		// 状態管理(:hover等)や擬似要素は例外としてカウントしない
		'selector-max-specificity': [
			'0,1,0',
			{
				ignoreSelectors: [
					':hover',
					':focus',
					':active',
					':visited',
					':focus-visible',
					':focus-within',
					'::before',
					'::after',
					// 属性セレクタによる状態管理も許容する場合（例: [data-state="open"]）
					// 必要に応じて追加
				],
			},
		],

		// 宣言順序の設定（CSS変数を先頭に、その後Recess Orderを適用）
		// 'order/properties-order': [
		// 	{
		// 		pattern: '^--',
		// 		groupName: 'custom-properties',
		// 	},
		// 	{
		// 		// 未指定のプロパティを最後に配置（stylelint-config-recess-orderが適用される）
		// 		unspecified: 'bottom',
		// 	},
		// ],

		// プロパティではなく「宣言」のタイプ順序
		'order/order': [
			'custom-properties', // CSS変数を最初に
			'declarations', // 通常のプロパティ
		],
	},
};
