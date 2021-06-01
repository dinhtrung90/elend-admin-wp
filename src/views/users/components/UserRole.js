import React, {useState, useEffect} from 'react';
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
    CRow,
    CInvalidFeedback
} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {userActions} from '../actions';
import CIcon from "@coreui/icons-react";
import {Redirect} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserRole = ({match}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userRoleData = useSelector(state => state.users.userRoleDetail);
  const isRedirect = useSelector(state => state.users.isRedirect);
  const permissions = useSelector(state => state.users.permissions) || [];
  const [userRoleDetail, setUserRoleDetail] = useState(userRoleData);
  const formik = useFormik({
    initialValues: {
      roleName: userRoleData.roleName || '',
      description: userRoleData.description || '',
      permissionDetails: userRoleData.permissionDetails || []
    },
    validationSchema: Yup.object({
      roleName: Yup.string().required(t('messages.requireRoleName')),
      description: Yup.string().required(t('messages.requireRoleDescription')),
      permissionDetails: Yup.array().required('At least one permission is required')
    })
  });

  // populate data in edit mode
  if (match.params.id &&
      formik.values.roleName.length === 0 &&
      userRoleData && userRoleData.roleName
  ) {
    formik.setValues(userRoleData);
  }

  useEffect(() => {
    const loadData = async () => {
      await dispatch(userActions.getAllPermissions());
      if (match.params.id) {
        await dispatch(userActions.getUserRoleDetail(match.params.id));
      }
    }
    loadData();
  }, [dispatch]);

  const handCreateUserRoleClick = (e) => {
      e.preventDefault();
      userRoleDetail.permissionDetails = [
          {
              "permissionName": "USER_MANAGEMENT",
              "permissionId": 1,
              "permissionDesc": "User Management",
              "operations": [
                  "CREATE",
                  "READ",
                  "UPDATE",
                  "DELETE"
              ]
          }
      ];
    console.log('formik=', formik);
      // dispatch(userActions.createUserRole(userRoleDetail));
  }

  return isRedirect ? <Redirect to={{ pathname: '/users/role' }}/> : (
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
                <CInput invalid={formik.errors.roleName && formik.touched.roleName} id="userRoleName" name="roleName"
                  value={formik.values.roleName}
                  onChange={formik.handleChange}
                  {...formik.getFieldProps("roleName")}
                />
                <CInvalidFeedback>{formik.errors.roleName}</CInvalidFeedback>
            </CFormGroup>
            <CFormGroup>
                <CLabel htmlFor="description">{t('common.Description')}</CLabel>
                <CInput invalid={formik.errors.description && formik.touched.description} id="description" name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  {...formik.getFieldProps("description")}
                />
                <CInvalidFeedback>{formik.errors.description}</CInvalidFeedback>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="permission">{t('common.Permission')}</CLabel>
              <table className="table table-bordered table-role">
                <thead className="thead-light">
                  <tr>
                    <th>Create</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Read</th>
                  </tr>
                </thead>
                <tbody>
                {
                  permissions.map((permission) => {
                    return <tr key={'tr-permission-id' + permission.id}>
                      <td>
                        <div className="ml-4">
                          <CInputCheckbox
                              key={'permission-id' + permission.id + '-create'}
                              id={'permission-id' + permission.id + '-create'}
                              name={'permission-id' + permission.id + '-create'}
                              value={permission}
                              onChange={e => {
                                if (e.target.checked) {
                                  formik.values.permissionDetails.push(permission)
                                } else {
                                  const idx = formik.values.permissionDetails.indexOf(permission.name);
                                  formik.values.permissionDetails.splice(idx, 1);
                                }
                              }}
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor={'permission-id' + permission.id + '-create'}>{permission.description} Create</CLabel>
                        </div>
                      </td>
                      <td>
                        <div className="ml-4">
                          <CInputCheckbox
                              key={'permission-id' + permission.id + '-edit'}
                              id={'permission-id' + permission.id + '-edit'}
                              name={'permission-id' + permission.id + '-edit'}
                              value={permission}
                              onChange={e => {
                                if (e.target.checked) {
                                  formik.values.permissionDetails.push(permission)
                                } else {
                                  const idx = formik.values.permissionDetails.indexOf(permission.name);
                                  formik.values.permissionDetails.splice(idx, 1);
                                }
                              }}
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor={'permission-id' + permission.id + '-edit'}>{permission.description} Edit</CLabel>
                        </div>
                      </td>
                      <td>
                        <div className="ml-4">
                          <CInputCheckbox
                              key={'permission-id' + permission.id + '-delete'}
                              id={'permission-id' + permission.id + '-delete'}
                              name={'permission-id' + permission.id + '-delete'}
                              value={permission}
                              onChange={e => {
                                if (e.target.checked) {
                                  formik.values.permissionDetails.push(permission)
                                } else {
                                  const idx = formik.values.permissionDetails.indexOf(permission.name);
                                  formik.values.permissionDetails.splice(idx, 1);
                                }
                              }}
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor={'permission-id' + permission.id + '-delete'}>{permission.description} Delete</CLabel>
                        </div>
                      </td>
                      <td>
                        <div className="ml-4">
                          <CInputCheckbox
                              key={'permission-id' + permission.id + '-read'}
                              id={'permission-id' + permission.id + '-read'}
                              name={'permission-id' + permission.id + '-read'}
                              value={permission}
                              onChange={e => {
                                if (e.target.checked) {
                                  formik.values.permissionDetails.push(permission)
                                } else {
                                  const idx = formik.values.permissionDetails.indexOf(permission.name);
                                  formik.values.permissionDetails.splice(idx, 1);
                                }
                              }}
                          />
                          <CLabel variant="checkbox" className="form-check-label" htmlFor={'permission-id' + permission.id + '-read'}>{permission.description} Read</CLabel>
                        </div>
                      </td>
                    </tr>
                  })
                }
                </tbody>
              </table>
              {/*{*/}
              {/*  permissions.map((permission) => {*/}
              {/*    return (<CFormGroup name="permissionDetails" key={'group-permission-id' + permission.id} variant="checkbox" className="checkbox">*/}
              {/*      <CInputCheckbox*/}
              {/*          key={'permission-id' + permission.id}*/}
              {/*          id={'permission-id' + permission.id}*/}
              {/*          name={'permission-id' + permission.id}*/}
              {/*          value={permission}*/}
              {/*          onChange={e => {*/}
              {/*            if (e.target.checked) {*/}
              {/*              formik.values.permissionDetails.push(permission)*/}
              {/*            } else {*/}
              {/*              const idx = formik.values.permissionDetails.indexOf(permission.name);*/}
              {/*              formik.values.permissionDetails.splice(idx, 1);*/}
              {/*            }*/}
              {/*          }}*/}
              {/*      />*/}
              {/*      <CLabel variant="checkbox" className="form-check-label" htmlFor={'permission-id' + permission.id}>{permission.description}</CLabel>*/}
              {/*    </CFormGroup>)*/}
              {/*  })*/}
              {/*}*/}
            </CFormGroup>
          </CCardBody>
        </CCard>
        <div className="text-center mb-3">
          <CButton type="submit" color="primary" className="text-center" onClick={handCreateUserRoleClick}>{t('common.Save')}</CButton>
        </div>
      </CCol>
    </CRow>
  )
}

export default UserRole
