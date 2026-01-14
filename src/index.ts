import noSecretKey from './rules/no-secret-key';

export const rules = {
    'no-secret-key': noSecretKey,
};

export const configs = {
    recommended: {
        rules: {
            'abacatepay/no-secret-key': 'error',
        },
        plugins: ['abacatepay'],
    }
};
