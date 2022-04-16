import request from '@/utils/request'

export function likedUser(userUuid, guestUuid) {
  return request({
    url: `/user-action/like/${userUuid}/${guestUuid}`,
    method: 'put',
  })
}

export function passUser(userUuid, guestUuid) {
  return request({
    url: `/user-action/pass/${userUuid}/${guestUuid}`,
    method: 'put',
  })
}

export function fetchLikedUser(userUuid) {
  return request({
    url: '/user-action/liked/' + userUuid,
    method: 'get',
  })
}
