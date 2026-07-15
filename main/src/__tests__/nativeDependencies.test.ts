import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

describe("native build dependencies", () => {
  it.each(["lightningcss", "@tailwindcss/oxide"])(
    "loads %s for the active Node platform and architecture",
    (moduleName) => {
      expect(() => require(moduleName)).not.toThrow();
    },
  );
});

