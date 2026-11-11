import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { ApiResponse, RequestConfig as BaseRequestConfig, RequestMeta } from './type'
import { redirect } from '@tanstack/react-router'
import axios from 'axios'
import { getToken } from '@/utils/handleToken'
import { stringifyQuery } from './tools/queryString'
import { ContentTypeEnum, ResultEnum, ShowMessage } from './type'

export type { RequestMeta }

export interface RequestConfig extends AxiosRequestConfig, Omit<BaseRequestConfig, 'headers' | 'params' | 'timeout'> {
  meta?: RequestMeta
}

type InterceptorsConfig = InternalAxiosRequestConfig & RequestConfig

interface InterceptorsResponse extends AxiosResponse {
  config: InterceptorsConfig
}

export const baseURL = import.meta.env.VITE_BASE_URL

function shouldAttachToken(config: RequestConfig): boolean {
  if (config.meta?.ignoreAuth === true)
    return false
  return true
}

function shouldNotify(config: RequestConfig): boolean {
  if (config.meta?.hideNotify === true )
    return false
  return true
}

export const axiosInstance = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    'Content-Type': ContentTypeEnum.JSON,
    'Accept': 'application/json, text/plain, */*',
  },
  paramsSerializer: {
    serialize: params => stringifyQuery((params ?? {}) as Obj),
  },
})

axiosInstance.interceptors.request.use(
  (config: InterceptorsConfig) => {
    if (shouldAttachToken(config)) {
      const token = getToken()
      if (token)
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error(error)
    throw error
  },
)

axiosInstance.interceptors.response.use(
  (response: InterceptorsResponse) => {
    const meta = response.config.meta ?? {}

    if (meta.rawResponse === true)
      return response

    if (meta.resType === 'blob' || response.data instanceof Blob)
      return response.data
    if (meta.resType === 'text')
      return response.data

    const payload = response.data as ApiResponse
    const { code, msg, data } = payload

    if (code !== ResultEnum.Success0 && code !== ResultEnum.Success200) {
      if (code === ResultEnum.Unauthorized && window.location.pathname !== import.meta.env.VITE_LOGIN_URL)
        throw redirect({ to: import.meta.env.VITE_LOGIN_URL })
      if (shouldNotify(response.config))
        console.error(`${msg}`)
      throw new Error(`请求失败 ${code}, ${msg}`)
    }

    return (meta.originalRes ? payload : data)
  },
  (error) => {
    console.error(error)
    if (axios.isAxiosError(error) && (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT'))
      throw new Error(ShowMessage(ResultEnum.RequestTimeout))
    if (axios.isAxiosError(error) && error.response)
      throw new Error(ShowMessage(error.response.status) || `HTTP请求错误[${error.response.status}]`)
    throw error
  },
)

export function request<T = unknown>(config: RequestConfig) {
  return axiosInstance.request<unknown, T>(config)
}

export default request
