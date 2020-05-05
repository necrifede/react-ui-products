const payloadIndex = 1

export const getUser = () => {
  const strToken = localStorage.getItem('token')
  if (!strToken) {
    return undefined
  }
  const [, token] = strToken.split(' ')
  if (!token) {
    return undefined
  }
  // TODO: check atob functions, and JSON.parse
  const { sub: id, name } = JSON.parse(atob(token.split('.')[payloadIndex]))
  return { id, name }
}

export const getUserId = () => getUser().id
export const getUserName = () => getUser().name
export const isUserLogged = () => !!getUser()
export const logOut = () => localStorage.removeItem('token')
