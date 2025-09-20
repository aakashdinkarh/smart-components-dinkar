# Smart Components Dinkar

<p>
  <strong>Live Demo:</strong>
  <a href="https://devdinkar-codebook.vercel.app/" target="_blank" rel="noopener noreferrer">
    DevDinkar CodeBook
  </a>
</p>

A collection of smart React components designed to enhance your web application development by providing reusable and efficient solutions for common UI patterns. Built with TypeScript, these components focus on modularity, flexibility, and ease of integration.

## 📦 Installation

```bash
npm install smart-components-dinkar
```

## 🚀 Quick Start

```tsx
import React from 'react';
import { Button, Loader, Select } from 'smart-components-dinkar';

function App() {
	return (
		<div>
			<Button variant="primary" onClick={() => console.log('Clicked!')}>
				Click me
			</Button>

			<Loader size="medium" />

			<Select
				options={[
					{ value: 'option1', label: 'Option 1' },
					{ value: 'option2', label: 'Option 2' },
				]}
				placeholder="Choose an option"
			/>
		</div>
	);
}
```

## 📚 Available Components

### Core Components

- **Button** - Customizable button component with multiple variants and sizes
- **Loader** - Loading indicators with different styles and animations
- **Select** - Enhanced dropdown/select component with search and multi-select
- **Switch** - Toggle switch component with smooth animations
- **Toast** - Notification toast messages with different types

### Layout Components

- **SegmentedTabs** - Tab navigation component with segmented control
- **BorderAnimatedContainer** - Container with animated border effects
- **CodeWrapper** - Code display wrapper with syntax highlighting

### Utility Components

- **LazyImageWithLoader** - Image component with lazy loading and placeholder

## 🎨 Component Examples

### Button Component

```tsx
import { Button } from 'smart-components-dinkar';

// Different variants
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>

// Different sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// With loading state
<Button loading={true}>Loading...</Button>
```

### Select Component

```tsx
import { Select } from 'smart-components-dinkar';

const options = [
	{ value: 'react', label: 'React' },
	{ value: 'vue', label: 'Vue' },
	{ value: 'angular', label: 'Angular' },
];

<Select
	options={options}
	placeholder="Select a framework"
	searchable={true}
	multiSelect={false}
	onChange={(selected) => console.log(selected)}
/>;
```

### Loader Component

```tsx
import { Loader } from 'smart-components-dinkar';

// Different sizes
<Loader size="small" />
<Loader size="medium" />
<Loader size="large" />

// With custom text
<Loader text="Loading data..." />
```

## 🛠️ Development

### Prerequisites

- Node.js >= 16
- npm >= 8

### Setup

1. Clone the repository:

```bash
git clone https://github.com/aakashdinkarh/smart-components-dinkar.git
cd smart-components-dinkar/packages/library
```

2. Install dependencies:

```bash
npm install
```

### Build

Build the library:

```bash
npm run build
```

### Watch Mode

For development with auto-rebuild:

```bash
npm run watch
```

### Linting

```bash
# Check for linting errors
npm run lint

# Fix linting errors
npm run lint:fix
```

## 📁 Project Structure

```
src/
├── components/           # All React components
│   ├── Button/          # Button component
│   ├── Loader/          # Loader component
│   ├── Select/          # Select component
│   └── ...
├── icons/               # Icon components
├── utils/               # Utility functions
├── types.ts             # TypeScript type definitions
└── exports.ts           # Main export file
```

## 🎯 Features

- **TypeScript Support** - Full TypeScript definitions included
- **Tree Shaking** - Import only what you need
- **CSS Modules** - Scoped styling with CSS modules
- **Responsive Design** - Mobile-first responsive components
- **Accessibility** - Built with accessibility in mind
- **Customizable** - Extensive customization options
- **Lightweight** - Optimized bundle size

## 📖 Documentation

For detailed documentation, examples, and interactive demos, visit:
**[DevDinkar CodeBook](https://devdinkar-codebook.vercel.app/)**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

ISC License - see [LICENSE](../../LICENSE) file for details.

## 🔗 Links

- **NPM Package:** [smart-components-dinkar](https://www.npmjs.com/package/smart-components-dinkar)
- **GitHub Repository:** [smart-components-dinkar](https://github.com/aakashdinkarh/smart-components-dinkar)
- **Live Demo:** [DevDinkar CodeBook](https://devdinkar-codebook.vercel.app/)
