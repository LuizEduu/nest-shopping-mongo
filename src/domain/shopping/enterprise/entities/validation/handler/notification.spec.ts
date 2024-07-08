import { InvalidEmailError, InvalidNameLengthError } from '../../../errors'
import { Notification } from './notification'

describe('notification handler', () => {
  let sut: Notification

  beforeEach(() => {
    sut = Notification.create()
  })

  it('should be able to add error in notification list', () => {
    sut.add(new InvalidNameLengthError('invalid length error'))

    expect(sut.hasError()).toBe(true)
    expect(sut.getErrors()).toHaveLength(1)
  })

  it('should be able to add an errors in notification list', () => {
    sut.add(new InvalidNameLengthError('invalid length'))
    sut.add(new InvalidEmailError())

    expect(sut.hasError()).toBe(true)
    expect(sut.getErrors()).toHaveLength(2)
  })

  it('should be able to instance new notification list when error', () => {
    sut = Notification.create(new Error('an error'))

    expect(sut.hasError()).toBe(true)
    expect(sut.getErrors()).toHaveLength(1)
  })
})
