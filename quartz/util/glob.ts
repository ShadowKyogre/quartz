import path from "path"
import { FilePath } from "./path"
import { globby } from "globby"

export function toPosixPath(fp: string): string {
  return fp.split(path.sep).join("/")
}

export async function glob(
  pattern: string,
  cwd: string,
  ignorePatterns: string[],
): Promise<FilePath[]> {
  const fps = (
    await globby(pattern, {
      cwd,
      ignore: ignorePatterns,
      gitignore: true,
    })
  ).map(toPosixPath)
  return fps as FilePath[]
}

export function blacklistFolder(
  path : string = "**",
  keptExtensions : string[] = [],
): string {
  if (keptExtensions.length > 0) {
    let extResult = ""
    extResult = `/!(${keptExtensions.map((x) => { `*.{x}` }).join('|')})`
    return `${path}/**${extResult}`
  } else {
    return `{${path}/**,${path}}`
  }
}