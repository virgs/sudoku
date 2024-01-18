# React + TypeScript + Vite

https://www.webpagetest.org/result/240117_BiDcW3_FE8/
https://pwa-workshop.js.org/1-manifest/
https://vite-pwa-org.netlify.app/frameworks/react.html
https://www.saurabhmisra.dev/setup-react-pwa-using-vite/


Solution:
https://bartp5.github.io/gss/

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:


Tabs:
- https://pats.cs.cf.ac.uk/@archive_file?p=557&n=final&f=1-1119707_Final_Report.pdf&SIG=45e8701589300b803b1f37add69ff2d1aeb432d7898492365590e9ab4ef94c60
- https://www.geeksforgeeks.org/solve-sudoku-on-the-basis-of-the-given-irregular-regions/amp/
- https://www.ocf.berkeley.edu/~arel/sudoku/main.html

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
