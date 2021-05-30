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
import {Redirect} from "react-router-dom";

const UserRole = ({match}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const userRoleData = useSelector(state => state.users.userRoleDetail);
  const isRedirect = useSelector(state => state.users.isRedirect);
  const permissions = useSelector(state => state.users.permissions) || [];
  const [userRoleDetail, setUserRoleDetail] = useState(userRoleData);

  useEffect(() => {
    if (match.params.id) {
      dispatch(userActions.getUserRoleDetail(match.params.id));
    }
    dispatch(userActions.getAllPermissions());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserRoleDetail((userRoleDetail) => ({ ...userRoleDetail, [name]: value }));
  }

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
      dispatch(userActions.createUserRole(userRoleDetail));
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
                  <CInput id="userRoleName" name="roleName" value={userRoleData.roleName} onChange={handleChange}  />
              </CFormGroup>
              <CFormGroup>
                  <CLabel htmlFor="description">{t('common.Description')}</CLabel>
                  <CInput id="description" name="description" value={userRoleData.description} onChange={handleChange} />
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
          <CButton type="submit" color="primary" className="text-center" onClick={handCreateUserRoleClick}>{t('common.Save')}</CButton>
        </div>
      </CCol>
    </CRow>
  )
}

export default UserRole
