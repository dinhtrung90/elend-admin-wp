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
  CButton, CDropdownToggle, CDropdownMenu, CDropdownItem, CDropdown,
} from '@coreui/react';

import {userActions} from '../actions';

import CIcon from '@coreui/icons-react';
import { FaUserPlus, FaEllipsisH } from "react-icons/fa";

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
  const itemsPerPage = useSelector(state => state.users.itemsPerPage);

  const queryPage = useLocation().search.match(/page=([0-9]+)/, '');
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage &&
      history.push(`/users?page=${newPage}`);
  };

  const getRoleColor = status => {
    switch (status) {
      case 'ROLE_ADMIN': return 'success'
      case 'ROLE_USER': return 'secondary'
      default: return 'primary'
    }
  }

  const handleToEdit = (item) => {
    history.push(`/users/edit/${item.id}`);
  }

  useEffect(() => {
    dispatch(userActions.getAllUsers({page: currentPage > 1? currentPage - 1 : 0, size: itemsPerPage}));
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  const navigationToUserCreation = () => {
    history.push(`/users/create`);
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
                  onClick={navigationToUserCreation}>
                  <FaUserPlus />
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CDataTable
                items={usersData}
                fields={[
                  { key: 'name', _classes: 'font-weight-bold', label: t('view.Users.fields.PersonInfo') },
                  { key: 'email', label: t('view.Users.fields.Username') },
                  { key: 'createdDate', label: t('view.Users.fields.Registered') },
                  { key: 'authorities', label: t('view.Users.fields.Role') },
                  { key: 'emailVerified', label: t('view.Users.fields.EmailVerified') },
                  { key: 'status', label: t('view.Users.fields.Status') },
                  { key: 'action', label: t('common.Action')}
                ]}
                hover
                striped
                itemsPerPage={5}
                activePage={page}
                clickableRows
                // onRowClick={(item) => history.push(`/users/edit/${item.id}`)}
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
                      ),
                  'authorities':
                      (item) => (
                          <td>{
                            item.authorities.map(role => {
                              return (
                                  <CBadge key={role.name} className="mr-1" color={getRoleColor(role.name)}>{role.name}</CBadge>
                              )
                            })
                          }</td>
                      ),
                  'action': (item) => (
                      <td>
                        <CDropdown className="m-1 d-inline-block custom-dropdowns">
                          <CDropdownToggle color="secondary">
                            <FaEllipsisH size="1em"/>
                          </CDropdownToggle>
                          <CDropdownMenu placement="left">
                            <CDropdownItem onClick={() => handleToEdit(item)}>{t('common.Edit')}</CDropdownItem>
                            <CDropdownItem>{t('common.ResendVerifyEmail')}</CDropdownItem>
                            <CDropdownItem>{t('common.ResetPassword')}</CDropdownItem>
                            <CDropdownItem>{t('common.Delete')}</CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                        {/*<CButton*/}
                        {/*    className="mr-1"*/}
                        {/*    color="primary">*/}
                        {/*  <CIcon name="cil-pencil" />*/}
                        {/*</CButton>*/}
                        {/*<CButton color="danger" className="mr-1"><CIcon name="cil-trash" /></CButton>*/}
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

export default Users;
