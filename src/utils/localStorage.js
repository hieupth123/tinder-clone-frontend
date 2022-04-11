
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify({
    data: data,
  }))
}

export function getLocalStorage(key) {
  if (!key) {
    return null
  }

  const {data } = JSON.parse(localStorage.getItem(key) || '{}')
  if (!data ) {
    return null
  }

  return data
}

export function remove(key) {
  return localStorage.removeItem(key)
}


