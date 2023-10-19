# rust-npm-demo

1. Build the rust application
   ```bash
   cargo build --release
   ```
2. Setup NPM workspaces
   ```bash
   cd npm
   npm run prepare
   npm publish --workspaces
   ```
