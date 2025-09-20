# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an accessibility-focused modal form challenge project built with React and TypeScript. The main goal is to implement a fully accessible modal component with form functionality that follows WCAG guidelines and provides excellent keyboard navigation and screen reader support.

## Development Commands

```bash
# Start development server
pnpm dev

# Run code checks and linting
pnpm check
```

## Project Architecture

### Core Technologies

- **React 19** with StrictMode
- **TypeScript** with strict mode enabled
- **Vite** as the build tool and dev server
- **Biome** for code formatting and linting
- **react-hook-form** for form management
- **overlay-kit** for modal/overlay functionality
- **pnpm** as package manager (v9.12.1)

### Key Implementation Requirements

The modal form must support:

1. **Accessibility Features**:

   - Focus management (move to modal title on open, return to trigger on close)
   - Keyboard navigation (Tab/Shift+Tab cycling)
   - Screen reader announcements for validation errors
   - ARIA attributes (aria-modal, aria-labelledby, aria-describedby)
   - prefers-reduced-motion support

2. **Interaction Patterns**:

   - Close via ESC key or overlay click
   - Prevent background scrolling when modal is open
   - Internal scrolling for long content
   - Full keyboard accessibility for form submission

3. **Declarative API**:
   - Modal should be callable via function: `const result = await openFormModal()`
   - Returns form values on submit, null on cancel/close

### Code Structure

- `/src/main.tsx` - Application entry point
- `/src/ModalFormPage.tsx` - Main implementation file for the modal form challenge
- `index.html` - HTML entry point with root element

### Configuration Notes

- **Biome** is configured for single quotes in JavaScript/TypeScript
- **TypeScript** uses strict mode with bundler module resolution
- Code should be developed primarily in `ModalFormPage.tsx` but structure can be modified as needed

## Implementation Focus

When implementing the modal form:

1. Start with `ModalFormPage.tsx` as the main component
2. Leverage `overlay-kit` for declarative modal management
3. Use `react-hook-form` for form state and validation
4. Ensure at least one field (e.g., email) has validation
5. Implement proper focus trapping within the modal
6. Handle background scroll locking appropriately

## Code Design

Read frontend-design-guideline.md.
