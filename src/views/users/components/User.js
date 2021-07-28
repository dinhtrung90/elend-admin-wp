import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CSpinner,
} from '@coreui/react'
import { userActions } from '../actions'
import { useTranslation } from 'react-i18next'
import makeAnimated from 'react-select/animated'
import TabContentProfile from './tabs/TabContentProfile'
import TabContentAddressBooks from './tabs/TabContentAddressBooks'
import TabContentRoleMapping from './tabs/TabContentRoleMapping'

const User = ({ match }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const animatedComponents = makeAnimated()
  const [activeKey, setActiveKey] = useState(1)
  const isFetching = useSelector((state) => state.users.isFetching)
  const defaultUserRoles = useSelector((state) => state.users.userRoles)
  const assignedUserRoles = useSelector((state) => state.users.userDetail.userRoles)
  const clientApps = useSelector((state) => state.users.clientApps)

  let paramId = match.params.id
  if (paramId) {
    paramId = paramId.split('&')[0]
  }
  const isNew = !paramId
  const userRoles = isNew ? defaultUserRoles : assignedUserRoles

  const tabs = {
    PROFILE: 1,
    ADDRESS_BOOK: 2,
    ROLE_MAPPING: 3,
  }

  useEffect(() => {
    const loadData = async () => {
      await dispatch(userActions.getAllRoles({ all: true }))
      if (paramId) {
        await dispatch(userActions.getUserDetail(paramId))
        await dispatch(
          userActions.getUserAddressBooks({
            userId: paramId,
            page: 0,
            size: 100,
          }),
        )
        await dispatch(userActions.getClientApplications())
      }
    }
    loadData()
  }, [dispatch])

  const handleTabSelected = (tabIndex) => {
    setActiveKey(tabIndex)
  }

  const saveAddress = (userAddressList, addressItem) => {
    dispatch(userActions.createUserAddress(addressItem))
  }

  const editAddress = (item) => {
    dispatch(userActions.updateUserAddress(item))
  }

  const deleteAddress = (item) => {
    dispatch(userActions.deleteUserAddress(item))
  }

  const handleToSaveRoleMapping = (userRoleMapping) => {
    const payload = Object.assign({ userId: paramId }, userRoleMapping)
    dispatch(userActions.createUserRoleMapping(payload))
  }

  return isFetching ? (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>{isNew ? t('common.NewUser') : t('common.EditUser')}</CCardHeader>
          <CCardBody className="flex-center">
            <CSpinner color="primary" size="sm" />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  ) : (
    <CRow>
      <CCol lg={12}>
        <CForm>
          <CCard>
            <CCardHeader>{isNew ? t('common.NewUser') : t('common.EditUser')}</CCardHeader>
            <CCardBody>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink
                    data-tab="profile"
                    active={activeKey === tabs.PROFILE}
                    onClick={() => handleTabSelected(tabs.PROFILE)}
                  >
                    {t('common.Profile')}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    data-tab="address-book"
                    active={activeKey === tabs.ADDRESS_BOOK}
                    onClick={() => handleTabSelected(tabs.ADDRESS_BOOK)}
                  >
                    {t('common.AddressBook')}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    data-tab="role-mapping"
                    active={activeKey === tabs.ROLE_MAPPING}
                    onClick={() => handleTabSelected(tabs.ROLE_MAPPING)}
                  >
                    {t('common.RoleMapping')}
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="profile" visible={activeKey === 1}>
                  <TabContentProfile
                    paramId={paramId}
                    isNew={isNew}
                    isFetching={isFetching}
                    animatedComponents={animatedComponents}
                  />
                </CTabPane>
                <CTabPane data-tab="address-book" visible={activeKey === 2}>
                  <TabContentAddressBooks
                    paramId={paramId}
                    handleSaveAddress={saveAddress}
                    handleEditAddress={editAddress}
                    handleDeleteAddress={deleteAddress}
                  />
                </CTabPane>
                <CTabPane data-tab="role-mapping" visible={activeKey === 3}>
                  <TabContentRoleMapping
                    paramId={paramId}
                    clientApps={clientApps}
                    userRoles={userRoles}
                    animatedComponents={animatedComponents}
                    onSubmit={handleToSaveRoleMapping}
                  />
                </CTabPane>
              </CTabContent>
            </CCardBody>
          </CCard>
        </CForm>
      </CCol>
    </CRow>
  )
}

User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}

export default User
