import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormControl,
  CFormLabel,
  CRow,
  CFormFeedback,
  CForm,
} from '@coreui/react'
import { CheckboxGroup, AllCheckerCheckbox, Checkbox } from '@createnl/grouped-checkboxes'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../actions'
import CIcon from '@coreui/icons-react'
import { Redirect } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import WidgetDragDrop from '../../components/widgets/WidgetDragDrop'

const UserRole = ({ match }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  let allRoles = useSelector((state) => state.users.userRoles)
  const userRoleData = useSelector((state) => state.users.userRoleDetail)
  const isRedirect = useSelector((state) => state.users.isRedirect)
  const permissions = useSelector((state) => state.users.permissions)
  const [selectedUserRoles, setSelectedUserRoles] = useState([])
  const paramId = match.params.id

  const formik = useFormik({
    initialValues: {
      roleName: userRoleData.roleName || '',
      description: userRoleData.description || '',
      availablePrivileges: [],
      permissions: permissions || [],
      allChecked: false,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      roleName: Yup.string().required(t('messages.requireRoleName')),
      description: Yup.string().required(t('messages.requireRoleDescription')),
    }),
    onSubmit: (values) => {
      handleToSubmit(values)
    },
  })

  // populate data in edit mode
  if (paramId) {
    if (formik.values.roleName.length === 0 && userRoleData && userRoleData.roleName) {
      formik.setValues(userRoleData)
    }
  }

  const onCheckboxChange = (checkboxes) => {
    formik.values.permissions.forEach((p) => {
      p.children.forEach((child) => {
        const foundChild = checkboxes.find((c) => c.name === child.name)
        child.checked = foundChild ? foundChild.checked : false
      })
    })
  }

  const onCheckboxAllChange = () => {
    formik.values.permissions.forEach((p) => {
      p.checked = !p.checked
      p.children.forEach((child) => {
        child.checked = p.checked
      })
    })
    formik.setFieldValue('permissions', formik.values.permissions)
  }

  useEffect(() => {
    const loadData = async () => {
      await dispatch(userActions.getAllRoles({ all: true }))
      await dispatch(userActions.getAllPermissions())
      if (paramId) {
        await dispatch(userActions.getUserRoleDetail(paramId))
      }
    }
    loadData()
  }, [dispatch, paramId])

  const onDropUserRoles = (roles) => {
    setSelectedUserRoles(roles)
  }

  const handleToSubmit = (values) => {
    const payload = {
      roleName: values.roleName,
      description: values.description,
      effectiveRoles:
        selectedUserRoles && selectedUserRoles.length
          ? selectedUserRoles.map((role) => role.name)
          : userRoleData.effectiveRoles,
    }
    const availablePrivileges = []

    formik.values.permissions.forEach((parent) => {
      if (!parent.children || parent.children.length === 0) return
      parent.children.forEach((child) => {
        if (child.checked) {
          availablePrivileges.push({
            name: child.name,
            description: child.description,
            selected: true,
          })
        }
      })
    })
    payload.availablePrivileges = availablePrivileges
    if (paramId) {
      dispatch(userActions.editUserRole(payload))
    } else {
      dispatch(userActions.createUserRole(payload))
    }
  }

  return isRedirect ? (
    <Redirect to={{ pathname: '/users/role' }} />
  ) : (
    <CRow>
      <CCol>
        <CForm onSubmit={formik.handleSubmit}>
          <CCard>
            <CCardHeader>
              {paramId ? t('view.UserRoles.EditUserRole') : t('view.UserRoles.NewUserRole')}
              <button type="submit" className="float-end btn btn-primary btn-sm">
                <CIcon name="cil-save" alt="btn-save" />
              </button>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm={12} className="mb-4">
                  <CFormLabel htmlFor="userRoleName">{t('view.UserRoles.UserRoleName')}</CFormLabel>
                  <CFormControl
                    invalid={formik.errors.roleName && formik.touched.roleName}
                    id="userRoleName"
                    name="roleName"
                    value={formik.values.roleName}
                    onChange={formik.handleChange}
                    {...formik.getFieldProps('roleName')}
                  />
                  <CFormFeedback
                    invalid
                    style={{
                      display: formik.errors.roleName && formik.touched.roleName ? 'block' : 'none',
                    }}
                  >
                    {formik.errors.roleName}
                  </CFormFeedback>
                </CCol>
                <CCol sm={12} className="mb-4">
                  <CFormLabel htmlFor="description">{t('common.Description')}</CFormLabel>
                  <CFormControl
                    invalid={formik.errors.description && formik.touched.description}
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    {...formik.getFieldProps('description')}
                  />
                  <CFormFeedback
                    invalid
                    style={{
                      display:
                        formik.errors.description && formik.touched.description ? 'block' : 'none',
                    }}
                  >
                    {formik.errors.description}
                  </CFormFeedback>
                </CCol>
                <CCol sm={12} className="mb-4">
                  <h5>{t('view.UserRole.CompositeRoles')}</h5>
                  <WidgetDragDrop dataSource={allRoles} onFinish={onDropUserRoles} />
                </CCol>
                <CCol sm={12} className="mb-4">
                  <h5>{t('common.Permission')}</h5>
                  <table className="table table-bordered table-role">
                    <thead className="thead-light">
                      <tr>
                        <th>
                          <Checkbox
                            onChange={onCheckboxAllChange}
                            checked={formik.values.allChecked}
                          />{' '}
                          {t('common.All')}
                        </th>
                        <th>{t('view.UserRole.Create')}</th>
                        <th>{t('view.UserRole.Update')}</th>
                        <th>{t('view.UserRole.Delete')}</th>
                        <th>{t('view.UserRole.Read')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formik.values.permissions &&
                        formik.values.permissions.map((permission) => {
                          return (
                            <tr key={'tr-permission-id' + permission.id}>
                              <CheckboxGroup
                                name={`group-${permission.name}`}
                                onChange={onCheckboxChange}
                              >
                                <td>
                                  <label>
                                    <AllCheckerCheckbox />
                                    <span className="ms-2">{permission.description}</span>
                                  </label>
                                </td>
                                {permission.children.map((childPermission) => {
                                  return (
                                    <td
                                      key={`${permission.id}-${childPermission.id}-${childPermission.value}`}
                                    >
                                      <label>
                                        <Checkbox
                                          id={childPermission.id}
                                          name={childPermission.name}
                                          permission_name={childPermission.permissionName}
                                          description={childPermission.permissionDesc}
                                          value={childPermission.value}
                                          checked={childPermission.checked}
                                        />
                                        <span className="ms-2">{childPermission.description}</span>
                                      </label>
                                    </td>
                                  )
                                })}
                              </CheckboxGroup>
                            </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <div className="text-center mb-3 mt-4">
            <CButton type="submit" color="primary" className="text-center">
              {t('common.Save')}
            </CButton>
          </div>
        </CForm>
      </CCol>
    </CRow>
  )
}

UserRole.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}

export default UserRole
