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
import { FaAddressCard, FaRegIdCard } from 'react-icons/fa'
import * as Yup from 'yup'
import { userService } from '../../../services/user.service'
import FileUploader from '../../components/widgets/FileUploader'

const Register = () => {
  const companies = {
    NONE: 'NONE',
    GRAB: 'Grab',
    BEAMIN: 'Beamin',
    NOW: 'Now',
    BEE: 'Bee',
    OTHER: 'Other',
  }
  const companyFilter = ['Grab', 'Beamin', 'Now', 'Bee', 'Other']
  const constGenders = {
    NONE: 'NONE',
    MALE: 'Male',
    FEMALE: 'Female',
    UNKNOWN: 'Unknown',
  }
  let schema = Yup.object({
    company: Yup.string().required('Vui lòng chọn nơi công tác').oneOf(companyFilter),
    otherCompany: Yup.string().required('Vui lòng nhập nơi công tác'),
    employeeId: Yup.string().required('Vui lòng nhập ID (Mã nhân viên)'),
    fullName: Yup.string().required('Vui lòng nhập họ tên'),
    mobilePhone: Yup.string().required('Vui lòng nhập số điện thoại'),
    ssn: Yup.string().required('Vui lòng nhập CMND hay CCCD'),
    fullAddress: Yup.string().required('Vui lòng địa chỉ'),
    fileBeforeCard: Yup.mixed().required('Vui lòng chụp mặt trước CMND/CCCD'),
    fileAfterCard: Yup.mixed().required('Vui lòng chụp mặt sau CMND/CCCD'),
  })

  const formik = useFormik({
    initialValues: {
      company: '',
      otherCompany: '',
      employeeId: '',
      fullName: '',
      mobilePhone: '',
      email: '',
      ssn: '', // CMND or CCCD
      fileBeforeCard: '',
      fileAfterCard: '',
      thumbBeforeCardUrl: '',
      thumbAfterCardUrl: '',
      gender: '',
      birthDate: '',
      fullAddress: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => handleToSubmitAccount(values),
  })

  const handleToSubmitAccount = (values) => {
    console.log('submit=', values)
    const payload = {
      eligibilityDTO: {
        email: formik.values.email,
        phone: '0915626262',
        fullName: 'Vu Dinh',
        birthDay: '1990-01-01',
        ssn: '123490812893823',
      },
      eligibilityMetadata: [
        {
          signature: '7dcd706d7419fc2c57621745f2d6a8d05c1d5379',
          thumbUrl:
            'http://res.cloudinary.com/tvsales/image/upload/v1626929115/dr74ureqxoujow1vmqs9.jpg',
          fileName: 'test0011.jpg',
        },
      ],
    }
  }

  const uploadFileBeforeCard = (file) => {
    formik.values.fileBeforeCard = file
    // userService.uploadImage(file).then((result) => {
    //   console.log('uploadFileBeforeCard result=', result)
    //   formik.values.thumbBeforeCardUrl = result
    // })
  }

  const uploadFileAfterCard = (file) => {
    formik.values.fileAfterCard = file
    // userService.uploadImage(file).then((result) => {
    //   console.log('uploadFileAfterCard result=', result)
    //   formik.values.thumbAfterCardUrl = result
    // })
  }

  return (
    <div
      className="bg-light min-vh-100 d-flex flex-row align-items-center reward-container"
      style={{
        background: `url('${process.env.PUBLIC_URL}/images/bg-covid.jpeg') no-repeat`,
        backgroundSize: `cover`,
      }}
    >
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
                      <CFormLabel htmlFor="company" className="col-form-label">
                        Nơi công tác <span className="form-required"> *</span>
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-people" />
                        </CInputGroupText>
                        <CFormSelect
                          name="company"
                          id="company"
                          {...formik.getFieldProps('company')}
                          invalid={formik.errors.company && formik.touched.company}
                        >
                          <option value={companies.NONE}>Chọn nơi công tác</option>
                          <option value={companies.BEE}>Bee</option>
                          <option value={companies.BEAMIN}>Beamin</option>
                          <option value={companies.GRAB}>Grab</option>
                          <option value={companies.NOW}>Now</option>
                          <option value={companies.OTHER}>Khác</option>
                        </CFormSelect>
                      </CInputGroup>
                    </CCol>
                    <CCol
                      sm={12}
                      className="mb-4"
                      style={{
                        display: formik.values.company.toLowerCase() === 'other' ? 'block' : 'none',
                      }}
                    >
                      <CFormLabel htmlFor="company" className="col-form-label">
                        Khác <span className="form-required"> *</span>
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl
                          id="company"
                          name="company"
                          placeholder="Nơi công tác"
                          value={formik.values.otherCompany}
                          invalid={formik.errors.otherCompany && formik.touched.otherCompany}
                          {...formik.getFieldProps('otherCompany')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display:
                            formik.errors.otherCompany && formik.touched.otherCompany
                              ? 'block'
                              : 'none',
                        }}
                      >
                        {formik.errors.otherCompany}
                      </CFormFeedback>
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <CFormLabel htmlFor="employeeId" className="col-form-label">
                        ID (Mã nhân viên) <span className="form-required"> *</span>
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl
                          id="employeeId"
                          name="employeeId"
                          placeholder="ID / Mã nhân viên"
                          value={formik.values.employeeId}
                          invalid={formik.errors.employeeId && formik.touched.employeeId}
                          {...formik.getFieldProps('employeeId')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display:
                            formik.errors.employeeId && formik.touched.employeeId
                              ? 'block'
                              : 'none',
                        }}
                      >
                        {formik.errors.employeeId}
                      </CFormFeedback>
                    </CCol>
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
                    <CCol sm={6} className="mb-4">
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
                    <CCol sm={6} className="mb-4">
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
                    <CCol sm={6} className="mb-4">
                      <CFormLabel htmlFor="beforeIdentityCard" className="col-form-label">
                        Mặt trước CMND/CCCD <span className="form-required"> *</span>
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <FaAddressCard />
                        </CInputGroupText>
                        <FileUploader
                          invalid={formik.errors.fileBeforeCard && formik.touched.fileBeforeCard}
                          onFileSelectSuccess={(file) => uploadFileBeforeCard(file)}
                          onFileSelectError={({ error }) => alert(error)}
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
                    <CCol sm={6} className="mb-4">
                      <CFormLabel htmlFor="afterIdentityCard" className="col-form-label">
                        Mặt sau CMND/CCCD <span className="form-required"> *</span>
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <FaAddressCard />
                        </CInputGroupText>
                        <FileUploader
                          invalid={formik.errors.fileAfterCard && formik.touched.fileAfterCard}
                          onFileSelectSuccess={(file) => uploadFileAfterCard(file)}
                          onFileSelectError={({ error }) => alert(error)}
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
                    <CCol sm={12} className="mb-4">
                      <CFormLabel htmlFor="email" className="col-form-label">
                        Email
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl
                          id="email"
                          name="email"
                          placeholder="Email"
                          value={formik.values.email}
                          {...formik.getFieldProps('email')}
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol sm={6} className="mb-4">
                      <CFormLabel htmlFor="UserRole" className="col-form-label">
                        Giới tính
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-people" />
                        </CInputGroupText>
                        <CFormSelect name="Gender" id="Gender" {...formik.getFieldProps('gender')}>
                          <option value={constGenders.NONE}>Chọn giới tính</option>
                          <option value={constGenders.MALE}>Nam</option>
                          <option value={constGenders.FEMALE}>Nữ</option>
                          <option value={constGenders.UNKNOWN}>Khác</option>
                        </CFormSelect>
                      </CInputGroup>
                    </CCol>
                    <CCol sm={6} className="mb-4">
                      <CFormLabel htmlFor="DateOfBirth" className="col-form-label">
                        Ngày sinh
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
