import * as t from './actionTypes'
import { colorHelpers } from '../../utils/color-helper'

const initialState = {
  customers: [],
  customer: null,
  users: [],
  userDetail: {
    userRoles: [],
    userAddressList: [],
  },
  userAddressList: [],
  userAddressDetail: null,
  userApplicationRole: null,
  userRoles: [],
  userRoleDetail: {},
  userRoleMapping: null,
  permissions: [],
  isFetched: false,
  isFetching: false,
  isSaving: false,
  errorFetch: null,
  errorUpdate: null,
  selectedId: 'all',
  itemsPerPage: 5,
  totalPages: 0,
  isRedirect: false,
  clientApps: [],
  eligibilities: [],
  rewardEligibilities: [],
  rewardEligibilityDetail: null,
  itemsPerPageReward: 100,
}

const convertToUserDetail = (data, userRoles) => {
  let allUserRoles = []
  if (!data.userDto) {
    return {}
  }

  if (data.userDto.authorities) {
    data.userDto.authorities.forEach((role) => {
      role.selected = false
      role.value = role.name
      role.label = role.name
      role.category = 'effectiveRoles'
      allUserRoles.push(role)
    })
  }

  let accountStatus = data.userDto.accountStatus || ''
  if (accountStatus.length > 0) {
    accountStatus = accountStatus
      .split(' ')
      .map((str) => {
        const word = str.toLowerCase()
        return word.charAt(0).toUpperCase() + word.slice(1)
      })
      .join(' ')
  }

  userRoles.forEach((role) => {
    role.selected = false
    role.category = 'availableRoles'
    const selectedRoleIndex = allUserRoles.findIndex((r) => r.name === role.name)
    if (selectedRoleIndex === -1) {
      allUserRoles.push(role)
    }
  })

  return {
    id: data.userDto.id,
    username: data.userDto.email,
    userRoles: allUserRoles,
    email: data.userDto.email,
    firstName: data.userDto.firstName,
    lastName: data.userDto.lastName,
    userStatus: {
      value: accountStatus,
      label: accountStatus,
      color: colorHelpers.getColorByStatus(accountStatus, true),
    },
    gender: data.userProfileDto.gender,
    mobilePhone: data.userProfileDto.phone,
    birthDate: data.userProfileDto.birthDate,
    userAddressList: data.userAddressList,
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case t.GET_ALL_ELIGIBILITY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.GET_ALL_ELIGIBILITY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        eligibilities: action.response.data,
        totalPages: Math.ceil(action.response.headers['x-total-count'] / state.itemsPerPage),
      })
    case t.GET_ALL_ELIGIBILITY_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.GET_ALL_PUBLIC_ELIGIBILITY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.GET_ALL_PUBLIC_ELIGIBILITY_SUCCESS:
      const list = action.response.data.map((eligibility) => {
        return {
          id: eligibility.id,
          phone: eligibility.phone,
          fullName: eligibility.fullName,
          address: eligibility.fullAddress,
          company: eligibility.company || eligibility.otherCompany,
          ssn: eligibility.ssn,
          employeeId: eligibility.employeeId,
        }
      })
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        rewardEligibilities: list,
        totalPages: Math.ceil(action.response.headers['x-total-count'] / state.itemsPerPageReward),
      })
    case t.GET_ALL_PUBLIC_ELIGIBILITY_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.GET_PUBLIC_ELIGIBILITY_DETAIL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.GET_PUBLIC_ELIGIBILITY_DETAIL_SUCCESS:
      const customer = action.rewardEligibilityDetail
      const eligibility = customer.eligibility
      const metadata =
        customer.metadata && action.rewardEligibilityDetail.metadata.length > 0
          ? customer.metadata[0]
          : {}
      const progress = customer.progress && customer.progress.length > 0 ? customer.progress[0] : {}

      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        rewardEligibilityDetail: {
          id: eligibility.id,
          phone: eligibility.phone,
          fullName: eligibility.fullName,
          address: eligibility.fullAddress,
          company: eligibility.company || eligibility.otherCompany,
          ssn: eligibility.ssn,
          employeeId: eligibility.employeeId,
          ssnURL: metadata.thumbUrl || '',
          rewardCode: progress.code.toUpperCase() || '',
          hasPresent: progress.hasPresent || false,
        },
      })
    case t.GET_PUBLIC_ELIGIBILITY_DETAIL_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.CREATE_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.CREATE_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        userDetail: action.userDetail,
      })
    case t.CREATE_USER_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.UPDATE_USER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.UPDATE_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        userDetail: convertToUserDetail(action.userDetail, state.userRoles),
      })
    case t.UPDATE_USER_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.USERS_GET_ALL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.USERS_GET_ALL_SUCCESS:
      const items = action.response.data || []
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        totalPages: Math.ceil(action.response.headers['x-total-count'] / state.itemsPerPage),
        itemsPerPage: action.response.size,
        users: items,
      })
    case t.USERS_GET_ALL_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.CUSTOMERS_GET_ALL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.CUSTOMERS_GET_ALL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        customers: action.customers,
      })
    case t.CUSTOMERS_GET_ALL_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.CUSTOMER_DETAIL_GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.CUSTOMER_DETAIL_GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        customer: action.customer,
      })
    case t.CUSTOMER_DETAIL_GET_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.USER_DETAIL_GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.USER_DETAIL_GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        userDetail: convertToUserDetail(action.userDetail, state.userRoles),
      })
    case t.USER_DETAIL_GET_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })

    case t.USER_ROLES_GET_ALL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case t.USER_ROLES_GET_ALL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        userRoleDetail: {}, // reset detail item
        userRoles: action.response.data,
        userDetail: {
          userRoles: [],
          userAddressList: [],
        },
        totalPages: Math.ceil(action.response.headers['x-total-count'] / state.itemsPerPage),
      })
    case t.USER_ROLES_GET_ALL_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.USER_ROLE_DETAIL_GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isRedirect: false,
      })
    case t.USER_ROLE_DETAIL_GET_SUCCESS:
      const allRoles = state.userRoles
      allRoles.forEach((role) => {
        role.selected = false
        role.category = action.userRole.effectiveRoles.includes(role.name)
          ? 'effectiveRoles'
          : 'availableRoles'
      })

      state.permissions.forEach((parent) => {
        parent.children.forEach((child) => {
          const foundChild = action.userRole.availablePrivileges.find((c) => c.name === child.name)
          child.checked = foundChild ? foundChild.selected : false
        })
      })
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        userRoles: allRoles,
        userRoleDetail: action.userRole,
      })
    case t.USER_ROLE_DETAIL_GET_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.CREATE_USER_ROLES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isRedirect: false,
      })
    case t.CREATE_USER_ROLES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        isRedirect: true,
      })
    case t.CREATE_USER_ROLES_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })

    case t.EDIT_USER_ROLES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isRedirect: false,
      })
    case t.EDIT_USER_ROLES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        isRedirect: true,
      })
    case t.EDIT_USER_ROLES_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.PERMISSION_GET_ALL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
      })
    case t.PERMISSION_GET_ALL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        permissions: action.permissions,
      })
    case t.PERMISSION_GET_ALL_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.UPDATE_USER_ADDRESS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
      })
    case t.UPDATE_USER_ADDRESS_SUCCESS:
      const currentUserDetail = state.userDetail
      currentUserDetail.userAddressList = action.addressBook
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        userDetail: currentUserDetail,
      })
    case t.USERS_GET_ADDRESS_BOOKS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
      })
    case t.USERS_GET_ADDRESS_BOOKS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        userAddressList: action.userAddressList,
      })
    case t.USERS_GET_ADDRESS_BOOKS_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.USERS_GET_ADDRESS_BOOK_BY_ID_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
      })
    case t.USERS_GET_ADDRESS_BOOK_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        userAddressDetail: action.userAddressDetail,
      })
    case t.USERS_GET_ADDRESS_BOOK_BY_ID_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.CREATE_USER_ADDRESS_BOOK_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
      })
    case t.CREATE_USER_ADDRESS_BOOK_SUCCESS:
      state.userAddressList.push(action.userAddressDetail)
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        userAddressDetail: action.userAddressDetail,
      })
    case t.CREATE_USER_ADDRESS_BOOK_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.UPDATE_USER_ADDRESS_BOOK_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
      })
    case t.UPDATE_USER_ADDRESS_BOOK_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        userAddressDetail: action.userAddressDetail,
      })
    case t.UPDATE_USER_ADDRESS_BOOK_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.DELETE_USER_ADDRESS_BOOK_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
      })
    case t.DELETE_USER_ADDRESS_BOOK_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
      })
    case t.DELETE_USER_ADDRESS_BOOK_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.GET_CLIENT_APPS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
      })
    case t.GET_CLIENT_APPS_SUCCESS:
      if (action.clientApps && action.clientApps.length > 0) {
        action.clientApps.forEach((app) => {
          app.label = app.name
          app.value = app.id
        })
      }
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        clientApps: action.clientApps,
      })
    case t.GET_CLIENT_APPS_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })

    case t.CREATE_USER_ROLE_MAPPING_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
      })
    case t.CREATE_USER_ROLE_MAPPING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        userRoleMapping: action.userRoleMapping,
      })
    case t.CREATE_USER_ROLE_MAPPING_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    case t.UPDATE_USER_APPLICATION_ROLE_LOCAL_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
      })
    case t.UPDATE_USER_APPLICATION_ROLE_LOCAL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        userApplicationRole: action.applicationRole,
      })
    case t.UPDATE_USER_APPLICATION_ROLE_LOCAL_FAILURE:
      return Object.assign({}, state, {
        errorFetch: action.error,
      })
    default:
      return state
  }
}

export default userReducer
