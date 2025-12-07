# Installation Guide

## Installing from GitHub (package-only branch)

To use this package in your project, install directly from the `package-only` branch:

```bash
npm install git+https://github.com/itcOnlineGaming/RWM_P2_2025_Emily_Breen.git#package-only
```

This branch contains only the package files without the monorepo structure, demos, or Storybook configuration.

## What's Included

The package-only branch includes:
- `/src` - Component source files
- `/dist` - Built package (after build)
- Core configuration files (package.json, tsconfig.json, vite.config.ts)
- Tests and type definitions

## Usage

After installation, import the component in your Svelte project:

```svelte
<script lang="ts">
  import { SrlSidebar } from '@rwm/srl-sidebar';
  import '@rwm/srl-sidebar/style.css';
  
  let draggableItems = $state([
    { id: '1', text: 'Task 1', category: 'Work', difficulty: 'Easy', dueDate: '2024-01-01' }
  ]);
  
  let quickTools = $state([
    { id: 'tool1', label: 'Timer', icon: '⏱️' }
  ]);
</script>

<SrlSidebar 
  {draggableItems}
  {quickTools}
  isAuthenticated={false}
/>
```

## Branches

- **`main`** - Monorepo structure with Storybook, CI/CD workflows, and full development environment
- **`package-only`** - Clean package for installation into other projects (recommended for npm install)

## Updating

To update to the latest version:

```bash
npm update @rwm/srl-sidebar
```

Or reinstall:

```bash
npm uninstall @rwm/srl-sidebar
npm install git+https://github.com/itcOnlineGaming/RWM_P2_2025_Emily_Breen.git#package-only
```
