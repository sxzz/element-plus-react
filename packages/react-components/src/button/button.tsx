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

export interface ButtonProps {
  children?: any
  round?: boolean
  size?: ComponentSizes
  type?: ButtonTypes
  onClick?: () => void
}

export function Button(props: ButtonProps) {
  const classNames = ['el-button']
  // eslint-disable-next-line unicorn/explicit-length-check
  if (props.size) classNames.push(`el-button--${props.size}`)
  if (props.type) classNames.push(`el-button--${props.type}`)
  if (props.round) classNames.push('is-round')
  return (
    <button className={classNames.join(' ')} onClick={props.onClick}>
      {props.children}
    </button>
  )
}
