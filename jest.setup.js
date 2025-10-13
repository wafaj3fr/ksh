import '@testing-library/jest-dom'

// Mock Next.js router
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
  usePathname: () => '/',
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return React.createElement('img', props)
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    span: 'span',
    img: 'img',
    section: 'section',
    article: 'article',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    button: 'button',
  },
  AnimatePresence: ({ children }) => children,
}))

// Add global polyfills for Node.js environment
global.TextEncoder = require('util').TextEncoder
global.TextDecoder = require('util').TextDecoder

// Mock File constructor for tests
global.File = class MockFile {
  constructor(bits, name, options = {}) {
    this.name = name
    this.type = options.type || ''
    this.size = bits.reduce((total, bit) => total + (typeof bit === 'string' ? bit.length : bit.byteLength || 0), 0)
    this.lastModified = Date.now()
    this._bits = bits
  }
  
  async arrayBuffer() {
    // Convert bits to ArrayBuffer
    const content = this._bits.join('')
    const buffer = new ArrayBuffer(content.length)
    const view = new Uint8Array(buffer)
    for (let i = 0; i < content.length; i++) {
      view[i] = content.charCodeAt(i)
    }
    return buffer
  }
  
  async text() {
    return this._bits.join('')
  }
}

// Mock global Request and Response for Next.js API tests
global.Request = class MockRequest {
  constructor(url, init = {}) {
    // Use Object.defineProperty to create a readonly url property
    Object.defineProperty(this, 'url', {
      value: url,
      writable: false,
      enumerable: true,
      configurable: false
    })
    this.method = init.method || 'GET'
    this.headers = new Headers(init.headers)
    this.body = init.body
  }
  
  async json() {
    return JSON.parse(this.body)
  }
  
  async formData() {
    return this.body
  }
}

global.Response = class MockResponse {
  constructor(body, init = {}) {
    this.body = body
    this.status = init.status || 200
    this.statusText = init.statusText || 'OK'
    this.headers = new Headers(init.headers)
  }
  
  json() {
    return Promise.resolve(JSON.parse(this.body))
  }
  
  // ADDED: Mock static json method for NextResponse.json() compatibility
  static json(body, init = {}) {
    return new MockResponse(JSON.stringify(body), init)
  }
}


global.Headers = class MockHeaders {
  constructor(init = {}) {
    this.map = new Map()
    if (init) {
      Object.entries(init).forEach(([key, value]) => {
        this.map.set(key.toLowerCase(), value)
      })
    }
  }
  
  get(name) {
    return this.map.get(name.toLowerCase())
  }
  
  set(name, value) {
    this.map.set(name.toLowerCase(), value)
  }
  
  // ADDED: Implement entries() for NextRequest compatibility
  entries() {
    return this.map.entries()
  }
}


// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />
  },
}))

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}))