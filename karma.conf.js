// Karma configuration
// Generated on Sun Feb 10 2019 21:43:04 GMT+0900 (대한민국 표준시)

let targets = process.env.npm_config_targets;

let targetFilePatterns = 
  targets ? targets.split(',').map(moduleName => `tests/${moduleName}/**/*spec.js`)
          : ['tests/**/*spec.js'];

module.exports = function(config) {
    config.set({
  
      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '',
  
  
      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine', 'browserify'],
  
  
      // list of files / patterns to load in the browser
      files: targetFilePatterns,
  
  
      // list of files / patterns to exclude
      exclude: [
      ],
  
  
      // preprocess matching files before serving them to the browser
      // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
      preprocessors: {
        'tests/**/*spec.js' : ['browserify']
      },
  
  
      plugins: [
        'karma-*',
        'karma-browserify'
      ],
  
      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['progress', 'kjhtml'],
  
  
      // web server port
      port: 9876,
  
  
      // enable / disable colors in the output (reporters and logs)
      colors: true,
  
  
      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_DEBUG,
  
  
      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,
  
  
      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['Chrome'],
  
  
      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: false,
  
      // Concurrency level
      // how many browser should be started simultaneous
      concurrency: Infinity,
  
  
      client: {
        jasmine: {
          random: false,
          timeoutInterval: 100000
        }
      }
    })
  }
  