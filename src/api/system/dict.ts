import { http } from '@/utils/request'

interface DictResult {
  dictLabel: string
  dictValue: string
}

export function getDictByTypeApi(dictType: string) {
  return http.Get<DictResult[]>(dictType)
}
