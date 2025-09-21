# Smart Components Dinkar

<p>
  <strong>Live Demo:</strong>
  <a href="https://devdinkar-codebook.vercel.app/" target="_blank" rel="noopener noreferrer">
    DevDinkar CodeBook
  </a>
</p>

A monorepo containing a collection of smart React components and their interactive playground. This repository provides reusable UI components designed to enhance web application development with a focus on modularity, flexibility, and ease of integration.

## 📦 Repository Structure

This monorepo contains two main packages:

- **`packages/library`** - The npm package containing reusable React components
- **`packages/app`** - The playground/demo application showcasing component usage

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16
- npm >= 8

### Installation

1. Clone the repository:

```bash
git clone https://github.com/aakashdinkarh/smart-components-dinkar.git
cd smart-components-dinkar
```

2. Install dependencies for all packages:

```bash
npm run bootstrap
```

## 🛠️ Development

### Run Development Environment

Start both the library watcher and playground app:

```bash
npm run dev
```

This will:

- Watch and rebuild the library package on changes
- Start the playground app at http://localhost:3000

### Individual Package Commands

**Library Package:**

```bash
# Build the library
npm run build:lib

# Watch mode for library development
npm run watch --workspace=packages/library
```

**App Package:**

```bash
# Start the playground app
npm run start --workspace=packages/app

# Build the playground app
npm run build:app
```

### Linting

```bash
# Lint all packages
npm run lint

# Lint specific package
npm run lint --workspace=packages/library
npm run lint --workspace=packages/app
```

## 📚 Documentation

- **Component Documentation:** [DevDinkar CodeBook](https://devdinkar-codebook.vercel.app/)
- **NPM Package:** [smart-components-dinkar](https://www.npmjs.com/package/smart-components-dinkar)

## 🏗️ Build

Build all packages:

```bash
npm run build
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

ISC License - see [LICENSE](LICENSE) file for details.
