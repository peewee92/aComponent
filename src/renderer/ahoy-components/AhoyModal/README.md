# AhoyModal

Ahoy design system modal wrapper on top of antd `Modal`.

## When to use
- Standard confirmation and form modals in admin flows.
- Any modal that needs consistent title, body, and action layout.

## Props overview
- `open`: controls visibility.
- `title`, `subTitle`: header content.
- `content` or `children`: body content.
- `primaryAction`, `secondaryAction`: default footer buttons.
- `actions`: custom button list (overrides primary/secondary).
- `footer`: custom footer or `false` to hide.

## Basic usage
```tsx
import AhoyModal from '@renderer/ahoy-components/AhoyModal'

<AhoyModal
  open={open}
  title="Reset employee password?"
  onCancel={onCancel}
  primaryAction={{ text: 'Reset', onClick: handleSubmit, loading: submitting }}
  secondaryAction={{ text: 'Cancel', onClick: onCancel, disabled: submitting }}
>
  <Form>{/* ... */}</Form>
</AhoyModal>
```

## Custom actions
```tsx
<AhoyModal
  open={open}
  title="Archive employee"
  actions={[
    { key: 'cancel', text: 'Cancel', onClick: onCancel },
    { key: 'archive', text: 'Archive', type: 'primary', onClick: onArchive, danger: true }
  ]}
>
  <p>Are you sure?</p>
</AhoyModal>
```
