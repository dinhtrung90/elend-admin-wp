import React from 'react'
import {CCard, CCardBody, CCardHeader, CCol, CFormGroup, CInput, CLabel, CRow} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useTranslation } from 'react-i18next';
import usersData from './UserRoleData'

const UserRole = ({match}) => {
  const { t } = useTranslation()
  const userRoleData = usersData.find( user => user.id.toString() === match.params.id)

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
