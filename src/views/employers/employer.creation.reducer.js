import { employerConstants } from '../../constants/index'

export function employerCreation(state = {}, action) {
  switch (action.type) {
    case employerConstants.CREATE_EMPLOYER_REQUEST:
      return { ...state, creating: true, success: false }
    case employerConstants.CREATE_EMPLOYER_SUCCESS:
      return { ...state, creating: false, success: true }
    case employerConstants.CREATE_EMPLOYER_FAILURE:
      return { ...state, creating: false, success: false }
    default:
      return state
  }
}
