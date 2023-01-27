module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:tailwindcss/recommended'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    plugins: ['sort-imports-es6-autofix', 'tailwindcss'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/multi-word-component-names': 'off',
        'prettier/prettier': [
            'warn',
            {
                singleQuote: true,
                semi: true,
                trailingComma: 'none',
                tabWidth: 4
            }
        ],
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/attribute-hyphenation': ['error', 'never'],
        'vue/v-on-event-hyphenation': ['error', 'never', { autofix: true }],
        'vue/order-in-components': [
            'error',
            {
                order: [
                    'el',
                    'name',
                    'key',
                    'parent',
                    'functional',
                    ['delimiters', 'comments'],
                    ['components', 'directives', 'filters'],
                    'extends',
                    'mixins',
                    ['provide', 'inject'],
                    'ROUTER_GUARDS',
                    'layout',
                    'middleware',
                    'validate',
                    'scrollToTop',
                    'transition',
                    'loading',
                    'inheritAttrs',
                    'model',
                    ['props', 'propsData'],
                    'emits',
                    'setup',
                    'asyncData',
                    'data',
                    'fetch',
                    'head',
                    'computed',
                    'watch',
                    'watchQuery',
                    'LIFECYCLE_HOOKS',
                    'methods',
                    ['template', 'render'],
                    'renderError'
                ]
            }
        ],
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'DEFINITION',
                    'LIST_RENDERING',
                    'CONDITIONALS',
                    'RENDER_MODIFIERS',
                    'GLOBAL',
                    ['UNIQUE', 'SLOT'],
                    'TWO_WAY_BINDING',
                    'OTHER_DIRECTIVES',
                    'OTHER_ATTR',
                    'EVENTS',
                    'CONTENT'
                ],
                alphabetical: true
            }
        ],
        'sort-imports-es6-autofix/sort-imports-es6': [
            2,
            {
                ignoreCase: false,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
            }
        ],
        'tailwindcss/classnames-order': 'error',
        'tailwindcss/no-custom-classname': 'off'
    }
};
