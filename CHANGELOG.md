# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.0.3] - 2020-06-19
### Fixed
- options with long label text from overflowing outside container
### Updated
- all components from classes to function components with hooks

## [2.0.2] - 2020-01-29
### Fixed
- not passing proper parameters to noOptionsMessage and loadingMessage

## [2.0.1] - 2019-10-18
### Updated
- all dependencies

### Updated
- how padding top and bottom is applied to menu list

### Updated
- menu list dom structure to prevent regression regarding scrollbar

## [2.0.0] - 2019-07-02

### Added
- ref forwarding: refs on the windowed select component will be forwarded to the underlying Select component from react-select

### Fixed
- windowThreshold not kicking in for nested grouped options

## [1.0.2-beta] - 2019-06-19

### Added
- all react-select named exports

## [1.0.1-alpha] - 2019-06-17

### Added
- support for classNamePrefix prop on windowed menu list 

## [1.0.0-alpha] - 2019-06-17

### Updated

- react-select from 2.3.0 to 3.0.4: see the [upgrade guide](https://github.com/JedWatson/react-select/issues/3585) for breaking changes from v2 to v3
- react-window to 1.5.0 to 1.8.2

### Added

- react-select components as named export
- windowed MenuList component as named export 