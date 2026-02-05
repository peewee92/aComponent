# Ahoy BaseModal 组件测试用例文档

## A. 结构与布局
- 渲染后 DOM 层级严格为 Container → Header → Body → Footer
- Header 只包含标题；Footer 只包含按钮
- 单列结构，无额外列或浮动布局

## B. 容器与尺寸
- 默认宽度为 520px
- compact 变体宽度为 480px
- 无固定高度/最小高度，内容变长时高度自适应
- 圆角为 12px
- 内边距为 24px

## C. 标题规则
- 标题字体为 24px/32px，Bold
- 标题居中对齐
- 标题多行时行高不变
- 标题与 Body 间距为 16px

## D. Body 规则
- 正文字体为 14px/19px，Regular
- 长文本、多行文本不会破坏布局
- 强调文本仅改变字重/颜色，字号一致
- Body 与 Footer 间距为 24px

## E. Footer 与按钮
- 默认渲染 Secondary + Primary，两者顺序正确（左/右）
- 仅 Primary 时布局仍稳定
- 三按钮场景下顺序和间距正确
- 按钮间距为 12px
- 按钮高度 40px，横向 padding 16px
- 长标签不截断且不破坏布局

## F. 语义变体
- default / warning / destructive 仅影响 Primary 颜色与文案语气
- 变体不会改变结构、间距或布局
- destructive 可配置禁用遮罩点击关闭

## G. 交互
- ESC 关闭
- Enter 触发 Primary
- 点击遮罩关闭（可配置）
- Primary 异步时进入 Loading，成功后关闭

## H. 无障碍与可用性（建议）
- Modal 打开时聚焦锁定
- ESC 关闭可用
- Enter 触发 Primary 可用
- 关闭按钮（如存在）可键盘访问
