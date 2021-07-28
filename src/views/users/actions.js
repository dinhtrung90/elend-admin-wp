import { showLoading, hideLoading } from 'react-redux-loading-bar'
import * as t from './actionTypes'
import customersData from './components/UsersData'
import api from '../../utils/api'

export const userActions = {
  getAllUsers,
  createUser,
  updateUser,
  getUserDetail,
  createUserRole,
  editUserRole,
  deleteUserRole,
  getAllRoles,
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
  getClientApplications,
  createUserRoleMapping,
  _updateUserApplicationRole,
}

function getAllUsers(data) {
  return (dispatch) => {
    dispatch(request())
    return api.userService
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
    return api.userService
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
    return api.userService
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
    dispatch(showLoading('sectionBar'))
    dispatch(request())
    return api.userService
      .getUserById(userId)
      .then((response) => {
        dispatch(hideLoading('sectionBar'))
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(hideLoading('sectionBar'))
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
    return api.permissionService
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
    return api.permissionService
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
    return api.permissionService
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

function getAllRoles(data) {
  return (dispatch) => {
    dispatch(request())
    return api.permissionService
      .getAllRoles(data)
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
    return api.permissionService
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

function _getPermissionOrderIndex(name) {
  const operations = ['ALL', 'CREATE', 'UPDATE', 'DELETE', 'READ']
  return operations.findIndex((o) => o === name)
}

function _standardizePermissions(data) {
  const operations = ['ALL', 'CREATE', 'UPDATE', 'DELETE', 'READ']
  const permissionObject = {}
  data.forEach((p) => {
    const permissionName = p.name
    const lastIndex = permissionName.lastIndexOf('_')
    const rootPermissionName = permissionName.substr(0, lastIndex)
    const currentOperationName = permissionName.substr(lastIndex + 1, permissionName.length)
    operations.forEach((oItem) => {
      if (oItem === 'ALL') {
        // generate all permission
        const newPermissionName = `${rootPermissionName}_ALL`
        const descriptionCase = `${rootPermissionName
          .replace('ROLE_PERMISSION_', 'All ')
          .toLowerCase()}`
          .split(' ')
          .map((str) => {
            const word = str.toLowerCase()
            return word.charAt(0).toUpperCase() + word.slice(1)
          })
          .join(' ')
        permissionObject[newPermissionName] = {
          id: Math.floor(Math.random() * Date.now()),
          name: newPermissionName,
          value: newPermissionName,
          permissionName: newPermissionName,
          rootPermissionName: rootPermissionName,
          description: descriptionCase,
          operation: oItem,
          orderIndex: _getPermissionOrderIndex(oItem),
        }

        // add the next permission after creating the ALL ones.
        p.operation = currentOperationName
        p.rootPermissionName = rootPermissionName
        p.orderIndex = _getPermissionOrderIndex(currentOperationName)
        permissionObject[permissionName] = p
      } else {
        p.operation = currentOperationName
        p.rootPermissionName = rootPermissionName
        p.orderIndex = _getPermissionOrderIndex(currentOperationName)
        permissionObject[permissionName] = p
      }
    })
  })

  const permissions = []
  Object.keys(permissionObject).map((key) => {
    const item = permissionObject[key]
    if (item.operation === 'ALL') {
      item.children = []
      permissions.push(item)
    } else {
      const currentParentIndex = permissions.findIndex(
        (p) => p.rootPermissionName === item.rootPermissionName,
      )
      permissions[currentParentIndex].children.push(item)
    }
    return item
  })
  permissions.forEach((p) => {
    p.children.sort((a, b) => a.orderIndex - b.orderIndex)
  })
  return permissions
}

function getAllPermissions() {
  return (dispatch) => {
    dispatch(request())
    return api.permissionService
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
    return api.userService
      .getUserAddressBooks(data)
      .then((response) => {
        response.size = data.size || 5
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.USERS_GET_ADDRESS_BOOKS_REQUEST }
  }

  function success(userAddressList) {
    return { type: t.USERS_GET_ADDRESS_BOOKS_SUCCESS, userAddressList }
  }

  function failure(error) {
    return { type: t.USERS_GET_ADDRESS_BOOKS_FAILURE, error }
  }
}

function getUserAddressById(addressId) {
  return (dispatch) => {
    dispatch(request())
    return api.userService
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
    return api.userService
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
    return api.userService
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

function deleteUserAddress(data) {
  return (dispatch) => {
    dispatch(request())
    return api.userService
      .deleteUserAddressBook(data)
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

function getClientApplications() {
  return (dispatch) => {
    dispatch(request())
    return api.permissionService
      .getClientApplications()
      .then((response) => {
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.GET_CLIENT_APPS_REQUEST }
  }

  function success(clientApps) {
    return { type: t.GET_CLIENT_APPS_SUCCESS, clientApps }
  }

  function failure(error) {
    return { type: t.GET_CLIENT_APPS_FAILURE, error }
  }
}

function createUserRoleMapping(data) {
  return (dispatch) => {
    dispatch(request(data))
    return api.permissionService
      .createUserRoleMapping(data)
      .then((response) => {
        dispatch(success(response.data))
      })
      .catch((error) => {
        dispatch(failure(error))
      })
  }

  function request() {
    return { type: t.CREATE_USER_ROLE_MAPPING_REQUEST }
  }

  function success(userRoleMapping) {
    return { type: t.CREATE_USER_ROLE_MAPPING_SUCCESS, userRoleMapping }
  }

  function failure(error) {
    return { type: t.CREATE_USER_ROLE_MAPPING_FAILURE, error }
  }
}

function _updateUserApplicationRole(applicationRole) {
  return (dispatch) => {
    dispatch(request())
    dispatch(success(applicationRole))
  }

  function request() {
    return { type: t.UPDATE_USER_APPLICATION_ROLE_LOCAL_REQUEST }
  }

  function success(applicationRole) {
    return { type: t.UPDATE_USER_APPLICATION_ROLE_LOCAL_SUCCESS, applicationRole }
  }

  function failure(error) {
    return { type: t.UPDATE_USER_APPLICATION_ROLE_LOCAL_FAILURE, error }
  }
}
