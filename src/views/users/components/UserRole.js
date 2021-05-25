import React, {useState, useEffect} from 'react'
import {CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CInputCheckbox, CLabel, CRow} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {userActions} from '../actions';

const UserRole = ({match}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userRoleData = useSelector(state => state.users.userRoleDetail);
  const permissions = useSelector(state => state.users.permissions) || [];

  useEffect(() => {
    dispatch(userActions.getUserRoleDetail(match.params.id));
    dispatch(userActions.getAllPermissions());
  }, []);

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
              {t('view.UserRoles.EditUserRole')}
          </CCardHeader>
          <CCardBody>
              <CFormGroup>
                  <CLabel htmlFor="userRoleName">{t('view.UserRoles.UserRoleName')}</CLabel>
                  <CInput id="userRoleName" defaultValue={userRoleData.roleName} />
              </CFormGroup>
              <CFormGroup>
                  <CLabel htmlFor="description">{t('common.Description')}</CLabel>
                  <CInput id="description" defaultValue={userRoleData.description} />
              </CFormGroup>
              <CFormGroup>
                  <CLabel htmlFor="permission">{t('common.Permission')}</CLabel>
                  {
                      permissions.map((permission) => {
                          return (<CFormGroup key={'group-permision-id' + permission.id} variant="checkbox" className="checkbox">
                              <CInputCheckbox
                                  key={'permision-id' + permission.id}
                                  id={'permision-id' + permission.id}
                                  name={'permision-id' + permission.id}
                                  value={permission.name}
                              />
                              <CLabel variant="checkbox" className="form-check-label" htmlFor={'permision-id' + permission.id}>{permission.description}</CLabel>
                          </CFormGroup>)
                      })
                  }
              </CFormGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserRole
