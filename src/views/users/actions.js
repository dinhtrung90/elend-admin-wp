import * as t from './actionTypes'
import customersData from './components/UsersData'
import { userService } from '../../services/user.service'
import { USERS_GET_ADDRESS_BOOK_BY_ID_FAILURE } from './actionTypes'

export const userActions = {
  getAllUsers,
  createUser,
  updateUser,
  getUserDetail,
  createUserRole,
  editUserRole,
  deleteUserRole,
  getAllUserRoles,
  getUserRoleDetail,
  getAllPermissions,
  getAllCustomers,
  getCustomerDetail,
  _updateUserAddressList,
  getUserAddressBooks,
  getUserAddressById,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress,
}

function getAllUsers(data) {
  return (dispatch) => {
    dispatch(request())
    return userService
      .getAllUsers(data)
      .then((response) => {
        response.size = data.size || 5
        dispatch(success(response))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.USERS_GET_ALL_REQUEST }
  }

  function success(response) {
    return { type: t.USERS_GET_ALL_SUCCESS, response }
  }

  function failure(error) {
    return { type: t.USERS_GET_ALL_FAILURE, error }
  }
}

function createUser(data) {
  return (dispatch) => {
    dispatch(request(data))
    return userService
      .createAccount(data)
      .then((response) => {
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.CREATE_USER_REQUEST }
  }

  function success(userDetail) {
    return { type: t.CREATE_USER_SUCCESS, userDetail }
  }

  function failure(error) {
    return { type: t.CREATE_USER_FAILURE, error }
  }
}

function updateUser(data) {
  return (dispatch) => {
    dispatch(request(data))
    return userService
      .updateAccount(data)
      .then((response) => {
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.UPDATE_USER_REQUEST }
  }

  function success(userDetail) {
    return { type: t.UPDATE_USER_SUCCESS, userDetail }
  }

  function failure(error) {
    return { type: t.UPDATE_USER_FAILURE, error }
  }
}

function getAllCustomers() {
  return (dispatch) => {
    dispatch(request())
    return dispatch(success(customersData))
  }

  function request() {
    return { type: t.CUSTOMERS_GET_ALL_REQUEST }
  }

  function success(customers) {
    return { type: t.CUSTOMERS_GET_ALL_SUCCESS, customers }
  }

  function failure(error) {
    return { type: t.CUSTOMERS_GET_ALL_FAILURE, error }
  }
}

function getCustomerDetail(customerId) {
  const item = customersData.find((user) => user.id.toString() === customerId)
  return (dispatch) => {
    dispatch(request())
    dispatch(success(item))
  }

  function request() {
    return { type: t.CUSTOMER_DETAIL_GET_REQUEST }
  }

  function success(customer) {
    return { type: t.CUSTOMER_DETAIL_GET_SUCCESS, customer }
  }

  function failure(error) {
    return { type: t.CUSTOMER_DETAIL_GET_FAILURE, error }
  }
}

function getUserDetail(userId) {
  return (dispatch) => {
    dispatch(request())
    return userService
      .getUserById(userId)
      .then((response) => {
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.USER_DETAIL_GET_REQUEST }
  }

  function success(userDetail) {
    return { type: t.USER_DETAIL_GET_SUCCESS, userDetail }
  }

  function failure(error) {
    return { type: t.USER_DETAIL_GET_FAILURE, error }
  }
}

function createUserRole(userRole) {
  return (dispatch) => {
    dispatch(request(userRole))
    return userService
      .createUserRole(userRole)
      .then((response) => {
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.CREATE_USER_ROLES_REQUEST }
  }

  function success(userRoles) {
    return { type: t.CREATE_USER_ROLES_SUCCESS, userRoles }
  }

  function failure(error) {
    return { type: t.CREATE_USER_ROLES_FAILURE, error }
  }
}

function editUserRole(userRole) {
  return (dispatch) => {
    dispatch(request(userRole))
    return userService
      .editUserRole(userRole)
      .then((response) => {
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.EDIT_USER_ROLES_REQUEST }
  }

  function success(userRoles) {
    return { type: t.EDIT_USER_ROLES_SUCCESS, userRoles }
  }

  function failure(error) {
    return { type: t.EDIT_USER_ROLES_FAILURE, error }
  }
}

function deleteUserRole(roleName) {
  return (dispatch) => {
    dispatch(request(roleName))
    return userService
      .deleteUserRole(roleName)
      .then((response) => {
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.DELETE_USER_ROLES_REQUEST }
  }

  function success(item) {
    return { type: t.DELETE_USER_ROLES_SUCCESS, item }
  }

  function failure(error) {
    return { type: t.DELETE_USER_ROLES_FAILURE, error }
  }
}

function getAllUserRoles(data) {
  return (dispatch) => {
    dispatch(request())
    return userService
      .getAllUserRoles(data)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          response.data.forEach((item) => {
            item.description = item.description || ''
          })
        }
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.USER_ROLES_GET_ALL_REQUEST }
  }

  function success(userRoles) {
    return { type: t.USER_ROLES_GET_ALL_SUCCESS, userRoles }
  }

  function failure(error) {
    return { type: t.USER_ROLES_GET_ALL_FAILURE, error }
  }
}

function getUserRoleDetail(roleName) {
  return (dispatch) => {
    dispatch(request())
    return userService
      .getUserRoleDetail(roleName)
      .then((response) => {
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.USER_ROLE_DETAIL_GET_REQUEST }
  }

  function success(userRole) {
    return { type: t.USER_ROLE_DETAIL_GET_SUCCESS, userRole }
  }

  function failure(error) {
    return { type: t.USER_ROLE_DETAIL_GET_FAILURE, error }
  }
}

function _standardizePermissions(data) {
  const operations = ['CREATE', 'UPDATE', 'DELETE', 'READ']
  const permissions = []
  data.forEach((p) => {
    const parent = p
    parent.children = []
    operations.forEach((o) => {
      const descriptionCase = `${p.description} ${o.toLocaleLowerCase()}`
        .split(' ')
        .map((str) => {
          const word = str.toLowerCase()
          return word.charAt(0).toUpperCase() + word.slice(1)
        })
        .join(' ')
      parent.children.push({
        id: p.id,
        permissionId: p.id,
        name: `${p.name}_${o}`,
        description: descriptionCase,
        permissionDesc: p.description,
        value: o,
        permissionName: p.name,
      })
    })
    permissions.push(parent)
  })
  return permissions
}

function getAllPermissions() {
  return (dispatch) => {
    dispatch(request())
    return userService
      .getAllPermissions()
      .then((response) => {
        dispatch(success(_standardizePermissions(response.data)))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.PERMISSION_GET_ALL_REQUEST }
  }

  function success(permissions) {
    return { type: t.PERMISSION_GET_ALL_SUCCESS, permissions }
  }

  function failure(error) {
    return { type: t.PERMISSION_GET_ALL_FAILURE, error }
  }
}

function _updateUserAddressList(addressList) {
  return (dispatch) => {
    dispatch(request())
    dispatch(success(addressList))
  }

  function request() {
    return { type: t.UPDATE_USER_ADDRESS_REQUEST }
  }

  function success(addressBook) {
    return { type: t.UPDATE_USER_ADDRESS_SUCCESS, addressBook }
  }

  function failure(error) {
    return { type: t.UPDATE_USER_ADDRESS_FAILURE, error }
  }
}

function getUserAddressBooks(data) {
  return (dispatch) => {
    dispatch(request())
    return userService
      .getUserAddressBooks(data)
      .then((response) => {
        response.size = data.size || 5
        dispatch(success(response))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.USERS_GET_ADDRESS_BOOKS_REQUEST }
  }

  function success(response) {
    return { type: t.USERS_GET_ADDRESS_BOOKS_SUCCESS, response }
  }

  function failure(error) {
    return { type: t.USERS_GET_ADDRESS_BOOKS_FAILURE, error }
  }
}

function getUserAddressById(addressId) {
  return (dispatch) => {
    dispatch(request())
    return userService
      .getUserAddressBookById(addressId)
      .then((response) => {
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.USERS_GET_ADDRESS_BOOK_BY_ID_REQUEST }
  }

  function success(response) {
    return { type: t.USERS_GET_ADDRESS_BOOK_BY_ID_SUCCESS, response }
  }

  function failure(error) {
    return { type: t.USERS_GET_ADDRESS_BOOK_BY_ID_FAILURE, error }
  }
}

function createUserAddress(data) {
  return (dispatch) => {
    dispatch(request(data))
    return userService
      .createUserAddressBook(data)
      .then((response) => {
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.CREATE_USER_ADDRESS_BOOK_REQUEST }
  }

  function success(userAddressDetail) {
    return { type: t.CREATE_USER_ADDRESS_BOOK_SUCCESS, userAddressDetail }
  }

  function failure(error) {
    return { type: t.CREATE_USER_ADDRESS_BOOK_FAILURE, error }
  }
}

function updateUserAddress(data) {
  return (dispatch) => {
    dispatch(request(data))
    return userService
      .updateUserAddressBook(data)
      .then((response) => {
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.UPDATE_USER_ADDRESS_REQUEST }
  }

  function success(userAddressDetail) {
    return { type: t.UPDATE_USER_ADDRESS_SUCCESS, userAddressDetail }
  }

  function failure(error) {
    return { type: t.UPDATE_USER_ADDRESS_FAILURE, error }
  }
}

function deleteUserAddress(addressId) {
  return (dispatch) => {
    dispatch(request())
    return userService
      .deleteUserAddressBook(addressId)
      .then((response) => {
        dispatch(success())
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.DELETE_USER_ADDRESS_BOOK_REQUEST }
  }

  function success() {
    return { type: t.DELETE_USER_ADDRESS_BOOK_SUCCESS }
  }

  function failure(error) {
    return { type: t.DELETE_USER_ADDRESS_BOOK_FAILURE, error }
  }
}
