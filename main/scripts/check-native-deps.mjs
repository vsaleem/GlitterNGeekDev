import { createRequire } from "node:module";
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const expectedNodeMajor = 22;
const nativeModules = ["lightningcss", "@tailwindcss/oxide"];

function installedVariants(prefix) {
  try {
    return readdirSync(join(projectRoot, "node_modules"))
      .filter((name) => name.startsWith(prefix))
      .sort();
  } catch {
    return [];
  }
}

function fail(message, error) {
  console.error(`\nNative dependency preflight failed: ${message}`);
  console.error(`Runtime: Node ${process.version} (${process.platform}-${process.arch})`);

  if (error instanceof Error) {
    console.error(`Cause: ${error.message.split("\n")[0]}`);
  }

  if (process.platform === "darwin") {
    const lightningVariants = installedVariants("lightningcss-darwin-");
    console.error(
      `Installed Lightning CSS variants: ${lightningVariants.join(", ") || "none"}`,
    );
  }

  console.error("\nRepair the install with the project's Node runtime:");
  console.error("  nvm use");
  console.error("  npm ci");
  console.error("\nDo not switch between Rosetta/Intel and Apple Silicon Node without reinstalling node_modules.\n");
  process.exit(1);
}

const nodeMajor = Number(process.versions.node.split(".")[0]);
if (nodeMajor !== expectedNodeMajor) {
  fail(`expected Node ${expectedNodeMajor}.x, received Node ${process.versions.node}.`);
}

for (const moduleName of nativeModules) {
  try {
    require(moduleName);
  } catch (error) {
    fail(`could not load ${moduleName} for ${process.platform}-${process.arch}.`, error);
  }
}

console.log(
  `Native dependency preflight passed for Node ${process.versions.node} (${process.platform}-${process.arch}).`,
);

