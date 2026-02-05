# Ahoy BaseModal 前端开发文档（中文）

## 0. 背景与依赖
- AhoyModal 基于 Ant Design 的 Modal 组件构建。
- 依赖版本：antd ^5.25.4。
- 在 antd 默认能力之上进行功能扩展与样式调整。

## 1. 目标与定位
- BaseModal 是全业务弹窗的基础组件，仅通过配置和 props 适配不同场景。
- 不允许为单一业务定制布局或间距，必须保持统一结构与节奏。

## 2. 固定结构（Layout Structure）
- 严格固定垂直层级，不允许跨区混排：
  1) Modal Container
  2) Header（仅标题）
  3) Body（描述/自定义内容）
  4) Footer（仅操作按钮）
- 仅允许单列布局，不支持多列或左右结构。
- 任一变体都必须保持结构一致。

## 3. 容器规则（Modal Container）
- 默认宽度：520px（modal-width-default）
- 紧凑宽度：480px（modal-width-compact）
- 圆角：radius-lg = 12px
- 内边距：space-6 = 24px
- 高度：内容自适应（无固定/最小高度）

## 4. 标题（Header）
- 字体：text-heading-sm（24px/32px，Bold）
- 居中对齐，支持单行/多行
- 标题与 Body 间距：space-4 = 16px

## 5. 正文（Body）
- 字体：text-body-md（14px/19px，Regular）
- 支持多行、长文本、动态实体名（强调样式仅改变字重/颜色）
- Body 与 Footer 间距：space-6 = 24px
- 上下间距固定，不因文本行数变化

## 6. Footer 操作区
- 按钮顺序：Secondary（Cancel）在左，Primary 在右
- 按钮间距：space-3 = 12px
- 支持组合：
  - 仅 Primary
  - Primary + Secondary（默认）
  - 三按钮（仅明确要求时）
- 按钮状态：Default / Disabled / Loading（异步必须支持）

## 7. 语义变体（Variant）
- default / warning / destructive
- 仅影响：
  - Primary 按钮颜色
  - 文案语气
  - 可选图标（如使用）
- 不允许改变布局或结构

## 8. 交互规则
- ESC 关闭
- Enter 触发 Primary
- 点击遮罩关闭（destructive 例外可禁用）
- Primary 支持同步关闭或等待异步成功后关闭（需 Loading）

## 9. 设计系统对齐
- 间距使用 spacing tokens
- 字体使用 system typography tokens
- 基于 Ant Design 默认值，除非明确覆盖

## 10. 设计验收标准
- 与文案、业务场景解耦
- 仅通过 title / description / variant / actions 配置
- 不允许为个案改布局或间距

---

# Ahoy BaseModal 设计 Token 规范（Web）

## Spacing
- Modal 内边距：space-6 = 24px
- Header → Body：space-4 = 16px
- Body → Footer：space-6 = 24px
- 按钮水平间距：space-3 = 12px
- Footer 顶部 padding：space-4 = 16px

## Typography（Nunito Sans）
- Title：text-heading-sm = 24px/32px，Bold，居中，多行支持
- Body：text-body-md = 14px/19px，Regular
- Button：text-button-md = 14px/19px，Medium

## Size
- modal-width-default = 520px
- modal-width-compact = 480px
- 高度：hug content

## Button
- btn-height-md = 40px
- 横向 padding：space-4 = 16px
- 宽度：自适应内容

## Radius
- radius-lg = 12px
