import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CPagination,
    CButton, CBadge,
} from '@coreui/react';

import {userActions} from '../actions';

import CIcon from '@coreui/icons-react';

const UserRoles = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.users.userRoles);
    const itemsPerPage = useSelector(state => state.users.itemsPerPage);
    const maxPage = useSelector(state => state.users.totalPages);

    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);

    const pageChange = (newPage) => {
        currentPage !== newPage &&
        history.push(`/users/role?page=${newPage === 0 ? 1 : newPage}`);
    };

    useEffect(() => {
        dispatch(userActions.getAllUserRoles({page: currentPage > 1? currentPage - 1 : 0, size: itemsPerPage}));
        currentPage !== page && setPage(currentPage);
    }, [currentPage, page]);

    const navigationToUserRoleCreation = () => {
        history.push(`/users/role/create`);
    };

    return (
        <CRow>
            <CCol xl={12}>
                <CCard>
                    <CCardHeader>
                        <CRow>
                            <CCol sm="5">
                                <h4 id="traffic" className="card-title mb-0">
                                    {t('view.UserRoles.title')}
                                </h4>
                            </CCol>
                            <CCol sm="7" className="d-none d-md-block">
                                <CButton
                                    color="primary"
                                    className="float-right"
                                    onClick={navigationToUserRoleCreation}>
                                    <CIcon name="plus" />
                                    New User Role
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={usersData}
                            fields={[
                                { key: 'roleName', _classes: 'font-weight-bold', label: t('view.UserRoles.UserRoleName') },
                                { key: 'description', label: t('common.Description') },
                                { key: 'createDate', label: t('common.CreatedDate') },
                                { key: 'action'}
                            ]}
                            hover
                            striped
                            itemsPerPage={itemsPerPage}
                            scopedSlots={{
                                action: (item) => (
                                    <td>
                                        <CButton
                                            className="mr-1"
                                            color="primary"
                                            onClick={() => history.push(`/users/role/edit/${item.roleName}`)}>
                                            <CIcon name="cil-pencil" />
                                        </CButton>
                                        <CButton
                                            color="danger"
                                            onClick={() => history.push(`/users/role/delete/${item.roleName}`)}>
                                            <CIcon name="cil-trash" />
                                        </CButton>
                                    </td>
                                ),
                            }}
                        />
                        <CPagination
                            activePage={page}
                            onActivePageChange={pageChange}
                            pages={maxPage}
                            doubleArrows={false}
                            align="center"
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default UserRoles;