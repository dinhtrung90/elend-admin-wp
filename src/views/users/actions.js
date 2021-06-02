import * as t from './actionTypes';

// fake data
import customersData from './components/UsersData';
import usersData from './components/UsersData';
import { userService } from "../../services/user.service";

export const userActions = {
    getAllUsers,
    getUserDetail,
    createUserRole,
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

function createUserRole(userRole) {
    return dispatch => {
        dispatch(request(userRole));
        return userService.createUserRole(userRole).then(response => {
            dispatch(success(response.data));
        }).catch(error => {
            dispatch(failure(error));
        });
    };

    function request() { return { type: t.CREATE_USER_ROLES_REQUEST } }
    function success(userRoles) { return { type: t.CREATE_USER_ROLES_SUCCESS, userRoles } }
    function failure(error) { return { type: t.CREATE_USER_ROLES_FAILURE, error } }
}

function getAllUserRoles(data) {
    return dispatch => {
        dispatch(request());
        return userService.getAllUserRoles(data).then(response => {
            if (response.data && response.data.items) {
                response.data.items.forEach(item => {
                    item.description = item.description || '';
                });
            }
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

function _standardizePermissions (data) {
    const operations = ['CREATE', 'UPDATE', 'DELETE', 'READ'];
    const permissions = [];
    data.forEach(p => {
        const parent = p;
        parent.children = [];
        operations.forEach(o => {
            const descriptionCase = `${p.description} ${o.toLocaleLowerCase()}`
                .split(' ').map(str => {
                    const word = str.toLowerCase()
                    return word.charAt(0).toUpperCase() + word.slice(1)
                })
                .join(' ');

            parent.children.push({
                id: p.id,
                name: `${p.name}_${o}`,
                description: descriptionCase,
                value: o,
                groupName: p.name
            });
        });
        permissions.push(parent);
    });
    return permissions;
}

function getAllPermissions() {
    return dispatch => {
        dispatch(request());
        return userService.getAllPermissions().then(response => {
            dispatch(success(_standardizePermissions(response.data)));
        }).catch(error => {
            dispatch(failure(error));
        });
    };

    function request() { return { type: t.PERMISSION_GET_ALL_REQUEST} }
    function success(permissions) { return { type: t.PERMISSION_GET_ALL_SUCCESS, permissions } }
    function failure(error) { return { type: t.PERMISSION_GET_ALL_FAILURE, error } }
}