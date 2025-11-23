# Project Philosophy: The "Handwriting" Catalog

## Purpose

The primary goal of this repository is to serve as a **canonical reference (or "handwriting sample")** for AI agents. By maintaining a collection of vanilla HTML/CSS/JS components that reflect my specific coding preferences, I aim to:

1.  **Eliminate "Cold Start" Friction**: Provide AI with a clear target to mimic, reducing the need for detailed prompting on style and structure.
2.  **Preserve Craftsmanship**: Ensure that automated code generation adheres to high standards of semantic HTML, accessible CSS, and clean JavaScript.
3.  **Future-Proofing**: Create a dataset that can be used to fine-tune models or serve as few-shot examples for future web development tasks.

## Core Principles

### 1. Vanilla First

- **No Frameworks**: We use standard HTML, CSS, and JavaScript. This ensures longevity and portability.
- **Browser Native**: Leverage modern browser features (ES Modules, CSS Variables, Grid/Flexbox) instead of build tool polyfills where possible.

### 2. Core Architectural Philosophy: "CSS as an API"

We aim to solve the "Cascade Wars" and "Specificity Hell" by shifting from **Imperative Overrides** to **Reactive/API-driven Styling**.

#### The Problem

In traditional CSS, parents often forcibly override children's styles (e.g., `.card .button { background: red !important; }`). This leads to:

- **Fragility**: Changing the child's internal structure breaks the parent's override.
- **Specificity Wars**: Using `!important` or deep nesting to win style battles.
- **Unpredictability**: "Spooky action at a distance" where styles leak or conflict unexpectedly.

#### The Solution: Context-Aware Components

Instead of overriding styles, we pass **Parameters (CSS Variables)**.

- **API-Driven**: The component defines its public API (variables like `--variant`).
- **Reactive**: The component listens to these variables (via `@container style(...)`) and decides _how_ to render itself.
- **Encapsulation**: The parent doesn't know _how_ the button becomes red; it just requests the "danger" context.

> **"Don't tell the component what to look like. Tell it what context it's in."**

### 3. Layout Philosophy: "Grid-First & Margin-Free"

We separate **Layout** (geometry/spacing) from **Components** (look-and-feel).

#### The "No Margin" Rule

Components (`c-`) must **never** have external margins.

- **Why**: Margins make components context-dependent. A button with `margin-right: 20px` looks wrong when placed at the end of a row or in a sidebar.
- **Rule**: "Components own their pixels (padding/border), Layouts own the whitespace (gap/grid)."

#### The "Grid-First" Approach

Layouts (`l-`) use CSS Grid to define structure and spacing.

- **Gap over Margin**: Use `gap` for uniform spacing.
- **Tracks as Spacing**: Use `grid-template-columns/rows` to define specific whitespace (e.g., `1fr 20px 100px`) instead of margins.
- **Explicit Areas**: Use `l-` containers to wrap `c-` components, ensuring components remain agnostic to their placement.

**Example:**

```html
<div class="l-grail">
	<div class="l-grail__header">
		<header class="c-header">...</header>
	</div>
	<div class="l-grail__main">
		<main class="c-main">...</main>
	</div>
	<div class="l-grail__side">
		<aside class="c-side">...</aside>
	</div>
	<div class="l-grail__footer">
		<footer class="c-footer">...</footer>
	</div>
</div>
```

```css
.l-grail {
	display: grid;
	grid-template-columns: 1fr 40px 300px;
	grid-template-rows: auto 60px 1fr 80px auto;
	grid-template-areas:
		'header header header'
		'.      .      .'
		'main   .      side'
		'.      .      .'
		'footer footer footer';
}

.l-grail__header {
	grid-area: header;
}
.l-grail__main {
	grid-area: main;
}
.l-grail__side {
	grid-area: side;
}
.l-grail__footer {
	grid-area: footer;
}
```

#### Exceptions: When to use Margin

While we avoid margins on _Components_, `margin` is essential in specific contexts.

1.  **Flow Content (Typography & Articles)** [CRITICAL]
    - **Context**: Inside long-form text (e.g., blog posts, documentation) where elements stack naturally.
    - **Usage**: Use `margin-bottom` or `margin-top` to establish vertical rhythm between headings, paragraphs, and lists.
    - **Why**: Wrapping every paragraph in a Grid/Flex container just to use `gap` is excessive and semantically noisy.

2.  **Auto Alignment**
    - **Usage**: `margin-left: auto` inside a Flex container to push an element to the far side.
    - **Why**: This is a powerful layout tool that `gap` cannot replicate.

3.  **Optical Adjustments**
    - **Usage**: Negative margins or micro-adjustments to align visual weight (e.g., hanging punctuation).

