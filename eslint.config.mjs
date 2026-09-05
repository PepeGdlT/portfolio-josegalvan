import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: currentDirectory });

const eslintConfig = [
  { ignores: [".next/**", "docs/**", "out/**", "node_modules/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
