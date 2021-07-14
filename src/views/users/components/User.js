import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormControl,
  CButton,
  CInputGroupText,
  CInputGroup,
  CFormSelect,
  CFormFeedback,
  CCollapse,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { userActions } from '../actions'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { FaLock, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import { colorHelpers } from '../../../utils/color-helper'
import WidgetDragDrop from '../../components/widgets/WidgetDragDrop'
import CDataTable from '../../components/widgets/table/CDataTable'

const User = ({ match }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const animatedComponents = makeAnimated()
  const [activeKey, setActiveKey] = useState(1)
  const isFetching = useSelector((state) => state.users.isFetching)
  const userDetail = useSelector((state) => state.users.userDetail)
  const userAddressList = useSelector((state) => state.users.userAddressList)
  const userRoles = useSelector((state) => state.users.userRoles)
  const clientApps = useSelector((state) => state.users.clientApps)
  const [isRevealPwd, setIsRevealPwd] = useState(false)
  const [isRevealPwdConfirm, setIsRevealPwdConfirm] = useState(false)
  const [countryValue, setCountryValue] = useState('Vietnam')
  const [collapseAddressBook, setCollapseAddressBook] = useState(false)
  const [currentAddressIndex, setCurrentAddressIndex] = useState(-1)
  const [toggleAvailableRole, setToggleAvailableRole] = useState(false)
  const [cityValue, setCityValue] = useState('')
  const [userApplicationRole, setUserApplicationRole] = useState(null)
  const [selectedUserRoles, setSelectedUserRoles] = useState([])
  const [userRoleMapping, setUserRoleMapping] = useState({
    assignRoles: [],
    accessibleApps: [],
  })

  let paramId = match.params.id
  if (paramId) {
    paramId = paramId.split('&')[0]
  }
  const isNew = !paramId

  const genders = ['Male', 'Female', 'Unknown']
  const constGenders = {
    MALE: 'Male',
    FEMALE: 'Female',
    UNKNOWN: 'Unknown',
  }

  const permissionsOptions = []
  if (userRoles && userRoles.length > 0) {
    userRoles.forEach((role) => {
      if (!role.description || role.description.length === 0) return
      permissionsOptions.push({
        value: role.name,
        label: role.name,
      })
    })
  }

  const tabs = {
    PROFILE: 1,
    ADDRESS_BOOK: 2,
    ROLE_MAPPING: 3,
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
      userAddressList: userAddressList || [],
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      zipCode: '',
      applicationRole: null,
      userRoleMapping: {
        assignRoles: [],
        accessibleApps: [],
      },
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => handleToSubmitAccount(values),
  })

  const handleToggleAddressBook = (e) => {
    e.preventDefault()
    formik.setFieldValue('addressLine1', '')
    formik.setFieldValue('addressLine2', '')
    formik.setFieldValue('city', '')
    formik.setFieldValue('country', '')
    formik.setFieldValue('zipCode', '')
    setCollapseAddressBook(true)
    setCurrentAddressIndex(-1)
  }

  const closeAddressBook = (e) => {
    setCollapseAddressBook(false)
  }

  const saveAddress = (e) => {
    const addressItem = {
      userId: paramId,
      addressLine1: formik.values.addressLine1,
      addressLine2: formik.values.addressLine2,
      city: cityValue,
      country: countryValue,
      zipCode: formik.values.zipCode,
    }
    if (currentAddressIndex === -1) {
      formik.values.userAddressList.push(addressItem)
    } else {
      formik.values.userAddressList[currentAddressIndex] = addressItem
    }
    dispatch(userActions._updateUserAddressList(formik.values.userAddressList))
    dispatch(userActions.createUserAddress(addressItem))
    setCollapseAddressBook(false)
    setCurrentAddressIndex(-1)
  }

  const editAddress = (item, index) => {
    item.userId = paramId
    setCurrentAddressIndex(index)
    formik.setFieldValue('addressLine1', item.addressLine1)
    formik.setFieldValue('addressLine2', item.addressLine2)
    formik.setFieldValue('city', item.city)
    formik.setFieldValue('country', item.country)
    formik.setFieldValue('zipCode', item.zipCode)
    setCollapseAddressBook(true)
    dispatch(userActions.updateUserAddress(item))
  }

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

  const onValidateRoleMapping = (applicationRole, userRoles) => {
    // generate assign role
    userRoleMapping.assignRoles = userRoles
      .filter((u) => u.category === 'effectiveRoles')
      .map((u) => u.name)

    const foundIndex = userRoleMapping.accessibleApps.findIndex(
      (app) => app.id === applicationRole.id,
    )
    if (foundIndex === -1) {
      userRoleMapping.accessibleApps.push(applicationRole)
      formik.setFieldValue('userRoleMapping', userRoleMapping)
    }
    setUserRoleMapping(userRoleMapping)
  }

  const onSelectedApplicationRole = (option) => {
    setUserApplicationRole(option)
    setToggleAvailableRole(true)
    setSelectedUserRoles(formik.values.userRoles)

    onValidateRoleMapping(option, selectedUserRoles)
  }

  const handleToSubmitAccount = (data) => {
    const payload = {
      id: data.id,
      userId: data.id,
      login: data.email,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      isEnable: false,
      userProfileDto: {
        phone: data.mobilePhone.toString(),
        gender: data.gender,
        birthDate: data.birthDate,
      },
    }

    if (data.userRoles && data.userRoles.length > 0) {
      payload.authorities = data.userRoles
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

  const changeCountryHandler = (value) => {
    setCountryValue(value)
  }

  const changeCityHandler = (value) => {
    setCityValue(value)
  }

  const onDropUserRoles = (roles) => {
    setSelectedUserRoles(roles)
    formik.values.userRoleMapping.assignRoles = roles
    const userRoles = roles.map((r) => {
      r.category = 'effectiveRoles'
      return r
    })

    onValidateRoleMapping(userApplicationRole, userRoles)
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
    formik.setFieldValue('userAddressList', userDetail.userAddressList)
  }

  useEffect(() => {
    const loadData = async () => {
      await dispatch(userActions.getAllUserRoles({ all: true }))
      if (paramId) {
        await dispatch(userActions.getUserDetail(paramId)).then(() => onUserDetailSuccess)
        await dispatch(
          userActions.getUserAddressBooks({
            userId: paramId,
            page: 0,
            size: 100,
          }),
        )
        await dispatch(userActions.getClientApplications())
      }
    }
    loadData()
  }, [dispatch])

  const handleToFormikSubmit = (e) => {
    formik.handleSubmit(e)
  }

  const handleTabSelected = (tabIndex) => {
    setActiveKey(tabIndex)
  }

  const handleToSaveRoleMapping = () => {
    if (
      !formik.values.userRoleMapping.assignRoles ||
      formik.values.userRoleMapping.assignRoles.length === 0
    ) {
      formik.values.userRoleMapping.assignRoles = formik.values.userRoles
        .filter((u) => u.category === 'effectiveRoles')
        .map((u) => u.name)
    }
    const payload = Object.assign({ userId: paramId }, formik.values.userRoleMapping)
    dispatch(userActions.createUserRoleMapping(payload))
  }

  return isFetching ? (
    <CRow></CRow>
  ) : (
    <CRow>
      <CCol lg={12}>
        <CForm>
          <CCard>
            <CCardHeader>{isNew ? t('common.NewUser') : t('common.EditUser')}</CCardHeader>
            <CCardBody>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink
                    data-tab="profile"
                    active={activeKey === tabs.PROFILE}
                    onClick={() => handleTabSelected(tabs.PROFILE)}
                  >
                    {t('common.Profile')}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    data-tab="address-book"
                    active={activeKey === tabs.ADDRESS_BOOK}
                    onClick={() => handleTabSelected(tabs.ADDRESS_BOOK)}
                  >
                    {t('common.AddressBook')}
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    data-tab="role-mapping"
                    active={activeKey === tabs.ROLE_MAPPING}
                    onClick={() => handleTabSelected(tabs.ROLE_MAPPING)}
                  >
                    {t('common.RoleMapping')}
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent>
                <CTabPane data-tab="profile" visible={activeKey === 1}>
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
                              display:
                                formik.errors.firstName && formik.touched.firstName
                                  ? 'block'
                                  : 'none',
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
                              display:
                                formik.errors.lastName && formik.touched.lastName
                                  ? 'block'
                                  : 'none',
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
                              display:
                                formik.errors.email && formik.touched.email ? 'block' : 'none',
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
                              <option value={constGenders.MALE}>
                                {t('view.User.GenderType.Male')}
                              </option>
                              <option value={constGenders.FEMALE}>
                                {t('view.User.GenderType.Female')}
                              </option>
                              <option value={constGenders.UNKNOWN}>
                                {t('view.User.GenderType.Unknown')}
                              </option>
                            </CFormSelect>
                          </CInputGroup>
                          <CFormFeedback
                            invalid
                            style={{
                              display:
                                formik.errors.gender && formik.touched.gender ? 'block' : 'none',
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
                                <CInputGroupText
                                  onClick={() => setIsRevealPwd((isRevealPwd) => !isRevealPwd)}
                                >
                                  {isRevealPwd ? <FaRegEyeSlash /> : <FaRegEye />}
                                </CInputGroupText>
                              </CInputGroup>
                              <CFormFeedback
                                invalid
                                style={{
                                  display:
                                    formik.errors.password && formik.touched.password
                                      ? 'block'
                                      : 'none',
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
                                  invalid={
                                    formik.errors.passwordConfirm && formik.touched.passwordConfirm
                                  }
                                  type={isRevealPwdConfirm ? 'text' : 'password'}
                                  name="passwordConfirm"
                                  value={formik.values.passwordConfirm}
                                  placeholder={t('view.User.PasswordConfirmation')}
                                  {...formik.getFieldProps('passwordConfirm')}
                                />
                                <CInputGroupText
                                  onClick={() =>
                                    setIsRevealPwdConfirm(
                                      (isRevealPwdConfirm) => !isRevealPwdConfirm,
                                    )
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
                </CTabPane>
                <CTabPane data-tab="address-book" visible={activeKey === 2}>
                  <CRow className="p-4">
                    <CCol sm={12}>
                      <div className="mb-4" style={{ display: 'flex', alignItems: 'center' }}>
                        <h4>{t('view.User.AddressBook')}</h4>{' '}
                        <CButton color="primary" className="ms-4" onClick={handleToggleAddressBook}>
                          {t('view.User.AddNewAddress')}
                        </CButton>
                      </div>
                      <CRow>
                        <CCollapse visible={collapseAddressBook}>
                          <hr />
                          <CRow className="p-3">
                            <CCol sm={6} className="mb-4">
                              <CFormLabel htmlFor="AddressLine1" className="col-form-label">
                                {t('view.User.AddressLine1')}
                              </CFormLabel>
                              <CInputGroup>
                                <CInputGroupText>
                                  <CIcon name="cil-location-pin" />
                                </CInputGroupText>
                                <CFormControl
                                  type="text"
                                  id="AddressLine1"
                                  name="AddressLine1"
                                  placeholder={t('view.User.AddressLine1')}
                                  value={formik.values.addressLine1}
                                  {...formik.getFieldProps('addressLine1')}
                                />
                              </CInputGroup>
                            </CCol>
                            <CCol sm={6} className="mb-4">
                              <CFormLabel htmlFor="AddressLine2" className="col-form-label">
                                {t('view.User.AddressLine2')}
                              </CFormLabel>
                              <CInputGroup>
                                <CInputGroupText>
                                  <CIcon name="cil-location-pin" />
                                </CInputGroupText>
                                <CFormControl
                                  id="AddressLine2"
                                  name="AddressLine2"
                                  placeholder={t('view.User.AddressLine2')}
                                  value={formik.values.addressLine2}
                                  {...formik.getFieldProps('addressLine2')}
                                />
                              </CInputGroup>
                            </CCol>
                            <CCol sm={3} className="mb-4">
                              <CFormLabel htmlFor="AreaOrCity" className="col-form-label">
                                {t('view.User.AreaOrCity')}
                              </CFormLabel>
                              <CInputGroup>
                                <CInputGroupText>
                                  <CIcon name="cil-location-pin" />
                                </CInputGroupText>
                                <RegionDropdown
                                  className="custom-multi-select-2"
                                  country={countryValue}
                                  value={cityValue}
                                  onChange={changeCityHandler}
                                />
                              </CInputGroup>
                            </CCol>
                            <CCol sm={3} className="mb-4">
                              <CFormLabel htmlFor="Country" className="col-form-label">
                                {t('view.User.Country')}
                              </CFormLabel>
                              <CInputGroup>
                                <CInputGroupText>
                                  <CIcon name="cil-map" />
                                </CInputGroupText>
                                <CountryDropdown
                                  className="custom-multi-select-2"
                                  value={countryValue}
                                  onChange={changeCountryHandler}
                                />
                              </CInputGroup>
                            </CCol>
                            <CCol sm={6} className="mb-4">
                              <CFormLabel htmlFor="PostalZipCode" className="col-form-label">
                                {t('view.User.PostalZipCode')}
                              </CFormLabel>
                              <CInputGroup>
                                <CInputGroupText>
                                  <CIcon name="cil-location-pin" />
                                </CInputGroupText>
                                <CFormControl
                                  id="PostalZipCode"
                                  name="PostalZipCode"
                                  placeholder={t('view.User.PostalZipCode')}
                                  value={formik.values.zipCode}
                                  {...formik.getFieldProps('zipCode')}
                                />
                              </CInputGroup>
                            </CCol>
                          </CRow>
                          <CRow className="p-3">
                            <div className="flex-center">
                              <CButton className="me-4" color="danger" onClick={closeAddressBook}>
                                {t('common.Close')}
                              </CButton>
                              <CButton color="primary" onClick={saveAddress}>
                                {t('view.User.SaveAddress')}
                              </CButton>
                            </div>
                          </CRow>
                        </CCollapse>
                      </CRow>
                      {!collapseAddressBook ? (
                        <CDataTable
                          items={formik.values.userAddressList}
                          fields={[
                            { key: 'addressLine1' },
                            { key: 'addressLine2' },
                            { key: 'city' },
                            { key: 'country' },
                            { key: 'zipCode' },
                            { key: 'action', label: t('common.Action') },
                          ]}
                          hover
                          striped
                          scopedSlots={{
                            action: (item, i) => (
                              <td>
                                <CButton
                                  className="me-1"
                                  color="primary"
                                  onClick={() => editAddress(item, i)}
                                >
                                  <CIcon name="cil-pencil" />
                                </CButton>
                              </td>
                            ),
                          }}
                        />
                      ) : null}
                    </CCol>
                  </CRow>
                </CTabPane>
                <CTabPane data-tab="role-mapping" visible={activeKey === 3}>
                  <CRow className="p-4">
                    <CCol sm={12}>
                      <h5>{t('view.UserRole.UserRoles')}</h5>
                      <CFormLabel htmlFor="applicationRoles" className="col-form-label">
                        {t('view.User.ApplicationRoles')}
                      </CFormLabel>
                      <Select
                        value={userApplicationRole}
                        placeholder={<div>{t('messages.messagePleaseSelect')}</div>}
                        name="user-org-select"
                        options={clientApps}
                        classNamePrefix="select-org"
                        components={animatedComponents}
                        onChange={onSelectedApplicationRole}
                      />
                      {toggleAvailableRole &&
                      formik.values.userRoles &&
                      formik.values.userRoles.length > 0 ? (
                        <WidgetDragDrop
                          dataSource={formik.values.userRoles}
                          onFinish={onDropUserRoles}
                        />
                      ) : null}
                    </CCol>
                    <CCol sm={12}>
                      <hr />
                    </CCol>
                    <CCol sm={12}>
                      <div className="mt-4 flex-center">
                        {formik.values.userRoles && formik.values.userRoles.length > 0 ? (
                          <CButton
                            type="button"
                            color="primary"
                            className="text-center"
                            onClick={handleToSaveRoleMapping}
                          >
                            {t('common.Save')}
                          </CButton>
                        ) : null}
                      </div>
                    </CCol>
                  </CRow>
                </CTabPane>
              </CTabContent>
            </CCardBody>
          </CCard>
        </CForm>
      </CCol>
    </CRow>
  )
}

User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}

export default User
