export default {
  '**/*.{ts,js,mjs,cjs}': [
    'eslint --fix',
    () => 'tsc -p tsconfig.json --skipLibCheck --noEmit',
    'prettier --write',
  ],
}
