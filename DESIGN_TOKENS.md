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

We adopt the **Public/Private API Pattern** (inspired by [CSS Custom Properties as APIs](https://weidesign.engineer/blog/css-architecture-api-pattern/)) to ensure encapsulation while allowing controlled customization.

#### 3.1. Private Variables (Implementation)

- **Prefix**: `--_` (Underscore)
- **Definition**: Internal variables used to style the component.
- **Role**: Encapsulation. **NEVER** set or read these from outside the component.
- **Naming Pattern**: `--_{property}` (Component name is omitted for brevity)

#### 3.2. Public Variables (API)

- **Prefix**: `--{component}-{property}`
- **Definition**: The public interface exposed for customization.
- **Role**: Customization. Use these to override component styles from the outside.
- **Naming Pattern**: `--c-button-bg`, `--l-grid-gap`

#### 3.3. The Pattern: Fallback Chain

Components must explicitly initialize their private variables by checking for a Public API variable first, then falling back to a Semantic Token (Default).

```css
.c-button {
	/* Private Var = Public API (if set) ?? System Token (Default) */
	--_bg: var(--c-button-bg, var(--sys-bg-action));

	/* Implementation uses Private Variable */
	background: var(--_bg);
}
```

This structure ensures:

1.  **Encapsulation**: Internal logic (`--_bg`) is separated from external input.
2.  **Customizability**: Consumers can set `--c-button-bg` to override the color without fighting specificity.
3.  **Safety**: If no override is provided, the system token is used as a safe default.

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
