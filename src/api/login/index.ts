import { http } from '@/utils/request'

export interface LoginParams {

}

export function loginApi(data: LoginParams) {
  return http.Post('/login', data)
}
