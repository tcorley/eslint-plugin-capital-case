/* eslint-disable quotes */
/* eslint-disable no-template-curly-in-string */

const rule = require('../lib/rules/uppercase');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2017}});

ruleTester.run('const-uppercase', rule, {

    invalid: [
        {
            code: "const FOO = Object.freeze({a: false})",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = Object.freeze([1,2,3])",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const foo = Object.freeze({a: false})",
            options: [{forceFrozen: true}],
            errors: [{messageId: 'frozenUpper'}]
        },
        {
            code: "const foo = Object.freeze([1,2,3])",
            options: [{forceFrozen: true}],
            errors: [{messageId: 'frozenUpper'}]
        },
        {
            code: "const foo = 'bar'",
            errors: [{messageId: 'upper'}]
        },
        {
            code: "const foo = 42",
            errors: [{messageId: 'upper'}]
        },
        {
            code: "const FOO = []",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const foo = []",
            options: [{forceDataType: true}],
            errors: [{messageId: 'upper'}]
        },
        {
            code: "const FOO = {}",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = ['bar', 42]",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = {bar: 42, baz: 'qux'}",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = `42 ${bar}`",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = bar()",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = bar => baz",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = bar ? 'baz' : qux",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = bar.baz()",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "async function foo() {const BAR = await baz()}",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "for (const FOO of bar) {}",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = bar.baz",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = bar * baz",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = new bar()",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = {bar: baz => qux}",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = baz || qux",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = [bar, baz]",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = {bar: 42, baz: {qux: 'quux'}}",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = {bar: 42, baz: ['qux', 'quux']}",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = {bar: 42, baz: {}}",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = {bar: 42, baz: []}",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = {bar: 42, baz: [`${qux} quux`]}",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = {bar: `${baz} qux`, quux: ['']}",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = {bar: [`${baz} qux`], quux: ['']}",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = {bar: {asd: '123'}, quux: [`${baz} quz`]}",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = {bar: [''], quux: [`${baz} quz`]}",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = 2 * 2",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const foo = 2 * 2",
            options: [{forceDataType: true}],
            errors: [{messageId: 'upper'}]
        },
        {
            code: "const FOO = 2 * 2 * 10",
            errors: [{messageId: 'lower'}]
        },
        {
            code: "const FOO = 2 * bar",
            errors: [{messageId: 'lower'}]
        }
    ],

    valid: [
        "const foo = `bar ${baz} qbar`",
        "const foo = bar()",
        "const foo = bar ? 'baz' : qux",
        "const foo = require('bar')",
        "const FOO = require('bar')",
        "const FOO = 'bar'",
        "const FOO = 42",
        "const foo = []",
        "const foo = ['bar', 42]",
        "const foo = {}",
        "const foo = {bar: 42, baz: 'qux'}",
        "const {FOO} = bar",
        "const {foo} = bar",
        "const foo = bar.baz()",
        "const foo = bar => baz",
        "async function foo() {const bar = await baz()}",
        "for (const foo of bar) {}",
        "const foo = bar.baz",
        "const foo = bar * baz",
        "const foo = new bar()",
        "const foo = {bar: baz => qux}",
        "const foo = baz || qux",
        "const foo = [bar, baz]",
        "const foo = {bar: 42, baz: {}}",
        "const foo = {bar: 42, baz: []}",
        "const foo = {bar: 42, baz: {qux: 'quux'}}",
        "const foo = {bar: 42, baz: ['qux', 'quux']}",
        "const foo = {bar: 42, baz: [`${qux} quux`]}",
        "const foo = {bar: `${baz} qux`, quux: ['']}",
        "const foo = {bar: [`${baz} qux`], quux: ['']}",
        "const foo = {bar: {asd: '123'}, quux: [`${baz} quz`]}",
        "const foo = {bar: [''], quux: [`${baz} quz`]}",
        "const foo = 2 * 2",
        "const foo = 2 * 2 * 10",
        "const foo = 2 * bar",
        "const foo = require(bar)",
        "const FOO = require(bar)",
        "const _ = 'foo'",
        "const $ = 'bar'",
        {
            code: "const FOO = `bar ${baz} qbar`",
            options: [{forceDataType: true}]
        },
        {
            code: "const FOO_BAR = {bar: 42, baz: {qux: 'quux'}}",
            options: [{forceDataType: true}]
        },
        {
            code: "const FOO = Object.freeze({a: false})",
            options: [{forceFrozen: true}]
        },
        {
            code: "const FOO_BAR = Object.freeze([1,2,3])",
            options: [{forceFrozen: true}]
        }
    ]
});
