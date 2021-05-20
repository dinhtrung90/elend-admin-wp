import React, {useEffect} from 'react'
import {CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CLabel, CRow} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {userActions} from '../actions';

const UserRole = ({match}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userRoleData = {}
  const permissions = useSelector(state => state.users.permissions) || [];
  console.log('permissions=', permissions);

  useEffect(() => {
    // dispatch(userActions.getUserRoleDetail(match.params.id));
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

              </CFormGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserRole
