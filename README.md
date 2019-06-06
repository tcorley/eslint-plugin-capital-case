# eslint-plugin-capital-case

## Installation

```
$ npm i eslint eslint-plugin-capital-case --save-dev
```

## Usage

Add `capital-case` to the `.eslintrc` configuration file.

```js
{
    'plugins': [
        'capital-case'
    ],
    'rules': {
        'capital-case/uppercase': 'error'
    }
    
    // if you want uppercase everything
    
    'rules': {
        'capital-case/uppercase': [2, {forceDataType: true}]
    }
}
```

## Rule Details

Examples of correct code for this rule:

```js

const FOO = 'bar';
const FOO = 42;

const foo = ['bar', 42];
const foo = {bar: 42, baz: 'qux'};
const foo = 1000 * 60 * 10;
const foo = `42 ${bar}`;
const foo = bar();
const foo = bar ? baz : 42;
const foo = bar.baz();
const foo = bar => baz;
const foo = {bar: baz};
const foo = [bar, baz, 42];

// { forceDataType: true }

const FOO_BAR_BAZ = ['bar', 42];
const FOO_BAR_BAZ = {bar: 42, baz: 'qux'};
const FOO_BAR_BAZ = 1000 * 60 * 10;
const FOO_BAR_BAZ = `42 ${bar}`;
const FOO_BAR_BAZ = bar();
const FOO_BAR_BAZ = bar ? baz : 42;
const FOO_BAR_BAZ = bar.baz();
const FOO_BAR_BAZ = bar => baz;
const FOO_BAR_BAZ = {bar: baz};
const FOO_BAR_BAZ = [bar, baz, 42];
```
