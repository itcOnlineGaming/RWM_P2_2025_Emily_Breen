# Installation Guide

## Installing from GitHub

To use this package in another project, install it directly from GitHub:

```bash
npm install git+https://github.com/itcOnlineGaming/RWM_P2_2025_Emily_Breen.git
```

## Usage in Your Project

```svelte
<script>
  import { SrlSidebar } from '@rwm/srl-sidebar';
  import '@rwm/srl-sidebar/style.css';

  // Your component code here
</script>
```

## Package Structure

The package is now at the root level for direct npm installation:

```
RWM_P2_2025_Emily_Breen/
├── src/                    # Package source (what gets installed)
│   ├── SrlSidebar.svelte
│   ├── types.ts
│   ├── style.css
│   └── index.ts
├── demo/                   # Demo application (not included in package)
├── package.json            # Package configuration
└── README.md
```

## For Development

If you want to work on this package:

```bash
# Clone the repo
git clone https://github.com/itcOnlineGaming/RWM_P2_2025_Emily_Breen.git
cd RWM_P2_2025_Emily_Breen

# Install dependencies
npm install

# Run tests
npm test

# Run demo
npm run dev:demo
```

## Files Included in Package

When installed via npm, only these files are included:
- `src/` - Component source files
- `dist/` - Built files (after running `npm run build`)
- `package.json`
- `README.md`

The `demo/` folder is excluded from the npm package.
