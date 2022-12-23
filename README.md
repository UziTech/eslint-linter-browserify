# eslint-linter-browserify
Use eslint in the browser

```js
import "./node_modules/eslint-linter-browserify/linter.js";

// or <script src="https://cdn.jsdelivr.net/npm/eslint-linter-browserify/linter.min.js"></script>

const linter = new eslint.Linter();

const messages = linter.verify("var foo;", {
  rules: {
    semi: ["error", "never"]
  }
}, { filename: "foo.js" });

console.log(messages);
```

https://eslint.org/docs/developer-guide/nodejs-api#linter

See the [CodeMirror example](./example) for a way to use this in [CodeMirror](https://codemirror.net).
