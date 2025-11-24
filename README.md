# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

# SRL Sidebar Svelte Component

A reusable, customisable Svelte sidebar component for supporting Self-Regulated Learning (SRL) strategies. Easily filter and sort items by difficulty or other categories. Designed for integration in SvelteKit apps and as a standalone package.

## Installation

Clone or copy this repo, or install via npm (if published):

```bash
npm install @yourname/srl-sidebar
```

## Usage

Import and use in your Svelte app:

```svelte
<script lang="ts">
  import SrlSidebar from '@yourname/srl-sidebar';
  let items = [
    { name: 'Task 1', difficulty: 'Easy', category: 'Math' },
    { name: 'Task 2', difficulty: 'Hard', category: 'Science' }
  ];
  let filterGroups = [
    {
      id: 'category',
      label: 'Category',
      icon: '📚',
      type: 'checkbox',
      options: [
        { value: 'Math', label: 'Math' },
        { value: 'Science', label: 'Science' }
      ]
    }
  ];
  let sortOptions = [
    { id: 'name', label: 'Name', icon: '🔤' }
  ];
  let selectedFilters = {};
  let selectedSortId = null;
  let filteredItems = [];
</script>

<SrlSidebar
  {items}
  {filterGroups}
  {sortOptions}
  bind:selectedFilters
  bind:selectedSortId
  bind:filteredItems
/>

<!-- Display filtered results -->
<ul>
  {#each filteredItems as item}
    <li>{item.name} ({item.difficulty})</li>
  {/each}
</ul>
```

## Props
- `items`: Array of items to filter/sort (must have properties matching filter/sort ids)
- `filterGroups`: Array of filter group objects (see `types.ts`)
- `sortOptions`: Array of sort option objects
- `selectedFilters`, `selectedSortId`, `filteredItems`: Bindable for two-way state
- `showAuthSection`, `isAuthenticated`: For optional login/logout UI

## Demo
A demo SvelteKit app is included in the `demo/` folder.

## License
MIT
