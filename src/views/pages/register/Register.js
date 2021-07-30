import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
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
import { FaAddressCard, FaCheckCircle } from 'react-icons/fa'
import * as Yup from 'yup'
import { userService } from '../../../services/user.service'
import { toast } from 'react-toastify'
import DatePicker from 'react-mobile-datepicker'

const Register = () => {
  const history = useHistory()
  const [thumbBeforeCardUrl, setThumbBeforeCardUrl] = useState(null)
  const [isDatePickerOpen, setDatePickerOpen] = useState(false)
  const [selectedBirthDate, setSelectedBirthDate] = useState('')

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

  // date picker
  const monthMap = {
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    11: '11',
    12: '12',
  }

  const dateConfig = {
    year: {
      format: 'YYYY',
      caption: 'Năm',
      step: 1,
    },
    month: {
      format: (value) => monthMap[value.getMonth() + 1],
      caption: 'Tháng',
      step: 1,
    },
    date: {
      format: 'DD',
      caption: 'Ngày',
      step: 1,
    },
  }

  let schema = Yup.object({
    company: Yup.string().required('Vui lòng chọn nơi công tác').oneOf(companyFilter),
    employeeId: Yup.string().required('Vui lòng nhập ID (Mã nhân viên)'),
    fullName: Yup.string().required('Vui lòng nhập họ tên'),
    mobilePhone: Yup.string().required('Vui lòng nhập số điện thoại'),
    ssn: Yup.string().required('Vui lòng nhập CMND hay CCCD'),
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
      thumbBeforeCardUrl: '',
      gender: '',
      birthDate: '',
      fullAddress: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => handleToSubmitAccount(values),
  })

  const handleToSubmitAccount = (values) => {
    const payload = {
      eligibilityDTO: {
        employeeId: formik.values.employeeId,
        company: formik.values.company || formik.values.otherCompany,
        email: formik.values.email,
        phone: formik.values.mobilePhone,
        fullName: formik.values.fullName,
        birthDay:
          formik.values.birthDate && formik.values.birthDate.length > 0
            ? formik.values.birthDate
            : selectedBirthDate,
        ssn: formik.values.ssn && formik.values.ssn.length > 0 ? formik.values.ssn : 'Unknown',
        fullAddress:
          formik.values.fullAddress && formik.values.fullAddress.length
            ? formik.values.fullAddress
            : 'Unknown',
        gender: formik.values.gender || constGenders.UNKNOWN,
      },
      eligibilityMetadata: [],
    }

    if (thumbBeforeCardUrl) {
      payload.eligibilityMetadata.push(thumbBeforeCardUrl)
    }

    userService
      .signupEligibility(payload)
      .then((result) => {
        const code = result.data.code
        history.push(`/thanks/${code}`)
      })
      .catch((error) => {
        if (
          error.errorCode === 'EMPLOYEE_ID_HAS_EXISTED' ||
          error.errorCode === 'EMAIL_HAS_EXISTED' ||
          error.errorCode === 'PHONE_HAS_EXISTED'
        ) {
          toast.error('Mã nhân viên đã được đăng ký.')
          return
        }
        toast.error('Đăng ký không thành công. Vui lòng thử lại.')
      })
  }

  const uploadFileBeforeCard = (result) => {
    if (result.event !== 'success') return
    const data = {
      signature: result.info.public_id,
      thumbUrl: result.info.url,
      fileName: result.info.original_filename,
    }
    setThumbBeforeCardUrl(data)
    formik.values.thumbBeforeCardUrl = data
  }

  const resetForm = () => {
    formik.resetForm()
  }

  const handleDatePickerClick = () => {
    setDatePickerOpen(true)
  }

  const handleDatePickerCancel = () => {
    setDatePickerOpen(false)
  }

  const handleDatePickerSelect = (selectedDate) => {
    const convertedDate = selectedDate.toISOString().split('T')[0]
    formik.values.birthDate = convertedDate
    setSelectedBirthDate(convertedDate)
    setDatePickerOpen(false)
  }

  const showCloudinaryWidget = () => {
    const cloudinaryWidget = window.cloudinary.openUploadWidget(
      {
        cloudName: 'tvsales',
        uploadPreset: 'quatang',
        sources: ['local', 'camera'],
        language: 'vi',
        showAdvancedOptions: false,
        cropping: false,
        multiple: false,
        defaultSource: 'local',
        styles: {
          palette: {
            window: '#FFFFFF',
            windowBorder: '#90A0B3',
            tabIcon: '#0078FF',
            menuIcons: '#5A616A',
            textDark: '#000000',
            textLight: '#FFFFFF',
            link: '#0078FF',
            action: '#FF620C',
            inactiveTabIcon: '#0E2F5A',
            error: '#F44235',
            inProgress: '#0078FF',
            complete: '#20B832',
            sourceBg: '#E4EBF1',
          },
          fonts: {
            default: {
              active: true,
            },
          },
        },
      },
      (err, result) => {
        if (!err) {
          uploadFileBeforeCard(result)
        }
      },
    )
    cloudinaryWidget.open()
  }

  return (
    <div
      className="bg-light min-vh-100 d-flex flex-row align-items-center reward-container"
      style={{ position: 'relative' }}
    >
      <div
        style={{
          background: `url('${process.env.PUBLIC_URL}/images/bg-covid.jpeg') no-repeat`,
          backgroundSize: `cover`,
          opacity: 0.3,
          zIndex: 0,
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      ></div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol sm={12} className="mt-4 mb-4">
            <div className="reward-description-content mx-4">
              <p>
                <strong>1000 phần quà</strong> tặng cho anh em lái xe công nghệ từ Cty cổ phần TND
                Technology Solution Hỗ trợ ae lái xe vượt qua khó khăn trong đại dịch.
              </p>
              <p>Cách thức nhận quà:</p>
              <p>
                <strong>Bước 1:</strong> Cung cấp thông tin theo đường link/mã QR bên dưới Sau khi
                cung cấp thông tin sẽ có nhân viên liên lạc xác nhận ngày các bạn sẽ nhận quà.
              </p>
              <p>
                <strong>Bước 2:</strong> Để đảm bảo an toàn phòng dịch khi tới nhận quà các bạn chỉ
                cần Mở Zalo và quét mã QR tại điểm nhận quà.
              </p>
              <p>Nhân viên tại điểm nhận quà sẽ kiểm tra đúng thông tin</p>
              <p>Anh/Chị tự lấy quà tại điểm trao quà (không tiếp xúc)</p>
              <p>
                Dự kiến ngày <strong>06-07-08/08</strong> (mỗi ngày 300 phần quà) tại địa chỉ 198
                Nguyễn Văn Luông Phường 11 Quận 6.
              </p>
            </div>
          </CCol>
          <CCol sm={12}>
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
                    {/*<CCol sm={6} className="mb-4">*/}
                    {/*  <CFormLabel htmlFor="beforeIdentityCard" className="col-form-label">*/}
                    {/*    Mặt trước CMND/CCCD <span className="form-required"> *</span>*/}
                    {/*  </CFormLabel>*/}
                    {/*  <CInputGroup>*/}
                    {/*    <CInputGroupText>*/}
                    {/*      <FaAddressCard />*/}
                    {/*    </CInputGroupText>*/}
                    {/*    <CButton*/}
                    {/*      className="button-cloudinary-upload"*/}
                    {/*      onClick={showCloudinaryWidget}*/}
                    {/*    >*/}
                    {/*      Chọn File*/}
                    {/*    </CButton>*/}
                    {/*    <CInputGroupText>*/}
                    {/*      <FaCheckCircle color={thumbBeforeCardUrl ? '#2eb85c' : 'gray'} />*/}
                    {/*    </CInputGroupText>*/}
                    {/*  </CInputGroup>*/}
                    {/*  <CFormFeedback*/}
                    {/*    invalid*/}
                    {/*    style={{*/}
                    {/*      display:*/}
                    {/*        formik.errors.fileBeforeCard && formik.touched.fileBeforeCard*/}
                    {/*          ? 'block'*/}
                    {/*          : 'none',*/}
                    {/*    }}*/}
                    {/*  >*/}
                    {/*    {formik.errors.fileBeforeCard}*/}
                    {/*  </CFormFeedback>*/}
                    {/*</CCol>*/}
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
                        <CInputGroupText onClick={handleDatePickerClick}>
                          <CIcon name="cil-calendar" />
                        </CInputGroupText>
                        <CFormControl value={selectedBirthDate} placeholder="MM/DD/YYYY" disabled />
                        <DatePicker
                          showCaption={true}
                          isOpen={isDatePickerOpen}
                          dateConfig={dateConfig}
                          onSelect={handleDatePickerSelect}
                          onCancel={handleDatePickerCancel}
                          confirmText="Chọn"
                          cancelText="Huỷ"
                          headerFormat="DD/MM/YYYY"
                        />
                      </CInputGroup>
                    </CCol>
                    {/*<CCol sm={12} className="mb-4">*/}
                    {/*  <CFormLabel htmlFor="fullAddress" className="col-form-label">*/}
                    {/*    Địa chỉ <span className="form-required"> *</span>*/}
                    {/*  </CFormLabel>*/}
                    {/*  <CInputGroup>*/}
                    {/*    <CInputGroupText>*/}
                    {/*      <CIcon name="cil-location-pin" />*/}
                    {/*    </CInputGroupText>*/}
                    {/*    <CFormControl*/}
                    {/*      id="fullAddress"*/}
                    {/*      name="fullAddress"*/}
                    {/*      placeholder="Địa chỉ nhà"*/}
                    {/*      invalid={formik.errors.fullAddress && formik.touched.fullAddress}*/}
                    {/*      value={formik.values.fullAddress}*/}
                    {/*      {...formik.getFieldProps('fullAddress')}*/}
                    {/*    />*/}
                    {/*  </CInputGroup>*/}
                    {/*  <CFormFeedback*/}
                    {/*    invalid*/}
                    {/*    style={{*/}
                    {/*      display:*/}
                    {/*        formik.errors.fullAddress && formik.touched.fullAddress*/}
                    {/*          ? 'block'*/}
                    {/*          : 'none',*/}
                    {/*    }}*/}
                    {/*  >*/}
                    {/*    {formik.errors.fullAddress}*/}
                    {/*  </CFormFeedback>*/}
                    {/*</CCol>*/}
                    {/*<CCol sm={6} className="mb-4">*/}
                    {/*  <CFormLabel htmlFor="email" className="col-form-label">*/}
                    {/*    Email*/}
                    {/*  </CFormLabel>*/}
                    {/*  <CInputGroup>*/}
                    {/*    <CInputGroupText>*/}
                    {/*      <CIcon name="cil-user" />*/}
                    {/*    </CInputGroupText>*/}
                    {/*    <CFormControl*/}
                    {/*      id="email"*/}
                    {/*      name="email"*/}
                    {/*      placeholder="Email"*/}
                    {/*      value={formik.values.email}*/}
                    {/*      {...formik.getFieldProps('email')}*/}
                    {/*    />*/}
                    {/*  </CInputGroup>*/}
                    {/*</CCol>*/}
                  </CRow>
                  <CRow>
                    <hr />
                  </CRow>
                  <CRow>
                    <CCol className="flex-center">
                      <CButton type="submit" color="success">
                        Đăng ký
                      </CButton>
                      <CButton className="ms-4" onClick={resetForm}>
                        Xoá
                      </CButton>
                    </CCol>
                  </CRow>
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
