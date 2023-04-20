export function paymentStatusTranslate(status) {
  if (status === 'fully_paid') {
    return 'Fully paid'
  } else if (status === 'not_paid') {
    return 'Not paid'
  } else if (status === 'partially_paid') {
    return 'Partially paid'
  } else if (status === 'canceled') {
    return 'Canceled'
  }
}

export function paymentStatusColor(status) {
  if (status === 'fully_paid') {
    return 'bg-green-500 text-white'
  } else if (status === 'not_paid') {
    return 'bg-red-500 text-white'
  } else if (status === 'partially_paid') {
    return 'Partially paid'
  } else if (status === 'canceled') {
    return 'Canceled'
  }
}