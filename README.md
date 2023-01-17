<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h2 align="center">NestJS CLI Schematics for CQRS Structure</h2>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="License" />
    <img src="https://badge.fury.io/js/%40nestjsplus%2Fdyn-schematics.svg" alt="npm version" height="18">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

## Usage
Import this package as your dev dependencies:
`yarn add -D @notekunn/schematics`

Then to create new feature call `nest g <feature-name> <name> `where `feature-name` is the name of the feature.

This call will create the following structure in `libs` directory:
```
src
|-- modules
    |-- users
    |   |   |-- commands
    |   |   |   |-- handler
    |   |   |   |-- impl
    |   |   |-- event
    |   |   |   |-- handler
    |   |   |   |-- impl
    |   |   |-- queries
    |   |   |   |-- handler
    |   |   |   |-- impl
    |   |   |-- saga
    |   |   |   |-- index.ts
```