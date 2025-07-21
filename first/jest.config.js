module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.(test|spec).js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
};