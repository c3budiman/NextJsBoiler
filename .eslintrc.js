module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jest"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": 0,
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
    },
    "overrides": [
        {
            "files": [
                "**/*.test.js",
                "**/*.test.jsx"
            ],
            "env": {
                "jest": true
            }
        }
    ],
    "globals": {
        "React": "writable"
    }
};
