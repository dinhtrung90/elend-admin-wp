import React from 'react'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Register = () => {
  const constGenders = {
    MALE: 'Male',
    FEMALE: 'Female',
    UNKNOWN: 'Unknown',
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
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
                        <CFormControl id="fullName" name="fullName" placeholder="Họ và tên" />
                      </CInputGroup>
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <CFormLabel htmlFor="MobileNumber" className="col-form-label">
                        Số điện thoại
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
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <CFormLabel htmlFor="UserRole" className="col-form-label">
                        Giới tính <span className="form-required"> *</span>
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-people" />
                        </CInputGroupText>
                        <CFormSelect custom name="Gender" id="Gender">
                          <option value="0">Vui lòng chọn giới tính</option>
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
                  </CRow>
                  {/*<CInputGroup className="mb-3">*/}
                  {/*  <CInputGroupText>*/}
                  {/*    <CIcon name="cil-phone" />*/}
                  {/*  </CInputGroupText>*/}
                  {/*  <CFormControl placeholder="Số điện thoại" autoComplete="phone" />*/}
                  {/*</CInputGroup>*/}
                  {/*<CInputGroup className="mb-3">*/}
                  {/*  <CInputGroupText>@</CInputGroupText>*/}
                  {/*  <CFormControl placeholder="Email" autoComplete="email" />*/}
                  {/*</CInputGroup>*/}
                  {/*<CInputGroup className="mb-3">*/}
                  {/*  <CInputGroupText>*/}
                  {/*    <CIcon name="cil-lock-locked" />*/}
                  {/*  </CInputGroupText>*/}
                  {/*  <CFormControl*/}
                  {/*    type="password"*/}
                  {/*    placeholder="Password"*/}
                  {/*    autoComplete="new-password"*/}
                  {/*  />*/}
                  {/*</CInputGroup>*/}
                  {/*<CInputGroup className="mb-4">*/}
                  {/*  <CInputGroupText>*/}
                  {/*    <CIcon name="cil-lock-locked" />*/}
                  {/*  </CInputGroupText>*/}
                  {/*  <CFormControl*/}
                  {/*    type="password"*/}
                  {/*    placeholder="Repeat password"*/}
                  {/*    autoComplete="new-password"*/}
                  {/*  />*/}
                  {/*</CInputGroup>*/}
                  <CButton color="success" block>
                    Create Account
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
