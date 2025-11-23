# Design Tokens Philosophy

This document outlines the architectural decisions and taxonomy for Design Tokens in this project.
Our goal is to establish a shared vocabulary that bridges Design and Engineering, ensuring consistency and scalability without relying on proprietary tools.

## Core Architecture: The 3-Tier System

We adopt a standard 3-tier token architecture to separate **Values** from **Intent**.

### 1. Primitive Tokens (Reference)

- **Prefix**: `--ref-`
- **Definition**: Raw values (Hex, px, rem) with generic names.
- **Role**: The "Palette" of available options.
- **Rule**: **NEVER** use these directly in components.
  - **EXCEPTION**: Spacing tokens (`--ref-space-*`) may be used directly, as the spatial grid itself is a system-level contract.
- **Naming Pattern**: `--ref-{category}-{scale/name}`
  - `--ref-color-blue-500`: `#3b82f6`
  - `--ref-space-4`: `16px`

### 2. Semantic Tokens (System)

- **Prefix**: `--sys-`
- **Definition**: References to Primitives that describe **Intent** or **Context**.
- **Role**: The "Contract" or "API" of the design system. This is where theming (Dark Mode) happens.
- **Rule**: Use these to define the look of UI elements.
- **Naming Pattern**: `--sys-{property}-{OBJECT}-{INTENT}`

#### Taxonomy: Object x Intent

To avoid confusion between "things" (Surface, Text) and "states" (Action, Success), every semantic token is an intersection of an **Object** and an **Intent**.

**1. Objects (The Canvas)**

- **`bg`**: Backgrounds and surfaces.
- **`text`**: Text and icons (fill).
- **`border`**: Strokes and outlines.
- **`elevation`**: Shadows and depth.
- **`font`**: Typography families.

**2. Intents (The Context)**

- **Hierarchy**: `base` (foundation), `surface` (card), `main` (primary content), `muted` (secondary).
- **Interaction**: `action` (interactive elements).
- **Feedback**: `info`, `success`, `warning`, `error`.

**Example Mapping**:

| Variable               | Object     | Intent | Usage             |
| :--------------------- | :--------- | :----- | :---------------- |
| `--sys-bg-base`        | Background | Base   | Page background   |
| `--sys-bg-action`      | Background | Action | Button background |
| `--sys-text-main`      | Text       | Main   | Headings          |
| `--sys-text-action`    | Text       | Action | Button text       |
| `--sys-elevation-base` | Elevation  | Base   | Button shadow     |

### 3. Component Tokens (Scoped)

- **Prefix**: `--_` (Underscore)
- **Definition**: Component-specific variables that map Semantic Tokens to local properties.
- **Role**: Isolation and specific overrides.
- **Naming Pattern**: `--_{property}` (Component name is omitted for brevity)
  - `--_bg`: `var(--sys-bg-action)`

#### CRITICAL RULE: Strict Initialization

Because we omit the component name (e.g., using `--_bg` instead of `--_button-bg`), there is a high risk of style leakage from parent components if variables are left undefined.

**Rule**: **Every component MUST explicitly initialize all local variables it uses.**

```css
/* BAD: Relies on parent or fallback, risks inheriting parent's --_bg */
.c-button {
	background: var(--_bg);
}

/* GOOD: Explicitly cuts off inheritance by setting a default */
.c-button {
	--_bg: var(--sys-bg-action);
	background: var(--_bg);
}
```

---

## Discussion Topics

### 1. Token Coverage

What properties should be tokenized?

- [ ] Radius (Corner rounding)
- [x] Shadow (Elevation) -> Mapped to `--sys-elevation-*`
- [ ] Z-Index (Layering)
- [ ] Animation (Duration, Easing)

---

## Draft: Token Map (WIP)

### Primitives (Reference)

```css
:root {
	/* Colors */
	--ref-color-white: #ffffff;
	--ref-color-gray-50: #f9fafb;
	--ref-color-gray-100: #f3f4f6;
	--ref-color-gray-900: #111827;
	--ref-color-blue-500: #3b82f6;

	/* Spacing (4px grid) */
	--ref-space-1: 4px;
	--ref-space-2: 8px;
	--ref-space-4: 16px;
	--ref-space-8: 32px;
}
```

### Semantics (System)

```css
:root {
	/* Surfaces */
	--sys-bg-base: var(--ref-color-gray-50);
	--sys-bg-surface: var(--ref-color-white);
	--sys-bg-muted: var(--ref-color-gray-100);

	/* Text */
	--sys-text-main: var(--ref-color-gray-900);

	/* Actions */
	--sys-bg-action: var(--ref-color-blue-500);

	/* Elevation */
	--sys-elevation-base: var(--ref-shadow-md);
}
```
