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
    CButton, CBadge, CModalHeader, CModalTitle, CModalBody, CModalFooter, CModal,
    CSpinner
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {userActions} from '../actions';

const UserRoles = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [danger, setDanger] = useState(false);
    const [deleteRoleName, setDeleteRoleName] = useState('');
    const isFetching = useSelector(state => state.users.isFetching);
    const usersData = useSelector(state => state.users.userRoles);
    const itemsPerPage = useSelector(state => state.users.itemsPerPage);
    const maxPage = useSelector(state => state.users.totalPages);
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);
    const specialRoles = ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN', 'ROLE_SUPERVISOR', 'ROLE_USER']

    const pageChange = (newPage) => {
        currentPage !== newPage &&
        history.push(`/users/role?page=${newPage === 0 ? 1 : newPage}`);
    };

    useEffect(() => {
        const loadData = async () => {
            await getAllUserRoles();
        }
        loadData();
    }, [dispatch, currentPage, page]);

    const navigationToUserRoleCreation = () => {
        history.push(`/users/role/create`);
    };

    const getAllUserRoles = async () => {
        await dispatch(userActions.getAllUserRoles({page: currentPage > 1? currentPage - 1 : 0, size: itemsPerPage}));
        currentPage !== page && setPage(currentPage);
    }

    const handleDeleteUserRole = async () => {
        setDanger(!danger);
        if (!deleteRoleName || deleteRoleName.length === 0) return;
        await dispatch(userActions.deleteUserRole(deleteRoleName));
        await getAllUserRoles();
    }

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
                                    <CIcon name="cil-plus" />
                                    New User Role
                                </CButton>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            loading={isFetching}
                            items={usersData}
                            fields={[
                                { key: 'name', _classes: 'font-weight-bold', label: t('view.UserRoles.UserRoleName') },
                                { key: 'description', label: t('common.Description') },
                                { key: 'createdDate', label: t('common.CreatedDate') },
                                { key: 'action', label: t('common.Action')}
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
                                            onClick={() => history.push(`/users/role/edit/${item.name}`)}>
                                            <CIcon name="cil-pencil" />
                                        </CButton>
                                        {
                                            !specialRoles.includes(item.name) ? <CButton color="danger" onClick={() => {
                                                    setDanger(!danger);
                                                    setDeleteRoleName(item.name);
                                                } } className="mr-1"><CIcon name="cil-trash" /></CButton>
                                                : ''
                                        }
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

                        <CModal
                            show={danger}
                            onClose={() => setDanger(!danger)}
                            color="danger"
                        >
                            <CModalHeader closeButton>
                                <CModalTitle>{t('common.ConfirmDelete')}</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                {t('messages.messageConfirmDelete')}
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="danger" onClick={handleDeleteUserRole}>{t('common.Delete')}</CButton>{' '}
                                <CButton color="secondary" onClick={() => setDanger(!danger)}>{t('common.Cancel')}</CButton>
                            </CModalFooter>
                        </CModal>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default UserRoles;