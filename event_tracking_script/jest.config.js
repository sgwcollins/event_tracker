module.exports = {
    // Indicates whether each individual test should be reported during the run
    verbose: true,
  
    // The root directory that Jest should scan for tests and modules within
    rootDir: "./",
  
    // A list of paths to directories that Jest should use to search for files in
    roots: ["<rootDir>"],
  
    // The test environment that will be used for testing
    testEnvironment: 'jsdom',
    
  
    // An array of file extensions your modules use
    moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  
    // The glob patterns Jest uses to detect test files
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  
    // Automatically reset mock state between every test
    resetMocks: true,
  
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
  

  };