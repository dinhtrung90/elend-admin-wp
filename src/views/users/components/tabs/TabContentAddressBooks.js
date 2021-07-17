import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  CCol,
  CRow,
  CButton,
  CFormLabel,
  CCollapse,
  CInputGroup,
  CInputGroupText,
  CFormControl,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CModal,
} from '@coreui/react'
import { useTranslation } from 'react-i18next'
import CIcon from '@coreui/icons-react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import CDataTable from '../../../components/widgets/table/CDataTable'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'

const TabContentAddressBooks = (props) => {
  const { t } = useTranslation()
  const { paramId, handleSaveAddress, handleEditAddress, handleDeleteAddress, ...attributes } =
    props
  const userAddressList = useSelector((state) => state.users.userAddressList)
  const [countryValue, setCountryValue] = useState('Vietnam')
  const [collapseAddressBook, setCollapseAddressBook] = useState(false)
  const [currentAddressIndex, setCurrentAddressIndex] = useState(-1)
  const [cityValue, setCityValue] = useState('Hồ Chí Minh (Sài Gòn)')
  const [danger, setDanger] = useState(false)
  const [deleteUserAddress, setDeleteUserAddress] = useState(false)

  const formik = useFormik({
    initialValues: {
      id: null,
      userAddressList: userAddressList || [],
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      zipCode: '',
    },
    enableReinitialize: true,
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
    if (currentAddressIndex !== -1) {
      formik.values.userAddressList[currentAddressIndex] = addressItem
    }

    if (formik.values.id) {
      addressItem.id = formik.values.id
      handleEditAddress(addressItem)
    } else {
      handleSaveAddress(formik.values.userAddressList, addressItem)
    }

    setCollapseAddressBook(false)
    setCurrentAddressIndex(-1)
  }

  const editAddress = (item, index) => {
    item.userId = paramId
    setCurrentAddressIndex(index)
    if (item.id) {
      formik.setFieldValue('id', item.id)
    }
    formik.setFieldValue('addressLine1', item.addressLine1)
    formik.setFieldValue('addressLine2', item.addressLine2)
    formik.setFieldValue('city', item.city)
    setCityValue(item.city)
    formik.setFieldValue('country', item.country)
    formik.setFieldValue('zipCode', item.zipCode)
    setCollapseAddressBook(true)
  }

  const deleteAddress = (item) => {
    setDanger(!danger)
    setDeleteUserAddress(item)
  }

  const handleConfirmDeleteAddress = () => {
    const item = deleteUserAddress
    item.userId = paramId
    const userAddress = formik.values.userAddressList
    userAddress.splice(
      userAddress.findIndex((a) => a.id === item.id),
      1,
    )
    formik.setFieldValue('userAddressList', userAddress)
    handleDeleteAddress(item)
  }

  const changeCountryHandler = (value) => {
    setCountryValue(value)
  }

  const changeCityHandler = (value) => {
    setCityValue(value)
  }

  return (
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
                  <CButton className="me-1" color="primary" onClick={() => editAddress(item, i)}>
                    <CIcon name="cil-pencil" />
                  </CButton>
                  <CButton color="danger" className="me-1" onClick={() => deleteAddress(item, i)}>
                    <CIcon style={{ color: 'white' }} name="cil-trash" />
                  </CButton>
                </td>
              ),
            }}
          />
        ) : null}
      </CCol>
      <CModal visible={danger} onClose={() => setDanger(!danger)} color="danger">
        <CModalHeader closeButton>
          <CModalTitle>{t('common.ConfirmDelete')}</CModalTitle>
        </CModalHeader>
        <CModalBody>{t('messages.messageConfirmDeleteAddress')}</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={handleConfirmDeleteAddress}>
            {t('common.Delete')}
          </CButton>{' '}
          <CButton color="secondary" onClick={() => setDanger(!danger)}>
            {t('common.Cancel')}
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

TabContentAddressBooks.propTypes = {
  paramId: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  userRoles: PropTypes.array.isRequired,
  handleSaveAddress: PropTypes.func,
  handleEditAddress: PropTypes.func,
  handleDeleteAddress: PropTypes.func,
}

export default TabContentAddressBooks
