import '@element-plus/theme-chalk/src/base.scss'
import '@element-plus/theme-chalk/src/button.scss'
import type { ComponentSizes } from '@element-plus/constants'

export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  'text',
  '',
] as const
export type ButtonTypes = typeof buttonTypes[number]

export type ButtonProps = {
  children?: React.ReactNode
  size?: ComponentSizes
  type?: ButtonTypes
  plain?: boolean
  round?: boolean
  circle?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
} & Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    size,
    type,
    plain,
    round,
    circle,
    onClick,
    ...rest
  } = props
  const classNames = ['el-button', className]
  if (size) classNames.push(`el-button--${size}`)
  if (type) classNames.push(`el-button--${type}`)
  if (plain) classNames.push('is-plain')
  if (round) classNames.push('is-round')
  if (circle) classNames.push('is-circle')
  return (
    <button {...rest} className={classNames.join(' ')} onClick={onClick}>
      {children}
    </button>
  )
}
