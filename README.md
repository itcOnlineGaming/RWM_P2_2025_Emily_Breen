# @rwm/srl-sidebar

Self-Regulated Learning (SRL) sidebar component for filtering, sorting, and organizing learning activities. Built with Svelte 5 and TypeScript.

## Features

- **Filtering**: Filter items by multiple criteria (category, difficulty, due date)
- **Sorting**: Sort items by name, date, or difficulty
- **Quick Tools**: Drag-and-drop tools for quick actions
- **Collapsible Sections**: Save space with collapsible filter and tool sections
- **Authentication**: Login/logout functionality
- **Accessibility**: 
  - Full keyboard navigation support (Tab, Enter, Space)
  - ARIA labels on all interactive elements
  - Visible focus indicators (2px purple outline)
  - Screen reader friendly
- **Responsive**: Mobile-friendly design with adaptive layout
- **TypeScript**: Full type safety

## Installation

### From GitHub (package-only branch)

```bash
npm install git+https://github.com/itcOnlineGaming/RWM_P2_2025_Emily_Breen.git#package-only
```

### Quick Start

```bash
# Install dependencies
npm install

# Install Playwright browsers for testing
npx playwright install

# Run tests
npm test

# Build package
npm run build

# Start demo
npm run dev:demo
```

## Usage

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
  
  function handleItemDrop(event: CustomEvent) {
    console.log('Item dropped:', event.detail);
  }
</script>

<SrlSidebar 
  {draggableItems}
  {quickTools}
  isAuthenticated={false}
  onItemDrop={handleItemDrop}
  onLogin={() => console.log('Login')}
  onLogout={() => console.log('Logout')}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `draggableItems` | `DraggableItem[]` | `[]` | Items to display in the sidebar |
| `quickTools` | `QuickTool[]` | `[]` | Quick access tools |
| `isAuthenticated` | `boolean` | `false` | Whether user is authenticated |
| `initialCollapsed` | `boolean` | `false` | Initial collapsed state |
| `onItemDrop` | `(event: CustomEvent) => void` | `undefined` | Callback when item is dropped on a tool |
| `onLogin` | `() => void` | `undefined` | Callback for login action |
| `onLogout` | `() => void` | `undefined` | Callback for logout action |

## Project Structure

```
src/                       # Component source files
  SrlSidebar.svelte       # Main component
  types.ts                # TypeScript types
  style.css               # Component styles
  index.ts                # Package entry point
demo/                     # SvelteKit demo application
e2e/                      # End-to-end tests
```

## Testing

The component includes 31 comprehensive tests:
- 22 component tests covering rendering, filtering, sorting, and interactions
- 9 type validation tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
```

## Development

```bash
npm run dev:demo      # Start demo application
npm run build         # Build package
npm run build:demo    # Build demo
```

## License

MIT
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
