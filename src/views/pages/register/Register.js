import React from 'react'
import { useFormik } from 'formik'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormControl,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { FaAddressCard } from 'react-icons/fa'
import * as Yup from 'yup'

const Register = () => {
  const constGenders = {
    NONE: 'NONE',
    MALE: 'Male',
    FEMALE: 'Female',
    UNKNOWN: 'Unknown',
  }
  let schema = Yup.object({
    fullName: Yup.string().required('Vui lòng nhập họ tên'),
    mobilePhone: Yup.string().required('Vui lòng nhập số điện thoại'),
    ssn: Yup.string().required('Vui lòng nhập CMND hay CCCD'),
    fullAddress: Yup.string().required('Vui lòng địa chỉ'),
    fileBeforeCard: Yup.mixed().required('Vui lòng chụp mặt trước CMND/CCCD'),
    fileAfterCard: Yup.mixed().required('Vui lòng chụp mặt sau CMND/CCCD'),
  })

  const formik = useFormik({
    initialValues: {
      fullName: '',
      mobilePhone: '',
      ssn: '', // CMND or CCCD
      fileBeforeCard: '',
      fileAfterCard: '',
      gender: '',
      birthDate: '',
      fullAddress: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => handleToSubmitAccount(values),
  })

  const handleToSubmitAccount = (values) => {
    console.logs('submit=', values)
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={formik.handleSubmit}>
                  <h1>Quà tặng</h1>
                  <p className="text-medium-emphasis">Đăng ký nhận quà, tránh xa Covid </p>
                  <CRow>
                    <CCol sm={12} className="mb-4">
                      <CFormLabel htmlFor="fullName" className="col-form-label">
                        Họ và tên <span className="form-required"> *</span>
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl
                          id="fullName"
                          name="fullName"
                          placeholder="Họ và tên"
                          value={formik.values.fullName}
                          invalid={formik.errors.fullName && formik.touched.fullName}
                          {...formik.getFieldProps('fullName')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display:
                            formik.errors.fullName && formik.touched.fullName ? 'block' : 'none',
                        }}
                      >
                        {formik.errors.fullName}
                      </CFormFeedback>
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                        Số điện thoại <span className="form-required"> *</span>
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-phone" />
                        </CInputGroupText>
                        <CFormControl
                          type="tel"
                          id="MobileNumber"
                          name="MobileNumber"
                          placeholder="Số điện thoại"
                          invalid={formik.errors.mobilePhone && formik.touched.mobilePhone}
                          value={formik.values.mobilePhone}
                          {...formik.getFieldProps('mobilePhone')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display:
                            formik.errors.mobilePhone && formik.touched.mobilePhone
                              ? 'block'
                              : 'none',
                        }}
                      >
                        {formik.errors.mobilePhone}
                      </CFormFeedback>
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <CFormLabel htmlFor="ssn" className="col-form-label">
                        CMND / CCCD <span className="form-required"> *</span>
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <FaAddressCard />
                        </CInputGroupText>
                        <CFormControl
                          id="ssn"
                          name="ssn"
                          placeholder="CMND / CCCD"
                          invalid={formik.errors.ssn && formik.touched.ssn}
                          value={formik.values.ssn}
                          {...formik.getFieldProps('ssn')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display: formik.errors.ssn && formik.touched.ssn ? 'block' : 'none',
                        }}
                      >
                        {formik.errors.ssn}
                      </CFormFeedback>
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <CFormLabel htmlFor="beforeIdentityCard" className="col-form-label">
                        Mặt trước CMND/CCCD <span className="form-required"> *</span>
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <FaAddressCard />
                        </CInputGroupText>
                        <CFormControl
                          id="beforeIdentityCard"
                          type="file"
                          name="beforeIdentityCard"
                          invalid={formik.errors.fileBeforeCard && formik.touched.fileBeforeCard}
                          value={formik.values.fileBeforeCard}
                          {...formik.getFieldProps('fileBeforeCard')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display:
                            formik.errors.fileBeforeCard && formik.touched.fileBeforeCard
                              ? 'block'
                              : 'none',
                        }}
                      >
                        {formik.errors.fileBeforeCard}
                      </CFormFeedback>
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <CFormLabel htmlFor="afterIdentityCard" className="col-form-label">
                        Mặt sau CMND/CCCD <span className="form-required"> *</span>
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <FaAddressCard />
                        </CInputGroupText>
                        <CFormControl
                          id="afterIdentityCard"
                          type="file"
                          name="afterIdentityCard"
                          invalid={formik.errors.fileAfterCard && formik.touched.fileAfterCard}
                          value={formik.values.fileAfterCard}
                          {...formik.getFieldProps('fileAfterCard')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display:
                            formik.errors.fileAfterCard && formik.touched.fileAfterCard
                              ? 'block'
                              : 'none',
                        }}
                      >
                        {formik.errors.fileAfterCard}
                      </CFormFeedback>
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <CFormLabel htmlFor="UserRole" className="col-form-label">
                        Giới tính
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-people" />
                        </CInputGroupText>
                        <CFormSelect name="Gender" id="Gender">
                          <option value={constGenders.NONE}>Chọn giới tính</option>
                          <option value={constGenders.MALE}>Nam</option>
                          <option value={constGenders.FEMALE}>Nữ</option>
                          <option value={constGenders.UNKNOWN}>Khác</option>
                        </CFormSelect>
                      </CInputGroup>
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <CFormLabel htmlFor="DateOfBirth" className="col-form-label">
                        Ngày sinh
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-calendar" />
                        </CInputGroupText>
                        <CFormControl type="date" id="DateOfBirth" name="DateOfBirth" />
                      </CInputGroup>
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <CFormLabel htmlFor="fullAddress" className="col-form-label">
                        Địa chỉ <span className="form-required"> *</span>
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-location-pin" />
                        </CInputGroupText>
                        <CFormControl
                          id="fullAddress"
                          name="fullAddress"
                          placeholder="Địa chỉ nhà"
                          invalid={formik.errors.fullAddress && formik.touched.fullAddress}
                          value={formik.values.fullAddress}
                          {...formik.getFieldProps('fullAddress')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display:
                            formik.errors.fullAddress && formik.touched.fullAddress
                              ? 'block'
                              : 'none',
                        }}
                      >
                        {formik.errors.fullAddress}
                      </CFormFeedback>
                    </CCol>
                  </CRow>
                  <CButton type="submit" color="success">
                    Đăng ký
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
