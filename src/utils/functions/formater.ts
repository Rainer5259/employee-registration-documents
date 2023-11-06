import { InputType } from '../types'

const formatDate = (value: string): string => {
  const dateRegex = /^(\d{0,2})(\/)?(\d{0,2})?(\/)?(\d{0,4})?$/

  if (!dateRegex.test(value)) {
    return value.slice(0, -1)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fullMatch, day, slash1, month, slash2, year] =
    value.match(dateRegex) || []

  const currentYear = new Date().getFullYear()
  const parsedDay = parseInt(day || '0')
  const parsedMonth = parseInt(month || '0')
  const parsedYear = parseInt(year || '0')

  const isValidDay = parsedDay >= 1 && parsedDay <= 31
  const isValidMonth = parsedMonth >= 1 && parsedMonth <= 12
  const isValidYear = parsedYear >= 1900 && parsedYear <= currentYear

  if (isValidDay && isValidMonth && isValidYear) {
    const months: { [key: string]: string } = {
      '01': 'jan',
      '02': 'fev',
      '03': 'mar',
      '04': 'abr',
      '05': 'mai',
      '06': 'jun',
      '07': 'jul',
      '08': 'ago',
      '09': 'set',
      '10': 'out',
      '11': 'nov',
      '12': 'dez'
    }

    const formattedMonth = isValidMonth ? month : ''

    return `${day}/${months[formattedMonth] || ''}/${year}`
  }

  return value
}

const formatPhoneNumber = (value: string): string => {
  const formattedPhone = value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2 ')
    .replace(/(\d{4})(\d)/, '$1-$2')
  return formattedPhone
}

const formatCurrency = (value: string) => {
  const number = value.replace(/\D/g, '')

  if (isNaN(parseFloat(number))) {
    return ''
  }

  const formattedCurrency = (parseFloat(number) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  return formattedCurrency
}

export const formatInputValue = (value: string, type: InputType): string => {
  switch (type) {
    case 'date':
      return formatDate(value)

    case 'phoneNumber':
      return formatPhoneNumber(value)

    case 'BRLcurrency':
      return formatCurrency(value)
    default:
      return value
  }
}
