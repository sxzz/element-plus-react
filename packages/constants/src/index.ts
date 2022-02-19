export const componentSizes = ['default', 'small', 'large'] as const
export type ComponentSizes = typeof componentSizes[number]

export const isDev = typeof __DEV__ !== 'undefined' ? __DEV__ : false
