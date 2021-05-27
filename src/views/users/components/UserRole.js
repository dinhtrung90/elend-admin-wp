import React, {useState, useEffect} from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormGroup,
    CInput,
    CInputCheckbox,
    CLabel,
    CRow
} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {userActions} from '../actions';
import CIcon from "@coreui/icons-react";

const UserRole = ({match}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userRoleData = useSelector(state => state.users.userRoleDetail);
  const permissions = useSelector(state => state.users.permissions) || [];

  useEffect(() => {
    if (match.params.id) {
      dispatch(userActions.getUserRoleDetail(match.params.id));
    }
    dispatch(userActions.getAllPermissions());
  }, []);

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
              {match.params.id ? t('view.UserRoles.EditUserRole') : t('view.UserRoles.NewUserRole')}
              <button className="float-right btn btn-primary btn-sm">
                  <CIcon name="cil-save"  alt="btn-save" />
              </button>
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
        <div className="text-center mb-3">
          <CButton type="submit" color="primary" className="text-center">{t('common.Save')}</CButton>
        </div>
      </CCol>
    </CRow>
  )
}

export default UserRole
