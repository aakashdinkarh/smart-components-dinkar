# Changelog

All notable changes to this project will be documented in this file. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2024-05-25
### Added
-   Added entry point for each component to enable user to import individual component as per requirement as not sure if tree shaking is working properly

### Changed
-   Added clean option in webpack config itself, no need to clean the dist folder manually, thus script/clean-dist.j not being used anymore.
### Fixed
-   

### Documentation
### Deployment

## [1.4.2] - 2024-05-18
### Added
### Changed
### Fixed
-   published new version 1.4.2 with lib-build code, which got introduced in v1.4.1

### Documentation
### Deployment


## [1.4.1] - 2024-05-18
### Added
### Changed
-   Accidentally published new version v1.4.1 without code

### Fixed
### Documentation
### Deployment

## [1.4.0] - 2024-05-09
### Added
-   New components:
    -   LazyImageWithLoader
-   Icons:
    -   CopyIcon exported as ReactComponent


### Changed
-   Eslint version upgrade 8.56.0 -> 8.56.0
-   Memoized the following the components:
    -   BorderAnimatedContainer
    -   Button
    -   CodeWrapper
    -   LazyImageWithLoader
    -   Loader
    -   SegmentedTabs
    -   Select
    -   Switch
    -   Toast

### Fixed
### Documentation
-   JSDoc with props description and example usage for the following added:
    -   BorderAnimatedContainer
    -   Button
    -   CodeWrapper
    -   LazyImageWithLoader
    -   Loader
    -   SegmentedTabs
    -   Select
    -   Switch
    -   Toast

### Deployment
-   Demo/Playground React app, deployed on [Vercel](https://devdinkar-codebook.vercel.app/).


## [1.3.0] - 2024-01-06
### Added
-   New components:
    -   Button
    -   CodeWrapper
    -   BorderAnimatedContainer
    -   Loader
-   Icons:
    -   CopyIcon

### Changed
-   Stylelint added for improved code styling.
-   Eslint added for code consistency.

### Fixed
-   Bug fixes for components:
    -   Select
    -   Toast

### Documentation
-   JSDoc added for components:
    -   Switch
    -   Toast

### Deployment
-   Demo/Playground React app introduced, deployed on [Vercel](https://smart-components-dinkar.vercel.app/).


## [1.2.0] - 2023-09-18
This file was not created at that time.

## [Unreleased]
