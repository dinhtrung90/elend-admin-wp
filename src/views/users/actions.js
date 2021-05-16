import * as t from './actionTypes';

// fake data
import usersData from './components/UserRoleData';

export const userActions = {
    getAllUserRoles,
    getUserRoleDetail
};

function getAllUserRoles() {
    return dispatch => {
        dispatch(request());
        dispatch(success(usersData));
    };

    function request() { return { type: t.USER_ROLES_GET_ALL_REQUEST } }
    function success(userRoles) { return { type: t.USER_ROLES_GET_ALL_SUCCESS, userRoles } }
    function failure(error) { return { type: t.USER_ROLES_GET_ALL_FAILURE, error } }
}

function getUserRoleDetail(userRoleId) {
    const userRoleData = usersData.find( user => user.id.toString() === userRoleId)
    return dispatch => {
        dispatch(request());
        dispatch(success(userRoleData));
    };

    function request() { return { type: t.USER_ROLE_DETAIL_GET_REQUEST } }
    function success(userRole) { return { type: t.USER_ROLE_DETAIL_GET_SUCCESS, userRole } }
    function failure(error) { return { type: t.USER_ROLE_DETAIL_GET_FAILURE, error } }
}