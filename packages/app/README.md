# Smart Components Dinkar - Playground App

<p>
  <strong>Live Demo:</strong>
  <a href="https://devdinkar-codebook.vercel.app/" target="_blank" rel="noopener noreferrer">
    DevDinkar CodeBook
  </a>
</p>

This is the playground/demo application for the `smart-components-dinkar` library. It showcases all available components with interactive examples, usage documentation, and live code snippets.

## 🎯 Purpose

The playground app serves as:

- **Interactive Documentation** - Live examples of all components
- **Development Testing** - Test components during development
- **Usage Reference** - Code snippets and implementation examples
- **Visual Showcase** - Demonstrate component capabilities and styling

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16
- npm >= 8

### Installation

1. Navigate to the app directory:

```bash
cd packages/app
```

2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

Build the playground app:

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── routes/           # Component showcase pages
│   │   ├── Button/       # Button component examples
│   │   ├── Loader/       # Loader component examples
│   │   ├── Select/       # Select component examples
│   │   └── ...
│   ├── common/           # Shared components
│   ├── SideBar/          # Navigation sidebar
│   └── App.tsx           # Main app component
├── helpers/              # Utility functions
└── index.tsx             # App entry point
```

## 🔧 Features

- **Interactive Component Examples** - Live, editable component demos
- **Code Highlighting** - Syntax-highlighted code snippets
- **Responsive Design** - Works on desktop and mobile
- **Search & Navigation** - Easy component discovery
- **Copy to Clipboard** - Copy code examples instantly

## 📚 Available Components

The playground showcases the following components:

- **Button** - Customizable button component with variants
- **Loader** - Loading indicators and spinners
- **Select** - Enhanced dropdown/select component
- **Switch** - Toggle switch component
- **Toast** - Notification toast messages
- **SegmentedTabs** - Tab navigation component
- **BorderAnimatedContainer** - Animated border container
- **LazyImageWithLoader** - Image component with lazy loading
- **CodeWrapper** - Code display wrapper

## 🛠️ Development Notes

- The app uses the local library package for development
- Hot reloading is enabled for rapid development
- All components are imported from `smart-components-dinkar`
- Styling uses CSS modules for component isolation

## 📱 Deployment

The playground is deployed to Vercel and accessible at:
[https://devdinkar-codebook.vercel.app/](https://devdinkar-codebook.vercel.app/)

## 🔗 Related

- **Library Package:** `packages/library`
- **Main Repository:** [smart-components-dinkar](https://github.com/aakashdinkarh/smart-components-dinkar)
- **NPM Package:** [smart-components-dinkar](https://www.npmjs.com/package/smart-components-dinkar)
