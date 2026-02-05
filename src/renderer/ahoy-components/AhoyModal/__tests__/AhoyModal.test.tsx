import { render, within, fireEvent } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import AhoyModal from '../AhoyModal'

const renderModal = (props: Partial<React.ComponentProps<typeof AhoyModal>> = {}) => {
  const onCancel = vi.fn()
  const primaryAction = props.primaryAction ?? {
    text: 'Confirm',
    onClick: vi.fn()
  }
  const secondaryAction = props.secondaryAction ?? {
    text: 'Cancel',
    onClick: vi.fn()
  }

  render(
    <AhoyModal
      open
      title="Reset employee password?"
      subTitle="This action cannot be undone."
      onCancel={onCancel}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
      {...props}
    />
  )

  return { onCancel, primaryAction, secondaryAction }
}

describe('AhoyModal', () => {
  it('renders fixed structure with title in header and description in body', () => {
    renderModal()

    const header = document.querySelector('.ahoy-modal-header')
    const body = document.querySelector('.ahoy-modal-body')
    const footer = document.querySelector('.ahoy-modal-footer')

    expect(header).toBeInTheDocument()
    expect(body).toBeInTheDocument()
    expect(footer).toBeInTheDocument()

    expect(within(header as HTMLElement).getByText('Reset employee password?')).toBeInTheDocument()
    const description = within(body as HTMLElement).getByText('This action cannot be undone.')
    expect(description).toHaveClass('ahoy-modal-description')
  })

  it('orders secondary then primary buttons', () => {
    renderModal()

    const footer = document.querySelector('.ahoy-modal-footer')
    const buttons = within(footer as HTMLElement).getAllByRole('button')

    expect(buttons[0]).toHaveTextContent('Cancel')
    expect(buttons[1]).toHaveTextContent('Confirm')
  })

  it('uses default and compact widths', () => {
    renderModal()
    const modal = document.querySelector('.ant-modal') as HTMLElement
    const defaultWidth = modal.style.width || modal.style.getPropertyValue('--ant-modal-width')
    expect(defaultWidth).toBe('520px')

    renderModal({ size: 'compact' })
    const compactModal = document.querySelectorAll('.ant-modal')[1] as HTMLElement
    const compactWidth = compactModal.style.width || compactModal.style.getPropertyValue('--ant-modal-width')
    expect(compactWidth).toBe('480px')
  })

  it('closes on mask click for default variant and not for destructive', () => {
    const { onCancel } = renderModal()
    const wrap = document.querySelector('.ant-modal-wrap') as HTMLElement
    fireEvent.mouseDown(wrap)
    fireEvent.mouseUp(wrap)
    fireEvent.click(wrap)
    expect(onCancel).toHaveBeenCalled()

    const destructive = renderModal({ variant: 'destructive' })
    const destructiveWrap = document.querySelectorAll('.ant-modal-wrap')[1] as HTMLElement
    fireEvent.mouseDown(destructiveWrap)
    fireEvent.mouseUp(destructiveWrap)
    fireEvent.click(destructiveWrap)
    expect(destructive.onCancel).not.toHaveBeenCalled()
  })

  it('triggers primary action on Enter', () => {
    const { primaryAction } = renderModal()
    const content = document.querySelector('.ahoy-modal-content') as HTMLElement

    fireEvent.keyDown(content, { key: 'Enter' })

    expect(primaryAction.onClick).toHaveBeenCalled()
  })

  it('does not trigger primary action when disabled', () => {
    const customPrimary = {
      text: 'Confirm',
      onClick: vi.fn(),
      disabled: true
    }

    renderModal({
      primaryAction: customPrimary
    })

    const content = document.querySelector('.ahoy-modal-content') as HTMLElement
    fireEvent.keyDown(content, { key: 'Enter' })

    expect(customPrimary.onClick).not.toHaveBeenCalled()
  })
})
