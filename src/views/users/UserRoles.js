import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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

import usersData from './UserRoleData';

import CIcon from '@coreui/icons-react';

const UserRoles = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
    const [page, setPage] = useState(currentPage);

    const pageChange = (newPage) => {
        currentPage !== newPage &&
        history.push(`/userroles?page=${newPage}`);
    };

    useEffect(() => {
        currentPage !== page && setPage(currentPage);
    }, [currentPage, page]);

    const navigationToEmployerCreation = () => {
        history.push(`/employers/create`);
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
                                    onClick={navigationToEmployerCreation}>
                                    <CIcon name="cil-pencil" />
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
                                { key: 'createdDate', label: t('common.CreatedDate') },
                                { key: 'action'}
                            ]}
                            hover
                            striped
                            itemsPerPage={5}
                            activePage={page}
                            scopedSlots={{
                                action: (item) => (
                                    <td>
                                        <CButton
                                            className="mr-1"
                                            color="primary"
                                            onClick={() => history.push(`/users/role/edit/${item.id}`)}>
                                            <CIcon name="cil-pencil" />
                                        </CButton>
                                        <CButton
                                            color="danger"
                                            onClick={() => history.push(`/users/role/delete/${item.id}`)}>
                                            <CIcon name="cil-trash" />
                                        </CButton>
                                    </td>
                                ),
                            }}
                        />
                        <CPagination
                            activePage={page}
                            onActivePageChange={pageChange}
                            pages={5}
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