import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CLabel,
  CInput, CInvalidFeedback, CFormGroup, CButton, CInputGroupPrepend, CInputGroupText, CInputGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {userActions} from "../actions";
import {useTranslation} from "react-i18next";

const User = ({match}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.userDetail);

  const userDetails = user ? Object.entries(user) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  useEffect(() => {
    dispatch(userActions.getUserDetail(match.params.id));
  }, []);
  return (
    <CRow>
      <CCol lg={12}>
        <CForm>
          <CCard>
            <CCardHeader>
              {match.params.id ? 'Edit User' : 'New User'}
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm={3} className="mb-4">
                  <CLabel htmlFor="username">{t('view.User.Username')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="username" name="username" placeholder="Username" />
                  </CInputGroup>
                </CCol>
                <CCol sm={3} className="mb-4">
                  <CLabel htmlFor="UserRole">{t('view.User.UserRole')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-people" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="UserRole" name="UserRole" placeholder="User Role" />
                  </CInputGroup>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="EmailAddress">{t('view.User.EmailAddress')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-envelope-closed" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="EmailAddress" name="EmailAddress" placeholder="Email Address" />
                  </CInputGroup>
                </CCol>
                <CCol sm={3} className="mb-4">
                  <CLabel htmlFor="FirstName">{t('view.User.FirstName')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="FirstName" name="FirstName" placeholder="First Name" />
                  </CInputGroup>
                </CCol>
                <CCol sm={3} className="mb-4">
                  <CLabel htmlFor="LastName">{t('view.User.LastName')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="LastName" name="LastName" placeholder="Last Name" />
                  </CInputGroup>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="MobileNumber">{t('view.User.MobileNumber')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-phone" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="MobileNumber" name="MobileNumber" placeholder="Mobile Number" />
                  </CInputGroup>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="DateOfBirth">{t('view.User.DateOfBirth')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-calendar" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="date" id="DateOfBirth" name="DateOfBirth" placeholder="Date of Birth" />
                  </CInputGroup>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="Status">{t('view.User.Status')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-check" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="Status" name="Status" placeholder="Status" />
                  </CInputGroup>
                </CCol>
                <CCol sm={12} className="mb-4">
                  <hr/>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="AddressLine1">{t('view.User.AddressLine1')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-location-pin" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="AddressLine1" name="AddressLine1" placeholder="AddressLine1" />
                  </CInputGroup>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="AddressLine2">{t('view.User.AddressLine2')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-location-pin" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="AddressLine2" name="AddressLine2" placeholder="AddressLine2" />
                  </CInputGroup>
                </CCol>
                <CCol sm={3} className="mb-4">
                  <CLabel htmlFor="AreaOrCity">{t('view.User.AreaOrCity')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-location-pin" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="AreaOrCity" name="AreaOrCity" placeholder="AreaOrCity" />
                  </CInputGroup>
                </CCol>
                <CCol sm={3} className="mb-4">
                  <CLabel htmlFor="Country">{t('view.User.Country')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-map" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="Country" name="Country" placeholder="Country" />
                  </CInputGroup>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="PostalZipCode">{t('view.User.PostalZipCode')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-location-pin" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="PostalZipCode" name="PostalZipCode" placeholder="PostalZipCode" />
                  </CInputGroup>
                </CCol>
              </CRow>
              <hr />
              <CRow className="flex-center">
                <CButton type="submit" color="primary" className="text-center">{t('common.Save')}</CButton>
              </CRow>
                {/*<table className="table table-striped table-hover">*/}
                {/*  <tbody>*/}
                {/*    {*/}
                {/*      userDetails.map(([key, value], index) => {*/}
                {/*        return (*/}
                {/*          <tr key={index.toString()}>*/}
                {/*            <td>{`${key}:`}</td>*/}
                {/*            <td><strong>{value}</strong></td>*/}
                {/*          </tr>*/}
                {/*        )*/}
                {/*      })*/}
                {/*    }*/}
                {/*  </tbody>*/}
                {/*</table>*/}
            </CCardBody>
          </CCard>
        </CForm>
      </CCol>
    </CRow>
  )
}

export default User
