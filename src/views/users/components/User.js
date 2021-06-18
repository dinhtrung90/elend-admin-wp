import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CLabel,
  CInput,
  CButton,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroup,
  CSelect, CSwitch, CInputGroupAppend
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {userActions} from "../actions";
import {useTranslation} from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import 'yup-phone';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const User = ({match}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const user = useSelector(state => state.users.userDetail);
  const userRoles = useSelector(state => state.users.userRoles);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealPwdConfirm, setIsRevealPwdConfirm] = useState(false);

  const isNew = !match.params.id;

  const userDetails = user ? Object.entries(user) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  const genders = ['MALE', 'FEMALE', 'UNKNOWN'];
  const permissionsOptions = [];
  if (userRoles && userRoles.length > 0) {
    userRoles.forEach(role => {
      if (!role.description || role.description.length === 0) return;
      permissionsOptions.push({
        value: role.roleName,
        label: role.description
      })
    })
  }

  const statusList = ['ACTIVE', 'INACTIVE', 'PENDING', 'BANNED'];

  let schema = Yup.object({
    username: Yup.string().required(),
    gender: Yup.string().required().oneOf(genders),
    userRoles: Yup.array().min(1),
    email: Yup.string().email().required(),
    firstName: Yup.string().email().required(),
    lastName: Yup.string().email().required(),
    mobilePhone: Yup.string().phone('VN').required(),
    status: match.params.id ? Yup.string().required().oneOf(statusList) : Yup.string().notRequired()
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      showPassword: false,
      passwordConfirm: '',
      showPasswordConfirm: false,
      temporary: false, // If enabled, the user must change the password on next login
      gender: '',
      userRoles: [],
      email: '',
      firstName: '',
      lastName: '',
      mobilePhone: '',
      birthDate: '',
      userStatus: '',
      addressFirstLine: '',
      addressSecondLine: '',
      city: '',
      country: '',
      zipCode: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      console.log('onSubmit values=', values);
    }
  });

  const handleMultiSelect = (value) => {
    formik.values.userRoles = value;
  }

  const customMultiSelectStyle = () => {
    return formik.errors.userRoles && formik.touched.userRoles ? 'custom-multi-select invalid' : 'custom-multi-select';
  }

  useEffect(() => {
    const loadData = async () => {
      await dispatch(userActions.getAllUserRoles({all: true}));
      if (match.params.id) {
        await dispatch(userActions.getUserDetail(match.params.id));
      }
    }
    loadData();
  }, [dispatch]);
  return (
    <CRow>
      <CCol lg={12}>
        <CForm onSubmit={formik.handleSubmit}>
          <CCard>
            <CCardHeader>
              {isNew ? t('common.NewUser') : t('common.EditUser')}
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
                  <CLabel htmlFor="UserRole" className="col-form-label">{t('view.User.Gender')} <span className="form-required"> *</span></CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-people" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect custom name="Gender" id="Gender" invalid={formik.errors.gender && formik.touched.gender}
                             {...formik.getFieldProps("gender")}>
                      <option value="0">{t('messages.messagePleaseSelect')}</option>
                      <option value="MALE">{t('view.User.GenderType.Male')}</option>
                      <option value="FEMALE">{t('view.User.GenderType.Female')}</option>
                      <option value="UNKNOWN">{t('view.User.GenderType.Unknown')}</option>
                    </CSelect>
                  </CInputGroup>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <CLabel htmlFor="UserRole" className="col-form-label">{t('view.User.UserRole')} <span className="form-required"> *</span></CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-people" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <Select
                      placeholder={<div>{t('messages.messagePleaseSelect')}</div>}
                      onChange={handleMultiSelect}
                      className={customMultiSelectStyle()}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      options={permissionsOptions}
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
                <CCol sm={6} className={isNew ? 'mb-4 hidden' : 'mb-4 show'}>
                  <CLabel htmlFor="Status" className="col-form-label">{t('view.User.Status')} <span className="form-required"> *</span></CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-check" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect custom name="userStatus" id="userStatus" invalid={formik.errors.userStatus && formik.touched.userStatus}
                             {...formik.getFieldProps("userStatus")}>
                      <option value="0">{t('messages.messagePleaseSelect')}</option>
                      <option value="ACTIVE" className=''>{t('view.User.StatusType.Active')}</option>
                      <option value="INACTIVE">{t('view.User.StatusType.Inactive')}</option>
                      <option value="PENDING">{t('view.User.StatusType.Pending')}</option>
                      <option value="BANNED">{t('view.User.StatusType.Banned')}</option>
                    </CSelect>
                  </CInputGroup>
                </CCol>
                <CCol sm={12} className="mb-4">
                  <hr/>
                </CCol>
                <CCol sm={6} className="mb-4">
                  <h4>Reset Password</h4>
                  <CRow>
                    <CCol>
                      <CLabel htmlFor="password" className="col-form-label">{t('view.User.Password')}</CLabel>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <FaLock />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                            id="password"
                            type={isRevealPwd ? "text" : "password"}
                            name="password"
                            value={formik.values.password}
                            placeholder={t('view.User.Password')}
                            {...formik.getFieldProps("password")}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText onClick={() => setIsRevealPwd(isRevealPwd => !isRevealPwd)}>{ isRevealPwd ? <FaRegEyeSlash /> : <FaRegEye /> }</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow className="mt-4">
                    <CCol>
                      <CLabel htmlFor="passwordConfirm" className="col-form-label">{t('view.User.PasswordConfirmation')}</CLabel>
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <FaLock />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                            id="passwordConfirm"
                            type={isRevealPwdConfirm ? "text" : "password"}
                            name="passwordConfirm"
                            value={formik.values.passwordConfirm}
                            placeholder={t('view.User.PasswordConfirmation')}
                            {...formik.getFieldProps("passwordConfirm")}
                        />
                        <CInputGroupAppend>
                          <CInputGroupText onClick={() => setIsRevealPwdConfirm(isRevealPwdConfirm => !isRevealPwdConfirm)}>{ isRevealPwdConfirm ? <FaRegEyeSlash /> : <FaRegEye /> }</CInputGroupText>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow className="mt-4">
                    <CCol>
                      <div style={{display: "flex", alignItems: 'center'}}>
                        <b>Temporary</b>  <CSwitch className={'mx-1'} variant={'3d'} color={'success'} defaultChecked />
                      </div>
                    </CCol>
                  </CRow>
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
                    <CInput type="text" id="AddressLine1" name="AddressLine1" placeholder={t('view.User.AddressLine1')} value={formik.values.addressFirstLine}
                      {...formik.getFieldProps("addressFirstLine")}
                    />
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
                    <CInput id="AddressLine2" name="AddressLine2" placeholder={t('view.User.AddressLine2')} value={formik.values.addressSecondLine}
                      {...formik.getFieldProps("addressSecondLine")}
                    />
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
                    <CInput id="AreaOrCity" name="AreaOrCity" placeholder={t('view.User.AreaOrCity')} value={formik.values.city}
                      {...formik.getFieldProps("city")}
                    />
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
                    <CInput id="Country" name="Country" placeholder={t('view.User.Country')} value={formik.values.country}
                      {...formik.getFieldProps("country")}
                    />
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
                    <CInput id="PostalZipCode" name="PostalZipCode" placeholder={t('view.User.PostalZipCode')} value={formik.values.zipCode}
                      {...formik.getFieldProps("zipCode")}
                    />
                  </CInputGroup>
                </CCol>
              </CRow>
              <hr />
              <CRow className="flex-center">
                <CButton type="submit" color="primary" className="text-center">{t('common.Save')}</CButton>
              </CRow>
            </CCardBody>
          </CCard>
        </CForm>
      </CCol>
    </CRow>
  )
}

export default User
