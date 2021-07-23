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
import { FaExchangeAlt } from 'react-icons/fa'
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

  if (allRoles && allRoles.length > 0) {
    allRoles.forEach((role) => {
      role.selected = false
      role.category = 'availableRoles'
    })
  }

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
      name: Yup.string().required(t('messages.requireRoleName')),
      description: Yup.string().required(t('messages.requireRoleDescription')),
    }),
    onSubmit: (values) => {
      handleToSubmit(values)
    },
  })

  // populate data in edit mode
  if (match.params.id) {
    if (formik.values.roleName.length === 0 && userRoleData && userRoleData.roleName) {
      formik.setValues(userRoleData)
    }
  } else {
    // reset permissions
    // permissions.forEach((parent) => {
    //   parent.children.forEach((child) => {
    //     child.checked = false
    //   })
    // })
  }

  const onCheckboxChange = (checkboxes) => {
    formik.values.permissions.forEach((p) => {
      p.children.forEach((child) => {
        const foundChild = checkboxes.find((c) => c.name === child.name)
        child.checked = foundChild ? foundChild.checked : false
      })
    })
    // checkboxes.forEach((item) => {
    //   permissions.forEach((p) => {
    //     p.children.forEach((child) => {
    //       if (item.name === child.name) {
    //         child.checked = item.checked
    //       } else {
    //         child.checked = false
    //       }
    //     })
    //   })
    // })
    // checkboxes.forEach((item) => {
    //   const selectedItemInx = formik.values.availablePrivileges.findIndex((p) => p.name === item.name)
    //   if (selectedItemInx === -1) {
    //     formik.values.availablePrivileges.push(item)
    //   } else {
    //     formik.values.availablePrivileges[selectedItemInx] = item
    //   }
    // })
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
      if (match.params.id) {
        await dispatch(userActions.getUserRoleDetail(match.params.id))
      }
    }
    loadData()
  }, [dispatch])

  const onDropUserRoles = (roles) => {
    console.log('onDropUserRoles=', roles)
    setSelectedUserRoles(roles)
  }

  const handleToSubmit = (values) => {
    const payload = {
      roleName: values.roleName,
      description: values.description,
      effectiveRoles: ['ROLE_ADMIN', 'ROLE_USER'],
      availablePrivileges: values.availablePrivileges,
    }

    console.log('payload==', payload)

    /*
    const payload = {
      name: values.name,
      description: values.description,
      permissionDetails: [],
    }
    payload.permissionDetails = payload.permissionDetails.concat(values.permissionDetails)

    values.availablePrivileges.forEach((item) => {
      if (!item.checked) {
        return
      }
      const detailItemIdx = payload.permissionDetails.findIndex(
        (p) => item.checked && p.permissionId === item.id,
      )
      if (detailItemIdx === -1) {
        const detailItem = {
          permissionId: item.id,
          permissionName: item.permission_name,
          permissionDesc: item.description,
          operations: [item.value],
        }

        payload.permissionDetails.push(detailItem)
      } else if (
        item.checked &&
        !payload.permissionDetails[detailItemIdx].operations.includes(item.value)
      ) {
        payload.permissionDetails[detailItemIdx].operations.push(item.value)
      }
    })
    if (match.params.id) {
      dispatch(userActions.editUserRole(payload))
    } else {
      dispatch(userActions.createUserRole(payload))
    }
    */
  }

  // // init drag roles
  // const onDragStart = (ev, id) => {
  //   ev.dataTransfer.setData('id', id)
  // }
  //
  // const onDragOver = (ev) => {
  //   ev.preventDefault()
  // }
  //
  // const onDrop = (ev, cat) => {
  //   let id = ev.dataTransfer.getData('id')
  //
  //   let roles = defaultRoles.filter((role) => {
  //     if (role.name === id) {
  //       role.category = cat
  //     }
  //     return role
  //   })
  //
  //   setDefaultRoles(roles)
  // }
  //
  // const dragRoles = {
  //   availableRoles: [],
  //   associatedRoles: [],
  // }
  //
  // defaultRoles.forEach((t) => {
  //   dragRoles[t.category].push(
  //     <div key={t.name} onDragStart={(e) => onDragStart(e, t.name)} draggable className="draggable">
  //       {t.name}
  //     </div>,
  //   )
  // })

  return isRedirect ? (
    <Redirect to={{ pathname: '/users/role' }} />
  ) : (
    <CRow>
      <CCol>
        <CForm onSubmit={formik.handleSubmit}>
          <CCard>
            <CCardHeader>
              {match.params.id ? t('view.UserRoles.EditUserRole') : t('view.UserRoles.NewUserRole')}
              <button type="submit" className="float-end btn btn-primary btn-sm">
                <CIcon name="cil-save" alt="btn-save" />
              </button>
            </CCardHeader>
            <CCardBody>
              <div>
                <CFormLabel htmlFor="userRoleName">{t('view.UserRoles.UserRoleName')}</CFormLabel>
                <CFormControl
                  invalid={formik.errors.roleName && formik.touched.roleName}
                  id="userRoleName"
                  name="roleName"
                  value={formik.values.roleName}
                  onChange={formik.handleChange}
                  {...formik.getFieldProps('roleName')}
                />
                <CFormFeedback>{formik.errors.roleName}</CFormFeedback>
              </div>
              <div>
                <CFormLabel htmlFor="description">{t('common.Description')}</CFormLabel>
                <CFormControl
                  invalid={formik.errors.description && formik.touched.description}
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  {...formik.getFieldProps('description')}
                />
                <CFormFeedback>{formik.errors.description}</CFormFeedback>
              </div>
              <div>
                <h5>{t('view.UserRole.CompositeRoles')}</h5>
                <WidgetDragDrop dataSource={allRoles} onFinish={onDropUserRoles} />
              </div>
              <div>
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
              </div>
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
