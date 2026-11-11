import { http } from '@/utils/request'

export * from './login'
export * from './system'

export function testApi(data: Obj) {
  return http.Post('/test', {
    test: 'wwwwj test api',
    ...data,
  })
}
