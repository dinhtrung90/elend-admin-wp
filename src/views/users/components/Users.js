import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
} from '@coreui/react';

import {userActions} from '../actions';

import CIcon from '@coreui/icons-react';

const getBadge = (status) => {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'secondary';
    case 'Pending':
      return 'warning';
    case 'Banned':
      return 'danger';
    default:
      return 'primary';
  }
};

const Users = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const usersData = useSelector(state => state.users.users);

  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage &&
      history.push(`/users?page=${newPage}`);
  };

  useEffect(() => {
    dispatch(userActions.getAllUsers());
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
                  {t('theHeader.Employee')}
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
                  { key: 'name', _classes: 'font-weight-bold', label: t('view.Users.fields.PersonInfo') },
                  { key: 'username', label: t('view.Users.fields.Username') },
                  { key: 'registered', label: t('view.Users.fields.Registered') },
                  { key: 'role', label: t('view.Users.fields.Role') },
                  { key: 'status', label: t('view.Users.fields.Status') },
                ]}
                hover
                striped
                itemsPerPage={5}
                activePage={page}
                clickableRows
                onRowClick={(item) => history.push(`/users/edit/${item.id}`)}
                scopedSlots = {{
                  'name':
                      (item)=>(
                        <td>
                          <p className="text-primary m-0">{item.name}</p>
                          <p className="m-0">{item.email}</p>
                          <p className="m-0">{item.phone}</p>
                        </td>
                      ),
                  'status':
                      (item)=>(
                          <td>
                            <CBadge color={getBadge(item.status)}>
                              {item.status}
                            </CBadge>
                          </td>
                      )
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

export default Users;
