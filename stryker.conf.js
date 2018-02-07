module.exports = config => {
  config.set({
    files: [
      {
        pattern: 'Format/**/*.js',
        mutated: true,
        included: true
      },
      {
        pattern: 'Utils/**/*.js',
        mutated: true,
        included: true
      },
      {
        pattern: 'Parse/**/*.js',
        mutated: true,
        included: true
      },
      'test/**/*.js'
    ],
    testRunner: 'mocha',
    mutator: 'javascript',
    transpilers: [],
    reporter: ['html', 'clear-text', 'progress'],
    testFramework: 'mocha',
    coverageAnalysis: 'off'
  })
}
