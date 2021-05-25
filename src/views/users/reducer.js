import * as t from './actionTypes';

const initialState = {
    customers: [],
    customer: null,
    users: [],
    userDetail: null,
    userRoles: [],
    userRoleDetail: {},
    permissions: [],
    isFetched: false,
    isFetching: false,
    isSaving: false,
    errorFetch: null,
    errorUpdate: null,
    selectedId: 'all',
    itemsPerPage: 5,
    totalPages: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case t.USERS_GET_ALL_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case t.USERS_GET_ALL_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isFetched: true,
                users: action.users
            })
        case t.USERS_GET_ALL_FAILURE:
            return Object.assign({}, state, {
                errorFetch: action.error
            });
        case t.CUSTOMERS_GET_ALL_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case t.CUSTOMERS_GET_ALL_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isFetched: true,
                customers: action.customers
            })
        case t.CUSTOMERS_GET_ALL_FAILURE:
            return Object.assign({}, state, {
                errorFetch: action.error
            });
        case t.CUSTOMER_DETAIL_GET_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case t.CUSTOMER_DETAIL_GET_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isFetched: true,
                customer: action.customer
            })
        case t.CUSTOMER_DETAIL_GET_FAILURE:
            return Object.assign({}, state, {
                errorFetch: action.error
            });
        case t.USER_DETAIL_GET_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case t.USER_DETAIL_GET_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isFetched: true,
                userDetail: action.userDetail
            })
        case t.USER_DETAIL_GET_FAILURE:
            return Object.assign({}, state, {
                errorFetch: action.error
            });

        case t.USER_ROLES_GET_ALL_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case t.USER_ROLES_GET_ALL_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isFetched: true,
                userRoleDetail: {}, // reset detail item
                userRoles: action.userRoles.items,
                totalPages: action.userRoles.totalPage
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
        case t.PERMISSION_GET_ALL_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isFetched: false
            });
        case t.PERMISSION_GET_ALL_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isFetched: true,
                permissions: action.permissions
            })
        case t.PERMISSION_GET_ALL_FAILURE:
            return Object.assign({}, state, {
                errorFetch: action.error
            });
        default:
            return state
    }
}