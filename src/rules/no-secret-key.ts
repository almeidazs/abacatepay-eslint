import type { Rule } from 'eslint'

const SECRET_REGEX = /abc_(dev|prod)_\w{23,}/;

const rule: Rule.RuleModule = {
    meta: {
        type: 'problem',
        hasSuggestions: true,
        docs: {
            recommended: true,
            url: 'https://github.com/almeidazs/eslint-abacatepay',
            description: 'Disallow hardcoded AbacatePay secret keys',
        },
        messages: {
            noSecret: 'Never use an AbacatePay secret key directly in your code. Use environment variables instead.',
        },
        schema: [],
    },
    create(context) {
        function checkLiteral(value: unknown, node: any) {
            if (typeof value === 'string' && SECRET_REGEX.test(value)) {
                context.report({
                    node,
                    messageId: 'noSecret',
                    suggest: [
                        {
                            fix(fixer) {
                                return fixer.replaceText(node, 'process.env.ABACATEPAY_API_KEY');
                            },
                            desc: 'Use process.env.ABACATEPAY_API_KEY instead of the raw secret.',
                        },
                    ],
                });
            }
        }

        return {
            Literal(node) {
                checkLiteral(node.value, node)
            },
            TemplateElement(node) {
                checkLiteral(node.value?.raw, node)
            },
        };
    },
};

export default rule
