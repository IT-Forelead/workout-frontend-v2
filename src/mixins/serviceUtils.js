export function durationDayTranslate(n) {
  if (n === 1) {
    return 'Bir kunlik'
  } else if (n === 30) {
    return 'Bir oylik'
  } else if (n === 90) {
    return 'Uch oylik'
  } else if (n === 180) {
    return 'Olti oylik'
  } else if (n === 365) {
    return 'Bir yillik'
  } else {
    return ' '
  }
}

export function monthlyVisitTranslate(n) {
  if (n === 30) {
    return 'har kuni'
  } else if (n === 15) {
    return '1/2'
  } else {
    return ' '
  }
}

export function serviceTypeTranslate(type) {
  if (type === 'usual') {
    return 'Odatiy'
  } else if (type === 'for_students') {
    return 'Talabalar uchun'
  } else if (type === 'for_kids') {
    return 'Bolalar uchun'
  } else {
    return ' '
  }
}