# SRL Sidebar Monorepo

A monorepo containing the SRL (Self-Regulated Learning) Sidebar component and demo application.

## Project Structure

```
.
├── packages/
│   └── srl-sidebar/           # Reusable Svelte component package
│       ├── src/
│       │   ├── SrlSidebar.svelte
│       │   ├── types.ts
│       │   ├── style.css
│       │   └── index.ts
│       ├── package.json
│       └── README.md
├── demo/                      # SvelteKit demo application
│   ├── src/
│   │   ├── lib/
│   │   └── routes/
│   └── package.json
├── e2e/                       # End-to-end tests
└── package.json               # Root workspace config
```

## Getting Started

### Installation

```bash
npm install
```

This will install dependencies for the root workspace and all packages.

### Development

Run the demo app in development mode:

```bash
npm run dev
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

Run end-to-end tests:

```bash
npm run test:e2e
```

## Packages

### @rwm/srl-sidebar

The main Svelte component for creating SRL sidebars with filtering, sorting, and quick actions.

See [packages/srl-sidebar/README.md](packages/srl-sidebar/README.md) for detailed documentation.

### Demo App

A SvelteKit application demonstrating the SRL Sidebar component in action.

## Development Workflow

1. Make changes to the component in `packages/srl-sidebar/src/`
2. Tests run automatically or run `npm test`
3. View changes in the demo app with `npm run dev`
4. Build the package with `npm run build`

## Workspaces

This project uses npm workspaces to manage the monorepo structure. Each package can be worked on independently:

```bash
# Run commands in specific workspace
npm run dev -w demo
npm run test -w @rwm/srl-sidebar
npm run build -w @rwm/srl-sidebar
```

## License

MIT


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
