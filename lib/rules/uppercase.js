module.exports = {
    meta: {
        type: 'layout',
        docs: {
            description: 'Force CAPITAL_CASE for variables',
            category: 'Stylistic Issues',
            recommended: false
        },
        schema: [{
            type: 'object',
            properties: {
                forceDataType: {
                    type: 'boolean'
                },
                forceFrozen: {
                    type: 'boolean'
                }
            }
        }],
        messages: {
            upper: 'const variable \'{{ name }}\' should be in capital case',
            lower: 'const variable \'{{ name }}\' should be in lower case',
            frozenUpper: 'const variable \'{{ name }}\' is frozen and should be in capital case'
        }
    },
    create: context => {
        const [{forceDataType, forceFrozen} = {}] = context.options;
        return {
            VariableDeclaration: node => {
                if (node.kind === 'const') {
                    node.declarations.forEach(variableDeclarator => {
                        const {id: {name}} = variableDeclarator;
                        const {init} = variableDeclarator;
                        // console.log(variableDeclarator.init.arguments[0]);
                        // return true if const case is upper
                        const nameUpper = name ? name === name.toUpperCase() : false;
                        // return true if const type is literal
                        const initTypeLiteral = init ? init.type === 'Literal' : false;
                        // return true if const is $ or _
                        const specChar = /[$_]/.test(name);
                        // return true if const using for require
                        const calleeRequire = init && init.callee ? init.callee.name === 'require' : false;

                        // return true if forceFrozen is enabled and object or array that is enclosed in an Object.freeze expression
                        const frozenObject = forceFrozen && init && init.type === 'CallExpression' && init.callee && init.callee.object && init.callee.object.name === 'Object' && init.callee.property && init.callee.property.name === 'freeze';

                        if (!nameUpper) {
                            if (frozenObject) {
                                context.report({node, messageId: 'frozenUpper', data: {name}});
                            } else if (forceDataType || initTypeLiteral) {
                                context.report({node, messageId: 'upper', data: {name}});
                            }
                        } else if (!frozenObject && !forceDataType && !initTypeLiteral && nameUpper && !calleeRequire && !specChar) {
                            context.report({node, messageId: 'lower', data: {name}});
                        }
                    });
                }
            }
        };
    }
};
