import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!('ResizeObserver' in window)) {
  window.ResizeObserver = ResizeObserver as unknown as typeof window.ResizeObserver
}

if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })
}

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => ''
  }),
  writable: true
})
