import * as t from './actionTypes';

const initialState = {
    userRoles: [],
    userRoleDetail: null,
    isFetched: false,
    isFetching: false,
    isSaving: false,
    errorFetch: null,
    errorUpdate: null,
    selectedId: 'all'
}

export default (state = initialState, action) => {
    switch (action.type) {
        case t.USER_ROLES_GET_ALL_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case t.USER_ROLES_GET_ALL_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isFetched: true,
                userRoles: action.userRoles
            })
        case t.USER_ROLES_GET_ALL_FAILURE:
            return Object.assign({}, state, {
                errorFetch: action.error
            });

        case t.USER_ROLE_DETAIL_GET_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case t.USER_ROLE_DETAIL_GET_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isFetched: true,
                userRoleDetail: action.userRole
            })
        case t.USER_ROLE_DETAIL_GET_FAILURE:
            return Object.assign({}, state, {
                errorFetch: action.error
            });
        default:
            return state
    }
}