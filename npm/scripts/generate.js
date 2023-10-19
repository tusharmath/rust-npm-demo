import * as fs from "fs/promises"

import * as path from "path"
import {fileURLToPath} from "url"

const FILE_NAME = "rust-npm-demo"

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const packageJson = await fs
    .readFile(path.resolve(__dirname, "../package.json"), "utf-8")

    .then(JSON.parse)

  for (const workspace of packageJson.workspaces) {
    const source = `../target/release/${FILE_NAME}`
    const destination = path.resolve(__dirname, `../${workspace}/bin`)

    // Create directories
    await fs.mkdir(destination, {recursive: true})

    // Copy Binary
    await fs.copyFile(
      path.resolve(source),
      path.resolve(destination, FILE_NAME)
    )
    const workspacePackageJson = {
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
      author: packageJson.description,
      license: packageJson.license,
      directories: {bin: "bin"},
    }

    // Create package.json
    await fs.writeFile(
      path.resolve(__dirname, `../${workspace}/package.json`),
      JSON.stringify(workspacePackageJson, null, 2)
    )
  }
}

main()
