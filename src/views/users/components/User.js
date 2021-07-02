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
  CSelect, CSwitch, CInputGroupAppend, CInvalidFeedback, CDataTable, CCollapse,
  CTabs, CNav, CNavItem, CNavLink, CTabContent, CTabPane
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {userActions} from "../actions";
import {useTranslation} from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {FaLock, FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { colorHelpers } from '../../../utils/color-helper';
import WidgetDragDrop from '../../widgets/WidgetDragDrop';

const User = ({match}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const isFetching = useSelector(state => state.users.isFetching);
  const userDetail = useSelector(state => state.users.userDetail);
  const userRoles = useSelector(state => state.users.userRoles);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealPwdConfirm, setIsRevealPwdConfirm] = useState(false);
  const [countryValue, setCountryValue] = useState('Vietnam');
  const [collapseAddressBook, setCollapseAddressBook] = useState(false);
  const [currentAddressIndex, setCurrentAddressIndex] = useState(-1);

  const [cityValue, setCityValue] = useState('');
  const isNew = !match.params.id;

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
        value: role.name,
        label: role.name
      })
    });
  }

  const statusOptions = [
      {value: 0, label: 'Please select', color: colorHelpers.getColorByStatus('', true)},
      {value: 'Active', label: t('view.User.StatusType.Active'), color: colorHelpers.getColorByStatus('active', true)},
      {value: 'Inactive', label: t('view.User.StatusType.Inactive'), color: colorHelpers.getColorByStatus('inactive', true)},
      {value: 'Pending', label: t('view.User.StatusType.Pending'), color: colorHelpers.getColorByStatus('pending', true)},
      {value: 'Banned', label: t('view.User.StatusType.Banned'), color: colorHelpers.getColorByStatus('banned', true)}
  ];

  const strongPasswordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  let schema = Yup.object({
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
      userStatus: userDetail.userStatus || {value: 'value', label: 'Pending', color: colorHelpers.getColorByStatus('Pending', true)},
      userAddressList: userDetail.userAddressList || [],
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      zipCode: ''
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: values => handleToSubmitAccount(values)
  });

  const toggleAddressBook = (e) => {
    formik.setFieldValue('addressLine1','');
    formik.setFieldValue('addressLine2','');
    formik.setFieldValue('city','');
    formik.setFieldValue('country','');
    formik.setFieldValue('zipCode','');
    setCollapseAddressBook(true);
    setCurrentAddressIndex(-1);
    e.preventDefault()
  }

  const closeAddressBook = (e) => {
    setCollapseAddressBook(false);
  }

  const saveAddress = (e) => {
    if (currentAddressIndex === -1) {
      formik.values.userAddressList.push({
        addressLine1: formik.values.addressLine1,
        addressLine2: formik.values.addressLine2,
        city: cityValue,
        country: countryValue,
        zipCode: formik.values.zipCode
      })
    } else {
      formik.values.userAddressList[currentAddressIndex] = {
        addressLine1: formik.values.addressLine1,
        addressLine2: formik.values.addressLine2,
        city: cityValue,
        country: countryValue,
        zipCode: formik.values.zipCode
      }
    }
    dispatch(userActions._updateUserAddressList(formik.values.userAddressList));
    setCollapseAddressBook(false);
    setCurrentAddressIndex(-1);
  }

  const editAddress = (item, index) => {
    setCurrentAddressIndex(index);
    formik.setFieldValue('addressLine1',item.addressLine1);
    formik.setFieldValue('addressLine2',item.addressLine2);
    formik.setFieldValue('city',item.city);
    formik.setFieldValue('country',item.country);
    formik.setFieldValue('zipCode',item.zipCode);
    setCollapseAddressBook(true);
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
  });
  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    input: styles => ({ ...styles, ...dotStatus() }),
    placeholder: styles => ({ ...styles, ...dotStatus() }),
    singleValue: (styles, { data }) => ({ ...styles, ...dotStatus(data.color) }),
  };

  const customMultiSelectStyle = () => {
    return formik.errors.userRoles && formik.touched.userRoles ? 'custom-multi-select invalid' : 'custom-multi-select';
  }

  const onChangeStatus = (option) => {
    formik.setFieldValue('userStatus', option);
  }

  const handleToSubmitAccount = (data) => {
    const payload = {
      'id': data.id,
      'userId': data.id,
      'login': data.email,
      'email': data.email,
      'firstName': data.firstName,
      'lastName': data.lastName,
      'isEnable': false,
      'userAddressList': data.userAddressList,
      'userProfileDto': {
        'phone': data.mobilePhone.toString(),
        'gender': data.gender,
        'birthDate': data.birthDate
      },
      'authorities': data.userRoles
    }

    if (data.userRoles && data.userRoles.length > 0) {
      payload.authorities = data.userRoles
    }

    if (data.password && data.password.length > 0) {
      payload.tempPassword = data.password;
      payload.isTempPassword = data.temporary
    }

    if (match.params.id) {
      dispatch(userActions.updateUser(payload));
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

  const onDropUserRoles = (roles) => {
    formik.values.userRoles = roles;
  }

  const onUserDetailSuccess = () => {
    formik.setFieldValue('username',userDetail.username);
    formik.setFieldValue('gender',userDetail.gender);
    formik.setFieldValue('userRoles',userDetail.userRoles);
    formik.setFieldValue('email',userDetail.email);
    formik.setFieldValue('firstName',userDetail.firstName);
    formik.setFieldValue('lastName',userDetail.lastName);
    formik.setFieldValue('mobilePhone',userDetail.mobilePhone);
    formik.setFieldValue('birthDate',userDetail.birthDate);
    formik.setFieldValue('userStatus',userDetail.userStatus);
    formik.setFieldValue('userAddressList',userDetail.userAddressList);
  }

  useEffect(() => {
    const loadData = async () => {
      await dispatch(userActions.getAllUserRoles({all: true}));
      if (match.params.id) {
        await dispatch(userActions.getUserDetail(match.params.id)).then(() => onUserDetailSuccess);
      }
    }
    loadData();
  }, [dispatch]);

  const handleToFormikSubmit = (e) => {
    formik.handleSubmit(e);
  }

  return isFetching ? <CRow></CRow> : (
    <CRow>
      <CCol lg={12}>
        <CForm>
          <CCard>
            <CCardHeader>
              {isNew ? t('common.NewUser') : t('common.EditUser')}
            </CCardHeader>
            <CCardBody>
              <CTabs activeTab="profile">
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink data-tab="profile">
                      {t('common.Profile')}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="address-book">
                      {t('common.AddressBook')}
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink data-tab="role-mapping">
                      {t('common.RoleMapping')}
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane data-tab="profile">
                    <CRow className="mt-4">
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
                    </CRow>
                    <CRow>
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
                    </CRow>
                    <CRow>
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
                      <CCol sm={3} className='mb-4'>
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
                    </CRow>
                    <CRow>
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
                    </CRow>
                    <CRow>
                      <CCol sm={6} className={isNew && !isFetching ? 'mb-4 hidden' : 'mb-4 show'}>
                        <CLabel htmlFor="Status" className="col-form-label">{t('view.User.Status')} <span className="form-required"> *</span></CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-check" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
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
                    </CRow>
                    <CRow className="flex-center">
                      <CButton type="button" color="primary" className="text-center" onClick={handleToFormikSubmit}>{t('common.Save')}</CButton>
                    </CRow>
                  </CTabPane>
                  <CTabPane data-tab="address-book">
                    <CRow>
                      <CCol sm={12} className="mt-4">
                        <div className="mb-4" style={{display: 'flex', alignItems: 'center'}}>
                          <h4>{t('view.User.AddressBook')}</h4> <CButton color="primary" className="ml-4" onClick={toggleAddressBook}>{t('view.User.AddNewAddress')}</CButton>
                        </div>
                        <CRow>
                          <CCollapse show={collapseAddressBook}>
                            <hr/>
                            <CRow className="p-3">
                              <CCol sm={6} className="mb-4">
                                <CLabel htmlFor="AddressLine1" className="col-form-label">{t('view.User.AddressLine1')}</CLabel>
                                <CInputGroup>
                                  <CInputGroupPrepend>
                                    <CInputGroupText>
                                      <CIcon name="cil-location-pin" />
                                    </CInputGroupText>
                                  </CInputGroupPrepend>
                                  <CInput type="text" id="AddressLine1" name="AddressLine1" placeholder={t('view.User.AddressLine1')} value={formik.values.addressLine1}
                                          {...formik.getFieldProps("addressLine1")}
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
                                  <CInput id="AddressLine2" name="AddressLine2" placeholder={t('view.User.AddressLine2')} value={formik.values.addressLine2}
                                          {...formik.getFieldProps("addressLine2")}
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
                            <CRow className="p-3 flex-center">
                              <CButton className="mr-4" color="danger" onClick={closeAddressBook}>{t('common.Close')}</CButton><CButton color="primary" onClick={saveAddress}>{t('view.User.SaveAddress')}</CButton>
                            </CRow>
                          </CCollapse>
                        </CRow>
                        {!collapseAddressBook ?
                            <CDataTable
                                items={formik.values.userAddressList}
                                fields={[
                                  { key: 'addressLine1'},
                                  { key: 'addressLine2'},
                                  { key: 'city'},
                                  { key: 'country'},
                                  { key: 'zipCode'},
                                  { key: 'action', label: t('common.Action')}
                                ]}
                                hover
                                striped
                                scopedSlots={{
                                  action: (item, i) => (
                                      <td>
                                        <CButton
                                            className="mr-1"
                                            color="primary"
                                            onClick={() => editAddress(item, i)}>
                                          <CIcon name="cil-pencil" />
                                        </CButton>
                                      </td>
                                  ),
                                }}
                            /> : null}
                      </CCol>
                    </CRow>
                  </CTabPane>
                  <CTabPane data-tab="role-mapping">
                    <h5 className="mt-4">{t('view.UserRole.UserRoles')}</h5>
                    <CLabel htmlFor="applicationRoles" className="col-form-label">Application Roles</CLabel>
                    <CSelect custom name="applicationRoles" id="applicationRoles">
                      <option value="0">{t('messages.messagePleaseSelect')}</option>
                      <option value="app-1">APP-1</option>
                      <option value="app-2">APP-2</option>
                      <option value="app-3">APP-3</option>
                    </CSelect>
                    {formik.values.userRoles && formik.values.userRoles.length > 0 ?
                    <WidgetDragDrop
                        dataSource={formik.values.userRoles}
                        onFinish={onDropUserRoles}
                    /> : null}
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CForm>
      </CCol>
    </CRow>
  )
}

export default User
