import request from '@/utils/request'

export function fetchListUser() {
  return request({
    url: '/user',
    method: 'get',
  })
}

export function fetchRandomUser() {
  return request({
    url: '/user/random',
    method: 'get',
  })
}

export function fetchListUserAvailable(userUuid) {
  return request({
    url: '/user/available-user/' + userUuid,
    method: 'get',
  })
}

export function fetchMatchesUser(userUuid) {
  return request({
    url: '/user/matches-user/' + userUuid,
    method: 'get',
  })
}

export function fetchDetailUser(userUuid) {
  return request({
    url: '/user/' + userUuid,
    method: 'get',
  })
}
