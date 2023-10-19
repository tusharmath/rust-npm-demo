# rust-npm-demo

## Publish

1. Build the rust application
   ```bash
   cargo build --release
   ```
2. Setup NPM workspaces
   ```bash
   cd npm
   npm i
   npm publish --workspaces
   ```

## Installation

Just install it globally

```bash
npm i -g rust-npm-demo
```
