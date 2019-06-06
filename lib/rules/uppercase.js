const msg = require('../message');

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
                }
            }
        }]
    },
    create: context => {
        const [{forceDataType} = {}] = context.options;
        return {
            VariableDeclaration: node => {
                if (node.kind === 'const') {
                    node.declarations.forEach(variableDeclarator => {
                        const {id: {name}} = variableDeclarator;
                        const {init} = variableDeclarator;

                        // return true if const case is upper
                        const nameUpper = name ? name === name.toUpperCase() : false;
                        // return true if const type is literal
                        const initTypeLiteral = init ? init.type === 'Literal' : false;
                        // return true if const is $ or _
                        const specChar = /[$_]/.test(name);
                        // return true if const using for require
                        const calleeRequire = init && init.callee ? init.callee.name === 'require' : false;

                        if (!nameUpper && (forceDataType || initTypeLiteral)) {
                            context.report(node, msg.upper);
                        } else if (!forceDataType && !initTypeLiteral && nameUpper && !calleeRequire && !specChar) {
                            context.report(node, msg.lower);
                        }
                    });
                }
            }
        };
    }
};
