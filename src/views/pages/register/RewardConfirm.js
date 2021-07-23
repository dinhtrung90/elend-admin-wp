import React from 'react'
import {
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
  CFormFeedback,
  CButton,
} from '@coreui/react'
import { useFormik } from 'formik'
import CIcon from '@coreui/icons-react'
import * as Yup from 'yup'

const RewardConfirm = () => {
  let schema = Yup.object({
    phoneOrEmployeeId: Yup.string().required('Vui lòng nhập mã nhân viên (số điện thoại)'),
    code: Yup.string().required('Vui lòng nhập mã nhận quà'),
  })

  const formik = useFormik({
    initialValues: {
      phoneOrEmployeeId: '',
      code: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => handleConfirmReward(values),
  })

  const handleConfirmReward = (values) => {}

  return (
    <div
      className="d-flex flex-row align-items-center min-vh-100 thanks-reward-container"
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
      />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="9" xl="8">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={formik.handleSubmit}>
                  <h1>Quà tặng</h1>
                  <p className="text-medium-emphasis">Nhận quà, tránh xa Covid </p>
                  <CRow>
                    <CCol sm={12} className="mb-4">
                      <CFormLabel htmlFor="employeeId" className="col-form-label">
                        Mã nhân viên (Số điện thoại) <span className="form-required"> *</span>
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl
                          id="phoneOrEmployeeId"
                          name="phoneOrEmployeeId"
                          placeholder="Mã nhân viên (Số điện thoại)"
                          value={formik.values.phoneOrEmployeeId}
                          invalid={
                            formik.errors.phoneOrEmployeeId && formik.touched.phoneOrEmployeeId
                          }
                          {...formik.getFieldProps('phoneOrEmployeeId')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display:
                            formik.errors.phoneOrEmployeeId && formik.touched.phoneOrEmployeeId
                              ? 'block'
                              : 'none',
                        }}
                      >
                        {formik.errors.phoneOrEmployeeId}
                      </CFormFeedback>
                    </CCol>
                    <CCol sm={12} className="mb-4">
                      <CFormLabel htmlFor="employeeId" className="col-form-label">
                        Mã nhận quà <span className="form-required"> *</span>
                      </CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                        <CFormControl
                          id="phoneOrEmployeeId"
                          name="phoneOrEmployeeId"
                          placeholder="Mã nhận quà"
                          value={formik.values.code}
                          invalid={formik.errors.code && formik.touched.code}
                          {...formik.getFieldProps('code')}
                        />
                      </CInputGroup>
                      <CFormFeedback
                        invalid
                        style={{
                          display: formik.errors.code && formik.touched.code ? 'block' : 'none',
                        }}
                      >
                        {formik.errors.code}
                      </CFormFeedback>
                    </CCol>
                  </CRow>
                  <CButton type="submit" color="success">
                    Xác nhận
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

export default RewardConfirm
