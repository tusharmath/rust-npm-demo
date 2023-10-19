import * as fs from "fs/promises"

import * as path from "path"
import {fileURLToPath} from "url"
import * as toml from "toml"

const FILE_NAME = "rust-npm-demo"

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  const cargo = await fs
    .readFile(path.resolve(__dirname, "../../cargo.toml"), "utf-8")
    .then((data) => JSON.parse(JSON.stringify(toml.parse(data), null, 2)))

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
      name: cargo.package.name,
      version: cargo.package.version,
      description: cargo.package.description,
      author: cargo.package.authors.join(", "),
      license: cargo.package.license,
      directories: {bin: "bin"},
    }

    console.log(workspacePackageJson)
    // Create package.json
    await fs.writeFile(
      path.resolve(__dirname, `../${workspace}/package.json`),
      JSON.stringify(workspacePackageJson, null, 2)
    )
  }
}

main()
