# @rwm/srl-sidebar

A reusable Svelte 5 component for creating Self-Regulated Learning (SRL) sidebars with filtering, sorting, and quick actions.

## Features

- 🎯 **Flexible Filtering**: Support for both checkbox and radio filter groups
- 🔄 **Sorting**: Built-in sorting options with custom sort functions
- ⚡ **Quick Tools**: Optional quick action buttons
- 🎨 **Customizable**: Easy to theme and customize
- ♿ **Accessible**: ARIA labels and keyboard navigation
- 🔐 **Auth Section**: Optional authentication status display
- 📱 **Collapsible**: Space-saving collapsed mode

## Installation

```bash
npm install @rwm/srl-sidebar
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

  let filteredItems = [];
</script>

<SrlSidebar
  {items}
  {filterGroups}
  {sortOptions}
  bind:filteredItems
/>
```

## API

### Props

- `title?: string` - Sidebar title (default: "Filters")
- `items?: any[]` - Array of items to filter/sort
- `filterGroups?: FilterGroup[]` - Filter group configurations
- `sortOptions?: SortOption[]` - Sort option configurations
- `quickTools?: QuickTool[]` - Quick action buttons
- `showAuthSection?: boolean` - Show authentication section
- `isAuthenticated?: boolean` - Authentication status
- `customFilterFn?: function` - Custom filter function
- `sortFn?: function` - Custom sort function

### Events

- `on:filterchange` - Fired when filters change
- `on:sortchange` - Fired when sort changes
- `on:quicktoolclick` - Fired when quick tool is clicked
- `on:login` - Fired when login is clicked
- `on:logout` - Fired when logout is clicked

### Bindings

- `bind:filteredItems` - Two-way binding for filtered items
- `bind:selectedFilters` - Two-way binding for selected filters
- `bind:selectedSort` - Two-way binding for selected sort

## Development

```bash
npm test        # Run tests
npm run build   # Build package
```

## License

MIT
