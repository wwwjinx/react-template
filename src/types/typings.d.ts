// 全局要用的类型放到这里

declare global {
  interface Option {
    label: string
    value: string | number
    [key: string]: any
  }

  type Fn = (...arg: any[]) => void

  type Obj = Record<string, any>
}

export {} // 防止模块污染
