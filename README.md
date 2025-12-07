# @rwm/srl-sidebar

A reusable Svelte 5 component for creating Self-Regulated Learning (SRL) sidebars with filtering, sorting, and quick actions.

## Features

- 🎯 **Flexible Filtering**: Support for both checkbox and radio filter groups
- 🔄 **Sorting**: Built-in sorting options with custom sort functions
- ⚡ **Quick Tools**: Drag-and-drop quick action buttons with keyboard support
- 🎨 **Customizable**: Easy to theme and customize
- ♿ **Accessible**: 
  - ARIA labels on all interactive elements
  - Visible focus indicators (2px purple outline)
  - Keyboard navigation support (Tab, Enter, Space)
  - Screen reader friendly with descriptive labels
  - Focus trap management within sidebar
- 🔐 **Auth Section**: Optional authentication status display
- 📱 **Collapsible**: Space-saving collapsed mode

## Project Structure

```
.
├── src/                       # Component source files
│   ├── SrlSidebar.svelte     # Main component
│   ├── types.ts              # TypeScript types
│   ├── style.css             # Component styles
│   └── index.ts              # Package entry point
├── demo/                      # SvelteKit demo application
│   └── src/routes/
│       └── +page.svelte      # Demo implementation
├── e2e/                       # End-to-end tests
├── package.json
└── README.md
```

## Installation

### From GitHub

```bash
npm install git+https://github.com/itcOnlineGaming/RWM_P2_2025_Emily_Breen.git
```

### From npm (when published)

```bash
npm install @rwm/srl-sidebar
```

## Getting Started

### Development

Run the demo app in development mode:

```bash
npm run dev:demo
```

### Building

Build the component package:

```bash
npm run build
```

Build the demo app:

```bash
npm run build:demo
```

### Testing

Run component tests:

```bash
npm test
```

Watch mode for tests:

```bash
npm run test:watch
```

## Usage

```svelte
<script>
  import { SrlSidebar } from '@rwm/srl-sidebar';
  import '@rwm/srl-sidebar/style.css';

  const items = [
    { id: 1, phase: 'plan', status: 'todo', title: 'Study for exam' }
  ];

  const filterGroups = [
    {
      id: 'phase',
      label: 'SRL Phase',
      icon: '🔮',
      type: 'radio',
      options: [
        { value: 'plan', label: 'Plan' },
        { value: 'monitor', label: 'Monitor' },
        { value: 'reflect', label: 'Reflect' }
      ]
    }
  ];

  const sortOptions = [
    { id: 'title', label: 'Alphabetical', icon: '↕️' }
  ];

  const quickTools = [
    { id: 'mark-complete', label: 'Mark Complete', icon: '✅', category: 'status' }
  ];

  let filteredItems = [];

  function handleQuickToolAction(event) {
    const { toolId, item } = event.detail;
    console.log(`Quick tool ${toolId} applied to`, item);
  }
</script>

<SrlSidebar
  title="Filters"
  {items}
  {filterGroups}
  {sortOptions}
  {quickTools}
  bind:filteredItems
  on:quickToolAction={handleQuickToolAction}
/>
```

## Demo

Check out the `demo/` folder for a complete SvelteKit application demonstrating all features of the sidebar component.

## License

MIT

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
