import React, {useState, useEffect} from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormGroup,
    CInput,
    CLabel,
    CRow,
    CInvalidFeedback,
    CForm
} from '@coreui/react';
import {
  CheckboxGroup,
  AllCheckerCheckbox,
  Checkbox
} from "@createnl/grouped-checkboxes";
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
      permissionDetails: userRoleData.permissionDetails || [],
      permissionAll: []
    },
    validationSchema: Yup.object({
      roleName: Yup.string().required(t('messages.requireRoleName')),
      description: Yup.string().required(t('messages.requireRoleDescription')),
      permissionDetails: Yup.array().required('messages.requireAtLeastPermission')
    }),
    onSubmit: values => {
      handleToSubmit(values);
    }
  });

  // populate data in edit mode
  if (match.params.id) {
    if (formik.values.roleName.length === 0 &&
        userRoleData && userRoleData.roleName
    ) {
      formik.setValues(userRoleData);
    }
  } else {
    // reset permissions
    permissions.forEach(parent => {
      parent.children.forEach(child => {
        child.checked = false;
      })
    });
  }

  const onCheckboxChange = (checkboxes) => {
    checkboxes.forEach(item => {
      const selectedItemInx = formik.values.permissionAll.findIndex(p => p.name === item.name);
      if (selectedItemInx === -1) {
        formik.values.permissionAll.push(item);
      } else {
        formik.values.permissionAll[selectedItemInx] = item;
      }
    })
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

  const handleToSubmit = (values) => {
    const payload = {
      roleName: values.roleName,
      description: values.description,
      permissionDetails: []
    };
    payload.permissionDetails = payload.permissionDetails.concat(values.permissionDetails);

    values.permissionAll.forEach(item => {
      if (!item.checked) {
        return;
      }
      const detailItemIdx = payload.permissionDetails.findIndex(p => item.checked && p.permissionId === item.id);
      if (detailItemIdx === -1) {
        const detailItem = {
          permissionId: item.id,
          permissionName: item.permission_name,
          permissionDesc: item.description,
          operations: [item.value]
        }

        payload.permissionDetails.push(detailItem);
      } else if (item.checked &&
          !payload.permissionDetails[detailItemIdx].operations.includes(item.value)) {
        payload.permissionDetails[detailItemIdx].operations.push(item.value);
      }
    });
    dispatch(userActions.createUserRole(payload));
  }

  return isRedirect ? <Redirect to={{ pathname: '/users/role' }}/> : (
    <CRow>
      <CCol>
        <CForm onSubmit={formik.handleSubmit}>
          <CCard>
            <CCardHeader>
                {match.params.id ? t('view.UserRoles.EditUserRole') : t('view.UserRoles.NewUserRole')}
                <button type="submit" className="float-right btn btn-primary btn-sm">
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
                        <th>{t('common.All')}</th>
                        <th>{t('common.Create')}</th>
                        <th>{t('common.Update')}</th>
                        <th>{t('common.Delete')}</th>
                        <th>{t('common.Read')}</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      permissions.map((permission) => {
                        return <tr key={'tr-permission-id' + permission.id}>
                          <CheckboxGroup name={`group-${permission.name}`} onChange={onCheckboxChange}>
                            <td>
                              <label>
                                <AllCheckerCheckbox />
                                <span className="ml-2">{permission.description} All</span>
                              </label>
                            </td>
                            {
                              permission.children.map((childPermission) => {
                                return <td key={`${permission.id}-${childPermission.id}-${childPermission.value}`}>
                                  <label>
                                    <Checkbox id={childPermission.id} name={childPermission.name} permission_name={childPermission.permissionName} description={childPermission.permissionDesc} value={childPermission.value} checked={childPermission.checked}/>
                                    <span className="ml-2">{childPermission.description}</span>
                                  </label>
                                </td>
                              })
                            }
                          </CheckboxGroup>
                        </tr>
                      })
                    }
                    </tbody>
                  </table>
                </CFormGroup>
            </CCardBody>
          </CCard>
          <div className="text-center mb-3">
            <CButton type="submit" color="primary" className="text-center">{t('common.Save')}</CButton>
          </div>
        </CForm>
      </CCol>
    </CRow>
  )
}

export default UserRole
