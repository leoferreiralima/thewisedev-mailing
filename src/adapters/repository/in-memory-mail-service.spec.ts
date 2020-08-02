import { User } from '../../domain/user'
import { InMemoryUserRepository } from './in-memory-user-repository'
import { UserNotFoundError } from '../../usecase/port/errors/user-not-found-error'

describe('In memory User repository', () => {
  test('should throw error if user is not found', async () => {
    const users: User[] = []
    const userRepo = new InMemoryUserRepository(users)
    try {
      await userRepo.findUserByEmail('any_email@mail.com')
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFoundError)
    }
  })

  test('should return user if user is found', async () => {
    const users: User[] = [{ name: 'any_name', email: 'any_email@mail.com' }]
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('any_email@mail.com')
    expect(user.email).toEqual('any_email@mail.com')
  })

  test('should add user', async () => {
    const users: User[] = []
    const userRepo = new InMemoryUserRepository(users)
    await userRepo.add({ name: 'any_name', email: 'any_email@mail.com' })
    const user = await userRepo.findUserByEmail('any_email@mail.com')
    expect(user.email).toEqual('any_email@mail.com')
  })
})