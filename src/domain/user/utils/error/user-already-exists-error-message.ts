import { UseCaseError } from '@/core/errors/use-case-error'

export class UserAlreadyExistsErrorMessage extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User with email "${identifier}" already exists.`)
  }
}
