import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CCol,
  CRow,
  CButton,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CFormControl,
  CFormFeedback,
  CFormSelect,
  CFormCheck,
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
import CIcon from '@coreui/icons-react'
import Select from 'react-select'
import { FaLock, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { colorHelpers } from '../../../../utils/color-helper'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { userActions } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'

const TabContentProfile = (props) => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const { paramId, isNew, isFetching, animatedComponents, ...attributes } = props
  const userDetail = useSelector((state) => state.users.userDetail)
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [isRevealPwdConfirm, setIsRevealPwdConfirm] = useState(false)

  const genders = ['Male', 'Female', 'Unknown']
  const strongPasswordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  let schema = Yup.object({
    userRoles: Yup.array().min(1, t('messages.validations.roleRequired')),
    gender: Yup.string().required(t('messages.validations.genderRequired')).oneOf(genders),
    email: Yup.string()
      .email(t('messages.validations.emailInvalid'))
      .required(t('messages.validations.emailRequired')),
    firstName: Yup.string().required(t('messages.validations.firstNameRequired')),
    lastName: Yup.string().required(t('messages.validations.lastNameRequired')),
    password: Yup.string()
      .matches(strongPasswordReg, t('messages.validations.passwordStrongRequired'))
      .required(t('messages.validations.passwordRequired')),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required(t('messages.validations.confirmPasswordRequired')),
  })

  if (paramId) {
    // generate edit schema
    schema = Yup.object({
      username: Yup.string()
        .email(t('messages.validations.emailInvalid'))
        .required(t('messages.validations.emailRequired')),
      userRoles: Yup.array().min(1, t('messages.validations.roleRequired')),
      gender: Yup.string().required(t('messages.validations.genderRequired')).oneOf(genders),
      email: Yup.string()
        .email(t('messages.validations.emailInvalid'))
        .required(t('messages.validations.emailRequired')),
      firstName: Yup.string().required(t('messages.validations.firstNameRequired')),
      lastName: Yup.string().required(t('messages.validations.lastNameRequired')),
      password: Yup.string().matches(
        strongPasswordReg,
        t('messages.validations.passwordStrongRequired'),
      ),
      passwordConfirm: Yup.string().oneOf(
        [Yup.ref('password'), null],
        t('messages.validations.confirmPasswordNotMatch'),
      ),
    })
  }

  const formik = useFormik({
    initialValues: {
      id: userDetail.id,
      username: userDetail.username || '',
      password: '',
      showPassword: false,
      passwordConfirm: '',
      showPasswordConfirm: false,
      temporary: false, // If enabled, the user must change the password on next login
      gender: userDetail.gender || '',
      userRoles: userDetail.userRoles || [],
      email: userDetail.email || '',
      firstName: userDetail.firstName || '',
      lastName: userDetail.lastName || '',
      mobilePhone: userDetail.mobilePhone || '',
      birthDate: userDetail.birthDate || '',
      userStatus: userDetail.userStatus || {
        value: 'value',
        label: 'Pending',
        color: colorHelpers.getColorByStatus('Pending', true),
      },
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      zipCode: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => handleToSubmitAccount(values),
  })

  const handleToSubmitAccount = (data) => {
    const payload = {
      userId: data.id,
      login: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      imageUrl: '', // TODO implement avatar
      accountStatus: data.userStatus.value.toUpperCase(),
      langKey: i18n.language,
      birthDate: data.birthDate,
      gender: data.gender,
      mobilePhone: data.mobilePhone.toString(),
      homePhone: data.homePhone ? data.homePhone.toString() : '',
    }

    if (data.password && data.password.length > 0) {
      payload.tempPassword = data.password
      payload.isTempPassword = data.temporary
    }

    if (paramId) {
      dispatch(userActions.updateUser(payload))
    } else {
      dispatch(userActions.createUser(payload))
    }
  }

  const onUserDetailSuccess = () => {
    formik.setFieldValue('username', userDetail.username)
    formik.setFieldValue('gender', userDetail.gender)
    formik.setFieldValue('userRoles', userDetail.userRoles)
    formik.setFieldValue('email', userDetail.email)
    formik.setFieldValue('firstName', userDetail.firstName)
    formik.setFieldValue('lastName', userDetail.lastName)
    formik.setFieldValue('mobilePhone', userDetail.mobilePhone)
    formik.setFieldValue('birthDate', userDetail.birthDate)
    formik.setFieldValue('userStatus', userDetail.userStatus)
  }

  const constGenders = {
    MALE: 'Male',
    FEMALE: 'Female',
    UNKNOWN: 'Unknown',
  }

  const statusOptions = [
    { value: 0, label: 'Please select', color: colorHelpers.getColorByStatus('', true) },
    {
      value: 'Active',
      label: t('view.User.StatusType.Active'),
      color: colorHelpers.getColorByStatus('active', true),
    },
    {
      value: 'Inactive',
      label: t('view.User.StatusType.Inactive'),
      color: colorHelpers.getColorByStatus('inactive', true),
    },
    {
      value: 'Pending',
      label: t('view.User.StatusType.Pending'),
      color: colorHelpers.getColorByStatus('pending', true),
    },
    {
      value: 'Banned',
      label: t('view.User.StatusType.Banned'),
      color: colorHelpers.getColorByStatus('banned', true),
    },
  ]

  const dotStatus = (color = '#ccc') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  })
  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    input: (styles) => ({ ...styles, ...dotStatus() }),
    placeholder: (styles) => ({ ...styles, ...dotStatus() }),
    singleValue: (styles, { data }) => ({ ...styles, ...dotStatus(data.color) }),
  }

  const customMultiSelectStyle = () => {
    return formik.errors.userRoles && formik.touched.userRoles
      ? 'custom-multi-select invalid'
      : 'custom-multi-select'
  }

  const onChangeStatus = (option) => {
    formik.setFieldValue('userStatus', option)
  }

  const handleToFormikSubmit = (e) => {
    formik.handleSubmit(e)
  }

  return (
    <CRow className="p-4">
      <CCol sm={12}>
        <CRow>
          <CCol sm={3} className="mb-4">
            <CFormLabel htmlFor="FirstName" className="col-form-label">
              {t('view.User.FirstName')} <span className="form-required"> *</span>
            </CFormLabel>
            <CInputGroup>
              <CInputGroupText>
                <CIcon name="cil-user" />
              </CInputGroupText>
              <CFormControl
                id="FirstName"
                name="FirstName"
                placeholder={t('view.User.FirstName')}
                invalid={formik.errors.firstName && formik.touched.firstName}
                value={formik.values.firstName}
                {...formik.getFieldProps('firstName')}
              />
            </CInputGroup>
            <CFormFeedback
              invalid
              style={{
                display: formik.errors.firstName && formik.touched.firstName ? 'block' : 'none',
              }}
            >
              {formik.errors.firstName}
            </CFormFeedback>
          </CCol>
          <CCol sm={3} className="mb-4">
            <CFormLabel htmlFor="LastName" className="col-form-label">
              {t('view.User.LastName')} <span className="form-required"> *</span>
            </CFormLabel>
            <CInputGroup>
              <CInputGroupText>
                <CIcon name="cil-user" />
              </CInputGroupText>
              <CFormControl
                id="LastName"
                name="LastName"
                placeholder={t('view.User.LastName')}
                invalid={formik.errors.lastName && formik.touched.lastName}
                value={formik.values.lastName}
                {...formik.getFieldProps('lastName')}
              />
            </CInputGroup>
            <CFormFeedback
              invalid
              style={{
                display: formik.errors.lastName && formik.touched.lastName ? 'block' : 'none',
              }}
            >
              {formik.errors.lastName}
            </CFormFeedback>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6} className="mb-4">
            <CFormLabel htmlFor="EmailAddress" className="col-form-label">
              {t('view.User.EmailAddress')} <span className="form-required"> *</span>
            </CFormLabel>
            <CInputGroup>
              <CInputGroupText>
                <CIcon name="cil-envelope-closed" />
              </CInputGroupText>
              <CFormControl
                id="EmailAddress"
                name="EmailAddress"
                invalid={formik.errors.email && formik.touched.email}
                placeholder={t('view.User.EmailAddress')}
                value={formik.values.email}
                {...formik.getFieldProps('email')}
              />
            </CInputGroup>
            <CFormFeedback
              invalid
              style={{
                display: formik.errors.email && formik.touched.email ? 'block' : 'none',
              }}
            >
              {formik.errors.email}
            </CFormFeedback>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={3} className="mb-4">
            <CFormLabel htmlFor="UserRole" className="col-form-label">
              {t('view.User.Gender')} <span className="form-required"> *</span>
            </CFormLabel>
            <CInputGroup>
              <CInputGroupText>
                <CIcon name="cil-people" />
              </CInputGroupText>
              <CFormSelect
                custom
                name="Gender"
                id="Gender"
                invalid={formik.errors.gender && formik.touched.gender}
                {...formik.getFieldProps('gender')}
              >
                <option value="0">{t('messages.messagePleaseSelect')}</option>
                <option value={constGenders.MALE}>{t('view.User.GenderType.Male')}</option>
                <option value={constGenders.FEMALE}>{t('view.User.GenderType.Female')}</option>
                <option value={constGenders.UNKNOWN}>{t('view.User.GenderType.Unknown')}</option>
              </CFormSelect>
            </CInputGroup>
            <CFormFeedback
              invalid
              style={{
                display: formik.errors.gender && formik.touched.gender ? 'block' : 'none',
              }}
            >
              {formik.errors.gender}
            </CFormFeedback>
          </CCol>
          <CCol sm={3} className="mb-4">
            <CFormLabel htmlFor="DateOfBirth" className="col-form-label">
              {t('view.User.DateOfBirth')}
            </CFormLabel>
            <CInputGroup>
              <CInputGroupText>
                <CIcon name="cil-calendar" />
              </CInputGroupText>
              <CFormControl
                type="date"
                id="DateOfBirth"
                name="DateOfBirth"
                value={formik.values.birthDate}
                {...formik.getFieldProps('birthDate')}
              />
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6} className="mb-4">
            <CFormLabel htmlFor="MobileNumber" className="col-form-label">
              {t('view.User.MobileNumber')}
            </CFormLabel>
            <CInputGroup>
              <CInputGroupText>
                <CIcon name="cil-phone" />
              </CInputGroupText>
              <CFormControl
                type="number"
                id="MobileNumber"
                name="MobileNumber"
                placeholder={t('common.MobileNumber')}
                invalid={formik.errors.mobilePhone && formik.touched.mobilePhone}
                value={formik.values.mobilePhone}
                {...formik.getFieldProps('mobilePhone')}
              />
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={6} className={isNew && !isFetching ? 'mb-4 hidden' : 'mb-4 show'}>
            <CFormLabel htmlFor="Status" className="col-form-label">
              {t('view.User.Status')} <span className="form-required"> *</span>
            </CFormLabel>
            <CInputGroup>
              <CInputGroupText>
                <CIcon name="cil-check" />
              </CInputGroupText>
              <Select
                value={formik.values.userStatus}
                placeholder={<div>{t('messages.messagePleaseSelect')}</div>}
                name="user-status-select"
                options={statusOptions}
                classNamePrefix="select"
                className={customMultiSelectStyle()}
                components={animatedComponents}
                styles={colourStyles}
                onChange={onChangeStatus}
              />
            </CInputGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={12} className="mb-4">
            <hr />
          </CCol>
          <CCol sm={6} className="mb-4">
            <h4>Reset Password</h4>
            <CRow>
              <CCol>
                <CFormLabel htmlFor="password" className="col-form-label">
                  {t('view.User.Password')}
                </CFormLabel>
                <CInputGroup>
                  <CInputGroupText>
                    <FaLock />
                  </CInputGroupText>
                  <CFormControl
                    id="password"
                    invalid={formik.errors.password && formik.touched.password}
                    type={isRevealPwd ? 'text' : 'password'}
                    name="password"
                    value={formik.values.password}
                    placeholder={t('view.User.Password')}
                    {...formik.getFieldProps('password')}
                  />
                  <CInputGroupText onClick={() => setIsRevealPwd((isRevealPwd) => !isRevealPwd)}>
                    {isRevealPwd ? <FaRegEyeSlash /> : <FaRegEye />}
                  </CInputGroupText>
                </CInputGroup>
                <CFormFeedback
                  invalid
                  style={{
                    display: formik.errors.password && formik.touched.password ? 'block' : 'none',
                  }}
                >
                  {formik.errors.password}
                </CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mt-4">
              <CCol>
                <CFormLabel htmlFor="passwordConfirm" className="col-form-label">
                  {t('view.User.PasswordConfirmation')}
                </CFormLabel>
                <CInputGroup>
                  <CInputGroupText>
                    <FaLock />
                  </CInputGroupText>
                  <CFormControl
                    id="passwordConfirm"
                    invalid={formik.errors.passwordConfirm && formik.touched.passwordConfirm}
                    type={isRevealPwdConfirm ? 'text' : 'password'}
                    name="passwordConfirm"
                    value={formik.values.passwordConfirm}
                    placeholder={t('view.User.PasswordConfirmation')}
                    {...formik.getFieldProps('passwordConfirm')}
                  />
                  <CInputGroupText
                    onClick={() =>
                      setIsRevealPwdConfirm((isRevealPwdConfirm) => !isRevealPwdConfirm)
                    }
                  >
                    {isRevealPwdConfirm ? <FaRegEyeSlash /> : <FaRegEye />}
                  </CInputGroupText>
                </CInputGroup>
                <CFormFeedback
                  invalid
                  style={{
                    display:
                      formik.errors.passwordConfirm && formik.touched.passwordConfirm
                        ? 'block'
                        : 'none',
                  }}
                >
                  {formik.errors.passwordConfirm}
                </CFormFeedback>
              </CCol>
            </CRow>
            {formik.values.password && formik.values.password.length > 0 ? (
              <CRow className="mt-4">
                <CCol>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <b>Temporary</b>
                    <CFormCheck
                      switch
                      size="lg"
                      className={'mx-1'}
                      variant={'3d'}
                      color={'success'}
                      checked={formik.values.temporary}
                      {...formik.getFieldProps('temporary')}
                    />
                  </div>
                </CCol>
              </CRow>
            ) : null}
          </CCol>
        </CRow>
        <CRow>
          <div className="flex-center">
            <CButton
              type="button"
              color="primary"
              className="text-center"
              onClick={handleToFormikSubmit}
            >
              {t('common.Save')}
            </CButton>
          </div>
        </CRow>
      </CCol>
    </CRow>
  )
}

TabContentProfile.propTypes = {
  paramId: PropTypes.string.isRequired,
  isNew: PropTypes.bool,
  isFetching: PropTypes.bool,
  animatedComponents: PropTypes.func,
}

export default TabContentProfile
