import React from 'react'
import { useArgs } from '@storybook/preview-api'
import AhoyModal from './AhoyModal'

const useClosableArgs = (args) => {
  const [, updateArgs] = useArgs()
  const close = () => updateArgs({ open: false })
  return {
    ...args,
    onCancel: close,
    maskClosable: true,
    primaryAction: args.primaryAction
      ? { ...args.primaryAction, onClick: close }
      : undefined,
    secondaryAction: args.secondaryAction
      ? { ...args.secondaryAction, onClick: close }
      : undefined,
    actions: args.actions
      ? args.actions.map((action) => ({ ...action, onClick: close }))
      : undefined
  }
}

const meta = {
  title: 'Ahoy/AhoyModal',
  component: AhoyModal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Ahoy 设计系统基础弹窗组件，基于 Ant Design Modal 扩展实现。用于标准确认、警告、删除等场景。'
      }
    }
  },
  args: {
    open: false,
    title: 'Archive employee?',
    subTitle: 'This action cannot be undone.',
    primaryAction: { text: 'Archive', onClick: () => {} },
    secondaryAction: { text: 'Cancel', onClick: () => {} }
  },
  argTypes: {
    open: { control: 'boolean' }
  }
}

export default meta

export const Default = {
  args: {
    open: true
  },
  render: (args) => {
    const closableArgs = useClosableArgs(args)
    return <AhoyModal {...closableArgs} />
  },
  parameters: {
    docs: {
      description: {
        story: '默认语义弹窗（default）。包含标题、描述、主/次按钮。用于常规确认。'
      }
    }
  }
}

export const Compact = {
  args: {
    open: true,
    size: 'compact'
  },
  render: (args) => <AhoyModal {...useClosableArgs(args)} />,
  parameters: {
    docs: {
      description: {
        story: '紧凑宽度（480px），用于短文本确认场景。'
      }
    }
  }
}

export const Warning = {
  args: {
    open: true,
    variant: 'warning',
    primaryAction: { text: 'Proceed', onClick: () => {} }
  },
  render: (args) => <AhoyModal {...useClosableArgs(args)} />,
  parameters: {
    docs: {
      description: {
        story: '警告语义（warning），主按钮强调色变化，适用于风险提示操作。'
      }
    }
  }
}

export const Destructive = {
  args: {
    open: true,
    variant: 'destructive',
    primaryAction: { text: 'Delete permanently', onClick: () => {} }
  },
  render: (args) => <AhoyModal {...useClosableArgs(args)} />,
  parameters: {
    docs: {
      description: {
        story: '危险语义（destructive），主按钮红色；默认禁用遮罩点击关闭。'
      }
    }
  }
}

export const LongCopy = {
  args: {
    open: true,
    title: 'Archive this employee and remove them from all current projects?',
    subTitle: 'This will revoke access, remove scheduling assignments, and notify the team. Long entity names should wrap naturally without breaking layout.'
  },
  render: (args) => <AhoyModal {...useClosableArgs(args)} />,
  parameters: {
    docs: {
      description: {
        story: '长文案与多行标题场景，验证排版和垂直节奏稳定性。'
      }
    }
  }
}

export const LongButtons = {
  args: {
    open: true,
    primaryAction: { text: 'Delete permanently', onClick: () => {} },
    secondaryAction: { text: 'Keep for now', onClick: () => {} }
  },
  render: (args) => <AhoyModal {...useClosableArgs(args)} />,
  parameters: {
    docs: {
      description: {
        story: '长按钮文案场景，验证按钮宽度自适应与布局稳定性。'
      }
    }
  }
}

export const ThreeButtons = {
  args: {
    open: true,
    actions: [
      { key: 'cancel', text: 'Cancel', onClick: () => {} },
      { key: 'archive', text: 'Archive', onClick: () => {} },
      { key: 'delete', text: 'Delete', type: 'primary', onClick: () => {}, danger: true }
    ]
  },
  render: (args) => <AhoyModal {...useClosableArgs(args)} />,
  parameters: {
    docs: {
      description: {
        story: '三按钮场景（仅在明确需求下使用），验证顺序与间距。'
      }
    }
  }
}

export const WithCustomBody = {
  args: {
    open: true,
    subTitle: 'Update settings before continuing.'
  },
  render: (args) => (
    <AhoyModal {...useClosableArgs(args)}>
      <div style={{ textAlign: 'center' }}>Custom body content goes here.</div>
    </AhoyModal>
  ),
  parameters: {
    docs: {
      description: {
        story: '自定义内容场景，Body 替换为自定义组件或表单内容。'
      }
    }
  }
}
