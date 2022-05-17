module.exports = {
    rootDir: './src',
    preset: 'ts-jest',
    // testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    // moduleNameMapper: {
    //     // '^constants/(.*)$': '<rootDir>/constants/$1',
    //     // '^utils/(.*)$': '<rootDir>/utils/$1',
    // },
    transform: {
        '\\.[jt]sx?$': 'ts-jest',
    },
    // transformIgnorePatterns: ['<rootDir>/node_modules/'],
    verbose: true,
    // automock: true,
};
