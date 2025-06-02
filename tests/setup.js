// Test setup and configuration

// Add setImmediate polyfill for Playwright compatibility
if (typeof global.setImmediate === 'undefined') {
    global.setImmediate = (callback, ...args) => {
        return setTimeout(callback, 0, ...args);
    };
    global.clearImmediate = (id) => {
        return clearTimeout(id);
    };
}

// Mock DOM APIs
global.IntersectionObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock fetch
global.fetch = jest.fn();

// Mock console methods to reduce noise during tests
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Set up DOM environment
document.body.innerHTML = '';

// Mock animation frame
global.requestAnimationFrame = jest.fn(cb => setTimeout(cb, 0));
global.cancelAnimationFrame = jest.fn();

// Mock performance API
global.performance = {
  now: jest.fn(() => Date.now()),
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByType: jest.fn(() => []),
  getEntriesByName: jest.fn(() => []),
};

// Mock CSS support
global.CSS = {
  supports: jest.fn().mockReturnValue(true),
};

beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
  
  // Reset DOM
  document.body.innerHTML = '';
  document.head.innerHTML = '';
  
  // Reset any global state
  window.scrollY = 0;
  window.innerWidth = 1024;
  window.innerHeight = 768;
});

afterEach(() => {
  // Clean up after each test
  jest.clearAllTimers();
});
