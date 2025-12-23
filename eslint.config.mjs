import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1. Global Ignores: This object must be at the start of the array
  {
    ignores: [
      '.next/**',
      'sitemap-fix.js',
      'next-env.d.ts',
      'out/**', // Standard Next.js export folder (optional but good practice)
      'build/**', // Standard build folder
    ],
  },
  // 2. Extend Next.js Configurations
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
];

export default eslintConfig;