### 4. Component Architecture & Naming

#### Naming Conventions

- **No Abbreviations**: Use full words for clarity.
  - _Good_: `button`, `navigation`, `card`
  - _Bad_: `btn`, `nav`, `cd`
- **Prefixes**:
  - **`c-` (Component)**: UI parts (e.g., `c-button`, `c-card`).
  - **`l-` (Layout)**: Structural containers that arrange components (e.g., `l-grid`, `l-container`).
    - Layouts never have styles for look-and-feel (colors, shadows), only geometry (grid, flex, spacing).
    - Layouts must contain `c-` components.

#### Modifiers & State

- **Contextual Styling (Style Queries)**: Use CSS Container Queries (`@container style(...)`) to control variations.
  - **Concept**: Components adapt based on CSS variables inherited from their context (parent) or set on themselves.
  - **Implementation**:
    1.  Define a custom property (e.g., `--variant`) on the component or its parent.
    2.  Use `@container style(--variant: value)` to apply specific styles.
  - **Benefits**: Decouples style from specific classes, allowing for "Contextual Styling" (e.g., a button inside a dark card automatically becoming light).

**Example:**

```html
<!-- HTML -->
<button class="c-button" style="--variant: primary">Button</button>
```

```css
/* CSS */
.c-button {
	/* Default styles */
	background: #eee;
	color: #333;
}

/* Apply styles when --variant: primary is inherited or set */
@container style(--variant: primary) {
	.c-button {
		background: blue;
		color: white;
	}
}
```

### 5. Interaction Philosophy: "Native Over Script"

We strive to implement UI interactions without JavaScript whenever possible, relying on the advancing capabilities of modern HTML and CSS.

- **Zero-JS Default**: Before reaching for an event listener, ask: "Can this be done with HTML/CSS?"
- **Modern Primitives**: Use `<details>` for accordions, `<dialog>` for modals, `:popover` for overlays, and scroll-driven animations.
- **CSS State**: Leverage `:checked`, `:target`, and `:focus-within` to handle UI states.
- **Role of JS**: JavaScript is reserved strictly for business logic, API calls, and complex state that HTML cannot handle.

### 6. AI-Readability Strategies

To maximize the utility of this repo for AI training, we adhere to the following:

- **Explicit Props Mapping**: Storybook `args` must map directly to HTML attributes or CSS classes. This teaches the AI the cause-and-effect relationship between a requirement (e.g., "primary button") and the implementation (`.btn--primary`).
- **Variations & States**: Do not just build the "happy path". Explicitly implement and document states like `disabled`, `loading`, `empty`, and `error`.
- **Contextual Comments**: Use comments to explain _why_, not just _what_.
  - _Good_: `/* z-index: 10; Ensure header stays above hero content */`
  - _Bad_: `/* z-index: 10; */`

### 7. Coding Style Guide

#### Typography & Units

- **Font Size**: Use `rem` or `em` by default.
- **Component Root**: Always reset the reference font size with `font-size: 1rem;`.
- **Text Properties**: Use `em` or unitless values for `line-height` and `letter-spacing`.
- **Spacing (Padding/Margin/Gap)**: Use `px`.
  - _Rationale_: Using `rem`/`em` for inline spacing can cause excessive width expansion when the root font size increases, potentially breaking layouts even if the browser width hasn't changed. `px` provides more predictable spacing in these contexts.

#### CSS Variables (Custom Properties)

- **Naming Convention**: `--_{component}-{property}-{type}`
  - Component-scoped variables **must** start with `--_` (double dash + underscore) to distinguish them from global variables and indicate they are "private" or "scoped" to the component context.
- **Design System Integration**:
  - Define component variables at the component root.
  - These variables should reference global variables defined in `:root`.
  - _Goal_: Allow theming and overrides directly via the HTML `style` attribute.

**Example:**

```css
:root {
	--color-primary-500: #3b82f6;
}

.card {
	/* Define component variable referencing global variable */
	--_card-bg-color: var(--color-primary-500);

	font-size: 1rem; /* Reset reference */
	background-color: var(--_card-bg-color);
	padding: 16px; /* px for spacing */
}
```

## Roadmap for "High Accuracy"

To improve the "teaching" quality of this repo:

- [ ] **Expand Component Catalog**: Cover all common UI patterns (Forms, Modals, Navigation, Footers).
- [ ] **Document Anti-Patterns**: Create a section for "What NOT to do" to help AI avoid common mistakes.
- [ ] **Semantic HTML Showcase**: Create examples specifically focused on complex document structures (article, aside, section, dl/dt/dd).
