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
  CInput, CInvalidFeedback, CFormGroup, CButton, CInputGroupPrepend, CInputGroupText, CInputGroup, CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {userActions} from "../actions";
import {useTranslation} from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import 'yup-phone';

const User = ({match}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.userDetail);

  const userDetails = user ? Object.entries(user) : 
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  const permissions = ['ROLE_ADMIN', 'ROLE_USER'];

  const formik = useFormik({
    initialValues: {
      username: '',
      userRole: '',
      email: '',
      firstName: '',
      lastName: '',
      mobilePhone: '',
      birthDate: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      zipCode: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      userRole: Yup.string().required().oneOf(permissions),
      email: Yup.string().email().required(),
      firstName: Yup.string().email().required(),
      lastName: Yup.string().email().required(),
      mobilePhone: Yup.string().phone('VN').required()
    }),
    onSubmit: values => {
      console.log('onSubmit values=', values);
    }
  });

  useEffect(() => {
    dispatch(userActions.getUserDetail(match.params.id));
  }, []);
  return (
    <CRow>
      <CCol lg={12}>
        <CForm>
          <CCard>
            <CCardHeader>
              {match.params.id ? t('common.EditUser') : t('common.NewUser')}
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm={3} className="mb-4">
                  <CLabel htmlFor="username" className="col-form-label">{t('view.User.Username')} <span className="form-required"> *</span></CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput invalid={formik.errors.username && formik.touched.username}
                      id="username"
                      name="username"
                      value={formik.values.username}
                      placeholder={t('view.User.Username')}
                      {...formik.getFieldProps("username")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol sm={3} className="mb-4">
                  <CLabel htmlFor="UserRole" className="col-form-label">{t('view.User.UserRole')} <span className="form-required"> *</span></CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-people" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect custom name="selectUserRole" id="selectUserRole" invalid={formik.errors.userRole && formik.touched.userRole}
                       {...formik.getFieldProps("userRole")}>
                      <option value="0">{t('messages.messagePleaseSelect')}</option>
                      <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                      <option value="ROLE_USER">ROLE_USER</option>
                    </CSelect>
                  </CInputGroup>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="EmailAddress" className="col-form-label">{t('view.User.EmailAddress')} <span className="form-required"> *</span></CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-envelope-closed" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="EmailAddress" name="EmailAddress"
                      invalid={formik.errors.email && formik.touched.email}
                      placeholder={t('view.User.EmailAddress')}
                      value={formik.values.email}
                      {...formik.getFieldProps("email")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol sm={3} className="mb-4">
                  <CLabel htmlFor="FirstName" className="col-form-label">{t('view.User.FirstName')} <span className="form-required"> *</span></CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="FirstName" name="FirstName" placeholder={t('view.User.FirstName')}
                      invalid={formik.errors.firstName && formik.touched.firstName}
                      value={formik.values.firstName}
                      {...formik.getFieldProps("firstName")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol sm={3} className="mb-4">
                  <CLabel htmlFor="LastName" className="col-form-label">{t('view.User.LastName')} <span className="form-required"> *</span></CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="LastName" name="LastName" placeholder={t('view.User.LastName')}
                      invalid={formik.errors.lastName && formik.touched.lastName}
                      value={formik.values.lastName}
                      {...formik.getFieldProps("lastName")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="MobileNumber" className="col-form-label">{t('view.User.MobileNumber')} <span className="form-required"> *</span></CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-phone" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="number" id="MobileNumber" name="MobileNumber" placeholder={t('common.MobileNumber')}
                      invalid={formik.errors.mobilePhone && formik.touched.mobilePhone}
                      value={formik.values.mobilePhone}
                      {...formik.getFieldProps("mobilePhone")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="DateOfBirth" className="col-form-label">{t('view.User.DateOfBirth')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-calendar" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="date" id="DateOfBirth" name="DateOfBirth" value={formik.values.birthDate}/>
                  </CInputGroup>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="Status" className="col-form-label">{t('view.User.Status')} <span className="form-required"> *</span></CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-check" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect custom name="selectStatus" id="selectStatus">
                      <option value="0">{t('messages.messagePleaseSelect')}</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </CSelect>
                  </CInputGroup>
                </CCol>
                <CCol sm={12} className="mb-4">
                  <hr/>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="AddressLine1" className="col-form-label">{t('view.User.AddressLine1')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-location-pin" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="AddressLine1" name="AddressLine1" placeholder={t('view.User.AddressLine1')} value={formik.values.addressLine1} />
                  </CInputGroup>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="AddressLine2" className="col-form-label">{t('view.User.AddressLine2')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-location-pin" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="AddressLine2" name="AddressLine2" placeholder={t('view.User.AddressLine2')} value={formik.values.addressLine2} />
                  </CInputGroup>
                </CCol>
                <CCol sm={3} className="mb-4">
                  <CLabel htmlFor="AreaOrCity" className="col-form-label">{t('view.User.AreaOrCity')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-location-pin" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="AreaOrCity" name="AreaOrCity" placeholder={t('view.User.AreaOrCity')} value={formik.values.city} />
                  </CInputGroup>
                </CCol>
                <CCol sm={3} className="mb-4">
                  <CLabel htmlFor="Country" className="col-form-label">{t('view.User.Country')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-map" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="Country" name="Country" placeholder={t('view.User.Country')} value={formik.values.country}/>
                  </CInputGroup>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="PostalZipCode" className="col-form-label">{t('view.User.PostalZipCode')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-location-pin" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="PostalZipCode" name="PostalZipCode" placeholder={t('view.User.PostalZipCode')} value={formik.values.zipCode} />
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
