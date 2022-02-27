import classNames from 'classnames'
import type { ComponentSize } from '@element-plus/constants'

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
export type ButtonType = typeof buttonTypes[number]

export const buttonHtmlTypes = ['submit', 'button', 'reset'] as const
export type ButtonHtmlType = typeof buttonHtmlTypes[number]

export type ButtonProps = {
  children?: React.ReactNode
  size?: ComponentSize
  type?: ButtonHtmlType
  plain?: boolean
  round?: boolean
  circle?: boolean
  htmlType: ButtonHtmlType
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
  const classes = [
    'el-button',
    className,
    {
      [`el-button--${size}`]: !!size,
      [`el-button--${type}`]: !!type,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
    },
  ]

  return (
    <button {...rest} className={classNames(classes)} onClick={onClick}>
      {children}
    </button>
  )
}
