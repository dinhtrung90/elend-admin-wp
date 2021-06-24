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
  CSelect, CSwitch, CInputGroupAppend, CInvalidFeedback
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
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const User = ({match}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const user = useSelector(state => state.users.userDetail);
  const userRoles = useSelector(state => state.users.userRoles);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealPwdConfirm, setIsRevealPwdConfirm] = useState(false);
  const [countryValue, setCountryValue] = useState('Vietnam');
  const [cityValue, setCityValue] = useState('');
  const isNew = !match.params.id;

  const userDetails = user ? Object.entries(user) :
    [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]

  const genders = ['Male', 'Female', 'Unknown'];
  const constGenders = {
    MALE: 'Male',
    FEMALE: 'Female',
    UNKNOWN: 'Unknown'
  }

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

  const statusList = ['Active', 'Inactive', 'Pending', 'Banned'];
  const constStatusList = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    PENDING: 'Pending',
    BANNED: 'Banned'
  }
  const strongPasswordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  let schema = Yup.object({
    username: Yup.string().email(t('messages.validations.emailInvalid')).required(t('messages.validations.emailRequired')),
    userRoles: Yup.array().min(1, t('messages.validations.roleRequired')),
    gender: Yup.string().required(t('messages.validations.genderRequired')).oneOf(genders),
    email: Yup.string().email(t('messages.validations.emailInvalid')).required(t('messages.validations.emailRequired')),
    firstName: Yup.string().required(t('messages.validations.firstNameRequired')),
    lastName: Yup.string().required(t('messages.validations.lastNameRequired')),
    password: Yup.string().matches(strongPasswordReg, t('messages.validations.passwordStrongRequired'))
        .required(t('messages.validations.passwordRequired')),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required(t('messages.validations.confirmPasswordRequired'))
  });

  if (match.params.id) {
    // generate edit schema
    schema = Yup.object({
      username: Yup.string().email(t('messages.validations.emailInvalid')).required(t('messages.validations.emailRequired')),
      userRoles: Yup.array().min(1, t('messages.validations.roleRequired')),
      gender: Yup.string().required(t('messages.validations.genderRequired')).oneOf(genders),
      email: Yup.string().email(t('messages.validations.emailInvalid')).required(t('messages.validations.emailRequired')),
      firstName: Yup.string().required(t('messages.validations.firstNameRequired')),
      lastName: Yup.string().required(t('messages.validations.lastNameRequired')),
      password: Yup.string().matches(strongPasswordReg, t('messages.validations.passwordStrongRequired')),
      passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], t('messages.validations.confirmPasswordNotMatch'))
    });
  }

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
    onSubmit: values => handleToSubmitAccount(values)
  });

  const handleMultiSelect = (value) => {
    formik.values.userRoles = value;
  }

  const customMultiSelectStyle = () => {
    return formik.errors.userRoles && formik.touched.userRoles ? 'custom-multi-select invalid' : 'custom-multi-select';
  }

  const handleToSubmitAccount = (data) => {
    const payload = {
      'login': data.username,
      'email': data.email,
      'firstName': data.firstName,
      'lastName': data.lastName,
      'isEnable': false,
      'userAddressList': [
        {
          'addressLine1': data.addressFirstLine,
          'addressLine2': data.addressSecondLine,
          'city': cityValue,
          'country': countryValue,
          'zipCode': data.zipCode
        }
      ],
      'userProfileDto': {
        'phone': data.mobilePhone.toString(),
        'gender': data.gender,
        'birthDate': data.birthDate
      },
      'authorities': [
        {
          'name': 'ROLE_ADMIN',
          'description': 'Role Admin'
        }
      ]
    }

    if (data.password && data.password.length > 0) {
      payload.tempPassword = data.password;
      payload.isTempPassword = data.temporary
    }

    if (match.params.id) {
      // dispatch(userActions.editUser(payload));
    } else {
      dispatch(userActions.createUser(payload));
    }
  }

  const changeCountryHandler = value => {
    setCountryValue(value);
  }

  const changeCityHandler = value => {
    setCityValue(value);
  }

  const getBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'secondary';
      case 'pending':
        return 'warning';
      case 'banned':
        return 'danger';
      default:
        return 'primary';
    }
  };

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
                  <CInvalidFeedback style={{'display': formik.errors.username && formik.touched.username ? 'block' : 'none'}}>{formik.errors.username}</CInvalidFeedback>
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
                      <option value={constGenders.MALE}>{t('view.User.GenderType.Male')}</option>
                      <option value={constGenders.FEMALE}>{t('view.User.GenderType.Female')}</option>
                      <option value={constGenders.UNKNOWN}>{t('view.User.GenderType.Unknown')}</option>
                    </CSelect>
                  </CInputGroup>
                  <CInvalidFeedback style={{'display': formik.errors.gender && formik.touched.gender ? 'block' : 'none'}}>{formik.errors.gender}</CInvalidFeedback>
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
                  <CInvalidFeedback style={{'display': formik.errors.userRoles && formik.touched.userRoles ? 'block' : 'none'}}>{formik.errors.userRoles}</CInvalidFeedback>
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
                  <CInvalidFeedback style={{'display': formik.errors.firstName && formik.touched.firstName ? 'block' : 'none'}}>{formik.errors.firstName}</CInvalidFeedback>
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
                  <CInvalidFeedback style={{'display': formik.errors.lastName && formik.touched.lastName ? 'block' : 'none'}}>{formik.errors.lastName}</CInvalidFeedback>
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
                  <CInvalidFeedback style={{'display': formik.errors.email && formik.touched.email ? 'block' : 'none'}}>{formik.errors.email}</CInvalidFeedback>
                </CCol>
                <CCol sm={6} className='mb-4'>
                  <CLabel htmlFor="MobileNumber" className="col-form-label">{t('view.User.MobileNumber')}</CLabel>
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
                <CCol sm={6} className='mb-4'>
                  <CLabel htmlFor="DateOfBirth" className="col-form-label">{t('view.User.DateOfBirth')}</CLabel>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-calendar" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="date" id="DateOfBirth" name="DateOfBirth" value={formik.values.birthDate}
                      {...formik.getFieldProps("birthDate")}
                    />
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
                      <option value={constStatusList.ACTIVE} className=''>{t('view.User.StatusType.Active')}</option>
                      <option value={constStatusList.INACTIVE}>{t('view.User.StatusType.Inactive')}</option>
                      <option value={constStatusList.PENDING}>{t('view.User.StatusType.Pending')}</option>
                      <option value={constStatusList.BANNED}>{t('view.User.StatusType.Banned')}</option>
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
                            invalid={formik.errors.password && formik.touched.password}
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
                      <CInvalidFeedback style={{'display': formik.errors.password && formik.touched.password ? 'block' : 'none'}}>{formik.errors.password}</CInvalidFeedback>
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
                            invalid={formik.errors.passwordConfirm && formik.touched.passwordConfirm}
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
                      <CInvalidFeedback style={{'display': formik.errors.passwordConfirm && formik.touched.passwordConfirm ? 'block' : 'none'}}>{formik.errors.passwordConfirm}</CInvalidFeedback>
                    </CCol>
                  </CRow>
                  {formik.values.password && formik.values.password.length > 0 ? (
                  <CRow className="mt-4">
                    <CCol>
                      <div style={{display: "flex", alignItems: 'center'}}>
                        <b>Temporary</b>  <CSwitch className={'mx-1'} variant={'3d'} color={'success'} checked={formik.values.temporary} {...formik.getFieldProps("temporary")}  />
                      </div>
                    </CCol>
                  </CRow>) : null
                  }
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
                    <RegionDropdown
                        className="custom-multi-select-2"
                        country={countryValue}
                        value={cityValue}
                        onChange={changeCityHandler} />
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
                    <CountryDropdown
                        className="custom-multi-select-2"
                        value={countryValue}
                        onChange={changeCountryHandler} />
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
