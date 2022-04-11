import request from '@/utils/request'

export function fetchListUser(query = {limit: 20}) {
  return request({
    url: '/user',
    method: 'get',
    params: query,
  })
}
