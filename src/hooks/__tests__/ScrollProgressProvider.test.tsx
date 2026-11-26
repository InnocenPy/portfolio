import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScrollProgressProvider, useScrollProgress } from '../ScrollProgressProvider'

function Reader({ id }: { id: string }) {
  return <span data-testid={id}>{useScrollProgress()}</span>
}

describe('ScrollProgressProvider', () => {
  it('registers a single scroll listener shared by all consumers', () => {
    const add = vi.spyOn(window, 'addEventListener')
    render(
      <ScrollProgressProvider>
        <Reader id="a" />
        <Reader id="b" />
      </ScrollProgressProvider>,
    )
    expect(add.mock.calls.filter(([type]) => type === 'scroll')).toHaveLength(1)
    expect(screen.getByTestId('a').textContent).toBe(screen.getByTestId('b').textContent)
    add.mockRestore()
  })

  it('throws when used outside the provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Reader id="x" />)).toThrow(/ScrollProgressProvider/)
    spy.mockRestore()
  })
})
