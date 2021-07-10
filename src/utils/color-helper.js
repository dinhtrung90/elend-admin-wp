const getColorByStatus = (status, isHex) => {
  switch (status.toLowerCase()) {
    case 'active':
      return isHex ? '#2eb85c' : 'success'
    case 'inactive':
      return isHex ? '#636f83' : 'secondary'
    case 'pending':
      return isHex ? '#f9b115' : 'warning'
    case 'banned':
      return isHex ? '#e55353' : 'danger'
    default:
      return isHex ? '#ced2d8' : 'primary'
  }
}

export const colorHelpers = {
  getColorByStatus,
}
