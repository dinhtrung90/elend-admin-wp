import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CCol, CRow, CButton, CFormLabel } from '@coreui/react'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import WidgetDragDrop from '../../../components/widgets/WidgetDragDrop'
import { userActions } from '../../actions'
import { useDispatch } from 'react-redux'

const TabContentRoleMapping = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { paramId, clientApps, userRoles, animatedComponents, onSubmit, ...attributes } = props
  const [selectedUserRoles, setSelectedUserRoles] = useState([])
  const [toggleAvailableRole, setToggleAvailableRole] = useState(false)
  const [userApplicationRole, setUserApplicationRole] = useState(null)
  const [userRoleMapping, setUserRoleMapping] = useState({
    assignRoles: [],
    accessibleApps: [],
  })

  const onValidateRoleMapping = (applicationRole, userRoles) => {
    // generate assign role
    userRoleMapping.assignRoles = userRoles
      .filter((u) => u.category === 'effectiveRoles')
      .map((u) => u.name)

    const foundIndex = userRoleMapping.accessibleApps.findIndex(
      (app) => app.id === applicationRole.id,
    )
    if (foundIndex === -1) {
      userRoleMapping.accessibleApps.push(applicationRole)
    }
    setUserRoleMapping(userRoleMapping)
  }

  const onDropUserRoles = (roles) => {
    setSelectedUserRoles(roles)
    userRoleMapping.assignRoles = roles
    const userRoles = roles.map((r) => {
      r.category = 'effectiveRoles'
      return r
    })

    onValidateRoleMapping(userApplicationRole, userRoles)
  }

  const onSelectedApplicationRole = (option) => {
    setUserApplicationRole(option)
    setToggleAvailableRole(true)
    setSelectedUserRoles(userRoles)

    onValidateRoleMapping(option, selectedUserRoles)
  }

  const handleToSaveRoleMapping = () => {
    if (!userRoleMapping.assignRoles || userRoleMapping.assignRoles.length === 0) {
      userRoleMapping.assignRoles = userRoles
        .filter((u) => u.category === 'effectiveRoles')
        .map((u) => u.name)
    }
    const payload = Object.assign({ userId: paramId }, userRoleMapping)
    onSubmit(payload)
  }

  return (
    <CRow className="p-4">
      <CCol sm={12}>
        <h5>{t('view.UserRole.UserRoles')}</h5>
        <CFormLabel htmlFor="applicationRoles" className="col-form-label">
          {t('view.User.ApplicationRoles')}
        </CFormLabel>
        <Select
          value={userApplicationRole}
          placeholder={<div>{t('messages.messagePleaseSelect')}</div>}
          name="user-org-select"
          options={clientApps}
          classNamePrefix="select-org"
          components={animatedComponents}
          onChange={onSelectedApplicationRole}
        />
        {toggleAvailableRole && userRoles && userRoles.length > 0 ? (
          <WidgetDragDrop dataSource={userRoles} onFinish={onDropUserRoles} />
        ) : null}
      </CCol>
      <CCol sm={12}>
        <hr />
      </CCol>
      <CCol sm={12}>
        <div className="mt-4 flex-center">
          {userRoles && userRoles.length > 0 ? (
            <CButton
              type="button"
              color="primary"
              className="text-center"
              onClick={handleToSaveRoleMapping}
            >
              {t('common.Save')}
            </CButton>
          ) : null}
        </div>
      </CCol>
    </CRow>
  )
}

TabContentRoleMapping.propTypes = {
  paramId: PropTypes.string.isRequired,
  clientApps: PropTypes.array.isRequired,
  userRoles: PropTypes.array.isRequired,
  onDropUserRoles: PropTypes.func,
  animatedComponents: PropTypes.func,
  handleToSaveRoleMapping: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default TabContentRoleMapping
