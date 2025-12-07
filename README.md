# SRL Sidebar Monorepo

A monorepo containing the Self-Regulated Learning (SRL) Sidebar component and demo application.

## 📦 Packages

- **[@rwm/srl-sidebar](./packages/srl-sidebar)** - Reusable Svelte 5 sidebar component with filtering, sorting, and quick tools
- **[@rwm/srl-sidebar-demo](./demo)** - Demo application showcasing the sidebar component

## 🚀 Quick Start

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install

# Install Playwright browsers for testing
pnpm exec playwright install

# Run tests
pnpm test

# Start demo in development mode
pnpm dev:demo

# Build all packages
pnpm build
```

## 📚 Storybook

View component documentation and interactive examples:

```bash
# Start Storybook
pnpm storybook

# Build Storybook
pnpm build-storybook
```

## 🧪 Testing

All packages include comprehensive test suites:

```bash
# Run all tests
pnpm test

# Watch mode for development
pnpm test:watch
```

## 🔧 CI/CD

GitHub Actions workflow automatically:
- Runs tests on push/PR
- Checks TypeScript types
- Builds all packages

## 📁 Project Structure

```
.github/workflows/    # CI/CD workflows
.storybook/          # Storybook configuration
demo/                # Demo application
packages/
  srl-sidebar/       # Main component package
e2e/                 # End-to-end tests
```

## 🎨 Component Features

- **Filtering**: Filter items by category, difficulty, and due date
- **Sorting**: Sort by name, date, or difficulty
- **Quick Tools**: Drag-and-drop tools for quick actions
- **Authentication**: Login/logout functionality
- **Accessibility**: Full keyboard navigation and ARIA support
- **Responsive**: Mobile-friendly design

## 📖 Documentation

See the [packages/srl-sidebar](./packages/srl-sidebar) directory for detailed component documentation.

## 🔗 Installation in Other Projects

For installing this package in other projects, use the `package-only` branch:

```bash
npm install git+https://github.com/itcOnlineGaming/RWM_P2_2025_Emily_Breen.git#package-only
```

The `package-only` branch contains a clean package structure without the monorepo setup.

## 📝 License

MIT
