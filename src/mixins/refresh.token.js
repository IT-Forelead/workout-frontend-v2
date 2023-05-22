import mem from 'mem'

async function refreshTokenFn() {
  const oldSession = JSON.parse(localStorage.getItem('session'))

  try {
    /* REFRESH TOKEN REQUEST */
    const response = await axios.get('/auth/refresh', {
      headers: {
        Authorization: oldSession?.refreshToken,
      },
    })

    const { session } = response.data

    if (!session?.accessToken) {
      localStorage.removeItem('session')
      localStorage.removeItem('user')
    }

    localStorage.setItem('session', JSON.stringify(session))

    return session
  } catch (error) {
    localStorage.removeItem('session')
    localStorage.removeItem('user')
  }
}

const maxAge = 10000

export const memorizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
})
