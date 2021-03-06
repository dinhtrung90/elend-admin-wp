import React from 'react'
import { CCard, CCardBody, CCol, CContainer, CRow } from '@coreui/react'

const HomeQRCode = () => {
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
      ></div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="9" xl="8">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <h1>Quà tặng</h1>
                <p className="text-medium-emphasis">Đăng ký nhận quà, tránh xa Covid </p>
                <CRow>
                  <CCol sm="12" className="text-center">
                    <img alt="reward-qr-code" src="/images/quatang-qr-code.png" height="300px" />
                    <p>Vui lòng dùng Zalo hoặc QR app để xác nhận quà tặng.</p>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default HomeQRCode
