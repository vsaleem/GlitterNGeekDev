# Local development

## Required Node runtime

This project uses Node 22.22.0, declared in `.nvmrc`.

On Apple Silicon, use the native ARM Node installation rather than an Intel Node
running through Rosetta:

```bash
nvm use
node -p "process.version + ' ' + process.arch"
```

The expected architecture on an Apple Silicon Mac is `arm64`.

## Install

Native packages such as Lightning CSS and Tailwind Oxide are selected for the
platform and architecture active during installation. After selecting Node:

```bash
npm ci
```

If Node architecture changes, run `npm ci` again before starting Next.js. A
`node_modules` tree installed by Intel Node cannot supply Apple Silicon native
binaries, and the reverse is also true.

## Preflight

Run the native dependency check directly with:

```bash
npm run verify:native
```

The same check runs automatically before every supported development server,
build, and unit-test command. It fails early with the active Node architecture
and repair instructions instead of allowing Turbopack to fail while evaluating
`globals.css`.

## Standard validation

```bash
npm run lint
npm run typecheck
npm test -- --runInBand
npm run build
```

