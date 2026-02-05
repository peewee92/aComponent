import React from 'react'
import { Button, Modal, Typography } from 'antd'
import './AhoyModal.less'

export interface AhoyModalAction {
  /** Unique key for rendering lists of actions. */
  key: string
  /** Button label. */
  text: string
  /** Click handler for the action. */
  onClick: () => void
  /** Visual style of the action. */
  type?: 'primary' | 'default' | 'text'
  /** Marks the action as dangerous (e.g. delete). */
  danger?: boolean
  /** Loading state for the action. */
  loading?: boolean
  /** Disable the action button. */
  disabled?: boolean
}

export interface AhoyModalActionConfig {
  /** Button label. */
  text: string
  /** Click handler for the action. */
  onClick: () => void
  /** Marks the action as dangerous (e.g. delete). */
  danger?: boolean
  /** Loading state for the action. */
  loading?: boolean
  /** Disable the action button. */
  disabled?: boolean
}

export interface AhoyModalProps {
  /** Controls visibility of the modal. */
  open: boolean
  /** Modal title. */
  title?: React.ReactNode
  /** Optional supporting subtitle or description under the title. */
  subTitle?: React.ReactNode
  /** Main content area. Prefer children if both are provided. */
  content?: React.ReactNode
  /** Custom footer. Use false to hide footer entirely. */
  footer?: React.ReactNode | false
  /** Visual semantic variant. */
  variant?: 'default' | 'warning' | 'destructive'
  /** Size preset for modal width. */
  size?: 'default' | 'compact'
  /** Primary action configuration. */
  primaryAction?: AhoyModalActionConfig
  /** Secondary action configuration. */
  secondaryAction?: AhoyModalActionConfig
  /** Custom action list (overrides primary/secondary actions). */
  actions?: AhoyModalAction[]
  /** Fired when the user closes the modal. */
  onCancel?: () => void
  /** Modal width. */
  width?: number | string
  /** Shows the close icon. Default is false. */
  closable?: boolean
  /** Allows clicking on the mask to close. Default is false. */
  maskClosable?: boolean
  /** Whether to destroy child components when hidden. Default is true. */
  destroyOnClose?: boolean
  /** Additional class name for the modal root. */
  className?: string
  /** Optional body content via children. */
  children?: React.ReactNode
}

const { Title, Text } = Typography

type ResolvedPrimaryAction = {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
}

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  const tagName = target.tagName
  return tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT'
}

const AhoyModal: React.FC<AhoyModalProps> = ({
  open,
  title,
  subTitle,
  content,
  footer,
  variant = 'default',
  size = 'default',
  primaryAction,
  secondaryAction,
  actions,
  onCancel,
  width,
  closable = false,
  maskClosable,
  destroyOnClose = true,
  className,
  children
}) => {
  const resolvedPrimaryAction: ResolvedPrimaryAction | undefined = (() => {
    if (actions && actions.length > 0) {
      const primaryCandidate = actions.find((action) => action.type === 'primary')
      const candidate = primaryCandidate ?? actions[actions.length - 1]
      if (!candidate) return undefined
      return {
        onClick: candidate.onClick,
        disabled: candidate.disabled,
        loading: candidate.loading
      }
    }

    if (!primaryAction) return undefined

    return {
      onClick: primaryAction.onClick,
      disabled: primaryAction.disabled,
      loading: primaryAction.loading
    }
  })()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter') return
    if (isEditableTarget(event.target)) return
    if (!resolvedPrimaryAction) return
    if (resolvedPrimaryAction.disabled || resolvedPrimaryAction.loading) return

    resolvedPrimaryAction.onClick()
  }

  const renderActions = () => {
    if (footer !== undefined) return footer

    const list = actions && actions.length > 0
      ? actions.map((action) => (
          <Button
            key={action.key}
            className={`ahoy-modal-btn ${action.type === 'primary' ? 'ahoy-modal-btn--primary' : 'ahoy-modal-btn--secondary'}`}
            type={action.type === 'primary' ? 'primary' : action.type ?? 'default'}
            danger={action.danger}
            loading={action.loading}
            disabled={action.disabled}
            onClick={action.onClick}
          >
            {action.text}
          </Button>
        ))
      : [
          secondaryAction && (
            <Button
              key="secondary"
              className="ahoy-modal-btn ahoy-modal-btn--secondary"
              onClick={secondaryAction.onClick}
              disabled={secondaryAction.disabled}
            >
              {secondaryAction.text}
            </Button>
          ),
          primaryAction && (
            <Button
              key="primary"
              className="ahoy-modal-btn ahoy-modal-btn--primary"
              type="primary"
              danger={primaryAction.danger}
              loading={primaryAction.loading}
              disabled={primaryAction.disabled}
              onClick={primaryAction.onClick}
            >
              {primaryAction.text}
            </Button>
          )
        ].filter(Boolean)

    if (!list || list.length === 0) return null

    return <div className="ahoy-modal-footer">{list}</div>
  }

  const resolvedFooter = renderActions()
  const resolvedWidth = width ?? (size === 'compact' ? 480 : 520)
  const resolvedMaskClosable = maskClosable ?? variant !== 'destructive'
  const showBodyDescription = Boolean(subTitle)

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      closable={closable}
      maskClosable={resolvedMaskClosable}
      className={`ahoy-modal ahoy-modal--${variant}${className ? ` ${className}` : ''}`}
      footer={resolvedFooter}
      width={resolvedWidth}
      destroyOnHidden={destroyOnClose}
    >
      <div className="ahoy-modal-content" onKeyDown={handleKeyDown}>
        {title && (
          <div className="ahoy-modal-header">
            <Title level={3} className="ahoy-modal-title">
              {title}
            </Title>
          </div>
        )}
        <div className="ahoy-modal-body">
          {showBodyDescription && <Text className="ahoy-modal-description">{subTitle}</Text>}
          {children ?? content}
        </div>
      </div>
    </Modal>
  )
}

export default AhoyModal
