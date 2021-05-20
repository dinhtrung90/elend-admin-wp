import * as t from './actionTypes';

// fake data
import customersData from './components/UsersData';
import usersData from './components/UsersData';
import { userService } from "../../services/user.service";

export const userActions = {
    getAllUsers,
    getUserDetail,
    getAllUserRoles,
    getUserRoleDetail,
    getAllPermissions,
    getAllCustomers,
    getCustomerDetail
};

function getAllUsers() {
    return dispatch => {
        dispatch(request());
        dispatch(success(usersData));
    };

    function request() { return { type: t.USERS_GET_ALL_REQUEST } }
    function success(users) { return { type: t.USERS_GET_ALL_SUCCESS, users } }
    function failure(error) { return { type: t.USERS_GET_ALL_FAILURE, error } }
}

function getAllCustomers() {
    return dispatch => {
        dispatch(request());
        return dispatch(success(customersData));
    };

    function request() { return { type: t.CUSTOMERS_GET_ALL_REQUEST } }
    function success(customers) { return { type: t.CUSTOMERS_GET_ALL_SUCCESS, customers } }
    function failure(error) { return { type: t.CUSTOMERS_GET_ALL_FAILURE, error } }
}

function getCustomerDetail(customerId) {
    const item = customersData.find( user => user.id.toString() === customerId);
    return dispatch => {
        dispatch(request());
        dispatch(success(item));
    };

    function request() { return { type: t.CUSTOMER_DETAIL_GET_REQUEST } }
    function success(customer) { return { type: t.CUSTOMER_DETAIL_GET_SUCCESS, customer } }
    function failure(error) { return { type: t.CUSTOMER_DETAIL_GET_FAILURE, error } }
}

function getUserDetail(userId) {
    const item = usersData.find( user => user.id.toString() === userId);
    return dispatch => {
        dispatch(request());
        dispatch(success(item));
    };

    function request() { return { type: t.USER_DETAIL_GET_REQUEST } }
    function success(userDetail) { return { type: t.USER_DETAIL_GET_SUCCESS, userDetail } }
    function failure(error) { return { type: t.USER_DETAIL_GET_FAILURE, error } }
}

function getAllUserRoles() {
    return dispatch => {
        dispatch(request());
        return userService.getAllUserRoles().then(response => {
            dispatch(success(response.data));
        }).catch(error => {
            dispatch(failure(error));
        });
    };

    function request() { return { type: t.USER_ROLES_GET_ALL_REQUEST } }
    function success(userRoles) { return { type: t.USER_ROLES_GET_ALL_SUCCESS, userRoles } }
    function failure(error) { return { type: t.USER_ROLES_GET_ALL_FAILURE, error } }
}

function getUserRoleDetail(roleName) {
    return dispatch => {
        dispatch(request());
        return userService.getUserRoleDetail(roleName).then(response => {
            dispatch(success(response.data));
        }).catch(error => {
            dispatch(failure(error));
        });
    };

    function request() { return { type: t.USER_ROLE_DETAIL_GET_REQUEST } }
    function success(userRole) { return { type: t.USER_ROLE_DETAIL_GET_SUCCESS, userRole } }
    function failure(error) { return { type: t.USER_ROLE_DETAIL_GET_FAILURE, error } }
}

function getAllPermissions() {
    return dispatch => {
        dispatch(request());
        return userService.getAllPermissions().then(response => {
            dispatch(success(response.data));
        }).catch(error => {
            dispatch(failure(error));
        });
    };

    function request() { return { type: t.PERMISSION_GET_ALL_REQUEST} }
    function success(permissions) { return { type: t.PERMISSION_GET_ALL_SUCCESS, permissions } }
    function failure(error) { return { type: t.PERMISSION_GET_ALL_FAILURE, error } }
}