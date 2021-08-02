import {
  validateEmptyEmail,
  validateEmptyAndLength3
} from './validators'

describe('Validators utils', () => {
  it('should give an error with empty payload', () => {
    expect(validateEmptyAndLength3()).toBe('*Este campo é obrigatório')
  })

  it('should give an error with less than 3 characters payload', () => {
    expect(validateEmptyAndLength3('12')).toBe('*Este campo precisa de no mínimo 3 caracteres')
  })

  it('should return true when input pass a correct param', () => {
    expect(validateEmptyAndLength3('123')).toBe(true)
  })

  it('should give an error with empty payload', () => {
    expect(validateEmptyEmail()).toBe('*Este campo é obrigatório')
  })

  it('should give an error with a invalid param', () => {
    expect(validateEmptyEmail('benicrazy@')).toBe('*Este campo precisa ser um e-mail')
  })

  it('should return true when input be a correct param', () => {
    expect(validateEmptyEmail('benicrazy@uol.com')).toBe(true)
  })
})
