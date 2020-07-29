import userService from '@services/userService'
const { getUser, getUsers } = userService

describe('When JsonPlaceHolder fetch is done', () => {
  it('should receive all users', async () => {
    const users = await getUsers()
    expect(users).toBeTruthy()
  })

  it('should receive a single user with id 1', async () => {
    const user = await getUser('1')
    expect(user).toMatchObject({ id: 1 })
  })
})
